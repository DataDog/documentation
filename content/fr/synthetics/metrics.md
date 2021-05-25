---
title: Métriques Synthetic
kind: documentation
description: Ces métriques sont générées par les tests de surveillance Synthetic.
---
## Métriques

Les métriques suivantes sont générées par les tests de surveillance Synthetic.

Les métriques qui commencent par :

* `synthetics.browser.*` proviennent de vos [tests Browser][1] ;
* `synthetics.api.*` proviennent de vos tests API ;
* `synthetics.http.*` proviennent de vos [tests API HTTP][2] ;
* `synthetics.tcp.*` proviennent de vos [tests API TCP][3] ;
* `synthetics.dns.*` proviennent de vos [tests API DNS][4] ;
* `synthetics.ssl.*` proviennent de vos [tests API SSL][5].

### Tests Browser

{{< get-metrics-from-git "synthetics" "synthetics.browser" >}}

### Tests API

{{< get-metrics-from-git "synthetics" "synthetics.api" >}}

#### Tests HTTP

{{< get-metrics-from-git "synthetics" "synthetics.http" >}}

#### Tests TCP

{{< get-metrics-from-git "synthetics" "synthetics.tcp" >}}

#### Tests DNS

{{< get-metrics-from-git "synthetics" "synthetics.dns" >}}

#### Tests SSL

{{< get-metrics-from-git "synthetics" "synthetics.ssl" >}}

[1]: /fr/synthetics/browser_tests/
[2]: /fr/synthetics/api_tests/?tab=httptest
[3]: /fr/synthetics/api_tests/?tab=tcptest
[4]: /fr/synthetics/api_tests/?tab=dnstest
[5]: /fr/synthetics/api_tests/?tab=ssltest