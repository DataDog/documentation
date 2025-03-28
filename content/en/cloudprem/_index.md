---
title: CloudPrem
description: Learn how to deploy and manage Datadog CloudPrem, a self-hosted log solution for cost-effective log ingestion, indexing, and search capabilities
private: true # This removes this page from search and limits the availability of this doc to only those that have the link
further_reading:
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "Installation"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "Ingress Configuration"
- link: "/cloudprem/cluster/"
  tag: "Documentation"
  text: "Cluster Sizing and Operations"
- link: "/cloudprem/advanced/"
  tag: "Documentation"
  text: "Advanced Configurations"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
---

## Overview

Datadog CloudPrem is a self-hosted log solution which provides cost-effective log ingestion, indexing, and search capabilities in your own infrastructure. Designed to address data residency, security or high-volume requirements, CloudPrem seamlessly integrates with the Datadog platform to offer powerful log analysis, visualization, and alerting while ensuring that your sensitive log data remains within your own infrastructure.

{{< img src="/cloudprem/cloudprem_overview_diagram.png" alt="CloudPrem product overview diagram" style="width:100%;" >}}

### Core Capabilities
<!-- This sections was populated with Cursor, we can delete if it's not relevant -->

CloudPrem enhances your log management strategy through several fundamental capabilities:
- **Data Sovereignty**<br>
  Process and store logs within your own infrastructure while maintaining full integration with Datadog's analysis tools. This gives you complete oversight of your data's location and handling.

- **Infrastructure Efficiency**<br>
  Scale log processing and storage according to your needs by leveraging your existing infrastructure. This provides flexibility in resource allocation and management as your requirements evolve.

- **Deployment Flexibility**<br>
  Adapt the deployment to match your infrastructure requirements and security controls while preserving seamless integration with Datadog's platform features and functionality.

## Architecture

CloudPrem uses a modular architecture that separates processing tasks from data storage:

- Processing tasks like indexing and searching run independently
- Log data is stored separately in object storage (like S3)
- Each component can be scaled separately to match your needs
- This separation allows you to optimize resources based on your specific workload

<!-- {{< img src="path/to/your/image-name-here.png" alt="TBD CloudPrem architecture and component diagram" style="width:100%;" >}} -->

### Components

The CloudPrem cluster, typically deployed on Kubernetes (EKS), consists of several components:

**Indexers**
: Responsible for receiving logs from Datadog Agents. Indexers process, index, and store logs in index files called splits to the object storage (such as Amazon S3).

**Searchers**
: Handle search queries from the Datadog UI, reading metadata from Metastore and index data from the object storage.

**Metastore**
: Stores metadata about the indexes, including splits locations on the object storage. CloudPrem uses PostgreSQL for this purpose.

**Janitor/Control Plane**
: Responsible for tasks like indexing tasks scheduling and delete tasks.


## Prerequisites for getting started

Before getting started with CloudPrem, ensure you have:

- AWS account with necessary permissions
- Kubernetes cluster (EKS recommended)
- S3 bucket for log storage
- PostgreSQL database (RDS recommended)
- Datadog agent installed
- Required tools: `kubectl`, `helm`

For detailed instructions, see the [Installation][2] documentation.

## Additional considerations

### Log processing capabilities

CloudPrem includes basic log processing capabilities out-of-the-box. For more advanced use cases such as dual shipping, sensitive data redaction, or log volume control, Datadog recommends using [Observability Pipelines][3] in conjunction with CloudPrem.

### Billing and usage

Logs sent to CloudPrem components are counted toward your Datadog usage, you will be billed for CloudPrem's internal telemetry.

### Network and cost

CloudPrem sends query results outside your network for display in the Datadog UI. These query results are compressed, resulting in negligible egress costs for most deployments.

### Deployment options

You cannot deploy multiple CloudPrem clusters.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/deploy/installation/ 
[2]: /cloudprem/installation/
[3]: /observability_pipelines/