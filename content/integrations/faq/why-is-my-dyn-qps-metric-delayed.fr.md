---
title: Pourquoi la métrique dyn.qps est-elle retardée?
kind: faq
---

Utilisez [l'intégration Dyn de Datadog](/integrations/dyn) pour visualiser et monitorer le nombre de requêtes DNS effectuées par seconde et le nombre de changements de zone.

Vous remarquerez, cependant, que la métrique dyn.qps apparaît uniquement dans votre compte Datadog environ 90 minutes après l'heure actuelle. Ceci est un comportement prévu, car Dyn ne rend actuellement ses données disponibles pour la collecte que ~ 90 minutes après l'heure actuelle.