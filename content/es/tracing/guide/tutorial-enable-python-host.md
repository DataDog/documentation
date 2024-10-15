---
further_reading:
- link: /tracing/trace_collection/library_config/python/
  tag: Documentación
  text: Opciones adicionales de configuración de bibliotecas de rastreo
- link: /tracing/trace_collection/dd_libraries/python/
  tag: Documentación
  text: Instrucciones detalladas de configuración de bibliotecas de rastreo
- link: /tracing/trace_collection/compatibility/python/
  tag: Documentación
  text: Marcos de trabajo compatibles Python para la instrumentación automática
- link: /tracing/trace_collection/custom_instrumentation/python/
  tag: Documentación
  text: Configuración manual de trazas (traces) y tramos (spans)
- link: https://github.com/DataDog/dd-trace-py
  tag: Código fuente
  text: Rastreo del repositorio de código fuente abierto de bibliotecas
title: Tutorial - Habilitación del rastreo de una aplicación Python en el mismo host
  que el Datadog Agent
---

## Información general

.Este tutorial te guiará a través de los pasos para habilitar el rastreo en una aplicación de ejemplo Python instalada en un host. En este caso, el Datadog Agent está instalado en el mismo host que la aplicación

{{< img src="tracing/guide/tutorials/tutorial-python-host-overview.png" alt="Diagrama que muestra el escenario de instalación de este tutorial" style="width:100%;" >}}

Para otros casos, incluyendo el de aplicaciones en contenedores, el del Agent en un contenedor y el de aplicaciones escritas en otros lenguajes, consulta [Tutoriales: Habilitación del rastreo][1].

Para obtener documentación general sobre la configuración del rastreo en Python, consulta [Rastreo de aplicaciones Python][2].

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Git
- Python que cumpla los [requisitos de las bibliotecas de rastreo][4]

## Instalación del Agent

Si no tienes instalado el Datadog Agent en tu máquina, ve a [**Integrations > Agent** (Integraciones > Agent)][5] y selecciona tu sistema operativo. Por ejemplo, en la mayoría de las plataformas Linux, puedes instalar el Agent ejecutando el siguiente script, sustituyendo `<YOUR_API_KEY>` por tu [clave de API Datadog][3]:

{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"
{{< /code-block >}}

Para enviar datos a un sitio Datadog distinto de `datadoghq.com`, sustituye la variable de entorno `DD_SITE` por [tu sitio Datadog ][6].

Si ya tienes un Agent instalado en el host, asegúrate de que es al menos la versión 7.28. Puedes consultar la versión mínima del Datadog Agent necesaria para utilizar las aplicaciones de rastreo Python `ddtrace` en la [documentación para desarrolladores de bibliotecas de rastreo][7].

Verifica que el Agent se está ejecutando y enviando datos a Datadog, accediendo a [**Events > Explorer** (Eventos > Explorador)][8]. También puedes filtrar por la faceta `Datadog` de origen y buscar un evento que confirme la instalación del Agent en el host:

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Event Explorer que muestra un mensaje de Datadog que indica que el Agent se ha instalado en un host." style="width:70%;" >}}

<div class="alert alert-info">Si al cabo de unos minutos no ves tu host en Datadog en (<strong>Infraestructure > Host map</strong> (Infraestructura > Asignación de hosts), asegúrate de haber utilizado la clave de API correcta para tu organización, disponible en <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a> (Parámetros de organización > Claves de API).</div>


## Instalación y ejecución de la aplicación de ejemplo Python

A continuación, instala una aplicación de ejemplo para rastrear. El código de ejemplo para este tutorial se puede encontrar en [github.com/Datadog/apm-tutorial-python][9]. Clona el repositorio git ejecutando:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-python.git
{{< /code-block >}}

Define, configura e instala dependencias Python para el ejemplo, utilizando Poetry o pip. Ejecuta uno de los siguientes:

{{< tabs >}}
{{% tab "Poetry" %}}

```shell
poetry install
```

{{% /tab %}}
{{% tab "pip" %}}

```shell
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

{{% /tab %}}
{{< /tabs >}}

Inicia la aplicación ejecutando:

{{% tabs %}}
{{% tab "Poetry" %}}

```shell
poetry run python -m notes_app.app
```

{{% /tab %}}

{{% tab "pip" %}}

```shell
python -m notes_app.app
```

{{% /tab %}}
{{< /tabs >}}

La aplicación de ejemplo `notes_app` es una API REST básica que almacena datos en una base de datos en la memoria. Abre otro terminal y utiliza `curl` para enviar unas cuantas solicitudes de API:

`curl -X GET 'localhost:8080/notes'`
: Devuelve `{}` porque todavía no hay nada en la base de datos

`curl -X POST 'localhost:8080/notes?desc=hello'`
: Añade una nota con la descripción `hello` y un valor ID de `1`. Devuelve `( 1, hello)`.

`curl -X GET 'localhost:8080/notes?id=1'`
: Devuelve la nota con el valor `id` de `1`: `( 1, hello)`

`curl -X POST 'localhost:8080/notes?desc=otherNote'`
: Añade una nota con la descripción `otherNote` y un valor ID de `2`. Devuelve `( 2, otherNote)`

`curl -X GET 'localhost:8080/notes'`
: Devuelve el contenido de la base de datos: `{ "1": "hello", "2": "otherNote" }`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: Actualiza el valor de la descripción de la primera nota a `UpdatedNote`

`curl -X DELETE 'localhost:8080/notes?id=1'`
: Elimina la primera nota de la base de datos

Ejecuta más llamadas a la API para ver la aplicación en acción. Cuando hayas terminado, pulsa Ctrl+C para detener la aplicación.

## Instalación del rastreo de Datadog

A continuación, instala la biblioteca de rastreo utilizando Poetry o pip (versión 18 como mínimo). Desde tu directorio `apm-tutorial-python`, ejecuta:

{{< tabs >}}
{{% tab "Poetry" %}}

```shell
poetry add ddtrace
poetry install

```

{{% /tab %}}
{{% tab "pip" %}}

```shell
pip install ddtrace
```

{{% /tab %}}
{{< /tabs >}}

## Para iniciar la aplicación Python con la instrumentación automática

Para empezar a generar y recopilar trazas, reinicia la aplicación de ejemplo de forma distinta a como lo has hecho anteriormente. Ejecuta:

{{< tabs >}}
{{% tab "Poetry" %}}

```shell
DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.1.0 \
 poetry run ddtrace-run python -m notes_app.app

```

{{% /tab %}}
{{% tab "pip" %}}

```shell
DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.1.0 \
 ddtrace-run python -m notes_app.app
```

{{% /tab %}}
{{< /tabs >}}

Este comando configura las variables de entorno `DD_SERVICE`, `DD_VERSION` y `DD_ENV` para habilitar el [etiquetado unificado de servicios[10], lo que permite correlacionar datos en Datadog.

Utiliza `curl` para volver a enviar solicitudes a la aplicación:

`curl -X GET 'localhost:8080/notes'`
: `{}`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `( 1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `( 1, hello)`

`curl -X POST 'localhost:8080/notes?desc=newNote'`
: `( 2, newNote)`

`curl -X GET 'localhost:8080/notes'`
: `{ "1": "hello", "2": "newNote" }`

Espera unos instantes y echa un vistazo a tu interfaz de usuario Datadog. Ve a [**APM > Traces** (APM > Trazas)][11]. La lista de trazas muestra algo como lo siguiente:

{{< img src="tracing/guide/tutorials/tutorial-python-host-traces.png" alt="Vista de las trazas que muestra los datos de rastreo provenientes del host." style="width:100%;" >}}

Si no ves trazas después de varios minutos, borra cualquier filtro en el campo de búsqueda de trazas (a veces se filtra sobre una variable de entorno como `ENV` que no estás utilizando).

### Análisis de una traza

En la página de trazas, haz clic en una traza `POST /notes` para ver un gráfico de llamas que muestra cuánto tiempo ha tardado cada tramo y qué otros tramos han ocurrido antes de que se completara un tramo. La barra de la parte superior del gráfico es el tramo seleccionado en la pantalla anterior (en este caso, el punto de entrada inicial en la aplicación de notas).

El ancho de una barra indica el tiempo que ha tardado en completarse. Una barra de menor profundidad representa un tramo que se completa durante el tiempo de vida de una barra a mayor profundidad.

El gráfico de llamas de una traza `POST` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-python-host-traces.png" alt="Gráfico de llamas de una traza POST." style="width:100%;" >}}

Una traza `GET /notes` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-python-host-get-flame.png" alt="Gráfico de llamas de una traza GET." style="width:100%;" >}}


## Añadir la instrumentación manual a la aplicación Python

La instrumentación automática es práctica, pero a veces prefieres utilizar tramos más precisos. La API de rastreo DD Python Datadog te permite especificar tramos en tu código mediante anotaciones o código.

Los siguientes pasos le guiarán a través de la adición de anotaciones al código para rastrear algunos métodos de ejemplo.

1. Abre `notes_app/notes_helper.py`.
2. Añade la siguiente importación:
   {{< code-block lang="python" >}}
from ddtrace import tracer{{< /code-block >}}

3. Dentro de la clase `NotesHelper`, añade un envoltorio del rastreador llamado `notes_helper` para ver mejor cómo funciona el método `notes_helper.long_running_process`:
   {{< code-block lang="python" >}}class NotesHelper:

    @tracer.wrap(service="notes_helper")
    def long_running_process(self):
        time.sleep(.3)
        logging.info("Hello from the long running process")
        self.__private_method_1(){{< /code-block >}}

   Ahora, el rastreador etiqueta (labels) automáticamente el recurso con el nombre de la función por la cual está envuelto, en este caso, `long_running_process`.

4. Reenvía algunas solicitudes HTTP, concretamente algunas solicitudes `GET`.
5. En el Trace Explorer, haz clic en una de las nuevas solicitudes `GET` y verás un gráfico de llamas como éste:

   {{< img src="tracing/guide/tutorials/tutorial-python-host-custom-flame.png" alt="Gráfico de llamas de una traza GET con instrumentación personalizada." style="width:100%;" >}}

   Observa el mayor nivel de detalle de la traza del stack tecnológico ahora que la función `get_notes` cuenta con el rastreo personalizado.

Para obtener más información, consulta la [instrumentación personalizada][12].

## Añadir una segunda aplicación para ver trazas distribuidas

El rastreo de una única aplicación es un buen comienzo, pero el verdadero valor del rastreo consiste en ver cómo fluyen las solicitudes a través de tus servicios. Esto se llama rastreo distribuido.

El proyecto de ejemplo incluye una segunda aplicación llamada `calendar_app` que devuelve una fecha aleatoria cada vez que se invoca. El endpoint `POST` de la aplicación de notas tiene un segundo parámetro de consulta llamado `add_date`. Cuando se configura en `y`, la aplicación de notas llama a la aplicación de calendario para obtener una fecha y añadirla a una nota.

1. Inicia la aplicación ejecutando:

   {{< tabs >}}
   {{% tab "Poetry" %}}

   ```shell
   DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.1.0 \
   poetry run ddtrace-run python -m calendar_app.app

   ```

   {{% /tab %}}
   {{% tab "pip" %}}

   ```shell
   DD_SERVICE=calendar DD_ENV=dev DD_VERSION=0.1.0 \
   ddtrace-run python -m calendar_app.app
   ```

   {{% /tab %}}
   {{< /tabs >}}

2. Envía una solicitud POST con el parámetro `add_date`:

   `curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
   : `(2, hello_again with date 2022-11-06)`


3. En el Trace Explorer, haz clic en esta última traza para ver un rastreo distribuido entre ambos servicios:

   {{< img src="tracing/guide/tutorials/tutorial-python-host-distributed.png" alt="Gráfico de llamas de una traza distribuida." style="width:100%;" >}}

## Añadir más instrumentación personalizada

Puedes añadir Instrumentación personalizada utilizando código. Supongamos que quieres instrumentar aún más el servicio de calendario para ver mejor la traza:

1. Abre `notes_app/notes_logic.py`.
2. Añade la siguiente importación:

   ```python
   from ddtrace import tracer
   ```
3. Dentro del bloque `try`, aproximadamente en la línea 28, añade la siguiente sentencia `with`:

   ```python
   with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
   ```
   Lo que da como resultado:
   {{< code-block lang="python" >}}
def create_note(self, desc, add_date=None):
        if (add_date):
            if (add_date.lower() == "y"):
                try:
                    with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
                        self.nh.another_process()
                    note_date = requests.get(f"http://localhost:9090/calendar")
                    note_date = note_date.text
                    desc = desc + " with date " + note_date
                    print(desc)
                except Exception as e:
                    print(e)
                    raise IOError("Cannot reach calendar service.")
        note = Note(description=desc, id=None)
        note.id = self.db.create_note(note){{< /code-block >}}

4. Envía algunas solicitudes HTTP más, concretamente solicitudes a `POST`, con el argumento `add_date`.
5. En el Trace Explorer, haz clic en una de las nuevas trazas `POST` para ver una traza personalizada a lo largo de varios servicios.
   {{< img src="tracing/guide/tutorials/tutorial-python-host-cust-dist.png" alt="Gráfico de llamas de una traza distribuida con instrumentación privada." style="width:100%;" >}}
   Observa el nuevo tramo etiquetado (labeled) `notes_helper.another_process`.

Si no recibes trazas como esperabas, configura el modo de depuración en el paquete Python `ddtrace`. Para obtener más información, consulta [Habilitar el modo de depuración][13].


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/guide/#enabling-tracing-tutorials
[2]: /es/tracing/trace_collection/dd_libraries/python/
[3]: /es/account_management/api-app-keys/
[4]: /es/tracing/trace_collection/compatibility/python/
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /es/getting_started/site/
[7]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-python
[10]: /es/getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /es/tracing/trace_collection/custom_instrumentation/python/
[13]: /es/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode