---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: Blog
  text: Optimisez et dépannez le stockage cloud à grande échelle avec Storage Monitoring
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: Blog
  text: Réduisez les coûts de stockage cloud et améliorez l'efficacité opérationnelle
    avec Datadog Storage Monitoring
title: Storage Management pour Amazon S3
---
## Configuration {#setup}

Configurez Storage Management pour Amazon S3 avec l'une des méthodes suivantes :

- **CloudFormation** : une configuration guidée dans le produit qui configure l'intégration AWS, active S3 Inventory sur les buckets que vous sélectionnez et active éventuellement les logs d'accès S3. Une pile CloudFormation applique les modifications à votre compte AWS.
- **Terraform** : utilisez le module Terraform officiel de Datadog Storage Management pour configurer l'inventaire et les logs d'accès sous forme de code.
- **Manual** : configurez vous-même S3 Inventory et les autorisations requises dans la console AWS, puis enregistrez la destination de l'inventaire auprès de Storage Management.

{{< tabs >}}
{{% tab "CloudFormation" %}}

La configuration dans le produit vous guide à travers trois étapes : configurer un compte AWS, sélectionner des buckets et activer S3 Inventory et les logs d'accès, puis terminer la configuration. Une pile CloudFormation applique les modifications requises dans votre compte AWS.

Pour commencer, accédez à **Infrastructure** > [**Storage Management**][1] et cliquez sur **Try Storage Management**.

[1]: https://app.datadoghq.com/storage-management

{{% collapse-content title="1. Configurer le compte AWS" level="h3" expanded=false id="datadog-ui-step1" %}}

À cette étape, configurez l'intégration AWS de Datadog avec la collecte de métriques et de ressources activée.

1. Choisissez si vous souhaitez utiliser un **compte AWS existant** déjà intégré à Datadog ou **ajouter un nouveau compte**.
   - Pour un nouveau compte, une pile CloudFormation crée le rôle d'intégration Datadog et configure la collecte de métriques et de ressources.
   - Pour un compte existant, confirmez que la **collecte de métriques** et la **collecte de ressources** sont activées. Storage Management utilise la collecte de ressources pour découvrir les buckets S3 et leurs configurations d'inventaire existantes.
2. Sélectionnez la région AWS que vous souhaitez configurer. Une région est configurée par exécution ; répétez les étapes pour chaque région supplémentaire.

Pour obtenir la liste des autorisations liées à S3 utilisées par la collecte de ressources, consultez [Resource collection][2] sur la page d'intégration AWS.

[2]: /fr/integrations/amazon-web-services/#resource-collection
{{% /collapse-content %}}

{{% collapse-content title="2. Configurer Storage Management" level="h3" expanded=false id="datadog-ui-step2" %}}

À cette étape, sélectionnez les buckets à surveiller, définissez une destination d'inventaire et, éventuellement, activez les logs d'accès.

<div class="alert alert-info">
    - Bucket source : le bucket S3 que vous souhaitez surveiller avec Storage Management. <br>
    - Bucket de destination : le bucket qui stocke les rapports d'inventaire (un par région AWS, réutilisable entre comptes).
</div>

1. **Select buckets** : choisissez les buckets S3 que vous souhaitez surveiller avec Storage Management. Les buckets déjà activés pour Storage Management sont masqués. Les buckets pour lesquels S3 Inventory est déjà activé sont présélectionnés et conservent leur destination actuelle.

2. **Définissez le bucket de destination de l'inventaire** : pour les buckets sans configuration d'inventaire existante, choisissez un bucket de destination où les rapports d'inventaire quotidiens sont envoyés. Vous pouvez choisir un bucket existant ou en spécifier un nouveau. Datadog écrit les fichiers d'inventaire sous le préfixe `datadog-inventories`.

   **Remarque** : Storage Management nécessite le format d'inventaire CSV. La pile CloudFormation configure cela pour vous.

3. **Activez les logs d'accès S3 (facultatif)** : les logs d'accès révèlent les tendances relatives aux données froides, les accès inhabituels et les possibilités d'optimisation des niveaux de stockage. Activez **Enable S3 access logs**, puis :

   - Sélectionnez un bucket de destination pour les logs d'accès. Vous pouvez utiliser le même bucket que pour la destination de l'inventaire.
   - Si un Datadog Log Forwarder est détecté dans le compte, il est réutilisé. Sinon, la pile CloudFormation déploie un nouveau Log Forwarder.
   - Les logs d'accès transférés peuvent être ingérés sans être indexés s'ils sont utilisés uniquement pour Storage Management. Consultez [filtres d'exclusion][3] pour plus de détails.

   <div class="alert alert-warning">Le transfert des logs d'accès S3 vers Datadog entraîne des coûts d'ingestion dans Log Management. Pour minimiser les coûts, utilisez des filtres d'exclusion afin que les logs soient ingérés mais non indexés s'ils sont utilisés uniquement pour Storage Management. Pour plus de détails, consultez <a href="https://www.datadoghq.com/pricing/?product=log-management">les tarifs de Datadog Log Management</a>.</div>

4. Cliquez sur **Launch CloudFormation Template**. Une pile AWS Quick Create s'ouvre, préremplie avec les correspondances entre buckets, le préfixe de destination, le nom du rôle d'intégration ainsi que les paramètres de la clé d'API Datadog, de la clé d'application et du Log Forwarder.

5. Dans AWS, examinez les paramètres de la pile et créez la pile. La pile :

   - Active S3 Inventory quotidien sur chaque bucket source sélectionné.
   - Ajoute des autorisations IAM pour permettre à Storage Management de lire les rapports S3 Inventory depuis les buckets de destination.
   - Ajoute la politique de bucket au bucket de destination de l'inventaire afin que S3 puisse y écrire les objets d'inventaire.
   - Active la journalisation des accès au serveur S3 sur les buckets sélectionnés (si les logs d'accès sont activés).
   - Déploie une fonction Lambda Datadog Log Forwarder (si les logs d'accès sont activés et qu'aucun forwarder n'existe).

[3]: /fr/logs/log_configuration/indexes/#exclusion-filters
{{% /collapse-content %}}

{{% collapse-content title="3. Terminer la configuration" level="h3" expanded=false id="datadog-ui-step3" %}}

Une fois la pile CloudFormation terminée dans AWS, retournez dans Storage Management et cliquez sur **Finish Setup**.

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Terraform" %}}

Utilisez le [module Terraform officiel Datadog Storage Management][1] pour configurer S3 Inventory et transférer les logs d'accès S3. Le module :

   - Configure les autorisations requises sur le rôle IAM d'intégration AWS.
   - Ajoute une politique de bucket pour permettre à Datadog de lire les fichiers d'inventaire depuis le chemin du bucket de destination.
   - Active la collecte des logs d'accès S3 si un Datadog Log Forwarder est déjà configuré.

Pour utiliser l'exemple ci-dessous :
- Remplacez `<AWS_REGION>` par votre région AWS.
- Remplacez `<MODULE_NAME>` par un nom unique pour cette instance de module.
- Remplacez `<DATADOG_AWS_INTEGRATION_ROLE_NAME>` par le nom de votre rôle IAM d'intégration AWS Datadog.
- Remplacez `<SOURCE_BUCKET_1>`, `<SOURCE_BUCKET_2>`, etc. par les noms des buckets à surveiller.
- Remplacez `<DESTINATION_BUCKET_NAME>` par le nom du bucket qui reçoit vos fichiers d'inventaire.
- Remplacez `<DATADOG_FORWARDER_FUNCTION_NAME>` par le nom de votre fonction Lambda Datadog Forwarder (requis uniquement si vous activez les logs d'accès).

Pour plus d'options, consultez la [documentation du module][1].

```hcl
provider "aws" {
  region = "<AWS_REGION>"
}

provider "datadog" {
  # Configure with environment variables:
  #   DD_API_KEY, DD_APP_KEY, DD_SITE
}

module "datadog_storage_management" {
  source = "DataDog/storage-management-datadog/aws"

  name                              = "<MODULE_NAME>"
  datadog_aws_integration_role_name = "<DATADOG_AWS_INTEGRATION_ROLE_NAME>"
  source_bucket_names               = ["<SOURCE_BUCKET_1>", "<SOURCE_BUCKET_2>"]
  destination_bucket_name           = "<DESTINATION_BUCKET_NAME>"

  # Prefix within the destination bucket where inventory files are written.
  # Defaults to "datadog-inventories/". The module keeps the inventory
  # configuration, bucket policy, and IAM permissions consistent with this
  # value. Datadog recommends to use the default value.
  # destination_prefix = "datadog-inventories/"

  # Bucket policy: "none", "create", or "merge" (default)
  destination_bucket_policy_management = "merge"

  # Optional: Enable S3 access logs for prefix-level request and latency metrics
  enable_access_logging           = true
  datadog_forwarder_function_name = "<DATADOG_FORWARDER_FUNCTION_NAME>"
}
```

Une fois S3 Inventory activé, il peut s'écouler jusqu'à 24 heures avant que les premiers rapports d'inventaire ne soient générés. Pour vérifier que les inventaires sont générés, accédez à votre bucket de destination dans la console AWS et confirmez que les fichiers d'inventaire apparaissent sous le préfixe de destination que vous avez spécifié.

Une fois que vous avez confirmé la présence des fichiers d'inventaire, vérifiez que Storage Management est activé sur vos buckets en accédant à [**Storage Management**][2] et en confirmant que votre bucket de destination est répertorié.

[1]: https://registry.terraform.io/modules/DataDog/storage-management-datadog/aws/latest
[2]: https://app.datadoghq.com/storage-management

{{% /tab %}}

{{% tab "Méthode manuelle" %}}

Pour configurer manuellement [Amazon S3 Inventory][206] et les paramètres associés, suivez ces étapes :

[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html

{{% collapse-content title="1. Créer un bucket de destination" level="h3" expanded=false id="manual-setup-step1" %}}

1. [Créez un bucket S3][201] pour stocker vos fichiers d'inventaire. Ce bucket sert d'emplacement central pour les rapports d'inventaire.
   **Remarque** : utilisez un seul bucket de destination pour tous les fichiers d'inventaire générés dans un compte AWS.
2. Déterminez le préfixe de destination dans le bucket où les fichiers d'inventaire sont écrits. Le préfixe standard est `datadog-inventories/`, qui est également la valeur par défaut si vous laissez le champ vide. Pour lire les rapports d'inventaire de l'intégralité du bucket, définissez la valeur sur `/`. Vous pouvez utiliser un préfixe personnalisé, mais vous devez utiliser la même valeur dans les étapes suivantes : la configuration de S3 Inventory, la politique du bucket de destination, les autorisations du rôle d'intégration et l'appel d'enregistrement de l'API. Des préfixes non correspondants empêchent Datadog de lire vos fichiers d'inventaire.

[201]: https://console.aws.amazon.com/s3/bucket/create
{{% /collapse-content %}}

{{% collapse-content title="2. Configurer les politiques du compartiment et du rôle d'intégration" level="h3" expanded=false id="manual-setup-step2" %}}

1. Vérifiez que le rôle d'intégration Datadog AWS **dans le compte AWS propriétaire du bucket de destination** dispose des autorisations `s3:GetObject` et `s3:ListBucket` sur le bucket de destination. Ces autorisations permettent à Datadog de lire les fichiers d'inventaire générés. Ce compte doit être intégré à Datadog.

   **Remarque** : si les buckets sources d'autres comptes AWS envoient des rapports S3 Inventory vers un bucket de destination central, Datadog lit chaque rapport à l'aide du rôle d'intégration du compte propriétaire du bucket de destination. Les rôles d'intégration des comptes sources n'ont pas besoin d'accéder au bucket de destination.

2. Vérifiez que la politique du bucket de destination autorise S3 à écrire des fichiers d'inventaire dans votre bucket de destination.

      Exemple de politique de bucket :
      ```json
      {
        "Sid": "AllowS3InventoryWriteFromAccountBuckets",
        "Effect": "Allow",
        "Principal": { "Service": "s3.amazonaws.com" },
        "Action": "s3:PutObject",
        "Resource": "arn:aws:s3:::<DESTINATION_BUCKET>/<DESTINATION_PREFIX>/*",
        "Condition": {
          "ArnLike": {
            "aws:SourceArn": "arn:aws:s3:::*"
          },
          "StringEquals": {
            "aws:SourceAccount": "<ACCOUNT_ID>",
            "s3:x-amz-acl": "bucket-owner-full-control"
          }
        }
      }
      ```

3. Suivez les étapes du [Guide de l'utilisateur Amazon S3][202] pour ajouter à votre bucket de destination une politique qui autorise Amazon S3 à y écrire des objets d'inventaire (`s3:PutObject`) depuis votre ou vos buckets sources.

[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
{{% /collapse-content %}}

{{% collapse-content title="3. Configurer la génération d'inventaire" level="h3" expanded=false id="manual-setup-step3" %}}

Pour chaque bucket que vous souhaitez surveiller :
1. Accédez à la [page des buckets Amazon S3][203] dans la console AWS et sélectionnez le bucket.
2. Accédez à l'onglet **Management** du bucket.
3. Cliquez sur **Create inventory configuration**.
4. Configurez les paramètres suivants :
   - Définissez un nom de configuration
   - (Facultatif) Spécifiez un préfixe de bucket source
   - **Object versions** : Datadog recommande de sélectionner **Include all versions** (nécessaire pour afficher les métriques des versions non actuelles)

     {{< img src="integrations/guide/storage_monitoring/all-versions.png" alt="Sélectionnez les buckets de destination pour activer Storage Monitoring" responsive="true">}}
   - **Destination** : Sélectionnez le bucket de destination commun pour les fichiers d'inventaire dans votre compte AWS. Par exemple, si le bucket est nommé `destination-bucket`, saisissez `s3://your-destination-bucket`

      **Remarque** : Ajoutez le préfixe de destination que vous avez choisi à l'étape 1. Utilisez la même valeur que celle que vous enregistrez auprès de Datadog lors de l'étape post-configuration.
   - **Frequency** : Datadog recommande de choisir **Daily**. Ce paramètre détermine la fréquence de mise à jour de vos métriques au niveau du préfixe dans Datadog
   - **Output format** : CSV
   - **Status** : Enabled
   - **Server-side encryption** : Don't specify an encryption key
   - Sélectionnez tous les champs **Additional metadata fields** disponibles. Au minimum, les champs suivants sont requis :

     {{< img src="integrations/guide/storage_monitoring/metadata.png" alt="Additional metadata fields. Les champs Size, Last modified, Multipart upload, Replication status, Encryption, Object ACL, Storage class, Intelligent-Tiering: Access tier, ETag et Checksum function sont tous sélectionnés. Les champs Bucket key status, Object owner et All Object Lock configurations ne sont pas sélectionnés." responsive="true">}}

**Remarque** : Consultez la [tarification Amazon S3][204] pour connaître les coûts liés à la génération d'inventaire.

[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
{{% /collapse-content %}}

{{% collapse-content title="4. Activer les logs d'accès S3 (facultatif)" level="h3" expanded=false id="manual-setup-step4" %}}

Pour obtenir des métriques d'accès au niveau du préfixe, notamment le nombre de requêtes, la latence côté serveur et l'identification des données froides, activez la journalisation des accès au serveur S3 sur vos buckets sources et transférez ces logs vers Datadog. Pour obtenir des instructions étape par étape, consultez [Activer les logs d'accès S3][208] dans la documentation d'intégration Amazon S3.

<div class="alert alert-warning">Le transfert des logs d'accès S3 vers Datadog entraîne des coûts d'ingestion dans Log Management. Pour minimiser les coûts, utilisez des filtres d'exclusion afin que les logs soient ingérés mais non indexés s'ils sont utilisés uniquement pour Storage Management. Pour plus de détails, consultez <a href="https://www.datadoghq.com/pricing/?product=log-management">les tarifs de Datadog Log Management</a>.</div>

[208]: /fr/integrations/amazon-s3/#enable-s3-access-logs
{{% /collapse-content %}}

### Étapes après la configuration {#post-setup-steps}

Une fois que les fichiers d'inventaire commencent à apparaître dans le bucket de destination, enregistrez-le auprès de Storage Management en appelant l'endpoint [Activer Storage Management pour un bucket][209] :

```bash
curl -X PUT "https://api.${DD_SITE}/api/v2/cloudinventoryservice/syncconfigs" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "id": "aws",
      "type": "cloud_provider",
      "attributes": {
        "aws": {
          "aws_account_id": "<DESTINATION_ACCOUNT_ID>",
          "destination_bucket_name": "<DESTINATION_BUCKET_NAME>",
          "destination_bucket_region": "<DESTINATION_BUCKET_REGION>",
          "destination_prefix": "<DESTINATION_PREFIX>"
        }
      }
    }
  }'
```

Pour utiliser l'exemple ci-dessus :
- Remplacez `<DESTINATION_ACCOUNT_ID>` par l'identifiant à 12 chiffres du compte AWS qui possède le bucket de destination. Dans les configurations inter-comptes, il ne s'agit pas du compte des buckets sources.
- Remplacez `<DESTINATION_BUCKET_NAME>` par le nom du bucket de destination contenant les rapports d'inventaire.
- Remplacez `<DESTINATION_BUCKET_REGION>` par la région AWS du bucket de destination.
- Remplacez `<DESTINATION_PREFIX>` par le préfixe du bucket de destination où sont écrits vos rapports S3 Inventory, par exemple `datadog-inventories/`. Ce préfixe doit correspondre à celui de votre configuration S3 Inventory. Pour lire les rapports d'inventaire de l'intégralité du bucket, définissez la valeur sur `/`. Laisser la valeur vide ne permet pas de lire l'ensemble du bucket ; la valeur par défaut est `datadog-inventories/`.

Une réponse `200` confirme que Storage Management est activé pour le bucket de destination.

[209]: /fr/api/latest/storage-management/#enable-storage-management-for-a-bucket

{{% /tab %}}

{{< /tabs >}}

### Validation {#validation}

Pour vérifier votre configuration :
1. Attendez que le premier rapport d'inventaire soit généré (jusqu'à 24 heures pour les inventaires quotidiens).
2. Accédez à **Infrastructure** > [**Storage Management**][3] pour voir si les buckets que vous avez configurés apparaissent dans la liste de l'Explorer lorsque **Monitored buckets** est sélectionné.

  {{< img src="infrastructure/storage_management/monitored-buckets.png" alt="Valider que le bucket est activé pour la surveillance" responsive="true">}}

### Bonnes pratiques {#best-practices}

Suivez ces bonnes pratiques pour optimiser la configuration de Storage Management :
- **Configurez des politiques de cycle de vie pour les buckets de destination des inventaires** : les rapports S3 Inventory sont générés quotidiennement et stockés dans votre bucket de destination. Pour éviter que les anciens fichiers d'inventaire ne s'accumulent et n'entraînent des coûts de stockage, ajoutez une politique de cycle de vie pour supprimer automatiquement les rapports d'inventaire datant de plus de trois jours.

- **Configurez des politiques de cycle de vie pour les logs d'accès S3** : si vous avez activé les logs d'accès S3 pour les métriques de requête au niveau du préfixe, les fichiers logs bruts s'accumulent dans votre bucket de destination. Une fois ces logs transférés vers Datadog, les fichiers bruts ne sont plus nécessaires pour Storage Management. Pour supprimer automatiquement les fichiers logs d'accès après leur transfert vers Datadog, ajoutez une règle de cycle de vie.

  **Remarque** : Avant d'activer la suppression automatique, vérifiez qu'il n'existe aucune exigence de conformité ou d'audit dans votre organisation imposant la conservation des logs d'accès S3 bruts pendant une période spécifique.

- **Créez des filtres d'exclusion pour les logs d'accès S3** : si les logs d'accès S3 sont transférés vers Datadog uniquement pour Storage Management et n'ont pas besoin d'être indexés pour la recherche ou l'analyse, ajoutez un [filtre d'exclusion][4] pour les exclure du volume de logs indexés.

### Dépannage {#troubleshooting}

Si vous ne voyez pas de données pour les buckets que vous avez configurés pour Storage Management, utilisez la page [Storage Management Settings][9] pour afficher tous les buckets configurés, leur statut d'inventaire et les éventuelles erreurs de configuration. La page fait apparaître les problèmes avec des étapes de remédiation exploitables.
Si vous avez des questions, [contactez Datadog][1].

## Repérer et réaliser des économies avec Bits Chat {#identify-and-act-on-cost-savings-with-bits-chat}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScbFjbJecpVV-DgJNBt2O205KtaWlD_q6ajThIEX9vTGz6ebA/viewform?usp=publish-editor" >}}
Bits Chat pour Storage Management est en Preview. Pour essayer cette compétence, demandez l'accès.
{{< /callout >}} 


Les équipes FinOps et d'ingénierie peuvent utiliser Bits Chat et Storage Management pour identifier les possibilités d'économies sur S3, générer des rapports dans Datadog Notebooks et mettre en œuvre les changements recommandés. Pour utiliser Bits Chat avec Storage Management, activez la compétence `storage` dans les paramètres de Bits Chat.

Avec la compétence `storage` activée pour Bits Chat, vous pouvez :

- **Trouvez les principales opportunités d'économies** : Posez des questions en langage naturel pour identifier les préfixes, les classes de stockage ou les buckets pour lesquels des modifications du cycle de vie permettraient de réduire le plus les coûts.
- **Créez des rapports via les Notebooks** : Générez un Notebook Datadog résumant les conclusions, les économies estimées et les actions recommandées pour que votre équipe puisse les examiner et les partager.
- **Mettez en œuvre les changements** : Obtenez des conseils étape par étape avec [Bits Code][10] pour appliquer des politiques de cycle de vie, transférer des objets vers des niveaux de stockage moins coûteux ou faire expirer les versions non actuelles dans les préfixes présentant le plus fort potentiel d'économies.


## Visualisez en détail l'utilisation de S3 grâce aux métriques d'inventaire {#visualize-granular-s3-usage-with-inventory-metrics}

Un [modèle de dashboard Storage Management S3][8] prêt à l'emploi est disponible pour vous aider à visualiser les métriques ci-dessous. Vous pouvez le cloner et le personnaliser pour répondre à vos besoins.

| Nom de la métrique                                            | Tags notables                                                                                  | Description                                                                                                                                    |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| aws.s3.inventory.total_prefix_size                     | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | Quantité totale de données, en octets, stockées dans un préfixe.                                                                                            |
| aws.s3.inventory.average_prefix_size                   | `bucketname`, `prefix`, `region`                                                              | Taille moyenne des objets, en octets, pour les objets dans un préfixe.                                                                                        |
| aws.s3.inventory.prefix_object_count                   | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | Nombre total d'objets stockés dans un préfixe.                                                                                                |
| aws.s3.inventory.prefix_object_count.levels            | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Nombre d'objets agrégé par niveaux hiérarchiques de préfixe, utilisé pour les visualisations treemap.                                                       |
| aws.s3.inventory.total_prefix_size.levels              | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Taille des préfixes agrégée par niveaux hiérarchiques de préfixe, utilisée pour les visualisations treemap.                                                         |
| aws.s3.inventory.prefix_age_days                       | `bucketname`, `prefix`, `region`                                                              | Âge, en jours, de l'objet le plus ancien dans le bucket ou le préfixe.                                                                                    |
| aws.s3.inventory.prefix_small_file_size                | `bucketname`, `prefix`, `region`, `storagetype`                                               | Taille totale, en octets, des objets de moins de 128KB dans un préfixe. Aide à identifier les surcoûts liés aux classes de stockage telles que Glacier et Standard-IA.   |
| aws.s3.inventory.prefix_small_file_count               | `bucketname`, `prefix`, `region`, `storagetype`                                               | Nombre d'objets de moins de 128KB dans un préfixe. Aide à identifier les surcoûts liés aux classes de stockage telles que Glacier et Standard-IA.                   |
| aws.s3.inventory.access_logs.total_requests_by_method  | `bucketname`, `prefix`, `region`, `method`                                                    | Nombre total de requêtes pour des objets dans un préfixe, éventuellement réparties par méthode de requête (par exemple, GET ou PUT). Nécessite les logs d'accès S3 dans Datadog.   |
| aws.s3.inventory.access_logs.request_latency_by_method | `bucketname`, `prefix`, `region`, `method`                                                    | Temps de réponse du serveur pour les requêtes dans un préfixe, éventuellement ventilé par méthode de requête. Nécessite les logs d'accès S3 dans Datadog.                          |

  *`prefixN` fait référence aux niveaux de préfixe tels que `prefix0`, `prefix1`, `prefix2` et ainsi de suite.

  **Remarque :** Utilisez la métrique appropriée pour la question à laquelle vous répondez :
  - `aws.s3.inventory.prefix_object_count` et `aws.s3.inventory.total_prefix_size` (avec le tag `prefix`) incluent tout ce qui se trouve dans un dossier et tous ses sous-dossiers. Utilisez-les lorsque vous souhaitez obtenir le nombre total ou la taille d'un dossier spécifique (par exemple, « quelle quantité de données contient `logs/2024/` ? »).
  - `aws.s3.inventory.prefix_object_count.levels` et `aws.s3.inventory.total_prefix_size.levels` (avec `prefix1`, `prefix2`, `prefix3`, etc.) dénombrent les objets ou mesurent leur taille uniquement à cette profondeur exacte. Utilisez-les lorsque vous souhaitez créer une treemap ou comparer les tailles de dossiers entre les niveaux (par exemple, « quels sont les dossiers de niveau supérieur les plus volumineux ? »).

  **Remarque :** Pour une surveillance et une visualisation aussi précises que possible, incluez toutes les versions d'objets afin de voir les recommandations ou les métriques concernant les objets non actuels.


## Mettez en œuvre les optimisations avec Storage Management Recommendations {#act-on-optimizations-with-storage-management-recommendations}

Storage Management analyse vos données d'inventaire et vos logs d'accès pour faire apparaître des recommandations au niveau du préfixe afin de réduire les coûts de stockage S3. Ces recommandations sont disponibles pour tous les clients de Storage Management. Les économies potentielles sont estimées en utilisant les prix catalogue AWS. Si vous avez activé [Cloud Cost Management][7], les recommandations apparaissent également dans Cloud Cost Recommendations, et vous pouvez suivre les économies réelles réalisées grâce aux optimisations.

Les recommandations sont exécutées quotidiennement et sont automatiquement actualisées dans votre compte dès qu'elles sont publiées.

### Prérequis {#prerequisites}
L'affichage des recommandations nécessite les prérequis suivants :
1. Configurez les buckets S3 pour Storage Management en suivant les étapes ci-dessus sur cette page.
2. Pour voir les recommandations sur le déplacement des données rarement consultées vers des niveaux moins coûteux par préfixe, activez et transférez les logs d'accès S3 vers Datadog (des frais de Datadog Log Management s'appliquent).
3. Pour voir les recommandations sur l'identification des versions non actuelles dans les préfixes, incluez « All versions » dans la configuration de l'inventaire S3.

### Recommandations disponibles {#available-recommendations}
- Transition unaccessed S3 data in prefix to Infrequent Access
- Expire old non-current version objects in S3 bucket prefix
- Consolidate small files in prefix to minimize per-object storage costs

  {{< img src="infrastructure/storage_management/storage-recs.png" alt="Storage Management Recommendations" responsive="true">}}


[1]: mailto:storage-monitoring@datadoghq.com
[3]: https://app.datadoghq.com/storage-management
[4]: /fr/logs/log_configuration/indexes/#exclusion-filters
[7]: /fr/cloud_cost_management/
[8]: https://app.datadoghq.com/dash/integration/32296/storage-management-for-amazon-s3
[9]: https://app.datadoghq.com/storage-management/settings
[10]: https://docs.datadoghq.com/fr/bits_ai/bits_code/