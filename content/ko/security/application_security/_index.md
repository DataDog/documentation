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
  text: 보안 위협 관리
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

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})에 대해 애플리케이션 보안 관리가 지원되지 않습니다.</div>
{{< /site-region >}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="공격 흐름과 플레임 그래프를 표시하는 Datadog의 보안 신호 패널" width="75%">}}

Datadog 애플리케이션 보안 관리(ASM)는 서버 측 요청 위조(SSRF), SQL 삽입, Log4Shell 및 반사형 크로스 사이트 스크립팅(XSS)과 같은 코드 수준 취약성을 이용하려는 애플리케이션 수준 공격에 대한 보호 기능을 제공합니다. 서버, Docker, Kubernetes, Amazon ECS 및 (지원되는 언어의) AWS Fargate에서 직접 호스팅되는 앱을 모니터링하고 보호할 수 있습니다.

ASM은 Datadog[추적 라이브러리][1]와 [Datadog Agent][2]를 활용해 애플리케이션 공격에 노출된 서비스를 파악합니다. 일단 설정되면 ASM은 인앱 감지 규칙을 활용하여 애플리케이션 환경의 위협을 탐지 및 보호하고 공격이 프로덕션 시스템에 영향을 미치거나 코드에서 취약점이 트리거될 때마다 보안 신호를 보냅니다.

위협이 감지되면, 보안 신호가 Datadog에서 생성됩니다. `HIGH` 또는 `CRITICAL` 심각도의 보안 신호의 경우 알림이 Slack, 이메일 또는 PagerDuty를 통해 팀에 전송되어 실시간으로 위협에 대한 컨텍스트를 제공합니다.

보안 신호가 트리거되면 신속하게 방향을 전환하여 Datadog에서 조사하고 보호하세요. ASM 및 APM 분산 추적이 제공하는 심층적인 관찰 가능 데이터를 한 눈에 확인하여 애플리케이션 문제를 해결하세요. 공격 흐름을 분석하고, 플레임 그래프를 보고, 상관 관계가 있는 트레이스 및 로그 데이터를 검토하여 애플리케이션 취약점을 찾아냅니다. 동일한 패널 내에서 애플리케이션 데이터를 교정 및 완화 단계로 이동하여 컨텍스트 전환을 제거합니다.


ASM을 통해 지속적인 트레이스 데이터의 노이즈를 제거하고 환경 보호와 방어에 집중할 수 있습니다.

애플리케이션 코드의 잠재적인 취약성을 완전히 교정할 때까지 ASM을 사용하면 클릭 한 번으로 IP를 일시적 또는 영구적으로 차단하여 공격자의 속도를 늦출 수 있습니다.

## Datadog에 애플리케이션 보안이 구현되는 방식 알아보기 

애플리케이션 보안 관리가 어떻게 구성되어 있는지, 추적 데이터를 사용하여 보안 문제를 식별하는 방법이 궁금하다면 [애플리케이션 보안 관리 작동 방식][3]을 참고하세요.

## 환경 설정

제공된 [기본 규칙][4]을 기반으로 하는 ASM은 수동 설정 없이 위협을 감지합니다. 물리적 또는 가상 호스트에 Datadog [APM][1]이 이미 설정되어 있는 경우 설정을 시작하려면 하나의 환경 변수만 설정하면 됩니다.

ASM을 사용하여 위협을 감지하고 보호하도록 환경 설정을 시작하려면 [활성화 관련 설명서][5]를 따르세요. ASM이 설정되면 [보안 신호 탐색기][6]에서 보안 신호를 조사하고 해결할 수 있습니다.

## 보안 신호 조사 및 해결

[보안 신호 탐색기][6]에서 보안 신호를 클릭하면 발생한 상황과 공격을 완화하기 위한 제안 단계를 확인할 수 있습니다. 동일한 패널에서 상호 연관된 공격 흐름과 함께 추적을 확인하고 추가 컨텍스트를 얻기 위해 정보를 요청합니다.

## 업스트림 오픈 소스 라이브러리 및 종속성에서 발생한 리스크 조사

[애플리케이션 취약성 관리][8]는 알려진 취약성이 있는 오픈 소스 라이브러리를 사용하거나 이에 종속되어 있어 서비스가 위험에 처한 경우를 보여줍니다. 발견된 취약점을 조사하고 수정 조언을 따르거나 취약점의 원인을 조사하여 소프트웨어를 보호하세요.

## 다음 단계

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/
[2]: /ko/agent/
[3]: /ko/security/application_security/how-appsec-works/
[4]: /ko/security/default_rules/#cat-application-security
[5]: /ko/security/application_security/enabling/
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /ko/security/application_security/vulnerability_management/