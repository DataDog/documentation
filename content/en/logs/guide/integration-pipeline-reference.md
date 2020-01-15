---
title: Integration Pipeline Reference
kind: guide
aliases:
  - /logs/faq/integration-pipeline-reference
disable_toc: true
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: "Logging without limit"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

Datadog’s integration processing Pipelines are available for the `source` tag value (see the table below) when an integration is setup to collect logs. For integrations with a Datadog `conf.yaml` file, the logs configuration parameter `source: <ID>` **must match** the value listed next to the integration to automatically enable the corresponding [integration Pipeline][1].

**Note**: Integration Pipelines implement the [Datadog Attribute Naming Convention][2].

| Source                           | Setup Location                                   | Source ID                  |
|----------------------------------|--------------------------------------------------|----------------------------|
| [Adobe Experience Manager][3]   | [Custom Datadog YAML file][4]                   | `adobe.experience.manager` |
| [Apache][5]                      | [Datadog integration YAML file][6]               | `apache`                   |
| [AWS API Gateway][7]             | [AWS Management Console][8]                      | `apigateway`               |
| [AWS Cloudfront][9]              | [AWS Management Console][8]                      | `cloudfront`               |
| AWS CloudHSM                     | [AWS Management Console][8]                      | `cloudhsm`                 |
| [AWS Cloudtrail][10]              | [AWS Management Console][8]                      | `cloudtrail`               |
| [AWS DynamoDB][11]               | [AWS Management Console][8]                      | `dynamodb`                 |
| [AWS Elastic Load Balancing][12] | [AWS Management Console][8]                      | `elb`                      |
| [AWS Lambda][13]                 | [AWS Management Console][8]                      | `lambda`                   |
| [AWS Redshift][14]               | [AWS Management Console][8]                      | `redshift`                 |
| [AWS S3][15]                     | [AWS Management Console][8]                      | `s3`                       |
| [AWS SNS][16]                    | [AWS Management Console][8]                      | `sns`                      |
| [AWS VPC][17]                    | [AWS Management Console][8]                      | `vpc`                      |
| [C#][18]                         | [Custom Datadog YAML file][19]                   | `csharp`                   |
| [Cassandra][20]                   | [Datadog integration YAML file][21]               | `cassandra`                |
| [Consul][22]                      | [Datadog integration YAML file][23]              | `consul`                   |
| [CouchDB][24]                    | [Datadog integration YAML file][25]              | `couchdb`                  |
| Cron                             | [Custom Datadog YAML file][26]                   | `CRON`                     |
| [Docker][27]                     | [Container][28] or [Host][29] Agent Installation | `docker`                   |
| [ElasticSearch][30]              | [Datadog integration YAML file][31]              | `elasticsearch`            |
| Fail2ban                         | [Custom Datadog YAML file][26]                   | `fail2ban`                 |
| [Go][32]                         | [Custom Datadog YAML file][33]                   | `go`                       |
| [Gunicorn][34]                   | [Datadog integration YAML file][35]              | `gunicorn`                 |
| [HAProxy][36]                    | [Datadog integration YAML file][37]              | `haproxy`                  |
| [IIS][38]                        | [Datadog integration YAML file][39]              | `iis`                      |
| [Java][40]                       | [Custom Datadog YAML file][41]                   | `java`                     |
| [Kafka][42]                      | [Datadog integration YAML file][43]              | `kafka`                    |
| [MongoDB][44]                    | [Datadog integration YAML file][45]              | `mongodb`                  |
| [MySQL][46]                      | [Datadog integration YAML file][47]              | `mysql`                    |
| [Nginx][48]                      | [Datadog integration YAML file][49]              | `nginx`                    |
| [Postgres SQL][50]               | [Datadog integration YAML file][51]              | `postgresql`               |
| [Python][52]                     | [Custom Datadog YAML file][53]                   | `python`                   |
| [RabbitMQ][54]                   | [Datadog integration YAML file][55]              | `rabbitmq`                 |
| [Redis][56]                      | [Datadog integration YAML file][57]              | `redis`                    |
| [Ruby][58]                       | [Custom Datadog YAML file][59]                   | `ruby`                     |
| SSHD                             | [Custom Datadog YAML file][26]                   | `sshd`                     |
| [Stunnel][60]                    | [Custom Datadog YAML file][61]                   | `stunnel`                  |
| Sudo                             | [Custom Datadog YAML file][26]                   | `sudo`                     |
| [Tomcat][62]                     | [Datadog integration YAML file][63]              | `tomcat`                   |
| UFW                              | [Custom Datadog YAML file][26]                   | `UFW`                      |
| [uwsgi][64]                      | [Custom Datadog YAML file][65]                   | `uwsgi`                    |
| [Varnish][66]                    | [Custom Datadog YAML file][67]                   | `varnish`                  |
| [ZooKeeper][68]                  | [Datadog integration YAML file][69]              | `zookeeper`                |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/pipelines/#integration-pipelines
[2]: /logs/processing/attributes_naming_convention
[3]: /integrations/adobe_experience_manager
[4]: /integrations/adobe_experience_manager/#log-collection
[5]: /integrations/apache/#log-collection
[6]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[7]: /integrations/amazon_api_gateway/#log-collection
[8]: https://aws.amazon.com/console
[9]: /integrations/amazon_cloudfront/#enable-cloudfront-logging
[10]: /integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[11]: /integrations/amazon_dynamodb/#log-collection
[12]: /integrations/amazon_elb/#log-collection
[13]: /integrations/amazon_lambda/#log-collection
[14]: /integrations/amazon_redshift/#log-collection
[15]: /integrations/amazon_s3/#log-collection
[16]: /integrations/amazon_sns/#log-collection
[17]: /integrations/amazon_vpc/#log-collection
[18]: /logs/log_collection/csharp
[19]: /logs/log_collection/csharp/#configure-your-datadog-agent
[20]: /integrations/cassandra/#log-collection
[21]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[22]: /integrations/consul/#log-collection
[23]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[24]: /integrations/couch/#log-collection
[25]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[26]: /logs/log_collection/?tab=tailexistingfiles#custom-log-collection
[27]: /agent/docker/log
[28]: /agent/docker/log/?tab=environmentvariable#one-step-install-to-collect-all-the-container-logs
[29]: /agent/docker/log/?tab=hostinstallation#one-step-install-to-collect-all-the-container-logs
[30]: /integrations/elastic/#log-collection
[31]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[32]: /logs/log_collection/go
[33]: /logs/log_collection/go/#configure-your-datadog-agent
[34]: /integrations/gunicorn/#log-collection
[35]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example
[36]: /integrations/haproxy/#log-collection
[37]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[38]: /integrations/iis/#log-collection
[39]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[40]: /logs/log_collection/java
[41]: /logs/log_collection/java/#configure-the-datadog-agent
[42]: /integrations/kafka/#log-collection
[43]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[44]: /integrations/mongo/#log-collection
[45]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[46]: /integrations/mysql/#log-collection
[47]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[48]: /integrations/nginx/#log-collection
[49]: https://github.com/DataDog/integrations-core/blob/master/nginx/datadog_checks/nginx/data/conf.yaml.example
[50]: /integrations/postgres/#log-collection
[51]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[52]: /logs/log_collection/python
[53]: /logs/log_collection/python/#configure-the-datadog-agent
[54]: /integrations/rabbitmq/#log-collection
[55]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[56]: /integrations/redisdb/#log-collection
[57]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[58]: /logs/log_collection/ruby
[59]: /logs/log_collection/ruby/#configure-your-datadog-agent
[60]: /integrations/stunnel/#log-collection
[61]: /integrations/stunnel/#configuration
[62]: /integrations/tomcat/#log-collection
[63]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[64]: /integrations/uwsgi/#log-collection
[65]: /integrations/uwsgi/#configuration
[66]: /integrations/varnish/#log-collection
[67]: https://github.com/DataDog/integrations-core/blob/master/varnish/datadog_checks/varnish/data/conf.yaml.example
[68]: /integrations/zk/#log-collection
[69]: https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example
