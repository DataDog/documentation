---
aliases:
- /es/tracing/trace_collection/single-step-apm
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas de tiempo de ejecución
title: Instrumentación de un solo paso para APM
---
## Información general

La Instrumentación de un solo paso (SSI) para APM instala el Datadog Agent e [instrumenta][4] tus aplicaciones en un solo paso, sin necesidad de pasos adicionales de configuración.

## Compatibilidad

Para ver los requisitos de los lenguajes, sistemas operativos y arquitecturas compatibles, consulta [Compatibilidad de la instrumentación de un solo paso][6].

## Habilitar APM en tus aplicaciones

Si [instalas o actualizas un Datadog Agent][1] con la opción **Enable APM Instrumentation** (Habilitar la Instrumentación de APM) seleccionada, el Agent se instala y configura para habilitar APM. Esto instrumenta automáticamente tu aplicación, sin ningún paso adicional de instalación o configuración.

Los siguientes ejemplos muestran cómo funciona para cada tipo de despliegue.

{{< tabs >}}
{{% tab "Máquina virtual o host Linux" %}}

<div class="alert alert-warning">Si ya has utilizado la instrumentación de un solo paso con hosts Linux, <a href="/tracing/trace_collection/automatic_instrumentation/ssi-0-13-1">actualiza a la última versión</a>.</div>

Para un host Ubuntu:

1. Ejecuta el comando de instalación de una línea:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3,php:1" DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Sustituye `<YOUR_DD_API_KEY>` por tu [clave de API Datadog][4], `<YOUR_DD_SITE>` por tu [sitio Datadog][3] y `<AGENT_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `staging`).
   <div class="alert alert-info">Para ver más opciones, consulta <a href=#advanced-options>Opciones avanzadas</a>.</div>
2. Inicia una nueva sesión de shell.
3. Reinicia los servicios en el host o la máquina virtual.

[3]: /es/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /es/tracing/software_catalog/
[7]: https://github.com/DataDog/dd-trace-java/releases
[8]: https://github.com/DataDog/dd-trace-js/releases
[9]: https://github.com/DataDog/dd-trace-py/releases
[10]: https://github.com/DataDog/dd-trace-dotnet/releases
[11]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Docker" %}}

Para un contenedor Linux Docker:

1. Ejecuta el comando de instalación de una línea:
   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3,php:1" DD_NO_AGENT_INSTALL=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```
2. Configura el Agent en Docker:
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_DD_API_KEY> \
     -e DD_APM_ENABLED=true \
     -e DD_ENV=<AGENT_ENV> \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket \
     -v /var/run/datadog:/var/run/datadog \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   Sustituye `<YOUR_DD_API_KEY>` por tu [clave de API Datadog][5] y `<AGENT_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `staging`).
   <div class="alert alert-info">Para ver más opciones, consulta <a href=#advanced-options>Opciones avanzadas</a>.</div>
3. Reinicia los contenedores Docker.
4. [Explora la observabilidad del rendimiento de tus servicios en Datadog][6].

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /es/tracing/software_catalog/

{{% /tab %}}

{{% tab "Kubernetes (Vista previa)" %}}

Puedes habilitar APM instalando el Agent con cualquiera de las dos opciones:

- Datadog Operator
- Helm Chart Datadog

<div class="alert alert-info">La instrumentación de un solo paso no instrumenta aplicaciones en el espacio de nombres donde instalas el Datadog Agent. Se recomienda instalar el Agent en un espacio de nombres separado en tu clúster, donde no ejecutes tus aplicaciones.</div>

### Requisitos

- Kubernetes v1.20 y posterior
- [`Helm`][1] para desplegar el Datadog Operator.
- [CLI `Kubectl`][2] para instalar el Datadog Agent.

{{< collapse-content title="Instalación con el Datadog Operator" level="h4" >}}
Sigue estos pasos para habilitar la instrumentación de un solo paso en todo tu clúster con el Datadog Operator. Esto envía automáticamente trazas para todas las aplicaciones en el clúster que están escritas en lenguajes compatibles.

Para habilitar la instrumentación de un solo paso con el Datadog Operator:

1. Instala el [Datadog Operator:][36] v1.5.0 o superior con Helm:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   helm install my-datadog-operator datadog/datadog-operator
   ```
2. Crea un secreto Kubernetes para almacenar tu [clave de API][10] Datadog:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. Crea `datadog-agent.yaml` con las especificaciones de configuración del despliegue de tu Datadog Agent. La siguiente configuración es la más sencilla:
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
       tags:
         - env:<AGENT_ENV>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
     features:
       apm:
         instrumentation:
           enabled: true
           libVersions:
             java: "1"
             dotnet: "3"
             python: "2"
             js: "5"
   ```
   Sustituye `<DATADOG_SITE>` por tu [sitio Datadog][12] y `<AGENT_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `env:staging`).
   <div class="alert alert-info">Para ver más opciones, consulta <a href=#advanced-options>Opciones avanzadas</a>.</div>

4. Ejecuta el siguiente comando:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
5. Espera unos minutos a que se apliquen los cambios del Datadog Cluster Agent y reinicia tus aplicaciones.
{{< /collapse-content >}}

{{< collapse-content title="Instalación con Helm" level="h4" >}}
Sigue estos pasos para habilitar la instrumentación de un solo paso en todo tu clúster con Helm. Esto envía automáticamente trazas para todas las aplicaciones en el clúster que están escritas en lenguajes compatibles.

Para habilitar la instrumentación de un solo paso con Helm:

1. Añade el repositorio de Datadog Helm:
   ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Crea un secreto Kubernetes para almacenar tu [clave de API][10] Datadog:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. Crea `datadog-values.yaml` y añade la siguiente configuración:
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
    tags:
         - env:<AGENT_ENV>
    apm:
      instrumentation:
         enabled: true
         libVersions:
            java: "1"
            dotnet: "3"
            python: "2"
            js: "5"
   ```
   Sustituye `<DATADOG_SITE>` por tu [sitio Datadog][12] y `<AGENT_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `env:staging`).

   <div class="alert alert-info">Para ver más opciones, consulta <a href=#advanced-options>Opciones avanzadas</a>.</div>

4. Ejecuta el siguiente comando:
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Espera unos minutos a que se apliquen los cambios del Datadog Cluster Agent y reinicia tus aplicaciones.

{{< /collapse-content >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /es/getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[36]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator

{{% /tab %}}{{< /tabs >}}

Una vez completados estos pasos, puede que desees activar [métricas de tiempo de ejecución][2] o ver los datos de observabilidad de tu aplicación en el [Catálogo de software][3].

## Opciones avanzadas

Cuando ejecutas el comando de instalación de una línea, hay algunas opciones disponibles para personalizar tu experiencia:

{{< tabs >}}
{{% tab "Máquina virtual o host Linux" %}}

### `DD_APM_INSTRUMENTATION_LIBRARIES`: personalizar bibliotecas de APM

Por defecto, las bibliotecas de Datadog APM para Java, Python, Ruby, Node.js y .NET Core se instalan cuando se establece `DD_APM_INSTRUMENTATION_ENABLED`. `DD_APM_INSTRUMENTATION_LIBRARIES` se utiliza para anular qué bibliotecas se instalan. El valor es una cadena separada por comas de pares de nombres y versiones de biblioteca separados por dos puntos.

Valores de ejemplo para `DD_APM_INSTRUMENTATION_LIBRARIES`:

- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1"`: instala sólo la biblioteca de Datadog APM para Java fijada a la línea de lanzamiento de la versión principal 1.
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2"`: instala sólo las bibliotecas de Datadog APM para Java y Python fijadas a las versiones principales 1 y 2 respectivamente.
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1.38.0,python:2.10.5"`: instala sólo las bibliotecas de Datadog APM para Java y Python fijadas a las versiones específicas 1.38.0 y 2.10.5 respectivamente.


Las versiones disponibles figuran en los repositorios fuentes de cada lenguaje:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)
- [PHP][13] (`php`)


[2]: /es/agent/remote_config
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases

{{% /tab %}}

{{% tab "Docker" %}}


### `DD_APM_INSTRUMENTATION_LIBRARIES`: personaliza bibliotecas de APM

Por defecto, las bibliotecas de Datadog APM para Java, Python, Ruby, Node.js y .NET Core se instalan cuando se establece `DD_APM_INSTRUMENTATION_ENABLED`. `DD_APM_INSTRUMENTATION_LIBRARIES` se utiliza para anular qué bibliotecas se instalan. El valor es una cadena separada por comas de pares de nombres y versiones de biblioteca separados por dos puntos.

Valores de ejemplo para `DD_APM_INSTRUMENTATION_LIBRARIES`:

- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1"`: instala sólo la biblioteca de Datadog APM para Java fijada a la línea de lanzamiento de la versión principal 1.
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2"`: instala sólo las bibliotecas de Datadog APM para Java y Python fijadas a las versiones principales 1 y 2 respectivamente.
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1.38.0,python:2.10.5"`: instala sólo las bibliotecas de Datadog APM para Java y Python fijadas a las versiones específicas 1.38.0 y 2.10.5 respectivamente.


Las versiones disponibles figuran en los repositorios fuentes de cada lenguaje:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)
- [PHP][13] (`php`)


[5]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Kubernetes (Vista previa)" %}}

### Habilitar o deshabilitar la instrumentación para espacios de nombres

Puedes elegir habilitar o deshabilitar la instrumentación para aplicaciones en espacios de nombres específicos. Sólo puedes definir espacios de nombres habilitados o espacios de nombres deshabilitados, no ambos.

El archivo que tienes que configurar depende de si has habilitado la instrumentación de un solo paso con el Datadog Operator o con Helm:

{{< collapse-content title="Datadog Operator" level="h4" >}}

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

{{< collapse-content title="Helm" level="h4" >}}

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

### Especificación de versiones de bibliotecas de rastreo

<div class="alert alert-info">A partir del Datadog Cluster Agent v7.52.0 o superior, puedes instrumentar automáticamente un subconjunto de tus aplicaciones, basándose en las bibliotecas de rastreo que especifiques.</div>

Especifica bibliotecas de rastreo de Datadog y sus versiones para instrumentar automáticamente las aplicaciones escritas en esos lenguajes. Puedes configurarlo de dos maneras, que se aplican en el siguiente orden de precedencia:

1. [Especificarlas a nivel del servicio](#specifying-at-the-service-level) o bien
2. [Especificarlas a nivel del clúster](#specifying-at-the-cluster-level).

**Por defecto**: Si no especificas ninguna versión de biblioteca y`apm.instrumentation.enabled=true`, las aplicaciones escritas en los lenguajes soportados se instrumentan automáticamente utilizando las últimas versiones de bibliotecas de rastreo.

#### Especificación a nivel del servicio 

Para instrumentar automáticamente aplicaciones en pods específicos, añade la anotación de lenguaje y la versión de biblioteca adecuadas para tu aplicación en la especificación de tu pod:

| Lenguaje   | Anotación del pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |

Sustituye `<CONTAINER IMAGE TAG>` por la versión de biblioteca deseada. Las versiones disponibles se enumeran en los [registros de contenedores de Datadog](#container-registries) y en los repositorios de orígenes de rastreadores para cada lenguaje:

- [Java][31]
- [Node.js][32]
- [Python][33]
- [.NET][34]
- [Ruby][35]

<div class="alert alert-warning">Ten cuidado al utilizar la <code>última</code> etiqueta (tag), ya que las mayores versiones de bibliotecas pueden introducir cambios de última hora.</div>

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

#### Especificación a nivel del clúster 

Si no habilitas la instrumentación automática para pods específicos utilizando las anotaciones, puedes especificar qué lenguajes instrumentar en todo el clúster utilizando la configuración de la instrumentación de un solo paso. Cuando se define `apm.instrumentation.libVersions`, sólo se instrumentan las aplicaciones escritas en los lenguajes especificados, utilizando las versiones de biblioteca especificadas.

El archivo que tienes que configurar depende de si has habilitado la instrumentación de un solo paso con el Datadog Operator o con Helm:

{{< collapse-content title="Datadog Operator" level="h4" >}}

Por ejemplo, para instrumentar aplicaciones .NET, Python, y Node.js añade la siguiente configuración a tu archivo `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "3.2.0"
            python: "1.20.6"
            js: "4.17.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

Por ejemplo, para instrumentar aplicaciones .NET, Python, y Node.js añade la siguiente configuración a tu archivo `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-8" >}}
   datadog:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "3.2.0"
            python: "1.20.6"
            js: "4.17.0"
{{< /highlight >}}

{{< /collapse-content >}}


#### Registros de contenedores

Datadog publica imágenes de bibliotecas de instrumentación en gcr.io, Docker Hub y Amazon ECR:

| Lenguaje   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js  | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |

La variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` en la configuración del Datadog Cluster Agent especifica el registro utilizado por el controlador de admisión. El valor por defecto es `gcr.io/datadoghq`.

Puedes extraer la biblioteca de rastreo de un registro diferente cambiándolo por `docker.io/datadog`, `public.ecr.aws/datadog` u otra URL, si alojas las imágenes en un registro de contenedores local.

Para obtener instrucciones sobre cómo cambiar el registro de contenedores, consulta [Para cambiar tu registro de contenedores][30].

[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/getting_started/site/
[5]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[6]: /es/getting_started/site
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
[30]: /es/containers/guide/changing_container_registry/
[31]: https://github.com/DataDog/dd-trace-java/releases
[32]: https://github.com/DataDog/dd-trace-js/releases
[33]: https://github.com/DataDog/dd-trace-py/releases
[34]: https://github.com/DataDog/dd-trace-dotnet/releases
[35]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}
{{< /tabs >}}

## Eliminar la instrumentación de un solo paso APM de tu Agent

Si no quieres recopilar datos de trazas de un determinado servicio, host, máquina virtual o contenedor, sigue los pasos que se indican a continuación:

### Eliminación de la instrumentación para servicios específicos

Para eliminar la instrumentación APM y dejar de enviar trazas desde un servicio específico, sigue estos pasos:

{{< tabs >}}
{{% tab "Máquina virtual o host Linux" %}}

1. Añade la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio de servicio:

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicia el servicio.

{{% /tab %}}

{{% tab "Docker" %}}

1. Añade la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio de servicio:
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicia el servicio.
{{% /tab %}}

{{% tab "Kubernetes" %}}

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

{{% /tab %}}
{{< /tabs >}}

### Eliminación de APM para todos los servicios en la infraestructura

Para dejar de producir trazas, desinstala APM y reinicia la infraestructura:

{{< tabs >}}
{{% tab "Máquina virtual o host Linux" %}}

1. Ejecuta:
   ```shell
   dd-host-install --uninstall
   ```
2. Reinicia los servicios en el host o la máquina virtual.

{{% /tab %}}

{{% tab "Docker" %}}

1. Ejecuta:
   ```shell
   dd-container-install --uninstall
   ```
2. Reinicia Docker:
   ```shell
   systemctl restart docker
   ```
   O utiliza el equivalente para tu entorno.

{{% /tab %}}

{{% tab "Kubernetes" %}}

El archivo que tienes que configurar depende de si has habilitado la instrumentación de un solo paso con el Datadog Operator o con Helm:

{{< collapse-content title="Datadog Operator" level="h4" >}}

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
{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

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
{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

### La instrumentación de paso único no surte efecto

La instrumentación de paso único se desactiva automáticamente cuando detecta [instrumentación personalizada][7] en tu aplicación. Si deseas utilizar SSI, tendrás que:

1. Eliminar cualquier código personalizado de instrumentación existente.
1. Reiniciar tu aplicación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/tracing/metrics/runtime_metrics/
[3]: /es/tracing/software_catalog/
[4]: /es/tracing/glossary/#instrumentation
[5]: /es/containers/cluster_agent/admission_controller/
[6]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility
[7]: /es/tracing/trace_collection/custom_instrumentation/