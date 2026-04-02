---
algolia:
  tags:
  - code analysis
  - code analysis datadog
  - code analysis ci pipeline
  - code analysis ci pipelines
aliases:
- /fr/code_analysis/faq
further_reading:
- link: https://www.datadoghq.com/blog/datadog-code-analysis/
  tag: Blog
  text: Livrer un code de haute qualité et sécurisé plus rapidement avec la solution
    Code Analysis de Datadog
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: Blog
  text: Réduire les vulnérabilités provenant de bibliothèques tierces avec la solution
    Software Composition Analysis de Datadog
- link: /code_analysis/
  tag: Documentation
  text: En savoir plus sur Code Analysis
- link: /security/application_security/software_composition_analysis
  tag: Documentation
  text: En savoir plus sur Software Composition Analysis
title: Débuter avec Code Analysis
---

## Section Overview

[Code Analysis de Datadog][1] permet d'identifier et de résoudre les problèmes de qualité de code et les vulnérabilités de sécurité avant le déploiement en production, garantissant un code sûr et propre tout au long du cycle de vie du développement logiciel.

{{< img src="/code_analysis/repositories.png" alt="Bouton Session Replay disponible, ainsi que des options de visualisation" style="width:100%" >}}

Code Analysis propose une suite complète d'outils, incluant [Static Analysis][2] et [Software Composition Analysis][3], afin d'améliorer l'ensemble du processus de livraison logicielle.

* Static Analysis (SAST) analyse vos référentiels pour détecter des problèmes de qualité et de sécurité dans le code interne, et propose des correctifs afin d'empêcher que ces problèmes n'impactent la production.
* Software Composition Analysis (SCA) analyse votre base de code à la recherche de bibliothèques open source importées, ce qui aide à gérer vos dépendances et à sécuriser vos applications contre les menaces externes.

En utilisant [`datadog-ci`][5], vous pouvez intégrer les analyses d'autres fournisseurs dans votre workflow de développement, ce qui permet d'envoyer directement les résultats de Static Analysis et de SCA à Datadog. Vous pouvez accéder aux derniers résultats d'analyse pour chaque référentiel sur la [page **Repositories**][6] afin de surveiller et d'améliorer efficacement la santé du code sur toutes les branches.

## Configurer Code Analysis

Il est possible de configurer Code Analysis pour exécuter des analyses sur le code directement dans Datadog ou sur le code exécuté dans vos pipelines CI. Pour commencer, accédez à [**Software Delivery** > **Code Analysis** > **Repositories**][6] et cliquez sur **+ Add a Repository**.

{{< tabs >}}
{{% tab "Datadog Hosted" %}}

Avec les analyses hébergées par Datadog, votre code est analysé dans l'infrastructure de Datadog plutôt que dans votre pipeline CI. Datadog lit votre code, exécute l'analyseur statique pour effectuer une Static Analysis ou une Software Composition Analysis, puis téléverse les résultats.

L'utilisation des analyses hébergées par Datadog supprime la nécessité de configurer un pipeline CI pour pouvoir utiliser Code Analysis.

Activez Code Analysis sur vos référentiels GitHub pour chaque compte GitHub que vous avez ajouté en configurant l'[intégration GitHub][101].

{{< img src="/code_analysis/setup/enable_account.png" alt="Bouton Session Replay disponible, ainsi que des options de visualisation" style="width:100%" >}}

Il est possible soit d'activer Software Composition Analysis (SCA) pour analyser les vulnérabilités, les problèmes de licence et les risques liés à la chaîne d'approvisionnement dans vos bibliothèques open source pour tous les référentiels, soit d'activer SCA pour des référentiels individuels dans le panneau latéral **Repositories**.

{{< img src="/code_analysis/setup/enable_repository.png" alt="Bouton Session Replay disponible, ainsi que des options de visualisation" style="width:100%" >}}

[101]: /fr/integrations/github/

{{% /tab %}}
{{% tab "In CI Pipelines" %}}

Sélectionnez parmi les types d'analyses suivants ceux que vous souhaitez exécuter dans votre référentiel.

* [Static Analysis][101] : examinez votre code pour détecter les mauvaises pratiques et les vulnérabilités.
* [Software Composition Analysis][102] : vérifiez vos bibliothèques tierces pour détecter des vulnérabilités.

Sélectionnez un fournisseur de gestion de code source (SCM) tel que [GitHub](#github) ou [un autre fournisseur](#autres-fournisseurs).

### GitHub

Si vous utilisez un référentiel GitHub, vous pouvez configurer l'[intégration GitHub][103] et connecter votre référentiel pour activer les analyses Static Analysis et Software Composition Analysis.

{{< img src="/getting_started/code_analysis/github_accounts.png" alt="Cliquez sur le bouton Connect Repositories pour votre compte GitHub." style="width:100%" >}}

Les commentaires dans les [pull requests GitHub][105] sont activés par défaut. Cliquez sur **Connect Repositories** sur la page de configuration de Code Analysis et survolez l'indicateur Missing dans la colonne PR Permissions pour voir quelles autorisations vous devez mettre à jour pour votre compte.

{{< img src="/getting_started/code_analysis/missing_permissions.png" alt="Survolez l'étiquette Missing pour voir quelles autorisations doivent être mises à jour pour votre référentiel." style="width:100%" >}}

Pour désactiver cette fonctionnalité, accédez à la [page **Code Analysis Settings**][106] et cliquez sur le bouton dans la colonne GitHub Comments.

{{< img src="/getting_started/code_analysis/github_comments_setting.png" alt="Cliquez sur le bouton dans la colonne GitHub Comments pour activer ou désactiver Code Analysis pour un référentiel GitHub connecté." style="width:100%" >}}

### Autres fournisseurs

Pour les autres fournisseurs, vous pouvez exécuter le CLI Datadog directement dans votre plateforme de pipeline CI. Pour plus d'informations, consultez [Fournisseurs CI génériques pour Static Analysis][107] et [Fournisseurs CI génériques pour Software Composition Analysis][108].

Il faut [exécuter une analyse de votre référentiel](#executer-code-analysis-dans-votre-fournisseur-ci) sur la branche par défaut pour que les résultats commencent à apparaître sur la [page **Repositories**][109].

## Exécuter Code Analysis dans votre fournisseur CI

Pour téléverser les résultats vers Datadog, assurez-vous de disposer d'une [clé d'API Datadog et d'une clé d'application][110].

### Action GitHub

Il est possible de configurer une GitHub Action pour exécuter des analyses Static Analysis et Software Composition Analysis dans le cadre de vos workflows CI.

Créez un fichier `.github/workflows/datadog-static-analysis.yml` dans votre référentiel avec le contenu suivant :

```yaml
on: [push]

name: Datadog Static Analysis

jobs:
  static-analysis:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
    - name: Checkout
      uses: actions/checkout@v6
    - name: Check code meets quality and security standards
      id: datadog-static-analysis
      uses: DataDog/datadog-static-analyzer-github-action@v3
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: datadoghq.com
        cpu_count: 2
```

Ensuite, créez un fichier `.github/workflows/datadog-sca.yml` dans votre référentiel avec le contenu suivant :

```yaml
on: [push]

name: Datadog Software Composition Analysis

jobs:
  software-composition-analysis:
    runs-on: ubuntu-latest
    name: Datadog SBOM Generation and Upload
    steps:
    - name: Checkout
      uses: actions/checkout@v6
    - name: Check imported libraries are secure and compliant
      id: datadog-software-composition-analysis
      uses: DataDog/datadog-sca-github-action@main
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: datadoghq.com
```

### Script personnalisable

Il est possible de téléverser un rapport SARIF avec les résultats de Static Analysis ou un rapport SBOM avec les résultats de Software Composition Analysis vers Datadog en utilisant le [package NPM datadog-ci][111].

#### Analyse statique

Pour téléverser des rapports Static Analysis vers Datadog, vous devez installer Unzip et Node.js version 14 ou ultérieure.

Ajoutez le contenu suivant à la configuration de votre pipeline CI :

```shell
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci 

# Download the latest Datadog static analyzer:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip

curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Run Static Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif

# Upload results
datadog-ci sarif upload /tmp/report.sarif
```

#### Software Composition Analysis

Pour téléverser les résultats de Software Composition Analysis vers Datadog, vous devez installer Trivy et Node.js version 14 ou ultérieure.

Ajoutez le contenu suivant à la configuration de votre pipeline CI :

```shell
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog OSV Scanner:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# Install OSV Scanner
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
cd /osv-scanner && unzip osv-scanner.zip
chmod 755 /osv-scanner/osv-scanner

# Output OSC Scanner results
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# Upload results
datadog-ci sbom upload /tmp/sbom.json
```

Une fois que vous avez configuré ces scripts, exécutez une analyse de votre référentiel sur la branche par défaut. Les résultats commenceront ensuite à apparaître sur la page **Repositories**.

[101]: /fr/code_analysis/static_analysis
[102]: /fr/code_analysis/software_composition_analysis
[103]: /fr/integrations/github
[104]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions
[105]: /fr/code_analysis/github_pull_requests
[106]: https://app.datadoghq.com/ci/settings/code-analysis
[107]: /fr/code_analysis/static_analysis/generic_ci_providers
[108]: /fr/code_analysis/software_composition_analysis/generic_ci_providers
[109]: https://app.datadoghq.com/ci/code-analysis
[110]: /fr/account_management/api-app-keys/
[111]: https://www.npmjs.com/package/@datadog/datadog-ci

{{% /tab %}}
{{< /tabs >}}

## Exécuter Static Analysis dans un IDE

Installez les [plugins IDE Datadog][7] pour exécuter des analyses Static Analysis localement et voir les résultats directement dans votre éditeur de code. Vous pouvez détecter et corriger des problèmes tels que des problèmes de maintenabilité, des bugs ou des vulnérabilités de sécurité dans votre code avant de valider vos modifications.

Pour commencer à exécuter des analyses Static Analysis dans votre IDE, consultez la documentation correspondante pour l'éditeur de code de votre choix.

{{< partial name="code_analysis/ide-plugins.html" >}}

</br>


## Activer les commentaires Code Analysis dans les pull requests GitHub

Il est possible d'intégrer Code Analysis avec les pull requests GitHub pour signaler automatiquement les non-conformités de code et améliorer la qualité du code lors du processus de relecture.

{{< img src="/getting_started/code_analysis/github_suggestion.png" alt="Une suggestion de Code Analysis dans une pull request GitHub" style="width:100%" >}}

Une fois configuré, Code Analysis commente directement dans la PR, en indiquant les non-conformités avec des détails tels que le nom, l'ID, la sévérité et les correctifs suggérés, que vous pouvez appliquer directement depuis l'interface GitHub.

Après avoir ajouté les [fichiers de configuration appropriés][10] à votre référentiel, créez une [application GitHub][11] dans Datadog (une nouvelle application ou une mise à jour d'une application existante). Assurez-vous qu'elle dispose des droits de lecture et d'écriture appropriés sur les pull requests.

Une fois que vous avez configuré votre application, accédez à la page **Code Analysis Settings** et cliquez sur le bouton dans la colonne **GitHub Comments** pour chaque référentiel.

{{< img src="/getting_started/code_analysis/github_comments_setting.png" alt="Boutons pour chaque référentiel permettant d'activer ou de désactiver les commentaires Code Analysis dans les pull requests GitHub" style="width:100%" >}}

Pour plus d'informations, consultez la rubrique [Pull requests GitHub][12].

## Rechercher et gérer les référentiels

Cliquez sur un référentiel dans la [page **Repositories**][6] pour accéder à une vue plus détaillée où vous pouvez personnaliser la requête de recherche par branche (la branche par défaut apparaissant en premier) et par commit (en commençant par le plus récent).

{{< img src="/getting_started/code_analysis/sca_vulnerabilities.png" alt="La vue Library Vulnerabilities des résultats Code Analysis provenant de la branche par défaut et du commit le plus récent d'un référentiel" style="width:100%" >}}

{{< tabs >}}
{{% tab "Static Analysis" %}}

Il est possible d'utiliser les facettes prêtes à l'emploi suivantes pour créer une requête de recherche afin d'identifier et de résoudre les mauvaises pratiques de codage dans l'onglet **Code Quality** ou les risques de sécurité dans l'onglet **Code Vulnerabilities**.

| Nom de la facette                        | Rôle                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| Statut du résultat                     | Filtrer les résultats en fonction du statut d'exécution de l'analyse.         |
| ID de la règle                           | Règles spécifiques ayant déclenché les résultats.                             |
| Nom de l'outil                         | Détermine quels outils ont contribué à l'analyse.                     |
| CWE (Common Weakness Enumeration) | Filtre les résultats par catégories de vulnérabilités reconnues.                |
| Possède des correctifs                         | Filtre les problèmes pour lesquels des correctifs sont disponibles.                 |
| Message du résultat                    | Contient des descriptions concises ou des messages associés aux résultats. |
| Description de la règle                  | Contient la justification de chaque règle.                                |
| Fichier source                       | Contient les fichiers où des problèmes ont été détectés.                          |
| Version de l'outil                      | Filtrer les résultats en fonction de la version des outils utilisés.                       |

Il est possible d'accéder aux correctifs suggérés directement depuis les résultats pour améliorer les pratiques de qualité de code et corriger les vulnérabilités de sécurité.

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="Un correctif de code suggéré dans l'onglet Fixes d'un résultat de Code Analysis" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

Il est possible d'utiliser les facettes prêtes à l'emploi suivantes pour créer une requête de recherche afin d'identifier et de corriger les risques de sécurité dans les bibliothèques tierces dans l'onglet **Library Vulnerabilities** ou pour examiner votre inventaire de bibliothèques dans l'onglet **Library Catalog**.

| Nom de la facette         | Rôle                                                    |
|--------------------|----------------------------------------------------------------|
| Nom de la dépendance    | Identifie les bibliothèques par leur nom.                              |
| Version de la dépendance | Filtre par versions spécifiques de bibliothèques.                     |
| Langage           | Trie les bibliothèques par langage de programmation.                   |
| Score              | Trie le score de risque ou de qualité des dépendances.           |
| Gravité           | Filtre les vulnérabilités en fonction de leur niveau de gravité.        |
| Plateforme           | Distinguer les bibliothèques selon la plateforme visée. |

Accéder aux rapports de vulnérabilités et localiser les fichiers sources où la vulnérabilité a été découverte dans vos projets, ainsi qu'aux informations sur les responsables du code du fichier.

{{< img src="/getting_started/code_analysis/sci_vulnerabilities.png" alt="Un lien vers le code source directement dans GitHub depuis une vulnérabilité de bibliothèque détectée" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## Explorer les résultats dans le Service Catalog

Examiner les non-conformités de code associées à vos services et les non-conformités de code identifiées par l'analyse statique afin de résoudre les ralentissements et les défaillances. Accéder à [**Service Management** > **Services** > **Service Catalog**][13] et cliquer sur la vue **Delivery** pour analyser l'état de préproduction de vos services.

{{< img src="/getting_started/code_analysis/catalog_view.png" alt="Un lien vers le code source directement dans GitHub depuis une vulnérabilité de bibliothèque détectée" style="width:100%" >}}

Cliquez sur un service pour accéder aux informations sur les pipelines CI depuis Pipeline Visibility, ainsi qu'aux vulnérabilités de sécurité et aux problèmes de qualité du code depuis Code Analysis, dans l'onglet **Delivery** du panneau latéral.

{{< img src="/getting_started/code_analysis/catalog_service.png" alt="Un lien vers le code source directement dans GitHub depuis une vulnérabilité de bibliothèque détectée" style="width:100%" >}}

### Lier les services aux non-conformités de code et aux bibliothèques

Datadog associe les non-conformités du code ou les bibliothèques aux services compétents en utilisant les mécanismes suivants :

1. [Identifier l'emplacement du code associé à un service à l'aide du Service Catalog.](#identifier-l-emplacement-du-code-dans-le-service-catalog)
2. [Détecter les schémas d'utilisation des fichiers dans d'autres produits Datadog.](#detecter-les-schemas-d-utilisation-des-fichiers)
3. [Rechercher le nom du service dans le chemin du fichier ou le référentiel.](#detecter-le-nom-du-service-dans-les-chemins-et-les-noms-de-referentiels)

Si une méthode réussit, aucune autre tentative de mappage n'est effectuée. Chaque méthode de mappage est détaillée ci-dessous.

#### Identifier l'emplacement du code dans le Service Catalog

La version de schéma `v3` et ultérieure du Service Catalog permet d'ajouter le mappage de l'emplacement du code de votre service. La section `codeLocations` spécifie l'emplacement du référentiel contenant le code et ses chemins associés.

L'attribut `paths` est une liste de [globs][14]
qui doivent correspondre aux chemins du référentiel.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - path/to/service/code/**
{{< /code-block >}}


#### Détecter les schémas d'utilisation des fichiers

Datadog détecte l'utilisation de fichiers dans des produits supplémentaires tels que Error Tracking et associe les fichiers au service runtime. Par exemple, si un service nommé `foo` contient une entrée de log ou une trace de pile avec un fichier ayant un chemin `/modules/foo/bar.py`, il associe le fichier `/modules/foo/bar.py` au service `foo`.

#### Détecter le nom du service dans les chemins et les noms de référentiels

Datadog détecte les noms de service dans les chemins et les noms de référentiels, et associe le fichier au service en cas de correspondance.

Pour une correspondance de référentiel, si un service nommé `myservice` existe et
que l'URL du référentiel est `https://github.com/myorganization/myservice.git`, alors
`myservice` est associé à tous les fichiers du référentiel.

Si aucune correspondance de référentiel n'est trouvée, Datadog tente de trouver une correspondance dans le
`path` du fichier. Si un service nommé `myservice` existe et que le chemin est `/path/to/myservice/foo.py`, le fichier est associé à `myservice` car le nom du service fait partie du chemin. Si deux services sont présents
dans le chemin, le nom du service le plus proche du nom de fichier est sélectionné.


### Lier les équipes aux non-conformités du code et aux bibliothèques

Datadog associe automatiquement l'équipe attachée à un service lorsqu'une non-conformité de code ou un problème de bibliothèque est détecté. Par exemple, si le fichier `domains/ecommerce/apps/myservice/foo.py`
est associé à `myservice`, l'équipe `myservice` sera associée à toute non-conformité
détectée dans ce fichier.

Si aucun service ou aucune équipe n'est trouvé, Datadog utilise le [fichier][15] `CODEOWNERS`
dans votre référentiel. Le fichier `CODEOWNERS` détermine quelle équipe est propriétaire d'un fichier dans votre fournisseur Git.

**Remarque** : il est nécessaire de mapper avec précision vos équipes de votre fournisseur Git à vos [équipes Datadog][16] pour que cette fonctionnalité fonctionne correctement.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/code_analysis/
[2]: /fr/code_analysis/static_analysis
[3]: /fr/code_analysis/software_composition_analysis
[4]: /fr/security/application_security/software_composition_analysis
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /fr/code_analysis/ide_plugins
[9]: https://app.datadoghq.com/dash/integration/31166/software-delivery---static-analysis-overview
[10]: /fr/code_analysis/static_analysis/github_actions/
[11]: /fr/code_analysis/github_pull_requests/#update-an-existing-github-app
[12]: /fr/code_analysis/github_pull_requests
[13]: https://app.datadoghq.com/services 
[14]: https://en.wikipedia.org/wiki/Glob_(programming)
[15]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[16]: /fr/account_management/teams/