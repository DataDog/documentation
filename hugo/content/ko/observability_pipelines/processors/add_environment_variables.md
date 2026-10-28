---
description: Add Environment Variables 프로세서를 사용하여 환경 변수 이름과 값을 로그 메시지에 추가하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Add Environment Variables 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

이 프로세서를 사용하여 로그 메시지에 환경 변수 필드 이름과 값을 추가하세요.

## 설정 {#setup}

이 프로세서를 설정하려면 다음 단계를 따르세요.

1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 자세한 내용은 [로그 검색 구문][1]을 참조하세요.
   - 필터와 일치하는 로그만 처리됩니다.
   - 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.
1. 환경 변수의 필드 이름을 입력합니다.
1. 환경 변수 이름을 입력합니다.
1. 다른 환경 변수를 추가하려면 {{< ui >}}Add Environment Variable{{< /ui >}}을 클릭합니다.

### 차단된 환경 변수 {#blocked-environment-variables}

다음 패턴 중 하나라도 일치하는 환경 변수는 민감한 데이터를 포함할 수 있으므로 로그 메시지에 추가되지 못하도록 차단됩니다.

- `CONNECTIONSTRING`/`CONNECTION-STRING`/`CONNECTION_STRING`
- `AUTH`
- `CERT`
- `CLIENTID`/`CLIENT-ID`/`CLIENT_ID`
- `CREDENTIALS`
- `DATABASEURL`/`DATABASE-URL`/`DATABASE_URL`
- `DBURL`/`DB-URL`/`DB_URL`
- `KEY`
- `OAUTH`
- `PASSWORD`
- `PWD`
- `ROOT`
- `SECRET`
- `TOKEN`
- `USER`

환경 변수는 문자 그대로의 단어가 아닌 패턴과 매칭됩니다. 예를 들어, `PASSWORD`는 `USER_PASSWORD` 및 `PASSWORD_SECRET`과 같은 환경 변수가 로그 메시지에 추가되는 것을 차단합니다.

### 허용 목록 {#allowlist}

파이프라인에 프로세서를 추가하고 {{< ui >}}Next: Install{{< /ui >}}을 클릭한 후 값을 가져와 이 프로세서와 함께 사용하려는 환경 변수 목록을 쉼표로 구분하여 {{< ui >}}Add environment variable processor(s) allowlist{{< /ui >}} 필드에 입력합니다.

허용 목록은 환경 변수 `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST`에 저장됩니다.

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][2] 및 [프로세서 버퍼 메트릭][3]에 대한 자세한 내용은 [파이프라인 사용량 메트릭][4] 설명서를 참조하세요. Add Environment Variables 프로세서 메트릭별로 필터링하거나 그룹화하려면 `component_type:add_env_vars` 태그를 사용하세요.

[1]: /ko/observability_pipelines/search_syntax/logs/
[2]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/