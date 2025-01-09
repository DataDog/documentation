---
app_id: scadamods-kepserver
app_uuid: fbf2e54c-4985-4de5-aa2b-cf592fc5c4f8
assets:
  dashboards:
    Kepserver Overview Demonstration: assets/dashboards/scadamods_kepserver_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: scadamods.kepserver.configured.tags.count
      metadata_path: metadata.csv
      prefix: scadamods.kepserver.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Scadamods Kepserver
author:
  homepage: http://www.scadamods.com
  name: ScadaMods
  sales_email: info@scadamods.com
  support_email: support@scadamods.com
  vendor_id: scadamods
categories:
  - marketplace
  - cloud
  - iot
  - log collection
classifier_tags:
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Cloud
  - Category::IOT
  - Category::Log Collection
  - Offering::Integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: scadamods_kepserver
integration_id: scadamods-kepserver
integration_title: ScadaMods Kepserver
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: scadamods_kepserver
pricing:
  - billing_type: tag_count
    includes_assets: true
    metric: datadog.marketplace.scadamods.kepserver
    product_id: kepserver
    short_description: KesperverEx de Kepware est un middleware pour les applications SCADA. Cette intégration permet de surveiller les événements, logs et changements de configuration d'une application.
    tag: device
    unit_label: Instances de host Kepserver
    unit_price: 142.99
public_title: ScadaMods Kepserver
short_description: Surveillez les activités liées à l'application SCADA Kepserver.
supported_os:
  - windows
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Surveillez les activités liées à l'application SCADA Kepserver.
  media:
    - caption: Présentation de Kepserver et exemple d'utilisation de l'intégration Datadog
      image_url: images/scadamods-kepserver-thumbnail.png
      media_type: video
      vimeo_id: 630489715
    - caption: Configuration de l'API pour l'accès aux logs
      image_url: images/kepserver_api_conf.png
      media_type: image
    - caption: Activation du service d'API
      image_url: images/kepserver_conf_api_en.png
      media_type: image
    - caption: Activation de la capture de diagnostic sur un canal
      image_url: images/kepserver_conf_statistics_enable.png
      media_type: image
    - caption: Paramètres pour la configuration à partir des icônes de la barre des tâches Windows
      image_url: images/kepserver_conf_tray_settings.png
      media_type: image
    - caption: Paramètres pour la gestion des utilisateurs
      image_url: images/kepserver_conf_user.png
      media_type: image
    - caption: Documentation de l'API REST
      image_url: images/kepserver_web.png
      media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ScadaMods Kepserver
---
## Présentation
L'intégration Scadamods Kepserver permet de surveiller les modifications apportées aux canaux, aux appareils et aux tags. Elle récupère les événements issus du journal des événements de Kepserver et les affiche en temps réel sur votre dashboard Datadog. Grâce à l'API de configuration de Kepserver, cette intégration recueille des détails qui vous permettent de vérifier la configuration des canaux, des appareils et des tags mis en œuvre sur chaque instance de Kepserver.

## Données collectées

### Métriques
{{< get-metrics-from-git "scadamods_kepserver" >}}


### Événements

Le check Kepserver envoie l'ensemble des logs d'événement fournis par l'API de log d'événement Kepserver.

### Checks de service

**scadamods_kepserver.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'instance Kepserver qu'il surveille et à y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

### 1. Erreur d'accès non autorisé

Symptôme : le check Kepserver renvoie la valeur `CRITICAL` lorsqu'il ne parvient pas à se connecter à l'instance Kepserver.

Logs : le check Kepserver enregistre le message d'erreur suivant dans les logs :
```Failed to retrieve Kepserver Event Logs: 401 Client Error: Unauthorized for url: http://127.0.0.1:57412//config/v1/event_log?```

Recommandations :

- Vérifiez que l'instance Kepserver est bien lancée.
- Confirmez que l'utilisateur a bien accès à l'endpoint d'API Kepserver en ouvrant l'URL `http://127.0.0.1:57412//config/v1/event_log?` dans un navigateur.
- Si l'utilisateur n'a pas accès à l'endpoint d'API Kepserver, créez un utilisateur avec les autorisations adéquates.
- Accédez à la page d'administration de Kepserver et créez un utilisateur avec les autorisations adéquates.
- Vérifiez que le service d'API de configuration est activé sur l'instance Kepserver. Pour ce faire, accédez à l'onglet correspondant et sélectionnez Yes pour l'option Enable.
- Confirmez que l'endpoint d'API Kepserver est identique au lien « View in browser » dans l'onglet des services d'API de configuration.
- Confirmez que le nom d'utilisateur et le mot de passe sont corrects dans le fichier `scadamods_kepserver.d/conf.yaml`.

### 2. Échec de la collecte des métriques OPC-UA

Description : les métriques OPC-UA proviennent de la fonction de diagnostic système de Kepserver. Cette fonction est désactivée par défaut et doit donc être activée dans les propriétés OPC-UA du projet. Le `node_id` désigne le serveur à partir duquel les métriques OPC-UA sont collectées. Si le serveur n'est pas lancé, le `node_id` ne sera pas trouvé par le client. Le `node_id` correspond à `ns=2` par défaut pour l'instance Kepserver. Si vous souhaitez modifier ce paramètre, contactez support@scadamods.com.

Symptôme : le check Kepserver ne capture pas les métriques OPC-UA pour les diagnostics système.

Logs : le check Kepserver enregistre le message d'erreur suivant dans les logs :

``` OPC UA metric request failed: "The node id refers to a node that does not exist in the server address space."(BadNodeIdUnknown)```

Recommandations :
- Vérifiez que les diagnostics système sont activés dans Kepserver.
- Accédez à la page des propriétés du projet Kepserver et sélectionnez l'onglet OPC-UA. Vérifiez que l'option `Log diagnostics` est définie sur `Yes`. 



Besoin d'aide supplémentaire ? Contactez l'[assistance Datadog][8] ou [support@scadamods.com][15].

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez Scadamods :
- E-mail : support@scadamods.com

---
Développé avec la force 💪 de l'industrie

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous][15] et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace Datadog et développée par un partenaire technologique de Datadog. [Cliquez ici pour l'acheter][18].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Guide d'utilisation de KesperverEx][9]

[1]: https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/scadamods_kepserver.yaml.example
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/scadamods_kepserver/datadog_checks/scadamods_kepserver/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/scadamods_kepserver/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://github.com/scadadog/public_artifacts/blob/master/kepserverex-manual.pdf
[10]: https://www.kepware.com/getattachment/6882fe00-8e8a-432b-b138-594e94f8ac88/kepserverex-secure-deployment-guide.pdf
[11]: https://www.kepware.com/getattachment/f38ad6fe-be2e-40cc-9481-11d9e85c980c/configuration-api-made-easy.pdf
[12]: https://www.kepware.com/en-us/products/kepserverex/
[13]: https://www.kepware.com/getattachment/f5b80059-b32a-43ae-8fec-42183f890755/KEPServerEX_installation_guide_v610.pdf
[14]: https://www.datadoghq.com/
[15]: mailto:support@scadamods.com
[16]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[17]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[18]: https://app.datadoghq.com/marketplace/app/scadamods-kepserver/pricing