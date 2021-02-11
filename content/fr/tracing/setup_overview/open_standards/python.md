---
title: Standards ouverts Python
kind: documentation
description: 'Standards ouverts pour Python'
code_lang: python
type: multi-code-lang
code_lang_weight: 10
---

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

Le traceur peut désormais être utilisé comme dans toute autre application OpenTracing. Consultez le site [opentracing.io][1] (en anglais) pour en savoir plus sur l'utilisation de Python avec OpenTracing.

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

- Consultez [Github][2], les [exemples OpenTelemetry][3] ou [readthedocs][4] pour en savoir plus sur l'utilisation de l'exportateur Datadog pour OpenTelemetry dans une application Python.

[1]: https://opentracing.io/guides/python/
[2]: https://github.com/open-telemetry/opentelemetry-python/tree/main/ext/opentelemetry-ext-datadog
[3]: https://github.com/open-telemetry/opentelemetry-python/tree/main/docs/examples/datadog_exporter
[4]: https://opentelemetry-python.readthedocs.io/en/stable/ext/datadog/datadog.html
