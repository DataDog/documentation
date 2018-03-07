## Logstash

We have [an ouput plugin](https://github.com/DataDog/logstash-output-datadog_logs) for Logstash that takes care of sending your logs to your Datadog platform.

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

In order to get the best use out of your logs in Datadog, it is important to have the proper metadata associated with your logs (including hostname and source). By default, the hostname and timestamp should be properly remapped thanks to our default [remapping for reserved attributes](/logs/#edit-reserved-attributes). To make sure the service is correctly remapped, add its attribute value to the Service remapping list.

To set the source on your logs, you need to setup a Logstash filter:  

```
filter {
  mutate {
    add_field => {
 "ddsource" => "mysourcevalue"
       }
    }
 }
```