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

After [installing DogStatsD][1], you can send Service Checks to Datadog with the following function:

```
service_check(Name, Status, Tags, Hostname, Message)
```

| Parameter  | Type            | Required | Default Value | Description                                                                                                   |
| ---------  | ----            | -------- | ------------- | -----------                                                                                                   |
| `Name`     | String          | yes      | -             | The name of the service check.                                                                                |
| `Status`   | float           | yes      | -             | A constant describing the service status: `0` for OK, `1` for Warning, `2` for Critical, and `3` for Unknown. |
| `Tags`     | list of strings | no       | `None`        | A list of tags to associate with this Service Check.                                                          |
| `Hostname` | string          | no       | current host  | A hostname to associate with this Service check. Defaults to the current host.                                |
| `Message`  | String          | no       | `None`        | Additional information or a description of why this status occurred.                                          |

Find below examples according to your language:

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
{{% tab "Go" %}}

TO DO

{{% /tab %}}
{{% tab "Java" %}}

```java
ServiceCheck sc = ServiceCheck
      .builder()
      .withName("Service.check.name")
      .withStatus(ServiceCheck.Status.OK)
      .build();
statsd.serviceCheck(sc);
```

{{% /tab %}}
{{% tab ".NET" %}}

TO DO

{{% /tab %}}
{{% tab "PHP" %}}

TO DO

{{% /tab %}}
{{< /tabs >}}

After a Service Check is reported, use it to trigger a [custom check monitor][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /monitors/monitor_types/custom_check
