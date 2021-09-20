---
aliases:
  - /fr/7n1-x5b-ds7
  - /fr/security_monitoring/default_rules/7n1-x5b-ds7
  - /fr/security_monitoring/default_rules/m365-onedrive-anonymouslink
disable_edit: true
integration_id: microsoft-365
kind: documentation
rule_category:
  - Détection des logs
source: microsoft-365
title: "Création de lien anonyme OneDrive Microsoft\_365"
type: security_rules
---
### Objectif
Détecter lorsqu'un utilisateur crée un lien anonyme pour un document Microsoft 365 dans OneDrive. Dans cette situation, n'importe quel utilisateur non authentifié disposant du lien pourrait accéder à ce document.

### Stratégie
Cette règle vérifie si le nom d'événement `AnonymousLinkCreated` figure dans les logs Microsoft 365.

### Triage et réponse
1. Déterminer si ce document doit être accessible de façon anonyme.