---
title: CI Visibility Billing
further_reading:
  - link: "/continuous_integration/pipelines"
    tag: "Documentation"
    text: "Learn about Pipeline Visibility"
  - link: "/continuous_integration/guides/ingestion_control"
    tag: "Documentation"
    text: "Learn about Ingestion Controls for CI Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

This guide provides a non-exhaustive list of billing considerations for [CI Visibility][1].

## Counting committers

A committer is an active Git contributor, identified by their Git author email address. For billing purposes, a committer is included if they make at least three commits in a given month.

## Charges for bot or no-reply committers with GitHub.com email addresses

Datadog does not charge for bot or actions made in the GitHub UI. These types of committers are excluded from billing calculations.

## Excluding commits from specific people

Yes, you can exclude commits from specific people by using [exclusion filters][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/pipelines
[2]: /continuous_integration/guides/ingestion_control