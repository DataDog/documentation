---
aliases:
  - /fr/it2-cj4-gy6
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - Agent de runtime
scope: ''
security: compliance
source: Surveillance de l'intégrité d'un fichier
title: Autorisations modifiées sur des fichiers Linux sensibles
type: security_rules
---
## Présentation

## Objectif
Pour accéder à des fichiers et à des répertoires protégés, les pirates tentent parfois de modifier leurs autorisations.

## Stratégie
Cette détection surveille les modifications apportées aux autorisations des fichiers et des répertoires sensibles, tels que `/etc/` et `/sbin/`.

## Triage et réponse
1. Vérifier si les autorisations du fichier ou du répertoire ont été assouplies.
2. Identifier l'utilisateur ou le processus à l'origine de la modification.
3. Si ces modifications sont inattendues, confiner le host ou le conteneur et rétablir la dernière configuration valide connue.