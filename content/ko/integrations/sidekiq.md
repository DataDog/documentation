---
app_id: sidekiq
app_uuid: c42a2d39-16db-4256-a6fb-287602ec4661
assets:
  dashboards:
    Sidekiq Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sidekiq.jobs.count
      metadata_path: metadata.csv
      prefix: sidekiq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10093
    source_type_name: Sidekiq
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sidekiq/README.md
display_on_public_website: true
draft: false
git_integration_title: sidekiq
integration_id: sidekiq
integration_title: Sidekiq
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: sidekiq
public_title: Sidekiq
short_description: Sidekiq 작업, 대기열, 배치에 관한 메트릭을 추적합니다.
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  - 제공::통합
  configuration: README.md#Setup
  description: Sidekiq 작업, 대기열, 배치에 대한 메트릭을 추적합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sidekiq
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 통합은 [Dogstatsd][2]로 [Sidekiq][1]을 모니터합니다. [Datadog Dogstatsd Ruby 클라이언트][3]를 통해 메트릭을 수집합니다.

**참고**: Sidekiq Pro(>= 3.6) 또는 Enterprise(>= 1.1.0) 사용자만 메트릭을 수집할 수 있습니다.

## 설정

### 설치

Sidekiq 통합은 [Datadog Agent][4] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 구성

1. `dogstatsd-ruby` [Gem][3]을 설치합니다.

   ```
    gem install dogstatsd-ruby
   ```

2. 이니셜라이저에 이를 포함하여 Sidekiq Pro 메트릭 수집을 활성화합니다. 컨테이너화 배포의 경우 `localhost`를 Agent 컨테이너 주소로 업데이트합니다.

   ```ruby
        require 'datadog/statsd' # gem 'dogstatsd-ruby'

        Sidekiq::Pro.dogstatsd = ->{ Datadog::Statsd.new('localhost', 8125, namespace:'sidekiq') }

        Sidekiq.configure_server do |config|
          config.server_middleware do |chain|
            require 'sidekiq/middleware/server/statsd'
            chain.add Sidekiq::Middleware::Server::Statsd
          end
        end
   ```

    Sidekiq Enterprise를 사용 중이고 과거 메트릭을 수집하려면 다음 줄도 포함합니다.

   ```ruby
          Sidekiq.configure_server do |config|
            # history is captured every 30 seconds by default
            config.retain_history(30)
          end
   ```

    자세한 내용은 Sidekiq [Pro][5] 및 [Enterprise][6] 문서를, 추가 구성 옵션은 [Dogstatsd Ruby][3] 문서를 참조하세요.

3. [Datadog Agent 메인 구성 파일][7] `datadog.yaml`에 다음 구성을 추가해 업데이트합니다.

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: sidekiq
       prefix: "sidekiq."
       mappings:
         - match: 'sidekiq\.sidekiq\.(.*)'
           match_type: "regex"
           name: "sidekiq.$1"
         - match: 'sidekiq\.jobs\.(.*)\.perform'
           name: "sidekiq.jobs.perform"
           match_type: "regex"
           tags:
             worker: "$1"
         - match: 'sidekiq\.jobs\.(.*)\.(count|success|failure)'
           name: "sidekiq.jobs.worker.$2"
           match_type: "regex"
           tags:
             worker: "$1"
    ```

    해당 파라미터는 Datadog Agent에  `DD_DOGSTATSD_MAPPER_PROFILES` 환경 변수를 추가하여 설정할 수도 있습니다.

4. [Agent를 재시작합니다][8].

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "sidekiq" >}}


Sidekiq 통합으로 커스텀 메트릭도 사용할 수 있습니다. [Sidekiq Enterprise Historical Metrics][10]를 참조하세요.

### 로그 수집

1. 로그 수집은 Datadog Agent에서 기본적으로 비활성화되어 있습니다. 다음을 사용하여 `datadog.yaml` 파일에서 활성화합니다.

    ```yaml
      logs_enabled: true
    ```

2. 이 설정 블록을 `sidekiq.d/conf.yaml` 파일에 추가하여 Sidekiq 로그 수집을 시작하세요.

    ```yaml
      logs:
        - type: file
          path:  /var/log/sidekiq.log
          source: sidekiq
          service: <SERVICE>
    ```

     `path` 및 `service` 파라미터 값을 변경하여 사용자 환경에 맞게 설정합니다. 로그를 찾을 수 없다면 [Sidekiq Logging][11]을 참조하세요.

3. [Agent를 재시작합니다][8].

### 서비스 점검

Sidekiq은 서비스 점검을 포함하지 않습니다.

### 이벤트

Sidekiq은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.

[1]: https://sidekiq.org/
[2]: https://docs.datadoghq.com/ko/developers/dogstatsd/
[3]: https://github.com/DataDog/dogstatsd-ruby
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/mperham/sidekiq/wiki/Pro-Metrics
[6]: https://github.com/mperham/sidekiq/wiki/Ent-Historical-Metrics
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-core/blob/master/sidekiq/metadata.csv
[10]: https://github.com/mperham/sidekiq/wiki/Ent-Historical-Metrics#custom
[11]: https://github.com/mperham/sidekiq/wiki/Logging#log-file
[12]: https://docs.datadoghq.com/ko/help/