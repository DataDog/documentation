---
algolia:
  rank: 70
  tags:
  - flaky test
  - flaky tests
  - test regression
  - test regressions
  - test service
  - test services
description: Découvrir comment rechercher vos tests CI
further_reading:
- link: /continuous_integration/explorer
  tag: Documentation
  text: Rechercher et filtrer des cycles de test
- link: /continuous_integration/guides/flaky_test_management
  tag: Documentation
  text: Découvrir comment gérer vos tests irréguliers
title: Rechercher et gérer des tests CI
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

La [page des tests][1] est utile pour les développeurs qui souhaitent garder un œil sur les résultats de leurs tests.

{{< img src="/continuous_integration/tests.png" text="Page CI Tests" style="width:100%" >}}

Elle vous permet d'accéder à des informations immédiates et précises :

- Découvrez les tests ayant échoué et la raison derrière cet échec.
- Consultez les résultats de test de votre dernier commit.
- Visualisez la durée totale de vos tests dans votre branche de fonctionnalité.
- Découvrez si votre commit introduit un nouveau [test irrégulier][4] qui ne l'était pas auparavant, ce qui voudrait dire que le changement de code est à l'origine du problème. Cette approche vous permet de résoudre le problème avant la validation du commit, au lieu d'ajouter de plus en plus de tests irréguliers dans votre intégration continue.

Vous pouvez également accéder à des informations globales et des tendances :

- Découvrez quelle est l'incidence d'une modification de code, d'un ajout de tests ou d'une complexité accrue sur les performances de votre collection de tests au fil du temps.
- Identifiez les tests dont les performances se détériorent au fil du temps et identifiez le commit à l'origine de ce problème.
- Tirez parti de l'outil de détection et de suivi automatique des tests irréguliers de Datadog, qui met en évidence les tests qui perdent en fiabilité au fil du temps.

## Rechercher des tests

Pour voir vos tests, accédez à [**CI** > **Tests**][1] et choisissez entre la vue [**Branches**](#vue-branches) ou la vue [**Default Branches**](#vue-default-branches).

### Vue Branches

La vue [Branches][2] de la page Tests affiche toutes les branches de tous les [services de test][3] ayant transmis des résultats. Cet onglet permet aux développeurs de visualiser en quelques secondes le statut des tests qui s'exécutent sur leurs branches de code et de corriger les échecs.

Vous pouvez filtrer les données de cette page par nom, service de test ou hash de commit. Il est également possible d'afficher uniquement vos branches (celles qui contiennent un commit dont vous êtes à l'origine). Pour ce faire, activez l'option **My branches** et ajoutez les adresses e-mail que vous utilisez dans votre configuration Git.

#### Résultats des tests

Pour chaque branche, vous pouvez voir le service de test, le nombre de tests échoués, réussis et ignorés, les régressions de tests, la durée totale des tests, la date de la dernière mise à jour du commit et l'avatar de l'auteur du commit.

Cliquez sur une branche pour explorer la page des détails des tests et consulter des informations sur les derniers commits, les tests irréguliers, les performances des tests, les types d'erreurs les plus courants, et toutes les exécutions de test.

{{< img src="continuous_integration/test_details.png" alt="Page Test Details pour une branche spécifique" style="width:100%;">}}

#### Régressions de test

Les [régressions de test][5] sont évaluées par commit dans le but d'associer les régressions de performance à des changements de code spécifiques.

#### Obtenir des données supplémentaires

Cliquez sur une ligne pour afficher des données supplémentaires concernant l'exécution de la collecte de tests, notamment les résultats pour le dernier commit de cette branche (ou d'autres branches), les tests ayant échoué et les erreurs les plus fréquentes, les tests lents, les tests irréguliers et la liste complète des exécutions de test sur un intervalle précis. Vous pouvez filtrer cette liste d'exécutions par facette, afin d'afficher les informations dont vous avez le plus besoin.

Cliquez sur une exécution de test pour afficher la trace du test sous la forme d'un flamegraph ou d'une liste de spans. Accédez rapidement aux traces de chaque nouvelle tentative du test pour un commit depuis la liste _Runs (n)_ située à gauche de la page.

#### Explorer les connexions vers les services, ressources, logs et événements réseau

Cliquez sur le lien du fournisseur CI pour accéder à la page Resource, Service ou Analytics du test. Vous pouvez également consulter des informations complètes sur les tags et accéder aux événements de log et de surveillance réseau associés.

### Vue Default Branches

La vue [Default Branches][6] de la page Tests affiche des métriques de santé agrégées pour la branche _default_ de chaque service de test. Cette vue est utile aux équipes pour comprendre l'état de santé global de service au fil du temps.

La vue Default Branches présente des informations similaires à celles de la vue Branches, mais appliquées à la branche par défaut.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-services
[2]: https://app.datadoghq.com/ci/test-services?view=branches
[3]: /fr/glossary/#test-service
[4]: /fr/glossary/#flaky-test
[5]: /fr/glossary/#test-regression
[6]: https://app.datadoghq.com/ci/test-services?view=default-branches