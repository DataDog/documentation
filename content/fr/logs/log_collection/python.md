---
title: Collecte de logs avec Python
kind: documentation
aliases:
  - /fr/logs/languages/python
further_reading:
  - link: 'https://www.datadoghq.com/blog/python-logging-best-practices/'
    tag: Blog
    text: 'Comment recueillir, personnaliser et centraliser des logs Python'
  - link: /logs/processing/
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: /logs/processing/parsing/
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: /logs/explorer/
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: /logs/faq/log-collection-troubleshooting-guide/
    tag: FAQ
    text: Dépannage pour la collecte de logs
---
## Présentation

Utilisez votre logger Python préféré pour écrire des logs dans un fichier sur votre host. Surveillez ensuite le fichier avec l'Agent Datadog pour envoyer vos logs vers Datadog.

## Configurer votre logger

Les logs Python sont assez complexes à gérer, principalement à cause des tracebacks. Ils sont divisés en plusieurs lignes, ce qui les rend difficiles à associer à l'événement de log d'origine.
Pour répondre à ce cas de figure, nous vous conseillons d'utiliser un formateur JSON lors de l'écriture des logs afin de :

* Garantir que chaque paramètre stack_trace est correctement associé au bon log
* Vous assurer que tous les attributs d'un événement de log sont correctement extraits (gravité, nom du logger, nom du thread, etc.)

Vous trouverez ci-dessous des exemples de configuration pour les bibliothèques de journalisation suivantes :

* [JSON-log-formatter][1]
* [Python-json-logger][2]
* [django-datadog-logger][3]

## Associer votre service à l'ensemble des logs et traces

Si l'APM est activé pour cette application, associez vos logs et vos traces en ajoutant automatiquement l'ID des traces, l'ID des spans et les paramètres `env`, `service` et `version` à vos logs. Pour ce faire, [suivez les instructions relatives à l'utilisation de Python pour l'APM][4] (en anglais).

**Remarque** : si le traceur de l'APM injecte `service` dans vos logs, cela remplace la valeur définie dans la configuration de l'Agent.

Une fois cette opération terminée, le log doit avoir le format suivant :

```xml
2019-01-07 15:20:15,972 DEBUG [flask.app] [app.py:100] [dd.trace_id=5688176451479556031 dd.span_id=4663104081780224235] – Il s'agit d'un exemple
```

[Configurez ensuite l'Agent Datadog](#configurer-l-agent-datadog) de façon à collecter les logs Python à partir du fichier.

### Écrire les logs dans un fichier

{{< tabs >}}
{{% tab "JSON-log-formatter" %}}

Exemple d'utilisation avec [JSON-log-formatter][1] :

```python
import logging

import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename='/var/log/mon-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

logger.info('Sign up', extra={'referral_code': '52d6ce'})
```

Le fichier de log comprend l'entrée de log suivante (sur une ligne) :

```json
{
  "message": "Sign up",
  "time": "2015-09-01T06:06:26.524448",
  "referral_code": "52d6ce"
}
```

[1]: https://pypi.python.org/pypi/JSON-log-formatter/0.1.0
{{% /tab %}}
{{% tab "Python-json-logger" %}}

Exemple d'utilisation avec [Python-json-logger][1] :

```python
import logging
from pythonjsonlogger import jsonlogger

logger = logging.getLogger()

logHandler = logging.FileHandler(filename='/var/log/my-log.json')
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

logger.info('Sign up', extra={'referral_code': '52d6ce'})
```

Une fois le [gestionnaire configuré][2], le fichier de log comprend l'entrée de log suivante (sur une ligne) :

```json
{
  "threadName": "MainThread",
  "name": "root",
  "thread": 140735202359648,
  "created": 1336281068.506248,
  "process": 41937,
  "processName": "MainProcess",
  "relativeCreated": 9.100914001464844,
  "module": "tests",
  "funcName": "testFormatKeys",
  "levelno": 20,
  "msecs": 506.24799728393555,
  "pathname": "tests/tests.py",
  "lineno": 60,
  "asctime": ["12-05-05 22:11:08,506248"],
  "message": "testing logging format",
  "filename": "tests.py",
  "levelname": "INFO",
  "special": "value",
  "run": 12
}
```

[1]: https://github.com/madzak/python-json-logger
[2]: https://github.com/madzak/python-json-logger#customizing-fields
{{% /tab %}}
{{< /tabs >}}

### Configurer l'Agent Datadog

Créez un fichier `conf.yaml` dans le répertoire `conf.d/python.d/` de l'Agent avec le contenu suivant :

```yaml
init_config:

instances:

##Section des logs
logs:

  - type: file
    path: "<CHEMIN_VERS_LOG_PYTHON>.log"
    service: "<VOTRE_APPLICATION>"
    source: python
    sourcecategory: sourcecode
    # Si des logs multiligne commencent par la date au format aaaa-mm-jj, supprimer la mise en commentaire de la règle de traitement suivante
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

[Redémarrez l'Agent][5] pour prendre en compte les changements de configuration.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.python.org/pypi/JSON-log-formatter/0.1.0
[2]: https://github.com/madzak/python-json-logger
[3]: https://pypi.org/project/django-datadog-logger/
[4]: /fr/tracing/connect_logs_and_traces/python
[5]: /fr/agent/guide/agent-commands/