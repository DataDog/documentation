---
app_id: eks-fargate
app_uuid: f5919a4b-4142-4889-b9c0-6ecdab299ebb
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: eks.fargate.pods.running
      metadata_path: metadata.csv
      prefix: eks.fargate.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: EKS Fargate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/eks_fargate/README.md
display_on_public_website: true
draft: false
git_integration_title: eks_fargate
integration_id: eks-fargate
integration_title: Amazon EKS en AWS Fargate
integration_version: 6.0.0
is_public: true
manifest_version: 2.0.0
name: eks_fargate
public_title: Amazon EKS en AWS Fargate
short_description: Recopila las métricas, las trazas (traces) y los logs de Amazon
  EKS.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Category::AWS
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopila las métricas, las trazas y los logs de Amazon EKS.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/aws-fargate-metrics/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
  support: README.md#Support
  title: Amazon EKS en AWS Fargate
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

<div class="alert alert-warning"> En esta página se describe la integración de EKS Fargate. Para ECS Fargate, consulta la documentación sobre la <a href="http://docs.datadoghq.com/integrations/ecs_fargate">integración de ECS Fargate de Datadog</a>.
</div>

Amazon EKS en AWS Fargate es un servicio gestionado de Kubernetes que automatiza ciertos aspectos del despliegue y mantenimiento de cualquier entorno estándar de Kubernetes. AWS Fargate gestiona los nodos de Kubernetes y los abstrae del usuario.

**Nota**: Cloud Network Monitoring (CNM) no es compatible con EKS Fargate.

## Configuración

Estos pasos cubren la configuración del Datadog Agent v7.17+ en un contenedor dentro de Amazon EKS en AWS Fargate. Consulta la [documentación de la integración de Datadog y Amazon EKS][1] si no utilizas AWS Fargate.

Los pods de AWS Fargate no son pods físicos, lo que significa que excluyen los [checks de los sistemas basados en hosts][2], como CPU, memoria, etc. Para recopilar los datos de los pods de AWS Fargate, debes ejecutar el Agent como sidecar de un pod de aplicación con control de acceso basado en roles (RBAC) personalizado. Esto habilita las siguientes características:

- Recopilación de las métricas de Kubernetes del pod que ejecuta los contenedores de aplicaciones y el Agent
- [Autodiscovery][3]
- Configuración de checks personalizados del Agent para establecer los contenedores en el mismo pod como destino
- APM y DogStatsD para los contenedores del mismo pod

### Nodo de EC2

Si no se especifica a través de [AWS Fargate Profile][4] que los pods deben ejecutarse en Fargate, los pods pueden utilizar máquinas de EC2 clásicas. En ese caso, consulta la [configuración de la integración de Datadog y Amazon EKS][5] para recopilar sus datos. Esto funciona con la ejecución del Agent como una carga de trabajo de tipo EC2. La configuración del Agent es la misma que la [configuración del Kubernetes Agent][6], y todas las opciones están disponibles. Para desplegar el Agent en nodos de EC2, utiliza la [configuración del DaemonSet del Datadog Agent][7].

### Instalación

Para obtener las mejores cargas de trabajo de monitorización de la cobertura de observabilidad en AWS EKS Fargate, instala las integraciones de Datadog para los siguientes servicios:

- [Kubernetes][8]
- [AWS][9]
- [EKS][10]
- [EC2][11] (si ejecutas un nodo de tipo EC2)

Además, configura las integraciones para cualquier otro servicio de AWS que ejecutes con EKS (por ejemplo, [ELB][12]).

#### Instalación manual

Para realizar la instalación, descarga la imagen personalizada del Agent: `datadog/agent` con la versión 7.17 o una superior.

Si el Agent se ejecuta como sidecar, solo puede comunicarse con contenedores del mismo pod. Ejecuta un Agent para cada pod que quieras monitorizar.

### Configuración

Para recopilar los datos de las aplicaciones que se ejecutan en AWS EKS Fargate a través de un nodo de Fargate, sigue estos pasos de configuración:

- [Configurar las reglas de RBAC de AWS EKS Fargate](#aws-eks-fargate-rbac).
- [Desplegar el Agent como sidecar](#running-the-agent-as-a-sidecar).
- Configurar la recopilación de [métricas](#metrics-collection), [logs](#log-collection), [eventos](#events-collection) y [trazas](#traces-collection) de Datadog.

Para ver los contenedores de EKS Fargate en la Datadog Live Container View, habilita `shareProcessNamespace` en las especiaciones del pod. Consulta [Recopilación de procesos](#process-collection).

#### RBAC de AWS EKS Fargate

Utiliza el siguiente RBAC del Agent cuando despliegues el Agent como sidecar en AWS EKS Fargate:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-agent
rules:
  - apiGroups:
    - ""
    resources:
    - nodes
    - namespaces
    - endpoints
    verbs:
    - get
    - list
  - apiGroups:
      - ""
    resources:
      - nodes/metrics
      - nodes/spec
      - nodes/stats
      - nodes/proxy
      - nodes/pods
      - nodes/healthz
    verbs:
      - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-agent
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-agent
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    namespace: default
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: datadog-agent
  namespace: default
```

#### Ejecución del Agent como sidecar

Puedes ejecutar el Agent como sidecar mediante el [Datadog Admission Controller][13] (requiere el Cluster Agent v7.52+) o con una configuración de sidecar manual. Con el Admission Controller, puedes inyectar un sidecar del Agent en cada pod que tenga la etiqueta (label) `agent.datadoghq.com/sidecar:fargate`. 

Con la configuración manual, debes modificar cada manifiesto de carga de trabajo al añadir o cambiar el sidecar del Agent. Datadog recomienda utilizar el Admission Controller.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
##### Admission Controller con Datadog Operator

<div class="alert alert-warning">Esta característica requiere el Cluster Agent v7.52.0+, el Datadog Operator v1.7.0+ y la <a href="https://docs.datadoghq.com/integrations/eks_fargate">integración de EKS Fargate</a>.
</div>

La siguiente configuración permite que el Cluster Agent se comunique con los sidecars del Agent y acceda a características como la [recopilación de eventos][1], la [vista de recursos de Kubernetes][2] y los [checks de clústeres][3].

**Requisitos previos**

* Configura el RBAC en el espacio de nombres de aplicación. Consulta la sección [RBAC de AWS EKS Fargate](#aws-eks-fargate-rbac) de esta página.
* Vincula el RBAC anterior al pod de aplicación al configurar el nombre de cuenta de servicio.
* Crea un secreto de Kubernetes que contenga tu clave de la API de Datadog y el token del Cluster Agent en los espacios de nombres de instalación y aplicación de Datadog:

   ```shell
   kubectl create secret generic datadog-secret -n datadog-agent \
           --from-literal api-key=<YOUR_DATADOG_API_KEY> --from-literal token=<CLUSTER_AGENT_TOKEN>
   kubectl create secret generic datadog-secret -n fargate \
           --from-literal api-key=<YOUR_DATADOG_API_KEY> --from-literal token=<CLUSTER_AGENT_TOKEN>
   ```
   Para obtener más información sobre cómo se utilizan estos secretos, consulta la [Configuración del Cluster Agent][4].

###### Configuración

1. Crea un recurso personalizado `DatadogAgent` en `datadog-agent.yaml` con el Admission Controller habilitado:

   ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        clusterAgentTokenSecret:
          secretName: datadog-secret
          keyName: token
        credentials:
          apiSecret:
            secretName: datadog-secret
            keyName: api-key
      features:
        admissionController:
          agentSidecarInjection:
            enabled: true
            provider: fargate
   ```
   A continuación, aplica la nueva configuración:

   ```shell
   kubectl apply -n datadog-agent -f datadog-agent.yaml
   ```

2. Una vez que el Cluster Agent alcanza un estado de ejecución y registra los webhooks mutados del Admission Controller, se inyecta automáticamente un sidecar del Agent en cualquier pod creado con la etiqueta `agent.datadoghq.com/sidecar:fargate`. 
   **El Admission Controller no muta los pods ya creados**.

**Resultado de ejemplo**

   A continuación se muestra un fragmento de `spec.containers` de un despliegue de Redis en el que el Admission Controller inyecta un sidecar del Agent. El sidecar se configura automáticamente con los valores predeterminados internos e incluye parámetros adicionales para ejecutarse en un entorno de EKS Fargate. El sidecar utiliza el repositorio de imágenes y las etiquetas (tags) configurados en `datadog-agent.yaml`. La comunicación entre el Cluster Agent y los sidecars se encuentra habilitada de manera predeterminada. 

   {{< highlight yaml "hl_lines=7-29" >}}
     containers:
     - args:
       - redis-server
       image: redis:latest
     # ...
     - env:
       - name: DD_API_KEY
         valueFrom:
           secretKeyRef:
             key: api-key
             name: datadog-secret
       - name: DD_CLUSTER_AGENT_AUTH_TOKEN
         valueFrom:
           secretKeyRef:
             key: token
             name: datadog-secret
       - name: DD_EKS_FARGATE
         value: "true"
       # ...
       image: gcr.io/datadoghq/agent:7.51.0
       imagePullPolicy: IfNotPresent
       name: datadog-agent-injected
       resources:
         limits:
           cpu: 200m
           memory: 256Mi
         requests:
           cpu: 200m
           memory: 256Mi
   {{< /highlight >}}

###### Perfiles de sidecar y selectores personalizados

Para ampliar la configuración del Agent o de sus recursos de contenedores, utiliza las propiedades de tu recurso `DatadogAgent`. Utiliza la propiedad `spec.features.admissionController.agentSidecarInjection.profiles` para añadir definiciones de variables de entorno y parámetros de recursos. Utiliza la propiedad `spec.features.admissionController.agentSidecarInjection.selectors` para configurar un selector personalizado y establecer los pods de una carga de trabajo como destino en lugar de actualizar la carga de trabajo para añadir las etiquetas `agent.datadoghq.com/sidecar:fargate`.

  1. Crea un recurso personalizado `DatadogAgent` en el archivo `datadog-values.yaml` que configure un perfil de sidecar y un selector de pods personalizado.

     **Ejemplo**

     En el siguiente ejemplo, un selector tiene todos los pods establecidos como destino con la etiqueta `"app": redis`. El perfil de sidecar configura una variable de entorno `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` y parámetros de recursos. 

     ```yaml
        spec:
          features:
            admissionController:
              agentSidecarInjection:
                enabled: true
                provider: fargate
                selectors:
                - objectSelector:
                    matchLabels:
                      "app": redis
                profiles:
                - env:
                  - name: DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED
                    value: "true"
                  resources:
                    requests:
                      cpu: "400m"
                      memory: "256Mi"
                    limits:
                      cpu: "800m"
                      memory: "512Mi"
     ```

     A continuación, aplica la nueva configuración:

     ```shell
     kubectl apply -n datadog-agent -f datadog-agent.yaml
     ```

  2. Una vez que el Cluster Agent alcanza un estado de ejecución y registra los webhooks mutados del Admission Controller, se inyecta automáticamente un sidecar del Agent en cualquier pod creado con la etiqueta `app:redis`.
   **El Admission Controller no muta los pods ya creados**.

 **Resultado de ejemplo**

 A continuación se muestra un fragmento de `spec.containers` de un despliegue de Redis en el que el Admission Controller inyecta un sidecar del Agent. Las variables de entorno y los parámetros de recursos de `datadog-agent.yaml` se aplican automáticamente.

   {{< highlight yaml "hl_lines=12-30" >}}
   labels:
     app: redis
     eks.amazonaws.com/fargate-profile: fp-fargate
     pod-template-hash: 7b86c456c4
   # ...
   containers:
   - args:
     - redis-server
     image: redis:latest
   # ...
   - env:
     - name: DD_API_KEY
       valueFrom:
         secretKeyRef:
           key: api-key
           name: datadog-secret
     # ...
     - name: DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED
       valor: "true"
     # ...
     image: gcr.io/datadoghq/agent:7.51.0
     imagePullPolicy: IfNotPresent
     name: datadog-agent-injected
     recursos:
       limits:
         cpu: 800m
         memory: 512Mi
       requests:
         cpu: 400m
         memory: 256Mi
   {{< /highlight >}}

[1]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=helm#event-collection
[2]: https://docs.datadoghq.com/es/infrastructure/livecontainers/#kubernetes-resources-view
[3]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/#overview
[4]: http://docs.datadoghq.com/agent/cluster_agent
{{% /tab %}}
{{% tab "Helm" %}}
##### Admission Controller con Helm

<div class="alert alert-warning">Esta característica requiere el Cluster Agent v7.52.0+.
</div>

La siguiente configuración permite que el Cluster Agent se comunique con los sidecars del Agent y acceda a características como la [recopilación de eventos][1], la [vista de recursos de Kubernetes][2] y los [checks de clústeres][3].

**Requisitos previos**

* Configura el RBAC en el espacio de nombres de aplicación. Consulta la sección [RBAC de AWS EKS Fargate](#aws-eks-fargate-rbac) de esta página.
* Vincula el RBAC anterior al pod de aplicación al configurar el nombre de cuenta de servicio.
* Crea un secreto de Kubernetes que contenga tu clave de la API de Datadog y el token del Cluster Agent en los espacios de nombres de instalación y aplicación de Datadog:

   ```shell
   kubectl create secret generic datadog-secret -n datadog-agent \
           --from-literal api-key=<YOUR_DATADOG_API_KEY> --from-literal token=<CLUSTER_AGENT_TOKEN>
   kubectl create secret generic datadog-secret -n fargate \
           --from-literal api-key=<YOUR_DATADOG_API_KEY> --from-literal token=<CLUSTER_AGENT_TOKEN>
   ```
   Para obtener más información sobre cómo se utilizan estos secretos, consulta la [Configuración del Cluster Agent][4].

###### Configuración

1. Crea un archivo, `datadog-values.yaml`, que contenga:

   ```sh
   datadog:
     clusterName: <CLUSTER_NAME>
     apiKeyExistingSecret: datadog-secret
   agents:
     enabled: false
   clusterAgent:
     tokenExistingSecret: datadog-secret
     admissionController:
       agentSidecarInjection:
         enabled: true
         provider: fargate
   ```
   **Nota**: Utiliza `agents.enabled=false` para un clúster exclusivo de Fargate. En el caso de un clúster mixto, define `agents.enabled=true` para crear un DaemonSet destinado a la monitorización de cargas de trabajo en instancias de EC2.

2. Despliega el gráfico:

   ```bash
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

3. Una vez que el Cluster Agent alcanza un estado de ejecución y registra los webhooks mutados del Admission Controller, se inyecta automáticamente un sidecar del Agent en cualquier pod creado con la etiqueta `agent.datadoghq.com/sidecar:fargate`. 
   **El Admission Controller no muta los pods ya creados**.

**Resultado de ejemplo**

A continuación se muestra un fragmento de `spec.containers` de un despliegue de Redis en el que el Admission Controller inyecta un sidecar del Agent. El sidecar se configura automáticamente con los valores predeterminados internos e incluye parámetros adicionales para ejecutarse en un entorno de EKS Fargate. El sidecar utiliza el repositorio de imágenes y las etiquetas configurados en los valores de Helm. La comunicación entre el Cluster Agent y los sidecars se encuentra habilitada de manera predeterminada. 

{{< highlight yaml "hl_lines=7-29" >}}
  containers:
  - args:
    - redis-server
    image: redis:latest
  # ...
  - env:
    - name: DD_API_KEY
      valueFrom:
        secretKeyRef:
          key: api-key
          name: datadog-secret
    - name: DD_CLUSTER_AGENT_AUTH_TOKEN
      valueFrom:
        secretKeyRef:
          key: token
          name: datadog-secret
    - name: DD_EKS_FARGATE
      valor: "true"
    # ...
    image: gcr.io/datadoghq/agent:7.51.0
    imagePullPolicy: IfNotPresent
    name: datadog-agent-injected
    recursos:
      limits:
        cpu: 200m
        memory: 256Mi
      requests:
        cpu: 200m
        memory: 256Mi
{{< /highlight >}}

###### Perfiles de sidecar y selectores personalizados

Para ampliar la configuración del Agent o de sus recursos de contenedores, utiliza la propiedad de Helm `clusterAgent.admissionController.agentSidecarInjection.profiles` para añadir definiciones de variables de entorno y parámetros de recursos. Utiliza la propiedad `clusterAgent.admissionController.agentSidecarInjection.selectors` para configurar un selector personalizado y establecer los pods de una carga de trabajo como destino en lugar de actualizar la carga de trabajo para añadir las etiquetas `agent.datadoghq.com/sidecar:fargate`.

1. Crea un archivo `datadog-values.yaml` de Helm que configure un perfil de sidecar y un selector de pods personalizado. 

   **Ejemplo**

   En el siguiente ejemplo, un selector tiene todos los pods establecidos como destino con la etiqueta `"app": redis`. El perfil de sidecar configura una variable de entorno `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` y parámetros de recursos. 

   ```yaml
   clusterAgent:
     admissionController:
       agentSidecarInjection:
         selectors:
           - objectSelector:
               matchLabels:
                   "app": redis
         profiles:
           - env:
             - name: DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED
               value: "true"
             resources:
               requests:
                 cpu: "400m"
                 memory: "256Mi"
               limits:
                 cpu: "800m"
                 memory: "512Mi"
   ```

2. Instala el chart:

   ```shell
   helm install datadog datadog/datadog -n datadog-agent \
       --set datadog.clusterName=cluster-name \
       --set agents.enabled=false \
       --set datadog.apiKeyExistingSecret=datadog-secret \
       --set clusterAgent.tokenExistingSecret=datadog-secret \
       --set clusterAgent.admissionController.agentSidecarInjection.enabled=true \
       --set clusterAgent.admissionController.agentSidecarInjection.provider=fargate \
       -f datadog-values.yaml
   ```
   **Nota**: Utiliza `agents.enabled=false` para un clúster exclusivo de Fargate. En el caso de un clúster mixto, define `agents.enabled=true` para crear un DaemonSet destinado a la monitorización de cargas de trabajo en instancias de EC2.

3. Una vez que el Cluster Agent alcanza un estado de ejecución y registra los webhooks mutados del Admission Controller, se inyecta automáticamente un sidecar del Agent en cualquier pod creado con la etiqueta `app:redis`. 
   **El Admission Controller no muta los pods ya creados**.

**Resultado de ejemplo**

A continuación se muestra un fragmento de `spec.containers` de un despliegue de Redis en el que el Admission Controller inyecta un sidecar del Agent. Las variables de entorno y los parámetros de recursos de `datadog-values.yaml` se aplican automáticamente.

{{< highlight yaml "hl_lines=12-30" >}}
labels:
  app: redis
  eks.amazonaws.com/fargate-profile: fp-fargate
  pod-template-hash: 7b86c456c4
# ...
containers:
- args:
  - redis-server
  image: redis:latest
# ...
- env:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        key: api-key
        name: datadog-secret
  # ...
  - name: DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED
    valor: "true"
  # ...
  image: gcr.io/datadoghq/agent:7.51.0
  imagePullPolicy: IfNotPresent
  name: datadog-agent-injected
  recursos:
    limits:
      cpu: 800m
      memory: 512Mi
    requests:
      cpu: 400m
      memory: 256Mi
{{< /highlight >}}


[1]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=helm#event-collection
[2]: https://docs.datadoghq.com/es/infrastructure/livecontainers/#kubernetes-resources-view
[3]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/#overview
[4]: http://docs.datadoghq.com/agent/cluster_agent
{{% /tab %}}
{{% tab "Manual" %}}
##### Manual

Para empezar a recopilar datos de tu pod de tipo Fargate, despliega el Datadog Agent v7.17+ como sidecar de tu aplicación. Esta es la configuración mínima necesaria para recopilar métricas de la aplicación que se ejecuta en el pod. Observa la adición de `DD_EKS_FARGATE=true` en el manifiesto para desplegar el sidecar del Datadog Agent.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 replicas: 1
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## Ejecución del Agent como sidecar
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## Define DD_SITE como "datadoghq.eu" para enviar los
         ## datos del Agent al sitio de Datadog de la UE
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_CLUSTER_NAME
         value: "<CLUSTER_NAME>"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**Nota**: No olvides reemplazar `<YOUR_DATADOG_API_KEY>` por la [clave de la API de Datadog de tu organización][1].

**Nota**: Añade el `kube_cluster_name:<CLUSTER_NAME>` que quieras a la lista de `DD_TAGS` para asegurarte de que tus métricas se etiqueten según el clúster deseado. Puedes añadir etiquetas adicionales aquí como etiquetas `<KEY>:<VALUE>` separadas por espacios. Para los Agents `7.34+` y `6.34+`, esto no es necesario. En su lugar, establece la variable de entorno `DD_CLUSTER_NAME`.

###### Ejecución del Cluster Agent o el Cluster Checks Runner

Datadog recomienda ejecutar el Cluster Agent para acceder a características como la [recopilación de eventos][2], la [vista de recursos de Kubernetes][3] y los [checks de clústeres][4].

Cuando se utiliza EKS Fargate, hay dos escenarios posibles dependiendo de si el clúster de EKS ejecuta o no cargas de trabajo mixtas (de Fargate y que no son de Fargate).

Si el clúster de EKS ejecuta cargas de trabajo de Fargate y que no son de Fargate, y quieres monitorizar la carga de trabajo que no es de Fargate a través de Node Agent DaemonSet, añade el Cluster Agent o el Cluster Checks Runner a este despliegue. Para obtener más información, consulta la [Configuración del Cluster Agent][5].

El token del Cluster Agent debe ser accesible desde las tareas de Fargate que quieres monitorizar. Si utilizas el Helm Chart o el Datadog Operator, dicho token no es accesible de manera predeterminada porque se crea un secreto en el espacio de nombres de destino.

Tienes dos opciones para que esto funcione correctamente:

* Utilizar un valor de token codificado (`clusterAgent.token` en Helm, `credentials.token` en el Datadog Operator). Esto es práctico, pero menos seguro.
* Utilizar un secreto creado manualmente (`clusterAgent.tokenExistingSecret` en Helm, no disponible en el Datadog Operator) y replicarlo en todos los espacios de nombres donde las tareas de Fargate necesiten monitorización. Esto es seguro, pero requiere operaciones adicionales.
**Nota**:  El valor de `token` debe tener un mínimo de 32 caracteres.

Si el clúster de EKS solo ejecuta cargas de trabajo de Fargate, necesitas un despliegue independiente del Cluster Agent. Además, debes elegir una de las dos opciones para hacer que el token sea accesible, como se describió arriba.

Utiliza el siguiente archivo `values.yaml` de Helm:

```yaml
datadog:
  apiKey: <YOUR_DATADOG_API_KEY>
  clusterName: <CLUSTER_NAME>
agents:
  enabled: false
clusterAgent:
  enabled: true
  replicas: 2
  env:
    - name: DD_EKS_FARGATE
      value: "true"
```


En ambos casos, es necesario modificar el manifiesto del sidecar del Datadog Agent para permitir la comunicación con el Cluster Agent:

```yaml
       env:
        - name: DD_CLUSTER_AGENT_ENABLED
          value: "true"
        - name: DD_CLUSTER_AGENT_AUTH_TOKEN
          value: <hardcoded token value> # Utiliza valueFrom: si usas un secreto
        - name: DD_CLUSTER_AGENT_URL
          value: https://<CLUSTER_AGENT_SERVICE_NAME>.<CLUSTER_AGENT_SERVICE_NAMESPACE>.svc.cluster.local:5005
        - name: DD_ORCHESTRATOR_EXPLORER_ENABLED # Obligatorio para obtener la vista de recursos de Kubernetes
          value: "true"
        - name: DD_CLUSTER_NAME
          value: <CLUSTER_NAME>
```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=helm#event-collection
[3]: https://docs.datadoghq.com/es/infrastructure/livecontainers/#kubernetes-resources-view
[4]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/#overview
[5]: http://docs.datadoghq.com/agent/cluster_agent/setup/
{{% /tab%}}
{{< /tabs>}}


## Rendimiento del clúster

Para obtener información sobre el rendimiento de tu clúster de EKS, habilita un [Cluster Check Runner][14] para recopilar métricas del servicio [`kube-state-metrics`][15].

## Recopilación de métricas

### Métricas de las integraciones

Utiliza [etiquetas de Autodiscovery con tu contenedor de aplicaciones][16] de modo que puedas empezar a recopilar sus métricas para las [integraciones del Agent compatibles][17].

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
     annotations:
      ad.datadoghq.com/<CONTAINER_NAME>.check_names: '[<CHECK_NAME>]'
      ad.datadoghq.com/<CONTAINER_NAME>.init_configs: '[<INIT_CONFIG>]'
      ad.datadoghq.com/<CONTAINER_NAME>.instances: '[<INSTANCE_CONFIG>]'
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## Running the Agent as a side-car
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## Set DD_SITE to "datadoghq.eu" to send your
         ## Agent data to the Datadog EU site
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**Notas**:

- No olvides reemplazar `<YOUR_DATADOG_API_KEY>` por la [clave de la API de Datadog de tu organización][18].
- Las métricas de contenedores no están disponibles en Fargate porque el volumen `cgroups` del host no puede montarse en el Agent. La vista de [Live Containers][19] informa 0 para CPU y memoria.

### DogStatsD

Configura el puerto de contenedor `8125` con el contenedor del Agent de modo que puedas reenviar las [métricas de DogStatsD][20] desde tu contenedor de aplicaciones a Datadog.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## Ejecución del Agent como sidecar
     - image: datadog/agent
       name: datadog-agent
       ## Habilitación del puerto 8125 para la recopilación de métricas de DogStatsD
       ports:
        - containerPort: 8125
          name: dogstatsdport
          protocol: UDP
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## Define DD_SITE como "datadoghq.eu" para enviar los
         ## datos del Agent al sitio de Datadog de la UE
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**Nota**: No olvides reemplazar `<YOUR_DATADOG_API_KEY>` por la [clave de la API de Datadog de tu organización][18].

### Live Containers

El Datadog Agent v6.19+ admite contenedores activos en la integración de EKS Fargate. Los contenedores activos aparecen en la página [Containers][19] (Contenedores).

### Live Processes

El Datadog Agent v6.19+ admite procesos activos en la integración de EKS Fargate. Los procesos activos aparecen en la página [Processes][21] (Procesos). Para habilitar los procesos activos, [habilita shareProcessNamespace en las especificaciones del pod][22].

### Vista de recursos de Kubernetes

Para recopilar las vistas de recursos de Kubernetes, necesitas una [Configuración del Cluster Agent](#running-the-cluster-agent-or-the-cluster-checks-runner).

## Recopilación de logs

### Recopilación de logs de EKS en Fargate con Fluent Bit.

Monitoriza los logs de EKS Fargate mediante [Fluent Bit][23] para enrutar los logs de EKS a CloudWatch Logs y el [Datadog Forwarder][24] para enrutar logs a Datadog.

1. Para configurar Fluent Bit de modo que envíe logs a CloudWatch, crea un ConfigMap de Kubernetes que especifique CloudWatch Logs como salida. El ConfigMap especifica el grupo de logs, la región, la cadena de prefijo y si se debe crear automáticamente el grupo de logs.

   ```yaml
    kind: ConfigMap
    apiVersion: v1
    metadata:
      name: aws-logging
      namespace: aws-observability
    data:
      output.conf: |
        [OUTPUT]
            Name cloudwatch_logs
            Match   *
            region us-east-1
            log_group_name awslogs-https
            log_stream_prefix awslogs-firelens-example
            auto_create_group true
   ```
2. Utiliza el [Datadog Forwarder][24] para recopilar logs de CloudWatch y enviarlos a Datadog.

## Recopilación de trazas

Configura el puerto de contenedor `8126` con el contenedor del Agent para recopilar las trazas de tu contenedor de aplicaciones. [Obtén más información sobre cómo configurar el rastreo][25].

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     serviceAccountName: datadog-agent
     ## Colocación del Agent en el mismo espacio de nombres que la aplicación para la detección del origen con cgroup v2
     shareProcessNamespace: true
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## Ejecución del Agent como sidecar
     - image: datadog/agent
       name: datadog-agent
       ## Habilitación del puerto 8126 para la recopilación de trazas
       ports:
        - containerPort: 8126
          name: traceport
          protocol: TCP
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## Define DD_SITE como "datadoghq.eu" para enviar los
         ## datos del Agent al sitio de Datadog de la UE
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_APM_ENABLED
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**Nota**: No olvides reemplazar `<YOUR_DATADOG_API_KEY>` por la [clave de la API de Datadog de tu organización][18].

## Recopilación de eventos

Para recopilar eventos del servidor de la API de AWS EKS Fargate, ejecuta un [Datadog Cluster Agent dentro de tu clúster de EKS](#running-the-cluster-agent-or-the-cluster-checks-runner) y [habilita la recopilación de eventos del Cluster Agent][19].

Opcionalmente, despliega los ejecutores de checks de clústeres además de configurar el Datadog Cluster Agent para habilitar los checks de clústeres.

**Nota**: También puedes recopilar eventos si ejecutas el Datadog Cluster Agent en un pod de Fargate.

## Recopilación de procesos

Para el Agent 6.19+/7.19+, está disponible la [Recopilación de procesos][26]. Habilita `shareProcessNamespace` en las especificaciones del pod para recopilar todos los procesos que se estén ejecutando en el pod de Fargate. Por ejemplo:

```
apiVersion: v1
kind: Pod
metadata:
  name: <NAME>
spec:
  shareProcessNamespace: true
...
```

**Nota**: Las métricas de CPU y memoria no están disponibles.

## Datos recopilados

### Métricas

El check eks_fargate envía una métrica de frecuencia `eks.fargate.pods.running` que se etiqueta según `pod_name` y `virtual_node` para que puedas realizar un seguimiento de cuántos pods se están ejecutando.

### Checks de servicio

eks_fargate no incluye checks de servicios.

### Eventos

eks_fargate no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][21].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Métricas clave para la monitorización de AWS Fargate][27]
- [Cómo recopilar métricas y logs de las cargas de trabajo de AWS Fargate][28]
- [Monitorización de AWS Fargate con Datadog][29]


[1]: http://docs.datadoghq.com/integrations/amazon_eks/
[2]: http://docs.datadoghq.com/integrations/system
[3]: https://docs.datadoghq.com/es/getting_started/agent/autodiscovery/
[4]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[5]: http://docs.datadoghq.com/integrations/amazon_eks/#setup
[6]: http://docs.datadoghq.com/agent/kubernetes
[7]: http://docs.datadoghq.com/agent/kubernetes/daemonset_setup
[8]: https://app.datadoghq.com/account/settings#integrations/kubernetes
[9]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[10]: https://app.datadoghq.com/account/settings#integrations/amazon-eks
[11]: https://app.datadoghq.com/account/settings#integrations/amazon-ec2
[12]: http://docs.datadoghq.com/integrations/kubernetes
[13]: https://docs.datadoghq.com/es/containers/cluster_agent/admission_controller/?tab=operator
[14]: https://docs.datadoghq.com/es/containers/guide/clustercheckrunners
[15]: https://github.com/kubernetes/kube-state-metrics
[16]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[17]: https://docs.datadoghq.com/es/integrations/#cat-autodiscovery
[18]: https://app.datadoghq.com/organization-settings/api-keys
[19]: https://app.datadoghq.com/containers
[20]: http://docs.datadoghq.com/tracing/setup
[21]: https://app.datadoghq.com/process
[22]: https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/
[23]: https://aws.amazon.com/blogs/containers/fluent-bit-for-amazon-eks-on-aws-fargate-is-here/
[24]: https://docs.datadoghq.com/es/serverless/libraries_integrations/forwarder/
[25]: http://docs.datadoghq.com/tracing/#send-traces-to-datadog
[26]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/?tab=k8sfile#process-collection
[27]: https://www.datadoghq.com/blog/aws-fargate-metrics/
[28]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[29]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/