---
title: Use Bits Chat
description: "Open Bits Chat from the Datadog web application, mobile app, Slack, or Microsoft Teams."
further_reading:
- link: "/bits_ai/bits_chat/"
  tag: "Documentation"
  text: "Bits Chat"
- link: "/bits_ai/bits_code/slack_code_channels/"
  tag: "Documentation"
  text: "Code channels with Bits Code"
- link: "/integrations/microsoft-teams/"
  tag: "Documentation"
  text: "Microsoft Teams integration"
---

Bits Chat has context on Datadog public documentation, telemetry, and ownership. Use Bits Chat to ask questions about your system or active incident. Bits Chat is available in the Datadog web application, the mobile app, Slack, and Microsoft Teams.

## Web application
There are multiple ways to open Bits Chat in the Datadog web application:
- Go directly to [Bits Chat][1].
- In the top-right of the navigation bar, click {{< ui >}}Ask Bits{{< /ui >}}.
- In a Datadog product integrated with Bits Chat, click the AI trigger button (for example, {{< ui >}}Ask Bits{{< /ui >}}) or {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px" alt="">}} (the twinkling stars icon).
- Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.
- In the left-side navigation panel, click {{< ui >}}Bits AI{{< /ui >}}, then select {{< ui >}}Bits Chat{{< /ui >}}.

## Mobile application

Ask Bits questions about your system or active incident from the [Mobile App][2]. 

1. On the home screen, tap {{< ui >}}Bits Chat{{< /ui >}}.
1. Start chatting with Bits Chat by voice or text.
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

## Microsoft Teams (Preview)

<div class="alert alert-info">Bits Chat in Microsoft Teams is in Preview.</div>

Ask Bits questions about your system or active incident from a Microsoft Teams channel. Bits Chat replies in the channel thread so your team can keep the question, context, and answer in one place.

1. [Install the Microsoft Teams integration][6] and connect your Microsoft tenant to Datadog.
2. Add the Datadog app to the team where you want to use Bits Chat.
3. [Connect your Microsoft Teams account to your Datadog account][7]. If you mention `@Datadog` before you connect your account, the Datadog app prompts you to connect it.
4. (Optional) To let Bits Chat read earlier messages in a thread for context, a Microsoft Teams administrator must [grant tenant-wide admin consent][8] to Datadog. Without admin consent, Bits Chat uses only the message that mentions it.

Your Datadog role must have the **Bits Chat Access** permission. See [Permissions][9].

### Using Bits Chat in Microsoft Teams

In a channel where the Datadog app is installed, mention `@Datadog` followed by your question in natural language. To ask a follow-up, reply in the same thread and mention `@Datadog` again.

- If your Microsoft tenant is connected to more than one Datadog organization, Bits Chat asks which organization to use. When you reply to a Datadog notification, such as a monitor alert, Bits Chat uses the organization that sent it.
- When Bits Chat needs to take an action that requires approval, it posts an approval card in the thread. Only the user who asked the question can approve or deny the action.
- `@Datadog` commands, such as `@Datadog incident`, work alongside Bits Chat.

### Bits Chat limitations in Microsoft Teams

- Bits Chat responds only in Microsoft Teams channels. It does not respond in personal chats or group chats.
- Bits Chat in Microsoft Teams cannot start or steer [Bits Investigations][10]. To start an investigation, use the Datadog web application, the mobile app, the API, or a monitor. To receive investigation findings in Microsoft Teams, [send monitor notifications to a Microsoft Teams channel][11].
- [Code channels with Bits Code](#code-channels-with-bits-code) are not supported.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ask
[2]: /mobile/#installing
[3]: https://app.datadoghq.com/ask/settings
[4]: /bits_ai/bits_code/slack_code_channels/
[5]: /bits_ai/bits_code/
[6]: /integrations/microsoft-teams/
[7]: /integrations/microsoft-teams/#user-setup
[8]: /integrations/microsoft-teams/#granting-additional-permissions
[9]: /bits_ai/bits_chat/#permissions
[10]: /bits_ai/bits_investigation/
[11]: /bits_ai/bits_investigation/configure/#microsoft-teams-preview
