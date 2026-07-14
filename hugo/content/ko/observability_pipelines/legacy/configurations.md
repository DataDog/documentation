---
aliases:
- /ko/integrations/observability_pipelines/vector_configurations/
- /ko/observability_pipelines/vector_configures/
- /ko/observability_pipelines/reference/
- /ko/observability_pipelines/configures/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: 설명서
  text: Observability Pipelines로 데이터 작업
- link: /observability_pipelines/legacy/setup
  tag: 설명서
  text: Observability Pipelines 설정
title: (레거시) 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipeline은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요

Observability Pipelines Worker 설정을 통해 소스에서 대상으로 로그를 수집, 변환, 라우팅할 수 있습니다. 설정 파일은 YAML, TOML 및 JSON을 지원합니다. 세 가지 주요 설정 구성 요소는 소스, 변환, 싱크입니다.

## 소스 설정 예시

[소스 구성 요소][1]는 Observability Pipelines Worker가 통합 가시성 데이터 소스에서 데이터를 수집하거나 수신하는 방법을 정의합니다.

YAML 설정 파일을 만들고 다음 소스 예시를 추가합니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sources:
  generate_syslog:
    type: demo_logs
    format: syslog
    count: 100
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sources.generate_syslog]
   type = "demo_logs"
   format = "syslog"
   count = 100
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"sources": {
    "generate_syslog": {
      "type": "demo_logs",
      "format": "syslog",
      "count": 100
    }
}
```

{{% /tab %}}
{{< /tabs >}}

이 `source` 구성 요소의 고유 ID는 `generate_syslog`입니다. 이 고유 ID는`sink` 구성 요소로 데이터를 변환하고 라우팅하는 데 중요합니다.

`type`은 Observability Pipelines Worker가 관측 가능성 데이터를 수집하는 소스 유형입니다. 이 예에서는 `demo_logs` 소스를 사용해 샘플 로그 데이터를 생성하여 다양한 형식의 이벤트 유형을 시뮬레이션할 수 있도록 합니다. `format` 옵션은 `demo_logs` 소스가 어떤 유형의 로그(이 경우 Syslog 형식)를 도출하는지 알려줍니다. `count` 옵션은 `demo_logs` 소스가 몇 줄을 포함할지 알려줍니다.

지원되는 모든 소스는 [소스 설명서][1]에서 확인하세요.

## 예제 변환 설정

다음 예제를 사용하여 `demo_logs` 소스에서 수집한 데이터를 조작하는 [변환 구성 요소][2]를 정의합니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  remap_syslog:
    inputs:
      - generate_syslog
    type: remap
    source: |2
        structured = parse_syslog!(.message)
        . = merge(., structured)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.remap_syslog]
   inputs = ["generate_syslog" ]
   type = "remap"
   source = '''
     structured = parse_syslog!(.message)
     . = merge(., structured)
'''
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"transforms": {
    "remap_syslog": {
      "inputs": [
        "generate_syslog"
      ],
      "type": "remap",
      "source": "  structured = parse_syslog!(.message)\n  . = merge(., structured)\n"
    }
  }
```

{{% /tab %}}
{{< /tabs >}}

이 `transforms.remap_syslog` 구성 요소에서 `inputs` 옵션은 `generate_syslog`로 설정되어 있으며, 이는 이전에 정의된 `generate_syslog` 소스에서 이벤트를 수신한다는 의미입니다. 변환의 구성 요소 유형은 `remap`입니다.

`source`에는 Observability Pipelines Worker가 수신하는 각 이벤트에 적용할 리매핑 변환 목록이 포함되어 있습니다. 이 예에서는 하나의 작업(`parse_syslog`)만 살행되지만 여러 작업을 추가할 수 있습니다.

`parse_syslog` 함수는 `message`라는 단일 필드를 수신하며, 여기에는 `generate_syslog` 소스에서 생성된 Syslog 이벤트가 포함됩니다. 이 함수는 Syslog 형식의 메시지 내용을 파싱하여 구조화된 이벤트로 전송합니다.

이 변환 예제는 데이터를 모양을 만들고 변환하는 Observability Pipelines Worker의 기능 중 일부만을 보여줍니다[*](#support). 샘플링, 필터링, 보강 등 지원되는 모든 변환에 관해서는 [변환 설명서][2]를 참조하세요.

## 싱크 설정 예시

`transform` 구성 요소에서 데이터를 파싱한 후 다음 [sink][3] 예시를 사용하여 데이터를 대상으로 라우팅합니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  emit_syslog:
    inputs:
      - remap_syslog
    type: console
    encoding:
      codec: json
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sinks.emit_syslog]
inputs = [ "remap_syslog" ]
type = "console"

  [sinks.emit_syslog.encoding]
  codec = "json"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"sinks": {
    "emit_syslog": {
      "inputs": [
        "remap_syslog"
      ],
      "type": "console",
      "encoding": {
        "codec": "json"
      }
    }
}
```

{{% /tab %}}
{{< /tabs >}}

이 `sink`(또는 대상) 구성 요소의 ID는 `emit_syslog`입니다. `inputs` 옵션은 `remap_syslog` 변환으로 생성된 이벤트가 이 싱크로 처리되도록 지정합니다. `encoding` 옵션은 싱크가 이벤트를 JSON 형식으로 전송하도록 지시합니다.

지원되는 모든 싱크는 [싱크 설명서][3]를 참조하세요.

## 모든 요소를 종합적으로 사용하기

이 세 가지 기본 구성 요소인 소스, 변환, 싱크를 설정했다면 Observability Pipelines 구성 파일을 만든 것입니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sources:
  generate_syslog:
    type: demo_logs
    format: syslog
    count: 100
transforms:
  remap_syslog:
    inputs:
      - generate_syslog
    type: remap
    source: |2
        structured = parse_syslog!(.message)
        . = merge(., structured)

sinks:
  emit_syslog:
    inputs:
      - remap_syslog
    type: console
    encoding:
      codec: json
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sources.generate_syslog]
type = "demo_logs"
format = "syslog"
count = 100

[transforms.remap_syslog]
inputs = [ "generate_syslog" ]
type = "remap"
source = '''
  structured = parse_syslog!(.message)
  . = merge(., structured)
'''

[sinks.emit_syslog]
inputs = [ "remap_syslog" ]
type = "console"

  [sinks.emit_syslog.encoding]
  codec = "json"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sources": {
    "generate_syslog": {
      "type": "demo_logs",
      "format": "syslog",
      "count": 100
    }
  },
  "transforms": {
    "remap_syslog": {
      "inputs": [
        "generate_syslog"
      ],
      "type": "remap",
      "source": "  structured = parse_syslog!(.message)\n  . = merge(., structured)\n"
    }
  },
  "sinks": {
    "emit_syslog": {
      "inputs": [
        "remap_syslog"
      ],
      "type": "console",
      "encoding": {
        "codec": "json"
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

다음 명령으로 컴파일링하고 구성을 실행합니다.

```
vector --config ./<configuration_filename>
```

설정에 성공하면 파싱된 데모 로그 가 JSON 형식으로 출력됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/legacy/reference/sources/
[2]: /ko/observability_pipelines/legacy/reference/transforms/
[3]: /ko/observability_pipelines/legacy/reference/sinks/