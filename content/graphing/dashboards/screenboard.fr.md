---
title: Screenboard
kind: documentation
---

## Changer le nom d'un Screenboard

1. Cliquez sur l'icône d'information en haut à droite de votre Screenboard:
    {{< img src="graphing/dashboards/screenboard/screenboard_name.png" alt="Screenboard name" responsive="true" style="width:75%;">}}
2. Changez le nom pour correspondre à votre cas
3. Cliquez sur "Save Changes"

## Lecture seule

[Un Administrateur][1] ou le créateur d'un Screenboard peut passer un Screenboard en lecture seule en cliquant sur l'icône engrenage (coin droit du Screenboard) puis sur le lien **Permissions**:

{{< img src="graphing/dashboards/screenboard/read_only.png" alt="Read Only" responsive="true" style="width:30%;">}}

**Cliquer sur "Yes" dans la fenêtre de confirmation passe le Screenboard en lecture seule**

Seul les comptes [administrateurs][1] et le créateur du Screenboard peuvent passer le Screenboard en lecture seule. Tous les utilisateurs de l'organisation pourront cependant souscrire au Screenboard afin de recevoir des notifications de modifications.

Si un utilisateur décide de suivre les modifications pour un Screenboard, les modifications suivantes du Screenboard sont signalées à l'utilisateur via un événement dans [le flux d'événements][2]:

1. Changements de texte (titre, description)

2. Changement d'élément
    - Les changements de widget iframe, free_text, image et note sont signalés dans le [flux d'événements][2] si un nouveau widget est ajouté ou supprimé. Il n'y a pas de détails spécifique sur le contenu du widget. L'événement dira juste "un text_widget a été ajouté au Screenboard".
    - Toutes les autres modifications de widget sont signalées dans le [flux d'événements][2] si un nouveau widget est ajouté, modifié ou supprimé. L'événement spécifie le titre du widget en question et dit quelque chose comme "le widget intitulé 'xyz' a été édité"
3. Clonage de Screenboard

4. Suppression d'un Screenboard

Afin d'éviter les changements énumérés ci-dessus, un administrateur (admins de compte + créateur de Screenboard) peut activer la vue en lecture seule désactivant toutes les modifications possibles aux non-administrateurs.
Même en mode lecture seule, les utilisateurs non administrateurs peuvent toujours cloner le Screenboard, réorganiser la mosaïque de widget, prendre un snapshot sur un graph et afficher la mosaïque en plein écran. Tout réarrangement de la mosaïque par un utilisateur non-administrateur ne persiste pas si le Screenboard est défini en lecture seule.

## Suivi des modifications
Un utilisateur peut trouver tous les événements liés aux changements d'un Screenboard sur le Screenboard qu'ils suivent en recherchant: `tags:audit, <Screenboard_name>` dans le [flux d'événements][2], chaque événement de notification est taggé avec ces deux tags.

## Audit de dashboards

Dans les dashboard, les notifications permettent de suivre les modifications à des fins d'audit. Toute modification effectuée crée un événement dans le [flux d'événements][2] qui explique la modification et affiche l'utilisateur qui a effectué la modification.

Si des modifications sont apportées à vos dashboards, consultez-les avec la recherche d'événement suivante:

https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all

Cette fonctionnalité peut être activée en suivant ces étapes:

1. Dans l'angle supérieur droit d'un dashboard, cliquez sur l'icône représentant une roue dentée:
    {{< img src="graphing/dashboards/faq/enable_notifications.png" alt="enable notifications" responsive="true" style="width:30%;">}}

2. Sélectionnez l'option **Notifications** et activez les notifications:
    {{< img src="graphing/dashboards/faq/notifications_pop_up.png" alt=" notifications pop up" responsive="true" style="width:40%;">}}

## Sauvegarder mon Screenboard

En utilisant notre [APIs][3], il est possible d'écrire un script pour sauvegarder vos définitions de Screenboard en tant que code. Consultez les projets suivants comme exemples de la façon dont ces sauvegardes peuvent être accomplies:

* https://github.com/brightcove/dog-watcher
* https://github.com/Shopify/doggy
* https://github.com/grosser/kennel

Un grand merci à  [Brightcove][4], [Shopify][5], et [Zendesk][6] pour partager ces projets!

[1]: /account_management/team/#datadog-user-roles
[2]: /graphing/event_stream/
[3]: /api
[4]: https://www.brightcove.com/
[5]: https://www.shopify.com/
[6]: https://www.zendesk.com/
