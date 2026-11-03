---
description: Configurez Code Coverage en l'intégrant à GitHub ou GitLab, en définissant
  les autorisations, en créant des PR Gates et en téléchargeant des rapports de couverture.
further_reading:
- link: /code_coverage
  tag: Documentation
  text: Code Coverage
- link: /code_coverage/configuration
  tag: Documentation
  text: Configurez Code Coverage
- link: /code_coverage/flags
  tag: Documentation
  text: Organisez les données de couverture avec des flags
- link: /code_coverage/data_collected
  tag: Documentation
  text: Découvrez quelles données sont collectées pour Code Coverage
- link: /code_coverage/monorepo_support
  tag: Documentation
  text: Découvrez comment Code Coverage prend en charge les grands monorepos
title: Configurez Code Coverage
---
La configuration de Code Coverage implique les étapes suivantes :

1. Configurez l'intégration avec votre [fournisseur de code source](#integrate-with-source-code-provider) dans l'interface utilisateur Datadog.
2. Configurez les [autorisations d'accès aux données](#data-access-permissions) de couverture de code dans Datadog.
3. Configurez éventuellement une [PR Gate](#pr-gates) pour bloquer les pull requests en fonction de seuils de couverture.
4. Mettez à jour votre pipeline CI pour [télécharger les rapports de couverture de code](#upload-code-coverage-reports) vers Datadog.

## Configurez l'intégration avec le fournisseur de code source {#integrate-with-source-code-provider}

Code Coverage prend en charge les éléments suivants :

{{< tabs >}}
{{% tab "GitHub" %}}

Suivez les instructions de la [documentation d'intégration GitHub][1] pour savoir comment connecter vos dépôts GitHub à Datadog.

Code Coverage nécessite les autorisations d'application GitHub suivantes :
| Autorisation | Niveau d'accès | Objectif |
|---|---|---|
| Contenu | Lecture | Afficher le code source dans l'interface utilisateur détaillée de la couverture. |
| Pull Requests | Écriture | Afficher les données de PR dans l'interface utilisateur de couverture et écrire des commentaires de PR. |
| Checks | Écriture | Créer des PR Gates de couverture. |

Les webhooks suivants sont requis :
| Webhook | Objectif |
|---|---|
| Pull request | Recevoir les mises à jour des données de PR. |
| Pull request review | Recevoir les mises à jour des données de PR. |
| Pull request review comment | Recevoir les mises à jour des données de PR. |
| Push | Recevoir les métadonnées de commit Git. |

Si tout est configuré correctement, une coche verte s'affiche sur la page [Intégration GitHub][2] de Datadog :
{{< img src="/code_coverage/github_app_success.png" alt="Check de la réussite de l'intégration de l'application GitHub" style="width:100%" >}}

<div class="alert alert-info">Si vous disposez d'une application Marketplace gérée par Datadog ou d'une application personnalisée avec les paramètres par défaut, les autorisations et webhooks requis sont inclus.</div>

[1]: /fr/integrations/github/#github-apps-1
[2]: https://app.datadoghq.com/integrations/github/configuration
{{% /tab %}}
{{% tab "Gitlab" %}}

Suivez les instructions de la [documentation sur l'intégration du code source GitLab][1] pour savoir comment connecter vos dépôts GitLab à Datadog.

Consultez le [Guide d'intégration du code source Datadog][2] pour plus de contexte.

[1]: /fr/integrations/gitlab-source-code/
[2]: /fr/integrations/guide/source-code-integration/?tab=gitlabsaasonprem#connect-your-git-repositories-to-datadog
{{% /tab %}}
{{% tab "Azure DevOps" %}}

Suivez les instructions du [Guide d'intégration du code source Datadog][1] pour savoir comment connecter vos dépôts Azure DevOps à Datadog.
en utilisant l'[intégration du code source Azure DevOps][2].

[1]: /fr/integrations/guide/source-code-integration/?tab=azuredevopssaasonly#connect-your-git-repositories-to-datadog
[2]: https://app.datadoghq.com/integrations/azure-devops-source-code/
{{% /tab %}}
{{< /tabs >}}

Consultez [Données collectées][1] pour plus de détails sur les données collectées auprès de votre fournisseur de code source.

## Autorisations d'accès aux données {#data-access-permissions}

Si vous utilisez des [rôles personnalisés][2] plutôt que des [rôles gérés par Datadog][3], assurez-vous d'activer l'autorisation {{< ui >}}Code Coverage Read{{< /ui >}} pour les rôles qui doivent afficher les données de couverture de code.

Accédez aux [Paramètres des rôles][4], cliquez sur {{< ui >}}Edit{{< /ui >}} sur le rôle souhaité, ajoutez l'autorisation {{< ui >}}Code Coverage Read{{< /ui >}} au rôle, puis enregistrez les modifications.

Pour un contrôle plus granulaire, utilisez [Data Access Control][19] afin de restreindre les données de couverture de code par dépôt plutôt que pour l'ensemble de votre organisation. Cela empêche les informations sensibles contenues dans les rapports de couverture, telles que les chemins sources et les noms de tests, de franchir les limites des équipes.

Dans Datadog, accédez à **Organization Settings > Data Access Control** et créez un jeu de données restreint limité à Software Delivery et au dépôt que vous souhaitez restreindre. Accordez l'accès aux rôles ou aux équipes qui doivent y avoir accès.

## Portes de PR {#pr-gates}

Si vous souhaitez utiliser des PR Gates pour la couverture de PR, vous pouvez configurer les règles de PR Gates de deux manières :

- **Interface utilisateur Datadog** : Accédez à [Création de règle de portes de PR][5] et configurez une règle pour utiliser des portes sur la couverture totale ou de patch.
- **Fichier de configuration YAML** : Définissez des portes dans votre fichier [`code-coverage.datadog.yml`][6]. Cela vous permet de gérer les portes en tant que code parallèlement à votre référentiel.

Les règles provenant des deux sources sont évaluées lorsqu'une pull request est ouverte ou mise à jour. Consultez [Configuration][6] pour la syntaxe et des exemples de portes YAML.

## Télécharger les rapports de couverture de code {#upload-code-coverage-reports}

Téléchargez les fichiers de rapport de couverture de code vers Datadog soit automatiquement, avec une bibliothèque Test Optimization prise en charge, soit manuellement, en exécutant l'interface de ligne de commande `datadog-ci` dans votre environnement CI.

Consultez [Données collectées][7] pour plus de détails sur les données collectées lors du téléchargement des rapports de couverture de code.

### Télécharger automatiquement les rapports avec Test Optimization {#upload-reports-automatically-with-test-optimization}

#### Bibliothèques et versions prises en charge {#supported-libraries-and-versions}

Le téléchargement automatique des rapports de couverture de code est pris en charge dans les versions suivantes des bibliothèques Test Optimization :

| Bibliothèque | Première version prise en charge | Source de couverture |
|---|---|---|
| Ruby `datadog-ci` | `1.27.0` | SimpleCov |
| JavaScript `dd-trace` 5.x | `5.85.0` | Couverture Jest, Vitest ou NYC |
| JavaScript `dd-trace` 6.x | `6.0.0` | Couverture Jest, Vitest ou NYC |
| Python `ddtrace` | `4.4.0` | Plugin pytest par défaut utilisant `coverage.py` |
| Java `dd-java-agent` | `1.53.0` | JaCoCo |

Ces exigences de version s'appliquent uniquement aux téléchargements automatiques par les bibliothèques Test Optimization.

#### Activer les téléchargements automatiques {#enable-automatic-uploads}

Vous pouvez appliquer le paramètre {{< ui >}}Code Coverage{{< /ui >}} au niveau de l'organisation, du dépôt ou du service de test.

1. Terminez la [configuration de Test Optimization][17] pour votre bibliothèque.
2. Mettez à niveau vers une version de bibliothèque prise en charge.
3. Activez {{< ui >}}Code Coverage{{< /ui >}} dans [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][8].

    {{< img src="/code_coverage/automatic_code_coverage_upload_setting.png" alt="Bascule de Code Coverage dans les paramètres d'optimisation CI/CD au niveau de l'organisation." style="width:100%" >}}

4. Exécutez une commande de test qui produit un rapport de couverture à partir de la source répertoriée dans [Bibliothèques et versions prises en charge](#supported-libraries-and-versions).

La bibliothèque télécharge le rapport vers Datadog une fois la commande terminée.

Pour organiser et filtrer les rapports téléchargés par la bibliothèque, consultez [Ajouter des flags aux rapports téléchargés automatiquement][9], qui répertorie les bibliothèques et les versions qui prennent en charge `DD_CODE_COVERAGE_FLAGS`.

### Formats de rapport de couverture pris en charge {#supported-coverage-report-formats}

Datadog prend en charge les formats de données de couverture suivants : développez pour voir des exemples :

{{% collapse-content title="LCOV" level="h4" expanded=false id="lcov" %}}
{{< code-block lang="text" >}}
TN:
SF:src/example.c
FN:3,add
FNDA:5,add
FNF:1
FNH:1
DA:3,5
DA:4,5
DA:5,5
DA:8,0
DA:9,0
LF:5
LH:3
BRDA:4,0,0,5
BRDA:4,0,1,0
BRF:2
BRH:1
end_of_record
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Go Coverprofile" level="h4" expanded=false id="go-coverprofile" %}}
{{< code-block lang="text" >}}
mode: atomic
example/calculator.go:51.148,53.2 1 0
example/calculator.go:55.190,61.15 3 0
example/calculator.go:61.15,64.3 2 0
example/calculator.go:66.2,67.16 2 0
example/calculator.go:67.16,69.3 1 0
example/clients/api_client.go:27.87,31.2 3 2
example/clients/api_client.go:34.85,36.2 1 3
example/clients/api_client.go:39.126,44.2 4 3
example/clients/api_client.go:47.106,50.2 2 3
example/notifications/notifier.go:49.79,51.2 1 3
example/notifications/notifier.go:60.33,69.2 1 0
example/notifications/notifier.go:79.131,86.15 3 2
example/notifications/notifier.go:104.3,104.10 1 3
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Cobertura XML" level="h4" expanded=false id="cobertura-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-04.dtd">
<coverage lines-valid="5" lines-covered="3" line-rate="0.6" branches-valid="2" branches-covered="1" branch-rate="0.5" timestamp="1690658886" version="1.9">
  <sources>
    <source>src</source>
  </sources>
  <packages>
    <package name="example" line-rate="0.6" branch-rate="0.5">
      <classes>
        <class name="Example" filename="example/Example.java" line-rate="0.6" branch-rate="0.5">
          <methods>
            <method name="add" signature="(II)I" line-rate="1.0" branch-rate="1.0">
              <lines>
                <line number="3" hits="5"/>
                <line number="4" hits="5" branch="true" condition-coverage="50% (1/2)"/>
                <line number="5" hits="5"/>
              </lines>
            </method>
          </methods>
          <lines>
            <line number="3" hits="5"/>
            <line number="4" hits="5" branch="true" condition-coverage="50% (1/2)"/>
            <line number="5" hits="5"/>
            <line number="8" hits="0"/>
            <line number="9" hits="0"/>
          </lines>
        </class>
      </classes>
    </package>
  </packages>
</coverage>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Jacoco XML" level="h4" expanded=false id="jacoco-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<report name="Example">
  <sessioninfo id="SessionId" start="1690658886000" dump="1690658887000"/>
  <package name="example">
    <sourcefile name="Example.java">
      <line nr="3" mi="0" ci="5"/>
      <line nr="4" mi="0" ci="5" mb="1" cb="1"/>
      <line nr="5" mi="0" ci="5"/>
      <line nr="8" mi="1" ci="0"/>
      <line nr="9" mi="1" ci="0"/>
    </sourcefile>
  </package>
</report>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Clover XML" level="h4" expanded=false id="clover-xml" %}}
{{< code-block lang="xml" >}}
<coverage generated="1661852015">
    <project timestamp="1661852015">
        <file name="/var/www/html/src/App/Console/CronjobRunnerCommand.php">
            <class name="App\Console\CronjobRunnerCommand" namespace="global">
                <metrics complexity="3" methods="3" coveredmethods="0" conditionals="0" coveredconditionals="0" statements="4" coveredstatements="0" elements="7" coveredelements="0"/>
            </class>
            <line num="18" type="method" name="__construct" visibility="public" complexity="1" crap="2" count="0"/>
            <line num="20" type="stmt" count="1"/>
            <line num="27" type="stmt" count="0"/>
            <line num="30" type="method" name="execute" visibility="protected" complexity="1" crap="2" count="0"/>
            <line num="32" type="stmt" count="0"/>
            <metrics loc="35" ncloc="35" classes="1" methods="3" coveredmethods="0" conditionals="0" coveredconditionals="0" statements="4" coveredstatements="0" elements="7" coveredelements="0"/>
        </file>
        <file name="/var/www/html/src/App/Console/CronjobRunnerCommand2.php">
            <line num="42" type="stmt" count="1"/>
        </file>
    </project>
</coverage>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenCover XML" level="h4" expanded=false id="opencover-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="utf-8"?>
<CoverageSession xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Modules>
    <Module hash="ABC123">
      <ModulePath>Example.dll</ModulePath>
      <Files>
        <File uid="1" fullPath="src\example\Example.cs" />
      </Files>
      <Classes>
        <Class>
          <Methods>
            <Method visited="true" cyclomaticComplexity="1" sequenceCoverage="100">
              <FileRef uid="1"/>
              <SequencePoints>
                <SequencePoint vc="5" sl="3" />
                <SequencePoint vc="5" sl="4" />
                <SequencePoint vc="5" sl="5" />
                <SequencePoint vc="0" sl="9" />
              </SequencePoints>
              <BranchPoints>
                <BranchPoint vc="5" sl="4" path="0"/>
                <BranchPoint vc="0" sl="4" path="1"/>
              </BranchPoints>
            </Method>
          </Methods>
        </Class>
      </Classes>
    </Module>
  </Modules>
</CoverageSession>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Simplecov JSON" level="h4" expanded=false id="simplecov-json" %}}
{{< code-block lang="json" >}}
{
  "meta": {
    "simplecov_version": "0.21.2"
  },
  "coverage": {
    "/path/to/file1.rb": {
      "lines": [
        null,
        1,
        2,
        0,
        null,
        1,
        null,
        null,
        null,
        "ignored",
        "ignored",
        "ignored",
        null
      ],
      "branches": []
    },
    "/path/to/file2.rb": {
      "lines": [1, 1, null, 0, 1],
      "branches": []
    }
  }
}
{{< /code-block >}}
{{% /collapse-content %}}

### Installez l'interface de ligne de commande datadog-ci {#install-the-datadog-ci-cli}

<div class="alert alert-info">Si vous utilisez GitHub Actions, vous pouvez ignorer cette étape d'installation. La <a href="#uploading-coverage-reports">méthode de téléchargement GitHub Actions</a> ci-dessous utilise une action dédiée qui gère <code>datadog-ci</code> l'installation automatiquement.</div>

Des binaires autonomes sont fournis avec les [versions de Datadog CI][10]. Les architectures _linux-x64_, _linux-arm64_, _darwin-x64_, _darwin-arm64_ (macOS) et _win-x64_ (Windows) sont prises en charge. Pour installer, exécutez la commande suivante depuis votre terminal :

{{< tabs >}}
{{% tab "Linux" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

Exécutez ensuite n'importe quelle commande avec `datadog-ci` :
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}
{{% /tab %}}

{{% tab "macOS" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

Exécutez ensuite n'importe quelle commande avec `datadog-ci` :
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}
{{% /tab %}}

{{% tab "Windows" %}}
{{< code-block lang="powershell" >}}
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64" -OutFile "datadog-ci.exe"
{{< /code-block >}}

Exécutez ensuite n'importe quelle commande avec `Start-Process -FilePath "datadog-ci.exe"` :
{{< code-block lang="powershell" >}}
Start-Process -FilePath "./datadog-ci.exe" -ArgumentList version
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### npm {#npm}

Sinon, si Node.js est disponible dans votre environnement CI, installez l'interface de ligne de commande [`datadog-ci`][11] globalement en utilisant `npm` :

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

#### image Docker {#docker-image}

Sinon, vous pouvez mettre à jour votre job CI pour qu'il s'exécute dans un conteneur basé sur l'[image Docker Datadog CI][12].
L'image est fournie avec `datadog-ci` préinstallé et prêt à l'emploi.

### Téléchargement des rapports de couverture {#uploading-coverage-reports}

<div class="alert alert-info">
Datadog agrège automatiquement tous les rapports pour le même commit sur le backend. Vous n'avez pas besoin de fusionner les rapports de couverture avant de les télécharger.
</div>

Pour télécharger vos rapports de couverture de code vers Datadog, exécutez la commande suivante. Fournissez une [clé d'API Datadog][13] valide (`DD_API_KEY`), ainsi qu'un ou plusieurs chemins d'accès aux fichiers de rapport de couverture directement ou aux répertoires les contenant :

{{< tabs >}}
{{% tab "GitHub Actions" %}}

Utilisez l'action GitHub [Datadog Code Coverage Upload][1]. Cette action installe et exécute automatiquement `datadog-ci`, donc aucune configuration supplémentaire n'est requise :

<pre>
<code class="language-yaml" data-lang="yaml">
steps:
- name: Upload coverage reports to Datadog
  uses: DataDog/coverage-upload-github-action@v1
  with:
    api_key: ${{ secrets.DD_API_KEY }}
    site: {{< region-param key="dd_site" >}}
</code>
</pre>

Sinon, si `datadog-ci` est installé, vous pouvez l'exécuter directement :

<pre>
<code class="language-yaml" data-lang="yaml">
steps:
- name: Upload coverage reports to Datadog
  run: datadog-ci coverage upload .
  env:
    DD_API_KEY: ${{ secrets.DD_API_KEY }}
    DD_SITE: {{< region-param key="dd_site" >}}
</code>
</pre>

[1]: https://github.com/marketplace/actions/datadog-code-coverage-upload
{{% /tab %}}
{{% tab "Gitlab" %}}
<pre>
<code class="language-yaml" data-lang="yaml">
test:
  stage: test
  script:
    - ... # run your tests and generate coverage reports
    - datadog-ci coverage upload . # make sure to add the DD_API_KEY CI/CD variable
</code>
</pre>
{{% /tab %}}
{{% tab "Azure Pipelines" %}}
<code class="language-yaml" data-lang="yaml">
- script: datadog-ci coverage upload --format=clover coverage/clover.xml
  displayName: 'Upload coverage to Datadog'
  env:
    DD_API_KEY: $(DD_API_KEY)
    DD_SITE: 'datadoghq.com'
</code>
{{% /tab %}}
{{< /tabs >}}

La commande recherche de manière récursive les fichiers de rapport de couverture pris en charge dans les répertoires spécifiés ; il suffit donc généralement de spécifier le répertoire actuel (`.`).
Consultez la [`datadog-ci` documentation][14] pour plus de détails sur la commande `datadog-ci coverage upload`.

Peu après la fin du téléchargement du rapport de couverture de code, Datadog ajoute un commentaire de PR avec les valeurs de pourcentage de couverture de code. Pour ajouter une ventilation par fichier de la couverture totale et de la couverture des correctifs au commentaire, consultez [Commentaires de PR][21].
Vous pouvez également consulter vos données de couverture agrégées par pull request sur la [page Code Coverage][15] dans Datadog, avec la possibilité d'examiner les fichiers et les lignes de code individuels.

{{< img src="/code_coverage/pr_details.png" text="Code Coverage PR details page in Datadog" style="width:100%" >}}

## Dépannage {#troubleshooting}

### La commande d'envoi de la couverture ne détecte pas les fichiers de rapport de couverture {#coverage-upload-command-does-not-detect-coverage-report-files}

La commande `datadog-ci coverage upload` détecte automatiquement les fichiers de rapport de couverture pris en charge dans les répertoires spécifiés à l'aide d'heuristiques, telles que les noms de fichiers et les extensions.
Si vos fichiers de rapport de couverture ne correspondent pas aux modèles attendus, la commande pourrait ne pas les détecter automatiquement. Dans ce cas, spécifiez le format du rapport et fournissez les chemins d'accès aux fichiers en tant qu'arguments positionnels. Exemple :

{{< code-block lang="shell" >}}
datadog-ci coverage upload --format=lcov \
  src/coverage-reports/unit-tests/coverage.info \
  src/coverage-reports/e2e-tests/coverage.info
{{< /code-block >}}

### L'envoi de la couverture échoue avec l'erreur « Format could not be detected » {#coverage-upload-fails-with-format-could-not-be-detected-error}

La commande `datadog-ci coverage upload` détecte automatiquement le format des fichiers de rapport de couverture en fonction de leur contenu et de leur extension.
Si la commande échoue avec l'erreur suivante :

```
Invalid coverage report file [...]: format could not be detected
```
spécifiez explicitement le format à l'aide de l'option `--format`, comme ceci :

{{< code-block lang="shell" >}}
datadog-ci coverage upload --format=cobertura reports/cobertura.xml
{{< /code-block >}}

### L'envoi de la couverture génère l'erreur « Could not sync git metadata » {#coverage-upload-outputs-could-not-sync-git-metadata-error}

L'envoi des métadonnées Git n'est requis que si vous ne pouvez pas intégrer directement votre fournisseur CI avec Datadog.
Si vous utilisez une [intégration de fournisseur de code source][18], telle que l'application Datadog GitHub ou l'intégration Gitlab, vous pouvez désactiver l'envoi des métadonnées git en passant l'indicateur `--skip-git-metadata-upload=1` à la commande `datadog-ci coverage upload`, comme ceci :

{{< code-block lang="shell" >}}
datadog-ci coverage upload --skip-git-metadata-upload=1 .
{{< /code-block >}}

### L'interface utilisateur Datadog n'affiche pas les fichiers modifiés dans la vue PR {#datadog-ui-does-not-show-changed-files-in-the-pr-view}

Par défaut, le tableau « Fichiers modifiés » ne contient que les fichiers de code source exécutables présents dans les rapports de couverture envoyés.
Sélectionnez {{< ui >}}Non-executable files{{< /ui >}} ou {{< ui >}}All{{< /ui >}} dans l'en-tête du tableau pour afficher tous les fichiers qui ont été modifiés dans la PR, qu'ils soient exécutables ou non.

{{< img src="/code_coverage/non_executable_files.png" text="In Changed files, you have the option to select Non-executable on the table header" style="width:100%" >}}

Si un fichier de code source est marqué par erreur comme non exécutable, il est probablement absent de vos rapports de couverture envoyés.
Assurez-vous de télécharger tous vos rapports pertinents et vérifiez la configuration de votre outil de couverture pour confirmer que les données de couverture sont collectées pour tous les fichiers applicables.

Les sources de test ne sont pas considérées comme des fichiers exécutables car elles ne font pas partie de la base de code de production mesurée pour la couverture.

### L'interface utilisateur Datadog affiche des chemins de fichiers incorrects {#datadog-ui-shows-incorrect-file-paths}

Code Coverage repose sur le fait que les chemins de fichiers dans les rapports de couverture soient absolus ou relatifs à la racine du dépôt.
Si les chemins dans votre rapport sont relatifs à un répertoire différent dans votre dépôt, spécifiez le chemin de base correct (relatif à la racine du dépôt) avec l'option `--base-path` lors de l'exécution de la commande `datadog-ci coverage upload`, comme ceci :

{{< code-block lang="shell" >}}
datadog-ci coverage upload --base-path=frontend/src .
{{< /code-block >}}

### Couverture inexacte provenant de lignes non exécutables {#inaccurate-coverage-from-non-executable-lines}

Certains outils de couverture incluent des lignes non exécutables (telles que des commentaires, des lignes vides et des accolades fermantes) dans leurs rapports, les comptant comme non couvertes. Cela peut réduire vos pourcentages de couverture et produire des faux négatifs pour des lignes qui ne peuvent jamais être exécutées.

Lors du téléchargement, l'interface de ligne de commande analyse automatiquement vos fichiers sources pour identifier ces lignes non exécutables afin qu'elles puissent être exclues des calculs de couverture.

Les corrections de fichiers prennent en charge les langages suivants : Go, Kotlin, C/C++, Swift, Objective-C et PHP.

Vous pouvez contrôler ce comportement avec les options suivantes :

- `--disable-file-fixes` : Désactivez entièrement la génération de corrections de fichiers.
- `--file-fixes-search-path <dir>` : Remplacez le répertoire racine utilisé pour analyser les fichiers sources. Par défaut, la racine du dépôt est utilisée. Ceci est utile dans les monorepos ou lorsque vos rapports de couverture ne couvrent qu'un sous-ensemble de la base de code, car cela accélère l'analyse en limitant l'arborescence des répertoires parcourus.

### Discrépance entre l'interface utilisateur Datadog et les valeurs des rapports de couverture {#discrepancy-between-datadog-ui-and-coverage-report-values}

Datadog fusionne automatiquement les rapports de couverture pour le même commit.
Par conséquent, le pourcentage de couverture affiché dans l'interface utilisateur Datadog peut différer des valeurs de vos rapports de couverture individuels, surtout si ces rapports contiennent des entrées de fichiers de code source qui se chevauchent ou sont en double.

Si vous utilisez un outil externe (tel que [ReportGenerator][16]) pour fusionner les rapports de couverture avant de les télécharger vers Datadog,
Assurez-vous que vos rapports fusionnés ne contiennent pas d'entrées de fichiers de code source en double.
Datadog déduplique les fichiers qui se chevauchent dans les rapports, ce qui peut entraîner des différences entre vos valeurs de couverture d'origine et les valeurs fusionnées affichées dans l'interface utilisateur de Datadog.

Pour une description de la manière dont les rapports sont fusionnés et dont chaque statut de ligne est comptabilisé, consultez [Code Coverage Calculation][20].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/code_coverage/data_collected/#source-code-provider-integration
[2]: /fr/account_management/rbac/permissions/#custom-roles
[3]: /fr/account_management/rbac/permissions/#managed-roles
[4]: https://app.datadoghq.com/organization-settings/roles
[5]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[6]: /fr/code_coverage/configuration#pr-gates
[7]: /fr/code_coverage/data_collected/#code-coverage-report-upload
[8]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=organization
[9]: /fr/code_coverage/flags#add-flags-to-automatically-uploaded-reports
[10]: https://github.com/DataDog/datadog-ci/releases
[11]: https://www.npmjs.com/package/@datadog/datadog-ci
[12]: https://hub.docker.com/r/datadog/ci
[13]: https://app.datadoghq.com/organization-settings/api-keys
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-coverage
[15]: https://app.datadoghq.com/ci/code-coverage
[16]: https://reportgenerator.io/
[17]: /fr/tests/setup/
[18]: /fr/code_coverage/setup/#integrate-with-source-code-provider
[19]: https://app.datadoghq.com/organization-settings/data-access-controls
[20]: /fr/code_coverage/coverage_calculation
[21]: /fr/code_coverage/configuration#pr-comments