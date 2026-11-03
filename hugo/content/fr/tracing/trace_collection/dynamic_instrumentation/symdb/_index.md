---
aliases:
- /fr/dynamic_instrumentation/symdb
- /fr/tracing/dynamic_instrumentation/symdb
description: Activez la saisie semi-automatique et la fonctionnalité de recherche
  de type IDE pour Dynamic Instrumentation afin d'améliorer l'expérience des développeurs.
further_reading:
- link: /dynamic_instrumentation/
  tag: Documentation
  text: En savoir plus sur Dynamic Instrumentation
is_beta: true
private: false
site_support_id: autocomplete_search
title: Saisie semi-automatique et recherche
---
{{< callout url="#" btn_hidden="true" >}}
La saisie semi-automatique et la recherche sont en préversion pour Python et .NET.
{{< /callout >}}

## Présentation {#overview}

La saisie semi-automatique et la recherche améliorent l'expérience utilisateur de [Dynamic Instrumentation][1] en ajoutant des fonctionnalités de type IDE, telles que la recherche de classes et de méthodes, ainsi que la saisie semi-automatique pour le [langage d'expression de Dynamic Instrumentation][5].

Pour fournir la saisie semi-automatique et la recherche, des symboles et des métadonnées non sensibles sont téléversés depuis votre application vers Datadog. Les données téléversées incluent les noms des classes, des méthodes, des arguments, des champs et des variables locales, ainsi que les métadonnées associées, comme les numéros de ligne.

## Mise en route {#getting-started}

### Prérequis {#prerequisites}

La saisie semi-automatique et la recherche nécessitent les éléments suivants :

- [Dynamic Instrumentation][1] est activé pour votre service.
- Le [Datadog Agent][2] 7.49.0 ou une version ultérieure est installé avec votre service.
- [Remote Configuration][3] est activé dans l'Agent.
- Les tags d'[unified service tagging][4] `service`, `env` et `version` sont appliqués à votre déploiement.

### Activez la saisie semi-automatique et la recherche pour votre service {#enable-autocomplete-and-search-for-your-service}

Sélectionnez votre environnement d'exécution :

{{< card-grid card_width="170px" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/dotnet" src="integrations_logos/dotnet-core.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/dotnet" src="integrations_logos/dotnet-framework.png" alt="Dotnet" >}}
{{< /card-grid >}}

## Explorer la saisie semi-automatique et la recherche {#explore-autocomplete-and-search}

La saisie semi-automatique et la recherche permettent à Dynamic Instrumentation de se comporter davantage comme un IDE :

- **Recherche de classes et de méthodes** : trouvez où ajouter l'instrumentation.
- **Affichage du code** : lorsque vous sélectionnez une méthode dans la configuration de Dynamic Instrumentation, Datadog affiche le code de cette méthode.
- **Saisie semi-automatique d'expressions** : obtenez des suggestions pour les modèles d'expression qui utilisent le [langage d'expression de Dynamic Instrumentation][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dynamic_instrumentation/
[2]: /fr/agent/
[3]: /fr/tracing/guide/remote_config
[4]: /fr/getting_started/tagging/unified_service_tagging/
[5]: /fr/dynamic_instrumentation/expression-language