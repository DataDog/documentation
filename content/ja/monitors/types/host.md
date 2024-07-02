---
title: Host Monitor
description: "Check if one or more hosts are reporting to Datadog"
aliases:
    - /monitors/monitor_types/host
    - /monitors/create/types/host/
further_reading:
- link: /infrastructure/
  tag: Documentation
  text: Infrastructure Monitoring
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Consult your monitor status
---

## 概要

Infrastructure monitoring provides visibility into your entire IT environment, including cloud-hosted and on-prem servers, through many integrations. Use the Host monitor to stay informed on which hosts are or are not submitting data to ensure continuous visibility.

すべての Datadog Agent は、ステータスが `OK` の `datadog.agent.up` というサービスチェックを報告します。ホストモニターを使用して、1 つ以上のホストでこのチェックを監視できます。

## モニターの作成

Datadog で[ホストモニター][1]を作成するには、メインナビゲーションを使用して次のように移動します: *Monitors --> New Monitor --> Host*。

### ホストを名前またはタグで選ぶ

ホスト名、タグ、または `All Monitored Hosts` を選択して、監視するホストを決定します。特定のホストを除外する必要がある場合は、2 番目のフィールドに名前やタグをリストアップします。

- インクルードフィールドでは `AND` ロジックを使用します。ホストに存在するリストアップされたすべての名前とタグはスコープに含まれます。
- エクスクルードフィールドでは `OR` ロジックを使用します。リストアップされた名前やタグを持つホストはスコープから除外されます。

#### 例

| モニター                                                | 含める               | 除外する     |
|--------------------------------------------------------|-----------------------|-------------|
| タグ `env:prod` を持つすべてのホストを含めます              | `env:prod`            | 空のままにする |
| タグ `env:test` を持つホストを除くすべてのホストを含めます | `All Monitored Hosts` | `env:test`  |

### アラートの条件を設定する

このセクションで、**Check Alert** または **Cluster Alert** を選択します。

{{< tabs >}}
{{% tab "Check Alert" %}}

チェックアラートは、ホストが一定時間レポートを停止したかどうかを追跡します。チェック実行後の時間が長すぎると、ホストからのデータ送信に関する問題の兆候になります。

欠落データを確認する分数を入力します。デフォルト値は 2 分です。

`datadog.agent.up` が指定された分数以上 `OK` ステータスのレポートを停止すると、アラートがトリガーされます。

{{% /tab %}}
{{% tab "Cluster Alert" %}}

クラスターアラートは、一定時間、ホストの一部がレポートを停止したかどうかを追跡します。

クラスターアラートをセットアップするには

1. タグによりホストをグループ化するかどうか決定します。`Ungrouped` は含まれるすべてのホストでステータスのパーセンテージを計算します。`Grouped` は各グループごとのステータスのパーセンテージを計算します。
2. アラートと警告のしきい値の割合を選択します。1 つの設定（アラートまたは警告）のみ必須です。
3. 欠落データを確認する分数を入力します。デフォルト値は 2 分です。

`datadog.agent.up` が指定された分数以上 `OK` ステータスのレポートを停止し、パーセンテージのしきい値に達すると、アラートがトリガーされます。

{{% /tab %}}
{{< /tabs >}}

### 高度なアラート条件

高度なアラートオプション (自動解決、新しいグループ遅延など) の詳細な手順については、[モニターコンフィギュレーション][2]ページを参照してください。

### 通知

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][3] page.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/host
[2]: /monitors/configuration/#advanced-alert-conditions
[3]: /monitors/notify/
