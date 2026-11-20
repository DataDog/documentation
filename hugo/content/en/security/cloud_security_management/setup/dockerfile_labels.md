---
title: Link Container Images to Dockerfiles
description: Add image source labels to your Dockerfiles so Datadog can trace container image vulnerabilities back to the repository and Dockerfile that built the image.
further_reading:
- link: "/security/cloud_security_management/vulnerabilities"
  tag: "Documentation"
  text: "Cloud Security Vulnerabilities"
- link: "/security/cloud_security_management/setup/ci_cd"
  tag: "Documentation"
  text: "Container Image Scanning in CI/CD"
- link: "/integrations/guide/source-code-integration"
  tag: "Documentation"
  text: "Datadog Source Code Integration"
- link: "/integrations/github/"
  tag: "Documentation"
  text: "GitHub integration"
---

## Overview

When Datadog detects a vulnerability on a running container image, it can trace the vulnerability back to the repository and Dockerfile that built the image. To make this link, Datadog reads image source labels from the image metadata.

With image source labels in place, Datadog can:
- Display a preview of the Dockerfile in the Container Image Vulnerabilities panel
- Enable source-based remediation, so you can fix issues in the file that introduced them

## Image source labels

Datadog uses the following labels:

| Label | Value | Example |
|-------|-------|---------|
| `org.opencontainers.image.source` | The repository URL | `https://github.com/org/repo` |
| `com.datadoghq.image.source_path` | The path to the Dockerfile, relative to the repository root | `docker/api/Dockerfile` |

`org.opencontainers.image.source` is a standard [OCI image annotation][3]. `com.datadoghq.image.source_path` is specific to Datadog because the OCI specification doesn't define a field for the Dockerfile that built an image.

Datadog also supports the following optional labels:

- `org.opencontainers.image.revision` (optional): The commit SHA used to build the image. This pins the Dockerfile link to the commit that built the image. Without it, Datadog links to the Dockerfile on the repository's default branch.
- `org.opencontainers.image.base.name` (optional): The base image name, for example `ubuntu:22.04`. Datadog uses it to improve base image remediation suggestions.
- `org.opencontainers.image.base.digest` (optional): The base image digest.

## Choose a labeling method

| Method | Best for |
|--------|----------|
| [Datadog pull requests](#add-labels-with-datadog-pull-requests) | GitHub repositories. Datadog finds your Dockerfiles and opens pull requests that add the labels. No CI/CD changes required. |
| [Build-time labels](#add-labels-at-build-time) | Any Git provider. Set the labels in your Dockerfile or build command, including the commit revision. |

You can combine both methods. For example, merge Datadog pull requests to add the source labels, then add `org.opencontainers.image.revision` in your CI build.

## Add labels with Datadog pull requests

Datadog can scan your GitHub repositories for Dockerfiles and open pull requests that add the image source labels. Datadog pull requests are available for GitHub repositories only.

### Prerequisites

- The [GitHub integration][4] is set up, and the Datadog GitHub App is installed on the repositories that contain your Dockerfiles. The GitHub App needs the following repository permissions:
  - **Contents**: Read and write
  - **Pull requests**: Read and write
- Your GitHub user account is connected to Datadog and has write access to the repositories. Datadog opens pull requests on your behalf.

### Create Datadog pull requests

1. On the [Cloud Security Setup page][5], find your GitHub account and turn on {{< ui >}}Dockerfile scanning{{< /ui >}}.
1. Click {{< ui >}}Select Dockerfiles{{< /ui >}}. A side panel lists your Dockerfiles, grouped by repository, with one of the following statuses:
   - {{< ui >}}Need label{{< /ui >}}: The Dockerfile is missing one or both image source labels, or a label has an incorrect value.
   - {{< ui >}}In progress{{< /ui >}}: A Datadog pull request for the Dockerfile is open.
   - {{< ui >}}Labeled{{< /ui >}}: The final build stage has both image source labels.

   To find specific Dockerfiles, search for them, or filter by repository or status.
1. Select the Dockerfiles to label, click the button to create the pull requests (for example, {{< ui >}}Create 1 PR{{< /ui >}}), and confirm.
1. Review and merge the pull requests in GitHub. Datadog links vulnerabilities to Dockerfiles for images built after the merge.

<div class="alert alert-info">Datadog groups the selected Dockerfiles by repository and opens pull requests with up to 20 Dockerfiles each. A repository with more than 20 selected Dockerfiles gets more than one pull request. You can select up to 100 Dockerfiles at a time.</div>

## Add labels at build time

You can set the labels yourself with any Git provider.

### Set labels in the Dockerfile

Add `LABEL` instructions to the final build stage:

```dockerfile
FROM gcr.io/distroless/base-debian12
LABEL org.opencontainers.image.source="https://github.com/org/repo"
LABEL com.datadoghq.image.source_path="docker/api/Dockerfile"
```

### Set labels with docker build

Pass labels with `docker build --label`:

```bash
docker build \
  --file docker/api/Dockerfile \
  --label org.opencontainers.image.source="https://github.com/org/repo" \
  --label org.opencontainers.image.revision="$(git rev-parse HEAD)" \
  --label com.datadoghq.image.source_path="docker/api/Dockerfile" \
  -t myapp:latest .
```

The Datadog Security CLI can also add this metadata at scan time with the `--dockerfile` flag. See [Link Dockerfile to vulnerabilities][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://specs.opencontainers.org/image-spec/annotations/
[4]: /integrations/github/
[5]: https://app.datadoghq.com/security/configuration/csm/setup
[6]: /security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities
