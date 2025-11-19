---
disable_toc: false
further_reading:
- link: /security/application_security/how-appsec-works
  tag: 설명서
  text: 애플리케이션 보안 작동 방법
- link: /security/application_security/threats/
  tag: 설명서
  text: 위협 관리
- link: /security/code_security/software_composition_analysis/
  tag: 설명서
  text: 소프트웨어 구성 분석
- link: https://www.datadoghq.com/blog/datadog-threat-intelligence/
  tag: 블로그
  text: Datadog Threat Intelligence로 \u0008신속한 보안 조사
title: 조건 및 개념
---

Datadog Application Security는 위협을 모니터링하고 코드 수준 취약점을 악용하려는 애플리케이션 수준 공격으로부터 보호합니다. 런타임 코드 실행 컨텍스트, 트레이스 및 오류 데이터, 사용자 속성을 활용합니다.

## 일반 애플리케이션 보안 용어

공격 시도
: 트레이스에 의해 트리거된 보안 규칙입니다.

Datadog 라이브러리
: _또는_ 트레이서, 트레이싱 라이브러리
: 웹 애플리케이션에 내장된 프로그래밍 언어별 라이브러리입니다. Datadog Application Security는 라이브러리를 사용하여 모니터링하고 보호합니다. APM은 동일한 라이브러리를 사용하여 원격 측정 추적을 위한 코드를 계측합니다.

detection rule
: 수집된 데이터 및 클라우드 구성에 적용되는 조건부 논리 정의입니다. 규칙에 정의된 사례 중 하나 이상이 일정 기간 동안 일치하면 Datadog은 _보안 신호_를 생성합니다.
: [탐지 규칙][10] 참조.

패스리스트(구 제외 필터)
: Datadog 애플리케이션 보안 라이브러리 및 인앱 WAF 규칙을 통해 플래그가 지정된 보안 트레이스를 삭제하는 메커니즘입니다. 패스리스트는 요청이 Datadog(intake)에 수집될 때 적용되며, 오탐지 및 수집 비용을 관리하는 데 도움이 됩니다.
: 앱의 [제외 필터][11] 참조.

In-App WAF 규칙 (구 이벤트 규칙)
: 보안 활동을 포착하기 위해 Datadog 라이브러리에서 실행되는 규칙 집합입니다. 여기에는 알려진 취약점을 악용하려는 시도를 모니터링하는 WAF(웹 애플리케이션 방화벽) 패턴이 포함됩니다.
: [In-App WAF 규칙][12] 참조.

인터랙티브 애플리케이션 보안 테스트 (IAST)
: 자동화된 테스트, 인간 테스터 또는 애플리케이션 기능과 상호 작용하는 모든 활동에 의해 앱이 실행되는 동안 취약성을 사전에 감지하는 애플리케이션 보안 테스트 방법입니다.

원격 구성
:  Agent 구성을 원격으로 업데이트할 수 있는 Datadog 플랫폼 메커니즘입니다. Datadog Application Security에서 In-App WAF 규칙을 업데이트하고, 제품을 활성화하며, 공격자를 차단하는 데 사용됩니다.
: [원격 구성 작동 방법][8] 참조.

서비스
: 단일 웹 애플리케이션, 마이크로서비스, API 또는 기능입니다. 일반적으로 비즈니스 기능을 수행합니다.

신호
: 서비스에 영향을 미치는 애플리케이션 공격을 감지합니다. 신호는 의미 있는 위협을 식별하며 높은 우선순위로 분류합니다.
: 앱에서 [Signals Explorer][13]를 확인하세요.

소프트웨어 구성 분석(SCA)
: 서비스에서 로드한 오픈 소스 라이브러리를 알려진 취약점이 있는 데이터베이스와 비교합니다. SCA는 웹 서비스가 로드하는 오픈 소스 라이브러리에서 취약한 종속성, 오래된 라이브러리 및 라이센스 문제를 식별하는 데 도움이 됩니다.

심각성
: 공격 시도를 얼마나 빨리 분류하고 해결해야 하는지 나타내는 지표입니다. 공격의 잠재적 영향과 위험을 포함한 여러 요소를 조합해 판단합니다. 값은 Critical, High, Medium, Low, Info입니다.

보안 트레이스
: In-App WAF 규칙에 의해 보안 활동이 플래그된 분산 트레이스입니다. 기본 트레이스는 APM과 공유되므로 더 자세하고 빠른 조사가 가능합니다.

의심스러운 요청
: In-App WAF 규칙에 의해 보안 활동이 플래그된 분산 트레이스입니다. 기본 트레이스는 APM과 공유되므로 더 자세하고 빠른 조사가 가능합니다.

사용자 속성
: 의심스러운 요청을 시스템에서 알려진 사용자에게 매핑하는 메커니즘입니다.
: [사용자 활동 추적][14] 참조.

취약성
: 애플리케이션 내의 수동적 위험입니다. [OWASP][1]에서: "취약점은 애플리케이션의 허점 또는 약점으로, 설계 결함이나 구현 버그일 수 있으며 공격자가 애플리케이션 이해관계자에게 피해를 입힐 수 있습니다. 이해관계자는 애플리케이션 소유자, 애플리케이션 사용자 및 애플리케이션에 의존하는 기타 엔터티입니다.

트레이스 자격
: Datadog이 트레이스의 영향을 이해하도록 돕고 트레이스를 `Harmful Safe or Unknown`으로 라벨링하는 프로세스
: [트레이스 자격][15] 참조.

위협 인텔리전스
: 위협을 탐지하기 위해 Datadog 라이브러리에서 실행되는 규칙 집합. 여기에는 알려진 취약점을 악용하려는 시도를 모니터링하는 WAF(웹 애플리케이션 방화벽) 패턴이 포함됩니다.
: [위협 인텔리전스][16] 참조

의심스러운 공격자
: Flagged IP의 선도자. 의심스러운 IP는 의심스러운 것으로 분류되기 위한 공격 트래픽의 최소 임계값을 충족했지만 Flagged 임계값은 충족하지 않았습니다. 임계값은 사용자가 구성할 수 없습니다.
: [공격자 탐색기][17] 참조

신고된 공격자
: 대량의 공격 트래픽을 보내는 IP. Flagged IP를 검토하고 차단하는 것이 좋습니다. 임계값은 사용자가 구성할 수 없습니다.
: [공격자 탐색기][17] 참조

공격자 지문
: 여러 요청에 걸쳐 공격자를 추적하기 위해 요청 특성에서 계산된 식별자입니다.
: [공격자 지문] 참조[18]

공격자 클러스터
: 분산 공격 전반에 걸쳐 공격자를 식별하는 속성 집합입니다.
: [공격자 클러스터링][19] 참조

## 공격 및 알려진 취약점 관련 용어

Open Web Application Security Project (OWASP)
: 웹 애플리케이션 보안 강화를 위해 여러 프로젝트를 진행하는 비영리 재단입니다. OWASP는 웹 애플리케이션의 가장 중요한 보안 위험에 대한 광범위한 합의인 [OWASP Top 10][2]으로 잘 알려져 있습니다.

Cross-Site Scripting (XSS)
: 악성 스크립트를 무해하고 신뢰할 수 있는 웹 사이트에 주입하는 인젝션 공격의 한 유형입니다.
: [OWASP의 XSS][3] 참조.

Structured Query Language Injection (SQLi, SQL 인젝션)
: 클라이언트에서 애플리케이션으로의 입력 데이터를 통해 SQL 쿼리가 실행되는 인젝션 공격 유형입니다. SQL 명령은 미리 정의된 SQL 명령의 실행에 영향을 주기 위해 데이터 플레인 입력에 삽입됩니다. 성공적인 SQL 인젝션 익스플로잇은 데이터베이스에서 중요한 데이터를 읽고, 데이터베이스 데이터를 수정하고(삽입/업데이트/삭제), 데이터베이스에서 관리 작업을 실행하고(예: DBMS 종료), DBMS 파일에 있는 특정 파일의 콘텐츠를 복구할 수 있습니다. 시스템이며 경우에 따라 운영 체제에 명령을 실행합니다.
: **관련**: Cassandra Query Language Injection (CQLi), NoSQL Injection (NoSQLi) - SQLi와 유사하지만 Cassandra Query Language 및 NoSQL용입니다.
: [OWASP에서 SQL 인젝션][4] 참조

Server-Side Request Forgery (SSRF)
: 웹 애플리케이션이 사용자 제공 URL의 유효성을 검사하지 않고 원격 리소스를 가져오는 취약점. 이를 통해 공격자는 방화벽, VPN 또는 다른 유형의 네트워크 액세스 제어 목록(ACL)으로 보호되는 경우에도 애플리케이션이 예상치 못한 대상에 조작된 요청을 보내도록 강제할 수 있습니다.
: [OWASP의 서버측 요청 위조][5] 참조.

Local File Inclusion (LFI)
: 공격자가 요청을 처리하는 동안 서버에 로컬로 존재하는 파일을 포함시킬 수 있는 취약점. 대부분의 경우 공격자는 서버의 파일에 저장된 민감한 정보를 읽을 수 있습니다. 더 심각한 경우 악용하여 크로스 사이트 스크립팅이나 원격 코드 실행을 발생시킬 수 있습니다.
: [OWASP에서 LFI 테스트][6] 참조.

Remote File Inclusion (RFI)
: Local File Inclusion과 유사한 취약점이지만 공격자가 요청을 처리하는 동안 원격 파일을 포함할 수 있습니다. Remote File Inclusion 공격에 사용되는 파일에는 가장 일반적으로 PHP, JSP 또는 유사한 기술에 대한 악성 코드가 포함되어 있습니다.

Remote Code Execution (RCE)
: 공격자가 시스템에서 원격으로 코드를 실행할 수 있게 하는 취약점입니다.

Object-Graph Navigation Language Injection (OGNLi)
: 공격자가 Java 애플리케이션에서 자신의 OGNL 표현식을 실행할 수 있도록 허용하는 취약점이며, 가장 일반적으로 원격 코드 실행으로 이어집니다.
: [OWASP Top 10의 OGNLi][7] 참조.



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://owasp.org/www-community/vulnerabilities/
[2]: https://owasp.org/www-project-top-ten/
[3]: https://owasp.org/www-community/attacks/xss/
[4]: https://owasp.org/www-community/attacks/SQL_Injection
[5]: https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
[6]: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion
[7]: https://owasp.org/www-project-top-ten/2017/A1_2017-Injection
[8]: /ko/agent/remote_config/
[10]: /ko/security/detection_rules/
[11]: https://app.datadoghq.com/security/appsec/exclusions
[12]: /ko/security/application_security/threats/inapp_waf_rules
[13]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&view=signal
[14]: /ko/security/application_security/threats/add-user-info/
[15]: /ko/security/application_security/threats/trace_qualification/
[16]: /ko/security/application_security/threats/threat-intelligence/
[17]: /ko/security/application_security/threats/attacker-explorer/
[18]: /ko/security/application_security/threats/attacker_fingerprint/
[19]: /ko/security/application_security/threats/attacker_clustering/
