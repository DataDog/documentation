---
description: Recherchez et gérez vos tests Synthetic.
further_reading:
- link: /getting_started/synthetics/
  tag: Documentation
  text: Débuter avec la surveillance Synthetic
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Pratiques recommandées pour la création de tests de bout en bout
- link: https://www.datadoghq.com/blog/test-maintenance-best-practices/
  tag: Blog
  text: Pratiques recommandées pour la gestion de tests de bout en bout
- link: /synthetics/ci_results_explorer
  tag: Documentation
  text: Explorateur de résultats CI
kind: documentation
title: Rechercher et gérer des tests Synthetic
---

## Présentation

Visualisez, gérez et effectuez des recherches parmi tous vos tests sur la [page de tests Synthetic][1] ou l'[explorateur de résultats CI][2]. 

Trouvez rapidement les tests qui vous intéressent à l'aide de facettes, visualisez rapidement l'état de votre application avec le graphique d'uptime global et de temps de réponse, et gérez vos tests grâce aux fonctionnalités de traitement groupé.

Pour en savoir plus sur l'explorateur de résultats CI, consultez la [documentation à ce sujet][3].

## Recherche

### Facettes et tags

Le volet **Synthetics Filters** à gauche de la page affiche plusieurs facettes par défaut que vous pouvez utiliser pour effectuer des recherches parmi vos tests. Voici les facettes par défaut :

| Facette          | Description                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `Type`         | Le type de test Synthetic : `browser`, `api`, `api-ssl`, `api-tcp`, `api-dns` |
| `Status`       | Le statut du test Synthetic : `OK`, `Alert`, `No Data`                           |
| `Creator`      | Le créateur du test Synthetic                                             |
| `Region`       | Les emplacements (gérés et privés) à partir desquels le test Synthetic s'exécute        |
| `State`        | L'état du test Synthetic : `live`, `paused`                             |
| `Notification` | Le handle utilisé par le test Synthetic pour les notifications                       |
| `Env`          | L'environnement sur lequel le test Synthetic s'exécute                              |
| `Tag`          | Le tag attribué au test Synthetic                                        |

### Créer votre requête

Pour effectuer des recherches parmi vos tests Synthetic, cliquez sur les facettes dans le volet de gauche ou écrivez votre propre requête personnalisée depuis la barre de recherche. Lorsque vous sélectionnez ou désélectionnez des valeurs de facette dans le volet ou dans la barre de recherche, la barre de recherche se met automatiquement à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou rédigez vous-même votre propre requête), les cases à cocher se mettent à jour pour refléter les modifications. Les résultats de la requête sont mis à jour en temps réel lorsque vous modifiez la requête. Vous n'avez pas besoin de cliquer sur un bouton « Rechercher ».

* **Rechercher une chaîne de texte simple** : saisissez votre texte dans la barre de recherche pour rechercher un nom de test.
* **Rechercher une seule facette** : cliquez sur la valeur d'une facette pour créer une requête de recherche qui comprend uniquement cette valeur de facette. Exemple : `type:api`. Pour ajouter une autre valeur de la même facette à votre recherche, cliquez sur la case à cocher de l'autre valeur ou ajouter l'autre valeur avec un opérateur booléen `OR` et insérez les valeurs dans des guillemets et des parenthèses. Exemple : `type:("api" OR "api-ssl")`.
* **Rechercher plusieurs facettes et du texte** : cliquez sur les valeurs de différentes facettes pour filtrer les résultats de recherche selon plusieurs facettes. Exemple : `type:api``region:aws:us-east-2`. Vous pouvez également mélanger des facettes et du texte. Exemple : `checkout type:browser`. Bien qu'il ne s'affiche pas, l'opérateur booléen `AND` est appliqué lorsque vous recherchez plusieurs termes à la fois.
* **Rechercher un message** : utilisez « message » dans votre requête pour rechercher parmi les messages de notification de vos tests (qui se trouvent dans la propriété **Message**). Par exemple, `message:testcontent`.
* **Exclure des facettes ou du texte** : cliquez sur une case déjà cochée pour désélectionner une valeur de facette ou ajoutez `-` devant votre terme pour l'exclure de la requête de recherche. Exemple : `-state:paused`.
* **Personnaliser les correspondances** : utilisez des wildcards (`*`). Exemple : `valid*`.

Si vous souhaitez effectuer une recherche parmi les tests Browser uniquement, cliquez sur **Browser Test** dans le volet de gauche. Cliquez à nouveau sur cette facette pour resélectionner tous vos tests, quel que soit leur type.

{{< img src="synthetics/search/facet-search.mp4" alt="Recherche par facette" video=true >}}

## Gérer vos tests

### Traitement groupé

Pour effectuer des actions groupées sur vos tests Synthetic depuis la liste des tests, cliquez sur les cases à cocher de plusieurs tests dans le tableau ou cliquez sur la case à cocher `State` pour sélectionner tous les tests de la page.
Une fois votre sélection effectuée, choisissez `Run Tests Now` ou `Delete` pour exécuter ou supprimer tous les tests Synthetic sélectionnés.

{{< img src="synthetics/search/bulk-edit.png" alt="Modification groupée" >}}

### Options de la barre d'actions

Passez le curseur sur un test du tableau pour afficher les options `Pause`, `Run Test Now`, `Edit`, `Clone` et `Delete`. L'option `Edit Recording` est également disponible pour les tests Browser.

{{< img src="synthetics/search/action_tray.mp4" alt="Options de la barre d'actions" video="true" width="100%">}}

### Événements d'audit

La création, l'ajout et la suppression de tests Synthetic, de variables globales et d'emplacements privés entraînent la création d'événements dans l'[Events Explorer][4]. Les événements générés décrivent la modification et affichent l'utilisateur à son origine.

Pour visualiser toutes les modifications associées à la surveillance Synthetics, recherchez `tags:(audit AND synthetics)` dans l'Events Explorer. Pour visualiser les modifications associées à un test spécifique, recherchez l'ID de votre test. Exemple : `tags:"public_id:7sp-azg-r5m"`.

{{< img src="synthetics/search/audit_events.png" alt="Événements d'audit de surveillance Synthetic" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: https://app.datadoghq.com/synthetics/explorer/ci
[3]: /fr/synthetics/ci_results_explorer
[4]: /fr/events/