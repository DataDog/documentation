---
description: Oracle Exadata のデータベースモニタリングをインストールして構成する
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Basic Oracle インテグレーション
title: Oracle Exadata のデータベースモニタリングの設定
---

{{% dbm-oracle-definition %}}

読み取り専用ユーザーとしてログインし、Agent でデータベースから直接テレメトリーを収集します。

## はじめに

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

パフォーマンスへの影響
: データベースモニタリングのデフォルトの Agent コンフィギュレーションは保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
データベースモニタリングは、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][6]してください)。

プロキシ、ロードバランサー、コネクションプーラー
: Agent は、監視対象のホストに直接接続する必要があります。Agent をプロキシ、ロードバランサー、コネクションプーラーを経由してデータベースに接続しないようご注意ください。また、各 Agent は基礎となるホスト名を把握し、フェイルオーバーの場合でも常に 1 つのホストのみを使用する必要があります。Datadog Agent が実行中に異なるホストに接続すると、メトリクス値の正確性が失われます。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][7]を参照してください。

## セットアップ

Oracle データベースでデータベースモニタリングを有効にするには、以下を実行します。

1. [Datadog ユーザーの作成](#create-the-datadog-user)
1. [Agent をインストールする](#install-the-agent)
1. [Agent の構成](#configure-the-agent)
1. [Oracle インテグレーションをインストールまたは検証する](#install-or-verify-the-oracle-integration)
1. [セットアップの検証](#validate-the-setup)

### Datadog ユーザーの作成

{{% dbm-create-oracle-user %}}

### パスワードを安全に保管
{{% dbm-secret %}}

### Agent のインストール

Agent をどこにインストールするかについては、[DBM セットアップアーキテクチャ][12]のドキュメントを参照してください。Agent は外部の Oracle クライアントを必要としません。

インストール手順については、[Agent インストール手順][9]を参照してください。

### Agent の構成

#### マルチノード Exadata

[Oracle RAC][4] の手順に従って、各ノードの Agent を構成します。

#### シングルノード Exadata

[セルフホスト型 Oracle データベース][3]の手順に従って Agent を構成します。

### セットアップの検証

[Agent の status サブコマンドを実行][1]し、**Checks** セクションで `oracle` を探します。Datadog の[ダッシュボード][11]と[データベース][2]のページに移動して開始します。

## カスタムクエリ

Database Monitoring は、Oracle データベースのカスタムクエリをサポートしています。使用可能な構成オプションの詳細については、[conf.yaml.example][5] を参照してください。

<div class="alert alert-danger">カスタムクエリを実行すると、Oracle によって追加コストまたは手数料が課される場合があります。</div>

[1]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[2]: https://app.datadoghq.com/databases
[3]: /ja/database_monitoring/setup_oracle/selfhosted
[4]: /ja/database_monitoring/setup_oracle/rac
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[6]: /ja/database_monitoring/agent_integration_overhead/?tab=oracle
[7]: /ja/database_monitoring/data_collected/#sensitive-information
[8]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[9]: https://app.datadoghq.com/account/settings/agent/latest
[10]: https://app.datadoghq.com/integrations/oracle
[11]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[12]: /ja/database_monitoring/architecture/

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}