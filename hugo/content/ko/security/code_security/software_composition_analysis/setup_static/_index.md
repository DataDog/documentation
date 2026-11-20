---
aliases:
- /ko/code_analysis/software_composition_analysis/generic_ci_providers/
- /ko/code_analysis/software_composition_analysis/github_actions/
- /ko/code_analysis/software_composition_analysis/setup/
description: 프로덕션 환경에 배포하기 전에 가져온 오픈 소스 라이브러리를 스캔하여 알려진 보안 취약점을 확인하는 Datadog Software
  Composition Analysis에 대해 알아보세요.
disable_toc: false
title: 리포지토리에 SCA 설정
---
## 개요 {#overview}

Datadog Software Composition Analysis(SCA)는 프로덕션 환경에 배포하기 전에 리포지토리의 오픈 소스 라이브러리를 스캔하여 알려진 보안 취약점을 탐지합니다.

시작하려면 다음 단계를 따르세요.
1. [Code Security 설정][2]을 엽니다.
2. {{< ui >}}Activate scanning for your repositories{{< /ui >}}에서 {{< ui >}}Manage Repositories{{< /ui >}}를 클릭합니다.
3. [SCA 스캔을 실행할 위치](#select-where-to-run-static-sca-scans)(Datadog 호스팅 또는 CI 파이프라인)를 선택합니다.
4. 소스 코드 제공업체의 설정 안내를 따릅니다.

## 지원되는 언어 및 의존성 매니페스트 {#supported-languages-and-dependency-manifests}
Datadog SCA는 의존성 매니페스트(락파일 및 기타 지원되는 매니페스트 파일 등)를 사용하여 다음 언어의 라이브러리를 스캔함으로써 취약한 의존성을 식별합니다.

| 언어   | 패키지 관리자    | 파일                                |
|------------|-------------------|------------------------------------------|
| C#         | .NET              | `packages.lock.json`, `.csproj` 파일    |
| C++        | Conan             | `conan.lock`                             |
| Dart       | pub               | `pubspec.lock`                           |
| Go         | mod               | `go.mod`                                 |
| JVM        | Gradle            | `gradle.lockfile`                        |
| JVM        | Maven             | `pom.xml`                                |
| Node.js    | Bun               | `bun.lock`                               |
| Node.js    | npm               | `package-lock.json`                      |
| Node.js    | pnpm              | `pnpm-lock.yaml`                         |
| Node.js    | yarn              | `yarn.lock`                              |
| PHP | composer | `composer.lock`                          |
| Python     | PDM               | `pdm.lock`                               |
| Python     | pip               | `requirements.txt`, `Pipfile.lock`       |
| Python     | poetry            | `poetry.lock`                            |
| Python     | UV                | `uv.lock`                                |
| Ruby       | bundler           | `Gemfile.lock`                           |
| Rust       | Cargo             | `cargo.lock`                             |
| Swift      | SwiftPM           | `Package.swift`, `Package.resolved`      |

**참고:** `packages.lock.json` 파일과 `.csproj` 파일이 모두 있는 경우, `packages.lock.json` 파일이 우선하며 버전을 더 정확하게 결정할 수 있습니다.

## 락파일 없이 스캔 {#lockfile-less-scanning}

Datadog SCA는 **지원되는 락파일이 감지되지 않은 경우에만** 매니페스트 파일을 스캔합니다. 락파일이 있는 경우에는 해당 파일이 우선하며 매니페스트는 스캔하지 않습니다.

| 언어 | 패키지 관리자        | 파일             |
|----------|------------------------|------------------|
| Node.js  | npm, yarn, pnpm, Bun   | `package.json`   |
| Python   | Poetry, PDM, UV, pip   | `pyproject.toml` |

**지원되는 섹션:**
- `package.json`: `dependencies`, `devDependencies` 및 `optionalDependencies`
- `pyproject.toml`: PEP 621 `dependencies` 및 `optional-dependencies`, PEP 735 `dependency-groups` 및 Poetry 의존성 섹션

<div class="alert alert-info">
매니페스트에서는 고정된 버전이 아닌 버전 범위(예: <code>^2.3.4</code> 또는 <code>&gt;=1.0,&lt;2</code>)를 지정할 수 있으므로, Datadog은 각 버전 범위를 충족하는 가장 최근에 게시된 버전을 선택하여 버전을 결정합니다. 사전 릴리스 버전은 제외됩니다.
</div>

## 정적 SCA 스캔을 실행할 위치 선택 {#select-where-to-run-static-sca-scans}
기본적으로 스캔은 활성화된 리포지토리에서 지원되는 의존성 매니페스트나 락파일을 업데이트하는 변경 사항을 커밋할 때 실행됩니다. CI 파이프라인에서 SCA를 실행할 수도 있으며, CI 작업은 `push` 이벤트를 지원합니다.

### Datadog 호스팅 스캔 사용 {#scan-with-datadog-hosted-scanning}

Datadog Static SCA 스캔을 Datadog 인프라에서 직접 실행할 수 있습니다. 지원되는 리포지토리 유형은 다음과 같습니다.
- [GitHub](/security/code_security/software_composition_analysis/setup_static/?tab=github#select-your-source-code-management-provider)([Git Large File Storage][21]를 사용하는 리포지토리 제외)
- [GitLab.com 및 GitLab Self-Managed](/security/code_security/software_composition_analysis/setup_static/?tab=gitlab#select-your-source-code-management-provider)
- [Azure DevOps](/security/code_security/software_composition_analysis/setup_static/?tab=azuredevops#select-your-source-code-management-provider)
- [Bitbucket Cloud](/security/code_security/software_composition_analysis/setup_static/?tab=bitbucketcloud#select-your-source-code-management-provider)

시작하려면 [{{< ui >}}Code Security{{< /ui >}} 페이지][2]로 이동하세요.

<div class="alert alert-info">
Datadog 호스팅 SCA 스캔은 파일 이름이 255자를 초과하는 리포지토리에서 지원되지 않습니다. <br>
이러한 경우에는 CI 파이프라인에서 스캔하세요.
</div>

### CI 파이프라인에서 스캔 {#scan-in-ci-pipelines}

Datadog Software Composition Analysis는 [`datadog-ci` CLI][8]를 사용하여 CI 파이프라인에서 실행됩니다.

<div class="alert alert-info">
결과가 {{< ui >}}Code Security{{< /ui >}}에 표시되려면 먼저 기본 브랜치를 최소 한 번 이상 스캔해야 합니다.
</div>

{{< whatsnext desc="CI 제공업체별 지침을 참조하세요.">}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/gitlab_ci" >}}GitLab CI/CD{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/azure_devops" >}}Azure DevOps{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/generic_ci_providers" >}}일반 CI 제공업체{{< /nextlink >}}
{{< /whatsnext >}}

Java 프로젝트에서 Maven 또는 Gradle 매니페스트를 사용하는 대신 타사 JAR을 리포지토리에 직접 체크인하는 경우, [Java JAR 디렉터리 스캔][27]을 참조하세요.

## 소스 코드 관리 제공업체 선택 {#select-your-source-code-management-provider}

사용하는 스캔 모드와 관계없이 소스 코드 관리 제공업체를 연결하여 인라인 코드 조각 및 풀 요청 댓글과 같은 기본 기능을 활성화하세요. Datadog SCA는 모든 제공업체를 지원하며 GitHub, GitLab, Azure DevOps 및 Bitbucket Cloud Premium을 기본적으로 지원합니다.

{{< tabs >}}
{{% tab "GitHub" %}}

인라인 코드 조각 및 [풀 요청 댓글][3]을 활성화하려면 [GitHub Integration 타일][1]을 사용하여 GitHub App을 구성하고 [소스 코드 통합][2]을 설정하세요.

GitHub App을 설치할 때 특정 기능을 활성화하기 위해 다음과 같은 권한이 필요합니다.

- `Content: Read`, 이를 통해 Datadog에 표시된 코드 조각을 확인할 수 있습니다.
- `Pull Request: Read & Write`, 이를 통해 Datadog에서 [풀 요청 댓글][3]을 사용하여 풀 요청에 위반 사항에 대한 피드백을 직접 추가할 수 있습니다.
- `Checks: Read & Write`, 이를 통해 사용자가 SAST 위반 사항에 대한 검사를 생성하여 풀 요청을 차단할 수 있습니다.

[1]: /ko/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /ko/integrations/guide/source-code-integration
[3]: /ko/security/code_security/dev_tool_int/github_pull_requests

{{% /tab %}}
{{% tab "GitLab" %}}

GitLab을 Datadog에 연결하는 방법은 [GitLab 소스 코드 설정 지침][1]을 참조하세요. GitLab.com 및 자체 관리형 인스턴스를 모두 지원합니다.

[1]: /ko/integrations/gitlab-source-code/#setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

**참고:** Azure DevOps 통합은 Microsoft Entra 테넌트에 연결되어 있어야 합니다. Azure DevOps Server는 지원되지 **않습니다**.

Azure DevOps 리포지토리를 Datadog에 연결하는 방법은 [Azure 소스 코드 설정 지침][4]을 참조하세요.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ko/integrations/azure-devops-source-code/#setup
[5]: /ko/getting_started/site/

{{% /tab %}}
{{% tab "Bitbucket Cloud" %}}

Bitbucket Cloud 워크스페이스를 Datadog에 연결하는 방법은 [Bitbucket 소스 코드 설정 지침][1]을 참조하세요.

[1]: /ko/integrations/bitbucket-source-code/#setup

{{% /tab %}}
{{% tab "기타" %}}

다른 소스 코드 관리 제공업체를 사용하는 경우, CLI 도구를 사용하여 SCA를 `datadog-ci` CI 파이프라인에서 실행하고 [그 결과를 Datadog에 업로드](#upload-third-party-sbom-to-datadog)하도록 구성하세요.

{{% /tab %}}
{{< /tabs >}}

## 발견 사항을 Datadog 서비스 및 팀에 연결 {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}

## 타사 SBOM을 Datadog에 업로드{#upload-third-party-sbom-to-datadog}

Datadog은 [Datadog SBOM 생성기][10] 사용을 권장하지만, 타사 SBOM을 수집할 수도 있습니다.

다음 요구 사항을 충족하는 경우 다른 도구에서 생성된 SBOM을 업로드할 수 있습니다.
- 유효한 CycloneDX [1.4][18], [1.5][19] 또는 [1.6][20] JSON 스키마
- 모든 구성 요소의 유형이 `library`입니다.
- 모든 구성 요소에 유효한 `purl` 속성이 있습니다.

타사 SBOM 파일은 [`datadog-ci`](https://github.com/DataDog/datadog-ci/?tab=readme-ov-file#how-to-install-the-cli) 명령을 사용하여 Datadog에 업로드됩니다.

선택적 인수 및 기타 정보는 `datadog-ci` [README][22]에서 확인할 수 있습니다.

다음 명령을 사용하여 타사 SBOM을 업로드할 수 있습니다. 환경 변수 `DD_API_KEY`, `DD_APP_KEY` 및 `DD_SITE`가
각각 API 키, APP 키 및 [Datadog 사이트][12]로 설정되어 있는지 확인하세요.

```bash
datadog-ci sbom upload /path/to/third-party-sbom.json
```

<div class="alert alert-info">
리포지토리에 자동 스캔이 이미 활성화되어 있는 경우, 수동으로 업로드하면 해당 커밋의 기존 결과가 대체됩니다.
</div>


## 도달 가능한 취약점으로 필터링 {#filter-by-reachable-vulnerabilities}

Datadog은 팀이 의존성의 취약한 코드 경로가 애플리케이션 코드에서 참조되는지 평가할 수 있도록 정적 도달 가능성 분석을 제공합니다. 이 기능을 사용하면 정적으로 도달할 수 없어 즉각적인 위험이 최소화되는 취약점을 식별하여 보다 효과적으로 우선순위를 지정할 수 있습니다.

이 기능은 [Datadog SBOM 생성기][1]를 `--reachability` 플래그를 활성화하여 사용하거나 Datadog 호스팅 인프라를 통해 스캔을 실행하는 경우에만 지원됩니다.

도달 가능성 분석은 Java 프로젝트에서만 사용할 수 있으며 정의된 특정 보안 권고 사항에만 적용됩니다. 해당 보안 권고 사항에 포함되지 않은 취약점은 도달 가능성 평가에서 제외됩니다.

{{% collapse-content title="지원되는 권고 사항" level="h3" expanded=true id="supported-advisories" %}}
정적 도달 가능성 분석은 다음 보안 권고 사항에 대해 사용할 수 있습니다.
- [GHSA-h7v4-7xg3-hxcc](https://osv.dev/vulnerability/GHSA-h7v4-7xg3-hxcc)
- [GHSA-jfh8-c2jp-5v3q](https://osv.dev/vulnerability/GHSA-jfh8-c2jp-5v3q)
- [GHSA-7rjr-3q55-vv33](https://osv.dev/vulnerability/GHSA-7rjr-3q55-vv33)
- [GHSA-2p3x-qw9c-25hh](https://osv.dev/vulnerability/GHSA-2p3x-qw9c-25hh)
- [GHSA-cm59-pr5q-cw85](https://osv.dev/vulnerability/GHSA-cm59-pr5q-cw85)
- [GHSA-qrx8-8545-4wg2](https://osv.dev/vulnerability/GHSA-qrx8-8545-4wg2)
- [GHSA-p8pq-r894-fm8f](https://osv.dev/vulnerability/GHSA-p8pq-r894-fm8f)
- [GHSA-64xx-cq4q-mf44](https://osv.dev/vulnerability/GHSA-64xx-cq4q-mf44)
- [GHSA-g5w6-mrj7-75h2](https://osv.dev/vulnerability/GHSA-g5w6-mrj7-75h2)
- [GHSA-xw4p-crpj-vjx2](https://osv.dev/vulnerability/GHSA-xw4p-crpj-vjx2)
- [GHSA-cxfm-5m4g-x7xp](https://osv.dev/vulnerability/GHSA-cxfm-5m4g-x7xp)
- [GHSA-3ccq-5vw3-2p6x](https://osv.dev/vulnerability/GHSA-3ccq-5vw3-2p6x)
- [GHSA-mjmj-j48q-9wg2](https://osv.dev/vulnerability/GHSA-mjmj-j48q-9wg2)
- [GHSA-36p3-wjmg-h94x](https://osv.dev/vulnerability/GHSA-36p3-wjmg-h94x)
- [GHSA-ww97-9w65-2crx](https://osv.dev/vulnerability/GHSA-ww97-9w65-2crx)
- [GHSA-8jrj-525p-826v](https://osv.dev/vulnerability/GHSA-8jrj-525p-826v)
- [GHSA-4wrc-f8pq-fpqp](https://osv.dev/vulnerability/GHSA-4wrc-f8pq-fpqp)
- [GHSA-4cch-wxpw-8p28](https://osv.dev/vulnerability/GHSA-4cch-wxpw-8p28)
- [GHSA-6w62-hx7r-mw68](https://osv.dev/vulnerability/GHSA-6w62-hx7r-mw68)
- [GHSA-2q8x-2p7f-574v](https://osv.dev/vulnerability/GHSA-2q8x-2p7f-574v)
- [GHSA-rmr5-cpv2-vgjf](https://osv.dev/vulnerability/GHSA-rmr5-cpv2-vgjf)
- [GHSA-4jrv-ppp4-jm57](https://osv.dev/vulnerability/GHSA-4jrv-ppp4-jm57)
- [GHSA-mw36-7c6c-q4q2](https://osv.dev/vulnerability/GHSA-mw36-7c6c-q4q2)
- [GHSA-hph2-m3g5-xxv4](https://osv.dev/vulnerability/GHSA-hph2-m3g5-xxv4)
- [GHSA-j9h8-phrw-h4fh](https://osv.dev/vulnerability/GHSA-j9h8-phrw-h4fh)
- [GHSA-3gm7-v7vw-866c](https://osv.dev/vulnerability/GHSA-3gm7-v7vw-866c)
- [GHSA-645p-88qh-w398](https://osv.dev/vulnerability/GHSA-645p-88qh-w398)
- [GHSA-g5h3-w546-pj7f](https://osv.dev/vulnerability/GHSA-g5h3-w546-pj7f)
- [GHSA-c27h-mcmw-48hv](https://osv.dev/vulnerability/GHSA-c27h-mcmw-48hv)
- [GHSA-r4x2-3cq5-hqvp](https://osv.dev/vulnerability/GHSA-r4x2-3cq5-hqvp)
- [GHSA-24rp-q3w6-vc56](https://osv.dev/vulnerability/GHSA-24rp-q3w6-vc56)
- [GHSA-c9hw-wf7x-jp9j](https://osv.dev/vulnerability/GHSA-c9hw-wf7x-jp9j)
- [GHSA-4gq5-ch57-c2mg](https://osv.dev/vulnerability/GHSA-4gq5-ch57-c2mg)
- [GHSA-vmfg-rjjm-rjrj](https://osv.dev/vulnerability/GHSA-vmfg-rjjm-rjrj)
- [GHSA-crg9-44h2-xw35](https://osv.dev/vulnerability/GHSA-crg9-44h2-xw35)
- [GHSA-qmqc-x3r4-6v39](https://osv.dev/vulnerability/GHSA-qmqc-x3r4-6v39)
- [GHSA-4w82-r329-3q67](https://osv.dev/vulnerability/GHSA-4w82-r329-3q67)
- [GHSA-qr7j-h6gg-jmgc](https://osv.dev/vulnerability/GHSA-qr7j-h6gg-jmgc)
- [GHSA-9mxf-g3x6-wv74](https://osv.dev/vulnerability/GHSA-9mxf-g3x6-wv74)
- [GHSA-f3j5-rmmp-3fc5](https://osv.dev/vulnerability/GHSA-f3j5-rmmp-3fc5)
{{% /collapse-content %}}

## 데이터 보존 {#data-retention}

Datadog은 발견 사항을 [데이터 보존 기간](https://docs.datadoghq.com/ko/data_security/data_retention_periods/)에 따라 저장합니다. Datadog은 고객 소스 코드를 저장 또는 보존하지 않습니다.

## 추가 자료 {#further-reading}

{{< whatsnext desc="SCA 자세히 알아보기">}}
    {{< nextlink href="/security/code_security/software_composition_analysis/setup_runtime/" >}}라이브러리 취약점 런타임 탐지 설정{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="리포지토리에 대한 기타 Code Security 스캔:">}}
    {{< nextlink href="/security/code_security/static_analysis/" >}}Static Code Analysis(SAST){{< /nextlink >}}
    {{< nextlink href="/security/cloud_security_management/iac_scanning/" >}}Infrastructure as Code(IaC){{< /nextlink >}}
    {{< nextlink href="/security/code_security/secret_scanning/" >}}Secrets Scanning{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/security/code_security/software_composition_analysis/
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: /ko/security/code_security/software_composition_analysis/setup_static
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /ko/getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
[6]: /ko/account_management/api-app-keys/
[7]: /ko/integrations/github
[8]: https://github.com/DataDog/datadog-ci
[9]: /ko/security/code_security/dev_tool_int/github_pull_requests/
[10]: https://github.com/DataDog/datadog-sbom-generator
[12]: /ko/getting_started/site/
[13]: https://github.com/DataDog/datadog-static-analyzer-github-action
[14]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sbom
[15]: https://docs.datadoghq.com/ko/internal_developer_portal/catalog/entity_model/
[16]: https://docs.datadoghq.com/ko/account_management/teams/
[17]: https://app.datadoghq.com/source-code/repositories
[18]: https://cyclonedx.org/docs/1.4/json/
[19]: https://cyclonedx.org/docs/1.5/json/
[20]: https://cyclonedx.org/docs/1.6/json/
[21]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[22]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-sbom
[23]: https://docs.datadoghq.com/ko/internal_developer_portal/catalog/entity_model/?tab=v30#codelocations
[24]: https://docs.datadoghq.com/ko/internal_developer_portal/catalog/entity_model/?tab=v30#migrating-to-v30
[25]: https://docs.datadoghq.com/ko/data_security/data_retention_periods/
[26]: https://docs.datadoghq.com/ko/account_management/teams/
[101]: https://docs.datadoghq.com/ko/internal_developer_portal/catalog/entity_model/
[102]: https://docs.datadoghq.com/ko/internal_developer_portal/catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/ko/data_security/data_retention_periods/
[27]: /ko/security/code_security/troubleshooting/#scan-java-jar-directories