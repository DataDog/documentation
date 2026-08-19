---
title: Exabeam - Fortinet FortiGate
description: Learn more about the Exabeam - Fortinet FortiGate pack.
---

## Overview

{{< img src="observability_pipelines/packs/exabeam_fortinet_fortigate.png" alt="The Exabeam - Fortinet FortiGate pack" style="width:25%;" >}}

This pack processes FortiGate firewall logs sent to Exabeam and filters out routine traffic and health-check noise.

What this pack does:

- Drops DNS and health checks
- Drops internal accept traffic
- Keeps threats and denied logs
