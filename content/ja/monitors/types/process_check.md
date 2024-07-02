---
title: Process Check Monitor
description: "Check if a process is running on a host"
aliases:
- /monitors/monitor_types/process_check
- /monitors/create/types/process_check/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Check your monitor status
---

## 概要

プロセスチェックモニターは、Agent チェック `process.up` が生成するステータスを監視します。Agent レベルで、一致するプロセスの数に基づいて[チェックしきい値を構成][1]できます。

## モニターの作成

Datadog で[プロセスチェックモニター][2]を作成するには、メインナビゲーションを使用して次のように移動します: Monitors --> New Monitor --> Process Check。

### プロセスを選択する

ドロップダウンリストから、監視するプロセスを選択します。検索条件を入力してリストをフィルターします。

### モニターのスコープを選択

ホスト名、タグ、または `All Monitored Hosts` を選択して、監視するホストを決定します。選択したプロセスのステータスを報告するホストまたはタグのみが表示されます。特定のホストを除外する必要がある場合は、2 番目のフィールドに名前やタグをリストアップします。

* インクルードフィールドでは `AND` ロジックを使用します。リストアップされたすべてのホスト名とタグが存在するホストがスコープに含まれます。
* エクスクルードフィールドでは `OR` ロジックを使用します。リストアップされた名前やタグを持つホストはスコープから除外されます。

### アラートの条件を設定する

{{< tabs >}}
{{% tab "Check Alert" %}}

チェックアラートは、チェックグループごとに送信されたステータスを連続的にトラックし、しきい値と比較します。プロセスチェックモニターの場合、グループは静的です（`host` と `process`）。

チェックアラートをセットアップする

1. 何回連続して失敗したらアラートをトリガーするか、回数 `<数値>` を選択します。

    各チェックは `OK`、`WARN`、`CRITICAL` のいずれか 1 つのステータスを送信します。`WARN` と `CRITICAL` ステータスが連続して何回送信されたら通知をトリガーするか選択します。たとえば、プロセスで接続に失敗する異常が 1 回発生したとします。値を `> 1` に設定した場合、この異常は無視されますが、2 回以上連続で失敗した場合は通知をトリガーします。

2. 何回連続して成功したらアラートを解決するか、回数 `<数値>` を選択します。

    何回連続して `OK` ステータスが送信されたらアラートを解決するか、回数を選択します。

{{% /tab %}}
{{% tab "Cluster Alert" %}}

クラスターアラートは、既定のステータスでプロセスチェックの割合を計算し、しきい値と比較します。

クラスターアラートをセットアップする

1. タグによりプロセスチェックをグループ化するかどうか決定します。`Ungrouped` はすべてのソースでステータスのパーセンテージを計算します。`Grouped` は各グループごとのステータスのパーセンテージを計算します。

2. アラートと警告のしきい値の割合を選択します。1 つの設定（アラートまたは警告）のみ必須です。

タグの個別の組み合わせでタグ付けされた各チェックは、クラスター内の個別のチェックと見なされます。タグの各組み合わせの最後のチェックのステータスのみが、クラスターのパーセンテージの計算で考慮されます。

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="クラスターチェックのしきい値" style="width:90%;">}}

たとえば、環境ごとにグループ化されたクラスターチェックモニターは、いずれかの環境のチェックの 70% 以上が `CRITICAL` ステータスを送信した場合にアラートし、いずれかの環境のチェックの70% 以上が `WARN` ステータスを送信した場合に警告できます。
{{% /tab %}}
{{< /tabs >}}

#### 高度なアラート条件

[データなし][4]、[自動解決][5]、[新しいグループ遅延][6]の各オプションに関する情報は、[モニターコンフィギュレーション][3]ドキュメントを参照してください。

### 通知

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][7] page.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/process/
[2]: https://app.datadoghq.com/monitors#create/process
[3]: /monitors/configuration/#advanced-alert-conditions
[4]: /monitors/configuration/#no-data
[5]: /monitors/configuration/#auto-resolve
[6]: /monitors/configuration/#new-group-delay
[7]: /monitors/notify/
