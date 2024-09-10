---
title: Importing Datadog Resources into Terraform
aliases:
  - /integrations/faq/how-to-import-datadog-resources-into-terraform
  - /agent/guide/how-to-import-datadog-resources-into-terraform
---

## Overview

Terraform supports an out-of-the-box way to import existing resources into your terraform state via the [`terraform import`][1] command.
This can be done via the `terraform import <resource_type>.<resource_name> <existing_id>`.

This approach is `state only` and requires already having the HCL resource fully defined in your terraform configuration files. To import the configuration fully, you can use a tool like Terraformer.

## Terraformer

The [terraformer project][2] allows you to import a resource as both state and HCL configuration.

Once installed, you can setup a terraform directory with a basic `main.tf`

This uses terraform 0.13+ syntax, but you can find more configurations on the [official datadog provider docs][3]

```hcl
# main.tf

terraform {
  required_providers {
    datadog = {
      source  = "DataDog/datadog"
    }
  }
}

# Configure the Datadog provider
provider "datadog" {}
```

Then run `terraform init` from within this directory to pull the datadog terraform provider.

Now you can use `terraformer` to start importing resources. For example, to import Dashboard `abc-def-ghi` you can run

`terraformer import datadog --resources=dashboard --filter=dashboard=abc-def-ghi --api-key <YOUR_API_KEY> --app-key <YOUR_APP_KEY> --api-url <YOUR_DATADOG_SITE_URL>`

This generates a folder `generated` that contains both a terraform state file, as well as HCL terraform config files representing the imported resource.

```
generated
└── datadog
    └── dashboard
        ├── dashboard.tf
        ├── outputs.tf
        ├── provider.tf
        └── terraform.tfstate
```

* `dashboard.tf`: The HCL configuration file for the newly imported dashboard
* `outputs.tf`: An HCL containing outputs to use potentially in other configurations
* `provider.tf`: An HCL initialization of the provider, similar to whats in our `main.tf` file
* `terraform.tfstate`: The terraform state representing the imported dashboard

## Other examples of running terraformer

All example commands require the `--api-key`, `--app-key`, and `--api-url` flags.

* Import all monitors: `terraformer import datadog --resources=monitor`
* Import monitor with id 1234: `terraformer import datadog --resources=monitor --filter=monitor=1234`
* Import monitors with id 1234 and 12345: `terraformer import datadog --resources=monitor --filter=monitor=1234:12345`
* Import all monitors and dashboards: `terraformer import datadog --resources=monitor,dashboard`
* Import monitor with id 1234 and dashboard with id abc-def-ghi: `terraformer import datadog --resources=monitor,dashboard --filter=monitor=1234,dashboard=abc-def-ghi`

## Generating resources with Terraform v0.13+

As of version `0.8.10`, Terraformer generates `tf`/`json` and `tfstate` files using Terraform `v0.12.29`. To ensure compatibility, run the upgrade command `terraform 0.13upgrade .` using Terraform `v0.13.x`. See [official Terraform docs][4] for upgrading.

##### Upgrading the generated files for Terraform v0.13+:

1. Import resource using terraformer.

2. Using Terraform `v0.13.x`, `cd` into the generated resource directory and run `terraform 0.13upgrade .`.

3. Run `terraform init` to re-run the provider installer.

4. Run `terraform apply` to apply upgrades to Terraform state files.

[1]: https://www.terraform.io/docs/import/index.html
[2]: https://github.com/GoogleCloudPlatform/terraformer
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[4]: https://www.terraform.io/upgrade-guides/0-13.html
