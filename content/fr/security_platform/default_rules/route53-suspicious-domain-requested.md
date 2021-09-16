---
aliases:
  - /fr/c07-f8e-051
  - /fr/security_monitoring/default_rules/c07-f8e-051
  - /fr/security_monitoring/default_rules/route53-suspicious-domain-requested
disable_edit: true
integration_id: route53
kind: documentation
rule_category:
  - Détection des logs
security: attaque
source: route53
title: Demande de domaine suspecte par une instance EC2
type: security_rules
---
### Objectif
Détecter lorsqu'un domaine demandé possède un domaine de premier niveau suspect.

### Stratégie
Passez en revue les logs Route 53 et déterminez si le domaine de premier niveau de la question DNS (`@dns.question.name`) correspond à l'une des cinq principales valeurs de la [liste des domaines de premier niveau les plus attaqués de Spamhaus][1]

### Triage et réponse
1. Identifiez l'instance associée à la requête DNS.
2. Déterminez si le nom de domaine demandé (`dns.question.name`) doit être autorisé. Si ce n'est pas le cas, poursuivez vos recherches et déterminez ce qui est à l'origine de la demande, puis vérifiez si une personne malveillante est parvenue à accéder aux identifiants de métadonnées AWS.

[1]: https://www.spamhaus.org/statistics/tlds/