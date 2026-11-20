---
description: 인라인과 사전 구성된 Deployment Gates를 비교하고 선택한 구성 소스에 맞는 설정 절차를 따르십시오.
further_reading:
- link: /api/latest/deployment-gates
  tag: API 참조
  text: Deployment Gates API 참조
title: Deployment Gates 설정
---
Deployment Gates가 정의되는 위치를 선택한 다음 설정 지침을 따르십시오. 인라인 게이트와 사전 구성된 게이트의 차이점은 [게이트 구성이 저장되는 위치][1]를 참조하십시오.

{{< whatsnext desc="Deployment Gates 설정:" >}}
    {{< nextlink href="/deployment_gates/setup/inline" >}}<u>Inline</u>: Datadog에서 별도로 설정하지 않고 배포 구성에서 게이트와 규칙을 정의합니다.{{< /nextlink >}}
    {{< nextlink href="/deployment_gates/setup/preconfigured" >}}<u>Preconfigured</u>: UI, API 또는 Terraform을 사용하여 Datadog에서 게이트와 규칙을 생성합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/deployment_gates/#where-gate-configurations-are-stored