---
aliases:
  - /fr/d6v-ktd-7pk
  - /fr/security_monitoring/default_rules/d6v-ktd-7pk
  - /fr/security_monitoring/default_rules/vault-root-token-usage-detected
disable_edit: true
integration_id: vault
kind: documentation
rule_category:
  - Détection des logs
scope: vault
source: vault
title: Jeton racine Vault utilisé
type: security_rules
---
### Objectif
Détectez lorsqu'un jeton racine Vault est utilisé. Les jetons racines peuvent effectuer n'importe quelle activité et possèdent le plus haut niveau de privilèges dans Vault. Ils doivent uniquement servir en cas d'urgence.

### Stratégie
Cette règle vous permet de surveiller les logs d'audit Vault (source:vault) afin de détecter lorsque `root` est identifié dans l'un des deux attributs suivants :

* Une stratégie d'authentification (`@auth.policies`)
* Un nom d'affichage d'authentification (`@auth.display_name`)

Grâce à cette règle, vous pouvez également surveiller l'endpoint de l'API `/sys/generate-root` utilisé pour créer des clés racines.

### Triage et réponse
1. Déterminez l'identité du créateur du jeton racine, ainsi que la date de création. Vous pouvez obtenir la date de création du jeton à partir de l'accesseur de jeton, avec la commande `vault token lookup -accessor <accesseur>`. 
2. Étudiez les requêtes transmises avec le jeton racine et vérifiez la validité de leur utilisation.
3. Vérifiez que le jeton racine est bien révoqué une fois qu'il n'est plus nécessaire, avec la commande `vault token revoke -accessor <jeton>`.