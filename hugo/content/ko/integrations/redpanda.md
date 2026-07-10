---
app_id: redpanda
app_uuid: 4c7855c5-6c2c-46c5-bfc3-1a7df1ac6b77
assets:
  dashboards:
    Redpanda Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: redpanda.application.uptime
      metadata_path: metadata.csv
      prefix: redpanda.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10232
    source_type_name: Redpanda
  logs:
    source: redpanda
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Redpanda
  sales_email: support@redpanda.com
  support_email: support@redpanda.com
categories:
- 로그 수집
- 메시지 대기열
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redpanda/README.md
display_on_public_website: true
draft: false
git_integration_title: redpanda
integration_id: redpanda
integration_title: Redpanda
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: redpanda
public_title: Redpanda
short_description: Redpanda 클러스터의 전반적인 서비스 상태 및 성능을 모니터링하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Message Queues
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Redpanda 클러스터의 전반적인 서비스 상태 및 성능을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Redpanda
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->

## 개요

Redpanda는 필수 워크로드용 Kafka API-호환 스트리밍 플랫폼입니다.

Datadog을 [Redpanda][1]와 연결하여 키 메트릭를 확인하고 특정 사용자 요구에 따라 추가 메트릭 그룹을 추가합니다.

## 설정

### 설치

1. [Datadog 에이전트를 다운로드하여 실행합니다][2].
2. Redpanda 통합을 수동 설치합니다. 환경에 따른 자세한 내용은 [커뮤니티 통합 사용][3]을 참조하세요.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행되는 에이전트에 대해 이 점검을 설정하려면 `datadog-agent integration install -t datadog-redpanda==<INTEGRATION_VERSION>`을 실행하세요.

{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 도커(Docker) 에이전트로 본 통합을 사용하는 가장 좋은 방법은 Redpanda 통합이 설치된 에이전트를 빌드하는 것입니다.

에이전트의 업데이트 버전을 빌드하려면,

1. 다음 Dockerfile을 사용합니다.

```dockerfile
FROM gcr.io/datadoghq/agent:latest

ARG INTEGRATION_VERSION=2.0.0

RUN agent integration install -r -t datadog-redpanda==${INTEGRATION_VERSION}
```

2. 이미지를 빌드하여 비공개 도커(Docker) 레지스트리에 푸시합니다.

3. Datadog 에이전트 컨테이너 이미지를 업그레이드합니다. Helm 차트를 사용하는 경우 `values.yaml` 파일의 `agents.image` 섹션을 수정하여 기본 에이전트 이미지를 대체합니다.

```yaml
agents:
  enabled: true
  image:
    tag: <NEW_TAG>
    repository: <YOUR_PRIVATE_REPOSITORY>/<AGENT_NAME>
```

4. 새 `values.yaml` 파일을 사용하여 에이전트를 업그레이드합니다.

```shell
helm upgrade -f values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

##### 메트릭 수집

Redpanda 성능 데이터 수집을 시작하려면,

1. [에이전트 설정 디렉토리][1] 루트에 있는 `conf.d/` 폴더에서 `redpanda.d/conf.yaml` 파일을 편집하세요. 사용 가능한 모든 설정 옵션은 [redpanda.d/conf.yaml.example][2] 샘플을 참조하세요.

2. [에이전트를 다시 시작합니다][3].

##### 로그 수집

Datadog 에이전트에서 로그 수집은 기본적으로 비활성화되어 있습니다. 로그 수집은 에이전트 v6.0 이상에서 사용할 수 있습니다.

1. 로그를 활성화하려면 `datadog.yaml` 파일에 다음을 추가합니다.

   ```yaml
   logs_enabled: true
   ```

2. `dd-agent` 사용자가 `systemd-journal` 그룹의 멤버인지 확인하고, 그렇지 않은 경우 루트 권한으로 다음 명령을 실행합니다.
   ```
   usermod -a -G systemd-journal dd-agent
   ```

3. `redpanda.d/conf.yaml` 파일에 다음을 추가하여 Redpanda 로그 수집을 시작합니다.

   ```yaml
    logs:
    - type: journald
      source: redpanda
    ```

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-extras/blob/master/redpanda/datadog_checks/redpanda/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

##### 메트릭 수집

컨테이너화된 환경에서 자동탐지는 기본적으로 Redpanda 점검이 Datadog 에이전트 이미지에 통합된 후 설정됩니다.

메트릭은 Datadog 서버에 자동 수집됩니다. 자세한 내용은 [자동탐지 통합 템플릿][1]을 참조하세요.

##### 로그 수집

Datadog 에이전트에서 로그 수집은 기본적으로 비활성화되어 있습니다. 로그 수집은 에이전트 v6.0 이상에서 사용할 수 있습니다.

로그 수집을 활성화하려면 [쿠버네티스 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "redpanda", "service": "redpanda_cluster"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://app.datadoghq.com/account/settings/agent/latest
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][4]하고 점검 섹션에서 `redpanda`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "redpanda" >}}


### 이벤트

Redpanda 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "redpanda" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.


[1]: https://redpanda.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ko/help/