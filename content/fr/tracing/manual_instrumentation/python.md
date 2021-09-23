---
title: Instrumentation personnalisée Python
kind: documentation
aliases:
  - /fr/tracing/opentracing/python
decription: Instrumentez manuellement votre application Python afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
{{< alert type="info" >}}
Si vous n'avez pas encore lu les instructions sur l'instrumentation automatique et la configuration, commencez par lire la section <a href="https://docs.datadoghq.com/tracing/setup/python/">Tracer des applications Python</a>.
{{< /alert >}}

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

Cliquez [ici][2] pour consulter tous les détails sur l'API pour `ddtrace.Tracer()`.

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
tracer.set_tag("version", __version__)
```
{{% /tab %}}
{{% tab "Erreurs" %}}

Les informations sur les exceptions sont capturées et ajoutées à une span lorsque celle-ci est active au moment du déclenchement de l'exception.

```python
from ddtrace import tracer

with tracer.trace("throws.an.error") as span:
    raise Exception("Oups !")

# `span` renvoie une erreur.
# La trace de pile et le message d'exception sont alors ajoutés à la span en tant que tags.
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

Le traceur peut désormais être utilisé comme dans toute autre application OpenTracing. Consultez le site [opentracing.io][2] (en anglais) pour en savoir plus sur l'utilisation de Python avec OpenTracing.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/python
[2]: https://opentracing.io/guides/python/
