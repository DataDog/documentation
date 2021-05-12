---
title: RUM Error Tracking
kind: documentation
further_reading:
- link: "/real_user_monitoring/error_tracking/explorer"
  tag: "Documentation"
  text: "Error Tracking Explorer"
- link: "https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"
  tag: "Documentation"
  text: "Official repository of the Datadog CLI"
- link: "/real_user_monitoring/guide/upload-javascript-source-maps"
  tag: "Guide"
  text: "Upload javascript source maps"
- link: "https://app.datadoghq.com/error-tracking"
  tag: "UI"
  text: "Error tracking"
---

{{< img src="real_user_monitoring/error_tracking/page.png" alt="Error Tracking Page"  >}}

## What is error tracking?

Datadog collects a lot of errors. It's critical to your system's health to monitor these errors, but there can be so many individual error events that it’s hard to identify which ones matter the most and should be fixed first. Error Tracking makes it easier to monitor these errors by:

- __Grouping similar errors into issues__ to reduce the noise and help identify the most important ones.
- __Following issues over time__ to know when they first started, if they are still ongoing, and how often they are occurring.
- __Getting all the context needed in one place__ to facilitate troubleshooting the issue.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
