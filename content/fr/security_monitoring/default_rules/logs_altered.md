---
aliases:
  - /fr/ymm-a8s-pjm
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - Agent de runtime
scope: ''
security: compliance
source: Surveillance de l'intégrité d'un fichier
title: Des données de log dans /var/log/ ont été supprimées
type: security_rules
---
## Présentation

## Objectif
Beaucoup de pirates tentent d'échapper à la détection en supprimant les preuves de leur présence sur un host ou un conteneur. Pour ce faire, ils suppriment ou modifient généralement les logs système critiques qui enregistrent leur activité. Cette détection a pour but d'identifier les tentatives de dissimulation des pirates via la destruction des données de log.

## Stratégie
Cette détection surveille la troncation (comme la suppression de données) de tout fichier de log dans `/var/log`, où sont stockés de nombreux fichiers de log Linux critiques.

## Triage et réponse
1. Vérifier le nom du fichier de log modifié.
2. Identifier l'utilisateur ou le processus ayant modifié le log.
3. Si cette activité est inattendue, confiner le host ou le conteneur et rétablir la dernière configuration valide connue.