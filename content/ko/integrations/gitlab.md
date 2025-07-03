---
app_id: gitlab
app_uuid: 3d165411-7734-4f72-b39a-f222add296b2
assets:
  dashboards:
    Gitlab Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - gitlab.process_max_fds
      - gitlab.ruby.process_start_time_seconds
      metadata_path: metadata.csv
      prefix: gitlab.
    process_signatures:
    - gitlab-kas
    - gitlab-workhorse
    - gitlab-ctl
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10026
    source_type_name: Gitlab
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- collaboration
- developer tools
- issue tracking
- log collection
- source control
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gitlab/README.md
display_on_public_website: true
draft: false
git_integration_title: gitlab
integration_id: gitlab
integration_title: GitLab
integration_version: 9.1.0
is_public: true
manifest_version: 2.0.0
name: gitlab
public_title: GitLab
short_description: Datadog로 GitLab 메트릭 모두 추적하기.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::협업
  - Category::개발자 도구
  - Category::문제 추적
  - Category::로그 수집
  - Category::소스 컨트롤
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::통합
  configuration: README.md#Setup
  description: Datadog로 GitLab 메트릭 모두 추적하기.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: GitLab
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 통합으로 다음을 할 수 있습니다.

- Prometheus를 통해 GitLab과 Gitaly에서 수집한 메트릭 가시화 및 모니터링

자세한 정보는 [Prometheus와 함께 사용하는 GitLab 모니터링][1]을 참고하세요.

GitLab 파이프라인을 더 깊게 모니터링하려면 [CI Pipeline Visibility][2]를 참고하세요. CI Pipeline Visibility를 사용하면 사용자 워크플로우를 세부화하여 인사이트를 얻을 수 있고 상세한 Git 메타데이터를 얻을 수 있으며 시간 흐름에 따른 파이프라인 성능을 추적할 수 있습니다.

## 설정

이 OpenMetrics 기반 통합에는 최신 모드(활성화하려면 `openmetrics_endpoint`가 대상 엔드포인트를 가리키도록 설정)와 레거시 모드(활성화 하려면 `prometheus_url`를 대신 설정)가 있습니다. Datadog에서는 최신 모드를 활성화해 최신 기능을 사용할 것을 권장합니다. 자세한 내용을 확인하려면 [OpenMetrics 기반 통합의 최신 및 레거시 버전 관리][3]를 참고하세요.

`[OpenMetricsV1]`나 `[OpenMetricsV2]`으로 표시된 메트릭은 GitLab 통합의 해당 모드를 사용해서만 사용할 수 있습니다. 다른 메트릭은 전부 두 모드를 함께 사용해 수집됩니다.

### 설치

GitLab 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있으므로 GitLab 서버에 추가 설치할 필요가 없습니다.

### 구성

{{< tabs >}}
{{% tab "호스트" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. GitLab의 [엔드포인트][2]를 가리키려면 [에이전트 구성 설정 디렉터리][1] 루트에 있는 `conf.d/` 폴더에서 `consul.d/conf.yaml` 파일을 편집하세요.
최신 모드에서 사용 가능한 모든 설정 옵션을 보려면 [샘플 gitlab.d/conf.yaml][3]을 참고하세요. 이 통합을 이미 설치한 경우에는 [레거시 예시][4]를 참고하세요.

2. GitLab 설정 페이지에서 `Enable Prometheus Metrics` 옵션이 활성화되어 있어야 합니다(관리자 접근 권한 필요). 메트릭 수집을 활성화하는 방법에 관한 자세한 내용은 [GitLab Prometheus 메트릭][5]을 참고하세요.

3. 내 `/etc/gitlab/gitlab.rb`를 업데이트해 모니터링 엔드포인트에 접근할 수 있도록 허용하세요.

    ```
    gitlab_rails['monitoring_whitelist'] = ['127.0.0.0/8', '192.168.0.1']
    ```
   **참고**: GitLab을 저장하고 변경 사항을 확인하세요.

4. [에이전트를 재시작하세요][6].

##### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 그 후 하단에 있는 `logs` 줄의 주석 처리를 제거하여 `envoy.d/conf.yaml`을 편집하세요. GitLab 로그 파일의 올바른 경로로 로그 `path`를 업데이트합니다.

   ```yaml
     logs:
       - type: file
         path: /var/log/gitlab/gitlab-rails/production_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/production.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/api_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
   ```

3. [에이전트를 재시작합니다][6].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html#collecting-the-metrics
[3]: https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/7.43.x/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[5]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화된 환경" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                         |
| -------------------- |-----------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `gitlab`                                                                                      |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"gitlab_url":"http://%%host%%/", "openmetrics_endpoint":"http://%%host%%:10055/-/metrics"}` |

##### 로그 수집

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스 로그 수집][2]을 참고하세요.

| 파라미터      | 값                                       |
| -------------- | ------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "gitlab", "service": "gitlab"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][5]하고 점검 섹션 아래에서 `gitlab`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "gitlab" >}}


### 이벤트

GitLab 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "gitlab" >}}
 `gitlab.readiness.*` 서비스 점검에 관한 자세한 내용은 공식 [GitLab 설명서][6]를 참고하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## GitLab Runner 통합

## 개요

이 통합으로 다음을 할 수 있습니다.

- Prometheus를 통해 GitLab Runners로 수집한 메트릭 가시화 및 모니터링
- GitLab Runner를 검증해 GitLab에 연결

GitLab Runner와 Prometheus 통합에 관한 자세한 정보를 보려면 [GitLab Runner 설명서][8]를 참고하세요.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경에서 이 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][9]을 참고하세요.

### 설치

GitLab Runner 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있으므로 GitLab 서버에 추가 설치할 필요가 없습니다.

### 구성

[에이전트 구성 디렉터리][10]의 루트에 있는 `conf.d/` 폴더의 `gitlab_runner.d/conf.yaml` 파일을 편집해 Runner의 Prometheus 메트릭 엔드포인트와 GitLab 마스터를 가리켜 서비스 점검을 할 수 있도록 설정하세요. 사용할 수 있는 구성 옵션 모두를 보려면 [샘플 gitlab_runner.d/conf.yaml][11]를 참고하세요.

`init_config` 섹션에 있는 `allowed_metrics` 아이템을 사용하면 추출해야 하는 메트릭을 지정할 수 있습니다. 일부 메트릭은 `rate`으로 전송되어야 합니다(예: `ci_runner_errors`).

### 검증

[에이전트의 `status` 하위 명령을 실행][5]하고 점검 섹션 아래에서 `gitlab_runner`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "gitlab-runner" >}}


### 로그 수집


1. [구성 파일][2] `gitlab_runner`에서 로그 형식을 `json`(_GitLab Runner 버전 >=11.4.0에서 사용할 수 있음)으로 바꾸세요.
   ```toml
   log_format = "json"
   ```

2. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

3. 다음을 실행해 `systemd-journal` 그룹에 `dd-agent` 사용자를 추가하세요.
   ```text
   usermod -a -G systemd-journal dd-agent
   ```

4. 이 구성 블록을 `gitlab_runner.d/conf.yaml` 파일에 추가해 GitLab Runner 로그를 수집하세요.

   ```yaml
   logs:
     - type: journald
       source: gitlab-runner
   ```

   사용할 수 있는 구성 옵션 모두를 보려면 [샘플 gitlab_runner.d/conf.yaml][11]을 참고하세요.

5. [에이전트를 다시 시작합니다][13].

### 이벤트

GitLab Runner 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검

GitLab Runner 점검에는 Runner와 GitLab 마스터 간 소통을 점검하는 서비스 점검과 로컬 Prometheus 엔드포인트를 사용할 수 있는지를 점검하는 서비스 점검이 포함되어 있습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.


[1]: https://docs.gitlab.com/ee/administration/monitoring/prometheus
[2]: https://app.datadoghq.com/ci/getting-started
[3]: https://docs.datadoghq.com/ko/integrations/guide/versions-for-openmetrics-based-integrations
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.gitlab.com/ee/user/admin_area/monitoring/health_check.html#readiness
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://docs.gitlab.com/runner/monitoring/
[9]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[11]: https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example
[12]: https://docs.gitlab.com/runner/configuration/advanced-configuration.html
[13]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent