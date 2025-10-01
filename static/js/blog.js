// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.getElementById("mobileNav");
const mainNav = document.querySelector(".main-nav");
const searchContainer = document.querySelector(".search-container");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    if (mobileNav.innerHTML.trim() === "") {
      // Clone nav links for mobile and add search box
      const mobileContent = document.createElement("div");
      mobileContent.className = "mobile-content";
      
      // Add search box for mobile
      if (searchContainer) {
        const mobileSearchContainer = searchContainer.cloneNode(true);
        mobileSearchContainer.className = "mobile-search-container";
        mobileSearchContainer.style.display = "block";
        
        // Update IDs to avoid conflicts
        const mobileSearchBox = mobileSearchContainer.querySelector('#searchBox');
        const mobileSearchResults = mobileSearchContainer.querySelector('#searchResults');
        const mobileSearchClear = mobileSearchContainer.querySelector('#searchClear');
        
        if (mobileSearchBox) {
          mobileSearchBox.id = 'mobileSearchBox';
          mobileSearchBox.placeholder = 'Search posts...';
        }
        if (mobileSearchResults) {
          mobileSearchResults.id = 'mobileSearchResults';
        }
        if (mobileSearchClear) {
          mobileSearchClear.id = 'mobileSearchClear';
        }
        
        mobileContent.appendChild(mobileSearchContainer);
        
        // Initialize mobile search functionality after a small delay
        setTimeout(() => {
          initMobileSearch(mobileSearchBox, mobileSearchResults, mobileSearchClear);
        }, 100);
      }
      
      // Add navigation links
      if (mainNav) {
        const navLinks = mainNav.cloneNode(true);
        navLinks.className = "mobile-nav-links";
        
        // Handle dropdown in mobile navigation
        const mobileDropdown = navLinks.querySelector('.dropdown');
        if (mobileDropdown) {
          const dropdownToggle = mobileDropdown.querySelector('.dropdown-toggle');
          const dropdownMenu = mobileDropdown.querySelector('.dropdown-menu');
          
          // Make dropdown work on click for mobile
          dropdownToggle.addEventListener("click", function(e) {
            e.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            this.classList.toggle('active');
          });
        }
        
        mobileContent.appendChild(navLinks);
      }
      
      mobileNav.appendChild(mobileContent);
    }
  });
}

// Mobile search functionality
function initMobileSearch(searchBox, searchResults, searchClear) {
  if (!searchBox || !searchResults || !searchClear) {
    console.warn('Mobile search elements not found:', { searchBox, searchResults, searchClear });
    return;
  }
  
  console.log('Initializing mobile search...');
  
  // Function to show/hide clear button for mobile
  function toggleMobileClearButton() {
    if (searchBox.value.length > 0) {
      searchClear.classList.add("visible");
    } else {
      searchClear.classList.remove("visible");
    }
  }
  
  // Function to clear mobile search
  function clearMobileSearch() {
    searchBox.value = "";
    searchBox.focus();
    searchResults.innerHTML = "";
    searchResults.style.display = "none";
    toggleMobileClearButton();
  }
  
  // Mobile search event listeners
  searchBox.addEventListener("input", function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    const query = this.value.toLowerCase().trim();
    toggleMobileClearButton();
    
    console.log('Mobile search query:', query);

    if (query.length === 0) {
      searchResults.innerHTML = "";
      searchResults.style.display = "none";
      return;
    }
    
    // Ensure search index is loaded
    if (!searchIndex || searchIndex.length === 0) {
      console.warn('Search index not loaded, attempting to reload...');
      loadSearchIndex().then(() => {
        performMobileSearch(query, searchResults);
      });
      return;
    }
    
    performMobileSearch(query, searchResults);
  });

  // Clear button event listener for mobile
  searchClear.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    clearMobileSearch();
  });

  // Keyboard navigation for mobile search
  searchBox.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
      clearMobileSearch();
    } else if (e.key === "Enter" && searchResults.style.display === "block") {
      e.preventDefault();
      const firstResult = searchResults.querySelector(".search-result-item:not(.no-results)");
      if (firstResult) {
        firstResult.click();
      }
    }
  });
  
  // Initial setup
  toggleMobileClearButton();
}

// Perform mobile search
function performMobileSearch(query, searchResults) {
  const matchingPosts = searchIndex.filter(post => {
    const title = post.title?.toLowerCase() || '';
    const description = post.description?.toLowerCase() || '';
    const content = post.content?.toLowerCase() || '';
    return title.includes(query) || description.includes(query) || content.includes(query);
  });

  searchResults.innerHTML = "";
  
  if (matchingPosts.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item no-results">No posts found</div>';
  } else {
    matchingPosts.slice(0, 6).forEach((post) => {
      const resultItem = document.createElement("a");
      resultItem.href = post.href;
      resultItem.className = "search-result-item";
      resultItem.innerHTML = `
        <div class="search-result-image">
          <img src="/images/cover.png" alt="${post.title}" onerror="this.style.display='none'">
        </div>
        <div class="search-result-content">
          <h3>${post.title}</h3>
          <p>${(post.description || 'No description available').substring(0, 60)}${(post.description && post.description.length > 60) ? '...' : ''}</p>
        </div>
      `;
      searchResults.appendChild(resultItem);
    });
  }
  
  searchResults.style.display = "block";
  console.log('Mobile search results displayed:', matchingPosts.length);
}

// Search functionality
const searchBox = document.getElementById("searchBox");
const searchResults = document.getElementById("searchResults");
const searchClear = document.getElementById("searchClear");

// Global search index
let searchIndex = [];

// Load search index
async function loadSearchIndex() {
  try {
    const response = await fetch('/index.json');
    if (response.ok) {
      searchIndex = await response.json();
    } else {
      console.warn('Search index not available');
    }
  } catch (error) {
    console.warn('Failed to load search index:', error);
  }
}

// Initialize search index
loadSearchIndex();

// Function to show/hide clear button
function toggleClearButton() {
  if (searchBox && searchClear) {
    if (searchBox.value.length > 0) {
      searchClear.classList.add("visible");
    } else {
      searchClear.classList.remove("visible");
    }
  }
}

// Function to clear search
function clearSearch() {
  if (searchBox && searchResults && searchClear) {
    searchBox.value = "";
    searchBox.focus();
    searchResults.innerHTML = "";
    searchResults.style.display = "none";
    toggleClearButton();
  }
}

// Search event listeners
if (searchBox) {
  searchBox.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    toggleClearButton();

    if (searchResults) {
      if (query.length === 0) {
        searchResults.innerHTML = "";
        searchResults.style.display = "none";
      } else {
        // Search through the loaded index
        const matchingPosts = searchIndex.filter(post => {
          const title = post.title?.toLowerCase() || '';
          const description = post.description?.toLowerCase() || '';
          const content = post.content?.toLowerCase() || '';
          return title.includes(query) || description.includes(query) || content.includes(query);
        });

        searchResults.innerHTML = "";
        
        if (matchingPosts.length === 0) {
          searchResults.innerHTML = '<div class="search-result-item no-results">No posts found</div>';
        } else {
          matchingPosts.slice(0, 8).forEach((post) => {
            const resultItem = document.createElement("a");
            resultItem.href = post.href;
            resultItem.className = "search-result-item";
            resultItem.innerHTML = `
              <div class="search-result-image">
                <img src="/images/cover.png" alt="${post.title}" onerror="this.style.display='none'">
              </div>
              <div class="search-result-content">
                <h3>${post.title}</h3>
                <p>${(post.description || 'No description available').substring(0, 100)}${(post.description && post.description.length > 100) ? '...' : ''}</p>
              </div>
            `;
            searchResults.appendChild(resultItem);
          });
        }
        
        searchResults.style.display = "block";
      }
    }
  });

  // Clear button event listener
  if (searchClear) {
    searchClear.addEventListener("click", clearSearch);
  }

  // Keyboard navigation for search
  searchBox.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      clearSearch();
    } else if (e.key === "Enter" && searchResults && searchResults.style.display === "block") {
      const firstResult = searchResults.querySelector(".search-result-item:not(.no-results)");
      if (firstResult) {
        firstResult.click();
      }
    }
  });
}

// Hide search results when clicking outside
document.addEventListener("click", function (event) {
  // Handle desktop search
  if (searchBox && searchResults && searchClear) {
    if (
      !searchBox.contains(event.target) &&
      !searchResults.contains(event.target) &&
      !searchClear.contains(event.target)
    ) {
      searchResults.style.display = "none";
    }
  }
  
  // Handle mobile search results
  const mobileSearchResults = document.getElementById('mobileSearchResults');
  const mobileSearchBox = document.getElementById('mobileSearchBox');
  const mobileSearchClear = document.getElementById('mobileSearchClear');
  
  if (mobileSearchResults && mobileSearchBox && mobileSearchClear) {
    if (
      !mobileSearchBox.contains(event.target) &&
      !mobileSearchResults.contains(event.target) &&
      !mobileSearchClear.contains(event.target) &&
      mobileNav && mobileNav.classList.contains('open')
    ) {
      mobileSearchResults.style.display = "none";
    }
  }
  
  // Close mobile nav when clicking outside
  if (mobileNav && hamburger) {
    if (
      !mobileNav.contains(event.target) && 
      !hamburger.contains(event.target) &&
      mobileNav.classList.contains('open')
    ) {
      mobileNav.classList.remove('open');
    }
  }
});

// Close mobile nav when clicking on links
document.addEventListener('click', function(event) {
  if (event.target.matches('.mobile-nav-links a')) {
    if (mobileNav) {
      mobileNav.classList.remove('open');
    }
  }
});

// Initialize dropdown functionality
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Close all dropdowns helper
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  }
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // Click to toggle dropdown (desktop/tablet)
    if (toggle && menu) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const wasOpen = dropdown.classList.contains('open');
        closeAllDropdowns();
        if (!wasOpen) {
          dropdown.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
        } else {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
    
    // Handle click outside to close dropdown
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        toggle && toggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeAllDropdowns();
      }
    });
  });
}

// Copy code functionality
function initCodeCopyButtons() {
  // Add copy buttons to all pre blocks
  const preBlocks = document.querySelectorAll('.post-content pre');
  
  preBlocks.forEach((pre, index) => {
    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    copyBtn.setAttribute('data-index', index);
    
    // Add click event
    copyBtn.addEventListener('click', async function() {
      const codeElement = pre.querySelector('code');
      if (!codeElement) return;
      
      const codeText = codeElement.textContent || codeElement.innerText;
      
      try {
        await navigator.clipboard.writeText(codeText);
        
        // Show success state
        this.textContent = 'Copied';
        this.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
          this.textContent = 'Copy';
          this.classList.remove('copied');
        }, 2000);
        
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = codeText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          this.textContent = 'Copied';
          this.classList.add('copied');
          
          setTimeout(() => {
            this.textContent = 'Copy';
            this.classList.remove('copied');
          }, 2000);
        } catch (err) {
          this.textContent = 'Error';
          setTimeout(() => {
            this.textContent = 'Copy';
          }, 2000);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    });
    
    // Add button to pre block
    pre.appendChild(copyBtn);
  });
}

// Table of Contents functionality
function initTableOfContents() {
  const toc = document.getElementById('toc');
  const tocToggle = document.getElementById('tocToggle');
  const tocContent = document.getElementById('tocContent');
  
  if (!toc || !tocContent) return;
  
  // Toggle TOC collapse/expand
  if (tocToggle) {
    tocToggle.addEventListener('click', function() {
      toc.classList.toggle('collapsed');
    });
  }
  
  // Get all heading elements in the post content
  const headings = document.querySelectorAll('#postContent h2, #postContent h3, #postContent h4, #postContent h5, #postContent h6');
  const tocLinks = tocContent.querySelectorAll('a');
  
  if (headings.length === 0 || tocLinks.length === 0) return;
  
  // Add IDs to headings if they don't have them
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
  });
  
  // Update TOC links to point to heading IDs
  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      // Find matching heading by text content or create ID
      const headingText = link.textContent.trim();
      const matchingHeading = Array.from(headings).find(h => 
        h.textContent.trim() === headingText || h.id === href.substring(1)
      );
      
      if (matchingHeading) {
        link.setAttribute('href', `#${matchingHeading.id}`);
      }
    }
  });
  
  // Smooth scroll to sections
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Highlight active section while scrolling
  function updateActiveTocLink() {
    let activeHeading = null;
    const scrollPosition = window.scrollY + 100; // Offset for better UX
    
    // Find the current active heading
    headings.forEach(heading => {
      const headingTop = heading.offsetTop;
      if (headingTop <= scrollPosition) {
        activeHeading = heading;
      }
    });
    
    // Update TOC links
    tocLinks.forEach(link => {
      link.classList.remove('active');
      
      if (activeHeading) {
        const href = link.getAttribute('href');
        if (href === `#${activeHeading.id}`) {
          link.classList.add('active');
        }
      }
    });
  }
  
  // Throttled scroll listener for performance
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveTocLink();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Add scroll listener
  window.addEventListener('scroll', onScroll);
  
  // Initial check
  updateActiveTocLink();
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  initDropdowns();
  toggleClearButton();
  initCodeCopyButtons();
  initTableOfContents();
});