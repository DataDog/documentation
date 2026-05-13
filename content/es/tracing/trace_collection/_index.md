---
algolia:
  tags:
  - apm automatic instrumentation
aliases:
- /es/tracing/setup
- /es/tracing/send_traces/
- /es/tracing/setup/
- /es/tracing/environments/
- /es/tracing/setup/environment
- /es/tracing/setup/first_class_dimensions
- /es/tracing/getting_further/first_class_dimensions/
- /es/agent/apm/
- /es/tracing/setup_overview/
- /es/tracing/trace_collection/library_injection_remote
- /es/tracing/trace_collection/automatic_instrumentation
description: Comienza con Datadog APM
further_reading:
- link: tracing/trace_collection/compatibility
  tag: Documentación
  text: Requisitos de compatibilidad
- link: /tracing/glossary/
  tag: Documentación
  text: Términos y conceptos de APM
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: Blog
  text: Habilita visibilidad de extremo a extremo en tus aplicaciones Java con un
    solo comando
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Centro de arquitectura
  text: Instrumenta tu aplicación utilizando el Datadog Operator y el Controlador
    de Admisión
title: Instrumentación de aplicaciones
---
## Descripción general {#overview}
Aplicación {{< tooltip glossary="instrumentación" >}} con Datadog APM implica:

1. **Configuración del SDK**: Agregar un SDK de Datadog a tu aplicación.
2. **Creación de tramos**: Capturando datos de observabilidad como {{< tooltip glossary="tramo" >}}s.

   Los tramos se generan automáticamente por defecto tan pronto como se carga el SDK. Esto se conoce como **auto-instrumentación** y proporciona visibilidad suficiente para la mayoría de los usuarios. Si necesitas más control, puedes agregar tramos personalizados opcionalmente.

**Nota**: Estos pasos asumen que tienes un [Agente de Datadog][5] instalado y configurado para recibir trazas.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="La canalización de APM">}}

## Comenzando {#getting-started}

<div class="alert alert-info">
<strong>¿Prefieres una instrumentación neutra respecto a los proveedores?</strong> Consulta la <a href="/opentelemetry/">documentación de OpenTelemetry</a> para usar OpenTelemetry con Datadog.
</div>

### Instrumentación de un solo paso (recomendada) {#single-step-instrumentation-recommended}

[Instrumentación de un solo paso][1] (SSI) instala y configura automáticamente los SDK de Datadog con un solo comando. La auto-instrumentación comienza inmediatamente a capturar trazas de tus frameworks y bibliotecas soportados, sin necesidad de cambios en el código.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/single-step-apm/" >}}Comienza con la Instrumentación de un solo paso{{< /nextlink >}}
{{< /whatsnext >}}

### Configuración manual y tramos personalizados {#manual-setup-and-custom-spans}

A medida que tus necesidades de observabilidad crecen, puedes agregar más control y personalización:

**Para un control completo de la configuración del SDK:** Usa [SDKs de Datadog gestionados manualmente][2] si necesitas un control granular sobre el comportamiento y la configuración del SDK.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dd_libraries/" >}}Usa SDKs de Datadog gestionados manualmente{{< /nextlink >}}
{{< /whatsnext >}}

**Para tramos personalizados sin cambios en el código:** Usa [Instrumentación Dinámica][4] para crear tramos personalizados desde la interfaz de usuario de Datadog sin redeplegar tu aplicación.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dynamic_instrumentation/" >}}Agrega tramos personalizados con Instrumentación Dinámica{{< /nextlink >}}
{{< /whatsnext >}}

**Para tramos personalizados en código:** Agrega [instrumentación personalizada basada en código][3] para instrumentar lógica de negocio personalizada o agregar metadatos específicos de la aplicación a los tramos.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/" >}}Agrega tramos personalizados con instrumentación basada en código{{< /nextlink >}}
{{< /whatsnext >}}

Estas opciones pueden combinarse. Por ejemplo, puedes comenzar con la Instrumentación de un solo paso y agregar instrumentación personalizada basada en código para tramos específicos, o usar SDKs gestionados manualmente junto con Instrumentación Dinámica para agregar tramos sin necesidad de redeplegar la aplicación.

## Comparación detallada {#detailed-comparison}

### Configuración del SDK {#sdk-setup}

La Instrumentación de un solo paso es el punto de partida recomendado para la mayoría de los usuarios. Si necesitas más control sobre la configuración del SDK, puedes usar SDKs gestionados manualmente en su lugar:

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/single-step-apm/">Instrumentación de un solo paso</a> (recomendado)</th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/dd_libraries/">SDKs gestionados manualmente</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Cómo funciona</td>
    <td style="border:1px solid #ccc;">Datadog instala y carga automáticamente los SDKs en los procesos de tu aplicación, en tiempo de ejecución, con un solo comando.</td>
    <td style="border:1px solid #ccc;">Instalas y configuras los SDKs directamente en el código de tu aplicación o en el proceso de construcción.</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">¿Cambios en el código?</td>
    <td style="border:1px solid #ccc;">No</td>
    <td style="border:1px solid #ccc;">Sí</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Complejidad de configuración</td>
    <td style="border:1px solid #ccc;">Baja - configuración mínima necesaria</td>
    <td style="border:1px solid #ccc;">Media - requiere configuración del entorno y de la construcción</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Control de configuración</td>
    <td style="border:1px solid #ccc;">Valores predeterminados estándar con sobreescrituras opcionales</td>
    <td style="border:1px solid #ccc;">Control total a través de variables de entorno y código</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">¿Cuándo usar?</td>
    <td style="border:1px solid #ccc;">Comienza aquí para una instrumentación rápida y consistente a través de servicios sin cambios en el código.</td>
    <td style="border:1px solid #ccc;">Avanza a esta opción cuando necesites control granular sobre el comportamiento y la configuración del SDK.</td>
  </tr>
</table>

### Personalización de tramos {#span-customization}

La auto-instrumentación crea automáticamente tramos para los frameworks y bibliotecas soportados, proporcionando una observabilidad esencial sin trabajo adicional. Cuando necesitas visibilidad en rutas de código personalizadas o deseas enriquecer trazas con datos específicos de la aplicación, puedes agregar tramos personalizados utilizando ya sea Instrumentación Dinámica o instrumentación personalizada basada en código:

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/dynamic_instrumentation/">Instrumentación Dinámica</a></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/custom_instrumentation/">Instrumentación personalizada basada en código</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Cómo funciona</td>
    <td style="border:1px solid #ccc;">Configura las reglas de instrumentación en la interfaz de usuario de Datadog; las reglas se aplican en tiempo de ejecución.</td>
    <td style="border:1px solid #ccc;">Agrega llamadas explícitas a la API de trazado en el código de tu aplicación.</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">¿Cambios en el código?</td>
    <td style="border:1px solid #ccc;">No</td>
    <td style="border:1px solid #ccc;">Sí</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Despliegue requerido</td>
    <td style="border:1px solid #ccc;">No</td>
    <td style="border:1px solid #ccc;">Sí (para agregar o modificar tramos)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">Cuándo usar</td>
    <td style="border:1px solid #ccc;">Agrega tramos personalizados sin cambios en el código o nuevos despliegues.</td>
    <td style="border:1px solid #ccc;">Avanza a esta opción cuando necesites lógica de instrumentación compleja o desees que los tramos estén definidos permanentemente en el código.</td>
  </tr>
</table>

## Tutoriales de configuración de APM {#apm-setup-tutorials}

Los siguientes tutoriales te guían por la configuración de seguimiento distribuido para una aplicación de muestra en varios escenarios de infraestructura, con instrumentación automática y personalizada :

{{< whatsnext desc="Elige tu idioma y entorno:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitando el seguimiento en una aplicación de Python en el mismo host que el agente de Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Habilitando el seguimiento en una aplicación de Python y el agente de Datadog en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitando el seguimiento para una aplicación de Python en un contenedor y un agente en un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitando el seguimiento en una aplicación de Java en el mismo host que el agente de Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Habilitando el seguimiento en una aplicación de Java y el agente de Datadog en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitando el seguimiento para una aplicación Java en un contenedor y un agente en un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> Habilitando el seguimiento para una aplicación Java en GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Habilitando el seguimiento para una aplicación Java en Amazon EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Habilitando el seguimiento para una aplicación Java en Amazon ECS con EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Habilitando el seguimiento para una aplicación Java en Amazon ECS con Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Habilitando el seguimiento para una aplicación Java con el Controlador de Admisión{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitando el seguimiento en una aplicación Go en el mismo host que el agente de Datadog{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Habilitando el seguimiento en una aplicación Go y el agente de Datadog en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Habilitando el seguimiento para una aplicación Go en Amazon ECS con EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Habilitando el seguimiento para una aplicación Go en Amazon ECS con Fargate{{< /nextlink >}}

{{< /whatsnext >}}

##  Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/single-step-apm/
[2]: /es/tracing/trace_collection/dd_libraries/
[3]: /es/tracing/trace_collection/custom_instrumentation/
[4]: /es/tracing/trace_collection/dynamic_instrumentation/
[5]: /es/agent/