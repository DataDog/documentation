---
description: Base64 디코딩 및 인코딩과 같은 사용자 지정 프로세서 함수 사용 방법을 익히고, 일반적인 로그 변환 사용 사례에 대한
  스크립트 예제를 확인하세요.
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/custom_processor/
  tag: 설명서
  text: 사용자 지정 프로세서에 대해 자세히 알아보기
- link: /observability_pipelines/set_up_pipelines/
  tag: 설명서
  text: Pipelines 설정
- link: https://www.datadoghq.com/blog/migrate-historical-logs/
  tag: 블로그
  text: Observability Pipelines를 사용하여 Splunk 및 Elasticsearch의 과거 로그 마이그레이션
title: 사용자 지정 프로세서를 시작하기
---
## 개요 {#overview}

Observability Pipelines를 사용하면 로그를 목적지에 보내기 전에 변환할 수 있습니다. 사용자 지정 프로세서를 사용하여 로그 필드, 값 및 이벤트를 조건부로 수정하는 사용자 지정 함수가 포함된 스크립트를 만드세요.

이 가이드는 사용자 지정 프로세서 스크립트에서 다음 함수를 사용하는 방법을 안내합니다.

- [Base64 디코딩](#decode-base64)
- [전체 Base64 이벤트 디코딩](#decode-an-entire-base64-encoded-event)
- [Base64 인코딩](#encode-base64)

또한 다음과 같은 일반적인 사용 사례를 다루는 스크립트 예제도 살펴봅니다.

- [과거 로그의 타임스탬프 재매핑](#remap-timestamps-for-historical-logs)
- [Datadog 태그 배열에서 필드 추출(`ddtags`)](#extract-a-field-from-the-datadog-tags-array)
- [다른 필드의 값 참조](#reference-another-fields-value)
- [null 값을 포함하는 속성 제거](#remove-attributes-containing-null-values)
- [중첩된 속성을 루트 수준으로 병합](#merge-nested-attributes-to-root-level)
- [_raw 형식으로 아웃바운드 로그 직렬화](#serialize-outbound-logs-in-_raw-format)

## Base64 디코딩 {#decode-base64}

Base64로 인코딩된 수신 로그 필드나 이벤트의 경우 [`decode_base64`][1] 함수를 사용하여 필드나 이벤트를 디코딩하세요. 이 함수의 구문은 [`decode_base16`][1]에서도 작동합니다.

### 예시 {#example}

#### 입력 {#input}

디코딩할 Base64 필드가 포함된 로그 이벤트 예시:

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ=="
}
```

#### 사용자 지정 함수 {#custom-function}

`decode_base64` 함수를 사용하여 `payload`를 디코딩하고 그 결과를 `decoded_payload`라는 새 필드에 저장하세요.

```yaml
.decoded_payload = decode_base64!(.payload)
```


또는 이전 함수의 `decoded_payload`를 `payload`로 대체하여 원본 `payload` 값을 디코딩된 값으로 덮어쓸 수 있습니다.

```yaml
.payload = decode_base64!(.payload)
```

#### 출력 {#output}

`decoded_payload`를 사용하여 디코딩된 값을 저장할 때의 출력입니다.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ==",
    "decoded_payload": "User requested access to protected resource"
}
```

## 전체 Base64 인코딩 이벤트 디코딩 {#decode-an-entire-base64-encoded-event}

### 예시 {#example-1}

#### 입력 {#input-1}

Base64로 인코딩된 이벤트의 입력 예시:

```json
{
    "raw": "eyJ0aW1lc3RhbXAiOiAiMjAyNS0wNS0yOFQxOTozMDowMFoiLCAibGV2ZWwiOiAiaW5mbyIsICJtessagemIjogIlVzZXIgbG9naW4gc3VjY2Vzc2Z1bCJ9"
}
```

#### 사용자 지정 함수 {#custom-function-1}

전체 Base64 인코딩 이벤트 `raw`를 디코딩하기 위한 스크립트.

```yaml
.json_string = decode_base64!(.raw)`
.full_event = parse_json!(.json_string)
. = .full_event
```

**참고:** 구문 `. = .full_event`는 전체 이벤트를 필드의 내용으로 바꾸기 위한 약어입니다.

#### 출력 {#output-1}

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Base64 인코딩{#encode-base64}

Base64로 인코딩하려는 발신 로그 필드나 이벤트의 경우, [`encode_base64`][2] 함수를 사용하여 필드나 이벤트를 인코딩하세요. 이 함수의 구문은 [`encode_base16`][3]에서도 작동합니다.

### 예시 {#example-2}

#### 입력 {#input-2}

Base64로 인코딩하려는 `message` 필드가 포함된 로그 이벤트 예시:

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "message": "User login successful"
}
```

#### 사용자 지정 함수 {#custom-function-2}

`encode_base64` 함수를 사용하여 `message`를 디코딩하고 그 결과를 `encoded_message`라는 새 필드에 저장하세요.

```yaml
.encoded_message = encode_base64!(.message)
```

또는 이전 함수에서 `encoded_message`를 `message`로 대체하여 원본 메시지 필드(`message`)를 디코딩된 값으로 덮어쓸 수 있습니다.

```yaml
.message = encode_base64!(.message)
```

#### 출력 {#output-2}

`encoded_message`를 사용하여 인코딩된 값을 저장할 때의 출력입니다.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "message": "User login successful",
    "encoded_message": "VXNlciBsb2dpbiBzdWNjZXNzZnVs"
}
```

## 과거 로그의 타임스탬프 재매핑{#remap-timestamps-for-historical-logs}

다른 플랫폼에서 보관된 로그를 마이그레이션하려는 경우 해당 로그가 올바른 과거 타임스탬프를 갖도록 하는 것이 중요합니다. 과거 타임스탬프로 로그를 재매핑하면 규정 준수, 감사 및 보관 목적으로 저장된 이전 로그를 처리할 수 있습니다.

### 예시 {#example-3}

#### 입력 {#input-3}

Worker가 로그에서 `timestamp` 필드를 찾지 못하면 Worker가 로그를 수신한 시점의 타임스탬프가 사용됩니다. 이는 Worker가 로그를 수신한 시점의 타임스탬프와 Worker가 찾고 있는 값인 로그의 과거 타임스탬프(`historical_ts`)를 보여주는 로그 예시입니다.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "historical_ts": "2019-03-14T17:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

#### 사용자 지정 함수 {#custom-function-3}

위 예시의 경우 함수를 생성하여 수집된 타임스탬프를 새 필드에 저장하고 `timestamp`를 `historical_ts` 값으로 재매핑할 수 있습니다.

```yaml
#Create a new field for the ingested/processed timestamp
.ingested_ts = {{.timestamp}}

#Remap timestamp to be the historical field
.timestamp = {{.historical_ts}}

#Remove the original historical timestamp
del(.historical_ts)

```

#### 출력 {#output-3}

```json
{
    "timestamp": "2019-03-14T17:30:00Z",
    "ingested_ts": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Datadog 태그 배열에서 필드 추출 {#extract-a-field-from-the-datadog-tags-array}

Datadog 태그(`ddtags`) 배열 내에 중첩된 필드에는 유용한 정보가 포함될 수 있습니다. 이러한 필드를 최상위 키-값 쌍으로 추출하거나 다른 필드의 값으로 추출할 수 있습니다.

### 예시 {#example-4}

#### 입력 {#input-4}

Datadog 태그가 포함된 `ddtags` 배열을 가진 샘플 로그입니다.

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "service:chaos-engineering",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### env 필드를 추출하기 위한 사용자 지정 함수 {#custom-function-to-extract-the-env-field}

```yaml
#Extract a tag from ddtags array and elevate as log attribute
.my_tag, err = filter(array!(.ddtags)) -> |_index, value| {
    #Keep any elements that have the key name "env"
    starts_with(value, "env:")
}
#Assign env to be value of the key
.env = split!(.my_tag[0], ":")[1]
del(.my_tag)

```

#### 출력 {#output-4}

```json
{
   "ddsource": "python",
   "ddtags": [
       "env:prod",
       "team:sre",
       "service:chaos-engineering",
       "version:1.0.0",
       "pod_name:load-generator-main-abcde"
   ],
   "env": "prod",
   "hostname": "gke-prod-node-abc123.internal",
   "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
   "service": "chaos-engineering",
   "source_type": "datadog_agent",
   "status": "info",
   "timestamp": "2025-005-27T05:26:18.205Z"
}
```
## 로그 이벤트에 태그 추가 {#add-a-tag-to-the-log-event}

태그는 로그를 다른 텔레메트리 및 서비스와 연관시키는 데 사용됩니다. 태그는 따옴표로 묶인 `key:value` 쌍의 배열로 저장됩니다(예: `"service:payments-app"`). Datadog 로그의 경우 태그는 Datadog 태그(`ddtags`) 배열 내에 중첩되어 있습니다. 아래 스크립트를 사용하여 기존 속성에서 태그를 변환하거나 새 태그를 추가하세요.

### 속성을 태그로 변환하는 예시 {#example-to-convert-an-attribute-to-a-tag}

#### 입력 {#input-5}

이 예시에서 샘플 로그에는 `ddtags` 배열이 포함되어 있으며, `service` 필드를 태그로 추가하려고 합니다. 

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

####  `service` 속성을 태그로 변환하는 사용자 지정 함수 {#custom-function-to-convert-the-service-attribute-to-a-tag}

```yaml
# First, check if the attribute 'ddtags' exists. You can replace 'ddtags' with the name of any array
if !exists(.ddtags) {
    .ddtags = []
}

# This example checks if 'service' exists, then adds the templatized value of service as a tag. Also, it converts the service value to a string
if exists(.service) {
  .ddtags = push(array!(.ddtags), "service:" + to_string!({{.service}}) )
}

```

#### 출력 {#output-5}

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```
### 태그를 생성하여 추가하는 예시 {#example-to-create-and-add-a-tag}

#### 입력 {#input-6}

이 예시에서 샘플 로그에는 `ddtags` 배열이 포함되어 있으며, `"system:service-mesh"`라는 태그를 생성하여 해당 배열에 추가하려고 합니다.

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

####  `system` 태그를 생성하여 추가하는 사용자 지정 함수 {#custom-function-to-create-and-add-the-system-tag}

```yaml
# First, check if the attribute 'ddtags' exists. You can replace 'ddtags' with the name of any array
if !exists(.ddtags) {
    .ddtags = []
}

# Appends a new tag to the array by defining a separate key:value pair
.ddtags = push(array!(.ddtags), "system:service-mesh")

```

#### 출력 {#output-6}

```json
{
	"ddsource": "python",
	"ddtags": [
		"env:prod",
		"team:sre",
		"version:1.0.0",
		"pod_name:load-generator-main-abcde",
		"system:service-mesh"
	],
	"hostname": "gke-prod-node-abc123.internal",
	"message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
	"service": "chaos-engineering",
	"source_type": "datadog_agent",
	"status": "info",
	"timestamp": "2025-005-27T05:26:18.205Z"
}
```

## 다른 필드의 값 참조 {#reference-another-fields-value}

필드 값을 다른 필드에 기반하여 설정하려면 다른 필드의 값을 동적으로 참조할 수 있습니다.

### 예시 {#example-5}

#### 입력 {#input-7}

이 예시에서는 잘못된 서비스 이름이 포함된 서비스 필드가 있으며, 대신 `app_id`의 값을 서비스에 사용하려고 합니다.

```json
{
    "timestamp": "2025-05-27T05:26:18.205Z",
    "status": "info",
    "service": "mywrongservice",
    "app_id": "web-store"
}
```

#### 사용자 지정 함수 {#custom-function-4}

```yaml
#Overwrite service to be the value of app_id
.service = {{.app_id}}
```

#### 출력 {#output-7}

```json
{
  "timestamp": "2025-05-27T05:26:18.205Z",
  "status": "info",
  "service": "web-store",
  "app_id": "web-store"
}
```

## null 값을 포함하는 속성 제거 {#remove-attributes-containing-null-values}

null 또는 빈 값을 가진 속성은 로그의 용량을 불필요하게 늘릴 수 있습니다. null 값을 제거하여 로그를 정리하고 정보를 제공하는 속성만 전송하세요. 아래 스크립트의 `empty_patterns` 섹션에는 로그에서 확인할 빈 패턴 목록이 포함되어 있습니다. 사용 사례에 맞게 패턴을 추가하거나 제거할 수 있습니다.

```json
# Define your empty patterns
empty_patterns = ["null", "NULL", "N/A", "n/a", "none", "NONE", "-", "undefined"]

# Apply generic cleanup
. = compact(map_values(., recursive: true) -> |v| {
 if is_null(v) ||
    includes(empty_patterns, v) ||
    (is_string(v) && strip_whitespace!(v) == "") ||
    (is_array(v) && length!(v) == 0) ||
    (is_object(v) && length!(v) == 0) {
   null
 } else {
   v
 }
})
```

## 중첩된 속성을 루트 수준으로 병합 {#merge-nested-attributes-to-root-level}

필터 쿼리에서 중첩된 객체나 필드를 대상으로 지정하려면 여러 경로를 정의해야 할 수 있습니다. 이는 메시지 필드로 작업할 때 흔히 발생하며, 결과적으로 파싱된 콘텐츠가 객체 내에 중첩됩니다. Observability Pipelines의 필터 구문을 사용할 때 중첩된 필드에 액세스하려면 `<OUTER_PATH>.<INNER_PATH>` 표기법이 필요합니다.

예를 들어, 이 로그에는 문자열화된 JSON 메시지가 포함되어 있습니다.

```json
{
 "level": "info",
 "message": "{\"event_type\":\"user_login\",\"result\":\"success\",\"login_method\":\"oauth\",\"user_agent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\",\"ip_address\":\"192.168.1.100\",\"session_id\":\"sess_abc123xyz\",\"duration_ms\":245}",
 "timestamp": "2019-03-12T11:30:00Z",
 "processed_ts": "2025-05-22T14:30:00Z",
 "user_id": "12345",
 "app_id": "streaming-services",
 "ddtags": [
   "kube_service:my-service",
   "k8_deployment:your-host",
   "kube_cronjob:myjob"
 ]
}
```

이것은 `message` 필드가 구문 분석된 후의 출력입니다. 구문 분석된 콘텐츠는 `message` 객체에 중첩되어 있습니다.

```json
{
   "app_id": "streaming-services",
   "ddtags": [
       "kube_service:my-service",
       "k8_deployment:your-host",
       "kube_cronjob:myjob"
   ],
   "level": "info",
   "message": {
       "duration_ms": 245,
       "event_type": "user_login",
       "ip_address": "192.168.1.100",
       "login_method": "oauth",
       "result": "success",
       "session_id": "sess_abc123xyz",
       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
   },
   "processed_ts": "2025-05-22T14:30:00Z",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_id": "12345"
}
```
이 경우 `event_type`을 필터링하려면 `@message.event_type`을 지정해야 합니다. `event_type` 또는 객체 내의 다른 필드를 직접 필터링하려면 Datadog은 객체를 루트 수준으로 평면화할 것을 권장합니다.

`message` 객체의 이벤트를 루트 수준으로 병합하려면 다음 스크립트를 사용하세요.

```json
if is_object(.message) {
 . = merge!(., .message)
 del(.message)
}
```

**참고**: 이 스크립트는 모든 JSON 객체에서 작동합니다. `message` 속성을 평면화하려는 필드 이름으로 바꾸기만 하면 됩니다.

그 결과로 직접 필터링할 수 있는 평면화된 속성이 포함된 로그가 생성됩니다.

```json
{
   "app_id": "streaming-services",
   "ddtags": [
       "kube_service:my-service",
       "k8_deployment:your-host",
       "kube_cronjob:myjob"
   ],
   "duration_ms": 245,
   "event_type": "user_login",
   "ip_address": "192.168.1.100",
   "level": "info",
   "login_method": "oauth",
   "processed_ts": "2025-05-22T14:30:00Z",
   "result": "success",
   "session_id": "sess_abc123xyz",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
   "user_id": "12345"
}
```

**참고**: 메시지 필드를 평면화하면 결과 로그에 더 이상 메시지 객체가 포함되지 않습니다. 즉, 로그가 Datadog으로 전송되면 Log Explorer에서 로그를 볼 때 로그 측면 패널에 {{< ui >}}Log Message{{< /ui >}} 섹션이 표시되지 않습니다.

## _raw 형식으로 아웃바운드 로그 직렬화 {#serialize-outbound-logs-in-raw-format}

Splunk 및 CrowdStrike는 로그 수집을 위해 `_raw` 형식을 선호합니다. `_raw` 형식으로 데이터를 전송하면 로그가 정규화되어 기본 제공 대시보드, 모니터 및 위협 탐지 콘텐츠를 활용할 수 있습니다. `_raw` 로그 형식이 적용되도록 아웃바운드 이벤트를 `_raw`로 직렬화할 수 있습니다.

**참고**:
- 로그를 `_raw` 형식으로 직렬화하기 전에 다른 처리, 리매핑 및 구문 분석 단계를 추가해야 합니다.
- 직렬화 후 로그가 올바르게 라우팅되도록 하려면 인코딩 유형을 {{< ui >}}Raw{{< /ui >}}로 설정하여 원하는 목적지를 구성하세요. 

입력 로그의 예시:

```json
{
   "app_id": "streaming-services",
   "level": "info",
   "message": {
       "duration_ms": 245,
       "event_type": "user_login",
       "ip_address": "192.168.1.100",
       "login_method": "oauth",
       "result": "success",
       "session_id": "sess_abc123xyz",
       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
   },
   "processed_ts": "2025-05-22T14:30:00Z",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_id": "12345"
}
```

이 사용자 지정 함수는 이벤트를 `_raw` 형식으로 직렬화합니다.

```json
# Serialize the entire event into _raw
._raw = encode_key_value!(.)
# Only keep _raw
. = { "_raw": ._raw }
```

다음은 사용자 지정 스크립트로 처리한 예시 로그의 출력입니다.

```json
{
   "_raw": "app_id=streaming-services level=info message.duration_ms=245 message.event_type=user_login message.ip_address=192.168.1.100 message.login_method=oauth message.result=success message.session_id=sess_abc123xyz message.user_agent=\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\" processed_ts=2025-05-22T14:30:00Z timestamp=2019-03-12T11:30:00Z user_id=12345"
}
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/processors/custom_processor/#decode_base16
[2]: /ko/observability_pipelines/processors/custom_processor/#encode_base64
[3]: /ko/observability_pipelines/processors/custom_processor/#encode_base16