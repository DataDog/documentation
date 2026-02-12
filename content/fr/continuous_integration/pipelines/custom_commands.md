---
aliases:
- /fr/continuous_integration/setup_pipelines/custom_commands/
further_reading:
- link: /continuous_integration/pipelines/custom_commands/
  tag: Documentation
  text: Dépannage de CI Visibility
title: Ajouter des commandes personnalisées à des traces de pipeline
---

Les commandes personnalisées vous permettent de tracer des commandes individuelles dans vos pipelines de CI. Vous pouvez ainsi mesurer la durée de votre commande, sans tenir compte des actions de configuration ou de nettoyage que la tâche peut comporter (par exemple, le temps passé à télécharger des images Docker ou à attendre un nœud disponible dans une infrastructure basée sur Kubernetes). Ces spans s'affichent dans la trace du pipeline :

{{< img src="ci/ci-custom-spans.png" alt="Détails d'un pipeline avec des commandes personnalisées" style="width:100%;">}}

## Compatibilité

Les commandes personnalisées sont compatibles avec les fournisseurs de CI suivants :

- GitHub.com (SaaS) avec datadog-ci CLI >= 2.40. Pour envoyer des commandes personnalisées dans GitHub Actions, consultez la section [Problème connu avec GitHub Actions](#problème-connu-avec-github-actions).
- GitLab (SaaS ou auto-hébergé >= 14.1) avec datadog-ci CLI >= 2.40.
- Jenkins avec le plugin Datadog >= v3.2.0
- CircleCI
- Azure DevOps Pipelines avec datadog-ci CLI >= 2.40.
- AWS Codepipeline avec datadog-ci CLI >= 2.40. Suivez [Ajout de commandes personnalisées][6] pour configurer des commandes personnalisées dans AWS Codepipeline.
- Buildkite avec datadog-ci CLI >= 2.40.

## Installer la CLI Datadog CI

Installez l'interface de ligne de commande [`datadog-ci`][1] (>=v0.17.0) de façon globale avec `npm` :

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

<div class="alert alert-info">Consultez la section <a href="https://github.com/DataDog/datadog-ci?tab=readme-ov-file#more-ways-to-install-the-cli">Plus de façons d'installer la CLI</a> dans le référentiel datadog-ci pour des options d'installation alternatives.</div>

## Tracer une ligne de commande

Pour tracer une ligne de commande, exécutez :

{{< code-block lang="shell" >}}
datadog-ci trace [--name <name>] -- <command>
{{< /code-block >}}

Indiquez une [clé d'API Datadog][2] valide dans la variable d'environnement `DATADOG_API_KEY`. Exemple :

{{< site-region region="us,us3,eu,ap1,ap2" >}}
<pre>
<code>
DATADOG_API_KEY=&lt;key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci trace \
--name "Greet" \
-- \
echo "Hello World"
</code>
</pre>
{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-danger">CI Visibility n'est pas disponible dans le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Paramètres de configuration

Les options ci-dessous sont disponibles pour la commande `datadog-ci trace` :

`--name`
: Nom d'affichage de la commande personnalisée.<br/>
**Valeur par défaut** : même valeur que `<command>`<br/>
**Exemple** : `Wait for DB to be reachable`

`--tags`
: Paires key/value au format `key:value` à associer à la commande personnalisée (le paramètre `--tags` peut être fourni plusieurs fois). Lorsque vous spécifiez des tags avec `DD_TAGS`, séparez-les avec des virgules (par exemple, `team:backend,priority:high`).<br/>
**Variable d'environnement** : `DD_TAGS`<br/>
**Valeur par défaut** : (aucune)<br/>
**Exemple** : `team:backend`<br/>
**Remarque** : les tags spécifiés avec `--tags` et avec la variable d'environnement `DD_TAGS` sont fusionnés. Si `--tags` et `DD_TAGS` comportent la même clé, la valeur de `DD_TAGS` est prioritaire.

`--measures`
: Paires clé-valeur sous la forme `key:value` à joindre à la commande personnalisée en tant que valeurs numériques (le paramètre `--measures` peut être spécifié plusieurs fois).<br/>
_(Nécessite datadog-ci >=v2.35.0)_ <br/>
**Valeur par défaut** : (aucune)<br/>
**Exemple** : `size:1024`<br/>

`--no-fail`
: Empêche tout échec de datadog-ci, même en cas d'exécution dans un fournisseur de CI non pris en charge. Dans ce cas, la commande est exécutée et aucune donnée n'est transmise à Datadog.<br/>
**Valeur par défaut** : `false`

`--dry-run`
: Empêche datadog-ci d'envoyer la span personnalisée à Datadog. Toutes les autres vérifications sont effectuées.<br/>
**Valeur par défaut** : `false`

Arguments positionnels
: La commande qui est lancée et tracée.

Les variables d'environnement suivantes sont prises en charge :

`DATADOG_API_KEY` (requis)
: La [clé d'API Datadog][2] utilisée pour authentifier les requêtes.<br/>
**Valeur par défaut** : (aucune)

{{< site-region region="us3,us5,eu,ap1,ap2" >}}
De plus, configurez le site Datadog pour utiliser celui sélectionné ({{< region-param key="dd_site_name" >}}) :

`DATADOG_SITE`
: Le site Datadog vers lequel télécharger les résultats.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

## Tracer un bloc de commandes

Il est possible de tracer plusieurs lignes de commande à la fois en spécifiant manuellement les horodatages de début et de fin (ou la durée).

{{< code-block lang="shell" >}}
datadog-ci trace span [--name <name>] [--start-time <timestamp-ms>] [--end-time <timestamp-ms>] # [--duration <duration-ms>] peut être utilisé à la place de l'heure de début / fin
{{< /code-block >}}

Indiquez une [clé d'API Datadog][2] valide dans la variable d'environnement `DATADOG_API_KEY`. Exemple :

{{< site-region region="us,us3,eu,ap1,ap2" >}}
<pre>
<code>
DATADOG_API_KEY=&lt;key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci trace span \
--name "Build Step" \
--duration 10000
</code>
</pre>
{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-danger">CI Visibility n'est pas disponible dans le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Paramètres de configuration

Ces options sont disponibles pour la commande `datadog-ci trace span` :

`--name`
: Nom d'affichage de la span personnalisée.<br/>
**Exemple** : `Build Step`

`--start-time`
: Horodatage en millisecondes depuis l'époque UNIX représentant l'heure de début de la span.<br/>
**Remarque** : il existe deux façons de spécifier l'heure de début et de fin, en utilisant `--start-time` et `--end-time` ou en utilisant `--duration`.

`--end-time`
: Horodatage en millisecondes depuis l'époque UNIX représentant l'heure de fin de la span.<br/>
**Remarque** : il existe deux façons de spécifier l'heure de début et de fin, en utilisant `--start-time` et `--end-time` ou en utilisant `--duration`.

`--duration`
: Durée en millisecondes. En utilisant cela, l'heure de fin est l'heure actuelle lors de l'exécution de cette commande.<br/>
**Remarque** : il existe deux façons de spécifier l'heure de début et de fin, en utilisant `--start-time` et `--end-time` ou en utilisant `--duration`.

`--tags`
: Paires clé-valeur sous la forme `key:value` à joindre à la span personnalisée (le paramètre `--tags` peut être spécifié plusieurs fois). Lors de la spécification de tags en utilisant `DD_TAGS`, séparez-les par des virgules (par exemple, `team:backend,priority:high`).<br/>
**Variable d'environnement** : `DD_TAGS`<br/>
**Valeur par défaut** : (aucune)<br/>
**Exemple** : `team:backend`<br/>
**Remarque** : les tags spécifiés en utilisant `--tags` et avec la variable d'environnement `DD_TAGS` sont fusionnés. Si la même clé apparaît à la fois dans `--tags` et `DD_TAGS`, la valeur dans la variable d'environnement `DD_TAGS` a la priorité.

`--measures`
: Paires clé-valeur sous la forme `key:value` à joindre à la span personnalisée en tant que valeurs numériques (le paramètre `--measures` peut être spécifié plusieurs fois).<br/>
_(Nécessite datadog-ci >=v2.35.0)_ <br/>
**Valeur par défaut** : (aucune)<br/>
**Exemple** : `size:1024`<br/>

`--dry-run`
: Empêche datadog-ci d'envoyer la span personnalisée à Datadog. Toutes les autres vérifications sont effectuées.<br/>
**Valeur par défaut** : `false`

Les variables d'environnement suivantes sont prises en charge :

`DATADOG_API_KEY` (requis)
: La [clé d'API Datadog][2] utilisée pour authentifier les requêtes.<br/>
**Valeur par défaut** : (aucune)

{{< site-region region="us3,us5,eu,ap1,ap2" >}}
De plus, configurez le site Datadog pour utiliser celui sélectionné ({{< region-param key="dd_site_name" >}}) :

`DATADOG_SITE`
: Le site Datadog vers lequel télécharger les résultats.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

## Problème connu avec GitHub Actions


À partir de la version `4.1.1` de `datadog-ci`, aucune action supplémentaire n'est requise, même lors de l'utilisation de noms personnalisés ou de stratégies matricielles.

<details>
<summary><strong>Pour les versions de datadog-ci antérieures à 4.1.1</strong></summary>

Si vous utilisez la version `2.29.0` à `4.1.0` de `datadog-ci` et que le nom de la tâche ne correspond pas à l'entrée définie dans le fichier de configuration du workflow (l'[ID de tâche][3] GitHub), la variable d'environnement `DD_GITHUB_JOB_NAME` doit être exposée, pointant vers le nom de la tâche. Par exemple :

1. Si le nom de la tâche est modifié en utilisant la [propriété name][4] :
    ```yaml
    jobs:
      build:
        name: My build job name
        env:
          DD_GITHUB_JOB_NAME: My build job name
        steps:
        - run: datadog-ci trace ...
    ```
2. Si la [stratégie matricielle][5] est utilisée, plusieurs noms de tâches sont générés par GitHub en ajoutant les valeurs de la matrice à la fin du nom de la tâche, entre parenthèses. La variable d'environnement `DD_GITHUB_JOB_NAME` doit alors être conditionnelle aux valeurs de la matrice :

    ```yaml
    jobs:
      build:
        strategy:
          matrix:
            version: [1, 2]
            os: [linux, macos]
        env:
          DD_GITHUB_JOB_NAME: build (${{ matrix.version }}, ${{ matrix.os }})
        steps:
        - run: datadog-ci trace ...
    ```
</details>

## Dépannage

### Charge utile trop volumineuse
La limite de taille est d'environ `4MB`. La cause la plus courante de cette erreur est des tags extrêmement volumineux.
Utilisez l'option `--dry-run` pour voir le contenu de la commande tracée avant de l'envoyer à Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[4]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[5]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy
[6]: /fr/continuous_integration/pipelines/awscodepipeline/#add-the-pipeline-execution-id-as-an-environment-variable