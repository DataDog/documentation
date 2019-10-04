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
{{< img src="tracing/visualization/services_page.png" alt="Page Services" responsive="true" >}}

## Présentation

Une fois que vous avez [instrumenté votre application][1], les services transmettant des données s'affichent sur la [page des services APM][2]. La liste des services présente une vue d'ensemble de tous les [services][3] qui transmettent des données à partir de votre infrastructure.
Sélectionnez un service individuel pour afficher des statistiques de performance détaillées. [Lisez la documentation relative aux services pour en savoir plus][3].

## Filtrer la liste des services

Filtrez la liste des services en fonction des éléments suivants :

* [Environnement][4]
* [Tag primaire][5]
* [Type de service](#services-types)
* Une requête (filtrage textuel de base)

{{< img src="tracing/visualization/services_filtering.gif" alt="Filtrage de services" responsive="true" style="width:75%;">}}

### Types de services

Chaque service surveillé par votre application est associé à un « type ». Ce type est automatiquement déterminé par Datadog en fonction de l'attribut `span.type` associé à vos [spans][6]. Le « type » indique le nom de l'application/du framework avec laquelle/lequel l'Agent Datadog s'intègre.

Par exemple, si vous utilisez l'intégration Flask officielle, la valeur de l'option « type » est définie sur « Web ». Si vous surveillez une application personnalisée, la valeur de l'option « type » s'affiche en tant que « Custom ».

Les services peuvent appartenir aux types suivants :

*  Cache
*  Custom
*  DB
*  Web

Nous utilisons également des alias pour des intégrations comme Postgres, MySQL et Cassandra, qui sont mappées avec le Type : « DB », tandis que les intégrations Redis et Memcache sont mappées avec le Type : « Cache ».

### Modifier la couleur d'un service

La couleur d'un service est utilisée dans les [visualisations de trace][7]. Sélectionnez la couleur de votre service pour la modifier :

{{< img src="tracing/visualization/service_color.png" alt="Couleurs des services" responsive="true" style="width:30%;">}}

## Sélectionner des colonnes

Choisissez ce que vous souhaitez afficher dans votre liste des services :

* **Requests** : le nombre total de requêtes tracées (par seconde)
* **Avg/p75/p90/p95/p99/Max Latency**: la latence moyenne, au 75e centile, au 90e centile, au 95e centile, au 99e centile ou maximale de vos requêtes tracées.
* **Error Rate** : le nombre de requêtes tracées (par seconde) qui se sont terminées avec une erreur
* **Apdex** : le score Apdex du service ; [en savoir plus sur Apdex][8]
* **Monitor status** : [état des monitors][9] associés à un service

{{< img src="tracing/visualization/services_columns.png" alt="Colonnes des services" responsive="true" style="width:40%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup
[2]: https://app.datadoghq.com/apm/services
[3]: /fr/tracing/visualization/service
[4]: /fr/tracing/advanced/setting_primary_tags_to_scope/#environment
[5]: /fr/tracing/advanced/setting_primary_tags_to_scope
[6]: /fr/tracing/visualization/trace/#spans
[7]: /fr/tracing/visualization/trace
[8]: /fr/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
[9]: /fr/tracing/visualization/service/#service-monitor