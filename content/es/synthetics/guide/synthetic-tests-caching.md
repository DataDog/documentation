---
further_reading:
- link: synthetics/browser_tests
  tag: Documentación
  text: Configurar un test de navegador
- link: /synthetics/api_tests/http_tests
  tag: Documentación
  text: Configurar un test de HTTP
title: Prevenir problemas con la caché en los tests de Synthetics
---

## Tests de navegador

El navegador se cierra cada vez que se termina de ejecutar un test para que los test de navegador no se vean afectados por problemas con el almacenamiento en caché en el cliente.

## Tests de API

### Tests de HTTP

Puedes usar [variables locales][1] para generar una cadena aleatoria que se envíe con la carga útil y que en los [tests de HTTP][2] no se utilicen tus sistemas de almacenamiento en caché.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/http_tests?tab=requestoptions#create-local-variables
[2]: /es/synthetics/api_tests/http_tests