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
products:
  - name: Cloud Security Vulnerabilities
    url: /security/cloud_security_management/vulnerabilities/
    icon: cloud-security-management
---

{{< product-availability >}}

## Overview

When Datadog detects a vulnerability on a running container image, it can trace the vulnerability back to the repository and Dockerfile that built the image. To make this link, Datadog reads image source labels from the image metadata.

With image source labels in place, Datadog can:
- Display a preview of the Dockerfile in the Container Image Vulnerabilities panel
- Enable source-based remediation, so you can fix issues in the file that introduced them

Datadog reads image source labels for images scanned by [Agentless Scanning][1] and by the [Datadog Security CLI][2] in CI/CD.

## Image source labels

Datadog uses the following labels:

| Label | Value | Example |
|-------|-------|---------|
| `org.opencontainers.image.source` | The repository URL | `https://github.com/org/repo` |
| `com.datadoghq.image.source_path` | The path to the Dockerfile, relative to the repository root | `docker/api/Dockerfile` |

`org.opencontainers.image.source` is a standard [OCI image annotation][3]. `com.datadoghq.image.source_path` is specific to Datadog, because the OCI specification doesn't define a field for the Dockerfile that built an image.

The following labels are also supported:

- `org.opencontainers.image.revision` (recommended): The commit SHA used to build the image. This pins the Dockerfile link to the commit that built the image. Without it, Datadog links to the Dockerfile on the repository's default branch.
- `org.opencontainers.image.base.name` (optional): The base image name, for example `ubuntu:22.04`. Improves base image remediation suggestions.
- `org.opencontainers.image.base.digest` (optional): The base image digest.

Keep the following in mind:
- Set labels in the **final build stage** of a multi-stage Dockerfile. Labels set in earlier stages are not part of the final image.
- Labels are inherited from base images. Labels you set in your Dockerfile override inherited values.
- The file name in `com.datadoghq.image.source_path` must be a Dockerfile or Containerfile name, such as `Dockerfile`, `Dockerfile.prod`, `api.Dockerfile`, or `Containerfile`.
- Datadog builds Dockerfile links for repositories hosted on GitHub, GitLab, Bitbucket, and Azure DevOps.

## Choose a method

| Method | Best for |
|--------|----------|
| [Datadog pull requests](#add-labels-with-datadog-pull-requests) | GitHub repositories. Datadog finds your Dockerfiles and opens pull requests that add the labels. No CI/CD changes required. |
| [Build-time labels or annotations](#add-labels-at-build-time) | Any Git provider. Set the labels in your Dockerfile or build command, including the commit revision. |

You can combine both methods. For example, merge Datadog pull requests to add the source labels, then add `org.opencontainers.image.revision` in your CI build.

## Add labels with Datadog pull requests

<div class="alert alert-info">Adding labels with Datadog pull requests is in Preview.</div>

Datadog can scan your GitHub repositories for Dockerfiles and open pull requests that add the image source labels.

### Prerequisites

- The [GitHub integration][4] is set up, and the Datadog GitHub App is installed on the repositories that contain your Dockerfiles. The GitHub App needs the following repository permissions:
  - **Contents**: Read & write
  - **Pull Requests**: Read & write
- Your GitHub user account is connected to Datadog and has write access to the repositories. Datadog opens pull requests on your behalf.
- Your Datadog role has the following permissions:
  - `security_monitoring_findings_write`, to turn on Dockerfile scanning
  - `appsec_vm_write`, to create pull requests

### Create pull requests

1. On the [Cloud Security Setup page][5], find your GitHub account and turn on {{< ui >}}Dockerfile scanning{{< /ui >}}.

   Datadog scans the default branch of each repository for files named `Dockerfile`, `Dockerfile.*`, `*.Dockerfile`, `*.dockerfile`, and `Containerfile`. Datadog rescans when a push to the default branch changes one of these files.
1. Click {{< ui >}}Select Dockerfiles{{< /ui >}}. A side panel lists your Dockerfiles, grouped by repository, with one of the following statuses:
   - {{< ui >}}Need label{{< /ui >}}: The Dockerfile is missing one or both image source labels.
   - {{< ui >}}In progress{{< /ui >}}: A Datadog pull request for the Dockerfile is open.
   - {{< ui >}}Labeled{{< /ui >}}: The final build stage has both image source labels.

   To find specific Dockerfiles, search or filter by repository or status.
1. Select the Dockerfiles to label, create the pull requests, and confirm. Datadog opens one pull request per repository, with up to 20 Dockerfiles per pull request and up to 10 pull requests per submission.
1. Review and merge the pull requests in GitHub, then rebuild and redeploy your images. Datadog links vulnerabilities to Dockerfiles for images built after the merge.

### What the pull request changes

Each pull request targets the repository's default branch and is titled `Add image source labels to <path>`, or `Add image source labels to <N> Dockerfiles` when it covers more than one file.

Datadog edits only the final build stage of each Dockerfile:
- If a label is missing, Datadog adds it after the last `LABEL` instruction in the stage, or after the `FROM` instruction if the stage has no labels.
- If a label has an outdated value, Datadog updates it in place.
- If a label value comes from a build variable, such as `$REPO`, Datadog leaves it unchanged.
- Dockerfiles that already have both labels with the correct values are skipped.

The rest of the file is unchanged. For example, for a Dockerfile at `docker/api/Dockerfile` in `https://github.com/org/repo`:

**Before**:

```dockerfile
FROM golang:1.22 AS build
WORKDIR /src
COPY . .
RUN go build -o /app ./cmd/api

FROM gcr.io/distroless/base-debian12
COPY --from=build /app /app
ENTRYPOINT ["/app"]
```

**After**:

```dockerfile
FROM golang:1.22 AS build
WORKDIR /src
COPY . .
RUN go build -o /app ./cmd/api

FROM gcr.io/distroless/base-debian12
# Image source labels, added by Datadog.
LABEL org.opencontainers.image.source="https://github.com/org/repo"
LABEL com.datadoghq.image.source_path="docker/api/Dockerfile"
COPY --from=build /app /app
ENTRYPOINT ["/app"]
```

## Add labels at build time

You can set the labels yourself with any Git provider.

### In the Dockerfile

Add `LABEL` instructions to the final build stage:

```dockerfile
FROM gcr.io/distroless/base-debian12
LABEL org.opencontainers.image.source="https://github.com/org/repo"
LABEL com.datadoghq.image.source_path="docker/api/Dockerfile"
```

### In the build command

Pass labels with `docker build --label`. To add the commit revision, use `git rev-parse HEAD`:

```bash
docker build \
  --label org.opencontainers.image.source="https://github.com/org/repo" \
  --label org.opencontainers.image.revision="$(git rev-parse HEAD)" \
  --label com.datadoghq.image.source_path="docker/api/Dockerfile" \
  -t myapp:latest .
```

If you scan images with the Datadog Security CLI, you can also use OCI annotations, which the CLI reads:

```bash
docker build \
  --annotation org.opencontainers.image.source="https://github.com/org/repo" \
  --annotation org.opencontainers.image.revision="$(git rev-parse HEAD)" \
  --annotation com.datadoghq.image.source_path="docker/api/Dockerfile" \
  -t myapp:latest .
```

The Datadog Security CLI can also add this metadata at scan time with the `--dockerfile` flag. See [Link Dockerfile to vulnerabilities][6].

## Verify labels

- On the [Cloud Security Setup page][5], click {{< ui >}}Select Dockerfiles{{< /ui >}} and check the status. {{< ui >}}Labeled{{< /ui >}} means both labels are present in the final build stage. It doesn't check that the values are correct.
- Inspect a built image:

  ```bash
  docker inspect --format '{{ json .Config.Labels }}' myapp:latest
  ```
- After the next scan of the image, open a vulnerability on the image in [Cloud Security Vulnerabilities][7]. The side panel shows a preview of the Dockerfile.

## Customize labels

- **Move or edit the labels**: You can move the added lines anywhere in the final build stage, or edit them to match your conventions.
- **Use build variables**: Set label values from an `ARG`, for example `LABEL org.opencontainers.image.source="$REPO_URL"`. Datadog pull requests don't change labels whose values come from build variables.
- **Override at build time**: Labels passed with `docker build --label` override labels set in the Dockerfile.
- **Monorepos**: Give each Dockerfile its own `com.datadoghq.image.source_path` value, relative to the repository root.
- **Pin to a commit**: Add `org.opencontainers.image.revision` in your CI build, as shown in [In the build command](#in-the-build-command).

## Troubleshooting

### Pull request creation fails

- Reconnect your GitHub user account to Datadog, and confirm that it has write access to the repository.
- Confirm that the Datadog GitHub App is installed on the repository and has the **Contents** and **Pull Requests** permissions set to Read & write.

### A Dockerfile can't be labeled

Datadog can't open a pull request for a Dockerfile that:
- Can't be parsed
- Declares a `# syntax=` frontend other than `docker/dockerfile`
- Is larger than 512 KiB

Add the labels to these files manually. See [Add labels at build time](#add-labels-at-build-time).

### No Dockerfile link appears for a vulnerability

- Rebuild and redeploy the image after you add the labels.
- Confirm that the labels are in the final build stage. Use `docker inspect` to check the built image.
- Confirm that the file name in `com.datadoghq.image.source_path` is a Dockerfile or Containerfile name.
- Confirm that the repository is hosted on GitHub, GitLab, Bitbucket, or Azure DevOps.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless_scanning
[2]: /security/cloud_security_management/setup/ci_cd
[3]: https://specs.opencontainers.org/image-spec/annotations/
[4]: /integrations/github/
[5]: https://app.datadoghq.com/security/configuration/csm/setup
[6]: /security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities
[7]: https://app.datadoghq.com/security/csm/vm
