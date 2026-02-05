By default, the Agent image is pulled from the Datadog Container Registry (`registry.datadoghq.com`). This registry requires no additional setup and has very high rate limits. If you use this registry, also allowlist `us-docker.pkg.dev/datadog-prod/public-images` for failover.

Datadog also publishes images on cloud-provider registries:
- AWS deployments: `public.ecr.aws/datadog`
- GCP deployments: `gcr.io/datadoghq`, `eu.gcr.io/datadoghq`, or `asia.gcr.io/datadoghq`
- Azure deployments: `datadoghq.azurecr.io`

<div class="alert alert-warning">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you use the Datadog Container Registry or a cloud-provider registry instead. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

