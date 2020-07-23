---
assets:
  dashboards: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - issue tracking
  - collaboration
  - notification
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/squadcast/README.md'
display_name: Squadcast
git_integration_title: squadcast
guid: a2b0e9fe-f824-460b-864a-50c4bda759a0
integration_id: squadcast
integration_title: Squadcast
is_public: true
kind: integration
maintainer: it@squadcast.com
manifest_version: 1.0.0
metric_prefix: squadcast.
metric_to_check: ''
name: squadcast
public_title: Intégration Datadog/Squadcast
short_description: Recevez des notifications concernant vos alertes Datadog et prenez des mesures à l'aide de Squadcast.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Utilisez l'intégration Datadog/Squadcast pour recevoir vos alertes Datadog sur Squadcast et prendre facilement des mesure depuis la plateforme Squadcast.

Associez Squadcast à Datadog pour :
- Déclencher et résoudre des incidents depuis Datadog
- Traiter les incidents et configurer des politiques d'escalade en temps réel
- Être informé quotidiennement des personnes en service

## Configuration

**Remarque** :
Seuls les utilisateurs dont le rôle est Account Owner ou Admin peuvent configurer des services sur Squadcast.
Au moins une politique d'escalade doit être configurée pour que vous puissiez ajouter un service.

### Suivez ces étapes dans Squadcast :

1. Ouvrez la page **Services** à partir de la barre latérale.

2. Cliquez sur « Add Service ».

3. Saisissez une valeur pour **Service Name** et éventuellement pour **Service Description**.

4. Sélectionnez **Datadog** dans le menu déroulant **Integration Type**.

5. Copiez le lien **Datadog Webhook URL** généré plus bas et cliquez sur « Save ».

![Service Squadcast][1]

### Suivez ces étapes dans Datadog :

1. Ouvrez la page **Integrations** à partir de la barre latérale.

2. Utilisez la barre de recherche pour rechercher « webhooks ».

3. Lorsque le carré **Webhooks** s'affiche, passez votre curseur dessus et cliquez sur « Install ».

4. Accédez à l'onglet **Configuration** et faites défiler jusqu'à atteindre le bas de la page.

5. Dans la section **Name and URL**, saisissez un nom approprié et collez le lien **Datadog Webhook URL** à partir de Squadcast.

    ![Webhook Squadcast][2]

6. Cochez la case dans la section **Use custom payload**.
7. Copiez-collez le JSON suivant dans la zone de texte de la section **Custom Payload** :

    ```json
    {
        "alertId": "$ALERT_ID",
        "eventMessage": "$TEXT_ONLY_MSG",
        "title": "$EVENT_TITLE",
        "url": "$LINK",
        "alertTransition": "$ALERT_TRANSITION"
    }
    ```

8. Cliquez sur « Install Integration » pour terminer l'intégration du service.

    Consultez la [documentation officielle][3] de Squadcast pour en savoir plus sur la configuration.

## Données collectées
### Métriques

L'intégration Squadcast n'inclut aucune métrique.

### Événements

Vos événements Squadcast déclenchés/résolus s'affichent sur le dashboard de votre plateforme Squadcast.

### Checks de service

L'intégration Squadcast n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/squadcast/images/datadog-service.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/squadcast/images/datadog-webhook.png
[3]: https://support.squadcast.com/docs/datadog
[4]: https://docs.datadoghq.com/fr/help/