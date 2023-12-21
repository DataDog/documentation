---
title: GitHub Source Code Management
kind: documentation
description: Feature overview and setup instructions for GitHub Source Code Management using Static Analysis.
---

## Feature overview

Static Analysis can automatically flag rule violations in pull requests on GitHub. To configure the GitHub integration to include Static Analysis features, see [the setup instructions](#set-up-static-analysis-on-github).

During code reviews on GitHub, the source code management (SCM) integration checks for Static Analysis violations in pull requests for repos that have at least one ruleset applied. Violations are flagged with a comment on the relevant line of code. 

The comment includes the name, ID, severity, and description of the violation. Certain violations also include suggested changes that can be applied directly in the GitHub UI.

## Set up Static Analysis on GitHub

