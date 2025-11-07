---
title: Use CI jobs failure analysis to identify root causes in failed jobs
description: Learn how to use CI jobs failure analysis to identify the most common root causes of failure in CI pipelines.
further_reading:
    - link: "/continuous_integration/search/#pipeline-details-and-executions"
      tag: "Documentation"
      text: "Learn how to search and manage your pipeline executions"
    - link: "/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path"
      tag: "Documentation"
      text: "Identify CI Jobs on the Critical Path to Reduce the Pipeline Duration"
---

## Overview

This guide explains how to use CI jobs failure analysis to determine the most common root cause of failed CI jobs. This can help improve the user experience with CI pipelines.

### Understanding CI jobs failure analysis

CI Visibility uses an LLM model to generate enhanced error messages and categorize them with a domain and subdomain, based on the relevant logs collected from every failed CI job.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors.png" alt="Failed CI jobs with LLM-generated errors" width="90%">}}

#### How does CI Visibility identify the relevant logs of a CI job?

CI Visibility considers that a log line is relevant when it has not appeared in the logs collected from the previous successful executions of that CI job. Log relevancy is only computed for logs coming from failed CI jobs.

You can check if a log line has been considered as relevant by using the `@relevant:true` tag in the Log Explorer.

#### What information does the LLM model use as input?

If a failed CI job has relevant logs, the LLM model uses the last 100 relevant log lines as input. If a failed CI job does not have relevant logs, CI Visibility sends the last 100 log lines.

Each log line is pre-scanned to redact any potentially sensitive information before being used.

<div class="alert alert-info">
The LLM model can classify errors with similar messages into distinct yet related subdomains. For example, if the error message is <code>Cannot connect to docker daemon</code>, it is usually categorized under <code>domain:platform</code> and <code>subdomain:network</code>. However, the LLM model may sometimes classify it under <code>subdomain:infrastructure</code> instead.
</div>

#### Domains and Subdomains

Errors are categorized with a domain and subdomain:

##### Domains

| Domain   | Description                                                                                                                                                       |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`     | Failures caused by the code being built and tested in the CI pipeline. They should be fixed by the developer that modified the code.           |
| `platform` | Failures caused by reasons external to the code being built and tested. These failures can come from the CI provider, the underlying infrastructure, or external dependencies. They are not related to the developer code changes and should often be fixed by the team owning the whole CI system. |
| `unknown`  | Used when the logs do not reveal a clear root cause of job failure.                                                                                                |

##### Subdomains

Click on a domain tab to see the correspondent subdomains:

{{< tabs >}}
{{% tab "Code" %}}

| Subdomain | Cause                                     | Examples                                                                                                                   |
|-----------|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `build`     | Compilation or build errors. | `Compilation error in processor_test.go:28:50`                                                                             |
| `test`      | Test failures.              | `7 failed tests. Error: Can't find http.request.headers.x-amzn-trace-id in span's meta.`                                   |
| `quality`   | Format or linting failures.     | `Detected differences in files after running 'go fmt'. To fix, run 'go fmt' on the affected files and commit the changes.` |
| `security`  | Security violations.         | `Security violation: Use of weak SHA1 hash for security. Consider usedforsecurity=False.`                                  |

{{% /tab %}}
{{% tab "Platform" %}}

| Subdomain      | Cause                                                                                         | Examples                                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `assembly`       | Errors in artifacts generation or assembly errors during a script execution. | `Artifact generation failed due to rejected file 'domains/backend/cart-shopping-proto/mod.info' that exists in the repository.`                       |
| `deployment`     | Errors during deployments, or related to deployments configurations.             | `Subprocess command returned non-zero exit status 1 during deployment config generation.`                                                             |
| `infrastructure` | Errors related to the infrastructure on which the job was executed.                 | `Invalid docker image reference format for tag 'registry.gitlab.com/cart-shopping/infrastructure/backend-deploy-image:AE/create-kubectl-image'.`      |
| `network`        | Errors on connectivity with other dependencies.                                  | `Connection refused when accessing localhost:8080.`                                                                                                   |
| `credentials`    | Errors on authentication; missing or wrong credentials.                          | `Failed to get image auth for docker.elastic.co. No credentials found. Unable to pull image 'docker.elastic.co/elasticsearch/elasticsearch:7.17.24'.` |
| `dependencies`   | Errors on installing or updating dependencies required to execute the job.       | `Package 'systemd-container' cannot be installed. Depends on 'libsystemd-shared' v255.4-1ubuntu8.4 but v255.4-1ubuntu8.5 is to be installed.`         |
| `git`            | Errors executing git commands.                                                   | `Automatic merge failed due to conflicts between branches 'cart-shopping-new-feature' and 'staging'.`                                                 |
| `checks`         | Errors on required fulfillment of checks during the CI job execution.            | `Release note not found during changelog validation`                                                                                                  |
| `setup`          | Errors on setting up the CI job.                                                 | `Execution failed during the TLS setup or client dialing process.`                                                                                    |
| `script`         | Syntactic errors in the script in the CI job.                                    | `No tests ran due to file or directory not found.`                                                                                                    |

{{% /tab %}}
{{% tab "Unknown" %}}

| Subdomain | Description                     | Example                                                 |
|-----------|---------------------------------|---------------------------------------------------------|
| unknown   | Error could not be categorized. | `Job failed with exit code 1. View full logs or trace.` |

{{% /tab %}}
{{< /tabs >}}

### Supported CI providers

CI jobs failure analysis is available for the following CI providers:

* [GitHub Actions][1]
* [GitLab][2]

**Note:** You must enable CI job logs collection, and the logs need to be indexed. To set up CI job logs collection, select your CI provider on [Pipeline Visibility][6] and follow the instructions to collect job logs.

<div class="alert alert-info">If you are interested in CI jobs failure analysis but your CI provider is not supported yet, fill out <a href="https://forms.gle/vSrqS5QwitgHf9wG6" target="_blank">this form</a>.</div>

## Identify the most recurrent errors in your CI pipelines

### Using the CI Health page

[CI Health][3] provides a high-level overview of the health and performance of your CI pipelines. It helps DevOps and engineering teams monitor CI jobs, detect failures, and optimize build performance.

On this page, you can see a breakdown of the errors in your CI pipelines split by error domain. Click on a CI pipeline, and check the `Breakdown` column in the `Failed Executions` section.

{{< img src="continuous_integration/ci_health_failed_executions_breakdown.png" alt="CI Job Failure analysis breakdown in CI Health" width="90%">}}

### Using facets

Use the facets `@error.message`, `@error.domain`, and `@error.subdomain` to identify the most recurrent errors in your CI pipelines. Using those facets, you can create custom dashboards and notebooks.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors_facets.png" alt="Failed CI Jobs filtered by error.domain and error.subdomain" width="90%">}}

These facets are only available when using the `ci_level:job` in a query. If the CI jobs failures analysis can't be computed (for example, if you are not using a supported CI provider), these facets will contain the error information coming from the CI provider.

### Using the dashboard template

You can import the **CI Visibility - CI Jobs Failure Analysis** dashboard template:

1. Open the [civisibility-ci-jobs-failure-analysis-dashboard.json][4] dashboard template and copy the contents into the clipboard.
2. Create a [New Dashboard][5] in Datadog.
3. Paste the copied content into the new dashboard.
4. Save the dashboard.

{{< img src="continuous_integration/ci_jobs_failure_analysis_dashboard.png" alt="CI jobs failure analysis dashboard" width="90%">}}

### Using PR comments

You can add jobs failure analysis in your PR comments.

For PR Comments to be posted, your repositories need to be integrated with Datadog. To learn more about integrating repositories with Datadog, review how to [Connect your Git repositories to Datadog][7] documentation.

{{< img src="continuous_integration/pr_comment.png" alt="PR comment with included jobs failure analysis" width="90%">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]:/continuous_integration/pipelines/github/
[2]:/continuous_integration/pipelines/gitlab/
[3]:https://app.datadoghq.com/ci/pipelines/health/
[4]:/resources/json/civisibility-ci-jobs-failure-analysis-dashboard.json
[5]:/dashboards/
[6]:/continuous_integration/pipelines/#setup
[7]:/integrations/guide/source-code-integration/#connect-your-git-repositories-to-datadog
