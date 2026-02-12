---
aliases:
- /ja/monitors/faq/how-to-update-anomaly-monitor-timezone
further_reading:
- link: /monitors/types/anomaly/
  tag: ドキュメント
  text: 異常検知モニターを作成する
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の構成
title: ローカルタイムゾーンを考慮して異常検知モニターを更新する方法
---

Datadog のモニターは UTC 時間を使用しており、デフォルトではローカルタイムゾーンを追跡しません。システムの種類によっては、タイムゾーンで起きているローカルな活動によってデータが影響を受ける可能性があります。たとえば、昼休みにランチが急増し、この急増が予期せぬ異常として検出される可能性があります。ローカルな活動によって予期しない異常が発生する場合、ローカルタイムゾーンを考慮するように異常検知モニターを更新してください。

Agile または Robust 異常検知アルゴリズムを Weekly または Daily 季節性と共に使用する場合は、API と UI の両方でローカルタイムゾーンを考慮するように異常検知モニターを更新できます。

以下は、ローカルタイムゾーンを考慮した設定にする前のモニターの例です。

{{< img src="monitors/guide/dst-off.png" alt="DST 追跡がオフ" >}}

以下は、サマータイムを考慮した場合のモニターの例です。

{{< img src="monitors/guide/dst-on.png" alt="DST 追跡がオン" >}}

## UI

UI でローカル タイムゾーンを考慮して異常検知モニターを更新するには、**[New monitor > Anomaly monitor][1]** に移動します。*Set Alert Conditions* セクションで Advanced パネルを開き、モニターの評価時にサマータイムを考慮するスイッチをオンにします。次に、タイムゾーン ドロップダウンで追跡したいタイムゾーンを選択します。

{{< img src="monitors/guide/how_to_update_anomaly_monitor_timezone/daylight_savings_toggle.png" alt="UI 上 の DST トグル オプション" >}}

## API

1. モニター API で更新リクエストを行うには、次の情報が必要です。
    - 認証用の [Datadog API キーとアプリケーション キー][3]
    - 異常検知モニターの Monitor ID とクエリ (アプリで該当モニターに移動し、URL に含まれる Monitor ID を確認します)
    - `America/New_York` や `Europe/Paris` など、メトリクスに関連するタイムゾーンの TZ 識別文字列。[tz データベースタイムゾーン一覧][4]の TZ 列で、希望するタイムゾーンを探します (正規の形式を推奨)。<br><br>
2. anomalies() 関数呼び出しに `timezone` 引数を追加して、モニター クエリを更新版として作成します。たとえば、上記のクエリをニューヨークのローカル時間で評価するよう変更する場合、クエリは次のようになります。
    ```
    avg(last_4h):anomalies(avg:system.cpu.user{role:trace-cassandra} by {host}, 'basic', 2, direction='both', alert_window='last_15m', interval=60, count_default_zero='true', timezone='America/New_York') >= 1
    ```
3. モニターの定義を更新するには、[Edit a Monitor][5] API を使用します。
    - Python、Ruby、cURL の例があります。
    - 既存の設定をオーバーライドしないように、ID とクエリのみをリクエストに含めます。名前、メッセージ、オプション、タグは必須ではありません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/anomaly
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[5]: /ja/api/latest/monitors/#edit-a-monitor