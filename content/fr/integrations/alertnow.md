---
app_id: alertnow
app_uuid: cdb258cc-5e74-4fa2-be21-1489375bb370
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: alertnow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10279
    source_type_name: AlertNow
author:
  homepage: https://service.opsnow.com
  name: AlertNow
  sales_email: sales@opsnow.com
  support_email: support@opsnow.com
categories:
- alerting
- automation
- collaboration
- incidents
- mobile
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/alertnow/README.md
display_on_public_website: true
draft: false
git_integration_title: alertnow
integration_id: alertnow
integration_title: AlertNow
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: alertnow
public_title: AlertNow
short_description: Synchroniser des alertes Datadog avec des alertes AlertNow
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Collaboration
  - Category::Incidents
  - Category::Mobile
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Synchroniser des alertes Datadog avec des alertes AlertNow
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AlertNow
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

AlertNow est une plateforme de gestion des incidents intégrée qui recueille des alertes depuis différents environnements informatiques complexes et les transmet aux personnes pertinentes. Cette solution permet d'accélérer la résolution des incidents. Lorsque vous associez AlertNow à Datadog, vos alertes Datadog sont automatiquement synchronisées avec les alertes AlertNow. Vous pouvez gérer vos alertes sur une plateforme unique, envoyer des notifications à vos équipes et corriger immédiatement les problèmes majeurs.


Avec AlertNow, vous pouvez :
- Déclencher et résoudre des incidents depuis Datadog
- Prévenir les personnes pertinentes par e-mail, SMS ou appel vocal, ou via une application mobile, lorsque des incidents surviennent

- Appliquer une politique de réaffectation pour l'envoi de notifications aux utilisateurs
- Générer des rapports sur le MTTA et le MTTR, ainsi que des rapports d'analyse


![Vue d'ensemble d'AlertNow][1]

## Formule et utilisation

### AlertNow

Pour associer Datadog à AlertNow, créez un webhook et des monitors dans Datadog.


1. Utilisez votre compte AlertNow existant ou créez-en un à l'adresse opsnow.com.

2. Connectez-vous à AlertNow et accédez au menu Configuration > Integration.
3. Cliquez sur **Create Integration**, puis sélectionnez la fiche **Datadog**.

    ![Fiche Datadog][2]

4. Sur la page Create Integration, saisissez les informations requises, puis cliquez sur le bouton OK pour créer l'intégration.

    ![Intégration Datadog][3]

5. Copiez l'URL depuis la page Integration d'AlertNow.
    ![Détails Datadog][4]


### Ruby

Suivez les étapes indiquées ci-dessous dans votre compte Datadog.


1. Ouvrez le [carré d'intégration Webhooks][5].

2. Sélectionnez l'onglet **Configuration**, faites défiler l'écran vers le bas, puis cliquez sur **New**.

3. Dans le formulaire **New Webhook**, saisissez un nom pertinent ainsi que l'URL du webhook AlertNow créé depuis la page Integration d'AlertNow. L'URL du webhook copié respecte le format suivant. Remplacez simplement **{CLÉ-API-ALERTNOW}** par votre clé d'API.



    <pre><code> https://alertnowitgr.opsnow.com/integration/datadog/v1/{CLÉ-API-ALERTNOW} </code></pre>

    ![Webhook Datadog][6]

4. Copiez la charge utile JSON ci-dessous et collez-la dans la fenêtre Payload.


    ``` json
    {
        "id":"$ID",
        "email":"$EMAIL",
        "eventTitle":"$EVENT_TITLE",
        "eventMsg":"$EVENT_MSG",
        "textOnlyMsg":"$TEXT_ONLY_MSG",
        "eventType":"$EVENT_TYPE",
        "date":"$DATE",
        "datePosix":"$DATE_POSIX",
        "alertId":"$ALERT_ID",
        "alertType":"$ALERT_TYPE",
        "aggregKey":"$AGGREG_KEY",
        "orgId":"$ORG_ID",
        "alertStatus":"$ALERT_STATUS",
        "alertScope":"$ALERT_SCOPE",
        "hostname":"$HOSTNAME",
        "user":"$USER",
        "username":"$USERNAME",
        "snapshot":"$SNAPSHOT",
        "link":"$LINK",
        "priority":"$PRIORITY",
        "tags":"$TAGS",
        "lastUpdated":"$LAST_UPDATED",
        "lastUpdatedPosix":"$LAST_UPDATED_POSIX",
        "alertMetric":"$ALERT_METRIC",
        "metricNamespace":"$METRIC_NAMESPACE",
        "alertTransition":"$ALERT_TRANSITION",
        "orgName":"$ORG_NAME",
        "alertQuery":"$ALERT_QUERY",
        "alertTitle":"$ALERT_TITLE",
        "alertCycleKey":"$ALERT_CYCLE_KEY"
    }

    ```

5. Consultez la [documentation relative aux alertes][7] de Datadog pour découvrir comment créer des monitors.



## Agent

Besoin d'aide ? Contactez [l'assistance AlertNow][8].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/alertnow_overview.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/integration_card_datadog.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/create_integration_datadog_en.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_integration_detail.png
[5]: https://app.datadoghq.com/account/login?next=%2Faccount%2Fsettings#integrations/webhooks
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_webhook.png
[7]: https://docs.datadoghq.com/fr/monitors/
[8]: mailto:support@opsnow.com