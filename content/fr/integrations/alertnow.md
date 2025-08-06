---
app_id: alertnow
categories:
- slos
- automation
- collaboration
- logs-restriction-queries-update-a-restriction-query
- tracing_custom_inst_ruby
custom_kind: integration
description: Synchroniser des alertes Datadog avec des alertes AlertNow
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: AlertNow
---
## Section Overview

AlertNow est une plateforme de gestion des incidents intégrée qui recueille des alertes depuis différents environnements informatiques complexes et les transmet aux personnes pertinentes. Cette solution permet d'accélérer la résolution des incidents. Lorsque vous associez AlertNow à Datadog, vos alertes Datadog sont automatiquement synchronisées avec les alertes AlertNow. Vous pouvez gérer vos alertes sur une plateforme unique, envoyer des notifications à vos équipes et corriger immédiatement les problèmes majeurs.

Avec AlertNow, vous pouvez :

- Déclencher et résoudre des incidents depuis Datadog

- Prévenir les personnes pertinentes par e-mail, SMS ou appel vocal, ou via une application mobile, lorsque des incidents surviennent

- Appliquer une politique de réaffectation pour l'envoi de notifications aux utilisateurs

- Générer des rapports sur le MTTA et le MTTR, ainsi que des rapports d'analyse

![alertnow overview](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/alertnow_overview.png)

## Configuration

### AlertNow

Pour associer Datadog à AlertNow, créez un webhook et des monitors dans Datadog.

1. Utilisez votre compte AlertNow existant ou créez-en un à l'adresse opsnow.com.

1. Connectez-vous à AlertNow et accédez au menu Configuration > Integration.

1. Cliquez sur **Create Integration**, puis sélectionnez la fiche **Datadog**.

   ![carte datadog](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/integration_card_datadog.png)

1. Sur la page Create Integration, saisissez les informations requises, puis cliquez sur le bouton OK pour créer l'intégration.

   ![datadog integration](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/create_integration_datadog_en.png)

1. Copiez l'URL depuis la page Integration d'AlertNow.
   ![datadog detail](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_integration_detail.png)

### Datadog

Suivez les étapes indiquées ci-dessous dans votre compte Datadog.

1. Ouvrez la tuile [Intégration Webhooks] (https://app.datadoghq.com/account/login?next=%2Faccount%2Fsettings#integrations/webhooks).

1. Sélectionnez l'onglet **Configuration**, faites défiler l'écran vers le bas, puis cliquez sur **New**.

1. Dans le formulaire **New Webhook**, saisissez un nom pertinent ainsi que l'URL du webhook AlertNow créé depuis la page Integration d'AlertNow. L'URL du webhook copié respecte le format suivant. Remplacez simplement **{CLÉ-API-ALERTNOW}** par votre clé d'API.

   <pre><code> https://alertnowitgr.opsnow.com/integration/datadog/v1/{ALERTNOW-API-KEY} </code></pre>

   ![datadog webhook](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_webhook.png)

1. Copiez la charge utile JSON ci-dessous et collez-la dans la fenêtre Payload.

   ```json
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

1. Pour créer des moniteurs, reportez-vous à la [documentation sur les alertes] de Datadog(https://docs.datadoghq.com/monitors/).

## Assistance

Besoin d'aide ? Contactez [AlertNow support] (mailto:support@opsnow.com).