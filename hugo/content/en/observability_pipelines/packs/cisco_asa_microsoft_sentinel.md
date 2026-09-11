---
title: Cisco ASA - Microsoft Sentinel
description: Learn more about the Cisco ASA - Microsoft Sentinel pack.
---

## Overview

{{< img src="observability_pipelines/packs/cisco_asa_microsoft_sentinel.png" alt="The Cisco ASA - Microsoft Sentinel pack" style="width:25%;" >}}

This pack maps parsed Cisco ASA syslog events to the CommonSecurityLog schema in Microsoft Sentinel.

What this pack does:

- Maps four log categories to CommonSecurityLog
- Derives LogSeverity and DeviceAction from ASA codes
