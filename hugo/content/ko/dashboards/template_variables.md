---
aliases:
- /ko/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
- /ko/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
- /ko/graphing/dashboards/template_variables/
description: 태그, 속성 및 패싯을 기준으로 대시보드 위젯을 동적으로 필터링하여 데이터를 유연하게 탐색하려면 템플릿 변수를 사용합니다.
further_reading:
- link: /dashboards/
  tag: 설명서
  text: Datadog에서 대시보드 만들기
- link: /dashboards/sharing/
  tag: 설명서
  text: Datadog 외부에서 그래프 공유
- link: /dashboards/widgets/
  tag: 설명서
  text: 대시보드용 위젯 살펴보기
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: 블로그
  text: Datadog으로 효과적인 임원 대시보드 설계
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: 블로그
  text: '규모에 맞는 Datadog 최적화: Zendesk의 비용 효율적 관측 가능성'
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: 블로그
  text: 관련된 템플릿 변수를 사용해 대시보드 정리하기
- link: https://www.datadoghq.com/blog/dynamic-template-variable-syntax-dashboards/
  tag: 블로그
  text: 동적 템플릿 변수 구문으로 대시보드 워크플로우 속도 향상
- link: https://www.datadoghq.com/blog/template-variable-available-values/
  tag: 블로그
  text: 템플릿 변수 사용 가능 값으로 대시보드를 더 빠르게 필터링
title: 템플릿 변수
---
## 개요 {#overview}

템플릿 변수를 사용하면 대시보드의 위젯을 동적으로 필터링하거나 그룹화할 수 있습니다. 템플릿 변수 선택값을 기반으로 저장된 보기를 생성하여 드롭다운 선택을 통해 시각화를 구성하고 탐색할 수 있습니다.

템플릿 변수는 다음에 의해 정의됩니다.

* {{< ui >}}Tag or Attribute{{< /ui >}}:
    * 태그: 권장 [태그 형식][1](`<KEY>:<VALUE>`)을 사용하는 경우 *태그*는 `<KEY>`입니다.
    * 속성: [패싯 또는 측정값을 템플릿 변수로 사용합니다](#logs-apm-and-rum-queries).
* {{< ui >}}Name{{< /ui >}}: 대시보드의 쿼리에 표시되는 템플릿 변수의 고유 이름입니다. 템플릿 변수 이름은 선택한 태그 또는 속성 이름을 기준으로 자동 지정됩니다.
* {{< ui >}}Default Value{{< /ui >}}: 대시보드가 로드될 때 자동으로 표시되는 태그 또는 속성 값입니다. 기본값은 `*`입니다.
* {{< ui >}}Available Values{{< /ui >}}: 드롭다운 메뉴에서 선택할 수 있는 태그 또는 속성 값입니다. 기본값은 `(all)`입니다. 사용 가능한 값 목록에는 항상 `*`이 포함되며, 이는 해당 태그 또는 속성의 모든 값을 조회합니다.

### 템플릿 변수 값 {#template-variable-values}
템플릿 변수 값(템플릿 변수 드롭다운 메뉴에서 사용할 수 있는 값)은 대시보드 위젯이 사용하는 데이터 소스를 기반으로 채워집니다. 예를 들어, 대시보드에 로그를 조회하는 위젯만 있는 경우 로그의 값만 표시됩니다. 대시보드에 로그, 메트릭 및 RUM을 조회하는 위젯이 있는 경우 로그, 메트릭 및 RUM의 값이 모두 표시됩니다.

대부분의 데이터 소스에서 템플릿 변수 값은 대시보드의 전역 시간 프레임과 연관됩니다. 예를 들면 다음과 같습니다.
- 대시보드의 시간 프레임이 최근 15분으로 설정된 경우 최근 15분 동안의 템플릿 변수 값만 표시됩니다. 
- 대시보드의 시간 프레임이 8월 15일 오전 12:00부터 오후 11:59까지로 설정된 경우 해당 기간의 값만 표시됩니다.

| 데이터 소스                                     | 데이터 조회 기간   |
|--------------------------------------           |---------------------|
| 메트릭                                         | 현재 시점 - 48시간      |
| 클라우드 비용                                      | 현재 시점 - 48시간      |
| 기타 모든 소스                               | 대시보드 시간 프레임 |

**참고**: 원하는 태그 또는 속성이 보이지 않는 경우 해당 데이터가 최근 Datadog에 보고되지 않았기 때문일 수 있습니다. 또한 템플릿 변수에 대해 조회되는 모든 데이터는 데이터 보존 정책의 적용을 받습니다. 자세한 내용은 [과거 데이터][4]를 참조하세요.

### 대시보드 레이아웃 {#dashboard-layout}
변수가 헤더를 지나치게 차지하지 않도록 대시보드는 일부 변수만 표시합니다. **+ N** 버튼을 클릭하면 대시보드에 있는 추가 N개의 변수를 확인할 수 있습니다. 


스크롤하는 동안 모든 변수를 한 번에 보고 싶다면 **템플릿 변수 확장**을 클릭하세요. 


## 템플릿 변수 추가 {#add-a-template-variable}
대시보드에서 템플릿 변수를 추가하는 방법:
1. {{< ui >}}Add Variable{{< /ui >}}을 클릭합니다(기존 템플릿 변수가 있는 경우 {{< ui >}}+{{< /ui >}} 클릭).
2. 권장 템플릿 변수 목록에서 선택하거나 원하는 특정 태그를 검색합니다.
4. 이 템플릿 변수를 적용할 위젯을 선택합니다.
6. {{< ui >}}Save{{< /ui >}}를 클릭합니다.


### 템플릿 변수 구성 {#configure-template-variable}
템플릿 변수 사이드 패널이 열리면 다음 작업을 수행할 수 있습니다.
* 선택한 위젯에 이 변수를 적용(또는 제거)({{< ui >}}Select All{{< /ui >}} 또는 {{< ui >}}Deselect All{{< /ui >}} 옵션 참조).
* 필터링과 그룹화 간 전환
* 변수의 표시 이름 변경(헤더 및 위젯 쿼리에 표시됨)
* 기본 드롭다운 값 선택
* 드롭다운 값을 미리 보고 검색 쿼리를 사용하여 추가 구성


## 템플릿 변수 편집 {#edit-a-template-variable}
1. 대시보드 헤더의 템플릿 변수 위에 마우스를 올린 다음 **Edit**을 클릭합니다. 템플릿 변수 사이드 패널이 표시됩니다.
2. 패널의 옵션을 사용하여 변수를 사용자 지정하거나 더 많은 위젯에 변수를 적용합니다.


## 저장된 보기 {#saved-views}

### 생성 {#create}

1. 대시보드의 템플릿 변수 왼쪽에 있는 {{< ui >}}Saved Views{{< /ui >}} 드롭다운 메뉴를 클릭합니다. 템플릿 변수 값을 변경해도 해당 값은 자동으로 보기에 저장되지 않습니다.
1. 현재 템플릿 변수 값을 보기에 저장하려면 {{< ui >}}Saved Views{{< /ui >}} 드롭다운 메뉴에서 {{< ui >}}Save selections as view{{< /ui >}}을 선택합니다.
1. 보기의 고유한 이름을 입력하고 필요에 따라 설명을 추가합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="/dashboards/template_variables/saved_view_create.png" alt="보기로 선택 항목 저장을 선택하여 저장된 보기를 생성합니다." style="width:100%;" >}}

저장된 보기가 드롭다운 메뉴에 나타납니다. 보기를 클릭하면 이전에 저장한 템플릿 변수 값을 불러올 수 있습니다.

### 삭제 {#delete}

1. 저장된 보기 드롭다운 메뉴를 클릭한 다음 원하는 저장된 보기 위에 마우스를 올립니다.
1. {{< ui >}}Delete View{{< /ui >}}를 클릭합니다.

### 수정 {#modify}

{{< ui >}}Default view{{< /ui >}}는 템플릿 변수의 기본값을 변경하는 방법으로만 편집할 수 있습니다. 기본 보기를 편집하려면 다음을 수행합니다.
1. 템플릿 변수 위에 마우스를 올립니다.
버튼이 나타나면 1. {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Done{{< /ui >}}을 클릭하여 저장합니다.

다른 저장된 보기의 템플릿 변수 값을 수정하려면 다음을 수행합니다.
1. 드롭다운 메뉴에서 원하는 저장된 보기를 선택합니다.
1. 템플릿 변수가 원하는 새 모델을 갖도록 수정합니다.
1. 드롭다운 메뉴를 다시 엽니다.
1. {{< ui >}}Save Changes{{< /ui >}}를 클릭합니다.

{{< img src="/dashboards/template_variables/saved_views_update_template_variable.png" alt="저장된 보기의 템플릿 변수 수정" style="width:100%;" >}}

제목 및 설명을 편집하려면 다음을 수행합니다.
1. 드롭다운 메뉴에서 원하는 저장된 보기 위에 마우스를 올립니다.
1. {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
1. 제목 또는 설명을 수정합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 사용 방법 {#usage}

템플릿 변수는 위젯 및 이벤트 오버레이에서 사용됩니다.

### 로그, APM 및 RUM 쿼리 {#logs-apm-and-rum-queries}

템플릿 변수는 동일한 태그를 공유하므로 로그, APM 및 RUM 위젯에서 사용할 수 있습니다. 패싯을 기반으로 로그, APM 및 RUM 템플릿 변수를 정의할 수 있습니다. 이러한 변수는 `@`로 시작합니다. 예: `@http.status_code`

로그, APM 및 RUM 위젯에서는 값 중간에 와일드카드를 사용할 수 있습니다(예: `eng*@example.com`). 또한 하나의 값에 여러 와일드카드를 사용할 수도 있습니다(예: `*prod*`).

**참고**: 이 유형의 템플릿 변수에 {{< ui >}}Add to all{{< /ui >}}을 사용하면 해당 변수가 모든 로그, APM 및 RUM 위젯에 추가됩니다.

### 위젯 {#widgets}

위젯을 생성하거나 편집할 때 기존 필터 템플릿 변수는 `from` 필드의 옵션으로 표시되고, 기존 그룹화 템플릿 변수는 `by` 필드 뒤에 옵션으로 표시됩니다. 예를 들어 `environment` 템플릿 변수를 구성한 경우 `$environment` 옵션을 위젯의 동적 변수로 사용할 수 있습니다.

{{< img src="dashboards/template_variables/dynamic_template_variable.png" alt="위젯에서 템플릿 변수를 동적으로 설정할 수 있습니다." style="width:100%;">}}

`environment` 값으로 **production**을 선택하면 `$environment` 변수를 사용하는 위젯이 동적으로 프로덕션 환경 범위로 제한됩니다.

템플릿 변수 값을 변경하면 대시보드 URL이 `&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>` 형식으로 업데이트되어 해당 값을 반영합니다. 예를 들어 템플릿 변수 `$env`의 값을 `prod`로 변경한 대시보드는 URL 파라미터 `&tpl_var_env=prod`을 갖게 됩니다.

쿼리에 값을 포함하려면 `$<TEMPLATE_VARIABLE_NAME>.value` 구문을 사용하여 추가합니다. 예를 들어 템플릿 변수 이름이 `service`인 경우 `env:staging-$service.value`를 사용합니다.

템플릿 변수 필드에 마우스 커서를 올려 빠른 보기를 확인할 수 있고, 해당 변수를 사용하는 위젯이 대시보드에서 강조 표시됩니다.

#### 연관 템플릿 변수 {#associated-template-variables}

템플릿 변수 값을 선택하면 연관 값이 선택기 상단에 표시됩니다. 연관 값은 페이지에서 선택된 다른 템플릿 변수 값을 기반으로 계산되며, 별도의 구성 없이 관련된 값을 자동으로 식별합니다.

#### 텍스트 {#text}

텍스트 기반 위젯의 경우, 템플릿 변수의 태그/속성과 값을 `$<TEMPLATE_VARIABLE_NAME>`으로, 키를 `$<TEMPLATE_VARIABLE_NAME>.key`로, 값을 `$<TEMPLATE_VARIABLE_NAME>.value`으로 표시할 수 있습니다. 이 구문은 영숫자가 아닌 문자 뒤에 올 수 있으며, 그 뒤에는 공백 또는 `#`, `$`, `%`, `=`, `;`, `"`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `*`, `+`, `|`, `?` 중 하나가 올 수 있습니다.

**참고**: 템플릿 변수 뒤에는 와일드카드 구문을 사용할 수 없습니다.

예를 들어 템플릿 변수 이름이 `env`, 태그/속성이 `environment`, 선택된 값이 `dev`인 경우:
* `$env` → `environment:dev` 표시
* `$env.key` → `environment` 표시
* `$env.value` → `dev` 표시
* `$env*` → `dev{dynamic-wildcard-value}`가 아니라 정확히 `dev*` 값을 검색

### 이벤트 오버레이 {#events-overlay}

대시보드의 메트릭과 특정 태그를 공유하는 이벤트를 찾으려면 템플릿 변수를 사용한 이벤트 오버레이 검색을 사용할 수 있습니다. 이벤트 오버레이 검색은 개별 그래프를 통해 적용됩니다.

대시보드 템플릿 변수 값은 이벤트 검색 필드에서 `$<TEMPLATE_VARIABLE_KEY>.value` 구문을 사용하여 직접 참조할 수 있습니다.

**참고**: 대시보드 템플릿 변수는 이벤트 태그가 아니라 메트릭 태그여야 합니다.

#### 대시보드 {#dashboard}

대시보드에서 다음 형식을 사용하여 템플릿 변수로 이벤트를 검색합니다.

```text
<TAG_KEY>:$<TEMPLATE_VARIABLE_NAME>.value
```

예를 들어 `region` 템플릿 변수의 값이 `us-east1`일 때 `region:$region.value`를 검색하면 `region:us-east1` 태그가 지정된 이벤트가 표시됩니다. 또한 이벤트 발생 시점이 그래프에서 분홍색 막대로 표시됩니다.

여러 템플릿 변수를 사용하여 검색하려면 쉼표로 구분합니다(예: `role:$role.value,env:$env.value`).

**참고**: 검색을 위해 *Enter* 키를 누르면 `$region.value`이 템플릿 변수 드롭다운 메뉴의 값으로 업데이트됩니다.

#### 위젯 {#widgets-1}

위젯에서 다음 형식의 템플릿 변수를 사용하여 이벤트 타이밍을 오버레이합니다.

```text
$<TEMPLATE_VARIABLE_NAME>
```

예를 들어 이벤트 오버레이 검색 상자에 `$region`을 입력합니다. 이렇게 하면 `region` 템플릿 변수 드롭다운 메뉴의 값을 가진 이벤트를 검색합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/#define-tags
[2]: /ko/logs/explorer/facets/
[3]: /ko/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[4]: /ko/dashboards/faq/historical-data/