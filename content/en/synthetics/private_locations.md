---
title: Run Synthetics tests from Private Locations
kind: documentation
description: Run Synthetics API and browser tests from Private Locations
beta: true
further_reading:
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/browser_tests"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "synthetics/api_tests"
  tag: "Documentation"
  text: "Configure an API Test"
---

<div class="alert alert-warning">
This feature is in beta. To enable Synthetics private locations for your account, use the corresponding sign-up form <a href="https://app.datadoghq.com/privatelocations/2019signup">for the Datadog US site</a> or <a href="https://app.datadoghq.eu/privatelocations/2019signup">for the Datadog EU site.</a>
</div>

## Overview

Private locations allow you to monitor internal-facing applications or any private URLs that aren’t accessible from the public internet. They can also be used to create a new custom Synthetics location.

## Setup

The private location worker is shipped as a Docker container. By default, every second, your private location worker pulls your test configurations from Datadog’s servers using HTTPS, executes the test depending on the frequency defined in the configuration of the test, and returns the test results to Datadog’s servers.

Once you created a private location, configuring a Synthetics API or Browser test from a private location is completely identical to the one of Datadog managed locations.

### Create a new private location

1. Go in *Synthetics* -> *Settings* -> *Private Locations* and create a new private location:

    {{< img src="synthetics/private_locations/create_private_location.png" alt="create a private locations" responsive="true" style="width:70%;">}}

2. Fill out the Location Details and click **Save and Generate** to generate the configuration file associated with your private location on your worker.

    **Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the Private Locations screen.
    **You need to be able to reference these secrets again if you decide to add more workers, or to install workers on another host.**

3. Launch your worker as a standalone container using the Docker run command provided and the previously created configuration file:

    ```
    docker run --name synthetics-private-location-worker-<LOCATION_ID> \
               --rm -v $(pwd)/synthetics-private-location-worker-<LOCATION_ID>.json:/etc/synthetics-private-location-worker-<LOCATION_ID>.json datadog/synthetics-private-location-worker node /datadog-synthetics-agent/dist/worker.js \
               --config=/etc/synthetics-private-location-worker-<LOCATION_ID>.json
    ```

    **Note**: To scale a private location, add or remove workers on your host.

4. To pull test configurations and push test results, the private location worker needs access to one of the Datadog API endpoints:

    * For the Datadog US site: `api.datadoghq.com/api/`.
    * For the Datadog EU site: `api.datadoghq.eu/api/`.

    Check if the endpoint corresponding to your Datadog Site is available from the host runing the worker:

    * For the Datadog US site: `ping api.datadoghq.com`.
    * For the Datadog EU site:   `ping api.datadoghq.eu`.

5. If your private location reports correctly to Datadog you should see the corresponding pills displayed if the private location polled your endpoint less than 5 seconds before loading the settings or create test pages:

  * In your private locations list, in the Settings section:

    {{< img src="synthetics/private_locations/private_location_pill.png" alt="private locations pills" responsive="true" style="width:70%;">}}

  * In the form when creating a test, below the Private locations section:

    {{< img src="synthetics/private_locations/private_locations_in_list.png" alt="private locations in list" responsive="true" style="width:70%;">}}

6. You should now be able to use your new private location as any other Datadog managed locations for your [Synthetics API tests][1] or [Synthetics Browser tests][2].

## Security

The private location workers only pull data from Datadog servers. Datadog does not push data to the workers.
The secret access key, used to authenticate your private location worker to the Datadog servers, uses an in-house protocol based on [AWS Signature Version 4 protocol][3].

The test configurations are encrypted asymmetrically. The private key is used to decrypt the test configurations pulled by the workers from Datadog servers. The public key is used to encrypt the test results that are sent from the workers to Datadog's servers.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /synthetics/api_tests
[2]: /synthetics/browser_tests
[3]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
