---
title: Setting up log monitors on volumes
kind: guide
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
---

Get notified at any moment if the volumes in any scope (`service`, `availibility-zone`, etc...) of your infrastructure are growing unexpectedly:

1. Go to the [Datadog Log Explorer][1] view
2. Build a [search query][2] that represents the volume to monitor.
3. Click on **Export to monitor**.
4. Define the rate you would like to set as *warning* or *error*.
5. Define an explicit notification: `The volume on this service just got too high. Define an additional exclusion filter or increase the sampling rate to get it back under control.`

{{< img src="logs/guide/example_notification.png" alt=" example notification"  style="width:70%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/explorer/search
