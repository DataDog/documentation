---
aliases:
- /fr/developers/metrics/metrics_units
- /fr/developers/metrics/units/
further_reading:
- link: /dashboards/
  tag: Documentation
  text: Visualiser vos données pour mieux les comprendre
title: Unités des métriques
---

## Présentation

Les unités de métriques sont affichées sur les graphiques de séries temporelles, les widgets de valeur de requête et les toplists.

{{< img src="metrics/units/redis_dash_metrics_units.png" alt="Unités de métriques du dashboard Redis" style="width:100%;">}}

Vous pouvez passer votre curseur sur le graphique d'une série temporelle pour afficher les unités pertinentes. Les unités doivent être spécifiées manuellement. Si aucune unité n'est définie, une notation par ordre de grandeur (K, M et G pour les milliers, millions et milliards, respectivement) est utilisée. Si une unité a été définie, les données brutes sont automatiquement converties dans des unités d'affichage lisibles, à l'aide de leur ordre de grandeur pertinent.

Par exemple, pour un point de données avec la valeur 3 000 000 000 :

* Si vous n'avez pas spécifié d'unité pour ce point de données, la valeur « 3G » s'affiche.
* Si vous avez indiqué que l'unité de ce point de données est le byte, la valeur « 3 GB » s'affiche.

Les unités sont également affichées en bas des graphiques de timeboard. Vous pouvez accéder aux descriptions des métriques en sélectionnant **Metrics Info** dans la liste déroulante :

{{< img src="metrics/units/annotated_ops.png" alt="Opérations annotées" style="width:100%;">}}

Pour modifier l'unité d'une métrique, accédez à la page [Metrics Summary][1] et sélectionnez une métrique. Cliquez sur **Edit** sous **Metadata**, puis sélectionnez une unité telle que `bit` ou `byte` depuis le menu déroulant.

## Liste d'unités

Les unités suivantes peuvent être associées aux métriques transmises à Datadog :

| type        | unité(s)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| DURÉE        | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                                                                                               |
| POURCENTAGE  | percent_nano / percent / apdex / fraction                                                                                                                                                                                                                                                                                  |
| RÉSEAU     | connection / request / packet / segment / response / message / payload / timeout / datagram / route / session / hop                                                                                                                                                                                                             |
| SYSTÈME      | process / thread / host / node / fault / service / instance / cpu                                                                                                                                                                                                                                                          |
| DISQUE        | file / inode / sector / block                                                                                                                                                                                                                                                                                              |
| GÉNÉRAL     | buffer / error / read / write / occurrence / event / time / unit / operation / item / task / worker / resource / garbage collection / email / sample / stage / monitor / location / check / attempt / device / update / method / job / container / execution / throttle / invocation / user / success / build / prediction / exception |
| BDD          | table / index / lock / transaction / query / row / key / command / offset / record / object / cursor / assertion / scan / document / shard / flush / merge / refresh / fetch / column / commit / wait / ticket / question                                                                                                  |
| CACHE       | hit / miss / eviction / get / set                                                                                                                                                                                                                                                                                          |
| DEVISE       | dollar / cent / microdollar / euro                                                                                                                                                                                                                                                                                         |
| MÉMOIRE      | page / split                                                                                                                                                                                                                                                                                                               |
| FRÉQUENCE   | hertz / kilohertz / megahertz / gigahertz                                                                                                                                                                                                                                                                                  |
| JOURNALISATION     | entry                                                                                                                                                                                                                                                                                                                      |
| TEMPÉRATURE | decidegree celsius / degree celsius / degree fahrenheit                                                                                                                                                                                                                                                                    |
| CPU         | nanocore / microcore / millicore / core / kilocore / megacore / gigacore / teracore / petacore / exacore                                                                                                                                                                                                                   |
| PUISSANCE       | nanowatt / microwatt / milliwatt / deciwatt / watt / kilowatt / megawatt / gigawatt / terrawatt                                                                                                                                                                                                                            |
| COURANT     | milliampere / ampere                                                                                                                                                                                                                                                                                                       |
| TENSION   | millivolt / volt                                                                                                                                                                                                                                                                                                           |
| APM         | span                                                                                                                                                                                                                                                                                                                       |
| SYNTHETICS  | run                                                                                                                                                                                                                                                                                                                        |

## Format des nombres

### Format sans unité

Pour les métriques sans unité, Datadog utilise les [préfixes du Système international d'unités][2] : `K`, `M`, `G` et `T`. Après `T`, les nombres sont convertis en notation scientifique, qui est également utilisée pour de très petits nombres. Par défaut, Datadog arrondit les valeurs à deux décimales. Pour la notation scientifique, aucune décimale n'est affichée par défaut.

#### Scénarios

| Valeur brute              | Valeur mise en forme |
|------------------------|-----------|
| 1                      | 1         |
| 2.7182818284           | 2.72      |
| 1337                   | 1.34K     |
| 31536000               | 31.54M    |
| 4294967296             | 4.29G     |
| 18446744073709552000   | 2e19      |
| 0.001                  | 1e-3      |
| 2.3283064365386963e-10 | 2e-10     |
| invalid                | S. O.       |

### Gestion des unités

Les unités sont automatiquement mise en forme sur vos graphiques pour améliorer leur lisibilité.

#### Scénarios

| Unité       | Famille    | Valeur brute            | Valeur mise en forme    |
|------------|-----------|----------------------|--------------|
| byte       | octets     | 1                    | 1 B          |
| kibibyte   | octets     | 1234235              | 1.18 GiB     |
| kibibyte   | octets     | 45457878236741230000 | 40374.71 EiB |
| hertz      | fréquence | 6345223              | 6.35 MHz     |
| cent       | argent     | 1337                 | 13.37 $      |
| nanosecond | durée      | 0                    | 0s           |
| second     | durée      | 0.03212              | 32.12ms      |

### Format de durée

Les unités de temps entre une minute et un an sont divisées en plusieurs unités pour être plus lisibles. Voici les conventions qui s'appliquent :

- Les durées courtes sont affichées en tant que nombre décimal.
- La plus petite unité de temps est la nanoseconde.
- Les longues durées sont affichées en nombre de jours au format décimal.


#### Scénarios

| Valeurs brutes en secondes | Valeur mise en forme               |
|-------------|-------------------------|
| 0.00123     | 1.23ms                  |
| 0.00012345  | 123.45μs (microsecondes) |
| 1.2345e-9   | 1.23ns                  |
| 95          | 1m 35s                  |
| 3671        | 1h 1m                   |
| 86390       | 1d                      |
| 96400       | 1d 3h                   |
| 52596400    | 608.75 days             |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes