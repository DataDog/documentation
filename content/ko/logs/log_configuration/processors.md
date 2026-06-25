---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /ko/logs/processing/processors/
description: Grok 프로세서를 사용하여 로그 구문 분석
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentation
  text: Datadog Pipelines 살펴보기
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging without Limits*
- link: /logs/explorer/
  tag: Documentation
  text: 로그 탐색 방법 알아보기
- link: https://www.youtube.com/watch?v=OztSU3JzfC8&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=4&t=245s
  tag: Video
  text: '팁 및 요령: 리테일 엔드포인트에서 로그에 비즈니스 데이터 추가'
title: 프로세서
---
## 개요

<div class="alert alert-info">이 설명서에 개괄적으로 소개된 프로세서는 클라우드 기반 로깅 환경에 국한합니다. 온프레미스 로그를 구문 분석, 구조화, 강화하려면 <a href="https://docs.datadoghq.com/observability_pipelines/processors/">Observability Pipelines</a>를 참조하세요.</div>

프로세서는 [파이프라인][1] 내에서 실행되어 데이터 구조화 액션을 완료하고, 로그를 강화할 특성을 생성합니다.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="프로세서" style="width:100%" >}}

[로그 구성 설정][1]에서 [Grok 파서](#grokparser) 또는 [날짜 리매퍼](#remapper)와 같은 프로세서를 구성하여 로그를 강화하고 패싯 검색을 향상할 특성을 추출, 생성, 리매핑할 수 있습니다.

**참고**:

 구조화된 로그는 유효한 형식으로 전송되어야 합니다. 구조에 구문 분석할 수 없는 잘못된 문자가 포함된 경우, [mask_sequences][2] 기능을 사용해 Agent 수준에서 삭제해야 합니다.

 파이프라인당 최대 20개의 프로세서를 사용하는 것이 모범 사례로 권장됩니다.

## Grok 파서

원시 이벤트의 전체 메시지 또는 특정 특성을 구문 분석할 사용자 지정 grok 규칙을 생성합니다. grok 파서의 구문 분석 규칙은 10개로 제한하는 것이 모범 사례입니다. Grok 구문 및 구문 분석 규칙에 관한 자세한 정보는 [구문 분석][10]을 참조하세요.

{{< img src="/logs/processing/processors/define_parsing_rules_syntax_suggestions.png" alt="UI의 Grok 파서 구문 제안" style="width:90%;" >}}

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 Grok 프로세서를 정의합니다. Grok 구문 분석 규칙을 구성하는 방법:

1. **내 로그 구문 분석**을 클릭하여 파이프라인을 통과해 흐르는 로그에 따라 3가지 구문 분석 규칙 세트를 자동으로 생성합니다.
   **참고**: 이 기능을 사용하려면 상응하는 로그가 인덱싱되고 활발하게 유입되는 상태여야 합니다. 해당 기능이 로그를 감지하도록 허용하려면 일시적으로 제외 필터를 비활성화하거나 다운샘플링할 수 있습니다.
1. **로그 샘플**: 최대 5개의 샘플 로그(각각 최대 5,000자)를 추가해 구문 분석 규칙을 테스트합니다.
1. **구문 분석 규칙 정의**: 규칙 편집기에서 구문 분석 규칙을 작성합니다. 규칙을 정의하면 Grok 파서가 구문 지원을 제공합니다.
    **매처 제안**: 규칙 이름에 `%{`를 붙여 입력합니다. 이용 가능한 매처가 포함된 드롭다운이 표시됩니다(예: `word`, `integer`, `ip`, `date`). 목록에서 매처를 하나 선택해 규칙에 삽입합니다.<br>
     ```
     MyParsingRule %{
     ```
    **필터 제안**: `:`이 있는 필터를 추가하면 드롭다운에 선택한 매처와 호환되는 필터가 표시됩니다.
1. **규칙 테스트**: 샘플을 클릭해 선택하면 구문 분석 규칙을 기준으로 그 샘플의 평가가 트리거되고, 결과가 화면 맨 아래에 표시됩니다. 모든 샘플에 상태가 표시되며(`match` 또는 `no match`), 이를 통해 grok 파서의 구문 분석 중 하나가 샘플과 일치하는지 아닌지 강조 표시됩니다.

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 Grok 파서 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

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
|||||
| `type`               | 문자열           | 예      | 프로세서의 유형입니다.                                  |
| `name`               | 문자열           | 아니요       | 프로세서의 이름입니다.                                  |
| `is_enabled`         | 부울          | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`.  |
| `source`             | 문자열           | 예      | 구문 분석할 로그 특성의 이름입니다. 기본값: `message`. |
| `samples`            | 문자열 배열 | 아니요       | 이 grok 파서의 샘플 로그(최대 5개) 목록입니다.     |
| `grok.support_rules` | 문자열           | 예      | grok 파서의 지원 규칙 목록입니다.             |
| `grok.match_rules`   | 문자열           | 예      | grok 파서의 매칭 규칙 목록입니다.               |


[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 로그 날짜 리매퍼

Datadog는 로그를 수신하면서 다음 기본 특성 중 하나에서 가져온 값을 사용해 로그에 타임스탬프를 설정합니다.

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

로그에 이 목록에 없는 특성에 날짜가 있는 경우, 로그 날짜 리매퍼 프로세서를 사용해 해당 날짜 특성을 공식 로그 타임스탬프로 정의:

<div class="alert alert-info">
인식된 날짜 형식은 <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX(밀리초 EPOCH 형식)</a> 및 <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>입니다.
</div>

로그에 위의 목록에 나열된 형식을 준수하는 타임스탬프가 없는 경우, grok 프로세서를 사용해 타임스탬프에서 epoch 시간을 새 특성으로 추출합니다. 날짜 리매퍼는 새로 정의된 특성을 사용합니다.

Datadog에서 사용자 지정 날짜 및 시간 형식이 어떻게 구문 분석되는지 보려면 [날짜 구문 분석][3]을 참조하세요.

**참고**:

* 로그 이벤트는 최대 과거 18시간, 미래 2시간까지 제출할 수 있습니다.
* ISO 86011:2019 기준으로, 기본 형식은 `T[hh][mm][ss]`이며 확장된 형식은 `T[hh]:[mm]:[ss]`입니다. 이전 버전에서는 두 형식 모두에서 T(시간을 나타냄)를 생략했습니다.
* 로그에 기본 특성이 포함되어 있지 않고 사용자가 자체적인 날짜 특성을 정의하지 않은 경우, Datadog은 해당 로그를 수신한 날짜로 타임스탬프를 설정합니다.
* 파이프라인 안의 주어진 로그 하나에 로그 날짜 리매퍼 프로세서가 여러 개 적용된 경우, 마지막 것(파이프라인 순서에 따라)만 고려합니다.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 로그 날짜 리매퍼 프로세서 정의:

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="날짜 특성 정의" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="Log Explorer 사이드 패널의 날짜 및 시간" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 로그 날짜 리매퍼 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

```json
{
  "type": "date-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official Date of the log",
  "is_enabled": false,
  "sources": ["<SOURCE_ATTRIBUTE_1>"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                           |
|||||
| `type`       | 문자열           | 예      | 프로세서의 유형입니다.                                |
| `name`       | 문자열           | 아니요       | 프로세서의 이름입니다.                                |
| `is_enabled` | 부울          | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`. |
| `sources`    | 문자열 배열 | 예      | 소스 특성의 배열입니다.                           |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 로그 상태 리매퍼

상태 리매퍼 프로세서를 사용해 특성을 로그에 공식 상태로 할당하세요. 예를 들어 상태 리매퍼를 사용해 로그에 로그 심각도 수준을 추가할 수 있습니다.

각각의 수신되는 상태 값은 다음과 같이 매핑됩니다.

* 0부터 7까지의 정수는 [Syslog 심각도 표준][4]에 매핑됨
* **emerg** 또는 **f**(대소문자 구분 안 함)로 시작하는 문자열은 **emerg (0)**로 매핑됨
* **a**(대소문자 구분 안 함)로 시작하는 문자열은 **alert (1)**로 매핑됨
* **c**(대소문자 구분 안 함)로 시작하는 문자열은 **critical (2)**로 매핑됨
* **err**(대소문자 구분 안 함)로 시작하는 문자열은 **error (3)**로 매핑됨
* **w**(대소문자 구분 안 함)로 시작하는 문자열은 **warning (4)**으로 매핑됨
* **n**(대소문자 구분 안 함)으로 시작하는 문자열은 **notice (5)**로 매핑됨
* **i**(대소문자 구분 안 함)로 시작하는 문자열은 **info (6)**로 매핑됨
* **d**, **t**, **v**, **trace** 또는 **verbose**(대소문자 구분 안 함)로 시작하는 문자열은 **debug (7)**로 매핑됨
* **o** 또는 **s**로 시작하거나 **OK** 또는 **Success**(대소문자 구분 안 함)와 일치하는 문자열은 **OK**로 매핑됨
* 다른 모든 항목은 **info (6)**로 매핑됨

**참고**: 한 파이프라인 내의 한 로그에 로그 상태 리매퍼 프로세서가 여러 개 적용된 경우, 해당 파이프라인에서 순서가 맨 처음인 것만 고려됩니다. 또한 로그와 일치하는 모든 파이프라인에 대해 처음 발견된 상태 리매퍼만(해당하는 모든 파이프라인 중에서) 적용됩니다.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 로그 상태 리매퍼 프로세서 정의:

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="로그 심각도 리매핑" style="width:60%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 로그 상태 리매퍼 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

```json
{
  "type": "status-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official status of the log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                           |
|||||
| `type`       | 문자열           | 예      | 프로세서의 유형입니다.                                |
| `name`       | 문자열           | 아니요       | 프로세서의 이름입니다.                                |
| `is_enabled` | 부울          | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`. |
| `sources`    | 문자열 배열 | 예      | 소스 특성의 배열입니다.                           |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 서비스 리매퍼

서비스 리매퍼 프로세서는 하나 이상의 특성을 로그에 공식 서비스로 할당합니다.

**참고**: 파이프라인 내의 주어진 로그 하나에 서비스 리매퍼 프로세서가 여러 개 적용된 경우, 첫 번째 것(파이프라인 순서에 따라)만 고려합니다.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 로그 서비스 리매퍼 프로세서 정의:

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="서비스 리매퍼 프로세서" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 로그 서비스 리매퍼 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

```json
{
  "type": "service-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official log service",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                           |
|||||
| `type`       | 문자열           | 예      | 프로세서의 유형입니다.                                |
| `name`       | 문자열           | 아니요       | 프로세서의 이름입니다.                                |
| `is_enabled` | 부울          | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`. |
| `sources`    | 문자열 배열 | 예      | 소스 특성의 배열입니다.                           |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 로그 메시지 리매퍼

`message`는 Datadog에서 주요 특성입니다. 이 특성의 값이 Log Explorer의 **내용** 열에 표시되어 로그의 컨텍스트를 제공합니다. 로그 메시지 기준으로 로그를 찾으려면 검색창을 사용하면 됩니다.

로그 메시지 리매퍼 프로세서를 사용해 하나 이상의 특성을 공식 로그 메시지로 정의합니다. 특성이 존재하지 않을 수 있고 대체 속성을 사용할 수 있는 경우에 대비하여 두 개 이상의 특성을 정의합니다. 예를 들어, 정의된 메시지 특성이 `attribute1`, `attribute2`, `attribute3`이고 `attribute1`이 존재하지 않으면 `attribute2`가 사용됩니다. 마찬가지로 `attribute2`가 존재하지 않으면 `attribute3`가 사용됩니다.

메시지 특성을 정의하려면, 먼저 [문자열 빌더 프로세서](#stringbuilderprocessor)를 사용하여 사용하고자 하는 각 특성에 새 문자열 특성을 생성합니다. 그런 다음, 로그 메시지 리매퍼를 사용해 해당 문자열 특성을 메시지로 리매핑합니다.

**참고**: 파이프라인 내의 주어진 로그 하나에 로그 메시지 리매퍼 프로세서가 여러 개 적용된 경우, 첫 번째 것(파이프라인 순서에 따라)만 고려합니다.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 로그 메시지 리매퍼 프로세서 정의:

{{< img src="logs/log_configuration/processor/message_processor.png" alt="메시지 프로세서" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 로그 메시지 리매퍼 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

```json
{
  "type": "message-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official message of the log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                           |
|||||
| `type`       | 문자열           | 예      | 프로세서의 유형입니다.                                |
| `name`       | 문자열           | 아니요       | 프로세서의 이름입니다.                                |
| `is_enabled` | 부울          | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`. |
| `sources`    | 문자열 배열 | 예      | 소스 특성의 배열입니다. 기본값: `msg`.            |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 리매퍼

리매퍼 프로세서는 하나 이상의 소스 특성 또는 태그를 서로 다른 대상 특성 또는 태그에 리매핑합니다. 예를 들어 `user` 특성을 `firstname`에 리매핑해 Log Explorer의 로그 데이터를 정규화할 수 있습니다.

리매퍼 대상이 특성인 경우, 프로세서는 값을 새 유형으로 변환하려 시도할 수도 있습니다(`String`, `Integer` 또는 `Double`). 변환이 실패하면 원래 값과 유형이 보존됩니다.

**참고**: `Double` 값의 소수점 구분 기호는 `.`여야 합니다.

### 명명 제약 조건

`:` 및 `,` 문자는 대상 특성 또는 태그 이름에 허용되지 않습니다. 또한 태그 및 특성 이름은 [특성 및 별칭][5]에 개괄된 규칙을 따라야 합니다.

### 예약 특성

리매퍼 프로세서 **를 사용해 Datadog 예약 특성**을 리매핑할 수 없습니다. 
 `host` 특성은 리매핑할 수 없습니다.
 다음 특성은 전용 리매퍼 프로세스가 필요하며 일반 리매퍼로 리매핑할 수 없습니다. 이런 특성을 리매핑하려면 대신 상응하는 전문 리매퍼 또는 프로세서를 사용하세요.
    `message`: 로그 메시지 리매퍼
    `service`: 서비스 리매퍼
    `status`: 로그 상태 리매퍼
    `date`: 로그 날짜 리매퍼
    `trace_id`: 트레이스 리매퍼
    `span_id`: 스팬 리매퍼

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 리매퍼 프로세서를 정의합니다. 예를 들어 `user`를 `user.firstname`으로 리매핑합니다.

{{< img src="logs/log_configuration/processor/remapper.png" alt="특성 리매퍼 프로세서" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 리매퍼 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

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
|||||
| `type`                 | 문자열           | 예      | 프로세서의 유형입니다.                                                         |
| `name`                 | 문자열           | 아니요      | 프로세서의 이름입니다.                                                         |
| `is_enabled`           | 부울          | 아니요      | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`.                          |
| `source_type`          | 문자열           | 아니요      | 소스가 로그 `attribute` 또는 `tag` 중 어디에서 유입되는지 정의합니다. 기본값: `attribute`. |
| `sources`              | 문자열 배열 | 예      | 소스 특성 또는 태그의 배열                                             |
| `target`               | 문자열           | 예      | 소스를 리매핑할 최종 특성 또는 태그 이름입니다.                           |
| `target_type`          | 문자열           | 아니요      | 대상이 로그 `attribute`인지 아니면 `tag`인지 정의합니다. 기본값: `attribute`.    |
| `target_format`        | 문자열           | 아니요      | 특성 값이 다른 유형으로 변환되어야 하는지 정의합니다. 가능한 값: `auto`, `string` 또는 `integer`. 기본값: `auto`. `auto`로 설정한 경우, 변환이 적용되지 않습니다.  |
| `preserve_source`      | 부울          | 아니요      | 리매핑된 소스 요소를 제거하거나 보존합니다. 기본값: `false`.               |
| `override_on_conflict` | 부울          | 아니요      | 대상 요소가 이미 설정된 경우, 해당 요소를 재정의할지 여부입니다. 기본값: `false`.            |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## URL 파서

URL 파서 프로세서는 URL에서 쿼리 파라미터 및 기타 중요한 파라미터를 추출합니다. 설정할 때 다음 특성이 생성됨:

{{< img src="logs/processing/processors/url_processor.png" alt="Url 프로세서" style="width:80%;" >}}

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 URL 파서 프로세서 정의:

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
|||||
| `type`       | 문자열           | 예      | 프로세서의 유형입니다.                                                                                               |
| `name`       | 문자열           | 아니요       | 프로세서의 이름입니다.                                                                                               |
| `is_enabled` | 부울          | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`.                                                                |
| `sources`    | 문자열 배열 | 아니요       | 소스 특성의 배열입니다. 기본값: `http.url`.                                                                      |
| `target`     | 문자열           | 예      | `sources`에서 추출한 세부 정보를 모두 포함하는 상위 특성의 이름입니다. 기본값: `http.url_details`. |

{{% /tab %}}
{{< /tabs >}}

## UserAgent 파서

useragent 파서 프로세서가 `useragent` 특성을 취해 OS, 브라우저, 장치 및 기타 사용자 데이터를 추출합니다. 설정할 때 다음 특성이 생성됨:

{{< img src="logs/processing/processors/useragent_processor.png" alt="Useragent 프로세서" style="width:80%;">}}

**참고**: 로그에 인코딩된 useragent가 포함된 경우(예를 들어 IIS 로그), 구문 분석하기 전에 이 프로세서가 **URL을 디코딩**하도록 구성하세요.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 useragent 프로세서 정의:

{{< img src="logs/log_configuration/processor/useragent_processor.png" alt="Useragent 프로세서 타일" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 useragent 파서 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

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
|||||
| `type`       | 문자열           | 예      | 프로세서의 유형입니다.                                                                                                      |
| `name`       | 문자열           | 아니요       | 프로세서의 이름입니다.                                                                                                      |
| `is_enabled` | 부울          | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`.                                                                      |
| `sources`    | 문자열 배열 | 아니요       | 소스 특성의 배열입니다. 기본값: `http.useragent`.                                                                      |
| `target`     | 문자열           | 예      | `sources`에서 추출한 세부 정보를 모두 포함하는 상위 특성의 이름입니다. 기본값: `http.useragent_details`. |
| `is_encoded` | 부울          | 아니요       | 소스 특성이 url 인코딩되는지 아닌지 정의합니다. 기본값: `false`.                                                     |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 카테고리 프로세서

카테고리 프로세서를 사용해 제공된 검색 쿼리와 일치하는 로그에 새 특성을 추가합니다(새 특성 이름에 공백 또는 특수 문자를 포함하면 안 됨). 그런 다음, 카테고리를 사용해 분석 조회에 사용할 그룹을 생성합니다(예: URL 그룹, 머신 그룹, 환경 및 응답 시간 버킷 등).

**참고**:

* 쿼리의 구문은 [Log Explorer][6] 검색창의 구문입니다. 이 쿼리는 패싯이든 아니든 관계없이 모든 로그 특성 또는 태그에서 수행할 수 있습니다. 쿼리 내에 와일드카드도 사용할 수 있습니다.
* 로그가 프로세서 쿼리 중 하나와 일치하면 중지됩니다. 로그가 쿼리 여러 개와 일치하는 경우에 대비해 적절한 순서를 지정해야 합니다.
* 카테고리의 이름은 고유해야 합니다.
* 카테고리 프로세서에서 정의되고 나면 [로그 상태 리매퍼](#logstatusremapper)를 사용해 카테고리를 로그 상태에 매핑할 수 있습니다.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 카테고리 프로세서를 정의합니다. 예를 들어 웹 액세스 로그를 상태 코드 범위 값에 따라 분류하려면(`응답 코드 200~299에는 "OK", 응답 코드 300~399에는 "Notice"...`) 이 프로세서를 추가합니다.

{{< img src="logs/log_configuration/processor/category_processor.png" alt="카테고리 프로세서" style="width:80%;" >}}

이 프로세서는 다음과 같은 결과를 생성합니다.

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="카테고리 프로세서 결과" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 카테고리 프로세서 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

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
|||||
| `type`       | 문자열          | 예      | 프로세서의 유형입니다.                                                                                     |
| `name`       | 문자열          | 아니요       | 프로세서의 이름입니다.                                                                                     |
| `is_enabled` | 부울         | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`                                                      |
| `categories` | 개체 배열 | 예      | 로그와 일치하거나 일치하지 않는 필터의 배열 및 로그에 사용자 지정 값을 할당하는 데 사용할 해당 `name`입니다. |
| `target`     | 문자열          | 예      | 일치하는 카테고리에 따라 값이 정의되는 대상 특성의 이름입니다.                              |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 산술 프로세서

산술 프로세서를 사용해 제공된 수식의 결과가 있는 로그에 새 특성을 추가합니다(새 특성 이름에 공백 또는 특수 문자를 포함하면 안 됨). 이렇게 하면 단위가 서로 다른 다양한 시간 특성을 하나의 특성으로 리매핑하거나, 같은 로그 내 특성에 대해 연산을 수행할 수 있습니다.

산술 프로세서 수식은 괄호 및 ``, `+`, `*`, `/` 등의 기본적인 산술 연산자를 사용할 수 있습니다.

기본적으로, 특성이 누락되면 계산을 건너뜁니다. *누락된 특성을 0으로 대체*를 선택하여 누락된 특성 값을 자동으로 0으로 채워 계산이 완료되도록 합니다.

**참고**:

* 특성을 로그 특성에서 찾을 수 없거나, 숫자로 변환할 수 없는 경우 해당 특성은 누락된 것으로 나열될 수 있습니다.
* 연산자 ``를 사용하는 경우, 그 주변에 공백을 추가하세요. `starttime`과 같은 특성 이름은 대시를 포함할 수 있기 때문입니다. 예를 들어 다음 수식에서는 `` 연산자 주변에 반드시 공백을 포함해야 합니다. `(endtime  starttime) / 1000`.
* 대상 특성이 이미 존재하는 경우, 수식의 결과로 덮어씌워집니다.
* 결과는 소수점 이하 9자리까지 반올림됩니다. 예를 들어 수식 결과가 `0.1234567891`인 경우, 실제로 특성에 대하여 저장되는 값은 `0.123456789`가 됩니다.
* 측정 단위의 크기를 조정해야 하는 경우, 크기 조정 필터를 사용하세요.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 산술 프로세서 정의:

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="산술 프로세서" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 산술 프로세서 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

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
|||||
| `type`               | 문자열  | 예      | 프로세서의 유형입니다.                                                                                                                       |
| `name`               | 문자열  | 아니요       | 프로세서의 이름입니다.                                                                                                                       |
| `is_enabled`         | 부울 | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`.                                                                                       |
| `expression`         | 문자열  | 예      | 하나 이상의 로그 특성 간 산술 연산입니다.                                                                                     |
| `target`             | 문자열  | 예      | 산술 연산의 결과를 포함하는 특성의 이름입니다.                                                                  |
| `is_replace_missing` | 부울 | 아니요       | `true`인 경우 `expression`의 누락된 특성을 모두 0으로 대체하고, `false`인 경우 특성이 누락되었으면 해당 연산을 건너뜁니다. 기본값: `false`. |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 문자열 빌더 프로세서

문자열 빌더 프로세서를 사용해 제공된 템플릿의 결과를 포함한 로그에 새 특성을 추가합니다(공백 또는 특수 문자 없이). 이렇게 하면 서로 다른 특성이나 원시 문자열을 특성 한 개로 집계할 수 있습니다.

템플릿은 원시 텍스트 및 `%{attribute_path}` 구문이 포함된 블록으로 정의됩니다.

**참고**:

* 이 프로세서는 블록에 값 또는 값 배열이 있는 특성만 허용합니다(아래 UI 섹션의 예 참조).
* 특성을 사용할 수 없는 경우(개체 또는 개체 배열) 사용자의 선택에 따라 빈 문자열로 대체되거나 연산 전체를 건너뜁니다.
* 대상 특성이 이미 존재하는 경우, 템플릿의 결과로 덮어씌워집니다.
* 템플릿의 결과는 256자를 초과할 수 없습니다.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 문자열 빌더 프로세서 정의:

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="문자열 빌더 프로세서" style="width:80%;">}}

다음 로그와 함께 템플릿 `Request %{http.method} %{http.url} was answered with response %{http.status_code}`를 사용하면 결과가 반환됩니다. 예:


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

다음을 반환함:

```text
Request GET https://app.datadoghq.com/users was answered with response 200
```

**참고**: `http`는 개체이며 블록에서 사용할 수 없지만(`%{http}`는 실패함), `%{http.method}`, `%{http.status_code}` 또는 `%{http.url}`은 상응하는 값을 반환합니다. 블록은 값 배열에서 또는 한 배열 내의 특정 특성에서 사용할 수 있습니다.

* 예를 들어 블록 `%{array_ids}`를 추가하면 다음을 반환합니다.

   ```text
   123,456,789
   ```

* `%{array_users}`는 개체 목록이기 때문에 아무것도 반환하지 않습니다. 하지만 `%{array_users.first_name}`은 배열에 포함된 `first_name` 목록을 반환합니다.

  ```text
  John,Jack
  ```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 문자열 빌더 프로세서 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

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
|||||
| `type`               | 문자열  | 예      | 프로세서의 유형입니다.                                                                                                                            |
| `name`               | 문자열  | 아니요       | 프로세서의 이름입니다.                                                                                                                            |
| `is_enabled`         | 부울 | 아니요       | 프로세서가 활성화되었는지 여부이며, 기본적으로 `false`로 설정됩니다.                                                                                          |
| `template`           | 문자열  | 예      | 하나 이상의 특성과 원시 텍스트가 있는 수식입니다.                                                                                               |
| `target`             | 문자열  | 예      | 템플릿의 결과를 포함하는 특성의 이름입니다.                                                                               |
| `is_replace_missing` | 부울 | 아니요       | `true`인 경우 `template`의 누락된 특성을 모두 빈 문자열로 대체합니다. `false`인 경우 누락된 특성의 연산을 건너뜁니다. 기본값: `false`. |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## GeoIP 파서

geoIP 파서는 IP 주소 특성을 취해 대상 특성 경로에서 대륙, 국가, 세부 구역 또는 도시 정보(사용 가능한 경우)를 추출합니다.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="GeoIP 프로세서" style="width:80%;">}}

대부분의 요소는 `name` 및 `iso_code`(또는 대륙의 경우 `code`) 특성을 포함합니다. `subdivision`은 국가가 사용하는 첫 번째 세부 구역 수준입니다. 예를 들어 미국은 "States", 프랑스는 "Departments"입니다.

예를 들어, geoIP 파서는 `network.client.ip` 특성에서 위치를 추출하여 이를 `network.client.geoip` 특성에 저장합니다.

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="GeoIP 예시" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

다음 geoIP 파서 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

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
|||||
| `type`       | 문자열           | 예      | 프로세서의 유형입니다.                                                                                                    |
| `name`       | 문자열           | 아니요       | 프로세서의 이름입니다.                                                                                                    |
| `is_enabled` | 부울          | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`.                                                                     |
| `sources`    | 문자열 배열 | 아니요       | 소스 특성의 배열입니다. 기본값: `network.client.ip`.                                                                  |
| `target`     | 문자열           | 예      | `sources`에서 추출한 세부 정보를 모두 포함하는 상위 특성의 이름입니다. 기본값: `network.client.geoip`.  |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 조회 프로세서

조회 프로세서를 사용해 로그 특성과 [참조 표][7] 또는 프로세서 매핑 표에 저장된 사람이 읽을 수 있는 값 사이의 매핑을 정의하세요.

예를 들어 조회 프로세서를 사용해 내부 서비스 ID를 사람이 읽을 수 있는 서비스 이름에 매핑할 수 있습니다. 또는 이것을 사용해 방금 프로덕션 환경에 연결하려 시도한 MAC 주소가 도난당한 컴퓨터 목록에 속하는지 검사할 수 있습니다.

{{< tabs >}}
{{% tab "UI" %}}

조회 프로세서는 다음 액션을 수행합니다.

* 현재 로그에 소스 특성이 포함되었는지 봅니다.
* 매핑 표에 소스 특성 값이 존재하는지 검사합니다.
  * 존재하는 경우, 표의 해당 값으로 대상 특성을 생성합니다.
  * 선택 사항으로, 매핑 표에서 값을 찾을 수 없는 경우 `fallbackValue` 필드에 설정된 기본 폴백 값으로 대상 특성을 생성합니다. 수동으로 `source_key,target_value` 쌍의 목록을 입력하거나, **수동 매핑** 탭에 CSV 파일을 업로드할 수 있습니다.

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="조회 프로세서" style="width:80%;">}}

    The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform. However, Reference Tables support larger file sizes.

  * 선택 사항으로, 매핑 표에서 값을 찾을 수 없는 경우 참조 표의 값으로 대상 특성을 생성합니다. **참조 표** 탭에서 [참조 표][101]의 값을 선택할 수 있습니다.

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="조회 프로세서"
    style="width:80%;">}}


[101]: /ko/integrations/guide/referencetables/

{{% /tab %}}
{{% tab "API" %}}

다음 조회 프로세서 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

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
|||||
| `type`           | 문자열           | 예      | 프로세서의 유형입니다.                                                                                                                                                   |
| `name`           | 문자열           | 아니요       | 프로세서의 이름입니다.                                                                                                                                                   |
| `is_enabled`     | 부울          | 예      | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`.                                                                                                                     |
| `source`         | 문자열           | 예      | 조회를 수행하는 데 사용된 소스 특성입니다.                                                                                                                             |
| `target`         | 문자열           | 예      | 매핑 목록에서 상응하는 값을 포함하는 특성의 이름이며, 매핑 목록에서 찾을 수 없는 경우 `default_lookup`입니다.                                |
| `lookup_table`   | 문자열 배열 | 예      | 소스 특성 및 그와 연결된 대상 특성 값의 값 매핑 표이며, [ "source_key1,target_value1", "source_key2,target_value2" ]와 같이 형식이 지정됩니다. |
| `default_lookup` | 문자열           | 아니요       | 소스 값을 목록에서 찾을 수 없는 경우 대상 특성을 설정하는 값입니다.                                                                                          |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 트레이스 리매퍼

애플리케이션 트레이스와 로그 간의 상관관계를 정의하는 방법은 두 가지입니다.

1. [애플리케이션 로그에 트레이스 ID를 삽입하는 방법][8] 설명서를 따르세요. 로그 통합은 기본적으로 나머지 모든 설정 단계를 자동으로 처리합니다.

2. 트레이스 리매퍼 프로세서를 사용해 로그 특성을 그와 연결된 트레이스 ID로 정의합니다.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 트레이스 리매퍼 프로세서를 정의합니다. 다음과 같이 프로세서 타일에 트레이스 ID 특성 경로를 입력합니다.

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="트레이스 ID 프로세서" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 트레이스 리매퍼 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

```json
{
  "type": "trace-id-remapper",
  "name": "Define dd.trace_id as the official trace id associate to this log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                            |
|||||
| `type`       | 문자열           | 예      | 프로세서의 유형입니다.                                 |
| `name`       | 문자열           | 아니요       | 프로세서의 이름입니다.                                 |
| `is_enabled` | 부울          | 아니요       | 프로세서가 활성화되었는지 아닌지입니다. 기본값: `false`. |
| `sources`    | 문자열 배열 | 아니요       | 소스 특성의 배열입니다. 기본값: `dd.trace_id`.    |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

**참고**: 트레이스 ID 및 스팬 ID는 UI의 로그나 로그 특성에 표시되지 않습니다.

## 스팬 리매퍼

애플리케이션 스팬과 로그 간의 상관관계를 정의하는 방법은 두 가지입니다.

1. [애플리케이션 로그에 스팬 ID를 삽입하는 방법][8] 설명서를 따르세요. 로그 통합은 기본적으로 나머지 모든 설정 단계를 자동으로 처리합니다.

2. 스팬 리매퍼 프로세서를 사용해 로그 특성을 그와 연결된 스팬 ID로 정의합니다.

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** 페이지][1]에서 스팬 리매퍼 프로세서를 정의합니다. 다음과 같이 프로세서 타일에 스팬 ID 특성 경로를 입력합니다.

{{< img src="logs/log_configuration/processor/span_id_remapper.png" alt="스팬 ID 프로세서" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

다음 스팬 리매퍼 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

```json
{
  "type": "span-id-remapper",
  "name": "Define dd.span_id as the official span id associate to this log",
  "is_enabled": true,
  "sources": ["dd.span_id"]
}
```

| 파라미터    | 유형             | 필수 | 설명                                            |
|||||
| `type`       | 문자열           | 예      | 프로세서의 유형입니다.                                 |
| `name`       | 문자열           | 아니요       | 프로세서의 이름입니다.                                 |
| `is_enabled` | 부울          | 아니요       | 프로세서가 활성화되었는지 나타냅니다. 기본값: `false`. |
| `sources`    | 문자열 배열 | 아니요       | 소스 특성의 배열입니다. 기본값: `dd.trace_id`.    |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

**참고**: 트레이스 ID 및 스팬 ID는 UI의 로그나 로그 특성에 표시되지 않습니다.

## 배열 프로세서

배열 프로세서를 사용해 로그 안의 JSON 배열에서 값을 추출, 집계 또는 변환합니다.

지원되는 작업의 예:

 **일치하는 요소에서 값 선택**
 **배열의 길이 계산**
 **배열에 값 추가**

각 작업은 전용 프로세서를 통해 구성됩니다.

[**Pipelines** 페이지][1]에서 배열 프로세서를 정의합니다.


### 일치하는 요소에서 값 선택

배열 내의 한 개체가 조건과 일치하면 해당 개체에서 특정 값을 추출합니다.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array_processor_select_value.png" alt="배열 프로세서  요소에서 값 선택" style="width:80%;" >}}

**예시 입력:**

```json
{
  "httpRequest": {
    "headers": [
      {"name": "Referrer", "value": "https://example.com"},
      {"name": "Accept", "value": "application/json"}
    ]
  }
}
```

**구성 단계:**

 **배열 경로**: `httpRequest.headers`
 **조건**: `name:Referrer`
 **다음의 값 추출**: `value`
 **대상 특성**: `referrer`

**결과:**

```json
{
  "httpRequest": {
    "headers": [...]
  },
  "referrer": "https://example.com"
}
```

{{% /tab %}}
{{% tab "API" %}}

다음 배열 프로세서 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

```json
{
  "type": "array-processor",
  "name": "Extract Referrer URL",
  "is_enabled": true,
  "operation" : {
    "type" : "select",
    "source": "httpRequest.headers",
    "target": "referrer",
    "filter": "name:Referrer",
    "value_to_extract": "value"
  }
}
```

| 파라미터    | 유형             | 필수 | 설명                                                   |
|||||
| `type`       | 문자열           | 예      | 프로세서의 유형입니다.                                        |
| `name`       | 문자열           | 아니요       | 프로세서의 이름입니다.                                        |
| `is_enabled` | 부울          | 아니요       | 프로세서가 활성화되어 있는지입니다. 기본값: `false`.        |
| `operation.type`  | 문자열      | 예      | 배열 프로세서 작업의 유형입니다.                            |
| `operation.source`  | 문자열    | 예      | 선택하고자 하는 배열의 경로입니다.                    |
| `operation.target`  | 문자열    | 예      | 대상 특성입니다.                                             |
| `operation.filter`  | 문자열    | 예      | 배열 요소를 매칭할 표현식입니다. 첫 번째 일치하는 요소가 선택됩니다. |
| `operation.value_to_extract`  | 문자열 | 예 | 선택한 요소에서 읽을 특성입니다.                  |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

### 배열 길이

배열의 요소 수를 계산합니다.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array_processor_length.png" alt="배열 프로세서  길이" style="width:80%;" >}}

**예시 입력:**

```json
{
  "tags": ["prod", "internal", "critical"]
}
```

**구성 단계:**

 **배열 특성**: `tags`
 **대상 특성**: `tagCount`

**결과:**

```json
{
  "tags": ["prod", "internal", "critical"],
  "tagCount": 3
}
```
{{% /tab %}}
{{% tab "API" %}}

다음 배열 프로세서 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

```json
{
  "type": "array-processor",
  "name": "Compute number of tags",
  "is_enabled": true,
  "operation" : {
    "type" : "length",
    "source": "tags",
    "target": "tagCount"
  }
}
```

| 파라미터           | 유형      | 필수 | 설명                                                   |
|||||
| `type`              | 문자열    | 예      | 프로세서의 유형입니다.                                        |
| `name`              | 문자열    | 아니요       | 프로세서의 이름입니다.                                        |
| `is_enabled`        | 부울   | 아니요       | 프로세서가 활성화되어 있는지입니다. 기본값: `false`.        |
| `operation.type`    | 문자열    | 예      | 배열 프로세서 작업의 유형입니다.                            |
| `operation.source`  | 문자열    | 예      | 길이를 추출할 배열의 경로입니다.                   |
| `operation.target`  | 문자열    | 예      | 대상 특성입니다.                                             |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

### 배열에 추가

로그의 대상 배열 특성 끝에 특성 값을 추가합니다.

**참고**: 로그에 대상 배열 특성이 존재하지 않으면 자동으로 생성됩니다.


{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array_processor_append.png" alt="배열 프로세서  추가" style="width:80%;" >}}

**예시 입력:**

```json
{
  "network": {
    "client": {
      "ip": "198.51.100.23"
    }
  },
  "sourceIps": ["203.0.113.1"]
}

```
**구성 단계:**

 **추가할 특성**: `"network.client.ip"`
 **추가할 대상 배열 특성**: `sourceIps`

**결과:**

```json
{
  "network": {
    "client": {
      "ip": "198.51.100.23"
    }
  },
  "sourceIps": ["203.0.113.1", "198.51.100.23"]
}
```
{{% /tab %}}
{{% tab "API" %}}

다음 배열 프로세서 JSON 페이로드와 함께 [Datadog Log Pipeline API 엔드포인트][1] 사용:

```json
{
  "type": "array-processor",
  "name": "Append client IP to sourceIps",
  "is_enabled": true,
  "operation" : {
    "type" : "append",
    "source": "network.client.ip",
    "target": "sourceIps"
  }
}
```

| 파라미터                    | 유형       | 필수 | 설명                                                        |
|||||
| `type`                       | 문자열     | 예      | 프로세서의 유형입니다.                                             |
| `name`                       | 문자열     | 아니요       | 프로세서의 이름입니다.                                             |
| `is_enabled`                 | 부울    | 아니요       | 프로세서가 활성화되어 있는지입니다. 기본값: `false`.             |
| `operation.type`             | 문자열     | 예      | 배열 프로세서 작업의 유형입니다.                                 |
| `operation.source`           | 문자열     | 예      | 추가할 특성입니다.                                               |
| `operation.target`           | 문자열     | 예      | 추가할 대상 배열 특성입니다.                                      |
| `operation.preserve_source`  | 부울    | 아니요      | 리매핑 이후 원래 소스를 보존할지입니다. 기본값: `false`.   |

[1]: /ko/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## 디코더 프로세서

디코더 프로세서가 binarytotext 인코딩된 문자열 필드(예: Base64 또는 Hex/Base16)를 원래 모양으로 변환합니다. 이렇게 하면 데이터를 UTF8 문자열, ASCII 명령 또는 숫자 값 등 무엇이든 네이티브 컨텍스트로 해석할 수 있습니다(예를 들어 16진수 문자열에서 파생된 정수). 디코더 프로세서는 특히 인코딩된 명령, 특정 시스템의 로그 또는 위협 행위자가 사용한 회피 기법을 분석하는 데 유용합니다.

**참고**:

 잘린 문자열: 프로세서가 필요에 따라 트리밍 또는 패딩을 통해 부분적으로 잘린 Base64/Base16 문자열을 정상적으로 처리합니다.

 16진수 형식: 16진수 입력은 문자열(UTF8) 또는 정수로 디코딩될 수 있습니다.

 실패 처리: (잘못된 입력 때문에) 디코딩이 실패하면 프로세서가 변환을 건너뛰고 로그는 변경 없이 유지됨

{{< tabs >}}
{{% tab "UI" %}}

1. 소스 특성 설정: 인코딩된 문자열(예: `encoded.base64`)을 포함하는 특성 경로를 제공하세요.
2. 소스 인코딩 선택: 소스의 binarytotext 인코딩 선택: `base64` 또는 `base16/hex`.
2. `Base16/Hex`의 경우: 출력 형식 선택: `string (UTF8)` 또는 `integer`.
3. 대상 특성 설정: 디코딩된 결과를 저장할 특성 경로를 입력하세요.

{{< img src="logs/log_configuration/processor/decoder-processor.png" alt="디코더 프로세서  추가" style="width:80%;" >}}

{{% /tab %}}
{{< /tabs >}}

## 위협 인텔리전스 프로세서

위협 인텔리전스 프로세서를 추가하여 특정 침해 지표(IoC) 키(예: IP 주소)를 사용해 로그를 표와 대조하여 평가합니다. 일치하는 항목을 찾으면 표의 관련 위협 인텔리전스(TI) 특성으로 로그가 강화되고, 그러면 탐지, 조사 및 대응이 강화됩니다.

자세한 정보는 [위협 인텔리전스][9]를 참조하세요.

## OCSF 프로세서

OCSF 프로세서를 사용해 [Open Cybersecurity Schema Framework (OCSF)][11]에 따라 보안 로그를 정규화합니다. OCSF 프로세서를 사용하면 사용자 지정 매핑을 생성해 로그 특성을 OCSF 스키마 클래스 및 그와 상응하는 특성(열거형(ENUM) 특성 포함)에 리매핑할 수 있습니다.

이 프로세서를 사용하여 할 수 있는 작업:

 소스 로그 특성을 OCSF 대상 특성에 매핑
 특정 숫자 값을 사용해 ENUM 특성 구성
 다양한 OCSF 대상 이벤트 클래스에 대하여 하위 파이프라인 생성
 OCSF 리매핑 전에 로그 사전 처리

자세한 설정 지침, 구성 예시 및 문제 해결 지침은 [OCSF 프로세서][12]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/log_configuration/pipelines/
[2]: /ko/agent/logs/advanced_log_collection/?tab=configurationfile#scrubsensitivedatafromyourlogs
[3]: /ko/logs/log_configuration/parsing/?tab=matchers#parsingdates
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[5]: /ko/logs/log_configuration/attributes_naming_convention/
[6]: /ko/logs/search_syntax/
[7]: /ko/integrations/guide/referencetables/
[8]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[9]: /ko/security/threat_intelligence/
[10]: /ko/logs/log_configuration/parsing/?tab=matchers
[11]: /ko/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[12]: /ko/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor/