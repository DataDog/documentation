---
description: 로그 탐색기에서 Grok 패턴을 사용하여 쿼리 시 로그에서 값을 추출하세요.
further_reading:
- link: /logs/explorer/calculated_fields/
  tag: 설명서
  text: 계산된 필드에 대해 자세히 알아보세요.
title: 추출
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSffBg9ph2zl-jTGzvgBUcXSifOjvPdRh8vJjzTMIclSB2ZLIw/viewform" btn_hidden="false" header="계산된 필드 추출은 미리 보기 상태입니다">}}
계산된 필드 추출을 사용하여 로그 탐색기에서 Grok 패턴을 사용해 쿼리 시 로그에서 값을 추출하세요.
{{< /callout >}}

## 개요 {#overview}

계산된 필드 추출을 사용하면 로그 탐색기에서 쿼리 시 Grok 구문 분석 규칙을 적용할 수 있으므로 파이프라인을 수정하거나 데이터를 다시 수집하지 않고도 원시 로그 메시지나 속성에서 값을 추출할 수 있습니다. AI 기반 구문 분석으로 추출 규칙을 자동으로 생성하거나, 특정 요구 사항에 맞게 직접 Grok 패턴을 정의할 수 있습니다.

추출 계산된 필드를 만들려면 [계산된 필드 만들기][1]를 참조하세요.

## 자동 구문 분석 {#automatic-parsing}

AI 기반 자동 구문 분석을 사용하여 로그 데이터에서 Grok 규칙을 생성할 수 있습니다. Datadog은 로그 메시지의 내용을 분석하여 추출 규칙을 자동으로 생성하므로 Grok 패턴을 수동으로 작성할 필요가 없습니다.

{{< img src="/logs/explorer/calculated_fields/extractions/calculated_fields_parse_ai.png" alt="Datadog 계산된 필드에서 AI 기반 Grok 구문 분석 예시" style="width:100%;" >}}

로그 측면 패널에서 자동 구문 분석에 액세스하는 방법은 두 가지가 있습니다.

1. 복사 버튼 옆에 있는 {{< ui >}}AI{{< /ui >}} 버튼<i class="icon-bits-ai"></i>을 클릭하세요.
2. 로그 메시지의 특정 부분을 강조 표시하고 팝업 메뉴에서 {{< ui >}}AI{{< /ui >}} 버튼<i class="icon-bits-ai"></i>을 클릭하세요.

{{< ui >}}AI{{< /ui >}} 버튼을 클릭하면 Datadog이 계산된 필드 양식을 자동으로 채웁니다.

1. {{< ui >}}Extract from{{< /ui >}}: 기본값은 전체 로그 메시지입니다. 드롭다운을 변경하여 개별 속성을 대신 구문 분석할 수 있습니다.
2. {{< ui >}}Log sample{{< /ui >}}: 선택한 로그로 자동 채워집니다.
3. {{< ui >}}Parsing rule{{< /ui >}}: 로그 샘플에서 자동으로 생성됩니다.

필요에 따라 생성된 규칙을 검토하고 수정하세요. 수동으로 편집하거나 {{< ui >}}Generate a new rule{{< /ui >}}을 클릭하여 Datadog이 다시 시도하도록 할 수 있습니다. 로그 샘플을 수정, 삽입 또는 교체하여 다양한 로그 형식에 대해 규칙을 테스트할 수도 있습니다.

<div class="alert alert-tip">'좋아요' 또는 '싫어요' 버튼을 사용하여 인라인 피드백을 제공하고 기능 개선에 기여하세요.</div>

## 구문 {#syntax}

추출 필드는 Grok 패턴을 사용하여 로그 속성에서 값을 식별하고 캡처합니다. Grok 패턴은 다음 형식의 하나 이상의 토큰으로 구성됩니다.

```
%{PATTERN_NAME:field_name}
```
- `PATTERN_NAME`: Grok 매처.
- `field_name`: 추출된 계산 필드의 이름.

여러 패턴을 함께 연결하여 복잡한 로그 메시지를 구문 분석할 수 있습니다.

## 쿼리 시간에 지원되는 매처 및 필터 {#supported-matchers-and-filters-at-query-time}

<div class="alert alert-warning"><em>query-time</em>(<a href="/logs/explorer/calculated_fields/">로그 탐색기</a>에서)에 사용 가능한 Grok 구문 분석 기능은 매처(<strong>data</strong>, <strong>integer</strong>, <strong>notSpace</strong>, <strong>number</strong>, <strong>word</strong>) 및 필터(<strong>number</strong> 및 <strong>integer</strong>)의 제한된 하위 집합을 지원합니다. 장기적인 구문 분석이 필요한 경우 로그 파이프라인을 정의하세요.</div>

로그 탐색기의 쿼리 시간 Grok 구문 분석은 제한된 하위 집합의 매처와 필터를 지원합니다. 각 매처 또는 필터는 다음 형식의 Grok 패턴에 사용됩니다.

```
%{MATCHER:field_name}
```

### 매처 {#matchers}

| 매처 | Grok 패턴 예시 |
| ------- | -------------------- |
| `data`<br>_문자의 임의 시퀀스(non-greedy)_ | `status=%{data:status}` |
| `word`<br>_영숫자_ | `country=%{word:country}` |
| `number`<br>_부동 소수점 숫자_ | `value=%{number:float_val}` |
| `integer`<br>_정수 값_ | `count=%{integer:count}` |
| `notSpace`<br>_공백이 아닌 문자_ | `path=%{notSpace:request_path}` |

### 필터 {#filters}
필터를 적용하여 추출된 값을 숫자 유형으로 변환합니다. 필터는 매처와 동일한 패턴 구문을 사용합니다.

| 필터 | Grok 패턴 예시|
| ------ | -------------------- |
| `number`<br>_숫자 문자열을 숫자로 구문 분석_ | `latency=%{number:lat}` |
| `integer`<br>_숫자 문자열을 정수로 구문 분석_ | `users=%{integer:user_count}` |

### 예시 {#example}
이 기능을 사용하여 수집 파이프라인을 수정하지 않고도 로그 필드를 온디맨드로 분석할 수 있습니다.
**로그 라인**:

```
country=Brazil duration=123ms path=/index.html status=200 OK
```

**추출 Grok 규칙**:

```
country=%{word:country} duration=%{integer:duration} path=%{notSpace:request_path} status=%{data:status}
```
**결과 계산된 필드**:
- `#country = Brazil`
- `#duration = 123`
- `#request_path = /index.html`
- `#status = 200 OK`

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/calculated_fields/#create-a-calculated-field