---
algolia:
  tags:
  - code analysis
  - datadog code analysis
  - static analysis
  - software composition analysis
  - SAST
  - SCA
aliases:
- /fr/code_analysis/faq
description: Apprenez à utiliser Datadog Code Analysis pour traiter les problèmes
  de maintenabilité, les bugs et les vulnérabilités de sécurité en développement afin
  d'éviter un impact sur les clients.
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de la livraison de logiciels (connexion à
    l'application requise).
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Surveiller tous vos pipelines CI avec Datadog
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: En savoir plus sur l'intégration du code source
- link: /code_analysis/static_analysis
  tag: Documentation
  text: En savoir plus sur Static Analysis
- link: /security/application_security/software_composition_analysis
  tag: Documentation
  text: En savoir plus sur Software Composition Analysis
is_beta: false
title: Analyse de code
---

{{< callout url="#" btn_hidden="true" header="Profitez de l'aperçu !" >}}
L'aperçu de Code Analysis est disponible.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Analysis n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Présentation

<div class="alert alert-info">Datadog Software Composition Analysis peut identifier des bibliothèques vulnérables tout au long du cycle de vie du développement logiciel (SDLC). Code Analysis résume les résultats obtenus en analysant directement vos référentiels. Pour consulter toutes les vulnérabilités détectées dans les référentiels et au runtime, regroupées ensemble, consultez la section <a href="/security/application_security/software_composition_analysis" target="_blank">Application Security</a> pour plus de détails.</div>

Code Analysis analyse vos référentiels pour identifier les vulnérabilités de sécurité et les problèmes de qualité du code. Il comprend deux fonctionnalités : [Static Analysis][1] pour votre code propriétaire et [Software Composition Analysis (SCA)][2] pour les dépendances open source de votre base de code.

Static Analysis
: Analyse votre code personnalisé dès les premières étapes du cycle de développement pour détecter les problèmes de maintenabilité, les bugs, les problèmes de performance et les vulnérabilités de sécurité. Cette analyse permet d'empêcher leur arrivée en production et, lorsque c'est possible, propose des corrections suggérées pour aider les équipes d'ingénierie à les résoudre avant qu'ils n'affectent les utilisateurs.

Software Composition Analysis 
: Analyse les bibliothèques open source importées dans vos référentiels afin de détecter les vulnérabilités de sécurité connues, les risques liés aux licences et les bibliothèques en fin de vie.


## Configurer Code Analysis sur votre référentiel

Cliquez sur **+ Add a Repository** dans la [page **Code Analysis Repositories**][9] et choisissez d'exécuter les analyses directement dans Datadog ou dans vos pipelines CI.

{{< tabs >}}
{{% tab "Datadog" %}}

<div class="alert alert-danger">Les analyses hébergées par Datadog sont uniquement prises en charge par Software Composition Analysis (SCA) et les référentiels GitHub. Pour activer Static Analysis ou utiliser un autre fournisseur CI, exécutez plutôt les analyses dans vos pipelines CI.</div>

Avec les analyses hébergées par Datadog, votre code est analysé dans l'infrastructure de Datadog plutôt que dans votre pipeline CI. Datadog lit votre code, exécute l'analyseur statique pour effectuer une Static Analysis ou une Software Composition Analysis, puis téléverse les résultats.

L'utilisation des analyses hébergées par Datadog supprime la nécessité de configurer un pipeline CI pour pouvoir utiliser Code Analysis.

Pour activer [Software Composition Analysis][101] sur les référentiels GitHub, cliquez sur **Select Repositories** dans le compte GitHub souhaité et activez l'option `Enable Software Composition Analysis (SCA)` pour l'ensemble des référentiels. Si aucun compte GitHub n'est affiché, [créez une nouvelle application GitHub][102] pour commencer.

{{< img src="code_analysis/setup/enable_account.png" alt="Activer Software Composition Analysis sur tous les référentiels de votre compte GitHub" style="width:100%;">}}

Vous pouvez également sélectionner certains référentiels GitHub à activer pour SCA en cliquant sur le bouton de chaque référentiel.

{{< img src="code_analysis/setup/enable_repository.png" alt="Activer Software Composition Analysis sur un référentiel GitHub" style="width:100%;">}}

[101]: /fr/code_analysis/software_composition_analysis
[102]: /fr/integrations/github/

{{% /tab %}}
{{% tab "CI Pipelines" %}}

Si vous ne souhaitez pas exécuter vos analyses directement via Datadog, vous pouvez sélectionner les analyses à exécuter ([Static Analysis][106] et [Software Composition Analysis][107]) et configurer votre fournisseur de pipeline CI en conséquence.

## Configurez votre fournisseur CI/CD

Consultez la documentation suivante pour configurer votre fournisseur CI/CD afin d'exécuter des analyses Static Analysis et SCA :

- [Static Analysis et GitHub Actions][101]
- [Static Analysis et CircleCI Orbs][102]
- [Static Analysis et fournisseurs CI génériques][103]
- [Software Composition Analysis et GitHub Actions][104]
- [Software Composition Analysis et fournisseurs CI génériques][105]

[101]: /fr/code_analysis/static_analysis/github_actions 
[102]: /fr/code_analysis/static_analysis/circleci_orbs 
[103]: /fr/code_analysis/static_analysis/generic_ci_providers 
[104]: /fr/code_analysis/software_composition_analysis/github_actions 
[105]: /fr/code_analysis/software_composition_analysis/generic_ci_providers 
[106]: /fr/code_analysis/static_analysis
[107]: /fr/code_analysis/software_composition_analysis

{{% /tab %}}
{{< /tabs >}}

## Configurer l'intégration GitHub 

Vous pouvez configurer une application GitHub à l'aide du [carré d'intégration GitHub][7] et configurer l'[intégration du code source][8] afin d'afficher les extraits de code en cause dans les résultats de Static Analysis dans Datadog.

{{< img src="code_analysis/source_code_integration.png" alt="Lien vers GitHub depuis la vue Code Analysis" style="width:100%;">}}

Pour plus d'informations, consultez la [documentation sur l'intégration du code source][10].

## Intégrations Static Analysis

Avec Static Analysis, vous pouvez recevoir des retours automatisés sur les mauvaises pratiques de codage et les vulnérabilités de sécurité dans le code que vous écrivez [directement dans un IDE][11] comme [VS Code][3] ou [IntelliJ & PyCharm][4], ainsi que dans vos [pull requests sur GitHub][5].

{{< img src="developers/ide_plugins/vscode/static-analysis-issue.png" alt="Un résultat Static Analysis dans Visual Studio Code" style="width:100%;">}}

## Rechercher et gérer les référentiels

Une fois que vous avez configuré Code Analysis, vous pouvez consulter un résumé des résultats des analyses Static Analysis et SCA pour chacun de vos référentiels sur la [page **Code Analysis**][9]. Par défaut, les résultats résumés s'affichent pour le dernier commit analysé sur la branche par défaut du référentiel, ce qui vous permet de voir tous les problèmes existants sur chaque référentiel afin de les trier et de les corriger.

{{< img src="code_analysis/repositories.png" alt="Une liste de référentiels avec les résultats des analyses de code et de bibliothèques sur la page Code Analysis" style="width:100%;">}}

Sélectionnez un référentiel dans la liste pour rechercher et gérer les non-conformités de ce référentiel spécifique. Par défaut, les résultats s'affichent pour le dernier commit analysé sur la branche par défaut du référentiel, mais vous pouvez modifier la branche ou le commit en haut de la page. Les résultats peuvent également être filtrés par facettes de service ou d'équipe. Pour plus d'informations sur la façon dont les résultats sont associés aux services et équipes Datadog, consultez la section [Débuter avec Code Analysis][12].

Indépendamment de la branche ou du commit sélectionné, tous les résultats sont organisés dans les vues suivantes :

{{< tabs >}}
{{% tab "Code Vulnerabilities" %}}

{{< img src="code_analysis/shopist_code_vulnerabilities.png" alt="Vulnérabilités de code sur la page Code Analysis pour le service et le référentiel Shopist de Datadog" style="width:100%;">}}

Identifier et traiter les risques de sécurité du code détectés par Static Analysis dans la vue **Code Vulnerabilities**.

{{% /tab %}}
{{% tab "Code Quality" %}}

{{< img src="code_analysis/shopist_code_quality.png" alt="Vulnérabilités de qualité du code sur la page Code Analysis pour le service et le référentiel Shopist de Datadog" style="width:100%;">}}

Identifier et corriger les mauvaises pratiques de codage détectées par Static Analysis dans la vue **Code Quality**.

{{% /tab %}}
{{% tab "Library Vulnerabilities" %}}

{{< img src="code_analysis/shopist_lib_vulnerabilities.png" alt="Vulnérabilités de bibliothèques sur la page Code Analysis pour le service et le référentiel Shopist de Datadog" style="width:100%;">}}

Identifier et corriger les bibliothèques open source vulnérables détectées par SCA dans la vue **Library Vulnerabilities**.

{{% /tab %}}
{{% tab "Library Catalog" %}}

{{< img src="code_analysis/shopist_lib_list.png" alt="Une liste de bibliothèques sur la page Code Analysis pour le service et le référentiel Shopist de Datadog" style="width:100%;">}}

Gérer la liste complète des bibliothèques détectées par SCA et importées dans votre base de code dans la vue **Library Catalog**.

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/code_analysis/static_analysis
[2]: /fr/code_analysis/software_composition_analysis
[3]: /fr/developers/ide_plugins/vscode/#static-analysis
[4]: /fr/developers/ide_plugins/idea/#static-analysis
[5]: /fr/code_analysis/github_pull_requests/
[6]: /fr/code_analysis/static_analysis_rules
[7]: /fr/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /fr/integrations/guide/source-code-integration
[9]: https://app.datadoghq.com/ci/code-analysis
[10]: /fr/integrations/guide/source-code-integration/?tab=codeanalysis
[11]: /fr/code_analysis/ide_plugins/
[12]: /fr/getting_started/code_analysis/?tab=incipipelines#linking-services-to-code-violations-and-libraries