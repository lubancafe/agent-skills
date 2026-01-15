---
name: pptx-adv
description: "Presentation creation, editing, and analysis. When Claude needs to work with presentations (.pptx files) for: (1) Creating new presentations, (2) Modifying or editing content, (3) Working with layouts, (4) Adding comments or speaker notes, or any other presentation tasks"
license: Proprietary. LICENSE.txt has complete terms
---

# PPTX creation, editing, and analysis

## Overview

A user may ask you to create, edit, or analyze the contents of a .pptx file. A .pptx file is essentially a ZIP archive containing XML files and other resources that you can read or edit. You have different tools and workflows available for different tasks.

## 启用工作流（Skill Activation Workflow）

**重要**：在启用 pptx skill 创建新演示文稿时，必须按以下步骤进行交互：

### 步骤 1：确认语言偏好

**首先询问用户 PPT 使用什么语言**：
- 中文 / 英文 / 其他语言
- 该语言将应用于 PPT 的所有文本内容
- **默认不要假设语言**，必须明确询问

### 步骤 2：获取主题色系

**重要：PPT 底色默认必须为白色 (#FFFFFF)**，除非用户明确要求其他背景色。

询问用户 PPT 的主题颜色：
- 用户可以**提供图片/网站截图**：从中提取主题色系
- 用户可以**文字描述**：如"科技蓝"、"商务灰"、"活力橙"等
- **背景色默认白色**：主题色用于标题、强调元素、图标等，而非背景

**从图片/截图提取色系时的关键要求**：

1. **必须提取具体的十六进制颜色值**，不要凭感觉猜测
2. **识别颜色的实际用途**：
   - 主色（Primary）：通常是按钮、标题、强调元素的颜色
   - 背景色：页面背景、卡片背景
   - 文字色：标题文字、正文文字的颜色
   - 强调色（Accent）：图标、高亮、装饰元素

3. **常见颜色提取示例**：
   | 描述 | 常见值 |
   |------|--------|
   | 亮紫色 | #7C3AED, #8B5CF6 |
   | 深靛蓝 | #1E1B4B, #1E3A5F |
   | 科技蓝 | #2563EB, #3B82F6 |
   | 商务灰 | #374151, #6B7280 |
   | 淡紫背景 | #F5F3FF, #EDE9FE |

4. **向用户确认提取的颜色**后再开始制作

### 步骤 3：确认字体选择

询问用户 PPT 使用什么字体：
- 该字体将应用于整个 PPT
- 如用户未指定，推荐使用 web-safe 字体：Arial, Helvetica, 微软雅黑, 思源黑体等
- 标题和正文可以使用同一字体的不同字重

### 步骤 4：获取排版灵感

**在开始排版之前，必须查看本地设计参考资源（图片 + HTML代码）获取布局灵感**：

#### 4.1 查看参考资源

读取 `./reference` 目录中的所有资源：

| 文件类型 | 文件名 | 用途 |
|----------|--------|------|
| 图片 | `SAMPLE.png` 等 | 视觉风格、配色、整体感觉 |
| HTML | `webreference.html`, `webreference2.html` 等 | 布局结构、组件设计、CSS样式 |

#### 4.2 分析图片设计元素

- **布局结构**：观察网格系统、内容分区、留白比例
- **视觉层次**：标题大小对比、信息优先级
- **排版节奏**：文字与图片的交替、疏密变化
- **细节处理**：边框、阴影、圆角、装饰线条

#### 4.3 分析 HTML 代码设计元素

从 HTML 代码中提取以下关键信息：

1. **配色方案**：
   - 查找 CSS 中的颜色定义（`color`, `background-color`, `border-color`）
   - 提取 Tailwind 自定义颜色配置（如 `colors: { neutral: {...} }`）
   - 识别主色、辅助色、强调色的使用规律

2. **排版样式**：
   - 字体家族（`font-family`）和字重（`font-weight`）
   - 字号层级（标题、正文、标签的大小比例）
   - 行高（`line-height`）和字间距（`letter-spacing`）

3. **布局模式**：
   - Grid/Flexbox 布局结构（列数、间距、对齐方式）
   - 响应式断点设计（`md:`, `lg:` 等前缀的使用）
   - 容器最大宽度和内边距

4. **组件样式**：
   - 卡片设计（圆角 `rounded-*`、阴影 `shadow-*`、边框）
   - 按钮样式（形状、悬停效果、过渡动画）
   - 图标使用方式和大小规范
   - 玻璃态效果（`backdrop-blur`、透明背景）

5. **动效参考**（可简化应用于 PPT）：
   - 渐变方向和颜色过渡
   - 悬停状态变化（可转化为 PPT 的视觉强调）

#### 4.4 提取可用于 PPT 的设计模式

| 设计模式 | 应用场景 | HTML 参考要点 |
|----------|----------|---------------|
| 大标题 + 小副标题 + 主视觉 | 封面页、章节页 | Hero section 结构 |
| 左文右图 / 左图右文 | 内容介绍页 | Grid 两栏布局 |
| 网格卡片布局 | 产品展示、功能列表 | Card 组件样式 |
| 数字 + 标签 + 描述 | 数据统计页 | Stats section |
| 全幅图片 + 文字叠加 | 视觉冲击页 | Overlay 技术 |
| 图标 + 标题 + 说明 | 特性/优势页 | Feature cards |
| 深色区块 + 浅色内容 | 对比强调页 | Dark/Light sections |
| 表格式对比布局 | 方案对比页 | Pricing tables |

#### 4.5 选择最匹配的设计方案

根据用户需求，从参考资源中**挑选最合适的设计元素**：

1. **风格匹配**：选择与用户行业/主题最契合的参考
2. **复杂度适配**：根据 PPT 页数选择可复用的组件
3. **元素提取**：明确列出将使用的具体设计元素（配色值、布局比例、组件样式）

#### 4.6 结合用户需求

将参考资源的设计理念与用户的主题色、字体、内容相融合，形成最终设计方案

### 步骤 5：下载目标网站素材

**重要：如果用户提供了网站 URL，必须从该网站下载真实素材用于 PPT**：

1. **浏览目标网站**：使用浏览器工具访问用户提供的网站 URL
2. **识别可用素材**：
   - **Hero 图片**：首屏大图、产品主视觉
   - **产品截图**：UI 界面、功能展示
   - **图标/Logo**：品牌标识、功能图标
   - **流程图/示意图**：工作流程、架构图
   - **认证徽章**：奖项、合作伙伴 Logo

3. **提取图片 URL**：
   - 使用浏览器开发工具检查页面元素
   - 查找 `<img>` 标签的 `src` 属性
   - 识别背景图片的 `background-image` URL
   - 优先选择高分辨率版本（带 width 参数的 URL）

4. **下载并组织素材**：
   ```bash
   # 创建素材目录
   mkdir -p icons

   # 使用 curl 下载图片
   curl -L -o icons/hero_image.png "图片URL"
   curl -L -o icons/product_ui.png "图片URL"
   curl -L -o icons/logo.png "图片URL"
   ```

5. **素材命名规范**：
   | 类型 | 命名示例 |
   |------|----------|
   | Hero 图片 | hero_image.png |
   | 产品截图 | product_ui.png, product_demo.png |
   | Logo | logo.png, logo_white.png |
   | 流程图 | cycle_diagram.png, workflow.png |
   | 图标 | icon_feature1.png, icon_ai.png |
   | 认证徽章 | gartner_badge.png, award.png |

6. **素材使用原则**：
   - 封面页：使用 Hero 图片或产品主视觉
   - 解决方案页：使用流程图、架构图
   - 产品页：使用产品截图、功能展示
   - 认可页：使用认证徽章、奖项
   - 联系页：使用 Logo

**注意**：如果用户未提供网站 URL 或网站无可用素材，则跳过此步骤，使用 react-icons 生成图标。

### 步骤 6：专业排版（含配图）

作为专业 PPT 排版师，根据获得的信息进行排版，**必须遵循 PPT 排版五大基本原则**：

| 原则 | 说明 | 实践要点 |
|------|------|----------|
| ①简洁至上 | Keep it Simple | 每页只讲一个核心观点，用关键词和短语代替大段文字，避免信息过载 |
| ②对齐 | Alignment | 所有元素（文字、图片）都应有明确的对齐线（左、右、居中、顶、底），使版面整齐有序 |
| ③对比 | Contrast | 通过大小、颜色、粗细、形状等差异，突出重要信息和元素，引导视线 |
| ④亲密/重复 | Proximity/Repetition | 把相关元素归类放一起（编组），并在整个PPT中重复使用相同的字体、颜色、布局，形成统一感 |
| ⑤留白 | White Space | 不把页面填满，留出空白区域，让页面"呼吸"，突出主体，增加层次感 |

#### **配图要求（必须）**

**每张幻灯片都应该包含视觉元素**，纯文字的 PPT 不够专业。配图类型包括：

1. **图标（Icons）**：使用 react-icons 生成 PNG 图标
2. **图片（Images）**：产品截图、照片、插图
3. **图形元素**：形状、色块、装饰线条

**图标生成方法**（使用 Sharp + react-icons）：

```javascript
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const { FaBrain, FaRocket, FaUsers } = require('react-icons/fa');

async function rasterizeIcon(IconComponent, color, size, filename) {
    const svgString = ReactDOMServer.renderToStaticMarkup(
        React.createElement(IconComponent, { color: `#${color}`, size: size })
    );
    await sharp(Buffer.from(svgString)).png().toFile(filename);
}

// 示例：生成主题色图标
await rasterizeIcon(FaBrain, '7C3AED', 80, 'icons/brain.png');
await rasterizeIcon(FaRocket, '7C3AED', 60, 'icons/rocket.png');
```

**常用图标库**：
- `react-icons/fa` - Font Awesome（通用图标）
- `react-icons/md` - Material Design（Google风格）
- `react-icons/bs` - Bootstrap Icons
- `react-icons/hi` - Heroicons

**配图使用原则**：
- 封面页：使用大图标或主视觉
- 内容页：每个要点配一个相关图标
- 数据页：图表 + 数据图标
- 结尾页：联系方式图标

### 步骤 7：规范检查

完成排版后，必须 review 版式是否符合 PPT 规范：

**标准尺寸 - 宽屏 (16:9)**:
- 尺寸：**33.87 cm × 19.05 cm**（或 13.33 in × 7.5 in）
- HTML 等效：**720pt × 405pt**

验证清单：
- [ ] 幻灯片比例为 16:9
- [ ] 内容未超出边界
- [ ] 文字未被截断
- [ ] 元素对齐正确
- [ ] 色彩对比度足够
- [ ] **每页都有配图/图标**

### 步骤 8：创意介绍

最后，输出**一句话**的主观创意介绍，概括这份 PPT 的设计理念和亮点。

**示例**：
> "以活力紫为视觉主线，搭配精心设计的功能图标，构建信息层次分明、现代感十足的企业演示。"

---

## Reading and analyzing content

### Text extraction
If you just need to read the text contents of a presentation, you should convert the document to markdown:

```bash
# Convert document to markdown
python -m markitdown path-to-file.pptx
```

### Raw XML access
You need raw XML access for: comments, speaker notes, slide layouts, animations, design elements, and complex formatting. For any of these features, you'll need to unpack a presentation and read its raw XML contents.

#### Unpacking a file
`python ooxml/scripts/unpack.py <office_file> <output_dir>`

**Note**: The unpack.py script is located at `skills/pptx/ooxml/scripts/unpack.py` relative to the project root. If the script doesn't exist at this path, use `find . -name "unpack.py"` to locate it.

#### Key file structures
* `ppt/presentation.xml` - Main presentation metadata and slide references
* `ppt/slides/slide{N}.xml` - Individual slide contents (slide1.xml, slide2.xml, etc.)
* `ppt/notesSlides/notesSlide{N}.xml` - Speaker notes for each slide
* `ppt/comments/modernComment_*.xml` - Comments for specific slides
* `ppt/slideLayouts/` - Layout templates for slides
* `ppt/slideMasters/` - Master slide templates
* `ppt/theme/` - Theme and styling information
* `ppt/media/` - Images and other media files

#### Typography and color extraction
**When given an example design to emulate**: Always analyze the presentation's typography and colors first using the methods below:
1. **Read theme file**: Check `ppt/theme/theme1.xml` for colors (`<a:clrScheme>`) and fonts (`<a:fontScheme>`)
2. **Sample slide content**: Examine `ppt/slides/slide1.xml` for actual font usage (`<a:rPr>`) and colors
3. **Search for patterns**: Use grep to find color (`<a:solidFill>`, `<a:srgbClr>`) and font references across all XML files

## Creating a new PowerPoint presentation **without a template**

When creating a new PowerPoint presentation from scratch, use the **html2pptx** workflow to convert HTML slides to PowerPoint with accurate positioning.

### Design Principles

**CRITICAL**: Before creating any presentation, analyze the content and choose appropriate design elements:
1. **Consider the subject matter**: What is this presentation about? What tone, industry, or mood does it suggest?
2. **Check for branding**: If the user mentions a company/organization, consider their brand colors and identity
3. **Match palette to content**: Select colors that reflect the subject
4. **State your approach**: Explain your design choices before writing code

**Requirements**:
- ✅ **默认使用白色背景 (#FFFFFF)**：除非用户明确要求其他背景色，所有幻灯片底色必须为白色
- ✅ State your content-informed design approach BEFORE writing code
- ✅ Use web-safe fonts only: Arial, Helvetica, Times New Roman, Georgia, Courier New, Verdana, Tahoma, Trebuchet MS, Impact
- ✅ Create clear visual hierarchy through size, weight, and color
- ✅ Ensure readability: strong contrast, appropriately sized text, clean alignment
- ✅ Be consistent: repeat patterns, spacing, and visual language across slides

#### Color Palette Selection

**Choosing colors creatively**:
- **Think beyond defaults**: What colors genuinely match this specific topic? Avoid autopilot choices.
- **Consider multiple angles**: Topic, industry, mood, energy level, target audience, brand identity (if mentioned)
- **Be adventurous**: Try unexpected combinations - a healthcare presentation doesn't have to be green, finance doesn't have to be navy
- **Build your palette**: Pick 3-5 colors that work together (dominant colors + supporting tones + accent)
- **Ensure contrast**: Text must be clearly readable on backgrounds

**Example color palettes** (use these to spark creativity - choose one, adapt it, or create your own):

1. **Classic Blue**: Deep navy (#1C2833), slate gray (#2E4053), silver (#AAB7B8), off-white (#F4F6F6)
2. **Teal & Coral**: Teal (#5EA8A7), deep teal (#277884), coral (#FE4447), white (#FFFFFF)
3. **Bold Red**: Red (#C0392B), bright red (#E74C3C), orange (#F39C12), yellow (#F1C40F), green (#2ECC71)
4. **Warm Blush**: Mauve (#A49393), blush (#EED6D3), rose (#E8B4B8), cream (#FAF7F2)
5. **Burgundy Luxury**: Burgundy (#5D1D2E), crimson (#951233), rust (#C15937), gold (#997929)
6. **Deep Purple & Emerald**: Purple (#B165FB), dark blue (#181B24), emerald (#40695B), white (#FFFFFF)
7. **Cream & Forest Green**: Cream (#FFE1C7), forest green (#40695B), white (#FCFCFC)
8. **Pink & Purple**: Pink (#F8275B), coral (#FF574A), rose (#FF737D), purple (#3D2F68)
9. **Lime & Plum**: Lime (#C5DE82), plum (#7C3A5F), coral (#FD8C6E), blue-gray (#98ACB5)
10. **Black & Gold**: Gold (#BF9A4A), black (#000000), cream (#F4F6F6)
11. **Sage & Terracotta**: Sage (#87A96B), terracotta (#E07A5F), cream (#F4F1DE), charcoal (#2C2C2C)
12. **Charcoal & Red**: Charcoal (#292929), red (#E33737), light gray (#CCCBCB)
13. **Vibrant Orange**: Orange (#F96D00), light gray (#F2F2F2), charcoal (#222831)
14. **Forest Green**: Black (#191A19), green (#4E9F3D), dark green (#1E5128), white (#FFFFFF)
15. **Retro Rainbow**: Purple (#722880), pink (#D72D51), orange (#EB5C18), amber (#F08800), gold (#DEB600)
16. **Vintage Earthy**: Mustard (#E3B448), sage (#CBD18F), forest green (#3A6B35), cream (#F4F1DE)
17. **Coastal Rose**: Old rose (#AD7670), beaver (#B49886), eggshell (#F3ECDC), ash gray (#BFD5BE)
18. **Orange & Turquoise**: Light orange (#FC993E), grayish turquoise (#667C6F), white (#FCFCFC)

#### Visual Details Options

**Geometric Patterns**:
- Diagonal section dividers instead of horizontal
- Asymmetric column widths (30/70, 40/60, 25/75)
- Rotated text headers at 90° or 270°
- Circular/hexagonal frames for images
- Triangular accent shapes in corners
- Overlapping shapes for depth

**Border & Frame Treatments**:
- Thick single-color borders (10-20pt) on one side only
- Double-line borders with contrasting colors
- Corner brackets instead of full frames
- L-shaped borders (top+left or bottom+right)
- Underline accents beneath headers (3-5pt thick)

**Typography Treatments**:
- Extreme size contrast (72pt headlines vs 11pt body)
- All-caps headers with wide letter spacing
- Numbered sections in oversized display type
- Monospace (Courier New) for data/stats/technical content
- Condensed fonts (Arial Narrow) for dense information
- Outlined text for emphasis

**Chart & Data Styling**:
- Monochrome charts with single accent color for key data
- Horizontal bar charts instead of vertical
- Dot plots instead of bar charts
- Minimal gridlines or none at all
- Data labels directly on elements (no legends)
- Oversized numbers for key metrics

**Layout Innovations**:
- Full-bleed images with text overlays
- Sidebar column (20-30% width) for navigation/context
- Modular grid systems (3×3, 4×4 blocks)
- Z-pattern or F-pattern content flow
- Floating text boxes over colored shapes
- Magazine-style multi-column layouts

**Background Treatments**:
- **默认白色背景 (#FFFFFF)**：所有幻灯片底色默认为白色，确保专业清晰的外观
- Solid color blocks occupying 40-60% of slide (作为装饰元素，非整页背景)
- Gradient fills (vertical or diagonal only) - 仅用于局部装饰区域
- Split backgrounds (two colors, diagonal or vertical) - 需用户明确要求
- Edge-to-edge color bands - 作为顶部/底部装饰条
- Negative space as a design element - 白色背景本身就是优秀的留白

### Layout Tips
**When creating slides with charts or tables:**
- **Two-column layout (PREFERRED)**: Use a header spanning the full width, then two columns below - text/bullets in one column and the featured content in the other. This provides better balance and makes charts/tables more readable. Use flexbox with unequal column widths (e.g., 40%/60% split) to optimize space for each content type.
- **Full-slide layout**: Let the featured content (chart/table) take up the entire slide for maximum impact and readability
- **NEVER vertically stack**: Do not place charts/tables below text in a single column - this causes poor readability and layout issues

### Workflow
1. **MANDATORY - READ ENTIRE FILE**: Read [`html2pptx.md`](html2pptx.md) completely from start to finish. **NEVER set any range limits when reading this file.** Read the full file content for detailed syntax, critical formatting rules, and best practices before proceeding with presentation creation.
2. Create an HTML file for each slide with proper dimensions (e.g., 720pt × 405pt for 16:9)
   - Use `<p>`, `<h1>`-`<h6>`, `<ul>`, `<ol>` for all text content
   - Use `class="placeholder"` for areas where charts/tables will be added (render with gray background for visibility)
   - **CRITICAL**: Rasterize gradients and icons as PNG images FIRST using Sharp, then reference in HTML
   - **LAYOUT**: For slides with charts/tables/images, use either full-slide layout or two-column layout for better readability
3. Create and run a JavaScript file using the [`html2pptx.js`](scripts/html2pptx.js) library to convert HTML slides to PowerPoint and save the presentation
   - Use the `html2pptx()` function to process each HTML file
   - Add charts and tables to placeholder areas using PptxGenJS API
   - Save the presentation using `pptx.writeFile()`
4. **Visual validation**: Generate thumbnails and inspect for layout issues
   - Create thumbnail grid: `python scripts/thumbnail.py output.pptx workspace/thumbnails --cols 4`
   - Read and carefully examine the thumbnail image for:
     - **Text cutoff**: Text being cut off by header bars, shapes, or slide edges
     - **Text overlap**: Text overlapping with other text or shapes
     - **Positioning issues**: Content too close to slide boundaries or other elements
     - **Contrast issues**: Insufficient contrast between text and backgrounds
   - If issues found, adjust HTML margins/spacing/colors and regenerate the presentation
   - Repeat until all slides are visually correct

## Editing an existing PowerPoint presentation

When edit slides in an existing PowerPoint presentation, you need to work with the raw Office Open XML (OOXML) format. This involves unpacking the .pptx file, editing the XML content, and repacking it.

### Workflow
1. **MANDATORY - READ ENTIRE FILE**: Read [`ooxml.md`](ooxml.md) (~500 lines) completely from start to finish.  **NEVER set any range limits when reading this file.**  Read the full file content for detailed guidance on OOXML structure and editing workflows before any presentation editing.
2. Unpack the presentation: `python ooxml/scripts/unpack.py <office_file> <output_dir>`
3. Edit the XML files (primarily `ppt/slides/slide{N}.xml` and related files)
4. **CRITICAL**: Validate immediately after each edit and fix any validation errors before proceeding: `python ooxml/scripts/validate.py <dir> --original <file>`
5. Pack the final presentation: `python ooxml/scripts/pack.py <input_directory> <office_file>`

## Creating a new PowerPoint presentation **using a template**

When you need to create a presentation that follows an existing template's design, you'll need to duplicate and re-arrange template slides before then replacing placeholder context.

### Workflow
1. **Extract template text AND create visual thumbnail grid**:
   * Extract text: `python -m markitdown template.pptx > template-content.md`
   * Read `template-content.md`: Read the entire file to understand the contents of the template presentation. **NEVER set any range limits when reading this file.**
   * Create thumbnail grids: `python scripts/thumbnail.py template.pptx`
   * See [Creating Thumbnail Grids](#creating-thumbnail-grids) section for more details

2. **Analyze template and save inventory to a file**:
   * **Visual Analysis**: Review thumbnail grid(s) to understand slide layouts, design patterns, and visual structure
   * Create and save a template inventory file at `template-inventory.md` containing:
     ```markdown
     # Template Inventory Analysis
     **Total Slides: [count]**
     **IMPORTANT: Slides are 0-indexed (first slide = 0, last slide = count-1)**

     ## [Category Name]
     - Slide 0: [Layout code if available] - Description/purpose
     - Slide 1: [Layout code] - Description/purpose
     - Slide 2: [Layout code] - Description/purpose
     [... EVERY slide must be listed individually with its index ...]
     ```
   * **Using the thumbnail grid**: Reference the visual thumbnails to identify:
     - Layout patterns (title slides, content layouts, section dividers)
     - Image placeholder locations and counts
     - Design consistency across slide groups
     - Visual hierarchy and structure
   * This inventory file is REQUIRED for selecting appropriate templates in the next step

3. **Create presentation outline based on template inventory**:
   * Review available templates from step 2.
   * Choose an intro or title template for the first slide. This should be one of the first templates.
   * Choose safe, text-based layouts for the other slides.
   * **CRITICAL: Match layout structure to actual content**:
     - Single-column layouts: Use for unified narrative or single topic
     - Two-column layouts: Use ONLY when you have exactly 2 distinct items/concepts
     - Three-column layouts: Use ONLY when you have exactly 3 distinct items/concepts
     - Image + text layouts: Use ONLY when you have actual images to insert
     - Quote layouts: Use ONLY for actual quotes from people (with attribution), never for emphasis
     - Never use layouts with more placeholders than you have content
     - If you have 2 items, don't force them into a 3-column layout
     - If you have 4+ items, consider breaking into multiple slides or using a list format
   * Count your actual content pieces BEFORE selecting the layout
   * Verify each placeholder in the chosen layout will be filled with meaningful content
   * Select one option representing the **best** layout for each content section.
   * Save `outline.md` with content AND template mapping that leverages available designs
   * Example template mapping:
      ```
      # Template slides to use (0-based indexing)
      # WARNING: Verify indices are within range! Template with 73 slides has indices 0-72
      # Mapping: slide numbers from outline -> template slide indices
      template_mapping = [
          0,   # Use slide 0 (Title/Cover)
          34,  # Use slide 34 (B1: Title and body)
          34,  # Use slide 34 again (duplicate for second B1)
          50,  # Use slide 50 (E1: Quote)
          54,  # Use slide 54 (F2: Closing + Text)
      ]
      ```

4. **Duplicate, reorder, and delete slides using `rearrange.py`**:
   * Use the `scripts/rearrange.py` script to create a new presentation with slides in the desired order:
     ```bash
     python scripts/rearrange.py template.pptx working.pptx 0,34,34,50,52
     ```
   * The script handles duplicating repeated slides, deleting unused slides, and reordering automatically
   * Slide indices are 0-based (first slide is 0, second is 1, etc.)
   * The same slide index can appear multiple times to duplicate that slide

5. **Extract ALL text using the `inventory.py` script**:
   * **Run inventory extraction**:
     ```bash
     python scripts/inventory.py working.pptx text-inventory.json
     ```
   * **Read text-inventory.json**: Read the entire text-inventory.json file to understand all shapes and their properties. **NEVER set any range limits when reading this file.**

   * The inventory JSON structure:
      ```json
        {
          "slide-0": {
            "shape-0": {
              "placeholder_type": "TITLE",  // or null for non-placeholders
              "left": 1.5,                  // position in inches
              "top": 2.0,
              "width": 7.5,
              "height": 1.2,
              "paragraphs": [
                {
                  "text": "Paragraph text",
                  // Optional properties (only included when non-default):
                  "bullet": true,           // explicit bullet detected
                  "level": 0,               // only included when bullet is true
                  "alignment": "CENTER",    // CENTER, RIGHT (not LEFT)
                  "space_before": 10.0,     // space before paragraph in points
                  "space_after": 6.0,       // space after paragraph in points
                  "line_spacing": 22.4,     // line spacing in points
                  "font_name": "Arial",     // from first run
                  "font_size": 14.0,        // in points
                  "bold": true,
                  "italic": false,
                  "underline": false,
                  "color": "FF0000"         // RGB color
                }
              ]
            }
          }
        }
      ```

   * Key features:
     - **Slides**: Named as "slide-0", "slide-1", etc.
     - **Shapes**: Ordered by visual position (top-to-bottom, left-to-right) as "shape-0", "shape-1", etc.
     - **Placeholder types**: TITLE, CENTER_TITLE, SUBTITLE, BODY, OBJECT, or null
     - **Default font size**: `default_font_size` in points extracted from layout placeholders (when available)
     - **Slide numbers are filtered**: Shapes with SLIDE_NUMBER placeholder type are automatically excluded from inventory
     - **Bullets**: When `bullet: true`, `level` is always included (even if 0)
     - **Spacing**: `space_before`, `space_after`, and `line_spacing` in points (only included when set)
     - **Colors**: `color` for RGB (e.g., "FF0000"), `theme_color` for theme colors (e.g., "DARK_1")
     - **Properties**: Only non-default values are included in the output

6. **Generate replacement text and save the data to a JSON file**
   Based on the text inventory from the previous step:
   - **CRITICAL**: First verify which shapes exist in the inventory - only reference shapes that are actually present
   - **VALIDATION**: The replace.py script will validate that all shapes in your replacement JSON exist in the inventory
     - If you reference a non-existent shape, you'll get an error showing available shapes
     - If you reference a non-existent slide, you'll get an error indicating the slide doesn't exist
     - All validation errors are shown at once before the script exits
   - **IMPORTANT**: The replace.py script uses inventory.py internally to identify ALL text shapes
   - **AUTOMATIC CLEARING**: ALL text shapes from the inventory will be cleared unless you provide "paragraphs" for them
   - Add a "paragraphs" field to shapes that need content (not "replacement_paragraphs")
   - Shapes without "paragraphs" in the replacement JSON will have their text cleared automatically
   - Paragraphs with bullets will be automatically left aligned. Don't set the `alignment` property on when `"bullet": true`
   - Generate appropriate replacement content for placeholder text
   - Use shape size to determine appropriate content length
   - **CRITICAL**: Include paragraph properties from the original inventory - don't just provide text
   - **IMPORTANT**: When bullet: true, do NOT include bullet symbols (•, -, *) in text - they're added automatically
   - **ESSENTIAL FORMATTING RULES**:
     - Headers/titles should typically have `"bold": true`
     - List items should have `"bullet": true, "level": 0` (level is required when bullet is true)
     - Preserve any alignment properties (e.g., `"alignment": "CENTER"` for centered text)
     - Include font properties when different from default (e.g., `"font_size": 14.0`, `"font_name": "Lora"`)
     - Colors: Use `"color": "FF0000"` for RGB or `"theme_color": "DARK_1"` for theme colors
     - The replacement script expects **properly formatted paragraphs**, not just text strings
     - **Overlapping shapes**: Prefer shapes with larger default_font_size or more appropriate placeholder_type
   - Save the updated inventory with replacements to `replacement-text.json`
   - **WARNING**: Different template layouts have different shape counts - always check the actual inventory before creating replacements

   Example paragraphs field showing proper formatting:
   ```json
   "paragraphs": [
     {
       "text": "New presentation title text",
       "alignment": "CENTER",
       "bold": true
     },
     {
       "text": "Section Header",
       "bold": true
     },
     {
       "text": "First bullet point without bullet symbol",
       "bullet": true,
       "level": 0
     },
     {
       "text": "Red colored text",
       "color": "FF0000"
     },
     {
       "text": "Theme colored text",
       "theme_color": "DARK_1"
     },
     {
       "text": "Regular paragraph text without special formatting"
     }
   ]
   ```

   **Shapes not listed in the replacement JSON are automatically cleared**:
   ```json
   {
     "slide-0": {
       "shape-0": {
         "paragraphs": [...] // This shape gets new text
       }
       // shape-1 and shape-2 from inventory will be cleared automatically
     }
   }
   ```

   **Common formatting patterns for presentations**:
   - Title slides: Bold text, sometimes centered
   - Section headers within slides: Bold text
   - Bullet lists: Each item needs `"bullet": true, "level": 0`
   - Body text: Usually no special properties needed
   - Quotes: May have special alignment or font properties

7. **Apply replacements using the `replace.py` script**
   ```bash
   python scripts/replace.py working.pptx replacement-text.json output.pptx
   ```

   The script will:
   - First extract the inventory of ALL text shapes using functions from inventory.py
   - Validate that all shapes in the replacement JSON exist in the inventory
   - Clear text from ALL shapes identified in the inventory
   - Apply new text only to shapes with "paragraphs" defined in the replacement JSON
   - Preserve formatting by applying paragraph properties from the JSON
   - Handle bullets, alignment, font properties, and colors automatically
   - Save the updated presentation

   Example validation errors:
   ```
   ERROR: Invalid shapes in replacement JSON:
     - Shape 'shape-99' not found on 'slide-0'. Available shapes: shape-0, shape-1, shape-4
     - Slide 'slide-999' not found in inventory
   ```

   ```
   ERROR: Replacement text made overflow worse in these shapes:
     - slide-0/shape-2: overflow worsened by 1.25" (was 0.00", now 1.25")
   ```

## Creating Thumbnail Grids

To create visual thumbnail grids of PowerPoint slides for quick analysis and reference:

```bash
python scripts/thumbnail.py template.pptx [output_prefix]
```

**Features**:
- Creates: `thumbnails.jpg` (or `thumbnails-1.jpg`, `thumbnails-2.jpg`, etc. for large decks)
- Default: 5 columns, max 30 slides per grid (5×6)
- Custom prefix: `python scripts/thumbnail.py template.pptx my-grid`
  - Note: The output prefix should include the path if you want output in a specific directory (e.g., `workspace/my-grid`)
- Adjust columns: `--cols 4` (range: 3-6, affects slides per grid)
- Grid limits: 3 cols = 12 slides/grid, 4 cols = 20, 5 cols = 30, 6 cols = 42
- Slides are zero-indexed (Slide 0, Slide 1, etc.)

**Use cases**:
- Template analysis: Quickly understand slide layouts and design patterns
- Content review: Visual overview of entire presentation
- Navigation reference: Find specific slides by their visual appearance
- Quality check: Verify all slides are properly formatted

**Examples**:
```bash
# Basic usage
python scripts/thumbnail.py presentation.pptx

# Combine options: custom name, columns
python scripts/thumbnail.py template.pptx analysis --cols 4
```

## Converting Slides to Images

To visually analyze PowerPoint slides, convert them to images using a two-step process:

1. **Convert PPTX to PDF**:
   ```bash
   soffice --headless --convert-to pdf template.pptx
   ```

2. **Convert PDF pages to JPEG images**:
   ```bash
   pdftoppm -jpeg -r 150 template.pdf slide
   ```
   This creates files like `slide-1.jpg`, `slide-2.jpg`, etc.

Options:
- `-r 150`: Sets resolution to 150 DPI (adjust for quality/size balance)
- `-jpeg`: Output JPEG format (use `-png` for PNG if preferred)
- `-f N`: First page to convert (e.g., `-f 2` starts from page 2)
- `-l N`: Last page to convert (e.g., `-l 5` stops at page 5)
- `slide`: Prefix for output files

Example for specific range:
```bash
pdftoppm -jpeg -r 150 -f 2 -l 5 template.pdf slide  # Converts only pages 2-5
```

## Code Style Guidelines
**IMPORTANT**: When generating code for PPTX operations:
- Write concise code
- Avoid verbose variable names and redundant operations
- Avoid unnecessary print statements

## Dependencies

Required dependencies (should already be installed):

- **markitdown**: `pip install "markitdown[pptx]"` (for text extraction from presentations)
- **pptxgenjs**: `npm install -g pptxgenjs` (for creating presentations via html2pptx)
- **playwright**: `npm install -g playwright` (for HTML rendering in html2pptx)
- **react-icons**: `npm install -g react-icons react react-dom` (for icons)
- **sharp**: `npm install -g sharp` (for SVG rasterization and image processing)
- **LibreOffice**: `sudo apt-get install libreoffice` (for PDF conversion)
- **Poppler**: `sudo apt-get install poppler-utils` (for pdftoppm to convert PDF to images)
- **defusedxml**: `pip install defusedxml` (for secure XML parsing)