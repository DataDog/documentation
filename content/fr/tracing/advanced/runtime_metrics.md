---
title: Métriques de runtime
kind: documentation
further_reading:
  - link: tracing/connect_logs_and_traces
    tags: Enrichir vos traces
    text: Associer vos logs à vos traces
  - link: tracing/manual_instrumentation
    tags: Enrichir vos traces
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tags: Enrichir vos traces
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
---
Activez la collecte des métriques de runtime dans le client de tracing pour obtenir davantage de détails sur les performances d'une application. Les métriques de runtime peuvent être consultées au sein du contexte d'un service, corrélées dans la vue Trace lors de l'exécution d'une requête donnée et exploitées sur l'ensemble de la plateforme.

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="Trace runtime JVM" >}}

## Configuration automatique

{{< tabs >}}
{{% tab "Java" %}}

La collecte de métriques JVM est activée par défaut pour le traceur Java v0.29.0+. Elle peut être désactivée en définissant un paramètre de configuration dans le client de tracing, soit via la propriété système `-Ddd.jmxfetch.enabled=false`, soit via la variable d'environnement `DD_JMXFETCH_ENABLED=false`.

Les métriques JVM peuvent être visualisées conjointement à vos services Java. Consultez la [page Service][1] dans Datadog.

{{< img src="tracing/runtime_metrics/jvm-runtime.png" alt="Runtime JVM"  >}}

Par défaut, les métriques de runtime de votre application sont envoyées à l'Agent Datadog via DogStatsD sur le port `8125`. Vérifiez que [DogStatsD est activé pour l'Agent][2].

Si vous exécutez l'Agent en tant que conteneur, vérifiez que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est définie sur true][3] et que le port `8125` est ouvert sur l'Agent. En outre, pour :

* **Kubernetes** : vous *devez* [associer le port DogStatsD à un port du host][4].
* **ECS** : [définissez les flags adéquats dans la définition de votre tâche][5].

**Remarques :**

* Pour l'IU de runtime, `dd-trace-java` >= [`0.24.0`][6] est pris en charge.
* Pour associer des métriques JVM dans des graphiques de performances, veillez à ce que `env: tag` (sensible à la casse) soit défini et corresponde sur l'ensemble de votre environnement.

[1]: https://app.datadoghq.com/apm/services
[2]: /fr/developers/dogstatsd/#setup
[3]: /fr/agent/docker/#dogstatsd-custom-metrics
[4]: /fr/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[5]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
{{% /tab %}}
{{% tab "Python" %}}

<div class="alert alert-warning">
Cette fonction est actuellement en version bêta privée. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> afin d'activer cette fonctionnalité pour votre compte.
</div>

Il est possible d'activer la collecte de métriques de runtime avec le paramètre d'environnement `DD_RUNTIME_METRICS_ENABLED=true` pour une exécution avec `ddtrace-run` :

Les métriques de runtime peuvent être visualisées conjointement à vos services Python. Consultez la [page Service][1] dans Datadog.

**Remarque** : pour l'IU de runtime, `ddtrace` >= [`0.24.0`][2] est pris en charge.

Par défaut, les métriques de runtime de votre application sont envoyées à l'Agent Datadog par le biais de DogStatsD sur le port `8125`. Veillez à ce que [DogStatsD soit activé pour l'Agent][3].
Si vous exécutez l'Agent en tant que conteneur, assurez-vous que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est défini sur true][4] et que le port `8125` est ouvert sur l'Agent.
Dans Kubernetes, [associez le port DogstatsD à un port de host][5] ; dans ECS, [indiquez les flags pertinents dans la définition de votre tâche][6].


[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.24.0
[3]: /fr/developers/metrics/dogstatsd_metrics_submission/#setup
[4]: /fr/agent/docker/#dogstatsd-custom-metrics
[5]: /fr/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[6]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab "Ruby" %}}

<div class="alert alert-warning">
Cette fonction est actuellement en version bêta privée. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> afin d'activer cette fonctionnalité pour votre compte.
</div>

La collecte de métriques de runtime utilise le gem [`dogstatsd-ruby`][1] pour envoyer des métriques à l'Agent via DogStatsD. Pour recueillir des métriques de runtime, vous devez ajouter ce gem à votre application Ruby et vous assurer que [DogStatsD est activé pour l'Agent][2].

La collecte de métriques est désactivée par défaut. Vous pouvez l'activer en définissant la variable d'environnement `DD_RUNTIME_METRICS_ENABLED` sur `true` ou en définissant la configuration suivante dans votre application Ruby :

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'ddtrace'

Datadog.configure do |c|
  # Pour activer la collecte de métriques, définir sur `true`. Valeur par défaut : `false`
  # Vous pouvez aussi définir DD_RUNTIME_METRICS_ENABLED=true pour configurer ce paramètre.
  c.runtime_metrics_enabled = true

  # Facultatif : vous pouvez configurer l'instance DogStatsD utilisée pour envoyer les métriques de runtime.
  # DogStatsD est automatiquement configuré avec les paramètres par défaut si `dogstatsd-ruby` est disponible.
  # Vous pouvez utiliser le host et le port de l'Agent Datadog pour la configuration. Valeur par défaut : 'localhost:8125'.
  c.runtime_metrics statsd: Datadog::Statsd.new
end
```

Les métriques de runtime peuvent être visualisées conjointement à vos services Ruby. Consultez la [page Service][3] dans Datadog.

Par défaut, les métriques de runtime de votre application sont envoyées à l'Agent Datadog par le biais de DogStatsD sur le port `8125`. Veillez à ce que [DogStatsD soit activé pour l'Agent][4].
Si vous exécutez l'Agent en tant que conteneur, assurez-vous que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est défini sur true][5] et que le port `8125` est ouvert sur l'Agent.
Dans Kubernetes, [associez le port DogstatsD à un port de host][6] ; dans ECS, [indiquez les flags pertinents dans la définition de votre tâche][7].


[1]: https://rubygems.org/gems/dogstatsd-ruby
[2]: /fr/developers/metrics/dogstatsd_metrics_submission/#setup
[3]: https://app.datadoghq.com/apm/service
[4]: /fr/developers/metrics/dogstatsd_metrics_submission/#setup
[5]: /fr/agent/docker/#dogstatsd-custom-metrics
[6]: /fr/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[7]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab "Go" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
{{% /tab %}}
{{% tab "Node.js" %}}

<div class="alert alert-warning">
Cette fonction est actuellement en version bêta privée. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> afin d'activer cette fonctionnalité pour votre compte.
</div>

Il est possible d'activer la collecte de métriques de runtime en définissant un paramètre de configuration dans le client de tracing, soit via l'option de traceur `tracer.init({ runtimeMetrics: true })`, soit via la variable d'environnement `DD_RUNTIME_METRICS_ENABLED=true`

Les métriques de runtime peuvent être visualisées conjointement à vos services Node. Consultez la [page Service][1] dans Datadog.

Par défaut, les métriques de runtime de votre application sont envoyées à l'Agent Datadog par le biais de DogStatsD sur le port `8125`. Veillez à ce que [DogStatsD soit activé pour l'Agent][2].
Si vous exécutez l'Agent en tant que conteneur, assurez-vous que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est défini sur true][3] et que le port `8125` est ouvert sur l'Agent.
Dans Kubernetes, [associez le port DogstatsD à un port de host][4] ; dans ECS, [indiquez les flags pertinents dans la définition de votre tâche][5].


[1]: https://app.datadoghq.com/apm/services
[2]: /fr/developers/metrics/dogstatsd_metrics_submission/#setup
[3]: /fr/agent/docker/#dogstatsd-custom-metrics
[4]: /fr/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[5]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab ".NET" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
{{% /tab %}}
{{% tab "PHP" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
{{% /tab %}}
{{< /tabs >}}

## Données collectées

{{< tabs >}}
{{% tab "Java" %}}

Les métriques suivantes sont recueillies par défaut après l'activation des métriques JVM.

{{< get-metrics-from-git "java" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard de runtime JVM par défaut][1] comportant les tags `service` et `runtime-id` appliqués à ces métriques.

En outre, vous pouvez ajouter des métriques JMX à l'aide de fichiers de configuration qui sont transmis à `dd.jmxfetch.config.dir` et `dd.jmxfetch.config`. Il est également possible d'activer chaque intégration JMX de Datadog à l'aide du paramètre `dd.jmxfetch.<NOM_INTÉGRATION>.enabled=true`. Cela intègre automatiquement la configuration des [fichiers de configuration JMX existants][2] de Datadog. Consultez la section relative à l'[intégration JMX][3] pour en savoir plus sur la configuration.

[1]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[2]: https://github.com/DataDog/integrations-core/search?q=jmx_metrics&unscoped_q=jmx_metrics
[3]: /fr/integrations/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

{{< get-metrics-from-git "python" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard de métriques de runtime Python par défaut][1] comportant les tags `service` et `runtime-id` appliqués à ces métriques.

[1]: https://app.datadoghq.com/dash/integration/30267/python-runtime-metrics
{{% /tab %}}
{{% tab "Ruby" %}}

Les métriques suivantes sont recueillies par défaut après l'activation des métriques de runtime.

{{< get-metrics-from-git "ruby" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard de runtime Ruby par défaut][1] comportant les tags `service` et `runtime-id` appliqués à ces métriques.


[1]: https://app.datadoghq.com/dash/integration/30268/ruby-runtime-metrics
{{% /tab %}}
{{% tab "Go" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
{{% /tab %}}
{{% tab "Node.js" %}}

Les métriques suivantes sont recueillies par défaut après l'activation des métriques de runtime.

{{< get-metrics-from-git "node" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard de runtime Node par défaut][1] comportant les tags `service` et `runtime-id` appliqués à ces métriques.

[1]: https://app.datadoghq.com/dash/integration/30269/node-runtime-metrics
{{% /tab %}}
{{% tab ".NET" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
{{% /tab %}}
{{% tab "PHP" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#services