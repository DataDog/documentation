---
algolia:
  tags:
  - 소프트웨어 구성 분석
  - ci pipeline
  - SCA
description: CI 파이프라인에서 직접 Datadog CLI를 실행하는 방법을 알아보세요. 환경 변수를 구성하고, 종속성을 설치하고, 프로덕션
  단계 전에 품질 및 보안 문제가 있는지 코드를 검사할 수 있습니다.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: 블로그
  text: Datadog으로 모든 CI 파이프라인 모니터링
is_beta: false
title: 일반적인 CI 공급자
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
코드 분석은 미리 보기에 있습니다.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    {{< region-param key="dd_site_name" >}} 사이트에서는 코드 분석 기능을 사용할 수 없습니다.
</div>
{{% /site-region %}}

## 개요

GitHub Actions를 사용하지 않는 경우 CI 파이프라인 플랫폼에서 직접 Datadog CLI를 실행할 수 있습니다.

요구 사항:

- 압축 해제
- Node.js 14 이상

다음 환경 변수를 구성합니다.

| 이름         | 설명                                                                                                                | 필수 | 기본값         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Datadog API 키입니다. 이 키는 [Datadog 조직][1]에서 생성되며 비공개로 저장되어야 합니다.            | Yes      |                 |
| `DD_APP_KEY` | Datadog 애플리케이션 키입니다. [Datadog 조직][2]에서 생성한 키로 `code_analysis_read` 범위를 포함하고 비공개로 저장되어야 합니다.    | Yes      |                 |
| `DD_SITE`    | 정보를 전송할 [Datadog 사이트][3]입니다. 사용자의 Datadog 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.       | 아니요       | `datadoghq.com` |

다음 입력을 제공합니다.

| 이름           | 설명                                                                                                                | 필수 | 기본값         |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service`      | 결과를 태깅할 서비스 이름입니다.                                                                           | Yes      |                 |
| `env`          | 결과를 태깅할 환경입니다. 이 입력에서 `ci`는 유용한 값입니다.                                           | 아니요       | `none`          |
| `subdirectory` | 분석이 제한되어야 하는 하위 디렉터리 경로입니다. 경로는 리포지토리 루트 디렉터리와 관련되어 있습니다.                  | 아니요       |                 |

```bash
# 정보를 전송할 Datadog 사이트 설정
export DD_SITE="{{< region-param key="dd_site" code="true" >}}"

# 종속성 설치
npm install -g @datadog/datadog-ci

# 최신 Datadog OSV Scanner 다운로드:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# OSV Scanner 설치
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
unzip /osv-scanner/osv-scanner.zip -d /osv-scanner
chmod 755 /osv-scanner/osv-scanner

# OSV Scanner 실행 및 종속성 검사
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# Datadog에 결과 업로드
datadog-ci sbom upload /tmp/sbom.json
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/api-app-keys/#api-keys
[2]: /ko/account_management/api-app-keys/#application-keys
[3]: /ko/getting_started/site/