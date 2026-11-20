---
algolia:
  tags:
  - static analysis
  - ci pipeline
  - SAST
  - secret scanning
description: Datadog Static Secret Scanning을 사용하여 프로덕션 배포 전 코드에서 품질 문제와 보안 취약성을 스캔합니다.
is_beta: true
title: 일반 CI 공급자를 통한 Secret Scanning
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Secret Scanning은 {{< region-param key="dd_site_name" >}} 사이트에서 지원되지 않습니다.
</div>
{{% /site-region %}}


[GitHub Actions][5]를 사용하여 Secret Scanning을 설정하지 않는 경우, CI 파이프라인 플랫폼에서 [Datadog CI][4] CLI를 직접 실행하고 정적 분석 결과 교환 형식(SARIF) 보고서를 Datadog에 업로드할 수 있습니다.

<div class="alert alert-info"><a href="/security/code_security/secret_scanning/#detect-secrets-in-git-history">Git 기록 스캔</a>은 호스팅 스캔에서만 사용할 수 있습니다. CI 기반 스캔은 체크아웃된 커밋을 분석합니다.</div>

요구 사항:

- unzip
- Node.js 14 이상

다음 환경 변수를 구성하세요.

| 이름         | 설명                                                                                                                | 필수 | 기본값         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Datadog API 키입니다. 이 키는 [Datadog 조직][1]에서 생성되며 시크릿으로 저장해야 합니다.            | 예      |                 |
| `DD_APP_KEY` | Datadog 애플리케이션 키입니다. 이 키는 [Datadog 조직][2]에서 생성하며, `code_analysis_read` 범위를 포함하고 시크릿으로 저장해야 합니다.  | 예      |                 |
| `DD_SITE`    | 정보를 전송할 [Datadog 사이트][3]입니다. Datadog 사이트는 {{< region-param key="dd_site" code="true" >}}.       | 아니요       | `datadoghq.com` |


다음 옵션에서 사용 중인 아키텍처와 OS에 맞는 분석기를 선택합니다.

| 아키텍처 | OS        | 이름                                                    | 링크                                                                                                                                          |
|--------------|-----------|---------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------|
| `aarch64`    | `Darwin`  | `datadog-static-analyzer-aarch64-apple-darwin.zip`      | [다운로드](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-apple-darwin.zip)      |
| `aarch64`    | `Linux`   | `datadog-static-analyzer-aarch64-unknown-linux-gnu.zip` | [다운로드](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-unknown-linux-gnu.zip) |
| `x86_64`     | `Darwin`  | `datadog-static-analyzer-x86_64-apple-darwin.zip`       | [다운로드](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-apple-darwin.zip)       |
| `x86_64`     | `Linux`   | `datadog-static-analyzer-x86_64-unknown-linux-gnu.zip`  | [다운로드](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip)  |
| `x86_64`     | `Windows` | `datadog-static-analyzer-x86_64-pc-windows-msvc.zip`    | [다운로드](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-pc-windows-msvc.zip)    |

CI 파이프라인에 다음을 추가합니다.

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"
export DD_API_KEY=<YOUR-API-KEY>
export DD_APP_KEY=<YOUR-APP-KEY>

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog static analyzer:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip
curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Run Static Code Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif --enable-secrets true --enable-static-analysis false

# Upload results
datadog-ci sarif upload /tmp/report.sarif
```

<div class="alert alert-info">
  이 예시는 Secret Scanning을 위한 Datadog 정적 분석기의 x86_64 Linux 버전을 사용합니다. 다른 OS나 아키텍처를 사용하는 경우 위 표에서 해당 항목을 선택하고 다음 <code>DATADOG_STATIC_ANALYZER_URL</code> 값을 업데이트하세요. <a href="https://github.com/DataDog/datadog-static-analyzer/releases">GitHub Releases</a> 페이지에서 모든 릴리스를 확인할 수 있습니다.
</div>


[1]: /ko/account_management/api-app-keys/#api-keys
[2]: /ko/account_management/api-app-keys/#application-keys
[3]: /ko/getting_started/site/
[4]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sarif
[5]: /ko/security/code_security/secret_scanning/github_actions/