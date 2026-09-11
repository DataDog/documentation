<!--
Shared serverless-init image reference (registries + tag conventions).
No content_filters required.
-->

Datadog publishes new releases of the `serverless-init` container image to Google Container Registry, Amazon ECR Public Gallery, and Docker Hub:

| hub.docker.com | gcr.io | public.ecr.aws |
| ---- | ---- | ---- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

Images are tagged based on semantic versioning, with each new version receiving three relevant tags:

- `1`, `1-alpine`: use these to track the latest minor releases, without breaking changes
- `1.x.x`, `1.x.x-alpine`: use these to pin to a precise version of the library
- `latest`, `latest-alpine`: use these to follow the latest version release, which may include breaking changes
