---
disable_toc: false
further_reading:
- link: /service_management/workflows/
  tag: Documentation
  text: Workflow Automation
title: Widget Exécuter un workflow
widget_type: run_workflow
---

## Présentation

Le widget Exécuter un workflow vous permet d'automatiser des tâches importantes à partir de vos dashboards. Vous pouvez alors déclencher vos workflows depuis un dashboard dès que vous prenez connaissance d'un problème nuisant à l'intégrité de votre système. Vous avez ainsi la certitude que vos systèmes demeurent disponibles, grâce à un temps de résolution réduit ainsi qu'à un plus faible nombre d'erreurs.

## Configuration

1. Sous **Select the workflow**, recherchez votre workflow dans le menu déroulant.
1. Mappez des template variables de dashboard aux paramètres d'entrée de votre workflow. De cette manière, les valeurs de vos template variables de dashboard sont associées directement aux paramètres d'entrée lors de l'exécution du workflow.
1. Attribuez un titre au widget, puis cliquez sur **Save**.

{{< img src="service_management/workflows/trigger-from-dashboard2.png" alt="Cliquez sur Run Workflow pour déclencher un workflow à partir du widget Dashboard." >}}

Pour exécuter le workflow, procédez comme suit :
1. Cliquez sur **Run Workflow** dans votre widget de dashboard.
1. Les template variables que vous avez mappées aux entrées du workflow s'affichent automatiquement sous **Execution parameters**. Saisissez les valeurs des paramètres d'exécution qui ne sont pas mappés ou modifiez des valeurs existantes si nécessaire.
1. Cliquez sur **Run** pour exécuter le workflow.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][1]**. Le tableau ci-dessous définit le [schéma JSON du widget][2] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/