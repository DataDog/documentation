---
aliases:
  - /fr/8c5-34f-fa2
disable_edit: true
kind: documentation
rule_category:
  - Log Detection
security: attack
source: route53
tactic: TA0006-credential-access
technique: T1552-unsecured-credentials
title: Résolution d'une requête DNS suspecte par EC2 liée aux métadonnées AWS
type: security_rules
---
## Présentation

### Objectif
Détecter lorsqu'un domaine demandé correspond à l'IP de métadonnées d'AWS (169.254.169.254).

### Stratégie
Passez en revue les logs Route 53 et déterminez si les données de la réponse d'une requête DNS correspondent à l'IP de métadonnées d'AWS (169.254.169.254). Cela pourrait indiquer qu'une personne malveillante tente de mettre la main sur vos identifiants à partir d'un service de métadonnées AWS.

### Triage et réponse
1. Identifiez l'instance associée à la requête DNS.
2. Déterminez si le nom de domaine demandé (`dns.question.name`) doit être autorisé. Si ce n'est pas le cas, poursuivez vos recherches et déterminez ce qui est à l'origine de la demande, puis vérifiez si une personne malveillante est parvenue à accéder aux identifiants de métadonnées AWS.