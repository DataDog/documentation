The [Datadog Terraform module for Container Apps][1001] wraps the [`azurerm_container_app`][1002] resource and automatically configures your Azure Container App for Datadog Serverless Monitoring by adding required environment variables and the serverless-init sidecar.

If you don't already have Terraform set up, [install Terraform][1003], create a new directory, and make a file called `main.tf`.

Then, add the following to your Terraform configuration, updating it as necessary based on your needs:

```tf
variable "datadog_api_key" {
  description = "Your Datadog API key"
  type        = string
  sensitive   = true
}

provider "azurerm" {
  features {}
  subscription_id = "00000000-0000-0000-0000-000000000000" // Replace with your subscription ID
}

resource "azurerm_container_app_environment" "my_env" {
    name                = "my-container-app-env" // Replace with your container app environment name
    resource_group_name = "my-resource-group"    // Replace with your resource group name
    location            = "eastus"
}

module "my_container_app" {
  source  = "DataDog/container-app-datadog/azurerm"
  version = "~> 1.0"

  name                         = "my-container-app" // Replace with your container app name
  resource_group_name          = "my-resource-group" // Replace with your resource group name
  container_app_environment_id = azurerm_container_app_environment.my_env.id

  datadog_api_key = var.datadog_api_key
  datadog_site    = "datadoghq.com" // Replace with your Datadog site
  datadog_service = "my-service"    // Replace with your service name
  datadog_env     = "dev"           // Replace with your environment (e.g. prod, staging, dev)
  datadog_version = "0.1.0"         // Replace with your application version

  revision_mode         = "Single"
  workload_profile_name = "Consumption"
  ingress = {
    external_enabled = true
    target_port      = 8080
    traffic_weight = [{
      percentage      = 100
      latest_revision = true
    }]
  }
  template = {
    container = [{
      cpu    = 0.5
      memory = "1Gi"
      image  = "docker.io/your-docker-image:latest" // Replace with your Docker image
      name   = "main"
    }]
  }
}
```

Finally, run `terraform apply`, and follow any prompts.

The [Datadog Container App module][1001] only deploys the Container App resource, so you need to build and push your container separately.

See the [Environment Variables](#environment-variables) for more information on the configuration options available through the `env`.

Ensure the container port for the main container is the same as the one exposed in your Dockerfile/service.


If you haven't already, initialize your Terraform project:
```shell
terraform init
```

To deploy your app, run:
```shell
terraform apply
```

[1001]: https://registry.terraform.io/modules/DataDog/container-app-datadog/azurerm/latest
[1002]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_app
[1003]: https://developer.hashicorp.com/terraform/install
