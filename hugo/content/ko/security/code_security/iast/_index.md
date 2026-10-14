---
aliases:
- /ko/security/application_security/code_security/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-code-security/
  tag: 블로그
  text: Datadog Code Security로 애플리케이션 코드 및 라이브러리의 수명 주기를 보호하기
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: 블로그
  text: Datadog Secret Scanning을 사용하여 노출된 자격 증명 탐지 및 차단
- link: /security/code_security/iast/setup/
  tag: 설명서
  text: 런타임 코드 분석(IAST) 설정
- link: /security/code_security/iast/security_controls/
  tag: 설명서
  text: 보안 컨트롤
- link: /security/ticketing_integrations
  tag: 설명서
  text: 티켓팅 통합
- link: /security/automation_pipelines/
  tag: 설명서
  text: 자동화 파이프라인
- link: /security/notifications/
  tag: 설명서
  text: 보안 알림
title: Runtime Code Analysis(IAST)
---
## 개요 {#overview}

Datadog 런타임 코드 분석(IAST)은 Datadog 애플리케이션 계측을 기반으로 대화형 애플리케이션 보안 테스트(IAST) 방식을 사용하여 애플리케이션 코드 내의 취약성을 탐지하고 서비스의 코드 수준 취약성을 식별합니다. IAST를 사용하면 Datadog이 추가 구성이나 주기적인 실행 일정 설정이 필요할 수 있는 외부 테스트에 의존하지 않고 정상적인 애플리케이션 트래픽을 통해 취약성을 식별할 수 있습니다. 또한 라이브러리 및 인프라와 같은 스택의 다른 구성 요소와 코드 간의 상호작용을 모니터링하여 공격 표면의 최신 현황을 제공합니다.

## 작동 방식 {#how-it-works}

런타임 코드 분석(IAST)은 Datadog 트레이싱 라이브러리를 사용하여 런타임에 애플리케이션 내에서 이동하는 사용자 제어 데이터를 추적합니다. IAST는 오염된 입력이 코드의 취약한 지점에 도달했음을 확인할 수 있는 경우에만 취약성을 보고하므로 발견 결과에 따라 실질적인 조치를 취할 수 있습니다.

- **데이터 소스 추적:** IAST는 요청 URL, 본문 또는 헤더와 같은 외부 소스에서 애플리케이션으로 유입되는 데이터를 관찰합니다. 이러한 입력에는 태그가 지정되며, 수명 주기 전반에 걸쳐 추적됩니다.
- **데이터 흐름 분석:** Datadog 트레이싱 라이브러리는 입력 데이터가 변환, 분할 또는 결합되더라도 애플리케이션 내에서 이동하는 경로를 추적합니다. 이를 통해 IAST는 원본 입력 데이터가 코드의 민감한 부분에 도달하는지, 도달한다면 어떤 경로를 거치는지 파악할 수 있습니다.
- **취약한 지점 식별:** IAST는 사용자 제어 입력이 SQL 쿼리, 동적 코드 실행 또는 HTML 렌더링 등 잠재적으로 안전하지 않은 방식으로 사용되는 코드 위치를 탐지합니다.
- **취약성 확인:** IAST는 오염된 입력이 실제로 코드의 취약한 지점에 도달했음을 확인할 수 있는 경우에만 취약성을 보고합니다. 이 접근 방식은 오탐을 최소화하고 발견 결과에 따라 실질적인 조치를 취할 수 있도록 합니다.

## 지원되는 취약성 유형 {#supported-vulnerability-types}

Datadog IAST는 지원되는 프로그래밍 언어에서 다음과 같은 코드 수준 취약성 유형을 탐지합니다. 탐지 범위는 언어와 프레임워크에 따라 다를 수 있습니다. 프레임워크별 지원 여부는 [호환성 요구 사항][5]을 참조하세요.

| 심각도 | 탐지 규칙                        | Java | .NET | Node.js | Python |
|----------|---------------------------------------|------|------|---------|--------|
| 위험 | NoSQL 인젝션                       | FALSE | TRUE | TRUE | FALSE |
| 위험 | SQL 인젝션                         | TRUE | TRUE | TRUE | TRUE |
| 위험 | 서버 측 요청 위조(SSRF)    | TRUE | TRUE | TRUE | TRUE |
| 위험 | 코드 인젝션                        | FALSE | FALSE | TRUE | FALSE |
| 위험 | 명령 인젝션                     | TRUE | TRUE | TRUE | TRUE |
| 높음 | LDAP 인젝션                        | TRUE | TRUE | TRUE | FALSE |
| 높음 | 이메일 HTML 인젝션                  | TRUE | TRUE | TRUE | FALSE |
| 높음 | 하드코딩된 시크릿                     | TRUE | TRUE | TRUE | FALSE |
| 높음 | 하드코딩된 비밀번호                   | FALSE | FALSE | TRUE | FALSE |
| 높음 | 경로 탐색                        | TRUE | TRUE | TRUE | TRUE |
| 높음 | 신뢰 경계 위반              | TRUE | TRUE | FALSE | FALSE |
| 높음 | 교차 사이트 스크립팅(XSS)            | TRUE | TRUE | FALSE | FALSE |
| 높음 | 신뢰할 수 없는 데이터의 역직렬화             | TRUE | FALSE | FALSE | FALSE |
| 높음 | 검증되지 않은 리디렉션                  | TRUE | TRUE | TRUE | FALSE |
| 높음 | XPath 인젝션                       | TRUE | TRUE | FALSE | FALSE |
| 높음 | 헤더 인젝션                      | TRUE | TRUE | TRUE | TRUE |
| 높음 | 디렉터리 목록 유출                | TRUE | FALSE | FALSE | FALSE |
| 높음 | 기본 HTML 이스케이프 무효           | TRUE | FALSE | FALSE | FALSE |
| 높음 | HTTP 메서드 변조                        | TRUE | FALSE | FALSE | FALSE |
| 중간 | SameSite 속성이 없는 쿠키                   | TRUE | TRUE | TRUE | TRUE |
| 중간 | 안전하지 않은 쿠키                      | TRUE | TRUE | TRUE | TRUE |
| 중간 | HttpOnly 속성이 없는 쿠키                   | TRUE | TRUE | TRUE | TRUE |
| 중간 | 취약한 해싱                         | TRUE | TRUE | TRUE | TRUE |
| 중간 | 취약한 암호화 알고리즘                          | TRUE | TRUE | TRUE | TRUE |
| 중간 | 스택 트레이스 유출                      | TRUE | TRUE | FALSE | FALSE |
| 중간 | 리플렉션 인젝션                 | TRUE | TRUE | FALSE | FALSE |
| 중간 | 안전하지 않은 인증 프로토콜     | TRUE | TRUE | FALSE | FALSE |
| 중간 | 하드코딩된 키                        | FALSE | TRUE | FALSE | FALSE |
| 중간 | 안전하지 않은 JSP 레이아웃                  | TRUE | FALSE | FALSE | FALSE |
| 낮음 | HSTS 헤더 누락                   | TRUE | TRUE | TRUE | FALSE |
| 낮음 | X-Content-Type-Options 헤더 누락 | TRUE | TRUE | TRUE | FALSE |
| 낮음 | 취약한 난수 생성                       | TRUE | TRUE | TRUE | TRUE |
| 낮음 | Admin Console 활성화                  | TRUE | FALSE | FALSE | FALSE |
| 낮음 | 세션 시간 제한                       | TRUE | FALSE | FALSE | FALSE |
| 낮음 | 세션 재작성                     | TRUE | FALSE | FALSE | FALSE |

## 주요 기능 {#key-capabilities}

### 취약성 검토 및 우선순위 지정 {#review-and-prioritize-vulnerabilities}

[IAST용 취약성 탐색기][1]는 IAST가 탐지한 코드 수준의 취약성을 중심으로 확인할 수 있는 전용 화면을 제공합니다. 이 탐색기의 모든 발견 결과는 Datadog 트레이싱 라이브러리와 IAST가 활성화된 상태로 실행 중인 서비스에서 확인된 취약성에 해당합니다. 각 Code Security 기능에는 별도의 탐색기(SAST, SCA, IAST, Secrets Scanning, IaC)가 있으므로 이 화면에서 IAST 발견 결과가 다른 유형의 결과와 혼합되지 않습니다.

각 발견 결과에는 간단한 설명, 영향을 받는 서비스, 취약성 유형, 최초 및 마지막 탐지 시간, 문제가 확인된 정확한 파일, 메서드 및 줄 번호가 포함됩니다. 서비스, 팀, 환경, 심각도 및 기타 패싯별로 결과를 필터링하여 그룹에 중요한 작업에 집중할 수 있습니다.

#### Datadog Severity Score {#datadog-severity-score}

IAST는 자사 코드의 취약성을 탐지하므로 발견 결과에는 공개 CVE 또는 CVSS 점수가 없습니다. Datadog은 각 취약성 유형(예: 명령 인젝션 또는 SQL 인젝션)에 **기본 심각도**를 할당한 다음, 환경에서 관찰된 런타임 컨텍스트와 악용 가능성 신호를 바탕으로 기본 심각도를 조정하여 **Datadog Severity Score**를 산출합니다. 이러한 요소는 이론적 위험과 실제 환경에서 악용될 가능성이 더 높은 취약성을 구분하는 데 도움이 됩니다. 아래 표는 각 요소가 최종 점수에 미치는 영향을 설명합니다.

| 위험 요소 | 평가 방법 | 점수에 미치는 영향 |
|---|---|---|
| 기본 심각도 | Datadog이 취약성 유형(예: 명령 인젝션, SQL 인젝션)에 따라 정의합니다. | 심각도 점수의 시작점입니다. |
| 프로덕션 런타임 컨텍스트 | 영향을 받는 서비스가 프로덕션 환경에서 실행 중인지 여부 | 서비스가 프로덕션에서 실행 중이지 않으면 감소합니다. |
| 공격받는 중 | 서비스를 대상으로 실제 공격이 진행 중이라는 증거입니다. | 관찰된 공격 활동이 없으면 감소합니다. |

#### 런타임 지표 {#runtime-indicators}

취약성 사이드 패널에는 런타임 컨텍스트 요소가 지표로 표시되므로 발견 결과의 점수가 조정된 이유를 한눈에 확인할 수 있습니다.

- **{{< ui >}}Service In Production{{< /ui >}}**: **프로덕션 런타임 컨텍스트** 요소에 해당합니다. Datadog은 `env` 및 `environment` 태그를 통해 서비스가 프로덕션에서 실행 중인지 확인합니다. 영향을 받는 서비스가 프로덕션에서 실행 중이지 않으면 Datadog Severity Score가 감소합니다.
- **{{< ui >}}Exposed to Attacks{{< /ui >}}**: **공격받는 중** 요소에 해당합니다. 지난 15일 동안 서비스에서 보안 신호가 탐지된 경우 해당 서비스는 공격에 노출된 것으로 플래그 지정됩니다. 공격 활동이 관찰되지 않으면 패널에 {{< ui >}}Not Exposed to Attacks{{< /ui >}}가 표시되고 Datadog Severity Score가 감소합니다.

각 지표가 특정 발견 결과의 점수에 어떤 영향을 미쳤는지 확인하려면 사이드 패널에서 {{< ui >}}Datadog Severity Breakdown{{< /ui >}} 탭을 엽니다. Datadog Security 전반에서 이러한 위험을 평가하는 방법에 대한 자세한 내용은 [Security Inbox][19]를 참조하세요.

### 코드 취약성 해결 {#remediate-a-code-vulnerability}

[IAST용 취약성 탐색기][1]에서 발견 결과를 클릭하면 취약성 사이드 패널이 열리고, 개발자와 보안 엔지니어는 문제 해결에 필요한 모든 컨텍스트를 확인할 수 있습니다.

패널은 발견 결과의 심각도, 취약성 유형, 기한, 런타임 지표(예: {{< ui >}}Exposed to Attacks{{< /ui >}} 및 {{< ui >}}Service In Production{{< /ui >}})를 요약합니다. 또한 코드에서 취약성이 확인된 위치, 최초 및 마지막 탐지 시점, 영향을 받는 서비스, 환경 및 팀, CWE와 같은 관련 표준 참조 정보를 표시합니다. [GitHub][7], [GitLab][8] 또는 [Azure DevOps][18] 통합이 활성화되면 Datadog은 취약성을 유발한 커밋과 취약한 코드의 일부도 표시합니다.

사이드 패널에는 {{< ui >}}Data Flow{{< /ui >}}(오염된 입력이 취약한 싱크에 도달하는 방식), {{< ui >}}Remediation{{< /ui >}}(사용 중인 프레임워크에 대한 단계별 안내 및 예시 코드), {{< ui >}}Datadog Severity Breakdown{{< /ui >}}(런타임 컨텍스트가 점수에 영향을 미친 방식) 및 {{< ui >}}More Information{{< /ui >}}(관련 참고 자료)을 확인할 수 있는 탭이 있습니다. 오른쪽의 {{< ui >}}Next Steps{{< /ui >}} 패널에서 발견 결과의 상태를 변경하거나, 음소거하거나, Jira 또는 ServiceNow 티켓을 생성하거나, 수정 단계로 바로 이동할 수 있습니다.

반복 가능한 워크플로에서는 {{< ui >}}Set up Automation{{< /ui >}}을 사용하여 지정한 기준을 충족하는 신규 및 기존 발견 결과에 동일한 액션을 자동으로 적용합니다. 자세한 내용은 [분류 및 수정 자동화](#automate-triage-and-remediation)를 참조하세요.

### 발견 결과로 티켓 생성 {#create-tickets-from-findings}

IAST 발견 결과에서 Jira 또는 ServiceNow의 양방향 연동 티켓을 직접 생성하여 기존 워크플로에서 문제를 추적하고 수정할 수 있습니다. 티켓 상태는 Datadog과 티켓팅 도구 간에 계속 동기화되므로 어느 시스템에서 업데이트하더라도 변경 사항이 양쪽에 반영됩니다. 자세한 내용은 [티켓팅 통합][13]을 참조하세요.

티켓을 대량으로 생성하거나 반복적인 프로세스에 따라 생성하려면 [Automation Pipelines][14]를 사용하여 심각도, 서비스, 환경 또는 팀 등의 조건에 일치하는 발견 결과에 대한 티켓을 자동으로 생성합니다.

### 발견 사항 음소거 {#mute-findings}

발견 사항을 차단하려면 발견 사항 세부 정보 패널에서 {{< ui >}}Mute{{< /ui >}}를 클릭하세요. 그러면 태그 값(예: `service` 또는 `env`)을 기준으로 컨텍스트를 고려한 필터링을 수행하는 [자동화 규칙을 생성할 수 있는][15] 워크플로가 열립니다. 발견 결과를 음소거하면 현재 분류 작업에서 숨겨지고 보고서에서도 제외됩니다.

음소거된 발견 사항을 복원하려면 세부 정보 패널에서 {{< ui >}}Unmute{{< /ui >}}를 클릭하세요. [IAST용 취약성 탐색기][1]에서 {{< ui >}}Status{{< /ui >}} 필터를 사용하여 음소거된 발견 결과를 확인할 수도 있습니다.

### 새로운 발견 결과 알림 {#notify-on-new-findings}

새로운 IAST 발견 결과가 탐지되는 즉시 담당 팀에 전달합니다. Datadog 알림은 Slack, Microsoft Teams, 이메일, PagerDuty, 웹훅 등을 지원하므로 각 팀은 기존에 사용하는 도구에서 발견 결과를 받을 수 있습니다. 자세한 설정 방법은 [보안 알림][16]을 참조하세요.

### 분류 및 수정 자동화 {#automate-triage-and-remediation}

[Automation Pipelines][14]를 사용하여 수동 개입 없이 신규 및 기존 IAST 발견 결과에 일관된 분류 및 수정 액션을 적용합니다. 발견 결과 사이드 패널의 {{< ui >}}Set up Automation{{< /ui >}} 메뉴 또는 Automation Pipelines 설정 페이지에서 다음 작업을 수행할 수 있습니다.

- 서비스, 환경 또는 취약성 유형 등의 조건에 일치하는 [발견 결과 음소거][15]
- 심각도와 런타임 컨텍스트를 바탕으로 [기한을 설정][14]하여 수정 SLA 자동 적용
- 팀이 우선순위가 가장 높은 작업에 집중할 수 있도록 [Security Inbox에 발견 결과 추가][14]
- 조건에 일치하는 발견 결과에 대해 Jira 또는 ServiceNow에서 [티켓 생성][13]
- Slack, Microsoft Teams, 이메일 또는 기타 채널을 통해 담당 팀에 [알림 전송][16]

Automation Pipelines는 새로 탐지된 발견 결과와 Datadog에 이미 존재하는 발견 결과 모두에 적용되므로 정책 변경 사항이 환경 전체에 소급 적용됩니다.

### APM의 코드 수준 취약성 컨텍스트 {#code-level-vulnerability-context-in-apm}

IAST는 코드 수준 취약성이 확인된 서비스에 플래그를 지정하여 Application Performance Monitoring(APM)이 수집하는 기존 정보를 보강합니다. [APM Catalog][17]의 보안 화면에서 취약성이 있는 서비스가 강조 표시되므로 클릭 한 번으로 해당 서비스의 트레이스, 로그 및 인프라 컨텍스트로 이동할 수 있습니다.

## 취약성 수명 주기 {#vulnerability-lifecycle}

Datadog은 실행 중인 애플리케이션에서 Datadog 트레이싱 라이브러리가 확인한 정보를 바탕으로 **서비스** 수준에서 IAST 취약성을 추적합니다. 실행 중인 서비스에서 IAST가 코드 수준 취약성을 확인하면 해당 취약성이 열린 상태로 전환됩니다. 아래 수명 주기 규칙에 따라 Datadog이 더 이상 취약성을 탐지하지 않으면 해당 취약성이 닫힌 상태로 전환됩니다.

| 제품 | 범위 | 시나리오 | 취약성이 열리는 경우 | 취약성이 닫히는 경우 |
|---|---|---|---|---|
| IAST | 서비스 | 실행 중인 서비스 | Datadog이 실행 중인 서비스에서 코드 수준의 취약성을 확인한 경우 | 14일 동안 취약성이 다시 탐지되지 않은 경우 해당 기간이 지난 후 |
| IAST | 서비스 | 새 서비스 버전 배포 | Datadog이 실행 중인 서비스에서 코드 수준의 취약성을 확인한 경우 | 취약성이 처음 탐지된 환경에서 새 버전의 서비스에 해당 취약성이 더 이상 탐지되지 않은 시점부터 24시간이 지난 후 |

이전에 닫힌 취약성이 15개월 이내에 다시 탐지되면 Datadog은 반복되는 문제가 누락되지 않도록 해당 취약성을 자동으로 다시 엽니다.

## 런타임 코드 분석(IAST) 설정 {#set-up-runtime-code-analysis-iast}

IAST를 활성화하려면 서비스의 Datadog 트레이싱 라이브러리를 구성합니다. 언어별 자세한 지침은 [런타임 코드 분석(IAST) 설정][9]에서 확인할 수 있습니다. 추가 지원이 필요하면 [Datadog 지원팀][11]에 문의합니다.

IAST를 비활성화하는 방법에 대한 자세한 내용은 [Code Security 비활성화][12]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[3]: /ko/integrations/jira/
[4]: /ko/account_management/rbac/permissions/#integrations
[5]: /ko/security/code_security/iast/setup/#using-datadog-tracing-libraries
[7]: /ko/integrations/github/
[8]: /ko/integrations/gitlab/
[18]: /ko/integrations/azure_devops/
[19]: /ko/security/security_inbox/#what-appears-in-security-inbox
[9]: /ko/security/code_security/iast/setup/
[10]: https://app.datadoghq.com/security/configuration/code-security/setup
[11]: https://www.datadoghq.com/support/
[12]: /ko/security/code_security/troubleshooting
[13]: /ko/security/ticketing_integrations
[14]: /ko/security/automation_pipelines/
[15]: /ko/security/automation_pipelines/mute
[16]: /ko/security/notifications/
[17]: https://app.datadoghq.com/services?lens=Security