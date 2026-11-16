---
description: Envoyez vos sources de logs existantes vers Datadog et traduisez les
  recherches, alertes et tableaux de bord que vous avez créés dans Splunk.
further_reading:
- link: /logs/log_collection/
  tag: Documentation
  text: Collecte de logs et intégrations
- link: /logs/explorer/search_syntax/
  tag: Documentation
  text: Syntaxe de recherche de logs
- link: /logs/log_configuration/indexes/
  tag: Documentation
  text: Index de logs
title: Migration
---
## Présentation {#overview}

La migration vers Datadog Log Management se compose de deux parties : l'envoi de vos logs vers Datadog et la recréation des recherches, alertes et tableaux de bord sur lesquels vos équipes s'appuient.

## Envoyez vos logs vers Datadog {#send-your-logs-to-datadog}

Configurez le [Datadog Agent][1] pour collecter les logs à partir de fichiers, de conteneurs et de sources réseau. Les [Integrations][2] qui prennent en charge la collecte de logs incluent leurs propres configurations de logs.

## Traduisez vos requêtes et ressources {#translate-your-queries-and-assets}

Une fois vos logs dans Datadog, utilisez [Query Translation][3] pour convertir le Splunk Processing Language (SPL) en [syntaxe de recherche de logs][4] Datadog. Traduisez une requête à la fois, ou traduisez en masse les requêtes des alertes et des tableaux de bord Splunk, puis utilisez-les pour créer des monitors et des tableaux de bord Datadog. Query Translation prend uniquement en charge Splunk comme plateforme source.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/logs/
[2]: /fr/integrations/
[3]: /fr/logs/migration/query_translation/
[4]: /fr/logs/explorer/search_syntax/