---
title: Screenboards
kind: documentation
aliases:
  - /fr/graphing/dashboards/screenboards/
  - /fr/graphing/dashboards/screenboard/
  - /fr/dashboards/screenboard/
further_reading:
  - link: /dashboards/template_variables/
    tag: Documentation
    text: Améliorer vos dashboards avec les template variables
  - link: /dashboards/sharing/
    tag: Documentation
    text: Partager vos graphiques en dehors de Datadog
  - link: /dashboards/widgets/
    tag: Documentation
    text: Découvrir tous les widgets disponibles pour votre dashboard
---
Les screenboards sont des dashboards qui vous permettent de représenter librement de nombreux objets tels que des images, des graphiques ou des logs. Généralement utilisés pour visualiser les statuts de vos services et pour mettre en récit vos données, ils peuvent être mis à jour en temps réel ou représenter des points fixes historiques.

## Sélecteur d'intervalle global

Pour utiliser le sélecteur d'intervalle global sur un screenboard, au moins un widget affichant des données sur un intervalle de temps doit utiliser l'option `Global Time`. Pour définir cette option, modifiez un widget en accédant à **Set display preferences** ou ajoutez-en un autre (global time est le paramètre par défaut).

Le sélecteur d'intervalle global vous permet de définir le même intervalle de temps pour tous les widgets qui utilisent l'option `Global Time` au sein d'un même screenboard. Vous pouvez sélectionner un intervalle dynamique situé dans le passé (`Past 1 Hour`, `Past 1 Day`, etc.), ou un intervalle fixe en utilisant l'option `Select from calendar…` ou en [saisissant un intervalle personnalisé][1]. Si vous avez choisi un intervalle dynamique, les widgets sont mis à jour afin de refléter votre sélection.

Les widgets qui n'utilisent pas l'intervalle global affichent les données correspondant à leur intervalle local en fonction de l'intervalle global. Par exemple, si l'intervalle global s'étend du 1er janvier 2019 au 2 janvier 2019 et que l'intervalle local d'un widget est défini sur `Past 1 Minute`, celui-ci affichera la dernière minute du 2 janvier 2019 à partir de 23 h 59.

## Mode TV

Les screenboards sont particulièrement utiles pour afficher des métriques de performance clé en grand format, notamment sur une TV. Pour activer le mode TV, utilisez le raccourci clavier `F` ou cliquez sur l'icône TV d'un screenboard.

## Paramètres

### Generate public URL

Partagez un screenboard avec d'autres personnes en dehors de Datadog en générant une URL publique. Pour en savoir plus, consultez la page [Partager un screenboard][2].

### Display UTC time

Basculez entre l'heure UTC et votre fuseau horaire par défaut.

### Notifications

Si les notifications sont activées pour un screenboard, un événement est créé dans le [flux d'événements][3]. Cet événement permet d'être informé en cas de modification du texte, de modification d'un widget, de duplication d'un screenboard ou de suppression d'un screenboard, et de connaître le nom de l'utilisateur à l'origine de cette action.

Les utilisateurs ayant activé les notifications reçoivent également une alerte par e-mail. Tous les utilisateurs de l'organisation peuvent choisir de recevoir des notifications en cas de modification d'un screenboard, même s'ils ne disposent pas de droits d'administration.

Lorsque les notifications sont activées pour un dashboard, vous pouvez consulter les événements de modification depuis le flux d'événements avec la recherche suivante :

```text
tags:audit,dash
```

Pour restreindre votre recherche à un dashboard spécifique, spécifiez le nom du dashboard dans la recherche.

### Permissions

Le créateur et les [administrateurs][4] d'un screenboard ont la possibilité d'activer le mode lecture seule, qui empêche toute modification du screenboard par les utilisateurs classiques.

En mode lecture seule, les utilisateurs non-administrateurs peuvent toujours dupliquer le timeboard, réorganiser les carrés, prendre un snapshot d'un carré ou afficher un carré en plein écran. Tout réarrangement des carrés par un non-administrateur sera uniquement temporaire.

### Clone dashboard

Utilisez cette option pour copier le screenboard entier et en créer un autre à l'identique. Vous devrez donner un nom au nouveau screenboard.

### Copy/Import/Export dashboard JSON

Consultez la [documentation principale sur les dashboards][5] pour découvrir comment copier, importer ou exporter le JSON d'un dashboard.

### Delete dashboard

Utilisez cette option pour supprimer définitivement votre screenboard. Vous serez invité à confirmer votre choix.

## Menu des graphiques

Cliquez sur un graphique de screenboard pour ouvrir le menu des options :

| Option                 | Description                                                   |
|------------------------|---------------------------------------------------------------|
| View in full screen    | Affichez le graphique [en plein écran][6].                     |
| View related processes | Accédez à la page [Live Processes][7] en appliquant un filtre basé sur votre graphique.   |
| View related hosts     | Accédez à la page [Host Map][8] en appliquant un filtre basé sur votre graphique.         |
| View related logs      | Remplissez automatiquement un volet de [logs][9] à partir des données de votre graphique.             |
| View related traces    | Remplissez automatiquement un volet de [traces][10] à partir des données de votre graphique.          |
| View related profiles  | Accédez à la page [Profiling][11] en appliquant un filtre basé sur votre graphique.       |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/guide/custom_time_frames/
[2]: /fr/dashboards/sharing/#dashboards
[3]: /fr/events/
[4]: /fr/account_management/users/default_roles/
[5]: /fr/dashboards/#copy-import-export
[6]: /fr/dashboards/widgets/#full-screen
[7]: https://app.datadoghq.com/process
[8]: https://app.datadoghq.com/infrastructure/map
[9]: /fr/logs/
[10]: /fr/tracing/
[11]: /fr/tracing/profiler/