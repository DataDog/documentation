---
aliases:
  - /fr/4af-ed1-fc0
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: attack
source: azure
tactic: TA0001-initial-access
technique: T1190-exploit-public-facing-application
title: "Le pare-feu d'applications Web d'Azure\_Front\_Door a bloqué une requête"
type: security_rules
---
## Présentation

### Objectif
Détecter lorsqu'un pare-feu d'applications Web Azure Front Door bloque une requête provenant d'une adresse IP.

### Stratégie
Cette règle surveille la présence de logs de pare-feu d'applications Web Front Door dans les logs d'activité Azure et détecte lorsque la valeur de `@evt.name` est égale à `Microsoft.Network/FrontDoor/WebApplicationFirewallLog/Write` et lorsque la valeur de `@properties.action` est égale à `Block`.

### Triage et réponse
1. Analyser cette requête afin de déterminer si son blocage est justifié.
2. Accéder au dashboard de l'adresse IP et analysez les autres requêtes envoyées par cette adresse IP.