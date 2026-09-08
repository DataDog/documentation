---
algolia:
  tags:
  - cluster agent
aliases:
- /es/agent/cluster_agent/setup
- /es/agent/cluster_agent/event_collection
- /es/containers/cluster_agent/event_collection
description: Instale y configure el Datadog Cluster Agent para el seguimiento y el
  escalado automático de clústeres de Kubernetes
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Presentando el Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Escale automáticamente sus cargas de trabajo de Kubernetes con cualquier métrica
    de Datadog
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentación
  text: Ejecutando verificaciones de clúster con Autodiscovery
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentación
  text: Solución de problemas del Datadog Cluster Agent
- link: https://www.datadoghq.com/architecture/kubernetes-workload-autoscaling-with-datadog/
  tag: Centro de arquitectura
  text: Escalado automático de cargas de trabajo de Kubernetes con Datadog
- link: https://www.datadoghq.com/architecture/efficient-kubernetes-monitoring-with-the-datadog-cluster-agent/
  tag: Centro de arquitectura
  text: Seguimiento eficiente de Kubernetes con el Datadog Cluster Agent
- link: https://www.datadoghq.com/architecture/real-world-applications-of-the-datadog-cluster-agent-part-one/
  tag: Centro de arquitectura
  text: Aplicaciones del mundo real del Datadog Cluster Agent (Parte 1)
title: Configure el Datadog Cluster Agent
---
Si implementa el Datadog Agent usando el gráfico de Helm v2.7.0+ o el Datadog Operator v0.7.0+, el Cluster Agent se habilita de forma predeterminada.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

El Cluster Agent está habilitado de forma predeterminada desde Datadog Operator v1.0.0. El Operator crea los RBAC necesarios, implementa el Cluster Agent y modifica la configuración del DaemonSet del Agent.

Esto también genera automáticamente un token aleatorio en un `Secret` compartido tanto por el Cluster Agent como por el Datadog Agent para asegurar la comunicación. Puede especificar este token manualmente configurando el campo `global.clusterAgentToken`. Alternativamente, puede configurar esto haciendo referencia al nombre de un `Secret` existente y a la clave de datos que contiene este token.

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

Cuando se configura manualmente, este token debe tener 32 caracteres alfanuméricos.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

El Cluster Agent está habilitado de forma predeterminada desde el chart de Helm v2.7.0.

Para activarlo en versiones anteriores, o si utiliza un [datadog-values.yaml][1] personalizado que anula la clave `clusterAgent`, actualice su archivo [datadog-values.yaml][1] con la siguiente configuración del Cluster Agent:

  ```yaml
  clusterAgent:
    # clusterAgent.enabled -- Set this to false to disable Datadog Cluster Agent
    enabled: true
  ```

Luego, actualice su chart de Helm de Datadog.

Esto actualiza automáticamente los archivos RBAC necesarios para el Cluster Agent y el Datadog Agent. Ambos Agents utilizan la misma clave de API.

Esto también genera automáticamente un token aleatorio en un `Secret` compartido tanto por el Cluster Agent como por el Datadog Agent para asegurar la comunicación. Puede especificar manualmente este token utilizando la configuración `clusterAgent.token`. También puede configurar esto haciendo referencia al nombre de un `Secret` existente que contenga un valor `token` a través de la configuración `clusterAgent.tokenExistingSecret`.

Cuando se configura manualmente, este token debe tener 32 caracteres alfanuméricos.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}

Para configurar el Datadog Cluster Agent usando un DaemonSet:
1. [Configure los permisos RBAC del Cluster Agent](#configure-cluster-agent-rbac-permissions).
2. [Asegure la comunicación entre el Cluster Agent y el Agent](#secure-cluster-agent-to-agent-communication).
3. [Cree el Cluster Agent y su servicio](#create-the-cluster-agent-and-its-service).
4. [Configure el Agent de nodo para comunicarse con el Cluster Agent](#configure-datadog-agent-communication)

### Configure los permisos RBAC del Cluster Agent {#configure-cluster-agent-rbac-permissions}

El Datadog Cluster Agent necesita un RBAC adecuado para estar en funcionamiento:

1. Revise los manifiestos en la [carpeta RBAC del Datadog Cluster Agent][1]. **Nota**: Al usar el Cluster Agent, sus Agents de nodo no pueden interactuar con el servidor de la API de Kubernetes; solo el Cluster Agent puede hacerlo.

2. Para configurar los permisos de RBAC del Cluster Agent, aplique los siguientes manifiestos. (Es posible que ya haya hecho esto al configurar el [DaemonSet del Agent de nodo][2].)

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  Esto crea los `ServiceAccount`, `ClusterRole` y `ClusterRoleBinding` apropiados para el Cluster Agent y actualiza el `ClusterRole` para el Agent de nodo.

Si está utilizando Azure Kubernetes Service (AKS), es posible que necesite permisos adicionales. Consulte las preguntas frecuentes sobre [RBAC para DCA en AKS][3].

### Asegure la comunicación entre el Cluster Agent y el Agent {#secure-cluster-agent-to-agent-communication}

El Datadog Agent y el Cluster Agent requieren un token para asegurar su comunicación. Se recomienda que guarde este token en un `Secret` al que tanto el Datadog Agent como el Cluster Agent puedan hacer referencia en la variable de entorno `DD_CLUSTER_AGENT_AUTH_TOKEN`. Esto ayuda a mantener la coherencia y a evitar que el token sea legible en el `PodSpec`.

Para crear este token, ejecute este comando de una línea para generar un `Secret` llamado `datadog-cluster-agent` con un `token` establecido. Reemplace el `<TOKEN>` con 32 caracteres alfanuméricos.
  ```shell
  kubectl create secret generic datadog-cluster-agent --from-literal=token='<TOKEN>' --namespace="default"
  ```
**Nota:** Esto crea un `Secret` en el espacio de nombres predeterminado. Si se encuentra en un espacio de nombres personalizado, actualice el parámetro de espacio de nombres del comando antes de ejecutarlo.

El `cluster-agent-deployment.yaml` predeterminado proporcionado para el Cluster Agent ya está configurado para ver este `Secret` con la configuración de la variable de entorno:
  ```yaml
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

Esta variable de entorno debe configurarse (usando la misma configuración) al [Configurar el Datadog Agent][4].

### Cree el Cluster Agent y su servicio {#create-the-cluster-agent-and-its-service}

1. Descargue los siguientes manifiestos:

    * [`agent-services.yaml`: El manifiesto del servicio del Cluster Agent][5]
    * [`secret-api-key.yaml`: El secreto que contiene la clave de Datadog API][6]
    * [`secret-application-key.yaml`: El secreto que contiene la clave de aplicación de Datadog][7]
    * [`cluster-agent-deployment.yaml`: Manifiesto del Cluster Agent][8]
    * [`install_info-configmap.yaml`: Configmap de información de instalación][9]

2. En el manifiesto `secret-api-key.yaml`, reemplace `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` con [su clave de Datadog API][10] codificada en base64. Para obtener la versión en base64 de su clave de API, puede ejecutar:

    ```shell
    echo -n '<Your API key>' | base64
    ```
3. En el manifiesto `secrets-application-key.yaml`, reemplace `PUT_YOUR_BASE64_ENCODED_APP_KEY_HERE` con [su clave de aplicación de Datadog][11] codificada en base64.
4. De forma predeterminada, el manifiesto `cluster-agent-deployment.yaml` hace referencia al token creado anteriormente en el `Secret` `datadog-cluster-agent`. Si almacena este token de una manera alternativa, configure su variable de entorno `DD_CLUSTER_AGENT_AUTH_TOKEN` en consecuencia.
5. Implemente estos recursos para que los utilice el despliegue del Cluster Agent:
    ```shell
    kubectl apply -f agent-services.yaml
    kubectl apply -f secret-api-key.yaml
    kubectl apply -f secret-application-key.yaml
    kubectl apply -f install_info-configmap.yaml
    ```
6. Finalmente, implemente el Datadog Cluster Agent:
    ```shell
    kubectl apply -f cluster-agent-deployment.yaml
    ```

**Nota**: En su Datadog Cluster Agent, establezca la variable de entorno `DD_SITE` en su sitio de Datadog: {{< region-param key="dd_site" code="true" >}}. Su valor predeterminado es el sitio `US` `datadoghq.com`

### Verificación {#verification}

En este punto, debería ver:

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

**Nota**: Si ya tiene el Datadog Agent ejecutándose, es posible que deba aplicar el [manifiesto `rbac.yaml` del Datadog Agent][12] antes de que el Cluster Agent pueda comenzar a ejecutarse.

## Configurar la comunicación del Datadog Agent {#configure-datadog-agent-communication}

Modifique la configuración de su Datadog Agent para comunicarse con el Datadog Cluster Agent.

En su [archivo de manifiesto][2] de DaemonSet existente, establezca la variable de entorno `DD_CLUSTER_AGENT_ENABLED` en `true`. Luego, establezca `DD_CLUSTER_AGENT_AUTH_TOKEN` usando la misma sintaxis utilizada en [Comunicación segura entre Agents del clúster][13].

  ```yaml
  - name: DD_CLUSTER_AGENT_ENABLED
    value: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

Después de volver a implementar su DaemonSet con estas configuraciones aplicadas, el Datadog Agent puede comunicarse con el Cluster Agent. Puede consultar el [`daemonset.yaml` manifiesto][14] del Cluster Agent proporcionado para obtener un ejemplo completo.

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

### Verificación {#verification-1}

Puede verificar que sus Pods del Datadog Agent y los Pods del Cluster Agent se estén ejecutando al ejecutar el comando:

```shell
kubectl get pods | grep agent
```

Verá:

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

Adicionalmente, puede verificar que el Datadog Agent se haya conectado correctamente al Cluster Agent con la [salida de estado del Agent][1].

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

Los eventos de Kubernetes están comenzando a fluir hacia su cuenta de Datadog, y las métricas relevantes recopiladas por sus Agents están etiquetadas con sus metadatos de nivel de clúster correspondientes.

## Contenedores de Windows {#windows-containers}

El Datadog Cluster Agent solo se puede implementar en nodos de Linux.

Para hacer un seguimiento de contenedores de Windows, utilice dos instalaciones del Helm chart en un clúster mixto. El primer Helm chart despliega el Datadog Cluster Agent y el Agent DaemonSet para nodos Linux (con `targetSystem: linux`). El segundo Helm chart (con `targetSystem: windows`) despliega el Agent solo en nodos Windows y se conecta al Cluster Agent existente desplegado como parte del primer Helm chart.

Utilice el siguiente archivo `datadog-values.yaml` para configurar la comunicación entre los Agents desplegados en nodos Windows y el Cluster Agent.

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

Para obtener más información, consulte [Troubleshooting Windows Container Issues][2].

## Seguimiento de servicios administrados de AWS {#monitoring-aws-managed-services}

Para hacer un seguimiento de un servicio administrado de AWS como Amazon Managed Streaming for Apache Kafka (MSK), ElastiCache o Relational Database Service (RDS), configure `clusterChecksRunner` en su Helm chart para crear un Pod con un rol de IAM asignado a través de `serviceAccountAnnotation`. Luego, configure las configuraciones de integración bajo `clusterAgent.confd`.

{{< code-block lang="yaml" filename="datadog-values.yaml">}}
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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/?tab=agentv6v7#agent-information
[2]: https://docs.datadoghq.com/es/agent/troubleshooting/windows_containers/#mixed-clusters-linux--windows