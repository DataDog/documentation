---
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-github-action/blob/main/README.md
description: Datadog과 GitHub를 사용해 CI 파이프라인에서 Static Analysis 작업을 실행하세요.
title: Static Analysis와 GitHub Actions
---
## 개요

GitHub Action 워크플로에서 Datadog Static Analysis 작업을 실행하세요.

Static Analysis는 비공개 베타 버전입니다. 액세스를 요청하려면 [지원팀에 문의하세요][4].

## 설정

Datadog Static Analysis를 사용하려면 `static-analysis.datadog.yml` 파일을 리포지토리의 루트 디렉터리에 추가해 사용할 규칙 세트를 지정해야 합니다.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

### Python 예시

다음은 Python 기반 리포지토리 예시입니다:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

## 워크플로우

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
        uses: actions/checkout@v3
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v1
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_service: "my-service"
          dd_env: "ci"
```

GitHub 리포지토리에서 Datadog API와 애플리케이션 키를 **반드시** 비밀로 설정해야 합니다. 자세한 정보는 [API 및 애플리케이션 키][1]를 참고하세요.

## 입력 사항

Static Analysis에 대해 다음 파라미터를 설정합니다.

| 이름         | 설명                                                                                                                | 필수 | 기본 설정         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Datadog API 키입니다. 이 키는 [Datadog 조직][1]에서 생성되고 [비밀][2]로 저장되어야 합니다.         | 예     |                 |
| `dd_app_key` | Datadog 애플리케이션 키입니다. 이 키는 [Datadog 조직][1]에서 생성되고 [비밀][2]로 저장되어야 합니다. | 예     |                 |
| `dd_service` | 결과에 태그를 지정할 서비스입니다.                                                                             | 예     |                 |
| `dd_env`     | 결과에 태그를 지정할 환경입니다. Datadog은 `ci`를 입력 값으로 권장합니다.              | 아니요      | `none`          |
| `dd_site`    | 정보를 전송할 [Datadog 사이트][3]입니다.                                                                              | 아니요      | `datadoghq.com` |

[1]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[2]: https://docs.github.com/en/actions/security-guides/encrypted-secrets
[3]: https://docs.datadoghq.com/ko/getting_started/site/
[4]: https://docs.datadoghq.com/ko/help/