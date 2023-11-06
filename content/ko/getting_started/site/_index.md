---
algolia:
  tags:
  - 사이트
  - Datadog 사이트
further_reading:
- link: https://learn.datadoghq.com/courses/dd-201
  tag: 학습 센터
  text: 'Datadog 201: 파워 유저 되기'
- link: /agent/configuration/dual-shipping/
  tag: 가이드
  text: 이중 배송
kind: 설명서
title: Datadog 사이트 시작하기
---

## 개요

Datadog는 전 세계에서 다양한 사이트를 제공합니다. 각 사이트는 완전히 독립적으로 운영되며, 사이트별로 데이터를 공유할 수 없습니다. 각 사이트마다 혜택을 제공하거나(정부 보안 규제 등), 세계 어디든 원하는 위치에 저장할 수 있도록 지원합니다.

## Datadog 사이트 액세스

아래 표에 안내된 사이트 URL 중에서 내  Datadog 웹사이트 URL과 동일한 것을 찾아 어떤 사이트에 있는지 확인할 수 있습니다.

{{< img src="getting_started/site/site.png" alt="브라우저 탭에 있는 사이트 URL" style="width:40%" >}}

| 사이트    | 사이트 URL                    | 사이트 파라미터      | 위치 |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU       |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | 일본 |

**참고**: 여러 엔드포인트를 통해 둘 이상의 목적지로 데이터를 보내려면 [이중 배송][2] 가이드를 참고하세요.

## SDK 도메인

[SDK 도메인에 지원되는 엔드포인트][3]을 참고하세요.

## 사이트별 Datadog 설명서 탐색

인스턴스의 보안 요구사항에 따라 Datadog 사이트가 서로 다른 기능을 지원할 수 있습니다. Datadog 설명서의 페이지 오른쪽에 있는 사이트 선택기 드롭다운 메뉴에서 Datadog 사이트를 선택해 정보를 볼 수 있습니다.

{{< img src="getting_started/site/site-selector.png" alt="설명서 사이트 우측 메뉴 드롭다운에 있는 사이트 선택기" style="width:100%" >}}

예를 들어 정부 사이트용 Datadog 설명서를 보려면 **US1-FED**를 선택합니다.

{{% site-region region="gov" %}}

## 정부 사이트용 Datadog 액세스

정부 사이트용 Datadog(US1-FED)는 미국 정부 기관과 파트너가 애플리케이션 및 인프라스트럭처를 모니터링할 수 있도록 고안된 버전입니다. 정부 사이트용 Datadog의 보안, 규범 준수, 프레임워크와 관련한 자세한 내용과 FedRAMP 지원 방법은 [보안 페이지][1]을 참고하세요.

[1]: https://www.datadoghq.com/security/
{{% /site-region %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/agent/configuration/dual-shipping/
[3]: /ko/real_user_monitoring/#supported-endpoints-for-sdk-domains