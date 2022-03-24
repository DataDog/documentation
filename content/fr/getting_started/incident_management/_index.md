---
title: Débuter avec la Gestion des incidents
kind: documentation
further_reading:
  - link: /monitors/incident_management/datadog_clipboard
    tag: Documentation
    text: Presse-papiers Datadog
  - link: https://www.youtube.com/watch?v=QIambwILy_M
    tag: Vidéo
    text: Datadog sur la Gestion des incidents
  - link: /monitors/incident_management
    tag: Documentation
    text: Gestion des incidents
  - link: https://www.datadoghq.com/blog/incident-response-with-datadog/
    tag: Blog
    text: Gestion des incidents avec Datadog
  - link: /monitors/incident_management/notification_rules
    tag: Documentation
    text: Règles de notification
  - link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
    tag: Documentation
    text: Intégration de Slack avec les incidents
  - link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
    tag: Blog
    text: Pratiques recommandées pour la création de post-mortems d'incident
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">La fonctionnalité de gestion des incidents n'est pas disponible le site Datadog que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

La Gestion des incidents de Datadog sert à suivre et communiquer sur un problème que vous avez identifié avec vos métriques, traces, ou logs.

Ce guide vous explique comment utiliser le site Datadog pour déclarer un incident, mettre à jour l'incident au fur et à mesure que les phases d'investigation et de remédiation avancent, et générer un post-mortem une fois l'incident résolu. L'exemple que nous allons étudier part du principe que l'[intégration Slack][1] est activée.

## De la détection d'un incident à sa résolution

### Déclaration d'un incident

**Scénario** : Un monitor déclenche une alerte suite à un nombre élevé d'erreurs susceptibles de ralentir plusieurs services. On ne sait pas si les clients sont impactés.

Ce guide décrit l'utilisation du [presse-papiers Datadog][2] pour déclarer un incident.

1. Ouvrez le presse-papiers : **Ctrl**/**Cmd** + **Shift** + **K**.

   Le presse-papiers vous permet de recueillir des informations à partir de plusieurs sources différentes, telles que des graphiques, des dashboards entiers ou des [notebooks][3]. Vous pouvez ainsi facilement ajouter autant d'informations que possible lorsque vous déclarez un incident.

   Pour ce guide, choisissez un graphique dans le dashboard _System - Metrics_ et copiez-le dans le presse-papiers.

2. Dans le menu de Datadog sur la gauche, accédez à **Dashboard** > **Dashboard lists** et sélectionnez **System - Metrics**.

3. Survolez l'un des graphiques et copiez-le dans le presse-papier :

    a. **Ctrl**/**Cmd** + **C**

    ou

    b. Cliquez sur l'icône **Export** sur le graphique et sélectionnez **Copy**.

4. Dans le menu de Datadog sur la gauche, accédez à **Monitors** > **Manage Monitors** et sélectionnez **[Auto] Clock in sync with NTP**.

5. Cliquez sur **Add current page** pour ajouter le monitor au presse-papiers.

{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="Copier dans le presse-papiers" responsive="true" style="width:100%;">}}

6. Cliquez sur **Select All** puis sur **Add Selected Items To…**

7. Sélectionnez **New Incident**.

8. Décrivez la situation :
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Severity | Définie sur **Unknown**, car on ne sait pas encore si les clients sont impactés ni comment les services connexes sont impactés. Consultez la description de chaque niveau de sévérité dans l'application et suivez les directives de votre équipe.                                                                                    |
| Title                    | Suivez les conventions de nommage appliquées par votre équipe pour les titres d'incidents. Comme il ne s'agit pas d'un véritable incident ici, ajoutez le mot `TEST` pour montrer clairement qu'il s'agit d'un test. Exemple de titre : `[TEST] Mon test d'incident`                                                                      |
| Signals                  | Les signaux sont la raison pour laquelle vous déclarez l'incident. Il peut s'agir de graphiques, de logs ou de tout visuel clé. Le graphique et le monitor que vous avez sélectionnés sont déjà inclus, mais vous pouvez ajouter des signaux supplémentaires. Par exemple, copiez l'URL de ce guide et ajoutez-la avec **Ctrl**/**Cmd** + **V**.                      |
| Incident Commander       | Laissez votre nom. Dans le cas d'un véritable incident, celui-ci serait alors assigné à la personne responsable de l'enquête. L'Incident Commander peut être modifié à mesure que l'enquête avance.                                                                                 |
| Additional Notifications | Laissez ce champ vide : comme il ne s'agit que d'un test, il n'est pas nécessaire d'alerter une autre personne ou un autre service. Dans le cas d'un véritable incident, ajoutez les personnes et les services à prévenir pour faciliter les phases d'enquête et de remédiation. Vous pouvez envoyer ces notifications via Slack ou PagerDuty. |

9. Cliquez sur **Declare Incident** pour créer l'incident.

   Vous pouvez également déclarer un incident depuis un [graphique][4], un [monitor][5] ou via [l'API incidents][6]. Si vous utilisez l'APM, vous pouvez cliquer sur l'icône en forme de **sirène** sur n'importe quel graphique APM pour déclarer un incident.

   {{< img src="getting_started/incident_management/apm_siren.png" alt="Sirène APM" responsive="true" style="width:50%;">}}

    Avec l'intégration Slack, vous pouvez également utiliser le raccourci `/datadog incident` pour déclarer un incident et définir le titre, la sévérité et l'impact sur les clients.

   Une fois l'incident créé, vous pouvez ajouter des notifications supplémentaires en cliquant sur le bouton _Notify_ en haut à droite.

    {{< img src="getting_started/incident_management/notify_button.png" alt="Notify" responsive="true" style="width:100%;">}}

10. Cliquez sur **Open Slack Channel** en haut à gauche de la page de l'incident pour ouvrir le canal Slack de l'incident.

    {{< img src="getting_started/incident_management/open_slack_channel.png" alt="Open Slack Channel" responsive="true" style="width:60%;">}}

    Un nouveau canal Slack dédié est automatiquement créé pour chaque nouvel incident afin de simplifier les échanges avec votre équipe et de commencer le dépannage. Si l'intégration Slack de votre organisation est configurée pour mettre à jour un canal d'incident global, alors le canal est mis à jour avec le nouvel incident.

    Dans cet exemple, vous êtes la seule personne ajoutée au canal du nouvel incident. Lorsque vous ajoutez des personnes ou services supplémentaires dans Additional Notifications pour un véritable incident, tout le monde est automatiquement ajouté au canal de l'incident.

    Si vous n'avez pas activé l'intégration Slack, cliquez sur **Link to Chat** pour ajouter un lien vers le service de chat que vous utilisez pour discuter de l'incident.

    Vous pouvez également utiliser l'option **Link Video Call** pour ajouter un lien vers l'appel dédié aux échanges sur l'incident.

### Dépannage et mise à jour de l'incident

La page d'un incident comprend quatre sections principales : _Overview_, _Timeline_, _Remediation_ et _Communication_. Mettez à jour ces sections à mesure que l'incident évolue pour tenir l'équipe informée.

#### Présentation

**Scénario :** Après une première enquête, vous découvrez que le problème est causé par un host qui arrive à court de mémoire. Vous avez également été informé qu'une petite partie des clients est impactée, avec un chargement des pages ralenti. Le premier signalement client est arrivé il y a 15 minutes. Il s'agit d'un incident de sévérité 3.

Dans la section _Overview_, vous pouvez mettre à jour les champs de l'incident et l'impact sur les clients à mesure que l'enquête progresse.

Pour mettre à jour le niveau de sévérité et la cause d'origine :

1. Cliquez sur l'onglet **Overview**.

2. Cliquez sur **Edit** dans le champ _Properties_.

3. Cliquez sur la liste déroulante _Severity_ et sélectionnez **SEV-3**.

4. Ajoutez ce qui suit dans le champ _Root Cause_ : `TEST: Host is running out of memory.`

5. Sélectionnez **Monitor** dans la liste déroulante _Detection_, car vous avez été alerté du problème par un monitor.

6. Cliquez sur **Save** pour mettre à jour les propriétés.

    Vous pouvez également mettre à jour le titre, la sévérité ou le statut d'un problème en cours depuis Slack via la commande `/datadog incident update`.

Pour mettre à jour l'impact client :

1. Cliquez sur **Edit** dans le champ _Impact_.

2. Sélectionnez **Yes** dans la liste déroulante _Customer impact_.

3. Définissez l'heure sur 15 minutes plus tôt, car c'est à ce moment-là que le premier signalement client est arrivé.

4. Ajoutez ce qui suit dans _Scope of impact_ : `TEST: Some customers seeing pages loading slowly.`

5. Cliquez sur **Save** pour mettre à jour les champs.

    Le haut de la page de l'incident affiche la durée de l'impact client. Toutes les modifications effectuées sur la page _Overview_ s'affichent sur la _Timeline_.

#### Timeline

La _Timeline_ affiche les modifications des champs et des informations de l'incident par ordre chronologique.

1. Cliquez sur l'onglet **Timeline**.

    Les filtres _Content Type_, _Important_ et _Responder_ vous permettent d'afficher des types d'événements spécifiques.

2. Trouvez l'événement _Customer impact updated_ et marquez-le comme _Important_ en cliquant sur le drapeau.

    {{< img src="getting_started/incident_management/flag_event.png" alt="Marquer un événement comme important" responsive="true" style="width:50%;">}}

    Vous pouvez marquer n'importe quel événement comme _Important_ puis choisir d'inclure uniquement les événements de la timeline marqués comme _Important_ lors de la création du post-mortem une fois l'incident résolu.

3. Ajoutez une remarque dans la timeline : `I found the host causing the issue.`

4. Survolez l'événement de la remarque et cliquez sur le crayon pour modifier l'heure associée, étant donné que vous avez en fait trouvé le host à l'origine du problème il y a 10 minutes.

    {{< img src="getting_started/incident_management/edit_event_timestamp.png" alt="Heure de l'événement" responsive="true" style="width:90%;">}}

5. Marquez la remarque comme **Important**.

6. Cliquez sur **Open Slack Channel** pour retourner sur le canal Slack de l'incident.

7. Publiez un message dans le canal disant `I am working on a fix.`

8. Cliquez sur l'icône de menu du message (trois petits points sur la droite après avoir survolé un message).

9. Sélectionnez **Add to Incident** pour ajouter le message à la timeline.

    {{< img src="getting_started/incident_management/add_from_slack.png" alt="Ajouter depuis Slack" responsive="true" style="width:40%;">}}

    Vous pouvez ajouter n'importe quel commentaire publié sur le canal Slack de l'incident à la timeline afin de consolider les communications importantes relatives aux phases d'enquête et de remédiation.

#### Remediation

**Scénario :** Il existe un notebook qui explique comment gérer ce type de problème, ainsi que les tâches à effectuer pour le résoudre.

 La section _Remediation_ vous permet d'enregistrer des documents et des tâches pour enquêter sur le problème ou pour garder une trace des étapes de remédiation suivies une fois l'incident terminé.

1. Cliquez sur l'onglet **Remediation**.

2. Cliquez sur l'icône plus (+) dans le champ _Documents_, puis ajoutez un lien vers un notebook Datadog.

    Toutes les modifications de la section _Documents_ sont ajoutées à la timeline en tant que _Incident Update_.

3. Ajoutez une tâche en ajoutant une description de la tâche dans le champ _Incident Tasks_, par exemple : `Run the steps in the notebook.`

4. Cliquez sur **Create Task**.

5. Cliquez sur **Assign To** et assignez la tâche à vous-même.

6. Cliquez sur **Set Due Date** et choisissez la date actuelle.

    Les ajouts et modifications sont enregistrés dans la _Timeline_.

    Vous pouvez également ajouter des tâches une fois l'incident résolu dans la section _Remediation_ pour en garder une trace.

#### Communications

**Scénario :** Le problème a été corrigé, et l'équipe surveille la situation. Le statut de l'incident est stable.

La section _Communications_ vous permet d'envoyer une notification tout en mettant à jour le statut de l'incident.

1. Revenez à la section _Overview_.

2. Cliquez sur **Edit** dans le champ _Properties_ et définissez le statut sur _stable_.

3. Cliquez sur **Save**.

4. Allez à l'onglet _Communications_.

5. Cliquez sur **New Communication**.

    Par défaut, le message utilise le titre de l'incident comme objet et comprend des informations sur le statut actuel de l'incident dans le corps.

    En situation réelle, vous enverriez des mises à jour aux personnes concernées par l'incident. Ici, envoyez une notification à vous-même uniquement.

6. Ajoutez-vous dans _Add recipients_.

7. Cliquez sur **Send**.

    Vous devriez recevoir un e-mail contenant le message.

    Vous pouvez créer des modèles personnalisés en cliquant sur **Manage Templates** > **New Template**. Utilisez le champ _Category_ pour regrouper plusieurs modèles.

### Résolution et post-mortem

**Scénario :** Vous avez la confirmation que plus aucun client n'est impacté et que vous avez résolu le problème. L'équipe veut un post-mortem pour revenir sur ce qui s'est mal passé.

1. Allez à la section _Overview_.

2. Cliquez sur **Edit** dans le champ _Impact_ pour mettre à jour l'impact client.

3. Désactivez l'option **Active**.

    Vous pouvez également modifier la date et l'heure du moment où l'impact client s'est terminé, si cela est arrivé plus tôt.

4. Cliquez sur **Edit** dans le champ _Properties_ pour mettre à jour le statut de l'incident.

5. Définissez le statut sur _Resolved_.

6. Cliquez sur **Save**.

    Lorsque le statut d'un incident est défini sur Resolved, un bouton _Generate Postmortem_ apparaît en haut.

    {{< img src="getting_started/incident_management/generate_postmortem.png" alt="Générer un post-mortem" responsive="true" style="width:80%;">}}

7. Cliquez sur **Generate Postmortem**.

8. Pour la section timeline, sélectionnez **Marked as Important** afin que seuls les événements _Important_ soient ajoutés au post-mortem.

9. Cliquez sur **Generate**.

    Le post-mortem est généré sous forme de notebook Datadog. Il comprend les événements et ressources de la timeline associés aux phases d'enquête et de remédiation. Vous pouvez ainsi facilement passer en revue les informations, documenter les causes exactes du problème et indiquer comment empêcher qu'il ne se reproduise. Le notebook Datadog prend en charge la collaboration en direct, ce qui vous permet de le modifier avec vos collègues en temps réel.

    Si des tâches consécutives doit être accomplies par vous et votre équipe pour garantir que le problème ne se reproduira pas, ajoutez-les et suivez-les dans la section _Incident Tasks_.

## Personnalisation de votre workflow de gestion des incidents

La Gestion des incidents Datadog peut être personnalisée avec différents niveau de sévérité et de statut en fonction des besoins de votre organisation. Vous pouvez également ajouter des informations supplémentaires, telles que des services APM et les équipes responsables de l'incident. Pour en savoir plus, consultez cette [section][7] de la page de Gestion des incidents.

Vous avez la possibilité de définir des règles de notification pour prévenir automatiquement des personnes ou services spécifiques, en fonction du niveau de sévérité d'un incident. Pour en savoir plus, consultez la documentation [Règles de notifications][8].

Pour personnaliser la Gestion des incident, accédez à la [page de paramètres de l'incident][9]. Depuis le menu Datadog sur le côté gauche, allez dans **Monitors** > **Incidents** (si vous obtenez un écran de bienvenue, cliquez sur **Démarrer**). Ensuite, cliquez cliquez sur **Settings** en haut à droite.

{{< img src="getting_started/incident_management/im_settings_button.png" alt="Paramètres" responsive="true" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/slack/
[2]: /fr/monitors/incident_management/datadog_clipboard
[3]: /fr/notebooks/#overview
[4]: /fr/monitors/incident_management/#from-a-graph
[5]: /fr/monitors/incident_management/#from-a-monitor
[6]: /fr/api/latest/incidents/#create-an-incident
[7]: /fr/monitors/incident_management/#status-levels
[8]: /fr/monitors/incident_management/notification_rules
[9]: https://app.datadoghq.com/incidents/settings