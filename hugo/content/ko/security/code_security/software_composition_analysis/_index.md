---
aliases:
- /ko/security/application_security/software_composition_analysis/setup/
- /ko/security/application_security/software_composition_analysis/
- /ko/code_analysis/software_composition_analysis/
- /ko/security/application_security/vulnerability_management/
disable_toc: false
further_reading:
- link: /security/code_security/software_composition_analysis/setup_static/
  tag: 설명서
  text: Static SCA 설정
- link: /security/code_security/software_composition_analysis/setup_runtime/
  tag: 설명서
  text: Runtime SCA 설정
- link: /security/code_security/software_composition_analysis/library_inventory
  tag: 설명서
  text: 라이브러리 인벤토리
- link: /security/code_security/software_composition_analysis/cve_explorer
  tag: 설명서
  text: CVE 탐색기
- link: /pr_gates/
  tag: 설명서
  text: PR 게이트
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: 블로그
  text: Datadog Secret Scanning을 사용하여 노출된 자격 증명 탐지 및 차단
- link: https://www.datadoghq.com/blog/smart-vulnerability-remediation/
  tag: 블로그
  text: Datadog으로 더욱 스마트하게 취약성 해결
- link: https://www.datadoghq.com/blog/remediate-faster-code-security
  tag: 블로그
  text: Datadog Software Composition Analysis로 더욱 빠르게 전이적 취약성 해결
- link: https://www.datadoghq.com/blog/devsecops-2026-study-learnings
  tag: 블로그
  text: 2026 State of DevSecOps 연구에서 얻은 주요 인사이트
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: 블로그
  text: 'CI/CD Security: GitHub 생태계를 보호하는 방법'
title: Software Composition Analysis
---
## 개요 {#overview}

Software Composition Analysis(SCA)는 리포지토리와 실행 중인 서비스 모두에서 오픈소스 라이브러리를 탐지하여 개발부터 프로덕션까지 라이브러리 취약성 및 라이선스 관리에 대한 엔드투엔드 가시성을 제공합니다.

Software Composition Analysis를 사용하면 다음과 같은 이점을 얻을 수 있습니다.
- 오픈소스 라이브러리에 영향을 미치는 새로운 취약성과 알려진 취약성 식별
- 런타임 취약성 탐지를 기반으로 위험에 따라 우선순위를 지정하고 취약성 해결
- OpenSSF 표준에 기반한 악성 패키지, 지원 종료된 라이브러리 및 라이브러리 위험도 식별
- 탐지된 라이브러리의 소프트웨어 자재 명세서(SBOM)를 CycloneDX 1.6 또는 SPDX 2.3 형식으로 내보내기

## 작동 방식 {#how-it-works}

SCA는 상호 보완적인 두 가지 탐지 모드를 지원합니다.
- **정적 탐지**는 종속성 파일(잠금 파일 및 매니페스트)을 분석하여 리포지토리를 스캔합니다. 기본적으로 활성화된 리포지토리에서 커밋으로 지원되는 종속성 매니페스트 또는 잠금 파일이 업데이트되면 스캔이 실행됩니다. CI/CD 파이프라인에서 SCA를 실행할 수도 있습니다(CI 작업은 `push` 이벤트에 대해 지원됨). 시작하려면 [정적 SCA 설정][1]을 참조하세요.
- **런타임 탐지**는 Datadog APM의 계측을 사용하여 서비스가 런타임에 로드하고 사용하는 라이브러리를 식별합니다. 시작하려면 [런타임 SCA 설정][2]을 참조하세요.

Datadog이 새로운 보안 권고를 수집하면 마지막으로 확인된 라이브러리 인벤토리와 대조하여 리포지토리를 다시 스캔하지 않아도 Vulnerabilities Explorer에 표시합니다. Repositories Explorer는 커밋을 기준으로 범위가 지정되며 스캔 실행 시점에 알려진 정보를 반영합니다. 따라서 Datadog이 보안 권고를 수집하기 전에 실행된 스캔의 경우 해당 커밋에 대해 새로 게시된 보안 권고가 Repositories Explorer에 표시되지 않습니다. 자세한 내용은 [SCA 보기 이해](#understanding-sca-views)를 참조하세요.

## 취약성 데이터베이스 {#vulnerability-database}

Datadog SCA는 여러 퍼블릭 및 프라이빗 소스에서 정보를 가져와 엄선된 독점 데이터베이스를 구축합니다. 이러한 소스에는 [National Vulnerability Database(NVD)][21], [GitHub Advisory Database][22], [osv.dev][23], 생태계별 권고 사항(예: [PyPA's Advisory Database][24], [Global Security Database][25]), [Datadog GuardDog][26], 그리고 Datadog Security Research가 포함됩니다.

Datadog은 이러한 소스를 사용하여 지원되는 생태계 전반에서 알려진 취약성, 악성 패키지 및 새로운 공급망 위협을 식별합니다. 새로운 취약성이 공개된 후 Datadog에 표시되기까지 최대 1시간이 걸리며, 새롭게 발생하는 취약성은 일반적으로 몇 분 이내에 표시됩니다. 악성 패키지는 6시간 이내에 Datadog에 보고됩니다.

## 퍼블릭 익스플로잇 소스 {#public-exploit-sources}

Datadog은 CISA(Known Exploited Vulnerabilities Catalog), Exploit-DB, NIST(National Vulnerability Database), GitHub(퍼블릭 익스플로잇 참조 자료) 등 여러 퍼블릭 소스의 데이터를 집계하여 취약성에 알려진 퍼블릭 익스플로잇이 있는지 식별합니다.

Datadog이 이러한 소스 중 하나에서 취약성에 대한 퍼블릭 익스플로잇을 식별하면 문제 해결의 우선순위를 지정할 수 있도록 해당 발견 결과에 플래그를 지정합니다.

## 주요 기능 {#key-capabilities}

### 취약성 검토 및 우선순위 지정 {#review-and-prioritize-vulnerabilities}

[Vulnerabilities Explorer][11]는 SCA가 탐지한 라이브러리 취약성과 다른 Code Security 기능(SAST, IAST, Secrets Scanning, IaC)이 탐지한 취약성을 취약성 중심으로 보여줍니다. 탐색기에 표시되는 모든 취약성은 스캔된 리포지토리의 기본 브랜치에서 최신 커밋을 기준으로 탐지되었거나 실행 중인 서비스에 영향을 미치는 취약성입니다.

#### Datadog Severity Score {#datadog-severity-score}

Datadog은 문제 해결의 우선순위 지정을 돕기 위해 런타임 컨텍스트와 악용 가능성을 나타내는 신호를 반영하여 기본 CVSS 점수를 **Datadog Severity Score**로 조정합니다. 이러한 요인은 이론적 위험과 실제 환경에서 악용될 가능성이 더 높은 취약성을 구분하는 데 도움이 됩니다. 아래 표에서는 각 요인이 최종 점수에 미치는 영향을 설명합니다.

| 위험 요인                       | 평가 방법                                                  | 점수에 미치는 영향                                    |
|-----------------------------------|----------------------------------------------------------------------|--------------------------------------------------------|
| 기본 CVSS 점수                   | 취약성에 대해 공개된 CVSS 점수                          | 심각도 점수의 시작점입니다.                 |
| 도달 가능성                      | 취약한 함수가 소스 코드에서 참조되는지 여부(리포지토리 수준에서 정적 탐지) | 코드에서 취약한 함수에 도달할 수 있는 것으로 확인되면 점수가 높아집니다. |
| 프로덕션 런타임 컨텍스트        | 영향을 받는 서비스가 프로덕션 환경에서 실행 중인지 여부 | 서비스가 프로덕션에서 실행 중이지 않으면 감소합니다. |
| 공격 진행 중                      | 서비스를 대상으로 공격이 실제로 진행되고 있다는 증거            | 관찰된 공격 활동이 없으면 감소합니다.     |
| 익스플로잇 가용성              | 해당 취약성에 대한 퍼블릭 익스플로잇을 사용할 수 있는지 여부               | 사용 가능한 익스플로잇이 없으면 점수가 낮아집니다.                  |
| 악용 확률(EPSS) | EPSS 데이터를 기반으로 한 실제 환경에서의 악용 가능성            | 악용 확률이 낮으면 점수가 낮아집니다. |

#### 취약성 세부 정보 조회 {#view-vulnerability-details}

Vulnerabilities Explorer에서 취약성을 클릭하여 사이드 패널을 엽니다.

##### 리포지토리 {#repositories}

{{< ui >}}Repositories{{< /ui >}} 섹션에는 Static SCA가 라이브러리 취약성을 탐지한 파일 및 리포지토리가 나열됩니다. 각 발견 결과에 대해 관련 서비스와 팀, 발견 결과의 상태 및 분류 액션이 표시됩니다. 행을 확장하면 중증도별 세부 내역과 도달 가능한 위치(있는 경우)를 확인할 수 있습니다.

##### 영향을 받는 서비스 {#impacted-services}

{{< ui >}}Impacted services{{< /ui >}} 섹션에는 Runtime SCA가 라이브러리 취약성을 탐지한 서비스가 나열됩니다. 각 서비스에 대해 환경, 종속성 세부 정보, 도달 가능성, 관련 팀, 발견 결과의 상태 및 Datadog이 해당 취약성을 마지막으로 탐지한 시점이 표시됩니다.

##### 영향을 받는 인프라 {#impacted-infrastructure}

Runtime SCA가 영향을 받는 서비스를 탐지하면 {{< ui >}}Impacted Infrastructure{{< /ui >}} 섹션에 영향을 받는 라이브러리 버전이 실행되는 호스트가 나열됩니다. 또한 관련 서비스, 환경 및 마지막 배포 시간이 표시됩니다.

영향을 받는 인프라를 조사하려면 다음 단계를 따르세요.

1. 영향을 받는 호스트, 서비스, 환경 및 마지막 배포 시간을 검토합니다.
1. 호스트를 조사하려면 {{< ui >}}View Host{{< /ui >}}를 선택합니다.
1. 호스트의 미해결 취약성을 검토하려면 {{< ui >}}View Vulnerabilities in Cloud Security{{< /ui >}}를 선택합니다.

### 리포지토리별 발견 결과 조회 {#view-findings-by-repository}

[Repositories Explorer][12]는 정적 코드 분석(SAST), Software Composition Analysis(SCA), Secrets Scanning 및 코드형 인프라(IaC) 전반의 모든 스캔 결과를 리포지토리 중심으로 보여줍니다. 리포지토리를 클릭하여 선택한 브랜치와 커밋을 기준으로 범위가 지정된 SCA의 {{< ui >}}Library Vulnerabilities{{< /ui >}} 및 {{< ui >}}Library Catalog{{< /ui >}} 결과를 분석합니다.
* {{< ui >}}Library Vulnerabilities{{< /ui >}} 탭에는 Datadog SCA가 발견한 취약한 라이브러리 버전이 표시됩니다.
* {{< ui >}}Library Catalog{{< /ui >}} 탭에는 Datadog SCA가 발견한 모든 라이브러리(취약성 유무와 관계없음)가 표시됩니다.

탐지된 취약성을 해결하기 위한 권장 단계는 SCA에서 각 취약성의 사이드 패널에서 확인할 수 있습니다. 라이브러리를 가장 안전한 버전(취약점이 없는 버전) 또는 가장 가까운 버전으로 업그레이드하는 단계가 제공됩니다.

결과를 필터링하려면 목록 왼쪽의 패싯이나 상단의 검색창을 사용합니다. 서비스 또는 팀 패싯을 사용하여 결과를 필터링할 수 있습니다. 결과가 Datadog 서비스 및 팀과 연결되는 방식에 대한 자세한 내용은 [발견 결과를 Datadog 서비스 및 팀에 연결][18]을 참조하세요.

각 행은 특정 라이브러리와 버전의 고유한 조합을 나타냅니다. 각 조합은 페이지 상단의 필터에서 선택한 특정 커밋 및 브랜치(기본적으로 선택한 리포지토리의 기본 브랜치에서 가장 최근 커밋)와 연결됩니다.

취약성이 있는 라이브러리를 클릭하면 문제 해결 단계에 대한 정보가 포함된 사이드 패널이 열립니다.

<!-- {{< img src="code_security/software_composition_analysis/sca-violation.png" alt="SCA 위반 사항의 사이드 패널" style="width:80%;">}} -->

### 문제 해결 {#remediation}

Datadog SCA는 코딩 에이전트와 [Bits Code][31]를 사용하여 취약성이 있는 라이브러리를 수정하는 기능을 지원합니다. [Bits Code Automation][32]을 사용하여 취약성이 발견될 때마다 또는 지정된 일정에 따라 수정 사항을 자동으로 생성할 수도 있습니다.

<div class="alert alert-info">Bits Code의 SCA 문제 해결 기능을 통해 라이브러리를 업그레이드하려면 인터넷 액세스가 필요합니다. 인터넷 액세스를 구성하려면 <a href="/bits_ai/bits_code/setup/#configure-internet-access">인터넷 액세스 구성</a>을 참조하세요.</div>

취약성을 확인하고 해결하려면 다음 단계를 따르세요.

1. Datadog에서 [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Vulnerabilities{{< /ui >}}][11]로 이동한 후 {{< ui >}}Libraries (SCA){{< /ui >}}를 선택합니다.
2. 취약성을 선택하여 발견 결과와 영향을 받는 라이브러리의 세부 정보가 표시된 사이드 패널을 엽니다.
3. {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}} 섹션에서 {{< ui >}}Remediate with AI{{< /ui >}}를 클릭합니다.
4. Bits Code 또는 다른 코딩 에이전트 중 하나를 선택합니다. Bits Code에서는 다음 옵션 중 하나를 선택할 수 있습니다.
   - [{{< ui >}}Single fix{{< /ui >}}](#single-fix): 이 취약한 라이브러리에 대한 수정 사항을 생성합니다.
     - 수정 사항이 이미 생성된 경우 {{< ui >}}View fix and create PR{{< /ui >}}을 선택하여 기존 [문제 해결 세션](#remediation-session-details)을 확인합니다.
   - [{{< ui >}}Create automation{{< /ui >}}](#create-automation): [Bits Code 자동화][32]를 생성할 수 있는 팝업 모달이 열립니다.

#### 단일 수정 {#single-fix}

**Single fix**를 사용하여 이 취약성 하나를 해결할 Bits Code 세션을 엽니다. 제안된 diff를 검토하고, 후속 질문을 하고, 패치를 편집하고, 풀 리퀘스트를 생성하여 소스 코드 리포지토리에 수정 사항을 적용할 수 있습니다.

{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][33]에서 모든 Bits Code 세션을 확인할 수 있습니다.

#### 자동화 생성 {#create-automation}

**Create automation**을 사용하여 SCA 취약성이 발견될 때마다 또는 지정된 일정에 따라 수정 사항을 자동으로 생성하는 [Bits Code 자동화][32]를 만듭니다.

이 옵션을 선택하면 {{< ui >}}Remediate SCA vulnerabilities{{< /ui >}} 액션이 미리 입력된 {{< ui >}}Automate with Bits{{< /ui >}} 모달이 열립니다. 트리거 및 출력을 지정하는 것을 포함하여 양식을 작성한 다음 {{< ui >}}Create Automation{{< /ui >}}을 클릭합니다. 액션, 트리거 및 출력에 대한 자세한 내용은 [자동화][32]를 참조하세요.

{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Automations{{< /ui >}}][34]에서 모든 Bits Code 자동화를 확인할 수 있습니다.

#### 문제 해결 세션 세부 정보 {#remediation-session-details}

각 Bits Code 세션은 AI가 생성한 수정의 수명 주기를 보여주므로 병합하기 전에 변경 사항을 검토하고 검증할 수 있습니다. 여기에는 다음이 포함됩니다.

- 원본 보안 감지 항목 및 제안된 코드 변경 사항
- Bits Code가 수정을 생성한 방법 및 이유에 대한 설명
- 패치가 배포하기에 안전한지 검증하기 위한 CI 결과(활성화된 경우)
- 수정 사항을 개선하거나 {{< ui >}}Create PR{{< /ui >}}을 통해 소스 코드 리포지토리에 변경 사항을 적용하는 옵션

[**Sessions**][33]에서 모든 문제 해결 세션을 확인할 수도 있습니다.

#### Cursor로 수정 {#fix-with-cursor}
Bits Code 대신 Cursor와 같은 AI 코딩 에이전트를 사용하여 다음과 같이 수정 사항을 생성할 수 있습니다.

1. {{< ui >}}Remediate with AI{{< /ui >}} 대화 상자에서 {{< ui >}}Coding agent{{< /ui >}} 탭을 선택합니다.
2. {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}} 아래에서 {{< ui >}}Fix with Cursor{{< /ui >}} 옆의 {{< ui >}}Open{{< /ui >}}을 클릭합니다. Datadog은 해당 취약성을 해결하기 위한 권장 라이브러리 업그레이드가 포함된 맞춤형 프롬프트와 함께 Cursor를 엽니다.

다른 에이전트를 사용하려면 {{< ui >}}Copy fix prompt{{< /ui >}} 옆의 {{< ui >}}Copy{{< /ui >}}를 클릭하고 프롬프트를 선택한 에이전트에 붙여넣습니다.

이 절차는 취약성 사이드 패널의 {{< ui >}}Remediation{{< /ui >}} 섹션이나 {{< ui >}}Repositories{{< /ui >}} 표에서 시작할 수 있습니다. 표의 각 행은 취약성이 있는 라이브러리가 포함된 리포지토리 또는 파일을 나타냅니다.

Cursor 딥 링크를 처리하려면 [VS Code 및 Cursor용 Datadog 확장 프로그램](/ide_plugins/vscode/?tab=cursor)을 설치하세요.

{{< img src="code_security/software_composition_analysis/fix-with-cursor.png" alt="Remediate with AI 대화 상자, Coding 에이전트 탭이 선택되어 있고 Fix with Cursor와 Copy fix prompt 옵션이 표시됨" style="width:100%;" >}}

### PR 게이트로 위험한 변경 사항 자동 차단 {#automatically-block-risky-changes-with-pr-gates}

[PR Gates][16]를 사용하여 변경 사항이 병합되기 전에 오픈소스 라이브러리에 대한 보안 표준을 적용합니다. Datadog은 각 풀 리퀘스트에 새로 추가된 종속성을 스캔하고, 구성된 심각도 임계값을 초과하는 취약성 또는 라이선스 위반을 식별한 후 GitHub 또는 Azure DevOps에 통과 또는 실패 상태를 보고합니다.

다음 항목을 차단하도록 PR Gates를 구성할 수 있습니다.
- **보안 취약성**: 구성된 심각도 임계값을 초과하는 알려진 CVE가 있는 라이브러리
- **라이선스 위반**: 조직의 정책을 준수하지 않는 라이선스를 사용하는 라이브러리

PR Gates는 개발자가 해당 PR에서 새로운 위반 사항을 발생시킨 경우에만 PR 검사를 실패로 표시합니다. PR 브랜치가 생성되기 전부터 코드베이스에 존재했던 위반 사항으로 인해 검사가 실패하지는 않습니다. 기본적으로 실패한 검사는 정보 제공용으로만 사용되며 병합을 차단하지 않습니다. 하지만 GitHub 또는 Azure DevOps에서 차단하도록 구성하면 심각한 문제가 탐지되었을 때 병합을 방지할 수 있습니다. 설정 방법은 [PR 게이트 규칙 설정][17]을 참조하세요.

### 라이브러리 인벤토리 관리 {#manage-your-library-inventory}

[라이브러리 인벤토리][8]는 코드베이스 전체에서 탐지된 타사 라이브러리에 대한 가시성을 제공합니다. Datadog은 다음 소스에서 이 정보를 수집합니다.

* **Static SCA**: 리포지토리에서 참조되는 모든 라이브러리를 식별합니다.
* **Runtime SCA**: 런타임에 서비스에서 실제로 로드하고 사용하는 라이브러리를 탐지합니다.

라이브러리 인벤토리를 사용하여 어떤 종속성을 사용하고 있는지, 해당 종속성이 어디에서 사용되는지, 알려진 취약성이나 라이선스 위험이 있는지 파악합니다.

인벤토리가 생성되는 방식, Static 및 Runtime 데이터의 차이점, 라이브러리 세부 정보(사용량, 취약성, 라이선스, 버전 및 OpenSSF 점수)를 해석하는 방법에 대한 자세한 내용은 [라이브러리 인벤토리][14]를 참조하세요.

### 소프트웨어 자재 명세서(SBOM) 내보내기 {#export-a-software-bill-of-materials}

[라이브러리 인벤토리][8]에서 타사 라이브러리의 SBOM을 직접 내보냅니다. 내보낸 SBOM에는 정적 분석(Static SCA) 및 런타임 분석(Runtime SCA)으로 탐지된 라이브러리가 모두 포함되어 있어 소프트웨어 공급망 전체를 하나의 통합된 보기에서 확인할 수 있습니다.

Datadog은 다음 SBOM 형식을 지원합니다.

- **CycloneDX 1.6**
- **SPDX 2.3**

내보낸 SBOM을 사용하여 다운스트림 사용자와 종속성 데이터를 공유하거나, 규정 준수 및 규제 요건을 충족하거나, 다른 공급망 도구에 데이터를 제공할 수 있습니다.

SBOM 생성 및 다운로드 방법에 대한 자세한 내용은 [라이브러리 인벤토리][29]를 참조하세요.

### 전체 CVE 카탈로그 탐색 {#explore-the-full-cve-catalog}

[CVE 탐색기][15]를 사용하여 환경에 영향을 미치지 않는 항목을 포함해 Datadog이 추적하는 모든 CVE 및 보안 권고를 검색할 수 있습니다. 이를 통해 새로 공개된 취약성이 발견 결과에 표시되기 전에 해당 취약성에 대한 노출 정도를 평가할 수 있습니다.

Datadog은 스캔된 리포지토리와 서비스에서 탐지된 패키지에 영향을 미치는 CVE를 자동으로 영향받는 항목으로 표시합니다. 스캔되지 않은 자산에는 영향받는 상태가 표시되지 않습니다.

각 CVE에 대해 중증도 점수, 익스플로잇 가용성, EPSS 점수, CISA KEV 상태, 영향을 받는 패키지 및 수정된 버전을 확인할 수 있습니다. 자세한 내용은 [CVE 탐색기][27]를 참조하세요.

### 발견 결과로 티켓 생성 {#create-tickets-from-findings}

모든 발견 결과에서 Jira 또는 ServiceNow의 양방향 티켓을 직접 생성하여 기존 워크플로에서 문제를 추적하고 해결할 수 있습니다. Datadog과 티켓팅 도구 간에 티켓 상태가 지속적으로 동기화됩니다. 자세한 내용은 [티켓팅 통합][19]을 참조하세요.

<div class="alert alert-info">티켓 생성은 리포지토리(Static SCA)에서 탐지된 라이브러리 취약성 발견 결과에 대해서만 사용할 수 있습니다. 실행 중인 서비스에서만 탐지된 발견 결과에 대해서는 티켓을 생성할 수 없습니다.</div>

### 발견 결과 음소거 {#mute-findings}

발견 사항을 차단하려면 발견 사항 세부 정보 패널에서 {{< ui >}}Mute{{< /ui >}}를 클릭하세요. 그러면 태그 값(예: `repository`)에 따라 컨텍스트를 고려한 필터링을 수행하는 [자동화 규칙을 생성][20]할 수 있는 워크플로가 열립니다. 발견 사항을 음소거하면 해당 항목이 숨겨지고 보고서에서 제외됩니다.

<div class="alert alert-info">음소거는 리포지토리(Static SCA)에서 탐지된 라이브러리 취약성 발견 결과에 대해서만 사용할 수 있습니다. 실행 중인 서비스에서만 탐지된 발견 결과는 음소거할 수 없습니다.</div>

음소거된 발견 사항을 복원하려면 세부 정보 패널에서 {{< ui >}}Unmute{{< /ui >}}를 클릭하세요. [취약성 탐색기][11]에서 {{< ui >}}Status{{< /ui >}} 필터를 사용하여 음소거된 발견 결과를 검토할 수도 있습니다.

### APM의 라이브러리 취약성 컨텍스트 {#library-vulnerability-context-in-apm}

SCA는 현재 취약성 관련 보안 권고에 해당하는 라이브러리에 플래그를 지정하여 Application Performance Monitoring(APM)이 이미 수집한 정보를 보강합니다. 잠재적으로 취약한 서비스는 [APM 카탈로그][10]의 Security 보기에서 직접 강조 표시됩니다.

## SCA 보기 이해 {#understanding-sca-views}

Repositories Explorer와 Vulnerabilities Explorer는 서로 다른 목적을 가지면서 상호 보완적인 역할을 합니다.

Repositories Explorer는 스캔 시점에 탐지된 라이브러리와 취약성의 스냅샷을 보여줍니다. 특정 커밋 시점에 해당 리포지토리에 존재했던 라이브러리와 스캔 당시 알려진 취약성을 보여줍니다. 이 보기는 스캔 실행 후 새로운 보안 권고가 게시되더라도 소급하여 업데이트되지 않습니다.

Vulnerabilities Explorer는 최신 보안 권고 데이터베이스와 지속적으로 대조하여 업데이트되는 실시간 보기를 제공합니다. 리포지토리 스캔 후 새로운 취약성 관련 보안 권고가 게시되면 리포지토리를 다시 스캔하지 않았거나 마지막 스캔이 이전 커밋을 대상으로 수행되었더라도 Vulnerabilities Explorer에 자동으로 표시됩니다. 이를 통해 취약성 노출 상태에 관한 정보를 항상 최신으로 유지할 수 있습니다.

<div class="alert alert-info"><b>예시</b>: 오전 10시에 스캔이 실행되고 오후 4시에 리포지토리에 있는 라이브러리에 대한 CVE 보안 권고가 게시되면 해당 커밋의 Repositories Explorer에는 CVE가 표시되지 않지만, Datadog 데이터베이스에 보안 권고가 등록되는 즉시 Vulnerabilities Explorer에 반영됩니다.</div>

### 보안 권고 소급 매칭 {#retroactive-advisory-matching}

Datadog은 새로 게시된 보안 권고를 이전 스캔에서 저장된 라이브러리 인벤토리와 지속적으로 대조합니다. 이 과정에서 기존 Repositories Explorer 스냅샷은 변경하지 않고 Vulnerabilities Explorer의 취약성 기록만 업데이트합니다. 즉,

- 새로 게시된 CVE를 Vulnerabilities Explorer에 표시하기 위해 새 스캔을 실행할 필요는 없습니다.
- Vulnerabilities Explorer는 이전 커밋에 대해서도 마지막으로 확인된 라이브러리 인벤토리를 기반으로 최신 위험 상태를 반영합니다.
- Repositories Explorer는 스캔 당시 알려진 정보를 기록한 고정된 스냅샷으로 유지되며, 새로운 보안 권고가 게시되어도 업데이트되지 않습니다.

### 취약성 수명 주기 {#vulnerability-lifecycle}

Datadog은 탐지 위치에 따라 SCA 취약성을 다르게 추적합니다. **Static SCA** 발견 결과는 **리포지토리**를 대상으로 하며 리포지토리 스캔을 기반으로 합니다. **Runtime SCA** 발견 결과는 **서비스**를 대상으로 하며 실행 중인 서비스에서 로드하고 사용하는 라이브러리를 기반으로 합니다.

Datadog이 해당 범위에서 취약성이 있는 라이브러리를 탐지하면 취약성이 열림 상태가 됩니다. 해당 제품의 수명 주기 규칙에 따라 Datadog이 취약성을 더 이상 탐지하지 않으면 닫힘 상태가 됩니다.

| 제품 | 범위 | 시나리오 | 취약성이 열리는 경우 | 취약성이 닫히는 경우 |
|---|---|---|---|---|
| Static SCA | 리포지토리 | 리포지토리 스캔 | Datadog이 스캔된 리포지토리에서 취약성이 있는 라이브러리를 탐지합니다. | 마지막으로 스캔한 커밋에서 취약성이 탐지되지 않았습니다. |
| Runtime SCA | 서비스 | 장기 실행 서비스 | Datadog이 실행 중인 서비스에서 취약성이 있는 라이브러리를 탐지합니다. | 하루 동안 취약성이 다시 탐지되지 않고 취약성이 탐지되었던 모든 환경에서 서비스가 실행 중인 경우 |
| Runtime SCA | 서비스 | 서비스 수명 주기 후반에 로드되는 라이브러리 | Datadog이 실행 중인 서비스에서 취약성이 있는 라이브러리를 탐지합니다. | 5일 동안 취약성이 다시 탐지되지 않은 경우 |
| Runtime SCA | 서비스 | 단기 실행 서비스 또는 작업 | Datadog이 실행 중인 서비스에서 취약성이 있는 라이브러리를 탐지합니다. | 5일 동안 취약성이 다시 탐지되지 않은 경우 |

## SCA 언어 지원 {#sca-language-support}

Software Composition Analysis(SCA)는 다음 언어를 지원합니다.

{{< card-grid image_width="80" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/python_avatar.svg" alt="python" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/javascript_large.png" alt="javascript" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/java_avatar.svg" alt="java" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/golang-avatar.png" alt="go" image_width="60" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/ruby_avatar.svg" alt="ruby" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/php_opcache.png" alt="php" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/rust.png" alt="rust" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/cpp.png" alt="c++" image_width="60" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/dart.svg" alt="dart" image_width="50" >}}
  {{< image-card href="/security/code_security/software_composition_analysis/setup_static/?tab=github" src="integrations_logos/swift_avatar.svg" alt="swift" image_width="50" >}}
{{< /card-grid >}}

## 구성 사용자 지정 {#customize-your-configuration}

Datadog 또는 `code-security.datadog.yaml` 파일에서 `ignore-paths`를 구성하여 Static SCA 분석 대상에서 특정 경로를 제외할 수 있습니다. SCA 구성에 대한 전체 참고 자료는 [Software Composition Analysis(SCA) 구성][30]을 참조하세요. 구성 위치, 우선순위 및 병합에 대한 자세한 내용은 [Code Security 구성 참조][28]를 참조하세요.

## 다음 단계 {#next-steps}

1. [Static SCA 설정][1]을 통해 리포지토리를 스캔합니다.
2. [Runtime SCA 설정][2]을 통해 실행 중인 서비스에서 로드하는 라이브러리를 탐지합니다.
3. [취약성 탐색기][11]에서 발견 결과를 검토하고 분류합니다.
4. [PR Gates][16]를 구성하여 위험한 변경 사항이 병합되기 전에 차단합니다.
5. [CVE 탐색기][15]를 사용하여 새로 공개된 취약성에 대한 노출 정도를 사전에 평가합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/security/code_security/software_composition_analysis/setup_static/
[2]: /ko/security/code_security/software_composition_analysis/setup_runtime/
[3]: https://app.datadoghq.com/security/appsec/vm
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /ko/account_management/rbac/permissions/#integrations
[10]: https://app.datadoghq.com/services?lens=Security
[11]: https://app.datadoghq.com/security/appsec/vm/library
[12]: https://app.datadoghq.com/ci/code-analysis
[13]: /ko/security/code_security/software_composition_analysis/setup_static/#upload-third-party-sbom-to-datadog
[14]: /ko/security/code_security/software_composition_analysis/library_inventory
[15]: https://app.datadoghq.com/security/code-security/detection-coverage/advisories
[16]: /ko/pr_gates/
[17]: /ko/pr_gates/setup
[18]: /ko/security/code_security/software_composition_analysis/setup_static/?tab=github#link-findings-to-datadog-services-and-teams
[19]: /ko/security/ticketing_integrations
[20]: /ko/security/automation_pipelines/mute
[21]: https://nvd.nist.gov/
[22]: https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/about-the-github-advisory-database
[23]: https://google.github.io/osv.dev/data/
[24]: https://github.com/pypa/advisory-database
[25]: https://github.com/cloudsecurityalliance/gsd-database
[26]: https://github.com/DataDog/guarddog
[27]: /ko/security/code_security/software_composition_analysis/cve_explorer/
[28]: /ko/security/code_security/guides/configuration/
[29]: /ko/security/code_security/software_composition_analysis/library_inventory/#export-a-software-bill-of-materials-sbom
[30]: /ko/security/code_security/software_composition_analysis/configuration/
[31]: /ko/bits_ai/bits_code
[32]: /ko/bits_ai/bits_code/automations
[33]: https://app.datadoghq.com/code
[34]: https://app.datadoghq.com/code/automations