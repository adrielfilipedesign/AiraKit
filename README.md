readme_content = '''# AiraKit

AiraKit is a flexible and responsive Design Kit created for use with Flask in Python, designed to simplify building web interfaces using semantic and modular CSS utility classes. It leverages CSS Flexbox and a set of custom utility classes for easy alignment, spacing, and layout organization.

## Features

- Flexbox-based layout utilities: `.cont`, `.centv`, `.centh`, `.centvh`, `.col`, `.row`.
- Text alignment classes: `.txtc` (center), `.txtl` (left), `.txtr` (right).
- Padding utilities: `.p1`, `.pt1`, `.pb1`, `.pl1`, `.pr1`, `.p2`, `.p3`, etc.
- Gap classes: `.g1`, `.g2`, `.g3` to control spacing between flex items.
- Border utilities: `.b`, `.bb`, `.bt`, `.bl`, `.br` for various borders.
- Responsive and maintained design system with header, footer, navigation, and menu styling.
- Side menu with toggle controlled by `.active` class on `#itensMenu`.

## Technologies Used

- Python with Flask for backend.
- Semantic HTML structure.
- CSS Flexbox layout with custom utility classes.

## Installation

Clone the repository:

```bash
git clone https://github.com/adrielfilipedesign/AiraKit.git
cd AiraKit
```

Install dependencies (using a Python virtual environment recommended):

```bash
pip install -r requirements.txt
```

## CSS Overview

The project includes a comprehensive custom CSS stylesheet providing:

- Reset and normalization styles.
- Typography with the 'Inter' font.
- Flexbox containers and alignment utilities: `.cont`, `.centv`, `.centh`, `.centvh`, `.col`, `.row`.
- Text alignment classes: `.txtc`, `.txtl`, `.txtr`.
- Padding classes for various spacing needs.
- Gap classes for spacing between flex items.
- Border classes for outlining elements.
- Fixed side menu with smooth toggle behavior.
- Styles for header, footer, navigation bars, links, and interactive menus.

## Basic Usage Example

Example HTML using key AiraKit CSS classes:

```html
<div class="cont">
  <header class="b bb">
    <h1 class="txtc">Welcome to AiraKit</h1>
  </header>
  <nav class="nav">
    <div class="navbar-logo">
      <img src="logo.png" alt="AiraKit Logo" />
    </div>
    <div class="navbar-toggle">☰</div>
  </nav>
  <main class="centvh col p2 g2">
    <section class="row g3">
      <article class="b p3 txtc">Block 1</article>
      <article class="b p3 txtc">Block 2</article>
      <article class="b p3 txtc">Block 3</article>
    </section>
  </main>
  <footer class="txtc pt1">© 2025 AiraKit Project</footer>
</div>
```

In this example:

- `.cont` defines a flex container with column direction and centered alignment.
- `.centvh` centers content vertically and horizontally.
- `.col` and `.row` create vertical and horizontal flex groups.
- Padding, gap, and border utility classes manage spacing and borders.
- Text alignment classes center the text.

## Contribution

Contributions are welcome! Please fork the repository, create feature branches for your changes, and submit pull requests with clear descriptions.

## License

This project is licensed under the MIT License.

---

Please let me know if you want more examples or sections added.
'''

with open("README.md","w",encoding="utf-8") as f:
    f.write(readme_content)

"README.md file created successfully."