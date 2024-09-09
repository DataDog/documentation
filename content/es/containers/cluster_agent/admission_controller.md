---
aliases:
- /es/agent/cluster_agent/admission_controller
further_reading:
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Datadog Cluster Agent
- link: /containers/troubleshooting/admission-controller
  tag: Documentación
  text: Solucionar problemas del controlador de admisión
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: Blog
  text: Usar la inyección de biblioteca para auto-instrumentar el rastreo de aplicaciones
    Kubernetes con Datadog APM
title: Controlador de admisión de Datadog
---

## Información general
El controlador de admisión de Datadog es un componente de Datadog Cluster Agent. El principal beneficio del controlador de admisión es simplificar la configuración de tu pod de aplicación. Para ello, cuenta con dos funcionalidades principales:

- Inyectar las variables de entorno (`DD_AGENT_HOST`, `DD_TRACE_AGENT_URL` y `DD_ENTITY_ID`) para configurar las bibliotecas DogStatsD y del rastreador de APM en los contenedores de aplicaciones del usuario.
- Inyectar las etiquetas (tags) estándar de Datadog (`env`, `service` y `version`) procedentes de las etiquetas de la aplicación en las variables de entorno del contenedor .

El controlador de admisión de Datadog es del tipo `MutatingAdmissionWebhook`. Para obtener más detalles sobre los controladores de admisión, consulta la [guía de Kubernetes sobre controladores de admisión][1].

## Requisitos

- Datadog clúster Agent v7.40 o posterior

## Configuración
{{< tabs >}}
{{% tab "Operator" %}}

Para habilitar el controlador de admisión para Operator de Datadog, debes establecer el parámetro `features.admissionController.enabled` como `true` en tu configuración `DatadogAgent`:

{{< code-block lang="yaml" disable_copy="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    admissionController:
      enabled: true
      mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "Helm" %}}
A partir de Helm charts v2.35.0, el controlador de admisión de Datadog está activado de forma predeterminada. No es necesaria ninguna configuración adicional para activarlo.

Para activar el controlador de admisión para Helm charts v2.34.6 o anterior, establece el parámetro `clusterAgent.admissionController.enabled` como `true` :

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" >}}
#(...)
clusterAgent:
  #(...)
  ## @param admissionController - objet - nécessaire
  ## Habilita el controlador de admisión para inyectar automáticamente APM y
  ## la configuración DogStatsD y etiquetas estándar (env, servicio, versión) en
  ## tus pods
  #
  admissionController:
    enabled: true

    ## @param mutateUnlabelled - booleano - opcional
    ## Habilita la configuración de inyección sin tener la etiqueta del pod:
    ## admission.datadoghq.com/enabled="true"
    #
    mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "DaemonSet" %}}

Para habilitar el controlador de admisión sin usar Helm o Operator de Datadog, añade lo siguiente a tu configuración:

En primer lugar, descarga el manifiesto con los [permisos de configuración del control de acceso basado en roles (RBAC) de Cluster Agent][1] y añade lo siguiente en `rules`:

{{< code-block lang="yaml" filename="cluster-agent-rbac.yaml" disable_copy="true" >}}
- apiGroups:
  - admissionregistration.k8s.io
  recursos:
  - mutatingwebhookconfigurations
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: [""]
  recursos: ["secrets"]
  verbos: ["get", "list", "watch", "update", "create"]
- apiGroups: ["batch"]
  recursos: ["jobs", "cronjobs"]
  verbs: ["get"]
- apiGroups: ["apps"]
  recursos: ["statefulsets", "replicasets", "deployments"]
  verbos: ["get"]
{{< /code-block >}}

Añade lo siguiente al final de `agent-services.yaml`:

{{< code-block lang="yaml" filename="agent-services.yaml" disable_copy="true" >}}

apiVersion: v1
kind: Service
metadata:
  name: datadog-cluster-agent-admission-controller
  labels:
    app: "datadog"
    app.kubernetes.io/name: "datadog"
spec:
  selector:
    app: datadog-cluster-agent
  ports:
  - puerto: 443
    targetPort: 8000

{{< /code-block >}}

Añade variables de entorno al despliegue de Cluster Agent que habilitan el controlador de admisión:

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" disable_copy="true" >}}
- nombre: DD_ADMISSION_CONTROLLER_ENABLED
  valor: "true"
- nombre: DD_ADMISSION_CONTROLLER_SERVICE_NAME
  valor: "datadog-cluster-agent-admission-controller"

# Deselecciona esto para configurar los rastreadores APM automáticamente (ver más abajo).
# - nombre: DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED
# valor: "true"
{{< /code-block >}}

Por último, ejecuta los siguientes comandos:

- `kubectl apply -f cluster-agent-rbac.yaml`
- `kubectl apply -f agent-services.yaml`
- `kubectl apply -f cluster-agent-deployment.yaml`

[1]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
{{% /tab %}}
{{< /tabs >}}

### Inyección de la biblioteca de instrumentación
Puedes configurar el Cluster Agent (v7.39 o posterior) para inyectar bibliotecas de instrumentación. Consulta [Inyección de bibliotecas de instrumentación con el controlador de admisión][2] para obtener más información.


### APM y DogStatsD

Para configurar clientes DogStatsD u otras bibliotecas APM que no admitan la inyección de bibliotecas, inyecta las variables de entorno `DD_AGENT_HOST` y `DD_ENTITY_ID` realizando una de las siguientes acciones:
- Añade la etiqueta `admission.datadoghq.com/enabled: "true"` a tu pod.
- Configura el controlador de admisión del Cluster Agent estableciendo `mutateUnlabelled` (o `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`, dependiendo de tu método de configuración), como `true`.

Añadir una configuración del Agent `mutateUnlabelled: true` en el Helm chart hace que el Cluster Agent intente interceptar todos los pods sin etiquetar.

Para evitar que los pods reciban variables de entorno, añade la etiqueta `admission.datadoghq.com/enabled: "false"` . Esto funciona incluso si configuras el parámetro `mutateUnlabelled: true`.

Si `mutateUnlabelled` está configurado como `false`, la etiqueta del pod debe configurarse como `admission.datadoghq.com/enabled: "true"`.

Opciones posibles:

| mutateUnlabelled | Etiqueta del pod                               | Inyección |
|------------------|-----------------------------------------|-----------|
| `true`           | Sin etiqueta                                | Sí       |
| `true`           | `admission.datadoghq.com/enabled=true`  | Sí       |
| `true`           | `admission.datadoghq.com/enabled=false` | No        |
| `false`          | Sin etiqueta                                 | No        |
| `false`          | `admission.datadoghq.com/enabled=true`  | Sí       |
| `false`          | `admission.datadoghq.com/enabled=false` | No        |


#### Orden de prioridad
El controlador de admisión de Datadog no inyecta las variables de entorno `DD_VERSION`, `DD_ENV`o `DD_SERVICE` si ya existen.

Cuando no se han definido estas variables de entorno, el controlador de admisión usa el valor de las etiquetas estándar en el siguiente orden (primero la más alta):

- Etiquetas en el pod
- Etiquetas en `ownerReference` (ReplicaSets, DaemonSets, Deployments, etc.)

#### Configurar el modo de comunicación entre APM y DogstatsD
A partir de Datadog Cluster Agent v1.20.0, el controlador de admisión de Datadog puede ser configurado para inyectar diferentes modos de comunicación entre la aplicación y el Datadog Agent.

Esta función puede configurarse mediante el parámetro  `admission_controller.inject_config.mode`, o definiendo un modo específico de pod mediante el uso de la etiqueta de pod `admission.datadoghq.com/config.mode`.

Opciones posibles:
| Modo | Descripción |
|--------------------|-------------------------------------------------------------------------------------------------------------------|
| `hostip` (por defecto) Inyecta la IP de host en la variable de entorno `DD_Agent_HOST`...
| `service`       | Inyecta el nombre DNS local de Datadog en la variable de entorno`DD_Agent_HOST` (disponible con Kubernetes v1.22+).
| `socket`        | Inyecta la ruta Unix Domain Socket en la variable de entorno `DD_TRACE_Agent_URL` y la definición del volumen para acceder a la ruta correspondiente. Inyecta la URL a utilizar para conectar el Datadog Agent para métricas de DogStatsD en `DD_DOGSTATSD_URL`.  |

**Nota**: El modo específico del pod tiene prioridad sobre el modo global definido en el nivel del controlador de admisión.

## Resolución de problemas

Consulta la [resolución de problemas del controlador de admisión][6].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: /es/tracing/trace_collection/library_injection_local/
[3]: https://docs.datadoghq.com/es/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[6]: /es/containers/troubleshooting/admission-controller