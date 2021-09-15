---
aliases:
  - /fr/pzv-32s-1sa
  - /fr/security_monitoring/default_rules/pzv-32s-1sa
  - /fr/security_monitoring/default_rules/nsswitch_conf_mod
disable_edit: true
fim: 'true'
integration_id: surveillance de l'intégrité des fichiers
kind: documentation
rule_category:
  - Sécurité de la charge de travail
source: surveillance de l'intégrité des fichiers
title: Modification de configuration Nsswitch
type: security_rules
---
## Objectif
Détecter les modifications apportées à nsswitch.conf.

## Stratégie
Le fichier de configuration de Name Service Switch (nsswitch) est utilisé pour établir un lien entre les services système ou d'autres applications et les sources des informations name-service. Ces dernières comprennent l'emplacement de stockage du fichier de mot de passe, des données sur la clé publique, et plus encore. Une personne malveillante peut tenter de modifier le fichier nsswitch.conf afin d'injecter ses propres informations dans le processus d'authentification. Elle pourrait ainsi pointer vers un fichier de mot de passe erroné afin d'accéder à des comptes utilisateur privilégiés.

## Triage et réponse
1. Vérifier la nature des modifications apportées au fichier nsswitch.conf.
2. Vérifier si des sources name-service essentielles ont été modifiées, et si ces éventuelles modifications ont été effectuées dans le cadre d'une configuration système ou d'une maintenance normale.
3. Si ces modifications ne sont pas autorisées, rétablissez la dernière configuration nsswitch.conf valide connue du host ou remplacez le système par une image système valide connue.