---
title: Agent Check reports "OK" but Monitor shows Critical
kind: faq
customnav: agentnav
---

An Agent check will report “OK” if a check is properly configured as seen below:

```
  Checks
  ======

    network
    -------
      - instance #0 [OK]
      - Collected 15 metrics, 0 events & 1 service check
```

The [OK] in the Agent output implies that the check was configured/run correctly but does not refer to the value being returned by your check. For example, an http_check could be reporting OK in the output of the Agent info command but the monitor could be reporting Critical. To view the current status of a service check use the [Check Status page](https://app.datadoghq.com/check/summary) which will show you the latest report of any given check.

If you believe you are seeing a discrepancy after please reach out to [us](/help) and submit your logs using the [flare command](/agent/faq/send-logs-and-configs-to-datadog-via-flare-command)