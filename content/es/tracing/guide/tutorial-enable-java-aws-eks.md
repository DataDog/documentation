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
title: Tutorial - Habilitación del rastreo de una aplicación Java en AWS Elastic Kubernetes
  Service
---

## Información general

Este tutorial te guiará a través de los pasos para habilitar el rastreo en una aplicación de ejemplo Java instalada en un clúster en AWS Elastic Kubernetes Service (EKS). En este caso, el Datadog Agent también está instalado en el clúster.

Para otros casos, incluyendo el de un host, un contenedor, otra infraestructura en la nube y aplicaciones escritas en otros lenguajes, consulta [Tutoriales: Habilitación del rastreo][1].

Para obtener documentación general sobre la configuración del rastreo en Java, consulta [Rastreo de aplicaciones Java][2].

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Git
- Kubectl
- eksctl
- Helm - Instálalo ejecutando estos comandos:
  {{< code-block lang="sh" >}}
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh{{< /code-block >}}
  Configura Helm ejecutando estos comandos:
  {{< code-block lang="sh" >}}
helm repo add datadog-crds https://helm.datadoghq.com
helm repo add kube-state-metrics https://prometheus-community.github.io/helm-charts
helm repo add datadog https://helm.datadoghq.com
helm repo update{{< /code-block >}}

## Instalación de la aplicación de ejemplo Kubernetes Java 

El código de ejemplo para este tutorial está en GitHub, en [github.com/DataDog/apm-tutorial-java-host][9]. Para empezar, clona el repositorio:

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

El repositorio contiene una aplicación Java preconfigurada de servicio múltiple para ejecutarse dentro de un clúster Kubernetes. La del ejemplo es una aplicación básica de notas con una API REST para añadir y modificar datos. Los archivos `docker-compose` YAML para la creación de contenedores para pods Kubernetes se encuentran en el directorio `docker`. Este tutorial utiliza el archivo `service-docker-compose-k8s.yaml`, que crea contenedores para la aplicación.

En cada uno de los directorios `notes` y `calendar`, hay dos conjuntos de archivos Docker para crear aplicaciones, ya sea con Maven o con Gradle. Este tutorial utiliza la creación con Maven, pero si Gradle te resulta más familiar, puedes utilizarlo en su lugar con los cambios correspondientes en los comandos de creación.

Los archivos de configuración Kubernetes para las aplicaciones `notes`, `calendar` y el Datadog Agent se encuentran en el directorio `kubernetes`.

El proceso para obtener la aplicación de ejemplo implica crear las imágenes desde la carpeta `docker`, cargarlas en un registro y crear recursos Kubernetes desde la carpeta `kubernetes`.

### Para iniciar el clúster

Si aún no dispones de un clúster EKS que quieras reutilizar, crea uno ejecutando el siguiente comando y sustituyendo `<CLUSTER_NAME>` por el nombre que quieres utilizar:

{{< code-block lang="sh" >}}
eksctl create cluster --name <CLUSTER_NAME>{{< /code-block >}}

Esta acción crea un clúster EKS con un grupo de nodos gestionado, donde puedes desplegar pods. Para obtener más información sobre la resolución de problemas y la configuración, consulta [la documentación de eksctl para la creación de clústeres][16]. Si estás utilizando un clúster creado de otra forma (por ejemplo, utilizando la consola web AWS), asegúrate de que el clúster está conectado a tu archivo local `kubeconfig`, tal y como se describe en la documentación de eksctl.

La creación de un clúster puede tardar entre 15 y 20 minutos. Mientras esperas a que el clúster termine de crearse, continúa con otros pasos.

### Creación y carga de la imagen de la aplicación

Si no te resulta familiar Amazon ECR, que es un registro para imágenes EKS, podría serte útil consultar el [uso de Amazon ECR con la AWS CLI][17].

En el directorio `/docker` del proyecto de ejemplo, ejecuta los siguientes comandos:

1. Autentícate con el ECR, introduciendo tu nombre de usuario y contraseña en este comando:
   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>{{< /code-block >}}

2. Crea una imagen Docker para la aplicación de ejemplo, ajustando la configuración de la plataforma para que coincida con la tuya:
   {{< code-block lang="sh" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes{{< /code-block >}}

3. Etiqueta el contenedor con el destino ECR:
   {{< code-block lang="sh" >}}
docker tag docker-notes:latest <ECR_REGISTRY_URL>:notes{{< /code-block >}}

4. Carga el contenedor en el registro ECR:
   {{< code-block lang="sh" >}}
docker push <ECR_REGISTRY_URL>:notes{{< /code-block >}}

Tu aplicación está contenedorizada y se encuentra disponible para la extracción para clústeres EKS.

### Actualización de las políticas de seguridad de entrada del clúster AWS

Para comunicarte con las aplicaciones de ejemplo, asegúrate de que las reglas de seguridad del clúster están configuradas con los puertos `30080` y `30090` abiertos.

1. Abre la consola AWS y ve hasta tu clúster desplegado dentro del servicio EKS.

2. En la consola del clúster, selecciona la pestaña de redes y haz clic en el grupo de seguridad de tu clúster.

3. En la configuración de tu grupo de seguridad, edita las reglas de entrada. Añade una regla que permita el tráfico TCP personalizado, un intervalo de puertos de `30060` a `30100` y el origen de `0.0.0.0/0`.

4. Guarda la regla.

### Configuración local y despliegue de la aplicación

1. Abre `kubernetes/notes-app.yaml` y actualiza la entrada `image` con la URL de la imagen ECR, donde introdujiste el contenedor anterior:
   {{< code-block lang="yaml" >}}
    spec:
      containers:
        - name: notes-app
          image: <ECR_REGISTRY_URL>:notes
          imagePullPolicy: Always
{{< /code-block >}}

2. Desde el directorio `/kubernetes`, ejecuta el siguiente comando para desplegar la aplicación `notes`:
   {{< code-block lang="sh" >}}
kubectl create -f notes-app.yaml{{< /code-block >}}

3. Para ejercitar la aplicación, es necesario encontrar su dirección IP externa para llamar a su API REST. En primer lugar, busca el pod `notes-app-deploy` en el resultado de la lista con el siguiente comando y anota su nodo:

   {{< code-block lang="sh" >}}
kubectl get pods -o wide{{< /code-block >}}

   {{< img src="tracing/guide/tutorials/tutorial-java-eks-pods.png" alt="Resultado del comando kubectl que muestra el pod notes-app-deploy y su nombre de nodo asociado" style="width:100%;" >}}

   A continuación, busca el nombre del nodo en el resultado del siguiente comando y anota el valor de la IP externa:

      {{< code-block lang="sh" >}}
kubectl get nodes -o wide{{< /code-block >}}

   {{< img src="tracing/guide/tutorials/tutorial-java-eks-external-ip.png" alt="Resultado del comando kubectl que muestra el valor de la IP externa para el nodo" style="width:100%;" >}}

   En los ejemplos mostrados, `notes-app` se ejecuta en el nodo `ip-192-189-63-129.ec2.internal`, cuya IP externa es `34.230.7.210`.

3. Abre otro terminal y envía solicitudes API para ejercitar la aplicación. La aplicación de notas es una API REST que almacena datos en una base de datos H2 en memoria que se ejecuta en el mismo contenedor. Envíale algunos comandos:

`curl '<EXTERNAL_IP>:30080/notes'`
: `[]`

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes?id=1'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes'`
: `[{"id":1,"description":"hello"}]`

4. Una vez que hayas comprobado que la aplicación se ejecuta, detenla para poder activar el rastreo en ella:
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml{{< /code-block >}}

## Habilitación del rastreo

Ahora que ya tienes una aplicación Java en funcionamiento, configúrala para habilitar el rastreo.

1. Añade el paquete de rastreo Java a tu proyecto. Como el Agent se ejecuta en un clúster EKS, asegúrate de que los archivos Docker están correctamente configurados y que no es necesario instalar nada. Abre el archivo `notes/dockerfile.notes.maven` y descomenta la línea que descarga `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Dentro del mismo archivo `notes/dockerfile.notes.maven`, comenta la línea `ENTRYPOINT` para una ejecución sin rastreo. A continuación, descomenta la línea `ENTRYPOINT`, que ejecuta la aplicación con el rastreo habilitado:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   De este modo, la aplicación se instrumenta automáticamente con servicios Datadog.

   <div class="alert alert-warning"><strong>Nota</strong>: Las marcas de estos comandos de muestreo, en particular la frecuencia de muestreo, no son necesariamente apropiadas para los entornos que no figuran en este tutorial. Para obtener más información sobre qué necesitas utilizar en tu entorno real, consulta <a href="#tracing-configuration">Configuración del rastreo</a>.</div>

3. El [Etiquetado unificado de servicios][10] identifica servicios rastreados en diferentes versiones y entornos de despliegue, para que puedan correlacionarse en Datadog y puedas utilizarlos para buscar y filtrar. Las tres variables de entorno utilizadas para el etiquetado unificado de servicios son `DD_SERVICE`, `DD_ENV` y `DD_VERSION`. Para las aplicaciones desplegadas con Kubernetes, estas variables de entorno pueden añadirse en el archivo YAML de despliegue, específicamente para el objeto de despliegue, las especificaciones del pod y la plantilla del contenedor del pod.

   En este tutorial, el archivo `kubernetes/notes-app.yaml` ya tiene definidas estas variables de entorno para la aplicación de notas para el objeto de despliegue, las especificaciones del pod y la plantilla del contenedor del pod.:

   ```yaml
   ...
   spec:
     replicas: 1
     selector:
       matchLabels:
         name: notes-app-pod
         app: java-tutorial-app
     template:
       metadata:
         name: notes-app-pod
         labels:
           name: notes-app-pod
           app: java-tutorial-app
           tags.datadoghq.com/env: "dev"
           tags.datadoghq.com/service: "notes"
           tags.datadoghq.com/version: "0.0.1"
      ...
   ```

### Reconstrucción y carga de la imagen de la aplicación

Reconstruir la imagen con el rastreo habilitado utilizando los [mismos pasos que antes](#build-and-upload-the-application-image):
{{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes
docker tag docker-notes:latest <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:notes{{< /code-block >}}

Tu aplicación con el rastreo habilitado está contenedorizada y se encuentra disponible para la extracción para clústeres EKS.

## Instalación y ejecución del Agent con Helm

A continuación, despliega el Agent en EKS para recopilar los datos de rastreo de tu aplicación instrumentada.

1. Abre `kubernetes/datadog-values.yaml` para ver la configuración mínima requerida Configuración para el Agent y APM en GKE. Este archivo de configuración es utilizado por el comando que se ejecuta a continuación.

2. Desde el directorio `/kubernetes`, ejecuta el siguiente comando, introduciendo tu clave de API y el nombre de clúster:
   {{< code-block lang="sh" >}}
helm upgrade -f datadog-values.yaml --install --debug latest --set datadog.apiKey=<DD_API_KEY> --set datadog.clusterName=<CLUSTER_NAME> --set datadog.site=datadoghq.com datadog/datadog{{< /code-block >}}

   Para despliegues más seguros que no exponen la clave de API, consulta [esta guía sobre el uso de secretos][18]. Además, si utilizas un [sitio Datadog][6] distinto de `us1`, sustituya `datadoghq.com` por tu sitio.

## Inicio de la aplicación para observar el rastreo automático

Siguiendo [los mismos pasos que antes](#configure-the-application-locally-and-deploy), despliega la aplicación `notes` con `kubectl create -f notes-app.yaml` y busca la dirección IP externa del nodo en el que se ejecuta.

Ejecuta algunos comandos curl para ejercitar la aplicación:

`curl '<EXTERNAL_IP>:30080/notes'`
: `[]`

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes?id=1'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes'`
: `[{"id":1,"description":"hello"}]`


Espera unos instantes y ve a [**APM > Traces** (APM > Trazas)][11] en Datadog, donde podrás ver una lista de trazas correspondiente a tus llamadas de API:

{{< img src="tracing/guide/tutorials/tutorial-java-container-traces2.png" alt="Trazas de la aplicación de ejemplo en APM Trace Explorer" style="width:100%;" >}}

La base de datos en memoria integrada para este tutorial es `h2` y la aplicación Spring Boot es `notes`. La lista de trazas muestra todos los tramos (spans), cuándo se han iniciado, qué recurso se ha rastreado con el tramo (span) y cuánto tiempo ha tardado.

Si no ves trazas después de varios minutos, borra cualquier filtro en el campo de búsqueda de trazas (a veces se filtra sobre una variable de entorno como `ENV` que no estás utilizando).

### Análisis de una traza

En la página de trazas, haz clic en una traza `POST /notes` para ver un gráfico de llama que muestra cuánto tiempo ha tardado cada tramo (span) y qué otros tramos (spans) han ocurrido antes de que se completara un tramo (span). La barra de la parte superior del gráfico es el tramo (span) seleccionado en la pantalla anterior (en este caso, el punto de entrada inicial en la aplicación de notas).

La anchura de una barra indica el tiempo que ha tardado en completarse. Una barra de menor profundidad representa una tramo (span) que se completa durante el tiempo de vida de una barra a mayor profundidad.

El gráfico de llama de una traza `POST` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-java-container-post-flame.png" alt="Gráfico de llama de una traza POST." style="width:100%;" >}}

Una traza `GET /notes` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-java-container-get-flame.png" alt="Gráfico de llama de una traza GET." style="width:100%;" >}}

### Configuración del rastreo

La biblioteca de rastreo Java utiliza el Agent incorporado y el soporte de monitorización Java. La marca `-javaagent:../dd-java-agent.jar` en el archivo Docker indica a la máquina virtual Java dónde encontrar la biblioteca de rastreo Java para que pueda ejecutarse como un Agent Java. Para obtener más información sobre Agents Java, consulta [https://www.baeldung.com/java-instrumentation][7].

La marca `dd.trace.sample.rate` configura la frecuencia de muestreo para esta aplicación. El comando ENTRYPOINT en el archivo Docker configura su valor en `1`, lo que significa que el 100% de todas las solicitudes al servicio `notes` se envían al backend Datadog para su análisis y visualización. Para una aplicación de prueba de bajo volumen, esto está bien. Pero no lo hagas en producción o en entornos de gran volumen, ya que esto generará un volumen muy elevado de datos. En su lugar, muestrea algunas de tus solicitudes. Elige un valor entre 0 y 1. Por ejemplo, `-Ddd.trace.sample.rate=0.1` envía trazas (traces) del 10% de tus solicitudes a Datadog. Consulta la documentación para obtener más información sobre [parámetros de configuración del rastreo][14] y [mecanismos de muestreo][15].

Fíjate que la marca de la frecuencia de muestreo en el comando aparece antes que la marca `-jar`. Esto se debe a que se trata de un parámetro para la máquina virtual Java y no para tu aplicación. Cuando añadas el Agent Java a tu aplicación, asegúrate de especificar la marca en la ubicación correcta.

## Añadir la instrumentación manual a la aplicación Java 

La instrumentación automática es práctica, pero a veces prefieres utilizar spans más precisos. La API de rastreo DD Java Datadog te permite especificar tramos en tu código mediante anotaciones o código.

Los siguientes pasos te guiarán a través de la modificación de los scripts de compilación para descargar la biblioteca de rastreo Java y añadir algunas anotaciones al código para rastrear en algunos métodos de ejemplo.

1. Elimina los despliegues de aplicaciones actuales:
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml{{< /code-block >}}

2. Abre `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java`. Este ejemplo ya contiene código comentado que muestra las diferentes formas de configurar el rastreo personalizado en el código.

3. Descomenta las líneas que importan bibliotecas para permitir el rastreo manual:

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

4. Descomenta las líneas que rastrean manualmente los dos procesos públicos. Éstas muestran el uso de anotaciones `@Trace` para especificar aspectos como `operationName` y `resourceName` en una traza:
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

5. También puedes crear un tramo separado para un bloque de código específico en la aplicación. Dentro del tramo (span), añade etiquetas de servicio y de nombre de recurso y etiquetas de gestión de errores. Estas etiquetas dan como resultado un gráfico de llama que muestra tramos y métricas en visualizaciones de Datadog. Descomenta las líneas que rastrean manualmente el método privado:

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

6. Actualiza tu compilación Maven abriendo `notes/pom.xml` y descomentando las líneas que configuran dependencias para el rastreo manual. La biblioteca `dd-trace-api` se utiliza para las anotaciones `@Trace`, y `opentracing-util` y `opentracing-api` se utilizan para la creación manual de tramos.

7. Reconstruye la aplicación y cárgala a ECR siguiendo los [mismos pasos que antes](#build-and-upload-the-application-image), ejecutando estos comandos:

   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes
docker tag docker-notes:latest <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:notes
{{< /code-block >}}

8. Siguiendo [los mismos pasos que antes](#configure-the-application-locally-and-deploy), despliega la aplicación `notes` con `kubectl create -f notes-app.yaml` y busca la dirección IP externa del nodo en el que se ejecuta.

9. Reenvía algunas solicitudes HTTP, concretamente algunas solicitudes `GET`.
10. En el explorador de trazas, haz clic en una de las nuevas solicitudes `GET` y verás un gráfico de llama como éste:

    {{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="Gráfico de llama de una traza GET con instrumentación privada." style="width:100%;" >}}

    Observa el mayor nivel de detalle de la traza del stack tecnológico ahora que la función `getAll` cuenta con el rastreo personalizado.

    El `privateMethod` alrededor del cual has creado un tramo (span) manual aparece ahora como un bloque separado de las otras llamadas y está resaltado con un color diferente. Los otros métodos en los que has utilizado la anotación `@Trace` se muestran bajo el mismo servicio y color que la solicitud `GET`, que es la aplicación `notes`. La instrumentación personal es valiosa cuando hay partes clave del código que necesitan ser resaltadas y monitorizadas.

Para obtener más información, consulta la [instrumentación personalizada][12].

## Añadir una segunda aplicación para ver trazas distribuidas

El rastreo de una única aplicación es un buen comienzo, pero el verdadero valor del rastreo consiste en ver cómo fluyen las solicitudes a través de tus servicios. Esto se llama rastreo distribuido.

El proyecto de ejemplo incluye una segunda aplicación llamada `calendar` que devuelve una fecha aleatoria cada vez que se invoca. El endpoint `POST` de la aplicación de notas tiene un segundo parámetro de consulta llamado `add_date`. Cuando se configura en `y`, la aplicación de notas llama a la aplicación de calendario para obtener una fecha y añadirla a una nota.

1. Configura la aplicación `calendar` para el rastreo añadiendo `dd-java-agent` al comando de inicio en el archivo Docker, como hiciste anteriormente para la aplicación de notas. Abre `calendar/dockerfile.calendar.maven` y comprueba que ya está descargando `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Dentro del mismo archivo `calendar/dockerfile.calendar.maven`, comenta la línea `ENTRYPOINT` para ejecutar sin rastreo. A continuación, descomenta la línea `ENTRYPOINT`, que ejecuta la aplicación con el rastreo habilitado:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   <div class="alert alert-warning"><strong>Nota</strong>: Nuevamente, las marcas, en particular la frecuencia de muestreo, no son necesariamente apropiadas para los entornos que no figuran en este tutorial. Para obtener más información sobre qué necesitas utilizar en tu entorno real, consulta <a href="#tracing-configuration">Configuración del rastreo</a>.</div>

3. Crea ambas aplicaciones y publícalas en ECR. Desde el directorio `docker`, ejecuta:
   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build calendar
docker tag docker-calendar:latest <ECR_REGISTRY_URL>:calendar
docker push <ECR_REGISTRY_URL>:calendar
{{< /code-block >}}

4. Abre `kubernetes/calendar-app.yaml` y actualiza la entrada `image` con la dirección URL de la imagen ECR, donde introdujiste la aplicación `calendar` en el paso anterior:
   {{< code-block lang="yaml" >}}
    spec:
      containers:
        - name: calendar-app
          image: <ECR_REGISTRY_URL>:calendar
          imagePullPolicy: Always
{{< /code-block >}}

5. Despliega las aplicaciones `notes` y `calendar`, ahora con instrumentación personalizada, en el clúster:
   {{< code-block lang="sh" >}}
kubectl create -f notes-app.yaml
kubectl create -f calendar-app.yaml{{< /code-block >}}

6. Utilizando el método que utilizaste antes, busca la IP externa de la aplicación `notes`.

7. Envía una solicitud POST con el parámetro `add_date`:

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`

8. En el explorador de trazas, haz clic en esta última traza para ver un rastreo distribuido entre ambos servicios:

   {{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="Gráfico de llama de una traza distribuida." style="width:100%;" >}}

   Observa que no has cambiado nada en la aplicación `notes`. Datadog instrumenta automáticamente tanto la biblioteca `okHttp` utilizada para realizar la llamada HTTP de `notes` a `calendar`, como la biblioteca Jetty utilizada para escuchar solicitudes HTTP en `notes` y `calendar`. Esto permite que la información de rastreo pase de una aplicación a la otra, registrando un rastreo distribuido.

9. Cuando hayas terminado de explorar, borra todos los recursos y elimina los despliegues:
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml
kubectl delete -f calendar-app.yaml{{< /code-block >}}

   Para obtener información sobre la eliminación de clústeres, consulta [la documentación de EKS][19].

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
[16]: https://eksctl.io/usage/creating-and-managing-clusters/
[17]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
[18]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#create-and-provide-a-secret-that-contains-your-datadog-api-and-app-keys
[19]: https://docs.aws.amazon.com/eks/latest/userguide/delete-cluster.html