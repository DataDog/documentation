---
description: 2024 年 10 月 1 日の hourly および summary usage API の変更について、新しい RUM キーや非推奨となる
  Indexed Logs のグルーピングを解説する移行ガイド。
title: Hourly Usage と Summary Usage API での Indexed Logs と RUM の移行
---

## 概要

2024 年 10 月 1 日に、以下の 2 つの API エンドポイントが変更されます。
- [Get hourly usage by product family][1]
- [Get usage across your account][2]

RUM と Indexed Logs の製品が対象です。使用している各 API エンドポイントに対応する以下のセクションを参照し、更新内容を確認して自動化にどのような変更が必要か検討してください。

## 製品ファミリー別に時間ごとの使用量を取得

2024 年 10 月 1 日に [Get hourly usage by product family][1] エンドポイントで以下の変更が行われ、従来のキーが廃止されるとともに、RUM の使用状況をより詳細に把握できるようになります。

### RUM

以下のレガシーキーが廃止されます。
- `rum_browser_sessions` プロダクトファミリー:
  - `replay_session_count`
  - `session_count`
- `rum_mobile_sessions` プロダクトファミリー:
  - `session_count`
  - `session_count_android`
  - `session_count_flutter`
  - `session_count_ios`
  - `session_count_reactnative`
  - `session_count_roku`
- `rum` プロダクトファミリー:
  - `browser_rum_units`
  - `mobile_rum_units`
  - `rum_units`

新たに以下のキーが追加されます。
- `rum_replay_session_count`
- `rum_lite_session_count`
- `rum_browser_legacy_session_count`
- `rum_browser_replay_session_count`
- `rum_browser_lite_session_count`
- `rum_mobile_legacy_session_count_android`
- `rum_mobile_legacy_session_count_flutter`
- `rum_mobile_legacy_session_count_ios`
- `rum_mobile_legacy_session_count_reactnative`
- `rum_mobile_legacy_session_count_roku`
- `rum_mobile_lite_session_count_android`
- `rum_mobile_lite_session_count_flutter`
- `rum_mobile_lite_session_count_ios`
- `rum_mobile_lite_session_count_reactnative`
- `rum_mobile_lite_session_count_roku`

**Get hourly usage by product family** エンドポイントにおける RUM の使用状況は、今後は以下の 1 つの `rum` プロダクトファミリーに集約され、RUM の課金対象となる可能性がある 3 つの SKU を表すキーとして示されます。
- `rum`
- `rum_replay`
- `rum_lite`

従来のプロダクトファミリーと使用状況の種類は廃止され、**Get hourly usage by product family** エンドポイントでは `null` として表示されます。

 #### 現行のレスポンス構造

 [Get hourly usage by product family][1] エンドポイントの現在のレスポンス例は以下のとおりです。
 {{< code-block lang="json">}}
 {
  "data": [
     {
      "id": "abcd",
      "type": "usage_timeseries",
      "attributes": {
        "product_family": "rum",
        "org_name": "Test Org",
        "public_id": "abcd",
        "region": "us",
        "timestamp": "2024-04-01T00:00:00+00:00",
        "measurements": [
          {
            "usage_type": "browser_rum_units",
            "value": 100
          },
          {
            "usage_type": "mobile_rum_units",
            "value": null
          }
        ]
      }
    },
  ]
  {
    "id": "abcd",
    "type": "usage_timeseries",
    "attributes": {
      "product_family": "rum_browser_sessions",
      "org_name": "Test Org",
      "public_id": "abcd",
      "region": "us",
      "timestamp": "2024-04-01T00:00:00+00:00",
      "measurements": [
        {
          "usage_type": "replay_session_count",
          "value": 100
        },
        {
          "usage_type": "session_count",
          "value": 100
        }
      ]
    }
  },
  {
    "id": "abcd",
    "type": "usage_timeseries",
    "attributes": {
      "product_family": "rum_mobile_sessions",
      "org_name": "Test Org",
      "public_id": "abcd",
      "region": "us",
      "timestamp": "2024-04-01T00:00:00+00:00",
      "measurements": [
        {
          "usage_type": "session_count",
          "value": 0
        },
        {
          "usage_type": "session_count_android",
          "value": 100
        },
        {
          "usage_type": "session_count_flutter",
          "value": 0
        },
        {
          "usage_type": "session_count_ios",
          "value": 0
        },
        {
          "usage_type": "session_count_reactnative",
          "value": 0
        },
        {
          "usage_type": "session_count_roku",
          "value": 0
        }
      ]
    }
  }
}
{{< /code-block >}}

#### 今後のレスポンス構造

2024 年 10 月 1 日以降、[Get hourly usage by product family][1] エンドポイントは以下のサンプル構造になります。


{{< highlight json "hl_lines=7 14 17 22 27 30 83 110" >}}
{
   "data":[
      {
         "id":"abcd",
         "type":"usage_timeseries",
         "attributes":{
// 1 つの既存プロダクトファミリー (rum); 下記で rum_browser_sessions と rum_mobile_sessions は非推奨
            "product_family":"rum",
            "org_name":"Test Org",
            "public_id":"abcd",
            "region":"us",
            "timestamp":"2024-10-01T00:00:00+00:00",
            "measurements":[
// RUM の使用状況に基づき課金される可能性がある SKU を表す 3 つの新しいキー
               {
                  "usage_type":"rum_total_session_count",
// 使用状況に応じて課金される可能性がある SKU。組織で該当の SKU が有効でない場合は null
                  "usage":null
               },
               {
                  "usage_type":"rum_replay_session_count",
// 使用状況に応じて課金される可能性がある SKU。組織で該当の SKU が有効でない場合は null
                  "usage":50
               },
               {
                  "usage_type":"rum_lite_session_count",
// 使用状況に応じて課金される可能性がある SKU。組織で該当の SKU が有効でない場合は null
                  "usage":50
               },
// より詳細な RUM 使用状況データを示す 13 種類の使用タイプ
               {
                  "usage_type":"browser_legacy_session_count",
                  "usage":0
               },
               {
                  "usage_type":"browser_lite_session_count",
                  "usage":50
               },
               {
                  "usage_type":"browser_replay_session_count",
                  "usage":50
               },
               {
                  "usage_type":"mobile_legacy_session_count_android",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_flutter",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_ios",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_reactnative",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_roku",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_android",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_flutter",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_ios",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_reactnative",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_roku",
                  "usage":0
               },
// レガシーの使用タイプは null に設定
               {
                  "usage_type":"browser_rum_units",
                  "value":null
               },
               {
                  "usage_type":"mobile_rum_units",
                  "value":null
               },
               {
                  "usage_type":"rum_units",
                  "value":null
               }
            ]
         }
      }
   ]
}









// 1 つの既存で有効なプロダクトファミリー (rum); rum_browser_sessions と rum_mobile_sessions のプロダクトファミリーはレガシーで、null として表される
{
   "data":[
      {
         "id":"abcd",
         "type":"usage_timeseries",
         "attributes":{
            "product_family":"rum_browser_sessions",
            "org_name":"Test Org",
            "public_id":"abcd",
            "region":"us",
            "timestamp":"2024-10-01T00:00:00+00:00",
            "measurements":[
               {
                  "usage_type":"replay_session_count",
                  "value":null
               },
               {
                  "usage_type":"session_count",
                  "value":null
               }
            ]
         }
      },
      {
         "id":"abcd",
         "type":"usage_timeseries",
         "attributes":{
            "product_family":"rum_mobile_sessions",
            "org_name":"Test Org",
            "public_id":"abcd",
            "region":"us",
            "timestamp":"2024-10-01T00:00:00+00:00",
            "measurements":[
               {
                  "usage_type":"session_count",
                  "value":null
               },
               {
                  "usage_type":"session_count_android",
                  "value":null
               },
               {
                  "usage_type":"session_count_flutter",
                  "value":null
               },
               {
                  "usage_type":"session_count_ios",
                  "value":null
               },
               {
                  "usage_type":"session_count_reactnative",
                  "value":null
               },
               {
                  "usage_type":"session_count_roku",
                  "value":null
               }
            ]
         }
      }
   ]
}
{{< /highlight >}}


## アカウント全体の使用量を取得

2024 年 10 月 1 日に、[Get usage across your account][2] エンドポイントが変更され、従来のキーが廃止されるとともに、RUM とインデックス付きログの使用状況をより詳細に把握できるようになります。

### RUM

次のキーが廃止されます。
- `rum_units_agg_sum`
- `browser_rum_units_agg_sum`
- `mobile_rum_units_agg_sum`
- `browser_rum_lite_session_count_agg_sum`
- `browser_replay_session_count_agg_sum`
- `browser_legacy_session_count_agg_sum`
- `mobile_rum_lite_session_count_agg_sum`
- `rum_browser_and_mobile_session_count_agg_sum`
- `browser_rum_legacy_and_lite_session_count_agg_sum`
- `rum_total_session_count_agg_sum`
- `rum_session_count_agg_sum`
- `mobile_rum_session_count_agg_sum`
- `mobile_rum_session_count_ios_agg_sum`
- `mobile_rum_session_count_android_agg_sum`
- `mobile_rum_session_count_reactnative_agg_sum`
- `mobile_rum_session_count_flutter_agg_sum`
- `mobile_rum_session_count_roku_agg_sum`
- `rum_indexed_events_count_agg_sum`

次の新しいキーが RUM の使用状況を示します。
- `rum_replay_session_count_agg_sum`
- `rum_lite_session_count_agg_sum`
- `rum_browser_legacy_session_count_agg_sum`
- `rum_browser_replay_session_count_agg_sum`
- `rum_browser_lite_session_count_agg_sum`
- `rum_mobile_legacy_session_count_android_agg_sum`
- `rum_mobile_legacy_session_count_flutter_agg_sum`
- `rum_mobile_legacy_session_count_ios_agg_sum`
- `rum_mobile_legacy_session_count_reactnative_agg_sum`
- `rum_mobile_legacy_session_count_roku_agg_sum`
- `rum_mobile_lite_session_count_android_agg_sum`
- `rum_mobile_lite_session_count_flutter_agg_sum`
- `rum_mobile_lite_session_count_ios_agg_sum`
- `rum_mobile_lite_session_count_reactnative_agg_sum`
- `rum_mobile_lite_session_count_roku_agg_sum`

**Get usage across your account** エンドポイントの RUM 使用状況には、RUM の使用が課金される可能性のある次の 3 つのキーが含まれます。
- `rum`
- `rum_replay`
- `rum_lite`

組織で該当の SKU がアクティブでない場合、その値は null になります。13 種類の使用タイプは、RUM SKU の下でより詳細な使用状況サマリーを提供します。

#### 現行のレスポンス構造

[Get usage across your account][2] エンドポイントの現在のレスポンス例は以下のとおりです。
{{< code-block lang="json">}}
{
  "usage": {
    "rum_session_count_agg_sum": 7441533,
    "mobile_rum_session_count_flutter_agg_sum": 0,
    "mobile_rum_session_count_ios_agg_sum": 0,
    "rum_total_session_count_agg_sum": 7618504,
    "rum_browser_and_mobile_session_count_agg_sum": 7441533,
    "mobile_rum_session_count_android_agg_sum": 0,
    "mobile_rum_session_count_reactnative_agg_sum": 0,
    "mobile_rum_session_count_roku_agg_sum": 0,
     },
    { ... // サブ組織ごとのサマリー使用状況 }
}
{{< /code-block >}}

#### 今後のレスポンス構造

2024 年 10 月 1 日以降、[Get usage across your account][2] エンドポイントは以下のサンプル構造になります。

{{< highlight json "hl_lines=5 10 25" >}}
{
   "start_date":"2024-10",
   "end_date":"2024-10",
   "last_updated":"2024-10-01T00",
// RUM の使用が課金対象となる可能性がある SKU を表す 3 つのキー
   "rum_total_session_count_agg_sum":null,
   "rum_replay_session_count_agg_sum":50,
   "rum_lite_session_count_agg_sum":null,

// より詳細な RUM 使用状況を示す RUM 使用タイプ
   "rum_browser_legacy_session_count_agg_sum":0,
   "rum_browser_lite_session_count_agg_sum":183911,
   "rum_browser_replay_session_count_agg_sum":5576,
   "rum_mobile_legacy_session_count_android_agg_sum":0,
   "rum_mobile_legacy_session_count_flutter_agg_sum":0,
   "rum_mobile_legacy_session_count_ios_agg_sum":0,
   "rum_mobile_legacy_session_count_reactnative_agg_sum":0,
   "rum_mobile_legacy_session_count_roku_agg_sum":0,
   "rum_mobile_lite_session_count_android_agg_sum":0,
   "rum_mobile_lite_session_count_flutter_agg_sum":0,
   "rum_mobile_lite_session_count_ios_agg_sum":0,
   "rum_mobile_lite_session_count_reactnative_agg_sum":0,
   "rum_mobile_lite_session_count_roku_agg_sum":0,

// レガシー使用キーは null に設定
   "rum_session_count_agg_sum": null,
   "mobile_rum_session_count_flutter_agg_sum": null,
   "mobile_rum_session_count_ios_agg_sum": null,
   "rum_browser_and_mobile_session_count_agg_sum": null,
   "mobile_rum_session_count_android_agg_sum": null,
   "mobile_rum_session_count_reactnative_agg_sum": null,
   "mobile_rum_session_count_roku_agg_sum": null

"usage":[
      {
         "date":"2024-10",
         "orgs":[
            {
               "name":"Sub-Org 1",
               "id":"cd996121d",
               "public_id":"cd996121d",
               "uuid":"28d17f18-00cc-11ea-a77b-97323eff26a7",
               "region":"us"
               ... // サブ組織ごとのサマリー使用状況
            }
         ]
      }
   ]
}
{{< /highlight >}}

### インデックス化されたログ

すべての保持期間の合計使用量を示すキーは非推奨となり、`null` として表示されます。対象となるキーは以下のとおりです。
- `indexed_events_count_sum`
- `live_indexed_events_agg_sum`
- `rehydrated_indexed_events_agg_sum`

それぞれの保持期間に対応するキーを合計することで、これまで通りすべての保持期間の使用量を算出できます。

#### 現行のレスポンス構造

[Get usage across your account][2] エンドポイントの現在のレスポンス例は以下のとおりです。
{{< code-block lang="json">}}
{
  "usage": {
    "rehydrated_indexed_events_agg_sum": 150,
    "live_indexed_events_agg_sum": 150,
    "logs_indexed_logs_usage_agg_sum_15_day": 100,
    "logs_indexed_logs_usage_agg_sum_3_day": 100,
    "logs_indexed_logs_usage_agg_sum_30_day": 100
  },
  "orgs": [
    {
      "name": "Sub-Org 1",
      "public_id": "abcd",
      "uuid": "abcd",
      "region": "eu",
      "usage": {
        "indexed_events_count_sum": 200,
        "live_indexed_events_sum": 100,
        "rehydrated_indexed_events_sum": 100,
        "logs_indexed_logs_usage_sum_15_day": 100,
        "logs_indexed_logs_usage_sum_30_day": 100
      }
    },
  ]
{ ... // サブ組織ごとのサマリー使用状況 }
}
{{< /code-block >}}

#### 今後のレスポンス構造

2024 年 10 月 1 日以降、[Get usage across your account][2] エンドポイントは以下のサンプル構造になります。

{{< highlight json "hl_lines=5-8 19-22 32-35" >}}
{
   "start_date":"2024-10",
   "end_date":"2024-10",
   "last_updated":"2024-10-01T00",
   // 非推奨となった中間集計は null
   "indexed_events_count_agg_sum": null,
   "live_indexed_events_agg_sum": null,
   "rehydrated_indexed_events_agg_sum": null,
   "usage":[
      {
         "date":"2024-10",
         "orgs":[
            {
               "name":"Sub-Org 1",
               "id":"abcd",
               "public_id":"abcd",
               "uuid":"abcd",
               "region":"us",
   // 非推奨となった中間集計は null
               "indexed_events_count_sum": null,
               "live_indexed_events_sum": null,
               "rehydrated_indexed_events_sum": null,
               "logs_indexed_logs_usage_sum_15_day": 100,
               "logs_indexed_logs_usage_sum_30_day": 100
            },
            {
               "name":"Sub-Org 2",
               "id":"abcd",
               "public_id":"abcd",
               "uuid":"abcd",
               "region":"us",
   // 非推奨となった中間集計は null
               "indexed_events_count_sum": null,
               "live_indexed_events_sum": null,
               "rehydrated_indexed_events_sum": null,
               "logs_indexed_logs_usage_sum_15_day": 100,
               "logs_indexed_logs_usage_sum_30_day": 100
            },
         ]
      }
   ]
}
{{< /highlight >}}

[1]: /ja/api/latest/usage-metering/#get-hourly-usage-by-product-family
[2]: /ja/api/latest/usage-metering/#get-usage-across-your-account