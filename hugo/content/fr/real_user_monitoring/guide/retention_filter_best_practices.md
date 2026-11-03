---
description: Apprenez les meilleures pratiques pour séquencer vos filtres de rétention
  afin de stocker les données RUM dont vous avez besoin.
further_reading:
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: Documentation
  text: Filtres de rétention
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentation
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: Documentation
  text: Analysez les performances avec des métriques
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: Blog
  text: Unifiez et corrélez les données frontend et backend avec des filtres de rétention
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: Centre d'apprentissage
  text: 'Laboratoire interactif : filtres de rétention RUM'
title: Bonnes pratiques pour les retention filter (filtre de rétention)
---
{{< learning-center-callout header="Essayez les filtres de rétention RUM dans le centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/rum-retention-filters" hide_image="false" >}}
  Découvrez comment utiliser les filtres de rétention RUM pour contrôler les données de session stockées et optimiser votre budget d'observabilité.
{{< /learning-center-callout >}}

## Présentation {#overview}

RUM without Limits vous permet de capturer toutes les données de session tout en ne conservant que les sessions qui sont précieuses pour votre organisation. Cet outil améliore votre gestion des données en séparant l'ingestion des données de session de l'indexation.

## Fonctionnalités clés {#key-features}

- **Filtres de rétention dynamiques** : Ajustez les données à conserver sans modifier le code
- **Métriques complètes** : Les métriques reflètent 100 % des sessions, garantissant une visibilité totale
- **Rétention de session ciblée** : Donnez la priorité aux données de session cruciales pour l'optimisation des coûts

Ce guide fournit des stratégies pour gérer efficacement vos volumes de sessions RUM dans le cadre de votre budget d'observabilité.

## Comprendre le séquençage des filtres de rétention {#understanding-retention-filter-sequencing}

Les filtres de rétention RUM vous permettent de choisir les sessions utilisateur à conserver. Voici comment ils fonctionnent :

Chaque session contient plusieurs événements (comme des vues qui représentent la navigation, des actions utilisateur, des erreurs, des ressources qui représentent des requêtes réseau) et chacun d'eux est rempli d'attributs (comme la durée, le contexte, etc.). Le système évalue chaque événement individuellement par rapport à vos filtres de rétention :

1. **Session conservée** : Si au moins un événement dans une session correspond à un filtre de rétention ET est échantillonné pour la rétention, alors la session entière est préservée.
2. **Session supprimée** : Si aucun événement ne correspond à un filtre de rétention à la fin de la session, la session entière est supprimée.

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-3.png" alt="Organigramme montrant le fonctionnement des filtres de rétention : 1. Les événements d'une session sont vérifiés par rapport aux filtres, 2. Si un événement correspond et est sélectionné, la session entière est conservée, 3. Si aucun événement ne correspond à un filtre, la session est supprimée" style="width:80%" >}}

### Fonctionnement des différents types d'événements {#how-different-event-types-work}

Certains événements (comme les erreurs et les actions) ne peuvent pas être modifiés une fois qu'ils se sont produits. Datadog appelle ces **événements immuables**. D'autres (comme les sessions et les vues) peuvent changer à mesure que l'utilisateur continue d'utiliser votre application. Datadog appelle ces **événements mutables**.

- **Les événements immuables** (Action, Error, Resource, Long Task et Vital [events][1]) ne sont vérifiés qu'**une seule fois** par rapport à vos filtres et ne peuvent pas être modifiés une fois créés :

  1. L'événement s'arrête au premier filtre qui correspond à ses tags et attributs.
  2. Un nombre aléatoire est généré et comparé au taux d'échantillonnage du filtre pour décider si l'événement doit être conservé ou supprimé.
  3. Si l'événement est conservé, la session entière (y compris tous les événements précédents) est conservée, et les événements futurs de la même session passent automatiquement outre les filtres de rétention.
  4. Si l'événement est supprimé, il n'est pas évalué par d'autres filtres, mais les autres événements de la même session continuent d'être traités indépendamment.

- **Les événements mutables** (Session, View) sont revérifiés à chaque mise à jour :
  - Les événements View et Session sont différents des événements immuables car ils peuvent changer au fil du temps. Ces événements reçoivent des mises à jour chaque fois que de nouveaux événements se produisent en leur sein.
  - Contrairement aux [événements immuables](#immutable-events) qui ne sont évalués qu'une seule fois, les événements View et Session sont réévalués par rapport aux filtres de rétention à chaque mise à jour. Cela continue jusqu'à ce qu'ils correspondent à un filtre pour la première fois.

## Bonnes pratiques {#best-practices}

### Ordre des filtres de rétention {#ordering-retention-filters}

L'ordre de vos [filtres de rétention][2] est important. Datadog recommande de placer les filtres les plus spécifiques avec les taux d'échantillonnage les plus élevés en haut de la liste, et vos filtres les plus généraux avec les taux d'échantillonnage les plus bas en bas.

Par exemple, imaginez que vous ayez un événement de crash (un événement Error avec l'attribut `@error.is_crash:true`). Cet événement pourrait correspondre à plus d'un filtre, mais il n'est évalué que par rapport au premier filtre correspondant dans votre liste.

- Dans l'exemple ci-dessous, le filtre de rétention « Crashes » est placé au-dessus du filtre plus général « All errors ». Cela signifie que toutes les sessions de crash sont conservées, car elles correspondent d'abord au filtre « Crashes ».

  | ✅ Recommandé |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-good-3.png" alt="Exemple de bon ordre de filtrage : 1. Sessions avec relectures (100 % de rétention), 2. Sessions de crash (100 % de rétention), 3. Toutes les sessions d'erreur (50 % de rétention). Cela garantit que les sessions de crash sont toujours capturées." style="width:100%" >}} |

- Dans l'exemple suivant, le filtre plus général « All errors » est placé avant le filtre « Crashes ». Pour cette raison, les sessions de crash ne sont conservées que si elles sont sélectionnées par le filtre « All errors » (par exemple, s'il a un taux d'échantillonnage de 50 %). Si elles ne sont pas sélectionnées, elles ne sont pas évaluées par le filtre « Crashes » et ces sessions sont perdues.

  | ❌ Non recommandé |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-bad-3.png" alt="Exemple de mauvais ordre de filtrage : 1. Sessions avec relectures (100 % de rétention), 2. Toutes les sessions d'erreur (50 % de rétention), 3. Sessions de crash (100 % de rétention). Cela risque de perdre des sessions de crash si elles ne correspondent pas d'abord au filtre d'erreur général." style="width:100%" >}} |

### Filtres de secours pour capturer les sessions restantes {#fallback-filters-for-capturing-remaining-sessions}

Un filtre de secours en bas de votre liste capture un faible pourcentage de sessions qui n'ont pas été capturées par d'autres filtres. Vous devriez toujours inclure `@session.is_active:false` dans votre requête de filtre de secours.

- **Avec `@session.is_active:false`** : Le filtre de secours n'évalue que les sessions terminées, laissant vos autres filtres capturer les sessions en premier

  | ✅ Recommandé |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-catchall-good-3.png" alt="Exemple de bon filtre de secours : 1. Sessions avec relectures (100 % de rétention), 2. Sessions durant plus de 5 secondes (100 % de rétention), 3. Sessions qui ne sont pas actives (10 % de rétention). Cela garantit que les autres filtres ont la priorité pour capturer les sessions." style="width:100%" >}} |
  
- **Sans `@session.is_active:false`** : Le filtre de secours capture immédiatement toutes les sessions, remplaçant potentiellement vos filtres plus spécifiques

  | ❌ Non recommandé |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-catchall-bad-3.png" alt="Exemple de mauvais filtre de secours : 1. Sessions avec relectures (100 % de rétention), 2. Sessions durant plus de 5 secondes (100 % de rétention), 3. Toutes les sessions (10 % de rétention). Cela risque de remplacer des filtres plus spécifiques en capturant immédiatement toutes les sessions." style="width:100%" >}} |

### Exclusion de sessions {#excluding-sessions}

Pour éviter qu'un seul filtre ne corresponde à un sous-ensemble d'événements, ajoutez l'exclusion dans la requête de ce filtre. Voir [Exclure des sessions à l'aide de filtres de rétention][3].

Pour exclure des événements sur l'ensemble de vos filtres de rétention personnalisés à la fois, sans répéter la même exclusion dans chaque requête, utilisez plutôt des [filtres d'exclusion][4].

## Filtres de rétention suggérés et cas d'utilisation {#suggested-retention-filters-and-use-cases}
Nous décrivons ci-dessous l'ensemble des filtres par défaut, les filtres suggérés et leurs cas d'utilisation typiques.

| Type de filtre | Exemple de requête | Quand utiliser | Taux de rétention |
|-------------|---------------|-------------|----------------|
| Sessions avec relectures | `@session.has_replay:true` | Conservez les sessions avec une relecture pour vous assurer que le système ne supprime aucune session pour laquelle des relectures de session sont disponibles. | 100 % |
| Sessions avec erreurs | `@type:error` | Un filtre par défaut qui peut être appliqué pour conserver toutes les sessions contenant au moins 1 erreur. | 100 % |
| Sessions avec plantages | `@type:error @error.is_crash:true` | Un filtre qui peut être appliqué pour conserver toutes les sessions qui se sont terminées par un plantage. | 100 % |
| Sessions | `@type:session` | Un filtre par défaut, placé en dernier dans la liste, à appliquer à toutes les sessions, qui vous permet d'en conserver ou d'en supprimer un pourcentage. | Variable |
| Versions de l'application | `@type:session version:v1.1.0-beta` | Le filtrage par version d'application (bêta, alpha ou version spécifique) garantit que toutes les sessions d'une version particulière sont enregistrées pour une analyse détaillée et un dépannage. | 100 % |
| Environnements | `@type:session environment:stage` | Lors de la collecte de sessions à partir de divers types de versions ou environnements, assurez-vous de capturer au moins 100 % des sessions des environnements de staging, tout en collectant un pourcentage plus faible des environnements de développement/test. | 100 % |
| Feature flags | `@type:session feature_flags.checkout_type:treatment_v1` | Si vous utilisez déjà des Feature Flags, vous pouvez choisir de conserver 100 % des sessions avec des traitements de Feature Flags spécifiques. | 100 % |
| Attributs personnalisés | `@type:session @context.cartValue:>=500` | Créez des filtres en utilisant presque n'importe quelle requête, y compris des attributs de session personnalisés, pour spécifier des critères de rétention. Par exemple, dans l'application de démonstration Datadog Shopist, la valeur du panier est un attribut de session personnalisé. Cela permet la rétention des sessions avec des valeurs de panier élevées, facilitant ainsi le dépannage efficace des problèmes ayant un impact sur les revenus. | Variable |
| Session avec des attributs utilisateur | `@type:session user.tier:paid` | Utilisez les informations utilisateur d'une session pour créer un filtre. Par exemple, vous pouvez conserver les sessions pour tous vos utilisateurs de niveau payant. | 100 % |
| Sessions avec un utilisateur spécifique | `@type:session user.id:XXXXX` | Ce filtre peut cibler les sessions d'utilisateurs spécifiques, tels qu'un compte de test de production ou un cadre qui teste régulièrement l'application. | 100 % |
| Sessions avec une action spécifique | `@type:action @action.name:XXXXX` | Vous pouvez conserver toutes les sessions comportant une action spécifique que le SDK suit automatiquement par défaut ou une action personnalisée que vous avez instrumentée dans votre code. | 100 % |
| Sessions avec une durée spécifique | `@session.view.count :> 3 OR @session.time_spent :> 15000000000` | Si vous remarquez de nombreuses sessions courtes, comme un utilisateur consultant une page pendant 10 secondes sans autre action ni erreur, elles ne sont généralement pas utiles. Vous pouvez utiliser un filtre de rétention par durée pour réduire ces sessions. **Remarque** : Saisissez la valeur de la durée sous forme de nombre en nanosecondes - n'incluez aucune unité (par exemple, utilisez `15000000000` pour 15 secondes). | Variable |
| Sessions avec une erreur réseau 4XX et 5XX | `@type:resource @resource.status_code:>=400` | Les applications frontend rencontrent souvent des problèmes avec des services en aval renvoyant des codes d'état 4XX ou 5XX. En utilisant ce filtre, vous pouvez capturer toutes les sessions avec des appels de ressources qui aboutissent à des codes d'erreur. | 100 % |


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[2]: /fr/real_user_monitoring/rum_without_limits/retention_filters/#how-it-works
[3]: /fr/real_user_monitoring/rum_without_limits/retention_filters#excluding-events-with-a-filter-query
[4]: /fr/real_user_monitoring/rum_without_limits/retention_filters#exclusion-filters