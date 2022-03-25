---
title: Limites de débit
type: api
---
{{< h2 >}}Limites de débit{{< /h2 >}}

Tous les endpoints d'API ont une limite de débit. Lorsque vous dépassez un certain nombre de requêtes dans un intervalle donné, Datadog renvoie une erreur.

Si vous dépassez la limite de débit, vous recevez un code de réponse 429. Datadog vous recommande de patienter pendant la durée correspondant à `X-RateLimit-Period` avant d'effectuer à nouveau des appels. Vous pouvez également effectuer des appels à une fréquence légèrement plus faible que le résultat du calcul `X-RateLimit-Limit` / `X-RateLimit-Period`.

Pour revoir à la hausse les limites de débit par défaut, [contactez l'assistance Datadog][1].

Quelques précisions concernant la politique de limitation de débit des API :

- Datadog **n'applique aucune limite de débit** lors de l'envoi de points de données/métriques (consultez la [section relative aux métriques][2] pour en savoir plus sur le traitement du débit d'envoi des métriques). Les limites appliquées dépendent de la quantité de [métriques custom][3] prévue dans votre contrat.
- La limite de débit pour la **récupération** de métriques est fixée à `100` métriques par heure et par organisation.
- La limite de débit pour l'envoi de métriques est fixée à `500 000` événements par heure et par organisation.
- La limite de débit pour l'agrégation d'événements est fixée à `1 000` événements par agrégat, par jour et par organisation. Un agrégat désigne un groupe d'événements similaires.
- La limite de débit pour les appels de l'[API permettant d'interroger une série temporelle][4] est fixée à `1 600` appels par heure et par organisation. Cette limite peut être augmentée sur demande.
- La limite de débit pour les appels de l'[API permettant d'interroger des logs][5] est de `300` par heure et par organisation. Cette limite peut être augmentée sur demande.
- La limite de débit pour les appels de l'[API permettant de représenté un snapshot][6] est de `60` par heure et par organisation. Cette limite peut être augmentée sur demande.
- La limite de débit pour les appels de l'[API permettant de configurer des logs][7] est de `6000` par minute et par organisation. Cette limite peut être augmentée sur demande.

| En-têtes de limites de débit      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | Nombre de requêtes autorisées sur une période donnée             |
| `X-RateLimit-Period`    | Durée en secondes pour les réinitialisations (alignées sur le calendrier) |
| `X-RateLimit-Remaining` | Nombre de requêtes autorisées restantes pour la période en cours  |
| `X-RateLimit-Reset`     | Délai en secondes avant la prochaine réinitialisation                        |

[1]: /fr/help/
[2]: /fr/api/v1/metrics/
[3]: /fr/metrics/custom_metrics/
[4]: /fr/api/v1/metrics/#query-timeseries-points
[5]: /fr/api/v1/logs/#get-a-list-of-logs
[6]: /fr/api/v1/snapshots/
[7]: /fr/api/v1/logs-indexes/