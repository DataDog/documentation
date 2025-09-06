// Run before Claude modifies a file

const isNonEng = str => ["/es/", ".es.", "/fr/", ".fr.", 
      "/ja/", ".ja.", "/ko/", ".ko."].some(sub => str.includes(sub));

async function main() {
  const input = await new Promise((resolve) => {
    let data = "";
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });

  const hookData = JSON.parse(input);
  const toolInput = hookData.tool_input;

  // Access the path of the file getting modified
  const filePath = toolInput.file_path || toolInput.path;
  if (!filePath) {
    process.exit(0);
  }

  if (isNonEng(filePath)) {
   console.error("Trying to modify a non-English file.");
   process.exit(2)
  } else {
   process.exit(0);
  }

}

main().catch((err) => {
  console.error(`Hook error: ${err.message}`);
  process.exit(1);
});