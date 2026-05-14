---
title: Build Dashboards with Code Coverage Data
description: "Build Datadog dashboards on Code Coverage events: track repository coverage and break it down by service, code owner, or flag."
further_reading:
  - link: "/code_coverage"
    tag: "Documentation"
    text: "Code Coverage"
  - link: "/code_coverage/setup"
    tag: "Documentation"
    text: "Set up Code Coverage"
  - link: "/code_coverage/flags"
    tag: "Documentation"
    text: "Organize coverage data with flags"
  - link: "/code_coverage/monorepo_support"
    tag: "Documentation"
    text: "Use Code Coverage in monorepos"
---

## Overview

Code Coverage events are available as a data source in [Datadog dashboards][1]. This page describes the event model, the facets you can query, and the query patterns for the most common widgets.

## Coverage event model

Each report uploaded with `datadog-ci coverage upload` produces several events in Datadog:

- One **repository event** that represents the report as a whole. This event carries no `@service`, `@codeowner`, or `@report.flag` tag.
- One **per-service event** for each [service][3] the report covers, tagged with `@service`.
- One **per-code-owner event** for each [code owner][3] the report covers, tagged with `@codeowner`.
- One **per-flag event** for each [flag][4] applied to the report, tagged with `@report.flag`.

Any dashboard query that doesn't isolate one of these event types ends up combining all of them and counting the same report multiple times. The query recipes below are written to select exactly one event type at a time.

## Available query facets

| Facet | Description |
|---|---|
| <code style="white-space:nowrap">@git.repository.id</code> | URL-style repository identifier in lowercase, without the scheme, for example `github.com/datadog/documentation`. Scope every widget query to a single repository. |
| <code style="white-space:nowrap">@git.default_branch</code> | `true` on events from the repository's default branch. Add this only when a widget should report on the default branch. Use it instead of `@git.branch` when the default branch name differs across repositories. |
| <code style="white-space:nowrap">@git.branch</code> | Branch name, for example `main`. Use to target a specific named branch. |
| <code style="white-space:nowrap">@git.commit.sha</code> | Commit the report was uploaded for. Useful as a `group by` for per-commit timeseries. |
| <code style="white-space:nowrap">@service</code> | Service name. Present only on per-service events. |
| <code style="white-space:nowrap">@codeowner</code> | Code owner team. Present only on per-code-owner events. |
| <code style="white-space:nowrap">@report.flag</code> | Flag name. Present only on per-flag events. |

## Build coverage widgets

Each recipe is the query filter for one widget. Replace `<REPOSITORY_ID>` with the lowercase, URL-style identifier of your repository (for example, `github.com/datadog/documentation`).

<div class="alert alert-info">The breakdown recipes (by service, code owner, and flag) do not restrict by branch. They aggregate coverage across every branch that has uploaded reports, including feature branches and pull requests. Add <code>@git.default_branch:true</code> or <code>@git.branch:&lt;BRANCH_NAME&gt;</code> to limit a widget to a specific branch.</div>

### Track overall coverage on the default branch

Use this filter in a Query Value widget for the current coverage number, or a Timeseries widget for a trend line over time.

{{< code-block lang="text" >}}
@git.repository.id:<REPOSITORY_ID> @git.default_branch:true -@split:true -@report.flag:*
{{< /code-block >}}

`-@split:true` excludes per-service and per-code-owner events, and `-@report.flag:*` excludes per-flag events, leaving only the repository event.

### Break down coverage by service

Compare coverage across the services in a monorepo. Use this filter in a Top List or a Timeseries widget, grouped by `@service`.

{{< code-block lang="text" >}}
@git.repository.id:<REPOSITORY_ID> @service:*
{{< /code-block >}}

### Break down coverage by code owner

Compare coverage across teams. Use this filter in a Top List or a Timeseries widget, grouped by `@codeowner`.

{{< code-block lang="text" >}}
@git.repository.id:<REPOSITORY_ID> @codeowner:*
{{< /code-block >}}

### Break down coverage by flag

Compare coverage across [flags][4], for example by test type or runtime version. Use this filter in a Top List or a Timeseries widget, grouped by `@report.flag`.

{{< code-block lang="text" >}}
@git.repository.id:<REPOSITORY_ID> @report.flag:*
{{< /code-block >}}

### Example: coverage on `main` for a specific repository

{{< code-block lang="text" >}}
@git.repository.id:github.com/datadog/documentation @git.branch:main -@split:true -@report.flag:*
{{< /code-block >}}

This example uses `@git.branch:main` to target a named branch. To follow the default branch on any repository, use `@git.default_branch:true` instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[3]: /code_coverage/monorepo_support
[4]: /code_coverage/flags
