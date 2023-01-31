---
title: カスタムチェックモニター
kind: documentation
description: 任意のカスタムチェックのステータスを監視する。
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: モニター通知の設定
  - link: /monitors/downtimes/
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: /monitors/monitor_status/
    tag: Documentation
    text: モニターステータスの参照
---
## 概要

カスタムチェックモニターには、Agent に含まれる [{{< translate key="integration_count" >}} 以上のインテグレーション][1]のいずれかによってレポートされないサービスチェックが含まれます。カスタムサービスチェックは、[カスタム Agent チェック][2]、[DogStatsD][3]、または [API][4] を使用して Datadog に送信できます。

## モニターの作成

Datadog で[カスタムチェックモニター][5]を作成するには、メインナビゲーションを使用して次のように移動します: Monitors --> New Monitor --> Custom Check。

### カスタムチェックを選択

ドロップダウンボックスからカスタムチェックを選択します。

### モニターの対象範囲を選択

ホスト名、タグ、または `All Monitored Hosts` を選択して、監視するスコープを決定します。特定のホストを除外する必要がある場合は、2 番目のフィールドに名前やタグをリストアップします。

* インクルードフィールドでは `AND` ロジックを使用します。ホストに存在するリストアップされたすべてのホスト名とタグはスコープに含まれます。
* エクスクルードフィールドでは `OR` ロジックを使用します。リストアップされたホスト名やタグを持つホストはスコープから除外されます。

### アラートの条件を設定する

このセクションで、**Check Alert** または **Cluster Alert** を選択します。

{{< tabs >}}
{{% tab "Check Alert" %}}

チェックアラートは、チェックグループごとに送信されたステータスを連続的にトラックし、しきい値と比較します。

チェックアラートをセットアップする

1. チェックのレポートを送信する各 `<GROUP>` に対し、アラートを個別にトリガーします。

    チェックグループは既存のグループリストから指定するか、独自に指定します。カスタムチェックモニターでは、チェックごとのグループは不明なので、指定する必要があります。

2. 連続して `<NUMBER>` 回失敗したらアラートをトリガーするか、回数を選択します。

    各チェックは `OK`、`WARN`、`CRITICAL`、`UNKNOWN` のいずれか 1 つのステータスを送信します。`WARN` と `CRITICAL` ステータスが連続して何回送信されたら通知をトリガーするか選択します。たとえば、チェックが失敗したときにすぐに通知するには、`1` 回のクリティカルステータスまたは `1` 回の警告ステータスでモニターアラートをトリガーします。

3. Unknown ステータスに対して、`Do not notify`（通知しない）または `Notify`（通知する）を選択します。

4. 何回連続して成功したらアラートを解決するか、回数 `<数値>` を選択します。

    何回連続して `OK` ステータスが送信されたらアラートを解決するか、回数を選択します。たとえば、問題修正を確実にするには、`4` 回の OK ステータスでモニターを解決します。

{{% /tab %}}
{{% tab "Cluster Alert" %}}

クラスターアラートは、既定のステータスでチェックの割合を計算し、しきい値と比較します。

クラスターアラートをセットアップする

1. タグによりチェックをグループ化するかどうか決定します。`Ungrouped` はすべてのソースでステータスのパーセンテージを計算します。`Grouped` は各グループごとのステータスのパーセンテージを計算します。

2. アラートと警告のしきい値の割合を選択します。1 つの設定（アラートまたは警告）のみ必須です。

{{% /tab %}}
{{< /tabs >}}

[No data][7]、[Auto resolve][8]、[Evaluation delay][9]の各オプションに関する情報は、[メトリクスモニター][6]ドキュメントを参照してください。

### Notifications

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][10]のページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/
[2]: /ja/developers/custom_checks/write_agent_check/
[3]: /ja/developers/dogstatsd/
[4]: /ja/api/v1/service-checks/
[5]: https://app.datadoghq.com/monitors#create/custom
[6]: /ja/monitors/monitor_types/metric/
[7]: /ja/monitors/monitor_types/metric/#no-data
[8]: /ja/monitors/monitor_types/metric/#auto-resolve
[9]: /ja/monitors/monitor_types/metric/#evaluation-delay
[10]: /ja/monitors/notifications/