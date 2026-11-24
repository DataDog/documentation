---
aliases:
- /fr/service_management/incident_management/zoom_integration/
- /fr/incident_response/incident_management/zoom_integration
description: Créez des réunions Zoom pour les incidents Datadog en un clic ou automatiquement,
  et générez des résumés de réunion par IA ainsi que des notebooks de transcriptions
  en direct.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: Documentation
  text: Paramètres des intégrations d'incident
- link: /integrations/zoom-incident-management/
  tag: Documentation
  text: Intégration Zoom pour Incident Management
- link: /incident_response/incident_management/investigate/meeting_summaries_and_transcripts
  tag: Documentation
  text: Résumés et transcriptions de réunions
title: Intégrez Zoom à Datadog Incident Management
---
## Présentation {#overview}

L'intégration Zoom pour Datadog Incident Management permet à votre équipe de démarrer une réunion Zoom pour un incident. Vous pouvez créer des réunions en un clic ou automatiquement, en fonction de critères que vous définissez. Vous pouvez également générer des notebooks de transcriptions en direct et des résumés par IA des réunions Zoom liées aux incidents.

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

Datadog utilise l'adresse e-mail de l'utilisateur qui crée la réunion comme adresse e-mail du host. Cette adresse e-mail doit être associée à un compte Zoom autorisé. Si ce n'est pas le cas, Datadog utilise l'[utilisateur Zoom de secours](#fallback-zoom-user), s'il est configuré.

### Création automatique de réunion {#automatic-meeting-creation}

Pour activer les réunions Zoom automatiques basées sur des critères pour les incidents :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Zoom**.
2. Activez **Enable Zoom meeting creation**.
   1. Activez **Automatically create Zoom meetings**.
   2. (Facultatif) Spécifiez les critères d'incident qui déclenchent la création d'une réunion Zoom. Si vous laissez les critères vides, toute modification apportée à un incident sans réunion Zoom existante crée une réunion Zoom.
3. Enregistrez vos paramètres.

Lorsqu'un incident répond aux critères, Datadog crée une réunion Zoom en utilisant l'adresse e-mail du responsable d'incident (Incident Commander) comme adresse e-mail du host. S'il n'y a pas de responsable d'incident, ou si son adresse e-mail n'est pas associée à un compte Zoom autorisé, Datadog utilise l'[utilisateur Zoom de secours](#fallback-zoom-user), s'il est configuré.

**Remarque** : Pour utiliser la création automatique de réunions Zoom dans un [incident de test][3], sélectionnez **Execute integrations** dans la fenêtre modale de création d'incident de test. Sinon, Datadog ne crée pas la réunion.

### Utilisateur Zoom de secours {#fallback-zoom-user}

Configurez un utilisateur Zoom de secours pour héberger les réunions lorsque Datadog ne peut pas trouver l'adresse e-mail d'un host dans le compte Zoom autorisé. Par exemple :

- L'utilisateur Datadog qui crée une réunion ne possède pas de compte dans le compte Zoom autorisé.
- L'incident n'a pas de responsable d'incident (Incident Commander) lorsque Datadog crée une réunion automatiquement.
- Le responsable d'incident (Incident Commander) ne possède pas de compte dans le compte Zoom autorisé lorsque Datadog crée une réunion automatiquement.

Pour configurer un utilisateur Zoom de secours :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Zoom**.
2. Activez **Enable Zoom meeting creation**.
3. Sous **Fallback user account**, saisissez une adresse e-mail associée au compte Zoom autorisé. Pour éviter les problèmes lorsqu'un employé quitte l'entreprise, utilisez un utilisateur partagé.
4. (Facultatif) Pour utiliser l'utilisateur de secours comme host pour toutes les réunions Zoom, activez **Always use this account as the meeting host**.
5. Enregistrez vos paramètres.

### Signet Slack {#slack-bookmark}

Pour ajouter la réunion Zoom de l'incident aux signets du canal Slack de l'incident :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Slack**.
2. Activez **Add important links to the incident channel's bookmarks**.
3. Enregistrez vos paramètres.

Si l'incident possède un canal Slack, Datadog ajoute un signet pour la réunion Zoom dans ce canal.

Pour plus de fonctionnalités Slack, consultez [Intégrer Slack à Datadog Incident Management][4].

### Résumés de réunion et transcriptions {#meeting-summaries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Les résumés de réunion et les transcriptions de réunion en direct ne sont pas disponibles pour le site Datadog que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Incident AI peut générer des résumés des réunions Zoom d'incident et, en option, enregistrer les transcriptions de réunion en direct dans des notebooks Datadog.

<div class="alert alert-info">Lorsque les résumés de réunion sont activés, un <a href="https://www.datadoghq.com/legal/subprocessors/">sous-traitant</a> de Datadog enregistre et transcrit l'audio de la réunion. Pour plus de détails sur la conservation, consultez <a href="/incident_response/incident_management/investigate/meeting_summaries_and_transcripts/#retention-and-deletion">Conservation et suppression</a> dans Résumés et transcriptions de réunion.</div>

#### Prérequis {#prerequisites-1}

- Les fonctionnalités d'IA doivent être activées pour votre organisation.
- Vous devez utiliser un compte disposant de l'autorisation de modifier les paramètres d'incident.
- Pour enregistrer les transcriptions de réunion en direct, votre organisation doit avoir accès aux transcriptions de réunion en direct. Si le paramètre **Generate meeting transcripts** n'est pas disponible, contactez le [support Datadog][5].
- Les sous-titres de réunion doivent être activés dans Zoom pour qu'Incident AI puisse générer des résumés.

#### Activer les résumés et les transcriptions de réunion {#enable-meeting-summaries-and-transcripts}

Pour activer les résumés et les transcriptions des réunions Zoom liées aux incidents :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Zoom**.
2. Activez **Enable Zoom meeting creation**.
3. Activez **Generate AI meeting summaries**.
4. (Facultatif) Pour enregistrer les transcriptions de réunion en direct, activez **Generate meeting transcripts**, qui apparaît sous **Generate AI meeting summaries**.
5. (Facultatif) Ajoutez des conditions pour empêcher la génération de résumés pour des incidents spécifiques.
6. Enregistrez vos paramètres.

Pour consulter les résumés et les transcriptions, gérer l'accès au notebook des transcriptions et réinviter le transcripteur, consultez [Résumés et transcriptions de réunion][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/zoom-incident-management/
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /fr/incident_response/incident_management/guides/test_incidents
[4]: /fr/incident_response/incident_management/setup_and_configuration/integrations/slack
[5]: /fr/help/
[6]: /fr/incident_response/incident_management/investigate/meeting_summaries_and_transcripts