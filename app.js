/* ===== EduSpark App - Navigation & Interactions ===== */

document.addEventListener('DOMContentLoaded', () => {
  const screens = document.querySelectorAll('.screen');
  const navItems = document.querySelectorAll('.nav-item');
  const bottomNav = document.querySelector('.bottom-nav');

  const screenLabel = document.getElementById('current-screen-name');
  const strategyContent = document.getElementById('strategy-content');

  // Screen data for strategy panel
  const screenInfo = {
    splash: {
      name: 'S1 — Splash / Welcome',
      tags: ['acquisition'],
      description: 'First impression & brand trust. Animated gradient captures attention, social proof ("500K+ learners") builds credibility, one-tap CTA reduces friction.',
      features: [
        'Animated gradient background — visual appeal',
        'Social proof counter — trust building',
        '"Get Started Free" CTA — zero-friction entry',
        'Logo animation — brand memorability'
      ]
    },
    onboarding: {
      name: 'S2 — Onboarding Carousel',
      tags: ['acquisition'],
      description: 'Value proposition in 3 swipes. Shows learners exactly what they gain (Learn → Practice → Achieve) before asking for any commitment.',
      features: [
        '3-slide story arc — progressive value reveal',
        'Floating illustrations — visual delight',
        'Skip option — respects autonomy',
        'Dot indicators — orientation & progress'
      ]
    },
    signup: {
      name: 'S3 — Sign Up / Login',
      tags: ['acquisition'],
      description: 'Minimize signup friction with social login options and guest mode. Glass-morphism design conveys modernity and trust.',
      features: [
        'Social login (Google/Apple) — 1-tap signup',
        '"Continue as Guest" — removes commitment barrier',
        'Glass-morphism card — premium feel',
        'Input focus glow — polished micro-interaction'
      ]
    },
    home: {
      name: 'S4 — Home Dashboard',
      tags: ['retention', 'engagement'],
      description: 'Daily hook combining streaks, XP progress, and personalized quick-start cards. Designed to form habit loops.',
      features: [
        'Streak counter with fire animation — habit loop',
        'XP progress bar — gamification motivation',
        'Personalized quick-start cards — reduce decision fatigue',
        'Learning Path shortcut — journey visibility'
      ]
    },
    courses: {
      name: 'S5 — Course Menu',
      tags: ['engagement'],
      description: 'Content discovery with clear categorization. Premium courses tease value with blur overlay, driving upgrade consideration.',
      features: [
        'Category tabs (English/Maths) — easy navigation',
        'Difficulty badges — self-selection',
        'Premium blur + lock overlay — upgrade tease',
        'Card hover lift effects — interactive feel'
      ]
    },
    lesson: {
      name: 'S6 — Lesson View',
      tags: ['engagement'],
      description: 'Core learning experience with interactive quiz. Progress ring and XP reward reinforce the gamification loop and drive completion.',
      features: [
        'Progress ring animation — visual completion sense',
        'Quick Check quiz — active recall learning',
        '+10 XP instant reward — immediate gratification',
        'Premium gate strip — freemium conversion tease'
      ]
    },
    progress: {
      name: 'S7 — Learning Path',
      tags: ['retention'],
      description: 'Visualizes the full learning journey to create investment & sunk-cost motivation. Locked nodes create forward pull.',
      features: [
        'Weekly bar chart — habit visibility',
        'Achievement badges — milestone celebration',
        'Animated roadmap — visual journey ownership',
        'Locked & premium nodes — goal-setting pull'
      ]
    },
    chat: {
      name: 'S8 — Community Chat',
      tags: ['engagement'],
      description: 'Social stickiness through peer learning communities. Live activity indicators and emoji reactions make the app feel alive and connected.',
      features: [
        'Topic rooms (General/English/Maths) — self-selected groups',
        'Online count badge — FOMO & activity signal',
        'Emoji reactions — low-effort engagement',
        'Typing indicator — real-time presence feeling'
      ]
    },
    premium: {
      name: 'S9 — Premium Upgrade',
      tags: ['engagement'],
      description: 'Freemium conversion page. Monthly/yearly toggle nudges annual commitment. Social proof testimonials lower hesitation. 7-day trial removes risk.',
      features: [
        'Monthly/yearly toggle — annual commitment nudge',
        'Feature comparison — value clarity',
        '"Most Popular" ribbon — social proof anchor',
        '7-day free trial CTA — zero-risk conversion',
        'Learner testimonials — trust building'
      ]
    },
    settings: {
      name: 'S10 — Settings & Profile',
      tags: ['retention'],
      description: 'Personalisation hub that deepens user investment. Referral code creates viral acquisition loop. Notification controls keep users opted-in rather than churning.',
      features: [
        'Profile stats summary — identity & ownership',
        'Daily reminder toggle — habit reinforcement',
        'Dark mode — personalisation & comfort',
        'Referral code (ALEX-SPARK) — viral acquisition loop',
        'Star rating prompt — social proof generation'
      ]
    }
  };

  // Navigate to a screen
  function navigateTo(screenId) {
    screens.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen-${screenId}`);
    if (target) target.classList.add('active');

    navItems.forEach(n => n.classList.remove('active'));
    const activeNav = document.querySelector(`[data-screen="${screenId}"]`);
    if (activeNav) activeNav.classList.add('active');

    const noNavScreens = ['splash', 'signup', 'onboarding', 'lesson', 'progress', 'premium'];
    if (bottomNav) {
      bottomNav.style.display = noNavScreens.includes(screenId) ? 'none' : 'flex';
    }

    updateStrategyPanel(screenId);
    triggerScreenAnimations(screenId);
  }

  // Update strategy panel
  function updateStrategyPanel(screenId) {
    const info = screenInfo[screenId];
    if (!info || !screenLabel || !strategyContent) return;

    screenLabel.textContent = info.name;

    const tagsHTML = info.tags.map(tag => {
      const label = tag.charAt(0).toUpperCase() + tag.slice(1);
      return `<span class="strategy-tag tag-${tag}">
        <span class="indicator-dot dot-${tag}"></span>${label}
      </span>`;
    }).join('');

    const featuresHTML = info.features.map(f => `<li>${f}</li>`).join('');

    strategyContent.innerHTML = `
      <div style="margin-bottom: 12px">${tagsHTML}</div>
      <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
        ${info.description}
      </p>
      <ul class="strategy-list">${featuresHTML}</ul>
    `;
  }

  // Screen-specific animation triggers
  function triggerScreenAnimations(screenId) {
    if (screenId === 'home') {
      setTimeout(() => {
        const xpFill = document.querySelector('.xp-bar-fill');
        if (xpFill) xpFill.classList.add('animate');
      }, 300);
      const cards = document.querySelectorAll('.quick-card');
      cards.forEach((card, i) => {
        card.classList.remove('animate');
        setTimeout(() => card.classList.add('animate'), 200 + i * 150);
      });
    }

    if (screenId === 'courses') {
      const courseCards = document.querySelectorAll('.course-card');
      courseCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'all 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100 + i * 120);
      });
    }

    if (screenId === 'lesson') {
      // Reset quiz state
      document.querySelectorAll('.quiz-option').forEach(o => {
        o.disabled = false;
        o.classList.remove('correct', 'wrong');
      });
      const quizResult = document.getElementById('quiz-result');
      if (quizResult) quizResult.style.display = 'none';

      // Reset and animate progress ring
      const ring = document.querySelector('.ring-progress');
      const label = document.getElementById('lesson-pct');
      if (ring) {
        ring.style.transition = 'none';
        ring.style.strokeDashoffset = '113';
        setTimeout(() => {
          ring.style.transition = 'stroke-dashoffset 1.2s ease';
          ring.style.strokeDashoffset = '52'; // ~54% through lesson
          if (label) label.textContent = '54%';
        }, 400);
      }
    }

    if (screenId === 'progress') {
      // Animate bar chart with stagger
      const bars = document.querySelectorAll('.bar');
      bars.forEach(b => b.classList.remove('animate'));
      setTimeout(() => {
        bars.forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animate'), i * 80);
        });
      }, 300);

      // Animate roadmap line (draw ~60% — covers 2 complete + in-progress)
      const rmFill = document.querySelector('.rm-line-fill');
      if (rmFill) {
        rmFill.style.transition = 'none';
        rmFill.style.strokeDashoffset = '300';
        setTimeout(() => {
          rmFill.style.transition = 'stroke-dashoffset 1.5s ease';
          rmFill.style.strokeDashoffset = '118';
        }, 500);
      }
    }

    if (screenId === 'onboarding') {
      // Reset carousel to slide 0
      goToSlide(0, true);
    }

    if (screenId === 'chat') {
      // Animate messages in with stagger
      const msgs = document.querySelectorAll('.chat-msg-anim');
      msgs.forEach(m => m.classList.remove('visible'));
      setTimeout(() => {
        msgs.forEach((m, i) => {
          setTimeout(() => m.classList.add('visible'), i * 150);
        });
        // Show typing indicator after all messages
        const typing = document.getElementById('chat-typing');
        if (typing) {
          setTimeout(() => typing.classList.add('visible'), msgs.length * 150 + 400);
        }
      }, 150);
      // Scroll to bottom
      const chatBox = document.getElementById('chat-messages');
      if (chatBox) setTimeout(() => { chatBox.scrollTop = chatBox.scrollHeight; }, 200);
    }

    if (screenId === 'premium') {
      // Reset billing toggle to monthly
      const toggle = document.getElementById('billing-toggle');
      if (toggle) toggle.checked = false;
      const amountEl = document.getElementById('price-amount');
      const periodEl = document.getElementById('price-period');
      if (amountEl) amountEl.textContent = '£7.99';
      if (periodEl) periodEl.textContent = '/mo';
    }

    if (screenId === 'settings') {
      // Stagger-animate settings cards entrance
      const cards = document.querySelectorAll('#screen-settings .settings-card, #screen-settings .settings-referral-card');
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(() => {
          card.style.transition = 'all 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 150 + i * 100);
      });
    }
  }

  // ===== Bottom nav clicks =====
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const screen = item.getAttribute('data-screen');
      if (screen) navigateTo(screen);
    });
  });

  // ===== Global data-goto click handler =====
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-goto]');
    if (btn) {
      const target = btn.getAttribute('data-goto');
      navigateTo(target);
    }
  });

  // ===== Course tab switching =====
  const courseTabs = document.querySelectorAll('.course-tab');
  const courseLists = document.querySelectorAll('.course-list');

  courseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');
      courseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      courseLists.forEach(list => {
        if (list.getAttribute('data-category') === category) {
          list.style.display = 'flex';
          const cards = list.querySelectorAll('.course-card');
          cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.transition = 'all 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50 + i * 100);
          });
        } else {
          list.style.display = 'none';
        }
      });
    });
  });

  // ===== Onboarding Carousel =====
  let obCurrentSlide = 0;
  const obSlides = document.querySelectorAll('.ob-slide');
  const obDots = document.querySelectorAll('.ob-dot');
  const obNextBtn = document.getElementById('ob-next-btn');

  function goToSlide(n, instant) {
    if (obSlides.length === 0) return;
    // Exit current
    if (!instant) {
      obSlides[obCurrentSlide].classList.remove('ob-slide-active');
      obSlides[obCurrentSlide].classList.add('ob-slide-exit');
      obDots[obCurrentSlide].classList.remove('ob-dot-active');
      setTimeout(() => {
        obSlides[obCurrentSlide].classList.remove('ob-slide-exit');
        obCurrentSlide = n;
        activateSlide();
      }, 50);
    } else {
      obSlides.forEach(s => { s.classList.remove('ob-slide-active', 'ob-slide-exit'); });
      obDots.forEach(d => d.classList.remove('ob-dot-active'));
      obCurrentSlide = 0;
      activateSlide();
    }
  }

  function activateSlide() {
    obSlides[obCurrentSlide].classList.add('ob-slide-active');
    obDots[obCurrentSlide].classList.add('ob-dot-active');
    if (obNextBtn) {
      const isLast = obCurrentSlide === obSlides.length - 1;
      obNextBtn.innerHTML = isLast
        ? `Get Started <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
        : `Next <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    }
  }

  if (obNextBtn) {
    obNextBtn.addEventListener('click', () => {
      if (obCurrentSlide < obSlides.length - 1) {
        goToSlide(obCurrentSlide + 1, false);
      } else {
        navigateTo('signup');
      }
    });
  }

  // Dot click navigation
  obDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i !== obCurrentSlide) goToSlide(i, false);
    });
  });

  // ===== Lesson Quiz =====
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      // Disable all options after selection
      document.querySelectorAll('.quiz-option').forEach(o => { o.disabled = true; });

      const isCorrect = opt.getAttribute('data-correct') === 'true';
      const feedback = document.getElementById('quiz-result');

      if (isCorrect) {
        opt.classList.add('correct');
        if (feedback) {
          feedback.textContent = '✓ Correct! "Went" is the irregular past tense of "go". +10 XP earned!';
          feedback.className = 'quiz-result correct-result';
          feedback.style.display = 'block';
        }
        // Advance ring to 100% on correct answer
        const ring = document.querySelector('.ring-progress');
        const label = document.getElementById('lesson-pct');
        if (ring) {
          ring.style.transition = 'stroke-dashoffset 0.8s ease';
          ring.style.strokeDashoffset = '0';
          if (label) label.textContent = '100%';
        }
      } else {
        opt.classList.add('wrong');
        // Reveal correct answer
        document.querySelectorAll('.quiz-option[data-correct="true"]').forEach(c => c.classList.add('correct'));
        if (feedback) {
          feedback.textContent = '✗ Not quite. The correct answer is "went" — the irregular past tense of "go".';
          feedback.className = 'quiz-result wrong-result';
          feedback.style.display = 'block';
        }
      }
    });
  });

  // ===== Billing Toggle (Premium) =====
  const billingToggle = document.getElementById('billing-toggle');
  if (billingToggle) {
    billingToggle.addEventListener('change', () => {
      const amountEl = document.getElementById('price-amount');
      const periodEl = document.getElementById('price-period');
      if (!amountEl || !periodEl) return;
      if (billingToggle.checked) {
        amountEl.textContent = '£4.79';
        periodEl.textContent = '/mo · billed yearly';
      } else {
        amountEl.textContent = '£7.99';
        periodEl.textContent = '/mo';
      }
    });
  }

  // ===== Chat Room Tabs =====
  document.querySelectorAll('.chat-room-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.chat-room-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // ===== Chat Send Button =====
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatInput = document.getElementById('chat-input-field');
  const chatMessages = document.getElementById('chat-messages');

  function sendChatMessage() {
    if (!chatInput || !chatMessages) return;
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg sent chat-msg-anim';
    msgEl.style.setProperty('--delay', '0s');
    msgEl.innerHTML = `
      <div class="chat-bubble-wrap">
        <div class="chat-bubble">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>`;
    // Insert before typing indicator
    const typing = document.getElementById('chat-typing');
    chatMessages.insertBefore(msgEl, typing);
    setTimeout(() => msgEl.classList.add('visible'), 10);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  if (chatSendBtn) chatSendBtn.addEventListener('click', sendChatMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  // ===== Dark Mode Toggle =====
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const phoneScreen = document.querySelector('.phone-screen');
  if (darkModeToggle && phoneScreen) {
    darkModeToggle.addEventListener('change', () => {
      phoneScreen.classList.toggle('dark-mode', darkModeToggle.checked);
    });
  }

  // ===== Referral Copy Button =====
  const copyBtn = document.getElementById('copy-referral');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  }

  // ===== Rating Stars =====
  const ratingStars = document.querySelectorAll('.rating-star');
  ratingStars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-val'));
      ratingStars.forEach(s => {
        s.classList.toggle('selected', parseInt(s.getAttribute('data-val')) <= val);
      });
    });
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.getAttribute('data-val'));
      ratingStars.forEach(s => {
        const sv = parseInt(s.getAttribute('data-val'));
        s.style.color = sv <= val ? 'var(--accent)' : '';
      });
    });
    star.addEventListener('mouseleave', () => {
      ratingStars.forEach(s => {
        s.style.color = s.classList.contains('selected') ? 'var(--accent)' : '';
      });
    });
  });

  // ===== Annotation Toggle =====
  const annotBtn = document.getElementById('annotation-toggle');
  if (annotBtn && phoneScreen) {
    annotBtn.addEventListener('click', () => {
      const isOn = phoneScreen.classList.toggle('annotations-on');
      annotBtn.classList.toggle('active', isOn);
      annotBtn.querySelector('.annot-btn-dot + span, span:last-child') && null;
      // Update label text
      const textNode = [...annotBtn.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
      if (textNode) {
        textNode.textContent = isOn ? ' Hide Marketing Annotations' : ' Show Marketing Annotations';
      }
    });
  }

  // Initialize: show splash
  navigateTo('splash');
});
