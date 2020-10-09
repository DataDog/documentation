---
aliases:
  - /fr/g5g-xiy-sbf
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - Agent de runtime
scope: ''
security: compliance
source: Surveillance de l'intégrité d'un fichier
title: Un fichier de log dans /var/log/ a été supprimé
type: security_rules
---
## Présentation

## Objectif
Beaucoup de pirates tentent d'éviter d'être détectés en supprimant les preuves de leur présence sur un host ou un conteneur. Pour ce faire, ils suppriment ou modifient généralement les logs système critiques qui enregistrent leur activité. Cette détection a pour but d'identifier les tentatives de dissimulation des pirates qui détruisent les données de log.

## Stratégie
Cette détection surveille la suppression de tout fichier log de `/var/log`, où sont stockés de nombreux fichiers de log Linux critiques.

## Triage et réponse
1. Vérifiez le nom du fichier de log supprimé.
2. Identifiez l'utilisateur ou le processus ayant supprimé le log.
3. Si cette activité est inattendue, confinez le host ou le conteneur et rétablissez une ancienne configuration valide.