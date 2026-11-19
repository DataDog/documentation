---
description: Active flujos de trabajo automatizados directamente desde los Dashboards
  para resolver problemas y mantener la salud del sistema rápidamente.
disable_toc: false
further_reading:
- link: /actions/workflows/
  tag: Documentación
  text: Workflow Automation
title: Widget Run Workflow
widget_type: run_workflow
---
## Descripción general {#overview}

El widget Run Workflow le permite automatizar tareas críticas desde los Dashboards. Active sus flujos de trabajo desde un Dashboard en el momento en que detecte un problema que afecte la salud de su sistema. Esto mantiene sus sistemas en funcionamiento al mejorar el tiempo de resolución y reducir la posibilidad de errores.

## Configuración {#configuration}

1. En {{< ui >}}Select the workflow{{< /ui >}}, busque su flujo de trabajo en el menú desplegable.
1. Asigne las variables de plantilla del Dashboard a los parámetros de entrada del flujo de trabajo. Esto permite que los valores de las variables de plantilla de su Dashboard se asignen directamente a los parámetros de entrada cuando ejecuta el flujo de trabajo.
1. Ingrese un título para el widget y haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="dashboards/widgets/trigger-from-dashboard2.png" alt="Haga clic en Run Workflow para activar un flujo de trabajo desde el widget Dashboard." >}}

Para ejecutar el flujo de trabajo:
1. Haga clic en {{< ui >}}Run Workflow{{< /ui >}} en el widget de su Dashboard.
1. En {{< ui >}}Run parameters{{< /ui >}}, cualquier variable de plantilla que haya asignado a las entradas del flujo de trabajo se completa automáticamente. Ingrese los valores para cualquier parámetro de ejecución no asignado, o edite los valores existentes si es necesario.
1. Haga clic en {{< ui >}}Run{{< /ui >}} para ejecutar el flujo de trabajo.

## API {#api}

Este widget se puede utilizar con la **[Dashboards API][1]**. Consulte la siguiente tabla para ver la [definición del esquema JSON del widget][2]:

{{< dashboards-widgets-api >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dashboards/
[2]: /es/dashboards/graphing_json/widget_json/