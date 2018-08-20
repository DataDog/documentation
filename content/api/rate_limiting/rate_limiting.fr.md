---
title: Limite de débit
type: apicontent
order: 4
external_redirect: /api/#rate-limiting
---
## Rate limiting
Certains endpoints d'API ont un débit limité. Une fois que vous dépassez un certain nombre de requêtes dans un certain laps de temps, nous retournons une erreur.

Pour les endpoints API à débit limité, nous renvoyons les entêtes afin que vous puissiez savoir à quel point vous êtes proche de votre limite. Si vous dépassez votre limite, consultez ces entêtes pour déterminer quand vous pouvez réessayez.

Les limites de débit peuvent être augmentées par rapport à leur défauts en [contactent l'équipe de support Datadog][1].

Voici quelques informations concernant notre politique de limite de débit API :

* **Nous n'appliquons pas de rate-limite** sur les envois de points de donnée/métriques (consultez la [section métrique](/api/#metrics) pour avoir plus d'information sur comment l'envoi de métrique est géré du coté de Datadog) - La seule limite que vous pourriez rencontrer est la limite de quantité de [métriques custom][2] basée sur [votre contrat][3].
* La limite de débit pour la transmission des évènements est fixée à 1000 par agrégat par jour par organisation. Une agrégat est un groupe d'évènements similaires.
* La limite de débit pour l'appel [query_batch API][4] est de 300 par heure par organisation. La limite peut être agrandi sur demande.
* La limite de débit pour l'appel [query_snapshot API][5] est de 60 par heure par organisation. La limite peut être agrandi sur demande.

[1]: /help
[2]: /developers/metrics/custom_metrics/
[3]: /developers/metrics/custom_metrics
[4]: /api/#query-time-series-points
[5]: /api/#graphs
