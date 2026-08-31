---
algolia:
  tags:
  - ci visibility
  - ci visibility billing
  - ci visibility billing questions
  - ci visibility pricing
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: En savoir plus sur Pipeline Visibility
- link: /continuous_integration/guides/ingestion_control
  tag: Documentation
  text: En savoir plus sur les contrôles d'ingestion pour CI Visibility
title: Facturation de CI Visibility
---

## Section Overview

Ce guide fournit une liste non exhaustive de considérations relatives à la facturation pour [CI Visibility][1].

## Compter les contributeurs

Un contributeur est une personne active sur Git, identifiée par son adresse e-mail d'auteur Git. À des fins de facturation, un contributeur est comptabilisé s'il effectue au moins trois commits au cours d'un mois donné.

## Facturation des commits effectués par des bots ou des actions réalisées dans l'interface GitHub

Datadog ne facture pas les bots ni les commits résultant d'actions réalisées dans l'interface GitHub. Ces types de commits sont exclus des calculs de facturation.

## Exclure les commits de certaines personnes

Oui, vous pouvez exclure les commits de certaines personnes en utilisant les [filtres d'exclusion][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/pipelines
[2]: /fr/continuous_integration/guides/ingestion_control