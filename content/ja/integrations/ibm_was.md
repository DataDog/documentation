---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - OS & システム
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ibm_was/README.md'
display_name: IBM WAS
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

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照してこの手順を行ってください。

IBM WAS Datadog インテグレーションは、有効になっている PMI カウンターを WebSphere Application Server 環境から収集します。セットアップでは PerfServlet を有効にする必要があります。PerfServlet は、Datadog が WAS からパフォーマンスデータを取得する方法を提供します。

このチェックはデフォルトで、JDBC、JVM、スレッドプール、および Servlet Session Manager のメトリクスを収集します。オプションで追加のメトリクスを指定して、"custom_queries" セクションに収集することができます。例については、[サンプルチェック構成][2]を参照してください。

### インストール

IBM WAS チェックは [Datadog Agent][3] パッケージに含まれています。

#### PerfServlet の有効化
サーブレットの .ear ファイル (PerfServletApp.ear) は、`<WAS_HOME>/installableApps` ディレクトリにあります。ここで、`<WAS_HOME>` は WebSphere Application Server のインストールパスです。

パフォーマンスサーブレットは、他のサーブレットとまったく同様にデプロイされます。ドメイン内の単一のアプリケーションサーバーインスタンスに、サーブレットをデプロイします。

**注**: バージョン 6.1 から PerfServlet を動作させるには、アプリケーションセキュリティを有効にする必要があります。

### 現在モニターされている統計セットの変更
デフォルトでは、アプリケーションサーバーは "基本" 監視用に構成されています。JVM、JDBC 接続、およびサーブレット接続を完全に可視化するには、現在モニターされているアプリケーションサーバーの統計セットを "基本" から "すべて" に変更します。

この設定は、Websphere 管理コンソールの `Application servers >  <YOUR_APP_SERVER> > Performance Monitoring Infrastructure (PMI)` にあります。

この変更を行ったら、"適用" をクリックして構成を保存し、アプリケーションサーバーを再起動します。この変更を行ってからしばらくすると、追加した JDBC、JVM、およびサーブレットのメトリクスが Datadog に表示されます。

### コンフィグレーション

1. IBM WAS のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `ibm_was.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル ibm_was.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][4]。

#### ログの収集

**Agent 6.0 以上で使用可能**

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

3. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションの `ibm_was` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ibm_was" >}}


### サービスのチェック

**ibm_was.can_connect**:<br>
何らかの理由で Agent が PerfServlet サーバーに接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

IBM WAS には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://www.ibm.com/cloud/websphere-application-platform
[2]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/metadata.csv
[7]: https://docs.datadoghq.com/ja/help
[8]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}