---
description: Utilisez la superposition APM dans Cloudcraft pour visualiser les traces
  distribuées entre les ressources cloud sur vos diagrammes d'architecture.
further_reading:
- link: /datadog_cloudcraft/overlays/infrastructure/
  tag: Documentation
  text: Superposition d'infrastructure
- link: /datadog_cloudcraft/overlays/observability/
  tag: Documentation
  text: Superposition d'observabilité
- link: /datadog_cloudcraft/overlays/security/
  tag: Documentation
  text: Superposition de sécurité
- link: /datadog_cloudcraft/overlays/ccm/
  tag: Documentation
  text: Superposition de Cloud Cost Management
- link: /tracing/
  tag: Documentation
  text: APM
site_support_id: cloudcraft_apm_overlay
title: APM
---
<div class="alert alert-info">La superposition APM est en préversion et est disponible uniquement pour les comptes AWS.</div>

## Présentation {#overview}

La superposition APM affiche les traces APM distribuées sous forme d'arcs entre les ressources cloud sur votre diagramme Cloudcraft. Cela vous aide à comprendre les flux de requêtes de service à service à travers votre infrastructure sans quitter la vue de l'architecture.

Pour ouvrir la superposition, cliquez sur l'onglet {{< ui >}}APM{{< /ui >}} dans le sélecteur de superposition en haut de votre diagramme.

### Types de ressources pris en charge {#supported-resource-types}

La superposition APM affiche les connexions pour les ressources qui incluent un ID de ressource cloud (CCRID) dans leurs données de trace. Les types de ressources suivants sont pris en charge :

- EC2
- S3
- Lambda
- RDS

{{< img src="datadog_cloudcraft/overlays/cloudcraft_apm_overlay_diagram.png" alt="Superposition APM dans Cloudcraft montrant des arcs de trace verts reliant des services sur un diagramme d'architecture AWS, avec le nombre de traces et la légende visibles en bas à gauche." style="width:100%;" >}}

## Prérequis {#prerequisites}

APM doit être actif dans votre organisation Datadog, ce qui signifie qu'au moins un span a été ingéré au cours des 30 derniers jours. Si APM n'est pas configuré, Cloudcraft affiche un écran d'intégration avec des liens pour [configurer APM][1].

## Visualisez les connexions de trace {#visualize-trace-connections}

Lorsque la superposition APM est active, les traces apparaissent sous forme d'arcs courbes entre les nœuds de ressources sur votre diagramme. Chaque arc représente le trafic des traces distribuées entre deux ressources.

### Légende {#legend}

| Couleur de l'arc | Statut |
|-----------|--------|
| Vert     | OK     |
| Rouge       | Erreur  |

Utilisez le panneau de légende en bas de l'écran pour filtrer les traces par statut. La légende affiche également le nombre de traces visibles. Désélectionner tous les statuts réinitialise la vue pour afficher toutes les traces.

## Étudiez les traces {#investigate-traces}

Cliquez sur un arc de trace pour ouvrir un panneau latéral affichant la liste des traces APM entre ces deux ressources. Le panneau latéral comprend :

- Une barre de recherche pour filtrer les traces par requête.
- Un sélecteur de période (par défaut sur les 30 dernières minutes).
- Un {{< ui >}}live mode{{< /ui >}} commutateur pour la diffusion en continu des données de trace.
- Un sélecteur de colonnes pour personnaliser les champs affichés. Les colonnes par défaut incluent Durée, Service, Nom de la ressource et Type d'erreur.
- Un {{< ui >}}open in APM{{< /ui >}} lien pour afficher la même requête dans le [Trace Explorer][2].

Cliquez sur une ligne de trace dans le panneau latéral pour ouvrir la vue détaillée de la trace, qui affiche le graphique en flamme APM standard.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[2]: /fr/tracing/trace_explorer/