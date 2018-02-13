---
title: Log Locations
kind: faq
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
---


### Linux

The Agent logs are located in the `/var/log/datadog/` directory. 

[The Datadog Agent v5](/agent/v5) logs into:
    
* `datadog-supervisord.log`
* `collector.log`
* `dogstatsd.log`
* `forwarder.log`

[The Datadog Agent v6](/agent/v6) logs are in the `agent.log` file

### MacOSx

The Agent logs are located in the `/var/log/datadog/` directory. 

[The Datadog Agent v5](/agent/v5) logs into:
    
* `datadog-supervisord.log`
* `collector.log`
* `dogstatsd.log`
* `forwarder.log`

[The Datadog Agent v6](/agent/v6) logs are in the `agent.log` file

### Windows

Logs are located in the `c:\programdata\Datadog\logs` directory.

[The Datadog Agent v5](/agent/v5) logs into:
    
* `datadog-supervisord.log`
* `collector.log`
* `dogstatsd.log`
* `forwarder.log`

[The Datadog Agent v6](/agent/v6) logs are in the `agent.log` file

### How often do the logs rollover?

The Datadog logs does rollover every 10MB. When rollover occurs, one backup is kept (e.g. forwarder.log.1). If a previous backup exists, it is overwritten on rollover (e.g. *forwarder.log.1* isn't rotated to *forwarder.log.2*, but is instead be overwritten).

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}