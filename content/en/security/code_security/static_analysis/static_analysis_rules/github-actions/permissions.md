---
aliases:
- /continuous_integration/static_analysis/rules/github-actions/permissions
- /static_analysis/rules/github-actions/permissions
dependencies: []
disable_edit: true
group_id: github-actions
meta:
  category: Security
  id: github-actions/permissions
  language: YAML
  severity: Warning
  severity_rank: 2
title: Unspecified workflows level permissions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `github-actions/permissions`

**Language:** YAML

**Severity:** Warning

**Category:** Security

## Description
Datadog’s GitHub organization defines default permissions for the `GITHUB_TOKEN` to be restricted (`contents:read`, `metadata:read`, and `packages:read`).

Your repository may require a different setup, so consider defining permissions for each job following the least privilege principle to restrict the impact of a possible compromise.

You can find the list of all possible permissions in [Workflow syntax for GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#permissions). They can be defined at the job or the workflow level.

## Non-Compliant Code Examples
```yaml
jobs:
  test:
    uses: ./.github/workflows/pr-test.yml
    with:
      repo: core
    secrets: inherit
  lint:
    - name: Checkout repository
      uses: actions/checkout
  lint:
    - name: Checkout repository
      uses: actions/checkout@v2
```

## Compliant Code Examples
```yaml
name: kubehound-linter

on:
  push:
    branches:
      - main
  pull_request:

permissions:
  contents: read

jobs:
  linter:
    runs-on: ubuntu-latest
    steps:      
      - name: Harden Runner
        uses: step-security/harden-runner@abc123
        with:
          egress-policy: block
          allowed-endpoints: >
            api.github.com:443
            github.com:443
            goreleaser.com:443
            golang.org:443
            go.dev:443
            objects.githubusercontent.com:443
            proxy.golang.org:443
            storage.googleapis.com:443
            uploads.github.com:443
            sum.golang.org:443
            
      - name: Setup Golang
        uses: actions/setup-go@abc123
        with:
          go-version: "1.22"

      - name: Checkout Git Repo
        uses: actions/checkout@abc123

      - name: golangci-lint
        uses: golangci/golangci-lint-action@abc123
        with:
          version: v1.56.2
          args: ./...
```
