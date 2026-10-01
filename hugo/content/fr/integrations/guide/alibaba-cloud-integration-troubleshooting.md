---
description: Étapes de dépannage pour l'intégration Datadog Alibaba Cloud
further_reading:
- link: https://docs.datadoghq.com/integrations/alibaba-cloud/
  tag: Intégration
  text: Intégration Alibaba Cloud
title: Dépannage de l'intégration Alibaba Cloud
---
## Présentation {#overview}

Utilisez ce guide pour dépanner l'[intégration Alibaba Cloud][1] de Datadog. Des problèmes de configuration apparaissent sur la [tuile d'intégration Alibaba Cloud][2].

## La clé d'accès Alibaba Cloud est invalide ou n'existe plus {#alibaba-cloud-access-key-is-invalid-or-no-longer-exists}

Ce problème survient lorsque l'ID de clé d'accès ou le secret de clé d'accès configuré pour l'intégration est invalide, inactif ou supprimé.

Pour résoudre ce problème :

- Si la clé d'accès est inactive, réactivez-la dans la console RAM d'Alibaba Cloud.
- Si le secret de clé d'accès est invalide, mettez à jour l'intégration Datadog avec le secret correct.
- Si la clé d'accès n'existe plus ou si le secret correct n'est pas disponible, créez une clé d'accès de remplacement pour l'utilisateur RAM utilisé par Datadog. Copiez le nouvel ID de clé et le secret, puis mettez à jour les identifiants Alibaba Cloud dans l'intégration Datadog. Pour obtenir des instructions, consultez [Create an AccessKey pair][3] dans la documentation Alibaba Cloud.

Confirmez ensuite que l'utilisateur RAM dispose des autorisations requises par l'[intégration Alibaba Cloud][1].

## Autorisations de surveillance cloud manquantes {#cloud-monitoring-permissions-are-missing}

Ce problème survient lorsque l'utilisateur RAM utilisé par l'intégration Datadog ne peut pas interroger les métriques CloudMonitor.

Pour résoudre ce problème, ajoutez l'autorisation `cms:DescribeMetricList` à la politique associée à l'utilisateur RAM de l'intégration Datadog. Attendez ensuite environ 15 minutes pour le prochain cycle de collecte afin de confirmer que Datadog reçoit les métriques CloudMonitor.

Pour obtenir des instructions sur la modification d'une politique RAM, consultez [Accorder des autorisations à un utilisateur RAM][4].

## Autorisations de collecte de logs manquantes {#log-collection-permissions-are-missing}

<!-- vale Datadog.words_case_insensitive = NO -->
Ce problème survient lorsque l'utilisateur RAM utilisé par l'intégration Datadog ne dispose pas des autorisations requises pour lire à partir de Simple Log Service (SLS).
<!-- vale Datadog.words_case_insensitive = YES -->

Pour résoudre ce problème :

1. Examinez la politique associée à l'utilisateur RAM de l'intégration Datadog.
2. Ajoutez les autorisations de lecture SLS décrites dans [SLS RAM access control permissions][8].
3. Confirmez que la politique s'applique à chaque projet et logstore SLS à partir desquels vous souhaitez que Datadog collecte des logs.

Pour obtenir des instructions sur la modification d'une politique RAM, consultez [Accorder des autorisations à un utilisateur RAM][4].

## Les autorisations Prometheus pour ACK sont manquantes {#prometheus-permissions-for-ack-are-missing}

Ce problème survient lorsque l'utilisateur RAM utilisé par l'intégration Datadog ne dispose pas des autorisations requises pour configurer Alibaba Cloud Managed Service for Prometheus sur un cluster Alibaba Cloud Container Service for Kubernetes (ACK).

Pour remédier à ce problème, ajoutez les autorisations suivantes à la politique associée à cet utilisateur RAM. Limitez la politique aux clusters concernés si possible. La politique doit inclure au moins :

- `cs:InstallClusterAddons`
- `cs:UnInstallClusterAddons`

Ces autorisations permettent à Datadog d'installer et de réinstaller le module complémentaire `ack-arms-prometheus` sur les clusters ACK.

Pour obtenir des instructions sur la modification d'une politique RAM, consultez [Accorder des autorisations à un utilisateur RAM][4]. Pour les options de délimitation des ressources, consultez [InstallClusterAddons][9].

<!-- vale Datadog.headings = NO -->
## Le centre de ressources Alibaba Cloud n'est pas activé {#alibaba-cloud-resource-center-is-not-enabled}
<!-- vale Datadog.headings = YES -->

Ce problème survient lorsque le centre de ressources Alibaba Cloud n'est pas activé pour le compte. Datadog ne peut pas collecter de métriques tant que vous n'avez pas activé le service.

Pour résoudre ce problème :

1. Connectez-vous au compte Alibaba Cloud qui est connecté à Datadog.
2. Ouvrez [Resource Center][5].
3. Activez le centre de ressources pour le compte.
4. Attachez la politique `AliyunResourceCenterReadOnlyAccess` à l'utilisateur RAM de l'intégration Datadog.
5. Attendez environ 15 minutes pour le prochain cycle de collecte afin de confirmer que Datadog reçoit les métriques.

## Limite de quota de l'API Alibaba Cloud atteinte {#alibaba-cloud-api-quota-limit-reached}

Ce problème survient lorsque le compte a atteint une limite de quota de l'API Alibaba Cloud. Ceci est distinct de la limitation temporaire des requêtes.

Pour résoudre ce problème :

1. Examinez le quota et le statut de facturation du compte Alibaba Cloud.
2. Le cas échéant, activez les quotas de paiement à l'utilisation ou résolvez les problèmes de facturation en suspens.
3. Si le quota existant est insuffisant, [demandez une augmentation de quota][6].
4. Attendez que le changement de quota prenne effet, puis confirmez que Datadog reprend la collecte.

Besoin d'aide supplémentaire ? Contactez le [support Datadog][7].

[1]: /fr/integrations/alibaba-cloud/
[2]: https://app.datadoghq.com/integrations?integrationId=alibaba-cloud
[3]: https://www.alibabacloud.com/help/en/ram/user-guide/create-an-accesskey-pair
[4]: https://www.alibabacloud.com/help/en/ram/user-guide/grant-permissions-to-a-ram-user
[5]: https://resourcecenter.console.aliyun.com/
[6]: https://www.alibabacloud.com/help/en/resource-management/user-guide/request-a-quota-increase
[7]: /fr/help/
[8]: https://www.alibabacloud.com/help/en/sls/log-service-ram-access-control-permissions-configuration
[9]: https://www.alibabacloud.com/help/en/ack/ack-managed-and-ack-dedicated/developer-reference/api-cs-2015-12-15-installclusteraddons