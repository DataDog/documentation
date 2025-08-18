---
app_id: oom-kill
app_uuid: 7546b270-2efe-4a59-8f94-3447df2db801
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: oom_kill.oom_process.count
      metadata_path: metadata.csv
      prefix: oom_kill.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10293
    source_type_name: OOM Kill
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- OS & 시스템
- 이벤트 관리
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oom_kill/README.md
display_on_public_website: true
draft: false
git_integration_title: oom_kill
integration_id: oom-kill
integration_title: OOM Kill
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oom_kill
public_title: OOM Kill
short_description: 시스템 또는 cgroup별로 프로세스 OOM kill을 추적합니다.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS & System
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Setup
  description: 시스템 또는 cgroup별로 프로세스 OOM kill을 추적합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OOM Kill
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 Datadog 에이전트 및 시스템 프로브를 통해 커널 OOM(메모리 부족) 킬 프로세스를 모니터링합니다.

## 설정

### 설치

OOM Kill 점검은 [Datadog 에이전트][1] 패키지에 포함되어 있습니다. 이 프로그램은 시스템 프로브에 구현된 eBPF 프로그램에 기반합니다.

시스템 프로브에서 사용하는 eBPF 프로그램은 런타임에 컴파일되며 적절한 커널 헤더에 액세스할 수 있어야 합니다.

데비안(Debian) 유사 배포에서 다음으로 커널 헤더를 설치합니다.
```sh
apt install -y linux-headers-$(uname -r)
```

RHEL 유사 배포에서 다음으로 커널 헤더를 설치합니다.
```sh
yum install -y kernel-headers-$(uname -r)
yum install -y kernel-devel-$(uname -r)
```

**참고**: OOM Kill 점검이 제대로 동작하려면 커널 버전 4.9 이상이 필요합니다.
또한, 윈도우즈(Windows) 및 CentOS/RHEL 8 이전 버전은 지원되지 않습니다.

### 설정

1. 에이전트의 설정 디렉토리 루트에 있는 `system-probe.yaml` 파일에 다음 설정을 추가합니다.

    ```yaml
    system_probe_config:
        enable_oom_kill: true
    ```

2. OOM Kill 메트릭 수집을 시작하려면 에이전트의 설정 디렉토리 루트의 `conf.d/` 폴더에 `oom_kill.d/conf.yaml` 파일이 있는지 확인합니다. 사용 가능한 모든 설정 옵션은 [oom_kill.d/conf.yaml 샘플][2]을 참조하세요.

3. [에이전트를 다시 시작합니다][3].

### 도커(Docker)로 설정하기

위의 설명대로 `system-probe.yaml` 및 `oom_kill.d/conf.yaml` 마운트 이외에도 다음 설정을 수행합니다.

1. 다음 볼륨을 에이전트 컨테이너에 마운트합니다.

    ```
    -v /sys/kernel/debug:/sys/kernel/debug
    -v /lib/modules:/lib/modules
    -v /usr/src:/usr/src
    ```

2. BPF 작업을 활성화하려면 다음 권한을 추가합니다.

    ```
    --privileged
    ```

    커널 버전 5.8부터는 `--privileged` 파라미터를`--cap-add CAP_BPF`로 대체할 수 있습니다.

**참고**: 도커(Docker) 스웜은 `--privileged` 모드가 지원되지 않습니다.


### Helm으로 설정하기

[Datadog Helm 차트][4]로 `datadog.systemProbe` 및 `datadog.systemProbe.enableOOMKill` 파라미터가 `values.yaml` 파일에서 활성화되어 있는지 확인합니다.

### Operator(v1.0.0 이상)로 설정하기

DatadogAgent 매니페스트에서 다음과 같이 `features.oomKill.enabled` 파라미터를 설정합니다.
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    oomKill:
      enabled: true
```

**참고**: COS(컨테이너에 최적화된 OS)를 사용하는 경우 다음과 같이 노드 에이전트에서 `src` 볼륨을 오버라이드합니다.
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    oomKill:
      enabled: true
  override:
    nodeAgent:
      volumes:
      - emptyDir: {}
        name: src
```

### 검증

[에이전트 상태 하위 명령을 실행][5]하고 점검 섹션에서 `oom_kill`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "oom-kill" >}}


### 서비스 점검

OOM Kill 점검은 서비스 점검을 포함하지 않습니다.

### 이벤트

OOM Kill 점검은 취소된 프로세스 ID와 이름, 트리거한 프로세스 ID와 이름이 포함된 각 OOM Kill 이벤트를 제출합니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/oom_kill.d/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/helm-charts
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/oom_kill/metadata.csv
[7]: https://docs.datadoghq.com/ko/help/