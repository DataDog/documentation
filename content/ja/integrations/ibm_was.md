---
app_id: ibm-was
app_uuid: c4c79ae5-b702-415c-bc76-a7b71efd43d8
assets:
  dashboards:
    IBM_WAS: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_was.can_connect
      metadata_path: metadata.csv
      prefix: ibm_was.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10048
    source_type_name: IBM WAS
  logs:
    source: ibm_was
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- OS & システム
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_was/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_was
integration_id: ibm-was
integration_title: IBM WAS
integration_version: 3.3.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: ibm_was
public_title: IBM WAS
short_description: IBM Websphere Application Server は Java アプリケーションをホストするフレームワークです
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::OS & System
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: IBM Websphere Application Server は Java アプリケーションをホストするフレームワークです
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IBM WAS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [IBM Websphere Application Server (WAS)][1] を監視します。このチェックは IBM WAS バージョン >=  8.5.5 をサポートします。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

IBM WAS Datadog インテグレーションは、有効になっている PMI カウンターを WebSphere Application Server 環境から収集します。セットアップでは PerfServlet を有効にする必要があります。PerfServlet は、Datadog が WAS からパフォーマンスデータを取得する方法を提供します。

このチェックはデフォルトで、JDBC、JVM、スレッドプール、および Servlet Session Manager のメトリクスを収集します。オプションで追加のメトリクスを指定して、"custom_queries" セクションに収集することができます。例については、[サンプルチェック構成][3]を参照してください。

### インフラストラクチャーリスト

IBM WAS チェックは [Datadog Agent][4] パッケージに含まれています。

#### `PerfServlet` の有効化

サーブレットの .ear ファイル (PerfServletApp.ear) は、`<WAS_HOME>/installableApps` ディレクトリにあります。ここで、`<WAS_HOME>` は WebSphere Application Server のインストールパスです。

パフォーマンスサーブレットは、他のサーブレットとまったく同様にデプロイされます。ドメイン内の単一のアプリケーションサーバーインスタンスに、サーブレットをデプロイします。

**注**: バージョン 6.1 から PerfServlet を動作させるには、アプリケーションセキュリティを有効にする必要があります。

### モニターされている統計セットの変更

デフォルトでは、アプリケーションサーバーは "基本" 監視用に構成されています。JVM、JDBC 接続、およびサーブレット接続を可視化するには、モニターされているアプリケーションサーバーの統計セットを "基本" から "すべて" に変更します。

この設定は、Websphere 管理コンソールの `Application servers >  <YOUR_APP_SERVER> > Performance Monitoring Infrastructure (PMI)` にあります。

この変更を行ったら、"適用" をクリックしてコンフィギュレーションを保存し、アプリケーションサーバーを再起動します。この変更を行ってからしばらくすると、追加した JDBC、JVM、およびサーブレットのメトリクスが Datadog に表示されます。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. IBM WAS のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ibm_was.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル ibm_was.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. 次に、下部にある `logs` 行のコメントを解除して、`ibm_was.d/conf.yaml` を編集します。ログの `path` を WAS ログファイルの正しいパスで更新してください。

   ```yaml
   logs:
     - type: file
       path: /opt/IBM/WebSphere/AppServer/profiles/InfoSphere/logs/server1/*.log
       source: ibm_was
       service: websphere
   ```

3. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_was`                                                                     |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                 |
| `<INSTANCE_CONFIG>`  | `{"servlet_url": "http://%%host%%:%%port%%/wasPerfTool/servlet/perfservlet"}` |

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ibm_was", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションの `ibm_was` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "ibm_was" >}}


### ヘルプ

IBM WAS には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "ibm_was" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://www.ibm.com/cloud/websphere-application-platform
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/