---
aliases:
  - /fr/d24-0f0-62d
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.iam.role
security: compliance
source: gcp
title: Création ou modification de rôle personnalisé GCP IAM
type: security_rules
---
## Présentation

### Objectif
Détecter quand un rôle personnalisé est créé ou modifié. 

### Stratégie
Surveillez les logs d'audit liés aux activités GCP IAM afin de déterminer si l'une des méthodes suivantes est invoquée :

* `google.iam.admin.v1.CreateRole`
* `google.iam.admin.v1.UpdateRole` 

### Triage et réponse
1. Examinez le log et le rôle et assurez-vous que les contextes des autorisations sont correctement définis.
2. Examinez les utilisateurs associés au rôle et assurez-vous qu'ils doivent disposer des autorisations associées au rôle.