---
aliases:
- /es/agent/cluster_agent/admission_controller
description: Inyectar automáticamente variables de entorno y etiquetas estándar en
  los pods de Kubernetes utilizando el Controlador de Admisión de Datadog
further_reading:
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentación
  text: Solución de problemas del Agente de Clúster de Datadog
- link: /containers/troubleshooting/admission-controller
  tag: Documentación
  text: Solución de problemas del Controlador de Admisión
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: Blog
  text: Utilizar la inyección de bibliotecas para auto-instrumentar el trazado de
    aplicaciones de Kubernetes con Datadog APM
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Brindar observabilidad de alto rendimiento a entornos de Kubernetes seguros
    con el controlador CSI de Datadog
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Centro de Arquitectura
  text: Instrumentar su aplicación utilizando el Operador de Datadog y el Controlador
    de Admisión
- link: /containers/guide/cluster_agent_disable_admission_controller
  tag: Documentación
  text: Deshabilitar el Controlador de Admisión de Datadog con el Agente de Clúster
title: Controlador de Admisión de Datadog
---
## Descripción general {#overview}
El Controlador de Admisión de Datadog es un componente del Agente de Clúster de Datadog. El principal beneficio del Controlador de Admisión es simplificar la configuración de su Pod de aplicación. Para ello, tiene dos funcionalidades principales:

- Inyectar variables de entorno (`DD_AGENT_HOST`, `DD_TRACE_AGENT_URL`, `DD_ENTITY_ID` y `DD_EXTERNAL_ENV`) para configurar DogStatsD y los SDK de Datadog en los contenedores de la aplicación del usuario.
- Inyectar etiquetas estándar de Datadog (`env`, `service`, `version`) desde las etiquetas de la aplicación en las variables de entorno del contenedor.

El Controlador de Admisión de Datadog es de tipo `MutatingAdmissionWebhook`. Para más detalles sobre los controladores de admisión, consulte la [guía de Kubernetes sobre controladores de admisión][1].

## Requisitos {#requirements}

- Agente de Clúster de Datadog v7.40+

## Configuración {#configuration}
{{< tabs >}}
{{% tab "Operador de Datadog" %}}

El Datadog Operator habilita el Controlador de Admisión de Datadog por defecto. No se necesita configuración adicional para habilitar el Controlador de Admisión.


Si deshabilitó el Controlador de Admisión, puede volver a habilitarlo configurando el parámetro `features.admissionController.enabled` a `true` en su configuración de `DatadogAgent`:

{{< code-block lang="yaml" filename="datadog-agent.yaml" disable_copy="false" >}}
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
A partir de la versión v2.35.0 del gráfico de Helm, el Controlador de Admisión de Datadog está habilitado por defecto. No se necesita configuración adicional para habilitar el Controlador de Admisión.

Para habilitar el Controlador de Admisión para el gráfico de Helm v2.34.6 y versiones anteriores, configure el parámetro `clusterAgent.admissionController.enabled` a `true`:

{{< code-block lang="yaml" filename="datadog-values.yaml" disable_copy="false" >}}
#(...)
clusterAgent:
  #(...)
  ## @param admissionController - object - required
  ## Enable the admissionController to automatically inject APM and
  ## DogStatsD config and standard tags (env, service, version) into
  ## your pods
  #
  admissionController:
    enabled: true

    ## @param mutateUnlabelled - boolean - optional
    ## Enable injecting config without having the pod label:
    ## admission.datadoghq.com/enabled="true"
    #
    mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "DaemonSet" %}}

Para habilitar el Controlador de Admisión sin usar Helm o el operador de Datadog, agregue lo siguiente a su configuración:

Primero, descargue el manifiesto de [permisos RBAC del Agente de Clúster][1] y agregue lo siguiente bajo `rules`:

{{< code-block lang="yaml" filename="cluster-agent-rbac.yaml" disable_copy="true" >}}
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - mutatingwebhookconfigurations
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: ["batch"]
  resources: ["jobs", "cronjobs"]
  verbs: ["get"]
- apiGroups: ["apps"]
  resources: ["statefulsets", "replicasets", "deployments"]
  verbs: ["get"]
{{< /code-block >}}

Agregue lo siguiente al final de `agent-services.yaml`:

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
  - port: 443
    targetPort: 8000

{{< /code-block >}}

Agregue variables de entorno al despliegue del Agente de Clúster que habiliten el Controlador de Admisión:

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" disable_copy="true" >}}
- name: DD_ADMISSION_CONTROLLER_ENABLED
  value: "true"
- name: DD_ADMISSION_CONTROLLER_SERVICE_NAME
  value: "datadog-cluster-agent-admission-controller"

# Uncomment this to configure Datadog SDKs automatically (see below)
# - name: DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED
#   value: "true"
{{< /code-block >}}

Finalmente, ejecute los siguientes comandos:

- `kubectl apply -f cluster-agent-rbac.yaml`
- `kubectl apply -f agent-services.yaml`
- `kubectl apply -f cluster-agent-deployment.yaml`

[1]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
{{% /tab %}}
{{< /tabs >}}

### Inyección de biblioteca de instrumentación APM {#apm-instrumentation-library-injection}
Puede configurar el Agente de Clúster (versión 7.39 y superior) para inyectar bibliotecas de instrumentación utilizando Instrumentación de Paso Único. Lee [Instrumentación APM de Paso Único][2] para más información.

Si no desea utilizar la Instrumentación de Paso Único, se puede usar el Controlador de Admisión de Datadog para inyectar SDKs de Datadog directamente como una alternativa manual a nivel de pod. Lee [Inyección de SDK Local][7] para más información.

### Inyección de variables de entorno APM y DogStatsD {#apm-and-dogstatsd-environment-variable-injection}

Para configurar clientes de DogStatsD u otras bibliotecas APM que no soportan inyección de bibliotecas, inyecte las variables de entorno `DD_AGENT_HOST` y `DD_ENTITY_ID` haciendo una de las siguientes acciones:
- Agregue la etiqueta `admission.datadoghq.com/enabled: "true"` a su Pod.
- Configure el controlador de admisión del Agente de Clúster estableciendo `mutateUnlabelled` (o `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`, dependiendo de su método de configuración) a `true`.

Agregar una configuración de Agente `mutateUnlabelled: true` en el chart de Helm hace que el Agente de Clúster intente interceptar cada Pod sin etiquetar.

Para evitar que los Pods reciban variables de entorno, agregue la etiqueta `admission.datadoghq.com/enabled: "false"`. Esto funciona incluso si establece `mutateUnlabelled: true`.

Si `mutateUnlabelled` está establecido en `false`, la etiqueta del Pod debe establecerse en `admission.datadoghq.com/enabled: "true"`.

Opciones posibles:

| mutateUnlabelled | Etiqueta del Pod                               | Inyección |
| ---------------- | --------------------------------------- | --------- |
| `true`           | Sin etiqueta                                | Sí       |
| `true`           | `admission.datadoghq.com/enabled=true`  | Sí       |
| `true`           | `admission.datadoghq.com/enabled=false` | No        |
| `false`          | Sin etiqueta                                | No        |
| `false`          | `admission.datadoghq.com/enabled=true`  | Sí       |
| `false`          | `admission.datadoghq.com/enabled=false` | No        |


#### Orden de prioridad {#order-of-priority}
El Controlador de Admisión de Datadog no inyecta las variables de entorno `DD_VERSION`, `DD_ENV` o `DD_SERVICE` si ya existen.

Cuando estas variables de entorno no están configuradas, el Controlador de Admisión utiliza el valor de las etiquetas estándar en el siguiente orden (de mayor a menor):

- Etiquetas en el Pod
- Etiquetas en el `ownerReference` (ReplicaSets, DaemonSets, Deployments, etc.)

#### Configurar el modo de comunicación de APM y DogStatsD {#configure-apm-and-dogstatsd-communication-mode}
A partir de la versión 1.20.0 del Agente de Clúster de Datadog, el Controlador de Admisión de Datadog se puede configurar para inyectar diferentes modos de comunicación entre la aplicación y el agente de Datadog.

Esta función se puede configurar estableciendo `admission_controller.inject_config.mode` o definiendo un modo específico del Pod utilizando la etiqueta del Pod `admission.datadoghq.com/config.mode`.

A partir de la versión 3.22.0 del gráfico de Helm y la versión 1.1.0 del Operador de Datadog, el modo de comunicación se establece automáticamente en `socket` si se habilita el socket de APM o el socket de DSD.

Opciones posibles:
| Modo               | Descripción                                                                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hostip` (Predeterminado) | Inyectar la IP del host en la variable de entorno `DD_AGENT_HOST`                                                                                                                                                                          |
| `service`          | Inyectar el nombre DNS del servicio local de Datadog en la variable de entorno `DD_AGENT_HOST` (disponible con Kubernetes v1.22+)                                                                                                                  |
| `socket`           | Inyectar la ruta del socket de dominio Unix en la variable de entorno `DD_TRACE_AGENT_URL` y la definición del volumen para acceder a la ruta correspondiente. Inyectar la URL que se utilizará para conectar el Agente de Datadog para métricas de DogStatsD en `DD_DOGSTATSD_URL`. |
| `csi`              | Inyectar las rutas del socket de dominio Unix en las variables de entorno `DD_TRACE_AGENT_URL` y `DD_DOGSTATSD_URL` y la definición del volumen CSI de Datadog para acceder a las rutas correspondientes. Este modo está disponible para el Agente de Clúster de Datadog v7.67+.                                                    |

**Nota**: El modo específico del pod tiene prioridad sobre el modo global definido a nivel del Controlador de Admisión.

## Solución de Problemas {#troubleshooting}

Vea [Solución de Problemas del Controlador de Admisión][6].

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: https://docs.datadoghq.com/es/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[3]: https://docs.datadoghq.com/es/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[6]: /es/containers/troubleshooting/admission-controller
[7]: https://docs.datadoghq.com/es/tracing/guide/local_sdk_injection/