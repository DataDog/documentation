---
disable_toc: false
further_reading:
- link: /service_management/workflows/
  tag: Documentación
  text: Automatización del flujo de trabajo
title: Widget Run Workflow
widget_type: run_workflow
---

## Información general

El widget Run Workflow te permite automatizar tareas críticas desde dashboards. Activa tus flujos de trabajo desde un dashboard en el momento en que tengas conocimiento de un problema que afecte a la salud de tu sistema. Esto mantiene tus sistemas en funcionamiento, mejora el tiempo de resolución y reduce la posibilidad de errores.

## Configuración

1. En **Select the workflow** (Seleccionar el flujo de trabajo), busca tu flujo de trabajo en el menú desplegable.
1. Asigna variables de plantilla de dashboard  a los parámetros de entrada del flujo de trabajo. Esto permite que los valores de tus variables de plantilla de dashboard se asignen directamente a los parámetros de entrada al ejecutar el flujo de trabajo.
1. Introduce un título para el widget y haz clic en **Save** (Guardar).

{{< img src="service_management/workflows/trigger-from-dashboard2.png" alt="Haz clic en Run Workflow para activar un flujo de trabajo desde el widget Dashboard." >}}

Para ejecutar el flujo de trabajo:
1. Haz clic en **Run Workflow** en tu widget de dashboard.
1. En **Execution parameters** (Parámetros de ejecución), cualquier variable de plantilla que hayas asignado a las entradas del flujo de trabajo se rellena automáticamente. Introduce los valores de los parámetros de ejecución no asignados o edita los valores existentes si es necesario.
1. Haz clic en **Run** (Ejecutar) para ejecutar el flujo de trabajo.

## API

Este widget puede utilizarse con la **[Dashboards API (API de dashboards)][1]**. Ve la siguiente tabla para la [widget JSON schema definition (definición de esquema de JSON de widget)][2]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dashboards/
[2]: /es/dashboards/graphing_json/widget_json/