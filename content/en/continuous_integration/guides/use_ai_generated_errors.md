---
title: Use AI-generated errors to identify the root cause of your failed CI Jobs
description: TBD
further_reading:
    - link: "/continuous_integration/search/#pipeline-details-and-executions"
      tag: "Documentation"
      text: "Learn how to search and manage your pipeline executions"
    - link: "/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path"
      tag: "Documentation"
      text: "Identify CI Jobs on the Critical Path to Reduce the Pipeline Duration"
---

## Overview

This guide explains how to use AI-generated errors to help you determine which are the most common root causes of your failed jobs in order to improve the UX in the CI pipelines.

### Understanding AI-generated errors

CI Visibility leverages OpenAI to generate enhanced error messages and categorize errors by domain and subdomain, based on the relevant logs collected from every failed CI job.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors.png" alt="Failed CI jobs with AI-generated errors" width="90%">}}

#### Domains and Subdomains of AI-generated errors

Errors are categorized with a domain and subdomain using AI.

##### Domains

| Domain   | Description                                                                                                                                                       |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| code     | Failures caused by the code that is being built and tested in the CI pipeline, and they should be fixed by the developer that launched the CI pipeline.           |
| platform | Failures caused by the code that is being built and tested. These failures can come from the CI provider itself or they could be caused by external dependencies. |
| unknown  | Used when the logs do not reveal a clear root cause of job failure                                                                                                |

##### Subdomains

Click on a domain tab to see the correspondent subdomains:

{{< tabs >}}
{{% tab "code" %}}

Failures that are caused by the code that is being built and tested in the CI pipeline, and they should be fixed by the developer that launched the CI pipeline.

| Subdomain | Description                                     | Examples                                                                                                                   |
|-----------|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| build     | Failures caused by compilation or build errors. | `Compilation error in processor_test.go:28:50`                                                                             |
| test      | Failures caused by tests failures.              | `7 failed tests. Error: Can't find http.request.headers.x-amzn-trace-id in span's meta.`                                   |
| quality   | Failures caused by format or lint failures.     | `Detected differences in files after running 'go fmt'. To fix, run 'go fmt' on the affected files and commit the changes.` |
| security  | Failures caused by security violations.         | `Security violation: Use of weak SHA1 hash for security. Consider usedforsecurity=False.`                                  |

{{% /tab %}}
{{% tab "platform" %}}

Failures that are not cause by the code that is being built and tested. These failures can come from the CI provider itself or they could be caused by external dependencies.

| Subdomain      | Description                                                                                         | Examples                                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| assembly       | Failures caused by errors in the artifacts generation or assembly errors during a script execution. | `Artifact generation failed due to rejected file 'domains/backend/cart-shopping-proto/mod.info' that exists in the repository.`                       |
| deployment     | Failures caused by errors during deployments, or related to deployments configurations.             | `Subprocess command returned non-zero exit status 1 during deployment config generation.`                                                             |
| infrastructure | Failures caused by errors related to the infrastructure where the job was executed.                 | `Invalid docker image reference format for tag 'registry.gitlab.com/cart-shopping/infrastructure/backend-deploy-image:AE/create-kubectl-image'.`      |
| network        | Failures caused by errors on connectivity with other dependencies.                                  | `Connection refused when accessing localhost:8080.`                                                                                                   |
| credentials    | Failures caused by errors on authentication, missing or wrong credentials.                          | `Failed to get image auth for docker.elastic.co. No credentials found. Unable to pull image 'docker.elastic.co/elasticsearch/elasticsearch:7.17.24'.` |
| dependencies   | Failures caused by errors on installing or updating dependencies required to execute the job.       | `Package 'systemd-container' cannot be installed. Depends on 'libsystemd-shared' v255.4-1ubuntu8.4 but v255.4-1ubuntu8.5 is to be installed.`         |
| git            | Failures caused by errors executing git commands.                                                   | `Automatic merge failed due to conflicts between branches 'cart-shopping-new-feature' and 'staging'.`                                                 |
| checks         | Failures caused by errors on required fulfillment of checks during the CI Job execution.            | `Release note not found during changelog validation`                                                                                                  |
| setup          | Failures caused by errors on setting up the CI Job.                                                 | `Execution failed during the TLS setup or client dialing process.`                                                                                    |
| script         | Failures caused by syntactic errors in the script in the CI Job.                                    | `No tests ran due to file or directory not found.`                                                                                                    |

{{% /tab %}}
{{% tab "unknown" %}}

| Subdomain | Description                     | Example                                                 |
|-----------|---------------------------------|---------------------------------------------------------|
| unknown   | Error could not be categorized. | `Job failed with exit code 1. View full logs or trace.` |

{{% /tab %}}
{{< /tabs >}}

### Supported CI providers

* [GitHub Actions][1]
* [GitLab][2]

<div class="alert alert-info">If you are interested in AI-generated errors but your CI provider is not supported yet, fill out <a href="TBD" target="_blank">this form</a>.</div>

## Identify the most recurrent errors in your CI pipelines

### Using facets

You can use the facets `@error.message`, `@error.domain`, and `@error.subdomain` to identify the most recurrent errors in your CI pipelines. Using those facets, you can create custom dashboards and notebooks for your needs.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors_facets.png" alt="Failed CI Jobs filtered by error.domain and error.subdomain" width="90%">}}

Notice that these facets are only available using the `ci_level:job` in your queries. In case that AI-generated errors cannot be computed (e.g., you are not using a supported CI provider), these facets will contain the error information coming from the CI provider.

### Using the dashboard template

TBD

## How AI-generated errors are created?

CI Visibility use the relevant logs of every failed CI job to generate improved errors using OpenAI.

### How relevant logs are computed?

CI Visibility considers that a log line as relevant when that log line has not appeared in the logs collected from the successful jobs executions of that CI Job before. Log relevancy is only computed for failed CI Jobs.

You can check if a log line has been considered as relevant by using the `@relevant:true` tag in the Logs explorer.

### What information is sent to OpenAI?

If a failed job has relevant logs, CI Visibility sends the last 100 relevant log lines to OpenAI. In case that a failed job oes not have relevant logs, CI Visibility will send the last 100 log lines.

OpenAI does not store any logs, and each log line is pre-scanned to redact any potentially sensitive information before being sent.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]:/continuous_integration/pipelines/github/
[2]:/continuous_integration/pipelines/gitlab/