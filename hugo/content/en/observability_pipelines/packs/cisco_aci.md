---
title: Cisco ACI
description: Learn more about the Cisco ACI pack.
---

## Overview

{{< img src="observability_pipelines/packs/cisco_aci.png" alt="The Cisco ACI pack" style="width:25%;" >}}

Cisco ACI syslog events capture fabric health, endpoint moves, and admin activity.

What this pack does:

- Parses ACI fault codes and DN fields
- Generates metrics by severity and by event name
- Drops cleared and low-value faults
- Tags node, policy, and endpoint events
