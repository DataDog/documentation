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

Datadog’s integration processing Pipelines are available for the `source` tag value (see the table below) when an integration is setup to collect logs. For integrations with a Datadog `conf.yaml` file, the logs configuration parameter `source: <ID>` **must match** the value listed next to the integration to automatically enable the corresponding [integration Pipeline][66]:

| Source                           | Setup Location                                   | Source ID       |
|----------------------------------|--------------------------------------------------|-----------------|
| [Apache][1]                      | [Datadog integration YAML file][2]               | `apache`        |
| [AWS API Gateway][3]             | [AWS Management Console][4]                      | `apigateway`    |
| [Cassandra][5]                   | [Datadog integration YAML file][6]               | `cassandra`     |
| [AWS Cloudfront][7]              | [AWS Management Console][4]                      | `cloudfront`    |
| AWS CloudHSM                     | [AWS Management Console][4]                      | `cloudhsm`      |
| [AWS Cloudtrail][8]              | [AWS Management Console][4]                      | `cloudtrail`    |
| [Consul][9]                      | [Datadog integration YAML file][10]              | `consul`        |
| [CouchDB][11]                    | [Datadog integration YAML file][12]              | `couchdb`       |
| [C#][13]                         | [Custom Datadog YAML file][14]                   | `csharp`        |
| [Docker][15]                     | [Container][16] or [Host][17] Agent Installation | `docker`        |
| [AWS DynamoDB][18]               | [AWS Management Console][4]                      | `dynamodb`      |
| [ElasticSearch][19]              | [Datadog integration YAML file][20]              | `elasticsearch` |
| [AWS Elastic Load Balancing][21] | [AWS Management Console][4]                      | `elb`           |
| [Go][22]                         | [Custom Datadog YAML file][23]                   | `go`            |
| [Gunicorn][24]                   | [Datadog integration YAML file][25]              | `gunicorn`      |
| [HAProxy][26]                    | [Datadog integration YAML file][27]              | `haproxy`       |
| [IIS][28]                        | [Datadog integration YAML file][29]              | `iis`           |
| [Java][30]                       | [Custom Datadog YAML file][31]                   | `java`          |
| [Kafka][32]                      | [Datadog integration YAML file][33]              | `kafka`         |
| [AWS Lambda][34]                 | [AWS Management Console][4]                      | `lambda`        |
| [MongoDB][35]                    | [Datadog integration YAML file][36]              | `mongodb`       |
| [MySQL][37]                      | [Datadog integration YAML file][38]              | `mysql`         |
| [Nginx][39]                      | [Datadog integration YAML file][40]              | `nginx`         |
| [Postgres SQL][41]               | [Datadog integration YAML file][42]              | `postgresql`    |
| [Python][43]                     | [Custom Datadog YAML file][44]                   | `python`        |
| [RabbitMQ][45]                   | [Datadog integration YAML file][46]              | `rabbitmq`      |
| [Redis][47]                      | [Datadog integration YAML file][48]              | `redis`         |
| [AWS Redshift][49]               | [AWS Management Console][4]                      | `redshift`      |
| [Ruby][50]                       | [Custom Datadog YAML file][51]                   | `ruby`          |
| [AWS S3][52]                     | [AWS Management Console][4]                      | `s3`            |
| [AWS SNS][53]                    | [AWS Management Console][4]                      | `sns`           |
| [Stunnel][54]                    | [Custom Datadog YAML file][55]                   | `stunnel`       |
| [Tomcat][56]                     | [Datadog integration YAML file][57]              | `tomcat`        |
| [uwsgi][58]                      | [Custom Datadog YAML file][59]                   | `uwsgi`         |
| [Varnish][60]                    | [Custom Datadog YAML file][61]                   | `varnish`       |
| [AWS VPC][62]                    | [AWS Management Console][4]                      | `vpc`           |
| [ZooKeeper][63]                  | [Datadog integration YAML file][64]              | `zookeeper`     |


**Note**: Integration Pipelines implement the [Datadog Attribute Naming Convention][65].

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
[30]: /logs/log_collection/java/
[31]: /logs/log_collection/java/#configure-the-datadog-agent
[32]: /integrations/kafka/#log-collection
[33]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[34]: /integrations/amazon_lambda/#log-collection
[35]: /integrations/mongo/#log-collection
[36]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[37]: /integrations/mysql/#log-collection
[38]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[39]: /integrations/nginx/#log-collection
[40]: https://github.com/DataDog/integrations-core/blob/master/nginx/datadog_checks/nginx/data/conf.yaml.example
[41]: /integrations/postgres/#log-collection
[42]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[43]: /logs/log_collection/python/
[44]: /logs/log_collection/python/#configure-the-datadog-agent
[45]: /integrations/rabbitmq/#log-collection
[46]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[47]: https://docs.datadoghq.com/integrations/redisdb/#log-collection
[48]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[49]: /integrations/amazon_redshift/#log-collection
[50]: /logs/log_collection/ruby/
[51]: /logs/log_collection/ruby/#configure-your-datadog-agent
[52]: /integrations/amazon_s3/#log-collection
[53]: /integrations/amazon_sns/#log-collection
[54]: /integrations/stunnel/#log-collection
[55]: /integrations/stunnel/#configuration
[56]: /integrations/tomcat/#log-collection
[57]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[58]: /integrations/uwsgi/#log-collection
[59]: /integrations/uwsgi/#configuration
[60]: /integrations/varnish/#log-collection
[61]: https://github.com/DataDog/integrations-core/blob/master/varnish/datadog_checks/varnish/data/conf.yaml.example
[62]: /integrations/amazon_vpc/#log-collection
[63]: /integrations/zk/#log-collection
[64]: https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example
[65]: /logs/processing/attributes_naming_convention/
[66]: /logs/processing/pipelines/#integration-pipelines
