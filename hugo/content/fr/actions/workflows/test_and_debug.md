---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/service_management/workflows/test_and_debug
description: Tester les déclencheurs de monitor, les étapes de workflow individuelles
  et déboguer les étapes ayant échoué à l'aide de l'historique d'exécution et des
  messages d'erreur.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Débuter avec Workflow Automation
- link: /service_management/workflows/build
  tag: Documentation
  text: Créer des workflows
- link: /service_management/workflows/trigger
  tag: Documentation
  text: Déclencher des workflows
title: Tester et déboguer
---

## Tester un déclencheur de monitor

Vous pouvez tester un déclencheur de monitor pendant la création du workflow. Tester un monitor génère un extrait que vous pouvez coller dans la fenêtre de notification de votre monitor pour déclencher le workflow.

Pour tester un déclencheur de monitor :
1. Sélectionnez l'action de déclencheur de monitor dans votre workflow.
1. Cliquez sur **Test from Monitor**.
1. Si votre monitor transmet des entrées au workflow, saisissez une valeur de test sous **Workflow Inputs**.
1. Sélectionnez un monitor à tester.
1. Sélectionnez un état de monitor.
1. Cliquez sur **Run From Monitor**.


## Tester une étape

Pour vous assurer qu'une étape fonctionne comme souhaité sans avoir à exécuter l'intégralité du workflow, vous pouvez tester l'étape de manière indépendante.

Pour tester une étape de workflow :
1. Cliquez sur **Test** dans la section **Inputs** de l'étape.
1. Facultativement, ajustez la configuration de l'étape. Si votre étape utilise des variables de sortie d'une étape précédente, saisissez des données de test codées en dur pour que l'étape les utilise.
1. Cliquez sur **Test** pour tester l'action.
1. Lorsque vous avez terminé de tester l'étape, cliquez sur **Use in configuration** pour utiliser votre nouvelle configuration dans le workflow, ou fermez l'écran pour revenir au workflow sans enregistrer votre configuration de test.

Le test n'est pas disponible pour les actions de branchement et de logique. Pour tester une action de fonction ou d'expression JavaScript qui utilise des variables de sortie d'une étape précédente, commentez les variables dans votre code et remplacez-les par des données de test. Pour obtenir plus d'informations, consultez la section [Tester des expressions et des fonctions][6].


## Déboguer une étape ayant échoué

Vous pouvez utiliser le **Run History** d'un workflow pour déboguer une étape ayant échoué. Cliquez sur **Configuration** ou **Run History** en haut à gauche pour basculer entre les vues de configuration et d'historique d'exécution.

Cliquer sur une étape ayant échoué vous donne les entrées, les sorties et le contexte d'exécution pour l'étape, ainsi que le message d'erreur associé. L'exemple ci-dessous montre une étape _GitHub pull request status_ ayant échoué. Le message d'erreur montre que l'étape a échoué en raison d'autorisations manquantes :

{{< img src="service_management/workflows/failed-step4.png" alt="Un workflow avec une étape ayant échoué." >}}

L'historique d'exécution initial d'un workflow fournit un panneau avec la liste des exécutions de workflow précédentes et si chaque exécution a réussi ou échoué. Les échecs incluent un lien vers l'étape de workflow ayant échoué. Cliquez sur une exécution de workflow dans la liste pour l'inspecter. Vous pouvez revenir à l'historique d'exécution initial à tout moment en cliquant n'importe où sur le canevas du workflow.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][10].

[6]: #test-expressions-and-functions
[10]: https://datadoghq.slack.com/