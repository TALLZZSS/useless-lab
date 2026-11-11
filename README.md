# 无用发明 · Useless Lab

**一些没有用，但很认真的东西。**

<sub>Useless things, made carefully. Every invention is one self-contained HTML file: no dependencies, no network, no tracking.</sub>

这里每一个发明都只做一件没用的小事，并且把它做到底。它们各自是一个独立的 HTML 文件：
没有依赖、没有网络请求、没有账号、没有埋点——双击就能打开，断网也能用。

![落地页](docs/index.png)

## 发明清单

| № | 发明 | 它做的事 |
|---|---|---|
| 001 | [呼吸按钮](toys/breathing-button/index.html) | 只会呼吸，按多少次都不会发生任何事 |
| 002 | [十秒的耐心](toys/patience-gate/index.html) | 保持不动十秒，它说一句话。动了就重来 |
| 003 | [点不中的关闭键](toys/runaway-close/index.html) | ✕ 永远躲开你的光标，追够八秒它会自己投降 |
| 004 | [按住才有的音](toys/hold-the-note/index.html) | 只有一个和弦。按住才响，松手就没了 |
| 005 | [慢两秒的影子](toys/slow-shadow/index.html) | 你的光标有一个慢两秒的影子，它永远追不上你 |
| 006 | [正在消失的一句话](toys/memento/index.html) | 一句话在你面前一个字一个字地消失，刷新也救不回来 |

![六个发明](docs/previews.png)

## 为什么做这个

有用的事情，工作里已经做够了。

无用的东西才像人做的：它不解决问题，不提高效率，不产生数据，只占用你三十秒，然后你关掉它，
可能还记得它一秒。这个仓库是一个借口——让我能一直做点没有 KPI 的东西，并且**每件都做完**。

所以这里的每条规矩都是反效率的：不许联网、不许引库、不许超过 24 KB、不许有设置面板。
限制越死，越容易做完，也越容易好看。

## 本地跑

```bash
git clone https://github.com/<你的用户名>/useless-lab.git
cd useless-lab
npm run dev        # → http://localhost:8080
```

不需要 `npm install`，这个仓库零依赖。也可以直接双击 `index.html` 打开，不需要服务器。

## 加一个发明

```bash
mkdir toys/my-invention     # 建一个文件夹
npm run build               # 把 toys.json 渲染进首页
npm run check               # 检查是不是守规矩
```

规则很短：一个文件、零依赖、不发请求、不超过 24 KB、只做一件没用的事、必须有个结尾。
详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 部署

站点全是静态文件，用最省事的方式发布：

1. 仓库 **Settings → Pages**
2. **Source** 选 `Deploy from a branch`
3. **Branch** 选 `main`，目录选 `/(root)`，**Save**

根目录的 `.nojekyll` 让 Pages 原样托管文件、不跑 Jekyll。之后每次 push 到 `main`，Pages 会在半分钟左右自动重建。

顺手把 `index.html` 页脚里的 GitHub 链接换成你的仓库地址。

## 结构

```
useless-lab/
├── index.html              # 落地页（由 toys.json 生成卡片区）
├── toys.json               # 发明清单，唯一的数据源
├── toys/
│   └── <id>/index.html     # 每个发明 = 一个自包含的 HTML 文件
├── docs/                   # README 用的截图
├── scripts/
│   ├── build.mjs           # 渲染首页
│   ├── check.mjs           # 校验规则（CI 会跑）
│   └── serve.mjs           # 本地预览，零依赖
└── .github/workflows/      # ci.yml（推送时跑 check）
```

## 许可

[MIT](LICENSE)。拿去做你自己的无用发明，不用问我。
