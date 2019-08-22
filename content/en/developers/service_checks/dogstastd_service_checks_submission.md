---
title: Service Checks submission with DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
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

DogStatsD can send service checks to Datadog. Use checks to track the status of services your application depends on:

For Python:
```python

from datadog.api.constants import CheckStatus

# Report the status of an app.
name = 'web.app1'
status = CheckStatus.OK
message = 'Response: 200 OK'

statsd.service_check(check_name=name, status=status, message=message)
```

For Ruby:
```ruby
# Report the status of an app.
name = 'web.app1'
status = Datadog::Statsd::OK
opts = {
  'message' => 'Response: 200 OK'
}

statsd.service_check(name, status, opts)
```

After a service check is reported, use it to trigger a [custom check monitor][1].

[1]: /monitors/monitor_types/custom_check
