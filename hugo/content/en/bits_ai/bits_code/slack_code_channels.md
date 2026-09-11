---
title: Code Channels in Slack with Bits Code
further_reading:
- link: "/bits_ai/bits_code/"
  tag: "Documentation"
  text: "Bits Code"
- link: "/bits_ai/bits_chat/#slack"
  tag: "Documentation"
  text: "Bits Chat in Slack"
- link: "/integrations/slack/"
  tag: "Documentation"
  text: "Slack integration"
- link: "https://slack.com/features/code-channels"
  tag: "Slack Documentation"
  text: "Code channels"
---

## Overview

Code channels are dedicated, ephemeral Slack channels for working with a coding agent on a specific task. When you ask [Bits Chat][1] in Slack to make a code change, Bits Code creates a code channel for that task. You and your team can follow the work, steer it, and review the result there, without cluttering the original conversation.

{{< img src="bits_ai/dev_agent/slack_code_channels/code_channel.png" alt="A Slack code channel showing a conversation with Bits Code alongside a diff view of proposed code changes" style="width:100%;" >}}

Learn more about code channels in the [Slack documentation][6].

## Create a code channel

To create a code channel, mention `@Datadog` in Slack and describe a code change you'd like made. If Bits Chat determines the request requires code changes, it hands the task off to Bits Code, which creates a code channel. Bits posts a link to the new code channel in the location where it was originally prompted.

{{< img src="bits_ai/dev_agent/slack_code_channels/code_channel_creation.png" alt="A Slack message mentioning @Datadog, followed by a card showing the resulting code channel that was created" style="width:100%;" >}}

Find your code channels in a dedicated {{<ui>}}Code channels{{</ui>}} section in your Slack sidebar.

### Permissions and access

Only the user who prompted `@Datadog` is added to the new code channel automatically. Code channels match the visibilty of the channel from which they are created (that is, if you mentioned `@Datadog` in a public channel, the resulting code channel is also public). **Note**: Bits can bring repository code and Datadog telemetry into the code channel—-consider the channel's visibility, and who should have access to that data, when creating the channel.

Any user who wants to steer the agent must have a Datadog account connected to Slack. (If you post in a code channel but do not have a connected Datadog account, Bits ignores your message.)

In a code channel, Bits Code acts using the Datadog permissions and source code provider access of the user who created the channel. 

## Work in a code channel

In other Slack channels, when you want a response from Bits Chat, you must `@`-mention it every time. A code channel works differently: Bits Code listens to each message posted. You don't need to mention `@Datadog` again to keep steering the agent.

As Bits Code works, the code channel shows:

- A diff view of proposed code changes
- Datadog graph widgets, when relevant to the task
- A {{< ui >}}Create PR{{< /ui >}} button to open a pull or merge request from the changes, when you're ready

Bits Code does not automatically open a pull or merge request from a code channel. Click {{< ui >}}Create PR{{< /ui >}} when you're ready. Whichever user clicks {{< ui >}}Create PR{{< /ui >}} is the author of the resulting pull or merge request. 

The work in every code channel is also reflected in a [Bits Code session][2] in Datadog. To view it, at the bottom-right corner of the code channel, click {{< ui >}}</> Code session{{< /ui >}}.

Learn more about how to work in a code channel in the [Slack documentation][6].

## Set up code channels

Code channels require the [Bits Chat Slack integration][1] to be configured, plus a Slack permission grant. For setup steps, see [Bits Code Setup][4].

## Session life cycle

A code channel is meant for a single task. Slack removes inactive code channels from your sidebar after seven days.

## Limitations

The general [Bits Code limitations][5] also apply to code channels.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/#slack
[2]: /bits_ai/bits_code/#sessions
[3]: https://app.datadoghq.com/code
[4]: /bits_ai/bits_code/setup/
[5]: /bits_ai/bits_code/#limitations
[6]: https://slack.com/help/articles/54310833022355-Build-with-AI-as-a-team-using-Slack-Code
