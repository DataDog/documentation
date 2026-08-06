---
aliases:
- /ko/integrations/octopus_deploy
app_id: octopus-deploy
categories:
- 설정 및 배포
custom_kind: 통합
description: Octopus Deploy 서버를 모니터링합니다.
integration_version: 2.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Octopus Deploy
---
## 개요

본 점검은 Datadog Agent로 [Octopus Deploy](https://octopus.com/) 배포를 모니터링합니다. 환경별 평균 배포 시간 및 프로젝트의 배포 실패율과 같은 정보를 추적합니다.

## 설정

다음 단계에 따라 호스트 기반 Agent에 본 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

Octopus Deploy 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다. 추가 설치가 필요하지 않습니다.

### 설정

1. Octopus 서버에서 [API 키](https://octopus.com/docs/octopus-rest-api/how-to-create-an-api-key)를 생성합니다.

1. Agent 구성 디렉터리 루트의 `conf.d/` 폴더에 있는 `octopus_deploy.d/conf.yaml` 파일을 편집하여 `octopus_deploy` 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 구성](https://github.com/DataDog/integrations-core/blob/master/octopus_deploy/datadog_checks/octopus_deploy/data/conf.yaml.example)을 참조하세요.

   **참고**: `spaces`, `project_groups` 또는 `projects` 섹션 중 **하나**를 구성하여 데이터를 수집하는 프로젝트 수를 제한하세요. 예를 들어, 다음 스니펫은 이름이 'test'로 시작하는 프로젝트는 최대 10개로 수집을 제한합니다.

   ```
   projects:
       limit: 10
       include:
       - 'test.*'
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### 로그

Octopus Deploy 통합은 배포 로그와 서버 로그의 두 가지 유형의 로그를 수집합니다.

##### 배포 로그 수집하기

배포 로그는 배포 작업에서 수집되며, 실패한 배포를 디버깅하는 데 유용합니다. 다음에 따라 배포 로그를 수집하세요.

1. `datadog.yaml`파일에서 로그 수집을 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. `octopus_deploy.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집하세요. 예를 들면 다음과 같습니다.

   ```yaml
   logs:
     - type: integration
       source: octopus_deploy
   ```

##### 서버 로그 수집하기

서버 로그는 Octopus Server 자체의 진단 정보입니다. Datadog Agent가 Octopus 서버와 동일한 머신에서 실행되는 경우에만 수집할 수 있습니다. 다음에 따라 서버 로그를 수집하세요.

1. `datadog.yaml`파일에서 로그 수집을 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. `octopus_deploy.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집하세요. 예를 들면 다음과 같습니다.

   ```yaml
   logs:
     - type: file
       path: /OctopusServer/Server/Logs/OctopusServer.txt
       source: octopus_deploy
   ```

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `octopus_deploy`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **octopus_deploy.api.can_connect** <br>(gauge) | 해당 점검이 Octopus Deploy API에 연결할 수 있는지 여부|
| **octopus_deploy.deployment.completed_time** <br>(gauge) | 배포 시간<br>_second로 표시_ |
| **octopus_deploy.deployment.count** <br>(gauge) | 모니터링되는 배포 수|
| **octopus_deploy.deployment.executing** <br>(gauge) | 배포가 현재 실행 중인지 여부|
| **octopus_deploy.deployment.executing_time** <br>(gauge) | 배포가 실행 중인 시간<br>_second로 표시됨_ |
| **octopus_deploy.deployment.queued** <br>(gauge) | 배포가 현재 대기열에 있는지 여부|
| **octopus_deploy.deployment.queued_time** <br>(gauge) | 배포가 대기열에서 대기한 시간<br>_second로 표시됨_ |
| **octopus_deploy.deployment.waiting** <br>(gauge) | 배포가 대기 상태인지 여부|
| **octopus_deploy.environment.allow_dynamic_infrastructure** <br>(gauge) | 환경이 동적 인프라를 허용하는지 여부|
| **octopus_deploy.environment.count** <br>(gauge) | 검색된 환경 수|
| **octopus_deploy.environment.use_guided_failure** <br>(gauge) | 환경이 유도된 실패 모드인지 여부|
| **octopus_deploy.machine.count** <br>(gauge) | 발견된 머신 수|
| **octopus_deploy.machine.is_healthy** <br>(gauge) | 머신 상태가 정상인지 여부|
| **octopus_deploy.project.count** <br>(gauge) | 검색된 프로젝트 수|
| **octopus_deploy.project_group.count** <br>(gauge) | 검색된 프로젝트 그룹 수|
| **octopus_deploy.server_node.count** <br>(gauge) | 검색된 Octopus 서버 노드 수|
| **octopus_deploy.server_node.in_maintenance_mode** <br>(gauge) | Octopus 서버 노드가 유지 관리 모드인지 여부|
| **octopus_deploy.server_node.max_concurrent_tasks** <br>(gauge) | 지정된 Octopus 서버 노드의 최대 동시 작업 수|
| **octopus_deploy.space.count** <br>(gauge) | 검색된 공간 수|

### 이벤트

Octopus Deploy 통합은 이벤트를 포함하지 않습니다

### 서비스 점검

Octopus Deploy 통합은 서비스 점검을 포함하지 않습니다

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.