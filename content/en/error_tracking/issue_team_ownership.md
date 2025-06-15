---
title: Issue Team Ownership
description: Learn about Issue Team Ownership in Error Tracking.
---

# Issue Team Ownership

## Overview
Issue Team Ownership helps teams quickly identify which issues are relevant to them by automatically assigning issues linking error stack traces to Git `CODEOWNERS` files. This feature streamlines issue resolution by linking errors to the appropriate teams, making it easier to find problems caused by your team's code.

## Getting Started
To enable Issue Team Ownership, follow these steps:

1. **Set Up Source Code Integration**
   - Ensure SCI is enabled and connected to a supported Git provider (e.g., GitHub).

    *Note : Issue Team Ownership currently only supports GitHub*

1. **Ensure Your Repository Contains a `CODEOWNERS` File**
   - A valid `CODEOWNERS` file should be placed in one of the following locations in your repository:
     - `.github/`
     - Root directory (`/`)
     - `docs/`

      *Note: This file defines ownership of files and directories in your codebase.*

2. **Link Your GitHub Teams to Datadog Teams**
   - In the Datadog **Teams** menu, map your Datadog teams to the corresponding GitHub teams.

Once configured, issues will automatically be attributed to the relevant teams based on the stack traces and the `CODEOWNERS` file.

## Benefits
- **Faster Issue Resolution**: Quickly determine which team is responsible for an issue.
- **Better Visibility**: Teams can easily see which issues belong to them.
- **Improved Collaboration**: Streamlines communication between engineering teams by providing clear ownership of problems.

## Managing Team Ownership
- You can view which team owns an issue directly within Datadog.
- Ownership information is derived from the `CODEOWNERS` file, ensuring accuracy and consistency.