---
dependencies:
- https://github.com/DataDog/datadog-sca-github-action/blob/main/README.md
description: Datadog과 GitHub를 사용해 CI 파이프라인에서 Software Composition Analysis 작업을 실행하세요.
title: Software Composition Analysis 및 GitHub Actions
---
GitHub Action 워크플로에서 Datadog [Software Composition Analysis][1] 작업을 실행합니다.
코드베이스에서 [Datadog osv-scanner][3]를 실행한 후 결과를 Datadog에 업로드합니다.

## 라이브러리 인벤토리 생성

GitHub Action은 리포지토리에 선언된 라이브러리를 기반으로 라이브러리 인벤토리를 자동으로 생성합니다.

GitHub Action은 다음 언어와 파일에서 동작합니다.

 - JavaScript/TypeScript: `package-lock.json` 및 `yarn.lock`
 - Python: `requirements.txt` (버전이 정의된 경우) 및 `poetry.lock`
 - Java: `pom.xml`
 - C#
 - 루비(Ruby)
 - 및 기타 언어([설명서]에 명시됨)(https://docs.datadoghq.com/code_analysis/software_composition_analysis/))

## 설정

### 키 설정

[GitHub Actions Settings][2]에서 `DD_APP_KEY` 및 `DD_API_KEY`를 시크릿으로 추가합니다. Datadog 애플리케이션 키에 `code_analysis_read` 권한이 있는지 확인하세요. 자세한 내용은 [API 및 애플리케이션 키][7]를 참조하세요.

### 워크플로

`.github/workflows/datadog-sca.yml`에 다음 코드 스니펫을 추가합니다. 
반드시 `dd_site` 속성을 사용 중인 [Datadog 사이트][4]로 변경해야 합니다.

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
        dd_site: "datadoghq.com"
```

## 관련 Datadog 툴

[Datadog Static Analysis][5]는 코드를 분석하고 IDE, GitHub PR 또는 Datadog 환경 내에서 피드백을 제공합니다.
Datadog Static Analysis는 [`datadog-static-analyzer-github-action`][6] 
GitHub Action을 사용하여 설정할 수 있습니다. 

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Software Composition Analysis에 대해 알아보기][1]

[1]: https://docs.datadoghq.com/ko/code_analysis/software_composition_analysis
[2]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[3]: https://github.com/DataDog/osv-scanner
[4]: https://docs.datadoghq.com/ko/getting_started/site/
[5]: https://docs.datadoghq.com/ko/code_analysis/static_analysis
[6]: https://github.com/DataDog/datadog-static-analyzer-github-action
[7]: https://docs.datadoghq.com/ko/account_management/api-app-keys/