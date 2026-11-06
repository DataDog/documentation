---
title: Limites de débit
type: api
---
{{< h2-with-copy-btn >}}Limites de débit{{< /h2-with-copy-btn >}}

De nombreux endpoints d'API sont soumis à une limitation de débit. Une fois que vous dépassez un certain nombre de requêtes sur une période donnée, Datadog renvoie une erreur.

Si vous êtes soumis à une limitation de débit, vous pouvez voir un code 429 dans le code de réponse. Vous pouvez soit attendre le temps désigné par le `X-RateLimit-Period` avant d'effectuer à nouveau des appels, soit passer à une fréquence d'appels légèrement supérieure au `X-RateLimit-Limit` ou au `X-RateLimit-Period`.

Pour revoir à la hausse les limites de débit par défaut, [contactez l'assistance Datadog][1].

Quelques précisions concernant la politique de limitation de débit des API :

- Datadog **n'applique pas de limitation de débit** sur la soumission de points de données/métriques (voir la [section métriques][2] pour plus d'informations sur la façon dont le taux de soumission des métriques est géré). Les limites rencontrées dépendent de la quantité de [Custom Metrics][3] en fonction de votre contrat.
- L'API d'envoi de logs n'est pas soumise à une limitation de débit.
- La limite de débit pour la soumission d'événements est de `250,000` événements par minute et par organisation.
- Les limites de débit pour les endpoints varient et sont incluses dans les en-têtes détaillés ci-dessous. Celles-ci peuvent être étendues sur demande.

<div class="alert alert-danger">
La liste ci-dessus n'est pas exhaustive de toutes les limitations de débit sur les Datadog API. Si vous faites l'objet d'une limitation de débit, contactez le <a href="https://www.datadoghq.com/support/">support</a> pour plus d'informations sur les API que vous utilisez et leurs limites.</div>

| En-têtes de limitation de débit      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | nombre de requêtes autorisées sur une période donnée.             |
| `X-RateLimit-Period`    | durée en secondes avant la réinitialisation (alignée sur le calendrier). |
| `X-RateLimit-Remaining` | nombre de requêtes autorisées restantes dans la période en cours.  |
| `X-RateLimit-Reset`     | temps en secondes jusqu'à la prochaine réinitialisation.                        |
| `X-RateLimit-Name`      | nom de la limitation de débit pour les demandes d'augmentation.            |

### Métriques d'utilisation de Datadog API{#datadog-api-usage-metrics}

Toutes les Datadog API ont une limite d'utilisation pour une période donnée. Les API peuvent avoir des compartiments de limite de débit uniques et distincts ou être regroupées dans un seul compartiment selon la ou les ressources utilisées. Par exemple, l'API de statut de monitor a une limite de débit qui permet à un humain ou à un script d'automatisation d'interroger seulement un certain nombre de fois par minute. L'endpoint rejette les requêtes excédentaires avec un code de réponse 429 et une indication de patienter jusqu'à l'expiration d'une période de réinitialisation. Les métriques d'utilisation de l'API permettent aux utilisateurs de Datadog d'effectuer eux-mêmes le suivi et l'audit de la consommation de la limite de débit de l'API pour les endpoints d'API (à l'exclusion des endpoints de soumission de métriques, de logs et d'événements). Utilisez le dashboard, les métriques et les étiquettes suivants pour voir les requêtes autorisées et bloquées.

Consultez le [dashboard de visibilité de la limite de débit de Datadog API][5] pour une vue préconfigurée de ces métriques. Sélectionnez votre site Datadog dans le sélecteur de site sur cette page avant d'ouvrir le dashboard.

#### Métriques de visibilité de la limite de débit {#rate-limit-visibility-metrics}

Les métriques de visibilité de la limite de débit utilisent l'espace de nom `datadog.apis.rate_limit.usage.*`. Le nom de la métrique identifie la portée de la limite de débit configurée :

| Portée | Requêtes autorisées | Requêtes bloquées | Utilisation |
|-------|------------------|------------------|-------------|
| Organisation | `datadog.apis.rate_limit.usage.per_org_count` | `datadog.apis.rate_limit.usage.per_org_blocked_count` | `datadog.apis.rate_limit.usage.per_org_pct` |
| Utilisateur | `datadog.apis.rate_limit.usage.per_user_count` | `datadog.apis.rate_limit.usage.per_user_blocked_count` | `datadog.apis.rate_limit.usage.per_user_pct` |
| Clé d'API | `datadog.apis.rate_limit.usage.per_api_key_count` | `datadog.apis.rate_limit.usage.per_api_key_blocked_count` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

Les métriques de requêtes autorisées comptent les requêtes que l'API a autorisées. Les métriques de requêtes bloquées comptent les requêtes que l'API a rejetées car elles dépassaient une limite de débit. Les métriques `*_pct` rapportent le nombre total de tentatives de requêtes (autorisées plus bloquées) en pourcentage de la limite configurée, où `100` représente une utilisation complète. Les valeurs supérieures à `100` indiquent que des requêtes ont été bloquées car la limite a été dépassée.

Pour les widgets du dashboard, utilisez un cumul `sum(60s)` à la minute pour les métriques de requêtes autorisées et bloquées afin d'afficher les requêtes par minute. Utilisez la valeur `*_pct` maximale pour l'intervalle afin d'afficher l'utilisation maximale. Entourez chaque terme de `default_zero()` lors de la combinaison de métriques avec `+`, comme indiqué dans les exemples de requête ci-dessous.

Les jauges suivantes indiquent la limite de requêtes configurée pour chaque nom de limite de débit. Le nom de la métrique identifie la portée :

| Portée | Limite de requêtes configurée |
|-------|--------------------------|
| Organisation | `datadog.apis.rate_limit.usage.per_org_limit_count` |
| Utilisateur | `datadog.apis.rate_limit.usage.per_user_limit_count` |
| Clé d'API | `datadog.apis.rate_limit.usage.per_api_key_limit_count` |

##### Tags disponibles {#available-tags}

| Nom du tag | Description | Disponibilité |
|----------|-------------|--------------|
| `app_key_id` | ID de clé d'application associé à la requête. Le tag est présent avec une valeur vide lorsque la requête n'utilise pas de clé d'application. | Métriques de comptage, de comptage bloqué et d'utilisation |
| `child_org_name` | Nom d'affichage de l'organisation enfant représentée par une métrique copiée. | Toutes les métriques avec `org_scope:child_org` |
| `limit_name` | Nom de la limite de débit. Différents endpoints peuvent partager le même nom. | Toutes les métriques |
| `org_scope` | Relation entre la métrique et l'organisation qui la consulte: `current_org` pour le propre trafic de cette organisation ou `child_org` pour une copie d'organisation enfant visible depuis son organisation racine. | Toutes les métriques |
| `user_uuid` | UUID de l'utilisateur associé à la requête. | Métriques de comptage, de comptage bloqué et d'utilisation |

Lorsque vous consultez les métriques d'une organisation enfant, ses propres métriques utilisent `org_scope:current_org`. La valeur `org_scope:child_org` et la balise `child_org_name` apparaissent uniquement sur les copies supplémentaires envoyées à l'organisation racine.

##### Exemples de requêtes {#query-examples}

Requêtes autorisées par nom de limite de débit
: Représentez graphiquement la somme des trois métriques `*_count` par `limit_name`.<br /><br />
  **Exemple :** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_count{*} by {limit_name})`

Requêtes bloquées par nom de limite de débit
: Représentez graphiquement la somme des trois métriques `*_blocked_count` par `limit_name`.<br /><br />
  **Exemple :** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_blocked_count{*} by {limit_name})`

#### Migrer depuis les métriques d'utilisation héritées {#migrate-from-legacy-usage-metrics}

Les métriques `datadog.apis.rate_limit.usage.*` remplacent les métriques `datadog.apis.usage.*`. Mettez à jour les dashboards et les monitors avec les remplacements suivants. Les requêtes sur les métriques héritées `datadog.apis.usage.*` qui n'étaient pas filtrées par `rate_limit_status` comptaient les requêtes autorisées et bloquées ensemble ; pour préserver ce total, ajoutez la métrique `*_blocked_count` correspondante aux côtés du remplacement `*_count`.

| Métrique héritée | Métrique de remplacement |
|---------------|--------------------|
| `datadog.apis.usage.per_org` | `datadog.apis.rate_limit.usage.per_org_count` |
| `datadog.apis.usage.per_org_ratio` | `datadog.apis.rate_limit.usage.per_org_pct` |
| `datadog.apis.usage.per_user` | `datadog.apis.rate_limit.usage.per_user_count` |
| `datadog.apis.usage.per_user_ratio` | `datadog.apis.rate_limit.usage.per_user_pct` |
| `datadog.apis.usage.per_api_key` | `datadog.apis.rate_limit.usage.per_api_key_count` |
| `datadog.apis.usage.per_api_key_ratio` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

Les métriques de remplacement diffèrent des métriques héritées de la manière suivante :

- Les requêtes autorisées et bloquées utilisent des métriques distinctes au lieu de la balise `rate_limit_status`. Remplacez les filtres de statut hérités par la métrique de requête autorisée ou de requête bloquée correspondante. Les métriques d'utilisation combinent les requêtes autorisées et bloquées.
- Les balises `org_scope` et `child_org_name` remplacent la balise héritée `child_org`. Depuis l'organisation racine, filtrez sur `org_scope:child_org` et utilisez `child_org_name` pour filtrer ou regrouper par le nom d'affichage de l'enfant. Utilisez `org_scope:current_org` pour le trafic propre à l'organisation qui effectue la consultation.
- Les balises `limit_count` et `limit_period` ne sont pas incluses. Utilisez la jauge `*_limit_count` correspondante pour la limite de requêtes configurée. Lisez la période de limitation de débit dans l'en-tête de réponse `X-RateLimit-Period`.

### Augmentez votre limite de débit {#increase-your-rate-limit}
Vous pouvez demander une augmentation des limites de débit en créant un ticket de support avec les détails ci-dessous sous **Aide** > **Nouveau ticket de support**. Dès réception d'une demande d'augmentation de limite de débit, notre équipe d'ingénierie de support examine la demande au cas par cas et, si nécessaire, collabore avec les ressources d'ingénierie internes pour confirmer la viabilité de la demande d'augmentation de la limite de débit.

    Title:
        Request to increase rate limit on endpoint: X

    Details:
        We would like to request a rate limit increase for API endpoint: X
        Example use cases/queries:
            Example API call as cURL or as URL with example payload

        Motivation for increasing rate limit:
            Example - Our organization uses this endpoint to right size a container before we deploy. This deployment takes place every X hours or up to Y times per day.

        Desired target rate limit:
            Tip - Having a specific limit increase or percentage increase in mind helps Support Engineering expedite the request to internal Engineering teams for review.

Une fois que le support Datadog a examiné et approuvé le cas d'utilisation, il peut appliquer l'augmentation de la limite de débit en arrière-plan. Veuillez noter qu'il existe une limite maximale à l'augmentation de la limite de débit en raison de la nature SaaS de Datadog. Le support Datadog se réserve le droit de refuser les augmentations de limite de débit en fonction des cas d'utilisation et des recommandations de l'équipe d'ingénierie.

### Logs d'audit {#audit-logs}
Les métriques de limite et d'utilisation de l'API offrent un aperçu des modèles d'utilisation et des requêtes bloquées. Si vous avez besoin de détails supplémentaires, Audit Trail offre une visibilité plus granulaire sur l'activité de l'API.

Avec Audit Trail, vous pouvez consulter des données telles que :
* **Adresse IP et géolocalisation** – Identifiez l'origine des requêtes API.
* **Type d'acteur** – Faites la distinction entre les comptes de service et les comptes utilisateur.
* **Authentification par clé d'API ou clé d'application** – Vérifiez si les requêtes ont été effectuées via une clé d'API ou directement par un utilisateur.
* **Événements corrélés** – Affichez d'autres événements survenant au même moment, tels que des modifications de configuration ou des actions liées à la sécurité.

Audit Trail peut aider les équipes à résoudre les problèmes de limite de débit en fournissant davantage de contexte sur la consommation de l'API et les requêtes bloquées. Il permet également de suivre l'utilisation de l'API au sein d'une organisation à des fins de sécurité et de conformité.

Pour une visibilité plus détaillée sur l'activité de l'API, envisagez d'utiliser **[Audit Trail][4]**.


[1]: /fr/help/
[2]: /fr/api/v1/metrics/
[3]: /fr/metrics/custom_metrics/
[4]: /fr/account_management/audit_trail/events/
[5]: https://app.datadoghq.com/dash/integration/datadog_api_rate_limit_visibility