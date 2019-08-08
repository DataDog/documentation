---
title: Run test from Private Locations
kind: documentation
description: Identify incoming Synthetics requests
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

## Overview

Private locations allow you to monitor internal-facing applications or any private URLs that aren’t accessible from the public internet. They can also be used to create a new custom Synthetics location.

https://cl.ly/2737639336a2
https://cl.ly/2737639336a2/download/Screen%252520Recording%2525202019-08-02%252520at%25252003.09%252520PM.gif

## Setup

The private location worker is shipped as a Docker container. Find the image on Dockerhub.

By default, every second, your private location worker pulls your test configurations from Datadog’s servers using HTTPS, executes the test depending on the frequency defined in the configuration of the test, and returns the test results to Datadog’s servers.
The behavior of private locations is completely identical to the one of managed locations.

### Configuring Docker

Start by creating the configuration file associated with your private location on your worker. Find this file in *Synthetics* > *Add Private Location* > *Settings* > *Private Locations*.

https://cl.ly/9be225b3c671
https://cl.ly/9be225b3c671/download/%255B45641e47632b17672af2c9f7493d72f2%255D_Image%2525202019-08-02%252520at%2525207.21.39%252520PM.png

The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption.
Datadog does not store the secrets, so store them locally before leaving the Private Locations screen. You need to be able to reference these secrets again if you decide to add more workers, or to install workers on another host.

Launch your worker as a standalone container using a Docker run command and the previously created configuration file.

#### Docker requirements
- Install Docker on your instance.
- To pull test configurations and push test results, give the private location worker access to one of the Datadog API endpoints: `https://api.datadoghq.com/api/` (for the US instance) or `https://api.datadoghq.eu/api/` (for the EU instance).

## Security

The private location workers only pull data from Datadog servers. Datadog does not push data to the workers.
The secret access key, used to authenticate your private location worker to the Datadog servers, uses an in-house protocol based on AWS Signature Version 4 protocol.

The test configurations are encrypted asymmetrically. The private key is used to decrypt the test configurations pulled by the workers from Datadog servers. The public key is used to encrypt the test results that are sent from the workers to Datadog's servers.

## How to scale private locations

To scale private locations, add or remove workers.

## Liveness of the probe

For more information about the liveness of your private locations, see the pills displayed:
on your private locations list, in the Settings section,
on the form when creating a test, below the Private locations section.

You’ll get a green pill if the private location polled your endpoint less than 5 seconds before loading the settings or create test pages.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
