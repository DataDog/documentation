---
description: Suivez et communiquez les problèmes, de la déclaration à la résolution,
  grâce à des workflows collaboratifs, des échéanciers et des post-mortems.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-incident-management
  tag: Centre d'apprentissage
  text: Premiers pas avec Incident Management
- link: https://www.youtube.com/watch?v=QIambwILy_M
  tag: Vidéo
  text: Présentation Datadog sur Incident Management
- link: /monitors/incident_management
  tag: Documentation
  text: Incident Management
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour améliorer la gestion des incidents
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: Blog
  text: Gestion des incidents avec Datadog
- link: /incident_response/incident_management/incident_settings
  tag: Documentation
  text: Règles de notification
- link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
  tag: Documentation
  text: Intégration de Slack avec les incidents
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: Blog
  text: Gérez et résolvez les incidents lors de vos déplacements avec l'application
    mobile Datadog
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Meilleures pratiques pour écrire des postmortems d'incident
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: Blog
  text: Comment Datadog gère ses incidents
title: Premiers pas avec Incident Management
---
## Présentation {#overview}

Datadog Incident Management vous aide à effectuer un suivi des problèmes concernant vos métriques, traces ou logs que vous avez détectés, et à communiquer avec vos équipes à propos de ces problèmes.

Ce guide vous accompagne dans l'utilisation du site Datadog pour déclarer un incident, mettre à jour l'incident au fur et à mesure de l'enquête et de la remédiation, et générer un post-mortem une fois l'incident résolu. L'exemple suppose que l'[intégration Slack][1] est activée.

## Parcours d'un incident, de la détection du problème à la résolution {#walking-through-an-incident-from-issue-detection-to-resolution}

### Déclaration d'un incident {#declaring-an-incident}

**Scénario :** Un monitor alerte sur un nombre élevé d'erreurs susceptibles de ralentir plusieurs services. Il n'est pas clair si les clients sont impactés.

Ce guide décrit l'utilisation du [presse-papiers Datadog][2] pour déclarer un incident. À l'aide du Presse-papiers, vous pouvez rassembler des informations provenant de différentes sources, telles que des graphiques, des monitors, des dashboards entiers ou des [notebooks][3]. Cela vous aide à fournir autant d'informations que possible lors de la déclaration d'un incident.

1. Dans Datadog, accédez à [{{< ui >}}Dashboard List{{< /ui >}}][15] et sélectionnez {{< ui >}}System - Metrics{{< /ui >}}.
2. Survolez l'un des graphiques et copiez-le dans le Presse-papiers avec l'une des commandes suivantes :
    - {{< ui >}}Ctrl{{< /ui >}}/{{< ui >}}Cmd{{< /ui >}} + {{< ui >}}C{{< /ui >}}
    - Cliquez sur l'icône {{< ui >}}Export{{< /ui >}} sur le graphique et sélectionnez {{< ui >}}Copy{{< /ui >}}.
3. Dans le menu Datadog sur le côté gauche, allez dans [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Monitors List{{< /ui >}}][16] et sélectionnez {{< ui >}}[Auto] Clock in sync with NTP{{< /ui >}}.
4. Ouvrez le Presse-papiers : {{< ui >}}Ctrl{{< /ui >}}/{{< ui >}}Cmd{{< /ui >}} + {{< ui >}}Shift{{< /ui >}} + {{< ui >}}K{{< /ui >}}.
5. Dans le Presse-papiers, cliquez sur {{< ui >}}Add current page{{< /ui >}} pour ajouter le monitor au Presse-papiers.
{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="Copier dans le Presse-papiers" responsive="true" style="width:100%;">}}
6. Cliquez sur {{< ui >}}Select All{{< /ui >}} puis sur {{< ui >}}Export items to…{{< /ui >}}
7. Sélectionnez {{< ui >}}Declare Incident{{< /ui >}}.
8. Décrivez ce qui se passe :
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| {{< ui >}}Title{{< /ui >}}                    | Suivez toutes les conventions de nommage que votre équipe souhaite utiliser pour les titres d'incident. Comme il ne s'agit pas d'un incident réel, incluez le mot `TEST` pour indiquer clairement qu'il s'agit d'un incident de test. Un exemple de titre : `[TEST] My incident test`                                                                      |
| {{< ui >}}Severity Level{{< /ui >}}           | Définissez sur {{< ui >}}Unknown{{< /ui >}} car il n'est pas clair si les clients sont impactés et comment les services associés sont impactés. Consultez la description dans l'application de ce que signifie chaque niveau de gravité et suivez les directives de votre équipe.                                                                                |
| {{< ui >}}Incident Commander{{< /ui >}}       | Laissez-le assigné à vous. Dans un incident réel, cela serait assigné au responsable de l'enquête sur l'incident. Vous ou d'autres personnes pouvez mettre à jour le responsable de l'incident au fur et à mesure que l'enquête sur l'incident progresse.                                                                                 |
9. Cliquez sur {{< ui >}}Declare Incident{{< /ui >}} pour créer l'incident.
   Vous pouvez également déclarer un incident à partir d'un [graph][4], d'un [monitor][5] ou de l'[incidents API][6]. Pour les utilisateurs d'APM, vous pouvez cliquer sur l'icône des incidents sur n'importe quel graphique APM pour déclarer un incident.
Dans le cadre de l'intégration Slack, vous pouvez également utiliser le raccourci `/datadog incident` pour déclarer un incident et définir le titre, la gravité et l'impact sur le client.
10. Cliquez sur {{< ui >}}Slack Channel{{< /ui >}} sur la page de l'incident pour accéder au canal Slack de l'incident.
   
Un nouveau canal Slack dédié à l'incident est automatiquement créé pour tout nouvel incident, afin que vous puissiez consolider la communication avec votre équipe et commencer le dépannage. Si l'intégration Slack de votre organisation est configurée pour mettre à jour un canal d'incident global, alors le canal est mis à jour avec le nouvel incident.

Si vous n'avez pas activé l'intégration Slack, cliquez sur {{< ui >}}Add Chat{{< /ui >}} pour ajouter le lien vers le service de chat que vous utilisez pour discuter de l'incident.

Cliquez sur {{< ui >}}Add Video Call{{< /ui >}} pour ajouter un lien vers l'appel où les discussions sur l'incident ont lieu. 

### Dépannage et mise à jour de l'incident {#troubleshooting-and-updating-the-incident}

La page Incident comporte quatre sections principales : {{< ui >}}Overview{{< /ui >}}, {{< ui >}}Timeline{{< /ui >}}, {{< ui >}}Post-Incident{{< /ui >}} et {{< ui >}}Notifications{{< /ui >}}. Mettez à jour ces sections au fur et à mesure de la progression de l'incident pour tenir tout le monde informé de l'état actuel.

#### Vue d'ensemble {#overview-1}

**Scénario :** Après quelques recherches, vous découvrez que la cause première est un host à court de mémoire. Vous avez également été informé qu'un petit sous-ensemble de clients est affecté et que les pages se chargent lentement. Le premier rapport client est arrivé il y a 15 minutes. Il s'agit d'un incident SEV-3.

Dans la section {{< ui >}}Overview{{< /ui >}}, vous pouvez mettre à jour les champs de l'incident et l'impact client au fur et à mesure de la poursuite de l'enquête.

Pour modifier le niveau de gravité et la cause d'origine, procédez comme suit :
1. Cliquez sur la liste déroulante {{< ui >}}Severity{{< /ui >}} et sélectionnez {{< ui >}}SEV-3{{< /ui >}}.
2. Sous {{< ui >}}What happened{{< /ui >}}, sélectionnez {{< ui >}}Monitor{{< /ui >}} dans la liste déroulante {{< ui >}}Detection Method{{< /ui >}} (Inconnu est sélectionné), car vous avez été alerté en premier par un monitor sur le problème.
1. Ajoutez au champ {{< ui >}}Why it happened{{< /ui >}} : `TEST: Host is running out of memory.`
4. Cliquez sur {{< ui >}}Save{{< /ui >}} pour mettre à jour les propriétés.
    Depuis Slack, vous pouvez également mettre à jour le titre, la gravité ou le statut d'un problème en cours à l'aide de la commande `/datadog incident update`.

Pour ajouter un impact client, procédez comme suit :
1. Cliquez sur {{< ui >}}\+ Add{{< /ui >}} dans la section {{< ui >}}Impact{{< /ui >}}.
2. Modifiez l'horodatage pour le reculer de 15 minutes, car c'est à ce moment-là que le premier rapport client est arrivé.
3. Ajoutez au champ de descriptions : `TEST: Some customers seeing pages loading slowly.`
4. Cliquez sur {{< ui >}}Save{{< /ui >}} pour mettre à jour les champs. La section {{< ui >}}Impact{{< /ui >}} se met à jour pour indiquer depuis combien de temps l'impact sur les clients dure. Toutes les modifications effectuées sur la page {{< ui >}}Overview{{< /ui >}} sont ajoutées à la {{< ui >}}Timeline{{< /ui >}}.

#### Chronologie {#timeline}

Le {{< ui >}}Timeline{{< /ui >}} affiche les ajouts et les modifications apportés aux champs et aux informations d'incident par ordre chronologique.

{{< img src="getting_started/incident_management/flag_event.png" alt="Marquer l'événement" responsive="true" style="width:50%;">}}

1. Cliquez sur l'onglet {{< ui >}}Timeline{{< /ui >}}.
2. Trouvez l'événement {{< ui >}}Impact added{{< /ui >}} et marquez-le comme {{< ui >}}Important{{< /ui >}} en cliquant sur l'icône de drapeau.
3. Ajoutez une note à la chronologie : `I found the host causing the issue.`
4. Survolez l'événement de la note et cliquez sur l'icône en forme de crayon pour modifier l'horodatage de la note car vous avez en fait trouvé le host à l'origine du problème il y a 10 minutes.
5. Marquez la note comme {{< ui >}}Important{{< /ui >}}.
6. Cliquez sur {{< ui >}}Slack Channel{{< /ui >}} pour revenir au canal Slack de l'incident.
7. Publiez un message dans le canal indiquant `I am working on a fix.`
8. Cliquez sur l'icône de commande d'actions du message (trois points sur la droite après avoir survolé un message).
9. Sélectionnez {{< ui >}}Add to Incident{{< /ui >}} pour envoyer le message à la chronologie.

{{< img src="getting_started/incident_management/add_from_slack.png" alt="Ajouter depuis Slack" responsive="true" style="width:40%;">}}

Vous pouvez ajouter n'importe quel commentaire publié sur le canal Slack de l'incident à la chronologie, afin de rassembler les communications importantes relatives aux phases d'enquête et de remédiation.

#### Post-incident {#post-incident}

**Scénario :** Il existe un notebook sur la façon de gérer ce type de problème, qui inclut les tâches à effectuer pour le résoudre.

 Dans la section {{< ui >}}Post-Incident{{< /ui >}}, vous pouvez suivre les documents et les tâches pour l'investigation du problème ou pour les tâches de remédiation post-incident.

1. Cliquez sur l'onglet {{< ui >}}Post-Incident{{< /ui >}}.
2. Cliquez sur l'icône plus `+` dans la zone {{< ui >}}Documents{{< /ui >}} et ajoutez un lien vers un [Datadog notebook][7]. Toutes les mises à jour de la section {{< ui >}}Documents{{< /ui >}} sont ajoutées à la chronologie en tant que type {{< ui >}}Incident Update{{< /ui >}}.
3. Ajoutez une tâche en ajoutant une description de tâche dans la zone {{< ui >}}Incident Tasks{{< /ui >}}, par exemple : `Run the steps in the notebook.`
4. Cliquez sur {{< ui >}}Create Task{{< /ui >}}.
5. Cliquez sur {{< ui >}}Assign To{{< /ui >}} et assignez-vous la tâche.
6. Cliquez sur {{< ui >}}Set Due Date{{< /ui >}} et définissez la date à aujourd'hui.
    Tous les ajouts et modifications de tâches sont enregistrés dans le {{< ui >}}Timeline{{< /ui >}}.
    Vous pouvez également ajouter des tâches post-incident dans la section {{< ui >}}Post-Incident{{< /ui >}} pour en assurer le suivi.

#### Notifications {#notifications}

**Scénario :** Le problème a été atténué et l'équipe surveille la situation. Le statut de l'incident est stable.

Dans la section {{< ui >}}Notifications{{< /ui >}}, vous pouvez envoyer une notification mettant à jour le statut de l'incident.

1. Revenez à la section {{< ui >}}Overview{{< /ui >}}.
2. Modifiez le statut dans le menu déroulant de {{< ui >}}ACTIVE{{< /ui >}} à {{< ui >}}STABLE{{< /ui >}}.
4. Accédez à l'onglet {{< ui >}}Notifications{{< /ui >}}.
5. Cliquez sur {{< ui >}}New Notification{{< /ui >}}.
    Par défaut, le message utilise le titre de l'incident comme objet et comprend des informations sur le statut actuel de l'incident dans le corps.
    Lors d'un incident réel, vous enverriez des mises à jour aux personnes impliquées dans l'incident. Pour cet exemple, envoyez une notification uniquement à vous.
6. Ajoutez-vous au champ {{< ui >}}Recipients{{< /ui >}}.
7. Cliquez sur {{< ui >}}Send{{< /ui >}}.
    Vous devriez recevoir un e-mail contenant le message.
    Vous pouvez créer des [modèles de message][8] personnalisés. Regroupez les modèles à l'aide du champ {{< ui >}}Category{{< /ui >}}.

### Résolution et post-mortem {#resolution-and-postmortem}

**Scénario:** Il a été confirmé que le problème n'impacte plus les clients et que vous avez résolu le problème. L'équipe souhaite un post-mortem pour examiner ce qui a mal tourné.

1. Accédez à {{< ui >}}Overview{{< /ui >}}la section.
3. Modifiez le statut de {{< ui >}}STABLE{{< /ui >}} à {{< ui >}}RESOLVED{{< /ui >}} afin qu'il ne soit plus actif. Vous pouvez également modifier la date et l'heure du moment où l'impact client s'est terminé, si cela est arrivé plus tôt.
7. Lorsque le statut d'un incident est défini sur résolu, un bouton {{< ui >}}Generate Postmortem{{< /ui >}} apparaît en haut. Cliquez sur {{< ui >}}Generate Postmortem{{< /ui >}}.
8. Pour la section chronologie, sélectionnez {{< ui >}}Marked as Important{{< /ui >}} afin que seuls les événements {{< ui >}}Important{{< /ui >}} soient ajoutés au post-mortem.
9. Cliquez sur {{< ui >}}Generate{{< /ui >}}.

Le post-mortem inclut les événements de la chronologie et les ressources référencées pendant l'enquête et la remédiation. Cela facilite l'examen et la documentation ultérieure de la cause du problème et de la manière de l'éviter à l'avenir. Pour plus d'informations, consultez [Incident Postmortems][17].

S'il y a des tâches de suivi que vous et votre équipe devez accomplir pour garantir que le problème ne se reproduise plus, ajoutez-les et suivez-les dans la section {{< ui >}}Incident Tasks{{< /ui >}} du post-incident.

{{< img src="getting_started/incident_management/generate_postmortem.png" alt="Générer un post-mortem" responsive="true" style="width:80%;">}}
## Personnalisation de votre workflow de gestion des incidents {#customizing-your-incident-management-workflow}

Datadog Incident Management peut être personnalisé avec différents niveaux de gravité et de statut, en fonction des besoins de votre organisation, et peut également inclure des informations supplémentaires telles que les services APM et les équipes liées à l'incident. Pour plus d'informations, consultez cette [section][9] de la page Incident Management.

Vous pouvez également configurer des règles de notification pour avertir automatiquement des personnes ou des services spécifiques en fonction du niveau de gravité d'un incident. Pour plus d'informations, consultez la documentation [Paramètres des incidents][10].

Pour personnaliser Incident Management, accédez à la [page des paramètres des incidents][11]. Depuis le menu Datadog sur la gauche, accédez à {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Incidents{{< /ui >}} (si un écran de bienvenue d'Incident Management s'affiche, cliquez sur {{< ui >}}Get Started{{< /ui >}}). Ensuite, en haut, cliquez sur {{< ui >}}Settings{{< /ui >}}.

## Créer et gérer des incidents sur mobile {#create-and-manage-incidents-on-mobile}

Grâce à l'[application mobile Datadog][12], disponible sur l'[App Store d'Apple][13] et le [Google Play Store][14], vous pouvez créer des incidents, mais également consulter, rechercher et filtrer tous les incidents auxquels vous avez accès avec votre compte Datadog. Cette application vous permet de prendre rapidement des mesures et de résoudre des problèmes, même lorsque vous n'êtes pas devant votre ordinateur.

Vous avez également la possibilité de déclarer et de modifier des incidents, ainsi que d'échanger rapidement avec vos équipes via les intégrations Slack, Zoom, et plus encore.

{{< img src="incident_response/incident_management/iOS_Incident_V2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Deux vues dans l'application mobile Datadog : l'une affichant une liste d'incidents avec des détails généraux sur chaque incident, et l'autre affichant un panneau détaillé pour un incident unique.">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/slack/
[2]: /fr/dashboards/guide/datadog_clipboard
[3]: /fr/notebooks/#overview
[4]: /fr/incident_response/incident_management/#from-a-graph
[5]: /fr/incident_response/incident_management/#from-a-monitor
[6]: /fr/api/latest/incidents/#create-an-incident
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/incidents/settings#Messages
[9]: /fr/incident_response/incident_management/#status-levels
[10]: /fr/incident_response/incident_management/incident_settings
[11]: https://app.datadoghq.com/incidents/settings
[12]: /fr/mobile/
[13]: https://apps.apple.com/app/datadog/id1391380318
[14]: https://play.google.com/store/apps/details?id=com.datadog.app
[15]: https://app.datadoghq.com/dashboard/lists
[16]: https://app.datadoghq.com/monitors/manage
[17]: /fr/incident_response/incident_management/post_incident/postmortems