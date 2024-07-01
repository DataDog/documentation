---
title: Writing a Custom Agent Check
kind: documentation
aliases:
    - /agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
    - /agent/faq/agent-5-custom-agent-check/
    - /developers/write_agent_check/
further_reading:
- link: /developers/
  tag: Documentation
  text: Developing on Datadog
---

## Overview

This page takes you through building a sample custom Agent check using the `min_collection_interval` and provides an example use case to expand the sample custom check. Custom checks run at a fixed interval, the same as Agent-based integrations, which defaults to every 15 seconds.

## Setup

### Installation

To create a custom Agent check, start by installing the [Datadog Agent][1].

**Note**: If you are running Agent v7+, your custom Agent check should be Python 3 compatible. Otherwise, it should be Python 2.7+ compatible.

### Configuration

1. Change to the `conf.d` directory on your system. For more information about where to find the `conf.d` directory, see [Agent configuration files][2].
2. In the `conf.d` directory, create a new config file for your new Agent check. Name the file `custom_checkvalue.yaml`.
3. Edit the file to include the following:
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. Create a check file in the `checks.d` directory. Name the file `custom_checkvalue.py`.
   <div class="alert alert-info">The names of the configuration and check files must match. If your check is called `custom_checkvalue.py`, your configuration file *must* be named `custom_checkvalue.yaml`.</div> 
5. Edit the file to include the following:
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Restart the Agent][3]. Within a minute, you should see a new metric show up in the [Metric Summary][4] called `hello.world`.

The python check file must be readable and executable by the Agent user.

### Results

Within a minute, you should see a new metric show up in the [Metric Summary][4] called `hello.world` that sends a value of `1`.

**Note**: When choosing a name for your custom check, you should prefix it with `custom_` to avoid conflict with the name of a preexisting Datadog Agent integrations. For instance, if you have a custom Postfix check, name your check files `custom_postfix.py` and `custom_postfix.yaml` instead of `postfix.py` and `postfix.yaml`.

### Updating the collection interval

To change the collection interval of your check, use `min_collection_interval` in your `custom_checkvalue.yaml` file. The default value is `15`. For Agent v6, the `min_collection_interval` must be added at an instance level and configured individually per instance. For example:

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

**Note**: If the `min_collection_interval` is set to `30`, it does not mean that the metric is collected every 30 seconds, but rather that it could be collected as often as every 30 seconds. The collector tries to run the check every 30 seconds, but the check might need to wait in line, depending on how many integrations and checks are enabled on the same Agent. Also, if the `check` method takes more than 30 seconds to finish, the Agent notices that the check is still running and skips its execution until the next interval.

### Verifying your check

To verify your check is running, use the following command:

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

Once you see the check is running, [restart your Agent][3] to include your check and start reporting data into Datadog.

## Writing checks that run command-line programs

It's possible to create a custom check that runs a command-line program and captures its output as a custom metric. For example, a check can run the `vgs` command to report information about volume groups.

To run a subprocess within a check, use the [`get_subprocess_output()` function][5] from the module `datadog_checks.base.utils.subprocess_output`. The command and its arguments are passed to `get_subprocess_output()` in the form of a list, with the command and its arguments as a string within the list.

### Example

For example, a command that is entered at the command prompt like this:

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

must be passed to `get_subprocess_output()` like this:

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

**Note**: Since the Python interpreter that runs the checks is embedded in the multi-threaded Go runtime, using the `subprocess` or `multithreading` modules from the Python standard library is not supported in Agent version 6 and later.

### Results

When you run the command-line program, the check captures the same output as running on the command line in the terminal. Do string processing on the output and call `int()` or `float()` on the result to return a numerical type.

If you do not do string processing on the output of the subprocess, or if it does not return an integer or a float, the check appears to run without errors but doesn't report any data.

Here is an example of a check that returns the results of a command-line program:

{{< code-block lang="python" >}}
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() returns an int by default
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## Sending data from a load balancer

A common use case for writing a custom Agent check is to send Datadog metrics from a load balancer. Before you get started, follow the steps in [Configuration](#configuration).

To expand the files to send data from your load balancer:

1. Replace the code in `custom_checkvalue.py` with the following (replacing the value of `lburl` with the address of your load balancer):
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
import urllib2
import simplejson
from checks import AgentCheck

class CheckValue(AgentCheck):
  def check(self, instance):
    lburl = instance['ipaddress']
    response = urllib2.urlopen("http://" + lburl + "/rest")
    data = simplejson.load(response)

    self.gauge('coreapp.update.value', data["value"])
{{< /code-block >}}

1. Update the `custom_checkvalue.yaml` file (replacing `ipaddress` with your load balancer's IP address):
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - ipaddress: 1.2.3.4
{{< /code-block >}}

1. [Restart your Agent][3]. Within a minute, you should see a new metric show up in the [Metric Summary][4] called `coreapp.update.value` that sends the metrics from your load balancer.
1. [Create a dashboard][6] for this metric.

## Agent versioning

Use the following try/except block to make the custom check compatible with any Agent version:

{{< code-block lang="python" >}}
try:
    # first, try to import the base class from new versions of the Agent
    from datadog_checks.base import AgentCheck
except ImportError:
    # if the above failed, the check is running in Agent version < 6.6.0
    from checks import AgentCheck

# content of the special variable __version__ will be shown in the Agent status page
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings/agent/latest
[2]: /agent/configuration/agent-configuration-files#agent-configuration-directory
[3]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /dashboards/
