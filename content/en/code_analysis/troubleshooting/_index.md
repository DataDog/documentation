---
title: Code Analysis Troubleshooting
description: Learn how to troubleshoot common Code Analysis issues and how to engage with Support.
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

### Issue `GLIBC_X.YY not found`

If you run the static analyzer in your CI pipeline and get an error message similar to the following line:

```
version `GLIBC_X.YY' not found
```

It means that you are either:

- running your CI pipeline with a Linux distribution that contains an old version of the glibc. In this case, Datadog recommends upgrading to the latest version. The analyzer always runs with the latest of Ubuntu/Debian based-systems.
- running your CI pipeline with a Linux distribution that does not rely on the glibc (such as Alpine Linux). Instead,
  run your CI pipeline with a distribution that supports the latest version of the glibc (such as the stable version of Ubuntu).

### Results are not being surfaced in the Datadog UI

If you are using GitHub, ensure that you are using a GitHub App and have the required permissions. 

If you are running Code Analysis on a non-GitHub repository, ensure that the first scan is ran on your default branch (for example, a branch name like
`master`, `main`, `prod`, `production` or `develop`). After you commit on your default branch, non-default branches are analyzed.

You can always configure your default branch in-app under [Repository Settings][4].

If you run the tool within your CI pipeline, make sure that `datadog-ci` runs **at the root** of the repository being analyzed.

### Getting a 403 error when running the analyzer

Make sure you correctly specify the variables `DD_APP_KEY`, `DD_API_KEY`, and `DD_SITE` when running the analyzer and `datadog-ci`.

## Software Composition Analysis

For issues with Datadog Software Composition Analysis, include the following information in a bug report to Support as well as your Customer Success Manager.

- The output of your SCA tool (such as CLI) that is run locally or in a CI/CD pipeline
- The SBOM file produced (if there are any available)
- The URL of your repository (public or private)
- The name of the branch you ran the analysis on
- The list of dependency files in your repository (such as `package-lock.json`, `requirements.txt`, or `pom.xml`)

### Results are not being surfaced in the Datadog UI

If you are running Code Analysis on a non-GitHub repository, ensure that the first scan is ran on your default branch (for example, a branch name like
`master` or `main`). After you commit on your default branch, non-default branches are analyzed.

You can always configure your default branch in-app under [Repository Settings][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /code_analysis/static_analysis/github_actions
[3]: /code_analysis/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/ci/settings/repository
