---
title: Métriques de la surveillance Synthetic
kind: documentation
description: Ces métriques sont générées par les tests de surveillance Synthetic.
further_reading:
  - link: /synthetics/guide/api_test_timing_variations/
    tag: Documentation
    text: Durées et écarts des tests API
---
## Présentation

Les métriques suivantes sont générées par les tests de surveillance Synthetic.

Les métriques qui commencent par :

* `synthetics.test_runs` proviennent de tous vos tests Synthetic ;
* `datadog.estimated_usage.synthetics.*` renvoient les données d'utilisation pertinentes de vos tests Synthetic.

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
* `synthetics.pl.worker.*` proviennent de vos [emplacements privés][11].

### Métriques générales

{{< get-metrics-from-git "synthetics" "synthetics.test_runs datadog.estimated_usage.synthetics" >}}

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