---
algolia:
  tags:
  - asm
  - App and API Protection
aliases:
- /ko/security_platform/application_security
- /ko/security/application_security/enabling/single_step
- /ko/security/application_security/enabling/compatibility
- /ko/security/application_security/enabling
- /ko/security/application_security/getting_started
- /ko/security/application_security/threats
- /ko/security/application_security/setup/standalone
description: 분산된 트레이스가 제공하는 실행 컨텍스트를 활용하여 프로덕션 시스템을 노리는 위협을 모니터링합니다.
further_reading:
- link: https://www.datadoghq.com/blog/secure-api-with-datadog
  tag: 블로그
  text: '검색부터 방어까지: Datadog App and API Protection으로 API 보안 확보'
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: App and API Protection의 작동 방식
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: 제품 페이지
  text: Datadog App and API Protection
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: 블로그
  text: APM Security View를 사용하여 위험, 취약성 및 공격에 대한 가시성 확보
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: 블로그
  text: Datadog로 AWS WAF 활동 모니터링
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: 블로그
  text: Datadog Security Inbox의 보안 위험 우선순위 지정 방법
- link: https://www.datadoghq.com/blog/understanding-your-waf/
  tag: 블로그
  text: 'WAF 이해: 웹 애플리케이션 보안의 일반적인 간극을 해결하는 방법'
- link: https://www.datadoghq.com/blog/mitigate-account-takeovers/
  tag: 블로그
  text: Datadog App and API Protection으로 계정 탈취 위험 완화
- link: https://learn.datadoghq.com/courses/app-protection-block-attacks
  tag: 학습 센터
  text: Application & API Protection으로 애플리케이션 공격 차단
title: App and API Protection
---
{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}

<div class="alert alert-info">
AI Guard는 미리 보기 상태입니다. AI 앱 및 에이전트를 위한 실시간 보안 안전 장치를 활용하세요. AI Guard는 프롬프트 인젝션, 제일브레이킹, 도구 오남용 및 민감한 데이터 추출 공격으로부터 실시간으로 AI 앱 및 에이전트를 보호하는 데 도움이 됩니다. 액세스를 요청하려면 이 <a href="https://www.datadoghq.com/product-preview/ai-security/">양식</a>을 작성하세요.
</div>

{{% /site-region %}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Datadog의 보안 신호 패널로, 여기에 공격 흐름 및 플레임 그래프가 표시됨" width="75%">}}

**App & API Protection(AAP)**은 애플리케이션 및 API에 대한 통합된 가시성 및 보안을 제공하여 최신 워크로드 전체의 위협을 탐지, 조사 및 예방하는 데 도움이 됩니다.

공개 API, 내부 서비스 또는 사용자에게 제공되는 애플리케이션 중 어느 것을 방어하든 AAP는 팀원들에게 실시간 OOTB 위협 탐지, 태세 평가 및 인앱 보호를 제공합니다.

<div class="alert alert-info">AAP는(구 Application Security Monitoring(ASM)) 이제 런타임 위협 탐지를 넘어 API 검색, 태세 관리 및 보호 기능도 포함하게 되었습니다.</div>

## 주요 기능 {#key-capabilities}

### API 검색 및 태세 관리 {#api-discovery-and-posture-management}

* 서비스로 인해 노출되는 모든 API를 자동으로 탐지합니다.  
* 보호되지 않거나, 문서화되지 않았거나 권한이 과도하게 허용된 엔드포인트를 식별합니다.  
* 특정 엔드포인트, 구성 오류 및 관측된 동작에 연결된 상세하고 컨텍스트가 포함된 발견 사항을 얻습니다.  
* 보안 모범 사례 및 규정 준수 프레임워크(예: OWASP API 상위 10개)에 따른 태세 규칙을 기준으로 API 구성을 평가합니다.
* [Endpoint Scanning][17]을 사용하여 엔드포인트 연결 가능성 및 인증을 확인합니다.

### 런타임 위협 탐지 및 보호 {#runtime-threat-detection-and-protection}

* 인젝션 공격, 계정 탈취 시도 및 애플리케이션 오남용과 같은 실시간 위협을 탐지합니다.  
* 복수 신호 공격 패턴을 실행 가능한 인사이트와 상호 연계합니다.  
* IP, 사용자 에이전트, 헤더 등 특성을 사용하여 인앱 WAF 규칙으로 악성 트래픽을 차단합니다.

## 사용 사례 {#use-cases}

* 프로덕션 API의 고객 데이터 보호  
* 자격 증명 스터핑 및 ATO 공격 탐지 및 차단  
* 팀 및 환경 전체에서 API 태세 규정 준수 유지  
* 상호 연계된 트레이스, 로그 및 보안 데이터를 사용하여 인시던트 조사

## Datadog의 AAP 구현 {#aap-implementation-in-datadog}

App and API Protection이 어떻게 구조화되는지, 추적 데이터를 사용하여 보안 문제를 어떻게 식별하는지 자세한 정보는 [App and API Protection 작동 방식][3]을 참조하세요.

## 환경 구성 {#configure-your-environment}

AAP는 제공된 [기본 제공 규칙][4]을 사용하여 수동 구성 없이 위협을 탐지합니다. 이미 물리적 호스트 또는 가상 호스트에 Datadog [APM][1]이 구성된 경우, [설정][16] 시 환경 변수 하나만 있으면 시작할 수 있습니다.

AAP로 환경을 구성하여 위협을 탐지 및 보호하려면 각 제품의 활성화 설명서대로 따르세요. AAP가 구성되고 나면 [보안 신호 탐색기][6]에서 보안 신호를 조사 및 해결할 수 있습니다.

## 보안 신호 조사 및 해결 {#investigate-and-remediate-security-signals}

[보안 신호 탐색기][6]에서 아무 보안 신호나 클릭하면 무슨 일이 발생했는지, 공격을 완화하려면 추천하는 단계는 무엇인지 확인할 수 있습니다. 같은 패널에서 트레이스 및 그와 상호 연계된 공격 흐름을 보고 자세한 컨텍스트를 얻으려면 정보를 요청하세요.

## 익스플로잇 방지 vs. 인앱 WAF {#exploit-prevention-vs-in-app-waf}

이 섹션에서는 익스플로잇 방지의 요약과 익스플로잇 방지가 인앱 웹 애플리케이션 방화벽(WAF) 규칙과 어떤 점에서 다른지 알아봅니다.

Datadog AAP에는 애플리케이션을 익스플로잇으로부터 보호하기 위한 [익스플로잇 방지][14] 및 [인앱 WAF][15] 기능이 포함되어 있습니다. 익스플로잇 방지는 인앱 WAF의 확장판입니다. 익스플로잇 방지는 인앱 WAF를 일차 방어선으로 활용하고 WAF가 놓친 공격을 차단합니다.

익스플로잇 방지는 런타임 애플리케이션 자체 보호(RASP) 기술을 활용하여 애플리케이션이 취약한 코드 경로와의 상호 작용을 요청하는지 판단한 다음, 특정 취약점 유형으로부터 보호합니다.

- SQL 인젝션(SQLi)
- 서버 측 요청 위조(SSRF)
- 로컬 파일 포함(LFI)
- 명령 인젝션

라이브러리 호환성에 관한 자세한 내용은 [익스플로잇 방지][13]를 참조하세요.

익스플로잇 방지는 요청에서 악성 패턴을 탐지하는 것 외에도 애플리케이션이 수행한 액션(실행한 SQL 쿼리, 액세스한 파일 등)을 추적한다는 점에서 인앱 WAF와 다릅니다. 익스플로잇 방지는 사용자 입력이 SQL 쿼리를 수정했는지 또는 파일을 불리하게 제한했는지 판단하여 차단할 수 있습니다. 

예를 들어 SQL 인젝션 공격의 경우, 공격자의 목표는 SQL 쿼리의 주도권을 장악해 그 의미를 변경하는 것입니다. 익스플로잇 방지는 SQL 쿼리가 실행되기 전에 구문 분석하고 쿼리에 사용자 파라미터가 있는지 검사합니다. 사용자 파라미터가 있는 경우, 익스플로잇 방지는 SQL 파서가 해당 파라미터를 SQL 토큰 여러 개로 해석했는지(SQL 쿼리의 의미를 변경함) 검사합니다. 그런 경우, 익스플로잇 방지는 해당 쿼리를 인젝션된 것으로 플래그합니다.

## AAP 비활성화 {#disable-aap}

AAP 또는 그 기능의 비활성화에 관한 자세한 내용은 다음을 참조하세요.

- [AAP 비활성화][10]

## 다음 단계 {#next-steps}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/
[2]: /ko/agent/
[3]: /ko/security/application_security/how-it-works/
[4]: /ko/security/default_rules/?category=cat-application-security
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /ko/security/code_security/software_composition_analysis/
[9]: /ko/security/code_security/
[10]: /ko/security/application_security/troubleshooting/#disabling-aap
[11]: /ko/security/application_security/troubleshooting/#disabling-software-composition-analysis
[12]: /ko/security/application_security/troubleshooting/#disabling-code-security
[13]: /ko/security/application_security/exploit-prevention/#library-compatibility
[14]: /ko/security/application_security/exploit-prevention/
[15]: /ko/security/application_security/waf-integration/
[16]: /ko/security/application_security/setup/
[17]: /ko/security/application_security/api_posture/endpoint_scanning/