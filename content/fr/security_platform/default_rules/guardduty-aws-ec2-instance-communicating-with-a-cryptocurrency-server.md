---
aliases:
  - /fr/ecb-6e7-738
  - /fr/security_monitoring/default_rules/ecb-6e7-738
  - /fr/security_monitoring/default_rules/guardduty-aws-ec2-instance-communicating-with-a-cryptocurrency-server
disable_edit: true
integration_id: ec2
kind: documentation
rule_category:
  - Détection des logs
scope: ec2
security: attaque
source: guardduty
tactic: TA0040-impact
technique: T1496-resource-hijacking
title: Instance AWS EC2 communiquant avec un serveur de cryptomonnaie
type: security_rules
---
### Objectif
Détecter lorsqu'une instance EC2 communique avec un serveur de cryptomonnaie.

### Stratégie
Cette règle vous permet d'utiliser GuardDuty pour détecter lorsqu'une instance EC2 a effectué une requête DNS ou communique avec une IP associée à des opérations de cryptomonnaie. Les résultats GuardDuty suivants déclenchent ce signal :

* [CryptoCurrency:EC2/BitcoinTool.B!DNS][1]
* [CryptoCurrency:EC2/BitcoinTool.B][2]


### Triage et réponse
1. Déterminez quel nom de domaine ou quelle adresse IP a déclenché le signal. Pour ce faire, reportez-vous aux échantillons.
2. Dans le cas où le domaine ou l'adresse IP n'aurait pas dû faire l'objet d'une requête, ouvrez une enquête de sécurité et déterminez le processus à l'origine de la requête de nom de domaine ou d'adresse IP.

[1]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_crypto.html#crypto3
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_crypto.html#crypto4