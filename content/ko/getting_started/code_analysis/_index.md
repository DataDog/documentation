---
algolia:
  tags:
  - 코드 분석
  - Code Analysis Datadog
  - Code Analysis ci pipeline
  - Code Analysis ci pipelines
aliases:
- /ko/code_analysis/faq
further_reading:
- link: https://www.datadoghq.com/blog/datadog-code-analysis/
  tag: 블로그
  text: Datadog Code Analysis로 고품질의 안전한 코드를 더 빠르게 배포하세요.
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: 블로그
  text: Datadog Software Composition Analysis을 통해 타사 라이브러리의 취약점을 완화합니다.
- link: /code_analysis/
  tag: 문서
  text: 코드 분석에 대해 알아보기
- link: /security/application_security/software_composition_analysis
  tag: 문서
  text: 소프트웨어 구성 요소 분석에 대해 알아보기
title: Code Analysis 시작하기
---

## 개요

[Datadog Code Analysis][1]로 프로덕션에 배포하기 전에 코드 품질 문제와 보안 취약점을 파악 및 해결하여 소프트웨어 개발 라이프사이클 전반에서 안전하고 깨끗한 코드를 보장하세요.

{{< img src="/code_analysis/repositories.png" alt="Session Replay 사용 버튼 및 시각화 옵션" style="width:100%" >}}

Code Analysis는 [Static Analysis][2] 및 [Software Composition Analysis][3]를 포함한 종합 도구 모음을 제공하여 소프트웨어 배포를 전반적으로 개선합니다.

* Static Analysis(SAST)는 리포지토리에서 퍼스트 파티 코드의 품질 및 보안 문제를 스캔하고, 해당 문제가 프로덕션에 영향을 미치지 않도록 수정 사항을 제안합니다.
* Software Composition Analysis(SCA)는 코드베이스에서 불러온 오픈 소스 라이브러리를 스캔하여, 종속성을 관리하고 외부 위협으로부터 애플리케이션을 보호하도록 도와줍니다.

[`datadog-ci`][5]를 사용하면 다른 공급자의 분석을 개발 워크플로에 통합하여 Static Analysis 및 SCA 결과를 Datadog으로 직접 전송할 수 있습니다. [**Repositories** 페이지][6]에서 각 리포지토리의 최신 스캔 결과에 액세스하여, 모든 브랜치에서 효과적으로 코드 상태를 모니터 및 개선할 수 있습니다.

## Code Analysis 설정

Datadog 또는 CI pipeline에서 실행 중인 코드에서 직접 코드 스캔을 실행하도록 Code Analysis를 구성할 수 있습니다. 시작하려면 [**Software Delivery** > **Code Analysis** > **Repositories**][6]로 이동하여 **+ Add a Repository**를 클릭합니다.

{{< tabs >}}
{{% tab "Datadog Hosted" %}}

Datadog 호스팅 스캔을 사용하면 CI 파이프라인 내에서가 아닌 Datadog 인프라 내에서 코드를 스캔합니다. Datadog은 코드를 읽고 정적 분석기를 실행하여 Static Analysis 및/또는 Software Composition Analysis를 실행한 후 결과를 업로드합니다.

Datadog 호스팅 스캔을 사용하면 Code Analysis를 사용할 수 있도록 CI 파이프라인을 구성하지 않아도 됩니다.

[GitHub 연동][101]을 설정하여 추가한 각 GitHub 계정에 대해 GitHub 리포지토리에서 Code Analysis를 사용 설정합니다.

{{< img src="/code_analysis/setup/enable_account.png" alt="Session Replay 사용 버튼 및 시각화 옵션" style="width:100%" >}}

모든 리포지토리에 오픈 소스 라이브러리의 취약성, 라이선스 문제 및 공급망 위험을 스캔하는 Software Composition Analysis(SCA)를 활성화하세요. 아니면 **Repositories** 사이드 패널에서 개별 리포지토리에 대해 SCA를 활성화할 수도 있습니다.

{{< img src="/code_analysis/setup/enable_repository.png" alt="Session Replay 사용 버튼 및 시각화 옵션" style="width:100%" >}}

[101]: /ko/integrations/github/

{{% /tab %}}
{{% tab "In CI Pipelines" %}}

리포지토리에서 실행할 스캔 유형을 다음 중에서 선택합니다.

* [Static Analysis][101]: 코드에 잘못된 관행과 취약점이 있는지 검사합니다.
* [Software Composition Analysis][102]: 타사 라이브러리에 취약점이 있는지 검사합니다.

[GitHub](#github) 또는 [다른 공급자](#other-providers)와 같은 Source Code Management(SCM) 공급자를 선택합니다.

### GitHub

GitHub 리포지토리를 사용하는 경우, [GitHub 통합][103]을 설정하고 리포지토리를 연결하여 Static Analysis 및 Software Composition Analysis 스캔을 활성화합니다.

{{< img src="/getting_started/code_analysis/github_accounts.png" alt="GitHub 계정과 연결하려면 리포지토리 연결 버튼을 클릭하세요." style="width:100%" >}}

[GitHub pull requests][105] 코멘트는 기본적으로 활성화되어 있습니다. Code Analysis Setup 페이지에서 **Connect Repositories**를 클릭하고 PR Permissions 컬럼의 Missing 플래그 위에 마우스를 올려서 계정에서 업데이트해야 하는 권한을 확인합니다.

{{< img src="/getting_started/code_analysis/missing_permissions.png" alt="Missing 표시 위에 마우스를 올려서 리포지토리에서 업데이트해야 하는 권한을 확인합니다." style="width:100%" >}}

이 기능을 비활성화하려면 [**Code Analysis Settings** 페이지][106]로 이동하여 GitHub Comments 컬럼의 토글 버튼을 클릭합니다.

{{< img src="/getting_started/code_analysis/github_comments_setting.png" alt="연결된 GitHub 리포지토리에 Code Analysis를 활성화 또는 비활성화하려면 GitHub Comments 컬럼에서 토글 버튼을 클릭합니다." style="width:100%" >}}

### 기타 공급자

다른 공급자의 경우, CI pipeline 플랫폼에서 직접 Datadog CLI를 실행할 수 있습니다. 자세한 내용은 [Static Analysis용 일반 CI 공급자][107] 및 [Software Composition Analysis용 일반 CI 공급자][108]를 참조하세요.

[**Repositories** 페이지][109]에 결과가 표시되기 시작하려면 기본 브랜치에서 반드시 [리포지토리 분석을 실행](#run-code-analysis-in-your-ci-provider)해야 합니다.

## CI 공급자에서 Code Analysis 실행

Datadog에 결과를 업로드하려면 [Datadog API 키 및 애플리케이션 키][110]가 있어야 합니다. 

`dd_service` 필드에 서비스 또는 라이브러리 이름을 지정합니다(예: `shopist`).

### GitHub 작업

CI 워크플로의 일부로 Static Analysis 및 Software Composition Analysis 스캔을 실행하도록 GitHub 작업을 구성할 수 있습니다.

리포지토리에 다음 내용으로`.github/workflows/datadog-static-analysis.yml` 파일을 생성합니다.

```yaml
on: [push]

name: Datadog Static Analysis

jobs:
  static-analysis:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check code meets quality and security standards
      id: datadog-static-analysis
      uses: DataDog/datadog-static-analyzer-github-action@v1
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_service: shopist
        dd_env: ci
        dd_site: datadoghq.com
        cpu_count: 2
```

그런 다음 리포지토리에 다음 내용으로 `.github/workflows/datadog-sca.yml` 파일을 생성합니다.

```yaml
on: [push]

name: Datadog Software Composition Analysis

jobs:
  software-composition-analysis:
    runs-on: ubuntu-latest
    name: Datadog SBOM Generation and Upload
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check imported libraries are secure and compliant
      id: datadog-software-composition-analysis
      uses: DataDog/datadog-sca-github-action@main
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_service: shopist
        dd_env: ci
        dd_site: datadoghq.com
```

### 사용자 지정 스크립트

Static Analysis 결과가 포함된 SARIF 보고서 또는 Software Composition Analysis 결과가 포함된 SBOM 보고서를 [datadog-ci NPM 패키지][111]를 사용해 Datadog에 업로드합니다.

#### Static Analysis

Static Analysis 보고서를 Datadog에 업로드하려면 Unzip과 Node.js 버전 14 이상을 설치해야 합니다.

CI 파이프라인 구성에 다음 내용을 추가합니다.

```shell
# Datadog 사이트에서 다음으로 정보를 보내도록 설정
export DD_SITE="datadoghq.com"

# 종속성 설치
npm install -g @datadog/datadog-ci 

# 최신 Datadog 정적 분석기 다운로드:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip

curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Static Analysis 실행
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif

# 결과 업로드
datadog-ci sarif upload /tmp/report.sarif --service "shopist" --env "ci"
```

#### Software Composition Analysis

Software Composition Analysis 결과를 Datadog에 업로드하려면 Trivy와 Node.js 버전 14 이상을 설치해야 합니다.

CI pipeline 구성에 다음 내용을 추가합니다.

```shell
# Datadog 사이트에서 다음으로 정보를 보내도록 설정
export DD_SITE="datadoghq.com"

# 종속성 설치
npm install -g @datadog/datadog-ci

# 최신 Datadog OSV Scanner 다운로드:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# OSV Scanner 설치
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
cd /osv-scanner && unzip osv-scanner.zip
chmod 755 /osv-scanner/osv-scanner

# OSC Scanner 결과 출력
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# 결과 업로드
datadog-ci sbom upload --service "shopist" --env "ci" /tmp/sbom.json
```

본 스크립트를 구성한 후 기본 브랜치에서 리포지토리 분석을 실행합니다. 그러면 **Repositories** 페이지에 결과가 표시되기 시작합니다.

[101]: /ko/code_analysis/static_analysis
[102]: /ko/code_analysis/software_composition_analysis
[103]: /ko/integrations/github
[104]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions
[105]: /ko/code_analysis/github_pull_requests
[106]: https://app.datadoghq.com/ci/settings/code-analysis
[107]: /ko/code_analysis/static_analysis/generic_ci_providers
[108]: /ko/code_analysis/software_composition_analysis/generic_ci_providers
[109]: https://app.datadoghq.com/ci/code-analysis
[110]: /ko/account_management/api-app-keys/
[111]: https://www.npmjs.com/package/@datadog/datadog-ci

{{% /tab %}}
{{< /tabs >}}

## IDE에서 Static Analysis 실행

[Datadog IDE 플러그인][7]을 설치하면 로컬에서 Static Analysis 스캔을 실행하고 코드 에디터에서 바로 결과를 확인할 수 있습니다. 변경 사항을 커밋하기 전에 코드의 유지 관리, 버그 또는 보안 취약성 문제 등을 감지 및 수정할 수 있습니다. 

IDE에서 Static Analysis 스캔을 실행하려면 선택한 코드 편집기의 각 설명을 참조하세요.

{{< partial name="code_analysis/ide-plugins.html" >}}

</br>


## GitHub 풀 리퀘스트에서 Static Analysis 코멘트 활성화

Static Analysis을 GitHub 풀 리퀘스트와 통합하여 코드 위반 사항을 자동 플래그 지정하고 검토 프로세스에서 코드 품질을 향상시킬 수 있습니다. 

{{< img src="/getting_started/code_analysis/github_suggestion.png" alt="GitHub 풀 리퀘스트에서 제공하는 Code Analysis 제안 사항" style="width:100%" >}}

이를 설정하면 Code Analysis이 PR에 직접 코멘트를 작성하여 이름, ID, 심각도, 제안된 수정 사항 등의 세부 정보와 함께 위반 사항을 표시합니다. 사용자는 GitHub UI에서 이를 바로 적용할 수 있습니다. 

리포지토리에 [적절한 구성 파일][10]을 추가한 다음, Datadog(새 앱 또는 기존 앱의 업데이트)에서 [GitHub 앱][11]을 생성합니다. 풀 요청에 적절한 읽기 및 쓰기 액세스 권한이 있는지 확인합니다. 

앱을 설정한 다음 **Code Analysis Settings** 페이지로 이동하여 각 리포지토리에 대한 **GitHub Comments** 컬럼의 토글 버튼을 클릭합니다. 

{{< img src="/getting_started/code_analysis/github_comments_setting.png" alt="GitHub 풀 요청의 각 리포지토리별 Code Analysis 코멘트 활성화 또는 비활성화 토글" style="width:100%" >}}

자세한 내용은 [GitHub 풀 요청][12]을 참조하세요.

## 리포지토리 검색 및 관리

[**Repositories** Page][6]에서 리포지토리를 클릭하면 더 자세히 보기에 액세스할 수 있으며, 여기서 브랜치별(기본 브랜치가 먼저 표시됨) 및 커밋별(최신 항목부터 시작)로 검색 쿼리를 사용자 지정할 수 있습니다.

{{< img src="/getting_started/code_analysis/sca_vulnerabilities.png" alt="리포지토리 기본 브랜치와 최신 커밋에서 실행된 Code Analysis 결과의 Library Vulnerabilities 뷰" style="width:100%" >}}

{{< tabs >}}
{{% tab "Static Analysis" %}}

다음 기본 제공 패싯을 사용하여 **Code Quality** 탭에서 잘못된 코딩 관행을 식별 및 해결할 검색 쿼리를 생성할 수 있습니다. 또는 **Code Vulnerabilities** 탭에서 보안 위험을 식별 및 해결하기 위한 검색 쿼리를 만들 수 있습니다.

| 패싯 이름                         | 설명                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| Result Status                     | 분석 완료 상태에 따라 결과를 필터링합니다.         |
| Rule ID                           | 결과를 트리거한 특정 규칙입니다.                             |
| Tool Name                         | 분석에 기여한 도구를 결정합니다.                     |
| CWE (Common Weakness Enumeration) | 인지한 취약성 카테고리별로 결과를 필터링합니다.                |
| Has Fixes                         | 제안된 수정 사항을 적용할 수 있는 문제를 필터링합니다.                 |
| Result Message                    | 결과와 관련된 간결한 설명 또는 메시지를 포함합니다. |
| Rule Description                  | 각 규칙의 근거를 포함합니다.                                |
| Source File                       | 문제가 감지된 파일을 포함합니다.                          |
| Tool Version                      | 사용한 도구의 버전별로 결과를 필터링합니다.                       |

결과에서 바로 제안된 수정 사항을 확인하여 코드 품질 관행을 개선하고 보안 취약점을 해결하세요.

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="Code Analysis 결과의 Fixes 탭에서 제안된 코드 수정 사항" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

다음의 기본 제공 패싯을 사용하여 **Library Vulnerabilities** 탭에서 타사 라이브러리의 보안 위험을 식별 및 해결하기 위한 검색 쿼리를 생성하거나, **Library Catalog** 탭에서 라이브러리 인벤토리를 검토합니다.

| 패싯 이름          | 설명                                                    |
|--------------------|----------------------------------------------------------------|
| Dependency Name    | 이름별로 라이브러리를 식별합니다.                              |
| Dependency Version | 특정 버전의 라이브러리별로 필터링합니다.                     |
| 언어           | 프로그래밍 언어별로 라이브러리를 정렬합니다.                   |
| 스코어              | 종속성의 위험도 또는 품질 점수를 정렬합니다.           |
| 심각도           | 심각도 등급에 따라 취약점을 필터링합니다.        |
| 플랫폼           | 라이브러리를 대상 플랫폼별로 구분합니다. |

취약점 보고서에 액세스하여 프로젝트에서 취약점이 발견된 소스 파일과 해당 파일의 코드 소유자에 관한 정보를 확인할 수 있습니다.

{{< img src="/getting_started/code_analysis/sci_vulnerabilities.png" alt="감지된 라이브러리 취약점에서 GitHub 소스 코드로의 직접 링크" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## Service Catalog에서 결과 탐색

서비스 관련된 코드 위반 및 Static Analysis에서 확인한 코드 위반 사항을 조사하여 속도 저하 및 장애를 해결하세요. [**Service Management** > **Services** > **Service Catalog**][13]로 이동한 후 **Delivery** 뷰를 클릭하여 서비스의 사전 프로덕션 상태를 분석합니다.

{{< img src="/getting_started/code_analysis/catalog_view.png" alt="감지된 라이브러리 취약점에서 GitHub 소스 코드로의 직접 링크" style="width:100%" >}}

서비스를 클릭하면 Pipeline Visibility에서 CI 파이프라인에 대한 정보를 확인할 수 있습니다. 또한, 사이드 패널 **Delivery** 탭의 Code Analysis에서 보안 취약성 및 코드 품질 문제도 확인할 수 있습니다.

{{< img src="/getting_started/code_analysis/catalog_service.png" alt="감지된 라이브러리 취약점에서 GitHub 소스 코드로의 직접 링크" style="width:100%" >}}

### 코드 위반 및 라이브러리에 서비스 연결하기

Datadog은 다음의 메커니즘을 사용하여 코드 위반 또는 라이브러리를 관련 서비스와 연결합니다.

1. [Service Catalog를 사용하여 서비스와 관련된 코드 위치 식별](#identifying-the-code-location-in-the-service-catalog)
2. [추가 Datadog 제품 내 파일 사용 패턴 감지](#detecting-file-usage-patterns)
3. [파일 경로 또는 리포지토리에서 서비스 이름 검색](#detecting-service-name-in-paths-and-repository-names)

한 가지 방법이 성공하면 더는 매핑을 시도하지 않습니다. 각 매핑 메서드는 아래에 자세히 설명되어 있습니다.

#### Service Catalog에서 코드 위치 식별

Service Catalog 스키마 버전 `v3` 이상에서는 서비스의 코드 위치 매핑을 추가할 수 있습니다. `codeLocations` 섹션은 코드가 포함된 리포지토리의 위치와 관련 경로를 지정합니다.

`paths` 속성은 리포지토리 경로와 일치해야 하는
[글로브][14] 목록입니다.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - path/to/service/code/**
{{< /code-block >}}


#### 파일 사용 패턴 감지

Datadog은 Error Tracking 같은 추가 제품의 파일 사용을 감지하고
파일을 런타임 서비스와 연결합니다. 예를 들어, `foo` 서비스에
로그 항목 또는 경로가 `/modules/foo/bar.py`인 파일이 포함된 스택 트레이스가 있는 경우,
파일 `/modules/foo/bar.py`을 서비스 `foo`에 연결합니다.

#### 경로 및 리포지토리 이름에서 서비스 이름 감지

Datadog은 경로 및 리포지토리 이름에서 서비스 이름을 감지하고, 일치하는 항목이 발견되면 해당 파일을 서비스와 연결합니다.

리포지토리가 일치하는 경우, `myservice`라는 서비스가 있고
리포지토리 URL이 `https://github.com/myorganization/myservice.git` 이라면,
`myservice`를 리포지토리의 모든 파일에 연결합니다.

일치하는 리포지토리를 찾지 못한 경우, Datadog은 파일의 `path`에서 일치하는 항목을 찾으려고 시도합니다.
`myservice` 라는 서비스가 있고 경로가 `/path/to/myservice/foo.py`인 경우, 서비스 이름이 경로의 일부이므로 파일은 `myservice`와 연결됩니다. 경로에 두 개의 서비스가 존재하는 경우,
파일 이름과 가장 가까운 서비스 이름이 선택됩니다.


### 팀을 코드 위반 사항 및 라이브러리와 연결하기

Datadog은 코드 위반 사항 또는 라이브러리 문제가 감지되면 이를 서비스 관련 팀과 자동으로 연결합니다. 예를 들어, 파일 `domains/ecommerce/apps/myservice/foo.py`이
`myservice`와 연관되어 있는 경우 `myservice` 팀을 이 파일에서 감지된 모든 위반 사항과
연결합니다.

서비스 또는 팀을 찾을 수 없는 경우, Datadog은 리포지토리의 `CODEOWNERS` [파일][15] 을 사용합니다.
`CODEOWNERS` 파일은 Git 공급자의 어느 팀이 파일을 소유하는지 결정합니다.

**참고**: 이 기능이 제대로 작동하려면 Git 공급자 팀을 [Datadog Teams][16]에 정확하게 매핑해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/code_analysis/
[2]: /ko/code_analysis/static_analysis
[3]: /ko/code_analysis/software_composition_analysis
[4]: /ko/security/application_security/software_composition_analysis
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /ko/code_analysis/ide_plugins
[9]: https://app.datadoghq.com/dash/integration/31166/software-delivery---static-analysis-overview
[10]: /ko/code_analysis/static_analysis/github_actions/
[11]: /ko/code_analysis/github_pull_requests/#update-an-existing-github-app
[12]: /ko/code_analysis/github_pull_requests
[13]: https://app.datadoghq.com/services 
[14]: https://en.wikipedia.org/wiki/Glob_(programming)
[15]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[16]: /ko/account_management/teams/