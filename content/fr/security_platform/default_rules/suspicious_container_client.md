---
aliases:
  - /fr/6ph-8a1-ul5
  - /fr/security_monitoring/default_rules/6ph-8a1-ul5
  - /fr/security_monitoring/default_rules/suspicious_container_client
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
title: Utilitaire de gestion de conteneurs dans un conteneur
type: security_rules
---
## Objectif
Détecter l'exécution d'un utilitaire de gestion de conteneurs (par exemple, `kubectl`) dans un conteneur.

## Stratégie
Après l'intrusion initiale d'un hacker dans un conteneur de sa victime (par exemple, via une faille de shell Web), il se peut qu'il tente d'élever les privilèges, de créer une fuite de conteneur ou d'exfiltrer des secrets. Cette règle de détection se déclenche lorsque l'exécution d'un utilitaire de gestion de conteneurs courant (tel que `kubectl` ou `kubelet`) est détectée dans un conteneur. S'il s'agit d'un comportement anormal, cela peut indiquer qu'un hacker tente de compromettre vos conteneurs et votre host.

## Triage et réponse
1. Déterminez si ce comportement est normal ou anormal.
2. Si ce comportement est anormal, tentez de contenir l'attaque (par exemple en mettant fin à la charge de travail, en fonction du stade de l'attaque) et recherchez des signes de l'attaque initiale. Suivez les processus internes de votre organisation en matière d'analyse et de correction des systèmes compromis.
3. Déterminez la nature de l'attaque et les utilitaires impliqués. Examinez les signaux de sécurité (le cas échéant) générés au moment de l'événement afin d'établir le cheminement de l'attaque.
4. Recherchez et réparez la cause d'origine de la faille.