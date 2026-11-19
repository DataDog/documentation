---
disable_toc: false
further_reading:
- link: /security/application_security/how-it-works
  tag: 설명서
  text: App and API Protection의 작동 방식
- link: /security/application_security
  tag: 설명서
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-threat-intelligence/
  tag: 블로그
  text: Datadog Threat Intelligence를 통해 신속한 보안 조사 실행
title: 용어 및 개념
---
Datadog App and API Protection은 위협을 모니터링하고, 코드 수준의 취약점을 악용하려는 애플리케이션 수준의 공격으로부터 보호합니다. 또한 런타임 코드 실행 컨텍스트, 트레이스 및 오류 데이터, 사용자 속성을 활용합니다.

## App and API Protection 일반 용어 {#general-app-and-api-protection-terms}

공격 시도
: 트레이스에 의해 트리거된 보안 규칙입니다.

Datadog 라이브러리
: _레이서, SDK
: 웹 애플리케이션에 내장된 프로그래밍 언어별 라이브러리입니다. Datadog App and API Protection은 이 라이브러리를 사용하여 모니터링 및 보호 작업을 수행합니다. APM은 동일한 라이브러리를 사용하여 텔레메트리 트레이싱을 위한 코드를 계측합니다.

탐지 규칙
: 수집된 데이터 및 클라우드 구성에 적용되는 조건부 로직 정의입니다. 탐지 규칙에 정의된 케이스 중 하나 이상이 지정된 기간 동안 일치하면 Datadog은 _보안 신호_를 생성합니다.
: [탐지 규칙][10]을 참조하세요.

passlist(이전 명칭: 제외 필터)
: Datadog App and API Protection 라이브러리 및 인앱 WAF 규칙을 통해 플래그가 지정된 보안 트레이스를 삭제하기 위한 메커니즘입니다. Passlist는 요청이 Datadog(인테이크)으로 수집되는 시점에 적용됩니다. Passlist는 오탐 및 인테이크 비용을 관리하는 데 도움이 됩니다.
: 앱에서 [제외 필터][11]를 참조하세요.

인앱 WAF 규칙(이전 명칭: 이벤트 규칙)
: 보안 활동 포착을 위해 Datadog 라이브러리에서 실행되는 규칙 세트입니다. 이 규칙에는 알려진 취약점을 악용하려는 시도를 모니터링하는 Web Application Firewall(WAF) 패턴이 포함됩니다.
: [인앱 WAF 규칙][12]을 참조하세요.

Remote Configuration
: Datadog 플랫폼 메커니즘으로, Agent 구성을 원격으로 업데이트할 수 있습니다. Datadog App and API Protection에서 인앱 WAF 규칙 업데이트, 제품 활성화, 공격자 차단 목적으로 사용합니다.
: [Remote Configuration의 작동 방식][8]을 참조하세요.

서비스
: 단일 웹 애플리케이션, 마이크로서비스, API 또는 함수입니다. 일반적으로 비즈니스 기능을 수행합니다.

신호
: 서비스에 영향을 미치는 애플리케이션 공격을 감지합니다. 신호는 검토가 필요한 유의미한 위협을 식별하며, 신호를 높은 우선순위로 분류해야 합니다.
: 앱에서 [신호 탐색기][13]를 참조하세요.

심각도
: 공격 시도를 얼마나 빨리 분류하고 해결해야 하는지 나타내는 지표입니다 공격의 잠재적 영향과 위험을 포함한 여러 요소를 조합해 판단합니다. 값은 Critical, High, Medium, Low, Info입니다.

보안 트레이스
: 인앱 WAF 규칙에 의해 보안 활동이 플래그 지정된 분산형 트레이스입니다. 기본 트레이스는 APM과 공유되므로, 보다 상세하고 신속한 조사가 가능합니다.

의심스러운 요청
: 인앱 WAF 규칙에 의해 보안 활동이 플래그 지정된 분산형 트레이스입니다. 기본 트레이스는 APM과 공유되므로, 보다 상세하고 신속한 조사가 가능합니다.

사용자 속성
: 의심스러운 요청을 시스템에서 알려진 사용자에게 매핑하는 메커니즘입니다.
: [사용자 활동 추적][14]을 참조하세요.

취약성
: 애플리케이션 내 존재하는 수동적 위험 요소입니다. [OWASP][1]: 에 따르면, "취약성은 애플리케이션의 허점이나 약점으로, 설계 결함이나 구현 버그일 수 있으며, 공격자가 애플리케이션의 이해관계자에게 피해를 입힐 수 있도록 허용합니다. 이해관계자에는 애플리케이션 소유자, 애플리케이션 사용자, 애플리케이션에 의존하는 기타 주체 등이 포함됩니다.

트레이스 적격성 평가
: Datadog이 트레이스의 영향을 파악하도록 지원하고,
이를 `Harmful Safe or Unknown`으로 레이블을 지정하는 프로세스입니다.
: [트레이스 적격성 평가][15]를 참조하세요.

위협 인텔리전스
: 위협 탐지를 위해 Datadog 라이브러리에서 실행되는 규칙 세트입니다. 이 규칙에는 알려진 취약점을 악용하려는 시도를 모니터링하는 Web Application Firewall(WAF) 패턴이 포함됩니다.
: [위협 인텔리전스][16]를 참조하세요.

의심스러운 공격자
: Flagged IP의 선도자입니다. 의심스러운 IP는 의심스러운 것으로 분류되기 위한 공격 트래픽의 최소 임계값을 충족했지만 Flagged 임계값은 충족하지 않았습니다. 임계값은 사용자가 구성할 수 없습니다.
: [공격자 탐색기][17]를 참조하세요.

플래그가 지정된 공격자
: 대량의 공격 트래픽을 보내는 IP입니다. Flagged IP를 검토하고 차단할 것을 권장합니다. 임계값은 사용자가 구성할 수 없습니다.
: [공격자 탐색기][17]를 참조하세요.

공격자 지문
: 여러 요청에 걸쳐 공격자를 추적하기 위해 요청 특성에서 계산된 식별자입니다.
: [공격자 지문][18]을 참조하세요.

공격자 클러스터
: 분산 공격 전반에 걸쳐 공격자를 식별하는 속성 집합입니다.
: [공격자 클러스터링][19]를 참조하세요.

## 공격 및 알려진 취약점 관련 용어 {#attacks-and-known-vulnerabilities-terms}

오픈 웹 애플리케이션 보안 프로젝트(OWASP)
: 웹 애플리케이션 보안 강화를 위해 여러 프로젝트를 진행하는 비영리 재단입니다. OWASP는 웹 애플리케이션의 가장 중요한 보안 위험에 대한 광범위한 합의인 [OWASP Top 10][2]으로 잘 알려져 있습니다.

사이트 간 스크립팅(XSS)
: 악성 스크립트를 무해하고 신뢰할 수 있는 웹사이트에 주입하는 인젝션 공격의 한 유형입니다.
: [OWASP의 XSS][3]를 참조하세요.

Structured Query Language Injection(SQLi, SQL Injection)
: 클라이언트에서 애플리케이션으로 전달되는 입력 데이터를 통해 SQL 쿼리를 실행하는 인젝션 공격의 한 유형입니다. 사전 정의된 SQL 명령 실행에 영향을 주기 위해 데이터 플레인 입력에 SQL 명령을 주입합니다. 성공적인 SQL 인젝션 공격은 데이터베이스에서 민감한 데이터를 읽고, 데이터베이스 데이터를 수정(삽입/업데이트/삭제)하고, 데이터베이스에서 관리 작업(예: DBMS 종료)을 실행하며, DBMS 파일 시스템 내 특정 파일의 내용을 복구하고, 경우에 따라 운영 체제에 명령을 내릴 수 있습니다.
: **관련**: Cassandra Query Language Injection (CQLi), NoSQL Injection (NoSQLi) - SQLi와 유사하지만 Cassandra Query Language 및 NoSQL을 대상으로 합니다.
: [OWASP의 SQL 인젝션][4]을 참조하세요.

서버 측 요청 위조(SSRF)
: 웹 애플리케이션이 사용자가 제공한 URL을 검증하지 않은 상태에서 원격 리소스를 가져오는 취약점입니다. 공격자는 이를 악용해 방화벽, VPN 또는 기타 유형의 네트워크 액세스 제어 목록(ACL)으로 보호되는 경우에도 애플리케이션을 강제로 조작해 예상치 못한 대상으로 전송할 수 있습니다.
: [OWASP의 서버 측 요청 위조][5]를 참조하세요.

로컬 파일 포함(LFI)
: 요청 처리 과정에서 공격자가 서버에 로컬로 존재하는 파일을 포함할 수 있게 허용하는 취약점입니다. 대부분의 경우 공격자는 이를 악용해 서버의 파일에 저장된 민감한 정보를 읽을 수 있습니다. 더 심각한 경우에는 사이트 간 스크립팅이나 원격 코드 실행으로 이어질 수 있습니다.
: [OWASP의 LFI 테스트][6]를 참조하세요.

원격 파일 포함(RFI)
: 로컬 파일 포함과 유사하지만, 요청 처리 과정에서 공격자가 원격 파일을 포함할 수 있게 허용하는 취약점입니다. 원격 파일 포함 공격에 사용되는 파일에는 일반적으로 PHP, JSP 또는 유사한 기술을 대상으로 하는 악성 코드가 포함되어 있습니다.

원격 코드 실행(RCE)
: 공격자가 시스템에서 원격으로 코드를 실행할 수 있게 허용하는 취약점입니다.

Object-Graph Navigation Language Injection(OGNLi)
: 공격자가 Java 애플리케이션에서 본인의 OGNL 표현식을 실행할 수 있게 허용하는 취약점이며, 가장 일반적으로 원격 코드 실행으로 이어집니다.
: [OWASP Top 10의 OGNLi][7]를 참조하세요.



## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://owasp.org/www-community/vulnerabilities/
[2]: https://owasp.org/www-project-top-ten/
[3]: https://owasp.org/www-community/attacks/xss/
[4]: https://owasp.org/www-community/attacks/SQL_Injection
[5]: https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
[6]: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion
[7]: https://owasp.org/www-project-top-ten/2017/A1_2017-Injection
[8]: /ko/remote_configuration
[10]: /ko/security/detection_rules/
[11]: https://app.datadoghq.com/security/appsec/exclusions
[12]: /ko/security/application_security/policies/inapp_waf_rules/
[13]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&view=signal
[14]: /ko/security/application_security/how-it-works/add-user-info/
[15]: /ko/security/application_security/how-it-works/trace_qualification/
[16]: /ko/security/application_security/how-it-works/threat-intelligence/
[17]: /ko/security/application_security/security_signals/attacker-explorer/
[18]: /ko/security/application_security/security_signals/attacker_fingerprint/
[19]: /ko/security/application_security/security_signals/attacker_clustering/