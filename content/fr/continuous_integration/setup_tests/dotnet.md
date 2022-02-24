---
title: Tests .NET
kind: documentation
further_reading:
  - link: /continuous_integration/explore_tests
    tag: Documentation
    text: Explorer les résultats de test et la performance
  - link: /continuous_integration/troubleshooting/
    tag: Documentation
    text: Dépannage CI
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Compatibilité

Versions .NET prises en charge :
* .NET Core 2.1+ et 3.0+
* .NET 5.0+

Frameworks de test pris en charge :
* xUnit 2.2+
* NUnit 3.0+
* MsTest V2 14+

## Prérequis

[Installez l'Agent Datadog pour recueillir des données de test][1].

## Installer le traceur .NET

Pour installer ou modifier la commande `dd-trace` sur l'ensemble de la machine, exécutez :

{{< code-block lang="bash" >}}
dotnet tool update -g dd-trace
{{< /code-block >}}

## Instrumenter des tests

Pour instrumenter votre collection de test, ajoutez le préfixe `dd-trace` à la commande de votre test, en spécifiant le nom du service ou de la bibliothèque testé(e) avec le paramètre `--dd-service` ainsi que l'environnement dans lequel sont exécutés les tests (par exemple, `local` lorsque les tests sont exécutés sur la machine d'un développeur ou `ci` lorsqu'ils sont exécutés sur un fournisseur de CI) avec le paramètre `--dd-env`. Exemple :

{{< code-block lang="bash" >}}
dd-trace --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

Tous les tests sont automatiquement instrumentés.

## Paramètres de configuration

Vous pouvez modifier la configuration CLI par défaut à l'aide d'arguments de ligne de commande ou de variables d'environnement. Pour consulter la liste complète des paramètres de configuration, exécutez :

{{< code-block lang="bash" >}}
dd-trace --help
{{< /code-block >}}

La liste suivante répertorie les valeurs par défaut des principaux paramètres de configuration :

`--dd-service`
: Nom du service ou de la bibliothèque testé(e).<br/>
**Variable d'environnement** : `DD_SERVICE`<br/>
**Valeur par défaut** : le nom du référentiel<br/>
**Exemple** : `my-dotnet-app`

`--dd-env`
: Nom de l'environnement dans lequel sont exécutés les tests.<br/>
**Variable d'environnement** : `DD_ENV`<br/>
**Valeur par défaut** : `none`<br/>
**Exemples** : `local`, `ci`

`--agent-url`
: URL de l'Agent Datadog pour la collecte de traces, au format `http://hostname:port`.<br/>
**Variable d'environnement** : `DD_TRACE_AGENT_URL`<br/>
**Valeur par défaut** : `http://localhost:8126`

Vous pouvez également utiliser toutes les autres options de [configuration du traceur Datadog][2].

### Recueillir les métadonnées Git

Datadog tire profit des données Git pour vous présenter les résultats de vos tests et les regrouper par référentiel, branche et commit. Les métadonnées Git sont automatiquement recueillies par l'instrumentation de test, à partir des variables d'environnement du fournisseur de CI et du dossier local `.git` dans le chemin du projet, le cas échéant.

Si vous exécutez des tests dans des fournisseurs CI non pris en charge, ou sans dossier `.git`, vous pouvez configurer manuellement les données Git à l'aide de variables d'environnement. Ces dernières sont prioritaires et remplacent les informations détectées automatiquement. Configurez les variables d'environnement suivantes pour obtenir des données Git.

`DD_GIT_REPOSITORY_URL`
: URL du référentiel dans lequel le code est stocké. Les URL HTTP et SSH sont prises en charge.<br/>
**Exemple** : `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Branche Git testée. Ne renseignez pas cette variable si vous fournissez à la place des informations sur les tags.<br/>
**Exemple** : `develop`

`DD_GIT_TAG`
: Tag Git testé (le cas échéant). Ne renseignez pas cette variable si vous fournissez à la place des informations sur la branche.<br/>
**Exemple** : `1.0.1`

`DD_GIT_COMMIT_SHA`
: Hash entier du commit.<br/>
**Exemple** : `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Message du commit.<br/>
**Exemple** : `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Nom de l'auteur du commit.<br/>
**Exemple** : `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: E-mail de l'auteur du commit.<br/>
**Exemple** : `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Date de l'auteur du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Nom du responsable du commit.<br/>
**Exemple** : `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: E-mail du responsable du commit.<br/>
**Exemple** : `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Date du responsable du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

## Instrumentation personnalisée


<div class="alert alert-warning">
  <strong>Remarque :</strong> la configuration d'instrumentation personnalisée varie selon la version de `dd-trace`. Pour profiter de l'instrumentation personnalisée, les versions des packages NuGet de `dd-trace` et de `Datadog.Trace` doivent être identiques.
</div>

Pour utiliser l'instrumentation personnalisée dans votre application .NET, procédez comme suit :

1. Exécutez `dd-trace --version` pour obtenir la version de l'outil.
1. Ajoutez le [package NuGet][3] `Datadog.Trace` à votre application, en prenant soin de bien choisir la version correspondant à celle de dd-trace.
2. Dans le code de votre application, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance` pour créer de nouvelles spans.

Pour découvrir comment ajouter des spans et des tags pour l'instrumentation personnalisée, consultez la [documentation relative à l'instrumentation personnalisée .NET][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/continuous_integration/setup_tests/agent/
[2]: /fr/tracing/setup_overview/setup/dotnet-core/?tab=windows#configuration
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: /fr/tracing/setup_overview/custom_instrumentation/dotnet/