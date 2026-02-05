---
title: "Windows Memory Metrics in Datadog"
description: "Understand Windows memory metrics and how they map to Datadog system metrics, Live Processes, and Windows Performance Counters."
further_reading:
  - link: "/metrics/summary/"
    tag: "Documentation"
    text: "Metrics Summary"
  - link: "/metrics/explorer/"
    tag: "Documentation"
    text: "Metrics Explorer"
  - link: "/infrastructure/process/"
    tag: "Documentation"
    text: "Live Processes"
  - link: "/integrations/windows_performance_counters/"
    tag: "Documentation"
    text: "Windows Performance Counters Integration"
  - link: "/agent/basic_agent_usage/windows/"
    tag: "Documentation"
    text: "Basic Agent Usage for Windows"
---

## Overview

This guide clarifies Windows memory metrics and provides a comprehensive mapping between Datadog system metrics, Live Processes metrics, and native Windows Performance Counters. Windows offers multiple memory metrics that serve different monitoring purposes—from tracking physical RAM usage to understanding virtual memory allocation and commit charges.

Use this guide to:
- Understand the key differences between physical memory, virtual memory, commit charge, and commit limit
- Identify which Datadog metrics correspond to specific Windows memory concepts
- Find the equivalent metrics across Datadog's monitoring tools and Windows native Performance Counters
- Select the appropriate metrics for your specific monitoring needs

For additional context on Windows memory architecture, see Microsoft's [Memory Performance Information][1] documentation.

## Key terms

Physical Memory
: Actual physical RAM that is in use. Sometimes also called the "working set" or RSS.

Commit charge
: Total of all memory that must be backed by RAM or the paging files. Sometimes also called "private bytes".

Commit limit
: The system-wide max commit charge, it is the sum of the capacity of the paging files and physical RAM.

Virtual Memory
: Amount of virtual address space being used by a process. Since virtual addresses can be reserved without actually taking up any memory, this value can be huge and often is not representative of how much memory is actually in use.

**Note**: Windows can reach an out-of-memory condition by exhausting physical memory or by reaching the commit limit. It is helpful to monitor both.

## Metric mapping: Key memory types to monitoring sources

The following table shows which Datadog metrics to use for monitoring specific Windows memory types. For example, to monitor physical RAM usage, use `system.mem.total`, `system.mem.usable`, or `system.processes.mem.rss`. To track commit charge (private bytes), use `system.mem.committed` or `system.processes.mem.vms`.

The table also includes corresponding Live Processes metrics and native Windows Performance Counters for cross-reference when troubleshooting or correlating data across different monitoring tools.

| Memory Type | Description | Datadog System Metric | Live Processes Metric | Windows Performance Counter |
| :---- | :---- | :---- | :---- | :---- |
| Physical Memory | Actual physical RAM. Known as RSS or "working set". | `system.mem.total` `system.mem.usable` `system.mem.pct_usable` `system.mem.used` `system.mem.shared` `system.processes.mem.rss` | RSS Memory RSS Memory % | `\Memory\Available Bytes` `\Process()\Working Set` `\Process()\Working Set - Private` |
| Commit Charge | Total of all memory that must be backed by RAM or the paging files. Known as "private bytes" | `system.mem.pagefile.*` `system.swap.*` `system.mem.committed` `system.processes.mem.vms` | N/A | `\Memory\Committed Bytes` `\Process()\Private Bytes` |
| Commit Limit | The system-wide max commit charge, it is the sum of the capacity of the paging files and physical RAM | `system.mem.pagefile.total` `system.swap.total` | N/A | `\Memory\Commit Limit` |
| Virtual Memory | Amount of virtual address space being used by a process. |  | Virtual Memory | `\Process()\Virtual Bytes` |

### Example: Windows Process Explorer

The following screenshots show how memory values displayed in Windows Process Explorer correspond to the metrics in the table above. The highlighted columns in Process Explorer show the Working Set (physical memory), Private Bytes (commit charge), and Virtual Size metrics that map to Datadog's system metrics and Live Processes view.

{{< img src="metrics/guide/windows_memory_metrics_in_datadog/windows_process_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="The Windows Process Explorer with the agent.exe properties expanded. The Private Bytes value is mapped to system.processes.mem.vms, and the Working Set value is mapped to system.processes.mem.rss" >}}

{{< img src="metrics/guide/windows_memory_metrics_in_datadog/windows_system_information.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="The Memory tab of the System Information panel. Under Commit Charge, the Current value is mapped to system.mem.pagefile.used and system.swap.used, and the Limit value is mapped to system.swap.total and system.mem.pagefile. Under Physical Memory, the Total value is mapped to system.mem.total, the Available value is mapped to system.mem.available, and the Cache WS value is mapped to system.mem.cached" >}}

## Understanding pagefile metric names

In Windows, pagefile and swap memory are considered the same thing, so the `system.swap.*` and `system.mem.pagefile.*` metrics report the same value. 

It's important to understand what the `system.mem.pagefile.*` metrics actually measure. The Datadog Agent collects these metrics from the Windows [MEMORYSTATUS struct][2], which defines them as:

* `dwTotalPageFile`: The current size of the committed memory limit, in bytes. This is physical memory plus the size of the page file, minus a small overhead.  
* `dwAvailPageFile`: The maximum amount of memory the current process can commit, in bytes. This value should be smaller than the system-wide available commit. To calculate this value, call [GetPerformanceInfo][3] and subtract the value of **CommitTotal** from **CommitLimit**.

Based on these definitions, the `system.mem.pagefile.*` metrics measure committed memory (commit charge and commit limit) rather than the pagefile size itself. Datadog preserves the Windows API naming convention for consistency.

What each metric measures:

* system.mem.pagefile.total \= Commit Limit (the maximum commit charge, not the pagefile size)  
* system.mem.pagefile.used \= Current Commit Charge (memory committed by all processes, not pagefile usage)  
* system.mem.pagefile.free \= Available Commit (remaining commit capacity, not free pagefile space)

## Recommended: Paging file metrics (Agent 7.76+)

**Datadog recommends upgrading to Agent version 7.76 or later** to access clearer, more accurately named paging file metrics. Unlike the `system.mem.pagefile.*` metrics (which actually measure commit charge), these metrics directly monitor your pagefile.sys usage.

Agent versions `7.76` and later have the following metrics available for monitoring paging file (pagefile.sys) usage:

| Metric | Description |
| :---- | :---- |
| `system.paging.total` | The total amount of allocated pagefile in bytes. |
| `system.paging.used` | The amount of pagefile that is used in bytes |
| `system.paging.pct_free` | The percentage of pagefile that is not used. |
| `system.paging.free` | The amount of pagefile that is not used in bytes. |

### For Agent versions 7.75 and previous

If you're using an Agent version previous to 7.76, the total size of all paging files (pagefile.sys) can be calculated with the following formula (open the [Metric Explorer][4] to try it out):

```
system.mem.pagefile.total - system.mem.total
```

The following performance counters can also be collected through the Windows Performance Counters integration:

* `\Paging File()% Usage`   
* `\Paging File()% Usage Peak`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://learn.microsoft.com/windows/win32/memory/memory-performance-information
[2]: https://learn.microsoft.com/windows/win32/api/winbase/ns-winbase-memorystatus
[3]: https://learn.microsoft.com/windows/win32/api/psapi/nf-psapi-getperformanceinfo
[4]: https://app.datadoghq.com/metric/explorer
