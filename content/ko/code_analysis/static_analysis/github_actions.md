---
aliases:
- /ko/continuous_integration/static_analysis/github_actions
- /ko/static_analysis/github_actions
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-github-action/blob/main/README.md
description: Datadog과 GitHub를 사용해 CI 파이프라인에서 Static Analysis 작업을 실행하세요.
title: Static Analysis와 GitHub Actions
---
## 개요

GitHub Action 워크플로에서 [Datadog Static Analysis][1] 작업을 실행합니다. 이 작업은 [Datadog Static Analyzer][8]를 래핑하고, 코드베이스에 실행한 후 결과를 Datadog에 업로드합니다.

## 워크플로

Datadog Static Analysis 작업을 실행하기 위해 `.github/workflows`에서 파일을 생성합니다.

다음은 워크플로 파일 샘플입니다.

```yaml
on: [push]

jobs:
  check-quality:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v3
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_site: "datadoghq.com"
          cpu_count: 2
          enable_performance_statistics: false
```

Datadog API 및 애플리케이션 키는 조직 또는 리포지토리 수준에서 [GitHub 리포지토리의 시크릿][4]으로 **반드시** 설정해야 합니다. 그리고 Datadog 애플리케이션 키에 `code_analysis_read` 범위를 추가합니다. 자세한 내용은 [API 및 애플리케이션 키][2]를 참고하세요.

`dd_site`를 사용 중인 Datadog 사이트로 교체하세요[3].

## 입력

Static Analysis에 대해 다음 파라미터를 설정합니다.

| 이름         | 설명                                                                                                                                             | 필수 | 기본값         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Datadog API 키. 이 키는 [Datadog 조직][2]에서 생성되었으며 [시크릿][2]으로 저장해야 합니다.                                      | Yes     |                 |
| `dd_app_key` | Datadog 애플리케이션 키. 이 키는 [Datadog 조직][2]에서 생성되었으며 [시크릿][4]으로 저장해야 합니다.                              | Yes     |                 |
| `dd_site`    | 정보를 전송할 [Datadog 사이트][3]입니다.                                                                                                           | No      | `datadoghq.com` |
| `cpu_count`  | 분석기가 사용하는 CPU 수를 설정합니다.                                                                                                         | No      | `2`             |
| `enable_performance_statistics` | 분석된 파일의 실행 시간 통계를 가져옵니다.                                                                                                   | No      | `false`         |
| `debug`      | 분석기가 디버깅에 유용한 추가 로그를 출력하도록 합니다. 활성화하려면 `yes`로 설정하세요.                                                                  | No      | `no`            |
| `subdirectory` | 분석 대상을 제한해야 하는 하위 디렉터리 패턴 또는 글로브(또는 공백으로 구분된 하위 디렉터리 패턴). 예: "src" 또는 "src packages". | `false` |                 |
| `diff_aware` | [Diff-aware scanning 모드][5]를 활성화합니다.                                                                                                                   | No      | `true`          |
| `secrets_enabled` | 시크릿 감지 활성화(비공개 베타 버전)                                                                                                              | No      | `false`         |

### 참고

1. Diff-aware 스캐닝은 기능 브랜치를 분석할 때 커밋으로 수정된 파일만 스캔합니다. Diff-aware 스캐닝은 기본적으로 활성화되어 있습니다. Diff-aware 스캐닝을 비활성화하려면 GitHub 작업 `diff_aware` 파라미터를 `false`로 설정하세요.
2. 시크릿 스캐닝은 비공개 베타 버전입니다. 시크릿 스캐닝을 활성화하려면 Datadog 고객 성공 관리자에게 문의하세요.

## 규칙 사용자 지정

기본적으로 [Datadog Static Analyzer][8]는 코드베이스의 언어를 감지하고 기본 규칙 세트를 사용하여 코드베이스를 분석합니다.

규칙 세트를 지정하고 사용자 정의하려면 리포지토리의 루트 디렉터리에 `static-analysis.datadog.yml` 파일을 추가하여 사용할 규칙 세트를 정의합니다.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

전체 규칙 세트 목록은 [Datadog 문서][6]를 참고하세요.

### Python 전용 예시

Python 기반 리포지토리 예는 다음과 같습니다.

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```


## 기타 유용한 GitHub Actions

Datadog Software Composition Analysis(SCA)는 종속성을 검사하고 취약점과 라이선스를 탐지하는 기능도 제공합니다. 이 제품은 [`datadog-sca-github-action`][7]과 함께 사용할 수 있습니다.


## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [코드 분석에 대해 알아보기][1]

[1]: https://docs.datadoghq.com/ko/code_analysis/static_analysis
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/ko/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[5]: https://github.com/DataDog/datadog-static-analyzer/blob/main/README.md#diff-aware-scanning
[6]: https://docs.datadoghq.com/ko/code_analysis/static_analysis_rules/
[7]: https://github.com/DataDog/datadog-sca-github-action
[8]: https://github.com/DataDog/datadog-static-analyzer