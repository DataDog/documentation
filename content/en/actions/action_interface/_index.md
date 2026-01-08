---
title: Action Interface
description: AI chat interface for configuring and executing actions from the Action Catalog using natural language prompts.
---

{{< callout url="https://www.datadoghq.com/product-preview/action-interface/" btn_hidden="false" header="Join the Preview!" >}}
Action Interface is in Preview. 	Click <b>Request Access</b> and fill in the Datadog Product Preview Program form.
{{< /callout >}}

Actions Interface is an AI chat interface where you can configure and execute actions from the [Action Catalog][1] using prompts. For example, `I want to update an ECS service to scale capacity` or `I want to create a service to run tasks`. 

{{< img src="/service_management/action_interface/action_interface_landing.png" alt="Action Interface home page" style="width:100%;" >}}
 
Actions Interface guides you through the necessary steps, asking for any additional inputs, such as authentication details through [Connections][2], before confirming and executing the action. Users receive real-time status on these executions, including completion notifications, next steps, and errors. The entire process is handled through an intuitive conversation. 

## Action Interface in the Actions suite

While App Builder provides self-service apps and Workflow Automation builds end-to-end processes, Action Interface eliminates the need to navigate through the UI or orchestrations of these products to run actions. Action Interface is designed for quick interactions with your data and systems, and is approachable for all users.

## Action Interface uses Bits AI

Bits AI is a Datadog platform-wide AI agent that helps you interact with your applications and infrastructure. You can query Bits AI in the Datadog web app, the Datadog mobile app, and in Slack.

Action Interface uses Bits AI to respond to your prompts and interact with actions.

For more information, see [Bits AI][3].

## Action Interface is stateless

- Action Interface chats are not saved.
- Actions triggered by Action Interface are run once and not saved, but actions are recorded in Datadog [Audit Trail][4]. 

## Prerequisites

Actions run in Action Interface require standard [Action credentials][5], either through [Integration tiles][7] or [Connections][2]:

- Some actions run in Action Interface require both a Connection and [Connection credentials][6]. 
  - Connections ensure a user can't trigger an action unless the user has access to a Connection with the required credentials.
- Other actions are set up using Integration tiles (for example, PagerDuty).
  - Integration tiles are configured with the appropriate roles and permissions in your Datadog organization.

## Action Interface example

You can perform an action using the Action Interface. Let's look at an example where you check the status of an ECS cluster.

1. Go to the [Action Interface][8].  
  {{< img src="/service_management/action_interface/action_interface_landing.png" alt="Action Interface home page" >}}
2. Enter the prompt, `List ECS clusters`, and press <span class="ui">Enter</span>.
  Bits AI responds a request for the AWS region.
3. Enter a region.
    Bits AI responds with something like, `Here's a Datadog Action to address your request. Review and click 'Execute Action' to proceed.`
4. Click the <span class="ui">List ECS cluster</span> action.
5. In the action, in <span class="ui">Connection</span>, select the connection to the AWS account you want to use. Connections are set up in [Action Catalog][1].
  Bits AI will continue to use the same connection for the duration of the chat session.
6. In <span class="ui">Region</span>, select the AWS region where the clusters are hosted.
7. In <span class="ui">Limit</span>, enter `5`.
8. Click <span class="ui">Run</span>.
  Bits AI runs the action. In this example, it responds with a list of the custer names and ARNs.
  
  Bits AI also suggests additional prompts related to the clusters it retrieved.

## Troubleshooting

You can rely on the Action Interface to inform you if your action is not configured correctly or if your inputs are over the [action limits][9].

[1]: /actions/actions_catalog/
[2]: /actions/connections/?tab=workflowautomation
[3]: /bits_ai/
[4]: /account_management/audit_trail/
[5]: /actions/workflows/access_and_auth/#action-credentials
[6]: /actions/connections/#connection-credentials
[7]: /getting_started/integrations/#permissions
[8]: https://app.datadoghq.com/actions/ai
[9]: /actions/workflows/limits/