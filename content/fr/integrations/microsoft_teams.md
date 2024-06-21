---
categories:
- collaboration
- network
- notification
dependencies: []
description: Soyez informé des événements et des alertes Datadog dans Microsoft Teams.
doc_link: https://docs.datadoghq.com/integrations/microsoft_teams/
draft: false
git_integration_title: microsoft_teams
has_logo: true
integration_id: ''
integration_title: Microsoft Teams
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: microsoft_teams
public_title: Intégration Datadog/Microsoft Teams
short_description: Soyez informé des événements et des alertes Datadog dans Microsoft Teams.
version: '1.0'
---

## Présentation

Intégrez Microsoft Teams pour :

- Être informé des événements et des alertes Datadog dans Microsoft Teams
- Gérer les incidents depuis Microsoft Teams

## Publier les notifications de monitor dans un canal Microsoft Teams

### Implémentation

Pour intégrer Datadog à un canal Microsoft Teams :

1. Cliquez sur le bouton `...` à proximité du nom du canal dans la liste des canaux, puis choisissez **Connectors**.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_1_v2.png" alt="Microsoft Teams (étape 1)" >}}

2. Recherchez Datadog et cliquez sur **Configure**.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_2_v2.png" alt="Microsoft Teams (étape 2)" >}}

3. Dans la fenêtre de configuration du connecteur, copiez l'URL du webhook.
4. Dans Datadog, accédez à [**Integrations > Microsoft Teams**][1].
5. Dans l'onglet Configuration, cliquez sur **Add Channel**, nommez votre canal, puis collez l'URL du webhook.
6. Dans la fenêtre de configuration du connecteur, cliquez sur **Save**.

### Utilisation

Envoyez une notification à Microsoft Teams à partir d'un monitor Datadog à l'aide de la [fonctionnalité `@-notification`][2]. Utilisez la syntaxe `@teams-<CANAL>` pour définir le destinataire de la notification, en prenant soin de remplacer `<CANAL>` par le nom de votre canal Microsoft Teams.

## Utiliser la solution Incident Management Datadog depuis Microsoft Teams

<div class="alert alert-warning">
La solution Incident Management Datadog dans Microsoft Teams est en version bêta publique et est actuellement réservée au site US1.
</div>

### Configuration du compte

Commencez par installer l'application Datadog dans Microsoft Teams :

1. Ouvrez Microsoft Teams.
2. Dans la barre d'outils verticale, cliquez sur **Apps**.
3. Recherchez Datadog et cliquez sur le carré.
4. Cliquez sur **Add** pour installer l'application Datadog.

{{< img src="integrations/microsoft_teams/microsoft_teams_install_datadog_app_in_teams.png" alt="Installer l'application Datadog dans Microsoft Teams" >}}

Ensuite, connectez votre tenant Microsoft à Datadog :

1. Dans Datadog, accédez au [carré d'intégration Microsoft Teams][1].
2. Cliquez sur **Add Account**. Vous êtes alors redirigé vers le site de Microsoft.
3. Suivez les instructions, puis cliquez sur **OK**.

Certaines fonctionnalités de la solution Incident Management de Datadog effectuent des actions sur votre tenant, comme la création d'une nouvelle équipe pour chaque incident, et nécessitent donc une autorisation. Pour autoriser Datadog à effectuer ces actions, un utilisateur doté du rôle *Global Admin* doit suivre les étapes ci-dessous :

1. Dans Datadog, accédez au [carré d'intégration Microsoft Teams][1].
2. Cliquez sur **Authorize**. Vous êtes alors redirigé vers le site de Microsoft.
3. Suivez les instructions, puis cliquez sur **OK**.

### Configuration de l'utilisateur

Pour effectuer des actions dans Datadog depuis Microsoft Teams, vous devez associer votre compte Datadog à votre compte Microsoft Teams.

Pour associer vos comptes depuis Microsoft Teams :

1. Ouvrez Microsoft Teams.
2. Démarrez une conversation avec le bot Datadog en cliquant sur le bouton `...` dans la barre d'outils verticale puis en sélectionnant Datadog.
3. Saisissez « accounts » et appuyez sur Entrée.
   {{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_teams.png" alt="Associer vos comptes depuis Microsoft Teams" >}}

4. Le bot Datadog vous donnera alors les instructions à suivre pour associer vos comptes. Cliquez sur **Connect Datadog Account**.
5. Le bot Datadog vous enverra ensuite un message avec un lien pour associer vos comptes. Cliquez sur le lien et suivez les instructions.
6. Vous serez alors redirigé vers le [carré d'intégration Microsoft Teams][1]. 
7. Créez une clé d'application en cliquant sur le bouton **Create** du message affiché sur le [carré d'intégration Microsoft Teams][1].



Vous pouvez également associer vos comptes depuis Datadog :

1. Dans Datadog, accédez au [carré d'intégration Microsoft Teams][1].
2. Cliquez sur **Connect** dans le tenant affiché.
3. Suivez les instructions, puis cliquez sur **OK**.
4. Vous serez alors redirigé vers le [carré d'intégration Microsoft Teams][1].
5. Créez une clé d'application en cliquant sur le bouton **Create** du message affiché en haut.

{{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_datadog_v2.png" alt="Associer vos comptes depuis le carré d'intégration Microsoft Teams dans Datadog" >}}

### Utilisation

Pour déclarer un nouvel incident depuis Microsoft Teams :

1. Démarrez une conversation avec l'équipe de votre choix.
2. Saisissez `@Datadog` ou utilisez le bouton `...` pour ouvrir le menu **Messaging extensions**, puis sélectionnez l'application **Datadog**.
3. Sélectionnez **Create an Incident**.
4. Remplissez le formulaire avec les informations souhaitées.
5. Cliquez sur **Create**.

Tous les membres de votre tenant Microsoft Teams peuvent déclarer un incident, même s'ils n'ont pas accès à Datadog.

Chaque nouvel incident entraîne la création d'une équipe correspondante nommée `incident-(ID unique)`.

La mise à jour d'un incident se fait de façon similaire :

1. Démarrez une conversation avec l'équipe associée à un incident.
2. Saisissez `@Datadog` ou utilisez le bouton `...` pour ouvrir le menu **Messaging extensions**, puis sélectionnez l'application **Datadog**.
3. Sélectionnez **Update Incident**.
4. Remplissez le formulaire avec les informations souhaitées.
5. Cliquez sur **Update**.

Répertoriez tous les incidents ouverts (actifs et stables) avec :

```
@Datadog list incidents
```

Utilisez le menu des actions supplémentaires à droite de n'importe quel message dans une conversation pour ajouter ce message à la chronologie de l'incident.

#### Canal de mise à jour des incidents
Le canal de mise à jour des incidents permet à vos parties prenantes de bénéficier d'une visibilité totale sur l'ensemble des incidents de l'organisation, le tout directement depuis Microsoft Teams. Sélectionnez l'équipe et le canal qui recevront ces mises à jour. Des messages seront envoyés pour :

   - Les nouveaux signalements d'incident
   - Les changements de gravité et de statut, accompagnés du nom de la personne responsable de l'incident
   - Les liens vers la page de présentation de l'incident dans l'application
   - Les liens pour rejoindre l'équipe en charge de l'incident

Une fois l'application Microsoft Teams installée, accédez à la page **Incident Settings**. Descendez jusqu'à atteindre la section **Incident Updates Channel**, puis effectuez la configuration du canal.

#### Comment configurer un canal dédié aux incidents :

1. Accédez à la page [Incidents Settings][3].
2. Repérez la section **Incident Updates Channel** de l'intégration Microsoft Teams.
3. Sélectionnez le tenant, l'équipe et le canal à utiliser pour les mises à jour des incidents.

{{< img src="integrations/microsoft_teams/ms_teams_incident_updates.png" alt="Paramètres Incident Updates Channel dans Microsoft Teams." >}}

## Données collectées

### Métriques

L'intégration Microsoft Teams ne fournit aucune métrique.

### Événements

L'intégration Microsoft Teams ne fournit aucun événement.

### Checks de service

L'intégration Microsoft Teams ne fournit aucun check de service.

## Dépannage

### Utilisation de l'authentification unique

Suivez les étapes suivantes pour définir de nouveaux connecteurs pour vos canaux :

1. Connectez-vous à Datadog, puis suivez les étapes 1 et 2 de configuration.

2. Pour l'étape 3, vous devez accéder à Datadog depuis la page Microsoft Teams. Ouvrez un nouvel onglet et connectez-vous à Datadog à l'aide du processus d'authentification unique. Effectuez ensuite l'étape 4 sur une autre page.

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://app.datadoghq.com/account/settings#integrations/microsoft-teams
[2]: https://docs.datadoghq.com/fr/monitors/notifications/#notification
[3]: https://app.datadoghq.com/incidents/settings#Integrations
[4]: https://docs.datadoghq.com/fr/help/