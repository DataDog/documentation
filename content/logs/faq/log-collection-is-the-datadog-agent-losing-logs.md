---
title: Is the Datadog Agent losing logs?
kind: faq
disable_toc: true
further_reading:
- link: "/logs/log_collection"
  tag: "Documentation"
  text: "Learn how to collect your logs"
- link: "/logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

**The Datadog Agent has several mechanisms to ensure that no logs are lost**.

### Log Rotate

When a file is rotated, the Agent keeps tailing the old file until its end before starting to look at the newly created file.

### Network issues
#### File Tailing

The Agent stores a pointer for each tailed file. So, if there is a network connection issue, we stop sending logs until the connection is restored and automatically pick up where we stopped to ensure no logs are lost.

#### Port Listening

If the Agent is listening to a TCP or UDP port and faces a network issue, we store the logs in a local buffer until the network is available again.  
However, there are some limits for this buffer as we do not want to create memory issues. That's why unfortunately new logs are dropped when the buffer is full.

#### Container logs

As for files, we are able to store a pointer for each tailed container. Therefore, in case of network issue we are able to know which logs have not been sent yet.  
However, if the tailed container is removed before the network is available again, the logs are not accessible anymore.

{{< partial name="whats-next/whats-next.html" >}}

