---
aliases:
- /fr/tracing/advanced/connect_logs_and_traces/
- /fr/tracing/connect_logs_and_traces/
description: Associez vos logs à vos traces pour les mettre en corrélation dans Datadog.
title: Associer vos logs à vos traces
type: multi-code-lang
---

{{< img src="tracing/connect_logs_and_traces/trace_id_injection.png" alt="Logs dans des traces"  style="width:100%;">}}

L'injection des ID de traces, des ID de spans et des tags `env`, `service` et `version` en tant qu'attributs dans vos logs permet d'améliorer la corrélation entre l'APM Datadog et Log Management. Vous pouvez utiliser ces champs pour rechercher les logs associés à un service et une version spécifiques, ou tous les logs corrélés à une [trace][1] observée.

Nous vous conseillons de configurer le traceur de votre application avec `DD_ENV`, `DD_SERVICE` et `DD_VERSION` afin d'ajouter les tags `env`, `service` et `version` de manière optimale. Pour en savoir plus, consultez la documentation sur le [tagging de service unifié][2].

**Remarque** : le traceur PHP ne prend pas actuellement en charge la configuration du tagging de service unifié pour les logs.

Avant de corréler des traces à des logs, assurez-vous que vos logs sont envoyés au format JSON ou [parsés par le bon processeur de log pour le langage utilisé][3]. Vos logs de langage _doivent_ être convertis en attributs Datadog pour que la corrélation entre les traces et les logs fonctionne.

Pour en savoir plus sur l'association automatique ou manuelle de vos logs à vos traces, sélectionnez votre langage ci-dessous :

{{< partial name="apm/apm-connect-logs-and-traces.html" >}}

[1]: /fr/tracing/glossary/#trace
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/agent/logs/#enabling-log-collection-from-integrations