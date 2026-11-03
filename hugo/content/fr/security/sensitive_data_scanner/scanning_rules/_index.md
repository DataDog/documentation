---
aliases:
- /fr/sensitive_data_scanner/scanning_rules
description: Comprenez comment Sensitive Data Scanner utilise des règles d'analyse
  pour faire correspondre les données sensibles, y compris les règles de bibliothèque
  prédéfinies et les règles regex personnalisées pour les données de télémétrie et
  le stockage cloud.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Détectez les noms de personnes dans les logs grâce au ML dans Sensitive Data
    Scanner.
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Identifiez et hiérarchisez visuellement les risques de sécurité à l'aide de
    Cloudcraft
title: Règles d'analyse des données sensibles
---
## Données de télémétrie {#telemetry-data}
Sensitive Data Scanner pour les données de télémétrie utilise des règles d'analyse pour déterminer quelles informations sensibles faire correspondre au sein des données. Ces données peuvent provenir de vos logs d'application, de vos spans APM, de vos événements RUM et d’Event Management. Vous pouvez utiliser la [bibliothèque de règles d'analyse][1] de Datadog pour créer des règles ou vous pouvez créer des [règles personnalisées][2].

La bibliothèque de règles d'analyse de Datadog contient des règles d'analyse prédéfinies qui détectent les modèles courants, tels que les adresses e-mail, les numéros de carte de crédit, les clés d'API, les jetons d'autorisation, les informations réseau et sur les appareils, et plus encore. Consultez [Library Rules][1] pour plus d'informations.

Vous pouvez également créer des règles d'analyse personnalisées à l'aide de modèles d'expression régulière (regex) pour définir les informations sensibles que vous souhaitez faire correspondre. Consultez [Custom Rules][2] pour plus d'informations.

## Stockage cloud {#cloud-storage}

Sensitive Data Scanner pour le stockage cloud utilise également des règles d'analyse pour déterminer quelles informations sensibles faire correspondre au sein des données. Toutes les règles de la bibliothèque d'analyse Datadog sont appliquées et ne peuvent pas être modifiées. Consultez [Library Rules][1] pour plus d'informations.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/
[2]: /fr/security/sensitive_data_scanner/scanning_rules/custom_rules/