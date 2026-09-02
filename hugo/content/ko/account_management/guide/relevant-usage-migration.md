---
description: 2024년 10월 1일에 변경되는 시간별 및 요약 사용량 API에 관한 마이그레이션 가이드로, 새로운 RUM 키와 더 이상
  사용되지 않는 인덱싱된 로그 그룹에 관한 내용을 다룹니다.
title: 시간당 사용량 및 요약 사용량 API에서 인덱싱된 로그 및 RUM 마이그레이션하기
---

## 개요

2024년 10월 1일, 두 개의 API 엔드포인트가 변경됩니다.
- [제품군별 시간당 사용량 가져오기][1]
- [계정 전체의 사용량 가져오기][2]

RUM 및 인덱싱된 로그 프로덕트가 영향을 받습니다. 사용하는 각 API 엔드포인트에 대해 다음 섹션을 참조하고 업데이트를 검토하여 자동화에 어떤 변경 사항을 적용할지 결정하세요.

## 제품군별 시간당 사용량 가져오기

2024년 10월 1일 [제품군별 시간당 사용량 가져오기][1] 엔드포인트가 변경되면 레거시 키는 지원 중단되며, RUM 사용량에 관해 보다 세분화된 정보를 제공합니다.

### RUM

다음 레거시 키가 지원 중단됩니다.
- `rum_browser_sessions` 제품군:
  - `replay_session_count`
  - `session_count`
- `rum_mobile_sessions` 제품군:
  - `session_count`
  - `session_count_android`
  - `session_count_flutter`
  - `session_count_ios`
  - `session_count_reactnative`
  - `session_count_roku`
- `rum` 제품군: 

  - `browser_rum_units`
  - `mobile_rum_units`
  - `rum_units`

다음 신규 키가 추가됩니다.
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

**제품군별 시간당 사용량 가져오기** 엔드포인트의 RUM 사용량은 하나의 `rum` 제품군 내에서 RUM 사용량이 청구될 수 있는 SKU를 나타내는 다음 키 세 개와 함께 표시됩니다.
- `rum`
- `rum_replay`
- `rum_lite`

기존 제품군 및 사용 유형은 더 이상 지원되지 않으며 **제품군별 시간당 사용량 가져오기** 엔드포인트에서 `null`로 표시됩니다.

 #### 현재 응답 구조

 다음은 [제품군별 시간당 사용량 조회][1] 엔드포인트에 관한 현재 응답 예시입니다.
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

#### 향후 응답 구조

2024년 10월 1일 이후에는 [제품군별 시간당 사용량 가져오기][1] 엔드포인트의 구조가 다음 예시 구조와 같이 변경됩니다.


{{< highlight json "hl_lines=7 14 17 22 27 30 83 110" >}}
{
   "data":[
      {
         "id":"abcd",
         "type":"usage_timeseries",
         "attributes":{
// 기존 제품군 하나 (rum) ; 다음 rum_browser_sessions 및 rum_mobile_sessions 제품군은 지원 중단됩니다
            "product_family":"rum",
            "org_name":"Test Org",
            "public_id":"abcd",
            "region":"us",
            "timestamp":"2024-10-01T00:00:00+00:00",
            "measurements":[
// RUM 사용량이 청구될 수도 있는 SKU를 표시하는 세 가지 신규 키
               {
                  "usage_type":"rum_total_session_count",
// 사용량이 청구될 수도 있는 SKU. SKU가 조직에서 활성화되지 않은 경우 Null
                  "usage":null
               },
               {
                  "usage_type":"rum_replay_session_count",
// 사용량이 청구될 수도 있는 SKU. SKU가 조직에서 활성화되지 않은 경우 Null.
                  "usage":50
               },
               {
                  "usage_type":"rum_lite_session_count",
// 사용량이 청구될 수도 있는 SKU. SKU가 조직에서 활성화되지 않은 경우 Null
                  "usage":50
               },
// 세분화된 RUM 사용량 데이터를 표시하는 13가지 가능한 사용량 유형
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
// 기존 사용량 유형은 null로 처리됩니다
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









// 활성화된 기존 제품군 하나 (rum); rum_browser_sessions 및 rum_mobile_sessions 제품군은 기존 제품군이며 null로 표시됩니다
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


## 계정 전체의 사용량 가져오기

2024년 10월 1일 [계정 전체의 사용량 가져오기][2] 엔드포인트가 변경되면 레거시 키는 지원 중단되며, RUM 및 인덱싱된 로그 사용량에 관해 보다 세분화된 정보를 제공합니다.

### RUM

다음 키가 지원 중단됩니다.
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

다음은 RUM 사용량을 설명하는 신규 키입니다.
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

**계정 전체 사용량 가져오기** 엔드포인트의 RUM 사용량에는 RUM 사용량이 청구될 수 있는 SKU를 나타내는 다음 세 개의 키가 포함됩니다.
- `rum`
- `rum_replay`
- `rum_lite`

조직에서 활성화되지 않은 SKU는 null로 처리됩니다. 13가지 사용량 유형은 RUM SKU의 세분화된 사용량 요약을 제공해 드립니다.

#### 현재 응답 구조

다음은 [계정 전체 사용량 가져오기][2] 엔드포인트에 관한 현재 응답 예시입니다.
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
    { ... // Summary usage by sub-organization }
}
{{< /code-block >}}

#### 향후 응답 구조

2024년 10월 1일 이후에는 [계정 전체 사용량 가져오기][2] 엔드포인트의 구조가 다음 예시 구조와 같이 변경됩니다.

{{< highlight json "hl_lines=5 10 25" >}}
{
   "start_date":"2024-10",
   "end_date":"2024-10",
   "last_updated":"2024-10-01T00",
// RUM 사용량이 청구될 수 있는 SKU를 나타내는 세 개의 키 
   "rum_total_session_count_agg_sum":null,
   "rum_replay_session_count_agg_sum":50,
   "rum_lite_session_count_agg_sum":null,

// 세분화된 RUM 사용량 데이터를 나타내는 RUM 사용량 유형
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

// 레거시 사용량 키는 null로 처리됩니다
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
               ... // 하부 조직의 사용량 요약
            }
         ]
      }
   ]
}
{{< /highlight >}}

### 인덱싱된 로그

모든 보존 기간의 총 사용량을 나타내는 키는 지원 중단되며 `null`로 표시됩니다. 다음은 해당 키입니다. 
- `indexed_events_count_sum`
- `live_indexed_events_agg_sum`
- `rehydrated_indexed_events_agg_sum`

개별 보존 기간 키를 합산하여 모든 보존 기간의 사용량을 계속 계산할 수 있습니다.

#### 현재 응답 구조

다음은 [계정 전체 사용량 가져오기][2] 엔드포인트에 관한 현재 응답 예시입니다.
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
{ ... // Summary usage by sub-organization }
}
{{< /code-block >}}

#### 향후 응답 구조

2024년 10월 1일 이후에는 [계정 전체 사용량 가져오기][2] 엔드포인트의 구조가 다음 예시 구조와 같이 변경됩니다.

{{< highlight json "hl_lines=5-8 19-22 32-35" >}}
{
   "start_date":"2024-10",
   "end_date":"2024-10",
   "last_updated":"2024-10-01T00",
   // 지원 중단된 중간 그룹은 null로 처리됩니다
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
   // 지원 중단된 중간 그룹은 null로 처리됩니다
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
   // 지원 중단된 중간 그룹은 null로 처리됩니다
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

[1]: /ko/api/latest/usage-metering/#get-hourly-usage-by-product-family
[2]: /ko/api/latest/usage-metering/#get-usage-across-your-account