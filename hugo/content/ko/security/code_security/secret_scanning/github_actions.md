---
description: Datadog과 GitHub를 사용하여 CI 파이프라인의 코드에 노출된 시크릿을 탐지하세요.
is_beta: true
title: Secret Scanning 및 GitHub Actions
---
GitHub Action 워크플로에서 [Datadog Secret Scanning][1] 작업을 실행하세요. 이 액션은 시크릿을 스캔하는 [Datadog Static Analyzer][8]를 래핑하여 코드베이스에서 실행하고 결과를 Datadog에 업로드합니다.

## 워크플로 {#workflow}

`.github/workflows`에 파일을 생성하여 Datadog Secret Scanning 작업을 실행하세요.

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
          static_analysis_enabled: false
          secrets_enabled: true
```

Datadog API 및 애플리케이션 키는 조직 또는 리포지토리 수준에서 **반드시** [GitHub 리포지토리의 시크릿][4]으로 설정해야 합니다. Datadog 애플리케이션 키에 `code_analysis_read` 범위를 추가했는지 확인하세요. 자세한 내용은 [API 및 애플리케이션 키][2]를 참조하세요.

`dd_site`를 사용 중인 Datadog 사이트로 바꾸세요.

## 입력 사항 {#inputs}

다음 파라미터를 설정할 수 있습니다.

| 이름         | 설명                                                                                                                                             | 필수 | 기본값         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Datadog API 키입니다. 이 키는 [Datadog 조직][2]에서 생성되며 [시크릿][2]으로 저장해야 합니다.                                      | 예     |                 |
| `dd_app_key` | Datadog 애플리케이션 키입니다. 이 키는 [Datadog 조직][2]에서 생성되며 [시크릿][4]으로 저장해야 합니다.                              | 예     |                 |
| `dd_site`    | 정보를 전송할 [Datadog 사이트][3]입니다.                                                                                                           | 아니요      | `datadoghq.com` |
| `cpu_count`  | 분석기가 사용하는 CPU 수를 설정합니다.                                                                                                         | 아니요      | `2`             |
| `enable_performance_statistics` | 분석된 파일의 실행 시간 통계를 가져옵니다.                                                                                                   | 아니요      | `false`         |
| `debug`      | 분석기가 디버깅에 유용한 추가 로그를 출력하도록 합니다. 활성화하려면 `yes`로 설정하세요.                                                                  | 아니요      | `no`            |



<!-- ## Further Reading

Additional helpful documentation, links, and articles:

- [Learn about Code Security][1] -->

[1]: /ko/security/code_security/
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/ko/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[6]: /ko/security/code_security/static_analysis/static_analysis_rules/
[7]: https://github.com/DataDog/datadog-sca-github-action
[8]: https://github.com/DataDog/datadog-static-analyzer