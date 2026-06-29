---
app_id: glusterfs
categories:
- 데이터 스토어
- 로그 수집
custom_kind: 통합
description: GlusterFS 클러스터 노드, 볼륨, 브릭 상태 메트릭을 모니터링합니다.
integration_version: 3.0.2
media: []
supported_os:
- 리눅스
title: Red Hat Gluster 스토리지
---
## 개요

본 점검은 Datadog Agent로 [Red Hat Gluster 스토리지](https://www.redhat.com/en/technologies/storage/gluster) 클러스터 서비스 상태, 볼륨, 브릭 상태를 모니터링합니다. 
본 GlusterFS 통합은 Red Hat 벤더 및 오픈 소스 버전과 모두 호환됩니다.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

GlusterFS 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다.
서버에 추가로 설치할 필요가 없습니다.

### 설정

1. Agent의 구성 디렉터리 루트에서 `conf.d/` 폴더의 `glusterfs.d/conf.yaml` 파일을 편집해 GlusterFS 성능 데이터 수집을 시작할 수 있습니다. 모든 가용 구성 옵션을 보려면 [glusterfs.d/conf.yaml 샘플](https://github.com/DataDog/integrations-core/blob/master/glusterfs/datadog_checks/glusterfs/data/conf.yaml.example)을 참조하세요.

   ```yaml
   init_config:

    ## @param gstatus_path - string - optional - default: /opt/datadog-agent/embedded/sbin/gstatus
    ## Path to the gstatus command.
    ##
    ## A version of the gstatus is shipped with the Agent binary.
    ## If you are using a source install, specify the location of gstatus.
    #
    # gstatus_path: /opt/datadog-agent/embedded/sbin/gstatus

    instances:
      -
        ## @param min_collection_interval - number - optional - default: 60
        ## The GlusterFS integration collects cluster-wide metrics which can put additional workload on the server.
        ## Increase the collection interval to reduce the frequency.
        ##
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        #
        min_collection_interval: 60
   ```

   **참고**: 기본값으로 [`gstatus`](https://github.com/gluster/gstatus#install)는 `gluster` 명령을 내부 호출하며, 해당 명령은 superuser로 실행해야 합니다. `sudoers` 파일에 다음 줄을 추가합니다.

   ```text
    dd-agent ALL=(ALL) NOPASSWD:/path/to/your/gstatus
   ```

   GlusterFS 환경에 루트가 필요하지 않은 경우 `use_sudo` 설정 옵션을 `false`로 설정합니다.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. `glusterfs.d/conf.yaml` 파일에서 다음 설정 블록을 편집하여 GlusterFS 로그 수집을 시작합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/glusterfs/glusterd.log
       source: glusterfs
     - type: file
       path: /var/log/glusterfs/cli.log
       source: glusterfs
   ```

환경에 맞게 `path` 파라미터 값을 변경합니다. 모든 가용 구성 옵션은 [샘플 conf.yaml](https://github.com/DataDog/integrations-core/blob/master/glusterfs/datadog_checks/glusterfs/data/conf.yaml.example)을 참조하세요.

3. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

Kubernetes 환경에서 로그 수집 Agent를 설정하는 방법에 대한 자세한 내용을 확인하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참조하세요.

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `glusterfs`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **glusterfs.brick.block_size** <br>(게이지) | 브릭의 블록 크기<br>_byte로 표시됨_ |
| **glusterfs.brick.inodes.free** <br>(게이지) | 브릭의 사용 가능한 아이노드<br>_byte로 표시됨_ |
| **glusterfs.brick.inodes.total** <br>(게이지) | 브릭의 총 아이노드<br>_byte로 표시됨_ |
| **glusterfs.brick.inodes.used** <br>(게이지) | 브릭에서 사용된 아이노드<br>_byte로 표시됨_ |
| **glusterfs.brick.online** <br>(게이지) | 온라인 브릭 개수<br>_unit으로 표시됨_ |
| **glusterfs.brick.size.free** <br>(게이지) | 사용 가능한 브릭 크기<br>_byte로 표시됨_ |
| **glusterfs.brick.size.total** <br>(게이지) | 브릭의 총 크기<br>_byte로 표시됨_ |
| **glusterfs.brick.size.used** <br>(게이지) | 브릭에서 사용된 현재 바이트<br>_byte로 표시됨_ |
| **glusterfs.cluster.nodes.active** <br>(게이지) | 현재 활성 노드<br>_node로 표시됨_ |
| **glusterfs.cluster.nodes.count** <br>(게이지) | 클러스터의 총 노드 수<br>_node로 표시됨_ |
| **glusterfs.cluster.volumes.count** <br>(게이지) | 클러스터의 볼륨 수<br>_unit으로 표시됨_ |
| **glusterfs.cluster.volumes.started** <br>(게이지) | 클러스터에서 시작된 볼륨 수<br>_unit으로 표시됨_ |
| **glusterfs.subvol.disperse** <br>(게이지) | 하위 볼륨의 분산 개수<br>_unit으로 표시됨_ |
| **glusterfs.subvol.disperse_redundancy** <br>(게이지) | 하위 볼륨의 분산 중복<br>_unit으로 표시됨_ |
| **glusterfs.subvol.replica** <br>(게이지) | 하위 볼륨의 복제본<br>_unit으로 표시됨_ |
| **glusterfs.volume.bricks.count** <br>(게이지) | 볼륨의 브릭 개수<br>_unit으로 표시됨_ |
| **glusterfs.volume.disperse** <br>(게이지) | 볼륨에 분산된 개수<br>_unit으로 표시됨_ |
| **glusterfs.volume.disperse_redundancy** <br>(게이지) | 볼륨의 분산 중복 수<br>_unit으로 표시됨_ |
| **glusterfs.volume.distribute** <br>(게이지) | 분산된 개수<br>_unit으로 표시됨_ |
| **glusterfs.volume.inodes.free** <br>(게이지) | 볼륨 내 여유 아이노드<br>_byte로 표시됨_ |
| **glusterfs.volume.inodes.total** <br>(게이지) | 볼륨의 아이노드 총 크기<br>_byte로 표시됨_ |
| **glusterfs.volume.inodes.used** <br>(게이지) | 볼륨 내 사용된 아이노드 바이트<br>_byte로 표시됨_ |
| **glusterfs.volume.online** <br>(게이지) | 온라인 볼륨 수<br>_unit으로 표시됨_ |
| **glusterfs.volume.replica** <br>(게이지) | 볼륨의 복제본<br>_unit으로 표시됨_ |
| **glusterfs.volume.size.free** <br>(게이지) | 볼륨 내 여유 바이트<br>_byte로 표시됨_ |
| **glusterfs.volume.size.total** <br>(게이지) | 볼륨의 총 바이트<br>_byte로 표시됨_ |
| **glusterfs.volume.size.used** <br>(게이지) | 볼륨 내 사용된 바이트<br>_byte로 표시됨_ |
| **glusterfs.volume.snapshot.count** <br>(게이지) | 볼륨의 스냅샷 개수<br>_unit으로 표시됨_ |
| **glusterfs.volume.used.percent** <br>(게이지) | 사용된 볼륨의 백분율<br>_percent로 표시_ |

### 이벤트

GlusterFS는 이벤트를 포함하지 않습니다.

### 서비스 점검

**glusterfs.brick.health**

하위 볼륨이 'degraded'면 `CRITICAL`을 반환합니다. 'up'이면 `OK`를 반환합니다.

_상태: ok, critical, warning_

**glusterfs.volume.health**

볼륨이 'degraded'면 `CRITICAL`을 반환합니다. 'up'이면 `OK`를 반환합니다.

_상태: ok, critical, warning_

**glusterfs.cluster.health**

볼륨이 'degraded'면 `CRITICAL`을 반환합니다. 'up'이면 `OK`를 반환합니다.

_상태: ok, critical, warning_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.