---
aliases:
- /es/getting_started/tracing/distributed-tracing
further_reading:
- link: /tracing/
  tag: Documentación
  text: Más información sobre las funciones de APM
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Activar métricas de tiempo de ejecución
- link: /tracing/guide/#enabling-tracing-tutorials
  tag: Guías
  text: Tutoriales sobre distintas formas de activar el rastreo
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: Centro de aprendizaje
  text: Introducción a Application Performance Monitoring
- link: https://dtdg.co/fe
  tag: Establecer las bases
  text: Participa en una sesión interactiva para mejorar tu comprensión de APM
title: Empezando con el rastreo de APM
---

## Información general

Datadog Application Performance Monitoring (APM) proporciona una amplia visibilidad de tus aplicaciones, lo que te permite identificar cuellos de botella en el rendimiento, solucionar problemas y optimizar tus servicios.

Esta guía muestra cómo empezar a utilizar APM y enviar tu primer traza (trace) a Datadog:

1. Configura Datadog APM para enviar trazas a Datadog.
1. Ejecuta tu aplicación para generar datos.
1. Explora los datos recopilados en Datadog.

## Requisitos previos

Para completar esta guía, necesitas lo siguiente:

1. [Crea una cuenta de Datadog ][1] si aún no lo has hecho.
1. Busca o crea una [clave de Datadog API][2].
1. Inicia un host o VM de Linux.

## Crear una aplicación

Para crear una aplicación para observar en Datadog:

1. En tu host o VM de Linux, crea una nueva aplicación de Python llamada `hello.py`. Por ejemplo, `nano hello.py`.
1. Añade el siguiente código a `hello.py`:

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

## Configurar Datadog APM

Para configurar Datadog APM sin necesidad de modificar el código o el proceso de despliegue de tu aplicación, utiliza la instrumentación APM de un solo paso. También puedes configurar APM utilizando [bibliotecas de rastreo de Datadog][8].


1. Ejecuta el comando de instalación:

   ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES=python:3 DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
    ```

    Sustituye `<YOUR_DD_API_KEY>` por tu [clave de API de Datadog][2], `<YOUR_DD_SITE>` por tu [sitio de Datadog][7] y `<AGENT_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `development`).

1. Reinicia tus servicios en tu host o VM.
1. Comprueba que Agent esté en funcionamiento:

    ```shell
   sudo datadog-agent status
   ```

Este enfoque instala automáticamente el Datadog Agent, habilita Datadog APM e [instrumenta][5] tu aplicación en el tiempo de ejecución.

## Ejecutar la aplicación

Cuando configures Datadog APM con la instrumentación de un solo paso, Datadog instrumentará automáticamente tu aplicación en el tiempo de ejecución.

Para ejecutar `hello.py`:

1. Crea un entorno virtual de Python en el directorio actual:

   ```shell
   python3 -m venv ./venv
   ```

1. Activa la página de entorno virtual `venv`:

   ```shell
   source ./venv/bin/activate
   ```

1. Instala `pip` y `flask`:

   ```shell
   sudo apt-get install python3-pip
   pip install flask
   ```

1. Establece el nombre de servicio y ejecuta `hello.py`:

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## Probar la aplicación

Prueba la aplicación para enviar trazas a Datadog:

1. En un nuevo símbolo del sistema, ejecuta lo siguiente:

   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Confirma que se devuelve una cita aleatoria.
   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

Cada vez que se ejecuta el comando `curl`, se envía una nueva traza a Datadog.

## Explorar trazas en Datadog

1. En Datadog, ve a [**APM** > **Services**][3] (APM > Servicios). Deberías ver un servicio de Python llamado `hello`:

   {{< img src="/getting_started/apm/service-catalog.png" alt="El Catálogo de software muestra el nuevo servicio Python." style="width:100%;" >}}

1. Selecciona el servicio para ver tus métricas de rendimiento, como la latencia, el rendimiento y las tasas de error.
1. Ve a [**APM** > **Traces**][4] (APM >Trazas). Deberías ver una traza para el servicio `hello`:

   {{< img src="/getting_started/apm/trace-explorer.png" alt="El Trace Explorer muestra la traza del servicio hello." style="width:100%;" >}}

1. Selecciona una traza para ver sus detalles, incluida la gráfica de llamas, que ayuda a identificar los cuellos de botella en el rendimiento.

## Configuración avanzada de APM

Hasta este punto, Datadog ha instrumentado automáticamente la aplicación `hello.py` mediante la instrumentación de un solo paso. Este enfoque es recomendado si deseas capturar trazas esenciales a través de librerías y lenguajes comunes sin tocar código o instalar manualmente bibliotecas.

Sin embargo, si necesitas recopilar trazas desde código personalizado o requieres un control más preciso, puedes añadir [Instrumentación personalizada][6].

Para ilustrar esto, importarás la librería de rastreo de Datadog Python en `hello.py` y crearás un tramo (span) y una etiqueta (tag) de tramo personalizados.

Para añadir instrumentación personalizada:

1. Instala la librería de rastreo de Datadog:

   ```shell
   pip install ddtrace
   ```

1. Añade las líneas resaltadas al código en `hello.py` para crear una etiqueta de tramo personalizada `get_quote` y una etiqueta de tramo personalizada `quote`:

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

1. Ejecuta `hello.py` en el entorno virtual anterior:
   ```shell
   ddtrace-run python hello.py
   ```
1. Ejecuta algunos comandos de `curl` en una línea de comandos independiente:
   ```shell
   curl http://0.0.0.0:5050/
   ```
1. En Datadog, ve a [**APM** > **Traces* (APM > Trazas)][4].
1. Selecciona la traza **hello**.
1. Busca el nuevo tramo `get_quote` personalizado en la gráfica de llamas y pasa el ratón sobre él:

   {{< img src="/getting_started/apm/custom-instrumentation.png" alt="El tramo personalizado get_quote muestra la gráfica de llamas. Si pasas el ratón sobre él, se muestra la etiqueta de tramo quote. " style="width:100%;" >}}

1. Observa que la etiqueta de tramo personalizada `quote` aparece en la pestaña **Info** (Información).


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/apm/traces
[5]: /es/tracing/glossary/#instrumentation
[6]: /es/tracing/trace_collection/custom_instrumentation/
[7]: /es/getting_started/site/
[8]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
