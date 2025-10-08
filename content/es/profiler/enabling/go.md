---
aliases:
- /es/tracing/profiler/enabling/go/
code_lang: go
code_lang_weight: 30
further_reading:
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con el generador de perfiles
- link: profiler/profile_visualizations
  tag: Documentación
  text: Más información sobre las visualizaciones de perfiles disponibles
- link: profiler/profiler_troubleshooting/go
  tag: Documentación
  text: Solucionar los problemas que surjan al utilizar el generador de perfiles
title: Activación de Go Profiler
type: multi-code-lang
---

El generador de perfiles se incluye en las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][1] para tu aplicación, puedes omitir la instalación de librería e ir directamente a habilitar el generador de perfiles.

## Requisitos

Para obtener un resumen de las versiones mínimas y recomendadas del tiempo de ejecución y del rastreador en todos los lenguajes, consulta [Versiones de lenguaje y rastreadores compatibles][18].

Datadog Profiler requiere Go 1.19+.

Para [Hotspots de código][2] y [Perfiles de endpoint][3], utiliza `dd-trace-go` versión 1.37.0+.

Continuous Profiler no es compatible con las plataformas serverless, como AWS Lambda.

## Instalación

Para empezar a crear perfiles de aplicaciones:

1. Asegúrare de que Datadog Agent v6+ está instalado y en funcionamiento. Datadog recomienda utilizar [Datadog Agent v7+][19].

2. Obtén `dd-trace-go` utilizando el comando:

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1/profiler
    ```

     **Nota**: El generador de perfiles está disponible en la librería `dd-trace-go` para las versiones 1.23.0+.

3. Importa el [generador de perfiles][6] al inicio de tu aplicación:

    ```Go
    import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
    ```

4. Añade el siguiente fragmento para iniciar el generador de perfiles:

    ```Go
    err := profiler.Start(
        profiler.WithService("<SERVICE_NAME>"),
        profiler.WithEnv("<ENVIRONMENT>"),
        profiler.WithVersion("<APPLICATION_VERSION>"),
        profiler.WithTags("<KEY1>:<VALUE1>", "<KEY2>:<VALUE2>"),
        profiler.WithProfileTypes(
          profiler.CPUProfile,
          profiler.HeapProfile,
          // The profiles below are disabled by default to keep overhead
          // low, but can be enabled as needed.

          // profiler.BlockProfile,
          // profiler.MutexProfile,
          // profiler.GoroutineProfile,
        ),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

4. Opcional: activa la [función de línea de tiempo][7] (fase beta), consulta [requisitos previos][8].

5. Opcional: configura [la integración de código fuente][9] para conectar tus datos de perfiles con tus repositorios Git.

6. Después de uno o dos minutos, visualizarás tus perfiles en la página [Datadog APM > Generador de perfiles][10].

**Nota**: Por defecto, solo están habilitados los perfiles CPU y Heap. Utiliza [profiler.WithProfileTypes][11] para habilitar [tipos de perfil][12] adicionales.

## Configuración

Puedes configurar los parámetros del generador de perfiles en el código con estas funciones:

| Función | Tipo          | Descripción                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | Cadena        | El nombre del [servicio][13] de Datadog, por ejemplo, `my-web-app`.             |
|  WithEnv         | Cadena        | El nombre de [entorno][14] de Datadog, por ejemplo, `production`.         |
|  WithVersion     | Cadena        | La versión de tu aplicación.                                                                             |
|  WithTags        | Lista de cadenas        | Una lista de etiquetas (tags) para aplicar a un perfil cargado. Las etiquetas deben tener el formato `<KEY>:<VALUE>`. |

También puedes establecer la configuración del generador de perfiles utilizando las variables de entorno:

| Variable de entorno                             | Tipo          | Descripción                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                                         | Cadena        | El nombre de [entorno][13], por ejemplo, `production`. |
| `DD_SERVICE`                                     | Cadena        | El nombre de [servicio][13], por ejemplo, `web-backend`. |
| `DD_VERSION`                                     | Cadena        | La [versión][13] de tu servicio. |
| `DD_TAGS`                                        | Cadena        | Las etiquetas para aplicar a un perfil cargado. Debe ser un lista de `<key>:<value>` separados por comas como: `layer:api,team:intake`.   |

### Mostrar las llamadas a la función C en los perfiles de CPU

Por defecto, el perfil de la CPU de Go solo muestra información detallada del código Go. Si tu programa llama a código C, el tiempo de ejecución del código C se refleja en el perfil, pero los stacks de llamadas solo muestran las llamadas a la función Go.

Para añadir información detallada de llamadas a la función C a los perfiles de CPU, puedes optar por utilizar la librería como [ianlancetaylor/cgosymbolizer][14]. Para utilizar esta biblioteca:

1. Descarga el paquete dle sitio:

    ```shell
    go get github.com/ianlancetaylor/cgosymbolizer@latest
    ```

2. Añade la siguiente importación en cualquier parte de tu programa:

    ```Go
    import _ "github.com/ianlancetaylor/cgosymbolizer"
    ```

**Nota**: Esta biblioteca se considera experimental. Puede causar bloqueos (poco frecuentes) en programas que utilicen excepciones C++, o que utilicen bibliotecas como `tcmalloc`, que también recopilan stacks de llamadas.

## Ahorra hasta un 14% de CPU en producción con PGO

A partir de [Go 1.21][15], el compilador Go admite la Optimización Guiada por Perfil (PGO). La PGO permite optimizaciones adicionales en el código identificado como caliente por los perfiles de CPU de las cargas de trabajo de producción. Es compatible con el [Datadog Go Continuous Profiler][2] y puede utilizarse para compilaciones de producción.

Sigue [esta guía][16] para configurarlo.

## ¿No sabes qué hacer a continuación?

La guía [Empezando con el generador de perfiles][17] toma un ejemplo de servicio con un problema de rendimiento y te muestra cómo utilizar Continuous Profiler para comprender y solucionar el problema.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[3]: /es/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[4]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[5]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[7]: /es/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[8]: /es/profiler/connect_traces_and_profiles/#prerequisites
[9]: /es/integrations/guide/source-code-integration/?tab=go
[10]: https://app.datadoghq.com/profiling
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[12]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[13]: /es/getting_started/tagging/unified_service_tagging
[14]: https://pkg.go.dev/github.com/ianlancetaylor/cgosymbolizer#pkg-overview
[15]: https://tip.golang.org/doc/go1.21
[16]: /es/profiler/guide/save-cpu-in-production-with-go-pgo
[17]: /es/getting_started/profiler/
[18]: /es/profiler/enabling/supported_versions/
[19]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
