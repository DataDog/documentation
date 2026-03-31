---
title: Exception Replay
type: documentation
further_reading:
    - link: '/tracing/error_tracking/exception_replay'
      tag: 'Documentation'
      text: 'Learn more about Exception Replay'
---

## Overview

**Exception Replay** allows you to inspect the stack trace frames of any Error Tracking code insight and get information about the values of the variables of the code running in production.

To access this feature, you must enable [Error Tracking Exception Replay][1] on Datadog.

After the feature has been enabled, you can see an **Exception Replay** button next to the stack trace section of any instrumented Error Tracking code insight. Click the button to:

-   Access all the information Datadog has about the different frames.
-   Navigate through the production code.
-   Review the value of the different variables involved.

Select an Error Tracking code insight from the Code Insights view. Go to the stack trace and click the Exception Replay button. The IDE shows a new activity with two new views:

-   **Variables**: Displays the variables related to a particular stack trace frame.
-   **Stack Trace**: Lists the stack frames for navigation.

Select a stack trace frame and inspect the values of all the variables that Datadog captured from your production code.

{{< img src="/developers/ide_plugins/vscode/exception_replay.mp4" alt="Preview of Exception Replay" style="width:100%" video=true >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/error_tracking/exception_replay
