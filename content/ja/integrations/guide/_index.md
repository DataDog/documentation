---
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: Integrations Guides
disable_toc: true
private: true
title: Integration Guides
---

{{< whatsnext desc="一般ガイド:" >}}
    {{< nextlink href="integrations/guide/requests" tag="documentation" >}}Datadog インテグレーションをリクエストする{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/reference-tables/" tag=" Documentation" >}}リファレンステーブルでカスタムメタデータを追加する{{< /nextlink >}} 
    {{< nextlink href="integrations/guide/source-code-integration" tag=" Documentation" >}}Datadog のソースコードインテグレーション{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-metric-delay" tag="cloud" >}}クラウドメトリクスの遅延{{< /nextlink >}}
    {{< nextlink href="integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class" tag="Windows" >}}WMI クラス `Win32_NTLogEvent` にイベントログファイルを追加する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/retrieving-wmi-metrics" tag="Windows" >}}WMI メトリクスの取得{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mongo-custom-query-collection" tag="MongoDB" >}}MongoDB カスタムメトリクスを収集する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-metrics" tag="Prometheus" >}}Prometheus メトリクスを Datadog メトリクスにマッピングする{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-host-collection" tag="Prometheus" >}}ホストからの Prometheus および OpenMetrics メトリクス収集{{< /nextlink >}}
    {{< nextlink href="integrations/guide/freshservice-tickets-using-webhooks" tag="Webhooks" >}}Webhooks を利用した Freshservice のチケット{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hadoop-distributed-file-system-hdfs-integration-error" tag="Hadoop" >}}Hadoop Distributed File System (HDFS) インテグレーションエラー{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hcp-consul" tag="Consul" >}}Datadog を使用した HCP Consul の監視{{< /nextlink >}}
    {{< nextlink href="integrations/guide/agent-failed-to-retrieve-rmiserver-stub" tag="kafka" >}}Agent が RMIServer スタブの取得に失敗した{{< /nextlink >}}
    {{< nextlink href="integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/" tag="network" >}}TCP/UDP のホストメトリクスを Datadog API に送信する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/snmp-commonly-used-compatible-oids/" tag="snmp" >}}SNMP で一般的に使用される互換性のある OID{{< /nextlink >}}
    {{< nextlink href="integrations/guide/versions-for-openmetrics-based-integrations" tag=" openmetrics" >}}OpenMetrics ベースのインテグレーションのバージョン管理{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-foundry-setup" tag=" pivotal cloud foundry" >}}Pivotal Cloud Foundry の手動セットアップ{{< /nextlink >}}
    {{< nextlink href="integrations/guide/application-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}VMware Tanzu のための Datadog Application Monitoring{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cluster-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}VMware Tanzu のための Datadog Cluster Monitoring{{< /nextlink >}} 
{{< /whatsnext >}}

{{< whatsnext desc="AWS ガイド:" >}}
    {{< nextlink href="getting_started/integrations/aws/" tag="AWS" >}}CloudFormation による AWS インテグレーションの自動セットアップ{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-terraform-setup" tag="AWS" >}}Terraform による AWS インテグレーションの自動セットアップ{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-organizations-setup" tag=" AWS" >}}組織向け AWS インテグレーションマルチアカウント設定{{< /nextlink >}}
{{< nextlink href="integrations/guide/aws-manual-setup" tag=" AWS" >}}AWS インテグレーションに関するトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="integrations/guide/monitor-your-aws-billing-details" tag="AWS" >}}AWS の請求詳細を監視する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/error-datadog-not-authorized-sts-assume-role" tag="AWS" >}}エラー: Datadog は sts:AssumeRole を実行する権限がありません{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose" tag="AWS" >}}AWS CloudWatch Metric Streams と Amazon Data Firehose{{< /nextlink >}}
    {{< nextlink href="integrations/guide/amazon_cloudformation" tag="AWS" >}}Amazon CloudFormation の使用{{< /nextlink >}}
{{< nextlink href="integrations/guide/events-from-sns-emails" tag=" AWS" >}}Amazon SNS のメールから Datadog のイベントを作成する{{< /nextlink >}}
{{< nextlink href="integrations/guide/aws-integration-and-cloudwatch-faq" tag="AWS" >}}AWS インテグレーションと CloudWatch の FAQ{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Azure guides:" >}}
    {{< nextlink href="integrations/guide/azure-manual-setup" tag=" Azure" >}}Azure manual setup guide{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-manual-setup" tag=" Azure" >}}Azure Native manual setup guide{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-programmatic-management" tag=" Azure" >}}Azure integration programmatic management guide{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-programmatic-management" tag=" Azure" >}}Azure Native integration programmatic management guide{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-portal" tag=" Azure" >}}Managing the Azure Native Integration{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-cloud-adoption-framework" tag=" Azure" >}}Azure Cloud Adoption Framework with Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-troubleshooting" tag=" Azure" >}}Azure troubleshooting{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-architecture-and-configuration" tag=" Azure" >}}Azure architecture and configuration{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-status-metric" tag=" Azure" >}}Azure status and count metrics{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-vms-appear-in-app-without-metrics" tag=" Azure" >}}Azure VMs appear in the app without metrics{{< /nextlink >}}
    {{< nextlink href="integrations/guide/powered-down-azure-vm-on-infrastructure-list" tag=" Azure" >}}Powered-down Azure VMs on the Infrastructure list{{< /nextlink >}}
    {{< nextlink href="integrations/guide/powershell-command-to-install-azure-datadog-extension" tag=" Azure" >}}Commands to install the Azure Datadog extension{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-graph-api-permissions" tag=" Azure" >}}Microsoft Graph API Permissions for Monitoring Azure{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="JMX ガイド" >}}
    {{< nextlink href="integrations/guide/running-jmx-commands-in-windows" tag="jmx" >}}Windows で JMX コマンドを実行する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collecting-composite-type-jmx-attributes" tag="jmx" >}}コンポジット型 JMX 属性の収集{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags" tag="jmx" >}}Bean 正規表現を使用して、JMX メトリクスをフィルターし、追加のタグを供給する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmx_integrations/" tag=" jmx" >}}Jmxfetch はどのインテグレーションで使われていますか？{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="データベースガイド" >}}
    {{< nextlink href="integrations/guide/collect-more-metrics-from-the-sql-server-integration" tag="SQL Server" >}}SQL Server インテグレーションからより多くのメトリクスを収集する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collect-sql-server-custom-metrics" tag=" SQL Server" >}}SQL Server カスタムメトリクスの収集{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics" tag="SQL Server" >}}WMI を使用して、より多くの SQL Server パフォーマンスメトリクスを収集する{{< /nextlink >}}
    {{< nextlink href="integrations/guide/connection-issues-with-the-sql-server-integration" tag="SQL Server" >}}SQL Server とのインテグレーションにおける接続の問題{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mysql-custom-queries" tag="MySQL" >}}MySQL カスタムクエリ{{< /nextlink >}}
{{< nextlink href="integrations/guide/oracle-check-upgrade-7.50.1" tag=" racle" >}}Agent 7.50.1+ における Oracle インテグレーションの構成{{< /nextlink >}}
{{< nextlink href="integrations/guide/deprecated-oracle-integration" tag=" Oracle" >}}Agent バージョン 7.50.1 未満における Oracle インテグレーションの構成{{< /nextlink >}}
{{< /whatsnext >}}