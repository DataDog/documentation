---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /es/service_management/workflows/limits
description: Límites de tasa para Workflow Automation
disable_toc: false
further_reading:
- link: /actions/workflows/build
  tag: Documentación
  text: Cree flujos de trabajo
title: Límites
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation está en versión preliminar en su sitio de Datadog seleccionado ({{< region-param key=dd_site_name >}}).</div>
{{< /site-region >}}

Esta página describe los límites de tasa y las limitaciones que se aplican a Workflow Automation.

## Límites a nivel de cuenta {#account-level-limits}

### Cuentas de pago {#paid-accounts}

Cada organización:

* Puede crear hasta 500 flujos de trabajo por minuto.
* Puede ejecutar hasta 200 flujos de trabajo por minuto.
* Puede ejecutar hasta 50 flujos de trabajo por minuto para una fuente (como un monitor específico).
* Puede almacenar en búfer hasta 500 solicitudes.

Cuando una organización supera un umbral, las solicitudes de ejecución pendientes se ponen en cola hasta un máximo de 500 por organización y luego se procesan de acuerdo con los límites descritos anteriormente. Por ejemplo, si un monitor activa 500 ejecuciones de flujo de trabajo, solo se activan 50 en el primer minuto. Las 450 ejecuciones de flujo de trabajo restantes se ponen en cola y se activan 50 flujos de trabajo cada minuto hasta que todos los flujos de trabajo se hayan activado.

### Cuentas de prueba {#trial-accounts}

Cada organización:

* Puede crear hasta 20 flujos de trabajo por minuto.
* Puede ejecutar hasta 50 flujos de trabajo por cada 20 minutos.
* Puede ejecutar hasta 20 flujos de trabajo por minuto para una fuente (como un monitor específico).
* Puede almacenar en búfer hasta 100 solicitudes.

Cuando una organización supera un umbral, las solicitudes de ejecución pendientes se ponen en cola hasta un máximo de 100 por organización y luego se procesan de acuerdo con los límites descritos anteriormente. Por ejemplo, si un monitor activa 100 ejecuciones de flujo de trabajo, solo 50 se activan en los primeros 20 minutos. Las 50 ejecuciones de flujo de trabajo restantes se ponen en cola y se activan después de que pasan 20 minutos.

## Límites a nivel de flujo de trabajo {#workflow-level-limits}

* Un flujo de trabajo puede contener hasta 150 pasos. Si necesita más de 150 pasos en un flujo de trabajo, puede usar la acción {{< ui >}}Trigger workflow{{< /ui >}} para [llamar a un flujo de trabajo secundario][2]. Utilice parámetros de salida para devolver la salida de un flujo de trabajo secundario a su flujo de trabajo principal.
* Un flujo de trabajo puede ejecutarse hasta por 7 días. Los flujos de trabajo terminan cuando intentan ejecutarse durante más de 7 días.
* Un flujo de trabajo puede iniciar hasta 60 pasos por minuto. Si excede esta tasa, los pasos se limitan y comienzan a una tasa de 60 por minuto.
* La suma de todas las salidas de pasos para un flujo de trabajo puede ser de hasta 150 MB.
* El tamaño de salida de un flujo de trabajo puede ser de hasta 5 MB.

## Límites de acción {#action-limits}

* La entrada de una acción puede ser de hasta 15 MB.
* La salida de una acción puede ser de hasta 15 MB.
* El JavaScript proporcionado por el usuario puede ser de hasta 10 KB.
* Cada organización puede ejecutar hasta 10,000 acciones de envío de correo electrónico por día. Si excede este límite, la acción falla con un mensaje de error.
* La acción [for loop][1] puede ejecutarse hasta por 2000 iteraciones. Si necesita más de 2000 iteraciones, puede dividir su entrada en conjuntos de 2000 y calcularlos en paralelo.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#workflows** en el [Datadog Community Slack][9].

[1]: /es/actions/workflows/actions/flow_control/#for-loop
[2]: /es/actions/workflows/trigger/#trigger-a-workflow-from-a-workflow
[9]: https://chat.datadoghq.com/