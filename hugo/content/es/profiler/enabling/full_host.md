---
further_reading:
- link: https://github.com/DataDog/datadog-agent/tree/main/cmd/host-profiler/deploy
  tag: Código fuente
  text: Instrucciones de implementación del Full-Host Profiler
- link: profiler/profiler_troubleshooting/full_host
  tag: Documentación
  text: Solución de problemas del Full-Host Profiler
- link: getting_started/profiler
  tag: Documentación
  text: Primeros pasos con Continuous Profiler
title: Habilitación del Full-Host Profiler
---
{{< callout url="https://www.datadoghq.com/product-preview/full-host-profiler/" btn_hidden="false" header="¡Únase a la vista previa!" >}}
El Full-Host Profiler está en versión preliminar.
{{< /callout >}}

El Full-Host Profiler recopila perfiles de CPU en todos los procesos de un servidor, independientemente del lenguaje o el entorno de ejecución. Se ejecuta como un DaemonSet en sus nodos de Kubernetes y está basado en el [OpenTelemetry eBPF Profiler][1].

### Casos de uso {#use-cases}

El Full-Host Profiler es útil para:

- Generar perfiles de software que no utiliza los SDK de Datadog, como componentes de código abierto y binarios de terceros.
- Analizar el rendimiento en procesos y entornos de ejecución multilingües.

## Entornos compatibles {#supported-environments}

El Full-Host Profiler es compatible con entornos de Kubernetes que cumplen con estos requisitos:

| Requisito              | Valores admitidos                          |
|---------------------------|--------------------------------------------|
| Sistema operativo          | Linux                                      |
| Kernel                    | 5.10 o posterior                              |
| Arquitectura de CPU          | `amd64` o `arm64`                         |
| Tipo de carga de trabajo de Kubernetes  | DaemonSet a nivel de servidor con `hostPID: true`  |

Las configuraciones comunes admitidas incluyen clústeres de Kubernetes autogestionados, Amazon EKS con nodos EC2, GKE Standard y grupos de nodos de VM de AKS.

Esta versión preliminar no admite la instalación directa en un servidor o una VM, Docker sin Kubernetes, entornos de ejecución sin servidor ni modos de Kubernetes que no puedan ejecutar DaemonSets a nivel de servidor, como Amazon EKS en Fargate, GKE Autopilot y nodos virtuales de AKS.

## Despliegue {#deployment}

Elija una ruta de implementación según cómo se gestione su clúster de Kubernetes:

| Si su clúster...                                                                    | Implementa el generador de perfiles como...                                          |
|-----------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| Ya ejecuta el Datadog Agent con Helm, incluso con el Collector del Agent | Un sidecar en el Agent DaemonSet, usando la pestaña **Datadog Helm chart**       |
| Ya ejecuta el Datadog Agent con el Datadog Operator, incluso con el Collector del Agent    | Un sidecar en el Agent DaemonSet, usando la pestaña **Datadog Operator**         |
| No ejecuta el Datadog Agent y utiliza Helm                                         | Su propio DaemonSet de OpenTelemetry Collector, usando la pestaña **OpenTelemetry Helm chart** |
| No ejecuta el Datadog Agent y utiliza el OpenTelemetry Operator                    | Su propio DaemonSet de OpenTelemetry Collector, usando la pestaña **OpenTelemetry Operator** |

Si el Datadog Agent ya está instalado, utilice una de las rutas de implementación del Datadog Agent para que el Agent pueda enriquecer los perfiles con metadatos de infraestructura. De lo contrario, utilice una de las rutas de OpenTelemetry.

Las rutas de OpenTelemetry implementan el Full-Host Profiler como su propio DaemonSet de OpenTelemetry Collector. No requieren un Datadog Agent, DDOT Collector u otro componente de Datadog del lado del Agent preexistente en el servidor, y puede ejecutar el DaemonSet junto con otras distribuciones de Collector.

Para obtener instrucciones paso a paso para cada ruta, consulte [Instrucciones de implementación del Full-Host Profiler][2].

## Nombre del servicio {#service-naming}

<div class="alert alert-info">Establezca <b>OTEL_SERVICE_NAME</b> o <b>DD_SERVICE</b> para cada servicio que desee perfilar e identificar por separado. Esto le proporciona una atribución precisa y datos de perfilado más procesables.</div>

El Full-Host Profiler determina el nombre del servicio de cada proceso a partir de la variable de entorno `OTEL_SERVICE_NAME` o `DD_SERVICE`:

```yaml
env:
  - name: OTEL_SERVICE_NAME
    value: my-service
```

Si no se establece ninguna variable, el perfilador infiere el nombre del servicio a partir del nombre del binario. Para lenguajes interpretados, este es el nombre del intérprete, como `java` o `python`.

{{< img src="profiler/inferred_service_example.png" alt="Ejemplo de un servicio inferido dentro de Profiling." style="width:50%;">}}

Si varios servicios comparten el mismo intérprete y no establecen un nombre de servicio, sus perfiles se agrupan bajo el mismo nombre inferido. Datadog no puede distinguirlos a menos que proporcione un nombre de servicio único.

Establezca `DD_ENV` y `DD_VERSION` en sus cargas de trabajo para un filtrado más completo en la interfaz de usuario de [Datadog Profiler][3].

## Símbolos de depuración {#debug-symbols}

Para lenguajes compilados como C, C++, Rust y Go, se requieren símbolos de depuración para que los nombres de las funciones aparezcan en los perfiles.

El Full-Host Profiler carga símbolos de depuración a Datadog cuando están disponibles localmente. Si se eliminaron los símbolos de sus binarios de producción, cargue por separado los símbolos de sus artefactos de compilación:

1. Instale la CLI de [datadog-ci][4].
2. Configure su clave de API y sitio:

   ```shell
   export DD_API_KEY=<DATADOG_API_KEY>
   export DD_SITE=<DATADOG_SITE>
   ```

3. Cargue símbolos:

   ```shell
   DD_BETA_COMMANDS_ENABLED=1 datadog-ci elf-symbols upload /path/to/build/symbols/
   ```

## Privilegios de Security {#security-privileges}

El Full-Host Profiler no se ejecuta como un contenedor privilegiado. En Kubernetes, se ejecuta como un DaemonSet a nivel de servidor con `hostPID: true` para que pueda observar los procesos en el nodo. Los manifiestos de despliegue añaden solo las capacidades de Linux requeridas para la creación de perfiles del servidor basada en eBPF.

- **SELinux** está configurado con el tipo de contenedor superprivilegiado `spc_t` para que SELinux no bloquee el acceso al servidor y a los procesos que requiere el Full-Host Profiler. Este tipo no proporciona confinamiento adicional de SELinux. Si `spc_t` no está disponible, reemplácelo con un tipo equivalente compatible con su distribución y política de seguridad.
- **Seccomp** restringe las llamadas al sistema que el contenedor puede realizar más allá de lo que permiten esas capacidades. El perfil de seccomp se incluye en `/etc/dd-host-profiler/seccomp.json` dentro de la imagen y se aplica automáticamente en las rutas basadas en Helm y en la ruta de OpenTelemetry Operator. En la ruta de vista previa del Datadog Operator, seccomp es opcional y debe aprovisionarse manualmente.
- **AppArmor** es opcional donde esté disponible. El perfil proporcionado restringe qué binarios puede ejecutar el generador de perfiles: solo se permite `objcopy`, utilizado para la extracción de símbolos.

Consulte las [Instrucciones de implementación del Full-Host Profiler][2] para conocer la configuración que se aplica a cada ruta de implementación.

## Relación con OpenTelemetry {#relationship-to-opentelemetry}

El Full-Host Profiler está construido como una distribución de OpenTelemetry Collector para la generación de perfiles basada en eBPF en todo el servidor. Utiliza el [OpenTelemetry eBPF Profiler][1] y exporta datos de perfil a Datadog a través de OTLP HTTP.

### Implementación con el Datadog Agent o como un Collector independiente {#deployment-with-the-datadog-agent-or-as-a-standalone-collector}

El Full-Host Profiler se admite de dos maneras:

- **Con el Datadog Agent, incluido el Collector del Agent**: El Full-Host Profiler se ejecuta como un sidecar en el Datadog Agent DaemonSet, implementado con el chart de Helm de Datadog o el Datadog Operator. Infiere su configuración del Agent, y el Agent enriquece los perfiles con metadatos de infraestructura de Datadog.
- **Independiente**: El Full-Host Profiler se ejecuta como su propio DaemonSet de OpenTelemetry Collector, implementado con el chart de Helm de OpenTelemetry o el OpenTelemetry Operator, y envía perfiles directamente a Datadog. No se requiere el Datadog Agent ni el DDOT Collector.

En ambos casos, el Full-Host Profiler se ejecuta en su propio contenedor enfocado en la generación de perfiles en lugar de dentro del Collector del Agent o del DDOT Collector. La generación de perfiles eBPF en todo el servidor requiere acceso elevado al servidor, como `hostPID: true`, montajes del kernel del servidor y capacidades de Linux relacionadas con eBPF. Mantener el generador de perfiles separado evita otorgar ese acceso a una distribución de Collector de propósito general más grande y reduce la cantidad de código que se ejecuta con privilegios a nivel del servidor.

Ejecutar el generador de perfiles por separado sigue el enfoque del proyecto original de OpenTelemetry: el generador de perfiles eBPF se empaqueta como una distribución dedicada en lugar de incluirse directamente en `otelcol-contrib`.

Para obtener instrucciones sobre cada opción, consulte [Instrucciones de implementación del Full-Host Profiler][2].

### En qué se diferencia el Full-Host Profiler del generador de perfiles eBPF del proyecto original {#how-the-full-host-profiler-differs-from-the-upstream-ebpf-profiler}

El Full-Host Profiler empaqueta el [OpenTelemetry eBPF Profiler][1] del proyecto original con componentes y valores predeterminados para enviar perfiles a Datadog. En comparación con ejecutar por su cuenta el generador de perfiles del proyecto original, el Full-Host Profiler:

- **Carga símbolos de depuración automáticamente**: Cuando los símbolos están disponibles localmente, el generador de perfiles los carga en Datadog. Las tramas nativas en lenguajes como C, C++, Go y Rust se simbolizan sin un paso independiente de carga en CI. Para los binarios sin símbolos, consulte [Símbolos de depuración](#debug-symbols).
- **Exporta a Datadog con etiquetas de contenedor**: Incluye la configuración de exportación de Datadog y el etiquetado de contenedores, por lo que no necesita configurar estos componentes del Collector usted mismo.
- **Utiliza valores predeterminados probados a escala**: Datadog prueba la configuración predeterminada para verificar la sobrecarga y la estabilidad en miles de servidores.

### Madurez de la generación de perfiles de OpenTelemetry {#opentelemetry-profiling-maturity}

La señal OTLP Profiles no es estable en OpenTelemetry. Para conocer su estado de madurez, consulte el [anuncio de perfiles de OpenTelemetry][5]. Datadog contribuye a la señal OTLP Profiles, al generador de perfiles eBPF de OpenTelemetry y a la especificación de OpenTelemetry para el intercambio de contexto de [procesos][7] y [hilos][8], lo que permite correlacionar trazas con perfiles.

## ¿Qué sigue? {#whats-next}

Después de implementar Full-Host Profiler, consulte [Introducción a Profiler][9] para aprender a usar Continuous Profiler para identificar y solucionar problemas de rendimiento.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-ebpf-profiler
[2]: https://github.com/DataDog/datadog-agent/tree/main/cmd/host-profiler/deploy
[3]: https://app.datadoghq.com/profiling
[4]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[5]: https://opentelemetry.io/blog/2026/profiles-alpha/
[7]: https://github.com/open-telemetry/opentelemetry-specification/pull/4719
[8]: https://github.com/open-telemetry/opentelemetry-specification/pull/4947
[9]: /es/getting_started/profiler/