---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/README.md'
display_name: JBoss/WildFly
git_integration_title: jboss_wildfly
guid: ff99b3d2-9c14-4cdf-b869-7b8b1cbf0716
integration_id: jboss-wildfly
integration_title: JBoss/WildFly
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: jboss.
metric_to_check: ''
name: jboss_wildfly
public_title: Datadog-JBoss/WildFly インテグレーション
short_description: JBoss および WildFly アプリケーションからさまざまな JMX メトリクスを収集
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [JBoss][1] および [WildFly][2] アプリケーションを監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インストール

JBoss/WildFly チェックは [Datadog Agent][4] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. JBoss または WildFly アプリケーションサーバーのパフォーマンスデータの収集を開始するには、
   Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `jboss_wildfly.d/conf.yaml`
   ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル jboss_wildfly.d/conf.yaml][5] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集対象のメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][6]で詳細な手順を参照してください。
   制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][7]までお問い合わせください。

2. [Agent を再起動します][8]。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. 次に、下部にある `logs` 行のコメントを解除して、`jboss_wildfly.d/conf.yaml` を編集します。ログの `path` を JBoss ログファイルの正しいパスで更新してください。

    ```
      logs:
        - type: file
          path: /opt/jboss/wildfly/standalone/log/*.log
          source: jboss_wildfly
          service: <APPLICATION_NAME>
    ```

3. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `jboss_wildfly` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "jboss_wildfly" >}}


### イベント

JBoss/WildFly インテグレーションには、イベントは含まれません。

### サービスのチェック

JBoss/WildFly インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://developers.redhat.com/products/eap/overview
[2]: http://wildfly.org
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/integrations/java
[7]: https://docs.datadoghq.com/ja/help
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information


{{< get-dependencies >}}