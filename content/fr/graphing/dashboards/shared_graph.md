---
title: Graphiques partagés
kind: documentation
aliases:
  - /fr/graphing/faq/is-there-a-way-to-share-graphs
  - /fr/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
further_reading:
  - link: graphing/dashboards/
    tag: Documentation
    text: Apprendre à créer des dashboards dans Datadog
  - link: graphing/dashboards/template_variables
    tag: Documentation
    text: Améliorer vos dashboards avec des template variables
  - link: graphing/widgets
    tag: Documentation
    text: Découvrir tous les widgets disponibles pour votre dashboard
---
## Présentation

Les graphiques et les screenboards partagés vous permettent d'afficher des visualisations de métrique, de trace et de log en dehors de Datadog tout en appliquant des restrictions d'accès à vos embeds.

## Partager un graphique spécifique

Pour partager un graphique à partir d'un [timeboard][1] ou d'un [screenboard][2] :

1. Choisissez un graphique.
2. Cliquez sur l'icône en forme de crayon dans le coin supérieur droit pour le modifier.
3. Pour l'étape 2, *Graph your data*, sélectionnez l'onglet **share** :
4. Choisissez un intervalle fixe pour votre graphique.
5. Choisissez une taille de graphique.
6. Choisissez d'inclure ou non la légende.
7. Cliquez sur le bouton *Generate embed code* pour obtenir le code de l'embed.

{{< img src="graphing/dashboards/shared_graph/share_graph.png" alt="Graphique partagé" responsive="true" style="width:75%;">}}

**Remarque** : la fonctionnalité de partage n'est pas disponible pour les requêtes d'APM et de log.

## Partager un screenboard

Partagez un screenboard entier en suivant la procédure suivante :

1. Cliquez sur l'icône d'engrenage en haut à droite de l'écran pour accéder aux paramètres.
2. Cliquez sur l'option *Generate public URL*.
3. Utilisez l'URL créée pour donner un accès en direct et en lecture seule uniquement pour le contenu de ce screenboard.

**Remarque** : si vous avez activé la [création de modèles][3], le menu déroulant de Template Variables n'est pas disponible dans les vues partagées et les widgets basés sur des requêtes d'APM et de log n'affichent aucune donnée.

### Appliquer des restrictions

Vous pouvez restreindre l'accès à votre embed en fonction de l'adresse IP. Envoyez un e-mail à [l'équipe d'assistance Datadog][4] pour activer la fonctionnalité d'ajout d'adresses IP à la liste blanche afin de permettre aux administrateurs de spécifier les adresses IP autorisées à accéder aux dashboards partagés.

Ces graphiques partagés peuvent être intégrés à des outils externes à l'aide de l'iframe fourni ou être directement partagés à l'aide de l'URL source incluse dans la zone de texte. Cette URL offre un accès externe sans qu'aucune autorisation supplémentaire ne soit nécessaire. Une fois cette fonctionnalité activée, vous pouvez gérer vos restrictions sur [la page relative à la sécurité de votre organisation][5].

**Remarque** : si vous avez activé les [Template Variables de dashboard][3], les menus déroulants de Template Variables ne seront pas disponibles dans les vues partagées. Nous vous déconseillons de les utiliser si vous prévoyez de partager les vues en dehors de votre organisation.

## Révoquer des screenboards/graphiques partagés

### Révoquer des graphiques intégrés
Pour révoquer les clés utilisées pour partager vos graphiques :

1. [Accédez à **Integrations -> Embeds**][6] pour consulter la liste de tous les graphiques partagés.
2. Cliquez sur le bouton **Revoke** correspondant au graphique que vous ne souhaitez plus partager.
3. Le graphique est alors déplacé vers la liste **Revoked**.

{{< img src="graphing/dashboards/shared_graph/embedded_graphs.png" alt="Graphique intégré" responsive="true" style="width:75%;">}}

### Révoquer un screenboard

Pour révoquer un screenboard partagé :

1. Accédez à la liste des dashboards.
2. Sélectionnez le screenboard dont vous souhaitez révoquer l'accès.
3. Cliquez sur l'icône en forme d'engrenage pour le modifier.
4. Cliquez sur **Revoke public URL**.

## API

Datadog propose une [API dédiée][7] qui vous permet d'interagir avec vos embeds :

| Endpoint                 | Description                                                           |
| :---                     | :----                                                                 |
| [Récupérer tous les embeds][8]      | Récupère la liste des graphiques intégrables précédemment créés.                  |
| [Créer un embed][9]        | Crée un nouveau graphique intégrable.                                       |
| [Récupérer un embed spécifique][10] | Récupère le fragment HTML d'un embed généré précédemment avec embed_id. |
| [Activer un embed][11]       | Active un embed spécifié.                                             |
| [Révoquer un embed][12]       | Révoque un embed spécifié.                                             |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/dashboards/timeboard
[2]: /fr/graphing/dashboards/screenboard
[3]: /fr/graphing/dashboards/template_variables
[4]: /fr/help
[5]: https://app.datadoghq.com/account/org_security
[6]: https://app.datadoghq.com/account/settings#embeds
[7]: /fr/api/?lang=python#embeddable-graphs
[8]: /fr/api/?lang=python#get-all-embeds
[9]: /fr/api/?lang=python#create-embed
[10]: /fr/api/?lang=python#get-specific-embed
[11]: /fr/api/?lang=python#enable-embed
[12]: /fr/api/?lang=python#revoke-embed