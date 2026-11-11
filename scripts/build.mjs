#!/usr/bin/env node
/**
 * 把 toys.json 渲染进 index.html 的两个标记区。
 * 用法：node scripts/build.mjs
 * index.html 是唯一被生成的文件，其余全部手写。
 */
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = join(root, "index.html");

const toys = JSON.parse(readFileSync(join(root, "toys.json"), "utf8"));

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const cards = toys
  .map((t, i) => {
    const no = String(i + 1).padStart(3, "0");
    return [
      `      <a class="card" href="toys/${t.id}/index.html" style="--accent:${t.accent}">`,
      `        <span class="no">№ ${no}</span>`,
      `        <span class="tag">${esc(t.tag)}</span>`,
      `        <span class="glyph" aria-hidden="true">${esc(t.glyph)}</span>`,
      `        <h2>${esc(t.title)}</h2>`,
      `        <p>${esc(t.desc)}</p>`,
      `      </a>`,
    ].join("\n");
  })
  .join("\n");

const bytes = toys.reduce((sum, t) => sum + statSync(join(root, "toys", t.id, "index.html")).size, 0);
const stats = `${String(toys.length).padStart(2, "0")} 个发明 · 共 ${(bytes / 1024).toFixed(1)} KB · 0 个有用`;

function replaceBlock(html, name, content) {
  const start = `<!-- ${name}:START -->`;
  const end = `<!-- ${name}:END -->`;
  const a = html.indexOf(start);
  const b = html.indexOf(end);
  if (a < 0 || b < a) throw new Error(`index.html 里找不到 ${name} 标记`);
  return html.slice(0, a + start.length) + "\n" + content + "\n" + html.slice(b);
}

const html = readFileSync(indexPath, "utf8");
const next = replaceBlock(replaceBlock(html, "STATS", stats), "TOYS", cards);

writeFileSync(indexPath, next);
console.log(`✓ index.html 已更新：${toys.length} 个发明，共 ${(bytes / 1024).toFixed(1)} KB`);
