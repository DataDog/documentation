---
aliases:
  - /fr/xt5-0xp-nsj
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - Agent de runtime
scope: ''
security: compliance
source: Surveillance de l'intégrité d'un fichier
title: Binaires système stratégiques
type: security_rules
---
## Présentation

## Description
Détecter les modifications apportées aux binaires système stratégiques.

## Meilleure pratique
La norme PCI-DSS désigne le framework de conformité de l'industrie des cartes de paiement. Afin de gérer des transactions et des données de cartes bancaires pour les principales sociétés émettrices, les systèmes de paiement doivent respecter la norme PCI-DSS. La condition 11.5 du framework PCI-DSS stipule que les organisations doivent « alerter le personnel de toute modification non autorisée (y compris des changements, des ajouts et des suppressions) des fichiers de configuration, des fichiers de contenu et des fichiers système stratégiques ». Sous Linux, les binaires système stratégiques sont généralement stockés dans `/bin/`, `/sbin/` ou `/usr/sbin/`. Cette règle surveille toutes les modifications apportées à ces répertoires.

## Remédiation
1. Identifier l'utilisateur ou le processus ayant modifié les binaires système stratégiques.
2. Si ces modifications n'ont pas été autorisées, et si leur sécurité ne peut pas être confirmée, rétablir la dernière configuration valide du host ou du conteneur concerné.