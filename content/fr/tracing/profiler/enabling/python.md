---
code_lang: python
code_lang_weight: 20
further_reading:
- link: getting_started/profiler
  tag: Documentation
  text: Débuter avec le profileur
- link: tracing/profiler/search_profiles
  tag: Documentation
  text: En savoir plus sur les types de profils disponibles
- link: tracing/profiler/profiler_troubleshooting
  tag: Documentation
  text: Résoudre les problèmes rencontrés en utilisant le profileur
kind: Documentation
title: Activation du profileur Python
type: multi-code-lang
---

Le profileur est fourni dans les bibliothèques de tracing Datadog. Si vous utilisez déjà [l'APM pour recueillir des traces][1] pour votre application, vous pouvez ignorer l'installation de la bibliothèque et passer directement à l'activation du profileur.

## Prérequis

Le profileur Datadog requiert Python 2.7+ et la version [7.20.2][2]+ ou [6.20.2][3]+ de l'Agent.

La disponibilité des fonctionnalités de profiling suivantes varie selon votre version de Python :

|      Fonctionnalité         | Versions de Python prises en charge          |
|----------------------|------------------------------------|
| Profiling du wall time  | Python >= 2.7                      |
| Profiling du temps d'exécution processeur   | Python >= 2.7 sur les plates-formes POSIX   |
| Profiling des exceptions  | Python >= 3.7 sur les plates-formes POSIX   |
| Profiling des verrous       | Python >= 2.7                      |
| Profiling de la mémoire     | Python >= 3.5                      |

Le profileur en continu n'est pas pris en charge sur les plateformes sans serveur, comme AWS Lambda.

## Installation

Installez `ddtrace` afin de profiter de ses fonctionnalités de tracing et de profiling :

```shell
pip install ddtrace
```

**Remarque** : pour tirer profit du profiling, la version 0.40 ou une version ultérieure de la bibliothèque `ddtrace` est requise.

Si vous utilisez une plate-forme pour laquelle la distribution binaire de `ddtrace` n'est pas disponible, installez un environnement de développement.

Par exemple, sous Alpine Linux, vous pouvez utiliser la commande suivante :
```shell
apk install gcc musl-dev linux-headers
```

## Utilisation

Pour profiler automatiquement votre code, définissez la variable d'environnement `DD_PROFILING_ENABLED` sur `true` lorsque vous utilisez `ddtrace-run` :

    DD_PROFILING_ENABLED=true \
    DD_ENV=prod \
    DD_SERVICE=my-web-app \
    DD_VERSION=1.0.3 \
    ddtrace-run python app.py

Il est fortement recommandé d'ajouter des tags comme `service` ou `version`, car ils vous permettent de filtrer et de regrouper vos profils selon ces dimensions. Consultez la section [Configuration](#configuration) ci-dessous.

Au bout de quelques minutes, vous pouvez visualiser vos profils en accédant à [Datadog APM puis à la page Profiler][4].

Si vous souhaitez contrôler manuellement le cycle de vie du profileur, utilisez l'objet `ddtrace.profiling.profiler.Profiler` :

```python
from ddtrace.profiling import Profiler

prof = Profiler(
    env="prod",  # si ce paramètre n'est pas défini, il prend la valeur de la variable d'environnement DD_ENV
    service="my-web-app",  # si ce paramètre n'est pas défini, il prend la valeur de la variable d'environnement DD_SERVICE
    version="1.0.3",   # si ce paramètre n'est pas défini, il prend la valeur de la variable d'environnement DD_VERSION
)
prof.start()
```

## Avertissements

Lorsque votre processus effectue la duplication via `os.fork`, le profiler est arrêté dans le processus enfant et doit être redémarré. Pour Python 3.7+, sur les plates-formes Unix, un nouveau profileur est automatiquement démarré.

Si vous utilisez une version plus ancienne, ou si vous exécutez une plate-forme non basée sur Unix, vous devez démarrer manuellement un nouveau profiler dans votre processus enfant.

```python
# Pour les utilisateurs ddtrace-un, appeler ce paramètre dans votre processus enfant
ddtrace.profiling.auto.start_profiler()

# Sinon, pour une instrumentation manuelle,
# créer un nouveau profileur dans votre processus enfant
from ddtrace.profiling import Profiler

prof = Profiler()
prof.start()
```

## Procédure à suivre

Vous pouvez configurer le profileur à l'aide de [variables d'environnement][5].

## Vous avez des doutes sur les prochaines étapes à suivre ?

Le guide [Premier pas avec le profileur en continu][6] présente un exemple de service problématique et vous explique comment utiliser le profileur en continu pour mieux comprendre le problème et le corriger.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup_overview/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://app.datadoghq.com/profiling
[5]: https://ddtrace.readthedocs.io/en/stable/configuration.html#configuration
[6]: /fr/getting_started/profiler/