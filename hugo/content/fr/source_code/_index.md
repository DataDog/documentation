---
aliases:
- /fr/integrations/guide/source-code-integration/
description: Configurez l'intégration du code source qui s'intègre à l'APM pour lier
  votre télémétrie à vos dépôts, intégrer des informations Git dans les artefacts
  de votre pipeline CI et utiliser des intégrations de gestion de code source pour
  générer des extraits de code en ligne dans Datadog.
title: Intégration du code source
---
## Aperçu {#overview}

L'intégration du code source de Datadog vous permet de connecter vos dépôts Git à Datadog pour activer diverses fonctionnalités liées au code source sur la plateforme Datadog. Elle permet de déboguer les traces de pile, les profils lents et d'autres problèmes en accédant aux lignes pertinentes de votre code source.

{{< img src="source_code_integration/inline-code-snippet.png" alt="Extrait de code en ligne d'une Java RuntimeException avec un bouton pour voir le code sur GitHub" style="width:100%;">}}

## Configuration et fonctionnalités {#setup-and-features}

{{< whatsnext desc="Pour la configuration et les fonctionnalités de l'intégration du code source, consultez les pages suivantes :" >}}
    {{< nextlink href="source_code/source-code-management" >}}Intégrations des fournisseurs de gestion de code source{{< /nextlink >}}
    {{< nextlink href="source_code/service-mapping" >}}Cartographie des services
  et étiquetage de télémétrie{{< /nextlink >}}
    {{< nextlink href="source_code/resource-mapping" >}}Cartographie des ressources Kubernetes{{< /nextlink >}}
    {{< nextlink href="source_code/features" >}}Fonctionnalités de l'intégration du code source{{< /nextlink >}}
{{< /whatsnext >}}