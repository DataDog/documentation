---
description: Définissez des attributs de ciblage réutilisables pour obtenir des suggestions
  de saisie semi-automatique et des opérateurs adaptés au type lors de la création
  de règles de ciblage.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: Documentation
  text: Règles de ciblage et filtres
- link: /feature_flags/concepts/environments
  tag: Documentation
  text: Environnements
title: Attributs de ciblage
---
## Présentation {#overview}

Un **attribut de ciblage** est une définition réutilisable pour une valeur que votre application envoie dans son contexte d'évaluation, telle que `country` ou `user_role`. Définir un attribut une fois vous permet de le réutiliser dans les règles de ciblage avec des suggestions de saisie semi-automatique et des opérateurs adaptés au type, au lieu de retaper le nom de l'attribut et de choisir manuellement un opérateur compatible à chaque fois.

Chaque attribut de ciblage comprend les éléments suivants :

- **Clé d'attribut** : L'identifiant que vous référencez dans les règles de ciblage, par exemple `country` ou `user.plan`. Les clés sont uniques au sein de votre organisation et sont sensibles à la casse.
- **Type de données** : `Boolean`, `String`, `Number` ou `Semver`. Le type de données détermine quels opérateurs sont disponibles lorsque vous utilisez l'attribut dans une règle de ciblage.
- **Canal de distribution** : Quels SDK rapportent cet attribut dans leur contexte d'évaluation : **Client et Serveur**, **Client uniquement** ou **Serveur uniquement**. Les attributs Semver ne sont disponibles que pour les SDK clients.
- **Description** (facultatif) : Notes destinées aux autres utilisateurs sur ce que représente l'attribut.

Les attributs de ciblage s'appliquent à l'ensemble de l'organisation : une fois définis, un attribut est disponible pour les règles de ciblage dans tous les feature flags et environnements.

## Gérer les attributs de ciblage {#manage-targeting-attributes}

Pour afficher et gérer les attributs de ciblage de votre organisation :

1. Accédez à **Feature Flags** > **Paramètres** > **Attributs de ciblage**.
2. Cliquez sur **Créer un attribut** pour en définir un nouveau, ou sélectionnez un attribut existant pour le modifier.

Pour chaque attribut, configurez :

- **Clé d'attribut** : Un identifiant court et descriptif. Datadog supprime automatiquement les caractères non pris en charge lors de l'enregistrement.
- **Type de données** : Choisissez Booléen, Chaîne, Nombre ou Semver.
- **Canal de distribution (quels SDK incluent cet attribut dans leur contexte d'évaluation ?)** : Choisissez Client et Serveur, Client uniquement ou Serveur uniquement.
- **Description** (facultatif) : ajoutez du contexte pour que les autres utilisateurs sachent ce que représente l'attribut et comment il est renseigné.

Vous ne pouvez pas créer deux attributs avec la même clé dans votre organisation. L'archivage d'un attribut (au lieu de sa suppression) le retire des futures suggestions de saisie semi-automatique, mais ne modifie aucune règle de ciblage qui y fait déjà référence.

## Saisie semi-automatique des attributs dans les règles de ciblage {#attribute-autocomplete-in-targeting-rules}

Lorsque vous créez un filtre sur une règle de ciblage et que vous commencez à taper dans le champ d'attribut, Datadog suggère des attributs provenant de trois sources :

- **Attributs de ciblage enregistrés** issus du catalogue de votre organisation, affichés avec leur type de données et leur description.
- **Attributs observés dans les données d'évaluation** : attributs que vos SDK ont réellement envoyés au cours des 7 derniers jours et qui ne sont pas encore enregistrés dans le catalogue. Ceux-ci apparaissent sans type de données.
- **Créer un nouvel attribut** : si vous saisissez un nom qui ne correspond pas à un attribut existant ou observé, vous pouvez sélectionner **Créer un nouvel attribut** pour le définir sans quitter l'éditeur de règles de ciblage.

{{< img src="feature_flags/concepts/targeting-attributes-autocomplete.png" alt="Champ d'attribut dans une règle de ciblage affichant des suggestions de saisie semi-automatique et une option Créer un nouvel attribut." style="width:70%;" >}}

La création d'un attribut de cette manière l'enregistre dans le catalogue de votre organisation avec le canal de distribution **Client et Serveur** et sans type de données. Vous pouvez laisser le type de données non défini, ou modifier l'attribut depuis **Paramètres** > **Attributs de ciblage** pour en définir un ultérieurement.

Cliquez sur **Voir tous les attributs** au-dessus du filtre pour accéder à la page des paramètres des Attributs de ciblage.

## Comment le type de données affecte les opérateurs {#how-data-type-affects-operators}

Après avoir sélectionné un attribut dans une règle de ciblage, les opérateurs proposés sont filtrés pour correspondre à son type de données :

| Type de données | Opérateurs disponibles |
|-----------|---------------------|
| **Booléen** | est, est nul |
| **Chaîne** | est, correspond à, ne correspond pas à, est l'un de, n'est pas l'un de, est nul |
| **Nombre** | est, est l'un de, n'est pas l'un de, inférieur à, inférieur ou égal à, supérieur à, supérieur ou égal à, est nul |
| **Semver** |  : est, est l'un de, n'est pas l'un de, est nul, est égal à, n'est pas égal à, est inférieur à, est inférieur ou égal à, est supérieur à, est supérieur ou égal à |

Les comparaisons Semver prennent en charge les valeurs [Semantic Versioning 2.0.0][1] . Bien que la spécification exige trois composants numériques (par exemple, `1.2.3`), Datadog accepte également des valeurs avec un ou plusieurs composants numériques. Les composants manquants sont comparés comme étant zéro (`18`, `18.0` et `18.0.0` sont équivalents), tandis que des composants non nuls supplémentaires affectent l'ordre (`18.0.0.1` est supérieur à `18.0.0`). La priorité standard des préversions s'applique, et les métadonnées de build n'affectent pas les comparaisons.

Si vous modifiez l'attribut d'une condition pour un attribut avec un type de données incompatible, Datadog réinitialise l'opérateur et la valeur aux valeurs par défaut pour le nouveau type. Les attributs qui n'ont pas encore été enregistrés dans le catalogue (observés uniquement dans les données d'évaluation) ne restreignent pas les opérateurs disponibles.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://semver.org/spec/v2.0.0.html