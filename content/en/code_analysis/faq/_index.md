---
title: Code Analysis Frequently Asked Questions
description: What are the frequently asked questions about Datadog Code Analysis
further_reading:
- link: "/code_analysis/"
  tag: "Documentation"
  text: "Learn about Code Analysis"
- link: "/code_analysis/static_analysis/"
  tag: "Documentation"
  text: "Learn about Static Analysis"
- link: "/code_analysis/software_composition_analysis/"
  tag: "Documentation"
  text: "Learn about Software Composition Analysis"
---

## Common Questions

### What are Datadog-hosted scans?

When using Datadog-hosted scan, Datadog scans your code within Datadog infrastructure. Datadog acts
as a CI pipeline: it clones your code, runs the analyzer and uploads the results for you.

With Datadog-hosted scans, you do not need to do the heavy lifting and configure any CI pipeline to run the analyzer.

## Static Analysis

### May I import results from other analyzers into Datadog?

While we recommend to use the Datadog Static Analyzer tool[4], Datadog supports the ingestion of files that enforces the SARIF format.

At this time, we tested our API with the following tools:

 - [gitleaks][1]
 - [semgrep][2]
 - [eslint][3]

To ingest your SARIF file into Datadog:
 - Install the `datadog-ci` cli (requires nodejs to be installed)
 - Ensure that your `DD_SITE`, `DD_API_KEY` and `DD_APP_KEY` environment variables are set
 - Invoke the tool to upload the file to Datadog.

Installing and invoking the tool can be done with the two following commands:

```bash
# Install datadog-ci
npm install -g @datadog/datadog-ci

# Upload SARIF file
datadog-ci sarif upload --service "your-app" --env "ci" /path/to/sarif-file.json
```

If you want to import from a tool not support at this time, please contact your Customer Success Manager.

### Can I write custom rules?

Custom rules will be available to all beta customers at the end of Q3 2024.

### Do you always scan all the files at every push or commit?

Scans on the default branches are always full scans.

Scans on non-default branches use *diff-aware* scans. With diff-aware scans, the analyzer only
scans the files that changed between the current branch and the default branch. Diff-aware scans
last seconds while full-scans may take a few minutes (depending on the codebase).

In order for diff-aware to scan, you need to be using the Datadog platform.

### What is Datadog Static Analyzer on the OWASP benchmark?

Our Static Analyzer has been tested against the OWASP benchmark with a score of 44.
We periodically update the results against the benchmark and publish the results in
the [static analyzer documentation][5]

### Is the analyzer open-source?

The Datadog Static Analyzer is available under an open-source license and the code
is [available on GitHub][4].

## Software Composition Analysis

### May I import any SBOM file in Datadog?

While we recommend to use Datadog SBOM generator tool[6], Datadog supports the ingestion of any SBOM files.
Datadog only supports SBOM file with the Cyclone-DX 1.4 and Cyclone-DX 1.5 formats.

At this time, we tested our CLI tools with the following tools:

- [osv-scanner][6]
- [trivy][7]

To ingest your SARIF file into Datadog:
- Install the `datadog-ci` cli (requires nodejs to be installed)
- Ensure that your `DD_SITE`, `DD_API_KEY` and `DD_APP_KEY` environment variables are set
- Invoke the tool to upload the file to Datadog.

Installing and invoking the tool can be done using these two commands:

```bash
# Install datadog-ci
npm install -g @datadog/datadog-ci

# Upload SBOM file
datadog-ci sbom upload --service "your-app" --env "ci" /path/to/sbom-file.json
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/gitleaks/gitleaks
[2]: https://github.com/semgrep/semgrep
[3]: https://github.com/eslint/eslint
[4]: https://github.com/DataDog/datadog-static-analyzer
[5]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/owasp-benchmark.md
[6]: https://github.com/DataDog/osv-scanner
[7]: https://github.com/aquasecurity/trivy
