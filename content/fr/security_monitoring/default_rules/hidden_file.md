---
aliases:
  - /fr/rx6-2a3-fac
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - Agent de runtime
scope: ''
security: compliance
source: Surveillance de l'intégrité d'un fichier
title: Un fichier caché a été créé
type: security_rules
---
## Présentation

## Objectif
Les fichiers cachés peuvent être utilisés par des personnes malveillantes pour contourner les mécanismes de détection sur les hosts et les conteneurs. Cette opération de détection vise à identifier toute création de fichier caché.

## Stratégie
Dans Linux, les fichiers peuvent être cachés en ajoutant un `.` devant le nom du fichier afin que les utilisateurs ne puissent pas les voir. Exemple : `.exemple.fichier`. Cette opération de détection surveille la création de tout fichier dont le nom commence par `.`.

## Triage et réponse
1. Identifier l'utilisateur ou le processus ayant créé le nouveau fichier caché.
3. Si ces nouveaux fichiers sont inattendus, confiner le host ou le conteneur et rétablir la dernière configuration valide connue.