---
title: Exabeam - Windows
description: Learn more about the Exabeam - Windows pack.
further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-exabeam-packs/"
  tag: "Blog"
  text: "Process and route critical security logs to Exabeam with Observability Pipelines"
---

## Overview

{{< img src="observability_pipelines/packs/exabeam_windows.png" alt="The Exabeam - Windows pack" style="width:25%;" >}}

This pack processes Windows Event Logs sent to Exabeam and filters to codes Exabeam parsers use, keeping raw XML intact for parsing.

What this pack does:

- Keeps raw XML intact
- Keeps Sysmon and PowerShell logs
- Drops unused Security codes

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
