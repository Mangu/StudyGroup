/**
 * Seed data for the Men's Study Group application.
 * Exposed on window.INITIAL_STUDY_DATA to support running directly in browser via file:// protocol.
 */
window.INITIAL_STUDY_DATA = [
  {
    id: "fall-2026",
    title: "Fall 2026",
    theme: "Strategic: To be forewarned is to be forearmed",
    startDate: "2026-09-23",
    description: "An 8-week tactical study of Biblical figures who fell to the schemes of the enemy. By analyzing their tactical errors, spiritual compromises, and blind spots, we learn how to guard our hearts, stand in the light, and beat back the devices of Satan.",
    weeks: [
      {
        number: 1,
        title: "Samson – Playing with Fire",
        scripture: {
          reference: "2 Corinthians 2:11",
          text: "...lest Satan should take advantage of us; for we are not ignorant of his devices."
        },
        outline: [
          "The anatomy of compromise: Samson's gradual drift from his Nazirite vows (Judges 13–16)",
          "Playing near the edge: Why flirting with boundary lines always ends in captivity",
          "Living in the light: The requirement of being above reproach in private and public",
          "Contrasting responses to temptation: Joseph running from Potiphar's wife, Daniel resolving in his heart not to defile himself"
        ],
        questions: [
          "Samson thought he could handle the heat without getting burned. In what areas are you tempted to test how close you can get to a boundary?",
          "What does it look like practically to 'flee' temptation like Joseph rather than 'manage' it like Samson?"
        ],
        resources: [
          { name: "Sermon: Fleeing vs Flirting with Temptation", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
          { name: "Reading: Joseph, Daniel, and Samson Contrasted", url: "https://example.com/samson-contrast" }
        ]
      },
      {
        number: 2,
        title: "David – Disciplined",
        scripture: {
          reference: "1 Corinthians 9:27",
          text: "No, I strike a blow to my body and make it my slave so that after I have preached to others, I myself will not be disqualified for the prize."
        },
        outline: [
          "The season of war: David staying behind in Jerusalem when kings go out to battle (2 Samuel 11)",
          "The danger of idleness: How comfort, success, and passive relaxation create fertile ground for the enemy's schemes",
          "The escalation of a look: From passive observation to active transgression, cover-up, and murder",
          "Cultivating spiritual and physical discipline: 'Beating' our desires to make them servants, not masters"
        ],
        questions: [
          "David's idle evening led to a lifetime of regret. Where in your schedule or life are you currently most vulnerable to the passive traps of comfort and idleness?",
          "What is one spiritual discipline or physical habit you need to implement to 'strike a blow to your body' and keep it in subjection?"
        ],
        resources: [
          { name: "Video: David and Bathsheba's Collapse (BibleProject)", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
        ]
      },
      {
        number: 3,
        title: "Ahithophel – Bitterness",
        scripture: {
          reference: "Psalm 41:9",
          text: "Even my close friend, someone I trusted, one who shared my bread, has turned against me."
        },
        outline: [
          "Ahithophel the counselor: Renowned for wisdom like the very word of God (2 Samuel 15, 16, 17)",
          "The hidden root of bitterness: Ahithophel's relationship to Bathsheba (grandfather) and resentment toward David's sin",
          "How unforgiveness poisons wisdom: Trading a lifetime of loyalty for a moment of personal vengeance",
          "The tragic end of bitterness: The self-destructive nature of holding a grudge"
        ],
        questions: [
          "Ahithophel's grievance against David was legitimate, but his bitter reaction destroyed him. How do we distinguish between seeking justice and harboring self-destructive bitterness?",
          "Are you currently carrying resentment or bitterness toward an 'old familiar friend' or leader? What step is needed to release it?"
        ],
        resources: [
          { name: "Reading: Bitter Roots & Poisoned Counselors", url: "https://example.com/ahithophel-bitterness" }
        ]
      },
      {
        number: 4,
        title: "Esau – Profane",
        scripture: {
          reference: "Hebrews 12:16",
          text: "See that no one is sexually immoral, or is godless like Esau, who for a single meal sold his inheritance rights as the oldest son."
        },
        outline: [
          "The immediate vs. the eternal: Exchanging an enduring covenant inheritance for a temporary bowl of red stew (Gen 25, Heb 12)",
          "The meaning of a 'profane' or godless heart: Despising spiritual treasures because they cannot be touched or eaten right now",
          "The sovereign prophecy: The struggle between Jacob and Esau, and the older serving the younger",
          "Seeking repentance with tears: Why some consequences cannot be undone even when emotional sorrow is high"
        ],
        questions: [
          "Esau sold his birthright in a moment of intense hunger. What are the modern 'bowls of stew' (temporary pleasures, financial gain, career validation) that tempt you to barter your spiritual inheritance?",
          "How does keeping an eternal perspective protect us from making short-sighted, profane deals with our character?"
        ],
        resources: [
          { name: "Sermon: The Cost of a Bowl of Stew", url: "https://example.com/esau-stew" }
        ]
      },
      {
        number: 5,
        title: "Judas – Covetous",
        scripture: {
          reference: "John 12:5-6",
          text: "'Why wasn't this perfume sold and the money given to the poor? It was worth a year's wages.' He did not say this because he cared about the poor but because he was a thief..."
        },
        outline: [
          "The seed of greed: Judas as the keeper of the disciples' money bag, stealing small amounts over time",
          "The clash of values: Mary's extravagant, wasteful worship with the alabaster box vs. Judas's pragmatic, covetous calculation",
          "The final bargain: Selling out the Son of God for thirty pieces of silver (the price of a common slave)",
          "The trap of covetousness: How loving money blindfolds us to the presence and worth of Jesus"
        ],
        questions: [
          "Judas masked his greed with 'concern for the poor.' How do we sometimes disguise our own covetousness, greed, or materialism in spiritual or practical language?",
          "Mary broke her alabaster box in total devotion. What is your 'alabaster box' that you are reluctant to break open for Christ?"
        ],
        resources: [
          { name: "Podcast: Judas, Mary, and the Alabaster Box", url: "https://example.com/judas-mary" }
        ]
      },
      {
        number: 6,
        title: "Demas – Loved Present World",
        scripture: {
          reference: "2 Timothy 4:10",
          text: "...for Demas, because he loved this world, has deserted me and has gone to Thessalonica."
        },
        outline: [
          "Demas the co-worker: Mentioned as a trusted missionary teammate of Paul along with Luke (Col 4, Phlm 24)",
          "The quiet decay of affection: Demas did not fall to heresy, but to the slow, magnetic pull of 'the present world'",
          "The pain of abandonment: What it feels like to be deserted by a brother in the middle of a hard battle",
          "Guarding against worldliness: Resisting the pressure to seek security, comfort, and luxury in Thessalonica"
        ],
        questions: [
          "Demas started strong but drifted away because he loved this world. What worldly comforts or securities are currently calling to you, inviting you to desert your spiritual post?",
          "How can we keep our love for Christ warmer than the magnetic pull of present worldly achievements and comfort?"
        ],
        resources: [
          { name: "Reading: The Quiet Drift of Demas", url: "https://example.com/demas-drift" }
        ]
      },
      {
        number: 7,
        title: "Solomon – Failure to Live by What You Know",
        scripture: {
          reference: "Proverbs 4:20-21",
          text: "My son, pay attention to what I say; turn your ear to my words. Do not let them out of your sight, keep them within your heart."
        },
        outline: [
          "The legacy of wisdom: Gifted with unmatched understanding, written down in thousands of proverbs",
          "The gap between intellect and obedience: Advising 'my son' on purity, work, and idolatry, while practicing the opposite",
          "The slow slide: How a godly father (David) and deep theology cannot save a man who refuses to live what he knows",
          "Aligning knowledge with action: Reclaiming integrity by matching intellectual conviction with daily submission"
        ],
        questions: [
          "Solomon was the wisest man alive, yet he built altars to foreign gods. In what area of your life does your actual behavior contradict your deepest biblical knowledge?",
          "How do we guard against the danger of studying wisdom in a small group like this, without actually submitting our private schedules and decisions to it?"
        ],
        resources: [
          { name: "Video: Solomon's Tragic Double Life", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
        ]
      },
      {
        number: 8,
        title: "Peter – Peer Pressure",
        scripture: {
          reference: "Galatians 2:11-12",
          text: "When Cephas came to Antioch, I opposed him to his face, because he stood condemned. For before certain men came from James, he used to eat with the Gentiles. But when they arrived, he began to draw back and separate himself..."
        },
        outline: [
          "The vision of Acts 10: Peter declaring that God does not show favoritism and that Gentiles are clean",
          "Antioch's compromise: Peter eating freely with Gentiles until the circumcision group arrives (Galatians 2)",
          "The infection of hypocrisy: How even Barnabas was led astray by Peter's fear of social exclusion",
          "Standing firm under pressure: The courage of Paul to confront a leader publicly to protect the truth of the Gospel"
        ],
        questions: [
          "Peter gave in to peer pressure out of fear of what others would think. In what circles (at work, among old friends, in your neighborhood) do you find yourself compromising or hiding your convictions?",
          "Hypocrisy is contagious. How does our courage or compromise as men influence other brothers (like Peter's actions influenced Barnabas)?"
        ],
        resources: [
          { name: "Sermon: Face to Face Confrontation in Antioch", url: "https://example.com/peter-paul-confrontation" }
        ]
      }
    ]
  },
  {
    id: "spring-2026",
    title: "Spring 2026",
    theme: "Proverbs: The Path of Wisdom",
    startDate: "2026-03-05",
    description: "An 8-week immersion into the book of Proverbs. We analyze the differences between smartness and wisdom, discovering how ancient divine advice shapes modern decisions, words, relationships, finances, and character.",
    weeks: [
      {
        number: 1,
        title: "The Fear of the Lord",
        scripture: {
          reference: "Proverbs 1:7",
          text: "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction."
        },
        outline: [
          "Wisdom vs. Intelligence: Why high IQ can still lead to devastating life choices",
          "Defining 'The Fear of the Lord': Not cowering terror, but awe, reverence, and alignment with reality",
          "The starting line: Admitting we don't know it all (intellectual humility)",
          "The anatomy of a fool: Why pride rejects correction"
        ],
        questions: [
          "How would you explain the difference between 'intelligence' and 'biblical wisdom' to a co-worker?",
          "In what areas of your life are you currently tempted to 'despise instruction' or ignore advice?"
        ],
        resources: [
          { name: "Video: Introduction to Proverbs (BibleProject)", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
        ]
      },
      {
        number: 2,
        title: "Guarding Your Heart",
        scripture: {
          reference: "Proverbs 4:23",
          text: "Above all else, guard your heart, for everything you do flows from it."
        },
        outline: [
          "The heart as the control center: Out of it flows desires, thoughts, and actions",
          "What are we letting in? Auditing digital inputs, media, rumors, and envy",
          "Building active defensive systems: Boundaries with technology and physical environments",
          "Tending the soil: Cultivating gratitude, prayer, and scripture absorption"
        ],
        questions: [
          "What is currently the most difficult boundary for you to maintain to 'guard your heart'?",
          "How have you seen an unguarded heart poison a person's behavior, words, or relationships?"
        ],
        resources: [
          { name: "Reading: Tending Your Spiritual Internal Environment", url: "https://example.com/guarding-heart" }
        ]
      },
      {
        number: 3,
        title: "The Power of Words",
        scripture: {
          reference: "Proverbs 18:21",
          text: "The tongue has the power of life and death, and those who love it will eat its fruit."
        },
        outline: [
          "Words as weapons or medicine: The destructive potential of anger, gossip, and sarcasm",
          "The power of building up: Encouragement, speaking truth in love, and timely praise",
          "Slowing down the output: Why active listening is a hallmark of godly wisdom",
          "The digital tongue: Exercising wisdom on social media, texts, and emails"
        ],
        questions: [
          "Can you recall a time when someone's words spoke 'life' to you and changed your trajectory? When did words speak 'death'?",
          "How can you practically practice speaking more words of 'life' to your spouse, children, or team this week?"
        ],
        resources: [
          { name: "Podcast: The Weight of Our Words", url: "https://example.com/podcast-tongue" }
        ]
      },
      {
        number: 4,
        title: "Diligent Hands",
        scripture: {
          reference: "Proverbs 12:24",
          text: "Diligent hands will rule, but laziness ends in forced labor."
        },
        outline: [
          "Diligence vs. Busyness: Being truly productive vs. running on a hamster wheel",
          "Overcoming procrastination: Facing difficult tasks immediately",
          "Slothfulness in modern life: Passive consumption and screen addiction",
          "Developing a discipline of small, consistent improvements"
        ],
        questions: [
          "Where do you find yourself drifting into laziness (e.g. spiritual growth, health, domestic responsibilities, work)?",
          "What is one hard task you've been putting off that you will tackle first thing tomorrow?"
        ],
        resources: [
          { name: "Reading: The Discipline of Small Habits", url: "https://example.com/atomic-habits" }
        ]
      },
      {
        number: 5,
        title: "Pride and Humility",
        scripture: {
          reference: "Proverbs 11:2",
          text: "When pride comes, then comes disgrace, but with humility comes wisdom."
        },
        outline: [
          "The illusion of self-sufficiency: Expecting success without divine help",
          "How pride blocks learning: The inability to say 'I was wrong' or 'I need help'",
          "The correlation between pride and relational breakdown",
          "Cultivating practical humility: Seeking constructive criticism and serving in secret"
        ],
        questions: [
          "Why is it so painful to say 'I was wrong' or 'I am sorry' to those we love? How can we cultivate the humility to do it?",
          "In what area of your life are you currently acting as if you don't need any help?"
        ],
        resources: [
          { name: "Video: Humility as a Superpower", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
        ]
      },
      {
        number: 6,
        title: "Trusting the Lord",
        scripture: {
          reference: "Proverbs 3:5-6",
          text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
        },
        outline: [
          "The struggle for control: Why surrendering our plans is terrifying",
          "The limits of human 'understanding': Our narrow vision vs. His infinite perspective",
          "What 'submission in all ways' looks like in career decisions, finances, and health",
          "The promise of the straight path: Not a pain-free life, but a purposeful, direct navigation"
        ],
        questions: [
          "What is the most difficult situation you are currently facing where you are leaning heavily on your own understanding?",
          "What does a practical step of 'trusting with all your heart' look like in that situation?"
        ],
        resources: [
          { name: "Sermon: Safe in His Sovereignty", url: "https://example.com/trust-sermon" }
        ]
      },
      {
        number: 7,
        title: "Choosing Companions",
        scripture: {
          reference: "Proverbs 13:20",
          text: "Walk with the wise and become wise, for a companion of fools suffers harm."
        },
        outline: [
          "The law of relational gravity: We become like the five people we spend the most time with",
          "Identifying 'the wise' vs. 'the foolish' in your social circles",
          "The courage to limit toxic associations and invest in noble ones",
          "The mentor relationship: Finding an older guide and pouring into a younger runner"
        ],
        questions: [
          "Take an inventory of your closest friends. Are they pulling you closer to wisdom or dragging you toward folly?",
          "Do you currently have a mentor? Are you mentoring someone else? If not, how can you start?"
        ],
        resources: [
          { name: "Reading: Choosing Your Board of Advisors", url: "https://example.com/board-of-advisors" }
        ]
      },
      {
        number: 8,
        title: "The Legacy of Integrity",
        scripture: {
          reference: "Proverbs 20:7",
          text: "The righteous lead blameless lives; blessed are their children after them."
        },
        outline: [
          "The generational spillover: How a father's obedience establishes a spiritual ceiling for his descendants",
          "The definition of 'blameless': Not perfection, but swift confession and restoration",
          "What inheritance are we building? Character, spiritual foundation, and love vs. just money",
          "Celebrating a season of wisdom: Taking lessons from Proverbs into the summer months"
        ],
        questions: [
          "What is the greatest spiritual inheritance you received from your father or male figure?",
          "What is one legacy pattern you are determined to break for the sake of those who come after you?"
        ],
        resources: [
          { name: "Podcast: Building Generational Faith", url: "https://example.com/generational-faith" }
        ]
      }
    ]
  }
];
