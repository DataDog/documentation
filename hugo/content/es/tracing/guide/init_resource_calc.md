---
description: Descubre cómo Datadog Agent v7.60+ gestiona automáticamente la asignación
  de recursos para los contenedores init que configuran el rastreo, garantizando un
  arranque fiable del rastreador sin afectar a la programación del pod.
disable_toc: false
title: Uso de recursos del contenedor Init
---

### Información general

A partir del Agent [v7.60+][1], Datadog utiliza el cálculo dinámico de recursos para los contenedores init que inyectan bibliotecas de rastreo. En lugar de utilizar valores fijos, los contenedores init solicitan temporalmente toda la CPU y memoria disponibles para el pod, sin afectar a cómo se programa el pod. (Antes de v7.60, los contenedores init utilizaban valores por defecto conservadores: `50m` para CPU y `20Mi` para memoria).

Este comportamiento mejora la fiabilidad del inicio del rastreador al tiempo que respeta las reglas de programación de Kubernetes. Dado que los contenedores de inicio se ejecutan secuencialmente y salen antes de que se inicien los contenedores de aplicación, no compiten por los recursos de tiempo de ejecución.

### Programación del pod

Kubernetes programa pods utilizando una fórmula que tiene en cuenta los contenedores init:

<div style="text-align:center">
<pre><code>
Solicitud efectiva de CPU/Memoria =
  max(suma de solicitudes de todos los contenedores regulares,
      solicitud máxima de cualquier contenedor init)
</code></pre>
</div>

Dado que los contenedores init se ejecutan antes que los contenedores de aplicación (y no se solapan con ellos), pueden utilizar temporalmente más recursos sin aumentar la solicitud efectiva de pod. Esto funciona siempre que ningún contenedor init solicite más recursos de los que el pod pueda tolerar.

### Anular el comportamiento por defecto

Si es necesario, puedes anular el uso predeterminado de recursos del contenedor init estableciendo las siguientes variables de entorno en la configuración del Cluster Agent:
  - `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_CPU`
  - `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_MEMORY`

[1]: https://github.com/DataDog/datadog-agent/blob/40f0be0645ae309a07031bd7954fd58a8eb79853/pkg/clusteragent/admission/mutate/autoinstrumentation/auto_instrumentation.go#L611-L626