---
aliases:
  - /fr/wnt-129-8hr
  - /fr/security_monitoring/default_rules/wnt-129-8hr
  - /fr/security_monitoring/default_rules/ssl_certificate_tampering
disable_edit: true
fim: 'true'
integration_id: surveillance de l'intégrité des fichiers
kind: documentation
rule_category:
  - Sécurité de la charge de travail
source: surveillance de l'intégrité des fichiers
title: Altération des certificats SSL
type: security_rules
---
## Objectif
Détecter les potentielles altérations des certificats SSL.

## Stratégie
Les certificats SSL, ainsi que d'autres contrôles fiables, établissent une relation de confiance entre des systèmes. Une personne malveillante peut tenter de contourner ces contrôles (par exemple un certificat SSL) pour inciter les systèmes ou les utilisateurs à faire confiance à des ressources dangereuses, telles que de faux sites Web ou des applications sans certificat valide.

## Triage et réponse
1. Vérifier si des modifications ont été planifiées pour les magasins de certificats SSL de votre infrastructure.
3. Si ces modifications ne sont pas acceptables, rétablir la dernière configuration fiable connue du host ou du conteneur concerné.