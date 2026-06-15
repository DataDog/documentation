---
algolia:
  tags:
  - 정적 분석
  - ci pipeline
  - SAST
description: 코드가 프로덕션 환경에 도달하기 전에 코드의 품질 문제와 보안 취약성을 검사하는 Datadog Static Analysis에
  대해 알아보세요.
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
    Code Analysis는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.
</div>
{{% /site-region %}}

## 개요

CircleCI Orbs 또는 GitHub Actions를 사용하지 않는 경우 CI 파이프라인 플랫폼에서 Datadog CLI를 직접 실행할 수 있습니다.

사전 필수 요건:

- 압축 해제
- Node.js 14 이상

다음 환경 변수 구성:

| 이름         | 설명                                                                                                                | 필수 | 기본         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Datadog API 키입니다. 이 키는 [Datadog 조직][1]에서 생성되며 비공개로 저장되어야 합니다.            | 예      |                 |
| `DD_APP_KEY` | Datadog 애플리케이션 키입니다. 이 키는 [Datadog 조직][2]에서 생성되며  `code_analysis_read` 범위를 포함하고 비공개로 저장되어야 합니다.  | 예      |                 |
| `DD_SITE`    | 정보를 전송하는 [Datadog 사이트][3]입니다. 사용자의 Datadog 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.   | 아니요       | `datadoghq.com` |

다음 입력 제공:

| 이름           | 설명                                                                                                                | 필수 | 기본         |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service`      | 결과를 태깅하려는 서비스 이름입니다.                                                                           | 예      |                 |
| `env`          | 결과를 태깅하려는 환경입니다. 이 입력에서 `ci`가 유용한 값을 제공합니다.                                           | 아니요      | `none`          |
| `cpu_count`    | 분석기가 사용하는 CPU 개수를 설정합니다. 사용 가능한 CPU 개수가 기본값으로 설정됩니다.                                     | 아니요      |                 |
| `subdirectory` | 분석이 제한되어야 하는 하위 디렉터리 경로입니다. 경로는 리포지토리의 루트 디렉터리와 관련되어 있습니다.                  | 아니요       |                 |

분석된 파일에 대한 실행 시간 통계를 얻으려면, `--performance-statistics` 플래그를 정적 분석 명령에 추가합니다.

다음 옵션에서 OS 및 아키텍처에 적합한 분석기 선택:

| 아키텍처 | OS        | 이름                                                  | 링크                                                                                                                                          |
|--------------|-----------|---------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------|
| `aarch64`    | `Darwin`  | `datadog-static-analyzer-aarch64-apple-darwin.zip`      | [다운로드](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-apple-darwin.zip)      |
| `aarch64`    | `Linux`   | `datadog-static-analyzer-aarch64-unknown-linux-gnu.zip` | [다운로드](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-unknown-linux-gnu.zip) |
| `x86_64`     | `Darwin`  | `datadog-static-analyzer-x86_64-apple-darwin.zip`       | [다운로드](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-apple-darwin.zip)       |
| `x86_64`     | `Linux`   | `datadog-static-analyzer-x86_64-unknown-linux-gnu.zip`  | [다운로드](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip)  |
| `x86_64`     | `Windows` | `datadog-static-analyzer-x86_64-pc-windows-msvc.zip`    | [다운로드](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-pc-windows-msvc.zip)    |

CI 파이프라인에 다음 추가:

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci

# 최신 Datadog 정적 분석기 다운로드:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip
curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# 정적 분석 실행
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif

# 결과 업로드
datadog-ci sarif upload /tmp/report.sarif
```

<div class="alert alert-info">
  이 예에서는 Datadog 정적 분석기의 x86_64 Linux 버전을 사용합니다. 다른 OS 또는 아키텍처를 사용하는 경우, 위 표에서 선택하고 아래의 <code>DATADOG_STATIC_ANALYZER_URL</code> 값을 업데이트해야 합니다. <a href="https://github.com/DataDog/datadog-static-analyzer/releases">GitHub 릴리스</a> 페이지에서 모든 릴리스를 확인할 수 있습니다.
</div>

## 차이 인식 검사

Diff 인식 검사는 Datadog 정적 분석이 기능 브랜치의 커밋에 의해 수정된 파일만 검사할 수 있도록 하는 기능입니다. 매번 검사할 때마다 리포지토리의 모든 파일에 분석을 실행하지 않아도 되므로 검사 시간이 크게 단축됩니다. 첫 번째 검사와 기본 브랜치 검사는 항상 diff 인식이 아닌 전체 리포지토리 분석을 생성합니다.

GitHub Actions를 사용하는 경우 기본적으로 Diff 인식 검사가 활성화되어 있습니다.

다른 CI 공급자의 경우 다음 단계에 따라 diff 인식 검사를 활성화하세요.

1. `DD_APP_KEY`, `DD_SITE` 및 `DD_API_KEY` 변수가 CI 파이프라인에 설정되어 있는지 확인합니다.
2. 정적 분석기를 호출하기 전에 `datadog-ci git-metadata upload`에 대한 호출을 추가하세요. 이 명령은 Datadog 백엔드에서 Git 메타데이터를 사용할 수 있도록 합니다. Git 메타데이터는 분석할 파일 수를 계산하는 데 필요합니다.
3. Ensure that the datadog-static-analyzer is invoked with the flag `--diff-aware`.

명령 순서 예시(이 명령은 Git 리포지토리에서 호출해야 함):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**참고: **차이 인식 검사를 완료할 수 없는 경우 전체 디렉터리를 검사합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/api-app-keys/#api-keys
[2]: /ko/account_management/api-app-keys/#application-keys
[3]: /ko/getting_started/site/