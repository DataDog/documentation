---
aliases:
- /ko/security/cloud_security_management/setup/iac_scanning/
further_reading:
- link: /security/code_security
  tag: 설명서
  text: Code Security
- link: /security/code_security/iac_security
  tag: 설명서
  text: IaC Security
- link: /security/code_security/iac_security/configuration
  tag: 설명서
  text: IaC Security 구성
- link: /security/code_security/iac_security/iac_rules/
  tag: 설명서
  text: IaC Security 규칙
title: IaC Security 설정
---
다음 지침을 따라 Code Security용 Infrastructure as Code (IaC) Security를 활성화하세요. IaC Security는 GitHub, GitLab 및 Azure DevOps 리포지토리에 저장된 여러 IaC 구성을 지원합니다.

{{< tabs >}}
{{% tab "GitHub" %}}

### GitHub 통합 설치{#install-the-github-integration}

GitHub 리포지토리를 연결하고 PR 댓글을 활성화하려면 [풀 리퀘스트 댓글][1]의 설정 지침을 참조하세요.

### 리포지토리에 대해 IaC Security 활성화{#enable-iac-security-for-your-repositories}

GitHub 통합을 설정한 후 리포지토리에 대해 IaC Security를 활성화합니다.

1. [Code Security 설정 페이지][2]에서 {{< ui >}}Activate scanning for your repositories{{< /ui >}} 섹션을 확장합니다.
1. {{< ui >}}Select your source code management provider{{< /ui >}} 아래에서{{< ui >}}GitHub{{< /ui >}}을 선택합니다.
1. {{< ui >}}Select where your scans should run{{< /ui >}} 아래에서 {{< ui >}}Datadog{{< /ui >}}을 선택합니다.
1. {{< ui >}}Connect your GitHub repositories{{< /ui >}} 아래에서 다음 중 하나를 수행합니다.
    -  새 GitHub 계정을 연결하려면 {{< ui >}}Add GitHub Account{{< /ui >}}를 클릭하세요.
    - 기존 계정에 대해 IaC Security를 활성화하려면 {{< ui >}}Select repositories{{< /ui >}}를 클릭하거나, Code Security가 이미 활성화된 경우 {{< ui >}}Edit{{< /ui >}}를 클릭하세요.
1. IaC Security를 활성화하려면 다음 중 하나를 수행합니다.
    -  모든 리포지토리에 대해 활성화하려면 {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}}을 ON 위치로 전환하세요.
    -  단일 리포지토리에 대해 활성화하려면 해당 리포지토리의 {{< ui >}}IaC{{< /ui >}} 스위치를 ON으로 전환하세요.

[1]: /ko/security/code_security/dev_tool_int/pull_request_comments/?tab=github#set-up-pull-request-comments
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "GitLab" %}}

### GitLab 통합 설치{#install-the-gitlab-integration}

GitLab 리포지토리를 연결하고 PR 댓글을 활성화하려면 [GitLab 소스 코드][1]의 설정 지침을 참조하세요.

### 리포지토리에 대해 IaC Security 활성화{#enable-iac-security-for-your-repositories-1}

GitLab 통합을 설정한 후 리포지토리에 대해 IaC Security를 활성화합니다.

1. [Code Security 설정 페이지][2]에서 {{< ui >}}Activate scanning for your repositories{{< /ui >}} 섹션을 확장합니다.
1. {{< ui >}}Select your source code management provider{{< /ui >}} 아래에서 {{< ui >}}GitLab{{< /ui >}}을 선택합니다.
1. {{< ui >}}Select where your scans should run{{< /ui >}} 아래에서 {{< ui >}}Datadog{{< /ui >}}을 선택합니다.
1. {{< ui >}}Connect your GitLab repositories{{< /ui >}} 아래에서 다음 중 하나를 수행합니다.
    - 새 GitLab 인스턴스를 연결하려면 {{< ui >}}Connect GitLab Instance{{< /ui >}}를 클릭합니다.
    - 기존 계정에 대해 IaC Security를 활성화하려면 {{< ui >}}Select repositories{{< /ui >}}를 클릭하거나, Code Security가 이미 활성화된 경우 {{< ui >}}Edit{{< /ui >}}를 클릭하세요.
1. IaC Security를 활성화하려면 다음 중 하나를 수행합니다.
    -  모든 리포지토리에 대해 활성화하려면 {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}}을 ON 위치로 전환하세요.
    -  단일 리포지토리에 대해 활성화하려면 해당 리포지토리의 {{< ui >}}IaC{{< /ui >}} 스위치를 ON으로 전환하세요.

[1]: /ko/integrations/gitlab-source-code/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

### Azure DevOps 통합 설치 {#install-the-azure-devops-integration}

Azure DevOps 리포지토리를 연결하고 PR 주석을 활성화하려면 [Azure DevOps 소스 코드][1]의 설정 지침을 참조하세요.

### 리포지토리에 대해 IaC Security 활성화{#enable-iac-security-for-your-repositories-2}

Azure DevOps 통합을 설정한 후 리포지토리에 대해 IaC Security를 활성화합니다.

1. [Code Security 설정 페이지][2]에서 {{< ui >}}Activate scanning for your repositories{{< /ui >}} 섹션을 확장합니다.
1. {{< ui >}}Select your source code management provider{{< /ui >}} 아래에서 {{< ui >}}Azure DevOps{{< /ui >}}를 선택합니다.
1. {{< ui >}}Select where your scans should run{{< /ui >}} 아래에서 {{< ui >}}Datadog{{< /ui >}}을 선택합니다.
1. {{< ui >}}Connect your Azure DevOps repositories{{< /ui >}} 아래에서 다음 중 하나를 수행합니다.
    - 새 Azure DevOps 조직을 연결하려면 {{< ui >}}Connect Microsoft Entra App{{< /ui >}}을 클릭합니다.
    - 기존 계정에 대해 IaC Security를 활성화하려면 {{< ui >}}Select repositories{{< /ui >}}를 클릭하거나, Code Security가 이미 활성화된 경우 {{< ui >}}Edit{{< /ui >}}를 클릭하세요.
1. IaC Security를 활성화하려면 다음 중 하나를 수행합니다.
    -  모든 리포지토리에 대해 활성화하려면 {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}}을 ON 위치로 전환하세요.
    -  단일 리포지토리에 대해 활성화하려면 해당 리포지토리의 {{< ui >}}IaC{{< /ui >}} 스위치를 ON으로 전환하세요.

[1]: /ko/integrations/azure-devops-source-code/#source-code-functionality
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{< /tabs >}}

## 일반 CI 공급자로 IaC 설정 {#set-up-iac-with-a-generic-ci-provider}

### 개요 {#overview}

GitHub Actions, GitLab CI/CD 또는 Azure DevOps를 사용하지 않는 경우 CI 파이프라인에서 [Datadog IaC Scanner][8]를 직접 실행할 수 있습니다. [`datadog-ci` CLI][9]를 사용하여 IaC 스캔 결과를 Datadog에 업로드합니다.

**GitHub가 아닌 리포지토리에서 IaC Security를 실행하는 경우**, 기본 브랜치에서 첫 번째 스캔을 실행합니다. 기본 브랜치 이름이 `master`, `main`, `default`, `stable`, `source`, `prod` 또는 `develop`가 아닌 경우 리포지토리에 대한 첫 번째 스캔을 업로드합니다. 그런 다음 [{{< ui >}}Repository Settings{{< /ui >}}][10]에서 기본 브랜치를 수동으로 재정의하여 기본 브랜치가 아닌 곳에서 수행된 향후 스캔이 업로드되고 올바르게 처리되도록 합니다.

### 전제 조건 {#prerequisites}

- Node.js 20 이상 및 npm
- `curl`
- `tar`
- `/usr/local/bin`에 스캐너를 설치할 권한

다음 환경 변수를 설정하세요.

| 이름         | 설명                                                                                                                                                 | 필수 | 기본값         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| `DD_API_KEY` | Datadog API 키입니다. [Datadog 조직][4]에서 이 키를 생성하고 키를 시크릿으로 저장하세요.                                                     | 예      |                 |
| `DD_APP_KEY` | 애플리케이션 키입니다. [Datadog 조직][4]에서 이 키를 생성하고 `code_analysis_read` 범위를 포함하세요. 키를 시크릿으로 저장합니다.              | 예      |                 |
| `DD_SITE`    | 정보를 전송할 [Datadog 사이트][5]입니다. Datadog 사이트는 `datadoghq.com`입니다.                                                                         | 아니요       | `datadoghq.com` |

CI 파이프라인에 다음을 추가합니다.

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog IaC Scanner (x86_64/amd64 Linux; see GitHub Releases for arm64 and other platforms)
export IAC_SCANNER_URL="https://github.com/DataDog/datadog-iac-scanner/releases/latest/download/datadog-iac-scanner_linux_amd64.tar.gz"
curl -L "${IAC_SCANNER_URL}" -o /tmp/datadog-iac-scanner.tar.gz
tar xfz /tmp/datadog-iac-scanner.tar.gz -C /tmp
mv /tmp/datadog-iac-scanner /usr/local/bin/datadog-iac-scanner

# Run the Datadog IaC scanner
exit_code=0
/usr/local/bin/datadog-iac-scanner scan -p . -o /tmp || exit_code=$?
if [ $exit_code -lt 20 -o $exit_code -gt 60 ]; then echo "IaC scan failed" ; exit $exit_code ; fi

# Upload results
datadog-ci sarif upload /tmp/datadog-iac-scanner-result.sarif
```

<div class="alert alert-info">
  이 예시는 Datadog IaC Scanner의 x86_64(amd64) Linux 버전을 사용합니다. 스캐너는 arm64 Linux와 macOS 및 Windows도 지원합니다. 다른 OS나 아키텍처를 사용하는 경우 <a href="https://github.com/DataDog/datadog-iac-scanner/releases">GitHub 릴리스</a> 페이지에서 적절한 릴리스를 선택하고 <code>IAC_SCANNER_URL</code> 값을 업데이트하세요.
</div>

## 타사 정적 분석 결과를 IaC Security에 업로드 {#upload-third-party-static-analysis-results-to-iac-security}

<div class="alert alert-info">
  Checkov를 포함한 타사 IaC 스캐너의 SARIF 결과를 IaC Security로 가져올 수 있습니다. SAST에서 지원되는 SARIF 호환 도구에 대해서는 <a href="https://docs.datadoghq.com/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog">
  타사 정적 분석 결과 업로드</a>를 참조하세요. Node.js 버전 14 이상이 필요합니다.
</div>

SARIF 보고서를 업로드하는 방법:

1. [`DD_API_KEY` 및 `DD_APP_KEY` 변수가 정의되어 있는지 확인합니다][4].
2. 필요시 [`DD_SITE` 변수][5]를 설정합니다(기본값: `datadoghq.com`).
3. `datadog-ci` 유틸리티를 설치합니다(버전 2.0 이상).

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. 코드에서 타사 IaC Scanning 도구(예: Checkov, Trivy, KICS)를 실행하고 결과를 SARIF v2.1.0 형식으로 출력합니다.
5. 결과를 Datadog에 업로드합니다.

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```
   - 업로드 옵션
       - `--tags:` 사용자 지정 태그 추가(형식: `key:value`)
       - `--max-concurrency:` 동시 업로드 설정(기본값: 20)
       - `--dry-run:` 업로드하지 않고 유효성 검사
### 필수 SARIF 속성 {#required-sarif-attributes}
타사 스캐너(Checkov 제외)의 결과가 Datadog IaC Scanning에서 올바르게 수집 및 표시되도록 하려면, SARIF 파일이 IaC 보안 탐지 결과로 인식될 수 있도록 다음 속성을 반드시 포함해야 합니다.
1. `Runs[...].tool.driver.name: Datadog IaC Scanning`
2. `Runs[...].tool.driver.version: "code_update"` 또는 `"full_scan"`
    - `"full_scan”`: 전체 리포지토리 스캔의 경우
    - `"code_update"`: 풀 리퀘스트 / 증분 스캔의 경우
4. `Runs[...].tool.driver.rules[...].properties.tags:`
    - `["DATADOG_RULE_TYPE:IAC_SCANNING"]`
    - `[“DATADOG_SCANNED_FILE_COUNT: <number>”]`, 여기서 `"number"`는 스캔된 파일 수를 지정합니다 
5. `Runs[...].results[...].locations[...].physicalLocation:`
    - `artifactLocation.uri`: 리포지토리 루트에서 파일까지의 상대 경로
    - `region.startLine`: 시작 줄 번호
    - `region.endLine`: 종료 줄 번호
    - `region.startColumn`: 시작 열 번호
    - `region.endColumn`: 종료 열 번호
<div class="alert alert-info">억제는 위반 사항을 별도의 알림 없이 제외합니다. 만약 <code>results[ ].suppressions</code> 가 존재하면, 해당 위반 사항은 완전히 무시됩니다.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[4]: /ko/account_management/api-app-keys/
[5]: /ko/getting_started/site/
[6]: https://docs.datadoghq.com/ko/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog
[7]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[8]: https://github.com/DataDog/datadog-iac-scanner
[9]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sarif
[10]: https://app.datadoghq.com/source-code/repositories