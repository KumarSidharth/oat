document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lm-demo').forEach(demo => {
    const pre = demo.querySelector('pre');
    if (!pre) return;

    const code = pre.querySelector('code');
    const rawHTML = code.textContent;

    // Create tabbed interface.
    demo.innerHTML = `
      <lm-tabs>
        <div role="tablist">
          <button role="tab">Preview</button>
          <button role="tab">Code</button>
        </div>
        <div role="tabpanel">
          <div class="demo-box"><div class="demo-content">${rawHTML}</div></div>
        </div>
        <div role="tabpanel"></div>
      </lm-tabs>
    `;

    // Move the original Zola syntax-highlighted <pre> into the Code tab.
    demo.querySelector('[role="tabpanel"]:last-child').appendChild(pre);
  });
});
