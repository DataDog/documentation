---
description: Comparez le mode Just-In-Time (JIT) et les Deployment Gates préconfigurés,
  puis suivez le guide de configuration pour le mode choisi.
further_reading:
- link: /deployment_gates/setup/jit
  tag: Documentation
  text: Configurez des barrières de déploiement Just-In-Time (JIT)
- link: /deployment_gates/setup/preconfigured
  tag: Documentation
  text: Configurez des portes de déploiement préconfigurées
- link: /deployment_gates/explore
  tag: Documentation
  text: En savoir plus sur l'explorer de portes de déploiement
- link: /api/latest/deployment-gates
  tag: Référence API
  text: Référence de l'API des portes de déploiement
title: Configurez les Deployment Gates
---
Les Deployment Gates comportent deux composants principaux :

- Un **Deployment Gate** est défini pour un service et un environnement (et éventuellement un identifiant), et évalue une ou plusieurs règles pour décider si un déploiement doit se poursuivre.
- Une **règle** est un type d'évaluation effectuée dans le cadre d'un Deployment Gate, comme la vérification de l'état d'un ensemble de moniteurs ou l'exécution d'une analyse de détection de déploiement défectueux APM sur la version déployée.

Les évaluations de Deployment Gate sont asynchrones : l'API renvoie immédiatement un ID d'évaluation, et le résultat devient `pass` ou `fail` au fil du temps à mesure que les règles s'exécutent.

## Modes d'évaluation des Deployment Gates {#deployment-gate-evaluation-modes}
Les Deployment Gates prennent en charge deux modes d'évaluation : Just-In-Time (JIT) et préconfigurés.


| | **[JIT][1]** (par défaut) | **[Préconfiguré][2]** |
|---|---|---|
| **Emplacement des règles** | Intégrées à votre configuration de déploiement ou à votre étape CI | Persistées dans Datadog (UI, API ou Terraform) |
| **Configuration dans Datadog** | Aucune| Création préalable d'une Deployment Gate et des règles|
| **Idéal pour** | Règles en tant que code, flexibilité par déploiement, équipes gérant leur propre configuration de Deployment Gate | Règles partagées entre services, gestion centralisée, modification hors CI |
| **Comment évaluer** | Envoyez les règles dans la requête d'évaluation | Référencez la Deployment Gate par service, environnement et éventuellement identifiant |

Vous pouvez utiliser différents modes pour différentes Deployment Gates si nécessaire.

Si vous ne savez pas par où commencer, utilisez le mode JIT. Il ne nécessite aucune configuration dans Datadog et vous permet d'itérer sur les règles directement dans votre configuration de déploiement.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/deployment_gates/setup/jit
[2]: /fr/deployment_gates/setup/preconfigured