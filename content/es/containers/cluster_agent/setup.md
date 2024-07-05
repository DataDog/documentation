---
algolia:
  tags:
  - cluster agent
aliases:
- /es/agent/cluster_agent/setup
- /es/agent/cluster_agent/event_collection
- /es/containers/cluster_agent/event_collection
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Introducción al Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Escala automáticamente tus cargas de trabajo de Kubernetes con cualquier métrica
    de Datadog
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentación
  text: Ejecutar checks de clúster con Autodiscovery
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Datadog Cluster Agent
title: Configurar el Datadog Cluster Agent
---

Si despliegas el Datadog Agent usando Helm chart v2.7.0 o Datadog Operator v0.7.0 (o sus respectivas versiones posteriores), el Cluster Agent estará habilitado de forma predeterminada.

{{< tabs >}}
{{% tab "Helm" %}}

El Cluster Agent está habilitado de forma predeterminada a partir de Helm chart v2.7.0.

Para habilitarlo en versiones anteriores, o si utilizas un [datadog-values.yaml][1] personalizado que anula la clave `clusterAgent`, debes actualizar tu archivo [datadog-values.yaml][1] con la siguiente configuración del Cluster Agent:

  ```yaml
  clusterAgent:
    # clusterAgent.enabled -- Set this to false to disable Datadog Cluster Agent
    enabled: true
  ```

A continuación, actualiza el Helm chart de Datadog.

Esto actualiza automáticamente los archivos de configuración del control de acceso basado en roles (RBAC) necesarios para el Cluster Agent y el Datadog Agent. Ambos Agents utilizan la misma clave de API.

Para garantizar la comunicación, también se genera automáticamente un token aleatorio en un `Secret` compartido por el Cluster Agent y el Datadog Agent. Puedes especificar manualmente este token a través de la configuración de `clusterAgent.token`. Alternativamente, puedes establecerlo indicando el nombre de un `Secret` existente que contenga un valor `token` a través de la configuración de `clusterAgent.tokenExistingSecret`.

Cuando se configura manualmente, este token debe estar compuesto por 32 caracteres alfanuméricos.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

El Cluster Agent está habilitado de forma predeterminada a partir del Datadog Operator v1.0.0. El Operator configura los controles de acceso basado en roles necesarios, implementa el Cluster Agent y modifica la configuración del DaemonSet del Agent.

Para garantizar la comunicación, también se genera automáticamente un token aleatorio en un `Secret` compartido por el Cluster Agent y el Datadog Agent. Puedes especificar manualmente este token configurando el campo `global.clusterAgentToken`. Alternativamente, puedes establecerlo indicando el nombre de un `Secret` existente y a la clave de datos que contiene este token.

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
      clusterAgentTokenSecret:
        secretName: <SECRET_NAME>
        keyName: <KEY_NAME>
  ```

Cuando se configura manualmente, este token debe estar compuesto por 32 caracteres alfanuméricos.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}

Para configurar el Datadog Cluster Agent usando un DaemonSet:
1. [Configura los permisos de control de acceso basado en roles del Cluster Agent](#configure-cluster-agent-rbac-permissions).
2. [Garantiza la comunicación entre el Cluster Agent y el Agent](#secure-cluster-agent-to-agent-communication).
3. [Crea el Cluster Agent y su servicio](#create-the-cluster-agent-and-its-service).
4. [Configura el Agent de nodo para que se comunicar con el Cluster Agent](#configure-datadog-agent-communication).

### Configura los permisos de control de acceso basado en roles del Cluster Agent

El Datadog Cluster Agent necesita una configuración del control de acceso basado en roles (RBAC) adecuada para funcionar:

1. Revisa los manifiestos de la [carpeta de RBAC del Datadog Cluster Agent][1]. **Nota**: Cuando utilizas el Cluster Agent, tus Agents de nodo no pueden interactuar con el servidor de la API de Kubernetes; solo el Cluster Agent es capaz de hacerlo.

2. Para configurar los permisos del control de acceso basado en roles del Cluster Agent, aplica los siguientes manifiestos. (Es posible que ya lo hayas hecho al configurar el [daemonset del Agent de nodo][2]).

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  Esto crea los `ServiceAccount`, `ClusterRole` y `ClusterRoleBinding` adecuados para el Cluster Agent y actualiza el `ClusterRole` del Agent de nodo.

Si utilizas Azure Kubernetes Service (AKS), es posible que necesites permisos adicionales. Consulta las FAQ sobre la [configuración del control de acceso basado en roles (RBAC) del Datadog Cluster Agent en AKS][3].

### Garantiza la comunicación entre el Cluster Agent y el Agent

El Datadog Agent y el Cluster Agent necesitan un token para garantizar su comunicación. Se recomienda que guardes este token en un `Secret` que tanto el Datadog Agent como el Cluster Agent puedan referenciar en la variable de entorno `DD_CLUSTER_AGENT_AUTH_TOKEN`. Esto ayuda a mantener la coherencia y a evitar que el token sea legible en el `PodSpec`.

Para crear el token, ejecuta este comando de una línea para generar un `Secret` llamado `datadog-cluster-agent` con un parámetro `token`. Reemplaza el parámetro `<TOKEN>` por 32 caracteres alfanuméricos.
  ```shell
  kubectl create secret generic datadog-cluster-agent --from-literal=token='<TOKEN>' --namespace="default"
  ```
**Nota:** Esto crea un `Secret` en el espacio de nombres predeterminado. Si estás en un espacio de nombres personalizado, actualiza el parámetro de espacio de nombres del comando antes de ejecutarlo.

El archivo predeterminado `cluster-agent-deployment.yaml` proporcionado para el Cluster Agent ya está configurado para ver este `Secret` con la configuración de variable de entorno:
  ```yaml
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

Esta variable de entorno debe configurarse (con la misma configuración) cuando [se configura el Datadog Agent][4].

### Crea el Cluster Agent y su servicio

1. Descarga los siguientes manifiestos:

    * [`agent-services.yaml`: manifiesto de servicio del Cluster Agent][5]
    * [`secret-api-key.yaml`: secreto que contiene la clave de API de Datadog][6]
    * [`secret-application-key.yaml`: secreto que contiene la clave de aplicación de Datadog][7]
    * [`cluster-agent-deployment.yaml`: manifiesto del Cluster Agent][8]
    * [`install_info-configmap.yaml`: información para instalar un ConfigMap][9]

2. En el manifiesto `secret-api-key.yaml`, reemplaza `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` por [tu clave de API de Datadog][10], codificada en Base64. Para obtener la versión de Base64 de tu clave de API, puedes ejecutar esto:

    ```shell
    echo -n '<Your API key>' | base64
    ```
3. En el manifiesto `secrets-application-key.yaml` reemplaza `PUT_YOUR_BASE64_ENCODED_APP_KEY_HERE` por [tu clave de aplicación de Datadog][11], codificada en Base64.
4. De forma predeterminada, el manifiesto `cluster-agent-deployment.yaml` indica el token creado previamente en el parámetro `datadog-cluster-agent` del `Secret`. Si quieres almacenar este token de otra forma, configura tu variable de entorno `DD_CLUSTER_AGENT_AUTH_TOKEN` en consecuencia.
5. Despliega estos recursos para que los utilice la implementación del Cluster Agent:
    ```shell
    kubectl apply -f agent-services.yaml
    kubectl apply -f secret-api-key.yaml
    kubectl apply -f secret-application-key.yaml
    kubectl apply -f install_info-configmap.yaml
    ```
6. Por último, despliega el Datadog Cluster Agent:
    ```shell
    kubectl apply -f cluster-agent-deployment.yaml
    ```

**Nota**: En tu Datadog Cluster Agent, establece la variable de entorno `DD_SITE` en tu sitio Datadog: {{< region-param key="dd_site" code="true" >}}. El sitio predeterminado de `datadoghq.com` es `US`.

### Verificación

Llegados a este punto, deberías ver lo siguiente:

```shell
kubectl get deploy

NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

kubectl get secret

NAME                    TYPE                                  DATA      AGE
datadog-cluster-agent   Opaque                                1         1d

kubectl get pods -l app=datadog-cluster-agent

datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

kubectl get service -l app=datadog-cluster-agent

NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

**Nota**: Si el Datadog Agent ya en ejecución, puede que necesites aplicar el [manifiesto `rbac.yaml` del Agent][12] antes de que el Cluster Agent pueda empezar a ejecutarse.

## Configurar la comunicación del Datadog Agent

Modifica la configuración de tu Datadog Agent para que se comunique con el Datadog Cluster Agent.

En el [archivo del manifiesto][2] DaemonSet existente, establece la variable de entorno `DD_CLUSTER_AGENT_ENABLED` como `true`. A continuación, define el parámetro `DD_CLUSTER_AGENT_AUTH_TOKEN` utilizando la misma sintaxis que en la sección [Garantiza la comunicación entre el Cluster Agent y el Agent][13].

  ```yaml
  - name: DD_CLUSTER_AGENT_ENABLED
    value: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

Después de volver a desplegar tu DaemonSet con estas configuraciones, el Datadog Agent es capaz de comunicarse con el Cluster Agent. Puedes consultar el [manifiesto `daemonset.yaml`][14] del Cluster Agent para ver un ejemplo completo.

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests/cluster-agent
[2]: /es/agent/kubernetes/?tab=daemonset
[3]: /es/agent/faq/rbac-for-dca-running-on-aks-with-helm/
[4]: /es/agent/cluster_agent/setup/?tab=daemonset#configure-the-datadog-agent
[5]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml
[6]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/secret-api-key.yaml
[7]: https://raw.githubusercontent.com/DataDog/datadog-agent/main/Dockerfiles/manifests/cluster-agent/secret-application-key.yaml
[8]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml
[9]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/install_info-configmap.yaml
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/access/application-keys
[12]: /es/agent/cluster_agent/setup/?tab=daemonset#configure-rbac-permissions
[13]: /es/agent/cluster_agent/setup/?tab=daemonset#secure-cluster-agent-to-agent-communication
[14]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/daemonset.yaml
{{% /tab %}}
{{< /tabs >}}

### Verificación

Para verificar que los pods del Datadog Agent y del Cluster Agent están en ejecución, ejecuta el siguiente comando:

```shell
kubectl get pods | grep agent
```

Lo normal sería que vieses esto:

```shell
datadog-agent-4k9cd                      1/1       Running   0          2h
datadog-agent-4v884                      1/1       Running   0          2h
datadog-agent-9d5bl                      1/1       Running   0          2h
datadog-agent-dtlkg                      1/1       Running   0          2h
datadog-agent-jllww                      1/1       Running   0          2h
datadog-agent-rdgwz                      1/1       Running   0          2h
datadog-agent-x5wk5                      1/1       Running   0          2h
[...]
datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h
```

Adicionalmente, puedes verificar que el Datadog Agent se ha conectado correctamente al Cluster Agent con el [resultado del estado del Agent][1].

```shell
kubectl exec -it <AGENT_POD_NAME> agent status
[...]
=====================
Datadog Cluster Agent
=====================

  - Datadog Cluster Agent endpoint detected: https://10.104.246.194:5005
  Successfully connected to the Datadog Cluster Agent.
  - Running: 1.11.0+commit.4eadd95
```

Los eventos de Kubernetes comienzan a fluir hacia tu cuenta de Datadog, y las métricas relevantes recopiladas por tus Agents se han etiquetado con sus correspondientes metadatos del clúster.

## Contenedores de Windows

El Datadog Cluster Agent solo se puede implementar en nodos de Linux.

Para monitorizar los contenedores de Windows, utiliza dos instalaciones del Helm chart en un clúster mixto. El primer Helm chart despliega el Datadog Cluster Agent y el Agent DaemonSet en los nodos de Linux (con `targetSystem: linux`). El segundo Helm chart (con `targetSystem: windows`) despliega el Agent solo en los nodos de Windows y se conecta al Cluster Agent desplegado como parte del primer Helm chart.

Para configurar la comunicación entre los Agents desplegados en nodos Windows y el Cluster Agent, utiliza el siguiente archivo `values.yaml`.

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<EXISTING_DCA_SECRET_NAME>" # from the first Datadog Helm chart
  tokenSecretName: "<EXISTING_DCA_SERVICE_NAME>" # from the first Datadog Helm chart

# Disable datadogMetrics deployment since it should have been already deployed with the first chart.
datadog-crds:
  crds:
    datadogMetrics: false
# Disable kube-state-metrics deployment
datadog:
  kubeStateMetricsEnabled: false
```

Para obtener más información, consulta la documentación acerca de cómo [solucionar problemas en los contenedores de Windows][2].

## Monitorizar servicios gestionados de AWS

Para monitorizar un servicio gestionado de AWS, como MSK, ElastiCache o RDS, configura `clusterChecksRunner` para crear un pod con un rol de IAM asignado a través del serviceAccountAnnotation del Helm chart. A continuación, establece las configuraciones de integración en `clusterAgent.confd`.

{{< code-block lang="yaml" >}}
clusterChecksRunner:
  enabled: true
  rbac:
    # clusterChecksRunner.rbac.create -- If true, create & use RBAC resources
    create: true
    dedicated: true
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::***************:role/ROLE-NAME-WITH-MSK-READONLY-POLICY
clusterAgent:
  confd:
    amazon_msk.yaml: |-
      cluster_check: true
      instances:
        - cluster_arn: arn:aws:kafka:us-west-2:*************:cluster/gen-kafka/*******-8e12-4fde-a5ce-******-3
          region_name: us-west-2
{{< /code-block >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/?tab=agentv6v7#agent-information
[2]: https://docs.datadoghq.com/es/agent/troubleshooting/windows_containers/#mixed-clusters-linux--windows