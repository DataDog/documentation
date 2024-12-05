---
aliases:
- /ko/integrations/system_swap/
- /ko/integrations/system_core/
categories:
- os & system
- configuration & deployment
ddtype: 점검
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/system.md
description: '시스템 리소스 사용량 추적: CPU, 메모리, 디스크, 파일 시스템 등.'
git_integration_title: 시스템
integration_id: 시스템
integration_title: 시스템 점검
is_public: true
custom_kind: integration
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

기본 시스템에서 CPU, IO, 로드, 메모리, 스왑 및 가동 시간에 관한 메트릭을 확인해 보세요. 다음은 시스템과 연관된 점검 사항입니다:

- [디렉토리 점검][1] - 지정 디렉토리에 있는 파일의 메트릭을 캡처합니다.
- [디스크 점검][2] - 디스크 메트릭을 캡처합니다.
- [프로세스 점검][3] - 시스템에서 실행 중인 특정 프로세스의 메트릭을 캡처합니다.

## 구성

### 설치

시스템 점검은 [Datadog 에이전트][4] 패키지에 포함됩니다. 서버에 추가 설치할 필요가 없습니다.

## 수집한 데이터

### 메트릭

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.proc. system.swap system.uptime" >}}

### 이벤트

시스템 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검

시스템 점검에는 서비스 점검이 포함되지 않습니다.

### 태그

모든 시스템 메트릭에는 `host:<HOST_NAME>` 태그가 자동 지정됩니다. 아울러, 다음 네임스페이스에는 `device:<DEVICE_NAME>` 태그가 지정됩니다.

- `system.disk.*`
- `system.fs.inodes.*`
- `system.io.*`
- `system.net.*`

## 시스템 코어

본 점검으로 호스트의 CPU 코어 수와 시스템, 사용자, idle(유휴) 등의 CPU 시간을 수집합니다.

### 구성

#### 설치

시스템 코어 점검은 [Datadog 에이전트][4] 패키지에 포함됩니다. 서버에 추가 설치할 필요가 없습니다.

#### 설정

1. [에이전트 설정 디렉토리][5] 루트에 있는 `conf.d/` 폴더에서 `system_core.d/conf.yaml` 파일을 편집합니다. 사용할 수 있는 설정 옵션 전체를 확인하려면 [system_core.d/conf.yaml 샘플][6]을 참고하세요. **알림**: 점검을 실행하려면 다음의 `instances` 엔티티가 최소 하나 이상 필요합니다:

    ```yaml
    init_config:
    instances:
        - foo: bar
        tags:
            - key:value
    ```

2. [에이전트 다시 시작][7].

#### 검증

[에이전트 상태 하위 명령을 실행][4]하고 점검 섹션에서 `system_core`를 찾습니다.

### 수집한 데이터

#### 메트릭

{{< get-metrics-from-git "system_core" >}}

플랫폼에 따라 점검 작업 시 다른 CPU 시간 메트릭을 수집할 수도 있습니다(윈도우즈(Windows)의 경우 `system.core.interrupt`, Linux의 경우 `system.core.iowait` 등).

#### 이벤트

시스템 코어 점검에는 이벤트가 포함되지 않습니다.

#### 서비스 점검

{{< get-service-checks-from-git "system_core" >}}

## 시스템 스왑

본 점검으로 호스팅 시 스왑된 바이트 수를 모니터링합니다.

### 구성

#### 설치

시스템 스왑 점검은 [Datadog 에이전트][4] 패키지에 포함됩니다. 서버에 추가 설치할 필요가 없습니다.

#### 설정

1. [에이전트 설정 디렉토리][5] 루트에 있는 `conf.d/` 폴더에서 `system_swap.d/conf.yaml` 파일을 편집합니다. 사용할 수 있는 설정 옵션 전체를 확인하려면 [system_swap.d/conf.yaml 샘플][8]을 참고하세요. **알림**: 본 점검 시 초기 설정이 필요하지 않습니다.

2. [에이전트 다시 시작][7].

#### 검증

[에이전트 상태 하위 명령을 실행][4]하고 점검 섹션에서 `system_swap`를 찾습니다.

### 수집한 데이터

#### 메트릭

{{< get-metrics-from-git "system_swap" >}}

#### 이벤트

시스템 스왑 점검에는 이벤트가 포함되지 않습니다.

#### 서비스 점검

시스템 스왑 점검에는 서비스 점검이 포함되지 않습니다.

[1]: /ko/integrations/directory/
[2]: /ko/integrations/disk/
[3]: /ko/integrations/process/
[4]: /ko/agent/guide/agent-commands/#agent-status-and-information
[5]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/system_core/datadog_checks/system_core/data/conf.yaml.example
[7]: /ko/agent/guide/agent-commands/#start-stop-restart-the-agent
[8]: https://github.com/DataDog/integrations-core/blob/master/system_swap/datadog_checks/system_swap/data/conf.yaml.example