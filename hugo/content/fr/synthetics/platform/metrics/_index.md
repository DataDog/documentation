---
aliases:
- /fr/synthetics/metrics/
description: Ces métriques sont générées par les tests Synthetic Monitoring.
further_reading:
- link: /synthetics/guide/api_test_timing_variations/
  tag: Documentation
  text: En savoir plus sur les temps d'exécution et les variations des tests d'API
- link: /synthetics/guide/using-synthetic-metrics/
  tag: Documentation
  text: En savoir plus sur l'utilisation des métriques Synthetic dans les monitors
- link: /continuous_testing/settings
  tag: Documentation
  text: En savoir plus sur la parallélisation pour Continuous Testing
title: Métriques de Synthetic Monitoring et Continuous Testing
---

## Présentation

Les métriques suivantes sont générées par les tests Synthetic Monitoring et les paramètres de Continuous Testing.

Les métriques qui commencent par :

* `synthetics.test_runs` proviennent de tous vos tests Synthetic ;
* `datadog.estimated_usage.synthetics.*` renvoient les données d'utilisation pertinentes de vos tests Synthetic.
* `synthetics.on_demand` renvoie des données d'utilisation pertinentes pour [Continuous Testing](#continuous-testing)

Les métriques qui commencent par :

* `synthetics.api.*` proviennent de vos [tests API][1] ;
    * `synthetics.http.*` proviennent de vos [tests API HTTP][2] ;
    * `synthetics.ssl.*` proviennent de vos [tests API SSL][3] ;
    * `synthetics.dns.*` proviennent de vos [tests API DNS][4] ;
    * `synthetics.websocket.*` proviennent de vos [tests API WebSocket][5] ;
    * `synthetics.tcp.*` proviennent de vos [tests API TCP][6] ;
    * `synthetics.udp.*` proviennent de vos [tests API UDP][7] ;
    * `synthetics.icmp.*` proviennent de vos [tests API ICMP][8] ;
* `synthetics.multi.*` proviennent de vos [tests API à plusieurs étapes][9] ;
* `synthetics.browser.*` proviennent de vos [tests Browser][10] ;
* `synthetics.pl.*` provient de vos [emplacements privés][11]

### Métriques générales

{{< get-metrics-from-git "synthetics" "synthetics.test_runs synthetics.test_run_steps datadog.estimated_usage.synthetics" >}}

### Tests API

{{< get-metrics-from-git "synthetics" "synthetics.api" >}}

#### Tests HTTP

{{< get-metrics-from-git "synthetics" "synthetics.http" >}}

#### Tests SSL

{{< get-metrics-from-git "synthetics" "synthetics.ssl" >}}

#### Tests DNS

{{< get-metrics-from-git "synthetics" "synthetics.dns" >}}

#### Tests WebSocket

{{< get-metrics-from-git "synthetics" "synthetics.websocket" >}}

#### Tests TCP

{{< get-metrics-from-git "synthetics" "synthetics.tcp" >}}

#### Tests UDP

{{< get-metrics-from-git "synthetics" "synthetics.udp" >}}

#### Tests ICMP

{{< get-metrics-from-git "synthetics" "synthetics.icmp" >}}

Pour en savoir plus sur les durées des tests API, consultez le guide sur [les durées et les écarts des tests API][12].

### Tests API à plusieurs étapes

{{< get-metrics-from-git "synthetics" "synthetics.multi" >}}

### Tests Browser

{{< get-metrics-from-git "synthetics" "synthetics.browser" >}}

### Emplacements privés

{{< get-metrics-from-git "synthetics" "synthetics.pl.worker" >}}

### Tests continus

{{< get-metrics-from-git "synthetics" "synthetics.on_demand.concurrency" >}}

Pour en savoir plus sur la parallélisation, consultez la section [Paramètres des tests continus][13].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/
[2]: /fr/synthetics/api_tests/http_tests
[3]: /fr/synthetics/api_tests/ssl_tests
[4]: /fr/synthetics/api_tests/dns_tests
[5]: /fr/synthetics/api_tests/websocket_tests
[6]: /fr/synthetics/api_tests/tcp_tests
[7]: /fr/synthetics/api_tests/udp_tests
[8]: /fr/synthetics/api_tests/icmp_tests
[9]: /fr/synthetics/multistep/
[10]: /fr/synthetics/browser_tests/
[11]: /fr/synthetics/private_locations/
[12]: /fr/synthetics/guide/api_test_timing_variations/
[13]: /fr/continuous_testing/settings/#parallelization