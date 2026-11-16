---
title: Exabeam - Fortinet FortiGate
description: Learn more about the Exabeam - Fortinet FortiGate pack.
further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-exabeam-packs/"
  tag: "Blog"
  text: "Process and route critical security logs to Exabeam with Observability Pipelines"
---

## Overview

{{< img src="observability_pipelines/packs/exabeam_fortinet_fortigate.png" alt="The Exabeam - Fortinet FortiGate pack" style="width:25%;" >}}

This pack processes FortiGate firewall logs sent to Exabeam and filters out routine traffic and health-check noise.

What this pack does:

- Drops DNS and health checks
- Drops internal accept traffic
- Keeps threats and denied logs

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
