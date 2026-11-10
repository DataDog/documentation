---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/risky-behavior-cloud-environments/
  tag: Blog
  text: Identifiez les comportements à risque dans les environnements cloud
- link: https://learn.datadoghq.com/courses/cloud-siem-detect-investigate-threats
  tag: Centre d'apprentissage
  text: Détectez et enquêtez sur les menaces avec Cloud SIEM
title: Triage et investigation
---
## Présentation {#overview}

Cloud SIEM propose des outils intégrés pour rationaliser les enquêtes de sécurité après la génération d'un signal de sécurité. Ces outils vous guident à travers le workflow d'enquête suivant lorsqu'un signal de sécurité est déclenché :

- Évaluation des menaces
- Compréhension du périmètre
- Détermination de l'impact

Commencez par [Investigate Security Signals][1] pour trier et enquêter sur les signaux à l'aide du Signals Explorer. Filtrez par gravité, entité ou période pour évaluer rapidement ce qui a déclenché les détections et décider quels signaux nécessitent une attention immédiate.

Pour une approche davantage centrée sur les entités, [Entity Risks][2] consolide les signaux SIEM, les résultats de Cloud Security et les risques liés aux identités dans des profils d'entités unifiés représentant des utilisateurs ou des actifs, associés à un modèle de score de risque explicite

Pour obtenir une compréhension globale de la manière dont un acteur se déplace dans votre écosystème, l'interface graphique [Investigator][3] cartographie les connexions entre les entités et les activités au fil du temps.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/investigate_security_signals/
[2]: /fr/security/cloud_siem/entities_and_risk_scoring
[3]: /fr/security/cloud_siem/investigator