---
further_reading:
- link: synthetics/browser_tests
  tag: Documentación
  text: Configurar un test de navegador
- link: /synthetics/api_tests/http_tests
  tag: Documentación
  text: Configurar un test de HTTP
title: Evita los problemas de caché en los tests de Sintético
---

## Información general

En esta guía se describe cómo evitar los problemas de almacenamiento en caché al utilizar los tests de Sintético.

## Tests de API

### Tests de HTTP

Puedes aprovechar las [variables locales][1] para generar una cadena aleatoria y enviarla con tu carga útil para asegurarte de que tus [tests HTTP][2] no utilicen tus sistemas de almacenamiento en caché.

## Tests de navegador

Los navegadores se eliminan después de cada ejecución del test, lo que garantiza que tus tests de navegador no tengan problemas relacionados con la caché en el lado del cliente.

## Referencias adiionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/http_tests?tab=requestoptions#create-local-variables
[2]: /es/synthetics/api_tests/http_tests