---
further_reading:
- link: /tracing/trace_collection/library_config/go/
  tag: Documentación
  text: Opciones adicionales de configuración de la biblioteca de rastreo
- link: /tracing/trace_collection/dd_libraries/go/
  tag: Documentación
  text: Instrucciones de configuración detalladas de la biblioteca de rastreo
- link: /tracing/trace_collection/compatibility/go/
  tag: Documentación
  text: Marcos de Go compatibles para la instrumentación automática
- link: /tracing/trace_collection/custom_instrumentation/go/
  tag: Documentación
  text: Configuración manual de trazas y tramos
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: Documentación
  text: Mecanismos de ingesta
- link: https://github.com/DataDog/dd-trace-Go
  tag: Código fuente
  text: Repositorio de código fuente abierto de la biblioteca de rastreo
title: 'Tutorial: Activación del rastreo para una aplicación Go en Amazon ECS con
  EC2'
---

## Información general

Este tutorial te guía a través de los pasos para activar el rastreo en una aplicación Go de ejemplo instalada en un clúster en AWS Elastic Container Service (ECS). En este escenario, el Datadog Agent también está instalado en el clúster.

Para otros casos, incluyendo la aplicación y el Agent en un host, la aplicación en un contenedor y el Agent en un host, la aplicación y el Agent en infraestructura en la nube y aplicaciones escritas en otros lenguajes, consulta [Tutoriales: Activación del rastreo][1]. Algunos de esos otros tutoriales, por ejemplo, los que utilizan contenedores o EKS, repasan las diferencias vistas en Datadog entre la instrumentación automática y personalizada. Este tutorial pasa directamente a un ejemplo personalizado instrumentado totalmente.

Este tutorial también utiliza temas de nivel intermedio de AWS, por lo que requiere que tengas cierta familiaridad con las redes y aplicaciones de AWS. Si no estás tan familiarizado con AWS, y estás tratando de aprender lo básico de la configuración de APM en Datadog, utiliza uno de los tutoriales de host o contenedor.

Consulta [Rastreo de aplicaciones Go][2] para obtener documentación general sobre la configuración del rastreo para Go.

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Git
- Docker
- Terraform
- Amazon ECS
- Un repositorio de Amazon ECR para alojar imágenes
- Un usuario de AWS IAM con permiso `AdministratorAccess`. Debes añadir el perfil a tu archivo de credenciales local utilizando las claves de acceso y claves de acceso secreto. Para obtener más información, lee [Configuración del SDK de AWS para Go V2][4].

## Instalar la aplicación Go de ejemplo

A continuación, instala una aplicación de ejemplo para rastrear. El código de ejemplo para este tutorial se puede encontrar en [github.com/DataDog/apm-tutorial-golang.git][5]. Clona el repositorio git ejecutando:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

El repositorio contiene una aplicación Go multiservicio preconfigurada para ejecutarse dentro de contenedores de Docker. Los archivos YAML `docker-compose` para crear los contenedores se encuentran en el directorio `docker`. Este tutorial utiliza el archivo `service-docker-compose-ECS.yaml`, que crea contenedores para los servicios `notes` y `calendar` que componen la aplicación de ejemplo.

### Configuración inicial del ECS

La aplicación requiere una breve configuración inicial, incluyendo la adición de tu perfil de AWS (ya configurado con los permisos correctos para crear un clúster de ECS y leer en ECR), región de AWS y el repositorio de Amazon ECR.

Abre `terraform/EC2/global_constants/variables.tf`. Sustituye los valores de las variables siguientes por la información correcta de tu cuenta de AWS:

```tf
output "aws_profile" {
    value = "<AWS_PROFILE>"
    sensitive = true
}

output "aws_region" {
    value = "<AWS_REGION>"
    sensitive = true
}

output "aws_ecr_repository" {
    value = "<AWS_ECR_REPOSITORY_URL>"
    sensitive = true
}
```

Deja la sección `datadog_api_key` comentada por ahora. Configurarás Datadog más adelante en el tutorial.

### Crear y cargar las imágenes de la aplicación

Si no estás familiarizado con Amazon ECR, un registro para imágenes de contenedor, puede servirte leer [Uso de Amazon ECR con la AWS CLI][6].

En el directorio `/docker` del proyecto de ejemplo, ejecuta los siguientes comandos:

1. Autentícate con ECR introduciendo tu nombre de usuario y contraseña en este comando:
   {{< code-block lang="shell" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>{{< /code-block >}}

2. Crea una imagen de Docker para las aplicaciones de ejemplo, ajustando la configuración de la plataforma para que coincida con la tuya:
   {{< code-block lang="shell" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build{{< /code-block >}}

3. Etiqueta los contenedores con el destino de ECR:
   {{< code-block lang="shell" >}}
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

4. Carga el contenedor en el registro de ECR:
   {{< code-block lang="shell" >}}
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

Tu aplicación (sin el rastreo activado) está en un contenedor y está disponible para que ECS la extraiga.

### Despliegue de la aplicación

Inicia la aplicación y envía algunas solicitudes sin rastreo. Después de haber visto cómo funciona la aplicación, la instrumentarás utilizando la biblioteca de rastreo y el Datadog Agent.

Para comenzar, utiliza un script de Terraform para realizar el despliegue en Amazon ECS:

1. Desde el directorio `terraform/EC2/deployment`, ejecuta los siguientes comandos:

   ```shell
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

   **Nota**: Si el comando `terraform apply` devuelve un mensaje de bloqueo de CIDR, el script para obtener tu dirección IP no ha funcionado en tu máquina local. Para solucionarlo, establece el valor manualmente en el archivo `terraform/EC2/deployment/security.tf`. Dentro del bloque `ingress` del `load_balancer_security_group`, cambia la línea `cidr_blocks` que está comentada y actualiza la línea de ejemplo now-uncommented con la dirección IP4 de tu máquina.

2. Anota el nombre del DNS del equilibrador de carga. Utilizarás ese dominio base en las llamadas a la API de la aplicación de ejemplo. Espera unos minutos a que se inicien las instancias.

3. Abre otro terminal y envía solicitudes API para ejercitar la aplicación. La aplicación de notas es una API REST que almacena datos en una base de datos H2 en memoria que se ejecuta en el mismo contenedor. Envíale algunos comandos:

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=hello'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes?id=1'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X PUT 'BASE_DOMAIN:8080/notes?id=1&desc=UpdatedNote'`
   : `{"id":1,"description":"UpdatedNote"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"UpdatedNote"}]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=NewestNote&add_date=y'`
   : `{"id":2,"description":"NewestNote with date 12/02/2022."}`

      Este comando llama tanto al servicio `notes` como a `calendar`.

4. Una vez que hayas visto que la aplicación está funcionando, ejecuta el siguiente comando para detenerla y limpiar los recursos de AWS para que puedas habilitar el rastreo:
   {{< code-block lang="shell" >}}
terraform destroy{{< /code-block >}}


## Activación del rastreo

A continuación, configura la aplicación Go para habilitar el rastreo.

Para activar el soporte de rastreo:

1. Para activar el rastreo automático, elimina los comentarios de las siguientes importaciones en `apm-tutorial-golang/cmd/notes/main.go`:

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
     sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
     chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
     httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
     "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   {{< /code-block >}}

1. En la función `main()`, elimina los comentarios de las siguientes líneas:

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   tracer.Start()
   defer tracer.Stop(){{< /code-block >}}

   {{< code-block lang="go" >}}
   client = httptrace.WrapClient(client, httptrace.RTWithResourceNamer(func(req *http.Request) string {
      return fmt.Sprintf("%s %s", req.Method, req.URL.Path)
   }))
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   r.Use(chitrace.Middleware(chitrace.WithServiceName("notes"))){{< /code-block >}}

1. En `setupDB()`, elimina los comentarios de las siguientes líneas:
   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   sqltrace.Register("sqlite3", &sqlite3.SQLiteDriver{}, sqltrace.WithServiceName("db"))
   db, err := sqltrace.Open("sqlite3", "file::memory:?cache=shared"){{< /code-block >}}

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   db, err := sql.Open("sqlite3", "file::memory:?cache=shared"){{< /code-block >}}

1. Los pasos anteriores habilitaron el rastreo automático con bibliotecas completamente compatibles. En los casos en los que el código no entre dentro de una biblioteca compatible, puedes crear tramos manualmente.

   Abre `notes/notesController.go`. Este ejemplo ya contiene código comentado que demuestra las diferentes formas de configurar el rastreo personalizado en el código.

1. La función `makeSpanMiddleware` en `notes/notesController.go` genera middleware que envuelve una solicitud en un tramo (span) con el nombre suministrado. Elimina los comentarios de las siguientes líneas:

   {{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
     r.Get("/notes", nr.GetAllNotes)                // GET /notes
     r.Post("/notes", nr.CreateNote)                // POST /notes
     r.Get("/notes/{noteID}", nr.GetNoteByID)       // GET /notes/123
     r.Put("/notes/{noteID}", nr.UpdateNoteByID)    // PUT /notes/123
     r.Delete("/notes/{noteID}", nr.DeleteNoteByID) // DELETE /notes/123{{< /code-block >}}

   {{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
     r.Get("/notes", makeSpanMiddleware("GetAllNotes", nr.GetAllNotes))               // GET /notes
     r.Post("/notes", makeSpanMiddleware("CreateNote", nr.CreateNote))                // POST /notes
     r.Get("/notes/{noteID}", makeSpanMiddleware("GetNote", nr.GetNoteByID))          // GET /notes/123
     r.Put("/notes/{noteID}", makeSpanMiddleware("UpdateNote", nr.UpdateNoteByID))    // PUT /notes/123
     r.Delete("/notes/{noteID}", makeSpanMiddleware("DeleteNote", nr.DeleteNoteByID)) // DELETE /notes/123
   {{< /code-block >}}

   Elimina también el comentario de la siguiente importación:

   {{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"{{< /code-block >}}

1. La función `doLongRunningProcess` crea tramos (spans) secundarios a partir de un contexto primario. Elimina los comentarios para habilitarla:
   {{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
   func doLongRunningProcess(ctx context.Context) {
    childSpan, ctx := tracer.StartSpanFromContext(ctx, "traceMethod1")
    childSpan.SetTag(ext.ResourceName, "NotesHelper.doLongRunningProcess")
    defer childSpan.Finish()

    time.Sleep(300 * time.Millisecond)
    log.Println("Hello from the long running process in Notes")
    privateMethod1(ctx)
  }{{< /code-block >}}

1. La función `privateMethod1` demuestra la creación de un servicio completamente independiente de un contexto. Elimina los comentarios para habilitarla:

   {{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
   func privateMethod1(ctx context.Context) {
    childSpan, _ := tracer.StartSpanFromContext(ctx, "manualSpan1",
      tracer.SpanType("web"),
      tracer.ServiceName("noteshelper"),
    )
    childSpan.SetTag(ext.ResourceName, "privateMethod1")
    defer childSpan.Finish()

    time.Sleep(30 * time.Millisecond)
    log.Println("Hello from the custom privateMethod1 in Notes")
   }{{< /code-block >}}

   Para obtener más información sobre el rastreo personalizado, consulta [Instrumentación personalizada de Go][7].

1. El [Etiquetado unificado de servicios][8] identifica servicios rastreados en diferentes versiones y entornos de despliegue, para que puedan correlacionarse en Datadog y puedas utilizarlos para buscar y filtrar. Las tres variables de entorno utilizadas para el etiquetado unificado de servicios son `DD_SERVICE`, `DD_ENV` y `DD_VERSION`. Para las aplicaciones desplegadas en ECS, estas variables de entorno se configuran dentro de la definición de tarea para los contenedores.

   Para este tutorial, el archivo `/terraform/EC2/deployment/main.tf` ya tiene definidas estas variables de entorno para las aplicaciones de notas y calendario. Por ejemplo, para `notes`:

   ```yaml
   {
    ...

      name : "notes-task",
      image : "${module.settings.aws_ecr_repository}:notes",
      essential : true,
      portMappings : [
        {
          containerPort : 8080,
          hostPort : 8080
        }
      ],
      memory : 512,
      cpu : 256,
      environment : [
        {
          name : "CALENDAR_HOST",
          value : "calendar.apmlocalgo"
        },
        {
          name : "DD_SERVICE",
          value : "notes"
        },
        {
          name : "DD_ENV",
          value : "dev"
        },
        {
          name : "DD_VERSION",
          value : "0.0.1"
        }
      ],
      dockerLabels : {
        "com.datadoghq.tags.service" : "notes",
        "com.datadoghq.tags.env" : "dev",
        "com.datadoghq.tags.version" : "0.0.1"
      },
    },

    ...
   ```
   Y para `calendar`:

   ```yaml
   ...

      name : "calendar-task",
      image : "${module.settings.aws_ecr_repository}:calendar",
      essential : true,
      environment : [
        {
          name : "DD_SERVICE",
          value : "calendar"
        },
        {
          name : "DD_ENV",
          value : "dev"
        },
        {
          name : "DD_VERSION",
          value : "0.0.1"
        }
      ],
      dockerLabels : {
        "com.datadoghq.tags.service" : "calendar",
        "com.datadoghq.tags.env" : "dev",
        "com.datadoghq.tags.version" : "0.0.1"
      },
    ...
   ```

   También puedes ver que se configuran las etiquetas (labels) de Docker para los mismos valores de etiquetas unificadas de servicios `service` , `env` y `version`. Esto también te permite obtener métricas de Docker una vez que tu aplicación se esté ejecutando.

### Reconstrucción  y carga de la imagen de la aplicación

Reconstruye la imagen con el rastreo activado siguiendo los [mismos pasos que antes](#build-and-upload-the-application-images):

{{< code-block lang="shell" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

Tu aplicación de multiservicio con rastreo activado está en contenedores y se encuentra disponible para su extracción por ECS.

## Despliegue del Agent en ECS

A continuación, despliega el Datadog Agent para recopilar los datos de traza de tu aplicación instrumentada. Para un entorno de ECS, no debes descargar nada para ejecutar el Agent. En su lugar, sigue estos pasos para crear una definición de tarea de Datadog Agent, carga la definición de tarea en AWS, y crea un servicio de Agent en tu clúster utilizando esa definición de tarea.

1. Abre `terraform/EC2/dd_agent_task_definition.json`, que proporciona una configuración básica para ejecutar el Agent con el rastreo de APM activado. Proporciona la clave de API de tu organización de Datadog y el sitio de Datadog según corresponda:

   ```yaml
   ...
   "environment": [
     {
       "name": "DD_API_KEY",
       "value": "<API_KEY_HERE>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     ...
   ```

2. Registra la definición de la tarea del Agent, sustituyendo el perfil y la región por tu información. Desde la carpeta `terraform/EC2`, ejecuta:

   {{< code-block lang="shell" >}}
   aws ecs register-task-definition --cli-input-json file://dd_agent_task_definition.json --profile <AWS_PROFILE> --region <AWS_REGION>{{< /code-block >}}

   En la salida, anota el valor `taskDefinitionArn`, que se utilizará en el paso siguiente.

3. Crea el servicio del Agent en el clúster ejecutando este comando, al brindar el ARN de definición de tarea del paso anterior, tu perfil de AWS y la región de AWS:

   {{< code-block lang="shell" >}}
   aws ecs create-service --cluster apm-tutorial-ec2-go --task-definition <TASK_DEFINITION_ARN> --launch-type EC2 --scheduling-strategy DAEMON --service-name datadog-agent --profile <PROFILE> --region <AWS_REGION>{{< /code-block >}}

## Inicio de la aplicación para ver trazas

Vuelve a desplegar la aplicación y ejercita la API:

1. Vuelve a implementar la aplicación en Amazon ECS utilizando los [mismos comandos de Terraform que antes](#deploy-the-application), pero con la versión instrumentada de los archivos de configuración. Desde el directorio `terraform/EC2/deployment`, ejecuta los siguientes comandos:

   ```shell
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

2. Anota el nombre del DNS del equilibrador de carga. Utilizarás ese dominio básico en las llamadas de la API a la aplicación de ejemplo.

3. Espera unos minutos a que se inicien las instancias. Espera unos minutos para asegurarte de que los contenedores para las aplicaciones están listos. Ejecuta algunos comandos curl para ejercitar la aplicación instrumentada:

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=hello'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes?id=1'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X PUT 'BASE_DOMAIN:8080/notes?id=1&desc=UpdatedNote'`
   : `{"id":1,"description":"UpdatedNote"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=NewestNote&add_date=y'`
   : `{"id":2,"description":"NewestNote with date 12/02/2022."}`
   : Este comando llama tanto al servicio `notes` como a `calendar`.

4. Espera unos instantes y echa un vistazo a tu interfaz de usuario de Datadog. Navega a [**APM > Traces**][9] (APM > Trazas). La lista de trazas muestra algo como esto:
   {{< img src="tracing/guide/tutorials/tutorial-go-host-traces2.png" alt="Vista de trazas que muestra los datos de traza entrantes desde el host." style="width:100%;" >}}

   Hay entradas para la base de datos (`db`) y la aplicación `notes`. La lista de trazas muestra todos los tramos, cuándo se iniciaron, qué recurso se rastreó con el tramo y cuánto tiempo tardó.

Si no ves trazas, borra cualquier filtro en el campo de búsqueda **Traces** (Trazas) (a veces filtra en una variable de entorno como `ENV` que no estás usando).

### Análisis de una traza

En la página Traces (Trazas), haz clic en una traza `POST /notes`, para ver una gráfica de llamas que muestra cuánto tiempo tardó cada tramo y qué otros tramos ocurrieron antes de que se completara un tramo. La barra de la parte superior de la gráfica es el tramo que seleccionaste en la pantalla anterior (en este caso, el punto de entrada inicial en la aplicación de notas).

El ancho de una barra indica el tiempo que ha tardado en completarse. Una barra más angosta representa un tramo que se completa durante el tiempo de vida de una barra de mayor ancho.

La gráfica de llamas de una traza `POST` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-go-host-post-flame.png" alt="Una gráfica de llamas para una traza POST." style="width:100%;" >}}

Una traza `GET /notes` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-go-host-get-flame.png" alt="Una gráfica de llamas para una traza GET." style="width:100%;" >}}

Para obtener más información, consulta la [instrumentación personalizada][7].

El rastreo de una única aplicación es un buen comienzo, pero el verdadero valor del rastreo consiste en ver cómo fluyen las solicitudes a través de tus servicios. Esto se llama _rastreo distribuido_. Haz clic en la traza de la última llamada a la API, la que ha añadido una fecha a la nota, para ver una traza distribuida entre ambos servicios:

{{< img src="tracing/guide/tutorials/tutorial-go-host-distributed.png" alt="Una gráfica de llamas para una traza distribuida." style="width:100%;" >}}

Esta gráfica de llamas combina interacciones de múltiples aplicaciones:
- El primer tramo es una solicitud POST enviada por el usuario y gestionada por el enrutador `chi` a través de la biblioteca `go-chi` compatible.
- El segundo tramo es una función `createNote` que fue rastreada manualmente por la función `makeSpanMiddleware`. La función creó un tramo a partir del contexto de la solicitud HTTP.
- El siguiente tramo es la solicitud enviada por la aplicación de notas utilizando la biblioteca `http` compatible y el cliente inicializado en el archivo `main.go`. Esta solicitud GET se envía a la aplicación de calendario. Los tramos de la aplicación de calendario aparecen en azul porque son servicios independientes.
- Dentro de la aplicación de calendario, un enrutador `go-chi` gestiona la solicitud GET y la función `GetDate` se rastrea manualmente con su propio tramo bajo la solicitud GET.
- Por último, la llamada `db` púrpura es su propio servicio de la biblioteca `sql` compatible. Aparece en el mismo nivel que la solicitud `GET /Calendar` porque ambas son llamadas por el tramo primario `CreateNote`.

Cuando hayas terminado de explorar, limpia todos los recursos y elimina los despliegues:

{{< code-block lang="shell" >}}
terraform destroy
{{< /code-block >}}

## Solucionar problemas

Si no recibes trazas como esperabas, configura el modo de depuración para el trazador de Go. Lee [Activar el modo de depuración][10] para obtener más información.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/guide/#enabling-tracing-tutorials
[2]: /es/tracing/trace_collection/dd_libraries/go/
[3]: /es/account_management/api-app-keys/
[4]: https://aws.github.io/aws-sdk-go-v2/docs/configuring-sdk/#specifying-credentials
[5]: https://github.com/DataDog/apm-tutorial-golang
[6]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
[7]: /es/tracing/trace_collection/custom_instrumentation/go/
[8]: /es/getting_started/tagging/unified_service_tagging/
[9]: https://app.datadoghq.com/apm/traces
[10]: /es/tracing/troubleshooting/tracer_debug_logs/?code-lang=go