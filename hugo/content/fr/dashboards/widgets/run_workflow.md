---
description: Déclenchez des workflows automatisés directement depuis les Dashboards
  pour résoudre rapidement les problèmes et maintenir le bon fonctionnement du système.
disable_toc: false
further_reading:
- link: /actions/workflows/
  tag: Documentation
  text: Workflow Automation
title: Widget Run Workflow
widget_type: run_workflow
---
## Présentation {#overview}

Le widget Run Workflow vous permet d'automatiser des tâches critiques depuis les Dashboards. Déclenchez vos workflows depuis un Dashboard dès que vous prenez connaissance d'un problème affectant le bon fonctionnement de votre système. Cela permet de maintenir vos systèmes opérationnels en réduisant le délai de résolution et le risque d'erreurs.

## Configuration {#configuration}

1. Sous {{< ui >}}Select the workflow{{< /ui >}}, recherchez votre workflow dans le menu déroulant.
1. Associez les variables de modèle de dashboard aux paramètres d'entrée du workflow. Cela permet aux valeurs de vos variables de modèle de dashboard d'être mappées directement aux paramètres d'entrée lorsque vous exécutez le workflow.
1. Saisissez un titre pour le widget et cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="dashboards/widgets/trigger-from-dashboard2.png" alt="Cliquez sur Run Workflow pour déclencher un workflow depuis le widget Dashboard." >}}

Pour exécuter le workflow, procédez comme suit :
1. Cliquez sur {{< ui >}}Run Workflow{{< /ui >}} sur votre widget de dashboard.
1. Sous {{< ui >}}Run parameters{{< /ui >}}, toutes les variables de modèle que vous avez mappées aux entrées du workflow sont automatiquement renseignées. Saisissez les valeurs des paramètres d'exécution non mappés ou modifiez les valeurs existantes si nécessaire.
1. Cliquez sur {{< ui >}}Run{{< /ui >}} pour exécuter le workflow.

## API {#api}

Ce widget peut être utilisé avec le **[Dashboards API][1]**. Consultez le tableau suivant pour la [widget JSON schema definition][2] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/