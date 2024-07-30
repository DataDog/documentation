---
algolia:
  tags:
  - 워크플로우
  - 워크플로우
  - 워크플로우 자동화
aliases:
- /workflows
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: 설명서
  text: 워크플로우 자동화 시작
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: 블로그
  text: Datadog 워크플로를 통해 엔드투엔드 프로세스 자동화 및 이벤트에 신속하게 대응
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: 블로그
  text: Datadog 워크플로 및 Cloud SIEM으로 일반적인 보안 작업을 자동화하고 위협에 대비하세요.
- link: https://www.datadoghq.com/blog/azure-workflow-automation/
  tag: 블로그
  text: Datadog 워크플로우 자동화로 Azure 애플리케이션의 문제를 빠르게 해결하세요.
title: 워크플로우 자동화
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})는 워크플로우 자동화를 지원하지 않습니다.</div>
{{< /site-region >}}

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/852419580/rendition/1080p/file.mp4?loc=external&signature=fb7ae8df018e24c9f90954f62ff3217bc1b904b92e600f3d3eb3f5a9d143213e" poster="/images/poster/workflow_automation.png" >}}

Datadog 워크플로우로 자동화로 엔드 투 엔드 프로세스를 오케스트레이션 및 자동화할 수 있습니다. 인프라스트럭처 및 도구와 연결된 [작업][1]으로 구성된 워크플로우를 구축하세요. 이러한 작업으로 데이터 및 로직 작업도 수행할 수 있으므로 브랜치, 의사 결정 및 데이터 작업으로 복잡한 플로우를 구축할 수 있습니다.

## 워크플로우 작업 설정하기

Datadog 워크플로우 자동화는 여러 도구 전반에서 400개 이상의 작업을 제공하며, HTTP 작업 및 자바스크립트(Javascript) 데이터 연산자와 같은 워크플로우 전용 작업도 제공해 드립니다. 해당 작업을 통해 워크플로우에 필요한 모든 작업을 수행할 수 있습니다.

## 청사진으로 시작하기

Datadog은 즉시 사용 가능한 [블루프린트][2] 형식으로 사전 설정된 플로우를 제공해 드립니다. 수십 가지 블루프린트로 인시던트 관리, DevOps, 변경 관리, 보안 및 문제 해결을 중심으로 프로세스를 구축할 수 있도록 도와 드립니다.

## 중요한 작업 자동화

모니터링, 보안 시그널 또는 대시보드에서 워크플로우를 트리거하거나 수동으로 트리거할 수 있습니다. 이러한 유연성 덕분에 시스템 상태에 영향을 미치는 문제를 인지한 시점에 적합한 워크플로우로 대응할 수 있습니다. Datadog 워크플로우 자동화로 중요한 작업을 자동화하면, 문제 해결 시간을 단축하고 오류 발생 가능성을 줄임으로써 시스템 실행을 계속 유지할 수 있습니다.

## 워크플로우 개요 대시보드

워크플로우 개요 대시보드로 Datadog 워크플로우 및 실행에 관한 수준 높은 개요를 제공합니다. [대시보드 목록][3]으로 이동하거나 `Workflows Overview`를 검색하여 대시보드를 찾을 수 있습니다.

{{< img src="service_management/workflows/workflows-dashboard.png" alt="워크플로우 개요 대시보드" style="width:100%;" >}}

## 예시

다음은 구축할 수 있는 워크플로우의 몇 가지 예시입니다.
- 자동 스케일링 그룹 중 중요한 메트릭을 추적하는 모니터링이 경고 상태로 전환되면 AWS 자동 스케일링 그룹을 자동으로 스케일링합니다.
- 보안 시그널이 탐지한 악성 IP에 대한 조사 노트북을 자동으로 생성한 다음, 버튼 클릭 한 번으로 CloudFlare에서 해당 IP를 차단합니다.
- 시스템 상태를 추적하는 데 사용하는 대시보드에서 직접 애플리케이션의 안정 버전으로 롤백하는 워크플로우를 실행합니다.
- GitHub에서 기능 플래그 구성 파일을 자동으로 업데이트하고 풀 리퀘스트 및 병합 프로세스를 자동화하여 기능 플래그를 관리합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][4]의 **#workflows** 채널에 참여하세요.

[1]: /ko/service_management/workflows/actions_catalog/
[2]: /ko/workflows/build/#build-a-workflow-from-a-blueprint
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://datadoghq.slack.com/