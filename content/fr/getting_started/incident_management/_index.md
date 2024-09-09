---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-incident-management
  tag: Centre d'apprentissage
  text: Présentation d'Incident Management
- link: /service_management/incident_management/datadog_clipboard
  tag: Documentation
  text: Presse-papiers Datadog
- link: https://www.youtube.com/watch?v=QIambwILy_M
  tag: Vidéo
  text: Datadog sur la gestion des incidents
- link: /monitors/incident_management
  tag: Documentation
  text: Incident Management
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour améliorer votre gestion des incidents
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: Blog
  text: Gestion des incidents avec Datadog
- link: /service_management/incident_management/incident_settings
  tag: Documentation
  text: Règles de notification
- link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
  tag: Documentation
  text: Intégration de Slack avec les incidents
- link: https://www.datadoghq.com/blog/pair-programming-coscreen-datadog/
  tag: Blog
  text: Une programmation en binôme plus efficace avec Datadog CoScreen
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Pratiques recommandées pour la création de post-mortems d'incident
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: Blog
  text: Comment Datadog gère ses incidents
title: Débuter avec Incident Management
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">La solution Incident Management n'est pas disponible pour le site Datadog que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

## Présentation

La solution Incident Management Datadog vous aide à surveiller les problèmes que vous avez identifiés à l'aide de vos métriques, traces ou logs et à communiquer avec vos équipes à leur sujet.

Ce guide vous explique comment utiliser le site Datadog pour déclarer un incident, mettre à jour l'incident au fur et à mesure que les phases d'investigation et de remédiation avancent, et générer un post-mortem une fois l'incident résolu. Pour l'exemple de ce guide, il est supposé que l'[intégration Slack][1] est activée.

## Différentes étapes d'un incident, de la détection du problème à sa résolution

### Déclaration d'un incident

**Scénario** : un monitor déclenche une alerte suite à un nombre élevé d'erreurs susceptibles de ralentir plusieurs services. On ne sait pas si les clients sont impactés.

Ce guide repose sur l'utilisation du [presse-papiers Datadog][2] pour déclarer un incident. Le presse-papiers vous permet de recueillir des informations à partir de plusieurs sources différentes, telles que des graphiques, des monitors, des dashboards entiers ou des [notebooks][3]. Vous pouvez ainsi facilement ajouter autant d'informations que possible lorsque vous déclarez un incident.

1. Depuis le menu de Datadog situé sur la gauche, accédez à **Dashboard** > **Dashboard lists**, puis sélectionnez **System - Metrics**.
2. Passez votre curseur sur l'un des graphiques et copiez-le dans le presse-papiers de l'une des façons suivantes :
    - **Ctrl**/**Cmd** + **C**
    - Cliquez sur l'icône **Export** sur le graphique et sélectionnez **Copy**.
3. Depuis le menu de Datadog situé sur la gauche, accédez à **Monitors** > **Manage Monitors**, puis sélectionnez **[Auto] Clock in sync with NTP**.
4. Ouvrez le presse-papiers à l'aide de la commande **Ctrl**/**Cmd** + **Maj** + **K**.
5. Dans le presse-papiers, cliquez sur **Add current page** pour ajouter le monitor au presse-papiers.
{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="Copier dans le presse-papiers" responsive="true" style="width:100%;">}}
6. Cliquez sur **Select All**, puis sur **Export items to…**
7. Sélectionnez **Declare Incident**.
8. Décrivez la situation :
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Title                    | Suivez les conventions de nommage appliquées par votre équipe pour les titres d'incidents. Comme il ne s'agit pas d'un véritable incident ici, ajoutez le mot `TEST` pour indiquer clairement qu'il s'agit d'un test. Exemple de titre : `[TEST] Mon test d'incident`.                                                                      |
| Severity Level           | Le niveau de gravité est défini sur **Unknown**, car on ne sait pas encore quel est l'impact sur les clients ni sur les services connexes. Consultez la description de chaque niveau de gravité dans l'application et suivez les directives de votre équipe.                                                                                |
| Incident Commander       | Laissez votre nom. Dans le cas d'un véritable incident, celui-ci serait alors assigné à la personne responsable de l'enquête. L'Incident Commander peut être modifié à mesure que l'enquête avance.                                                                                 |
| Notifications            | Laissez ce champ vide : comme il ne s'agit que d'un test, il n'est pas nécessaire d'alerter une autre personne ou un autre service. Dans le cas d'un véritable incident, ajoutez les personnes et les services à prévenir pour faciliter les phases d'enquête et de remédiation. Vous pouvez envoyer ces notifications via Slack ou PagerDuty. |
| Notes & Links            | Ajoutez des informations appuyant la raison pour laquelle vous déclarez l'incident. Il peut s'agir de graphiques, de logs ou de tout visuel clé. Le graphique et le monitor que vous avez sélectionnés sont déjà inclus, mais vous pouvez ajouter des signaux supplémentaires. Par exemple, copiez et collez l'URL de ce guide.   
9. Cliquez sur **Declare Incident** pour créer l'incident.
   Vous pouvez également déclarer un incident depuis un [graphique][4], un [monitor][5] ou l'[API d'incidents][6]. Si vous utilisez APM, vous pouvez cliquer sur l'icône des incidents sur n'importe quel graphique APM pour déclarer un incident.
Avec l'intégration Slack, vous pouvez également utiliser le raccourci `/datadog incident` pour déclarer un incident et définir le titre, la gravité et l'impact sur les clients.
10. Cliquez sur **Slack Channel** sur la page de l'incident pour accéder au canal Slack de l'incident.

Un nouveau canal Slack dédié est automatiquement créé pour chaque nouvel incident afin de simplifier les échanges avec votre équipe et de commencer le dépannage. Si l'intégration Slack de votre organisation comporte un canal d'incident global à mettre à jour, les informations sur le nouvel incident sont alors ajoutées à ce canal.

Dans cet exemple, vous êtes la seule personne ajoutée au canal du nouvel incident. Lorsque vous ajoutez des personnes ou services supplémentaires dans _Notifications_ pour un véritable incident, tout le monde est automatiquement ajouté au canal de l'incident.

Si vous n'avez pas activé l'intégration Slack, cliquez sur **Add Chat** pour ajouter un lien vers le service de messagerie que vous utilisez pour discuter de l'incident.

Cliquez sur **Add Video Call** pour ajouter un lien vers l'appel dédié aux échanges sur l'incident.

### Dépannage et mise à jour de l'incident

La page d'un incident comprend quatre sections principales : _Overview_, _Timeline_, _Remediation_ et _Notifications_. Mettez à jour ces sections à mesure que l'incident évolue pour tenir votre équipe informée.

#### Section Overview

**Scénario :** après une première enquête, vous découvrez que le problème est causé par un host qui arrive à court de mémoire. Vous avez également été informé qu'une petite partie des clients est impactée, avec un chargement des pages ralenti. Le premier signalement client est arrivé il y a 15 minutes. Il s'agit d'un incident de gravité 3.

Dans la section _Overview_, vous pouvez mettre à jour les champs de l'incident et l'impact sur les clients à mesure que l'enquête progresse.

Pour mettre à jour le niveau de gravité et la cause d'origine, procédez comme suit :
1. Cliquez sur la liste déroulante _Severity_, puis sélectionnez **SEV-3**.
2. Sous _What happened_, sélectionnez **Monitor** dans le menu déroulant _Detection Method_ (l'option Unknown est sélectionnée), car vous avez été alerté du problème par un monitor.
1. Ajoutez ce qui suit dans le champ _Why it happened_ : `TEST : Host à court de mémoire.`
4. Cliquez sur **Save** pour mettre à jour les propriétés.
    Vous pouvez également mettre à jour le titre, la gravité ou le statut d'un problème en cours depuis Slack via la commande `/datadog incident update`.

Pour ajouter l'impact sur les clients, procédez comme suit :
1. Cliquez sur **+ Add** dans la section _Impact_.
2. Définissez l'heure sur 15 minutes plus tôt, car c'est à ce moment-là que le premier signalement client est arrivé.
3. Ajoutez ce qui suit dans le champ de description : `TEST : les pages de certains clients se chargent lentement.`
4. Cliquez sur **Save** pour mettre à jour les champs. La section _Impact_ se met à jour pour afficher la durée de l'impact sur les clients. Toutes les modifications effectuées sur la page _Overview_ s'affichent à la section _Timeline_.

#### Section Timeline

La section _Timeline_ affiche les modifications des champs et des informations de l'incident par ordre chronologique.

{{< img src="getting_started/incident_management/flag_event.png" alt="Marquer un événement comme important" responsive="true" style="width:50%;">}}

1. Cliquez sur l'onglet **Timeline**.
2. Trouvez l'événement _Impact added_ et marquez-le comme _Important_ en cliquant sur le drapeau.
3. Ajoutez une remarque dans la timeline : `J'ai trouvé le host problématique.`
4. Passez votre curseur sur l'événement de la remarque et cliquez sur l'icône en forme de crayon pour modifier l'heure associée, étant donné que vous avez trouvé le host à l'origine du problème il y a 10 minutes.
5. Marquez la remarque comme **Important**.
6. Cliquez sur **Slack Channel** pour retourner sur le canal Slack de l'incident.
7. Publiez le message `Je m'occupe de la correction.` dans le canal.
8. Cliquez sur l'icône de menu du message (les trois petits points qui s'affichent sur la droite du message lorsque vous passez votre curseur dessus).
9. Sélectionnez **Add to Incident** pour ajouter le message à la timeline.

{{< img src="getting_started/incident_management/add_from_slack.png" alt="Ajouter depuis Slack" responsive="true" style="width:40%;">}}

Vous pouvez ajouter n'importe quel commentaire publié sur le canal Slack de l'incident à la timeline, afin de consolider les communications importantes relatives aux phases d'enquête et de remédiation.

#### Section Remediation

**Scénario :** il existe un notebook qui explique comment gérer ce type de problème, ainsi que les tâches à effectuer pour le résoudre.

 La section _Remediation_ vous permet d'enregistrer des documents et des tâches pour enquêter sur le problème ou pour garder une trace des étapes de remédiation suivies une fois l'incident terminé.

1. Cliquez sur l'onglet **Remediation**.
2. Cliquez sur l'icône plus `+` dans le champ _Documents_ et ajoutez un lien vers un [notebook Datadog][7]. Toutes les mises à jour de la section _Documents_ sont ajoutées à la timeline en tant qu'_Incident Update_.
3. Pour ajouter une tâche, saisissez une description de celle-ci dans le champ _Incident Tasks_. Exemple : `Exécuter les étapes du notebook.`
4. Cliquez sur **Create Task**.
5. Cliquez sur **Assign To** et assignez-vous la tâche.
6. Cliquez sur **Set Due Date** et choisissez la date actuelle.
    Les ajouts et modifications sont enregistrés dans la section _Timeline_.
    Vous pouvez également ajouter des tâches une fois l'incident résolu dans la section _Remediation_ pour en garder une trace.

#### Section Notifications

**Scénario :** le problème a été atténué, et l'équipe surveille la situation. Le statut de l'incident est stable.

La section _Notifications_ vous permet d'envoyer une notification afin de mettre à jour le statut de l'incident.

1. Revenez à la section _Overview_.
2. Remplacez le statut _ACTIVE_ dans le menu déroulant par le statut _STABLE_.
4. Accédez à l'onglet _Notifications_.
5. Cliquez sur **New Notification**.
    Par défaut, le message utilise le titre de l'incident comme objet et comprend des informations sur le statut actuel de l'incident dans le corps.
    En situation réelle, vous enverriez des mises à jour aux personnes concernées par l'incident. Ici, envoyez une notification à vous-même uniquement.
6. Ajoutez-vous au champ _Recipients_.
7. Cliquez sur **Send**.
    Vous devriez recevoir un e-mail contenant le message.
    Vous pouvez créer des [modèles de message][8] personnalisés. Utilisez le champ _Category_ pour regrouper plusieurs modèles.

### Résolution et post-mortem

**Scénario :** vous avez la confirmation qu'il n'y a plus de client impacté et que vous avez résolu le problème. L'équipe veut effectuer un post-mortem pour analyser le problème.

1. Accédez à la section _Overview_.
3. Remplacez le statut _STABLE_ par _RESOLVED_ afin d'indiquer que l'incident n'est plus actif. Vous pouvez également modifier la date et l'heure de la fin de l'impact sur les clients (si cela s'est produit plus tôt).
7. Lorsque le statut d'un incident est défini sur Resolved, un bouton _Generate Postmortem_ apparaît en haut. Cliquez dessus.
8. Pour la section Timeline, sélectionnez **Marked as Important** afin que seuls les événements _Important_ soient ajoutés au post-mortem.
9. Cliquez sur **Generate**.

Le post-mortem est généré sous forme de notebook Datadog. Il comprend les événements et ressources de la timeline associés aux phases d'enquête et de remédiation. Vous pouvez ainsi facilement passer en revue les informations, documenter les causes exactes du problème et indiquer comment empêcher qu'il ne se reproduise. Le notebook Datadog prend en charge la collaboration en direct, ce qui vous permet de le modifier avec vos collègues en temps réel.

Si des tâches de suivi doivent être accomplies par votre équipe et vous-même pour garantir que le problème ne se reproduira pas, ajoutez-les et suivez-les dans la section _Incident Tasks_.

{{< img src="getting_started/incident_management/generate_postmortem.png" alt="Générer un post-mortem" responsive="true" style="width:80%;">}}
## Personnalisation de votre workflow de gestion des incidents

La solution Incident Management Datadog peut être personnalisée avec différents niveaux de gravité et de statut en fonction des besoins de votre organisation. Vous pouvez également ajouter des informations supplémentaires, telles que des services APM et les équipes responsables de l'incident. Pour en savoir plus, consultez cette [rubrique][9] de la section Incident Management.

Vous avez également la possibilité de définir des règles de notification pour prévenir automatiquement des personnes ou services spécifiques, en fonction du niveau de gravité d'un incident. Pour en savoir plus, consultez la section [Paramètres d'incident][10].

Pour personnaliser la gestion d'un incident, accédez à la [page des paramètres de l'incident][11]. Depuis le menu Datadog situé à gauche, accédez à **Monitors** > **Incidents** (si un écran de présentation d'Incident Management s'affiche, cliquez sur **Get Started**). Cliquez ensuite sur **Settings** en haut.

## Créer et gérer des incidents sur un appareil mobile

Grâce à l'[application mobile Datadog][12], disponible sur l'[App Store d'Apple][13] et le [Google Play Store][14], vous pouvez créer des incidents, mais également consulter, rechercher et filtrer tous les incidents auxquels vous avez accès avec votre compte Datadog. Cette application vous permet de prendre rapidement des mesures et de résoudre des problèmes, même lorsque vous n'êtes pas devant votre ordinateur.

Vous avez également la possibilité de déclarer et de modifier des incidents, ainsi que d'échanger rapidement avec vos équipes via les intégrations Slack, Zoom, et plus encore.

{{< img src="service_management/incidents/incidents-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Monitors sur l'application mobile">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/slack/
[2]: /fr/service_management/incident_management/datadog_clipboard
[3]: /fr/notebooks/#overview
[4]: /fr/service_management/incident_management/#from-a-graph
[5]: /fr/service_management/incident_management/#from-a-monitor
[6]: /fr/api/latest/incidents/#create-an-incident
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/incidents/settings#Messages
[9]: /fr/service_management/incident_management/#status-levels
[10]: /fr/service_management/incident_management/incident_settings
[11]: https://app.datadoghq.com/incidents/settings
[12]: /fr/service_management/mobile/
[13]: https://apps.apple.com/app/datadog/id1391380318
[14]: https://play.google.com/store/apps/details?id=com.datadog.app