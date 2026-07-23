---
description: Procédure à suivre pour configurer l'intégration Datadog/AWS pour une
  organisation AWS
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: Guide
  text: Dépannage de l'intégration AWS
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: Blog
  text: Métriques clés pour la surveillance AWS
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: Blog
  text: Présentation de la solution Cloud Security Posture Management de Datadog
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: Blog
  text: Sécurisez votre infrastructure en temps réel avec Datadog Cloud Workload Security
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: Blog
  text: Présentation de Datadog Security Monitoring

title: Configuration multicompte de l'intégration AWS pour les organisations AWS
---

## Présentation

Ce guide décrit la marche à suivre afin de configurer l'[intégration AWS][8] avec plusieurs comptes d'une organisation AWS.

Le modèle CloudFormation StackSet fourni par Datadog automatise la création du rôle et des stratégies associées IAM dont vous avez besoin dans chaque compte AWS faisant partie d'une organisation ou d'une unité d'organisation. Il configure également les comptes dans Datadog : vous n'avez donc plus besoin de procéder à une configuration manuelle. Une fois configurée, l'intégration commence automatiquement à recueillir des métriques et événements AWS, afin que vous puissiez surveiller votre infrastructure.

Le modèle CloudFormation StackSet de Datadog effectue les étapes suivantes :

1. Il déploie la pile AWS CloudFormation Datadog dans chaque compte faisant partie d'une organisation ou d'une unité d'organisation AWS.
2. Il crée automatiquement le rôle et les stratégies IAM nécessaires dans les comptes cibles.
3. Il lance automatiquement l'ingestion de métriques et d'événements AWS CloudWatch depuis les ressources AWS dans les comptes.
4. Il désactive, si besoin, la collecte de métriques pour l'infrastructure AWS. Cela peut s'avérer utile pour certains cas d'utilisation liés à Cloud Cost Management (CCM) ou à Cloud Security Management Misconfigurations (CSM Misconfigurations).
5. Il configure, si besoin, CSM Misconfigurations afin de surveiller les problèmes de configuration de vos ressources dans vos comptes AWS.

**Remarque** : le StackSet ne configure pas la transmission des logs dans les comptes AWS. Pour configurer les logs, suivez les étapes de la rubrique [Collecte de logs][2].


## Prérequis

1. **Accès au compte de gestion** : votre utilisateur AWS doit pouvoir accéder au compte de gestion AWS. 
2. **Accès sécurisé pour les organisations AWS activé par un administrateur de compte** : consultez la section [Activer l'accès sécurisé avec AWS Organizations][3] pour activer l'accès sécurisé entre les StackSets et les organisations, afin de créer et de déployer des piles à l'aide d'autorisations gérées par les services.

## Implémentation

Pour commencer, accédez à la [page de configuration de l'intégration AWS][1] dans Datadog, puis cliquez sur **Add AWS Account(s)** -> **Add Multiple AWS Accounts** -> **CloudFormation StackSet**.

Cliquez sur **Launch CloudFormation StackSet** pour ouvrir la console AWS et charger un nouveau StackSet CloudFormation. Ne modifiez pas l'option `Service-managed permissions`, qui est définie par défaut sur AWS.

Suivez les étapes ci-dessous sur la console AWS pour créer et déployer votre StackSet :

1. **Choisir un modèle**  
Copiez l'URL du modèle depuis la page de configuration de l'intégration Datadog/AWS, afin de la coller dans le paramètre `Specify Template` du StackSet.


2. **Spécifier les détails du StackSet**
    - Sélectionnez votre clé d'API Datadog depuis la page de configuration de l'intégration Datadog/AWS, puis saisissez-la dans le paramètre `DatadogApiKey` du StackSet.
    - Sélectionnez votre clé d'application Datadog depuis la page de configuration de l'intégration Datadog/AWS, puis saisissez-la dans le paramètre `DatadogAppKey` du StackSet.

    - *Facultatif* :
        a. Activez [Cloud Security Management Misconfigurations][5] (CSM Misconfigurations) pour analyser votre environnement cloud, vos hosts et vos conteneurs dans le but de détecter les problèmes de configuration et les risques de sécurité.
        b. Désactivez la collecte de métriques si vous ne souhaitez pas surveiller votre infrastructure AWS. Cette étape est uniquement recommandée pour certains cas d'utilisation liés à [Cloud Cost Management][6] (CCM) ou à [CSM Misconfigurations][5].

3. **Configurer les options du StackSet**
Ne modifiez pas l'option **Execution configuration**, qui est définie par défaut sur `Inactive`. Votre StackSet effectue ainsi une seule opération à la fois.

4. **Définir des options de déploiement**
    - Vous pouvez définir vos `Deployment targets` afin de déployer l'intégration Datadog sur l'ensemble d'une organisation ou sur une ou plusieurs unités d'organisation.


    - Ne désactivez pas l'option `Automatic deployment`, afin de déployer automatiquement l'intégration Datadog/AWS dans les nouveaux comptes rejoignant l'organisation ou l'unité d'organisation.

    - Sous **Specify regions**, sélectionnez une seule région pour laquelle vous souhaitez déployer l'intégration dans chaque compte AWS.   

      **Remarque** : le StackSet crée des ressources IAM globales qui ne sont propres à aucune région. Si vous sélectionnez plusieurs régions lors de cette étape, le déploiement échouera. 

    - Définissez les paramètres par défaut sous **Deployment options** de manière à configurer un ordre séquentiel, afin que les opérations du StackSet soient déployées sur une seule région à la fois.

5. **Vérifier votre configuration**
    Accédez à la page **Review**, puis cliquez sur **Submit**. Le processus de création du StackSet Datadog est alors initié. Il peut prendre plusieurs minutes, en fonction du nombre de comptes à intégrer. Vérifiez que le StackSet a bien créé toutes les ressources avant de poursuivre.

    Une fois les piles créées, revenez sur la page de configuration de l'intégration AWS dans Datadog, puis cliquez sur **Done**. Les métriques et événements provenant des comptes AWS tout juste intégrés peuvent mettre quelques minutes avant de s'afficher.


## Activer des intégrations pour des services AWS spécifiques

Consultez la [page Integrations][4] pour obtenir la liste complète des sous-intégrations disponibles pouvant être activées sur chaque compte AWS surveillé. Une sous-intégration qui envoie des données à Datadog est automatiquement installée dès lors que vous recevez des données de l'intégration.

## Envoyer des logs

Le StackSet ne configure pas la transmission des logs dans les comptes AWS. Pour configurer les logs, suivez les étapes de la rubrique [Collecte de logs][2].

## Désinstaller l'intégration AWS

Pour désinstaller l'intégration AWS de tous les comptes AWS et toutes les régions d'une organisation, commencez par supprimer toutes les StackInstances, puis supprimez le StackSet. Suivez les étapes de la section [Supprimer un ensemble de piles][7] pour supprimer les StackInstances et le StackSet créés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
[2]: /fr/integrations/amazon_web_services/#log-collection
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html
[4]: /fr/integrations/#cat-aws
[5]: /fr/security/cloud_security_management/setup/
[6]: https://docs.datadoghq.com/fr/cloud_cost_management/?tab=aws
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-delete.html
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/