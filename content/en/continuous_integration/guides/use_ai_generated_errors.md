---
title: Use AI-generated errors to identify the root cause of your failed CI Jobs
description: TBD
further_reading:
    - link: "/continuous_integration/search/#pipeline-details-and-executions"
      tag: "Documentation"
      text: "Learn how to search and manage your pipeline executions"
---

## Overview

This guide explains how to use AI-generated errors to help you determine which are the most common root causes of your failed jobs in order to improve the UX in the CI pipelines.

### Understanding how AI-generated errors are created

CI Visibility leverages OpenAI to generate enhanced error messages and categorize errors by domain and subdomain, based on the relevant logs collected from every failed CI job.

#### How relevant logs are computed?

CI Visibility considers that a log line as "relevant" when that log line has not appeared in the logs collected from the successful jobs of that particular CI Pipeline before. Log relevancy is only computed for failed CI Jobs.

You can check if a log line has been considered as relevant by using the `@relevant:true` tag in the Logs explorer.

#### What information is sent to OpenAI?

If a failed job has relevant logs, CI Visibility sends the last 100 relevant log lines to OpenAI. In case that a failed job oes not have relevant logs, CI Visibility will send the last 100 log lines.

Notice that OpenAI does not store any logs, and each log line is pre-scanned to redact any potentially sensitive information before being sent.

### Supported CI providers

* [GitHub Actions][]
* [GitLab][]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}