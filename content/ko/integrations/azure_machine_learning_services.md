---
app_id: azure_machine_learning_services
categories:
- 클라우드
- azure
- ai/ml
custom_kind: 통합
description: Azure Machine Learning의 핵심 메트릭 추적하기.
further_reading:
- link: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  tag: 블로그
  text: 프로덕션에서 ML 모델을 모니터링하기 위한 모범 사례
title: Microsoft Azure Machine Learning
---
## 개요

Azure Machine Learning 서비스는 개발자와 데이터 과학자에게 기계 학습을 구축하고, 훈련하며, 더 빨리 배포하는 데 도움이 되도록 다양한 생산적인 경험을 제공하는 서비스입니다. Datadog를 사용해 Azure Machine Learning 성능과 내 애플리케이션 및 인프라스트럭처 컨텍스트 내 활용도를 모니터링할 수 있습니다.

Azure Machine Learning 메트릭을 얻으면 다음을 할 수 있습니다.

- 모델 배포 및 실행 상태 횟수 추적
- 기계 학습 노드 활용도 모니터링
- 성능 대비 비용 최적화

## 설정

### 설치

If you haven't already, set up the [Microsoft Azure integration](https://docs.datadoghq.com/integrations/azure/) first. There are no other installation steps.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **azure.machinelearningservices_workspaces.completed_runs** <br>(gauge) | The number of runs completed successfully for this workspace.<br>_Shown as operation_ |
| **azure.machinelearningservices_workspaces.started_runs** <br>(gauge) | The number of runs started for this workspace.<br>_Shown as operation_ |
| **azure.machinelearningservices_workspaces.failed_runs** <br>(gauge) | The number of runs failed for this workspace.<br>_Shown as operation_ |
| **azure.machinelearningservices_workspaces.model_register_succeeded** <br>(gauge) | The number of model registrations that succeeded in this workspace.|
| **azure.machinelearningservices_workspaces.model_register_failed** <br>(gauge) | The number of model registrations that failed in this workspace.|
| **azure.machinelearningservices_workspaces.model_deploy_started** <br>(gauge) | The number of model deployments started in this workspace.|
| **azure.machinelearningservices_workspaces.model_deploy_succeeded** <br>(gauge) | The number of model deployments that succeeded in this workspace.|
| **azure.machinelearningservices_workspaces.moddel_deploy_failed** <br>(gauge) | The number of model deployments that failed in this workspace.|
| **azure.machinelearningservices_workspaces.total_nodes** <br>(gauge) | The number of total nodes. This total includes some of Active Nodes, Idle Nodes, Unusable Nodes, Premepted Nodes, Leaving Nodes.<br>_Shown as node_ |
| **azure.machinelearningservices_workspaces.active_nodes** <br>(gauge) | The number of Acitve nodes. These are the nodes which are actively running a job.<br>_Shown as node_ |
| **azure.machinelearningservices_workspaces.idle_nodes** <br>(gauge) | The number of idle nodes. Idle nodes are the nodes which are not running any jobs but can accept new job if available.<br>_Shown as node_ |
| **azure.machinelearningservices_workspaces.unusable_nodes** <br>(gauge) | The number of unusable nodes. Unusable nodes are not functional due to some unresolvable issue. Azure will recycle these nodes.<br>_Shown as node_ |
| **azure.machinelearningservices_workspaces.preempted_nodes** <br>(gauge) | The number of preempted nodes. These nodes are the low priority nodes which are taken away from the available node pool.<br>_Shown as node_ |
| **azure.machinelearningservices_workspaces.leaving_nodes** <br>(gauge) | The number of leaving nodes. Leaving nodes are the nodes which just finished processing a job and will go to Idle state.<br>_Shown as node_ |
| **azure.machinelearningservices_workspaces.total_cores** <br>(gauge) | The number of total cores.<br>_Shown as core_ |
| **azure.machinelearningservices_workspaces.active_cores** <br>(gauge) | The number of active cores.<br>_Shown as core_ |
| **azure.machinelearningservices_workspaces.idle_cores** <br>(gauge) | The number of idle cores.<br>_Shown as core_ |
| **azure.machinelearningservices_workspaces.unusable_cores** <br>(gauge) | The number of unusable cores.<br>_Shown as core_ |
| **azure.machinelearningservices_workspaces.preempted_cores** <br>(gauge) | The number of preempted cores.<br>_Shown as core_ |
| **azure.machinelearningservices_workspaces.leaving_cores** <br>(gauge) | The number of leaving cores.<br>_Shown as core_ |
| **azure.machinelearningservices_workspaces.quota_utilization_percentage** <br>(gauge) | The percent of quota utilized.<br>_Shown as percent_ |
| **azure.machinelearningservices_workspaces.cpuutilization** <br>(gauge) | CPU utilization<br>_Shown as percent_ |
| **azure.machinelearningservices_workspaces.gpuutilization** <br>(gauge) | GPU utilization<br>_Shown as percent_ |

### 이벤트

Azure Machine Learning 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Machine Learning 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}