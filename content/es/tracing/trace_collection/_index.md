---
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
description: Empezando con Datadog APM
further_reading:
- link: tracing/trace_collection/compatibility
  tag: Documentación
  text: Requisitos de compatibilidad
title: Instrumentación de aplicación
---

## Información general

Para empezar a utilizar Datadog APM , debes seguir estos pasos clave:

1. Instala y configura el Datadog Agent.
2. Instrumenta tu aplicación.

<div class="alert alert-info"><strong>Simplifica tu instalación.</strong> Instala el Agent e instrumenta tu aplicación en un solo paso con la <a href="https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/">Instrumentación de paso único</a>.</div>

Instrumentar la aplicación permite enviar datos de observabilidad al Agent, que a su vez los transmite al backend de Datadog para que se muestren en la interfaz de usuario.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="El pipeline de APM">}}

## Tipos de instrumentación

Existen dos enfoques principales para instrumentar tu aplicación: automático o personalizado {{< tooltip glossary="Instrumentación" >}}.

### Instrumentación automática

Crea {{< tooltip glossary="span" >}} para tu aplicación con pocos pasos manuales. Para instrumentar automáticamente tu aplicación, puedes utilizar cualquiera de estas opciones:

- [Instrumentación de paso único][7]: ejecuta un comando de instalación de una sola línea para instalar el Agent, habilitar APM e instrumentar todos tus servicios en tu host de Linux, VM o contenedor.
- [Bibliotecas de Datadog][8]: añade bibliotecas de rastreo de Datadog a tu aplicación.

Para más información, consulta [Instrumentación automática][5].

### Instrumentación personalizada

Captura datos de observabilidad de código interno o funciones complejas que no captura  la instrumentación automática. Para instrumentar de forma personalizada tu aplicación, puedes utilizar cualquiera de estas opciones:

- [Bibliotecas de Datadog][9]: utiliza bibliotecas de rastreo de Datadog para añadir y personalizar la observabilidad dentro de Datadog.
- [APIs de OpenTelemetry][10]: utiliza la compatibilidad con la API de OpenTelemetry en bibliotecas de Datadog para disponer de una instrumentación independiente de tu código.
- [Dynamic Instrumentation][11]: Utiliza Dynamic Instrumentation para añadir telemetría personalizada en ubicaciones de código específicas, desde la interfaz de usuario de Datadog.

Para más información, consulta [Instrumentación personalizada][6].

{{< callout url="https://www.datadoghq.com/product-preview/service-discovery/" btn_hidden="false" header="La detección de servicios está en Vista previa">}}
La detección de servicios proporciona una visibilidad completa del estado actual de la monitorización de aplicaciones, destacando cualquier brecha importante o trazas (traces) rotas en tu sistema. 
{{< /callout >}}


## Tutoriales de configuración de APM

Los siguientes tutoriales te guiarán a través de la configuración de trazas distribuidas para una aplicación de ejemplo en varios escenarios de infraestructura, tanto con una instrumentación automática como personalizada, mediante bibliotecas de rastreo de Datadog:

{{< whatsnext desc="Elige tu lenguaje y entorno:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitación del rastreo en una aplicación Python en el mismo host que el Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Habilitación del rastreo en una aplicación Python y un Datadog Agent en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitación del rastreo para una aplicación Python en un contenedor y un Agent en un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitación del rastreo en una aplicación Java en el mismo host que el Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Habilitación del rastreo en una aplicación Java y un Datadog Agent en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitación del rastreo para una aplicación Java en un contenedor y un Agent en un host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> Habilitación del rastreo para una aplicación Java en GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Habilitación del rastreo para una aplicación Java en AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Habilitación del rastreo para una aplicación Java en Amazon ECS con EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Habilitación del rastreo para una aplicación Java en Amazon ECS con Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Habilitación del rastreo para una aplicación Java con el Controlador de admisión{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Habilitación del rastreo en una aplicación Go en el mismo host que el Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Habilitación del rastreo en una aplicación Go y un Datadog Agent en contenedores{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Habilitación del rastreo para una aplicación Go en Amazon ECS con EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Habilitación del rastreo para una aplicación Go en Amazon ECS con Fargate{{< /nextlink >}}

{{< /whatsnext >}}
## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/community/libraries/#apm-tracing-client-libraries
[2]: /es/tracing/trace_collection/library_injection_local/
[4]: /es/tracing/trace_collection/dd_libraries/
[5]: /es/tracing/trace_collection/automatic_instrumentation/
[6]: /es/tracing/trace_collection/custom_instrumentation/
[7]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[8]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /es/tracing/trace_collection/custom_instrumentation/dd_libraries/
[10]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[11]: /es/tracing/dynamic_instrumentation/