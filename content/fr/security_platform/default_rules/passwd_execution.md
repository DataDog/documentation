---
aliases:
  - /fr/sc8-pjc-tut
  - /fr/security_monitoring/default_rules/sc8-pjc-tut
  - /fr/security_monitoring/default_rules/passwd_execution
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
title: Utilitaire passwd exécuté
type: security_rules
---
## Objectif
Détecter l'exécution de la commande `passwd`.

## Stratégie
La commande de système d'exploitation `passwd` permet de modifier les mots de passe de comptes utilisateur. S'il s'agit d'un comportement anormal, cela peut indiquer qu'un hacker tente de compromettre votre host et de créer une faille permanente. Cette règle de détection se déclenche lorsqu'une exécution de la commande `passwd` est détectée.

## Triage et réponse
1. Déterminez quel utilisateur a exécuté la commande `passwd` et s'il s'agit d'un comportement autorisé ou normal.
2. Si ce comportement est anormal, tentez de contenir l'attaque (par exemple en mettant fin à la charge de travail, en fonction du stade de l'attaque) et recherchez des signes de l'attaque initiale. Suivez les processus internes de votre organisation en matière d'analyse et de correction des systèmes compromis.
3. Examinez les signaux de sécurité (le cas échéant) générés au moment de l'événement afin d'établir le cheminement de l'attaque.
4. Recherchez et réparez la cause d'origine de la faille.