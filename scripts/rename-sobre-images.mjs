import fs from "node:fs/promises";
import path from "node:path";

const ABOUT_DIR = path.join(process.cwd(), "public", "assets", "sobre");
const SUPPORTED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function getNormalizedExtension(ext) {
  if (ext.toLowerCase() === ".jpeg") return ".jpg";
  return ext.toLowerCase();
}

async function renameAboutImages() {
  const entries = await fs.readdir(ABOUT_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => SUPPORTED_EXT.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));

  if (!files.length) {
    console.log("Nenhuma imagem encontrada em public/assets/sobre.");
    return;
  }

  const padSize = Math.max(2, String(files.length).length);
  const tempNames = [];

  for (const [index, fileName] of files.entries()) {
    const oldPath = path.join(ABOUT_DIR, fileName);
    const tempName = `__tmp__${String(index + 1).padStart(padSize, "0")}__${Date.now()}${path.extname(fileName).toLowerCase()}`;
    const tempPath = path.join(ABOUT_DIR, tempName);

    await fs.rename(oldPath, tempPath);
    tempNames.push(tempName);
  }

  for (const [index, tempName] of tempNames.entries()) {
    const ext = getNormalizedExtension(path.extname(tempName));
    const finalName = `${String(index + 1).padStart(padSize, "0")}${ext}`;
    await fs.rename(path.join(ABOUT_DIR, tempName), path.join(ABOUT_DIR, finalName));
  }

  console.log(`Renomeadas ${tempNames.length} imagens em public/assets/sobre.`);
}

renameAboutImages().catch((error) => {
  console.error("Falha ao renomear imagens:", error);
  process.exitCode = 1;
});
