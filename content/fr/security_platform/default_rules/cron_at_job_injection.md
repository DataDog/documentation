---
aliases:
  - /fr/a78-b2n-xmd
  - /fr/security_monitoring/default_rules/a78-b2n-xmd
  - /fr/security_monitoring/default_rules/cron_at_job_injection
disable_edit: true
fim: 'true'
integration_id: file integrity monitoring
kind: documentation
rule_category:
  - Workload Security
source: file integrity monitoring
title: Création de tâches Cron et AT
type: security_rules
---
## Objectif
Détecter la création ou la modification de nouvelles tâches Cron sur un système.

## Stratégie
Cron est un système de planification qui exécute des tâches à partir d'un calendrier. Il est possible d'exploiter des tâches Cron pour obtenir un accès permanent au système ou même pour exécuter du code malveillant au démarrage. Les tâches Cron peuvent également servir à exécuter du code à distance ou un processus avec un autre contexte utilisateur.

## Triage et réponse
1. Vérifier si une tâche Cron a été créée ou modifiée.
2. Vérifier si la création ou la modification de la tâche Cron provient d'un processus ou d'un utilisateur connu.
3. Si ces modifications ne sont pas acceptables, rétablir la dernière configuration valide du host ou du conteneur concerné.