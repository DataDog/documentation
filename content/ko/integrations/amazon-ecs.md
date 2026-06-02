---
aliases:
- /ko/integrations/amazon_ecs
app_id: amazon-ecs
categories:
- 클라우드
- 컨테이너
- aws
- 로그 수집
custom_kind: 통합
description: Docker 컨테이너를 지원하는 확장 가능한 고성능 컨테이너 관리 서비스입니다.
further_reading:
- link: https://www.datadoghq.com/blog/amazon-ecs-metrics
  tag: 블로그
  text: 주요 ECS 메트릭 모니터
- link: https://docs.datadoghq.com/integrations/ecs_fargate
  tag: 설명서
  text: Amazon ECS 문서
media: []
title: Amazon ECS
---
<div class="alert alert-warning">
컨테이너화된 Datadog 에이전트를 ECS 클러스터에 배포하려 하시나요? <a href="https://docs.datadoghq.com/agent/amazon_ecs/"><b>Amazon ECS 에이전트 설명서</b></a>를 참조하세요.
</div>

## 개요

EC2 기반 Amazon ECS는 EC2 인스턴스에서 실행되는 도커(Docker) 컨테이너를 위해 확장성이 뛰어난 고성능 컨테이너 관리 서비스를 제공합니다.

Amazon ECS Datadog 통합을 사용하여 클라우드와치(CloudWatch)에서 자동으로 ECS 메트릭을 수집합니다. ECS API에서 ECS 이벤트, 태그, 그리고 컨테이너 인스턴스, 작업 및 서비스 의 상태를 쿼리하여 메트릭을 확장합니다.

## 설정

### 설치

아직 설정 하지 않았다면 먼저 [Amazon Web Services 통합](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#setup)을 설정하세요.

### 메트릭 수집

1. AWS 통합 [역할 위임 설정](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#setup) 지침을 따르세요.
1. [Datadog IAM 정책](https://docs.datadoghq.com/integrations/amazon_web_services/#datadog-aws-iam-policy)에 대한 다음 권한이 Amazon ECS 메트릭을 수집하도록 설정되어 있는지 확인하세요. ECS 정책에 대한 자세한 내용은 AWS 문서에서 [Amazon Elastic Container Service의 작업, 리소스, 조건 키](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonelasticcontainerservice.html)를 참조하세요.

| AWS 권한                    | 설명                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `ecs:ListClusters`               | 기존 클러스터 목록을 반환합니다.                          |
| `ecs:ListContainerInstances`     | 특정 클러스터의 컨테이너 인스턴스 목록을 반환합니다. |
| `ecs:ListServices`               | 특정 클러스터에서 실행하는 서비스를 나열합니다.   |
| `ecs:DescribeContainerInstances` | Amazon ECS 컨테이너 인스턴스를 설명합니다.                     |

3. [AWS 통합 페이지](https://app.datadoghq.com/integrations/amazon-web-services)에서 `Metric Collection` 탭에 `ECS`가 활성화되어 있는지 확인하세요.

   ![Amazon ECS 구성](images/aws_tile.png)

메트릭 수집이 활성화되면 ECS 메트릭에 대한 자세한 정보를 제공하는 [즉시 사용 가능 대시보드](https://app.datadoghq.com/screen/integration/82/aws-ecs)를 이 통합에 사용할 수 있습니다. 자세한 정보는 [Datadog를 사용해 ECS 모니터링](https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/#get-comprehensive-visibility-with-datadog-dashboards)을 참조하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.ecs.cpureservation** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 CPU 유닛의 백분율.<br>_percent로 표시_ |
| **aws.ecs.cpureservation.maximum** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 CPU 유닛의 최대 백분율.<br>_percent로 표시_ |
| **aws.ecs.cpureservation.minimum** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 CPU 유닛의 최소 백분율.<br>_percent로 표시_ |
| **aws.ecs.cpureservation.samplecount** <br>(count) | 클러스터에서 실행 중인 작업이 예약한 CPU 유닛의 샘플 수.|
| **aws.ecs.cpuutilization** <br>(gauge) | ClusterName 및 ServiceName으로 필터링된 클러스터 또는 서비스에서 사용되는 CPU 유닛의 백분율.<br>_percent로 표시_ |
| **aws.ecs.cpuutilization.maximum** <br>(gauge) | 클러스터 또는 서비스에서 사용한 CPU 유닛의 최대 백분율.<br>_percent로 표시_ |
| **aws.ecs.cpuutilization.minimum** <br>(gauge) | 클러스터 또는 서비스에서 사용한 CPU 유닛의 최소 백분율.<br>_percent로 표시_ |
| **aws.ecs.cpuutilization.samplecount** <br>(count) | 클러스터 또는 서비스에서 사용된 CPU 유닛의 샘플 수.|
| **aws.ecs.memory_reservation** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 메모리의 백분율.<br>_percent로 표시_ |
| **aws.ecs.memory_reservation.maximum** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 메모리의 최대 백분율.<br>_percent로 표시_ |
| **aws.ecs.memory_reservation.minimum** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 메모리의 최소 백분율.<br>_percent로 표시_ |
| **aws.ecs.memory_utilization** <br>(gauge) | 클러스터 또는 서비스에서 사용되는 메모리의 백분율.<br>_percent로 표시_ |
| **aws.ecs.memory_utilization.maximum** <br>(gauge) | 클러스터 또는 서비스에서 사용되는 메모리의 최대 백분율.<br>_percent로 표시_ |
| **aws.ecs.memory_utilization.minimum** <br>(gauge) | 클러스터 또는 서비스에서 사용되는 메모리의 최소 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.cpureservation** <br>(gauge) | 클러스터에서 작업을 실행하여 예약된 CPU 유닛의 백분율.<br>_percent로 표시_. |
| **aws.ecs.cluster.cpureservation.maximum** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 CPU 유닛의 최대 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.cpureservation.minimum** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 CPU 유닛의 최소 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.cpuutilization** <br>(gauge) | ClusterName으로 필터링된 클러스터 또는 서비스에서 사용되는 CPU 유닛의 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.cpuutilization.maximum** <br>(gauge) | 클러스터 또는 서비스에서 사용한 CPU 유닛의 최대 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.cpuutilization.minimum** <br>(gauge) | 클러스터 또는 서비스에서 사용한 CPU 유닛의 최소 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.memory_reservation** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 메모리의 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.memory_reservation.maximum** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 메모리의 최대 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.memory_reservation.minimum** <br>(gauge) | 클러스터에서 실행 중인 작업이 예약한 메모리의 최소 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.memory_utilization** <br>(gauge) | 클러스터 또는 서비스에서 사용되는 메모리의 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.memory_utilization.maximum** <br>(gauge) | 클러스터 또는 서비스에서 사용되는 메모리의 최대 백분율.<br>_percent로 표시_ |
| **aws.ecs.cluster.memory_utilization.minimum** <br>(gauge) | 클러스터 또는 서비스에서 사용되는 메모리의 최소 백분율.<br>_percent로 표시_ |
| **aws.ecs.pending_tasks_count** <br>(gauge) | 컨테이너 인스턴스에서 PENDING 상태인 작업의 수.<br>_task로 표시_ |
| **aws.ecs.registered_cpu** <br>(gauge) | 컨테이너 인스턴스에 등록된 CPU 유닛 수.|
| **aws.ecs.registered_memory** <br>(gauge) | 컨테이너 인스턴스에 등록된 메모리 유닛 수|
| **aws.ecs.remaining_cpu** <br>(gauge) | 컨테이너 인스턴스의 남은 CPU 유닛 수|
| **aws.ecs.remaining_memory** <br>(gauge) | 컨테이너 인스턴스의 남은 메모리 유닛 수|
| **aws.ecs.running_tasks_count** <br>(gauge) | 컨테이너 인스턴스에서 RUNNING 상태인 작업의 수.<br>_task로 표시_ |
| **aws.ecs.service.cpuutilization** <br>(gauge) | 서비스에서 사용되는 CPU 유닛의 평균 백분율.<br>_percent로 표시_ |
| **aws.ecs.service.cpuutilization.maximum** <br>(gauge) | 서비스에서 사용되는 CPU 유닛의 최대 백분율.<br>_percent로 표시_ |
| **aws.ecs.service.cpuutilization.minimum** <br>(gauge) | 서비스에서 사용되는 CPU 유닛의 최소 백분율.<br>_percent로 표시_ |
| **aws.ecs.service.desired** <br>(gauge) | 클러스터에서 목표 상태인 작업의 수|
| **aws.ecs.service.memory_utilization** <br>(gauge) | 서비스에서 사용되는 메모리의 평균 백분율.<br>_percent로 표시_ |
| **aws.ecs.service.memory_utilization.maximum** <br>(gauge) | 서비스에서 사용되는 메모리의 최대 백분율.<br>_percent로 표시_ |
| **aws.ecs.service.memory_utilization.minimum** <br>(gauge) | 서비스에서 사용되는 메모리의 최소 백분율.<br>_percent로 표시_ |
| **aws.ecs.service.pending** <br>(gauge) | 클러스터에서 대기(pending) 상태인 작업의 수.<br>_task로 표시_ |
| **aws.ecs.service.running** <br>(gauge) | 클러스터에서 실행 상태인 작업의 수.<br>_task로 표시_ |
| **aws.ecs.services** <br>(gauge) | 클러스터당 실행 중인 서비스 수|
| **ecs.containerinsights.container_instance_count** <br>(count) | 클러스터에 등록된 Amazon ECS 에이전트를 실행하는 EC2 인스턴스의 수.<br>_instance로 표시_ |
| **ecs.containerinsights.container_instance_count.maximum** <br>(count) | 클러스터에 등록된 Amazon ECS 에이전트를 실행하는 EC2 인스턴스의 최대 수.<br>_instance로 표시_ |
| **ecs.containerinsights.container_instance_count.minimum** <br>(count) | 클러스터에 등록된 Amazon ECS 에이전트를 실행하는 EC2 인스턴스의 최소 수.<br>_instance로 표시_ |
| **ecs.containerinsights.container_instance_count.samplecount** <br>(count) | 클러스터에 등록된 Amazon ECS 에이전트를 실행하는 EC2 인스턴스의 샘플 수.<br>_instance로 표시_ |
| **ecs.containerinsights.container_instance_count.sum** <br>(count) | 클러스터에 등록된 Amazon ECS 에이전트를 실행하는 EC2 인스턴스 수의 합.<br>_instance로 표시_ |
| **ecs.containerinsights.cpu_reserved** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 예약한 CPU 유닛 수.|
| **ecs.containerinsights.cpu_reserved.maximum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 예약한 최대 CPU 유닛 수.|
| **ecs.containerinsights.cpu_reserved.minimum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 예약한 최소 CPU 유닛 수.|
| **ecs.containerinsights.cpu_reserved.samplecount** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 예약한 CPU 유닛의 샘플 수.|
| **ecs.containerinsights.cpu_reserved.sum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 예약한 CPU 유닛 수의 합.|
| **ecs.containerinsights.cpu_utilized** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 사용한 CPU 유닛 수.<br>_percent로 표시_ |
| **ecs.containerinsights.cpu_utilized.maximum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 사용한 최대 CPU 유닛 수.<br>_percent로 표시_ |
| **ecs.containerinsights.cpu_utilized.minimum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 사용한 최소 CPU 유닛 수.<br>_percent로 표시_ |
| **ecs.containerinsights.cpu_utilized.samplecount** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 사용한 CPU 유닛 의 샘플 수.<br>_percent로 표시_ |
| **ecs.containerinsights.cpu_utilized.sum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 사용한 CPU 유닛 수의 합.<br>_percent로 표시_ |
| **ecs.containerinsights.deployment_count** <br>(count) | Amazon ECS 서비스의 배포 수.|
| **ecs.containerinsights.deployment_count.maximum** <br>(count) | Amazon ECS 서비스의 최대 배포 수.|
| **ecs.containerinsights.deployment_count.minimum** <br>(count) | Amazon ECS 서비스의 최소 배포 수.|
| **ecs.containerinsights.deployment_count.samplecount** <br>(count) | Amazon ECS 서비스 배포의 샘플 수.|
| **ecs.containerinsights.deployment_count.sum** <br>(count) | Amazon ECS 서비스 배포 수의 합계.|
| **ecs.containerinsights.desired_task_count** <br>(count) | Amazon ECS 서비스의 목표 작업 수.<br>_task로 표시_ |
| **ecs.containerinsights.desired_task_count.maximum** <br>(count) | Amazon ECS 서비스의 목표 최대 작업 수.<br>_task로 표시_ |
| **ecs.containerinsights.desired_task_count.minimum** <br>(count) | Amazon ECS 서비스의 목표 최소 작업 수.<br>_task로 표시_ |
| **ecs.containerinsights.desired_task_count.samplecount** <br>(count) | Amazon ECS 서비스의 목표 작업 샘플 수.<br>_task로 표시_ |
| **ecs.containerinsights.desired_task_count.sum** <br>(count) | Amazon ECS 서비스의 목표 작업 수의 합.<br>_task로 표시_ |
| **ecs.containerinsights.memory_reserved** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 예약한 메모리.<br>_megabyte로 표시_ |
| **ecs.containerinsights.memory_reserved.maximum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 예약한 최대 메모리.<br>_megabyte로 표시_ |
| **ecs.containerinsights.memory_reserved.minimum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 예약한 최소 메모리.<br>_megabyte로 표시_ |
| **ecs.containerinsights.memory_reserved.samplecount** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 예약한 메모리의 샘플 수.<br>_megabyte로 표시_ |
| **ecs.containerinsights.memory_reserved.sum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 예약한 메모리의 합.<br>_megabyte로 표시_ |
| **ecs.containerinsights.memory_utilized** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 사용 중인 메모리.<br>_megabyte로 표시_ |
| **ecs.containerinsights.memory_utilized.maximum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 사용 중인 최대 메모리.<br>_megabyte로 표시_ |
| **ecs.containerinsights.memory_utilized.minimum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 사용 중인 최소 메모리.<br>_megabyte로 표시_ |
| **ecs.containerinsights.memory_utilized.samplecount** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 사용 중인 메모리의 샘플 수.<br>_megabyte로 표시_ |
| **ecs.containerinsights.memory_utilized.sum** <br>(gauge) | 선택한 차원의 지정된 리소스에서 작업이 사용 중인 메모리의 합.<br>_megabyte로 표시_ |
| **ecs.containerinsights.pending_task_count** <br>(count) | 현재 PENDING 상태인 작업의 수.<br>_task로 표시_ |
| **ecs.containerinsights.pending_task_count.maximum** <br>(count) | 현재 PENDING 상태인 작업의 최대 수.<br>_task로 표시_ |
| **ecs.containerinsights.pending_task_count.minimum** <br>(count) | 현재 PENDING 상태인 작업의 최소 수.<br>_task로 표시_ |
| **ecs.containerinsights.pending_task_count.samplecount** <br>(count) | 현재 PENDING 상태인 작업의 샘플 수.<br>_task로 표시_ |
| **ecs.containerinsights.pending_task_count.sum** <br>(count) | 현재 PENDING 상태인 작업의 합계.<br>_task로 표시_ |
| **ecs.containerinsights.running_task_count** <br>(count) | 현재 RUNNING 상태인 작업의 수.<br>_task로 표시_ |
| **ecs.containerinsights.running_task_count.maximum** <br>(count) | 현재 RUNNING 상태인 작업의 최대 수.<br>_task로 표시_ |
| **ecs.containerinsights.running_task_count.minimum** <br>(count) | 현재 RUNNING 상태인 작업의 최소 수.<br>_task로 표시_ |
| **ecs.containerinsights.running_task_count.samplecount** <br>(count) | 현재 RUNNING 상태인 작업의 샘플 수.<br>_task로 표시_ |
| **ecs.containerinsights.running_task_count.sum** <br>(count) | 현재 RUNNING 상태인 작업의 합계.<br>_task로 표시_ |
| **ecs.containerinsights.service_count** <br>(count) | 클러스터의 서비스 수.<br>_service로 표시_ |
| **ecs.containerinsights.service_count.maximum** <br>(count) | 클러스터의 최대 서비스 수.<br>_service로 표시_ |
| **ecs.containerinsights.service_count.minimum** <br>(count) | 클러스터의 최소 서비스 수.<br>_service로 표시_ |
| **ecs.containerinsights.service_count.samplecount** <br>(count) | 클러스터 서비스의 샘플 수.<br>_service로 표시_ |
| **ecs.containerinsights.service_count.sum** <br>(count) | 클러스터 서비스 수의 합계.<br>_service로 표시_ |
| **ecs.containerinsights.storage_read_bytes** <br>(gauge) | 선택한 차원에 대해 지정된 리소스의 스토리지에서 읽은 바이트 수.<br>_byte로 표시_ |
| **ecs.containerinsights.storage_read_bytes.maximum** <br>(gauge) | 선택한 차원에 대해 지정된 리소스의 스토리지에서 읽은 최대 바이트 수.<br>_byte로 표시_ |
| **ecs.containerinsights.storage_read_bytes.minimum** <br>(gauge) | 선택한 차원에 대해 지정된 리소스의 스토리지에서 읽은 최소 바이트 수.<br>_byte로 표시_ |
| **ecs.containerinsights.storage_read_bytes.samplecount** <br>(gauge) | 선택한 차원에 대해 지정된 리소스의 스토리지에서 읽은 바이트의 샘플 수.<br>_byte로 표시_ |
| **ecs.containerinsights.storage_read_bytes.sum** <br>(gauge) | 선택한 차원에 대해 지정된 리소스의 스토리지에서 읽은 바이트 수의 합계.<br>_byte로 표시_ |
| **ecs.containerinsights.storage_write_bytes** <br>(gauge) | 선택한 차원에 대해 지정된 리소스의 스토리지에서 기록된 바이트 수.<br>_byte로 표시_ |
| **ecs.containerinsights.storage_write_bytes.maximum** <br>(gauge) | 선택한 차원에 대해 지정된 리소스의 스토리지에서 기록된 최대 바이트 수.<br>_byte로 표시_ |
| **ecs.containerinsights.storage_write_bytes.minimum** <br>(gauge) | 선택한 차원에 대해 지정된 리소스의 스토리지에서 기록된 최소 바이트 수.<br>_byte로 표시_ |
| **ecs.containerinsights.storage_write_bytes.samplecount** <br>(gauge) | 선택한 차원에 대해 지정된 리소스의 스토리지에서 기록된 바이트의 샘플 수.<br>_byte로 표시_ |
| **ecs.containerinsights.storage_write_bytes.sum** <br>(gauge) | 선택한 차원에 대해 지정된 리소스의 스토리지에서 기록된 바이트 수의 합계.<br>_byte로 표시_ |
| **ecs.containerinsights.task_count** <br>(count) | 서비스에서 실행 중인 작업 수.<br>_task로 표시_ |
| **ecs.containerinsights.task_count.maximum** <br>(count) | 서비스에서 실행 중인 최대 작업 수.<br>_task로 표시_ |
| **ecs.containerinsights.task_count.minimum** <br>(count) | 서비스에서 실행 중인 최소 작업 수.<br>_task로 표시_ |
| **ecs.containerinsights.task_count.samplecount** <br>(count) | 서비스에서 실행 중인 작업의 샘플 수.<br>_task로 표시_ |
| **ecs.containerinsights.task_count.sum** <br>(count) | 서비스에서 실행 중인 작업 수의 합계.<br>_task로 표시_ |
| **ecs.containerinsights.task_set_count** <br>(count) | 서비스의 작업 세트 수.<br>_task로 표시_ |
| **ecs.containerinsights.task_set_count.maximum** <br>(count) | 서비스 작업 세트의 최대 수.<br>_task로 표시_ |
| **ecs.containerinsights.task_set_count.minimum** <br>(count) | 서비스 작업 세트의 최소 수.<br>_task로 표시_ |
| **ecs.containerinsights.task_set_count.samplecount** <br>(count) | 서비스의 작업 세트 샘플 수.<br>_task로 표시_ |
| **ecs.containerinsights.task_set_count.sum** <br>(count) | 서비스의 작업 세트 수의 합.<br>_task로 표시_ |

AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않습니다.

**참고**: `ecs.containerinsights.*` 접두어의 메트릭은 [AWS 통합 페이지](https://app.datadoghq.com/integrations/amazon-web-services) `Metric Collection` 탭의 `Collect custom metrics`를 활성화해 수집할 수 있습니다.

### 이벤트

노이즈를 줄이기 위해 Amazon ECS 통합은 자동으로 `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot`, `terminate` 단어를 포함하는 이벤트만 포함하도록 설정되어 있습니다. 샘플 이벤트를 아래에서 확인해주세요.

![Amazon ECS 이벤트](images/aws_ecs_events.png)

포함 목록을 제거하고 Datadog Amazon ECS 통합에서 모든 이벤트를 수신하려면 [Datadog 지원](https://docs.datadoghq.com/help/)에 문의해 주세요.

### 서비스 점검

**aws.ecs.agent_connected**

ECS Agent 연결 여부.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.