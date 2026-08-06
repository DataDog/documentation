---
aliases:
- /fr/graphing/faq/is-there-a-way-to-share-graphs
- /fr/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
- /fr/graphing/dashboards/shared_graph/
description: Générez des codes d'embed pour des graphiques individuels et gérez les
  autorisations de partage avec des révocations d'accès et des restrictions d'IP.
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Partager des dashboards en toute sécurité avec des utilisateurs en dehors
    de votre organisation
- link: /dashboards/
  tag: Documentation
  text: Créer des dashboards dans Datadog
- link: /dashboards/guide/embeddable-graphs-with-template-variables/
  tag: Guide
  text: Graphiques intégrés avec variables de modèle
- link: /dashboards/widgets/
  tag: Documentation
  text: Découvrir les widgets disponibles pour votre dashboard
title: Partager des graphiques
---

Pour partager un graphique, procédez comme suit :

1. Cliquez sur l'icône en forme de crayon en haut à droite du graphique que vous souhaitez partager.
1. Dans la section *Graph your data*, sélectionnez l'onglet **Share**.
1. Choisissez un intervalle pour votre graphique.
1. Choisissez la taille de votre graphique.
1. Choisissez d'inclure ou non la légende.
1. Cliquez sur le bouton **Generate embed code** pour obtenir le code de l'embed.

{{< img src="dashboards/sharing/graph_share_tab.png" alt="Onglet Share dans l'éditeur graphique" style="width:95%;">}}

Tous les graphiques partagés sont répertoriés sur la [page Public Sharing Settings][10]. Depuis cette page, vous pouvez également révoquer l'accès à des graphiques partagés individuels ou désactiver tous les graphiques partagés.

## Révoquer l'accès

Pour révoquer les clés utilisées pour partager des graphiques (intégrés) individuels :

1. Accédez à [**Organization Settings > Public Sharing > Shared Graphs**][1] pour afficher la liste de tous les graphiques partagés.
2. Utilisez la barre de recherche ou triez les colonnes du tableau pour accéder à votre graphique.
3. Cliquez sur le bouton **Revoke** correspondant au graphique que vous ne souhaitez plus partager.

## Appliquer des restrictions

Vous pouvez restreindre l'accès à votre dashboard en fonction des adresses IP. Envoyez un e-mail à l'[assistance Datadog][2] pour activer cette fonctionnalité. Les administrateurs pourront alors spécifier la liste des adresses IP autorisées à accéder aux dashboards partagés. Une fois cette fonctionnalité activée, consultez la [Public Sharing][3] de votre organisation pour gérer les restrictions.

## API

Datadog propose une [API dédiée][4] qui vous permet d'interagir avec vos graphiques partagés (embeds) :

| Endpoint                 | Description                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Obtenir tous les embeds][5]     | Récupère la liste des graphiques intégrables précédemment créés.                     |
| [Créer un embed][6]       | Crée un nouveau graphique intégrable.                                         |
| [Récupérer un embed spécifique][7] | Récupérez le fragment HTML d'un embed généré précédemment avec `embed_id`. |
| [Activer un embed][8]       | Active l'embed spécifié.                                             |
| [Révoquer un embed][9]       | Révoque l'embed spécifié.                                             |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/public-sharing/shared-graphs
[2]: /fr/help/
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[4]: /fr/api/latest/embeddable-graphs/
[5]: /fr/api/latest/embeddable-graphs/#get-all-embeds
[6]: /fr/api/latest/embeddable-graphs/#create-embed
[7]: /fr/api/latest/embeddable-graphs/#get-specific-embed
[8]: /fr/api/latest/embeddable-graphs/#enable-embed
[9]: /fr/api/latest/embeddable-graphs/#revoke-embed
[10]: https://app.datadoghq.com/organization-settings/public-sharing