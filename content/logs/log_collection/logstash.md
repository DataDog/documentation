---
title: Logstash Log collection
kind: Documentation
description: "Configure Logstash to gather logs from your host, containers & services."
---

We have [an ouput plugin][1] for Logstash that takes care of sending your logs to your Datadog platform.

To install this plugin run the following command:

* `logstash-plugin install logstash-output-datadog_logs`

Then Configure datadog_logs plugin with your Datadog API key:

```
output {
    datadog_logs {
        api_key => "<your_datadog_api_key>"
    }
}
```

## Add metadata to your logs

In order to get the best use out of your logs in Datadog, it is important to have the proper metadata associated with your logs (including hostname and source). By default, the hostname and timestamp should be properly remapped thanks to our default [remapping for reserved attributes][2]. To make sure the service is correctly remapped, add its attribute value to the Service remapping list.

### Source

To set the source (Datadog integration name) on your logs to benefit from all the integration automatic setup in your platform, you need to setup a Logstash filter:  

```
filter {
  mutate {
    add_field => {
 "ddsource" => "mysourcevalue"
       }
    }
 }
```

### Custom tags

Host tags are automatically set on your logs if there is a matching hostname in your infrastructure. That said custom tags can be added just for logs thanks to the `ddtags` attribute:

```
filter {
  mutate {
    add_field => {
 "ddtags" => "env:test,key2:value2"
       }
    }
 }
```

[1]: https://github.com/DataDog/logstash-output-datadog_logs
[2]: /logs/#edit-reserved-attributes
