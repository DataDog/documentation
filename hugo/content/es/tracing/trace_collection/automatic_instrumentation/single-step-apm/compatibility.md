---
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: Documentación
  text: Instrumentación APM de un solo paso
title: Compatibilidad
---

## Información general

La instrumentación de un solo paso (SSI) tiene requisitos de compatibilidad que varían según el sistema operativo, el entorno y el tiempo de ejecución del lenguaje. En esta página se describen las plataformas compatibles, los requisitos y las limitaciones conocidas que pueden afectar a la SSI en tu configuración específica.

## Compatibilidad por entorno de aplicación

<div class="alert alert-warning">ECS Fargate no es compatible.</div>

Selecciona tu entorno para ver los requisitos de compatibilidad y las limitaciones:

{{< tabs >}}
{{% tab "Host de Linux" %}}

### Compatibilidad

- **Estado**: GA
- **Sistemas operativos compatibles**: Consulta la [referencia de las distribuciones Linux](#linux-distributions-reference)
- **Arquitecturas compatibles**: x86_64, arm64

### Requisitos

- Datadog Agent con la instrumentación APM activada
- Una [distribución Linux compatible](#linux-distributions-reference)

### Limitaciones

- **SELinux**: Los entornos SELinux reforzados no son compatibles.
- **Instancias de máquina virtual pequeñas**: Los tipos de instancia muy pequeñas (por ejemplo, `t2.micro`) pueden experimentar tiempos de espera. Utiliza un tipo de instancia más grande, como `t2.small` o superior.

{{% /tab %}}

{{% tab "Docker" %}}

### Compatibilidad

- **Estado**: GA
- **Sistemas operativos compatibles**: Consulta la [referencia de las distribuciones Linux](#linux-distributions-reference)
- **Arquitecturas compatibles**: x86_64, arm64

### Requisitos

- Datadog Agent con la instrumentación APM activada
- Docker ejecutándose en una [distribución Linux compatible](#linux-distributions-reference)

### Limitaciones

- **Modo Docker rootless**: Cuando ejecutes Docker en modo rootless, actualiza la ruta del socket en `/etc/datadog-agent/inject/docker_config.yaml` para que SSI pueda conectarse a Docker. La ruta por defecto es `/run/user/$UID/docker.sock`, pero tu entorno puede diferir.
- **Correcciones de compatibilidad `runc` personalizadas**: Si tu entorno utiliza correcciones de compatibilidad `runc` personalizadas (por ejemplo, para cargas de trabajo de GPU), actualiza la entrada `runtimes` en `/etc/datadog-agent/inject/docker_config.yaml` para incluir tu tiempo de ejecución personalizado y el tiempo de ejecución Datadog necesario para la SSI.

{{% /tab %}}

{{% tab "Kubernetes" %}}

<div class="alert alert-info">La compatibilidad con EKS Fargate está en vista previa.</div>

### Compatibilidad

- **Estado**: GA
- **Grupos de nodos compatibles**: Solo nodos Linux (consulta la [referencia de las distribuciones Linux](#linux-distributions-reference))
- **Arquitecturas compatibles**: x86_64, arm64

### Requisitos

- [Controlador de admisión Datadog][1] activado
- Nodos de Kubernetes que ejecutan una [distribución Linux compatible](#linux-distributions-reference)

### Limitaciones

- **Solo grupos de nodos Linux**: Solo se admiten grupos de nodos Linux.
- **Pods de Windows**: Para clústeres de Kubernetes con pods de Windows, utiliza la inclusión/exclusión de espacios de nombres o especifica una anotación en la aplicación para excluirlos de la inyección de bibliotecas.

[1]: /es/containers/cluster_agent/admission_controller/

{{% /tab %}}

{{% tab "Windows IIS" %}}

### Compatibilidad

- **Estado**: GA
- **Tiempos de ejecución compatibles**: Solo .NET

### Requisitos

- Datadog Agent v7.67.1 o posterior
- SDK .NET de Datadog v3.19.0 o posterior
- Aplicaciones que se ejecutan en IIS

### Limitaciones

- **Solo IIS**: Solo se admiten aplicaciones .NET que se ejecuten en IIS.

{{% /tab %}}
{{< /tabs >}}

## Tiempos de ejecución de lenguajes compatibles

SSI instrumenta automáticamente las aplicaciones escritas en los siguientes lenguajes [cargando un SDK del lenguaje de Datadog compatible][2] en el tiempo de ejecución. Selecciona tu lenguaje para ver las versiones mínimas de SDK, las versiones del tiempo de ejecución compatibles y cualquier limitación.

<div class="alert alert-info">

La compatibilidad con SSI depende de dos factores:

1. **Versión del SDK**: SSI debe ser compatible con la versión del SDK del lenguaje de Datadog.
2. **Versión del tiempo de ejecución**: El SDK del lenguaje de Datadog debe admitir la versión del tiempo de ejecución del lenguaje de tu aplicación.

Si no se cumple alguno de estos requisitos, SSI retrocede de forma gradual y la aplicación se ejecuta sin instrumentación.

</div>

{{< programming-lang-wrapper langs="java,python,ruby,nodejs,dotnet,php" >}}

{{< programming-lang lang="java" >}}

### Versión mínima de SDK

**SDK Java**: v1.44.0 o posterior

### Versiones de tiempo de ejecución compatibles

Para obtener una lista completa de las versiones de Java compatibles, consulta la [documentación de compatibilidad del SDK Java][1].

### Limitaciones

Por defecto, SSI no instrumenta algunas aplicaciones y librerías Java para evitar sobrecargas de rendimiento o trazas (traces) no accionables. Estas exclusiones se definen en la [lista de denegación del SDK Java][2]. Si tu carga de trabajo está incluida, SSI omite la carga del SDK Java.

### Problemas conocidos

**Longitud de las variables de entorno**: Si tu aplicación utiliza varias opciones de línea de comandos o variables de entorno, puedes experimentar fallos de inicialización. Esto suele ocurrir cuando tienes varios argumentos de máquinas virtuales Java u otras configuraciones de inicio. Para solucionarlo tienes que:
- Minimizar los argumentos no esenciales de la máquina virtual Java
- Considerar la posibilidad de mover algunas configuraciones a un archivo `.properties` 
- Analizar los logs de la aplicación en busca de errores de inicialización específicos

**Advertencias de Java v24 o posterior**: Al utilizar SSI para Java v24 o posterior*, es posible que aparezcan advertencias relacionadas con el acceso nativo JNI o el acceso a memoria `sun.misc.Unsafe`. Estas advertencias pueden suprimirse con las variables de entorno `--illegal-native-access=allow` y `--sun-misc-unsafe-memory-access=allow`. Consulta [JEP 472][3] y [JEP 498][4] para obtener más información.

[1]: /es/tracing/trace_collection/compatibility/java/
[2]: https://github.com/DataDog/dd-trace-java/blob/master/metadata/requirements.json
[3]: https://openjdk.org/jeps/472
[4]: https://openjdk.org/jeps/498

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

### Versión mínima de SDK

**SDK Python**: v2.20.1 o posterior

### Versiones de tiempo de ejecución compatibles

**Versión mínima de Python**: v3.7 o posterior

Para obtener una lista completa de las versiones de Python compatibles, consulta la [documentación de compatibilidad del SDK Python][1].

### Consideraciones sobre el sistema operativo

Python v3.7 o posterior solo está disponible por defecto en:
- CentOS Stream v8 o posterior
- Red Hat Enterprise Linux v8 o posterior

Para otras distribuciones, puede que necesite instalar Python v3.7 o posterior por separado.

[1]: /es/tracing/trace_collection/compatibility/python

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

### Versión mínima de SDK

**SDK Ruby**: v2.5.0 o posterior

### Versiones de tiempo de ejecución compatibles

Para obtener una lista completa de las versiones de Ruby compatibles, consulta la [documentación de compatibilidad del SDK Ruby][1].

### Requisitos del sistema operativo

- Requiere distribuciones Linux que utilicen glibc v2.27 o posterior.
- No compatible con Alpine Linux u otras distribuciones basadas en musl.

### Problemas conocidos

**Desinstalación de SSI**: Cuando desinstales la instrumentación de un solo paso de una aplicación Ruby, sigue estos pasos para evitar errores:

1. **Antes de desinstalar**: Haz una copia de seguridad de tu `Gemfile` y `Gemfile.lock`.
2. **Después de desinstalar**, realiza una de las siguientes acciones:
   - Restaura tus `Gemfile` y `Gemfile.lock` originales.
   - Ejecuta `bundle install` para volver a crear tus dependencias.

[1]: /es/tracing/trace_collection/compatibility/ruby

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

### Versión mínima de SDK

**SDK Node.js**: v4.0 o posterior

### Versiones de tiempo de ejecución compatibles

Para obtener una lista completa de las versiones de Node.js compatibles, consulta la [documentación de compatibilidad del SDK Node.js][1].

### Consideraciones sobre el sistema operativo

Las versiones de Node.js compatibles solo están disponibles por defecto en:
- CentOS Stream v9 o posterior
- Red Hat Enterprise Linux v9 o posterior

Para otras distribuciones, puede que necesites instalar Node.js por separado.

### Limitaciones

- **Módulos ESM**: No se admite la instrumentación de ESM (módulos ECMAScript).

[1]: /es/tracing/trace_collection/compatibility/nodejs

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

### Versión mínima de SDK

**SDK .NET**: v3.7.0 o posterior

### Versiones de tiempo de ejecución compatibles

SSI es compatible con los tiempos de ejecución de .NET Core y .NET Framework. Para obtener una lista completa de las versiones compatibles, consulta:

- [Compatibilidad del SDK .NET Core][1]
- [Compatibilidad del SDK .NET Framework][2]

[1]: /es/tracing/trace_collection/compatibility/dotnet-core
[2]: /es/tracing/trace_collection/compatibility/dotnet-framework

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

### Versión mínima de SDK

**SDK PHP**: v1.6.0 o posterior

### Versiones de tiempo de ejecución compatibles

Para obtener una lista completa de las versiones de PHP compatibles, consulta la [documentación de compatibilidad del SDK PHP][1].

### Limitaciones

SSI se desactiva automáticamente cuando detecta:
- Compilación justo a tiempo (JIT) de PHP
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

## Referencia de distribuciones Linux

Las siguientes distribuciones y arquitecturas Linux son compatibles con SSI en todas las plataformas de despliegue (hosts Linux, Docker, Kubernetes):

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

<div class="alert alert-info">Para conocer otros requisitos de sistema operativo específicos de tu lenguaje de programación, consulta los <a href="#supported-language-runtimes">tiempos de ejecución de lenguajes compatibles</a>.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/cluster_agent/admission_controller/
[2]: /es/tracing/guide/injectors/