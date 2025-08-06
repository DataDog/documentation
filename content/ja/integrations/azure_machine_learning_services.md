---
app_id: azure_machine_learning_services
categories:
- クラウド
- azure
- ai/ml
custom_kind: インテグレーション
description: Azure Machine Learning の主要メトリクスを追跡。
further_reading:
- link: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  tag: ブログ
  text: 本番環境で ML モデルを監視するためのベストプラクティス
title: Microsoft Azure Machine Learning
---
## 概要

Azure Machine Learning サービスでは、開発者やデータサイエンティストに向けに、機械学習モデルをより速く構築、トレーニング、展開するための生産的な機能を数多く提供しています。Datadog を使用して、他のアプリケーションやインフラストラクチャーに応じて Azure Machine Learning のパフォーマンスと使用状況を監視します。

Azure Machine Learning からメトリクスを取得すると、以下のことができます。

- 実行数、実行ステータス、モデルのデプロイメント数、モデルのデプロイメントステータスを追跡。
- 機械学習ノードの使用状況を監視。
- 対コストパフォーマンスの最適化。

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration](https://docs.datadoghq.com/integrations/azure/) first. There are no other installation steps.

## 収集データ

### メトリクス

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

### イベント

Azure Machine Learning インテグレーションには、イベントは含まれません。

### サービス チェック

Azure Machine Learning インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}