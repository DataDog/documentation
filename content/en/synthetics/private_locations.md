---
title: Run test from Private Locations
kind: documentation
description: Identify incoming Synthetics requests
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

## Overview

Private locations allow you to monitor internal-facing applications or any private URLs that aren’t accessible from the public internet. They can also be used to create a new custom Synthetic Location.

https://cl.ly/2737639336a2
https://cl.ly/2737639336a2/download/Screen%252520Recording%2525202019-08-02%252520at%25252003.09%252520PM.gif

## Setup

The private location worker is shipped as a Docker container, the image can be found here on Dockerhub.

Your private location worker will periodically (by default, every second) pull your test configurations from Datadog’s servers via HTTPS, execute the test depending on the frequency that was defined during the configuration of the test, and return the associated result to Datadog’s servers.
The behavior of private locations is completely identical to the one of managed locations.

### Via docker run

You first need to create the configuration file associated with your private location on your worker. This file can be found when clicking on Add Private Location on Synthetics / Settings / Private Locations.

https://cl.ly/9be225b3c671
https://cl.ly/9be225b3c671/download/%255B45641e47632b17672af2c9f7493d72f2%255D_Image%2525202019-08-02%252520at%2525207.21.39%252520PM.png

The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption.
Those secrets are not stored by Datadog, so you should make sure to store them in a safe place before leaving the view. You will need these secrets again, would you decide to add more workers, or to install workers on another host.

Launch your worker as a standalone container using a Docker run command and the previously created configuration file.

Requirements:
Docker should be installed on your instance to be able to run the worker.
The private location worker should be able to access https://api.datadoghq.com/api/ (US instances) or https://api.datadoghq.eu/api/ (EU instances) in order to be able to pull test configurations and push test results.

## Security

The private location workers only pull data from Datadog servers. Datadog does not push any sort of data to the workers.
The secret access key, which is the one used to authenticate your private location worker to Datadog servers, uses an in-house protocol based on AWS Signature Version 4 protocol.

The test configurations are encrypted asymmetrically. The private key will be used to decrypt the test configurations pulled by the workers from Datadog servers. The public key will be used to encrypt the test results that are being sent from the workers to Datadog servers.

## How to scale private locations

To scale-out private locations, you would need to add additional workers.

## Liveness of the probe

You can know more about the liveness of your private locations by looking at the pills displayed:
on your private locations list, in the Settings section,
on the form when creating a test, below the Private locations section.

You’ll get a green pill if the private location polled your endpoint less than 5 seconds before loading the settings or create test pages.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
