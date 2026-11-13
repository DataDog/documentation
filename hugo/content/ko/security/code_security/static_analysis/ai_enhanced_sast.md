---
aliases:
- /ko/security/code_security/static_analysis/malicious_pr_protection/
description: AI를 활용하여 정적 분석의 전체 수명 주기에 걸쳐 보안 관련 의사 결정을 강화하세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/open-source-ai-sast/
  tag: 블로그
  text: 오픈 소스 AI 네이티브 SAST 소개하기
- link: https://www.datadoghq.com/blog/ai-native-sast-detect-llm-vulnerabilities/
  tag: 블로그
  text: Datadog의 AI 네이티브 SAST로 LLM 애플리케이션의 취약성 탐지하기
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives
  tag: 블로그
  text: LLM을 사용하여 정적 코드 분석에서 오탐을 필터링하는 방법
- link: https://www.datadoghq.com/blog/sast-triage-agentic-evaluation-bits-memories/
  tag: 블로그
  text: 에이전트형 평가 및 Bits Memories를 활용하여 SAST 오탐 줄이기
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: 블로그
  text: Code Security용 Bits Code 소개하기
title: AI기반 정적 코드 분석
---
정적 코드 분석(SAST)은 AI를 사용하여 취약성 관리 수명 주기 전반에 걸쳐 탐지, 검증 및 수정을 자동화합니다.

| 수명 주기 단계 | 기능                                                                                                                  | 트리거 시점                            | 영향                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| 탐지       | [악성 PR 보호기능](#malicious-pr-protection)은 잠재적으로 악의적인 변경 사항이나 의심스러운 diff를 탐지합니다.                                        | PR 시점                                | 새로운 위험 코드를 도입하는 PR에 플래그를 지정합니다.                                       |
| 탐지 | [AI 네이티브 SAST](#ai-native-sast)는 LLM 기반 오염 분석을 사용하여 보안 취약성을 더 높은 정확도로 탐지합니다.                          | 스캔 시(Datadog 호스팅 스캔만 해당) | 규칙 기반 분석에서 놓친 컨텍스트상 복잡한 취약성을 식별합니다. |
| 검증     | [오탐 필터링](#false-positive-filtering)은 가능성이 낮은 발견 결과의 우선 순위를 낮춥니다.                                                            | 스캔 후                                | 노이즈를 줄이고 실제 문제에 집중할 수 있게 합니다.                                   |
| 검증 | [에이전트형 오탐 필터링](#agentic-false-positive-filtering)은 파일 간 컨텍스트를 활용하여 일부 인젝션 관련 규칙에서 실제 취약성일 가능성이 낮은 발견 결과의 우선 순위를 낮춥니다. | 스캔 후                        | 지원되는 규칙 범주에 대해 파일 간 동작과 관련된 오탐을 줄입니다. |
| 수정                  | [수정 기능](#remediation)은 Bits Code를 사용하여 수정 제안을 수동 또는 자동으로 생성합니다.        | 스캔 후                                | 개발자의 작업 부담을 줄이고 수정 주기를 단축합니다.                              |

## 탐지 {#detection}

탐지 기능에는 풀 리퀘스트에서 잠재적인 악성 의도를 식별하고 LLM을 사용하여 코드베이스의 취약성을 스캔하는 기능이 포함됩니다. 

### 악성 PR 보호 {#malicious-pr-protection}

{{< callout url="https://www.datadoghq.com/product-preview/malicious-pr-protection/" >}}
악성 PR 보호 기능은 미리 보기로 제공되고 있으며, GitHub 리포지토리만 지원합니다.
{{< /callout >}}

악성 PR 보호 기능은 LLM을 사용하여 리포지토리의 기본 브랜치에 제출된 PR에서 다음과 같은 유해한 코드 변경 사항을 스캔합니다.

- 코드 인젝션
- 시크릿 유출 시도
- 악성 패키지 푸시
- CI 워크플로 침해

예시는 [tj-actions/changed-files 침해(2025년 3월)][2], [난독화된 악성 npm 패키지(2025년 9월)][3] 및 [악성 PR 보호 기능 발표 블로그 게시물][1]을 참조하세요.

[Security Signals 탐색기][4]에서 {{< ui >}}Source{{< /ui >}} 또는 {{< ui >}}Scope{{< /ui >}} 패싯을 `datadog-code-security`로 좁혀 악성 PR 탐지 결과를 찾으세요. {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Scan Verdict{{< /ui >}} 패싯을 사용하여 악성 또는 정상 판정별로 필터링하거나 직접 검색하세요.

- `source:datadog-code-security`
- `@pr_security.scan.verdict:malicious`
- `@pr_security.scan.verdict:benign`

특정 취약성에 대해 조사할 신호를 할당하거나, 보안 케이스를 생성하거나, 인시던트를 선언하거나, 워크플로를 실행할 수 있습니다.
  
### AI 네이티브 SAST {#ai-native-sast}

AI 네이티브 SAST는 Datadog 호스팅 스캔에서만 사용할 수 있습니다.

AI 네이티브 SAST는 LLM을 사용하여 코드 내 데이터 흐름을 추론함으로써 보안 취약성을 탐지합니다. 규칙 기반 정적 분석과 달리 AI 네이티브 SAST는 2단계 접근 방식을 사용하여 컨텍스트를 고려해 취약성을 식별할 수 있습니다.

1. **탐지**: LLM이 각 파일을 스캔하고 사용자 제어 데이터가 새니타이즈되지 않은 채 위험한 작업에 도달할 수 있는지 추론합니다.
2. **검증**: 두 번째 LLM이 오염 분석을 통해 각 후보 발견 결과를 독립적으로 재평가하고, 각 결과를 확인하거나 기각하여 오탐을 줄입니다.

AI 네이티브 SAST를 활성화하려면 소스 코드 관리 통합 설정에서 {{< ui >}}Enable AI SAST{{< /ui >}}를 켭니다. 모든 리포지토리 또는 특정 리포지토리에 대해 활성화할 수 있습니다.

활성화되면 AI 네이티브 SAST는 규칙 기반 정적 분석과 병렬로 실행되며, 두 방식 모두에서 다루는 취약성 유형에 대해서는 AI 네이티브 SAST의 발견 결과가 우선합니다.

AI 네이티브 SAST는 다음 언어를 지원합니다.

- C#
- C++
- Dart
- Elixir
- Go
- Java
- JavaScript
- Kotlin
- PHP
- Python
- Ruby
- Rust
- Swift
- TypeScript

{{% collapse-content title="지원되는 CWE 목록" level="h4" expanded=false id="ai-native-sast-cwes" %}}
AI 네이티브 SAST는 다음과 같은 취약성 유형을 탐지합니다.

- [CWE-89: SQL 인젝션](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-78: 명령 인젝션](https://cwe.mitre.org/data/definitions/78.html)
- [CWE-79: 크로스 사이트 스크립팅(XSS)](https://cwe.mitre.org/data/definitions/79.html)
- [CWE-643: XPath 인젝션](https://cwe.mitre.org/data/definitions/643.html)
- [CWE-22: 경로 탐색](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-73: Zip Slip](https://cwe.mitre.org/data/definitions/73.html)
- [CWE-74: 부적절한 출력 처리](https://cwe.mitre.org/data/definitions/74.html)
- [CWE-502: 안전하지 않은 역직렬화](https://cwe.mitre.org/data/definitions/502.html)
- [CWE-327: 취약한 암호화](https://cwe.mitre.org/data/definitions/327.html)
- [CWE-328: 취약한 해싱](https://cwe.mitre.org/data/definitions/328.html)
- [CWE-330: 취약한 난수성](https://cwe.mitre.org/data/definitions/330.html)
- [CWE-614: 안전하지 않은 쿠키](https://cwe.mitre.org/data/definitions/614.html)
- [CWE-90: LDAP 인젝션](https://cwe.mitre.org/data/definitions/90.html)
- [CWE-94: 코드 인젝션](https://cwe.mitre.org/data/definitions/94.html)
- [CWE-117: 로그 인젝션](https://cwe.mitre.org/data/definitions/117.html)
- [CWE-190: 정수 오버플로 또는 래핑](https://cwe.mitre.org/data/definitions/190.html)
- [CWE-200: 민감한 정보 노출](https://cwe.mitre.org/data/definitions/200.html)
- [CWE-209: 오류 메시지를 통한 정보 노출](https://cwe.mitre.org/data/definitions/209.html)
- [CWE-250: 과도한 권한](https://cwe.mitre.org/data/definitions/250.html)
- [CWE-501: 신뢰 경계 위반](https://cwe.mitre.org/data/definitions/501.html)
- [CWE-284: 취약한 접근 제어(IDOR)](https://cwe.mitre.org/data/definitions/284.html)
- [CWE-345: 데이터 및 모델 오염](https://cwe.mitre.org/data/definitions/345.html)
- [CWE-349: 벡터 및 임베딩 취약점](https://cwe.mitre.org/data/definitions/349.html)
- [CWE-400: 무제한 리소스 소비](https://cwe.mitre.org/data/definitions/400.html)
- [CWE-540: 시스템 프롬프트 유출](https://cwe.mitre.org/data/definitions/540.html)
- [CWE-601: 오픈 리다이렉트](https://cwe.mitre.org/data/definitions/601.html)
- [CWE-829: 공급망 취약성](https://cwe.mitre.org/data/definitions/829.html)
- [CWE-1321: 프로토타입 오염](https://cwe.mitre.org/data/definitions/1321.html)
- [CWE-1426: 잘못된 정보](https://cwe.mitre.org/data/definitions/1426.html)
- [CWE-1427: 프롬프트 인젝션](https://cwe.mitre.org/data/definitions/1427.html)
  {{% /collapse-content %}}

AI 네이티브 SAST는 Code Security `sast` 구성에서 언어별 규칙 세트(예: `python-ai_sast`)를 사용합니다. 규칙 세트 이름의 전체 목록과 Datadog 호스팅 스캔을 위한 규칙 세트 선택 및 제외 방법은 [정적 코드 분석(SAST) 구성][15]을 참조하세요.

## 검증 {#validation}

오탐 필터링은 스캔이 완료된 후 수행됩니다. 기본 오탐 필터링과 일부 규칙에 대해 파일 간 컨텍스트를 수집하는 에이전트형 필터링이라는 두 가지 필터링 계층을 사용할 수 있습니다.

### 오탐 필터링 {#false-positive-filtering}

[Bits AI][9]는 SAST 발견 결과를 검토하고 실제 취약성일 가능성이 높은지 오탐일 가능성이 높은지 평가하며, 판단 근거에 대한 간략한 설명도 제공합니다.

[Code Security SAST 취약성][6]에서 목록의 범위를 좁히려면 {{< ui >}}Filter out false positives{{< /ui >}}를 활성화하세요. 이 기능은 `-bitsAssessment:"False Positive"` 쿼리를 적용합니다.

### 에이전트형 오탐 필터링 {#agentic-false-positive-filtering}

에이전트형 오탐 필터링은 기본 오탐 필터링의 향상된 버전입니다. Bits AI는 현재 분석 중인 코드만 평가하는 대신 파일 간 컨텍스트를 수집합니다. 관련 파일을 읽고, 심볼을 검색하며, 주변 디렉터리 구조를 검사합니다.

에이전트형 오탐 필터링은 SQL 인젝션 및 명령 인젝션과 같은 인젝션 관련 SAST 규칙에만 적용됩니다. 

### 사용자 지정 컨텍스트 {#custom-context}

*사용자 지정 컨텍스트*를 사용하면 Bits AI가 모든 오탐 필터링에서 발견 결과를 평가할 때 사용하는 규칙별 지침을 추가할 수 있습니다. 사용자 지정 컨텍스트를 사용하여 조직별 프레임워크, 새니타이저, 유효성 검사 패턴 또는 코드베이스 세부 정보를 설명하세요.

사용자 지정 컨텍스트는 조직 및 규칙 수준에서 적용되며, Datadog의 기본 규칙 세트에 있는 보안 범주 SAST 규칙에만 적용되고 사용자 지정 규칙에는 적용되지 않습니다. SAST 규칙의 사이드 패널에서 사용자 지정 컨텍스트를 검토하거나 추가하세요.

## 수정 {#remediation}

[Bits Code][10]는 취약성에 대한 코드 수정 사항을 단일 수정 또는 자동화 형태로 생성합니다.

1. [Code Security SAST 취약성][6]에서 취약성을 선택하여 발견 결과와 영향을 받는 코드에 대한 세부 정보가 포함된 사이드 패널을 엽니다.
2. {{< ui >}}Next Steps{{< /ui >}} 사이드바에서 {{< ui >}}Remediate with AI{{< /ui >}}을 클릭한 다음 옵션을 선택합니다.
    - {{< ui >}}Single fix{{< /ui >}}: 제안된 diff를 검토하고, 후속 질문을 하고, 패치를 편집하고, 풀 리퀘스트를 생성하여 단일 취약성을 수정합니다. 수정이 이미 생성된 경우 {{< ui >}}View fix and create PR{{< /ui >}}을 선택하여 기존 수정 세션을 조회합니다.
    - {{< ui >}}Create automation{{< /ui >}}: 취약성이 발견될 때마다 또는 예약된 일정에 따라 자동으로 수정 사항을 생성합니다. 이 옵션을 선택하면 {{< ui >}}Remediate SAST vulnerabilities{{< /ui >}} 작업이 미리 채워진 모달이 열립니다. 트리거 및 출력을 지정하는 것을 포함하여 양식을 작성한 다음 {{< ui >}}Create Automation{{< /ui >}}을 클릭합니다. 

세션 세부 정보를 조회하여 병합하기 전에 변경 사항을 검토하고 검증할 수 있습니다. 검토 항목은 다음과 같습니다.

- 원본 보안 발견 결과 및 제안된 코드 변경 사항.
- Bits Code가 수정을 생성한 방법 및 이유에 대한 설명.
- 패치를 배포해도 안전한지 검증하기 위한 CI 결과(활성화된 경우).
- 수정사항을 개선하거나 {{< ui >}}Create PR{{< /ui >}}을 통해 소스 코드 리포지토리에 변경 사항을 적용하는 옵션.

<div class="alert alert-tip">취약성을 검토하여 세션 세부 정보를 조회하세요. {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Sessions{{< /ui >}}에서 모든 Bits Code 세션을 조회하세요. {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}에서 모든 Bits Code 자동화를 조회하세요.</div>


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/engineering/malicious-pull-requests/
[2]: https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction
[3]: https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem
[4]: https://app.datadoghq.com/security
[6]: https://app.datadoghq.com/security/code-security/sast
[9]: /ko/bits_ai/
[10]: /ko/bits_ai/bits_code
[15]: /ko/security/code_security/static_analysis/configuration/#configure-ai-native-sast