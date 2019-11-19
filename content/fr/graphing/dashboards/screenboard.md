---
title: Screenboard
kind: documentation
further_reading:
  - link: graphing/dashboards/template_variables
    tag: Documentation
    text: Améliorer vos dashboards avec des template variables
  - link: graphing/dashboards/shared_graph
    tag: Documentation
    text: Partager vos graphiques en dehors de Datadog
  - link: graphing/widgets
    tag: Documentation
    text: Découvrir tous les widgets disponibles pour votre dashboard
---
Les screenboards sont des dashboards qui vous permettent de représenter librement de nombreux objets tels que des images, des graphiques ou des logs. Généralement utilisés pour visualiser les statuts de vos services et pour mettre en récit vos données, ils peuvent être mis à jour en temps réel ou représenter des points fixes historiques.

## Sélecteur d'intervalle global

Pour utiliser le sélecteur d'intervalle global sur un screenboard, au moins un widget affichant des données sur un intervalle de temps doit utiliser l'option `Global Time`. Pour définir cette option, modifiez un widget en accédant à **Set display preferences** ou ajoutez-en un autre (global time est le paramètre par défaut).

Le sélecteur d'intervalle global vous permet de définir le même intervalle de temps pour tous les widgets  qui utilisent l'option `Global Time` au sein d'un même screenboard. Vous pouvez sélectionner un intervalle dynamique situé dans le passé (`The Past Hour`, `The Past Day`, etc.) ou un intervalle fixe avec l'option `Select Range`. Si vous avez choisi un intervalle dynamique, les widgets sont mis à jour toutes les quelques millisecondes afin de refléter votre sélection.

Les widgets qui n'utilisent pas l'intervalle global affichent les données correspondant à leur intervalle local en fonction de l'intervalle global. Par exemple, si l'intervalle global s'étend du 1er janvier 2019 au 2 janvier 2019 et que l'intervalle local d'un widget est défini sur `The Past Minute`, celui-ci affichera la dernière minute du 2 janvier 2019 à partir de 23 h 59.

## Mode TV

Les screenboards sont particulièrement utiles pour afficher des métriques de performance clé en grand format, notamment sur une TV. Pour activer le mode TV, utilisez le raccourci clavier `K` ou cliquez sur l'icône TV d'un screenboard.

## Paramètres

### Generate public URL

Partagez un screenboard avec d'autres personnes en dehors de Datadog en générant une URL publique. Pour en savoir plus, consultez la page [Partager un screenboard][1].

### Display UTC time

Basculez entre l'heure UTC et votre fuseau horaire par défaut.

### Notifications

Si les notifications sont activées pour un screenboard, un événement est créé dans le [flux d'événements][2]. Cet événement permet d'être informé en cas de modification du texte, de modification d'un widget, de duplication d'un screenboard ou de suppression d'un screenboard, ainsi que du nom de l'utilisateur à l'origine de cette action.

Les utilisateurs ayant activé les notifications reçoivent également une alerte par e-mail. Tous les utilisateurs de l'organisation peuvent choisir de recevoir des notifications en cas de modification d'un screenboard, même s'ils ne disposent pas de droits d'administration.

Lorsque les notifications sont activées pour un dashboard, vous pouvez consulter les événements de modification depuis le flux d'événements avec la recherche suivante :

```
tags:audit,dash
```

Pour restreindre votre recherche à un dashboard spécifique, spécifiez le nom du dashboard dans la recherche.

### Permissions

Le créateur et les [administrateurs][3] d'un screenboard ont la possibilité d'activer le mode lecture seule, qui empêche toute modification du screenboard par les utilisateurs classiques.

En mode lecture seule, les utilisateurs non-administrateurs peuvent toujours dupliquer le timeboard, réorganiser les carrés, prendre un snapshot d'un carré ou afficher un carré en plein écran. Tout réarrangement des carrés par un non-administrateur sera uniquement temporaire.

### Clone dashboard

Utilisez cette option pour copier le screenboard entier et en créer un autre à l'identique. Vous devrez donner un nom au nouveau screenboard.

### Copy/Import/Export dashboard JSON

Consultez la [documentation principale sur les dashboards][4] pour découvrir comment copier, importer ou exporter le JSON d'un dashboard.

### Delete dashboard

Utilisez cette option pour supprimer définitivement votre screenboard. Vous serez invité à confirmer votre choix.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/dashboards/shared_graph/#screenboard-sharing
[2]: /fr/graphing/event_stream
[3]: /fr/account_management/team/#datadog-user-roles
[4]: /fr/graphing/dashboards/#copy-import-export