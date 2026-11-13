---
aliases:
- /ko/developers/ide_plugins/vscode/code_security/
further_reading:
- link: /security/code_security/
  tag: 설명서
  text: Code Security에 대해 자세히 알아보기
- link: /security/code_security/static_analysis/static_analysis_rules/
  tag: 설명서
  text: Static Analysis 규칙
- link: /security/code_security/secret_scanning/
  tag: 설명서
  text: Secret Scanning에 대해 자세히 알아보기
- link: /security/code_security/iac_security/
  tag: 설명서
  text: IaC Security에 대해 자세히 알아보기
title: Code Security
type: documentation
---
## 개요 {#overview}

VS Code 및 Cursor용 Datadog 확장 프로그램은 변경 사항을 커밋하기 전에 보안 문제를 탐지하고 수정하도록 도와줍니다. [Static Code Analysis](#static-code-analysis)는 취약점, 버그 및 유지 관리 문제를 포착합니다. [Secret Scanning](#secret-scanning)은 API 키, 토큰, 비밀번호와 같이 노출된 자격 증명을 찾습니다. [코드형 인프라(IaC) Scanning](#infrastructure-as-code-iac-scanning)은 클라우드 구성을 배포하기 전에 잘못된 구성을 탐지합니다.

## Static Code Analysis {#static-code-analysis}

이 확장 프로그램은 작업 영역의 소스 파일에 대해 [Static Code Analysis][1] 규칙을 실행합니다. 변경 사항을 커밋하기 전에 보안 취약점, 버그 및 유지 관리 문제를 표시합니다.

Static Code Analysis는 다양한 프로그래밍 언어를 지원합니다. 전체 목록은 [Static Code Analysis 규칙][2]을 참조하세요. 문제는 소스 코드 편집기에 표시되며, 제안된 수정 사항을 직접 적용할 수 있습니다.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Static Analysis 미리 보기" style="width:100%" video=true >}}

### Static Code Analysis 시작하기 {#get-started-with-static-code-analysis}

소스 파일을 열면 확장 프로그램이 리포지토리 루트에서 [`code-security.datadog.yaml`][3]을 찾고, 존재하지 않는 경우 생성하라는 메시지를 표시합니다.

{{< img src="/ide_plugins/vscode/static-analysis-onboard.png" alt="Python 파일로 Static Code Analysis를 설정하기 위한 온보딩 배너" style="width:75%;" >}}

구성 파일을 생성하면 파일을 열 때 분석기가 백그라운드에서 자동으로 실행됩니다. 특정 언어에 대해 Static Code Analysis를 활성화하려면 명령 팔레트(`Shift`+`Cmd/Ctrl`+`P`)에서 `Datadog: Configure Static Analysis Languages` 명령을 실행합니다.

전체 폴더나 작업 영역을 분석하려면 파일 탐색기에서 폴더를 마우스 오른쪽 버튼으로 클릭하고 **Datadog Code Security > Analyze Folder** 또는 **Analyze Workspace**를 선택합니다.

### 규칙 편집기 {#rule-editor}

IDE를 벗어나지 않고 [사용자 지정 Static Code Analysis 규칙][4]을 작성하고 테스트합니다. 규칙 편집기를 사용하여 코드베이스에 특화된 내부 표준, 보안 패턴 또는 유지 관리성 검사를 위한 탐지 로직을 설계합니다.

규칙 편집기를 열려면 명령 팔레트(`Shift`+`Cmd/Ctrl`+`P`)에서 `Datadog: New DDSA Rule` 명령을 실행하거나, 파일 탐색기에서 YAML 파일을 마우스 오른쪽 버튼으로 클릭하고 **Datadog Code Security > Open in DDSA Rule Editor**를 선택하세요.

{{< img src="/ide_plugins/vscode/static-analysis-rule-editor.png" alt="VS Code용 Datadog 확장의 SAST 규칙 편집기" style="width:100%;" >}}

규칙 편집기는 다음 패널을 제공합니다.

- 추상 구문 트리에 대한 패턴 매칭을 위한 **Tree-sitter 쿼리 편집기**.
- 탐지 로직을 표현하고 위반 사항을 보고하기 위한 **JavaScript 규칙 패널**.
- **편집하는 동안 규칙에 대해 실행되는 규정 준수 및 규정 미준수 테스트 파일**로, 예상 및 실제 일치 횟수가 실시간으로 표시됩니다.
- 구문 분석 도구가 테스트 코드를 어떻게 나타내는지 보여주는 **AST 트리 조회**.

디스크에서 기존 규칙을 가져오거나, 완성된 규칙을 내보내 Datadog에 업로드하세요.

## Secret Scanning {#secret-scanning}

이 확장은 작업 공간의 소스 파일에 대해 [Secret Scanning][5]을 실행합니다. 변경 사항을 커밋하기 전에 API 키, 토큰, 비밀번호와 같이 노출된 자격 증명을 표시합니다. 파일 콘텐츠는 로컬에서 스캔되며, 입력하는 동안 편집기에 탐지 결과가 표시됩니다.

{{< img src="/ide_plugins/vscode/secret_scanning.mp4" alt="Secret Scanning 미리 보기" style="width:100%" video=true >}}

### Secret Scanning 시작하기 {#get-started-with-secret-scanning}

Secret Scanning은 기본적으로 활성화되어 있으며 소스 파일을 열 때마다 백그라운드에서 실행됩니다. 전체 폴더나 작업 영역을 스캔하려면 파일 탐색기에서 폴더를 마우스 오른쪽 버튼으로 클릭하고 **Datadog Code Security > Analyze Folder** 또는 **Analyze Workspace**를 선택하세요.

{{< img src="/ide_plugins/vscode/secret-scanning-batch-analysis.png" alt="파일별 탐지 결과를 나열하는 Secret Scanning 섹션이 포함된 일괄 분석 보고서" style="width:100%;" >}}

별도의 로컬 구성은 필요하지 않으며, 스캔 규칙은 Datadog에서 가져옵니다. 모든 텍스트 파일은 스캔되며, 바이너리 파일은 건너뜁니다.

<div class="alert alert-info">Secret Scanning을 사용하려면 Datadog에 로그인해야 합니다. 탐지 규칙을 Datadog 조직에서 가져오기 때문입니다.</div>

### Review findings {#review-findings}

탐지된 시크릿은 다음 세 곳에 표시됩니다.

- **Inline in the editor**: 각 탐지 결과는 탐지된 시크릿에 밑줄로 표시되며, 심각도는 규칙의 우선순위에 따라 결정됩니다.
- **Problems panel**: 모든 탐지 결과가 소스 `Datadog`와 함께 나열됩니다.
- **File Insights view**: 탐지 결과가 다른 Code Security 문제와 함께 그룹화됩니다.

{{< img src="/ide_plugins/vscode/secret-scanning-findings.png" alt="Inline in the editor에 표시된 탐지된 시크릿과 호버 진단, Problems panel 및 File Insights view" style="width:100%;" >}}

### Suppress a finding {#suppress-a-finding}

개별 탐지를 억제하려면, 플래그가 지정된 시크릿에 대한 코드 액션을 사용하여 바로 윗줄에 `no-dd-secrets` 주석을 삽입하세요. 이 주석은 다음 줄의 모든 시크릿 탐지 결과를 억제합니다.

### Turn Secret Scanning on or off {#turn-secret-scanning-on-or-off}

Secret Scanning을 전환하려면 명령 팔레트(`Shift`+`Cmd/Ctrl`+`P`)에서 `Datadog: Turn on Secret Scanning` 또는 `Datadog: Turn off Secret Scanning` 명령을 실행하거나 `datadog.codeSecurity.setup.secretScanning.enabled` 설정을 변경하세요.

## 코드형 인프라(IaC) Scanning {#infrastructure-as-code-iac-scanning}

이 확장은 작업 공간의 지원되는 IaC 파일에 대해 [코드형 인프라(IaC) Security][6] 규칙을 실행합니다. 암호화 누락이나 과도하게 허용적인 액세스와 같은 클라우드 구성 오류를 탐지합니다. 파일은 편집할 때 로컬에서 스캔되며, 탐지 결과는 실시간으로 표시됩니다.

### IaC Scanning 시작하기 {#get-started-with-iac-scanning}

IaC Scanning은 기본적으로 활성화되어 있으며, 지원되는 IaC 파일을 열거나 편집할 때마다 백그라운드에서 자동으로 실행됩니다. 별도의 스캐너 설정은 필요하지 않습니다. 이 확장은 `code-security.datadog.yaml`의 IaC 구성 및 제외 설정을 준수합니다. 구성 옵션은 [IaC Security 구성][7]을 참조하세요. 사용 가능한 규칙은 [IaC Security 규칙][8]을 참조하세요.

### Review findings {#review-findings-1}

IaC 잘못된 구성은 다음 세 곳에 표시됩니다.

- **Inline in the editor**: 각 탐지 결과는 영향을 받는 줄에 강조 표시됩니다. 마우스를 올려 심각도, 설명 및 규칙을 확인하세요.
- **Problems panel**: 모든 탐지 결과가 소스 `Datadog`와 함께 나열됩니다.
- **File Insights view**: 탐지 결과는 다른 Code Security 문제와 함께 **코드형 인프라** 아래에 그룹화됩니다.

{{< img src="/ide_plugins/vscode/iac_real_time_analysis.mp4" alt="Dockerfile 및 Terraform 파일에 인라인으로 강조 표시된 여러 IaC 탐지 결과, 마우스 오버 진단, 주석을 사용하여 탐지 결과를 억제하는 빠른 수정 액션, 그리고 File Insights view 및 Problems panel에 표시된 해당 탐지 결과들" style="width:100%" video=true >}}

### Suppress a finding {#suppress-a-finding-1}

한 줄의 IaC 탐지 결과를 억제하려면 `Datadog: Ignore IaC violations on this line` 코드 액션을 사용하세요. 이 확장은 파일에 적절한 주석 구문을 사용하여 영향을 받는 줄 위에 `dd-iac-scan ignore-line` 주석을 삽입합니다.

### IaC Scanning 켜기 또는 끄기 {#turn-iac-scanning-on-or-off}

IaC Scanning을 전환하려면 `datadog.iacScanning.setup.enabled` 설정을 변경하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/code_security/static_analysis/
[2]: /ko/security/code_security/static_analysis/static_analysis_rules/
[3]: /ko/security/code_security/static_analysis/configuration/
[4]: /ko/security/code_security/static_analysis/custom_rules/
[5]: /ko/security/code_security/secret_scanning/
[6]: /ko/security/code_security/iac_security/
[7]: /ko/security/code_security/iac_security/configuration/
[8]: /ko/security/code_security/iac_security/iac_rules/