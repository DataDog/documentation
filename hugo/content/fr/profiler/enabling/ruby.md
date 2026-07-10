---
aliases:
- /fr/tracing/profiler/enabling/ruby/
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: getting_started/profiler
  tag: Documentation
  text: Débuter avec le profileur
- link: profiler/search_profiles
  tag: Documentation
  text: En savoir plus sur les types de profils disponibles
- link: profiler/profiler_troubleshooting
  tag: Documentation
  text: Résoudre les problèmes rencontrés en utilisant le profileur
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: Blog
  text: Analyser les performances de code Ruby avec le profileur en continu Datadog
title: Activer le profileur Ruby
type: multi-code-lang
---

Le profileur est fourni dans les bibliothèques de tracing Datadog. Si vous utilisez déjà [l'APM pour recueillir des traces][1] pour votre application, vous pouvez ignorer l'installation de la bibliothèque et passer directement à l'activation du profileur.

## Prérequis

Le profileur Datadog nécessite Ruby 2.3+ (JRuby et TruffleRuby ne sont pas pris en charge).

Les systèmes d'exploitation et architectures suivants sont pris en charge :
- Linux (GNU libc) x86-64, aarch64
- Alpine Linux (musl libc) x86-64, aarch64

Vous devez également avoir installé l'utilitaire système Linux [`pkg-config`](https://www.freedesktop.org/wiki/Software/pkg-config/) ou [`pkgconf`](https://github.com/pkgconf/pkgconf).
Cet utilitaire est disponible sur les référentiels de logiciels de la plupart des distributions Linux. Par exemple :

- Le package `pkg-config` est disponible pour [Homebrew](https://formulae.brew.sh/formula/pkg-config) ainsi que les distributions Linux basées sur [Debian](https://packages.debian.org/search?keywords=pkg-config) et [Ubuntu](https://packages.ubuntu.com/search?keywords=pkg-config).
- Le package `pkgconf` est disponible pour les distributions Linux basées sur [Arch](https://archlinux.org/packages/?q=pkgconf) et [Alpine](https://pkgs.alpinelinux.org/packages?name=pkgconf).
- Le package `pkgconf-pkg-config` est disponible pour les distributions Linux basées sur [Fedora](https://packages.fedoraproject.org/pkgs/pkgconf/pkgconf-pkg-config/) et [Red-Hat](https://rpmfind.net/linux/rpm2html/search.php?query=pkgconf-pkg-config).

Le profileur en continu n'est pas pris en charge sur les plateformes sans serveur, comme AWS Lambda.

## Installation

Pour commencer le profiling d'applications, procédez comme suit :

1. Si vous utilisez déjà Datadog, installez la version [7.20.2][2]+ ou [6.20.2][3]+ de l'Agent.

2. Ajoutez les gems `ddtrace` et `google-protobuf` à votre fichier `Gemfile` ou `gems.rb` :

    ```ruby
    gem 'ddtrace', '~> 1.0'
    gem 'google-protobuf', '~> 3.0'
    ```

2. Installez les gems à l'aide de la commande `bundle install`.

3. Activez le profileur :

   {{< tabs >}}
{{% tab "Variables d'environnement" %}}

```shell
export DD_PROFILING_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

{{% /tab %}}
{{% tab "Dans le code" %}}

```ruby
Datadog.configure do |c|
  c.profiling.enabled = true
  c.env = 'prod'
  c.service = 'my-web-app'
  c.version = '1.0.3'
end
```

**Remarque** : pour les applications Rails, créez un fichier `config/initializers/datadog.rb` comprenant le code de la configuration ci-dessus.

{{% /tab %}}
{{< /tabs >}}

4. Ajoutez `ddtracerb exec` à la commande de lancement de votre application Ruby :

    ```shell
    bundle exec ddtracerb exec ruby myapp.rb
    ```

    Exemples pour Rails :

    ```shell
    bundle exec ddtracerb exec bin/rails s
    ```

    **Remarque**

    Si vous n'avez pas la possibilité de lancer l'application avec `ddtracerb exec` (par exemple, si vous utilisez le serveur Web Phusion Passenger), vous pouvez lancer le profileur en ajoutant ce qui suit au point d'entrée de votre application (par exemple, `config.ru` pour une application Web) :

    ```ruby
    require 'datadog/profiling/preload'
    ```


4. Une ou deux minutes après le lancement de votre application Ruby, vous pouvez visualiser vos profils en accédant à [l'APM Datadog puis à la page Profiler][4].

## Vous avez des doutes sur les prochaines étapes à suivre ?

Le guide [Premier pas avec le profileur en continu][5] présente un exemple de service problématique et vous explique comment utiliser le profileur en continu pour mieux comprendre le problème et le corriger.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://app.datadoghq.com/profiling
[5]: /fr/getting_started/profiler/
[12]: /fr/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /fr/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints