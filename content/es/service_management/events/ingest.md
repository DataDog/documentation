---
title: Enviar eventos a Datadog
---

## Eventos estándar
Sin ninguna configuración adicional, los eventos de Datadog agrupan los eventos que se recopilan de manera automática en función del Agent y las integraciones instaladas.

La recopilación de eventos es compatible con más de 100 integraciones de Datadog, incluido Kubernetes, Docker, Jenkins, Chef, Puppet, Amazon ECS o Autoscaling, Sentry y Nagios.

{{< whatsnext desc="Envía tus eventos a Datadog:">}}
    {{< nextlink href="https://app.datadoghq.com/integrations" >}}Integraciones{{< /nextlink >}}
{{< /whatsnext >}}

## Eventos personalizados
También puedes enviar tus propio eventos personalizados mediante la API de Datadog, un check del Agent personalizado, DogStatsD o la API de correo electrónico de eventos.

{{< whatsnext desc="Envía tus eventos personalizados a Datadog:">}}
    {{< nextlink href="/api/latest/events/#post-an-event" >}}API de Datadog{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/agent/" >}}Check del Agent personalizado{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/email/" >}}Correo electrónico{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/dogstatsd/" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/events-from-sns-emails/" >}}Correos electrónicos de Amazon SNS{{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/#configuration" >}}Destinos de la API de Amazon EventBridge{{< /nextlink >}}
{{< /whatsnext >}}