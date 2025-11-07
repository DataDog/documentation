---
further_reading:
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: Blog
  text: Rastreo de Kubernetes para instrumentar automáticamente
- link: /containers/cluster_agent/admission_controller/
  tag: Documentación
  text: Controlador de admisión del Cluster Agent
- link: /tracing/trace_collection/library_injection_local/?tab=kubernetes
  tag: Documentación
  text: Inyección de librería de Kubernetes
title: Solucionar problemas del Controlador de admisión
---

## Información general

Esta página proporciona información para la resolución de problemas del [Controlador de admisión][1] del Datadog Cluster Agent.

## Problemas comunes

### Actualizar los pods preexistentes
El Controlador de admisión responde a la creación de nuevos pods dentro de tu clúster de Kubernetes: en la creación de pods, el Cluster Agent recibe una solicitud de Kubernetes y responde con los detalles de qué cambios (si los hay) hacer en el pod.

Por lo tanto, **el Controlador de admisión no muta los pods existentes dentro de tu clúster**. Si has activado recientemente el Controlador de admisión o has realizado otros cambios en el entorno, elimina tu pod existente y deja que Kubernetes lo vuelva a crear. Esto asegura que el Controlador de admisión actualice tu pod.

### Labels (etiquetas) y anotaciones
El Cluster Agent responde a las labels y anotaciones del pod creado; **no** responde a la carga de trabajo (Despliegue, DaemonSet, CronJob, etc.) que creó ese pod. Asegúrate de que tu plantilla de pod hace referencia a esto.

Por ejemplo, la siguiente plantilla establece la [label para la configuración de APM][2] y la [anotación para la inyección de librería][3]:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
spec:
  #(...)
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true"
      annotations:
        admission.datadoghq.com/<LANGUAGE>-lib.version: <VERSION>
    spec:
      containers:
      #(...)
```

### No se crean los pods de aplicación

El modo de inyección del Controlador de admisión (`socket`, `hostip`, `service`) lo establece la configuración de tu Cluster Agent. Por ejemplo, si tienes habilitado el modo `socket` en tu Agent, el Controlador de admisión también utiliza el modo `socket`.

Si utilizas GKE Autopilot u OpenShift, deberás utilizar un modo de inyección específico.

#### GKE Autopilot

GKE Autopilot restringe el uso de cualquier `volumes` con una `hostPath`. Por lo tanto, si el Controlador de admisión utiliza el modo `socket`, el GKE Warden bloquea la programación de los pods.

Al activar el modo de GKE Autopilot en la tabla de Helm, se desactiva el modo `socket` para evitar que esto ocurra. Para habilitar APM, habilita el puerto y utiliza en su lugar el método `hostip` o `service`. El Controlador de admisión utilizará por defecto `hostip` para coincidir.

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
datadog:
  apm:
    portEnabled: true
  #(...)

providers:
  gke:
    autopilot: true
```
{{% /tab %}}
{{< /tabs >}}

Consulta la página [Distribuciones de Kubernetes][17] para obtener más detalles de configuración sobre el Autopilot.

#### OpenShift

OpenShift dispone de `SecurityContextConstraints` (SCC) que son necesarios para desplegar pods con permisos adicionales, como un `volume` con un `hostPath`. Los componentes Datadog se despliegan con SCC para permitir la actividad específica de los pods Datadog, pero Datadog no crea SCC para otros pods. El Controlador de admisión podría añadir la configuración basada en sockets a tus pods de aplicación, lo que impediría que se desplieguen.

Si utilizas OpenShift, utiliza el modo `hostip`. La siguiente configuración habilita el modo `hostip` desactivando las opciones de socket:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
    dogstatsd:
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
```
Como alternativa, puedes definir `features.admissionController.agentCommunicationMode` como `hostip` o `service` directamente.

{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  apm:
    portEnabled: true
    socketEnabled: false
```
Como alternativa, puedes definir `clusterAgent.admissionController.configMode` como `hostip` o `service` directamente.
{{% /tab %}}
{{< /tabs >}}

Para obtener más detalles de configuración de OpenShift, consulta [Distribuciones de Kubernetes][18].

## Ver el estado del Controlador de admisión

La salida de estado del Cluster Agent proporciona información para verificar que ha creado el `datadog-webhook` para la `MutatingWebhookConfiguration` y tiene un certificado válido.

Ejecuta el siguiente comando:

```bash
% kubectl exec -it <Cluster Agent Pod> -- agent status
```

Tu salida se parece a la siguiente:

```
...
Admission Controller
====================

    Webhooks info
    -------------
      MutatingWebhookConfigurations name: datadog-webhook
      Created at: 2023-09-25T22:32:07Z
      ---------
        Name: datadog.webhook.auto.instrumentation
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectlib
      ---------
        Name: datadog.webhook.config
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectconfig
      ---------
        Name: datadog.webhook.tags
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injecttags

    Secret info
    -----------
    Secret name: webhook-certificate
    Secret namespace: default
    Created at: 2023-09-25T22:32:07Z
    CA bundle digest: f24b6c0c40feaad2
    Duration before certificate expiration: 8643h34m2.557676864s
...
```

Esta salida es relativa al Cluster Agent desplegado en el espacio de nombres `default`. `Service` y `Secret` deben coincidir con el espacio de nombres utilizado.

## Ver logs del Controlador de admisión

Los logs de depuración ayudan a validar que has configurado el Controlador de admisión correctamente. [Habilita la depuración de logs][3] con la siguiente configuración:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    site: <DATADOG_SITE>
    logLevel: debug
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  logLevel: debug
```

{{% /tab %}}
{{< /tabs >}}

### Validar `datadog-webhook`

**Ejemplo de logs**:

```
<TIMESTAMP> | CLUSTER | INFO | (pkg/clusteragent/admission/controllers/secret/controller.go:73 in Run) | Starting secrets controller for default/webhook-certificate
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key datadog-webhook to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/util/kubernetes/apiserver/util.go:47 in func1) | Sync done for informer admissionregistration.k8s.io/v1/mutatingwebhookconfigurations in 101.116625ms, last resource version: 152728
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_v1.go:140 in reconcile) | The Webhook datadog-webhook was found, updating it
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h17m27.909792831s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:176 in processNextWorkItem) | Webhook datadog-webhook reconciled successfully
```

Si no ves que el webhook `datadog-webhook` se ha conciliado correctamente, asegúrate de que has habilitado correctamente el Controlador de admisión según las [instrucciones de configuración][1].

### Validar inyección

**Ejemplo de logs**:

```
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h12m28.007769373s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_TRACE_AGENT_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_DOGSTATSD_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_ENTITY_ID' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_SERVICE' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/auto_instrumentation.go:336 in injectLibInitContainer) | Injecting init container named "datadog-lib-python-init" with image "gcr.io/datadoghq/dd-lib-python-init:v1.18.0" into pod with generate name example-pod-123456789-
```

Si observas errores con la inyección de un pod determinado, ponte en contacto con el soporte de Datadog indicando tu configuración de Datadog y tu configuración de pod.

Si no ves los intentos de inyección para *ningún* pod, verifica la configuración de `mutateUnlabelled` y asegúrate de que las labels (etiquetas) de tus pods coinciden con los valores esperados. Si coinciden, es probable que el problema esté en la red entre el plano de control, el webhook y el servicio. Consulta [Redes](#networking) para obtener más información.

## Redes

### Políticas de red

[Políticas de red][5] de Kubernetes te ayuda a controlar diferentes flujos de tráfico de entrada (inbound) y salida (outbound) a tus pods.

Si utilizas políticas de red, Datadog recomienda crear las políticas correspondientes para el Cluster Agent para asegurar la conectividad con el pod a través de este puerto. Puedes hacerlo con la siguiente configuración:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    #(...)
    networkPolicy:
      create: true
      flavor: kubernetes
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  #(...)
  networkPolicy:
    create: true
    flavor: kubernetes
```
{{% /tab %}}
{{< /tabs >}}

Establece `flavor` en `kubernetes` para crear un recurso de `NetworkPolicy`.

Alternativamente, para los entornos basados en Cilium, establece `flavor` en `cilium` para crear un recurso de `CiliumNetworkPolicy`.

### Solucionar problemas de red para distribuciones de Kubernetes

Cuando se crea un pod, el clúster de Kubernetes envía una solicitud desde el plano de control a `datadog-webhook`, a través del servicio, y finalmente al pod del Cluster Agent. Esta solicitud requiere conectividad de entrada desde el plano de control al nodo en el que se encuentra el Cluster Agent, a través de su puerto del Controlador de admisión (`8000`). Una vez resuelta esta solicitud, el Cluster Agent muta tu pod para configurar la conexión de red para el trazador de Datadog.

Según tu distribución de Kubernetes, esto puede tener algunos requisitos adicionales para tus reglas de seguridad y configuración del Controlador de admisión.

#### Amazon Elastic Kubernetes Service (EKS)

En un clúster de EKS, puedes desplegar el pod del Cluster Agent en cualquiera de tus nodos basados en Linux de forma predeterminada. Estos nodos y sus instancias de EC2 necesitan un [grupo de seguridad][6] con la siguiente [regla de entrada][7]:
- **Protocolo**: TCP
- **Rango de puertos**: `8000`, o un rango que cubra `8000`
- **Fuente**: El ID del grupo de seguridad del clúster _o_ de uno de los grupos de seguridad adicionales del clúster. Encontrarás estos ID en la consola de EKS, en la pestaña _Redes_ de tu clúster de EKS.

Esta regla de grupo de seguridad permite que el plano de control acceda al nodo y al flujo descendente del Cluster Agent a través del puerto `8000`.

Si tienes varios [grupos de nodos gestionados][8], cada uno con grupos de seguridad distintos, añade esta regla de entrada a cada grupo de seguridad.

##### Registro del plano de control

Para validar tu configuración de redes, activa el [registro del plano de control de EKS][9] para el servidor de API. Puedes ver estos logs en la [consola de CloudWatch][10].

A continuación, elimina uno de tus pods para volver a lanzar una solicitud a través del Controlador de admisión. Cuando la solicitud falla, puedes ver logs que se parecen a los siguiente:

```
W0908 <TIMESTAMP> 10 dispatcher.go:202] Failed calling webhook, failing open datadog.webhook.auto.instrumentation: failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
E0908 <TIMESTAMP> 10 dispatcher.go:206] failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
```

Estos fallos son relativos a un Cluster Agent desplegado en el espacio de nombres `default`; el nombre de DNS se ajusta en relación al espacio de nombres utilizado.

También puedes ver fallos para los otros webhooks del Controlador de admisión, como `datadog.webhook.tags` y `datadodg.webhook.config`.

**Nota:** EKS suele generar dos flujos de log dentro del grupo de log de CloudWatch para el clúster. Asegúrate de comprobar ambos para estos tipos de logs.

#### Azure Kubernetes Service (AKS)

Para utilizar [webhooks del Controlador de admisión en AKS][11], utiliza la siguiente configuración:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  #(...)
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```
{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  #(...)

providers:
  aks:
    enabled: true
```

La opción `providers.aks.enabled` define la variable de entorno `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"`.
{{% /tab %}}
{{< /tabs >}}

#### Google Kubernetes Engine (GKE)

Si utilizas un [clúster privado de GKE][12], deberás ajustar las reglas de tu cortafuegos para permitir el acceso entrante desde el plano de control al puerto `8000`.

[Añade una regla de cortafuegos][13] para permitir la entrada a través de TCP en el puerto `8000`.

También puedes editar una regla existente. Por defecto, la red para tu clúster tiene una regla de cortafuegos llamada `gke-<CLUSTER_NAME>-master`. Asegúrate de que los _filtros de fuente_ de esta regla incluyan [el bloque CIDR del plano de control de tu clúster][14]. Edita esta regla para permitir el acceso a través del protocolo `tcp` en el puerto `8000`.

Para más información, consulta [Añadir reglas de cortafuegos para casos de uso específicos][15] en la documentación de GKE.

#### Rancher

Si utilizas Rancher con un clúster de EKS o un clúster privado de GKE, se requiere una configuración adicional. Para más información, consulta [Rancher Webhook - Problemas comunes][16] en la documentación de Rancher.

**Nota**: Dado que el webhook del Controlador de admisión de Datadog funciona de forma similar al webhook de Rancher, Datadog necesita acceso al puerto `8000` en lugar del puerto `9443` de Rancher.

##### Rancher y EKS
Para utilizar Rancher en un clúster de EKS, despliega el pod de Cluster Agent con la siguiente configuración:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    clusterAgent:
      hostNetwork: true
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  #(...)

clusterAgent:
  useHostNetwork: true
```
{{% /tab %}}
{{< /tabs >}}

También debes añadir una regla de entrada de grupo de seguridad, como se describe en la sección [Amazon EKS](#amazon-elastic-kubernetes-service-eks) de esta página.

##### Rancher y GKE
Para utilizar Rancher en un clúster GKE privado, edita las reglas de tu cortafuegos para permitir el acceso entrante a través de TCP en el puerto `8000`. Consulta la sección [GKE](#google-kubernetes-engine-gke) en esta página.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/cluster_agent/admission_controller
[2]: /es/containers/cluster_agent/admission_controller/#apm-and-dogstatsd
[3]: /es/tracing/trace_collection/library_injection_local/?tab=kubernetes
[4]: /es/agent/troubleshooting/debug_mode/
[5]: https://kubernetes.io/docs/concepts/services-networking/network-policies/#networkpolicy-resource
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html
[7]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[8]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html
[10]: https://console.aws.amazon.com/cloudwatch/home#logs:prefix=/aws/eks
[11]: https://docs.microsoft.com/en-us/azure/aks/faq#can-i-use-admission-controller-webhooks-on-aks
[12]: https://cloud.google.com/kubernetes-engine/docs/concepts/private-cluster-concept
[13]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#step_3_add_a_firewall_rule
[14]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#step_1_view_control_planes_cidr_block
[15]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[16]: https://ranchermanager.docs.rancher.com/reference-guides/rancher-webhook#common-issues
[17]: /es/containers/kubernetes/distributions/#autopilot
[18]: /es/containers/kubernetes/distributions/#Openshift
