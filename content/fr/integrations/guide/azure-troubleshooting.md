---
aliases:
- /fr/integrations/faq/azure-troubleshooting
further_reading:
- link: /integrations/azure/
  tag: Documentation
  text: Intégration Azure

title: Dépannage Azure
---

## Trouver le nom de votre locataire

1. Accédez au site [portal.azure.com][1].
2. Dans la barre latérale de gauche, sélectionnez **Azure Active Directory**.
3. Sous **Basic information**, notez la valeur du champ **Name**.

## Échec de la connexion

Si vous rencontrez une erreur de connexion lors de l'installation de l'intégration Azure, contactez l'[assistance Datadog][3]. Ajoutez une capture d'écran, si possible.

## Métriques manquantes

Assurez-vous de bien terminer le processus d'installation, en accordant des autorisations de lecture à l'application Azure pour les abonnements que vous souhaitez surveiller.

Pour les machines virtuelles déployées avec ARM, vous devez également activer Diagnostics et sélectionner les métriques des machines virtuelles que vous souhaitez recueillir. Consultez la rubrique **Activer les diagnostics** ci-dessous pour obtenir des instructions.

S'il vous manque d'autres métriques, contactez l'[assistance Datadog][3] en prenant soin de fournir les informations suivantes à propos des métriques :
- Les dimensions
- Le groupe de ressources
- Le nom des ressources
- L'ID ou le nom de l'abonnement

Ajoutez la capture d'écran d'un graphique Azure Monitor représentant la métrique. **Important** : affichez des points de données d'une minute dans la capture d'écran.


### Activer les diagnostics

L'activation des diagnostics permet aux machines virtuelles déployées avec ARM de recueillir des informations de journalisation, notamment des métriques sur le CPU, le réseau, etc. Pour activer les diagnostics, procédez comme suit :

1. Accédez au [portail Azure][1] et cherchez votre machine virtuelle.
2. Cliquez sur **Diagnostics settings** dans la section **Monitoring**.
3. Choisissez un compte de stockage, puis cliquez sur **Enable guest-level monitoring**.
4. Par défaut, les métriques et les logs de base sont activés. Procédez à des ajustements selon vos préférences.
5. Cliquez sur **Save** pour enregistrer vos modifications.

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="Vue d'ensemble des paramètres de diagnostic Azure. Les options No storage account et Enable guest level monitoring sont mises en évidence sous la section Pick a storage account." style="width:70%">}}

## Collecte de logs automatisée

### Conflits de nommage

Si des ressources Azure possèdent le même nom que l'un des paramètres par défaut, des conflits de nommage peuvent survenir. Azure n'accepte pas que des ressources partagent leur nom avec un abonnement individuel. Datadog vous conseille de renommer le paramètre par défaut en lui attribuant un nom unique qui n'existe pas déjà dans l'environnement.

Par exemple, si vous possédez déjà un Eventhub `datadog-eventhub`, utilisez le flag -EventhubName pour changer le nom par défaut de la ressource Eventhub.

{{< code-block lang="powershell" filename="Exemple" >}}

./resource_deploy.ps1 -ApiKey <votre_clé_api> -SubscriptionId <votre_id_abonnement> -EventhubName <nouveau_nom>

{{< /code-block >}}

**Remarque** : consultez la documentation relative aux [paramètres facultatifs][4] pour obtenir la liste des paramètres configurables.

**Remarque :** si vous exécutez le script à nouveau après un conflit de nommage, il est également recommandé de supprimer tout le groupe de ressources afin de lancer une toute nouvelle exécution.

### Fournisseur de ressources non enregistré

Si l'exécution de votre script échoue à cause de l'erreur **The subscription is not registered to use namespace 'Microsoft.EventHub’** :

Azure possède des fournisseurs de ressources pour chacun de ses services, par exemple `Microsoft.EventHub` pour Event Hub Azure. Si votre abonnement Azure n'est pas enregistré auprès de l'un des fournisseurs de services requis, le script échoue. Vous pouvez résoudre ce problème en vous enregistrant auprès du fournisseur de services. Exécutez la commande suivante dans CloudShell.

{{< code-block lang="powershell" filename="Exemple" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}

### Quota de logs dépassé

Vous avez bien installé le script, mais vous ne voyez toujours aucun log d'activité/plate-forme dans le Log Explorer ?

Assurez-vous que vous n'avez pas dépassé votre [quota quotidien][5] de rétention de logs.

**Remarque :** il est recommandé d'attendre au moins cinq minutes après l'exécution du script avant de commencer à chercher des logs dans le Log Explorer.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com
[2]: https://manage.windowsazure.com
[3]: /fr/help/
[4]: /fr/integrations/azure/?tab=azurecliv20#optional-parameters
[5]: /fr/logs/indexes/#set-daily-quota