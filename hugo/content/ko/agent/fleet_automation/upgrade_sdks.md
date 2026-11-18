---
description: APM, Profiler 및 Dynamic Instrumentation을 구동하는 SDK를 원격으로 업그레이드하세요.
further_reading:
- link: /agent/fleet_automation/
  tag: 설명서
  text: Fleet Automation
site_support_id: fleet-automation-standard-features
title: SDK 업그레이드
---
{{< callout url="https://www.datadoghq.com/product-preview/remote-upgrade-of-sdk-versions/" btn_hidden="false" header="미리 보기에 참여하세요!" >}}
APM, Profiler, Dynamic Instrumentation 등을 구동하는 SDK를 원격으로 업그레이드하세요. 미리 보기에 참여하려면 액세스 권한을 요청하세요.
{{< /callout >}}

Fleet Automation은 APM, Continuous Profiler, Dynamic Instrumentation 등을 구동하는 SDK에 대한 원격 업그레이드를 중앙에서 관리할 수 있습니다. 서비스의 SDK 버전을 최신 상태로 유지하면 최신 기능, 성능 개선, 버그 수정 및 보안 업데이트의 이점을 누릴 수 있습니다.

<div class="alert alert-info">
SDK 업그레이드 예약은 지원되지 않습니다.
</div>

## 전제 조건 {#prerequisites}

- 서비스는 [Single Step Instrumentation(SSI)][1]로 계측되어야 합니다.
- 서비스는 Linux 또는 Windows VM에서 실행 중이어야 합니다. 컨테이너화된 환경 또는 Kubernetes 환경에서의 원격 SDK 업그레이드는 지원되지 않습니다.

## SDK 버전 업그레이드 {#upgrade-sdk-versions}

1. Fleet Automation에서 [Upgrades][2] 탭을 열고 {{< ui >}}Upgrade Now{{< /ui >}}를 클릭합니다.

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="Upgrade Now 버튼이 있는 Upgrades 탭입니다." style="width:100%;" >}}

1. {{< ui >}}SDK language{{< /ui >}} 및 {{< ui >}}version{{< /ui >}}을 선택합니다. 한 번에 하나의 언어 SDK만 업데이트할 수 있습니다.

   {{< img src="agent/fleet_automation/sdk-upgrade-language.png" alt="SDK 언어 및 버전 선택 드롭다운입니다." style="width:100%;" >}}

1. 업그레이드할 호스트를 선택합니다. 호스트 정보 또는 태그를 기준으로 필터링하여 특정 그룹을 대상으로 지정합니다.

   {{< img src="agent/fleet_automation/sdk-upgrade-hosts.png" alt="업그레이드할 서비스 목록을 좁히기 위한 필터링 옵션이 있는 서비스 선택 화면입니다." style="width:100%;" >}}

1. 배포 계획을 검토하고 {{< ui >}}Upgrade Hosts{{< /ui >}}를 클릭하여 업그레이드를 시작합니다.

   {{< img src="agent/fleet_automation/sdk-upgrade-plan.png" alt="SDK 업그레이드를 위해 준비된 서비스 목록을 보여주는 배포 계획 화면입니다." style="width:100%;" >}}

1. 서비스를 다시 시작하여 업그레이드된 SDK를 사용합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[2]: https://app.datadoghq.com/fleet/agent-upgrades