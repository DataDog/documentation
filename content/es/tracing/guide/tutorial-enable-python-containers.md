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
  text: Marcos de trabajo compatibles Java para la instrumentación automática
- link: /tracing/trace_collection/custom_instrumentation/python/
  tag: Documentación
  text: Configuración manual de trazas (traces) y tramos (spans)
- link: https://github.com/DataDog/dd-trace-py
  tag: Código fuente
  text: Rastreo del repositorio de código fuente abierto de bibliotecas
title: Tutorial - Habilitación del rastreo de una aplicación Python y el Datadog Agent
  en contenedores
---

## Información general

Este tutorial te guiará a través de los pasos para habilitar el rastreo en una aplicación de ejemplo Python instalada en un contenedor. En este caso, también el Datadog Agent está instalado en un contenedor.

{{< img src="tracing/guide/tutorials/tutorial-python-containers-overview.png" alt="Diagrama que muestra el escenario de instalación de este tutorial" style="width:100%;" >}}

Para otros casos, incluyendo el de una aplicación y el Agent en un host, el de una aplicación en un contenedor y el Agent en un host y el de aplicaciones escritas en otros lenguajes, consulta [Tutoriales: Habilitación del rastreo][1].

Para obtener documentación general sobre la configuración del rastreo en Python, consulta [Rastreo de aplicaciones Python][2].

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Git
- Python que cumpla los [requisitos de las bibliotecas de rastreo][4]

## Instalación de la aplicación de ejemplo Python en Docker

El código de ejemplo para este tutorial está en GitHub, en [github.com/Datadog/apm-tutorial-python][9]. Para empezar, clona el repositorio:

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-python.git
{{< /code-block >}}

El repositorio contiene una aplicación Python de servicio múltiple preconfigurada para ejecutarse en contenedores Docker. La aplicación de ejemplo es una aplicación básica de notas con una API REST para añadir y modificar datos.

### Para iniciar y ejercitar la aplicación de ejemplo

1. Crea el contenedor de la aplicación ejecutando:

   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
{{< /code-block >}}

2. Inicia el contenedor:

   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml up db notes_app
{{< /code-block >}}

   La aplicación estará lista para su uso cuando veas el siguiente resultado en el terminal:

   ```
   notes          |  * Debug mode: on
   notes          | INFO:werkzeug:WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
   notes          |  * Running on all addresses (0.0.0.0)
   notes          |  * Running on http://127.0.0.1:8080
   notes          |  * Running on http://192.168.32.3:8080
   notes          | INFO:werkzeug:Press CTRL+C to quit
   notes          | INFO:werkzeug: * Restarting with stat
   notes          | WARNING:werkzeug: * Debugger is active!
   notes          | INFO:werkzeug: * Debugger PIN: 143-375-699
   ```

   También puedes verificar que se está ejecutando, observando los contenedores en ejecución con el comando `docker ps`.

3. Abre otro terminal y envía solicitudes API para ejercitar la aplicación. La aplicación de notas es una API REST que almacena datos en una base de datos Postgres en memoria que se ejecuta en otro contenedor. Envíale algunos comandos:

`curl -X GET 'localhost:8080/notes'`
: `{}`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes'`
: `{”1”, "hello"}`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: `(1, UpdatedNote)`

`curl -X DELETE 'localhost:8080/notes?id=1'`
: `Deleted`

### Detener la aplicación

Una vez que hayas comprobado que la aplicación se ejecuta, detenla para poder habilitar el rastreo en ella:

1. Detén los contenedores:
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml down
{{< /code-block >}}

2. Elimina los contenedores:
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml rm
{{< /code-block >}}

## Habilitación del rastreo

Ahora que ya tienes una aplicación Python en funcionamiento, configúrala para habilitar el rastreo.

1. Añada el paquete de rastreo Python a tu proyecto. Abre el archivo `apm-tutorial-python/requirements.txt` y añade `ddtrace` a la lista, si no está ya allí:

   ```
   flask==2.2.2
   psycopg2-binary==2.9.3
   requests==2.28.1
   ddtrace
   ```

2. Dentro del archivo Docker de la aplicación de notas, `docker/containers/exercise/Dockerfile.notes`, cambia la línea CMD que inicia la aplicación para utilizar el paquete `ddtrace`:

   ```
   # Run the application with Datadog 
   CMD ["ddtrace-run", "python", "-m", "notes_app.app"]
   ```

   De este modo, la aplicación se instrumenta automáticamente con servicios Datadog.

3. El [Etiquetado unificado de servicios][10] identifica servicios rastreados en diferentes versiones y entornos de despliegue, para que puedan correlacionarse en Datadog y puedas utilizarlos para buscar y filtrar. Las tres variables de entorno utilizadas para el etiquetado unificado de servicios son `DD_SERVICE`, `DD_ENV` y `DD_VERSION`. Añade las siguientes variables de entorno en el archivo Docker:

   ```
   ENV DD_SERVICE="notes"
   ENV DD_ENV="dev"
   ENV DD_VERSION="0.1.0"
   ```

4. Añade etiquetas (labels) Docker que correspondan a las etiquetas (tags) unificadas de servicios. Esto también te permite obtener métricas Docker una vez que se ejecute tu aplicación.

   ```
   LABEL com.datadoghq.tags.service="notes"
   LABEL com.datadoghq.tags.env="dev"
   LABEL com.datadoghq.tags.version="0.1.0"
   ```

Para comprobar que has configurado todo correctamente, compara tu archivo Docker con el proporcionado en el archivo de solución del repositorio de ejemplo, `docker/containers/solution/Dockerfile.notes`.

## Añadir el contenedor del Agent

Añade el Datadog Agent en la sección de servicios del archivo `docker/containers/exercise/docker-compose.yaml`:

1. Añade la configuración del Agent y especifica tu propia [clave de API Datadog][3] y tu [sitio][6]:
   ```yaml
     datadog:
       container_name: dd-agent
       image: "gcr.io/datadoghq/agent:latest"
       environment:
          - DD_API_KEY=<DD_API_KEY>
          - DD_SITE=datadoghq.com  # Default. Change to eu.datadoghq.com, us3.datadoghq.com, us5.datadoghq.com as appropriate for your org
          - DD_APM_ENABLED=true    # Enable APM
       volumes: 
          - /var/run/docker.sock:/var/run/docker.sock:ro 
          - /proc/:/host/proc/:ro
          - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
   ```

2. Añade la variable de entorno `DD_AGENT_HOST` y especifica el nombre de host del contenedor del Agent a la sección para cada contenedor con código que quieras monitorizar. En este caso, es el contenedor `notes_app`:
   ```yaml
       environment:
        - DD_AGENT_HOST=datadog
   ```

Para comprobar que has configurado todo correctamente, compara tu archivo `docker-compose.yaml`con el proporcionado en el archivo de solución del repositorio de ejemplo, `docker/containers/solution/docker-compose.yaml`.

## Inicio de los contenedores para observar el rastreo automático

Ahora que la biblioteca de rastreo está instalada, reinicia tu aplicación para empezar a recibir trazas. Ejecuta los siguientes comandos:

```
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
docker-compose -f docker/containers/exercise/docker-compose.yaml up db datadog notes_app
```

Para saber si el Agent está funcionando, observa los resultados continuos en el terminal, o abre el [Explorador de eventos][8] en Datadog y observa el evento de inicio del Agent:

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="Agent start event shown in Events Explorer" style="width:100%;" >}}

Con la aplicación en ejecución, envíale algunas solicitudes curl:

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `(1, hello)`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: `(1, UpdatedNote)`

`curl -X DELETE 'localhost:8080/notes?id=1'`
: `Deleted`

Espera unos instantes y ve a [**APM > Traces** (APM > Trazas)][11] en Datadog, donde podrás ver una lista de trazas correspondiente a tus llamadas de API:

{{< img src="tracing/guide/tutorials/tutorial-python-container-traces.png" alt="Trazas de la aplicación de ejemplo en APM Trace Explorer" style="width:100%;" >}}

Si no ves trazas después de varios minutos, borra cualquier filtro en el campo de búsqueda de trazas (a veces se filtra sobre una variable de entorno como `ENV` que no estás utilizando).

### Análisis de una traza

En la página de trazas, haz clic en una traza `POST /notes` para ver un gráfico de llamas que muestra cuánto tiempo ha tardado cada tramo y qué otros tramos han ocurrido antes de que se completara un tramo. La barra de la parte superior del gráfico es el tramo seleccionado en la pantalla anterior (en este caso, el punto de entrada inicial en la aplicación de notas).

El ancho de una barra indica el tiempo que ha tardado en completarse. Una barra de menor profundidad representa un tramo que se completa durante el tiempo de vida de una barra a mayor profundidad.

El gráfico de llamas de una traza `POST` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-python-container-post-flame.png" alt="Gráfico de llamas de una traza POST." style="width:100%;" >}}

Una traza `GET /notes` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-python-container-get-flame.png" alt="Gráfico de llamas de una traza GET." style="width:100%;" >}}


## Añadir la instrumentación manual a la aplicación Python

La instrumentación automática es práctica, pero a veces prefieres utilizar tramos más precisos. La API de rastreo DD Python Datadog te permite especificar tramos en tu código mediante anotaciones o código.

Los siguientes pasos te guiarán a través de la adición de anotaciones al código para rastrear algunos métodos de ejemplo.

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

   Ahora, el rastreador etiqueta (label) automáticamente el recurso con el nombre de la función por la cual está envuelto, en este caso, `long_running_process`.

4. Reconstruye los contenedores ejecutando:
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
docker-compose -f docker/containers/exercise/docker-compose.yaml up db datadog notes_app
{{< /code-block >}}
4. Reenvía algunas solicitudes HTTP, concretamente algunas solicitudes `GET`.
5. En el Trace Explorer, haz clic en una de las nuevas solicitudes `GET` y verás un gráfico de llamas como éste:

   {{< img src="tracing/guide/tutorials/tutorial-python-container-custom-flame.png" alt="Gráfico de llamas de una traza GET con instrumentación privada." style="width:100%;" >}}

   Observa el mayor nivel de detalle de la traza del stack tecnológico ahora que la función `get_notes` cuenta con el rastreo personalizado.

Para obtener más información, consulta la [instrumentación personalizada][12].

## Añadir una segunda aplicación para ver trazas distribuidas

El rastreo de una única aplicación es un buen comienzo, pero el verdadero valor del rastreo consiste en ver cómo fluyen las solicitudes a través de tus servicios. Esto se llama rastreo distribuido.

El proyecto de ejemplo incluye una segunda aplicación llamada `calendar_app` que devuelve una fecha aleatoria cada vez que se invoca. El endpoint `POST` de la aplicación de notas tiene un segundo parámetro de consulta llamado `add_date`. Cuando se configura en `y`, la aplicación de notas llama a la aplicación de calendario para obtener una fecha y añadirla a una nota.

1. Configura la aplicación de calendario para el rastreo añadiendo `dd_trace` al comando de inicio en el archivo Docker, como hiciste anteriormente para la aplicación de notas. Abre `docker/containers/exercise/Dockerfile.calendar` y actualiza la línea CMD de la siguiente forma:
   ```
   CMD ["ddtrace-run", "python", "-m", "calendar_app.app"] 
   ```

3. Aplica etiquetas (tags) unificadas de servicios, como lo hicimos para la aplicación de notas. Añade las siguientes variables de entorno en el archivo `Dockerfile.calendar`:

   ```
   ENV DD_SERVICE="calendar"
   ENV DD_ENV="dev"
   ENV DD_VERSION="0.1.0"
   ```

4. Nuevamente, añade etiquetas (labels) Docker que correspondan a las etiquetas (tags) unificadas de servicios. Esto también te permite obtener métricas Docker una vez que se ejecute tu aplicación.

   ```
   LABEL com.datadoghq.tags.service="calendar"
   LABEL com.datadoghq.tags.env="dev"
   LABEL com.datadoghq.tags.version="0.1.0"
   ```

2. Añade el nombre de host del contenedor del Agent, `DD_AGENT_HOST`, al contenedor de la aplicación de calendario para que envíe trazas a la localización correcta. Abre `docker/containers/exercise/docker-compose.yaml` y añade las siguientes líneas a la sección `calendar_app`:

   ```yaml
       environment:
        - DD_AGENT_HOST=datadog
   ```

   Para comprobar que has configurado todo correctamente, compara tu configuración con el archivo Docker y con los archivos `docker-config.yaml` proporcionados en el directorio `docker/containers/solution`del repositorio de ejemplo.

5. Crea la aplicación de servicio múltiple reiniciando los contenedores. En primer lugar, detén todos los contenedores en ejecución:
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml down
   ```

   A continuación, ejecuta los siguientes comandos para iniciarlos:
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml build
   docker-compose -f docker/containers/exercise/docker-compose.yaml up
   ```

6. Envía una solicitud POST con el parámetro `add_date`:

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `(2, hello_again with date 2022-11-06)`


7. En el Trace Explorer, haz clic en esta última traza para ver un rastreo distribuido entre ambos servicios:

   {{< img src="tracing/guide/tutorials/tutorial-python-container-distributed.png" alt="Gráfico de llamas de una traza distribuida." style="width:100%;" >}}

## Añadir más instrumentación personalizada

Puedes añadir Instrumentación personalizada utilizando código. Supongamos que quieres instrumentar aún más el servicio de calendario para ver mejor la traza:

1. Abre `notes_app/notes_logic.py`. 
2. Añadir la siguiente importación

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

4. Reconstruye los contenedores:
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
   docker-compose -f docker/containers/exercise/docker-compose.yaml up
   ```

5. Envía algunas solicitudes HTTP más, concretamente solicitudes a `POST`, con el argumento `add_date`.
6. En el Trace Explorer, haz clic en una de las nuevas trazas `POST` para ver una traza personalizada a lo largo de varios servicios.
   {{< img src="tracing/guide/tutorials/tutorial-python-container-cust-dist.png" alt="Gráfico de llamas de una traza distribuida con instrumentación privada." style="width:100%;" >}}
   Observa el nuevo tramo etiquetado (labeled) `notes_helper.another_process`.

Si no recibes trazas como esperabas, configura el modo de depuración en el paquete Python `ddtrace`. Para obtener más información, consulta [Habilitar el modo de depuración][13].


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/guide/#enabling-tracing-tutorials
[2]: /es/tracing/trace_collection/dd_libraries/python/
[3]: /es/account_management/api-app-keys/
[4]: /es/tracing/trace_collection/compatibility/python/
[6]: /es/getting_started/site/
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-python
[10]: /es/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /es/tracing/trace_collection/custom_instrumentation/python/
[13]: /es/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode