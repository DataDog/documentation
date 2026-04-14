The [Datadog Terraform module for Google Cloud Run][1001] wraps the [`google_cloud_run_v2_service`][1002] resource and automatically configures your Cloud Run app for Datadog Serverless Monitoring by adding required environment variables and the serverless-init sidecar.

If you don't already have Terraform set up, [install Terraform][1003], create a new directory, and make a file called `main.tf`.

Then, add the following to your Terraform configuration, updating it as necessary based on your needs:

```tf
variable "datadog_api_key" {
  description = "Your Datadog API key"
  type        = string
  sensitive   = true
}

module "my-cloud-run-app" {
  source  = "DataDog/cloud-run-datadog/google"
  version = "~> 1.0"

  project  = "my-gcp-project"
  name     = "my-cloud-run-app"
  location = "us-central1"

  datadog_api_key = var.datadog_api_key
  datadog_service = "test-service" // your application service
  datadog_version = "0.0.0" // your code version
  datadog_env     = "prod" // your application environment
  
  datadog_enable_logging = true

  deletion_protection = false
  {{ if eq (.Get "function") "true" }}build_config = {
    function_target          = "helloHttp" // your function entry point
    image_uri                = "us-docker.pkg.dev/cloudrun/container/hello"
    base_image               = "us-central1-docker.pkg.dev/serverless-runtimes/google-22-full/runtimes/your-runtime" // base image for your runtime
    enable_automatic_updates = true
  }{{ end }}
  template = {
    containers = [
      {
        name  = "main"
        image = "us-docker.pkg.dev/cloudrun/container/hello"
        {{ if eq (.Get "function") "true" }}base_image_uri = "us-central1-docker.pkg.dev/serverless-runtimes/google-22-full/runtimes/your-runtime" // base image for your runtime{{ end }}
        resources = {
          limits = {
            cpu    = "1"
            memory = "512Mi"
          }
        }
        ports = {
          container_port = 8080
        }
        env = [
          { name = "DD_TRACE_ENABLED", value = "true" },
        ]
      },
    ]
  }
}
```

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

[1001]: https://github.com/DataDog/terraform-google-cloud-run-datadog
[1002]: https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service
[1003]: https://developer.hashicorp.com/terraform/install
