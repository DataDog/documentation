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

## Common questions

### What are Datadog-hosted scans?

With Datadog-hosted scans, your code is scanned within Datadog's infrastructure as opposed to within your CI pipeline.
Datadog clones your code, runs the static analyzer to perform Static Analysis and/or Software Composition Analysis, and uploads the results for you.


The benefit of Datadog-hosted scans is that no configuration is needed in your CI pipeline(s) to use Code Analysis.


## Static Analysis

### Can results be imported into Datadog from other analyzers?

While the [Datadog Static Analyzer][4] is recommended, Datadog supports the ingestion of files that adhere to SARIF format.

Ingestion of SARIF files is verified for the following third-party tools:

 - [gitleaks][1]
 - [semgrep][2]
 - [eslint][3]

To ingest your SARIF file into Datadog:
1. Install the `datadog-ci` CLI (requires that Node.js is installed).
2. Ensure that your `DD_SITE`, `DD_API_KEY`, and `DD_APP_KEY` environment variables are set.
3. Invoke the tool to upload the file to Datadog.

Installing and invoking the tool can be done with the two following commands:

```bash
# Install datadog-ci
npm install -g @datadog/datadog-ci

# Upload SARIF file
datadog-ci sarif upload --service "your-app" --env "ci" /path/to/sarif-file.json
```

If you want to import using a tool that is not supported, contact your Customer Success Manager.

### Can custom rules be used?

Custom rule availability is planned for all beta customers at the end of Q3 2024.

### Do you always scan all the files at every push or commit?

By default, scans on non-default branches use *diff-aware*. With diff-aware scans, the analyzer only
scans the files that changed between the current branch and the default branch. Diff-aware scans
last seconds, while full-scans may take a few minutes (depending on the codebase).

You must be using Datadog's analyzer to enable diff-aware scans.

### What is Datadog's OWASP benchmark score for Static Analysis?

Datadog's static analyzer has been tested against the OWASP benchmark with a score of 44.
The analyzer is periodically checked against the benchmark and updated results are published to the [static analyzer documentation][5].

### Is the analyzer open source?

Datadog's static analyzer is available under an open source license and the code is [available on GitHub][4].

### Does the analyzer runs on Windows?

The Datadog Static Analyzer runs only on UNIX-based systems. An open feature request to support Windows can be [tracked on GitHub](https://github.com/DataDog/datadog-static-analyzer/issues/476).

## Software Composition Analysis

### What SBOM format Datadog supports?

While the [Datadog SBOM generator][6] is recommended, Datadog supports the ingestion of any SBOM files.
Datadog only supports SBOM files with the Cyclone-DX 1.4 and Cyclone-DX 1.5 formats.

Ingestion of SBOM files is verified for the following third-party tools:

- [osv-scanner][6]
- [trivy][7]

To ingest your SBOM file into Datadog:
1. Install the `datadog-ci` CLI (requires that Node.js is installed).
2. Ensure that your `DD_SITE`, `DD_API_KEY` and `DD_APP_KEY` environment variables are set.
3. Invoke the tool to upload the file to Datadog.

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
