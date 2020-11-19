---
title: Timeboards
kind: documentation
aliases:
  - /fr/graphing/dashboards/timeboard/
  - /fr/dashboards/timeboard/
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
Les timeboards sont automatiquement mis en forme et représentent un point unique (fixe ou mis à jour en temps réel) sur l'ensemble du dashboard. Ils sont généralement utilisés pour dépanner, mettre en corrélation et explorer les données.

**Remarque** : tous les graphiques d'un timeboard sont contrôlé par un unique paramètre. Pour modifier l'intervalle d'un graphique précis, utilisez un [screenboard][1].

## Mode TV

Utilisez le mode TV pour afficher votre timeboard sur de grands écrans ou des téléviseurs en cliquant sur l'icône TV sur le timeboard ou en utilisant le raccourci clavier `F`.

## Paramètres

Les réglages des timeboards sont les mêmes que ceux des screenboards, à l'exception de la création d'URL publiques :

* [Display UTC time][2]
* [Notifications][3]
* [Permissions][4]
* [Clone dashboard][5]
* [Copy, import, or export dashboard JSON][6]
* [Delete dashboard][7]

## Ajout de graphiques

Après avoir [créé votre timeboard][8], ajoutez des graphiques à l'aide du bouton **Edit widgets** ou du lien **Add graph**, puis faites glisser le [widget][9] approprié vers le timeboard.

## Rechercher des monitors

### Événements

Pour configurer une superposition d'événements, cliquez sur le lien **Search...** dans le coin supérieur gauche, sélectionnez **Événements**, puis saisissez une [requête][10] dans la zone de recherche. Cela remplace les superpositions d'événements ajoutées lors de la conception du timeboard et applique les réglages à l'ensemble des graphiques. La superposition affiche le nombre d'occurrences des événements sur vos graphiques de séries temporelles et présente la liste des événements à droite de la fenêtre.

{{< img src="dashboards/timeboard/events_overlay.png" alt="Superposition d'événements" style="width:75%;">}}

### Logs

Pour configurer une superposition de logs, cliquez sur le lien **Search...** dans le coin supérieur gauche, sélectionnez **Logs**, puis saisissez une [requête][11] dans la zone de recherche. La superposition affiche le nombre d'occurrences des logs sur vos graphiques de séries temporelles et présente la liste des logs à droite de la fenêtre.

## Menu des graphiques

Cliquez sur un graphique de série temporelle d'un dashboard pour ouvrir le menu des options :

| Option                 | Description                                                   |
|------------------------|---------------------------------------------------------------|
| Send snapshot          | Créez et envoyez un snapshot de votre graphique.                     |
| Find correlated metrics| Trouvez des corrélations entre des services APM, des intégrations et des dashboards. |
| View in full screen    | Affichez le graphique [en plein écran][12].                     |
| Lock cursor            | Verrouillez l'emplacement du curseur sur la page.                         |
| View related processes | Accédez à la page [Live Processes][13] en appliquant un filtre basé sur votre graphique.   |
| View related hosts     | Accédez à la page [Host Map][14] en appliquant un filtre basé sur votre graphique.         |
| View related logs      | Accédez à la page [Log Explorer][15] en appliquant un filtre basé sur votre graphique.     |
| View related traces    | Remplissez automatiquement un volet de [traces][16] à partir des données de votre graphique.           |
| View related profiles  | Accédez à la page [Profiling][17] en appliquant un filtre basé sur votre graphique.        |
### Requête de recherche de logs

La requête de recherche pour **View related logs** est définie à l'aide des paramètres suivants :;

* **Intervalle** : ce paramètre, axé sur le point de données sélectionné, utilise la taille de compartiment temporel du graphique pour afficher les données avant et après le point sélectionné.
* **Préfixe d'intégration** : si la métrique provient d'une intégration, Datadog filtre l'attribut `source` avec le nom de l'intégration.
* **Tags** : tous les tags utilisés dans le graphique (*template variable*, *split by*, *filter by*) sont automatiquement ajoutés à la requête de recherche.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/screenboard/
[2]: /fr/dashboards/screenboards/#display-utc-time
[3]: /fr/dashboards/screenboards/#notifications
[4]: /fr/dashboards/screenboards/#permissions
[5]: /fr/dashboards/screenboards/#clone-dashboard
[6]: /fr/dashboards/screenboards/#copy-import-or-export-dashboard-json
[7]: /fr/dashboards/screenboards/#delete-dashboard
[8]: /fr/dashboards/#new-dashboard
[9]: /fr/dashboards/widgets/
[10]: /fr/events/#event-query-language
[11]: /fr/logs/search_syntax/
[12]: /fr/dashboards/widgets/#full-screen
[13]: https://app.datadoghq.com/process
[14]: https://app.datadoghq.com/infrastructure/map
[15]: https://app.datadoghq.com/logs
[16]: /fr/tracing/
[17]: /fr/tracing/profiler/