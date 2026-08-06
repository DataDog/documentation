---
aliases:
- /es/synthetics/cicd_integrations/troubleshooting
description: Descubre los conceptos de Continuous Testing y CI/CD, y soluciona los
  errores más comunes.
further_reading:
- link: /synthetics/cicd_integrations/configuration
  tag: Documentación
  text: Más información sobre la configuración de Continuous Testing y CI/CD
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: Blog
  text: Prácticas recomendadas para realizar tests continuos con Datadog
title: Resolución de problemas de Continuous Testing y CI/CD
---

## Información general

Esta página proporciona información para ayudarte a para solucionar problemas de Continuous Testing y CI/CD. Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][1].

## Terminología

Lote CI 
: El grupo de tests de Continuous Testing activados a través de una integración continua, un pipeline de entrega continua (CI/CD) o la [API de monitorización Synthetic de Datadog][2].

Ejecución de test
: Una única ejecución de un test de Continuous Testing, que puede ser un test de [API][7] o de [navegador][8]. Si ya configuraste reintentos, estos cuentan como ejecuciones de tests individuales. Por ejemplo, un test con dos reintentos puede tener hasta tres ejecuciones de tests asociadas.

Test paralelo
: Un test de Continuous Testing que se ejecuta al mismo tiempo que otro test de Continuous Testing en tu pipeline CI/CD. Para definir la cantidad de tests que quieres ejecutar en paralelo, configura la paralelización en la [página de configuración de Continuous Testing][9].

Tiempo de espera de lote
: El tiempo de espera de un lote ocurre cuando tu lote no se completa en un tiempo razonable, según el [tiempo de espera de sondeo][3] definido en tu archivo de configuración. 

Regla de ejecución
: Una [regla de ejecución][4] define el impacto de un test fallido en un pipeline CI/CD de mayor a menor impacto: `skipped` `non_blocking` y `blocking`. Estas opciones son consideradas y por defecto prevalece la de mayor impacto. Si tu test está configurado como `skipped` en la interfaz de usuario y como `blocking` en el archivo de configuración, se omitirá durante la ejecución del test. </br><br> Puedes definir la regla de ejecución en las propiedades de tus tests, en el archivo global de configuración o en el archivo de anulación de un test individual.

## Explorador de resultados

### Los metadatos CI no aparecen

Comprueba si estás utilizando endpoints de API para activar tus ejecuciones de tests de CI/CD. Para rellenar el Explorador de resultados de monitorización Synthetic y Continuous Testing con metadatos CI, debes utilizar una de las [integraciones nativas][5] de Datadog o el [paquete NPM][6].

## Dentro de tu pipeline CI/CD

### Mis tests están alcanzando el límite de tiempo en mi pipeline CI

Lo primero que hay que comprobar es qué marcadores de modo de fallo estás pasando en tu [archivo de configuración global][3]. Para las ejecuciones de CI que contienen varios tests, algunos tests se ponen en cola según la configuración de paralelización definida en la [página de configuración de Continuous Testing[9]. Puede que necesites adaptar tanto tu configuración como la paralelización en función de las necesidades de tu organización.

## Monitores Synthetic

El CI no activa los monitores Synthetics ni los incorpora a las evaluaciones de monitor. Sin embargo, las ejecuciones fallidas harán que el CI muestre un estado rojo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[3]: /es/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
[4]: /es/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[5]: /es/continuous_testing/cicd_integrations
[6]: /es/continuous_testing/cicd_integrations#use-the-cli
[7]: /es/synthetics/api_tests/
[8]: /es/synthetics/browser_tests/?tab=requestoptions
[9]: /es/continuous_testing/settings