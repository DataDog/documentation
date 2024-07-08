---
further_reading:
- link: /tracing/trace_collection/library_config/java/
  tag: Documentación
  text: Opciones adicionales de configuración de la biblioteca de rastreo
- link: /tracing/trace_collection/dd_libraries/java/
  tag: Documentación
  text: Instrucciones de configuración detalladas de la biblioteca de rastreo
- link: /tracing/trace_collection/compatibility/java/
  tag: Documentación
  text: Marcos de Java compatibles para la instrumentación automática
- link: /tracing/trace_collection/custom_instrumentation/java/
  tag: Documentación
  text: Configuración manual de trazas y tramos
- link: https://github.com/DataDog/dd-trace-java
  tag: Código fuente
  text: Repositorio de código fuente abierto de la biblioteca de rastreo
title: 'Tutorial: Activación del rastreo para una aplicación Java en Amazon ECS con
  EC2'
---

## Información general

Este tutorial te guía a través de los pasos para activar el rastreo en una aplicación Java de ejemplo instalada en un clúster en AWS Elastic Container Service (ECS). En este escenario, el Datadog Agent también está instalado en el clúster.

Para otros casos, incluyendo el de un host, un contenedor, otra infraestructura en la nube y aplicaciones escritas en otros lenguajes, consulta [Tutoriales: Activación del rastreo][1]. Algunos de esos otros tutoriales, por ejemplo, los que utilizan contenedores o EKS, repasan las diferencias vistas en Datadog entre instrumentación automática y personalizada. Este tutorial pasa directamente a un ejemplo personalizado instrumentado totalmente.

Este tutorial también utiliza temas de nivel intermedio de AWS, por lo que requiere que tengas cierta familiaridad con las redes y aplicaciones de AWS. Si no estás tan familiarizado con AWS, y estás tratando de aprender lo básico de la configuración de APM en Datadog, utiliza uno de los tutoriales de host o contenedor.

Para obtener documentación general sobre la configuración del rastreo en Java, consulta [Rastreo de aplicaciones Java][2].

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Git
- Docker
- Terraform
- Amazon ECS
- Un repositorio de AWS ECR para alojar imágenes
- Un usuario de AWS IAM con permiso `AdministratorAccess`. Debes añadir el perfil a tu archivo de credenciales local utilizando las claves de acceso y claves de acceso secreto. Para obtener más información, consulta el [uso del archivo de credenciales y los perfiles de credenciales de AWS][20].

## Instalación de la aplicación Java de ejemplo

El código de ejemplo para este tutorial está en GitHub, en [github.com/DataDog/apm-tutorial-java-host][9]. Para empezar, clona el repositorio:

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

El repositorio contiene una aplicación Java multiservicios preconfigurada para ejecutarse dentro de contenedores de Docker. Los archivos YAML `docker-compose` para la creación de contenedores se encuentran en el directorio `docker`. Este tutorial utiliza el archivo `service-docker-compose-ECS.yaml`, que crea contenedores para la aplicación.

En cada uno de los directorios `notes` y `calendar`, hay dos conjuntos de archivos de Docker para crear aplicaciones, ya sea con Maven o con Gradle. Este tutorial utiliza la creación con Maven, pero si Gradle te resulta más sencillo, puedes utilizarlo en su lugar con los cambios correspondientes en los comandos de creación.

La aplicación de ejemplo es una aplicación Java multiservicio sencilla con dos API, una para el servicio `notes` y otra para el servicio `calendar`. El servicio `notes` tiene endpoints `GET`, `POST`, `PUT` y `DELETE` para notas almacenadas en una base de datos H2 en la memoria. El servicio `calendar` puede recibir una solicitud y devolver una fecha aleatoria para utilizarla en una nota. Ambas aplicaciones tienen sus propias imágenes de Docker asociadas y se despliegan en Amazon ECS como servicios independientes, cada una con sus propias tareas y contenedores respectivos. ECS extrae las imágenes de ECR, un repositorio de imágenes de aplicaciones en el que se publican las imágenes tras la compilación.

### Configuración inicial de ECS

La aplicación requiere una breve configuración inicial, incluyendo la adición de tu perfil de AWS (ya configurado con los permisos correctos para crear un clúster de ECS y leer en ECR), región de AWS y el repositorio de AWS ECR.

Abre `terraform/EC2/global_constants/variables.tf`. Sustituye los valores de las variables siguientes por la información correcta de tu cuenta de AWS:

```
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

### Crear y cargar las imágenes de la aplicación

Si no estás familiarizado con Amazon ECR, un registro para imágenes de contenedor, puede servirte leer [Uso de Amazon ECR con la AWS CLI][17].

En el directorio `/docker` del proyecto de ejemplo, ejecuta los siguientes comandos:

1. Autentícate con ECR introduciendo tu nombre de usuario y contraseña en este comando:
   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>{{< /code-block >}}

2. Crea una imagen de Docker para las aplicaciones de ejemplo, ajustando la configuración de la plataforma para que coincida con la tuya:
   {{< code-block lang="sh" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build{{< /code-block >}}

3. Etiqueta los contenedores con el destino de ECR:
   {{< code-block lang="sh" >}}
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

4. Carga el contenedor en el registro de ECR:
   {{< code-block lang="sh" >}}
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

Tu aplicación (sin el rastreo activado) está en un contenedor y está disponible para que ECS la extraiga.


### Despliegue de la aplicación

Inicia la aplicación y envía algunas solicitudes sin rastreo. Después de haber visto cómo funciona la aplicación, la instrumentarás utilizando la biblioteca de rastreo y el Datadog Agent.

Para empezar, utiliza un script Terraform para desplegar en Amazon ECS:

1. Desde el directorio `terraform/EC2/deployment`, ejecuta los siguientes comandos:

   ```sh
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
   {{< code-block lang="sh" >}}
terraform destroy{{< /code-block >}}

## Activación del rastreo

Ahora que ya tienes una aplicación Java en funcionamiento, configúrala para habilitar el rastreo.

1. Añade el paquete de rastreo Java a tu proyecto. Como el Agent se ejecuta en instancias de EC2, asegúrate de que los archivos Docker están correctamente configurados y que no es necesario instalar nada. Abre el archivo `notes/dockerfile.notes.maven` y elimina los comentarios de la línea que descarga `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Dentro del mismo archivo `notes/dockerfile.notes.maven`, comenta la línea `ENTRYPOINT` para una ejecución sin rastreo. A continuación, elimina los comentarios de la línea `ENTRYPOINT`, que ejecuta la aplicación con el rastreo habilitado:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   Repite este paso para el otro servicio, `calendar`. Abre `calendar/dockerfile.calendar.maven` y comenta la línea `ENTRYPOINT` para ejecutar sin rastreo. A continuación, elimina los comentarios de la línea `ENTRYPOINT`, que ejecuta la aplicación con el rastreo habilitado:

   ```
   ENTRYPOINT ["java", "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   Ahora ambos servicios tendrán la instrumentación automática.

   <div class="alert alert-warning"><strong>Nota</strong>: Los indicadores de estos comandos de muestreo, en particular la frecuencia de muestreo, no son necesariamente apropiados para entornos fuera de este tutorial. Para obtener información sobre qué utilizar en tu entorno real , lee <a href="#tracing-configuration">Configuración de rastreo</a>.</div>

3. La instrumentación automática es práctica, pero a veces es preferible utilizar tramos más precisos. La API de rastreo DD Java de Datadog te permite especificar tramos en tu código mediante anotaciones o código. Añade algunas anotaciones al código para rastrear en algunos métodos de ejemplo.

   Abre `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java`. Este ejemplo ya contiene código comentado que muestra las diferentes formas de configurar el rastreo personalizado en el código.

4. Elimina los comentarios de las líneas que importan bibliotecas para permitir el rastreo manual:

   ```java
   import datadog.trace.api.Trace;
   import datadog.trace.api.DDTags;
   import io.opentracing.Scope;
   import io.opentracing.Span;
   import io.opentracing.Tracer;
   import io.opentracing.tag.Tags;
   import io.opentracing.util.GlobalTracer;
   import java.io.PrintWriter;
   import java.io.StringWriter
   ```

5. Elimina los comentarios de las líneas que rastrean manualmente los dos procesos públicos. Éstas muestran el uso de anotaciones `@Trace` para especificar aspectos como `operationName` y `resourceName` en una traza:
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

6. También puedes crear un tramo independiente para un bloque de código específico en la aplicación. Dentro del tramo, añade etiquetas (tags) de servicio y de nombre de recurso, y etiquetas de gestión de errores. Estas etiquetas dan como resultado una gráfica de llamas que muestra tramos y métricas en visualizaciones de Datadog. Elimina los comentarios de las líneas que rastrean manualmente el método privado:

   ```java
           Tracer tracer = GlobalTracer.get();
           // Tags can be set when creating the span
           Span span = tracer.buildSpan("manualSpan1")
               .withTag(DDTags.SERVICE_NAME, "NotesHelper")
               .withTag(DDTags.RESOURCE_NAME, "privateMethod1")
               .start();
           try (Scope scope = tracer.activateSpan(span)) {
               // Tags can also be set after creation
               span.setTag("postCreationTag", 1);
               Thread.sleep(30);
               Log.info("Hello from the custom privateMethod1");
   ```
   Y también las líneas que fijan etiquetas en los errores:
   ```java
        } catch (Exception e) {
            // Set error on span
            span.setTag(Tags.ERROR, true);
            span.setTag(DDTags.ERROR_MSG, e.getMessage());
            span.setTag(DDTags.ERROR_TYPE, e.getClass().getName());

            final StringWriter errorString = new StringWriter();
            e.printStackTrace(new PrintWriter(errorString));
            span.setTag(DDTags.ERROR_STACK, errorString.toString());
            Log.info(errorString.toString());
        } finally {
            span.finish();
        }
   ```

7. Actualiza tu compilación Maven al abrir `notes/pom.xml` y eliminar los comentarios de las líneas que configuran dependencias para el rastreo manual. La biblioteca `dd-trace-api` se utiliza para las anotaciones `@Trace`, y `opentracing-util` y `opentracing-api` se utilizan para la creación manual de tramos.

8. El [Etiquetado unificado de servicios][10] identifica servicios rastreados en diferentes versiones y entornos de despliegue, para que puedan correlacionarse en Datadog y puedas utilizarlos para buscar y filtrar. Las tres variables de entorno utilizadas para el etiquetado unificado de servicios son `DD_SERVICE`, `DD_ENV` y `DD_VERSION`. Para las aplicaciones desplegadas con ECS, estas variables de entorno se configuran dentro de la definición de tarea para los contenedores.

   Para este tutorial, el archivo `/terraform/EC2/deployment/main.tf` ya tiene definidas estas variables de entorno para las aplicaciones de notas y calendario. Por ejemplo, para `notes`:

   ```yaml
   ...

      name : "notes",
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
          value : "localhost"
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
      ...
   ```
   Y para `calendar`:

   ```yaml
   ...
      name : "calendar",
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

### Configuración del rastreo

La biblioteca de rastreo de Java utiliza el Agent incorporado y el soporte de monitorización de Java. El indicador `-javaagent:../dd-java-agent.jar` en el archivo Docker indica a la máquina virtual Java dónde encontrar la biblioteca de rastreo de Java para que pueda ejecutarse como un Agent de Java. Para obtener más información sobre Agents de Java, consulta [https://www.baeldung.com/java-instrumentation][7].

El indicador `dd.trace.sample.rate` configura la frecuencia de muestreo para esta aplicación. El comando ENTRYPOINT en el archivo Docker configura su valor en `1`, lo que significa que el 100% de todas las solicitudes de servicio se envían al backend de Datadog para su análisis y visualización. Para una aplicación de prueba de bajo volumen, esto está bien. Sin embargo, no lo hagas en producción o en entornos de gran volumen, ya que esto generará un volumen muy elevado de datos. En su lugar, muestrea algunas de tus solicitudes. Elige un valor entre 0 y 1. Por ejemplo, `-Ddd.trace.sample.rate=0.1` envía trazas del 10% de tus solicitudes a Datadog. Consulta la documentación para obtener más información sobre [parámetros de configuración del rastreo][14] y [mecanismos de muestreo][15].

Fíjate que el indicador de la frecuencia de muestreo en el comando aparece antes que el indicador `-jar`. Esto se debe a que se trata de un parámetro para la máquina virtual Java y no para tu aplicación. Cuando añadas el Agent de Java a tu aplicación, asegúrate de especificar el indicador en la localización correcta.

### Reconstrucción y carga de la imagen de la aplicación

Reconstruye la imagen con el rastreo habilitado utilizando los [mismos pasos que antes](#build-and-upload-the-application-image):
{{< code-block lang="sh" >}}
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

   ```sh
   aws ecs register-task-definition --cli-input-json file://dd_agent_task_definition.json --profile <AWS_PROFILE> --region <AWS_REGION>
   ```

   En la salida, anota el valor `taskDefinitionArn`, que se utilizará en el paso siguiente.

3. Crea el servicio del Agent en el clúster ejecutando este comando, al brindar el ARN de definición de tarea del paso anterior, tu perfil de AWS y la región de AWS:

   ```sh
   aws ecs create-service --cluster apm-tutorial-ec2-java --task-definition <TASK_DEFINITION_ARN> --launch-type EC2 --scheduling-strategy DAEMON --service-name datadog-agent --profile <PROFILE> --region <AWS_REGION>
   ```

## Inicio de la aplicación para ver trazas

Vuelve a desplegar la aplicación y ejercita la API:

1. Vuelve a implementar la aplicación en Amazon ECS utilizando los [mismos comandos de Terraform que antes](#deploy-the-application). Desde el directorio `terraform/EC2/deployment`, ejecuta los siguientes comandos:

   ```sh
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

4. Espera unos instantes y ve a [**APM > Traces** (APM > Trazas)][11] en Datadog, donde podrás ver una lista de trazas correspondiente a tus llamadas de API:

   {{< img src="tracing/guide/tutorials/tutorial-java-container-traces2.png" alt="Trazas de la aplicación de ejemplo en APM Trace Explorer" style="width:100%;" >}}

   La base de datos en memoria integrada para este tutorial es `h2` y la aplicación Spring Boot es `notes`. La lista de trazas muestra todos los tramos, cuándo se han iniciado, qué recurso se ha rastreado con el tramo y cuánto tiempo ha tardado.

Si no ves trazas después de varios minutos, borra cualquier filtro en el campo de búsqueda de trazas (a veces se filtra sobre una variable de entorno como `ENV` que no estás utilizando).

### Análisis de una traza

En la página Traces (Trazas), haz clic en una traza `POST /notes` para ver una gráfica de llamas que muestra cuánto tiempo ha tardado cada tramo y qué otros tramos han ocurrido antes de que se completara un tramo. La barra de la parte superior del gráfico es el tramo seleccionado en la pantalla anterior (en este caso, el punto de entrada inicial en la aplicación de notas).

El ancho de una barra indica el tiempo que ha tardado en completarse. Una barra más angosta representa un tramo que se completa durante el tiempo de vida de una barra de mayor ancho.

En el Trace Explorer, haz clic en una de las nuevas solicitudes `GET` y verás una gráfica de llamas como ésta:

{{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="Una gráfica de llamas para una traza GET con instrumentación personalizada." style="width:100%;" >}}

El `privateMethod` alrededor del cual has creado un tramo manual aparece ahora como un bloque independiente de las otras llamadas y está resaltado con un color diferente. Los otros métodos en los que has utilizado la anotación `@Trace` se muestran bajo el mismo servicio y color que la solicitud `GET`, que es la aplicación `notes`. La instrumentación personalizada es valiosa cuando hay partes clave del código que necesitan ser resaltadas y monitorizadas.

Para obtener más información, consulta la [instrumentación personalizada][12].

El rastreo de un único servicio es un buen comienzo, pero el verdadero valor del rastreo consiste en ver cómo fluyen las solicitudes a través de tus servicios. Esto se llama _rastreo distribuido_. Haz clic en la traza de la última llamada a la API, la que ha añadido una fecha a la nota, para ver una traza distribuida entre ambos servicios:

{{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="Gráfico de llamas de una traza distribuida." style="width:100%;" >}}

Observa que no has cambiado nada en la aplicación `notes`. Datadog instrumenta automáticamente tanto la biblioteca `okHttp` utilizada para realizar la llamada HTTP de `notes` a `calendar`, como la biblioteca Jetty utilizada para escuchar solicitudes HTTP en `notes` y `calendar`. Esto permite que la información de rastreo pase de una aplicación a la otra, registrando una traza distribuida.

Cuando hayas terminado de explorar, limpia todos los recursos y elimina los despliegues:

```sh
aws ecs delete-service --cluster apm-tutorial-ec2-java --service datadog-agent --profile <PROFILE> --region <REGION>
terraform destroy
```

## Solucionar problemas

Si no recibes trazas como esperabas, configura el modo de depuración para el rastreador de Java. Para obtener más información, consulta [Habilitar el modo de depuración][13].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/guide/#enabling-tracing-tutorials
[2]: /es/tracing/trace_collection/dd_libraries/java/
[3]: /es/account_management/api-app-keys/
[4]: /es/tracing/trace_collection/compatibility/java/
[6]: /es/getting_started/site/
[8]: https://app.datadoghq.com/event/explorer
[7]: https://www.baeldung.com/java-instrumentation
[9]: https://github.com/DataDog/apm-tutorial-java-host
[10]: /es/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /es/tracing/trace_collection/custom_instrumentation/java/
[13]: /es/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /es/tracing/trace_collection/library_config/java/
[15]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=java
[17]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
[18]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#create-and-provide-a-secret-that-contains-your-datadog-api-and-app-keys
[20]: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html