---
title: Vue Timeboard
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

Pour passer de la [disposition Dashboard][1] à la disposition Timeboard, ouvrez le menu des réglages, cliquez sur `Pick Layout`, puis sélectionnez `Automatic`.

{{< img src="dashboards/auto-layout.png" alt="Disposition automatique pour un dashboard" style="width:70%;">}}

## Recherche

### Événements

Pour configurer une superposition d'événements, cliquez sur le lien **Search...** dans le coin supérieur gauche, sélectionnez **Events**, puis saisissez une [requête][2] dans la zone de recherche. Cela remplace les superpositions d'événements ajoutées lors de la conception du timeboard et applique les réglages à l'ensemble des graphiques. La superposition affiche le nombre d'occurrences des événements sur vos graphiques de série temporelle et présente la liste des événements à droite de la fenêtre.

{{< img src="dashboards/timeboard/events_overlay.png" alt="Superposition d'événements" style="width:75%;">}}

### Logs

Pour configurer une superposition de logs, cliquez sur le lien **Search...** dans le coin supérieur gauche, sélectionnez **Logs**, puis saisissez une [requête][3] dans la zone de recherche. La superposition affiche le nombre d'occurrences des logs sur vos graphiques de série temporelle et présente la liste des logs à droite de la fenêtre.

## Menu des graphiques

Cliquez sur un graphique de série temporelle d'un dashboard pour ouvrir le menu des options :

| Option                 | Description                                                   |
|------------------------|---------------------------------------------------------------|
| Send snapshot          | Créez et envoyez un snapshot de votre graphique.                     |
| Find correlated metrics| Trouvez des corrélations entre des services APM, des intégrations et des dashboards. |
| View in full screen    | Afficher le graphique [en plein écran][4].                     |
| Lock cursor            | Verrouillez l'emplacement du curseur sur la page.                         |
| View related processes | Accédez à la page [Live Processes][5] en appliquant un filtre basé sur votre graphique.   |
| View related hosts     | Accédez à la page [Host Map][6] en appliquant un filtre basé sur votre graphique.         |
| View related logs      | Accédez à la page [Log Explorer][7] en appliquant un filtre basé sur votre graphique.     |
| View related traces    | Remplissez automatiquement un volet de [traces][8] à partir des données de votre graphique.           |
| View related profiles  | Accédez à la page [Profiling][9] en appliquant un filtre basé sur votre graphique.        |
### Requête de recherche de logs

La requête de recherche pour **View related logs** est définie à l'aide des paramètres suivants :;

* **Intervalle** : ce paramètre, axé sur le point de données sélectionné, utilise la taille de compartiment temporel du graphique pour afficher les données avant et après le point sélectionné.
* **Préfixe d'intégration** : si la métrique provient d'une intégration, Datadog filtre l'attribut `source` avec le nom de l'intégration.
* **Tags** : tous les tags utilisés dans le graphique (*template variable*, *split by*, *filter by*) sont automatiquement ajoutés à la requête de recherche.

## Conseils et astuces

- Cliquez sur l'icône d'un widget pour l'ajouter au dashboard sans avoir à le faire glisser (vous pouvez également utiliser les raccourcis clavier `N` et `Maj + N`).
- Cliquez deux fois sur la poignée de redimensionnement en bas à gauche ou en bas à droite d'un widget pour qu'il occupe instantanément tout l'espace vide adjacent.
- Cliquez sur un espace vide et faites glisser votre curseur pour utiliser l'outil de lasso.
- Si plusieurs widgets sont sélectionnés, un menu d'action s'affiche. Il vous permet d'effectuer des actions groupées.
- Appuyez sur les touches `Cmd + G` ou `Ctrl + G` pour regrouper les widgets sélectionnés.
- Utilisez le menu des réglages au niveau de l'en-tête du dashboard pour développer ou réduire tous les groupes d'un dashboard.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/dashboard
[2]: /fr/events/#event-query-language
[3]: /fr/logs/search_syntax/
[4]: /fr/dashboards/widgets/#full-screen
[5]: https://app.datadoghq.com/process
[6]: https://app.datadoghq.com/infrastructure/map
[7]: https://app.datadoghq.com/logs
[8]: /fr/tracing/
[9]: /fr/tracing/profiler/