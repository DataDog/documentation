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
  text: 위협 관리
- link: /security/application_security/software_composition_analysis/
  tag: 설명서
  text: 소프트웨어 구성 분석
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
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: 블로그
  text: Datadog를 통한 AWS WAF 활동 모니터링
kind: 설명서
title: 애플리케이션 보안 관리
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">애플리케이션 보안 관리는 선택한 <a href="/getting_started/site">Datadog 사이트</a>에서 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="공격 흐름과 화염 그래프를 표시하는 Datadog 보안 신호 패널" width="75%">}}

Datadog 애플리케이션 보안 관리(ASM)는 서버 측 요청 위조(SSRF), SQL 삽입, Log4Shell 및 반사형 크로스 사이트 스크립팅(XSS)과 같은 코드 수준 취약성을 이용하려는 애플리케이션 수준 공격에 대한 보호 기능을 제공합니다. 서버, Docker, Kubernetes, Amazon ECS 및 (지원되는 언어의) AWS Fargate에서 직접 호스팅되는 앱을 모니터링하고 보호할 수 있습니다.

ASM은 Datadog [트레이싱 라이브러리][1] 및 [Datadog 에이전트][2]를 활용하여 애플리케이션 공격에 노출된 서비스를 식별합니다 설정한 경우, ASM은 인앱 탐지 규칙을 활용해 애플리케이션 환경에서 위협을 탐지하고 위협으로부터 환경을 보호합니다. 또한 공격이 프로덕션 시스템에 영향을 미치거나 취약성이 코드에서 트리거되면 보안 신호를 보냅니다.

위협이 탐지되면 보안 신호가 Datadog에서 생성됩니다. `HIGH` 또는 `CRITICAL` 심각도 보안 신호의 경우 알림은 Slack, 이메일, PagerDuty를 통해 팀에 알리고 위협에 대한 실시간 컨텍스트를 제공합니다.

보안 신호가 트리거되면 Datadog에서 빠르게 조사와 보호에 집중합니다. ASM 및 애플리케이션 성능 모니터링(APM) 분산 트레이싱에서 제공하는 심도 깊은 관측 가능성 데이터를 활용하여 단일 뷰에서 애플리케이션 문제를 해결할 수 있습니다. 공격 흐름을 분석하고, 불꽃 그래프를 확인하고, 연결된 트레이스와 로그 데이터를 검토하여 애플리케이션 취약성을 확인합니다. 동일한 패널 내에서 모두 치료와 완화 단계로 애플리케이션 데이터를 보내 컨텍스트 전환을 제거하세요.

ASM을 통해 지속적인 트레이스 데이터의 노이즈를 제거하고 환경 보호와 방어에 집중할 수 있습니다.

애플리케이션 코드에서 잠재적인 취약성을 완전히 치료할 때까지 ASM은 단일 클릭으로 IP를 일시적으로 또는 영구적으로 차단하여 공격 속도를 늦춥니다.

## 애플리케이션 보안을 Datadog에 구축하는 방법 이해하기

애플리케이션 보안 관리가 구조화되는 방법, 그리고 트레이싱 데이터를 사용해 보안 문제를 식별하는 방법이 궁금하다면 [애플리케이션 보안 관리 작동 방법]][3]을 읽어보세요.

## 환경 설정

[즉시 사용 가능한 규칙][4] 제공 지원으로, ASM은 수동 설정 없이 위협을 탐지합니다. 이미 물리적 또는 가상 호스트에 Datadog [애플리케이션 성능 모니터링(APM)][1]이 설정되어 있다면 한 환경 병수를 설정하기만 하면 설치하고 시작할 수 있습니다.

환경 설정을 시작하여 ASM을 활용해 위협을 탐지하고 위협을 보호하려면 [설명서 사용하기][5]를 따릅니다. ASM이 설정되면 [보안 신호 탐색기][6]에서 보안 신호 조사와 치료를 시작할 수 있습니다.

## 보안 신호 조사 및 해결

[보안 신호 탐색기][6]에서 아무 보안 신호를 클릭하여 발생한 활동과 제안 단계를 확인하여 공격을 완화합니다. 동일한 패널에서 연계된 공격 흐름과 함께 트레이스를 확인하고 정보를 요청하여 추가 컨텍스트를 얻습니다.

## 업스트림 오픈 소스 라이브러리와 종속성에서 발견된 위협 조사

[소프트웨어 구성 분석(SCA)][8]은 알려진 취약점이 있는 오픈 소스 라이브러리를 사용하거나 이에 종속되어 있어 서비스가 위험에 처해 있을 때를 알려줍니다. 취약점을 조사하고 해당 도움말을 따르거나 취약점의 원인을 조사하여 소프트웨어를 보호하세요.

## 다음 단계

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/
[2]: /ko/agent/
[3]: /ko/security/application_security/how-appsec-works/
[4]: /ko/security/default_rules/?category=cat-application-security
[5]: /ko/security/application_security/enabling/
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /ko/security/application_security/software_composition_analysis/