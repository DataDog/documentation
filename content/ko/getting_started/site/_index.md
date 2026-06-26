---
algolia:
  tags:
  - site
  - datadog site
description: 지역 및 보안 요구 사항에 따라 다양한 Datadog 사이트(정부 규정을 준수하는 옵션 포함)에 대해 알아보세요.
further_reading:
- link: https://learn.datadoghq.com/courses/dashboards-slos
  tag: 학습 센터
  text: 대시보드 및 SLO를 사용하여 비즈니스 크리티컬 인사이트 생성
- link: /agent/configuration/dual-shipping/
  tag: 길라잡이
  text: Dual Shipping
title: Datadog 사이트 시작하기
---
## 개요 {#overview}

Datadog은 전 세계에 다양한 사이트를 제공합니다. 각 사이트는 완전히 독립적으로 운영되며 사이트 간 데이터 공유는 지원되지 않습니다. 각 사이트를 통해 정부 보안 규정 준수 등의 이점을 얻거나 전 세계 특정 위치에 데이터를 저장할 수 있습니다.

## 공유 책임 {#shared-responsibility}

사용자 데이터를 안전하게 보존할 책임은 Datadog와 Datadog 제품을 활용하는 개발자가 공유합니다.

Datadog는 다음에 대한 책임을 집니다.
- Datadog 플랫폼으로 전송 및 저장되는 데이터를 안전하게 처리하는 신뢰할 수 있는 제품 제공.
- 내부 정책에 따라 보안 문제 식별.

개발자는 다음에 대한 책임을 집니다.
- Datadog에서 제공하는 구성 값과 데이터 개인정보 보호 옵션을 적절히 활용.
- 자체 환경 내 코드 무결성 보장.

## Datadog 사이트 접속 {#access-the-datadog-site}

| 사이트    | 사이트 URL                    | 사이트 파라미터      | 위치 |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | 미국       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | 미국       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | 미국       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU(독일) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | 미국       |
| US2-FED | `https://us2.ddog-gov.com`  | `us2.ddog-gov.com`  | 미국       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | 일본 |
| AP2     | `https://ap2.datadoghq.com` | `ap2.datadoghq.com` | 호주 |

사용자 지정 도메인(예: `demo.datadoghq.com`)을 사용하는 경우, 현재 사용 중인 사이트는 **My Preferences** 페이지 상단에서 확인할 수 있습니다.

{{< img src="getting_started/site/site-in-preferences.png" alt="Datadog의 My Preferences 페이지 상단에 조직 이름과 사이트 URL이 표시됩니다." style="width:80%" >}}

**My Preferences**으로 이동하려면, 왼쪽 하단 모서리에 있는 프로필 아바타를 클릭한 다음 메뉴에서 **My Preferences**를 선택합니다.

{{< img src="getting_started/site/my-preferences-menu.png" alt="Datadog 계정 메뉴는 왼쪽 하단 내비게이션에서 프로필 아바타를 클릭하여 접근할 수 있으며, 개인 설정 아래에 My Preferences 옵션이 표시됩니다." style="width:80%" >}}

여러 엔드포인트를 통해 데이터를 두 개 이상의 대상으로 전송하려면 [Dual Shipping][2] 가이드를 참조하세요.

## SDK 도메인 {#sdk-domains}

[SDK 도메인에 지원되는 엔드포인트][3]를 참조하세요.

## 사이트별 Datadog 설명서 탐색 {#navigate-the-datadog-documentation-by-site}

Datadog 사이트마다 인스턴스의 보안 요구 사항에 따라 지원 기능이 다를 수 있습니다. 따라서 설명서 내용도 사이트별로 차이가 있을 수 있습니다. Datadog 설명서 페이지 오른쪽의 사이트 선택기 드롭다운을 사용하여 정보를 알고자 하는 사이트의 설명서를 확인할 수 있습니다.

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="설명서 사이트 오른쪽에 있는 사이트 선택 드롭다운 메뉴" style="width:100%" >}}

예를 들어, 정부 사이트용 Datadog 설명서를 보려면 **US1-FED** 또는 **US2-FED**를 선택합니다.

## 정부용 Datadog 사이트 접속 {#access-the-datadog-for-government-sites}

### US1-FED {#us1-fed}

정부용 Datadog 사이트(US1-FED)는 Datadog의 FedRAMP Moderate 인증 사이트입니다. US1-FED는 미국 정부 기관 및 협력 기관이 애플리케이션과 인프라를 모니터링할 수 있도록 설계되었습니다. US1-FED의 보안 및 규정 준수 통제 및 프레임워크에 대한 정보와 FedRAMP 지원 방법에 대해서는 [Security 페이지][1]를 참조하세요.

### US2-FED {#us2-fed}

US2-FED는 현재 IL5 인증 절차가 진행 중인 정부용 Datadog 사이트입니다. US2-FED는 미국 정부 기관 및 협력 기관의 애플리케이션 및 인프라를 모니터링할 수 있도록 설계되었습니다. 자세한 내용은 [fedramp@datadoghq.com][4]으로 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/security/
[2]: /ko/agent/configuration/dual-shipping/
[3]: /ko/real_user_monitoring/#supported-endpoints-for-sdk-domains
[4]: mailto:fedramp@datadoghq.com