---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    IBM_WAS: assets/dashboards/overview.json
  logs:
    source: ibm_was
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - OS & システム
  - ログの収集
  - オートディスカバリー
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/ibm_was/README.md
display_name: IBM WAS
draft: false
git_integration_title: ibm_was
guid: ba177bb7-1bad-4ea8-ac59-1bc8a016f4f7
integration_id: ibm-was
integration_title: IBM WAS
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ibm_was.
metric_to_check: ibm_was.can_connect
name: ibm_was
public_title: Datadog-IBM WAS インテグレーション
short_description: IBM Websphere Application Server は Java アプリケーションをホストするフレームワークです
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [IBM Websphere Application Server (WAS)][1] を監視します。このチェックは IBM WAS バージョン >=  8.5.5 をサポートします。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

IBM WAS Datadog インテグレーションは、有効になっている PMI カウンターを WebSphere Application Server 環境から収集します。セットアップでは PerfServlet を有効にする必要があります。PerfServlet は、Datadog が WAS からパフォーマンスデータを取得する方法を提供します。

このチェックはデフォルトで、JDBC、JVM、スレッドプール、および Servlet Session Manager のメトリクスを収集します。オプションで追加のメトリクスを指定して、"custom_queries" セクションに収集することができます。例については、[サンプルチェック構成][3]を参照してください。

### インストール

IBM WAS チェックは [Datadog Agent][4] パッケージに含まれています。

#### `PerfServlet` の有効化

サーブレットの .ear ファイル (PerfServletApp.ear) は、`<WAS_HOME>/installableApps` ディレクトリにあります。ここで、`<WAS_HOME>` は WebSphere Application Server のインストールパスです。

パフォーマンスサーブレットは、他のサーブレットとまったく同様にデプロイされます。ドメイン内の単一のアプリケーションサーバーインスタンスに、サーブレットをデプロイします。

**注**: バージョン 6.1 から PerfServlet を動作させるには、アプリケーションセキュリティを有効にする必要があります。

### 現在モニターされている統計セットの変更

デフォルトでは、アプリケーションサーバーは "基本" 監視用に構成されています。JVM、JDBC 接続、およびサーブレット接続を完全に可視化するには、現在モニターされているアプリケーションサーバーの統計セットを "基本" から "すべて" に変更します。

この設定は、Websphere 管理コンソールの `Application servers >  <YOUR_APP_SERVER> > Performance Monitoring Infrastructure (PMI)` にあります。

この変更を行ったら、"適用" をクリックしてコンフィギュレーションを保存し、アプリケーションサーバーを再起動します。この変更を行ってからしばらくすると、追加した JDBC、JVM、およびサーブレットのメトリクスが Datadog に表示されます。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. IBM WAS のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ibm_was.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル ibm_was.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

##### ログの収集

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
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<インテグレーション名>` | `ibm_was`                                                                     |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                 |
| `<インスタンスコンフィギュレーション>`  | `{"servlet_url": "http://%%host%%:%%port%%/wasPerfTool/servlet/perfservlet"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ibm_was", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションの `ibm_was` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ibm_was" >}}


### イベント

IBM WAS には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "ibm_was" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://www.ibm.com/cloud/websphere-application-platform
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/