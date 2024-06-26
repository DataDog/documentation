---
app_id: firefly
app_uuid: 58481132-c79e-4659-8064-7cdaabbbc999
assets: {}
author:
  homepage: https://gofirefly.io
  name: Firefly
  sales_email: contact@gofirefly.io
  support_email: contact@gofirefly.io
categories:
- automation
- cloud
- configuration & deployment
- developer tools
- notification
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/firefly/README.md
display_on_public_website: true
draft: false
git_integration_title: firefly
integration_id: firefly
integration_title: Firefly
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: firefly
public_title: Firefly
short_description: Assurer la conformité de votre cloud
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Notification
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Assurer la conformité de votre cloud
  media:
  - caption: Analyse détaillée de votre cloud
    image_url: images/FF-inventory.png
    media_type: image
  - caption: Codification automatique
    image_url: images/FF-codification.png
    media_type: image
  - caption: Détection et correction des écarts
    image_url: images/FF-fix-drifts.png
    media_type: image
  - caption: Détection et correction des violations de stratégie
    image_url: images/FF-insights.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Firefly
---



## Présentation
Firefly est une solution de gestion de ressources cloud qui soutient vos équipes Cloud. Elle leur permet de découvrir leur empreinte cloud (AWS, GCP, Kubernetes ou encore Datadog), de transformer automatiquement les ressources en infrastructure en tant que code (IaC) et de détecter les écarts et violations de stratégie. Votre cloud conserve ainsi l'état souhaité. Grâce à Firefly, vos équipes peuvent gérer vos ressources sous la forme de code, dans l'outil IaC de leur choix. Vos ressources Datadog sont alors immuables, gérées par version, évolutives et surveillées.

### Analyse détaillée de votre cloud
Accédez à la liste complète de toutes vos ressources Datadog et cloud (AWS, Kubernetes, GCP, Okta, etc.). Ces ressources peuvent faire l'objet de recherches.

### Codification automatique
Transformez automatiquement des ressources Datadog simples ou multiples en code, notamment en spécifications Terraform, Pulumi, Cloudformation et CDK.

### Détection et correction des écarts
Recevez des notifications en temps réel en cas d'écart entre votre infrastructure en tant que code (IaC) et l'état réel de votre cloud. Envoyez directement un correctif dans votre référentiel au moment où un écart se produit.

### Détection et correction des violations de stratégie
Utilisez le moteur de stratégie unifiée Firefly pour trouver les problèmes de configuration dangereux ou les sous-utilisations coûteuses, et recevez des alertes en lien avec les violations de stratégie pour les stratégies personnalisées et prédéfinies.

## Configuration

### Configure l'intégration Datadog/Firefly
1. Créez une clé d'application Datadog et une clé d'API.
2. Dans l'interface Firefly, accédez à **Settings > Integrations > Datadog**.
3. Copiez la clé de l'application et collez-la dans la ligne dédiée.
4. Copiez la clé d'API et collez-la dans la ligne dédiée.
5. Cliquez sur **Done**.

## Assistance
Des questions ? Envoyez un e-mail à l'adresse [contact@gofirefly.io][1] ou utilisez le chat intégré à l'application.

[1]: mailto:contact@gofirefly.io