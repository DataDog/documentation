---
aliases:
- /ko/api/latest/tracing/
- /ko/api/v1/tracing/
- /ko/api/v2/tracing/
description: 사용자 지정 통합을 위해 추적 API를 사용하여 Datadog Agent 사용자 지정 통합 및 지원되지 않는 프레임워크에 직접
  추적을 보내는 방법을 알아보세요.
further_reading:
- link: /tracing/
  tag: 설명서
  text: Datadog APM 트레이싱 알아보기
- link: /tracing/glossary/
  tag: 설명서
  text: APM 용어 및 소개
title: API로 Agend에 트레이스 전송하기
---

Datadog 애플리케이션 성능 모니터링(APM)을 사용하면 코드를 트레이싱하여 성능 메트릭을 수집하고, 애플리케이션에서 느리거나 비효율적인 부분이 있는지 확인할 수 있습니다.

추적 데이터는 계측된 코드에서 HTTP API를 통해 Datadog Agent로 전송됩니다. Datadog 추적 라이브러리를 사용하면 Datadog Agent로 메트릭을 간편하게 전송할 수 있습니다. 그러나 라이브러리를 사용할 수 없거나 아직 공식 Datadog 추적 라이브러리가 없는 언어로 작성된 애플리케이션을 계측하기 위해 API와 직접 상호 작용하고 싶을 수도 있습니다.

트레이싱 API는 서비스 측의 API가 아니라 Agent의 API입니다. 트레이스를 로컬 엔드포인트 `http://localhost:8126/v0.3/traces`로 전송하여, Agent가 트레이스를 Datadog로 전송할 수 있도록 하세요.

## 경로

{{< code-block lang="bash" >}}
PUT http://localhost:8126/v0.3/traces
{{< /code-block >}}

## 요청

트레이스는 다음과 같은 트레이스 배열로 전송할 수 있습니다.

```
[ trace1, trace2, trace3 ]
```
또, 각 트레이스는 하나의 스팬(span) 배열입니다.

```
trace1 = [ span, span2, span3 ]
```
각 스팬은 `trace_id`, `span_id`, `resource` 등으로 구성됩니다. 트레이스의 각 스팬은 동일한 `trace_id`를 사용합니다. 그러나 `trace_id`와 span_id의 값은 다릅니다.

### 모델

<div class="alert alert-info">Datadog 추적 라이브러리는 64비트 및 128비트 트레이스 ID를 모두 지원합니다. <a href="/tracing/guide/span_and_trace_id_format/">자세한 내용은 스팬 및 트레이스 ID 형식을</a> 참조하세요 .</div>

| 필드      | 유형    | 설명                           |
|------------|---------|---------------------------------------|
| `duration`   | int64   | 나노초 기준의 요청 처리 시간. |
| `error`      | int32   | 에러가 발생했음을 나타내려면 이 값을 1로 설정하세요. 오류가 발생하면 오류 메시지, 유형, 스택 등 추가 정보를 meta 속성으로 넘겨야 합니다. |
| `meta`       | 오브젝트  | 키값 메타데이터 세트. 키와 값은 스트링이어야 합니다. |
| - `<any-key>` | 문자열 | 키값 메타데이터의 추가 속성. |
| 메트릭    | 오브젝트  | 키값 메타데이터 세트. 키는 반드시 스트링이어야 하며, 값은 64bit 부동소수여야 합니다. |
| - `<any-key>` | double | 키값 메트릭의 추가 속성. |
| name       | 문자열  | 스팬의 이름. 스팬 이름은 100자 이하여야 합니다. |
| `parent_id`  | int64   | 부모 스팬의 스팬 정수 ID. |
| `resource`   | 문자열  | 트레이싱하는 리소스. 리소스 이름은 5000자 이하여야 합니다. |
| `service`    | 문자열  | 트레이싱하는 서비스. 서비스 이름은 100자 이하여야 합니다. |
| `span_id`    | int64   | 스팬 정수(64bit의 서명 없는) ID. |
| `start`      | int64   | UNIX Epoch로부터 나노초로 지정한 요청 시작 시간. |
| `trace_id`   | int64   | 트레이스에 대한 고유 정수 ID의 하단 64비트(스팬 포함)입니다. 128비트 트레이스 ID의 경우 `meta` 필드에 16진법으로 인코딩된 소문자 형식의 `_dd.p.tid` 태그를 사용하여 상위 64비트를 설정합니다. |
| `type`       | enum    | 요청 유형. 사용할 수 있는 enum 값은 `web`, `db`, `cache`, `custom`입니다. |


### 예시

{{< code-block lang="json" >}}
[
  [
    {
      "duration": 12345,
      "error": "integer",
      "meta": {
        "<any-key>": "string"
      },
      "metrics": {
        "<any-key>": "number"
      },
      "name": "span_name",
      "parent_id": "integer",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789,
      "type": "web"
    }
  ]
]
{{< /code-block >}}


## 응답

200
: OK

### 예시

{{< tabs >}}

{{% tab "Shell" %}}

{{< code-block lang="curl" >}}
# Curl 명령어
curl -X PUT "http://localhost:8126/v0.3/traces" \
-H "Content-Type: application/json" \
-d @- << EOF
[
  [
    {
      "duration": 12345,
      "name": "span_name",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789
    }
  ]
]
EOF
{{< /code-block >}}

{{% /tab %}}

{{% tab "Powershell" %}}
{{< code-block lang="curl" >}}

# Invoke-RestMethod 명령

$uri = "http://localhost:8126/v0.3/traces"
$headers = @{
    "Content-Type" = "application/json"
}
$body = @"
[
  [
    {
      "duration": 12345,
      "name": "span_name",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789
    }
  ]
]
"@

Invoke-RestMethod -Uri $uri -Method Put -Body $body -Headers $headers
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}