---
aliases:
- /fr/database_monitoring/guide/clickhouse/
description: Configuration de Database Monitoring sur une base de données ClickHouse
disable_sidebar: true
further_reading:
- link: /database_monitoring/guide/clickhouse_agent_upgrade
  tag: Documentation
  text: Mise à niveau de l'intégration ClickHouse depuis des versions de l'Agent antérieures
    à 7.84
- link: https://www.datadoghq.com/blog/database-monitoring-for-clickhouse/
  tag: Blog
  text: Surveillez les performances des requêtes ClickHouse avec Datadog Database
    Monitoring
title: Configuration de ClickHouse
---
<div class="alert alert-info">
Cette fonctionnalité est en version préliminaire et nécessite Datadog Agent v7.78 ou une version ultérieure. Les clients qui participent à la version préliminaire de Datadog Database Monitoring pour ClickHouse <strong> ne seront pas facturés </strong> pour l'utilisation encourue pendant la période de prévisualisation. Aucune activation supplémentaire n'est requise ; suivez les instructions de configuration ci-dessous pour commencer.
</div>

### Versions de ClickHouse prises en charge {#clickhouse-versions-supported}

|                              | Auto-hébergé | ClickHouse Cloud |
| ---------------------------- | ----------- | ---------------- |
| ClickHouse 23.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 24.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 25.x              | {{< X >}}   | {{< X >}}        |

### Instructions de configuration par type d'hébergement {#setup-instructions-by-hosting-type}

Pour savoir comment configurer Database Monitoring sur une base de données ClickHouse, sélectionnez votre type d'hébergement :

{{< card-grid card_width="300px" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/selfhosted" src="integrations_logos/clickhouse.png" alt="Auto-hébergé" title="Auto-hébergé" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/cloud" src="integrations_logos/clickhouse.png" alt="ClickHouse Cloud" title="ClickHouse Cloud" >}}
{{< /card-grid >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}