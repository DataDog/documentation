---
title: Limites de débit
type: api
---

{{< h2 >}}Limites de débit{{< /h2 >}}

De nombreux endpoints d'API ont une limite de débit. Lorsque vous dépassez un certain nombre de requêtes dans un intervalle donné, Datadog renvoie une erreur.

Si vous dépassez la limite de débit, vous recevez un code de réponse 429. Vous pouvez soit patienter pendant la durée correspondant à `X-RateLimit-Period` avant d'effectuer à nouveau des appels, soit effectuer des appels à une fréquence légèrement plus faible que `X-RateLimit-Limit` ou `X-RateLimit-Period`.

Pour revoir à la hausse les limites de débit par défaut, [contactez l'assistance Datadog][1].

Quelques précisions concernant la politique de limitation de débit des API :

- Datadog **n'applique aucune limite de débit** lors de l'envoi de points de données/métriques (consultez la [section relative aux métriques][2] pour en savoir plus sur le traitement du débit d'envoi des métriques). Les limites appliquées dépendent de la quantité de [métriques custom][3] prévue dans votre contrat.
- L'API utilisée pour envoyer des logs n'a pas de limite de débit.
- Le taux limite de soumission d'événements est de `250,000` événements par minute et par organisation.
- Les limites de débit varient selon les endpoints et sont précisées dans les en-têtes détaillés ci-dessous. Il est possible d'augmenter ces limites sur demande.

<div class="alert alert-danger">
La liste ci-dessus ne répertorie pas toutes les limites de débit applicables aux API Datadog. Si votre débit est limité, contactez l'<a href="https://www.datadoghq.com/support/">assistance</a> pour en savoir plus sur l'API que vous utilisez et sur ses limites.</div>

| En-têtes de limites de débit      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | Nombre de requêtes autorisées sur une période donnée             |
| `X-RateLimit-Period`    | Durée en secondes pour les réinitialisations (alignées sur le calendrier) |
| `X-RateLimit-Remaining` | Nombre de requêtes autorisées restantes pour la période en cours  |
| `X-RateLimit-Reset`     | Délai en secondes avant la prochaine réinitialisation                        |
| `X-RateLimit-Name`      | nom de la limite de débit pour les requêtes d'augmentation.            |

### Métriques d'utilisation des API Datadog

Toutes les API Datadog ont une limite d'utilisation sur une période donnée. Chaque API peut avoir son propre compartiment de limitation de débit ou partager un compartiment commun selon les ressources sollicitées. Par exemple, l'API de statut des monitors dispose d'une limite qui restreint le nombre de requêtes par minute effectuées par un humain ou un script automatisé. En cas de dépassement, le point de terminaison (endpoint) renvoie un code 429 et indique d'attendre la fin de la période de réinitialisation. Les métriques d'utilisation de l'API permettent aux utilisateurs Datadog de consulter et auditer eux-mêmes la consommation des limites de débit pour les endpoints d'API (à l'exception des endpoints de soumission de métriques, logs et événements). Ces métriques offrent une visibilité sur les requêtes autorisées et bloquées, avec les dimensions et tags disponibles suivants :

{{% site-region region="us" %}}[Tableau de bord d'utilisation des limites de débit de l'API Datadog](https://app.datadoghq.com/dash/integration/31668/datadog-api-rate-limit-usage){{% /site-region %}} 
{{% site-region region="eu1" %}}[Tableau de bord d'utilisation des limites de débit de l'API Datadog](https://app.datadoghq.eu/dash/integration/1386/datadog-api-rate-limit-usage){{% /site-region %}} 
{{% site-region region="us3" %}}[Tableau de bord d'utilisation des limites de débit de l'API Datadog](https://us3.datadoghq.com/dash/integration/2248/datadog-api-rate-limit-usage){{% /site-region %}} 
{{% site-region region="us5" %}}[Tableau de bord d'utilisation des limites de débit de l'API Datadog](https://us5.datadoghq.com/dash/integration/1421/datadog-api-rate-limit-usage){{% /site-region %}} 
{{% site-region region="ap1" %}}[Tableau de bord d'utilisation des limites de débit de l'API Datadog](https://ap1.datadoghq.com/dash/integration/2698/datadog-api-rate-limit-usage){{% /site-region %}} 
{{% site-region region="gov" %}}[Tableau de bord d'utilisation des limites de débit de l'API Datadog](https://app.ddog-gov.com/dash/integration/1330/datadog-api-rate-limit-usage){{% /site-region %}}

#### Métriques disponibles

<table>
  <thead>
    <th>Dimension</th>
    <th>Métrique d'utilisation</th>
    <th>Description</th>
    <th>Tags disponibles</th>
  </thead>
  <tr>
    <td rowspan="2"><strong>Organisation</strong></td>
    <td><code>datadog.apis.usage.per_org</code></td>
    <td>Limite de débit globale sur les requêtes vers un endpoint donné pour l'organisation.</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (parent uniquement)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_org_ratio</code></td>
    <td>Ratio entre les requêtes effectuées (par dimensions disponibles) et le total autorisé (<code>limit_count</code>).</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (parent uniquement)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td rowspan="2"><strong>Utilisateur (UUID)</strong></td>
    <td><code>datadog.apis.usage.per_user</code></td>
    <td>Nombre de requêtes effectuées vers un endpoint donné, limité par utilisateur.</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (parent uniquement)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_user_ratio</code></td>
    <td>Ratio entre les requêtes effectuées et le total autorisé (<code>limit_count</code>).</td>
    <td>
    <ul>
      <li><code>app_key_id</code><br /></li>
      <li><code>child_org</code> (parent uniquement)</li>
      <li><code>limit_count</code><br /></li>
      <li><code>limit_name</code><br /></li>
      <li><code>limit_period</code><br /></li>
      <li><code>rate_limit_status</code><br /></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td rowspan="2"><strong>API Key</strong></td>
    <td><code>datadog.apis.usage.per_api_key</code></td>
    <td>Nombre de requêtes effectuées vers un endpoint donné, limité par clé d'API.</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (parent uniquement)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_api_key_ratio</code></td>
    <td>Ratio entre les requêtes effectuées et le total autorisé (<code>limit_count</code>).</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (parent uniquement)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
</table>


#### Clé de tag


| Nom du tag            | Rôle                                                                                                               |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|
| `app_key_id`        | Identifiant de la clé d'application utilisée. Peut valoir `N/A` pour les utilisateurs web, mobiles ou les endpoints publics.                      |
| `child_org`         | Nom de l'organisation fille, si affiché depuis l'organisation parent. Sinon, vaut `N/A`. Ne s'applique qu'au sein d'un même datacenter. |
| `limit_count`       | Nombre de requêtes autorisées pour chaque nom de limite pendant une période donnée.                                             |
| `limit_name`        | Nom de la limite. Plusieurs endpoints peuvent partager le même nom.                                                          |
| `limit_period`      | Durée (en secondes) avant réinitialisation de la consommation.                                           |
| `rate_limit_status` | `passed` : requête autorisée.<br />`blocked` : requête bloquée (limite atteinte).                       |
| `user_uuid`         | UUID de l'utilisateur à l'origine de la requête.                                                                                         |

#### Agrégation dans les widgets

Les visualisations de métriques doivent en général être agrégées à la minute avec sum(60s) pour obtenir le total de requêtes par minute.

Les métriques de ratio sont déjà normalisées par rapport à `limit_period`.

##### Exemples de cas d'utilisation

Requêtes par nom de limite de débit
: Créez un graphique représentant la somme de `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` et `datadog.apis.usage.per_api_key` par `limit_name`<br /><br />
  **Exemple :** `default_zero(sum:datadog.apis.usage.per_org{*} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_user{*} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_api_key{*} by {limit_name})`

Bloquées par nom de limite de débit
: Créez un graphique représentant la somme de `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` et `datadog.apis.usage.per_api_key` par `limit_name` avec `rate_limit_status:blocked`<br /><br />
  **Exemple :** `default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked} by {limit_name})`

Endpoint bloqué par utilisateur
: Créez un graphique représentant la somme de `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` et `datadog.apis.usage.per_api_key` par `user_uuid` avec `rate_limit_status:blocked` et `limit_name:example`<br /><br />
  **Exemple :** `default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked,limit_name:example} by {user_uuid}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked,limit_name:example} by {user_uuid}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked,limit_name:example} by {user_uuid})`

Endpoint bloqué par ID de clé d'application
: Créez un graphique représentant la somme de `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` et `datadog.apis.usage.per_api_key` par `app_key_id` avec `rate_limit_status:blocked` et `limit_name:example`<br /><br />
  **Exemple :** `default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked,limit_name:example} by {app_key_id}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked,limit_name:example} by {app_key_id}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked,limit_name:example} by {app_key_id})`

Ratio des limites de débit utilisées par nom de limite
: Créez un graphique représentant la somme de `datadog.apis.usage.per_org_ratio`, `datadog.apis.usage.per_user_ratio` et `datadog.apis.usage.per_api_key_ratio` par `limit_name`<br /><br />
  **Exemple :** `default_zero(max:datadog.apis.usage.per_org_ratio{*} by {limit_name}) + default_zero(max:datadog.apis.usage.per_user_ratio{*} by {limit_name}) + default_zero(max:datadog.apis.usage.per_api_key_ratio{*} by {limit_name})`


### Augmenter votre limite de débit
Vous pouvez demander une augmentation des limites de débit en créant un ticket d'assistance contenant les informations ci-dessous dans **Help** > **New Support Ticket**. Une fois la demande reçue, l'équipe Support Engineering l'examine au cas par cas et, si nécessaire, collabore avec les équipes d'ingénierie internes pour évaluer la faisabilité de l'augmentation demandée.

    Titre :
        Demande d'augmentation de la limite de débit pour l'endpoint : X

    Détails :
        Nous souhaitons demander une augmentation de la limite de débit pour l'endpoint de l'API : X
        Exemples de cas d'utilisation ou de requêtes :
            Exemple d'appel API sous forme de cURL ou d'URL avec une charge utile d'exemple

        Motivation de la demande d'augmentation :
            Exemple - Notre organisation utilise cet endpoint pour ajuster la taille d'un conteneur avant le déploiement. Ce déploiement a lieu toutes les X heures ou jusqu'à Y fois par jour.

        Limite cible souhaitée :
            Astuce - Avoir en tête une augmentation précise ou un pourcentage d'augmentation souhaité permet à l'équipe Support Engineering de transmettre plus rapidement la demande aux équipes d'ingénierie internes pour examen.

Une fois le cas d'utilisation examiné et approuvé par l'équipe Support de Datadog, l'augmentation de la limite de débit peut être appliquée en arrière-plan. Notez qu'en raison de la nature SaaS de Datadog, il existe une limite maximale à l'augmentation possible. L'équipe Support de Datadog se réserve le droit de refuser une demande d'augmentation selon le cas d'utilisation et les recommandations de l'équipe Engineering.

### Logs d'audit
Les limites d'API et les métriques d'utilisation fournissent des informations sur les schémas d'utilisation et les requêtes bloquées. Si vous avez besoin de détails supplémentaires, Audit Trail offre une visibilité plus fine sur l'activité de l'API.

Avec Audit Trail, vous pouvez consulter des données telles que :
* **Adresse IP et géolocalisation** – Identifiez l'origine des requêtes API.
* **Type d'acteur** – Identifiez s'il s'agit d'un compte de service ou d'un compte utilisateur.
* **Authentification par clé d'API ou par utilisateur** – Vérifiez si les requêtes ont été effectuées via une clé d'API ou directement par un utilisateur.
* **Événements corrélés** – Affichez les autres événements survenus au même moment, comme des modifications de configuration ou des actions liées à la sécurité.

Audit Trail peut aider les équipes à résoudre les problèmes liés aux limites de débit en fournissant davantage de contexte sur la consommation de l'API et les requêtes bloquées. Il permet également de suivre l'utilisation de l'API à l'échelle de l'organisation à des fins de sécurité et de conformité.

Pour une visibilité plus détaillée sur l'activité de l'API, envisagez d'utiliser **[Audit Trail][4]**.


[1]: /fr/help/
[2]: /fr/api/v1/metrics/
[3]: /fr/metrics/custom_metrics/
[4]: /fr/account_management/audit_trail/events/
