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

템플릿 변수를 사용하면 대시보드에서 하나 이상의 위젯을 동적으로 필터링할 수 있습니다.

## 생성

대시보드에서 첫 번째 템플릿 변수를 만들려면 **Add Template Variables**를 클릭합니다. 템플릿 변수가 이미 정의되어 있으면 *연필* 아이콘을 클릭하여 템플릿 변수 편집기를 엽니다. 편집 모드에서 **Add Variable +**를 클릭하여 템플릿 변수를 추가합니다.

템플릿 변수는 다음에 의해 정의됩니다.

* **태그 또는 속성**:
    * 태그: 권장되는 [태깅 형식][1](`<KEY>:<VALUE>`)을 따르는 경우 *태그*는 `<KEY>`입니다.
    * 속성: [패싯 또는 메트릭을 템플릿 변수로]  사용합니다(#logs-apm-and-rum-queries).
* **이름**: 대시보드의 쿼리에 표시되는 템플릿 변수의 고유한 이름입니다. 템플릿 변수는 선택한 태그 또는 속성에 따라 자동으로 이름이 지정됩니다.
* **기본값**: 대시보드가 로드될 때 자동으로 나타나는 태그 또는 속성값입니다. 기본값은 `*`입니다.
* **사용 가능 값**: 드롭다운에서 선택할 수 있는 태그 또는 속성값입니다. 기본값은 `(all)`입니다. 사용 가능 값 목록에는 항상 태그 또는 속성의 모든 값을 쿼리하는 `*`이(가) 포함됩니다.

템플릿 변수를 생성한 후 Datadog은 변수를 사용하는 소스의 수를 표시합니다. 아래 예에서 템플릿 변수 `team`은(는) 대시보드의 두 그래프에서 사용됩니다.

{{< img src="dashboards/template_variables/stats_tv_modal.png" alt="여러 변수 세트가 있는 템플릿 변수" style="width:90%;">}}

개별 위젯에서 [템플릿 변수를 사용](#use)하거나 **add to All** 옵션을 클릭합니다. 모든 위젯에서 템플릿 변수를 제거하려면 **Remove From All** 옵션을 클릭합니다.

### 로그, APM 및 RUM 쿼리

메트릭, 로그, APM 및 RUM은 동일한 태그를 공유하므로 템플릿 변수는 로그, APM 및 RUM 위젯에서 작동합니다.
또한 [로그][2], APM 또는 [RUM][3] 패싯을 기반으로 로그, APM 및 RUM 템플릿 변수를 정의할 수 있습니다. 이러한 변수는 `@`(으)로 시작합니다(예: `@http.status_code`).

로그, APM 및 RUM 위젯에서 값 중간에 와일드카드를 사용하거나(예: `eng*@example.com`), 하나의 값에 여러 와일드카드를 사용할 수 있습니다(예: `*prod*`).

**참고**: 이 유형의 템플릿 변수에 대해 **Add to all**를 사용하면 변수가 모든 로그, APM 및 RUM 위젯에 추가됩니다.

### 저장된 보기

#### 생성

{{< img src="dashboards/template_variables/default_view.png" alt="기본 저장된 보기" style="width:85%;">}}

대시보드의 템플릿 변수 왼쪽에는 *(Default Value)*으로 나열된 드롭다운이 있습니다. 템플릿 변수값을 변경하면 해당 값이 보기에 자동으로 저장되지 않습니다.
템플릿 변수의 현재 값을 보기에 저장하려면 드롭다운 메뉴를 클릭하고 *Save selections as view*를 클릭합니다. 여기에서 해당 보기의 고유한 이름을 입력하라는 메시지가 표시됩니다. 저장 후 이 보기가 드롭다운 메뉴에 나열됩니다. 템플릿 변수의 이전에 저장된 값을 검색하려면 이 보기를 클릭합니다.

#### 삭제

보기를 삭제하려면 저장된 보기 드롭다운을 클릭하고 *Manage views...*를 선택합니다. 여기에서 각 보기 옆에 휴지통 아이콘과 저장된 보기가 포함된 팝업이 표시됩니다. 해당 휴지통 아이콘을 클릭하여 보기를 삭제합니다.

{{< img src="dashboards/template_variables/manage_views.png" alt="보기 팝업 관리" style="width:75%;">}}

#### 수정

*(Default Value)* 보기를 수정하려면 연필 아이콘을 클릭하고 템플릿 변수 값을 업데이트합니다. 그런 다음 *Done*을 클릭하여 저장합니다. 다른 보기의 값이 변경되면 해당 값을 새 보기로 저장한 다음 원래 보기를 삭제하세요. 

## 사용

템플릿 변수는 위젯 및 이벤트 오버레이에서 사용됩니다.

### 위젯

위젯을 생성하거나 편집할 때 기존 템플릿 변수는 `from` 필드에 옵션으로 표시됩니다. 예를 들어, 템플릿 변수 `env`을(를) 생성하면 옵션 `$env`을(를) 사용할 수 있습니다.

위젯이 저장된 후 템플릿 변수 값은 대시보드 상단에서 선택한 값이 됩니다.

{{< img src="dashboards/template_variables/selecting_template_variables.png" alt="템플릿 변수 선택하기" style="width:75%;">}}

접두사 또는 접미사만 기반으로 쿼리하려면 템플릿 변수 값의 시작 또는 끝에 와일드카드 문자(`*`)를 사용하세요. 예를 들어, `us*`을(를) 사용하여 `us`(으)로 시작하는 모든 리전을 찾거나, `*@example.com`을(를) 사용하여 `example.com` 도메인에 속하는 모든 이메일을 찾습니다.

템플릿 변수의 값을 변경하면 `&tpl_var_<TEMPLATE_VARIABLE_NAME>=<TEMPLATE_VARIABLE_VALUE>` 형식의 템플릿 변수 값을 반영하도록 대시보드 URL이 업데이트됩니다. 예를 들어, 템플릿 변수 `$env`이(가) `prod`으(로) 변경된 대시보드는 URL 파라미터 `&tpl_var_env=prod`을(를) 가지게 됩니다.

쿼리에 해당 값만 포함하려면 `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.value` 구문을 추가합니다. 예를 들어, `service`라는 템플릿 변수에 `env:staging-$service.value`을(를) 사용합니다.

#### 관련 템플릿 변수
템플릿 변수 값을 선택하면 **Associated Values** 및 **Other Values** 섹션이 표시됩니다. 관련 값은 페이지에서 선택한 다른 템플릿 변수 값에서 계산되며, 별도 설정 없이 관련 값을 원활하게 식별합니다.

{{< img src="dashboards/template_variables/associated_template_variables.png" alt="연결된 템플릿 변수" style="width:75%;">}}

#### 텍스트

텍스트 기반 위젯의 경우 템플릿 변수의 태그/속성 및 값을`{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>`(으)로, 그 키만`{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.key`(으)로 또는 그 값만 `{TX-PL-LABEL}lt;TEMPLATE_VARIABLE_NAME>.value`(으)로 표시할 수 있습니다. 이것은 영숫자가 아닌 문자 뒤에 올 수 있으며, 공백 또는 `#`, `{TX-PL-LABEL}#x60;, `%`, `=`, `;`, `"`, `(`, `)`, `[`, `]`, `{`, `}`, `^`, `*`, `+`, `|`, `?` 등 문자가 올 수도 있습니다.

예를 들어, `env`(이)라는 템플릿 변수, `environment` 태그/속성 및 `dev` 값이 선택된 경우에는 다음과 같습니다.
* `$env`은(는) `environment:dev`을(를) 표시합니다.
* `$env.key`은(는) `environment`을(를) 표시합니다.
* `$env.value`은(는) `dev`을(를) 표시합니다.

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

**참고**: *enter*를 눌러 검색하면 `$region.value`이(가) 템플릿 변수 드롭다운의 값으로 업데이트됩니다.

#### 위젯

위젯에서 다음 형식의 템플릿 변수를 사용하여 이벤트 타이밍을 오버레이합니다.

```text
$<TEMPLATE_VARIABLE_NAME>
```

예를 들어, 이벤트 오버레이 검색 상자에 `$region`을(를) 입력합니다. 그러면 `region` 템플릿 변수 드롭다운의 값이 있는 이벤트를 검색합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/#defining-tags
[2]: /ko/logs/explorer/facets/
[3]: /ko/real_user_monitoring/explorer/?tab=facets#setup-facets-measures