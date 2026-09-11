---
title: Embed Git Information in Build Artifacts
description: Manually tag telemetry with Git information for languages that lack native support.
type: multi-code-lang
code_lang: other
code_lang_weight: 70
---

## Overview

If the language your service is written in is not [supported natively][2] section, use this page to manually tag your telemetry with Git information by setting environment variables.

## Prerequisites

- [Datadog Agent][1] v7.35.0 or later is required.

## Tag telemetry by setting environment variables

Set the `DD_GIT_COMMIT_SHA` and `DD_GIT_REPOSITORY_URL` environment variables on your application's deployment:

```shell
export DD_GIT_COMMIT_SHA="<commitSha>"
export DD_GIT_REPOSITORY_URL="<git-provider.example/me/my-repo>"
```

Replace `<commitSha>` with the commit SHA used to build your application. You can retrieve this by running `git rev-parse HEAD` at build time, and it needs to be passed into the runtime environment variables. Replace `<git-provider.example/me/my-repo>` with your repository URL.

These environment variables add `git.commit.sha` and `git.repository_url` tags to your APM spans, linking your service to a specific commit in your source code repository.

[1]: /agent/
[2]: /source_code/service-mapping/#embed-git-information-in-your-build-artifacts
