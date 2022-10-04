---
aliases:
- /ja/monitors/monitor_types/custom_check
description: 任意のサービスチェックのステータスを監視する。
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/notify/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/manage/status/
  tag: ドキュメント
  text: モニターステータスの参照
kind: documentation
title: サービスチェックモニター
---

## 概要

サービスチェックモニターには、Agent に含まれる [{{< translate key="integration_count" >}} 以上のインテグレーション][1]のいずれかによってレポートされないサービスチェックが含まれます。サービスチェックは、[カスタム Agent チェック][2]、[DogStatsD][3]、または [API][4] を使用して Datadog に送信できます。

## モニターの作成

Datadog で[サービスチェックモニター][5]を作成するには、メインナビゲーションを使用して次のように移動します: *Monitors --> New Monitor --> Service Check*。

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

    チェックグループは既存のグループリストから指定するか、独自に指定します。サービスチェックモニターでは、チェックごとのグループは不明なので、指定する必要があります。

2. 何回連続して失敗したらアラートをトリガーするか、回数 `<数値>` を選択します。

    各チェックは `OK`、`WARN`、`CRITICAL`、`UNKNOWN` のいずれか 1 つのステータスを送信します。`WARN` と `CRITICAL` ステータスが連続して何回送信されたら通知をトリガーするか選択します。たとえば、チェックが失敗したときにすぐに通知するには、`1` 回のクリティカルステータスまたは `1` 回の警告ステータスでモニターアラートをトリガーします。

3. Unknown ステータスに対して、`Do not notify`（通知しない）または `Notify`（通知する）を選択します。

   有効にした場合、`UNKNOWN` への状態遷移は通知をトリガーします。[モニターステータスページ][1]では、`UNKNOWN` 状態のグループのステータスバーには `NODATA` のグレーが表示されます。モニターの全体的なステータスは `OK` のままです。

4. 何回連続して成功したらアラートを解決するか、回数 `<数値>` を選択します。

    何回連続して `OK` ステータスが送信されたらアラートを解決するか、回数を選択します。たとえば、問題修正を確実にするには、`4` 回の OK ステータスでモニターを解決します。


[1]: /ja/monitors/manage/status
{{% /tab %}}
{{% tab "Cluster Alert" %}}

クラスターアラートは、既定のステータスでチェックの割合を計算し、しきい値と比較します。

クラスターアラートをセットアップする

1. タグによりチェックをグループ化するかどうか決定します。`Ungrouped` はすべてのソースでステータスのパーセンテージを計算します。`Grouped` は各グループごとのステータスのパーセンテージを計算します。

2. アラートと警告のしきい値の割合を選択します。1 つの設定（アラートまたは警告）のみ必須です。

タグの個別の組み合わせでタグ付けされた各チェックは、クラスター内の個別のチェックと見なされます。タグの各組み合わせの最後のチェックのステータスのみが、クラスターのパーセンテージの計算で考慮されます。

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="クラスターチェックのしきい値" style="width:90%;">}}

たとえば、環境ごとにグループ化されたクラスターチェックモニターは、いずれかの環境のチェックの 70% 以上が `CRITICAL` ステータスを送信した場合にアラートし、いずれかの環境のチェックの70% 以上が `WARN` ステータスを送信した場合に警告できます。
{{% /tab %}}
{{< /tabs >}}

#### 高度なアラート条件

[データなし][7]、[自動解決][8]、[新しいグループ遅延][9]の各オプションに関する情報は、[モニターコンフィギュレーション][6]ドキュメントを参照してください。

### 通知

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][10]のページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/
[2]: /ja/developers/custom_checks/write_agent_check/
[3]: /ja/developers/dogstatsd/
[4]: /ja/api/v1/service-checks/
[5]: https://app.datadoghq.com/monitors#create/custom
[6]: /ja/monitors/create/configuration/#advanced-alert-conditions
[7]: /ja/monitors/create/configuration/#no-data
[8]: /ja/monitors/create/configuration/#auto-resolve
[9]: /ja/monitors/create/configuration/#new-group-delay
[10]: /ja/monitors/notify/