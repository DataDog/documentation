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

A single developer can author commits under more than one Git author email — for example, by running `git config user.email` in different repositories. Without deduplication, each email is counted as a separate committer.

For repositories hosted on GitHub, Datadog maps each Git author email to the underlying GitHub user and counts that user once, even when they push under different emails. Deduplication requires a Datadog [GitHub App][3] installed on the affected repositories with the `Contents: Read` permission.

Deduplication is only available for GitHub repositories. Repositories hosted on GitLab, Azure DevOps, or Bitbucket may still show duplicated committers.

If you see duplicate committers for GitHub repositories, confirm that the Datadog GitHub App is installed on those repositories with the `Contents: Read` permission. You can review your installation from the [GitHub integration tile][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/pipelines
[2]: /continuous_integration/guides/ingestion_control
[3]: /integrations/github/
[4]: https://app.datadoghq.com/integrations/github/
