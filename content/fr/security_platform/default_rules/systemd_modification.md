---
aliases:
  - /fr/cz4-vmk-ju2
  - /fr/security_monitoring/default_rules/cz4-vmk-ju2
  - /fr/security_monitoring/default_rules/systemd_modification
disable_edit: true
fim: 'true'
integration_id: file integrity monitoring
kind: documentation
rule_category:
  - Workload Security
source: file integrity monitoring
title: Modification de Systemd
type: security_rules
---
## Objectif
Détecter les modifications apportées à des services système.

## Stratégie
Les systèmes doivent être générés à partir d'images standard, tels que les AMI pour Amazon EC2, les images de machine virtuelle pour Azure ou les images GCP. Cela est d'autant plus vrai pour les environnements de production. Systemd est le gestionnaire de services par défaut d'un grand nombre de distributions Linux. Il gère le cycle de vie des services et processus en arrière-plan. Une personne malveillante peut exploiter Systemd pour obtenir un accès permanent au système. Ainsi, elle peut injecter du code dans des services systemd ou créer de nouveaux services. Les services Systemd peuvent être lancés au démarrage du système, ce qui permet au code des personnes malveillantes de rester persistant après les redémarrages système.

## Triage et réponse
1. Vérifier la nature des services modifiés ou créés.
2. Identifier s'il s'agit de services connus et s'ils ont été modifiés par un utilisateur ou un processus connu.
3. Si ces modifications ne sont pas acceptables, rétablir la dernière configuration valide du host concerné.