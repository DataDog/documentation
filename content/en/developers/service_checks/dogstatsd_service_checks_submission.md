---
title: Service Checks submission with DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
disable_toc: true
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "GitHub"
  text: "DogStatsD source code"
---

DogStatsD can send Service Checks to Datadog. Use checks to track the status of services your application depends on:

For Python:

{{< tabs >}}
{{% tab "Python" %}}

```python

from datadog.api.constants import CheckStatus

# Report the status of an app.
name = 'web.app1'
status = CheckStatus.OK
message = 'Response: 200 OK'

statsd.service_check(check_name=name, status=status, message=message)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
# Report the status of an app.
name = 'web.app1'
status = Datadog::Statsd::OK
opts = {
  'message' => 'Response: 200 OK'
}

statsd.service_check(name, status, opts)
```

{{% /tab %}}
{{< /tabs >}}

After a Service Check is reported, use it to trigger a [custom check monitor][1].

## Tagging

Add tags to any Service Check you send to DogStatsD. For example, compare the performance of two algorithms by tagging a timer metric with the algorithm version:

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```


[1]: /monitors/monitor_types/custom_check
