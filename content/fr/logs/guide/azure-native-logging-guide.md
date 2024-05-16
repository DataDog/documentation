---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
kind: documentation
title: Envoyer des logs Azure avec la ressource Datadog
---

{{< site-region region="us3" >}}

## Présentation

Ce guide vous indique la marche à suivre pour configurer et gérer la journalisation directement à partir de vos abonnements Azure via la [ressource Datadog dans Azure][7]. Vous pouvez gérer la collecte de trois types de logs Azure. Vous trouverez des instructions et des détails supplémentaires dans les sections ci-dessous :

   - Des [logs d'activité](#logs-d-activite)
   - [Logs de ressources Azure](#logs-de-ressources-azure)
   - [Logs Azure Active Directory (Azure AD)](#logs-azure-active-directory-azure-ad)

**Remarque** : La ressource Datadog dans Azure n'est disponible que pour les organisations Datadog sur le site Datadog US3. Si vous utilisez un autre [site Datadog][5], consultez le guide [Send Azure logs to Datadog][6] (en anglais) pour connaître les options de configuration.

## Les logs d'activité 

Fournissent des informations clés sur les opérations réalisées sur vos ressources dans le [plan de contrôle][1]. Les modifications apportées aux événements Service Health sont également incluses. Utilisez le log d'activité pour déterminer la nature des opérations d'écriture (`PUT`, `POST` et `DELETE`), la personne à leur origine et leur date.

Pour envoyer les logs dʼactivité à Datadog, sélectionnez **Send subscription activity logs**. Si vous ne sélectionnez pas cette option, aucun log dʼactivité ne sera envoyé à Datadog.

## Les logs de ressource Azure 

Fournissent des informations clés sur les opérations réalisées sur les ressources Azure dans le [plan de données][1]. Les opérations du plan de données consistent par exemple à récupérer un secret à partir d'un coffre de clés ou à transmettre une requête à une base de données. Le contenu de ces logs de ressources varie en fonction du service Azure et du type de ressource.

Pour envoyer des logs de ressource Azure à Datadog, sélectionnez **Send Azure resource logs for all defined resources**. Les types de logs de ressource Azure sont répertoriés dans les [catégories de logs de ressource d'Azure Monitor][2]. Si vous sélectionnez cette option, tous les logs de ressource seront envoyés à Datadog, y compris pour les nouvelles ressources créées dans l'abonnement.

Il est possible de filtrer l'ensemble des ressources Azure transmettant des logs à Datadog à l'aide de tags de ressource Azure.

### Règles de tag pour l'envoi de logs

- Les ressources Azure qui possèdent des tags `include` envoient des logs à Datadog.
- Les ressources Azure qui possèdent des tags `exclude` n'envoient pas de logs à Datadog.
- En cas de conflit entre des règles d'inclusion et d'exclusion, la règle d'exclusion est prioritaire.

Par exemple, avec la règle de tag de la capture d'écran ci-dessous, seuls les machines virtuelles, groupes de machines virtuelles identiques et plans App Service avec le tag `Datadog = True` envoient des métriques et des logs à Datadog.

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Créer des logs de ressource Datadog US3 Azure" responsive="true" style="width:90%;">}}

## Logs Azure Active Directory (Azure AD) 

Les logs Azure AD contiennent l'historique des activités de connexion ainsi qu'un journal d'audit des modifications apportées dans Azure AD pour un client donné. Pour envoyer ces logs à Datadog, commencez par créer une ressource Datadog. Après avoir créé une ressource Datadog dans Azure, suivez la procédure de configuration indiquée dans le guide [Datadog sur le portail Azure][3].

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[3]: https://docs.datadoghq.com/fr/integrations/guide/azure-portal/#azure-active-directory-logs
[4]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[5]: /fr/getting_started/site/
[6]: /fr/logs/guide/azure-logging-guide
[7]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}

<div class="alert alert-info">La ressource Datadog dans Azure n'est disponible que pour les organisations situées sur le site Datadog US3. Si vous utilisez un autre site Datadog, consultez le guide <a href="https://docs.datadoghq.com/logs/guide/azure-logging-guide/" target="_blank">Send Azure logs to Datadog</a> (en anglais) pour connaître les options de configuration. Si vous utilisez le site Datadog US3, <a href="?site=us3" target="_blank">modifiez le sélecteur de site</a> à droite de cette page.</div>

{{< /site-region >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}