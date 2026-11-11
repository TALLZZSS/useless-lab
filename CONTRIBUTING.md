## 规则

这不是一个工具箱，是一个作品集。所以每个发明都要守同一条规矩：

1. **只做一件没用的事。** 有用的东西，工作里已经做够了。
2. **一个文件。** `toys/<id>/index.html`，HTML/CSS/JS 全在里面，没有构建步骤。
3. **零依赖。** 不引 CDN、不装库、不加载字体和图片。断网也照样能用。
4. **不发请求。** 不联网、不埋点、不收集任何数据。
5. **不超过 24 KB。** `node scripts/check.mjs` 会帮你数。
6. **得有个结尾。** 卡住人的、等不到结果的，不算好发明。

## 加一个新发明

```bash
# 1. 建文件
mkdir toys/my-invention
$EDITOR toys/my-invention/index.html

# 2. 在 toys.json 末尾加一条（id 要和文件夹同名）
# 3. 重新生成首页
npm run build

# 4. 自查
npm run check
```

`toys.json` 的字段：

```json
{
  "id": "my-invention",
  "title": "发明名",
  "desc": "一句话说清它怎么没用。",
  "tag": "分类（2 个字最好）",
  "glyph": "◍",
  "accent": "#7ee787"
}
```

## 提交 PR 前

- [ ] `npm run check` 通过
- [ ] `npm run build` 之后 `git diff` 没有意外改动
- [ ] 手机上打开过一遍
- [ ] 自己在里面玩够了一分钟

## 风格

克制一点。少即是多：一个颜色、一句话、一个动作。不要加音效开关、不要加设置面板、不要加「分享到」。

页面左上角记得留一个返回链接：

```html
<a class="back" href="../../index.html">← 无用发明</a>
```
