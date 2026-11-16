---
aliases:
- /fr/security/workload_protection/workload_security_rules
- /fr/security/threats/workload_security_rules
- /fr/security/cloud_workload_security/workload_security_rules
- /fr/security_platform/cloud_workload_security/workload_security_rules
description: Comprenez les règles de Datadog Agent, les règles de détection, les règles
  de constatation, les renseignements sur les menaces et les Content Packs que Workload
  Protection utilise pour détecter les menaces.
disable_toc: false
title: Détectez et surveillez
---
Workload Protection évalue l'activité de votre charge de travail par rapport à plusieurs types de règles. Ensemble, elles détectent les menaces, évaluent votre posture de sécurité à l'exécution et fournissent des capacités d'audit granulaires. Les règles Datadog Agent sélectionnent l'activité qui parvient à Datadog. Les règles de détection et les règles de constatation analysent cette activité. Les renseignements sur les menaces l'enrichissent avec un contexte de réputation, et les Content Packs regroupent des règles optionnelles pour des piles logicielles et des vecteurs de menace spécifiques.

Pour savoir comment ces règles s'articulent dans le pipeline de détection, consultez [Comment fonctionne Workload Protection][19].

## Règles Datadog Agent {#agent-rules}

[Règles Datadog Agent][1] définissent quelle activité système est envoyée au backend Datadog pour une analyse plus approfondie :
- [Guide SECL][15] pour rédiger des règles d'agent personnalisées avec le langage d'expression SECL
- [Policy management][9] pour déployer des règles d'agent personnalisées et par défaut
- [Variables and actions][16] pour les détections avec état et la collecte de télémétrie supplémentaire
- [Expressions Linux][17] et [Expressions Windows][18] pour l'ensemble complet des champs SECL interrogeables

## Règles de détection et de constatation {#detection-and-finding-rules}

[Les règles de détection et de constatation][3] décrivent la logique backend utilisée pour analyser les [événements Datadog Agent][2] et générer des [signaux][5] ou des [constatations][6] :
- [Detection rules][11] pour la détection des menaces et la réponse aux incidents
- [Finding rules][12] pour la posture d'exécution et le durcissement
- [Linux backend syntax][13] et [Windows backend syntax][14] pour l'ensemble complet des champs d'événement interrogeables

## Renseignements sur les menaces {#threat-intelligence}

Workload Protection utilise des bases de données de renseignements sur les menaces pour enrichir vos [Agent Events][2] et détecter les logiciels malveillants ainsi que les entités malveillantes connues. La page [Threat Intelligence][7] vous aide à :
- Explorez les bases de données de renseignements sur les menaces fournies prêtes à l'emploi (OOTB) avec Workload Protection
- Importez votre propre base de données de renseignements sur les menaces et configurez-la pour qu'elle fonctionne avec Workload Protection

## Packs de contenu {#content-packs}

Workload Protection fournit des [Content Packs][10] ciblés, conçus par Datadog pour des piles logicielles, des vecteurs de menace et des vulnérabilités émergentes spécifiques. La page [Content Packs][10] vous aide à :
- Explorez et activez Content Packs pour les cas d'utilisation clés de la sécurité des charges de travail
- Déployez des détections optionnelles uniquement sur les charges de travail auxquelles elles s'appliquent
- Restez informé des menaces émergentes grâce aux mises à jour de règles gérées par Datadog

[1]: /fr/security/workload_protection/detect_and_monitor/agent_rules
[2]: /fr/security/workload_protection/investigate_and_triage/agent_events
[3]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules
[5]: /fr/security/workload_protection/investigate_and_triage/security_signals
[6]: /fr/security/workload_protection/investigate_and_triage/security_findings
[7]: /fr/security/workload_protection/detect_and_monitor/threat_intelligence
[9]: /fr/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[10]: /fr/security/workload_protection/detect_and_monitor/content_packs
[11]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[12]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[13]: /fr/security/workload_protection/backend_linux
[14]: /fr/security/workload_protection/backend_windows
[15]: /fr/security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[16]: /fr/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[17]: /fr/security/workload_protection/linux_expressions
[18]: /fr/security/workload_protection/windows_expressions
[19]: /fr/security/workload_protection/#evaluating-activity