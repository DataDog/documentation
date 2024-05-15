---
title: Error Tracking Assistant
kind: documentation
is_beta: true
private: true
description: Learn about the Error Tracking Assistant.
further_reading:
- link: '/monitors/types/error_tracking'
  tag: 'Documentation'
  text: 'Learn about using Executional Context in Error Tracking'
- link: '/tracing/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking for Backend Services'
---

{{< beta-callout url="#" btn_hidden="true" >}}
Error Tracking Assistant for APM Error Tracking is in private beta. To request access, contact Support at support@datadoghq.com.
{{< /beta-callout >}}

## Overview

The Error Tracking Assistant in APM Error Tracking provides a summary of your errors and helps you solve them with suggested test cases and fixes. 

{{< img src="tracing/error_tracking/error_tracking_assistant.mp4" video="true" alt="Error Tracking Explorer Executional Context" style="width:100%" >}}

## Requirements and setup
Supported languages
: Python, Java

The Error Tracking Assistant requires [Source Code Integration][3]. To enable Source Code Integration:

1. Go to **Integrations** and choose **Link Source Code** in the top navbar.
2. Follow the steps to associate a commit with your telemetry and configure your GitHub repository.

{{< img src="tracing/error_tracking/apm_source_code_integration.png" alt="APM Source Code Integration Set Up" style="width:80%" >}}

### Recommended additional setup
- To enhance suggestions for Python by providing real production variable values to the Assistant, enroll in the [Python Executional Context Beta][1].
- To send test cases and fixes to your IDE, click on **Apply in VS Code** on any generated suggestion and follow the guided setup to install the Datadog VS Code Extension.

## Getting started
1. Navigate to [**APM** > **Error Tracking**][4].
2. Click into any Error Tracking issue to view the new **Generate test & fix** section.

{{< img src="tracing/error_tracking/error_tracking_assistant.png" alt="Error Tracking Assistant" style="width:80%" >}}

## Troubleshooting

If you aren't seeing generated suggestions:

1. Ensure that [Source Code Integration][2] with the Github Integration is correctly configured.
2. Enhance Error Tracking Assistant suggestions by enrolling in the [Python Executional Context Beta][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/error_tracking/executional_context
[2]: https://app.datadoghq.com/source-code/setup/apm
[3]: /integrations/guide/source-code-integration
[4]: https://app.datadoghq.com/apm/error-tracking
