---
title: Importer des fichiers de rapport de test JUnit dans Datadog
kind: documentation
further_reading:
  - link: /continuous_integration/explore_tests
    tag: Documentation
    text: Explorer les résultats de test et les performances
  - link: /continuous_integration/troubleshooting/
    tag: Documentation
    text: Dépannage CI
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">
Le site Datadog sélectionné ({{< region-param key="dd_site_name" >}}) n'est pas pris en charge.
</div>
{{< /site-region >}}

Les fichiers de rapport de test JUnit sont des fichiers XML qui contiennent des informations sur l'exécution des tests, notamment les noms des tests et des suites de tests, leur statut (réussite ou échec), leur durée et parfois des logs d'erreurs. Bien que ce format ait été créé dans le cadre du framework de test [JUnit][1], de nombreux autres frameworks populaires peuvent l'utiliser pour générer leurs résultats.

Au lieu d'instrumenter vos tests de façon native en utilisant des traceurs Datadog (la méthode recommandée étant donné qu'elle offre des résultats de test plus complets), vous avez la possibilité d'importer des rapports de test JUnit au format XML.

Les résultats de test importés par le biais de rapports XML JUnit s'affichent en même temps que les données de test envoyées par les traceurs. Cette méthode présente toutefois certaines limites, comme l'absence de traces distribuées sur les tests d'intégration, ou l'absence de stack traces structurées. Par conséquent, utilisez-la uniquement si le langage ou le framework de test que vous utilisez n'est pas pris en charge nativement.

## Installer l'interface de ligne de commande Datadog CI

Installez l'interface de ligne de commande [`datadog-ci`][2] de façon globale avec `npm` :

{{< code-block lang="bash" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

## Importer des rapports de test

Pour importer vos rapports de test XML JUnit dans Datadog, exécutez la commande ci-dessous. Vous devrez spécifier le nom du service ou de la bibliothèque testé(e) à l'aide du paramètre `--service`, ainsi qu'un ou plusieurs chemins pointant vers les fichiers de rapport XML directement ou vers les dossiers dans lesquels ils se trouvent :

{{< code-block lang="bash" >}}
datadog-ci junit upload --service <nom_service> <chemin> [<chemin> ...]
{{< /code-block >}}

Indiquez une [clé d'API Datadog][3] valide dans la variable d'environnement `DATADOG_API_KEY`, et l'environnement dans lequel les tests ont été exécutés (par exemple, `local` si vous importez des résultats depuis la machine d'un développeur, ou `ci` si vous les importez depuis un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Par exemple :

<pre>
<code>
DD_ENV=ci DATADOG_API_KEY=&lt;clé_api&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
</code>
</pre>

## Paramètres de configuration

Voici la liste complète des options disponibles lorsque la commande `datadog-ci junit upload` est utilisée :

`--service` (requis)
: Nom du service ou de la bibliothèque testé(e).<br/>
**Variable d'environnement** : `DD_SERVICE`<br/>
**Exemple** : `my-api-service`

`--env`
: Environnement dans lequel les tests ont été exécutés.<br/>
**Variable d'environnement** : `DD_ENV`<br/>
**Exemple** : `ci`

`--tags`
: Paires key/value au format `key:value` à associer à l'ensemble des tests (le paramètre `--tags` peut être fourni plusieurs fois). Lorsque vous spécifiez des tags avec `DD_TAGS`, séparez-les avec des virgules (par exemple, `team:backend,priority:high`).<br/>
**Variable d'environnement** : `DD_TAGS`<br/>
**Valeur par défaut** : (aucune)<br/>
**Exemple** : `team:backend`<br/>
**Remarque** : les tags spécifiés avec `--tags` et avec la variable d'environnement `DD_TAGS` sont fusionnés. Si `--tags` et `DD_TAGS` comportent la même clé, la valeur de `DD_TAGS` est prioritaire.

`--max-concurrency`
: Nombre maximal d'importations simultanées via l'API.<br/>
**Valeur par défaut** : `20`

`--dry-run`
: Permet d'exécuter la commande sans que le fichier ne soit réellement importé dans Datadog. Toutes les autres vérifications sont effectuées.<br/>
**Valeur par défaut** : `false`

Arguments positionnels
: Les chemins vers les rapports XML JUnit ou vers les dossiers dans lesquels ils sont situés. Si vous spécifiez un dossier, l'interface de ligne de commande recherche tous les fichiers `.xml` qui s'y trouvent.

Les variables d'environnement suivantes sont prises en charge :

`DATADOG_API_KEY` (requis)
: La [clé d'API Datadog][3] utilisée pour authentifier les requêtes.<br/>
**Valeur par défaut** : (aucune)

En outre, configurez le site Datadog de façon à utiliser celui que vous avez sélectionné ({{< region-param key="dd_site_name" >}}) :

`DATADOG_SITE` (requis)
: Le [site Datadog][4] vers lequel importer les résultats.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}

## Recueillir les métadonnées de référentiel et de commit

Datadog tire parti des données Git pour vous présenter les résultats de vos tests et les regrouper par référentiel et commit. Les métadonnées Git sont recueillies par l'interface de ligne de commande CI de Datadog, à partir des variables d'environnement du fournisseur de CI et du dossier local `.git` dans le chemin du projet, le cas échéant. Pour lire ce dossier, le binaire [`git`][5] est requis.

Si vous exécutez des tests pour des fournisseurs de CI non pris en charge, ou sans dossier `.git`, vous pouvez configurer manuellement les données Git à l'aide de variables d'environnement. Ces dernières sont prioritaires et remplacent les informations détectées automatiquement. Configurez les variables d'environnement suivantes pour obtenir des données Git :

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

## Recueillir les métadonnées de configuration de l'environnement

Datadog utilise des tags spéciaux dédiés pour identifier la configuration de l'environnement dans lequel les tests sont exécutés, notamment le système d'exploitation, le runtime et les détails de l'appareil, le cas échéant. Lorsque le même test pour le même commit est exécuté sous plusieurs configurations différentes (par exemple, sous Windows et sous Linux), les tags sont utilisés pour différencier les configurations en cas d'échec du test ou d'irrégularité.

Vous pouvez spécifier ces tags spéciaux à l'aide du paramètre `--tags` lorsque vous utilisez la commande `datadog-ci junit upload`, ou en définissant la variable d'environnement `DD_TAGS`.

Tous ces tags sont facultatifs, et seuls ceux que vous spécifiez seront utilisés pour identifier les différentes configurations de l'environnement.

`os.platform`
: Nom du système d'exploitation.<br/>
**Exemples** : `windows`, `linux`, `darwin`

`os.version`
: Version du système d'exploitation.<br/>
**Exemples** : `10.15.4`, `14.3.2`, `95`

`os.architecture`
: Architecture du système d'exploitation.<br/>
**Exemples** : `x64`, `x86`, `arm64`

`runtime.name`
: Nom de l'interpréteur du langage ou du runtime de programmation.<br/>
**Exemples** : `.NET`, `.NET Core`, `OpenJDK Runtime Environment`, `Java(TM) SE Runtime Environment`, `CPython`

`runtime.version`
: Version du runtime.<br/>
**Exemples** : `5.0.0`, `3.1.7`

`runtime.vendor`
: Nom du fournisseur du runtime, le cas échéant. Les exemples sont donnés dans le cas d'un runtime Java.<br/>
**Exemples** : `AdoptOpenJDK`, `Oracle Corporation`

`runtime.architecture`
: Architecture du runtime.<br/>
**Exemples** : `x64`, `x86`, `arm64`

Pour les applications mobiles (Swift, Android) :

`device.model`
: Modèle de l'appareil testé.<br/>
**Exemples** : `iPhone11,4`, `AppleTV5,3`

`device.name`
: Nom de l'appareil testé.<br/>
**Exemples** : `iPhone 12 Pro Simulator`, `iPhone 13 (QA team)`

<!-- TODO: uncomment once added in backend
`test.bundle`
: Permet d'exécuter des groupes de suites de tests séparément.<br/>
**Exemples** : `ApplicationUITests`, `ModelTests` -->

## Ajouter des métadonnées via des éléments `<property>`

En plus du paramètre `--tags` et de la variable d'environnement `DD_TAGS`, qui appliquent des tags custom à l'ensemble des tests inclus dans le rapport XML importé, vous pouvez appliquer des tags supplémentaires à des tests spécifiques en ajoutant des éléments `<property name="dd_tags[key]" value="value">` au sein d'un élément `<testsuite>` ou `<testcase>`. Lorsque vous ajoutez des tags à un élément `<testcase>`, ils sont stockés dans la span du test. Lorsque vous ajoutez des tags à un élément `<testsuite>`, ils sont stockés dans toutes les spans de test de la suite concernée.

Pour être traité, l'attribut `name` dans l'élément `<property>` doit respecter le format `dd_tags[key]`, où `key` correspond au nom du tag custom à ajouter. Les autres propriétés sont ignorées.

**Exemple** : ajout de tags à un élément `<testcase>`

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.010000">
      <properties>
        <property name="dd_tags[custom_tag]" value="valeur quelconque"></property>
        <property name="dd_tags[runtime.name]" value="CPython"></property>
      </properties>
    </testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

**Exemple** : ajout de tags à un élément `<testsuite>`

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <properties>
      <property name="dd_tags[custom_tag]" value="valeur quelconque"></property>
      <property name="dd_tags[runtime.name]" value="CPython"></property>
    </properties>
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.010000"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://junit.org/junit5/
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/getting_started/site/
[5]: https://git-scm.com/downloads