
## Prérequis

Pour déployer le scanning sans Agent dans votre environnement AWS, vous devez avoir activé la Configuration à distance ainsi que [Cloud Security Management][3].

### Activer la configuration à distance

La [Configuration à distance][1] (activée par [défaut][2] depuis le **8 avril 2024**) est requise pour que Datadog puisse envoyer certaines informations aux scanners sans Agent, telles que les ressources cloud devant être scannées. Si cette fonctionnalité n'a pas été activée pour votre organisation, accédez à vos [Paramètres d'organisation dans Datadog][4] et suivez les [étapes 1 à 4][2] de la documentation dédiée.

**Remarque** : les comptes AWS pour lesquels CSM est activé et qui ont des scanners déployés nécessitent des clés d'API avec la Configuration à distance activée.

### Autorisations

**Remarque** : les autorisations suivantes sont requises pour le scanning sans Agent et sont automatiquement appliquées lors du processus d'installation.

#### Autorisations IAM (hosts et conteneurs)

L'instance de scanning sans Agent nécessite les autorisations IAM suivantes pour scanner les hosts et les conteneurs :

```
ec2:DescribeVolumes
ec2:CreateTags
ec2:CreateSnapshot
ec2:DeleteSnapshot
ec2:DescribeSnapshots
ec2:DescribeSnapshotAttribute
ebs:ListSnapshotBlocks
ebs:ListChangedBlocks
ebs:GetSnapshotBlock
```

#### Autorisations Lambda

L'instance de scanning sans Agent nécessite les autorisations IAM suivantes pour scanner les Lambdas :

```
lambda:GetFunction
```


[1]: /agent/remote_config/?tab=configurationyamlfile
[2]: /agent/remote_config/?tab=configurationyamlfile#setup
[3]: /security/cloud_security_management/setup
[4]: https://app.datadoghq.com/organization-settings/remote-config