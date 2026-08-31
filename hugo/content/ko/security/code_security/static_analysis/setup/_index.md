---
algolia:
  tags:
  - static analysis
  - static analysis rules
  - static application security testing
  - SAST
aliases:
- /ko/continuous_integration/static_analysis
- /ko/static_analysis
- /ko/security/code_security/static_analysis/circleci_orbs/
- /ko/code_analysis/static_analysis/setup/
description: 코드가 프로덕션 환경에 도달하기 전에 코드의 품질 문제와 보안 취약성을 검사하는 Datadog Static Code Analysis에
  관해 알아보세요.
is_beta: false
title: Static Code Analysis(SAST) 설정
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Code Security는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.
</div>
{{% /site-region %}}

## 개요 {#overview}
앱 내에서 Datadog SAST를 설정하려면 [**보안** > **Code Security**][1]로 이동합니다.

## Static Code Analysis 스캔을 실행할 위치 선택 {#select-where-to-run-static-code-analysis-scans}
### Datadog 호스팅 스캐닝을 사용하여 스캔 {#scan-with-datadog-hosted-scanning}

Datadog Static Code Analysis(SAST) 스캔을 Datadog 인프라에서 직접 실행할 수 있습니다. 지원되는 리포지토리 유형의 예:
- [GitHub][18]([Git Large File Storage][17]를 사용하는 리포지토리 제외)
- [GitLab.com 및 GitLab Self-Managed][20]
- [Azure DevOps][19]

시작하려면 [**Code Security** 페이지][1]로 이동합니다.

### CI 파이프라인에서 스캔 {#scan-in-ci-pipelines}
Datadog Static Code Analysis는 CI 파이프라인에서 [`datadog-ci` CLI][8]를 사용하여 실행됩니다.

먼저 Datadog API 및 애플리케이션 키를 구성합니다. `DD_APP_KEY` 및 `DD_API_KEY`를 시크릿으로 추가합니다. Datadog 애플리케이션 키에 `code_analysis_read` 범위가 있어야 합니다.

다음으로, 아래에서 선택한 CI 공급자에 적합한 지침을 따라 Static Code Analysis를 실행합니다.

{{< whatsnext desc="CI 공급자 기준 지침 참조:">}}
    {{< nextlink href="security/code_security/static_analysis/setup/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/setup/generic_ci_providers" >}}일반적인 CI 공급자{{< /nextlink >}}
{{< /whatsnext >}}

## 소스 코드 관리 공급자 선택 {#select-your-source-code-management-provider}
Datadog Static Code Analysis는 모든 소스 코드 관리 공급자를 지원하며, GitHub, GitLab, Azure DevOps를 기본적으로 지원합니다.

{{< tabs >}}
{{% tab "GitHub" %}}

인라인 스니펫 및 [풀 요청 코멘트][3]를 활성화하려면 [GitHub 통합 타일][1]을 사용하여 GitHub App을 구성하고 [소스 코드 통합][2]을 설정하세요.

GitHub App을 설치할 때는 특정 기능을 활성화하기 위해 다음과 같은 권한이 필요합니다.

- `Content: Read`, Datadog에 표시된 코드 스니펫을 확인할 수 있게 해줌
- `Pull Request: Read & Write`, Datadog이 [풀 요청 코멘트][3]를 사용하여 풀 요청에 직접 위반 사항에 대한 피드백을 추가하고, [취약성을 해결][4]할 수 있게 해줌
- `Checks: Read & Write`, 사용자가 SAST 위반 사항에 대한 검사를 생성하여 풀 요청을 차단할 수 있게 해줌

[1]: /ko/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /ko/integrations/guide/source-code-integration
[3]: /ko/security/code_security/dev_tool_int/github_pull_requests
[4]: /ko/security/code_security/dev_tool_int/

{{% /tab %}}
{{% tab "GitLab" %}}

GitLab 리포지토리를 Datadog에 연결하는 방법은 [GitLab 소스 코드 설정 지침][1]을 참조하세요. GitLab.com 및 자체 관리형 인스턴스가 모두 지원됩니다.

[1]: /ko/integrations/gitlab-source-code/#setup 

{{% /tab %}}
{{% tab "Azure DevOps" %}}

**참고:** Azure DevOps 통합이 Microsoft Entra 테넌트에 연결되어 있어야 합니다. Azure DevOps Server는 지원되지 **않습니다**.

Azure DevOps 리포지토리를 Datadog에 연결하는 방법은 [Azure 소스 코드 설정 지침][4]을 참조하세요.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ko/integrations/azure-devops-source-code/#setup
[5]: /ko/getting_started/site/

{{% /tab %}}
{{% tab "기타" %}}

다른 소스 코드 관리 공급자를 이용 중인 경우, Static Code Analysis가 `datadog-ci` CLI 도구를 사용하여 CI 파이프라인에서 실행되고 [그 결과를 Datadog에 업로드](#upload-third-party-static-analysis-results-to-datadog)하도록 구성하세요.
기본 브랜치에서 리포지토리의 분석을 실행해야**만** 결과가 **Code Security** 페이지에 표시되기 시작합니다.

{{% /tab %}}
{{< /tabs >}}

## 구성 사용자 지정 {#customize-your-configuration}

기본적으로 Datadog Static Code Analysis(SAST)는 각 프로그래밍 언어에 대하여 [Datadog의 기본 규칙 세트][6]를 사용해 리포지토리를 스캔합니다. 다른 파라미터는 물론, 어느 규칙 세트 또는 규칙이 실행될지도 Datadog에서나 `code-security.datadog.yaml` 파일에서 사용자 지정할 수 있습니다. 전체 구성 참고 자료는 [Static Code Analysis(SAST) 구성][27]을 참조하세요.

## 발견 사항을 Datadog 서비스 및 팀에 연결 {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}


## Diff-aware 스캐닝 {#diff-aware-scanning}

Diff-aware 스캐닝을 사용하면 Datadog의 정적 분석기가 기능 브랜치에서 커밋으로 수정된 파일만 스캔할 수 있습니다. 스캔할 때마다 리포지토리의 모든 파일에서 분석을 실행할 필요가 없기 때문에 스캔 시간을 대폭 단축해 줍니다. CI 파이프라인에서 diff-aware 스캐닝을 활성화하려면 다음 단계를 따르세요.

1. CI 파이프라인에서 `DD_APP_KEY`, `DD_SITE` 및 `DD_API_KEY` 변수가 설정되어 있어야 합니다.
2. 정적 분석기를 호출하기 전에 `datadog-ci git-metadata upload`에 호출을 추가하세요. 이 명령을 사용하면 Datadog 백엔드에서 Git 메타데이터를 사용할 수 있도록 보장합니다. Git 메타데이터는 분석할 파일 개수를 계산하는 데 필요합니다.
3. datadog-static-analyzer를 플래그 `--diff-aware`로 호출해야 합니다.

명령 시퀀스의 예(이러한 명령을 Git 리포지토리에서 호출해야 함):

```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**참고:** diff-aware 스캔을 완료할 수 없는 경우, 디렉터리 전체가 스캔됩니다.

## 타사 정적 분석 결과를 Datadog에 업로드 {#upload-third-party-static-analysis-results-to-datadog}

<div class="alert alert-info">
  SARIF 가져오기는 Snyk, CodeQL, Semgrep, Gitleaks, Sysdig에 대하여 테스트되었습니다. 다른 SARIF 호환 도구를 사용하다가 문제가 발생하는 경우, <a href="/help">Datadog 지원팀</a>에 문의하세요.
</div>

타사 정적 분석 도구의 결과가 상호 운용 가능한 [Static Analysis Results Interchange Format(SARIF) 형식][2]이면 Datadog에 전송할 수 있습니다. Node.js 버전 14 이상이 필요합니다.

SARIF 보고서를 업로드하는 방법:

1. [`DD_API_KEY` 및 `DD_APP_KEY` 변수가 정의되어 있어야 합니다][4].
2. 선택 사항으로 [`DD_SITE` 변수][7]를 설정합니다(이것은 기본적으로 `datadoghq.com`으로 설정됨).
3. `datadog-ci` 유틸리티 설치:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. 코드에 타사 정적 분석 도구를 실행하고 그 결과를 SARIF 형식으로 출력합니다.
5. 결과를 Datadog에 업로드:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

## SARIF 지원 가이드라인 {#sarif-support-guidelines}

Datadog은 [2.1.0 SARIF 스키마][15] 규정을 준수하는 타사 SARIF 파일 수집을 지원합니다. SARIF
스키마는 정적 분석기 도구마다 다르게 사용됩니다. 타사 SARIF 파일을 Datadog으로 전송하려면
해당 파일이 다음 세부 정보를 준수해야 합니다.

 - 위반 위치가 결과의 `physicalLocation` 개체를 통해 지정됩니다.
    - `artifactLocation` 및 그에 속한 `uri`가 리포지토리 루트에 **상대적이어야 합니다**.
    - `region` 개체가 Datadog UI에서 강조 표시된 코드의 일부분입니다.
 - 리포지토리 전체에서 발견 사항을 고유하게 식별하는 데 `partialFingerprints`를 사용합니다.
 - `properties` 및 `tags`로 더 많은 정보 추가:
    - 태그 `DATADOG_CATEGORY`는 발견 사항의 카테고리를 지정합니다. 용인되는 값은 `SECURITY`, `PERFORMANCE`, `CODE_STYLE`, `BEST_PRACTICES`, `ERROR_PRONE`입니다.
    - 카테고리 `SECURITY`로 어노테이션된 위반 사항은 리포지토리 조회의 취약성 탐색기 및 보안 탭에 표시됩니다.
 - `tool` 섹션에는 `name` 및 `version` 속성이 있는 유효한 `driver` 섹션이 있어야 합니다.

예를 들어 다음은 Datadog이 처리한 SARIF 파일의 예시입니다.


```json

{
    "runs": [
        {
            "results": [
                {
                    "level": "error",
                    "locations": [
                        {
                            "physicalLocation": {
                                "artifactLocation": {
                                    "uri": "missing_timeout.py"
                                },
                                "region": {
                                    "endColumn": 76,
                                    "endLine": 6,
                                    "startColumn": 25,
                                    "startLine": 6
                                }
                            }
                        }
                    ],
                    "message": {
                        "text": "timeout not defined"
                    },
                    "partialFingerprints": {
                        "DATADOG_FINGERPRINT": "b45eb11285f5e2ae08598cb8e5903c0ad2b3d68eaa864f3a6f17eb4a3b4a25da"
                    },
                    "properties": {
                        "tags": [
                            "DATADOG_CATEGORY:SECURITY",
                            "CWE:1088"
                        ]
                    },
                    "ruleId": "python-security/requests-timeout",
                    "ruleIndex": 0
                }
            ],
            "tool": {
                "driver": {
                    "informationUri": "https://www.datadoghq.com",
                    "name": "<tool-name>",
                    "rules": [
                        {
                            "fullDescription": {
                                "text": "Access to remote resources should always use a timeout and appropriately handle the timeout and recovery. When using `requests.get`, `requests.put`, `requests.patch`, etc. - we should always use a `timeout` as an argument.\n\n#### Learn More\n\n - [CWE-1088 - Synchronous Access of Remote Resource without Timeout](https://cwe.mitre.org/data/definitions/1088.html)\n - [Python Best Practices: always use a timeout with the requests library](https://www.codiga.io/blog/python-requests-timeout/)"
                            },
                            "helpUri": "https://link/to/documentation",
                            "id": "python-security/requests-timeout",
                            "properties": {
                                "tags": [
                                    "CWE:1088"
                                ]
                            },
                            "shortDescription": {
                                "text": "no timeout was given on call to external resource"
                            }
                        }
                    ],
                    "version": "<tool-version>"
                }
            }
        }
    ],
    "version": "2.1.0"
}
```

## SARIF에서 CVSS 심각도 매핑 {#sarif-to-cvss-severity-mapping}

[SARIF 형식][15]은 none, note, warning 및 error의 4가지 심각도를 정의합니다.
하지만 Datadog은 [Common Vulnerability Scoring System][16](CVSS)를 사용하여 위반 사항 및 취약성 심각도를 보고하는데,
여기에서는 critical, high, medium, low 및 none의 5가지 심각도를 정의합니다.

Datadog은 SARIF 파일을 수집할 때 아래의 매핑 규칙을 사용하여 SARIF 심각도를 CVSS 심각도로 매핑합니다.


| SARIF 심각도 | CVSS 심각도 |
|----------------|---------------|
| Error          | Critical      |
| Warning        | High          |
| Note           | Medium        |
| None           | Low           |

## 데이터 보존 {#data-retention}

Datadog은 발견 사항을 당사 [데이터 보존 기간](https://docs.datadoghq.com/ko/data_security/data_retention_periods/)에 따라 저장합니다. Datadog은 고객 소스 코드를 저장 또는 보존하지 않습니다.

## <!-- 추가 자료

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[3]: /ko/ide_plugins/idea/#static-analysis
[4]: /ko/account_management/api-app-keys/
[6]: /ko/security/code_security/static_analysis/static_analysis_rules
[7]: /ko/getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /ko/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /ko/integrations/guide/source-code-integration
[11]: /ko/security/code_security/dev_tool_int/github_pull_requests
[12]: /ko/security/code_security/dev_tool_int/github_pull_requests#fixing-a-vulnerability-directly-from-datadog
[13]: https://docs.github.com/en/actions/security-for-github-actions/security-guides
[15]: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
[16]: https://www.first.org/cvss/
[17]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[18]: /ko/security/code_security/static_analysis/setup/?tab=github#select-your-source-code-management-provider
[19]: /ko/security/code_security/static_analysis/setup/?tab=azuredevops#select-your-source-code-management-provider
[20]: /ko/security/code_security/static_analysis/setup/?tab=gitlab#select-your-source-code-management-provider
[22]: https://docs.datadoghq.com/ko/internal_developer_portal/software_catalog/entity_model/?tab=v30#migrating-to-v30
[24]: https://docs.datadoghq.com/ko/account_management/teams/
[25]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[27]: /ko/security/code_security/static_analysis/configuration/
[101]: https://docs.datadoghq.com/ko/software_catalog/service_definitions/v3-0/
[102]: https://docs.datadoghq.com/ko/internal_developer_portal/software_catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/ko/data_security/data_retention_periods/