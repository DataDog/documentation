---
further_reading:
- link: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
  tag: Documentation
  text: Flux de métriques - Amazon CloudWatch
- link: https://www.datadoghq.com/blog/amazon-cloudwatch-metric-streams-datadog/
  tag: Blog
  text: Recueillez des métriques Amazon CloudWatch à l'aide des flux de métriques.

title: Flux de métriques AWS CloudWatch avec Amazon Data Firehose
---
{{% site-region region="us3,gov" %}}
Les flux de métriques AWS CloudWatch avec Amazon Data Firehose ne sont pas disponibles pour le <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}}) que vous avez sélectionné.
{{% /site-region %}}

Avec les flux de métriques Amazon CloudWatch et Amazon Data Firehose, vous pouvez transmettre des métriques CloudWatch à Datadog avec une latence de 2 à 3 minutes seulement. Cette approche est bien plus rapide que le processus d'interrogation de l'API Datadog par défaut, qui met à jour les métriques toutes les 10 minutes. Pour en savoir plus sur ce processus, consultez la [documentation relative au délai des métriques CloudWatch][1].

## Présentation

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="Diagramme du flux de métriques" responsive="true">}}

1. Créez un flux de métriques CloudWatch dans toutes les régions et tous les comptes AWS pour lesquels vous souhaitez diffuser des métriques.
   - Vous pouvez également spécifier un ensemble limité d'espaces de nommage ou de métriques pour le flux.
2. Une fois le flux de métriques créé, Datadog commence immédiatement à recevoir les métriques diffusées et à les afficher sur le site de Datadog. Aucune configuration supplémentaire n'est requise.


### Comparaison entre les flux de métriques et l'API (#flux-de-metriques-et-api)

Les principales différences entre les flux de métriques CloudWatch et l'API sont les suivantes :

- **Filtrage par espace de nommage sur AWS** : les valeurs par défaut des espaces de nommage et les paramètres de compte de la page d'intégration AWS s'appliquent uniquement à l'API. Toutes les règles d'inclusion et d'exclusion d'espaces de nommage ou de métriques dans les flux doivent être gérées via la configuration des flux de métriques CloudWatch dans vos comptes AWS.

- **Métriques transmises avec plus de deux heures de retard** : l'API continue de recueillir des métriques telles que `aws.s3.bucket_size_bytes` et `aws.billing.estimated_charges` lorsque les flux de métriques sont activés, étant donné qu'elles ne peuvent pas être transmises via les flux de métriques CloudWatch.

#### Passer de l'API aux flux de métriques
Si vous recevez déjà des métriques pour un espace de nommage CloudWatch donné via l'API, Datadog détecte ce comportement et cesse de recueillir les métriques pour cet espace de nommage dès qu'elles commencent à être transmises via un flux de métriques. Veillez à ne pas modifier vos paramètres de configuration sur la page d'intégration AWS : Datadog continuera d'utiliser l'API pour récupérer les tags personnalisés et d'autres métadonnées sur vos métriques diffusées.

#### Passer des flux de métriques à l'API

Si vous décidez ensuite que vous ne souhaitez plus utiliser les flux de métriques pour un compte et une région AWS donnés, ou même pour un espace de nommage spécifique, Datadog recommence automatiquement à recueillir ces métriques via l'API en fonction des paramètres définis sur la page d'intégration AWS. Si vous souhaitez désactiver complètement la diffusion de métriques pour un compte et une région AWS donnés, suivez les instructions indiquées à la rubrique [Désactiver la diffusion de métriques](#desactiver-la-diffusion-de-metriques) de ce document.

### Aide

Datadog ne facture pas de frais supplémentaires pour la diffusion des métriques.

La facturation AWS est basée sur le nombre de mises à jour de métriques dans le flux de métriques CloudWatch et sur le volume de données envoyées à Amazon Data Firehose. Il est possible que vos coûts CloudWatch augmentent pour le sous-ensemble de métriques que vous diffusez. Pour cette raison, Datadog vous recommande d'utiliser les flux de métriques pour les métriques, services, régions et comptes AWS pour lesquels vous avez le plus besoin d'une faible latence. Pour les autres, utilisez plutôt le processus d'interrogation. Pour en savoir plus, consultez la page [Tarification Amazon CloudWatch][1].

Les métriques EC2 ou Lambda du flux peuvent entraîner une augmentation du nombre d'appels Lambda et de hosts facturables (si ces hosts et fonctions ne sont pas déjà surveillés avec l'intégration AWS ou l'Agent Datadog, dans le cas d'EC2).

## Socket de domaine Unix

### Avant de commencer

1. Lisez attentivement la section [Comparaison entre les flux de métriques et l'API](#flux-de-metriques-et-api) pour bien comprendre les différences entre les deux solutions avant d'activer les flux de métriques.

2. Si vous ne l'avez pas encore fait, connectez votre compte AWS à Datadog. Pour en savoir plus, consultez les [instructions de configuration de CloudFormation][3].

### Installation

{{< tabs >}}
{{% tab "CloudFormation" %}}

Datadog recommande d'utiliser CloudFormation pour bénéficier d'un processus automatique et plus pratique si vous utilisez plusieurs régions AWS.

**Remarque** : à l'heure actuelle, la fonctionnalité de diffusion de métriques vers Datadog prend uniquement en charge le format de sortie OpenTelemetry v0.7.

1. Sur votre site Datadog, accédez à l'onglet **Configuration** de la [page d'intégration AWS][1].
2. Cliquez sur le compte AWS pour configurer la diffusion de métriques.
3. Sous **Metric Collection**, cliquez sur **Automatically Using CloudFormation** en dessous de **CloudWatch Metric Streams** pour lancer une pile dans la console AWS.
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-setup.png" alt="La section CloudWatch Metric Streams de l'onglet Metric Collection de la page d'intégration AWS avec le bouton Automatically Using CloudFormation mis en évidence" responsive="true" style="width:60%;" >}}
4. Renseignez les paramètres requis :
   - **ApiKey** : ajoutez votre [clé d'API Datadog][2].
   - **DdSite** : sélectionnez votre [site Datadog][3], à savoir {{< region-param key="site_dd" code="true" >}}.
   - **Regions** : ajoutez la liste des régions, séparées par des virgules, que vous souhaitez configurer pour la diffusion de métriques. Pour obtenir la liste complète des régions prises en charge, consultez la page [Utilisation des flux de métriques][4] de la documentation AWS.
5. Vous pouvez définir des paramètres facultatifs :
   - **FilterMethod** : liste d'inclusion ou d'exclusion d'espaces de nommage pour la diffusion de métriques.
   - **First/Second/Third Namespace** : indiquez les espaces de nommage à inclure ou exclure. Remarque : les valeurs d'espace de nommage doivent correspondre précisément aux valeurs indiquées dans la colonne d'espace de nommage de la documentation AWS. Exemple : AWS/EC2.
6. Cochez la case d'acceptation indiquant "I acknowledge that AWS CloudFormation might create IAM resources with custom names."
7. Cliquez sur **Create Stack**.

### Résultats

Une fois la pile créée, patientez cinq minutes le temps que Datadog détecte la modification. Pour vous en assurer, accédez à l'onglet **Metric Collection** de la [page de l'intégration AWS][1] de Datadog et vérifiez que les régions activées apparaissent pour le compte sélectionné.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="La section CloudWatch Metric Streams de l'onglet Metric Collection de la page d'intégration AWS avec une région activée" responsive="true" style="width:60%;">}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /fr/getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "Console AWS" %}}

Pour configurer des flux de métriques à l'aide de la console AWS, créez un [flux de métriques CloudWatch][2] pour chaque région AWS.

**Remarque** : à l'heure actuelle, la fonctionnalité de diffusion de métriques vers Datadog prend uniquement en charge le format de sortie OpenTelemetry v0.7.

1. Choisissez l'option **Quick AWS Partner Setup** et sélectionnez dans le menu déroulant la valeur **Datadog** pour la destination de partenaire AWS.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-partner-setup.png" alt="Configuration de partenaire rapide pour le flux de métriques CloudWatch" responsive="true" style="width:60%;">}}
2. Choisissez le site Datadog vers lequel vous souhaitez diffuser les métriques, puis saisissez votre [clé d'API Datadog][1].
3. Définissez si vous souhaitez diffuser toutes les métriques CloudWatch, ou seulement celles de certains espaces de nommage. Vous pouvez également exclure certaines métriques. Si vous utilisez un compte de surveillance, vous avez la possibilité d'activer la [diffusion entre plusieurs comptes][5].
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-namespace-filter.png" alt="Flux de métriques CloudWatch" responsive="true" style="width:60%;">}}
4. Sous **Add additional statistics**, incluez les métriques de centile AWS à envoyer à Datadog. Référez-vous au [modèle CloudFormation][3] pour consulter la liste des métriques de centile prises en charge par Datadog via le processus d'interrogation.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/percentiles.png" alt="Centiles" responsive="true" style="width:60%;">}}
5. Attribuez un nom à votre flux de métriques.
6. Cliquez sur **Create metric stream**.

### Résultats

Une fois la ressource de flux de métriques créée, patientez cinq minutes le temps que Datadog détecte la modification. Pour vous en assurer, accédez à l'onglet **Metric Collection** de la [page de l'intégration AWS][4] de Datadog et vérifiez que les régions activées sont indiquées comme telles sous **CloudWatch Metric Streams** pour le compte AWS spécifié.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="La section CloudWatch Metric Streams de l'onglet Metric Collection de la page d'intégration AWS avec une région activée" responsive="true" style="width:60%;">}}
**Remarque** : si vous avez déjà activé l'interrogation des API CloudWatch, le changement de méthode peut entraîner la diffusion en double des métriques configurées lors d'une courte période (cinq minutes maximum). Cette duplication est causée par l'écart entre le moment où les crawlers Datadog exécutent et envoient vos métriques CloudWatch et le moment où Datadog détecte la diffusion de ces métriques et désactive les crawlers.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws_streams/streams_single_region.yaml#L168-L249
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.datadoghq.com/fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/#cross-account-metric-streaming
{{% /tab %}}
{{< /tabs >}}

### Diffusion de métriques entre plusieurs comptes
La diffusion de métriques entre plusieurs comptes vous permet d'inclure dans un flux de métriques unique des métriques provenant de plusieurs comptes AWS d'une région. Vous pouvez ainsi limiter le nombre de flux nécessaires à la collecte de métriques pour une destination courante. Pour bénéficier de cette fonctionnalité, [associez vos comptes source][5] à votre compte de surveillance, puis activez la diffusion entre plusieurs comptes vers Datadog dans votre compte de surveillance AWS.

Pour assurer le bon fonctionnement de la diffusion de métriques entre plusieurs comptes, votre compte de surveillance doit disposer des autorisations suivantes :
   * oam:ListSinks
   * oam:ListAttachedLinks

**Remarque** : pour recueillir des tags custom et d'autres métadonnées relatives à vos métriques diffusées, intégrez vos comptes source à Datadog.

### Désactiver la diffusion de métriques

Pour désactiver complètement la diffusion de métriques pour un compte et une région AWS donnés, vous devez supprimer le flux de métriques AWS et les ressources associées. Afin d'empêcher toute perte de métriques dans Datadog, assurez-vous de bien suivre ces étapes de suppression :

Si vous avez configuré la diffusion avec [CloudFormation](?tab=cloudformation#installation) :
1. Supprimez la pile créée durant la configuration.

Si vous avez configuré la diffusion avec la [Console AWS](?tab=awsconsole#installation) :
1. Supprimez le flux de métriques CloudWatch lié à votre flux de diffusion.
2. Supprimez toutes les ressources créées lors de la configuration du flux, y compris les rôles IAM pour S3 et Firehose qui sont associés au flux.

Une fois les ressources supprimées, patientez cinq minutes le temps que Datadog détecte la modification. Pour confirmer la suppression, accédez à l'onglet **Metric Collection** de la [page d'intégration AWS][4] de Datadog et vérifiez que les régions désactivées ne sont pas affichées sous **CloudWatch Metric Streams** pour le compte AWS spécifié.

## Dépannage

Pour résoudre les problèmes rencontrés lors de la configuration des flux de métriques ou des ressources associées, consultez la [section Dépannage de la documentation AWS][5].

## Pour aller plus loin
 {{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/cloudwatch/pricing/
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=roledelegation#setup
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account-Setup.html