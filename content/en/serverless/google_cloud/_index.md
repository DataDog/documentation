---
title: Google Cloud Run
aliases:
    - /serverless/gcp
---

## Overview

Google Cloud offers a number of Serverless serverless solutions that Datadog supports.
- [Google Cloud Run](./containers) for deploying container-based services ([official docs](https://cloud.google.com/run/docs/overview/what-is-cloud-run)). Our instrumentation does not yet support Google Cloud Run Jobs, only Services.
- [Google Cloud Run Funcitons](./functions) for deploying code that gets packaged into container-based services and jobs running on Google Cloud Run infrastructure ([official docs](https://cloud.google.com/functions)).
- [Google Cloud Run Functions (1st generation)](./functions_1st_gen) for deploying code that gets run on the legacy Cloud Functions infrastructure ([official docs](https://cloud.google.com/run/docs/functions/comparison)).

## Setup

We offer two mechanisms for instrumenting serverless Google Cloud code: sidecar containers and in-process.

The sidecar containers are the suggested way to instrument these applications, deploying the datadog agent in a separate container that runs alongside your code. Detailed information for setting these up can be found for [Google Cloud Run](./containers), [Google Cloud Run Functions](./functions), and [Google Cloud Run Functions (1st generation)](./functions_1st_gen).

We continue to support the in-process instrumentation. Detailed information for setting it up can be found here: [Google Cloud Run In-Process](./containers_in_process).
