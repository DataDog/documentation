---
aliases:
- /fr/continuous_integration/setup_tests/junit_upload
- /fr/continuous_integration/tests/junit_upload
code_lang: junit_xml
code_lang_weight: 60
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: Explorer les résultats de test et les performances
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
kind: documentation
title: Importer des fichiers de rapport de test JUnit dans Datadog
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Le site Datadog sélectionné ({{< region-param key="dd_site_name" >}}) n'est pas pris en charge.
</div>
{{< /site-region >}}

<div class="alert alert-warning"><strong>Remarque</strong> : Datadog vous conseille d'utiliser l'instrumentation native des tests plutôt que l'importation de fichiers XML JUnit, car l'instrumentation native fournit des résultats temporels plus précis et prend en charge les traces distribuées sur les tests d'intégration ainsi que les stack traces structurées.</div>

## Présentation

Les fichiers de rapport de test JUnit sont des fichiers XML qui contiennent des informations sur l'exécution des tests, notamment les noms des tests et des suites de tests, leur statut (réussite ou échec), leur durée et parfois des logs d'erreurs. Bien que ce format ait été créé dans le cadre du framework de test [JUnit][1], de nombreux autres frameworks populaires peuvent l'utiliser pour générer leurs résultats.

Si votre framework de test permet de générer des rapports de test XML JUnit, vous pouvez les utiliser comme alternative légère à l'[instrumentation native de vos tests][2] à l'aide des traceurs Datadog. Les résultats de test importés par le biais de rapports XML JUnit s'affichent en même temps que les données de test envoyées par les traceurs.

## Compatibilité

Bibliothèque de tracing Datadog prise en charge :

| Bibliothèque Datadog | Version |
|---|---|
| `datadog-ci` | >= 2.17.0 |

## Installer l'interface de ligne de commande Datadog CI

Installez l'interface de ligne de commande [`datadog-ci`][3] de façon globale avec `npm` :

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}


### Binaire standalone (bêta)

<div class="alert alert-warning"><strong>Remarque</strong> : les binaires standalone sont en version <strong>bêta</strong>, et leur stabilité n'est donc pas garantie.</div>

Si l'installation de Node.js via l'interface de ligne de commande n'est pas possible, des binaires standalone sont intégrés aux [versions de l'interface Datadog CI][4]. Seuls _linux-x64_, _darwin-x64_ (MacOS) et _win-x64_ (Windows) sont pris en charge. Pour l'installer, exécutez les commandes suivantes à partir de votre terminal :

{{< tabs >}}
{{% tab "Linux" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

Ensuite, exécutez n'importe quelle commande avec `datadog-ci` :
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}

{{% /tab %}}

{{% tab "MacOS" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

Ensuite, exécutez n'importe quelle commande avec `datadog-ci` :
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}

{{% /tab %}}

{{% tab "Windows" %}}
{{< code-block lang="powershell" >}}
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64.exe" -OutFile "datadog-ci.exe"
{{< /code-block >}}

Ensuite, exécutez n'importe quelle commande avec `Start-Process -FilePath "datadog-ci.exe"` :
{{< code-block lang="powershell" >}}
Start-Process -FilePath "./datadog-ci.exe" -ArgumentList version
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## Importer des rapports de test

Pour importer vos rapports de test XML JUnit dans Datadog, exécutez la commande ci-dessous. Vous devrez spécifier le nom du service ou de la bibliothèque testé(e) à l'aide du paramètre `--service`, ainsi qu'un ou plusieurs chemins pointant vers les fichiers de rapport XML directement ou vers les dossiers dans lesquels ils se trouvent :

{{< code-block lang="shell" >}}
datadog-ci junit upload --service <nom_service> <path> [<chemin> ...]
{{< /code-block >}}

Indiquez une [clé d'API Datadog][5] valide dans la variable d'environnement `DATADOG_API_KEY`, et l'environnement dans lequel les tests ont été exécutés (par exemple, `local` si vous importez des résultats depuis la machine d'un développeur, ou `ci` si vous les importez depuis un fournisseur de CI) dans la variable d'environnement `DD_ENV`. Par exemple :

<pre>
<code>
DD_ENV=ci DATADOG_API_KEY=&lt;clé_api&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
</code>
</pre>

<div class="alert alert-warning">Assurez-vous que cette commande est exécutée dans votre interface de ligne de commande même si vos tests ont échoué. En général, lorsque les tests échouent, la tâche est abandonnée et la commande d'importation ne s'exécute pas.</div>

{{< tabs >}}

{{% tab "GitHub Actions" %}}
Utilisez les [fonctions du check de statut][1] :

{{< code-block lang="yaml" >}}
steps:
  - name: Run tests
    run: ./run-tests.sh
  - name: Upload test results to Datadog
    if: always()
    run: datadog-ci junit upload --service nom_service ./junit.xml
{{< /code-block >}}

[1]: https://docs.github.com/en/actions/learn-github-actions/expressions#always
{{% /tab %}}

{{% tab "GitLab" %}}
Utilisez la [section `after_script`][1] :

{{< code-block lang="yaml" >}}
test:
  stage: test
  script:
    - ./run-tests.sh
  after_script:
    - datadog-ci junit upload --service nom_service ./junit.xml
{{< /code-block >}}

[1]: https://docs.gitlab.com/ee/ci/yaml/#after_script
{{% /tab %}}

{{% tab "Jenkins" %}}
Utilisez la [section `post`][1] :

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Run tests') {
      steps {
        sh './run-tests.sh'
      }
      post {
        always {
          sh 'datadog-ci junit upload --service nom_service ./junit.xml'
        }
      }
    }
  }
}
{{< /code-block >}}

[1]: https://www.jenkins.io/doc/book/pipeline/syntax/#post
{{% /tab %}}

{{% tab "Bash" %}}
Si votre système d'interface de ligne de commande autorise les sous-shells :

{{< code-block lang="shell" >}}
$(./run-tests.sh); export tests_exit_code=$?
datadog-ci junit upload --service nom_service ./junit.xml
if [ $tests_exit_code -ne 0 ]; then exit $tests_exit_code; fi
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

Les rapports de plus de 250 MiB peuvent ne pas être entièrement traités, entraînant alors des tests ou des logs manquants. Pour une expérience optimale, veillez à ce que les rapports soient inférieurs à 250 MiB.

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

`--metrics`
: Paire numériques key-value au format `key:number` à associer à l'ensemble des tests (le paramètre `--metrics` peut être spécifié plusieurs fois). Lorsque vous spécifiez des métriques avec `DD_METRICS`, séparez-les avec des virgules (par exemple, `memory_allocations:13,test_importance:2`).<br/>
**Variable d'environnement** : `DD_METRICS`<br/>
**Valeur par défaut** : (aucune)<br/>
**Exemple** : `memory_allocations:13`<br/>
**Remarque** : les métriques spécifiées avec `--metrics` et avec la variable d'environnement `DD_METRICS` sont fusionnées. Si `--metrics` et `DD_METRICS` comportent la même clé, la valeur de `DD_METRICS` est prioritaire.

`--report-tags`
: Paires key-value au format `key:value`. Fonctionne comme le paramètre `--tags`, mais ces tags sont uniquement appliqués au niveau de la session et ne sont **pas** fusionnés avec la variable d'environnement `DD_TAGS`<br/>
**Valeur par défaut** : (aucune)<br/>
**Exemple** : `test.code_coverage.enabled:true`<br/>

`--report-metrics`
: Paires key-value au format `key:123`. Fonctionne comme le paramètre `--metrics`, mais ces tags sont uniquement appliqués au niveau de la session et ne sont **pas** fusionnés avec la variable d'environnement `DD_METRICS`<br/>
**Valeur par défaut** : (aucune)<br/>
**Exemple** : `test.code_coverage.lines_pct:82`<br/>

`--xpath-tag`
: Clé et expression xpath au format `key=expression`. Permettent de personnaliser les tags du test dans le fichier (le paramètre `--xpath-tag` peut être spécifié plusieurs fois).<br/>
Consultez la section [Ajouter des métadonnées avec des expressions XPath](#ajouter-des-metadonnees-avec-des-expressions-xpath) pour en savoir plus sur les expressions prises en charge.<br/>
**Valeur par défaut** : (aucune)<br/>
**Exemple** : `test.suite=/testcase/@classname`<br/>
**Remarque** : les tags spécifiés avec `--xpath-tag` et `--tags` ou la variable d'environnement `DD_TAGS` sont fusionnés. La valeur de xpath-tag est appliquée en priorité, car elle est généralement différente pour chaque test.

`--logs`
: Activer la transmission du contenu des rapports XML sous forme de [logs][6]. Le contenu de `<system-out>`, `<system-err>` et `<failure>` est recueilli sous forme de logs. Les logs des éléments au sein d'un `<testcase>` sont automatiquement associés au test.<br/>
**Variable d'environnement** : `DD_CIVISIBILITY_LOGS_ENABLED`<br/>
**Valeur par défaut** : `false`<br/>
**Remarque** : les logs et CI Visibility sont facturés séparément.

`--max-concurrency`
: Nombre maximal d'importations simultanées via l'API.<br/>
**Valeur par défaut** : `20`

`--dry-run`
: Permet d'exécuter la commande sans que le fichier ne soit réellement importé dans Datadog. Toutes les autres vérifications sont effectuées.<br/>
**Valeur par défaut** : `false`

`--skip-git-metadata-upload`
: Flag utilisé pour ignorer l'importation des métadonnées git. Si vous souhaitez les importer, vous pouvez passer le paramètre --skip-git-metadata-upload=0 ou --skip-git-metadata-upload=false.<br/>
**Valeur par défaut** : `true`<br/>

`--git-repository-url`
: L'URL du dépôt à partir duquel récupérer les métadonnées git. Si ce paramètre n'est pas passé, l"URL est récupérée depuis le dépôt git local.<br/>
**Valeur par défaut** : dépôt git local<br/>
**Exemple** : `git@github.com:DataDog/documentation.git`<br/>

`--verbose`
: Flag utilisé pour augmenter le niveau de détail de la sortie de la commande<br/>
**Valeur par défaut** : `false`<br/>


Arguments positionnels
: Les chemins vers les rapports XML JUnit ou vers les dossiers dans lesquels ils sont situés. Si vous spécifiez un dossier, l'interface de ligne de commande recherche tous les fichiers `.xml` qui s'y trouvent.

Les variables d'environnement suivantes sont prises en charge :

`DATADOG_API_KEY` (requis)
: La [clé d'API Datadog][5] utilisée pour authentifier les requêtes.<br/>
**Valeur par défaut** : (aucune)

En outre, configurez le site Datadog de façon à utiliser celui que vous avez sélectionné ({{< region-param key="dd_site_name" >}}) :

`DATADOG_SITE` (requis)
: Le [site Datadog][7] vers lequel importer les résultats.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}

## Recueillir les métadonnées Git

{{% ci-git-metadata %}}

## Importer les métadonnées Git

À partir de la version `2.9.0` de `datadog-ci`, CI Visibility importe automatiquement les métadonnées Git (historique de commits). Ces métadonnées contiennent les noms des fichiers mais pas leur contenu. Si vous souhaitez désactiver ce comportement, passez le flag `--skip-git-metadata-upload`.

## Recueillir les métadonnées de configuration de l'environnement

Datadog utilise des tags spéciaux dédiés pour identifier la configuration de l'environnement dans lequel les tests sont exécutés, notamment le système d'exploitation, le runtime et les détails de l'appareil, le cas échéant. Lorsque le même test pour le même commit est exécuté sous plusieurs configurations différentes (par exemple, sous Windows et sous Linux), les tags sont utilisés pour différencier les configurations en cas d'échec du test ou d'irrégularité.

Vous pouvez spécifier ces tags spéciaux à l'aide du paramètre `--tags` lorsque vous utilisez la commande `datadog-ci junit upload`, ou en définissant la variable d'environnement `DD_TAGS`.

Tous ces tags sont facultatifs, et seuls ceux que vous spécifiez seront utilisés pour identifier les différentes configurations de l'environnement.

`test.bundle`
: Permet d'exécuter des groupes de suites de tests séparément.<br/>
**Exemples** : `ApplicationUITests`, `ModelTests`

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


## Ajouter des métadonnées avec des expressions XPath

En plus du paramètre d'interface de ligne de commande `--tags` et de la variable d'environnement `DD_TAGS`, qui appliquent des tags personnalisés à tous les tests inclus dans le rapport XML importé, le paramètre `--xpath-tag` fournit des règles personnalisées pour ajouter à chaque test des tags provenant de différents attributs du XML.

Le paramètre fourni doit correspondre au format `key=expression`, où `key` est le nom du tag personnalisé à ajouter et où `expression` est une expression [XPath][8] valide parmi celles prises en charge.

Même si la syntaxe XPath est utilisée pour plus de simplicité, seules les expressions suivantes sont prises en charge :

`/testcase/@attribute-name`
: L'attribut XML issu de `<testcase attribute-name="value">`.

`/testcase/../@attribute-name`
: L'attribut XML issu du `<testsuite attribute-name="value">` parent du `<testcase>` actuel.

`/testcase/..//property[@name='property-name']`
: L'attribut `value` du `<property name="property-name" value="value">` au sein du `<testsuite>` parent du `<testcase>` actuel.

`/testcase//property[@name='property-name']`
: L'attribut `value` du `<property name="property-name" value="value">` au sein du `<testcase>` actuel.

Exemples :

{{< tabs >}}

{{% tab "Testsuite depuis @classname" %}}
Par défaut, le tag `test.suite` des tests est lu depuis `<testsuite name="suite name">`. Toutefois, certains plug-ins peuvent transmettre une valeur plus adaptée dans `<testcase classname="TestSuite">`.

Pour modifier les tags `value 1`, `value 2` de `test.suite` et les définir sur `SomeTestSuiteClass`, `OtherTestSuiteClass` :

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="value 1">
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.030000"></testcase>
  </testsuite>
  <testsuite tests="1" failures="0" time="0.021300" name="value 2">
    <testcase classname="OtherTestSuiteClass" name="test_something" time="0.021300"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service nom_service \
  --xpath-tag test.suite=/testcase/@classname ./junit.xml
{{< /code-block >}}

{{% /tab %}}

{{% tab "Tag depuis un attribut" %}}
Pour ajouter `custom_tag` à chaque test avec les valeurs `value 1`, `value 2` :

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.020000" name="SomeTestSuiteClass">
    <testcase name="test_something" time="0.010000" attr="value 1"></testcase>
    <testcase name="test_other" time="0.010000" attr="value 2"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service nom_service \
  --xpath-tag custom_tag=/testcase/@attr ./junit.xml
{{< /code-block >}}

{{% /tab %}}

{{% tab "Tag depuis la propriété testsuite" %}}
Pour ajouter `custom_tag` à chaque test avec les valeurs `value 1`, `value 2` :

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <properties>
      <property name="prop" value="value 1"></property>
    </properties>
    <testcase name="test_something" time="0.030000" attr="value 1"></testcase>
  </testsuite>
  <testsuite tests="1" failures="0" time="0.021300" name="OtherTestSuiteClass">
    <properties>
      <property name="prop" value="value 1"></property>
    </properties>
    <testcase name="test_something" time="0.021300" attr="value 1"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service nom_service \
  --xpath-tag custom_tag=/testcase/..//property[@name=\'prop\'] ./junit.xml
{{< /code-block >}}

**Remarque :** le nom doit être placé entre guillemets. Bash exige que les guillemets soient échappés à l'aide d'une barre oblique inversée. Par exemple, `[@name='prop']` doit être saisi comme suit : `[@name=\'prop\'].
{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-warning">
  Si vous utilisez bash depuis Git pour Windows, définissez la variable d'environnement <strong>MSYS_NO_PATHCONV=1</strong>.
  Sinon, les arguments commençant par <strong>/</strong> seront interprétés en tant que chemin Windows.
</div>

## Ajouter des métadonnées via des éléments property

Vous avez également la possibilité d'appliquer des tags supplémentaires à des tests spécifiques en ajoutant des éléments `<property name="dd_tags[key]" value="value">` au sein d'un élément `<testsuite>` ou `<testcase>`. Lorsque vous ajoutez des tags à un élément `<testcase>`, ils sont stockés dans la span du test. Lorsque vous ajoutez des tags à un élément `<testsuite>`, ils sont stockés dans toutes les spans de test de la suite concernée.

Pour être traité, l'attribut `name` dans l'élément `<property>` doit respecter le format `dd_tags[key]`, où `key` correspond au nom du tag custom à ajouter. Les autres propriétés sont ignorées.

**Exemple** : ajout de tags à un élément `<testcase>`.

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

**Exemple** : ajout de tags à un élément `<testsuite>`.

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

Les valeurs que vous envoyez à Datadog sont des chaînes de caractères, ce qui signifie que les facettes sont affichées dans l'ordre lexicographique. Pour envoyer des entiers au lieu de chaînes, utilisez le flag `--metrics` et la variable d'environnement `DD_METRICS`.


## Transmission de la couverture du code

Il est possible de transmettre la couverture du code pour un rapport JUnit donné via l'option `--report-metrics`. Pour ce faire, définissez la métrique `test.code_coverage.lines_pct` :

```shell
datadog-ci junit upload --service my-api-service --report-metrics test.code_coverage.lines_pct:82 unit-tests/junit-reports e2e-tests/single-report.xml
```

Pour en savoir plus, consultez la section [Couverture du code][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://junit.org/junit5/
[2]: https://docs.datadoghq.com/fr/continuous_integration/tests/#setup
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: https://github.com/DataDog/datadog-ci/releases
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /fr/logs/
[7]: /fr/getting_started/site/
[8]: https://www.w3schools.com/xml/xpath_syntax.asp
[10]: /fr/continuous_integration/integrate_tests/code_coverage/?tab=junitreportuploads