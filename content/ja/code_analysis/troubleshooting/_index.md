---
title: Code Analysis Troubleshooting
description: Learn how to troubleshoot common Code Analysis issues and how to engage with Support.
further_reading:
- link: /code_analysis/
  tag: Documentation
  text: Learn about Code Analysis
- link: /code_analysis/static_analysis/
  tag: Documentation
  text: Learn about Static Analysis
- link: /code_analysis/software_composition_analysis/
  tag: Documentation
  text: Learn about Software Composition Analysis
---

## 概要

If you experience issues setting up or configuring Datadog Code Analysis, use this page to start troubleshooting. If you continue to have trouble, [contact Datadog Support][1].

## 静的分析

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

## Software Composition Analysis

For issues with Datadog Software Composition Analysis, include the following information in a bug report to Support as well as your Customer Success Manager.

- The output of your SCA tool (such as CLI) that is run locally or in a CI/CD pipeline
- The SBOM file produced (if there are any available)
- The URL of your repository (public or private)
- The name of the branch you ran the analysis on
- The list of dependency files in your repository (such as `package-lock.json`, `requirements.txt`, or `pom.xml`)

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /code_analysis/static_analysis/github_actions
[3]: /code_analysis/static_analysis/github_actions#inputs
