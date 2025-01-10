---
aliases:
- /continuous_integration/static_analysis/rules/github-actions/unpinned-actions
- /static_analysis/rules/github-actions/unpinned-actions
dependencies: []
disable_edit: true
group_id: github-actions
meta:
  category: Security
  id: github-actions/unpinned-actions
  language: YAML
  severity: Warning
  severity_rank: 2
title: Workflow depends on unpinned GitHub Actions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `github-actions/unpinned-actions`

**Language:** YAML

**Severity:** Warning

**Category:** Security

## Description
When using a third party action, one needs to provide its GitHub path (`owner/project`) and can eventually pin it to a Git ref (a branch name, a Git tag, or a commit hash).

No pinned Git ref means the action uses the latest commit of the default branch each time it runs, eventually running newer versions of the code that were not audited by Datadog. Specifying a Git tag is better, but since they are not immutable, using a full length hash is recommended to make sure the action content is actually frozen to some reviewed state.

Be careful however, as even pinning an action by hash can be circumvented by attackers still. For instance, if an action relies on a Docker image which is itself not pinned to a digest, it becomes possible to alter its behaviour through the Docker image without actually changing its hash. You can learn more about this kind of attacks in [Unpinnable Actions: How Malicious Code Can Sneak into Your GitHub Actions Workflows](https://www.paloaltonetworks.co.uk/blog/prisma-cloud/unpinnable-actions-github-security/). Pinning actions by hash is still a good first line of defense against supply chain attacks.

Additionally, pinning by hash or tag means the action won’t benefit from newer version updates if any, including eventual security patches. Make sure to regularly check if newer versions for an action you use are available. For actions coming from a very trustworthy source, it can make sense to use a laxer pinning policy to benefit from updates as soon as possible.

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
        uses: step-security/harden-runner@8ca2b8b2ece13480cda6dacd3511b49857a23c09
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
        uses: actions/setup-go@93397bea11091df50f3d7e59dc26a7711a8bcfbe
        with:
          go-version: "1.22"

      - name: Checkout Git Repo
        uses: actions/checkout@8e5e7e5ab8b370d6c329ec480221332ada57f0ab

      - name: golangci-lint
        uses: golangci/golangci-lint-action@3a919529898de77ec3da873e3063ca4b10e7f5cc
        with:
          version: v1.56.2
          args: ./...
```
