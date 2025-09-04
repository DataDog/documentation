---
title: Migrate Your Feature Flags from Statsig
---

## Overview

This guide walks you through the process of migrating feature flags from Statsig to Datadog.

## Steps

1. Install the SDK.
2. Create a feature flag in Datadog and verify its functionality.
3. Identify critical feature flags in Statsig.
4. For all non-critical flags, remove existing code.
5. For critical flags, create a fallback value in a wrapper.
6. Recreate critical feature flags in Datadog.
7. Switch existing flags to the new application.
