---
aliases:
  - /fr/34e-bda-42c
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: conformité
source: azure
title: "Groupe Azure\_Network\_Security ouvert dans le monde entier"
type: security_rules
---
## Présentation

### Objectif
Détecter lorsqu'un groupe de sécurité réseau Azure autorise le trafic entrant à partir de toutes les adresses IP.

### Stratégie
Cette règle surveille les changements liés au réseau dans les logs d'activité Azure et détecte lorsque la valeur de `@evt.name` est égale à `MICROSOFT.NETWORK/NETWORKSECURITYGROUPS/WRITE`, la valeur e `@properties.securityRules.properties.direction` est égale à `Inbound`, la valeur de `@properties.securityRules.properties.access` présente une est égale à `Allow` et la valeur de `@properties.securityRules.properties.sourceAddressPrefix` est égale à `0.0.0.0/0` OU `*`.

### Triage et réponse
1. Déterminer si une ou plusieurs machines virtuelles sont associées à ce groupe de sécurité.
2. Déterminer si le groupe de sécurité et les VM en question doivent autoriser le trafic entrant à partir de toutes les adresses IP.