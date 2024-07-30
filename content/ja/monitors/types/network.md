---
aliases:
- /ja/monitors/monitor_types/network
- /ja/monitors/create/types/network/
description: TCP/HTTP エンドポイントのステータスをチェックする。
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール。
- link: /monitors/manage/status/
  tag: ドキュメント
  text: モニターステータスを確認
title: ネットワークモニター
---

## 概要

ネットワークモニターは、Agent で使用できる TCP チェックと HTTP チェックを対象とします。Agent 構成の詳細については、[HTTP チェック][1]または [TCP チェック][2]のドキュメントを参照してください。

## モニターの作成

Datadog で[ネットワークモニター][3]を作成するには、メインナビゲーションを使用して次のように移動します: Monitors --> New Monitor --> Network。

### ネットワークステータス

#### チェックを選択する

* ネットワークチェックタイプ（`ssl`、`http`、または `tcp`）を選択します。
* 特定のエンドポイントまたは `All monitored <タイプ> endpoints` を選択します。

#### モニターのスコープを選択

ホスト名、タグ、または `All Monitored Hosts` を選択して、監視するスコープを決定します。特定のホストを除外する必要がある場合は、2 番目のフィールドに名前やタグをリストアップします。

* インクルードフィールドでは `AND` ロジックを使用します。ホストに存在するリストアップされたすべてのホスト名とタグはスコープに含まれます。
* エクスクルードフィールドでは `OR` ロジックを使用します。リストアップされたホスト名やタグを持つホストはスコープから除外されます。

#### アラートの条件を設定する

このセクションで、**Check Alert** または **Cluster Alert** を選択します。

{{< tabs >}}
{{% tab "Check Alert" %}}

チェックアラートは、各チェックグループにつき、送信されたステータスを連続的にトラックし、しきい値と比較します。

チェックアラートをセットアップする

1. チェックレポートを送信する各 `<グループ>` に対し、アラートを個別にトリガーします。

    チェックグループは既存のグループリストから指定するか、独自に指定します。ネットワークモニターでは、チェックごとのグループを明確にします。たとえば HTTP チェックなら、`host`、`instance`、`url` でタグ付けします。

2. 何回連続して失敗したらアラートをトリガーするか、回数 `<数値>` を選択します。

    各チェックは `OK`、`WARN`、`CRITICAL` のいずれか 1 つのステータスを送信します。`CRITICAL` ステータスが連続して何回送信されたら通知をトリガーするか選択します。たとえば、HTTP チェックで接続に失敗する異常が 1 回発生したとします。値を `> 1` に設定した場合、この異常は無視されますが、2 回以上連続で失敗した場合は通知をトリガーします。

3. 何回連続して成功したらアラートを解決するか、回数 `<数値>` を選択します。

    何回連続して `OK` ステータスが送信されたらアラートを解決するか、回数を選択します。

{{% /tab %}}
{{% tab "Cluster Alert" %}}

クラスターアラートは、既定のステータスでチェックの割合を計算し、しきい値と比較します。

クラスターアラートをセットアップする

1. タグによりチェックをグループ化するかどうか決定します。`Ungrouped` はすべてのソースでステータスのパーセンテージを計算します。`Grouped` は各グループごとのステータスのパーセンテージを計算します。

2. アラートのしきい値となるパーセンテージを選択します。

{{% /tab %}}
{{< /tabs >}}

#### 高度なアラート条件

[データなし][5]、[自動解決][6]、[新しいグループ遅延][7]の各オプションに関する情報は、[モニターコンフィギュレーション][4]ドキュメントを参照してください。

#### 通知

**Say what's happening** セクションと **Notify your team** セクションの詳細については、[通知][8]ページをご確認ください。

### ネットワークメトリクス

[メトリクスモニター][10]ドキュメントの手順に従って、ネットワークメトリクスモニターを作成します。モニタータイプにネットワークメトリクスを選択すると、[モニターの管理][9]ページで、確実にネットワークモニタータイプのファセットでモニターを選択できるようになります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/http_check/
[2]: /ja/integrations/tcp_check/
[3]: https://app.datadoghq.com/monitors#create/network
[4]: /ja/monitors/configuration/#advanced-alert-conditions
[5]: /ja/monitors/configuration/#no-data
[6]: /ja/monitors/configuration/#auto-resolve
[7]: /ja/monitors/configuration/#new-group-delay
[8]: /ja/monitors/notify/
[9]: https://app.datadoghq.com/monitors/manage
[10]: /ja/monitors/types/metric