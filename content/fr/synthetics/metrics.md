---
title: Métriques Synthetic
kind: documentation
description: Ces métriques sont générées par les tests de surveillance Synthetic.
---
## Métriques

Les métriques suivantes sont générées par les tests de surveillance Synthetic.

Les métriques qui commencent par :

* `synthetics.browser.*` proviennent de vos [tests Browser][1].
* `synthetics.http.*` proviennent de vos [tests API HTTP][2].
* `synthetics.ssl.*` proviennent de vos [tests API SSL][3].
* `synthetics.tcp.*` proviennent de vos [tests API TCP][4].
* `synthetics.dns.*` proviennent de vos [tests API DNS][5].

{{< get-metrics-from-git "synthetics" >}}

[1]: /fr/synthetics/browser_tests/
[2]: /fr/synthetics/api_tests/?tab=httptest
[3]: /fr/synthetics/api_tests/?tab=ssltest
[4]: /fr/synthetics/api_tests/?tab=tcptest
[5]: /fr/synthetics/api_tests/?tab=dnstest