---
aliases:
- /ko/integrations/hdfs_namenode
app_id: hdfs-namenode
categories:
- 로그 수집
- OS & 시스템
custom_kind: 통합
description: 클러스터 디스크 사용량, 볼륨 오류, 작동하지 않는 DataNode 등을 추적하세요.
further_reading:
- link: https://www.datadoghq.com/blog/hadoop-architecture-overview
  tag: 블로그
  text: Hadoop 아키텍처 개요
- link: https://www.datadoghq.com/blog/monitor-hadoop-metrics
  tag: 블로그
  text: Hadoop 메트릭 모니터링 방법
- link: https://www.datadoghq.com/blog/collecting-hadoop-metrics
  tag: 블로그
  text: Hadoop 메트릭 수집 방법
- link: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
  tag: 블로그
  text: Datadog으로 Hadoop을 모니터링하는 방법
integration_version: 7.0.0
media: []
supported_os:
- linux
- macos
title: HDFS Namenode
---
![HDFS 대시보드](https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_namenode/images/hadoop_dashboard.png)

## 개요

기본 및 대기 HDFS NameNode를 모니터링하여 클러스터가 불안정한 상태일 때, 즉 네임노드가 하나만 남았을 때나 클러스터에 용량을 더 추가해야 할 때를 파악할 수 있습니다. 본 Agent 점검은 남은 용량, 손상/누락된 블록, 데드 DataNode, 파일 시스템 부하, 복제 부족 블록, 총 볼륨 장애(모든 DataNode에서) 등에 대한 메트릭을 수집합니다.

기존 일체형 점검(hdfs)이 아닌 본 점검(hdfs_namenode)과 그에 대응하는 점검(hdfs_datanode)을 사용하세요. 기존 점검은 지원 중단되었습니다.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

HDFS NameNode 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest)  패키지에 포함되어 있어 NameNode에 추가로 설치할 필요가 없습니다.

### 설정

#### 에이전트 연결

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. [Agent 설정 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory)의 루트에 있는 `conf.d/` 폴더에서 `hdfs_namenode.d/conf.yaml` 파일을 편집합니다. 모든 가용 설정 옵션을 보려면 [샘플 hdfs_namenode.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/datadog_checks/hdfs_namenode/data/conf.yaml.example)을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param hdfs_namenode_jmx_uri - string - required
     ## The HDFS NameNode check retrieves metrics from the HDFS NameNode's JMX
     ## interface via HTTP(S) (not a JMX remote connection). This check must be installed on
     ## a HDFS NameNode. The HDFS NameNode JMX URI is composed of the NameNode's hostname and port.
     ##
     ## The hostname and port can be found in the hdfs-site.xml conf file under
     ## the property dfs.namenode.http-address
     ## https://hadoop.apache.org/docs/r3.1.3/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_namenode_jmx_uri: http://localhost:9870
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `hdfs_namenode`                                      |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"hdfs_namenode_jmx_uri": "https://%%host%%:9870"}` |

#### 로그 수집

**Agent >6.0에서 사용 가능**

1. 로그 수집은 Datadog Agent에서 기본적으로 비활성화되어 있습니다. 다음을 사용하여 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
     logs_enabled: true
   ```

1. 이 설정 블록을 `hdfs_namenode.d/conf.yaml` 파일에 추가하여 NameNode 로그 수집을 시작하세요.

   ```yaml
     logs:
       - type: file
         path: /var/log/hadoop-hdfs/*.log
         source: hdfs_namenode
         service: <SERVICE_NAME>
   ```

   `path`와 `service` 파라미터 값을 변경하고 환경에 맞게 구성합니다.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `hdfs_namenode`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **hdfs.namenode.blocks_total** <br>(게이지) | 총 블록 수<br>_block으로 표시됨_ |
| **hdfs.namenode.capacity_remaining** <br>(게이지) | 남은 디스크 공간(바이트)<br>_byte로 표시됨_ |
| **hdfs.namenode.capacity_total** <br>(게이지) | 총 디스크 용량(바이트)<br>_byte로 표시됨_ |
| **hdfs.namenode.capacity_used** <br>(게이지) | 디스크 사용량(바이트)<br>_byte로 표시됨_ |
| **hdfs.namenode.corrupt_blocks** <br>(게이지) | 손상된 블록 수<br>_block으로 표시됨_ |
| **hdfs.namenode.estimated_capacity_lost_total** <br>(게이지) | 추정 손실 용량(바이트)<br>_byte로 표시됨_ |
| **hdfs.namenode.files_total** <br>(게이지) | 총 파일 수<br>_file로 표시됨_ |
| **hdfs.namenode.fs_lock_queue_length** <br>(게이지) | 잠금 대기열 길이|
| **hdfs.namenode.max_objects** <br>(게이지) | HDFS가 지원하는 최대 파일 수<br>_object로 표시됨_ |
| **hdfs.namenode.missing_blocks** <br>(게이지) | 누락된 블록 수<br>_block으로 표시됨_ |
| **hdfs.namenode.num_dead_data_nodes** <br>(게이지) | 데드 데이터 노드의 총 개수<br>_node로 표시됨_ |
| **hdfs.namenode.num_decom_dead_data_nodes** <br>(게이지) | 폐기되는 데드 데이터 노드 수<br>_node로 표시됨_ |
| **hdfs.namenode.num_decom_live_data_nodes** <br>(게이지) | 폐기되는 라이브 데이터 노드 수<br>_node로 표시됨_ |
| **hdfs.namenode.num_decommissioning_data_nodes** <br>(게이지) | 폐기되는 데이터 노드 수<br>_node로 표시됨_ |
| **hdfs.namenode.num_live_data_nodes** <br>(게이지) | 라이브 데이터 노드의 총 개수<br>_node로 표시됨_ |
| **hdfs.namenode.num_stale_data_nodes** <br>(게이지) | 오래된 데이터 노드 수<br>_node로 표시됨_ |
| **hdfs.namenode.num_stale_storages** <br>(게이지) | 오래된 저장소 수|
| **hdfs.namenode.pending_deletion_blocks** <br>(게이지) | 보류 중인 삭제 블록 수<br>_block으로 표시됨_ |
| **hdfs.namenode.pending_replication_blocks** <br>(게이지) | 복제 대기 중인 블록 수<br>_block으로 표시됨_ |
| **hdfs.namenode.scheduled_replication_blocks** <br>(게이지) | 복제 예정인 블록 수<br>_block으로 표시됨_ |
| **hdfs.namenode.total_load** <br>(게이지) | 파일 시스템의 총 부하|
| **hdfs.namenode.under_replicated_blocks** <br>(게이지) | 복제 부족 블록 수<br>_block으로 표시됨_ |
| **hdfs.namenode.volume_failures_total** <br>(게이지) | 총 볼륨 장애|

### 이벤트

HDFS-namenode 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검

**hdfs.namenode.jmx.can_connect**

Agent가 NameNode JMX에 연결할 수 없는 경우 `CRITICAL`을 반환합니다. 연결할 수 있으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [Hadoop 아키텍처 개요](https://www.datadoghq.com/blog/hadoop-architecture-overview)
- [Hadoop 메트릭 모니터링 방법](https://www.datadoghq.com/blog/monitor-hadoop-metrics)
- [Hadoop 메트릭 수집 방법](https://www.datadoghq.com/blog/collecting-hadoop-metrics)
- [Datadog으로 Hadoop을 모니터링하는 방법](https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog)