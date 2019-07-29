---
categories:
  - languages
  - log collection
ddtype: library
dependencies: []
description: Instrumentez des métriques custom à partir de vos applications Python avec Datadogpy.
doc_link: 'https://docs.datadoghq.com/integrations/python/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/tracing-async-python-code/'
    tag: Blog
    text: Tracer du code Python asynchrone avec l'APM Datadog
git_integration_title: python
has_logo: true
integration_title: Python
is_public: true
kind: integration
manifest_version: '1.0'
name: python
public_title: Intégration Datadog/Python
short_description: Instrumentez des métriques custom à partir de vos applications Python avec Datadogpy.
version: '1.0'
---
## Présentation
L'intégration Python vous permet de surveiller des métriques custom en ajoutant quelques lignes de code à votre application Python. Par exemple, il peut s'agir d'une métrique qui renvoie le nombre de vues de pages ou la durée d'un appel de fonction.

## Configuration

La bibliothèque de Datadog vous aide à recueillir les métriques de vos applications Python. En savoir plus sur la bibliothèque sur [GitHub][1].

### Installation

Pour installer la bibliothèque Python de Datadog avec pip :

```
pip install datadog
```

### Collecte de métriques

Pour l'intégration Python, toutes les métriques sont des [métriques custom][2]. Pour en savoir plus sur la collecte de métriques custom, consultez les références suivantes :

* [Guide d'utilisation des métriques pour les développeurs][3]
* Documentation du référentiel de [datadogpy][1]
* [Documentation relative à l'API][4]

Voici un exemple d'instrumentation de votre code à l'aide de l'API Datadog :

```python

from datadog import initialize

options = {
    'api_key':'<VOTRE_CLÉ_API_DD>',
    'app_key':'<VOTRE_CLÉ_APP_DD>'
}

initialize(**options)

# Utilisation de l'API REST Datadog
from datadog import api

title = "Something big happened!"
text = 'And let me tell you all about it here!'
tags = ['version:1', 'application:web']

api.Event.create(title=title, text=text, tags=tags)
```

Voici un exemple d'instrumentation de votre code à l'aide du client DogStatsD :

```python
# Utilisation de Statsd, un client Python pour DogStatsd
from datadog import statsd

statsd.increment('whatever')
statsd.gauge('foo', 42)
```

Voici un exemple d'instrumentation de votre code à l'aide de ThreadStats :

```python
# ThreadStats est un autre outil de collecte et de transmission de métriques qui utilise l'API REST Datadog
from datadog import ThreadStats
stats = ThreadStats()
stats.start()
stats.increment('home.page.hits')
```

### Collecte de traces

Consultez la documentation de Datadog relative au [tracing d'applications Python][5].

### Collecte de logs

*Disponible à partir des versions > 6.0 de l'Agent*

Consultez la documentation de Datadog relative à la [collecte de logs avec Python][6].

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics
[3]: https://docs.datadoghq.com/fr/developers/metrics
[4]: https://docs.datadoghq.com/fr/api/?lang=python
[5]: https://docs.datadoghq.com/fr/tracing/setup/python
[6]: https://docs.datadoghq.com/fr/logs/log_collection/python
[7]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}