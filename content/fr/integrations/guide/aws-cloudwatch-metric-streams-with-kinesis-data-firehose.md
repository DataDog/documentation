---
title: "Flux de métriques AWS\_CloudWatch avec Kinesis Data Firehose"
kind: guide
further_reading:
  - link: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
    tag: Documentation
    text: "Flux de métriques - Amazon\_CloudWatch"
  - link: https://www.datadoghq.com/blog/amazon-cloudwatch-metric-streams-datadog/
    tag: Blog
    text: "Recueillez des métriques Amazon\_CloudWatch à l'aide des flux de métriques."
---
{{< site-region region="us3,us5,gov" >}}

**Les flux de métriques AWS CloudWatch avec Kinesis Data Firehose ne sont pas pris en charge sur ce site Datadog.**
{{< /site-region >}}

Avec les flux de métriques Amazon CloudWatch et Amazon Kinesis Data Firehose, vous pouvez transmettre plus rapidement des métriques CloudWatch à Datadog, avec une latence de 2 à 3 minutes. Cette approche est bien plus rapide que le processus d'interrogation de l'API Datadog, qui met à jour les métriques toutes les 10 minutes.

## Présentation

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="Diagramme du flux de métriques" responsive="true">}}

1. Créez ces ressources AWS dans toutes les régions et tous les comptes AWS pour lesquels vous souhaitez créer un flux de métriques :
   - Créez un flux de diffusion Kinesis Data Firehose qui transmet les métriques à Datadog, ainsi qu'une sauvegarde S3 pour tout échec de diffusion des métriques.
   - Créez un flux de métriques CloudWatch lié à votre flux de diffusion.
   - Vous pouvez également spécifier un ensemble limité d'espaces de nommage pour le flux de métriques.
2. Une fois ces ressources créées, Datadog commence immédiatement à recevoir les métriques diffusées et à les afficher sur le site de Datadog. Aucune configuration supplémentaire n'est requise.


### Comparaison entre les flux de métriques et l'API (#flux-de-metriques-et-api)

Les principales différences entre les flux de métriques CloudWatch et l'API sont les suivantes :

- **Centiles CloudWatch** : les métriques CloudWatch liées aux [statistiques de centile][1] (`aws.*.pXX`) ne peuvent pas être diffusées. Cela signifie que les noms des métriques recueillies peuvent différer. Exemples de métriques non prises en charge : `aws.elb.latency.p95`, `aws.applicationelb.target_response_time.p99` et `aws.applicationelb.target_response_time.p50`. 

  (**Remarque** : ces métriques sont différentes des [métriques de distribution Datadog][2].)

- **Filtrage par espace de nommage sur AWS** : les valeurs par défaut des espaces de nommage et les paramètres de compte du carré d'intégration AWS s'appliquent uniquement à l'API. Toutes les règles d'inclusion et d'exclusion d'espaces de nommage dans les flux doivent être gérées en utilisant la configuration des flux de métriques CloudWatch dans vos comptes AWS.

- **Métriques transmises avec plus de deux heures de retard** : l'API continue de recueillir des métriques telles que `aws.s3.bucket_size_bytes` et `aws.billing.estimated_charges` lorsque les flux de métriques sont activés, étant donné qu'elles ne peuvent pas être transmises via les flux de métriques CloudWatch.

#### Passer de l'API aux flux de métriques
Si vous recevez déjà des métriques pour un espace de nommage CloudWatch donné via l'API, Datadog détecte ce comportement et cesse de recueillir les métriques pour cet espace de nommage dès qu'elles commencent à être transmises via un flux de métriques. Veillez à ne pas modifier vos paramètres de configuration dans le carré de l'intégration AWS : Datadog continuera d'utiliser l'API pour récupérer les tags personnalisés et d'autres métadonnées sur vos métriques diffusées.

#### Passer des flux de métriques à l'API

Si vous décidez ensuite que vous ne souhaitez plus utiliser les flux de métriques pour un compte et une région AWS donnés, ou même pour un espace de nommage spécifique, Datadog recommence automatiquement à recueillir ces métriques via l'API en fonction des paramètres définis dans le carré de l'intégration AWS. Si vous souhaitez désactiver complètement la diffusion de métriques pour un compte et une région AWS donnés, suivez les instructions indiquées à la section [Désactiver la diffusion de métriques](#desactiver-la-diffusion-de-metriques) de ce document.

### Facturation

Datadog ne facture pas de frais supplémentaires pour la diffusion des métriques.

La facturation AWS est basée sur le nombre de mises à jour de métrique dans le flux de métriques CloudWatch et sur le volume de données envoyées à Kinesis Data Firehose. Il est possible que vos coûts CloudWatch augmentent pour le sous-ensemble de métriques que vous diffusez. Pour cette raison, nous vous recommandons d'utiliser en priorité les flux de métriques pour les services, régions et comptes AWS pour lesquels vous avez le plus besoin d'une faible latence. Pour en savoir plus, consultez [Tarification Amazon CloudWatch][3].

Les métriques EC2 ou Lambda du flux peuvent entraîner une augmentation du nombre d'appels Lambda et de hosts facturables (si ces hosts et fonctions ne sont pas déjà surveillés avec l'intégration AWS ou l'Agent Datadog, dans le cas d'EC2).

## Configuration

### Avant de commencer

1. Lisez attentivement la section [Comparaison entre les flux de métriques et l'API](#flux-de-metriques-et-api) pour bien comprendre les différences entre les deux solutions avant d'activer les flux de métriques.

2. Si vous ne l'avez pas encore fait, connectez votre compte AWS à Datadog. Pour en savoir plus, consultez [les instructions de configuration de CloudFormation][4].

### Installation

{{< tabs >}}
{{% tab "CloudFormation" %}}

Datadog recommande d'utiliser CloudFormation pour bénéficier d'un processus automatique et plus pratique si vous utilisez plusieurs régions AWS.

1. Sur votre site Datadog, accédez à l'onglet **Configuration** du [carré d'intégration AWS][1].
2. Cliquez sur le compte AWS pour configurer la diffusion de métriques.
3. Sous **Metric Collection**, cliquez sur l'onglet **CloudWatch Metric Streams**.
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-streams.png" alt="Onglet de sélection des flux de métriques" responsive="true" style="width:60%;">}}
4. Cliquez sur **Automatically Using CloudFormation** pour lancer la création d'une stack dans la console AWS.
5. Renseignez les paramètres requis :
   - **ApiKey** : ajoutez votre [clé d'API Datadog][2].
   - **DdSite** : sélectionnez votre [site Datadog][3], à savoir {{< region-param key="site_dd" code="true" >}}.
   - **Regions** : ajoutez la liste des régions, séparées par des virgules, que vous souhaitez configurer pour la diffusion de métriques. Pour obtenir la liste complète des régions prises en charge, consultez la documentation [Utilisation des flux de métriques][4].
6. Vous pouvez définir des paramètres facultatifs :
   - **FilterMethod** : liste d'inclusion ou d'exclusion d'espaces de nommage pour la diffusion de métriques.
   - **First/Second/Third Namespace** : indiquez les espaces de nommage à inclure ou exclure. Remarque : les valeurs d'espace de nommage doivent correspondre précisément aux valeurs indiquées dans la colonne d'espace de nommage de la documentation AWS. Exemple : AWS/EC2.
7. Cochez la case d'acceptation indiquant "I acknowledge that AWS CloudFormation might create IAM resources with custom names."
8. Cliquez sur **Create Stack**.

### Résultats

Une fois la stack créée, patientez cinq minutes le temps que Datadog détecte la création. Accédez ensuite au [carré d'intégration AWS][1] de Datadog pour confirmer que la configuration a fonctionné. Affichez l'onglet CloudWatch Metric Streaming pour le compte AWS spécifié et vérifiez les régions activées.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-regions.png" alt="Régions actives" responsive="true" style="width:60%;">}}


[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /fr/getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "Console AWS" %}}

Si vous souhaitez configurer les flux de métriques à l'aide de la console AWS, procédez comme suit pour chaque région AWS.

1. Créez un nouveau flux de diffusion Kinesis Data Firehose avec les caractéristiques suivantes :
 - Pour la source, sélectionnez Direct PUT or other sources.
- Pour la destination :
  - Sélectionnez le fournisseur de services tiers `Datadog`.
  - Sélectionnez l'URL de l'endpoint de métriques correspondant à votre site Datadog, `Datadog metrics - US` ou `Datadog metrics - EU`.
  - Pour la clé d'accès, saisissez votre [clé d'API Datadog][1].
   - Pour la durée avant une nouvelle tentative, saisissez `60 seconds`.
   - Pour la sauvegarde S3, sélectionnez `Failed data only` et choisissez le compartiment S3 de votre choix.
 - Pour les conditions de mise en mémoire tampon de l'endpoint HTTP :
   - Saisissez `4MB` pour la taille du tampon et `60 seconds` pour l'intervalle.
 - Pour les conditions de mise en mémoire tampon de S3 :
   - Saisissez `4MB` pour la taille du tampon et `60 seconds` pour l'intervalle.
 - Pour la compression de S3, choisissez `GZIP`.
 - Activez la journalisation des erreurs.
2. Suivez les étapes suivantes pour créer votre [flux de métriques CloudWatch][2] :
 1. Précisez si vous voulez diffuser toutes les métriques CloudWatch ou seulement certains espaces de nommage spécifiques à l'aide des listes Include et Exclude.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/cloudwatch-metric-stream.png" alt="Flux de métriques CloudWatch" responsive="true" style="width:60%;">}}
 2. Sélectionnez le Firehose que vous avez créé lors de la première étape et que vous souhaitez utiliser pour envoyer les métriques à Datadog.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/firehose.png" alt="Firehose" responsive="true" style="width:60%;">}}
 3. Créez un nouveau rôle de service pour importer des enregistrements dans Kinesis Data Firehose.
 4. Choisissez le format de sortie OpenTelemetry 0.7.
 5. Nommez votre flux de métriques.
 6. Cliquez sur **Create metric stream**.

### Résultats

Une fois la ressource de flux de métriques créée, patientez cinq minutes le temps que Datadog détecte la création. Accédez ensuite au [carré d'intégration AWS de Datadog][3] pour confirmer que la configuration a fonctionné. Affichez l'onglet CloudWatch Metric Streams pour le compte AWS spécifié.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-regions.png" alt="Régions actives" responsive="true" style="width:60%;">}}
**Remarque** : si vous avez déjà activé l'interrogation des API CloudWatch, le changement de méthode peut entraîner la diffusion en double des métriques configurées lors d'une courte période (cinq minutes maximum). Cette duplication est causée par l'écart entre le moment où les crawlers Datadog exécutent et envoient vos métriques CloudWatch et le moment où Datadog détecte la diffusion de ces métriques et désactive les crawlers.


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
{{% /tab %}}
{{< /tabs >}}

### Désactiver la diffusion de métriques

Pour désactiver complètement la diffusion de métriques pour un compte et une région AWS donnés, vous devez supprimer le flux de métriques AWS et les ressources associées. Pour empêcher toute perte de métriques dans Datadog, assurez-vous de bien suivre ces étapes de suppression :

Si vous avez configuré la diffusion avec [CloudFormation](?tab=cloudformation#installation) :
1. Supprimez la stack créée durant la configuration.

Si vous avez configuré la diffusion avec la [Console AWS](?tab=consoleaws#installation) :
1. Supprimez le flux de métriques CloudWatch lié à votre flux de diffusion.
2. Supprimez le flux de diffusion Kinesis Data Firehose qui était utilisé pour transmettre les métriques à Datadog.
3. Supprimez le compartiment S3 de sauvegarde où arrivaient les messages n'ayant pas pu être transmis pour le Firehose.
4. Supprimez les rôles IAM associés au flux et toutes les autres ressources créées lors de la configuration du flux.

Une fois les ressources supprimées, attendez cinq minutes et vérifiez que la région et l'espace de nommage sont désactivés dans l'onglet « CloudWatch Metric Streams » du compte AWS concerné dans Datadog.

## Dépannage
Pour résoudre les problèmes rencontrés lors de la configuration des flux de métriques ou des ressources associées, consultez la [section Dépannage de la documentation AWS][5].

## Pour aller plus loin
 {{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Percentiles
[2]: /fr/metrics/distributions/#overview
[3]: https://aws.amazon.com/cloudwatch/pricing/
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=roledelegation#setup
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html