---
aliases:
- /ko/integrations/observability_pipelines/working_with_data/
- /ko/observability_pipelines/working_with_data/
further_reading:
- link: /observability_pipelines/legacy/setup/
  tag: 설명서
  text: Observability Pipelines 설정
- link: /observability_pipelines/legacy/reference/transforms/#awsec2metadata
  tag: 설명서
  text: AWS EC2 인스턴스에서 전송된 메타데이터 파싱
- link: /observability_pipelines/legacy/reference/transforms/#lua
  tag: 설명서
  text: Lua로 이벤트 수정하기
- link: /observability_pipelines/legacy/reference/transforms/#logtometric
  tag: 설명서
  text: 로그를 메트릭 이벤트로 변환
- link: /observability_pipelines/legacy/configurations/
  tag: 설명서
  text: Observability Pipelines 구성 알아보기
title: (레거시) 데이터로 작업하기
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipeline은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요

Observability Pipelines로 Observability 데이터를 형성 및 변환할 수 있습니다. Logging without LimitsTM와 비슷하게, 일련의 변환 구성 요소로 구성된 Observability Pipelines용 파이프라인을 사용합니다. 해당 변환을 사용하면 기본 제공 유형 안전성으로 데이터를 파싱, 구조화, 보강할 수 있습니다.

## 데이터 리매핑

[`remap` 변환][1]으로 이벤트를 수정하거나 이벤트 라우팅 및 필터링 조건을 지정할 수 있습니다. `remap` 변환에서 Datadog Processing Language(DPL) 또는 Vector Remap Language(VRL)로 어레이와 문자열을 조정하고, 값을 인코딩 및 디코딩하며, 값을 암호화 및 해독하는 등의 작업을 할 수 있습니다. 자세한 내용은 [Datadog Processing Language][2]를 참조하거나 [DPL 함수 참조][3]에서 DPL 내장 함수의 전체 목록을 확인하세요.

### 기본 `remap` 구성 예제

시작하려면 `source` 필드에 DPL/VRL 프로그램이 포함된 기본 `remap` 변환에 관한 다음 YAML 설정 예제를 참조하세요.

```yaml
transforms:
  modify:
    type: remap
    inputs:
      - previous_component_id
    source: |2
        del(.user_info)
        .timestamp = now()
```

본 예시에서 `type` 필드는 `remap` 변환으로 설정되어 있습니다. `inputs` 필드는 사전 정의된 `previous_component_id` 소스에서 이벤트를 수신하는 위치를 정의합니다. `source` 필드의 첫 번째 줄은 `.user_info` 필드를 삭제합니다. 확장에서 필드를 삭제하면 이벤트의 페이로드를 경감하고 다운스트림 서비스 지출을 줄이는 데 특히 유용합니다.

두 번째 줄은 `.timestamp` 필드와 값을 이벤트에 추가하여 이 변환이 적용되는 모든 이벤트의 내용을 변경합니다.

## 데이터 파싱

파싱은 DPL/VRL의 고급 사용 사례를 제공해 드립니다.

### 파싱 예제

#### 로그 이벤트 예제

하단 코드 조각은 JSON 형식의 HTTP 로그 이벤트입니다.

```
"{\"status\":200,\"timestamp\":\"2021-03-01T19:19:24.646170Z\",\"message\":\"SUCCESS\",\"username\":\"ub40fan4life\"}"
```
#### 구성 예제

다음 YAML 구성 예시에서는 DPL/VRL을 통해 다음을 사용하여 로그 이벤트를 수정합니다.

- 원시 문자열을 JSON으로 파싱합니다.
- 시간을 UNIX 타임스탬프로 다시 포맷합니다.
- 사용자 이름 필드를 삭제합니다.
- 메시지를 소문자로 변환합니다.

```yaml
transforms:
  parse_syslog_id:
    type: remap
    inputs:
      - previous_component_id
    source: |2
         . = parse_json!(string!(.message))
         .timestamp = to_unix_timestamp(to_timestamp!(.timestamp))
         del(.username)
         .message = downcase(string!(.message))
```

#### 출력 설정

구성은 다음을 반환합니다.

```
{
  "message": "success",
  "status": 200,
  "timestamp": 1614626364
}
```

## 데이터를 샘플링, 축소, 필터링, 집계하기

샘플링, 축소, 필터링, 집계 작업은 다운스트림 서비스로 전송되는 Observability 데이터의 볼륨을 줄이는 일반 변환입니다. Observability Pipelines는 다음과 같은 다양한 데이터 볼륨 제어 방법을 제공합니다.

- [이벤트 샘플링][4]은 제시된 기준 및 설정 가능한 비율에 기반합니다.
- 다중 이벤트를 단일 이벤트로 [간소화 및 축소][5]합니다.
- 불필요한 필드를 삭제합니다.
- 이벤트 [중복을 제거][6]합니다.
- 조건에 따라 [이벤트를 필터링][7]합니다.
- 정의된 고정 시간 간격에 따라 [다중 메트릭 이벤트를 단일 메트릭 이벤트로 집계][8]합니다.

해당 변환을 사용하는 방법에 관한 예시는 [로그 볼륨 및 크기 제어][10]를 참조하세요.

## 데이터 라우팅

일반적으로 사용되는 다른 변환은 `route`로, 제공된 조건에 따라 이벤트의 스트림을 여러 개의 하위 스트림으로 분할합니다. 이는 Observability 데이터를 다른 대상으로 전송하거나 사용 사례에 따라 데이터 스트림에서 다르게 동작해야 하는 경우 유용합니다.

### 다른 대상으로 라우팅 예제

#### 로그 예시

하단의 코드 조각은 `level` 필드 값에 따라 다른 대상으로 라우팅는 로그 예시입니다.

```
{
  "logs": {
    "kind": "absolute",
    "level": "info,
    "name": "memory_available_bytes",
    "namespace": "host",
    "tags": {}
  }
}
```

#### 구성 예시

다음 YAML 구성 예시에서는 `level` 값에 기반하여 데이터를 라우팅합니다.

```yaml
transforms:
  splitting_logs_id:
    type: route
    inputs:
      - my-source-or-transform-id
    route:
      debug: .level == "debug"
      info: .level == "info"
      warn: .level == "warn"
      error: .level == "error"
```

`route` 필드 하단의 각 행은 라우팅 식별자를 정의하고 이어서 `route` 필터를 나타내는 로직 조건이 따라옵니다. `route`의 최종 결과는 `<transform_name>.<route_id>` 이라는 이름의 다른 구성 요소에서 입력값으로 참조할 수 있습니다.

예를 들어, `level` 필드 값이 `warn` 및 `error`인 로그를 Datadog으로 라우팅하려면 다음 예시를 참조하세요.

```yaml
sinks:
  my_sink_id:
    type: datadog_logs
    inputs:
      - splitting_logs_id.warn
      - splitting_logs_id.error
    default_api_key: '${DATADOG_API_KEY_ENV_VAR}'
    compression: gzip
```

자세한 내용은 [`route` 변환 참조][11]를 참조하세요.

## 데이터 스로틀

다운스트림 서비스는 종종 볼륨이 급증할 때 과부하가 발생하여 데이터가 손실될 수 있습니다. `throttle` 변환으로 이러한 시나리오를 방지하고 사용자에게 사용량 할당량을 적용하세요. `throttle` 변환은 토폴로지를 거치는 로그의 속도를 제한합니다.

### 스로틀 설정 예제

다음은 `throttle` 변환 관련 YAML 설정 예시입니다.

```yaml
transforms:
  my_transform_id:
    type: throttle
    inputs:
      - my-source-or-transform-id
    exclude: null
    threshold: 100
    window_secs: 1
```

`threshold` 필드는 지정된 버킷에 허용되는 이벤트 수를 정의합니다. `window_secs`는 설정된 임계값이 적용되는 타임프레임을 정의합니다. 예시 설정에서는 스팬이 1초인 경우 구성 요소가 100개 이상의 이벤트를 수신하면 추가 이벤트는 삭제됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/legacy/reference/transforms/#remap
[2]: /ko/observability_pipelines/legacy/reference/processing_language/
[3]: /ko/observability_pipelines/legacy/reference/processing_language/functions/
[4]: /ko/observability_pipelines/legacy/reference/transforms/#sample
[5]: /ko/observability_pipelines/legacy/reference/transforms/#reduce
[6]: /ko/observability_pipelines/legacy/reference/transforms/#dedupe
[7]: /ko/observability_pipelines/legacy/reference/transforms/#filter
[8]: /ko/observability_pipelines/legacy/reference/transforms/#aggregate
[9]: /ko/observability_pipelines/legacy/reference/transforms/#metrictolog
[10]: /ko/observability_pipelines/legacy/guide/control_log_volume_and_size/
[11]: /ko/observability_pipelines/legacy/reference/transforms/#route