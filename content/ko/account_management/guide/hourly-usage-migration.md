---
further_reading:
- link: /account_management/plan_and_usage/
  tag: 설명서
  text: 플랜 및 사용량 설정
title: V1 월간 사용량 API에서 V2로 마이그레이션
---

## 소개
v1 API 사용자는 미세하게 다른 형식으로 표시되는
v2 시간별 사용량 API의 친숙한 개념을 인식해야 합니다.

v1 API와 v2 API의 가장 눈에 띄는 차이점은 v2 API가 다음의 성질을 지닌다는 점입니다.
* 모든 제품을 하나의 엔드포인트로 통합
* JSON:API 표준을 따름
* 페이지가 지정됨
* 요청당 여러 조직 및 리전에 대한 데이터를 반환할 수 있음

각 차이점은 다음 섹션에서 자세히 설명합니다.

## 통합 제품군
v2 API는 제품군 및 사용량 유형의 개념을 도입합니다. 제품군은
하나 이상의 사용량 유형을 그룹화합니다. 사용량 유형은 지정된 조직과 기간의 사용량 측정치에 해당합니다.
제품군의 초기 집합은 대부분 v1 API와 일치합니다.
전체 매핑은 아래에서 설명합니다. 다른 모든 제품군의 사용량을
검색하는 특별한 `all` 제품군도 있습니다.

제품군 및 사용량 유형:
- **all**
    * _Contains all other product families_
- **analyzed_logs**
    * `analyzed_logs`
- **application_security**
    * `app_sec_host_count`
- **audit_logs**
    * `lines_indexed`
- **serverless**
    * `func_count`
    * `invocations_sum`
- **ci_app**
    * `ci_pipeline_indexed_spans`
    * `ci_test_indexed_spans`
    * `ci_visibility_pipeline_committers`
    * `ci_visibility_test_committers`
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
- **sds**
    * `logs_scanned_bytes`
    * `total_scanned_bytes`
- **snmp**
    * `snmp_devices`
- **synthetics_api**
    * `check_calls_count`
- **synthetics_browser**
    * `browser_check_calls_count`
- **timeseries**
    * `num_custom_input_timeseries`
    * `num_custom_output_timeseries`
    * `num_custom_timeseries`


이 목록은 위의 제품군 및 사용량 유형이 v1 시간별 사용량 엔드포인트가 어떻게 매핑되는지 보여줍니다. 사용량 유형과 데이터 포인트는 달리 명시적으로 언급된 경우를 제외하고는 동일합니다.

엔드포인트 | 제품군
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
: 더 이상 사용되지 않습니다. 신서틱 사용량에 대해서는 synthetics_api 및 synthetics_browser를 참조하세요.

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
: **참고:** 리텐션 값이 사용량 유형에 포함되기 때문에 이 URL에 대한 사용량 유형과 데이터 포인트는 별개입니다.
: **사용량 유형:** `logs_indexed_events_<retention>_count` **데이터 포인트:** `indexed_events_count`
: **사용량 유형:** `logs_live_indexed_events_<retention>_count` **데이터 포인트:** `live_indexed_events_count`
: **사용량 유형:** `logs_rehydrated_indexed_events_<retention>_count` **데이터 포인트:** `rehydrated_indexed_events_count`
: **사용량 유형:** `usage_type`에서 `<retention>`을(를) `3_day`, `7_day`, `15_day`, `30_day`, `45_day`, `60_day`, `90_day`, `180_day`, `365_day`, `custom` 중 하나로 대체. **데이터 포인트:** `retention`

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

## JSON:API 준수 형식

응답 본문 및 파라미터 이름은 [JSON:API 사양][1]을 준수합니다. v1 API에서 사용할 수 있는 모든 데이터는
계속 사용할 수 있습니다. v1 호스트 API에서 
v2 시간별 사용량 API로의 매핑에 대한 예시는 아래를 참조하세요.

### V1 API: [호스트 및 컨테이너의 시간당 사용량 가져오기][2]

#### 요청

`https://api.datadoghq.com/api/v1/usage/hosts?start_hr=2022-06-01T00&end_hr=2022-06-01T01`

##### 비고

* 제품은 `hosts` 경로의 요소입니다.
* 시간 범위는 `start_hr` 및 `end_hr` 파라미터로 컨트롤됩니다.

#### 응답

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

##### 비고

* 각 시간의 사용량은 사용량 배열의 오브젝트로 표시됩니다.
* 사용량 유형은 오브젝트의 키이며, 해당 사용량 유형에 대해 측정된 사용량은 해당 값을 가리킵니다.
* 시간, 조직 이름 및 퍼블릭 ID도 오브젝트의 필드입니다.

### V2 API: 제품군별 시간별 사용량 가져오기

#### 요청

`https://api.datadoghq.com/api/v2/usage/hourly_usage?filter[timestamp][start]=2022-06-01T00&filter[timestamp][end]=2022-06-01T01&filter[product_families]=infra_hosts`

##### 비고

* 제품은 쿼리 파라미터 `filter[product_families]=infra_hosts`(으)로 전달됩니다.
* 시간 범위는 `filter[timestamp][start]` 및 `filter[timestamp][end]` 파라미터로 컨트롤됩니다.

#### 응답

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

#### 비고

* 데이터 배열의 오브젝트는 각 제품 및 각 조직에 대한 시간당 사용량을 나타냅니다.
    * V1 API는 요청 1건에서 여러 제품 또는 여러 조직을 지원하지 않았습니다.
* 사용량 측정은 중첩된 `measurements` 배열에 표시됩니다.
* 사용량 측정 오브젝트에는 `usage_type` 및 `value` 필드가 있습니다.
* `hour`, `org_name` 및 `public_id`도 `attributes` 오브젝트의 필드입니다.

## 페이지 지정

v2 시간별 사용량 API에는 페이지가 지정됩니다. 응답은 500페이지로 제한되며 한 페이지에는 한
제품군, 한시간, 한 조적의 사용량 데이터가 포함되어 있습니다. 페이지 지정을 통해 API는 요청당 여러 제품, 요청당 여러 조직 및 무제한 시간 범위 등 다양한
여러 기능을 지원할 수 있습니다.

결과에 더 많은 페이지가 있으면 다음 페이지의 기록 ID가 필드
`meta.pagination.next_record_id`에 반환됩니다. 그런 다음 클라이언트는 `pagination[next_record_id]` 파라미터에 해당 ID를 전달해야 합니다. `meta.pagination.next_record_id` 필드가 설정되지 않은 경우에는
더 이상 검색할 페이지가 없습니다.

### 코드 예시
```
response := GetHourlyUsage(start_time, end_time, product_families)
cursor := response.metadata.pagination.next_record_id
WHILE cursor != null BEGIN
sleep(5 seconds)  # Avoid running into rate limit
response := GetHourlyUsage(start_time, end_time, product_families, next_record_id=cursor)
cursor := response.metadata.pagination.next_record_id
END
```

## 여러 조직 대응

v2 API는 한 번의 요청으로 모든 리전에 속하는 모든 하위 조직의 사용량 데이터 검색을 지원합니다. 하위 조직에
 대한 데이터를 요청하는 파라미터 `filter[include_descendants]`을(를) 사용하세요.

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://jsonapi.org/format/
[2]: /ko/api/latest/usage-metering/#get-hourly-usage-for-hosts-and-containers