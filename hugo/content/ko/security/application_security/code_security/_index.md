---
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: 설명서
  text: 애플리케이션 보안 관리 작동 방법
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: 블로그
  text: Datadog Code Security로 운영 환경에서 애플리케이션 보안 강화
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: 블로그
  text: Datadog Code Security로 코드 취약점 파악
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: 블로그
  text: Datadog Code Security는 IAST 접근 방식을 사용하여 OWASP 벤치마크에서 100% 정확도를 달성했습니다.
title: 코드 보안
---

## 개요

Datadog Code Security는 서비스의 코드 수준 취약점을 식별하고 실행 가능한 인사이트와 권장 수정 사항을 제공합니다.

지원되는 서비스 목록은 [라이브러리 호환성 요구 사항][5]을 참조하세요.

Code Security는 대화형 애플리케이션 보안 테스트(IAST) 접근 방식을 사용하여 애플리케이션 코드 내의 취약점을 찾습니다. IAST는 애플리케이션 성능 모니터링(APM)과 같이 코드에 내장된 계측 도구를 사용합니다.

Code Security는 라이브러리 및 인프라 등 스택의 다른 구성 요소와 코드의 상호 작용도 모니터링합니다.

IAST를 사용하면 Datadog 추가 구성이나 주기적인 일정이 필요한 외부 테스트에 의존하는 대신, 합법적인 애플리케이션 트래픽을 사용해 취약점을 파악할 수 있습니다.

Code Security의 런타임 애플리케이션 모니터링은 공격 측면에 대한 최신 보기를 제공하여 잠재적인 문제를 신속하게 파악할 수 있도록 합니다.

## 코드 수준 취약점 목록

Code Security 탐지 규칙은 다음 언어를 지원합니다.

| 심각도 | 탐지 규칙                        | 자바(Java)  | .NET  | Node.js | 파이썬(Python) |
| -------- | ------------------------------------- | ----- | ----- | ------- |--------|
| Critical | NoSQL 삽입                       | FALSE | TRUE  | TRUE    | FALSE  |
| Critical | SQL 삽입                         | TRUE  | TRUE  | TRUE    | TRUE   |
| Critical | 서버 측 요청 위조(SSRF)    | TRUE  | TRUE  | TRUE    | TRUE   |
| Critical | 코드 삽입                        | FALSE | FALSE | TRUE    | FALSE  |
| Critical | 명령 삽입                     | TRUE  | TRUE  | TRUE    | TRUE   |
| 높음     | LDAP 삽입                        | TRUE  | TRUE  | TRUE    | FALSE  |
| 높음     | 하드코딩된 시크릿                     | TRUE  | TRUE  | TRUE    | FALSE  |
| 높음     | 하드코딩된 비밀번호                   | FALSE | FALSE | TRUE    | FALSE  |
| 높음     | 경로 탐색                        | TRUE  | TRUE  | TRUE    | TRUE   |
| 높음     | 신뢰 경계 위반              | TRUE  | TRUE  | FALSE   | FALSE  |
| 높음     | 사이트 간 스크립팅(XSS)            | TRUE  | TRUE  | FALSE   | FALSE  |
| 높음     | 신뢰할 수 없는 역직렬화             | TRUE  | FALSE | FALSE   | FALSE  |
| 높음     | 유효하지 않은 리디렉션                  | TRUE  | TRUE  | TRUE    | FALSE  |
| 높음     | XPath 삽입                       | TRUE  | TRUE  | FALSE   | FALSE  |
| 높음     | 헤더 삽입                      | TRUE  | TRUE  | TRUE    | TRUE   |
| 높음     | 디렉토리 목록 유출                | TRUE  | FALSE | FALSE   | FALSE  |
| 높음     | 잘못된 기본 HTML 이스케이프           | TRUE  | FALSE | FALSE   | FALSE  |
| 높음     | 동사 변조                        | TRUE  | FALSE | FALSE   | FALSE  |
| 중간   | 동일 사이트 쿠키 없음                    | TRUE  | TRUE  | TRUE    | TRUE   |
| 중간   | 안전하지 않은 쿠키                       | TRUE  | TRUE  | TRUE    | TRUE   |
| 중간   | HttpOnly 쿠키 없음                    | TRUE  | TRUE  | TRUE    | TRUE   |
| 중간   | 약한 해싱                          | TRUE  | TRUE  | TRUE    | TRUE   |
| 중간   | 약한 암호                           | TRUE  | TRUE  | TRUE    | TRUE   |
| 중간   | 스택트레이스 유출                       | TRUE  | TRUE  | FALSE   | FALSE  |
| 중간   | 반사 삽입                  | TRUE  | TRUE  | FALSE   | FALSE  |
| 중간   | 안전하지 않은 인증 프로토콜      | TRUE  | TRUE  | FALSE   | FALSE  |
| 중간   | 하드코딩된 키                         | FALSE | TRUE  | FALSE   | FALSE  |
| 중간   | 안전하지 않은 JSP 레이아웃                   | TRUE  | FALSE | FALSE   | FALSE  |
| 낮음      | HSTS 헤더 누락                   | TRUE  | TRUE  | TRUE    | FALSE  |
| 낮음      | X-콘텐츠 유형 옵션 헤더 누락 | TRUE  | TRUE  | TRUE    | FALSE  |
| 낮음      | 약한 무작위성                       | TRUE  | TRUE  | TRUE    | TRUE   |
| 낮음      | 관리 콘솔 활성화                  | TRUE  | FALSE | FALSE   | FALSE  |
| 낮음      | 세션 시간 초과                       | TRUE  | FALSE | FALSE   | FALSE  |
| 낮음      | 세션 재작성                     | TRUE  | FALSE | FALSE   | FALSE  |

## 코드 취약점 탐색 및 관리

[Vulnerability Explorer][1]은 실시간 위협 데이터를 사용하여 시스템을 위협하는 취약성을 파악하는 데 도움을 줍니다. 취약점은 심각도에 따라 순서대로 정렬됩니다.

{{< img src="/security/application_security/code_security/vulnerability_explorer_code_vulnerabilities.png" alt="Vulnerability Explorer에서의 Code Security" style="width:100%;" >}}

취약점을 분류하기 위해 각 취약점에는 문제에 대한 간략한 설명이 포함되어 있습니다.

- 영향을 받는 서비스
- 취약점 유형
- 첫 번째 감지
- 취약점이 발견된 정확한 파일 및 줄 번호입니다.

{{< img src="/security/application_security/code_security/vulnerability-details.png" alt="Code Security 취약점 상세 정보" style="width:100%;" >}}

각 취약점 세부 정보에는 위험 점수(아래 스크린샷 참조)와 심각도 등급(위험, 높음, 중간, 낮음)이 포함되어 있습니다.

The risk score is tailored to the specific runtime context, including factors such as where the vulnerability is deployed and whether the service is targeted by active attacks.

{{< img src="/security/application_security/code_security/vulnerability_prioritization.png" alt="Code Security 취약점 우선순위" style="width:100%;" >}}

## 복구

Datadog Code Security는 영향을 받는 파일 이름부터 정확한 방법과 줄 번호까지 애플리케이션의 취약점 위치를 파악하는 데 필요한 Teams 정보를 자동으로 제공합니다.

{{< img src="/security/application_security/code_security/code_security_remediation.png" alt="Code Security vulnerability remediation" style="width:100%;" >}}

[GitHub 통합][7]이 활성화되면 Code Security에 영향을 받은 첫 번째 서비스 버전, 취약점을 도입한 커밋, 취약한 코드의 스니펫이 표시됩니다. 이 정보는 Teams 취약점이 언제 어디서 발생했는지에 대한 인사이트를 제공하고 작업의 우선순위를 정하는 데 도움이 됩니다.

{{< img src="/security/application_security/code_security/vulnerability_code_snippet.png" alt="코드 취약점 스니펫" style="width:100%;" >}}

탐지된 각 취약점에 관한 자세한 해결 단계가 제공됩니다.

{{< img src="/security/application_security/code_security/remediation_recommendations.png" alt="해결 권장 사항" style="width:100%;" >}}

권장 사항을 통해 취약점의 상태를 변경하고, 검토를 위해 팀원에게 할당하고, 추적할 Jira 이슈를 만들 수 있습니다.

{{< img src="/security/application_security/code_security/vulnerability_jira_ticket.png" alt="취약점에서 Jira 티켓 생성하기" style="width:100%;" >}}

**참고: **취약점에 대한 Jira 이슈를 만들려면 Jira 통합을 구성하고 `manage_integrations` 권한이 있어야 합니다. 자세한 지침은 [Jira 통합][3] 설명서 및 [역할 기반 액세스 제어][4] 설명서를 참조하세요.

## Code Security 활성화 

Code Security를 활성화하려면 [Datadog 추적 라이브러리][9]를 구성합니다. 두 가지 방법에 대한 자세한 지침은 [**Security >  Application Security > Settings**][10] 섹션에서 확인할 수 있습니다.

추가 도움이 필요하면 [Datadog 지원][11]에 문의하세요.

## Code Security 비활성화

비활성화와 관련한 자세한 내용은 [Code Security 비활성화][12]를 참조하시기 바랍니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[2]: /ko/security/application_security/code_security/setup/java/
[3]: /ko/integrations/jira/
[4]: /ko/account_management/rbac/permissions/#integrations
[5]: /ko/security/application_security/code_security/setup/compatibility/
[6]: https://docs.google.com/forms/d/1wsgbd80eImvJSjXe5y5VCjAW0zzn5p3CoCLsOy0vqsk/
[7]: /ko/integrations/github/
[9]: /ko/security/application_security/code_security/setup/
[10]: https://app.datadoghq.com/security/configuration/asm/setup
[11]: https://www.datadoghq.com/support/
[12]: /ko/security/application_security/troubleshooting/#disabling-code-security