---
description: 일반적인 Code Analysis 문제를 해결하는 방법과 지원팀에 문의하는 방법을 알아보세요.
further_reading:
- link: /code_analysis/
  tag: 설명서
  text: 코드 분석에 대해 알아보기
- link: /code_analysis/static_analysis/
  tag: 설명서
  text: 정적 분석에 대해 알아보기
- link: /code_analysis/software_composition_analysis/
  tag: 설명서
  text: 소프트웨어 구성 요소 분석에 대해 알아보기
title: Code Analysis 트러블슈팅
---

## 개요

이 페이지는 Datadog Code Analysis 설정 또는 구성 문제 발생 시 해결하는 방법을 안내합니다. 문제가 지속되면 [Datadog 지원팀에 문의][1]하세요.

## 정적 분석

Datadog Static Analyzer 관련 문제는 버그 보고서에 다음 정보를 포함하여 지원팀과 Customer Success Manager에게 제출하세요.

- `static-analysis.datadog.yml` 파일
- 로컬 환경이나 CI/CD 파이프라인에서 실행되는 정적 분석 도구(예: CLI)의 출력 결과
- 생성된 SARIF 파일(사용 가능한 경우)
- 리포지토리 URL(공개 또는 비공개)
- 분석을 실행한 브랜치 이름
- Datadog Static Analyzer를 실행하는 데 사용된 정확한 명령줄

### 성능 이슈

성능 문제가 발생하는 경우 명령줄에서 정적 분석 도구를 실행할 때 `--performance-statistics` 플래그를 활성화할 수 있습니다.

성능 문제의 경우 다음 정보를 포함하세요.

- `static-analysis.datadog.yml` 파일
- 로컬 환경이나 CI/CD 파이프라인에서 실행되는 정적 분석 도구(예: CLI)의 출력 결과
- 리포지토리 URL(공개 또는 비공개)

**참고:** [Static Analysis 및 GitHub Actions][2]를 사용하는 경우 [`enable_performance_statistics`][3] 파라미터를 true로 설정하세요.

### 차단 이슈

성능과 관련 없는 문제가 발생하거나 Datadog Static Analyzer가 종료되지 않는 경우 `--debug true --performance-statistics` 플래그를 사용하여 Datadog Static Analyzer를 실행하세요.

### 분석기 실행 시 403 오류 발생

분석기와 `datadog-ci`를 실행할 때 다음 변수가 올바르게 지정되었는지 확인하세요. `DD_APP_KEY`, `DD_API_KEY`, `DD_SITE`

### SARIF 업로드 이슈

<div class="alert alert-info">
  SARIF 가져오기 기능은 Snyk, CodeQL, Semgrep, Checkov, Gitleaks, Sysdig에서 테스트되었습니다. 다른 SARIF 호환 도구 사용 시 문제가 발생하는 경우 <a href="/help">Datadog 지원팀</a>에 문의하시기 바랍니다.
</div>

타사 정적 분석 도구에서 Datadog으로 결과를 업로드할 때는 해당 결과가 상호 운용 가능한 [정적 분석 결과 교환 형식(SARIF)][5] 형식인지 확인하세요. Node.js 버전 14 이상이 필요합니다.

SARIF 보고서를 업로드하려면 다음 단계를 따르세요.

1. [`DD_API_KEY`와 `DD_APP_KEY` 변수가 정의되어 있는지][4] 확인합니다.
2. (선택 사항) [`DD_SITE` 변수][7]를 설정합니다(기본값은 `datadoghq.com`).
3. `datadog-ci` 유틸리티를 설치합니다:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. 코드에 타사 정적 분석 결과 도구를 실행하고 결과를 SARIF 형식으로 출력합니다.
5. 결과를 Datadog에 업로드합니다:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

### `GLIBC_X.YY not found` 오류 메시지

CI 파이프라인에서 정적 분석기를 실행하면 다음 줄과 유사한 오류 메시지가 표시됩니다.

```
version `GLIBC_X.YY' not found
```

이는 다음 중 하나에 해당합니다.

- 이전 버전의 glibc가 포함된 Linux 배포판에서 CI 파이프라인을 실행하고 있습니다. 이 경우 Datadog은 최신 버전으로 업그레이드할 것을 권장합니다. 분석기는 항상 최신 Ubuntu/Debian 기반 시스템에서 실행됩니다.
- glibc에 의존하지 않는 Linux 배포판(예: Alpine Linux)으로 CI 파이프라인을 실행하고 있습니다.
  대신, 최신 버전의 glibc(예: Ubuntu의 안정 버전)를 지원하는 배포판을 사용하여 CI 파이프라인을 실행하세요.

### Datadog UI에 결과가 표시되지 않음

**GitHub 리포지토리가 아닌 곳에서 Code Analysis를 실행하는 경우**, 첫 번째 검사는 기본 브랜치(예: `master`, `main`, `prod`, `production`과 같은 브랜치 이름)에서 실행해야 합니다. 기본 브랜치에서 커밋하면 기본이 아닌 브랜치가 분석됩니다. 앱 내에 있는 [Repository Settings][4]에서 기본 브랜치를 구성할 수 있습니다.

Datadog 분석기를 사용하는 경우 [차이점 인식 스캐닝][6]이 기본적으로 활성화되어 있습니다. CI 파이프라인 내에서 해당 도구를 실행하는 경우 `datadog-ci`가 분석 중인 리포지토리의 **루트**에서 실행되도록 해야 합니다.


## 소프트웨어 구성 분석

Datadog Software Composition Analysis에 문제가 있는 경우 버그 보고서에 다음 정보를 포함하여 지원팀과 Customer Success Manager에게 제출하세요.

- 로컬 환경이나 CI/CD 파이프라인에서 실행되는 SCA 도구(예: CLI)의 출력 결과
- 생성된 SBOM 파일(사용 가능한 경우)
- 리포지토리 URL(공개 또는 비공개)
- 분석을 실행한 브랜치 이름
- 리포지토리의 종속성 파일 목록(예: `package-lock.json`, `requirements.txt`, `pom.xml`)

### SBOM 업로드 이슈
[Datadog SBOM 생성기][7]가 권장되지만, Datadog은 모든 SBOM 파일 수집을 지원합니다. 파일이 Cyclone-DX 1.4 또는 Cyclone-DX 1.5 형식을 준수하는지 확인하세요.

SBOM 파일 수집은 다음 타사 도구에서 검증되었습니다.
- [osv-scanner][7]
- [trivy][8]

SBOM 파일을 Datadog으로 가져오려면 다음 단계를 따르세요.

1. `datadog-ci` CLI를 설치합니다(Node.js가 설치되어 있어야 함).
2. `DD_SITE`, `DD_API_KEY`, `DD_APP_KEY` 환경 변수가 설정되었는지 확인합니다.
3. 도구를 호출하여 파일을 Datadog에 업로드합니다.
다음 두 명령을 사용하여 도구를 설치하고 호출할 수 있습니다.
```bash
# datadog-ci 설치
npm install -g @datadog/datadog-ci

# SBOM 파일 업로드
datadog-ci sbom upload /path/to/sbom-file.json
```

### Datadog UI에 결과가 표시되지 않음

**GitHub 리포지토리가 아닌 곳에서 Code Analysis를 실행하는 경우**, 첫 번째 검사는 기본 브랜치(예: `master`, `main`, `prod`, `production`과 같은 브랜치 이름)에서 실행해야 합니다. 기본 브랜치에서 커밋하면 기본이 아닌 브랜치가 분석됩니다.

언제든지 앱 내에 있는 [Repository Settings][4]에서 기본 브랜치를 구성할 수 있습니다.

### C# 프로젝트의 패키지가 감지되지 않음

SBOM 생성기([`osv-scanner`][7])는 `packages.lock.json` 파일에서 종속성을 추출합니다. 이 파일이 없는 경우 프로젝트 정의를 업데이트하여 생성할 수 있습니다. [프로젝트 정의 업데이트 지침][9]에 따라 `packages.lock.json` 파일을 생성하세요.

생성된 잠금 파일은 [`osv-scanner`][7]에서 종속성을 추출하고 SBOM을 생성하는 데 사용됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/code_analysis/static_analysis/github_actions
[3]: /ko/code_analysis/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/ci/settings/repository
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: https://docs.datadoghq.com/ko/code_analysis/static_analysis/setup/#diff-aware-scanning
[7]: https://github.com/DataDog/osv-scanner
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file