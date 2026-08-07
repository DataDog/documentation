---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- issue tracking
- collaboration
- notification
- monitoring
"creates_events": false
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/signl4/README.md"
"display_name": "SIGNL4"
"draft": false
"git_integration_title": "signl4"
"guid": "02b6d170-8b2e-4de4-b3a9-afb67183cb5e"
"integration_id": "signl4"
"integration_title": "SIGNL4 pour Datadog"
"integration_version": ""
"is_public": true
"custom_kind": "integration"
"maintainer": "success@signl4.com"
"manifest_version": "1.0.0"
"metric_prefix": "signl4."
"metric_to_check": ""
"name": "signl4"
"public_title": "Intégration SIGNL4 pour Datadog"
"short_description": "Recevez des notifications concernant vos alertes Datadog et prenez des mesures à l'aide de SIGNL4."
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---

## Présentation

L'intégration [SIGNL4][1] vous permet d'envoyer les alertes Datadog aux équipes SIGNL4 et de prendre facilement des mesures depuis l'application SIGNL4.

Associez SIGNL4 à Datadog afin de :
- Déclencher et résoudre des incidents depuis Datadog
- Traiter les incidents et configurer des politiques d'escalade en temps réel
- Être informé quotidiennement des personnes en service

![App SIGNL4][2]

## Configuration

### SIGNL4

Suivez ces étapes dans SIGNL4 :

1. Utilisez votre compte SIGNL4 existant ou créez-en un à l'adresse [signl4.com][1].

2. Dans votre application SIGNL4, trouvez votre adresse de webhook SIGNL4 comprenant le secret de votre équipe sous *Settings -> APIs*.

### Datadog

Suivez ces étapes dans Datadog :

1. Accédez au [carré d'intégration Webhook][3].



2. Dans l'onglet **Configuration**, faites défiler vers le bas et cliquez sur **New**.

3. Sous **New Webhook**, saisissez une valeur pertinente pour `Name` et utilisez l'`URL` du Webhook SIGNL4 (créée précédemment) comprenant le secret de votre équipe, par exemple :

    ```
    https://connect.signl4.com/webhook/<team-secret>?ExtIDParam=alertId&ExtStatusParam=alertTransition&ResolvedStatus=Recovered
    ```

    Remplacez `<team-secret>` par votre secret d'équipe SIGNL4 ici.

    ![Webhook SIGNL4][4]

4. Copiez-collez le JSON suivant dans la zone de texte `Payload` :

    ```json
    {
        "title": "$EVENT_TITLE",
        "message": "$TEXT_ONLY_MSG",
        "link": "$LINK",
        "priority": "$ALERT_PRIORITY",
        "host": "$HOSTNAME",
        "alertScope": "$ALERT_SCOPE",
        "alertStatus": "$ALERT_STATUS",
        "alertId": "$ALERT_ID",
        "alertTransition": "$ALERT_TRANSITION",
        "X-S4-SourceSystem": "Datadog",
        "date": "$DATE",
        "org": {
            "id": "$ORG_ID",
            "name": "$ORG_NAME"
        },
        "id": "$ID"
    }
    ```

5. Cliquez sur **Save** afin de terminer l'intégration du service.

Pour plus de détails, consultez l'article [Alertes mobiles avec suivi et actions d'escalade pour Datadog][5].

## Données collectées

### Métriques

L'intégration SIGNL4 n'inclut aucune métrique.

### Événements

Les événements SIGNL4 activés et résolus apparaissent dans l'application et sur le portail web SIGNL4.

### Checks de service

L'intégration SIGNL4 n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance SIGNL4][6].

[1]: https://www.signl4.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/signl4-phone.png
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-webhook.png
[5]: https://www.signl4.com/blog/portfolio_item/datadog_mobile_alerting/
[6]: mailto:success@signl4.com

