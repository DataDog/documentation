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
- link: /containers/cluster_agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: Blog
  text: Uso de la inyección de biblioteca para instrumentar automáticamente y rastrear
    tus aplicaciones de Kubernetes con Datadog APM
title: 'Tutorial: Activación del rastreo para una aplicación Java con el Controlador
  de admisión'
---

## Información general

Este tutorial te guiará por los pasos para habilitar el rastreo para la aplicación Java utilizando el Controlador de admisión (Admission Controller) de Datadog.

Para otros escenarios, incluyendo el de un host, un contenedor, infraestructura en la nube y aplicaciones escritas en otros lenguajes, consulta los otros [tutoriales de activación del rastreo][1].

Para obtener documentación general sobre la configuración del rastreo en Java, consulta [Rastreo de aplicaciones Java][2].

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Git
- Docker
- Curl
- Kubernetes v1.14+

## Instala la aplicación de ejemplo

Para demostrar cómo instrumentar tu aplicación con el Controlador de admisión (Admission Controller) de Datadog, este tutorial utiliza una aplicación Java creada con Spring. Puedes encontrar el código de la app en el [repositorio springblog de GitHub][4].

Para empezar, clona el repositorio:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/springblog.git
{{< /code-block >}}

El repositorio contiene una aplicación Java multiservicio preconfigurada para ejecutarse dentro de Docker y Kubernetes. La aplicación de ejemplo es una aplicación Spring básica que utiliza REST.

## Inicio y ejecución de la aplicación de ejemplo 

1. Cambia al subdirectorio `/k8s` en el repositorio springblog:
   {{< code-block lang="shell" >}}
cd springblog/k8s/{{< /code-block >}}

2. Despliega la carga de trabajo con el archivo `depl.yaml`:
   {{< code-block lang="shell" >}}
kubectl apply -f ./depl.yaml{{< /code-block >}}

3. Comprueba que se está ejecutando con el siguiente comando:
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    Deberías ver algo como esto:

    ```
    NAME                                       READY   STATUS        RESTARTS        AGE
    springback-666db7b6b8-dzv7c                1/1     Terminating   0               2m41s
    springfront-797b78d6db-p5c84               1/1     Terminating   0               2m41s
    ```

   El servicio se inicia y escucha en el puerto 8080. Expone un endpoint `/upstream`.

4. Comprueba que la comunicación sucede al ejecutar el siguiente comando curl:
   {{< code-block lang="shell" >}}
curl localhost:8080/upstream
Quote{type='success', values=Values{id=6, quote='Alea jacta est'}}{{< /code-block >}}

5. Para detener la aplicación, ejecuta este comando desde el directorio `springblog/k8s` para poder activar el rastreo en ella:
   {{< code-block lang="shell" >}}
kubectl delete -f ./depl-with-lib-inj.yaml{{< /code-block >}}

## Instrumentar tu aplicación con el Controlador de admisión (Admission Controller) de Datadog

Una vez que tengas tu aplicación en funcionamiento, instruméntala con el Controlador de admisión (Admission Controller) de Datadog. En entornos contenedorizados, el proceso generalmente es el siguiente:

1. Instala el [Datadog Cluster Agent][5].
2. Añade [etiquetas (tags) de servicio unificado][6] en la definición del pod.
3. [Anota][7] tu pod para la inyección de la biblioteca.
4. [Etiqueta][8] tu pod para ordenar al Controlador de admisión (Admission Controller) de Datadog que mute el pod.

No es necesario añadir la biblioteca de rastreo porque se inyecta automáticamente. Todavía no necesitas volver a desplegar tu aplicación. Esta sección del tutorial te guía a través de proceso para añadir variables de Datadog y desplegar una nueva imagen o versión de tu aplicación.

1. Desde el subdirectorio `k8s`, utiliza el siguiente comando para instalar el Datadog Cluster Agent, especificando el archivo de configuración `values-with-lib-inj.yaml` y tu [clave de API de Datadog](/account_management/api-app-keys/):
   {{< code-block lang="shell" >}}
helm install datadog-agent -f values-with-lib-inj.yaml --set datadog.site='datadoghq.com' --set datadog.apiKey=$DD_API_KEY datadog/datadog{{< /code-block >}}
    <div class="alert alert-warning">Para obtener información más detallada, lee <a href="/containers/kubernetes/installation/?tab=helm" target="_blank">Instalación del Datadog Agent en Kubernetes con Helm</a></div>

2. Puedes comprobar que el Datadog Cluster Agent se está ejecutando con el siguiente comando:
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    Deberías ver algo como esto:

    ```
    NAME                                                READY   STATUS    RESTARTS  AGE
    datadog-agent-4s8rb                                 3/3     Running   0         30s
    datadog-agent-cluster-agent-5666cffc44-d8qxk        1/1     Running   0         30s
    datadog-agent-kube-state-metrics-86f46b8484-mlqp7   1/1     Running   0         30s
    ```

3. Añade [etiquetas de servicio unificado][6] al pod al añadir el siguiente bloque al [archivo`depl.yaml`][9]:
   {{< code-block lang="yaml" >}}
labels:
  tags.datadoghq.com/env: "dev"
  tags.datadoghq.com/service: "springfront"
  tags.datadoghq.com/version: "12"{{< /code-block >}}

4. Configura el Controlador de admisión (Admission Controller) de Datadog para inyectar una biblioteca de rastreo al contenedor de la aplicación añadiendo la siguiente anotación al pod:
   {{< code-block lang="yaml" >}}
annotations:
  admission.datadoghq.com/java-lib.version: "latest"{{< /code-block >}}

    Esta anotación especifica la última versión de la biblioteca de rastreo de Java. También puedes hacer referencia a una versión específica de biblioteca, como `"v1.5.0"`.

    La definición final del pod debería parecerse al siguiente extracto. Consulta también el [archivo YAML][10] completo en el repositorio de ejemplo. Las instrucciones que has añadido para instrumentar la aplicación están resaltadas:

    {{< highlight yaml "hl_lines=6-8 24-28" >}}
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: springfront
    labels:
        tags.datadoghq.com/env: "dev"
        tags.datadoghq.com/service: "springfront"
        tags.datadoghq.com/version: "12"
    spec:
    replicas: 1
    selector:
        matchLabels:
        name: springfront
    minReadySeconds: 15
    strategy:
        type: RollingUpdate
        rollingUpdate:
        maxUnavailable: 1
        maxSurge: 1
    template:
        metadata:
        labels:
            name: springfront
            tags.datadoghq.com/env: "dev"
            tags.datadoghq.com/service: "springfront"
            tags.datadoghq.com/version: "12"
        annotations:
            admission.datadoghq.com/java-lib.version: "latest"
    {{< /highlight >}}

5. Ejecuta la aplicación de ejemplo con el siguiente comando:
   {{< code-block lang="shell" >}}
kubectl apply -f depl-with-lib-inj.yaml{{< /code-block >}}

6. Ejecuta el siguiente comando para mostrar que la aplicación y el Agent se están ejecutando:
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    Deberías ver algo como esto:

    ```
    NAME                                                READY   STATUS    RESTARTS   AGE
    datadog-agent-4s8rb                                 3/3     Running   0          28m
    datadog-agent-cluster-agent-5666cffc44-d8qxk        1/1     Running   0          28m
    datadog-agent-kube-state-metrics-86f46b8484-mlqp7   1/1     Running   0          28m
    springback-666db7b6b8-sb4tp                         1/1     Running   0          27m
    springfront-797b78d6db-mppbg                        1/1     Running   0          27m
    ```

7. Ejecuta el siguiente comando para ver los detalles del pod:
   {{< code-block lang="shell" >}}
kubectl describe pod springfront{{< /code-block >}}

   Deberías ver algo como esto:

    ```
    Events:
    Type    Reason     Age   From               Message
    ----    ------     ----  ----               -------
    Normal  Scheduled  32s   default-scheduler  Successfully assigned default/springfront-797b78d6db-jqjdl to docker-desktop
    Normal  Pulling    31s   kubelet            Pulling image "gcr.io/datadoghq/dd-lib-java-init:latest"
    Normal  Pulled     25s   kubelet            Successfully pulled image "gcr.io/datadoghq/dd-lib-java-init:latest" in 5.656167878s
    Normal  Created    25s   kubelet            Created container datadog-lib-java-init
    Normal  Started    25s   kubelet            Started container datadog-lib-java-init
    Normal  Pulling    25s   kubelet            Pulling image "pejese/springfront:v2"
    Normal  Pulled     2s    kubelet            Successfully pulled image "pejese/springfront:v2" in 22.158699094s
    Normal  Created    2s    kubelet            Created container springfront
    Normal  Started    2s    kubelet            Started container springfront
    ```

   Como puedes ver, se añade un init-container a tu pod. Este contenedor incluye las bibliotecas de rastreo de Datadog Java en un montaje de volumen. También `JAVA_TOOL_OPTIONS` se modifica para incluir `javaagent`. Y las variables de entorno específicas de Datadog se añaden al contenedor:

    ```
    Environment:
    DD_ENV:              dev
    DD_VERSION:          12
    DD_SERVICE:          springfront
    DD_ENTITY_ID:         (v1:metadata.uid)
    DD_TRACE_AGENT_URL:  unix:///var/run/datadog/apm.socket
    URL:                 http://springback:8088
    JAVA_TOOL_OPTIONS:    -javaagent:/datadog-lib/dd-java-agent.jar
    Mounts:
    /datadog-lib from datadog-auto-instrumentation (rw)
    /var/run/datadog from datadog (rw)
    /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-qvmtk (ro)
    ```

8. Comprueba que la biblioteca de rastreo de Datadog se inyecta en el pod al controlar los logs del pod. Por ejemplo:
   {{< code-block lang="shell" >}}
kubectl logs -f springfront-797b78d6db-jqjdl{{< /code-block >}}

    Deberías ver algo como esto:

    ```
    Defaulted container "springfront" out of: springfront, datadog-lib-java-init (init)
    Picked up JAVA_TOOL_OPTIONS:  -javaagent:/datadog-lib/dd-java-agent.jar
    ```

## Ver trazas de APM en Datadog

1. Ejecuta el siguiente comando:
   {{< code-block lang="shell" >}}
curl localhost:8080/upstream{{< /code-block >}}

2. AbrE la interfaz de usuario de Datadog y ve los dos informes de servicios en el [Catálogo de servicios][11]:
   {{< img src="tracing/guide/tutorials/tutorial-admission-controller-service-catalog.png" alt="Servicios springback y springfront en el Catálogo de servicios." style="width:100%;" >}}

3. Explora las trazas y consulta el Mapa de servicios asociado:
    {{< img src="tracing/guide/tutorials/tutorial-admission-controller-traces.png" alt="La gráfica de llamas que representa el servicio." style="width:100%;" >}}
    {{< img src="tracing/guide/tutorials/tutorial-admission-controller-service-map.png" alt="El mapa de servicios que representa el servicio." style="width:100%;" >}}

## Limpiar el entorno

Limpia tu entorno con el siguiente comando:

{{< code-block lang="shell" >}}
kubectl delete -f depl-with-lib-inj.yaml
{{< /code-block >}}

La inyección de biblioteca con el Controlador de admisión (Admission Controller) simplifica la instrumentación del servicio, permitiéndote ver trazas de APM sin cambiar o reconstruir tu aplicación. Para obtener más información, lee [la inyección de biblioteca de Datadog][12].

## Solucionar problemas
Si no recibes trazas como esperabas, configura el modo de depuración para el rastreador de Java. Para obtener más información, lee [Activar el modo de depuración][13].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/guide/#enabling-tracing-tutorials
[2]: /es/tracing/trace_collection/dd_libraries/java
[3]: /es/account_management/api-app-keys
[4]: https://github.com/DataDog/springblog
[5]: /es/containers/cluster_agent
[6]: /es/getting_started/tagging/unified_service_tagging
[7]: /es/tracing/trace_collection/library_injection_local
[8]: /es/tracing/trace_collection/library_injection_local
[9]: https://github.com/DataDog/springblog/blob/main/k8s/depl.yaml
[10]: https://github.com/DataDog/springblog/blob/main/k8s/depl-with-lib-inj.yaml
[11]: https://app.datadoghq.com/services
[12]: /es/tracing/trace_collection/admission_controller
[13]: /es/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode