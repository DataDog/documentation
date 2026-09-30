---
aliases:
- /es/getting_started/tracing/distributed-tracing
description: Configure Application Performance Monitoring (APM) para identificar cuellos
  de botella, solucionar problemas y enviar trazas a Datadog.
further_reading:
- link: /tracing/
  tag: Documentación
  text: Obtenga más información sobre funciones de APM
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilite las métricas de tiempo de ejecución
- link: /tracing/guide/#enabling-tracing-tutorials
  tag: Guías
  text: Tutoriales para diversas formas de habilitar el rastreo
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: Centro de aprendizaje
  text: Introducción a Application Performance Monitoring
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para mejorar su comprensión de APM
title: Introducción al rastreo de APM
---
## Descripción general {#overview}

Datadog Application Performance Monitoring (APM) proporciona una visibilidad profunda de sus aplicaciones, lo que le permite identificar cuellos de botella en el rendimiento, solucionar problemas y optimizar sus servicios.

Esta guía demuestra cómo comenzar con APM y enviar su primera traza a Datadog:

1. Configure Datadog APM para enviar trazas a Datadog.
1. Ejecute su aplicación para generar datos.
1. Explore los datos recopilados en Datadog.

{{< skill-callout
    title="Configure APM con un Agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Requisitos previos {#prerequisites}

Para completar esta guía, necesita lo siguiente:

1. [Cree una cuenta de Datadog][1] si aún no lo ha hecho.
1. Encuentre o cree una [clave de Datadog API][2].
1. Inicie un servidor o una VM Linux.

## Cree una aplicación {#create-an-application}

Para crear una aplicación para observar en Datadog:

1. En su servidor o VM de Linux, cree una nueva aplicación de Python llamada `hello.py`. Por ejemplo, `nano hello.py`.
1. Agregue el siguiente código a `hello.py`:

    {{< code-block lang="python" filename="hello.py" collapsible="true" disable_copy="false" >}}
  from flask import Flask
  import random

  app = Flask(__name__)
  
  quotes = [
      "Strive not to be a success, but rather to be of value. - Albert Einstein",
      "Believe you can and you're halfway there. - Theodore Roosevelt",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  ]
  
  @app.route('/')
  def index():
      quote = random.choice(quotes)+"\n"
      return quote
  
  if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5050)
  {{< /code-block >}}

## Configure Datadog APM {#set-up-datadog-apm}

Para configurar Datadog APM sin necesidad de modificar el código de su aplicación o el proceso de implementación, utilice la instrumentación de un solo paso de APM o, alternativamente, puede configurar APM utilizando bibliotecas de [Datadog tracing][8].


1. Ejecute el comando de instalación:

   ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES=python:4 DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
    ```
 
    Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][2], `<YOUR_DD_SITE>` with your [Datadog site][7], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `development`).

1. Reinicie los servicios en su servidor o VM.
1. Verifique que el Agent se esté ejecutando:

    ```shell
   sudo datadog-agent status
   ```

Este enfoque instala automáticamente el Datadog Agent, habilita Datadog APM e [instrumenta][5] su aplicación en tiempo de ejecución.

## Ejecute la aplicación {#run-the-application}

Cuando configura Datadog APM con la instrumentación de un solo paso, Datadog instrumenta automáticamente su aplicación en tiempo de ejecución.

Para ejecutar `hello.py`:

1. Cree un entorno virtual de Python en el directorio actual:

   ```shell
   python3 -m venv ./venv
   ```

1. Active el entorno virtual `venv`:

   ```shell
   source ./venv/bin/activate
   ```

1. Instale `pip` y `flask`:

   ```shell
   sudo apt-get install python3-pip
   pip install flask
   ```

1. Establezca el nombre del servicio y ejecute `hello.py`:

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## Pruebe la aplicación {#test-the-application}

Pruebe la aplicación para enviar trazas a Datadog:

1. En un nuevo símbolo del sistema, ejecute lo siguiente:

   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Confirme que se devuelva una cita aleatoria.
   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

Cada vez que ejecuta el comando `curl`, se envía una nueva traza a Datadog.

## Explore las trazas en Datadog {#explore-traces-in-datadog}

1. En Datadog, vaya a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][3]. Debería ver un servicio de Python llamado `hello`:

   {{< img src="/getting_started/apm/service-catalog.png" alt="El catálogo muestra el nuevo servicio de Python." style="width:100%;" >}}

1. Seleccione el servicio para ver sus métricas de rendimiento, como la latencia, el throughput y las tasas de error.
1. Vaya a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][4]. Debería ver una traza para el servicio `hello`:

   {{< img src="/getting_started/apm/trace-explorer.png" alt="El explorador de trazas muestra la traza para el servicio hello." style="width:100%;" >}}

1. Seleccione una traza para ver sus detalles, incluido el flame graph, que ayuda a identificar cuellos de botella en el rendimiento.

## Configuración avanzada de APM {#advanced-apm-setup}

Hasta este punto, permitió que Datadog instrumentara automáticamente la aplicación `hello.py` mediante la instrumentación de un solo paso (Single Step Instrumentation). Este enfoque se recomienda si desea capturar trazas esenciales en bibliotecas y lenguajes comunes sin modificar el código ni instalar bibliotecas manualmente.

Sin embargo, si necesita recopilar trazas de código personalizado o requiere un control más preciso, puede agregar [instrumentación personalizada][6].

Para ilustrar esto, importará el SDK de Python de Datadog en `hello.py` y creará un tramo personalizado y una etiqueta de tramo.

Para agregar instrumentación personalizada:

1. Instale el SDK de Datadog:

   ```shell
   pip install ddtrace
   ```

1. Agregue las líneas resaltadas al código en `hello.py` para crear un tramo personalizado `get_quote` y una etiqueta de tramo personalizada `quote`:

   {{< highlight python "hl_lines=3 15 17" >}}
    from flask import Flask
    import random
    from ddtrace import tracer

    app = Flask(__name__)

    quotes = [
        "Strive not to be a success, but rather to be of value. - Albert Einstein",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
    ]

    @app.route('/')
    def index():
        with tracer.trace("get_quote") as span:
            quote = random.choice(quotes)+"\n"
            span.set_tag("quote", quote)
            return quote

    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5050)
   {{< /highlight >}}

1. Ejecute `hello.py` en el entorno virtual anterior:
   ```shell
   ddtrace-run python hello.py
   ```
1. Ejecute algunos comandos de `curl` en un símbolo del sistema independiente:
   ```shell
   curl http://0.0.0.0:5050/
   ```
1. En Datadog, vaya a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][4].
1. Seleccione la traza `hello`.
1. Busque el nuevo tramo personalizado `get_quote` en el flame graph y pase el cursor sobre él:

   {{< img src="/getting_started/apm/custom-instrumentation.png" alt="El tramo personalizado get_quote se muestra en el flame graph. Al pasar el cursor, se muestra la etiqueta de tramo quote. " style="width:100%;" >}}

1. Observe que la etiqueta de tramo personalizada `quote` se muestra en la pestaña {{< ui >}}Info{{< /ui >}}.

## ¿Qué sigue? {#whats-next}

Después de configurar el rastreo y de que su aplicación envíe datos a Datadog, explore funciones adicionales de APM:

### Catalog {#catalog}

[Catalog][9] proporciona una vista consolidada de sus servicios, combinando metadatos de propiedad, información sobre el rendimiento, análisis de seguridad y asignación de costos en un solo lugar. Configure [service metadata][10] usando etiquetas, anotaciones o un archivo `service.datadog.yaml` para enriquecer sus servicios con información de propiedad, runbooks y enlaces a documentación.

### Ingesta y retención de trazas {#trace-ingestion-and-retention}

Controle los costos y administre el volumen de datos configurando [controles de ingesta][11] y [filtros de retención][12]. Los controles de ingesta le permiten personalizar las tasas de muestreo a nivel del Datadog Agent o del SDK, mientras que los filtros de retención determinan qué tramos se indexan para búsqueda y análisis.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/apm/traces
[5]: /es/tracing/glossary/#instrumentation
[6]: /es/tracing/trace_collection/custom_instrumentation/
[7]: /es/getting_started/site/
[8]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /es/internal_developer_portal/catalog/
[10]: /es/internal_developer_portal/catalog/entity_model/
[11]: /es/tracing/trace_pipeline/ingestion_controls/
[12]: /es/tracing/trace_pipeline/trace_retention/