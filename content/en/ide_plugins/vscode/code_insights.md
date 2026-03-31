---
title: Code Insights
type: documentation
further_reading:
    - link: '/tracing/error_tracking/'
      tag: 'Documentation'
      text: 'Learn more about Error Tracking'
    - link: '/security/code_security/'
      tag: 'Documentation'
      text: 'Learn more about Code Security'
    - link: '/tests/explorer/'
      tag: 'Documentation'
      text: 'Learn more about Test Optimization'
---

## Overview

**Code insights** keep you informed with Datadog-generated insights that are relevant to your code base:

-   Runtime errors collected by [Error Tracking][1]
-   Code and library vulnerabilities reported by [Code Security][2]
-   Flaky tests detected by [Test Optimization][3]

The extension identifies errors and vulnerabilities in the code with colored squiggles; hover over the line for more details.

{{< img src="/developers/ide_plugins/vscode/code-insights-inline-hover.mp4" alt="Hovering over inline code insights" style="width:100%" video=true >}}

The **Code Insights** view in the Datadog sidebar lists all the issues found in the repository. Select an item to view the full insight, and use the links to jump to the related source code location or open the code insight in Datadog.

You can group code insights by kind, file, priority, or service. You can also ignore individual code insights and set filters to view the ones you're most interested in.

{{< img src="/developers/ide_plugins/vscode/code-insights-2.png" alt="The Code Insights view." style="width:100%;" >}}

For specific insights about the file currently open in the active editor, check the **File Insights** view in the IDE's file explorer. This view also lists issues discovered by [Code Security][4] within the file.

{{< img src="/developers/ide_plugins/vscode/file_insights_view.mp4" alt="File Insights view" style="width:100%" video=true >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/error_tracking/
[2]: /security/code_security/
[3]: /tests/explorer/
[4]: /ide_plugins/vscode/code_security/
