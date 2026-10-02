### Connectez le bucket S3 à Datadog Log Archives {#connect-the-s3-bucket-to-datadog-log-archives}

1. Accédez à Datadog [Log Forwarding][201].
1. Cliquez sur **New archive**.
1. Saisissez un nom descriptif pour l'archive.
1. Dans la section **Define Which Data To Forward**, ajoutez une requête qui exclut tous les logs passant par les pipelines de Log Management afin que Log Archive n'envoie aucun log vers ce bucket. Sinon, Log Archive et le Worker envoient tous deux des logs vers le bucket, ce qui entraîne la duplication des logs archivés.
    - Par exemple, si vous ajoutez la requête `observability_pipelines_read_only_archive` et que les logs passant par vos pipelines de Log Management ne possèdent pas ce tag, le Worker envoie les logs vers le bucket, tandis que Log Archive lit et réhydrate uniquement depuis le bucket.
    - Une fois la requête saisie, telle que `observability_pipelines_read_only_archive`, l'aperçu des logs en haut de la page ne devrait afficher aucun résultat correspondant.
1. Sélectionnez **AWS S3**.
1. Sélectionnez le compte AWS dans lequel se trouve votre bucket.
1. Saisissez le nom du bucket S3.
1. Saisissez éventuellement un chemin.
1. Cochez la déclaration de confirmation.
1. Ajoutez éventuellement des tags et définissez la taille d'analyse maximale pour la réhydratation. Consultez [Advanced settings][202] pour plus d'informations.
1. Cliquez sur **Enregistrer**.

Consultez la [documentation sur les Log Archives][203] pour plus d'informations.

[201]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[202]: /fr/logs/log_configuration/archives/?tab=awss3#advanced-settings
[203]: /fr/logs/log_configuration/archives
