---
aliases:
- /ko/security_platform/application_security
description: 모니터 위협 타겟팅 프로덕션 시스템으로 배포된 트레이스에서 제공된 실행 컨텍스트를 활용합니다.
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: 설명서
  text: 애플리케이션 보안 관리 작동 방법
- link: /security/application_security/threats/
  tag: 설명서
  text: 위협 모니터링 및 보호
- link: /security/application_security/risk_management/
  tag: 설명서
  text: 애플리케이션 취약성 관리
- link: /security/application_security/enabling/#compatibility
  tag: 설명서
  text: 언어와 프레임워크 호환성에 대해 자세히 알아보기
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: 제품 페이지
  text: Datadog 애플리케이션 보안 관리
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: 블로그
  text: Datadog 애플리케이션 보안 소개
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: 블로그
  text: Datadog ASM을 통한 서버리스 애플리케이션 보안
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: 블로그
  text: 클라우드 네이티브 환경 애플리케이션 보안 모범 사례
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: 블로그
  text: APM 보안 보기를 통해 리스크, 취약성, 공격에 대한 가시성 확보
- link: https://www.datadoghq.com/blog/block-attackers-application-security-management-datadog/
  tag: 블로그
  text: Datadog 애플리케이션 보안 관리를 통해 앱과 API에서 공격자 차단
- link: https://www.datadoghq.com/blog/threat-modeling-datadog-application-security-management/
  tag: 블로그
  text: Datadog 애플리케이션 보안 관리를 통한 위협 모델링
kind: 설명서
title: 애플리케이션 보안 관리
---

{{< img src="/security/application_security/app-sec-landing-page.png" alt="공격 흐름과 화염 그래프를 표시하는 Datadog 보안 신호 패널" width="75%">}}

Datadog 애플리케이션 보안 관리(ASM)는 SSRF(Server-Side-Request-Forgery), SQL 인젝션, Log4Shell 및 Reflected XSS(Cross-Site-Scripting) 등 코드 수준 취약성을 악용하려는 목적의 애플리케이션 수준 공격에 대한 보호를 제공합니다. 서버, 도커(Docker), 쿠버네티스(Kubernetes), AWS ECS 및 (지원되는 언어에 대한) AWS Fargate에 직접 호스팅된 앱을 모니터링하고 보호할 수 있습니다.

ASM은 Datadog[추적 라이브러리][1]와 [Datadog 에이전트][2]를 활용해 애플리케이션 공격에 노출된 서비스를 파악합니다. 설정되면 ASM은 인앱 감지 규칙을 활용하여 애플리케이션 환경의 위협을 방어하고 공격이 프로덕션 시스템에 영향을 미칠 때마다 또는 취약성이 코드에서 트리거되면 보안 신호를 전송합니다.

위협이 감지되면, 보안 신호가 Datadog에서 생성됩니다. `HIGH` 또는 `CRITICAL` 심각도 보안 신호의 경우 알림이 Slack, 이메일 또는 PagerDuty를 통해 팀에 전송되어 실시간 위협 컨텍스트를 제공합니다.

보안 신호가 트리거되면 Datadog에서 빠르게 조사하고 방어를 실시합니다. ASM과 APM 배포 트레이싱에서 제공한 심도 깊은 관측 가능성 데이터를 활용하여 단일 보기에서 애플리케이션 문제를 해결할 수 있습니다. 공격 흐름을 분석하고 화염 그래프를 확인하고 상관관계가 있는 트레이스와 로그 데이터를 검토하여 애플리케이션 취약성을 식별합니다. 애플리케이션 데이터를 모두 동일한 패널 내에서 교정 및 완화 단계로 이동시켜 컨텍스트 전환을 제거합니다.

ASM을 통해 지속적인 트레이스 데이터의 노이즈를 제거하고 환경 보호와 방어에 집중할 수 있습니다.

애플리케이션 코드에서 잠재적 취약성을 완벽히 해결할 때까지 ASM은 단일 클릭만으로도 일시적으로 또는 영구적으로 IP를 차단하여 공격자의 공격 속도를 늦춥니다. 원클릭 차단은 베타 버전에서 제공됩니다.

## Datadog에 애플리케이션 보안이 구현된 방법 이해

애플리케이션 보안 관리 체계와 트레이싱 데이터를 통해 보안 문제를 사용하는 방법이 궁금한 경우, [애플리케이션 보안 관리 작동 방법][3]을 읽어보세요.

## 환경 설정

제공된 [즉시 사용 가능한 규칙][4]을 통해 ASM은 수동 설정 없이 위협을 감지합니다. 이미 물리적 또는 가상 호스트에 설정된 Datadog[APM][1]이 있다면 단일 환경 변수만 설정하면 시작할 수 있습니다.

환경 설정을 시작하여 ASM을 통해 위협을 감지하고 보호하려면 [활성화 설명서][5]를 따르세요. ASM이 설정되면 [보안 신호 탐색기][6]에서 보안 신호를 조사하고 해결을 시작할 수 있습니다.

## 보안 신호 조사 및 해결

[보안 신호 탐색기][6]에서 보안 신호를 클릭해 발생한 사건을 확인하고 제안된 단계에 따라 공격을 완화합니다. 동일한 패널에서 상관관계가 있는 공격 흐름과 요청 정보를 통해 트레이스를 확인하여 더 자세한 컨텍스트를 확보합니다.

## 업스트림 오픈 소스 라이브러리 및 종속성에 도입된 리스크 조사

[애플리케이션 취약성 관리][8]는 서비스가 위험에 있을 때 표시됩니다. 서비스가 알려진 취약성이 있는 오픈 소스 라이브러리에 대한 종속성이 있거나 종속성을 사용하는 경우 발생합니다. 다음 해결 조언을 따르거나 취약성 원인을 조사하여 취약성 발견 사항을 조사하고 소프트웨어를 보호하세요.

## 다음 단계

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/
[2]: /ko/agent/
[3]: /ko/security/application_security/how-appsec-works/
[4]: /ko/security/default_rules/#cat-application-security
[5]: /ko/security/application_security/enabling/
[6]: /ko/security/explorer/
[7]: https://dashcon.io/appsec
[8]: /ko/security/application_security/risk_management/