/**
 * LongTerm UI - Base Web Component Class
 * Provides lifecycle management, event handling, and utilities.
 */

class LTBase extends HTMLElement {
  #initialized = false;

  /**
   * Called when element is added to DOM.
   */
  connectedCallback() {
    if (this.#initialized) return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.#setup(), { once: true });
    } else {
      this.#setup();
    }
  }

  /**
   * Private setup - ensures init() is only called once.
   */
  #setup() {
    if (this.#initialized) return;
    this.#initialized = true;
    this.init();
  }

  /**
   * Override in subclass for initialization logic.
   */
  init() {}

  /**
   * Called when element is removed from DOM.
   */
  disconnectedCallback() {
    this.cleanup();
  }

  /**
   * Override in subclass for cleanup logic.
   */
  cleanup() {}

  /**
   * Central event handler - enables automatic cleanup.
   * Usage: element.addEventListener('click', this)
   * @param {Event} event
   */
  handleEvent(event) {
    const handler = this[`on${event.type}`];
    if (handler) handler.call(this, event);
  }

  /**
   * Emit a custom event.
   * @param {string} name - Event name
   * @param {any} detail - Event detail data
   * @returns {boolean} - Whether event was cancelled
   */
  emit(name, detail = null) {
    return this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail
    }));
  }

  /**
   * Get boolean attribute value.
   * @param {string} name
   * @returns {boolean}
   */
  getBool(name) {
    return this.hasAttribute(name);
  }

  /**
   * Set or remove boolean attribute.
   * @param {string} name
   * @param {boolean} value
   */
  setBool(name, value) {
    if (value) {
      this.setAttribute(name, '');
    } else {
      this.removeAttribute(name);
    }
  }

  /**
   * Query selector within this element.
   * @param {string} selector
   * @returns {Element|null}
   */
  $(selector) {
    return this.querySelector(selector);
  }

  /**
   * Query selector all within this element.
   * @param {string} selector
   * @returns {Element[]}
   */
  $$(selector) {
    return Array.from(this.querySelectorAll(selector));
  }

  /**
   * Generate a unique ID string.
   * @returns {string}
   */
  uid() {
    return Math.random().toString(36).slice(2, 10);
  }
}

// Export for use in other files
if (typeof window !== 'undefined') {
  window.LTBase = LTBase;
}
/**
 * LongTerm UI - Dialog Component
 * Wraps native <dialog> with trigger/close handling.
 *
 * Usage:
 * <lt-dialog>
 *   <button data-trigger>Open</button>
 *   <dialog>
 *     <header><h2>Title</h2></header>
 *     <p>Content</p>
 *     <footer>
 *       <button data-close>Close</button>
 *     </footer>
 *   </dialog>
 * </lt-dialog>
 */

class LTDialog extends LTBase {
  #dialog = null;

  static get observedAttributes() {
    return ['open'];
  }

  init() {
    this.#dialog = this.$('dialog');
    if (!this.#dialog) {
      console.warn('lt-dialog: No <dialog> element found');
      return;
    }

    this.#dialog.classList.add('animate-pop-in');

    // Trigger buttons
    this.$$('[data-trigger]').forEach(el => {
      el.addEventListener('click', this);
    });

    // Close buttons
    this.$$('[data-close]').forEach(el => {
      el.addEventListener('click', this);
    });

    // Close on backdrop click
    this.#dialog.addEventListener('click', this);

    // Close on Escape
    this.#dialog.addEventListener('keydown', this);

    // Close event from dialog
    this.#dialog.addEventListener('close', this);

    // Initial state
    if (this.hasAttribute('open')) {
      this.show();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open' && this.#dialog) {
      newValue !== null ? this.show() : this.close();
    }
  }

  onclick(event) {
    const target = event.target;

    // Trigger button
    if (target.closest('[data-trigger]')) {
      event.preventDefault();
      this.show();
      return;
    }

    // Close button
    if (target.closest('[data-close]')) {
      event.preventDefault();
      this.close();
      return;
    }

    // Backdrop click (click on dialog element itself)
    if (target === this.#dialog) {
      this.close();
    }
  }

  onkeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  onclose() {
    this.removeAttribute('open');
    this.emit('lt-dialog-close');
  }

  show() {
    if (this.#dialog && !this.#dialog.open) {
      this.#dialog.showModal();
      this.emit('lt-dialog-open');
    }
  }

  close() {
    if (this.#dialog && this.#dialog.open) {
      this.#dialog.setAttribute('data-state', 'closing');
      setTimeout(() => {
        this.#dialog.close();
        this.#dialog.removeAttribute('data-state');
      }, 150);
    }
  }

  get open() {
    return this.#dialog?.open ?? false;
  }

  set open(value) {
    this.setBool('open', value);
  }
}

customElements.define('lt-dialog', LTDialog);
/**
 * LongTerm UI - Tabs Component
 * Provides keyboard navigation and ARIA state management.
 *
 * Usage:
 * <lt-tabs>
 *   <div role="tablist">
 *     <button role="tab">Tab 1</button>
 *     <button role="tab">Tab 2</button>
 *   </div>
 *   <div role="tabpanel">Content 1</div>
 *   <div role="tabpanel">Content 2</div>
 * </lt-tabs>
 */

class LTTabs extends LTBase {
  #tabs = [];
  #panels = [];
  #activeIndex = 0;

  init() {
    this.#tabs = this.$$('[role="tab"]');
    this.#panels = this.$$('[role="tabpanel"]');

    if (this.#tabs.length === 0 || this.#panels.length === 0) {
      console.warn('lt-tabs: Missing tab or tabpanel elements');
      return;
    }

    // Generate IDs and set up ARIA
    this.#tabs.forEach((tab, i) => {
      const panel = this.#panels[i];
      if (!panel) return;

      const tabId = tab.id || `lt-tab-${this.uid()}`;
      const panelId = panel.id || `lt-panel-${this.uid()}`;

      tab.id = tabId;
      panel.id = panelId;
      tab.setAttribute('aria-controls', panelId);
      panel.setAttribute('aria-labelledby', tabId);

      tab.addEventListener('click', this);
      tab.addEventListener('keydown', this);
    });

    // Find initially active tab
    const activeTab = this.#tabs.findIndex(t =>
      t.getAttribute('aria-selected') === 'true'
    );
    this.#activate(activeTab >= 0 ? activeTab : 0);
  }

  onclick(event) {
    const tab = event.target.closest('[role="tab"]');
    if (tab) {
      const index = this.#tabs.indexOf(tab);
      if (index >= 0) {
        this.#activate(index);
      }
    }
  }

  onkeydown(event) {
    const { key } = event;
    let newIndex = this.#activeIndex;

    switch (key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = this.#activeIndex - 1;
        if (newIndex < 0) newIndex = this.#tabs.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = (this.#activeIndex + 1) % this.#tabs.length;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = this.#tabs.length - 1;
        break;
      default:
        return;
    }

    this.#activate(newIndex);
    this.#tabs[newIndex].focus();
  }

  #activate(index) {
    // Update tabs
    this.#tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Update panels
    this.#panels.forEach((panel, i) => {
      panel.hidden = i !== index;
    });

    this.#activeIndex = index;
    this.emit('lt-tab-change', { index, tab: this.#tabs[index] });
  }

  get activeIndex() {
    return this.#activeIndex;
  }

  set activeIndex(value) {
    if (value >= 0 && value < this.#tabs.length) {
      this.#activate(value);
    }
  }
}

customElements.define('lt-tabs', LTTabs);
/**
 * LongTerm UI - Dropdown Component
 * Menu with keyboard navigation.
 *
 * Usage:
 * <lt-dropdown>
 *   <button data-trigger>Options</button>
 *   <div data-dropdown-menu hidden>
 *     <button data-dropdown-item data-value="edit">Edit</button>
 *     <button data-dropdown-item data-value="delete">Delete</button>
 *   </div>
 * </lt-dropdown>
 */

class LTDropdown extends LTBase {
  #trigger = null;
  #menu = null;
  #items = [];
  #isOpen = false;
  #boundDocumentClick = null;

  init() {
    this.#trigger = this.$('[data-trigger]');
    this.#menu = this.$('[data-dropdown-menu]');

    if (!this.#trigger || !this.#menu) {
      console.warn('lt-dropdown: Missing trigger or menu element');
      return;
    }

    this.#items = this.$$('[data-dropdown-item]');

    // Set up ARIA
    const menuId = this.#menu.id || `lt-menu-${this.uid()}`;
    this.#menu.id = menuId;
    this.#trigger.setAttribute('aria-haspopup', 'true');
    this.#trigger.setAttribute('aria-expanded', 'false');
    this.#trigger.setAttribute('aria-controls', menuId);
    this.#menu.setAttribute('role', 'menu');

    // Set up items
    this.#items.forEach(item => {
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '-1');
    });

    this.#trigger.addEventListener('click', this);
    this.#trigger.addEventListener('keydown', this);
    this.#menu.addEventListener('keydown', this);
    this.#menu.addEventListener('click', this);

    // Close on outside click
    this.#boundDocumentClick = this.#onDocumentClick.bind(this);
    document.addEventListener('click', this.#boundDocumentClick);
  }

  cleanup() {
    if (this.#boundDocumentClick) {
      document.removeEventListener('click', this.#boundDocumentClick);
    }
  }

  #onDocumentClick(event) {
    if (this.#isOpen && !this.contains(event.target)) {
      this.close();
    }
  }

  onclick(event) {
    const target = event.target;

    // Trigger click
    if (this.#trigger.contains(target)) {
      event.preventDefault();
      event.stopPropagation();
      this.toggle();
      return;
    }

    // Item click
    const item = target.closest('[data-dropdown-item]');
    if (item && this.#menu.contains(item)) {
      this.emit('lt-dropdown-select', {
        item,
        value: item.dataset.value
      });
      this.close();
      this.#trigger.focus();
    }
  }

  onkeydown(event) {
    const { key } = event;

    // Trigger keyboard
    if (event.target === this.#trigger) {
      if (key === 'ArrowDown' || key === 'Enter' || key === ' ') {
        event.preventDefault();
        this.open();
        this.#focusFirst();
      }
      return;
    }

    // Menu keyboard
    const currentIndex = this.#items.indexOf(document.activeElement);

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        this.#focusAt((currentIndex + 1) % this.#items.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.#focusAt(currentIndex - 1 < 0 ? this.#items.length - 1 : currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        this.#focusFirst();
        break;
      case 'End':
        event.preventDefault();
        this.#focusAt(this.#items.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        this.#trigger.focus();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (currentIndex >= 0) {
          this.#items[currentIndex].click();
        }
        break;
    }
  }

  #focusFirst() {
    this.#items[0]?.focus();
  }

  #focusAt(index) {
    this.#items[index]?.focus();
  }

  open() {
    if (this.#isOpen) return;
    this.#isOpen = true;
    this.#menu.hidden = false;
    this.#trigger.setAttribute('aria-expanded', 'true');
    this.setAttribute('data-state', 'open');
    this.emit('lt-dropdown-open');
  }

  close() {
    if (!this.#isOpen) return;
    this.#isOpen = false;
    this.#menu.hidden = true;
    this.#trigger.setAttribute('aria-expanded', 'false');
    this.setAttribute('data-state', 'closed');
    this.emit('lt-dropdown-close');
  }

  toggle() {
    this.#isOpen ? this.close() : this.open();
  }

  get isOpen() {
    return this.#isOpen;
  }
}

customElements.define('lt-dropdown', LTDropdown);
/**
 * LongTerm UI - Toast Component
 * Auto-dismissing notifications.
 *
 * Usage:
 * <lt-toast-container></lt-toast-container>
 *
 * // Programmatic:
 * const container = document.querySelector('lt-toast-container');
 * container.show({ message: 'Saved!', variant: 'success' });
 *
 * // Or declarative:
 * <lt-toast visible duration="5000">
 *   <span>Message here</span>
 *   <button data-close>×</button>
 * </lt-toast>
 */

class LTToast extends LTBase {
  #duration = 5000;
  #timeout = null;

  static get observedAttributes() {
    return ['duration', 'visible'];
  }

  init() {
    this.#duration = parseInt(this.getAttribute('duration') || '5000', 10);
    this.classList.add('animate-slide-in');

    // Close button
    this.$$('[data-close]').forEach(el => {
      el.addEventListener('click', this);
    });

    // Show if visible
    if (this.hasAttribute('visible')) {
      this.show();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'visible':
        newValue !== null ? this.show() : this.close();
        break;
      case 'duration':
        this.#duration = parseInt(newValue || '5000', 10);
        break;
    }
  }

  onclick(event) {
    if (event.target.closest('[data-close]')) {
      this.close();
    }
  }

  show() {
    this.setAttribute('data-state', 'open');
    this.hidden = false;
    this.emit('lt-toast-open');

    // Auto-dismiss
    if (this.#duration > 0) {
      this.#clearTimeout();
      this.#timeout = setTimeout(() => this.close(), this.#duration);
    }
  }

  close() {
    this.#clearTimeout();
    this.setAttribute('data-state', 'closing');
    this.removeAttribute('visible');
    this.emit('lt-toast-close');

    // Remove from DOM after animation
    setTimeout(() => {
      if (this.parentElement?.tagName === 'LT-TOAST-CONTAINER') {
        this.remove();
      } else {
        this.hidden = true;
      }
    }, 150);
  }

  #clearTimeout() {
    if (this.#timeout) {
      clearTimeout(this.#timeout);
      this.#timeout = null;
    }
  }

  cleanup() {
    this.#clearTimeout();
  }
}

customElements.define('lt-toast', LTToast);


/**
 * Toast Container - Manages multiple toasts
 */
class LTToastContainer extends LTBase {
  /**
   * Show a toast notification.
   * @param {Object} options
   * @param {string} options.message - Toast message
   * @param {string} [options.variant] - 'success' | 'error' | 'warning'
   * @param {number} [options.duration] - Duration in ms (0 = no auto-dismiss)
   * @returns {LTToast}
   */
  show({ message, variant = '', duration = 5000 }) {
    const toast = document.createElement('lt-toast');
    toast.setAttribute('duration', String(duration));
    if (variant) {
      toast.setAttribute('data-variant', variant);
    }

    toast.innerHTML = `
      <span>${message}</span>
      <button data-close aria-label="Close" style="background:none;border:none;cursor:pointer;padding:0;margin-left:auto;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    `;

    this.appendChild(toast);

    // Trigger show after append
    requestAnimationFrame(() => toast.show());

    return toast;
  }

  /**
   * Close all toasts.
   */
  clear() {
    this.$$('lt-toast').forEach(toast => toast.close());
  }
}

customElements.define('lt-toast-container', LTToastContainer);
