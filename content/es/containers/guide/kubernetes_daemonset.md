---
further_reading:
- link: /containers/kubernetes/installation
  tag: Documentación
  text: Instala el Datadog Agent en Kubernetes
kind: documentation
title: Instalar manualmente y configurar el Datadog Agent en Kubernetes con DaemonSet
---

## Instalación
Puedes utilizar DaemonSets para desplegar Datadog Agent en todos tus nodos (o en nodos específicos [utilizando nodeSelectors][1]).

Para instalar Datadog Agent en tu clúster de Kubernetes:

1. **Configurar permisos de Agent**: si tu Kubernetes tiene habilitado el control de acceso basado en roles (RBAC), configura permisos RBAC para tu cuenta de servicio de Datadog Agent. A partir de Kubernetes 1.6, RBAC está habilitado por defecto. Crea los roles ClusterRole, ServiceAccount y ClusterRoleBinding apropiados con el siguiente comando:

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

    **Nota**: Estas configuraciones RBAC se establecen para el espacio de nombres `default`. Si estás en un espacio de nombres personalizado, actualiza el parámetro `namespace` antes de aplicarlas.


2. **Crear el manifiesto de Datadog Agent **. Crea el manifiesto `datadog-agent.yaml` a partir de una de las siguientes plantillas:

    | Métricas                         | Logs                            | APM                             | Proceso                         | NPM                             | Seguridad                        | Linux                   | Windows                              |
    |---------------------------------|---------------------------------|---------------------------------|---------------------------------|---------------------------------|---------------------------------|-------------------------|--------------------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | [Plantilla de manifiesto][2] | [Plantilla de manifiesto][3] (sin seguridad) |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                                 |                                 |                                 | [Plantilla de manifiesto][4]  | [Plantilla de manifiesto][5]               |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                                 |                                 |                                 |                                 | [Plantilla de manifiesto][6]  | [Plantilla de manifiesto][7]               |
    | <i class="icon-check-bold"></i> |                                 | <i class="icon-check-bold"></i> |                                 |                                 |                                 | [Plantilla de manifiesto][8]  | [Plantilla de manifiesto][9]               |
    |                                 |                                 |                                 |                                 | <i class="icon-check-bold"></i> |                                 | [Plantilla de manifiesto][10] | sin plantilla                          |
    | <i class="icon-check-bold"></i> |                                 |                                 |                                 |                                 |                                 | [Plantilla de manifiesto][11] | [Plantilla de manifiesto][12]              |

     Para habilitar completamente la recopilación de trazas (traces), [se requieren pasos adicionales en tu configuración del pod de la aplicación][13]. Consulta también las páginas de documentación de [logs][14], [APM][15], [procesos][16], y [Monitorización del rendimiento de red][17], y [Seguridad][18] para aprender a habilitar cada característica individualmente.

     **Nota**: Estos manifiestos están configurados para el espacio de nombres `default`. Si estás en un espacio de nombres personalizado, actualiza el parámetro `metadata.namespace` antes de aplicarlos.

3. En el manifiesto `secret-api-key.yaml`, sustituye `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` por [tu clave de API de Datadog][19] codificada en base64. Para obtener la versión base64 de tu clave de la API, puedes ejecutar:

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. Si estás utilizando la plantilla de manifiesto `datadog-agent-all-features.yaml`: en el manifiesto `secret-cluster-agent-token.yaml`, sustituye `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE` por una cadena aleatoria codificada en base64. Para obtener la versión en base64, puedes ejecutar:

    ```shell
    echo -n 'Random string' | base64
    ```

    **Nota**: La cadena aleatoria debe contener al menos 32 caracteres alfanuméricos para asegurar la comunicación de Cluster Agent a Agent.

5. **Establece tu sitio de Datadog ** en {{< region-param key="dd_site" code="true" >}} utilizando la variable de entorno `DD_SITE` en el manifiesto `datadog-agent.yaml`.

    **Nota**: Si la variable de entorno `DD_SITE` no se establece explícitamente, se establece por defecto el sitio `US` `datadoghq.com`. Si estás utilizando uno de los otros sitios, recibirás un mensaje de clave de API inválida. Utiliza el [selector de sitio de documentación][20] para ver la documentación apropiada para el sitio que estás utilizando.

6. **Despliega el DaemonSet** con el comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

7. **Verificación**: para verificar que el Datadog Agent se está ejecutando en tu entorno como DaemonSet, ejecuta:

    ```shell
    kubectl get daemonset
    ```

     Si se despliega el Agent, aparecerá una salida similar al texto siguiente, donde `DESIRED` y `CURRENT` son iguales al número de nodos que se ejecutan en tu clúster.

    ```shell
    NAME      DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog   2         2         2         2            2           <none>          10s
    ```

## Configuración

### Recopilación de trazas

{{< tabs >}}
{{% tab "TCP" %}}

Para habilitar la recopilación de trazas de APM sobre TCP, abre el archivo de configuración de DaemonSet y edita lo siguiente:

- Permitir la entrada de datos desde el puerto `8126` (reenviando el tráfico del host al Agent) dentro del contenedor `trace-agent`:
    ```yaml
      # (...)
      containers:
        - name: trace-agent
          # (...)
          ports:
            - containerPort: 8126
              hostPort: 8126
              name: traceport
              protocol: TCP
      # (...)
    ```

- **Si utilizas Agent versión 7.17 o anterior**, además de los pasos anteriores, establece las variables `DD_APM_NON_LOCAL_TRAFFIC` y `DD_APM_ENABLED` en `true` en tu sección `env` del manifiesto del Agent de la traza `datadog.yaml`:

  ```yaml
    # (...)
    containers:
      - name: trace-agent
        # (...)
        env:
          - name: DD_APM_ENABLED
            value: 'true'
          - name: DD_APM_NON_LOCAL_TRAFFIC
            value: "true"
          # (...)
  ```

**Atención**: El parámetro `hostPort` abre un puerto en tu host. Asegúrate de que tu cortafuegos solo permite el acceso desde tus aplicaciones o fuentes de confianza. Si tu complemento de red no admite `hostPorts`, añade `hostNetwork: true` en las especificaciones de pod de tu Agent. Esto comparte el espacio de nombres de red de tu host con el Datadog Agent. Esto también significa que todos los puertos abiertos en el contenedor se abren en el host. Si un puerto se utiliza tanto en el host como en tu contenedor, entran en conflicto (ya que comparten el mismo espacio de nombres de red) y el pod no arranca. Algunas instalaciones de Kubernetes no permiten esto.


{{% /tab %}}
{{% tab "Unix Domain Socket (UDS)" %}}

Para habilitar la recopilación de trazas de APM a través de UDS, abre el archivo de configuración de DaemonSet y edita lo siguiente:

  ```yaml
    # (...)
    containers:
    - name: trace-agent
      # (...)
      env:
      - name: DD_APM_ENABLED
        value: "true"
      - name: DD_APM_RECEIVER_SOCKET
        value: "/var/run/datadog/apm.socket"
    # (...)
      volumeMounts:
      - name: apmsocket
        mountPath: /var/run/datadog/
    volumes:
    - hostPath:
        path: /var/run/datadog/
        type: DirectoryOrCreate
    # (...)
  ```

Esta configuración crea un directorio en el host y lo monta dentro del Agent. El Agent entonces crea y escucha en un archivo de socket en ese directorio con el valor`DD_APM_RECEIVER_SOCKET` de `/var/run/datadog/apm.socket`. Los pods de aplicación pueden entonces montar de forma similar este volumen y escribir en este mismo socket.

{{% /tab %}}
{{< /tabs >}}

### Recopilación de logs

**Nota**: Esta opción no es compatible con Windows. Utiliza en su lugar la opción [Helm][22].

Para activar la recopilación de logs con tu DaemonSet:

1. Establece la variable `DD_LOGS_ENABLED` y `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` en true en la sección *env* del manifiesto `datadog.yaml` del Agent:

    ```yaml
     # (...)
      env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_CONTAINER_EXCLUDE_LOGS
          value: "name:datadog-agent"
     # (...)
    ```

    **Nota**: Configurar `DD_CONTAINER_EXCLUDE_LOGS` impide que Datadog Agent recopile y envíe sus propios logs. Elimina este parámetro si deseas recopilar logs del Datadog Agent. Consulta la [variable de entorno para ignorar contenedores][21] para obtener más información. Cuando utilices ImageStreams dentro de entornos de OpenShift, configura `DD_CONTAINER_INCLUDE_LOGS` con el contenedor `name` para recopilar logs. Ambos parámetros Exclude/Include admiten expresiones regulares.

2. Monta el volumen `pointerdir` para evitar la pérdida de logs de contenedor durante reinicios o problemas de red y `/var/lib/docker/containers` para recopilar logs a través de archivo de log de Kubernetes también, dado que `/var/log/pods` es symlink a este directorio:

    ```yaml
      # (...)
        volumeMounts:
          # (...)
          - name: pointerdir
            mountPath: /opt/datadog-agent/run
          - name: logpodpath
           mountPath: /var/log/pods
          # Docker runtime directory, replace this path
          # with your container runtime logs directory,
          # or remove this configuration if `/var/log/pods`
          # is not a symlink to any other directory.
          - name: logcontainerpath
           mountPath: /var/lib/docker/containers
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointerdir
        - hostPath:
            path: /var/log/pods
          name: logpodpath
        # Docker runtime directory, replace this path
        # with your container runtime logs directory,
        # or remove this configuration if `/var/log/pods`
        # is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        # (...)
    ```

   `pointerdir` se utiliza para almacenar un archivo con un puntero a todos los contenedores de los que el Agent está recopilando logs. Esto es para asegurarse de que no se pierde ninguno cuando se reinicia Agent, o en el caso de un problema de red.

### Sin privilegios

(Opcional) Para ejecutar una instalación sin privilegios, añade lo siguiente a tu [plantilla de pod][2]:

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

donde `<USER_ID>` es el UID para ejecutar el Agent y `<DOCKER_GROUP_ID>` es el ID grupal del propietario del socket de Docker o containerd.

Cuando el Agent se ejecuta con un usuario no raíz, no puede leer directamente los archivos de log contenidos en `/var/lib/docker/containers`. En este caso, es necesario montar el socket de Docker en el contenedor del Agent para que pueda obtener los logs del contenedor del daemon de Docker.



### Recopilación de eventos de Cluster Agent

Si deseas que el Datadog Cluster Agent recopile eventos de Kubernetes, sigue estos pasos:

1. Desactiva la elección de líder en tu Agent de nodo estableciendo la variable `leader_election` o la variable de entorno `DD_LEADER_ELECTION` en `false`.

2. En el archivo de despliegue del Cluster Agent, establece la variable de entorno `DD_COLLECT_KUBERNETES_EVENTS` y `DD_LEADER_ELECTION` en `true`:

      ```yaml
        - name: DD_COLLECT_KUBERNETES_EVENTS
          value: "true"
        - name: DD_LEADER_ELECTION
          value: "true"
      ```

La configuración de la elección del líder, como se describe en los pasos anteriores, asegura que solo un Cluster Agent recopile los eventos.

Alternativamente, para recopilar los eventos de Kubernetes de un Agent de nodo, establece las variables de entorno `DD_COLLECT_KUBERNETES_EVENTS` y `DD_LEADER_ELECTION` en `true` en tu manifiesto de Agent.

```yaml
- name: DD_COLLECT_KUBERNETES_EVENTS
  value: "true"
- name: DD_LEADER_ELECTION
  value: "true"
```

## Variables de entorno

A continuación, se muestra la lista de variables de entorno disponibles para el Datadog Agent utilizando un DaemonSet. 

### Opciones globales

| Variable de Ent         | Descripción                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Tu clave API de Datadog (**obligatorio**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | Configura la etiqueta (tag) global `env` para todos los datos emitidos.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | El nombre de host que hay que usar para las métricas (si falla la detección automática).                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | Etiquetas de host separadas por espacios. Por ejemplo: `simple-tag-0 tag-key-1:tag-value-1`.                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Lugar de destino para tus métricas, trazas y logs. Tu `DD_SITE` es {{< region-param key="dd_site" code="true">}}. Por defecto es `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL`          | Configuración opcional para sobreescribir la URL para enviar métricas.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | Alias para `DD_DD_URL`. Se ignora si `DD_DD_URL` ya está configurada.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | El Agent ejecuta todos los checks de forma simultánea por defecto (valor por defecto = `4` ejecutadores). Para ejecutar checks de forma secuencial, establece el valor en `1`. Si necesitas ejecutar un número elevado de checks (o checks lentos), el componente `collector-queue` podría retrasarse y el check de estado falla. Puedes aumentar el número de ejecutadores para ejecutar checks en paralelo. |
| `DD_LEADER_ELECTION` | Si se están ejecutando varias instancias de Agent en tu clúster, establece esta variable en `true` para evitar la duplicación de la recopilación de eventos.                                                                                                                                                                                                                         |

### Configuraciones de proxy

A partir del Agent v6.4.0 (y v6.5.0 para el Trace Agent), se pueden sobreescribir los valores de configuración de proxy del Agent con las siguientes variables de entorno:

| Variable de Ent             | Descripción                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | Una URL de HTTP para usar como proxy para solicitudes de `http`.                     |
| `DD_PROXY_HTTPS`         | Una URL de HTTP para usar como proxy para solicitudes de `https`.                   |
| `DD_PROXY_NO_PROXY`      | Una lista separada por espacios de URLs para las que no se debe utilizar ningún proxy.      |
| `DD_SKIP_SSL_VALIDATION` | Una opción para comprobar si el Agent tiene problemas para conectarse a Datadog. |

Para obtener más información sobre la configuración de proxy, consulta la [documentación de proxy del Agent v6][23].



### DogStatsD (métricas personalizadas)

Enviar métricas personalizadas con [el protocolo StatsD][24]:

| Variable de Ent                     | Descripción                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Escucha los paquetes de DogStatsD de otros contenedores (obligatorio para enviar métricas personalizadas).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Los percentiles de histogramas para calcular (separados por espacios). Por defecto es `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Las agregaciones de histograma que hay que calcular (separadas por espacios). El valor por defecto es `"max median avg count"`.                                                          |
| `DD_DOGSTATSD_SOCKET`            | La ruta al socket Unix que hay que escuchar. Debe estar en un volumen montado `rw`.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Activa la detección de contenedores y el etiquetado para métricas de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Etiquetas adicionales para anexar a todas las métricas, los eventos y los checks de servicios recibidos por este servidor de DogStatsD, por ejemplo: `"env:golden group:retrievers"`. |

Obtén más información sobre [DogStatsD en Unix Domain Sockets][25].

### Etiquetado

Datadog recopila automáticamente etiquetas comunes de Kubernetes. Para extraer aún más etiquetas, utiliza las siguientes opciones:

| Variable de Ent                            | Descripción             |
|-----------------------------------------|-------------------------|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Extrae etiquetas del pod      |
| `DD_Kubernetes_POD_ANNOTATIONS_AS_TAGS` | Extrae anotaciones del pod |

Consulta la documentación de [Extracción de etiquetas de Kubernetes][26] para aprender más.

### Ignora los contenedores

Excluye contenedores de la recopilación de logs, la recopilación de métricas y Autodiscovery. Datadog excluye los contenedores `pause` de Kubernetes y OpenShift por defecto. Estas listas de permisos y bloqueos se aplican únicamente a Autodiscovery; trazas y DogStatsD no se ven afectados. Estas variables de entorno admiten expresiones regulares en sus valores.

| Variable de Ent                   | Descripción                                                                                                                                                                                                                        |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | Lista de contenedores permitidos a incluir (separados por espacios). Utiliza `.*` para incluirlos todos. Por ejemplo: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                                              |
| `DD_CONTAINER_EXCLUDE`         | Lista de contenedores a excluir (separados por espacios). Utiliza `.*` para excluir todo. Por ejemplo: `"image:image_name_3 image:image_name_4"`, `image:.*`                                                                              |
| `DD_CONTAINER_INCLUDE_METRICS` | Lista de autorizaciones cuyas métricas quieres incluir.                                                                                                                                                                         |
| `DD_CONTAINER_EXCLUDE_METRICS` | Lista de bloqueos de contenedores cuyas métricas quieres excluir.                                                                                                                                                                         |
| `DD_CONTAINER_INCLUDE_LOGS`    | Lista de autorizaciones de contenedores cuyos logs quieres incluir.                                                                                                                                                                            |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Lista de bloqueos de contenedores cuyos logs quieres excluir.                                                                                                                                                                            |
| `DD_AC_INCLUDE`                | **Obsoleto**. Lista de autorizaciones de contenedores a incluir (separados por espacios). Usa `.*` para incluir todos. Por ejemplo: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                              |
| `DD_AC_EXCLUDE`                | **Obsoleto**.  Lista de bloqueos de contenedores a excluir (separados por espacios). Usa `.*` para excluir todos. Por ejemplo: `"image:image_name_3 image:image_name_4"` (**Nota**: Esta variable solo se respeta para Autodiscovery), `image:.*` |

Encontrarás más ejemplos en la página [Gestió de Container Discovery][27].

**Nota**: Las métricas `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` y `.stopped.total` no se ven afectadas por estos ajustes. Se cuentan todos los contenedores.

### Autodiscovery

| Variable de Ent                 | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | Oyentes de Autodiscovery para ejecutar.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | Oyentes de Autodiscovery adicionales para ejecutar. Se añaden además de las variables definidas en la sección `listeners` del archivo de configuración `datadog.yaml`.                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        | Los proveedores a los que el Agent debe llamar para recopilar las configuraciones de check. Los proveedores disponibles son: <br>`kubelet`: maneja plantillas incrustadas en anotaciones de pods. <br>`docker`: maneja plantillas incrustadas en etiquetas de contenedor. <br> `clusterchecks`: recupera configuraciones de check de clúster del Cluster Agent . <br>`kube_services`: controla servicios de Kubernetes para checks de clústeres. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | Proveedores de configuración de Autodiscovery adicionales a utilizar. Se añaden además de las variables definidas en la sección `config_providers` del archivo de configuración `datadog.yaml`. |

### Varios

| Variable de Ent                        | Descripción                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Sobreescribe la detección automática del origen del contenedor para forzar un único origen. Por ejemplo: `"docker"`, `"ecs_fargate"`, `"kubelet"`. Esto ya no es necesario a partir de Agent v7.35.0.                                                                                                     |
| `DD_HEALTH_PORT`                    | Configura esto como `5555` para exponer el check de estado del Agent en el puerto `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Establece un identificador de clústeres de Kubernetes personalizado para evitar colisiones de alias de host. El nombre del clúster puede tener un máximo de 40 caracteres con las siguientes restricciones: solo letras minúsculas, números y guiones. Debe empezar por una letra. Debe terminar con un número o una letra. |


[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: /resources/yaml/datadog-agent-all-features.yaml
[3]: /resources/yaml/datadog-agent-windows-all-features.yaml
[4]: /resources/yaml/datadog-agent-logs-apm.yaml
[5]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-logs.yaml
[7]: /resources/yaml/datadog-agent-windows-logs.yaml
[8]: /resources/yaml/datadog-agent-apm.yaml
[9]: /resources/yaml/datadog-agent-windows-apm.yaml
[10]: /resources/yaml/datadog-agent-npm.yaml
[11]: /resources/yaml/datadog-agent-vanilla.yaml
[12]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[13]: /es/agent/kubernetes/apm/#setup
[14]: /es/agent/kubernetes/log/
[15]: /es/agent/kubernetes/apm/
[16]: /es/infrastructure/process/?tab=kubernetes#installation
[17]: /es/network_monitoring/performance/setup/
[18]: /es/data_security/agent/
[19]: https://app.datadoghq.com/organization-settings/api-keys
[20]: /es/getting_started/site/
[21]: /es/agent/docker/?tab=standard#ignore-containers
[22]: /es/containers/kubernetes/log
[23]: /es/agent/configuration/proxy/#agent-v6
[24]: /es/developers/dogstatsd/
[25]: /es/developers/dogstatsd/unix_socket/
[26]: /es/containers/kubernetes/tag/
[27]: /es/agent/guide/autodiscovery-management/