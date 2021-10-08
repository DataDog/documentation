---
title: Métriques de runtime Ruby
kind: documentation
description: Consultez des statistiques supplémentaires sur les performances de votre application Ruby grâce aux métriques runtime associées à vos traces.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/manual_instrumentation
    tag: Documentation
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
<div class="alert alert-warning">
Cette fonctionnalité est actuellement en version bêta privée. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> afin de demander son activation pour votre compte.
</div>

## Configuration automatique

La collecte de métriques runtime utilise le gem [`dogstatsd-ruby`][1] pour envoyer des métriques à l'Agent via DogStatsD. Pour recueillir des métriques runtime, vous devez ajouter ce gem à votre application Ruby et vous assurer que [DogStatsD est activé pour l'Agent][2].

La collecte de métriques est désactivée par défaut. Vous pouvez l'activer en définissant la variable d'environnement `DD_RUNTIME_METRICS_ENABLED` sur `true` ou en définissant la configuration suivante dans votre application Ruby :

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'ddtrace'

Datadog.configure do |c|
  # Pour activer la collecte de métriques, définir sur `true`. Valeur par défaut : `false`
  # Vous pouvez aussi définir DD_RUNTIME_METRICS_ENABLED=true pour configurer ce paramètre.
  c.runtime_metrics_enabled = true

  # Facultatif : vous pouvez configurer l'instance DogStatsD utilisée pour envoyer les métriques runtime.
  # DogStatsD est automatiquement configuré avec les paramètres par défaut si `dogstatsd-ruby` est disponible.
  # Vous pouvez utiliser le host et le port de l'Agent Datadog pour la configuration. Valeur par défaut : 'localhost:8125'.
  c.runtime_metrics statsd: Datadog::Statsd.new
end
```

Les métriques runtime peuvent être visualisées conjointement à vos services Ruby. Consultez la [page Service][3] dans Datadog.

Par défaut, les métriques runtime de votre application sont envoyées à l'Agent Datadog via DogStatsD sur le port `8125`. Veillez à ce que [DogStatsD soit activé pour l'Agent][2].
Si vous exécutez l'Agent en tant que conteneur, assurez-vous que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est défini sur true][4] et que le port `8125` est ouvert sur l'Agent.
Dans Kubernetes, [associez le port DogstatsD à un port du host][5] ; dans ECS, [indiquez les flags pertinents dans la définition de votre tâche][6].

## Données collectées

Les métriques suivantes sont recueillies par défaut après l'activation des métriques runtime.

{{< get-metrics-from-git "ruby" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard de runtime Ruby par défaut][7] comportant les tags `service` et `runtime-id` appliqués à ces métriques.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://rubygems.org/gems/dogstatsd-ruby
[2]: /fr/metrics/dogstatsd_metrics_submission/#setup
[3]: https://app.datadoghq.com/apm/service
[4]: /fr/agent/docker/#dogstatsd-custom-metrics
[5]: /fr/developers/dogstatsd/?tab=kubernetes#agent
[6]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30268/ruby-runtime-metrics