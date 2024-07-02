---
title: Examples
aliases:
- /monitors/guide/suppress-alert-with-downtimes
further_reading:
- link: monitors/downtimes/
  tag: Documentation
  text: Downtimes
- link: api/latest/downtimes/
  tag: Documentation
  text: Downtime API reference
---

## 概要

ダウンタイムを使用して、スケジュールされたメンテナンス、テスト、オートスケーリングイベント中の不要なアラートを停止しましょう。
[ダウンタイム API][1] を使用して高度なメンテナンススケジュールのフォーマットを管理したり、クラウドインスタンスのリサイズ時などにモニターを動的にミュートすることができます。

このガイドでは、以下のユースケースに関するダウンタイムの構成方法をご説明します。

* [週末のダウンタイム](#downtime-over-the-weekend)
* [営業時間外のダウンタイム](#downtime-outside-of-business-hours)
* [毎月 n 日の定期的なダウンタイム](#recurring-downtime-on-the-nth-weekday-of-the-month)


## 前提条件

Since this guide describes the usage of the API, you will need an API key and an application key with admin privileges. These are available in your [Datadog account API key page][2].
Replace all occurrences of `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog Application key, respectively.

このガイドではまた、お客様が `CURL` を持つターミナルを所有し、 主要な[ダウンタイムに関するドキュメントページ][3]の内容を閲覧されていることを想定しています。

## ユースケース

### 週末にかけてのダウンタイム

企業の ERP や会計ソフトウェアなど、平日のみ使用されるサービスを監視する場合は、平日のみアラートを受信するよう設定することができます。
以下の API コールを使用して、`env:prod` タグに該当するすべてのモニターから発される週末のアラートをミュートに設定します。

{{< tabs >}}
{{% tab "API " %}}

```shell
curl -X POST "https://api.<DATADOG_SITE>/api/v2/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-09-16T00:00","duration":"24h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"}]}}}'
```

オプションとして、作成するダウンタイムの理由と目的を他の人に知らせるために、ダウンタイムに `message` を追加します。例えば、`Muting all monitors in production environment over the weekend` といった具合です。

プレースホルダーの値 `<DATADOG_SITE>` を Datadog アカウントのサイトパラメーターに置き換えます。`start` と `end` パラメーターを希望のスケジュールに合わせて置き換えます。例:

* `start=$(date +%s)`
* `end=$(date -v+24H +%s)`

その後、cURL コマンドで `"start": '"${start}"'` を実行します。

**Response:**

```json
{
  "data": {
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "type": "downtime",
    "attributes": {
      "scope": "env:prod",
      "canceled": null,
      "schedule": {
        "current_downtime": {
          "start": "2023-09-16T22:00:00+00:00",
          "end": "2023-09-17T22:00:00+00:00"
        },
        "timezone": "Europe/Berlin",
        "recurrences": [
          {
            "start": "2023-09-16T00:00",
            "duration": "24h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"
          }
        ]
      },
      "notify_end_states": ["warn", "alert", "no data"],
      "monitor_identifier": { "monitor_tags": ["*"] },
      "status": "scheduled",
      "display_timezone": "Europe/Berlin",
      "notify_end_types": ["canceled", "expired"],
      "created": "2023-07-04T13:41:06.855440+00:00",
      "modified": "2023-07-04T13:41:06.855440+00:00",
      "mute_first_recovery_notification": false,
      "message": ""
    },
    [..]
  },
  [..]
}

```

[1]: https://docs.datadoghq.com/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

[Manage Downtime ページ][1]を開いて新しいダウンタイムをスケジュールし、`recurring` を選択します。

{{< img src="monitors/guide/downtimes_weekend.png" alt="週末にアラートをミュートする繰り返しのスケジュールを使用したダウンタイムの構成" style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### 営業時間外のダウンタイム

同じ例を使用して、平日の営業時間外にこのサービスをミュートに設定することができます。

{{< tabs >}}
{{% tab "API " %}}

以下の API コールで、平日午後 8 時 から午前 6 時までのアラートをミュートに設定します。

```shell
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-10T18:00","duration":"12h","rrule":"FREQ=DAILY;INTERVAL=1"}]}}},"_authentication_token":"b6c9ec89cdff687d29c0ee54923c52f57c9e102a"}'
```

オプションとして、ダウンタイムに `message` を追加して、作成するダウンタイムの理由と目的を他の人に知らせます。プレースホルダーの値 `<DATADOG_SITE>` を Datadog アカウントのサイトパラメーターに置き換えます。[Datadog サイト][1]のドキュメントを参照してください。`start` と `end` パラメーターを希望のスケジュールに合わせて置き換えます。

**Response:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "message": "",
      "mute_first_recovery_notification": false,
      "canceled": null,
      "scope": "env:prod",
      "monitor_identifier": { "monitor_tags": ["*"] },
      "modified": "2023-07-05T08:12:17.145771+00:00",
      "created": "2023-07-05T08:12:17.145771+00:00",
      "status": "scheduled",
      "display_timezone": "Europe/Berlin",
      "schedule": {
        "recurrences": [
          {
            "duration": "12h",
            "rrule": "FREQ=DAILY;INTERVAL=1",
            "start": "2023-07-10T18:00"
          }
        ],
        "current_downtime": {
          "end": "2023-07-11T04:00:00+00:00",
          "start": "2023-07-10T16:00:00+00:00"
        },
        "timezone": "Europe/Berlin"
      },
      "notify_end_states": ["alert", "warn", "no data"],
      "notify_end_types": ["canceled", "expired"]
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

[Manage Downtime ページ][1]を開いて新しいダウンタイムをスケジュールし、`recurring` を選択します。

{{< img src="monitors/guide/downtime_businesshour.png" alt="営業時間外のアラートをミュートする繰り返しのスケジュールを使用したダウンタイムの構成" style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### 営業時間外および週末のダウンタイムの組み合わせ

営業時間内にのみモニター通知を行いたい場合は、平日と週末にモニターをミュートします。これは 1 つのダウンタイムにまとめることができます。上記の[営業時間外のダウンタイム](#downtime-outside-of-business-hours)の例の続きです:

{{< tabs >}}
{{% tab "API " %}}

以下の API コールを使用すると、平日の午後 8 時から午前 6 時まで、および週末全体にわたってアラートをミュートすることができます。

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-09T18:00","duration":"12h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR"},{"start":"2023-07-09T00:00","duration":"24h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"}]}}}'
```
オプションとして、ダウンタイムに `message` を追加して、作成するダウンタイムの理由と目的を他の人に知らせます。プレースホルダーの値 `<DATADOG_SITE>` を Datadog アカウントのサイトパラメーターに置き換えます。[Datadog サイト][1]のドキュメントを参照してください。`start` と `end` パラメーターを希望のスケジュールに合わせて置き換えます。

**Response:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "monitor_identifier": { "monitor_tags": ["*"] },
      "created": "2023-07-05T08:36:00.917977+00:00",
      "message": "",
      "schedule": {
        "current_downtime": {
          "start": "2023-07-08T22:00:00+00:00",
          "end": "2023-07-10T04:00:00+00:00"
        },
        "timezone": "Europe/Berlin",
        "recurrences": [
          {
            "start": "2023-07-09T18:00",
            "duration": "12h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR"
          },
          {
            "start": "2023-07-09T00:00",
            "duration": "24h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"
          }
        ]
      },
      "notify_end_states": ["alert", "warn", "no data"],
      "status": "scheduled",
      "scope": "env:prod",
      "modified": "2023-07-05T08:36:00.917977+00:00",
      "mute_first_recovery_notification": false,
      "notify_end_types": ["expired", "canceled"],
      "display_timezone": "Europe/Berlin",
      "canceled": null
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

[Manage Downtime ページ][1]を開いて新しいダウンタイムを追加し、`recurring` を選択します。

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="営業時間外や週末にアラートをミュートする繰り返しのスケジュールを使用したダウンタイムの構成" style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### 毎月 n 日の定期的なダウンタイム

より高度なメンテナンススケジュールを計画するには、RRULE を使用します。

RRULE (繰り返しルール) は [iCalendar RFC][4] のプロパティ名で、定期的なイベントを定義する際の標準形式です。

`RRULE` で期間を指定する属性はサポートされていません (例: `DTSTART`、`DTEND`、`DURATION`)。可能な属性については [RFC][4] を参照してください。[このツール][5]を使用して RRULE を生成し、API 呼び出しに貼り付けることができます。

**例**: ERP アプリは毎月第 2 火曜日に更新され、午前 8 時から 10 時の間にパッチと修正が適用されます。このモニターのスコープは `app:erp` で指定されているため、ダウンタイムのスコープにもこの値を使用します。

{{< tabs >}}
{{% tab "API " %}}

The `start` and `end` parameters must match the expected start and end of the recurring rule's first day. So, assuming the first 2nd Tuesday of our rule is Tuesday, July 11th, the start date has to be July 11th 08:00 AM and a duration of two hours needs to be set.

**API call:**

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-11T08:00","duration":"2h","rrule":"FREQ=DAILY;INTERVAL=1;BYDAY=2TU"}]}}}'
```

プレースホルダーの値 `<DATADOG_SITE>` を Datadog アカウントのサイトパラメーターに置き換えます。`start` と `end` パラメーターを希望のスケジュールに合わせて置き換えます。

**Response:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "mute_first_recovery_notification": false,
      "notify_end_types": ["canceled", "expired"],
      "created": "2023-07-05T08:50:19.678427+00:00",
      "display_timezone": "Europe/Berlin",
      "modified": "2023-07-05T08:50:19.678427+00:00",
      "status": "scheduled",
      "canceled": null,
      "notify_end_states": ["warn", "alert", "no data"],
      "message": "",
      "schedule": {
        "recurrences": [
          {
            "duration": "2h",
            "start": "2023-07-11T08:00",
            "rrule": "FREQ=DAILY;INTERVAL=1;BYDAY=2TU"
          }
        ],
        "current_downtime": {
          "end": "2023-07-11T08:00:00+00:00",
          "start": "2023-07-11T06:00:00+00:00"
        },
        "timezone": "Europe/Berlin"
      },
      "scope": "env:prod",
      "monitor_identifier": { "monitor_tags": ["*"] }
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

[Manage Downtime ページ][1]を開いて新しいダウンタイムを追加し、`recurring` を選択し、それから `Use RRULE` を選択します。

{{< img src="monitors/downtimes/downtime_guide_rrule.png" alt="毎月第 2 火曜日にアラートをミュートする繰り返しの RRULE スケジュールを使用したダウンタイムの構成" style="width:100%;">}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/v2/downtimes/
[2]: https://docs.datadoghq.com/api/v1/authentication/
[3]: https://docs.datadoghq.com/monitors/downtimes/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html
