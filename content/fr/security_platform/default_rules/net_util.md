---
aliases:
  - /fr/zwp-j22-2l2
  - /fr/security_monitoring/default_rules/zwp-j22-2l2
  - /fr/security_monitoring/default_rules/net_util
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
title: Utilitaire réseau exécuté
type: security_rules
---
## Objectif
Détecter l'exécution d'un utilitaire réseau sur un host.

## Stratégie
Après l'intrusion initiale d'un hacker sur un host (par exemple, via une faille sur un shell Web ou une fuite de conteneur), il se peut qu'il tente d'utiliser des utilitaires réseau à différentes fins malveillantes (par exemple, la reconnaissance ou l'exfiltration de données). Cette règle de détection se déclenche lorsque l'exécution d'un utilitaire réseau (tel que `nslookup` ou `netcat`) est détectée sur un host. Chaque utilitaire peut être utilisé à différentes fins lors d'une attaque. Par exemple, un outil DNS comme `nslookup` peut être utilisé pour exfiltrer des données DNS, tandis que l'outil `netcat` peut indiquer une exfiltration de données ou une backdoor. S'il s'agit d'un comportement anormal, cela peut indiquer qu'un hacker tente de compromettre votre host.

## Triage et réponse
1. Déterminez quel utilisateur a exécuté l'utilitaire et s'il s'agit d'un comportement autorisé ou normal.
2. Si ce comportement est anormal, tentez de contenir l'attaque (par exemple en mettant fin à la charge de travail, en fonction du stade de l'attaque) et recherchez des signes de l'attaque initiale. Suivez les processus internes de votre organisation en matière d'analyse et de correction des systèmes compromis.
3. Déterminez la nature de l'attaque et les outils réseau impliqués. Examinez les signaux de sécurité (le cas échéant) générés au moment de l'événement afin d'établir le cheminement de l'attaque et les signaux des autres outils. Par exemple, si une exfiltration de données par DNS est suspectée, examinez les serveurs et le trafic DNS s'ils sont disponibles.
4. Recherchez et réparez la cause d'origine de la faille.