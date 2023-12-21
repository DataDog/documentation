---
title: GitHub Source Code Management
kind: documentation
description: Feature overview and setup instructions for GitHub Source Code Management using Static Analysis.
---

## Feature overview

Static Analysis can automatically flag rule violations in pull requests on GitHub. To configure the GitHub integration to include Static Analysis features, see [the setup instructions](#set-up-static-analysis-on-github).

During code reviews on GitHub, the source code management (SCM) integration checks for Static Analysis violations in pull requests for repos that have at least one ruleset applied. Violations are flagged with a comment on the relevant line of code. 

The comment includes the name, ID, severity, and description of the violation. Certain violations also include suggested changes that can be applied directly in the GitHub UI.

## Set up Static Analysis for GitHub source code

### Enable Static Analysis

To use Datadog Static Analysis, add the appropriate configuration file to your repository, as described in the [Static Analysis setup instructions][1].

### Create or update your GitHub application

TODO

- Check **Static Analysis: Pull request review comments**
- Enable read/write permission for pull requests

### Configure pull request comments

TODO

[1]: /static_analysis#setup

