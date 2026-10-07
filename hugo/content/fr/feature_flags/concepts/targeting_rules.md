---
description: Découvrez comment les règles de ciblage, les filtres et les types de
  déploiement contrôlent les variantes que votre application propose.
further_reading:
- link: /feature_flags/concepts/evaluation_tester
  tag: Documentation
  text: Testeur d'évaluation
- link: /feature_flags/concepts/targeting_attributes
  tag: Documentation
  text: Attributs de ciblage
- link: /feature_flags/concepts/scheduled_rollouts
  tag: Documentation
  text: Déploiements planifiés
- link: /feature_flags/concepts/saved_filters
  tag: Documentation
  text: Filtres enregistrés
- link: /feature_flags/concepts/traffic_splitting
  tag: Documentation
  text: Répartition et randomisation du trafic
- link: /feature_flags/concepts/experiments
  tag: Documentation
  text: Feature Flags et Experiments
- link: /feature_flags/concepts/evaluation_context
  tag: Documentation
  text: Contexte d'évaluation
- link: /feature_flags/concepts/environments
  tag: Documentation
  text: Environnements
- link: /feature_flags/client/
  tag: Documentation
  text: SDK côté client
title: Règles de ciblage et filtres
---
## Présentation {#overview}

**Les règles de ciblage** définissent quelle variante servir à quels sujets. Chaque règle peut inclure un **filtre**, une ou plusieurs variantes et un déploiement en pourcentage facultatif. Les règles sont évaluées dans l'ordre jusqu'à ce qu'une correspondance soit trouvée.

## Types de règles de ciblage {#targeting-rule-types}

Datadog prend en charge différents types de règles de ciblage en fonction de votre stratégie de déploiement :

| Type | Description |
|------|-------------|
| **Feature gate** | Déployez auprès d'un pourcentage de sujets correspondant à votre filtre (aléatoire ou non), immédiatement ou à une [heure de début planifiée](/feature_flags/concepts/scheduled_rollouts/) |
| **Déploiement progressif** | Déploiement aléatoire selon un planning comportant plusieurs étapes, démarré manuellement ou à une [heure de début planifiée](/feature_flags/concepts/scheduled_rollouts/) |
| **Experiment** |  Allocation aléatoire associée à un [experiment][5] |

## Configurer les règles de ciblage {#configure-targeting-rules}

Pour configurer les règles de ciblage d'un flag :

1. Accédez à **Feature Flags** et sélectionnez votre flag.
2. Sélectionnez l'environnement dont vous souhaitez modifier les règles.
3. Cliquez sur **Add Targeting Rule** (ou cliquez sur la règle de ciblage que vous souhaitez modifier).

{{< img src="feature_flags/concepts/ff-targeting-rules-and-rollouts-2.png" alt="Section Règles de ciblage et déploiements d'un flag." style="width:100%;" >}}

Pour chaque règle de ciblage, configurez les éléments suivants :

- **Nommez votre règle de ciblage** : Donnez un nom à votre règle de ciblage pour décrire le groupe qu'elle cible.
- **Définissez un filtre** (facultatif) : Si vous ne définissez pas de filtre, la règle correspond à tous les sujets de cet environnement. Pour réutiliser les mêmes conditions sur plusieurs flags, ajoutez un [filtre enregistré][1] au lieu de les redéfinir pour chaque flag.
- **Sélectionnez les variantes** : choisissez les variantes à servir aux sujets correspondants. Cliquez sur **Répartir le trafic** pour randomiser sur plusieurs variantes (voir [Répartition et randomisation du trafic](/feature_flags/concepts/traffic_splitting/)).
- **Définissez l'exposition au trafic** (facultatif) : servez la variante à un pourcentage de sujets correspondants (voir [Répartition et randomisation du trafic](/feature_flags/concepts/traffic_splitting/)).
- **Planifier une heure de début** (facultatif) : activez la règle automatiquement à une date et une heure ultérieures au lieu de le faire immédiatement (voir [Déploiements planifiés](/feature_flags/concepts/scheduled_rollouts/)).

{{< img src="feature_flags/concepts/configure-targeting-rule-3.png" alt="Panneau latéral de l'éditeur de règles de ciblage sur un flag." style="width:70%;" >}}

Après avoir configuré vos règles de ciblage, cliquez sur **Enregistrer**, puis activez le flag dans l'environnement afin que les SDK puissent évaluer les règles de ciblage. Vous pouvez également utiliser le [testeur d'évaluation][2] pour simuler la façon dont la règle s'évalue pour une clé de ciblage et des attributs donnés, sans affecter les données de production.

<div class="alert alert-info">
Les SDK n'évaluent pas les règles de ciblage lorsque le flag est <b>désactivé</b> ou <b>remplacé</b> dans un environnement. Si le flag est remplacé par une variante fixe, le SDK renvoie cette variante à la place. Si le flag est désactivé, le SDK renvoie la variante par défaut codée.
</div>

## Filtres et contexte d'évaluation {#filters-and-evaluation-context}

Les filtres utilisent des attributs provenant du [contexte d'évaluation][4] de votre SDK. Définissez les attributs lorsque vous configurez le contexte d'évaluation avant d'évaluer les flags. Les attributs doivent être des valeurs primitives plates (chaînes, nombres, booléens). Les objets imbriqués et les tableaux ne sont pas pris en charge.

Lorsque vous créez un filtre, le champ d'attribut suggère des attributs que votre organisation a déjà définis ou que votre SDK a envoyés récemment. Consultez [Attributs de ciblage][3] pour définir des attributs réutilisables avec un type de données, qui détermine également les opérateurs disponibles pour cet attribut.

Avec un contexte d'évaluation comportant les attributs `country`, `tier`, `user_role` et `account_age_days`, vous pouvez créer des filtres avec différents opérateurs, tels que l'égalité, **est l'un de**, **n'est pas**, ou des comparaisons numériques :

- `country` **est l'un de** `US`, `CA`
- `tier` **est égal à** `premium`
- `user_role` **n'est pas égal à** `guest`
- `account_age_days` **est supérieur à** `90`

## Hiérarchie des règles {#rule-hierarchy}

Les règles de ciblage sont évaluées **dans l'ordre** de haut en bas :

1. Le SDK évalue la première règle. Si le sujet correspond au filtre (ou si aucun filtre n'est défini), la règle peut servir une variante.
2. Si le sujet ne correspond pas, l'évaluation passe à la règle suivante.
3. Si aucune règle ne correspond, le SDK sert la **variante par défaut** pour cet environnement.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/feature_flags/concepts/saved_filters/
[2]: /fr/feature_flags/concepts/evaluation_tester/
[3]: /fr/feature_flags/concepts/targeting_attributes/
[4]: /fr/feature_flags/concepts/evaluation_context/
[5]: /fr/feature_flags/concepts/experiments/