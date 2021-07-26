---
aliases:
  - /fr/4da-22a-46b
cloud: aws
disable_edit: true
kind: documentation
rule_category:
  - Cloud Configuration
scope: redshift
security: compliance
source: redshift
title: Activer la mise à jour des clusters Redshift
type: security_rules
---
## Rôle

Vérifiez que l'option `AllowVersionUpgrade` est activée pour permettre aux [clusters Redshift][1] de se mettre à jour automatiquement vers la dernière version.

## Meilleure pratique

L'activation de cette option permet d'installer automatiquement les mises à jour afin de déployer les corrections de bugs et les patchs de sécurité les plus récents.

## Remédiation

### Console

Suivez la documentation relative à la [maintenance des clusters][4] pour autoriser la mise à jour automatique de vos clusters.

### Interface de ligne de commande

1. Exécutez `modify-cluster` pour [définir `allow-version-upgrade` sur un cluster][3].

    {{< code-block lang="bash" filename="allow-version-upgrade.sh" >}}
    aws redshift modify-cluster
        --cluster-identifier cluster-id-name
        --allow-version-upgrade
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/modify-cluster.html
[3]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#rs-cluster-maintenance