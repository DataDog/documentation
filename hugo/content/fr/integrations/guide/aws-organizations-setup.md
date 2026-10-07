---
description: Procédure à suivre pour configurer l'intégration Datadog/AWS pour une
  organisation AWS
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-integrating-100-aws-accounts-with-datadog/
  tag: Architecture Center
  text: Guide pour intégrer plus de 100 comptes AWS avec Datadog
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: Guide
  text: Dépannage de l'intégration AWS
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: Blog
  text: Métriques clés pour la surveillance AWS
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: Blog
  text: Présentation de Datadog Cloud Security Posture Management
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: Blog
  text: Sécurisez votre infrastructure en temps réel avec Datadog Cloud Workload Security
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: Blog
  text: Annonce de Datadog Security Monitoring
title: Configuration multicompte de l'intégration AWS pour les organisations AWS
---
## Présentation {#overview}

Ce guide décrit la marche à suivre afin de configurer l'[intégration AWS][8] avec plusieurs comptes d'une organisation AWS.

Le modèle CloudFormation StackSet fourni par Datadog automatise la création du rôle IAM requis et des politiques associées dans chaque compte AWS sous une organisation ou une unité organisationnelle (OU), et configure les comptes au sein de Datadog, éliminant ainsi le besoin d'une configuration manuelle. Une fois configurée, l'intégration commence automatiquement à collecter les métriques et les événements AWS pour vous permettre de commencer à surveiller votre infrastructure.

Le modèle CloudFormation StackSet de Datadog effectue les étapes suivantes :

1. Déploie la pile CloudFormation AWS de Datadog dans chaque compte sous une organisation AWS ou une unité organisationnelle.
2. Crée automatiquement le rôle IAM et les politiques nécessaires dans les comptes cibles.
3. Initie automatiquement l'ingestion des métriques et événements AWS CloudWatch à partir des ressources AWS dans les comptes.
4. Désactive éventuellement la collecte de métriques pour l'infrastructure AWS. Ceci est utile pour les cas d'utilisation spécifiques de Cloud Cost Management (CCM) ou de Cloud Security Misconfigurations.
5. Configure éventuellement Cloud Security Misconfigurations pour surveiller les erreurs de configuration des ressources dans vos comptes AWS.

**Remarque** : Le StackSet ne configure pas le transfert de logs dans les comptes AWS. Pour configurer les logs, suivez les étapes du guide [Collecte de logs][2].


## Prérequis {#prerequisites}

1. **Accès au compte de gestion** : Votre utilisateur AWS doit pouvoir accéder au compte de gestion AWS.
2. **Un administrateur de compte a activé l'accès approuvé avec AWS Organizations** : Reportez-vous à [Activer l'accès approuvé avec AWS Organizations][3] pour activer l'accès approuvé entre les StackSets et Organizations, afin de créer et déployer des piles en utilisant des autorisations gérées par le service.

**Remarque** : La configuration multi-compte AWS Organizations ne prend pas en charge le déploiement sur des intégrations de comptes AWS existantes configurées individuellement. Si un StackSet cible un compte qui est déjà intégré individuellement à Datadog, l'intégration de compte existante est supprimée.

## Configuration {#setup}

Pour commencer, accédez à la [page de configuration de l'intégration AWS][1] dans Datadog et cliquez sur **Add AWS Account(s)** -> **Add Multiple AWS Accounts** -> **CloudFormation StackSet**.

Cliquez sur **Launch CloudFormation StackSet**. Ceci ouvre la console AWS et charge un nouveau CloudFormation StackSet. Conservez le choix par défaut de `Service-managed permissions` sur AWS.  
  
Suivez les étapes ci-dessous sur la console AWS pour créer et déployer votre StackSet :

1. **Choisir un modèle**  
Copiez l'URL du modèle depuis la page de configuration de l'intégration Datadog AWS pour l'utiliser dans le paramètre `Specify Template` du StackSet.


2. **Spécifier les détails du StackSet**
    - Sélectionnez votre clé d'API Datadog depuis la page de configuration de l'intégration Datadog/AWS, puis saisissez-la dans le paramètre `DatadogApiKey` du StackSet.
    - Sélectionnez votre clé d'application Datadog depuis la page de configuration de l'intégration Datadog/AWS, puis saisissez-la dans le paramètre `DatadogAppKey` du StackSet.

    - *Facultatif :*  
        1. Activez [Cloud Security Misconfigurations][5] pour analyser votre environnement cloud, vos hosts et vos conteneurs à la recherche de mauvaises configurations et de risques de sécurité.  
        1. Désactivez la collecte de métriques si vous ne souhaitez pas surveiller votre infrastructure AWS. Ceci est recommandé uniquement pour des cas d'utilisation spécifiques de [Cloud Cost Management][6] (CCM) ou de [Cloud Security Misconfigurations][5].

3. **Configurer les options du StackSet**  
Conservez l'option **Execution configuration** sur `Inactive` afin que le StackSet effectue une opération à la fois.

4. **Définir des options de déploiement**
    - Vous pouvez définir votre `Deployment targets` pour déployer l'intégration Datadog dans toute une organisation ou dans une ou plusieurs unités organisationnelles.


    - Ne désactivez pas l'option `Automatic deployment`, afin de déployer automatiquement l'intégration Datadog/AWS dans les nouveaux comptes rejoignant l'organisation ou l'unité d'organisation.

    - Sous **Specify regions**, sélectionnez une seule région pour laquelle vous souhaitez déployer l'intégration dans chaque compte AWS.   
      **REMARQUE** : Le StackSet crée des ressources IAM globales qui ne sont pas spécifiques à une région. Si plusieurs régions sont sélectionnées à cette étape, le déploiement échoue. 

    - Définissez les paramètres par défaut sous **Deployment options** pour qu'ils soient séquentiels, afin que les opérations StackSets soient déployées dans une région à la fois.

5. **Vérifier votre configuration**  
    Accédez à la page **Review** et cliquez sur **Submit**. Cela lance le processus de création pour le Datadog StackSet. Cela peut prendre plusieurs minutes selon le nombre de comptes à intégrer. Assurez-vous que le StackSet crée correctement toutes les ressources avant de continuer.

    Une fois les piles créées, retournez à la page de configuration de l'intégration AWS dans Datadog et cliquez sur **Done**. Il peut falloir quelques minutes pour voir les métriques et les événements provenant de vos comptes AWS nouvellement intégrés.

6. *(Facultatif)* **Intégrer le compte de gestion AWS**

   Le compte de gestion AWS ne se déploie pas automatiquement après cette configuration de StackSet, en raison des restrictions d'AWS sur les [autorisations gérées par le service][10].
   Suivez les étapes dans [Datadog-Amazon Cloudformation][9] pour intégrer le compte de gestion AWS.


## Activer les intégrations pour des services AWS individuels {#enable-integrations-for-individual-aws-services}

Consultez la [page Integrations][4] pour obtenir une liste complète des sous-intégrations disponibles pouvant être activées sur chaque compte AWS surveillé. Toute sous-intégration envoyant des données à Datadog est automatiquement installée lorsque des données sont reçues de l'intégration.

## Envoyer des logs {#send-logs}

Le StackSet ne configure pas le transfert de logs dans les comptes AWS. Pour configurer les logs, suivez les étapes du guide [Collecte de logs][2].

## Désinstaller l'intégration AWS {#uninstall-aws-integration}

Pour désinstaller l'intégration AWS de tous les comptes et régions AWS d'une organisation, supprimez d'abord toutes les StackInstances, puis le StackSet. Suivez les étapes décrites dans [Delete a stack set][7] pour supprimer les StackInstances et le StackSet créés. 

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
[2]: /fr/integrations/amazon_web_services/#log-collection
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html
[4]: /fr/integrations/#cat-aws
[5]: /fr/security/cloud_security_management/setup/
[6]: https://docs.datadoghq.com/fr/cloud_cost_management/?tab=aws
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-delete.html
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[9]: https://docs.datadoghq.com/fr/integrations/guide/amazon_cloudformation/
[10]: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_DeploymentTargets.html