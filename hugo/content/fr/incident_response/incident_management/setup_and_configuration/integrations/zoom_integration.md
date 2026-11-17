---
aliases:
- /fr/service_management/incident_management/zoom_integration/
- /fr/incident_response/incident_management/zoom_integration
description: Créez des réunions Zoom pour les incidents Datadog en un clic ou automatiquement,
  et générez des résumés de réunion par IA.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: Documentation
  text: Paramètres des intégrations d'incident
- link: /integrations/zoom-incident-management/
  tag: Documentation
  text: Intégration Zoom pour Incident Management
- link: /incident_response/incident_management/investigate/incident_ai/#meeting-summaries
  tag: Documentation
  text: Résumés de réunion dans Incident AI
title: Intégrez Zoom à Datadog Incident Management
---
## Présentation {#overview}

L'intégration Zoom pour Datadog Incident Management permet à votre équipe de démarrer une réunion Zoom pour un incident. Vous pouvez créer des réunions en un clic ou automatiquement, en fonction de critères que vous définissez. Vous pouvez également générer des résumés par IA des réunions Zoom liées aux incidents.

## Prérequis {#prerequisites}

Pour utiliser les fonctionnalités Zoom d'Incident Management, vous devez d'abord [installer l'intégration Zoom Incident Management][1].

Après l'installation, accédez à **[Incident Response > Incident Management > Settings > Integrations][2]** pour configurer les fonctionnalités Zoom pour Incident Management.

## Réunions Zoom {#zoom-meetings}

### Création de réunion en un clic {#one-click-meeting-creation}

Pour activer les réunions Zoom en un clic pour les incidents :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Zoom**.
2. Activez **Enable Zoom meeting creation**.
3. Enregistrez vos paramètres.

Après avoir activé les réunions Zoom en un clic, démarrez une réunion en cliquant sur **Create Zoom Meeting** depuis l'en-tête de l'incident. Vous pouvez également exécuter la commande `/zoom` dans un canal Slack d'incident. Vous êtes redirigé pour rejoindre la réunion via le navigateur ou le client Zoom.

Datadog utilise l'adresse e-mail de l'utilisateur qui crée la réunion comme adresse e-mail de l'hôte. Cette adresse e-mail doit être associée à un compte Zoom autorisé. Si ce n'est pas le cas, Datadog utilise l'[utilisateur Zoom de secours](#fallback-zoom-user), s'il est configuré.

### Création automatique de réunion {#automatic-meeting-creation}

Pour activer les réunions Zoom automatiques basées sur des critères pour les incidents :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Zoom**.
2. Activez **Enable Zoom meeting creation**.
   1. Activez **Automatically create Zoom meetings**.
   2. (Facultatif) Spécifiez les critères que doit remplir un incident pour déclencher la création d'une réunion Zoom. Si vous laissez les critères vides, toute modification apportée à un incident sans réunion Zoom existante crée une réunion Zoom.
3. Enregistrez vos paramètres.

Lorsqu'un incident répond aux critères, Datadog crée une réunion Zoom en utilisant l'adresse e-mail de l'Incident Commander comme adresse e-mail de l'hôte. Si l'incident n'a pas d'Incident Commander, ou si son adresse e-mail n'est pas associée à un compte Zoom autorisé, Datadog utilise l'[utilisateur Zoom de secours](#fallback-zoom-user), s'il est configuré.

**Remarque** : Pour utiliser la création automatique de réunions Zoom dans un [incident de test][3], sélectionnez **Execute integrations** dans la fenêtre modale de création d'un incident de test. Sinon, Datadog ne crée pas la réunion.

### Utilisateur Zoom de secours {#fallback-zoom-user}

Configurez un utilisateur Zoom de secours pour héberger les réunions lorsque Datadog ne parvient pas à identifier une adresse e-mail d'hôte associée au compte Zoom autorisé. Par exemple :

- L'utilisateur Datadog qui crée une réunion ne possède pas de compte dans le compte Zoom autorisé.
- L'incident n'a pas d'Incident Commander lorsque Datadog crée une réunion automatiquement.
- L'Incident Commander ne possède pas de compte dans le compte Zoom autorisé lorsque Datadog crée une réunion automatiquement.

Pour configurer un utilisateur Zoom de secours :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Zoom**.
2. Activez **Enable Zoom meeting creation**.
3. Sous **Fallback user account**, saisissez une adresse e-mail associée au compte Zoom autorisé. Pour éviter les problèmes lorsqu'un employé quitte l'entreprise, utilisez un utilisateur partagé.
4. (Facultatif) Pour utiliser l'utilisateur de secours comme hôte pour toutes les réunions Zoom, activez **Always use this account as the meeting host**.
5. Enregistrez vos paramètres.

### Signet Slack {#slack-bookmark}

Pour ajouter la réunion Zoom de l'incident aux signets du canal Slack de l'incident :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Slack**.
2. Activez **Add important links to the incident channel's bookmarks**.
3. Enregistrez vos paramètres.

Si l'incident possède un canal Slack, Datadog ajoute un signet pour la réunion Zoom à ce canal.

Pour plus de fonctionnalités Slack, consultez [Intégrer Slack à la gestion des incidents Datadog][4].

### Résumés de réunion {#meeting-summaries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Les résumés de réunion ne sont pas disponibles pour votre site Datadog sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Activez les résumés de réunion générés par l'IA pour résumer automatiquement les réunions Zoom liées aux incidents.

<div class="alert alert-info">Lorsque les résumés de réunion sont activés, un <a href="https://www.datadoghq.com/legal/subprocessors/">sous-traitant</a> Datadog enregistre et transcrit l'audio de la réunion. Après une période de conservation de sept jours, le sous-traitant supprime automatiquement toutes les données.</div>

Pour activer les résumés de réunion pour les réunions Zoom d'incident :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Zoom**.
2. Activez **Enable Zoom meeting creation**.
3. Activez **Generate AI meeting summaries**.
4. (Facultatif) Ajoutez des conditions pour empêcher la génération de résumés pour certains incidents. Par défaut, Incident AI ne résume pas les réunions liées à des incidents privés.
5. Enregistrez vos paramètres.

**Remarque** : Activez les sous-titres de réunion dans Zoom afin qu'Incident AI puisse générer des résumés.

Pour en savoir plus sur les prérequis, les endroits où les résumés sont publiés, la vérification des résumés et la manière de réinviter le transcripteur, consultez [Résumés de réunion dans Incident AI][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/zoom-incident-management/
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /fr/incident_response/incident_management/guides/test_incidents
[4]: /fr/incident_response/incident_management/setup_and_configuration/integrations/slack
[5]: /fr/incident_response/incident_management/investigate/incident_ai/#meeting-summaries