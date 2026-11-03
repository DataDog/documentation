---
description: Configurez le Datadog Agent et votre application pour émettre et visualiser
  les métriques d'évaluation des indicateurs de fonctionnalité côté serveur.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /feature_flags/concepts/flag_graphs/
  tag: Documentation
  text: Graphiques des Feature Flags
- link: /metrics/
  tag: Documentation
  text: Métriques
- link: /dashboards/
  tag: Documentation
  text: Dashboards
title: Configurer les métriques d'évaluation des Feature Flags côté serveur
---
## Présentation {#overview}

Les métriques d'évaluation des indicateurs de fonctionnalité vous permettent de mesurer la fréquence à laquelle chaque variante d'un indicateur de fonctionnalité est renvoyée par votre application côté serveur. Utilisez ces métriques pour suivre l'adoption des indicateurs de fonctionnalité au fil du temps, vérifier que les règles de ciblage fonctionnent comme prévu et représenter graphiquement les données d'évaluation des indicateurs de fonctionnalité sur des dashboards.

<div class="alert alert-warning">Le <code>feature_flag.evaluations</code> La métrique est expérimentale et peut être modifiée ou supprimée dans une future version.</div>

<div class="alert alert-info">Le <code>feature_flag.evaluations</code> La métrique est distincte des événements d'exposition aux expériences et des événements d'évaluation des indicateurs de fonctionnalité du proxy de plateforme d'événements (EVP). La sortie des événements d'exposition et EVP utilise l'URL de traceur standard sur le port 8126. Cette métrique utilise un endpoint OTLP sur le port 4317 ou 4318.</div>

## Prérequis {#prerequisites}

Avant de configurer les métriques d'évaluation des indicateurs de fonctionnalité, confirmez les points suivants :

- Les [indicateurs de fonctionnalité côté serveur][1] sont déjà configurés.
- Pour les déploiements basés sur l'Agent, Datadog Agent 7.32.0 ou une version ultérieure est en cours d'exécution et peut recevoir des métriques OTLP.
- Pour les déploiements sans serveur sans Agent, votre plateforme dispose d'un chemin de télémétrie sans serveur pris en charge configuré.
- Pour les environnements sans serveur Java, Node.js et Python, consultez [Envoyer la télémétrie des indicateurs de fonctionnalité][7].
- Pour les configurations basées sur l'Agent qui utilisent l'ancien chemin d'activation, `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` est défini sur votre application.
- Votre traceur côté serveur respecte la version minimale pour la prise en charge des métriques d'évaluation des indicateurs de fonctionnalité :

| Langage | Version minimale du traceur |
| -------- | ---------------------- |
| .NET     | 3.44.0                 |
| Go       | 2.8.0                  |
| Java     | 1.62.0                 |
| Node.js  | 5.99.0                 |
| PHP      | 1.21.1                 |
| Python   | 4.7.0                  |
| Ruby     | 2.32.0                 |

La livraison de configuration Agentless et cette métrique utilisent des chemins indépendants. Un SDK sans agent peut émettre la métrique lorsque vous configurez le chemin OTLP requis via une configuration de télémétrie prise en charge, basée sur un Agent ou sans serveur.

## Étape 1 : Configurez un récepteur OTLP {#step-1-configure-an-otlp-receiver}

Les métriques d'évaluation des indicateurs de fonctionnalité sont émises via OpenTelemetry (OTLP). Pour les déploiements basés sur un agent, activez le récepteur OTLP du Datadog Agent, qui est désactivé par défaut. Pour les instructions de configuration, consultez [Ingestion OTLP par le Datadog Agent][2]. Pour les déploiements serverless sans Agent, utilisez le chemin OTLP ou les métriques personnalisées pris en charge par votre configuration de Serverless Monitoring.

Vous devez uniquement activer le protocole utilisé par votre application (gRPC sur le port 4317 ou HTTP sur le port 4318).

<div class="alert alert-info">Si vous exécutez l'Agent v7.61.0 ou une version ultérieure dans Docker, définissez <code>HOST_PROC=/proc</code> sur le conteneur de l'Agent pour contourner un problème connu avec le pipeline OTLP.</div>

## Étape 2 : Configurez votre application {#step-2-configure-your-application}

Pour les combinaisons de traceur et de mode de livraison prises en charge, à l'exception de Java, définissez la variable d'environnement suivante en plus de la configuration des indicateurs de fonctionnalité côté serveur standard [1]. Pour Java, `DD_METRICS_OTEL_ENABLED` n'a aucun effet ; consultez plutôt la section [Java : Ajoutez les dépendances du SDK OpenTelemetry](#java-add-the-opentelemetry-sdk-dependencies).

{{< code-block lang="bash" >}}
# Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

### Java : Ajoutez les dépendances du SDK OpenTelemetry {#java-add-the-opentelemetry-sdk-dependencies}

Le fournisseur Java enregistre `feature_flag.evaluations` via le SDK OpenTelemetry et l'exporte via OTLP, les dépendances `opentelemetry-sdk-metrics` et `opentelemetry-exporter-otlp` doivent donc figurer dans le classpath de votre application. Ajoutez-les avec vos [dépendances d'indicateurs de fonctionnalité Java][6]. Importez le BOM OpenTelemetry afin que l'API et le SDK OpenTelemetry restent sur la même version :

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation platform('io.opentelemetry:opentelemetry-bom:1.47.0')
    implementation 'io.opentelemetry:opentelemetry-sdk-metrics'
    implementation 'io.opentelemetry:opentelemetry-exporter-otlp'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    implementation(platform("io.opentelemetry:opentelemetry-bom:1.47.0"))
    implementation("io.opentelemetry:opentelemetry-sdk-metrics")
    implementation("io.opentelemetry:opentelemetry-exporter-otlp")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
{{< code-block lang="xml" filename="pom.xml" >}}
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.opentelemetry</groupId>
            <artifactId>opentelemetry-bom</artifactId>
            <version>1.47.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk-metrics</artifactId>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-otlp</artifactId>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Sur le traceur Java, le fournisseur démarre automatiquement son exportateur de métriques OTLP lorsque le SDK OpenTelemetry est dans le classpath. Si les dépendances sont manquantes, aucune métrique n'est émise et le traceur journalise `OpenTelemetry SDK is not on the classpath`.

<div class="alert alert-info">Dans les applications Spring Boot, l'autoconfiguration OpenTelemetry de Spring Boot crée également un <code>OpenTelemetrySdk</code> bean. Si la version du SDK OpenTelemetry qu'il résout ne correspond pas à la version de l'API OpenTelemetry sur le classpath, le démarrage échoue avec un <code>BeanCreationException</code> pour le <code>openTelemetry</code> bean et <code>NoClassDefFoundError: io/opentelemetry/sdk/internal/ScopeConfigurator</code>. L'importation du <code>opentelemetry-bom</code> comme indiqué ci-dessus maintient l'API et le SDK sur la même version et résout l'erreur.</div>

### Ruby : Ajoutez les gems de métriques OpenTelemetry {#ruby-add-the-opentelemetry-metrics-gems}

Pour les applications Ruby, ajoutez les gems du SDK de métriques OpenTelemetry et de l'exportateur de métriques OTLP à votre bundle d'application :

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "opentelemetry-metrics-sdk", ">= 0.8"
gem "opentelemetry-exporter-otlp-metrics", ">= 0.4"
{{< /code-block >}}

Installez les gems avec `bundle install`. Ces gems fournissent le fournisseur de mesure OpenTelemetry et l'exportateur de métriques OTLP. Le traceur Ruby les utilise lorsque `DD_METRICS_OTEL_ENABLED=true` est défini. Si les gems sont manquants, le traceur Ruby n'émet pas de métriques `feature_flag.evaluations` et journalise `Failed to load OpenTelemetry metrics gems`.

### Configuration du endpoint {#endpoint-configuration}

`DD_TRACE_AGENT_URL` et l'écouteur `serverless-init` standard sur le port 8126 ne configurent pas l'endpoint de métrique OTLP. Configurez l'endpoint OTLP séparément, comme décrit dans la section suivante. Pour les déploiements serverless sans Agent, suivez la configuration de Serverless Monitoring pour votre plateforme avant de configurer cette métrique.

Par défaut, la plupart des traceurs envoient les métriques OTLP à l'Agent à `DD_AGENT_HOST` sur le port `4318` (HTTP). Si votre application définit déjà `DD_AGENT_HOST` pour atteindre l'Agent, aucune configuration d'endpoint n'est requise.

Définissez explicitement un endpoint OTLP dans l'un des cas suivants :

- L'Agent n'est pas accessible à `DD_AGENT_HOST` sur le port OTLP par défaut (par exemple, un Agent distant ou un port non par défaut).
- Vous utilisez le traceur **Java**. Son exportateur de métriques d'évaluation des indicateurs de fonctionnalité prend uniquement en charge OTLP/HTTP (gRPC n'est pas pris en charge) sur le port `4318`. Le traceur Java ne dérive pas l'endpoint de `DD_AGENT_HOST` et utilise `http://localhost:4318` par défaut. Définissez `OTEL_EXPORTER_OTLP_ENDPOINT` sur l'endpoint HTTP de l'Agent lorsque l'Agent n'est pas sur `localhost`.
- Vous utilisez le traceur **Python**. Le traceur Python utilise gRPC par défaut sur le port `4317`, et non HTTP. Activez le récepteur OTLP gRPC sur l'Agent, ou remplacez le protocole pour utiliser HTTP à la place :

{{< code-block lang="bash" >}}
OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
{{< /code-block >}}

Pour définir l'endpoint, utilisez la variable OpenTelemetry standard :

{{< code-block lang="bash" >}}
# Point OTLP data at the Datadog Agent (HTTP, port 4318)
OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4318

# Or use gRPC (port 4317). For most tracers, the default protocol is http/protobuf,
# so set the protocol explicitly when switching to gRPC:
# OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4317
# OTEL_EXPORTER_OTLP_PROTOCOL=grpc
{{< /code-block >}}

Remplacez `<AGENT_HOST>` par le nom de host ou l'adresse IP de votre Datadog Agent.

Exemple Docker Compose :

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
services:
  datadog-agent:
    environment:
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT=0.0.0.0:4317
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT=0.0.0.0:4318
      - HOST_PROC=/proc  # If running Agent v7.61.0+ in Docker

  app-go:
    environment:
      - DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
      - DD_METRICS_OTEL_ENABLED=true
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://datadog-agent:4318
    depends_on:
      datadog-agent:
        condition: service_healthy
{{< /code-block >}}

## Étape 3 : Vérifiez que les métriques circulent {#step-3-verify-metrics-are-flowing}

Après le déploiement, confirmez que les métriques atteignent Datadog :

1. Accédez à [Metrics Explorer][3] et recherchez `feature_flag.evaluations`.
2. Si la métrique n'apparaît pas quelques minutes après que votre application a évalué les indicateurs de fonctionnalité, vérifiez :
   - Le récepteur OTLP de l'Agent est activé et le port correct est exposé.
   - `OTEL_EXPORTER_OTLP_ENDPOINT` pointe vers l'Agent, et non vers un collecteur distinct.
   - Votre application évalue activement les indicateurs de fonctionnalité avec un SDK serveur au moment de l'exécution (le chemin du code est en cours d'exécution).

## Étape 4 : Activez la rétention des métriques {#step-4-enable-metric-retention}

Par défaut, `feature_flag.evaluations` ne conserve qu'une heure de données. Pour conserver un historique plus long :

1. Accédez à [Metrics Summary][4] et recherchez `feature_flag.evaluations`.
2. Sélectionnez la métrique et activez **Historical Metrics**.

Il s'agit d'un paramètre optionnel qui n'est pas activé automatiquement pour les métriques OTLP.

## Représentez graphiquement les évaluations des indicateurs de fonctionnalité sur un dashboard {#graph-flag-evaluations-on-a-dashboard}

Utilisez la requête suivante pour représenter graphiquement les évaluations des indicateurs de fonctionnalité par clé d'indicateur de fonctionnalité et par variante sur un [dashboard][5] :

{{< code-block lang="text" >}}
sum:feature_flag.evaluations{*} by {feature_flag.key,feature_flag.result.variant}
{{< /code-block >}}

La métrique `feature_flag.evaluations` est un compteur avec les tags suivants :

| Tag                                  | Description                                        |
| ------------------------------------ | -------------------------------------------------- |
| `feature_flag.key`                   | La clé de l'indicateur de fonctionnalité en cours d'évaluation |
| `feature_flag.result.variant`        | La variante renvoyée par l'évaluation             |
| `feature_flag.result.reason`         | La raison du résultat de l'évaluation               |
| `feature_flag.result.allocation_key` | L'identifiant des règles de ciblage évaluées (émis uniquement lorsqu'il est présent) |
| `error.type`                         | Le type d'erreur (émis uniquement lors des évaluations en erreur) |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/feature_flags/server/
[2]: /fr/opentelemetry/setup/otlp_ingest_in_the_agent/
[3]: https://app.datadoghq.com/metric/explorer
[4]: https://app.datadoghq.com/metric/summary
[5]: /fr/dashboards/
[6]: /fr/feature_flags/server/java/#installation
[7]: /fr/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry