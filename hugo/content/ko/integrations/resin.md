---
app_id: resin
app_uuid: ff99886d-87b7-407a-aa90-7bea5ca27564
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: resin.thread_pool.thread_count
      metadata_path: metadata.csv
      prefix: resin.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10203
    source_type_name: Resin
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: brent@bmontague.com
  support_email: brent@bmontague.com
categories:
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/resin/README.md
display_on_public_website: true
draft: false
git_integration_title: resin
integration_id: resin
integration_title: Resin
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: resin
public_title: Resin
short_description: Resin 내 스레드 풀 및 연결 풀 설정 추적하기
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Resin 내 스레드 풀 및 연결 풀 설정 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Resin
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

본 점검은 Datadog 에이전트를 통해 [Resin][1]을 모니터링합니다.

## 설정

### 설치

[Datadog 에이전트][2] 패키지에는 Resin 점검이 포함되어 있지 않으므로 설치해야 합니다.

### 설정

1. [Resin 기본 서버][3]에 다음 JVM 인수를 추가하여 JMX를 활성화합니다.

```
<server-default>
  <jvm-arg>-Dcom.sun.management.jmxremote</jvm-arg>
  <jvm-arg>-Dcom.sun.management.jmxremote.port=7199</jvm-arg>
</server-default>
```

2. 에이전트 설정 디렉토리 루트에 있는 `conf.d/` 폴더에서 `resin.d/conf.yaml` 파일을 편집하여 Resin 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [resin.d/conf.yaml 샘플][2]을 참조하세요.

3. [에이전트를 재시작합니다][4].

### 검증

[에이전트 상태 하위 명령을 실행][5]하고 점검 섹션에서 `resin`를 찾습니다.

### 로그 수집

Linux 플랫폼의 `/etc/datadog-agent/datadog.yaml`에서 Datadog 에이전트가 로그를 수집할 수 있도록 활성화합니다. 다른 플랫폼의 경우 설정 파일 위치를 보려면 [에이전트 설정 파일 가이드][6]를 확인하세요.

```yaml
logs_enabled: true
```

- `resin.d/conf.yaml` 파일에 이 설정 블록을 활성화하여 로그 수집을 시작하세요.
    ```yaml
    logs:
      - type: file
        path: /var/opt/resin/log/*.log
        source: resin
    ```

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "resin" >}}


### 이벤트

Resin은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "resin" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://caucho.com/
[2]: https://github.com/DataDog/integrations-extras/blob/master/resin/datadog_checks/resin/data/conf.yaml.example
[3]: https://www.caucho.com/resin-4.0/admin/cluster-server.xtp#JVMparameters:settingtheJVMcommandline
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/
[7]: https://github.com/DataDog/integrations-extras/blob/master/resin/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/resin/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/help/