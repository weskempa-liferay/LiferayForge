// Quest Navigation Interactive Features
(function() {
  'use strict';

  // Mobile menu toggle functionality
  function initMobileMenu() {
    const questNav = document.querySelector('.quest-navigation');
    if (!questNav) return;
    
    const navToggle = questNav.querySelector('#nav-toggle');
    const navMenu = questNav.querySelector('#nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Update ARIA attributes
      const isExpanded = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (questNav.contains(event.target)) return; // Click is within our navigation
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Add active link highlighting
  function initActiveLinkHighlighting() {
    const questNav = document.querySelector('.quest-navigation');
    if (!questNav) return;
    
    const navLinks = questNav.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
      
      link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    const questNav = document.querySelector('.quest-navigation');
    if (!questNav) return;
    
    const navLinks = questNav.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close mobile menu if open
          const navMenu = questNav.querySelector('#nav-menu');
          const navToggle = questNav.querySelector('#nav-toggle');
          if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  // Badge animation for notifications
  function initBadgeAnimations() {
    const questNav = document.querySelector('.quest-navigation');
    if (!questNav) return;
    
    const badges = questNav.querySelectorAll('.nav-badge');
    
    badges.forEach(badge => {
      // Pulse animation for new notifications
      badge.addEventListener('mouseenter', function() {
        this.style.animation = 'badgePulse 0.6s ease-in-out';
      });
      
      badge.addEventListener('mouseleave', function() {
        this.style.animation = '';
      });
    });
  }

  // User avatar hover effect
  function initUserAvatarEffects() {
    const questNav = document.querySelector('.quest-navigation');
    if (!questNav) return;
    
    const userAvatar = questNav.querySelector('.user-avatar');
    const userInfo = questNav.querySelector('.user-info');
    const navUser = questNav.querySelector('.nav-user');
    
    if (!userAvatar || !userInfo || !navUser) return;
    
    navUser.addEventListener('mouseenter', function() {
      const img = userAvatar.querySelector('img');
      img.style.transform = 'scale(1.1) rotate(5deg)';
      img.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
      
      userInfo.style.transform = 'translateX(5px)';
    });
    
    navUser.addEventListener('mouseleave', function() {
      const img = userAvatar.querySelector('img');
      img.style.transform = 'scale(1) rotate(0deg)';
      img.style.boxShadow = '';
      
      userInfo.style.transform = 'translateX(0)';
    });
  }

  // Navigation scroll behavior
  function initScrollBehavior() {
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('.quest-navigation');
    
    if (!nav) return;
    
    window.addEventListener('scroll', function() {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Keyboard navigation support
  function initKeyboardNavigation() {
    const questNav = document.querySelector('.quest-navigation');
    if (!questNav) return;
    
    const navLinks = questNav.querySelectorAll('.nav-link');
    const navToggle = questNav.querySelector('#nav-toggle');
    
    // Handle keyboard navigation
    questNav.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const navMenu = questNav.querySelector('#nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.focus();
        }
      }
    });
    
    // Tab navigation through links
    navLinks.forEach((link, index) => {
      link.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextLink = navLinks[index + 1] || navLinks[0];
          nextLink.focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevLink = navLinks[index - 1] || navLinks[navLinks.length - 1];
          prevLink.focus();
        }
      });
    });
  }

  // Add required CSS animations
  function addNavigationStyles() {
    if (document.querySelector('#nav-animation-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'nav-animation-styles';
    style.textContent = `
      @keyframes badgePulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
        }
        50% {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(139, 0, 0, 0.8);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
        }
      }
      
      .quest-navigation {
        transition: transform 0.3s ease;
      }
      
      .quest-navigation .nav-link.active {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(139, 0, 0, 0.15)) !important;
        border-color: #D4AF37 !important;
        color: #FFD700 !important;
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.3) !important;
      }
      
      .quest-navigation .nav-link.active .nav-link-icon {
        filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.6));
      }
      
      .user-avatar img,
      .user-info {
        transition: all 0.3s ease;
      }
      
      @media (max-width: 768px) {
        .nav-menu {
          backdrop-filter: blur(10px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize all navigation features
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      addNavigationStyles();
      initMobileMenu();
      initActiveLinkHighlighting();
      initSmoothScrolling();
      initBadgeAnimations();
      initUserAvatarEffects();
      initScrollBehavior();
      initKeyboardNavigation();
    });
  } else {
    addNavigationStyles();
    initMobileMenu();
    initActiveLinkHighlighting();
    initSmoothScrolling();
    initBadgeAnimations();
    initUserAvatarEffects();
    initScrollBehavior();
    initKeyboardNavigation();
  }
})();