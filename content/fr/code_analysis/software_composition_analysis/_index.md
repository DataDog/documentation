---
algolia:
  tags:
  - software composition analysis
  - datadog software composition analysis
  - library vulnerabilities
  - SCA
description: Découvrez Datadog Software Composition Analysis pour analyser vos bibliothèques
  open source importées afin de détecter les vulnérabilités de sécurité connues avant
  le déploiement en production.
further_reading:
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: Blog
  text: Améliorer la sécurité des applications en production avec Software Composition
    Analysis
- link: https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/
  tag: Blog
  text: Prioriser la remédiation des vulnérabilités avec Datadog SCA
- link: /getting_started/application_security/software_composition_analysis
  tag: Documentation
  text: Premiers pas avec Software Composition Analysis
- link: /security/application_security/software_composition_analysis/
  tag: Documentation
  text: En savoir plus sur Software Composition Analysis
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: En savoir plus sur l'intégration du code source
is_beta: false
title: Software Composition Analysis (SCA)
---

{{< callout url="#" btn_hidden="true" header="Rejoignez la version Preview !" >}} Software Composition Analysis est en avant-première.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Présentation

Software Composition Analysis (SCA) analyse les bibliothèques open source importées dans les référentiels via des gestionnaires de paquets tels que `npm` pour détecter les [vulnérabilités connues][1], et crée un catalogue de bibliothèques utilisées dans vos référentiels qui identifie les licences à risque, les bibliothèques en fin de vie et les vulnérabilités pour garantir une base de code sécurisée et de haute qualité.

Les analyses SCA peuvent être exécutées directement via Datadog ou dans vos pipelines CI à l'aide de [Code Analysis][3] pour détecter les vulnérabilités de bibliothèque avant qu'elles n'atteignent la production. Datadog propose également la détection au runtime via [Datadog Application Security][1].

## Configurer Software Composition Analysis

SCA prend en charge l'analyse des bibliothèques dans les langages et technologies suivants :

{{< partial name="code_analysis/sca-getting-started.html" >}}

Pour commencer, configurez Software Composition Analysis sur la [page **Code Analysis**][2] ou consultez la [documentation de configuration][3].

### Fichiers de verrouillage

SCA analyse les bibliothèques contenues dans vos fichiers de verrouillage. Les fichiers de verrouillage suivants sont pris en charge 
:
| Gestionnaire de paquets | Fichier de verrouillage |
|-----------------|------------------------------------------|
| C# (.NET)       | `packages.lock.json`                     |
| Go (mod)        | `go.mod`                                 |
| JVM (Gradle)    | `gradle.lockfile`                        |
| JVM (Maven)     | `pom.xml`                                |
| Node.js (npm)   | `package-lock.json`                      |
| Node.js (pnpm)  | `pnpm-lock.yaml`                         |
| Node.js (yarn)  | `yarn.lock`                              |
| PHP (composer)  | `composer.lock`                          |
| Python (pip)    | `requirements.txt`, `Pipfile.lock`       |
| Python (poetry) | `poetry.lock`                            |
| Ruby (bundler)  | `Gemfile.lock`                           |

## Intégrer Software Composition Analysis dans votre cycle de développement logiciel

### Fournisseurs CI
{{< whatsnext desc="Vous pouvez exécuter SCA sur n'importe quel fournisseur de plateforme CI de votre choix. Consulter la documentation spécifique au fournisseur pour configurer SCA dans vos pipelines CI :">}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}Fournisseurs CI génériques{{< /nextlink >}}
{{< /whatsnext >}}

## Rechercher et filtrer les résultats

<div class="alert alert-info">Datadog Software Composition Analysis peut détecter les bibliothèques vulnérables tout au long du cycle de développement logiciel (SDLC). Code Analysis résume les résultats trouvés en analysant directement vos référentiels. Pour afficher toutes les vulnérabilités détectées dans les référentiels et au runtime consolidées ensemble, consultez <a href="/security/application_security/software_composition_analysis" target="_blank">Application Security</a> pour plus de détails.</div>

Après avoir configuré vos pipelines CI pour exécuter Datadog SCA, les violations sont résumées par référentiel sur la [page **Code Analysis Repositories**][4]. Cliquez sur un référentiel pour analyser les résultats **Library Vulnerabilities** et **Library Catalog** de Software Composition Analysis.

* L'onglet **Library Vulnerabilities** contient les versions de bibliothèque vulnérables détectées par Datadog SCA.
* L'onglet **Library Catalog** contient toutes les bibliothèques (vulnérables ou non) détectées par Datadog SCA.

Pour filtrer vos résultats, utilisez les facettes à gauche de la liste ou la barre de recherche en haut. Les résultats peuvent être filtrés par facettes de service ou d'équipe. Pour en savoir plus sur la façon dont les résultats sont liés aux services et équipes Datadog, consultez la section [Débuter avec Code Analysis][5].

Chaque ligne représente une combinaison unique de bibliothèque et de version. Chaque combinaison est associée au commit et à la branche spécifiques sélectionnés dans les filtres en haut de la page (par défaut, le dernier commit sur la branche par défaut du référentiel que vous avez sélectionné).

Cliquez sur une bibliothèque présentant une vulnérabilité pour ouvrir un volet latéral contenant des informations sur la portée de la violation et son origine.

{{< img src="code_analysis/software_composition_analysis/sca-violation.png" alt="Volet latéral pour une violation SCA" style="width:80%;">}}

Le contenu de la violation est réparti dans plusieurs onglets :

- **Full Description** : une description de la vulnérabilité contenue dans cette version spécifique de la bibliothèque.
- **Event** : métadonnées JSON concernant l'événement de violation SCA.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/software_composition_analysis/
[2]: https://app.datadoghq.com/ci/setup/code-analysis
[3]: /fr/code_analysis/software_composition_analysis/setup
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /fr/getting_started/code_analysis/?tab=datadoghosted#linking-services-to-code-violations-and-libraries