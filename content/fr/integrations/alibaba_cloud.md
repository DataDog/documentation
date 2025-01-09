---
categories:
- cloud
dependencies: []
description: Intégrez vos services Alibaba Cloud à Datadog.
doc_link: https://docs.datadoghq.com/integrations/alibaba_cloud/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-alibaba-cloud-datadog/
  tag: Blog
  text: Surveiller Alibaba Cloud avec Datadog
git_integration_title: alibaba_cloud
has_logo: true
integration_id: alibaba-cloud
integration_title: Alibaba Cloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: alibaba_cloud
public_title: Intégration Datadog/Alibaba Cloud
short_description: Intégrez vos services Alibaba Cloud à Datadog.
version: '1.0'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">L'intégration Alibaba Cloud ne prend pas en charge le site gouvernemental de Datadog.</div>
{{< /site-region >}}

## Présentation

Connectez Datadog à Alibaba Cloud pour recueillir les métriques en provenance des services suivants :

- Alibaba Cloud Servers Load Balancer (SLB)
- Instances Alibaba Elastic Compute Service
- Alibaba Cloud ApsaraDB pour instances RDS
- Alibaba Cloud ApsaraDB pour instances Redis
- Instances Alibaba Cloud Content Delivery Network (CDN)
- Clusters Alibaba Cloud Container Service
- Instances Alibaba Cloud Express Connect

## Configuration

### Installation

Accédez au [carré d'intégration Datadog/Alibaba Cloud][1] et cliquez sur _add account_.

### Configuration

Renseignez les paramètres suivants pour intégrer Datadog à l'API Alibaba Cloud :

- **`Account Id`**

Vous le trouverez en passant le curseur sur votre avatar dans le coin supérieur droit de la console Alibaba Cloud et en sélectionnant _Security Settings_. L'identifiant de compte est affiché en haut de cette page.

{{< img src="integrations/alibaba_cloud/account_id_ac.png" alt="Identifiant de compte AC" style="width:30%;">}}

- **`Access Key Id`** et **`Access Key Secret`**

Dans votre compte Alibaba Cloud :

1. Créez un utilisateur dans l'onglet _RAM_ à l'aide des paramètres suivants :

    - `Logon Name` : Datadog
    - `display name` : Datadog
    - `description` : utilisateur Datadog pour l'intégration Datadog/Alibaba Cloud

2. Sélectionnez _Programmatic Access_ :

    {{< img src="integrations/alibaba_cloud/ac_programmatic_access.png" alt="Programmatic Access" style="width:40%;">}}

3. Après avoir cliqué sur _OK_, copiez et collez les valeurs indiquées dans `AccessKeyID` et `AccessKeySecret` dans le [carré d'intégration Datadog/Alibaba Cloud][1] et cliquez sur _install integration_.

    {{< img src="integrations/alibaba_cloud/ac_access_keys.png" alt="Clés d'accès AC" style="width:40%;">}}

4. Dans votre compte Alibaba Cloud Account, sélectionnez `Add Permissions` pour l'utilisateur que vous venez de créer, puis ajoutez toutes les autorisations suivantes :

    ```text
    AliyunCloudMonitorReadOnlyAccess
    AliyunECSReadOnlyAccess
    AliyunKvstoreReadOnlyAccess
    AliyunRDSReadOnlyAccess
    AliyunSLBReadOnlyAccess
    AliyunCDNReadOnlyAccess
    AliyunCSReadOnlyAccess
    AliyunExpressConnectReadOnlyAccess
    ```

5. Cliquez sur _Update_. Après environ 15 minutes, les métriques visibles dans l'onglet _Metrics_ du carré d'intégration Datadog/Alibaba Cloud commencent à apparaître sur votre [page Metrics Explorer][2]. Celles-ci comportent tous les tags personnalisés que vous ajoutez à vos ressources ainsi que les tags suivants :

    - [DescribeInstances kvstore/redis][3]
    - [DescribeInstances ECS][4]
    - [DescribeDBInstances][5]
    - [DescribeLoadBalancers][6]

6. Facultatif : définissez l'option `Optionally Limit Metrics Collection` dans votre [carré d'intégration Datadog/Alibaba Cloud][1]. Cette liste de tags Alibaba Cloud séparés par des virgules (sous la forme `<KEY:VALUE>`) définit un filtre à utiliser lors de la collecte des métriques en provenance d'Alibaba Cloud. Les wildcards tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères) peuvent être utilisés. Seuls les hosts correspondant à l'une des étiquettes définies sont importés dans Datadog ; le reste est ignoré. Les hosts correspondant à une étiquette donnée peuvent également être exclus en ajoutant `!` devant l'étiquette.

## Données collectées

### Métriques
{{< get-metrics-from-git "alibaba_cloud" >}}


### Événements

Vous pouvez configurer la collecte d'événements Alibaba Cloud pour chaque service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/alibaba_cloud
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://www.alibabacloud.com/help/doc-detail/60933.htm
[4]: https://www.alibabacloud.com/help/doc-detail/25506.htm
[5]: https://www.alibabacloud.com/help/doc-detail/26232.htm
[6]: https://www.alibabacloud.com/help/doc-detail/27582.htm
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/alibaba_cloud/alibaba_cloud_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/