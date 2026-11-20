---
aliases:
- /fr/tracing/profiler/enabling/php/
code_lang: php
code_lang_weight: 70
further_reading:
- link: getting_started/profiler
  tag: Documentation
  text: Débuter avec le profileur
- link: profiler/search_profiles
  tag: Documentation
  text: En savoir plus sur les types de profils disponibles
- link: profiler/profiler_troubleshooting/php
  tag: Documentation
  text: Résoudre les problèmes rencontrés en utilisant le profileur
title: Activer le profileur PHP
type: multi-code-lang
---

## Prérequis

Le profileur Datadog nécessite la version 7.1 ou une version ultérieure de PHP sur une machine Linux 64 bits.

Les versions suivantes ne sont **pas** prises en charge :
- Builds ZTS de PHP
- Builds de debugging de PHP
- Fibers (PHP 8.1 ou version ultérieure)

{{< tabs >}}
{{% tab "GNU C Linux" %}}

Vous devez utiliser un système d'exploitation doté de glibc 2.17+. Les versions minimales suivantes sont compatibles :
  - CentOS 7
  - Debian 8 (en fin de vie)
  - Ubuntu 14.04 (en fin de vie)

Datadog vous conseille d'exécuter une version d'un système d'exploitation qui n'est pas en fin de vie.

{{% /tab %}}
{{% tab "Alpine Linux" %}}

La version 3.13 ou une version ultérieure d'Alpine Linux est requise, car le profileur tire profit de musl 1.2.

Vous devez également installer `libgcc_s` avec la commande suivante :

```shell
apk add libgcc
```

{{% /tab %}}
{{< /tabs >}}

Le tableau suivant répertorie les fonctionnalités de profiling qui nécessitent une version minimale de la bibliothèque `dd-trace-php` :

|      Fonctionnalité         | Version de `dd-trace-php` requise          |
|----------------------|-----------------------------------------|
| [Hotspots de code][12]        | 0.71+                       |
| [Profiling des endpoints][13]            | 0.79.0+                       |

Le profileur en continu n'est pas pris en charge sur les plateformes sans serveur, comme AWS Lambda.

## Installation

Pour commencer le profiling d'applications, procédez comme suit :

1. Si vous utilisez déjà Datadog, mettez votre Agent à niveau vers la version [7.20.2][1] ou [6.20.2][2]+.

2. Téléchargez le script `datadog-setup.php` depuis la [page de téléchargement GitHub][3]. La version 0.69.0 du traceur est la première à inclure ce programme d'installation.

3. Exécutez le programme d'installation pour installer le traceur et le profileur. Utilisez par exemple la commande `php datadog-setup.php --enable-profiling`. Ce script fonctionne de façon interactive et vous demande où vous souhaitez effectuer l'installation parmi les emplacements PHP détectés. Une fois l'installation terminée, le script affiche les arguments de commande non interactifs afin de pouvoir les utiliser ultérieurement.

   {{< tabs >}}
{{% tab "Interface de ligne de commande" %}}

Définissez les variables d'environnement avant d'appeler PHP. Exemple :

```
# DD_PROFILING_ENABLED n'est pas requis pour la version 0.82.0 et les versions ultérieures.
export DD_PROFILING_ENABLED=true

export DD_SERVICE=app-name
export DD_ENV=prod
export DD_VERSION=1.3.2

php hello.php
```

{{% /tab %}}
{{% tab "PHP-FPM" %}}

Utilisez la directive `env` dans le fichier `www.conf` de php-fpm. Exemple :

```
; DD_PROFILING_ENABLED n'est pas requis pour la version 0.82.0 et les versions ultérieures
env[DD_PROFILING_ENABLED] = true

env[DD_SERVICE] = app-name
env[DD_ENV] = prod
env[DD_VERSION] = 1.3.2
```

{{% /tab %}}
{{% tab "Apache" %}}

Utilisez `SetEnv` depuis la configuration du serveur, le host virtuel, le répertoire ou le fichier `.htaccess` :

```
# DD_PROFILING_ENABLED n'est pas requis pour la version 0.82.0 et les versions ultérieures.
SetEnv DD_PROFILING_ENABLED true

SetEnv DD_SERVICE app-name
SetEnv DD_ENV prod
SetEnv DD_VERSION 1.3.2
```

{{% /tab %}}
{{< /tabs >}}

   Consultez la [documentation relative à la configuration du profileur PHP][4] pour obtenir des variables d'environnement supplémentaires.

4. Une ou deux minutes après la réception d'une requête, vous pouvez visualiser vos profils en accédant à [l'APM Datadog puis à la page Profiler][5].

## Vous avez des doutes sur les prochaines étapes à suivre ?

Le guide [Premier pas avec le profileur en continu][6] présente un exemple de service problématique et vous explique comment utiliser le profileur en continu pour mieux comprendre le problème et le corriger.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: /fr/tracing/trace_collection/library_config/php/#environment-variable-configuration
[5]: https://app.datadoghq.com/profiling
[6]: /fr/getting_started/profiler/
[12]: /fr/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /fr/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints