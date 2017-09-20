---
title: Network check
integration_title: Network Check
kind: integration
newhlevel: true
platformmetrics:
  system.net.tcp.retrans_packs:
    - BSD
  system.net.tcp.sent_packs:
    - BSD
  system.net.tcp.rcv_packs:
    - BSD
  system.net.tcp.retrans_segs:
    - Solaris
  system.net.tcp.in_segs:
    - Solaris
  system.net.tcp.out_segs:
    - Solaris
description: "{{< get-desc-from-git >}}"
---

{{< img src="integrations/network/netdashboard.png" alt="Network Dashboard" >}}

## Overview
//get-overview-from-git//

## Setup
//get-setup-from-git//

## Data Collected
### Metrics
See [metadata.csv](https://github.com/DataDog/integrations-core/blob/master/network/metadata.csv) for a list of metrics provided by this integration.

### Events
The Network check does not include any event at this time.

### Service Checks
The Network check does not include any service check at this time.

## Troubleshooting
//get-troubleshooting-from-git//

## Further Reading
//get-further-reading-from-git//