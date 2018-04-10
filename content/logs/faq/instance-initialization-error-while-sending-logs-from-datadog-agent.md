---
title: Instance Initialization Error while sending logs from Datadog Agent
kind: faq
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Learn how to collect your logs
- link: "logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers"
  tag: "FAQ"
  text: How to Send Logs to Datadog via External Log Shippers?
- link: "logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
---

If you are collecting logs into your Datadog account via the Datadog agent, you may find this error in your `agent.log` log file or in your agent's status output:

```
Instance #initialization[ERROR]:{“Core Check Loader”:“Check <config_name> not found in Catalog”,“JMX Check Loader”:“check is not a jmx check, or unable to determine if it’s so”,“Python Check Loader”:“No module named <config_name>”}
```

or the similar message in your agent's status output:

```
 Loading Errors
  ==============
    <config_name>
    -----------
      Core Check Loader: Check <config_name> not found in Catalog
      JMX Check Loader: check is not a jmx check, or unable to determine if it's so
      Python Check Loader: No module named <config_name>
```

This error is benign and is temporarily the intended behavior while the logs product is in beta. It indicates that the Datadog agent did not find any python check whose name corresponds with the configuration file that contains your logs.

If you wish to silence this error, an easy way to do so is to add an agent check with the same name as the configuration file that contains your logs configurations. So if you had added log configurations to `conf.d/my_logs.yaml` or `conf.d/my_logs.d/conf.yaml`, add a `checks.d/my_logs.py` with the following content:

```python
class MyEmptyCheck(AgentCheck):
    def check(self, instance):
        foo = "bar"
```

{{< partial name="whats-next/whats-next.html" >}}

