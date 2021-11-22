---
aliases:
  - /fr/4nu-jvj-zxf
  - /fr/security_monitoring/default_rules/4nu-jvj-zxf
  - /fr/security_monitoring/default_rules/kernel_module
disable_edit: true
fim: 'true'
integration_id: file integrity monitoring
kind: documentation
rule_category:
  - Workload Security
source: file integrity monitoring
title: Un kernel module a été ajouté à /lib/modules/
type: security_rules
---
## Objectif
Les kernel modules peuvent être utilisés pour exécuter automatiquement du code au démarrage d'un host. Les hackers utilisent parfois ces modules pour obtenir un accès persistant sur un host spécifique en s'assurant que leur code est exécuté même après un redémarrage système. Les kernels modules peuvent également aider les pirates à obtenir des autorisations élevées sur un système.

## Stratégie
Sous Linux, les kernel modules sont chargés à partir du répertoire `/lib/modules`. Cette règle de détection surveille tous les nouveaux fichiers créés dans ce répertoire.

## Triage et réponse
1. Vérifier le nom du kernel module créé.
2. Identifier l'utilisateur ou le processus ayant créé le module.
3. Si le nouveau kernel module est inattendu, confiner le host ou le conteneur et rétablir la dernière configuration valide connue.