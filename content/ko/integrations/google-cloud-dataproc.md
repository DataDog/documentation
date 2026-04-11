---
aliases:
- /ko/integrations/google_cloud_dataproc
app_id: google-cloud-dataproc
categories:
- cloud
- google cloud
- log collection
custom_kind: integration
description: Apache Spark와 Hadoop 클러스터를 비용 효율적으로 운영할 수 있는 관리형 클라우드 서비스.
media: []
title: Google Cloud Dataproc
---
## 개요

<div class="alert alert-info">
<a href="https://docs.datadoghq.com/data_jobs/">Data Jobs Monitoring</a>은 Dataproc 클러스터에서 Spark 작업을 관찰하고, 문제를 해결하며, 비용을 최적화하는 데 도움이 됩니다.
</div>

Google Cloud Dataproc은 빠르고 사용하기 쉬운 완전관리형 클라우드 서비스로, 더욱 간단하고 비용 효율적인 방식으로 Apache Spark 및 Apache Hadoop 클러스터를 실행할 수 있습니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud Dataproc에서 메트릭을 수집합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Dataproc 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Dataproc 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Dataproc 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.dataproc.batch.spark.executors** <br>(gauge) | Batch Spark 실행자의 수를 나타냅니다.<br>_worker로 표시_ |
| **gcp.dataproc.cluster.capacity_deviation** <br>(gauge) | 클러스터에서 예상되는 노드 수와 실제로 활성화된 YARN 노드 관리자 수의 차이.|
| **gcp.dataproc.cluster.hdfs.datanodes** <br>(gauge) | 클러스터 내에서 실행 중인 HDFS DataNode 수를 나타냅니다.<br>_node로 표시_ |
| **gcp.dataproc.cluster.hdfs.storage_capacity** <br>(gauge) | 클러스터에서 실행 중인 HDFS 시스템 용량을 GB로 나타냅니다.<br>_gibibyte로 표시_ |
| **gcp.dataproc.cluster.hdfs.storage_utilization** <br>(gauge) | 현재 사용 중인 HDFS 스토리지의 백분율<br>_ percent로 표시_ |
| **gcp.dataproc.cluster.hdfs.unhealthy_blocks** <br>(gauge) | 클러스터 내부의 비정상적인 블록 수를 나타냅니다.<br>_block으로 표시_ |
| **gcp.dataproc.cluster.job.completion_time.avg** <br>(gauge) | 사용자가 작업을 제출한 시점부터 Dataproc이 완료되었다고 보고하는 시점까지 작업 완료에 걸린 시간.<br>_millisecond로 표시_ |
| **gcp.dataproc.cluster.job.completion_time.samplecount** <br>(count) | 클러스터 작업 완료 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.dataproc.cluster.job.completion_time.sumsqdev** <br>(gauge) | 클러스터 작업 완료 시간 제곱편차 합계<br>_second로 표시_ |
| **gcp.dataproc.cluster.job.duration.avg** <br>(gauge) | 특정 상태에서 작업이 소요한 시간<br>_millisecond로 표시_ |
| **gcp.dataproc.cluster.job.duration.samplecount** <br>(count) | 클러스터 작업 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.dataproc.cluster.job.duration.sumsqdev** <br>(gauge) | 클러스터 작업 시간 제곱편차 합계<br>_second로 표시_ |
| **gcp.dataproc.cluster.job.failed_count** <br>(count) | 클러스터에서 실패한 작업 수를 나타냅니다.<br>_job으로 표시_ |
| **gcp.dataproc.cluster.job.running_count** <br>(gauge) | 클러스터에서 실행 중인 작업 수를 나타냅니다.<br>_job으로 표시_ |
| **gcp.dataproc.cluster.job.submitted_count** <br>(count) | 클러스터에 제출된 작업 수를 나타냅니다.<br>_job으로 표시_ |
| **gcp.dataproc.cluster.mig_instances.failed_count** <br>(count) | 관리형 인스턴스 그룹의 인스턴스 실패 횟수를 나타냅니다.|
| **gcp.dataproc.cluster.nodes.expected** <br>(gauge) | 클러스터에 예상되는 노드 수를 나타냅니다.<br>_node로 표시됨_ |
| **gcp.dataproc.cluster.nodes.failed_count** <br>(count) | 클러스터에서 실패한 노드 수를 나타냅니다.<br>_node로 표시됨_ |
| **gcp.dataproc.cluster.nodes.recovered_count** <br>(count) | 클러스터에서 실패로 감지되어 성공적으로 제거된 노드 수<br>_node로 표시_ |
| **gcp.dataproc.cluster.nodes.running** <br>(gauge) | 실행 상태인 노드 수를 나타냅니다.<br>_node로 표시됨_ |
| **gcp.dataproc.cluster.operation.completion_time.avg** <br>(gauge) | 사용자가 작업을 제출한 시점부터 Dataproc이 완료되었다고 보고할 때까지 작업이 소요한 시간<br>_millisecond로 표시_ |
| **gcp.dataproc.cluster.operation.completion_time.samplecount** <br>(count) | 클러스터 작업 완료 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.dataproc.cluster.operation.completion_time.sumsqdev** <br>(gauge) | 클러스터 작업 완료 시간 제곱편차 합계<br>_second로 표시_ |
| **gcp.dataproc.cluster.operation.duration.avg** <br>(gauge) | 특정 상태에서 작업이 소요한 시간<br>_millisecond로 표시_ |
| **gcp.dataproc.cluster.operation.duration.samplecount** <br>(count) | 클러스터 작업 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.dataproc.cluster.operation.duration.sumsqdev** <br>(gauge) | 클러스터 작업 시간 제곱편차 합계<br>_second로 표시_ |
| **gcp.dataproc.cluster.operation.failed_count** <br>(count) | 클러스터에서 실패한 작업 수를 나타냅니다.<br>_operation으로 표시_ |
| **gcp.dataproc.cluster.operation.running_count** <br>(gauge) | 클러스터에서 실행 중인 작업 수를 나타냅니다.<br>_operation으로 표시_ |
| **gcp.dataproc.cluster.operation.submitted_count** <br>(count) | 클러스터에 제출된 작업 수를 나타냅니다.<br>_operation으로 표시_ |
| **gcp.dataproc.cluster.yarn.allocated_memory_percentage** <br>(gauge) | YARN 메모리 할당 비율<br>_ percent로 표시_ |
| **gcp.dataproc.cluster.yarn.apps** <br>(gauge) | 현재 실행 중인 YARN 애플리케이션 수를 나타냅니다.|
| **gcp.dataproc.cluster.yarn.containers** <br>(gauge) | YARN 컨테이너 수를 나타냅니다.<br>_container로 표시_ |
| **gcp.dataproc.cluster.yarn.memory_size** <br>(gauge) | YARN 메모리 크기(GB)를 나타냅니다.<br>_gibibyte로 표시_ |
| **gcp.dataproc.cluster.yarn.nodemanagers** <br>(gauge) | 클러스터 내에서 실행 중인 YARN NodeManagers 수를 나타냅니다.|
| **gcp.dataproc.cluster.yarn.pending_memory_size** <br>(gauge) | 스케줄러가 처리해야 할 현재 메모리 요청량(GB)<br>_gibibyte로 표시_ |
| **gcp.dataproc.cluster.yarn.virtual_cores** <br>(gauge) | YARN의 가상 코어 수를 나타냅니다.<br>_core로 표시_ |
| **gcp.dataproc.job.state** <br>(gauge) | 해당 작업이 현재 특정 상태에 있는지 여부를 나타냅니다.|
| **gcp.dataproc.job.yarn.memory_seconds** <br>(gauge) | yarn `application_id`별 `job_id` 작업이 소비한 Memory Seconds를 나타냅니다.|
| **gcp.dataproc.job.yarn.vcore_seconds** <br>(gauge) | yarn `application_id`별 `job_id` 작업이 소비한 VCore Seconds를 나타냅니다.|
| **gcp.dataproc.node.problem_count** <br>(count) | 특정 유형의 문제가 발생한 총 횟수.|
| **gcp.dataproc.node.yarn.nodemanager.health** <br>(gauge) | YARN NodeManager 상태.|
| **gcp.dataproc.session.spark.executors** <br>(gauge) | Session Spark 실행자 수를 나타냅니다.<br>_worker로 표시_ |

### 이벤트

Google Cloud Dataproc 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Dataproc 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.