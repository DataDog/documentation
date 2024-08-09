---
title: Getting Started with Private Locations
further_reading:
    - link: 'https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/'
      tag: 'Blog'
      text: 'Monitor your Synthetic private locations with Datadog'
    - link: '/getting_started/synthetics/api_test'
      tag: 'Documentation'
      text: 'Create your first API test'
    - link: '/getting_started/synthetics/browser_test'
      tag: 'Documentation'
      text: 'Create your first browser test'
    - link: '/synthetics/private_locations'
      tag: 'Documentation'
      text: 'Learn more about private locations'
---

## Overview

Private locations allow you to **monitor internal-facing applications** or private URLs that aren't accessible from the public internet. 

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Architecture diagram of how a private location works in Synthetic Monitoring" style="width:100%;">}}

You can also use private locations to:

- **Create custom locations** in mission-critical areas of your business.
- **Verify the application performance in your internal testing environment** before you release new features to production with [Synthetic tests in your CI/CD pipelines][1].
- **Compare the application performance** from inside and outside your internal network.

Private locations are Docker containers or Windows services that you can install anywhere inside your private network. Retrieve the docker image on [Google Container Registry][2] or download the [Windows installer][13].**\*** 

**\*** **Use and operation of this software is governed by the End User License Agreement available [here][14].**

Once you've created and installed your private location, you can assign [Synthetic tests][3] to your private location just like you would with a managed location. 

Your private locations test results display identically to your managed location test results. 

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Assign a Synthetic test to private locations" style="width:100%;">}}

## Create your private location

1. In the Datadog site, hover over **Digital Experience** and select **Settings** > [**Private Locations][5]**. 
2. Click **Add Private Location**.
3. Fill out your private location details. Only `Name` and `API key` fields are mandatory.
4. Click **Save Location and Generate Configuration File** to generate the configuration file associated with your private location on your worker. 
5. Depending on where you installed your private location, you may need to input additional parameters to your configuration file: 
    - If you are using a proxy, input the URL as `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`. 
    - If you want to block reserved IPs, toggle **Block reserved IPs** and enter the IP ranges. 

    For more information, see [Private Locations Configuration Options][6] and [Run Synthetic Tests from Private Locations][7]. 

6. Copy and paste your private location configuration file to your working directory.

    **Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the **Private Locations** creation form. **You need to be able to reference the secrets again in order to add more workers to your private location**. 
7. When you are ready, click **View Installation Instructions**.
8. Follow the installation instructions based on the environment you want to run the Private Location worker in.
9. If you are using Docker, launch your worker as a standalone container using the Docker `run` command and your configuration file:

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```
    
    This command starts a Docker container and prepares your private location to run tests. Datadog recommends running the container in detached mode with proper restart policy.

    <div class="alert alert-info">You can use another container runtime such as Podman. For more information, see the <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">Private Locations documentation</a>.</div>
    
    If you are using Windows, [run the Synthetics Private Location Installer with a GUI][12] or run the `msiexec` command on the command line inside the directory where you downloaded the installer:

    ```shell
    msiexec /i datadog-synthetics-worker-<version-number>.amd64.msi
    ```

10. If your private location reports correctly to Datadog, an `OK` health status displays under **Private Location Status** and on the **Private Locations** list in the **Settings** page:

    {{< img src="synthetics/private_locations/pl_health.png" alt="Private Location Health" style="width:100%;">}}

    Additionally, you can see private location logs in your terminal:

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
11. Once you're done testing your internal endpoint, click **OK**.

## Run Synthetic tests with your private location

Use your new private location just like a managed location in your Synthetic tests.

1. Create an [API test][2], [multistep API test][8], or [browser test][9] on any internal endpoint or application you want to monitor.
2. Under **Private Locations**, select your new private location:

    {{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Assign a Synthetic test to a private location" style="width:100%;">}}

3. Continue filling out your test!

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/cicd_integrations
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[3]: /getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/settings/private-locations
[6]: /synthetics/private_locations/configuration/#configuration-options
[7]: /synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64
[12]: /synthetics/private_locations?tab=windows#install-your-private-location
[13]: https://dd-public-oss-mirror.s3.amazonaws.com/synthetics-windows-pl/datadog-synthetics-worker-1.49.0.amd64.msi
[14]: https://www.datadoghq.com/legal/eula/
