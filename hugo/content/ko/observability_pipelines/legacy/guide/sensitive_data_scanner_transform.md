---
aliases:
- /ko/observability_pipelines/guide/sensitive_data_scanner_transform/
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/setup/
  tag: 설명서
  text: Observability Pipelines 설정
- link: /observability_pipelines/legacy/working_with_data/
  tag: 설명서
  text: 관측성 파이프라인에서 데이터 작업하기
is_beta: true
private: true
title: (레거시) Sensitive Data Scanner 변환
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfnNnV823zAgOCowCYuXJE5cDtRqIipKsYcNpaOo1LKpGfppA/viewform" btn_hidden="false" header="Request Access!">}}
<code>sensitive_data_scanner</code> 변환은 프라이빗 베타 버전입니다.
{{< /callout >}}

## 개요

신용카드 번호, 은행 라우팅 번호, API 키와 같은 민감한 데이터가 의도치 않게 로그에 노출될 수 있습니다. 이로 인해 조직은 금융 및 개인정보가 노출될 위험에 처할 수 있습니다. Observability Pipelines `sensitive_data_scanner` 변환을 이용하면 다른 대상으로 데이터를 라우팅하기 전에 민감한 정보를 식별하고 태그를 설정해 삭제하거나 해싱할 수 있습니다. 기본 제공 스캔 규칙으로 이메일 주소, 신용카드 번호, API 키, 인증 토큰 등과 같은 일반 패턴을 감지할 수 있습니다. 또는 정규식 패턴으로 커스텀 스캔 규칙을 생성하고 매칭을 통해 민감한 정보를 식별할 수 있습니다.

## `sensitive_data_scanner` 변환 설정하기

1. [Observability Pipelines][1]로 이동합니다.
1. 파이프라인을 클릭합니다.
1. **Edit as Draft**를 클릭합니다.
1. **+ Add Component**를 클릭합니다.
1. **Transforms** 탭을 선택합니다.
1. **Sensitive Data Scanner** 타일을 클릭합니다.
1. 구성 요소의 이름을 입력합니다.
1. 변환과 관련한 입력값을 하나 이상 선택합니다.
1. **Add a New Item**를 클릭해 데이터 내에서 민감한 정보로 매칭시킬 스캔 규칙을 추가합니다.
1. 규칙의 이름을 입력합니다.
1. **Define action on match** 섹션에서 일치하는 정보에 실행할 작업을 선택합니다. 삭제, 부분 삭제, 해싱은 모두 되돌릴 수 없는 작업입니다.
    - 정보를 삭제하는 경우, 일치하는 데이터를 대체할 텍스트를 지정하세요.
    - 정보를 부분적으로 삭제하는 경우, 삭제할 문자 수와 일치하는 데이터의 어느 부분을 삭제할지 지정합니다.
    - **참고**: 해싱을 선택하는 경우, 일치하는 UTF-8 바이트는 FarmHash의 64비트 지문으로 해시됩니다.
1. **Pattern** 섹션에서 다음을 실행합니다.
    - 커스텀 스캔 규칙을 생성하려면 다음을 따릅니다. 
        a. **type** 드롭다운 메뉴에서 **Custom**을 선택합니다.
        b. **Define regex** 필드에 데이터 점검을 위한 정규식 패턴을 입력합니다. 자세한 내용은 [커스텀 규칙에 정규식 사용](#using-regex-for-custom-rules)을 참조하세요.
    - 기본 제공 스캔 규칙을 사용하려면 다음을 따릅니다.
        a. **type** 드롭다운 메뉴에서 **Library**를 선택합니다.
        b. **Name** 드롭다운 메뉴에서 사용하려는 스캔 규칙을 선택합니다.
1. **Scan entire event or portion of it** 섹션에서 다음을 수행합니다.
    a. **Target** 드롭다운 메뉴에서 **Entire Event** 또는 **Specific Attributes** 중에서 스캔할 항목을 선택합니다.
    - 전체 이벤트를 스캔하는 경우 특정 속성을 스캔 대상에서 선택적으로 제외할 수 있습니다.
    - 특정 속성을 스캔하는 경우 스캔할 속성을 지정합니다.
1. (선택 사항) 일치하는 이벤트와 연결할 하나 이상의 태그를 추가합니다.
1. 다른 규칙을 추가하려면 **Add a New Item**을 클릭한 후 10~14단계에 따릅니다.
1. **Save**을 클릭합니다.

**참고**: 추가하거나 업데이트하는 규칙은 해당 규칙이 정의된 이후 Observability Pipelines에 유입되는 데이터에만 영향을 미칩니다.

### 커스텀 규칙에 정규식 사용

`sensitive_data_scanner` 변환은 Perl 호환 RegEx (PCRE2)를 지원하지만 다음 패턴을 지원하지 않습니다.
  - 역참조 및 하위 표현식 캡처(lookaround)
  - 임의의 너비 0 어서션
  - 하위 루틴 참조 및 재귀 패턴
  - 조건부 패턴
  - 역추적 컨트롤 동사
  - \C "single-byte" 지시문(UTF-8 시퀀스 중단)
  - \R 새로운 행 매칭
  - \K 매칭 시작 재설정 지시문
  - 콜아웃 및 내장 코드
  - 원자 그룹화 및 소유 한정사

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines