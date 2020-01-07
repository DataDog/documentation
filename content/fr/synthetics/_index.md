---
title: Synthetics
kind: documentation
description: Assurez-vous que les aspects les plus importants de votre produit fonctionnent correctement à différents endroits du monde.
aliases:
  - /fr/integrations/synthetics/
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: "Présentation de Datadog\_Synthetics"
  - link: synthetics/api_tests
    tag: Documentation
    text: Configurer un test API
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: synthetics/identify_synthetics_bots
    tag: Documentation
    text: Identifier les Bots Synthetics
---
## Présentation

Datadog Synthetics vous offre encore plus de visibilité sur la plateforme Datadog. En surveillant vos applications et les endpoints de l'API grâce à des simulations de requêtes utilisateur et au rendu de votre navigateur, Synthetics vous aide à garantir la disponibilité, à identifier les problèmes par région et à suivre les performances de l'application. En associant Synthetics à vos métriques, vos traces et vos logs, Datadog vous permet d'observer le fonctionnement de tous vos systèmes du point de vue de vos utilisateurs.

{{< img src="synthetics/synthetics_home_page.png" alt="Page d'accueil de Synthetics" >}}

## Recherche

La recherche avancée vous permet d'interroger les checks en combinant différents attributs :

* `title` et `message` : recherche de texte
* `status` : Alert, No Data, Ok
* `creator`
* `region`
* `muted`
* `notification`
* `tags`

Pour lancer une recherche, rédigez votre requête en utilisant les cases à cocher sur la gauche et/ou la barre de recherche en haut. La barre de recherche est mise à jour avec la requête équivalente lorsque vous cochez des cases. De même, lorsque vous modifiez la requête de la barre de recherche (ou rédigez vous-même votre propre requête), les cases à cocher se mettent à jour pour refléter ces modifications. Les résultats de la requête sont toujours mis à jour en temps réel lorsque vous modifiez la requête. Vous n'avez pas besoin de cliquer sur un bouton « Rechercher ».

### Rédiger une requête

Pour rechercher un texte précis dans tous les checks, titres et messages de notification, saisissez-le dans la barre de recherche.

Vous pouvez également utiliser des opérateurs booléens (`AND`, `OR` et `NOT`) ainsi que des parenthèses pour rédiger des requêtes complexes avec n'importe quel champ de check :

* Les expressions régulières ne sont pas prises en charge.
* Le wildcard de caractère unique (`?`) n'est pas pris en charge, mais le wildcard global (`*`) l'est.
* Les recherches de proximité ne sont pas prises en charge, mais l'opérateur [fuzzy][1] l'est.
* Les plages ne sont pas prises en charge.
* Le boosting n'est pas pris en charge.

Enfin, les caractères suivants sont réservés : `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.` et les espaces. Pour rechercher des champs de check qui incluent l'un d'entre eux, ajoutez des guillemets entre le nom du champ. `status:("OK") AND "doc-check"` est une chaîne de requête valide, mais `status:("OK") AND doc check` ne l'est pas.

## Créer un check

Sélectionnez **Create a New check +** dans le coin supérieur droit de la page Synthetics pour créer un [test API][2] ou un [test Browser][3]. Si un test échoue, l'endpoint n'est pas testé une seconde fois : l'uptime considère directement que l'endpoint est `down`.

{{< img src="synthetics/create_a_check.png" alt="Créer un check"  style="width:80%;">}}

## Métriques

Les métriques suivantes sont générées par les checks Synthetics :

* Les métriques qui commencent par `synthetics.browser.*` proviennent de vos [tests Browser][4].
* Les métriques qui commencent par `synthetics.http.*` proviennent de vos [tests API HTTP][5].
* Les métriques qui commencent par `synthetics.ssl.*` proviennent de vos [test API SSL][6].

{{< get-metrics-from-git "synthetics" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[2]: /fr/synthetics/api_tests
[3]: /fr/synthetics/browser_tests
[4]: /fr/synthetics/browser_tests
[5]: /fr/synthetics/api_tests/?tab=httptest
[6]: /fr/synthetics/api_tests/?tab=ssltest