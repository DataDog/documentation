---
aliases:
- /ja/monitors/monitor_types/custom_check
- /ja/monitors/create/types/custom_check/
- /ja/monitors/types/custom_check/
description: Monitor status of arbitrary service checks.
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Consult your monitor status
title: Service Check Monitor
---

## 概要

サービスチェックモニターには、Agent に含まれる [{{< translate key="integration_count" >}} 以上のインテグレーション][1]のいずれかによってレポートされないサービスチェックが含まれます。サービスチェックは、[カスタム Agent チェック][2]、[DogStatsD][3]、または [API][4] を使用して Datadog に送信できます。詳しくは、[サービスチェックの概要][5]をご覧ください。

## モニターの作成

Datadog で[サービスチェックモニター][6]を作成するには、メインナビゲーションを使用して次のように移動します: **Monitors** --> **New Monitor** --> **Service Check**。

### サービスチェックを選択する

ドロップダウンメニューからサービスチェックを選択します。

### モニターのスコープを選択

ホスト名、タグ、または `All Monitored Hosts` を選択して、監視するスコープを決定します。特定のホストを除外する必要がある場合は、2 番目のフィールドに名前やタグをリストアップします。

* インクルードフィールドでは `AND` ロジックを使用します。ホストに存在するリストアップされたすべてのホスト名とタグはスコープに含まれます。
* エクスクルードフィールドでは `OR` ロジックを使用します。リストアップされたホスト名やタグを持つホストはスコープから除外されます。

### アラートの条件を設定する

このセクションで、**Check Alert** または **Cluster Alert** を選択します。

{{< tabs >}}
{{% tab "Check Alert" %}}

チェックアラートは、各チェックグループにつき、送信されたステータスを連続的にトラックし、しきい値と比較します。

チェックアラートをセットアップする

1. チェックレポートを送信する各 `<グループ>` に対し、アラートを個別にトリガーします。
    * チェックグループは既存のグループリストから指定するか、独自に指定します。サービスチェックモニターでは、チェックごとのグループは不明なので、指定する必要があります。

2. 何回連続して失敗したらアラートをトリガーするか、回数 `<数値>` を選択します。
    * `CRITICAL` ステータスが連続して何回送信されたら通知をトリガーするか選択します。たとえば、チェックが失敗したときにすぐに通知するには、`1` 回のクリティカルステータスでモニターアラートをトリガーします。

3. Unknown ステータスに対して、`Do not notify`（通知しない）または `Notify`（通知する）を選択します。
    * `Notify` を選択した場合、`UNKNOWN` への状態遷移は通知をトリガーします。[モニターステータスページ][1]では、`UNKNOWN` 状態のグループのステータスバーには `NODATA` のグレーが表示されます。モニターの全体的なステータスは `OK` のままです。

4. 何回連続して成功したらアラートを解決するか、回数 `<数値>` を選択します。
    *  何回連続して `OK` ステータスが送信されたらアラートを解決するか、回数を選択します。たとえば、問題修正を確実にするには、`4` 回の `OK` ステータスでモニターを解決します。


[1]: /ja/monitors/manage/status
{{% /tab %}}
{{% tab "Cluster Alert" %}}

クラスターアラートは、既定のステータスでチェックの割合を計算し、しきい値と比較します。

タグの個別の組み合わせでタグ付けされた各チェックは、クラスター内の個別のチェックと見なされます。タグの各組み合わせの最後のチェックのステータスのみが、クラスターのパーセンテージの計算で考慮されます。

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="クラスターチェックのしきい値" style="width:90%;">}}

たとえば、環境ごとにグループ化されたクラスターチェックモニターは、いずれかの環境のチェックの 70% 以上が `CRITICAL` ステータスを送信した場合にアラートし、いずれかの環境のチェックの70% 以上が `WARN` ステータスを送信した場合に警告できます。

クラスターアラートをセットアップするには

1. タグによりチェックをグループ化するかどうか決定します。`Ungrouped` はすべてのソースでステータスのパーセンテージを計算します。`Grouped` は各グループごとのステータスのパーセンテージを計算します。

2. アラートと警告のしきい値の割合を選択します。1 つの設定（アラートまたは警告）のみ必須です。

{{% /tab %}}
{{< /tabs >}}

#### 高度なアラート条件

[データなし][8]、[自動解決][9]、[新しいグループ遅延][10]の各オプションに関する情報は、[モニターコンフィギュレーション][7]ドキュメントを参照してください。

### 通知

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][11] page.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/
[2]: /ja/developers/custom_checks/write_agent_check/
[3]: /ja/developers/dogstatsd/
[4]: /ja/api/v1/service-checks/
[5]: /ja/developers/service_checks/#overview
[6]: https://app.datadoghq.com/monitors/create/custom
[7]: /ja/monitors/configuration/#advanced-alert-conditions
[8]: /ja/monitors/configuration/#no-data
[9]: /ja/monitors/configuration/#auto-resolve
[10]: /ja/monitors/configuration/#new-group-delay
[11]: /ja/monitors/notify/