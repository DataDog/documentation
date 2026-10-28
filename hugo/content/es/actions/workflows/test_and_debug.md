---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /es/service_management/workflows/test_and_debug
description: Pruebe los activadores de monitor, los pasos individuales del flujo de
  trabajo y depure los pasos fallidos mediante el historial de ejecución y los mensajes
  de error.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Introducción a Workflow Automation
- link: /actions/workflows/build
  tag: Documentación
  text: Crear flujos de trabajo
- link: /actions/workflows/trigger
  tag: Documentación
  text: Activar flujos de trabajo
title: Probar y depurar
---
## Probar un activador de monitor {#test-a-monitor-trigger}

Puede probar un activador de monitor durante la creación del flujo de trabajo. Probar un monitor genera un fragmento que puede pegar en la ventana de notificación de su monitor para activar el flujo de trabajo.

Para probar un activador de monitor:
1. Seleccione la acción del activador de monitor en su flujo de trabajo.
1. Haga clic en {{< ui >}}Test from Monitor{{< /ui >}}.
1. Si su monitor pasa entradas al flujo de trabajo, ingrese un valor de prueba en {{< ui >}}Workflow Inputs{{< /ui >}}.
1. Seleccione un monitor para probar.
1. Seleccione un estado de monitor.
1. Haga clic en {{< ui >}}Run From Monitor{{< /ui >}}.


## Probar un paso {#test-a-step}

Para asegurarse de que un paso funcione como desea sin tener que ejecutar todo el flujo de trabajo, puede probar el paso de forma independiente.

Para probar un paso de flujo de trabajo:
1. Haga clic en {{< ui >}}Test{{< /ui >}} en la sección {{< ui >}}Inputs{{< /ui >}} del paso.
1. Opcionalmente, ajuste la configuración del paso. Si su paso utiliza variables de salida de un paso anterior, ingrese algunos datos de prueba codificados para que el paso los utilice.
1. Haga clic en {{< ui >}}Test{{< /ui >}} para probar la acción.
1. Cuando termine de probar el paso, haga clic en {{< ui >}}Use in configuration{{< /ui >}} para usar su nueva configuración en el flujo de trabajo, o cierre la pantalla para regresar al flujo de trabajo sin guardar su configuración de prueba.

La prueba no está disponible para acciones de ramificación y lógica. Para probar una función de JavaScript o una acción de expresión que utilice variables de salida de un paso anterior, comente las variables en su código y reemplácelas con datos de prueba. Para obtener más información, consulte [Probar expresiones y funciones][6].


## Depurar un paso fallido {#debug-a-failed-step}

Puede utilizar el {{< ui >}}Run History{{< /ui >}} de un flujo de trabajo para depurar un paso fallido. Haga clic en {{< ui >}}Configuration{{< /ui >}} o {{< ui >}}Run History{{< /ui >}} en la parte superior izquierda para cambiar entre las vistas de configuración y de historial de ejecución.

Al hacer clic en un paso fallido, obtendrá las entradas, salidas y el contexto de ejecución del paso, así como el mensaje de error asociado. El ejemplo a continuación muestra un _paso de estado de solicitud de extracción de GitHub_ fallido. El mensaje de error muestra que el paso falló debido a la falta de permisos:

{{< img src="actions/workflows/test_and_debug/failed-step4.png" alt="Un flujo de trabajo con un paso fallido." >}}

El historial de ejecución inicial de un flujo de trabajo proporciona un panel con la lista de ejecuciones anteriores y si cada ejecución tuvo éxito o falló. Las fallas incluyen un enlace al paso del flujo de trabajo fallido. Haga clic en una ejecución de flujo de trabajo en la lista para inspeccionarla. Puede volver al historial de ejecución inicial en cualquier momento haciendo clic en cualquier parte del lienzo del flujo de trabajo.


## Corrija un paso fallido con IA {#fix-a-failed-step-with-ai}

En {{< ui >}}Run History{{< /ui >}}, seleccione un paso fallido y abra su pestaña {{< ui >}}Outputs{{< /ui >}}. Junto al mensaje de error, haga clic en {{< ui >}}Fix with AI{{< /ui >}} para obtener ayuda para resolver la falla.

{{< img src="actions/workflows/test_and_debug/fix-with-ai.png" alt="Bits Chat diagnostica y propone una solución para un paso de flujo de trabajo fallido." >}}

El asistente se abre en [Bits Chat][7], diagnostica el error utilizando las entradas, salidas, el contexto de ejecución y el mensaje de error del paso, y puede buscar en la documentación externa errores devueltos por API de terceros. Explica el problema y propone una solución, luego le pide que confirme antes de aplicar cualquier cambio. Después de que usted confirme, el asistente actualiza la configuración del paso y vuelve a ejecutar la validación.

Las correcciones con IA se aplican a problemas en la configuración del flujo de trabajo, como entradas incorrectas o una configuración de la acción desactualizada. Para fallos causados por factores externos, como credenciales no válidas, límites de tasa o una interrupción en un servicio conectado, el asistente explica la causa raíz y sugiere los siguientes pasos, como verificar sus credenciales o comunicarse con el propietario del servicio conectado.

Si el paso fallido activa otro flujo de trabajo, Bits Chat puede rastrear la falla hasta el flujo de trabajo activado para diagnosticar y proponer una solución allí también.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#workflows** en el [Datadog Community Slack][10].

[6]: /es/actions/workflows/expressions/
[7]: /es/bits_ai/bits_chat/
[10]: https://chat.datadoghq.com/