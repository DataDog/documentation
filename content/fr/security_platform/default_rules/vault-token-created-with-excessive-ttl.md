---
aliases:
  - /fr/vih-ylo-wbc
  - /fr/security_monitoring/default_rules/vih-ylo-wbc
  - /fr/security_monitoring/default_rules/vault-token-created-with-excessive-ttl
disable_edit: true
integration_id: vault
kind: documentation
rule_category:
  - Détection des logs
scope: vault
security: attaque
source: vault
tactic: Persistance TA0003
title: Jeton Vault créé avec une valeur TTL trop longue
type: security_rules
---
### Objectif
Détectez lorsqu'un jeton Vault est créé avec une durée de vie (Time-to-live ou TTL) trop longue, ce qui peut indiquer qu'une personne mal intentionnée a établi une persistance dans votre environnement.

### Stratégie
Cette règle surveille les logs d'audit Vault pour lesquels des jetons ont été créés avec une durée de vie supérieure à 90 000 secondes (25 heures). Si vous souhaitez changer la limite de durée de vie, dupliquez cette règle et modifiez le paramètre `@auth.token_ttl:>90000` dans la requête.

### Triage et réponse
1. Vérifiez la valeur TTL maximale des jetons dans la configuration Vault pertinente.
2. Si la valeur TTL maximale est supérieure à celle requise, modifiez-la.
3. Vérifiez auprès du créateur de jetons que le jeton ayant une valeur TTL élevée est bien légitime.
4. Révoquez le jeton si son utilisation n'est pas justifiée.