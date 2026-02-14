---
title: Source Code Integration
description: "Set up the source code integration that integrates with APM to link your telemetry with your repositories, embed Git information into artifacts in your CI pipeline, and use source code management integrations to generate inline code snippets across Datadog."
aliases:
  - /integrations/guide/source-code-integration/
---

## Overview

Datadog's Source Code Integration allows you to connect your Git repositories to Datadog to enable various source code-related features across the Datadog platform. It allows debugging stack traces, slow profiles, and other issues by accessing the relevant lines of your source code.

{{< img src="integrations/guide/source_code_integration/inline-code-snippet.png" alt="Inline code snippet of a Java RuntimeException with a button to view the code in GitHub" style="width:100%;">}}

## Setup and Features

{{< whatsnext desc="For setup and features of source code integration, see the following pages:" >}}
    {{< nextlink href="source_code/source-code-management" >}}Source Code Management provider integrations{{< /nextlink >}}
    {{< nextlink href="source_code/service-tagging" >}}Service mapping configuration{{< /nextlink >}}
    {{< nextlink href="source_code/resource-mapping" >}}Kubernetes resource mapping{{< /nextlink >}}
    {{< nextlink href="source_code/features" >}}Features of source code integration{{< /nextlink >}}
{{< /whatsnext >}}
