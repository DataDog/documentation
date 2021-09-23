---
aliases:
  - /fr/uho-muk-xqy
  - /fr/security_monitoring/default_rules/uho-muk-xqy
  - /fr/security_monitoring/default_rules/java_shell_execution
control: ''
disable_edit: true
framework: ''
integration_id: runtime security
kind: documentation
rule_category:
  - Workload Security
scope: ''
security: compliance
source: runtime security
title: Shell/Utilitaire généré par un processus Java
type: security_rules
---
## Objectif
Détecter les utilitaires shell, les utilitaires HTTP ou les shells courants générés par un processus Java.

## Stratégie
De nombreuses applications (comme un certain nombre de bases de données, serveurs Web et moteurs de recherche) sont exécutées en tant que processus Java. Les hackers peuvent exploiter des failles dans les programmes développés avec ces applications (par exemple, une injection SQL sur une base de données exécutée en tant que processus Java). Cette règle de détection se déclenche lorsqu'un processus Java génère des utilitaires shell communs, des utilitaires HTTP ou des shells. S'il s'agit d'un comportement anormal, cela peut indiquer qu'un hacker tente de compromettre votre host.

## Triage et réponse
1. Déterminez la nature et l'usage du processus Java.
2. Déterminez si l'exécution de shells et d'utilitaires est un usage approuvé pour le processus Java.
3. Si ce comportement est anormal, tentez de contenir l'attaque (par exemple en mettant fin à la charge de travail, en fonction du stade de l'attaque). Examinez les logs d'application ou les données d'APM pour rechercher des signes de l'attaque initiale. Suivez les processus internes de votre organisation en matière d'analyse et de correction des systèmes compromis.
4. Recherchez et réparez la cause d'origine de la faille.