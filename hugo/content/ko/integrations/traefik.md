---
app_id: traefik
app_uuid: 3e412d36-f638-4cb0-9068-294aac7a84e2
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: traefik.total_status_code_count
      metadata_path: metadata.csv
      prefix: traefik.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10047
    source_type_name: Traefik
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/traefik/README.md
display_on_public_website: true
draft: true
git_integration_title: traefik
integration_id: traefik
integration_title: Traefik
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: traefik
public_title: Traefik
short_description: traefik metrics 수집
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: collects traefik metrics
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Traefik
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Traefik][1] 메트릭, 로그, 트레이스를 Datadog으로 보내 Traefik 서비스를 모니터링하세요.

## 설정

Traefik 점검은 [Datadog Agent][2] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Agent v7.21 이상 / v6.21 이상의 경우, 아래 지침에 따라 호스트에 Traefik 점검을 설치하세요. Docker Agent 또는 이전 버전의 Agent를 사용하여 설치하려면 [커뮤니티 통합 사용][3]을 참조하세요.

1. 다음 명령어를 실행해 Agent 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-traefik==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

{{< tabs >}}
{{% tab "v2" %}}

#### v2인 경우
v1에서 v2로의 변경 사항에 관한 자세한 내용은 [Traefik 마이그레이션 가이드][1]를, 최신 버전에 관한 자세한 내용은 [Traefik 설명서][2]를 참조하세요.

#### 메트릭 수집

[Traefik 설명서][3]를 참고해 [Traefik 메트릭][4]을 Datadog으로 전송합니다.

#### 로그 수집

**Agent >6.0에서 사용 가능**

기본적으로 [Traefik 로그][5]는 stdout으로 전송됩니다. Datadog Agent가 컨테이너 `stdout`/`stderr`에서 직접 로그를 수집할 수 있으므로 컨테이너화된 버전에서는 이 설정을 변경할 필요가 없습니다.

1. [Traefik이 파일에 로깅하도록][5] 설정하려면 Traefik 설정 파일에 다음을 추가하세요.

   ```conf
   [traefikLog]
     filePath = "/path/to/traefik.log"
     format   = "json"
    ```

    [일반 Apache Access 형식][6]은 기본적으로 사용되며 이 통합에서 지원됩니다.

2. Datadog Agent에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

3. Traefik 로그 수집을 시작하려면 [Agent 설정 디렉터리][7]의 루트에 있는 `traefik.d/conf.yaml` 파일에 이 설정 블록을 추가하세요.

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

   `path`와 `service` 파라미터 값을 환경에 맞도록 변경합니다.

4. [에이전트를 재시작합니다][8].

#### 트레이스 수집

1. 필요한 경우 Datadog에 [APM을 활성화합니다][9].
2. [Traefik 설명서][10]를 참고해 [트레이스][11]를 Datadog으로 전송합니다.

[1]: https://doc.traefik.io/traefik/v2.0/migration/v1-to-v2/
[2]: https://doc.traefik.io/traefik/
[3]: https://doc.traefik.io/traefik/observability/metrics/datadog/
[4]: https://doc.traefik.io/traefik/observability/metrics/overview/
[5]: https://doc.traefik.io/traefik/observability/logs/#filepath
[6]: https://doc.traefik.io/traefik/observability/logs/#format
[7]: https://docs.datadoghq.com/ko/agent/faq/agent-configuration-files/#agent-configuration-directory
[8]: https://docs.datadoghq.com/ko/agent/faq/agent-commands/#start-stop-restart-the-agent
[9]: https://docs.datadoghq.com/ko/getting_started/tracing/#enable-apm
[10]: https://doc.traefik.io/traefik/observability/tracing/datadog/
[11]: https://doc.traefik.io/traefik/observability/tracing/overview/
{{% /tab %}}
{{% tab "v1" %}}

#### v1인 경우

v1에 관한 자세한 내용은 [Traefik 설명서][1]를 참조하세요. v1에서 v2로의 변경 사항에 관한 자세한 내용은 [Traefik 마이그레이션 가이드][2]를 참조하세요.

#### 메트릭 수집

1. Traefik [메트릭][2]을 수집하려면 [Agent 설정 디렉터리][3]의 루트에 있는 `conf.d/` 폴더에서 `traefik.d/conf.yaml` 파일을 엽니다.

2. [메트릭][2] 수집을 시작하려면 이 구성 설정을 `traefik.d/conf.yaml` 파일에 추가하세요.

    ```yaml
    init_config:

    instances:
      - host: 10.1.2.3
        port: "8080"
        path: "/health"
        scheme: "http"
    ```

    설정 옵션:

    - host: 쿼리할 Traefik 엔드포인트. **필수**
    - port: Traefik 엔드포인트의 API 리스너. 기본값은 `8080`. _선택 사항_
    - path: Traefik 상태 점검 엔드포인트 경로. 기본값은 `/health`. _선택 사항_
    - scheme: Traefik 상태 점검 엔드포인트의 스키마. 기본값은 `http`. _선택 사항_

3. [Agent를 다시 시작][4]하여 Traefik 메트릭을 Datadog으로 전송합니다.

사용 가능한 모든 설정 옵션은 [샘플 traefik.d/conf.yaml][5]을 참조하세요.

#### 로그 수집

**Agent >6.0에서 사용 가능**

기본적으로 [Traefik 로그][6]는 stdout으로 전송됩니다. Datadog Agent가 컨테이너 `stdout`/`stderr`에서 직접 로그를 수집할 수 있으므로 컨테이너화된 버전에서는 이 설정을 변경할 필요가 없습니다.

1. [Traefik이 파일에 로깅][6]하도록 설정하려면 Traefik 설정 파일에 다음을 추가하세요.

    ```conf
    [traefikLog]
      filePath = "/path/to/traefik.log"
      format   = "json"
    ```

    [일반 Apache Access 형식][7]은 기본적으로 사용되며 이 통합에서 지원됩니다.

2. Datadog Agent에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

3. Traefik 로그 수집을 시작하려면 [Agent 설정 디렉터리][3]의 루트에 있는 `traefik.d/conf.yaml` 파일에 이 설정 블록을 추가하세요.

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

   `path`와 `service` 파라미터 값을 환경에 맞도록 변경합니다.

4. [Agent를 재시작합니다][4].

#### 트레이스 수집

**Traefik v1.7+에서 사용 가능**

1. 필요한 경우 Datadog에 [APM을 활성화합니다][8].
2. [Traefik 설명서][9]를 참고해 트레이스를 Datadog으로 전송합니다.

[1]: https://doc.traefik.io/traefik/v1.7/
[2]: https://github.com/DataDog/integrations-extras/blob/master/traefik/metadata.csv
[3]: https://docs.datadoghq.com/ko/agent/faq/agent-configuration-files/#agent-configuration-directory
[4]: https://docs.datadoghq.com/ko/agent/faq/agent-commands/#start-stop-restart-the-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/traefik/datadog_checks/traefik/data/conf.yaml.example
[6]: https://doc.traefik.io/traefik/v1.7/configuration/logs/#traefik-logs
[7]: https://doc.traefik.io/traefik/v1.7/configuration/logs/#clf-common-log-format
[8]: https://docs.datadoghq.com/ko/getting_started/tracing/#enable-apm
[9]: https://doc.traefik.io/traefik/v1.7/configuration/tracing/#datadog
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 `status` 하위 명령을 실행][5]하고 Checks 섹션에서 `traefik`을 찾습니다.

## 호환성

이 점검은 다른 주요 플랫폼과 모두 호환됩니다.

**메트릭**

v2인 경우 Datadog에 전송된 [Traefik 메트릭][6] 목록을 확인하세요.

v1인 경우 통합에서 제공하는 [메트릭][7] 목록을 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "traefik" >}}


### 이벤트

Traefik 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "traefik" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://traefik.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[6]: https://doc.traefik.io/traefik/observability/metrics/overview/
[7]: https://docs.datadoghq.com/ko/integrations/traefik/#metrics
[8]: https://docs.datadoghq.com/ko/help
