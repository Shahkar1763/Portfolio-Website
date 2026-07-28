# Personal Portfolio Website

A complete, modern, fully responsive personal portfolio built with **plain HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no build tools required.

## 🚀 Live Preview
Simply open `index.html` in any modern browser. No installation or server needed.

## 📁 Folder Structure
```
portfolio/
│
├── index.html          # All page markup/sections
├── css/
│   └── style.css       # All styling, theme variables, responsive rules
├── js/
│   └── script.js       # All interactivity (vanilla JS, no dependencies)
├── images/             # Put your own project/profile images here
├── assets/             # Put your resume.pdf and other downloadable files here
└── README.md
```

## ✨ Features
- Sticky, responsive navigation bar with mobile hamburger menu
- Dark / Light mode toggle (saved in `localStorage`)
- Hero section with animated typing effect
- About, Skills (animated progress bars), Services, Projects, Education
  timeline, Certificates, Statistics (animated counters), Testimonials
  slider, and Contact form (with client-side validation)
- Scroll-triggered fade-in animations (Intersection Observer)
- Active nav-link highlighting while scrolling
- Scroll-to-top button
- Fully responsive: mobile, tablet, and desktop layouts using Flexbox & CSS Grid
- Lazy-loaded images (`loading="lazy"`)
- Clean, commented, beginner-friendly code

## 🎨 Customizing

### 1. Colors
All colors are defined as CSS variables at the top of `css/style.css`:
```css
:root {
  --color-primary: #2563EB;
  --color-secondary: #0F172A;
  --color-accent: #38BDF8;
  --color-bg: #ffffff;
  --color-text: #334155;
}
```
Change these values to re-theme the entire site instantly.

### 2. Content
Open `index.html` and edit the text directly — every section is clearly
labeled with HTML comments (e.g. `<!-- HERO SECTION -->`).

### 3. Images
Replace the placeholder image URLs (`https://placehold.co/...`) with your
own images. Save your images inside the `images/` folder and update the
`src` attributes, for example:
```html
<img src="images/profile.jpg" alt="My photo" loading="lazy" />
```

### 4. Resume / CV
Add your resume as `assets/resume.pdf`. The "Download CV" and
"Download Resume" buttons already point to that path.

### 5. Typing Animation Roles
Edit the `rolesToType` array near the top of `js/script.js`:
```js
const rolesToType = [
  "Full Stack Developer",
  "Frontend Developer",
  "AI Engineer"
];
```

### 6. Skills
Update the skill name and `data-width` (percentage) values inside the
Skills section of `index.html`.

### 7. Contact Form
The form currently validates input client-side and shows a success
message (no backend). To make it functional, connect it to a backend
service (e.g. Formspree, EmailJS, or your own API) inside the submit
handler in `js/script.js`.

## 🛠 Tech Stack
- HTML5 (semantic, SEO-friendly)
- CSS3 (Flexbox + Grid, CSS variables, no framework)
- Vanilla JavaScript (ES6+, no dependencies)
- Google Fonts (Poppins + Inter)
- Font Awesome 6 (icons via CDN)

## 📱 Browser Support
Works in all modern browsers (Chrome, Firefox, Edge, Safari). Uses
`prefers-reduced-motion` to respect accessibility settings.

## 📄 License
Free to use and modify for personal or commercial portfolio projects.
