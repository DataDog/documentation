---
title: Log Management
kind: Documentation
description: "Configure your Datadog Agent to gather logs from your host, containers & services."
further_reading:
- link: "logs/graph"
  tag: "Documentation"
  text: "Perform analytics with Log Graphs"
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---

{{< vimeo 243374392 >}}

## Log Collection

Log collection is the beginning of your journey in the wonderful world of log-management. Use either the [Datadog Agent][6] if you want to forward logs directly [from your hosts](#from-your-hosts) or your [containerized environments](#from-a-docker-environment), or use our [AWS Lambda function](#from-aws-services) if you want to monitor directly your AWS services logs.
If you are already using a log-shipper daemon, refer to our dedicated documentation for [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4], and [Logstash][5].


### From your hosts

Follow the [Datadog Agent installation instructions][6] to start forwarding logs alongside your metrics and traces.
The Agent can [tail log files][7] or [listen to socket][8] as well as [filter out logs][9] or [scrub sensitive data][10] or  aggregating [multi line logs][11]. 

### From a Docker environment

The Datadog agent can [collect logs directly from container stdout/stderr][14] without using any logging driver.  Container and orchestrator metadata is automatically added as tags to your logs.

It is possible to collect logs from all your container or a only a subset filtered by container image, label or name. Autodiscovery can also be used to configure log collection directly in the container labels.

In Kubernetes environment you can also leverage [the daemonset installation][15].

### From AWS services

The Datadog Agent can be used to collect logs directly from ECS or EC2 instances and applications running on them.

However, AWS services logs are collected thanks to our [Lambda function][12]. Triggers are then defined ([manually or automatically][13]) to forward logs from any S3 bucket, Cloudwatch Log group or Cloudwatch events. 

### From a custom forwarder

Ultimately we have a TCP endpoint `intake.logs.datadoghq.com` that can be accessed either on port `10516` (for secured connection) or `10514`. Therefore any custom process or [logging library][16] are able to forward logs through TCP can be used.

### Reserved attributes

Here are some key attributes you should pay attention to when setting up your project:

| Attribute   | Description                                                                                                                                                                                           |
| :-------    | :------                                                                                                                                                                                               |
| **Host**    | The name of the originating host as defined in metrics. We automatically retrieve corresponding host tags from the matching host in Datadog. The agent set it automatically.                          |
| **Source**  | This corresponds to the integration name: the technology or service that originated to log. When it matches ab integration name, Datadog automatically installs the corresponding parsers and facets. |
| **Service** | This is the name of the application or service generating the log events. It is used to switch from Logs to APMso make sure you define the same value if you use both products.                       |
| **Message** | By default, Datadog ingests the value of message as the body of the log entry. That value is then highlighted and displayed in the logstream, where it is indexed for full text search.               |

Your logs are now collected and centralized into the [Log Explorer][17] view, but your journey doesn’t ends here. 

{{< img src="logs/log_explorer_view.png" alt="Log explorer view" responsive="true" popup="true">}}

## Search your Logs

Use integration [facets][18] or [add custom ones][19] to slice and dice in your logs. You can also use tags shared by logs, metrics and traces to filter your data or even [free text search][20] on the log message:

{{< img src="logs/search_your_logs.gif" alt="Search your logs" responsive="true" popup="true">}}

Follow our [guide to explore your logs][17] for a more detailed explanation of all the Log Explorer features include wildcards usage and query on numerical values.

## Graph and Analytics

Now that your logs are parsed and that you have facets and measure over the wanted attributes graph log queries and see maximum, averages, percentiles, unique counts and more.

1. Choose a [Measure][21] or [Facet][18] to graph. [A Measure][21] lets you choose the aggregation function whereas a [Facet][18] displays the unique count.
2. Select the aggregation function for the [Measure][21] you want to graph:
3. Use Tag or [Facet][18] to split your graph.
4. Choose to display either the X top or bottom values according to the selected [measure][21].

{{< img src="logs/log_graph.png" alt="Log graph" responsive="true" popup="true" style="width:70%;">}}

To see the logs that correspond to a value or range of value in the graph, just click on the wanted point and choose “[view logs][22]” to open a contextual panel with all the underlying logs:

Follow our [log graphing guide][23] to learn more about all the graphing option.

## Log Processing

Datadog accept any log format: JSON, Syslog, raw, …. No one is blocked at the door.  
If JSON or Syslog format are automatically processed, we have integration processors to automatically extract meaningful attributes from the raw log. Then integration add facets and measures to slice and dice easily your data in your log explorer or graph view. 
Therefore you can get a maximum value from your integration logs without any manual setup.

That said for custom format not part of an integration you might need to slightly adjust our integration parser or to create new ones.

### JSON logs

As explained above, in Datadog we have [reserved attributes][24] such as timestamp, status, host, service or even the log message. 
If you have different attribute names for those, no worries. We have [reserved attributes remappers][25] available in the pipeline.

For example: A service generates the below logs:

```json
{
    "myhost": "host123",
    "myapp": "test-web-2",
    "logger_severity": "Error",
    "log": "cannot establish connection with /api/v1/test",
    "status_code": 500
}
```

Going to the pipeline and changing the default mapping to this one:

{{< img src="logs/reserved_attribute_remapper.png" alt="Reserved attribute remapper" responsive="true" popup="true" style="width:70%;">}}

Would then give the following log:

{{< img src="logs/log_post_remapping.png" alt="Log post remapping" responsive="true" popup="true" style="width:70%;">}}

### Custom log processing rules

For integration logs, we automatically install a pipeline that takes care of parsing your logs as on this example for ELB logs:

{{< img src="logs/elb_log_post_processing.png" alt="ELB log post processing" responsive="true" popup="true" style="width:70%;">}}

* A [pipeline][26] takes a filtered subset of incoming logs and applies over them a list of sequential processors.
* A processor executes within a [pipeline][26] a data-structuring action ([Remapping an attribute][27], [Grok parsing][28]…) on a log.


However we know that log format can be totally custom which is why custom processing rules can be defined.
The idea is to extract all your attribute and remap them if necessary to the main status or timestamp.

So for instance you with custom processing rules you can transform this log:

{{< img src="logs/log_pre_processing.png" alt="Log pre processing" responsive="true" popup="true" style="width:50%;">}}

Into this one: 

{{< img src="logs/log_post_processing.png" alt="Log post processing" responsive="true" popup="true" style="width:50%;">}}

Follow our [parsing training guide][29] to learn more about parsing.
We also have a [parsing best practice][30] and a [parsing troubleshooting][31] guide that might be interesting for you.
In addition of parsing you can also do some remapping and much more. [Find here][32] the full list of available processors and how to use them.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/rsyslog
[2]: /logs/log_collection/syslog_ng
[3]: /logs/log_collection/nxlog
[4]: /logs/log_collection/fluentd
[5]: /logs/log_collection/logstash
[6]: /logs/log_collection/#getting-started-with-the-agent
[7]: /logs/log_collection/#tail-existing-files 
[8]: /logs/log_collection/#stream-logs-through-tcp-udp
[9]: /logs/log_collection/#filter-logs
[10]: /logs/log_collection/#scrub-sensitive-data-in-your-logs 
[11]: /logs/log_collection/#multi-line-aggregation
[12]: /integrations/amazon_web_services/#log-collection
[13]: /integrations/amazon_web_services/#enable-logging-for-your-aws-service
[14]: /logs/log_collection/docker/
[15]: /agent/basic_agent_usage/kubernetes/#log-collection-setup
[16]: /logs/languages/
[17]: /logs/explore
[18]: /logs/explore/#facets
[19]: /logs/explore/#create-a-facet
[20]: /logs/explore/#search-syntax 
[21]: /logs/explore/#measures 
[22]: /logs/graph/#related-logs
[23]: /logs/graph/
[24]: /logs/log_collection/#reserved-attributes 
[25]: /logs/log_collection/#edit-reserved-attributes
[26]: /logs/processing/#processing-pipelines 
[27]: /logs/processing/#attribute-remapper 
[28]: /logs/processing/#grok-parser 
[29]: /logs/parsing/ 
[30]: /logs/faq/log-parsing-best-practice/
[31]: /logs/faq/how-to-investigate-a-log-parsing-issue/
[32]: /logs/processing/#processors