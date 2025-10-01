# Vidyaarthi Theme

A beautiful, modern Hugo theme with glassmorphism design, featuring gradient backgrounds and responsive layout. Extracted from custom PaperMod modifications to create a standalone theme.

## Features

- 🎨 **Glassmorphism Design** - Modern glass-effect cards with backdrop blur
- 🌈 **Beautiful Gradients** - Custom teal-to-orange gradient backgrounds  
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🔍 **Live Search** - Real-time search functionality with JSON index
- 🎯 **Math Support** - KaTeX integration for mathematical expressions
- 📝 **Code Highlighting** - Syntax highlighting with copy-to-clipboard
- 🏷️ **Taxonomies** - Categories and tags support
- 📌 **Pinned Posts** - Feature important content
- 🎭 **Multiple Layouts** - Home, single post, list, and archive layouts
- ⚡ **Fast Performance** - Optimized CSS and JavaScript

## Installation

### Option 1: Git Submodule

```bash
cd your-hugo-site
git submodule add https://github.com/yourusername/vidyaarthi-theme.git themes/vidyaarthi-theme
```

### Option 2: Clone or Download

```bash
cd your-hugo-site/themes
git clone https://github.com/yourusername/vidyaarthi-theme.git
```

## Configuration

Update your `hugo.toml` file:

```toml
baseURL = 'https://yoursite.com'
languageCode = 'en-us'
title = 'Your Site Title'
theme = 'vidyaarthi-theme'

# Enable search functionality
[outputs]
home = ["HTML", "RSS", "JSON"]

# Pagination
[pagination]
pagerSize = 9

[params]
description = "Your site description"
author = "Your Name"

# Math support
math = true

# Main sections for homepage
mainSections = ["posts", "blog"]

# Social links (optional)
[params.social]
twitter = "https://twitter.com/yourusername"
linkedin = "https://linkedin.com/in/yourusername"
github = "https://github.com/yourusername"
youtube = "https://youtube.com/@yourusername"

# Menu configuration
[[menu.main]]
name = "Home"
url = "/"
weight = 10

[[menu.main]]
name = "About"
url = "/about/"
weight = 20

[[menu.main]]
name = "Posts"
url = "/posts/"
weight = 30

# Markup configuration for math
[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 6
    ordered = false
```

## Content Structure

### Post Front Matter

```yaml
---
title: "Your Post Title"
date: 2023-01-01
author: "Author Name"
categories: ["Category"]
tags: ["tag1", "tag2"]
math: true  # Enable math for this post
pinned: true  # Pin this post to top of homepage
cover:
  image: "images/your-image.jpg"
  alt: "Alt text for image"
description: "Post description"
---
```

### Folder Structure

```
content/
├── _index.md
├── about.md
├── posts/
│   ├── _index.md
│   ├── post-1.md
│   └── post-2.md
└── static/
    └── images/
        └── cover.jpg
```

## Color Palette

The theme uses these custom colors:

- **Primary Teal**: `#2A9D8F`
- **Primary Dark**: `#264653`
- **Accent Orange**: `#F4A261`
- **Muted Yellow**: `#E9C46A`
- **Highlight Red**: `#E76F51`

## Customization

### Custom CSS

Create `assets/css/custom.scss` in your site root to override styles:

```scss
:root {
  --accent: #your-color;
  --highlight: #your-other-color;
}

// Your custom styles here
```

### Custom JavaScript

Create `assets/js/custom.js` in your site root for additional functionality.

## Features Details

### Search Functionality
- Real-time search as you type
- Searches through titles, descriptions, and content
- Mobile-optimized search interface
- Uses Hugo's JSON output format

### Math Support
- KaTeX integration for LaTeX math expressions
- Inline math with `$...$`
- Display math with `$$...$$`
- Enable with `math: true` in front matter

### Code Highlighting
- Syntax highlighting for code blocks
- Copy-to-clipboard functionality
- Language detection
- Multiple color schemes

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile
- Responsive images
- Touch-friendly interface

## Development

To contribute to the theme:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with example site
5. Submit a pull request

## License

This theme is released under the MIT License. See [LICENSE](LICENSE) for details.

## Credits

- Based on custom modifications of the PaperMod theme
- Uses Google Fonts (Plus Jakarta Sans, Yatra One)
- KaTeX for mathematical expressions
- Modern CSS features for glassmorphism effects

## Support

If you have issues or questions:

1. Check the [documentation](https://github.com/yourusername/vidyaarthi-theme/wiki)
2. Search [existing issues](https://github.com/yourusername/vidyaarthi-theme/issues)
3. Create a [new issue](https://github.com/yourusername/vidyaarthi-theme/issues/new)

## Changelog

### v1.0.0
- Initial release
- Extracted from custom PaperMod modifications
- Full responsiveness
- Search functionality
- Math support
- Code highlighting