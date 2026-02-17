---
aliases:
- /fr/tracing/advanced/runtime_metrics/
- /fr/tracing/metrics/runtime_metrics/dotnet
- /fr/tracing/metrics/runtime_metrics/java
- /fr/tracing/metrics/runtime_metrics/nodejs
- /fr/tracing/metrics/runtime_metrics/python
- /fr/tracing/metrics/runtime_metrics/ruby
- /fr/tracing/runtime_metrics/dotnet
- /fr/tracing/runtime_metrics/java
- /fr/tracing/runtime_metrics/nodejs
- /fr/tracing/runtime_metrics/python
- /fr/tracing/runtime_metrics/ruby
description: Consultez des statistiques supplémentaires sur les performances d'une
  application grâce aux métriques runtime associées à vos traces.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: Corréler vos logs et vos traces
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Instrumenter vos applications manuellement pour créer des traces
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
title: Métriques runtime
---

## Présentation

Les métriques runtime surveillent l'utilisation de la mémoire, la collecte des déchets et la parallélisation de votre application. Les bibliothèques de tracing Datadog collectent automatiquement ces métriques pour les environnements pris en charge et les envoient à l'Agent Datadog.

Ces métriques vous aident à identifier les goulots d'étranglement, à résoudre les problèmes de performance et à optimiser l'utilisation des ressources. En visualisant les métriques runtime conjointement avec les traces et les logs, vous obtenez une visibilité complète sur la santé et les performances de votre application.

## Compatibilité

Les métriques runtime sont disponibles pour plusieurs langages de programmation et environnements d'exécution, avec des niveaux de support et des options de configuration variables.

{{< tabs >}}
{{% tab "Java" %}}

- **Activé par défaut** : Oui
- **Version de la bibliothèque** : 0.29.0+
- **Runtime** : Java 8+

<div class="alert alert-danger">La collecte des métriques JMX n'est pas prise en charge dans les environnements AWS Lambda.</div>

{{% /tab %}}

{{% tab "Python" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 0.30.0+
  - **Niveau de prise en charge** : Aperçu
  - **Runtime** : Toutes les versions de Python prises en charge

{{% /tab %}}

{{% tab "Ruby" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 0.44.0+
  - **Runtime** : Toutes les versions de Ruby prises en charge


<div class='alert alert-info'>Vous devez ajouter la gem <a href="https://rubygems.org/gems/dogstatsd-ruby">dogstatsd-ruby</a> à votre application.</div>

{{% /tab %}}

{{% tab "Go" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 1.18.0+
  - **Runtime** : Toutes les versions de Go prises en charge

{{% /tab %}}

{{% tab "Node.js" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 3.0.0+
  - **Runtime** : Toutes les versions de Node.js prises en charge

{{% /tab %}}

{{% tab ".NET" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 1.23.0+
  - **Runtime**: .NET Framework 4.6.1+ et .NET Core 3.1+ (y compris .NET 5 et ultérieur).

#### Autorisations pour Internet Information Services (IIS)

Sur .NET Framework, les métriques peuvent être recueillies à l'aide de compteurs de performances. Les utilisateurs avec une session ouverte non interactive (notamment ceux avec des comptes de pool d'applications IIS et certains comptes de service) doivent être ajoutés au groupe **Performance Monitoring Users** pour accéder aux données des compteurs.

Les pools d'applications IIS utilisent des comptes spéciaux qui n'apparaissent pas dans la liste des utilisateurs. Pour les ajouter au groupe Performance Monitoring Users, recherchez `IIS APPPOOL\<nom du pool>`. Par exemple, l'utilisateur pour DefaultAppPool est `IIS APPPOOL\DefaultAppPool`.

Vous pouvez effectuer cette opération depuis l'interface Computer Management, ou depuis l'invite de commandes administrateur :

```shell
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

{{% /tab %}}
{{% tab "PHP" %}}

<div class='alert alert-warning'>Les métriques runtime pour PHP ne sont pas prises en charge.</div>

{{% /tab %}}
{{% tab "C++" %}}

<div class='alert alert-warning'>Les métriques runtime pour C++ ne sont pas prises en charge.</div>

{{% /tab %}}
{{< /tabs >}}

## Instructions de configuration

Pour configurer les métriques runtime, vous devez configurer à la fois l'Agent Datadog et votre application.

### 1. Configurer l'Agent Datadog

Activez [DogStatsD pour l'Agent][2]. Par défaut, l'Agent Datadog est configuré pour ingérer les métriques via UDP sur le port `8125`.

{{% collapse-content title="Configuration spécifique au conteneur" level="h4" expanded=false %}}

Lors de l'exécution de l'Agent dans des environnements conteneurisés, une configuration supplémentaire est nécessaire :

1. Définissez `dogstatsd_non_local_traffic: true` dans votre fichier principal de configuration [`datadog.yaml`][8], ou définissez la [variable d'environnement][3] `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true`.
2. Suivez ces instructions de configuration spécifiques aux conteneurs :

{{< partial name="apm/apm-runtime-metrics-containers.html" >}}

<br>

{{< site-region region="us3,us5,eu,gov,ap1,ap2" >}}

3. Définissez `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

{{% /collapse-content %}}

### 2. Configurer votre application

Configurez les métriques runtime dans votre application a l'aide de variables d'environnement. Certains langages prennent également en charge la configuration des métriques runtime [directement dans le code](#configuration-basee-sur-le-code).

#### Variables d'environnement

Utilisez les variables d'environnement suivantes pour configurer les métriques runtime dans votre application :

`DD_RUNTIME_METRICS_ENABLED` 
: **Par défaut** : `true` pour Java, `false` pour les autres langages`<br>` 
**Description** : Active la collecte des métriques runtime. Les métriques sont envoyées à l'Agent Datadog, selon la configuration de l'application instrumentée.

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED` 
: **Par défaut** : `true` pour Java, `false` pour Node.js, Ruby et Python. N'existe pas pour .NET et Go ; le `runtime_id` est toujours rapporté.`<br>` 
**Description** : Active les métriques runtime améliorées, en ajoutant un tag `runtime_id` à chaque métrique. Le `runtime_id` représente l'identifiant du processus de l'application et permet de corréler directement les métriques runtime avec chaque application en cours d'exécution.

`DD_AGENT_HOST` 
: **Par défaut** : `localhost` `<br>` 
**Description** : Définit l'adresse du host pour la soumission des métriques par la bibliothèque de tracing. Il peut s'agir d'un nom de host ou d'une adresse IP.

`DD_DOGSTATSD_PORT` 
: **Par défaut** : `8125` <br> 
**Description** : Définit le port pour l'envoi des métriques par la bibliothèque de tracing.

#### Configuration basée sur le code

En plus des variables d'environnement, certains langages permettent de configurer les métriques runtime directement dans le code.

{{< tabs >}}
{{% tab "Java" %}}

Vous pouvez uniquement activer les métriques runtime à l'aide de [variables d'environnement](#variables-d-environnement).

Cependant, vous pouvez étendre les métriques collectées en ajoutant des métriques JMX custom. Pour plus d'informations, consultez la documentation de l'[intégration JMX][100].

[100]: /fr/integrations/java/
{{% /tab %}}

{{% tab "Python" %}}

Vous pouvez activer les métriques runtime à l'aide de [variables d'environnement](#variables-d-environnement) ou directement dans le code :

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

<div class='alert alert-warning'>Cela s'applique uniquement si vous n'utilisez pas <code>ddtrace-run</code></div>
{{% /tab %}}

{{% tab "Ruby" %}}

Vous pouvez activer les métriques runtime à l'aide de [variables d'environnement](#variables-d-environnement) ou directement dans le code :

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog' # Utilisez 'ddtrace' si vous utilisez v1.x

Datadog.configure do |c|
  c.runtime_metrics.enabled = true

  # Vous pouvez, si vous le souhaitez, configurer l'instance DogStatsD utilisée pour l'envoi des métriques runtime.
  # DogStatsD est automatiquement configuré avec les paramètres par défaut si `dogstatsd-ruby` est disponible.   
  # Vous pouvez la configurer avec le host et le port de l'Agent Datadog ; la valeur par défaut est 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```
{{% /tab %}}

{{% tab "Go" %}}

Vous pouvez activer les métriques runtime à l'aide de [variables d'environnement](#variables-d-environnement) ou directement dans le code :

```go
// Configuration basique
tracer.Start(tracer.WithRuntimeMetrics())

// Avec une adresse DogStatsD personnalisée
tracer.Start(
  tracer.WithRuntimeMetrics(),
  tracer.WithDogstatsdAddr("custom-host:8125")
)
```

L'option `WithDogstatsdAddr` permet de spécifier une adresse personnalisée pour le serveur DogStatsD. Utilisez [`WithDogstatsdAddr`][101] (ou [`WithDogstatsdAddress` v1][100]) si votre adresse diffère de la valeur par défaut `localhost:8125`. (Disponible à partir de la version 1.18.0+).

[100]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[101]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddr
{{% /tab %}}

{{% tab "Node.js" %}}

Vous pouvez activer les métriques runtime à l'aide de [variables d'environnement](#variables-d-environnement) ou directement dans le code :

```js
const tracer = require('dd-trace').init({
  // Autres options du tracer...
  runtimeMetrics: true
})
```
{{% /tab %}}

{{% tab ".NET" %}}

Vous pouvez uniquement activer les métriques runtime à l'aide de [variables d'environnement](#variables-d-environnement).

{{% /tab %}}
{{< /tabs >}}

## Dashboards

Une fois la configuration terminée, vous pouvez afficher les métriques runtime dans :

- La page des détails du service instrumenté
- L'onglet **Metrics** du flame graph
- Dashboards runtime par défaut

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="Trace runtime JVM" >}}

## Dépannage
- Pour associer les métriques runtime aux flame graphs, assurez-vous que le tag `env` (sensible à la casse) est défini et identique dans tout votre environnement.
- Pour que les métriques runtime s'affichent sur la page du service lorsque vous utilisez Fargate, assurez-vous que `DD_DOGSTATSD_TAGS` est défini sur la tâche de votre Agent, et que le tag `env` configuré correspond à celui du service instrumenté.

## Données collectées

Chaque langage pris en charge collecte un ensemble de métriques runtime fournissant des informations sur l'utilisation de la mémoire, la collecte des déchets, l'utilisation du CPU et d'autres indicateurs de performance.

{{< tabs >}}
{{< tab "Java" >}}
{{< get-metrics-from-git "java" >}}
{{< /tab >}}

{{< tab "Python" >}}
{{< get-metrics-from-git "python" >}}
{{< /tab >}}

{{< tab "Ruby" >}}
{{< get-metrics-from-git "ruby" >}}
{{< /tab >}}

{{< tab "Go" >}}
{{< get-metrics-from-git "go" >}}
{{< /tab >}}

{{< tab "Node.js" >}}
{{< get-metrics-from-git "node" >}}
{{< /tab >}}

{{< tab ".NET" >}}
{{< get-metrics-from-git "dotnet" >}}
{{< /tab >}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/developers/dogstatsd/#setup
[3]: /fr/agent/docker/#dogstatsd-custom-metrics
[7]: /fr/developers/dogstatsd/unix_socket/
[8]: /fr/agent/configuration/agent-configuration-files/#main-configuration-file