#!/usr/bin/env node
// This script processes the CUE data written by Vector's engineering team, which powers
// their existing website. Using this, we can embed much more detailed information about
// each component than a pure schema-based approach can allow.
//
// This requires that the `cue` binary be run before this script, to resolve the more
// complicated format into something that is consumable by other programs- namely, JSON.
import { mkdir, writeFile } from "fs/promises";

function renderConfigParam(param, prefix = "") {
  let contents = "";

  // TODO: match the existing format of reference pages more closely
  contents += `<tr><td>${prefix}${param.name}</td><td>${param.description}</td></tr>`;
  if (param.type.object) {
    for (const [_subParamName, subParamDetails] of Object.entries(param.type.object.options)) {
      contents += renderConfigParam(subParamDetails, `${prefix}${param.name}.`);
    }
  }

  return contents;
}

// TODO: accept a parameter for the input path to the JSON file
(async function() {
  // XXX(silversupreme): is it possible to run CUE directly instead of requiring it separately?
  const { default: inputJSON } = await import("file:/tmp/cue.json", { assert: { type: 'json' } });
  // TODO: accept a parameter for the output path
  const basePath = "/Users/ari.adair/src/documentation/content/en/observability_pipelines/reference";
  for (const [componentKind, components] of Object.entries(inputJSON.components)) {
    const kindPath = `${basePath}/${componentKind}`;

    try {
      await mkdir(kindPath, { recursive: true });
    } catch (err) {
      console.error(`Could not create path ${kindPath}: ${err}`);
      return -1;
    }

    for (const [componentName, componentDetails] of Object.entries(components)) {
      // TODO: output config information and telemetry
      // TODO: output statefulness
      // TODO: fit the information given in the constrained format the docs give us
      // TODO: use the schema for parameters?
      // TODO: emit menu items for reference pages?
      let fileContents = `---
title: ${componentDetails.title}
---
${componentDetails.description}

# Configuration
${(() => {
          let params = `<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody>`;
          for (const [_paramName, paramDetails] of Object.entries(componentDetails.configuration)) {
            params += renderConfigParam(paramDetails);
          }
          params += `</tbody></table>`;
          return params;
        })()}

# Output Data

# Telemetry
${(() => {
          // TODO: header
          if (componentDetails.telemetry.metrics) {
            let telemetry = `<table></tbody>`;
            for (const [name, details] of Object.entries(componentDetails.telemetry.metrics)) {
              telemetry += `<tr><td>${name}</td><td>${details.description}</td></tr>`;
            }
            telemetry += `</tbody></table>`;
            return telemetry;
          }
        })()}

# How It Works
${(() => {
          let output = ``;
          for (const [_name, details] of Object.entries(componentDetails.how_it_works)) {
            output += `## ${details.title}\n${details.body}\n\n`;
          }
          return output;
        })()}
`;
      const filePath = `${kindPath}/${componentName}.md`;
      try {
        await writeFile(filePath, fileContents);
      } catch (err) {
        console.error(`Could not create component file ${filePath}: ${err}`);
        return -2;
      }
    }

    // TODO: output a per-kind TOC page.
  }
  // TODO: output a global table of contents page
})();
