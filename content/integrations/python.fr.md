---
categories:
- languages
ddtype: crawler
description: Mesurer des métriques personnalisées à partir de vos applications Python avec Datadogpy.
doc_link: https://docs.datadoghq.com/integrations/python/
git_integration_title: python
has_logo: true
integration_title: Python
is_public: true
kind: integration
manifest_version: '1.0'
name: python
public_title: Intégration Datadog-Python
short_description: Mesurer des métriques personnalisées à partir de vos applications Python avec Datadogpy.
version: '1.0'
---

## Aperçu
L'intégration de Python vous permet de monitorer des métriques personnalisées en ajoutant simplement quelques lignes de code à votre application Python. Par exemple, vous pouvez avoir une métrique qui renvoie le nombre de pages vues ou le temp de tout appel de fonction. Pour plus d'informations sur l'intégration Python, reportez-vous au [guide sur la soumission des métriques](/guides/metrics). Pour une utilisation avancée, veuillez vous reporter à la documentation dans les dépôts répertoriés ci-dessous. Vous pouvez également consulter [l'API Datadog](/api) pour plus de détails sur l'utilisation de l'API avec Python.

## Implémentation
### Installation

1.  Pour installer avec pip:

    ```
    pip install datadog
    ```

2.  Commencez à instrumenter votre code:

```python

from datadog import initialize

options = {
    'api_key':'api_key',
    'app_key':'app_key'
}

initialize(**options)

# Use Datadog REST API client
from datadog import api

title = "Something big happened!"
text = 'And let me tell you all about it here!'
tags = ['version:1', 'application:web']

api.Event.create(title=title, text=text, tags=tags)


# Use Statsd, a Python client for DogStatsd
from datadog import statsd

statsd.increment('whatever')
statsd.gauge('foo', 42)

# Or ThreadStats, an alternative tool to collect and flush metrics,using Datadog REST API
from datadog import ThreadStats
stats = ThreadStats()
stats.start()
stats.increment('home.page.hits')
```

### Configuration

Vous ne devez rien faire dans l'application Datadog pour configurer Python.

### Validation

Allez sur la page [Metrics Explorer](https://app.datadoghq.com/metric/explorer) afin de voir vos métriques.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
