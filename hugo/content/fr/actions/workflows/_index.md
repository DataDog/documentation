---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/workflows
- /fr/service_management/workflows
description: Orchestrez et automatisez des processus de bout en bout avec des workflows
  qui connectent les actions à travers votre infrastructure et vos outils.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Débuter avec Workflow Automation
- link: https://learn.datadoghq.com/courses/automating-meaningful-actions
  tag: Centre d'apprentissage
  text: Automatisation d'actions significatives avec Datadog Workflow Automation
- link: https://www.datadoghq.com/blog/cloud-siem-cases/
  tag: Blog
  text: Transformez les signaux de sécurité en enquêtes structurées avec Case Management
    dans Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: Blog
  text: Intégrer ServiceNow ITSM à Datadog pour accélérer Incident Response
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Transformez les retours en actions au sein de votre organisation d'ingénierie
    avec Datadog Forms
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatisez des processus de bout en bout et répondez rapidement aux événements
    avec Datadog Workflows
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: Blog
  text: Automatiser les tâches de sécurité courantes et anticiper les menaces avec
    les workflows Datadog et Cloud SIEM
- link: https://www.datadoghq.com/blog/soar/
  tag: Blog
  text: Automatisez la protection de l'identité, le confinement des menaces et le
    renseignement sur les menaces avec les workflows Datadog SOAR
- link: https://www.datadoghq.com/blog/azure-workflow-automation/
  tag: Blog
  text: Corriger rapidement les problèmes de vos applications Azure grâce à la solution
    Datadog Workflow Automation
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: Blog
  text: Créez des workflows et des applications Datadog en quelques minutes avec notre
    assistant IA
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: Blog
  text: Comment nous avons créé une application unique pour automatiser les tâches
    répétitives avec Datadog Workflow Automation, Datastore et App Builder
- link: https://www.datadoghq.com/blog/datadog-agent-builder/
  tag: Blog
  text: 'Présentation de Bits Agent Builder : créez des workflows agentiques pour
    la réponse aux alertes et la remédiation'
- link: https://www.datadoghq.com/blog/build-datadog-workflows-ai-agents/
  tag: Blog
  text: Créez et exécutez des workflows Datadog depuis Bits Chat ou des agents d'IA
title: Workflow Automation
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/852419580/rendition/1080p/file.mp4?loc=external&signature=fb7ae8df018e24c9f90954f62ff3217bc1b904b92e600f3d3eb3f5a9d143213e" poster="/images/poster/workflow_automation.png" >}}

Datadog Workflow Automation vous permet d'orchestrer et d'automatiser vos processus de bout en bout. Créez des workflows composés d'[actions][1] qui se connectent à votre infrastructure et à vos outils. Ces actions peuvent également effectuer des opérations de données et logiques, vous permettant de construire des flux complexes avec des branches, des décisions et des opérations de données.

## Configurer les actions de workflow {#configure-workflow-actions}

Datadog Workflow Automation fournit plus de 2000 actions à travers plusieurs outils, ainsi que des actions spécifiques aux workflows telles que l'action HTTP et l'opérateur de données JavaScript. Ces actions vous permettent d'effectuer toute tâche requise dans votre flux.

## Commencez avec des modèles {#start-with-blueprints}

Datadog vous fournit des flux préconfigurés sous forme de [modèles][2] prêts à l'emploi. Des dizaines de modèles vous aident à construire des processus autour de la gestion des incidents, du DevOps, de la gestion des changements, de la sécurité et de la remédiation.

## Automatisez les tâches critiques {#automate-critical-tasks}

Déclenchez vos workflows à partir de monitors, de signaux de sécurité ou de dashboards, ou déclenchez-les manuellement. Cette flexibilité vous permet de répondre avec le workflow approprié au moment où vous prenez connaissance d'un problème affectant la santé de votre système. L'automatisation des tâches critiques avec Datadog Workflow Automation aide à maintenir vos systèmes opérationnels en améliorant le temps de résolution et en réduisant la possibilité d'erreurs.

## Dashboard Workflows Overview {#workflows-overview-dashboard}

Le dashboard Workflows Overview fournit une vue d'ensemble de haut niveau de vos workflows et exécutions Datadog. Pour trouver le dashboard, accédez à votre [Dashboard List][3] et recherchez `Workflows Overview`.

{{< img src="actions/workflows/workflows-dashboard.png" alt="Le dashboard Workflows Overview" style="width:100%;" >}}

## Exemples {#examples}

Voici quelques exemples de workflows que vous pouvez créer :
- Automatisez la mise à l'échelle de vos groupes Auto Scaling AWS lorsque les monitors qui suivent les métriques critiques de ces groupes Auto Scaling passent à l'état d'alerte.
- Créez automatiquement des notebooks d'investigation pour les IP malveillantes détectées par les signaux de sécurité, puis bloquez ces IP dans CloudFlare en un clic.
- Exécutez des workflows pour revenir aux versions stables de votre application directement depuis les dashboards que vous utilisez pour suivre l'état de santé de vos systèmes.
- Gérez les feature flags en mettant automatiquement à jour vos fichiers de configuration Feature Flags dans GitHub et en automatisant le processus de pull request et de fusion.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][4].

[1]: /fr/actions/actions_catalog/
[2]: /fr/workflows/build/#build-a-workflow-from-a-blueprint
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://chat.datadoghq.com/