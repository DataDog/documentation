---
title: Google Cloud Platform
aliases:
    - /serverless/gcp
---

## Overview

A brief introduction to the Google Cloud Platform serverless offerings.
- [Google Cloud Run](./google_cloud_run) for deploying container-based services and jobs ([official docs](https://cloud.google.com/run/docs/overview/what-is-cloud-run)).
- [Google Cloud Run Funcitons](./google_cloud_run_functions) for deploying code that gets packaged into container-based services and jobs running on Google Cloud Run infrastructure ([official docs](...)).
- [Google Cloud Run Functions (1st generation)](./google_cloud_run_functions_1st_gen) for deploying code that gets run on the legacy Cloud Functions infrastructure ([official docs](...)).

## Setup

We offer two mechanisms for instrumenting Serverless Google Cloud Platform code: sidecar containers and in-process.

The sidecar containers are the suggested way to instrument these applications, deploying the datadog agent in a separate container that runs alongside your code. (add a few details about why we suggest this over in-process.) Detailed information for setting these up can be found at [Google Cloud Run](./google_cloud_run), [Google Cloud Run Functions](./google_cloud_run_functions), and [Google Cloud Run Functions (1st generation)](./google_cloud_run_functions_1st_gen).

We continue to support the in-process. (add a few details and caveats.) Detailed information for setting up [Google Cloud Run In-Process](./google_cloud_run_in_process).
