# AiraKit

A lightweight, static design kit built with pure HTML, CSS and JavaScript. Drop it into any project — no build tools, no dependencies, no framework required.

## Getting Started

Download or clone the repository and link the CSS files in your HTML:

```bash
git clone https://github.com/adrielfilipedesign/AiraKit.git
```

```html
<head>
  <link rel="stylesheet" href="path/to/base.css">
  <link rel="stylesheet" href="path/to/components.css">
  <link rel="stylesheet" href="path/to/themes.css">
  <script src="path/to/main.js" defer></script>
</head>
```

### Using with Flask

Place the files inside your `/static` folder and reference them with `url_for`:

```html
<link rel="stylesheet" href="{{ url_for('static', filename='css/base.css') }}">
<link rel="stylesheet" href="{{ url_for('static', filename='css/components.css') }}">
<link rel="stylesheet" href="{{ url_for('static', filename='css/themes.css') }}">
<script src="{{ url_for('static', filename='js/main.js') }}" defer></script>
```

AiraKit works the same way with Django, Laravel, Next.js, plain HTML or any other stack.

---

## Layout

| Class | Description |
|---|---|
| `.cont` | Centered flex container, column direction |
| `.row` | Flex row with wrapping |
| `.col` | Flex column |
| `.centv` | Align items center (vertical) |
| `.centh` | Justify content center (horizontal) |
| `.centvh` | Center both axes |
| `.full-width` | Breaks out of the grid to full width |
| `.cont-narrow` | Container with max-width 800px |
| `.cont-wide` | Container with max-width 1400px |

## Spacing

| Class | Value |
|---|---|
| `.p1` / `.p2` / `.p3` | 3rem / 2rem / 1rem |
| `.pt*` `.pb*` `.pl*` `.pr*` | top / bottom / left / right variants |
| `.g1` / `.g2` / `.g3` | gap 3rem / 2rem / 1rem |

## Text

| Class | Description |
|---|---|
| `.txtc` | Center |
| `.txtl` | Left |
| `.txtr` | Right |

## Borders

| Class | Description |
|---|---|
| `.b` | All sides |
| `.bt` | Top |
| `.bb` | Bottom |
| `.bl` | Left |
| `.br` | Right |

## Images

| Class | Max-width |
|---|---|
| `.img-xs` | 60px |
| `.img-sm` | 100px |
| `.img-md` | 160px |
| `.img-lg` | 240px |

---

## Components

### Buttons

```html
<a href="/path" class="btn_act">Primary</a>
<a href="/path" class="btn_del">Delete</a>
<a href="/path" class="btn_github">GitHub</a>
```

---

## Dark Mode

AiraKit supports dark mode automatically via `prefers-color-scheme` and manually via a toggle button.

### Toggle button

Add the attribute `data-theme-toggle` to any button to wire up the toggle automatically:

```html
<button class="btn-theme" onclick="toggleTheme(this)">
  <span class="theme-icon">🌙</span>
  <span class="theme-label">Dark</span>
</button>
```

The chosen theme is saved to `localStorage` and persists across sessions.

---

## File Structure

```
AiraKit/
├── static/
│   ├── css/
│   │   ├── base.css        # Reset, layout utilities, spacing
│   │   ├── components.css  # Buttons, navbar, footer
│   │   ├── themes.css      # Light and dark mode colors
│   │   └── layout.css      # Page-level layout
│   ├── js/
│   │   └── main.js         # Menu toggle, dark mode
│   ├── fonts/
│   └── img/
└── index.html
```

---

## Contributing

Contributions are welcome. Fork the repository, create a feature branch and open a pull request with a clear description of the change.

## License

MIT License.