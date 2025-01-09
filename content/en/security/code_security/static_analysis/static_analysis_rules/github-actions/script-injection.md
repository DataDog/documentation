---
aliases:
- /continuous_integration/static_analysis/rules/github-actions/script-injection
- /static_analysis/rules/github-actions/script-injection
dependencies: []
disable_edit: true
group_id: github-actions
meta:
  category: Security
  id: github-actions/script-injection
  language: YAML
  severity: Warning
  severity_rank: 2
title: Script injection through user controlled values
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `github-actions/script-injection`

**Language:** YAML

**Severity:** Warning

**Category:** Security

## Description
As detailed in [Security hardening for GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#understanding-the-risk-of-script-injections), it is possible for an attacker to inject scripts through PR, branch, commit names, and more.

Avoid using user input in your actions shell scripts, and if you must, consider storing them first in an environment variable to escape them properly.

Read [Cycode Discovers a Supply Chain Vulnerability in Bazel - Cycode](https://cycode.com/blog/cycode-discovers-a-supply-chain-vulnerability-in-bazel/) if you wanna see a concrete exploitation of such mechanism.

## Non-Compliant Code Examples
```yaml
jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - name: Echo PR title
        run: |
          title="${{ github.event.pull_request.title }}"
          echo $title
```

## Compliant Code Examples
```yaml
permissions:
  contents: read
jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - name: Echo PR title
        env:
          TITLE: ${{ github.event.pull_request.title }}
        run: |
          echo $TITLE
      - name: Echo runner tytle
        run: |
          echo "${{ runner.name }}"
```
