---
aliases:
- /es/tracing/faq/agent-5-tracing-setup
private: true
title: APM y Continuous Profiler con Agent v5
---

## Empezando

APM está disponible con las versiones 5.11 y superiores de Datadog Agent como parte del comando de instalación de una línea para los Agents Linux y Docker. Los usuarios de [Mac][1] y [Windows][2] deben realizar una instalación manual del APM Agent (también conocido como el Trace Agent) a través de un proceso de instalación independiente.

El Agent se puede habilitar al incluir lo siguiente en el [archivo de configuración del Datadog Agent][3]:

```conf
apm_enabled: true
```

<div class="alert alert-info">
APM está habilitado de forma predeterminada después de Datadog Agent 5.13 (en Linux y Docker), pero se puede deshabilitar al añadir el parámetro: <code>apm_enabled: no</code> en el archivo de configuración del Datadog Agent.
</div>

### Instalación del Agent

Se envían [métricas de rastreo][4] a Datadog a través del Datadog Agent. Para habilitar el rastreo:

Instala la última versión del [Datadog Agent][5] (se requiere la versión 5.11.0 o una superior).

### Ejecución del Agent en Docker

Para rastrear aplicaciones en contenedores Docker, utiliza la imagen [docker-dd-agent][6] (versión etiquetada 11.0.5110 o superior) y habilita el rastreo pasando `DD_APM_ENABLED=true` como una variable de entorno.

Para obtener más información, consulta [la página de Docker][7].

### Instrumentar solicitudes

{{< whatsnext desc="Selecciona uno de los siguientes lenguajes admitidos:">}}
    {{< nextlink href="tracing/setup/java" tag="Java" >}}Instrumentación en lenguaje Java.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/cpp" tag="C++" >}}Instrumentación en lenguaje C++.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/python" tag="Python" >}}Instrumentación en lenguaje Python.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/ruby" tag="Ruby" >}}Instrumentación en lenguaje Ruby.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/go" tag="Go" >}}Instrumentación en lenguaje Go.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/nodejs" tag="Nodejs" >}}Instrumentación en lenguaje Node.js.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/dotnet" tag=".NET" >}}Instrumentación en lenguaje .NET.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/php" tag="PHP" >}}Instrumentación en lenguaje PHP.{{< /nextlink >}}
{{< /whatsnext >}}

Para Instrumentar una aplicación escrita en un lenguaje que todavía no es compatible con una biblioteca oficial, consulta la [API de rastreo][8].

## Configuración

El Datadog Agent utiliza el archivo de configuración para las opciones de monitorización de infraestructura y de configuración de APM.

Además, algunas opciones de configuración pueden establecerse como variables de entorno. Ten en cuenta que las opciones establecidas como variables de entorno anulan los ajustes definidos en el archivo  de configuración.

| Configuración del archivo            | Variable de entorno       | Descripción                                                                                                                                                      |
|-------------------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apm_enabled`           | `DD_APM_ENABLED`           | El Datadog Agent acepta métricas de trazas (traces) cuando el valor se establece en `true`. El valor por defecto es `true`.                                                            |
| `receiver_port`         | `DD_RECEIVER_PORT`         | El puerto en el que debe escuchar el receptor de trazas (traces) del Datadog Agent. El valor por defecto es `8126`.                                                                  |
| `connection_limit`      | `DD_CONNECTION_LIMIT`      | El número de conexiones de cliente únicas que se permitirán durante un período de arrendamiento de 30 segundos. El valor por defecto es `2000`.                                                 |
| `resource`              | `DD_IGNORE_RESOURCE`       | Una lista de exclusión de expresiones regulares para filtrar trazas (traces) por su nombre de recurso.                                                                                  |

Para obtener más información sobre el Datadog Agent, consulta la [página de documentación específica][9] o el [archivo `datadog.conf.example`][10].

### Búsqueda de trazas (traces)

La búsqueda de trazas (traces) está disponible para el Agent 5.25.0 y versiones superiores. Para obtener más información, consulta las instrucciones de configuración en la [documentación principal de APM][11].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [el servicio de asistencia de Datadog][12].

[1]: https://github.com/DataDog/datadog-agent/tree/main/docs/trace-agent#run-on-macos
[2]: https://github.com/DataDog/datadog-agent/tree/main/docs/trace-agent#run-on-windows
[3]: /es/agent/faq/where-is-the-configuration-file-for-the-agent/
[4]: /es/tracing/glossary/#trace-metrics
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: https://gcr.io/datadoghq/docker-dd-agent
[7]: /es/tracing/docker/
[8]: /es/tracing/guide/send_traces_to_agent_by_api/
[9]: /es/agent/
[10]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[11]: /es/tracing/setup/?tab=agent5250#trace-search
[12]: /es/help/