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
  text: Más información sobre el uso de los recursos del contenedor de inicialización
- link: /tracing/guide/local_sdk_injection
  tag: Documentación
  text: Instrumenta tus aplicaciones mediante la inserción del kit de desarrollo de
    software (SDK) local
title: Instrumentación de un solo step (UI) / paso de APM en Kubernetes
type: multi-code-lang
---

## Información general

En un entorno de Kubernetes, utiliza la instrumentación de un solo  step (UI) / paso (generic) (SSI) para APM para instalar el Datadog Agent e [instrumentar][3] tus aplicaciones con los kits de desarrollo de software (SDK) de APM de Datadog en un solo step (UI) / paso (generic).

## Requisitos

- Kubernetes v1.20+.
- [`Helm`][1] para desplegar el Datadog Operator.
- [CLI `Kubectl`][2] para instalar el Datadog Agent.
- Compatibilidad confirmada del entorno según la [Guía de compatibilidad de instrumentación de un solo step (UI) / paso (generic) ][36].


## Activa APM en tus aplicaciones

<div class="alert alert-info">La instrumentación de un solo step (UI) / paso (generic) no instrumenta aplicaciones en el espacio de nombres donde está instalado el Datadog Agent. Instala el Agent en un espacio de nombres separado donde no ejecutes tus aplicaciones.</div>

Sigue estos steps (UI) / pasos (generic) para activar la instrumentación de un solo step (UI) / paso (generic) en todo tu clúster. Esto envía automáticamente las traces (trazas) de todas las aplicaciones escritas en los lenguajes compatibles.

**Nota:** Para instrumentar solo espacios de nombres o pods específicos, consulta la orientación de la carga de trabajo en [Opciones avanzadas](#advanced-options).

1. En Datadog, ve a la page (página) de [Instalación del Datadog Agent en Kubernetes][11].
1. Sigue las instrucciones que aparecen en pantalla para seleccionar el método de instalación, seleccionar una clave API y configurar el repositorio de Operator o Helm.
1. En la sección **Configurar `datadog-agent.yaml`**, ve a **Additional configuration** > **Application Observability** (Configuración adicional > Observabilidad de la aplicación) y activa **APM Instrumentation** (Instrumentación de APM).

   {{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="El bloque de configuración para instalar el Datadog Agent en Kubernetes a través de la aplicación de Datadog" style="width:100%;" >}}

1. Despliega el Agent utilizando el archivo de configuración generado.
1. Reinicia tus aplicaciones.

<div class="alert alert-info">SSI añade una pequeña cantidad de tiempo de arranque a las aplicaciones instrumentadas. Si esta sobrecarga no es aceptable para tu case (incidencia) de uso, ponte en contacto con <a href="/help/">el servicio de asistencia de Datadog </a>.</div>

## Configurar tags (etiquetas) de servicio unificadas

Las tags (etiquetas) de servicio unificadas (UST) aplican tags (etiquetas) coherentes en todas las traces (trazas), métricas y logs, lo que facilita la navegación y la correlación de tus datos de observabilidad. Puedes configurar las UST mediante la extracción automática de etiquetas (recomendado), mediante la configuración explícita con `ddTraceConfigs` o en manifiestos de despliegue.

<div class="alert alert-warning">
Si utilizas la <a href="/agent/remote_config/">Configuración remota</a>, <a href="#recommended-configure-usts-through-automatic-label-extraction">la extracción automática de etiquetas</a> no es compatible. Debes <a href="#configure-usts-explicitly-with-ddtraceconfigs">configurar las UST explícitamente</a> mediante <code>ddTraceConfigs</code>.
</div>

### (Recomendado) Configurar las UST mediante la extracción automática de etiquetas

Con SSI, puedes extraer automáticamente los valores de las UST de las etiquetas y metadatos de los pods sin modificar las despliegues individuales. Para ello, configura `kubernetesResourcesLabelsAsTags` para asignar tus etiquetas de Kubernetes existentes a tags (etiquetas) de servicios de Datadog.

**Nota:** Este método no es compatible con la Configuración remota. Si utilizas la Configuración remota, consulta [Configurar UST explícitamente con ddTraceConfigs](#configure-usts-explicitly-with-ddtraceconfigs).

#### Requisitos previos

| Componente | Versión mínima  |
|-----------|------------------|
| `datadog-agent` | 7.69        |
| `datadog-operator` | 1.16.0   |
| `datadog-helm-chart` | 3.120.0 |

#### Configuración

Sustituye `app.kubernetes.io/name` en el siguiente ejemplo por cualquier etiqueta que contenga el nombre de tu servicio (por ejemplo, `service.kubernetes.io/name` o `component`). Puedes configurar varias etiquetas de esta forma.

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

Con esta configuración, Datadog establece automáticamente la tag (etiqueta) `service` utilizando el valor de la etiqueta `app.kubernetes.io/name` para cualquier carga de trabajo instrumentada que incluya esta etiqueta.

### Configurar UST explícitamente con ddTraceConfigs

En la mayoría de los casos, la configuración automática es suficiente. Sin embargo, si necesitas un control granular sobre las configuraciones para cargas de trabajo específicas, utiliza `ddTraceConfigs` para asignar explícitamente etiquetas a configuraciones de servicio:

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


### Configurar UST en manifiestos de despliegue

Si tu configuración no utiliza etiquetas adecuadas para la extracción de UST, puedes establecer UST directamente en tus manifiestos de despliegue utilizando variables de entorno. Este enfoque requiere modificar cada despliegue individualmente, pero ofrece un control preciso.

Para obtener instrucciones completas, consulta [configuración de UST para servicios de Kubernetes ][5].

## Activar productos y funciones dependientes del kit de desarrollo de software (SDK)

Después de que SSI cargue el kit de desarrollo de software (SDK) de Datadog en tus aplicaciones y active el rastreo distribuido, puedes configurar productos adicionales que dependan del kit de desarrollo de software (SDK). Estos incluyen capacidades tales como [Continuous Profiler][37], [Monitorización de seguridad de las aplicaciones][38] y [controles de ingesta de traces (trazas)][39].

Utiliza uno de los siguientes métodos de configuración:

- **[Configuración con cargas de trabajo específicas (recomendado)](#target-specific-workloads)**:

  Por defecto, Single Step Instrumentation instrumenta todos los servicios en todos los espacios de nombres. Utiliza la orientación a las cargas de trabajo para limitar la instrumentación a espacios de nombres, pods y cargas de trabajo específicos, y aplica configuraciones personalizadas.

- **[Configurar variables de entorno][7]**:

  Activa productos definiendo variables de entorno directamente en la configuración de tu aplicación.

## Opciones avanzadas

Utiliza las siguientes opciones avanzadas para personalizar el comportamiento de la instrumentación de un solo step (UI) / paso (generic) en tu entorno. Estos ajustes son opcionales y normalmente solo se necesitan en configuraciones especializadas.

### Cargas de trabajo específicas

Por defecto, SSI instrumenta todos los servicios en todos los espacios de nombres de tu clúster. Según cuál sea tu versión del Agent, utiliza uno de los siguientes métodos de configuración para refinar qué servicios se instrumentan y de qué manera.

{{< tabs >}}

{{% tab "Agent v7.64+ (Recomendado)" %}}

Crea bloques de destino con la etiqueta `targets` para especificar qué cargas de trabajo instrumentar y qué configuraciones aplicar.

Cada bloque de destino tiene las siguientes claves:

| Clave             | Descripción |
|------------------|-------------|
| `name`            | El nombre del bloque de destino. No tiene ningún efecto sobre el estado de monitorización y solo se utiliza como metadatos. |
| `namespaceSelector` | El espacio o espacios de nombres que se instrumentarán. Especifífcalo utilizando uno o más de:<br> - `matchNames`: Una lista de uno o más nombres de espacios de nombres. <br> - `matchLabels`: Una lista de una o más etiquetas definidas en pares `{key,value}`. <br> - `matchExpressions`: Una lista de requisitos del selector de espacios de nombres. <br><br> Los espacios de nombres deben cumplir todos los criterios para coincidir. Para obtener más detalles, consulta la [documentación del selector de Kubernetes ][10].|
| `podSelector`     | El pod o pods que se instrumentarán. Especifícalo utilizando uno o más de: <br> - `matchLabels`: Una lista de una o más etiquetas definidas en pares `{key,value}`. <br> - `matchExpressions`: Una lista de requisitos del selector de pods. <br><br> Los pods deben cumplir todos los criterios para coincidir. Para obtener más detalles, consulta la [documentación del selector de Kubernetes ][10]. |
| `ddTraceVersions` | La versión del [kit de desarrollo de software (SDK) de APM de Datadog][9] que se utilizará para cada lenguaje. |
| `ddTraceConfigs`  | Configuraciones del kit de desarrollo de software (SDK) de APM que permiten establecer tags (etiquetas) de servicio unificado, activar productos de Datadog más allá del rastreo y personalizar otros ajustes de APM. [Consulta la lista completa de opciones][8]. |

El archivo que necesitas configurar depende de la manera en que habilitaste la instrumentación de un solo step (UI) / paso (generic):
- Si activaste SSI con Datadog Operator, edita `datadog-agent.yaml`.
- Si activaste SSI con Helm, edita `datadog-values.yaml`.

**Nota**: Los objetivos se evalúan en orden; la primera coincidencia tiene prioridad.

#### Ejemplos de configuraciones

Revisa los siguientes ejemplos que demuestran cómo seleccionar servicios específicos:

{{< collapse-content title="Example 1: Enable all namespaces except one" level="h4" >}}

Esta configuración:
- activa APM para todos los espacios de nombres, excepto el espacio de nombres `jenkins`.
  - **Nota**: utiliza `enabledNamespaces` para desactivar todos los espacios de nombres, excepto los enumerados.
- indica a Datadog que instrumente las aplicaciones de Java con el kit de desarrollo de software (SDK) de APM de Java y las aplicaciones de Python predeterminadas con `v.3.1.0` del kit de desarrollo de software (SDK) de APM de Python.

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

{{< collapse-content title="Example 2: Instrument a subset of namespaces, matching on names and labels" level="h4" >}}

Esta configuración crea dos bloques de destino:

- El primer bloque (denominado `login-service_namespace`):
  - activa APM para los servicios del espacio de nombres `login-service`.
  - indica a Datadog que instrumente los servicios de este espacio de nombres con la versión predeterminada del kit de desarrollo de software (SDK) de APM de Java.
  - configura la variable de entorno `DD_PROFILING_ENABLED` para este grupo de destino
- El segundo bloque (denominado `billing-service_apps`)
  - activa APM para los servicios del espacio o espacios de nombres con la etiqueta `app:billing-service`.
  - indica a Datadog que instrumente este conjunto de servicios con `v3.1.0` del kit de desarrollo de software (SDK) de APM de Python.

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

{{< collapse-content title="Example 3: Instrument different workloads with different tracers" level="h4" >}}

Esta configuración hace lo siguiente:
- activa APM para los pods con las siguientes etiquetas:
  - `app:db-user`que marca los pods que ejecutan la aplicación `db-user`.
  - `webserver:routing`que marca los pods que ejecutan la aplicación `request-router`.
- indica a Datadog que utilice las versiones predeterminadas de los kits de desarrollo de software (SDK) de Datadog Tracer.
- activa las variables de entorno de Datadog para aplicar a cada grupo de destino y configurar los kits de desarrollo de software (SDK).

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

{{< collapse-content title="Example 4: Instrument a pod within a namespace" level="h4" >}}

Esta configuración:
- activa APM para los pods etiquetados como `app:password-resolver` en el espacio de nombres `login-service`.
- indica a Datadog que utilice la versión predeterminada del kit de desarrollo de software (SDK) de Datadog Tracer.
- configura las variables de entorno de Datadog que se aplicarán a este objetivo.

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

{{< collapse-content title="Example 5: Instrument a subset of pods using <code>matchExpressions</code>" level="h4" >}}

Esta configuración activa APM para todos los pods, excepto los que tienen alguna de las etiquetas `app=app1` o `app=app2`.

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

[8]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[9]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/#tracer-libraries
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements

{{% /tab %}}

{{% tab "Agent <=v7.63 (heredado)" %}}

#### Activar o desactivar la instrumentación de los espacios de nombres

Puedes elegir activar o desactivar la instrumentación para aplicaciones en espacios de nombres específicos. Solo puedes definir espacios de nombres activados o espacios de nombres desactivados, no ambos.

El archivo que tienes que configurar depende de si has activado la instrumentación de un solo step (UI) / paso (generic) con el Datadog Operator o con Helm:

{{< collapse-content title="Datadog Operator" level="h5" >}}

Para habilitar la instrumentación para espacios de nombres específicos, añade la configuración `enabledNamespaces` a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # Add namespaces to instrument
           - default
           - applications
{{< /highlight >}}

Para deshabilitar la instrumentación para determinados espacios de nombres, añade la configuración `disabledNamespaces` a `datadog-agent.yaml`:

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

Para habilitar la instrumentación para espacios de nombres específicos, añade la configuración `enabledNamespaces` a `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Añadir espacios de nombres que se van a instrumentar
             - namespace_1
             - namespace_2
{{< /highlight >}}

Para deshabilitar la instrumentación para determinados espacios de nombres, añade la configuración `disabledNamespaces` a `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          disabledNamespaces: # Añadir espacios de nombres que no se van a instrumentar
            - namespace_1
            - namespace_2
{{< /highlight >}}

{{< /collapse-content >}}

#### Especificar versiones de bibliotecas de rastreo

<div class="alert alert-info">A partir del Datadog Cluster Agent v7.52.0 o superior, puedes instrumentar automáticamente un subconjunto de tus aplicaciones, basándose en las bibliotecas de rastreo que especifiques.</div>

Especifica bibliotecas de rastreo de Datadog y sus versiones para instrumentar automáticamente las aplicaciones escritas en esos lenguajes. Puedes configurarlo de dos maneras, que se aplican en el siguiente orden de precedencia:

1. [Especificar al nivel del servicio](#specify-at-the-service-level) o bien
2. [Especificar al nivel del clúster](#specify-at-the-cluster-level).

**Predeterminado**: Si no especificas ninguna versión de biblioteca, las aplicaciones escritas en lenguajes compatibles se instrumentan automáticamente utilizando las últimas versiones de bibliotecas de rastreo.

##### Especificar al nivel del servicio

Para instrumentar automáticamente aplicaciones en pods específicos, añade la anotación de lenguaje y la versión de biblioteca adecuadas para tu aplicación en la especificación de tu pod:

| Lenguaje   | Anotación del pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<CONTAINER IMAGE TAG>"`   |

Sustituye `<CONTAINER IMAGE TAG>` por la versión de la biblioteca deseada. Las versiones disponibles están enumeradas en los [registros de contenedores de Datadog](#change-the-default-image-registry) y en los repositorios de source (fuente) del rastreaedor para cada lenguaje:

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

<div class="alert alert-danger">Ten cuidado al utilizar la <code>última</code> tag (etiqueta), ya que las principales versiones de la biblioteca pueden introducir cambios de última hora.</div>

Por ejemplo, para instrumentar aplicaciones de Java automáticamente:

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

##### Especificar al nivel de clúster

Si no activas la instrumentación automática para pods específicos utilizando anotaciones, puedes especificar qué lenguajes instrumentar en todo el clúster utilizando la configuración de SSI. Cuando se configura `apm.instrumentation.libVersions`, solo se instrumentan las aplicaciones escritas en los lenguajes especificados, utilizando las versiones de biblioteca especificadas.

El archivo que tienes que configurar depende de si has habilitado la instrumentación de un solo paso con el Datadog Operator o con Helm:

{{< collapse-content title="Datadog Operator" level="h5" >}}

Por ejemplo, para instrumentar aplicaciones .NET, Python, y Node.js añade la siguiente configuración a tu archivo `datadog-agent.yaml`:

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

Por ejemplo, para instrumentar aplicaciones .NET, Python, y Node.js añade la siguiente configuración a tu archivo `datadog-values.yaml`:

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

### Cambiar el registro de imágenes predeterminado

Datadog publica imágenes de bibliotecas de instrumentación en gcr.io, Docker Hub y Amazon ECR:

| Lenguaje   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js    | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |
| PHP        | [gcr.io/datadoghq/dd-lib-php-init][30] | [hub.docker.com/r/datadog/dd-lib-php-init][31] | [gallery.ecr.aws/datadog/dd-lib-php-init][32] |

La variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` en la configuración del Datadog Agent del clúster especifica el registro utilizado por el controlador de admisión. El valor predeterminado es `gcr.io/datadoghq`.

Puedes extraer la biblioteca de rastreo de un registro diferente cambiándolo por `docker.io/datadog`, `public.ecr.aws/datadog` u otra URL, si alojas las imágenes en un registro de contenedores local.

Para obtener instrucciones sobre cómo cambiar el registro de contenedores, consulta [Cómo cambiar el registro de contenedores][33].

### Utilizar un registro privado de contenedores

Si tu organización no permite extracciones directas de registros públicos (como `gcr.io`, `docker.io` o `public.ecr.aws`), puedes alojar internamente las imágenes necesarias de Datadog y configurar el controlador de admisión para que las utilice.

Para utilizar SSI con un registro privado de contenedores:

1. Sigue [estas instrucciones][34] para replicar las imágenes del contenedor de Datadog en tu registro privado.

   Solo necesitas las imágenes para los lenguajes que estás instrumentando. Si no estás seguro de cuáles necesitas, esta es una referencia que cubre la mayoría de los cases (incidencias) de uso:

   - `apm-inject`
   - `dd-lib-java-init`
   - `dd-lib-python-init`
   - `dd-lib-dotnet-init`
   - `dd-lib-php-init`
   - `dd-lib-ruby-init`
   - `dd-lib-js-init`

   Puedes encontrar estas imágenes en [gcr.io][12], [Docker Hub][13] o [Amazon ECR Public Gallery][14].

2. Etiqueta las imágenes según tu configuración.

   Las versiones que reflejes deben coincidir con las versiones configuradas en tus cargas de trabajo, que pueden establecerse de una de las siguientes maneras:
   - globalmente en la configuración del Agent con `ddTraceVersions` o
   - por cada pod mediante anotaciones como `admission.datadoghq.com/java-lib.version`.

   Si no se configuras explícitamente ninguna versión, se utiliza la versión predeterminada (`0`).

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

   Esta configuración requiere las siguientes tags (etiquetas) de imagen:
   - `apm-inject:0`
   - `dd-lib-java-init:1`
   - `dd-lib-python-init:3`

3. Actualiza la configuración del Agent del clúster para utilizar tu registro privado.

   Configure la variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` en tu configuración del Agent del clúster para utilizar tu registro privado.

Para obtener más detalles sobre cómo cambiar el registro de contenedores, consulta [Cómo cambiar el registro de contenedores][33].

### Uso de una interfaz de red de contenedores en EKS

Cuando se utiliza un CNI como Calico, los nodos del plano de control no pueden iniciar connections (conexiones) de red con el controlador de admisión de Datadog e informan de un error "Dirección no admitida".
Para utilizar la instrumentación de un solo step (UI) / paso (generic), modifica el Agent del clúster de Datadog con el parámetro `useHostNetwork: true`.

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## Eliminación de la instrumentación de un solo step (UI) / paso (generic) de APM desde tu Agent

Si no deseas recopilar datos de trazas de un determinado servicio, host, máquina virtual o contenedor, sigue los pasos que se indican a continuación:

### Eliminación de la instrumentación en servicios específicos

Para eliminar la instrumentación de APM y dejar de enviar traces (trazas) desde un servicio específico, puedes realizar una de las siguientes acciones:

#### Utilizar la selección de la carga de trabajo (recomendado)

Con la selección de la carga de trabajo (disponible para el Agent v7.64+), puedes activar y desactivar el rastreo para aplicaciones específicas. [Consulta los detalles de configuración aquí](#advanced-options).

#### Utilizar el controlador de admisión de Datadog 

Como alternativa o para una versión del agente que no admita la selección de cargas de trabajo, también puedes desactivar la mutación de pods añadiendo una etiqueta a tu pod.

<div class="alert alert-danger">Además de desactivar SSI, los siguientes steps (UI) / pasos (generic) desactivan otros webhooks mutantes. Utilízalos con cuidado.</div>

1. Establece la etiqueta `admission.datadoghq.com/enabled:` en `"false"` para la especificación del pod:
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. Aplica la configuración:
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. Reinicia los servicios de los que quieres eliminar la instrumentación.

### Eliminar APM para todos los servicios de la infraestructura

Para dejar de producir trazas, desinstala APM y reinicia la infraestructura:

El archivo que tienes que configurar depende de si has habilitado la instrumentación de un solo paso con el Datadog Operator o con Helm:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Configura `instrumentation.enabled=false` en `datadog-agent.yaml`:
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Despliega el Datadog Agent con el archivo de configuración actualizado:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{% /tab %}}

{{% tab "Helm" %}}

1. Configura `instrumentation.enabled=false` en `datadog-values.yaml`:
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. Ejecuta el siguiente comando:
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{% /tab %}}
{{< /tabs >}}

## Prácticas recomendadas

Tras activar SSI, todos los procesos compatibles del clúster se instrumentan automáticamente y comienzan a producir traces (trazas) en cuestión de minutos.

Para controlar dónde se activa APM y reducir la sobrecarga, ten en cuenta las siguientes prácticas recomendadas.

{{% collapse-content title="Use opt-in labels for controlled APM rollout" level="h3" expanded=false id="id-for-anchoring" %}}

#### Instrumentación predeterminada frente a instrumentación opcional
| Modo    | Comportamiento    | Cuándo utilizarla |
| ---  | ----------- | ----------- |
| Valor predeterminado | Todos los procesos compatibles del clúster están instrumentados. | Pequeños clústeres o prototipos. |
| Optar por recibir | Utiliza la [selección de carga de trabajo][4] para restringir la instrumentación a espacios de nombres o pods específicos. | Clústeres de producción, lanzamientos escalonados o cases (incidencias) de uso sensibles a los costes. |

#### Ejemplo: Activación de la instrumentación para pods específicos

1. Añade una etiqueta significativa (por ejemplo, `datadoghq.com/apm-instrumentation: "enabled"`) tanto a los metadatos de despliegue como a la plantilla del pod.

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

2. En tu configuración de Helm del Datadog Agent, activa SSI y utiliza `podSelector` para la inserción solo en pods con la etiqueta opt-in correspondiente.

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

Para obtener más ejemplos, consulta [selección de cargas de trabajo][4].

{{% /collapse-content %}}


{{% collapse-content title="Control which APM SDKs are loaded" level="h3" expanded=false id="id-for-anchoring" %}}

Utiliza `ddTraceVersions` en tu configuración del Agent de Helm para controlar el lenguaje y la versión del kit de desarrollo de software (SDK) de APM. Esto evita que se descarguen kits de desarrollo de software (SDK) innecesarios, lo que minimiza la huella del contendor de inicialización, reduce el tamaño de la imagen y permite actualizaciones más deliberadas del rastreador (por ejemplo, para cumplir con los requisitos de conformidad o simplificar la depuración).

#### Ejemplo: Especificar un kit de desarrollo de software (SDK) de APM de Java para un espacio de nombres

En el espacio de nombres `login-service` solo se ejecutan aplicaciones de Java. Para evitar la descarga de otros kit de desarrollo de software (SDK), configura el Agent para que se dirija a ese espacio de nombres e inserte únicamente la versión 1.48.2 del kit de desarrollo de software (SDK) de Java.


```
targets:
  - name: login-service
    namespaceSelector:
      matchNames: ["login-service"]
    ddTraceVersions:
      java: "1.48.2"    # pin version
```

#### Configuración predeterminada

Si un pod no coincide con ninguna regla de `ddTraceVersions`, se aplica el objetivo predeterminado.

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

## Solucionar problemas

Si tienes problemas para activar APM con SSI, consulta la [Guía de resolución de problemas de SSI][35].

## Referencias adicionales

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
[37]: /es/profiler/
[38]: /es/security/application_security/
[39]: /es/tracing/trace_pipeline/ingestion_controls/