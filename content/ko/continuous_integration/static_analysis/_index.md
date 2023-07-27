---
description: 코드가 프로덕션 환경에 도달하기 전에 코드의 품질 문제와 보안 취약성을 검사하는 Datadog Static Analysis에
  대해 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: 블로그
  text: Datadog으로 모든 CI 파이프라인 모니터링
- link: /integrations/guide/source-code-integration/
  tag: 설명서
  text: Source Code Integration에 대해 알아보기
is_beta: true
kind: 도움말
title: Static Analysis
---

## 개요

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis는 비공개 베타 버전이며, 지원 언어는 Python입니다. 액세스를 요청하려면 <a href="/help">지원팀에 문의</a>하세요.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.
</div>
{{% /site-region %}}

Static Analysis는 프로그램을 실행할 필요 없이 프로그램의 프로덕션 전 코드를 분석하는 소프트웨어 테스트 기법으로, 프로그램이 정적 상태임을 의미합니다. Static Analysis는 Software Development Life Cycle(SDLC) 초기에 유지 관리 문제를 식별하고 코딩 모범 사례를 준수하여 최고 품질의 코드만 프로덕션에 적용될 수 있도록 지원합니다. 


Static Analysis를 사용하면 다음과 같은 이점을 얻을 수 있습니다:

* Static Analysis는 조직의 코드 표준 준수에 대한 불확실성을 줄여주기 때문에 개발팀이 작업 속도에 큰 영향을 받지 않고 규정에 맞는 코드를 출시할 수 있습니다.
* Static Analysis를 통해 시간이 지나도 가독성이 높은 코드베이스를 유지할 수 있으므로 조직의 신규 개발자가 더 빠르게 온보딩할 수 있습니다.
* 개발자가 코드에 새로운 결함을 도입할 위험이 최소화되므로 코드의 유지 관리가 용이해져 조직의 소프트웨어가 시간이 지남에 따라 더욱 안정적으로 유지됩니다.

## 통합

{{< whatsnext desc="Static Analysis를 사용하면 선택한 모든 CI 플랫폼 제공자에서 다양한 언어의 코드 리뷰에 대한 피드백을 통합할 수 있습니다. 다음 통합에 대한 자세한 내용은 설명서를 참조하세요:">}}
    {{< nextlink href="continuous_integration/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
{{< /whatsnext >}}

## 설정

Datadog Static Analysis를 사용하려면, 리포지토리의 루트 디렉터리에 `static-analysis.datadog.yml` 파일을 추가하여 사용할 규칙 세트를 지정하세요.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

예를 들어, Python 규칙의 경우:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

[Datadog API 및 애플리케이션 키][4]를 설정하고 각 CI 제공자에서 Static Analysis를 실행합니다.

{{< tabs >}}
{{% tab "CircleCI Orbs" %}}

CircleCI로 Static Analysis를 실행하려면 [다음 CircleCI Orb 설정 지침을 따르세요][101].

[101]: /ko/continuous_integration/static_analysis/circleci_orbs

{{% /tab %}}
{{% tab "GitHub Actions" %}}

GitHub로 Static Analysis를 실행하려면, [다음 GitHub Actions 설정 지침을 따르세요][101].

[101]: /ko/continuous_integration/static_analysis/github_actions/

{{% /tab %}}
{{% tab "Other" %}}

CircleCI Orbs 또는 GitHub Actions를 사용하지 않는 경우, CI 파이프라인 플랫폼에서 직접 Datadog CLI를 실행할 수 있습니다.

필수 조건:

- UnZip
- Node.js 14 이상
- Java 17 이상

다음 환경 변수를 설정하세요: 

| 이름         | 설명                                                                                                               | 필수 사항 | 기본값         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Datadog API 키. 이 키는 [Datadog 조직][101]에서 생성하며 비밀로 저장해야 합니다.            | Yes      |                 |
| `DD_APP_KEY` | Datadog 애플리케이션 키. 이 키는 [Datadog 조직][102]에서 생성하며 비밀로 저장해야 합니다.    | Yes      |                 |
| `DD_SITE`    | 정보를 전송하는 [Datadog 사이트][103]. Datadog 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.       | No       | `datadoghq.com` |

다음 입력을 입력합니다:

| 이름      | 설명                                                                                                               | 필수 사항 | 기본값       |
|------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service`  | 결과에 태그를 지정할 서비스의 이름입니다.                                                               | Yes      |                 |
| `env`      | 결과에 태그를 지정할 환경입니다. `ci` 는 이 입력에 유용한 값입니다.                                     | No       | `none`          |

CI 파이프라인에 다음을 추가하세요:

```bash
# 종속성을 설치하세요
npm install -g @datadog/datadog-ci
curl -L http://dtdg.co/latest-static-analyzer > /tmp/ddog-static-analyzer
unzip /tmp/ddog-static-analyzer -d /tmp

# Static Analysis를 실행하세요 (사전 설치된 JVM 필요) 
/tmp/cli-1.0-SNAPSHOT/bin/cli --directory . -t true -o results.sarif -f sarif

# 결과를 업로드하세요
datadog-ci sarif upload results.sarif --service "$DD_SERVICE" --env "$DD_ENV"
```

[101]: /ko/account_management/api-app-keys/#api-keys
[102]: /ko/account_management/api-app-keys/#application-keys
[103]: /ko/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### 타사 Static Analysis 결과를 Datadog에 업로드하세요

<div class="alert alert-info">
  SARIF 가져오기는 Snyk, CodeQL, Semgrep, Checkov 및 Sysdig에 대해 테스트되었습니다. 다른 SARIF 호환 도구에서 문제가 발생하면 <a href="/help">Datadog 지원팀</a>에 문의하세요. 
</div>

타사 정적 분석 도구의 결과가 상호 운용 가능한 [Static Analysis Results Interchange Format (SARIF) 형식][5]인 경우 Datadog으로 결과를 전송할 수 있습니다.

SARIF 보고서를 업로드하려면:

1. [`DD_API_KEY`와 `DD_APP_KEY` 변수가 정의되어 있는지][4] 확인합니다.
2. 선택 사항: [`DD_SITE` 변수][103]를 지정합니다 (기본값: `datadoghq.com`).
3. `datadog-ci` 유틸리티를 설치합니다:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. 코드에 타사 정적 분석 결과 도구를 실행하고 결과를 SARIF 형식으로 출력합니다.
5. 결과를 Datadog에 업로드합니다:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION --service <datadog-service> --env <datadog-env>
   ```

## CI 파이프라인에서 Static Analysis 실행

[`datadog-ci` CLI][2]를 사용해 CI 파이프라인에서 Datadog Static Analysis를  실행하고, Datadog의 기본 규칙 세트에 따라 코드를 검사합니다.

### 결과 검색 및 필터링

Datadog Static Analyzer를 실행하도록 CI 파이프라인을 설정한 후에는 [Static Analysis Results 페이지][1]에 위반 사항이 나타납니다. 결과를 필터링하려면 목록 왼쪽의 패싯을 사용하거나 검색하세요.

각 위반 사항은 CI 파이프라인이 실행된 리포지토리의 특정 커밋 및 브랜치와 연관되어 있습니다. 행은 커밋별 모든 위반 사항을 나타냅니다.

위반 사항을 클릭하면 위반 범위와 위반이 발생한 위치에 대한 정보가 포함된 사이드 패널이 열립니다.

위반 내용은 탭에 표시됩니다:

* Source Code: 위반에 대한 설명 및 위반의 원인이 된 코드 줄입니다. 위반 코드 스니펫을 확인하려면 [Datadog GitHub App][3]을 설정하세요.
* Fix: 가능한 경우 위반 사항을 해결할 수 있는 하나 이상의 코드 수정 사항을 복사하여 붙여넣을 수 있습니다.

* Event: Static Analysis 위반 사항 이벤트와 관련된 JSON 메타데이터입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/static-analysis
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /ko/integrations/github/
[4]: /ko/account_management/api-app-keys/
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[103]: /ko/getting_started/site/