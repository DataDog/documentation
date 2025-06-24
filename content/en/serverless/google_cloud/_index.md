---
title: Google Cloud
aliases:
    - /serverless/gcp
---

## Overview

Google Cloud offers a number of Serverless serverless solutions that Datadog supports.
- [Google Cloud Run](./google_cloud_run) for deploying container-based services ([official docs](https://cloud.google.com/run/docs/overview/what-is-cloud-run)). Our instrumentation does not yet support Google Cloud Run Jobs, only Services.
- [Google Cloud Run Funcitons](./google_cloud_run/functions) for deploying code that gets packaged into container-based services and jobs running on Google Cloud Run infrastructure ([official docs](https://cloud.google.com/functions)).
- [Google Cloud Run Functions (1st generation)](./google_cloud_run/functions_gen1) for deploying code that gets run on the legacy Cloud Functions infrastructure ([official docs](https://cloud.google.com/run/docs/functions/comparison)).

## Setup

We offer two mechanisms for instrumenting serverless Google Cloud code: sidecar containers and in-process.

The sidecar containers are the suggested way to instrument these applications, deploying the datadog agent in a separate container that runs alongside your code. Detailed information for setting these up can be found for [Google Cloud Run](./google_cloud_run), [Google Cloud Run Functions](./google_cloud_run/functions), and [Google Cloud Run Functions (1st generation)](./google_cloud_run/functions_gen1).

We continue to support the in-process instrumentation. Detailed information for setting it up can be found here: [Google Cloud Run In-Process](../guide/gcr_serverless_init).
