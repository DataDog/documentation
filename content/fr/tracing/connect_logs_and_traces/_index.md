---
title: Associer vos logs à vos traces
kind: documentation
description: Associez vos logs à vos traces pour les mettre en corrélation dans Datadog.
aliases:
  - /fr/tracing/advanced/connect_logs_and_traces/
---
{{< img src="tracing/connect_logs_and_traces/trace_id_injection.png" alt="Logs dans des traces"  style="width:100%;">}}

L'ajout automatique des attributs `dd.trace_id` et `dd.span_id`  à vos logs, avec les bibliothèques de tracing, améliore la corrélation entre l'APM et les logs de Datadog. Cette fonctionnalité peut être utilisée dans la plateforme pour afficher les logs spécifiques qui sont corrélés à la [trace][1] observée.

Avant de corréler des traces à des logs, assurez-vous que vos logs sont envoyés au format JSON ou [parsés par le bon processeur de log pour le langage utilisé][2].

Vos logs au niveau des langages _doivent_ être convertis en attributs Datadog afin que la corrélation entre les traces et les logs fonctionne. Sélectionnez un langage ci-dessous pour découvrir comment associer vos logs à vos traces automatiquement ou manuellement :

{{< partial name="apm/apm-connect-logs-and-traces.html" >}}

[1]: /fr/tracing/visualization/#trace
[2]: /fr/agent/logs/#enabling-log-collection-from-integrations