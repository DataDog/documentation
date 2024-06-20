---
title: Setup
kind: documentation
description: Setting up Network Path 
is_beta: true
further_reading:
- link: "/network_monitoring/network_path/list_view"
  tag: "Documentation"
  text: "Learn more about the List View in Network Path"
- link: "/network_monitoring/network_path/path_view"
  tag: "Documentation"
  text: "Learn more about the Path View in Network Path"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Path for Datadog Network Performance Monitoring is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Network Path for Datadog Network Performance Monitoring is in private beta. Reach out to your Datadog representative to sign up, and then use the following instructions to configure the Datadog Agent to gather network path data.</div>


## Overview

Setting up Network Path involves configuring your Linux environment to monitor and trace the network routes between your services and endpoints. This helps identify bottlenecks, latency issues, and potential points of failure in your network infrastructure.

## Setup

Agent version `7.55` or higher is required.


2. Enable [NPM][1].
3. Enable the `system-probe` traceroute module in `/etc/datadog-agent/system-probe.yaml` by adding the following:

```
traceroute:
  enabled: true
```

4.  Enable `network_path` to monitor NPM connections by creating or editing the `/etc/datadog-agent/datadog.yaml` file: 

```
network_path:
  connections_monitoring:
    enabled: true
  collector:
    workers: 10 # default 4
```
 

For full configuration details, see the following:

```
network_path:
  connections_monitoring:
    ## @param enabled - bool - required - default:false
    ## Enable network path collection
    #
    enabled: true
  collector:
    ## @param workers - int - optional - default:4
    ## Number of workers that can collect paths in parallel
    ## Recommendation: leave at default
    #
    workers: 10
```

5. Restart the Agent after making these configuration changes to start seeing network paths.

**Note**: Network path is only supported for Linux environments. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/performance/setup/