---
aliases:
  - /fr/2vr-c3r-eih
  - /fr/security_monitoring/default_rules/2vr-c3r-eih
  - /fr/security_monitoring/default_rules/common_net_intrusion_util
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
title: Exécution de nmap détectée
type: security_rules
---
## Objectif
Détecter l'exécution de l'utilitaire réseau `nmap`.

## Stratégie
`nmap` est un utilitaire réseau souvent utilisé par les hackers pour analyser la topologie et les vulnérabilités du réseau de leurs cibles. Après l'intrusion initiale du hacker dans un host (par exemple, par le biais d'une faille sur un shell Web ou d'une fuite de conteneur), il peut tenter d'utiliser `nmap` à des fins de reconnaissance. Cette fonction de détection se déclenche lorsqu'une exécution de `nmap` est détectée sur un système. S'il s'agit d'un comportement anormal, cela peut indiquer qu'un hacker tente de compromettre vos systèmes.

## Triage et réponse
1. Déterminez quel utilisateur a exécuté `nmap` et s'il s'agit d'un comportement autorisé ou normal.
2. Si ce comportement est anormal, tentez de contenir l'attaque (par exemple en mettant fin à la charge de travail, en fonction du stade de l'attaque) et recherchez des signes de l'attaque initiale. Suivez les processus internes de votre organisation en matière d'analyse et de correction des systèmes compromis.
3. Déterminez la nature de l'attaque et les outils réseau utilisés. Examinez les signaux de sécurité (le cas échéant) générés au moment de l'événement afin d'établir le cheminement de l'attaque.
4. Recherchez et réparez la cause d'origine de la faille.