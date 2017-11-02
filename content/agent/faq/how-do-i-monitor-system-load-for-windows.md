---
title: How do I monitor system load for Windows ?
kind: faq
customnav: agentnav
---

## System Load

The Datadog Agent collects a large number of system metrics out of the box. One of the more commonly used system metrics is system.load.*.

|||
|:----|:---|
|system.load.1 (gauge)   |The average system load over one minute.|
|system.load.15 (gauge)  |The average system load over fifteen minutes.|
|system.load.5 (gauge)   |The average system load over five minutes.|
|system.load.norm.1 (gauge)  |The average system load over one minute normalized by the number of CPUs.|
|system.load.norm.15 (gauge) |The average system load over fifteen minutes normalized by the number of CPUs.|
|system.load.norm.5 (gauge)  |The average system load over five minutes normalized by the number of CPUs. |
 

The system.load.* metric is Unix specific, it conveys the average amount of resources either waiting to use or currently using the CPU. Each process waiting to use or using the CPU increases the load number by 1. The number at the end of the metric name indicates the average number of these processes in the previous X minutes. For system.load.5, this would be the average over the last 5 minutes. A value of 0 indicates a completely idle CPU, and a number equal to the number of CPU cores in the environment indicates that the CPU can handle every request coming in with no delay. Any number greater than this means that processes are waiting to use the CPU. 

## Where is System Load for Windows? 

While Windows does not offer this exact metric, there is an equivalent option that's available by default in the system metrics: system.proc.queue.length. The system.proc.queue.length metric allows you to see the number of threads that are observed as delayed in the processor ready queue and are waiting to be executed. 

