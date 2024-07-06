---
further_reading:
- link: /tracing/trace_collection/library_config/java/
  tag: Documentación
  text: Opciones adicionales de configuración de bibliotecas de rastreo
- link: /tracing/trace_collection/dd_libraries/java/
  tag: Documentación
  text: Instrucciones detalladas de configuración de bibliotecas de rastreo
- link: /tracing/trace_collection/compatibility/java/
  tag: Documentación
  text: Marcos de trabajo compatibles Java para la instrumentación automática
- link: /tracing/trace_collection/custom_instrumentation/java/
  tag: Documentación
  text: Configuración manual de trazas (traces) y tramos (spans)
- link: https://github.com/DataDog/dd-trace-java
  tag: Código fuente
  text: Rastreo del repositorio de código fuente abierto de bibliotecas
title: Tutorial - Habilitación del rastreo de una aplicación Java en Amazon ECS con
  Fargate
---

## Información general

Este tutorial te guiará a través de los pasos para habilitar el rastreo en una aplicación de ejemplo Java instalada en un clúster en AWS Elastic Container Service (ECS) con Fargate. En este caso, el Datadog Agent también está instalado en el clúster.

Para otros casos, incluyendo el de un host, un contenedor, otra infraestructura en la nube y aplicaciones escritas en otros lenguajes, consulta [Tutoriales: Habilitación del rastreo][1].. Algunos de esos otros tutoriales, por ejemplo, los que utilizan contenedores o EKS, pasan por las diferencias vistas en Datadog entre instrumentación automática y personalizada. Este tutorial pasa directamente a un ejemplo personalizado instrumentado totalmente.

Este tutorial también utiliza temas de nivel intermedio de AWS, por lo que requiere que tengas cierta familiaridad con las redes y aplicaciones de AWS. Si no es así y estás intentando aprender lo básico sobre la configuración de Datadog APM, utiliza uno de los tutoriales sobre hosts o contenedores.

Para obtener documentación general sobre la configuración del rastreo en Java, consulta [Rastreo de aplicaciones Java][2].

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Git
- Docker
- Terraform
- Amazon ECS
- Un repositorio Amazon ECR para alojar imágenes
- Un usuario IAM de AWS con permiso `AdministratorAccess`. Debes añadir el perfil a tu archivo de credenciales local utilizando las claves de acceso y acceso secreto. Para obtener más información, consulta el [uso del archivo de credenciales y los perfiles de credenciales AWS][20].

## Instalación de la aplicación de ejemplo Java 

El código de ejemplo para este tutorial está en GitHub, en [github.com/DataDog/apm-tutorial-java-host][9]. Para empezar, clona el repositorio:

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

El repositorio contiene una aplicación Java preconfigurada de servicio múltiple para ejecutarse dentro de contenedores Docker. Los archivos `docker-compose` YAML para la creación de contenedores se encuentran en el directorio `docker`. Este tutorial utiliza el archivo `service-docker-compose-ECS.yaml`, que crea contenedores para la aplicación.

En cada uno de los directorios `notes` y `calendar`, hay dos conjuntos de archivos Docker para crear aplicaciones, ya sea con Maven o con Gradle. Este tutorial utiliza la creación con Maven, pero si Gradle te resulta más familiar, puedes utilizarlo en su lugar con los cambios correspondientes en los comandos de creación.

La aplicación de ejemplo es una sencilla aplicación Java de servicio múltiple con dos API, una para el servicio `notes` y otra para el servicio  `calendar`. El servicio `notes` tiene endpoints `GET`, `POST`, `PUT` y `DELETE` para notas almacenadas en una base de datos H2 en la memoria. El servicio `calendar` puede recibir una solicitud y devolver una fecha aleatoria para utilizarla en una nota. Ambas aplicaciones tienen sus propias imágenes Docker asociadas y se despliegan en Amazon ECS como servicios separadas, cada una con sus propias tareas y contenedores respectivos. ECS extrae las imágenes de ECR, un repositorio de imágenes de aplicaciones en el que se publican las imágenes tras la compilación.

### Configuración inicial del ECS

La aplicación requiere un poco de configuración inicial, incluyendo añadir tu perfil AWS (ya configurado con los permisos correctos para crear un clúster ECS y leer de ECR), región AWS y repositorio de Amazon ECR.

Abre `terraform/Fargate/global_constants/variables.tf`. Sustituya los valores de las variables siguientes por la información correcta de tu cuenta AWS:

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

### Creación y carga de las imágenes de la aplicación

Si no te resulta familiar Amazon ECR, que es un registro para imágenes de contenedores, podría serte útil consultar el [uso de Amazon ECR con la AWS CLI][17].

En el directorio `/docker` del proyecto de ejemplo, ejecuta los siguientes comandos:

1. Autentícate con el ECR, introduciendo tu nombre de usuario y contraseña en este comando:
   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>{{< /code-block >}}

2. Crea una imagen Docker para la aplicación de ejemplo, ajustando la configuración de la plataforma para que coincida con la tuya:
   {{< code-block lang="sh" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build{{< /code-block >}}

3. Etiqueta el contenedor con el destino ECR:
   {{< code-block lang="sh" >}}
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

4. Carga el contenedor en el registro ECR:
   {{< code-block lang="sh" >}}
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

Tu aplicación (sin el rastreo habilitado) está contenedorizada y se encuentra disponible para la extracción para clústeres ECS.


### Despliegue de la aplicación

Inicia la aplicación y envía algunas solicitudes sin rastreo. Después de haber visto cómo funciona la aplicación, podrás instrumentarla utilizando la biblioteca de rastreo y el Datadog Agent.

Para empezar, utiliza un script Terraform para desplegar en Amazon ECS:

1. Desde el directorio `terraform/Fargate/Uninstrumented`, ejecuta los siguientes comandos:

   ```sh
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

   **Nota**: Si el comando `terraform apply` devuelve un mensaje de bloqueo CIDR, el script para obtener tu dirección IP no ha funcionado en tu máquina local. Para solucionarlo, configura el valor manualmente en el archivo `terraform/Fargate/Uninstrumented/security.tf`. Dentro del bloque `ingress` del `load_balancer_security_group`, cambia la línea `cidr_blocks` que está comentada y actualiza la línea de ejemplo ahora sin comentar con la dirección IP4 de tu máquina.

2. Anota el nombre del DNS del equilibrador de carga. Utilizarás ese dominio básico en las llamadas a la API de la aplicación de ejemplo. Espera unos minutos a que se inicien las instancias.

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

      Este comando llama tanto al servicio `notes` como al servicio `calendar`.

4. Una vez que hayas comprobado la ejecución de la aplicación, ejecuta el siguiente comando para detenerla y limpiar los recursos de AWS para que puedas habilitar el rastreo:
   {{< code-block lang="sh" >}}
terraform destroy{{< /code-block >}}

## Habilitación del rastreo

Ahora que ya tienes una aplicación Java en funcionamiento, configúrala para habilitar el rastreo.

1. Edita el archivo Docker para añadir el paquete de rastreo Java que necesita la aplicación para generar trazas. Abre el archivo `notes/dockerfile.notes.maven` y descomenta la línea que descarga `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Dentro del mismo archivo `notes/dockerfile.notes.maven`, comenta la línea `ENTRYPOINT` para una ejecución sin rastreo. A continuación, descomenta la línea `ENTRYPOINT`, que ejecuta la aplicación con el rastreo habilitado:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   Repite este paso para el otro servicio, `calendar`. Abre `calendar/dockerfile.calendar.maven` y comenta la línea `ENTRYPOINT` para ejecutar sin rastreo. A continuación, descomenta la línea `ENTRYPOINT`, que ejecuta la aplicación con el rastreo habilitado:

   ```
   ENTRYPOINT ["java", "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   Ahora ambos servicios tendrán la instrumentación automática.

   <div class="alert alert-warning"><strong>Nota</strong>: Las marcas de estos comandos de ejemplo, en particular la frecuencia de muestreo, no son necesariamente apropiadas para los entornos que no figuran en este tutorial. Para obtener más información sobre qué necesitas utilizar en tu entorno real, consulta <a href="#tracing-configuration">Configuración del rastreo</a>.</div>

3. La instrumentación automática es práctica, pero a veces prefieres utilizar tramos más precisos. La API de rastreo DD Java Datadog te permite especificar tramos en tu código mediante anotaciones o código. Añade algunas anotaciones al código para rastrear en algunos métodos de ejemplo.

   Abre `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java`. Este ejemplo ya contiene código comentado que muestra las diferentes formas de configurar el rastreo personalizado en el código.

4. Descomenta las líneas que importan bibliotecas para permitir el rastreo manual:

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

5. Descomenta las líneas que rastrean manualmente los dos procesos públicos. Éstas muestran el uso de anotaciones `@Trace` para especificar aspectos como `operationName` y `resourceName` en una traza:
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

6. También puedes crear un tramo separado para un bloque de código específico en la aplicación. Dentro del tramo, añade etiquetas de servicio y de nombre de recurso y etiquetas (tags) de gestión de errores. Estas etiquetas dan como resultado un gráfico de llamas que muestra tramos y métricas en visualizaciones de Datadog. Descomenta las líneas que rastrean manualmente el método privado:

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
   Y también las líneas que establecen etiquetas en los errores:
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

7. Actualiza tu compilación Maven abriendo `notes/pom.xml` y descomentando las líneas que configuran dependencias para el rastreo manual. La biblioteca `dd-trace-api` se utiliza para las anotaciones `@Trace`, y `opentracing-util` y `opentracing-api` se utilizan para la creación manual de tramos.

8. Añade el Datadog Agent a cada una de las definiciones de tareas `notes` y `calendar`, añadiendo un Agent en un contenedor junto a cada tarea AWS, en lugar de instalarlo en cualquier lugar. Abre `terraform/Fargate/Instrumented/main.tf` y fíjate que esta muestra ya tiene las configuraciones básicas necesarias para ejecutar el Datadog Agent en ECS Fargate y recopilar trazas): la clave de API (que configuras en el siguiente paso) y la habilitación de APM. La definición se proporciona tanto en la tarea `notes` como en la tarea `calendar`.

9. Proporciona un valor a la variable de clave de API. Abre `terraform/Fargate/global_constants/variables.tf` y descomenta la sección `output "datadog_api_key"` e introduce la clave de API Datadog de tu organización.

10. El [Etiquetado unificado de servicios][10] identifica servicios rastreados en diferentes versiones y entornos de despliegue, para que puedan correlacionarse en Datadog y puedas utilizarlos para buscar y filtrar. Las tres variables de entorno utilizadas para el etiquetado unificado de servicios son `DD_SERVICE`, `DD_ENV` y `DD_VERSION`. Para las aplicaciones desplegadas con ECS, estas variables de entorno se configuran dentro de la definición de tarea para los contenedores.

    Para este tutorial, el archivo `/terraform/Fargate/Instrumented/main.tf` ya tiene definidas estas variables de entorno para las aplicaciones de notas y calendario, por ejemplo, para `notes`:

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
           value : "calendar.apmlocaljava"
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

    También puedes ver que se configuran las etiquetas (labels) Docker para los mismos valores de etiquetas unificadas de servicios `service` , `env` y `version`. Esto también te permite obtener métricas Docker una vez que tu aplicación se esté ejecutando.

### Configuración del rastreo

La biblioteca de rastreo Java utiliza el Agent incorporado y el soporte de monitorización Java. La marca `-javaagent:../dd-java-agent.jar` en el archivo Docker indica a la máquina virtual Java dónde encontrar la biblioteca de rastreo Java para que pueda ejecutarse como un Agent Java. Para obtener más información sobre Agents Java, consulta [https://www.baeldung.com/java-instrumentation][7].

La marca `dd.trace.sample.rate` configura la frecuencia de muestreo para esta aplicación. El comando ENTRYPOINT en el archivo Docker configura su valor en `1`, lo que significa que el 100% de todas las solicitudes al servicio `notes` se envían al backend Datadog para su análisis y visualización. Para una aplicación de prueba de bajo volumen, esto está bien. Pero no lo hagas en producción o en entornos de gran volumen, ya que esto generará un volumen muy elevado de datos. En su lugar, muestrea algunas de tus solicitudes. Elige un valor entre 0 y 1. Por ejemplo, `-Ddd.trace.sample.rate=0.1` envía trazas (traces) del 10% de tus solicitudes a Datadog. Consulta la documentación para obtener más información sobre [parámetros de configuración del rastreo][14] y [mecanismos de muestreo][15].

Fíjate que la marca de la frecuencia de muestreo en el comando aparece antes que la marca `-jar`. Esto se debe a que se trata de un parámetro para la máquina virtual Java y no para tu aplicación. Cuando añadas el Agent Java a tu aplicación, asegúrate de especificar la marca en la ubicación correcta.

### Reconstrucción y carga de la imagen de la aplicación

Reconstruir la imagen con el rastreo habilitado utilizando los [mismos pasos que antes](#build-and-upload-the-application-image):
{{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

Tu aplicación de servicio múltiple con rastreo habilitado está en contenedores y se encuentra disponible para su extracción por ECS.

## Inicio de la aplicación para observar trazas

Vuelve a desplegar la aplicación y ejercita la API:

1. Vuelve a implementar la aplicación en Amazon ECS utilizando los [mismos comandos Terraform que antes](#deploy-the-application), pero con la versión instrumentada de los archivos de configuración. Desde el directorio `terraform/Fargate/Instrumented`, ejecuta los siguientes comandos:

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
      Este comando llama tanto al servicio `notes` como al servicio `calendar`.

4. Espera unos instantes y ve a [**APM > Traces** (APM > Trazas)][11] en Datadog, donde podrás ver una lista de trazas correspondiente a tus llamadas de API:

   {{< img src="tracing/guide/tutorials/tutorial-java-container-traces2.png" alt="Trazas de la aplicación de ejemplo en APM Trace Explorer" style="width:100%;" >}}

   La base de datos en memoria integrada para este tutorial es `h2` y la aplicación Spring Boot es `notes`. La lista de trazas muestra todos los tramos, cuándo se han iniciado, qué recurso se ha rastreado con el tramo y cuánto tiempo ha tardado.

Si no ves trazas después de varios minutos, borra cualquier filtro en el campo de búsqueda de trazas (a veces se filtra sobre una variable de entorno como `ENV` que no estás utilizando).

### Análisis de una traza

En la página de trazas, haz clic en una traza `POST /notes` para ver un gráfico de llamas que muestra cuánto tiempo ha tardado cada tramo y qué otros tramos han ocurrido antes de que se completara un tramo. La barra de la parte superior del gráfico es el tramo seleccionado en la pantalla anterior (en este caso, el punto de entrada inicial en la aplicación de notas).

El ancho de una barra indica el tiempo que ha tardado en completarse. Una barra de menor profundidad representa un tramo que se completa durante el tiempo de vida de una barra a mayor profundidad.

En el Trace Explorer, haz clic en una de las nuevas solicitudes `GET` y verás un gráfico de llamas como éste:

{{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="Gráfico de llamas de una traza GET con instrumentación privada." style="width:100%;" >}}

El `privateMethod` alrededor del cual has creado un tramo manual aparece ahora como un bloque separado de las otras llamadas y está resaltado con un color diferente. Los otros métodos en los que has utilizado la anotación `@Trace` se muestran bajo el mismo servicio y color que la solicitud `GET`, que es la aplicación `notes`. La instrumentación personalizada es valiosa cuando hay partes clave del código que necesitan ser resaltadas y monitorizadas.

Para obtener más información, consulta la [instrumentación personalizada][12].

El rastreo de una única aplicación es un buen comienzo, pero el verdadero valor del rastreo consiste en ver cómo fluyen las solicitudes a través de tus servicios. Esto se llama rastreo distribuido. Haz clic en la traza de la última llamada a la API, la que ha añadido una fecha a la nota, para ver una traza distribuida entre ambos servicios:

{{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="Gráfico de llamas de una traza distribuida." style="width:100%;" >}}

Observa que no has cambiado nada en la aplicación `notes`. Datadog instrumenta automáticamente tanto la biblioteca `okHttp` utilizada para realizar la llamada HTTP de `notes` a `calendar`, como la biblioteca Jetty utilizada para escuchar solicitudes HTTP en `notes` y `calendar`. Esto permite que la información de rastreo pase de una aplicación a la otra, registrando un rastreo distribuido.

Cuando hayas terminado de explorar, borra todos los recursos y elimina los despliegues:

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
[20]: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-profiles.html