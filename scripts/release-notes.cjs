let path = require("path");
let fs = require("fs");

let version = process.env.TAG_NAME || "v0.1.0";

let changelog = fs.readFileSync(path.resolve(__dirname, "..", "CHANGELOG.md"), "utf8");
let match = new RegExp(
  `## \\[${version.replace(/^v/, "")}\\] - (.*)\\n\\n([\\s\\S]*?)\\n(?:(?:##\\s)|(?:\\[))`,
  "g",
).exec(changelog);

if (match) {
  let [, , notes] = match;
  console.log(notes.trim());
} else {
  console.log(`Placeholder release notes for version: v${version}`);
}
