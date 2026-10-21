---
title: Bits Investigation
description: Investigate Error Tracking issues with Bits Investigation to find the root cause and impact of an error.
further_reading:
- link: '/bits_ai/bits_investigation/'
  tag: 'Documentation'
  text: 'Learn about Bits Investigation'
- link: '/bits_ai/bits_investigation/chat_bits_investigation/'
  tag: 'Documentation'
  text: 'Chat with Bits Investigation'
- link: '/bits_ai/bits_code/'
  tag: 'Documentation'
  text: 'Generate code fixes with Bits Code'
- link: '/source_code/'
  tag: 'Documentation'
  text: 'Set up Source Code Integration'
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Bits Investigation in Error Tracking is in Preview.
{{< /callout >}}

## Overview

[Bits Investigation][1] is an autonomous AI agent that investigates production issues. In Error Tracking, you can start a Bits investigation from an issue. Bits analyzes the error, its stack trace, and related telemetry, as well as your source code if [Source Code Integration][3] is set up. It then reports the likely root cause and the impact of the issue.

{{< img src="error_tracking/bits_investigation/investigation_summary.png" alt="The Review tab of an Error Tracking issue, showing the root cause and impact found by Bits Investigation" style="width:100%;" >}}

## Prerequisites

- Your role must have the Bits Investigations Read permission to view investigations, and the Bits Investigations Write permission to start them. For details, see [Configure permissions][2].
- To let Bits read the code that was running when the error occurred, set up [Source Code Integration][3]. Bits can investigate without source code access, but the root cause analysis is less precise.

## Start an investigation

1. In the [Error Tracking Explorer][4], click an issue to open the issue panel.
1. On the {{< ui >}}Review{{< /ui >}} tab, click {{< ui >}}Investigate this issue{{< /ui >}} in the {{< ui >}}Bits Investigation{{< /ui >}} banner.

{{< img src="error_tracking/bits_investigation/start_investigation.png" alt="The Bits Investigation banner on the Review tab of an Error Tracking issue, with the Investigate this issue button" style="width:100%;" >}}

The banner shows the progress of the investigation and who started it. An investigation usually takes a few minutes.

## Review the results

When the investigation completes, the banner on the {{< ui >}}Review{{< /ui >}} tab summarizes the findings:

- **Root cause**: The most likely cause of the error, based on the evidence Bits gathered.
- **Impact**: How the error affects your users and services.

If the available data is insufficient to support a conclusion, Bits marks the investigation as inconclusive.

To see the full investigation, click {{< ui >}}View Investigation{{< /ui >}}. The investigation page shows the conclusion, suggested next steps, a timeline of the evidence, and every step Bits took to reach its conclusion. For details on investigation display modes, see [How Bits investigates][5].

{{< img src="error_tracking/bits_investigation/investigation_report.png" alt="The Bits Investigation page for an Error Tracking issue, showing the conclusion, root cause, impact, a suggested next step, and the timeline" style="width:100%;" >}}

From the investigation page, you can:

- Rate the conclusion to help improve Bits Investigation.
- Ask follow-up questions about the investigation in Bits Chat. For details, see [Chat with Bits Investigation][6].
- Review the suggested next steps.

## Generate a code fix

When a suggested next step is a code change, Bits Investigation can hand off the fix to [Bits Code][7]. Bits Code uses the findings of the investigation to generate a code change and open a pull or merge request in your repository. You can review the change, ask for updates, and merge it when it is ready. Bits Code never merges changes automatically.

To generate code fixes, set up [Bits Code][8] with a supported source code provider.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_investigation/
[2]: /bits_ai/bits_investigation/configure/#configure-permissions
[3]: /source_code/
[4]: https://app.datadoghq.com/error-tracking
[5]: /bits_ai/bits_investigation/investigate_issues/#how-bits-investigates
[6]: /bits_ai/bits_investigation/chat_bits_investigation/
[7]: /bits_ai/bits_code/
[8]: /bits_ai/bits_code/setup/
