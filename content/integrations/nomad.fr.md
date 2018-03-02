---
categories:
- provisioning
creates_events: true
ddtype: statsd
display_name: Nomad
doc_link: https://docs.datadoghq.com/integrations/nomad/
git_integration_title: nomad
has_logo: true
integration_title: Nomad
is_public: true
kind: integration
maintainer: irabinovitch
manifest_version: 1.0.0
metric_prefix: nomad
metric_to_check: nomad.client.host.cpu.user
name: nomad
public_title: Datadog-Nomad Integration
short_description: Easily Schedule and Deploy Applications at Any Scale
---

## Overview

Gather metrics from your Nomad clusters to:

* Visualize and monitor cluster performance
* Alert on cluster health and availability

## Setup

### Configuration

Nomad emits metrics to Datadog via DogStatsD. To enable the Nomad integration, you will need
to install the Datadog Agent on each client and server host.  Once installed, add a Telemetry
stanza to the Nomad configuration for your clients and servers:

```
telemetry {
  publish_allocation_metrics = true
  publish_node_metrics       = true
  datadog_address = "localhost:8125"
  disable_hostname = true
}
```

Next, reload or restart the Nomad agent on each host. You should now begin to see Nomad metrics flowing to
your Datadog account.  

## Data Collected
### Metrics
{{< get-metrics-from-git "nomad" >}}


### Events
The Nomad check does not include any events at this time.

### Service Checks
The Nomad check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).

