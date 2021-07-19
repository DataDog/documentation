---
title: Tracer des applications Python
kind: documentation
aliases:
  - /fr/tracing/python/
  - /fr/tracing/languages/python/
  - /fr/agent/apm/python/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-py'
    tag: GitHub
    text: Code source
  - link: 'http://pypi.datadoghq.com/trace/docs/'
    tag: Pypi
    text: Documentation relative à l'API
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Exigences de compatibilité

Les versions `2.7+` et `3.5+` de Python sont prises en charge. Pour obtenir la liste complète des bibliothèques prises en charge, consultez la page [Exigences de compatibilité][1].

## Installation et démarrage

### Suivre la documentation dans l'application (conseillé)

Suivez les [instructions de démarrage rapide][2] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer le profileur en continu, App Analytics et l'injection des ID de trace dans les logs durant la configuration.

Sinon, pour commencer le tracing d'applications écrites en Python, vous devez d'abord [installer et configurer l'Agent Datadog][3]. Pour obtenir davantage d'informations, consultez la documentation relative au [tracing d'applications Docker][4] ou au [tracing d'applications Kubernetes][5].

Installez ensuite la bibliothèque de tracing Datadog, `ddtrace`, avec pip :

```python
pip install ddtrace
```

Pour instrumenter votre application Python, utilisez alors la commande `ddtrace-run` incluse. Pour l'utiliser, ajoutez `ddtrace-run` en préfixe à la commande de votre point d'entrée Python.

Par exemple, si votre application est lancée avec `python app.py`, exécutez la commande suivante :

```shell
ddtrace-run python app.py
```

Pour découvrir des options d'utilisation, de configuration et de contrôle plus avancées, consultez la [documentation relative à l'API][6] de Datadog.

## Configuration

Lorsque vous utilisez **ddtrace-run**, les [variables d'environnement][7] suivantes sont disponibles :

| Variable d'environnement               | Valeur par défaut     | Description                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_DEBUG`              | `false`     | Active la journalisation de debugging dans le traceur.                                                                                                                                                                                                                                         |
| `DATADOG_PATCH_MODULES`            |             | Remplace les modules patchés pour l'exécution de cette application. Le format doit être le suivant : `DATADOG_PATCH_MODULES=module:patch,module:patch...`.                                                                                                                            |

Nous vous conseillons d'utiliser `DD_ENV`, `DD_SERVICE` et `DD_VERSION` pour définir les paramètres `env`, `service` et `version` pour vos services. Consultez la documentation sur le [Tagging de service unifié][8] pour en savoir plus sur la configuration de ces variables d'environnement.

| Variable d'environnement               | Valeur par défaut     | Description                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_ENV`                           |             | Définit l'environnement d'une application, par ex. `prod`, `pre-prod` ou `staging`. Découvrez [comment configurer votre environnement][9]. Disponible à partir de la version 0.38.                                                                                                             |
| `DD_SERVICE`                       |             | Le nom de service à utiliser pour cette application. La valeur est transmise lorsque vous configurez un middleware pour les intégrations de framework Web (par ex. Pylons, Flask ou Django). Si vous n'utilisez pas d'intégration Web pour le tracing, nous vous conseillons de [définir le nom de service dans le code](#integrations). Disponible à partir de la version 0.38. |
| `DD_VERSION`                       |             | Définit la version de votre application, p. ex. `1.2.3`, `6c44da20` ou `2020.02.13`. Disponible à partir de la version 0.38.                                                                                                                                                                  |
| `DD_TAGS`                          |             | La liste des tags par défaut à ajouter à chaque span, profil et métrique runtime, p. ex. `layer:api,team:intake`. Disponible à partir de la version 0.38.                                                                                                                            |
| `DATADOG_TRACE_ENABLED`            | `true`      | Active l'instrumentation des frameworks web et des bibliothèques. Lorsqu'elle est définie sur `false`, le code de l'application ne génère aucune trace.                                                                                                                                                           |
| `DD_AGENT_HOST`                    | `localhost` | Remplace l'adresse du host de l'Agent de trace utilisée par le traceur par défaut pour l'envoi des traces.                                                                                                                                                                          |
| `DATADOG_TRACE_AGENT_PORT`         | `8126`      | Remplace le port utilisé par le traceur par défaut pour l'envoi des traces.                                                                                                                                                                                                                 |
| `DD_TRACE_AGENT_URL`               |             | L'URL de l'Agent de trace auquel le traceur transmet des données. Lorsque ce paramètre est défini, il est utilisé à la place du hostname et du port. Prend en charge les sockets de domaine Unix grâce au paramètre `apm_config.receiver_socket` de votre fichier `datadog.yaml` ou à la variable d'environnement `DD_APM_RECEIVER_SOCKET`.  |
| `DATADOG_PRIORITY_SAMPLING`        | `true`      | Active [l'échantillonnage prioritaire][10].                                                                                                                                                                                                                                              |
| `DD_LOGS_INJECTION`                | `false`     | Active la [mise en relation des logs et des traces injectées][11].                                                                                                                                                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`       | `false`     | Active App Analytics pour toutes les [intégrations Web][12].                                                                                                                                                                                                                   |
| `DD_INTEGRATION_ANALYTICS_ENABLED` | `false`     | Active App Analytics pour une intégration spécifique. Exemple : `DD_BOTO_ANALYTICS_ENABLED=true` .                                                                                                                                                                                |

## Modifier le hostname de l'Agent

Configurez vos traceurs d'application de façon à ce qu'ils envoient les traces vers un hostname d'Agent personnalisé. Le module de tracing Python recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

Vous pouvez également définir le hostname et le port dans le code :

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname="custom-hostname",
    port="1234",
)
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/docs
[3]: /fr/tracing/send_traces/
[4]: /fr/tracing/setup/docker/
[5]: /fr/agent/kubernetes/apm/
[6]: http://pypi.datadoghq.com/trace/docs
[7]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtracerun
[8]: /fr/getting_started/tagging/unified_service_tagging
[9]: /fr/tracing/guide/setting_primary_tags_to_scope/
[10]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#priority-sampling
[11]: /fr/tracing/connect_logs_and_traces/python/
[12]: /fr/tracing/app_analytics/?tab=python#automatic-configuration
