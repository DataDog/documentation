---
description: Fleet Automation에서 지원하는 Agent 구성 필드에 대한 참조입니다.
further_reading:
- link: /agent/fleet_automation/
  tag: 설명서
  text: Fleet Automation
- link: /agent/fleet_automation/configure_agents/
  tag: 설명서
  text: Agent 구성
- link: /api/latest/fleet-automation/
  tag: 설명서
  text: Fleet Automation API
site_support_id: fleet-automation-standard-features
title: 지원되는 datadog.yaml 구성 필드
---
Fleet Automation은 [Agent를 구성][1]할 때 `datadog.yaml` 필드의 하위 집합을 지원합니다. 제공하는 모든 변경 사항은 스키마에 따라 유효성이 검사되며, 여기에 나열되지 않은 필드는 스키마 유효성 검사 오류와 함께 거부됩니다.

아래 섹션을 확장하여 지원되는 각 필드의 유형, 설명 및 유효한 값을 확인하십시오.

{{% fa-config-fields %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/fleet_automation/configure_agents/