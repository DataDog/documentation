---
title: Timeboard
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
Les timeboards possèdent une disposition automatique. Ils représentent un seul point (fixe ou en temps réel) sur l'ensemble du dashboard. Ils sont généralement utilisés pour le dépannage, la corrélation et l'exploration globale des données.

## Corrélation d'événements

La corrélation d'événements désigne la superposition d'événements en haut d'un graphique de dashboard. Vous pouvez activer la corrélation à deux moments différents : lorsque vous configurez le dashboard ou au moment de son affichage.

### Graphiques individuels

{{< img src="graphing/dashboards/guides-eventcorrelation-screenboard.png" alt="guides corrélation d'événements sur un screenboard" responsive="true" style="width:90%;">}}

Pour activer la corrélation d'événements au moment de la configuration, modifiez le graphique de votre choix sur les timeboards et screenboards et ajoutez des événements au graphique. Vous trouverez plus d'informations sur l'ajout d'événements [à l'aide de l'IU][1] ou via l'interface JSON en bas de la page.

### Dashboard complet

{{< img src="graphing/dashboards/event-search.png" alt="guides corrélation d'événements" responsive="true" style="width:75%;">}}

Configurez la corrélation d'événements au moment de l'affichage en cliquant sur le lien *Search Events or Logs* en haut à gauche, puis sur **Events**. Ensuite, entrez une requête dans la barre de recherche. Cela remplace tous les événements ajoutés au moment de la configuration et applique les événements à l'ensemble des graphiques de ce dashboard en les superposant.

## Corréler vos logs avec vos métriques

### Rechercher des logs dans les timeboards

Cliquez sur le lien *Search Events or Logs* en haut à gauche, puis sélectionnez **Logs**. Ensuite, saisissez une requête dans la barre de recherche. La fréquence des logs s'affiche alors en superposition sur vos widgets de séries temporelles. Cliquez sur un log spécifique pour afficher l'ensemble de son contenu.

{{< img src="graphing/dashboards/log-search.png" alt="Ouvrir la recherche de logs" responsive="true" style="width:75%;">}}


### Passer d'une métrique à ses logs

Une corrélation rapide et facile est essentielle lorsque vous dépannez un problème. Utilisez le raccourci suivant depuis n'importe quel graphique de série temporelle pour ouvrir un menu contextuel avec les logs les plus pertinents.

{{< img src="graphing/dashboards/related_logs.png" alt="Logs associés" responsive="true" style="width:80%;">}}

Sélectionnez `View related logs` pour accéder à la page Log Explorer et zoomer sur l'intervalle sélectionné avec le contexte actuel de votre graphique.

### Comment les requêtes de recherche sont-elles définies ?

Pour définir les logs les plus pertinents, les paramètres suivants sont utilisés :

* *Intervalle* : applique le point de données sélectionné et utilise la taille de compartiment du graphique pour afficher les données avant et après le point sélectionné.
* *Préfixe d'intégration* : si la métrique provient d'une intégration, Datadog filtre l'attribut `source` avec le nom de l'intégration.
* *Tags* : tous les tags utilisés dans le graphique (*template variable*, *split by*, *filter by*) sont automatiquement ajoutés à la requête de recherche.

## Lecture seule

[Un administrateur][2] ou le créateur d'un timeboard peut passer un timeboard en lecture seule en cliquant sur l'icône en forme d'engrenage (dans le coin supérieur droit du timeboard), puis en accédant au lien **Permissions** :

{{< img src="graphing/dashboards/timeboard/read_only.png" alt="Lecture seule" responsive="true" style="width:30%;">}}

**Cliquez sur Yes dans la fenêtre de confirmation pour passer le timeboard en lecture seule.**

Seuls les comptes [administrateurs][2] et le créateur du timeboard peuvent passer le timeboard en lecture seule. Tous les utilisateurs de l'organisation peuvent cependant s'abonner au timeboard afin de recevoir des notifications de modification.

Si un utilisateur décide d'activer le suivi des modifications pour un timeboard, les modifications suivantes du timeboard sont signalées à l'utilisateur via un événement dans [le flux d'événements][1] :

1. Les changements de texte (titre et description)
2. Les changements de carré
3. Les duplications de timeboard
4. Les suppressions de timeboard

Afin d'empêcher les changements énumérés ci-dessus, un administrateur (à savoir, des administrateurs de compte ou le créateur du timeboard) peut activer la vue en lecture seule. Cela désactive toutes les modifications de carrés ou de texte par des non-administrateurs dans le timeboard et empêche sa suppression.

En mode lecture seule, les utilisateurs non-administrateurs peuvent toujours dupliquer le timeboard, réorganiser les carrés, prendre un snapshot de chaque carré et afficher le carré en plein écran. Si le timeboard est défini en lecture seule, les réarrangements de carrés par un non-administrateur sont uniquement temporaires.

## Suivi des modifications

Un utilisateur peut trouver tous les événements liés aux changements d'un timeboard sur le timeboard qu'il suit en recherchant `tags:audit, <Nom_timeboard>` dans le flux d'événements principal. En effet, chaque événement de notification possède ces deux tags.

## Audit de dashboards

Les notifications des dashboards vous permettent de suivre les modifications à des fins d'audit. Toute modification crée dans le flux d'événements un événement qui explique la modification et affiche l'utilisateur à son origine.

Consultez les modifications avec la recherche d'événements suivante :

https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all

Cette fonctionnalité peut être activée en suivant les étapes ci-dessous :

1. Dans le coin supérieur droit d'un dashboard, cliquez sur l'icône en forme d'engrenage :
    {{< img src="graphing/dashboards/faq/enable_notifications.png" alt="Activer les notifications" responsive="true" style="width:30%;">}}

2. Sélectionnez l'option **Notifications** et activez les notifications :
    {{< img src="graphing/dashboards/faq/notifications_pop_up.png" alt="Fenêtre contextuelle des notifications" responsive="true" style="width:30%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/event_stream
[2]: /fr/account_management/team/#datadog-user-roles