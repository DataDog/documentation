---
description: Découvrez comment définir une ou plusieurs conditions permettant de faire
  en sorte que CI Visibility ne traite pas certains événements.
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: Blog
  text: Simplifiez vos tests CI à l'aide de la fonctionnalité Intelligent Test Runner
    de Datadog
- link: /continuous_integration/pipelines
  tag: Documentation
  text: En savoir plus sur Pipeline Visibility
title: Définir les paramètres d'ingestion pour CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

Les filtres d'exclusion permettent de contrôler précisément votre budget de CI Visibility en vous laissant définir une ou plusieurs conditions pour que Datadog ne traite pas certains événements.

### Compatibilité
Des filtres sont disponibles pour Pipeline Visibility.

## Ajouter un filtre d'exclusion
Les filtres d'exclusion ne sont pas nécessaires pour configurer Pipeline Visibility. Toutes les données sont ingérées et traitées par défaut.

Pour créer des filtres pour votre organisation, votre compte utilisateur doit disposer de l'[autorisation][1] `ci_ingestion_control_write`.

1. Dans Datadog, accédez à **CI** > **Settings** > **Ingestion Settings**.
2. Sélectionnez **Add an Exclusion Filter**.

{{< img src="ci/add-ci-exclusion-filter.png" alt="Ajouter un bouton de filtre dʼexclusion" style="width:90%;">}}

3. Nommez le filtre et définissez une requête. Après avoir défini une requête, l'aperçu se trouvant au-dessus des champs de saisie affiche les données ingérées qui correspondent à votre requête. Une fois que votre filtre est créé et activé, les événements similaires à ceux présentés dans l'aperçu sont exclu de l'ingestion.

{{< img src="ci/exclusion-filter-pipeline.png" alt="Créer un filtre dʼexclusion pour un pipeline spécifique" style="width:100%;">}}

Une fois que vous avez ajouté un filtre, chaque ligne de cette page affiche :
- **Filter name** - le nom du filtre
- **Exclusion query** - la requête qui a été définie pour ce filtre
- Basculer pour [activer/désactiver le filtre](#activer-et-desactiver-des-filtres) - les filtres nouvellement créés sont activés par défaut.

Toutes les spans correspondant à un ou plusieurs filtres ne sont ni ingérés ni traités par Datadog.

## Définir des requêtes pour un filtre d'exclusion
Les filtres sont définis de manière flexible par le biais d'une interface d'édition de requêtes. Vous pouvez vous appuyer sur des [tags][3] et des attributs pour créer vos filtres.

### Exemples de filtres d'exclusion
Vous trouverez ci-dessous des exemples de la façon dont les filtres d'exclusion peuvent vous permettre d'optimiser l'utilisation et la facturation de CI Visibility.

#### Filtrer par l'adresse e-mail de l'auteur de git
Vous pouvez choisir de ne pas surveiller un ou plusieurs auteurs spécifiques en définissant un filtre avec l'adresse e-mail de l'auteur de git (`@git.commit.author.email`). La capture d'écran ci-dessous montre un filtre dans lequel tous les spans associés à des commits provenant de cette adresse e-mail spécifique de l'auteur de git ne sont pas ingérés.

{{< img src="ci/exclusion-filter-email.png" alt="Filtre dʼexclusion pour les paramètres dʼingestion pour une adresse e-mail" style="width:100%;">}}

#### Filtrer par domaine d'adresse e-mail de l'auteur de git
Vous pouvez également exclure plusieurs auteurs à la fois par domaine d'adresse e-mail (par exemple, vous pouvez choisir dʼexclure les contributeurs externes qui commettent dans les dépôts surveillés). La capture d'écran ci-dessous montre un filtre dans lequel tous les spans associés à des commits provenant de domaines d'adresses e-mail qui ne correspondent pas à celui de la requête ne sont pas ingérés.

{{< img src="ci/exclusion-filter-domain.png" alt="Filtre dʼexclusion pour les paramètres dʼingestion pour une adresse e-mail" style="width:100%;">}}

#### Filtrer par référentiel
Vous pouvez exclure des référentiels spécifiques de la surveillance (par exemple, un référentiel de test interne) en définissant un filtre avec le nom (`@git.repository.name`) ou l'ID (`@git.repository.id`) du référentiel. La capture d'écran ci-dessous montre un filtre dans lequel tous les spans associés aux commits de ce dépôt ne sont pas ingérés.

{{< img src="ci/exclusion-filter-repo.png" alt="Filtre dʼexclusion pour les paramètres dʼingestion pour un référentiel" style="width:100%;">}}

## Mettre à jour des filtres d'exclusion
Les filtres d'exclusion peuvent être activés/désactivés, mis à jour et supprimés par les utilisateurs disposant dʼ[autorisations][4] `ci_ingestion_control_write`. Ils sont appliqués au niveau de l'organisation. Vous pouvez consulter des informations détaillées sur les personnes qui ont modifié les filtres d'exclusion en utilisant le [journal dʼaudit][5] de Datadog.

### Activer et désactiver des filtres
Un bouton situé à droite de chaque filtre vous permet d'activer et de désactiver le filtre à tout moment. Les filtres nouvellement créés sont activés par défaut.

**Remarque** : dans la plupart des cas, les filtres sont appliqués aux données ingérées dans un délai de moins d'une seconde (p95) après leur activation. Cependant, il est possible qu'un filtre activé nécessite jusqu'à quelques minutes pour prendre effet.

### Mettre à jour des filtres
Vous pouvez renommer un filtre ou modifier la requête d'un filtre d'exclusion à tout moment dans la page **Paramètres d'ingestion**.

{{< img src="ci/exclusion-filter-edit.png" alt="Bouton de modification du filtre dʼexclusion dans les paramètres dʼingestion" style="width:90%;">}}

### Supprimer des filtres
Vous pouvez supprimer un filtre en cliquant sur l'icône de suppression.

{{< img src="ci/exclusion-filter-delete.png" alt="Bouton de suppression du filtre dʼexclusion dans les paramètres dʼingestion" style="width:90%;">}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/#ci-visibility
[3]: /fr/getting_started/tagging/
[4]: /fr/account_management/rbac/permissions/#ci-visibility
[5]: /fr/account_management/audit_trail/events/#ci-visibility-events
[6]: /fr/monitors/types/apm/