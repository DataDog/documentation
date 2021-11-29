---
aliases:
  - /fr/ldw-moi-trt
  - /fr/security_monitoring/default_rules/ldw-moi-trt
  - /fr/security_monitoring/default_rules/database_shell_execution
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
title: Shell/Utilitaire généré par une base de données
type: security_rules
---
## Objectif
Détecter les utilitaires shell, les utilitaires HTTP ou les shells courants générés par un processus de base de données (par exemple, MySQL, PostgreSQL ou MongoDB).

## Stratégie
Lors d'une attaque contre une base de données, les hackers profitent souvent d'oublis dans l'assainissement et la validation des E/S pour exécuter des instructions et des commandes. Ces attaques peuvent prendre la forme d'une injection de requête de base de données, donnant lieu à une intrusion et une attaque plus étendue en établissant un shell Web ou en exfiltrant des données. Cette règle de détection se déclenche lorsque des utilitaires shell, des utilitaires HTTP ou des shells courants sont générés par un processus de base de données (tel que MySQL, MongoDB ou PostgreSQL), ce qui correspond à un comportement atypique pour une base de données. S'il s'agit d'un comportement anormal, cela peut indiquer qu'un hacker tente de compromettre votre base de données ou votre host.

## Triage et réponse
1. Déterminez si l'exécution de shells et d'utilitaires est un usage approuvé pour votre base de données.
2. Si ce comportement est anormal, tentez de contenir l'attaque (par exemple en mettant fin à la charge de travail, en fonction du stade de l'attaque). Examinez les logs d'application ou les données d'APM pour rechercher des signes de l'attaque initiale. Suivez les processus internes de votre organisation en matière d'analyse et de correction des systèmes compromis.
3. Recherchez et réparez la cause d'origine de la faille.