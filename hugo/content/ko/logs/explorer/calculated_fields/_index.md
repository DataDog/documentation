---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/ai-powered-log-parsing
  tag: 블로그
  text: AI 기반 로그 구문 분석으로 조사 가속화
- link: /logs/explorer/calculated_fields/formulas
  tag: 설명서
  text: 계산된 필드 수식
- link: /logs/explorer/calculated_fields/extractions
  tag: 설명서
  text: 추출 Grok 구문 분석
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색기
- link: https://www.datadoghq.com/blog/calculated-fields-log-management-datadog/
  tag: 블로그
  text: 계산된 필드를 통해 쿼리 시점에 로그를 변환하고 보강하기
- link: https://learn.datadoghq.com/courses/enhance-log-querying
  tag: 학습 센터
  text: 참조 표, 하위 쿼리, 계산된 필드로 로그 쿼리 및 분석 강화하기
title: 계산된 필드
---
<div class="alert alert-info">구문, 연산자, 함수에 대해서는 <a href="/logs/explorer/calculated_fields/formulas">수식</a></div>을 참조하세요.

## 개요 {#overview}

계산된 필드를 통해 **쿼리 시점**에 로그 데이터를 변환하고 보강할 수 있습니다. 이 필드는 다른 [로그 속성][1]과 동일하게 작동하며 검색, 집계, 시각화 또는 계산된 필드를 추가적으로 정의하는 데 사용할 수 있습니다.

계산된 필드의 두 가지 유형은 **추출**과 **수식**입니다. 두 유형은 다음과 같은 속성을 공유합니다.

- 이 필드는**임시적**이며 로그 탐색기 세션이 종료되면 유지되지 않습니다.
- 이 필드는 **사용자가 지정한 범위**로 한정되며 본인에게만 표시됩니다.
- 이미 인덱싱된 로그에 적용할 수 있으므로 **소급 분석**에 가장 적합합니다.
- 쿼리, 집계 또는 다른 계산된 필드에서 사용할 때는 `#` 접두사를 통해 참조해야 합니다.
- 한 번에 최대 **5개**의 계산된 필드를 정의할 수 있습니다.

## 계산된 필드 사용 시점 {#when-to-use-calculated-fields}

다음과 같은 상황에서 계산된 필드를 사용하세요.

- 단기 조사나 분석을 위해 임시 필드가 필요한 경우
- 인덱싱된 로그를 소급하여 분석해야 하는 경우(파이프라인 변경 사항은 업데이트 이후 수집된 로그에만 영향을 미침)
- 로그 파이프라인을 신속하게 수정할 권한이나 전문 지식을 갖추지 않은 경우
- 빠른 탐색과 위험 부담이 적은 실험에 도움이 되도록, 본인에게만 표시되는 계산된 필드가 필요한 경우

계산된 필드가 장기적으로 유용하다고 판단되면 팀이 자동화된 처리의 이점을 누릴 수 있게 [로그 파이프라인][2]을 업데이트하세요.

## 계산된 필드 생성 {#create-a-calculated-field}

로그 탐색기의 {{< ui >}}Add{{< /ui >}} 메뉴 또는 특정 로그 이벤트나 속성 내에서 두 가지 진입점을 통해 계산된 필드를 생성할 수 있습니다.

### 추가 메뉴에서 다음을 수행합니다. {#from-the-add-menu}

1. [Log Explorer][5]로 이동합니다.
1. 검색창 옆에 있는 {{< ui >}}Add{{< /ui >}} 버튼을 클릭합니다.
1. {{< ui >}}Calculated field{{< /ui >}}를 선택합니다.

이는 로그의 구조와 내용을 이미 잘 파악하고 있으며, 수식이나 구문 분석 규칙을 빠르게 정의하려는 경우에 유용합니다.

### 특정 로그 이벤트 또는 속성에서 다음을 수행합니다. {#from-a-specific-log-event-or-attribute}

1. [Log Explorer][5]로 이동합니다.
1. 로그 이벤트를 클릭하여 측면 패널을 엽니다.
1. JSON 속성을 선택하여 컨텍스트 메뉴를 엽니다.
1. {{< ui >}}Create calculated from...{{< /ui >}}을 선택합니다.

{{< img src="/logs/explorer/calculated_fields/add_calculated_field_side_panel.png" alt="로그 탐색기의 로그 측면 패널에서 계산된 필드 생성하기" style="width:70%;" >}}

이 방식은 구문 분석 규칙을 빌드하는 데 필요한 구체적인 로그 샘플을 제공하므로 추출에 유용합니다.

## 계산된 필드 유형{#types-of-calculated-fields}

### 수식 {#formula}

수식 필드는 계산된 필드 수식을 사용하여 기존 속성을 바탕으로 새 값을 계산합니다. 여기서는 다음을 수행할 수 있습니다.
- 텍스트 값을 조작합니다.
- 숫자 속성에 대해 산술 연산을 수행합니다.
- 조건부 논리를 평가합니다.

예를 들면 다음과 같습니다.

```
#latency_gap = @client_latency - @server_latency
```

지원되는 구문, 연산자, 함수의 전체 목록은 [수식][3]을 참조하세요.

### 추출 {#extraction}

추출은 Grok 패턴 또는 정규식 패턴을 사용하여 원시 로그 메시지나 속성에서 값을 캡처합니다. Tap to Parse를 사용하여 둘 중 하나를 자동으로 생성하거나, 자체 Grok 패턴 또는 정규식을 수동으로 정의할 수 있습니다. 추출을 통해 다음을 수행합니다.
- 원시 로그 메시지에서 값을 캡처합니다.
- 파이프라인을 편집하지 않고 이미 인덱싱된 로그에서 소급하여 속성을 추출합니다.
- 샘플 로그를 대상으로 테스트를 실시합니다.

예를 들어, 메시지의 처음 세 단어를 별개의 필드로 추출할 수 있습니다.

```
%{word:first} %{word:second} %{word:third}
```

추출 규칙은 세션의 모든 로그에 대해 전반적으로 평가됩니다. 자세한 내용과 구문 예시는 [추출][4]을 참조하세요.

## 계산된 필드 사용 {#using-calculated-fields}

계산된 필드를 생성하면 로그 탐색기가 즉시 업데이트되어 새 데이터가 나타나고 상호 작용할 수 있는 도구가 제공됩니다. 계산된 필드는 로그 속성처럼 기능하며 검색, 집계, 시각화, 다른 계산된 필드 정의에 사용할 수 있습니다. 계산된 필드를 참조할 때는 항상 `#` 접두사를 사용하세요.

- **헤더 행**: 검색창 아래에 새 행이 나타나며, 현재 활성화된 모든 계산된 필드가 표시됩니다. 마우스를 올려 전체 정의를 확인하거나 빠른 작업으로 필드를 편집, 필터링, 그룹화합니다.
- **목록 시각화**: [목록][6] 뷰에서 계산된 필드 열이 자동으로 추가됩니다.
- **로그 측면 패널**: 로그 검사 시 계산된 필드는 전용 섹션으로 그룹화됩니다.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Log Explorer에서 결과를 필터링하는 데 사용된 request_duration이라는 계산된 필드" style="width:100%;" >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/attributes_naming_convention/
[2]: /ko/logs/log_configuration/pipelines/?tab=source
[3]: /ko/logs/explorer/calculated_fields/formulas/
[4]: /ko/logs/explorer/calculated_fields/extractions
[5]: https://app.datadoghq.com/logs
[6]: /ko/logs/explorer/visualize/#lists