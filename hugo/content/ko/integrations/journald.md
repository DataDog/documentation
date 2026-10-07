---
app_id: journald
app_uuid: 2ee4cbe2-2d88-435b-9ed9-dbe07ca1d059
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10167
    source_type_name: journald
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/journald/README.md
display_on_public_website: true
draft: false
git_integration_title: journald
integration_id: journald
integration_title: journald
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: journald
public_title: journald
short_description: Datadog를 사용해 systemd-journald 로그를 모니터링하세요.
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
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog를 사용해 systemd-journald 로그를 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: journald
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Systemd-journald는 로깅 데이터를 수집하고 저장하는 시스템( 서비스)입니다. 
다양한 소스의 로깅 정보를 기반으로 구조화되고 색인된 저널을 만들고 유지 관리합니다.

## 설정

### 설치

journald 점검은 [Datadog 에이전트 ][1] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 설정

저널 파일은 기본적으로 systemd-journal 시스템 그룹이 소유하고 읽을 수 있습니다. 저널 로그 수집을 시작하려면 다음을 수행해야 합니다.

1. 저널을 실행하는 인스턴스의 [에이전트를 설치합니다][2].
2. 다음을 실행해 `systemd-journal` 그룹에 `dd-agent` 사용자를 추가하세요.
    ```text
     usermod -a -G systemd-journal dd-agent
    ```

{{< tabs >}}
{{% tab "Host" %}}

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면,

[에이전트 설정 디렉토리][1] 루트의 `conf.d/` 폴더에 있는 `journald.d/conf.yaml` 파일을 편집하여 로그 수집을 시작합니다.

#### 로그 수집

로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있으며, `datadog.yaml`에서 활성화해야 합니다:

```yaml
logs_enabled: true
```

그런 다음 `journald.d/conf.yaml` 파일에 설정 블록을 추가하여 로그 수집을 시작하세요.

```yaml
logs:
    - type: journald
      container_mode: true
```

`source` 및 `service` 속성을 채우려면 에이전트 에서 `SYSLOG_IDENTIFIER`, `_SYSTEMD_UNIT` 및 `_COMM`를 수집하여 비어 있지 않은 첫 번째 값으로 설정합니다. 통합 파이프라인을 활용하려면 Datadog `systemd` 서비스 파일에 직접 또는 `systemd` 서비스 재정의 파일에 `SyslogIdentifier` 파라미터를 설정하는 것이 좋습니다. 위치는 분포에 따라 다르지만 `systemd` 서비스 파일의 위치는 `systemctl show -p FragmentPath <unit_name>` 명령을 사용하여 찾을 수 있습니다.

**참고**: 에이전트 7.17 이상에서 `container_mode`가 `true`로 설정된 경우 도커(Docker) 컨테이너에서 수신되는 로그의 기본 동작이 변경됩니다. 로그의 `source` 속성은 단순히 `docker` 대신 해당되는 컨테이너의 짧은 이미지 이름으로 자동 설정됩니다.

[에이전트를 재시작합니다][2].


[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

#### 로그 수집


Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "journald", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}


#### 고급 기능

##### 저널 변경 위치

기본적으로 에이전트는 다음 위치에서 저널을 찾습니다.

- `/var/log/journal`
- `/run/log/journal`

저널이 다른 곳에 있는 경우 해당 저널 경로와 함께 `path` 파라미터를 추가하세요.

##### 저널 단위 필터링

이러한 파라미터를 사용하여 특정 _시스템-수준_ 단위를 필터링할 수 있습니다.

- `include_units`: 지정된 모든 시스템 수준 단위를 포함합니다.
- `exclude_units`: 지정된 모든 시스템 수준 단위를 제외합니다.


예시:

```yaml
logs:
    - type: journald
      path: /var/log/journal/
      include_units:
          - docker.service
          - sshd.service
```

Datadog 에이전트 버전 `7.37.0`+에서 이러한 파라미터를 사용하여 _사용자 수준_ 단위를 필터링할 수 있습니다.

- `include_user_units`: 지정된 모든 사용자 수준 단위를 포함합니다.
- `exclude_user_units`: 지정된 모든 사용자 수준 단위를 제외합니다.

**참고**: 특정 저널 로그를 지정하려면 `exclude_units` 또는 `exclude_user_units`에서 `*` 와일드카드를 사용하세요. `*` 와일드카드는 `include_units`에서 작동하지 않습니다. 기본적으로 시스템이나 사용자 모두에 대한 단위가 없고 일치하는 항목이 정의되지 않은 경우 모든 로그 저널이 수집됩니다.

예시:

```yaml
logs:
    # Collect all system-level unit logs.
    - type: journald
      exclude_user_units:
          - '*'
```

##### 저널 메시지 필터링

Datadog 에이전트 버전 `7.39.0`+에서, 이러한 파라미터와 함께 키-값 쌍을 사용하여 임의의 메시지를 필터링할 수 있습니다.

- `include_matches`: 일치하는 메시지 포함 `key=value`
- `exclude_matches`: 일치하는 메시지 제외 `key=value`


예시:

```yaml
logs:
    - type: journald
      path: /var/log/journal/
      include_matches:
          - _TRANSPORT=kernel
```

##### 동일한 저널 여러 시간 테일링

각기 다른 소스 또는 서비스 태그를 포함하는 유닛을 보고하려면 별도의 journald 설정에 표시되어야 합니다.

이렇게 하려면 `config_id`(에이전트 `7.41.0`+에서 사용 가능)로 저널 구성을 고유하게 식별해야 합니다.

```yaml
logs:
    - type: journald
      config_id: my-app1
      source: my-app1
      service: my-app1
      include_units:
          - my-app1.service

    - type: journald
      config_id: my-app2
      source: my-app2
      service: my-app2
      include_units:
          - my-app2.service
```

##### 컨테이너 태그 수집

태그는 매우 동적인 컨테이너화된 환경에서 정보를 찾는 데 중요하므로 에이전트는 저널 로그에서 컨테이너 태그를 수집할 수 있습니다.

호스트에서 에이전트를 실행하는 경우 자동으로 작동합니다. Datadog의 컨테이너화된 버전을 사용하는 경우 에이전트, 저널 경로와 다음 파일을 마운트합니다.

- `/etc/machine-id`: 이렇게 하면 에이전트에서 호스트에 저장된 저널을 쿼리로 전송할 수 있습니다.

### 검증

에이전트의 [상태 하위 명령][3]을 실행하고 로그 에이전트 섹션 아래에서 `journald`를 찾습니다.

## 수집한 데이터

### 메트릭

journald에는 메트릭에 포함되지 않습니다.

### 서비스 점검

journald에는 서비스 점검이 포함되지 않습니다.

### 이벤트

journald에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.


[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/help/