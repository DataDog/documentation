---
title: Code Analysis Troubleshooting
description: Learn how to troubleshoot common Code Analysis issues and how to engage with Support.
further_reading:
- link: "/code_analysis/"
  tag: "Documentation"
  text: "Learn about Code Analysis"
- link: "/security/code_security/static_analysis/"
  tag: "Documentation"
  text: "Learn about Static Analysis"
- link: "/security/code_security/software_composition_analysis/"
  tag: "Documentation"
  text: "Learn about Software Composition Analysis"
---

## Overview

If you experience issues setting up or configuring Datadog Code Analysis, use this page to start troubleshooting. If you continue to have trouble, [contact Datadog Support][1].

## Static Analysis

For issues with the Datadog Static Analyzer, include the following information in a bug report to Support as well as your Customer Success Manager.

- Your `static-analysis.datadog.yml` file
- The output of your static analysis tool (such as a CLI) that is run locally or in a CI/CD pipeline
- The SARIF file produced (if there are any available)
- The URL of your repository (public or private)
- The name of the branch you ran the analysis on
- The exact command line used to run the Datadog Static Analyzer

### Performance issues

If you are experiencing performance issues, you can enable the `--performance-statistics` flag when running the static analysis tool from the command line.

For performance issues, include the following information:

- Your `static-analysis.datadog.yml` file
- The output of your static analysis tool (such as a CLI) that is run locally or in a CI/CD pipeline
- The URL of your repository (public or private)

**Note:** If you are using [Static Analysis and GitHub Actions][2], set the [`enable_performance_statistics`][3] parameter to true.

### Blocking issues

If you are experiencing issues unrelated to performance or if the Datadog Static Analyzer fails to exit, run the Datadog Static Analyzer with the `--debug true --performance-statistics` flag.

### Getting a 403 error when running the analyzer

Ensure that the following variables are correctly specified: `DD_APP_KEY`, `DD_API_KEY`, and `DD_SITE` when running the analyzer and `datadog-ci`.

### Issues with SARIF uploads

<div class="alert alert-info">
  SARIF importing has been tested for Snyk, CodeQL, Semgrep, Checkov, Gitleaks, and Sysdig. Please reach out to <a href="/help">Datadog Support</a> if you experience any issues with other SARIF-compliant tools.
</div>

When uploading results from third-party static analysis tools to Datadog, ensure that they are in the interoperable [Static Analysis Results Interchange Format (SARIF) Format][5]. Node.js version 14 or later is required.

To upload a SARIF report, follow the steps below:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][4].
2. Optionally, set a [`DD_SITE` variable][7] (this default to `datadoghq.com`).
3. Install the `datadog-ci` utility:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Run the third-party static analysis tool on your code and output the results in the SARIF format.
5. Upload the results to Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

### `GLIBC_X.YY not found` error message

If you run the static analyzer in your CI pipeline and get an error message similar to the following line:

```
version `GLIBC_X.YY' not found
```

It means that you are either:

- running your CI pipeline with a Linux distribution that contains an old version of the glibc. In this case, Datadog recommends upgrading to the latest version. The analyzer always runs with the latest of Ubuntu/Debian based-systems.
- running your CI pipeline with a Linux distribution that does not rely on the glibc (such as Alpine Linux). Instead,
  run your CI pipeline with a distribution that supports the latest version of the glibc (such as the stable version of Ubuntu).

### Results are not being surfaced in the Datadog UI

**If you are running Code Analysis on a non-GitHub repository**, ensure that the first scan is ran on your default branch (for example, a branch name like
`master`, `main`, `prod`, or `production`). After you commit on your default branch, non-default branches are analyzed. You can always configure your default branch in-app under [Repository Settings][4].

If you are using Datadog's analyzer, [diff-aware scanning][6] is enabled by default. If you running the tool within your CI pipeline, make sure that `datadog-ci` runs **at the root** of the repository being analyzed.


## Software Composition Analysis

For issues with Datadog Software Composition Analysis, include the following information in a bug report to Support as well as your Customer Success Manager.

- The output of your SCA tool (such as CLI) that is run locally or in a CI/CD pipeline
- The SBOM file produced (if there are any available)
- The URL of your repository (public or private)
- The name of the branch you ran the analysis on
- The list of dependency files in your repository (such as `package-lock.json`, `requirements.txt`, or `pom.xml`)

### Issues with SBOM uploads
While the [Datadog SBOM generator][7] is recommended, Datadog supports the ingestion of any SBOM files. Please ensure your files adhere to either the Cyclone-DX 1.4 or Cyclone-DX 1.5 formats.

Ingestion of SBOM files is verified for the following third-party tools:
- [osv-scanner][7]
- [trivy][8]

To ingest your SBOM file into Datadog, follow the steps below:

1. Install the `datadog-ci` CLI (requires that Node.js is installed).
2. Ensure that your `DD_SITE`, `DD_API_KEY` and `DD_APP_KEY` environment variables are set.
3. Invoke the tool to upload the file to Datadog.
Installing and invoking the tool can be done using these two commands:
```bash
# Install datadog-ci
npm install -g @datadog/datadog-ci

# Upload SBOM file
datadog-ci sbom upload /path/to/sbom-file.json
```

### Results are not being surfaced in the Datadog UI

**If you are running Code Analysis on a non-GitHub repository**, ensure that the first scan is ran on your default branch (for example, a branch name like
`master`, `main`, `prod`, or `production`). After you commit on your default branch, non-default branches are analyzed.

You can always configure your default branch in-app under [Repository Settings][4].

### No package detected for C# projects

Our SBOM generator, ([`osv-scanner`][7]), extracts dependencies from a `packages.lock.json` file. If you do not have
this file, you can update your project definition to generate it. Follow these [instructions to update your project definition][9] to generate a `packages.lock.json` file.

The generated lock file is used by [`osv-scanner`][7] to extract dependencies and generate an SBOM.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /security/code_security/static_analysis/github_actions
[3]: /security/code_security/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/ci/settings/repository
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: https://docs.datadoghq.com/security/code_security/static_analysis/setup/#diff-aware-scanning
[7]: https://github.com/DataDog/osv-scanner
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file
