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
## Changer le nom d'un screenboard

1. Cliquez sur l'icône d'information en haut du screenboard.
    {{< img src="graphing/dashboards/screenboard/screenboard_name.png" alt="Screenboard name" responsive="true" style="width:75%;">}}
2. Remplacez le nom par celui de votre choix.
3. Cliquez sur Save Changes.

## Lecture seule

[Un administrateur][1] ou le créateur d'un screenboard peut passer un screenboard en lecture seule en cliquant sur l'icône en forme d'engrenage (dans le coin supérieur droit du screenboard), puis en accédant au lien **Permissions** :

{{< img src="graphing/dashboards/screenboard/read_only.png" alt="Lecture seule" responsive="true" style="width:30%;">}}

**Cliquez sur Yes dans la fenêtre de confirmation pour passer le screenboard en lecture seule.**

Seuls les [administrateurs de compte][1] et le créateur du screenboard peuvent passer le screenboard en mode lecture seule.
Tous les utilisateurs de l'organisation peuvent cependant s'abonner au screenboard afin de recevoir des notifications de modification.

Si un utilisateur décide d'activer le suivi des modifications pour un screenboard, les modifications suivantes du screenboard sont signalées à l'utilisateur via un événement dans [le flux d'événements][2] :

1. Les changements de texte (titre et description)

2. Les changements de widget
    - Les changements de widget iframe, free_text, image et note sont signalés dans le [flux d'événements][2] en cas d'ajout ou de suppression d'un widget. Le message ne précise pas la nature du changement de contenu. L'événement indique juste « a text_widget was added to the Screenboard ».
    - Toutes les autres modifications de widget (ajout, modification ou suppression de widget) sont signalées dans le [flux d'événements][2]. L'événement spécifie le titre du widget en question et indique le message « the widget titled 'xyz' was edited ».
3. Les duplications de screenboard

4. Les suppressions de screenboard

Afin d'empêcher les changements énumérés ci-dessus, un administrateur (à savoir, un administrateur de compte ou le créateur du screenboard) peut activer la vue en lecture seule. Cela désactive toutes les modifications de carrés ou de texte par des non-administrateurs dans le screenboard et empêche sa suppression.
En mode lecture seule, les utilisateurs non-administrateurs peuvent toujours dupliquer le screenboard, réorganiser les carrés, prendre un snapshot de chaque carré et afficher le carré en plein écran. Si le screenboard est en mode lecture seule, les réarrangements de carrés par un non-administrateur sont uniquement temporaires.

## Sélecteur de période globale

Les screenboards disposent d'une option qui permet de définir le même intervalle de temps pour tous les widgets d'un même screenboard. Il peut être utilisé pour choisir une période dynamique située dans le passé (la dernière heure, les trois derniers mois, etc.) ou une période fixe située entre deux dates. Si une période dynamique est choisie, tous les widgets mettent à jour la période de temps affichée à quelques millisecondes d'intervalle afin de refléter l'option choisie.

{{< img src="graphing/dashboards/screenboard/global_time_screenboard.png" alt="Sélecteur de période globale" responsive="true" style="width:50%;">}}

Pour utiliser le sélecteur de période globale, le screenboard doit comporter au moins un widget affichant les données correspondant à une période de temps. Lorsque vous créez ou modifiez un widget de ce type, accédez à **Set display preferences** et sélectionnez « Global Time » dans le menu déroulant *Show*. Remarque : « Global Time » est le paramètre par défaut.

{{< img src="graphing/dashboards/screenboard/widget_selector.png" alt="Sélecteur de période du widget" responsive="true" style="width:70%;">}}

Lorsque le sélecteur de période globale est utilisé, les widgets configurés pour utiliser ce paramètre affichent les données correspondant à cette période. Les autres widgets affichent les données correspondant à la période locale en fonction de la période globale. Par exemple, si le sélecteur de période globale est défini sur une période fixe allant du 1er janvier 2018 au 2 janvier 2018, un widget défini sur la période locale « The Last Minute » affichera la dernière minute du 2 janvier, à partir de 23 h 59.


Lorsque vous partagez un screenboard public, vous pouvez définir un intervalle global avant le partage :

{{< img src="graphing/dashboards/screenboard/public_sharing.png" alt="Sélecteur de période globale" responsive="true" style="width:70%;">}}


## Suivi des modifications
Un utilisateur peut trouver tous les événements liés aux changements d'un screenboard sur le screenboard qu'il suit en recherchant `tags:audit, <Nom_screenboard>` dans le principal [flux d'événements][2]. En effet, chaque événement de notification possède ces deux tags.

## Audit de dashboards

Les notifications des dashboards vous permettent de suivre les modifications à des fins d'audit. Toute modification crée dans le [flux d'événements][2] un événement qui explique la modification et affiche l'utilisateur à son origine.

Si des modifications sont apportées à vos dashboards, consultez-les avec la recherche d'événement suivante :

https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all

Cette fonctionnalité peut être activée en suivant les étapes suivantes :

1. Dans le coin supérieur droit d'un dashboard, cliquez sur l'icône en forme d'engrenage :
    {{< img src="graphing/dashboards/faq/enable_notifications.png" alt="Activer les notifications" responsive="true" style="width:30%;">}}

2. Sélectionnez l'option **Notifications** et activez les notifications :
    {{< img src="graphing/dashboards/faq/notifications_pop_up.png" alt="Fenêtre contextuelle des notifications" responsive="true" style="width:40%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/team/#datadog-user-roles
[2]: /fr/graphing/event_stream