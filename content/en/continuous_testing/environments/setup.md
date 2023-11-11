---
title: Setup
kind: documentation
description: Learn how to set up Continuous Testing on a local or remote environment.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Continuous Testing tests into your CI/CD pipeline"
- link: "https://www.datadoghq.com/blog/internal-application-testing-with-datadog/"
  tag: "Blog"
  text: "Test internal applications with Datadog's testing tunnel and private locations"
---

## Overview

The main determinent factor to decide how to setup Continous Testing, is which environment you want to test, and how accessible this environment is, from the outside web, or from your local or private network.

Datadog Continuous Testing supports a wide variety of environments and setups, and allows to run Synthetic tests in your local development enviornment, in isolated environments which might be called staging, preprod or other names. And it also supports ephemeral environments that are typically spawn and tear down as part of the CI pipeline.

It supports testing in all the stages of the development cycle.

TODO schema of the development cycle, with local dev env to the left, ephemeral CI env in the middle and private dev env to the right.

This is the overall process of setting up Continuous Testing for your local, ephemeral or private environments.
It's orthogonal and complimentary to the [CI/CD integrations guide](https://docs.datadoghq.com/continuous_testing/cicd_integrations), which would help you setup Datadog Continuous Testing within the well-known CI/CD providers.

### Local Environment

What we call a local environement is your typical developer laptop. You have a physical access to it, and you can run any command on it, spawning a local development server or a [Private Location](https://docs.datadoghq.com/getting_started/synthetics/private_location/), but it most likely cannot be accessed from outside its local network.

TODO schema local dev env + PL / ML

During your development cycle, you probably use a local server to iterate quickly on the changes you introduce. Similarly to unit tests that can be run locally, Synthetics Continous Testing can be run locally.
There are two solutions to run Synthetics test locally, either installing a Private Location locally, or setting up the tunnel (Local environment testing) to let the Managed Location access you local development environment.

#### Local Private Location

Setting up a private location will allow you to run all the Synthetics tests defined for your application against a local server running on your development environement. You'll need to setup a Private Location, install a Datadog CI client, and configure it to:
- run tests on your local Private Location,
- against your local developement environement.

##### Setting up a Private Location

Follow the guide to [setup a Private Location](https://docs.datadoghq.com/getting_started/synthetics/private_location/).
Once your private location is setup, and running within your development environment, it'll have access to your local network, including any development server running locally.

##### Installing a Datadog CI client

Follow the guide to [install a Datadog CI client](https://github.com/DataDog/datadog-ci#how-to-install-the-cli).
Once you can call this client, you can run Synthetics tests using this Private Location, against your development server.

For example, after installing it as a dependency in your javascript project, you can launch it with `npm` or `yarn`.
```
yarn datadog-ci synthetics run-tests --public-id <public-id>
```

##### Configure the Datadog CI client to run test on your local Private Location against your local development environment

The critical configurations to let the Synthetics runner know how to reach your local development environment are the `startUrl` and `startUrlSubstitutionRegex`.

###### startUrl

The first one, `startUrl`, allows to overwrite entirely the first url a Browser test nabigates to, or the url used by an HTTP test request. It's a simple option, and might cover most cases.

You can specify this option either through the global configuration file, the synthetics configuration files (`*.synthetics.json`), or through a command line flag.
```
yarn datadog-ci synthetics run-tests --public-id <public-id> --start-url "http://localhost:3000"
```

This option also supports using environment variables to allow picking up the URL from the developement environment that might expose it as environment variable.

###### startUrlSubstitutionRegex

The second one, `startUrlSubstitutionRegex`, allows to substitute parts of the existing test url based on the provided regex.

TODO


#### Local Environement Testing with the Tunnel

See [this guide to setup datadog CI behind a Proxy, a Firewall or a VPN](content/en/continuous_testing/environments/proxy_firewall_vpn.md) to learn how to test your local development environment from Managed Location outside of your private network.

### Ephemeral Environment

What we call an ephemeral environement is any environment that would follow the lifespan of a CI pipeline. Typically, the CI runner would spawn a server from the built artifacts against which to run integration tests.
This server contains the changes your PR is introducing, but live only during the CI job, so any test need to happen during this lifespan.

TODO schema ephemeral env + PL / ML

The setup for ephemeral environment is very similar to the one for local development environments. You can either use a Private Location, or use the tunnel.
Development machines tend to have enough resources for both options to be viables. In ephemeral environments such as CI job runners, because the Synthetics browser runners execution can be resource intensive, it might be preferable to use the tunnel.

TODO link to existing guides.


### Staging Environment

The last step in your development cycle might be deploying your changes in a shared, private development environment. You might typically call this environment staging or preprod.

This environement is shared and allows to run integrations test against an environment as similar to prod as possible, while remaining closed from public access.

The setup for ephemeral environment is very similar to the one for local development and ephemeral environments. You can either use a Private Location, or use the tunnel.

TODO link to existing guides.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci/releases/tag/v0.11.0
[4]: /continuous_testing/cicd_integrations#use-the-cli
