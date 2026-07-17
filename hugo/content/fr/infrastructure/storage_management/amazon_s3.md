---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: Blog
  text: Optimisez et dépannez le stockage dans le cloud à grande échelle avec Storage
    Monitoring.
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: Blog
  text: Réduisez les coûts de stockage dans le cloud et améliorez l'efficacité opérationnelle
    avec Datadog Storage Monitoring.
title: Gestion du stockage pour Amazon S3
---
## Mise en place {#setup}

Configurez Storage Management pour Amazon S3 avec l'une des méthodes suivantes :

- **CloudFormation** : Une configuration guidée dans le produit qui configure l'intégration AWS, active S3 Inventory sur les buckets que vous sélectionnez, et active éventuellement les journaux d'accès S3. Une pile CloudFormation applique les modifications à votre compte AWS.
- **Terraform** : Utilisez le module Terraform officiel de Datadog Storage Management pour configurer l'inventaire et les journaux d'accès en tant que code.
- **Manuel** : Configurez vous-même S3 Inventory et les autorisations requises dans la console AWS, puis enregistrez la destination d'inventaire avec Storage Management.

{{< tabs >}}
{{% tab "CloudFormation" %}}

La configuration dans le produit vous guide à travers trois étapes : configurer un compte AWS, sélectionner des buckets et activer l'inventaire S3 et les journaux d'accès, puis terminer la configuration. Une pile CloudFormation applique les modifications requises dans votre compte AWS.

Pour commencer, accédez à **Infrastructure** > [**Storage Management**][1] et cliquez sur **Try Storage Management**.

[1]: https://app.datadoghq.com/storage-management

{{% collapse-content title="1. Configurez le compte AWS" level="h4" expanded=false id="datadog-ui-step1" %}}

Dans cette étape, configurez l'intégration AWS de Datadog avec la collecte de métriques et de ressources activée.

1. Choisissez d'utiliser un **compte AWS existant** déjà intégré à Datadog ou d'**ajouter un nouveau compte**.
   - Pour un nouveau compte, une pile CloudFormation crée le rôle d'intégration Datadog et configure à la fois la collecte de métriques et de ressources.
   - Pour un compte existant, confirmez que **la collecte de métriques** et **la collecte de ressources** sont activées. Storage Management utilise la collecte de ressources pour découvrir les buckets S3 et leurs configurations d'inventaire existantes.
2. Sélectionnez la région AWS que vous souhaitez configurer. Une région est configurée par exécution ; répétez les étapes pour chaque région supplémentaire.

Pour une liste des autorisations liées à S3 utilisées par la collecte de ressources, voir [Collecte de ressources][2] sur la page d'intégration AWS.

[2]: /fr/integrations/amazon-web-services/#resource-collection
{{% /collapse-content %}}

{{% collapse-content title="2. Configurer Storage Management" level="h4" expanded=false id="datadog-ui-step2" %}}

Dans cette étape, sélectionnez les buckets à surveiller, définissez une destination d'inventaire, et activez éventuellement les journaux d'accès.

<div class="alert alert-info">
    - Bucket source : Le bucket S3 que vous souhaitez surveiller avec Storage Management. <br>
    - Bucket de destination : Le bucket qui stocke les rapports d'inventaire (un par région AWS, peut être réutilisé cross-account).
</div>

1. **Select buckets** : Choisissez les buckets S3 que vous souhaitez surveiller avec Storage Management. Les buckets déjà activés pour Storage Management sont masqués. Les buckets avec S3 Inventory existant sont pré-sélectionnés et conservent leur destination actuelle.

2. **Set the inventory destination bucket** : Pour les buckets sans configuration d'inventaire existante, choisissez un bucket de destination où les rapports d'inventaire quotidiens sont livrés. Vous pouvez choisir un bucket existant ou en spécifier un nouveau. Datadog écrit les fichiers d'inventaire dans le préfixe `datadog-inventories`.

   **Note** : Storage Management nécessite un format d'inventaire CSV. La pile CloudFormation configure cela pour vous.

3. **Activer les journaux d'accès S3 (optionnel)** : Les journaux d'accès révèlent des modèles de données froides, des accès inhabituels et des opportunités de redimensionnement pour les niveaux de stockage. Activez **Activer les journaux d'accès S3**, puis :

   - Sélectionnez un seau de destination pour les journaux d'accès. Vous pouvez utiliser le même seau que celui de destination de l'inventaire.
   - Si un Datadog Log Forwarder est détecté dans le compte, il est réutilisé. Sinon, la pile CloudFormation déploie un nouveau Datadog Log Forwarder.
   - Les journaux d'accès transférés peuvent être ingérés sans indexation s'ils sont utilisés uniquement pour Storage Management. Voir [filtres d'exclusion][3] pour plus de détails.

   <div class="alert alert-warning">Le transfert des journaux d'accès S3 vers Datadog entraîne des coûts d'ingestion Log Management. Pour minimiser les coûts, utilisez des filtres d'exclusion afin que les journaux soient ingérés mais non indexés s'ils ne sont utilisés que pour Storage Management. Pour plus de détails, voir <a href="https://www.datadoghq.com/pricing/?product=log-management">tarification de la gestion des journaux Datadog</a>.</div>

4. Cliquez sur **Launch CloudFormation Template**. Une pile AWS Quick Create s'ouvre, pré-remplie avec les bucket mappings, le destination prefix, le nom du rôle d'intégration, ainsi que la Datadog API key, l'application key et les paramètres du Datadog Log Forwarder.

5. Dans AWS, examinez les paramètres de la pile et créez la pile. La pile :

   - Active daily S3 Inventory sur chaque bucket source sélectionné.
   - Ajoute des autorisations IAM pour que Storage Management puisse lire les rapports S3 Inventory des buckets de destination.
   - Ajoute la bucket policy au bucket de destination de l'inventaire afin que S3 puisse écrire des objets d'inventaire.
   - Active la journalisation d'accès serveur S3 sur les buckets sélectionnés (si les journaux d'accès sont activés).
   - Déploie une fonction Lambda de Datadog Log Forwarder (si les journaux d'accès sont activés et qu'aucun forwarder n'existe).

[3]: /fr/logs/log_configuration/indexes/#exclusion-filters
{{% /collapse-content %}}

{{% collapse-content title="3. Terminer la configuration" level="h4" expanded=false id="datadog-ui-step3" %}}

Après l'achèvement de la pile CloudFormation dans AWS, retournez à Storage Management et cliquez sur **Finish Setup**.

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Terraform" %}}

Utilisez le [Datadog Storage Management Terraform module][1] officiel pour configurer S3 Inventory et transférer les journaux d'accès S3. Le module :

   - Configure les autorisations requises sur le rôle IAM d'intégration AWS.
   - Ajoute une bucket policy pour permettre à Datadog de lire les fichiers d'inventaire depuis le bucket de destination.
   - Active la collecte des journaux d'accès S3 si un Datadog Log Forwarder est déjà configuré.

Pour utiliser l'exemple ci-dessous :
- Remplacez `<AWS_REGION>` par votre région AWS.
- Remplacez `<MODULE_NAME>` par un nom unique pour cette instance de module.
- Remplacez `<DATADOG_AWS_INTEGRATION_ROLE_NAME>` par le nom de votre rôle IAM d'intégration Datadog AWS.
- Remplacez `<SOURCE_BUCKET_1>`, `<SOURCE_BUCKET_2>`, etc. par les noms des buckets à surveiller.
- Remplacez `<DESTINATION_BUCKET_NAME>` par le nom du bucket qui reçoit vos fichiers d'inventaire.
- Remplacez `<DATADOG_FORWARDER_FUNCTION_NAME>` par le nom de votre fonction Lambda Datadog Forwarder (uniquement requis si l'activation des journaux d'accès est effectuée).

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
  source = "DataDog/storage-management/aws"

  name                              = "<MODULE_NAME>"
  datadog_aws_integration_role_name = "<DATADOG_AWS_INTEGRATION_ROLE_NAME>"
  source_bucket_names               = ["<SOURCE_BUCKET_1>", "<SOURCE_BUCKET_2>"]
  destination_bucket_name           = "<DESTINATION_BUCKET_NAME>"

  # Bucket policy: "none", "create", or "merge" (default)
  destination_bucket_policy_management = "merge"

  # Optional: Enable S3 access logs for prefix-level request and latency metrics
  enable_access_logging           = true
  datadog_forwarder_function_name = "<DATADOG_FORWARDER_FUNCTION_NAME>"
}
```

Après avoir activé l'inventaire S3, il peut falloir jusqu'à 24 heures pour que les premiers rapports d'inventaire soient générés. Pour vérifier que les inventaires sont générés, allez dans votre bucket de destination dans la console AWS et confirmez que les fichiers d'inventaire apparaissent dans le préfixe de destination que vous avez spécifié.

Après avoir confirmé que les fichiers d'inventaire sont présents, vérifiez que Storage Management est activé sur vos buckets en naviguant vers [**Storage Management**][2] et en confirmant que votre bucket de destination est répertorié.

[1]: https://registry.terraform.io/modules/DataDog/storage-management-datadog/aws/latest
[2]: https://app.datadoghq.com/storage-management

{{% /tab %}}

{{% tab "Méthode manuelle" %}}

Pour configurer manuellement le [Amazon S3 Inventory][206] requis et la configuration associée, suivez ces étapes :

[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html

{{% collapse-content title="1. Créez un bucket de destination" level="h4" expanded=false id="manual-setup-step1" %}}

1. [Créez un bucket S3][201] pour stocker vos fichiers d'inventaire. Ce bucket sert de lieu central pour les rapports d'inventaire.
   **Remarque** : Utilisez uniquement un bucket de destination pour tous les fichiers d'inventaire générés dans un compte AWS.
2. Créez un préfixe dans le bucket de destination (facultatif).

[201]: https://console.aws.amazon.com/s3/bucket/create
{{% /collapse-content %}}

{{% collapse-content title="2. Configurez les politiques de bucket et de rôle d'intégration" level="h4" expanded=false id="manual-setup-step2" %}}

1. Confirmez que le rôle d'intégration Datadog AWS a `s3:GetObject` et `s3:ListBucket` permissions sur le bucket de destination. Ces permissions permettent à Datadog de lire les fichiers d'inventaire générés.

2. Confirmez que la politique du bucket de destination permet à S3 d'écrire des fichiers d'inventaire dans votre bucket de destination.

      Exemple de politique de compartiment :
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

3. Suivez les étapes dans le [Guide de l'utilisateur Amazon S3][202] pour ajouter une politique de compartiment à votre compartiment de destination qui permet à Amazon S3 d'écrire des objets d'inventaire (`s3:PutObject`) depuis votre compartiment source ou vos compartiments.

[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
{{% /collapse-content %}}

{{% collapse-content title="3. Configurez la génération d'inventaire" level="h4" expanded=false id="manual-setup-step3" %}}

Pour chaque compartiment que vous souhaitez surveiller :
1. Allez sur la [page des compartiments Amazon S3][203] dans la console AWS et sélectionnez le compartiment.
2. Naviguez vers l'onglet **Gestion** du compartiment.
3. Cliquez sur **Créer une configuration d'inventaire**.
4. Configurez les paramètres suivants :
   - Définissez un nom de configuration
   - (Optionnel) Spécifiez un préfixe de bucket source
   - **Versions d'objets** : Datadog recommande de sélectionner **Include all versions** (nécessaire pour voir les métriques des versions non actuelles)

     {{< img src="integrations/guide/storage_monitoring/all-versions.png" alt="Sélectionnez les compartiments de destination pour activer la surveillance du stockage" responsive="true">}}
   - **Destination** : Sélectionnez le compartiment de destination commun pour les fichiers d'inventaire dans votre compte AWS. Par exemple, si le compartiment s'appelle `destination-bucket`, entrez `s3://your-destination-bucket`

      **Remarque** : Pour utiliser un préfixe sur le compartiment de destination, ajoutez-le également.
   - **Fréquence** : Datadog recommande de choisir **Quotidien**. Ce paramètre détermine la fréquence à laquelle vos métriques au niveau du préfixe sont mises à jour dans Datadog
   - **Format de sortie** : CSV
   - **Statut** : Activé
   - **Chiffrement côté serveur** : Ne spécifiez pas de clé de chiffrement
   - Sélectionnez tous les **champs de métadonnées supplémentaires** disponibles. Au minimum, les champs suivants sont requis :

     {{< img src="integrations/guide/storage_monitoring/metadata.png" alt="Champs de métadonnées supplémentaires. Taille, Dernière modification, Téléchargement multipart, État de réplication, Chiffrement, ACL d'objet, Classe de stockage, Intelligent-Tiering : Niveau d'accès, ETag et fonction de somme de contrôle sont tous sélectionnés. L'état de la clé de compartiment, le propriétaire de l'objet et toutes les configurations de verrouillage d'objet sont désélectionnés." responsive="true">}}

**Remarque** : Consultez [les tarifs d'Amazon S3][204] pour les coûts liés à la génération d'inventaire.

[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
{{% /collapse-content %}}

{{% collapse-content title="4. Activez les journaux d'accès S3 (optionnel)" level="h4" expanded=false id="manual-setup-step4" %}}

Pour obtenir des métriques d'accès au niveau du préfixe, y compris le nombre de requêtes, la latence côté serveur et l'identification des données froides, activez la journalisation d'accès S3 sur vos compartiments source et transférez ces journaux à Datadog. Pour des instructions étape par étape, voir [Activer les journaux d'accès S3][208] dans la documentation d'intégration d'Amazon S3.

<div class="alert alert-warning">Le transfert des journaux d'accès S3 vers Datadog entraîne des coûts d'ingestion de gestion des journaux. Pour minimiser les coûts, utilisez des filtres d'exclusion afin que les journaux soient ingérés mais non indexés s'ils ne sont utilisés que pour la gestion du stockage. Pour plus de détails, voir <a href="https://www.datadoghq.com/pricing/?product=log-management">tarification de la gestion des journaux Datadog</a>.</div>

[208]: /fr/integrations/amazon-s3/#enable-s3-access-logs
{{% /collapse-content %}}

### Étapes post-configuration {#post-setup-steps}

Après que les fichiers d'inventaire commencent à apparaître dans le compartiment de destination, enregistrez-le auprès de la gestion du stockage en appelant le point de terminaison [Activer la gestion du stockage pour un compartiment][209] :

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
          "aws_account_id": "<AWS_ACCOUNT_ID>",
          "destination_bucket_name": "<DESTINATION_BUCKET_NAME>",
          "destination_bucket_region": "<DESTINATION_BUCKET_REGION>",
          "destination_prefix": "<DESTINATION_PREFIX>"
        }
      }
    }
  }'
```

Pour utiliser l'exemple ci-dessus :
- Remplacez `<AWS_ACCOUNT_ID>` par l'ID de compte AWS à 12 chiffres qui possède le compartiment de destination.
- Remplacez `<DESTINATION_BUCKET_NAME>` par le nom du compartiment de destination contenant les rapports d'inventaire.
- Remplacez `<DESTINATION_BUCKET_REGION>` par la région AWS du compartiment de destination.
- Remplacez `<DESTINATION_PREFIX>` par le préfixe dans le compartiment de destination où les fichiers d'inventaire sont écrits. Utilisez une chaîne vide s'il n'y a pas de préfixe.

Une `200` réponse confirme que la gestion du stockage est activée pour le compartiment de destination.

[209]: /fr/api/latest/storage-management/#enable-storage-management-for-a-bucket

{{% /tab %}}

{{< /tabs >}}

### Validation {#validation}

Pour vérifier votre configuration :
1. Attendez que le premier rapport d'inventaire soit généré (jusqu'à 24 heures pour les inventaires quotidiens).
2. Accédez à **Infrastructure** > [**Gestion du stockage**][3] pour voir si les compartiments que vous avez configurés apparaissent dans la liste de l'explorateur lorsque **Compartiments surveillés** est sélectionné.

  {{< img src="infrastructure/storage_management/monitored-buckets.png" alt="Validez que le compartiment est activé pour la surveillance" responsive="true">}}

### Meilleures pratiques {#best-practices}

Suivez ces meilleures pratiques pour optimiser la configuration de la gestion du stockage :
- **Configurez des politiques de cycle de vie pour les compartiments de destination d'inventaire** : Les rapports d'inventaire S3 sont générés quotidiennement et stockés dans votre compartiment de destination. Pour éviter que les anciens fichiers d'inventaire ne s'accumulent et n'entraînent des coûts de stockage, ajoutez une politique de cycle de vie pour supprimer automatiquement les rapports d'inventaire de plus de trois jours.

- **Configurez des politiques de cycle de vie pour les journaux d'accès S3** : Si vous avez activé les journaux d'accès S3 pour les métriques de requêtes au niveau du préfixe, les fichiers journaux bruts s'accumulent dans votre compartiment de destination. Après que ces journaux ont été transférés à Datadog, les fichiers bruts ne sont plus nécessaires à des fins de gestion du stockage. Pour supprimer automatiquement les fichiers journaux d'accès après les avoir transférés à Datadog, ajoutez une règle de cycle de vie.

  **Remarque** : Avant d'activer la suppression automatique, vérifiez qu'il n'y a pas d'exigences de conformité ou d'audit dans votre organisation qui imposent de conserver les journaux d'accès S3 bruts pendant une période spécifique.

- **Créez des filtres d'exclusion pour les journaux d'accès S3** : Si les journaux d'accès S3 sont transférés à Datadog uniquement pour la gestion du stockage et n'ont pas besoin d'être indexés pour la recherche ou l'analyse, ajoutez un [filtre d'exclusion][4] pour les exclure du volume de journaux indexés.

### Dépannage {#troubleshooting}

Si vous ne voyez pas de données pour les compartiments que vous avez configurés pour la gestion du stockage, utilisez la page [Paramètres de gestion du stockage][9] pour voir tous les compartiments configurés, leur statut d'inventaire et les erreurs de configuration éventuelles. La page met en évidence les problèmes avec des étapes de remédiation exploitables.
Si vous avez des questions, [contactez Datadog][1].

## Identifiez et agissez sur les économies de coûts avec Bits Chat {#identify-and-act-on-cost-savings-with-bits-chat}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScbFjbJecpVV-DgJNBt2O205KtaWlD_q6ajThIEX9vTGz6ebA/viewform?usp=publish-editor" >}}
Bits Chat pour la gestion du stockage est en avant-première. Pour essayer cette fonctionnalité, demandez l'accès.
{{< /callout >}} 


Les équipes FinOps et d'ingénierie peuvent utiliser Bits Chat et la gestion du stockage pour identifier les opportunités d'économies de coûts S3, générer des rapports dans Datadog Notebooks et mettre en œuvre les changements recommandés. Pour utiliser Bits Chat avec la gestion du stockage, activez la compétence `storage` dans les paramètres de Bits Chat.

Avec la compétence `storage` activée pour Bits Chat, vous pouvez :

- **Trouvez les plus grandes opportunités d'économies** : Posez des questions en langage naturel pour faire ressortir les préfixes, classes de stockage ou compartiments ayant le plus grand impact où des changements de cycle de vie réduiraient le plus les coûts.
- **Créer des rapports via Notebooks** : Générez un Notebook Datadog résumant les résultats, les économies estimées et les actions recommandées pour que votre équipe puisse les examiner et les partager.
- **Mettre en œuvre des changements** : Obtenez des conseils étape par étape avec [Bits Code][10] pour appliquer des politiques de cycle de vie, transférer des objets vers des niveaux de stockage moins chers ou expirer les versions non actuelles dans les préfixes ayant le plus grand potentiel d'économies.


## Visualisez l'utilisation granulaire de S3 avec des métriques d'inventaire {#visualize-granular-s3-usage-with-inventory-metrics}

Un modèle de tableau de bord [Gestion du stockage S3][8] prêt à l'emploi est disponible pour vous aider à visualiser les métriques ci-dessous. Vous pouvez le cloner et le personnaliser selon vos besoins.

| Nom de la métrique                                            | Tags notables                                                                                  | Description                                                                                                                                    |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| aws.s3.inventory.total_prefix_size                     | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | Montant total de données, en octets, stockées dans un préfixe.                                                                                            |
| aws.s3.inventory.average_prefix_size                   | `bucketname`, `prefix`, `region`                                                              | Taille moyenne des objets, en octets, pour les objets dans un préfixe.                                                                                        |
| aws.s3.inventory.prefix_object_count                   | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | Le nombre total d'objets stockés dans un préfixe.                                                                                                |
| aws.s3.inventory.prefix_object_count.levels            | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Comptes d'objets agrégés par niveaux de préfixe hiérarchiques, utilisés pour les visualisations en treemap.                                                       |
| aws.s3.inventory.total_prefix_size.levels              | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Taille du préfixe agrégée par niveaux de préfixe hiérarchiques, utilisée pour les visualisations en treemap.                                                         |
| aws.s3.inventory.prefix_age_days                       | `bucketname`, `prefix`, `region`                                                              | Âge, en jours, de l'objet le plus ancien dans le bucket ou le préfixe.                                                                                    |
| aws.s3.inventory.prefix_small_file_size                | `bucketname`, `prefix`, `region`, `storagetype`                                               | Taille totale, en octets, des objets de moins de 128 Ko dans un préfixe. Aide à identifier les coûts indirects sur les niveaux de stockage comme Glacier et Standard-IA.   |
| aws.s3.inventory.prefix_small_file_count               | `bucketname`, `prefix`, `region`, `storagetype`                                               | Nombre d'objets de moins de 128 Ko dans un préfixe. Aide à identifier les coûts indirects sur les niveaux de stockage comme Glacier et Standard-IA.                   |
| aws.s3.inventory.access_logs.total_requests_by_method  | `bucketname`, `prefix`, `region`, `method`                                                    | Nombre total de requêtes pour des objets dans un préfixe, éventuellement réparti par méthode de requête (par exemple, GET ou PUT). Nécessite des journaux d'accès S3 dans Datadog.   |
| aws.s3.inventory.access_logs.request_latency_by_method | `bucketname`, `prefix`, `region`, `method`                                                    | Temps de réponse du serveur pour les requêtes dans un préfixe, éventuellement réparti par méthode de requête. Nécessite des journaux d'accès S3 dans Datadog.                          |

  *`prefixN` fait référence aux niveaux de préfixe tels que `prefix0`, `prefix1`, `prefix2`, etc.

  **Remarque :** Utilisez la bonne métrique pour la question à laquelle vous répondez :
  - `aws.s3.inventory.prefix_object_count` et `aws.s3.inventory.total_prefix_size` (avec le tag `prefix`) incluent tout ce qui se trouve dans un dossier et tous ses sous-dossiers. Utilisez ceux-ci lorsque vous souhaitez obtenir le nombre total ou la taille d’un dossier spécifique (par exemple, « combien y a-t-il dans `logs/2024/` ?»).
  - `aws.s3.inventory.prefix_object_count.levels` et `aws.s3.inventory.total_prefix_size.levels` (avec `prefix1`, `prefix2`, `prefix3`, etc.) comptent ou mesurent des objets uniquement à cette profondeur exacte. Utilisez ceux-ci lorsque vous souhaitez construire une carte arborescente ou comparer les tailles de dossiers à travers les niveaux (par exemple, « quels dossiers de premier niveau sont les plus grands ?»).

  **Remarque :** Pour une surveillance et une visualisation les plus précises, incluez toutes les versions d'objet pour voir les recommandations ou métriques d'objets non actuels.


## Agissez sur les optimisations avec les recommandations de gestion du stockage {#act-on-optimizations-with-storage-management-recommendations}

Storage Management analyse vos données d'inventaire et vos journaux d'accès pour faire ressortir des recommandations au niveau des préfixes en vue de réduire les coûts de stockage S3. Ces recommandations sont disponibles pour tous les clients de Storage Management. Les économies potentielles sont estimées en utilisant les prix de liste AWS. Si vous avez [Cloud Cost Management][7] activé, les recommandations apparaissent également dans Cloud Cost Recommendations, et vous pouvez suivre les économies réelles issues des optimisations.

Les recommandations sont exécutées quotidiennement et sont automatiquement mises à jour dans votre compte dès que les recommandations sont publiées.

### Conditions préalables {#prerequisites}
Voir les recommandations a les conditions préalables suivantes :
1. Configurez les buckets S3 pour Storage Management en suivant les étapes ci-dessus sur cette page.
2. Pour voir les recommandations pour déplacer les données rarement accessibles vers des niveaux moins chers par préfixe, activez et transférez les journaux d'accès S3 à Datadog (des frais de Datadog Log Management s'appliquent).
3. Pour voir les recommandations pour identifier les versions non actuelles dans les préfixes, incluez « All versions » dans la configuration de l'inventaire S3.

### Recommandations disponibles {#available-recommendations}
- Transférez les données S3 non accessibles dans le préfixe vers Infrequent Access.
- Faites expirer les anciens objets de version non courante dans le préfixe du bucket S3.
- Consolidez les petits fichiers dans le préfixe pour minimiser les coûts de stockage par objet.

  {{< img src="infrastructure/storage_management/storage-recs.png" alt="Storage Management Recommendations" responsive="true">}}


[1]: mailto:storage-monitoring@datadoghq.com
[3]: https://app.datadoghq.com/storage-management
[4]: /fr/logs/log_configuration/indexes/#exclusion-filters
[7]: /fr/cloud_cost_management/
[8]: https://app.datadoghq.com/dash/integration/32296/storage-management-for-amazon-s3
[9]: https://app.datadoghq.com/storage-management/settings
[10]: https://docs.datadoghq.com/fr/bits_ai/bits_ai_dev_agent/