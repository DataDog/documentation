---
description: Guide sur l'architecture de lʼintégration Azure/Datadog et les options
  de configuration alternatives
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentation
  text: Intégration Azure
kind: guide
title: Architecture et configuration de l'intégration Azure
---

## Présentation

Ce guide fournit des informations détaillées et des architectures de référence pour les utilisateurs qui configurent lʼintégration Datadog/Azure, ainsi que des options de configuration alternatives pour des cas d'utilisation spécifiques.

### Architectures de référence

Les diagrammes de ce guide fournissent une représentation visuelle du processus et du résultat de la configuration en suivant les étapes de la [page relative à lʼintégration Azure $][1]. Ce guide fournit un aperçu détaillé des interactions de Datadog avec votre environnement Azure et répond aux questions courantes en matière de sécurité, de conformité et de gouvernance.

### Autres configurations

Les processus de configuration indiqués dans la [page relative à lʼintégration Azure][1] sont recommandés. Ils permettent dʼaboutir à une configuration idéale pour la majorité des utilisateurs. Les autres options de configuration présentées dans ce document peuvent être préférables pour certains cas d'utilisation. Tout compromis en termes de performances, de fonctionnalités ou de facilité de gestion est décrit si nécessaire.

## Métrique Azure et collecte de données

L'activation de lʼintégration Datadog/Azure permet à Datadog :

  - de découvrir et surveiller toutes les ressources de tous les abonnements dans le cadre d'un contexte donné.
  - de mettre à jour automatiquement les définitions des métrique découvertes, afin de s'assurer que toutes les métriques disponibles depuis le monitor Azure sont collectées.
  - dʼingérer une série de métadonnées générales et spécifiques aux ressources (y compris les tags Azure personnalisés) et les appliquer aux métriques de la ressource associée dans Datadog sous forme de tags.
  - dʼinterroger les API de métadonnées Azure et dʼutiliser les réponses pour [générer des métriques utiles dans Datadog][2] pour obtenir des informations que le monitor Azure ne prend pas en charge.

Les API Azure utilisées et les données collectées sont identiques, que vous utilisiez la version standard ou la version Azure native de lʼintégration.

{{% site-region region="us,us5,eu,gov,ap1" %}}

### Métrique de la version standard de lʼintégration Azure et collecte de données

_Disponible sur tous les sites Datadog_

Suivez les étapes suivantes pour activer la version standard de lʼintégration Azure :

  1. Créez un enregistrement d'application dans votre Active Directory et entrez les informations d'identification dans la [page de lʼintégration Datadog/Azure][2].
  2. Donnez un accès en lecture à lʼapplication (rôle `Monitoring Reader`) aux abonnements ou au groupe de gestion que vous souhaitez surveiller.

Le diagramme ci-dessous présente le processus et l'architecture qui résultent de la configuration de lʼintégration Azure décrite dans la documentation principale.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="Diagramme montrant la configuration de lʼintégration de lʼenregistrement de lʼapp" >}}

Une fois cette opération terminée, la collecte des données commence automatiquement. Les informations relatives à lʼenregistrement de l'application saisies dans Datadog permettent à Datadog de [demander un token à Azure Active Directory][1] (AD). Datadog utilise ce token comme une autorisation pour les appels dʼAPI vers diverses API Azure, pour découvrir les ressources dans le contexte fourni et pour collecter des données. Ce processus continu s'exécute avec des intervalles de deux minutes par défaut et est utilisé pour découvrir et collecter des données à partir de votre environnement Azure. Le processus de collecte de données est illustré ci-dessous.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="Diagramme montrant la configuration de lʼintégration de lʼenregistrement de lʼapp" >}}

[1]: https://learn.microsoft.com/en-us/azure/databricks/dev-tools/api/latest/aad/
[2]: https://app.datadoghq.com/integrations/azure
{{% /site-region %}}
{{% site-region region="us3" %}}

### Collecte de métriques de lʼintégration Azure Native
_Disponible sur le site US3 de Datadog uniquement_

**Lier les comptes** : la ressource Datadog dans Azure relie votre environnement Azure et votre compte Datadog. Ce lien permet dʼeffectuer la même collecte de données que lʼintégration Azure standard disponible pour d'autres sites Datadog, mais avec un mécanisme d'authentification différent. Son accès est attribué à l'aide d'une **identité gérée par le système** associée à la ressource Datadog dans Azure, plutôt qu'à l'aide d'un **enregistrement d'application** créé et configuré par l'utilisateur. 

**Autorisations** : l'attribution du rôle `Monitoring Reader` se fait automatiquement lors de la création de la ressource Datadog et s'applique à l'abonnement parent de la ressource Datadog. Si vous ajoutez des abonnements supplémentaires pour la surveillance à la ressource Datadog, ce contexte est automatiquement mis à jour pour l'identité gérée.

Suivez les étapes suivantes pour activer la version native de lʼintégration Azure :

1. Confirmez que votre organisation Datadog est hébergée sur le site US3 de [Datadog][1] ou [créez un compte d'essai Datadog sur le site US3][5].
2. Créez une ressource Datadog dans Azure qui lie au moins un abonnement.
3. Il est possible de mettre à jour la ressource Datadog pour y inclure d'autres abonnements.

En tant quʼ[ISV externe][6], la demande et l'utilisation de cet accès font l'objet d'une requête supplémentaire et distincte :

1. Datadog s'authentifie auprès d'Azure et utilise un service Azure privé pour demander le token client associé à la ressource Datadog indiquée.
1. Ce service Azure vérifie l'identité de Datadog et s'assure que la ressource Datadog demandée existe et est activée.
1. Azure renvoie un token client éphémère à Datadog. Ce jeton permet dʼobtenir le même niveau d'accès que celui accordé à l'identité gérée par le système associé.
1. Datadog utilise ce token client pour interroger les données de lʼenvironnement surveillé jusqu'à ce qu'il arrive à expiration, auquel cas le processus se répète.

Le diagramme ci-dessous présente le processus et l'architecture qui résultent de la configuration de lʼintégration Azure Native.

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_integration_setup.png" alt="Diagramme montrant la configuration de lʼintégration native dʼAzure" >}}

Une fois cette opération terminée, la collecte des données commence automatiquement. Datadog découvre et collecte en permanence des métriques à partir de votre environnement Azure, comme illustré ci-dessous.

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_metric_collection.png" alt="Diagramme montrant la configuration de la collecte de métriques Azure Native" >}}

### Autres options de configuration pour la collecte de métrique

Que vous utilisiez la version standard ou la version Native de lʼintégration Azure, Datadog recommande vivement d'utiliser la configuration par défaut. En effet, lʼintégration est continuellement améliorée pour fournir des informations nouvelles et différenciées, ainsi que pour améliorer les performances et la fiabilité de la collecte des données. Ces améliorations peuvent être entravées par des configurations plus restrictives pour la collecte de métrique.

#### Options pour restreindre l'accès

Les sections suivantes détaillent les options de restriction d'accès et leurs implications.

##### 1. Attribution d'un accès inférieur au niveau d'abonnement

Vous pouvez attribuer à Datadog un accès inférieur au niveau de l'abonnement :

  - Par groupe de ressources   
  - Par ressource individuelle

**Remarque** : cet accès est géré par l'intermédiaire de **lʼenregistrement dʼapp** pour l'intégration Azure standard, et par l'intermédiaire de **lʼidentité de système gérée** associée à la ressource Datadog pour l'intégration native Azure.

Si vous placez le contexte de l'accès en dessous du niveau d'abonnement, Datadog est toujours en mesure de découvrir les ressources et leurs métriques disponibles, et de les ingérer dynamiquement dans le cadre du contexte donné.

Restreindre Datadog à un niveau inférieur à celui de l'abonnement a les effets suivants :

  - Cela inhibe la capacité à mettre en lot les appels de métriques, ce qui entraîne des délais supérieurs à une ou deux minutes avant qu'ils n'apparaissent sur Datadog. La restriction par ressource individuelle a un impact plus important que la restriction par groupe de ressources. Le délai réel dépend fortement de la taille, de la composition et de la distribution de votre environnement Azure. Il peut n'y avoir aucun effet notable dans certains cas, ou une latence pouvant aller jusqu'à 45 minutes dans d'autres.
  - Cela augmentate le nombre dʼappels de l'API Azure, ce qui peut entraîner une hausse des coûts au sein d'Azure.
  - Cela limite la détection automatique des ressources.
  - Cela nécessite une mise à jour manuelle du contexte de lʼattribution pour les nouvelles ressources, les groupes de ressources ou les abonnements à surveiller.

##### 2. Attribution d'un ou de plusieurs rôles plus restrictifs que celui de Monitoring Reader

Le rôle **Monitoring Reader** offre un large accès pour la surveillance des ressources et des données au niveau de l'abonnement. Cet accès en lecture seule permet à Datadog de fournir la meilleure expérience utilisateur pour les fonctionnalités existantes et les nouvelles fonctionnalités. Les rôles Azure AD permettent d'étendre cet accès aux ressources Azure AD au niveau du locataire.

La restriction de l'accès en deçà du rôle Monitoring Reader a des conséquences :

  - Perte partielle ou totale des données de surveillance
  - Perte partielle ou totale des métadonnées sous forme de tags sur les métriques de votre ressource
  - Perte partielle ou totale des données pour les [Cloud Security Management Misconfigurations (CSM Misconfigurations)][3] ou le [catalogue des ressources][4].
  - Perte partielle ou totale des métriques générées par Datadog

Les conséquences de la restriction ou de l'omission des rôles Azure AD sont les suivantes :

  - Perte partielle ou totale des métadonnées pour les ressources Azure AD dans CSM Misconfigurations
  - Perte partielle ou totale de la surveillance de l'expiration des informations d'identification pour les ressources Azure AD

[1]: /fr/getting_started/site/
[2]: https://www.datadoghq.com/
[3]: /fr/security/cloud_security_management/misconfigurations/
[4]: /fr/infrastructure/resource_catalog/
[5]: https://us3.datadoghq.com/signup
[6]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{< /site-region >}}

## Collecte de logs Azure

{{% site-region region="us,us5,eu,gov,ap1" %}}

### Collecte de logs de lʼintégration Azure standard
_Disponible sur tous les sites Datadog_

Le diagramme ci-dessous présente une architecture de référence pour le transfert de logs d'Azure vers Datadog, comme décrit dans la section [collecte de logs][1] de la page de lʼintégration Azure.

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="Diagramme montrant la configuration du transfert de logs manuel" >}}

### Autres options de configuration pour le transfert de logs avec la version standard de lʼintégration Azure

L'architecture par défaut décrite ci-dessus convient à la plupart des utilisateurs. En fonction de l'échelle et de la composition de votre environnement Azure, ainsi que des méthodes utilisées par votre organisation pour mettre en œuvre cette architecture, les sections ci-dessous détaillent les considérations supplémentaires qui peuvent être pertinentes.

#### Utilisation des modèles fournis

Le bouton **Deploy to Azure** dans la [section principale relative à la collecte de logs][1] Azure, fournit un modèle pour créer un événement Hub et une paire de fonctions Forwarder. Outre l'utilisation de ce modèle pour un déploiement direct, vous pouvez utiliser les modèles ARM sous-jacents comme point de départ pour vos propres déploiements infrastructure as code.

Ces modèles n'ajoutent pas de paramètres de diagnostic, à l'exception d'un paramètre de diagnostic facultatif pour les logs d'activité. Pour les logs de ressources, Datadog recommande d'utiliser les modèles ARM ou Terraform pour ajouter des paramètres de diagnostic à vos ressources de manière programmatique. Ces paramètres de diagnostic doivent être ajoutés à chaque ressource qui doit envoyer des logs de ressources à Datadog.

#### Considérations régionales

Les paramètres de diagnostic ne peuvent envoyer de logs de ressources qu'à des hubs dʼévénements situés dans la même région que la ressource. Ajoutez un hub dʼévénements et une paire de fonctions forwarder dans chaque région qui contient des ressources pour lesquelles vous voulez envoyer les logs de ressources à Datadog.

Cependant, les paramètres de diagnostic ne sont pas limités à l'envoi de logs à des hubs dʼévénements dans le même abonnement que la ressource. Si vous avez plusieurs abonnements dans votre locataire Azure, ils peuvent partager un seul hub dʼévénement et une seule fonction forwarder dans la même région.

#### Considérations sur les logs volumineux

Au fur et à mesure que le volume de logs augmente, vous pouvez constater des goulots d'étranglement, généralement dans les hubs dʼévénements. Si vous prévoyez dʼenvoyer des volumes élevés de logs, vous pouvez envisager d'ajouter des partitions supplémentaires ou d'utiliser un niveau Premium ou Dédié.
Pour les volumes de logs particulièrement élevés, vous pouvez envisager d'ajouter des paires supplémentaires de hubs dʼévénements et de fonctions forwarder dans la même région, et de répartir le trafic entre elles.

[1]: /fr/integrations/azure/#log-collection
{{% /site-region %}}
{{% site-region region="us3" %}}

### Collecte de logs de lʼintégration Azure Native
_Disponible sur tous le site US3 de Datadog uniquement_

Le diagramme ci-dessous présente le processus et l'architecture qui résultent de la configuration de transfert de logs de lʼintégration native Azure.

{{< img src="intégrations/guide/azure_architecture_and_configuration/azure_native_log_forwarding.png" alt="Diagramme montrant la configuration du transfert de logs de la version native dʼAzure" >}}

Avec lʼintégration native dʼAzure, vous n'avez pas besoin de configurer quoi que ce soit en dehors de la ressource Datadog pour mettre en œuvre la ressource Azure ou l'activité de transfert de logs vers Datadog. Les paramètres de diagnostic sont ajoutés ou supprimés automatiquement pour correspondre à votre configuration en utilisant uniquement les règles de tags spécifiées dans la ressource Datadog.

**Remarque** : vous pouvez activer les logs de ressources sans aucun filtre pour envoyer tous les logs de ressources, comme indiqué ci-dessous.

{{< img src="integrations/guide/azure_architecture_and_configuration/datadog_agent_build_metrics_and_logs.png" alt="Diagramme du build de lʼAgent Datadog" >}}

Les paramètres de diagnostic créés par la ressource Datadog incluent toutes les catégories de logs, sont configurés avec `Send to Partner Solution` et renvoient des logs à la ressource d'origine Datadog. Ils suivent le format de dénomination `DATADOG_DS_V2_<UNIQUE_IDENTIFIER>`.

Toute modification manuelle de la ressource, y compris sa suppression, est annulée en quelques minutes.

Vous trouverez ci-dessous un exemple de paramètre de diagnostic créé par une ressource Datadog :

{{< img src="intégrations/guide/azure_architecture_and_configuration/diagnostic_setting.png" alt="Diagramme montrant le paramètre de diagnostic" >}}

### Autres options de configuration pour le transfert de logs avec la version native de lʼintégration Azure

Les boutons d'activation en un clic des logs dans la ressource Datadog permettent dʼautomatiser le processus dʼajout de paramètres de diagnostic. Dans certains cas, les organisations peuvent vouloir gérer et configurer les paramètres de diagnostic elles-mêmes, tout en profitant de la capacité de transfert automatisé de logs avec lʼintégration native Azure. 

Les paramètres de diagnostic créés manuellement ne sont pas affectés par les paramètres des logs sur la ressource Datadog et ne sont pas supprimés en fonction des règles de tags spécifiées dans la ressource Datadog. Il n'est pas nécessaire que les logs de ressources soient activés sur la ressource Datadog pour que le transfert de logs manuel fonctionne. Toutefois, la ressource Datadog utilisée pour le transfert de logs ne doit pas être désactivée.

Les raisons de gérer manuellement les paramètres de diagnostic sont les suivantes :

  1. Stratégies en matière dʼinfrastructure as code
       Des stratégies internes strictes concernant l'IaC qui exigent que toutes les ressources soient créées et gérées de manière déterministe (par exemple, si la création automatique de paramètres de diagnostic par la ressource Datadog entraîne un conflit insoluble entre l'état souhaité et l'état réel).

  2. Limiter les catégories de logs de ressources
       Comme les paramètres de diagnostic créés automatiquement par la ressource Datadog incluent toutes les catégories de logs, la spécification d'un sous-ensemble de ces catégories exige que vous créiez vous-même des paramètres de diagnostic.  
       **Remarque** : vous pouvez également utiliser les [filtres d'exclusion][1] pour exclure ces logs de l'indexation lors de leur intégration dans Datadog.

  3. Transmission de logs entre abonnements
       La transmission de logs entre les abonnements est utile pour envoyer des logs et aucune autre donnée à partir d'un abonnement spécifique. Pour activer la transmission de logs entre abonnements, enregistrez le fournisseur de ressources `Microsoft.Datadog` dans chaque abonnement destiné à envoyer des logs avant de créer les paramètres de diagnostic. La ressource Datadog utilisée pour le transfert de logs collecte toujours les métriques et les données de son propre abonnement et de tous les abonnements configurés via le volet des ressources surveillées.

       {{< img src="integrations/guide/azure_architecture_and_configuration/datadog_agent_build_resource_providers.png" alt="Capture dʼécran de la page des fournisseurs de ressources dans Azure Portal avec Microsoft. Datadog montrant le statut enregistré." >}}

  4. Tests 
       L'envoi d'exemples de logs à Datadog peut être utile pour des tests ou d'autres investigations. Dans ce cas, il peut être plus rapide d'ajouter manuellement des paramètres de diagnostic que d'attendre qu'ils soient créés automatiquement à partir des tags et des paramètres mis à jour.

Cette architecture est présentée ci-dessous, y compris le système d'abonnement croisé facultatif :

{{< img src="integrations/guide/azure_architecture_and_configuration/custom_azure_native_log_forwarding.png" alt="Diagramme montrant la configuration personnalisée du transfert de logs de la version native dʼAzure" >}}

[1]: /fr/logs/log_configuration/indexes/#exclusion-filters
{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/