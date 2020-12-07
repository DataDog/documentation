---
aliases:
  - /fr/wnt-129-8hr
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - Agent de runtime
scope: ''
security: compliance
source: Surveillance de l'intégrité d'un fichier
title: Altération des certificats SSL
type: security_rules
---
## Présentation

## Objectif
Détecter les potentielles altérations des certificats SSL.

## Stratégie
Les certificats SSL, ainsi que d'autres contrôles fiables, établissent une relation de confiance entre des systèmes. Une personne malveillante peut tenter de contourner ces contrôles (par exemple un certificat SSL) pour inciter les systèmes ou les utilisateurs à faire confiance à des ressources dangereuses, telles que de faux sites Web ou des applications sans certificat valide.

## Triage et réponse
1. Vérifier si des modifications ont été planifiées pour les magasins de certificats SSL de votre infrastructure.
3. Si ces modifications ne sont pas acceptables, rétablir la dernière configuration fiable connue du host ou du conteneur concerné.