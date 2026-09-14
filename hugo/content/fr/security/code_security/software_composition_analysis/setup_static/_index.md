---
aliases:
- /fr/code_analysis/software_composition_analysis/generic_ci_providers/
- /fr/code_analysis/software_composition_analysis/github_actions/
- /fr/code_analysis/software_composition_analysis/setup/
description: Découvrez Datadog Software Composition Analysis pour analyser vos bibliothèques
  open source importées à la recherche de vulnérabilités de sécurité connues avant
  de passer en production.
disable_toc: false
title: Configurez la SCA dans vos dépôts
---
## Présentation {#overview}

Datadog Software Composition Analysis (SCA) analyse vos dépôts à la recherche de bibliothèques open source et détecte les vulnérabilités de sécurité connues avant que vous ne passiez en production.

Pour commencer
1. Ouvrez les [paramètres de Code Security][2].
2. Dans {{< ui >}}Activate scanning for your repositories{{< /ui >}}, cliquez sur {{< ui >}}Manage Repositories{{< /ui >}}.
3. Choisissez [où exécuter les analyses SCA](#select-where-to-run-static-sca-scans) (Datadog-hosted ou CI pipelines).
4. Suivez les instructions de configuration pour votre fournisseur de code source.

## Langages et manifestes de dépendances pris en charge {#supported-languages-and-dependency-manifests}
Datadog SCA analyse les bibliothèques dans les langages suivants en utilisant des manifestes de dépendances (tels que des fichiers de verrouillage et d'autres fichiers de manifeste pris en charge) pour identifier les dépendances vulnérables.

| Langage   | Gestionnaire de paquets    | Fichier                                |
|------------|-------------------|------------------------------------------|
| C#         | .NET              | `packages.lock.json`, fichiers `.csproj`    |
| C++        | Conan             | `conan.lock`                             |
| Dart       | pub               | `pubspec.lock`                           |
| Go         | mod               | `go.mod`                                 |
| JVM        | Gradle            | `gradle.lockfile`                        |
| JVM        | Maven             | `pom.xml`                                |
| Node.js    | Bun               | `bun.lock`                               |
| Node.js    | npm               | `package-lock.json`                      |
| Node.js    | pnpm              | `pnpm-lock.yaml`                         |
| Node.js    | yarn              | `yarn.lock`                              |
| PHP        | composer          | `composer.lock`                          |
| Python     | PDM               | `pdm.lock`                               |
| Python     | pip               | `requirements.txt`, `Pipfile.lock`       |
| Python     | poetry            | `poetry.lock`                            |
| Python     | UV                | `uv.lock`                                |
| Ruby       | bundler           | `Gemfile.lock`                           |
| Rust       | Cargo             | `cargo.lock`                             |
| Swift      | SwiftPM           | `Package.swift`, `Package.resolved`      |

**Remarque :** Si un fichier `packages.lock.json` et un fichier `.csproj` sont tous deux présents, le `packages.lock.json` prévaut et permet une résolution de version plus précise.

## Analyse sans fichier de verrouillage {#lockfile-less-scanning}

Datadog SCA analyse les fichiers manifestes **uniquement lorsqu'aucun fichier de verrouillage pris en charge n'est détecté**. Lorsqu'un fichier de verrouillage est présent, il a priorité et le manifeste n'est pas analysé.

| Langage | Gestionnaire de paquets        | Fichier             |
|----------|------------------------|------------------|
| Node.js  | npm, yarn, pnpm, Bun   | `package.json`   |
| Python   | Poetry, PDM, UV, pip   | `pyproject.toml` |

**Sections prises en charge :**
- `package.json` : `dependencies`, `devDependencies` et `optionalDependencies`
- `pyproject.toml` : PEP 621 `dependencies` et `optional-dependencies`, PEP 735 `dependency-groups`, ainsi que les sections de dépendances de Poetry

<div class="alert alert-info">
Comme les manifestes peuvent déclarer des plages de versions (telles que <code>^2.3.4</code> ou <code>&gt;=1.0,&lt;2</code>) plutôt que des versions épinglées, Datadog résout chaque plage en sélectionnant la version publiée la plus récente qui satisfait cette plage. Les versions préliminaires sont exclues.
</div>

## Sélectionnez l'emplacement d'exécution des analyses SCA statiques {#select-where-to-run-static-sca-scans}
Par défaut, les analyses s'exécutent lorsque vous validez des modifications qui mettent à jour les manifestes de dépendances ou les fichiers de verrouillage pris en charge dans un dépôt activé. Vous pouvez également exécuter SCA dans vos pipelines CI ; les jobs CI sont pris en charge pour les événements `push`.

### Analyser avec l'analyse hébergée par Datadog {#scan-with-datadog-hosted-scanning}

Vous pouvez exécuter les analyses SCA statiques de Datadog directement sur l'infrastructure Datadog. Les types de référentiels pris en charge incluent :
- [GitHub](/security/code_security/software_composition_analysis/setup_static/?tab=github#select-your-source-code-management-provider) (à l'exclusion des dépôts qui utilisent [Git Large File Storage][21])
- [GitLab.com et GitLab Self-Managed](/security/code_security/software_composition_analysis/setup_static/?tab=gitlab#select-your-source-code-management-provider)
- [Azure DevOps](/security/code_security/software_composition_analysis/setup_static/?tab=azuredevops#select-your-source-code-management-provider)
- [Bitbucket Cloud](/security/code_security/software_composition_analysis/setup_static/?tab=bitbucketcloud#select-your-source-code-management-provider)

Pour commencer, accédez à la page [{{< ui >}}Code Security{{< /ui >}}][2].

<div class="alert alert-info">
L'analyse SCA hébergée par Datadog n'est pas prise en charge pour les dépôts contenant des noms de fichiers de plus de 255 caractères. <br>
Dans ces cas, effectuez l'analyse à l'aide de CI pipelines.
</div>

### Analyser dans les pipelines CI {#scan-in-ci-pipelines}

Datadog Software Composition Analysis s'exécute dans vos pipelines CI à l'aide de l'[`datadog-ci` CLI][8].

<div class="alert alert-info">
Vous devez analyser votre branche par défaut au moins une fois avant que les résultats n'apparaissent dans {{< ui >}}Code Security{{< /ui >}}.
</div>

{{< whatsnext desc="Consultez les instructions en fonction de votre fournisseur CI :">}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/gitlab_ci" >}}GitLab CI/CD{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/azure_devops" >}}Azure DevOps{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/generic_ci_providers" >}}Fournisseurs de CI génériques{{< /nextlink >}}
{{< /whatsnext >}}

Si votre projet Java inclut directement des fichiers JAR tiers dans le dépôt au lieu d'utiliser un manifeste Maven ou Gradle, consultez [Analyser les répertoires JAR Java][27].

## Sélectionnez votre fournisseur de gestion de code source {#select-your-source-code-management-provider}

Quel que soit le mode d'analyse utilisé, connectez votre fournisseur de gestion de code source pour activer les fonctionnalités natives telles que les extraits de code en ligne et les commentaires de pull request. Datadog SCA prend en charge tous les fournisseurs et offre une prise en charge native pour GitHub, GitLab, Azure DevOps et Bitbucket Cloud Premium.

{{< tabs >}}
{{% tab "GitHub" %}}

Configurez une application GitHub avec la [tuile d'intégration GitHub][1] et configurez l'[intégration du code source][2] pour activer les extraits de code en ligne et les [commentaires sur les demandes de tirage][3].

Lors de l'installation d'une application GitHub, les autorisations suivantes sont requises pour activer certaines fonctionnalités :

- `Content: Read`, ce qui vous permet de voir les extraits de code affichés dans Datadog
- `Pull Request: Read & Write`, ce qui permet à Datadog d'ajouter des commentaires sur les violations directement dans vos pull requests à l'aide de [commentaires de pull request][3].
- `Checks: Read & Write`, ce qui vous permet de créer des vérifications sur les violations SAST pour bloquer les demandes de tirage

[1]: /fr/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /fr/integrations/guide/source-code-integration
[3]: /fr/security/code_security/dev_tool_int/github_pull_requests

{{% /tab %}}
{{% tab "GitLab" %}}

Consultez les [instructions de configuration du code source GitLab][1] pour connecter GitLab à Datadog. Les instances GitLab.com et autogérées sont prises en charge.

[1]: /fr/integrations/gitlab-source-code/#setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

**Remarque :** Vos intégrations Azure DevOps doivent être connectées à un locataire Microsoft Entra. Azure DevOps Server **n'est pas** pris en charge.

Consultez les [instructions de configuration du code source Azure][4] pour connecter des dépôts Azure DevOps à Datadog.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/integrations/azure-devops-source-code/#setup
[5]: /fr/getting_started/site/

{{% /tab %}}
{{% tab "Bitbucket Cloud" %}}

Consultez les [instructions de configuration du code source Bitbucket][1] pour connecter des espaces de travail Bitbucket Cloud à Datadog.

[1]: /fr/integrations/bitbucket-source-code/#setup

{{% /tab %}}
{{% tab "Other" %}}

Si vous utilisez un autre fournisseur de gestion de code source, configurez SCA pour qu'il s'exécute dans vos pipelines CI à l'aide de l'outil CLI `datadog-ci` et [téléversez les résultats](#upload-third-party-sbom-to-datadog) vers Datadog.

{{% /tab %}}
{{< /tabs >}}

## Liez les résultats aux services et équipes Datadog {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}

## Téléverser un SBOM tiers vers Datadog {#upload-third-party-sbom-to-datadog}

Datadog recommande d'utiliser le [générateur SBOM Datadog][10], mais il est également possible d'ingérer un SBOM tiers.

Vous pouvez téléverser des SBOM générés par d'autres outils s'ils répondent à ces exigences :
- Schéma JSON CycloneDX [1.4][18], [1.5][19] ou [1.6][20] valide
- Tous les composants ont le type `library`
- Tous les composants ont un attribut `purl` valide

Les fichiers SBOM tiers sont téléversés vers Datadog à l'aide de la commande [`datadog-ci`](https://github.com/DataDog/datadog-ci/?tab=readme-ov-file#how-to-install-the-cli).

Vous trouverez des arguments optionnels et d'autres informations dans le `datadog-ci` [README][22].

Vous pouvez utiliser la commande suivante pour téléverser votre SBOM tiers. Assurez-vous que les variables d'environnement `DD_API_KEY`, `DD_APP_KEY` et `DD_SITE`
sont définies respectivement sur votre clé d'API, votre clé d'application et votre [site Datadog][12].

```bash
datadog-ci sbom upload /path/to/third-party-sbom.json
```

<div class="alert alert-info">
Si l'analyse automatique est déjà activée pour un dépôt, un téléversement manuel remplacera tout résultat existant pour ce commit.
</div>


## Filtrer par vulnérabilités atteignables{#filter-by-reachable-vulnerabilities}

Datadog propose une analyse statique de la facilité d'accès pour aider les équipes à évaluer si les chemins de code vulnérables dans les dépendances sont référencés au sein de leur code applicatif. Cette fonctionnalité permet une priorisation plus efficace en identifiant les vulnérabilités qui sont statiquement inatteignables et qui présentent donc un risque immédiat minimal.

Cette fonctionnalité n'est prise en charge que lors de l'utilisation du [générateur SBOM Datadog][1] avec le flag `--reachability` activé ou lors de l'exécution d'analyses via l'infrastructure hébergée par Datadog.

L'analyse de la facilité d'accès est disponible exclusivement pour les projets Java et s'applique uniquement à un ensemble défini d'avis de sécurité approuvés. Les vulnérabilités non incluses dans cet ensemble sont exclues de l'évaluation de la facilité d'accès.

{{% collapse-content title="Avis pris en charge" level="h3" expanded=true id="supported-advisories" %}}
L'analyse statique de la facilité d'accès est disponible pour les avis suivants :
- [GHSA-h7v4-7xg3-hxcc](https://osv.dev/vulnerability/GHSA-h7v4-7xg3-hxcc)
- [GHSA-jfh8-c2jp-5v3q](https://osv.dev/vulnerability/GHSA-jfh8-c2jp-5v3q)
- [GHSA-7rjr-3q55-vv33](https://osv.dev/vulnerability/GHSA-7rjr-3q55-vv33)
- [GHSA-2p3x-qw9c-25hh](https://osv.dev/vulnerability/GHSA-2p3x-qw9c-25hh)
- [GHSA-cm59-pr5q-cw85](https://osv.dev/vulnerability/GHSA-cm59-pr5q-cw85)
- [GHSA-qrx8-8545-4wg2](https://osv.dev/vulnerability/GHSA-qrx8-8545-4wg2)
- [GHSA-p8pq-r894-fm8f](https://osv.dev/vulnerability/GHSA-p8pq-r894-fm8f)
- [GHSA-64xx-cq4q-mf44](https://osv.dev/vulnerability/GHSA-64xx-cq4q-mf44)
- [GHSA-g5w6-mrj7-75h2](https://osv.dev/vulnerability/GHSA-g5w6-mrj7-75h2)
- [GHSA-xw4p-crpj-vjx2](https://osv.dev/vulnerability/GHSA-xw4p-crpj-vjx2)
- [GHSA-cxfm-5m4g-x7xp](https://osv.dev/vulnerability/GHSA-cxfm-5m4g-x7xp)
- [GHSA-3ccq-5vw3-2p6x](https://osv.dev/vulnerability/GHSA-3ccq-5vw3-2p6x)
- [GHSA-mjmj-j48q-9wg2](https://osv.dev/vulnerability/GHSA-mjmj-j48q-9wg2)
- [GHSA-36p3-wjmg-h94x](https://osv.dev/vulnerability/GHSA-36p3-wjmg-h94x)
- [GHSA-ww97-9w65-2crx](https://osv.dev/vulnerability/GHSA-ww97-9w65-2crx)
- [GHSA-8jrj-525p-826v](https://osv.dev/vulnerability/GHSA-8jrj-525p-826v)
- [GHSA-4wrc-f8pq-fpqp](https://osv.dev/vulnerability/GHSA-4wrc-f8pq-fpqp)
- [GHSA-4cch-wxpw-8p28](https://osv.dev/vulnerability/GHSA-4cch-wxpw-8p28)
- [GHSA-6w62-hx7r-mw68](https://osv.dev/vulnerability/GHSA-6w62-hx7r-mw68)
- [GHSA-2q8x-2p7f-574v](https://osv.dev/vulnerability/GHSA-2q8x-2p7f-574v)
- [GHSA-rmr5-cpv2-vgjf](https://osv.dev/vulnerability/GHSA-rmr5-cpv2-vgjf)
- [GHSA-4jrv-ppp4-jm57](https://osv.dev/vulnerability/GHSA-4jrv-ppp4-jm57)
- [GHSA-mw36-7c6c-q4q2](https://osv.dev/vulnerability/GHSA-mw36-7c6c-q4q2)
- [GHSA-hph2-m3g5-xxv4](https://osv.dev/vulnerability/GHSA-hph2-m3g5-xxv4)
- [GHSA-j9h8-phrw-h4fh](https://osv.dev/vulnerability/GHSA-j9h8-phrw-h4fh)
- [GHSA-3gm7-v7vw-866c](https://osv.dev/vulnerability/GHSA-3gm7-v7vw-866c)
- [GHSA-645p-88qh-w398](https://osv.dev/vulnerability/GHSA-645p-88qh-w398)
- [GHSA-g5h3-w546-pj7f](https://osv.dev/vulnerability/GHSA-g5h3-w546-pj7f)
- [GHSA-c27h-mcmw-48hv](https://osv.dev/vulnerability/GHSA-c27h-mcmw-48hv)
- [GHSA-r4x2-3cq5-hqvp](https://osv.dev/vulnerability/GHSA-r4x2-3cq5-hqvp)
- [GHSA-24rp-q3w6-vc56](https://osv.dev/vulnerability/GHSA-24rp-q3w6-vc56)
- [GHSA-c9hw-wf7x-jp9j](https://osv.dev/vulnerability/GHSA-c9hw-wf7x-jp9j)
- [GHSA-4gq5-ch57-c2mg](https://osv.dev/vulnerability/GHSA-4gq5-ch57-c2mg)
- [GHSA-vmfg-rjjm-rjrj](https://osv.dev/vulnerability/GHSA-vmfg-rjjm-rjrj)
- [GHSA-crg9-44h2-xw35](https://osv.dev/vulnerability/GHSA-crg9-44h2-xw35)
- [GHSA-qmqc-x3r4-6v39](https://osv.dev/vulnerability/GHSA-qmqc-x3r4-6v39)
- [GHSA-4w82-r329-3q67](https://osv.dev/vulnerability/GHSA-4w82-r329-3q67)
- [GHSA-qr7j-h6gg-jmgc](https://osv.dev/vulnerability/GHSA-qr7j-h6gg-jmgc)
- [GHSA-9mxf-g3x6-wv74](https://osv.dev/vulnerability/GHSA-9mxf-g3x6-wv74)
- [GHSA-f3j5-rmmp-3fc5](https://osv.dev/vulnerability/GHSA-f3j5-rmmp-3fc5)
{{% /collapse-content %}}

## Conservation des données {#data-retention}

Datadog conserve les résultats conformément à nos [Périodes de conservation des données](https://docs.datadoghq.com/fr/data_security/data_retention_periods/) . Datadog ne stocke ni ne conserve le code source des clients .

## Pour aller plus loin {#further-reading}

{{< whatsnext desc="En savoir plus sur l'analyse SCA :">}}
    {{< nextlink href="/security/code_security/software_composition_analysis/setup_runtime/" >}}Configurez la détection des vulnérabilités des bibliothèques à l'exécution{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Autres analyses de Code Security pour vos dépôts :">}}
    {{< nextlink href="/security/code_security/static_analysis/" >}}Analyse statique du code (SAST){{< /nextlink >}}
    {{< nextlink href="/security/cloud_security_management/iac_scanning/" >}}Infrastructure en tant que code (IaC){{< /nextlink >}}
    {{< nextlink href="/security/code_security/secret_scanning/" >}}Analyse des secrets{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/security/code_security/software_composition_analysis/
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: /fr/security/code_security/software_composition_analysis/setup_static
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /fr/getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
[6]: /fr/account_management/api-app-keys/
[7]: /fr/integrations/github
[8]: https://github.com/DataDog/datadog-ci
[9]: /fr/security/code_security/dev_tool_int/github_pull_requests/
[10]: https://github.com/DataDog/datadog-sbom-generator
[12]: /fr/getting_started/site/
[13]: https://github.com/DataDog/datadog-static-analyzer-github-action
[14]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sbom
[15]: https://docs.datadoghq.com/fr/internal_developer_portal/catalog/entity_model/
[16]: https://docs.datadoghq.com/fr/account_management/teams/
[17]: https://app.datadoghq.com/source-code/repositories
[18]: https://cyclonedx.org/docs/1.4/json/
[19]: https://cyclonedx.org/docs/1.5/json/
[20]: https://cyclonedx.org/docs/1.6/json/
[21]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[22]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-sbom
[23]: https://docs.datadoghq.com/fr/internal_developer_portal/catalog/entity_model/?tab=v30#codelocations
[24]: https://docs.datadoghq.com/fr/internal_developer_portal/catalog/entity_model/?tab=v30#migrating-to-v30
[25]: https://docs.datadoghq.com/fr/data_security/data_retention_periods/
[26]: https://docs.datadoghq.com/fr/account_management/teams/
[101]: https://docs.datadoghq.com/fr/internal_developer_portal/catalog/entity_model/
[102]: https://docs.datadoghq.com/fr/internal_developer_portal/catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/fr/data_security/data_retention_periods/
[27]: /fr/security/code_security/troubleshooting/#scan-java-jar-directories