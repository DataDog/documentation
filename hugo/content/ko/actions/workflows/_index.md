---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /ko/workflows
- /ko/service_management/workflows
description: 인프라 및 도구 전반의 작업을 연결하는 워크플로를 통해 엔드투엔드 프로세스를 오케스트레이션하고 자동화하세요.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: 설명서
  text: Workflow Automation 시작
- link: https://learn.datadoghq.com/courses/automating-meaningful-actions
  tag: 학습 센터
  text: Datadog Workflow Automation으로 의미 있는 작업을 자동화하기
- link: https://www.datadoghq.com/blog/cloud-siem-cases/
  tag: 블로그
  text: Datadog Cloud SIEM의 Case Management를 통해 보안 신호를 구조화된 조사로 전환하기
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: 블로그
  text: Datadog과 ServiceNow ITSM을 통합하여 Incident Response 가속화하기
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: 블로그
  text: Datadog Forms를 사용하여 엔지니어링 조직 전반에서 피드백을 작업으로 전환하기
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: 블로그
  text: Datadog 워크플로를 통해 엔드투엔드 프로세스를 자동화하고 이벤트에 신속히 대응하기
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: 블로그
  text: Datadog 워크플로 및 Cloud SIEM으로 일반적인 보안 작업을 자동화하고 위협에 대비하기
- link: https://www.datadoghq.com/blog/soar/
  tag: 블로그
  text: Datadog SOAR 워크플로를 통해 ID 보호, 위협 억제, 위협 인텔리전스 자동화하기
- link: https://www.datadoghq.com/blog/azure-workflow-automation/
  tag: 블로그
  text: Datadog Workflow Automation를 통해 Azure 애플리케이션의 문제를 빠르게 해결하기
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: 블로그
  text: AI 어시스턴트를 통해 몇 분 이내에 Datadog 워크플로 및 앱을 구축하기
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: 블로그
  text: Datadog Workflow Automation, Datastore, App Builder를 통해 반복 작업을 자동화하는 단일 앱을
    개발한 방법
- link: https://www.datadoghq.com/blog/datadog-agent-builder/
  tag: 블로그
  text: 'Bits Agent Builder 소개: 경보 대응 및 해결을 위한 에이전틱 워크플로 구축'
- link: https://www.datadoghq.com/blog/build-datadog-workflows-ai-agents/
  tag: 블로그
  text: Bits Chat 또는 AI 에이전트에서 Datadog 워크플로를 구축 및 실행하기
title: Workflow Automation
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/852419580/rendition/1080p/file.mp4?loc=external&signature=fb7ae8df018e24c9f90954f62ff3217bc1b904b92e600f3d3eb3f5a9d143213e" poster="/images/poster/workflow_automation.png" >}}

Datadog Workflow Automation을 사용하면 엔드투엔드 프로세스를 오케스트레이션하고 자동화할 수 있습니다. 인프라와 도구에 연결되는 [작업][1]으로 구성된 워크플로를 구축하세요. 이러한 작업을 통해 데이터 및 논리 연산을 수행할 수 있으므로 분기, 결정, 데이터 작업을 포함하는 복잡한 흐름을 구축할 수 있습니다.

## 워크플로 작업 구성 {#configure-workflow-actions}

Datadog Workflow Automation은 여러 도구 전반에서 2,000개 이상의 작업을 제공하며, HTTP 작업 및 자바스크립트(JavaScript) 데이터 연산자등의 워크플로 전용 작업도 제공합니다. 이러한 작업을 통해 흐름에 필요한 모든 작업을 수행할 수 있습니다.

## 청사진으로 시작하기 {#start-with-blueprints}

Datadog은 즉시 사용 가능한 [청사진][2] 형태로 사전 구성된 흐름을 제공합니다. 수십 개의 청사진을 통해 인시던트 관리, DevOps, 변경 관리, 보안, 문제 해결과 관련된 프로세스를 구축할 수 있습니다.

## 중요한 작업 자동화 {#automate-critical-tasks}

모니터, 보안 신호, 대시보드에서 워크플로를 트리거하거나 수동으로 트리거합니다. 이러한 유연성을 통해 시스템 상태에 영향을 미치는 문제를 인지하는 즉시 적절한 워크플로를 적용해 대응할 수 있습니다. Datadog Workflow Automation으로 중요한 작업을 자동화할 경우, 해결 시간을 단축하고 오류 발생 가능성을 줄임으로써 시스템을 안정적으로 유지할 수 있습니다.

## 워크플로 개요 대시보드 {#workflows-overview-dashboard}

워크플로 개요 대시보드는 Datadog 워크플로 및 실행에 관해 상위 수준의 개요를 제시합니다. 대시보드를 찾으려면 [대시보드 목록][3]으로 이동하여 `Workflows Overview`를 검색하세요.

{{< img src="actions/workflows/workflows-dashboard.png" alt="워크플로 개요 대시보드" style="width:100%;" >}}

## 예시 {#examples}

다음은 구축할 수 있는 워크플로우의 몇 가지 예시입니다.
- 자동 스케일링 그룹 중 중요한 메트릭을 추적하는 모니터링이 경고 상태로 전환되면 AWS 자동 스케일링 그룹을 자동으로 스케일링합니다.
- Security Signals가 탐지한 악성 IP에 대한 조사 노트북을 자동으로 생성한 다음, 버튼 클릭 한 번으로 CloudFlare에서 해당 IP를 차단합니다.
- 시스템 상태를 추적하는 데 사용하는 대시보드에서 직접 애플리케이션의 안정 버전으로 롤백하는 워크플로를 실행합니다.
- GitHub에서 기능 플래그 구성 파일을 자동으로 업데이트하고, 풀 리퀘스트 및 병합 프로세스를 자동화하여 기능 플래그를 관리합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][4]의 **#workflows** 채널에 참여하세요.

[1]: /ko/actions/actions_catalog/
[2]: /ko/workflows/build/#build-a-workflow-from-a-blueprint
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://chat.datadoghq.com/