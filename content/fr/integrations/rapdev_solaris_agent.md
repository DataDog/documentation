---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- marketplace
"creates_events": false
"ddtype": "check"
"dependencies": []
"display_name": "Agent Solaris par RapDev"
"draft": false
"git_integration_title": "rapdev_solaris_agent"
"guid": "3717994a-49c4-4693-902a-85c8123b699c"
"integration_id": "rapdev-solaris-agent"
"integration_title": "Agent Solaris par RapDev"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.solaris_agent."
"metric_to_check": ""
"name": "rapdev_solaris_agent"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.rapdev.solaris_agent
  "tag": host
  "unit_label": Agent Solaris
  "unit_price": !!float "40.0"
"public_title": "Agent Solaris par RapDev"
"short_description": "Agent système fournissant des métriques pour Solaris 10 et 11, et pour les architectures sparc et i86pc"
"support": "partner"
"supported_os": []
"terms":
  "eula": assets/EULA.pdf
  "legal_email": ddsales@rapdev.io
---


## Présentation

L'Agent Solaris vous permet de recueillir et d'analyser des métriques système Solaris dans Datadog. L'intégration prend en charge Solaris 10 et 11, ainsi que les architectures SPARC et i86pc. L'Agent Solaris utilise la distribution système Perl par défaut de Solaris et ne nécessite pas de dépendances de bibliothèques supplémentaires, ce qui simplifie l'installation et la compatibilité.

L'Agent Solaris fournit les métadonnées de host requises pour prendre en charge la liste d'infrastructures de Datadog, ce qui permet à votre organisation de travailler avec des systèmes de host Solaris similaires à d'autres systèmes d'exploitation de host pris en charge par Datadog.

L'Agent Solaris utilise les mêmes URL et ports que les Agents natifs. L'Agent Solaris ne prend actuellement en charge que les métriques d'infrastructure core et les tails de logs. Il ne prend en charge aucun check d'Agent, aucune intégration ni aucun check de service.

### Agent Solaris dans la liste d'infrastructures

{{< img src="marketplace/rapdev_solaris_agent/images/1.png" alt="Screenshot1" >}}

{{< img src="marketplace/rapdev_solaris_agent/images/3.png" alt="Screenshot3" >}}

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

 - E-mail : integrations@rapdev.io 
 - Chat : [RapDev.io/products](https://rapdev.io/products)
 - Téléphone : 855-857-0222 

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:integrations@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/rapdev-solaris-agent/pricing) pour l'acheter.

