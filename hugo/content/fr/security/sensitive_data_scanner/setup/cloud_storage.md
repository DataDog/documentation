---
aliases:
- /fr/sensitive_data_scanner/setup/cloud_storage
description: Déployez les Datadog Agentless scanners pour analyser les compartiments
  Amazon S3 à la recherche de données sensibles avec Sensitive Data Scanner. Couvre
  la configuration de Remote Configuration et le déploiement via CloudFormation ou
  Terraform.
disable_toc: false
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentation
  text: Cloud Security Agentless Scanning
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: Documentation
  text: En savoir plus sur les règles de bibliothèque prêtes à l'emploi
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: Documentation
  text: En savoir plus sur la création de règles personnalisées
title: Configurer Sensitive Data Scanner pour le stockage cloud
---
{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">L'analyse du stockage cloud n'est pas disponible sur le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

## Présentation {#overview}

Déployez les Datadog Agentless scanners dans votre environnement pour rechercher des informations sensibles dans vos ressources de stockage cloud. Les Agentless scannerssont des instances EC2 que vous contrôlez et exécutez au sein de votre environnement. Les scanners utilisent [Remote Configuration][1] pour récupérer une liste de compartiments S3 ainsi que leurs dépendances. Ils analysent de nombreux types de fichiers texte, tels que les fichiers CSV et JSON dans vos compartiments S3.

Lorsqu'un Agentless scanner trouve une correspondance avec l'une des [règles de bibliothèque SDS][2], l'instance d'analyse envoie le type de règle et l'emplacement de la correspondance à Datadog. **Remarque** : les ressources de stockage cloud et leurs fichiers sont uniquement lus dans votre environnement ; aucune donnée sensible analysée n'est renvoyée à Datadog.

Sur la [page des résultats][3] de Sensitive Data Scanner, vous pouvez voir quelles ressources de stockage cloud ont été analysées et les règles qui ont généré ces correspondances.

Ce document vous guide à travers :
- [Enable Remote Configuration](#enable-remote-configuration) pour utiliser Sensitive Data Scanner pour le stockage cloud
- [Considérations de sécurité](#security-considerations) à prendre en compte lors de l'utilisation de Sensitive Data Scanner pour le stockage cloud
- Déploiement de scanners dans votre environnement à l'aide de [CloudFormation](#automatically-deploy-scanners-using-cloudformation) ou [Terraform](#manually-deploy-scanners-using-terraform)

## Enable Remote Configuration {#enable-remote-configuration}

Remote Configuration permet à Datadog d'envoyer des données de configuration (telles que les ressources de stockage cloud à analyser) à vos scanners déployés. Pour utiliser le Sensitive Data Scanner dans vos environnements AWS, vous devez vous assurer que :
- Remote Configuration est activée pour votre organisation Datadog.
- Vous utilisez des clés d'API Datadog Remote Configuration-enabled pour les comptes AWS sur lesquels des scanners sont déployés.

Remote Configuration est activée par défaut sur la plupart des organisations. Pour le vérifier, accédez à la page des paramètres [Remote Configuration][4]. Si Remote Configuration n'est pas activée :
1. Assurez-vous que vos autorisations RBAC incluent [`org_management`][7].
1. Depuis la [Remote Configuration setup page][5], cliquez sur {{< ui >}}Enable for your Organization{{< /ui >}} > {{< ui >}}Next Step{{< /ui >}}.
1. Recherchez et sélectionnez les clés d'API que vous souhaitez utiliser avec Remote Configuration, puis cliquez sur {{< ui >}}Enable Keys{{< /ui >}}. 
1. Cliquez sur {{< ui >}}Next Step{{< /ui >}} > {{< ui >}}Done{{< /ui >}}. Vous n'avez pas besoin de configurer les composants Datadog tels que l'Agent ou les traceurs.

**Remarques** :
- Seuls les comptes AWS sur lesquels des scanners sont déployés nécessitent des clés d’API Datadog Remote Configuration-enabled.
- Seuls les administrateurs disposant des autorisations `org_management` peuvent activer Remote Configuration pour votre organisation. Une fois Remote Configuration activée, seuls les utilisateurs disposant de l'autorisation `api_keys_write` peuvent activer Remote Configuration pour des clés d'API individuelles.

## Considérations de sécurité {#security-considerations}

Comme les instances de scanner ont potentiellement accès à des données sensibles, Datadog recommande de restreindre l'accès à ces instances aux seuls utilisateurs administratifs.

Pour atténuer davantage ce risque, Datadog met en œuvre les mesures de sécurité suivantes :

- Le scanner Datadog fonctionne au sein de votre infrastructure, garantissant que toutes les données, y compris les résultats contenant des données sensibles, restent isolées et sécurisées.
- Toute transmission de données entre le scanner et Datadog est chiffrée à l'aide de protocoles conformes aux normes du secteur (tels que HTTPS) afin de garantir la confidentialité et l'intégrité des données.
- Datadog examine et limite soigneusement les autorisations nécessaires au scanner pour garantir qu'il puisse effectuer des analyses sans accès inutile. Cela signifie que le scanner fonctionne selon le principe du moindre privilège et ne dispose que des autorisations minimales nécessaires pour fonctionner efficacement.
- Les mises à jour de sécurité automatiques sont activées sur les instances de scanner de Datadog. Cette fonctionnalité automatise le processus d'installation des correctifs et mises à jour de sécurité critiques sans nécessiter d'intervention manuelle.
- Les instances de scanner Datadog sont automatiquement remplacées toutes les 24 heures. Cette rotation garantit que les instances de scanner sont continuellement mises à jour avec les dernières images Ubuntu.
- L'accès aux instances de scanner est étroitement contrôlé par l'utilisation de groupes de sécurité. Aucun accès entrant au scanner n'est autorisé, ce qui réduit davantage le risque de compromission de l'instance.

Pour analyser les compartiments Amazon S3, ces autorisations sont requises :

- `s3:GetObject`
- `s3:ListBucket`
- `kms:Decrypt`
- `kms:GenerateDataKey`

## Déployer des scanners {#deploy-scanners}

Les Agentless scanners sont des instances EC2 qui s'exécutent dans votre environnement. Ils analysent vos compartiments S3 à la recherche d'informations sensibles.

Il existe deux méthodes pour déployer des scanners dans votre environnement :
- [Déploiement automatique via CloudFormation](#automatically-deploy-scanners-using-cloudformation)
- [Déploiement manuel via Terraform](#manually-deploy-scanners-using-terraform)

### Déployer automatiquement des scanners via CloudFormation {#automatically-deploy-scanners-using-cloudformation}

Lorsque vous déployez des Agentless scanners via CloudFormation, un seul scanner est créé par compte et analyse toutes les régions du compte. Vous définissez la région dans laquelle le scanner est déployé.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Schéma montrant un scanner dans chaque compte effectuant une analyse entre les régions au sein de ce compte" style="width:100%;" >}}

Vous pouvez ajouter un scanner à un nouveau compte AWS ou à un compte AWS existant.

{{< tabs >}}
{{% tab "Nouveau compte AWS" %}}

1. Accédez à la page des paramètres [Sensitive Data Scanner][1].
1. Sous l'onglet {{< ui >}}Storage{{< /ui >}}, dans la section {{< ui >}}Cloud Settings{{< /ui >}}, cliquez sur {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}.
1. Laissez {{< ui >}}Automatically using CloudFormation{{< /ui >}} activé.
1. Sélectionnez la région AWS dans le menu déroulant.
1. Sélectionnez une clé d'API déjà configurée pour Remote Configuration. Si la clé d'API que vous sélectionnez n'a pas Remote Configuration activée, celle-ci est automatiquement activée pour cette clé lors de la sélection. **Remarque** : Seuls les utilisateurs disposant des autorisations `api_keys_write` peuvent activer Remote Configuration pour des clé d'API individuelles.
1. Si vous souhaitez envoyer des journaux AWS à Datadog, laissez {{< ui >}}Yes{{< /ui >}} sélectionné.
1. Sélectionnez {{< ui >}}Yes{{< /ui >}} si vous souhaitez utiliser Datadog Cloud Security.
1. {{< ui >}}Enable Sensitive Data Scanner{{< /ui >}} est automatiquement sélectionné par défaut. Cela indique à CloudFormation d'ajouter la politique AWS Managed SecurityAudit à votre rôle d'intégration Datadog AWS et d'activer l'Agentless Scanning pour commencer à analyser vos magasins de données cloud.
1. Cliquez sur {{< ui >}}Launch CloudFormation Template{{< /ui >}}.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{% tab "Compte AWS existant" %}}

1. Accédez à la page des paramètres [Sensitive Data Scanner][1].
1. Sous l'onglet {{< ui >}}Storage{{< /ui >}}, dans la section {{< ui >}}AWS{{< /ui >}} :
    - Si l'Agentless Scanning est déjà activée dans un compte :
      1. Cliquez sur l'icône en forme de crayon pour le compte.
      1. Activez {{< ui >}}Enable Sensitive Data Scanning{{< /ui >}} pour ajouter le scanner au compte.
      1. Cliquez sur {{< ui >}}Save{{< /ui >}}.
    - Si l'Agentless Scanning n'est pas activée dans un compte :
      1. Cliquez sur l'icône plus pour le compte pour lequel vous souhaitez activer l'analyse des données sensibles.
      1. Sélectionnez l'option permettant d'ajouter le scanner via CloudFormation.
      1. Sélectionnez la région AWS dans le menu déroulant.
      1. Sélectionnez une clé d'API déjà configurée pour Remote Configuration. Si la clé d'API que vous sélectionnez n'a pas Remote Configuration activée, celle-ci est automatiquement activée pour cette clé lors de la sélection.
      1. Activez {{< ui >}}Enable Sensitive Data Scanning{{< /ui >}} pour ajouter le scanner au compte.
      1. Cliquez sur {{< ui >}}Launch CloudFormation Template{{< /ui >}}.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{< /tabs >}}

### Déployer manuellement des scanners avec Terraform {#manually-deploy-scanners-using-terraform}

Vous pouvez déployer des Agentless scanners à l'aide du [module Terraform Datadog Agentless Scanner][7]. Datadog recommande de choisir l'une de ces deux options de configuration si vous déployez manuellement des scanners :

- Créez un compte AWS dédié aux Agentless scanners. Déployez un scanner pour chaque région contenant des ressources cloud que vous souhaitez analyser.

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagramme montrant un scanner central pour une région et le scanner analysant différents comptes" style="width:100%;" >}}

- Déployez un scanner pour chaque région contenant des ressources cloud que vous souhaitez analyser.

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-region.png" alt="Diagramme montrant un scanner dans chaque région qui analyse les comptes au sein de cette région" style="width:100%;" >}}

## Groupes d'analyse {#scanning-groups}

Sur la page des paramètres de [Cloud Storage][6], la section {{< ui >}}Scanning Groups{{< /ui >}} est en lecture seule. Toutes les [règles de bibliothèque][2] sont appliquées au sein du groupe d'analyse.

## Coût du fournisseur de services cloud {#cloud-service-provider-cost}

Lors de l'utilisation de l'Agentless Scanning, des coûts supplémentaires sont engendrés par l'exécution des scanners dans vos environnements cloud.

Pour obtenir des estimations sur les coûts des scanners, contactez votre [Datadog Customer Success Manager][8] .

## Désactiver l'Agentless Scanning {#disable-agentless-scanning}

1. Accédez à la page des paramètres du [Sensitive Data Scanner][6] .
1. Cliquez sur l'icône en forme de crayon à côté du compte pour lequel vous souhaitez désactiver Agentless scanning .
1. Basculez {{< ui >}}Enable Sensitive Data Scanning{{< /ui >}} sur off.

## Désinstaller Agentless scanning {#uninstall-agentless-scanning}

Pour désinstaller Agentless Scanning, connectez-vous à votre console AWS et supprimez la pile CloudFormation créée pour Agentless Scanning .

## Pour en savoir plus {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/remote_configuration
[2]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/data-security
[4]: https://app.datadoghq.com/organization-settings/remote-config
[5]: https://app.datadoghq.com/organization-settings/remote-config/setup
[6]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security
[7]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[8]: mailto:success@datadoghq.com
[9]: /fr/account_management/rbac/permissions#access-management