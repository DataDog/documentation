---
title: Session Replay Browser Developer Tools
description: Describes the developer tools available in Session Replay
aliases:
- /real_user_monitoring/session_replay/developer_tools
further_reading:
    - link: '/real_user_monitoring/session_replay/browser'
      tag: Documentation
      text: Browser Session Replay
---

## Overview

Session Replay's Browser Dev Tools are built-in debugging tools that can help you troubleshoot issues in your applications. You do not need to configure anything to use Browser Dev Tools. 

## Browser Dev Tools

To access Browser Dev Tools, either click the **Jump to Replay** button to the left of a session in the **Sessions** tab or click on a session and click **Replay Session** on the top right corner in the [RUM Explorer][1]. 

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-1.png" alt="Dev Tools button" style="width:80%;">}}

The **</> Dev Tools** button appears to the right of the **Share** button. You can view performance data, console logs, errors, and attributes about your replays. 

### Performance

The **Performance** tab displays a waterfall of events (such as actions, errors, resources, and long tasks) and timestamps in a session.

Select and apply **Network**, **Events**, and **Timings** filters to change the scope of resources and event types displayed. You can also drag and drop the sliders in the waterfall to expand the time range.  

{{< img src="real_user_monitoring/session_replay/dev_tools/performance-filters-1.mp4" alt="Performance filters" video="true" style="width:60%;">}}

### Console

The **Console** tab displays all [logs collected from the web browser][2] and errors for each view. 

Click **Error**, **Warn**, **Info**, and **Debug** to filter your logs based on severity. To search for these logs in the [Log Explorer][3], click **View in Log Explorer**.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-console.png" alt="Console View in Log Explorer button" style="width:50%;">}}

The Log Explorer opens in a separate tab with a pre-filled search query. 

### Errors

The **Errors** tab displays [RUM errors][4] and [Error Tracking][5] issues that correlate to the session.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-errors.png" alt="Errors tab" style="width:70%;">}}

### Attributes

The **Attributes** tab displays all attributes related to the session. For more information, see [Default attributes][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/
[2]: /logs/log_collection/javascript/
[3]: /logs/explorer/
[4]: /real_user_monitoring/browser/collecting_browser_errors/
[5]: /real_user_monitoring/error_tracking/
[6]: /real_user_monitoring/browser/data_collected/#default-attributes
