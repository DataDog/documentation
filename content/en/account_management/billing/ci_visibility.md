---
title: CI Visibility Billing
algolia:
  tags: ['ci visibility', 'ci visibility billing', 'ci visibility billing questions', 'ci visibility pricing']
further_reading:
  - link: "/continuous_integration/pipelines"
    tag: "Documentation"
    text: "Learn about Pipeline Visibility"
  - link: "/continuous_integration/guides/ingestion_control"
    tag: "Documentation"
    text: "Learn about Ingestion Controls for CI Visibility"
---

## Overview

This guide provides a non-exhaustive list of billing considerations for [CI Visibility][1].

## Counting committers

A committer is an active Git contributor, identified by their Git author email address. For billing purposes, a committer is included if they make at least three commits in a given month.

## Billing for commits made by bots or actions performed in the GitHub UI

Commits made by verified bots or through actions performed directly in the GitHub UI are not billed by Datadog. These are automatically excluded from billing calculations. Only verified bots are excluded from billing.

## Excluding commits from specific people

Yes, you can exclude commits from specific people by using [exclusion filters][2].

## Deduplicating committers across email addresses

In some cases, a single developer's commits can be split across multiple Git author emails — for example, if they set a different email with `git config user.email` in different repositories. If more than one of those emails passes the three-commit billing threshold described above, each counts as a separate committer.

For repositories hosted on GitHub, Datadog can map each Git author email to the underlying GitHub user so that the developer is counted once, even when they push under different emails. This requires a Datadog [GitHub App][3] installed on the affected repositories with the `Contents: Read` permission.

This mapping is available for GitHub repositories only. Repositories hosted on GitLab, Azure DevOps, or Bitbucket are not deduplicated.

If your committer count looks higher than expected for GitHub repositories, check that the Datadog GitHub App is installed on those repositories with the `Contents: Read` permission. You can review your installation from the [GitHub integration tile][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/pipelines
[2]: /continuous_integration/guides/ingestion_control
[3]: /integrations/github/
[4]: https://app.datadoghq.com/integrations/github/
