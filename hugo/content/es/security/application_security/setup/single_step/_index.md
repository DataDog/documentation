---
aliases:
- /es/security/application_security/threats/setup/single_step
external_redirect: /security/application_security/threats/threat_detection/
title: La activación de la detección y protección de amenazas de la AAP en un solo
  step (UI) / paso (generic) de instrumentación
---

<div class="alert alert-info">La activación de la detección y protección frente a amenazas de la AAP en un solo step (UI) / paso (generic) de instrumentación está en vista previa.</div>

## Requisitos

- **Versión mínima del Agent: 7.53.0**
- **Versión mínima de Helm: 3.62.0** (para los despliegues de Kubernetes)
- **Lenguajes y arquitecturas**: La instrumentación de AAP de un solo step (UI) / paso (generic) sólo admite el rastreo de servicios de Java, Python, Node.js y .NET Core en las arquitecturas `x86_64` y `arm64`.
- **Sistemas operativos**: máquinas virtuales Linux (Debian, Ubuntu, Amazon Linux, CentOS/Red Hat, Fedora), Docker, clústeres de Kubernetes con contenedores Linux.

## Habilitación en un paso

Si [instalas o actualizas un Datadog Agent][1] con la opción **Habilitar protección frente a amenazas (nuevo)** seleccionada, el Agent se instala y configura para habilitar AAP. Esto te permite instrumentar automáticamente tu aplicación, sin ningún step (UI) /paso (generic) adicional de instalación o configuración. Reinicia los servicios para que esta instrumentación surta efecto.


{{< img src="/security/application_security/single_step/asm_single_step_threat_detection_2.png" alt="Configuración de la cuenta: página de configuración de Ubuntu que resalta la alternancia para la habilitación de la instrumentación y protección ante amenazas de APM." style="width:100%;" >}}

Los siguientes ejemplos muestran cómo funciona en cada tipo de infraestructura.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

Con un solo comando, puedes instalar, configurar e iniciar el Agent, al tiempo que instrumentas tus servicios con AAP.

Para un host Ubuntu:

1. Ejecuta el comando de instalación de una línea:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3,js:5,dotnet:3,php:1" DD_APPSEC_ENABLED=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   a. Sustituye `<YOUR_DD_API_KEY>` por tu [clave de API de Datadog][4].

   b. Sustituye `<YOUR_DD_SITE>` por tu [sitio de Datadog][3].
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-linux">Specifying tracing library versions.</a></li>
         <li><a href="#env-linux">Tagging observability data by environment.</a></li>
      </ul>
   </div>
2. Sal de la sesión de shell actual.
3. Inicia una nueva sesión de shell.
4. Reinicia los servicios en el host o la máquina virtual.
5. [Explora la observabilidad del rendimiento de tus servicios en Datadog][5].

**Nota:** Para configurar un solo step (UI) / paso (generic) para la protección contra amenazas de AAP, añade la variable de entorno `DD_APPSEC_ENABLED=true` a tu comando de instalación de una línea.

### Especificación de las versiones de librería de rastreo {#lib-linux}

En forma predeterminada, al activar APM en tu servidor se instala la compatibilidad con los servicios de Java, Python, Node.js y .NET Core. Si sólo tienes servicios implementados en algunos de estos lenguajes, configura `DD_APM_INSTRUMENTATION_LIBRARIES` en tu comando de instalación de una línea:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APPSEC_ENABLED=true DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Opcionalmente, puedes proporcionar un número de versión para la librería de rastreo colocando dos puntos después del nombre del leguaje y especificando la versión de la librería de rastreo. Si no especificas una versión, se utilizará por defecto la versión más reciente. Los nombres de lenguaje están separados por comas.

Los lenguajes admitidos son:

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- PHP (`php`)

**Nota**: Para la librería de rastreo Node.js, diferentes versiones de Node.js son compatibles con diferentes versiones de la librería de rastreo Node.js. Consulta [DataDog/dd-trace-js: Rastreador de JavaScript APM][6] para obtener más información.

### Etiquetado de datos de observabilidad por entorno {#env-linux}

Establece `DD_ENV` en tu comando de instalación de una línea para Linux a fin de etiquetar automáticamente los servicios instrumentados y otra telemetría que pase a través del Agent con un entorno específico. Por ejemplo, si el Agent está instalado en tu entorno de staging, configura `DD_ENV=staging` para asociar tus datos de observabilidad con `staging`.

Por ejemplo:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3,js:5,dotnet:3,php:1" DD_APPSEC_ENABLED=true DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

[2]: /es/tracing/guide/remote_config
[3]: /es/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /es/software_catalog/
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance

{{% /tab %}}

{{% tab "Docker" %}}

Para un contenedor Linux Docker:

1. Instala el inyector de librería:
   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3,js:5,dotnet:3,php:1" DD_NO_AGENT_INSTALL=true DD_APPSEC_ENABLED=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```
2. Configura el Agent en Docker:
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=${YOUR_DD_API_KEY} \
     -e DD_APM_ENABLED=true \
     -e DD_APPSEC_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   Sustituye `<YOUR_DD_API_KEY>` por tu [API de Datadog][5].
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-docker">Specifying tracing library versions.</a></li>
         <li><a href="#env-docker">Tagging observability data by environment.</a></li>
      </ul>
   </div>
3. Reinicia los contenedores Docker.
4. [Explora la observabilidad del rendimiento de tus servicios en Datadog][6].

### Especificación de las versiones de librería de rastreo  {#lib-docker}

Por defecto, la habilitación de APM en tu servidor instala el soporte para los servicios Java, Python, Node.js, y .NET. Si solo tienes servicios implementados en algunos de estos lenguajes, configura `DD_APM_INSTRUMENTATION_LIBRARIES` cuando ejecutes el script de instalación.

Por ejemplo, para instalar el soporte únicamente para la versión v1.25.0 de la librería de rastreo Java y la última versión de la librería de rastreo Python, añade lo siguiente al comando de instalación:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_APM_INSTRUMENTATION_ENABLED=docker DD_NO_AGENT_INSTALL=true DD_APPSEC_ENABLED=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Opcionalmente, puedes proporcionar un número de versión para la librería de rastreo colocando dos puntos después del nombre del leguaje y especificando la versión de la librería de rastreo. Si no especificas una versión, se utilizará por defecto la versión más reciente. Los nombres de lenguaje están separados por comas.

Los lenguajes admitidos son:

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- Ruby (`ruby`)
- PHP (`php`)

**Nota**: Para la librería de rastreo Node.js, diferentes versiones de Node.js son compatibles con diferentes versiones de la librería de rastreo Node.js. Consulta [DataDog/dd-trace-js: Rastreador de JavaScript APM][7] para obtener más información.

### Etiquetado de datos de observabilidad por entorno {#env-docker}

Establece `DD_ENV` en el comando de instalación del inyector de librería para que Docker etiquete automáticamente los servicios instrumentados y otra telemetría que pase por el Agent con un entorno específico. Por ejemplo, si el Agent está instalado en tu entorno de staging, configura `DD_ENV=staging` para asociar los datos de observabilidad con `staging`.

Por ejemplo:

{{< highlight shell "hl_lines=5" >}}
docker run -d --name dd-agent \
  -e DD_API_KEY=${YOUR_DD_API_KEY} \
  -e DD_APM_ENABLED=true \
  -e DD_APPSEC_ENABLED=true \
  -e DD_ENV=staging \
  -e DD_APM_NON_LOCAL_TRAFFIC=true \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
  -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
  -v /opt/datadog/apm:/opt/datadog/apm \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  gcr.io/datadoghq/agent:7
{{< /highlight >}}

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /es/software_catalog/
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance


{{% /tab %}}

{{% tab "Kubernetes" %}}

Puedes habilitar APM instalando el Agent con el Datadog Helm chart. Esto despliega el Datadog Agent a través de todos los nodos en el clúster de Kubernetes basado en Linux con un DaemonSet.

**Nota**: La instrumentación de un solo paso no instrumenta aplicaciones en el espacio de nombres donde se instala el Datadog Agent. Se recomienda instalar el Agent en un espacio de nombres separado en un clúster donde no ejecutes tus aplicaciones.

### Requisitos

- Asegúrate de tener instalado [Helm][13].

### Instalación

Para habilitar la instrumentación de un solo paso con Helm:

1. Añade el repositorio de Datadog Helm:

    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Crea un secreto de Kubernetes para almacenar la [clave de API][10] de Datadog:

   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
[7]: https://v3.helm.sh/docs/intro/install/
[8]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /es/getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[14]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[15]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#enabling-or-disabling-instrumentation-for-namespaces
[16]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#specifying-tracing-library-versions
[17]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#removing-instrumentation-for-specific-services
{{% /tab %}}
{{< /tabs >}}
## Eliminación de la instrumentación de APM y AAP de un solo step (UI) / paso (generic) de tu Agent
Si no deseas recopilar datos de trazas (traces) para un determinado servicio, host, máquina virtual o contenedor, completa los siguientes pasos:
### Eliminación de la instrumentación para servicios específicos
Ejecuta los siguientes comandos y reinicia el servicio para dejar de inyectar la librería en el servicio y dejar de producir traces (trazas) de ese servicio.
{{< tabs >}}
{{% tab "Linux host or VM" %}}
1. Añade la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio de servicio:
   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicia el servicio.
3. Para desactivar AAP, elimina la variable de entorno `DD_APPSEC_ENABLED=true` de la configuración de tu aplicación y reinicia tu servicio.
{{% /tab %}}
{{% tab "Docker" %}}
1. Añade la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio de servicio:
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicia el servicio.
3. Para desactivar AAP, elimina la variable de entorno `DD_APPSEC_ENABLED=true` de la configuración de tu aplicación y reinicia tu servicio.
{{% /tab %}}
{{% tab "Kubernetes" %}}
1. Establece la etiqueta `admission.datadoghq.com/enabled:` en `"false"` para la especificación del pod:
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
{{% /tab %}}
{{< /tabs >}}
### Eliminación de APM para todos los servicios en la infraestructura
Para dejar de producir trazas, retira los inyectores de librería y reinicia la infraestructura:
{{< tabs >}}
{{% tab "Linux host or VM" %}}
1. Ejecuta:
   ```shell
   dd-host-install --uninstall
   ```
2. Reinicia el host.
{{% /tab %}}
{{% tab "Docker" %}}
1. Desinstala la inyección de librería local:
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
1. En `apm:`, elimina `instrumentation:` y toda la configuración siguiente en `datadog-values.yaml`.
2. En `asm:`, elimina `threats:` y toda la configuración siguiente en `datadog-values.yaml`.
3. Ejecuta el siguiente comando:
   ```bash
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
{{% /tab %}}
{{< /tabs >}}
[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/tracing/guide/remote_config
