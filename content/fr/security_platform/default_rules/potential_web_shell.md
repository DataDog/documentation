---
aliases:
  - /fr/2nx-z7n-yz8
  - /fr/security_monitoring/default_rules/2nx-z7n-yz8
  - /fr/security_monitoring/default_rules/potential_web_shell
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
title: Shell/Utilitaire généré par un processus d'application Web
type: security_rules
---
## Objectif
Détecter les utilitaires shell, les utilitaires HTTP ou les shells courants générés par un moteur de langage (par exemple, python ou php) ou par des serveurs Web (par exemple, nginx).

## Stratégie
Lors d'une attaque via un shell Web, il est fréquent que les hackers chargent et exécutent des fichiers malveillants sur la machine de leur victime afin de créer une porte dérobée sur le système compromis. Les hackers utilisent les shells Web à des fins diverses, qui peuvent marquer le début d'une intrusion ou d'une attaque plus étendue. Cette règle de détection se déclenche lorsque des utilitaires shell, des utilitaires HTTP ou des shells sont générés par un serveur Web ou un moteur de langage courant (par exemple dans le cadre de votre application Web), ce qui correspond à un comportement atypique pour une application ou un serveur Web. S'il s'agit d'un comportement anormal, cela peut indiquer qu'un hacker tente d'utiliser un shell Web existant ou d'en installer un.

## Triage et réponse
1. Déterminez si l'exécution de shells et d'utilitaires est un usage approuvé pour votre application Web.
2. Si ce comportement est anormal, tentez de contenir l'attaque (par exemple en mettant fin à la charge de travail, en fonction du stade de l'attaque). Examinez les logs d'application ou les données d'APM pour rechercher des signes de l'attaque initiale. Suivez les processus internes de votre organisation en matière d'analyse et de correction des systèmes compromis.
3. Recherchez et réparez la cause d'origine de la faille.