---
aliases:
- /es/tracing/profiler/enabling/php/
code_lang: php
code_lang_weight: 70
further_reading:
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con el generador de perfiles
- link: profiler/profile_visualizations
  tag: Documentación
  text: Más información sobre las visualizaciones de perfiles disponibles
- link: profiler/profiler_troubleshooting/php
  tag: Documentación
  text: Solucionar los problemas que surjan al utilizar el generador de perfiles
- link: https://www.datadoghq.com/blog/php-exception-profiling/
  tag: Blog
  text: ¿Por qué deberías tener en cuenta los perfiles de excepciones en PHP?
title: Activación de PHP Profiler
type: multi-code-lang
---

## Requisitos

Para obtener un resumen de las versiones mínimas y recomendadas del tiempo de ejecución y del rastreador en todos los lenguajes, consulta [Versiones de lenguaje y rastreadores compatibles][14].

Datadog Profiler requiere al menos PHP 7.1, en Linux de 64 bits.

Las compilaciones ZTS de PHP son compatibles desde la versión 0.99 o posterior de `dd-trace-php`, mientras que las compilaciones de depuración de PHP **no** son compatibles.

{{< tabs >}}
{{% tab "GNU C Linux" %}}

Se requiere un sistema operativo con glibc 2.17 o posterior. Las siguientes versiones o posteriores cumplen este requisito:
  - CentOS 7.
  - Debian 8, que ha llegado al final de su vida útil (EOL).
  - Ubuntu 14.04, que es EOL.

Datadog recomienda utilizar una versión del sistema operativo que no sea EOL.

{{% /tab %}}
{{% tab "Alpine Linux" %}}

Se requiere la versión 3.13 o posterior de Alpine Linux, ya que el generador de perfiles está basado en musl v1.2.

Además, es necesario instalar `libgcc_s` con:

```shell
apk add libgcc
```

{{% /tab %}}
{{< /tabs >}}

Las siguientes funciones de generación de perfiles están disponibles en las siguientes versiones mínimas de la librería `dd-trace-php`:

|      Función              | Versión requerida de `dd-trace-php`           |
|---------------------------|------------------------------------------|
| [Hotspots de código][12]       | v0.71 o posterior                                    |
| [Perfiles de endpoint][13]  | v0.79.0 o posterior                                  |
| [Cronología][15]            | v0.98.0 o posterior            |

Continuous Profiler no es compatible con algunas plataformas serverless, como AWS Lambda.

## Instalación

Para empezar a crear perfiles de aplicaciones:

1. Asegúrate de que el Datadog Agent v6 o posterior está instalado y en funcionamiento. Datadog recomienda utilizar el [Datadog Agent v7 o posterior][2].

2. Descarga el script `datadog-setup.php` de la [página de versiones de GitHub][3]. La versión 0.69.0 es la primera versión del rastreador que incluye este instalador.

3. Ejecuta el instalador para instalar tanto el rastreador como el generador de perfiles, por ejemplo `php datadog-setup.php --enable-profiling`. Este script es interactivo y pregunta en cuál de las localizaciones de PHP detectadas debe instalarse. Al final del script, muestra la versión no interactiva de los argumentos del comando para su uso futuro.

4. Configura el generador de perfiles utilizando el modo de configuración a través de la `datadog-setup.php`:

    ```
    # `datadog.profiling.enabled` is not required for v0.82.0+.
    php datadog-setup.php config set -d datadog.profiling.enabled=1

    php datadog-setup.php config set \
      -d datadog.service=app-name \
      -d datadog.env=prod \
      -d datadog.version=1.3.2

    php hello.php
    ```

    Apache, PHP-FPM y otros servidores requieren un reinicio después de cambiar los
ajustes de INI.

    Consulta [los documentos de configuración][4] para más ajustes INI.

5. Uno o dos minutos después de recibir una solicitud, los perfiles aparecen en la página [APM > Generador de perfiles][5].

## ¿No sabes qué hacer a continuación?

La guía [Empezando con el generador de perfiles][6] toma un ejemplo de servicio con un problema de rendimiento y te muestra cómo utilizar Continuous Profiler para comprender y solucionar el problema.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: /es/tracing/trace_collection/library_config/php/#environment-variable-configuration
[5]: https://app.datadoghq.com/profiling
[6]: /es/getting_started/profiler/
[12]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /es/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /es/profiler/enabling/supported_versions/
[15]: /es/profiler/profile_visualizations/#timeline-view
