---
description: Configurez des connexions de partage de données inter-organisations à
  l'aide de l'API pour permettre des insights entre plusieurs organisations de votre
  compte.
title: API de connexions inter-organisations
---

{{< callout url="#" btn_hidden="true">}}
  La visibilité inter-organisations est en version bêta.
{{< /callout >}}

La [visibilité inter-organisations][1] permet aux clients de partager des données entre différentes organisations au sein d'un même compte, et d'afficher en un seul endroit des informations provenant de plusieurs organisations.

Ce document décrit comment configurer les connexions inter-organisations via l'API. Pour configurer les connexions via l'interface utilisateur, voir [visibilité inter-organisations][1].

## Endpoint de l'API

Configurez les connexions via le point de terminaison de l'API publique `/api/v2/org_connections`. La clé d'application que vous utilisez pour vous authentifier auprès du point de terminaison doit disposer des autorisations [`org_connections_write`][2] et [`org_connections_read`][2].

## Lister les connexions

Répertoriez toutes les connexions auxquelles cette organisation participe, en tant qu'organisation source ou organisation de destination. Répertorier les connexions nécessite l'autorisation _Org Connections Read_.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://{datadog_site}/api/v2/org_connections

### Exemple
{{< code-block lang="json" collapsible="true" >}}
curl -X get "https://{datadog_site}/api/v2/org_connections/" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
{{< /code-block >}}

## Établir une connexion

Crée une connexion de cette organisation vers l'organisation de destination. Vous devez effectuer cette opération depuis l'organisation destinée à devenir source. La création de connexions nécessite l'autorisation _Org Connections Write_.

<span style="padding:3px" class="font-semibold text-api-post bg-bg-api-post">POST</span> https://{datadog_site}/api/v2/org_connections

**Remarque :** la charge utile de cet appel requiert l'UUID de l'organisation de destination. Obtenez l'UUID de l'organisation de destination à partir de l'[endpoint][3] "List your managed organizations".

### Exemple
{{< code-block lang="json" collapsible="true" >}}
curl -X POST "https://{datadog_site}/api/v2/org_connections" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
   -d '{
        "data": {
          "type": "org_connection",
          "relationships": {
              "sink_org": {
                  "data": {
                      "type": "orgs",
                      "id": "{{the destination organization UUID}}"
                  }
              }
          }
      }
  }'
{{< /code-block >}}

### Scénarios de défaillance

- La connexion existe déjà
- La connexion fait référence à un ID d'organisation de destination en dehors du compte

## Mettre à jour une connexion

Met à jour le type de connexion d'une connexion existante. Vous devez effectuer cette opération depuis l'organisation source. La mise à jour des connexions nécessite l'autorisation _Org Connections Write_.

<span style="padding:3px" class="font-semibold text-api-delete bg-bg-api-delete">PATCH</span> https://{datadog_site}/api/v2/org_connections/{connection_id}

**Remarque :** la charge utile de cet appel requiert l'UUID de la connexion. Obtenez l'UUID de la connexion à partir de l'[endpoint][3] "List your managed organizations".

### Exemple
{{< code-block lang="json" collapsible="true" >}}
curl -X PATCH "https://{datadog_site}/api/v2/org_connections" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
   -d '{
        "data": {
          "type": "org_connection",
          "id": "{{the connection UUID}}",
          "attributes": {
              "connection_types": [
                  "logs",
                  "metrics"
              ]
        }
      },
  }'
{{< /code-block >}}

### Scénarios de défaillance

- L'organisation ne participe pas à la connexion en tant que source
- La connexion n'existe pas

## Supprimer une connexion

Supprime une connexion. Effectuez cette opération depuis l'organisation source ou depuis l'organisation de destination. Référencez la connexion à supprimer à l'aide de son ID, que vous pouvez obtenir via la requête [Lister les connexions](#lister-les-connexions). La suppression des connexions nécessite l'autorisation _Org Connections Write_.

<span style="padding:3px" class="font-semibold text-api-delete bg-bg-api-delete">DELETE</span> https://{datadog_site}/api/v2/org_connections/{connection_id}

### Exemple
{{< code-block lang="json" collapsible="true" >}}
curl -X DELETE "https://{datadog_site}/api/v2/org_connections/{connection_id}" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
{{< /code-block >}}



### Scénarios de défaillance

- L'organisation ne participe pas à la connexion en tant que source ou destination
- La connexion n'existe pas

[1]: /fr/account_management/org_settings/cross_org_visibility
[2]: /fr/account_management/rbac/permissions/#access-management
[3]: /fr/api/latest/organizations/#list-your-managed-organizations