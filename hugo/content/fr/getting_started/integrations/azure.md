---
aliases:
- /fr/integrations/guide/azure-manual-setup/
- /fr/integrations/guide/azure-programmatic-management/
description: Connectez Microsoft Azure à Datadog en utilisant les options d'intégration
  d'enregistrement d'application Azure. Configurez la collecte de métriques, le transfert
  de logs et l'installation de l'Agent.
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/#overview
  tag: Documentation
  text: Intégration Microsoft Azure
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guide
  text: Pourquoi installer le Datadog Agent sur mes instances dans le cloud ?
- link: https://www.datadoghq.com/blog/azure-integration-onboarding/
  tag: Blog
  text: Accélérez la configuration de votre intégration Azure grâce à une procédure
    d'intégration guidée.
- link: https://www.datadoghq.com/blog/azure-secretless-authentication/
  tag: Blog
  text: Évitez la rotation des secrets Azure avec l'authentification sans secret
title: Mise en route avec Azure
---
## Présentation {#overview}

Datadog propose plusieurs options de configuration pour l'intégration Azure. Ce guide fournit un aperçu des différentes options disponibles pour commencer avec Azure, avec des liens vers des ressources Azure et des tutoriels qui traitent de cas d'utilisation spécifiques.

## Prérequis {#prerequisites}

Si vous ne l'avez pas encore fait, créez un [compte Datadog][2].

{{% collapse-content title="Autorisations requises pour la configuration de l'intégration" level="h3" expanded=false id="required-permissions" %}}

### Dans Azure {#in-azure}

Votre utilisateur Microsoft Entra ID a besoin des autorisations suivantes :

#### Autorisation de créer un enregistrement d'application {#permission-to-create-an-app-registration}

**L'une** des conditions suivantes doit être remplie pour l'utilisateur :

- `Users can register applications` a été défini sur `Yes`
- L'utilisateur possède le rôle [Application Developer][38]

##### Rôles d'administrateur au sein de vos abonnements {#admin-roles-within-your-subscriptions}

Au sein des abonnements que vous souhaitez surveiller, vous devez disposer de l'un des éléments suivants :

- Le rôle {{< ui >}}Owner{{< /ui >}}
- Les rôles {{< ui >}}Contributor{{< /ui >}} et {{< ui >}}User Access Admin{{< /ui >}}

#### Autorisation d'ajouter et d'accorder le consentement pour les autorisations de l'API Graph {#permission-to-add-and-grant-consent-for-graph-api-permissions}

Le [rôle d'administrateur de rôle privilégié][25] contient les autorisations requises.

### Dans Datadog {#in-datadog}

Le `Datadog Admin Role`, ou tout autre rôle disposant de l'autorisation `azure_configurations_manage`.

{{% /collapse-content %}}

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/cloud_cost_management/setup/azure/?tab=billingaccounts&site=us3#overview">Cloud Cost Management</a> et <a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Log Archives</a> nécessitent la méthode de configuration d'enregistrement d'application. Pour les comptes Datadog utilisant l'intégration Azure Native, suivez les étapes de configuration sur cette page pour créer un enregistrement d'application. Si un abonnement est connecté via les deux méthodes, un avertissement de redondance apparaît dans la tuile d'intégration Azure. Cet avertissement peut être ignoré en toute sécurité pour Cloud Cost Management et Log Archives.
</div>

{{< /site-region >}}


## Configuration {#setup}

Suivez les instructions sur cette page pour configurer {{< ui >}}Azure integration{{< /ui >}} via un enregistrement d'application, disponible pour tous les sites Datadog. Pendant la configuration, choisissez si l'enregistrement d'application s'authentifie auprès de Datadog en utilisant **Authentification sans secret** (recommandé) ou un **Secret client**.

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="Sélecteur de site pour le site US3" video=true >}}

### Méthodes d'authentification {#authentication-methods}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">L'authentification sans secret n'est pas prise en charge sur les sites US1-FED et US2-FED. Utilisez la méthode <strong>Secret client</strong> pour vous authentifier.</div>
{{< /site-region >}}

<div class="alert alert-info">L'authentification sans secret ne prend pas en charge les enregistrements d'application dans les clouds souverains Azure, tels qu'Azure Government et Azure exploité par 21Vianet (Azure China*). Pour les locataires dans ces clouds, utilisez la méthode <strong>Secret client</strong> pour vous authentifier.</div>

*{{% mainland-china-disclaimer %}}

L'intégration Azure prend en charge deux méthodes d'authentification :

| Méthode | Fonctionnement | Ce que vous gérez |
|---|---|---|
| **Authentification sans secret** (recommandé) | Datadog et Azure établissent une relation d'identité de confiance en utilisant une information d'identification fédérée Azure et OpenID Connect (OIDC) [fédération d'identité de charge de travail][54]. L'enregistrement d'application fait confiance à l'identité OIDC de Datadog au lieu d'un secret stocké, et Datadog ne stocke jamais de secret. | Rien à faire pivoter ou à renouveler, ce qui réduit le risque d'interruptions d'ingestion dues à des informations d'identification expirées. |
| **Secret client** | Datadog stocke et s'authentifie à l'aide d'un secret client provenant de l'enregistrement de votre application. | Maintenez le secret à jour avant qu'il n'expire. |

Vous sélectionnez la méthode d'authentification lors de la création ou de la configuration d'un enregistrement d'application.

{{< img src="/getting_started/integrations/azure/GSwAzure_authenticationMethod.png" alt="L'étape Méthode d'authentification dans la configuration de l'intégration Azure, montrant les options recommandées Authentification sans secret et Secret client" style="width:100%;" >}}

{{% collapse-content title="Démarrage rapide (recommandé)" level="h3" expanded=false id="quickstart-setup" %}}

### Choisissez la méthode de configuration Démarrage rapide si... {#choose-the-quickstart-setup-method-if}

- Vous configurez Datadog pour la première fois.
- Vous préférez un workflow basé sur une interface utilisateur et souhaitez minimiser le temps nécessaire pour créer un principal de service avec les autorisations de surveillance requises.
- Vous souhaitez automatiser les étapes de configuration dans des scripts ou des pipelines CI/CD.

### Instructions {#instructions}

1. Dans la tuile d'intégration Azure, cliquez sur {{< ui >}}\+ Add New App registration{{< /ui >}}, puis sélectionnez {{< ui >}}Quickstart{{< /ui >}}.
2. Copiez le script de configuration et exécutez-le dans Azure Cloud Shell.
3. Retournez dans l'interface utilisateur de Datadog. Vous devriez voir {{< ui >}}CONNECTED{{< /ui >}} dans le coin supérieur droit du script de configuration.
4. Sélectionnez les abonnements et les groupes d'administration à partir desquels collecter des données.
5. Sous {{< ui >}}Authentication Method{{< /ui >}}, sélectionnez {{< ui >}}Secretless Auth{{< /ui >}} (recommandé) pour vous authentifier avec une information d'identification fédérée, ou {{< ui >}}Client Secret{{< /ui >}} pour stocker et vous authentifier avec un secret client.
6. Optionnellement, cliquez sur le bouton de bascule de collecte de métriques pour désactiver toute collecte de métriques depuis Azure. Vous pouvez également développer la liste déroulante {{< ui >}}Advanced Configuration{{< /ui >}} pour filtrer les métriques par :
   - Fournisseur de ressources
   - Tags
   - Hosts
   - Plans App Service
   - Container Apps

Vous pouvez également cliquer pour activer la collecte de métriques personnalisées depuis [Azure Application Insights][36], et désactiver la collecte des métriques d'utilisation.

7. Vous pouvez cliquer sur le bouton de bascule de collecte de ressources pour désactiver la collecte d'informations de configuration à partir de vos ressources Azure.
8. Activez la collecte de logs pour configurer les services et les paramètres de diagnostic nécessaires au transfert des logs vers Datadog :
   1. Si un redirecteur de logs existe déjà dans le locataire, il est modifié pour étendre son périmètre. Tous les paramètres modifiés s'appliquent aux abonnements ou groupes d'administration existants ainsi qu'aux nouveaux.
   2. Si vous créez un nouveau redirecteur de logs :
      1. Entrez un nom de groupe de ressources pour stocker le plan de contrôle du redirecteur de logs
      2. Sélectionnez un abonnement de plan de contrôle pour l'orchestration du transfert de logs (LFO).
      3. Sélectionnez une région pour le plan de contrôle.<br>
   **Remarque** : Les champs nom du groupe de ressources, abonnement du plan de contrôle et région n'apparaissent que lors de la création d'un nouveau redirecteur de logs.
   3. Vous pouvez également ouvrir {{< ui >}}Log filtering options{{< /ui >}} pour filtrer les logs par tags, ou appliquer un filtrage pour des informations spécifiques (telles que les PII) à l'aide d'expressions régulières.

   Consultez la [section Architecture][34] du guide de transfert automatique de logs pour plus d'informations sur cette architecture.

9. Cliquez sur {{< ui >}}Confirm{{< /ui >}} pour terminer la configuration.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" expanded=false level="h3" id="terraform-setup" %}}

### Choisissez la méthode de configuration Terraform si... {#choose-the-terraform-setup-method-if}

- Vous gérez l'infrastructure en tant que code et souhaitez conserver l'intégration Datadog Azure sous contrôle de version.
- Vous devez configurer plusieurs locataires ou abonnements de manière cohérente avec des blocs de fournisseur réutilisables.
- Vous souhaitez un processus de déploiement reproductible et auditable qui s'intègre dans votre environnement géré par Terraform.

### Instructions {#instructions-1}

Suivez ces étapes pour déployer l'intégration Datadog Azure via [Terraform][23].

{{< tabs >}}
{{% tab "Créer un enregistrement d'application :" %}}

1. Dans la [tuile d'intégration Azure][100], cliquez sur {{< ui >}}\+ Add New App registration{{< /ui >}}, puis sélectionnez {{< ui >}}Terraform{{< /ui >}}.
2. Sélectionnez les abonnements et les groupes d'administration à partir desquels collecter des données.
3. Sous {{< ui >}}Authentication Method{{< /ui >}}, sélectionnez {{< ui >}}Secretless Auth{{< /ui >}} (recommandé) pour vous authentifier avec une information d'identification fédérée, ou {{< ui >}}Client Secret{{< /ui >}} pour stocker et vous authentifier avec un secret client.
4. Vous pouvez, si vous le souhaitez, cliquer sur le bouton de collecte de métriques pour désactiver toute collecte de métriques à partir d'Azure. Vous pouvez également développer la liste déroulante {{< ui >}}Advanced Configuration{{< /ui >}} pour filtrer les métriques par :
   - Fournisseur de ressources
   - Tags
   - Hosts
   - Plans App Service
   - Container Apps

   Vous pouvez également cliquer pour activer la collecte de métriques personnalisées depuis [Azure Application Insights][101], et désactiver la collecte des métriques d'utilisation.
5. Vous pouvez, si vous le souhaitez, cliquer sur le bouton de collecte de ressources pour désactiver la collecte d'informations de configuration à partir de vos ressources Azure.
6. Copiez et exécutez la commande sous {{< ui >}}Initialize and apply the Terraform{{< /ui >}}.

[100]: https://app.datadoghq.com/integrations/azure/
[101]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
{{% /tab %}}

{{% tab "Utilisez une inscription d'application existante" %}}



- Vous disposez déjà d'une inscription d'application configurée avec le rôle {{< ui >}}Monitoring Reader{{< /ui >}} pour que Datadog puisse surveiller le périmètre fourni (abonnements ou groupes d'administration), et vous ne souhaitez pas créer de nouvelles ressources.

1. Configurez le [fournisseur Terraform Datadog][200] pour interagir avec la Datadog API via une configuration Terraform.
2. Configurez votre fichier de configuration Terraform en utilisant l'exemple ci-dessous comme modèle de base. Mettez à jour les paramètres suivants avant d'appliquer les modifications :
    * `tenant_name` : Votre ID Azure Active Directory.
    * `client_id` : Votre ID d'application (client) Azure.
    * `secretless_auth_enabled` : Définissez sur `true` pour vous authentifier avec une information d'identification fédérée au lieu d'un secret client (recommandé). Pour vous authentifier avec un secret client à la place, supprimez ce paramètre et définissez `client_secret` sur la valeur du secret de l'inscription de l'application.

   Secretless Auth nécessite une information d'identification fédérée sur l'inscription d'application qui fait confiance à l'identité de Datadog. Consultez [Méthodes d'authentification](#authentication-methods).

   Consultez la page [Datadog Azure integration resource][201] dans le registre Terraform pour obtenir d'autres exemples d'utilisation, la liste complète des paramètres optionnels, ainsi que des ressources Datadog supplémentaires.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name             = "<AZURE_TENANT_NAME>"
  client_id               = "<AZURE_CLIENT_ID>"
  secretless_auth_enabled = true
}

{{< /code-block >}}

3. Exécutez `terraform apply`. Attendez jusqu'à 10 minutes que la collecte des données commence, puis consultez le dashboard de présentation Azure prêt à l'emploi pour voir les métriques envoyées par vos ressources Azure.

[200]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[201]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
{{% /tab %}}
{{< /tabs >}}

#### Gestion de plusieurs abonnements ou locataires {#managing-multiple-subscriptions-or-tenants}

Vous pouvez utiliser plusieurs blocs de fournisseur avec des alias pour gérer les ressources Terraform sur plusieurs abonnements ou locataires. Lisez [Provider Configuration][22] pour plus d'informations.

### Surveiller le statut de l'intégration {#monitor-the-integration-status}

Une fois l'intégration configurée, Datadog commence à exécuter une série continue d'appels aux API Azure pour collecter des données de surveillance critiques à partir de votre environnement Azure. Parfois, ces appels renvoient des erreurs (par exemple, si les informations d'identification fournies ont expiré). Ces erreurs peuvent empêcher ou bloquer la capacité de Datadog à collecter des données de surveillance.

Lorsque des erreurs critiques sont rencontrées, l'intégration Azure génère des événements dans l'Events Explorer Datadog et les republie toutes les cinq minutes. Vous pouvez configurer un monitor d'événements pour qu'il se déclenche lorsque ces événements sont détectés et avertir l'équipe appropriée.

Datadog fournit un modèle de monitor pour vous aider à démarrer. Pour utiliser le modèle de monitor :

1. Dans Datadog, accédez à {{< ui >}}Monitors{{< /ui >}} et cliquez sur le bouton {{< ui >}}Browse Templates{{< /ui >}}.
2. Recherchez et sélectionnez le modèle de monitor intitulé [[Azure] Integration Errors][26].
3. Apportez les modifications souhaitées à la requête de recherche ou aux conditions d'alerte. Par défaut, le monitor se déclenche dès qu'une nouvelle erreur est détectée et se résout lorsque l'erreur n'a pas été détectée au cours des 15 dernières minutes.
4. Mettez à jour les messages de notification et de re-notification comme vous le souhaitez. Notez que les événements eux-mêmes contiennent des informations pertinentes sur l'événement et sont inclus automatiquement dans la notification. Cela inclut des informations détaillées sur le périmètre, la réponse à l'erreur et les étapes courantes pour y remédier.
5. [Configurez les notifications][27] via vos canaux préférés (e-mail, Slack, PagerDuty ou autres) pour vous assurer que votre équipe est alertée des problèmes affectant la collecte de données Azure.

{{% /collapse-content %}}

{{% collapse-content title="Utilisez une inscription d'application existante" level="h3" expanded=false id="existing-app-registration-setup" %}}

### Choisissez la méthode de configuration d'inscription d'application existante si... {#choose-the-existing-app-registration-setup-method-if}

- Vous disposez déjà d'une inscription d'application configurée avec le rôle {{< ui >}}Monitoring Reader{{< /ui >}} pour que Datadog puisse surveiller le périmètre fourni (abonnements ou groupes d'administration), et vous ne souhaitez pas créer de nouvelles ressources.

Si vous devez configurer une inscription d'application pour Datadog, consultez les méthodes de configuration [Démarrage rapide](#quickstart-setup) ou [Terraform](#terraform-setup).

### Instructions {#instructions-2}

1. Dans la [tuile d'intégration Datadog Azure][20], sélectionnez {{< ui >}}Add Existing{{< /ui >}}.
2. Dans le champ {{< ui >}}Tenant ID{{< /ui >}}, collez votre ID de répertoire (locataire).
3. Dans le champ {{< ui >}}Client ID{{< /ui >}}, collez l'ID de l'application (client).
4. Dans le champ {{< ui >}}Client Secret Value{{< /ui >}}, collez la valeur du secret client de l'inscription d'application.
5. En option, cliquez sur le bouton {{< ui >}}Monitor Automuting{{< /ui >}} pour désactiver la mise en sourdine automatique des monitors.
6. Optionnellement, cliquez sur le bouton de bascule de collecte de métriques pour désactiver toute collecte de métriques depuis Azure. Vous pouvez également développer la liste déroulante {{< ui >}}Advanced Configuration{{< /ui >}} pour filtrer les métriques par :
   - Fournisseur de ressources
   - Tags
   - Hosts
   - Plans App Service
   - Container Apps

Vous pouvez également cliquer pour activer la collecte de métriques personnalisées depuis [Azure Application Insights][36], et désactiver la collecte des métriques d'utilisation.

6. Vous pouvez, si vous le souhaitez, cliquer sur le bouton de collecte des ressources pour désactiver la collecte des informations de configuration de vos ressources Azure.
7. Cliquez sur {{< ui >}}Create Configuration{{< /ui >}}.

{{% /collapse-content %}}

{{% collapse-content title="Migrer une inscription d'application existante vers Secretless Auth" level="h4" expanded=false id="secretless-migration-setup" %}}

Si vous avez déjà connecté une inscription d'application à l'aide d'un secret client, vous pouvez la migrer vers l'authentification sans secret sur place. Vous n'avez pas besoin de recréer l'inscription de l'application. Secretless Auth ne prend pas en charge les inscriptions d'applications dans les clouds souverains Azure. Consultez [Méthodes d'authentification](#authentication-methods).

1. Dans la [tuile d'intégration Azure][20], sous l'onglet {{< ui >}}Configuration{{< /ui >}}, sélectionnez l'inscription d'application que vous souhaitez migrer.
2. Sous l'onglet {{< ui >}}General{{< /ui >}}, dans {{< ui >}}Authentication{{< /ui >}}, cliquez sur {{< ui >}}Set Up Secretless Auth{{< /ui >}}.

   {{< img src="/getting_started/integrations/azure/GSwAzure_secretlessMigration.png" alt="L'onglet Général d'une inscription d'application, avec une légende recommandant l'authentification Secretless et un bouton Configurer l'authentification Secretless" style="width:100%;" >}}

Dans la boîte de dialogue {{< ui >}}Secretless Authentication Setup{{< /ui >}}, sélectionnez une méthode de configuration, puis suivez les étapes correspondant à cette méthode :

{{< img src="/getting_started/integrations/azure/GSwAzure_secretlessSetupModal.png" alt="La boîte de dialogue de configuration de l'authentification Secretless avec les méthodes de configuration Azure CLI, Terraform et Portail Azure, ainsi que les étapes pour créer une information d'identification fédérée, la vérifier et terminer la configuration" style="width:100%;" >}}

{{< tabs >}}
{{% tab "Azure CLI" %}}

1. Exécutez la commande `az ad app federated-credential create` fournie dans un terminal avec l'interface Azure CLI configurée pour le bon locataire, ou cliquez sur {{< ui >}}Open Azure Cloud Shell{{< /ui >}}.
2. Cliquez sur {{< ui >}}Verify Credential{{< /ui >}} pour tester l'authentification.
3. Cliquez sur {{< ui >}}Confirm{{< /ui >}}. Votre secret client est supprimé une fois la configuration réussie.

{{% /tab %}}
{{% tab "Terraform" %}}

Cette méthode nécessite la version `azuread` du fournisseur 3.7.0 ou ultérieure.

1. Ajoutez la ressource d'information d'identification fédérée indiquée dans la boîte de dialogue à la même configuration qui gère votre intégration Azure Datadog, puis appliquez-la. Copiez les valeurs `issuer` et `subject` depuis la boîte de dialogue.

   {{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}
resource "azuread_application_federated_identity_credential" "datadog_federated_credential" {
  # Reference the ID of this app registration
  application_id = azuread_application.datadog_app.id
  display_name   = "datadog"
  description    = "Federated credential that permits Datadog to authenticate without storing a client secret"
  audiences      = ["api://AzureADTokenExchange"]
  issuer         = "<ISSUER>"
  subject        = "<SUBJECT>"
}
   {{< /code-block >}}

2. Cliquez sur {{< ui >}}Verify Credential{{< /ui >}} pour tester l'authentification.
3. Modifiez votre ressource `datadog_integration_azure` pour utiliser Secretless Auth :
   - Ajoutez la ressource d'information d'identification fédérée à la liste des dépendances de l'intégration.
   - Remplacez le paramètre `client_secret` par `secretless_auth_enabled = true`.
   - Appliquez les modifications.

{{% /tab %}}
{{% tab "Portail Azure" %}}

1. Dans le portail Azure, ouvrez l'inscription de l'application et accédez à {{< ui >}}Certificates & secrets{{< /ui >}} > {{< ui >}}Federated credentials{{< /ui >}} > {{< ui >}}Add credential{{< /ui >}}.
2. Sélectionnez {{< ui >}}Other issuer{{< /ui >}}, puis saisissez les valeurs {{< ui >}}Issuer{{< /ui >}}, {{< ui >}}Subject{{< /ui >}} et {{< ui >}}Audience{{< /ui >}} exactement comme indiqué dans la boîte de dialogue.
3. Cliquez sur {{< ui >}}Verify Credential{{< /ui >}} pour tester l'authentification.
4. Cliquez sur {{< ui >}}Confirm{{< /ui >}}. Votre secret client est supprimé une fois la configuration réussie.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## Collecte de métriques {#metric-collection}

L'intégration Azure de Datadog est conçue pour collecter toutes les métriques depuis [Azure Monitor][8]. La [page Integrations][9] affiche une liste organisée de sous-intégrations prédéfinies qui fournissent des dashboards et des monitors prêts à l'emploi supplémentaires pour des services Azure spécifiques. Bon nombre de ces intégrations sont installées par défaut lorsque Datadog reconnaît les données provenant de votre compte Azure. Cependant, Datadog peut ingérer des métriques depuis **toute ressource prise en charge par Azure Monitor**, même si elle ne dispose pas d'une tuile de sous-intégration dédiée.

Vous pouvez trouver vos métriques Azure dans la page de résumé des métriques sur la plateforme Datadog en accédant à `Metrics > Summary` et en recherchant `Azure`.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Image du résumé des métriques" style="width:100%;" >}}

### Filtrage par tag de ressource pour les métriques {#resource-tag-filtering-for-metrics}

Utilisez des filtres de tag pour déterminer de quelles ressources Azure Datadog collecte les métriques. Configurez les filtres de tag dans l'onglet {{< ui >}}Configuration{{< /ui >}} de la [tuile d'intégration Azure][20]. Un filtre de tag est une liste de tags séparés par des virgules sous la forme `key:value`. Seules les ressources correspondant à au moins un tag dans le filtre font l'objet de la collecte de métriques.

Vous pouvez utiliser des caractères génériques dans vos filtres de tag :
- `?` correspond à un seul caractère.
- `*` correspond à plusieurs caractères.

Pour exclure des ressources avec un tag donné, faites précéder le tag de `!`. L'exclusion prévaut sur l'inclusion. Une ressource correspond au filtre si elle correspond à n'importe quel tag de la liste.

Par exemple : `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

Ce filtre collecte des métriques à partir de ressources taguées avec `datadog:monitored` ou `env:production`, exclut les ressources taguées avec `plan_tier:basic`, et inclut les ressources ayant un tag `instance-type` correspondant à `c1.*`.

Si aucun filtre de tag n'est défini, Datadog collecte les métriques de toutes les ressources Azure.

## Activer la collecte de logs {#enable-log-collection}

Vous pouvez utiliser la fonctionnalité de transfert automatique de logs pour configurer les services et les paramètres de diagnostic nécessaires au transfert des logs vers Datadog. Si un plan de contrôle de transfert automatique de logs existe déjà dans le locataire, ce flux le modifie et étend son périmètre pour inclure les abonnements ou groupes d'administration sélectionnés. Pour plus de détails, consultez [Configuration du transfert automatique de logs Azure][19].

Datadog recommande d'utiliser l'Agent ou le DaemonSet pour envoyer des logs depuis Azure. Si le streaming direct n'est pas possible, utilisez le flux {{< ui >}}Configure Log Forwarding{{< /ui >}} dans l'[intégration Azure][20] pour configurer et gérer le transfert automatique de logs directement dans Datadog. Vous pouvez également déployer le transfert de logs avec un [modèle Azure Resource Manager (ARM)][19]. Les deux méthodes gèrent et mettent à l'échelle automatiquement les services de transfert de logs.

{{% collapse-content title="Automatisé (recommandé)" level="h3" expanded=false id="automated-log-forwarding-setup" %}}

### Choisissez la méthode de configuration de transfert automatique de logs si... {#choose-the-automated-log-forwarding-setup-method-if}

- Vous n'avez pas encore configuré les logs via la [méthode de configuration Démarrage rapide](#azure-quickstart-setup).
- Vous préférez un workflow basé sur une interface utilisateur et souhaitez minimiser le temps nécessaire pour créer un principal de service avec les autorisations de surveillance requises.
- Vous souhaitez automatiser les étapes de configuration dans des scripts ou des pipelines CI/CD.

### Instructions {#instructions-3}

#### Configurer le transfert de logs (recommandé) {#configure-log-forwarding-recommended}

Utilisez le flux {{< ui >}}Configure Log Forwarding{{< /ui >}} pour configurer de nouveaux redirecteurs de logs ou gérer ceux existants directement dans Datadog :

1. Dans Datadog, accédez à [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}][20].
1. Cliquez sur {{< ui >}}Configure Log Forwarding{{< /ui >}}.
1. Copiez la commande fournie et collez-la dans votre Azure Cloud Shell.
1. Sélectionnez les abonnements à partir desquels transférer les logs.
1. Optionnellement, ajoutez ou supprimez des filtres de logs.
1. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

Pour plus de détails, consultez [Configuration du transfert automatique de logs Azure][19].

#### Modèle ARM {#arm-template}

Alternativement, déployez le transfert de logs avec un modèle Azure Resource Manager (ARM) :

1. Ouvrez le [Automated Log Forwarding ARM template][29] dans Azure.
1. Configurez les détails de votre projet et de votre instance Azure dans l'[onglet Basics][30].
1. Saisissez vos identifiants Datadog dans l'[onglet Datadog Configuration][31].
1. Acceptez les avertissements de déploiement dans l'[onglet Deployment][32].
1. Lancez le processus de déploiement dans l'[onglet Review + create][33].

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Archives de logs</a> nécessitent la méthode de configuration d'enregistrement d'application. Pour les comptes Datadog utilisant l'intégration Azure Native, suivez les étapes indiquées sur cette page pour créer un enregistrement d'application.
</div>

{{< /site-region >}}

Consultez [Azure Automated Log Forwarding Architecture][34] pour plus de détails.

{{% /collapse-content %}}

{{% collapse-content title="Container App" level="h3" expanded=false id="container-app-log-forwarding-setup" %}}

### Choisissez la méthode de transfert de logs Container App si... {#choose-the-container-app-log-forwarding-method-if}

- Vous préférez configurer manuellement les [paramètres de diagnostic][53] sur les ressources à partir desquelles vous souhaitez transférer des logs.

## Instructions {#instructions-4}

1. Cliquez sur le bouton ci-dessous et remplissez le formulaire sur le portail Azure. Datadog déploie automatiquement les ressources Azure nécessaires pour transférer les logs vers votre compte Datadog.

   [![Déployer sur Azure](https://aka.ms/deploytoazurebutton)][52]

2. Une fois le déploiement du modèle terminé, configurez les [paramètres de diagnostic][53] pour chaque source de logs afin d'envoyer les logs de la plateforme Azure (y compris les logs de ressources) vers le compte de stockage créé lors du déploiement.

**Remarque** : Les ressources ne peuvent être diffusées que vers un compte de stockage situé dans la même région Azure.

{{% /collapse-content %}}

{{% azure-log-archiving %}}

### Filtrage par tag de ressource pour les logs {#resource-tag-filtering-for-logs}

Utilisez des filtres de tag pour contrôler quelles ressources Azure voient leurs logs transférés vers Datadog. Pour configurer les filtres de tag pour les logs, cliquez sur {{< ui >}}Configure Log Forwarding{{< /ui >}} dans la [tuile d'intégration Azure][20] et suivez la procédure. Un filtre de tag est une liste de tags séparés par des virgules sous la forme `key:value`. Seules les ressources qui correspondent à au moins un tag dans le filtre voient leurs logs transférés.

Vous pouvez utiliser des caractères génériques dans vos filtres de tag :
- `?` correspond à un seul caractère.
- `*` correspond à plusieurs caractères.

Pour exclure des ressources avec un tag donné, faites précéder le tag de `!`. L'exclusion prévaut sur l'inclusion. Une ressource correspond au filtre si elle correspond à n'importe quel tag de la liste.

Par exemple : `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

Ce filtre transfère les logs des ressources taguées avec `datadog:monitored` ou `env:production`, exclut les ressources taguées avec `plan_tier:basic`, et inclut les ressources ayant un tag `instance-type` correspondant à `c1.*`.

Si aucun filtre de tag n'est défini, Datadog transfère les logs de toutes les ressources Azure.

## Tirez le meilleur parti de la plateforme Datadog {#get-more-from-the-datadog-platform}

### Installez l'Agent pour une meilleure visibilité sur votre application {#install-the-agent-for-greater-visibility-into-your-application}

Une fois votre intégration Azure configurée, les crawlers Datadog collectent automatiquement les métriques Azure, mais vous pouvez obtenir une visibilité encore plus approfondie sur vos instances Azure avec le [Datadog Agent][1]. L'installation du Datadog Agent dans votre environnement vous permet de collecter des données supplémentaires, notamment :
- **Santé des applications**
- **Utilisation des processus**
- **Métriques au niveau du système**

Vous pouvez également utiliser le client StatsD intégré pour envoyer des métriques personnalisées depuis vos applications, afin de corréler ce qui se passe avec vos applications, vos utilisateurs et votre système. Consultez le guide sur [_Pourquoi devrais-je installer le Datadog Agent sur mes instances cloud ?_][15] pour plus d'informations sur les avantages de l'installation du Datadog Agent sur vos instances.

Utilisez l'extension Azure pour installer le Datadog Agent sur les machines virtuelles Windows, les machines virtuelles Linux x64 et les VM Linux basées sur ARM. Vous pouvez également utiliser l'extension de cluster AKS pour déployer l'Agent sur vos clusters AKS.

{{< tabs >}}
{{% tab "Extension de VM" %}}

1. Dans le [portail Azure][4], sélectionnez la VM appropriée.
2. Dans la barre latérale gauche, sous {{< ui >}}Settings{{< /ui >}}, sélectionnez {{< ui >}}Extensions + applications{{< /ui >}}.
3. Cliquez sur {{< ui >}}\+ Add{{< /ui >}}.
4. Recherchez et sélectionnez l'extension {{< ui >}}Datadog Agent{{< /ui >}}.
5. Cliquez sur {{< ui >}}Next{{< /ui >}}.
6. Saisissez votre [clé d'API Datadog][2] et votre [site Datadog][1], puis cliquez sur {{< ui >}}OK{{< /ui >}}.

Pour installer l'Agent en fonction du système d'exploitation ou de l'outil CI/CD, consultez les [instructions d'installation du Datadog Agent][3].

**Remarque** : les contrôleurs de domaine ne sont pas pris en charge lors de l'installation du Datadog Agent avec l'extension Azure.

[1]: /fr/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://portal.azure.com
{{% /tab %}}

{{% tab "Extension de cluster AKS" %}}

L'extension de cluster AKS Datadog vous permet de déployer le Datadog Agent nativement au sein d'Azure AKS, en évitant la complexité des outils de gestion tiers. Pour installer le Datadog Agent avec l'extension de cluster AKS :

1. Accédez à votre cluster AKS dans le portail Azure.
2. Dans la barre latérale gauche du cluster AKS, sélectionnez {{< ui >}}Extensions + applications{{< /ui >}} sous {{< ui >}}Settings{{< /ui >}}.
3. Recherchez et sélectionnez {{< ui >}}Datadog AKS Cluster Extension{{< /ui >}}.
4. Cliquez sur {{< ui >}}Create{{< /ui >}}, puis suivez les instructions dans la tuile en utilisant vos [identifiants Datadog][1] et votre [site Datadog][2].

[1]: /fr/account_management/api-app-keys/
[2]: /fr/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Dépannage {#troubleshooting}

Consultez [Dépannage][16] dans le guide de configuration avancée d'Azure.

Besoin d'aide supplémentaire ? Contactez le [support Datadog][17].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/agent/
[2]: https://www.datadoghq.com/
[5]: https://learn.microsoft.com/azure/event-hubs/event-hubs-create
[8]: https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/metrics-index
[9]: /fr/integrations/#cat-azure
[15]: /fr/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[16]: /fr/integrations/guide/azure-advanced-configuration/#azure-integration-troubleshooting
[17]: /fr/help/
[19]: /fr/logs/guide/azure-automated-log-forwarding/
[20]: https://app.datadoghq.com/integrations/azure
[21]: https://learn.microsoft.com/cli/azure/ad/sp?view=azure-cli-latest
[22]: https://developer.hashicorp.com/terraform/language/providers/configuration
[23]: https://www.terraform.io
[25]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[26]: https://app.datadoghq.com/monitors/templates?q=Azure%20%22integration%20errors%22&origination=all&p=1
[27]: /fr/monitors/notify/#configure-notifications-and-automations
[28]: /fr/integrations/guide/azure-advanced-configuration/#enable-diagnostics
[29]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[30]: /fr/logs/guide/azure-automated-log-forwarding/#basics
[31]: /fr/logs/guide/azure-automated-log-forwarding/#datadog-configuration
[32]: /fr/logs/guide/azure-automated-log-forwarding/#deployment
[33]: /fr/logs/guide/azure-automated-log-forwarding/#review--create
[34]: /fr/logs/guide/azure-automated-log-forwarding/#architecture
[35]: /fr/integrations/guide/azure-advanced-configuration/#automated-log-collection
[36]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[38]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer
[39]: https://azure.microsoft.com/services/storage/blobs/
[40]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal
[41]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[42]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-cli
[43]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-powershell
[44]: https://learn.microsoft.com/training/modules/store-app-data-with-azure-blob-storage/
[45]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[46]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[47]: https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[48]: https://learn.microsoft.com/azure/azure-functions/functions-get-started
[49]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[51]: https://app.datadoghq.com/logs
[52]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json/uiFormDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FmanualForwarderUiDefinition.json
[53]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
[54]: https://learn.microsoft.com/entra/workload-id/workload-identity-federation