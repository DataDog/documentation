---
aliases:
- /continuous_integration/static_analysis/rules/github-actions/dangerous-trigger
- /static_analysis/rules/github-actions/dangerous-trigger
dependencies: []
disable_edit: true
group_id: github-actions
meta:
  category: Security
  id: github-actions/dangerous-trigger
  language: YAML
  severity: Warning
  severity_rank: 2
title: Dangerous GitHub Actions trigger
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `github-actions/dangerous-trigger`

**Language:** YAML

**Severity:** Warning

**Category:** Security

## Description
Workflows triggered by the `pull_request_target` trigger can read secrets and edit code in the repository that the PR is targeting. **This is a dangerous trigger that must be used with caution.** For security reasons, GitHub runs these workflows using the code from the base branch, rather than the code from the PR.

If you use this trigger **you must not checkout the code of the PR**, otherwise anyone can simply write malicious code and get it to run in a context that has access to your secrets, in addition to write access to the repository.

This type of attack is sometimes referred to as _“pwn request”_.

Note that if you use [the "workflow_call" trigger](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_call), your workflow is callable by other workflows, so possibly by a workflow using the `pull_request_target` trigger.


#### Learn More

-   [Keeping your GitHub Actions and workflows secure Part 1: Preventing pwn requests](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/)
-   [Long Live the Pwn Request: Hacking Microsoft GitHub Repositories and More](https://www.praetorian.com/blog/pwn-request-hacking-microsoft-github-repositories-and-more/)
-   [The tale of a Supply Chain near-miss incident](https://boostsecurity.io/blog/the-tale-of-a-supply-chain-near-miss-incident)

## Non-Compliant Code Examples
```yaml
name: PR

on:
  pull_request_target:
    paths-ignore:
    - datadog_checks_base/datadog_checks/**
    - datadog_checks_dev/datadog_checks/dev/*.py

concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.head_ref }}
  cancel-in-progress: true

jobs:
  test:
    uses: ./.github/workflows/pr-test.yml
    with:
      repo: core
    secrets: inherit
```

## Compliant Code Examples
```yaml
name: PR

on:
  pull_request:
    paths-ignore:
    - datadog_checks_base/datadog_checks/**
    - datadog_checks_dev/datadog_checks/dev/*.py

concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.head_ref }}
  cancel-in-progress: true

jobs:
  test:
    uses: ./.github/workflows/pr-test.yml
    with:
      repo: core
    secrets: inherit
```
