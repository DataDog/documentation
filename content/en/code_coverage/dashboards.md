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

- One **repository event** that represents the report as a whole. This event carries no `@service`, `@codeowner`, or `@report.flag` tag, and is not marked with `@split:true`.
- One **per-service event** for each [service][3] the report covers. Tagged with `@service` and `@split:true`.
- One **per-code-owner event** for each [code owner][3] the report covers. Tagged with `@codeowner` and `@split:true`.
- One **per-flag event** for each [flag][4] applied to the report. Tagged with `@report.flag` and `@split:true`.

The absence of `@split:true` is what identifies the repository event. Any dashboard query that doesn't account for the split events ends up double-counting the same report. The query recipes below are written to isolate exactly one of these event types at a time.

## Available query facets

| Facet | Description |
|---|---|
| `@git.repository.id` | URL-style repository identifier in lowercase, without the scheme, for example `github.com/datadog/documentation`. Scope every widget query to a single repository. |
| `@git.default_branch` | `true` on events from the repository's default branch. Add this only when a widget should report on the default branch. Use it instead of `@git.branch` when the default branch name differs across repositories. |
| `@git.branch` | Branch name, for example `main`. Use to target a specific named branch. |
| `@git.commit.sha` | Commit the report was uploaded for. Useful as a `group by` for per-commit timeseries. |
| `@service` | Service name. Present only on per-service events. |
| `@codeowner` | Code owner team. Present only on per-code-owner events. |
| `@report.flag` | Flag name. Present only on per-flag events. |
| `@split` | Present only on split events; absent on the repository event. |

## Build coverage widgets

Each recipe is the query filter for one widget. Replace `<REPOSITORY_ID>` with the lowercase, URL-style identifier of your repository (for example, `github.com/datadog/documentation`).

<div class="alert alert-info">The breakdown recipes (by service, code owner, and flag) do not restrict by branch. They aggregate coverage across every branch that has uploaded reports, including feature branches and pull requests. Add <code>@git.default_branch:true</code> or <code>@git.branch:&lt;BRANCH_NAME&gt;</code> to limit a widget to a specific branch.</div>

### Track overall coverage on the default branch

Use this filter in a Query Value widget for the current coverage number, or a Timeseries widget for a trend line over time.

{{< code-block lang="text" >}}
@git.repository.id:<REPOSITORY_ID> @git.default_branch:true -@service:* -@codeowner:* -@report.flag:* -@split:true
{{< /code-block >}}

The combined `-@service:*`, `-@codeowner:*`, `-@report.flag:*`, and `-@split:true` filters exclude every split event, leaving only the repository event.

### Break down coverage by service

Compare coverage across the services in a monorepo. Use this filter in a Top List or a Timeseries widget, grouped by `@service`.

{{< code-block lang="text" >}}
@git.repository.id:<REPOSITORY_ID> @service:* -@codeowner:* -@report.flag:*
{{< /code-block >}}

`@service:*` already restricts results to per-service events (which are split events), so adding `-@split:true` would exclude all matching events and return no data.

### Break down coverage by code owner

Compare coverage across teams. Use this filter in a Top List or a Timeseries widget, grouped by `@codeowner`.

{{< code-block lang="text" >}}
@git.repository.id:<REPOSITORY_ID> @codeowner:* -@service:* -@report.flag:*
{{< /code-block >}}

### Break down coverage by flag

Compare coverage across [flags][4], for example by test type or runtime version. Use this filter in a Top List or a Timeseries widget, grouped by `@report.flag`.

{{< code-block lang="text" >}}
@git.repository.id:<REPOSITORY_ID> @report.flag:* -@service:* -@codeowner:*
{{< /code-block >}}

### Example: coverage on `main` for a specific repository

{{< code-block lang="text" >}}
@git.repository.id:github.com/datadog/documentation @git.branch:main -@service:* -@codeowner:* -@report.flag:* -@split:true
{{< /code-block >}}

This example uses `@git.branch:main` to target a named branch. To follow the default branch on any repository, use `@git.default_branch:true` instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[3]: /code_coverage/monorepo_support
[4]: /code_coverage/flags
