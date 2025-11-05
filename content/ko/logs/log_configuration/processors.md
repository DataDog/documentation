---
algolia:
  tags:
  - grok
  - Grok 파서
  - 로그 파싱
  - 속성 추출하기
  - 속성 재매핑하기
  - 파싱
aliases:
- /ko/logs/processing/processors/
description: Grok 프로세서를 사용하여 로그 구문 분석하기
further_reading:
- link: /logs/log_configuration/pipelines
  tag: 설명서
  text: Datadog 파이프라인 살펴보기
- link: /logs/logging_without_limits/
  tag: 설명서
  text: Logging without Limits*
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
title: 프로세서
---

## 개요

프로세서는 [파이프라인][1] 내에서 실행되어 데이터 구조화 작업을 완료하고 로그를 강화하기 위한 속성을 생성합니다.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="프로세서" style="width:100%" >}}

[로그 설정 구성][1]에서 [Grok 파서](#grok-parser) 또는 [날짜 재매핑기](#remapper)와 같은 프로세서를 설정하여 속성을 추출, 생성 및 재매핑하고 로그와 패싯 검색을 강화할 수 있습니다.

**참고**:

- 구조화된 로그는 유효한 형식으로 전송되어야 합니다. 구조에 파싱에 유효하지 않은 문자가 포함되어 있는 경우 [mask_sequences][2] 기능을 사용하여 에이전트 수준에서 제거해야 합니다.

- 모범 사례로, 파이프라인당 최대 20개의 프로세서를 사용하는 것이 권장됩니다.

## Grok 파서

커스텀 grok 규칙을 만들어 전체 메시지 또는 원시 이벤트의 특정 속성을 파싱합니다. 자세한 내용은 [파싱 섹션][2]을 참조하세요. 모범 사례로, grok 프로세서 내에서 최대 10개의 파싱 규칙을 사용하는 것이 권장됩니다.

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 Grok 프로세서를 정의합니다.

{{< img src="logs/log_configuration/processor/grok_parser.png" alt="Grok 파서" style="width:80%;" >}}

**내 로그 파싱**을 클릭하여 기본 파이프라인을 통해 흐르는 로그에 대한 세 가지 파싱 규칙 세트를 시작합니다. 거기에서 속성 이름을 구체화하고 필요한 경우 다른 유형의 로그에 대한 새 규칙을 추가합니다. 이 기능을 사용하려면 해당 로그가 인덱싱되어 있고 실제로 유입되고 있어야 합니다. 일시적으로 제외 필터를 비활성화하거나 샘플 다운하여 이를 작동시킬 수 있습니다.

샘플을 클릭하여 선택한 다음, 파싱 규칙에 대한 평가를 트리거하고 화면 하단에 결과를 표시합니다.

프로세서에 최대 5개의 샘플을 저장할 수 있으며, 각 샘플의 길이는 최대 5000자까지 가능합니다. 모든 샘플에는 상태(`match` 또는 `no match`)가 표시되며, 이 상태는 Grok 파서의 파싱 규칙 중 하나가 샘플과 일치하는지 여부를 강조 표시합니다.

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

[Datadog 로그 파이프라인 API 엔드포인트][1]를 다음 Grok 파서 JSON 페이로드와 함께 사용하세요.

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<SUPPORT_RULES>", "match_rules": "<MATCH_RULES>"}
}
```

| 파라미터            | 유형             | 필수 | 설명                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | 문자열           | Yes      | 프로세서 유형입니다.                                  |
| `name`               | 문자열           | No       | 프로세서 이름입니다.                                  |
| `is_enabled`         | Boolean          | No       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다.  |
| `source`             | 문자열           | Yes      | 파싱할 로그 속성 이름입니다. 기본값은 `message`입니다. |
| `samples`            | 문자열 배열 | No       | 이 Grok 파서에 대한 최대 5개의 샘플 로그 목록입니다.     |
| `grok.support_rules` | 문자열           | Yes      | Grok 파서의 지원 규칙 목록입니다.             |
| `grok.match_rules`   | 문자열           | Yes      | Grok 파서에 대한 일치 규칙 목록입니다.               |


[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 로그 날짜 재매핑기

Datadog는 로그를 수신하면 이러한 기본 속성 값을 사용하여 타임스탬프를 생성합니다.

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

로그에 목록에 없는 속성의 날짜가 있는 경우 로그 날짜 재매핑기 프로세서를 사용해 날짜 속성을 공식 로그 타미스탬프로 정의할 수 있습니다.

<div class="alert alert-info">
인식되는 날짜 형식은 다음과 같습니다: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (밀리초 EPOCH 형식)</a>, <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

로그에 위에 나와 있는 형식에 맞는 타임스탬프가 없는 경우 Grok 프로세서를 사용해 타임스탬프에서 새 속상까지의 시간을 추출할 수 있습니다. 날짜 재매핑기는 새로 정의된 속성을 사용합니다.

Datadog에서 사용자 정의 날짜 및 시간 형식을 파싱하는 방법을 보려면 [날짜 파싱][3]을 참조하세요.

**참고**:

* 로그 이벤트는 과거에 대해 18시간, 미래에 대해 2시간까지 제출 가능합니다.
* ISO 8601-1:2019 기준으로 기본 형식은 `T[hh][mm][ss]`이고 확장 형식은 `T[hh]:[mm]:[ss]`입니다. 이전 버전에서는 두 형식 모두에서 T(시간을 나타냄)가 생략되었습니다.
* 로그에 기본 속성이 전혀 포함되어 있지 않고 자체적인 날짜 속성을 정의하지 않은 경우 Datadog 타임스탬프는 수신한 날짜를 기록합니다.
* 파이프라인 내에 주어진 로그에 적용되는 로그 날짜 재매핑기 프로세서가 여러 개인 경우, 마지막 프로세서(파이프라인의 순서 기준)가 고려됩니다.

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 로그 날짜 재매핑기 프로세서를 정의합니다.

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="날짜 속성 정의" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="로그 탐색기 패널의 날짜와 시간" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 로그 날짜 재매핑기 JSON 페이로그를 포함하는 [Datadog 로그 파이프라인 API 엔드포인트][1] 사용:

```json
{
  "type": "date-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official Date of the log",
  "is_enabled": false,
  "sources": ["<SOURCE_ATTRIBUTE_1>"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 문자열           | Yes      | 프로세서 유형입니다.                                |
| `name`       | 문자열           | 아니요       | 프로세서 이름입니다.                                |
| `is_enabled` | Boolean          | 아니요       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다. |
| `sources`    | 문자열 배열 | Yes      | 소스 속성 배열입니다.                           |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 로그 상태 재매핑기

상태 재매핑기 프로세서를 사용하여 로그의 공식 상태로 속성을 할당합니다. 예를 들어 상태 재매핑기를 통해 로그에 로그 심각도 수준을 추가합니다.

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="재매핑 후 로그 심각도" style="width:40%;" >}}

수신되는 각 상태 값은 다음과 같이 매핑됩니다.

* 0에서 7까지의 정수는 [시스로그 심각도 표준][4]에 매핑됩니다.
* **emerg** 또는 **f**(대소문자 구분 없음)로 시작하는 문자열은 **emerg (0)**로 매핑됩니다.
* 대소문자 구분 없이 **a**로 시작하는 문자열은 **알림(1)**으로 매핑됩니다.
* **c**로 시작하는 문자열(대소문자 구분 없음)은 **중요(2)**로 매핑됩니다.
* **err**로 시작하는 문자열(대소문자 구분 없음)은 **오류(3)**로 매핑됩니다.
* **w**로 시작하는 문자열(대소문자 구분 없음)은 **경고(4)**로 매핑됩니다.
* **n**(대소문자 구분)으로 시작하는 문자열은 **주의(5)**로 매핑됩니다.
* **i**로 시작하는 문자열(대소문자 구분 없음)은 **정보(6)**로 매핑됩니다.
* d**, **t**, **v**, **trace** 또는 **verbose**(대소문자 구분)로 시작하는 문자열은 **debug(7)**로 매핑됩니다.
* **o** 또는 **s**로 시작하거나 **OK** 또는 **성공**(대소문자 구분 없음)과 일치하는 문자열은 **OK**로 매핑됩니다.
* 나머지는 모두 **정보 (6)**에 매핑됩니다.

**참고**: 파이프라인 내의 로그에 적용되는 로그 상태 재매핑기 프로세서가 여러 개인 경우, 파이프라인 순서의 첫 번째 프로세서가 고려됩니다. 또한, 로그와 일치하는 모든 파이프라인에 대해 모든 해당 파이프라인에서 발생한 첫 번째 상태 재매핑기가 적용됩니다.

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 로그 상태 재매핑기 프로세서 정의:

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="로그 심각도 재매핑" style="width:60%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 로그 상태 재매핑기 JSON 페이로드를 사용해 [Datadog 로그 파이프라인 API 엔드포인트][1] 사용:

```json
{
  "type": "status-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official status of the log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 문자열           | Yes      | 프로세서 유형입니다.                                |
| `name`       | 문자열           | No       | 프로세서 이름입니다.                                |
| `is_enabled` | Boolean          | No       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다. |
| `sources`    | 문자열 배열 | Yes      | 소스 속성 배열입니다.                           |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 서비스 재매핑기

서비스 재매핑기 프로세서는 하나 이상의 속성을 공식 서비스로 로그에 할당합니다.

**참고**: 파이프라인 내에서 주어진 로그에 적용되는 서비스 재매핑기 프로세서가 여러 개인 경우 첫 번째(파이프라인 순서상) 프로세서가 고려됩니다.

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 로그 서비스 재매핑기 프로세서 정의:

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="서비스 재매핑기 프로세서" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 로그 서비스 재매핑기 JSON 페이로드를 포함하는 [Datadog 로그 파이프라인 API 엔드포인트][1] 사용:

```json
{
  "type": "service-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official log service",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 문자열           | Yes      | 프로세서 유형입니다.                                |
| `name`       | 문자열           | No       | 프로세서 이름입니다.                                |
| `is_enabled` | Boolean          | No       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다. |
| `sources`    | 문자열 배열 | Yes      | 소스 속성 배열입니다.                           |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 로그 메시지 재매핑기

`message`는 Datadog 핵심 속성입니다. 해당 값은 로그 탐색기의 **내용** 열에 표시되어 로그에 컨텍스트를 제공합니다. 검색 바를 사용하여 로그 메시지로 로그를 찾을 수 있습니다. 

로그 메시지 재매핑기 프로세서를 사용하여 하나 이상의 속성을 공식 로그 메시지로 정의합니다. 속성이 존재하지 않을 수 있고 대체 속성을 사용할 수 있는 경우, 둘 이상의 속성을 정의합니다. 예를 들어 정의된 메시지 속성이 `attribute1`, `attribute2`, `attribute3` 이고 `attribute1`이 존재하지 않는 경우 `attribute2`가 사용됩니다. 마찬가지로 `attribute2`가 존재하지 않으면 `attribute3`이 사용됩니다.

메시지 속성을 정의하려면 먼저 [문자열 작성기 프로세서](#string-builder-processor)를 사용하여 사용하려는 각 속성에 대해 새 문자열 속성을 만듭니다. 그런 다음 로그 메시지 재매핑기를 사용하여 문자열 속성을 메시지로 리매핑합니다.

**참고**: 파이프라인 내에서 주어진 로그에 대해 적용되는 로그 메시지 재매핑기 프로세서가 여러 개인 경우 첫 번째 프로세서(파이프라인 순서상)가 고려됩니다.

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 로그 메시지 재매핑기 프로세서 정의:

{{< img src="logs/log_configuration/processor/message_processor.png" alt="메시지 프로세서" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 로그 메시지 재매핑기 JSON 페이로드를 통해 [Datadog 로그 파이프라인 API 엔드포인트][1] 사용:

```json
{
  "type": "message-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official message of the log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 문자열           | Yes      | 프로세서 유형입니다.                                |
| `name`       | 문자열           | No       | 프로세서 이름입니다.                                |
| `is_enabled` | Boolean          | No       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다. |
| `sources`    | 문자열 배열 | Yes      | 소스 속성의 배열입니다. 기본값은 `msg`입니다.            |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 리매퍼

재매핑기 프로세서는 모든 소스 속성이나 태그를 또 다른 대상 속성이나 태그로 재매핑합니다. 예를 들어 `firstname`으로 `user`를 재매핑하면 로그 탐색기의 로그가 대상이 됩니다.

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="다시 매핑 후 속성" style="width:60%;">}}

태그.속성 이름에 대한 제약은 [속성 및 태그 설명서][5]에 설명되어 있습니다. `:` 또는 `,`에 적용되는 일부 추가 제약은 대상 태그/속성 이름에 허용되지 않습니다.

리매퍼의 대상이 속성인 경우 리매퍼는 값을 새 유형(`String`, `Integer`, `Double`)으로 캐스팅하려고 시도할 수도 있습니다. 캐스팅이 불가능하면 원래 유형이 유지됩니다.

**참고**: `Double`에 대한 소수점 구분 기호는 `.`이어야 합니다.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 리매퍼 프로세서를 정의합니다. 예를 들어 `user`를 `user.firstname`로 다시 매핑합니다.

{{< img src="logs/log_configuration/processor/remapper.png" alt="속성 리매퍼 프로세서" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 재매핑기 JSON 페이로드를 통한 [Datadog 로그 파이프라인 API 엔드포인트][1]을 사용:

```json
{
  "type": "attribute-remapper",
  "name": "Remap <SOURCE_ATTRIBUTE> to <TARGET_ATTRIBUTE>",
  "is_enabled": true,
  "source_type": "attribute",
  "sources": ["<SOURCE_ATTRIBUTE>"],
  "target": "<TARGET_ATTRIBUTE>",
  "target_type": "tag",
  "target_format": "integer",
  "preserve_source": false,
  "override_on_conflict": false
}
```

| 파라미터              | 유형             | 필수 | 설명                                                                    |
|------------------------|------------------|----------|--------------------------------------------------------------------------------|
| `type`                 | 문자열           | Yes      | 프로세서 유형입니다.                                                         |
| `name`                 | 문자열           | No      | 프로세서 이름입니다.                                                         |
| `is_enabled`           | Boolean          | No      | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다.                          |
| `source_type`          | 문자열           | No      | 소스가 로그 `attribute` 또는 `tag`인지 정의합니다. 기본값은  `attribute`입니다. |
| `sources`              | 문자열 배열 | Yes      | 소스 속성 또는 태그 배열                                             |
| `target`               | 문자열           | Yes      | 소스를 재매핑할 최종 속성 또는 태그 이름                            |
| `target_type`          | 문자열           | No      | 대상이 `attribute` 또는 `tag`인지 정의합니다. 기본값은 `attribute`입니다.    |
| `target_format`        | 문자열           | No      | 속성 값을 다른 유형으로 캐스트할지 여부를 정의합니다. 가능한 값은 `auto`, `string`, 또는 `integer`입니다. 기본값은 `auto`입니다. `auto`로 설정하면 캐스트가 적용되지 않습니다.  |
| `preserve_source`      | Boolean          | No      | 재매핑된 소스 요소를 제거하거나 보존합니다. 기본값은 `false`입니다.               |
| `override_on_conflict` | Boolean          | No      | 이미 설정된 경우 대상 요소를 재정의할지 여부를 결정합니다. 기본값은 `false`입니다.            |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## URL 파서

URL 파서 프로세서는 URL에서 쿼리 파라미터 및 기타 중요한 파라미터를 추출합니다. 설정 시 다음과 같은 속성이 생성됩니다.

{{< img src="logs/processing/processors/url_processor.png" alt="Url 프로세서" style="width:80%;" >}}

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 URL 파서 프로세서를 정의합니다.

{{< img src="logs/processing/processors/url_processor.png" alt="Url 프로세서 타일" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "url-parser",
  "name": "Parse the URL from http.url attribute.",
  "is_enabled": true,
  "sources": ["http.url"],
  "target": "http.url_details"
}
```

| 파라미터    | 유형             | 필수 | 설명                                                                                                          |
|--------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`       | 문자열           | Yes      | 프로세서 유형입니다.                                                                                               |
| `name`       | 문자열           | No       | 프로세서 이름입니다.                                                                                               |
| `is_enabled` | Boolean          | No       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다.                                                                |
| `sources`    | 문자열 배열 | No       | 소스 속성의 배열입니다. 기본값은 `http.url`입니다.                                                                      |
| `target`     | 문자열           | Yes      | `sources`에서 추출된 모든 세부 정보를 포함하는 상위 속성의 이름입니다. 기본값은 `http.url_details`입니다. |

{{% /tab %}}
{{< /tabs >}}

## 사용자-에이전트 파서

사용자-에이전트 파서 프로세서는 `useragent` 속성을 사용하여 OS, 브라우저, 디바이스 및 기타 사용자 데이터를 추출합니다. 설정이 완료되면 다음과 같은 속성이 생성됩니다.

{{< img src="logs/processing/processors/useragent_processor.png" alt="Useragent 프로세서" style="width:80%;">}}

**참고**: 로그에 인코딩된 user-agents(예: IIS 로그)가 포함된 경우, 이 프로세서가 URL을 **디코딩**한 후 파싱 처리합니다.

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 user-agent 프로세서를 정의합니다.

{{< img src="logs/log_configuration/processor/useragent_processor.png" alt="Useragent 프로세서 타일" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

[Datadog 로그 파이프라인 API 엔드포인트][1]를 다음 user-agent 파서 JSON 페이로드와 함께 사용합니다.

```json
{
  "type": "user-agent-parser",
  "name": "Parses <SOURCE_ATTRIBUTE> to extract all its User-Agent information",
  "is_enabled": true,
  "sources": ["http.useragent"],
  "target": "http.useragent_details",
  "is_encoded": false
}
```

| 파라미터    | 유형             | 필수 | 설명                                                                                                                 |
|--------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`       | 문자열           | Yes      | 프로세서 유형입니다.                                                                                                      |
| `name`       | 문자열           | No       | 프로세서 이름입니다.                                                                                                      |
| `is_enabled` | Boolean          | No       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다.                                                                      |
| `sources`    | 문자열 배열 | No       | 소스 속성의 배열입니다. 기본값은 `http.useragent`입니다.                                                                      |
| `target`     | 문자열           | Yes      | `sources`에서 추출된 모든 세부 정보를 포함하는 상위 속성의 이름입니다. 기본값은 `http.useragent_details`입니다. |
| `is_encoded` | Boolean          | No       | 소스 속성이 URL 인코딩인지 여부를 정의합니다. 기본값은 `false`입니다.                                                     |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 카테고리 프로세서

카테고리 프로세서를 사용하여 제공된 검색 쿼리와 일치하는 로그에 새 속성(새 속성 이름에 공백이나 특수 문자 제외)을 추가합니다. 그런 다음 카테고리를 사용하여 분석 보기를 위한 그룹을 만듭니다(예: URL 그룹, 머신 그룹, 환경, 응답 시간 버킷).

**참고**:

* 쿼리 구문은 [로그 탐색기][6] 검색 바에 있는 구문입니다. 이 쿼리는 패싯인지 여부에 관계없이 아무 로그 속성이나 태그에서 수행될 수 있습니다. 쿼리 내에서 와일드카드도 사용할 수 있습니다.
* 로그가 프로세서 쿼리 중 하나와 일치하면 중지됩니다. 로그가 여러 개의 쿼리와 일치할 수 있으므로, 쿼리 순서가 적절한지 확인하세요.
* 카테고리 이름은 고유해야 합니다.
* 카테고리 프로세서에서 정의하면 [로그 상태 재매핑기](#log-status-remapper)를 사용해 로그 상태에 범주를 매핑할 수 있습니다.

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 카테고리 프로세서를 정의합니다. 예를 들어 상태 코드 범위 값(`"OK" for a response code between 200 and 299, "Notice" for a response code between 300 and 399, ...`)을 기준으로 웹 액세스 로그를 분류하려면 이 프로세서를 추가합니다.

{{< img src="logs/log_configuration/processor/category_processor.png" alt="카테고리 프로세서" style="width:80%;" >}}

이 프로세서는 다음과 같은 결과를 생성합니다.

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="카테고리 프로세서 결과" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 카테고리 프로세서 JSON 페이로드를 통해 [Datadog 로그 파이프라인 API 엔드포인트][1]를 사용하세요.

```json
{
  "type": "category-processor",
  "name": "Assign a custom value to the <TARGET_ATTRIBUTE> attribute",
  "is_enabled": true,
  "categories": [
    {"filter": {"query": "<QUERY_1>"}, "name": "<VALUE_TO_ASSIGN_1>"},
    {"filter": {"query": "<QUERY_2>"}, "name": "<VALUE_TO_ASSIGN_2>"}
  ],
  "target": "<TARGET_ATTRIBUTE>"
}
```

| 파라미터    | 유형            | 필수 | 설명                                                                                                |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | 문자열          | Yes      | 프로세서 유형입니다.                                                                                     |
| `name`       | 문자열          | No       | 프로세서 이름입니다.                                                                                     |
| `is_enabled` | Boolean         | No       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다.                                                      |
| `categories` | 객체 배열 | Yes      | 로그 및 해당 `name`과 일치하거나 일치하지 않는 필터의 배열로 커스텀 값을 로그에 할당합니다. |
| `target`     | 문자열          | Yes      | 일치하는 카테고리에 의해 정의된 값이 있는 대상 속성의 이름입니다.                              |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 산술 프로세서

산술 프로세서를 사용하여 제공된 수식의 결과를 사용하여 로그에 새 속성(새 속성 이름에 공백이나 특수 문자 제외)을 추가합니다. 이렇게 하면 단위가 다른 여러 시간 속성을 단일 속성으로 재매핑하거나 동일한 로그 내의 속성에 대한 연산을 계산할 수 있습니다.

산술 프로세서 공식은 괄호와 기본 산술 연산자를 사용할 수 있습니다(`-`, `+`, `*`, `/`).

기본적으로 속성이 누락되면 계산을 건너뜁니다. *Replace missing attribute by 0*을 선택하여 누락된 속성 값이 자동으로 0으로 계산되었는지 확인합니다.

**참고**:

* 속성을 로그 속성에서 찾을 수 없거나 숫자로 변환할 수 없는 경우 속성이 누락된 것으로 표시될 수 있습니다.
* `-` 연산자를 사용하는 경우, `start-time`과 같은 속성 이름에는 대시가 포함될 수 있으므로 주위에 공백을 추가합니다. 예를 들어 다음 공식은 `-` 연산자 주위에 공백을 포함해야 합니다. 예시: `(end-time - start-time) / 1000`.
* 대상 속성이 이미 존재하는 경우 수식 결과로 덮어쓰여집니다.
* 결과는 소수점 9번째 자리로 반올림됩니다. 예를 들어, 수식의 결과가 `0.1234567891`이면 속성에 대해 저장된 실제 값은 `0.123456789`입니다.
* 측정 단위의 크기를 조정해야 하는 경우 크기 조정 필터를 사용하세요.

{{< tabs >}}
{{% tab "UI" %}}

(**파이프라인** 페이지][1]에서 산술 프로세서를 정의합니다.

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="산술 프로세서" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 산술 프로세서 JSON 페이로드를 통해 [Datadog 로그 파이프라인 API 엔드포인트][1]를 사용하세요.

```json
{
  "type": "arithmetic-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "expression": "<ARITHMETIC_OPERATION>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": false
}
```

| 파라미터            | 유형    | 필수 | 설명                                                                                                                                  |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | 문자열  | Yes      | 프로세서 유형입니다.                                                                                                                       |
| `name`               | 문자열  | No       | 프로세서 이름입니다.                                                                                                                       |
| `is_enabled`         | Boolean | No       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다.                                                                                       |
| `expression`         | 문자열  | Yes      | 하나 이상의 로그 속성 간의 산술 연산입니다.                                                                                     |
| `target`             | 문자열  | Yes      | 산술 연산 결과가 포함된 속성의 이름입니다.                                                                  |
| `is_replace_missing` | Boolean | No       | `true`는 `expression`의 모든 누락된 속성을 0으로 대체하고, `false` 속성이 누락된 경우 연산을 건너뜁니다. 기본값은 `false`입니다. |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 문자열 빌더 프로세서

문자열 빌더 프로세서를 사용하여 제공된 템플릿의 결과로 로그에 새 속성(공백이나 특수 문자 제외)을 추가합니다. 이렇게 하면 여러 속성 또는 원시 문자열을 단일 속성으로 집계할 수 있습니다.

템플릿은 원시 텍스트와 `%{attribute_path}` 구문이 포함된 블록으로 정의됩니다.

**참고**:

* 이 프로세서는 블록에 값 또는 값 배열이 있는 속성만 허용합니다(아래 UI 섹션의 예 참조).
* 속성을 사용할 수 없는 경우(개체 또는 개체 배열) 빈 문자열로 대체되거나 선택 항목에 따라 전체 작업을 건너뜁니다.
* 대상 속성이 이미 존재하는 경우 템플릿 결과로 덮어쓰여집니다.
* 템플릿 결과는 256자를 초과할 수 없습니다.

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 문자열 빌더 프로세서를 정의합니다.

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="문자열 빌더 프로세서" style="width:80%;">}}

다음 로그와 함께 `Request %{http.method} %{http.url} was answered with response %{http.status_code}` 템플릿을 사용하여 결과를 반환합니다. 예시:


```json
{
  "http": {
    "method": "GET",
    "status_code": 200,
    "url": "https://app.datadoghq.com/users"
  },
  "array_ids": [123, 456, 789],
  "array_users": [
    {"first_name": "John", "last_name": "Doe"},
    {"first_name": "Jack", "last_name": "London"}
  ]
}
```

다음을 반환합니다.

```text
Request GET https://app.datadoghq.com/users was answered with response 200
```

**참고**: `http`는 객체이므로 블록에 사용할 수 없지만(`%{http}` 실패), `%{http.method}`, `%{http.status_code}` 또는 `%{http.url}`은 해당 값을 반환합니다. 블록은 값 배열 또는 배열 내의 특정 속성에 사용할 수 있습니다. 

* 예를 들어 `%{array_ids}` 블록을 추가하면 반환됩니다.

   ```text
   123,456,789
   ```

* `%{array_users}`는 객체의 목록이므로 아무 것도 반환하지 않습니다. 그러나 `%{array_users.first_name}`은 배열에 포함된 `first_name`의 목록을 반환합니다.

  ```text
  John,Jack
  ```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 문자열 빌더 프로세서 JSON 페이로드를 통해 [Datadog 로그 파이프라인 API 엔드포인트][1]를 사용하세요.

```json
{
  "type": "string-builder-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "template": "<STRING_BUILDER_TEMPLATE>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": true
}
```

| 파라미터            | 유형    | 필수 | 설명                                                                                                                                       |
|----------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | 문자열  | Yes      | 프로세서 유형입니다.                                                                                                                            |
| `name`               | 문자열  | No       | 프로세서 이름입니다.                                                                                                                            |
| `is_enabled`         | Boolean | No       | 프로세서가 활성화되어 있는지 여부에 따라 기본값은 `false` 입니다.                                                                                          |
| `template`           | 문자열  | Yes      | 하나 이상의 속성과 원시 텍스트가 포함된 수식입니다.                                                                                               |
| `target`             | 문자열  | Yes      | 템플릿의 결과가 포함된 속성의 이름입니다.                                                                               |
| `is_replace_missing` | Boolean | No       | `true`인 경우 `template`의 모든 누락된 속성을 빈 문자열로 대체합니다. `false`이면 누락된 속성에 대한 연산을 건너뜁니다. 기본값은 `false`입니다. |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## GeoIP 파서

geoIP 파서는 IP 주소 속성을 가져와 대상 속성 경로에서 지역, 국가, 지방 또는 도시 정보(사용 가능한 경우)를 추출합니다.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="GeoIP 프로세서" style="width:80%;">}}

대부분의 요소에는 `name` 및 `iso_code`(또는 지역의 경우 `code`) 속성이 포함됩니다. `subdivision`은 미국의 경우 'States', 프랑스의 경우 'Departments'와 같이 국가가 사용하는 첫 번째 세분화 수준입니다.

예를 들어 geoIP 파서는 `network.client.ip` 속성에서 위치를 추출하여 `network.client.geoip` 속성에 저장합니다:

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="GeoIP 예시" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

다음 geoIP 파서 JSON 페이로드를 통해 [Datadog 로그 파이프라인 API 엔드포인트][1]를 사용하세요.

```json
{
  "type": "geo-ip-parser",
  "name": "Parse the geolocation elements from network.client.ip attribute.",
  "is_enabled": true,
  "sources": ["network.client.ip"],
  "target": "network.client.geoip"
}
```

| 파라미터    | 유형             | 필수 | 설명                                                                                                               |
|--------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `type`       | 문자열           | Yes      | 프로세서 유형입니다.                                                                                                    |
| `name`       | 문자열           | No       | 프로세서 이름입니다.                                                                                                    |
| `is_enabled` | Boolean          | No       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다.                                                                     |
| `sources`    | 문자열 배열 | No       | 소스 속성의 배열입니다. 기본값은 `network.client.ip`입니다.                                                                  |
| `target`     | 문자열           | Yes      | `sources`에서 추출된 모든 세부 정보를 포함하는 상위 속성의 이름입니다. 기본값은 `network.client.geoip`입니다.  |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 조회 프로세서

조회 프로세서를 사용해 로그 속성과 사람이 읽을 수 있는 값([참조 테이블][7] 또는 프로세서 매핑 테이블에 저장됨) 간의 매핑을 정의합니다.

예를 들어 조회 프로세서를 사용하여 내부 서비스 ID를 사람이 읽을 수 있는 서비스 이름으로 매핑할 수 있습니다. 또는 방금 프로덕션 환경에 연결을 시도한 MAC 주소가 도난당한 컴퓨터의 목록에 속하는 경우 점검할 수 있습니다.

{{< tabs >}}
{{% tab "UI" %}}

Lookup 프로세서는 다음 작업을 수행합니다:

* 현재 로그에 소스 속성이 포함되어 있는지 확인합니다.
* 소스 속성 값이 매핑 테이블에 존재하는지 확인합니다.
  * 그렇다면 테이블에 해당 값으로 대상 속성을 생성합니다.
  * 또는, 매핑 테이블에서 값을 찾을 수 없는 경우 `fallbackValue` 필드에 설정된 기본 대체 값을 사용하여 대상 속성을 생성합니다. `source_key,target_value` 쌍의 목록을 수동으로 입력하거나 **수동 매핑** 탭 에서 CSV 파일을 업로드할 수 있습니다. 

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="조회 프로세서" style="width:80%;">}}

    매핑 테이블의 크기 제한은 100Kb입니다. 이 제한은 플랫폼의 모든 조회 프로세서에 적용됩니다. 그러나 참조 테이블은 더 큰 파일 크기를 지원합니다.

  * 선택적으로 매핑 테이블에서 값을 찾지 못하면 참조 테이블의 값으로 대상 속성을 생성합니다. [참조 테이블][101]의 값은 **참조 테이블** 탭 에서 선택할 수 있습니다.

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="조회 프로세서" style="width:80%;">}}


[101]: /ko/integrations/guide/reference-tables/

{{% /tab %}}
{{% tab "API" %}}

다음 조회 프로세서 JSON 페이로드를 통해 [Datadog 로그 파이프라인 API 엔드포인트][1]를 사용하세요.

```json
{
  "type": "lookup-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "source": "<SOURCE_ATTRIBUTE>",
  "target": "<TARGET_ATTRIBUTE>",
  "lookup_table": ["key1,value1", "key2,value2"],
  "default_lookup": "<DEFAULT_TARGET_VALUE>"
}
```

| 파라미터        | 유형             | 필수 | 설명                                                                                                                                                              |
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | 문자열           | Yes      | 프로세서 유형입니다.                                                                                                                                                   |
| `name`           | 문자열           | No       | 프로세서 이름입니다.                                                                                                                                                   |
| `is_enabled`     | Boolean          | Yes      | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다.                                                                                                                     |
| `source`         | 문자열           | Yes      | 조회를 수행하는 데 사용되는 소스 속성입니다.                                                                                                                             |
| `target`         | 문자열           | Yes      | 매핑 목록에서 찾을 수 없는 경우 매핑 목록이나 `default_lookup`에서 해당 값을 포함하는 속성의 이름입니다.                                |
| `lookup_table`   | 문자열 배열 | Yes      | 소스 속성 값과 연결된 대상 속성 값의 매핑 테이블로, [ "source_key1,target_value1", "source_key2,target_value2" ] 형식으로 되어 있습니다. |
| `default_lookup` | 문자열           | No       | 소스 값을 목록에서 찾을 수 없는 경우 대상 속성을 설정하는 값입니다.                                                                                          |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 트레이스 재매핑기

애플리케이션 간의 상관 관계를 정의하는 방법에는 트레이스와 로그 두 가지가 있습니다.

1. [애플리케이션 로그에 트레이스 ID를 삽입하는 방법][8]에 대한 설명서를 따르세요. 로그 통합 나머지 설정 단계는 기본적으로 모두 자동으로 처리됩니다.

2. 트레이스 재매핑기 프로세서를 사용하여 로그 속성을 관련 트레이스 ID로 정의합니다.

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 트레이스 재매핑기 프로세서를 정의합니다. 다음과 같이 프로세서 타일에서 트레이스 ID 속성 경로를 입력합니다.

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="트레이스 ID 프로세서" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 트레이스 재매핑기 JSON 페이로드를 통한 [Datadog 로그 파이프라인 API 엔드포인트][1] 사용:

```json
{
  "type": "trace-id-remapper",
  "name": "Define dd.trace_id as the official trace id associate to this log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | 문자열           | Yes      | 프로세서 유형입니다.                                 |
| `name`       | 문자열           | No       | 프로세서 이름입니다.                                 |
| `is_enabled` | Boolean          | No       | 프로세서가 활성화되어 있는지 여부입니다. 기본값은 `false`입니다. |
| `sources`    | 문자열 배열 | No       | 소스 속성의 배열입니다. 기본값은 `dd.trace_id`입니다.    |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**참고**: 트레이스 ID 및 스팬(span) ID는 UI의 로그 또는 로그 속성에 표시되지 않습니다.

## 스팬(span) 재매핑기

애플리케이션 스팬과 로그 사이의 상관 관계를 정의하는 방법에는 두 가지가 있습니다.

1. 애플리케이션에 [스팬 ID를 삽입하는 방법 로그][8]에 대한 설명서를 따르세요. 로그 통합 나머지 설정 단계는 기본적으로 모두 자동으로 처리됩니다.

2. 스팬 재매핑기 프로세서를 사용하여 로그 속성을 관련 스팬 ID로 정의합니다.

{{< tabs >}}
{{% tab "UI" %}}

[**파이프라인** 페이지][1]에서 스팬(span) 재매핑기 프로세서를 정의합니다. 프로세서 타일에 스팬 ID 속성 경로를 다음과 같이 입력합니다.

{{< img src="logs/log_configuration/processor/span_id_remapper.png" alt="스팬 ID 프로세서" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 스팬(span) 재매핑기 JSON 페이로드를 통해 [Datadog 로그 파이프라인 API 엔드포인트][1]를 사용하세요.

```json
{
  "type": "span-id-remapper",
  "name": "Define dd.span_id as the official span id associate to this log",
  "is_enabled": true,
  "sources": ["dd.span_id"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | 문자열           | Yes      | 프로세서 유형입니다.                                 |
| `name`       | 문자열           | No       | 프로세서 이름입니다.                                 |
| `is_enabled` | Boolean          | No       | 프로세서가 활성화되어 있는지 여부를 나타냅니다. 기본값은 `false`입니다. |
| `sources`    | 문자열 배열 | No       | 소스 속성의 배열입니다. 기본값은 `dd.trace_id`입니다.    |

[1]: /ko/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**참고**: 트레이스 ID 및 스팬(span) ID는 UI의 로그 또는 로그 속성에 표시되지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/log_configuration/pipelines/
[2]: /ko/logs/log_configuration/parsing/
[3]: /ko/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[5]: /ko/logs/log_collection/?tab=host#attributes-and-tags
[6]: /ko/logs/search_syntax/
[7]: /ko/integrations/guide/reference-tables/
[8]: /ko/tracing/other_telemetry/connect_logs_and_traces/