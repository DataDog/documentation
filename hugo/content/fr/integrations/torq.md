---
assets:
  dashboards:
    Torq: assets/dashboards/torq_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- automation
- orchestration
- notification
- collaboration
- security
creates_events: true
ddtype: crawler
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/torq/README.md
display_name: Torq
draft: false
git_integration_title: torq
guid: 06f744f6-88ec-4ca1-9acf-cc1754b6cef5
integration_id: torq
integration_title: Torq
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@torq.io
manifest_version: 1.0.0
metric_prefix: torq.
metric_to_check: ''
name: torq
public_title: Intégration Datadog/Torq
short_description: Automatisation sans code pour vos équipes chargées de la sécurité
  et des opérations
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

L'intégration [Torq][1] vous permet de déclencher des workflows en réponse à une alerte Datadog afin d'enrichir ces alertes. Les événements résultant de vos workflows Torq peuvent ensuite être directement renvoyés vers votre flux d'événements Datadog et vers un dashboard Torq dédié.

## Configuration

Pour configurer cette intégration, vous devez disposer d'un [compte Torq][2] actif avec le rôle Account Owner. Vous devez également disposer des autorisations admin adéquates dans Datadog.

### Créer une intégration de déclenchement Datadog dans Torq

1. Accédez à **Integrations** > **Triggers**, recherchez la carte **Datadog**, puis cliquez sur **Add**.

2. Attribuez un nom descriptif à l'intégration et cliquez sur **Add**.

3. Copiez l'URL de webhook générée. Vous devrez spécifier cette URL pour configurer une intégration de webhook dans votre locataire Datadog.

### Définir des monitors Datadog pour déclencher des événements dans Torq

1. Accédez à **Integrations** > **Integrations**, cliquez sur la carte **Webhooks**, puis cliquez sur **New**.
    ![datadog_webhook][3]

2. Attribuez un nom descriptif à l'intégration de webhook et collez l'URL de webhook générée depuis Torq. Le nom de l'intégration doit être associé à l'identifiant (permettant à certains monitors Datadog de déclencher Torq) et à l'URL de webhook générée depuis Torq.
    ![datadog_webhook_2][4]

3. Torq conseille d'ajouter à la charge utile des informations supplémentaires sur l'alerte. Vous pouvez utiliser certaines parties de la configuration suivante :

    ```json linenums="1"
    {
        "body": "$EVENT_MSG",
        "title": "$EVENT_TITLE",
        "date": "$DATE",
        "id": "$ID",
        "metadata": {
            "AGGREG_KEY": "$AGGREG_KEY",
            "ALERT_CYCLE_KEY": "$ALERT_CYCLE_KEY",
            "ALERT_ID": "$ALERT_ID",
            "ALERT_METRIC": "$ALERT_METRIC",
            "ALERT_QUERY": "$ALERT_QUERY",
            "ALERT_SCOPE": "$ALERT_SCOPE",
            "ALERT_STATUS": "$ALERT_STATUS",
            "ALERT_TITLE": "$ALERT_TITLE",
            "ALERT_TRANSITION": "$ALERT_TRANSITION",
            "ALERT_TYPE": "$ALERT_TYPE",
            "EMAIL": "$EMAIL",
            "EVENT_MSG": "$EVENT_MSG",
            "EVENT_TITLE": "$EVENT_TITLE",
            "EVENT_TYPE": "$EVENT_TYPE",
            "HOSTNAME": "$HOSTNAME",
            "ID": "$ID",
            "LAST_UPDATED": "$LAST_UPDATED",
            "LINK": "$LINK",
            "METRIC_NAMESPACE": "$METRIC_NAMESPACE",
            "ORG_ID": "$ORG_ID",
            "ORG_NAME": "$ORG_NAME",
            "PRIORITY": "$PRIORITY",
            "SNAPSHOT": "$SNAPSHOT",
            "TAGS": "$TAGS",
            "TEXT_ONLY_MSG": "$TEXT_ONLY_MSG",
            "USER": "$USER",
            "USERNAME": "$USERNAME",
            "LOGS_SAMPLE": "$LOGS_SAMPLE"
        }
    }
    ```

4. Sélectionnez des monitors qui déclencheront les playbooks Torq et ajoutez une référence à l'intégration de webhook que vous avez créée dans le champ **Alert Your Team**. Pour en savoir plus, consultez la section [Gérer les monitors][5].

## Utiliser des étapes Datadog dans des workflows Torq

Vous devez générer une clé d'API et une clé d'application Datadog. Ces clés seront utilisées dans Torq en tant que paramètres d'entrée pour les étapes Datadog.

**Remarque** : certaines étapes Datadog dans Torq requièrent une clé d'API et une clé d'application, tandis que d'autres nécessitent l'intégration Datadog.

### Créer une clé d'API dans Datadog

Après avoir créé la clé d'API, copiez-la et enregistrez-la, car vous ne pourrez pas y accéder par la suite. Pour en savoir plus, consultez la section [Clés d'API et clés d'application][6].

1. Passez votre curseur sur votre nom d'utilisateur, puis sélectionnez **Organization Settings**.
2. Cliquez sur **API Keys** dans le volet de gauche.
3. Cliquez sur **+ New Key**.
    ![datadog_api_key][7]
4. Attribuez un nom descriptif à la clé d'API, comme `Torq`, et cliquez sur **Create Key**.
5. Copiez la clé et enregistrez-la. Vous devrez la fournir pour créer une intégration Datadog dans Torq.

### Créer une clé d'application dans Datadog

Après avoir créé la clé d'application, copiez-la et enregistrez-la, car vous ne pourrez pas y accéder par la suite. Pour en savoir plus, consultez la section [Clés d'API et clés d'application][8].

1. Passez votre curseur sur votre nom d'utilisateur, puis sélectionnez **Organization Settings**.
2. Cliquez sur **Application Keys** dans le volet de gauche.
3. Cliquez sur **+ New Key**.
    ![datadog_app_key][9]
4. Attribuez un nom descriptif à la clé d'application, comme `Torq`, et cliquez sur **Create Key**.
5. Copiez la clé et enregistrez-la. Vous devrez la fournir pour créer une intégration Datadog dans Torq.

### Créer une intégration Datadog dans Torq

Cette intégration vous permet d'utiliser des étapes Datadog dans vos workflows Torq.

1. Accédez à **Integrations** > **Steps**, recherchez la carte **Datadog**, puis cliquez sur **Add**.

2. Attribuez un nom descriptif à l'intégration, comme `Datadog-<type_monitor>`, puis cliquez sur **Add**.

## Données collectées

### Métriques

L'intégration Torq n'inclut aucune métrique.

### Événements

L'intégration Torq vous permet d'envoyer des événements depuis un workflow Torq vers votre flux d'événements Datadog en utilisant l'étape Post Event de Datadog. Utilisez cette étape avec vos playbooks pour envoyer un événement lorsqu'un problème a été corrigé ou qu'une exécution a échoué, ou encore pour renvoyer des données d'alerte enrichies à Datadog.

### Checks de service

L'intégration Torq n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://torq.io
[2]: https://torq.io/get-started/
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_webhook.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_webhook_2.png
[5]: https://docs.datadoghq.com/fr/monitors/manage_monitor/
[6]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#add-an-api-key-or-client-token
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_api_key.png
[8]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#add-application-keys
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_app_key.png
[10]: https://docs.datadoghq.com/fr/help/