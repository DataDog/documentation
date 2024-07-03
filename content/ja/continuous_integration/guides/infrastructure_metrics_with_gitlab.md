---
description: Learn how to correlate infrastructure metrics with your GitLab Autoscale
  job executions.
further_reading:
- link: /continuous_integration/pipelines/gitlab
  tag: Documentation
  text: Set up CI Visibility on a GitLab pipeline
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: Documentation
  text: Learn how to search and manage your pipeline executions
title: Correlate Infrastructure Metrics with GitLab Jobs in Datadog
---

## 概要

When you click on a GitLab job in the [CI Visibility Explorer][9], you can access an **Infrastructure** tab with information about the host displaying information about the host, system, host tags, host metrics, and more. 

{{< img src="continuous_integration/infrastructure_tab.png" alt="The Infrastructure tab displaying information about a host and its system, along with host metrics such as CPU usage and load averages." style="width:100%;">}}

This guide explains how to correlate infrastructure metrics with your GitLab jobs if you are using GitLab “Instance” or “Docker Autoscaler” executors and [CI Visibility][1]. 

## 前提条件

The Datadog Agent must be installed in the virtual machines (VM) where the GitLab jobs will be run. This is not where the [GitLab instance][2] or the [Docker Autoscaler][3] executor is running, but in the VMs that are created with the fleeting plugin.

## Ensure that the Datadog Agent is installed in your instances

If you are using an [AWS Autoscaling Group][4], you should make sure that the machine image that is configured in the template launches with the [Datadog Agent][5]. 

To test that you have performed this step successfully, you can try executing a job and you should see the host appear on the [Infrastructure List page][6].

If you are using AWS, make sure that the host name is in the format `“i-xxxxx”`. If this is not the case, you should check that your instance is compatible with IMDSv1. For more information, see the [official AWS documentation][7]. 

You can set this up inside the template of your AWS Autoscaling Group. The Datadog Agent uses the metadata service endpoint to resolve the host name.

## Set up CI Visibility and log collection for your GitLab jobs

For instructions on setting up CI Visibility for your GitLab jobs, see [Set up Pipeline Visibility on a GitLab Pipeline][1]. 

To test that you have performed the setup successfully, you can try running a GitLab pipeline and checking if it appears on the [**Executions** page][8].

You are required to enable the collection of job logs. You can check if Datadog is receiving the logs correctly by clicking on the Logs tab of your pipeline execution.

After you have completed these steps, your GitLab jobs should be correlated with infrastructure metrics. The correlation is per job and not pipeline, as different jobs may run on different hosts. The **Infrastructure** tab appears after the job is finished and Datadog receives the logs for that job. 

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/pipelines/gitlab
[2]: https://docs.gitlab.com/runner/executors/instance.html
[3]: https://docs.gitlab.com/runner/executors/docker_autoscaler.html
[4]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html
[5]: /ja/agent/
[6]: https://app.datadoghq.com/infrastructure
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: /ja/continuous_integration/explorer/?tab=pipelineexecutions