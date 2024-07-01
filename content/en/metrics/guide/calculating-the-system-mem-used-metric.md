---
title: Calculating the 'system.mem.used' metric
aliases:
  - /agent/faq/how-is-the-system-mem-used-metric-calculated/
further_reading:
- link: "/metrics/"
  tag: "Documentation"
  text: "Learn more about Metrics"
---

The manner in which Datadog calculates the `system.mem.used` metric produces a value that may sometimes be different from what might be displayed by common system resource reporting tools.

For example, running 'free -m' on an Ubuntu machine may produce the following memory breakdown (values represent megabytes):

|        |      |       |        |        |           |
| :---   | :--- | :---  | :---   | :---   | :---      |
| total  | used | free  | shared | cached | available |
| 128831 | 1203 | 71975 | 4089   | 55653  | 122380    |

A Datadog Agent running on this same machine reports a `system.mem.used` metric with a value of 56856 MB—clearly different from the 'free -m' used memory value of 1203 MB.

The reason for this discrepancy is that Datadog includes cached memory in its formula for used memory, where 'free -m' does not.

Datadog calculates used memory as follows:

* system.mem.used(56856) = system.mem.total(128831) - system.mem.free(71975)

Again, Datadog's `system.mem.used` metric includes cached memory, so subtracting this cached memory from used memory results in the following value:

* system.mem.used(56856) - system.mem.cached(55653) = 1203

1203 MB—identical to the used memory value reported by 'free -m' in the example above.

**The `system.mem.usable` metric represents free memory plus cached memory plus buffers** (on Linux, it reflects "MemAvailable" attribute from /proc/meminfo whenever possible).

{{< partial name="whats-next/whats-next.html" >}}

