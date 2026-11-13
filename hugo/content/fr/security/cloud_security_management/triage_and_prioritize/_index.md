---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
  tag: Documentation
  text: Moteur de priorisation à l'exécution
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: Documentation
  text: Score de sévérité
- link: /security/security_inbox/
  tag: Documentation
  text: Examiner les résultats priorisés dans la boîte de réception Security
title: Trier et prioriser
---
Cloud Security génère des résultats concernant les vulnérabilités, les erreurs de configuration et les risques liés à l'identité. Le tri et la priorisation couvrent deux capacités connexes : d'une part, le moteur qui identifie les résultats exposant vos ressources critiques pour l'entreprise, et d'autre part, le cadre de notation qui traduit ce jugement en un score de gravité par résultat, sur lequel vous pouvez trier, filtrer et router.

## Moteur de priorisation à l'exécution {#runtime-prioritization-engine}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Moteur de priorisation à l'exécution n'est pas disponible sur le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Le [Moteur de priorisation à l'exécution][1] combine l'observabilité à l'exécution et les données de sécurité pour identifier les ~5 % de résultats exposant réellement vos ressources critiques pour l'entreprise. Il évalue chaque résultat selon cinq dimensions : l'accessibilité, l'exposition, l'exploitabilité, la criticité pour l'entreprise et l'actionnabilité.

## Score de gravité {#severity-scoring}

Le [Score de gravité][2] transforme les résultats du Moteur de priorisation à l'exécution en un Datadog Severity Score pour chaque résultat. Pour les vulnérabilités, il suit l'algorithme [CVSS 4.0][3], en enrichissant le score de base avec des facteurs temporels (tels que les exploits actifs ou la probabilité d'exploitation) et des facteurs environnementaux (tels que le contexte d'exécution, l'exposition ou la criticité de la ressource affectée). Pour les erreurs de configuration et les risques liés à l'identité, il calcule la gravité à l'aide d'une matrice probabilité × impact qui pèse la manière dont un adversaire pourrait exploiter le résultat par rapport aux dommages que cette exploitation causerait.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[2]: /fr/security/cloud_security_management/triage_and_prioritize/severity_scoring/
[3]: https://www.first.org/cvss/v4-0/