---
title: Mechanisms to Ensure Logs are Not Lost

aliases:
  - /logs/faq/log-collection-is-the-datadog-agent-losing-logs
further_reading:
- link: "/logs/log_collection/"
  tag: "Documentation"
  text: "Learn how to collect your logs"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/glossary/#tail"
  tag: Glossary
  text: 'Glossary entry for "tail"'
---

**The Datadog Agent has several mechanisms to ensure that no logs are lost**.

## Log rotate

When a file is rotated, the Agent keeps [tailing][1] the old file while starting to tail the newly created file in parallel.
Although the Agent continues to tail the old file, a 60-second timeout after the log rotation is set to ensure the agent is using its resources to tail the most up-to-date files.

## Network issues

### File tailing

The Agent stores a pointer for each tailed file. If there is a network connection issue, the Agent stops sending logs until the connection is restored and automatically picks up where it stopped to ensure no logs are lost.

### Port listening

If the Agent is listening to a TCP or UDP port and faces a network issue, the logs are stored in a local buffer until the network is available again.
However, there are some limits for this buffer in order to avoid memory issues. New logs are dropped when the buffer is full.

### Container logs

As for files, Datadog stores a pointer for each tailed container. Therefore, in the case of network issues, it is possible for the Agent to know which logs have not been sent yet.
However, if the tailed container is removed before the network is available again, the logs are not accessible anymore.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /glossary/#tail
