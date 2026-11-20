---
description: Découvrez comment mettre en corrélation les métriques d'infrastructure
  avec vos exécutions de tâches GitLab Autoscale.
further_reading:
- link: /continuous_integration/pipelines/gitlab
  tag: Documentation
  text: Configurer CI Visibility sur un pipeline GitLab
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: Documentation
  text: Apprendre à rechercher et gérer vos exécutions de pipeline
title: Mettre en corrélation les métriques d'infrastructure avec les tâches GitLab
  dans Datadog
---

<div class="alert alert-info">Cette méthode s'applique uniquement aux runners utilisant les exécuteurs « Instance » ou « Docker Autoscaler ».</div>

## Présentation

Lorsque vous cliquez sur une tâche GitLab dans le [CI Visibility Explorer][9], vous pouvez accéder à un onglet **Infrastructure** contenant des informations sur le host, le système, les tags de host, les métriques de host, et plus encore.

{{< img src="continuous_integration/infrastructure_tab.png" alt="L'onglet Infrastructure affichant des informations sur un host et son système, ainsi que des métriques de host telles que l'utilisation du processeur et les moyennes de charge." style="width:100%;">}} 

Ce guide explique comment mettre en corrélation les métriques d'infrastructure avec vos tâches GitLab si vous utilisez les exécuteurs GitLab « Instance » ou « Docker Autoscaler » et [CI Visibility][1].

## Prérequis

L'Agent Datadog doit être installé dans les machines virtuelles (VM) où les tâches GitLab seront exécutées. Il ne s'agit pas de l'emplacement où l'[instance GitLab][2] ou l'exécuteur [Docker Autoscaler][3] s'exécute, mais des VM créées avec le plugin fleeting.

## S'assurer que l'Agent Datadog est installé dans vos instances

Si vous utilisez un [groupe Auto Scaling AWS][4], vous devez vous assurer que l'image de machine configurée dans le modèle se lance avec l'[Agent Datadog][5].

Pour vérifier que cette étape a été effectuée, vous pouvez essayer d'exécuter une tâche et vous devriez voir le host apparaître sur la [page Infrastructure List][6].

Si vous utilisez AWS, assurez-vous que le nom de host est au format `"i-xxxxx"`. Si ce n'est pas le cas, vous devez vérifier que votre instance est compatible avec IMDSv1. Pour plus d'informations, consultez la [documentation officielle AWS][7].

Vous pouvez configurer ceci dans le modèle de votre groupe Auto Scaling AWS. L'Agent Datadog utilise le point de terminaison du service de métadonnées pour résoudre le nom de host.

## Configurer CI Visibility et la collecte de logs pour vos tâches GitLab

Pour obtenir des instructions sur la configuration de CI Visibility pour vos tâches GitLab, consultez la section relative à la [configuration de Pipeline Visibility sur un pipeline GitLab][1].

Pour vérifier que vous avez correctement effectué la configuration, vous pouvez essayer d'exécuter un pipeline GitLab et vérifier s'il apparaît sur la [page **Executions**][8].

Vous devez activer la collecte de logs de tâches. Vous pouvez vérifier si Datadog reçoit correctement les logs en cliquant sur l'onglet Logs de votre exécution de pipeline. Assurez-vous que les logs de tâches GitLab sont indexés et incluent des messages sous la forme `Instance <hostname> connected`. Les utilisateurs ont également besoin d'un [accès en lecture aux logs][11] pour voir l'onglet Infrastructure. Les logs de tâches GitLab incluent les tags `datadog.product:cipipeline` et `source:gitlab`, que vous pouvez utiliser dans les filtres [Log Indexes][10]. 

Une fois que vous avez terminé ces étapes, vos tâches GitLab devraient être mises en corrélation avec les métriques d'infrastructure. La corrélation s'effectue par tâche et non par pipeline, car différentes tâches peuvent s'exécuter sur différents hosts. L'onglet **Infrastructure** apparaît une fois la tâche terminée et lorsque Datadog reçoit les logs pour cette tâche.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/pipelines/gitlab
[2]: https://docs.gitlab.com/runner/executors/instance.html
[3]: https://docs.gitlab.com/runner/executors/docker_autoscaler.html
[4]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html
[5]: /fr/agent/
[6]: https://app.datadoghq.com/infrastructure
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: /fr/continuous_integration/explorer/?tab=pipelineexecutions
[10]: /fr/logs/indexes/
[11]: /fr/logs/guide/logs-rbac/