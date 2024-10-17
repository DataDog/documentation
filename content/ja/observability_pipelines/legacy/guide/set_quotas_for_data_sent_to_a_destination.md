---
aliases:
- /ja/observability_pipelines/guide/set_quotas_for_data_sent_to_a_destination/
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/setup/
  tag: ドキュメント
  text: 観測可能性パイプラインを設定する
- link: /observability_pipelines/legacy/working_with_data/
  tag: ドキュメント
  text: 観測可能性パイプラインのデータの操作
- link: /monitors/configuration/
  tag: ドキュメント
  text: モニターの構成について
is_beta: true
private: true
title: (レガシー) 宛先に送信されるデータのクォータを設定する
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfnNnV823zAgOCowCYuXJE5cDtRqIipKsYcNpaOo1LKpGfppA/viewform" btn_hidden="false" header="アクセスをリクエストしましょう！">}}
 <code>quota</code> 変換は非公開ベータ版です。
{{< /callout >}}

## 概要

Observability Pipelines の `quota` 変換を使用して、特定の時間枠内に宛先に送信されるデータのボリュームまたはイベント数を制限できます。これは、運用コストに影響を与える可能性のある予期せぬデータ急増からの保護となります。この変換を使用すると、クォータに達したときにデータを処理するさまざまな方法をセットアップできます。例えば、以下のことが可能です。

- クォータに達したときにアラートを発するモニターをセットアップすることで、ソフトリミットを設定する。
- クォータ制限後に送信されるデータをコールドストレージなどの別の宛先に再ルーティングする。
- クォータ制限後に送信されるデータをサンプリングして、宛先に送信されるデータ量を減らす。
- クォータ制限後に送信されるデータをドロップする。

また、複数の `quota` 変換を使用して、異なる警告およびアラートの制限を設定することもできます。例えば、最初の `quota` 変換を使用して警告レベルでの制限を設定し、その制限に達したときに警告通知を送信します。その後、2 番目の `quota` 変換を使用してハードリミットを設定します。ハードリミットに達したときに、アラート通知を送信し、制限後に送信されるデータのサンプリングを開始したり、そのデータを別の宛先に再ルーティングしたりできます。

このガイドでは、以下の方法を説明します。

- [クォータ変換をセットアップする](#set-up-the-quota-transform)
- [クォータに達したときにアラートを発するモニターをセットアップする](#set-up-a-metric-monitor)
- [制限後に送信されるログを `datadog_archives` にルーティングする](#route-logs-sent-after-the-limit-to-datadog_archives)

## クォータ変換をセットアップする

1. [Observability Pipelines][1] に移動します。
1. パイプラインをクリックします。
1. **Edit draft** をクリックします。
1. **+ Add Component** をクリックします。
1. **Transforms** タブをクリックします。
1. **Quota** タイルをクリックします。
1. コンポーネントの名前を入力します。
1. 変換の入力を 1 つ以上選択します。
1. **Limits** セクションで、
   a. 単位タイプを選択します。クォータ制限の単位はイベント数またはデータのボリュームにできます。
   b. **Max** フィールドに制限を入力します。
1. **Window** フィールドに時間枠を入力します。
   例えば、宛先に 1 日あたり最大 2GB のログを送信するように変換を構成するには、以下のように設定します。
    - 単位タイプに **Bytes** を選択
    - **Max** フィールドに `2000000000` を入力
    - **Window** フィールドに `24h` を入力

1. **Save** をクリックします。
1. `quota` 変換からログを取り込む各宛先または変換について、コンポーネントのタイルをクリックし、制限に達した後に送信されるデータの入力 ID として `<transform_name>.dropped` を追加します。

### 制限後に送信されるデータの処理

以下の例は、`quota` 変換を使用した構成を示しています。この構成では、クォータ制限後に送信されたデータは `print_dropped` 宛先に送られ、データがコンソールに出力されてドロップされます。また、そのデータを[サンプリング][2]したり、ドロップする代わりに別の[宛先][3]に再ルーティングすることもできます。

```yaml
sources:
 generate_syslog:
   type: demo_logs
   format: syslog
   interval: 1
transforms:
 parse_syslog:
   type: remap
   inputs:
     - generate_syslog
   source: |
     # メッセージを syslog としてパース
     . = parse_syslog!(.message)
     .environment = "demo"
     .application = "opw"
 quota_example:
   type:
     quota
   inputs:
     - parse_syslog
   limit:
     type: bytes
     bytes:
       max: 20000
   window:
     1h
sinks:
 print_syslog:
   type: console
   inputs:
     - quota_1
   encoding:
     codec: json
  print_dropped:
    type: console
    inputs:
      - quota_example.dropped
    encoding:
      codec: json

```

この例におけるソース、変換、およびシンクの詳細については、[構成][4]を参照してください。

## クォータに達したときにアラートを発するモニターをセットアップする

### クォータメトリクス

以下の `quota` 変換メトリクスを使用してモニターをセットアップできます。

- `quota_limit_events` (ゲージ)
- `quota_limit_bytes` (ゲージ)
- `component_errors_total` (カウンター)

前述の[構成例](#handling-data-sent-after-the-limit)では、以下のメトリクスとタグの組み合わせを使用して、制限後に送信されてドロップされたすべてのイベントを見つけます。

- メトリクス: `vector.component_sent_event_bytes_total`
    - タグ: `component_id:quota_example` と `output:dropped`

構成で `event` タイプを指定している場合、以下のメトリクスとタグの組み合わせを使用して、制限後に送信されたすべてのイベントを表示します。

- メトリクス: `vector.component_sent_events_total`
    - タグ: `component_id:quota_example` と `output:dropped`

### メトリクスモニターをセットアップする

クォータに達したときにアラートを発するモニターをセットアップするには

1. [New Monitor][5] ページに移動します。
1. **Metric** を選択します。
1. 検出方法は **Threshold Alert** のままにします。
1. **Define the metric** フィールドで、
   a. メトリクスに `vector.component_sent_event_bytes_total` を入力します。
   b. **from** フィールドに `component_id:<transform_name>,output:dropped` を追加します。`<transform_name>` は `quota` 変換の名前です。
   c. **sum by** フィールドに `host` を入力します。
   d. クエリの評価設定は `last 5 minutes` の `sum` のままにします。
1. **Set alert conditions** セクションで、
   a. トリガー設定は、評価値が任意の `host` でしきい値を `above` のままにします。
   b. **Alert threshold** に `1` を入力します。これは、メトリクスクエリが 1 を超える場合にモニターがアラートを発することを意味します。
詳細については、[メトリクスモニター][6]を参照してください。
1. **Configure notifications and automations** セクションで、
   a. モニターの名前を入力します。
   b. 通知メッセージを入力します。メッセージのカスタマイズについては、[通知][7]と[変数][8]を参照してください。
   c. 通知を送信する対象やサービスを選択します。
1. オプションで、[再通知][9]、タグ、チーム、およびモニターの[優先度][10]を設定できます。
1. **Define permissions and audit notifications** セクションでは、[権限][11]や監査通知を定義できます。
1. **Create** をクリックします。

## 制限後に送信されるログを `datadog_archives` にルーティングする

Observability Pipelines の `datadog_archives` 宛先は、ログを Datadog で再ハイドレート可能な形式にフォーマットし、[Log Archives][12] にルーティングします。`datadog_archives` のセットアップについては、[Datadog で再ハイドレート可能な形式でログを Amazon S3 にルーティングする][13]を参照してください。

以下の構成例は、前述の[構成例](#handling-data-sent-after-the-limit)に似ていますが、宛先タイプが `datadog_archives` になっています。クォータに達した後に Observability Pipelines に送信されるすべてのログは、アーカイブにルーティングされます。

```yaml
sources:
 generate_syslog:
   type: demo_logs
   format: syslog
   interval: 1
transforms:
 parse_syslog:
   type: remap
   inputs:
     - generate_syslog
   source: |
     # メッセージを syslog としてパース
     . = parse_syslog!(.message)
     .environment = "demo"
     .application = "opw"
 quota_archiving_example:
   type:
     quota
   inputs:
     - parse_syslog
   limit:
     type: bytes
     bytes:
       max: 200000
   window:
     1m
sinks:
 archive_dropped:
   type: datadog_archives
   inputs:
     - quota_archiving_example.dropped
    bucket: "<DD_ARCHIVES_BUCKET>"
    service: "<STORAGE_SERVICE>"
```

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/legacy/reference/transforms/#sample
[3]: /ja/observability_pipelines/legacy/reference/sinks/
[4]: /ja/observability_pipelines/legacy/configurations/
[5]: https://app.datadoghq.com/monitors/create
[6]: /ja/monitors/types/metric/
[7]: /ja/monitors/notify/
[8]: /ja/monitors/notify/variables/
[9]: /ja/monitors/notify/#renotify
[10]: /ja/monitors/notify/#metadata
[11]: /ja/monitors/configuration/#permissions
[12]: /ja/logs/log_configuration/archives/
[13]: /ja/observability_pipelines/legacy/guide/route_logs_in_datadog_rehydratable_format_to_amazon_s3/