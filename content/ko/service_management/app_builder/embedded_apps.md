---
disable_toc: false
further_reading:
- link: https://app.datadoghq.com/app-builder/action-catalog
  tag: App
  text: 작업 카탈로그
title: 임베디드 앱
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})는 앱 빌더를 지원하지 않습니다.</div>
{{< /site-region >}}

대시보드에 Datadog 앱 빌더 앱을 임베드하면 리소스에서 직접 작업을 수행할 수 있으며, 모든 관련 데이터와 컨텍스트를 즉시 사용할 수 있습니다. 앱을 대시보드의 타임 프레임 및 템플릿 변수와 연결하여 앱 작업의 범위를 동적 설정하면 환경에서 필요한 범위 내에서 작업을 수행할 수 있습니다.

## 대시보드에 앱 추가하기

대시보드의 위젯 트레이에서 **앱** 위젯 유형을 드래그하여 기존에 퍼블리시한 앱을 대시보드에 추가합니다.

{{< img src="/service_management/app_builder/embedded_apps/app_widget_select.png" alt="앱 위젯 유형이 강조 표시된 대시보드 위젯 트레이" style="width:80%;">}}

앱 편집기 모달이 표시되면 앱을 선택하고 제목을 입력할 수 있습니다.

{{< img src="/service_management/app_builder/embedded_apps/app_editor.png" alt="선택한 앱과 위젯 제목이 있는 앱 편집기 모달" style="width:80%;">}}

## 대시보드 템플릿 및 타임 프레임 변수와 앱 동기화

쿼리 또는 앱 요소에서 템플릿 정규식을 지원한다면 어디에든 앱을 템플릿 변수에 연결할 수 있습니다. 대시보드에서 선택한 타임 프레임에 앱을 연결할 수도 있습니다.

대시보드에서 템플릿 변수 또는 타임 프레임의 값을 변경하면 연결된 앱 요소가 자동으로 업데이트됩니다. 예를 들어, 템플릿 변수 드롭다운을 사용하거나 그래프에서 직접 `instance_id` 값을 선택하면 `instance_id` 값이 앱의 필터에 추가됩니다. 이를 통해 특정 인스턴스에 대한 작업을 수행할 수 있습니다.

{{< img src="service_management/app_builder/embedded_apps/template_variables.mp4" alt="그래프에서 템플릿 변수 값 선택하기" video="true">}}


### 템플릿 변수 예시

선택 컴포넌트를 사용 가능한 모든 템플릿 변수의 목록으로 채우려면 선택 컴포넌트의 **옵션** 필드에 다음 템플릿 정규식을 추가합니다.

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.map(tvar => tvar.name )}
{{< /code-block >}}

특정 템플릿 변수의 사용 가능한 모든 값을 목록화하려면 다음 템플릿 정규식을 사용합니다.

{{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.availableValues}
{{< /code-block >}}

템플릿 변수의 선택한 값을 가져오려면 다음 템플릿 정규식을 사용합니다.

- 단일 선택 템플릿 변수의 경우:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.value}
{{< /code-block >}}
- 다중 선택 템플릿 변수의 경우:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.templateVariables?.find(v => v.name === '<TEMPLATE_VARIABLE_NAME>')?.values}
{{< /code-block >}}

### 타임 프레임 예시

타임 프레임 시작값을 가져오려면 다음 템플릿 정규식을 사용합니다.

- 숫자 타임스탬프의 경우:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.start}
{{< /code-block >}}
- 형식이 지정된 날짜와 시간의 경우:
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.start).toLocaleString()}
{{< /code-block >}}

타임 프레임 종료값을 가져오려면 다음 템플릿 정규식을 사용합니다.

- 숫자 타임스탬프의 경우:
   {{< code-block lang="json" disable_copy="false">}}
${global?.dashboard?.timeframe?.end}
{{< /code-block >}}
- 형식이 지정된 날짜와 시간의 경우:
   {{< code-block lang="json" disable_copy="false">}}
${new Date(global?.dashboard?.timeframe?.end).toLocaleString()}
{{< /code-block >}}

대시보드의 타임 프레임에 날짜 범위 선택기 컴포넌트 값을 설정하는 버튼을 추가하려면 다음 단계에 따릅니다.

1. 앱에 날짜 범위 선택기 컴포넌트를 추가하고 이름을 "dateRangePicker0"로 지정합니다.
1. 앱에 버튼을 추가합니다.
1. **이벤트**에 다음 값을 입력합니다.
    - **이벤트**: 클릭
    - **리액션**: 컴포넌트 상태 설정
    - **컴포넌트**: dateRangePicker0
    - **상태 함수**: setValue
    - **값**: `${global?.dashboard?.timeframe}`
1. 앱을 저장하고 퍼블리시합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][1]의 **#app-builder** 채널에 참여하세요.

[1]: https://datadoghq.slack.com/