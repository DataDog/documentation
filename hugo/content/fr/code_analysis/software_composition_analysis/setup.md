---
algolia:
  tags:
  - software composition analysis
  - software composition analysis rules
  - library vulnerabilities
  - SCA
description: Découvrez comment configurer Software Composition Analysis afin d'analyser
  vos bibliothèques open source importées et détecter les vulnérabilités connues avant
  leur mise en production.
further_reading:
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: Blog
  text: Renforcer la sécurité des applications en production avec la solution Application Vulnerability Management
    de Datadog
- link: /getting_started/application_security/software_composition_analysis
  tag: Documentation
  text: Premiers pas avec Software Composition Analysis
- link: /security/application_security/software_composition_analysis/
  tag: Documentation
  text: En savoir plus sur Software Composition Analysis
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: En savoir plus sur l'intégration du code source
- link: /code_analysis/static_analysis/
  tag: Documentation
  text: En savoir plus sur l'analyse statique
is_beta: false
title: Configurer Software Composition Analysis
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

Pour configurer Software Composition Analysis de Datadog, accédez à [**Software Delivery** > **Code Analysis**][6].

## Sélectionner l'emplacement d'exécution des analyses Software Composition Analysis
### Analyser avec le service d'analyse hébergé par Datadog
Les analyses de SCA peuvent être exécutées directement sur l'infrastructure de Datadog. Pour commencer, accédez à la page [**Code Analysis**][6].

### Scanner dans les pipelines CI
SCA peut être exécuté dans vos pipelines CI à l'aide de la CLI [`datadog-ci`][5]. Configurez vos [clés d'API et d'application Datadog (nécessite le scope `code_analysis_read`)][3], puis lancez les jobs SCA dans le fournisseur CI concerné.

{{< whatsnext desc="Consultez la documentation correspondant à votre fournisseur CI :" >}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}Fournisseurs CI génériques{{< /nextlink >}}
{{< /whatsnext >}}

## Sélectionner votre fournisseur de gestion de code source
Datadog SCA prend en charge tous les fournisseurs de gestion de code source, avec une prise en charge native de GitHub.
### Configurer l'intégration GitHub 
Si GitHub est votre fournisseur de gestion de code source, vous devez configurer une application GitHub à l'aide du [carré d'intégration GitHub][9] et mettre en place l'[intégration du code source][10] pour afficher des extraits de code en ligne et activer les [commentaires sur les pull requests][11].

Lors de l'installation d'une application GitHub, les autorisations suivantes sont requises pour activer certaines fonctionnalités :

- `Content: Read` permet d'afficher les extraits de code dans Datadog.
- `Pull Request: Read & Write` permet à Datadog d'ajouter des retours sur les violations directement dans vos pull requests à l'aide des [commentaires sur les pull requests][11].

### Autres fournisseurs de gestion de codes source 
Si vous utilisez un autre fournisseur de gestion de code source, configurez SCA pour qu'il s'exécute dans vos pipelines CI à l'aide de l'outil en ligne de commande `datadog-ci` et [téléversez les résultats][8] vers Datadog. 
Vous **devez** analyser votre référentiel sur la branche par défaut avant que les résultats n'apparaissent sur la page **Code Analysis**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/application_security/vulnerability_management
[2]: /fr/code_analysis/
[3]: /fr/account_management/api-app-keys/
[4]: /fr/getting_started/site/
[5]: https://github.com/DataDog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /fr/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /fr/code_analysis/software_composition_analysis/generic_ci_providers/
[9]: /fr/integrations/github
[10]: /fr/integrations/guide/source-code-integration
[11]: /fr/code_analysis/github_pull_requests/