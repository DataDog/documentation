---
aliases:
- /ko/developers/datadog_apps/
- /ko/developers/ui_extensions/
- /ko/developers/faq/ui_extensions
- /ko/service_management/app_builder/
description: 드래그 앤 드롭 인터페이스, JavaScript 지원, 외부 서비스와의 통합 기능을 갖춘 내부 도구 구축용 로우코드 플랫폼입니다.
disable_toc: false
further_reading:
- link: /actions/datadog_apps/
  tag: 설명서
  text: Datadog 앱
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: 블로그
  text: 'Datadog Cloud SIEM: 보안 운영의 혁신을 주도하다'
- link: /actions/actions_catalog/
  tag: 설명서
  text: Action Catalog
- link: https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/
  tag: 블로그
  text: Datadog App Builder로 사용자 지정 모니터링 및 문제 해결 도구를 구축하기
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: 블로그
  text: Datadog App Builder를 사용하여 구축된 앱의 문제 해결하기
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: 블로그
  text: AI 어시스턴트를 통해 몇 분 이내에 Datadog 워크플로 및 앱을 구축하기
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: 블로그
  text: Datadog Workflow Automation, Datastore, App Builder를 통해 반복 작업을 자동화하는 단일 앱을
    개발한 방법
- link: https://learn.datadoghq.com/courses/getting-started-app-builder/
  tag: 학습 센터
  text: App Builder 시작하기
- link: https://www.datadoghq.com/blog/generate-apps-with-ai/
  tag: 블로그
  text: App Builder의 대화형 AI로 몇 초 만에 사용자 지정 앱 구축하기
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: 학습 센터
  text: App Builder를 사용하여 타사 통합을 위한 셀프 서비스 앱 빌드
title: App Builder
---
## 개요 {#overview}

Datadog App Builder는 로우코드 애플리케이션 구축 플랫폼입니다. 사용자 친화적인 드래그 앤 드롭 인터페이스와 내장된 JavaScript 지원을 통해 내부 도구 개발을 간소화합니다. App Builder는 AWS 및 GitHub와 같은 인기 서비스와 통합되어 데이터를 활용하고 외부 API 및 데이터 스토어와 원활하게 연결할 수 있도록 합니다. App Builder는 Datadog의 기존 기능과 통합되어 중앙 집중식 컨텍스트를 제공하므로, 문제 해결에 사용하는 동일한 보기 화면 내에서 예방 조치를 취하거나 진행 중인 인시던트에 대응할 수 있습니다.

로컬 개발 워크플로우, 소스 제어 또는 여러 엔지니어 간의 협업이 필요한 더 복잡한 애플리케이션의 경우, [Datadog 앱][10]을 참조하여 코드로 앱을 구축하세요.

{{< img src="/actions/app_builder/app-builder-app.png" alt="App Builder의 앱" caption="App Builder의 앱" style="width:100%;" >}}

### 사용 사례 {#example-use-cases}
App Builder 앱으로 수행할 수 있는 몇 가지 예는 다음과 같습니다.
- 인시던트의 텍스트 설명과 리포지토리의 가장 최근 커밋 150개를 바탕으로 회귀의 가장 가능성 높은 원인을 식별합니다.
- PagerDuty 서비스 상태를 모니터링하여 인시던트 작업 중 전체 컨텍스트를 파악합니다.
- 사용자가 대시보드에서 직접 EC2 인스턴스를 관리할 수 있도록 합니다.
- 사용자가 S3 버킷의 콘텐츠를 탐색하고 확인할 수 있도록 합니다.
- PagerDuty 통합을 사용하여 조직 내 각 팀의 온콜 담당자가 누구인지 확인합니다.
- 특정 리포지토리의 각 PR 진행 상황을 요약합니다.

## App Builder와 액션이 작동하는 방식 {#how-app-builder-works-with-actions}

Datadog App Builder는 여러 통합 전반에 걸쳐 수백 가지 액션이 포함된 [Action Catalog][1]를 제공합니다. Action Catalog와 각 통합에 대한 연결 자격 증명은 [Datadog Workflow Automation][2]과 공유됩니다. 작업을 수행할 통합이 없는 경우, HTTP 요청 및 JavaScript 함수와 같은 일반 액션을 사용하여 앱에 필요한 모든 작업을 수행할 수 있습니다.

## 대시보드에서 직접 액션 수행 {#take-action-directly-from-dashboards}

앱 페이지에서 앱을 사용하거나 [대시보드 내에서 직접 액세스][6]할 수 있습니다. Datadog 앱 기능은 네이티브 대시보드 통합으로 작동하므로 대시보드에서 바로 데이터를 사용자 지정하고 작업을 수행할 수 있습니다.

{{< img src="/actions/app_builder/app-builder-embedded-dashboard-2.png" alt="대시보드에 임베드된 ECS 작업 밸런서 앱과 서비스 확장 버튼을 클릭하는 커서" caption="대시보드에 임베드된 ECS 작업 밸런서 앱과 앱의 버튼을 클릭하는 커서" style="width:100%;" >}}

### Datadog에서 만든 앱 {#apps-created-by-datadog}

Datadog에서 만든 앱은 통합 대시보드에 임베드된 앱을 의미합니다. 별도로 구축할 필요 없이 바로 작동하며, 연결만 선택하면 됩니다.

예를 들어, [EC2 통합 대시보드][7]는 EC2 인스턴스 관리 앱을 제공합니다. 대시보드를 로드하면 앱에 데모 데이터가 채워집니다.

{{< img src="/actions/app_builder/ootb-app-ec2-demo-data.png" alt="Datadog에서 만든 EC2 앱" caption="Datadog에서 만든 EC2 앱" style="width:100%;" >}}

자신의 데이터를 사용하여 앱을 이용하려면 {{< ui >}}\+ Connect Data{{< /ui >}}를 클릭한 다음, 새 연결을 만들거나 기존 연결을 선택하세요. 선택 항목을 저장하면 앱에 연결을 통한 데이터가 표시됩니다.

앱에서 {{< ui >}}Change Connection{{< /ui >}}을 클릭하여 선택한 연결을 변경할 수 있습니다.

## App Builder 개요 대시보드 {#app-builder-overview-dashboard}

App Builder 개요 대시보드는 Datadog 앱에 대해 상위 수준의 개요를 제공합니다. 대시보드를 찾으려면 [대시보드 목록][8]으로 이동하여 `App Builder Overview`를 검색하세요.

{{< img src="actions/app_builder/app-builder-overview-dashboard-2.png" alt="App Builder 개요 대시보드" caption="App Builder 개요 대시보드"style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][4]의 **#app-builder** 채널에 참여하세요.

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /ko/actions/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints
[4]: https://chat.datadoghq.com/
[5]: /ko/actions/app_builder/build/#build-an-app-from-a-blueprint
[6]: /ko/actions/app_builder/embedded_apps/#add-apps-to-your-dashboard
[7]: https://app.datadoghq.com/dash/integration/60
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/app-builder/apps/list
[10]: /ko/actions/datadog_apps/