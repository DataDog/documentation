---
algolia:
  tags:
  - Instrumentación automática de APM
further_reading:
- link: /tracing/glossary/
  tag: Documentación
  text: Términos y conceptos de APM
kind: documentación
title: Instrumentación automática
---

## Información general

La instrumentación automática te permite crear tramos (spans) automáticamente para tu aplicación. También te permite capturar datos de observabilidad de una amplia gama de operaciones estándar y marcos de trabajo populares con una intervención manual mínima. Puedes instrumentar automáticamente tu aplicación cuando instales el Datadog Agent con la [instrumentación en un solo paso][5] o cuando [añadas manualmente bibliotecas de rastreo de Datadog][6] a tu código.

## Casos de uso

Algunas situaciones en las que se puede utilizar la instrumentación automática son:

- Captura de datos esenciales de observabilidad en bibliotecas y lenguajes comunes con una configuración mínima.
- Habilitación de la monitorización en tiempo real con parámetros preconfigurados para obtener información inmediata sobre el rendimiento de las aplicaciones.
- Simplificación de la configuración de la observabilidad para proyectos en los que no se requiere una [instrumentación personalizada][7].

## Para empezar

Para obtener más información, consulta la documentación correspondiente a su estrategia de instrumentación automática:

{{< tabs >}}
{{% tab "Single Step Instrumentation (Beta)" (Instrumentación en un solo paso (Beta)) %}}

Si instalas o actualizas un Datadog Agent con la opción **Habilitar la instrumentación APM (Beta)** seleccionada, el Agent se instala y configura para habilitar APM. Esto te permite instrumentar automáticamente tu aplicación, sin la necesidad de ningún paso adicional de instalación o configuración.

Para empezar, consulta la documentación de [instrumentación en un solo paso][1].

[1]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm

{{% /tab %}}

{{% tab "Datadog libraries" (Bibliotecas de Datadog) %}}

Para instrumentar automáticamente tu aplicación con bibliotecas de Datadog:

1. [Instala y configura el Agent](#install-and-configure-the-agent).
2. [Añade la biblioteca de rastreo de Datadog a tu código](#instrument-your-application).

### Instalación y configuración del Agent

Instala y configura el Datadog Agent para recibir trazas de tu aplicación instrumentada. Por defecto, el Datadog Agent está configurado para recibir trazas (traces) en tu archivo `datadog.yaml` bajo `apm_config` con `enabled: true` y escucha datos de rastreo en `http://localhost:8126`.

En el caso de los entornos contenedorizados, sigue los siguientes enlaces para activar la recopilación de trazas en el Datadog Agent.

#### Contenedores

1. Configura `apm_non_local_traffic: true` en la sección `apm_config` de tu principal [archivo de configuración de `datadog.yaml`][1].
2. Consulta las instrucciones específicas de configuración para asegurarte de que el Agent está configurado para recibir trazas en un entorno contenedorizado:

{{< partial name="apm/apm-containers.html" >}}

</br>

3. El cliente de rastreo intenta enviar trazas al socket de dominio Unix `/var/run/datadog/apm.socket` por defecto. Si el socket no existe, las trazas se envían a `http://localhost:8126`.

   Si se requiere un socket, host o puerto diferente, utiliza la variable de entorno`DD_TRACE_Agent_URL`. Por ejemplo:

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket

   ```

   De forma similar, el cliente de rastreo intenta enviar estadísticas al socket de dominio Unix `/var/run/datadog/dsd.socket`. Si el socket no existe, las estadísticas se envían a `http://localhost:8125`.

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Define `DD_SITE` en el Datadog Agent como {{< region-param key="dd_site" code="true" >}} para garantizar que el Agent envíe datos a la localización correcta de Datadog.

{{< /site-region >}}

#### AWS Lambda

Para configurar Datadog APM en AWS Lambda, consulta la documentación sobre el [rastreo de funciones serverless][9].

#### Otros entornos

El rastreo está disponible para varios otros entornos, como [Heroku][10], [Cloud Foundry][11], [AWS Elastic Beanstalk][12] y [servicio Azure App][13].

Para otros entornos, consulta la documentación sobre [integraciones][5] para el entorno correspondiente. Si tienes problemas con la configuración, [ponte en contacto con el servicio de asistencia de Datadog][6].

### Instrumentación de tu aplicación

Configura tu aplicación para enviar trazas utilizando una de los siguientes bibliotecas de rastreo oficiales de Datadog:

{{< partial name="apm/apm-languages.html" >}}

<br>

Para instrumentar una aplicación escrita en un lenguaje que no tiene compatibilidad con la biblioteca oficial, consulta la lista de [bibliotecas de rastreo comunitarias][1].

[1]: /es/developers/community/libraries/#apm-tracing-client-libraries
[8]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /es/tracing/serverless_functions/
[10]: /es/agent/basic_agent_usage/heroku/#installation
[11]: /es/integrations/cloud_foundry/#trace-collection
[12]: /es/integrations/amazon_elasticbeanstalk/
[13]: /es/infrastructure/serverless/azure_app_services/#overview
[14]: /es/integrations/
[15]: /es/help/
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[2]: /es/tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /es/tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm
[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /es/tracing/trace_collection/custom_instrumentation/