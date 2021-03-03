---
title: ダウンタイム時のアラートを停止する
kind: ガイド
further_reading:
  - link: api/v1/downtimes/
    tag: Documentation
    text: ダウンタイム API リファレンス
  - link: /monitors/downtimes/
    tag: Documentation
    text: ダウンタイムに関するドキュメント
---
## 概要

ダウンタイムを使用して、スケジュールされたメンテナンス、テスト、オートスケーリングイベント中の不要なアラートを停止しましょう。
[ダウンタイム API][1] を使用して高度なメンテナンススケジュールのフォーマットを管理したり、クラウドインスタンスのリサイズ時などにモニターを動的にミュートすることができます。

このガイドでは、以下のユースケースに関するダウンタイムの構成方法をご説明します。

* [週末にかけてのダウンタイム](#downtime-over-the-week-end)
* [営業時間外のダウンタイム](#downtime-outside-of-business-hours)
* [毎月 n 日の定期的なダウンタイム](#recurring-downtime-on-nth-weekday-of-the-month)

## 前提条件

このガイドでは API の使用方法をご説明します。使用にあたっては管理者権限を有する API キーとアプリケーションキーが必要です。これらのキーは  [Datadog アカウントの API キーページ][2]で確認することができます。
出現する `<DATADOG_API_KEY>` および `<DATADOG_APP_KEY>` をすべて、Datadog の API キーと Datadog のアプリケーションキーにそれぞれ置き換えます。

このガイドではまた、お客様が `CURL` を持つターミナルを所有し、 主要な[ダウンタイムに関するドキュメントページ][3]の内容を閲覧されていることを想定しています。

## 例

### 週末にかけてのダウンタイム

企業の ERP や会計ソフトウェアなど、平日のみ使用されるサービスを監視する場合は、平日のみアラートを受信するよう設定することができます。
以下の API コールを使用して、`env:prod` タグに該当するすべてのモニターから発される週末のアラートをミュートに設定します。

{{< tabs >}}
{{% tab "API " %}}

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "env:prod","start":"1613779200","end":"1613865599", "recurrence": {"type": "weeks","period": 1,"week_days": ["Sat","Sun"]}}'
```

プレースホルダー値 `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} で置き換えます。また、`start` および `end` パラメーターをスケジュールに合わせて置き換えます。例:

* `start=$(date +%s)`
* `end=$(date -v+24H +%s)`

その後、cURL コマンドで `"start": '"${start}"'` を実行します。

**Response:**

```json
{
    "recurrence": {
        "until_date": null,
        "until_occurrences": null,
        "week_days": ["Sat", "Sun"],
        "type": "weeks",
        "period": 1
    },
    "end": 1613865599,
    "monitor_tags": ["*"],
    "child_id": null,
    "canceled": null,
    "monitor_id": null,
    "org_id": 1111111,
    "disabled": false,
    "start": 1613779200,
    "creator_id": 987654321,
    "parent_id": null,
    "timezone": "UTC",
    "active": false,
    "scope": ["env:prod"],
    "message": null,
    "downtime_type": 2,
    "id": 123456789,
    "updater_id": null
}
```

{{% /tab %}}
{{% tab "UI" %}}

[Manage Downtime ページ][1]を開いて新しいダウンタイムを追加し、`recurring` を選択します。

{{< img src="monitors/guide/downtimes_weekend.jpg" alt="週末にかけたダウンタイム" style="width:60%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### 営業時間外のダウンタイム

同じ例を使用して、平日の営業時間外にこのサービスをミュートに設定することができます。

以下の API コールで、平日午後 8 時 から午前 6 時までのアラートをミュートに設定します。

{{< tabs >}}
{{% tab "API " %}}

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "env:prod","start":"1613844000","end":"1613887200", "recurrence": {"type": "days","period": 1}}'
```
プレースホルダー値 `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} で置き換えます。また、`start` および `end` パラメーターをスケジュールに合わせて置き換えます。

**Response:**

```json
{
    "recurrence": {
        "until_date": null,
        "until_occurrences": null,
        "week_days": null,
        "type": "days",
        "period": 1
    },
    "end": 1613887200,
    "monitor_tags": ["*"],
    "child_id": null,
    "canceled": null,
    "monitor_id": null,
    "org_id": 1111111,
    "disabled": false,
    "start": 1613844000,
    "creator_id": 987654321,
    "parent_id": null,
    "timezone": "UTC",
    "active": false,
    "scope": ["env:prod"],
    "message": null,
    "downtime_type": 2,
    "id": 123456789,
    "updater_id": null
}
```

{{% /tab %}}
{{% tab "UI" %}}

[Manage Downtime ページ][1]を開いて新しいダウンタイムを追加し、`recurring` を選択します。

{{< img src="monitors/guide/downtime_businesshour.jpg" alt="営業時間外のダウンタイム" style="width:60%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### 毎月 n 日の定期的なダウンタイム

より高度なメンテナンススケジュールを計画するには、RRULE を使用します。

RRULE (繰り返しルール) は [iCalendar RFC][4] のプロパティ名で、定期的なイベントを定義する際の標準形式です。

[RFC][4] にリストされているすべての RRULE がサポートされています。[このツール][5]を使用して RRULE を生成し、API コールに貼り付けます。

**例**: ERP アプリは毎月第 2 火曜日に更新され、午前 8 時から 10 時の間にパッチと修正が適用されます。このモニターのスコープは `app:erp` で指定されているため、ダウンタイムのスコープにもこの値を使用します。

#### API 

`type` パラメーターは `rrule` に指定する必要があります。
`start`  および `end` パラメーターは繰り返しルール初日の予定開始時間および終了時間と一致するよう設定します。そのため、ルールで指定した最初の第 2 火曜日が 3 月 9 日 (火) であった場合、開始は 3 月 9 日の午前 8時、終了は 3 月 9 日の午前 10 時となります。

**API call:**

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "app:erp","start":"1615276800","end":"1615284000", "recurrence": {"type":"rrule","rrule":"FREQ=MONTHLY;INTERVAL=1;BYDAY=2TU"}}'
```

プレースホルダー値 `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} で置き換えます。また、`start` および `end` パラメーターをスケジュールに合わせて置き換えます。

**Response:**

```json
{
    "recurrence": {
        "type": "rrule",
        "rrule": "FREQ=MONTHLY;INTERVAL=1;BYDAY=2TU"
    },
    "end": 1615284000,
    "monitor_tags": ["*"],
    "child_id": null,
    "canceled": null,
    "monitor_id": null,
    "org_id": 1111111,
    "disabled": false,
    "start": 1615276800,
    "creator_id": 987654321,
    "parent_id": null,
    "timezone": "UTC",
    "active": false,
    "scope": ["app:erp"],
    "message": null,
    "downtime_type": 2,
    "id": 123456789,
    "updater_id": null
}
```


### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/v1/downtimes/
[2]: https://docs.datadoghq.com/ja/api/v1/authentication/
[3]: https://docs.datadoghq.com/ja/monitors/downtimes/?tab=bymonitorname
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html