---
description: Oracle RAC のデータベースモニタリングをインストールして構成する
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Basic Oracle インテグレーション
title: Oracle RAC のデータベースモニタリングの設定
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-info">
このページで説明されている機能は非公開ベータ版です。フィードバックやリクエストについては、カスタマーサクセスマネージャーにお問い合わせください。
</div>

データベースモニタリングは、クエリサンプルを公開することで、Oracle データベースを深く可視化し、さまざまなワークロードをプロファイリングして問題を診断します。

## セットアップ

Database Monitoring を有効にするには、以下の手順を実行します。

[セルフホスト Oracle データベース][7]の手順に従って各 RAC ノードの Agent を構成します。

Agent は `V$` ビューに対してクエリを実行することで、すべてのノードから個別に情報を収集するため、Agent の構成は各 Real Application Cluster (RAC) ノードに対して行う必要があります。Agent は、インターコネクトトラフィックの生成を避けるため、いかなる `GV$` ビューに対してもクエリを実行しません。各 RAC ノードから収集されたデータは、フロントエンドで集計されます。

```yaml
init_config:
instances:
  - server: '<RAC_NODE_1>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # Oracle CDB サービス名
    username: 'c##datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # オプション
      - rac_cluster:<CLUSTER_NAME>
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<RAC_NODE_2>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # Oracle CDB サービス名
    username: 'c##datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # オプション
      - rac_cluster:<CLUSTER_NAME>
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Agent CDB にのみ接続します。CDB に接続している間、PDB に関する情報をクエリします。個別の PDB に対する接続を作成しないでください。

`rac_cluster` 構成パラメーターに RAC クラスター名または何かわかりやすい別名を設定します。`rac_cluster` フィルターは、[DBM Oracle Database Overview ダッシュボード][8]ですべての RAC ノードを選択するのに役立ちます。興味のあるデータベースを対象に、追加のフィルターを設定することもできます。

### 検証

[Agent の status サブコマンドを実行][5]し、**Checks** セクションで `oracle-dbm` を探します。Datadog の[データベース][6]のページへ移動して開始します。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: /ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: /ja/database_monitoring/setup_oracle/selfhosted
[8]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}