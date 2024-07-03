---
aliases:
- /fr/tracing/trace_ingestion/mechanisms
description: Présentation des mécanismes dans le traceur et l'Agent qui contrôlent
  l'ingestion de traces.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Paramètres d'ingestion
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Rétention des traces
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Métriques d'utilisation
title: Mécanismes d'ingestion
---

{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Règles d'échantillonnage de l'ingestion" >}}


Plusieurs mécanismes déterminent si les spans générées par vos applications sont envoyées à Datadog (ingérées). La logique derrière ces mécanismes réside dans les [bibliothèques de tracing][1] et l'Agent Datadog. Selon la configuration choisie, la totalité ou une partie du trafic généré par les services instrumentés est ingérée.

Pour chaque span ingérée, un unique **motif d'ingestion** y est associé, faisant référence à l'un mécanismes décrits dans cette page. Les [métriques d'utilisation][2] `datadog.estimated_usage.apm.ingested_bytes` et `datadog.estimated_usage.apm.ingested_spans` reçoivent le tag `ingestion_reason`.

Utilisez le [dashboard des motifs d'ingestion][3] pour étudier chaque motif d'ingestion dans son contexte. Visualisez l'évolution du volume attribué à chaque mécanisme pour savoir rapidement quelles options de configuration doivent être modifiées.

## Échantillonnage en amont

L'_échantillonnage en amont_ constitue le mécanisme par défaut. La décision de conserver ou de rejeter la trace est prise au tout début du cycle de vie de la trace, à la création de la [span racine][4]. Cette décision est ensuite propagée vers les autres services par l'intermédiaire du contexte de la requête (par exemple, sous la forme d'un en-tête de requête HTTP).

La décision est prise au début de la trace, puis transmise à toutes les étapes de la trace. Ainsi, vous êtes certains de conserver ou d'ignorer l'ensemble de la trace.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Échantillonnage en amont" style="width:100%;" >}}

Vous pouvez définir les taux d'échantillonnage pour l'échantillonnage en amont à deux endroits :
- Au niveau de l'**[Agent](#dans-l-agent)** (par défaut)
- Au niveau de la **[bibliothèque de tracing](#dans-les-bibliotheques-de-tracing-regles-definies-par-l-utilisateur)** : tout mécanisme d'une bibliothèque de tracing est prioritaire sur la configuration de l'Agent.

### Dans l'Agent
`ingestion_reason: auto`

L'Agent Datadog envoie en continu aux bibliothèques de tracing les taux d'échantillonnage à appliquer à la racine des traces. L'Agent ajuste les taux pour atteindre un objectif global de dix traces par seconde, réparties entre les services en fonction du trafic.

Par exemple, si le service `A` génère plus de trafic que le service `B`, l'Agent peut faire varier le taux d'échantillonnage pour `A` de façon à ce que `A` ne conserve pas plus de sept traces par seconde, mais aussi faire varier le taux d'échantillonnage pour `B` de façon à ce que `B` ne conserve pas plus de trois traces par seconde, soit un total de 10 traces par seconde.

#### Configuration à distance

<div class="alert alert-warning">La fonctionnalité Remote Configuration pour la configuration de l'ingestion dans l'Agent est disponible en version bêta. Contactez l'<a href="/help/">assistance Datadog</a> pour en bénéficier.</div>

La configuration du taux d'échantillonnage pour l'Agent peut être effectuée à distance, tant que vous utilisez la version [7.42.0][20] ou une version plus récente de l'Agent. Consultez l'article de blog [Fonctionnement de Remote Configuration][23] (en anglais) pour découvrir comment activer la configuration à distance dans vos Agents. Grâce à cette fonctionnalité, vous pouvez modifier le paramètre sans avoir à redémarrer l'Agent.

#### Configuration locale

Définissez le taux de traces par seconde cible de l'Agent dans son fichier de configuration principal (`datadog.yaml`) ou via une variable d'environnement suivante :
```
@param max_traces_per_second - entier - facultatif - valeur par défaut : 10
@env DD_APM_MAX_TPS - entier - facultatif - valeur par défaut : 10
```

**Remarques** : 
- Les paramètres configurés à distance prévalent sur les configurations locales, à savoir les variables d'environnement et le fichier de configuration `datadog.yaml`.
- Pour les applications PHP, utilisez plutôt les règles définies par l'utilisateur de la bibliothèque de tracing.
- Le taux d'échantillonnage des traces par seconde défini dans l'Agent s'applique uniquement aux bibliothèques de tracing Datadog autres que PHP. Il n'a aucun effet sur les autres bibliothèques de tracing, comme les SDK OpenTelemetry.

Toutes les spans d'une trace échantillonnée en utilisant les [taux d'échantillonnage automatiques](#dans-l-agent) de l'Agent Datadog reçoivent le tag de motif d'ingestion `auto`. Le tag `ingestion_reason` est également défini sur les [métriques d'utilisation][2]. Les services qui utilisent le mécanisme par défaut de l'Agent Datadog affichent l'étiquette `Automatic` dans la colonne Configuration de la [page de contrôle de l'ingestion][5].

### Dans les bibliothèques de tracing : règles définies par l'utilisateur
`ingestion_reason: rule`

Pour un contrôle plus granulaire, utilisez les options de configuration de l'échantillonnage offertes par les bibliothèques de tracing :
- Définissez un **taux d'échantillonnage spécifique à appliquer à tous les services racine** pour la bibliothèque, qui aura la priorité sur le [mécanisme par défaut de l'Agent](#dans-l-agent).
- Définissez un **taux d'échantillonnage à appliquer à des services racine spécifiques**.
- Définissez une **limite de taux** sur le nombre de traces ingérées par seconde. La limite de taux par défaut est de 100 traces par seconde et par instance de service (lorsque vous utilisez le [mécanisme par défaut de l'Agent](#dans-l-agent), la limite de taux est ignorée).

Les options d'échantillonnage peuvent uniquement être définies pour les services racine.

**Remarque** : ces règles sont aussi des paramètres d'échantillonnage en amont. Si le trafic pour un service est supérieur aux traces par seconde maximum configurées, alors les traces sont filtrées à la racine. Aucune trace incomplète n'est créée.

Les options de configuration peuvent être définies via des variables d'environnement ou directement dans le code :

{{< tabs >}}
{{% tab "Java" %}}
Pour les applications Java, définissez un taux d'échantillonnage global dans la bibliothèque avec la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez des taux d'échantillonnage pour des services spécifiques avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 20 % des traces pour le service intitulé `my-service` :

```
# avec la propriété système
java -Ddd.trace.sampling.rules='[{\"service\": \"my-service\", \"sample_rate\":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# avec des variables d'environnement
export DD_TRACE_SAMPLING_RULES=[{"service": "my-service", "sample_rate": 0.2}]
```

Le nom du service est sensible à la casse et doit correspondre à la casse du nom réel du service.

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing Java][1].

[1]: /fr/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
Pour les applications Python, définissez un taux d'échantillonnage global dans la bibliothèque avec la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez des taux d'échantillonnage pour des services spécifiques avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service appelé `my-service` et 10 % du reste des traces :

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": "my-service", "sample_rate": 0.5}]
```

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing Python][1].

[1]: /fr/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
Pour les applications Ruby, définissez un taux d'échantillonnage global pour la bibliothèque avec la variable d'environnement `DD_TRACE_SAMPLE_RATE`.

Par exemple, pour envoyer 10 % des traces, utilisez ce qui suit :

```
@env DD_TRACE_SAMPLE_RATE=0.1
```

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing Ruby][1].

[1]: /fr/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
Pour les applications Go, définissez un taux d'échantillonnage global dans la bibliothèque avec la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez des taux d'échantillonnage pour des services spécifiques avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service intitulé `my-service` et 10 % du reste des traces :

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing Go][1].

[1]: /fr/tracing/trace_collection/dd_libraries/go
{{% /tab %}}
{{% tab "Node.js" %}}
Pour les applications Node.js, définissez un taux d'échantillonnage global dans la bibliothèque avec la variable d'environnement `DD_TRACE_SAMPLE_RATE`.

Vous pouvez aussi définir des taux d'échantillonnage pour des services spécifiques. Par exemple, pour envoyer 50 % des traces pour le service intitulé `my-service` et 10 % du reste des traces :

```javascript
tracer.init({
    ingestion: {
        sampler: {
            sampleRate: 0.1,
            rules: [
                { sampleRate: 0.5, service: 'my-service' }
            ]
        }
    }
});
```

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing Node.js][1].

[1]: /fr/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
Pour les applications PHP, définissez un taux d'échantillonnage global dans la bibliothèque avec la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez des taux d'échantillonnage pour des services spécifiques avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service appelé `my-service` et 10 % du reste des traces :

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing PHP][1].

[1]: /fr/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
À partir de la version `1.3.2`, la bibliothèque C++ Datadog prend en charge les configurations suivantes :
- Taux d'échantillonnage global : variable d'environnement `DD_TRACE_SAMPLE_RATE`
- Taux d'échantillonnage par service : variable d'environnement `DD_TRACE_SAMPLING_RULES`.
- Limite de taux : variable d'environnement `DD_TRACE_RATE_LIMIT`.

Par exemple, pour envoyer 50 % des traces pour le service appelé `my-service` et 10 % du reste des traces :

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

C++ ne propose pas d'intégrations pour une instrumentation prête à l'emploi, mais est utilisé par le tracing de proxies comme Envoy, Nginx ou Istio. Pour en savoir plus sur la configuration de l'échantillonnage pour les proxies, consultez la section [Tracing d'un proxy][1].

[1]: /fr/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
Pour les applications .NET, définissez un taux d'échantillonnage global dans la bibliothèque avec la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez des taux d'échantillonnage pour des services spécifiques avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service appelé `my-service` et 10 % du reste des traces :

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing .NET][1].

[1]: /fr/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

**Remarque** : toutes les spans d'une trace échantillonnée en appliquant une configuration des bibliothèques de tracing reçoivent le motif d'ingestion `rule` en tant que tag. Les services configurés avec des règles d'échantillonnage définies par l'utilisateur affichent l'étiquette `Configured` dans la colonne Configuration de la [page de contrôle de l'ingestion][5].

## Traces error et rare

Pour les traces qui ne sont pas interceptées par l'échantillonnage en amont, deux autres mécanismes d'échantillonnage de l'Agent Datadog s'assurent que les traces essentielles et diverses sont conservées et ingérées. Ces deux échantillonneurs conservent un ensemble divers de traces locales (ensemble de spans du même host) en interceptant toutes les combinaisons d'un ensemble de tags prédéterminé :

- **Traces error** : l'échantillonnage des erreurs est important pour offrir une visibilité sur les potentiels échecs système.
- **Traces rare** : l'échantillonnage des traces rares vous permet de conserver une visibilité optimale sur l'ensemble de votre système en surveillant les services et les ressources qui ne génèrent que peu de trafic.

**Remarque** : les échantillonneurs error et rare ne sont pas appliqués sur les services qui disposent de [règles d'échantillonnage au niveau de la bibliothèque](#dans-les-bibliotheques-de-tracing-regles-definies-par-l-utilisateur).

### Traces error
`ingestion_reason: error`

L'échantillonneur error intercepte des traces qui contiennent des spans d'erreur et qui ne sont pas interceptées par l'échantillonnage en amont. Jusqu'à 10 traces par seconde (et par Agent) sont interceptées. Cet échantillonneur garantit une visibilité optimale sur les erreurs lorsque le taux d'échantillonnage en amont est faible.

À partir de la version 7.33 de l'Agent, vous pouvez configurer l'échantillonneur error dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou via les variables d'environnement :
```
@param errors_per_second - entier - facultatif - valeur par défaut : 10
@env DD_APM_ERROR_TPS - entier - facultatif - valeur par défaut : 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Échantillonnage error" style="width:100%;" >}}

**Remarques** : 
1. Définissez le paramètre sur `0` pour désactiver l'échantillonneur error.
2. L'échantillonneur error capture des traces locales avec des spans d'erreur au niveau de l'Agent. Si la trace est distribuée, il est impossible de garantir l'envoi de la trace complète à Datadog.
3. Par défaut, les spans rejetées par les règles des bibliothèques de tracing ou par une logique personnalisée telle que `manual.drop` ne sont **pas évaluées** par l'échantillonneur error.

#### Agent Datadog 7.42.0 et versions ultérieures

<div class="alert alert-warning"> Cette fonctionnalité est actuellement disponible en version bêta. Contactez l'<a href="https://www.datadoghq.com/support/">assistance Datadog</a> pour en bénéficier.</div>

Il est possible de configurer à distance l'échantillonnage rare, tant que vous utilisez la version [7.42.0][20] ou une version plus récente de l'Agent. Référez-vous à la [documentation dédiée][21] pour activer la configuration à distance dans vos Agents. Cela vous permet de recueillir des spans rare sans avoir à redémarrer l'Agent Datadog.

#### Agent Datadog 6/7.41.0 et versions supérieures

Pour remplacer le comportement par défaut, et ainsi faire en sorte que les spans rejetées par les règles des bibliothèques de tracing ou par une logique personnalisée comme `manual.drop` soient **évaluées** par l'échantillonneur error, activez la fonctionnalité correspondante dans l'Agent Datadog (ou dans le conteneur dédié à l'Agent de trace dans le pod Kubernetes de l'Agent Datadog) avec `DD_APM_FEATURES=error_rare_sample_tracer_drop`.


#### Agent Datadog 6/7.33 à 6/7.40.x

Pour ces versions de l'Agent, le comportement par défaut de l'échantillonnage error ne peut pas être modifié. Mettez à jour l'Agent Datadog afin d'installer la version 6/7.41.0 ou une version ultérieure.


### Traces rare
`ingestion_reason: rare`

L'échantillonneur rare envoie un ensemble de spans rares à Datadog. Il intercepte des combinaisons de tags `env`, `service`, `name`, `resource`, `error.type` et `http.status` à un taux maximum de 5 traces par seconde (et par Agent). Cet échantillonneur garantit une visibilité optimale sur les ressources à faible trafic lorsque le taux d'échantillonnage en amont est faible.

**Remarque** : l'échantillonneur rare capture des traces locales au niveau de l'Agent. Si la trace est distribuée, il n'y a aucun moyen de garantir que la trace complète sera envoyée à Datadog.

#### Agent Datadog 7.42.0 et versions ultérieures

<div class="alert alert-warning"> Cette fonctionnalité est actuellement disponible en version bêta. Contactez l'<a href="https://www.datadoghq.com/support/">assistance Datadog</a> pour en bénéficier.</div>

Il est possible de configurer à distance le taux d'échantillonnage error, tant que vous utilisez la version [7.42.0][20] ou une version plus récente de l'Agent. Référez-vous à la [documentation dédiée][21] pour activer la configuration à distance dans vos Agents. Cela vous permet de modifier la valeur du paramètre sans avoir à redémarrer l'Agent Datadog.

#### Agent Datadog 6/7.41.0 et versions supérieures

Par défaut, l'échantillonneur rare n'est **pas activé**.

**Remarque** : lorsqu'il est **activé**, les spans rejetées par les règles des bibliothèques de tracing ou par une logique personnalisée telle que `manual.drop` ne sont **pas évaluées** par l'échantillonneur.

Pour configurer l'échantillonneur rare, mettez à jour le paramètre `apm_config.enable_rare_sampler` dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou via la variable d'environnement `DD_APM_ENABLE_RARE_SAMPLER` :

```
@params apm_config.enable_rare_sampler - booléen - facultatif - valeur par défaut : false
@env DD_APM_ENABLE_RARE_SAMPLER - booléen - facultatif - valeur par défaut : false
```

Pour évaluer les spans rejetées par les règles des bibliothèques de tracing ou par une logique personnalisée telle que `manual.drop`, activez la fonctionnalité correspondante dans l'Agent de trace avec `DD_APM_FEATURES=error_rare_sample_tracer_drop`.


#### Agent Datadog 6/7.33 à 6/7.40.x

Par défaut, l'échantillonneur rare est activé.

**Remarque** : lorsqu'il est **activé**, les spans rejetées par les règles des bibliothèques de tracing ou par une logique personnalisée telle que `manual.drop` ne sont **pas évaluées** par l'échantillonneur. Pour inclure ces spans dans cette logique, installez la version 6.41.0/7.41.0 ou une version ultérieure de l'Agent Datadog.

Pour modifier les paramètres de l'échantillonneur rare, mettez à jour le paramètre `apm_config.disable_rare_sampler` dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou via la variable d'environnement `DD_APM_DISABLE_RARE_SAMPLER` :

```
@params apm_config.disable_rare_sampler - booléen - facultatif - valeur par défaut : false
@env DD_APM_DISABLE_RARE_SAMPLER - booléen - facultatif - valeur par défaut : false
```

## Conserver ou rejeter de force
`ingestion_reason: manual`

Le mécanisme d'échantillonnage en amont peut être contourné au niveau de la bibliothèque de tracing. Par exemple, si vous avez besoin de surveiller une transaction essentielle, vous pouvez conserver la trace associée de force. À l'inverse, pour des informations inutiles ou répétitives comme les checks de santé, vous pouvez rejeter la trace de force.

- Définissez la conservation manuelle sur une span pour indiquer que cette span et toutes ses spans enfant doivent être ingérées. La trace qui en résulte peut apparaître comme incomplète dans l'interface si la span en question n'est pas la span racine de la trace.

- Définissez le rejet manuel sur une span pour faire en sorte qu'**aucune** span enfant ne soit ingérée. Les [échantillonneurs error et rare](#traces-error-et-rare) seront ignorés par l'Agent.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Pour conserver manuellement une trace :

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // récupérer la span active à partir de la méthode tracée
        Span span = GlobalTracer.get().activeSpan();
        // toujours conserver la trace
        span.setTag(DDTags.MANUAL_KEEP, true);
        // ajouter ensuite l'implémentation de la méthode
    }
}
```

Pour rejeter manuellement une trace :

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // récupérer la span active à partir de la méthode tracée
        Span span = GlobalTracer.get().activeSpan();
        // toujours rejeter la trace
        span.setTag(DDTags.MANUAL_DROP, true);
        // ajouter ensuite l'implémentation de la méthode
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Pour conserver manuellement une trace :

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # toujours conserver la trace
    span.set_tag(MANUAL_KEEP_KEY)
    # ajouter ensuite l'implémentation de la méthode
```

Pour rejeter manuellement une trace :

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # toujours rejeter la trace
    span.set_tag(MANUAL_DROP_KEY)
    # ajouter ensuite l'implémentation de la méthode
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Pour conserver manuellement une trace :

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affecte la trace active
  # Ajouter ensuite l'implémentation de la méthode
end
```

Pour rejeter manuellement une trace :

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affecte la trace active
  # Ajouter ensuite l'implémentation de la méthode
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Pour conserver manuellement une trace :

```Go
package main

import (
    "log"
    "net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // toujours conserver cette trace :
    span.SetTag(ext.ManualKeep, true)
    // ajouter ensuite l'implémentation de la méthode

}
```

Pour rejeter manuellement une trace :

```Go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // toujours supprimer cette trace :
    span.SetTag(ext.ManualDrop, true)
    // ajouter ensuite l'implémentation de la méthode
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Pour conserver manuellement une trace :

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// toujours conserver la trace
span.setTag(tags.MANUAL_KEEP)
// ajouter ensuite l'implémentation de la méthode

```

Pour rejeter manuellement une trace :

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// toujours conserver la trace
span.setTag(tags.MANUAL_DROP)
// ajouter ensuite l'implémentation de la méthode

```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Pour conserver manuellement une trace :

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // toujours conserver cette trace
    span.SetTag(Datadog.Trace.Tags.ManualKeep, "true");
    // ajouter ensuite l'implémentation de la méthode
}
```

Pour rejeter manuellement une trace :

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // toujours rejeter cette trace
    span.SetTag(Datadog.Trace.Tags.ManualDrop, "true");
    // ajouter ensuite l'implémentation de la méthode
}
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


Pour conserver manuellement une trace :

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // toujours conserver cette trace
    $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
  }
?>
```

Pour rejeter manuellement une trace :

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // toujours rejeter cette trace
    $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
  }
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

Pour conserver manuellement une trace :

```cpp
...
#include <datadog/tags.h>
...

auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// toujours conserver cette trace
span->SetTag(datadog::tags::manual_keep, {});
// ajouter ensuite l'implémentation de la méthode
```

Pour rejeter manuellement une trace :

```cpp
...
#include <datadog/tags.h>
...

auto tracer = ...
auto another_span = tracer->StartSpan("operation_name");
// toujours supprimer cette trace

another_span->SetTag(datadog::tags::manual_drop, {});
// ajouter ensuite l'implémentation de la méthode
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

La conservation manuelle d'une trace doit avoir lieu avant la propagation du contexte. Dans le cas contraire, le système ne peut pas garantir que la totalité de la trace est conservée d'un service à un autre. La conservation manuelle d'une trace est définie au niveau du client de tracing : la trace peut donc quand même être rejetée par l'Agent ou au niveau du serveur en fonction des règles d'échantillonnage.


## Spans uniques
`ingestion_reason: single_span`

Si vous souhaitez échantillonner une span spécifique, mais que vous n'avez pas besoin de la trace complète, les bibliothèques de tracing vous permettent de définir un taux d'échantillonnage pour une span unique.

Par exemple, si vous générez des [métriques à partir de spans][6] pour surveiller des services spécifiques, vous pouvez configurer des règles d'échantillonnage des spans de façon à ce que ces métriques soient basées sur 100 % du trafic de l'application, sans avoir à ingérer 100 % des traces pour l'ensemble des requêtes qui transitent par le service.

**Remarque** : cette fonctionnalité est disponible depuis la version [7.40.0][19] de l'Agent Datadog.

{{< tabs >}}
{{% tab "Java" %}}
À partir de la [version 1.7.0][1] de la bibliothèque de tracing pour les applications Java, vous pouvez définir des règles d'échantillonnage des **spans** pour des services et des opérations spécifiques avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour recueillir 100 % des spans générées pour le service `my-service` et l'opération `http.request` à un taux maximum de 50 spans par secondes :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing Java][2].

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /fr/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
À partir de la [version 1.4.0][1] de la bibliothèque de tracing pour les applications Python, vous pouvez définir des règles d'échantillonnage des **spans** pour des services et des opérations spécifiques avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour recueillir 100 % des spans générées pour le service `my-service` et l'opération `http.request` à un taux maximum de 50 spans par secondes :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```


Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /fr/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
À partir de la [version 1.5.0][1] de la bibliothèque de tracing pour les applications Ruby, vous pouvez définir des règles d'échantillonnage des **spans** pour des services et des opérations spécifiques avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour recueillir 100 % des spans générées pour le service `my-service` et l'opération `http.request` à un taux maximum de 50 spans par secondes :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing Ruby][2].

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /fr/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
À partir de la [version 1.41.0][1] de la bibliothèque de tracing pour les applications Go, vous pouvez définir des règles d'échantillonnage des **spans** pour des services et des opérations spécifiques avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour recueillir 100 % des spans générées pour le service `my-service` et l'opération `http.request` à un taux maximum de 50 spans par secondes :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing Go][2].

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /fr/tracing/trace_collection/dd_libraries/go
{{% /tab %}}
{{% tab "Node.js" %}}
Pour les applications Node.js, vous pouvez définir des règles d'échantillonnage des **spans** pour des services et des opérations spécifiques avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour recueillir 100 % des spans générées pour le service `my-service` et l'opération `http.request` à un taux maximum de 50 spans par secondes :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing Node.js][1].

[1]: /fr/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
À partir de la [version 0.77.0][1] de la bibliothèque de tracing pour les applications PHP, vous pouvez définir des règles d'échantillonnage des **spans** pour des services et des opérations spécifiques avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour recueillir 100 % des spans générées pour le service `my-service` et l'opération `http.request` à un taux maximum de 50 spans par secondes :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing PHP][2].

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /fr/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
À partir de la [version 1.3.3][1] de la bibliothèque de tracing pour les applications C++, vous pouvez définir des règles d'échantillonnage des **spans** pour des services et des opérations spécifiques avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour recueillir 100 % des spans générées pour le service `my-service` et l'opération `http.request` à un taux maximum de 50 spans par secondes :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-opentracing-cpp/releases/tag/v1.3.3
{{% /tab %}}
{{% tab ".NET" %}}
À partir de la [version 2.18.0][1] de la bibliothèque de tracing pour les applications .NET, vous pouvez définir des règles d'échantillonnage des **spans** pour des services et des opérations spécifiques avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour recueillir 100 % des spans générées pour le service `my-service` et l'opération `http.request` à un taux maximum de 50 spans par secondes :

```
@env DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'
```

Pour en savoir plus sur les paramètres d'échantillonnage, consultez la [documentation sur la bibliothèque de tracing .NET][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /fr/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"> Le mécanisme <a href="/tracing/legacy_app_analytics/">App Analytics</a> est désormais obsolète. Pour ingérer des spans uniques sans la trace complète, utilisez la configuration d'<a href="/tracing/trace_pipeline/ingestion_mechanisms#spans-uniques">échantillonnage de spans uniques</a>. Pour ingérer les traces complètes, utilisez les configurations d'<a href="/tracing/trace_pipeline/ingestion_mechanisms#echantillonnage-en-amont">échantillonnage en amont</a> configurations.</div>

## Spans ingérées par le produit

### Traces RUM
`ingestion_reason:rum`

Une requête provenant d'une application Web ou mobile génère une trace lorsque les services backend sont instrumentés. [L'intégration d'APM avec Real User Monitoring][7] permet d'associer les requêtes des applications Web et mobile à leurs traces en backend correspondantes pour vous offrir une visibilité totale sur vos données frontend et backend depuis une seule interface.

À partir de la version `4.30.0` du SDK Browser RUM, vous pouvez contrôler les volumes ingérés et conserver un échantillon des traces en backend en configurant le paramètre d'initialisation `traceSampleRate`. Définissez `traceSampleRate` sur un nombre compris entre `0` et `100`. Si aucune valeur n'est définie pour `traceSampleRate`, 100 % des traces provenant des requêtes Browser sont envoyées à Datadog.

De la même manière, vous pouvez contrôler le taux d'échantillonnage des traces dans d'autres SDK à l'aide de paramètres équivalents :

| SDK         | Paramètre             | Version minimale    |
|-------------|-----------------------|--------------------|
| Browser     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _Le taux d'échantillonnage est indiqué sur la page Ingestion Control depuis la version [1.13.0][16]_ |
| Android     | `traceSamplingRate`   | [1.13.0][10] _Le taux d'échantillonnage est indiqué sur la page Ingestion Control depuis la version [1.15.0][17]_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _Le taux d'échantillonnage est indiqué sur la page Ingestion Control depuis la version [1.2.0][18]_  |

### Traces Synthetic
`ingestion_reason:synthetics` et `ingestion_reason:synthetics-browser`

Les tests HTTP et Browser génèrent des traces lorsque les services backend sont instrumentés. [L'intégration d'APM avec Synthetic][13] permet d'associer vos tests Synthetic à leurs traces en backend correspondantes. Identifiez directement la cause fondamentale d'un problème lorsque vous examinez une exécution de test qui a échoué en visualisant la trace générée par cette exécution de test.

Par défaut, 100 % des tests HTTP et Browser Synthetic génèrent des traces en backend.

### Autres produits

D'autres motifs d'ingestion peuvent être attribués aux spans générées par certains produits Datadog :

| Produit    | Motif d'ingestion                    | Description du mécanisme d'ingestion |
|------------|-------------------------------------|---------------------------------|
| Serverless | `lambda` et `xray`                   | Les traces reçues à partir des [applications sans serveur][14] tracées avec les bibliothèques de tracing Datadog ou l'intégration AWS X-Ray. |
| Application Security Management     | `appsec`                            | Les traces ingérées à partir des bibliothèques de tracing Datadog et identifiées comme des menaces par [ASM][15]. |

## Mécanismes d'ingestion dans OpenTelemetry
`ingestion_reason:otel`

Selon la façon dont vous avez configuré les SDK OpenTelemetry (via le Collector OpenTelemetry ou l'Agent Datadog), plusieurs méthodes de contrôle de l'échantillonnage de l'ingestion s'offrent à vous. Consultez la section [Échantillonnage de l'ingestion avec OpenTelemetry][22] afin de découvrir les options d'échantillonnage disponibles au niveau du SDK OpenTelemetry, du Collector OpenTelemetry et de l'Agent Datadog dans les différentes configurations OpenTelemetry.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/dd_libraries/
[2]: /fr/tracing/trace_pipeline/metrics/
[3]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[4]: /fr/tracing/glossary/#trace-root-span
[5]: /fr/tracing/trace_pipeline/ingestion_controls/
[6]: /fr/tracing/trace_pipeline/generate_metrics/
[7]: /fr/real_user_monitoring/connect_rum_and_traces/
[8]: https://github.com/DataDog/browser-sdk/releases/tag/v4.30.0
[9]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.11.0
[10]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.13.0
[11]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_flutter_plugin%2Fv1.0.0
[12]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.0.0
[13]: /fr/synthetics/apm/
[14]: /fr/serverless/distributed_tracing/
[15]: /fr/security/application_security/
[16]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.13.0
[17]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.15.0
[18]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.2.0
[19]: https://github.com/DataDog/datadog-agent/releases/tag/7.40.0
[20]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[21]: /fr/agent/remote_config/#enabling-remote-configuration
[22]: /fr/opentelemetry/guide/ingestion_sampling_with_opentelemetry
[23]: /fr/agent/remote_config/