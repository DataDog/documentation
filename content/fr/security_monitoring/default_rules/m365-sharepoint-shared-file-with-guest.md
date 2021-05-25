---
aliases:
  - /fr/gh5-qhe-h9m
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
source: microsoft-365
title: "Partage d'un objet SharePoint Microsoft\_365 avec un invité"
type: security_rules
---
## Présentation

### Objectif
Détecter lorsqu'un utilisateur partage un document SharePoint Microsoft 365 avec un invité.

### Stratégie
Cette règle vérifie si le nom d'événement `SharingInvitationCreated` figure dans les logs Microsoft 365 lorsque la valeur de `TargetUserOrGroupType` est définie sur `Guest`.

### Triage et réponse
1. Déterminer si ce document doit être partagé avec l'utilisateur externe.