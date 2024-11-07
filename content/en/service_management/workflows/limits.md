---
title: Limits
description: Rate Limits for Workflow Automation
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
disable_toc: false
further_reading:
- link: "/service_management/workflows/build"
  tag: "Documentation"
  text: "Build Workflows"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

This page describes rate limits and throttles that apply to Workflow Automation.

## Account-level limits

### Paid accounts

Each organization:

* Can create up to 500 workflows per minute.
* Can execute up to 200 workflows per minute.
* Can execute up to 50 workflows per minute for a source (such as a specific monitor).
* Can buffer up to 500 requests.

When an organization exceeds a threshold, pending execution requests queue up to a maximum of 500 per organization then process according to the previously described limits. For example, if a monitor triggers 500 workflow runs, only 50 are triggered in the first minute. The remaining 450 workflow runs are queued and 50 workflows are triggered every minute until all workflows have been triggered.

### Trial accounts

Each organization:

* Can create up to 20 workflows per minute.
* Can execute up to 50 workflows per 20 minutes.
* Can execute up to 20 workflows per minute for a source (such as a specific monitor).
* Can buffer up to 100 requests.

When an organization exceeds a threshold, pending execution requests queue up to a maximum of 100 per organization then process according to the previously described limits. For example, if a monitor triggers 100 workflow runs, only 50 are triggered in the first 20 minutes. The remaining 50 workflow runs are queued and trigger after 20 minutes pass.

## Workflow-level limits

* A workflow can contain up to 100 steps. If you need more than 100 steps in a workflow, you can use the **Trigger workflow** action to [call a child workflow][2]. Use output parameters to pass the output of a child workflow back to your main workflow.
* A workflow can run for up to 24 hours. Workflows terminate when they attempt to run for longer than 24 hours.
* A workflow can start up to 30 steps per minute. If you exceed this rate, steps are throttled and start at a rate of 30 per minute.
* The sum of all step outputs for a workflow can be up to 150 MB.
* A workflow's output size can be up to 500 KB.

## Action limits

* An action's input can be up to 15 MB.
* An action's output can be up to 15 MB.
* User-supplied JavaScript can be up to 10 KB.
* Each org can execute up to 10,000 send email actions per day. If you exceed this limit, the action fails with an error message.
* The [for loop][1] action can run for up to 2000 iterations. If you need more than 2000 iterations, you can partition your input into sets of 2000 and compute them in parallel.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][9].

[1]: /service_management/workflows/actions/flow_control/#for-loop
[2]: /service_management/workflows/trigger/#trigger-a-workflow-from-a-workflow
[9]: https://datadoghq.slack.com/
