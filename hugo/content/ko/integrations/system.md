---
aliases:
- /ko/integrations/system_swap/
- /ko/integrations/system_core/
categories:
- os & system
- configuration & deployment
custom_kind: 통합
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/system.md
description: '시스템 리소스 사용량 추적: CPU, 메모리, 디스크, 파일 시스템 등.'
git_integration_title: 시스템
integration_id: 시스템
integration_title: 시스템 점검
is_public: true
name: 시스템
newhlevel: true
public_title: Datadog-시스템 통합
short_description: '시스템 리소스 사용량 추적: CPU, 메모리, 디스크, 파일 시스템 등.'
supported_os:
- linux
- mac_os
- windows
updated_for_agent: 5.8.5
---

## 개요

기본 시스템에서 CPU, IO, 로드, 메모리, 스왑, 가동 시간에 관한 메트릭을 받으세요. 다음 점검 또한 시스템 관련입니다.

- [디렉터리 점검][1] - 지정된 디렉터리에서 메트릭을 캡처합니다.
- [디스크 점검][2] - 디스크 메트릭 캡처
- [프로세스 점검][3] - 시스템에서 실행 중인 특정 프로세스 메트릭 캡처

## 설정

### 설치

[Datadog 에이전트][4] 패키지에 시스템 점검이 포함되어 있어 서버에 추가 설치가 필요 없습니다.

## 수집된 데이터

### 메트릭

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.proc. system.swap system.uptime" >}}

### 이벤트

시스템 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

시스템 점검에는 서비스 점검이 포함되어 있지 않습니다.

### 태그

모든 시스템 메트릭은 `host:<HOST_NAME>`으로 자동 태깅됩니다. 또한 다음 네임스페이스가 `device:<DEVICE_NAME>`으로 태깅됩니다.

- `system.disk.*`
- `system.fs.inodes.*`
- `system.io.*`
- `system.net.*`

## 시스템 코어

이 점검은 시스템, 사용자, 유휴 등과 같이 호스트와 CPU 시간의 CPU 코어 수치를 수집합니다.

### 설정

#### 설치

시스템 코어 점검에는 [Datadog 에이전트][4] 패키지가 포함되어 있어 서버에 추가 설치가 필요 없습니다.

#### 구성

1. [에이전트 구성 디렉터리][5]의 `conf.d/` 폴더에 `system_core.d/conf.yaml` 파일을 편집합니다. 사용할 수 있는 구성 옵션 전체를 보려면 [샘플 system_core.d/conf.yaml][6]를 참고하세요. **참고**: 점검을 활성화 하려면 `instances`아래 최소 하나의 항목이 필요합니다. 다음 예를 참고하세요.

    ```yaml
    init_config:
    instances:
        - foo: bar
        tags:
            - key:value
    ```

2. [ Agent를 다시 시작][7]합니다.

#### 검증

[에이전트 상태 하위 명령을 실행][4]하고 점검 섹션 아래에서 `system_core`를 찾습니다.

### 수집된 데이터

#### 메트릭

{{< get-metrics-from-git "system_core" >}}

플랫폼에 따라 점검에서 CPU 시간 메트릭 외 Windows `system.core.interrupt`와 Linux `system.core.iowait` 등과 같은 다른 메트릭을 수집할 수 있습니다.

#### 이벤트

시스템 코어 점검에는 이벤트가 포함되지 않습니다.

#### 서비스 검사

{{< get-service-checks-from-git "system_core" >}}

## 시스템 스왑

이 점검에서는 호스트 내외부에서 스왑된 바이트 수치를 모니터링합니다.

### 설정

#### 설치

시스템 스왑 점검은 [Datadog 에이전트][4] 패키지에 포함되어 있어 서버에 추가 설치가 필요 없습니다.

#### 구성

1. [에이전트 구성 디렉터리][5] 루트에 있는 `conf.d/` 폴더의 `system_swap.d/conf.yaml` 파일을 편집합니다. 사용할 수 있는 모든 옵션을 보려면 [샘플 system_swap.d/conf.yaml][8]을 참고하세요. **참고**: 이 점검에는 초기 구성이 필요 없습니다.

2. [ Agent를 다시 시작][7]합니다.

#### 검증

[에이전트의 상태 하위 명령을 실행][4]하고 점검 섹션 아래에서 `system_swap`을 찾습니다.

### 수집된 데이터

#### 메트릭

{{< get-metrics-from-git "system_swap" >}}

#### 이벤트

시스템 스왑 점검에는 이벤트가 포함되어 있지 않습니다.

#### 서비스 검사

시스템 스왑 점검에는 서비스 점검이 포함되지 않습니다.

[1]: /ko/integrations/directory/
[2]: /ko/integrations/disk/
[3]: /ko/integrations/process/
[4]: /ko/agent/guide/agent-commands/#agent-status-and-information
[5]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/system_core/datadog_checks/system_core/data/conf.yaml.example
[7]: /ko/agent/guide/agent-commands/#start-stop-restart-the-agent
[8]: https://github.com/DataDog/integrations-core/blob/master/system_swap/datadog_checks/system_swap/data/conf.yaml.example