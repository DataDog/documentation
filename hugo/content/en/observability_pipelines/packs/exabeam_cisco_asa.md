---
title: Exabeam - Cisco ASA
description: Learn more about the Exabeam - Cisco ASA pack.
---

## Overview

{{< img src="observability_pipelines/packs/exabeam_cisco_asa.png" alt="The Exabeam - Cisco ASA pack" style="width:25%;" >}}

This pack processes Cisco ASA firewall logs sent to Exabeam and filters by ASA code to drop non-actionable syslog noise.

What this pack does:

- Normalizes ASA codes
- Deduplicates repeated logs
- Drops non-actionable syslog noise
