---
description: Intégrez votre environnement Oracle Cloud Infrastructure à Datadog pour
  une surveillance complète
further_reading:
- link: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  tag: Blog
  text: Surveiller Oracle Cloud Infrastructure avec Datadog
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: Blog
  text: Accélérer la surveillance d'Oracle Cloud Infrastructure avec Datadog OCI QuickStart
- link: /integrations/oracle-cloud-infrastructure
  tag: Documentation
  text: Intégration Oracle Cloud Infrastructure
- link: /agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guide
  text: Pourquoi installer l'Agent Datadog sur mes instances cloud ?
title: Premiers pas avec Oracle Cloud Infrastructure (OCI)
---

{{< jqmath-vanilla >}}

## Présentation

Utilisez ce guide pour commencer à surveiller votre environnement Oracle Cloud Infrastructure (OCI). La configuration QuickStart de Datadog simplifie le processus d'intégration en provisionnant automatiquement l'infrastructure nécessaire à la collecte des métriques, des logs et des données de ressources depuis votre tenancy OCI.

{{% collapse-content title="Prérequis" level="h4" expanded=false id="prerequisites" %}}

### Dans OCI

Votre compte utilisateur OCI doit disposer des éléments suivants :

- Le rôle **Identity Domain Administrator**
- La capacité de créer un utilisateur, un groupe d'utilisateurs et un groupe dynamique dans le domaine d'identité
- La capacité de créer des stratégies dans le compartiment racine

Vous devez également :
- Être connecté à la tenancy que vous souhaitez intégrer
- Avoir la Home Region sélectionnée dans la console OCI

**Note** : l'intégration OCI est limitée à une intégration par tenancy. Toutes les régions OCI Commercial (dans le domaine OC1) existant au 1er janvier 2026 sont prises en charge.

### Dans Datadog

Un [compte Datadog][1] avec les [autorisations pour créer des clés d'API et d'application][30].

{{% /collapse-content %}}

## Configuration

OCI QuickStart de Datadog est une expérience de configuration entièrement gérée qui provisionne toute l'infrastructure nécessaire dans votre tenancy. La configuration crée automatiquement des Oracle Service Connector Hubs pour streamer les métriques et les logs vers Datadog, et découvre en continu les nouvelles ressources et compartiments au fur et à mesure de la croissance de votre environnement.

**Remarque** : avant de commencer, envisagez de [demander une augmentation de la limite de service][4] pour les Service Connector Hubs. Le nombre approximatif nécessaire est le suivant :

$$\\text"Service Connector Hubs" = \text"Nombre de compartiments dans la tenancy" / \text"5"\$$

### Configurer le carré d'intégration OCI Datadog

1. Accédez au [carré d'intégration OCI Datadog][3] et cliquez sur **Add New Tenancy**.

2. Sélectionnez ou créez une clé d'API Datadog à utiliser pour l'intégration.
3. Créez une clé d'application Datadog.
4. Activez ou désactivez les logs à l'aide du bouton.
5. Cliquez sur **Create OCI Stack**. Cela ouvre Oracle Resource Manager dans la console OCI pour terminer le déploiement.

   **Remarque** : ne déployez cette stack qu'une seule fois par tenancy.

### Déployer la stack ORM QuickStart

1. Dans la console OCI, acceptez les conditions d'utilisation d'Oracle.
2. Laissez l'option d'utilisation de fournisseurs Terraform personnalisés décochée.
3. Utilisez le répertoire de travail par défaut, ou choisissez-en un autre si vous le souhaitez.
4. Cliquez sur **Next**.
5. Laissez la section **(Optional) Choose specific subnet(s)** vide. QuickStart crée automatiquement un nouveau réseau cloud virtuel (VCN) et un sous-réseau dans chaque région, offrant ainsi la configuration la plus simple.

   **Option avancée** : pour utiliser des sous-réseaux existants (un maximum d'un par région OCI), indiquez les OCID des sous-réseaux (un par ligne, sans virgules). Format : `ocid1.subnet.oc[0-9].*`. Exemple : `ocid1.subnet.oc1.iad.abcedfgh`.
   Si vous utilisez des sous-réseaux existants, assurez-vous que chaque VCN dispose d'une sortie HTTP via la passerelle NAT, d'une passerelle de service pour « All Services In Oracle Services Network », des règles de table de routage appropriées et des règles de sécurité pour les requêtes HTTP.

6. Laissez la section **(Optional) Choose a User** vide. QuickStart crée un nouveau groupe et un nouvel utilisateur dans votre domaine d'identité OCI actuel, ce qui simplifie la configuration IAM.

   **Option avancée** : pour utiliser un groupe et un utilisateur existants, indiquez les OCID **Group ID** et **User ID**. L'utilisateur doit être membre du groupe spécifié.

7. Laissez la section **(Optional) Advanced configuration** vide pour la plupart des cas d'utilisation.

   **Options avancées** :
   - **Compartment** : indiquez un compartiment existant pour les ressources créées par Datadog (par défaut, un nouveau compartiment « Datadog » est créé).
   - **Domain** : indiquez un OCID de domaine d'identité pour remplacer l'emplacement de création de l'utilisateur et du groupe. Requiert le rôle **Identity Domain Administrator** dans ce domaine.

8. Cliquez sur **Next**.
9. Cliquez sur **Create** et attendez jusqu'à 30 minutes que le déploiement se termine.

### Terminer la configuration dans Datadog

Revenez au [carré d'intégration OCI Datadog][3] et cliquez sur **Ready!**

### Validation

Attendez jusqu'à 10 minutes que les données commencent à être collectées, puis consultez les métriques `oci.*` dans le [dashboard de présentation de l'intégration OCI][5] ou sur la [page Metrics Explorer][6] dans Datadog. 

{{< img src="getting_started/integrations/oci/oci-dashboard.png" alt="Le dashboard de présentation OCI dans Datadog avec diverses métriques et graphiques des services Oracle Cloud Infrastructure">}}

<div class="alert alert-info">Les métriques de fonctions OCI (namespace <code>oci.faas</code>) et les métriques d'instances de conteneurs (namespace <code>oci_computecontainerinstance</code>) sont en préversion.</div>

## Configuration

Une fois la configuration terminée, un onglet de configuration pour la tenancy devient disponible sur le côté gauche du [carré d'intégration OCI Datadog][3]. Appliquez les configurations de collecte de données à l'échelle de la tenancy comme indiqué ci-dessous.

### Ajouter des régions

Dans l'onglet **General**, sélectionnez les régions pour la collecte de données dans la liste de cases à cocher **Regions**. Les sélections de régions s'appliquent à l'ensemble de la tenancy, pour les métriques et les logs.

**Remarque** : si vous avez utilisé la méthode de configuration QuickStart et que vous avez ensuite souscrit à une nouvelle région OCI, réappliquez la stack de configuration initiale dans ORM. La nouvelle région est alors disponible dans le carré OCI Datadog.

### Collecte de métriques et de logs

Utiliser les onglets **Metric collection** et **Log collection** pour configurer les métriques et les logs envoyés à Datadog.

**Remarque** : les filtres sont évalués dans l'ordre suivant : **Selected Services** fait office de bouton principal pour la collecte de données d'un service, puis les filtres de tags de compartiment sont appliqués, et enfin les filtres de tags de ressources.

#### Activer ou désactiver l'ensemble de la collecte

Les onglets de collecte de métriques et de logs disposent tous deux d'un bouton principal pour désactiver la collecte de ce type de données pour l'ensemble de la tenancy.

#### Limiter la collecte à des services OCI spécifiques

Utilisez la section **Selected Services** pour activer ou désactiver la collecte depuis des services OCI individuels. La désactivation d'un service arrête toute collecte depuis celui-ci, quels que soient les filtres de tags de ressources configurés pour ce service. Lorsqu'un service est activé, les filtres de tags de ressources peuvent affiner davantage la collecte à des ressources spécifiques au sein de ce service. Les ressources ne disposant pas d'un tag d'inclusion correspondant sont exclues.

**Remarque** : les modifications du bouton de service peuvent prendre jusqu'à 5 minutes pour prendre effet. 

{{% collapse-content title="Syntaxe des filtres de tags" level="h5" id="tag-filter-syntax" %}}

Les sections **Compartment Tags** et **Limit Collection to Specific Resources** acceptent des tags OCI `key:value` séparés par des virgules. Faites précéder un tag de `!` pour le nier. Le séparateur virgule se comporte différemment selon les types de tags utilisés :

- **Tags positifs uniquement** : logique OU — inclus si l'objet OCI possède **l'un ou l'autre** des tags listés. 
- **Tags négatifs uniquement** (préfixés par `!`) : logique OU — exclu si **l'un ou l'autre** des tags niés est présent.
- **Tags positifs et négatifs mixtes** : logique ET — toutes les conditions listées doivent être satisfaites pour être inclus.

Exemple :
- `datadog:monitored,env:prod*` : inclure si **l'un ou l'autre** des tags est présent.
- `!env:staging,!testing:true` : exclure si **l'un ou l'autre** des tags est présent.
- `datadog:monitored,!region:us-phoenix-1` : inclure uniquement si le tag `datadog:monitored` est présent **et** que le tag `region:us-phoenix-1` est absent.

{{% /collapse-content %}}

#### Limiter la collecte par compartiment

Utilisez la section **Compartment Tags** pour inclure ou exclure des compartiments spécifiques en fonction des tags de compartiment OCI. Consultez la section [Syntaxe des filtres de tags](#syntaxe-des-filtres-de-tags) pour la référence de syntaxe.

**Remarque** : dans OCI, les tags ne sont pas hérités par les compartiments enfants ; chaque compartiment doit être tagué individuellement. Après avoir modifié des tags dans OCI, les modifications peuvent prendre jusqu'à 15 minutes pour s'afficher dans Datadog. 

#### Limiter la collecte à des ressources spécifiques

Utilisez la section **Limit Collection to Specific Resources** pour définir les ressources qui envoient leurs métriques ou logs à Datadog. Sélectionnez un service OCI dans le menu déroulant, puis indiquez les tags de ressources à cibler. Consultez la section [Syntaxe des filtres de tags](#syntaxe-des-filtres-de-tags) pour la référence de syntaxe.

### Collecte de ressources

Dans l'onglet **Resource Collection** du [carré d'intégration OCI Datadog][3], cliquez sur le bouton **Enable Resource Collection**. Les ressources sont visibles dans le [Catalogue de ressources Datadog][7].

## Tirer pleinement profit de la plateforme Datadog

### Installer l'Agent pour une meilleure visibilité

Bien que l'intégration OCI collecte automatiquement les métriques au niveau du service via Oracle Cloud Monitoring, l'installation de [l'Agent Datadog][8] sur vos instances de calcul offre une visibilité plus approfondie sur l'infrastructure et les applications :

- **Métriques au niveau du système** avec une granularité inférieure à la seconde pour le CPU, la mémoire, le disque et le réseau
- **Visibilité au niveau des processus** pour comprendre la consommation des ressources par application
- **Métriques custom** depuis vos applications via [DogStatsD][12]
- **Traces distribuées** pour une visibilité de bout en bout des requêtes
- **Logs** corrélés aux métriques pour un dépannage plus rapide

L'Agent s'installe avec une seule commande pour la plupart des systèmes d'exploitation, y compris Oracle Linux. Consultez la [page d'installation de l'Agent][9] pour obtenir des instructions, ou lisez [pourquoi installer l'Agent sur des instances cloud][13] pour plus de détails sur les avantages.

### Utiliser l'Agent Datadog avec OCI Kubernetes Engine (OKE)

Pour les environnements conteneurisés sur OKE, vous pouvez utiliser [l'Agent Datadog pour Kubernetes][14]. Utilisez la documentation Kubernetes dédiée pour déployer l'Agent dans votre cluster OKE et collecter des métriques, des logs et des traces depuis vos applications conteneurisées.

## Explorer les services connexes

### Surveillance des GPU

La surveillance des instances GPU OCI est essentielle pour garantir des performances optimales et la fiabilité de vos charges de travail de calcul haute performance. [L'intégration OCI GPU][22] fournit un ensemble complet de métriques GPU via le namespace `gpu_infrastructure_health`, vous permettant de suivre l'état, la capacité, le débit, le statut et les performances de vos [instances GPU][23].

Après avoir configuré l'intégration OCI, assurez-vous que les namespaces liés aux GPU sont inclus dans votre configuration de collecte de métriques. Consultez le [dashboard de présentation OCI GPU][29] (créé automatiquement lors de la configuration de l'intégration OCI GPU) pour un aperçu de votre infrastructure GPU.

### Cloud Cost Management

[Oracle Cloud Cost Management][24] de Datadog fournit des informations aux équipes d'ingénierie et financières pour comprendre l'impact des modifications d'infrastructure sur les coûts, répartir les dépenses au sein de votre organisation et identifier les améliorations potentielles.

Pour activer Cloud Cost Management pour OCI :
1. Assurez-vous d'avoir configuré l'intégration OCI comme décrit ci-dessus.
2. Suivez les instructions de configuration dans la [documentation Oracle Cloud Cost Management][24] pour activer la collecte des données de coûts.

### Cloud SIEM

Cloud SIEM fournit une analyse en temps réel des logs opérationnels et de sécurité, en utilisant des intégrations et des règles prêtes à l'emploi pour détecter et examiner les menaces.

Pour utiliser Cloud SIEM avec votre environnement OCI :
1. Assurez-vous que la collecte de logs est activée dans votre configuration d'intégration OCI.
2. Consultez [Premiers pas avec Cloud SIEM][25] pour configurer la détection des menaces.
3. Suivez le [guide de configuration OCI pour Cloud SIEM][26] pour configurer des sources de logs spécifiques et des règles de sécurité pour OCI.

Cloud SIEM analyse les logs OCI pour détecter :
- Les tentatives d'accès non autorisées
- Les appels d'API suspects
- Les modifications de configuration susceptibles d'introduire des risques de sécurité
- Les violations de conformité

## Dépannage

Si vous rencontrez des problèmes avec l'intégration OCI, consultez le [guide de dépannage de l'intégration OCI][27].

Besoin d'aide ? Contactez [l'assistance Datadog][28].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[3]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[4]: https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti
[5]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview
[6]: https://app.datadoghq.com/metric/explorer
[7]: https://docs.datadoghq.com/fr/infrastructure/resource_catalog/
[8]: /fr/getting_started/agent/
[9]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /fr/developers/dogstatsd/?tab=hostagent
[13]: /fr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[14]: /fr/agent/kubernetes/?tab=helm
[22]: /fr/integrations/oci_gpu/
[23]: https://www.oracle.com/cloud/compute/#gpu
[24]: /fr/cloud_cost_management/setup/oracle/
[25]: /fr/getting_started/cloud_siem/
[26]: /fr/security/cloud_siem/guide/oci-config-guide-for-cloud-siem/
[27]: /fr/integrations/guide/oci-integration-troubleshooting
[28]: /fr/help/
[29]: https://app.datadoghq.com/dash/integration/31744/oci-gpu-overview
[30]: /fr/account_management/rbac/permissions/#api-and-application-keys