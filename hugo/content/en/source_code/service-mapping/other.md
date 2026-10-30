---
title: Embed Git Information in Build Artifacts
description: Manually tag telemetry with Git information for languages that lack native support.
type: multi-code-lang
code_lang: other
code_lang_weight: 70
---

## Overview

For a language without [native source code integration support][2], check the SDK's configuration before adding Git tags. `DD_GIT_COMMIT_SHA` and `DD_GIT_REPOSITORY_URL` are not supported by every SDK.

## C++: tag telemetry

The Datadog C++ SDK supports global tags through `DD_TAGS`:

```shell
export DD_TAGS="git.commit.sha:<commitSha>,git.repository_url:<repositoryUrl>"
```

Append these entries to any existing `DD_TAGS` value. Replace `<commitSha>` with the commit SHA used to build the deployed application and `<repositoryUrl>` with its repository URL. Retrieve the SHA with `git rev-parse HEAD` during the build and pass it to the runtime environment.

These settings attach tags to spans. They do not enable native source code integration support or guarantee that all source code features are available for C++.

## Other languages

Use the SDK's documented global-tag or span-tag API to attach `git.commit.sha` and `git.repository_url`. Use `DD_GIT_*` variables only if that library explicitly supports them.

[2]: /source_code/service-mapping/#embed-git-information-in-your-build-artifacts
