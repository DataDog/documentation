---
further_reading:
- link: /tracing
  tag: Documentación
  text: Más información sobre APM
- link: /error_tracking/guides/enable_infra
  tag: Guía
  text: Activar la monitorización de infraestructuras
title: Activar APM
---

[Datadog Application Performance Monitoring (APM)][1] proporciona una gran visibilidad de tus aplicaciones, lo que te permite identificar cuellos de botella en el rendimiento, solucionar problemas y optimizar tus servicios. Esta guía explica cómo actualizar la configuración del Datadog Agent para activar APM y aprovechar sus funciones además del seguimiento de errores de backend independiente.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

Si tu Agent está desplegado en un host Linux, la actualización de la configuración depende del método que hayas utilizado para instalar el Agent.

{{< collapse-content title="Instrumentación de un solo paso" level="h5" >}}
Para un Datadog Agent instalado con el comando de instalación de una línea:

1. Abre el [archivo de configuración datadog.yaml][2].
2. Elimina los atributos `enable_payloads` y `error_tracking_standalone`:

   ```diff
   - # Configuration to prevent sending metric data so that hosts don't show up in Datadog.
   - enable_payloads:
   -   series: false
   -   events: false
   -   service_checks: false
   -   sketches: false

     # Configuration to enable the collection of errors so they show up in Error Tracking.
     apm_config:
       enabled: true
   -   error_tracking_standalone:
   -     enabled: true
   ```

3. [Reinicia el Agent][3].
   {{< /collapse-content >}}

{{< collapse-content title="Using Datadog tracing libraries" level="h5" >}}
Para un Datadog Agent configurado manualmente para el Seguimiento de errores de backend:

1. Abre el [archivo de configuración datadog.yaml][2].
2. Elimina los atributos `core_agent` y `error_tracking_standalone`:

   ```diff
   - core_agent:
   -   enabled: false
     apm_config:
   +   enabled: true
   -   error_tracking_standalone:
   -     enabled: true
   ```

3. [Reinicia el Agent][3].
   {{< /collapse-content >}}

[2]: /es/agent/configuration/agent-configuration-files
[3]: /es/agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Kubernetes" %}}

Si tu Agent está desplegado en Kubernetes, necesitas actualizar su configuración en Datadog Operator o Helm dependiendo del método que hayas utilizado para instalar el Agent.

{{< collapse-content title="Helm" level="h5" >}}
Para un Datadog Agent instalado con Helm:

1. Actualiza tu archivo `datadog-values.yaml`, sustituyendo los valores `site` y `env` adecuadamente:

   ```diff
     agents:
       containers:
         agent:
           env:
             [...]
   -         - name: DD_CORE_AGENT_ENABLED
   -           value: "false"
     datadog:
   -   processAgent:
   -     enabled: false
   -     containerCollection: false
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     tags:
       - env:<AGENT_ENV>
     apm:
   -   errorTrackingStandalone:
   -     enabled: true
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

2. Una vez realizados los cambios, actualiza tu Datadog Helm chart:
   ```shell
   helm upgrade -f datadog-values.yaml datadog-agent datadog/datadog
   ```
{{< /collapse-content >}}

{{< collapse-content title="Datadog Operator" level="h5" >}}
Para un Datadog Agent instalado con el Datadog Operator:

1. Actualiza tu archivo `datadog-agent.yaml`, sustituyendo los valores `site` y `env` adecuadamente:
   ```diff
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
   -       - name: DD_CORE_AGENT_ENABLED
   -         value: "false"
       features:
         apm:
   -       errorTrackingStandalone:
   -         enabled: true
           instrumentation:
             enabled: true
             libVersions:
               java: "1"
               dotnet: "3"
               python: "2"
               js: "5"
               php: "1"
   ```
2. Despliega el Datadog Agent con el archivo de configuración actualizado:
   ```shell
   kubectl apply -f path/to/your/datadog-agent.yaml
   ```
{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

[1]: /es/tracing