---
title: Upgrade to Worker Version 2.9.1
description: Learn more about Worker version 2.9.1.
disable_toc: false
---

Upgrade to Worker version 2.9.1 to have access to the following fixes.

## Fixes

- Limit the Microsoft Sentinel destination to batch sizes of 1 MB when reading logs using the Azure Logs Ingestion API. Limit is based on [Azure documentation][1].

[1]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api