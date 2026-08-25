
Après avoir déployé un pipeline, vous pouvez également modifier les méthodes de déploiement. Il est ainsi possible de passer d'une gestion manuelle à une configuration à distance, et inversement.

Pour passer d'un déploiement avec une configuration à distance à un déploiement avec une gestion manuelle, procédez comme suit :
1. Accédez à Observability Pipelines et sélectionnez le pipeline.
2. Cliquez sur l'icône en forme d'engrenage des réglages.
3. Dans **Deployment Mode**, sélectionnez **manual** pour activer la gestion manuelle.
4. Définissez le flag `DD_OP_REMOTE_CONFIGURATION_ENABLED` sur `false` et redémarrez le worker. Si vous ne redémarrez pas un worker avec ce flag, la configuration à distance continue à être activée pour celui-ci : il n'est donc pas mis à jour manuellement via un fichier de configuration local.

Pour passer d'un déploiement avec une gestion manuelle à un déploiement avec une configuration à distance, procédez comme suit :
1. Accédez à Observability Pipelines et sélectionnez le pipeline.
2. Cliquez sur l'icône en forme d'engrenage des réglages.
3. Dans **Deployment Mode**, sélectionnez **Remote Configuration** pour activer la configuration à distance.
4. Définissez le flag `DD_OP_REMOTE_CONFIGURATION_ENABLED` sur `true` et redémarrez le worker. Si vous ne redémarrez pas un worker avec ce flag, les configurations déployées dans l'interface ne sont pas récupérées.
6. Déployez une version de votre historique, afin que les workers reçoivent la nouvelle configuration de version. Cliquez sur une version. Cliquez sur **Edit as Draft**, puis sur **Deploy**. 