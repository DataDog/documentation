---
aliases:
- /fr/integrations/guide/azure-manual-setup/
- /fr/integrations/guide/azure-programmatic-management/
description: Connectez Microsoft Azure avec Datadog en utilisant les options d'intégration
  de l'enregistrement d'application Azure. Configurez la collecte de métriques, le
  transfert de journaux et l'installation de l'Agent.
further_reading:
- link: https://www.datadoghq.com/blog/azure-integration-onboarding/
  tag: Blog
  text: Accélérez la configuration de votre intégration Azure grâce à une procédure
    d'initialisation guidée.
- link: https://docs.datadoghq.com/integrations/azure/#overview
  tag: Documentation
  text: Intégration Microsoft Azure.
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guide
  text: Pourquoi installer l'Agent Datadog sur mes instances dans le cloud ?
title: Commencer avec Azure.
---
## Aperçu {#overview}

Datadog propose plusieurs options de configuration pour l'intégration Azure. Ce guide fournit un aperçu des différentes options disponibles pour commencer avec Azure, avec des liens vers des ressources et des tutoriels Azure qui traitent des cas d'utilisation spécifiques.

## Prérequis {#prerequisites}

Si vous ne l'avez pas encore fait, créez un [compte Datadog][2].

{{% collapse-content title="Permissions requises pour la configuration de l'intégration." level="h4" expanded=false id="required-permissions" %}}

### Dans Azure {#in-azure}

Votre utilisateur Microsoft Entra ID a besoin des permissions suivantes :

#### Permission de créer un enregistrement d'application {#permission-to-create-an-app-registration}

**L'une** des conditions suivantes doit être vraie pour l'utilisateur :

- `Users can register applications` a été défini sur `Yes`
- L'utilisateur a le rôle [Développeur d'Application][38]

##### Rôles d'administrateur au sein de vos abonnements {#admin-roles-within-your-subscriptions}

Au sein des abonnements que vous souhaitez surveiller, vous devez avoir soit :

- Le rôle {{< ui >}}Owner{{< /ui >}}
- Les deux rôles {{< ui >}}Contributor{{< /ui >}} et {{< ui >}}User Access Admin{{< /ui >}}

#### Autorisation d'ajouter et de donner son consentement pour les autorisations de l'API Graph {#permission-to-add-and-grant-consent-for-graph-api-permissions}

Le rôle [Administrateur de rôle privilégié][25] contient les autorisations requises.

### Dans Datadog {#in-datadog}

Le `Datadog Admin Role`, ou tout autre rôle avec l'autorisation `azure_configurations_manage`.

{{% /collapse-content %}}

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/cloud_cost_management/setup/azure/?tab=billingaccounts&site=us3#overview">La gestion des coûts dans le cloud</a> et <a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">les archives de journaux</a> nécessitent la configuration de l'enregistrement de l'application. Pour les comptes Datadog utilisant l'intégration Azure Native, suivez les étapes de configuration sur cette page pour créer un enregistrement d'application. Si une souscription est connectée par les deux méthodes, un avertissement de redondance apparaît dans la tuile d'intégration Azure. Cet avertissement peut être ignoré en toute sécurité pour la gestion des coûts dans le cloud et les archives de journaux.
</div>

{{< /site-region >}}


## Configuration {#setup}

Suivez les instructions sur cette page pour configurer le {{< ui >}}Azure integration{{< /ui >}} via un enregistrement d'application, disponible pour tous les sites Datadog.

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="Sélecteur de site pour le site US3" video=true >}}

{{% collapse-content title="Démarrage rapide (recommandé)" level="h4" expanded=false id="quickstart-setup" %}}

### Choisissez la méthode de configuration Démarrage rapide si... {#choose-the-quickstart-setup-method-if}

- Vous configurez Datadog pour la première fois.
- Vous préférez un flux de travail basé sur l'interface utilisateur et souhaitez minimiser le temps nécessaire pour créer un principal de service avec les autorisations de surveillance requises.
- Vous souhaitez automatiser les étapes de configuration dans des scripts ou des pipelines CI/CD.

### Instructions {#instructions}

1. Dans la tuile d'intégration Azure, cliquez sur {{< ui >}}+ Add New App registration{{< /ui >}}, puis sélectionnez {{< ui >}}Quickstart{{< /ui >}}.
2. Copiez le script de configuration et exécutez-le dans le shell Azure Cloud.
3. Retournez à l'interface utilisateur de Datadog. Vous devriez voir {{< ui >}}CONNECTED{{< /ui >}} dans le coin supérieur droit du script de configuration.
4. Sélectionnez les abonnements et les groupes de gestion à partir desquels collecter des données.
5. Optionnellement, cliquez sur le commutateur de collecte de métriques pour désactiver toute collecte de métriques depuis Azure. Vous pouvez également développer le menu déroulant {{< ui >}}Advanced Configuration{{< /ui >}} pour filtrer les métriques par :
   - Fournisseur de ressources
   - Étiquettes
   - Hôtes
   - Plans de service d'application
   - Container Apps

Vous pouvez également cliquer pour activer la collecte de métriques personnalisées depuis [Azure Application Insights][36], et désactiver la collecte des métriques d'utilisation.

6. Optionnellement, cliquez sur le commutateur de collecte de ressources pour désactiver la collecte d'informations de configuration de vos ressources Azure.
7. Activez la collecte de journaux pour configurer et paramétrer les services et les paramètres de diagnostic nécessaires pour transférer les journaux vers Datadog :
   1. Si un transmetteur de journaux existe déjà dans le locataire, il est modifié pour étendre son champ d'application. Tous les paramètres modifiés s'appliquent aux abonnements ou groupes de gestion existants ainsi qu'à ceux nouvellement sélectionnés.
   2. Si vous créez un nouveau transmetteur de journaux :
      1. Entrez un nom de groupe de ressources pour stocker le plan de contrôle du transmetteur de journaux.
      2. Sélectionnez un abonnement de plan de contrôle pour l'orchestration de transfert de journaux (LFO).
      3. Sélectionnez une région pour le plan de contrôle.<br>
   **Remarque** : Les champs de nom de groupe de ressources, d'abonnement de plan de contrôle et de région n'apparaissent que lors de la création d'un nouveau transmetteur de journaux.
   3. Optionnellement, ouvrez {{< ui >}}Log filtering options{{< /ui >}} pour filtrer les journaux par étiquettes, ou appliquez un filtrage pour des informations spécifiques (comme les PII) en utilisant des regex.

   Consultez la [section Architecture][34] du guide de transfert de journaux automatisé pour plus d'informations sur cette architecture.

8. Cliquez {{< ui >}}Confirm{{< /ui >}} pour terminer la configuration.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" expanded=false level="h4" id="terraform-setup" %}}

### Choisissez la méthode de configuration Terraform si... {#choose-the-terraform-setup-method-if}

- Vous gérez l'infrastructure en tant que code et souhaitez maintenir l'intégration Datadog Azure sous contrôle de version.
- Vous devez configurer plusieurs locataires ou abonnements de manière cohérente avec des blocs de fournisseur réutilisables.
- Vous souhaitez un processus de déploiement répétable et auditable qui s'intègre dans votre environnement géré par Terraform.

### Instructions {#instructions-1}

Suivez ces étapes pour déployer l'intégration Datadog Azure via [Terraform][23].

{{< tabs >}}
{{% tab "Créez un enregistrement d'application" %}}

1. Dans la tuile [intégration Azure][100], cliquez {{< ui >}}+ Add New App registration{{< /ui >}}, puis sélectionnez {{< ui >}}Terraform{{< /ui >}}.
2. Sélectionnez les abonnements et les groupes de gestion à partir desquels collecter des données.
3. Optionnellement, cliquez sur le commutateur de collecte de métriques pour désactiver toute collecte de métriques depuis Azure. Vous pouvez également développer le menu déroulant {{< ui >}}Advanced Configuration{{< /ui >}} pour filtrer les métriques par :
   - Fournisseur de ressources
   - Étiquettes
   - Hôtes
   - Plans de service d'application
   - Container Apps

   Vous pouvez également cliquer pour activer la collecte de métriques personnalisées depuis [Azure Application Insights][101], et désactiver la collecte des métriques d'utilisation.
4. Vous pouvez également cliquer sur le commutateur de collecte de ressources pour désactiver la collecte d'informations de configuration de vos ressources Azure.
5. Configurez la collecte de journaux :
   - Si un transmetteur de journaux existe déjà dans le locataire, étendez son champ d'application pour inclure de nouvelles souscriptions ou groupes de gestion.
   - Si vous créez un nouveau transmetteur de journaux :
     1. Entrez un nom de groupe de ressources pour stocker le plan de contrôle du transmetteur de journaux.
     1. Sélectionnez un abonnement de plan de contrôle pour l'orchestration de transfert de journaux (LFO).
     1. Sélectionnez une région pour le plan de contrôle.

   Consultez la [section Architecture][102] du guide d'expédition automatisée des journaux pour plus d'informations sur cette architecture.
6. Copiez et exécutez la commande sous {{< ui >}}Initialize and apply the Terraform{{< /ui >}}.

[100]: https://app.datadoghq.com/integrations/azure/
[101]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[102]: /fr/logs/guide/azure-automated-log-forwarding/#architecture
{{% /tab %}}

{{% tab "Utilisez un enregistrement d'application existant." %}}



- Vous avez déjà un enregistrement d'application configuré avec le {{< ui >}}Monitoring Reader{{< /ui >}} rôle pour Datadog afin de surveiller le champ d'application fourni (abonnements ou groupes de gestion), et vous ne souhaitez pas créer de nouvelles ressources.

1. Configurez le [fournisseur Datadog Terraform][200] pour interagir avec l'API Datadog via une configuration Terraform.
2. Configurez votre fichier de configuration Terraform en utilisant l'exemple ci-dessous comme modèle de base. Assurez-vous de mettre à jour les paramètres suivants avant d'appliquer les modifications :
    * `tenant_name` : Votre ID Azure Active Directory.
    * `client_id` : Votre ID d'application Azure (client).
    * `client_secret` : Votre clé secrète d'application web Azure.

   Consultez la page [ressource d'intégration Datadog Azure][201] dans le registre Terraform pour d'autres exemples d'utilisation et la liste complète des paramètres optionnels, ainsi que des ressources Datadog supplémentaires.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. Exécutez `terraform apply`. Attendez jusqu'à 10 minutes pour que les données commencent à être collectées, puis consultez le tableau de bord de vue d'ensemble Azure prêt à l'emploi pour voir les métriques envoyées par vos ressources Azure.

[200]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[201]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
{{% /tab %}}
{{< /tabs >}}

#### Gestion de plusieurs abonnements ou locataires {#managing-multiple-subscriptions-or-tenants}

Vous pouvez utiliser plusieurs blocs de fournisseur avec des alias pour gérer les ressources Terraform à travers plusieurs abonnements ou locataires. Consultez [Configuration du fournisseur][22] pour plus d'informations.

### Surveillez l'état d'intégration {#monitor-the-integration-status}

Une fois l'intégration configurée, Datadog commence à exécuter une série continue d'appels aux API Azure pour collecter des données de surveillance critiques de votre environnement Azure. Parfois, ces appels renvoient des erreurs (par exemple, si les identifiants fournis ont expiré). Ces erreurs peuvent inhiber ou bloquer la capacité de Datadog à collecter des données de surveillance.

Lorsque des erreurs critiques sont rencontrées, l'intégration Azure génère des événements dans l'Explorateur d'événements Datadog et les republie toutes les cinq minutes. Vous pouvez configurer un Moniteur d'événements pour se déclencher lorsque ces événements sont détectés et notifier l'équipe appropriée.

Datadog fournit un modèle de moniteur pour vous aider à démarrer. Pour utiliser le modèle de moniteur :

1. Dans Datadog, allez à {{< ui >}}Monitors{{< /ui >}} et cliquez sur le bouton {{< ui >}}Browse Templates{{< /ui >}}.
2. Recherchez et sélectionnez le modèle de moniteur intitulé [[Azure] Erreurs d'intégration][26].
3. Apportez les modifications souhaitées à la requête de recherche ou aux conditions d'alerte. Par défaut, le moniteur se déclenche chaque fois qu'une nouvelle erreur est détectée et se résout lorsque l'erreur n'a pas été détectée pendant les 15 dernières minutes.
4. Mettez à jour les messages de notification et de renotification selon vos souhaits. Notez que les événements eux-mêmes contiennent des informations pertinentes sur l'événement et sont inclus dans la notification automatiquement. Cela inclut des informations détaillées sur la portée, la réponse d'erreur et les étapes courantes pour remédier à la situation.
5. [Configurer les notifications][27] via vos canaux préférés (email, Slack, PagerDuty ou autres) pour vous assurer que votre équipe est alertée des problèmes affectant la collecte de données Azure.

{{% /collapse-content %}}

{{% collapse-content title="Utilisez un enregistrement d'application existant." level="h4" expanded=false id="existing-app-registration-setup" %}}

### Choisissez la méthode de configuration d'enregistrement d'application existante si.. {#choose-the-existing-app-registration-setup-method-if}

- Vous avez déjà un enregistrement d'application configuré avec le rôle {{< ui >}}Monitoring Reader{{< /ui >}} pour que Datadog surveille la portée fournie (abonnements ou groupes de gestion), et vous ne souhaitez pas créer de nouvelles ressources.

Si vous devez configurer un enregistrement d'application pour Datadog, consultez les méthodes de configuration [Démarrage rapide](#quickstart-setup) ou [Terraform](#terraform-setup).

### Instructions {#instructions-2}

1. Dans la tuile d'intégration [Datadog Azure][20], sélectionnez {{< ui >}}Add Existing{{< /ui >}}.
2. Dans le champ {{< ui >}}Tenant ID{{< /ui >}}, collez votre ID de répertoire (locataire).
3. Dans le champ {{< ui >}}Client ID{{< /ui >}}, collez l'ID de l'application (client).
4. Dans le champ {{< ui >}}Client Secret Value{{< /ui >}}, collez la valeur du secret client de l'enregistrement de l'application.
5. Optionnellement, cliquez sur le bouton {{< ui >}}Monitor Automuting{{< /ui >}} pour désactiver l'automutation du moniteur.
6. Optionnellement, cliquez sur le bouton de collecte des métriques pour désactiver toute collecte de métriques depuis Azure. Vous pouvez également développer le menu déroulant {{< ui >}}Advanced Configuration{{< /ui >}} pour filtrer les métriques par :
   - Fournisseur de ressources
   - Étiquettes
   - Hôtes
   - Plans de service d'application
   - Applications conteneurisées

Vous pouvez également cliquer pour activer la collecte de métriques personnalisées depuis [Azure Application Insights][36], et désactiver la collecte des métriques d'utilisation.

6. Optionnellement, cliquez sur le bouton de collecte des ressources pour désactiver la collecte d'informations de configuration de vos ressources Azure.
7. Cliquez sur {{< ui >}}Create Configuration{{< /ui >}}.

{{% /collapse-content %}}

## Collecte de métriques {#metric-collection}

L'intégration Azure de Datadog est conçue pour collecter toutes les métriques de [Azure Monitor][8]. La [page des intégrations][9] affiche une liste sélectionnée de sous-intégrations prédéfinies qui fournissent des tableaux de bord et des moniteurs supplémentaires prêts à l'emploi pour des services Azure spécifiques. Bon nombre de ces intégrations sont installées par défaut lorsque Datadog reconnaît des données provenant de votre compte Azure. Cependant, Datadog peut ingérer des métriques de **toute ressource prise en charge par Azure Monitor**, même si elle n'a pas de tuile de sous-intégration dédiée.

Vous pouvez trouver vos métriques Azure dans la page de résumé des métriques sur la plateforme Datadog en naviguant vers `Metrics > Summary` et en recherchant `Azure`.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Image de résumé des métriques" style="width:100%;" >}}

### Filtrage des balises de ressources pour les métriques {#resource-tag-filtering-for-metrics}

Utilisez des filtres de balises pour contrôler quelles ressources Azure ont leurs métriques collectées par Datadog. Configurez les filtres de balises dans l'onglet {{< ui >}}Configuration{{< /ui >}} de la tuile [intégration Azure][20]. Un filtre de balises est une liste de balises séparées par des virgules sous la forme `key:value`. Seules les ressources qui correspondent à au moins une balise dans le filtre ont leurs métriques collectées.

Vous pouvez utiliser des caractères génériques dans vos filtres de balises :
- `?` correspond à un seul caractère.
- `*` correspond à plusieurs caractères.

Pour exclure des ressources avec une balise donnée, préfixez la balise avec `!`. L'exclusion a la priorité sur l'inclusion. Une ressource correspond au filtre si elle correspond à une balise de la liste.

Par exemple : `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

Ce filtre collecte des métriques à partir des ressources étiquetées avec `datadog:monitored` ou `env:production`, exclut les ressources étiquetées avec `plan_tier:basic`, et inclut les ressources avec une balise `instance-type` correspondant à `c1.*`.

Si aucun filtre de balises n'est défini, Datadog collecte des métriques de toutes les ressources Azure.

## Activer la collecte des journaux {#enable-log-collection}

Vous pouvez utiliser la fonctionnalité d'envoi automatique des journaux pour configurer et paramétrer les services et les paramètres de diagnostic nécessaires pour transférer les journaux à Datadog. Si un plan de contrôle d'envoi automatique des journaux existe déjà dans le locataire, ce flux le modifie et étend son champ d'application pour inclure les abonnements ou groupes de gestion sélectionnés. Pour plus de détails, voir [Configuration de l'envoi automatique des journaux Azure][19].

Datadog recommande d'utiliser l'Agent ou DaemonSet pour envoyer des journaux depuis Azure. Si le streaming direct n'est pas possible, utilisez le flux {{< ui >}}Configure Log Forwarding{{< /ui >}} dans l'[intégration Azure][20] pour configurer et gérer le transfert automatisé de journaux directement dans Datadog. Vous pouvez également déployer le transfert de journaux avec un [modèle de gestion des ressources Azure (ARM)][19]. Les deux méthodes gèrent automatiquement et mettent à l'échelle les services de transfert de journaux.

{{% collapse-content title="Automatisé (recommandé)" level="h4" expanded=false id="automated-log-forwarding-setup" %}}

### Choisissez la méthode de configuration du transfert de journaux automatisé si... {#choose-the-automated-log-forwarding-setup-method-if}

- Vous n'avez pas déjà configuré de journaux via la [méthode de configuration Quickstart](#azure-quickstart-setup).
- Vous préférez un flux de travail basé sur une interface utilisateur et souhaitez minimiser le temps nécessaire pour créer un principal de service avec les autorisations de surveillance requises.
- Vous souhaitez automatiser les étapes de configuration dans des scripts ou des pipelines CI/CD.

### Instructions {#instructions-3}

#### Configurer le transfert de journaux (recommandé) {#configure-log-forwarding-recommended}

Utilisez le flux {{< ui >}}Configure Log Forwarding{{< /ui >}} pour configurer de nouveaux ou gérer des transmetteurs de journaux existants directement dans Datadog :

1. Dans Datadog, accédez à [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}][20].
1. Cliquez sur {{< ui >}}Configure Log Forwarding{{< /ui >}}.
1. Copiez la commande fournie et collez-la dans votre Azure Cloud Shell.
1. Sélectionnez les abonnements à partir desquels transférer des journaux.
1. Optionnellement, ajoutez ou supprimez des filtres de journaux.
1. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

Pour plus de détails, consultez [Configuration automatisée du transfert de journaux Azure][19].

#### Modèle ARM {#arm-template}

Alternativement, déployez le transfert de journaux avec un modèle de gestion des ressources Azure (ARM) :

1. Ouvrez le [modèle ARM de transfert de journaux automatisé][29] dans Azure.
1. Configurez les détails de votre projet et de votre instance Azure dans l'onglet [Informations de base][30].
1. Entrez vos identifiants Datadog dans l'onglet [Configuration Datadog][31].
1. Reconnaissez les avertissements de déploiement dans l'onglet [Déploiement][32].
1. Démarrez le processus de déploiement dans l'onglet [Révision + création][33].

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Les Archives de journaux</a> nécessitent la méthode de configuration de l'enregistrement d'application. Pour les comptes Datadog utilisant l'intégration Azure Native, suivez les étapes de cette page pour créer un enregistrement d'application.
</div>

{{< /site-region >}}

Consultez l'[Architecture de transfert de journaux automatisé Azure][34] pour plus de détails.

{{% /collapse-content %}}

{{% collapse-content title="Application de conteneur" level="h4" expanded=false id="container-app-log-forwarding-setup" %}}

### Choisissez la méthode de transfert de journaux de l'application de conteneur si... {#choose-the-container-app-log-forwarding-method-if}

- Vous préférez configurer manuellement les [paramètres de diagnostic][53] sur les ressources à partir desquelles vous souhaitez transférer des journaux.

## Instructions {#instructions-4}

1. Cliquez sur le bouton ci-dessous et remplissez le formulaire sur le portail Azure. Datadog déploie automatiquement les ressources Azure nécessaires pour transférer des journaux dans votre compte Datadog.

   [![Déployer sur Azure](https://aka.ms/deploytoazurebutton)][52]

2. Après la fin du déploiement du modèle, configurez les [paramètres de diagnostic][53] pour chaque source de journal afin d'envoyer les journaux de la plateforme Azure (y compris les journaux de ressources) au compte de stockage créé lors du déploiement.

**Remarque** : Les ressources ne peuvent diffuser que vers un compte de stockage dans la même région Azure.

{{% /collapse-content %}}

{{% azure-log-archiving %}}

### Filtrage des balises de ressources pour les journaux {#resource-tag-filtering-for-logs}

Utilisez des filtres de balises pour contrôler quelles ressources Azure ont leurs journaux transférés vers Datadog. Pour configurer des filtres de balises pour les journaux, cliquez sur {{< ui >}}Configure Log Forwarding{{< /ui >}} dans la tuile d'intégration [Azure][20] et suivez le flux. Un filtre de balises est une liste de balises séparées par des virgules sous la forme `key:value`. Seules les ressources qui correspondent à au moins une balise dans le filtre ont leurs journaux transférés.

Vous pouvez utiliser des caractères génériques dans vos filtres de balises :
- `?` correspond à un seul caractère.
- `*` correspond à plusieurs caractères.

Pour exclure des ressources avec une balise donnée, préfixez la balise avec `!`. L'exclusion a la priorité sur l'inclusion. Une ressource correspond au filtre si elle correspond à une balise de la liste.

Par exemple : `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

Ce filtre transfère les journaux des ressources étiquetées avec `datadog:monitored` ou `env:production`, exclut les ressources étiquetées avec `plan_tier:basic`, et inclut les ressources avec une balise `instance-type` correspondant à `c1.*`.

Si aucun filtre de balise n'est défini, Datadog transfère les journaux de toutes les ressources Azure.

## Obtenez plus de Datadog Platform {#get-more-from-the-datadog-platform}

### Installez l'Agent pour une visibilité accrue sur votre application {#install-the-agent-for-greater-visibility-into-your-application}

Après avoir configuré votre intégration Azure, les crawlers de Datadog collectent automatiquement les métriques Azure, mais vous pouvez obtenir une visibilité encore plus approfondie sur vos instances Azure avec le [Datadog Agent][1]. L'installation de l'Agent Datadog dans votre environnement vous permet de collecter des données supplémentaires, y compris, mais sans s'y limiter :
- **Santé de l'application**
- **Utilisation des processus**
- **Métriques au niveau du système**

Vous pouvez également utiliser le client StatsD intégré pour envoyer des métriques personnalisées depuis vos applications, afin de corréler ce qui se passe avec vos applications, utilisateurs et système. Consultez le guide sur [_Pourquoi devrais-je installer le Datadog Agent sur mes instances cloud ?_][15] pour plus d'informations sur les avantages de l'installation du Datadog Agent sur vos instances.

Utilisez l'extension Azure pour installer l'Agent Datadog sur des machines virtuelles Windows, des machines virtuelles Linux x64 et des machines virtuelles Linux basées sur ARM. Vous pouvez également utiliser l'AKS Cluster Extension pour déployer le Datadog Agent sur vos AKS Clusters.

{{< tabs >}}
{{% tab "VM Extension" %}}

1. Dans le [portail Azure][4], sélectionnez la VM appropriée.
2. Dans la barre latérale gauche, sous {{< ui >}}Settings{{< /ui >}}, sélectionnez {{< ui >}}Extensions + applications{{< /ui >}}.
3. Cliquez sur {{< ui >}}+ Add{{< /ui >}}.
4. Recherchez et sélectionnez l'extension {{< ui >}}Datadog Agent{{< /ui >}}.
5. Cliquez sur {{< ui >}}Next{{< /ui >}}.
6. Entrez votre [Datadog API key][2] et [Datadog site][1], puis cliquez sur {{< ui >}}OK{{< /ui >}}.

Pour installer le Datadog Agent en fonction du système d'exploitation ou de l'outil CI/CD, consultez les [instructions d'installation du Datadog Agent][3].

**Remarque** : Les contrôleurs de domaine ne sont pas pris en charge lors de l'installation du Datadog Agent avec l'extension Azure.

[1]: /fr/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://portal.azure.com
{{% /tab %}}

{{% tab "AKS Cluster Extension" %}}

La Datadog AKS Cluster Extension vous permet de déployer le Datadog Agent nativement au sein d'Azure AKS, évitant ainsi la complexité des outils de gestion tiers. Pour installer le Datadog Agent avec la Datadog AKS Cluster Extension :

1. Allez dans votre cluster AKS dans le portail Azure.
2. Dans la barre latérale gauche du cluster AKS, sélectionnez {{< ui >}}Extensions + applications{{< /ui >}} sous {{< ui >}}Settings{{< /ui >}}.
3. Recherchez et sélectionnez le {{< ui >}}Datadog AKS Cluster Extension{{< /ui >}}.
4. Cliquez sur {{< ui >}}Create{{< /ui >}}, et suivez les instructions dans la tuile en utilisant vos [identifiants Datadog][1] et [Datadog site][2].

[1]: /fr/account_management/api-app-keys/
[2]: /fr/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Dépannage {#troubleshooting}

Consultez [Dépannage][16] dans le guide de configuration avancée Azure.

Vous avez encore besoin d'aide ? Contactez [Datadog support][17].

## Lectures complémentaires {#further-reading}

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
[52]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json
[53]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings