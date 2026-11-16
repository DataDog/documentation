---
aliases:
- /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes
code_lang: kubernetes
code_lang_weight: 20
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas de tiempo de ejecución
- link: /tracing/guide/init_resource_calc/
  tag: Documentación
  text: Obtenga información sobre el uso de recursos del contenedor de inicialización
- link: /tracing/guide/local_sdk_injection
  tag: Documentación
  text: Instrumente sus aplicaciones mediante la inyección de SDK local
- link: https://learn.datadoghq.com/courses/configuring-ssi-k8s
  tag: Centro de aprendizaje
  text: Configuración de la instrumentación de un solo paso en Kubernetes
title: Instrumentación de un solo paso de APM en Kubernetes
type: multi-code-lang
---
## Descripción general {#overview}

En un entorno de Kubernetes, utilice la instrumentación de un solo paso (SSI) para APM a fin de instalar el Datadog Agent e [instrumentar][3] sus aplicaciones con los SDK de Datadog en un solo paso.

{{< skill-callout
    title="Configure APM con un Agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Requisitos {#requirements}

- Kubernetes v1.20+.
- [`Helm`][1] para implementar el Datadog Operator.
- [`Kubectl` CLI][2] para instalar el Datadog Agent.
- Compatibilidad del entorno confirmada según la [guía de compatibilidad de la instrumentación de un solo paso][36].


## Habilite APM en sus aplicaciones {#enable-apm-on-your-applications}

<div class="alert alert-info">La instrumentación de un solo paso no instrumenta aplicaciones en el espacio de nombres donde está instalado el Datadog Agent. Instale el Agent en un espacio de nombres separado donde no ejecute sus aplicaciones.</div>

Habilitar la instrumentación de un solo paso en todo su clúster envía automáticamente trazas desde todas las aplicaciones escritas en lenguajes compatibles.

**Nota:** Para instrumentar solo espacios de nombres o pods específicos, consulte la segmentación de cargas de trabajo en [Opciones avanzadas](#advanced-options).

Utilice los siguientes comandos para habilitar SSI, reemplazando:

- `<YOUR_DD_API_KEY>` con su [clave de Datadog API][40]
- `<YOUR_CLUSTER_NAME>` con el nombre de su clúster
- `<DATADOG_SITE>` con su [sitio de Datadog][43]: {{< region-param key="dd_site" code="true" >}}

Los ejemplos habilitan SSI con `apm.instrumentation.enabled: true` y utilizan el espacio de nombres `datadog`. Reemplace el espacio de nombres si su Agent está instalado en otro lugar.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Instale el Datadog Operator y cree un secreto que contenga su clave de API:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   helm install datadog-operator datadog/datadog-operator --namespace datadog --create-namespace
   kubectl create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY> -n datadog
   ```

1. Cree un archivo `datadog-agent.yaml` que habilite la instrumentación de APM:

   ```yaml
   kind: "DatadogAgent"
   apiVersion: "datadoghq.com/v2alpha1"
   metadata:
     name: "datadog"
     namespace: "datadog"
   spec:
     global:
       clusterName: "<YOUR_CLUSTER_NAME>"
       site: "<DATADOG_SITE>"
       credentials:
         apiSecret:
           secretName: "datadog-secret"
           keyName: "api-key"
     features:
       apm:
         instrumentation:
           enabled: true
   ```

   Para fijar versiones específicas del SDK en lugar de instalar la última, agregue un bloque `targets` con `ddTraceVersions`. Consulte [Target specific workloads](#target-specific-workloads) para ver el esquema completo.

1. Implementar el Agent:

   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

Para actualizar una instalación existente del Datadog Operator, agregue la configuración de SSI a su `datadog-agent.yaml` y vuelva a aplicarla con `kubectl -n datadog apply -f datadog-agent.yaml`.

{{% /tab %}}
{{% tab "Helm" %}}

1. Agregue el repositorio de Helm de Datadog, cree el espacio de nombres `datadog` y cree un secreto que contenga su clave de API:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create namespace datadog
   kubectl -n datadog create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY>
   ```

1. Cree un archivo `datadog-values.yaml` que habilite la instrumentación de APM:

   ```yaml
   datadog:
     site: "<DATADOG_SITE>"
     clusterName: "<YOUR_CLUSTER_NAME>"
     apiKeyExistingSecret: "datadog-secret"
     apm:
       instrumentation:
         enabled: true
   ```

   Para fijar versiones específicas del SDK en lugar de instalar la última, agregue un bloque `targets` con `ddTraceVersions`. Consulte [Target specific workloads](#target-specific-workloads) para ver el esquema completo.

1. Implementar el Agent:

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog --namespace datadog
   ```

Para actualizar una instalación existente de Helm, agregue la configuración de SSI a su `datadog-values.yaml` y ejecute `helm upgrade -n datadog -f datadog-values.yaml <RELEASE_NAME> datadog/datadog`.

{{% /tab %}}
{{< /tabs >}}

Después de implementar el Agent, reinicie sus aplicaciones.

<div class="alert alert-info">La SSI añade una pequeña cantidad de tiempo de inicio a las aplicaciones instrumentadas. Si esta sobrecarga no es aceptable para su caso de uso, contacte a <a href="/help/">Soporte de Datadog</a>.</div>

### Genere la configuración desde Datadog {#generate-the-configuration-from-datadog}

Para generar la configuración a través de la interfaz de usuario, vaya a la página [Install the Datadog Agent on Kubernetes][11] y siga las instrucciones en pantalla para elegir su método de instalación y clave de API. En la sección {{< ui >}}Configure `datadog-agent.yaml`{{< /ui >}}, vaya a {{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}} y active {{< ui >}}APM Instrumentation{{< /ui >}}. Luego, implemente el Agent utilizando el archivo de configuración generado.

{{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="El bloque de configuración para instalar el Datadog Agent en Kubernetes a través de la aplicación de Datadog" style="width:100%;" >}}

## Verifique la instalación {#verify-the-installation}

1. Confirme que los pods del Agent se estén ejecutando:

   ```shell
   kubectl get pods -n datadog
   ```

1. Confirme que el Agent esté en buen estado y que el APM Agent se esté ejecutando. Reemplace `<AGENT_POD>` con el nombre de un pod del Agent en el nodo:

   ```shell
   kubectl exec <AGENT_POD> -n datadog -- agent status
   ```

   Verifique la sección **APM Agent** de la salida.

1. Confirme que la inyección llegó a un pod de aplicación instrumentado. Reemplace `<APP_POD>` y `<APP_NAMESPACE>` con uno de sus pods de aplicación y su espacio de nombres:

   ```shell
   kubectl get pod <APP_POD> -n <APP_NAMESPACE> -o jsonpath='{.spec.initContainers[*].name}'
   ```

   La salida incluye `datadog-init-apm-inject` y un contenedor `datadog-lib-<language>-init` para cada lenguaje instrumentado.

1. Después de que sus aplicaciones reciban tráfico, confirme que sus servicios aparecen en la [página de servicios de APM][42]. Si no aparecen en unos minutos, siga la [guía de solución de problemas de SSI][35].

## Configurar etiquetas de servicio unificadas {#configure-unified-service-tags}

Las etiquetas de servicio unificadas (USTs) aplican etiquetas coherentes en trazas, métricas y registros, lo que facilita la navegación y la correlación de sus datos de observabilidad. Puede configurar las UST mediante la extracción automática de etiquetas (recomendado), mediante la configuración explícita con `ddTraceConfigs` o en los manifiestos de implementación.

<div class="alert alert-warning">
Si está utilizando <a href="/agent/remote_config/">Remote Configuration</a>, la <a href="#recommended-configure-usts-through-automatic-label-extraction">extracción automática de etiquetas</a> no es compatible. Debe <a href="#configure-usts-explicitly-with-ddtraceconfigs">configurar las UST explícitamente</a> usando <code>ddTraceConfigs</code>.
</div>

### (Recomendado) Configure las UST mediante la extracción automática de etiquetas {#recommended-configure-usts-through-automatic-label-extraction}

Con SSI, puede extraer automáticamente los valores de UST de las etiquetas y los metadatos de los pods sin modificar las implementaciones individuales. Para hacer esto, configure `kubernetesResourcesLabelsAsTags` para asignar sus etiquetas de Kubernetes existentes a las etiquetas de servicio de Datadog.

**Nota:** Este método no es compatible con Remote Configuration. Si está utilizando Remote Configuration, consulte [Configure las UST explícitamente con ddTraceConfigs](#configure-usts-explicitly-with-ddtraceconfigs).

#### Requisitos previos {#prerequisites}

| Componente | Versión mínima  |
|-----------|------------------|
| `datadog-agent` | 7.69        |
| `datadog-operator` | 1.16.0   |
| `datadog-helm-chart` | 3.120.0 |

#### Configuración {#configuration}

Reemplace `app.kubernetes.io/name` en el siguiente ejemplo con cualquier etiqueta que contenga el nombre de su servicio (por ejemplo, `service.kubernetes.io/name` o `component`). Puede configurar varias etiquetas de esta manera.

```yaml
datadog:
  # Automatically extract service names from Kubernetes labels
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service     # Modern Kubernetes label
    deployments.apps:
      app.kubernetes.io/name: service
    replicasets.apps:
      app.kubernetes.io/name: service

  # Set environment globally for the entire cluster
  tags:
    - "env:production"

  apm:
    instrumentation:
      enabled: true
```

Con esta configuración, Datadog establece automáticamente la etiqueta `service` utilizando el valor de la etiqueta `app.kubernetes.io/name` para cualquier carga de trabajo instrumentada que incluya esta etiqueta.

### Configure las UST explícitamente con ddTraceConfigs {#configure-usts-explicitly-with-ddtraceconfigs}

En la mayoría de los casos, la configuración automática es suficiente. Sin embargo, si necesita un control granular sobre los ajustes para cargas de trabajo específicas, utilice `ddTraceConfigs` para asignar explícitamente etiquetas a las configuraciones de servicio:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service
    deployments.apps:
      app.kubernetes.io/name: service

  # Set environment globally for the entire cluster
  tags:
    - "env:production"

  apm:
    instrumentation:
      enabled: true
      targets:
        - name: frontend-services
          podSelector:
            matchLabels:
              tier: frontend
          ddTraceConfigs:
            - name: DD_SERVICE       # Explicitly override service name
              valueFrom:
                fieldRef:
                  fieldPath: metadata.labels['app.kubernetes.io/name']
            # DD_ENV inherited from cluster-level tags above
            # DD_VERSION automatically extracted from image tags
```


### Configure las UST en manifiestos de despliegue {#configure-usts-in-deployment-manifests}

Si su configuración no utiliza etiquetas adecuadas para la extracción de UST, puede establecer las UST directamente en sus manifiestos de despliegue utilizando variables de entorno. Este enfoque requiere modificar cada despliegue individualmente, pero ofrece un control preciso.

Para obtener instrucciones completas, consulte [configuración de UST para servicios de Kubernetes][5].

## Habilitar productos y funciones que dependen del SDK {#enable-sdk-dependent-products-and-features}

Después de que SSI cargue el SDK de Datadog en sus aplicaciones y habilite el rastreo distribuido, puede configurar productos adicionales que dependen del SDK:

{{< ssi-products >}}

Utilice uno de los siguientes métodos de configuración:

- **[Configure con segmentación de cargas de trabajo (recomendado)](#target-specific-workloads)**:

  De forma predeterminada, la instrumentación de un solo paso instrumenta todos los servicios en todos los espacios de nombres. Utilice la selección de carga de trabajo para limitar la instrumentación de un solo paso a espacios de nombres, pods o cargas de trabajo específicos, y aplique configuraciones personalizadas.

- **[Establecer variables de entorno][7]**:

  Habilite productos estableciendo variables de entorno directamente en la configuración de su aplicación.

## Opciones avanzadas {#advanced-options}

Utilice las siguientes opciones avanzadas para personalizar cómo se comporta la instrumentación de un solo paso en su entorno. Estos ajustes son opcionales y normalmente solo se necesitan en configuraciones especializadas.

### Configurar modos de inyección {#configure-injection-modes}

SSI admite múltiples modos de inyección, los cuales controlan cómo se entregan el inyector y los archivos de la biblioteca APM a los contenedores de su aplicación. Normalmente no necesita configurar este ajuste manualmente. Considere ajustarlo si nota retrasos significativos en el inicio de los pods o un uso de recursos (CPU, memoria) mayor al esperado durante la inicialización del pod. Para obtener más información sobre cómo funciona el inyector, consulte [Comportamiento del inyector con instrumentación de un solo paso][41].


| Modo | Descripción | Requisitos |
|------|-------------|--------------|
| `init_container` | Utiliza contenedores de inicialización para copiar los archivos del inyector y de la biblioteca APM en los contenedores de la aplicación. | Agent implementado con Helm Chart o Datadog Operator |
| `csi` | **En vista previa.** Monta los archivos del inyector y de la biblioteca APM utilizando el [controlador CSI de Datadog][37]. Reduce el tiempo de inicio del pod en comparación con el modo de contenedor de inicialización. | Agent 7.76.0+, controlador CSI 1.2.0+, Helm Chart 3.178.1+ o Datadog Operator 1.25.0+ |

Antes de usar el modo `csi`, instale y active el controlador CSI de Datadog. Si está realizando la implementación con Helm, establezca también `datadog.csi.enabled: true` en su `datadog-values.yaml`. Consulte la [documentación del controlador CSI][37] para conocer los pasos de instalación y los requisitos específicos del entorno, como GKE Autopilot.

#### Configure el modo de inyección globalmente {#configure-injection-mode-globally}

{{< tabs >}}
{{% tab "Helm" %}}

Para establecer el modo de inyección en todo el clúster, agregue `injectionMode` a su `datadog-values.yaml` :

```yaml
datadog:
  apm:
    instrumentation:
      injectionMode: <mode>
```

Valores admitidos: `init_container`, `csi`.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Para establecer el modo de inyección en todo el clúster, agregue `injectionMode` a su `datadog-agent.yaml` :

```yaml
features:
  apm:
    instrumentation:
      injectionMode: <mode>
```

Valores admitidos: `init_container`, `csi`.

Si está utilizando una versión de Datadog Operator anterior a la 1.25.0, utilice la [anotación de pod](#configure-injection-mode-per-pod) para anular el modo de inyección para pods específicos.

{{% /tab %}}
{{< /tabs >}}

#### Configure el modo de inyección por pod {#configure-injection-mode-per-pod}

Para anular el modo de inyección para un pod específico, agregue la siguiente anotación a la especificación del pod:

```yaml
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.injection-mode: "<mode>"
```

Valores admitidos: `init_container`, `csi`.

### Dirija cargas de trabajo específicas {#target-specific-workloads}

De forma predeterminada, SSI instrumenta todos los servicios en todos los espacios de nombres de su clúster. Dependiendo de su versión del Agent, utilice uno de los siguientes métodos de configuración para definir qué servicios se instrumentan y cómo.

{{< tabs >}}

{{% tab "Agent v7.64+ (Recomendado)" %}}

Cree bloques de destino con la etiqueta `targets` para especificar qué cargas de trabajo instrumentar y qué configuraciones aplicar.

Cada bloque de destino tiene las siguientes claves:

| Clave             | Descripción |
|------------------|-------------|
| `name`            | El nombre del bloque de destino. Esto no tiene efecto en el estado de monitoreo y se utiliza solo como metadatos. |
| `namespaceSelector` | El/los espacio(s) de nombres a instrumentar. Especifique utilizando uno o más de:<br> - `matchNames`: Una lista de uno o más nombres de espacio de nombres. <br> - `matchLabels`: Una lista de una o más etiquetas definidas en pares `{key,value}`. <br> - `matchExpressions`: Una lista de requisitos de selector de espacio de nombres. <br><br> Los espacios de nombres deben cumplir con todos los criterios para coincidir. Para obtener más detalles, consulte la [documentación del selector de Kubernetes][10].|
| `podSelector`     | El/los pod(s) a instrumentar. Especifique utilizando uno o más de: <br> - `matchLabels`: Una lista de una o más etiquetas definidas en pares `{key,value}`. <br> - `matchExpressions`: Una lista de requisitos de selector de pod. <br><br> Los pod deben cumplir con todos los criterios para coincidir. Para obtener más detalles, consulte la [documentación del selector de Kubernetes][10]. |
| `ddTraceVersions` | La versión de Datadog APM SDK [9] a utilizar para cada idioma. |
| `ddTraceConfigs`  | Configuraciones de APM SDK que permiten establecer [Unified Service Tags][8], habilitar [productos dependientes del SDK](#enable-sdk-dependent-products-and-features) más allá del rastreo, y personalizar otras [APM settings][14]. |

El archivo que necesita configurar depende de cómo habilitó la instrumentación de un solo paso:
- Si habilitó SSI con Datadog Operator, edite `datadog-agent.yaml`.
- Si habilitó SSI con Helm, edite `datadog-values.yaml`.

**Nota**: Los destinos se evalúan en orden; la primera coincidencia tiene prioridad.

#### Ejemplos de configuración {#example-configurations}

Revise los siguientes ejemplos que demuestran cómo seleccionar servicios específicos:

{{< collapse-content title="Ejemplo 1: Habilitar todos los espacios de nombres excepto uno" level="h5" >}}

Esta configuración:
- habilita APM para todos los espacios de nombres excepto el espacio de nombres `jenkins`.
  - **Nota**: utilice `enabledNamespaces` para deshabilitar la instrumentación en todos los espacios de nombres excepto aquellos enumerados.
- indica a Datadog que instrumente las aplicaciones Java con el SDK de Java predeterminado y las aplicaciones Python con `v.3.1.0` del SDK de Python.

{{< highlight yaml "hl_lines=4-10" >}}
   apm:
     instrumentation:
       enabled: true
       disabledNamespaces:
         - "jenkins"
       targets:
         - name: "all-remaining-services"
           ddTraceVersions:
             java: "default"
             python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Ejemplo 2: Instrumentar un subconjunto de espacios de nombres, haciendo coincidir nombres y etiquetas" level="h5" >}}

Esta configuración crea dos bloques de destinos:

- El primer bloque (llamado `login-service_namespace`):
  - habilita APM para los servicios en el espacio de nombres `login-service`.
  - indica a Datadog que instrumente los servicios en este espacio de nombres con la versión predeterminada del SDK de Java.
  - establece la variable de entorno `DD_PROFILING_ENABLED` para este grupo de destino
- El segundo bloque (llamado `billing-service_apps`)
  - habilita APM para los servicios en el o los espacios de nombres con la etiqueta `app:billing-service`.
  - indica a Datadog que instrumente este conjunto de servicios con `v3.1.0` del SDK de Python.

{{< highlight yaml "hl_lines=4-28" >}}
  apm:
    instrumentation:
      enabled: true
      targets:
        - name: "login-service_namespace"
          namespaceSelector:
            matchNames:
              - "login-service"
          ddTraceVersions:
            java: "default"
          ddTraceConfigs:
            - name: "DD_PROFILING_ENABLED"  ## profiling is enabled for all services in this namespace
              value: "auto"
        - name: "billing-service_apps"
          namespaceSelector:
            matchLabels:
              app: "billing-service"
          ddTraceVersions:
            python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Ejemplo 3: Instrumentar diferentes cargas de trabajo con diferentes trazadores" level="h5" >}}

Esta configuración hace lo siguiente:
- habilita APM para pods con las siguientes etiquetas:
  - `app:db-user`, que marca los pods que ejecutan la aplicación `db-user`.
  - `webserver:routing`, que marca los pods que ejecutan la aplicación `request-router`.
- indica a Datadog que utilice las versiones predeterminadas de los SDK de Datadog Tracer.
- establece las variables de entorno de Datadog para aplicarlas a cada grupo de destino y configurar los SDK.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "db-user"
           podSelector:
             matchLabels:
               app: "db-user"
           ddTraceVersions:
             java: "default"
           ddTraceConfigs:   ## trace configs set for services in matching pods
             - name: "DD_DATA_STREAMS_ENABLED"
               value: "true"
         - name: "user-request-router"
           podSelector:
             matchLabels:
               webserver: "user"
           ddTraceVersions:
             php: "default"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Ejemplo 4: Instrumentar un pod dentro de un espacio de nombres" level="h5" >}}

Esta configuración:
- habilita APM para pods etiquetados como `app:password-resolver` dentro del espacio de nombres `login-service`.
- indica a Datadog que utilice la versión predeterminada del SDK de Datadog Java Tracer.
- establece las variables de entorno de Datadog para aplicarlas a este destino.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "login-service-namespace"
           namespaceSelector:
             matchNames:
               - "login-service"
           podSelector:
             matchLabels:
               app: "password-resolver"
           ddTraceVersions:
             java: "default"
           ddTraceConfigs:
             - name: "DD_PROFILING_ENABLED"
               value: "auto"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Ejemplo 5: Instrumentar un subconjunto de pods usando <code>matchExpressions</code>" level="h5" >}}

Esta configuración habilita APM para todos los pods excepto aquellos que tienen cualquiera de las etiquetas `app=app1` o `app=app2`.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "default-target"
           podSelector:
               matchExpressions:
                 - key: app
                   operator: NotIn
                   values:
                   - app1
                   - app2
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Ejemplo 6: Habilitar productos adicionales con <code>ddTraceConfigs</code>" level="h5" >}}

Esta configuración habilita [App and API Protection (AAP)][12] y [Continuous Profiler][11] para servicios en el espacio de nombres `web-apps`, usando `ddTraceConfigs` para establecer las variables de entorno requeridas:

{{< highlight yaml "hl_lines=4-20" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "web-apps-with-security"
           namespaceSelector:
             matchNames:
               - "web-apps"
           ddTraceVersions:
             java: "default"
             python: "default"
           ddTraceConfigs:
             - name: "DD_APPSEC_ENABLED"
               value: "true"
             - name: "DD_PROFILING_ENABLED"
               value: "auto"
{{< /highlight >}}

Para obtener la lista de productos que puede habilitar a través de SSI, consulte [Habilitar productos y funciones que dependen del SDK](#enable-sdk-dependent-products-and-features).

{{< /collapse-content >}}

[8]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[9]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/#tracer-libraries
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements
[11]: /es/profiler/
[12]: /es/security/application_security/
[14]: /es/tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "Agent <=v7.63 (Legado)" %}}

#### Habilite o deshabilite la instrumentación para los espacios de nombres {#enable-or-disable-instrumentation-for-namespaces}

Puede elegir habilitar o deshabilitar la instrumentación para aplicaciones en espacios de nombres específicos. Solo puede configurar enabledNamespaces o disabledNamespaces, no ambos.

El archivo que necesita configurar depende de si habilitó la instrumentación de un solo paso (Single Step Instrumentation) con Datadog Operator o Helm:

{{< collapse-content title="Datadog Operator" level="h5" >}}

Para habilitar la instrumentación para espacios de nombres específicos, agregue la configuración `enabledNamespaces` a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # Add namespaces to instrument
           - default
           - applications
{{< /highlight >}}

Para deshabilitar la instrumentación para espacios de nombres específicos, agregue la configuración `disabledNamespaces` a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         disabledNamespaces: # Add namespaces to not instrument
           - default
           - applications
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h5" >}}

Para habilitar la instrumentación para espacios de nombres específicos, agregue la configuración `enabledNamespaces` a `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Add namespaces to instrument
             - namespace_1
             - namespace_2
{{< /highlight >}}

Para deshabilitar la instrumentación para espacios de nombres específicos, agregue la configuración `disabledNamespaces` a `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          disabledNamespaces: # Add namespaces to not instrument
            - namespace_1
            - namespace_2
{{< /highlight >}}

{{< /collapse-content >}}

#### Especifique las versiones del SDK {#specify-sdk-versions}

<div class="alert alert-info">A partir de Datadog Cluster Agent v7.52.0+, puede instrumentar automáticamente un subconjunto de sus aplicaciones, según los SDK que especifique.</div>

Especifique los SDK de Datadog y sus versiones para instrumentar automáticamente las aplicaciones escritas en esos lenguajes. Puede configurar esto de dos maneras, las cuales se aplican en el siguiente orden de precedencia:

1. [Especifique a nivel de servicio](#specify-at-the-service-level), o
2. [Especifique a nivel de clúster](#specify-at-the-cluster-level).

**Predeterminado**: Si no especifica ninguna versión de biblioteca, las aplicaciones escritas en lenguajes compatibles se instrumentan automáticamente utilizando las versiones más recientes del SDK.

##### Especifique a nivel de servicio {#specify-at-the-service-level}

Para instrumentar automáticamente aplicaciones en pods específicos, agregue la anotación de lenguaje y la versión de biblioteca correspondientes para su aplicación en la especificación de su pod:

| Lenguaje   | Anotación de Pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<CONTAINER IMAGE TAG>"`   |

Reemplace `<CONTAINER IMAGE TAG>` con la versión de biblioteca deseada. Las versiones disponibles se enumeran en los [registros de contenedores de Datadog](#change-the-default-image-registry) y en los repositorios de código fuente del rastreador para cada lenguaje:

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

<div class="alert alert-danger">Tenga cuidado al usar la <code>latest</code> etiqueta, ya que las versiones principales de la biblioteca pueden introducir cambios importantes.</div>

Por ejemplo, para instrumentar automáticamente aplicaciones Java:

{{< highlight yaml "hl_lines=10" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # ...
spec:
  template:
    metadata:
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # ...
{{< /highlight >}}

##### Especifique a nivel de clúster {#specify-at-the-cluster-level}

Si no habilita la instrumentación automática para pods específicos mediante anotaciones, puede especificar qué lenguajes instrumentar en todo el clúster utilizando la configuración de SSI. Cuando `apm.instrumentation.libVersions` está configurado, solo se instrumentan las aplicaciones escritas en los lenguajes especificados, utilizando las versiones de biblioteca especificadas.

El archivo que necesita configurar depende de si habilitó la instrumentación de un solo paso (Single Step Instrumentation) con Datadog Operator o Helm:

{{< collapse-content title="Datadog Operator" level="h6" >}}

Por ejemplo, para instrumentar aplicaciones .NET, Python y Node.js, agregue la siguiente configuración a su archivo `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h6" >}}

Por ejemplo, para instrumentar aplicaciones .NET, Python y Node.js, agregue la siguiente configuración a su archivo `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-8" >}}
   datadog:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}


[34]: https://github.com/DataDog/dd-trace-java/releases
[35]: https://github.com/DataDog/dd-trace-js/releases
[36]: https://github.com/DataDog/dd-trace-py/releases
[37]: https://github.com/DataDog/dd-trace-dotnet/releases
[38]: https://github.com/DataDog/dd-trace-rb/releases
[39]: https://github.com/DataDog/dd-trace-php/releases


{{% /tab %}}
{{< /tabs >}}

### Cambie el registro de imágenes predeterminado {#change-the-default-image-registry}

Datadog publica imágenes de bibliotecas de instrumentación en gcr.io, Docker Hub y Amazon ECR:

| Idioma   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js    | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |
| PHP        | [gcr.io/datadoghq/dd-lib-php-init][30] | [hub.docker.com/r/datadog/dd-lib-php-init][31] | [gallery.ecr.aws/datadog/dd-lib-php-init][32] |

La variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` en la configuración del Datadog Cluster Agent especifica el registro utilizado por el Admission Controller. El valor predeterminado es `gcr.io/datadoghq`.

Puede extraer el SDK de un registro diferente cambiándolo a `docker.io/datadog`, `public.ecr.aws/datadog`, u otra URL si está alojando las imágenes en un registro de contenedor local.

Para obtener instrucciones sobre cómo cambiar su registro de contenedor, consulte [Changing Your Container Registry][33].

### Utilice un registro de contenedor privado {#use-a-private-container-registry}

Si su organización no permite extracciones directas de registros públicos (como `gcr.io`, `docker.io` o `public.ecr.aws`), puede alojar las imágenes de Datadog requeridas internamente y configurar el Admission Controller para que las utilice.

Para usar SSI con un registro de contenedor privado:

1. Siga [estas instrucciones][34] para replicar las imágenes de contenedor de Datadog en su registro privado.

   Solo necesita las imágenes para los lenguajes que está instrumentando. Si no está seguro de cuáles necesita, aquí tiene una base que cubre la mayoría de los casos de uso:

   - `apm-inject`
   - `dd-lib-java-init`
   - `dd-lib-python-init`
   - `dd-lib-dotnet-init`
   - `dd-lib-php-init`
   - `dd-lib-ruby-init`
   - `dd-lib-js-init`

   Puede encontrar estas imágenes en [gcr.io][12], [Docker Hub][13] o [Amazon ECR Public Gallery][14].

2. Etiquete las imágenes de acuerdo con su configuración.

   Las versiones que refleje deben coincidir con las versiones configuradas en sus cargas de trabajo, las cuales podrían establecerse de una de las siguientes maneras:
   - globalmente en la configuración del Agent usando `ddTraceVersions`, o
   - por pod usando anotaciones como `admission.datadoghq.com/java-lib.version`.

   Si no se configura explícitamente ninguna versión, se utiliza la versión predeterminada (`0`).

   Por ejemplo:

   ```
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "default-target"
           ddTraceVersions:
             java: "1"
             python: "3"
   ```

   Esta configuración requiere las siguientes etiquetas de imagen:
   - `apm-inject:0`
   - `dd-lib-java-init:1`
   - `dd-lib-python-init:3`

3. Actualice la configuración del Cluster Agent para usar su registro privado.

   Establezca la variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` en la configuración de su Cluster Agent para usar su registro privado.

Para obtener más detalles sobre cómo cambiar su registro de contenedor, consulte [Changing Your Container Registry][33].

### Uso de una interfaz de red de contenedor (CNI) en EKS {#using-a-container-network-interface-on-eks}

Cuando se utiliza una CNI como Calico, los nodos del plano de control no pueden iniciar conexiones de red al controlador de admisión de Datadog y reportan un error de "Address is not allowed".
Para usar la instrumentación de un solo paso (Single Step), modifique el Cluster Agent de Datadog con el parámetro `useHostNetwork: true`.

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## Elimine la instrumentación de Single Step APM de su Agent {#remove-single-step-apm-instrumentation-from-your-agent}

Si no desea recopilar datos de traza para un servicio, servidor, VM o contenedor en particular, complete los siguientes pasos:

### Eliminar la instrumentación de servicios específicos {#remove-instrumentation-for-specific-services}

Para eliminar la instrumentación de APM y dejar de enviar trazas desde un servicio específico, puede hacer una de las siguientes cosas:

#### Utilice reglas de instrumentación para dirigirse a cargas de trabajo específicas (recomendado) {#use-instrumentation-rules-to-target-specific-workloads-recommended}

Con las reglas de instrumentación (disponibles para Agent v7.64+), puede habilitar y deshabilitar el rastreo para aplicaciones específicas. [Consulte los detalles de configuración aquí](#advanced-options).

#### Utilice el controlador de admisión de Datadog {#use-the-datadog-admission-controller}

Como alternativa, o para una versión de Agent que no admita reglas de instrumentación, también puede deshabilitar la mutación de pods agregando una etiqueta a su pod.

<div class="alert alert-danger">Además de deshabilitar SSI, los siguientes pasos deshabilitan otros webhooks de mutación. Use con precaución.</div>

1. Establezca la etiqueta `admission.datadoghq.com/enabled:` en `"false"` para la especificación del pod:
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. Aplique la configuración:
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. Reinicie los servicios para los que desea eliminar la instrumentación.

### Eliminar APM para todos los servicios en la infraestructura {#remove-apm-for-all-services-on-the-infrastructure}

Para dejar de producir trazas, desinstale APM y reinicie la infraestructura:

El archivo que necesita configurar depende de si habilitó la instrumentación de un solo paso (Single Step Instrumentation) con Datadog Operator o Helm:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Establezca `instrumentation.enabled=false` en `datadog-agent.yaml`:
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Implemente el Datadog Agent con el archivo de configuración actualizado:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{% /tab %}}

{{% tab "Helm" %}}

1. Establezca `instrumentation.enabled=false` en `datadog-values.yaml`:
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. Ejecute el siguiente comando:
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{% /tab %}}
{{< /tabs >}}

## Mejores prácticas {#best-practices}

Después de habilitar SSI, todos los procesos compatibles en el clúster se instrumentan automáticamente y comienzan a producir trazas en cuestión de minutos.

Para controlar dónde se activa APM y reducir la sobrecarga, considere las siguientes mejores prácticas.

{{% collapse-content title="Use etiquetas opt-in para un despliegue controlado de APM" level="h3" expanded=false id="opt-in-labels-controlled-apm-rollout" %}}

#### Instrumentación predeterminada frente a opt-in {#default-vs-opt-in-instrumentation}
| Modo    | Comportamiento    | Cuándo usarlo |
| ---  | ----------- | ----------- |
| Predeterminado | Todos los procesos compatibles en el clúster están instrumentados. | Clústeres pequeños o prototipos. |
| Opt-in | Utilice [reglas de instrumentación][4] para restringir la instrumentación a espacios de nombres o pods específicos. | Clústeres de producción, despliegues graduales o casos de uso sensibles a los costos. |

#### Ejemplo: Habilite la instrumentación para pods específicos {#example-enable-instrumentation-for-specific-pods}

1. Agregue una etiqueta significativa (por ejemplo, `datadoghq.com/apm-instrumentation: "enabled"`) tanto a los metadatos del despliegue como a la plantilla del pod.

   ```
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: checkout-api
     labels:
       app: checkout-api
       datadoghq.com/apm-instrumentation: "enabled"   # opt-in label (cluster-wide)
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: checkout-api
     template:
       metadata:
         labels:
           app: checkout-api
           datadoghq.com/apm-instrumentation: "enabled"   # opt-in label must be on *template*, too
           # Unified Service Tags (recommended)
           tags.datadoghq.com/service: "checkout-api"
           tags.datadoghq.com/env:     "prod"
           tags.datadoghq.com/version: "2025-06-10"
       spec:
         containers:
           - name: api
             image: my-registry/checkout:latest
             ports:
               - containerPort: 8080
   ```

2. En su configuración de Helm del Datadog Agent, habilite SSI y use `podSelector` para inyectar solo en los pods con la etiqueta opt-in correspondiente.

   ```
     apm:
       instrumentation:
         enabled: true
         targets:
           - name: apm-instrumented
             podSelector:
               matchLabels:
                 datadoghq.com/apm-instrumentation: "enabled"
   ```

Consulte [reglas de instrumentación][4] para ver ejemplos adicionales.

{{% /collapse-content %}}


{{% collapse-content title="Controle qué SDKs de Datadog se cargan" level="h3" expanded=false id="control-loaded-datadog-sdks" %}}

Use `ddTraceVersions` en su configuración de Helm del Agent para controlar tanto el lenguaje como la versión del SDK de Datadog. Esto evita que se descarguen SDK innecesarios, lo que minimiza la huella del contenedor de inicialización, reduce el tamaño de la imagen y permite actualizaciones de tracer más deliberadas (por ejemplo, para cumplir con los requisitos de cumplimiento o simplificar la depuración).

#### Ejemplo: Especifique un SDK de Java para un espacio de nombres {#example-specify-a-java-sdk-for-a-namespace}

Solo las aplicaciones Java se ejecutan en el espacio de nombres `login-service`. Para evitar la descarga de otros SDK, configure el Agent para que apunte a ese espacio de nombres e inyecte solo la versión 1.48.2 del SDK de Java.


```
targets:
  - name: login-service
    namespaceSelector:
      matchNames: ["login-service"]
    ddTraceVersions:
      java: "1.48.2"    # pin version
```

#### Configuración predeterminada {#default-configuration}

Si un pod no coincide con ninguna regla `ddTraceVersions`, se aplica el destino predeterminado.

```
targets:
  - name: default-target          # tag any pod *without* an override
    ddTraceVersions:
      java:   "1"   # stay on latest v1.x
      python: "3"   # stay on latest v3.x
      js:     "5"   # NodeJS
      php:    "1"
      dotnet: "3"
```

{{% /collapse-content %}}

## Solución de problemas {#troubleshooting}

Si encuentra problemas al habilitar APM con SSI, consulte la [guía de solución de problemas de SSI][35].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /es/tracing/glossary/#instrumentation
[4]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=agentv764recommended#configure-instrumentation-for-namespaces-and-pods
[5]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#containerized-environment
[7]: /es/tracing/trace_collection/library_config/
[11]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[12]: https://gcr.io/datadoghq
[13]: https://hub.docker.com/u/datadog
[14]: https://gallery.ecr.aws/datadog
[15]: http://gcr.io/datadoghq/dd-lib-java-init
[16]: http://hub.docker.com/r/datadog/dd-lib-java-init
[17]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[18]: http://gcr.io/datadoghq/dd-lib-js-init
[19]: http://hub.docker.com/r/datadog/dd-lib-js-init
[20]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[21]: http://gcr.io/datadoghq/dd-lib-python-init
[22]: http://hub.docker.com/r/datadog/dd-lib-python-init
[23]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[24]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[25]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[26]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[27]: http://gcr.io/datadoghq/dd-lib-ruby-init
[28]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[29]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[30]: http://gcr.io/datadoghq/dd-lib-php-init
[31]: http://hub.docker.com/r/datadog/dd-lib-php-init
[32]: http://gallery.ecr.aws/datadog/dd-lib-php-init
[33]: /es/containers/guide/changing_container_registry/
[34]: /es/containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[35]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[36]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/
[37]: /es/containers/kubernetes/csi_driver/
[40]: https://app.datadoghq.com/organization-settings/api-keys
[42]: https://app.datadoghq.com/apm/services
[41]: /es/tracing/guide/injectors/
[43]: /es/getting_started/site/