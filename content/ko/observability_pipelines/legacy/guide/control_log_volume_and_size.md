---
aliases:
- /ko/integrations/observability_pipelines/guide/control_log_volume_and_size/
- /ko/observability_pipelines/guide/control_log_volume_and_size/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: 설명서
  text: Observability Pipelines로 데이터 작업
- link: /observability_pipelines/legacy/configurations/
  tag: 설명서
  text: Observability Pipelines 구성 알아보기
title: (레거시) 로그 볼륨 및 크기 제어
---

## 개요

조직이 커질수록 로그 볼륨도 커지기 때문에 다운스트림 서비스(예: 로그 관리 솔루션, SIEM 등)의 수집 및 인덱싱 비용도 오릅니다. 이 가이드에서는 Observability Pipelines의 변형을 이용해 데이터가 인프라스트럭처나 네트워크를 떠나기 *전*에 로그 볼륨과 로그 크기를 줄여서 비용을 제어하는 방법을 설명합니다.

## 사전 필수 조건
- [Observability Pipelines Worker를 설치 및 구성][1]해 소스에서 데이터를 수집하고 대상으로 라우트했습니다.
- [Observability Pipelines 기본][2]에 대해 잘 알고 있습니다.

## 변형을 이용해 로그 볼륨 관리

Observability Pipelines 파이프라인에서 변형은 파이프라인을 통해 유입되는 이벤트 로그를 수정하는 작업을 합니다.

### 이벤트 중복 제거

다음 구성 요소를 구성에 추가하여 [변형 중복 제거][3]를 사용해 파이프라인을 통과하는 데이터 복사본을 제거합니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: dedupe
    inputs:
      - my-source-or-transform-id
    cache: null
    fields: null
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "dedupe"
inputs = [ "my-source-or-transform-id" ]
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "dedupe",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "cache": null,
      "fields": null
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

Observability Pipelines Worker는 각 이벤트에 고유한 식별자를 할당해 중복 제거된 이벤트를 추적합니다. `cache` 옵션을 사용해 최신 이벤트를 캐시하여 향후 중복된 데이터를 확인하는 데 사용할 수 있고, 기본값인 5,000개 이벤트로 재설정합니다. `fields` 옵션을 사용하면 이벤트가 중복된 경우 이를 결정하는 데 사용된 필드 목록을 볼 수 있습니다.

### 이벤트 필터링

특정 조건을 충족하는 로그만 파이프라인의 구성 요소를 통과하도록 하려면 [필터 변형][4]를 사용하세요. 예를 들어 로그가 포함된 위치를 조건으로 지정할 수 있습니다.

- `env`와 같은 특정 태그
- `status` 필드가 400인 로그와 같인 특정 필드 값

이와 같은 경우 [필터 변형][4]을 포함하는 구성 요소를 삽입해 [Datadog Processing Language(DPL)/ Vector Remap Language(VRL)][5] 또는 [Datadog Log Search 구문][6]을 사용하는 로그를 필터링하여 조건을 지정하세요. 조건과 일치하지 않는 로그는 무시됩니다.

아래는 필터 변형과 DPL/VRL을 사용해 `status`가 `500`인 로그만 전송한 예시입니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: 
      type: "vrl"
      source: ".status == 500"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "filter"
inputs = [ "my-source-or-transform-id" ]

  [transforms.my_transform_id.condition]
  type = "vrl"
  source = ".status == 500"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "filter",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "condition": {
        "type": "vrl",
        "source": ".status == 500"
        }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### 샘플 로그

대규모 데이터나 CDN 로그와 같이 노이즈가 많이 포함된 데이터를 분석할 때는 전체 로그를 대상에 보낼 필요가 없습니다. 대신, [샘플 변형][7]을 사용해 분석 통계에 유의미하게 사용될 수 있는 로그만 전송하세요.

`exclude` 필드를 사용하면 샘플링에 제외되는 이벤트를 설정할 수 있고 DPL/VRL 또는 Datadog Log Search 구문을 지원합니다. 아래는 `rate`로 설정해 이벤트 10개마다 샘플링하도록 구성한 예시입니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: sample
    inputs:
      - my-source-or-transform-id
    exclude: 
       type: "datadog_search"
       source: "*stack"
    rate: 10
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "sample"
inputs = [ "my-source-or-transform-id" ]
rate = 10

  [transforms.my_transform_id.exclude]
  type = "datadog_search"
  source = "*stack"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "sample",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "exclude": {
        "type": "datadog_search",
        "source": "*stack"
      },
      "rate": 10
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### 로그를 메트릭으로 전환

시간에 따른 동작을 관찰하고 싶을 경우, 이벤트 데이터 포인트 주변 메트릭이 연속적인 로그 데이터보다 더 유용합니다. 파이프라인을 통해 로그가 유입될 때 [로그에서 메트릭 변형][8]을 사용하면 특정 태그를 기반으로 메트릭을 생성하여 로그 볼륨을 줄일 수 있습니다.

4가지 유형의 메트릭을 생성할 수 있습니다.

- 카운터(Counter)는 특정 태그가 있는 로그 인스턴스 수를 세는데 유용합니다. 개수를 증분하거나 0으로 리셋할 수 있습니다.
- 분포(Distribution)는 샘플된 값의 분포를 표현합니다. 개요와 히스토그램을 생성하는 데 유용합니다.
- 게이지(Gauge)는 임의로 상승하거나 하락할 수 있는 단일 수치를 뜻합니다. 계속해서 변하는 값을 추적할 때 유용합니다.
- 세트(Set)는 고유한 값 배열을 통합합니다. 고유한 IP 주소를 수집하는 데 유용하게 사용할 수 있습니다.

아래는 `counter` 메트릭을 생성하는 구성의 예시입니다. `metrics`에서 이벤트에 추가될 키/값 쌍을 정의합니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: log_to_metric
    inputs:
      - my-source-or-transform-id
    metrics:
      - type: counter
        field: status
        name: response_total
        namespace: service
        tags:
          status: "{{status}}"
          host: "{{host}}"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "log_to_metric"
inputs = [ "my-source-or-transform-id" ]

  [[transforms.my_transform_id.metrics]]
  type = "counter"
  field = "status"
  name = "response_total"
  namespace = "service"

    [transforms.my_transform_id.metrics.tags]
    status = "{{status}}"
    host = "{{host}}"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "log_to_metric",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "metrics": [
        {
          "type": "counter",
          "field": "status",
          "name": "response_total",
          "namespace": "service",
          "tags": {
            "status": "{{status}}",
            "host": "{{host}}"
          }
        }
      ]
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

위 구성으로 다음 로그를 통과시킨다고 가정합시다.

```
{
  "log": {
    "host": "10.22.11.222",
    "message": "Sent 200 in 54.2ms",
    "status": 200
  }
}
```

그러면 다음과 같은 메트릭이 생성됩니다.

```
{"metric":{"counter":{"value":1},"kind":"incremental","name":"response_total","namespace":"service","tags":{"host":"10.22.11.222","status":"200"}}}]

```

### 여러 이벤트를 단일 로그로 축소

여러 로그가 로그 하나로 통합이 가능한 경우도 있습니다. 따라서 로그 볼륨을 줄일 수 있는 또 다른 방법 하나는 여러 로그를 단일 로그로 병합하는 것입니다. [축소 변형][9]을 사용해 여러 로그를 하나로 축소할 수 있습니다.

아래는 축소 변형 구성을 사용해 여러 Ruby 로그 예외 이벤트를 통합한 예시입니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: reduce
    inputs:
      - my-source-or-transform-id
    group_by:
      - host
      - pid
      - tid
    merge_strategies:
      message: concat_newline
    starts_when: match(string!(.message), r'^[^\\s]')
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "reduce"
inputs = [ "my-source-or-transform-id" ]
group_by = [ "host", "pid", "tid" ]
starts_when = "match(string!(.message), r'^[^\\s]')"

[transforms.my_transform_id.merge_strategies]
  message = "concat_newline"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "reduce",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "group_by": [
        "host",
        "pid",
        "tid"
      ],
      "merge_strategies": {
        "message": "concat_newline"
      },
      "starts_when": "match(string!(.message), r'^[^\\s]')"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

축소 변형에서 `group_by`는 그룹 이벤트에 사용된 필드 목록을 정리한 것입니다. 이 예시에서 이벤트는 `host`, `pid`, `tid` 필드별로 그룹화되었습니다.

`merge_strategies`는 병합 전략을 사용자 지정하기 위한 필드 이름 맵입니다. 병합 전략에는 여러 가지가 있는데, 각 값을 어레이에 추가하는 `array`, 모든 수치 값을 추가하는 `sum` 등이 있습니다. 이 예시에서는  `concat_newline`를 사용했는데, 각 문자열 값이 연결된 후 새 줄로 구분하는 병합 전략입니다.

`starts_when`는 트랜잭션의 첫 이벤트를 구분하는 조건입니다. 이벤트에서 이 조건이 `true`인 경우, 이전 트랜잭션이 해당 이벤트 없이 비워지고, 새 트랜잭션이 시작됩니다. 이 예시에서는 `.message`가 있는 이벤트 중에서 `^[^\\s]` 정규식 조건과 일치하지 않는 이벤트가 단일 이벤트로 축소되었습니다.

위 구성으로 다음 Ruby 예외 로그를 통과시킨다고 가정합시다.

```
[{"log":{
    "host":"host-1.hostname.com",
    "message":"foobar.rb:6:in `/': divided by 0(ZeroDivisionError)",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:6:in `bar'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:2:in `foo'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:9:in `\u003cmain\u003e'",
    "pid":1234,"tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"Hello world, I am a new log",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:22.123528Z"
}}]
```

다음과 같은 로그가 생성됩니다.

```
[{
"log": {
    "host":"host-1.hostname.com",
    "message":"foobar.rb:6:in `/': divided by 0 (ZeroDivisionError)\n
               from foobar.rb:6:in `bar'\n
               from foobar.rb:2:in `foo'\n
               from foobar.rb:9:in `\u003cmain\u003e'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"Hello world, I am a new log",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:22.123528Z"
}}]
```

## 변형을 사용해 로그 크기 관리

### 불필요한 필드를 제거해 로그 크기 축소

로그에는 불필요한 필드가 포함되어 있을 수 있습니다. 하루에 테라바이트 크기의 데이터를 처리한다고 할 때, 불필요한 필드를 제거하면 대상에서 수집 및 인덱싱하는 로그의 총 수가 줄어듭니다.

불필요한 필드를 제거하려면 [DPL/VRL][5]을 사용해 로그 데이터를 리매핑하세요. 다음 예시에서는 `del`을 사용해 불필요한 태그를 제거합니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: remap
    inputs:
      - my-source-or-transform-id
    source: |-
      del(.unecessary_env_field)
      del(.unecessary_service_field)
      del(.unecessary_tag_field)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "remap"
inputs = [ "my-source-or-transform-id" ]
source = """
del(.unecessary_env_field)
del(.unecessary_service_field)
del(.unecessary_tag_field)"""
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "remap",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "source": "del(.unecessary_env_field)\ndel(.unecessary_service_field)\ndel(.unecessary_tag_field)"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/legacy/setup/
[2]: /ko/observability_pipelines/legacy/configurations/
[3]: /ko/observability_pipelines/legacy/reference/transforms/#dedupe
[4]: /ko/observability_pipelines/legacy/reference/transforms/#filter
[5]: /ko/observability_pipelines/legacy/reference/processing_language/
[6]: /ko/logs/explorer/search_syntax/
[7]: /ko/observability_pipelines/legacy/reference/transforms/#sample
[8]: /ko/observability_pipelines/legacy/reference/transforms/#logtometric
[9]: /ko/observability_pipelines/legacy/reference/transforms/#reduce