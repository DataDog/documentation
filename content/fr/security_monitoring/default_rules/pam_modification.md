---
aliases:
  - /fr/tz1-6vg-1yz
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - Agent de runtime
scope: ''
security: compliance
source: Surveillance de l'intégrité d'un fichier
title: Modification des fichiers de configuration PAM
type: security_rules
---
## Présentation

## Objectif
Détecter les modifications apportées au répertoire `pam.d`.

## Stratégie
Les modules d'authentification enfichables ou PAM (Pluggable Authentication Modules) Linux servent à authentifier des applications et des services. Les modules d'authentification du système PM sont configurés dans le répertoire `/etc/pam.d/`. Une personne malveillante peut tenter de modifier ou d'ajouter un module d'authentification dans le système PAM afin de contourner le processus d'authentification ou de dévoiler des identifiants système.

## Triage et réponse
1. Vérifier la nature des modifications apportées à `/etc/pam.d/`.
2. Vérifier si les modifications ont été effectuées dans le cadre d'une configuration système ou d'une maintenance normale.
3. Si ces modifications n'ont pas été autorisées, rétablissez la dernière configuration PAM valide connue du host ou remplacez le système par une image système valide connue.