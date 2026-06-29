1. Sélectionnez l'une des options du menu déroulant pour indiquer le volume prévu du log pour le pipeline :
|   Option   | Description |
| ---------- | ----------- |
| Unsure | Utilisez cette option si vous n'êtes pas en mesure de projeter le volume du log ou si vous souhaitez tester le worker. Cette option approvisionne le groupe EC2 Auto Scaling avec un maximum de 2 instances `t4g.large` à usage général. |
| 1-5 TB/day | Cette option permet de provisionner le groupe EC2 Auto Scaling avec un maximum de 2 instances optimisées c6g.large` pour le calcul. |
| 5-10 TB/day | Cette option permet de doter le groupe EC2 Auto Scaling d'un minimum de 2 et d'un maximum de 5 instances `c6g.large` optimisées pour le calcul. |
| >10 TB/day | Datadog recommande cette option pour les déploiements de production à grande échelle. Elle approvisionne le groupe EC2 Auto Scaling avec un minimum de 2 et un maximum de 10 instances `c6g.xlarge` optimisées pour le calcul. |

    **Remarque** : tous les autres paramètres sont définis sur des valeurs par défaut raisonnables pour un déploiement de worker, mais vous pouvez les adapter à votre cas d'utilisation si nécessaire dans la console AWS avant de créer la stack.
1. Sélectionnez la région AWS que vous souhaitez utiliser pour installer le worker.
1. Cliquez sur **Select API key** pour choisir la clé d'API Datadog que vous souhaitez utiliser.
1. Cliquez sur **Launch CloudFormation Template** pour accéder à la console AWS afin d'examiner la configuration de la stack et de la lancer. Assurez-vous que les paramètres de CloudFormation correspondent à ce qui est prévu.
1. Sélectionnez le VPC et le sous-réseau que vous souhaitez utiliser pour installer le worker.
1. Passez en revue et vérifiez les cases des autorisations nécessaires pour IAM. Cliquez sur **Submit** pour créer la stack. CloudFormation s'occupe de l'installation à ce stade. Les instances du worker sont lancées, le logiciel nécessaire est téléchargé et le worker démarre automatiquement.
1. Retournez à la page d'installation des pipelines d'observabilité et cliquez sur **Deploy**.

Consultez la section [Mise à jour des pipelines existants][7001] si vous souhaitez apporter des modifications à la configuration de votre pipeline.

[7001]: /fr/observability_pipelines/update_existing_pipelines