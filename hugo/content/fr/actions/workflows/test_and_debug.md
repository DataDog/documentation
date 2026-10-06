---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/service_management/workflows/test_and_debug
description: Testez les déclencheurs de monitor, les étapes de workflow individuelles
  et déboguez les étapes ayant échoué à l'aide de l'historique d'exécution et des
  messages d'erreur.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Débuter avec Workflow Automation
- link: /actions/workflows/build
  tag: Documentation
  text: Créez des workflows
- link: /actions/workflows/trigger
  tag: Documentation
  text: Déclenchez des workflows
title: Testez et déboguez
---
## Tester un déclencheur de monitor {#test-a-monitor-trigger}

Vous pouvez tester un déclencheur de monitor lors de la création d'un workflow. Le test d'un monitor génère un extrait que vous pouvez coller dans votre fenêtre de notification de monitor pour déclencher le workflow.

Pour tester un déclencheur de monitor :
1. Sélectionnez l'action de déclencheur de monitor dans votre workflow.
1. Cliquez sur {{< ui >}}Test from Monitor{{< /ui >}}.
1. Si votre monitor transmet des entrées au workflow, saisissez une valeur de test sous {{< ui >}}Workflow Inputs{{< /ui >}}.
1. Sélectionnez un monitor à tester.
1. Sélectionnez un état de monitor.
1. Cliquez sur {{< ui >}}Run From Monitor{{< /ui >}}.


## Tester une étape {#test-a-step}

Pour vous assurer qu'une étape fonctionne comme souhaité sans avoir à exécuter l'intégralité du workflow, vous pouvez tester l'étape indépendamment.

Pour tester une étape de workflow :
1. Cliquez sur {{< ui >}}Test{{< /ui >}} dans la section {{< ui >}}Inputs{{< /ui >}} de l'étape.
1. Optionnellement, ajustez la configuration de l'étape. Si votre étape utilise des variables de sortie d'une étape précédente, saisissez des données de test codées en dur que l'étape pourra utiliser.
1. Cliquez sur {{< ui >}}Test{{< /ui >}} pour tester l'action.
1. Lorsque vous avez terminé de tester l'étape, cliquez sur {{< ui >}}Use in configuration{{< /ui >}} pour utiliser votre nouvelle configuration dans le workflow, ou fermez l'écran pour revenir au workflow sans enregistrer votre configuration de test.

Le test n'est pas disponible pour les actions de branchement et de logique. Pour tester une action de fonction ou d'expression JavaScript qui utilise des variables de sortie d'une étape précédente, commentez les variables dans votre code et remplacez-les par des données de test. Pour plus d'informations, consultez [Test expressions and functions][6].


## Déboguer une étape ayant échoué {#debug-a-failed-step}

Vous pouvez utiliser {{< ui >}}Run History{{< /ui >}} d'un workflow pour déboguer une étape ayant échoué. Cliquez sur {{< ui >}}Configuration{{< /ui >}} ou {{< ui >}}Run History{{< /ui >}} en haut à gauche pour basculer entre les vues de configuration et d'historique d'exécution.

Cliquer sur une étape ayant échoué vous donne les entrées, les sorties et le contexte d'exécution de l'étape, ainsi que le message d'erreur associé. L'exemple ci-dessous montre une étape _GitHub pull request status_ ayant échoué. Le message d'erreur indique que l'étape a échoué en raison d'autorisations manquantes :

{{< img src="actions/workflows/test_and_debug/failed-step4.png" alt="Un workflow avec une étape ayant échoué." >}}

L'historique d'exécution initial d'un workflow fournit un panneau avec la liste des exécutions précédentes du workflow et indique si chaque exécution a réussi ou échoué. Les échecs incluent un lien vers l'étape du workflow ayant échoué. Cliquez sur une exécution de workflow dans la liste pour l'inspecter. Vous pouvez revenir à l'historique d'exécution initial à tout moment en cliquant n'importe où sur le canevas du workflow.


## Corriger une étape ayant échoué avec l'IA {#fix-a-failed-step-with-ai}

Dans {{< ui >}}Run History{{< /ui >}}, sélectionnez une étape ayant échoué et ouvrez son onglet {{< ui >}}Outputs{{< /ui >}}. À côté du message d'erreur, cliquez sur {{< ui >}}Fix with AI{{< /ui >}} pour obtenir de l'aide afin de résoudre l'échec.

{{< img src="actions/workflows/test_and_debug/fix-with-ai.png" alt="Bits Chat diagnostiquant et proposant une correction pour une étape de workflow ayant échoué." >}}

L'assistant s'ouvre dans [Bits Chat][7], diagnostique la défaillance à l'aide des entrées, des sorties, du contexte d'exécution et du message d'erreur de l'étape, et peut rechercher dans la documentation externe les erreurs renvoyées par des API tierces. Il explique le problème et propose une correction, puis vous demande de confirmer avant d'appliquer toute modification. Une fois que vous avez confirmé, l'assistant met à jour la configuration de l'étape et relance la validation.

Les corrections par IA s'appliquent aux problèmes de configuration du workflow, tels que des entrées incorrectes ou une configuration d'action obsolète. Pour les défaillances causées par des facteurs externes, tels que des identifiants non valides, des limites de débit ou une interruption de service connecté, l'assistant explique la cause profonde et suggère les étapes suivantes, comme la vérification de vos identifiants ou la prise de contact avec le propriétaire du service connecté.

Si l'étape ayant échoué déclenche un autre workflow, Bits Chat peut tracer la défaillance dans le workflow déclenché pour diagnostiquer et proposer une correction également à ce niveau.


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Datadog Community Slack][10].

[6]: /fr/actions/workflows/expressions/
[7]: /fr/bits_ai/bits_chat/
[10]: https://chat.datadoghq.com/