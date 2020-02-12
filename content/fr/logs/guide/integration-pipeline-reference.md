---
title: Références relatives aux pipelines d'intégration
kind: guide
aliases:
  - /fr/logs/faq/integration-pipeline-reference
further_reading:
  - link: logs/processing/pipelines
    tag: Documentation
    text: Découvrir les pipelines de Datadog
  - link: logs/logging_without_limits
    tag: Documentation
    text: Logging without limit
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
---
Les pipelines de processing d'intégration de Datadog sont disponibles pour la valeur de tag `source` (voir le tableau ci-dessous) lorsqu'une intégration est configurée pour recueillir des logs. Pour les intégrations utilisant un fichier `conf.yaml` Datadog, le paramètre de configuration des logs `source: <ID>` **doit correspondre** à la valeur indiquée en regard de l'intégration pour activer automatiquement le [pipeline d'intégration][1] correspondant.

**Remarque** : les pipelines d'intégration appliquent la [convention de nommage des attributs Datadog][2].

| Source                           | Emplacement de la configuration                                   | ID Source                  |
|----------------------------------|--------------------------------------------------|----------------------------|
| [Adobe Experience Manager][3]   | [Fichier YAML Datadog personnalisé][4]                   | `adobe.experience.manager` |
| [Apache][5]                      | [Fichier YAML d'intégration Datadog][6]               | `apache`                   |
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
| [C#][18]                         | [Fichier YAML Datadog personnalisé][19]                   | `csharp`                   |
| [Cassandra][20]                   | [Fichier YAML d'intégration Datadog][21]               | `cassandra`                |
| [Consul][22]                      | [Fichier YAML d'intégration Datadog][23]              | `consul`                   |
| [CouchDB][24]                    | [Fichier YAML d'intégration Datadog][25]              | `couchdb`                  |
| Cron                             | [Fichier YAML Datadog personnalisé][26]                   | `CRON`                     |
| [Docker][27]                     | Installation de l'Agent sur le [conteneur][28] ou le [host][29] | `docker`                   |
| [Elasticsearch][30]              | [Fichier YAML d'intégration Datadog][31]              | `elasticsearch`            |
| Fail2ban                         | [Fichier YAML Datadog personnalisé][26]                   | `fail2ban`                 |
| [Go][32]                         | [Fichier YAML Datadog personnalisé][33]                   | `go`                       |
| [Gunicorn][34]                   | [Fichier YAML d'intégration Datadog][35]              | `gunicorn`                 |
| [HAProxy][36]                    | [Fichier YAML d'intégration Datadog][37]              | `haproxy`                  |
| [IIS][38]                        | [Fichier YAML d'intégration Datadog][39]              | `iis`                      |
| [Java][40]                       | [Fichier YAML Datadog personnalisé][41]                   | `java`                     |
| [Kafka][42]                      | [Fichier YAML d'intégration Datadog][43]              | `kafka`                    |
| [MongoDB][44]                    | [Fichier YAML d'intégration Datadog][45]              | `mongodb`                  |
| [MySQL][46]                      | [Fichier YAML d'intégration Datadog][47]              | `mysql`                    |
| [Nginx][48]                      | [Fichier YAML d'intégration Datadog][49]              | `nginx`                    |
| [Postgres SQL][50]               | [Fichier YAML d'intégration Datadog][51]              | `postgresql`               |
| [Python][52]                     | [Fichier YAML Datadog personnalisé][53]                   | `python`                   |
| [RabbitMQ][54]                   | [Fichier YAML d'intégration Datadog][55]              | `rabbitmq`                 |
| [Redis][56]                      | [Fichier YAML d'intégration Datadog][57]              | `redis`                    |
| [Ruby][58]                       | [Fichier YAML Datadog personnalisé][59]                   | `ruby`                     |
| SSHD                             | [Fichier YAML Datadog personnalisé][26]                   | `sshd`                     |
| [Stunnel][60]                    | [Fichier YAML Datadog personnalisé][61]                   | `stunnel`                  |
| Sudo                             | [Fichier YAML Datadog personnalisé][26]                   | `sudo`                     |
| [Tomcat][62]                     | [Fichier YAML d'intégration Datadog][63]              | `tomcat`                   |
| UFW                              | [Fichier YAML Datadog personnalisé][26]                   | `UFW`                      |
| [uwsgi][64]                      | [Fichier YAML Datadog personnalisé][65]                   | `uwsgi`                    |
| [Varnish][66]                    | [Fichier YAML Datadog personnalisé][67]                   | `varnish`                  |
| [ZooKeeper][68]                  | [Fichier YAML d'intégration Datadog][69]              | `zookeeper`                |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/processing/pipelines/#integration-pipelines
[2]: /fr/logs/processing/attributes_naming_convention
[3]: /fr/integrations/adobe_experience_manager
[4]: /fr/integrations/adobe_experience_manager/#log-collection
[5]: /fr/integrations/apache/#log-collection
[6]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[7]: /fr/integrations/amazon_api_gateway/#log-collection
[8]: https://aws.amazon.com/console
[9]: /fr/integrations/amazon_cloudfront/#enable-cloudfront-logging
[10]: /fr/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[11]: /fr/integrations/amazon_dynamodb/#log-collection
[12]: /fr/integrations/amazon_elb/#log-collection
[13]: /fr/integrations/amazon_lambda/#log-collection
[14]: /fr/integrations/amazon_redshift/#log-collection
[15]: /fr/integrations/amazon_s3/#log-collection
[16]: /fr/integrations/amazon_sns/#log-collection
[17]: /fr/integrations/amazon_vpc/#log-collection
[18]: /fr/logs/log_collection/csharp
[19]: /fr/logs/log_collection/csharp/#configure-your-datadog-agent
[20]: /fr/integrations/cassandra/#log-collection
[21]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[22]: /fr/integrations/consul/#log-collection
[23]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[24]: /fr/integrations/couch/#log-collection
[25]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[26]: /fr/logs/log_collection/?tab=tailexistingfiles#custom-log-collection
[27]: /fr/agent/docker/log
[28]: /fr/agent/docker/log/?tab=environmentvariable#one-step-install-to-collect-all-the-container-logs
[29]: /fr/agent/docker/log/?tab=hostinstallation#one-step-install-to-collect-all-the-container-logs
[30]: /fr/integrations/elastic/#log-collection
[31]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[32]: /fr/logs/log_collection/go
[33]: /fr/logs/log_collection/go/#configure-your-datadog-agent
[34]: /fr/integrations/gunicorn/#log-collection
[35]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example
[36]: /fr/integrations/haproxy/#log-collection
[37]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[38]: /fr/integrations/iis/#log-collection
[39]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[40]: /fr/logs/log_collection/java
[41]: /fr/logs/log_collection/java/#configure-the-datadog-agent
[42]: /fr/integrations/kafka/#log-collection
[43]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[44]: /fr/integrations/mongo/#log-collection
[45]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[46]: /fr/integrations/mysql/#log-collection
[47]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[48]: /fr/integrations/nginx/#log-collection
[49]: https://github.com/DataDog/integrations-core/blob/master/nginx/datadog_checks/nginx/data/conf.yaml.example
[50]: /fr/integrations/postgres/#log-collection
[51]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[52]: /fr/logs/log_collection/python
[53]: /fr/logs/log_collection/python/#configure-the-datadog-agent
[54]: /fr/integrations/rabbitmq/#log-collection
[55]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[56]: /fr/integrations/redisdb/#log-collection
[57]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[58]: /fr/logs/log_collection/ruby
[59]: /fr/logs/log_collection/ruby/#configure-your-datadog-agent
[60]: /fr/integrations/stunnel/#log-collection
[61]: /fr/integrations/stunnel/#configuration
[62]: /fr/integrations/tomcat/#log-collection
[63]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[64]: /fr/integrations/uwsgi/#log-collection
[65]: /fr/integrations/uwsgi/#configuration
[66]: /fr/integrations/varnish/#log-collection
[67]: https://github.com/DataDog/integrations-core/blob/master/varnish/datadog_checks/varnish/data/conf.yaml.example
[68]: /fr/integrations/zk/#log-collection
[69]: https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example