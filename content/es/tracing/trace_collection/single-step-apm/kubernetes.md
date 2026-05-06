---
aliases:
- /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes
code_lang: kubernetes
code_lang_weight: 20
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas en tiempo de ejecución
- link: /tracing/guide/init_resource_calc/
  tag: Documentación
  text: Aprender sobre el uso de recursos de contenedores init
- link: /tracing/guide/local_sdk_injection
  tag: Documentación
  text: Instrumente sus aplicaciones utilizando la inyección local del kit de desarrollo
    de software (SDK).
- link: https://learn.datadoghq.com/courses/configuring-ssi-k8s
  tag: Centro de Aprendizaje
  text: Configurando la instrumentación de un solo paso en Kubernetes
title: Instrumentación APM de un solo paso en Kubernetes
type: multi-code-lang
---
## Resumen {#overview}

En un entorno de Kubernetes, utilice la instrumentación de un solo paso (SSI) para APM para instalar el Agente de Datadog e [instrumentar][3] sus aplicaciones con los SDK de Datadog en un solo paso.

## Requisitos {#requirements}

- Kubernetes v1.20+.
- [`Helm`][1] para desplegar el Operador de Datadog.
- [`Kubectl` CLI][2] para instalar el Agente de Datadog.
- Compatibilidad del entorno confirmada según la [guía de compatibilidad de instrumentación de un solo paso][36].


## Habilitar APM en sus aplicaciones {#enable-apm-on-your-applications}

<div class="alert alert-info">La instrumentación de un solo paso no instrumenta aplicaciones en el espacio de nombres donde se instala el Agente de Datadog. Instala el Agente en un espacio de nombres separado donde no ejecutes tus aplicaciones.</div>

Sigue estos pasos para habilitar la Instrumentación de Paso Único en todo tu clúster. Esto envía automáticamente trazas de todas las aplicaciones escritas en lenguajes soportados.

**Nota:** Para instrumentar solo espacios de nombres o pods específicos, consulta la segmentación de carga de trabajo en [Opciones avanzadas](#advanced-options).

1. En Datadog, ve a la página de [Instalar el Agente de Datadog en Kubernetes][11].
1. Sigue las instrucciones en pantalla para elegir tu método de instalación, seleccionar una clave de API y configurar el Operador o el repositorio de Helm.
1. En la sección **Configurar `datadog-agent.yaml`**, ve a **Configuración adicional** > **Observabilidad de aplicaciones**, y activa **Instrumentación APM**.

   {{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="El bloque de configuración para instalar el Agente de Datadog en Kubernetes a través de la aplicación de Datadog" style="width:100%;" >}}

1. Despliega el Agente utilizando el archivo de configuración generado.
1. Reinicia tus aplicaciones.

<div class="alert alert-info">SSI agrega una pequeña cantidad de tiempo de inicio a las aplicaciones instrumentadas. Si este sobrecosto no es aceptable para tu caso de uso, contacta a <a href="/help/">Soporte de Datadog</a>.</div>

## Configura etiquetas de servicio unificadas {#configure-unified-service-tags}

Las etiquetas de servicio unificadas (USTs) aplican etiquetas consistentes a través de trazas, métricas y registros, facilitando la navegación y correlación de tus datos de observabilidad. Puedes configurar USTs a través de la extracción automática de etiquetas (recomendado), mediante configuración explícita con `ddTraceConfigs`, o en manifiestos de despliegue.

<div class="alert alert-warning">
Si está utilizando <a href="/agent/remote_config/">Configuración Remota</a>, <a href="#recommended-configure-usts-through-automatic-label-extraction">la extracción automática de etiquetas</a> no es compatible. Debe <a href="#configure-usts-explicitly-with-ddtraceconfigs">configurar USTs explícitamente</a> utilizando <code>ddTraceConfigs</code>.
</div>

### (Recomendado) Configure USTs a través de la extracción automática de etiquetas {#recommended-configure-usts-through-automatic-label-extraction}

Con SSI, puede extraer automáticamente los valores de UST de las etiquetas y metadatos de los pods sin modificar implementaciones individuales. Para hacer esto, configure `kubernetesResourcesLabelsAsTags` para mapear sus etiquetas de Kubernetes existentes a las etiquetas de servicio de Datadog.

**Nota:** Este método no es compatible con la Configuración Remota. Si está utilizando Configuración Remota, consulte [Configurar USTs explícitamente con ddTraceConfigs](#configure-usts-explicitly-with-ddtraceconfigs).

#### Requisitos previos {#prerequisites}

| Componente | Versión mínima |
|-----------|------------------|
| `datadog-agent` | 7.69 |
| `datadog-operator` | 1.16.0 |
| `datadog-helm-chart` | 3.120.0 |

#### Configuración {#configuration}

Reemplace `app.kubernetes.io/name` en el siguiente ejemplo con cualquier etiqueta que contenga el nombre de su servicio (por ejemplo, `service.kubernetes.io/name` o `component`). Puede configurar múltiples etiquetas de esta manera.

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

### Configure USTs explícitamente con ddTraceConfigs {#configure-usts-explicitly-with-ddtraceconfigs}

En la mayoría de los casos, la configuración automática es suficiente. Sin embargo, si necesita un control granular sobre la configuración de cargas de trabajo específicas, utilice `ddTraceConfigs` para mapear explícitamente las etiquetas a las configuraciones del servicio:

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


### Configura USTs en los manifiestos de implementación {#configure-usts-in-deployment-manifests}

Si su configuración no utiliza etiquetas adecuadas para la extracción de UST, puede establecer USTs directamente en sus manifiestos de implementación utilizando variables de entorno. Este enfoque requiere modificar cada implementación individualmente, pero ofrece un control preciso.

Para instrucciones completas, consulta [configuración de USTs para servicios de Kubernetes][5].

## Habilita productos y características dependientes del SDK {#enable-sdk-dependent-products-and-features}

Después de que SSI cargue el SDK de Datadog en tus aplicaciones y habilite el rastreo distribuido, puedes configurar productos adicionales que dependen del SDK:

{{< ssi-products >}}

Utiliza uno de los siguientes métodos de configuración:

- **[Configura con orientación a cargas de trabajo (recomendado)](#target-specific-workloads)**:

  Por defecto, la Instrumentación de Un Solo Paso instrumenta todos los servicios en todos los espacios de nombres. Utiliza la orientación a cargas de trabajo para limitar la instrumentación a espacios de nombres, pods o cargas de trabajo específicas, y aplica configuraciones personalizadas.

- **[Establecer variables de entorno][7]**:

  Habilita productos estableciendo variables de entorno directamente en la configuración de tu aplicación.

## Opciones avanzadas {#advanced-options}

Utilice las siguientes opciones avanzadas para personalizar cómo se comporta la instrumentación de paso único en su entorno. Estas configuraciones son opcionales y generalmente solo se necesitan en configuraciones especializadas.

### Configure modos de inyección {#configure-injection-modes}

SSI admite múltiples modos de inyección, que controlan cómo se entregan los archivos del inyector y de la biblioteca APM a tus contenedores de aplicación. Normalmente no necesita configurar esta opción manualmente. Considere ajustarla si nota retrasos significativos en el inicio del pod o un uso de recursos (CPU, memoria) más alto de lo esperado durante la inicialización del pod. Para más información sobre cómo funciona el inyector, consulte [Comportamiento del inyector con instrumentación de paso único][41].


| Modo | Descripción | Requisitos |
|------|-------------|--------------|
| `init_container` | Utilice contenedores de inicialización para copiar archivos del inyector y de la biblioteca APM en los contenedores de la aplicación. | Agente desplegado con Helm Chart o Datadog Operator |
| `csi` | **En vista previa.** Monta archivos del inyector y de la biblioteca APM utilizando el [controlador CSI de Datadog][37]. Reduce el tiempo de inicio del pod en comparación con el modo de contenedor de inicialización. | Agente 7.76.0+, controlador CSI 1.2.0+, Helm Chart 3.178.1+ o Datadog Operator 1.25.0+ |

Antes de usar `csi` modo, instale y active el controlador CSI de Datadog. Si está desplegando con Helm, también configure `datadog.csi.enabled: true` en su `datadog-values.yaml`. Consulte la [documentación del controlador CSI][37] para los pasos de instalación y requisitos específicos del entorno, como GKE Autopilot.

#### Configure el modo de inyección globalmente {#configure-injection-mode-globally}

{{< tabs >}}
{{% tab "Helm" %}}

Para establecer el modo de inyección a nivel de clúster, agregue `injectionMode` a su `datadog-values.yaml`:

```yaml
datadog:
  apm:
    instrumentation:
      injectionMode: <mode>
```

Valores soportados: `init_container`, `csi`.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Para establecer el modo de inyección a nivel de clúster, agregue `injectionMode` a su `datadog-agent.yaml`:

```yaml
features:
  apm:
    instrumentation:
      injectionMode: <mode>
```

Valores soportados: `init_container`, `csi`.

Si está utilizando Datadog Operator anterior a 1.25.0, use la [anotación de pod](#configure-injection-mode-per-pod) para anular el modo de inyección para pods específicos.

{{% /tab %}}
{{< /tabs >}}

#### Configure el modo de inyección por pod {#configure-injection-mode-per-pod}

Para anular el modo de inyección para un pod específico, agregue la siguiente anotación a la especificación del pod:

```yaml
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.injection-mode: "<mode>"
```

Valores soportados: `init_container`, `csi`.

### Dirija cargas de trabajo específicas {#target-specific-workloads}

De forma predeterminada, SSI instrumenta todos los servicios en todos los espacios de nombres de su clúster. Dependiendo de la versión de su agente, utilice uno de los siguientes métodos de configuración para refinar qué servicios son instrumentados y cómo.

{{< tabs >}}

{{% tab "Agente v7.64+ (Recomendado)" %}}

Cree bloques de destino con la etiqueta `targets` para especificar qué cargas de trabajo instrumentar y qué configuraciones aplicar.

Cada bloque de destino tiene las siguientes claves:

| Clave             | Descripción |
|------------------|-------------|
| `name`            | El nombre del bloque de destino. Esto no tiene efecto en el estado de seguimiento y se utiliza solo como metadatos. |
| `namespaceSelector` | El(los) espacio(s) de nombres a instrumentar. Especifique utilizando uno o más de: <br> - `matchNames`: Una lista de uno o más nombres de espacios de nombres. <br> - `matchLabels`: Una lista de una o más etiquetas definidas en pares `{key,value}`. <br> - `matchExpressions`: Una lista de requisitos de selección de espacios de nombres. <br><br> Los espacios de nombres deben cumplir todos los criterios para coincidir. Para más detalles, consulte la [documentación del selector de Kubernetes][10].|
| `podSelector`     | El(los) pod(s) a instrumentar. Especifique utilizando uno o más de: <br> - `matchLabels`: Una lista de una o más etiqueta(s) definidas en pares `{key,value}`. <br> - `matchExpressions`: Una lista de requisitos de selección de pod. <br><br> Los pods deben cumplir todos los criterios para coincidir. Para más detalles, consulte la [documentación del selector de Kubernetes][10]. |
| `ddTraceVersions` | La versión del [SDK de APM de Datadog][9] a utilizar para cada lenguaje. |
| `ddTraceConfigs`  | Configuraciones del SDK de APM que permiten establecer [Etiquetas de Servicio Unificadas][8], habilitando [ productos dependientes del SDK](#enable-sdk-dependent-products-and-features) más allá del rastreo, y personalizando otras [configuraciones de APM][14]. |

El archivo que necesitas configurar depende de cómo habilitaste la Instrumentación de Paso Único:
- Si habilitaste SSI con Datadog Operator, edita `datadog-agent.yaml`.
- Si habilitaste SSI con Helm, edita `datadog-values.yaml`.

**Nota**: Los bloques de destino se evalúan en orden; la primera coincidencia tiene prioridad.

#### Ejemplos de configuraciones {#example-configurations}

Revisa los siguientes ejemplos que demuestran cómo seleccionar servicios específicos:

{{< collapse-content title="Ejemplo 1: Habilitar todos los espacios de nombres excepto uno" level="h4" >}}

Esta configuración:
- habilita APM para todos los espacios de nombres excepto el espacio de nombres `jenkins`.
  - **Nota**: usa `enabledNamespaces` para deshabilitar para todos los espacios de nombres excepto los listados.
- indica a Datadog que instrumente las aplicaciones Java con el SDK de Java por defecto y las aplicaciones Python con `v.3.1.0` del SDK de Python.

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

{{< collapse-content title="Ejemplo 2: Instrumentar un subconjunto de espacios de nombres, coincidiendo con nombres y etiquetas" level="h4" >}}

Esta configuración crea dos bloques de destino:

- El primer bloque (nombrado `login-service_namespace`):
  - habilita APM para servicios en el espacio de nombres `login-service`.
  - instruye a Datadog para instrumentar servicios en este espacio de nombres con la versión predeterminada del SDK de Java.
  - establece la variable de entorno `DD_PROFILING_ENABLED` para este grupo objetivo
- El segundo bloque (nombrado `billing-service_apps`)
  - habilita APM para servicios en el(los) espacio(s) de nombres con la etiqueta `app:billing-service`.
  - instruye a Datadog para instrumentar este conjunto de servicios con `v3.1.0` del SDK de Python.

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

{{< collapse-content title="Ejemplo 3: Instrumentar diferentes cargas de trabajo con diferentes rastreadores" level="h4" >}}

Esta configuración realiza lo siguiente:
- habilita APM para pods con las siguientes etiquetas:
  - `app:db-user`, que marca pods ejecutando la aplicación `db-user`.
  - `webserver:routing`, que marca pods ejecutando la aplicación `request-router`.
- instruye a Datadog para usar las versiones predeterminadas de los SDKs de Tracer de Datadog.
- establece variables de entorno de Datadog que se aplican a cada grupo objetivo y configura los SDKs.

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

{{< collapse-content title="Ejemplo 4: Instrumentar un pod dentro de un espacio de nombres" level="h4" >}}

Esta configuración:
- habilita APM para pods etiquetados `app:password-resolver` dentro del espacio de nombres `login-service`.
- instruye a Datadog para usar la versión predeterminada del SDK de Tracer de Java de Datadog.
- establece variables de entorno de Datadog que se aplican a este bloque de destino.

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

{{< collapse-content title="Ejemplo 5: Instrumentar un subconjunto de pods usando <code>matchExpressions</code>" level="h4" >}}

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

{{< collapse-content title="Ejemplo 6: Habilitar productos adicionales con <code>ddTraceConfigs</code>" level="h4" >}}

Esta configuración habilita [App and API Protection (AAP)][12] y [Continuous Profiler][11] para los servicios en el espacio de nombres `web-apps`, utilizando `ddTraceConfigs` para establecer las variables de entorno requeridas:

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

Para una lista completa de productos que puedes habilitar a través de SSI, consulta [Habilitar productos y características dependientes del SDK](#enable-sdk-dependent-products-and-features).

{{< /collapse-content >}}

[8]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[9]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/#tracer-libraries
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements
[11]: /es/profiler/
[12]: /es/security/application_security/
[14]: /es/tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "Agente <=v7.63 (Legado)" %}}

#### Habilitar o deshabilitar la instrumentación para los espacios de nombres {#enable-or-disable-instrumentation-for-namespaces}

Puedes elegir habilitar o deshabilitar la instrumentación para aplicaciones en espacios de nombres específicos. Solo puedes establecer enabledNamespaces o disabledNamespaces, no ambos.

El archivo que necesitas configurar depende de si habilitaste la Instrumentación de Paso Único con Datadog Operator o Helm:

{{< collapse-content title="Datadog Operator" level="h5" >}}

Para habilitar la instrumentación para espacios de nombres específicos, agrega `enabledNamespaces` configuración a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # Add namespaces to instrument
           - default
           - applications
{{< /highlight >}}

Para deshabilitar la instrumentación para espacios de nombres específicos, agrega `disabledNamespaces` configuración a `datadog-agent.yaml`:

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

Para habilitar la instrumentación para espacios de nombres específicos, agrega `enabledNamespaces` configuración a `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Add namespaces to instrument
             - namespace_1
             - namespace_2
{{< /highlight >}}

Para deshabilitar la instrumentación para espacios de nombres específicos, agrega `disabledNamespaces` configuración a `datadog-values.yaml`:

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

#### Especificar versiones de SDK {#specify-sdk-versions}

<div class="alert alert-info">A partir del Agente de Clúster de Datadog v7.52.0+, puedes instrumentar automáticamente un subconjunto de tus aplicaciones, basado en los SDK que especifiques.</div>

Especifica los SDK de Datadog y sus versiones para instrumentar automáticamente aplicaciones escritas en esos lenguajes. Puedes configurar esto de dos maneras, que se aplican en el siguiente orden de precedencia:

1. [Especificar a nivel de servicio](#specify-at-the-service-level), o
2. [Especificar a nivel de clúster](#specify-at-the-cluster-level).

**Predeterminado**: Si no especificas ninguna versión de biblioteca, las aplicaciones escritas en lenguajes soportados se instrumentan automáticamente utilizando las versiones más recientes de SDK.

##### Especificar a nivel de servicio {#specify-at-the-service-level}

Para instrumentar automáticamente aplicaciones en pods específicos, agrega la anotación de lenguaje apropiada y la versión de la biblioteca para tu aplicación en la especificación de tu pod:

| Lenguaje   | Anotación de pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<CONTAINER IMAGE TAG>"`   |

Reemplaza `<CONTAINER IMAGE TAG>` con la versión de biblioteca deseada. Las versiones disponibles se enumeran en los [registros de contenedores de Datadog](#change-the-default-image-registry) y en los repositorios de código fuente de trazadores para cada lenguaje:

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

<div class="alert alert-danger">Ten precaución al usar la etiqueta <code>latest</code>, ya que las versiones principales de la biblioteca pueden introducir cambios incompatibles.</div>

Por ejemplo, para instrumentar automáticamente aplicaciones de Java:

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

#####Especifica a nivel de clúster {#specify-at-the-cluster-level}

Si no habilitas la instrumentación automática para pods específicos utilizando anotaciones, puedes especificar qué lenguajes instrumentar en todo el clúster utilizando la configuración de SSI. Cuando `apm.instrumentation.libVersions` está configurado, solo se instrumentan las aplicaciones escritas en los lenguajes especificados, utilizando las versiones de biblioteca especificadas.

El archivo que necesitas configurar depende de si habilitaste la Instrumentación de Paso Único con Datadog Operator o Helm:

{{< collapse-content title="Datadog Operator" level="h5" >}}

Por ejemplo, para instrumentar aplicaciones de .NET, Python y Node.js, agrega la siguiente configuración a tu archivo `datadog-agent.yaml`:

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

{{< collapse-content title="Helm" level="h5" >}}

Por ejemplo, para instrumentar aplicaciones de .NET, Python y Node.js, agrega la siguiente configuración a tu archivo `datadog-values.yaml`:

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

### Cambiar el registro de imágenes predeterminado {#change-the-default-image-registry}

Datadog publica imágenes de bibliotecas de instrumentación en gcr.io, Docker Hub y Amazon ECR:

| Idioma   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js    | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |
| PHP        | [gcr.io/datadoghq/dd-lib-php-init][30] | [hub.docker.com/r/datadog/dd-lib-php-init][31] | [gallery.ecr.aws/datadog/dd-lib-php-init][32] |

La `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` variable de entorno en la configuración del Agente de Clúster de Datadog especifica el registro utilizado por el Controlador de Admisión. El valor predeterminado es `gcr.io/datadoghq`.

Puede obtener el SDK de un registro diferente cambiándolo a `docker.io/datadog`, `public.ecr.aws/datadog` o a otra URL si está alojando las imágenes en un registro de contenedor local.

Para obtener instrucciones sobre cómo cambiar su registro de contenedor, consulte [Cambiando su registro de contenedor][33].

### Utilice un registro de contenedor privado {#use-a-private-container-registry}

Si su organización no permite descargas directas de registros públicos (como `gcr.io`, `docker.io` o `public.ecr.aws`), puede alojar las imágenes requeridas de Datadog internamente y configurar el Controlador de Admisión para usarlas.

Para usar SSI con un registro de contenedor privado:

1. Siga [estas instrucciones][34] para reflejar las imágenes de contenedor de Datadog en su registro privado.

   Solo necesita las imágenes para los lenguajes que está instrumentando. Si no está seguro de cuáles necesita, aquí hay una línea base que cubre la mayoría de los casos de uso:

   - `apm-inject`
   - `dd-lib-java-init`
   - `dd-lib-python-init`
   - `dd-lib-dotnet-init`
   - `dd-lib-php-init`
   - `dd-lib-ruby-init`
   - `dd-lib-js-init`

   Puede encontrar estas imágenes en [gcr.io][12], [Docker Hub][13] o [Amazon ECR Public Gallery][14].

2. Etiquete las imágenes según su configuración.

   Las versiones que refleje deben coincidir con las versiones configuradas en sus cargas de trabajo, que pueden establecerse de las siguientes opciones:
   - globalmente en la configuración del Agente usando `ddTraceVersions`, o
   - por pod usando anotaciones como `admission.datadoghq.com/java-lib.version`.

   Si no se configura explícitamente una versión, se utiliza la versión predeterminada (`0`).

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

3. Actualice la configuración del Agente del Clúster para usar su registro privado.

   Establezca la variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` en la configuración de su Agente del Clúster para usar su registro privado.

Para más detalles sobre cómo cambiar su registro de contenedor, consulte [Cambiar su registro de contenedor][33].

### Usando una Interfaz de Red de Contenedores en EKS {#using-a-container-network-interface-on-eks}

Al usar un CNI como Calico, los nodos del plano de control no pueden iniciar conexiones de red al Controlador de Admisión de Datadog y reportan un error de "Dirección no permitida".
Para usar la instrumentación de Paso Único, modifique el Agente del Clúster de Datadog con el parámetro `useHostNetwork: true`.

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## Elimine la instrumentación de APM de Paso Único de su Agente {#remove-single-step-apm-instrumentation-from-your-agent}

Si no desea recopilar datos de trazas para un servicio, host, VM o contenedor en particular, complete los siguientes pasos:

### Elimine la instrumentación para servicios específicos {#remove-instrumentation-for-specific-services}

Para eliminar la instrumentación de APM y dejar de enviar trazas de un servicio específico, puede hacer una de las siguientes acciones:

#### Utilice reglas de instrumentación para dirigir cargas de trabajo específicas (recomendado) {#use-instrumentation-rules-to-target-specific-workloads-recommended}

Con las reglas de instrumentación (disponibles para el Agente v7.64+), puede habilitar y deshabilitar el trazado para aplicaciones específicas. [ Consulte los detalles de configuración aquí](#advanced-options).

#### Utilice el Controlador de Admisión de Datadog {#use-the-datadog-admission-controller}

Como alternativa, o para una versión del agente que no soporte reglas de instrumentación, también puede deshabilitar la mutación de pods agregando una etiqueta a su pod.

<div class="alert alert-danger">Además de deshabilitar SSI, los siguientes pasos deshabilitan otros webhooks de mutación. Utilice con precaución.</div>

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
3. Reinicie los servicios para los que desee eliminar la instrumentación.

### Elimine APM para todos los servicios en la infraestructura {#remove-apm-for-all-services-on-the-infrastructure}

Para dejar de producir trazas, desinstale APM y reinicie la infraestructura:

El archivo que necesita configurar depende de si habilitó la Instrumentación de Paso Único con Datadog Operator o Helm:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Establezca `instrumentation.enabled=false` en `datadog-agent.yaml`:
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Despliegue el Datadog Agent con el archivo de configuración actualizado:
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

Después de habilitar SSI, todos los procesos soportados en el clúster son instrumentados automáticamente y comienzan a producir trazas en minutos.

Para controlar dónde se activa APM y reducir la sobrecarga, considere las siguientes mejores prácticas.

{{% collapse-content title="Utilice etiquetas de opt-in para un despliegue controlado de APM" level="h3" expanded=false id="id-for-anchoring" %}}

#### Instrumentación por defecto vs. opt-in {#default-vs-opt-in-instrumentation}
| Modo    | Comportamiento    | Cuándo usar |
| ---  | ----------- | ----------- |
| Por defecto | Todos los procesos soportados en el clúster son instrumentados. | Clústeres pequeños o prototipos. |
| Opt-in | Utilice [reglas de instrumentación][4] para restringir la instrumentación a espacios de nombres o pods específicos. | Clústeres de producción, despliegues escalonados o casos de uso sensibles al costo. |

#### Ejemplo: Habilite la instrumentación para pods específicos {#example-enable-instrumentation-for-specific-pods}

1. Agregue una etiqueta significativa (por ejemplo, `datadoghq.com/apm-instrumentation: "enabled"`) tanto a los metadatos de despliegue como a la plantilla del pod.

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

2. En la configuración de Helm de su Datadog Agent, habilite SSI y utilice `podSelector` para inyectar solo en pods con la etiqueta de opt-in correspondiente.

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

Consulte [reglas de instrumentación][4] para ejemplos adicionales.

{{% /collapse-content %}}


{{% collapse-content title="Controle qué SDKs de Datadog se cargan" level="h3" expanded=false id="id-for-anchoring" %}}

Utilice `ddTraceVersions` en la configuración de Helm de su Datadog Agent para controlar tanto el idioma como la versión del SDK de Datadog. Esto evita que se descarguen SDKs innecesarios, lo que minimiza la huella del contenedor de inicialización, reduce el tamaño de la imagen y permite actualizaciones de trazadores más deliberadas (por ejemplo, para cumplir con requisitos de cumplimiento o simplificar la depuración).

#### Ejemplo: Especifique un SDK de Java para un espacio de nombres {#example-specify-a-java-sdk-for-a-namespace}

Solo las aplicaciones de Java se ejecutan en el espacio de nombres `login-service`. Para evitar la descarga de otros SDKs, configura el agente para que apunte a ese espacio de nombres e inyecte solo la versión 1.48.2 del SDK de Java.


```
targets:
  - name: login-service
    namespaceSelector:
      matchNames: ["login-service"]
    ddTraceVersions:
      java: "1.48.2"    # pin version
```

#### Configuración predeterminada {#default-configuration}

Si un pod no coincide con ninguna regla `ddTraceVersions`, se aplica el objetivo predeterminado.

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

Si encuentras problemas al habilitar APM con SSI, consulta la [guía de solución de problemas de SSI][35].

## Lectura adicional {#further-reading}

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
[41]: /es/tracing/guide/injectors/