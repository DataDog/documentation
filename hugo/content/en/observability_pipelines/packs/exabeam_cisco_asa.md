---
title: Exabeam - Cisco ASA
description: Learn more about the Exabeam - Cisco ASA pack.
further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-exabeam-packs/"
  tag: "Blog"
  text: "Process and route critical security logs to Exabeam with Observability Pipelines"
---

## Overview

{{< img src="observability_pipelines/packs/exabeam_cisco_asa.png" alt="The Exabeam - Cisco ASA pack" style="width:25%;" >}}

This pack processes Cisco ASA firewall logs sent to Exabeam and filters by ASA code to drop non-actionable syslog noise.

What this pack does:

- Normalizes ASA codes
- Deduplicates repeated logs
- Drops non-actionable syslog noise

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
