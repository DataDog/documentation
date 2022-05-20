---
"app_id": "rapdev-services"
"app_uuid": "d4ce75bc-bb79-49d9-85d0-f1c67bdf5c78"
"assets":
  "integration":
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": ""
      "prefix": ""
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_name": RapDev Services
  "logs": {}
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
  "sales_email": ddsales@rapdev.io
  "support_email": datadog-engineering@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
"classifier_tags":
- "Supported OS::Linux"
- "Supported OS::Mac OS"
- "Supported OS::Windows"
- "Category::Marketplace"
- "Offering::Professional Service"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_services"
"integration_id": "rapdev-services"
"integration_title": "RapDev Services"
"integration_version": ""
"is_public": true
"kind": "integration"
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_services"
"oauth": {}
"pricing":
- "billing_type": one_time
  "includes_assets": true
  "product_id": services
  "short_description": Frais uniques pour cette intégration
  "unit_price": !!int "50000"
"public_title": "RapDev Services"
"short_description": "Implémentation des services pour la plateforme Datadog"
"supported_os":
- linux
- mac os
- windows
"tile":
  "configuration": "README.md#Setup"
  "description": Implémentation des services pour la plateforme Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": RapDev Services
---


## Présentation
Cette offre comprend un forfait à coût fixe composé d'un accompagnement de quatre semaines assuré par Datadog, sous la forme d'ateliers à distance, suivi de la mise en place d'échanges avec l'équipe SRE RapDev pendant une durée de 30 jours. RapDev LLC est fier de proposer des prestations qui respectent votre calendrier et votre budget. Plus important encore, l'entreprise s'efforce de vous fournir la flexibilité dont vous avez besoin. Pour garantir le succès de ce partenariat, il est comme souvent essentiel de bien communiquer et de s'adapter aux objectifs de chacun.

### Dans le cadre de son atelier de prise en main et de conseil, Datadog propose les prestations suivantes :
- Aide à la mise en place des pratiques recommandées pour la plateforme
- Recommandations quant aux stratégies de tagging et aux meilleures pratiques
  - Fourniture du plug-in de validation des tags de RapDev et installation sur l'Agent Datadog
    - Le validateur de tags accepte une liste de clés de tag requises et leurs valeurs possibles dans le fichier conf.yaml.
    - Vérification des hosts en cours d'exécution dans l'instance Datadog de l'utilisateur
    - Vérifiez que les clés de tag sont bien présentes sur les hosts, et que la valeur de ces clés correspond à l'une des valeurs autorisées définies dans le fichier conf.yaml.
    - Présentation du processus à suivre pour ajouter des tags au validateur de tags
- Mise en place de cinq checks Synthetic
  - Il peut s'agir de checks Browser ou API.
- Aide pour l'utilisation des intégrations prêtes à l'emploi pour des plateformes tierces comme Microsoft Teams, Slack, ServiceNow, PagerDuty, et plus encore.
- Conseils pour la configuration de dashboards et monitors
- Mise en place de cinq dashboards et de cinq monitors pour surveiller des services
  - Les dashboards et monitors seront créés à partir des données existantes transmises à la plateforme Datadog.
  - Les dashboards et monitors seront conçus en tenant compte des informations découlant des premiers échanges avec les équipes du client et de leurs retours.
  - Modèle Terraform pour un dashboard
- Conseils pour la mise en œuvre des meilleures pratiques de la solution Logging without Limits™
  - Création d'un exemple de filtre Logging without Limits™ (présentation des outils de contrôle des coûts avec des logs configurés/ingérés existants)
- Conseils pour la mise en place d'un module de gestion des clés dans un keystore (Azure Key Vault ou Hashi Vault)

Sont également inclus :
- 30 jours d'accès au canal Slack RapDev.io, afin d'obtenir sans délai des réponses à toutes vos questions concernant Datadog

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- E-mail :  datadog-engineering@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:datadog-engineering@rapdev.io) et nous l'ajouterons !*

