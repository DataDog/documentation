---
title: Limites de débit
type: apicode
order: 4
external_redirect: /api/#limites-de-debit
---
**En-têtes des limites de débit** :

* `X-RateLimit-Limit` : nombre de requêtes autorisées sur une période donnée
* `X-RateLimit-Period` : durée en secondes pour les réinitialisations (alignées sur le calendrier)
* `X-RateLimit-Remaining` : nombre de requêtes autorisées restantes pour la période en cours
* `X-RateLimit-Reset` : délai en secondes avant la prochaine réinitialisation
