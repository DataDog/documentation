---
aliases:
- /ja/integrations/faq/how-can-i-gather-metrics-from-the-unix-shell
- /ja/integrations/faq/what-is-a-custom-metric-and-what-is-the-limit-on-the-number-of-custom-metrics-i-can-have
- /ja/integrations/faq/using-events-for-service-checks-is-deprecated-in-favor-of-monitors
- /ja/integrations/faq/i-removed-my-aws-ec2-integration-why-do-my-hosts-still-have-aws-tags
- /ja/integrations/faq/i-just-set-up-my-aws-integration-why-am-i-seeing-duplicate-hosts
- /ja/integrations/faq/extra-hosts-with-name-n-a-reporting-data
cascade:
- private: true
kind: faq
title: FAQ インテグレーション
---

## アマゾン ウェブ サービス (AWS)

* [AWS インテグレーションと CloudWatch の FAQ][1]
* [AWS インテグレーションを使用せずに EC2 タグを引き出すにはどうすればよいですか？][2]
* [AWS の課金明細をモニタリングするにはどうすればよいですか？][3]
* [クラウドメトリクスの遅延][4]
* [データの受信が遅れているのはなぜですか？][5]
* [ECS Fargate のインテグレーションセットアップ][6]
* [エラー: Datadog に sts:AssumeRole を実行する権限がない][7]

## Apache

* [Apache とのインテグレーションに関する問題点][8]
* [Apache SSL 証明書に関する問題][9]

## Azure

* [私の Azure VM はパワーダウンしています。なぜインフラストラクチャーリストに表示されたままなのですか？][10]
* [Azure VM はアプリに表示されるが、メトリクスは報告されない][11]
* [Azure のステータスとカウントメトリクス][12]
* [Azure のトラブルシューティング][13]

## Docker

* [Compose と Datadog Agent][14]

## Elasticsearch

* [Elasticsearch からすべてのメトリクスが送信されないのはなぜですか？][15]
* [Agent が接続できない][16]

## Git & GitHub

* [github とのインテグレーションで、イベントがイベントストリームに表示されないのはなぜですか？][17]

## Hadoop

* [Hadoop 分散ファイルシステム (HDFS) インテグレーションエラー][18]

## HAProxy

* [マルチプロセスモードでの HAProxy][19]

## Jira

* [JIRA とのインテグレーションを設定しましたが、イベントやチケットはどのように作成されるのですか？][20]

## JMX

* [JMX インテグレーションに一致する Bean がありますが、データが収集できません。][21]
* [Windows で JMX コマンドを実行するには？][22]
* [jmx.yaml エラー: Include Section][23]
* [JMX インテグレーションのトラブルシューティング][24]
* [jConsole で jmx データを表示し、jmx.yaml でデータの収集をセットアップする][25]
* [私の JMX と AWS のインテグレーションは両方とも "name" タグを使用しています。どうすればいいのでしょうか？][26]
* [JBoss EAP 7 と Datadog の JMX 経由のモニタリング][27]

## Kafka


* [Kafka のトラブルシューティングと詳細な調査][28]

## Kubernetes

* [apiserver と kubelet に対するクライアント認証][29]

## MySQL & SQL

* [SQL Server インテグレーションでの接続の問題][30]
* [MySQL Localhost エラー - Localhost と 127.0.0.1][31]
* [SQL Server インテグレーションで名前付きインスタンスを使用できますか？][32]
* [MySQL カスタムクエリ][33]
* [sys.dm_os_performance_counters テーブルにあるメトリクス以外の SQL Server パフォーマンスメトリクスを収集できますか？][34]
* [SQL Server インテグレーションからさらに多くのメトリクスを収集するには？][35]
* [データベースユーザーに権限がありません][36]

## ネットワーク

* [Datadog API 経由で TCP/UDP ホストメトリクスを送信するには？][37]

## Postgres

* [Postgres カスタムメトリクスの収集の説明][38]

## RabbitMQ

* [タグファミリーに基づいて RabbitMQ キューをタグ付け][39]

## Redis

* [Redis インテグレーションエラー: "unknown command 'CONFIG'"][40]

## SNMP

* [SNMP の汎用/互換 OID リストはありますか？][41]

## Unix

* [UNIX シェルからメトリクスを収集するには？][42]

## Vertica

* [カスタム Vertica クエリからメトリクスを収集する方法][43]

## VSphere

* [vSphere による重複ホストのトラブルシューティング][44]

## Webhook

* [Webhooks を使った Trello Card の作り方][45]

## Windows

* [イベントログファイルを `Win32_NTLogEvent` WMI クラスに追加する方法][46]
* [WMI でカスタム Windows パフォーマンスカウンターを収集する][47]
* [Windows ステータスベースのチェック][48]
* [WMI メトリクスを取得する方法][49]

[1]: /ja/integrations/faq/aws-integration-and-cloudwatch-faq/
[2]: /ja/integrations/faq/how-do-i-pull-my-ec2-tags-without-using-the-aws-integration/
[3]: /ja/integrations/faq/how-do-i-monitor-my-aws-billing-details/
[4]: /ja/integrations/faq/cloud-metric-delay/
[5]: /ja/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
[6]: /ja/integrations/faq/integration-setup-ecs-fargate/
[7]: /ja/integrations/faq/error-datadog-not-authorized-sts-assume-role/
[8]: /ja/integrations/faq/issues-with-apache-integration/
[9]: /ja/integrations/faq/apache-ssl-certificate-issues/
[10]: /ja/integrations/faq/my-azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list/
[11]: /ja/integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics/
[12]: /ja/integrations/faq/azure-status-metric/
[13]: /ja/integrations/faq/azure-troubleshooting/
[14]: /ja/integrations/faq/compose-and-the-datadog-agent/
[15]: /ja/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[16]: /ja/integrations/faq/elastic-agent-can-t-connect/
[17]: /ja/integrations/faq/why-events-don-t-appear-to-be-showing-up-in-the-event-stream-with-my-github-integration/
[18]: /ja/integrations/faq/hadoop-distributed-file-system-hdfs-integration-error/
[19]: /ja/integrations/faq/haproxy-multi-process/
[20]: /ja/integrations/faq/i-ve-set-up-the-jira-integration-now-how-do-i-get-events-and-tickets-created/
[21]: /ja/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect/
[22]: /ja/integrations/faq/how-to-run-jmx-commands-in-windows/
[23]: /ja/integrations/faq/jmx-yaml-error-include-section/
[24]: /ja/integrations/faq/troubleshooting-jmx-integrations/
[25]: /ja/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[26]: /ja/integrations/faq/both-my-jmx-and-aws-integrations-use-name-tags-what-do-i-do/
[27]: /ja/integrations/faq/jboss-eap-7-datadog-monitoring-via-jmx/
[28]: /ja/integrations/faq/troubleshooting-and-deep-dive-for-kafka/
[29]: /ja/integrations/faq/client-authentication-against-the-apiserver-and-kubelet/
[30]: /ja/integrations/faq/connection-issues-with-the-sql-server-integration/
[31]: /ja/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[32]: /ja/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[33]: /ja/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries/
[34]: /ja/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi/
[35]: /ja/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration/
[36]: /ja/integrations/faq/database-user-lacks-privileges/
[37]: /ja/integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api/
[38]: /ja/integrations/faq/postgres-custom-metric-collection-explained/
[39]: /ja/integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[40]: /ja/integrations/faq/redis-integration-error-unknown-command-config/
[41]: /ja/integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids/
[42]: https://github.com/DataDog/Miscellany/tree/master/custom_check_shell
[43]: /ja/integrations/faq/how-to-collect-metrics-from-custom-vertica-queries/
[44]: /ja/integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[45]: /ja/integrations/faq/how-to-make-trello-card-using-webhooks/
[46]: /ja/integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class/
[47]: /ja/integrations/faq/collect-custom-windows-performance-counters-over-wmi/
[48]: /ja/integrations/faq/windows-status-based-check/
[49]: /ja/integrations/faq/how-to-retrieve-wmi-metrics/