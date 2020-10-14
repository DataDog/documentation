---
aliases:
  - /fr/inr-e2u-vr4
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - Agent de runtime
scope: ''
security: compliance
source: Surveillance de l'intégrité d'un fichier
title: Accès aux fichiers de mémoire dans /proc/
type: security_rules
---
## Présentation

## Objectif
Les personnes malveillantes qui visent un élément cible en particulier accèdent généralement à un host ou conteneur adjacent à leur cible principale. Pour effectuer un mouvement latéral vers la cible prévue, les personnes malveillantes essaient généralement de trouver des identifiants qui leur permettraient d'accéder au host ou conteneur en question. Une technique pour trouver ces identifiants est le memory dumping. En vidant le contenu de la mémoire système vers le disque, il est souvent possible de trouver des identifiants non chiffrés.

## Stratégie
Cette opération de détection surveille les accès à la mémoire et aux mappages mémoire qui sont accessibles à partir du répertoire /proc/ sous Linux.

## Triage et réponse
1. Si cette activité est inattendue, confiner le host ou le conteneur et rétablir la dernière configuration valide connue.
2. Nous vous conseillons de réinitialiser les identifiants qui ont été utilisés sur le host/conteneur.