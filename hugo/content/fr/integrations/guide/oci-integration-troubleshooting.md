---
description: Étapes de dépannage pour l'intégration Datadog OCI
further_reading:
- link: https://docs.datadoghq.com/integrations/oracle-cloud-infrastructure/
  tag: Intégration
  text: Intégration OCI
title: Dépannage de l'intégration Datadog OCI
---
## Présentation {#overview}

Utilisez ce guide pour résoudre les problèmes liés à l'intégration Datadog OCI [1].

## Problèmes d'intégration {#integration-issues}

Consultez les problèmes de configuration de votre intégration OCI sous l'onglet **Issues** de la [tuile de l'intégration OCI][2].

## Identifiants de Datadog API ou de clé d'application non valides {#invalid-datadog-api-or-app-key-credentials}

Cela se produit lorsque la clé d'API ou la clé d'application Datadog configurée dans l'intégration OCI a expiré ou n'est pas valide. Les deux clés sont validées lors d'un stack apply. Recherchez l'erreur suivante dans les logs de jobs de votre pile ORM pour confirmer:

```
Error: unexpected response code '403': {"errors":["Forbidden"]}

  with module.integration[0].restapi_object.datadog_tenancy_integration,
  on modules/integration/main.tf line 15, in resource "restapi_object" "datadog_tenancy_integration":
  15: resource "restapi_object" "datadog_tenancy_integration" {
```

Pour remédier à cela, générez de nouveaux identifiants et mettez à jour votre déploiement d'intégration :

1. Accédez à [API Keys][6] dans les paramètres de votre organisation Datadog et générez une nouvelle clé d'API.
2. Accédez à [Application Keys][8] dans les paramètres de votre organisation Datadog et générez une nouvelle application key.
3. Mettez à jour votre déploiement d'intégration avec les nouvelles clés et réappliquez-le.

{{< tabs >}}
{{% tab "QuickStart (pile ORM)" %}}

1. Accédez à [Oracle Resource Manager stacks](https://cloud.oracle.com/resourcemanager/stacks) et localisez votre pile Datadog QuickStart.
2. Cliquez sur **Edit** sur la pile.
3. Cliquez sur **Next** pour atteindre la page **Configure Variables**.
4. Mettez à jour les valeurs **Datadog API Key** et **Datadog Application Key** avec les nouveaux identifiants.
5. Cliquez sur **Next**.
6. Cliquez sur **Save changes**.

{{% /tab %}}
{{% tab "Terraform" %}}

1. Mettez à jour les valeurs `datadog_api_key` et `datadog_app_key` dans votre fichier Terraform `.tf` avec les nouveaux identifiants.
2. Exécutez `terraform apply` pour appliquer la configuration mise à jour.

{{% /tab %}}
{{< /tabs >}}

## Les autorisations OCI IAM requises sont manquantes {#required-oci-iam-permissions-are-missing}

Datadog a reçu `403` une erreur lors de l'interrogation d'OCI, indiquant que toutes les autorisations OCI IAM nécessaires n'ont pas été accordées.
Vérifiez la [page Policies][4] dans OCI pour vous assurer que les politiques `dd-svc-policy` et `dd-dynamic-group` possèdent toutes les autorisations **read-only** correctement configurées.

## OCI tenancy atteignant la limite du hub de connecteur de service {#oci-tenancy-reaching-service-connector-hub-limit}

Pour chaque OCI tenancy, au moins un hub de connecteur de service est requis par tranche de cinq compartiments. [Demandez une augmentation de la limite de service][5] dans votre compte OCI.

## Impossible de collecter des données à partir d'une ou plusieurs régions souscrites {#cannot-collect-data-from-one-or-more-subscribed-regions}

La fonction d'application utilisée pour transférer les métriques et les logs Datadog est introuvable.
Pour remédier à cela, réappliquez la pile ORM de l'intégration Datadog existante dans votre OCI tenancy. 

**Note** : Si vous avez spécifié les subnet OCIDs dans la section de configuration optionnelle, assurez-vous qu'il y a un subnet OCID par région souscrite. N'apportez aucune autre modification à la pile existante avant de la réappliquer.

## Métriques non collectées {#metrics-not-being-collected}

Effectuez les vérifications suivantes pour chaque région surveillée :

1. Dans le compartiment d'intégration, vérifiez que l'application de fonction `dd-function-app` existe.
2. Dans `dd-function-app`, vérifiez que la fonction `dd-metrics-forwarder` existe.
3. Si vous utilisez des sous-réseaux personnalisés, vérifiez qu'ils répondent aux [autorisations][7] (détaillées dans la note après l'étape 5).
4. Pour chaque hub de connecteur de service de métriques créé par Datadog, confirmez que sa cible de fonction est la fonction `dd-metrics-forwarder` dans `dd-function-app`. Les hub de connecteurs de métriques créés par Datadog utilisent le format `dd-metrics-connectorhub-<suffix>`. Si un hub de connecteur cible une application de fonction de transfert différente, supprimez-le et laissez-le être automatiquement reprovisionné.

## Problèmes de destruction de la pile OCI {#oci-stack-destroy-issues}

Si le job destroy échoue ou ne peut pas être exécuté :

1. Clonez le [dépôt de l'intégration OCI][11] et accédez au répertoire du dépôt.
2. Utilisez le [script de nettoyage de l'intégration OCI][10] pour supprimer les ressources restantes.
3. Définissez les variables requises.
4. Examinez un dry run:

    ```shell
    export OCI_PROFILE="<YOUR_OCI_PROFILE>"
    export COMPARTMENT_OCID="<YOUR_COMPARTMENT_OCID>"
    export TENANCY_OCID="<YOUR_TENANCY_OCID>"

    python3 oci-integration-cleanup/integration_cleanup.py \
      --profile "$OCI_PROFILE" \
      --compartment-ocid "$COMPARTMENT_OCID" \
      --dry-run true
    ```

5. Examinez les ressources dont la suppression est prévue dans le résultat du dry run. Si le résultat semble correct, exécutez le nettoyage :

    ```shell
    python3 oci-integration-cleanup/integration_cleanup.py \
      --profile "$OCI_PROFILE" \
      --compartment-ocid "$COMPARTMENT_OCID" \
      --confirm-tenancy-id "$TENANCY_OCID" \
      --region-workers <number of regions to be processed in parallel> \
      --dry-run false
    ```

## Version d'intégration obsolète {#outdated-integration-version}

Cela se produit lorsque la pile ORM de votre intégration Datadog ou votre module Terraform est obsolète. Pour y remédier, mettez à jour votre déploiement vers la dernière version et réappliquez-le. Pour obtenir des instructions concernant à la fois QuickStart (pile ORM) et Terraform, consultez [Mettre à jour l'intégration][8].

Besoin d'aide supplémentaire ? Contactez le [Datadog support][3].

[1]: /fr/integrations/oracle-cloud-infrastructure
[2]: https://app.datadoghq.com/integrations?integrationId=oracle-cloud-infrastructure
[3]: /fr/help/
[4]: https://cloud.oracle.com/identity/domains/policies
[5]: https://docs.oracle.com/en/cloud/get-started/subscriptions-cloud/mmocs/requesting-service-limit-change.html
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://docs.datadoghq.com/fr/integrations/oracle-cloud-infrastructure/#deploy-the-quickstart-orm-stack
[8]: /fr/integrations/oracle-cloud-infrastructure/#update-the-integration
[9]: https://app.datadoghq.com/organization-settings/application-keys
[10]: https://github.com/DataDog/oracle-cloud-integration/tree/master/oci-integration-cleanup#readme
[11]: https://github.com/DataDog/oracle-cloud-integration