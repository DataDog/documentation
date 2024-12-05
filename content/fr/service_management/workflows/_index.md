---
aliases:
- /fr/workflows
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatiser des processus de bout en bout et répondre rapidement aux événements
    avec les workflows Datadog
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: Blog
  text: Automatiser les tâches de sécurité courantes et anticiper les menaces avec
    les workflows Datadog et Cloud SIEM
title: Workflow Automation
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Workflow Automation n'est pas prise en charge pour le <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}}) que vous avez sélectionné.</div>
{{< /site-region >}}

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/852419580/rendition/1080p/file.mp4?loc=external&signature=fb7ae8df018e24c9f90954f62ff3217bc1b904b92e600f3d3eb3f5a9d143213e" poster="/images/poster/workflow_automation.png" >}}

La solution Workflow Automation Datadog vous permet d'orchestrer et d'automatiser vos processus de bout en bout. Créez des workflows composés d'[actions][1] connectées à votre infrastructure et vos outils. Ces actions peuvent également effectuer des opérations logiques et des opérations sur vos données, afin de concevoir des flux complexes constitués de branches, de décisions et d'opérations sur des données.

## Configurer des actions de workflow

La solution Workflow Automation Datadog propose plus de 400 actions pour différents outils, ainsi que des actions spécifiques à des workflows, comme l'action HTTP et l'opérateur de données JavaScript. Grâce à ces actions, vous pouvez effectuer n'importe quelle tâche requise dans votre flux.

## Débuter avec des blueprints

Datadog propose des flux préconfigurés : il s'agit de [blueprints][2] prêts à l'emploi. Les dizaines de blueprints disponibles vous permettent de concevoir des processus axés sur la gestion d'incidents, les DevOps, la gestion des changements, la sécurité et la remédiation.

## Automatiser des tâches critiques

Déclenchez vos workflows à partir de monitors, de signaux de sécurité ou de dashboards, ou procédez manuellement à leur déclenchement. Cette approche flexible vous permet d'exploiter le workflow le plus pertinent dès que vous identifiez un problème nuisant à l'intégrité de votre système. Grâce à l'automatisation des tâches réalisée par la solution Workflow Automation Datadog, vous résolvez plus rapidement vos problèmes et limitez vos erreurs, ce qui améliore la disponibilité de vos systèmes.

## Dashboard Workflows Overview

Le dashboard Workflows Overview fournit une vue d'ensemble de vos workflows Datadog et de leurs exécutions. Pour consulter ce dashboard, accédez à **Dashboards > Dashboards list**, puis recherchez `Workflows Overview`.

{{< img src="service_management/workflows/workflows-dashboard.png" alt="Le dashboard Workflows Overview" style="width:100%;" >}}

## Exemples

Vous trouverez ci-dessous des exemples de workflows pouvant être conçus :
- Automatisez la mise à échelle de vos groupes AWS Auto Scaling lorsque vos monitors surveillant les métriques critiques de ces groupes passent à un état d'alerte.
- Créez automatiquement des notebooks d'enquête répertoriant les IP malveillantes à détecter avec les signaux de sécurité, puis bloquez ces IP dans CloudFlare d'un simple clic.
- Exécutez des workflows pour rétablir des versions stables de votre application, directement depuis les dashboards servant à surveillant l'intégrité de vos systèmes.
- Gérez des feature flags en mettant automatiquement à jour leurs fichiers de configuration dans GitHub et en automatisant le processus de pull request et de fusion.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/service_management/workflows/actions_catalog/
[2]: /fr/workflows/build/#build-a-workflow-from-a-blueprint