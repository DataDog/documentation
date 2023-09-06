---
title: Automate Security Workflows with Workflow Automation
kind: documentation
---

[Datadog Workflow Automation][1] allows you to orchestrate and automate your end-to-end processes by building workflows made up of actions that connect to your infrastructure and tools. 

When combined with [Cloud Security Management (CSM)][2], it enables you to automate your security-related workflows. For example, you can create workflows that allow you to [block access to a public AWS S3 bucket via an interactive Slack message](#block-access-to-s3-bucket-via-slack), or [automatically create a Jira issue and assign it to a team](#automatically-create-and-assign-a-jira-issue).

## Trigger a workflow

You can trigger an existing workflow from the security issue, misconfiguration, and resource side panels.

In the side panel, click **Actions** > **Run Workflow**, and select a workflow to run. Depending on the workflow, you may be required to enter additional input parameters, such as incident details and severity, the name of the impacted S3 bucket, or the Slack channel you want to send an alert to.

{{< img src="/security/csm/run_workflow_side_panel.png" alt="The Actions menu on the misconfigurations side panel showing a list of actions to run" width="100%">}}

After running the workflow, additional information is shown in the side panel. You can click the link to view the workflow.

## Build a workflow

You can build a workflow using a preconfigured flow from an out-of-the-box blueprint, or by creating a custom workflow. For detailed instructions on how to create a workflow, see the [Workflow Automation docs][3].
### Block access to AWS S3 bucket via Slack

This example creates a remediation workflow that sends an interactive Slack message when a public AWS S3 bucket is detected. By clicking **Approve** or **Reject**, you can automatically block access to the S3 bucket or decline to take action.

**Note**: To build this workflow, you must configure the [Slack integration][5].

1. On the [Workflow Automation page][4], click **New Workflow**.
2. Enter a name for the workflow.
3. Select **Manual** for the trigger and click **Create**.
4. Click **Add a step to get started** to start adding steps to your workflow using the workflow builder. Alternatively, click **Edit JSON Spec** to build the workflow using the JSON editor.

{{< tabs >}}
{{% tab "Workflow builder" %}}

#### Get security finding ID

To retrieve the security ID of the finding, use the **Get security finding** action. This action retrieves the ID using the **Get a finding** endpoint.

To retrieve the security ID of the finding, use the `{{ Source.securityFinding.id }}` source object variable. The 

First, you need your Security ID <- how to get it (it's in the payload of the trigger).

Creating useful workflows sometimes necessitates passing data from one step to another, or configuring steps that act on data from the workflow's trigger source. You can perform this kind of data interpolation with context variables.

Source object variables are passed into the workflow by the triggering event.


To... you must... retrieve the security finding ID using the source object variable.

s are passed into the workflow by the triggering event.

The JSON on the **Output** tab is the same as the public API.

1. Click **Add a step to get started** to add the first step to your workflow.
2. Search for the **Get security finding** action and select it to add it as a step on your workflow canvas.
3. Click the step in the workflow canvas to configure it.
4. For **Finding ID**, enter `{{ Source.securityFinding.id }}`.

#### Add JS function

5. Click the plus (`+`) icon on the workflow canvas to add another step.
6. Search for the **JS Function** action and select it to add it as a step on your workflow canvas.
7. Click the step in the workflow canvas and paste the following in the script editor:
    ```
    // Gets the region info from the finding tags
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
    ```

#### Add Slack action

8. Click the plus (`+`) icon on the workflow canvas to add another step.
9. Search for the **Make a decision** action for Slack and select it to add it as a step on your workflow canvas.
10. Click the step in the workflow canvas and enter the following information:
    - **Workspace**: The name of your Slack workspace.
    - **Channel**: The channel to send the Slack message to.
    - **Prompt text**: The text that will appear immediately above the choice buttons in the Slack message. For example: Would you like to block public access for `{{ Steps.Get_security_finding.resource }}` in region `{{ Steps.GetRegion.data }}`?

{{% /tab %}}
{{% tab "JSON editor" %}}

An example of a workflow to...

```json
{
    "steps": [
        {
            "actionId": "com.datadoghq.slack.send_simple_message",
            "name": "Send_message",
            "parameters": [
                {
                    "name": "teamId",
                    "value": "T024FSN2Y"
                },
                {
                    "name": "channel",
                    "value": "#k9-csm-autoremediation"
                },
                {
                    "name": "text",
                    "value": "S3 bucket `{{ Steps.Get_security_finding.resource }}`  successfully blocked. AWS API response: \n```{{ Steps.Block_public_access }}```\n\nThe issue will be marked as fixed the next time the resource is scanned, which can take up to one hour."
                }
            ]
        },
        {
            "actionId": "com.datadoghq.dd.cloudsecurity.getSecurityFinding",
            "name": "Get_security_finding",
            "outboundEdges": [
                {
                    "branchName": "main",
                    "nextStepName": "GetRegion"
                }
            ],
            "parameters": [
                {
                    "name": "id",
                    "value": "{{ Source.securityFinding.id }}"
                }
            ]
        },
        {
            "actionId": "com.datadoghq.aws.s3.block_public_access",
            "connectionLabel": "INTEGRATION_AWS_1",
            "name": "Block_public_access",
            "outboundEdges": [
                {
                    "branchName": "main",
                    "nextStepName": "Send_message"
                }
            ],
            "parameters": [
                {
                    "name": "region",
                    "value": "{{ Steps.GetRegion.data }}"
                },
                {
                    "name": "bucket",
                    "value": "{{ Steps.Get_security_finding.resource }}"
                }
            ]
        },
        {
            "actionId": "com.datadoghq.datatransformation.func",
            "name": "GetRegion",
            "outboundEdges": [
                {
                    "branchName": "main",
                    "nextStepName": "Make_a_decision"
                }
            ],
            "parameters": [
                {
                    "name": "script",
                    "value": "// Gets the region info from the finding tags\n// Use `$` to access Trigger or Steps data.\n// Use `_` to access Lodash.\n// See https://lodash.com/ for reference.\n\nlet tags = $.Steps.Get_security_finding.tags\n\nlet region = tags.filter(t => t.includes('region:'))\nif(region.length == 1){\n    return region[0].split(':')[1]\n} else {\n    return '';\n}"
                }
            ]
        },
        {
            "actionId": "com.datadoghq.slack.send_interactive_message",
            "name": "Make_a_decision",
            "outboundEdges": [
                {
                    "branchName": "approve",
                    "nextStepName": "Block_public_access"
                },
                {
                    "branchName": "reject",
                    "nextStepName": "Decline"
                }
            ],
            "parameters": [
                {
                    "name": "actionChoices",
                    "value": [
                        {
                            "displayName": ":white_check_mark:  Approve",
                            "outboundBranch": "approve"
                        },
                        {
                            "displayName": ":no_entry_sign:  Reject",
                            "outboundBranch": "reject"
                        }
                    ]
                },
                {
                    "name": "teamId",
                    "value": "T024FSN2Y"
                },
                {
                    "name": "channel",
                    "value": "#k9-csm-autoremediation"
                },
                {
                    "name": "promptText",
                    "value": "Would you like to block public access for `{{ Steps.Get_security_finding.resource }}` in region {{ Steps.GetRegion.data }}?"
                }
            ]
        },
        {
            "actionId": "com.datadoghq.slack.send_simple_message",
            "name": "Decline",
            "parameters": [
                {
                    "name": "teamId",
                    "value": "T024FSN2Y"
                },
                {
                    "name": "channel",
                    "value": "#k9-csm-autoremediation"
                },
                {
                    "name": "text",
                    "value": "User declined the action"
                }
            ]
        }
    ],
    "startStepName": "Get_security_finding",
    "connectionEnvs": [
        {
            "connections": [
                {
                    "connectionId": "f900ed56-8701-4566-932e-3ba4363b481a",
                    "label": "INTEGRATION_AWS_1"
                }
            ],
            "env": "default"
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

### Automatically create and assign a Jira issue

This example creates an automated ticket routing workflow that creates and assigns a Jira issue to the appropriate team when a security issue is detected.

**Note**: To build this workflow, you must configure the [Jira integration][6].

1. On the [Workflow Automation page][4], click **New Workflow**.
2. Enter a name for the workflow.
3. Select **Manual** for the trigger and click **Create**.
4. Click **Add a step to get started** to start adding steps to your workflow using the workflow builder. Alternatively, click **Edit JSON Spec** to build the workflow using the JSON editor.

{{< tabs >}}
{{% tab "Workflow builder" %}}

#### Get security issue

1. Click **Add a step to get started** to add the first step to your workflow.
2. Search for the **Get security issue** action and select it to add it as a step on your workflow canvas.
3. Click the step in the workflow canvas to configure it.
4. For **Security ID**, enter `{{ Source.securityIssue.id }}`.

#### Add JS function

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

#### Add Jira action

8. Click the plus (`+`) icon on the workflow canvas to add another step.
9. Search for the **Create issue Jira** action and select it to add it as a step on your workflow canvas.
10. Click the step in the workflow canvas and enter the following information:
    - **Jira account**: The URL of your Jira account.
    - **Project**: `{{ Steps.GetTeamInfo.data }}`
    - **Summary**: `{{ Steps.Get_security_issue.rule.name }}`
11. Click **Save**.

{{% /tab %}}
{{% tab "JSON editor" %}}

An example of a workflow automatically create and assign a Jira issue:

```json
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
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/workflows
[2]: /security/cloud_security_management/
[3]: /service_management/workflows/build/
[4]: https://app.datadoghq.com/workflow
[5]: /integrations/slack/
[6]: /integrations/jira/