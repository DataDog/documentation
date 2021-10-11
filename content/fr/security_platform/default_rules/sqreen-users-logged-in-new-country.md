---
aliases:
  - /fr/nl3-tm7-ujl
  - /fr/security_monitoring/default_rules/nl3-tm7-ujl
  - /fr/security_monitoring/default_rules/sqreen-users-logged-in-new-country
disable_edit: true
integration_id: sqreen
kind: documentation
rule_category:
  - Détection des logs
source: sqreen
title: Connexion d'un utilisateur à une application depuis un nouveau pays
type: security_rules
---
### Objectif
Détecter lorsqu'un utilisateur se connecte depuis un nouveau pays à une application utilisant Sqreen.

### Stratégie
Cette règle permet d'être prévenu lorsqu'un utilisateur se connecte à une application depuis un pays inhabituel.

### Triage et réponse
1. Examiner l'activité de l'utilisateur depuis le [dashboard Sqreen][1].

[1]: https://my.sqreen.com/application/goto/users/