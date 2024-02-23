---
aliases:
- /ja/guides/azure/
- /ja/integrations/azure_storage/
categories:
- azure
- cloud
- iot
- log collection
- network
- notification
dependencies: []
description: インスタンスや多数の Azure サービスからメトリクスを収集
doc_link: https://docs.datadoghq.com/integrations/azure/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
  tag: ブログ
  text: Datadog サーバーレスビューで Azure App Service を見通す
- link: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/
  tag: ブログ
  text: Microsoft Azure VM の監視方法
- link: https://www.datadoghq.com/blog/monitor-azure-arm-vms-datadog/
  tag: ブログ
  text: Ampere Altra Arm ベースの CPU を搭載した Microsoft Azure VM を Datadog で監視する？
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: ブログ
  text: Microsoft Azure プラットフォームログをモニタリングするためのベストプラクティス
- link: https://www.datadoghq.com/blog/azure-service-health-monitoring-datadog/
  tag: ブログ
  text: Azure Service の健全性イベントを Datadog で監視
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: ブログ
  text: Datadog で Azure コンテナアプリを監視する
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で Azure Pipelines を監視する
- link: https://www.datadoghq.com/blog/azure-government-monitoring-datadog/
  tag: ブログ
  text: Datadog で Azure Government を監視する
- link: https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/
  tag: ブログ
  text: Datadog でエンタープライズ規模の Azure 環境の監視を数分で可能にします
- link: https://docs.datadoghq.com/integrations/guide/azure-architecture-and-configuration/
  tag: Documentation
  text: Azure インテグレーションアーキテクチャと構成
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/
  tag: Documentation
  text: Azure ポータルの Datadog
- link: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: クラウドインスタンスに Datadog Agent をインストールするメリットは何ですか？
- link: https://www.datadoghq.com/blog/monitor-azure-openai-with-datadog/
  tag: ブログ
  text: Datadog で Azure OpenAI を監視する
git_integration_title: azure
has_logo: true
integration_id: azure
integration_title: Microsoft Azure
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
monitors:
  '[Azure App Gateway] Backend Hosts': assets/monitors/app_gateway_backend_hosts.json
  '[Azure App Gateway] CPU Utilization': assets/monitors/app_gateway_cpu_utilization.json
  '[Azure App Gateway] Failed Requests': assets/monitors/app_gateway_failed_requests.json
  '[Azure App Gateway] Response HTTP Status Anomaly': assets/monitors/app_gateway_http_status_anomalies.json
  '[Azure App Service] App Service Errors': assets/monitors/app_service_app_service_errors.json
  '[Azure App Service] App Service Plan CPU Utilization': assets/monitors/app_service_cpu.json
  '[Azure App Service] App Service Plan Memory Utilization': assets/monitors/app_service_memory.json
  '[Azure App Service] Connections': assets/monitors/app_service_connections.json
  '[Azure App Service] Function App Errors': assets/monitors/app_service_function_app_errors.json
  '[Azure App Service] Requests': assets/monitors/app_service_requests.json
  '[Azure App Service] Response Time': assets/monitors/app_service_response_times.json
  '[Azure SQL Database] CPU Utilization': assets/monitors/sql_db_cpu_percent.json
  '[Azure SQL Database] DTU Consumption': assets/monitors/sql_db_dtu_consumption_percent.json
  '[Azure SQL Database] Deadlock Anomalies': assets/monitors/sql_db_deadlock_anomalies.json
  '[Azure SQL Database] Failed Connections': assets/monitors/sql_db_connections_failed.json
  '[Azure SQL Database] Georeplication Link Status ': assets/monitors/sql_db_replication_links.json
  '[Azure SQL Database] Storage Utilization': assets/monitors/sql_db_storage_percent.json
  '[Azure VM] CPU Utilization Monitor': assets/monitors/vm_cpu_utilization.json
  '[Azure VM] Resource Health Status Monitor': assets/monitors/vm_resource_health_status.json
  '[Azure] API Rate Limit': assets/monitors/rate_limits.json
  '[Azure] Integration Errors': assets/monitors/integration_errors.json
  '[Azure] Resource Quotas': assets/monitors/resource_quotas.json
  '[Azure] Service Health Events': assets/monitors/service_health_events.json
name: azure
public_title: Datadog-Microsoft Azure インテグレーション
short_description: インスタンスや多数の Azure サービスからメトリクスを収集
version: '1.0'
---

## 概要

Datadog の Azure インテグレーションにより、Azure 環境からのメトリクスおよびログの収集が可能になります。コンフィギュレーションオプションは、オーガニゼーションで使用している Datadog のサイトにより異なります。

**All Sites:** すべての Datadog サイトは、メトリクス収集を実装するための App Registration 資格情報プロセス、および Azure Platform Logs を送信するための Event Hub セットアップを使用できます。 
**US3:** Datadog US3 サイトに組織がある場合、Azure Native インテグレーションを使用して、Azure 環境の管理およびデータ収集を効率化します。Datadog では、可能な限りこの方法を使用することを推奨しています。セットアップには、Azure サブスクリプションを Datadog 組織にリンクするための Datadog リソースを Azure に作成することが必要です。これは、メトリクス収集のための App Registration 資格情報プロセスと、ログ転送のための Event Hub セットアップを置き換えるものです。

Microsoft Azure に接続すると、以下のことができます。
- Datadog Agent をインストールして、またはインストールしないで、Azure VM からメトリクスを取得できます。
- すべての Azure サービスの標準 Azure Monitor メトリクスを収集できます。Application Gateway、App Service (Web および Mobile)、Batch サービス、イベントハブ、IoT Hub、Logic App、Redis Cache、サーバーファーム (App Service プラン)、SQL データベース、SQL 可変プール、仮想マシンスケールセットなどが含まれます。
- Azure メトリクスに、リージョン、リソースグループ、Azure 環境で定義されているタグなど、関連するリソースに関する Azure 固有の情報をタグ付けします。
- Datadog が生成したメトリクスを取得することで、Azure 環境に対する独自の洞察を提供します。
- Azure アプリケーションのログ、メトリクス、APM トレース、ユーザーアクティビティなどのデータを、Datadog 組織内で相関付けます。

<div class="alert alert-warning">
Datadog の Azure インテグレーションは、<a href="https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported">Azure Monitor からすべてのメトリクス</a>を収集するように構築されています。Datadog では継続的にドキュメントを更新してすべてのサブインテグレーションを表示できるように努めていますが、新しいメトリクスやサービスがクラウドサービスから次々にリリースされるため、インテグレーション一覧が追い付かないことがあります。<br><code>azure.*.status</code> および <code>azure.*.count</code> メトリクスは、Datadog により Azure Resource Health から生成されています。詳細については、<a href="https://docs.datadoghq.com/integrations/guide/azure-status-metric">Azure ステータスとカウントのメトリクス</a>を参照してください。
</div>

| インテグレーション                     | 説明                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Analysis Services][1]          | クラウドでデータモデルを提供するサービス                                                         |
| [API Management][2]             | API を公開、セキュリティ保護、変換、管理、監視するサービス                                      |
| [App Service][3]                | Web、モバイル、API、およびビジネスロジックアプリケーションをデプロイおよびスケーリングするためのサービス。                      |
| [App Service Environment][4]    | App Service のアプリを大規模かつ安全に実行するための環境を提供するサービス               |
| [App Service Plan][5]           | Web アプリを実行するためのコンピューティングリソースのセット                                                          |
| [Application Gateway][6]        | Web アプリケーションへのトラフィックを管理できる Web トラフィックロードバランサー                  |
| [Automation][7]                 | 複数の環境を横断して自動化と構成管理を提供するサービス                 |
| [Batch Service][8]              | マネージド型のタスクスケジューラーおよびプロセッサー。                                                                     |
| [Cognitive Services][9]         | AI やデータサイエンスの知識なしでアプリケーションの構築を可能にする API、SDK、サービス       |
| [Container Instances][10]       | 基底のインフラストラクチャーをプロビジョニングおよび管理する必要なく、コンテナをデプロイするサービス     |
| [Container Service][11]         | 実稼働準備が整った Kubernetes、DC/OS、または Docker Swarm クラスター                                            |
| [Cosmos DB][12]                 | ドキュメント、キー/値、ワイドカラム、グラフデータベースなどをサポートするデータベースサービス                   |
| [Customer Insights][13]         | オーガニゼーションが複数のデータセットを結合して、360 度の包括的な顧客ビューを構築できるようにするサービス                |
| [Data Explorer][14]             | 迅速かつスケーラブルなデータ調査サービス                                                        |
| [Data Factory][15]              | データの保管・移動・処理サービスを、自動化されたデータパイプラインとして構築するサービス       |
| [Data Lake Analytics][16]       | ビッグデータを簡略化する分析ジョブサービス                                                        |
| [Data Lake Store][17]           | ビッグデータ分析を可能にする無制限のデータレイク                                                     |
| [Database for MariaDB][18]      | エンタープライズ対応のフルマネージド型コミュニティ MariaDB データベースを提供するサービス                       |
| [Event Grid][19]                | 公開/サブスクライブモデルを使用して均一なイベント消費を可能にするイベントルーティングサービス       |
| [Event Hub][20]                 | マネージド型の大規模データストリーミングサービス。                                                                   |
| [ExpressRoute][21]              | オンプレミスのネットワークをクラウドに拡張するサービス                                             |
| [Firewall][22]                  | Azure Virtual Network のリソースを保護するクラウドネイティブのネットワークセキュリティ                            |
| [Functions][23]                 | イベントトリガーに呼応してコードをサーバーレスで実行するサービス                                      |
| [HDInsights][24]                | 膨大な量のデータを処理するクラウドサービス                                                   |
| [IOT Hub][25]                   | 何十億もの IOT 資産の接続、監視、管理。                                                      |
| [Key Vault][26]                 | クラウドアプリケーションおよびサービスが使用する暗号化キーを保護および管理するサービス |
| [Load Balancer][27]             | アプリケーションをスケーリングし、サービスの高可用性を実現。                                   |
| [Logic App][28]                 | 強力なインテグレーションソリューションの構築。                                                                     |
| [Machine Learning][29]          | モデルをより早く構築しデプロイするための、エンタープライズレベルの機械学習サービス                              |
| [Network Interfaces][30]        | VM とインターネット、Azure、オンプレミスリソースとの通信を提供                                 |
| [Notification Hubs][31]         | 任意のバックエンドから任意のプラットフォームへ通知を送信できるようにするプッシュエンジン                     |
| [Public IP Address][32]         | インターネットとのインバウンド通信およびアウトバウンド接続を可能にするリソース                |
| [Recovery Service Vault][33]    | 時間の経過とともに作成されたバックアップやリカバリーポイントを保存するエンティティ。                                  |
| [Redis Cache][34]               | マネージド型のデータキャッシュ。                                                                                       |
| [Relay][35]                     | 企業ネットワーク内で実行されているサービスをパブリッククラウドに安全に公開                          |
| [Cognitive Search][36]          | 優れた検索エクスペリエンスを追加するためのツールを提供する、サービスとしての検索クラウドソリューション             |
| Storage                         | [BLOB][37]、[ファイル][38]、[キュー][39]、[テーブル][40]のためのストレージ。                                     |
| [Stream Analytics][41]          | デバイスからの大量のデータストリーミングを調べるイベント処理エンジン                        |
| [SQL Database][42]              | クラウドの拡張性の高いリレーショナルデータベース。                                                         |
| [SQL Database Elastic Pool][43] | 複数のデータベースのパフォーマンス管理。                                                              |
| [Synapse Analytics][44]         | データインテグレーション、エンタープライズデータウェアハウス、ビッグデータアナリティクスを統合したアナリティクスサービス。 |
| [Usage and Quotas][45]          | お使いの Azure の使用状況を示します。                                                                                  |
| [Virtual Machine][46]           | 仮想マシン管理サービス。                                                                       |
| [Virtual Machine Scale Set][47] | 同一の VM をセットでデプロイ、管理、オートスケーリング。                                                     |
| [Virtual Network][48]           | Azure リソースがお互いと、インターネットと、オープンプレミスネットワークと、安全に通信できるようにします。    |

## セットアップ

### 自動

_全サイト:_  
Datadog と標準の Azure インテグレーションを自動的にセットアップする手順については、[標準の Azure インテグレーションプログラム管理ガイド][49]を参照してください。Terraform や Azure CLI でインテグレーションを設定し、Datadog Azure VM 拡張機能で Datadog Agent をデプロイし、自動スクリプトを実行してログ収集を有効にすることができます。

_US3:_  
Terraform を使用して Datadog の Azure Native インテグレーションを Azure の Datadog リソースとセットアップする手順については、[Azure Native インテグレーションプログラム管理ガイド][50]を参照してください。

### 手動

_全サイト:_  
Azure ポータルまたは CLI を通じて Azure と Datadog インテグレーションを手動でセットアップする手順については、[標準の Azure インテグレーション手動セットアップガイド][51]を参照してください。

_US3:_  
Datadog との Azure Native インテグレーションを手動でセットアップする手順については、[Azure Native インテグレーション手動セットアップガイド][52]を参照してください。これには、Azure における Datadog リソースの作成と、シングルサインオン (SSO) の構成 (オプション) が含まれます。

## ログの収集

_全サイト:_  
Azure ログを Datadog に送信する手順については、[Azure ログを Datadog に送信する][53] ガイドを参照してください。Datadog-Azure 関数と Azure Event Hub を介したログ収集は、自動または手動のいずれかを選択できます。また、Azure Blob Storage Function を使用して、すべての Azure App Services からログを収集することもできます。

_US3:_  
サブスクリプションレベル、Azure リソース、Azure Active Directory ログを Datadog に送信する手順については、[Datadog リソースで Azure ログを送信する][54]ガイドを参照してください。

## 収集データ

### メトリクス

すべての標準 Azure Monitor メトリクスと[一意の Datadog 生成メトリクス][55]。

詳しいメトリクス一覧については、[概要セクション](#overview)で該当する Azure サービスを選択してください。

### イベント

Azure インテグレーションは、自動的に Azure サービス健全性イベントを収集します。これを Datadog で表示するには、[イベントエクスプローラー][56]に移動し、`Azure Service Health` ネームスペースをフィルタリングします。 

### サービスのチェック

Azure インテグレーションには、サービスのチェック機能は含まれません。

### タグ

Azure インテグレーションのメトリクス、イベント、およびサービスチェックには、Azure 環境で定義されているタグに加えて、次のタグが付与されます。

| インテグレーション                             | ネームスペース                                   | Datadog タグキー                                                                                                                                                                                                 |
|-----------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| すべての Azure インテグレーション                  | All                                         | `cloud_provider`、`region`、`kind`、`type`、`name`、`resource_group`、`tenant_name`、`subscription_name`、`subscription_id`、`status`（該当する場合）                                                            |
| Azure VM インテグレーション                   | `azure.vm.*`                                | `host`、`size`、`operating_system`、`availability_zone`                                                                                                                                                          |
| Azure App Service Plans                 | `azure.web_serverfarms.*`                   | `per_site_scaling`、`plan_size`、`plan_tier`、`operating_system`                                                                                                                                                 |
| Azure App Services Web Apps & Functions | `azure.app_services.*`、`azure.functions.*` | `operating_system`、`server_farm_id`、`reserved`、`usage_state`、`fx_version`（linux ウェブアプリのみ）、`php_version`、`dot_net_framework_version`、`java_version`、`node_version`、`python_version`                |
| Azure SQL DB                            | `azure.sql_servers_databases.*`             | `license_type`、`max_size_mb`、`server_name`、`role`、`zone_redundant`<br>レプリケーションリンクのみ:  `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Azure Load Balancer                     | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Azure Usage and Quota                   | `azure.usage.*`                             | `usage_category`、`usage_name`                                                                                                                                                                                   |

## トラブルシューティング

[Azure トラブルシューティング][57]ガイドをご参照ください。

さらにヘルプが必要な場合は、[Datadog サポート][58]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/azure_analysis_services/
[2]: https://docs.datadoghq.com/ja/integrations/azure_api_management/
[3]: https://docs.datadoghq.com/ja/integrations/azure_app_services/
[4]: https://docs.datadoghq.com/ja/integrations/azure_app_service_environment/
[5]: https://docs.datadoghq.com/ja/integrations/azure_app_service_plan/
[6]: https://docs.datadoghq.com/ja/integrations/azure_application_gateway/
[7]: https://docs.datadoghq.com/ja/integrations/azure_automation/
[8]: https://docs.datadoghq.com/ja/integrations/azure_batch/
[9]: https://docs.datadoghq.com/ja/integrations/azure_cognitive_services/
[10]: https://docs.datadoghq.com/ja/integrations/azure_container_instances/
[11]: https://docs.datadoghq.com/ja/integrations/azure_container_service/
[12]: https://docs.datadoghq.com/ja/integrations/azure_cosmosdb/
[13]: https://docs.datadoghq.com/ja/integrations/azure_customer_insights/
[14]: https://docs.datadoghq.com/ja/integrations/azure_data_explorer/
[15]: https://docs.datadoghq.com/ja/integrations/azure_data_factory/
[16]: https://docs.datadoghq.com/ja/integrations/azure_data_lake_analytics/
[17]: https://docs.datadoghq.com/ja/integrations/azure_data_lake_store/
[18]: https://docs.datadoghq.com/ja/integrations/azure_db_for_mariadb/
[19]: https://docs.datadoghq.com/ja/integrations/azure_event_grid/
[20]: https://docs.datadoghq.com/ja/integrations/azure_event_hub/
[21]: https://docs.datadoghq.com/ja/integrations/azure_express_route/
[22]: https://docs.datadoghq.com/ja/integrations/azure_firewall/
[23]: https://docs.datadoghq.com/ja/integrations/azure_functions/
[24]: https://docs.datadoghq.com/ja/integrations/azure_hd_insight/
[25]: https://docs.datadoghq.com/ja/integrations/azure_iot_hub/
[26]: https://docs.datadoghq.com/ja/integrations/azure_key_vault/
[27]: https://docs.datadoghq.com/ja/integrations/azure_load_balancer/
[28]: https://docs.datadoghq.com/ja/integrations/azure_logic_app/
[29]: https://docs.datadoghq.com/ja/integrations/azure_machine_learning_services/
[30]: https://docs.datadoghq.com/ja/integrations/azure_network_interface/
[31]: https://docs.datadoghq.com/ja/integrations/azure_notification_hubs/
[32]: https://docs.datadoghq.com/ja/integrations/azure_public_ip_address/
[33]: https://docs.datadoghq.com/ja/integrations/azure_recovery_service_vault/
[34]: https://docs.datadoghq.com/ja/integrations/azure_redis_cache/
[35]: https://docs.datadoghq.com/ja/integrations/azure_relay/
[36]: https://docs.datadoghq.com/ja/integrations/azure_search/
[37]: https://docs.datadoghq.com/ja/integrations/azure_blob_storage/
[38]: https://docs.datadoghq.com/ja/integrations/azure_file_storage/
[39]: https://docs.datadoghq.com/ja/integrations/azure_queue_storage/
[40]: https://docs.datadoghq.com/ja/integrations/azure_table_storage/
[41]: https://docs.datadoghq.com/ja/integrations/azure_stream_analytics/
[42]: https://docs.datadoghq.com/ja/integrations/azure_sql_database/
[43]: https://docs.datadoghq.com/ja/integrations/azure_sql_elastic_pool/
[44]: https://docs.datadoghq.com/ja/integrations/azure_synapse/
[45]: https://docs.datadoghq.com/ja/integrations/azure_usage_and_quotas/
[46]: https://docs.datadoghq.com/ja/integrations/azure_vm/
[47]: https://docs.datadoghq.com/ja/integrations/azure_vm_scale_set/
[48]: https://docs.datadoghq.com/ja/integrations/azure_virtual_networks/
[49]: https://docs.datadoghq.com/ja/integrations/guide/azure-programmatic-management/
[50]: https://docs.datadoghq.com/ja/integrations/guide/azure-native-programmatic-management/
[51]: https://docs.datadoghq.com/ja/integrations/guide/azure-manual-setup/
[52]: https://docs.datadoghq.com/ja/integrations/guide/azure-native-manual-setup/
[53]: https://docs.datadoghq.com/ja/logs/guide/azure-logging-guide/
[54]: https://docs.datadoghq.com/ja/logs/guide/azure-native-logging-guide/
[55]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[56]: https://app.datadoghq.com/event/explorer
[57]: https://docs.datadoghq.com/ja/integrations/guide/azure-troubleshooting/
[58]: https://docs.datadoghq.com/ja/help/