---
title: Exabeam - CrowdStrike FDR
description: Learn more about the Exabeam - CrowdStrike FDR pack.
further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-exabeam-packs/"
  tag: "Blog"
  text: "Process and route critical security logs to Exabeam with Observability Pipelines"
---

## Overview

{{< img src="observability_pipelines/packs/exabeam_crowdstrike_fdr.png" alt="The Exabeam - CrowdStrike FDR pack" style="width:25%;" >}}

This pack processes CrowdStrike Falcon Data Replicator events sent to Exabeam and drops sensor and telemetry noise.

What this pack does:

- Drops sensor telemetry
- Drops benign processes
- Keeps all detection fields

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
