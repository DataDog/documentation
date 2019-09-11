---
title: Limites de débit
type: apicontent
order: 4
external_redirect: '/api/#limites-de-debit'
---
## Limites de débit
Certains endpoints de l'API ont une limite de débit. Lorsque vous dépassez un certain nombre de requêtes dans une certaine période, nous renvoyons une erreur.

Pour les endpoints API à débit limité, nous renvoyons les en-têtes afin que vous puissiez vérifier où vous vous situez par rapport à votre limite. Si vous dépassez votre limite, consultez ces en-têtes pour déterminer à quel moment vous pourrez renvoyer ces données.

Les limites de débit peuvent être augmentées par rapport aux valeurs par défaut en [contactant l'assistance Datadog][1].

À propos de la politique sur les limites de débit de l'API :

* Datadog **n'applique pas de limites de débit** lors de l'envoi de points de données/métriques (consultez la [section sur les métriques][2] pour en savoir plus sur le traitement du débit d'envoi de métrique). Les limites appliquées dépendent de la quantité de [métriques custom][3] incluses dans votre abonnement.
* La limite de débit pour la **récupération** de métriques est de `100` par heure et par organisation.
* La limite de débit pour l'envoi d'événements est de `1000` par agrégat, par jour et par organisation. Un agrégat désigne un groupe d'événements similaires.
* La limite de débit pour les appels [query_batch API][4] et [Log Query API][5] est de `300` par heure et par organisation. Elle peut être augmentée sur demande.
* La limite de débit pour l'appel [graph_snapshot API][6] est de `60` par heure et par organisation. Elle peut être augmentée sur demande.
* La limite de débit pour [Log Configuration API][7] est de `6000` par minute et par organisation. Elle peut être augmentée sur demande.

[1]: /fr/help
[2]: /fr/api/#metrics
[3]: /fr/developers/metrics/custom_metrics
[4]: /fr/api/#query-timeseries-points
[5]: /fr/api/?lang=bash#get-a-list-of-logs
[6]: /fr/api/#graphs
[7]: /fr/api/?lang=bash#logs