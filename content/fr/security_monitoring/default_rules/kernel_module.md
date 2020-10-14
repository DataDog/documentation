---
aliases:
  - /fr/4nu-jvj-zxf
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - Agent de runtime
scope: ''
security: compliance
source: Surveillance de l'intégrité d'un fichier
title: Un kernel module a été ajouté à /lib/modules/
type: security_rules
---
## Présentation

## Objectif
Les kernel modules peuvent être utilisés pour exécuter automatiquement du code au démarrage d'un host. Les pirates utilisent parfois des kernel modules pour obtenir un accès persistant sur un host spécifique en s'assurant que leur code est exécuté même après un redémarrage système. Les kernel modules peuvent également aider les pirates à obtenir des autorisations élevées sur un système.

## Stratégie
Les kernel modules sont chargés à partir du répertoire "/lib/modules" dans Linux. Cette opération de détection surveille tous les nouveaux fichiers créés sous ce répertoire.

## Triage et réponse
1. Vérifier le nom du kernel module créé.
2. Identifier l'utilisateur ou le processus ayant créé le module.
3. Si le nouveau kernel module est inattendu, confiner le host ou le conteneur et rétablir la dernière configuration valide connue.