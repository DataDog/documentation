---
description: Solucione problemas comunes con el Admission Controller del Cluster Datadog
  Agent y la inyección de bibliotecas.
further_reading:
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: Blog
  text: Instrumentación automática de trazado en Kubernetes
- link: /containers/cluster_agent/admission_controller/
  tag: Documentación
  text: Cluster Agent Admission Controller
- link: /tracing/trace_collection/library_injection_local/?tab=kubernetes
  tag: Documentación
  text: Inyección de bibliotecas en Kubernetes
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Centro de arquitectura
  text: Instrumente su aplicación utilizando el Datadog Operator y el Admission Controller
title: Solución de problemas del Admission Controller
---
## Descripción general {#overview}

Esta página proporciona solución de problemas para el Admission Controller del Datadog Cluster Agent.

## Problemas comunes {#common-problems}

### Actualizar pods preexistentes {#update-pre-existing-pods}
El Admission Controller responde a la creación de nuevos pods dentro de su clúster de Kubernetes: en la creación del pod, el Cluster Agent recibe una solicitud de Kubernetes y responde con los detalles de qué cambios (si los hay) realizar en el pod.

Por lo tanto, **Admission Controller no muta los pods existentes dentro de su clúster**. Si habilitó recientemente Admission Controller o realizó otros cambios ambientales, elimine su pod existente y deje que Kubernetes lo vuelva a crear. Esto asegura que Admission Controller actualice su pod. 

### Etiquetas y anotaciones {#labels-and-annotations}
El Cluster Agent responde a las etiquetas y anotaciones en el pod creado—**no** al workload (Deployment, DaemonSet, CronJob, etc.) que creó ese pod. Asegúrese de que su plantilla de pod haga referencia a esto en consecuencia. 

Por ejemplo, la siguiente plantilla establece la [etiqueta para la configuración de APM][2] y la [anotación para la inyección de bibliotecas][3]:

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

### Los pods de la aplicación no se crean {#application-pods-are-not-created}

El modo de inyección de Admission Controller (`socket`, `hostip`, `service`) se establece mediante la configuración de su Cluster Agent. Por ejemplo, si tiene habilitado el modo `socket` en su Agent, Admission Controller también utiliza el modo `socket`.

Si está utilizando GKE Autopilot u OpenShift, debe utilizar un modo de inyección específico.

#### GKE Autopilot {#gke-autopilot}

GKE Autopilot restringe el uso de cualquier `volumes` con un `hostPath`. Por lo tanto, si Admission Controller utiliza el modo `socket`, el GKE Warden bloquea la programación de los pods.

Habilitar el modo GKE Autopilot en el Helm chart deshabilita el modo `socket` para evitar que esto ocurra. Para habilitar APM, habilite el puerto y utilice el método `hostip` o `service` en su lugar. El Admission Controller utilizará `hostip` de forma predeterminada para coincidir.

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

Consulte las [Distribuciones de Kubernetes][17] para obtener más detalles de configuración sobre Autopilot.

#### OpenShift {#openshift}

OpenShift tiene `SecurityContextConstraints` (SCCs) que son necesarios para implementar pods con permisos adicionales, como un `volume` con un `hostPath`. Los componentes de Datadog se implementan con SCCs para permitir la actividad específica de los pods de Datadog, pero Datadog no crea SCCs para otros pods. Admission Controller podría agregar la configuración basada en socket a sus pods de aplicación, lo que provocaría que no se implementen.

Si está utilizando OpenShift, utilice el modo `hostip`. La siguiente configuración habilita el modo `hostip` al deshabilitar las opciones de socket:

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
Alternativamente, puede configurar `features.admissionController.agentCommunicationMode` como `hostip` o `service` directamente.

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  apm:
    portEnabled: true
    socketEnabled: false
```
Alternativamente, puede configurar `clusterAgent.admissionController.configMode` como `hostip` o `service` directamente.
{{% /tab %}}
{{< /tabs >}}

Consulte [Distribuciones de Kubernetes][18] para obtener más detalles de configuración sobre OpenShift.

## Visualizar el estado de Admission Controller {#view-admission-controller-status}

La salida del estado del Cluster Agent proporciona información para verificar que ha creado el `datadog-webhook` para el `MutatingWebhookConfiguration` y tiene un certificado válido.

Ejecute el siguiente comando:

```bash
% kubectl exec -it <Cluster Agent Pod> -- agent status
```

Su salida se parece a la siguiente:

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

Esta salida es relativa al Cluster Agent implementado en el espacio de nombres `default`. El `Service` y el `Secret` deben coincidir con el espacio de nombres utilizado.

## Visualizar los registros de Admission Controller {#view-admission-controller-logs}

Los registros de depuración ayudan a validar que ha configurado Admission Controller correctamente. [Habilite los registros de depuración][3] con la siguiente configuración:

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

### Validar `datadog-webhook` {#validate-datadog-webhook}

**Ejemplo de registros**:

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

Si no ve que el webhook `datadog-webhook` se haya reconciliado correctamente, asegúrese de haber habilitado el Controlador de Admisión de acuerdo con las [instrucciones de configuración][1]. 

### Validar inyección {#validate-injection}

**Ejemplo de registros**:

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

Si ve errores con la inyección para un pod determinado, comuníquese con el soporte de Datadog con su configuración de Datadog y la configuración de su pod.

Si no ve los intentos de inyección para *ningún* pod, verifique su configuración de `mutateUnlabelled` y asegúrese de que las etiquetas de su pod coincidan con los valores esperados. Si estos coinciden, es probable que su problema esté relacionado con la red entre el plano de control, el webhook y el servicio. Consulte [Redes](#networking) para obtener más información.

## Redes {#networking}

### Políticas de red {#network-policies}

Las [Políticas de red][5] de Kubernetes le ayudan a controlar diferentes flujos de tráfico de entrada (ingress) y de salida (egress) hacia sus pods.

Si está utilizando políticas de red, Datadog recomienda crear políticas correspondientes para el Cluster Agent para asegurar la conectividad al pod a través de este puerto. Puede hacer esto con la siguiente configuración:

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

Establezca `flavor` en `kubernetes` para crear un recurso `NetworkPolicy`. 

Alternativamente, para entornos basados en Cilium, establezca `flavor` en `cilium` para crear un recurso `CiliumNetworkPolicy`.

### Solución de problemas de red para distribuciones de Kubernetes {#network-troubleshooting-for-kubernetes-distributions}

Cuando se crea un pod, el clúster de Kubernetes envía una solicitud desde el plano de control, hacia `datadog-webhook`, a través del servicio, y finalmente al pod del Cluster Agent. Esta solicitud requiere conectividad de entrada desde el plano de control al nodo en el que se encuentra el Cluster Agent, a través de su puerto del Admission Controller (`8000`). Después de que esta solicitud se resuelve, el Cluster Agent muta su pod para configurar la conexión de red para el SDK de Datadog.
El servicio del Admission Controller recibe tráfico en el puerto 443 y lo reenvía al pod del Cluster Agent en el puerto 8000.

Dependiendo de su distribución de Kubernetes, esto puede tener algunos requisitos adicionales para sus reglas de seguridad y configuraciones del Admission Controller.

#### Amazon Elastic Kubernetes Service (EKS) {#amazon-elastic-kubernetes-service-eks}

En un clúster de EKS, puede implementar el pod del Cluster Agent en cualquiera de sus nodos basados en Linux de forma predeterminada. Estos nodos y sus instancias EC2 necesitan un [grupo de seguridad][6] con la siguiente [regla de entrada][7]:
- **Protocolo**: TCP
- **Rango de puertos**: `8000`, o un rango que cubra `8000`
- **Fuente**: El ID de _ya sea_ el grupo de seguridad del clúster, o uno de los grupos de seguridad adicionales de su clúster. Puede encontrar estos IDs en la consola de EKS, bajo la pestaña _Redes_ para su clúster de EKS.

Esta regla de grupo de seguridad permite que el plano de control acceda al nodo y al Cluster Agent descendente a través del puerto `8000`.

Si tiene varios [managed node groups][8], cada uno con grupos de seguridad distintos, agregue esta regla de entrada a cada grupo de seguridad.

##### Registro del plano de control {#control-plane-logging}

Para validar su configuración de red, habilite el [registro de planos de control de EKS][9] para el servidor de API. Puede visualizar estos registros en [la consola de CloudWatch][10].

Luego, elimine uno de sus pods para volver a activar una solicitud a través del Admission Controller. Cuando la solicitud falla, puede visualizar registros similares a los siguientes:

```
W0908 <TIMESTAMP> 10 dispatcher.go:202] Failed calling webhook, failing open datadog.webhook.auto.instrumentation: failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
E0908 <TIMESTAMP> 10 dispatcher.go:206] failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
```

Estas fallas son relativas a un Cluster Agent implementado en el espacio de nombres `default`; el nombre DNS se ajusta según el espacio de nombres utilizado.

También puede ver fallas para los otros webhooks de Admission Controller, como `datadog.webhook.tags` y `datadodg.webhook.config`. 

**Nota:** EKS a menudo genera dos flujos de registro dentro del grupo de registros de CloudWatch para el clúster. Asegúrese de revisar ambos para este tipo de registros.

#### Azure Kubernetes Service (AKS) {#azure-kubernetes-service-aks}

Para usar los [webhooks de Admission Controller en AKS][11], utilice la siguiente configuración:

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

La opción `providers.aks.enabled` establece la variable de entorno `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"`.
{{% /tab %}}
{{< /tabs >}}

#### Google Kubernetes Engine (GKE) {#google-kubernetes-engine-gke}

Si está utilizando un [GKE private clúster][12], debe ajustar sus reglas de firewall para permitir el acceso de entrada desde el plano de control al puerto `8000`.

[Agregue una regla de firewall][13] para permitir la entrada a través de TCP en el puerto `8000`.

También puede editar una regla existente. De forma predeterminada, la red de su clúster tiene una regla de firewall llamada `gke-<CLUSTER_NAME>-master`. Asegúrese de que los _filtros de fuente_ de esta regla incluyan [el bloque CIDR del plano de control de su clúster][14]. Edite esta regla para permitir el acceso a través del protocolo `tcp` en el puerto `8000`.

Para obtener más información, consulte [Agregar reglas de firewall para casos de uso específicos][15] en la documentación de GKE.

#### Rancher {#rancher}

Si está utilizando Rancher con un clúster de EKS o un clúster de GKE privado, se requiere configuración adicional. Para obtener más información, consulte [Rancher Webhook - Problemas comunes][16] en la documentación de Rancher.

**Nota&nbsp;**: Dado que el webhook de Admission Controller de Datadog funciona de manera similar al webhook de Rancher, Datadog necesita acceso al puerto `8000` en lugar del `9443` de Rancher.

##### Rancher y EKS {#rancher-and-eks}
Para usar Rancher en un clúster de EKS, implemente el pod del Cluster Agent con la siguiente configuración:

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

También debe agregar una regla de entrada de grupo de seguridad, como se describe en la sección [Amazon EKS](#amazon-elastic-kubernetes-service-eks) en esta página.

##### Rancher y GKE {#rancher-and-gke}
Para usar Rancher en un clúster de GKE privado, edite sus reglas de firewall para permitir el acceso de entrada a través de TCP en el puerto `8000`. Consulte la sección [GKE](#google-kubernetes-engine-gke) en esta página.

## Lecturas adicionales {#further-reading}

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