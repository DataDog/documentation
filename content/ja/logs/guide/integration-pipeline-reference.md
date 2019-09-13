---
title: インテグレーションパイプラインリファレンス
kind: ガイド
aliases:
  - /ja/logs/faq/integration-pipeline-reference
disable_toc: true
further_reading:
  - link: logs/processing/pipelines
    tag: Documentation
    text: Datadog のパイプライン
  - link: logs/logging_without_limits
    tag: Documentation
    text: 無制限のログ
  - link: logs/explorer
    tag: Documentation
    text: ログの調査方法
---
インテグレーションがログを収集するようにセットアップされている場合は、`source` タグの値 (下の表を参照) として Datadog のインテグレーション処理パイプラインを使用できます。Datadog の `conf.yaml` ファイルを含むインテグレーションで、対応する[インテグレーションパイプライン][1]を自動的に有効にするには、ログ構成パラメーター `source: <ID>` がインテグレーションの横にリストされている値と**一致していなければなりません**。

**注**: インテグレーションパイプラインは、[Datadog の属性命名規則][2]に従います。

| ソース                           | セットアップ場所                                   | ソース ID                  |
|----------------------------------|--------------------------------------------------|----------------------------|
| [Adobe Experience Manager][3]   | [カスタム Datadog YAML ファイル][4]                   | `adobe.experience.manager` |
| [Apache][5]                      | [Datadog インテグレーション YAML ファイル][6]               | `apache`                   |
| [AWS API Gateway][7]             | [AWS マネジメントコンソール][8]                      | `apigateway`               |
| [AWS Cloudfront][9]              | [AWS マネジメントコンソール][8]                      | `cloudfront`               |
| AWS CloudHSM                     | [AWS マネジメントコンソール][8]                      | `cloudhsm`                 |
| [AWS Cloudtrail][10]              | [AWS マネジメントコンソール][8]                      | `cloudtrail`               |
| [AWS DynamoDB][11]               | [AWS マネジメントコンソール][8]                      | `dynamodb`                 |
| [AWS Elastic Load Balancing][12] | [AWS マネジメントコンソール][8]                      | `elb`                      |
| [AWS Lambda][13]                 | [AWS マネジメントコンソール][8]                      | `lambda`                   |
| [AWS Redshift][14]               | [AWS マネジメントコンソール][8]                      | `redshift`                 |
| [AWS S3][15]                     | [AWS マネジメントコンソール][8]                      | `s3`                       |
| [AWS SNS][16]                    | [AWS マネジメントコンソール][8]                      | `sns`                      |
| [AWS VPC][17]                    | [AWS マネジメントコンソール][8]                      | `vpc`                      |
| [C#][18]                         | [カスタム Datadog YAML ファイル][19]                   | `csharp`                   |
| [Cassandra][20]                   | [Datadog インテグレーション YAML ファイル][21]               | `cassandra`                |
| [Consul][22]                      | [Datadog インテグレーション YAML ファイル][23]              | `consul`                   |
| [CouchDB][24]                    | [Datadog インテグレーション YAML ファイル][25]              | `couchdb`                  |
| Cron                             | [カスタム Datadog YAML ファイル][26]                   | `CRON`                     |
| [Docker][27]                     | [コンテナ][28]または[ホスト][29]の Agent インストール | `docker`                   |
| [ElasticSearch][30]              | [Datadog インテグレーション YAML ファイル][31]              | `elasticsearch`            |
| Fail2ban                         | [カスタム Datadog YAML ファイル][26]                   | `fail2ban`                 |
| [Go][32]                         | [カスタム Datadog YAML ファイル][33]                   | `go`                       |
| [Gunicorn][34]                   | [Datadog インテグレーション YAML ファイル][35]              | `gunicorn`                 |
| [HAProxy][36]                    | [Datadog インテグレーション YAML ファイル][37]              | `haproxy`                  |
| [IIS][38]                        | [Datadog インテグレーション YAML ファイル][39]              | `iis`                      |
| [Java][40]                       | [カスタム Datadog YAML ファイル][41]                   | `java`                     |
| [Kafka][42]                      | [Datadog インテグレーション YAML ファイル][43]              | `kafka`                    |
| [MongoDB][44]                    | [Datadog インテグレーション YAML ファイル][45]              | `mongodb`                  |
| [MySQL][46]                      | [Datadog インテグレーション YAML ファイル][47]              | `mysql`                    |
| [Nginx][48]                      | [Datadog インテグレーション YAML ファイル][49]              | `nginx`                    |
| [Postgres SQL][50]               | [Datadog インテグレーション YAML ファイル][51]              | `postgresql`               |
| [Python][52]                     | [カスタム Datadog YAML ファイル][53]                   | `python`                   |
| [RabbitMQ][54]                   | [Datadog インテグレーション YAML ファイル][55]              | `rabbitmq`                 |
| [Redis][56]                      | [Datadog インテグレーション YAML ファイル][57]              | `redis`                    |
| [Ruby][58]                       | [カスタム Datadog YAML ファイル][59]                   | `ruby`                     |
| SSHD                             | [カスタム Datadog YAML ファイル][26]                   | `sshd`                     |
| [Stunnel][60]                    | [カスタム Datadog YAML ファイル][61]                   | `stunnel`                  |
| Sudo                             | [カスタム Datadog YAML ファイル][26]                   | `sudo`                     |
| [Tomcat][62]                     | [Datadog インテグレーション YAML ファイル][63]              | `tomcat`                   |
| UFW                              | [カスタム Datadog YAML ファイル][26]                   | `UFW`                      |
| [uwsgi][64]                      | [カスタム Datadog YAML ファイル][65]                   | `uwsgi`                    |
| [Varnish][66]                    | [カスタム Datadog YAML ファイル][67]                   | `varnish`                  |
| [ZooKeeper][68]                  | [Datadog インテグレーション YAML ファイル][69]              | `zookeeper`                |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/pipelines/#integration-pipelines
[2]: /ja/logs/processing/attributes_naming_convention
[3]: /ja/integrations/adobe_experience_manager
[4]: /ja/integrations/adobe_experience_manager/#log-collection
[5]: /ja/integrations/apache/#log-collection
[6]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[7]: /ja/integrations/amazon_api_gateway/#log-collection
[8]: https://aws.amazon.com/console
[9]: /ja/integrations/amazon_cloudfront/#enable-cloudfront-logging
[10]: /ja/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[11]: /ja/integrations/amazon_dynamodb/#log-collection
[12]: /ja/integrations/amazon_elb/#log-collection
[13]: /ja/integrations/amazon_lambda/#log-collection
[14]: /ja/integrations/amazon_redshift/#log-collection
[15]: /ja/integrations/amazon_s3/#log-collection
[16]: /ja/integrations/amazon_sns/#log-collection
[17]: /ja/integrations/amazon_vpc/#log-collection
[18]: /ja/logs/log_collection/csharp
[19]: /ja/logs/log_collection/csharp/#configure-your-datadog-agent
[20]: /ja/integrations/cassandra/#log-collection
[21]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[22]: /ja/integrations/consul/#log-collection
[23]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[24]: /ja/integrations/couch/#log-collection
[25]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[26]: /ja/logs/log_collection/?tab=tailexistingfiles#custom-log-collection
[27]: /ja/agent/docker/log
[28]: /ja/agent/docker/log/?tab=environmentvariable#one-step-install-to-collect-all-the-container-logs
[29]: /ja/agent/docker/log/?tab=hostinstallation#one-step-install-to-collect-all-the-container-logs
[30]: /ja/integrations/elastic/#log-collection
[31]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[32]: /ja/logs/log_collection/go
[33]: /ja/logs/log_collection/go/#configure-your-datadog-agent
[34]: /ja/integrations/gunicorn/#log-collection
[35]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example
[36]: /ja/integrations/haproxy/#log-collection
[37]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[38]: /ja/integrations/iis/#log-collection
[39]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[40]: /ja/logs/log_collection/java
[41]: /ja/logs/log_collection/java/#configure-the-datadog-agent
[42]: /ja/integrations/kafka/#log-collection
[43]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[44]: /ja/integrations/mongo/#log-collection
[45]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[46]: /ja/integrations/mysql/#log-collection
[47]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[48]: /ja/integrations/nginx/#log-collection
[49]: https://github.com/DataDog/integrations-core/blob/master/nginx/datadog_checks/nginx/data/conf.yaml.example
[50]: /ja/integrations/postgres/#log-collection
[51]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[52]: /ja/logs/log_collection/python
[53]: /ja/logs/log_collection/python/#configure-the-datadog-agent
[54]: /ja/integrations/rabbitmq/#log-collection
[55]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[56]: /ja/integrations/redisdb/#log-collection
[57]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[58]: /ja/logs/log_collection/ruby
[59]: /ja/logs/log_collection/ruby/#configure-your-datadog-agent
[60]: /ja/integrations/stunnel/#log-collection
[61]: /ja/integrations/stunnel/#configuration
[62]: /ja/integrations/tomcat/#log-collection
[63]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[64]: /ja/integrations/uwsgi/#log-collection
[65]: /ja/integrations/uwsgi/#configuration
[66]: /ja/integrations/varnish/#log-collection
[67]: https://github.com/DataDog/integrations-core/blob/master/varnish/datadog_checks/varnish/data/conf.yaml.example
[68]: /ja/integrations/zk/#log-collection
[69]: https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example