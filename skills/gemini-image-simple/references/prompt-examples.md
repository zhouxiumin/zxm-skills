# Gemini 图像生成提示词参考

整理自 [awesome-nanobananapro-prompts](https://github.com/xianyu110/awesome-nanobananapro-prompts)（MIT License）。

---

## 模型能力速查

| 功能 | 说明 |
|------|--------------|
| 分辨率 | 最高 4K |
| 多轮编辑 | 支持对话式多轮编辑 |
| 多图合成 | 最多 14 张输入合为 1 张 |
| 角色一致性 | 最多 5 个角色跨图保持外貌一致 |
| 文字生成 | 支持多语言文字渲染 |
| 上下文 | 64k token 输入上限 |

---

## 提示词模板分类

### 风格转换

**水彩画风格**
```
Convert to watercolor painting style
```

**刺绣肖像**
```
An embroidered portrait of [subject], [colors] thread on deep linen fabric. Visible needlework, layered textures, and handmade patterns give it an earthy, sacred feel.
```

**刺绣插图**
```
A handcrafted illustration that simulates traditional embroidery using colorful threads on linen fabric. All elements are "stitched" with visible yarn textures, using techniques like satin stitch, backstitch, and French knots. Raised contours and directional thread flow create a tactile, cozy appearance. The background is made of woven linen, with gentle pastel or folk-inspired colors.
```

**青花瓷风格**
```
Using the uploaded image as the exact visual base, transform it into a hyper-realistic 3D object that retains the original shape and proportions of the logo only. Apply traditional Ottoman Iznik ceramic textures—featuring a warm white glazed base with delicate crackle lines, overlaid with vivid cobalt blue, turquoise, and bold red floral motifs such as tulips, carnations, and arabesque vines.
```

**平面等边（Isometric）风格**
```
A flat isometric digital illustration of [describe the subject: e.g., a modern workspace, a city block, a group of app icons, a sports shop], clean lines and geometric forms, bright pastel colors, simplified perspective with 3D depth, minimal shading, white background or light gradient. Style resembles modern vector infographics, ideal for UI, app design or web visuals.
```

---

### 文字特效

**熔化变异文字**
```
Create a psychedelic, grotesque cartoon-style text design that says "[TEXT]". Arrange the letters in a straight horizontal line. Each letter should be lumpy, melting, and oozing with bright, clashing flat colors like slime green, neon yellow, and hot pink. Each letter must be filled with only one solid flat color, with no gradients or transitions. All drips, melts, and oozes must be solid black with no color fill.
```

---

### 产品 & 品牌

**产品与品牌联名**
```
A product photography shot of a [PRODUCT] inspired by [FOOD BRAND], placed against a soft light gray background. The product is sharply focused with soft studio lighting. The packaging design includes the official [FOOD BRAND] logo and reflects the brand's colors and style. The product is sleek, glossy, and realistic, with high detail and elegant presentation. No food items, just the makeup product.
```

**品牌水晶液态 LOGO**
```
An ultra-high resolution 8K cinematic render of the [Brand Name] logo, sculpted entirely from flowing crystal-clear water. The liquid forms every curve and edge of the brand's logo with fluid precision, highlighted by vibrant neon accents inspired by [Brand Name]'s color identity. The background is pitch black, creating sharp contrast and drama. The lighting is dynamic, revealing sharp reflections and refractions.
```

**品牌降落伞广告**
```
Create a image with 1:1 ratio. A dreamy brand ad of [Brand], a brand designed bubble-like capsule with brand color parachute packaging their classic product, against blue sky and other blurry parachute packaging, white cloud, a small brand logo on top, a tiny slogan beneath it, cinematic day lighting, lens flare, dof, hdr
```

---

### 场景 & 叙事

**微缩场景**
```
Detailed photographic image of a miniature person in bed feeling cranky under an opened 'Delete Monday' keyboard keycap, using the inside of the keycap as a mini bedroom complete with the usual bedroom stuff
```

**3D 卡通追逐场景**
```
A thrilling 3D cartoon scene: [CHARACTER1] runs through a narrow corridor inside [Place], chased at high speed by [CHARACTER2]. Their facial expressions reflect tension and focus, with beads of sweat glistening under dramatic lighting.
```

---

### 材质 & 形态模拟

**面包材质雕塑**
```
A highly realistic sculpture of a [object], made entirely from [bread type] with ultra-detailed texture and color. The surface shows the natural properties of the bread, golden-brown, glossy, flaky or crusty, with visible layers or seeds where appropriate, studio lighting, soft shadows.
```

---

## 常用修饰词速查

### 光线
- `cinematic lighting` — 电影感打光
- `soft studio lighting` — 柔和棚拍光
- `lens flare, dof, hdr` — 镜头耀光 + 景深 + 高动态范围
- `dramatic lighting` — 戏剧性光线
- `left upper 35° hard spotlight` — 指定方向硬边聚光

### 质感
- `hyper-realistic`, `ultra-detailed`, `8K` — 超写实高清
- `glossy`, `matte`, `metallic` — 光泽 / 哑光 / 金属
- `tactile`, `handmade` — 手作质感

### 构图
- `1:1 ratio` — 正方形比例
- `front view, slight upward angle (~10°)` — 正面仰视
- `subject centered, fills the frame` — 主体居中满幅
- `pure black background` — 纯黑背景（聚焦效果）
- `white background` — 纯白背景（产品图）

### 风格关键词
- `photorealistic` — 照片级写实
- `flat design`, `vector` — 扁平 / 矢量
- `isometric` — 等轴测视角
- `watercolor` — 水彩
- `embroidery` — 刺绣
- `3D cartoon` — 3D 卡通
