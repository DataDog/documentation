---
title: Unités des métriques
kind: documentation
further_reading:
- link: graphing/
  tag: Documentation
  text: Visualiser vos données pour mieux les comprendre
---

Pour éliminer toute ambiguïté et vous aider à mieux comprendre vos systèmes, les unités suivantes peuvent être associées aux métriques soumises à Datadog.

| type        | unité(s)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OCTETS       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| DURÉE        | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                                                                                               |
| POURCENTAGE  | percent_nano / percent / apdex / fraction                                                                                                                                                                                                                                                                                  |
| RÉSEAU     | connection / request / packet / segment / response / message / payload / timeout / datagram / route / session                                                                                                                                                                                                              |
| SYSTÈME      | process / thread / host / node / fault / service / instance / cpu                                                                                                                                                                                                                                                          |
| DISQUE        | file / inode / sector / block                                                                                                                                                                                                                                                                                              |
| GÉNÉRAL     | buffer / error / read / write / occurrence / event / time / unit / operation / item / task / worker / resource / garbage collection / email / sample / stage / monitor / location / check / attempt / device / update / method / job / container / execution / throttle / invocation / user / success / build / prediction |
| BDD          | table / index / lock / transaction / query / row / key / command / offset / record / object / cursor / assertion / scan / document / shard / flush / merge / refresh / fetch / column / commit / wait / ticket / question                                                                                                  |
| CACHE       | hit / miss / eviction / get / set                                                                                                                                                                                                                                                                                          |
| DEVISE       | dollar / cent                                                                                                                                                                                                                                                                                                              |
| MÉMOIRE      | page / split                                                                                                                                                                                                                                                                                                               |
| FRÉQUENCE   | hertz / kilohertz / megahertz / gigahertz                                                                                                                                                                                                                                                                                  |
| JOURNALISATION     | entry                                                                                                                                                                                                                                                                                                                      |
| TEMPÉRATURE | degree celsius / degree fahrenheit                                                                                                                                                                                                                                                                                         |
| PROCESSEUR         | nanocore / microcore / millicore / core / kilocore / megacore / gigacore / teracore / petacore / exacore                                                                                                                                                                                                                   |

Les unités sont affichées automatiquement sur des graphiques de série temporelle, des widgets de valeur de requête et des Top Lists, comme indiqué sur la capture d'écran suivante d'un dashboard Redis :

{{< img src="developers/metrics/metrics_units/redis_dash_metrics_units.png" alt="Unités de métriques dash. Redis"  style="width:70%;">}}

Sur des graphiques de série temporelle, déplacez votre curseur sur un graphique pour afficher les unités pertinentes. Les données brutes sont automatiquement converties en unités d'affichage lisibles (fractions de seconde en ms, millions d'octets par seconde en MiB/s, etc.) :

{{< img src="developers/metrics/metrics_units/postgres_commits.png" alt="commits postgres"  style="width:70%;">}}

Les unités sont également affichées en bas des graphiques de timeboard. Vous pouvez accéder aux descriptions des métriques en sélectionnant **Metrics Info** dans la liste déroulante :

{{< img src="developers/metrics/metrics_units/annotated_ops.png" alt="Ops annotées"  style="width:70%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
