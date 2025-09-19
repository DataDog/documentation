---
private: true
title: Instrumentación de un solo paso para la generación de perfiles
---

<div class="alert alert-info">La activación de la generación de perfiles utilizando la instrumentación de un solo paso está en Vista previa.</div>

## Información general

Asegúrate de tener conocimientos previos de la [instrumentación APM de un solo paso][1] (SSI) antes de continuar.

Se puede activar [Continuous Profiler][3] como parte de la configuración de SSI. Esta página muestra las instrucciones
para configurarlo.

## Sistemas operativos y entornos compatibles

SSI sólo es compatible con Linux, tanto para las arquitecturas `x86_64` como `arm64` (ARM v8). La versión Vista previa
de Continuous Profiler con SSI funciona para despliegues de hosts, contenedores y Kubernetes.

Continuous Profiler con SSI puede activarse para los siguientes lenguajes:

| Lenguaje           | Versión de librería del rastreador |
|--------------------|------------------------|
| Java               | v1.37.0 o posterior                |
| .NET (sólo x86_64) | v3.3.1 o posterior                 |
| Node.js            | v4.39.0 o posterior, v5.15.0 o posterior       |

Los despliegues Kubernetes requieren al menos la versión 7.57.0 del Datadog Agent. Los despliegues de hosts y contenedores pueden
utilizar las versiones 7.56.x del Datadog Agent.

## Habilitar Continuous Profiler con SSI

Continuous Profiler puede habilitarse como parte de la configuración de SSI siguiendo estos pasos:

{{< tabs >}}
{{% tab "Host y contenedor" %}}

1. Ve a la [página de instalación del Agent][2] y selecciona una de las plataformas Linux o Docker.
1. Activa el interruptor "Habilitar instrumentación APM". (Si no hay ningún interruptor, la plataforma no es compatible con SSI.) Activar el interruptor añade la variable de entorno `DD_APM_INSTRUMENTATION_ENABLED=` al comando de instalación, configurando el Agent instalado para inyectar la librería del rastreador en los procesos.
1. Copia el comando de instalación en un editor de texto.
1. Añade `DD_PROFILING_ENABLED=auto` como una variable de entorno adicional después de `DD_APM_INSTRUMENTATION_ENABLED` en el comando copiado. Esto activa el generador de perfiles automático para cualquier proceso nuevo que merezca la generación de un perfil.
1. Continúa con el resto de las instrucciones de instalación, utilizando el comando de instalación modificado.

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{% tab "Kubernetes con Helm Chart" %}}

1. Ve a la [página de instalación del Agent][2], selecciona Kubernetes y luego selecciona Helm Chart.
1. Abre el menú desplegable de APM y activa el interruptor Habilitar instrumentación APM.
1. Añade los siguientes valores a `datadog-values.yaml` además de aquellos indicados en la página de instalación. El parámetro `datadog.profiling.enabled: auto` activa la habilitación automática del generador de perfiles para cualquier proceso
nuevo que merezca la generación de un perfil.
1. Continúa con el resto de las instrucciones de instalación.

```
agents:
  image:
    tag: latest
clusterAgent:
  image:
    tag: latest
datadog:
  profiling:
    enabled: auto
```

Si ya dispones del Datadog Helm Chart, asegúrate de que está actualizado al menos a la versión 3.71.0.
Utiliza la etiqueta (tag) de la "última" imagen para instalar una versión reciente del Agent compatible con la generación de perfiles, ya que
el Datadog Helm Chart utiliza por defecto una versión más antigua del Agent.

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{% tab "Kubernetes con Datadog Operator" %}}

1. Ve a la [página de instalación del Agent][2], selecciona Kubernetes y luego selecciona Operator.
1. Abre el menú desplegable de APM y activa el interruptor Habilitar instrumentación APM.
1. Añade los siguientes valores a `datadog-values.yaml` además de aquellos indicados por la página de instalación. La variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_PROFILING_ENABLED=auto` en
el Cluster Agent activa la habilitación automática del generador de perfiles para cualquier proceso nuevo que merezca la generación de un perfil.
1. Continúa con el resto de las instrucciones de instalación.

```
spec:
  override:
    nodeAgent:
      image:
        tag: latest
    clusterAgent:
      image:
        tag: latest
      env:
        - name: DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_PROFILING_ENABLED
          value: "auto"
```

Utiliza la etiqueta de la "última" imagen para instalar una versión reciente del Agent compatible con la generación de perfiles, ya que
el Datadog Operator utiliza por defecto una versión más antigua del Agent.

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{< /tabs >}}

## ¿Cómo funciona la generación de perfiles con SSI?

Luego de la instalación, todos los nuevos procesos se ejecutan con la variable de entorno
`DD_PROFILING_ENABLED=auto`. Los procesos en ejecución no se ven afectados. La librería Datadog activa dinámicamente
el generador de perfiles para los procesos que son buenos candidatos para la generación de perfiles.

La lógica para identificar un proceso como buen candidato varía según el lenguaje. Para Java, se generan perfiles
de todos los procesos, ya que las aplicaciones Java suelen desplegarse como un único proceso Java en un host. Para Node
y Python, el generador de perfiles sólo se activa si la aplicación se ejecuta durante más de 30 segundos y
ha creado al menos un tramo (span) de rastreo.

SSI también puede configurarse para inyectar perfiles en todos y cada uno de los procesos utilizando el valor `true`
en lugar de `auto`.

**Nota**: Datadog recomienda utilizar el parámetro `auto` para evitar la generación de perfiles de procesos con valores bajos.

# Revertir

La página de la [instrumentación APM de un solo paso][1] contiene instrucciones para eliminar toda la
instrumentación. Al eliminar la instrumentación también se elimina la generación de perfiles.

Además, puedes desactivar la generación de perfiles siguiendo uno de los siguientes pasos:
* Repite las instrucciones de instalación utilizando un valor `false` en lugar de `auto`.
* Elimina la configuración `DD_PROFILING_ENABLED` del archivo `/etc/environment` en los despliegues de hosts, para hosts y contenedores.

Por último, puedes desactivar la generación de perfiles por cada proceso configurando explícitamente
`DD_PROFILING_ENABLED=false` en tu línea de comandos.

## Consideraciones especiales para servicios systemd

Para las instalaciones de hosts, la variable de entorno `DD_PROFILING_ENABLED` se almacena en el archivo
`/etc/environment`, donde la mayoría de los sistemas Linux la recogen automáticamente para todos los procesos. Las excepciones a esto
son los servicios systemd que ignoran el archivo. Para aplicaciones desplegadas como servicios systemd, necesitas
la siguiente línea en los archivos `.service` de la aplicación:
```
EnvironmentFile=/etc/environment
```
Las aplicaciones desplegadas
en un host como algo distinto a un servicio systemd o las aplicaciones desplegadas en contenedores no necesitan
este paso adicional.

[1]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm
[3]: /es/profiler/
