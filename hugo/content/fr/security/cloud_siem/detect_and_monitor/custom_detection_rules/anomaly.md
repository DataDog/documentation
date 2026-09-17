---
description: Découvrez comment fonctionne la méthode de détection d'anomalies.
disable_toc: false
title: Anomalies
---
## Présentation {#overview}

La détection d'anomalies analyse les logs pour identifier les pics anormaux dans votre volume de logs, ce qui pourrait indiquer des problèmes tels qu'une attaque, une mauvaise configuration ou un processus incontrôlé.

Consultez [Create Rule][1] pour obtenir des instructions sur la façon de configurer une règle de détection d'anomalies.

## Comment fonctionne la détection d'anomalies {#how-anomaly-detection-works}

La règle de détection d'anomalies :

- Agrège les journaux entrants dans des compartiments temporels et calcule une base de référence.
    - La limite supérieure reflète le 99,5e percentile de votre historique récent, en utilisant jusqu'à 2 semaines de journaux historiques.
- Vérifie à chaque évaluation la fenêtre d'évaluation la plus récente et mesure dans quelle mesure la série dépasse cette limite.
    - Un signal est déclenché si l'excès est suffisamment important sur l'ensemble de la fenêtre.

La méthode de détection d'anomalies s'adapte à vos modèles normaux et réduit le bruit lié aux fluctuations habituelles.

**Remarque** : La méthode de détection d'anomalies détecte uniquement les pics. Elle n'alerte pas en cas de baisse du volume de logs.

### Saisonnalité et période d'apprentissage {#seasonality-and-learning-period}

L'algorithme prend automatiquement en compte la saisonnalité quotidienne et hebdomadaire afin que les pics réguliers, tels que les augmentations de fin de semaine, ne déclenchent pas d'alerte.

Une courte période d'apprentissage est appliquée pour les nouvelles règles ou les valeurs nouvellement observées pour un `group by`. Pendant la période d'apprentissage, les données sont collectées pour établir une base de référence.

## Bonnes pratiques {#best-practices}

- Définissez la requête de manière précise. Filtrez par service, environnement, équipe ou endpoint pour réduire le bruit.
- Commencez par des règles par défaut gérées pour une couverture étendue, puis ajoutez des règles de détection d'anomalies personnalisées pour les sources de logs à haut volume.

[1]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=anomaly