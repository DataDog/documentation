---
title: Liste des services
kind: documentation
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: tracing/visualization/service
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: tracing/visualization/resource
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: tracing/visualization/trace
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
---
{{< img src="tracing/visualization/services_page.png" alt="Page Services" >}}

## Présentation

Une fois l'[instrumentation de votre application][1] terminée, vos [services][2] s'affichent sur [la page des services APM][3]. La liste des services est une vue globale de l'ensemble des [services][4] de votre infrastructure transmettant des données à Datadog.
Sélectionnez un service individuel pour afficher les données de performances détaillées. [Lisez la documentation relative à la page Service pour en savoir plus][4].

## Filtrer la liste des services

Filtrez la liste des services en fonction des éléments suivants :

* [Environnement][5]
* [Tag primaire][6]
* [Type de service](#services-types)
* Une requête (filtrage textuel de base)

{{< img src="tracing/visualization/services_filtering.mp4" alt="Filtrage de services" video="true" width="75%" >}}

### Types de services

Chaque service surveillé par votre application est associé à un « type ». Ce type est automatiquement déterminé par Datadog en fonction de l'attribut `span.type` issu de vos [spans][7]. Le « type » indique le nom de l'application ou du framework à laquelle/auquel l'Agent Datadog est intégré.

Par exemple, si vous utilisez l'intégration Flask officielle, la valeur de l'option « type » est définie sur « Web ». Si vous surveillez une application personnalisée, la valeur de l'option « type » s'affiche en tant que « Custom ».

Les services peuvent appartenir aux types suivants :

*  Cache
*  Custom
*  DB
*  Web

Nous utilisons également des alias pour des intégrations comme Postgres, MySQL et Cassandra, qui sont mappées avec le Type : « DB », tandis que les intégrations Redis et Memcache sont mappées avec le Type : « Cache ».

### Modifier la couleur d'un service

La couleur du service est utilisée dans les [visualisations de traces][8]. Sélectionnez la couleur de votre service pour la modifier :

{{< img src="tracing/visualization/service_color.png" alt="Couleurs des services" style="width:30%;">}}

## Sélectionner des colonnes

Choisissez ce que vous souhaitez afficher dans votre liste des services :

* **Requests** : le nombre total de requêtes tracées (par seconde)
* **Avg/p75/p90/p95/p99/Max Latency**: la latence moyenne, au 75e centile, au 90e centile, au 95e centile, au 99e centile ou maximale de vos requêtes tracées.
* **Error Rate** : le nombre de requêtes tracées (par seconde) qui se sont terminées avec une erreur
* **Apdex** : score Apdex du service. [En savoir plus sur le score Apdex][9]
* **Monitor status** : [statut des monitors][10] associés à un service

{{< img src="tracing/visualization/services_columns.png" alt="Colonnes des services" style="width:40%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/send_traces
[2]: /fr/tracing/visualization/#services
[3]: https://app.datadoghq.com/apm/services
[4]: /fr/tracing/visualization/service
[5]: /fr/tracing/setting_primary_tags_to_scope/#environment
[6]: /fr/tracing/setting_primary_tags_to_scope
[7]: /fr/tracing/visualization/trace/#spans
[8]: /fr/tracing/visualization/trace
[9]: /fr/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
[10]: /fr/tracing/visualization/service/#service-monitor