---
title: Session Replay Browser Dev Tools
description: 
aliases:
- /real_user_monitoring/session_replay/dev_tools
further_reading:
    - link: '/session_replay/'
      tag: Documentation
      text: Session Replay
    - link: "https://www.datadoghq.com/blog/default-privacy-session-replay/"
      tag: "Blog"
      text: "Obfuscate user data with Session Replay default privacy settings"
---

## Overview

Dev Tools is a built-in debugging panel in Session Replay that can help you troubleshoot issues in your applications. Use it to identify issues, trace requests, and understand performance bottlenecks—all without reproducing the issue yourself. Dev Tools are only available for [RUM][1] sessions that have been retained. You do not need to configure anything to use Dev Tools.

## Dev Tools

To access Dev Tools, click the **Dev Tools** button in the Session Replay view. The **</> Dev Tools** button appears to the right of the **Share** button. You can view performance data, console logs, errors, and attributes about your replays.

### Performance

The **Performance** tab displays a waterfall of events (such as actions, errors, resources, and long tasks) and timesteamps in a session.

Select and apply filters such as Action Name and Resource Type to change the scope of resources and event types displayed. You can also drag and drop the sliders in the waterfall to expand the time range.

{{< img src="real_user_monitoring/session_replay/dev_tools/performance-filters-2.mp4" alt="Performance filters" video="true" style="width:60%;">}}

### Console

The **Console** tab displays all [logs collected from the web browser][2] and errors for each view. 

Click **Error**, **Warn**, **Info**, and **Debug** to filter your logs based on severity. To search for these logs in the [Log Explorer][3], click **View in Log Explorer**.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-console.png" alt="Console View in Log Explorer button" style="width:50%;">}}

The Log Explorer opens in a separate tab with a pre-filled search query. 

#### Identify CSP violations

Console logs also surface Content Security Policy (CSP) violations. If a legitimate resource is being blocked, these logs help you identify which CSP policies need updating.

### Errors

The **Errors** tab displays [RUM errors][4] and [Error Tracking][5] issues that correlate to the session.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-errors.png" alt="Errors tab" style="width:70%;">}}

### Attributes

The **Attributes** tab displays all attributes related to the session. For more information, see [Default attributes][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/
[2]: /logs/log_collection/javascript/
[3]: /logs/explorer/
[4]: /real_user_monitoring/application_monitoring/browser/collecting_browser_errors/
[5]: /real_user_monitoring/error_tracking/
[6]: /real_user_monitoring/application_monitoring/browser/data_collected/#default-attributes