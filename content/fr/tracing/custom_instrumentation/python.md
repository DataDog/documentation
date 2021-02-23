---
title: Instrumentation personnalisée Python
kind: documentation
aliases:
  - /fr/tracing/opentracing/python
  - /fr/tracing/manual_instrumentation/python
decription: Instrumentez manuellement votre application Python afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
<div class="alert alert-info">
Si vous n'avez pas encore lu les instructions sur l'instrumentation automatique et la configuration, commencez par lire la section <a href="https://docs.datadoghq.com/tracing/setup/python/">Tracer des applications Python</a>.
</div>

SI vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

Vous pouvez également choisir d'accroître les fonctionnalités de la bibliothèque `ddtrace` ou de contrôler plus précisément l'instrumentation de votre application. La bibliothèque propose plusieurs méthodes afin d'y parvenir.

## Création de spans

La bibliothèque `ddtrace` crée automatiquement des spans avec `ddtrace-run` pour [un grand nombre de frameworks et bibliothèques][1]. Toutefois, si vous souhaitez bénéficier d'une visibilité accrue sur votre propre code, utilisez des spans.

Dans votre requête Web (par exemple, `make_sandwich_request`), vous pouvez effectuer plusieurs opérations, comme `get_ingredients()` et `assemble_sandwich()`, particulièrement utiles pour les mesures.

```python
def make_sandwich_request(request):
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
```

{{< tabs >}}
{{% tab "Décorateur" %}}

`ddtrace` fournit un décorateur `tracer.wrap()`. Il sert à décorer les fonctions pertinentes. Cette approche vous permet de tracer une fonction, peu importe l'origine de son appel.


```python
  from ddtrace import tracer

  @tracer.wrap()
  def get_ingredients():
      # ouvrir le placard
      # vérifier le frigo
      # aller éventuellement faire des courses
      return

  # Vous pouvez indiquer des informations supplémentaires afin de personnaliser la span
  @tracer.wrap("assemble_sandwich", service="my-sandwich-making-svc")
  def assemble_sandwich(ingredients):
      return
```

Cliquez [ici][1] pour consulter les détails sur l'API concernant le décorateur pour `ddtrace.Tracer.wrap()`.


[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.wrap
{{% /tab %}}
{{% tab "Gestionnaire de contextes" %}}

Pour tracer un bloc arbitraire de code, utilisez le gestionnaire de contextes `ddtrace.Span` comme ci-dessous. Vous pouvez également consulter la [documentation sur l'utilisation avancée de ddtrace][1] (en anglais).

```python
from ddtrace import tracer

def make_sandwich_request(request):
    # Capturer les deux opérations au sein d'une span
    with tracer.trace("sandwich.make"):
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)

def make_sandwich_request(request):
    # Capturer les deux opérations au sein d'une span
    with tracer.trace("sandwich.create") as outer_span:
        with tracer.trace("get_ingredients") as span:
            ingredients = get_ingredients()

        with tracer.trace("assemble_sandwich") as span:
            sandwich = assemble_sandwich(ingredients)
```

Cliquez [ici][2] pour obtenir tous les détails sur l'API pour `ddtrace.Tracer()`.

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#tracer
{{% /tab %}}
{{% tab "Méthode manuelle" %}}

Si l'utilisation du décorateur et du gestionnaire de contextes ne vous permet pas de répondre à vos besoins en tracing, vous pouvez utiliser l'API manuelle fournie afin d'initialiser des [spans][1] et d'y mettre fin comme bon vous semble :

```python

def make_sandwich_request(request):
    span = tracer.trace("sandwich.create")
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
    span.finish()  # Bien fermer la span
```

Pour obtenir plus de détails sur l'API pour le décorateur, consultez la documentation relative à [ddtrace.Tracer.trace][2] ou à [ddtrace.Span.finish][3].



[1]: /fr/tracing/visualization/#spans
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.trace
[3]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{< /tabs >}}


## Accès aux spans actives

L'instrumentation intégrée et votre instrumentation personnalisée créent des spans autour des opérations pertinentes. Vous pouvez accéder à la span active afin d'y inclure des données utiles.

```python
from ddtrace import tracer

def make_sandwich_request(request):
    # Capturer les deux opérations au sein d'une span
    with tracer.trace("sandwich.make") as my_span:
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)
```

{{< tabs >}}
{{% tab "Span active" %}}

```python
def get_ingredients():
    # Récupérer la span active
    span = tracer.current_span()
    # Cette span correspond à my_span pour l'option make_sandwich_request précédente
```

{{% /tab %}}

{{% tab "Span racine" %}}

```python
def assemble_sandwich(ingredients):
    with tracer.trace("another.operation") as another_span:
        # Récupérer la span racine active
        span = tracer.current_root_span()
        # Cette span correspond à my_span pour l'option make_sandwich_request précédente
```
{{% /tab %}}
{{< /tabs >}}


## Ajout de tags

{{< tabs >}}
{{% tab "Ajout local" %}}

Vous pouvez ajouter des tags à une span en utilisant la méthode `set_tag` sur cette span :

```python
from ddtrace import tracer

def make_sandwich_request(request):
    with tracer.trace("sandwich.make") as span:
        ingredients = get_ingredients()
        span.set_tag("num_ingredients", len(ingredients))
```
{{% /tab %}}
{{% tab "Ajout global" %}}

Vous pouvez définir de façon globale des tags sur le traceur. Ces tags seront appliqués à chaque span créée.

```python
from ddtrace import tracer
from myapp import __version__

# Cela sera appliqué à chaque span
tracer.set_tags({"version": __version__, "<CLÉ_TAG_2>": "<CLÉ_VALEUR_2>"})
```
{{% /tab %}}
{{% tab "Erreurs" %}}

Les informations sur les exceptions sont capturées et ajoutées à une span lorsque celle-ci est active au moment du déclenchement de l'exception.

```python
from ddtrace import tracer

with tracer.trace("throws.an.error") as span:
    raise Exception("Oups !")

# `span` renvoie une erreur.
# La stack trace et le message de l'exception sont alors ajoutés à la span en tant que tags.
```

Vous pouvez également signaler manuellement qu'une span est erronée :

```python
from ddtrace import tracer

span = tracer.trace("operation")
span.error = 1
span.finish()
```
{{% /tab %}}
{{< /tabs >}}

## Filtrage de ressources

Il est possible d'exclure des traces en fonction de leur nom de ressource afin d'empêcher le trafic Synthetic (tel que les checks de santé) d'envoyer des traces à Datadog. Pour filtrer des ressources et configurer d'autres paramètres de sécurité et de personnalisation, accédez à la page [Securité][2].

## OpenTracing

La prise en charge d'OpenTracing est incluse dans le package `ddtrace`. Utilisez `pip` pour installer le package `opentracing` requis :

```sh
pip install ddtrace[opentracing]
```

Pour initialiser un traceur, OpenTracing définit une méthode d'initialisation qui configure et instancie un nouveau traceur et remplace la référence `opentracing.tracer` globale :

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      "agent_hostname": "localhost",
      "agent_port": 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span("<NOM_OPÉRATION>")
  span.set_tag("<KEY_TAG>", "<VALUE_TAG>")
  time.sleep(0.05)
  span.finish()

init_tracer("<NOM_SERVICE>")
my_operation()
```

Le traceur peut désormais être utilisé comme dans toute autre application OpenTracing. Consultez le site [opentracing.io][3] (en anglais) pour en savoir plus sur l'utilisation de Python avec OpenTracing.

## OpenTelemetry

La prise en charge d'OpenTelemetry est disponible via le package `opentelemetry-ext-datadog` pour exporter les traces d'OpenTelemetry vers Datadog.

<div class="alert alert-warning">
Cette fonctionnalité est actuellement en version bêta. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> si elle ne fonctionne pas correctement.
</div>

### Installation

Pour l'installer :

```python
pip install opentelemetry-ext-datadog
```

### Utilisation

Installez le processeur et l'exportateur Datadog dans votre application et configurez les options. Ensuite, utilisez les interfaces OpenTelemetry pour générer des traces et d'autres informations :

```python
from opentelemetry import trace
from opentelemetry.ext.datadog import (
    DatadogExportSpanProcessor,
    DatadogSpanExporter,
)
from opentelemetry.sdk.trace import TracerProvider

trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

exporter = DatadogSpanExporter(
    agent_url="http://localhost:8126", service="example"
)

span_processor = DatadogExportSpanProcessor(exporter)
trace.get_tracer_provider().add_span_processor(span_processor)


with tracer.start_as_current_span("foo"):
    with tracer.start_as_current_span("bar"):
        with tracer.start_as_current_span("baz"):
            print("Hello world from OpenTelemetry Python!")
```

### Options de configuration

Si nécessaire, l'URL de l'Agent Datadog et les valeurs des tags de span peuvent être configurées en fonction de l'emplacement de l'Agent et de votre environnement.

#### URL de l'Agent Datadog

Par défaut, l'exportateur Datadog pour OpenTelemetry envoie les traces à l'URL `http://localhost:8126`. Pour les envoyer vers une autre URL, configurez les variables d'environnement suivantes :

- `DD_TRACE_AGENT_URL` : le `<host>:<port>` où l'Agent Datadog écoute les traces. Par exemple, `agent-host:8126`.

Vous pouvez également remplacer ces valeurs au niveau de l'exportateur de traces :

```python
exporter = DatadogSpanExporter(
    agent_url="http://dd-agent:8126", service="example"
)
```

#### Tagging

Configurez l'application de façon à taguer automatiquement vos traces exportées Datadog en définissant les variables d'environnement suivantes :

- `DD_ENV` : l'environnement de votre application (p. ex. `production`, `staging`).
- `DD_SERVICE` : le nom de service par défaut de votre application (p. ex. `billing-api`).
- `DD_VERSION` : la version de votre application (p. ex. `2.5`, `202003181415` ou `1.3-alpha`).
- `DD_TAGS` : tags personnalisés sous forme de paires de valeurs séparées par des virgules (p. ex. `layer:api,team:intake`).
- Si la variable `DD_ENV`, `DD_SERVICE` ou `DD_VERSION` est définie, tout tag `env`, `service` ou `version` correspondant défini dans `DD_TAGS` sera remplacé.
- Si les variables `DD_ENV`, `DD_SERVICE` et `DD_VERSION` ne sont _pas_ définies, vous pouvez configurer l'environnement, le service et la version à l'aide des tags correspondants dans `DD_TAGS`.

Les valeurs de tag peuvent également être remplacées au niveau de l'exportateur de traces. Cela vous permet de définir des valeurs différentes pour chaque application. De cette façon, il est possible de recevoir des données à partir de plusieurs applications issues d'environnements différents sur un même host :

```python
exporter = DatadogSpanExporter(
    agent_url="http://dd-agent:8126",
    service="example",
    env='prod',
    version='1.5-alpha',
    tags='team:ops,region:west'
)

```

Les tags qui sont définis directement sur des spans spécifiques remplacement les tags définis au niveau de l'application en cas de conflit.

### Liens OpenTelemetry

- Consultez [Github][4], les [exemples OpenTelemetry][5] ou [readthedocs][6] pour en savoir plus sur l'utilisation de l'exportateur Datadog pour OpenTelemetry dans une application Python.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/python
[2]: /fr/tracing/security
[3]: https://opentracing.io/guides/python/
[4]: https://github.com/open-telemetry/opentelemetry-python/tree/main/ext/opentelemetry-ext-datadog
[5]: https://github.com/open-telemetry/opentelemetry-python/tree/main/docs/examples/datadog_exporter
[6]: https://opentelemetry-python.readthedocs.io/en/stable/ext/datadog/datadog.html