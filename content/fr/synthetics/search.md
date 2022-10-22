---
description: Découvrez comment rechercher et gérer vos tests Synthetic.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Pratiques recommandées pour la création de tests de bout en bout
- link: https://www.datadoghq.com/blog/test-maintenance-best-practices/
  tag: Blog
  text: Pratiques recommandées pour la gestion de tests de bout en bout
- link: /synthetics/ci_results_explorer
  tag: Documentation
  text: En savoir plus sur l'explorateur de résultats CI
- link: /events/explorer
  tag: Documentation
  text: En savoir plus sur l'Events Explorer
kind: documentation
title: Rechercher et gérer des tests Synthetic
---

## Présentation

Vous pouvez rechercher, visualiser et gérer tous vos tests sur la [page de tests Synthetic][1].

Pour mieux comprendre l'état de votre application, cliquez sur **Show Metrics**. La section **Overview Metrics** qui apparaît contient des graphiques représentant la disponibilité et le temps de réponse globaux de vos tests. Pour en savoir plus sur les données affichées, consultez la section [Métriques de la surveillance Synthetic][2].

Vous pouvez utiliser des facettes pour rechercher des tests Synthetic, gérer vos tests à l'aide d'actions groupées et surveiller des événements pour suivre les modifications apportées à la configuration de votre surveillance Synthetic. Parcourez les [dashboards Synthetic prêts à l'emploi][3] pour mieux comprendre l'étendue de vos tests.

## Rechercher des tests

### Facettes et tags

Le volet **Synthetics Filters** à gauche présente les facettes par défaut que vous pouvez utiliser pour rechercher des tests.

Voici les facettes par défaut :

| Facette          | Description                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `Type`         | Le type de test Synthetic : `browser`, `api`, `api-multi`, `api-websocket`, `api-ssl`, `api-dns`, `api-tcp`, `api-udp`, `api-icmp`, ou `api-grpc`. |
| `Status`       | Le statut du test Synthetic : `OK`, `Alert` ou `No Data`.                       |
| `Creator`      | Le créateur du test Synthetic.                                            |
| `Region`       | Les emplacements gérés et privés à partir desquels le test Synthetic s'exécute.         |
| `State`        | L'état du test Synthetic : `live` ou `paused`.                          |
| `Notification` | Le handle utilisé par le test Synthetic pour les notifications.                      |
| `Env`          | L'environnement sur lequel le test Synthetic s'exécute.                             |
| `CI/CD Execution Rule` | Le statut de l'exécution du test : `Blocking`, `Non-blocking` ou `Skipped`. |

Le volet **Tags** affiché sous **Synthetic Filters** présente plusieurs tags par défaut que vous pouvez utiliser pour identifier vos tests. 

Voici les tags par défaut :

| Tag          | Description                                                                     |
|----------------|-------------------------------------------------------------------------------|
| `Team`         | L'équipe en charge du test Synthetic.                    |
| `Tag`          | Le tag attribué au test Synthetic.                                       |
| `Service`      | Le service sur lequel le test Synthetic s'exécute.                                 |
| `Private Locations`| `true` si les emplacements privés sont activés, `false` dans le cas contraire.          |

Pour en savoir plus, consultez la section [Utiliser les tags][4].

### Créer une requête de recherche

Cliquez sur les facettes à gauche ou créez une requête personnalisée dans la barre de recherche pour rechercher des tests. Les résultats de votre recherche s'actualisent en temps réel à mesure que vous modifiez la requête.

Lorsque vous sélectionnez et désélectionnez des facettes, vos modifications sont automatiquement prises en compte dans la barre de recherche. De même, lorsque vous modifiez la requête ou créez une requête de toutes pièces dans la barre de recherche, cela a pour effet de sélectionner et désélectionner les facettes à gauche.

* **Rechercher une chaîne de texte simple** : saisissez votre texte dans la barre de recherche pour rechercher un nom de test.
* **Rechercher une seule facette** : cliquez sur la valeur d'une facette pour créer une requête de recherche qui comprend uniquement cette valeur de facette. Exemple : `type:api`. Pour ajouter une autre valeur de la même facette à votre recherche, cliquez sur la case d'une autre valeur. Vous pouvez également ajouter l'autre valeur avec un opérateur booléen `OR` et insérer les valeurs dans des guillemets et des parenthèses. Exemple : `type:("api" OR "api-ssl")`.
* **Rechercher plusieurs facettes et du texte** : cliquez sur les valeurs de différents types de facette pour personnaliser une requête de recherche qui filtre les résultats selon plusieurs facettes. Exemple : `type:api region:aws:us-east-2`. Vous pouvez également utiliser à la fois des facettes et du texte. Exemple : `checkout type:browser`. Bien qu'il ne s'affiche pas, l'opérateur booléen `AND` est appliqué lorsque vous recherchez plusieurs termes à la fois.
* **Rechercher un message** : ajoutez un message pour créer une requête de recherche qui filtre les résultats selon les messages de notification de vos tests configurés dans le [monitor de test][5]. Exemple : `message:testcontent`.
* **Exclure des facettes ou du texte** : cliquez sur une case déjà cochée pour désélectionner une valeur de facette ou ajoutez `-` devant un terme pour l'exclure de la requête de recherche. Exemple : `-state:paused`.
* **Personnaliser les correspondances** : utilisez des wildcards (`*`). Exemple : `valid*`.

Pour rechercher un type de test Synthetic précis, sélectionnez-le sous la variable **Type**.

{{< img src="synthetics/search/facet-search.mp4" alt="Recherche par facette" video=true >}}

## Gérer vos tests

### Actions groupées

Gérez vos tests Synthetic de façon groupée en cochant les cases de plusieurs tests sur la [page de tests Synthetic][1]. Cliquez sur **Run Tests Now** ou sur **Delete** pour exécuter ou supprimer simultanément tous les tests Synthetic sélectionnés.

### Actions de test

Passez le curseur sur un test pour afficher sur la droite les icônes des options `Pause`, `Run Test Now`, `Edit`, `Clone` et `Delete`. L'option `Edit Recording` est disponible pour les tests Browser.

{{< img src="synthetics/search/action_tray.mp4" alt="Options de la barre d'actions" video="true" width="100%">}}

### Suivre les événements

La création, l'ajout et la suppression de tests Synthetic, de variables globales et d'emplacements privés entraînent la génération d'événements dans l'[Events Explorer][6]. Les événements décrivent les modifications survenues et indiquent les utilisateurs à l'origine de ces dernières.

Pour afficher toutes les modifications liées à Synthetic, recherchez les alertes de vos monitors de test dans la barre de recherche, ou sélectionnez un type d'événement sous la template variable **Event**. Exemple : `Event Type:synthetics_alert`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: /fr/synthetics/metrics/
[3]: /fr/synthetics/dashboards/
[4]: /fr/getting_started/tagging/using_tags/#synthetics
[5]: /fr/synthetics/guide/synthetic-test-monitors/
[6]: https://app.datadoghq.com/event/explorer