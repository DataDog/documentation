---
title: Access Bits Chat
description: "Open Bits Chat from the Datadog web application, mobile app, or Slack."
further_reading:
- link: "/bits_ai/bits_chat/"
  tag: "Documentation"
  text: "Bits Chat"
- link: "/bits_ai/bits_code/slack_code_channels/"
  tag: "Documentation"
  text: "Code channels with Bits Code"
---

## Permissions

### Access to Bits Chat

To use Bits Chat, your role must have the **Bits Chat Access** permission. This permission is enabled by default for all three standard Datadog roles: Datadog Admin, Datadog Standard, and Datadog Read Only.

To manage this permission for custom roles, go to **Organization Settings** > **Roles**, select a role, and toggle **Bits Chat Access** under **General Permissions**.

### Data access through Bits Chat

Bits Chat uses your Datadog role to fetch data, so it can only access the resources you have permission to view or modify. For example, if your role restricts access to a specific set of logs indexes, Bits Chat can only query logs from those indexes. Similarly, if you do not have permission to edit a dashboard, Bits Chat cannot edit that dashboard on your behalf.

## Web application
There are multiple ways to open Bits Chat in the Datadog web application:
- Go to [Bits Chat][1].
- In the top-right of the navigation bar, click {{< ui >}}Ask Bits{{< /ui >}}.
- In a Datadog product integrated with Bits Chat, click {{< ui >}}Ask Bits{{< /ui >}} or {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (the twinkling stars icon).
- Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.
- In the left-side navigation panel, click {{< ui >}}Bits AI{{< /ui >}}.

{{< img src="bits_ai/getting_started/bits_assistant_side_panel.png" alt="Bits Chat panel open alongside the Dashboards list" style="width:40%;">}}

## Mobile application

Ask Bits questions about your system or active incident. Bits has context on Datadog public documentation, telemetry, and ownership.

1. [Download the mobile app and log in][2].
2. On the home screen, tap {{< ui >}}Bits Chat{{< /ui >}}.
3. Start chatting with Bits Chat by voice or text.
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="View of the Mobile App Home dashboard with Bits AI" style="width:40%;" >}}

## Slack
Ask Bits questions, declare incidents, trigger investigations, or make code changes. Bits Chat replies in the message thread so your team can keep the question, context, and answer in one place.

1. Select your Slack workspace in [Bits Chat Settings][3].
2. Click **Connect Slack account** to grant Datadog permission to recognize you across both products.
3. (Optional) Click **Grant permissions** to your workspace so that Bits chat can read relevant slack conversations.

After setup is complete, you can send queries to `@Datadog` in natural language to channels in your workspace with the Datadog App. 

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Output of an example service-dependency query in Slack" style="width:60%;">}}

### Code channels with Bits Code

Ask Bits Chat to make a code change, and it creates a dedicated [code channel][4] for the task. In the code channel, [Bits Code][5] works on the change alongside you and your team.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ask
[2]: /mobile/#installing
[3]: https://app.datadoghq.com/ask/settings
[4]: /bits_ai/bits_code/slack_code_channels/
[5]: /bits_ai/bits_code/
