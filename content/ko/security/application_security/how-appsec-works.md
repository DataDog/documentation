---
aliases:
- /ko/security_platform/guide/how-appsec-works/
further_reading:
- link: /security_platform/application_security/setup_and_configure/#compatibility
  tag: 설명서
  text: 언어와 프레임워크 호환성에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: 블로그
  text: Datadog 애플리케이션 보안 소개
- link: /security_platform/application_security/getting_started/
  tag: 설명서
  text: 애플리케이션 보안 관리 시작하기
kind: 설명서
title: Datadog에서 애플리케이션 보안 관리가 작동하는 방법
---

## 개요

Datadog 애플리케이션 보안 관리(ASM)는 코드 수준 취약성을 악용하는 애플리케이션 수준 공격을 가시화해줍니다.

APM에서는 각 HTTP 요청에 대한 정보를 기록하는데, 이를 트레이스라고 합니다. Datadog ASM은 APM이 이미 수집하고 있는 정보를 사용해 알려진 공격 패턴과 일치하는, 의심스러운 공격 시도를 플래그합니다. 보안 신호는 의심스러운 요청의 집계입니다. 내 보안 신호 설정에 따라 Slack, 이메일, PagerDuty를 통해 알림을 받을 수 있습니다.

기본 WAF(Web Application Firewalls)의 경우 일반적으로 경계에서 배포되며 애플리케이션 작동 컨텍스트가 없습니다. ASM을 효과적으로 사용하려면 애플리케이션에 포함되어 데이터에 접근할 수 있어야 합니다. Datadog ASM의 경우 WAF(Web Application Firewall)와 같이 알려진 공격 패턴을 활용하나, 컨텍스트가 추가되어 신호 대 잡음비를 늘려 가양성 회수를 줄입니다.

## 호환성

Datadog ASM과 Datadog 설정이 호환되도록 하려면 APM을 활성화하고 [트레이스를 Datadog으로 전송][1]해야 합니다. ASM은 APM에서 사용하는 것과 동일한 라이브러리를 사용하므로 다른 라이브러리를 배포하고 유지 관리할 필요가 없습니다. Datadog ASM을 활성화하는 단계는 런타임 언어에 따라 다릅니다. [ASM 필수 구성 요소][2]에서 해당 언어가 지원되는지 확인하세요.

## 성능

Datadog ASM에서는 에이전트와 APM에 이미 포함된 프로세스를 사용하므로 사용 시 성능에 미치는 영향은 미미합니다. APM이 활성화되면 Datadog 라이브러리가 분산 트레이스를 생성합니다. Datadog ASM은 알려진 공격 패턴을 사용하여 트레이스에서 보안 활동에 플래그를 지정합니다. 공격 패턴과 분산 트레이스에서 제공하는 실행 컨텍스트 간의 상관관계는 탐지 규칙에 따라 보안 신호를 트리거합니다.

{{< img src="security_platform/application_security/How_Application_Security_Works_d1.png" alt="이 다이어그램은 Datadog 트레이서 라이브러리가 애플리케이션 서비스 수준에서 작동하고 트레이스를 Datadog 백엔드로 보내는 것을 보여줍니다. Datadog 백엔드는 실행 가능한 보안 신호에 플래그를 지정하고 PagerDuty, Jira, 또는 Slack과 같은 관련 애플리케이션에 알림을 보냅니다." >}}

## 데이터 개인 정보 보호

민감한 정보가 인덱싱되는 것을 방지할 수 있는 여러 방법이 있습니다. 추가 작업을 하려면 [커스텀 및 정적 스크러버][3]를 설정하고 [예외 필터][4]를 사용하세요.


**참고**: Datadog ASM에서는 민감한 정보나 Pll을 자동으로 난독 처리하지 않습니다. Datadog로 민감한 데이터가 전송되지 않도록 하려면 [데이터 보안을 위해 Datadog 에이전트나 트레이서를 구성][3]하세요.

인덱싱된 민감 데이터를 삭제하려면 지원팀에 문의하세요.

## 위협 탐지 방법

Datadog에서는 [OWASP ModSecurity 핵심 규칙 세트][5]를 포함한 여러 패턴 소스를 사용해 HTTP 요청에서 알려진 위협과 취약점을 탐지합니다. HTTP 요청이 [OOTB 탐지 규칙][6] 중 하나와 일치하면 Datadog에서 보안 신호가 생성됩니다.

보안 신호는 Datadog이 프로덕션 서비스를 대상으로 의미 있는 공격을 감지하면 자동으로 생성됩니다. 공격자와 대상 서비스에 대한 가시성을 제공합니다. 어떤 공격에 대해 알림을 받고 싶은지 결정하기 위해 임계값을 가진 커스텀 탐지 규칙을 설정할 수 있습니다.

## 커버리지

Datadog ASM에서는 공격 시도를 다음과 같은 위협 유형으로 구분합니다.

* **정규화되지 않은 공격**은 HTTP 요청이 알려진 공격 패턴과 일치하는 경우입니다. 예를 들어, 트레이스가 제공한 실행 컨텍스트와의 상관 관계 확인 결과 서비스의 비즈니스 로직과 상관 관계를 찾지 못한 경우입니다.
* **컨텍스트화된 공격**은 서비스에서 있었던 공격 시도가 비즈니스 로직과 일치하고 상관 관계가 있는 경우입니다. 예를 들어, SQL 문을 실행하는 서비스에서의 SQL 삽입 패턴이 있습니다.
* **취약성이 트리거됨**은 알려진 공격 패턴과 일치하고 공격 시도가 취약성을 악용한 증거가 있을 경우입니다.

Datadog ASM에는 [다양한 종류의 공격][7]을 방어하는 데 도움이 되는 100개 이상의 공격 패턴이 포함되어 있으며, 여기에는 다음 취약성이 포함되어 있습니다.

* SQL 주입
* Code 주입
* Shell 주입
* NoSQL 주입
* 사이트 간 스크립팅(XSS)
* 서버 측 요청 위조(SSRF)

## Datadog ASM이 Log4Shell로부터 보호하는 방법

Datadog ASM은 Log4j Log4Shell 공격 페이로드를 식별하고, 악성 코드를 원격으로 로드 시도하는 취약 앱에 대해 가시성을 제공합니다. [Datadog의 Cloud SIEM][8]과 함께 사용하면 일반적인 악용 후 활동을 확인할 수 있고, 공격 벡터로 작용할 가능성이 있는, 취약한 Java 웹 서비스를 선제적으로 수정할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/
[2]: /ko/security_platform/application_security/getting_started/#prerequisites
[3]: /ko/tracing/configure_data_security/?tab=http
[4]: /ko/security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
[5]: https://owasp.org/www-project-modsecurity-core-rule-set/
[6]: /ko/security_platform/default_rules/#cat-application-security
[7]: https://app.datadoghq.com/security/appsec/event-rules
[8]: /ko/security_platform/cloud_siem/