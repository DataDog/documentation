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
- link: /opentelemetry/integrations/runtime_metrics/
  tag: Documentation
  text: Métriques de runtime OpenTelemetry
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: Corréler vos logs et vos traces
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Gérer vos applications manuellement pour créer des traces.
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
title: Métriques runtime
---
## Aperçu {#overview}

Les métriques d'exécution surveillent l'utilisation de la mémoire de votre application, le ramasse-miettes et la parallélisation. Les SDK Datadog collectent automatiquement ces métriques pour les environnements pris en charge et les envoient à l'Agent Datadog.

Ces métriques vous aident à identifier les goulets d'étranglement, à résoudre les problèmes de performance et à optimiser l'utilisation des ressources. En visualisant les métriques d'exécution aux côtés des traces et des journaux, vous obtenez une visibilité complète sur la santé et la performance de votre application.

Si vous instrumentez votre application avec OpenTelemetry au lieu des bibliothèques de traçage Datadog, consultez [Métriques d'exécution OpenTelemetry][10] pour les instructions d'installation.

## Compatibilité {#compatibility}

Les métriques runtime sont disponibles pour plusieurs langages de programmation et environnements d'exécution, avec des niveaux de support et des options de configuration variables. 

{{< tabs >}}
{{% tab "Java" %}}

- **Activé par défaut** : Oui
- **Version de la bibliothèque** : 0.29.0+
- **Environnements d'exécution** : Java 8+

<div class="alert alert-danger">La collecte des métriques JMX n'est pas prise en charge dans les environnements AWS Lambda.</div>

{{% /tab %}}

{{% tab "Python" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 0.30.0+
  - **Niveau de support** : Preview
  - **Environnements d'exécution** : Toutes les versions Python prises en charge

{{% /tab %}}

{{% tab "Ruby" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 0.44.0+
  - **Environnements d'exécution** : Toutes les versions Ruby prises en charge


<div class="alert alert-info">Vous devez ajouter la gem <a href="https://rubygems.org/gems/dogstatsd-ruby">dogstatsd-ruby</a> à votre application.</div>

{{% /tab %}}

{{% tab "Go" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 1.18.0+
  - **Environnements d'exécution** : Toutes les versions Go prises en charge

{{% /tab %}}

{{% tab "Node.js" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque**: 3.0.0+
  - **Environnements d'exécution**: Toutes les versions de Node.js prises en charge

{{% /tab %}}

{{% tab ".NET" %}}

  - **Activé par défaut**: Oui, sur .NET 6+ (v3.40.0+).
  - **Version de la bibliothèque**: 1.23.0+
  - **Environnements d'exécution**: .NET Framework 4.6.1+ et .NET Core 3.1+ (y compris .NET 5 et versions ultérieures).

#### Permissions pour les services d'information Internet (IIS) (uniquement .NET Framework) {#permissions-for-internet-information-services-iis-net-framework-only}

Sur .NET Framework, les métriques sont collectées à l'aide de compteurs de performance. Les utilisateurs dans des sessions de connexion non interactives (y compris les comptes de pool d'applications IIS et certains comptes de service) doivent être ajoutés au groupe **Utilisateurs de surveillance des performances** pour accéder aux données des compteurs.

Les pools d'applications IIS utilisent des comptes spéciaux qui n'apparaissent pas dans la liste des utilisateurs. Pour les ajouter au groupe Utilisateurs de surveillance des performances, recherchez `IIS APPPOOL\<name of the pool>`. Par exemple, l'utilisateur pour le DefaultAppPool serait `IIS APPPOOL\DefaultAppPool`.

Cela peut être effectué soit depuis l'IU "Computer Management", soit depuis un invité de commande d'administrateur :

```shell
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-danger">Les métriques d'exécution pour PHP ne sont pas prises en charge.</div>

{{% /tab %}}
{{% tab "C++" %}}

<div class="alert alert-danger">Les métriques d'exécution pour C++ ne sont pas prises en charge.</div>

{{% /tab %}}
{{< /tabs >}}

## Instructions d'installation {#setup-instructions}

Pour configurer les métriques runtime, vous devez configurer à la fois l'Agent Datadog et votre application.

### 1. Configurer l'Agent Datadog {#1-configure-the-datadog-agent}

Activer [DogStatsD pour l'Agent][2]. Par défaut, l'Agent Datadog est configuré pour ingérer des métriques via UDP sur le port `8125`.

{{% collapse-content title="Configuration spécifique au conteneur" level="h4" expanded=false %}}

Lors de l'exécution de l'Agent dans des environnements conteneurisés, une configuration supplémentaire est nécessaire :

1. Vérifiez que le trafic non local de DogStatsD est activé. Ce paramètre est activé par défaut. Si vous l'avez désactivé précédemment, définissez `dogstatsd_non_local_traffic: true` dans votre fichier de configuration principal [`datadog.yaml`][8], ou définissez la [variable d'environnement][3] `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true`.
2. Suivez ces instructions de configuration spécifiques au conteneur :

{{< partial name="apm/apm-runtime-metrics-containers.html" >}}

<br>

{{< site-region region="us3,us5,eu,gov,gov2,ap1,ap2" >}}

3. Définissez `DD_SITE` dans l'Agent Datadog pour {{< region-param key="dd_site" code="true" >}} pour garantir que l'Agent envoie les données vers l'emplacement Datadog approprié.

{{< /site-region >}}

{{% /collapse-content %}}

### 2. Configurez votre application {#2-configure-your-application}

Configurez les métriques d'exécution dans votre application en utilisant des variables d'environnement. Certaines langues prennent également en charge la configuration des métriques d'exécution [directement dans le code](#code-based-configuration).

#### Variables d'environnement {#environment-variables}

Utilisez les variables d'environnement suivantes pour configurer les métriques runtime dans votre application :

`DD_RUNTIME_METRICS_ENABLED`
: **Par défaut**: `true` pour Java et .NET 6+ (v3.40.0+), `false` pour tous les autres langages et environnements d'exécution. <br>
**Description**: Active la collecte de métriques d'exécution. Les métriques sont envoyées à l'agent Datadog, comme configuré pour l'application instrumentée.

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`
: **Par défaut**: `true` pour Java, `false` pour Node.js, Ruby et Python. N'existe pas pour .NET et Go ; le `runtime_id` est toujours signalé. <br>
**Description** : Active des métriques d'exécution améliorées, fournissant un `runtime_id` tag avec chaque métrique. Le `runtime_id` représente l'identifiant de processus de l'application et vous permet de corréler directement les métriques d'exécution avec les applications en cours d'exécution individuelles. 

`DD_AGENT_HOST`
: **Par défaut** : `localhost` <br>
**Description** : Définit l'adresse hôte pour la soumission des métriques du SDK. Peut être un nom d'hôte ou une adresse IP.

`DD_DOGSTATSD_PORT`
: **Par défaut** : `8125` <br>
**Description** : Définit le port pour la soumission des métriques du SDK.

`DD_RUNTIME_METRICS_DIAGNOSTICS_METRICS_API_ENABLED`
: **Par défaut**: `true` démarrage du traceur v3.40.0+ sur .NET 8+ et (.NET 6/7 lorsque `DD_RUNTIME_METRICS_ENABLED` n'est pas explicitement défini), sinon `false`. <br>
**Description**: Disponible à partir de .NET 6. Cela contrôle si le traceur .NET utilise la nouvelle [`System.Diagnostics.Metrics`][9] API pour collecter les métriques au lieu du collecteur basé sur `EventListener`.

#### Configuration basée sur le code {#code-based-configuration}

En plus des variables d'environnement, certains langages permettent de configurer les métriques runtime directement dans le code.

{{< tabs >}}
{{% tab "Java" %}}

Vous ne pouvez activer les métriques d'exécution qu'avec [variables d'environnement](#environment-variables).

Cependant, vous pouvez étendre les métriques collectées en ajoutant des métriques JMX personnalisées. Pour plus d'informations, consultez la documentation sur [l'intégration JMX][100].

[100]: /fr/integrations/java/
{{% /tab %}}

{{% tab "Python" %}}

Vous pouvez activer les métriques d'exécution avec [variables d'environnement](#environment-variables) ou dans le code :

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

<div class="alert alert-danger">Cela ne s'applique que si vous n'utilisez pas <code>ddtrace-run</code></div>
{{% /tab %}}

{{% tab "Ruby" %}}

Vous pouvez activer les métriques d'exécution avec [variables d'environnement](#environment-variables) ou dans le code :

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog' # Use 'ddtrace' if you're using v1.x

Datadog.configure do |c|
  c.runtime_metrics.enabled = true

  # Optionally, you can configure the DogStatsD instance used for sending runtime metrics.
  # DogStatsD is automatically configured with default settings if `dogstatsd-ruby` is available.
  # You can configure with host and port of Datadog agent; defaults to 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```
{{% /tab %}}

{{% tab "Go" %}}

Vous pouvez activer les métriques d'exécution avec [variables d'environnement](#environment-variables) ou dans le code :

```go
// Basic configuration
tracer.Start(tracer.WithRuntimeMetrics())

// With custom DogStatsD address
tracer.Start(
  tracer.WithRuntimeMetrics(),
  tracer.WithDogstatsdAddr("custom-host:8125")
)
```

L'option `WithDogstatsdAddr` vous permet de spécifier une adresse personnalisée pour le serveur DogStatsD. Utilisez l'option [`WithDogstatsdAddr`][101] (ou [`WithDogstatsdAddress` v1][100]) si votre adresse diffère de la `localhost:8125` par défaut. (Disponible pour 1.18.0+)

[100]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[101]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddr
{{% /tab %}}

{{% tab "Node.js" %}}

Vous pouvez activer les métriques d'exécution avec [variables d'environnement](#environment-variables) ou dans le code :

```js
const tracer = require('dd-trace').init({
  // Other tracer options...
  runtimeMetrics: true
})
```
{{% /tab %}}

{{% tab ".NET" %}}

Vous ne pouvez activer les métriques d'exécution qu'avec [variables d'environnement](#environment-variables).

{{% /tab %}}
{{< /tabs >}}

## Tableaux de bord {#dashboards}

Une fois la configuration terminée, vous pouvez afficher les métriques runtime dans :

- La page de détails du service instrumenté
- L'onglet du graphique de flamme **Métriques**
- Tableaux de bord d'exécution par défaut

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="Trace d'exécution JVM" >}}

## Dépannage {#troubleshooting}
- Pour associer les métriques d'exécution dans les graphiques de flamme, assurez-vous que le tag `env` (sensible à la casse) est défini et correspond à travers votre environnement.
- Pour que les métriques d'exécution apparaissent sur la page du service lors de l'utilisation de Fargate, assurez-vous que `DD_DOGSTATSD_TAGS` est défini sur votre tâche Agent, et que le tag `env` configuré correspond à `env` du service instrumenté.

## Données collectées {#data-collected}

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

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/extend/dogstatsd/#setup
[3]: /fr/agent/docker/#dogstatsd-custom-metrics
[7]: /fr/extend/dogstatsd/unix_socket/
[8]: /fr/agent/configuration/agent-configuration-files/#main-configuration-file
[9]: https://learn.microsoft.com/dotnet/api/system.diagnostics.metrics
[10]: /fr/opentelemetry/integrations/runtime_metrics/