---
title: Ajouter des métadonnées personnalisées aux logs grâce aux tables d'enrichissement
kind: guide
beta: true
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: Découvrir comment traiter vos logs
  - link: /logs/processing/parsing/
    tag: Documentation
    text: En savoir plus sur le parsing
---
<div class="alert alert-warning">
La fonctionnalité Tables d'enrichissement est actuellement en bêta privée. Pour en savoir plus, contactez l'<a href="https://docs.datadoghq.com/help/">assistance Datadog</a>.
</div>

## Présentation

Définissez de nouvelles entités dans Datadog (telles que des informations client, des noms de service, des informations sur un service ou des adresses IP) en important un fichier CSV contenant une table d'informations. Une entité correspond à une clé primaire dans une table d'enrichissement et à ses métadonnées associées. Les données peuvent être appliquées en tant que tags aux logs lors de leur ingestion dans le [processeur de correspondances][1].

{{< img src="logs/guide/enrichment-tables/overview.png" alt="Tables d'enrichissement" style="width:100%;">}}

## Créer une table d'enrichissement

{{< tabs >}}
{{% tab "Importation manuelle" %}}

Cliquez sur **New Enrichment Table +**, puis importez un fichier CSV. Nommez les colonnes appropriées et définissez la clé primaire utilisée pour les correspondances.

{{< img src="logs/guide/enrichment-tables/configure-enrichment-table.png" alt="Créer une table d'enrichissement" style="width:100%;">}}{{% /tab %}}

{{% tab "Importation AWS S3" %}}

Les tables d'enrichissement peuvent automatiquement récupérer un fichier CSV à partir d'un compartiment S3 AWS afin de garder vos données à jour. L'intégration recherche les modifications apportées au fichier CSV dans S3. Une fois le fichier à jour, les nouvelles données intègrent la table d'enrichissement. Cela permet également de mettre à jour l'API à partir de l'API de S3, une fois la table d'enrichissement initiale configurée.

Pour mettre à jour les tables d'enrichissement depuis S3, Datadog utilise le rôle IAM du compte AWS que vous avez configuré pour [l'intégration AWS][1]. Si vous n'avez pas encore créé ce rôle, [suivez ces étapes][2] pour y remédier. Pour autoriser ce rôle à mettre à jour vos tables d'enrichissement, ajoutez la déclaration d'autorisation suivante à ses stratégies IAM. Veillez à modifier les noms des compartiments afin qu'ils correspondent à votre environnement.


```json
{
    "Statement": [
        {
            "Sid": "EnrichmentTablesS3",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::<NOM_DU_BUCKET_1>",
                "arn:aws:s3:::<NOM_DU_BUCKET_2>"
            ]
        }
    ],
    "Version": "2012-10-17"
}
```
### Définir la table

Cliquez sur **New Enrichment Table +**, puis nommez la table. Sélectionnez AWS S3, remplissez tous les champs, cliquez sur Import, puis définissez la clé primaire utilisée pour les correspondances.

{{< img src="logs/guide/enrichment-tables/configure-s3-enrichment-table.png" alt="Créer une table d'enrichissement" style="width:100%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=automaticcloudformation#installation
{{% /tab %}}
{{< /tabs >}}

Cette table d'enrichissement peut ensuite être utilisée pour ajouter des attributs supplémentaires aux logs via le [processeur de correspondances][1].

## Modifier une table d'enrichissement

Pour modifier une table d'enrichissement existante en ajoutant de nouvelles données, sélectionnez une table, puis cliquez sur **Update Data +** en haut à droite. Les données du fichier CSV sont alors intégrées à la table. Cela signifie que toutes les lignes existantes avec la même clé primaire sont mises à jour, et que toutes les nouvelles lignes sont ajoutées. Une fois la table enregistrée, les lignes modifiées sont traitées de façon asynchrone et mises à jour dans l'aperçu. Vous devrez peut-être patienter jusqu'à 10 minutes avant de pouvoir les visualiser dans les logs concernés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/processing/processors/?tab=ui#lookup-processor