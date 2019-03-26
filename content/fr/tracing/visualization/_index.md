---
title: Débuter avec l'APM
kind: documentation
aliases:
  - /fr/tracing/terminology/
  - /fr/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
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
L'APM recueille les métriques sur les performances de votre application avec quatre niveaux de granularité : au niveau des _services_, _ressources_, _traces_ et _spans_.

## Services

**Un service est un ensemble de processus qui ont la même fonction.**
Par exemple, une simple application Web peut être composée de deux services :

* Un service `webapp` et un service `database`.

Tandis qu'un environnement complexe peut se diviser en 6 services :

* 3 services différents : `webapp`, `admin` et `query`.
* 3 services externes : `master-db`, `replica-db` et `yelp-api`.

L'APM attribue automatiquement des noms à vos services. Cependant, vous pouvez également les nommer de manière explicite. Consultez les instructions pour : [Go][1], [Java][2], [Python][3] ou [Ruby][4].

Les noms de service :

* **doivent être composés de caractères alphanumériques en minuscule ;**
* **sont limités à 50 caractères ;**
* **ne peuvent pas contenir d'espaces** (les espaces sont remplacées par des underscores) ;
* doivent respecter les [règles portant sur les noms de métriques][5].

**Remarque** : les services doivent être associés à un type. L'APM attribue automatiquement l'un des quatre types suivants aux services : web, database, cache ou custom.

Vous pouvez également [recevoir des alertes][6] sur une métrique au niveau des services. Découvrez comment surveiller des services dans l'APM en consultant les sections [Liste des services][7] et [Page Service][8].

## Ressources

**Une ressource est une action particulière pour un service**.

* **Pour une application Web** : il peut s'agir par exemple d'une URL canonique comme `/user/home` ou d'une fonction de gestionnaire comme `web.user.home` (souvent appelées « routes » dans les frameworks MVC).
* **Pour une base de données SQL** : une requête, telle que `SELECT * FROM users WHERE id = ?`, constitue une ressource.

Les ressources doivent être regroupées sous un nom canonique, comme `/user/home`, au lieu d'utiliser des ressources séparées comme `/user/home?id=100` et `/user/home?id=200`. L'APM attribue automatiquement des noms à vos ressources. Cependant, vous pouvez également les nommer de manière explicite. Consultez les instructions pour : [Go][9], [Java][2], [Python][10] et [Ruby][11].

Cliquez sur un [service][8] spécifique pour visualiser ces ressources.

Les noms de ressource :

* **doivent être composés de caractères alphanumériques en minuscule ;**
* **ne peuvent pas dépasser 5 000 octets.**

[Recevez des alertes][12] sur une métrique au niveau des ressources. Découvrez comment surveiller des ressources dans l'APM en consultant la section [Page Ressource][13].

### Cardinalité des ressources

Lorsqu'une ressource comme une URL ou une requête SQL ne peut pas être agrégée, cela augmente considérablement la cardinalité des ressources (c'est-à-dire, le nombre de ressources agrégées uniques) à stocker dans Datadog.

Une cardinalité très importante de ressources restreint l'utilisation de Datadog :

* Un nombre trop important d'entrées dans la liste des ressources n'est pas optimal pour la navigation.
* Les statistiques sont moins pertinentes (car elles sont trop fragmentées).

Par conséquent, nous avons défini une limite stricte sur la cardinalité des ressources pour un service donné.

### Trace

**Une trace est utilisée pour suivre le délai de traitement d'une opération par une application. Chaque trace comprend au moins une span.**

Par exemple, une trace peut permettre de suivre le délai de traitement d'une requête Web compliquée. Même si la requête peut nécessiter plusieurs ressources et machines, tous ces appels de fonction et toutes ces sous-requêtes sont rassemblés dans une seule trace.

### Spans

**Unespan représente une unité logique de travail dans le système.**

Les spans sont associées à un [service][8] et éventuellement à une [ressource][13]. Chaque span comprend une heure de début, une durée et des tags facultatifs. Une span peut par exemple peut décrire le temps passé pour un appel distribué sur une machine distincte ou le temps passé sur un composant minime dans le cadre d'une opération plus importante. Les spans peuvent être imbriquées, ce qui leur confère une relation parent-enfant.

{{< img src="getting_started/trace_span_image.png" alt="Image span trace" responsive="true" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer/#service
[2]: /fr/tracing/languages/java/#configuration
[3]: http://pypi.datadoghq.com/trace/docs/index.html#getting-started
[4]: http://www.rubydoc.info/gems/ddtrace
[5]: /fr/developers/metrics
[6]: /fr/monitors/monitor_types/apm
[7]: /fr/tracing/visualization/services_list
[8]: /fr/tracing/visualization/service
[9]: /fr/tracing/languages/go
[10]: /fr/tracing/languages/python
[11]: /fr/tracing/languages/ruby
[12]: /fr/tracing/faq/how-to-create-a-monitor-over-every-resource-apm
[13]: /fr/tracing/visualization/resource