---
description: Diffusez les métriques CloudWatch vers Datadog via Amazon Data Firehose
  pour une ingestion à faible latence.
further_reading:
- link: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
  tag: Documentation
  text: Flux de métriques - Amazon CloudWatch
- link: https://www.datadoghq.com/blog/amazon-cloudwatch-metric-streams-datadog/
  tag: Blog
  text: Recueillez des métriques Amazon CloudWatch à l'aide des flux de métriques.
title: Flux de métriques AWS CloudWatch avec Amazon Data Firehose
---
En utilisant Amazon CloudWatch Metric Streams et Amazon Data Firehose, vous pouvez obtenir les métriques CloudWatch dans Datadog avec une latence de seulement deux à trois minutes. Ceci est nettement plus rapide que l'approche d'interrogation par API par défaut de Datadog, qui fournit des métriques mises à jour toutes les 10 minutes. Vous pouvez en savoir plus sur l'approche d'interrogation par API dans la [documentation sur le délai des métriques Cloud][1].

## Présentation {#overview}

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="Diagramme du flux des métriques" responsive="true">}}

1. Créez un flux de métriques CloudWatch dans chaque compte et région AWS pour lesquels vous souhaitez diffuser des métriques.
   - Spécifiez éventuellement un ensemble limité d'espaces de nommage ou de métriques à diffuser.
2. Une fois le flux de métriques créé, Datadog commence immédiatement à recevoir les métriques diffusées et les affiche sur le site Datadog sans configuration supplémentaire nécessaire.

<div class="alert alert-warning">Le filtrage par tag configuré dans la tuile d'intégration AWS <b>s'applique également</b> aux flux de métriques CloudWatch.</div>

### Streaming de métriques par rapport à l'interrogation par API {#streaming-vs-polling}

Les principales différences entre les flux de métriques CloudWatch et l'API sont les suivantes :

- **Métriques signalées avec un délai supérieur à deux heures** : l'interrogation par API continue de collecter des métriques comme `aws.s3.bucket_size_bytes` et `aws.billing.estimated_charges` après l'activation du streaming de métriques, car celles-ci ne peuvent pas être envoyées via CloudWatch Metric Stream.

- **Métadonnées des métriques** : Datadog continue d'utiliser l'interrogation par API pour collecter des tags personnalisés et d'autres métadonnées pour vos métriques diffusées. Pour vous assurer de continuer à recevoir ces métriques, ne modifiez pas la configuration de l'intégration AWS.

#### Passage de l'interrogation par API au streaming de métriques {#switching-from-api-polling-to-metric-streams}
Si vous recevez déjà des métriques pour un espace de nommage CloudWatch donné via la méthode d'interrogation par API, Datadog le détecte automatiquement et arrête d'interroger les métriques pour cet espace de nommage une fois que vous commencez à les diffuser. Laissez vos paramètres de configuration sur la page d'intégration AWS inchangés ; Datadog continue d'utiliser l'interrogation par API pour collecter des tags personnalisés et d'autres métadonnées pour vos métriques diffusées.

#### Retour du streaming de métriques à l'interrogation par API {#switching-back-from-metric-streams-to-api-polling}

Si vous décidez ultérieurement que vous ne souhaitez plus diffuser de métriques pour un compte et une région AWS donnés, ou même simplement pour un espace de nommage spécifique, Datadog recommence automatiquement à collecter ces métriques en utilisant l'interrogation par API en fonction des paramètres de configuration de la page d'intégration AWS. Si vous souhaitez arrêter la diffusion de toutes les métriques pour un compte et une région AWS, suivez les instructions de la section [Désactiver le streaming de métriques](#disable-metric-streaming) de ce document.

#### Éviter les métriques en double pendant la migration {#avoiding-duplicate-metrics-during-migration}

Lors du passage de l'interrogation par API aux flux de métriques, il existe une période de chevauchement où les deux méthodes de collecte peuvent envoyer des données pour les mêmes métriques. Cela peut entraîner un doublement des valeurs de métriques dans Datadog.

Pour minimiser la duplication :
1. Activez les flux de métriques pour les espaces de noms et les régions souhaités.
2. Attendez que Datadog détecte le flux et arrête l'interrogation pour ces espaces de noms. Cette détection peut prendre jusqu'à cinq minutes, mais en pratique, la période de chevauchement peut durer plus longtemps en fonction du timing des crawlers d'interrogation actifs.
3. Vérifiez que la transition est terminée en consultant l'onglet **Collecte de métriques** sur la [page d'intégration AWS][5] pour les régions de flux activées.
4. Ne modifiez pas votre configuration d'intégration AWS existante pendant la transition. Datadog continue d'utiliser l'interrogation par API pour collecter des tags personnalisés et des métadonnées pour les métriques diffusées.

<div class="alert alert-info">
Certaines métriques ne peuvent pas être envoyées via les flux de métriques CloudWatch, notamment <code>aws.s3.bucket_size_bytes</code> et <code>aws.billing.estimated_charges</code>Datadog continue de les collecter via l'interrogation par API, indépendamment de votre configuration de flux de métriques.
</div>

### Facturation {#billing}

Datadog ne facture pas de frais supplémentaires pour la diffusion des métriques.

AWS facture en fonction du nombre de mises à jour de métriques sur le flux de métriques CloudWatch et du volume de données envoyé à Amazon Data Firehose. Par conséquent, il est possible de constater une augmentation des coûts CloudWatch pour le sous-ensemble de métriques que vous diffusez. Pour cette raison, Datadog recommande d'utiliser les flux de métriques pour les métriques, services, régions et comptes AWS pour lesquels vous avez le plus besoin d'une latence plus faible, et l'interrogation par API pour les autres. Pour plus d'informations, consultez la [tarification d'Amazon CloudWatch][2].

Les métriques EC2 ou Lambda du flux peuvent entraîner une augmentation du nombre d'appels Lambda et de hosts facturables (si ces hosts et fonctions ne sont pas déjà surveillés avec l'intégration AWS ou le Datadog Agent, dans le cas d'EC2).

**Remarque** : vous pouvez créer des filtres dans CloudWatch pour ne diffuser que des métriques spécifiques. Consultez le [guide de l'utilisateur d'Amazon CloudWatch][7] pour plus d'informations.

## Configuration {#setup}

### Avant de commencer {#before-you-begin}

1. Lisez attentivement la section [Flux de métriques par rapport à l'interrogation par API](#streaming-vs-polling) pour comprendre les différences avant d'activer les flux de métriques.

2. Si ce n'est pas déjà fait, connectez votre compte AWS à Datadog. Pour plus d'informations, consultez les [instructions de configuration CloudFormation][3].

### Installation {#installation}

{{< tabs >}}
{{% tab "CloudFormation" %}}

Datadog recommande d'utiliser CloudFormation, car c'est automatique et pratique si vous utilisez plusieurs régions AWS.

**Remarque** : Le streaming de métriques prend uniquement en charge le format de sortie OpenTelemetry. La dernière version est la v1.0 ; la v0.7 est prise en charge mais peut entraîner des métriques manquantes.

1. Sur votre site Datadog, accédez à l'onglet **Configuration** de la [page d'intégration AWS][1].
2. Cliquez sur le compte AWS pour configurer le streaming de métriques.
3. Sous **Metric Collection**, cliquez sur **Automatically Using CloudFormation** sous **CloudWatch Metric Streams** pour lancer une stack dans la console AWS.
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-setup.png" alt="La section CloudWatch Metric Streams de l'onglet Metric Collection de la page d'intégration AWS avec le bouton Automatically Using CloudFormation mis en surbrillance" responsive="true" style="width:60%;" >}}
4. Remplissez les paramètres requis :
   - **ApiKey** : Ajoutez votre [clé d'API Datadog][2].
   - **DdSite** : Sélectionnez votre [site Datadog][3]. Votre site est : {{< region-param key="dd_site" code="true" >}}
   - **Regions** : Une liste séparée par des virgules des régions pour lesquelles vous souhaitez configurer le streaming de métriques. Pour obtenir la liste complète des régions prises en charge, consultez la documentation AWS sur [l'utilisation des flux de métriques][4].
5. Remplissez les paramètres optionnels :
   - **FilterMethod** : Liste d'inclusion ou d'exclusion des espaces de noms à inclure pour le streaming de métriques.
   - **First/Second/Third Namespace** : Spécifiez les espaces de noms que vous souhaitez inclure ou exclure. Remarque : Les valeurs des espaces de noms doivent correspondre précisément aux valeurs de la colonne des espaces de noms dans la documentation d'AWS. Par exemple, AWS/EC2.
6. Cochez la case d'accusé de réception indiquant : « Je reconnais qu'AWS CloudFormation peut créer des ressources IAM avec des noms personnalisés. »
7. Cliquez sur **Créer une pile**.

### Résultats {#results}

Une fois la pile créée avec succès, attendez cinq minutes que Datadog reconnaisse le changement. Pour valider l'achèvement, accédez à l'onglet **Collecte de métriques** sur la [page d'intégration AWS][1] de Datadog et vérifiez que les régions activées apparaissent pour le compte sélectionné.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="La section CloudWatch Metric Streams de l'onglet Metric Collection de la page d'intégration AWS avec une région activée" responsive="true" style="width:60%;">}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /fr/getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "Console AWS" %}}

Pour configurer des flux de métriques à l'aide de la console AWS, créez un [flux de métriques CloudWatch][1] pour chaque région AWS.

**Remarque** : Le streaming de métriques prend uniquement en charge le format de sortie OpenTelemetry. La dernière version est la v1.0 ; la v0.7 est prise en charge mais peut entraîner des métriques manquantes.

1. Choisissez **Quick AWS Partner Setup** et sélectionnez **Datadog** comme destination du partenaire AWS dans le menu déroulant.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-partner-setup.png" alt="Quick Partner Setup pour le flux de métriques CloudWatch" responsive="true" style="width:60%;">}}
2. Choisissez le site Datadog vers lequel vous souhaitez diffuser les métriques et saisissez votre [clé d'API Datadog][2].
3. Choisissez si vous souhaitez diffuser toutes les métriques CloudWatch ou uniquement des espaces de noms spécifiques. Vous avez également la possibilité d'exclure des métriques spécifiques. Si vous êtes dans un compte de surveillance, vous pouvez également choisir d'activer la [diffusion inter-comptes][3].
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-namespace-filter.png" alt="Flux de métriques CloudWatch" responsive="true" style="width:60%;">}}
4. Sous **Ajouter des statistiques supplémentaires**, incluez les métriques de centile AWS à envoyer à Datadog. Consultez le [modèle CloudFormation][4] pour obtenir la liste des métriques de centile prises en charge par Datadog via l'interrogation.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/percentiles.png" alt="Centiles" responsive="true" style="width:60%;">}}
5. Attribuez un nom à votre flux de métriques.
6. Cliquez sur **Create metric stream**.

### Résultats {#results-1}

Une fois que vous avez constaté que la ressource Metric Stream a été créée avec succès, attendez cinq minutes pour que Datadog reconnaisse le changement. Pour valider l'achèvement, accédez à l'onglet **Metric Collection** sur la [page d'intégration AWS][5] de Datadog et vérifiez que les régions activées le sont sous **CloudWatch Metric Streams** pour le compte AWS spécifié.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="La section CloudWatch Metric Streams de l'onglet Metric Collection de la page d'intégration AWS avec une région activée" responsive="true" style="width:60%;">}}

**Remarque** : Si vous avez déjà activé l'interrogation des API CloudWatch, la transition vers la diffusion pourrait entraîner une brève période (jusqu'à cinq minutes) pendant laquelle les métriques spécifiques que vous diffusez sont comptabilisées deux fois dans Datadog. Cela est dû à la différence de timing entre le moment où les crawlers de Datadog s'exécutent et soumettent vos métriques CloudWatch, et le moment où Datadog reconnaît que vous avez commencé à diffuser ces métriques et désactive les crawlers.

[1]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/#cross-account-metric-streaming
[4]: https://github.com/DataDog/cloudformation-template/blob/master/aws_streams/streams_single_region.yaml#L168-L249
[5]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{< /tabs >}}

### Diffusion de métriques inter-comptes{#cross-account-metric-streaming}
Utilisez la diffusion de métriques inter-comptes pour inclure les métriques dans un seul flux de métriques couvrant plusieurs comptes AWS au sein d'une région AWS. Cela permet de réduire le nombre de flux nécessaires pour collecter des métriques vers une destination commune. Pour ce faire, [connectez vos comptes sources][4] à votre compte de surveillance et activez Cross-account streaming vers Datadog dans votre compte de surveillance AWS.

Pour assurer le bon fonctionnement de la diffusion de métriques entre plusieurs comptes, votre compte de surveillance doit disposer des autorisations suivantes :
   * oam:ListSinks
   * oam:ListAttachedLinks

**Remarque :** Pour collecter des tags personnalisés et d'autres métadonnées pour vos métriques diffusées, intégrez vos comptes sources à Datadog.

### Désactiver la diffusion de métriques{#disable-metric-streaming}

Pour désactiver complètement la diffusion de métriques pour un compte AWS et une région donnés, vous devez supprimer l'AWS Metric Stream et ses ressources associées. Pour éviter toute perte de métriques dans Datadog, il est important de suivre attentivement ces étapes de suppression :

Si vous avez configuré la diffusion avec [CloudFormation](?tab=cloudformation#installation) :
1. Supprimez la pile (stack) qui a été créée lors de la configuration.

Si vous avez configuré la diffusion via la [AWS Console](?tab=awsconsole#installation) :
1. Supprimez le CloudWatch Metric Stream lié à votre flux de diffusion.
2. Supprimez toutes les ressources qui ont été créées lors de la configuration du flux, y compris les rôles IAM S3 et Firehose associés au flux.

Une fois les ressources supprimées, attendez cinq minutes pour que Datadog reconnaisse le changement. Pour valider l'achèvement, accédez à l'onglet **Metric Collection** sur la [page d'intégration AWS][5] de Datadog et vérifiez que les régions désactivées ne sont pas affichées sous **CloudWatch Metric Streams** pour le compte AWS spécifié.

### Surveiller la santé des flux {#monitor-stream-health}

Datadog soumet la métrique `datadog.aws_metric_streams.data_received` lorsqu'il reçoit des données d'un flux de métriques CloudWatch. Utilisez cette métrique pour confirmer qu'AWS envoie des métriques et que Datadog les reçoit.

`datadog.aws_metric_streams.data_received`
: **Type** : Jauge<br>
Rapporte une valeur de `1` lorsque Datadog reçoit des données d'un flux de métriques CloudWatch, et ne rapporte rien lorsque Datadog ne reçoit aucune donnée. Marqué avec `stream_arn`, `stream_name`, `aws_account` et `region`. La fréquence à laquelle la métrique rapporte dépend de votre volume de données et de la configuration de mise en mémoire tampon de votre flux de diffusion Firehose.

Pour un flux inter-comptes, le flux de métriques et le flux de diffusion Firehose se trouvent dans le compte de surveillance. Le tag `aws_account` identifie le compte de surveillance, et non les comptes sources d'où proviennent les métriques.

Pour vérifier si un flux transmet des données, interrogez cette métrique dans le [Metrics Explorer][8] et regroupez par `stream_name` ou `stream_arn`.

Comme la métrique ne rapporte rien lorsqu'un flux cesse de transmettre des données, surveillez-la pour détecter la transition entre la transmission et l'absence de données. Créez un [monitor de métrique][9] sur `datadog.aws_metric_streams.data_received`, regroupez-le par `stream_arn` et activez les notifications de données manquantes. Pour les étapes de configuration, consultez [Recevoir une alerte lorsqu'un tag spécifique ne transmet plus de données][10].

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes lors de la configuration de Metric Streams ou des ressources associées, consultez [AWS Troubleshooting][6]. Si les métriques CloudWatch cessent d'apparaître après que Metric Streams a fonctionné correctement, le problème peut provenir d'erreurs de destination Firehose.

### Erreurs de destination Firehose persistantes {#persistent-firehose-destination-errors}

Si les métriques CloudWatch cessent d'apparaître dans Datadog, le CloudWatch Metric Stream et le flux de diffusion Firehose d'Amazon peuvent toujours afficher un état `running`. Cela peut se produire même lorsque Firehose ne transmet plus d'enregistrements.

Cela peut se produire lorsque Firehose ne parvient pas à transmettre les enregistrements à l'endpoint HTTP de Datadog dans sa [retry period][11], ni à écrire les enregistrements dans sa sauvegarde S3. Lorsque les deux chemins de livraison échouent, le flux de diffusion peut ne pas reprendre automatiquement la livraison HTTP une fois que l'endpoint est à nouveau disponible.

Pour diagnostiquer et rétablir la livraison :

1. Localisez le flux de diffusion Firehose associé au CloudWatch Metric Stream concerné. Exécutez la commande AWS CLI suivante pour trouver le `FirehoseArn` dans la réponse :

   ```shell
   aws cloudwatch get-metric-stream \
     --name <METRIC_STREAM_NAME> \
     --region <AWS_REGION>
   ```

2. Examinez les [logs d'erreurs de livraison Firehose][12] dans CloudWatch Logs. Si la journalisation des erreurs de livraison n'est pas activée, activez-la afin de pouvoir capturer les futures erreurs de livraison. Les erreurs pertinentes incluent `HttpEndpoint.DestinationException` (telles que les réponses HTTP 408) et `S3.AccessDenied`.
3. Inspectez les [métriques CloudWatch Firehose][13] dans la console CloudWatch (Datadog peut ne pas afficher ces métriques pendant l'interruption de la livraison). Vérifiez `DeliveryToHttpEndpoint.Success`, `DeliveryToHttpEndpoint.DataFreshness`, `DeliveryToHttpEndpoint.Records` et `IncomingRecords`.
4. Si Firehose reçoit des enregistrements mais ne les livre pas, vérifiez la configuration de sauvegarde S3 et le rôle IAM :
   - Confirmez que Firehose peut assumer le rôle configuré et écrire dans le compartiment de sauvegarde.
   - Vérifiez que la stratégie de compartiment, les limites d'autorisations, les stratégies de contrôle du service (SCP) et la stratégie de clé KMS ne bloquent pas l'accès requis.
5. Vérifiez si les enregistrements parviennent à S3 en consultant le compartiment de sauvegarde sous le préfixe configuré dans les paramètres de sauvegarde S3 de votre flux de diffusion Firehose. Si aucun objet n'est écrit, cela confirme un problème d'autorisations ou de configuration avec le chemin de sauvegarde S3. Si les logs d'erreurs de livraison de l'étape 2 indiquent une erreur d'autorisations S3, corrigez-la avant de continuer.
6. Mettez à jour la configuration de destination HTTP Firehose à l'aide de l'API [UpdateDestination API][14] de Firehose ; par exemple, en modifiant sa durée de nouvelle tentative. Une mise à jour de configuration comme celle-ci peut redémarrer une destination bloquée.

Si la livraison ne se rétablit pas, contactez le [support Datadog][15] et fournissez :
   - L'ID de compte AWS et la région
   - Les ARN du flux de métriques CloudWatch et du flux de livraison Firehose
   - Heure approximative de l'arrêt de la livraison
   - Logs d'erreurs Firehose pertinents

**Remarque** : Le redémarrage de la livraison affecte uniquement les nouveaux enregistrements et ne restaure pas les enregistrements ayant échoué pendant l'interruption. Les enregistrements écrits dans la sauvegarde S3 ne sont pas automatiquement ingérés dans Datadog.

## Pour aller plus loin {#further-reading}
 {{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/guide/cloud-metric-delay/
[2]: https://aws.amazon.com/cloudwatch/pricing/
[3]: /fr/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account-Setup.html
[5]: https://app.datadoghq.com/integrations/amazon-web-services
[6]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html
[7]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
[8]: https://app.datadoghq.com/metric/explorer
[9]: /fr/monitors/types/metric/
[10]: /fr/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/
[11]: https://docs.aws.amazon.com/firehose/latest/dev/retry.html
[12]: https://docs.aws.amazon.com/firehose/latest/dev/monitoring-with-cloudwatch-logs.html
[13]: https://docs.aws.amazon.com/firehose/latest/dev/monitoring-with-cloudwatch-metrics.html#fh-http-metrics
[14]: https://docs.aws.amazon.com/firehose/latest/APIReference/API_UpdateDestination.html
[15]: /fr/help/