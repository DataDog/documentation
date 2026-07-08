---
description: Découvrir l'architecture, les composants et les fonctionnalités prises
  en charge par CloudPrem
title: Introduction à CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

CloudPrem est la solution BYOC de Log Management de Datadog. Elle s'exécute dans votre propre infrastructure, indexe et stocke les logs dans votre espace de stockage objet, exécute des requêtes de recherche et d'analyse, et se connecte à l'interface Datadog pour offrir une expérience pleinement intégrée avec les produits Datadog. CloudPrem est conçu pour les organisations ayant des exigences spécifiques :
- Résidence des données, confidentialité et conformité réglementaire
- Exigences en matière de volumes importants

Voici une présentation générale du fonctionnement de CloudPrem :

{{< img src="/cloudprem/overview_diagram_cloudprem.png" alt="Présentation de l'architecture CloudPrem montrant comment les logs circulent depuis les sources à travers CloudPrem jusqu'à la plateforme Datadog" style="width:100%;" >}}

Le diagramme illustre l'architecture hybride de CloudPrem, en mettant en évidence la façon dont les données sont traitées et stockées au sein de votre infrastructure :

*   **Ingestion** : les logs sont collectés depuis les Agents Datadog et d'autres sources via des protocoles standards.
*   **Votre infrastructure** : la plateforme CloudPrem s'exécute entièrement dans votre infrastructure. Elle traite et stocke les logs dans votre propre espace de stockage (S3, Azure Blob, MinIO).
*   **Datadog SaaS** : la plateforme Datadog constitue le plan de contrôle de CloudPrem. Elle héberge l'interface Datadog et communique avec CloudPrem via une connexion sécurisée pour envoyer des requêtes de logs et recevoir les résultats.

{{< whatsnext desc="Explorer l'architecture et les fonctionnalités de CloudPrem :">}}
  {{< nextlink href="/cloudprem/introduction/architecture/" >}}Architecture - comprendre comment les composants CloudPrem fonctionnent ensemble{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/network/" >}}Réseau - comprendre comment CloudPrem communique avec Datadog{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/features/" >}}Fonctionnalités prises en charge - voir quelles fonctionnalités du Log Explorer sont disponibles dans CloudPrem{{< /nextlink >}}
{{< /whatsnext >}}

## Prise en main

{{< whatsnext desc="Prêt à déployer CloudPrem ? Suivez ces guides :">}}
  {{< nextlink href="/cloudprem/quickstart/" >}}Démarrage rapide - exécuter CloudPrem localement en 5 minutes{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/" >}}Installation - Déployez CloudPrem sur AWS, Azure ou sur Kubernetes{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/" >}}Installation - déployer CloudPrem sur AWS, Azure ou Kubernetes personnalisé{{< /nextlink >}}
{{< /whatsnext >}}