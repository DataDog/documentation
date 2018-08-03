---
title: Writing an Agent check
kind: documentation
aliases:
  - /guides/agent_checks/
  - /agent/agent_checks
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
---

## Overview

This page first looks at the `AgentCheck` interface, and then proposes a simple Agent check that collects timing metrics and status events from HTTP services.  

Custom Agent checks are included in the main check run loop, meaning they run every check interval, which defaults to 15 seconds.

### Should you write an Agent check or an Integration?

Agent checks are a great way to collect metrics from custom applications or unique systems. However, if you are trying to collect metrics from a generally available application, public service or open source project, we recommend that you write [an Integration][5].

Starting with version 5.9 of the Datadog Agent, a new method for creating integrations is available. This allows integrations to be released and updated independently from Datadog Agent updates, it also provides an easier way for you to share integrations and makes it easier for the wider Datadog community to use your integrations.

For more information about how to write an integration, see [Creating New Integrations][1] and check out the [integrations-extras GitHub repository][2] to see other contributed integrations.

## Setup

First off, ensure you've properly installed the [Agent][3] on your machine. If you run into any issues during the setup, [contact our support][4].

## `AgentCheck` interface

All custom Agent checks inherit from the `AgentCheck` class found in `checks/__init__.py` and require a `check()` method that takes one argument, `instance` which is a `dict` having the configuration of a particular instance. The `check` method is run once per instance defined in the check configuration (discussed later).

**Note**: 

* Custom Agent checks aren't able to import modules by default, all your code should be in one single file. [Learn how to add custom python package to the Agent][12])
* The Datadog Agent installation has its own embedded copy of Python. Custom scripts importing pip-installed libraries will fail unless Datadog's own embedded copy of pip is used to install these third-party libraries.

### `AgentCheck` interface for Agent v6

There are some differences between Agent v5 and Agent v6:

* Each check instance is now its own instance of the class, so state cannot be shared between them, respectively.
* The following methods have been removed from `AgentCheck`:

    - `_roll_up_instance_metadata`
    - `instance_count`
    - `is_check_enabled`
    - `read_config`
    - `set_check_version`
    - `set_manifest_path`
    - `_get_statistic_name_from_method`
    - `_collect_internal_stats`
    - `_get_internal_profiling_stats`
    - `_set_internal_profiling_stats`
    - `get_library_versions`
    - `get_library_info`
    - `from_yaml`
    - `get_service_checks`
    - `has_warnings`
    - `get_metrics`
    - `has_events`
    - `get_events`

* The function signature of the metric senders changed from:

    ```python
    gauge(self, metric, value, tags=None, hostname=None, device_name=None, timestamp=None)
    ```

    to:

    ```python
    gauge(self, name, value, tags=None, hostname=None, device_name=None)
    ```

### Sending metrics

Sending metrics in a check is easy. If you're already familiar with the
methods available in [DogStatsD][6], then the transition is very simple.

You have the [following methods][6] available to you:

    self.gauge( ... ) # Sample a gauge metric

    self.increment( ... ) # Increment a counter metric

    self.decrement( ... ) # Decrement a counter metric

    self.histogram( ... ) # Sample a histogram metric

    self.rate( ... ) # Sample a point, with the rate calculated at the end of the check

    self.count( ... ) # Sample a raw count metric

    self.monotonic_count( ... ) # Sample an increasing counter metric

All of these methods take the following arguments:

- `metric`: The name of the metric
- `value`: The value for the metric (defaults to 1 on increment, -1 on decrement)
- `tags`: (optional) A list of tags to associate with this metric.
- `hostname`: (optional) A hostname to associate with this metric. Defaults to the current host.
- `device_name`: (optional) A device name to associate with this metric.

These methods may be called from anywhere within your check logic. At the end of your `check` function, all metrics that were submitted are collected and
flushed out with the other Agent metrics.

### Sending events

At any time during your check, make a call to `self.event(...)` with one argument: the payload of the event. Your event should be structured like this:

```
{
    "timestamp": int, the epoch timestamp for the event,
    "event_type": string, the event name,
    "api_key": string, the api key for your account,
    "msg_title": string, the title of the event,
    "msg_text": string, the text body of the event,
    "aggregation_key": string, a key to use for aggregating events,
    "alert_type": (optional) string, one of ('error', 'warning', 'success', 'info');
        defaults to 'info',
    "source_type_name": (optional) string, the source type name,
    "host": (optional) string, the name of the host,
    "tags": (optional) list, a list of tags to associate with this event
    "priority": (optional) string which specifies the priority of the event (Normal, Low)
}
```

At the end of your check, all events are collected and flushed with the rest of the Agent payload.

### Sending service checks

Your custom Agent check can also report the status of a service by calling the `self.service_check(...)` method.

The service_check method accepts the following arguments:

- `check_name`: The name of the service check.
- `status`: An integer describing the service status. You may also use the class status definitions:
  - `AgentCheck.OK` or `0` for success
  - `AgentCheck.WARNING` or `1` for warning
  - `AgentCheck.CRITICAL` or `2` for failure
  - `AgentCheck.UNKNOWN` or `3` for indeterminate status
- `tags`: (optional) A list of key:val tags for this check.
- `timestamp`: (optional) The POSIX timestamp when the check occurred.
- `hostname`: (optional) The name of the host submitting the check. Defaults to the host_name of the Agent.
- `check_run_id`: (optional) An integer ID used for logging and tracing purposes. The ID doesn't need to be unique. If an ID is not provided, one is automatically generated.
- `message`: (optional) Additional information or a description of why this status occurred.

### Exceptions

If a check cannot run because of improper configuration, programming error, or
because it could not collect any metrics, it should raise a meaningful exception. This exception is logged and is shown in the Agent [info command][7] for easy debugging. For example:

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: ConnectionError('Connection refused.',)
          - Collected 0 metrics & 0 events

### Logging

As part of the parent class, you're given a logger at `self.log`, so you can do
things like `self.log.info('hello')`. The log handler is `checks.{name}`
where `{name}` is the name of your check (based on the filename of the check
module).

## Configuration

Each check has a [YAML][8] configuration file that is placed in the `conf.d` directory. The file name should match the name of the check module (e.g.: `haproxy.py` and `haproxy.yaml`).  

Due to the way Agent checks are packaged and distributed, custom checks cannot have the same name as a existing check or library within the Agent's embedded environment. Use `pip` to display a list of effectively unusable names:

```
$ sudo /opt/datadog-agent/embedded/bin/pip freeze
```

**Note**: YAML files must use spaces instead of tabs.

The configuration file has the following structure:

```yaml
init_config:
    key1: val1
    key2: val2

instances:
    - username: jon_smith
      password: 1234
      min_collection_interval: 20
    - username: jane_smith
      password: 5678
      min_collection_interval: 20
```

For Agent 5, `min_collection_interval` can be added to the `init_config` section to help define how often the check should be run globally, or defined at the instance level. For Agent 6, `min_collection_interval` must be added at an instance level, and can be configured individually for each instance. 

If it is greater than the interval time for the Agent collector, a line is added to the log stating that collection for this script was skipped. The default is `0` which means it's collected at the same interval as the rest of the integrations on that Agent.
If the value is set to `30`, it does not mean that the metric is collected every 30 seconds, but rather that it could be collected as often as every 30 seconds.

The collector runs every 15-20 seconds depending on how many integrations are enabled. If the interval on this Agent happens to be every 20 seconds, then the Agent collects and includes the Agent check. The next time it collects 20 seconds later, it sees that 20 is less than 30 and doesn't collect the custom Agent check. The next time it sees that the time since last run was 40 which is greater than 30 and therefore the Agent check is collected.

### init_config

The *init_config* section allows you to have an arbitrary number of global
configuration options that is available on every run of the check in
`self.init_config`.

### instances

The *instances* section is a list of instances that this check is run
against. Your actual `check()` method is run once per instance. This means that
every check supports multiple instances out of the box.

## Directory structure

Before starting your first check it is worth understanding the checks directory
structure. Add files for your check in the  `checks.d` folder, which lives in your Agent root.

## Your first check

<div class="alert alert-warning">
The names of the configuration and check files must match. If your check
is called <code>mycheck.py</code> your configuration file <em>must</em> be
named <code>mycheck.yaml</code>.
</div>

To start off simple, write a check that does nothing more than sending a
value of 1 for the metric `hello.world`. The configuration file is very
simple, including no real information. This goes into `conf.d/hello.yaml`:

```yaml
init_config:

instances:
    [{}]

```

The check itself inherits from `AgentCheck` and send a gauge of `1` for
`hello.world` on each call. This goes in `checks.d/hello.py`:

```python
from checks import AgentCheck
class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1)
```

## An HTTP check

Let's write a basic check that checks the status of an HTTP endpoint. On each run of the check, a *GET* request is made to the HTTP endpoint. Based on the response, one of the following happens:

* If the response is successful (response is 200, no timeout) the response time is submitted as a metric.
* If the response times out, an event is submitted with the URL and timeout.
* If the response code != 200, an event is submitted with the URL and the response code.

### Configuration

First let's define how the configuration should look so that we know how to handle the structure of the `instance` payload that is passed into the call to `check`.

Besides just defining a URL per call, it'd be nice to allow you to set a timeout for each URL. We'd also want to be able to configure a default timeout if no timeout value is given for a particular URL.

So our final configuration looks something like this:

```yaml
init_config:
    default_timeout: 5

instances:
    -   url: https://google.com

    -   url: http://httpbin.org/delay/10
        timeout: 8

    -   url: http://httpbin.org/status/400

```

### The check

Now let's define our check method. The main part of the check makes
a request to the URL and time the response time, handling error cases as it goes.

In this snippet, we start a timer, make the GET request using the [requests library][9] ([Learn how to add custom python package to the Agent][12]) and handle and errors that might arise.

```python
# Load values from the instance config
url = instance['url']
default_timeout = self.init_config.get('default_timeout', 5)
timeout = float(instance.get('timeout', default_timeout))

# Use a hash of the URL as an aggregation key
aggregation_key = md5(url).hexdigest()

# Check the URL
start_time = time.time()
try:
    r = requests.get(url, timeout=timeout)
    end_time = time.time()
except requests.exceptions.Timeout as e:
    # If there's a timeout
    self.timeout_event(url, timeout, aggregation_key)

if r.status_code != 200:
    self.status_code_event(url, r, aggregation_key)
```

If the request passes, we want to submit the timing to Datadog as a metric. Let’s call it `http.response_time` and tag it with the URL.

```python
timing = end_time - start_time
self.gauge('http.response_time', timing, tags=["url:"+url]
```

Finally, define what happens in the error cases. We have already
seen that we call `self.timeout_event` in the case of a URL timeout and
we call `self.status_code_event` in the case of a bad status code. Let's
define those methods now.

First, define `timeout_event`. Note that we want to aggregate all of these events together based on the URL so we define the aggregation_key as a hash of the URL.

```python
def timeout_event(self, url, timeout, aggregation_key):
    self.event({
        'timestamp': int(time.time()),
        'event_type': 'http_check',
        'msg_title': 'URL timeout',
        'msg_text': '%s timed out after %s seconds.' % (url, timeout),
        'aggregation_key': aggregation_key
    })
```

Next, define `status_code_event` which looks very similar to the timeout event method.

```python
def status_code_event(self, url, r, aggregation_key):
    self.event({
        'timestamp': int(time.time()),
        'event_type': 'http_check',
        'msg_title': 'Invalid response code for %s' % url,
        'msg_text': '%s returned a status of %s' % (url, r.status_code),
        'aggregation_key': aggregation_key
    })
```

### Putting It All Together

The entire check would be placed into the `checks.d` folder as `http.py`. The corresponding configuration would be placed into the `conf.d` folder as `http.yaml`.

Once the check is in `checks.d`, test it by running it as a python script. [Restart the Agent][10] for the changes to be enabled. **Make sure to change the conf.d path in the test method**. From your Agent root, run:

* For Agent v5:
  `sudo -u dd-agent -- dd-agent check <check_name>`

* For Agent v6:
  `sudo -u dd-agent -- datadog-agent check <check_name>`

And confirm what metrics and events are being generated for each instance.

Here's the full source of the check:

```python
import time
import requests

from checks import AgentCheck
from hashlib import md5

class HTTPCheck(AgentCheck):
    def check(self, instance):
        if 'url' not in instance:
            self.log.info("Skipping instance, no url found.")
            return

        # Load values from the instance configuration
        url = instance['url']
        default_timeout = self.init_config.get('default_timeout', 5)
        timeout = float(instance.get('timeout', default_timeout))

        # Use a hash of the URL as an aggregation key
        aggregation_key = md5(url).hexdigest()

        # Check the URL
        start_time = time.time()
        try:
            r = requests.get(url, timeout=timeout)
            end_time = time.time()
        except requests.exceptions.Timeout as e:
            # If there's a timeout
            self.timeout_event(url, timeout, aggregation_key)
            return

        if r.status_code != 200:
            self.status_code_event(url, r, aggregation_key)

        timing = end_time - start_time
        self.gauge('http.response_time', timing, tags=['http_check'])

    def timeout_event(self, url, timeout, aggregation_key):
        self.event({
            'timestamp': int(time.time()),
            'event_type': 'http_check',
            'msg_title': 'URL timeout',
            'msg_text': '%s timed out after %s seconds.' % (url, timeout),
            'aggregation_key': aggregation_key
        })

    def status_code_event(self, url, r, aggregation_key):
        self.event({
            'timestamp': int(time.time()),
            'event_type': 'http_check',
            'msg_title': 'Invalid response code for %s' % url,
            'msg_text': '%s returned a status of %s' % (url, r.status_code),
            'aggregation_key': aggregation_key
        })
```

## Troubleshooting

[Refer to the Agent dedicated troubleshooting documentation page][13]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/integrations/integration_sdk/
[2]: https://github.com/DataDog/integrations-extras
[3]: http://app.datadoghq.com/account/settings#agent
[4]: /help/
[5]: /developers/integrations
[6]: /developers/dogstatsd
[7]: /agent/faq/agent-commands/#agent-status-and-information
[8]: http://www.yaml.org/
[9]: http://docs.python-requests.org/en/latest/
[10]: /agent/faq/agent-commands
[11]: /help
[12]: /agent/custom_python_package/
[13]: /agent/troubleshooting/#status-of-an-agent-check
