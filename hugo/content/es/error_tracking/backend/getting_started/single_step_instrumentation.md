---
aliases:
- /es/error_tracking/standalone_backend/getting_started/single_step_instrumentation
further_reading:
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de problemas y flujos de trabajo de Error Tracking
- link: /error_tracking/explorer
  tag: Documentación
  text: Más información sobre el Explorador de seguimiento de errores
- link: /error_tracking/guides/enable_infra
  tag: Guía
  text: Activar la monitorización de infraestructuras
- link: /error_tracking/guides/enable_apm
  tag: Guía
  text: Activar APM
title: Instrumentación de un solo paso para el seguimiento de errores de backend
---

## Información general

Instala o actualiza el Datadog Agent con las opciones **Habilitar la Instrumentación APM** y **Seguimiento de errores independiente** para habilitar el seguimiento de errores de backend independiente.
Esta acción te permite instrumentar automáticamente tu aplicación, sin ningún paso adicional de instalación o configuración.

## Instalar el Seguimiento de errores de backend independiente

Los siguientes ejemplos muestran cómo funciona para cada tipo de despliegue.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

Para un host Linux:

1. Ejecuta el comando de instalación de una línea:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3,php:1" DD_APM_ERROR_TRACKING_STANDALONE=true DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Sustituye `<YOUR_DD_API_KEY>` por tu [clave de API Datadog][1], `<YOUR_DD_SITE>` por tu [sitio Datadog][2] y `<AGENT_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `staging`).
2. Reinicia los servicios en el host o la máquina virtual.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site/

{{% /tab %}}

{{% tab "Kubernetes" %}}

Puedes activar el Seguimiento de errores de backend instalando el Agent con cualquiera de las dos opciones:

- Datadog Operator
- Helm Chart Datadog

<div class="alert alert-info">La Instrumentación de un solo paso no instrumenta aplicaciones en el espacio de nombres donde instalas el Datadog Agent. Se recomienda instalar el Agent en un espacio de nombres separado en tu clúster, donde no ejecutes tus aplicaciones.</div>

### Requisitos

- Kubernetes v1.20 y posterior
- [Helm][3] para desplegar el Datadog Operator.
- [CLI de Kubectl][4] para instalar el Agent.

{{< collapse-content title="Instalación con el Datadog Operator" level="h4" >}}
Sigue los pasos a continuación para habilitar la Instrumentación de un solo paso en todo tu clúster utilizando el Datadog Operator. Esto permite el rastreo en todas las aplicaciones escritas en lenguajes compatibles.


1. Instala el [Datadog Operator][7] v1.14.0 o posterior con Helm:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   helm install my-datadog-operator datadog/datadog-operator
   ```
2. Crea un secreto de Kubernetes para almacenar tu [clave de API][5] Datadog:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY>
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
       env:
         - name: DD_CORE_AGENT_ENABLED
           value: "false"
     features:
       apm:
         errorTrackingStandalone:
           enabled: true
         instrumentation:
           enabled: true
           libVersions:
             java: "1"
             dotnet: "3"
             python: "2"
             js: "5"
             php: "1"
   ```
   Sustituye `<DATADOG_SITE>` por tu [sitio Datadog][6] y `<AGENT_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `env:staging`).
4. Ejecuta el siguiente comando:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
5. Espera unos minutos a que se apliquen los cambios del Datadog Cluster Agent y reinicia tus aplicaciones.
{{< /collapse-content >}}

{{< collapse-content title="Installing with Helm" level="h4" >}}
Sigue los pasos a continuación para habilitar la Instrumentación de un solo paso en todo tu clúster utilizando Helm. Esto permite el rastreo en todas las aplicaciones escritas en lenguajes compatibles.


1. Añade el repositorio de Datadog Helm:
   ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Crea un secreto de Kubernetes para almacenar tu [clave de API][5] Datadog:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY>
   ```
3. Crea `datadog-values.yaml` y añade la siguiente configuración:
   ```yaml
   agents:
     containers:
       agent:
         env:
           - name: DD_CORE_AGENT_ENABLED
             value: "false"
   datadog:
     processAgent:
       enabled: false
       containerCollection: false
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     tags:
       - env:<AGENT_ENV>
     apm:
       errorTrackingStandalone:
         enabled: true
       # Required to enable Single-Step Instrumentation
       instrumentation:
         enabled: true
         libVersions:
           java: "1"
           dotnet: "3"
           python: "2"
           js: "5"
           php: "1"
   ```
   Sustituye `<DATADOG_SITE>` por tu [sitio Datadog][6] y `<AGENT_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `env:staging`).
4. Ejecuta el siguiente comando para desplegar el Agent:
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Espera unos minutos a que se apliquen los cambios del Datadog Cluster Agent y reinicia tus aplicaciones.

{{< /collapse-content >}}

[3]: https://v3.helm.sh/docs/intro/install/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /es/getting_started/site/
[7]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}