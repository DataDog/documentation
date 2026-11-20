---
description: Étapes de dépannage pour l'intégration Datadog AWS
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Intégration
  text: Intégration AWS
title: Dépannage de l'intégration AWS
---
## Présentation {#overview}

Utilisez ce guide pour résoudre les problèmes liés à l'[intégration AWS][1] de Datadog.

## Erreurs d'autorisation IAM {#iam-permission-errors}

<div class="alert alert-info">
Les modifications IAM peuvent prendre plusieurs minutes à se propager dans AWS. Après avoir modifié des rôles, des politiques ou des relations de confiance IAM, attendez au moins cinq minutes avant de revalider l'intégration. L'interface Datadog peut continuer à afficher des erreurs d'autorisation obsolètes pendant quelques heures après la propagation des modifications.
</div>

### Datadog n'est pas autorisé à exécuter sts:AssumeRole {#datadog-is-not-authorized-to-perform-stsassumerole}

L'erreur d'autorisation `sts:Assumerole` indique un problème avec la politique de confiance associée au `DatadogAWSIntegrationRole`. Consultez la documentation [Erreur : Datadog n'est pas autorisé à exécuter sts:AssumeRole][2] pour savoir comment résoudre ce problème.

**Remarque** : cette erreur peut persister dans l'interface Datadog pendant quelques heures, le temps que les modifications se propagent.

### Résoudre tous les problèmes d'autorisations AWS {#resolve-all-aws-permissions-issues}

Le bouton **Resolve all AWS permissions issues** sur la page d'intégration AWS vous permet d'utiliser une pile CloudFormation QuickStart pour mettre à jour le rôle IAM de votre intégration Datadog et résoudre les problèmes d'autorisations manquantes. 
Sous **Issues**, cliquez sur **Resolve All AWS Permissions Issues**. Cela lance une pile CloudFormation qui appelle l'[endpoint][13] de l'API publique de Datadog, récupère les dernières autorisations IAM nécessaires à l'intégration, crée de nouvelles politiques IAM contenant ces autorisations et les associe au rôle d'intégration. Elle attache également la politique AWS gérée `SecurityAudit` si elle n'est pas présente.

Les politiques créées sont nommées avec un préfixe `datadog-aws-integration-iam-permissions-`, suivi d'une valeur de hachage unique pour éviter tout conflit avec les politiques existantes que vous avez configurées. Vous pouvez consulter le modèle CloudFormation dans le [dépôt cloudformation-template][14] public de Datadog.

<div class="alert alert-danger">
Un clic sur <strong>Resolve All AWS Permissions Issues</strong> :<br>
  - Ne corrige pas les problèmes d'authentification liés au rôle (lorsque le nom du rôle, l'ID externe ou la configuration de la politique de confiance empêchent Datadog de s'authentifier auprès de votre compte AWS)<br>
  - Ne corrige pas les cas où une politique de contrôle de service (SCP) est appliquée et refuse explicitement les autorisations requises<br>
  - N'impacte aucune politique que vous attachez au rôle IAM d'intégration Datadog<br>
  - Si vous cliquez plusieurs fois, toutes les politiques précédentes créées avec ce préfixe sont supprimées avant que de nouvelles politiques ne soient créées
</div>

## Écarts de données {#data-discrepancies}

### Écart entre vos données dans CloudWatch et Datadog {#discrepancy-between-your-data-in-cloudwatch-and-datadog}

Les sections ci-dessous décrivent trois distinctions importantes à connaître, ainsi que les étapes pour [résoudre l'écart](#reconcile-the-discrepancy).

#### 1. Agrégation temporelle {#1-time-aggregation}

Datadog affiche les données brutes provenant d'AWS en valeurs par seconde, quelle que soit la période sélectionnée dans AWS. C'est pourquoi la valeur de Datadog pourrait paraître plus faible. Consultez [Agrégation temporelle][20] dans la documentation des métriques pour plus d'informations.

#### 2. Agrégation spatiale {#2-space-aggregation}

Les agrégateurs spatiaux `min`, `max` et `avg` ont une signification différente dans AWS et Datadog. Dans AWS, la latence moyenne, la latence minimale et la latence maximale sont trois métriques distinctes qu'AWS collecte. Lorsque Datadog interroge les métriques d'AWS CloudWatch, la latence moyenne est reçue sous forme d'une série temporelle unique par Elastic Load Balancer (ELB).

Dans Datadog, lorsque vous sélectionnez `min`, `max` ou `avg`, vous contrôlez la manière dont les multiples séries temporelles sont combinées. Par exemple, demander `system.cpu.idle` sans aucun filtre renvoie une série pour chaque host qui rapporte cette métrique, et ces séries doivent être combinées pour être représentées graphiquement. Si vous demandez plutôt `system.cpu.idle` à partir d'un seul host, aucune agrégation n'est nécessaire et basculer entre la moyenne et le maximum donne le même résultat.

Consultez [Agrégation spatiale][21] dans la documentation des métriques pour plus d'informations.

#### 3. Métriques par dimension {#3-per-dimension-metrics}

Certaines métriques AWS CloudWatch sont émises une fois par combinaison de dimensions, ce qui peut produire des valeurs qui semblent gonflées lorsqu'elles sont agrégées dans Datadog. Par exemple, la métrique Classic ELB `aws.elb.healthy_host_count` est rapportée séparément pour chaque zone de disponibilité. Lorsque l'équilibrage de charge inter-zones est activé, la somme de cette métrique sur toutes les zones de disponibilité produit un total supérieur au nombre réel de hosts en bonne santé. Consultez [Nombre incorrect de aws.elb.healthy_host_count](#wrong-count-of-awselbhealthy_host_count) pour plus de détails.

Pour éviter une agrégation produisant des valeurs gonflées, utilisez les variantes de la métrique `_deduped` lorsqu'elles sont disponibles, ou limitez le périmètre de votre requête à une valeur de dimension spécifique, telle qu'une seule zone de disponibilité. Consultez la [page d'intégration ELB][27] pour obtenir une liste complète des types d'équilibreurs de charge qui prennent en charge les variantes `_deduped`.

#### Résoudre l'écart {#reconcile-the-discrepancy}

1. Accédez à **CloudWatch**, puis à **All metrics**.
2. Recherchez et représentez graphiquement la métrique. 
3. Sélectionnez l'onglet **Source** pour afficher la requête de métrique complète.

{{< img src="integrations/guide/aws_integration_troubleshooting/cloudwatch-metric-explorer.png" alt="La page All metrics de CloudWatch affichant une requête de métrique sous l'onglet Source, le curseur étant placé sur un point du graphique pour afficher une valeur de métrique et un horodatage" responsive="true" style="width:90%;" >}}

4. Confirmez que la requête dans CloudWatch est définie de manière identique à la requête dans Datadog :
   - Toutes les [Dimensions][17] utilisées dans la requête de métrique CloudWatch doivent correspondre aux tags utilisés dans la requête de métrique Datadog.
   - Datadog interroge les métriques avec une granularité d'une minute ; le paramètre **Period** de la requête de métrique CloudWatch doit donc également être défini sur une minute
   - Région
   - Espace de noms et nom de la métrique
5. Survolez un point de données sur le graphique pour afficher l'horodatage et la valeur.
6. Repérez le même instant sur le graphique Datadog et comparez les valeurs. Si les valeurs sont égales, l'écart initial était dû à des différences d'agrégation temporelle ou spatiale entre les deux graphiques.

## Métriques {#metrics}

### Métriques retardées {#metrics-delayed}

Lors de l'utilisation de l'intégration AWS, Datadog récupère vos métriques via l'API CloudWatch. Vous pouvez constater un délai dans les métriques provenant d'AWS en raison de certaines contraintes existant pour leur API.

L'API CloudWatch ne permet de récupérer les données qu'en interrogeant les métriques une par une. Les API CloudWatch ont une limite de débit qui varie en fonction de la combinaison des identifiants d'authentification, de la région et du service. Les métriques sont mises à disposition par AWS en fonction du niveau de compte. Par exemple, si vous payez pour des « métriques détaillées » au sein d'AWS, elles sont disponibles plus fréquemment. Ce niveau de service pour les métriques détaillées s'applique également à la granularité, certaines métriques étant disponibles par minute et d'autres par cinq minutes.

Installez le Datadog Agent sur le host pour éviter tout retard dans la collecte des métriques. Consultez la [documentation du Datadog Agent][3] pour commencer. Datadog a la capacité de prioriser certaines métriques au sein d'un compte pour les récupérer plus rapidement, selon les circonstances. Contactez le [support Datadog][4] pour plus d'informations.

### Délais attendus pour les métriques {#expected-metric-delays}

Le délai entre le moment où une métrique est générée dans AWS et celui où elle apparaît dans Datadog dépend de la méthode de collecte :

| Méthode de collecte | Délai typique | Remarques |
|---|---|---|
| Interrogation de l'API (par défaut) | Environ 10 minutes | Les limites de débit de l'API CloudWatch et la taille du compte peuvent augmenter le délai. |
| [CloudWatch Metric Streams][23] | 2 à 3 minutes | Nécessite une configuration distincte avec Amazon Data Firehose. |
| [Datadog Agent][3] | Temps réel | Collecte directement les métriques au niveau du host, sans CloudWatch. |

Outre les délais liés à la méthode de collecte, certains services AWS introduisent leur propre latence côté CloudWatch :

Les métriques - **S3 Storage Lens** sont publiées quotidiennement, et non en continu.
Les - **métriques de facturation AWS** sont disponibles avec plusieurs heures de retard et sont mises à jour peu fréquemment.
La - **surveillance détaillée** pour EC2 fournit des métriques à la minute (au lieu de la granularité par défaut de cinq minutes), mais nécessite une activation par instance dans AWS.

**Remarque** : Datadog ne renseigne pas rétroactivement les données de métriques historiques. Consultez [À quoi s'attendre après la configuration][25] pour plus de détails.

### Métriques manquantes {#missing-metrics}

Si vous ne voyez pas les métriques AWS attendues dans Datadog, suivez la liste de contrôle suivante :

1. **Vérifiez les autorisations IAM.** Confirmez que le `DatadogAWSIntegrationRole` inclut les autorisations requises pour le service AWS. Certains services nécessitent des autorisations spécifiques au service au-delà de la politique d'intégration principale. Consultez les [pages d'intégration AWS][15] individuelles pour connaître les exigences d'autorisation spécifiques au service.
2. **Vérifiez que la région AWS est activée.** Dans la [page d'intégration AWS][16], confirmez que la région où vos ressources sont déployées est sélectionnée sous l'onglet **General**. Les métriques ne sont collectées qu'à partir des régions activées.
3. **Vérifiez que le service émet des métriques vers CloudWatch.** Ouvrez la console CloudWatch dans AWS et confirmez que les métriques attendues existent. L'API de CloudWatch ne renvoie que les métriques comportant des points de données ; si une ressource est inactive ou n'a aucun composant associé (par exemple, un ELB sans instances associées), CloudWatch peut donc ne pas rapporter de métriques pour celle-ci.
4. **Vérifiez si le service nécessite une activation supplémentaire.** Certains services AWS n'émettent pas de métriques vers CloudWatch par défaut et nécessitent une configuration supplémentaire dans la console AWS. Consultez [Quels services AWS nécessitent une configuration supplémentaire au-delà de l'intégration principale ?][26] pour obtenir une liste complète.
5. **Attendez l'intervalle de sondage.** Attendez au moins un cycle de collecte avant d'enquêter davantage. Consultez [Délais attendus pour les métriques](#expected-metric-delays) pour connaître les délais par méthode de collecte.
6. **Vérifiez les Service Control Policies (SCP).** Si votre compte fait partie d'une organisation AWS, les SCP appliquées au niveau de l'organisation ou de l'unité organisationnelle (OU) peuvent remplacer les autorisations IAM et bloquer les appels d'API. Vérifiez qu'aucune SCP n'interdit les autorisations requises.
7. **Vérifiez les limites d'autorisations.** Une [limite d'autorisations][30] définit les autorisations maximales qu'un rôle peut avoir. Si la limite n'inclut pas une action requise par l'intégration Datadog, AWS renvoie `AccessDenied` pour cette action, même lorsque la politique de rôle d'intégration semble l'accorder. Dans la console AWS IAM, ouvrez le rôle d'intégration et vérifiez l'onglet **Permissions boundary** pour voir si une limite est associée.

### Nombre incorrect pour aws.elb.healthy_host_count {#wrong-count-of-awselbhealthy-host-count}

Lorsque l'option d'équilibrage de charge inter-zones est activée sur un ELB, toutes les instances associées à cet ELB sont considérées comme faisant partie de toutes les zones de disponibilité (du côté de CloudWatch). Par exemple, si vous avez deux instances dans `1a` et trois instances dans `1b`, la métrique affiche cinq instances par zone de disponibilité.
Comme cela peut être contre-intuitif, les métriques **aws.elb.healthy_host_count_deduped** et **aws.elb.un_healthy_host_count_deduped** affichent le nombre d'instances saines et non saines par zone de disponibilité, que cette option d'équilibrage de charge inter-zones soit activée ou non.

## Régions {#regions}

### Comportement des régions {#region-behavior}

Datadog collecte des métriques uniquement à partir des régions AWS que vous sélectionnez sur la [page d'intégration AWS][16]. Si vous ne voyez pas de données pour un service spécifique, confirmez que la région où cette ressource est déployée est activée.

#### Considérations {#considerations}

- **Services globaux** : certains services AWS (tels qu'IAM, CloudFront et Route 53) sont globaux et ne sont pas liés à une région spécifique. Les métriques pour ces services apparaissent généralement sous `us-east-1` indépendamment de la configuration de la région dans Datadog.
- **Services régionaux** : la plupart des services AWS sont régionaux. Datadog collecte uniquement les métriques pour les régions explicitement activées dans la tuile d'intégration.
- **Régions à activer** : les régions AWS à activer (telles que `af-south-1`, `ap-east-1` et `me-south-1`) doivent être activées à la fois dans vos [paramètres de compte AWS][22] et dans la tuile d'intégration Datadog. Si la région n'est pas activée du côté AWS, Datadog ne peut pas collecter de données à partir de celle-ci.
- **Nouvelles régions** : les régions AWS récemment lancées sont explorées mais peuvent ne pas apparaître immédiatement dans l'interface utilisateur d'intégration Datadog ou dans le fournisseur Terraform. Consultez la [page d'intégration AWS][16] pour obtenir la liste la plus récente des régions prises en charge.

## Datadog UI {#datadog-ui}

### Hosts en double lors de l'installation de l'Agent {#duplicated-hosts-when-installing-the-agent}

Lors de l'installation de l'Agent sur un host AWS, vous pourriez voir des hosts en double sur la page d'infrastructure Datadog pendant quelques heures si vous définissez manuellement le nom d'hôte dans la configuration de l'Agent. Les hosts en double disparaissent quelques heures plus tard, et cela n'affecte pas votre facturation.

## Datadog Agent {#datadog-agent}

### Métadonnées EC2 avec IMDS v2 {#ec2-metadata-with-imds-v2}

Dans les environnements conteneurisés, le problème peut venir du fait que vous avez verrouillé l'endpoint des métadonnées EC2, en attribuant des rôles/identifiants IAM aux pods s'exécutant dans le cluster Kubernetes. `Kube2IAM` et `kiam` sont des outils courants utilisés pour cela. Pour résoudre ce problème, mettez à jour votre configuration `Kube2IAM` ou `kiam` afin d'autoriser l'accès à cet endpoint.

IMDSv2, dans sa configuration par défaut, refuse les connexions avec un nombre de sauts IP supérieur à un, c'est-à-dire les connexions qui sont passées par une passerelle IP. Cela peut causer des problèmes lorsque l'Agent s'exécute dans un conteneur avec un réseau autre que celui du host, car le runtime transfère le trafic du conteneur via une passerelle IP virtuelle. Ceci est courant dans les déploiements ECS. Les options suivantes peuvent remédier à ce problème :

 * [Augmentez le nombre maximal de sauts à au moins `2`][8]. Cela peut avoir des conséquences sur la sécurité des données stockées dans l'IMDS, car cela permet également à d'autres conteneurs que l'Agent d'accéder à ces données.
 * Utilisez le nom d'hôte découvert par cloud-init, en [définissant `providers.eks.ec2.useHostnameFromFile` sur true][9].
 * Exécutez l'Agent dans l'espace de noms UTS du host, en [définissant `agents.useHostNetwork` sur true][10].

### Nom d'hôte EC2 avec IMDS {#ec2-hostname-with-imds}

#### Versions de l'Agent antérieures à 7.64.0 {#agent-versions-before-7640}

Dans certaines situations, la configuration EC2 [IMDSv2][5] peut empêcher l'Agent d'accéder aux métadonnées nécessaires. Cela peut amener l'Agent à revenir au fournisseur de nom d'hôte `os` au lieu de `aws`, comme le montre la sortie de `agent status`.

L'API AWS prend en charge la désactivation d'IMDSv1, que l'Agent utilise par défaut. Si tel est le cas, mais qu'IMDSv2 est activé et accessible, définissez le paramètre `ec2_prefer_imdsv2` sur `true` (par défaut `false`) dans votre [configuration d'Agent][6]. Consultez la documentation [Transition vers l'utilisation de l'Instance Metadata Service Version 2][7] pour plus de détails.

La mise à niveau vers Datadog Agent 7.64.0+ devrait résoudre ces problèmes, car les versions plus récentes de l'Agent utilisent IMDSv2 par défaut.

#### Agent version 7.64.0 et versions ultérieures {#agent-version-7640-and-after}

À partir de la v7.64.0, Datadog Agent utilise par défaut IMDSv2 et revient à IMDSv1 en cas d'échec. Pour revenir au comportement précédent, définissez `ec2_imdsv2_transition_payload_enabled` sur `false` dans la configuration de votre host.
Consultez la documentation [Transition vers l'utilisation de l'Instance Metadata Service Version 2][7] pour plus de détails.

## Tags {#tags}

### Délais de collecte et de propagation des tags {#tag-collection-and-propagation-delays}

Les tags AWS sont collectés dans le cadre du cycle d'exploration de l'intégration. Attendez-vous à ce que la propagation des tags prenne de 15 minutes à plusieurs heures après leur application dans AWS, selon le service AWS et le volume de ressources dans votre compte.

Si vous avez récemment ajouté ou modifié des tags dans AWS et qu'ils n'apparaissent pas dans Datadog :
1. Attendez au moins un cycle d'exploration complet (environ 10 minutes pour l'interrogation de l'API).
2. Vérifiez que le `DatadogAWSIntegrationRole` dispose des autorisations requises liées aux tags (par exemple, `tag:GetResources`).
3. Confirmez que le type de ressource prend en charge la collecte de tags. Datadog collecte les tags via l'[AWS Resource Groups Tagging API][28]. Consultez les [types de ressources pris en charge][29] dans la documentation AWS pour vérifier que votre type de ressource est pris en charge.

### Les hosts conservent les tags AWS après la suppression de l'intégration Amazon EC2 {#hosts-still-have-aws-tags-after-removing-the-amazon-ec2-integration}

Vous pouvez utiliser l'intégration AWS pour collecter des données depuis CloudWatch, ou installer un Datadog Agent directement sur chaque instance EC2 pour obtenir des données et des tags. Si vous avez choisi d'utiliser ces deux méthodes pour collecter des données, le backend de Datadog fusionne les données provenant à la fois de l'intégration et du Datadog Agent dans un seul objet host.

Si vous avez supprimé l'intégration AWS, mais que vous continuez à exécuter un Datadog Agent sur vos instances EC2, les hosts de votre compte Datadog continuent de conserver les anciens tags de host associés, collectés depuis AWS. Il s'agit d'un comportement prévu, et cela n'indique pas que l'intégration AWS ou l'intégration Amazon EC2 est toujours activée.

Vous pouvez vérifier que l'intégration est activée en consultant la section « Apps Running » pour ce host depuis la liste d'infrastructure ou en consultant le Metrics Catalog et en créant un notebook limité à ce host.

Par défaut, les tags au niveau du host restent attachés de manière permanente aux hosts AWS. Si vous souhaitez supprimer définitivement les tags de host AWS d'un host, vous pouvez le faire en utilisant les méthodes suivantes :
   - Utilisez l'[endpoint de l'API Remove host tags][11] pour supprimer tous les tags attribués par l'utilisateur à un seul host
   - Utilisez l'outil [remove_lingering_aws_host_tags.py][12] pour supprimer tous les tags attribués par l'utilisateur à une liste de hosts ou à tous les hosts

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /fr/agent/
[4]: /fr/help/
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[6]: /fr/agent/configuration/agent-configuration-files/
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[8]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-instance-metadata-options.html
[9]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L1683-L1688
[10]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L930-L937
[11]: /fr/api/latest/tags/#remove-host-tags
[12]: https://github.com/DataDog/Miscellany/blob/master/remove_lingering_aws_host_tags.py
[13]: https://api.datadoghq.com/api/v2/integration/aws/iam_permissions
[14]: https://github.com/DataDog/cloudformation-template/tree/master/aws_attach_integration_permissions
[15]: /fr/integrations/#cat-aws
[16]: https://app.datadoghq.com/integrations/amazon-web-services
[17]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Dimension
[18]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Enabling.html
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[20]: /fr/metrics/#time-aggregation
[21]: /fr/metrics/#space-aggregation
[22]: https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html
[23]: /fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[24]: /fr/integrations/guide/monitor-your-aws-billing-details/
[25]: /fr/getting_started/integrations/aws/#what-to-expect-after-setup
[26]: /fr/integrations/guide/aws-integration-and-cloudwatch-faq/#which-aws-services-require-additional-setup-beyond-the-core-integration
[27]: /fr/integrations/amazon_elb/
[28]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/overview.html
[29]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/supported-services.html
[30]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html