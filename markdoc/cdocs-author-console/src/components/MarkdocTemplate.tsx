function buildFrontmatter() {
  const frontmatter = `---
title: Your Title Here
---`;

  return frontmatter;
}

function MarkdocTemplate() {
  return (
    <div>
      <pre>{buildFrontmatter()}</pre>
    </div>
  );
}

export default MarkdocTemplate;
