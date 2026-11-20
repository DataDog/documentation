---
description: Comparez les règles backend de détection et de découverte que Workload
  Protection utilise pour analyser les événements de l'Agent.
disable_toc: false
title: Règles de détection et de constatation
---
Une fois que l'Agent a transmis les [événements de l'Agent][1] à Datadog, les règles backend analysent cette télémétrie pour produire des résultats de sécurité. Workload Protection fournit deux types de règles backend :

- **[Règles de détection][2]** détectent les menaces et génèrent des [signaux de sécurité][3] lorsqu'une activité suspecte correspond à vos critères. Elles font apparaître des menaces réelles de sécurité à l'exécution, par exemple, un shell inversé ou une tentative d'accès aux identifiants.
- **[Règles de constatation][4]** évaluent la posture de sécurité à l'exécution et génèrent des [constatations][5] avec des recommandations pour les ressources qui ne respectent pas une politique. Elles suivent les mauvaises pratiques et les erreurs de configuration en cours sur un host ou un conteneur, par exemple, l'utilisation d'un gestionnaire de paquets dans un conteneur de production.

Les deux types de règles interrogent le même **schéma d'événement backend**. Chaque événement inclut tous les champs collectés par l'Agent, ainsi qu'un enrichissement supplémentaire tel que le contexte de l'infrastructure et les renseignements sur les menaces. Lorsque vous rédigez une requête de recherche pour une règle de détection ou de découverte, vous pouvez filtrer sur n'importe quel champ de ce schéma. Consultez la [syntaxe backend Linux][6] et la [syntaxe backend Windows][7] pour obtenir l'ensemble complet des champs disponibles.

## Règles de détection contre règles de constatation {#detection-rules-versus-finding-rules}

| | Règles de détection | Règles de constatation |
|---|---|---|
| **Sortie** | Signal de sécurité | Constatation |
| **Représente** | Menaces réelles de sécurité à l'exécution | Problèmes de posture et recommandations de sécurité |
| **Cas d'utilisation** | Détection des menaces et réponse aux incidents | Posture à l'exécution et renforcement |

Par exemple, `Sudoers Policy File Modification Detection` signale les modifications apportées à `/etc/sudoers` et aux fichiers dans `/etc/sudoers.d/`. La modification de ces fichiers est une mauvaise pratique, mais elle peut faire partie d'un processus légitime. Le traiter comme une règle de détection génère un bruit excessif. En tant que règle de constatation, elle suit quelles ressources possèdent cette configuration sans déclencher de signal pour chaque écriture de fichier.

## Étapes suivantes {#next-steps}

- Lisez [Règles de détection][2] pour explorer les règles de détection des menaces prêtes à l'emploi (OOTB) et créer des règles de détection personnalisées.
- Lisez [Règles de constatation][4] pour explorer les règles de posture prêtes à l'emploi et créer des règles de constatation personnalisées.
- Parcourez la [syntaxe backend Linux][6] et la [syntaxe backend Windows][7] pour voir tous les champs que vous pouvez utiliser dans les requêtes de règles.

[1]: /fr/security/workload_protection/investigate_and_triage/agent_events
[2]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[3]: /fr/security/workload_protection/investigate_and_triage/security_signals
[4]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[5]: /fr/security/workload_protection/investigate_and_triage/security_findings
[6]: /fr/security/workload_protection/backend_linux
[7]: /fr/security/workload_protection/backend_windows