---
aliases:
- /es/mobile_testing/mobile_app_tests/results
description: Consulta los resultados de los tests de aplicaciones móviles Synthetic
  y compara las ejecuciones de tests aprobadas y fallidas.
further_reading:
- link: /mobile_app_testing/mobile_app_tests/
  tag: Documentación
  text: Más información sobre tests móviles Synthetic
- link: /service_management/events/explorer
  tag: Documentación
  text: Información sobre el explorador de eventos
title: Resultados de tests de aplicaciones móviles
---

{{< site-region region="us,us5,eu" >}}
<div class="alert alert-warning">Los tests de aplicaciones móviles están disponibles de forma general para los sitios US1, US5 y EU.</div>
{{< /site-region >}}

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">Este sitio no admite tests de aplicaciones móviles.</div>
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Este sitio no admite tests de aplicaciones móviles.</div>
{{< /site-region >}}

## Información general

Haz clic en un test de aplicación móvil en la página [**Tests Synthetic**][11] para ver la página Detalles del test. Esta página contiene toda la información relativa al test, incluyendo propiedades del test, historial de tests, ejemplos de ejecuciones y ejecuciones de tests.

{{< img src="mobile_app_testing/test_details.png" alt="Página Detalles del test" style="width=80%" >}}

Las ejecuciones de tests aparecen en una página de detalles de los tests, luego de la ejecución de un test de aplicación móvil Synthetic. Los [ejemplos de resultados](#sample-results) se correlacionan con las últimas ejecuciones de tests aprobadas y fallidas, en un intervalo de tiempo, y en un número específico de localizaciones y dispositivos.

## Propiedades de test

En la sección **Propiedades**, puedes ver el ID del test, las fechas de creación y edición del test, la prioridad del test, la etiqueta (tag) del entorno y otras etiquetas adicionales.

**Información general
: En esta sección se describen los detalles de los tests Synthetic, incluida la aplicación móvil, la versión, la localización, el número de dispositivos, el intervalo de test y el número de pasos del test.

**Monitor 
: Esta sección contiene el nombre del [monitor de tests Synthetic][1] y el mensaje de notificación configurado.

**Ejecución CI/CD
: Esta sección contiene un menú desplegable para cambiar la [regla de ejecución][2] de este test que se ejecuta como parte de un [pipeline CI][3].

## Historia del Test

En la sección **Historial**, puedes ver el gráfico **Tiempo de actividad global**, que muestra el tiempo de actividad total de todas las localizaciones de tests en un intervalo de tiempo determinado. El tiempo de actividad total tiene en cuenta las [condiciones de alerta][4] configuradas para un test.

{{< img src="mobile_app_testing/history.png" alt="El gráfico Historial muestra el tiempo de actividad total" style="width=80%" >}}

## Resultados de Muestra

Las ejecuciones de tests de aplicaciones móviles incluyen componentes como [capturas de pantalla](#screenshots-and-actions) para ayudarte a corregir los [fallos de tests](#failed-results).

En la sección de **Ejecuciones de Muestra**, se pueden analizar las ejecuciones de tests más recientes y compararlos con ejecuciones de tests recientes que han tenido éxito.

### Atributos de información general

Estado
: El estado de tu ejecución de test (`PASSED` o `FAILED`).

URL de inicio
: La URL del escenario de test de la aplicación móvil.

Pasos
: El número de [pasos de test][10] finalizados en tu ejemplo de ejecución.

Duración
: El tiempo que tardó la ejecución del test.

Localización
: La localización [gestionada][8] o [privada][9] desde la que se ejecutó el test.

Dispositivo
: El tipo de dispositivo desde el que se ejecutó el test.

Tipo de ejecución
: El tipo de ejecución del test (CI, activada manualmente o programada).

### Capturas de pantalla y acciones

Cada paso de test ejecutado contiene una captura de pantalla de la acción del paso, del nombre de la acción del paso, del ID del paso y de la duración del paso.

{{< img src="mobile_app_testing/screenshot-and-action.png" alt="Capturas de pantalla y acciones en la sección Ejemplos de ejecuciones de detalles del test" style="width=80%" >}}

## Resultados fallados

Un resultado de test se considera `FAILED` si no satisface sus aserciones o si uno de los pasos falla por otro motivo. Puedes solucionar las ejecuciones fallidas observando sus capturas de pantalla, comprobando posibles errores a nivel de los pasos y examinando los recursos generados por sus pasos.

Entre los errores más comunes en los tests de aplicaciones móviles se incluyen:

`Element located but it's invisible`
: El elemento está en la página pero no se puede hacer clic en él, por ejemplo, si hay otro elemento superpuesto.

`Cannot locate element`
: El elemento no se encuentra en el XML.

## Eventos de Test

Las alertas de tus monitores de tests Synthetic aparecen en la pestaña **Eventos**, en **Ejecuciones de tests**. Para buscar alertas de tests Synthetic en el Explorador de eventos, ve a [**Events** > **Explorer** (Eventos > Explorador)][7] e introduce `@evt.type:synthetics_alert` en la consulta de búsqueda. Para obtener más información, consulta [Uso de monitores de tests Synthetic][1].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/guide/synthetic-test-monitors/
[2]: /es/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[3]: /es/continuous_testing/cicd_integrations
[4]: /es/mobile_app_testing/mobile_app_tests/#scheduling-and-alert
[5]: /es/synthetics/guide/uptime-percentage-widget/
[6]: /es/help
[7]: https://app.datadoghq.com/event/explorer
[8]: /es/getting_started/synthetics/browser_test#select-locations
[9]: /es/synthetics/private_locations
[10]: /es/mobile_app_testing/mobile_app_tests/steps
[11]: https://app.datadoghq.com/synthetics/tests