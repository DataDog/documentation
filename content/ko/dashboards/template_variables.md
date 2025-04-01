---
aliases:
- /ko/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
- /ko/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
- /ko/graphing/dashboards/template_variables/
further_reading:
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: 블로그
  text: 관련된 템플릿 변수를 사용해 대시보드 정리하기
- link: https://www.datadoghq.com/blog/dynamic-template-variable-syntax-dashboards/
  tag: 블로그
  text: 동적 템플릿 변수 구문으로 대시보드 워크플로우 속도 향상
- link: https://www.datadoghq.com/blog/template-variable-available-values/
  tag: 블로그
  text: 템플릿 변수 사용 가능 값으로 대시보드를 더 빠르게 필터링
- link: /dashboards/
  tag: 설명서
  text: Datadog에서 대시보드 생성
- link: /dashboards/sharing/
  tag: 설명서
  text: Datadog 외부에서 그래프 공유
- link: /dashboards/widgets/
  tag: 설명서
  text: 대시보드용 위젯 살펴보기
title: 템플릿 변수
---

## 개요

템플릿 변수를 사용하면 대시보드에 있는 여러 위젯을 역동적으로 필터링할 수 있습니다. 템플릿 변수 선택 항목에서 저장된 뷰를 구축해 드롭다운 선택 항목으로 시각 자료를 탐색하고 정리할 수 있습니다.

템플릿 변수는 다음에 의해 정의됩니다.

* **태그 또는 속성**:
    * 태그: 권장되는 [태깅 형식][1](`<KEY>:<VALUE>`)을 따르는 경우 *태그*는 `<KEY>`입니다.
    * 속성: [패싯 또는 메트릭을 템플릿 변수로]  사용합니다(#logs-apm-and-rum-queries).
* **이름**: 대시보드의 쿼리에 표시되는 템플릿 변수의 고유한 이름입니다. 템플릿 변수는 선택한 태그 또는 속성에 따라 자동으로 이름이 지정됩니다.
* **기본값**: 대시보드가 로드될 때 자동으로 나타나는 태그 또는 속성값입니다. 기본값은 `*`입니다.
* **사용 가능 값**: 드롭다운 메뉴에서 선택할 수 있는 태그 또는 속성 값입니다. 기본값은 `(all)`입니다. 사용 가능 값 목록에는 항상 태그 또는 속성의 모든 값을 쿼리하는 `*`가 포함됩니다.

## 템플릿 변수 추가

대시보드에서 템플릿 변수를 추가하는 방법:
1. **Add Variables**를 클릭합니다. 
1. 템플릿 변수가 이미 정의된 경우, 대시보드 헤더에 마우스 커서를 올리고 **Edit** 버튼을 누르고 편집 모드를 입력합니다.
1. 편집 모드에서 **+(플러스)** 아이콘을 클릭해 새 템플릿 변수를 생성합니다.
1. (선택) 태그를 선택한 후 **+ Configure Dropdown Values** 버튼을 클릭해 변수 이름을 다시 지정하고 기본값 또는 사용 가능한 값을 설정합니다.
  {{< img src="dashboards/template_variables/add_template_variable_configure_dropdown_values.png" alt="구성 드롭다운 값 버튼을 나타내는 변수 팝오버 추가" style="width:80%;" >}}

## 템플릿 변수 편집

대시보드에서 템플릿 변수를 편집하는 방법:
1. 대시보드 헤더에서 **Edit** 버튼을 클릭합니다.
1. 편집 모드에서 템플릿 변수를 클릭하고 팝오버에서 필요한 사항을 변경합니다.
1. 헤더에서 변수를 재정렬하려면 변수에 마우스 커서를 올리고 아이콘 핸들을 클릭하여 드래그합니다.
  {{< img src="dashboards/template_variables/edit_template_variable_drag.png" alt="순서를 재정렬할 수 있는 드래그 아이콘이 있는 템플릿 변수 편집 모드 팝오버" style="width:100%;" >}}

## 위젯에 템플릿 변수 적용

위젯 쿼리에 템플릿 변수를 추가하는 방법:
1. 대시보드 헤더에서 **Edit** 버튼을 클릭합니다.
1. 편집 모드에서 템플릿 변수를 클릭해 팝오버를 엽니다.
1. **Select Widgets**을 클릭해 위젯 선택 모드를 엽니다.
1. 배너에 변수를 사용한 여러 소스가 나타납니다. 아래 예시의 경우, 템플릿 변수 `env`가 대시보드의 그래프 20개에 사용 중입니다.
  {{< img src="dashboards/template_variables/apply_template_variable_to_widgets.png" alt="'env' 템플릿 변수가 20개 위젯에 적용된 것을 보여주는 대시보드 예시" style="width:100%;" >}}
1. 개별 위젯을 클릭하면 템플릿 변수가 선으로 연결된 그래프를 미리 볼 수 있습니다.
1. 그룹에 있는 모든 위젯을 추가하거나 제거하려면 그룹 우측 코너에 있는 체크 박스를 토글합니다.
1. 대시보드에 있는 모든 위젯을 추가하거나 제거하려면 선택 배너에서 **Select All** 또는 **Deselect All**을 클릭합니다.
1. 배너에서 **Save** 또는 **X*를 클릭해 위젯 항목 모드에서 나갈 수 있습니다.

## 저장된 페이지

### 생성

대시보드 템플릿 변수 좌측에 있는 **Saved Views** 드롭다운 메뉴를 클릭합니다. 템플릿 변수 값을 업데이트해도 값이 자동으로 보기를 저장하지 않습니다.

{{< img src="dashboards/template_variables/saved_views_dropdown_options.png" alt="저장된 보기 드롭다운 옵션. 선택한 템플릿 변수를 기본값 보기 또는 저장된 보기를 설정할 수 있음" style="width:90%;" >}}

보기에서 현재 템플릿 변수 값을 저장하려면 **Saved Views** 드롭다운 메뉴에서 **Save selections as view**를 선택합니다. 고유 이름을 입력하고 **Save**를 선택합니다.

저장된 보기가 드롭다운 메뉴에 나타납니다. 보기를 클릭해 이전 저장된 템플릿 변수 값을 가져올 수 있습니다.

### 삭제

보기를 삭제하려면 저장된 보기 드롭다운 메뉴를 클릭하고 **Manage views...**를 선택합니다. 여기에서 각 보기 옆에 휴지통 아이콘과 저장된 보기가 포함된 팝업이 표시됩니다. 해당 휴지통 아이콘을 클릭하여 보기를 삭제합니다.

### 수정

 **Default view** 보기를 수정하려면 연필 아이콘을 클릭하고 템플릿 변수 값을 업데이트합니다. 그런 다음 **Done**을 클릭하여 저장합니다. 다른 보기의 값이 변경되면 해당 값을 새 보기로 저장한 다음 원래 보기를 삭제하세요. 

## 사용량

템플릿 변수는 위젯 및 이벤트 오버레이에서 사용됩니다.

### 로그, APM 및 RUM 쿼리

메트릭, 로그, APM, RUM의 경우 동일한 태그를 공유하기 때문에 템플릿 변수는 이들과 작동합니다. 또한 패싯을 기반으로 로그, APM, RUM 템플릿 변수를 정의할 수 있습니다. 이러한 변수는 `@`으로 시작합니다(예: `@http.status_code`).

로그, APM 및 RUM 위젯에서 값 중간에 와일드카드를 사용하거나(예: `eng*@example.com`), 하나의 값에 여러 와일드카드를 사용할 수 있습니다(예: `*prod*`).

**참고**: 이 유형의 템플릿 변수에 대해 **Add to all**를 사용하면 변수가 모든 로그, APM 및 RUM 위젯에 추가됩니다.

### 위젯

위젯을 생성하거나 편집할 때 기존 템플릿 변수는 `from` 필드에 옵션으로 표시됩니다. 예를 들어, 템플릿 변수 `environment`를 구성하면 `$environment` 옵션을 위젯의 역동적인 변수로 사용할 수 있습니다.

{{< img src="dashboards/template_variables/dynamic_template_variable.png" alt="위젯에서 템플릿 변수를 역동적으로 설정할 수 있음" style="width:100%;">}}

`environment` 값에 **production**을 선택하면 `$environment` 변수가 있는 위젯을 역동적으로 생산 환경으로 범위 지정합니다. 

템플릿 변수의 값을 변경하면 `&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>` 형식의 템플릿 변수 값을 반영하도록 대시보드 URL이 업데이트됩니다. 예를 들어, 템플릿 변수 `$env`이(가) `prod`으(로) 변경된 대시보드는 URL 파라미터 `&tpl_var_env=prod`을(를) 가지게 됩니다.

쿼리에 값을 포함하려면 `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.value` 구문을 추가합니다. 예를 들어, `service`라는 템플릿 변수에 `env:staging-$service.value`를 사용합니다.

템플릿 변수 필드에 마우스 커서를 올려 빠른 보기를 확인할 수 있고, 해당 변수를 사용하는 위젯이 대시보드에서 강조 표시됩니다.

#### 관련 템플릿 변수

템플릿 변수 값을 선택할 때 연관된 값이 선택기 상단에 표시됩니다. 연관된 값은 페이지에서 선택된 다른 템플릿 변수 값에서 계산되고, 별도 설정 없이 관련 값을 원활하게 파악합니다.

#### 텍스트

텍스트 기반 위젯의 경우 템플릿 변수의 태그/속성 및 값을`{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>`으로, 해당 키를`{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.key`로, 또는 해당 값을 `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.value`로 표시할 수 있습니다. 이것은 영숫자가 아닌 문자 뒤에 올 수 있으며, 공백 또는 `#`, `{TX-PL-LABEL}#x60;, `%`, `=`, `;`, `"`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `*`, `+`, `|`, `?` 등 문자가 올 수도 있습니다.

**참고**: 다음 템플릿에는 와일드카드 구문이 지원되지 않습니다.

예를 들어, `env`(이)라는 템플릿 변수, `environment` 태그/속성 및 `dev` 값이 선택된 경우에는 다음과 같습니다.
* `$env`은(는) `environment:dev`을(를) 표시합니다.
* `$env.key`은(는) `environment`을(를) 표시합니다.
* `$env.value`은(는) `dev`을(를) 표시합니다.
* `$env*`의 경우 `dev*`와 정확히 일치하는 값을 찾습니다(`dev{dynamic-wildcard-value}` 아님).

### 이벤트 오버레이

템플릿 변수와 함께 이벤트 오버레이 검색을 사용하여 대시보드의 메트릭스와 특정 태그를 공유하는 이벤트를 찾습니다. 이벤트 오버레이 검색은 개별 그래프를 통해 적용됩니다.

대시보드 템플릿 변수 값은 이벤트 검색 필드에서 `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_KEY>.value` 구문을 사용하여 직접 캡처할 수 있습니다.

**참고**: 대시보드 템플릿 변수는 이벤트 태그가 아닌 메트릭 태그여야 합니다.

#### 대시보드

대시보드에서 다음 형식을 사용하여 템플릿 변수로 이벤트를 검색합니다.

```text
<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

예를 들어, `region` 템플릿 변수에 대해 `us-east1` 값을 사용하여 `region:$region.value`을(를) 검색하면 `region:us-east1` 태그가 지정된 이벤트가 표시됩니다. 또한 이벤트의 타이밍은 그래프에서 분홍색 막대로 표시됩니다.

여러 템플릿 변수(예: `role:$role.value,env:$env.value`)를 사용하여 검색하려면 쉼표를 사용하세요.

**참고**: *enter*를 눌러 검색하면 `$region.value`가 템플릿 변수 드롭다운 메뉴 값으로 업데이트됩니다.

#### 위젯

위젯에서 다음 형식의 템플릿 변수를 사용하여 이벤트 타이밍을 오버레이합니다.

```text
$<TEMPLATE_VARIABLE_NAME>
```

예를 들어, 이벤트 오버레이 검색 상자에 `$region`을 입력합니다. 그러면 `region` 템플릿 변수 드롭다운 메뉴 값이 있는 이벤트를 검색합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/#define-tags
[2]: /ko/logs/explorer/facets/
[3]: /ko/real_user_monitoring/explorer/?tab=facets#setup-facets-measures