---
description: Utilisez la page Synthetic Monitoring & Testing Overview pour voir quels
  tests échouent, où les échecs se concentrent et quels endpoints et vues ne sont
  couverts par aucun test.
further_reading:
- link: /synthetics/
  tag: Documentation
  text: Synthetic Monitoring
- link: /synthetics/explore/results_explorer/
  tag: Documentation
  text: Synthetic Monitoring & Testing Results Explorer
- link: /synthetics/api_tests/
  tag: Documentation
  text: Test d'API
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Tests de navigateurs
- link: /synthetics/mobile_app_testing/
  tag: Documentation
  text: Mobile Application Testing
title: Page Synthetic Monitoring & Testing Overview
---
La page Synthetic Monitoring & Testing Overview vous offre une vue d'ensemble de l'état et de la couverture de vos tests Synthetic, pour vous aider à répondre à deux questions :

- **Qu'est-ce qui échoue ?** Identifiez les tests en alerte, voyez où les échecs sont concentrés et prenez des mesures pour chaque test en échec.
- **Qu'est-ce qui n'est pas encore testé ?** Trouvez les endpoints et les vues qui enregistrent le plus de trafic et ne sont couverts par aucun test Synthetic, puis créez des tests pour eux.

Utilisez cette page comme point de départ pour analyser les échecs et décider où ajouter une couverture de test.

{{< img src="synthetics/explore/overview/overview_page.png" alt="La page Synthetic Monitoring & Testing Overview, montrant la section Test health avec une carte des échecs regroupés par emplacement et une liste des tests en alerte, ainsi que la section Coverage gaps avec des cartes de services présentant les endpoints testés et non testés." style="width:100%;" >}}

## Prérequis {#prerequisites}

- Pour voir les endpoints non testés, activez [APM][1] pour vos services.
- Pour voir les vues non testées, activez [RUM][2] pour vos applications web ou mobiles.

La section [Test Health](#test-health) de la page Overview ne nécessite ni APM ni RUM.

## Test health {#test-health}

La section {{< ui >}}Test Health{{< /ui >}} indique combien de tests sont en alerte par rapport au nombre total de vos tests. Cliquez sur {{< ui >}}View all alerting tests{{< /ui >}} pour ouvrir la liste complète.

### Filtrer les tests {#filter-tests}

Utilisez ces filtres pour définir le périmètre de la carte et de la liste des tests en échec :

- {{< ui >}}Teams{{< /ui >}} : Affichez les tests appartenant à une ou plusieurs équipes.
- {{< ui >}}Environment{{< /ui >}} : Affichez les tests pour un ou plusieurs environnements.
- {{< ui >}}Tags{{< /ui >}} : Affichez les tests avec des tags spécifiques.
- {{< ui >}}Creator{{< /ui >}} : Affichez les tests créés par des utilisateurs spécifiques.

### Repérer les concentrations d'échecs {#find-concentrated-failures}

La carte montre où les échecs se concentrent. Elle divise d'abord les tests en {{< ui >}}OK{{< /ui >}} et {{< ui >}}In alert{{< /ui >}}. Chaque tuile représente un groupe et indique combien de tests il contient. Les tuiles plus grandes contiennent plus de tests.

Utilisez le menu {{< ui >}}Group by{{< /ui >}} pour choisir comment la carte regroupe les tests :

- {{< ui >}}Location{{< /ui >}}
- {{< ui >}}Test type{{< /ui >}}
- {{< ui >}}Priority{{< /ui >}}
- {{< ui >}}Failure reason{{< /ui >}}
- {{< ui >}}Environment{{< /ui >}}
- {{< ui >}}Team{{< /ui >}}

Lorsque vous regroupez par emplacement, un test apparaît sous chaque emplacement depuis lequel il est exécuté. Chaque tuile indique si le test échoue à cet emplacement. Par conséquent, la somme des nombres de tests affichés dans les tuiles peut dépasser le nombre total de vos tests.

{{< img src="synthetics/explore/overview/failure_map.png" alt="La carte des échecs regroupée par emplacement, divisée en sections OK et In alert, avec des tuiles dont la taille dépend du nombre de tests à chaque emplacement." style="width:100%;" >}}

### Agir sur un test en échec {#act-on-a-failing-test}

La liste à côté de la carte affiche tous les tests en alerte. Chaque entrée affiche le nom du test, l'URL ou la requête qu'il vérifie et les emplacements où il échoue.

Cliquez sur une tuile de la carte pour filtrer la liste selon les tests de cette tuile.

Pour chaque test en échec, vous pouvez :

- Cliquez sur {{< ui >}}Investigate with Bits{{< /ui >}} pour lancer une investigation assistée par IA de l'échec.
- Cliquez sur {{< ui >}}View Traces{{< /ui >}} pour voir les traces du backend d'un test d'API.
- Cliquez sur {{< ui >}}View Failing Step{{< /ui >}} pour ouvrir l'étape où un test de navigateur a échoué.

Cliquez sur le menu kebab (**⋮**) d'un test pour :

- {{< ui >}}Run test now{{< /ui >}} : Déclencher une exécution de test en dehors de son planning.
- {{< ui >}}Pause scheduling{{< /ui >}} : Arrêter les exécutions planifiées du test.
- {{< ui >}}Open in Results Explorer{{< /ui >}} : Voir les résultats du test dans [Results Explorer][3].

{{< img src="synthetics/explore/overview/failing_test_actions.png" alt="La carte des échecs filtrée sur un emplacement, à côté de la liste des tests en alerte pour cet emplacement. Investigate With Bits est mis en surbrillance sur le premier test, et son menu kebab est ouvert avec Run test now, Pause scheduling et Open in Results Explorer." style="width:100%;" >}}

## Coverage gaps {#coverage-gaps}

La section {{< ui >}}Coverage gaps{{< /ui >}} affiche les endpoints et les vues qu'aucun test Synthetic ne couvre. Datadog les classe par trafic, qui correspond au nombre de requêtes ou de vues au cours de la semaine passée. Commencez par les éléments en haut de la liste pour couvrir vos surfaces à fort trafic en priorité.

Utilisez le bouton bascule dans le coin supérieur droit de la section pour basculer entre {{< ui >}}Endpoints{{< /ui >}} et {{< ui >}}Views{{< /ui >}}. Utilisez la barre de recherche pour trouver un service, une application, un endpoint ou une vue spécifique.

### Lisez la grille de couverture {#read-the-coverage-grid}

Chaque carte représente un service ou une application. Chaque carré dans une carte représente un endpoint ou une vue :

| Couleur  | Signification                 |
|--------|-------------------------|
| Bleu   | Testé                  |
| Orange | Non testé, fort trafic  |
| Gris   | Non testé, trafic plus faible |

Le fort trafic est défini comme suit :

- **Endpoints** : Parmi les 20 principaux services, Datadog trie les endpoints par nombre de requêtes au cours de la semaine passée. Les endpoints qui constituent ensemble 90 % des requêtes sont à fort trafic.
- **Vues** : Parmi les 20 principales applications, Datadog trie les vues par nombre de vues au cours de la semaine passée. Les vues qui constituent ensemble 90 % des vues sont à fort trafic.

{{< img src="synthetics/explore/overview/coverage_grid.png" alt="La section Coverage gaps dans la vue Endpoints, avec l'option Group by service activée. Les cartes de service affichent des carrés orange pour les endpoints non testés à fort trafic, des carrés gris pour les endpoints non testés à trafic plus faible et des carrés bleus pour les endpoints testés. Les endpoints non testés du service sélectionné sont listés à gauche, classés par trafic." style="width:100%;" >}}

### Endpoints non testés {#untested-endpoints}

La vue {{< ui >}}Endpoints{{< /ui >}} liste les endpoints d'API non testés provenant d'APM. Elle affiche les 20 principaux services par trafic. Chaque entrée affiche la méthode HTTP, le chemin et le service.

Par défaut, {{< ui >}}Group by service{{< /ui >}} est activé, la vue affiche donc une carte par service, avec le nombre d'endpoints non testés pour chaque service. Cliquez sur une carte de service pour filtrer la liste sur les endpoints de ce service, classés par nombre de requêtes au cours de la semaine passée.

Pour créer un test pour un endpoint :

1. Cliquez sur une carte de service pour filtrer la liste selon ce service.
2. Survolez l'endpoint en haut de la liste, qui a enregistré le plus grand nombre de requêtes au cours de la semaine passée.
3. Cliquez sur {{< ui >}}Create an API Test{{< /ui >}}.
4. Dans le nouveau [test d'API][4], qui s'ouvre avec l'URL de l'endpoint préremplie, terminez la configuration du test et cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="synthetics/explore/overview/create_api_test.png" alt="Un endpoint non testé survolé dans la liste, affichant le bouton Create an API Test, à côté de la carte de service sélectionnée dans la grille de couverture." style="width:100%;" >}}

### Vues non testées {#untested-views}

La vue {{< ui >}}Views{{< /ui >}} répertorie les vues non testées issues de RUM pour vos applications web et mobiles. Elle affiche les 20 applications ayant le plus de vues au cours de la semaine passée. Chaque entrée affiche le nom de la vue et l'application.

Par défaut, {{< ui >}}Group by application{{< /ui >}} est activé, de sorte que la vue affiche une carte par application, avec le nombre de vues non testées dans chacune.

Pour créer un test pour une vue :

1. Survolez une vue dans la liste.
2. Cliquez sur {{< ui >}}Create a Browser Test{{< /ui >}} pour une vue d'application web ou sur {{< ui >}}Create a Mobile Test{{< /ui >}} pour une vue d'application mobile.
3. Configurez le nouveau test, qui s'ouvre sans aucun champ prérempli :
   - Pour une vue d'application web, dans le nouveau [test de navigateur][5], saisissez l'URL de départ, enregistrez vos étapes et cliquez sur {{< ui >}}Save{{< /ui >}}.
   - Pour une vue d'application mobile, dans le nouveau [mobile app test][6], sélectionnez votre application, enregistrez vos étapes et cliquez sur {{< ui >}}Save{{< /ui >}}.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/
[2]: /fr/real_user_monitoring/
[3]: /fr/synthetics/explore/results_explorer/
[4]: /fr/synthetics/api_tests/
[5]: /fr/synthetics/browser_tests/
[6]: /fr/synthetics/mobile_app_testing/