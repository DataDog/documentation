---
aliases:
- /fr/integrations/faq/how-to-import-datadog-resources-into-terraform
- /fr/agent/guide/how-to-import-datadog-resources-into-terraform
kind: documentation
title: Importation des ressources Datadog dans Terraform
---

## Présentation

Terraform propose une méthode prête à l'emploi pour importer des ressources existantes dans votre état terraform via la commande [`terraform import`][1].
Cela peut se faire via `terraform import <resource_type>.<resource_name> <existing_id>`.

Cette approche est `state only` et nécessite que la ressource HCL soit déjà entièrement définie dans vos fichiers de configuration terraform. Pour importer complètement la configuration, vous pouvez utiliser un outil comme Terraformer.

## Terraformer

Le [projet terraformer][2] vous permet d'importer une ressource sous forme d'état et de configuration HCL.

Une fois installé, vous pouvez configurer un répertoire terraform avec un simple `main.tf`

Ceci utilise la syntaxe de terraform 0.13+, mais vous pouvez trouver d'autres configurations sur la [documentation officielle du fournisseur Datadog][3]

```hcl
# main.tf

terraform {
  required_providers {
    datadog = {
      source  = "DataDog/datadog"
    }
  }
}

# Configurer le fournisseur Datadog
provider "datadog" {}
```

Exécutez ensuite `terraform init` à partir de ce répertoire pour obtenir le fournisseur terraform Datadog.

Vous pouvez maintenant utiliser `terraformer` pour commencer à importer des ressources. Par exemple, pour importer le dashboard `abc-def-ghi` , vous pouvez exécuter la commande suivante

`terraformer import datadog --resources=dashboard --filter=dashboard=abc-def-ghi --api-key <YOUR_API_KEY> --app-key <YOUR_APP_KEY> --api-url <YOUR_DATADOG_SITE_URL>`

Cela génère un dossier `generated` qui contient à la fois un fichier d'état terraform et des fichiers de configuration terraform HCL représentant la ressource importée.

```
generated
└── datadog
    └── dashboard
        ├── dashboard.tf
        ├── outputs.tf
        ├── provider.tf
        └── terraform.tfstate
```

* `dashboard.tf` : Le fichier de configuration HCL pour le dashboard nouvellement importé
* `outputs.tf` : Un HCL contenant des sorties à utiliser potentiellement dans d'autres configurations
* `provider.tf` : Une initialisation HCL du fournisseur, similaire à ce qui se trouve dans notre fichier `main.tf`
* `terraform.tfstate` : L'état terraform représentant le dashboard importé

## Autres exemples de terraformer en cours dʼexécution

Tous les exemples de commandes requièrent les drapeaux `--api-key`, `--app-key`, and `--api-url`.

* Importer tous les monitors : `terraformer import datadog --resources=monitor`
* Importer un monitor avec l'identifiant 1234 : `terraformer import datadog --resources=monitor --filter=monitor=1234`
* Importer des monitors avec l'identifiant 1234 et 12345 : `terraformer import datadog --resources=monitor --filter=monitor=1234:12345`
* Importer tous les monitors et dashboards : `terraformer import datadog --resources=monitor,dashboard`
* Importer un monitor avec l'identifiant 1234 et un dashboard avec l'identifiant abc-def-ghi : `terraformer import datadog --resources=monitor,dashboard --filter=monitor=1234,dashboard=abc-def-ghi`

## Générer des ressources avec Terraform v0.13+

À partir de la version `0.8.10`, Terraformer génère les fichiers `tf`/`json` et `tfstate` à l'aide de Terraform `v0.12.29`. Pour assurer la compatibilité, exécutez la commande de mise à niveau `terraform 0.13upgrade .` en utilisant Terraform `v0.13.x`. Consultez [la documentation officielle de Terraform][4] relative à la mise à niveau.

##### Mettre à niveau des fichiers générés pour Terraform v0.13+ :

1. Importer une ressource à l'aide de terraformer.

2. En utilisant Terraform `v0.13.x`, `cd` dans le répertoire de ressources généré et exécutez `terraform 0.13upgrade .`.

3. Exécutez `terraform init` pour réexécuter le programme d'installation du fournisseur.

4. Exécutez `terraform apply` pour appliquer les mises à jour aux fichiers d'état Terraform.

[1]: https://www.terraform.io/docs/import/index.html
[2]: https://github.com/GoogleCloudPlatform/terraformer
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[4]: https://www.terraform.io/upgrade-guides/0-13.html