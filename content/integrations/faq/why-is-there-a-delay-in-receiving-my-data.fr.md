---
title: Pourquoi y a-t-il un retard dans la réception de mes données?
kind: faq
---

Si vous recevez des métriques toutes les 5 minutes de CloudWatch, la réception de vos métriques peut être retardée d'environ 15 à 20 minutes. C'est parce que CloudWatch rend vos données disponibles avec une latence de 5 à 10 minutes, et que nous exécutons notre bot toutes les 10 minutes.

De plus, les limites de la mise en file d'attente et de l'API CloudWatch peuvent s'élever jusqu'à 5 minutes supplémentaires. Si vous recevez des métriques d'une minute avec CloudWatch, leur délai de disponibilité est d'environ 2 minutes. La latence totale pour afficher vos métriques peut donc être d'environ 12 à 15 minutes.