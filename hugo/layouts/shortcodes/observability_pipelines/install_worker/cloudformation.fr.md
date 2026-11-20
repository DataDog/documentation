1. Sélectionnez l'une des options dans la liste déroulante pour fournir le volume de logs ou de métriques attendu pour le pipeline :
|   Option   | Description |
| ---------- | ----------- |
| Unsure | Utilisez cette option si vous n'êtes pas en mesure de prévoir le volume de données ou si vous souhaitez tester le Worker. Cette option provisionne le groupe Auto Scaling EC2 avec un maximum de 2 instances à usage général `t4g.large`. |
| 1 à 5 To/jour | Cette option provisionne le groupe Auto Scaling EC2 avec un maximum de 2 instances optimisées pour le calcul `c6g.large`. |
| 5 à 10 To/jour | Cette option provisionne le groupe Auto Scaling EC2 avec un minimum de 2 et un maximum de 5 instances optimisées pour le calcul `c6g.large`. |
| >10 To/jour | Datadog recommande cette option pour les déploiements de production à grande échelle. Cette option provisionne le groupe Auto Scaling EC2 avec un minimum de 2 et un maximum de 10 instances optimisées pour le calcul `c6g.xlarge`. |

    **Remarque** : Tous les autres paramètres sont définis sur des valeurs par défaut raisonnables pour un déploiement de Worker, mais vous pouvez les ajuster selon vos besoins dans AWS Console avant de créer la pile.
1. Sélectionnez la région AWS que vous souhaitez utiliser pour installer le Worker.
1. Cliquez sur **Select API key** pour choisir la clé d'API Datadog que vous souhaitez utiliser.
    - **Remarque** : La clé d'API doit être [activée pour Remote Configuration][7002].
1. Cliquez sur **Launch CloudFormation Template** pour accéder à AWS Console, vérifier la configuration de la pile, puis lancer celle-ci. Assurez-vous que les paramètres CloudFormation sont conformes à vos attentes.
1. Sélectionnez le VPC et le sous-réseau que vous souhaitez utiliser pour installer le Worker.
1. Vérifiez et cochez les cases correspondant aux autorisations IAM nécessaires. Cliquez sur **Submit** pour créer la pile. CloudFormation gère l'installation à ce stade ; les instances Worker sont lancées, le logiciel nécessaire est téléchargé et le Worker démarre automatiquement.
1. Revenez à la page d'installation d'Observability Pipelines et cliquez sur **Deploy**.

Consultez [Mettre à jour les Pipelines existants][7001] si vous souhaitez apporter des modifications à la configuration de votre pipeline.

[7001]: /fr/observability_pipelines/configuration/update_existing_pipelines
[7002]: https://app.datadoghq.com/organization-settings/remote-config/setup