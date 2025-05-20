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

class Skill extends HTMLElement {
  connectedCallback() {
    const skillName = this.getAttribute("name");
    const rank = this.getAttribute("rank");
    const level = Number(this.getAttribute("level")) || 0;
    const limit = Number(this.getAttribute("limit")) || 5;

    const level_bar = Array.from(
      { length: limit },
      (_, i) =>
        `<div class="star ${
          i < level ? "star-completed" : "star-not-completed"
        }"></div>`
    );

    this.innerHTML = `
      <div class="skill">
        <p><span class="rank">${rank}.</span> ${skillName}</p>
        <div class="level">
        ${level_bar.join("")}
        </div>
      </div>    
    `;
  }
}

class Project extends HTMLElement {
  connectedCallback() {
    const description = this.getAttribute("description") || "No description";
    const websiteLink = this.getAttribute("link") || "#";
    const imgPath = this.getAttribute("img") || "";

    this.innerHTML = `
      <div class="project" style="background-image: url(${imgPath}), linear-gradient(#e0e1e2,#e0e1e2)">
        <div>
          <p>${description}</p>
          <a href="${websiteLink}" target="_blank"><button>Voir le site</button></a>
        </div>
      </div>
    `;
  }
}

class StepCareerPath extends HTMLElement {
  connectedCallback() {
    setTimeout(() => {
      const title = this.getAttribute("title") || "No title";
      const location = this.getAttribute("location") || "No location";
      const date = this.getAttribute("date") || "No date";
      const order = this.getAttribute("order") || "auto";
      let content = Array.from(this.childNodes);

      const contentContainer = document.createElement("p");
      content.forEach((element) => {
        contentContainer.appendChild(element);
      });

      contentContainer.classList.add("content-step");
      this.style.gridRow = order;

      this.innerHTML = `<div class="step-path">
              <p class="title-step">${title}</p>
              <p class="location-step">${location}</p>
              <p class="date-step">${date}</p>
              ${contentContainer.outerHTML}
      </div>`;
    }, 0);
  }
}

customElements.define("section-title", SectionTitle);
customElements.define("skill-item", Skill);
customElements.define("project-item", Project);
customElements.define("step-item", StepCareerPath);
