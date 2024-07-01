---
"categories":
- automation
- cloud
- configuration & deployment
- developer tools
- metrics
"custom_kind": "integration"
"dependencies": []
"description": "Connect to Travis CI to view metrics about build times, build statuses, jobs, and more."
"doc_link": "https://docs.datadoghq.com/integrations/travis_ci/"
"draft": false
"git_integration_title": "travis_ci"
"has_logo": true
"integration_id": ""
"integration_title": "Travis CI"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "travis_ci"
"public_title": "Datadog-Travis CI Integration"
"short_description": "Connect to Travis CI to view metrics about build times and build statuses."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Travis CI is a hosted continuous integration service used to build and test software projects. Connect to Travis CI to view metrics about build times, build statuses, jobs, and more.

## Setup

### Installation

You can install the Travis CI integration with its [integration tile][1].

### Configuration

1. Add your account name, API token (found under the profile tab in Travis CI), and the project type. Project types are determined as follows:

    - _Open source_ refers to repositories connected to travis-ci.org
    - _Private_ refers to repositories connected to travis-ci.co
    - _Enterprise_ refers to repositories connected to a custom Travis CI domain

2. If the account is under Travis CI enterprise, enter your custom domain.
3. Add multiple accounts if needed by clicking "Add row".
4. Click 'Install' (initial installation only).
5. Add the organization and repositories you want to collect metrics from with the corresponding API key.
6. To collect metrics for all repositories under an organization, type `<ORGANIZATION_NAME>/*` under Project.
7. Click 'Update Configuration'.

## Data Collected

### Metrics
{{< get-metrics-from-git "travis_ci" >}}


### Events

The Travis CI integration does not include any events.

### Service Checks

The Travis CI integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://app.datadoghq.com/integrations/travis_ci
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/travis_ci/travis_ci_metadata.csv
[3]: https://docs.datadoghq.com/help/

