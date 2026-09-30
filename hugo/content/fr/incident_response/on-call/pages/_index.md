---
aliases:
- /fr/service_management/on-call/pages/
- /fr/service_management/on-call/triggering_pages/
- /fr/incident_response/on-call/triggering_pages/
further_reading:
- link: /incident_response/on-call/
  tag: Documentation
  text: Datadog On-Call
- link: /incident_response/incident_management/
  tag: Documentation
  text: Incident Management
title: Pages
---
Une page est une alerte qui nécessite l'attention d'un intervenant d'astreinte. Les pages suivent le cycle de vie suivant :

- **Déclenchée** : La Page a été envoyée, mais personne n'en a pris en charge. La politique d'escalade s'exécute conformément à sa configuration, notifiant des intervenants supplémentaires si personne ne répond dans le délai défini.
- **Accusée de réception** : Un intervenant a pris en charge la Page. Les notifications d'escalade s'arrêtent et l'intervenant commence à travailler sur le problème.
- **Résolue** : Le problème sous-jacent a été traité et la page est fermée.

Ce guide explique comment déclencher, reconnaître, réassigner et résoudre des pages.

## Déclencher une page {#trigger-a-page}

Une page est envoyée à une équipe et acheminée via ses politiques d'escalade et ses plannings. Une fois votre équipe [intégrée à Datadog On-Call][1], vous pouvez commencer à lui envoyer une Page.

### Déclencher des pages depuis des monitors {#trigger-pages-from-monitors}

Envoyez une page en mentionnant l'identifiant d'une équipe précédé de `oncall-`. Par exemple, pour envoyer une page à l'équipe Checkout Operations (`@checkout-operations`), mentionnez `@oncall-checkout-operations`.

{{< img src="incident_response/on-call/notification_page.png" alt="Notification mentionnant une équipe On-Call." style="width:80%;" >}}

Vous pouvez envoyer des Pages aux équipes On-Call partout où les @-handles sont pris en charge, notamment dans les monitors, Incident Management, les règles de détection de sécurité et Event Management.

#### Résoudre automatiquement les Pages {#resolving-pages-automatically}

Lorsqu'un monitor se rétablit, toute page qu'il a déclenchée est automatiquement définie sur `Resolved` si la notification de rétablissement inclut la mention de l'équipe On-Call (par exemple, `@oncall-payments`).

Si la mention apparaît uniquement dans le modèle d'alerte (par exemple, dans `{{#is_alert}} ... {{/is_alert}}`) et non dans le message de rétablissement, la page ne se résout pas automatiquement.

#### Monitors et urgences dynamiques {#monitors-and-dynamic-urgencies}

Si vous envoyez une page via une alerte de monitor et que la règle de routage de l'équipe utilise des urgences dynamiques :
- Si le seuil WARN est franchi, l'urgence de la Page est définie sur `low`.
- Si le seuil ALERT est franchi, l'urgence de la Page est définie sur `high`.

#### Renotification du monitor {#monitor-renotification}

Lorsqu'un monitor est configuré pour [envoyer des renotifications][8] à une équipe On-Call, le comportement dépend de l'état actuel de la page :

- **La Page est résolue** : le monitor renvoie une notification et crée une nouvelle page, qui est routée via la politique d'escalade de l'équipe.
- **La Page est accusée de réception** : le monitor renvoie une notification et la Page est redéclenchée, reprenant la politique d'escalade à l'étape qui était en cours lorsque la Page a été accusée de réception. 
- **La Page est déclenchée** : si toutes les étapes de la politique d'escalade ont déjà été exécutées mais que personne n'a accusé réception de la Page, le monitor renvoie une notification et la Page est redéclenchée, redémarrant la politique d'escalade depuis le début.

### Déclencher des pages par e-mail {#trigger-pages-through-email}

Générez une adresse e-mail unique pour déclencher une page directement auprès des intervenants d'astreinte de l'équipe. Les e-mails envoyés à cette adresse suivent les politiques de routage et d'escalade configurées pour l'équipe.

Certaines équipes intègrent cette adresse dans une liste de distribution lisible par l'homme (par exemple, `page-network@company.com`) pour la rendre plus reconnaissable.

Pour déclencher une page pour une équipe par e-mail :

1. Accédez à la page de l'équipe et faites défiler jusqu'à **Sources de déclenchement personnalisées**.
1. Dans la section de déclenchement par e-mail, cliquez sur **Générer**.

### Déclencher des pages via des incidents {#trigger-pages-through-incidents}

Déclenchez une page directement à partir d'un incident actif pour escalader et impliquer des intervenants supplémentaires sans quitter le workflow. Consultez [Déclencher une Page à partir d'un incident][5] pour obtenir des instructions détaillées.

### Déclencher des pages via des appels {#trigger-pages-through-calls}

Déclenchez une page via [Live Call Routing][3] en appelant un numéro de téléphone dédié.

### Déclencher des pages manuellement {#trigger-pages-manually}

Envoyez une Page depuis la plateforme Datadog, ou via un outil comme Slack ou Microsoft Teams. Cela vous permet d'alerter directement une équipe ou une personne, même si elle n'est pas On-Call.

#### Via Datadog {#through-datadog}

1. Accédez à [**On-Call** > **Teams**][2].
1. Recherchez l'équipe à laquelle vous souhaitez envoyer une Page. Sélectionnez **Page**.
   {{< img src="incident_response/on-call/pages/manual_page.png" alt="La liste des équipes On-Call, affichant l'équipe Checkout Operations. Trois boutons sont affichés : Plannings, Politiques d'escalade, Page." style="width:80%;" >}}
1. Saisissez un **Titre de Page** et ajoutez plus de contexte dans le champ **Description**. Sélectionnez **Page**.

Les Pages envoyées manuellement via Datadog sont toujours de `high` urgence.

#### Via Slack {#through-slack}

1. Installez l'application Datadog pour Slack.
1. Saisissez `/datadog page` ou `/dd page`.
1. Sélectionnez une équipe à laquelle envoyer une Page.

Les pages envoyées depuis Slack sont toujours de `high` urgence.

Pour recevoir des notifications de Page dans Slack, consultez [Règles de routage][4].

## Répondre à une Page {#respond-to-a-page}

Accédez à [**On-Call** > **Pages**][7] pour afficher toutes les pages actives et historiques. Cliquez sur une Page pour ouvrir son panneau latéral et agir, ou cochez la case à côté d'une ou plusieurs Pages pour les modifier en masse.

{{< img src="incident_response/on-call/pages/on-call-pages-list.png" alt="La vue en liste des Pages On-Call avec des sous-onglets pour Active, Triggered, Acknowledged, Resolved et All, ainsi qu'un tableau affichant le nom, le statut, l'équipe, les répondants et la date de création de chaque Page" style="width:100%;" >}}

### Accuser réception d'une Page {#acknowledge-a-page}

Accuser réception d'une Page signale que vous travaillez activement dessus et empêche la politique d'escalade de notifier le niveau suivant de répondants. Si vous n'accusez pas réception de la Page, l'escalade se poursuit et des répondants supplémentaires peuvent être notifiés.

Pour accuser réception d'une Page :

1. Cliquez sur la Page pour ouvrir son panneau latéral.
1. Sous **Next Steps**, sélectionnez **Acknowledge**.

Le statut de la Page passe à `Acknowledged`.

{{< img src="incident_response/on-call/pages/on-call-page-next-steps.png" alt="Un panneau latéral de Page On-Call affichant le statut, l'urgence, le répondant et le service de la Page, avec des boutons Next Steps pour Acknowledge, Reassign, Resolve, Escalate, Snooze ou Declare Incident" style="width:70%;" >}}

### Mettre une Page en veille {#snooze-a-page}

La mise en veille suspend la politique d'escalade pour une Page que vous avez vue mais sur laquelle vous n'êtes pas prêt à agir, sans pour autant en revendiquer la responsabilité comme le fait l'accusé de réception. Seul le répondant actuellement notifié pour la Page peut la mettre en veille. Sélectionnez la durée de la pause de l'escalade, et si personne n'accuse réception ou ne résout la Page avant la fin de cette période, la politique d'escalade reprend et notifie à nouveau le répondant d'astreinte.

Pour mettre une Page en veille :

1. Cliquez sur la Page pour ouvrir son panneau latéral.
1. Sous **Next Steps**, sélectionnez la flèche à côté de **Snooze** et choisissez une durée prédéfinie, ou sélectionnez **At a specific time** pour choisir une date et une heure personnalisées.

   {{< img src="incident_response/on-call/pages/on-call-snooze-page.png" alt="Un panneau latéral de Page On-Call avec le menu déroulant Snooze ouvert, affichant des options prédéfinies pour re-notifier le niveau d'escalade dans 10 minutes, 30 minutes, 1 heure, 4 heures, 12 heures ou à une heure spécifique" style="width:70%;" >}}

1. Cliquez sur **Snooze**.

**Remarque** : La mise en veille d'une Page est également disponible dans l'application mobile Datadog.

Le statut de la Page reste `Triggered` pendant la mise en veille. Lorsque la période de mise en veille se termine, la politique d'escalade reprend et notifie à nouveau le niveau d'escalade actuel.

### Réassigner une Page {#reassign-a-page}

Réassignez une Page si elle a été acheminée vers la mauvaise personne ou la mauvaise équipe, ou si vous devez transférer la prise en charge à quelqu'un de mieux placé pour répondre. Lorsque vous réassignez une Page, l'historique de la Page reste intact.

Pour réassigner une Page :

1. Cliquez sur la Page pour ouvrir son panneau latéral.
1. Sous **Next Steps**, sélectionnez **Réassigner**. Cela ouvre une fenêtre modale **Réassigner la Page**.

   {{< img src="incident_response/on-call/pages/on-call-reassign-page.png" alt="La fenêtre modale Réassigner la Page avec un bouton bascule pour réassigner à une équipe ou à un utilisateur, un menu déroulant de sélection d'équipe et un champ de commentaire facultatif" style="width:60%;" >}}

1. Sélectionnez l'utilisateur ou l'équipe à qui réassigner.
1. Ajoutez éventuellement un commentaire expliquant le transfert.
1. Cliquez sur **Réassigner**.

Le nouveau destinataire est notifié immédiatement.

**Remarque** : Vous pouvez uniquement réassigner les Pages ayant un statut `Triggered` ou `Acknowledged`.

### Résoudre une Page {#resolve-a-page}

Résolvez une Page lorsque le problème sous-jacent est traité. Cela ferme la Page et définit son statut sur `Resolved`.

Pour résoudre une Page :

1. Cliquez sur la Page pour ouvrir son panneau latéral.
1. Sous **Étapes suivantes**, sélectionnez **Résoudre**.

Si la Page a été déclenchée par un monitor, elle se résout automatiquement lorsque le monitor se rétablit, à condition que la notification de rétablissement inclue la mention de l'équipe On-Call. Voir [Déclencher une Page](#trigger-a-page) pour plus de détails.

### Déclarer un incident à partir d'une Page {#declare-an-incident-from-a-page}

Si une Page nécessite une coordination inter-équipes, une communication avec les parties prenantes ou un suivi formel, promouvez-la en incident. Cela crée un incident dans [Incident Management][6] avec le contexte de la Page pré-rempli.

Pour déclarer un incident :

1. Cliquez sur la Page pour ouvrir son panneau latéral.
1. Sous **Étapes suivantes**, sélectionnez **Déclarer un incident**.
1. Examinez et ajustez les détails pré-remplis si nécessaire.

   {{< img src="incident_response/on-call/pages/on-call-declare-incident-demo.png" alt="La fenêtre modale Déclarer un incident est pré-remplie avec le titre et le résumé de la Page, ainsi que des champs pour le type d'incident, le niveau de gravité, le responsable de l'incident et l'équipe." style="width:100%;" >}}

1. Sélectionnez **Déclarer un incident** pour confirmer.

Pour obtenir des conseils sur les niveaux de gravité des incidents et les rôles des intervenants, consultez [Incident Management][6].

### Ajouter un commentaire {#add-a-comment}

La chronologie de la Page est un log d'activité qui enregistre le moment où la Page a été déclenchée, qui a été averti et comment l'escalade a progressé. Vous pouvez ajouter vos propres commentaires pour fournir du contexte aux autres intervenants.

{{< img src="incident_response/on-call/pages/on-call-timeline-demo.png" alt="La section Timeline d'une Page On-Call montrant un champ de saisie de commentaire et un log chronologique des événements, y compris le déclenchement de la Page, les notifications envoyées et l'accusé de réception." style="width:60%;" >}}

Utilisez les commentaires pour :
- Documentez ce que vous avez déjà étudié ou écarté
- Fournissez du contexte lors du transfert à un autre intervenant
- Enregistrez les facteurs externes qui ont affecté votre réponse

Pour ajouter un commentaire, ouvrez la Page et saisissez votre texte dans la section **Chronologie**.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
[3]: /fr/incident_response/on-call/pages/live_call_routing
[4]: /fr/incident_response/on-call/routing_rules/#send-pages-to-slack-or-microsoft-teams
[5]: /fr/incident_response/incident_management/notification/#trigger-a-page-from-an-incident
[6]: /fr/incident_response/incident_management/
[7]: https://app.datadoghq.com/on-call/pages
[8]: /fr/monitors/notify/#renotify