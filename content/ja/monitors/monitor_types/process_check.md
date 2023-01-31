---
title: プロセスチェックモニター
kind: documentation
description: ホストでプロセスが実行されているかをチェックする
further_reading:
  - link: /monitors/notifications/
    tag: ドキュメント
    text: モニター通知の設定
  - link: /monitors/downtimes/
    tag: ドキュメント
    text: モニターをミュートするダウンタイムのスケジュール
  - link: /monitors/monitor_status/
    tag: ドキュメント
    text: モニターステータスを確認
---
## 概要

プロセスチェックモニターは、Agent チェック `process.up` が生成するステータスを監視します。Agent レベルで、一致するプロセスの数に基づいて[チェックしきい値を構成][1]できます。

## モニターの作成

Datadog で[プロセスチェックモニター][2]を作成するには、メインナビゲーションを使用して次のように移動します: Monitors --> New Monitor --> Process Check。

### プロセスを選択する

ドロップダウンリストから、監視するプロセスを選択します。検索条件を入力してリストをフィルターします。

### モニターの対象範囲を選択

ホスト名、タグ、または `All Monitored Hosts` を選択して、監視するホストを決定します。選択したプロセスのステータスを報告するホストまたはタグのみが表示されます。特定のホストを除外する必要がある場合は、2 番目のフィールドに名前やタグをリストアップします。

* インクルードフィールドでは `AND` ロジックを使用します。ホストに存在するリストアップされたすべてのホスト名とタグはスコープに含まれます。
* エクスクルードフィールドでは `OR` ロジックを使用します。リストアップされた名前やタグを持つホストはスコープから除外されます。

### アラートの条件を設定する

{{< tabs >}}
{{% tab "Check Alert" %}}

チェックアラートは、チェックグループごとに送信されたステータスを連続的にトラックし、しきい値と比較します。プロセスチェックモニターの場合、グループは静的です（`host` と `process`）。

チェックアラートをセットアップする

1. 連続して `<NUMBER>` 回失敗したらアラートをトリガーするか、回数を選択します。

    各チェックは `OK`、`WARN`、`CRITICAL` のいずれか 1 つのステータスを送信します。`WARN` と `CRITICAL` ステータスが連続して何回送信されたら通知をトリガーするか選択します。たとえば、プロセスで接続に失敗する異常が 1 回発生したとします。値を `> 1` に設定した場合、この異常は無視されますが、2 回以上連続で失敗した場合は通知をトリガーします。

2. 連続して成功したらアラートを解決する回数を選択します `<NUMBER>`

    何回連続して `OK` ステータスが送信されたらアラートを解決するか、回数を選択します。

{{% /tab %}}
{{% tab "Cluster Alert" %}}

クラスターアラートは、既定のステータスでプロセスチェックの割合を計算し、しきい値と比較します。

クラスターアラートをセットアップする

1. タグによりプロセスチェックをグループ化するかどうか決定します。`Ungrouped` はすべてのソースでステータスのパーセンテージを計算します。`Grouped` は各グループごとのステータスのパーセンテージを計算します。

2. アラートと警告のしきい値の割合を選択します。1 つの設定（アラートまたは警告）のみ必須です。

{{% /tab %}}
{{< /tabs >}}

[No data][4]、[Auto resolve][5]、[Evaluation delay][6]の各オプションに関する情報は、[メトリクスモニター][3]ドキュメントを参照してください。

### Notifications

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][7] のページを参照してください。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/process/
[2]: https://app.datadoghq.com/monitors#create/process
[3]: /ja/monitors/monitor_types/metric/
[4]: /ja/monitors/monitor_types/metric/#no-data
[5]: /ja/monitors/monitor_types/metric/#auto-resolve
[6]: /ja/monitors/monitor_types/metric/#evaluation-delay
[7]: /ja/monitors/notifications/