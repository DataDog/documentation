---
aliases:
- /fr/monitors/faq/why-did-my-monitor-settings-change-not-take-effect
kind: guide
title: Surveiller les modifications de paramètres non appliquées
---

L'interface Datadog continue à afficher les groupes de monitors pendant 24 heures (48 heures pour les monitors de host) tant que la requête n'est pas modifiée. Si vous n'avez pas activé les paramètres d'alerte *No Data* et que le groupe associé à un monitor de métrique cesse de transmettre des données, le groupe restera visible sur la page de statut du monitor jusqu'à son expiration. Il cessera toutefois d'être évalué après une brève absence de données (la durée précise dépend de vos paramètres).

En revanche, pour les monitors d'événement, Datadog continue d'évaluer les groupes pendant au moins 24 heures. Cela signifie que si un monitor est mis à jour et que les groupes sont modifiés dans la requête, certains anciens groupes risquent de continuer à exister. Si vous devez modifier les paramètres de groupe pour votre monitor d'événement, nous vous conseillons de dupliquer le monitor ou d'en créer un autre avec vos nouveaux groupes. Vous pouvez également les mettre en sourdine si vous souhaitez conserver le monitor mais ne pas être dérangé par les alertes générées suite à vos modifications.