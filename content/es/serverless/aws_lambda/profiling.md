---
further_reading:
- link: /profiler/
  tag: Documentación
  text: Continuous Profiler
- link: /serverless/distributed_tracing
  tag: Documentación
  text: Rastreo distribuido para AWS Lambda
title: Continuous Profiler para AWS Lambda
---

{{< img src="serverless/lambda/profiling_hero.png" alt="Continuous Profiling para AWS Lambda" style="width:100%;" >}}

[Continuous Profiler][1] de Datadog para las funciones de AWS Lambda te permite saber el nombre del método, el nombre de la clase y el número de línea exactos de tu código de Lambda que provoca cuellos de botella en la CPU o en la E/S.

<div class="alert alert-warning">
Continuous Profiler para AWS Lambda está en la beta pública. Durante el periodo beta, la creación de perfiles para Node y Python está disponible sin coste adicional.
</div>

## Uso

Para habilitar la creación de perfiles, haz lo siguiente:

1. Asegúrate de haber [instalado la biblioteca de rastreo asociada][2] en tu función de Lambda.
2. Define la variable de entorno `DD_PROFILING_ENABLED` como `true`.

Los datos estarán disponibles tras un mínimo de 60 segundos de ejecución de la función de Lambda.

El generador de perfiles crea un subproceso que se activa periódicamente y toma una snapshot de la CPU y el montículo del código en ejecución. Esto incluye el propio generador de perfiles. Si quieres que el generador de perfiles se ignore a sí mismo, define `DD_PROFILING_IGNORE_PROFILER` como `true`.


### Compatibilidad

Dependiendo del tiempo de ejecución que utilices, esta característica requerirá las siguientes versiones del rastreador y la capa:

| Tiempo de ejecución | Versión mínima del rastreador | Versión de mínima de la capa |
| ------- | ---------------------- | --------------------- |
| Python | 1.4.0 | 62 |
| Node.js | 2.22.1, 3.9.0 | 87 |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/profiler/
[2]: /es/serverless/installation