---
aliases:
  - /fr/cf4-844-4a0
  - /fr/security_monitoring/default_rules/cf4-844-4a0
  - /fr/security_monitoring/default_rules/cloudtrail-aws-cloudtrail-configuration-modified
control: '4.5'
disable_edit: true
framework: cis-aws
integration_id: cloudtrail
kind: documentation
requirement: Monitoring
rule_category:
  - Détection des logs
scope: cloudtrail
security: conformité
source: cloudtrail
title: "Configuration d'AWS\_CloudTrail modifiée"
type: security_rules
---
### Objectif
Détecter quand une personne malveillante tente de contourner les mécanismes de défense en désactivant ou en modifiant CloudTrail.

### Stratégie
Cette règle vous permet de surveiller ces appels d'API CloudTrail afin de détecter si une personne malveillante modifie ou désactive CloudTrail :

* [DeleteTrail][1]
* [UpdateTrail][2]
* [StopLogging][3]

### Triage et réponse
1. Déterminez quel utilisateur de votre organisation possède la clé d'API qui a effectué cet appel d'API.
2. Contactez l'utilisateur pour savoir s'il a réellement tenté d'effectuer cet appel d'API.
3. Si l'utilisateur n'a pas effectué l'appel d'API :
 * Effectuez une rotation des identifiants.
 * Cherchez à savoir si ces mêmes identifiants ont été utilisés pour effectuer d'autres appels d'API non autorisés.

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_DeleteTrail.html
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_UpdateTrail.html
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_StopLogging.html