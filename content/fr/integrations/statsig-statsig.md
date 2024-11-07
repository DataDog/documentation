---
"app_id": "statsig-statsig"
"app_uuid": "289b74cb-ad37-4a0e-98f5-4d5c6f3e3d19"
"assets":
  "integration":
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": ""
      "metadata_path": metadata.csv
      "prefix": statsig.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_name": Licence Statsig
"author":
  "homepage": "https://www.statsig.com"
  "name": Statsig
  "sales_email": serviceadmin@statsig.com
  "support_email": support@statsig.com
  "vendor_id": statsig
"categories":
- marketplace
"classifier_tags":
- "Supported OS::Linux"
- "Supported OS::Mac OS"
- "Supported OS::Windows"
- "Category::Marketplace"
- "Offering::Software License"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "statsig-statsig"
"integration_id": "statsig-statsig"
"integration_title": "Statsig"
"integration_version": ""
"is_public": true
"custom_kind": "integration"
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "statsig-statsig"
"oauth": {}
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.statsig.log
  "product_id": statsig
  "short_description": Prix unitaire par millier d'événements de log Statsig
  "tag": event
  "unit_label": Mille événements de log Statsig
  "unit_price": !!float "0.1"
"public_title": "Statsig"
"short_description": "Créez, analysez et déployez plus rapidement vos nouvelles fonctionnalités pour mieux satisfaire vos clients"
"supported_os":
- linux
- mac os
- windows
"tile":
  "configuration": "README.md#Setup"
  "description": Créez, analysez et déployez plus rapidement vos nouvelles fonctionnalités pour mieux satisfaire vos clients
  "media":
  - "caption": Déployez et ciblez de nouvelles fonctionnalités sans risque grâce aux feature gates
    "image_url": images/tile_gates.png
    "media_type": image
  - "caption": Mesurez l'impact de vos fonctionnalités sur vos métriques clés à l'aide des résultats Pulse générés automatiquement pour chaque feature gate
    "image_url": images/tile_pulse.png
    "media_type": image
  - "caption": Déterminez si vos fonctionnalités ont un impact positif ou négatif sur vos métriques avec Ultrasound
    "image_url": images/tile_ultrasound.png
    "media_type": image
  - "caption": Déterminez les effets de vos déploiements de fonctionnalités sur le reste de votre stack de production via Datadog
    "image_url": images/tile_datadog_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Statsig
---



## Présentation

[Statsig](https://www.statsig.com) permet aux entreprises d'effectuer des tests A/B de leurs fonctionnalités en production sans risque avant de les déployer, de façon à limiter les débats sans fin et les erreurs de lancement coûteuses. Statsig se démarque par sa capacité à exécuter des tests automatiquement en recueillant simplement des événements, vous permettant ainsi d'évaluer l'impact de vos nouvelles fonctionnalités sans configuration supplémentaire. Les autres plateformes ne permettent pas de déterminer aussi facilement les performances d'une fonctionnalité, vous obligeant à créer des métriques, à calculer la taille des échantillons et à segmenter les utilisateurs pour chaque test à exécuter. Ce n'est pas le cas de Statsig : les tâches rébarbatives sont automatisées et les tests A/B sont exécutés en permanence, vous permettant d'évaluer en continu les performances de vos fonctionnalités.

En tant qu'anciens ingénieurs Facebook, nous avons créé Statsig pour offrir à chacun une infrastructure unique permettant à des centaines d'équipes différentes de lancer des milliers de fonctionnalités avec une grande précision.

Cette solution du Marketplace vous permet d'accéder à la plateforme Statsig. Si vous avez déjà souscrit à Statsig, vous pouvez connecter votre compte à Datadog via l'[intégration Datadog/Statsig](https://app.datadoghq.com/account/settings#integrations/statsig).

{{< img src="marketplace/statsig-statsig/images/statsig_pulse.png" alt="Statsig Pulse" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_gates.png" alt="Statsig Gates" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_metrics.png" alt="Métriques Statsig" >}}

## Données collectées

### Métriques

Consultez [metadata.csv](https://github.com/DataDog/marketplace/blob/master/statsig/metadata.csv) pour obtenir la liste des métriques fournies par cette intégration ainsi que la description de chaque métrique.

### Événements

L'intégration Statsig envoie les événements de changement de configuration sur Statsig à Datadog. Il s'agit par exemple des ajouts ou mises à jour de feature gates, ou des activations de nouvelles intégrations.

## Assistance

Besoin d'aide ? Contactez l'assistance Statsig à l'adresse support@statsig.com ou sur [ce site](https://www.statsig.com/contact).

