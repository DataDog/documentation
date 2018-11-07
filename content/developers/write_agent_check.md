---
title: Writing an Agent check
kind: documentation
further_reading:
- link: "/developers/integrations/new_check_howto/"
  tag: "Documentation"
  text: "Create a new Integration"
---

## Overview
This page looks at a simple custom Agent check and the `min_collection_interval`. Custom Agent checks are included in the main check run loop, meaning they run every check interval, which defaults to 15 seconds.

### Should you write an Agent check or an Integration?
Agent checks are a great way to collect metrics from custom applications or unique systems. However, if you are trying to collect metrics from a generally available application, public service or open source project, we recommend that you [create an Integration][1].

Starting with version 5.9 of the Datadog Agent, a new method for creating integrations is available. This allows integrations to be released and updated independently from Datadog Agent updates, it also provides an easier way for you to share integrations and makes it easier for the wider Datadog community to use your integrations.

For more information about how to write an integration, see [Creating New Integrations][1] and check out the [integrations-extras GitHub repository][2] to see other contributed integrations.

## Setup
First, ensure the [Agent][3] is properly installed. If you run into any issues during the setup, [contact Datadog support][4].

## Custom Agent check

<div class="alert alert-warning">
  The names of the configuration and check files must match. If your check is called <code>mycheck.py</code> your configuration file <em>must</em> be	named <code>mycheck.yaml</code>.
</div>

In this example, the custom check sends a value of `1` for the metric `hello.world`. The configuration file is necessary but includes no real information. This goes in `conf.d/hello.yaml`:

```yaml
init_config:
 instances:
    [{}]
```

The check itself inherits from `AgentCheck` and sends a gauge of `1` for `hello.world` on each call. This goes in `checks.d/hello.py`:

```python
__version__ = "1.0.0"
from checks import AgentCheck
class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1)
```

### Collection interval
To changed the collection interval of your check, use `min_collection_interval`. The default value is `15` which means it's collected at the same interval as the rest of the integrations on the Agent.

{{< tabs >}}
{{% tab "Agent v6" %}}
For Agent 6, `min_collection_interval` must be added at an instance level and is configured individually for each instance.

```yaml
init_config:

 instances:
    - min_collection_interval: 30
```
 {{% /tab %}}
{{% tab "Agent v5" %}}
For Agent 5, `min_collection_interval` is added to the `init_config` section to define how often the check is run globally.

```yaml
init_config:
  min_collection_interval: 30

  instances:
    [{}]
```
{{% /tab %}}
{{< /tabs >}}

**Note**: If the `min_collection_interval` is set to `30`, it does not mean that the metric is collected every 30 seconds, but rather that it could be collected as often as every 30 seconds. The collector runs every 15-20 seconds depending on how many integrations are enabled. If the interval on this Agent happens to be every 20 seconds, then the Agent collects and includes the Agent check. The next time it collects 20 seconds later, it sees that 20 is less than 30 and doesn't collect the custom Agent check. The next time it sees that the time since last run was 40 which is greater than 30 and collects the custom Agent check.

## Verifying your check

To verify your check is running, use the following command:

{{< tabs >}}
{{% tab "Agent v6" %}}
 ```
sudo -u dd-agent -- datadog-agent check <check_name>
```
 {{% /tab %}}
{{% tab "Agent v5" %}}
 ```
sudo -u dd-agent -- dd-agent check <check_name>
```
{{% /tab %}}
{{< /tabs >}}




## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/integrations/new_check_howto/
[2]: https://github.com/DataDog/integrations-extras
[3]: http://app.datadoghq.com/account/settings#agent
[4]: /help/
