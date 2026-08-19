---
title: WinEventLog
description: Learn more about the WinEventLog pack.
---

## Overview

{{< img src="observability_pipelines/packs/wineventlog.png" alt="The WinEventLog pack" style="width:25%;" >}}

Windows Event Log captures authentication, process creation, and account management events.

What this pack does:

- Parses logon, process, and account events by EventCode
- Extracts user, IP, logon type, and command line fields
- Drops non-security event codes
