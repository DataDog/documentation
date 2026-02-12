---
app_id: eks-fargate
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Recopila las métricas, las trazas y los logs de Amazon EKS.
further_reading:
- link: https://www.datadoghq.com/blog/aws-fargate-metrics/
  tag: blog
  text: Métricas clave para monitorizar AWS Fargate
- link: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
  tag: blog
  text: Recopilar métricas y logs de las cargas de trabajo de AWS Fargate
- link: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
  tag: blog
  text: Monitorización de AWS Fargate con Datadog
integration_version: 6.1.0
media: []
supported_os:
- linux
- macos
- windows
title: Amazon EKS en AWS Fargate
---
## Información general

<div class="alert alert-danger"> En esta página se describe la integración de EKS Fargate. Para ECS Fargate, consulta la documentación sobre la <a href="http://docs.datadoghq.com/integrations/ecs_fargate">integración de ECS Fargate de Datadog</a>.
</div>

Amazon EKS Fargate es un servicio de Kubernetes administrado que automatiza determinados aspectos del despliegue y el mantenimiento de cualquier entorno de Kubernetes estándar. Los nodos de EKS Fargate son administrados por AWS Fargate y los abstrae del usuario.

### Cómo Datadog monitoriza los pods de EKS Fargate

Los pods de EKS Fargate no se ejecutan en nodos de EKS tradicionales respaldados por instancias de EC2. Mientras que el Agent reporta [checks de sistema](http://docs.datadoghq.com/integrations/system), como `system.cpu.*` y `system.memory.*`, estos son sólo para el contenedor del Agent. Para recopilar datos de tus pods de EKS Fargate, ejecuta el Agent como sidecar dentro de *cada* uno de tus pods de aplicación deseados. Cada pod necesita un RBAC personalizado que conceda permisos al kubelet para que el Agent obtenga la información necesaria.

El sidecar Agent es responsable de monitorizar los otros contenedores en el mismo pod que él, además de comunicarse con el Cluster Agent para partes de sus informes. El Agent puede:

- Informar la recopilación de métricas de Kubernetes del pod que ejecuta tus contenedores de aplicaciones y el Agent
- Ejecuta integraciones del Agent basadas en [Autodiscovery](https://docs.datadoghq.com/getting_started/agent/autodiscovery/) con los contenedores del mismo pod.
- Recopila métricas de APM y DogStatsD para contenedores en el mismo pod

Si tienes un clúster mixto de nodos de EKS y de pods de Fargate tradicionales, puedes gestionar los nodos de EKS con la [instalación estándar de Datadog Kubernetes](http://docs.datadoghq.com/containers/kubernetes/installation) (Helm chart o Datadog Operator) y gestionar los pods de Fargate por separado.

**Nota**: Cloud Network Monitoring (CNM) no es compatible con EKS Fargate.

## Configuración

### Requisitos previos

- Un [perfil de AWS Fargate](#aws-fargate-profile)
- Un [secreto de Kubernetes llamado `datadog-secret`](#secret-for-keys-and-tokens), que contiene tu clave de API de Datadog y el token del Cluster Agent
- Un [RBAC de AWS Fargate](#aws-fargate-rbac)

#### Perfil de AWS Fargate

Crea y especifica un [perfil de AWS Fargate](https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html) para tus pods de EKS Fargate.

Si no especificas un perfil de AWS Fargate, tus pods utilizan máquinas EC2 clásicas. Para monitorizar estos pods, utiliza la [instalación estándar Datadog Kubernetes](http://docs.datadoghq.com/containers/kubernetes/installation) con la [integración Datadog Amazon EKS](http://docs.datadoghq.com/integrations/amazon_eks/#setup).

#### Secreto para claves y tokens

Crea un [secreto Kubernetes](https://kubernetes.io/docs/concepts/configuration/secret/) llamado `datadog-secret` que contenga:

- Tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys)
- Un token alfanumérico de 32 caracteres para el Cluster Agent. El Agent y el Cluster Agent utilizan este token para comunicarse. Crearlo de antemano asegura que tanto las configuraciones tradicionales como el pod de Fargate obtengan el mismo valor de token (a diferencia de dejar que el Datadog Operator o Helm creen un token aleatorio para ti). Para obtener más información sobre cómo se utiliza este token, consulta la [configuración del Cluster Agent](http://docs.datadoghq.com/agent/cluster_agent/setup/).

```shell
kubectl create secret generic datadog-secret -n <NAMESPACE> \
  --from-literal api-key=<DATADOG_API_KEY> \
  --from-literal token=<CLUSTER_AGENT_TOKEN>
```

Si estás desplegando tu instalación tradicional de Datadog en un espacio de nombres y los pods de Fargate en otro espacio de nombres, crea un secreto en *ambos* espacios de nombres:

```shell
# Create the secret in the namespace:datadog-agent
kubectl create secret generic datadog-secret -n datadog-agent \
  --from-literal api-key=<DATADOG_API_KEY> \
  --from-literal token=<CLUSTER_AGENT_TOKEN>

# Create the secret in the namespace:fargate
kubectl create secret generic datadog-secret -n fargate \
  --from-literal api-key=<DATADOG_API_KEY> \
  --from-literal token=<CLUSTER_AGENT_TOKEN>
```

**Nota**: Para utilizar el Admission Controller para ejecutar el Agent en Fargate, el nombre de este secreto de Kubernetes _debe_ ser `datadog-secret`.

#### RBAC de AWS Fargate

Crea un `ClusterRole` para los permisos necesarios y enlázalo a la `ServiceAccount` que utilizan tus pods:

1. Crea un `ClusterRole` utilizando el siguiente manifiesto:

   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRole
   metadata:
     name: datadog-agent-fargate
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
   ```

1. Crea un `ClusterRoleBinding` para adjuntarlo al espacio de nombres `ServiceAccount` que tus pods están utilizando actualmente. Las siguientes `ClusterRoleBindings` hacen referencia a este `ClusterRole` creado previamente.

   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRoleBinding
   metadata:
     name: datadog-agent-fargate
   roleRef:
     apiGroup: rbac.authorization.k8s.io
     kind: ClusterRole
     name: datadog-agent-fargate
   subjects:
     - kind: ServiceAccount
       name: <SERVICE_ACCOUNT>
       namespace: <NAMESPACE>
   ```

   #### Si tus pods no utilizan un ServiceAccount

   Si tus pods no utilizan un `ServiceAccount`, utiliza lo siguiente:

   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRoleBinding
   metadata:
     name: datadog-agent-fargate
   roleRef:
     apiGroup: rbac.authorization.k8s.io
     kind: ClusterRole
     name: datadog-agent-fargate
   subjects:
     - kind: ServiceAccount
       name: datadog-agent
       namespace: fargate
   ---
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     name: datadog-agent
     namespace: fargate
   ```

   Esto crea un `ServiceAccount` llamado `datadog-agent` en el espacio de nombres `fargate` al que se hace referencia en la `ClusterRoleBinding`. Ajusta esto para el espacio de nombres de tus pods de Fargate y configúralo como el `serviceAccountName` en tu especificación de pod.

   #### Si utilizas varias ServiceAccounts en distintos espacios de nombres

   Si estás utilizando varias `ServiceAccounts` a través de espacios de nombres para tus pods de Fargate, utiliza lo siguiente:

   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRoleBinding
   metadata:
     name: datadog-agent-fargate
   roleRef:
     apiGroup: rbac.authorization.k8s.io
     kind: ClusterRole
     name: datadog-agent-fargate
   subjects:
     - kind: ServiceAccount
       name: <SERVICE_ACCOUNT_1>
       namespace: <NAMESPACE_1>
     - kind: ServiceAccount
       name: <SERVICE_ACCOUNT_2>
       namespace: <NAMESPACE_2>
     - kind: ServiceAccount
       name: <SERVICE_ACCOUNT_3>
       namespace: <NAMESPACE_3>
   ```

Para validar tu RBAC, consulta [Solucionar problemas: permisos de ServiceAccount](#serviceaccount-kubelet-permissions).

### Instalación

Una vez completados todos los requisitos previos, ejecuta elDatadog Agent como un contenedor sidecar dentro de cada uno de tus pods. Puedes hacerlo con la función de inyección automática del [Datadog Admission Controller](https://docs.datadoghq.com/containers/cluster_agent/admission_controller/?tab=operator) o manualmente.

El Admission Controller es un componente de Datadog que puede añadir automáticamente el Agent sidecar a cada pod que tenga la etiqueta (label) `agent.datadoghq.com/sidecar: fargate`.

La configuración manual requiere que modifiques cada manifiesto de carga de trabajo cuando añadas o cambies el Agent sidecar. Datadog recomienda que utilices el Admission Controller en su lugar.

**Nota**: Si tienes un clúster mixto de nodos de EKS y pods de Fargate tradicionales, configura la monitorización de tus nodos tradicionales con la [instalación estándar Datadog Kubernetes](http://docs.datadoghq.com/containers/kubernetes/installation) (con el secreto Kubernetes de los requisitos previos) e instala la [integraciónDatadog AWS](https://app.datadoghq.com/account/settings#integrations/amazon-web-services) y la [ integración Datadog EKS](http://docs.datadoghq.com/integrations/amazon_eks/#setup) A continuación, para monitorizar tus pods de Fargate, continúa con esta sección.

{{< tabs >}}

{{% tab "Admission Controller - Datadog Operator" %}}

#### Admission Controller - Datadog Operator

1. Si aún no lo has hecho, [instala Helm](https://helm.sh/docs/intro/install/) en tu máquina.

1. Instala el Datadog Operator:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   ```

1. Crea un archivo `datadog-agent.yaml` para definir un recurso personalizado `DatadogAgent`, con el Admission Controller y la inyección de Fargate activados:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       clusterName: <CLUSTER_NAME>
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

1. Aplica esta configuración:

   ```shell
   kubectl apply -n <NAMESPACE> -f datadog-agent.yaml
   ```

1. Después de que el Cluster Agent alcance un estado de ejecución y registre los webhooks mutantes del Admission Controller, añade la etiqueta (label)`agent.datadoghq.com/sidecar: fargate` a los pods que desees (no a la carga de trabajo principal) para activar la inyección del contenedor sidecar del Agent.

**Nota**: El Admission Controller sólo muta los pods nuevos, no los pods ya creados. No ajusta tu `serviceAccountName`. Si no has configurado el RBAC para este pod, el Agent no podrá conectarse a Kubernetes.

**Ejemplo**

A continuación, se muestra la salida de un pod de despliegue de Redis de ejemplo en el que el Admission Controller inyectó un sidecar Agent. Las variables de entorno y la configuración de recursos se aplican automáticamente en función de los valores predeterminados internos del perfil de Datadog Fargate.

El sidecar utiliza el repositorio de imágenes y etiquetas (tags) configurado en `datadog-agent.yaml`.

{{< highlight yaml "hl_lines=15-37" >}}
metadata:
labels:
app: redis
eks.amazonaws.com/fargate-profile: fp-fargate
agent.datadoghq.com/sidecar: fargate
spec:
serviceAccountName: datadog-agent
containers:

- name: my-redis
  image: redis:latest
  args:

  - redis-server

  # (...)

- name: datadog-agent-injected
  image: gcr.io/datadoghq/agent:7.64.0
  env:

  - name: DD_API_KEY
    valueFrom:
    secretKeyRef:
    key: api-key
    name: datadog-secret
  - name: DD_EKS_FARGATE
    valor: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
    secretKeyRef:
    key: token
    name: datadog-secret

  # (...)

  recursos:
  limits:
  cpu: 200m
  memory: 256Mi
  requests:
  cpu: 200m
  memory: 256Mi
  {{< /highlight >}}

##### Configuración personalizada con perfiles sidecar y selectores personalizados - Datadog Operador

Para configurar mejor el Agent o sus recursos de contenedor, utiliza las siguientes propiedades en tu recurso `DatadogAgent`:

- `spec.features.admissionController.agentSidecarInjection.profiles`, para añadir definiciones de variables de entorno y ajustes de recursos
- `spec.features.admissionController.agentSidecarInjection.selectors`, para configurar un selector personalizado destinado a los pods de carga de trabajo deseados (en lugar de los pods con la etiqueta (label) `agent.datadoghq.com/sidecar: fargate`)

Si lo deseas, puedes ajustar el perfil del contenedor del Agent inyectado sin actualizar el selector de etiquetas (labels).

Por ejemplo, el siguiente `datadog-agent.yaml` utiliza un selector para dirigirse a todos los pods con la etiqueta (label) `app: redis`. El perfil sidecar configura una variable de entorno `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED` y nuevos parámetros de recursos.

```yaml
#(...)
spec:
  #(...)
  features:
    admissionController:
      agentSidecarInjection:
        enabled: true
        provider: fargate
        selectors:
          - objectSelector:
              matchLabels:
                app: redis
        profiles:
          - env:
            - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
              value: "true"
            resources:
              requests:
                cpu: "400m"
                memory: "256Mi"
              limits:
                cpu: "800m"
                memory: "512Mi"
```

Aplica esta configuración y espera a que el Cluster Agent alcance un estado de ejecución y registra los webhooks mutantes del Admission Controller. A continuación, se inyecta automáticamente un sidecar Agent en cualquier pod nuevo creado con la etiqueta (label) `app: redis`.

**Nota**: El Admission Controller no muta los pods que ya están creados.

A continuación, se muestra la salida de un pod de despliegue de Redis en el que el Admission Controller inyectó un sidecar Agent basado en la etiqueta (label) del pod `app: redis` en lugar de la etiqueta `agent.datadoghq.com/sidecar: fargate`:

{{< highlight yaml "hl_lines=29-38" >}}
metadata:
labels:
app: redis
eks.amazonaws.com/fargate-profile: fp-fargate
spec:
serviceAccountName: datadog-agent
containers:

- name: my-redis
  image: redis:latest
  args:

  - redis-server

  # (...)

- name: datadog-agent-injected
  image: gcr.io/datadoghq/agent:7.64.0
  env:

  - name: DD_API_KEY
    valueFrom:
    secretKeyRef:
    key: api-key
    name: datadog-secret
  - name: DD_EKS_FARGATE
    valor: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
    secretKeyRef:
    key: token
    name: datadog-secret
  - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
    valor: "true"
    #(...)
    recursos:
    requests:
    cpu: "400m"
    memory: "256Mi"
    limits:
    cpu: "800m"
    memory: "512Mi"
    {{< /highlight >}}

Las variables de entorno y la configuración de los recursos se aplican automáticamente en función del nuevo perfil de Fargate configurado en `DatadogAgent`.

{{% /tab %}}

{{% tab "Admission Controller - Helm" %}}

#### Admission Controller - Helm

1. Si aún no lo has hecho, [instala Helm](https://helm.sh/docs/intro/install/) en tu máquina.

1. Añade el repositorio de Datadog Helm:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. Crea un `datadog-values.yaml` con Admission Controller y la inyección de Fargate activados:

   ```yaml
   datadog:
     apiKeyExistingSecret: datadog-secret
     clusterName: <CLUSTER_NAME>
   clusterAgent:
     tokenExistingSecret: datadog-secret
     admissionController:
       agentSidecarInjection:
         enabled: true
         provider: fargate
   ```

1. Despliega el gráfico en el espacio de nombres que desees:

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

1. Después de que el Cluster Agent alcance un estado de ejecución y registre los webhooks mutantes del Admission Controller, añade la etiqueta (label)`agent.datadoghq.com/sidecar: fargate` a los pods que desees (no a la carga de trabajo principal) para activar la inyección del contenedor sidecar del Datadog Agent.

**Nota**: El Admission Controller sólo muta los pods nuevos, no los pods ya creados. No ajusta tu `serviceAccountName`. Si no has configurado el RBAC para este pod, el Agent no podrá conectarse a Kubernetes.

En un clúster exclusivo para Fargate, puedes configurar `agents.enabled=false` para omitir la creación del DaemonSet tradicional para monitorizar cargas de trabajo en instancias de EC2.

**Ejemplo**

A continuación, se muestra la salida de un pod de despliegue de Redis de ejemplo en el que el Admission Controller inyectó un sidecar Agent. Las variables de entorno y la configuración de recursos se aplican automáticamente en función de los valores predeterminados internos del perfil de Datadog Fargate.

El sidecar utiliza el repositorio de imágenes y etiquetas (tags) configurado en `datadog-values.yaml`.

{{< highlight yaml "hl_lines=15-37" >}}
metadata:
labels:
app: redis
eks.amazonaws.com/fargate-profile: fp-fargate
agent.datadoghq.com/sidecar: fargate
spec:
serviceAccountName: datadog-agent
containers:

- name: my-redis
  image: redis:latest
  args:

  - redis-server

  # (...)

- name: datadog-agent-injected
  image: gcr.io/datadoghq/agent:7.64.0
  env:

  - name: DD_API_KEY
    valueFrom:
    secretKeyRef:
    key: api-key
    name: datadog-secret
  - name: DD_EKS_FARGATE
    valor: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
    secretKeyRef:
    key: token
    name: datadog-secret

  # (...)

  recursos:
  limits:
  cpu: 200m
  memory: 256Mi
  requests:
  cpu: 200m
  memory: 256Mi
  {{< /highlight >}}

##### Configuración personalizada con perfiles sidecar y selectores personalizados - Helm

Para configurar mejor el Agent o sus recursos de contenedor, utiliza las siguientes propiedades en tu configuración de Helm:

- `clusterAgent.admissionController.agentSidecarInjection.profiles`, para añadir definiciones de variables de entorno y ajustes de recursos
- `clusterAgent.admissionController.agentSidecarInjection.selectors`, para configurar un selector personalizado destinado a los pods de carga de trabajo deseados (en lugar de los pods con la etiqueta (label) `agent.datadoghq.com/sidecar: fargate`)

Si lo prefieres, puedes ajustar el perfil del contenedor del Agent inyectado sin actualizar el selector de etiquetas (labels).

Por ejemplo, el siguiente `datadog-values.yaml` utiliza un selector para dirigirse a todos los pods con la etiqueta (label) `app: redis`. El perfil sidecar configura una variable de entorno `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED` y nuevos ajustes de recursos.

```yaml
#(...)
clusterAgent:
  admissionController:
    agentSidecarInjection:
      enabled: true
      provider: fargate
      selectors:
        - objectSelector:
            matchLabels:
              app: redis
      profiles:
        - env:
          - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
            value: "true"
          resources:
            requests:
              cpu: "400m"
              memory: "256Mi"
            limits:
              cpu: "800m"
              memory: "512Mi"
```

Aplica esta configuración y espera a que el Cluster Agent alcance un estado de ejecución y registra los webhooks mutantes del Admission Controller. A continuación, se inyecta automáticamente un sidecar Agent en cualquier pod nuevo creado con la etiqueta (label) `app: redis`.

**Nota**: El Admission Controller no muta los pods que ya están creados.

A continuación, se muestra la salida de un pod de despliegue de Redis en el que el Admission Controller inyectó un sidecar Agent basado en la etiqueta (label) del pod `app: redis` en lugar de la etiqueta `agent.datadoghq.com/sidecar: fargate`:

{{< highlight yaml "hl_lines=29-37" >}}
metadata:
labels:
app: redis
eks.amazonaws.com/fargate-profile: fp-fargate
spec:
serviceAccountName: datadog-agent
containers:

- name: my-redis
  image: redis:latest
  args:

  - redis-server

  # (...)

- name: datadog-agent-injected
  image: gcr.io/datadoghq/agent:7.64.0
  env:

  - name: DD_API_KEY
    valueFrom:
    secretKeyRef:
    key: api-key
    name: datadog-secret
  - name: DD_EKS_FARGATE
    valor: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
    secretKeyRef:
    key: token
    name: datadog-secret
  - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
    valor: "true"
    #(...)
    recursos:
    requests:
    cpu: "400m"
    memory: "256Mi"
    limits:
    cpu: "800m"
    memory: "512Mi"
    {{< /highlight >}}

Las variables de entorno y la configuración de recursos se aplican automáticamente en función del nuevo perfil de Fargate establecido en la configuración de Helm.

{{% /tab %}}

{{% tab "Manual" %}}

#### Manual

Para empezar a recopilar datos de tu pod de tipo Fargate, despliega el Agent v7.17 o posterior como contenedor sidecar dentro del pod de tu aplicación utilizando el siguiente manifiesto:

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
    spec:
      serviceAccountName: datadog-agent
      containers:
        # Your original container
        - name: "<CONTAINER_NAME>"
          image: "<CONTAINER_IMAGE>"

        # Running the Agent as a side-car
        - name: datadog-agent
          image: gcr.io/datadoghq/agent:7
          env:
            - name: DD_API_KEY
              valueFrom:
                secretKeyRef:
                  key: api-key
                  name: datadog-secret
            - name: DD_SITE
              value: "<DATADOG_SITE>"
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

- Reemplaza `<DATADOG_SITE>` por tu sitio: {{< region-param key="dd_site" code="true" >}}. Por defecto `datadoghq.com`.
- Asegúrate de que estás utilizando `serviceAccountName` con los permisos necesarios.
- Añade `DD_TAGS` para añadir etiquetas `<KEY>:<VALUE>` con espacio adicional separado. La variable de entorno `DD_CLUSTER_NAME` define tu etiqueta  (tag) `kube_cluster_name`.

Este manifiesto utiliza el secreto `datadog-secret` creado en los pasos de requisitos previos.

#### Ejecución del Cluster Agent o el Cluster Checks Runner

Datadog te recomienda que ejecutes el Cluster Agent para acceder a funciones como la [recopilación de eventos](https://docs.datadoghq.com/containers/kubernetes/configuration/#enable-kubernetes-event-collection), la [vista de recursos Kubernetes](https://docs.datadoghq.com/infrastructure/containers/orchestrator_explorer) y los [checks de clúster](https://docs.datadoghq.com/agent/cluster_agent/clusterchecks/#overview).

Cuando se utiliza EKS Fargate, hay dos escenarios posibles dependiendo de si el clúster de EKS ejecuta o no cargas de trabajo mixtas (de Fargate y que no son de Fargate).

Si el clúster de EKS ejecuta cargas de trabajo de Fargate y que no son de Fargate, y quieres monitorizar la carga de trabajo a través del DaemonSet del Node Agent, añade el Cluster Agent o el Cluster Checks Runner a este despliegue. Para obtener más información, consulta la [configuración del Cluster Agent](http://docs.datadoghq.com/agent/cluster_agent/setup/).

Cuando despliegues tu Cluster Agent, utiliza el secreto y el token creados en los pasos de requisitos previos.

##### Helm

```yaml
datadog:
  apiKeyExistingSecret: datadog-secret
  clusterName: <CLUSTER_NAME>
clusterAgent:
  tokenExistingSecret: datadog-secret
```

Configura `agents.enabled=false` para desactivar el Agent de nodo estándar si estás utilizando *sólo* cargas de trabajo de Fargate.

##### Operación

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
```

##### Configuración del sidecar para Cluster Agent

En ambos casos, es necesario modificar el manifiesto del sidecar del Datadog Agent para permitir la comunicación con el Cluster Agent:

```yaml
    containers:
    #(...)
    - name: datadog-agent
      image: gcr.io/datadoghq/agent:7
      env:
        #(...)
        - name: DD_CLUSTER_NAME
          value: <CLUSTER_NAME>
        - name: DD_CLUSTER_AGENT_ENABLED
          value: "true"
        - name: DD_CLUSTER_AGENT_AUTH_TOKEN
          valueFrom:
            secretKeyRef:
              name: datadog-secret
              key: token
        - name: DD_CLUSTER_AGENT_URL
          value: https://<CLUSTER_AGENT_SERVICE_NAME>.<CLUSTER_AGENT_SERVICE_NAMESPACE>.svc.cluster.local:5005
```

Consulta el `DD_CLUSTER_AGENT_URL` relativo al nombre de servicio y espacio de nombres creado para tu Datadog Cluster Agent.

{{% /tab %}}

{{< /tabs >}}

## Recopilación de métricas

### Métricas de las integraciones

Utiliza [anotaciones de Autodiscovery con tu contenedor de aplicaciones](https://docs.datadoghq.com/agent/kubernetes/integrations/) para empezar a recopilar sus métricas para las [integraciones compatibles con el Agent](https://github.com/DataDog/integrations-core).

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
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.checks: |
          {
            "<INTEGRATION_NAME>": {
              "init_config": <INIT_CONFIG>,
              "instances": [<INSTANCES_CONFIG>]
            }
          }
    spec:
      serviceAccountName: datadog-agent
      containers:
      # Your original container
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"

      # Running the Agent as a side-car
      - name: datadog-agent
        image: gcr.io/datadoghq/agent:7
        env:
          - name: DD_API_KEY
            valueFrom:
              secretKeyRef:
                key: api-key
                name: datadog-secret
          - name: DD_SITE
            value: "<DATADOG_SITE>"
          - name: DD_EKS_FARGATE
            value: "true"
          - name: DD_KUBERNETES_KUBELET_NODENAME
            valueFrom:
              fieldRef:
                apiVersion: v1
                fieldPath: spec.nodeName
          # (...)
```

### DogStatsD

En EKS Fargate, tu contenedor de aplicaciones enviará las [métricas de DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/) al contenedor sidecar del Datadog Agent. El Agent acepta estas métricas por defecto a través del puerto `8125`.

No es necesario que configures la dirección `DD_AGENT_HOST` en tu contenedor de aplicaciones cuando envíes estas métricas. Deja que este valor por defecto sea `localhost`.

### Live Containers

El Datadog Agent v6.19 o posterior admite contenedores en directo en la integración EKS Fargate. Los contenedores en directo aparecen en la página [Contenedores](https://app.datadoghq.com/containers).

### Vista de recursos de Kubernetes

Para recopilar vistas de recursos Kubernetes, necesitas una [configuración del Cluster Agent](http://docs.datadoghq.com/agent/cluster_agent/setup/) y una conexión válida entre el Agent sidecar y el Cluster Agent. Cuando se utiliza la configuración de inyección de sidecars del Admission Controller, la conexión se realiza automáticamente. Cuando configures el sidecar manualmente, asegúrate de que estás [conectando el Agent sidecar](#configuring-sidecar-for-cluster-agent).

## Recopilación de procesos

{{< tabs >}}

{{% tab "Admission Controller - Datadog Operator" %}}

Para recopilar todos los procesos que se ejecutan en tu pod de Fargate:

1. [Define `shareProcessNamespace: true` en las especificaciones de tu pod](https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/). Por ejemplo:

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
           agent.datadoghq.com/sidecar: fargate
       spec:
         serviceAccountName: datadog-agent
         shareProcessNamespace: true
         containers:
         # Your original container
         - name: "<CONTAINER_NAME>"
           image: "<CONTAINER_IMAGE>"
   ```

1. Establece la variable de entorno del Agent `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true` añadiendo un [perfil sidecar personalizado en tu configuración `DatadogAgent` del Operator](#custom-configuration-with-sidecar-profiles-and-custom-selectors---datadog-operator):

   ```yaml
   #(...)
   spec:
     #(...)
     features:
       admissionController:
         agentSidecarInjection:
           enabled: true
           provider: fargate
           profiles:
             - env:
               - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
                 value: "true"
   ```

{{% /tab %}}

{{% tab "Admission Controller - Helm" %}}

Para recopilar todos los procesos que se ejecutan en tu pod de Fargate:

1. [Define `shareProcessNamespace: true` en las especificaciones de tu pod](https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/). Por ejemplo:

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
           agent.datadoghq.com/sidecar: fargate
       spec:
         serviceAccountName: datadog-agent
         shareProcessNamespace: true
         containers:
         # Your original container
         - name: "<CONTAINER_NAME>"
           image: "<CONTAINER_IMAGE>"
   ```

1. Establece la variable de entorno del Agent `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true` añadiendo un [perfil sidecar personalizado en tu configuración de Helm](#custom-configuration-with-sidecar-profiles-and-custom-selectors---helm):

   ```yaml
   clusterAgent:
     admissionController:
       agentSidecarInjection:
         enabled: true
         provider: fargate
         profiles:
           - env:
             - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
               value: "true"
   ```

{{% /tab %}}

{{% tab "Manual" %}}

Para recopilar todos los procesos que se ejecutan en tu pod de Fargate, define la variable de entorno `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true` del Agent y [define `shareProcessNamespace: true` en las especificaciones de tu pod](https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/).

Por ejemplo:

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
    spec:
      serviceAccountName: datadog-agent
      shareProcessNamespace: true
      containers:
      # Your original container
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"

      # Running the Agent as a side-car
      - name: datadog-agent
        image: gcr.io/datadoghq/agent:7
        env:
          - name: DD_API_KEY
            valueFrom:
              secretKeyRef:
                key: api-key
                name: datadog-secret
          - name: DD_SITE
            value: "<DATADOG_SITE>"
          - name: DD_EKS_FARGATE
            value: "true"
          - name: DD_KUBERNETES_KUBELET_NODENAME
            valueFrom:
              fieldRef:
                apiVersion: v1
                fieldPath: spec.nodeName
          - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
            value: "true"
          # (...)
```

{{% /tab %}}

{{< /tabs >}}

## Recopilación de logs

### Recopilación de logs de EKS en Fargate con Fluent Bit

Monitoriza logs de EKS Fargate utilizando [Fluent Bit](https://aws.amazon.com/blogs/containers/fluent-bit-for-amazon-eks-on-aws-fargate-is-here/) para enviar logs de EKS a CloudWatch Logs, y el [Datadog Forwarder](https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/) para enviar logs a Datadog.

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

1. Utiliza el [Datadog Forwarder](https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/) para recopilar logs de CloudWatch y enviarlos a Datadog.

## Recopilación de trazas

En EKS Fargate, tu contenedor de aplicaciones envía sus trazas al contenedor sidecar del Datadog Agent. El Agent acepta estas trazas a través del puerto `8126` por defecto.

No es necesario que configures la dirección `DD_AGENT_HOST` en tu contenedor de aplicaciones cuando envíes estas métricas. Deja que este valor por defecto sea `localhost`.

[Define `shareProcessNamespace: true` en las especificaciones del pod](https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/) para ayudar al Agent con la detección de orígenes.

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
    spec:
      serviceAccountName: datadog-agent
      shareProcessNamespace: true
      containers:
      # Your original container
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"

      # Running the Agent as a side-car
      - name: datadog-agent
        image: gcr.io/datadoghq/agent:7
        # (...)
```

[Más información sobre cómo configurar el rastreo](http://docs.datadoghq.com/tracing/#send-traces-to-datadog).

## Recopilación de eventos

Para recopilar eventos de tu servidor API de Amazon EKS Fargate, ejecuta el [Datadog Cluster Agent](http://docs.datadoghq.com/agent/cluster_agent/setup/) dentro de tu clúster de EKS. El Cluster Agent recopila eventos de Kubernetes, incluidos los de los pods de EKS Fargate, por defecto.

**Nota**: También puedes recopilar eventos si ejecutas el Datadog Cluster Agent en un pod de Fargate.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **eks.fargate.cpu.capacity** <br>(gauge) | Capacidad de CPU del pod|
| **eks.fargate.memory.capacity** <br>(gauge) | Capacidad de memoria del pod<br>_Se muestra como byte_ |
| **eks.fargate.pods.running** <br>(gauge) | Latido de un pod que ejecuta una carga de trabajo de Amazon Fargate en AWS EKS|

### Checks de servicio

El check `eks_fargate` no incluye ningún check de servicio.

### Eventos

El check de `eks_fargate` no incluye ningún evento.

## Solucionar problemas

### Permisos ServiceAccount de Kubelet

Asegúrate de que tienes los permisos correctos en `ServiceAccount` asociados a tu pod. Si tu pod no tiene una `ServiceAccount` asociada o no está vinculado al ClusterRole correcto, no tiene acceso al Kubelet.

Para validar tu acceso, ejecuta:

```shell
kubectl auth can-i get nodes/pods --as system:serviceaccount:<NAMESPACE>:<SERVICEACCOUNT>
```

Por ejemplo, si tu pod de Fargate está en el espacio de nombres `fargate` con el ServiceAccount `datadog-agent`:

```shell
kubectl auth can-i get nodes/pods --as system:serviceaccount:fargate:datadog-agent
```

Esto devuelve `yes` o `no` en función del acceso.

### Contexto de seguridad del contenedor del Datadog Agent

El contenedor del Datadog Agent está diseñado para ejecutarse como el usuario dd-agent (UID: 100). Si anulas el contexto de seguridad predeterminado estableciendo, por ejemplo, `runAsUser: 1000` en las especificaciones del pod, el contenedor no se iniciará debido a permisos insuficientes. Puedes ver errores como:

```log
[s6-init] making user provided files available at /var/run/s6/etc...exited 0.
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/50-ecs.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/50-eks.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/60-network-check.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/59-defaults.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/60-sysprobe-check.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/50-ci.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/89-copy-customfiles.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/01-check-apikey.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/51-docker.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/50-kubernetes.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/cont-init.d/50-mesos.sh: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/services.d/trace/run: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/services.d/security/run: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/services.d/sysprobe/run: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/services.d/agent/run: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/services.d/process/run: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/services.d/security/finish: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/services.d/trace/finish: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/services.d/sysprobe/finish: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/services.d/agent/finish: Operation not permitted
s6-chown: fatal: unable to chown /var/run/s6/etc/services.d/process/finish: Operation not permitted
[s6-init] ensuring user provided files have correct perms...exited 0.
[fix-attrs.d] applying ownership & permissions fixes...
[fix-attrs.d] done.
[cont-init.d] executing container initialization scripts...
[cont-init.d] 01-check-apikey.sh: executing... 
[cont-init.d] 01-check-apikey.sh: exited 0.
[cont-init.d] 50-ci.sh: executing... 
[cont-init.d] 50-ci.sh: exited 0.
[cont-init.d] 50-ecs.sh: executing... 
[cont-init.d] 50-ecs.sh: exited 0.
[cont-init.d] 50-eks.sh: executing... 
ln: failed to create symbolic link '/etc/datadog-agent/datadog.yaml': Permission denied
[cont-init.d] 50-eks.sh: exited 0.
[cont-init.d] 50-kubernetes.sh: executing... 
[cont-init.d] 50-kubernetes.sh: exited 0.
[cont-init.d] 50-mesos.sh: executing... 
[cont-init.d] 50-mesos.sh: exited 0.
[cont-init.d] 51-docker.sh: executing... 
[cont-init.d] 51-docker.sh: exited 0.
[cont-init.d] 59-defaults.sh: executing... 
touch: cannot touch '/etc/datadog-agent/datadog.yaml': Permission denied
[cont-init.d] 59-defaults.sh: exited 1.
```

Desde el Datadog Cluster Agent v7.62 o posterior, anular el contexto de seguridad para el sidecar Datadog Agent te permite mantener estándares de seguridad consistentes a través de tus despliegues de Kubernetes. Tanto si utilizas el recurso personalizado DatadogAgent como los valores de Helm, puedes asegurarte de que el contenedor del Agent se ejecuta con el usuario adecuado, dd-agent (UID 100), según lo necesite tu entorno.

Siguiendo los ejemplos, puedes desplegar el sidecar Agent en entornos donde debe anularse el contexto de seguridad predeterminado del pod.

Datadog Operator

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    admissionController:
      agentSidecarInjection:
        enabled: true
        provider: fargate
        - securityContext:
            runAsUser: 100
```

Helm

```yaml
clusterAgent:
  admissionController:
    agentSidecarInjection:
      profiles:
        - securityContext:
            runAsUser: 100
```

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Métricas clave para la monitorización de AWS Fargate](https://www.datadoghq.com/blog/aws-fargate-metrics/)
- [Recopilar métricas y logs de las cargas de trabajo de AWS Fargate](https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/)
- [Monitorización de AWS Fargate con Datadog](https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/)
- [Rastrear API Gateway al enviar solicitudes proxy a ECS Fargate](https://docs.datadoghq.com/tracing/trace_collection/proxy_setup/apigateway)