---
description: Créez, liez et maintenez Datadog Teams synchronisées avec les groupes
  d'affectation ServiceNow.
further_reading:
- link: /integrations/servicenow/
  tag: Documentation
  text: Intégration ServiceNow
- link: /account_management/teams/
  tag: Documentation
  text: Datadog Teams
- link: /account_management/teams/github/
  tag: Documentation
  text: Provisionnez Datadog Teams avec GitHub
title: Provisionner Datadog Teams avec ServiceNow
---
## Présentation {#overview}

Si votre organisation gère déjà des groupes d'affectation dans ServiceNow, vous pouvez les utiliser comme source pour Datadog Teams au lieu de recréer les équipes manuellement. La connexion des groupes d'affectation ServiceNow à Datadog Teams prend en charge :

- La création de Datadog Teams à partir de vos groupes d'affectation ServiceNow.
- La liaison de Datadog Teams existantes aux groupes d'affectation ServiceNow. Par exemple, vous pouvez acheminer On-Call et Incidents selon le groupe ServiceNow.
- Le maintien de la synchronisation de l'appartenance aux équipes avec ServiceNow, de façon ponctuelle ou récurrente.

Si vos groupes d'affectation ServiceNow ont des groupes parents, Datadog reproduit cette même hiérarchie lors du provisionnement.

Les Datadog Teams existantes sont liées, et non dupliquées, lorsque l'[identifiant][7] d'une équipe Datadog correspond au nom d'un groupe d'affectation ServiceNow. La correspondance ne tient pas compte de la casse et ignore les différences d'espaces. Toutes les autres Datadog Teams existantes et leurs autorisations ne sont pas affectées.

Datadog dispose d'un accès en lecture seule aux groupes d'affectation ServiceNow. Datadog n'écrit jamais dans ces groupes, n'en crée pas et ne les modifie pas.

## Prérequis {#prerequisites}

### Intégration ServiceNow {#servicenow-integration}

Votre organisation Datadog doit être connectée à au moins une instance ServiceNow via l'[intégration ServiceNow][1]. Aucune autorisation ServiceNow au-delà de la configuration d'intégration standard n'est requise.

L'intégration est configurée par organisation Datadog.

### Autorisations{#permissions}

- La liaison et la création d'équipes nécessitent l'autorisation `teams_manage`.
- La synchronisation de l'appartenance aux équipes nécessite l'autorisation `user_access_manage`.
- La configuration de l'intégration ServiceNow, ou la modification de sa tuile pour ajouter ou changer un filtre de groupe d'affectation, nécessite l'autorisation `manage_integrations`.

## Configuration {#setup}

### Connectez les groupes d'affectation ServiceNow à Datadog Teams {#connect-servicenow-assignment-groups-to-datadog-teams}

1. Accédez à [Teams > Data Sources][6].
2. Sélectionnez {{< ui >}}ServiceNow{{< /ui >}}.
3. Choisissez le type d'importation :
   - {{< ui >}}Import, create, and link teams{{< /ui >}} : Datadog crée une équipe pour chaque groupe d'affectation ServiceNow concerné et la lie à ce groupe.
   - {{< ui >}}Link only{{< /ui >}} : Datadog lie les Datadog Teams existantes aux groupes d'affectation correspondants sans créer d'équipes. Utilisez cette option lorsque vous gérez les équipes dans Datadog ou via SAML et que vous avez uniquement besoin du mappage Datadog vers ServiceNow.
4. Choisissez si vous souhaitez gérer l'appartenance aux équipes depuis ServiceNow. Si vous avez sélectionné {{< ui >}}Import, create, and link teams{{< /ui >}}, activez la synchronisation des membres afin que les équipes créées par Datadog aient des membres. La synchronisation des membres peut prendre jusqu'à 24 heures pour prendre effet.
5. Choisissez la fréquence de synchronisation :
   - {{< ui >}}One-time{{< /ui >}} : Datadog importe les groupes d'affectation une seule fois.
   - {{< ui >}}Recurring{{< /ui >}} : Datadog effectue une synchronisation au moins une fois toutes les 24 heures.
6. Sélectionnez les instances ServiceNow connectées à inclure.
7. Sélectionnez {{< ui >}}Save{{< /ui >}}.

### Filtrer les groupes d'affectation {#filter-assignment-groups}

Par défaut, Datadog synchronise chaque groupe d'affectation dans les instances sélectionnées. Pour synchroniser uniquement un sous-ensemble, ajoutez un filtre dans la [tuile d'intégration ServiceNow][3] en utilisant la [syntaxe de requête encodée][4] de ServiceNow. Datadog transmet le filtre à ServiceNow et ne reçoit que les groupes d'affectation correspondants.

Les filtres courants incluent :

- Uniquement les groupes d'affectation actifs.
- Uniquement les groupes d'affectation qui apparaissent dans votre catalogue de services.

Définissez le filtre avant votre première synchronisation. Le restreindre ultérieurement ne supprime pas les équipes qui existent déjà. Voir [Suppression des groupes d'affectation de la synchronisation](#removing-assignment-groups-from-the-sync).

### Limites {#limits}

Datadog importe jusqu'à 100,000 groupes d'affectation par organisation et jusqu'à 10,000 membres par groupe d'affectation. Les équipes créées à partir de groupes d'affectation comptent également dans les [limites de Datadog Teams][9], y compris le nombre maximal d'équipes et la profondeur de la hiérarchie.

Si vos groupes d'affectation dépassent ces limites, Datadog vous invite à les filtrer avant le début de l'importation. Utilisez un [filtre](#filter-assignment-groups) pour réduire le nombre de groupes d'affectation importés, ou contactez [Datadog Support][8] pour demander une augmentation de la limite.

### Consultez Datadog Teams {#view-datadog-teams}

1. Accédez à [Teams > Data Sources][6].
2. Si aucune équipe créée ou liée n'apparaît, sélectionnez {{< ui >}}Refresh{{< /ui >}}.
3. Si vous le souhaitez, modifiez manuellement Datadog Teams pour atteindre l'état souhaité.

Vous pouvez également trouver les équipes synchronisées à partir de la liste [Teams][2] : filtrez la facette {{< ui >}}Connection{{< /ui >}} sur `ServiceNow`.

## Correspondance des utilisateurs {#user-matching}

Datadog fait correspondre les utilisateurs par adresse e-mail. Un utilisateur est ajouté à une équipe lorsque son adresse e-mail Datadog correspond à son adresse e-mail dans ServiceNow.

L'intégration ne crée pas d'utilisateurs Datadog et n'envoie pas d'invitations. Si un membre d'un groupe d'affectation ServiceNow ne possède pas de compte Datadog, Datadog l'ignore.

Si l'adresse e-mail d'un utilisateur change, par exemple après une migration de domaine, mettez à jour l'adresse à la fois dans Datadog et dans ServiceNow. La prochaine synchronisation récupère la nouvelle adresse et relie à nouveau l'utilisateur.

## Renommage de groupes d'affectation {#renaming-assignment-groups}

Datadog identifie chaque groupe d'affectation ServiceNow par son ID unique ; ainsi, renommer un groupe dans ServiceNow ne crée pas d'équipe Datadog. L'identifiant de l'équipe Datadog ne change jamais, ce qui permet à la télémétrie et aux dashboards tagués avec cet identifiant de rester liés à l'équipe.

Le nom de l'équipe Datadog suit le renommage ServiceNow uniquement lorsque toutes les conditions suivantes sont remplies :

- La connexion ServiceNow a créé l'équipe Datadog.
- Aucune autre source, telle que SCIM, ne gère l'équipe.
- La connexion utilise {{< ui >}}Import, create, and link teams{{< /ui >}}.

Dans tous les autres cas, Datadog laisse le nom de l'équipe inchangé.

## Retrait des groupes d'affectation de la synchronisation {#removing-assignment-groups-from-the-sync}

Lorsqu'un groupe d'affectation n'est plus synchronisé — par exemple, parce que vous avez restreint le filtre — Datadog ne supprime pas l'équipe Datadog correspondante. Au lieu de cela, Datadog supprime tous les membres synchronisés de l'équipe et laisse l'équipe en place sans aucun membre. Cela s'applique aux synchronisations ponctuelles et récurrentes.

Pour supprimer les équipes vides :

1. Accédez à [Teams][2].
2. Filtrez la facette {{< ui >}}Connection{{< /ui >}} sur `ServiceNow`.
3. Sélectionnez les équipes à supprimer et supprimez-les.

Les modifications effectuées par la synchronisation ne peuvent pas être annulées automatiquement. [Audit Trail][5] enregistre chaque modification, ce qui vous permet de restaurer manuellement un état précédent.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/servicenow/
[2]: https://app.datadoghq.com/organization-settings/teams
[3]: https://app.datadoghq.com/integrations/servicenow
[4]: https://www.servicenow.com/docs/r/platform-user-interface/c_EncodedQueryStrings.html
[5]: /fr/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/teams/data-sources
[7]: /fr/account_management/teams/#team-handle
[8]: /fr/help/
[9]: /fr/account_management/teams/manage/#limits