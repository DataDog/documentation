---
app_id: harbor
categories:
- 컨테이너
- 로그 수집
custom_kind: 통합
description: Harbor 컨테이너 레지스트리 상태 모니터링
integration_version: 6.0.0
media: []
supported_os:
- linux
- macos
- 윈도우즈(Windows)
title: Harbor
---
## 개요

본 점검은 Datadog Agent를 통해 [Harbor](https://goharbor.io)를 모니터링합니다.

## 설정

### 설치

Harbor 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있어 서버에 추가로 설치할 필요가 없습니다.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. Harbor 성능 데이터 수집을 시작하려면 [Agent 설정 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/)의 루트에 있는 `conf.d/` 폴더에서 `harbor.d/conf.yaml` 파일을 편집합니다. 모든 가용 설정 옵션을 보려면 [샘플 harbor.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/conf.yaml.example)을 참조하세요.

   **참고**: 설정에서 모든 유형의 사용자를 지정할 수 있지만 디스크 메트릭을 가져오려면 관리자 권한이 있는 계정이 필요합니다. `harbor.projects.count` 메트릭은 지정된 사용자가 액세스할 수 있는 프로젝트 수만 반영합니다.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

1. `harbor.d/conf.yaml` 파일에 이 설정 블록을 추가하여 Harbor 로그 수집을 시작하세요.

   ```yaml
     logs:
       - type: file
         path: /var/log/harbor/*.log
         source: harbor
         service: '<SERVICE_NAME>'
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `harbor`                                                                              |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                         |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%", "username": "<USER_ID>", "password": "<USER_PASSWORD>"}` |

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "harbor", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `harbor`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **harbor.disk.free** <br>(게이지) | 사용 가능한 스토리지 공간의 양.<br>Byte로 표시됨 |
| **harbor.disk.total** <br>(게이지) | 총 스토리지 공간의 양.<br>Byte로 표시됨 |
| **harbor.projects.count** <br>(게이지) | 총 프로젝트의 수.|
| **harbor.registry.read_only** <br>(게이지) | 레지스트리의 '읽기 전용' 상태.|

### 이벤트

Harbor 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

**harbor.can_connect**

Harbor API에 연결할 수 있고 인증에 성공하면 `OK`를, 그렇지 않으면 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**harbor.status**

지정된 Harbor 컴포넌트가 정상이면 `OK`를 , 그렇지 않으면 `CRITICAL`을 반환합니다. Harbor \< 1.5면 `UNKNOWN`을 반환합니다.

_상태: ok, unknown, critical_

**harbor.registry.status**

서비스가 정상인 경우 `OK`를, 그렇지 않으면 `CRITICAL`을 반환합니다. Harbor가 복제에 사용하는 외부 레지스트리 상태를 모니터링합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.