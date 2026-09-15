---
title: Syslog
description: Learn more about the Syslog pack.
---

## Overview

{{< img src="observability_pipelines/packs/syslog.png" alt="The Syslog pack" style="width:25%;" >}}

This pack parses generic RFC 3164/5424 syslog with severity mapping and a log-volume metric.

What this pack does:

- Parses PRI and host
- Generates volume metric
- Samples routine HTTP 200s
