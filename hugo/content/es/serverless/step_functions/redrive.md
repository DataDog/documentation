---
further_reading:
- link: https://docs.aws.amazon.com/step-functions/latest/dg/redrive-executions.html
  tag: Guía del desarrollador de AWS
  text: Reiniciar ejecuciones de máquinas de estado mediante la recuperación de fallos
    en Step Functions
- link: /service_management/app_builder/
  tag: Documentación
  text: Datadog App Builder
title: Recuperación de fallos de ejecuciones en AWS Step Functions
---

Esta página explica cómo [recuperar de fallos][1] las ejecuciones directamente desde Datadog, para continuar con las AWS Step Functions fallidas desde el punto de fallo sin necesidad de reiniciar la máquina de estados.

{{< img src="serverless/step_functions/redrive.png" alt="Visualización de la ejecución de una Step Function fallida." style="width:100%;" >}}

## Activar la recuperación de fallos en Datadog
Para habilitar el uso de la recuperación de fallos en Datadog, configura una [conexión AWS][3] con [Datadog App Builder][4]. Asegúrate de que tus roles IAM incluyen permisos que permiten ejecutar una Step Function para la acción de reintento (`StartExecution`) o recuperar una Step Function de un fallo para la acción de recuperación de fallos (`RedriveExecution`).

## Uso
Para actuar sobre una Step Function en Datadog: 
1. Ve a la página de [Step Functions][2]. 
2. Busca la Step Function que quieres recuperar de fallos.
3. Abre el panel lateral de esta Step Function. En la pestaña **Ejecuciones**, localiza la ejecución fallida que quieres recuperar de un fallo.
4. Haz clic en la píldora **Failed** (Fallido) para abrir un modal de recuperación de un fallo.
5. Haz clic en el botón **Redrive** (Recuperar de un fallo).

## Rastreo de recuperaciones de fallos
Al monitorizar ejecuciones recuperadas de fallos, utiliza la vista de cascada, ya que la gran brecha entre la ejecución original y la recuperación de un fallo puede hacer que la vista de gráfico de llamas sea imperceptible.

### Solucionar problemas de trazas (traces) de recuperación de fallos faltantes
Una recuperación de un fallo puede no compartir siempre la misma decisión de muestreo que la ejecución original. Para asegurarte de que la ejecución recuperada de fallos también se muestrea, puedes citar la etiqueta (tag) de tramo (span) `@redrive:true` en una consulta de retención.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/step-functions/latest/dg/redrive-executions.html
[2]: https://app.datadoghq.com/functions?cloud=aws&entity_view=step_functions
[3]: https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html
[4]: /es/service_management/app_builder/