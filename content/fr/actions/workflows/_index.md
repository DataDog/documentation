---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/workflows
- /fr/service_management/workflows
description: Orchestrer et automatiser des processus de bout en bout avec des workflows
  qui connectent des actions dans votre infrastructure et vos outils.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Débuter avec Workflow Automation
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatiser les processus de bout en bout et répondre rapidement aux événements
    avec Datadog Workflows
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: Blog
  text: Automatiser les tâches de sécurité courantes et anticiper les menaces avec
    les workflows Datadog et Cloud SIEM
- link: https://www.datadoghq.com/blog/soar/
  tag: Blog
  text: Automatiser la protection des identités, le confinement des menaces et le
    renseignement sur les menaces avec les workflows Datadog SOAR
- link: https://www.datadoghq.com/blog/azure-workflow-automation/
  tag: Blog
  text: Corriger rapidement les problèmes de vos applications Azure grâce à la solution
    Workflow Automation Datadog
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: Blog
  text: Créer des workflows et des applications Datadog en quelques minutes avec notre
    assistant IA
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: Blog
  text: Comment nous avons créé une application unique pour automatiser les tâches
    répétitives avec Datadog Workflow Automation, Datastore et App Builder
- link: https://learn.datadoghq.com/courses/automated-workflows
  tag: Centre d'apprentissage
  text: Corriger les problèmes avec Workflow Automation
title: Automatisation de workflows
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/852419580/rendition/1080p/file.mp4?loc=external&signature=fb7ae8df018e24c9f90954f62ff3217bc1b904b92e600f3d3eb3f5a9d143213e" poster="/images/poster/workflow_automation.png" >}}

Datadog Workflow Automation vous permet d'orchestrer et d'automatiser vos processus de bout en bout. Créez des workflows composés d'[actions][1] qui se connectent à votre infrastructure et à vos outils. Ces actions peuvent également effectuer des opérations de données et des opérations logiques, ce qui vous permet de créer des flux complexes avec des branches, des décisions et des opérations de données.

## Configurer des actions de workflow

Datadog Workflow Automation fournit plus de 2 000 actions pour plusieurs outils, ainsi que des actions spécifiques au workflow telles que l'action HTTP et l'opérateur de données JavaScript. Ces actions vous permettent d'effectuer n'importe quelle tâche nécessaire à votre workflow.

## Commencer avec les blueprints

Datadog vous fournit des flux préconfigurés sous la forme de [blueprints][2] prêts à l'emploi. Des dizaines de blueprints vous aident à créer des processus autour de la gestion des incidents, de DevOps, de la gestion des changements, de la sécurité et de la correction.

## Automatiser les tâches critiques

Déclenchez vos workflows depuis des monitors, des signaux de sécurité ou des dashboards, ou déclenchez-les manuellement. Cette flexibilité vous permet de répondre avec le workflow approprié au moment où vous prenez connaissance d'un problème affectant l'intégrité de votre système. L'automatisation de tâches critiques avec Datadog Workflow Automation aide à maintenir vos systèmes opérationnels en améliorant le délai de résolution et en réduisant la possibilité d'erreurs.

## Dashboard Workflows Overview

Le dashboard Workflows Overview fournit une vue d'ensemble de haut niveau de vos workflows et exécutions Datadog. Pour trouver le dashboard, accédez à votre [liste de dashboards][3] et recherchez `Workflows Overview`.

{{< img src="service_management/workflows/workflows-dashboard.png" alt="Le dashboard Workflows Overview" style="width:100%;" >}}

## Exemples

Voici quelques exemples de workflows que vous pouvez créer :
- Automatiser la mise à l'échelle de vos groupes AWS Auto Scaling lorsque les monitors qui suivent les métriques critiques de ces groupes Auto Scaling passent à l'état d'alerte.
- Créer automatiquement des notebooks d'enquête sur les adresses IP malveillantes à détecter par Security Signals, puis bloquer ces adresses IP dans CloudFlare en un clic.
- Exécuter des workflows pour revenir à des versions stables de votre application directement depuis les dashboards que vous utilisez pour suivre l'intégrité de vos systèmes.
- Gérer les feature flags en mettant automatiquement à jour vos fichiers de configuration de feature flag dans GitHub et en automatisant le processus de pull request et de merge.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][4].

[1]: /fr/actions/actions_catalog/
[2]: /fr/workflows/build/#build-a-workflow-from-a-blueprint
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://datadoghq.slack.com/