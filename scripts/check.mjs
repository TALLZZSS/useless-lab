#!/usr/bin/env node
/**
 * 检查每个发明是否守规矩：
 *   1. toys.json 字段完整、id 唯一
 *   2. 文件存在、单文件、体积合理
 *   3. 不加载任何外部资源、不发网络请求、不依赖任何库
 * 用法：node scripts/check.mjs
 */
import { readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const toys = JSON.parse(readFileSync(join(root, "toys.json"), "utf8"));

const REQUIRED = ["id", "title", "desc", "tag", "glyph", "accent"];
const MAX_BYTES = 24 * 1024;

const FORBIDDEN = [
  [/\b(?:src|poster)\s*=\s*["']https?:/i, "引用了外部 src"],
  [/<link[^>]+href\s*=\s*["']https?:/i, "引用了外部样式表"],
  [/@import\s+(?:url\()?\s*["']?https?:/i, "用 @import 引了外部样式"],
  [/url\(\s*["']?https?:/i, "在 CSS 里引了外部资源"],
  [/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\b/, "发网络请求"],
  [/\bimport\s*\(/, "动态 import 外部模块"],
];

const errors = [];
const seen = new Set();

for (const [i, toy] of toys.entries()) {
  const where = `toys[${i}] (${toy.id || "?"})`;

  for (const key of REQUIRED) {
    if (!toy[key] || typeof toy[key] !== "string") errors.push(`${where} 缺少字段 ${key}`);
  }
  if (toy.id && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(toy.id)) errors.push(`${where} id 必须是 kebab-case`);
  if (toy.accent && !/^#[0-9a-f]{6}$/i.test(toy.accent)) errors.push(`${where} accent 必须是 #rrggbb`);
  if (seen.has(toy.id)) errors.push(`${where} id 重复`);
  seen.add(toy.id);
  if (errors.length > 0 && !toy.id) continue;

  const file = join(root, "toys", toy.id, "index.html");
  if (!existsSync(file)) {
    errors.push(`${where} 找不到 toys/${toy.id}/index.html`);
    continue;
  }

  const size = statSync(file).size;
  if (size > MAX_BYTES) errors.push(`${where} 有 ${(size / 1024).toFixed(1)} KB，超过 24 KB 上限`);

  const src = readFileSync(file, "utf8");
  if (!/<title>[^<]+<\/title>/i.test(src)) errors.push(`${where} 缺少 <title>`);
  if (!/name=["']viewport["']/i.test(src)) errors.push(`${where} 缺少 viewport meta`);
  if (!/lang=["']zh/i.test(src)) errors.push(`${where} 缺少 lang="zh-CN"`);

  for (const [re, why] of FORBIDDEN) {
    if (re.test(src)) errors.push(`${where} ${why}`);
  }
}

if (errors.length > 0) {
  console.error(`✕ 检查未通过（${errors.length} 项）：`);
  for (const e of errors) console.error(`  · ${e}`);
  process.exit(1);
}

console.log(`✓ ${toys.length} 个发明全部合规：单文件、零依赖、零网络请求`);
