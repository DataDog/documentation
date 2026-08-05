---
aliases:
- /es/synthetics/metrics/
description: Estas métricas se generan mediante tests de monitorización Synthetic.
further_reading:
- link: /synthetics/guide/api_test_timing_variations/
  tag: Documentación
  text: Más información sobre los tiempos y las variaciones de los tests de API
- link: /synthetics/guide/using-synthetic-metrics/
  tag: Documentación
  text: Más información sobre el uso de métricas Synthetic en los monitores
- link: /continuous_testing/settings
  tag: Documentación
  text: Más información sobre la paralelización de los tests continuos
title: Monitorización y métricas de tests continuos de Synthetic
---

## Información general

Las siguientes métricas son generadas por los tests de monitorización Synthetic y los parámetros de tests continuos.

Métricas que empiezan por:

* `synthetics.test_runs` proceden de todos tus tests Synthetic
* `datadog.estimated_usage.synthetics.*` devuelven datos de uso relevantes de tus tests Synthetic
* `synthetics.on_demand` devuelven datos de uso relevantes para [Tests continuos](#continuous-testing)

Métricas que empiezan por:

* `synthetics.api.*` proceden de tus [tests de API][1]
    * `synthetics.http.*` proceden de tus [tests HTTP][2] de API
    * `synthetics.ssl.*` proceden de tus [tests SSL][3] de API
    * `synthetics.dns.*` proceden de tus [tests DNS][4] de API
    * `synthetics.websocket.*` proceden de tus [tests WebSocket][5] de API
    * `synthetics.tcp.*` proceden de tus [tests TCP][6] de API 
    * `synthetics.udp.*` proceden de tus [tests UDP][7] de API
    * `synthetics.icmp.*` proceden de tus [tests ICMP][8] de API
* `synthetics.multi.*` proceden de tus [tests de API de varios pasos][9]
* `synthetics.browser.*` proceden de tus [tests de navegador][10]
* `synthetics.pl.*` proceden de tus [localizaciones privadas][11]

### Métricas generales

{{< get-metrics-from-git "synthetics" "synthetics.test_runs synthetics.test_run_steps datadog.estimated_usage.synthetics" >}}

### Tests de API

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

Para obtener más información sobre la duración de los tests de API, consulta la guía sobre [duración y variaciones de los tests de API][12].

### Tests de API de varios pasos

{{< get-metrics-from-git "synthetics" "synthetics.multi" >}}

### Tests de navegador

{{< get-metrics-from-git "synthetics" "synthetics.browser" >}}

### Localizaciones privadas

{{< get-metrics-from-git "synthetics" "synthetics.pl.worker" >}}

### Tests continuos

{{< get-metrics-from-git "synthetics" "synthetics.on_demand.concurrency" >}}

Para obtener más información sobre la paralelización, consulta [Parámetros de tests continuos][13].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/
[2]: /es/synthetics/api_tests/http_tests
[3]: /es/synthetics/api_tests/ssl_tests
[4]: /es/synthetics/api_tests/dns_tests
[5]: /es/synthetics/api_tests/websocket_tests
[6]: /es/synthetics/api_tests/tcp_tests
[7]: /es/synthetics/api_tests/udp_tests
[8]: /es/synthetics/api_tests/icmp_tests
[9]: /es/synthetics/multistep/
[10]: /es/synthetics/browser_tests/
[11]: /es/synthetics/private_locations/
[12]: /es/synthetics/guide/api_test_timing_variations/
[13]: /es/continuous_testing/settings/#parallelization