---
description: Aprenda cómo funciona el inyector con Single Step Instrumentation para
  instrumentar automáticamente las aplicaciones en tiempo de ejecución sin configuración
  manual.
further_reading:
- link: tracing/trace_collection/automatic_instrumentation/single-step-apm
  tag: Documentación
  text: Instrumentación de APM de un solo paso
title: Comprender el comportamiento del inyector con Single Step Instrumentation
---
## Descripción general {#overview}

El inyector es una biblioteca compartida que instrumenta automáticamente las aplicaciones en tiempo de ejecución. Con [Single Step Instrumentation][1], el inyector automatiza la configuración del entorno y la inicialización del rastreador, eliminando la necesidad de configuración manual.

## Cómo se carga el inyector {#how-the-injector-is-loaded}

### Linux {#linux}

En sistemas Linux, el inyector utiliza el mecanismo `LD_PRELOAD`—una característica de vinculación dinámica en entornos tipo UNIX—para cargarse en todos los procesos vinculados dinámicamente. Esto puede suceder de dos maneras:
- Explícitamente, configurando la variable de entorno `LD_PRELOAD`.
- Implícitamente, modificando el archivo `/etc/ld.so.preload` de todo el sistema.

### Docker {#docker}

En entornos Docker, el inyector utiliza el mismo mecanismo `LD_PRELOAD` que en los servidores Linux para cargarse en los procesos de la aplicación en tiempo de ejecución. Esto le permite inicializar la lógica de rastreo y modificar las variables de entorno antes de que se inicie la aplicación.

Para habilitar esto, Datadog proporciona un shim `runc` personalizado que reemplaza el entorno de ejecución de contenedores predeterminado de Docker. El propósito del shim es:
1. Inyectar la biblioteca compartida (el inyector) en el contenedor.
1. Configurar la variable de entorno `LD_PRELOAD`, asegurando que el inyector se cargue en todos los procesos vinculados dinámicamente dentro del contenedor.

### Kubernetes {#kubernetes}

En entornos de Kubernetes, Datadog Admission Controller se encarga de la inyección mediante un webhook de admisión mutante. Cuando se programa un pod, el controlador:

1. Evalúa si el pod debe ser instrumentado basándose en selectores configurados (como espacios de nombres, etiquetas o propiedades específicas del pod).
1. Modifica la especificación del pod para:
   - Entregar el inyector y los SDK mediante contenedores de inicialización o Datadog CSI driver
   - Establecer variables de entorno (como `LD_PRELOAD`)
   - Montar volúmenes para que las bibliotecas inyectadas persistan

De forma predeterminada, SSI selecciona el método de entrega que mejor se adapta a su clúster. También puede elegir un [modo de inyección][2] explícitamente.

### Windows {#windows}

En Windows, el inyector se entrega como una DLL. Un controlador de kernel de Datadog carga la DLL del inyector en cada proceso nuevo, y la función `DllMain` de la DLL se ejecuta antes del punto de entrada de la aplicación. Después de la carga, el inyector sigue el mismo flujo descrito en [Comportamiento del inyector](#injector-behavior). Windows solo admite Java y .NET. La detección del entorno de ejecución en Windows difiere de la de Linux en su implementación, pero el comportamiento de instrumentación resultante es el mismo.

## Comportamiento del inyector {#injector-behavior}

Después de que el inyector se carga en el espacio de memoria de un proceso, independientemente de la plataforma, realiza lo siguiente:
- Detecta el entorno de ejecución de la aplicación (como Python, Node.js, PHP, Java, .NET, Ruby o NGINX).
- Evalúa si el proceso debe ser instrumentado. Algunos procesos se excluyen de forma predeterminada. También puede definir reglas de instrumentación para permitir o denegar la inyección por carga de trabajo en [Linux][3], [Kubernetes][4] y [Windows][5].
- Modifica las variables de entorno o los argumentos de la línea de comandos para cargar el SDK de rastreo adecuado.
- Emite telemetría para informar el estado y ayudar en la depuración.

Si la inyección falla o no se detecta ningún entorno de ejecución compatible, la aplicación continúa ejecutándose sin instrumentación. Lo mismo se aplica si un proceso se excluye mediante la configuración.

**Nota**: Debido a que el inyector se ejecuta antes de que el SDK evalúe sus variables de entorno, establecer `DD_TRACE_ENABLED=false` no impide que SSI cargue el SDK. Para deshabilitar o eliminar SSI, consulte la página de configuración de [Single Step APM Instrumentation][1] para su plataforma.

## Ciclo de vida del inyector {#injector-life-cycle}

El inyector completa su trabajo antes de que se ejecute la función `main` de la aplicación. No es un proceso o hilo en segundo plano que se ejecute junto con la aplicación.

Después de que el inyector establece las variables de entorno o los argumentos de línea de comandos necesarios, la aplicación continúa normalmente. A partir de ese momento, el único código de Datadog en el proceso es el SDK de rastreo que la propia aplicación carga utilizando esa configuración.

## Instrumentación por entorno de ejecución {#per-runtime-instrumentation}

El inyector carga el SDK de rastreo adecuado configurando variables de entorno o modificando los argumentos de línea de comandos para el proceso de la aplicación. El mecanismo varía según el entorno de ejecución:

| Entorno de ejecución  | Mecanismo |
|----------|-----------|
| Java     | Configura `JAVA_TOOL_OPTIONS` con `-javaagent:<path-to-dd-java-agent.jar>`. |
| Python   | Configura `PYTHONPATH` en el directorio de instalación del rastreador. |
| Node.js  | Configura `NODE_OPTIONS` con `--require` (CommonJS) o `--import` (módulos ECMAScript). |
| Ruby     | Configura `RUBYOPT` con `-r <path-to-Datadog-host-inject-script>`. |
| .NET     | Configura las variables de entorno del generador de perfiles CLR de .NET (`CORECLR_ENABLE_PROFILING`, `CORECLR_PROFILER`, `CORECLR_PROFILER_PATH` y variables relacionadas). |
| PHP      | Configura `PHP_INI_SCAN_DIR` en un directorio de cargador proporcionado por Datadog. |
| NGINX    | Vuelve a ejecutar el binario de NGINX con argumentos de línea de comandos adicionales para cargar el módulo de Datadog (por ejemplo, `-g "load_module <path-to-Datadog-module>;"`). |

## Privilegios y contexto {#privileges-and-scope}

### Contexto de la inyección {#injection-scope}

SSI instrumenta las aplicaciones cargando un rastreador o perfilador en el proceso de la aplicación mediante enlace dinámico en el espacio de usuario (como `LD_PRELOAD` en Linux o inyección de DLL en Windows). No instala módulos del kernel, no aplica parches al kernel, no intercepta llamadas al sistema ni utiliza eBPF. El inyector y el rastreador o perfilador se ejecutan con los mismos privilegios del sistema operativo que el proceso de la aplicación; consulte [Privilegios de tiempo de ejecución](#runtime-privileges).

Aunque el código inyectado se ejecuta dentro del proceso de la aplicación, algunos modos de implementación actualizan la configuración del sistema operativo o del tiempo de ejecución para que el inyector se cargue automáticamente:

- **Inyección mediante controlador de admisión de Kubernetes**: Modifica las especificaciones del pod para montar el inyector (usando un contenedor de inicialización o [Datadog CSI driver][2]) y establecer variables de entorno. Esta es una acción de la API de Kubernetes, no una modificación del sistema operativo del servidor.
- **Inyección en servidor Linux**: Configura el cargador dinámico (típicamente a través de `/etc/ld.so.preload`) para que cada nuevo proceso enlazado dinámicamente cargue el lanzador de inyección. Este es un cambio de configuración a nivel del sistema operativo, pero sigue siendo un enlace dinámico en el espacio de usuario, no código del kernel.
- **Inyección en tiempo de ejecución de Docker**: Configura Docker para usar un entorno de ejecución envoltorio, de modo que los contenedores se inicien con el rastreador montado y configurado (típicamente inyectando una variable de entorno `LD_PRELOAD` en el contenedor). Esto modifica la configuración del demonio de Docker.
- **Inyección en Windows**: Instala un controlador de kernel que carga la DLL del inyector en los nuevos procesos. El controlador se ejecuta a nivel del sistema operativo. El código inyectado que se ejecuta dentro de cada proceso de la aplicación permanece en el espacio de usuario.

### Privilegios de tiempo de ejecución {#runtime-privileges}

El inyector, el rastreador y el perfilador se ejecutan dentro del proceso de la aplicación y heredan los mismos permisos del sistema operativo que dicho proceso. No obtienen privilegios adicionales. Si la aplicación se ejecuta como un usuario restringido, el inyector, el rastreador y el perfilador también están restringidos a los permisos de ese usuario.

### Privilegios de instalación {#installation-privileges}

Los requisitos de privilegios en el momento de la instalación dependen del modo de implementación:

#### Controlador de admisión de Kubernetes {#kubernetes-admission-controller}

- **Componentes del lado del clúster** (el Datadog Cluster Agent y el controlador de admisión) normalmente requieren permisos a nivel de clúster para registrar webhooks y modificar pods.
- **Pods de aplicación** no requieren privilegios de SO elevados de Datadog, pero los clústeres reforzados pueden necesitar permitir:
  - Montajes de volumen utilizados para comunicarse con el Agent (comúnmente un `hostPath` montaje a un directorio de socket).
  - Permisos específicos de `SecurityContext` o SCC.

  Puede mantener el contenedor de inicialización inyectado y el contenedor de la aplicación restringidos (sin root, capacidades eliminadas, sin escalada de privilegios) siempre que sus políticas permitan los montajes requeridos.

#### Servidor Linux {#linux-host}

- La instalación normalmente requiere root (o equivalente), porque instala paquetes y puede modificar la configuración del cargador y la configuración del servicio en todo el sistema.
- Después de la instalación, el servicio Datadog Agent se ejecuta como su propio usuario de servicio (comúnmente `dd-agent`), y el código inyectado se ejecuta con los privilegios del usuario de la aplicación.

#### Entorno de ejecución de Docker en un servidor {#docker-runtime-on-a-host}

- La instalación y configuración normalmente requieren root, porque modifican la configuración del demonio de Docker.
- En tiempo de ejecución, el inyector y el trazador se ejecutan dentro del proceso de la aplicación del contenedor como el usuario de ese contenedor.

#### Windows {#windows-1}

- La instalación del Datadog Agent en Windows requiere privilegios de administrador (instalación del servicio y configuración de todo el sistema).
- Para la instrumentación de aplicaciones (por ejemplo, .NET), el generador de perfiles se ejecuta en el contexto del proceso de destino. Los cambios de configuración de todo el sistema habilitan el generador de perfiles para procesos y servicios, pero no le otorgan privilegios adicionales al generador de perfiles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm
[2]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/#configure-injection-modes
[3]: /es/tracing/trace_collection/single-step-apm/linux/#define-instrumentation-rules
[4]: /es/tracing/trace_collection/single-step-apm/kubernetes/#target-specific-workloads
[5]: /es/tracing/trace_collection/single-step-apm/windows/#define-instrumentation-rules