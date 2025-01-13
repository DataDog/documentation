---
aliases:
- /es/tracing/llm_observability/trace_an_llm_application
- /es/llm_observability/trace_an_llm_application
further_reading:
- link: https://www.datadoghq.com/blog/llm-observability-chain-tracing/
  tag: Blog
  text: Obtén observabilidad granular de LLM instrumentando tus cadenas de LLM
- link: /llm_observability/submit_evaluations
  tag: Guía
  text: Enviar evaluaciones a LLM Observability
title: Configurar LLM Observability
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

## Información general

Para comenzar a enviar datos a LLM Observability, instrumenta tu aplicación con el [SDK de LLM Observability para Python][1] o llamando a la [API de LLM Observability][2]. 

Puedes visualizar las interacciones y los datos de rendimiento de tus aplicaciones de LLM en la página [**LLM Observability Traces**][3], donde cada solicitud atendida por tu aplicación se representa como una traza (trace).

{{< img src="llm_observability/traces.png" alt="Una traza de LLM Observability que muestra cada tramo de una solicitud" style="width:100%;" >}}

Para obtener más información sobre las trazas, consulta [Términos y conceptos][4] y decide qué opción de instrumentación se adapta mejor a las necesidades de tu aplicación.

## Instrumentar una aplicación de LLM

Datadog proporciona [instrumentación automática][4] para capturar llamadas de LLM para bibliotecas de proveedores de LLM específicos. Sin embargo, la instrumentación manual de tu aplicación de LLM mediante el SDK de LLM Observability para Python permite el acceso a funciones de LLM Observability adicionales.

<div class="alert alert-info">Estas instrucciones usan el <a href="/llm_observability/setup/sdk">SDK de LLM Observability para Python</a>. Si tu aplicación se ejecuta en un entorno sin servidor, sigue las <a href="/llm_observability/setup/sdk/#aws-lambda-setup">instrucciones de configuración sin servidor</a>. </br></br>Si tu aplicación no está escrita en Python, puedes completar los pasos a continuación con solicitudes de API en lugar de llamadas a funciones del SDK.</div>

Para Instrumentar una aplicación de LLM:

1. [Instala el SDK de LLM Observability para Python][5].
1. Configura el SDK proporcionando [las variables de entorno requeridas][6] en el comando de inicio de tu aplicación o programáticamente [en el código][7]. Asegúrate de haber configurado tu clave de API de Datadog, el sitio de Datadog y el nombre de la aplicación de machine learning (ML).

## Rastrear una aplicación de LLM

Para rastrear una aplicación de LLM:

1. [Crea tramos (spans)](#creating-spans) en el código de tu aplicación de LLM para representar las operaciones de tu aplicación. Para obtener más información sobre los tramos, consulta [Términos y conceptos][4].

   Puedes [anidar tramos](#nesting-spans) para crear trazas más útiles. Para obtener ejemplos adicionales y detalles sobre el uso, consulta [Rastrear una aplicación de LLM][8] y la [documentación del SDK][9].

1. [Anota tus tramos](#annotating-spans) con datos de entrada, datos de salida, metadatos (como `temperature`), métricas (como `input_tokens`) y etiquetas (tags) clave-valor (como `version:1.0.0`).
1. Opcionalmente, añade [funciones de rastreo avanzadas](#advanced-tracing), como sesiones de usuario.
1. Ejecuta tu aplicación de LLM.
    - Si utilizaste el método de configuración de la línea de comandos, el comando para ejecutar tu aplicación debe usar `ddtrace-run`, como se describe en [esas instrucciones][6].
    - Si utilizaste el método de configuración en código, ejecuta tu aplicación como lo harías normalmente.

Puedes acceder a las trazas resultantes en la pestaña **Traces** de la página [**LLM Observability Traces**][3] y a las métricas resultantes en el [dashboard LLM Observability Overview][10] listo para usar.

### Creación de tramos

Para crear un tramo, el SDK de LLM Observability ofrece dos opciones: utilizar un decorador de funciones o utilizar un gestor de contexto en línea.

El método preferido es utilizar un decorador de funciones. El uso de un gestor de contexto es más avanzado y permite un control más detallado del rastreo.

Decoradores
: Usa `ddtrace.llmobs.decorators.<SPAN_KIND>()` como decorador en la función que deseas rastrear, reemplazando  `<SPAN_KIND>` con el [tipo de tramo][4] deseado.

En línea
: Usa `ddtrace.llmobs.LLMObs.<SPAN_KIND>()` como un gestor de contexto para [rastrear cualquier código en línea][12], reemplazando  `<SPAN_KIND>` con el [tipo de tramo][4] deseado.

Los siguientes ejemplos crean un tramo de flujo de trabajo.

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def extract_data(document):
    ... # Flujo de trabajo impulsado por LLM que extrae datos de estructura de un documento
    return
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def extract_data(document):
    with LLMObs.workflow(name="extract_data") as span:
        ... # Flujo de trabajo impulsado por LLM que extrae datos de estructura de un documento
    return
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Anotar tramos

Para añadir información adicional a un tramo, como entradas, salidas, metadatos, métricas o etiquetas, utiliza el método [`LLMObs.annotate()`][11] del SDK de LLM Observability.

Los ejemplos siguientes anotan el tramo de flujo de trabajo creado en el [ejemplo anterior](#creating-spans):

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def extract_data(document: str, generate_summary: bool):
    extracted_data = ... # lógica de la aplicación del usuario
    LLMObs.annotate(
        input_data=document,
        output_data=extracted_data,
        metadata={"generate_summary": generate_summary},
        tags={"env": "dev"},
    )
    return extracted_data
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def extract_data(document: str, generate_summary: bool):
    with LLMObs.workflow(name="extract_data") as span:
        ... # lógica de la aplicación del usuario
        extracted_data = ... # user application logic
        LLMObs.annotate(
            input_data=document,
            output_data=extracted_data,
            metadata={"generate_summary": generate_summary},
            tags={"env": "dev"},
        )
        return extracted_data
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Anidación de tramos

Al iniciar un nuevo tramo antes de que finalice el tramo actual, se rastrea automáticamente una relación principal-secundario entre los dos tramos. El tramo principal representa la operación más grande, mientras que el tramo secundario representa una suboperación anidada más pequeña dentro de él.

Los ejemplos siguientes crean una traza con dos tramos.

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task, workflow

@workflow
def extract_data(document):
    preprocess_document(document)
    ... # realiza la extracción de datos en el documento
    return

@task
def preprocess_document():
    ... # preprocesa un documento para la extracción de datos
    return
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def extract_data():
    with LLMObs.workflow(name="extract_data") as workflow_span:
        with LLMObs.task(name="preprocess_document") as task_span:
            ... # preprocesa un documento para la extracción de datos
        ... # realiza la extracción de datos en el documento
    return
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Para obtener más información sobre métodos de rastreo alternativos y funciones de rastreo, consulta la [documentación del SDK][1].

### Rastreo avanzado

Dependiendo de la complejidad de tu aplicación de LLM, también puedes:

- [Rastrear sesiones de usuarios][12] especificando un `session_id`.
- [Conservar un tramo entre contextos o ámbitos][13] iniciándolo y deteniéndolo manualmente.
- [Rastrear varias aplicaciones de LLM][14] al iniciar una nueva traza, lo que puede resultar útil para diferenciar entre servicios o ejecutar múltiples experimentos.
- [Enviar evaluaciones personalizadas][15] como comentarios de los usuarios de tu aplicación de LLM (por ejemplo, calificación de 1 a 5) con el [SDK][1] o la [API][2].

## Permisos

De forma predeterminada, solo los usuarios con el [rol de lectura de Datadog][16] pueden ver LLM Observability. Para obtener más información, consulta la [documentación sobre permisos][17].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/setup/sdk
[2]: /es/llm_observability/setup/api
[3]: https://app.datadoghq.com/llm/traces
[4]: /es/llm_observability/terms
[5]: /es/llm_observability/setup/sdk/#installation
[6]: /es/llm_observability/setup/sdk/#command-line-setup
[7]: /es/llm_observability/setup/sdk/#in-code-setup
[8]: /es/llm_observability/quickstart
[9]: /es/llm_observability/setup/sdk/#tracing-spans
[10]: https://app.datadoghq.com/dash/integration/llm_analytics
[11]: /es/llm_observability/setup/sdk/#annotating-a-span
[12]: /es/llm_observability/setup/sdk/#annotating-a-span
[13]: /es/llm_observability/setup/sdk/#tracking-user-sessions
[14]: /es/llm_observability/setup/sdk/#tracing-multiple-applications
[15]: /es/llm_observability/submit_evaluations
[16]: /es/account_management/rbac/#datadog-default-roles
[17]: /es/account_management/rbac/permissions/#llm-observability