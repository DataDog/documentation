---
title: Rate limiting
type: apicode
order: 4
external_redirect: /api/#rate-limiting
---
**Headers de Rate Limit**:

* `X-RateLimit-Limit` Nombre de requêtes autorisées sur une période donnée
* `X-RateLimit-Period` durée en secondes pour les réinitialisations (alignées sur le calendrier)
* `X-RateLimit-Remaining` nombre de requêtes autorisées restantes pour la période en cours
* `X-RateLimit-Reset` temps en secondes jusqu'à la prochaine réinitialisation

