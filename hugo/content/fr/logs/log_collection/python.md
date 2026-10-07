---
aliases:
- /fr/logs/languages/python
further_reading:
- link: https://www.datadoghq.com/blog/python-logging-best-practices/
  tag: Blog
  text: Comment recueillir, personnaliser et centraliser des logs Python
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: Documentation
  text: Guide de dépannage pour la collecte de logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail »
title: Collecte de logs avec Python
---

## Présentation

Pour envoyer vos logs Python à Datadog, configurez un logger Python afin d'activer la journalisation au sein d'un fichier sur un host, puis [suivez][12] ce fichier avec l'Agent Datadog.

## Configurer votre logger

Les logs Python peuvent être complexes à gérer à cause des tracebacks. Les tracebacks entraînent la division des logs en plusieurs lignes, ce qui les rend difficiles à associer à l'événement de log d'origine. Pour y remédier, Datadog vous recommande d'utiliser un formateur JSON lors de l'écriture des logs afin de :

* Garantir que chaque stack trace est correctement incorporée au bon log
* Vous assurer que tous les attributs d'un événement de log sont correctement extraits (gravité, nom du logger, nom du thread, etc.)

Vous trouverez ci-dessous des exemples de configuration pour les bibliothèques de journalisation suivantes :

* [JSON-log-formatter][1]
* [Python-json-logger][2]
* [django-datadog-logger][3]*

* Le [logger Python][6] possède un paramètre `extra` supplémentaire permettant d'ajouter des attributs personnalisés. Utilisez `DJANGO_DATADOG_LOGGER_EXTRA_INCLUDE` pour spécifier une expression régulière qui renvoie le nom des loggers pour lesquels vous souhaitez ajouter le paramètre `extra`.

## Configurer l'Agent Datadog

Une fois la [collecte de logs activée][7], procédez comme suit pour configurer la [collecte de logs personnalisée][8] afin de suivre vos fichiers de logs et de les transmettre à Datadog :

1. Créez un dossier `python.d/` dans le répertoire de configuration `conf.d/` de l'Agent.
2. Créez un fichier `conf.yaml` dans le répertoire `conf.d/python.d/` avec le contenu suivant :
    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "<PATH_TO_PYTHON_LOG>.log"
        service: "<SERVICE_NAME>"
        source: python
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
3. [Redémarrez l'Agent][5].
4. Lancez la [sous-commande status de l'Agent][9] et cherchez `python` dans la section `Checks` pour vérifier que les logs sont bien transmis à Datadog.

Si les logs sont au format JSON, Datadog [parse automatiquement les messages de log][10] pour extraire les attributs. Utilisez le [Log Explorer][11] pour visualiser et dépanner vos logs.

## Associer votre service à l'ensemble des logs et traces

Si l'APM est activé pour cette application, associez vos logs et vos traces en ajoutant automatiquement l'ID des traces, l'ID des spans et les paramètres `env`, `service` et `version` à vos logs. Pour ce faire, [suivez les instructions relatives à l'utilisation de Python pour l'APM][4] (en anglais).

**Remarque** : si le traceur de l'APM injecte `service` dans vos logs, cela remplace la valeur définie dans la configuration de l'Agent.

Une fois cette opération terminée, le log doit avoir le format suivant :

```xml
2019-01-07 15:20:15,972 DEBUG [flask.app] [app.py:100] [dd.trace_id=5688176451479556031 dd.span_id=4663104081780224235] – Il s'agit d'un exemple
```

Si les logs sont au format JSON, les valeurs des traces sont automatiquement extraites tant qu'elles se trouvent au premier niveau ou au sein de blocs `extra` ou `record.extra` de premier niveau. Vous trouverez ci-dessous des exemples de log JSON valides pour lesquels les valeurs des traces sont automatiquement parsées.

```json
{
  "message":"Hello from the private method",
  "dd.trace_id":"18287620314539322434",
  "dd.span_id":"8440638443344356350",
  "dd.env":"dev",
  "dd.service":"logs",
  "dd.version":"1.0.0"
}
```

```json
{
  "message":"Hello from the private method",
  "extra":{
    "dd.trace_id":"18287620314539322434",
    "dd.span_id":"8440638443344356350",
    "dd.env":"dev",
    "dd.service":"logs",
    "dd.version":"1.0.0"
  }
}
```

```json
{
"message":"Hello from the private method",
  "record":{
    "extra":{
      "dd.trace_id":"1734396609740561719",
      "dd.span_id":"17877262712156101004",
      "dd.env":"dev",
      "dd.service":"logs",
      "dd.version":"1.0.0"
    }
  }
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.python.org/pypi/JSON-log-formatter/
[2]: https://github.com/madzak/python-json-logger
[3]: https://pypi.org/project/django-datadog-logger/
[4]: /fr/tracing/other_telemetry/connect_logs_and_traces/python
[5]: /fr/agent/configuration/agent-commands/
[6]: https://docs.python.org/3/library/logging.html#logging
[7]: /fr/agent/logs/?tab=tailfiles#activate-log-collection
[8]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[9]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: /fr/logs/log_configuration/parsing/
[11]: /fr/logs/explorer/#overview
[12]: /fr/glossary/#tail