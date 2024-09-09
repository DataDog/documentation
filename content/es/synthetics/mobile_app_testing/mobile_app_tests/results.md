---
aliases:
- /es/mobile_testing/mobile_app_tests/results
- /es/mobile_app_testing/mobile_app_tests/results
description: Consulta los resultados de los tests de aplicaciones móviles Synthetic
  y compara las ejecuciones de tests de ejemplo superadas o fallidas.
further_reading:
- link: /synthetics/mobile_app_testing/mobile_app_tests/
  tag: Documentación
  text: Más información sobre los tests móviles Synthetic
- link: /service_management/events/explorer
  tag: Documentación
  text: Información sobre el explorador de eventos
title: Resultados de tests de aplicaciones móviles
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Este sitio no admite tests de aplicaciones móviles.</div>
{{< /site-region >}}

## Información general

Haz clic en un test de aplicación móvil en la [página **Tests Synthetic**][11] para ver la página Detalles del test. Esta página contiene toda la información relativa al test, incluidas las propiedades del test, el historial de tests, las ejecuciones de ejemplo y las ejecuciones de tests.

{{< img src="mobile_app_testing/test_details.png" alt="Página Detalles del test" style="width=80%" >}}

Las ejecuciones de tests aparecen en una página de detalles de tests después de que se ejecuta un test de aplicación móvil Synthetic. Los [resultados de ejemplo](#sample-results) se correlacionan con las últimas ejecuciones de tests superadas y fallidas en un intervalo de tiempo y en un número específico de localizaciones y dispositivos.

## Propiedades de los tests

En la sección **Propiedades**, puedes ver el ID del test, las fechas de creación y edición del test, la prioridad del test, la etiqueta (tag) del entorno y las etiquetas adicionales.

**Información general**
: En esta sección se describen los detalles del test Synthetic, incluida la aplicación móvil, la versión, la localización, el número de dispositivos, el intervalo del test y el número de pasos del test.

**Monitor**
: Esta sección contiene el nombre del [monitor de tests Synthetic][1] y el mensaje de notificación configurado.

**Ejecución de CI/CD**
: Esta sección contiene un menú desplegable para cambiar la [regla de ejecución][2] de este test que se ejecuta como parte de un [pipeline CI][3].

## Historial de tests

En la sección **Historial**, puedes ver el gráfico **Tiempo de actividad global**, que muestra el tiempo de actividad total de todas las localizaciones de tests en un intervalo de tiempo determinado. El tiempo de actividad global tiene en cuenta las [condiciones de alerta][4] configuradas para un test.

{{< img src="mobile_app_testing/history.png" alt="Gráfico del historial que muestra el tiempo de actividad global" style="width=80%" >}}

## Resultados de ejemplo

Las ejecuciones de tests de aplicaciones móviles incluyen componentes como [capturas de pantalla](#screenshots-and-actions) para ayudar a solucionar tus [tests fallidos](#failed-results).

En la sección **Ejecuciones de ejemplo**, se pueden analizar las ejecuciones de tests fallidas más recientes y compararlas con ejecuciones de tests recientes superadas.

### Atributos de información general

Estado
: El estado de tu ejecución de test (`PASSED` o `FAILED`).

URL de inicio
: La URL del escenario de test de la aplicación móvil.

Pasos
: El número de [pasos de test][10] completados en la ejecución de ejemplo.

Duración
: El tiempo que ha tardado la ejecución del test.

Localización
: La localización [gestionada][8] o [privada][9] desde la que se ha ejecutado el test.

Dispositivo
: El tipo de dispositivo desde el que se ha ejecutado el test.

Tipo de ejecución
: Tipo de ejecución del test (CI, activada manualmente o programada).

Registros
: Descarga los logs de dispositivo que se han capturado para tus ejecuciones de tests para ayudar en la depuración.

### Capturas de pantalla y acciones

Cada paso de test ejecutado contiene una captura de pantalla de la acción del paso, el nombre de la acción del paso, el ID del paso y la duración del paso.

{{< img src="mobile_app_testing/screenshot-and-action.png" alt="Capturas de pantalla y acciones en la sección Ejecuciones de ejemplo de detalles del test" style="width=80%" >}}

### Resaltado XML 

Los resultados de los pasos contienen la representación XML de la pantalla que se está probando, así como la posibilidad de pasar el cursor sobre la captura de pantalla o del XML para resaltar elementos específicos de la aplicación. 
Haz clic en un elemento para ver atributos adicionales:

{{< img src="mobile_app_testing/xml_inspector.png" alt="Captura de pantalla del resultado de un test en la sección Ejecuciones de ejemplo, que muestra el inspector XML" style="width=80%" >}}

## Informes de fallos

Consulta y descarga los informes de fallos de tus dispositivos iOS y Android en el [Explorador de resultados][12].

{{< tabs >}}
{{% tab "iOS" %}}

En el Explorador de resultados, filtra y busca los informes de fallos con la consulta `@checkType:mobile @result.result.error:"Your application has crashed during the test." @result.result.device.platform.name:ios` para identificar, visualizar y descargar informes de fallos para tus dispositivos iOS:

{{< img src="mobile_app_testing/ios_search.png" alt="Captura de pantalla del Explorador de resultados utilizando el filtro y la búsqueda para encontrar resultados de fallos iOS" style="width=80%" >}}

Selecciona un test fallido y descarga el informe del fallo:

{{< img src="mobile_app_testing/ios_crash_report.png" alt="Captura de pantalla de un resultado de test donde se resalta la capacidad de descargar el informe de fallo iOS" style="width=80%" >}}

{{% /tab %}}
{{% tab "Android" %}}

En el Explorador de resultados, filtra y busca los informes de fallos con la consulta `@checkType:mobile @result.result.error:"Your application has crashed during the test." @result.result.device.platform.name:android` para identificar, visualizar y descargar informes de fallos para tus dispositivos Android:

{{< img src="mobile_app_testing/android_search.png" alt="Captura de pantalla del Explorador de resultados utilizando el filtro y la búsqueda para encontrar resultados de fallos Android" style="width=80%" >}}

Selecciona un test fallido y descarga el informe del fallo:

{{< img src="mobile_app_testing/andriod_crash_report.png" alt="Captura de pantalla de un resultado de test donde se resalta la capacidad de descargar el informe de fallo Android" style="width=80%" >}}

{{% /tab %}}
{{< /tabs >}}

## Resultados fallidos

El resultado de un test se considera `FAILED` si no cumple las aserciones o si el paso ha fallado por alguna otra razón. Se pueden solucionar problemas de ejecuciones fallidas inspeccionando sus capturas de pantallas, buscando errores potenciales a nivel de los pasos y examinando los recursos generados por los pasos.

Entre los errores más comunes en los tests de aplicaciones móviles se incluyen:

`Element located but it's invisible`
: El elemento está en la página pero no se puede hacer clic en él, por ejemplo, si hay otro elemento superpuesto.

`Cannot locate element`
: El elemento no se encuentra en el XML.

## Eventos de tests

Las alertas de los monitores de tests Synthetic aparecen en la pestaña **Eventos** debajo de **Ejecuciones de tests**. Para realizar una búsqueda de alertas de tests Synthetic en el Explorador de eventos, ve a [**Eventos** > **Explorador**][7] e introduce `@evt.type:synthetics_alert` en la consulta de búsqueda. Para obtener más información, consulta [Uso de monitores de tests Synthetic][1].

## Referencias adicionales

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
[12]: https://app.datadoghq.com/synthetics/explorer