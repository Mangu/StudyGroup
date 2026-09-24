/**
 * ==========================================================================
 * MEN'S STUDY HUB APPLICATION LOGIC (READ-ONLY STUDY GUIDE ENGINE)
 * Features: Static JSON Directory Fetching, Multi-Theme Progressive Toggle, 
 *           Real-time Debounced Notes Auto-save, Notes Journal Plain-Text Backup, 
 *           and Dynamic Weekly Date Calculation.
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- Core State Variables ---
  let studyData = [];
  let currentSeasonId = "";
  
  // Debounce storage for saving notes per week
  const saveDebounceTimers = {};

  // --- DOM Element Cache ---
  const elHtml = document.documentElement;
  const elThemeToggle = document.getElementById('theme-toggle');
  
  const elSeasonTabList = document.getElementById('season-tab-list');
  const elActiveSeasonTitle = document.getElementById('active-season-title');
  const elActiveSeasonTheme = document.getElementById('active-season-theme');
  const elActiveSeasonDesc = document.getElementById('active-season-desc');
  const elHeaderProgressWidget = document.getElementById('header-progress-widget');
  
  const elStatsSeasonName = document.getElementById('stats-season-name');
  const elStatsProgressPct = document.getElementById('stats-progress-pct');
  const elStatsProgressBar = document.getElementById('stats-progress-bar');
  
  const elWeeksTimeline = document.getElementById('study-weeks-timeline');
  const elTimelineFocusTitle = document.getElementById('timeline-focus-title');
  const elTimelineFocusSubtitle = document.getElementById('timeline-focus-subtitle');
  
  // Notes Utilities
  const elBtnExportReflections = document.getElementById('btn-export-reflections');
  const elBtnClearReflections = document.getElementById('btn-clear-reflections');

  // --- Initializer ---
  async function init() {
    loadTheme();
    await loadStudyData();
    setupEventListeners();
    
    // Set initial active season
    if (studyData.length > 0) {
      setActiveSeason(studyData[0].id);
    } else {
      renderEmptyState();
    }
  }

  // --- Theme Controller ---
  function loadTheme() {
    const savedTheme = localStorage.getItem('color-scheme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('light'); // Default light theme
    }

    // React to system color scheme shifts if override isn't stored
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('color-scheme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  function setTheme(theme) {
    const iconSun = elThemeToggle.querySelector('.icon-sun');
    const iconMoon = elThemeToggle.querySelector('.icon-moon');

    if (theme === 'dark') {
      elHtml.setAttribute('data-theme', 'dark');
      if (iconSun) iconSun.style.display = "none";
      if (iconMoon) iconMoon.style.display = "block";
    } else {
      elHtml.removeAttribute('data-theme');
      if (iconSun) iconSun.style.display = "block";
      if (iconMoon) iconMoon.style.display = "none";
    }
  }

  // --- Toggle Theme Click ---
  function toggleTheme() {
    const isDark = elHtml.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('color-scheme', nextTheme);
  }

  // --- Core Data Fetching Loader ---
  async function loadStudyData() {
    try {
      // 1. Fetch seasons index directory list
      const response = await fetch('seasons/seasons.json');
      if (!response.ok) throw new Error("Index file fetch failed");
      const seasonsIndex = await response.json();
      
      // 2. Fetch study outlines for each active season config
      const loadedSeasons = [];
      for (const item of seasonsIndex) {
        try {
          const detailRes = await fetch(`seasons/${item.file}`);
          if (detailRes.ok) {
            const detail = await detailRes.json();
            detail.title = item.title || detail.title;
            detail.theme = item.theme || detail.theme;
            loadedSeasons.push(detail);
          }
        } catch (err) {
          console.error(`Failed to load details for ${item.id}`, err);
        }
      }
      
      if (loadedSeasons.length > 0) {
        studyData = loadedSeasons;
        saveStudyDataToStorage();
      } else {
        throw new Error("No seasons successfully fetched");
      }
    } catch (err) {
      console.warn("Server static fetch unavailable. Falling back to local storage cache or compiled fallback seeds.", err);
      const savedData = localStorage.getItem('study-guide-data');
      if (savedData) {
        try {
          studyData = JSON.parse(savedData);
          // Auto cache-invalidation clear
          const needsReset = studyData.some(s => !s.startDate || (s.id === 'fall-2026' && s.weeks && s.weeks[1] && s.weeks[1].prereading && s.weeks[1].prereading.text));
          if (needsReset) {
            studyData = window.INITIAL_STUDY_DATA || [];
            saveStudyDataToStorage();
          }
        } catch (parseErr) {
          studyData = window.INITIAL_STUDY_DATA || [];
        }
      } else {
        studyData = window.INITIAL_STUDY_DATA || [];
        saveStudyDataToStorage();
      }
    }
  }

  function saveStudyDataToStorage() {
    localStorage.setItem('study-guide-data', JSON.stringify(studyData));
  }

  // --- Active Season Switcher ---
  function setActiveSeason(seasonId) {
    const season = studyData.find(s => s.id === seasonId);
    if (!season) return;

    currentSeasonId = seasonId;
    
    // Render elements
    renderSeasonTabs();
    renderActiveSeasonInfo(season);
    
    // Populate weeks
    renderWeeksTimeline(season.weeks);
    updateGlobalProgress();
  }

  // Render Left Navigation List tabs
  function renderSeasonTabs() {
    elSeasonTabList.innerHTML = '';
    
    studyData.forEach(season => {
      const btn = document.createElement('button');
      btn.className = `tab-item ${season.id === currentSeasonId ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', season.id === currentSeasonId ? 'true' : 'false');
      
      const weeksCount = season.weeks ? season.weeks.length : 0;
      btn.innerHTML = `
        <span>${escapeHtml(season.title)}</span>
        <span class="tab-badge">${weeksCount} Wk${weeksCount === 1 ? '' : 's'}</span>
      `;
      btn.addEventListener('click', () => setActiveSeason(season.id));
      elSeasonTabList.appendChild(btn);
    });
  }

  function renderActiveSeasonInfo(season) {
    elActiveSeasonTitle.textContent = season.title;
    elActiveSeasonTheme.textContent = season.theme || "Untitled Theme";
    elActiveSeasonDesc.textContent = season.description || "No overview provided.";
    elStatsSeasonName.textContent = season.title;
  }

  // --- Timeline Builder ---
  function renderWeeksTimeline(weeks) {
    elWeeksTimeline.innerHTML = '';
    
    const season = studyData.find(s => s.id === currentSeasonId);
    if (!season || !weeks || weeks.length === 0) {
      elWeeksTimeline.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state-icon"><use href="#icon-info"></use></svg>
          <h3>No study weeks defined</h3>
          <p>No study guide material has been mapped yet.</p>
        </div>
      `;
      return;
    }

    weeks.forEach((week) => {
      const notesKey = `reflections-${currentSeasonId}-${week.number}`;
      const savedNotes = localStorage.getItem(notesKey) || "";

      const card = document.createElement('details');
      card.className = "week-card";
      card.setAttribute('data-week-number', week.number);
      
      const outlineHtml = (week.outline || []).map(pt => `
        <li class="outline-item">${escapeHtml(pt)}</li>
      `).join('');

      const questionsHtml = (week.questions || []).map((q, qIdx) => `
        <div class="question-item">
          <span class="question-num">Question ${qIdx + 1}</span>
          <p class="question-text">${escapeHtml(q)}</p>
        </div>
      `).join('');

      const resourcesHtml = (week.resources || []).map(res => {
        const isVideo = res.url.includes("youtube.com") || res.url.includes("youtu.be") || res.url.includes("vimeo.com");
        return `
          <a href="${escapeHtml(res.url)}" target="_blank" rel="noopener noreferrer" class="resource-card">
            <svg class="resource-icon"><use href="#icon-${isVideo ? 'video' : 'book'}"></use></svg>
            <div class="resource-info">
              <span class="resource-name">${escapeHtml(res.name)}</span>
              <span class="resource-type">${isVideo ? 'Video' : 'Article / Resource'}</span>
            </div>
          </a>
        `;
      }).join('');

      const prereadingHtml = week.prereading ? `
        <div class="prereading-container" id="prereading-week-${week.number}">
          <div class="prereading-banner">
            <div class="prereading-banner-left">
              <div class="prereading-badge">
                <svg class="btn-icon-svg" style="width:14px;height:14px;"><use href="#icon-book"></use></svg>
                <span>Required Pre-Reading</span>
              </div>
              <h4 class="prereading-title">${escapeHtml(week.prereading.title || 'Chapter Reading')}</h4>
              ${week.prereading.subtitle ? `<div class="prereading-subtitle-text">${escapeHtml(week.prereading.subtitle)}</div>` : ''}
            </div>
            <div class="prereading-banner-actions">
              ${week.prereading.markdownFile ? `
                <button type="button" class="btn-primary btn-read-markdown" 
                  data-week="${week.number}" 
                  data-file="${escapeHtml(week.prereading.markdownFile)}"
                  data-pdf="${escapeHtml(week.prereading.pdfFile || '')}"
                  data-title="${escapeHtml(week.prereading.title || 'Chapter Reading')}">
                  <svg class="btn-icon-svg"><use href="#icon-book"></use></svg>
                  <span class="read-btn-text">Read Chapter</span>
                </button>
              ` : ''}
              ${week.prereading.pdfFile ? `
                <a href="${escapeHtml(week.prereading.pdfFile)}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="display:inline-flex;align-items:center;gap:0.5rem;text-decoration:none;padding:0.55rem 1rem;font-size:0.85rem;font-weight:600;border-radius:var(--radius-sm);border:1px solid var(--border-medium);background:var(--bg-card);color:var(--text-main);">
                  <svg class="btn-icon-svg"><use href="#icon-chevron-right" style="transform:rotate(-90deg);"></use></svg>
                  <span>View PDF</span>
                </a>
              ` : ''}
            </div>
          </div>
          <div class="prereading-reader-panel" id="reader-panel-${week.number}" style="display: none;">
            <div class="reader-toolbar">
              <div class="reader-toolbar-label">
                <svg class="btn-icon-svg"><use href="#icon-book"></use></svg>
                <span>${escapeHtml(week.prereading.title || 'Chapter Reading')}</span>
              </div>
              <button type="button" class="btn-close-reader" data-week="${week.number}">
                ✕ Close Reader
              </button>
            </div>
            <div class="reader-body markdown-rendered" id="reader-body-${week.number}"></div>
          </div>
        </div>
      ` : '';

      card.innerHTML = `
        <summary class="week-summary">
          <div class="week-badge">${week.number}</div>
          <div class="week-header-info">
            <div class="week-meta">
              <span>Week ${week.number}</span>
              <span class="separator">•</span>
              <span class="session-date">${escapeHtml(getWeekDate(season, week))}</span>
            </div>
            <h3 class="week-title">${escapeHtml(week.title)}</h3>
          </div>
          <svg class="week-chevron"><use href="#icon-chevron-right"></use></svg>
        </summary>
        
        <div class="week-details-body">
          ${prereadingHtml}
          ${(week.scripture && (week.scripture.text || week.scripture.reference)) ? `
          <div class="scripture-highlight-card">
            ${week.scripture.text ? `<p class="scripture-text">"${escapeHtml(week.scripture.text)}"</p>` : ''}
            ${week.scripture.reference ? `
            <div class="scripture-citation">
              <svg class="btn-icon-svg"><use href="#icon-book"></use></svg>
              <span>${escapeHtml(week.scripture.reference)}</span>
            </div>` : ''}
            <button class="btn-copy-scripture" title="Copy Scripture Reference" data-text="${escapeHtml([week.scripture.reference, week.scripture.text].filter(Boolean).join(' - '))}">
              <svg class="btn-icon-svg"><use href="#icon-copy"></use></svg>
            </button>
          </div>
          ` : ''}

          ${((week.outline && week.outline.length > 0) || (week.questions && week.questions.length > 0)) ? `
          <div class="discussion-grid">
            ${(week.outline && week.outline.length > 0) ? `
            <div class="outline-box">
              <h4 class="box-title">
                <svg><use href="#icon-book"></use></svg>
                <span>Discussion Outline</span>
              </h4>
              <ul class="outline-list">
                ${outlineHtml}
              </ul>
            </div>` : ''}

            ${(week.questions && week.questions.length > 0) ? `
            <div class="questions-box">
              <h4 class="box-title">
                <svg><use href="#icon-shield"></use></svg>
                <span>Discussion Questions</span>
              </h4>
              <div class="questions-list">
                ${questionsHtml}
              </div>
            </div>` : ''}
          </div>
          ` : ''}

          ${(!week.prereading && (!week.scripture || (!week.scripture.text && !week.scripture.reference)) && (!week.outline || week.outline.length === 0) && (!week.questions || week.questions.length === 0)) ? `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-dim); font-style: italic;">
            Study material coming soon...
          </div>
          ` : ''}

          ${(week.resources && week.resources.length > 0) ? `
          <div class="resources-box" style="margin-top: 1.5rem;">
            <h4 class="box-title">
              <svg><use href="#icon-video"></use></svg>
              <span>Supplemental Resources</span>
            </h4>
            <div class="resources-grid">
              ${resourcesHtml}
            </div>
          </div>
          ` : ''}

          <div class="notes-box">
            <h4 class="box-title">
              <svg><use href="#icon-edit"></use></svg>
              <span>Personal Reflections & Notes</span>
            </h4>
            <textarea 
              class="reflection-text-area" 
              placeholder="Write down personal notes, prayer requests, or thoughts for group discussion..." 
              data-week-number="${week.number}">${escapeHtml(savedNotes)}</textarea>
            <div class="notebook-footer">
              <div class="save-indicator" data-week-number="${week.number}">
                <svg><use href="#icon-check"></use></svg>
                <span>Saved to browser storage</span>
              </div>
              <button class="btn-print-notes" onclick="window.print()">Print Notes</button>
            </div>
          </div>
        </div>
      `;

      // Pre-reading reader toggle
      const readBtn = card.querySelector('.btn-read-markdown');
      const closeBtn = card.querySelector('.btn-close-reader');
      const readerPanel = card.querySelector(`#reader-panel-${week.number}`);
      const readerBody = card.querySelector(`#reader-body-${week.number}`);

      if (readBtn && readerPanel && readerBody) {
        readBtn.addEventListener('click', async function(e) {
          e.preventDefault();
          e.stopPropagation();

          const isExpanded = readerPanel.style.display !== 'none';
          if (isExpanded) {
            readerPanel.style.display = 'none';
            const btnText = readBtn.querySelector('.read-btn-text');
            if (btnText) btnText.textContent = 'Read Chapter';
          } else {
            if (!readerBody.hasAttribute('data-loaded')) {
              readerBody.innerHTML = '<p style="text-align:center;padding:2rem;color:var(--text-muted);">Loading reading material...</p>';
              readerPanel.style.display = 'block';
              const btnText = readBtn.querySelector('.read-btn-text');
              if (btnText) btnText.textContent = 'Hide Chapter';

              const filePath = readBtn.getAttribute('data-file');
              const pdfPath = readBtn.getAttribute('data-pdf');
              let mdContent = '';
              try {
                if (window.READINGS_CACHE && window.READINGS_CACHE[filePath]) {
                  mdContent = window.READINGS_CACHE[filePath];
                } else {
                  const res = await fetch(filePath);
                  if (!res.ok) throw new Error(`HTTP ${res.status}`);
                  mdContent = await res.text();
                }
                readerBody.innerHTML = parseMarkdown(mdContent);
                readerBody.setAttribute('data-loaded', 'true');
              } catch (err) {
                console.error("Failed to load reading markdown:", err);
                if (window.READINGS_CACHE && window.READINGS_CACHE[filePath]) {
                  readerBody.innerHTML = parseMarkdown(window.READINGS_CACHE[filePath]);
                  readerBody.setAttribute('data-loaded', 'true');
                } else {
                  readerBody.innerHTML = `
                    <div style="padding:1.5rem;text-align:center;color:var(--text-muted);">
                      <p>Unable to load the formatted text in this view.</p>
                      ${pdfPath ? `<p style="margin-top:0.5rem;"><a href="${escapeHtml(pdfPath)}" target="_blank" style="color:var(--accent-gold);text-decoration:underline;">Click here to open the PDF directly</a></p>` : ''}
                    </div>
                  `;
                }
              }
            } else {
              readerPanel.style.display = 'block';
              const btnText = readBtn.querySelector('.read-btn-text');
              if (btnText) btnText.textContent = 'Hide Chapter';
            }
          }
        });
      }

      if (closeBtn && readerPanel) {
        closeBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          readerPanel.style.display = 'none';
          if (readBtn) {
            const btnText = readBtn.querySelector('.read-btn-text');
            if (btnText) btnText.textContent = 'Read Chapter';
          }
        });
      }

      // Copy Scripture Click listener
      const copyBtn = card.querySelector('.btn-copy-scripture');
      if (copyBtn) {
        copyBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          const textToCopy = this.getAttribute('data-text');
          navigator.clipboard.writeText(textToCopy).then(() => {
            const btn = this;
            const svg = btn.querySelector('use');
            svg.setAttribute('href', '#icon-check');
            btn.style.color = '#10b981';
            setTimeout(() => {
              svg.setAttribute('href', '#icon-copy');
              btn.style.color = '';
            }, 2000);
          });
        });
      }

      // Reflection save handlers
      const textarea = card.querySelector('.reflection-text-area');
      textarea.addEventListener('input', function() {
        debouncedSaveNotes(week.number, this.value);
      });

      elWeeksTimeline.appendChild(card);
    });
  }

  // --- Completion Progress ---
  function updateGlobalProgress() {
    const season = studyData.find(s => s.id === currentSeasonId);
    if (!season || !season.weeks || season.weeks.length === 0) {
      elHeaderProgressWidget.style.display = "none";
      return;
    }

    elHeaderProgressWidget.style.display = "block";
    let completedCount = 0;

    season.weeks.forEach(week => {
      const notesKey = `reflections-${currentSeasonId}-${week.number}`;
      const savedNotes = localStorage.getItem(notesKey) || "";
      if (savedNotes.trim().length > 0) {
        completedCount++;
      }
    });

    const totalWeeks = season.weeks.length;
    const percentage = Math.round((completedCount / totalWeeks) * 100);

    elStatsProgressPct.textContent = `${percentage}% Complete`;
    elStatsProgressBar.style.width = `${percentage}%`;
    elTimelineFocusSubtitle.textContent = `${totalWeeks}-Week Study Course Timeline (${completedCount}/${totalWeeks} Completed)`;
  }

  // --- Notebook Autosave Logic ---
  function debouncedSaveNotes(weekNumber, text) {
    const saveIndicator = document.querySelector(`.save-indicator[data-week-number="${weekNumber}"]`);
    if (saveIndicator) {
      saveIndicator.classList.remove('active');
    }

    if (saveDebounceTimers[weekNumber]) {
      clearTimeout(saveDebounceTimers[weekNumber]);
    }

    saveDebounceTimers[weekNumber] = setTimeout(() => {
      saveNotes(weekNumber, text);
    }, 800);
  }

  function saveNotes(weekNumber, text) {
    const notesKey = `reflections-${currentSeasonId}-${weekNumber}`;
    if (text.trim().length > 0) {
      localStorage.setItem(notesKey, text);
    } else {
      localStorage.removeItem(notesKey);
    }

    updateGlobalProgress();

    // Trigger visual saved feedback badge
    const saveIndicator = document.querySelector(`.save-indicator[data-week-number="${weekNumber}"]`);
    if (saveIndicator) {
      saveIndicator.classList.add('active');
    }
  }

  // --- Export Personal Journal Notes ---
  function exportReflectionNotes() {
    const season = studyData.find(s => s.id === currentSeasonId);
    if (!season) return;

    let journalText = `========================================================================\n`;
    journalText += `  MEN'S STUDY HUB - STUDY REFLECTIONS & NOTES JOURNAL\n`;
    journalText += `  Study: ${season.title} - ${season.theme}\n`;
    journalText += `  Export Date: ${new Date().toLocaleDateString()}\n`;
    journalText += `========================================================================\n\n`;

    let notesFound = false;

    season.weeks.forEach(week => {
      const notesKey = `reflections-${currentSeasonId}-${week.number}`;
      const notes = localStorage.getItem(notesKey);
      
      if (notes && notes.trim().length > 0) {
        notesFound = true;
        journalText += `------------------------------------------------------------------------\n`;
        journalText += `Week ${week.number}: ${week.title}\n`;
        journalText += `Date: ${getWeekDate(season, week)}\n`;
        if (week.scripture && (week.scripture.reference || week.scripture.text)) {
          journalText += `Scripture: ${week.scripture.reference || ''}${week.scripture.text ? ` - "${week.scripture.text}"` : ''}\n`;
        }
        journalText += `------------------------------------------------------------------------\n\n`;
        journalText += `[My Reflections & Notes]\n`;
        journalText += `${notes.trim()}\n\n\n`;
      }
    });

    if (!notesFound) {
      alert("You haven't written any reflection notes for this study season yet!\nWrite some thoughts inside any week first and try again.");
      return;
    }

    const blob = new Blob([journalText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${season.id}-reflections-journal.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // --- Clear Notebook Notes ---
  function clearAllReflectionNotes() {
    const season = studyData.find(s => s.id === currentSeasonId);
    if (!season) return;

    if (!confirm(`Are you sure you want to permanently clear all your written reflection notes for the entire "${season.title}" season? This action is irreversible.`)) {
      return;
    }

    season.weeks.forEach(week => {
      localStorage.removeItem(`reflections-${currentSeasonId}-${week.number}`);
    });

    setActiveSeason(currentSeasonId);
    alert("Notebook cleared successfully.");
  }

  function renderEmptyState() {
    elSeasonTabList.innerHTML = '';
    elActiveSeasonTitle.textContent = "Welcome";
    elActiveSeasonTheme.textContent = "No active studies loaded.";
    elActiveSeasonDesc.textContent = "Upload or connect seasonal outlines to begin.";
    elWeeksTimeline.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-icon"><use href="#icon-info"></use></svg>
        <h3>No Study Outlines Found</h3>
        <p>Make sure seasons config JSON files are correctly placed in the '/seasons' folder.</p>
      </div>
    `;
    elHeaderProgressWidget.style.display = "none";
  }

  // --- Global Event Listeners ---
  function setupEventListeners() {
    elThemeToggle.addEventListener('click', toggleTheme);
    elBtnExportReflections.addEventListener('click', exportReflectionNotes);
    elBtnClearReflections.addEventListener('click', clearAllReflectionNotes);
  }

  // --- Utility Date Calculator ---
  function getWeekDate(season, week) {
    if (season && season.startDate) {
      try {
        const parts = season.startDate.split('-');
        if (parts.length === 3) {
          const year = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; // 0-indexed month
          const day = parseInt(parts[2], 10);
          
          const baseDate = new Date(year, month, day);
          const targetDate = new Date(baseDate.getTime() + (week.number - 1) * 7 * 24 * 60 * 60 * 1000);
          
          const options = { month: 'long', day: 'numeric', year: 'numeric' };
          return targetDate.toLocaleDateString('en-US', options);
        }
      } catch (err) {
        console.error("Failed to dynamically calculate week date", err);
      }
    }
    return week.date || "";
  }

  // --- Markdown Parser for Pre-readings ---
  function parseMarkdown(text) {
    if (!text) return "";
    const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
    const html = [];
    let inTable = false;
    let inList = false;
    let inBlockquote = false;
    let blockquoteBuffer = [];

    function flushBlockquote() {
      if (inBlockquote) {
        html.push('<blockquote class="md-blockquote"><p>' + blockquoteBuffer.map(inlineFormat).join('<br>') + '</p></blockquote>');
        blockquoteBuffer = [];
        inBlockquote = false;
      }
    }

    function flushList() {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
    }

    function flushTable() {
      if (inTable) {
        html.push('</tbody></table>');
        inTable = false;
      }
    }

    function inlineFormat(str) {
      let s = escapeHtml(str);
      s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      s = s.replace(/__(.+?)__/g, '<strong>$1</strong>');
      s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
      s = s.replace(/_(.+?)_/g, '<em>$1</em>');
      return s;
    }

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const line = rawLine.trim();

      if (line.startsWith('|') && line.endsWith('|')) {
        flushBlockquote();
        flushList();
        if (/^\|[\s\-:|]+\|$/.test(line)) {
          continue;
        }
        const cells = line.slice(1, -1).split('|').map(c => c.trim());
        if (!inTable) {
          inTable = true;
          html.push('<table class="md-table"><thead><tr>');
          cells.forEach(cell => {
            html.push('<th>' + inlineFormat(cell) + '</th>');
          });
          html.push('</tr></thead><tbody>');
        } else {
          html.push('<tr>');
          cells.forEach(cell => {
            html.push('<td>' + inlineFormat(cell) + '</td>');
          });
          html.push('</tr>');
        }
        continue;
      } else if (inTable) {
        flushTable();
      }

      if (line.startsWith('>')) {
        flushList();
        inBlockquote = true;
        blockquoteBuffer.push(line.replace(/^>\s*/, ''));
        continue;
      } else if (inBlockquote) {
        flushBlockquote();
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        flushBlockquote();
        if (!inList) {
          inList = true;
          html.push('<ul class="md-list">');
        }
        html.push('<li>' + inlineFormat(line.slice(2)) + '</li>');
        continue;
      } else if (inList) {
        flushList();
      }

      if (line === '') {
        continue;
      }

      if (line.startsWith('# ')) {
        html.push('<h2 class="md-heading-1">' + inlineFormat(line.slice(2)) + '</h2>');
        continue;
      }
      if (line.startsWith('## ')) {
        html.push('<h3 class="md-heading-2">' + inlineFormat(line.slice(3)) + '</h3>');
        continue;
      }
      if (line.startsWith('### ')) {
        html.push('<h4 class="md-heading-3">' + inlineFormat(line.slice(4)) + '</h4>');
        continue;
      }

      html.push('<p>' + inlineFormat(line) + '</p>');
    }

    flushBlockquote();
    flushList();
    flushTable();

    return html.join('\n');
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Boot
  document.addEventListener('DOMContentLoaded', init);

})();
