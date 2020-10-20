---
aliases:
  - /fr/dvz-4x3-3ws
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - Agent de runtime
scope: ''
security: compliance
source: Surveillance de l'intégrité d'un fichier
title: /etc/shadow/ ou /etc/gshadow a été modifié par un outil non standard
type: security_rules
---
## Présentation

## Objectif
Détecter les modifications apportées aux fichiers d'identifiants sensibles par des processus non standard.

## Stratégie
En production tout particulièrement, tous les identifiants doivent être soit définis par du code, soit statiques. Les dérives ou les modifications non surveillées de ces identifiants peuvent ouvrir des vecteurs d'attaque pour les personnes mal intentionnées et amener votre organisation à ne plus être conforme aux réglementations auxquelles elle est soumise. Cette opération de détection surveille la modification des fichiers d'identifiants sensibles qui ne doivent pas être modifiés en dehors de leurs définitions en tant que code (ou leurs définitions statiques). Le moyen standard de modifier les fichiers shadow et gshadow est d'utiliser les commandes Linux `vipw` et `vigr`, respectivement. Toute interaction avec ces fichiers d'identifiants sensibles par un autre processus constitue un comportement suspect qui doit être examiné.

## Triage et réponse
1. Identifier l'utilisateur ou le processus ayant modifié le ou les fichiers d'identifiants.
2. Vérifier ce qui a été modifié dans les fichiers d'identifiants.
3. Si ces modifications ne sont pas acceptables, rétablir la dernière configuration valide du host ou du conteneur concerné.