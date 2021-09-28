---
aliases:
  - /fr/e59-lrj-bki
  - /fr/security_monitoring/default_rules/e59-lrj-bki
  - /fr/security_monitoring/default_rules/ssh_authorized_keys
disable_edit: true
fim: 'true'
integration_id: file integrity monitoring
kind: documentation
rule_category:
  - Workload Security
source: file integrity monitoring
title: Modification des clés SSH autorisées
type: security_rules
---
## Objectif
Détecter les modifications apportées aux clés SSH autorisées

## Stratégie
Le protocole SSH est une solution d'authentification courante basée sur des clés. Pour ce système, le fichier authorized_keys indique les clés SSH pouvant être utilisées afin de procéder à l'authentification d'un utilisateur précis. Une personne malveillante peut modifier le fichier authorized_keys de façon à autoriser des clés SSH lui appartenant. Cela lui permettrait de conserver son accès au système, en passant pour un utilisateur spécifique.

## Triage et réponse
1. Vérifier la nature des modifications apportées au fichier authorized_keys, ainsi que l'utilisateur concerné.
2. Déterminer si des clés ont été ajoutées. Si c'est le cas, vérifier si les clés ajoutées appartiennent à des utilisateurs fiables connus.
3. Si ces clés ne sont pas acceptables, rétablir la dernière configuration SSH fiable connue du host ou du conteneur concerné.