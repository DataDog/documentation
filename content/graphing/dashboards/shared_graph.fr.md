---
title: Graphiques partagés
kind: documentation
aliases:
  - /fr/graphing/faq/is-there-a-way-to-share-graphs
  - /fr/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
further_reading:
  - link: graphing/dashboards/
    tag: Documentation
    text: Apprenez à créer des dashboards dans Datadog
  - link: graphing/dashboards/template_variables
    tag: Documentation
    text: Améliorez vos dashboards avec les Template Variables
  - link: graphing/dashboards/widgets
    tag: Documentation
    text: Découvrez tous les widgets disponibles pour votre dashboard
---
## Présentation

Les graphiques partagés et les screenboards vous permettent d'afficher les visualisations de métrique, de trace et de log en dehors de Datadog tout en appliquant des restrictions d'accès à vos embeds.

## Partager un graphique spécifique

Pour partager un graphique à partir d'un [Timeboard][5] ou d'un [Screenboard][6] :

1. Choisissez un graphique.
2. Cliquez sur l'icône avec le crayon en haut à droite pour le modifier.
3. À l'étape 2 : *Graph your data* (Graphiques de vos données), sélectionnez l'onglet **share** :
4. Choisissez une période de temps fixe pour votre graphique.
5. Choisissez une taille de graphique.
6. Choisissez d'inclure ou non la légende.
7. Obtenez le code d'embed avec le bouton *Generate embed code*.

{{< img src="graphing/dashboards/shared_graph/share_graph.png" alt="Shared graph" responsive="true" style="width:75%;">}}

## Partager un screenboard

Partagez un screenboard entier en suivant la procédure suivante :

1. Cliquez sur l'icône d'engrenage en haut à droite de l'écran pour accéder aux paramètres.
2. Cliquez sur l'option *Generate public URL*.
3. Utilisez l'URL créée pour donner un accès en direct et en lecture seule aux contenus de ce screenboard seulement.

**Remarque** : Si vous avez activé le [Templating][13], le menu déroulant des Template Variables n'apparaît pas dans les vues partagées.

### Appliquer des restrictions

Vous pouvez restreindre l'accès à vos embeds en fonction de l'adresse IP. Envoyez un e-mail à [l'équipe de support Datadog][1] pour activer la fonction de liste blanche des adresses IP, qui permet aux administrateurs de fournir une liste des adresses IP autorisées à accéder aux dashboards partagés.

Ces graphiques partagés peuvent être intégrés à des outils externes en utilisant l'iframe fourni ou bien partagés directement en utilisant l'URL source fournie dans la zone de texte. Il est ensuite possible d'y accéder en externe sans autorisation supplémentaire. Une fois activées, gérez vos restrictions sur [la page de sécurité de votre organisation][14].

**Remarque** : Si vous avez activé les [Template Variables de dashboard][13], les menus déroulants des Template Variables n'apparaîtront pas dans les vues partagées. Nous déconseillons leur utilisation si vous prévoyez de partager les vues à l'extérieur de votre organisation.

## Révoquer les screenboards/graphiques partagés

### Révoquer un graphique partagé
Pour révoquer les clés utilisées pour partager vos graphiques :

1. [Accédez à **Integrations -> Embeds**][3] pour obtenir une liste de tous les graphiques partagés.
2. Cliquez sur le bouton **Revoke** correspondant au graphique que vous ne souhaitez plus partager.
3. Le graphique est alors déplacé dans la liste **Revoked**.

{{< img src="graphing/dashboards/shared_graph/embedded_graphs.png" alt="Embedded graph" responsive="true" style="width:75%;">}}

### Révoquer un screenboard

Pour révoquer un screenboard partagé :

1. Accédez à la liste des dashboards.
2. Sélectionnez le screenboard dont vous souhaitez révoquer l'accès.
3. Cliquez sur l'icône de paramétrage en forme d'engrenage pour le modifier.
4. Cliquez sur **Revoke public URL**.

## API

Datadog propose une [API dédiée][7] qui vous permet d'interagir avec vos embeds :

| Endpoint                 | Description                                                           |
| :---                     | :----                                                                 |
| [Récupérer tous les embeds][8]      | Obtenir la liste des graphiques intégrables précédemment créés.                  |
| [Création d'embed][9]        | Créer un graphique intégrable.                                       |
| [Récupérer un embed spécifique][10] | Obtenir le fragment HTML pour une embed générée précédemment avec embed_id. |
| [Activer un embed][11]       | Activer un embed spécifié.                                             |
| [Révoquer un embed][12]       | Révoquer un embed spécifié.                                             |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[3]: https://app.datadoghq.com/account/settings#embeds
[4]: /api/#embeds
[5]: /graphing/dashboards/timeboard
[6]: /graphing/dashboards/screenboard
[7]: /api/?lang=python#embeddable-graphs
[8]: /api/?lang=python#get-all-embeds
[9]: /api/?lang=python#create-embed
[10]: /api/?lang=python#get-specific-embed
[11]: /api/?lang=python#enable-embed
[12]: /api/?lang=python#revoke-embed
[13]: /graphing/dashboards/template_variables
[14]: https://app.datadoghq.com/account/org_security