
1. Sélectionnez dans la liste déroulante le volume attendu du log pour le pipeline.
1. Sélectionnez la région AWS que vous souhaitez utiliser pour installer le worker.
1. Cliquez sur **Select API key** pour choisir la clé d'API Datadogque vous souhaitez utiliser.
1. Cliquez sur **Launch CloudFormation Template** pour accéder à la console AWS afin d'examiner la configuration de la stack et de la lancer. Assurez-vous que les paramètres de CloudFormation sont définis comme prévu.
1. Sélectionnez le VPC et le sous-réseau que vous souhaitez utiliser pour installer le worker.
1. Passez en revue et vérifiez les cases des autorisations nécessaires pour IAM. Cliquez sur **Submit** pour créer la stack. CloudFormation s'occupe de l'installation à ce stade. Les instances du worker sont lancées, le logiciel nécessaire est téléchargé et le worker démarre automatiquement.
1. Supprimez la stack CloudFormation précédente et les ressources qui y sont associées.
1. Cliquez sur **Navigate Back** pour revenir à la page d'édition des pipelines d'observabilité.
1. Cliquez sur **Deploy Changes**.