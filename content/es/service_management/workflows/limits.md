---
algolia:
  tags:
  - flujo de trabajo
  - rastreo
  - automatización del flujo de trabajo
description: Límites de velocidad para Workflow Automation
disable_toc: false
further_reading:
- link: /service_management/workflows/build
  tag: Documentación
  text: Crear flujos de trabajo
title: Límites
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La automatización de los flujos de trabajo no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

En esta página se describen los límites de velocidad y de frecuencia que se aplican a Workflow Automation.

## Límites a nivel de cuenta

### Cuentas de pago

Cada organización:

* Puede crear hasta 500 flujos de trabajo por minuto.
* Puede ejecutar hasta 200 flujos de trabajo por minuto.
* Puede ejecutar hasta 50 flujos de trabajo por minuto para una fuente (como un monitor específico).
* Puede almacenar en buffer hasta 500 solicitudes.

Cuando una organización supera un umbral, las solicitudes de ejecución pendientes se ponen en cola, hasta un máximo de 500 por organización, y luego se procesan según los límites descritos anteriormente. Por ejemplo, si un monitor activa 500 ejecuciones de flujos de trabajo, sólo se activan 50 en el primer minuto. Las 450 ejecuciones de flujos de trabajo restantes se ponen en cola y se activan 50 flujos de trabajo cada minuto hasta que se hayan activado todos los flujos de trabajo.

### Cuentas de prueba

Cada organización:

* Puede crear hasta 20 flujos de trabajo por minuto.
* Puede ejecutar hasta 50 flujos de trabajo cada 20 minutos.
* Puede ejecutar hasta 20 flujos de trabajo por minuto para una fuente (como un monitor específico).
* Puede almacenar en buffer hasta 100 solicitudes.

Cuando una organización supera un umbral, las solicitudes de ejecución pendientes se ponen en cola, hasta un máximo de 100 por organización, y luego se procesan según los límites descritos anteriormente. Por ejemplo, si un monitor activa 100 ejecuciones de flujos de trabajo, sólo se activan 50 en los primeros 20 minuto. Las 50 ejecuciones de flujos de trabajo restantes se ponen en cola y se activan luego de 20 minutos.

## Límites a nivel de flujo de trabajo

* Un flujo de trabajo puede contener hasta 100 pasos. Si necesitas más de 100 pasos en un flujo de trabajo, puedes utilizar la acción **Activar flujo de trabajo** para [llamar a un flujo de trabajo secundario][2]. Utiliza parámetros de salida para devolver el resultado de un flujo de trabajo secundario a tu flujo de trabajo principal.
* Un flujo de trabajo puede ejecutarse durante un máximo de 7 días. Los flujos de trabajo finalizan cuando intentan ejecutarse por más de 7 días.
* Un flujo de trabajo puede iniciar hasta 30 pasos por minuto. Si se supera este índice, los pasos se limitan y se inician a un ritmo de 30 por minuto.
* La suma de todos los resultados de pasos de un flujo de trabajo puede alcanzar los 150 MB.
* El tamaño del resultado de un flujo de trabajo puede alcanzar los 500 KB.

## Límites de acción

* La entrada de una acción puede alcanzar los 15 MB.
* El resultado de una acción puede alcanzar los 15 MB.
* El JavaScript proporcionado por el usuario puede alcanzar los 10 KB.
* Cada organización puede ejecutar hasta 10.000 acciones de envío de correo electrónico al día. Si se supera este límite, la acción falla con un mensaje de error.
* La acción [para bucle][1] puede ejecutarse hasta por 2000 iteraciones. Si necesitas más de 2000 iteraciones, puedes dividir la entrada en conjuntos de 2000 y calcularlas en paralelo.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** en [Datadog Community Slack][9].

[1]: /es/service_management/workflows/actions/flow_control/#for-loop
[2]: /es/service_management/workflows/trigger/#trigger-a-workflow-from-a-workflow
[9]: https://datadoghq.slack.com/