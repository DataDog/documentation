---
app_id: salesforce-commerce-cloud
app_uuid: fe465a7e-7702-40fb-9a88-a0e4198d1983
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Salesforce Commerce Cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: salesforce_commerce_cloud
integration_id: salesforce-commerce-cloud
integration_title: Salesforce Commerce Cloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: salesforce_commerce_cloud
public_title: Salesforce Commerce Cloud
short_description: Importer vos logs Salesforce Commerce Cloud dans Datadog
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  configuration: README.md#Setup
  description: Importer vos logs Salesforce Commerce Cloud dans Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Salesforce Commerce Cloud
---

## Présentation

Salesforce Commerce Cloud est une plateforme de commerce cloud multi-locataires. Intégrez Salesforce Commerce Cloud à Datadog pour consulter et parser vos logs à l'aide des [logs Datadog][1].

## Implémentation

### Installation

Aucune installation n'est requise.

### Configuration

Pour configurer Salesforce Commerce Cloud de sorte que Datadog ait accès aux données de log et puisse les importer, vous devez créer un client API et l'enregistrer auprès de Datadog.

#### Créer un client API
1. Suivez les [instructions de Commerce Cloud relatives à la création d'un client][2] (en anglais). Dans le champ `Token Endpoint Auth Method`, choisissez `private_key_jwt`. Dans le champ `Access Token Format`, choisissez `UUID`. **Remarque** : cette intégration ne prend en charge que les clients API provisionnés à l'aide de l'instance Account Manager principale sur `https://account.demandware.com/`.
2. Notez l'identifiant et le secret du client API. Vous en aurez besoin dans les étapes suivantes.
3. Dans votre interface Business Manager, sous **Administration >  Organization >  WebDAV Client Permissions**, ajoutez le code JSON suivant. Veillez à insérer l'identifiant de votre client à l'endroit prévu à cet effet.

```json
{  
   "clients":[  
      {  
         "client_id":"<identifiant-de-votre-client>",
         "permissions":[  
            {  
               "path":"/logs",
               "operations":[  
                  "read"
               ]
            }
         ]
      }
   ]
}
```

#### Connecter l'intégration Datadog

1. Cliquez sur **Add New** dans l'onglet Configuration du [carré d'intégration Salesforce Commerce Cloud][3].
2. Saisissez votre domaine Business Manager (exemple : `my-0001.sandbox.us02.dx.commercecloud.salesforce.com`), ainsi que l'identifiant et le secret du client API obtenus à l'étape précédente.
3. Cliquez sur le bouton **Save** représenté par une coche verte.

#### Résultats

Patientez dix minutes le temps que les [logs][1] soient transmis depuis la source `salesforce.commerce.cloud`. 

Le Log Center de SFCC ne présente pas les données de log de la même manière que Datadog. Par exemple, certains logs d'erreurs contenant de longues stack traces sont divisés en deux événements de log dans le Log Center de SFCC, tandis que les détails des stack traces sont omis dans Datadog. Les deux systèmes n'indiquent par conséquent pas le même nombre total d'événements de log.

## Données collectées

### Métriques

L'intégration Salesforce Commerce Cloud n'inclut aucune métrique.

### Logs

L'intégration Salesforce Commerce Cloud collecte les logs via une connexion WebDAV avec votre instance Commerce Cloud. 

### Checks de service

L'intégration Salesforce Commerce Cloud n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: /fr/logs/
[2]: https://documentation.b2c.commercecloud.salesforce.com/DOC3/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Faccount_manager%2Fb2c_account_manager_overview.html
[3]: https://app.datadoghq.com/account/settings#integrations/salesforce-commerce-cloud
[4]: https://docs.datadoghq.com/fr/help/