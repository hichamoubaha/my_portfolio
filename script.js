document.addEventListener('DOMContentLoaded', () => {
  // Skills Filter Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  
  // Set initial active filter
  let activeFilter = 'all';
  
  // Timeline Animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observe each timeline item
  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });
  
  // Filter skills function
  const filterSkills = (filter) => {
    skillCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        // Add animation class when showing
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) rotateX(0)';
        }, 50);
      } else {
        // Hide with animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) rotateX(20deg)';
        // Remove from layout after animation
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
    
    // Update active button
    filterButtons.forEach(btn => {
      if (btn.dataset.filter === filter) {
        btn.classList.add('active');
        btn.classList.remove('border-gray-600', 'text-gray-400');
        btn.classList.add('border-[#FF5A5F]', 'text-white', 'bg-[#FF5A5F]');
      } else {
        btn.classList.remove('active', 'bg-[#FF5A5F]', 'text-white');
        btn.classList.add('border-gray-600', 'text-gray-400');
      }
    });
    
    activeFilter = filter;
  };
  
  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      if (filter !== activeFilter) {
        filterSkills(filter);
      }
    });
  });
  
  // Initialize with 'all' filter
  filterSkills('all');
  
  // Add hover effect for skill cards
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.skill-icon');
      icon.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.skill-icon');
      icon.style.transform = 'translateY(0)';
    });
  });
  // Smooth scroll for nav links with header offset handled by CSS scroll-margin
  const navLinks = Array.from(document.querySelectorAll('header nav a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  
  // Add click event for smooth scrolling
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', `#${targetId}`);
        
        // Update active link on click
        navLinks.forEach(lnk => lnk.classList.remove('text-[#FF5A5F]'));
        link.classList.add('text-[#FF5A5F]');
      }
    });
  });

  // Highlight active section on scroll
  const highlightNav = () => {
    let scrollPosition = window.scrollY + 150; // Adjusted offset for better UX
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-[#FF5A5F]');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-[#FF5A5F]');
          }
        });
      }
    });
  };
  
  // Initial highlight on page load
  highlightNav();
  
  // Update on scroll with throttling for better performance
  let isScrolling;
  window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(highlightNav, 50);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -60% 0px', // trigger when top third enters view
      threshold: 0.25,
    }
  );

  sections.forEach((sec) => observer.observe(sec));

  // Contact form handler (basic demo)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name || !data.email || !data.message) {
        alert('Please complete all fields.');
        return;
      }
      // Simulate successful send
      alert('Thanks! Your message has been sent.');
      form.reset();
    });
  }
  
  // Initialize timeline items with staggered delay
  timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
  });
  
  // Handle tab switching for experience/education
  const tabButtons = document.querySelectorAll('.experience-tab');
  const tabContents = document.querySelectorAll('.timeline-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active', 'bg-[#FF5A5F]', 'text-white'));
      button.classList.add('active', 'bg-[#FF5A5F]', 'text-white');
      
      // Show corresponding content
      const targetTab = button.dataset.tab;
      tabContents.forEach(content => {
        content.classList.add('hidden');
        if (content.id === `${targetTab}-timeline`) {
          content.classList.remove('hidden');
          // Reset and re-animate items when tab changes
          const items = content.querySelectorAll('.timeline-item');
          items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.15}s`;
            item.classList.remove('visible');
            // Use setTimeout to ensure the class is removed before re-adding
            setTimeout(() => {
              item.classList.add('visible');
            }, 10);
          });
        }
      });
    });
  });
});

