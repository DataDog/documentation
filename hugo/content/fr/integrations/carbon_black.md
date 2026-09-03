---
categories:
  - log collection
  - Sécurité
ddtype: crawler
description: "Recueillir vos logs Carbon\_Black\_Defense"
doc_link: https://docs.datadoghq.com/integrations/carbon_black/
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/carbon_black.md
has_logo: true
integration_title: "Carbon\_Black"
is_public: true
custom_kind: integration
name: carbon_black
public_title: "Intégration Datadog/Carbon\_Black"
short_description: "Recueillir vos logs Carbon\_Black\_Defense"
version: '1.0'
integration_id: carbonblack
---
## Présentation

Utilisez l'intégration Datadog/Carbon Black pour transmettre vos événements et alertes EDR Carbon Black sous la forme de logs Datadog.


## Configuration

### Installation

Datadog utilise le forwarder d'événements Carbon Black, ainsi que le Forwarder Lambda de Datadog, pour recueillir des événements et des alertes Carbon Black depuis votre compartiment S3.

Carbon Black propose une fonctionnalité de [collecte Postman][1] pour l'API servant à créer le forwarder d'événements Carbon Black.

#### Configuration

1. [Installez le Forwarder Datadog][2].
2. [Créez un compartiment dans AWS Management Console][3] afin d'y stocker vos événements.
3. [Configurez le compartiment S3 de façon à ce que le forwarder Carbon Black puisse écrire des données][4].
   - **Attention** : le nom du compartiment S3 rassemblant les événements CB doit commencer par le mot-clé `carbon-black`. Cela permet à Datadog d'identifier correctement la source des logs.
5. [Créez un niveau d'accès dans la console Carbon Black Cloud][5].
6. [Créez une clé d'API dans la console Carbon Black Cloud][6].
7. [Configurez l'API dans Postman][7] en remplaçant la valeur des variables d'environnement Postman `cb_url`, `cb_org_key`, `cb_custom_id` et `cb_custom_key` par la clé créée lors de l'étape précédente.
8. [Créez deux forwarders d'événements Carbon Black][8] avec des noms distincts pour les alertes (`"type": "alert"`) et les événements d'endpoint (`"type": "endpoint.event"`).
9. [Configurez le Forwarder Datadog de façon à ce qu'il se déclenche sur le compartiment S3][9].


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://documenter.getpostman.com/view/7740922/SWE9YGSs?version=latest
[2]: /fr/serverless/libraries_integrations/forwarder/
[3]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-a-bucket
[4]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#configure-bucket-to-write-events
[5]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-access-level
[6]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-new-api-key
[7]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#configure-api-in-postman
[8]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-new-forwarder
[9]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[10]: /fr/help/