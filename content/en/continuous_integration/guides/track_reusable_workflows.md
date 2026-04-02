---
title: Track GitHub Reusable Workflow Usage with Custom Tags
description: Learn how to use custom tags to track which versions and references of GitHub Reusable Workflows are used across your organization.
further_reading:
  - link: "/continuous_integration/pipelines/custom_tags_and_measures/"
    tag: "Documentation"
    text: "Adding Custom Tags and Measures to Pipeline Traces"
  - link: "/continuous_integration/pipelines/github/"
    tag: "Documentation"
    text: "Set up CI Visibility for GitHub Actions"
  - link: "/continuous_integration/explorer/"
    tag: "Documentation"
    text: "CI Visibility Explorer"
  - link: "https://docs.github.com/en/actions/sharing-automations/reusing-workflows"
    tag: "External"
    text: "GitHub documentation on Reusable Workflows"
---

## Overview

[GitHub Reusable Workflows][1] allow organizations to centralize CI/CD logic in shared workflow files that are called from other repositories. As usage grows, it becomes difficult to track which repositories are using specific versions of a reusable workflow, or when callers are pinned to outdated refs.

CI Visibility does not automatically extract reusable workflow metadata (such as version, ref, or source repository). However, you can use [custom tags][2] to attach this information to your pipeline and job spans, enabling you to build dashboards, monitors, and queries to track reusable workflow usage across your organization.

## Prerequisites

- [CI Visibility for GitHub Actions][3] is set up and sending pipeline data to Datadog.
- The [`datadog-ci` CLI][4] (>=v1.15.0) is available in your workflows. You can install it as a step or use `npx`.
- A valid [Datadog API key][5] is stored as a GitHub Actions secret (for example, `DD_API_KEY`).

## Add reusable workflow tags from the called workflow

The most reliable way to tag reusable workflow metadata is to add a tagging step **inside the reusable workflow itself**. This way, every caller automatically gets the tags without extra configuration.

GitHub does not include reusable workflow metadata (such as the called workflow's ref or path) in the webhook events that Datadog receives, and the [`github.workflow_ref`][6] context variable resolves to the **caller** workflow's ref, not the called workflow's. To work around this, query the [GitHub Actions REST API][8] from within the workflow to look up the `referenced_workflows` for the current run:

**Reusable workflow:**

```yaml
# my-org/shared-workflows/.github/workflows/build.yml
name: Shared Build Workflow

on:
  workflow_call:
    inputs:
      build-target:
        required: true
        type: string
    secrets:
      DD_API_KEY:
        required: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Tag reusable workflow metadata in CI Visibility
        env:
          DATADOG_API_KEY: ${{ secrets.DD_API_KEY }}
          DATADOG_SITE: {{< region-param key="dd_site" >}}
          GH_TOKEN: ${{ github.token }}
        run: |
          # Look up the reusable workflow ref from the GitHub API
          WORKFLOW_REF=$(gh api repos/${{ github.repository }}/actions/runs/${{ github.run_id }} \
            --jq '.referenced_workflows[0] | "\(.path)@\(.ref)"')

          # Extract the version or branch ref (the part after '@')
          WORKFLOW_VERSION="${WORKFLOW_REF##*@}"

          # Extract the workflow path (the part before '@')
          WORKFLOW_PATH="${WORKFLOW_REF%%@*}"

          # Extract the source repository
          WORKFLOW_REPO="${WORKFLOW_PATH%%/.github/*}"

          npx @datadog/datadog-ci tag --level job \
            --tags "reusable_workflow.ref:${WORKFLOW_VERSION}" \
            --tags "reusable_workflow.path:${WORKFLOW_PATH}" \
            --tags "reusable_workflow.repo:${WORKFLOW_REPO}" \
            --tags "reusable_workflow.caller_repo:${{ github.repository }}"

      # ... remaining build steps
      - name: Build
        run: echo "Building ${{ inputs.build-target }}"
```

**Caller workflow:**

```yaml
# In a caller repository's workflow
name: CI

on: [push]

jobs:
  call-shared-build:
    uses: my-org/shared-workflows/.github/workflows/build.yml@v2.1.0
    with:
      build-target: production
    secrets:
      DD_API_KEY: ${{ secrets.DD_API_KEY }}
```

This produces the following tags on the job span:

| Tag | Example value | Description |
|-----|--------------|-------------|
| `reusable_workflow.ref` | `refs/tags/v2.1.0` | The Git ref (tag, branch, or SHA) of the called workflow. |
| `reusable_workflow.path` | `my-org/shared-workflows/.github/workflows/build.yml` | The full path to the reusable workflow file. |
| `reusable_workflow.repo` | `my-org/shared-workflows` | The repository that owns the reusable workflow. |
| `reusable_workflow.caller_repo` | `my-org/frontend-app` | The repository that called the reusable workflow. |

{{< img src="ci/guides/track_reusable_workflows/reusable_workflow_tags.jpg" alt="Reusable workflow custom tags on a job span in CI Visibility" style="width:80%;" >}}

## Add reusable workflow tags from the caller workflow

If you cannot modify the shared workflow, you can tag the metadata from a separate job in the **caller** workflow instead. Use the same [GitHub Actions REST API][8] approach to look up the reusable workflow ref automatically:

```yaml
# In a caller repository's workflow
name: CI

on: [push]

jobs:
  call-shared-build:
    uses: my-org/shared-workflows/.github/workflows/build.yml@v2.1.0
    with:
      build-target: production
    secrets: inherit

  tag-workflow-metadata:
    runs-on: ubuntu-latest
    needs: call-shared-build
    steps:
      - name: Tag reusable workflow version
        env:
          DATADOG_API_KEY: ${{ secrets.DD_API_KEY }}
          DATADOG_SITE: {{< region-param key="dd_site" >}}
          GH_TOKEN: ${{ github.token }}
        run: |
          WORKFLOW_REF=$(gh api repos/${{ github.repository }}/actions/runs/${{ github.run_id }} \
            --jq '.referenced_workflows[0] | "\(.path)@\(.ref)"')

          WORKFLOW_VERSION="${WORKFLOW_REF##*@}"
          WORKFLOW_PATH="${WORKFLOW_REF%%@*}"
          WORKFLOW_REPO="${WORKFLOW_PATH%%/.github/*}"

          npx @datadog/datadog-ci tag --level pipeline \
            --tags "reusable_workflow.ref:${WORKFLOW_VERSION}" \
            --tags "reusable_workflow.path:${WORKFLOW_PATH}" \
            --tags "reusable_workflow.repo:${WORKFLOW_REPO}"
```

## Track reusable workflow inputs

If your reusable workflow accepts [inputs][7] that affect build behavior (for example, target environment, feature flags, or runtime version), you can tag those as well to understand how the workflow is being invoked:

```yaml
      - name: Tag workflow inputs
        env:
          DATADOG_API_KEY: ${{ secrets.DD_API_KEY }}
          DATADOG_SITE: {{< region-param key="dd_site" >}}
        run: |
          npx @datadog/datadog-ci tag --level job \
            --tags "reusable_workflow.input.build_target:${{ inputs.build-target }}"
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/en/actions/sharing-automations/reusing-workflows
[2]: /continuous_integration/pipelines/custom_tags_and_measures/
[3]: /continuous_integration/pipelines/github/
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs#github-context
[7]: https://docs.github.com/en/actions/sharing-automations/reusing-workflows#using-inputs-and-secrets-in-a-reusable-workflow
[8]: https://docs.github.com/en/rest/actions/workflow-runs#get-a-workflow-run
[9]: /continuous_integration/explorer/
