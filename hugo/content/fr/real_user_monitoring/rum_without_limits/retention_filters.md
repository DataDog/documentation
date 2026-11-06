---
description: Découvrez comment fonctionnent les filtres de rétention dans RUM without
  Limits.
further_reading:
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guide
  text: Bonnes pratiques pour les filtres de rétention
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentation
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: Documentation
  text: Analysez les performances avec des métriques
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: Documentation
  text: Contrôlez les coûts avec des quotas de rétention
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: Blog
  text: Unifiez et corrélez les données frontend et backend avec des filtres de rétention
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: Centre d'apprentissage
  text: 'Laboratoire interactif : filtres de rétention RUM'
title: Conserver les données avec des filtres de rétention
---
{{< learning-center-callout header="Essayez les filtres de rétention RUM dans le centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/rum-retention-filters" hide_image="false" >}}
  Découvrez comment utiliser les filtres de rétention RUM pour contrôler les données de session stockées et optimiser votre budget d'observabilité.
{{< /learning-center-callout >}}

## Présentation {#overview}

Les filtres de rétention sont un ensemble de requêtes, similaires à celles utilisées dans le RUM Session Explorer, qui sont exécutées sur les événements RUM (sessions, vues, actions, ressources, etc.) au moment de leur ingestion. Ces filtres déterminent si une session est conservée pendant la période de rétention RUM standard de 30 jours ou si elle est supprimée.

Le **taux de rétention** spécifie le pourcentage de sessions correspondantes que vous souhaitez conserver, ce qui permet un meilleur contrôle des coûts. Bien que les filtres soient comparés à des événements individuels, tous les événements de la session sous-jacente sont conservés lorsqu'une décision d'échantillonnage est prise, garantissant ainsi une visibilité de bout en bout sur les sessions utilisateur.

Votre configuration est composée de trois types de filtres : [filtres de rétention permanents](#permanent-retention-filters), [filtres d'exclusion](#exclusion-filters) et [filtres de rétention personnalisés](#custom-retention-filters). Consultez [Types de filtres](#types-of-filters) pour connaître le chemin qu'un événement emprunte à travers eux.

## Fonctionnement {#how-it-works}

Une session est stockée dès qu'un filtre de rétention correspond à l'un de ses événements constitutifs sur la base de la requête prédéfinie, et elle est retenue en fonction du taux de rétention configuré

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-2.png" alt="Diagramme montrant le flux logique des filtres de rétention et leur impact sur le nombre de sessions finalement conservées." style="width:80%" >}}

Le flux logique des filtres de rétention est le suivant :

- Chaque événement est évalué par rapport à vos filtres en séquence.
- Lorsqu'un événement correspond à un filtre, le taux de rétention décide de la rétention pour l'ensemble de la session. Dans les deux cas, l'événement n'est pas évalué par rapport aux filtres suivants, c'est pourquoi l'**ordre des filtres de rétention est important**.
- Une fois qu'une session est conservée, elle est disponible dans le Session Explorer et d'autres pages RUM, et ses événements ultérieurs sont conservés automatiquement au lieu de passer par les filtres.

**Remarques** :

- Si un événement ne correspond à aucun filtre, ou s'il correspond à un filtre mais que le taux de rétention ne l'échantillonne pas, les événements ultérieurs de la même session sont toujours évalués, de sorte que la session peut éventuellement être conservée.
- Soyez prudent avec les filtres sur les attributs qui se mettent à jour au fil du temps. Un filtre sur les sessions avec moins de deux erreurs correspond à presque tout, car les nombres d'erreurs commencent à zéro et se mettent à jour en temps réel. Utilisez soit des conditions « supérieur ou égal à » (≥), telles que `@session.error.count >= 2`, soit attendez que l'objet soit complet en ajoutant `@session.is_active: false` ou `@view.is_active: false`.
- Les événements ne sont pas nécessairement évalués dans l'ordre dans lequel ils se sont produits : l'événement `B` peut être évalué avant l'événement `A`. Tous les événements sont finalement évalués par rapport à la liste des filtres de rétention pour éviter les lacunes.

## Types de filtres {#types-of-filters}

{{< img src="real_user_monitoring/rum_without_limits/retention-filters-types.png" alt="Les trois groupes de filtres sur la page Filtres de rétention : Filtres permanents, Filtres d'exclusion et Filtres de rétention personnalisés." style="width:100%" >}}

Chaque événement RUM suit le même chemin à travers votre configuration :

1. L'événement est évalué par rapport aux **filtres de rétention permanents**. Ceux-ci sont prédéfinis et ne peuvent pas être modifiés. Si l'événement correspond à l'un d'eux, sa session est conservée.
1. L'événement est évalué par rapport aux **filtres d'exclusion**. Si l'événement correspond à l'un d'eux, il n'est pas évalué davantage.
1. Si l'événement ne correspond à aucun filtre d'exclusion, il est évalué par rapport à vos **filtres de rétention personnalisés**, dans l'ordre. Si l'événement correspond à l'un d'entre eux et que le taux de rétention l'échantillonne, sa session est conservée.

Les trois types diffèrent selon ce qu'entraîne une correspondance :

| Type de filtre                | Lorsqu'un événement correspond                                                |
| -------------------------- | -------------------------------------------------------------------- |
| Filtre de rétention permanent | La session est conservée.                                              |
| Filtre d'exclusion           | L'événement ignore l'évaluation par rapport aux filtres de rétention personnalisés.      |
| Filtre de rétention personnalisé    | La session est conservée, selon le taux de rétention configuré.  |

## Filtres de rétention permanents {#permanent-retention-filters}

Les filtres de rétention permanents sont des filtres de rétention prédéfinis qui ne peuvent pas être modifiés, désactivés ou supprimés. Ils sont placés en haut de votre liste de filtres de rétention.

{{< img src="real_user_monitoring/rum_without_limits/permanent-retention-filters.png" alt="Le groupe Filtres permanents s'est développé, affichant les filtres Échantillonnage plat RUM-APM, Sessions synthétiques et Sessions avec relectures forcées." style="width:100%" >}}

Il existe trois filtres de rétention permanents :

- {{< ui >}}RUM-APM Flat Sampling{{< /ui >}} : conserve 1 % des sessions avec des traces distribuées ingérées (et indexe leurs traces sur APM). Ces sessions (et leurs traces) **ne sont pas soumises à la facturation RUM (ou à la facturation APM)**.
- {{< ui >}}Synthetics Sessions{{< /ui >}} : conserve toutes les sessions générées par [Synthetic Monitoring][1]. Ces sessions sont facturées dans le cadre de Synthetic Monitoring et **ne sont pas soumises à la facturation RUM**.
- {{< ui >}}Sessions with forced replays{{< /ui >}} : conserve toutes les sessions pour lesquelles une relecture a été collectée de force via le mécanisme de [collecte forcée][2].

<div class="alert alert-info">Le filtre de rétention permanent RUM-APM Flat Sampling ne s'applique qu'avec les SDK suivants : <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

## Filtres d'exclusion {#exclusion-filters}

{{< img src="real_user_monitoring/rum_without_limits/exclusion-filters-excluded-errors.png" alt="Le groupe Exclusion Filters développé, affichant le filtre prédéfini Excluded errors from Error Tracking et deux filtres d'exclusion personnalisés avec leurs types d'événements et leurs requêtes." style="width:100%" >}}

Les filtres d'exclusion permettent aux événements ciblés de ne pas être évalués par rapport aux filtres de rétention personnalisés. Ils sont appliqués après les filtres de rétention permanents.

Utilisez-les lorsque les mêmes événements ne sont pertinents pour aucun de vos filtres de rétention personnalisés, par exemple pour le trafic de bots auto-déclaré, une version d'application obsolète ou une erreur connue générant beaucoup de bruit.

<div class="alert alert-warning">Les filtres d'exclusion s'appliquent à l'<strong>événement</strong>, et non à la session. L'exclusion d'un événement ne supprime pas sa session : si un autre événement de la même session correspond à un filtre de rétention personnalisé, la session entière est conservée, y compris l'événement exclu.</div>

Un filtre d'exclusion est composé d'un type d'événement et d'une requête, comme les filtres de rétention, avec deux différences :

- Un filtre d'exclusion peut cibler **Tous les événements** au lieu d'un seul type d'événement, ce qui vous permet d'exclure sur des attributs ou des tags partagés par chaque événement, tels que `@device.type` ou `@geo.country`.
- Un filtre d'exclusion n'a pas de taux de rétention. Il correspond soit à un événement, soit il n'y correspond pas, donc l'**ordre des filtres d'exclusion n'a pas d'importance**.

### Réutilisation des exclusions Error Tracking {#reusing-error-tracking-exclusions}

Un filtre d'exclusion prédéfini en haut de la liste cible les erreurs que vous avez [exclues dans Error Tracking][10], afin que vous n'ayez pas à maintenir les mêmes exclusions à deux endroits.

Vous pouvez activer ou désactiver ce filtre, mais vous ne pouvez pas le modifier ni le supprimer.

## Filtres de rétention personnalisés {#custom-retention-filters}

{{< img src="real_user_monitoring/rum_without_limits/custom-retention-filters.png" alt="Le groupe Filtres de rétention personnalisés s'est développé, affichant deux filtres ordonnés avec les types d'événements, les taux de rétention et les nombres de sessions conservées." style="width:100%" >}}

Les filtres de rétention personnalisés sont les filtres que vous créez et contrôlez. Chacun associe un type d'événement à une requête et un taux de rétention, et chacun peut conserver des sessions.

### Exclusion d'événements avec une requête de filtre {#excluding-events-with-a-filter-query}

Les filtres de rétention personnalisés spécifient quelles sessions conserver, plutôt que lesquelles exclure. Vous ne pouvez pas définir un pourcentage de rétention à 0 % (le minimum est de 0,1 %). De plus, définir des pourcentages de rétention faibles n'est pas une stratégie d'exclusion efficace car les sessions peuvent toujours être conservées par d'autres filtres dans votre configuration.

Pour empêcher un seul filtre de correspondre à un sous-ensemble d'événements, ajoutez des exclusions **dans la requête de ce filtre**. Par exemple :

- L'ajout de `-version:(1* OR 2*)` à un filtre de rétention permet de garantir que ce filtre ne conserve jamais les événements des anciennes versions 1 et 2 de votre application.
- L'ajout de `-@device.type:Bot` à un filtre de rétention exclut les robots des moteurs de recherche et autres robots auto-déclarés de ce filtre.
- L'ajout de `-@geo.country:"South Korea"` à un filtre de rétention exclut les sessions provenant de Corée du Sud de ce filtre.

Les exclusions dans la requête ne s'appliquent qu'au filtre qui les contient. Comme tout autre filtre peut toujours conserver la même session, exclure des événements dans toute votre configuration de cette manière signifie répéter l'exclusion dans **chaque** filtre, et la répéter à chaque fois que vous ajoutez un filtre.

Pour exclure des événements de tous vos filtres de rétention personnalisés à la fois, utilisez plutôt des [filtres d'exclusion](#exclusion-filters).

**Remarque** : Les événements correspondant à un filtre d'exclusion n'atteignent jamais vos filtres de rétention personnalisés et ne déclenchent donc jamais la rétention de leur session.

## Configuration {#setup}

Pour configurer vos filtres, cliquez sur {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}} dans le coin supérieur droit de n'importe quelle page RUM pour un accès direct.

Vous pouvez également :

1. Accédez à [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][3].
1. Créez une application RUM ou cliquez sur une application existante.
1. Sous Product Settings, accédez à la page {{< ui >}}Retention Filters{{< /ui >}}.

### Création d'un filtre {#creating-a-filter}

Pour créer un filtre de rétention ou un filtre d'exclusion :

1. Dans la section correspondant au type de filtre que vous souhaitez créer, cliquez sur le bouton {{< ui >}}\+ Add Filter{{< /ui >}}.
1. Donnez un nom descriptif au filtre.
1. Sélectionnez un type d'événement dans la liste déroulante et saisissez une requête. Toute requête pouvant être écrite dans l'[RUM Explorer][4] fonctionne. Les filtres d'exclusion peuvent également cibler {{< ui >}}All events{{< /ui >}}.
1. Pour un filtre de rétention personnalisé, définissez éventuellement un taux de rétention pour les sessions qui correspondent à la requête. Vous pouvez cliquer sur {{< ui >}}Generate Estimate{{< /ui >}} pour vous aider à définir ce taux. Les filtres d'exclusion n'ont pas de taux de rétention.

Un nouveau filtre de rétention personnalisé est ajouté en bas de la liste des filtres de rétention personnalisés. Il faut quelques secondes à Datadog pour propager un nouveau filtre et commencer à l'appliquer.

La création d'un filtre nécessite les mêmes autorisations pour les deux types de filtres.

### Modifier des filtres {#modifying-filters}

{{< img src="real_user_monitoring/rum_without_limits/modifying-filters.png" alt="Passez la souris sur un filtre de rétention pour le modifier." style="width:100%" >}}

#### Modifier un filtre {#edit-a-filter}

Pour modifier un filtre existant :

1. Passez la souris sur le filtre et cliquez sur l'icône {{< ui >}}Edit{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save Changes{{< /ui >}}.

#### Dupliquer un filtre {#duplicate-a-filter}

Pour dupliquer un filtre :

1. Passez la souris sur le filtre et cliquez sur l'icône {{< ui >}}Duplicate{{< /ui >}}.
1. Apportez les modifications souhaitées au filtre, puis cliquez sur {{< ui >}}Save Changes{{< /ui >}}.

#### Supprimer un filtre {#delete-a-filter}

Pour supprimer un filtre :

1. Passez la souris sur le filtre et cliquez sur l'icône {{< ui >}}Delete{{< /ui >}}.
1. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

#### Désactiver un filtre {#disable-a-filter}

Les filtres désactivés ignorent les événements. Un filtre de rétention personnalisé désactivé ne prend aucune décision d'échantillonnage, et un filtre d'exclusion désactivé n'exclut aucun événement.

Utilisez le bouton bascule à droite du filtre pour le désactiver ou l'activer.

#### Réorganiser les filtres {#reorder-filters}

Faites glisser et déposez les filtres pour les réorganiser à leur nouvelle position.

La réorganisation ne s'applique qu'aux filtres de rétention personnalisés, car l'ordre des filtres d'exclusion n'a pas d'importance.

### Plafonnement de la rétention avec des quotas {#capping-retention-with-quotas}

Pour plafonner le nombre total de sessions conservées par jour via vos filtres de rétention, consultez [Retention Quotas][9].

## Fonctionnement des filtres de rétention avec les replays {#how-retention-filters-work-with-replays}

Vous pouvez gérer l'échantillonnage des sessions avec les replays en utilisant des filtres de rétention. Chaque fois qu'une session avec replays est facturée, les événements de session et l'enregistrement vidéo sont conservés et facturés. Cela signifie que si vous collectez 100 % des sessions et 100 % des replays à partir des SDK, chaque fois qu'un filtre de rétention conserve une session, Datadog conserve et facture à la fois la session et le replay.

**Remarque** : Bien que les SDK mobiles de Datadog fournissent également des [API pour démarrer et arrêter l'enregistrement de manière conditionnelle][2] (au lieu de s'appuyer sur un taux d'échantillonnage fixe), seuls les replays dont l'enregistrement est forcé par le SDK Browser sont conservés par défaut.

## Filtres de rétention inter-produits {#cross-product-retention-filters}

Les filtres de rétention inter-produits vous permettent d'optimiser la corrélation entre différents produits afin de conserver une télémétrie plus riche. Lors de la configuration d'un filtre de rétention RUM, vous pouvez activer un filtre de rétention inter-produits pour les traces APM.

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-overview.png" alt="Filtres de rétention RUM avec filtres de rétention inter-produits activés pour les traces APM." style="width:100%" >}}

Le {{< ui >}}APM traces filter{{< /ui >}} indexe les traces APM pour le pourcentage spécifié de sessions conservées par le filtre de rétention RUM parent qui disposent de traces disponibles.

**Remarque** : La disponibilité des traces APM dépend de votre **configuration du SDK d'échantillonnage de traces** (découvrez comment <a href="/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum">corréler RUM avec les traces APM</a>)

  <div class="alert alert-info">Le filtre de traces APM est uniquement compatible avec les versions suivantes des SDK : <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

<div class="alert alert-danger">La configuration de filtres de rétention inter-produits peut augmenter les volumes indexés APM.</div>

Pour **trouver des sessions avec des traces APM indexées** dans le RUM Explorer, effectuez la requête `@session.has_indexed_apm_traces:true`.

### Exemple {#example}

Considérez une configuration où vous définissez un filtre de rétention RUM unique configuré comme suit :

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-apm-only.png" alt="Un filtre de rétention RUM ciblant les erreurs avec une rétention de 60 %, avec un filtre de rétention inter-produits réglé à 25 % pour les traces APM." style="width:60%" >}}

Si vous avez configuré le SDK pour échantillonner 40 % des traces, le résultat est le suivant :

- 40 % des sessions RUM ingérées ont leurs traces ingérées sur APM.
- 60 % des sessions RUM ingérées contenant au moins une erreur sont conservées.
- 25 % x 40 % = 10 % de ces sessions conservées ont leurs traces APM indexées.

### Filtres de rétention inter-produits sur les filtres permanents {#cross-product-retention-filters-on-permanent-filters}

Les filtres de rétention inter-produits sont également disponibles sur les <a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">Filtres de rétention permanents</a>. Le filtre de traces APM est **uniquement modifiable sur les filtres Synthetic Monitoring Sessions et Sessions with forced replays**.

<div class="alert alert-danger">Les traces APM indexées via un filtre de rétention inter-produits sur les filtres permanents Synthetics ou Forced Replay sont soumises à la facturation APM.</div>

## Bonnes pratiques {#best-practices}

Consultez [Bonnes pratiques pour les filtres de rétention][5].

## API {#api}

Les filtres et les filtres de rétention inter-produits peuvent être gérés via des [API][6] ou les [modules Terraform][7] dédiés de Datadog.

## Étapes suivantes {#next-steps}

Analysez les performances avec des [métriques][8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/
[2]: /fr/session_replay/setup_and_configuration/?platform=browser&tab=npm#start-or-stop-the-recording-manually
[3]: https://app.datadoghq.com/rum/list
[4]: /fr/real_user_monitoring/explorer/
[5]: /fr/real_user_monitoring/guide/retention_filter_best_practices
[6]: /fr/api/latest/rum-retention-filters/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/data-sources/rum_retention_filters
[8]: /fr/real_user_monitoring/rum_without_limits/metrics
[9]: /fr/real_user_monitoring/rum_without_limits/retention_quotas
[10]: /fr/error_tracking/issue_states/#excluding-an-issue