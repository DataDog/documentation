---
description: Vérifiez que les utilisateurs peuvent atteindre un objectif dans votre
  application à l'aide de tests Synthetic agentiques, non déterministes et guidés
  par des invites.
further_reading:
- link: /synthetics/bits_testing/
  tag: Documentation
  text: Bits Testing
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Tests de navigateurs
- link: /synthetics/test_suites/
  tag: Documentation
  text: Collections de tests
- link: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
  tag: Tarification
  text: Tarification du Synthetic Monitoring
private: true
title: Test basé sur un objectif
---
{{< beta-callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
Le test basé sur un objectif est en préversion. Demandez l'accès pour rejoindre la liste d'attente.
{{< /beta-callout >}}

## Présentation {#overview}

Le test basé sur un objectif est un type de test Synthetic qui utilise des tests agentiques, non déterministes et guidés par des invites pour vérifier qu'un utilisateur peut atteindre un objectif spécifique dans votre application. Il est bien adapté au test des fonctionnalités d'IA et à la validation des parcours utilisateur critiques qui ne devraient pas nécessiter une maintenance continue des tests.

Contrairement à un test de navigateur, un test basé sur un objectif ne suit pas un ensemble d'étapes fixes et enregistrées. Au lieu de cela, un agent explore votre application, en essayant plusieurs chemins vers l'objectif que vous décrivez.

## Créer un test basé sur un objectif {#create-a-goal-based-test}

Vous pouvez créer un test basé sur un objectif de deux façons :

- Laissez [Bits Testing][1] en générer un automatiquement dans le cadre d'une collection de tests de parcours.
- Créez-en un manuellement en cliquant sur {{< ui >}}New Test{{< /ui >}} et en sélectionnant Test basé sur un objectif.

{{< img src="synthetics/goal_based_testing/goal_based_test_type_selection.png" alt="La boîte de dialogue 'New Synthetics Test' avec 'Goal-Based Test' sélectionné" style="width:50%;" >}}

Lors de la création manuelle d'un test basé sur un objectif, fournissez :

- Une **URL de départ** pour l'application testée.
- Un **objectif**, rédigé sous forme d'invite en langage clair (par exemple, « Demandez au chatbot d'assistance une recommandation de produit »).
- Un **emplacement** depuis lequel exécuter le test. Voir les [emplacements pris en charge](#supported-locations).
- Optionnellement, un [Agent Profile][2] pour réutiliser des variables telles que les identifiants de connexion.

{{< img src="synthetics/goal_based_testing/goal_based_test_creation.png" alt="Le panneau Nouveau test basé sur un objectif avec les champs URL de départ et objectif" style="width:60%;" >}}

### Emplacements pris en charge {#supported-locations}

Les tests basés sur un objectif s'exécutent uniquement depuis les emplacements gérés par Datadog listés dans [Run Bits Testing][4].

Pour la tarification, consultez [Bits Testing billing][3].

## Comment le test basé sur un objectif évalue une exécution {#how-goal-based-testing-evaluates-a-run}

Après avoir lancé un test basé sur un objectif, l'agent explore votre application à partir de l'URL de départ, en se ramifiant à travers les différents chemins qu'un utilisateur pourrait emprunter vers l'objectif.

Lorsque l'exécution se termine, le test rapporte un résultat **Réussite** si l'une des branches explorées a atteint l'objectif. Il rapporte un résultat **Échec** si aucune branche n'a atteint l'objectif ou si l'agent a rencontré une erreur. Parallèlement au résultat, le test basé sur un objectif affiche :

- Un résumé expliquant le raisonnement derrière le résultat « réussite » ou « échec ».
- Navigation pas à pas des actions entreprises par l'agent, afin que vous puissiez examiner exactement ce qu'il a tenté.

{{< img src="synthetics/goal_based_testing/goal_based_test_run_result.png" alt="Une exécution de test basé sur un objectif ayant échoué, montrant les chemins explorés, une justification de l'échec et la capture d'écran finale." style="width:100%;" >}}

## Planifier et éditer un test {#schedule-and-edit-a-test}

Une fois la première exécution terminée, cliquez sur l'icône {{< ui >}}Edit test{{< /ui >}} pour :

- Planifier le test pour qu'il s'exécute de façon récurrente.
- Modifier le nom du test.
- Ajouter des tags.
- Changer le Agent Profile sélectionné.

{{< img src="synthetics/goal_based_testing/goal_based_test_schedule.png" alt="L'étape de planification de l'assistant de création de test basé sur un objectif, avec les options d'intervalle de récurrence." style="width:80%;" >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/bits_testing/
[2]: /fr/synthetics/bits_testing/#agent-profiles
[3]: /fr/synthetics/bits_testing/#billing
[4]: /fr/synthetics/bits_testing/#run-bits-testing