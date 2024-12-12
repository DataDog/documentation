---
aliases:
- /fr/tracing/service_catalog/integrations
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: Documentation
  text: En savoir plus sur l'API de définition de service
- link: /integrations/opsgenie/
  tag: Documentation
  text: En savoir plus sur l'intégration OpsGenie
- link: /integrations/pagerduty/
  tag: Documentation
  text: En savoir plus sur l'intégration PagerDuty
title: Utiliser les intégrations avec le catalogue des services
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
Les intégrations PagerDuty et OpsGenie pour le catalogue des services ne sont pas prises en charge sur le site {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

## Section Overview

Lorsque vous configurez un compte de service pour une [intégration Datadog][10], vous pouvez incorporer les métadonnées de vos intégrations dans les définitions de service du [catalogue des services][9]. Vous pouvez également utiliser les fonctions de remplissage automatique et de validation lorsque vous modifiez une définition de service dans un [environnement de développement intégré (IDE)](#integrations-ide).

## Intégration PagerDuty

Vous pouvez ajouter des métadonnées de PagerDuty à un service afin que le catalogue des services affiche et renvoie à des informations telles que les personnes qui sont de garde et les incidents en cours liés à PagerDuty pour le service. Étant donné qu'il n'est possible d'afficher qu'un seul utilisateur de garde, Datadog sélectionne le premier utilisateur par niveau d'escalade, puis par adresse électronique en ordre alphabétique.

### Configuration

Vous pouvez connecter n'importe quel service dans le [répertoire de votre service PagerDuty][1]. Vous pouvez mapper un service PagerDuty pour chaque service du catalogue des services.

1. Si vous ne l'avez pas déjà fait, configurez [l'intégration Datadog/PagerDuty][2].

2. Obtenez votre clé d'accès pour l'API PagerDuty comme indiqué dans leur documentation liée aux [clés d'accès d'API][3].

3. Entrez la clé d'accès à l'API lors de la [configuration de l'intégration Pagerduty][4] pour terminer le processus.

  {{< img src="tracing/service_catalog/pagerduty-token.png" alt="Copiez et collez le clé d'API dans la configuration de Pagerduty." style="width:100%;" >}}

4. Mettez à jour la définition du service avec les informations de PagerDuty. Par exemple, insérez les lignes de configuration `integrations` suivantes dans la [définition complète du service][5] :

   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

## Intégration Opsgenie

Vous pouvez ajouter des métadonnées d'OpsGenie à un service afin que le catalogue des services affiche des informations, comme le nom de la personne de garde pour le service, et renvoie à ces informations.

### Configuration

1. Si vous ne l'avez pas déjà fait, configurez [l'intégration Datadog/OpsGenie][12].
2. Obtenez votre clé d'accès à l'API OpsGenie comme décrit dans leur documentation relative à la [gestion des clés d'API][13]. Cette clé d'API nécessite des droits d'accès **configuration access** et **read**.
3. Ajoutez un compte dans la section **Accounts** en bas du [carré d'intégration][14], collez votre clé d'accès à l'API OpsGenie, et sélectionnez la région de votre compte OpsGenie.

   {{< img src="tracing/service_catalog/create_account1.png" alt="Le workflow Create New Account dans le carré d'intégration OpsGenie" style="width:80%;" >}}
   {{< img src="tracing/service_catalog/create_account2.png" alt="Le workflow Create New Account dans le carré d'intégration OpsGenie" style="width:80%;" >}}

4. Mettez à jour la définition du service avec les données d'OpsGenie pour relier votre service OpsGenie à votre service Datadog. Par exemple, insérez les lignes de configuration `integrations` suivantes dans la [définition complète du service][5] :

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

Une fois ces étapes terminées, une zone de dialogue **On Call** s'affiche dans l'onglet **Ownership** d'un service dans le catalogue des services.

{{< img src="tracing/service_catalog/oncall_information.png" alt="La zone de dialogue On Call affichant des informations d'OpsGenie dans le catalogue des services" style="width:85%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.pagerduty.com/docs/service-directory
[2]: /fr/integrations/pagerduty/
[3]: https://support.pagerduty.com/docs/api-access-keys
[4]: https://app.datadoghq.com/integrations/pagerduty
[5]: /fr/tracing/service_catalog/service_definition_api/
[6]: http://json-schema.org/
[7]: https://www.schemastore.org/json/
[8]: https://raw.githubusercontent.com/DataDog/schema/main/service-catalog/version.schema.json
[9]: /fr/tracing/service_catalog/
[10]: /fr/integrations/
[11]: https://app.datadoghq.com/services
[12]: /fr/integrations/opsgenie
[13]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[14]: https://app.datadoghq.com/integrations/opsgenie