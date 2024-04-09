---
title: Limites de débit
type: documentation
---

{{< h2 >}}Limites de débit{{< /h2 >}}

De nombreux endpoints d'API ont une limite de débit. Lorsque vous dépassez un certain nombre de requêtes dans un intervalle donné, Datadog renvoie une erreur.

Si vous dépassez la limite de débit, vous recevez un code de réponse 429. Vous pouvez soit patienter pendant la durée correspondant à `X-RateLimit-Period` avant d'effectuer à nouveau des appels, soit effectuer des appels à une fréquence légèrement plus faible que `X-RateLimit-Limit` ou `X-RateLimit-Period`.

Pour revoir à la hausse les limites de débit par défaut, [contactez l'assistance Datadog][1].

Quelques précisions concernant la politique de limitation de débit des API :

- Datadog **n'applique aucune limite de débit** lors de l'envoi de points de données/métriques (consultez la [section relative aux métriques][2] pour en savoir plus sur le traitement du débit d'envoi des métriques). Les limites appliquées dépendent de la quantité de [métriques custom][3] prévue dans votre contrat.
- L'API utilisée pour envoyer des logs n'a pas de limite de débit.
- La limite de débit pour l'envoi de métriques est fixée à `500 000` événements par heure et par organisation.
- Les limites de débit varient selon les endpoints et sont précisées dans les en-têtes détaillés ci-dessous. Il est possible d'augmenter ces limites sur demande.

<div class="alert alert-warning">
La liste ci-dessus ne répertorie pas toutes les limites de débit applicables aux API Datadog. Si votre débit est limité, contactez l'<a href="https://www.datadoghq.com/support/">assistance</a> pour en savoir plus sur l'API que vous utilisez et sur ses limites.</div>

| En-têtes de limites de débit      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | Nombre de requêtes autorisées sur une période donnée             |
| `X-RateLimit-Period`    | Durée en secondes pour les réinitialisations (alignées sur le calendrier) |
| `X-RateLimit-Remaining` | Nombre de requêtes autorisées restantes pour la période en cours  |
| `X-RateLimit-Reset`     | Délai en secondes avant la prochaine réinitialisation                        |
| `X-RateLimit-Name`      | Nom de la limite de débit pour les demandes d'augmentation             |

[1]: /fr/help/
[2]: /fr/api/v1/metrics/
[3]: /fr/metrics/custom_metrics/