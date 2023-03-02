---
aliases:
- /fr/continuous_integration/guides/find_flaky_tests/
kind: guide
title: Gestion des tests irréguliers
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas actuellement disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Les _tests irréguliers_ sont des tests qui enregistrent à la fois des réussites et des échecs sur plusieurs exécutions pour le même commit. Si vous exécutez le commit de code via CI et que vous obtenez un résultat de test négatif, puis que vous exécutez à nouveau ce commit via CI et obtenez un résultat positif, cela signifie que le test ne permet pas de mesurer de manière fiable la qualité de votre code.

Les tests irréguliers augmentent le niveau de risque et d'incertitude de votre système de CI et de votre produit final. Si vous devez mémoriser les tests qui sont irréguliers, vous ne pouvez plus faire confiance à leurs résultats : vous perdez alors énormément de temps et de ressources à relancer vos pipelines.

Accédez à la page Test Service pour afficher le tableau _Flaky Tests_ associé à un service de test et à une branche spécifiques. Tous les tests irréguliers sur l'intervalle sélectionné sont alors présentés.

{{< img src="ci/flaky-test-management.png" alt="Tableau Flaky Tests sur la page Test Service" style="width:100%;">}}

Pour que vous puissiez focaliser vos efforts sur les tests irréguliers, l'interface propose les informations suivantes à leur sujet :

* **Average duration** : durée moyenne de l'exécution du test.
* **First flaked et Last flaked** : date et hashs de commit correspondant à la première occurrence et à la dernière occurrence du comportement irrégulier du test.
* **Occurrences** : nombre de commits dans lesquels le test a présenté un comportement irrégulier.
* **Failure Rate** : pourcentage d'exécutions entraînant un échec depuis le premier comportement irrégulier du test.
* **Trend** : visualisation indiquant si un test irrégulier a été corrigé ou s'il continue à générer différents résultats.

Après avoir identifié un test irrégulier à corriger, cliquez dessus pour afficher des liens permettant de consulter la dernière exécution ayant échoué ou la première exécution irrégulière.

<div class="alert alert-info"><strong>Remarque</strong> : le tableau affiche uniquement les 1 000 tests  qui présentent le plus grand nombre de commits avec un comportement irrégulier pendant l'intervalle sélectionné.</div>

## Remédiation

Si un test irrégulier n'a pas échoué au cours des 30 derniers jours, il est automatiquement supprimé du tableau. Vous pouvez également supprimer manuellement un test irrégulier en cliquant sur l'icône de corbeille qui s'affiche lorsque vous passez le curseur sur la ligne du test. Le test réintègre le tableau s'il présente à nouveau un comportement irrégulier.

## Surveiller les nouveaux tests irréguliers

Ces tests correspondent aux tests qui présentent un comportement irrégulier, mais qui ne figuraient pas encore dans le tableau Flaky Tests pour la branche actuelle ou la branche par défaut du référentiel.

### Page Test Runs

1. Accédez à la page [Test Runs][1].
2. Depuis la liste des facettes sur la barre latérale de gauche, développez la facette **New Flaky** dans la section **Test** et cochez l'option `true`.
L'écran affiche toutes les exécutions de test qui ont présenté un comportement irrégulier pour la première fois selon la définition ci-dessus.

### Page Branches

1. Sur la page [Tests][2], sélectionnez la vue **Branches**.
2. Filtrez le tableau pour afficher les branches, services ou commits de votre choix.
3. Examinez la colonne **New Flaky** pour connaître le nombre de nouveaux tests irréguliers identifiés depuis le dernier commit, selon la définition ci-dessus.

#### Ignorer les nouveaux tests irréguliers détectés par erreur

Vous pouvez ignorer les nouveaux tests irréguliers pour un commit donné si vous estimez que ces tests ont été détectés par erreur. Les tests réapparaîtront si un comportement régulier est à nouveau détecté dans le commit.

Cliquez sur le nombre de tests **New Flaky**, puis cliquez sur **Ignore flaky tests**.

{{< img src="ci/ignore-new-flaky-tests.png" alt="Ignorer tous les nouveaux tests irréguliers pour un commit" style="width:100%;">}}

## Surveiller les tests irréguliers connus ayant échoué

Ces tests correspondent aux tests qui présentent un comportement irrégulier sur la branche actuelle ou par défaut du référentiel.

### Page Test Runs

1. Accédez à la page [Test Runs][1].
2. Depuis la liste des facettes sur la barre latérale de gauche, développez la facette **Known Flaky** dans la section **Test** et cochez l'option `true`.
L'écran affiche alors les exécutions de test ayant échoué qui avaient déjà présenté un comportement irrégulier selon la définition ci-dessus.


### Page Branches

1. Sur la page [Tests][2], sélectionnez la vue **Branches**.
2. Filtrez le tableau pour afficher les branches, services ou commits de votre choix.
3. La colonne **Failed** indique le nombre de tests ayant échoué et le nombre de tests irréguliers connus dans le dernier commit.

{{< img src="ci/known-flaky-failed-tests.png" alt="Vue Branches des tests CI avec une branche sélectionnée et une zone de texte dans la colonne Failed indiquant 1 test ayant échoué et 1 test irrégulier connu" style="width:100%;">}}

[1]: https://app.datadoghq.com/ci/test-runs
[2]: https://app.datadoghq.com/ci/test-services