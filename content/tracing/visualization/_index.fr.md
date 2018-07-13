---
title: Débuter avec l'APM
kind: documentation
aliases:
  - /fr/tracing/terminology/
  - >-
    /fr/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrez comment configurer Tracing d'APM avec votre application
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services reportant à Datadog
  - link: tracing/visualization/service
    tag: Documentation
    text: En savoir plus sur les Services dans Datadog
  - link: tracing/visualization/resource
    tag: Documentation
    text: Plongez dans les performances de vos ressources et vos traces
  - link: tracing/visualization/trace
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
---
APM collecte des statistiques sur les performances de votre application à quatre niveaux de granularité: _services_, _ressources_, _traces_ et _spans_ .

## Services

** Un service est le nom d'un ensemble de processus qui font le même travail.**
Par exemple, une application web simple peut se résumer à deux services:

* Un seul service `webapp` et un seul service`database`.

Alors qu'un environnement plus complexe peut se répartir en 6 services:

* 3 services séparés: `webapp`, `admin`, and `query`.
* 3 services externes séparés:  `master-db`,  `replica-db`, and `yelp-api`.

L'APM attribue automatiquement des noms à vos services; Cependant, vous pouvez également les nommer explicitement. Consultez les instructions pour: [Go][1], [Java][2], [Python][3], [Ruby][4].

Nom de Service:

* **Doit être en minuscules avec des caractères alphanumériques**.
* **Ne peut pas avoir plus de 50 caractères**.
* **Ne peut pas contenir d'espaces** (les espaces sont remplacés par des underscores).
* doit respecter les [règles de nommage de métrique][5].

**Note**: Le service doit avoir un type attaché, l'APM assigne automatiquement aux services entrant l'un des quatre types suivants: web, database, cache, custom.

Vous pouvez également [construire une alert][6]  sur n'importe quelle métrique de de service. Pour en savoir plus sur les monitors de services dans l'APM, consultez les pages [liste des services][7] et [la page d'un service][8].

## Ressources

**Une ressource est une action particulière pour un service**.

* **Pour une application Web**: certains exemples peuvent être un URL canonique, comme `/user/home` ou une fonction de handler comme `web.user.home` (souvent appelée “routes” dans les frameworks MVC).
* **Pour une base de données SQL**: une ressource est la requête elle-même, par exemple `SELECT * FROM users WHERE id = ?`.

Les ressources doivent être regroupées sous un nom canonique, comme `/user/home` plutôt que d'avoir `/user/home?id=100` et `/user/home?id=200` comme ressources séparées. L'APM attribue automatiquement des noms à vos ressources; Cependant, vous pouvez également les nommer explicitement. Consultez les instructions pour: [Go][9], [Java][2], [Python][10], [Ruby][11].

Ces ressources peuvent être trouvées après avoir cliqué sur un [service][8] particulier.

Nom de Ressource:

* **Doit être en minuscules, caractères alphanumériques**
* **Ne peut pas dépasser 5000 octets**

[Construisez une Alerte][12] sur chaque métrique issue d'une resource. Apprenez en plus sur le monitoring de ressources APM sur la documentation dédiée [resource dashboard][13] page.

### Cardinalité des ressources

Lorsqu'une ressource telle qu'une URL ou une requête SQL ne peut pas être agrégée, cela augmente considérablement la cardinalité des ressources (c'est-à-dire le nombre de ressources agrégées uniques) à stocker dans Datadog.

Avoir une très grande cardinalité de ressources rend Datadog plus difficilement utilisable:

* Trop d'entrées dans la liste des ressources n'est pas optimale pour la navigation.
* Les statistiques sont moins pertinentes (car elles sont trop fragmentées).

En conséquence, nous avons une limite stricte sur la cardinalité des ressources pour un service donné.

### Trace

**Une trace est utilisée pour suivre le temps passé par une application traitant une seule opération, chaque trace est constituée d'une ou plusieurs span.**

Par exemple, une trace peut être utilisée pour suivre tout le temps passé à traiter une requête Web compliquée. Même si la requête  nécessite plusieurs ressources et machines pour la gérer, tous ces appels de fonctions et sous-requêtes seront encapsulés dans une seule trace.

### Spans

**Une span représente une unité de travail dans le système.**

Les Spans sont associées à un [service][8] et éventuellement une [ressource][13]. Chaque span comprend une heure de début, une durée et des optionnellement des tags. Par exemple, une span peut décrire le temps passé sur un appel distribué sur une machine distante ou le temps passé dans un petit composant dans une opération plus importante. Les spans peuvent être imbriquées les unes dans les autres et, dans ce cas, auront une relation parent-enfant.

{{< img src="getting_started/trace_span_image.png" alt="Trace span image" responsive="true" style="width:80%;">}}

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer/#service
[2]: /tracing/setup/java/#configuration
[3]: http://pypi.datadoghq.com/trace/docs/#get-started
[4]: http://www.rubydoc.info/gems/ddtrace/
[5]: /developers/metrics/
[6]: /monitors/monitor_types/apm/
[7]: /tracing/visualization/services_list/
[8]: /tracing/visualization/service
[9]: /tracing/setup/go/
[10]: /tracing/setup/python/
[11]: /tracing/setup/ruby/
[12]: /tracing/faq/how-to-create-a-monitor-over-every-resource-apm
[13]: /tracing/visualization/resource