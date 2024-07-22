---
further_reading:
- link: /real_user_monitoring/explorer/group/
  tag: Documentation
  text: Regrouper des événements RUM interrogés
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: Appliquer des visualisations sur vos événements
title: Rechercher des événements RUM
---

## Présentation

Lorsque vous appliquez un intervalle en haut à droite de la vue RUM Explorer, vous pouvez accéder à des événements possédant des paires `key:value` ainsi qu'à la fonctionnalité de recherche en texte intégral.

## Types d'événements

Bien que la solution RUM enregistre automatiquement des événements, vous pouvez également capturer vos propres événements. Tous les événements personnalisés et capturés automatiquement se voient attribuer l'un des six types d'événements pour les applications [Browser][1], [iOS][2], [Android][3] et [React Native][4]. Ils sont également indexés, afin que vous puissiez les rechercher.

| Type d'événement | Rétention | Description                                                                                                                                                                                                                                                               |
|------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Session    | 30 jours   | Une session utilisateur débute lorsqu'un utilisateur commence à parcourir l'application Web. Une session inclut des informations générales sur l'utilisateur (comme son navigateur, son appareil ou sa géolocalisation). Elle agrège tous les événements RUM recueillis lors du parcours utilisateur en appliquant un attribut `session.id` unique. |
| Vue       | 30 jours   | Un événement de type Vue est généré à chaque fois qu'un utilisateur consulte une page de l'application Web. Tant que l'utilisateur reste sur la même page, les événements de type Ressource, Tâche longue, Erreur et Action sont associés à cette vue RUM via l'attribut `view.id`.                                   |
| Action     | 30 jours   | Les événements RUM de type Action enregistrent les interactions effectuées durant chaque parcours utilisateur et peuvent être envoyés manuellement pour surveiller des actions utilisateur personnalisées.                                                                                                                                                  |
| Erreur      | 30 jours   | La fonction RUM recueille toutes les erreurs frontend émises par le navigateur.                                                                                                                                                                                                                 |
| Ressource   | 15 jours   | Un événement de type Ressource est généré pour les images, XHR, Fetch, CSS ou bibliothèques JS chargés sur une page Web. Celui-ci contient des informations détaillées sur le temps de chargement.                                                                                                                          |
| Tâche longue  | 15 jours   | Un événement de type Tâche longue est généré à chaque fois qu'une tâche du navigateur bloque le thread principal pendant plus de 50 ms.                                                                                                                                                                |

Pour recherche des événements RUM, sélectionnez un type d'événements depuis le menu déroulant situé à gauche de la barre de recherche.

{{< img src="real_user_monitoring/explorer/search/rum_explorer_search.png" alt="RUM Explorer" style="width:100%;">}}

## Requête de recherche

Pour appliquer un filtre basé sur les sessions générées par les utilisateurs réels d'une certaine application au cours des dernières 24 heures, créez une requête personnalisée, par exemple `@application.id:Shopist @session.type:user`, et définissez l'intervalle sur `1d`.

### Syntaxe de recherche

Pour en savoir plus sur la recherche d'événements RUM et l'utilisation d'intervalles, consultez les sections [Syntaxe de recherche][5] et [Intervalles personnalisés][6].

## Configurer des facettes et des mesures

Tous les événements RUM contiennent des attributs, qui sont automatiquement recueillis par les SDK RUM, ainsi que vos attributs personnalisés, qui sont indiqués dans le [volet latéral des événements][7].

Bien que la plupart des attributs recueillis automatiquement soient indexés et possèdent une facette, ce n'est par défaut pas le cas pour les attributs d'événement personnalisés. Pour indexer ces attributs, créez une facette ou une mesure, afin de pouvoir les utiliser facilement dans vos recherches et vos [visualisations][8].

### Facettes

Une facette présente tous les membres distincts d'un attribut ou d'un tag, en plus de proposer des analyses de base, comme le nombre d'événements RUM représentés. Les facettes vous permettent d'effectuer des pivotements ou de filtrer vos ensembles de données en fonction d'un attribut donné. Pour appliquer un filtre dans la barre de recherche, sélectionnez une valeur.

{{< img src="real_user_monitoring/explorer/rum_explorer_1.png" alt="Liste des facettes à gauche de la liste des événements" style="width:90%;">}}

Pour créer une facette, cliquez sur un attribut dans le [volet latéral des événements][7].

{{< img src="real_user_monitoring/explorer/create_facet.png" alt="Créer une facette" style="width:40%;">}}

La valeur de cet attribut est stockée pour l'ensemble des nouvelles vues. Vous pouvez utiliser l'attribut dans la barre de recherche, le volet des **facettes** et vos [visualisations][8].

### Mesures

Une mesure est un attribut doté d'une valeur numérique contenue dans vos événements RUM.

Pour créer une mesure, cliquez sur un attribut numérique dans le [volet latéral des événements][7].

{{< img src="real_user_monitoring/explorer/create_measure.png" alt="Créer une mesure" style="width:40%;">}}

La valeur de cet attribut est stockée pour l'ensemble des nouveaux événements RUM. Vous pouvez utiliser l'attribut dans la barre de recherche, le volet des **facettes** et vos [visualisations][8].

{{< img src="real_user_monitoring/explorer/edit_measure.png" alt="Modifier une mesure" style="width:40%;">}}

Chaque mesure possède une unité qui est affichée dans une colonne du [RUM Explorer][9] et de [vos visualisations][8]. 

## Rechercher des facettes

Pour rechercher un attribut spécifique, [ajoutez-le comme facette](#facettes), puis saisissez `@` dans votre requête de recherche pour indiquer que vous recherchez une facette.

Par exemple, si le nom de votre facette est **url** et que vous souhaitez filtrer les résultats en fonction de la valeur `www.datadoghq.com`, saisissez `@url:www.datadoghq.com`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/
[2]: /fr/real_user_monitoring/android/data_collected/
[3]: /fr/real_user_monitoring/ios/data_collected/
[4]: /fr/real_user_monitoring/reactnative/
[5]: /fr/real_user_monitoring/explorer/search_syntax/
[6]: /fr/dashboards/guide/custom_time_frames
[7]: /fr/real_user_monitoring/explorer/events/
[8]: /fr/real_user_monitoring/explorer/visualize#timeseries
[9]: /fr/real_user_monitoring/explorer/