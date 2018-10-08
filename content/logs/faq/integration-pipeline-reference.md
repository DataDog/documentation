---
title: Integration Pipeline Reference
kind: faq
disable_toc: true
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: Discover Datadog Pipelines
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: Logging without limit
- link: "logs/explorer"
  tag: "Documentation"
  text: Learn how to explore your logs
---

Datadog’s integration processing Pipelines are available for the `source` tag value below when they are setup to collect logs. For integrations with a Datadog `conf.yaml` file, the logs configuration parameter `source: <ID>` **must match** the value listed next to the integration in the table below to automatically enable the integration Pipeline:

| Source                           | Setup Location                                   | Source ID       |
|----------------------------------|--------------------------------------------------|-----------------|
| [Apache][1]                      | [Datadog integration YAML file][2]               | `apache`        |
| [AWS API Gateway][3]             | [AWS Console][4]                                 | `apigateway`    |
| [Cassandra][5]                   | [Datadog integration YAML file][6]               | `cassandra`     |
| [AWS Cloudfront][7]              | [AWS Console][4]                                 | `cloudfront`    |
| [AWS Cloudtrail][8]              | [AWS Console][4]                                 | `cloudtrail`    |
| [Consul][9]                      | [Datadog integration YAML file][10]              | `consul`        |
| [CouchDB][11]                    | [Datadog integration YAML file][12]              | `couchdb`       |
| [C#][13]                         | [Custom Datadog YAML file][14]                   | `csharp`        |
| [Docker][15]                     | [Container][16] or [Host][17] Agent Installation | `docker`        |
| [AWS DynamoDB][18]               | [AWS Console][4]                                 | `dynamodb`      |
| [ElasticSearch][19]              | [Datadog integration YAML file][20]              | `elasticsearch` |
| [AWS Elastic Load Balancing][21] | [AWS Console][4]                                 | `elb`           |
| [Go][22]                         | [Custom Datadog YAML file][23]                   | `go`            |
| [Gunicorn][24]                   | [Datadog integration YAML file][25]              | `gunicorn`      |
| [HAProxy][26]                    | [Datadog integration YAML file][27]              | `haproxy`       |
| [IIS][28]                        | [Datadog integration YAML file][29]              | `iis`           |

**Note**: Integration Pipelines implement [Datadog Attribute Naming Convention][30].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/apache/#log-collection
[2]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[3]: /integrations/amazon_api_gateway/#log-collection
[4]: https://aws.amazon.com/console/
[5]: /integrations/cassandra/#log-collection
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[7]: /integrations/amazon_cloudfront/#enable-cloudfront-logging
[8]: /integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[9]: /integrations/consul/#log-collection
[10]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[11]: /integrations/couch/#log-collection
[12]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[13]: /logs/log_collection/csharp/
[14]: /logs/log_collection/csharp/#configure-your-datadog-agent
[15]: /logs/log_collection/docker/
[16]: /logs/log_collection/docker/?tab=environmentvariable#one-step-install-to-collect-all-the-container-logs
[17]: /logs/log_collection/docker/?tab=hostinstallation#one-step-install-to-collect-all-the-container-logs
[18]: /integrations/amazon_dynamodb/#log-collection
[19]: /integrations/elastic/#log-collection
[20]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[21]: /integrations/amazon_elb/#log-collection
[22]: /logs/log_collection/go/
[23]: /logs/log_collection/go/#configure-your-datadog-agent
[24]: /integrations/gunicorn/#log-collection
[25]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example
[26]: /integrations/haproxy/#log-collection
[27]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[28]: /integrations/iis/#log-collection
[29]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[30]: /logs/processing/attributes_naming_convention/
