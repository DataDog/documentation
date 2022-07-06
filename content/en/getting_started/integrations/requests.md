---
title: Request Datadog Integrations
kind: guide
aliases:
  - /integrations/guide/requests/
further_reading:
  - link: "developers/integrations/new_check_howto"
    tag: "Documentation"
    text: "Create a Datadog Integration"
---

To request a Datadog integration, review the information below.

## Alternatives

There are some technologies that Datadog does not support, but there might be an alternative. Review the information below before submitting a request.

### OpenMetrics

- Should also mention metrics collected from this are custom metrics

### JMX Beans

- Should also mention all JMX-based integrations not natively supported by Datadog are considered as custom metrics

### Custom Metrics

- Combine custom metrics (DogStatsD) and Custom Integration (custom python checks) as a row in the table

### Logs

### APM

### Processes

### Files/Directories

### Endpoint

### SNMP Traffic / Network Traffic

### Cloud providers

## Feature request

If none of Datadog's existing tools fit your needs, create a ticket with [Datadog support][1].

### Submit a request

Include the following info when submitting a ticket:

- The name, role, and contact info for the request submitter
- The level of urgency for your request: blocker, high priority, nice to have
- The name of technology and a link to their website
- The specific metrics you want to collect and monitor
- Your use case for collecting the information
- Describe how you are currently accomplishing your goal
- Any specific events or issues that make this feature important

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
