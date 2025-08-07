---
app_id: komodor
categories:
- incident-teams
- kubernetes
- notifications
custom_kind: integration
description: Effectuer le suivi des changements relatifs à l'ensemble de votre pile
  et environnement Kubernetes
integration_version: 1.0.0
media:
- caption: Écran principal des services
  image_url: images/Komodor_screen_01.png
  media_type: image
- caption: Chronologie des événements et services connexes de la vue des services
  image_url: images/Komodor_screen_02.png
  media_type: image
- caption: Examen d'un déploiement et des changements associés dans la vue des services
  image_url: images/Komodor_screen_03.png
  media_type: image
- caption: Examen du replicaset d'un déploiement ainsi que de ses pods et logs
  image_url: images/Komodor_screen_04.png
  media_type: image
- caption: Chronologie des événements de plusieurs clusters et déploiements
  image_url: images/Komodor_screen_05.png
  media_type: image
- caption: Alerte de surveillance Datadog dans la vue des services
  image_url: images/Komodor_screen_06.png
  media_type: image
- caption: Lien menant vers Komodor dans la vue des métriques Datadog
  image_url: images/Komodor_screen_07.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Komodor Automation
---
## Section Overview

Komodor suit les changements dans l'ensemble de votre pile K8s, analyse leur effet d'entraînement et vous fournit le contexte dont vous avez besoin pour résoudre les problèmes de manière efficace et indépendante. Komodor vous donne un aperçu de vos déploiements Kubernetes sur une ligne de temps avec des informations pertinentes telles que ce qui a changé, quel code a été poussé, et qui l'a poussé. Vous pouvez également visualiser les données de Git, les cartes de configuration, votre infrastructure, les alertes et d'autres outils tels que Datadog, dans un affichage centralisé et facile à comprendre.

Grâce à cette intégration, vous pouvez associer des métriques Datadog à des liens de déploiement dynamiques et ainsi accéder directement aux dashboards pertinents. Résultat : vous pouvez résoudre les problèmes liés à vos microservices en tenant compte du contexte, des connexions et des dépendances de service que Datadog considère comme pertinents. 

## Configuration

1. log sur la [plate-forme Komodor] (https://app.komodor.com/).

1. Installez l'agent Komodor basé sur les pods sur chaque cluster Kubernetes à l'aide d'un diagramme Helm ou de Kustomize. Pour plus d'informations, voir le [Komodor docs](https://help.komodor.com/hc/en-us/sections/17579101174674-Komodor-Agent) pour l'installation de l'agent.

1. Une fois l'Agent installé, suivez les étapes ci-dessous pour configurer l'intégration Datadog :

   - Installer l'[intégration de la plateforme Komodor] (https://help.komodor.com/hc/en-us/articles/16241138371858-Datadog-Intégration) - Cette première intégration step (étape) permet à Komodor d'accéder à votre compte Datadog via une clé API et un jeton, et de suggérer des services connexes sur la base des dépendances de service détectées dans Datadog.
   - Installez le [Datadog Webhook integration](https://help.komodor.com/hc/en-us/articles/16241177474578-Datadog-Webhook-Integration) - Cela permet à Komodor de recevoir des alertes des moniteurs Datadog. Vous pouvez voir toutes les alertes dans la vue du service Komodor.
   - Configurer une notification Datadog Monitor - L'ajout d'un [lien dynamique] Komodor (https://help.komodor.com/hc/en-us/articles/16241181517714-Datadog-Monitor-Notifications) à Datadog [Monitor notifications](https://docs.datadoghq.com/monitors/notify/) génère un lien direct vers le service concerné dans Komodor. Voir le lien d'alerte dans votre fournisseur d'alerte connecté à Datadog.

1. Utiliser Komodor [annotations] (https://help.komodor.com/hc/en-us/articles/16240380547730-Komodor-Custom-3rd-Party-Links) pour enrichir les écrans de service et de déploiement Komodor avec des liens vers des tableaux de bord pertinents Datadog APM , ainsi que des liens dynamiques vers des mesures de service spécifiques et des plages de temps au sein de Datadog.

## Assistance

Pour plus d'informations, veuillez [visiter notre site web](https://komodor.com/sign-up/) ou [nous contacter](https://komodor.com/contact-us/).