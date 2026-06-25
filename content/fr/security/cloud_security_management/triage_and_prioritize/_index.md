---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
  tag: Documentation
  text: Moteur de priorisation en temps réel
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: Documentation
  text: Score de sévérité
- link: /security/security_inbox/
  tag: Documentation
  text: Examinez les résultats priorisés dans la boîte de réception de sécurité
title: Triage et Priorisation
---
Cloud Security génère des résultats concernant les vulnérabilités, les erreurs de configuration et les risques d'identité. Le Triage et la Priorisation couvrent deux capacités liées : le moteur qui identifie les résultats exposant vos ressources critiques pour l'entreprise, et le cadre de notation qui traduit ce jugement en un score de gravité par résultat que vous pouvez trier, filtrer et acheminer.

## Runtime Prioritization Engine {#runtime-prioritization-engine}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Runtime Prioritization Engine n'est pas disponible sur le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="Rejoignez la Preview !">}}
Runtime Prioritization Engine est en Preview pour Cloud Security Vulnerabilities. Utilisez ce formulaire pour demander l'accès.
{{< /callout >}}

Le [Runtime Prioritization Engine][1] combine la runtime observability et les données de sécurité pour identifier les ~5 % de résultats exposant réellement vos ressources critiques pour l'entreprise. Il évalue chaque résultat selon cinq dimensions : reachability, exposure, exploitability, business criticality et actionability.

## Severity Scoring {#severity-scoring}

[Severity Scoring][2] transforme l'output du Runtime Prioritization Engine en un Datadog Severity Score pour chaque résultat. Pour les vulnérabilités, il suit l'algorithme [CVSS 4.0][3], enrichissant le score de base avec des facteurs temporels (tels que des exploits actifs ou la probabilité d'exploitation) et des facteurs environnementaux (tels que le contexte d'exécution, l'exposition ou la criticité de la ressource affectée). Pour les erreurs de configuration et les risques d'identité, il calcule la gravité en utilisant une matrice de probabilité × impact qui évalue la manière dont un adversaire pourrait exploiter le résultat par rapport aux dommages que cet abus entraînerait.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[2]: /fr/security/cloud_security_management/triage_and_prioritize/severity_scoring/
[3]: https://www.first.org/cvss/v4-0/