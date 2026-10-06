---
aliases:
- /ko/sensitive_data_scanner/scanning_rules
description: Sensitive Data Scanner가 미리 정의된 라이브러리 규칙과 텔레메트리 데이터 및 클라우드 스토리지를 위한 사용자
  지정 정규식 규칙을 포함하여 스캐닝 규칙을 사용해 민감한 데이터를 일치시키는 방법을 설명합니다.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: 블로그
  text: Sensitive Data Scanner에서 ML을 사용하여 로그의 인명 감지
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: 블로그
  text: Cloudcraft를 사용하여 보안 리스크를 시각적으로 식별하고 우선순위 지정
title: Sensitive Data Scanner 규칙
---
## 텔레메트리 데이터 {#telemetry-data}
텔레메트리 데이터를 위한 Sensitive Data Scanner는 스캐닝 규칙을 사용하여 데이터 내에서 일치시킬 민감한 정보를 결정합니다. 이 데이터는 애플리케이션 로그, APM 스팬, RUM 이벤트 및 Event Management의 이벤트에서 가져올 수 있습니다. Datadog의 [Scanning Rule Library][1]를 사용하여 규칙을 만들거나 [사용자 지정 규칙][2]을 만들 수 있습니다.

Datadog의 Scanning Rule Library에는 이메일 주소, 신용카드 번호, API 키, 인증 토큰, 네트워크 및 장치 정보 등과 같은 일반적인 패턴을 감지하는 미리 정의된 스캐닝 규칙이 포함되어 있습니다. 자세한 내용은 [라이브러리 규칙][1]을 참조하십시오.

정규식(regex) 패턴을 사용하여 일치시키려는 민감한 정보를 정의하는 사용자 지정 스캐닝 규칙을 만들 수도 있습니다. 자세한 내용은 [사용자 지정 규칙][2]을 참조하십시오.

## 클라우드 스토리지 {#cloud-storage}

클라우드 스토리지를 위한 Sensitive Data Scanner도 스캐닝 규칙을 사용하여 데이터 내에서 일치시킬 민감한 정보를 결정합니다. Datadog 스캐닝 라이브러리의 모든 규칙이 적용되며 편집할 수 없습니다. 자세한 내용은 [라이브러리 규칙][1]을 참조하십시오.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/
[2]: /ko/security/sensitive_data_scanner/scanning_rules/custom_rules/