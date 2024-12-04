---
title: HAProxy in multi-process mode

---

When using the HAProxy in multi process mode, each process has its own memory area and therefore has its own statistics.

{{< img src="integrations/faq/haproxy_config_multi_process.png" alt="HAProxy config multi process" style="width:30%;">}}

This implies that each process needs to have a dedicated socket or endpoint for giving access to its statistics.  
Accordingly, in the Datadog configuration file for HAProxy, **each socket or endpoint has to be declared as an instance**.

{{< img src="integrations/faq/haproxy_multi_process_agent_conf.png" alt="HAProxy multiprocess configuration" style="width:50%;">}}

Otherwise they share the same `/haproxy_stats` endpoint, and getting the HAProxy statistics from it shows the stats only for the process assigned to the current request.

{{< img src="integrations/faq/haproxy_stats_1.png" alt="HAProxy stats 1" style="width:85%;" >}}

Refreshing the page in your browser shows the stats from a different process than previously:

{{< img src="integrations/faq/haproxy_stats_2.png" alt=" HAProxy stats 2" style="width:85%;" >}}

If your HAproxy integration is not well configured, you may notice:

* Missing points on HAProxy metrics that are reported as rate [can be checked here][1] and for which you should get a value each 20 seconds.
* High values and high variations on metrics that are low in normal conditions such as 5xx code error responses.

[1]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/haproxy.py
