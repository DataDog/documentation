---
aliases:
  - /fr/9fi-ky3-oxl
  - /fr/security_monitoring/default_rules/9fi-ky3-oxl
  - /fr/security_monitoring/default_rules/package_management_in_container
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
title: Gestion des packages dans un conteneur
type: security_rules
---
## Objectif
Détecter l'exécution d'un utilitaire de gestion des packages (par exemple, `apt`) dans un conteneur.

## Stratégie
Après l'intrusion initiale d'un hacker dans un conteneur de sa victime (par exemple, via une faille sur un shell Web), il se peut qu'il tente d'installer des outils et des utilitaires à différentes fins malveillantes (par exemple, la reconnaissance ou l'exfiltration de données). Cette règle de détection se déclenche lorsque l'exécution d'un d'utilitaire de gestion des packages courant (tel que `apt` ou `apt-get`) est détectée dans un conteneur. La gestion des packages dans des conteneurs n'est pas recommandée (car elle augmente considérablement l'immuabilité) et correspond à un comportement atypique. S'il s'agit d'un comportement anormal, cela peut indiquer qu'un hacker tente de compromettre vos conteneurs et votre host.


## Triage et réponse
1. Déterminez si ce comportement est anormal ou non.
2. Si ce comportement est anormal, tentez de contenir l'attaque (par exemple en mettant fin à la charge de travail, en fonction du stade de l'attaque) et recherchez des signes de l'attaque initiale. Suivez les processus internes de votre organisation en matière d'analyse et de correction des systèmes compromis.
3. Déterminez la nature de l'attaque et les outils utilisés. Examinez les signaux de sécurité (le cas échéant) générés au moment de l'événement afin d'établir le cheminement de l'attaque.
4. Recherchez et réparez la cause d'origine de la faille.