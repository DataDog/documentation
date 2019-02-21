---
title: Métriques
kind: documentation
js_dd_docs_methods:
  - metricsGuidePage
code_languages:
  - Python
  - Ruby
aliases:
  - /fr/metrics/
  - /fr/guides/metrics/
  - /fr/metrictypes/
  - /fr/units/
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: En savoir plus sur DogStatsD
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques pour l'API et DogStatsD officielles et entretenues par la communauté
---
## Introduction

Cette section décrit le fonctionnement et l'utilité des métriques. Après avoir lu cette section, vous saurez comment envoyer des [métriques custom][1] et comprendrez plus clairement le fonctionnement de Datadog. Pour obtenir plus d'informations sur DogStatsD (qui permet d'implémenter ces métriques), consultez la [documentation relative à DogStatsD][2].

### Envoyer des métriques

Il existe plusieurs façons d'envoyer des métriques à Datadog :

1. Directement via l'Agent Datadog. Découvrez comment [rédiger une intégration][3] ou jetez directement un œil au [code source de l'agrégateur][4].
2. Via le serveur DogStatsD (fourni avec l'Agent Datadog) et une [bibliothèque client][5].
3. Directement via l’[API HTTP][6] de Datadog.
4. Via la [bibliothèque de métriques Java Dropwizard][7] avec le backend [metrics-datadog][8]. Nous tenons à remercier les équipes de [Vistar Media][9], [Coursera][10] et [Bazaarvoice][11] pour leurs contributions.

<div class="alert alert-warning">
Les timestamps de métrique ne peuvent pas correspondre à une date plus d'une heure avant l'événement et plus de 10 minutes après celui-ci.
</div>

### Nommer les métriques

Il convient de suivre les règles suivantes concernant les noms de métriques :

* Ils doivent commencer par une lettre.
* Ils doivent seulement contenir des caractères alphanumériques ASCII, des underscores et des points.
  * Les autres caractères, y compris les espaces, sont remplacés par des underscores.
  * La norme Unicode n'est _pas_ prise en charge.
* Ils ne doivent pas dépasser 200 caractères. Nous vous recommandons d'utiliser moins de 100 caractères pour l'interface utilisateur.

Les métriques renvoyées par l'Agent respectent un format pseudo hiérarchique séparé par des points (p. ex., `http.nginx.response_time`). La hiérarchie n'est ni appliquée ni interprétée, mais elle peut être utilisée pour déduire des éléments concernant les serveurs. Par exemple, si `hostA` et `hostB` renvoient tous les deux `http.nginx.*`, il doit s'agir de front-ends web.

## Types de métriques

Dans l'application Datadog, le type des métriques affecte leur interprétation dans les résultats de requêtes et les visualisations graphiques. Ce type est visible et peut être modifié sur la [page de résumé des métriques][12]. Attention, si vous modifiez le type de métrique, toutes les données historiques seront peut-être incompréhensibles.

Il existe quatre types de métriques dans l'application Web de Datadog (l'une d'entre elles est cependant obsolète) :

* COUNT
* COUNTER (obsolète)
* GAUGE
* RATE

Le type d'une métrique est stocké sous forme de métadonnées de métriques et est utilisé pour déterminer l'interprétation d'une métrique dans l'application, en établissant la fonction d'agrégation temporelle par défaut et le comportement `as_rate()`/`as_count()`. Les modificateurs `as_count()` et `as_rate()` se comportent différemment selon les types de métriques de l'application Web.

### Types d'envois et de métriques au sein de l'application Datadog

Datadog prend en charge l'envoi de métriques à partir de diverses sources. Par conséquent, le type d'envoi (c'est-à-dire, le cas d'utilisation) ne correspond pas toujours exactement au type de métriques au sein de l'application Datadog :

| Source de l'envoi   | Méthode d'envoi (python)           | Type d'envoi   | Type au sein de l'application Datadog |
| ------------------- | ------------------------------------ | ----------------- | ------------------- |
| [API][13]            | `api.Metric.send(type="count", ...)` | count             | count               |
| [API][13]            | `api.Metric.send(type="gauge", ...)` | gauge             | gauge               |
| [API][13]            | `api.Metric.send(type="rate", ...)`  | rate              | rate                |
| [DogStatsD][14]      | `dog.gauge(...)`                     | gauge             | gauge               |
| [DogStatsD][14]      | `dog.histogram(...)`                 | histogram         | gauge, rate         |
| [DogStatsD][14]      | `dog.increment(...)`                 | counter           | rate                |
| [DogStatsD][14]      | `dog.set(...)`                       | set               | gauge               |
| [Check de l'Agent][3]    | `self.count(...)`                    | count             | count               |
| [Check de l'Agent][3]    | `self.gauge(...)`                    | gauge             | gauge               |
| [Check de l'Agent][3]    | `self.histogram(...)`                | histogram         | gauge, rate         |
| [Check de l'Agent][3]    | `self.increment(...)`                | counter <sup>obsolète</sup> | rate    |
| [Check de l'Agent][3]    | `self.monotonic_count(...)`          | monotonic_count   | count               |
| [Check de l'Agent][3]    | `self.rate(...)`                     | rate              | gauge               |
| [Check de l'Agent][3]    | `self.set(...)`                      | set               | gauge               |

### Modifier le type d'une métrique

Bien que cette opération ne soit généralement pas requise, vous pouvez modifier le _type_ d'une métrique. Par exemple :

1. Vous disposez d'une métrique `app.requests.served` qui compte les requêtes traitées, mais vous l'avez envoyée par inadvertance via StatsD en tant que `gauge`. Le type de métrique dans Datadog est donc `gauge`.

2. Vous souhaitez envoyer `app.requests.served` en tant que métrique `counter` StatsD pour l'agréger temporellement. Cela vous permettrait de déterminer le _nombre de requêtes traitées lors des dernières 24 heures_, en envoyant `sum:app.requests.served{*}`. Cette requête est cependant illogique pour une métrique de type `gauge`.

3. Vous souhaitez conserver le nom `app.requests.served`. Ainsi, au lieu d'envoyer un nouveau nom de métrique avec un type `counter` plus approprié, vous pouvez modifier le type de `app.requests.served` en mettant à jour :
  * Votre code d'envoi, en appelant `dogstatsd.increment('app.requests.served', N)` après le traitement de N requêtes.
  * Le type au sein de l'application Datadog, via la page de résumé des métriques, en le définissant sur `rate`.

Ainsi, les données envoyées avant le changement de type pour `app.requests.served` affichent un comportement incorrect, car elles ont été enregistrées dans un format qui doit être interprété comme un type `gauge` et non comme un type `rate` au sein de l'application. Les données envoyées après les étapes 3a et 3b
sont interprétées correctement.

Si vous ne souhaitez pas perdre les données historiques envoyées en tant que type `gauge`, créez un nom de métrique avec le nouveau type, en laissant le type de requête `app.requests.served` inchangé.

**Remarque** : pour le check de l'Agent, `self.increment` ne calcule pas le delta pour un accroissement uniforme de counter, mais signale la valeur transmise lors du check. Pour envoyer la valeur delta pour un accroissement uniforme de counter, utilisez `self.monotonic_count`. 

## Unités

Pour éliminer toute ambiguïté et vous aider à mieux comprendre vos systèmes, les unités suivantes peuvent être associées aux métriques soumises à Datadog.

| type         | unité(s)                                                                                                                                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BYTES        | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                       |
| TIME         | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                       |
| PERCENTAGE   | percent_nano / percent / apdex / fraction                                                                                                                                                                                                          |
| NETWORK      | connection / request / packet / segment / response / message / payload / timeout / datagram / route / session                                                                                                                                      |
| SYSTEM       | process / thread / host / node / fault / service / instance / cpu                                                                                                                                                                                  |
| DISK         | file / inode / sector / block                                                                                                                                                                                                                      |
| GENERAL      | buffer / error / read / write / occurrence / event / time / unit / operation / item / task / worker / resource / garbage collection / email / sample / stage / monitor / location / check / attempt / device / update / method / job / container / execution / throttle / invocation / user / success / build / prediction   |
| DB           | table / index / lock / transaction / query / row / key / command / offset / record / object / cursor / assertion / scan / document / shard / flush / merge / refresh / fetch / column / commit / wait / ticket / question                          |
| CACHE        | hit / miss / eviction / get / set                                                                                                                                                                                                                  |
| MONEY        | dollar / cent                                                                                                                                                                                                                                      |
| MEMORY       | page / split                                                                                                                                                                                                                                       |
| FREQUENCY    | hertz / kilohertz / megahertz / gigahertz                                                                                                                                                                                                          |
| LOGGING      | entry                                                                                                                                                                                                                                              |
| TEMPERATURE  | degree celsius / degree fahrenheit                                                                                                                                                                                                                 |
| CPU          | nanocore / microcore / millicore / core / kilocore / megacore / gigacore / teracore / petacore / exacore                                                                                                                                           |

Les unités sont affichées automatiquement sur des graphiques de série temporelle, des widgets de valeur de requête et des top lists, comme indiqué sur la capture d'écran du dashboard Redis ci-dessous :

{{< img src="developers/metrics/redis_dash_metrics_units.png" alt="unités de métriques dash. Redis" responsive="true" style="width:70%;">}}

Sur des graphiques de série temporelle, déplacez votre curseur sur un graphique pour afficher les unités pertinentes. Les données brutes sont automatiquement converties en unités d'affichage lisibles (fractions de seconde en ms, millions d'octets par seconde en MiB/s, etc.) :

{{< img src="developers/metrics/postgres_commits.png" alt="commits postgres" responsive="true" style="width:70%;">}}

Les unités sont également affichées en bas des graphiques de timeboard. Vous pouvez accéder aux descriptions des métriques en sélectionnant **Metrics Info** dans la liste déroulante :

{{< img src="developers/metrics/annotated_ops.png" alt="Opérations annotées" responsive="true" style="width:70%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/metrics/custom_metrics
[2]: /fr/developers/dogstatsd
[3]: /fr/developers/integrations
[4]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
[5]: /fr/developers/libraries
[6]: /fr/api
[7]: https://github.com/dropwizard/metrics
[8]: https://github.com/coursera/metrics-datadog
[9]: http://www.vistarmedia.com
[10]: https://www.coursera.org
[11]: http://www.bazaarvoice.com
[12]: https://app.datadoghq.com/metric/summary
[13]: /fr/api/#metrics
[14]: /fr/developers/dogstatsd