---
disable_toc: false
further_reading:
- link: /logs/explorer/calculated_fields/expression_language
  tag: 문서
  text: 계산된 필드 표현식 언어
- link: /logs/explorer/
  tag: 문서
  text: 로그 탐색기
- link: https://www.datadoghq.com/blog/calculated-fields-log-management-datadog/
  tag: 블로그
  text: 쿼리 시점에 계산된 필드를 활용해 로그를 변환하고 분석 정보를 강화하세요
title: 계산된 필드
---


<div class="alert alert-info">구문, 연산자, 함수에 관해서는 <a href="/logs/explorer/calculated_fields/expression_language">표현식 언어</a>를 참고하세요</div>

## 개요

쿼리가 실행될 때 계산된 필드를 사용하여 로그 데이터를 변환하고 확장하세요. [수식](#formula)을 정의하여 다음 작업을 할 수 있습니다.
- [텍스트 조작][1]
- [산술 연산][2]
- [조건 로직 평가][3]

계산된 필드는 정의되면 [로그 속성][5]처럼 검색, 집계, 시각화에 사용할 수 있으며 다른 계산된 필드도 정의할 수 있습니다.

**참고**:
- 한 번에 최대 5개의 계산된 필드를 정의할 수 있습니다.
- 계산된 필드는 일시적이며, 지정된 Log Explorer 세션 이후에는 유지되지 않습니다. 계산된 필드가 반복적으로 유용할 수 있는 경우, 로그 수집 및 처리 시 [로그 파이프라인][6]을 업데이트하여 로그 정보를 인코딩합니다.

## 계산된 필드 생성

Log Explorer에서 계산된 필드를 생성하려면 두 가지 진입점이 있습니다. **Add** 메뉴나 특정 로그 이벤트 또는 속성 내에서 진입할 수 있습니다.
### 계산된 필드 시작점 선택

#### Add 메뉴에서

1. [Log Explorer][7]로 이동합니다.
1. 검색창 옆에 있는 **Add** 버튼을 클릭합니다.
1. **Calculated field**를 선택합니다.

이미 원하는 로그의 구조와 내용에 익숙하면 이 방법으로 계산된 필드를 빠르게 만들 수 있습니다.

#### 특정 로그 이벤트 또는 속성에서

1. [Log Explorer][7]로 이동합니다.
1. 원하는 로그 이벤트를 클릭하면 사이드 패널이 열립니다.
1. 특정 JSON 속성을 클릭하면 상황에 맞는 메뉴가 열립니다.
1. **Create calculated from...**을 선택합니다.


{{< img src="logs/explorer/calculated_fields/create_field.png" alt="계산된 필드 생성 옵션이 있는 로그 패널 기간 속성" style="width:80%;" >}}

이 방식을 사용하면 조사 중에 빠르게 적응할 수 있고, 익숙하지 않은 로그를 탐색할 수 있습니다. 예를 들어, 그래프를 단순화하거나 특정 질문에 답하기 위해 두 값을 곱하거나 연결하여 결과를 단일 필드에 저장할 수 있습니다.

### 계산된 필드 정의

{{< img src="logs/explorer/calculated_fields/define_a_calculated_field.png" alt="처리량을 위한 계산된 필드로, firstName과 lastName 속성을 연결하는 수식 사용" style="width:70%;" >}}

#### 이름

계산된 필드의 목적을 명확하게 설명하는 이름을 설정하세요. 예를 들어, 사용자의 성과 이름을 하나의 필드로 통합하는 것이 목표라면 계산된 필드의 이름을 `fullName`으로 지정할 수 있습니다.

이름이 `Pinkie Smith`인 사용자의 로그를 필터링하려면 쿼리에 계산된 필드 이름 `#fullName:"Pinkie Smith"`을 포함합니다. **참고:** 검색, 집계, 기타 계산된 필드 정의에서 계산된 필드를 참조하려면 `#` 접두사를 사용해야 합니다.

#### 수식

수식(또는 표현식)은 각 로그 이벤트에 대해 계산되어 계산된 필드 값으로 저장될 결과를 결정합니다. 유효한 구성에는 로그 속성, 기타 계산된 필드, 지원되는 함수 및 연산자 집합이 포함됩니다. 수식을 작성하거나 편집할 때 관련 필드, 함수, 연산자가 자동으로 제안됩니다.

사용 가능한 함수 및 연산자는 [계산된 필드 표현식 언어][4]를 참고하세요.

## 계산된 필드 사용

계산된 필드가 성공적으로 생성되면,  Log Explorer가 다음과 같이 업데이트됩니다.
- 활성 계산된 필드가 검색창 바로 아래의 새 행에 표시됩니다.
    - 필드에 커서를 놓으면 정의가 표시되고 빠른 작업을 사용하여 필드를 편집, 필터링, 그룹화할 수 있습니다.
- **[List][8]** 시각화에 계산된 필드의 열을 포함합니다. 제목에 # 접두사가 포함됩니다.
- 로그 사이드 패널 내부의 별도 섹션에 계산된 필드를 표시합니다.

계산된 필드는 로그 속성처럼 작동하며 검색, 집계, 시각화, 다른 계산된 필드 정의에 사용할 수 있습니다. 계산된 필드 이름을 참조할 때는 `#` 접두사를 사용해야 합니다.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="로그 탐색기에서 결과 필터링에 사용되는 계산된 필드인 request_duration" style="width:100%;" >}}

### 사용 사례

계산된 필드는 로그 수집 시 파싱, 정규화, 확장을 수행하는 로그 파이프라인이나 프로세서를 대체하지 않습니다. 계산된 필드는 다음 시나리오에서 사용됩니다.

- 장기적으로 재사용할 필요가 없는 필드의 일회성 조사나 임시 분석을 해야 할 때.
- 특정 질문에 대답하기 위해 이미 인덱싱된 로그를 소급해서 업데이트해야 할 때(파이프라인 변경 사항은 파이프라인 업데이트 후 수집된 로그에만 적용됨).
- 적절한 시기에 로그 파이프라인을 수정할 수 있는 권한(또는 지식)이 부족할 때.
  - 사용자가 만든 계산된 필드는 사용자만 볼 수 있으므로 빠르게 탐색하고 자유롭게 실험할 수 있습니다.

계산된 필드가 장기적으로 유용하다고 판단되면, 자동 처리 기능을 모든 팀원이 활용할 수 있도록 로그 파이프라인을 업데이트하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/calculated_fields/expression_language/#string
[2]: /ko/logs/explorer/calculated_fields/expression_language/#arithmetic
[3]: /ko/logs/explorer/calculated_fields/expression_language/#logical
[4]: /ko/logs/explorer/calculated_fields/expression_language/
[5]: /ko/logs/log_configuration/attributes_naming_convention/
[6]: /ko/logs/log_configuration/pipelines/?tab=source
[7]: https://app.datadoghq.com/logs
[8]: /ko/logs/explorer/visualize/#lists