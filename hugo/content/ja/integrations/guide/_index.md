---
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: Integrations Guides
disable_toc: true
private: true
title: インテグレーションガイド
---
{{< header-list header="一般的なガイド" >}}
    {{< nextlink href="integrations/guide/requests" tag=" documentation" >}}Datadog インテグレーションをリクエストする{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/reference-tables/" tag=" Documentation" >}}リファレンステーブルでカスタムメタデータを追加する{{< /nextlink >}}
    {{< nextlink href="source_code" tag=" Documentation" >}}Datadog ソースコードインテグレーション{{< /nextlink >}}
    {{< nextlink href="integrations/guide/high_availability" tag=" Documentation" >}}Datadog Agent の HA (高可用性) サポート{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-metric-delay" tag=" cloud" >}}クラウドメトリクスの遅延{{< /nextlink >}}
    {{< nextlink href="integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class" tag=" Windows" >}}イベントログファイルを `Win32_NTLogEvent` WMI クラスに追加する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/retrieving-wmi-metrics" tag=" Windows" >}}WMI メトリクスの取得{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mongo-custom-query-collection" tag=" MongoDB" >}}MongoDB カスタムメトリクスを収集{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-metrics" tag=" Prometheus" >}}Datadog メトリクスへの Prometheus メトリクスのマッピング{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-host-collection" tag=" Prometheus" >}}ホストからの Prometheus および OpenMetrics メトリクスの収集{{< /nextlink >}}
    {{< nextlink href="integrations/guide/freshservice-tickets-using-webhooks" tag=" Webhooks" >}}Webhooks を使用した Freshservice チケット{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hadoop-distributed-file-system-hdfs-integration-error" tag=" Hadoop" >}}HDFS (Hadoop Distributed File System) インテグレーションエラー{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hcp-consul" tag=" Consul" >}}Datadog を使用した HCP Consul の監視{{< /nextlink >}}
    {{< nextlink href="integrations/guide/agent-failed-to-retrieve-rmiserver-stub" tag=" kafka" >}}Agent が RMIServer スタブの取得に失敗します{{< /nextlink >}}
    {{< nextlink href="integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/" tag=" network" >}}TCP/UDP ホストメトリクスを Datadog API に送信する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/snmp-commonly-used-compatible-oids/" tag=" snmp" >}}SNMP でよく使われる OID と互換性のある OID{{< /nextlink >}}
    {{< nextlink href="integrations/guide/versions-for-openmetrics-based-integrations" tag=" openmetrics" >}}OpenMetrics ベースのインテグレーションのバージョニング{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-foundry-setup" tag=" pivotal cloud foundry" >}}Pivotal Cloud Foundry マニュアルセットアップ{{< /nextlink >}}
    {{< nextlink href="integrations/guide/application-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}Datadog Application Monitoring for VMware Tanzu{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cluster-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}Datadog Cluster Monitoring for VMware Tanzu{{< /nextlink >}}
    {{< nextlink href="integrations/guide/fips-integrations" tag=" fips" >}}FIPS 検証済み Agent Integrations{{< /nextlink >}}
    {{< nextlink href="integrations/guide/microsoft_teams_troubleshooting" tag=" Microsoft Teams" >}}Microsoft Teams のトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="integrations/guide/microsoft_teams_migrate_legacy_connectors" tag=" Microsoft Teams" >}}Microsoft Teams の Office 365 コネクタからの移行{{< /nextlink >}}
    {{< nextlink href="integrations/guide/slack-actions" tag=" Slack" >}}インシデント、On-Call、モニター、ダッシュボード、ワークフロー、アカウント向けの Slack アクション{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="AWS ガイド" >}}
    {{< nextlink href="getting_started/integrations/aws/" tag=" AWS" >}}CloudFormation を使用した AWS インテグレーションの自動セットアップ{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-terraform-setup" tag=" AWS" >}}Terraform を使用した AWS インテグレーションの自動セットアップ{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-organizations-setup" tag=" AWS" >}}組織向け AWS インテグレーションマルチアカウント設定{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-manual-setup" tag=" AWS" >}}AWS インテグレーションのマニュアルセットアップ{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-troubleshooting" tag=" AWS" >}}AWS インテグレーションのトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-metric-name-filters" tag=" AWS" >}}API を使用した AWS メトリクス名フィルターの構成{{< /nextlink >}}
    {{< nextlink href="integrations/guide/monitor-your-aws-billing-details" tag=" AWS" >}}AWS の請求の詳細を監視する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/error-datadog-not-authorized-sts-assume-role" tag=" AWS" >}}エラー: Datadog に sts:AssumeRole を実行する権限がない{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose" tag=" AWS" >}}Amazon Data Firehose を使用した AWS CloudWatch メトリクスストリーム{{< /nextlink >}}
    {{< nextlink href="integrations/guide/amazon_cloudformation" tag=" AWS" >}}Amazon CloudFormation の使用{{< /nextlink >}}
    {{< nextlink href="integrations/guide/events-from-sns-emails" tag=" AWS" >}}Amazon SNS のメールから Datadog のイベントを作成する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-and-cloudwatch-faq" tag=" AWS" >}}AWS インテグレーションと CloudWatch の FAQ{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="AWS Marketplace ガイド:" >}}
    {{< nextlink href="integrations/guide/aws-marketplace-datadog-trial" tag=" AWS Marketplace" >}}AWS Marketplace Datadog トライアルのセットアップ{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Azure ガイド:" >}}
    {{< nextlink href="integrations/guide/azure-integrations" tag=" Azure" >}}Azure インテグレーション{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-advanced-configuration" tag=" Azure" >}}Azure の高度な構成{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-integration" tag=" Azure" >}}Azure Native インテグレーション{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-cloud-adoption-framework" tag=" Azure" >}}Azure Cloud Adoption Framework と Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-graph-api-permissions" tag=" Azure" >}}Azure を監視するための Microsoft Graph API 権限{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Google Cloud ガイド" >}}
    {{< nextlink href="integrations/guide/gcp-metric-discrepancy" tag=" gcp" >}}Google Cloud メトリクスの不一致{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Alibaba Cloud ガイド" >}}
    {{< nextlink href="integrations/guide/alibaba-cloud-integration-troubleshooting" tag="Alibaba Cloud" >}}Alibaba Cloud インテグレーションのトラブルシューティング{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="OCI ガイド" >}}
    {{< nextlink href="integrations/guide/oci-integration-troubleshooting" tag=" oci" >}}OCI インテグレーションのトラブルシューティング{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="JMX ガイド" >}}
    {{< nextlink href="integrations/guide/running-jmx-commands-in-windows" tag=" jmx" >}}Windows で JMX コマンドを実行する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collecting-composite-type-jmx-attributes" tag=" jmx" >}}複合型の JMX 属性を収集する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags" tag=" jmx" >}}Bean 正規表現を使用して JMX メトリクスをフィルタリングし、追加のタグを提供する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmx_integrations/" tag=" jmx" >}}どのインテグレーションで Jmxfetch が使われていますか？{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmxfetch-fips/" tag=" jmx" >}}JMXFetch FIPS-140 モード{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="ServiceNow ガイド" >}}
   {{< nextlink href="integrations/guide/servicenow-itom-itsm-setup" >}}ServiceNow ITOM および ITSM のセットアップ{{< /nextlink >}}
   {{< nextlink href="integrations/guide/servicenow-cmdb-enrichment-setup" >}}ServiceNow CMDB エンリッチメントのセットアップ{{< /nextlink >}}
   {{< nextlink href="integrations/guide/servicenow-service-graph-connector-setup" >}}ServiceNow サービスグラフコネクタのセットアップ{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="データベースガイド" >}}
    {{< nextlink href="integrations/guide/collect-more-metrics-from-the-sql-server-integration" tag=" SQL Server" >}}SQL Server インテグレーションからより多くのメトリクスを収集する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collect-sql-server-custom-metrics" tag=" SQL Server" >}}SQL Server カスタムメトリクスの収集{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics" tag=" SQL Server" >}}WMI を使用して、より多くの SQL Server パフォーマンスメトリクスを収集する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/connection-issues-with-the-sql-server-integration" tag=" SQL Server" >}}SQL Server インテグレーションでの接続の問題{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mysql-custom-queries" tag=" MySQL" >}}MySQL カスタムクエリ{{< /nextlink >}}
    {{< nextlink href="integrations/guide/oracle-check-upgrade-7.50.1" tag=" Oracle" >}}Oracle インテグレーションの設定 (Agent 7.50.1 以降){{< /nextlink >}}
    {{< nextlink href="integrations/guide/deprecated-oracle-integration" tag=" Oracle" >}}Oracle インテグレーションの設定 (Agent バージョン 7.50.1 未満){{< /nextlink >}}
{{< /header-list >}}