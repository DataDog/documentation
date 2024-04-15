---
aliases:
- /ja/integrations/faq/how-can-i-gather-metrics-from-the-unix-shell
- /ja/integrations/faq/what-is-a-custom-metric-and-what-is-the-limit-on-the-number-of-custom-metrics-i-can-have
- /ja/integrations/faq/using-events-for-service-checks-is-deprecated-in-favor-of-monitors
- /ja/integrations/faq/i-removed-my-aws-ec2-integration-why-do-my-hosts-still-have-aws-tags
- /ja/integrations/faq/i-just-set-up-my-aws-integration-why-am-i-seeing-duplicate-hosts
- /ja/integrations/faq/extra-hosts-with-name-n-a-reporting-data
- /ja/integrations/faq/redis-integration-error-unknown-command-config
- /ja/integrations/faq/snmp
cascade:
- private: true

title: FAQ インテグレーション
---

## アマゾン ウェブ サービス (AWS)

* [AWS インテグレーションを使用せずに EC2 タグを引き出すにはどうすればよいですか？][1]
* [AWS の課金明細をモニタリングするにはどうすればよいですか？][2]
* [データの受信が遅れているのはなぜですか？][3]
* [ECS Fargate のインテグレーションセットアップ][4]

## Apache

* [Apache とのインテグレーションに関する問題点][5]
* [Apache SSL 証明書に関する問題][6]

## Elasticsearch

* [Elasticsearch からすべてのメトリクスが送信されないのはなぜですか？][7]
* [Agent が接続できない][8]

## Git & GitHub

* [github とのインテグレーションで、イベントがイベントストリームに表示されないのはなぜですか？][9]

## HAProxy

* [マルチプロセスモードでの HAProxy][10]

## Jira

* [JIRA とのインテグレーションを設定しましたが、イベントやチケットはどのように作成されるのですか？][11]

## JMX

* [JMX インテグレーションに一致する Bean がありますが、データが収集できません。][12]
* [jmx.yaml エラー: Include Section][13]
* [JMX インテグレーションのトラブルシューティング][14]
* [jConsole で jmx データを表示し、jmx.yaml でデータの収集をセットアップする][15]
* [私の JMX と AWS のインテグレーションは両方とも "name" タグを使用しています。どうすればいいのでしょうか？][16]
* [JBoss EAP 7 と Datadog の JMX 経由のモニタリング][17]

## Kafka

* [Kafka のトラブルシューティングと詳細な調査][18]

## Kubernetes

* [apiserver と kubelet に対するクライアント認証][19]

## MySQL & SQL

* [MySQL Localhost エラー - Localhost VS 127.0.0.1][20]
* [SQL Server インテグレーションで名前付きインスタンスを使用できますか][21]
* [データベースユーザーに権限がありません][22]

## Postgres

* [Postgres カスタムメトリクスの収集の説明][23]

## RabbitMQ

* [タグファミリーに基づいて RabbitMQ キューをタグ付け][24]

## Unix

* [UNIX シェルからメトリクスを収集するには？][25]

## Vertica

* [カスタム Vertica クエリからメトリクスを収集する方法][26]

## VMware Tanzu Application Service

* [VMware Tanzu Application Service のアーキテクチャ][31]

## VSphere

* [vSphere による重複ホストのトラブルシューティング][27]

## Webhook

* [Webhooks を使った Trello Card の作り方][28]

## Windows

* [WMI でカスタム Windows パフォーマンスカウンターを収集する][29]
* [Windows ステータスベースのチェック][30]

[1]: /ja/integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration/
[2]: /ja/integrations/faq/how-do-i-monitor-my-aws-billing-details/
[3]: /ja/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
[4]: /ja/integrations/faq/integration-setup-ecs-fargate/
[5]: /ja/integrations/faq/issues-with-apache-integration/
[6]: /ja/integrations/faq/apache-ssl-certificate-issues/
[7]: /ja/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[8]: /ja/integrations/faq/elastic-agent-can-t-connect/
[9]: /ja/integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration/
[10]: /ja/integrations/faq/haproxy-multi-process/
[11]: /ja/integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created/
[12]: /ja/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect/
[13]: /ja/integrations/faq/jmx-yaml-error-include-section/
[14]: /ja/integrations/faq/troubleshooting-jmx-integrations/
[15]: /ja/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[16]: /ja/integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do/
[17]: /ja/integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx/
[18]: /ja/integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[19]: /ja/integrations/faq/client-authentication-against-the-apiserver-and-kubelet/
[20]: /ja/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[21]: /ja/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[22]: /ja/integrations/faq/database-user-lacks-privileges/
[23]: /ja/integrations/faq/postgres-custom-metric-collection-explained/
[24]: /ja/integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[25]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[26]: /ja/integrations/faq/how-to-collect-metrics-from-custom-vertica-queries/
[27]: /ja/integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[28]: /ja/integrations/faq/how-to-make-trello-card-using-webhooks/
[29]: /ja/integrations/faq/collect-custom-windows-performance-counters-over-wmi/
[30]: /ja/integrations/faq/windows-status-based-check/
[31]: /ja/integrations/faq/pivotal_architecture/
