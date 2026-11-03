---
aliases:
- /fr/integrations/guide/source-code-integration/
description: Configurez l'intégration du code source qui s'interface avec APM pour
  lier votre télémétrie à vos dépôts, intégrer des informations Git dans les artefacts
  de votre pipeline CI et utiliser les intégrations de gestion du code source pour
  générer des extraits de code en ligne dans Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/bitbucket-cloud-source-code-integration/
  tag: Blog
  text: Dépannez et sécurisez votre code plus rapidement grâce à l'intégration du
    code source de Bitbucket Cloud de Datadog
title: Intégration du code source
---
## Présentation {#overview}

L'intégration du code source de Datadog vous permet de connecter vos dépôts Git à Datadog afin d'activer diverses fonctionnalités liées au code source sur la plateforme Datadog. Elle permet de déboguer les traces de pile, les profils lents et d'autres problèmes en accédant aux lignes pertinentes de votre code source.

{{< img src="source_code_integration/inline-code-snippet.png" alt="Extrait de code en ligne d'une RuntimeException Java avec un bouton pour afficher le code dans GitHub" style="width:100%;">}}

## Configuration et fonctionnalités {#setup-and-features}

{{< whatsnext desc="Pour la configuration et les fonctionnalités de l'intégration du code source, consultez les pages suivantes :" >}}
    {{< nextlink href="source_code/source-code-management" >}}Intégrations des fournisseurs de gestion du code source{{< /nextlink >}}
    {{< nextlink href="source_code/service-mapping" >}}Mappage de services
  et marquage de télémétrie{{< /nextlink >}}
    {{< nextlink href="source_code/resource-mapping" >}}Mappage des ressources Kubernetes{{< /nextlink >}}
    {{< nextlink href="source_code/features" >}}Fonctionnalités de l'intégration du code source{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}