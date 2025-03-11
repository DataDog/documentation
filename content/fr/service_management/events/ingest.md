---
title: Envoyer des événements à Datadog
---

## Événements standard
Datadog recueille automatiquement les événements recueillis par l'Agent et les intégrations installées, sans qu'aucune configuration supplémentaire ne soit requise.

La collecte d'événements est prise en charge par plus d'une centaine d'intégrations Datadog, notamment Kubernetes, Docker, Jenkins, Chef, Puppet, Amazon ECS ou Auto Scaling, Sentry et Nagios.

{{< whatsnext desc="Envoyer vos événements à Datadog :">}}
    {{< nextlink href="https://app.datadoghq.com/integrations" >}}Intégrations{{< /nextlink >}}
{{< /whatsnext >}}

## Événements personnalisés
Vous pouvez également envoyer vos propres événements personnalisés à l'aide de l'API Datadog, d'un check d'Agent custom, de DogStatsD ou de l'API d'e-mail pour les événements.

{{< whatsnext desc="Envoyez vos événements personnalisés à Datadog :">}}
    {{< nextlink href="/api/latest/events/#post-an-event" >}}API Datadog{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/agent/" >}}Check d'Agent custom{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/email/" >}}E-mail{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/dogstatsd/" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/events-from-sns-emails/" >}}E-mails Amazon SNS{{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/#configuration" >}}Destinations d'API Amazon EventBridge{{< /nextlink >}}
{{< /whatsnext >}}