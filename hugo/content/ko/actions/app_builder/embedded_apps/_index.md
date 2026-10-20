---
aliases:
- /ko/service_management/app_builder/embedded_apps
description: 게시된 앱을 대시보드에 임베드하고 템플릿 변수 및 시간 프레임과 동기화하여 상황에 맞는 액션을 동적으로 실행합니다.
disable_toc: false
further_reading:
- link: https://app.datadoghq.com/actions/action-catalog/
  tag: 앱
  text: Action Catalog
title: App Builder 앱 임베드
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder는 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}


Datadog App Builder 앱을 대시보드에 임베드하면 리소스에 대해 직접 조치를 취할 수 있으며, 모든 관련 데이터와 컨텍스트를 즉시 확인할 수 있습니다. 앱을 대시보드의 시간 프레임 및 템플릿 변수와 연결하여 앱의 액션 범위를 동적으로 설정하면 환경 내에서 필요한 범위에 맞춰 액션을 실행할 수 있습니다.

<div class="alert alert-info">이 페이지에서는 Datadog에서 로우코드 드래그 앤 드롭 편집기를 사용해 빌드한 App Builder 앱을 임베드하는 방법을 설명합니다. React 및 TypeScript로 로컬에서 코드를 작성해 빌드한 <a href="/actions/datadog_apps/">Datadog Apps</a> 앱을 임베드하려면 <a href="/actions/datadog_apps/embed_apps/">앱 임베드</a>를 참조하세요.</div>

## 대시보드에 앱 추가 {#add-apps-to-your-dashboard}

대시보드의 위젯 트레이에서 {{< ui >}}App{{< /ui >}} 위젯 유형을 끌어다 놓아 기존에 게시한 앱을 대시보드에 추가합니다.

{{< img src="/actions/app_builder/embedded_apps/app-widget-select.png" alt="앱 위젯 유형이 강조 표시된 대시보드 위젯 트레이" style="width:30%;">}}

앱 편집기 모달이 표시되면 앱을 선택하고 제목을 입력할 수 있습니다.

{{< img src="/actions/app_builder/embedded_apps/app-editor.png" alt="앱이 선택되고 위젯 제목이 표시된 앱 편집기 모달" style="width:80%;">}}

## 대시보드 템플릿 변수 및 시간 프레임 변수와 앱 동기화 {#sync-your-app-with-dashboard-template-and-time-frame-variables}

쿼리나 앱 요소에서 템플릿 표현식을 지원하는 모든 위치에서 앱을 템플릿 변수에 연결할 수 있습니다. 또한 대시보드에서 선택한 시간 프레임에 앱을 연결할 수도 있습니다.

대시보드에서 템플릿 변수나 시간 프레임의 값을 변경하면 연결된 앱 요소가 자동으로 업데이트됩니다. 예를 들어, 템플릿 변수 드롭다운을 사용하거나 그래프에서 직접 `instance_id` 값을 선택하면 `instance_id` 값이 앱의 필터에 추가됩니다. 이를 통해 특정 인스턴스에 대한 액션을 실행할 수 있습니다.

{{< img src="actions/app_builder/embedded_apps/template_variables.mp4" alt="그래프에서 템플릿 변수 값 선택" video="true">}}


### 템플릿 변수 예시 {#template-variable-examples}

선택 구성 요소를 사용 가능한 모든 템플릿 변수의 목록으로 채우려면 선택 구성 요소의 {{< ui >}}Options{{< /ui >}} 필드에 다음 템플릿 표현식을 추가합니다.

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.map(tvar => tvar.name )}
{{< /code-block >}}

특정 템플릿 변수의 사용 가능한 모든 값을 목록화하려면 다음 템플릿 표현식을 사용합니다.

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues}
{{< /code-block >}}

선택 구성 요소를 사용할 때 사용 가능한 모든 값을 나열하려면 다음 템플릿 표현식을 사용합니다.

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues.map(availableValue => {return {label: availableValue, value:availableValue}})}
{{< /code-block >}}

템플릿 변수의 선택한 값을 가져오려면 다음 템플릿 표현식을 사용합니다.

- 단일 선택 템플릿 변수의 경우:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.value}
{{< /code-block >}}
- 다중 선택 템플릿 변수의 경우:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.values}
{{< /code-block >}}

### 시간 프레임 예시 {#time-frame-examples}

시간 프레임 시작값을 가져오려면 다음 템플릿 표현식을 사용합니다.

- 숫자 형식의 타임스탬프:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.start}
{{< /code-block >}}
- 서식이 지정된 날짜 및 시간:
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.start).toLocaleString()}
{{< /code-block >}}

시간 프레임 종료값을 가져오려면 다음 템플릿 표현식을 사용합니다.

- 숫자 형식의 타임스탬프:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.end}
{{< /code-block >}}
- 서식이 지정된 날짜 및 시간:
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.end).toLocaleString()}
{{< /code-block >}}

대시보드의 시간 프레임에 날짜 범위 선택기 구성 요소 값을 설정하는 버튼을 추가하려면 다음 단계를 수행합니다.

1. 앱에 날짜 범위 선택기 구성 요소를 추가하고 이름을 'dateRangePicker0'으로 지정합니다.
1. 앱에 버튼을 추가합니다.
1. {{< ui >}}Events{{< /ui >}}에서 다음 값을 입력합니다.
    - {{< ui >}}Event{{< /ui >}}: {{< ui >}}click{{< /ui >}}
    - {{< ui >}}Reaction{{< /ui >}}: {{< ui >}}Set Component State{{< /ui >}}
    - {{< ui >}}Component{{< /ui >}}: {{< ui >}}dateRangePicker0{{< /ui >}}
    - {{< ui >}}State Function{{< /ui >}}: {{< ui >}}setValue{{< /ui >}}
    - {{< ui >}}Value{{< /ui >}}: `${global?.dashboard?.timeframe}`
1. 앱을 저장하고 게시합니다.

## Catalog에 앱 추가 {#add-apps-to-catalog}

개발자가 인프라를 프로비저닝하고, 서비스를 스캐폴딩하고, 문제를 수정하는 등 다양한 작업을 한곳에서 수행할 수 있도록 [Catalog][3]의 [Self-Service Actions][2] 대시보드에 게시된 앱을 추가합니다.

Self-Service Actions에 추가하려면 먼저 앱이 게시되었고 권한이 정의되어 있는지 확인합니다. 다음으로 {{< ui >}}Add to Self-Service Actions{{< /ui >}}를 클릭합니다.

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Self-Service Actions" style="width:100%;" >}}

앱을 추가한 후에는 Catalog에서 앱을 확인하고 사용할 수 있습니다.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Self-Service Actions에 게시" style="width:100%;" >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][1]의 **#app-builder** 채널에 참여하세요.

[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/software/self-service
[3]: https://app.datadoghq.com/software