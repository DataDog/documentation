---
aliases:
- /es/getting_started/tracing/distributed-tracing
description: Configura el Monitoreo de Rendimiento de Aplicaciones (APM) para identificar
  cuellos de botella, solucionar problemas y enviar trazas a Datadog.
further_reading:
- link: /tracing/
  tag: Documentación
  text: Aprende más sobre las características de APM
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilita métricas de tiempo de ejecución
- link: /tracing/guide/#enabling-tracing-tutorials
  tag: Guías
  text: Tutoriales sobre diversas formas de habilitar el seguimiento
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: Centro de Aprendizaje
  text: Introducción a la Monitoreo de Rendimiento de Aplicaciones
- link: https://dtdg.co/fe
  tag: Habilitación de Fundamentos
  text: Únete a una sesión interactiva para mejorar tu comprensión de APM
title: Introducción al Trazado de APM
---
## Resumen {#overview}

El Monitoreo de Rendimiento de Aplicaciones (APM) de Datadog proporciona una profunda visibilidad en tus aplicaciones, permitiéndote identificar cuellos de botella en el rendimiento, solucionar problemas y optimizar tus servicios.

Esta guía demuestra cómo comenzar con APM y enviar tu primera traza a Datadog:

1. Configura Datadog APM para enviar trazas a Datadog.
1. Ejecuta tu aplicación para generar datos.
1. Explora los datos recopilados en Datadog.

## Requisitos previos {#prerequisites}

Para completar esta guía, necesitas lo siguiente:

1. [Crea una cuenta de Datadog][1] si aún no lo has hecho.
1. Encuentra o crea una [clave de API de Datadog][2].
1. Inicia un host o VM de Linux.

## Crea una aplicación {#create-an-application}

Para crear una aplicación para observar en Datadog:

1. En tu host o VM de Linux, crea una nueva aplicación de Python llamada `hello.py`. Por ejemplo, `nano hello.py`.
1. Agrega el siguiente código a `hello.py`:

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

## Configura Datadog APM {#set-up-datadog-apm}

Para configurar Datadog APM sin necesidad de modificar el código de tu aplicación o el proceso de implementación, utiliza la instrumentación APM de un solo paso, o alternativamente, puedes configurar APM utilizando las bibliotecas de [trazado de Datadog][8].


1. Ejecuta el comando de instalación:

   ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES=python:4 DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
    ```
 
    Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][2], `<YOUR_DD_SITE>` with your [Datadog site][7], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `development`).

1. Reinicia los servicios en tu host o VM.
1. Verifica que el agente esté en ejecución:

    ```shell
   sudo datadog-agent status
   ```

Este enfoque instala automáticamente el Agente de Datadog, habilita Datadog APM y [instrumenta][5] tu aplicación en tiempo de ejecución.

## Ejecuta la aplicación {#run-the-application}

Cuando configuras Datadog APM con Instrumentación de Un Solo Paso, Datadog instrumenta automáticamente tu aplicación en tiempo de ejecución.

Para ejecutar `hello.py`:

1. Crea un entorno virtual de Python en el directorio actual:

   ```shell
   python3 -m venv ./venv
   ```

1. Activa el `venv` entorno virtual:

   ```shell
   source ./venv/bin/activate
   ```

1. Instala `pip` y `flask`:

   ```shell
   sudo apt-get install python3-pip
   pip install flask
   ```

1. Establece el nombre del servicio y ejecuta `hello.py`:

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## Prueba la aplicación {#test-the-application}

Prueba la aplicación para enviar trazas a Datadog:

1. En un nuevo símbolo del sistema, ejecuta lo siguiente:

   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Confirma que se devuelve una cita aleatoria.
   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

Cada vez que ejecutes el comando `curl`, se envía una nueva traza a Datadog.

## Explora trazas en Datadog {#explore-traces-in-datadog}

1. En Datadog, ve a [**APM** > **Servicios**][3]. Deberías ver un servicio de Python llamado `hello`:

   {{< img src="/getting_started/apm/service-catalog.png" alt="El Catálogo de Software muestra el nuevo servicio de Python." style="width:100%;" >}}

1. Selecciona el servicio para ver sus métricas de rendimiento, como latencia, rendimiento y tasas de error.
1. Ve a [**APM** > **Trazas**][4]. Deberías ver una traza para el servicio `hello`:

   {{< img src="/getting_started/apm/trace-explorer.png" alt="El explorador de trazas muestra la traza para el servicio hello." style="width:100%;" >}}

1. Selecciona una traza para ver sus detalles, incluyendo el gráfico de llamas, que ayuda a identificar cuellos de botella en el rendimiento.

## Configuración avanzada de APM {#advanced-apm-setup}

Hasta este punto, permitiste que Datadog instrumentara automáticamente la `hello.py` aplicación utilizando Instrumentación de Paso Único. Este enfoque se recomienda si deseas capturar trazas esenciales a través de bibliotecas y lenguajes comunes sin modificar el código o instalar bibliotecas manualmente.

Sin embargo, si necesitas recopilar trazas de código personalizado o requieres un control más detallado, puedes agregar [instrumentación personalizada][6].

Para ilustrar esto, importarás el SDK de Python de Datadog en `hello.py` y crearás un tramo personalizado y una etiqueta de tramo.

Para agregar instrumentación personalizada:

1. Instala el SDK de Datadog:

   ```shell
   pip install ddtrace
   ```

1. Agrega las líneas resaltadas al código en `hello.py` para crear una etiqueta de tramo personalizada `get_quote` y una etiqueta de tramo personalizada `quote`:

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

1. Ejecuta `hello.py` en el entorno virtual de antes:
   ```shell
   ddtrace-run python hello.py
   ```
1. Ejecuta algunos comandos de `curl` en un símbolo del sistema separado:
   ```shell
   curl http://0.0.0.0:5050/
   ```
1. En Datadog, ve a [**APM** > **Trazas**][4].
1. Selecciona la traza **hello**.
1. Encuentra el nuevo tramo `get_quote` personalizado en el gráfico de llamas y pasa el cursor sobre él:

   {{< img src="/getting_started/apm/custom-instrumentation.png" alt="El tramo personalizado get_quote se muestra en el gráfico de llamas. Al pasar el cursor, se muestra la etiqueta de tramo de la cita. " style="width:100%;" >}}

1. Observa que la etiqueta de tramo personalizada `quote` se muestra en la pestaña **Info**.

## ¿Qué sigue? {#whats-next}

Después de configurar el seguimiento y tu aplicación esté enviando datos a Datadog, explora características adicionales de APM:

### Catálogo de Software {#software-catalog}

[Software Catalog][9] proporciona una vista consolidada de sus servicios, combinando metadatos de propiedad, información de rendimiento, análisis de seguridad y asignación de costos en un solo lugar. Configure los metadatos del servicio [service metadata][10] utilizando etiquetas, anotaciones o un archivo `service.datadog.yaml` para enriquecer su servicio con información de propiedad, runbooks y enlaces de documentación.

### Rastreo de ingestión y retención {#trace-ingestion-and-retention}

Controle los costos y gestione el volumen de datos configurando [controles de ingestión][11] y [filtros de retención][12]. Los controles de ingestión le permiten personalizar las tasas de muestreo a nivel del Datadog Agent o SDK, mientras que los filtros de retención determinan qué tramos se indexan para búsqueda y análisis.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/apm/traces
[5]: /es/tracing/glossary/#instrumentation
[6]: /es/tracing/trace_collection/custom_instrumentation/
[7]: /es/getting_started/site/
[8]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /es/internal_developer_portal/software_catalog/
[10]: /es/internal_developer_portal/software_catalog/entity_model/
[11]: /es/tracing/trace_pipeline/ingestion_controls/
[12]: /es/tracing/trace_pipeline/trace_retention/