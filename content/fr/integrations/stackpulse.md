---
assets:
  dashboards:
    StackPulse: assets/dashboards/stackpulse_overview.json
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
- monitoring
creates_events: true
ddtype: crawler
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/stackpulse/README.md
display_name: StackPulse
draft: false
git_integration_title: stackpulse
guid: cbfbe4be-1720-4c9e-b565-cef70fcc5b2b
integration_id: stackpulse
integration_title: StackPulse
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@stackpulse.io
manifest_version: 1.0.0
metric_prefix: stackpulse.
metric_to_check: ''
name: stackpulse
public_title: Intégration Datadog/StackPulse
short_description: Automatisez vos réponses aux alertes et suivez les exécutions de
  playbook depuis votre flux d'événements
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

L'intégration [StackPulse][1] vous permet de déclencher des playbooks automatiquement en réponse à une alerte Datadog afin d'enrichir les alertes, de minimiser l'impact des incidents et d'améliorer la collaboration. Les événements résultant de l'exécution de vos playbooks peuvent ensuite être directement renvoyés vers votre flux d'événements Datadog et vers un dashboard StackPulse dédié.

## Configuration

Pour configurer cette intégration, vous devez disposer d'un [compte StackPulse][2] actif avec le rôle Account Owner. Vous devez également disposer des autorisations admin adéquates dans Datadog.

### StackPulse

1. Depuis la page **Integrations**, recherchez la carte **Datadog** sous **Monitoring** et cliquez sur [**New**][2].

2. Donnez un nom descriptif à l'intégration, puis cliquez sur **Add**.

3. **Copiez** l'endpoint de webhook que vous venez de créer.

### Datadog

1. Accédez à **Integrations** et sélectionnez la carte [**Webhooks**][3].

2. Cliquez sur **New** pour ajouter une nouvelle intégration Webhook.

3. Donnez un nom à votre nouvelle intégration Webhook (vous serez amené à l'utiliser plus tard dans des monitors Datadog pour déclencher StackPulse) ainsi que l'URL du Webhook donnée à l'étape précédente.

4. StackPulse vous conseille d'ajouter des informations supplémentaires sur l'alerte à l'aide des éléments de configuration ci-dessous :

    ```json
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

5. Choisissez des monitors pour déclencher vos playbooks StackPulse. Dans le champ **Alert Your Team**, ajoutez le nom de l'intégration Webhook que vous venez de créer. Pour en savoir plus, consultez la section [Gérer les monitors][4].

6. Accédez à **Integrations -> APIs** et choisissez la carte **API Keys**. Sous **New API Key**, donnez un nom descriptif à votre nouvelle clé et cliquez sur **Create API Key**. Ensuite, **copiez** la nouvelle clé.

### Dans StackPulse à nouveau

1. Depuis la page **Integrations**, recherchez la carte **Datadog API Keys** sous **Secrets** et cliquez sur [**Add**][5].

2. Donnez un nom descriptif à l'intégration, puis cliquez sur **Add**.

## Données collectées

### Métriques

L'intégration StackPulse n'inclut aucune métrique.

### Événements

L'intégration StackPulse vous permet d'envoyer des événements vers votre flux d'événements Datadog en utilisant l'étape [Post Event de Datadog][6]. Utilisez cette étape avec vos playbooks pour envoyer un événement lorsqu'un problème a été corrigé ou qu'une exécution a échoué, ou encore pour renvoyer des données d'alerte enrichies à Datadog.

### Checks de service

L'intégration StackPulse n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://stackpulse.com
[2]: https://stackpulse.com/get-started/
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://docs.datadoghq.com/fr/monitors/manage/
[5]: https://app.stackpulse.io/integrations/datadog%20api%20keys?create=true
[6]: https://github.com/stackpulse/steps/tree/master/steps/datadog/post-event
[7]: https://docs.datadoghq.com/fr/help/