---
aliases:
- /ko/security_platform/guide/how-appsec-works/
- /ko/security_platform/application_security/how-appsec-works/
- /ko/security/guide/how-appsec-works/
further_reading:
- link: /security/application_security/enabling/compatibility
  tag: 설명서
  text: 언어와 프레임워크 호환성에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: 블로그
  text: Datadog 애플리케이션 보안 소개
- link: /security/application_security/enabling/
  tag: 설명서
  text: 애플리케이션 보안 관리 실행
title: Datadog에서 애플리케이션 보안 관리가 작동하는 방식
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">애플리케이션 보안 관리는 선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}}에서 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요

Datadog 애플리케이션 보안 관리(ASM)는 코드 수준의 취약성과 애플리케이션의 비즈니스 로직을 악용하는 애플리케이션 수준의 공격 및 시스템을 노리는 모든 악의적 공격자에 대한 가시성을 제공합니다.

또한 ASM은 애플리케이션이 런타임에 사용하는 취약한 라이브러리 및 종속성을 통해 애플리케이션에 내장된 위험을 감지합니다.

Datadog APM은 각 애플리케이션 요청에 대한 트레이스라는 정보를 기록합니다. Datadog ASM은 APM과 동일한 추적 라이브러리를 사용하여 트래픽을 모니터링합니다. ASM은 알려진 공격 패턴과 일치하는 보안 트레이스를 기반으로 공격 시도에 플래그를 지정하거나 [비즈니스 로직 정보에 태그를 지정][25]합니다. Datadog이 서비스에 영향을 미치는 애플리케이션 공격이나 비즈니스 로직 악용을 감지하면 보안 신호가 자동으로 생성됩니다. 신호는 각 개별 공격 시도를 평가하는 대신 유의미한 위협을 식별합니다. 보안 신호 설정에 따라 Slack, 이메일 또는 PagerDuty로부터 알림을 받을 수 있습니다.

기존 WAF(웹 애플리케이션 방화벽)는 일반적으로 경계에 배포되며 애플리케이션 동작에 대한 컨텍스트가 없습니다. ASM은 애플리케이션에 내장되어 있어 추적 데이터에 액세스할 수 있으므로 위협을 더욱 효과적으로 찾아내고 분류할 수 있습니다. Datadog ASM은 WAF(웹 애플리케이션 방화벽)와 유사하지만 추가 애플리케이션 컨텍스트를 사용하여 신호 대 잡음비를 높이고 오탐지를 낮추는 알려진 공격 패턴을 활용합니다.

### 애플리케이션 공격에 노출된 서비스 식별

Datadog ASM [위협 관리][1]는 APM이 이미 수집한 정보를 사용하고 공격 시도가 포함된 추적에 플래그를 지정합니다. 애플리케이션 공격에 노출된 서비스는 APM에 포함된 보안 뷰 ([Service Catalog][2], [Service Page][3], [Traces][4])에서 강조 표시됩니다.

APM은 애플리케이션 트래픽 샘플을 수집하므로 서비스를 효과적으로 모니터링하고 보호하려면 추적 라이브러리에서 ASM을 활성화해야 합니다.

Datadog 위협 모니터링 및 탐지는 모든 요청에 ​​대해 클라이언트 IP 주소와 수동으로 추가된 사용자 태그를 수집하여 악의적인 공격자를 식별합니다.

<div class="alert alert-info"><strong>1-클릭 활성화</strong><br>
<a href="/agent/remote_config/#enabling-remote-configuration">원격 설정이 활성화된 Agent와 이를 지원하는 추적 라이브러리 버전</a>으로 서비스가 실행 중인 경우 Agent 또는 추적 라이브러리를 추가로 설정하지 않고도 Datadog UI에서 <a href="/security/application_security/enabling/">ASM을 활성화</a>할 수 있습니다.</div>

### 취약한 서비스 식별

Datadog [소프트웨어 구성 분석][5]은 오픈 소스 소프트웨어 라이브러리와 관련된 다양한 알려진 취약성 데이터 소스와 Datadog 보안 연구팀이 제공하는 정보를 사용하여 애플리케이션이 런타임에 의존하는 라이브러리와 잠재적 취약성을 비교하고, 해결책을 제시합니다.

## 호환성

Datadog ASM이 Datadog 설정과 호환되려면 APM을 활성화하고 [트레이스를 Datadog으로 전송][6]해야 합니다. ASM은 APM에서 사용하는 것과 동일한 라이브러리를 사용하므로 다른 라이브러리를 배포하고 유지 관리할 필요가 없습니다. Datadog ASM을 활성화하는 단계는 런타임 언어에 따라 다릅니다. [ASM 필수 구성 요소][7]에서 해당 언어가 지원되는지 확인하세요.

### 서버리스 모니터링

AWS Lambda용 Datadog ASM은 사용자의 기능을 표적으로 삼는 공격자에 대해 심층적인 가시성을 제공합니다. 분산 트레이스를 통해 공격에 대한 자세한 컨텍스트를 파악할 수 있으므로 영향을 평가하고 위협을 효과적으로 해결할 수 있습니다.

설정에 대한 자세한 내용은 [서버리스용 ASM 활성화][8]를 참조하세요.

## 성능

Datadog ASM은  Agent 및 APM에 이미 포함된 프로세스를 사용하므로 사용 시 성능에 미치는 영향은 미미합니다. APM이 활성화되면 Datadog 라이브러리가 분산 트레이스를 생성합니다. Datadog ASM은 알려진 공격 패턴을 사용하여 트레이스에서 보안 활동에 플래그를 지정합니다. 공격 패턴과 분산 트레이스에서 제공하는 실행 컨텍스트 간의 상관관계는 탐지 규칙에 따라 보안 신호를 트리거합니다.

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="다이어그램은 Datadog 트레이서 라이브러리가 애플리케이션 서비스 수준에서 작동하고 트레이스를 Datadog 백엔드로 보내는 것을 보여줍니다. Datadog 백엔드는 실행 가능한 보안 신호에 플래그를 지정하고 PagerDuty, Jira 또는 Slack과 같은 관련 애플리케이션에 알림을 보냅니다." >}}

## 데이터 샘플링 및 보존

추적 라이브러리에서 Datadog ASM은 보안 데이터를 포함하는 모든 트레이스를 수집합니다. 기본 [보존 필터][9]는 Datadog 플랫폼의 모든 보안 관련 트레이스를 보존합니다.

보안 트레이스를 위한 데이터는 90일 동안 보관됩니다. 기본 트레이스 데이터는 15일 동안 보관됩니다.

## 데이터 개인 정보 보호

기본적으로 ASM은 보안 트레이스에서 정보를 수집하여 의심스러운 것으로 분류된 요청을 이해하는 데 도움을 줍니다. 데이터를 보내기 전에 ASM은 데이터가 민감한 데이터임을 나타내는 패턴과 키워드를 검색합니다. 데이터가 민감한 것으로 간주되면 해당 데이터는 `<redacted>` 플래그로 대체됩니다. 이는 요청이 의심스럽지만 데이터 보안 문제로 인해 요청 데이터를 수집할 수 없음을 나타냅니다.

기본적으로 민감한 데이터로 플래그가 지정된 데이터의 몇 가지 예는 다음과 같습니다.
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

ASM에 의해 삭제되는 정보를 설정하려면 [데이터 보안 설정][17]을 참조하세요.

## 위협 탐지 방법

Datadog은 [OWASP ModSecurity 핵심 규칙 세트][12]를 포함한 여러 패턴 소스를 사용하여 HTTP 요청에서 알려진 위협과 취약점을 탐지합니다. HTTP 요청이 [OOTB 탐지 규칙][13] 중 하나와 일치하면 Datadog에서 보안 신호가 생성됩니다.

**자동 위협 패턴 업데이트:** 서비스가 [원격 설정이 활성화된 Agent 및 이를 지원하는 추적 라이브러리 버전][26]으로 실행 중인 경우 서비스를 모니터링하는 데 사용되는 위협 패턴은 Datadog이 업데이트를 게시할 때 마다 자동으로 업데이트됩니다. 

Datadog이 프로덕션 서비스를 표적으로 하는 심각한 공격을 감지하면 보안 신호가 자동으로 생성됩니다. 이는 공격자와 표적 서비스에 대한 가시성을 제공합니다. 알림을 받고 싶은 공격을 결정하기 위해 임계값이 포함된 커스텀 탐지 규칙을 설정할 수 있습니다.

## 내장형 보호

{{% asm-protect %}}


## 공격 시도 자격

분산된 추적 정보를 활용하여 공격 시도를 안전, 알 수 없음, 유해한 것으로 분류합니다.
* 예를 들어, Java로 작성된 서비스를 대상으로 PHP 삽입 공격을 하는 경우 안전한 것으로 평가된 공격 시도는 애플리케이션을 침해할 수 없습니다.
* 알 수 없는 경우는 공격의 성공 확률에 대한 최종 판단을 내릴 수 있는 정보가 충분하지 않은 경우 결정됩니다.
* 공격자가 코드 수준 취약점을 발견했다는 증거가 있는 경우 유해한 것으로 평가됩니다.



## 위협 모니터링 적용 범위


Datadog ASM에는 [다양한 종류의 공격][14]을 방어하는 데 도움이 되는 100개 이상의 공격 시그니처가 포함되어 있으며, 여기에는 다음 범주를 포함하되 이에 국한되지 않습니다:

* SQL 삽입
* Code 삽입
* Shell 삽입
* NoSQL 삽입
* 사이트 간 스크립팅 (XSS)
* 서버 측 요청 위조 (SSRF)

## 내장형 취약점 탐지

Datadog ASM은 오픈 소스 종속성에서 탐지된 취약점에 대해 경고하는 내장 탐지 기능을 제공합니다. 해당 정보에 대한 자세한 내용은 [취약성 탐색기][15]에 표시되어, 심각도, 영향을 받는 서비스, 잠재적으로 취약한 인프라스트럭처 및 복구 지침을 식별하여 표면화된 위험을 해결합니다.

자세한 내용은 [소프트웨어 구성 분석][5]을 참조하세요.

## API 보안

<div class="alert alert-info">API 보안은 비공개 베타 버전입니다.</div>

Datadog 애플리케이션 보안 관리(ASM)는 API를 표적으로 삼는 위협에 대한 가시성을 제공합니다. [API 카탈로그][27]를 사용하여 API 상태 및 성능 메트릭을 모니터링하고 API를 대상으로 하는 공격을 볼 수 있습니다. 이 보기에는 공격자의 IP 및 인증 정보는 물론 공격이 어떻게 형성되었는지에 대한 세부 정보를 보여주는 요청 헤더가 포함됩니다. ASM과 API 관리를 모두 사용하면 API 공격 현황에 대한 포괄적인 파악이 가능하며, 위협을 완화하기 위해 대응할 수 있습니다.

## Datadog ASM이 Log4Shell로부터 보호하는 방식

Datadog ASM은 Log4j Log4Shell 공격 페이로드를 식별하고 악성 코드를 원격으로 로드하려고 시도하는 취약한 앱에 대한 가시성을 제공합니다. [Datadog의 Cloud SIEM][16]을 통해 일반적인 악용 후의 활동을 식별하고, 공격 벡터로 작용할 수 있는 잠재적으로 취약한 Java 웹 서비스를 선제적으로 수정할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/threats/
[2]: /ko/tracing/service_catalog/#security-view
[3]: /ko/tracing/services/service_page/#security
[4]: /ko/tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /ko/security/application_security/software_composition_analysis/
[6]: /ko/tracing/trace_collection/
[7]: /ko/security/application_security/enabling/#prerequisites
[8]: /ko/security/application_security/enabling/serverless/
[9]: /ko/tracing/trace_pipeline/trace_retention/
[10]: /ko/tracing/configure_data_security/?tab=http
[11]: /ko/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /ko/security/default_rules/#cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm
[16]: /ko/security/cloud_siem/
[17]: /ko/security/application_security/threats/library_configuration/#data-security-considerations
[25]: /ko/security/application_security/threats/add-user-info#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[26]: /ko/agent/remote_config/#enabling-remote-configuration
[27]: /ko/tracing/api_catalog/