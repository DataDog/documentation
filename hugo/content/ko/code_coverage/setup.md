---
description: GitHub 또는 GitLab과 통합하고, 권한을 설정하고, PR Gate를 생성하고, 커버리지 보고서를 업로드하여 Code
  Coverage를 구성합니다.
further_reading:
- link: /code_coverage
  tag: 설명서
  text: Code Coverage
- link: /code_coverage/configuration
  tag: 설명서
  text: Code Coverage 구성
- link: /code_coverage/flags
  tag: 설명서
  text: 플래그로 커버리지 데이터 구성
- link: /code_coverage/data_collected
  tag: 설명서
  text: Code Coverage를 위해 수집되는 데이터 알아보기
- link: /code_coverage/monorepo_support
  tag: 설명서
  text: Code Coverage가 대규모 모노레포를 지원하는 방법 알아보기
title: Code Coverage 설정
---
Code Coverage 설정에는 다음 단계가 포함됩니다.

1. Datadog UI에서 [소스 코드 공급자](#integrate-with-source-code-provider)와의 통합을 구성합니다.
2. Datadog에서 코드 커버리지 [데이터 액세스 권한](#data-access-permissions)을 구성합니다.
3. 필요시 [PR Gate](#pr-gates)를 구성하여 커버리지 임계값을 기준으로 풀 요청을 차단합니다.
4. CI 파이프라인을 업데이트하여 [코드 커버리지 보고서를 Datadog에 업로드](#upload-code-coverage-reports)합니다.

## 소스 코드 공급자와의 통합 {#integrate-with-source-code-provider}

Code Coverage는 다음을 지원합니다.

{{< tabs >}}
{{% tab "GitHub" %}}

GitHub 리포지토리를 Datadog에 연결하는 방법은 [GitHub 통합 설명서][1]의 지침을 따르세요.

Code Coverage에는 다음 GitHub 앱 권한이 필요합니다.
| 권한 | 액세스 수준 | 목적 |
|---|---|---|
| 콘텐츠 | 읽기 | 상세 커버리지 UI에 소스 코드를 표시합니다. |
| 풀 요청 | 쓰기 | 커버리지 UI에 PR 데이터를 표시하고 PR 코멘트를 작성합니다. |
| 검사 | 쓰기 | 커버리지 PR Gate를 생성합니다. |

다음 웹훅이 필요합니다.
| 웹훅 | 목적 |
|---|---|
| 풀 요청 | PR 데이터 업데이트를 수신합니다. |
| 풀 요청 검토 | PR 데이터 업데이트를 수신합니다. |
| 풀 요청 검토 코멘트 | PR 데이터 업데이트를 수신합니다. |
| 푸시 | Git 커밋 메타데이터를 수신합니다. |

모든 항목이 올바르게 구성되면 Datadog의 [GitHub 통합][2] 페이지에 녹색 확인 표시가 나타납니다.
{{< img src="/code_coverage/github_app_success.png" alt="GitHub 앱 통합 성공 검사" style="width:100%" >}}

<div class="alert alert-info">Datadog 관리형 Marketplace 앱 또는 기본 설정이 적용된 사용자 지정 앱을 사용하는 경우, 필수 권한과 웹훅이 포함되어 있습니다.</div>

[1]: /ko/integrations/github/#github-apps-1
[2]: https://app.datadoghq.com/integrations/github/configuration
{{% /tab %}}
{{% tab "GitLab" %}}

GitLab 리포지토리를 Datadog에 연결하는 방법은 [GitLab 소스 코드 통합 설명서][1]의 지침을 따르세요.

자세한 내용은 [Datadog 소스 통합 가이드][2]를 참조하세요.

[1]: /ko/integrations/gitlab-source-code/
[2]: /ko/integrations/guide/source-code-integration/?tab=gitlabsaasonprem#connect-your-git-repositories-to-datadog
{{% /tab %}}
{{% tab "Azure DevOps" %}}

[Azure DevOps 소스 코드 통합][2]을 사용하여 Azure DevOps 리포지토리를 Datadog에 연결하는 방법은
[Datadog 소스 코드 통합 가이드][1]의 지침을 따르세요.

[1]: /ko/integrations/guide/source-code-integration/?tab=azuredevopssaasonly#connect-your-git-repositories-to-datadog
[2]: https://app.datadoghq.com/integrations/azure-devops-source-code/
{{% /tab %}}
{{< /tabs >}}

소스 코드 공급자로부터 수집되는 데이터에 대한 자세한 내용은 [수집되는 데이터][1]를 참조하세요.

## 데이터 액세스 권한 {#data-access-permissions}

[Datadog 관리형 역할][3] 대신 [사용자 지정 역할][2]을 사용하는 경우, 코드 커버리지 데이터를 조회해야 하는 역할에 대해 {{< ui >}}Code Coverage Read{{< /ui >}} 권한을 활성화해야 합니다.

[역할 설정][4]으로 이동하여 필요한 역할에 대해 {{< ui >}}Edit{{< /ui >}}을 클릭하고, 해당 역할에 {{< ui >}}Code Coverage Read{{< /ui >}} 권한을 추가한 다음 변경 사항을 저장합니다.

더 세밀한 제어를 원하면 [Data Access Control][19]을 사용하여 조직 전체가 아닌 리포지토리별로 코드 커버리지 데이터를 제한하세요. 이렇게 하면 소스 경로 및 테스트 이름과 같은 커버리지 보고서의 민감한 정보가 팀 경계를 넘어가는 것을 방지할 수 있습니다.

Datadog에서 **Organization Settings > Data Access Control**로 이동하여 Software Delivery 및 제한하려는 리포지토리로 범위가 지정된 Restricted Dataset를 생성합니다. 해당 데이터를 확인해야 하는 역할이나 팀에 액세스 권한을 부여합니다.

## PR Gate {#pr-gates}

PR 커버리지에 대해 게이트를 설정하려면 다음 두 가지 방법 중 하나로 PR Gate 규칙을 구성할 수 있습니다.

- **Datadog UI**: [PR Gate 규칙 생성][5]으로 이동하여 전체 또는 패치 커버리지에 대해 게이트를 설정하는 규칙을 구성합니다.
- **YAML 구성 파일**: [`code-coverage.datadog.yml`][6] 파일에 게이트를 정의합니다. 이를 통해 리포지토리와 함께 코드로 게이트를 관리할 수 있습니다.

풀 요청이 열리거나 업데이트될 때 두 소스의 규칙이 모두 평가됩니다. YAML 게이트 구문 및 예시는 [구성][6]을 참조하세요.

## 코드 커버리지 보고서 업로드 {#upload-code-coverage-reports}

지원되는 Test Optimization 라이브러리를 사용하여 자동으로 또는 CI 환경에서 `datadog-ci` CLI를 실행하여 수동으로 코드 커버리지 보고서 파일을 Datadog에 업로드합니다.

코드 커버리지 보고서 업로드 중 수집되는 데이터에 대한 자세한 내용은 [수집되는 데이터][7]를 참조하세요.

### Test Optimization으로 보고서 자동 업로드 {#upload-reports-automatically-with-test-optimization}

#### 지원되는 라이브러리 및 버전 {#supported-libraries-and-versions}

자동 코드 커버리지 보고서 업로드는 다음 Test Optimization 라이브러리 버전에서 지원됩니다.

| 라이브러리 | 최초 지원 버전 | 커버리지 소스 |
|---|---|---|
| Ruby `datadog-ci` | `1.27.0` | SimpleCov |
| JavaScript `dd-trace` 5.x | `5.85.0` | Jest, Vitest 또는 NYC 커버리지 |
| JavaScript `dd-trace` 6.x | `6.0.0` | Jest, Vitest 또는 NYC 커버리지 |
| Python `ddtrace` | `4.4.0` | `coverage.py` |를 사용하는 기본 pytest 플러그인
| Java `dd-java-agent` | `1.53.0` | JaCoCo |

이러한 버전 요구 사항은 Test Optimization 라이브러리에 의한 자동 업로드에만 적용됩니다.

#### 자동 업로드 활성화 {#enable-automatic-uploads}

{{< ui >}}Code Coverage{{< /ui >}} 설정은 조직, 리포지토리 또는 테스트 서비스 수준에서 적용할 수 있습니다.

1. 라이브러리에 대한 [Test Optimization 설정][17]을 완료합니다.
2. 지원되는 라이브러리 버전으로 업그레이드합니다.
3. [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][8]에서 {{< ui >}}Code Coverage{{< /ui >}}를 켭니다.

    {{< img src="/code_coverage/automatic_code_coverage_upload_setting.png" alt="조직 수준의 CI/CD Optimization 설정에 있는 Code Coverage 토글." style="width:100%" >}}

4. [지원되는 라이브러리 및 버전](#supported-libraries-and-versions)에 나열된 소스에서 커버리지 보고서를 생성하는 테스트 명령을 실행합니다.

명령이 완료되면 라이브러리가 Datadog으로 보고서를 업로드합니다.

라이브러리에서 업로드한 보고서를 구성하고 필터링하려면 `DD_CODE_COVERAGE_FLAGS`를 지원하는 라이브러리 및 버전이 나열된 [자동으로 업로드된 보고서에 플래그 추가][9]를 참조하세요.

### 지원되는 커버리지 보고서 형식 {#supported-coverage-report-formats}

Datadog은 다음과 같은 커버리지 데이터 형식을 지원합니다. 예시를 보려면 확장하세요.

{{% collapse-content title="LCOV" level="h4" expanded=false id="lcov" %}}
{{< code-block lang="text" >}}
TN:
SF:src/example.c
FN:3,add
FNDA:5,add
FNF:1
FNH:1
DA:3,5
DA:4,5
DA:5,5
DA:8,0
DA:9,0
LF:5
LH:3
BRDA:4,0,0,5
BRDA:4,0,1,0
BRF:2
BRH:1
end_of_record
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Go Coverprofile" level="h4" expanded=false id="go-coverprofile" %}}
{{< code-block lang="text" >}}
mode: atomic
example/calculator.go:51.148,53.2 1 0
example/calculator.go:55.190,61.15 3 0
example/calculator.go:61.15,64.3 2 0
example/calculator.go:66.2,67.16 2 0
example/calculator.go:67.16,69.3 1 0
example/clients/api_client.go:27.87,31.2 3 2
example/clients/api_client.go:34.85,36.2 1 3
example/clients/api_client.go:39.126,44.2 4 3
example/clients/api_client.go:47.106,50.2 2 3
example/notifications/notifier.go:49.79,51.2 1 3
example/notifications/notifier.go:60.33,69.2 1 0
example/notifications/notifier.go:79.131,86.15 3 2
example/notifications/notifier.go:104.3,104.10 1 3
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Cobertura XML" level="h4" expanded=false id="cobertura-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-04.dtd">
<coverage lines-valid="5" lines-covered="3" line-rate="0.6" branches-valid="2" branches-covered="1" branch-rate="0.5" timestamp="1690658886" version="1.9">
  <sources>
    <source>src</source>
  </sources>
  <packages>
    <package name="example" line-rate="0.6" branch-rate="0.5">
      <classes>
        <class name="Example" filename="example/Example.java" line-rate="0.6" branch-rate="0.5">
          <methods>
            <method name="add" signature="(II)I" line-rate="1.0" branch-rate="1.0">
              <lines>
                <line number="3" hits="5"/>
                <line number="4" hits="5" branch="true" condition-coverage="50% (1/2)"/>
                <line number="5" hits="5"/>
              </lines>
            </method>
          </methods>
          <lines>
            <line number="3" hits="5"/>
            <line number="4" hits="5" branch="true" condition-coverage="50% (1/2)"/>
            <line number="5" hits="5"/>
            <line number="8" hits="0"/>
            <line number="9" hits="0"/>
          </lines>
        </class>
      </classes>
    </package>
  </packages>
</coverage>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Jacoco XML" level="h4" expanded=false id="jacoco-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<report name="Example">
  <sessioninfo id="SessionId" start="1690658886000" dump="1690658887000"/>
  <package name="example">
    <sourcefile name="Example.java">
      <line nr="3" mi="0" ci="5"/>
      <line nr="4" mi="0" ci="5" mb="1" cb="1"/>
      <line nr="5" mi="0" ci="5"/>
      <line nr="8" mi="1" ci="0"/>
      <line nr="9" mi="1" ci="0"/>
    </sourcefile>
  </package>
</report>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Clover XML" level="h4" expanded=false id="clover-xml" %}}
{{< code-block lang="xml" >}}
<coverage generated="1661852015">
    <project timestamp="1661852015">
        <file name="/var/www/html/src/App/Console/CronjobRunnerCommand.php">
            <class name="App\Console\CronjobRunnerCommand" namespace="global">
                <metrics complexity="3" methods="3" coveredmethods="0" conditionals="0" coveredconditionals="0" statements="4" coveredstatements="0" elements="7" coveredelements="0"/>
            </class>
            <line num="18" type="method" name="__construct" visibility="public" complexity="1" crap="2" count="0"/>
            <line num="20" type="stmt" count="1"/>
            <line num="27" type="stmt" count="0"/>
            <line num="30" type="method" name="execute" visibility="protected" complexity="1" crap="2" count="0"/>
            <line num="32" type="stmt" count="0"/>
            <metrics loc="35" ncloc="35" classes="1" methods="3" coveredmethods="0" conditionals="0" coveredconditionals="0" statements="4" coveredstatements="0" elements="7" coveredelements="0"/>
        </file>
        <file name="/var/www/html/src/App/Console/CronjobRunnerCommand2.php">
            <line num="42" type="stmt" count="1"/>
        </file>
    </project>
</coverage>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenCover XML" level="h4" expanded=false id="opencover-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="utf-8"?>
<CoverageSession xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Modules>
    <Module hash="ABC123">
      <ModulePath>Example.dll</ModulePath>
      <Files>
        <File uid="1" fullPath="src\example\Example.cs" />
      </Files>
      <Classes>
        <Class>
          <Methods>
            <Method visited="true" cyclomaticComplexity="1" sequenceCoverage="100">
              <FileRef uid="1"/>
              <SequencePoints>
                <SequencePoint vc="5" sl="3" />
                <SequencePoint vc="5" sl="4" />
                <SequencePoint vc="5" sl="5" />
                <SequencePoint vc="0" sl="9" />
              </SequencePoints>
              <BranchPoints>
                <BranchPoint vc="5" sl="4" path="0"/>
                <BranchPoint vc="0" sl="4" path="1"/>
              </BranchPoints>
            </Method>
          </Methods>
        </Class>
      </Classes>
    </Module>
  </Modules>
</CoverageSession>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Simplecov JSON" level="h4" expanded=false id="simplecov-json" %}}
{{< code-block lang="json" >}}
{
  "meta": {
    "simplecov_version": "0.21.2"
  },
  "coverage": {
    "/path/to/file1.rb": {
      "lines": [
        null,
        1,
        2,
        0,
        null,
        1,
        null,
        null,
        null,
        "ignored",
        "ignored",
        "ignored",
        null
      ],
      "branches": []
    },
    "/path/to/file2.rb": {
      "lines": [1, 1, null, 0, 1],
      "branches": []
    }
  }
}
{{< /code-block >}}
{{% /collapse-content %}}

### datadog-ci CLI 설치 {#install-the-datadog-ci-cli}

<div class="alert alert-info">GitHub Actions를 사용하는 경우 이 설치 단계를 건너뛸 수 있습니다. 아래의 <a href="#uploading-coverage-reports">GitHub Actions 업로드 방법</a>은 <code>datadog-ci</code> 설치를 자동으로 처리하는 전용 액션을 사용합니다.</div>

독립형 바이너리는 [Datadog CI 릴리스][10]에서 제공됩니다. _linux-x64_, _linux-arm64_, _darwin-x64_, _darwin-arm64_(macOS) 및 _win-x64_(Windows) 아키텍처가 지원됩니다. 설치하려면 터미널에서 다음을 실행하세요.

{{< tabs >}}
{{% tab "Linux" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

그런 다음 `datadog-ci`를 사용하여 명령을 실행하세요.
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}
{{% /tab %}}

{{% tab "macOS" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

그런 다음 `datadog-ci`를 사용하여 명령을 실행하세요.
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}
{{% /tab %}}

{{% tab "Windows" %}}
{{< code-block lang="powershell" >}}
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64" -OutFile "datadog-ci.exe"
{{< /code-block >}}

그런 다음 `Start-Process -FilePath "datadog-ci.exe"`를 사용하여 명령을 실행하세요.
{{< code-block lang="powershell" >}}
Start-Process -FilePath "./datadog-ci.exe" -ArgumentList version
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### npm {#npm}

또는 CI 환경에서 Node.js를 사용할 수 있는 경우 `npm`을 사용하여 [`datadog-ci`][11] CLI를 전역으로 설치하세요.

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

#### Docker 이미지 {#docker-image}

또는 [Datadog CI Docker 이미지][12]를 기반으로 하는 컨테이너에서 실행되도록 CI 작업을 업데이트할 수 있습니다.
이 이미지에는 `datadog-ci`가 사전 설치되어 있어 바로 사용할 수 있습니다.

### 커버리지 보고서 업로드{#uploading-coverage-reports}

<div class="alert alert-info">
Datadog은 백엔드에서 동일한 커밋에 대한 모든 보고서를 자동으로 집계합니다. 커버리지 보고서를 업로드하기 전에 병합할 필요는 없습니다.
</div>

코드 커버리지 보고서를 Datadog에 업로드하려면 다음 명령을 실행하세요. 유효한 [Datadog API 키][13](`DD_API_KEY`)와 커버리지 보고서 파일 또는 해당 파일이 포함된 디렉터리에 대한 하나 이상의 파일 경로를 제공하세요.

{{< tabs >}}
{{% tab "GitHub Actions" %}}

[Datadog Code Coverage Upload][1] GitHub Action을 사용하세요. 이 액션은 `datadog-ci`를 자동으로 설치하고 실행하므로 추가 설정이 필요하지 않습니다.

<pre>
<code class="language-yaml" data-lang="yaml">
steps:
- name: Upload coverage reports to Datadog
  uses: DataDog/coverage-upload-github-action@v1
  with:
    api_key: ${{ secrets.DD_API_KEY }}
    site: {{< region-param key="dd_site" >}}
</code>
</pre>

또는 `datadog-ci`가 설치되어 있는 경우 직접 실행할 수 있습니다.

<pre>
<code class="language-yaml" data-lang="yaml">
steps:
- name: Upload coverage reports to Datadog
  run: datadog-ci coverage upload .
  env:
    DD_API_KEY: ${{ secrets.DD_API_KEY }}
    DD_SITE: {{< region-param key="dd_site" >}}
</code>
</pre>

[1]: https://github.com/marketplace/actions/datadog-code-coverage-upload
{{% /tab %}}
{{% tab "GitLab" %}}
<pre>
<code class="language-yaml" data-lang="yaml">
test:
  stage: test
  script:
    - ... # run your tests and generate coverage reports
    - datadog-ci coverage upload . # make sure to add the DD_API_KEY CI/CD variable
</code>
</pre>
{{% /tab %}}
{{% tab "Azure Pipelines" %}}
<code class="language-yaml" data-lang="yaml">
- script: datadog-ci coverage upload --format=clover coverage/clover.xml
  displayName: 'Upload coverage to Datadog'
  env:
    DD_API_KEY: $(DD_API_KEY)
    DD_SITE: 'datadoghq.com'
</code>
{{% /tab %}}
{{< /tabs >}}

이 명령은 지정된 디렉터리에서 지원되는 커버리지 보고서 파일을 재귀적으로 검색하므로 현재 디렉터리(`.`)를 지정하는 것으로 충분한 경우가 많습니다.
`datadog-ci coverage upload` 명령에 대한 자세한 내용은 [`datadog-ci` 설명서][14]를 참조하세요.

코드 커버리지 보고서 업로드가 완료된 직후, Datadog은 코드 커버리지 백분율 값이 포함된 PR 코멘트를 추가합니다. 코멘트에 파일별 전체 커버리지 및 패치 커버리지 분석을 추가하려면 [PR 코멘트][21]를 참조하세요.
또한 Datadog의 [Code Coverage 페이지][15]에서 풀 요청별로 집계된 커버리지 데이터를 조회하고 개별 파일 및 코드 줄을 검토할 수 있습니다.

{{< img src="/code_coverage/pr_details.png" text="Code Coverage PR details page in Datadog" style="width:100%" >}}

## 문제 해결 {#troubleshooting}

### 커버리지 업로드 명령이 커버리지 보고서 파일을 탐지하지 못함 {#coverage-upload-command-does-not-detect-coverage-report-files}

`datadog-ci coverage upload` 명령은 파일 이름 및 확장자와 같은 추론을 사용하여 지정된 디렉터리에서 지원되는 커버리지 보고서 파일을 자동으로 탐지합니다.
커버리지 보고서 파일이 예상 패턴과 일치하지 않으면 명령이 자동으로 탐지하지 못할 수 있습니다. 이 경우 보고서 형식을 지정하고 파일 경로를 위치 인수로 제공하세요. 예를 들면 다음과 같습니다.

{{< code-block lang="shell" >}}
datadog-ci coverage upload --format=lcov \
  src/coverage-reports/unit-tests/coverage.info \
  src/coverage-reports/e2e-tests/coverage.info
{{< /code-block >}}

### 커버리지 업로드가 "Format could not be detected" 오류와 함께 실패함 {#coverage-upload-fails-with-format-could-not-be-detected-error}

`datadog-ci coverage upload` 명령은 콘텐츠와 파일 확장자를 기반으로 커버리지 보고서 파일의 형식을 자동으로 탐지합니다.
명령이 다음 오류와 함께 실패하는 경우,

```
Invalid coverage report file [...]: format could not be detected
```
다음과 같이 `--format` 옵션을 사용하여 형식을 명시적으로 지정합니다.

{{< code-block lang="shell" >}}
datadog-ci coverage upload --format=cobertura reports/cobertura.xml
{{< /code-block >}}

### 커버리지 업로드에서 "Could not sync git metadata" 오류가 발생함 {#coverage-upload-outputs-could-not-sync-git-metadata-error}

Git 메타데이터 업로드는 CI 공급자를 Datadog과 직접 통합할 수 없는 경우에만 필요합니다.
Datadog GitHub 앱이나 Gitlab 통합과 같은 [소스 코드 공급자 통합][18]을 사용하는 경우, 다음과 같이 `datadog-ci coverage upload` 명령에 `--skip-git-metadata-upload=1` 플래그를 전달하여 Git 메타데이터 업로드를 비활성화할 수 있습니다.

{{< code-block lang="shell" >}}
datadog-ci coverage upload --skip-git-metadata-upload=1 .
{{< /code-block >}}

### Datadog UI에서 PR 보기에 변경된 파일이 표시되지 않음 {#datadog-ui-does-not-show-changed-files-in-the-pr-view}

기본적으로 'Changed files' 테이블에는 업로드된 커버리지 보고서에 포함된 실행 가능한 소스 코드 파일만 표시됩니다.
테이블 헤더에서 {{< ui >}}Non-executable files{{< /ui >}} 또는 {{< ui >}}All{{< /ui >}}을 선택하면 실행 가능 여부와 관계없이 PR에서 변경된 모든 파일이 표시됩니다.

{{< img src="/code_coverage/non_executable_files.png" text="In Changed files, you have the option to select Non-executable on the table header" style="width:100%" >}}

소스 코드 파일이 실수로 실행 불가능으로 표시된 경우, 업로드된 커버리지 보고서에서 누락되었을 가능성이 높습니다.
관련 보고서를 모두 업로드했는지 확인하고, 커버리지 도구 구성을 다시 확인하여 모든 해당 파일에 대해 커버리지 데이터가 수집되었는지 확인하세요.

테스트 소스는 커버리지를 측정하는 프로덕션 코드베이스의 일부가 아니므로 실행 가능한 파일로 간주되지 않습니다.

### Datadog UI에 잘못된 파일 경로가 표시됨 {#datadog-ui-shows-incorrect-file-paths}

Code Coverage는 커버리지 보고서의 파일 경로가 절대 경로이거나 리포지토리 루트를 기준으로 한 상대 경로여야 합니다.
보고서의 경로가 리포지토리의 다른 디렉터리를 기준으로 하는 경우, `datadog-ci coverage upload` 명령을 실행할 때 `--base-path` 옵션을 사용하여 올바른 기본 경로(리포지토리 루트 기준)를 다음과 같이 지정하세요.

{{< code-block lang="shell" >}}
datadog-ci coverage upload --base-path=frontend/src .
{{< /code-block >}}

### 실행 불가능한 줄로 인한 부정확한 커버리지 {#inaccurate-coverage-from-non-executable-lines}

일부 커버리지 도구는 보고서에 실행 불가능한 줄(코멘트, 빈 줄, 닫는 괄호 등)을 포함하여 해당 줄을 커버되지 않는 것으로 계산됩니다. 이는 커버리지 백분율을 낮추고 절대 실행될 수 없는 줄에 대해 거짓 부정 결과를 도출할 수 있습니다.

업로드 중 CLI는 소스 파일을 자동으로 스캔하여 이러한 실행 불가능한 줄을 식별하므로 그러한 줄을 커버리지 계산에서 제외할 수 있습니다.

파일 수정은 Go, Kotlin, C/C++, Swift, Objective-C 및 PHP 언어를 지원합니다.

다음 옵션을 사용하여 이 동작을 제어할 수 있습니다.

- `--disable-file-fixes`: 파일 수정 생성을 완전히 비활성화합니다.
- `--file-fixes-search-path <dir>`: 소스 파일을 스캔하는 데 사용되는 루트 디렉터리를 재정의합니다. 기본적으로 리포지토리 루트가 사용됩니다. 이는 모노레포 환경이거나 커버리지 보고서가 코드베이스의 일부만 다루는 경우, 탐색할 디렉터리 트리를 제한하여 스캔 속도를 높일 수 있으므로 유용합니다.

### Datadog UI와 커버리지 보고서 값 간의 불일치 {#discrepancy-between-datadog-ui-and-coverage-report-values}

Datadog은 동일한 커밋에 대한 커버리지 보고서를 자동으로 병합합니다.
결과적으로 Datadog UI에 표시되는 커버리지 비율은 개별 커버리지 보고서의 값과 다를 수 있으며, 특히 해당 보고서에 중복되거나 겹치는 소스 코드 파일 항목이 포함된 경우에 그렇습니다.

Datadog에 업로드하기 전에 외부 도구(예: [ReportGenerator][16])를 사용하여 커버리지 보고서를 병합하는 경우,
병합된 보고서에 중복된 소스 코드 파일 항목이 포함되지 않도록 하세요.
Datadog은 보고서 간에 겹치는 파일을 중복 제거하며, 이로 인해 원래의 커버리지 값과 Datadog UI에 표시되는 병합된 값 사이에 차이가 발생할 수 있습니다.

보고서가 병합되는 방식과 각 줄 상태가 계산되는 방식에 대한 설명은 [코드 커버리지 계산][20]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/code_coverage/data_collected/#source-code-provider-integration
[2]: /ko/account_management/rbac/permissions/#custom-roles
[3]: /ko/account_management/rbac/permissions/#managed-roles
[4]: https://app.datadoghq.com/organization-settings/roles
[5]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[6]: /ko/code_coverage/configuration#pr-gates
[7]: /ko/code_coverage/data_collected/#code-coverage-report-upload
[8]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=organization
[9]: /ko/code_coverage/flags#add-flags-to-automatically-uploaded-reports
[10]: https://github.com/DataDog/datadog-ci/releases
[11]: https://www.npmjs.com/package/@datadog/datadog-ci
[12]: https://hub.docker.com/r/datadog/ci
[13]: https://app.datadoghq.com/organization-settings/api-keys
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-coverage
[15]: https://app.datadoghq.com/ci/code-coverage
[16]: https://reportgenerator.io/
[17]: /ko/tests/setup/
[18]: /ko/code_coverage/setup/#integrate-with-source-code-provider
[19]: https://app.datadoghq.com/organization-settings/data-access-controls
[20]: /ko/code_coverage/coverage_calculation
[21]: /ko/code_coverage/configuration#pr-comments