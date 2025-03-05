document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor
  const cursor = document.querySelector('.cursor');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Interactive elements
  const links = document.querySelectorAll('a, .menu-toggle, .project-item');

  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'rgba(255,255,255,0.1)';
    });

    link.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'transparent';
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navItems = document.querySelector('.nav-items');

  menuToggle.addEventListener('click', () => {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';

    mobileMenu.innerHTML = `
            <div class="mobile-menu-inner">
                <div class="close-menu">CLOSE</div>
                <div class="mobile-links">
                    <a href="#work">WORK</a>
                    <a href="#about">ABOUT</a>
                    <a href="#contact">CONTACT</a>
                </div>
            </div>
        `;

    document.body.appendChild(mobileMenu);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      mobileMenu.style.opacity = '1';
    }, 10);

    document.querySelector('.close-menu').addEventListener('click', () => {
      mobileMenu.style.opacity = '0';

      setTimeout(() => {
        document.body.removeChild(mobileMenu);
        document.body.style.overflow = 'auto';
      }, 300);
    });

    document.querySelectorAll('.mobile-links a').forEach((anchor) => {
      anchor.addEventListener('click', function () {
        mobileMenu.style.opacity = '0';

        setTimeout(() => {
          document.body.removeChild(mobileMenu);
          document.body.style.overflow = 'auto';
        }, 300);
      });
    });
  });

  // Scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.project-item, .about-content, .contact-info'
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Intersection Observer for divider lines
  const dividerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When the divider comes into view
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
        // Optional: Reset when out of view for re-animation when scrolling back up
        else {
          entry.target.classList.remove('in-view');
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Trigger when 20% of the element is visible
    }
  );

  // Observe all divider lines
  const dividers = document.querySelectorAll('.divider-line');
  dividers.forEach((divider) => {
    dividerObserver.observe(divider);

    // Check if the divider is in a dark section and add appropriate class
    if (divider.closest('.about')) {
      divider.classList.add('dark');
    }
  });
});

