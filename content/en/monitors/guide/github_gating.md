---
title: Gating your GitHub Actions Deployments with Datadog Monitors
description: Learn how to use Datadog monitors to perform quality checks prior to deploying your GitHub applications.
aliases:
  - /continuous_integration/guides/github_gating
further_reading:
  - link: "https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/"
    tag: "Blog"
    text: "Monitor your GitHub Actions workflows with Datadog CI Visibility"
  - link: "/integrations/guide/source-code-integration"
    tag: "Documentation"
    text: "Learn about the GitHub integration"
  - link: "https://docs.datadoghq.com/continuous_integration/guides/pull_request_comments/"
    tag: "Documentation"
    text: "Enable test summaries on your GitHub pull requests"
  - link: "https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/"
    tag: "Blog"
    text: "Detect failed quality checks with GitHub Deployment Protection Rules and Datadog"
---

## Overview

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

Datadog is an integration partner for [GitHub Actions Deployment Protection Rules][10], which helps you ensure the delivery of high-quality applications to end customers. You can enforce quality gates on your GitHub Actions deployment workflows using Datadog monitors. 

These features are available for all Datadog customers on GitHub Enterprise Cloud, and they do not require usage of CI Visibility.

## Enable Deployment Protection Rules
In order to rely on Datadog for quality checks on application deployments, you must have the Deployment Protection Rules feature enabled for your application.

### Set up a new GitHub application in Datadog

See [these instructions][1] to create a GitHub application that is automatically connected to Datadog. Remember to check the box for **Deployment Protection Rules**.

{{< img src="ci/github_gates_new_app.png" alt="Datadog GitHub pull request comment preview" style="width:100%;">}}

If you already have a GitHub application set up and connected to Datadog, you can find a link to enable Deployment Protection Rules on the in-app [GitHub integration tile][2].

{{< img src="ci/github_gates_existing_app.png" alt="Datadog GitHub pull request comment preview" style="width:100%;">}}

### Configure Deployment Protection Rules in GitHub
1. Enable read and write permissions for Deployments.
2. Enable read permissions for Actions.
3. Under **Subscribe to events** in an application, click the checkbox for **Deployment protection rule**.
4. In a repository, click **Settings**. Under the **Code and Automation** section, click **Environments**. Under **Deployment Protection Rules**, enable the GitHub application that is linked with the Datadog integration. 

## Create monitors to gate your deployments

Follow [these instructions][3] to create and configure a Datadog monitor to be used for GitHub Actions deployment gating. 

You can use multiple separate monitors for quality checks, but Datadog recommends using [composite monitors][4] because they allow you to gate deployments based on two or more signals with one monitor. For more information, see [Monitor Types][5]. 

Any monitors you plan to use for quality gating must be tagged properly with the following tags:
- `git_env` 
- `git_repo` 

The `git_repo` tag must contain the repository owner name in the format `<OWNER>/<REPO>`, such as `Datadog/my-repo`.

When you run a workflow, GitHub Actions send a request to your Datadog monitor. Based on one of the evaluation results of the monitor listed below, Datadog sends a comment back to GitHub, which can be seen in GitHub under the **Comment** section for the associated event and environment within your workflow run.
- If all monitors associated with your deployment (through environment and repo tags) are in the `OK` state, Datadog approves the deployment.
- If any monitor associated with your deployment is not in `OK` state (in `ALERT`, `WARN`, or `NODATA`), Datadog rejects the deployment.

## Example quality checks
### Application performance
To ensure that your application’s error rate and/or average latency are below certain thresholds prior to deployment, you can use [APM monitors][7].  

### Environment infrastructure health
To check your application or service’s CPU and/or memory usage prior to deployment, use [integration][8] and [metric monitors][9].

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /integrations/github/
[3]: /monitors/configuration/?tab=thresholdalert
[4]: /monitors/types/composite/ 
[5]: /monitors/types/
[6]: /monitors/settings/
[7]: /monitors/types/apm/?tab=apmmetrics
[8]: /monitors/types/integration/?tab=checkalert 
[9]: /monitors/types/metric/?tab=threshold
[10]: https://github.blog/2023-04-20-announcing-github-actions-deployment-protection-rules-now-in-public-beta/
