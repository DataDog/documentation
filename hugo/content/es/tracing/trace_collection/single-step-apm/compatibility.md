---
aliases:
- /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: Documentación
  text: Instrumentación de un solo step (UI) / paso (generic) de APM
title: Compatibilidad
---

## Información general

La instrumentación de un solo step (UI) / paso (generic) (SSI) tiene requisitos de compatibilidad que varían según el sistema operativo, el entorno y el tiempo de ejecución del lenguaje. En esta page (página) se describen las plataformas compatibles, los requisitos y las limitaciones conocidas que pueden afectar a SSI en tu configuración específica.

## Compatibilidad por entorno de aplicación

<div class="alert alert-warning">ECS Fargate no es compatible.</div>

Selecciona tu entorno para ver los requisitos de compatibilidad y las limitaciones:

{{< tabs >}}
{{% tab "Host de Linux" %}}

### Compatibilidad

- **Estado**: GA
- **Sistemas operativos compatibles**: Consulta [Referencia de distribuciones de Linux](#linux-distributions-reference)
- **Arquitecturas compatibles**: x86_64, arm64

### Requisitos

- Datadog Agent con la instrumentación de APM activada
- Una [distribución compatible de Linux](#Linux-distributions-reference)

### Limitaciones

- **SELinux**: Los entornos de SELinux reforzados no son compatibles.
- **Instancias pequeñas de máquinas virtuales**: Los tipos de instancia muy pequeños (por ejemplo, `t2.micro`) pueden tener tiempos de espera. Utiliza un tipo de instancia más grande, como `t2.small` o superior.

{{% /tab %}}

{{% tab "Docker" %}}

### Compatibilidad

- **Estado**: GA
- **Sistemas operativos compatibles**: Consulta [Referencia de distribuciones de Linux](#linux-distributions-reference)
- **Arquitecturas compatibles**: x86_64, arm64

### Requisitos

- Datadog Agent con la instrumentación de APM activada
- Docker ejecutándose en una [distribución compatible de Linux ](#linux-distributions-reference)

### Limitaciones

- **Modo sin raíz de Docker**: Cuando ejecutes Docker en modo sin raíz, actualiza la ruta del socket en `/etc/datadog-agent/inject/docker_config.yaml` para que SSI pueda conectarse a Docker. La ruta predeterminada es `/run/user/$UID/docker.sock`, pero tu entorno puede diferir.
- **Correcciones de compatibilidad personalizadas `runc`**: Si tu entorno utiliza correcciones de compatibilidad personalizadas `runc` (por ejemplo, para cargas de trabajo de GPU), actualiza la entrada `runtimes` en `/etc/datadog-agent/inject/docker_config.yaml` para incluir tu tiempo de ejecución personalizado y el tiempo de ejecución de Datadog necesario para SSI.

{{% /tab %}}

{{% tab "Kubernetes" %}}

<div class="alert alert-info">La compatibilidad con EKS Fargate está en la vista previa.</div>

### Compatibilidad

- **Estado**: GA
- **Grupos de nodos compatibles**: Solo nodos de Linux (consulta [referencia de distribuciones de Linux](#linux-distributions-reference))
- **Arquitecturas compatibles**: x86_64, arm64

### Requisitos

- [Controlador de admisión de Datadog][1] activado
- Los nodos de Kubernetes que ejecutan una [distribución compatible con Linux ](#linux-distributions-reference)

### Limitaciones

- **Solo grupos de nodos de Linux**: Solo se admiten grupos de nodos de Linux.
- **Pods de Windows**: Para clústeres de Kubernetes con pods de Windows, utiliza la inclusión/exclusión de espacios de nombres o especifica una anotación en la aplicación para excluirlos de la inserción de bibliotecas.

[1]: /es/containers/cluster_agent/admission_controller/

{{% /tab %}}

{{% tab "IIS (Internet Information Services) de Windows" %}}

### Compatibilidad

- **Estado**: GA
- **Tiempos de ejecución compatibles**: solo .NET

### Requisitos

- Datadog Agent v7.67.1 o superior
- Kit de desarrollo de software (SDK) de .NET de Datadog v3.19.0 o superior
- Las aplicaciones que se ejecuten en IIS (Internet Information Services)

### Limitaciones

- **Solo IIS (Internet Information Services)**: Solo se admiten aplicaciones .NET que se ejecuten en IIS (Internet Information Services).

{{% /tab %}}
{{< /tabs >}}

## Tiempos de ejecución de lenguajes compatibles

SSI instrumenta automáticamente las aplicaciones escritas en los siguientes lenguajes [cargando un kit de desarrollo de software (SDK) de lenguaje de Datadog compatible][2] en el tiempo de ejecución. Selecciona tu lenguaje para ver las versiones mínimas del kit de desarrollo de software (SDK), las versiones del tiempo de ejecución compatibles y cualquier limitación.

<div class="alert alert-info">

La compatibilidad con SSI depende de dos factores:

1. **Versión del kit de desarrollo de software (SDK)**: SSI debe ser compatible con la versión del kit de desarrollo de software (SDK) de lenguaje de Datadog.
2. **Versión del tiempo de ejecución**: El kit de desarrollo de software (SDK) de lenguaje de Datadog debe admitir la versión del tiempo de ejecución del lenguaje de tu aplicación.

Si no se cumple alguno de estos requisitos, SSI retrocederá de forma gradual y la aplicación se ejecutará sin instrumentación.

</div>

{{< programming-lang-wrapper langs="java,python,ruby,nodejs,dotnet,php" >}}

{{< programming-lang lang="java" >}}

### Versión mínima del kit de desarrollo de software (SDK) 

**Kit de desarrollo de software (SDK) de Java**: 1.44.0 o superior

### Versiones del tiempo de ejecución compatibles

Para obtener una lista completa de las versiones de Java compatibles, consulta la [documentación de compatibilidad del kit de desarrollo de software (SDK) de Java][1].

### Limitaciones

En forma predeterminada, SSI no instrumenta algunas aplicaciones y bibliotecas de Java para evitar sobrecargas de rendimiento o traces (trazas) no accionables. Estas exclusiones se definen en la [Lista de negaciones del kit de desarrollo de software (SDK) de Java][2]. Si tu carga de trabajo está incluida, SSI omite la carga del kit de desarrollo de software (SDK) de Java.

### Problemas conocidos

**Longitud de las variables de entorno**: Si tu aplicación utiliza muchas opciones de línea de comandos o variables de entorno, puedes encontrarte con fallos de inicialización. Esto suele ocurrir cuando tienes muchos argumentos de la máquina virtual de Java u otras configuraciones de inicio. Para solucionarlo:
- Minimiza los argumentos no esenciales de la máquina virtual de Java
- Considere la posibilidad de mover algunas configuraciones a un archivo `.properties` 
- Check los logs de la aplicación en busca de errores de inicialización específicos

**Advertencias de Java 24+**: Al utilizar SSI para Java 24+, es posible que aparezcan advertencias relacionadas con el acceso nativo JNI o el acceso a la memoria `sun.misc.Unsafe`. Estas advertencias pueden suprimirse con las variables de entorno `--illegal-native-access=allow` y `--sun-misc-unsafe-memory-access=allow`. Consulta [JEP 472][3] y [JEP 498][4] para obtener más información.

[1]: /es/tracing/trace_collection/compatibility/java/
[2]: https://github.com/DataDog/dd-trace-java/blob/master/metadata/requirements.json
[3]: https://openjdk.org/jeps/472
[4]: https://openjdk.org/jeps/498

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

### Versión mínima del kit de desarrollo de software (SDK) 

**Kit  de desarrollo de software (SDK) de Python**: 2.20.1 o superior

### Versiones compatibles del tiempo de ejecución

**Versión mínima de Python**: 3.7 o superior

Para obtener una lista completa de las versiones compatibles de Python, consulta la [Documentación de compatibilidad del kit de desarrollo de software (SDK) de Python][1].

### Consideraciones sobre el sistema operativo

Python 3.7+ solo está disponible en forma predeterminada en:
- CentOS Stream 8+
- Red Hat Enterprise Linux 8+

Para otras distribuciones, puede que necesites instalar Python 3.7+ por separado.

[1]: /es/tracing/trace_collection/compatibility/python

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

### Versión mínima del kit de desarrollo de software (SDK) 

**Kit de desarrollo de software (SDK) de Ruby**: 2.5.0 o superior

### Versiones compatibles del tiempo de ejecución

Para obtener una lista completa de las versiones compatibles de Ruby, consulta la [Documentación de compatibilidad del kit de desarrollo de software (SDK) de Ruby][1].

### Requisitos del sistema operativo

- Requiere distribuciones de Linux que utilicen glibc 2.27 o posterior.
- No es compatible con Alpine Linux ni otras distribuciones basadas en musl.

### Problemas conocidos

**Desinstalación de SSI**: Cuando desinstales la instrumentación de un solo step (UI) / paso (generic) desde una aplicación de Ruby, sigue estos pasos para evitar errores:

1. **Antes de la desinstalación**: Haz una copia de seguridad de tu `Gemfile` y `Gemfile.lock`.
2. **Después de la desinstalación**, realiza una de las siguientes acciones:
   - Restaura tu `Gemfile` original y `Gemfile.lock`.
   - Ejecuta `bundle install` para recompilar tus dependencias.

[1]: /es/tracing/trace_collection/compatibility/ruby

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

### Versión mínima del kit de desarrollo de software (SDK) 

**Kit de desarrollo de software (SDK) de Node.js**: 4.0 o superior

### Versiones compatibles del tiempo de ejecución

Para obtener una lista completa de las versiones compatibles de Node.js, consulte la [Documentación de compatibilidad del kit de desarrollo de software (SDK) de Node.js][1].

### Consideraciones sobre el sistema operativo

Las versiones compatibles de Node.js solo están disponibles en forma predeterminada en:
- CentOS Stream 9+
- Red Hat Enterprise Linux 9+

Para otras distribuciones, puede que necesites instalar Node.js por separado.

### Limitaciones

- **Módulos de ESM**: No se admite la instrumentación de ESM (módulos ECMAScript).

[1]: /es/tracing/trace_collection/compatibility/nodejs

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

### Versión mínima del kit de desarrollo de software (SDK) 

**Kit de desarrollo de software (SDK) de .NET**: 3.7.0 o superior

### Versiones compatibles del tiempo de ejecución

SSI es compatible con los tiempos de ejecución de .NET Core y .NET Framework. Para obtener una lista completa de las versiones compatibles, consulta:

- [Compatibilidad con el kit de desarrollo de software (SDK) de .NET Core][1]
- [Compatibilidad con el kit de desarrollo de software (SDK) de .NET Framework][2]

[1]: /es/tracing/trace_collection/compatibility/dotnet-core
[2]: /es/tracing/trace_collection/compatibility/dotnet-framework

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

### Versión mínima de kit de desarrollo de software (SDK) 

**Kit de desarrollo de software (SDK) de PHP**: 1.6.0 o superior

### Versiones compatibles del tiempo de ejecución

Para obtener una lista completa de las versiones compatibles de PHP, consulta la [documentación de compatibilidad del kit de desarrollo de software (SDK) de PHP][1].

### Limitaciones

SSI se desactiva automáticamente cuando detecta:
- Compilación de Just-In-Time (JIT) de PHP
- Cualquiera de las siguientes extensiones:
  - Xdebug
  - ionCube Loader
  - NewRelic
  - Blackfire
  - pcov

<div class="alert alert-info">Si necesitas ejecutar SSI junto con estas herramientas, puedes forzar su activación configurando <code>DD_INJECT_FORCE=true</code>.</div>

[1]: /es/tracing/trace_collection/compatibility/php

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Referencia de distribución de Linux

Las siguientes distribuciones y arquitecturas de Linux son compatibles con SSI en todas las plataformas de despliegue (hosts de Linux, Docker, Kubernetes):

| Sistema operativo           | Versión        | Arquitectura  |
|--------------|----------------|---------------|
| Amazon Linux | 2022, 2023     | x86_64, arm64 |
| CentOS       | 7, 8           | x86_64, arm64 |
| Debian       | 10, 11, 12     | x86_64, arm64 |
| Red Hat      | 7, 8, 9        | x86_64, arm64 |
| Ubuntu       | 20, 22, 24 (LTS) | x86_64, arm64 |
| Fedora       | 40             | x86_64, arm64 |
| AlmaLinux    | 8              | x86_64, arm64 |
| Oracle Linux | 8              | x86_64, arm64 |
| Rocky Linux  | 8              | x86_64, arm64 |

<div class="alert alert-info">Para conocer otros requisitos del sistema operativo específicos de tu lenguaje de programación, consulta <a href="#supported-language-runtimes">Tiempos de ejecución de lenguajes compatibles</a>.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/cluster_agent/admission_controller/
[2]: /es/tracing/guide/injectors/