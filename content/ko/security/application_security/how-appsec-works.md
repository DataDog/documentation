---
aliases:
- /ko/security_platform/guide/how-appsec-works/
- /ko/security_platform/application_security/how-appsec-works/
- /ko/security/guide/how-appsec-works/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: 블로그
  text: Datadog Application Security 소개
title: Datadog Application Security 작동 방법
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management는 선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요

Datadog Application Security는 코드 수준 취약점이나 애플리케이션의 비즈니스 로직을 악용하려는 애플리케이션 수준 공격 및 시스템을 표적으로 삼는 모든 악의적인 행위자에 대한 옵저버빌리티를 제공합니다. 구체적인 기능은 다음과 같습니다.

- **공격에 대한 옵저버빌리티**: 코드 취약점 또는 비즈니스 로직을 표적으로 삼는 애플리케이션 수준 공격에 대한 인사이트를 제공합니다.
- **추적 기반 모니터링**: Datadog APM과 동일한 추적 라이브러리를 활용하여 트래픽을 모니터링하고 보안 위협을 탐지합니다.
- **보안 신호**: 개별 시도보다 의미 있는 위협에 초점을 맞춰 공격이나 비즈니스 로직 악용이 감지되면 자동으로 보안 신호를 생성합니다.
- **알림 옵션**: 보안 신호 설정에 따라 Slack, 이메일 또는 PagerDuty를 통해 알림을 제공합니다.
- **내장형 보안**: 애플리케이션 내에 통합되어 트레이스 데이터에 액세스하여 더 나은 위협 식별 및 분류를 제공합니다.
-**향상된 WAF 기능**: 향상된 Web Application Firewall(WAF) 기능으로 추가 애플리케이션 컨텍스트를 사용하여 정확성을 높이고 오탐지를 줄입니다.

### 애플리케이션 공격에 노출된 서비스 식별

Datadog Application Security [Threat Management][1]는 APM이 이미 수집한 정보를 사용하여 공격 시도가 포함된 트레이스에 플래그를 지정합니다. APM이 애플리케이션 트래픽 샘플을 수집하는 동안 서비스를 효과적으로 모니터링하고 보호하려면 추적 라이브러리에서 Application Security를 활성화해야 합니다.

애플리케이션 공격에 노출된 서비스는 APM ([Software Catalog][2], [Service Page][3], [Traces][4])에 내장된 보안 보기에서 강조 표시됩니다..

Datadog Threat Monitoring 및 Detection은 클라이언트 IP 주소, 로그인 계정 정보(예: 사용자 계정/ID) 및 모든 요청에 ​​대해 수동으로 추가된 사용자 태그를 수집하여 악의적인 행위자를 식별합니다.

<div class="alert alert-info"><strong>원클릭 활성화</strong><br>
<a href="/agent/remote_config/#enabling-remote-configuration">Remote Configuration이 활성화된 Agent와 이를 지원하는 추적 라이브러리 버전</a>으로 서비스가 실행 중인 경우 Agent 또는 추적 라이브러리를 추가로 구성하지 않고도 Datadog UI에서 <a href="https://app.datadoghq.com/security/configuration/asm/setup">Application Security를 활성화할 수 있습니다</a>.</div>

## 호환성

Datadog Applicatoin Security가 Datadog 구성과 호환되도록 하려면 APM과 [Datadog에 트레이스 전송][6]을 활성화해야 합니다. Application Security에서는 APM과 동일한 라이브러리를 사용하기 때문에 다른 라이브러리를 사용할 필요가 없습니다.

Datadog Application Security를 활성화하는 단계는 각 런타임 언어에 따라 다릅니다. 사용 중인 언어가 각 제품의 Datadog Application Security 요구 사항을 충족하는지 확인하세요.

## 서버리스 모니터링

AWS Lambda용 Application Security는 기능을 공격하는 공격자에 관한 정보를 상세하게 보여줍니다. 분산형 추적으로 공격에 관한 풍부한 컨텍스트를 통해 영향을 살펴볼 수 있고,  효과적으로 문제를 해결할 수 있습니다.

설정에 관한 정보는 [서버리스용 Application Security 활성화][8]를 참고하세요.

## 성능

Datadog Application Security에서는 에이전트와 APM에 이미 포함되어 있는 프로세스를 이용하기 때문에 사용할 때 성능에 큰 영향을 미치지 않습니다.

APM이 활성화되면 Datadog 라이브러리는 분산형 트레이스를 생성합니다. Datadog Application Security에서는 알려진 공격 패턴을 사용해 트레이스에서 보안 활동을 플래그 지정합니다. 분산형 트레이스가 제공하는 실행 컨텍스트와 공격 패턴을 연계하여 탐지 규칙을 기반으로 보안 신호를 트리거합니다.

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="다이어그램은 Datadog 추적기 라이브러리가 애플리케이션 서비스 수준에서 작동하고 트레이스를 Datadog 백엔드로 보내는 것을 보여줍니다. Datadog 백엔드는 실행 가능한 보안 신호에 플래그를 지정하고 PagerDuty, Jira 또는 Slack과 같은 관련 애플리케이션에 알림을 보냅니다." >}}

## 데이터 샘플링 및 보존 기간

Datadog Application Security는 추적 라이브러리에서 보안 데이터를 포함하는 모든 트레이스를 수집합니다. 기본 [보존 기간 필터][9]는 Datadog 플랫폼의 모든 보안 관련 트레이스에 대한 보존 기간을 보장합니다.

보안 트레이스에 대한 데이터는 90일 동안 보관됩니다. 기본 트레이스에 대한 데이터는 15일 동안 보관됩니다.

## 데이터 프라이버시

Application Security는 기본적으로 요청이 의심 활동으로 표시된 이유를 파악할 수 있도록 보안 트레이스에서 정보를 수집합니다. 데이터를 보내기 전에 데이터 민감성을 나타내는 패턴과 키워드를 검색합니다. 데이터가 민감한 것으로 간주되면 `<redacted>` 플래그로 대체됩니다. 이는 요청이 의심 활동으로 분류되었지만 데이터 보안 문제로 인해 요청 데이터를 수집할 수 없음을 나타냅니다.

기본적으로 민감한 것으로 플래그 지정되는 데이터 예시는 다음과 같습니다.
* `pwd`, `password`, `ipassword`, `pass_phrase`
* `secret`
* `key`, `api_key`, `private_key`, `public_key`
* `token`
* `consumer_id`, `consumer_key`, `consumer_secret`
* `sign`, `signed`, `signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

Application Security에서 수정되는 정보를 구성하려면 [데이터 보안 구성][17]을 참고하세요.

## 위협 탐지 방법

Datadog는 알려진 위협과 취약성을 탐지하기 위한 [OWASP ModSecurity 핵심 규칙 집합][12]을 포함해 다양한 패턴의 소스를 사용합니다. HTTP 요청이 [OOTB 탐지 규칙][13] 중 하나와 일치하면 Datadog에서 보안 신호가 생성됩니다.

**자동 위협 패턴 업데이트:** 서비스가 [원격 설정이 활성화된 에이전트 및 이를 지원하는 추적 라이브러리 버전][26]으로 실행 중인 경우 서비스를 모니터링하는 데 사용되는 위협 패턴은 Datadog에서 업데이트를 게시할 때마다 자동으로 업데이트됩니다.

Datadog이 프로덕션 서비스를 표적으로 하는 유의미한 공격을 탐지하면 보안 신호가 자동으로 생성됩니다. 공격자와 표적 서비스에 대한 가시성을 제공합니다. 알림을 받으려는 공격을 결정하기 위해 임계값이 포함된 커스텀 탐지 규칙을 설정할 수 있습니다.

## 내장된 보호 기능

{{% asm-protect %}}


## 공격 시도 자격

분산 추적 정보를 활용하여 공격 시도를 안전, 알 수 없음 또는 유해로 분류합니다.
* 안전한 것으로 검증된 공격 시도는 애플리케이션에 위해를 가할 수 없습니다. 예를 들어 PHP 삽입 공격이 자바(Java)로 작성된 서비스를 대상으로 하는 경우가 이에 해당합니다.
* 자격 중 알 수 없음은 공격의 성공 가능성에 대한 명확한 판단을 내릴 수 있는 정보가 충분하지 않을 때 결정됩니다.
* 자격 중 유해는 공격자가 코드 수준의 취약점을 발견했다는 증거가 있는 경우 강조 표시됩니다.



## 위협 모니터링 범위


Datadog Application Security에는 다음 범주를 포함하되 이에 국한되지 않는 [다양한 종류의 공격][14]을 방어하는 데 도움이 되는 100개 이상의 공격 서명이 포함되어 있습니다.

* SQL 삽입
* 코드 삽입
* 셸 삽입
* NoSQL 삽입
* 사이트 간 스크립팅(XSS)
* 서버 측 요청 위조(SSRF)

## API 보안

<div class="alert alert-info">API 보안은 평가판입니다.</div>

Datadog Application Security는 API를 표적으로 삼는 위협에 대한 가시성을 제공합니다. Software Catalog의 [엔드포인트 목록][27]을 사용하여 API 상태 및 성능 메트릭을 모니터링하고 API를 대상으로 하는 공격을 볼 수 있습니다. 이 보기에는 공격자의 IP 및 인증 정보는 물론 공격이 어떻게 이루어지는지에 대한 세부 정보를 보여주는 요청 헤더가 포함됩니다. Application Security과 API 관리를 모두 사용하면 API 공격에 대한 종합적인 관찰이 가능하며 위협을 완화하기 위해 대응할 수 있습니다.

##  Datadog Application Security로 Log4Shell 방어하는 방법

Application Security에서는 Log4j Log4Shell 공격 페이로드를 파악하고 악성 코드를 원격으로 로드하려고 시도하는 취약한 앱에 관한 가시성을 제공합니다. [Datadog 클라우드 SIEM][16]의 나머지 기능과 함께 사용하면, 남용 활동 후에 일반적으로 나타나는 증상을 조사 및 파악할 수 있고, 잠재적으로 취약하여 공격 벡터로 작동할 수 있는 자바 웹 서비스를 사전에 예방할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/threats/
[2]: /ko/tracing/software_catalog/#security-view
[3]: /ko/tracing/services/service_page/#security
[4]: /ko/tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /ko/security/code_security/software_composition_analysis/
[6]: /ko/tracing/trace_collection/
[8]: /ko/security/application_security/serverless/
[9]: /ko/tracing/trace_pipeline/trace_retention/
[10]: /ko/tracing/configure_data_security/?tab=http
[11]: /ko/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /ko/security/default_rules/?category=cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm/library
[16]: /ko/security/cloud_siem/
[17]: /ko/security/application_security/threats/library_configuration/#data-security-considerations
[25]: /ko/security/application_security/threats/add-user-info#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[26]: /ko/agent/remote_config/#enabling-remote-configuration
[27]: /ko/software_catalog/endpoints/
[28]: /ko/security/code_security/iast/
[29]: https://docs.datadoghq.com/ko/security/code_security/