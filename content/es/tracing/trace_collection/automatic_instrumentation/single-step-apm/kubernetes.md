---
code_lang: Kubernetes
code_lang_weight: 20
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas de tiempo de ejecución
- link: /tracing/guide/init_resource_calc/
  tag: Documentación
  text: Más información sobre el uso de recursos del contenedor de inicialización
- link: /tracing/guide/local_sdk_injection
  tag: Documentación
  text: Instrumentación de tus aplicaciones mediante la inyección local de SDK
title: Instrumentación APM de un solo paso en Kubernetes
type: lenguaje de código múltiple
---

## Información general

En un entorno Kubernetes, utiliza la instrumentación de un solo paso (SSI) para APM para instalar el Datadog Agent e [instrumentar][3] tus aplicaciones con los SDK de APM en un solo paso.

## Requisitos

- Kubernetes v1.20 o posterior.
- [`Helm`][1] para desplegar el Datadog Operator.
- [CLI `Kubectl`][2] para instalar el Datadog Agent.
- Compatibilidad del entorno confirmada según la [guía de compatibilidad de la instrumentación de un solo paso][36].


## Activar APM en tus aplicaciones

<div class="alert alert-info">La instrumentación de un solo paso no instrumenta las aplicaciones en el espacio de nombres donde está instalado el Datadog Agent. Instala el Agent en un espacio de nombres separado donde no ejecutes tus aplicaciones.</div>

Sigue estos pasos para activar la instrumentación de un solo paso en todo tu clúster. Esta acción envía automáticamente trazas (traces) de todas las aplicaciones escritas en los lenguajes compatibles.

**Nota:** Para instrumentar solo espacios de nombres o pods específicos, consulta la orientación de la carga de trabajo en [Opciones avanzadas](#advanced-options).

1. En Datadog, ve a la página [Instalar el Datadog Agent en Kubernetes][11].
1. Sigue las instrucciones que aparecen en pantalla para seleccionar el método de instalación, seleccionar una clave de API y configurar el Operator o el repositorio de Helm.
1. En la sección **Configure `datadog-agent.yaml`** (Configurar datadog-agent.yaml), ve a **Additional Configuration** > **Application Observability** (Configuración adicional > Observabilidad de aplicaciones) y activa la **instrumentación APM**.

   {{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="Bloque de configuración para instalar el Datadog Agent en Kubernetes a través de la aplicación Datadog" style="width:100%;" >}}

1. Despliega el Agent utilizando el archivo de configuración generado.
1. Reinicia tus aplicaciones.

<div class="alert alert-info">La SSI añade una pequeña cantidad de tiempo de arranque a las aplicaciones instrumentadas. Si esta sobrecarga no es aceptable para tu caso de uso, ponte en contacto con el <a href="/help/">servicio de asistencia de Datadog</a>.</div>

## Configurar etiquetas (tags) de servicio unificadas

Las etiquetas (tags) de servicio unificadas (UST) aplican etiquetas (tags) coherentes en trazas, métricas y logs, lo que facilita la navegación y la correlación de tus datos de observabilidad. Puedes configurar UST mediante la extracción de etiquetas (labels), que es la opción recomendada, o en manifiestos de despliegue.

### (Recomendado) Configurar UST mediante la extracción de etiquetas (labels)

Con la SSI, puedes extraer automáticamente los valores de las UST de etiquetas (labels) y metadatos de pods sin modificar los despliegues individuales. Para ello, configura `kubernetesResourcesLabelsAsTags` para asignar tus etiquetas (labels) de Kubernetes existentes a tags (etiquetas) de servicios Datadog.

#### Requisitos previos

| Componente | Versión mínima  |
|-----------|------------------|
| `datadog-agent` | 7.69        |
| `datadog-operator` | 1.16.0   |
| `datadog-helm-chart` | 3.120.0 |

#### Configuración automática

Sustituye `app.kubernetes.io/name` en el siguiente ejemplo por cualquier etiqueta (label) que contenga el nombre de tu servicio (por ejemplo, `service.kubernetes.io/name` o `component`). Puedes configurar varias etiquetas (labels) de esta forma.

```yaml
datadog:
  # Extraer automáticamente nombres de servicio de las etiquetas (labels) de Kubernetes
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service     # Etiqueta (label) moderna de Kubernetes
    deployments.apps:
      app.kubernetes.io/name: service
    replicasets.apps:
      app.kubernetes.io/name: service

  # Configurar el entorno globalmente para todo el clúster
  tags:
    - "env:production"

  apm:
    instrumentation:
      enabled: true
```

Con esta configuración, Datadog configura automáticamente la etiqueta (tag) `service` utilizando el valor de la etiqueta `app.kubernetes.io/name` (label) para cualquier carga de trabajo instrumentada que incluya esta etiqueta (label).

#### Control explícito con ddTraceConfigs

En la mayoría de los casos, la configuración automática es suficiente. Sin embargo, si necesitas un control granular sobre las configuraciones de cargas de trabajo específicas, utiliza `ddTraceConfigs` para asignar explícitamente etiquetas (labels) a configuraciones de servicio:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service
    deployments.apps:
      app.kubernetes.io/name: service

  # Configurar el entorno globalmente para todo el clúster
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
            - name: DD_SERVICE       # Anular explícitamente el nombre de servicio
              valueFrom:
                fieldRef:
                  fieldPath: metadata.labels['app.kubernetes.io/name']
            # DD_ENV heredada de etiquetas (tags) a nivel del clúster de aquí arriba
            # DD_VERSION extraída automáticamente de etiquetas (tags) de imagen
```


### Configurar UST en manifiestos de despliegue

Si tu configuración no utiliza las etiquetas (labels) adecuadas para la extracción de UST, puedes configurar las UST directamente en tus manifiestos de despliegue utilizando variables de entorno. Este enfoque requiere modificar cada despliegue individualmente, pero ofrece un control preciso.

Para obtener instrucciones completas, consulta la [configuración de UST para servicios de Kubernetes][5].

## Activar productos y funciones dependientes de SDK

Después de que la SSI cargue el SDK de Datadog en tus aplicaciones y active el rastreo distribuido, puedes configurar productos adicionales que dependan del SDK. Estos incluyen funciones tales como [Continuous Profiler][37], [Application Security Monitoring][38] y los [controles de ingesta de trazas][39].

Utiliza uno de los siguientes métodos de configuración:

- **[Configurar con cargas de trabajo específicas (recomendado)](#target-specific-workloads)**:

  Por defecto, Single Step Instrumentation instrumenta todos los servicios en todos los espacios de nombres. Utiliza la orientación a las cargas de trabajo para limitar la instrumentación a espacios de nombres, pods y cargas de trabajo específicos, y aplica configuraciones personalizadas.

- **[Configurar variables de entorno][7]**:

  Activa productos definiendo variables de entorno directamente en la configuración de tu aplicación.

## Opciones avanzadas

Utiliza las siguientes opciones avanzadas para personalizar el comportamiento de la instrumentación de un solo paso en tu entorno. Estos ajustes son opcionales y normalmente solo son necesarios en configuraciones especializadas.

### Cargas de trabajo específicas del destino

Por defecto, la SSI instrumenta todos los servicios en todos los espacios de nombres de tu clúster. Según cuál sea tu versión del Agent, utiliza uno de los siguientes métodos de configuración para refinar qué servicios se instrumentan y de qué manera.

{{< tabs >}}

{{% tab "Agent v7.64 o posterior (recomendado)" %}}

Crea bloques de destino con la etiqueta (label) `targets` para especificar qué cargas de trabajo instrumentar y qué configuraciones aplicar.

Cada bloque de destino tiene las siguientes claves:

| Clave             | Descripción |
|------------------|-------------|
| `name`            | El nombre del bloque de destino. No tiene ningún efecto sobre el estado de monitorización y sólo se utiliza como metadatos. |
| `namespaceSelector` | Los espacios de nombres que se instrumentarán. Especifífcalos utilizando uno o más de:<br> - `matchNames`: Una lista de uno o más nombres de espacios de nombres. <br> - `matchLabels`: Una lista de una o más etiquetas (labels) definidas en pares `{key,value}`. <br> - `matchExpressions`: Una lista de requisitos del selector de espacios de nombres. <br><br> Los espacios de nombres deben cumplir todos los criterios para coincidir. Para obtener más información, consulta la [documentación del selector de Kubernetes][10].|
| `podSelector`     | Los pods que se instrumentarán. Especifícalos utilizando uno o más de: <br> - `matchLabels`: Una lista de una o más etiquetas (labels) definidas en pares `{key,value}`. <br> - `matchExpressions`: Una lista de requisitos del selector de pods. <br><br> Los pods deben cumplir todos los criterios para coincidir. Para obtener más información, consulta la [documentación del selector de Kubernetes][10]. |
| `ddTraceVersions` | La versión del [SDK de APM Datadog][9] a utilizar para cada lenguaje. |
| `ddTraceConfigs`  | Configuraciones del SDK de APM que permiten definir etiquetas (tags) de servicio unificadas, activar productos de Datadog más allá del rastreo y personalizar otros parámetros de APM. [Consulta la lista completa de opciones][8]. |

El archivo que necesitas configurar dependerá de cómo hayas activado la instrumentación de un solo paso:
- Si has activado la SSI con el Datadog Operator, edita `datadog-agent.yaml`.
- Si has activado la SSI con Helm, edita `datadog-values.yaml`.

**Nota**: Los destinos se evalúan en orden: la primera coincidencia tiene prioridad.

#### Ejemplos de configuraciones

Revisa los siguientes ejemplos que demuestran cómo seleccionar servicios específicos:

{{< collapse-content title="Ejemplo 1: Habilitar todos los espacios de nombres excepto uno de ellos" level="h4" >}}

Esta configuración:
- Activa APM para todos los espacios de nombres excepto el espacio de nombres `jenkins`.
  - **Nota**: Utiliza `enabledNamespaces` para deshabilitar todos los espacios de nombres excepto los mencionados.
- indica a Datadog que instrumente las aplicaciones Java con el SDK de APM Java por defecto y las aplicaciones Python con `v.3.1.0` del SDK de APM Python.

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

{{< collapse-content title="Ejemplo 2: Instrumentar un subconjunto de espacios de nombres, coincidiendo con nombres y etiquetas (labels)" level="h4" >}}

Esta configuración crea dos bloques de destino:

- El primer bloque (denominado `login-service_namespace`):
  - Activa APM para los servicios del espacio de nombres `login-service`.
  - Indica a Datadog que instrumente los servicios de este espacio de nombres con la versión por defecto del SDK de APM Java.
  - Define la variable de entorno `DD_PROFILING_ENABLED` para este grupo de destino.
- El segundo bloque (denominado `billing-service_apps`)
  - Activa APM para los servicios del espacio o espacios de nombres con la etiqueta (label) `app:billing-service`.
  - Indica a Datadog que instrumente este conjunto de servicios con `v3.1.0` del SDK de APM Python.

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
            - name: "DD_PROFILING_ENABLED"  ## la generación de perfiles está activada para todos los servicios en este espacio de nombres
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

Esta configuración hace lo siguiente:
- Activa APM para los pods con las siguientes etiquetas (labels):
  - `app:db-user`que marca los pods que ejecutan la aplicación `db-user`.
  - `webserver:routing`que marca los pods que ejecutan la aplicación `request-router`.
- Indica a Datadog que utilice las versiones por defecto de los SDK de rastreadores Datadog.
- Define variables de entorno de Datadog para aplicar a cada grupo de destino y configurar los SDK.

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
           ddTraceConfigs:   ## configuraciones de rastreo definidas para servicios en pods coincidentes
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
- Activa APM para los pods etiquetados (label) como `app:password-resolver` en el espacio de nombres `login-service`.
- Indica a Datadog que utilice la versión por defecto del SDK del rastreador Datadog.
- Define variables de entorno de Datadog que se aplicarán a este destino.

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

{{< collapse-content title="Ejemplo 5: Instrumentar un subconjunto de pods utilizando <code>matchExpressions</code>" level="h4" >}}

Esta configuración activa APM para todos los pods, excepto los que tienen alguna de las etiquetas (labels) `app=app1` o `app=app2`.

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

{{% tab "Agent <=v7.63 (Legacy)" %}}

#### Activar o desactivar la instrumentación de los espacios de nombres

Puedes elegir habilitar o deshabilitar la instrumentación para aplicaciones en espacios de nombres específicos. Sólo puedes definir espacios de nombres habilitados o espacios de nombres deshabilitados, no ambos.

El archivo que tienes que configurar depende de si has habilitado la instrumentación de un solo paso con el Datadog Operator o con Helm:

{{< collapse-content title="Datadog Operator" level="h5" >}}

Para habilitar la instrumentación para espacios de nombres específicos, añade la configuración `enabledNamespaces` a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # Añadir espacios de nombres que se van a instrumentar
           - default
           - applications
{{< /highlight >}}

Para deshabilitar la instrumentación para determinados espacios de nombres, añade la configuración `disabledNamespaces` a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         disabledNamespaces: # Añadir espacios de nombres que no se van a instrumentar
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

1. [Especificar a nivel de servicio](#specify-at-the-service-level), o bien
2. [Especificar a nivel de clúster](#specify-at-the-cluster-level).

**Por defecto**: Si no se especifica ninguna versión de biblioteca, las aplicaciones escritas en lenguajes compatibles se instrumentan automáticamente utilizando las últimas versiones de bibliotecas de rastreo.

##### Especificar a nivel de servicio

Para instrumentar automáticamente aplicaciones en pods específicos, añade la anotación de lenguaje y la versión de biblioteca adecuadas para tu aplicación en la especificación de tu pod:

| Lenguaje   | Anotación del pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<CONTAINER IMAGE TAG>"`   |

Sustituye `<CONTAINER IMAGE TAG>` por la versión de la biblioteca preferida. Las versiones disponibles se indican en los [registros de contenedores de Datadog](#change-the-default-image-registry) y en los repositorios fuente del rastreador para cada lenguaje:

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

<div class="alert alert-danger">Ten cuidado al utilizar la <code>última</code> tag (etiqueta), ya que las principales versiones de la biblioteca pueden introducir cambios de última hora.</div>

Por ejemplo, para instrumentar aplicaciones Java automáticamente:

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

##### Especificar a nivel de clúster

Si no activas la instrumentación automática para pods específicos utilizando anotaciones, puedes especificar qué lenguajes instrumentar en todo el clúster utilizando la configuración de SSI. Cuando se configura `apm.instrumentation.libVersions`, solo se instrumentan las aplicaciones escritas en los lenguajes especificados, utilizando las versiones de biblioteca especificadas.

El archivo que tienes que configurar depende de si has habilitado la instrumentación de un solo paso con el Datadog Operator o con Helm:

{{< collapse-content title="Datadog Operator" level="h5" >}}

Por ejemplo, para instrumentar aplicaciones .NET, Python, y Node.js añade la siguiente configuración a tu archivo `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Añadir las librerías y versiones que quieras configurar
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
         libVersions: # Añadir las librerías y versiones que quieras configurar
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

### Cambiar el registro de imágenes por defecto

Datadog publica imágenes de bibliotecas de instrumentación en gcr.io, Docker Hub y Amazon ECR:

| Lenguaje   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js    | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |
| PHP        | [gcr.io/datadoghq/dd-lib-php-init][30] | [hub.docker.com/r/datadog/dd-lib-php-init][31] | [gallery.ecr.aws/datadog/dd-lib-php-init][32] |

La variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` en la configuración del Datadog Cluster Agent especifica el registro utilizado por el controlador de admisión. El valor por defecto es `gcr.io/datadoghq`.

Puedes extraer la biblioteca de rastreo de un registro diferente cambiándolo por `docker.io/datadog`, `public.ecr.aws/datadog` u otra URL, si alojas las imágenes en un registro de contenedores local.

Para obtener instrucciones sobre cómo cambiar el registro de contenedores, consulta [Cambiar el registro de contenedores][33].

### Utilizar un registro de contenedores privado

Si tu organización no permite extracciones directas de registros públicos (como `gcr.io`, `docker.io` o `public.ecr.aws`), puedes alojar internamente las imágenes necesarias de Datadog y configurar el controlador de admisión para que las utilice.

Para utilizar la SSI con un registro de contenedores privado:

1. Sigue [estas instrucciones][34] para replicar las imágenes de contenedor de Datadog en tu registro privado.

   Solo necesitas las imágenes para los lenguajes que estás instrumentando. Si no estás seguro de cuáles necesitas, esta es una referencia que cubre la mayoría de los casos de uso:

   - `apm-inject`
   - `dd-lib-java-init`
   - `dd-lib-python-init`
   - `dd-lib-dotnet-init`
   - `dd-lib-php-init`
   - `dd-lib-ruby-init`
   - `dd-lib-js-init`

   Puedes encontrar estas imágenes en [gcr.io][12], [Docker Hub][13], o [Amazon ECR Public Gallery][14].

2. Etiqueta (tag) las imágenes según su configuración.

   Las versiones que reflejas deben coincidir con las versiones configuradas en tus cargas de trabajo, que pueden definirse de una de las siguientes maneras:
   - Globalmente en la configuración del Agent utilizando `ddTraceVersions`, o bien
   - Por pod, utilizando anotaciones como `admission.datadoghq.com/java-lib.version`.

   Si no se configura explícitamente ninguna versión, se utiliza la versión por defecto (`0`).

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

   Esta configuración requiere las siguientes etiquetas (tags) de imagen:
   - `apm-inject:0`
   - `dd-lib-java-init:1`
   - `dd-lib-python-init:3`

3. Actualiza la configuración del Cluster Agent para utilizar tu registro privado.

   Configura la variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` en la configuración de tu Cluster Agent para utilizar tu registro privado.

Para obtener más información sobre cómo cambiar el registro de contenedores, consulta [Cambiar el registro de contenedores][33].

### Uso de una interfaz de red de contenedores (CNI) en EKS

Cuando se utiliza una CNI como Calico, los nodos del plano de control no pueden iniciar conexiones de red con el controlador de admisión de Datadog e informan de un error "Address is not allowed".
Para utilizar la instrumentación de un solo paso, modifica el Cluster Agent de Datadog con el parámetro `useHostNetwork: true`.

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## Eliminar la instrumentación de un solo paso de tu Agent

Si no quieres recopilar datos de trazas de un determinado servicio, host, máquina virtual o contenedor, sigue los pasos que se indican a continuación:

### Eliminación de la instrumentación en servicios específicos

Para eliminar la instrumentación APM y dejar de enviar trazas desde un servicio específico, puedes realizar una de las siguientes acciones:

#### Utilizar la selección de cargas de trabajo (recomendado).

Con la selección de cargas de trabajo (disponible para el Agent v7.64 o posterior), puedes activar y desactivar el rastreo para aplicaciones específicas. [Consulta los detalles de configuración aquí](#advanced-options).

#### Uso del controlador de admisión de Datadog 

Como alternativa, o para una versión del Agent que no admite la selección de cargas de trabajo, también puedes desactivar la mutación de pods añadiendo una etiqueta (label) a tu pod.

<div class="alert alert-danger">Además de desactivar la SSI, los siguientes pasos desactivan otros webhooks mutantes. Utilízalos con precaución.</div>

1. Configura la etiqueta (label) `admission.datadoghq.com/enabled:` como `"false"` para la especificación del pod:
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

Tras activar la SSI, todos los procesos compatibles del clúster se instrumentan automáticamente y comienzan a generar trazas en cuestión de minutos.

Para controlar dónde se activa APM y reducir los gastos generales, ten en cuenta las siguientes prácticas recomendadas.

{{% collapse-content title="Uso de etiquetas (labels) opcionales para un rollout controlado de APM" level="h3" expanded=false id="id-for-anchoring" %}}

#### Instrumentación por defecto frente a instrumentación opcional
| Modo    | Comportamiento    | Cuándo utilizar |
| ---  | ----------- | ----------- |
| Valor predeterminado | Todos los procesos compatibles del clúster están instrumentados. | Pequeños clústeres o prototipos. |
| Opcional | Utiliza la [selección de cargas de trabajo][4] para restringir la instrumentación a espacios de nombres o pods específicos. | Clústeres de producción, rollouts escalonados o casos de uso sensibles a los costes. |

#### Ejemplo: Activar la instrumentación para pods específicos

1. Añade una etiqueta (label) significativa (por ejemplo, `datadoghq.com/apm-instrumentation: "enabled"`) tanto a los metadatos de despliegue como a la plantilla del pod.

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

2. En tu configuración Helm del Datadog Agent, activa la SSI y utiliza `podSelector` para inyectar solo en pods con la etiqueta (label) opcional correspondiente.

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

Para ver más ejemplos, consulta la [selección de cargas de trabajo][4].

{{% /collapse-content %}}


{{% collapse-content title="Controlar qué SDK de APM se han cargado" level="h3" expanded=false id="id-for-anchoring" %}}

Utiliza `ddTraceVersions` en tu configuración Helm del Agent para controlar el lenguaje y la versión del SDK de APM. Esto evita que se descarguen SDK innecesarios, lo que minimiza la huella del contendor de inicialización, reduce el tamaño de la imagen y permite actualizaciones más deliberadas del rastreador (por ejemplo, para cumplir con los requisitos de conformidad o simplificar la depuración).

#### Ejemplo: Especificar un SDK de APM Java para un espacio de nombres

En el espacio de nombres `login-service` solo se ejecutan aplicaciones Java. Para evitar la descarga de otros SDK, configura el Agent para que apunte a ese espacio de nombres e inyecta únicamente la versión 1.48.2 del SDK de Java.


```
targets:
  - name: login-service
    namespaceSelector:
      matchNames: ["login-service"]
    ddTraceVersions:
      java: "1.48.2"    # fijar versión
```

#### Configuración por defecto

Si un pod no coincide con ninguna regla `ddTraceVersions`, se aplica el destino por defecto.

```
targets:
  - name: default-target          # etiquetar cualquier pod *sin* uan anulación
    ddTraceVersions:
      java:   "1"   # permanecer en la v1.x más reciente
      python: "3"   # permanecer en la v3.x más reciente
      js:     "5"   # NodeJS
      php:    "1"
      dotnet: "3"
```

{{% /collapse-content %}}

## Solucionar problemas

Si tienes problemas para activar APM con SSI, consulta la [guía de resolución de problemas de la SSI][35].

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