---
aliases:
- /continuous_integration/static_analysis/circleci_orbs
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-circleci-orb/blob/main/README.md
description: Use Datadog and CircleCI to run Static Analysis jobs in a CI pipeline.
kind: documentation
title: Static Analysis and CircleCI Orbs
---
[![CircleCI Build Status](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/DataDog/datadog-static-analyzer-circleci-orb.svg)](https://circleci.com/developer/orbs/orb/DataDog/datadog-static-analyzer-circleci-orb) [![GitHub License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/DataDog/datadog-static-analyzer-circleci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)


Run a Datadog Static Analysis in your CircleCI workflows.

## Requirements

To use the Datadog static analyzer, you need to add a `static-analysis.datadog.yml` file to your repositories root directory that specifies what rulesets to use.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

#### Example for Python

You can see an example for repositories based on Python:

```yaml
rulesets:
  - python-security
  - python-code-style
  - python-best-practices
```

## Workflow

Create a file in `.circleci` to run a Datadog static analysis.

Here's a sample workflow file.

```yaml
version: 2.1
orbs:
  datadog-static-analysis: datadog/datadog-static-analyzer-circleci-orb@1.0.0
jobs:
  run-static-analysis-job:
    docker:
      - image: cimg/node:current
    steps:
      - checkout
      - datadog-static-analysis/analyze:
          service: my-service
workflows:
  main:
    jobs:
      - run-static-analysis-job
```

## Environment Variables

These environment variables should be set in the [CircleCI Project Settings](https://circleci.com/docs/set-environment-variable/#set-an-environment-variable-in-a-project) page.

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization](https://docs.datadoghq.com/account_management/api-app-keys/#api-keys) and should be stored as a secret.                   | True     |                 |
| `DD_APP_KEY` | Your Datadog Application key. This key is created by your [Datadog organization](https://docs.datadoghq.com/account_management/api-app-keys/) and should be stored as a secret.  | True     |                 |

## Inputs

To customize your workflow, you can set the following parameters for an analysis.

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | The service you want your results tagged with.                                                                             | True     |                 |
| `env`     | The environment you want your results tagged with.                                                                         | False    | `none`          |
| `site`    | The [Datadog site](https://docs.datadoghq.com/getting_started/site/)                                                       | False    | `datadoghq.com` |

## Resources

[CircleCI Orb Registry Page](https://circleci.com/developer/orbs/orb/DataDog/datadog-static-analyzer-circleci-orb) - The official registry page of this orb for all versions, executors, commands, and jobs described.

[CircleCI Orb Docs](https://circleci.com/docs/orb-intro/#section=configuration) - Docs for using, creating, and publishing CircleCI Orbs.

### How to Contribute

We welcome [issues](https://github.com/DataDog/datadog-static-analyzer-circleci-orb/issues) to and [pull requests](https://github.com/DataDog/datadog-static-analyzer-circleci-orb/pulls) against this repository!

### How to Publish An Update
1. Merge pull requests with desired changes to the main branch.
    - For the best experience, squash-and-merge and use [Conventional Commit Messages](https://conventionalcommits.org/).
2. Find the current version of the orb.
    - You can run `circleci orb info DataDog/datadog-static-analyzer-circleci-orb | grep "Latest"` to see the current version.
3. Create a [new Release](https://github.com/DataDog/datadog-static-analyzer-circleci-orb/releases/new) on GitHub.
    - Click "Choose a tag" and _create_ a new [semantically versioned](http://semver.org/) tag. (ex: v1.0.0)
      - We will have an opportunity to change this before we publish if needed after the next step.
4.  Click _"+ Auto-generate release notes"_.
    - This will create a summary of all of the merged pull requests since the previous release.
    - If you have used _[Conventional Commit Messages](https://conventionalcommits.org/)_ it will be easy to determine what types of changes were made, allowing you to ensure the correct version tag is being published.
5. Now ensure the version tag selected is semantically accurate based on the changes included.
6. Click _"Publish Release"_.
    - This will push a new tag and trigger your publishing pipeline on CircleCI.
