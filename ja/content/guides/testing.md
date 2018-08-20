---
autotocdepth: 2
kind: guide
listorder: 10
placeholder: true
title: Testing Integrations
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

<style>
.func-p{margin-left:20px;}
.func-code{margin-left:40px;}
</style>

## Overview

Automated unit tests help ensure that your integration is working as designed and guard against regression.

Though we don't require tests for each metric collected, we strongly encourage you to provide as much coverage as possible.

## Adding Tests

Tests can be easily added by extending the `AgentCheckTest` class. Additionally, you may import Attributes from Nose to manage requirements.

~~~
from nose.plugins.attrib import attr
from tests.checks.common import AgentCheckTest

@attr(requires='network')
class HTTPCheckTest(AgentCheckTest)`
  ...
~~~

### Datadog Integrations

To test integrations, add your test code to the `test_[integration_name].py` file in your integration directory. [Creating New Integrations](/guides/integration_sdk/#testing-your-integration) for more details.

### Datadog Agent Checks

If you are submitting your Agent Check as a Pull Request to be included with the Datadog Agent, please reference the [`README.md` in the dd-agent repository](https://github.com/DataDog/dd-agent/blob/master/tests/README.md).

## The AgentCheckTest Class

The following test methods are provided by the `AgentCheckTest` class. For more details about the class, please reference the [source code](https://github.com/DataDog/dd-agent/blob/master/tests/checks/common.py).

### Test and Check Status Methods

#### `coverage_report()`

Prints the test coverage status of metrics, events, service checks and service metadata. Also lists items for each that lack test coverage.

#### `print_current_state()`

Prints a report of the metrics, events, service checks, service metadata and warnings provided by the integration.

### Run Checks Methods

#### `run_check(config, agent_config=None, mocks=None, force_reload=False)`

Parameters:

* **config** (*dictionary*) – A check configuration dictionary containing an array of `instances`. For example:

~~~
{
    'instances': [
        {
            'name': 'simple_config',
            'url': 'http://httpbin.org',
        }
    ]
}
~~~

* **agent_config** (*dictionary*) – A customized Datadog agent configuration.
* **mocks** (*dictionary*) – A dictionary keyed by method name (string) with values of method. For example:

~~~
{
    'get_services_in_cluster': self.mock_get_services_in_cluster,
    'get_nodes_with_service': self.mock_get_nodes_with_service,
}
~~~

* **force_reload** (*boolean*) – Reload the check before running it.

#### `run_check_twice(config, agent_config=None, mocks=None, force_reload=False)`

Similar to `run_check`, this method will run the check twice with a 1 second delay between runs.

#### `run_check_n(config, agent_config=None, mocks=None, force_reload=False, repeat=1, sleep=1)`

Similar to `run_check`, this method will run the check multiple times.

Parameters:

* **repeat** (*integer*) – The number of times the check will run.
* **sleep** (*integer*) – The delay in seconds between check runs.

### Metric Methods

#### `assertMetric(metric_name, value=None, tags=None, count=None, at_least=1, hostname=None, device_name=None, metric_type=None)`

Parameters:

* **metric_name** (*string*) – The name of the metric.
* **value** (*variable*) – The value for the metric.
* **tags** (*list of strings*) – The tags associated with the metric.
* **count** (*integer*) – The number of candidate metrics the assertion should test for. Typical values are:
  * `None`: will not test for the count
  * `1`: tests for exactly one metric
  * `0`: tests for no matches (works as a negation)
* **at_least** (*integer*) – The minimum number of candidate metrics the assertion should test for.
* **hostname** (*string*) – The name of the host associated with the metric.
* **device_name** (*string*) – The name of the device associated with the metric.
* **metric_type** (*string*) – The type of metric to test for. If set, it must be one of `gauge`, `counter`, `rate`, or `count` as defined by the [checks metric types](https://github.com/DataDog/dd-agent/blob/master/checks/metric_types.py).

#### `assertMetricTagPrefix(metric_name, tag_prefix, count=None, at_least=1)`

Parameters:

* **metric_name** (*string*) – The name of the metric.
* **tag_prefix** (*string*) – Match metrics with tags that begin with this string.
* **count** (*integer*) – The number of data points the assertion should test for.
* **at_least** (*integer*) – The minimum number of data points the assertion should test for.

#### `assertMetricTag(metric_name, tag, count=None, at_least=1)`

Parameters:

* **metric_name** (*string*) – The name of the metric.
* **tag** (*string*) – The tag associated with the metric.
* **count** (*integer*) – The number of data points the assertion should test for.
* **at_least** (*integer*) – The minimum number of data points the assertion should test for.

### Service Methods

#### `assertServiceMetadata(meta_keys, count=None, at_least=1)`

Parameters:

* **meta_keys** (*list of strings*) – A list of metadata keys.
* **count** (*integer*) – The number of candidate metrics the assertion should test for. Typical values are:
  * `None`: will not test for the count
  * `1`: tests for exactly one metric
  * `0`: tests for no matches (works as a negation)
* **at_least** (*integer*) – The minimum number of candidate metrics the assertion should test for.

##### `assertServiceCheck(service_check_name, status=None, tags=None, count=None, at_least=1)`

##### `assertServiceCheckOK(service_check_name, tags=None, count=None, at_least=1)`

##### `assertServiceCheckWarning(service_check_name, tags=None, count=None, at_least=1)`

##### `assertServiceCheckCritical(service_check_name, tags=None, count=None, at_least=1)`

##### `assertServiceCheckUnknown(service_check_name, tags=None, count=None, at_least=1)`

Parameters:

* **service_check_name** (*string*) – The name of the service check.
* **tags** (*list of strings*) – The tags associated with the service check.
* **count** (*integer*) – The number of data points the assertion should test for.
* **at_least** (*integer*) – The minimum number of data points the assertion should test for.

### Event Method

#### `assertEvent(msg_text, count=None, at_least=1, exact_match=True, tags=None, **kwargs)`

Parameters:

* **msg_text** (*string*) – The event message text.
* **count** (*integer*) – The number of candidate metrics the assertion should test for. Typical values are:
  * `None`: will not test for the count
  * `1`: tests for exactly one metric
  * `0`: tests for no matches (works as a negation)
* **at_least** (*integer*) – The minimum number of candidate metrics the assertion should test for.
* **exact_match** (*boolean*) – When true, the event message text must equal `msg_text`. When false, the event message text must contain `msg_text`.
* **tags** (*list of strings*) – The tags associated with the event.
* **kwargs** – Keyword arguments can be used to match additional event attributes.

### Warning Method

#### `assertWarning(warning, count=None, at_least=1, exact_match=True)`

Parameters:

* **warning** (*string*) – The warning message text.
* **count** (*integer*) – The number of candidate warnings the assertion should test for. Typical values are:
  * `None`: will not test for the count
  * `1`: tests for exactly one warning
  * `0`: tests for no matches (works as a negation)
* **at_least** (*integer*) – The minimum number of candidate warnings the assertion should test for.
* **exact_match** (*boolean*) – When true, the warning message text must equal `warning`. When false, the event message text must contain `warning`.

### Helper Methods

The `AgentCheckTest` class provides some useful test methods that are not specifically related to Datadog metrics and events.

#### `assertIn(first, second)`

#### `assertNotIn(first, second)`

These methods test if the first argument is contained in the second argument using Python's `in` operator.

Parameters:

* **first** (*multiple types*) – The "needle" data.
* **second** (*multiple types*) – The "haystack" data.

## Examples

### Datadog Integrations

For further examples of testing Datadog integrations, you can view the test files for [core integrations](https://github.com/DataDog/integrations-core) such as the [`test_mysql.py` file](https://github.com/DataDog/integrations-core/blob/master/mysql/test/test_mysql.py) for the MySQL integration.

### Datadog Agent Checks

For examples of Agent Check tests, you can view the test files for agent checks such as [`test_http_check.py` file](https://github.com/DataDog/integrations-core/tree/master/http_check/test).
