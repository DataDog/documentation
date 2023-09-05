---
title: Automate Security Workflows with Workflow Automation
kind: documentation
---

[Datadog Workflow Automation][1] allows you to orchestrate and automate your end-to-end processes by building workflows made up of actions that connect to your infrastructure and tools. 

When combined with [Cloud Security Management (CSM)][2], it enables you to automate your security-related workflows. For example, you can create workflows that allow you to [block access to an AWS S3 bucket via an interactive Slack message](#block-access-to-s3-bucket-via-slack), or [automatically create a Jira issue and assign it to a team](#automatically-create-and-assign-a-jira-issue).

## Trigger a workflow

### Manual

You can trigger an existing workflow from the security issue, misconfiguration, and resource side panels.

In the side panel, click **Actions** > **Run Workflow**, and select a workflow to run. Depending on the workflow, you may be required to enter additional input parameters, such as incident details and severity, the name of the impacted S3 bucket, or the Slack channel you want to send an alert to.

{{< img src="/security/csm/run_workflow_side_panel.png" alt="The Actions menu on the misconfigurations side panel showing a list of actions to run" width="100%">}}

After running the workflow, additional information is shown in the side panel. You can click the link to view the workflow.

### Automated

## Build a workflow

can be complicated...

building a workflow from a blueprint or by creating a custom workflow.

For detailed instructions on how to create a workflow, see the [Workflow Automation docs][3].

### Block access to S3 bucket via Slack

### Automatically create and assign a Jira issue

1. On the [Workflow Automation page][4], click **New Workflow**.
2. Enter a name for the workflow.
3. Select **Manual** for the trigger and click **Create**.
4. Click **Add a step to get started** to start adding steps to your workflow. Alternatively, click **Edit JSON Spec** if you want to build a workflow using the JSON editor.

#### Workflow builder

1. Click **Add a step to get started** to add the first step to your workflow.
2. Search for the **Get security issue** action and select it to add it as a step on your workflow canvas.
3. Click the step in the workflow canvas to configure it.
4. For **Security ID**, enter `{{ Source.securityIssue.id }}`.
5. Click the plus (`+`) icon on the workflow canvas to add another step.
6. Search for the **JS Function** action and select it to add it as a step on your workflow canvas.
7. Click the step in the workflow canvas and paste the following in the script editor:
    ```
    // Gets the team info from the finding tags 
    // Use `$` to access Trigger or Steps data.
    // Use `_` to access Lodash.
    // See https://lodash.com/ for reference.

    let tags = $.Steps.Get_security_finding.tags

    let team = tags.filter(t => t.includes('team:'))
    if(region.length == 1){
        return team[0].split(':')[1]
    } else {
        return '';
    }
    ```
8. Click the plus (`+`) icon on the workflow canvas to add another step.
9. Search for the **Create issue Jira** action and select it to add it as a step on your workflow canvas.
10. Click the step in the workflow canvas and enter the following information:
    - **Jira account**: The URL of your Jira account.
    - **Project**: `{{ Steps.GetTeamInfo.data }}`
    - **Summary**: `{{ Steps.Get_security_issue.rule.name }}`
11. Click **Save**.

#### JSON editor

An example of a workflow automatically create and assign a Jira issue:

{{< code-block lang="json" collapsible="true" filename="Example workflow" >}}
{
    "steps": [
        {
            "actionId": "com.datadoghq.dd.cloudsecurity.getSecurityIssue",
            "name": "Get_security_issue",
            "outboundEdges": [
                {
                    "branchName": "main",
                    "nextStepName": "GetTeamInfo"
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "value": "{{ Source.securityIssue.id }}"
                }
            ]
        },
        {
            "actionId": "PLACEHOLDER",
            "name": "GetTeamInfo",
            "outboundEdges": [
                {
                    "branchName": "main",
                    "nextStepName": "Create_issue"
                }
            ],
            "parameters": [
                {
                    "name": "script",
                    "value": "// Gets the team info from the finding tags\n// Use `$` to access Trigger or Steps data.\n// Use `_` to access Lodash.\n// See https://lodash.com/ for reference.\n\nlet tags = $.Steps.Get_security_finding.tags\n\nlet team = tags.filter(t => t.includes('team:'))\nif(region.length == 1){\n    return team[0].split(':')[1]\n} else {\n    return '';\n}"
                }
            ]
        },
        {
            "actionId": "com.datadoghq.jira.create_issue",
            "name": "Create_issue",
            "parameters": [
                {
                    "name": "accountId",
                    "value": "PLACEHOLDER"
                },
                {
                    "name": "projectKey",
                    "value": "{{ Steps.GetTeamInfo.data }}"
                },
                {
                    "name": "summary",
                    "value": "{{ Steps.Get_security_issue.rule.name }}"
                }
            ]
        }
    ],
    "startStepName": "Get_security_issue"
}
{{< /code-block >}}

[1]: /service_management/workflows
[2]: /security/cloud_security_management/
[3]: /service_management/workflows/build/
[4]: https://app.datadoghq.com/workflow