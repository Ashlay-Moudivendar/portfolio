class SectionTitle extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("text") || "";
    this.innerHTML = `
        <div class="section-title">
          <div class="line line-left"></div>
          <div class="bracket bracket-left"></div>
          <h1>${title}</h1>
          <div class="bracket bracket-right"></div>
          <div class="line line-right"></div>
        </div>
        `;
  }
}


customElements.define('section-title', SectionTitle)