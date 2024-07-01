---
title: Automate Security Workflows with Workflow Automation
further_reading:
  - link: /security/cloud_security_management
    tag: Documentation
    text: Cloud Security Management
  - link: /service_management/workflows/
    tag: Documentation
    text: Workflow Automation
aliases:
  - /security/cloud_security_management/workflows
products:
  - name: CSM Threats
    url: /security/threats/
    icon: cloud-security-management
  - name: CSM Misconfigurations
    url: /security/cloud_security_management/misconfigurations/
    icon: cloud-security-management
  - name: CSM Identity Risks
    url: /security/cloud_security_management/identity_risks/
    icon: cloud-security-management
---

{{< product-availability >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[Datadog Workflow Automation][1] allows you to orchestrate and automate your end-to-end processes by building workflows made up of actions that connect to your infrastructure and tools.

Use Workflow Automation with [Cloud Security Management (CSM)][2] to automate your security-related workflows. For example, you can create workflows that allow you to [block access to a public Amazon S3 bucket via an interactive Slack message](#block-access-to-aws-s3-bucket-via-slack), or [automatically create a Jira issue and assign it to a team](#automatically-create-and-assign-a-jira-issue).

## Understanding how triggers and sources work

Workflow Automation allows you to trigger a workflow manually or automatically from a monitor, security signal, or custom schedule. In the example workflows in this article, the workflows are triggered manually by clicking the **Actions** > **Run Workflow** button on the side panels.

When you trigger a workflow, the source ID of the trigger event must be passed on to the next step in the workflow. In the examples in this article, the trigger events are a new security finding. In both cases, the source IDs are specified in the initial step of the workflow using [source object variables][7].

## Build a workflow

You can build a workflow using a preconfigured flow from an out-of-the-box blueprint, or by creating a custom workflow. For detailed instructions on how to create a workflow, see the [Workflow Automation docs][3].

### Block access to Amazon S3 bucket via Slack

This example creates a remediation workflow that sends an interactive Slack message when a public Amazon S3 bucket is detected. By clicking **Approve** or **Reject**, you can automatically block access to the S3 bucket or decline to take action.

**Note**: To build this workflow, you must configure the [Slack integration][5].

1. On the [Workflow Automation page][4], click **New Workflow**.
1. Enter a name for the workflow and click **Save**.

#### Get security misconfiguration

To retrieve the security misconfiguration and pass it into the workflow, use the **Get security finding** action. The action uses the `{{ Source.securityFinding.id }}` source object variable to retrieve the misconfiguration's details from the [**Get a finding**][8] API endpoint.

1. Click **Add Step** to add the first step to your workflow.
1. Search for the **Get security finding** action and select it to add it as a step on your workflow canvas.
1. Click the step in the workflow canvas to configure it.
1. For **Finding ID**, enter `{{ Source.securityFinding.id }}`.
1. Click **Save** to save your workflow.

#### Add JS function

Next, add the JavaScript Data Transformation Function action to the canvas and configure it to return the region name from the misconfiguration's tags.

1. Click the plus (`+`) icon on the workflow canvas to add another step.
2. Search for the **JS Function** action and select it to add it as a step on your workflow canvas.
3. Click the step in the workflow canvas and paste the following in the script editor:
   {{< code-block lang="javascript" >}}
    // Gets the region info from the misconfiguration tags
    // Use `$` to access Trigger or Steps data.
    // Use `_` to access Lodash.
    // See https://lodash.com/ for reference.

    let tags = $.Steps.Get_security_finding.tags

    let region = tags.filter(t => t.includes('region:'))
    if(region.length == 1){
        return region[0].split(':')[1]
    } else {
        return '';
    }
    {{< /code-block >}}

#### Add Slack action

1. Click the plus (`+`) icon on the workflow canvas to add another step.
2. Search for the **Make a decision** action for Slack and select it to add it as a step on your workflow canvas.
3. Click the step in the workflow canvas and enter the following information:
    - **Workspace**: The name of your Slack workspace.
    - **Channel**: The channel to send the Slack message to.
    - **Prompt text**: The text that appears immediately above the choice buttons in the Slack message, for example, "Would you like to block public access for `{{ Steps.Get_security_finding.resource }}` in region `{{ Steps.GetRegion.data }}`?"

##### Approve workflow

1. Under **Approve** on the workflow canvas, click the plus (`+`) icon to add another step.
2. Search for the **Block Public Access** action for Amazon S3 and select it to add it as a step on your workflow canvas.
3. Click the step in the workflow canvas and enter the following information:
    - **Connection**: The name of the workflow connection for the AWS integration.
    - **Region**: `{{ Steps.GetRegion.data }}`
    - **Bucket name**: `{{ Steps.Get_security_finding.resource }}`
4. Under the **Block public access** step on the workflow canvas, click the plus (`+`) icon to add another step.
5. Search for the **Send message** action for Slack and select it to add it as a step on your workflow canvas.
3. Click the step in the workflow canvas and enter the following information:
    - **Workspace**: The name of your Slack workspace.
    - **Channel**: The channel to send the Slack message to.
    - **Message text**: The text that appears in the Slack message. For example:
    {{< code-block lang="text" >}}
    S3 bucket `{{ Steps.Get_security_finding.resource }}` successfully blocked. AWS API response: 
    ```{{ Steps.Block_public_access }}```

    The issue will be marked as fixed the next time the resource is scanned, which can take up to one hour.
    {{< /code-block >}}

##### Reject workflow

1. Under **Reject** on the workflow canvas, click the plus (`+`) icon to add another step.
2. Search for the **Send message** action for Slack and select it to add it as a step on your workflow canvas.
3. Click the step in the workflow canvas and enter the following information:
    - **Workspace**: The name of your Slack workspace.
    - **Channel**: The channel to send the Slack message to.
    - **Message text**: The text that appears in the Slack message, for example, "User declined the action".
4. Click **Save**.

### Automatically create and assign a Jira issue

This example creates an automated ticket routing workflow that creates and assigns a Jira issue to the appropriate team when a security finding is detected.

**Note**: To build this workflow, you must configure the [Jira integration][6].

1. On the [Workflow Automation page][4], click **New Workflow**.
1. Enter a name for the workflow and click **Save**.

#### Get security finding

To retrieve the finding and pass it into the workflow, use the **Get security finding** action. The action uses the `{{ Source.securityFinding.id }}` source object variable to retrieve the finding's details from the [**Get a finding**][8] API endpoint.

1. Click **Add Step** to add the first step to your workflow.
1. Search for the **Get security finding** action and select it to add it as a step on your workflow canvas.
1. Click the step in the workflow canvas to configure it.
1. For **Security ID**, enter `{{ Source.securityFinding.id }}`.

#### Add Jira action

1. Click the plus (`+`) icon on the workflow canvas to add another step.
2. Search for the **Create issue** Jira action and select it to add it as a step on your workflow canvas.
3. Click the step in the workflow canvas and enter the following information:
    - **Jira account**: The URL of your Jira account.
    - **Project**: `{{ Source.securityFinding.tags_value.team }}`
    - **Summary**: `{{ Source.securityFinding.rule.name }}`
4. Click **Save**.

## Trigger a workflow

You can trigger an existing workflow from the finding, misconfiguration, and resource side panels.

In the side panel, click **Actions** > **Run Workflow**, and select a workflow to run. Depending on the workflow, you may be required to enter additional input parameters, such as incident details and severity, the name of the impacted S3 bucket, or the Slack channel you want to send an alert to.

{{< img src="/security/csm/run_workflow_side_panel.png" alt="The Actions menu on the misconfigurations side panel showing a list of actions to run" width="100%">}}

After running the workflow, additional information is shown on the side panel. You can click the link to view the workflow.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/workflows
[2]: /security/cloud_security_management/
[3]: /service_management/workflows/build/
[4]: https://app.datadoghq.com/workflow
[5]: /integrations/slack/
[6]: /integrations/jira/
[7]: /service_management/workflows/build/#source-object-variables
[8]: /api/latest/security-monitoring/#get-a-finding
