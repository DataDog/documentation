---
title: Connect BigQuery for Warehouse Native Experiment Analysis
description: Connect a BigQuery service account to enable warehouse native experiment analysis.
private: true
further_reading:
- link: "/experiments/defining_metrics"
  tag: "Documentation"
  text: "Defining metrics in Datadog Experiments"
- link: "https://www.datadoghq.com/blog/experimental-data-datadog/"
  tag: "Blog"
  text: "How to bridge speed and quality in experiments through unified data"
---

Connecting Google BigQuery to Datadog Experiments


Datadog Experiments uses a warehouse-native architecture that performs statistical computations directly within your BigQuery environment. This requires a secure connection using a Google Cloud Service Account that has read access to your metric data and write access to a dedicated "sandbox" dataset for storing experimental results.
Setting up the connection involves three primary phases:
1. GCP Service Account Setup: Creating a dedicated identity for Datadog.
2. Dataset & Permissions: Configuring the output "sandbox" and granting access to source data.
3. Datadog Configuration: Finalizing the link within the Datadog platform.
Phase 1: GCP Service Account Setup
Datadog uses a service account to authenticate with BigQuery. For security, we recommend creating a new service account dedicated to experimentation.
1. Create Service Account: In the GCP Console, navigate to IAM & Admin > Service Accounts and click Create Service Account (e.g., datadog-experiments-sa).
2. Assign Project-Level Role: Grant the service account the BigQuery Job User (roles/bigquery.jobUser) role. This allows Datadog to run the queries necessary for experiment analysis.
3. Generate JSON Key: Once created, go to the Keys tab for the service account, click Add Key > Create New Key, and select JSON. Download this file; you will need it for Phase 3.
Phase 2: Dataset and Write Permissions
Datadog Experiments requires a dedicated dataset to write intermediary tables and final results. This ensures experimental data is isolated from your production tables.
1. Create the Sandbox Dataset
In the BigQuery SQL Editor, create a new dataset specifically for Datadog:
SQL
CREATE SCHEMA IF NOT EXISTS `your-project`.datadog_experiments_output;
2. Grant Write Permissions
Grant the Service Account the BigQuery Data Owner role on the datadog_experiments_output dataset. This specific permission allows Datadog to manage the tables it creates for your experiments.
3. Grant Read Access to Metrics
To allow Datadog to ingest the metrics used in your experiments, grant the Service Account the BigQuery Data Viewer role on the project or specific datasets containing your source data.
Phase 3: Finalizing the Datadog Connection
With the GCP environment prepared, finalize the setup in the Datadog UI.
1. Navigate to Product Analytics > Experiments > Settings.[a]
2. Select Google BigQuery as your data warehouse.
3. Authentication:
   * Service Account JSON: Open the JSON key file you downloaded in Phase 1 and paste the entire content here.
   * Project ID: Enter the GCP project ID where your data resides.
4. Experiment Configuration:
   * Dataset: Enter datadog_experiments_output.
   * Location: Specify the GCP region (e.g., US or EU) where your dataset is located.
5. Verify: Click Save and Test Connection.
Phase 4: Log Collection (Optional)
If using Datadog’s SDK for deploying experiments, you’ll need to  real-time monitoring of guardrail metrics (like sudden spikes in database errors during an experiment), we recommend exporting BigQuery logs to Datadog.[b]
1. Create Export Sink: In the GCP Logs Explorer, create an export sink for BigQuery logs.
2. Destination: Set the destination to Cloud Pub/Sub and point it to your existing Datadog log ingestion topic.
Verification
After saving, Datadog initiates a background sync of your BigQuery information schema. You can verify the connection is healthy by:
* Metric Flow: Ensure you see metrics like gcp.bigquery.query.count appearing in your Datadog dashboards.[c]
* Result Persistence: Once you launch a draft experiment, check your datadog_experiments_output dataset in BigQuery to ensure Datadog is successfully creating its analysis tables. 


[a]Need to talk about main warehouse set up (overall Datadog BQ integration)
[b]this is wrong - we don't need BigQuery logs in Datadog


update to discuss exposure export
[c]Change this to "Create a Metric SQL Model"