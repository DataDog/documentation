---
description: Enrichissez les événements de l'Agent Workload Protection avec du renseignement
  sur les menaces sélectionné par Datadog, ou importez votre propre base de données.
disable_toc: false
further_reading:
- link: /security/threat_intelligence/
  tag: Documentation
  text: Renseignement sur les menaces de Datadog
- link: /security/detection_rules/
  tag: Documentation
  text: Règles de détection
title: Renseignements sur les menaces
---
Workload Protection enrichit les [événements de l'Agent][1] avec du [renseignement sur les menaces][2] sélectionné par Datadog. Cet enrichissement ajoute un contexte de réputation aux entités observées sur vos hosts et conteneurs, tels que les adresses IP et les hachages de fichiers, pour vous aider à évaluer si un événement fait partie d'une campagne malveillante connue.

Pour les concepts généraux, les sources, les catégories, les intentions et les informations sur le cycle de vie qui s'appliquent à l'ensemble des produits de sécurité Datadog, consultez [Renseignement sur les menaces][2]. Cette page couvre les détails spécifiques à Workload Protection.

## Types d'entités pour Workload Protection {#entity-types-for-workload-protection}

Workload Protection prend en charge les [types d'entités][3] suivants :

- Adresses IP
- Domaines
- Hachages de fichiers : `SHA1`, `SHA256` et `ssdeep`

`ssdeep` Les hachages prennent en charge la correspondance approximative, ce qui aide à identifier les fichiers similaires, mais non identiques, à un fichier malveillant connu.

## Catégories prises en charge pour Workload Protection {#supported-categories-for-workload-protection}

Workload Protection prend en charge les catégories de renseignement sur les menaces suivantes :

- `malware`
- `exploitation`
- `cryptomining`
- `supply_chain_attack_infrastructure`
- `custom`

Pour les définitions de catégories et les intentions qui s'appliquent à l'ensemble des produits de sécurité Datadog, consultez [Catégories de renseignement sur les menaces][5].

## Utilisation du renseignement sur les menaces dans les règles de détection {#using-threat-intelligence-in-detection-rules}

Les [règles de détection][4] dans Workload Protection peuvent référencer des clés de renseignement sur les menaces telles que la catégorie (`@threat_intel.results.category`) et l'intention (`@threat_intel.results.intention`) dans la requête de recherche ou les conditions de règle. Par exemple, une règle peut se déclencher lorsqu'un fichier exécuté sur une charge de travail correspond au hachage d'un échantillon de logiciel malveillant connu, classé comme `malware` avec l'intention `malicious`.

<div class="alert alert-info">Les sources et catégories de renseignement sur les menaces ne sont pas configurables.</div>

## Facettes de renseignement sur les menaces {#threat-intelligence-facets}

Les [sources, catégories et intentions][6] de renseignement sur les menaces sont disponibles sous forme de facettes et de filtres. Vous pouvez consulter les enrichissements de renseignement sur les menaces sur les événements correspondants dans l'[Agent Events Explorer][1] et sur les [signaux de sécurité][7] résultants.

## Renseignement sur les menaces pour les signaux de sécurité {#threat-intelligence-on-security-signals}

Lorsqu'un événement d'Agent correspond à un indicateur de renseignement sur les menaces, Workload Protection génère un signal de sécurité qui affiche l'entité correspondante ainsi que sa source, sa catégorie et son intention.

{{< img src="security/workload_protection/detect_and_monitor/threat_intelligence_signal.png" alt="Un signal de sécurité Workload Protection affichant les détails d'enrichissement du renseignement sur les menaces" style="width:100%;" >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/workload_protection/investigate_and_triage/agent_events
[2]: /fr/security/threat_intelligence/
[3]: /fr/security/threat_intelligence/#entity-types
[4]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[5]: /fr/security/threat_intelligence/#threat-intelligence-categories
[6]: /fr/security/threat_intelligence/#threat-intelligence-facets
[7]: /fr/security/workload_protection/investigate_and_triage/security_signals
[8]: /fr/security/workload_protection/investigate_and_triage/security_signals/investigate#correlated-events