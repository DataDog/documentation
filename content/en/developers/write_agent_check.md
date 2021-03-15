---
title: Writing a Custom Agent Check
kind: documentation
aliases:
    - /agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
    - /agent/faq/agent-5-custom-agent-check/
further_reading:
- link: "/developers/integrations/new_check_howto/"
  tag: "Documentation"
  text: "Create a new Integration"
---

## Overview

This page looks at a simple custom Agent check and the `min_collection_interval`. Same as regular Agent based integrations, custom checks are scheduled to run at a fixed interval, which defaults to every 15 seconds.

### Should you write an Agent check or an Integration?

Custom checks are well suited to collect metrics from custom applications or unique systems. However, if you are trying to collect metrics from a generally available application, public service, or open source project, it is recommended that you [create a full fledged Agent Integration][1].

Datadog Agent v6.4+ allows integrations to be released and updated independently from Datadog Agent updates. It also provides an easier way for you to share integrations—and makes it easier for the wider Datadog community to use your integrations.

For more information about how to write an integration, see [Creating New Integrations][1]. Refer to the [integrations-extras GitHub repository][2] to see other contributed integrations.

## Setup

First, ensure the [Agent][3] is properly installed. If you run into any issues during the setup, [contact Datadog support][4].

**Note**: If you are running Agent v7+ your custom Agent check should be Python 3 compatible. Otherwise, it should be Python 2.7+ compatible.

## Custom Agent check

<div class="alert alert-warning">
  The names of the configuration and check files must match. If your check is called <code>mycheck.py</code>, your configuration file <em>must</em> be named <code>mycheck.yaml</code>.
</div>

In this example, the custom check sends a value of `1` for the metric `hello.world`. The configuration file includes no real information but it is necessary to include a sequence called `instances` containing at least one mapping, that can be empty. This goes in `conf.d/hello.yaml`:

```yaml
instances: [{}]
```

The check itself inherits from `AgentCheck` and sends a gauge of `1` for `hello.world` on each call. This goes in `checks.d/hello.py`:

{{< code-block lang="python" filename="hello.py" >}}
# the following try/except block will make the custom check compatible with any Agent version
try:
    # first, try to import the base class from new versions of the Agent...
    from datadog_checks.base import AgentCheck
except ImportError:
    # ...if the above failed, the check is running in Agent version < 6.6.0
    from checks import AgentCheck

# content of the special variable __version__ will be shown in the Agent status page
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

For more details about the interface provided by the base class, browse the [API documentation][5].

**Note**: When choosing a name for your custom check, you should prefix it with `custom_` in order to avoid conflict with the name of a preexisting Datadog Agent integrations. For instance, if you have a custom Postfix check, name your check files `custom_postfix.py` and `custom_postfix.yaml` instead of `postfix.py` and `postfix.yaml`.

### Collection interval

To change the collection interval of your check, use `min_collection_interval` in the configuration file. The default value is `15` which means the `check` method from your class is invoked with the same interval as the rest of the integrations on the Agent.

**Note**: The `min_collection_interval` parameter is available for both standard and custom integrations.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
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

instances: [{}]
```

{{% /tab %}}
{{< /tabs >}}

**Note**: If the `min_collection_interval` is set to `30`, it does not mean that the metric is collected every 30 seconds, but rather that it could be collected as often as every 30 seconds. The collector will try to run the check every 30 seconds but the check might need to wait in line, depending on how many integrations are enabled on the same Agent. Also if the `check` method takes more than 30 seconds to finish, the Agent will notice the check is still running and will skip its execution until the next interval.

## Verifying your check

To verify your check is running, use the following command:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

```shell
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo -u dd-agent -- dd-agent check <CHECK_NAME>
```

{{% /tab %}}
{{< /tabs >}}

Once verified, restart the Agent to include it and start reporting data into Datadog.

## Writing checks that run command line programs

It's possible to create a custom check that runs a command line program and captures its output as a custom metric. For example, a check can run the `vgs` command to report information about volume groups. A wrapper function is provided for convenience to avoid the boilerplate around shelling out another process and collecting its output and exit code.

To run a subprocess within a check, use the [`get_subprocess_output()` function][6] from the module `datadog_checks.base.utils.subprocess_output`. The command and its arguments are passed to `get_subprocess_output()` in the form of a list, with the command and each of its arguments as a string within the list. For instance, a command that is entered at the command prompt like this:

```text
$ vgs -o vg_free
```

must be passed to `get_subprocess_output()` like this:

```python
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
```

<div class="alert alert-warning">
    Since the Python interpreter that runs the checks is embedded in the multi-threaded Go runtime, using the <code>subprocess</code> or <code>multithreading</code> modules from the Python standard library <em>is not supported</em> in Agent version 6 and later.
</div>

When the command line program is run, the check captures the same output as if it were run on the command line in the terminal. It is important to do string processing on the output and call `int()` or `float()` on the result, so that it returns a numerical type.

If you do not do string processing on the output of the subprocess, or if it does not return an integer or a float, the check appears to run without errors, but doesn't report any data.

Here is an example of a check that returns the results of a command line program:

```python
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() returns an int by default
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/integrations/new_check_howto/
[2]: https://github.com/DataDog/integrations-extras
[3]: http://app.datadoghq.com/account/settings#agent
[4]: /help/
[5]: https://datadoghq.dev/integrations-core/base/api/#datadog_checks.base.checks.base.AgentCheck
[6]: https://datadog-checks-base.readthedocs.io/en/latest/datadog_checks.utils.html#module-datadog_checks.base.utils.subprocess_output
