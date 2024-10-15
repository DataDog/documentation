---
categories:
- cloud
- google cloud
dependencies: []
description: Envoyez des alertes Datadog à vos canaux Google Eventarc.
doc_link: https://docs.datadoghq.com/integrations/google_eventarc/
draft: false
git_integration_title: google_eventarc
has_logo: true
integration_id: google-eventarc
integration_title: Google Eventarc
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_eventarc
public_title: Intégration Google Eventarc
short_description: Envoyez des alertes Datadog à vos canaux Google Eventarc.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Envoyez vos événements Datadog à [Eventarc][1] en vue de les transmettre aux services Google. Cela vous permet de lancer des workflows basés sur Eventarc à l'aide des notifications de vos monitors Datadog.

### Formule et utilisation

1. Assurez-vous que la principale [intégration GCP][2] est installée pour chaque projet GCP qui reçoit des notifications.

2. [Créez un canal Eventarc][3] dans la console Google Cloud.

3. Dans l'application Datadog, définissez le nom de votre canal et votre token d'activation dans la [section Notifications][4] d'un monitor en utilisant la syntaxe présentée dans l'exemple ci-dessous :

{{< img src="integrations/google_eventarc/eventarc_channel_notification.png" alt="La section Say what's happening de la page de configuration d'un monitor Datadog, avec le titre HDD Disk Size Above Capacity et une ligne du corps de notification qui envoie l'événement à un canal Eventarc avec l'exemple suivant : The alert notification will be sent to @eventarc-datadog-sandbox_us-central1_my-channel that will trigger Cloud Function: Bump Quota." >}}

### Validation

Une fois l'intégration activée, le canal passe de l'état **Pending** à l'état **Active** dans la console Google Cloud.

### Actions automatisées

Configurez de nouveaux canaux de notification sortante pour les monitors afin de lancer des actions automatisées avec l'intégration GCP Eventarc. Avec les actions automatisées, vous pouvez configurer vos ressources GCP de façon à :

  - Utiliser des monitors Datadog pour lancer des workflows Eventarc
  - Lier Cloud Functions, BigQuery et plus encore à des monitors Datadog depuis Google
  - Utiliser les informations d'un événement d'alerte afin d'exécuter des pipelines de correction automatique, des runbooks, des requêtes d'analyse, et plus encore

La liste complète des ressources pouvant être ciblées est disponible dans la [documentation sur GCP][5].

## Real User Monitoring

### Analyse d'entonnoirs

L'intégration Google Eventarc n'inclut aucune métrique.

### Aide

L'intégration Google Eventarc n'inclut aucun événement.

### Aide

L'intégration Google Eventarc n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Automatiser les workflows de gestion d'incident avec Eventarc et Datadog][7]

[1]: https://cloud.google.com/eventarc/docs
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[3]: https://cloud.google.com/eventarc/docs/third-parties/create-channels
[4]: https://docs.datadoghq.com/fr/monitors/notify/
[5]: https://cloud.google.com/eventarc/docs/targets
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/