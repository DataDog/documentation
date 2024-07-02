---
title: Migrating from the V1 Hourly Usage APIs to V2
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentation
  text: Plan and Usage Settings
---

## サマリー
v1 API のユーザーは、v2 時間単位使用量 API でおなじみの概念を、若干異なるフォーマットで表現していることを認識できるはずです。

v1 API と v2 API の最も顕著な相違点は、v2 API の次の点です。
* 全製品を 1 つのエンドポイントに集約する
* JSON:API 規格に準拠する
* ページ区切りされている
* 1 回のリクエストで複数の組織や地域のデータを返すことができる

それぞれの違いについては、以下のセクションでさらに詳しく説明します。

## 統合製品ファミリー
v2 API では、製品ファミリーと使用量という概念が導入されています。製品ファミリーは、1 つまたは複数の使用量をグループ化したものです。使用量タイプは、特定の組織および期間での使用量の測定値です。製品ファミリーの初期セットは、v1 API とほぼ一致しており、完全なマッピングは以下のとおりです。また、他のすべての製品ファミリーの使用量を取得する特別な `all` 製品ファミリーがあります。

ファミリーと使用量タイプ:
- **all**
    * _他のすべての製品ファミリーを含む_
- **analyzed_logs**
    * `analyzed_logs`
- **application_security**
    * `app_sec_host_count`
- **audit_trail**
    * `enabled`
- **serverless**
    * `func_count`
    * `invocations_sum`
- **ci_app**
    * `ci_pipeline_indexed_spans`
    * `ci_test_indexed_spans`
    * `ci_visibility_pipeline_committers`
    * `ci_visibility_test_committers`
- **cloud_cost_management**
    * `host_count`
- **csm_container_enterprise**
    * `cws_count`
    * `compliance_count`
    * `total_count`
- **csm_host_enterprise**
    * `total_host_count`
    * `compliance_hosts`
    * `cws_hosts`
    * `aas_host_count`
    * `azure_host_count`
    * `aws_host_count`
    * `gcp_host_count`
- **cspm**
    * `aas_host_count`
    * `azure_host_count`
    * `compliance_host_count`
    * `container_count`
    * `host_count`
- **cws**
    * `cws_container_count`
    * `cws_host_count`
- **dbm**
    * `dbm_host_count`
    * `dbm_queries_count`
- **fargate**
    * `avg_profiled_fargate_tasks`
    * `tasks_count`
- **infra_hosts**
    * `agent_host_count`
    * `alibaba_host_count`
    * `apm_azure_app_service_host_count`
    * `apm_host_count`
    * `aws_host_count`
    * `azure_host_count`
    * `container_count`
    * `gcp_host_count`
    * `heroku_host_count`
    * `host_count`
    * `infra_azure_app_service`
    * `opentelemetry_host_count`
    * `vsphere_host_count`
- **incident_management**
    * `monthly_active_users`
- **indexed_logs**
    * `logs_indexed_events_3_day_count`
    * `logs_live_indexed_events_3_day_count`
    * `logs_rehydrated_indexed_events_3_day_count`
    * `logs_indexed_events_7_day_count`
    * `logs_live_indexed_events_7_day_count`
    * `logs_rehydrated_indexed_events_7_day_count`
    * `logs_indexed_events_15_day_count`
    * `logs_live_indexed_events_15_day_count`
    * `logs_rehydrated_indexed_events_15_day_count`
    * `logs_indexed_events_30_day_count`
    * `logs_live_indexed_events_30_day_count`
    * `logs_rehydrated_indexed_events_30_day_count`
    * `logs_indexed_events_45_day_count`
    * `logs_live_indexed_events_45_day_count`
    * `logs_rehydrated_indexed_events_45_day_count`
    * `logs_indexed_events_60_day_count`
    * `logs_live_indexed_events_60_day_count`
    * `logs_rehydrated_indexed_events_60_day_count`
    * `logs_indexed_events_90_day_count`
    * `logs_live_indexed_events_90_day_count`
    * `logs_rehydrated_indexed_events_90_day_count`
    * `logs_indexed_events_180_day_count`
    * `logs_live_indexed_events_180_day_count`
    * `logs_rehydrated_indexed_events_180_day_count`
    * `logs_indexed_events_360_day_count`
    * `logs_live_indexed_events_360_day_count`
    * `logs_rehydrated_indexed_events_360_day_count`
    * `logs_indexed_events_custom_day_count`
    * `logs_live_indexed_events_custom_day_count`
    * `logs_rehydrated_indexed_events_custom_day_count`
- **indexed_spans**
    * `indexed_events_count`
    * `ingested_spans`
    * `ingested_events_bytes`
- **iot**
    * `iot_device_count`
- **lambda_traced_invocations**
    * `lambda_traced_invocations_count`
- **logs**
    * `billable_ingested_bytes`
    * `indexed_events_count`
    * `ingested_events_bytes`
    * `logs_forwarding_events_bytes`
    * `logs_live_indexed_count`
    * `logs_live_ingested_bytes`
    * `logs_rehydrated_indexed_count`
    * `logs_rehydrated_ingested_bytes`
- **network_flows**
    * `indexed_events_count`
- **network_hosts**
    * `host_count`
- **observability_pipelines**
    * `observability_pipelines_bytes_processed`
- **online_archive**
    * `online_archive_events_count`
- **profiling**
    * `avg_container_agent_count`
    * `host_count`
- **rum**
    * `browser_rum_units`
    * `mobile_rum_units`
    * `rum_units`
- **rum_browser_sessions**
    * `replay_session_count`
    * `session_count`
- **rum_mobile_sessions**
    * `session_count`
    * `session_count_android`
    * `session_count_ios`
    * `session_count_reactnative`
    * `session_count_flutter`
- **sds**
    * `logs_scanned_bytes`
    * `total_scanned_bytes`
- **snmp**
    * `snmp_devices`
- **synthetics_api**
    * `check_calls_count`
- **synthetics_browser**
    * `browser_check_calls_count`
- **synthetics_mobile**
    * `test_runs`
- **timeseries**
    * `num_custom_input_timeseries`
    * `num_custom_output_timeseries`
    * `num_custom_timeseries`


このリストは、上記のファミリーと使用量タイプが、v1 時間単位使用量エンドポイントにどのようにマッピングされるかを示しています。使用量とデータポイントは、特に明記されている場合を除き、同じです。

エンドポイント | 製品ファミリー
`<base_url>/api/v1/usage/hosts` | infra_hosts
: `agent_host_count`
: `alibaba_host_count`
: `apm_azure_app_service_host_count`
: `apm_host_count`
: `aws_host_count`
: `azure_host_count`
: `container_count`
: `gcp_host_count`
: `heroku_host_count`
: `host_count`
: `infra_azure_app_service`
: `opentelemetry_host_count`
: `vsphere_host_count`

`<base_url>/api/v1/usage/logs` | logs
: `billable_ingested_bytes`
: `indexed_events_count`
: `ingested_events_bytes`
: `logs_live_indexed_count`
: `logs_live_ingested_bytes`
: `logs_rehydrated_indexed_count`
: `logs_rehydrated_ingested_bytes`

`<base_url>/api/v1/usage/timeseries` | timeseries
: `num_custom_input_timeseries`
: `num_custom_output_timeseries`
: `num_custom_timeseries`

`<base_url>/api/v1/usage/indexed-spans` | indexed_spans
: `indexed_events_count`

`<base_url>/api/v1/usage/synthetics`
: 非推奨。Synthetics の使用量については synthetics_api および synthetics_browser を参照してください

`<base_url>/api/v1/usage/synthetics_api` | synthetics_api
: `check_calls_count`

`<base_url>/api/v1/usage/synthetics_browser` | synthetics_browser
: `browser_check_calls_count`

`<base_url>/api/v1/usage/fargate` | fargate
: `avg_profiled_fargate_tasks`
: `tasks_count`

`<base_url>/api/v1/usage/aws_lambda` | serverless
: `func_count`
: `invocations_sum`

`<base_url>/api/v1/usage/rum_sessions?type=browser` | rum_browser_sessions
: `replay_session_count`
: `session_count`

`<base_url>/api/v1/usage/rum_sessions?type=mobile` | rum_mobile_sessions
: `session_count`
: `session_count_android`
: `session_count_ios`
: `session_count_reactnative`

`<base_url>/api/v1/usage/network_hosts` | network_hosts
: `host_count`

`<base_url>/api/v1/usage/network_flows` | network_flows
: `indexed_events_count`

`<base_url>/api/v1/usage/logs-by-retention` | indexed_logs
: **注:** この URL では、使用量タイプに保持値が含まれているため、使用量タイプとデータポイントが別になっています。
: **使用量タイプ:** `logs_indexed_events_<retention>_count` **データポイント:** `indexed_events_count`
: **使用量タイプ:** `logs_live_indexed_events_<retention>_count` **データポイント:** `live_indexed_events_count`
: **使用量タイプ:** `logs_rehydrated_indexed_events_<retention>_count` **データポイント:** `rehydrated_indexed_events_count`
: **使用量タイプ:** `usage_type` では、`<retention>` を次のいずれかに置き換えてください: `3_day`、`7_day`、`15_day`、`30_day`、`45_day`、`60_day`、`90_day`、`180_day`、`365_day`、`custom` **データポイント:** `retention`

`<base_url>/api/v1/usage/analyzed_logs` | analyzed_logs
: `analyzed_logs`

`<base_url>/api/v1/usage/snmp` | snmp
: `snmp_devices`

`<base_url>/api/v1/usage/profiling` | profiling
: `host_count`

`<base_url>/api/v1/usage/ingested-spans` | ingested_spans
: `ingested_events_bytes` 

`<base_url>/api/v1/usage/incident-management` | incident_management
: `monthly_active_users`

`<base_url>/api/v1/usage/iot` | iot
: `iot_device_count`

`<base_url>/api/v1/usage/cspm` | cspm
: `aas_host_count`
: `azure_host_count`
: `compliance_host_count`
: `container_count`
: `host_count`

`<base_url>/api/v1/usage/audit_logs` | audit_logs
: `lines_indexed`

`<base_url>/api/v1/usage/cws` | cws
: `cws_container_count`
: `cws_host_count`

`<base_url>/api/v1/usage/dbm` | dbm
: `dbm_host_count`
: `dbm_queries_count`

`<base_url>/api/v1/usage/sds` | sds
: `logs_scanned_bytes`
: `total_scanned_bytes`

`<base_url>/api/v1/usage/rum` | rum
: `browser_rum_units`
: `mobile_rum_units`
: `rum_units`

`<base_url>/api/v1/usage/ci-app` | ci_app
: `ci_pipeline_indexed_spans`
: `ci_test_indexed_spans`
: `ci_visibility_pipeline_committers`
: `ci_visibility_test_committers`

`<base_url>/api/v1/usage/online-archive` | online_archive
: `online_archive_events_count`

`<base_url>/api/v2/usage/lambda_traced_invocations` | lambda_traced_invocations
: `lambda_traced_invocations_count`

`<base_url>/api/v2/usage/application_security` | application_security
: `app_sec_host_count`

`<base_url>/api/v2/usage/observability_pipelines` | observability_pipelines
: `observability_pipelines_bytes_processed`

## JSON:API 準拠のフォーマット

レスポンス本文およびパラメーター名は、[JSON:API 仕様][1]に準拠しています。v1 API で利用可能なすべてのデータは、引き続き利用可能です。v1 のホスト API から v2 の時間単位使用量 API へのマッピングの例は以下をご参照ください。

### V1 API: [ホストとコンテナの 1 時間あたり使用量の取得][2]

#### リクエスト

`https://api.datadoghq.com/api/v1/usage/hosts?start_hr=2022-06-01T00&end_hr=2022-06-01T01`

##### 注

* 製品はパス `hosts` の要素です。
* 時間的な境界は、パラメーター `start_hr` と `end_hr` で制御されます。

#### 応答

```json
{
  "usage": [
    {
      "agent_host_count": 1,
      "alibaba_host_count": 2,
      "apm_azure_app_service_host_count": 3,
      "apm_host_count": 4,
      "aws_host_count": 5,
      "azure_host_count": 6,
      "container_count": 7,
      "gcp_host_count": 8,
      "heroku_host_count": 9,
      "host_count": 10,
      "infra_azure_app_service": 11,
      "opentelemetry_host_count": 12,
      "vsphere_host_count": 13,
      "hour": "2022-06-01T00",
      "org_name": "Customer Inc",
      "public_id": "abc123"
    }
  ]
}
```

##### 注

* 各時間の使用量は、使用量配列のオブジェクトとして表現されます。
* 使用量タイプはオブジェクトのキーで、その使用量タイプに対応する測定値が値となります。
* 時間、組織名、公開 ID もオブジェクトのフィールドです。

### V2 API: 製品ファミリーの時間単位使用量の取得

#### リクエスト

`https://api.datadoghq.com/api/v2/usage/hourly_usage?filter[timestamp][start]=2022-06-01T00&filter[timestamp][end]=2022-06-01T01&filter[product_families]=infra_hosts`

##### 注

* 製品は、クエリパラメーター `filter[product_families]=infra_hosts` として渡されます。
* 時間的な境界は、パラメーター `filter[timestamp][start]` と `filter[timestamp][end]` によって制御されます。

#### 応答

```json
{
  "data": [
    {
      "attributes": {
        "org_name": "Customer Inc",
        "public_id": "abc123",
        "timestamp": "2022-06-01T00:00:00+00:00",
        "region": "us",
        "measurements": [
          {
            "usage_type": "agent_host_count",
            "value": 1
          },
          {
            "usage_type": "alibaba_host_count",
            "value": 2
          },
          {
            "usage_type": "apm_azure_app_service_host_count",
            "value": 3
          },
          {
            "usage_type": "apm_host_count",
            "value": 4
          },
          {
            "usage_type": "aws_host_count",
            "value": 5
          },
          {
            "usage_type": "azure_host_count",
            "value": 6
          },
          {
            "usage_type": "container_count",
            "value": 7
          },
          {
            "usage_type": "gcp_host_count",
            "value": 8
          },
          {
            "usage_type": "heroku_host_count",
            "value": 9
          },
          {
            "usage_type": "host_count",
            "value": 10
          },
          {
            "usage_type": "infra_azure_app_service",
            "value": 11
          },
          {
            "usage_type": "opentelemetry_host_count",
            "value": 12
          },
          {
            "usage_type": "vsphere_host_count",
            "value": 13
          }
        ],
        "product_family": "infra_hosts"
      },
      "type": "usage_timeseries",
      "id": "ec3e0318b98d15c2ae8125e8bda0ff487cd08d80b120fb340c9322ee16f28629"
    }
  ]
}
```

#### 注

* データ配列のオブジェクトは、各製品、各組織の時間単位使用量を表しています。
    * V1 API は、1 回のリクエストで複数の製品、複数の組織をサポートするものではありませんでした。
* 使用量測定は、ネストした `measurements` 配列で表現されます。
* 使用量測定オブジェクトは `usage_type` と `value` というフィールドを持ちます。
* `hour`、`org_name`、`public_id` は `attributes` オブジェクトのフィールドでもあります。

## ページ区切り

v2 時間単位使用量 API はページ分割されます。レスポンスは 500 ページに制限され、1 ページには 1 製品ファミリー、1 時間、1 組織の使用量データが含まれます。ページ区切りにより、API はリクエストごとの複数製品、リクエストごとの複数組織、無制限の時間範囲などの他の機能をサポートすることができます。

もし結果が複数のページを持つ場合、次のページのレコード ID が `meta.pagination.next_record_id` フィールドで返されます。クライアントはその ID をパラメーター `pagination[next_record_id]` に渡す必要があります。`meta.pagination.next_record_id` フィールドが設定されていない場合は、これ以上取得するページはありません。

### コード例
```
response := GetHourlyUsage(start_time, end_time, product_families)
cursor := response.metadata.pagination.next_record_id
WHILE cursor != null BEGIN
sleep(5 seconds)  # レートリミットを回避する
response := GetHourlyUsage(start_time, end_time, product_families, next_record_id=cursor)
cursor := response.metadata.pagination.next_record_id
END
```

## 複数組織のレスポンス

v2 API では、1 回のリクエストで全地域の子組織の使用量データを取得することができます。子組織のデータをリクエストするには、パラメーター `filter[include_descendants]` を使用します。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://jsonapi.org/format/
[2]: /api/latest/usage-metering/#get-hourly-usage-for-hosts-and-containers

