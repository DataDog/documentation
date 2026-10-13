import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const scriptPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "verifyDist.mjs",
);

async function writeDistFile(distDir: string, relativePath: string) {
  const filePath = join(distDir, relativePath);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, "");
}

async function runVerifyDist(
  distDir: string,
): Promise<{ exitCode: number; output: string }> {
  try {
    const { stdout, stderr } = await execFileAsync(process.execPath, [
      scriptPath,
      distDir,
      "--min-categories=1",
    ]);
    return { exitCode: 0, output: stdout + stderr };
  } catch (error) {
    const failure = error as { code: number; stdout: string; stderr: string };
    return { exitCode: failure.code, output: failure.stdout + failure.stderr };
  }
}

describe("verifyDist.mjs", () => {
  let distDir: string;

  beforeEach(async () => {
    distDir = await mkdtemp(join(tmpdir(), "verify-dist-"));
    await writeDistFile(distDir, "api/latest/dashboards/index.html");
  });

  afterEach(async () => {
    await rm(distDir, { recursive: true, force: true });
  });

  it("passes when the changelog page and its .md twin are present", async () => {
    await writeDistFile(distDir, "api/changelog/index.html");
    await writeDistFile(distDir, "api/changelog.md");

    const { exitCode, output } = await runVerifyDist(distDir);
    expect(output).toContain("verify:dist passed");
    expect(exitCode).toBe(0);
  });

  it("fails, naming each missing file, when the changelog is absent", async () => {
    const { exitCode, output } = await runVerifyDist(distDir);
    expect(exitCode).toBe(1);
    expect(output).toContain("api/changelog/index.html");
    expect(output).toContain("api/changelog.md");
  });
});
