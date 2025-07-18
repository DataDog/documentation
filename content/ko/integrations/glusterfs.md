---
app_id: glusterfs
app_uuid: 3c3562fb-8dce-4265-a8de-eacaa30974e1
assets:
  dashboards:
    Red Hat Gluster Storage: assets/dashboards/red_hat_gluster_storage.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: glusterfs.cluster.nodes.count
      metadata_path: metadata.csv
      prefix: glusterfs.
    process_signatures:
    - glusterd
    - gluster
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10145
    source_type_name: GlusterFS
  monitors:
    Number of offline bricks is high: assets/monitors/brick_status.json
  saved_views:
    glusterfs_processes: assets/saved_views/glusterfs_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 스토어
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/glusterfs/README.md
display_on_public_website: true
draft: false
git_integration_title: glusterfs
integration_id: glusterfs
integration_title: Red Hat Gluster 스토리지
integration_version: 3.0.1
is_public: true
manifest_version: 2.0.0
name: glusterfs
public_title: Red Hat Gluster 스토리지
short_description: GlusterFS 클러스터 노드, 볼륨, 브릭 상태 메트릭을 모니터링합니다.
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: GlusterFS 클러스터 노드, 볼륨 및 브릭 상태 메트릭을 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Red Hat Gluster 스토리지
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 Datadog Agent로 [Red Hat Gluster 스토리지][1] 클러스터 서비스 상태, 볼륨, 브릭 상태를 모니터링합니다. 
본 GlusterFS 통합은 Red Hat 벤더 및 오픈 소스 버전과 모두 호환됩니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 Agent에 대해 이 점검을 설치 및 설정하세요. 컨테이너화된 환경의 경우, 이러한 지침을 적용하는 데 가이드가 필요하다면 [자동탐지 통합 템플릿][2]을 참조하세요.

### 설치

GlusterFS 점검은 [Datadog Agent][3] 패키지에 포함됩니다. 
서버에 추가 설치할 필요가 없습니다.

### 설정

1. Agent 설정 디렉터리 루트의 `conf.d/` 폴더에서 `glusterfs.d/conf.yaml` 파일을 편집해 GlusterFS 성능 데이터 수집을 시작합니다. 사용할 수 있는 설정 옵션을 모두 보려면 [glusterfs.d/conf.yaml 샘플][4]을 참고하세요.

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

   **참고**: 기본값으로 [`gstatus`][5]는 `gluster` 명령을 내부 호출하며, 해당 명령은 superuser로 실행해야 합니다. `sudoers` 파일에 다음 줄을 추가합니다.

   ```text
    dd-agent ALL=(ALL) NOPASSWD:/path/to/your/gstatus
   ```

   GlusterFS 환경에 루트가 필요하지 않은 경우 `use_sudo` 설정 옵션을 `false`로 설정합니다.

2. [Agent를 재시작합니다][6].

#### 로그 수집


1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

    ```yaml
    logs_enabled: true
    ```

2. `glusterfs.d/conf.yaml` 파일에서 다음 설정 블록을 편집하여 GlusterFS 로그 수집을 시작합니다.

    ```yaml
    logs:
      - type: file
        path: /var/log/glusterfs/glusterd.log
        source: glusterfs
      - type: file
        path: /var/log/glusterfs/cli.log
        source: glusterfs
    ```

  환경에 따라 `path` 파라미터 값을 변경합니다. 사용 가능한 모든 설정 옵션은 [conf.yaml 샘플][4]을 참조하세요.

  3. [Agent를 재시작합니다][6].

Kubernetes 환경에서 로그 수집 Agent를 설정하는 방법에 대한 자세한 내용을 확인하려면 [Kubernetes 로그 수집][7]을 참조하세요.

### 검증

[Agent 상태 하위 명령을 실행][8]하고 점검 섹션에서 `glusterfs`를 검색합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "glusterfs" >}}


### 이벤트

GlusterFS는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "glusterfs" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://www.redhat.com/en/technologies/storage/gluster
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/datadog_checks/glusterfs/data/conf.yaml.example
[5]: https://github.com/gluster/gstatus#install
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/