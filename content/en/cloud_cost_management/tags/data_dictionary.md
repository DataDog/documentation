---
title: Data Dictionary
description: Reference guide for cloud cost tags and attributes across providers
algolia:
  tags:
    - cloud cost data dictionary
    - cost tags
    - cloud cost attributes
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/tags/tag_pipelines"
  tag: "Documentation"
  text: "Tag Pipelines"
- link: "/cloud_cost_management/tags/tag_explorer"
  tag: "Documentation"
  text: "Tag Explorer"
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting Started with Tags"

multifiltersearch:
  # "id" must match the corresponding key in the "data" object
  headers:
    - name: Tag/Field Name
      id: tag_name
    - name: Source
      id: source
      filter_by: true
    - name: Type
      id: type
      filter_by: true
    - name: Description
      id: description
    - name: Example Values
      id: example
  data:
    # All Providers - Bill Columns
    - tag_name: providername
      source: Cloud Cost Management
      type: FOCUS
      description: The name of the entity that made the resources or services available for purchase (FOCUS standard)
      example: "AWS, Azure, Google Cloud"
    - tag_name: servicename
      source: Cloud Cost Management
      type: FOCUS
      description: An offering that can be purchased from a provider (FOCUS standard)
      example: "Amazon Elastic Compute Cloud, Virtual Machines"
    - tag_name: billingaccountid
      source: Cloud Cost Management
      type: FOCUS
      description: The identifier assigned to a billing account by the provider (FOCUS standard)
      example: "123456789012"
    - tag_name: billingaccountname
      source: Cloud Cost Management
      type: FOCUS
      description: The display name assigned to a billing account (FOCUS standard)
      example: "Production Account"
    - tag_name: billingcurrency
      source: Cloud Cost Management
      type: FOCUS
      description: The currency in which a cloud bill was paid (FOCUS standard)
      example: "USD, EUR, GBP"
    - tag_name: subaccountid
      source: Cloud Cost Management
      type: FOCUS
      description: An ID assigned to a grouping of resources or services, often used to manage access or cost (FOCUS standard)
      example: "987654321098"
    - tag_name: subaccountname
      source: Cloud Cost Management
      type: FOCUS
      description: A name assigned to a grouping of resources or services, often used to manage access or cost (FOCUS standard)
      example: "Development Team"
    - tag_name: regionname
      source: Cloud Cost Management
      type: FOCUS
      description: The name of an isolated geographic area where a resource is provisioned or a service is provided (FOCUS standard)
      example: "us-east-1, us-central1, eastus"
    - tag_name: availabilityzone
      source: Cloud Cost Management
      type: FOCUS
      description: A provider-assigned identifier for a physically separated and isolated area within a region that provides high availability and fault tolerance (FOCUS standard)
      example: "us-east-1a"
    - tag_name: pricingunit
      source: Cloud Cost Management
      type: FOCUS
      description: Provider-specified measurement unit for determining unit prices (FOCUS standard)
      example: "Hours, GB-Month, Requests"
    - tag_name: chargetype
      source: Cloud Cost Management
      type: FOCUS
      description: The type of charge applied (FOCUS standard)
      example: "Usage, Purchase, Tax"
    - tag_name: chargecategory
      source: Cloud Cost Management
      type: FOCUS
      description: Highest-level classification of a charge based on the nature of how it is billed (FOCUS standard)
      example: "Usage, Purchase"
    - tag_name: commitmentdiscounttype
      source: Cloud Cost Management
      type: FOCUS
      description: Type of commitment discount applied to the charge (FOCUS standard)
      example: "Reservation, Savings Plan"
    - tag_name: resourceid
      source: Cloud Cost Management
      type: FOCUS
      description: Unique identifier assigned to a resource by the provider (FOCUS standard)
      example: "i-1234567890abcdef0"
    - tag_name: resourcename
      source: Cloud Cost Management
      type: FOCUS
      description: Display name assigned to a resource (FOCUS standard)
      example: "my-web-server"
    - tag_name: resourcetype
      source: Cloud Cost Management
      type: FOCUS
      description: The kind of resource the charge applies to (FOCUS standard)
      example: "Virtual Machine, Storage Account"
    
    # Datadog Enrichment - Host Agent
    - tag_name: host
      source: Datadog Enrichment
      type: Host Agent
      description: Tags added to host metadata by the Datadog Agent running on the host
      example: "i-1234567890abcdef0"
    - tag_name: env
      source: Datadog Enrichment
      type: Host Agent
      description: Environment tag from Datadog Agent
      example: "prod, staging, dev"
    - tag_name: service
      source: Datadog Enrichment
      type: Host Agent
      description: Service tag from Datadog Agent
      example: "web-api, database, cache"
    - tag_name: team
      source: Datadog Enrichment
      type: Host Agent / Service Catalog
      description: Team tag from Datadog Agent or Service Catalog
      example: "platform, data-engineering"
    
    # Datadog Enrichment - Service Catalog
    - tag_name: application
      source: Datadog Enrichment
      type: Service Catalog
      description: Application tag from APM Service Catalog
      example: "checkout, inventory"
    
    # Datadog Enrichment - Integration Tiles
    - tag_name: account
      source: Datadog Enrichment
      type: Integration Tiles
      description: Tags added to the Datadog integration tile for a specific cloud account
      example: "prod-account, dev-account"
    
    # Kubernetes Enrichment
    - tag_name: kube_cluster_name
      source: Kubernetes Enrichment
      type: Cluster
      description: The name of the Kubernetes cluster hosting a workload
      example: "prod-eks-cluster"
    - tag_name: kube_namespace
      source: Kubernetes Enrichment
      type: Namespace
      description: Kubernetes namespace
      example: "production, default"
    - tag_name: pod_name
      source: Kubernetes Enrichment
      type: Pod
      description: User-defined tags found on Kubernetes pods monitored with Datadog
      example: "web-deployment-abc123"
    - tag_name: kube_deployment
      source: Kubernetes Enrichment
      type: Deployment
      description: Kubernetes deployment name
      example: "web-frontend"
    - tag_name: kube_service
      source: Kubernetes Enrichment
      type: Service
      description: Kubernetes service name
      example: "nginx-service"
    - tag_name: persistentvolumeclaim
      source: Kubernetes Enrichment
      type: Storage
      description: User-defined tags found on Persistent Volume Claims in Kubernetes clusters monitored with Datadog
      example: "data-pvc-01"
    
    # Cloud Cost Management - Container Allocation
    - tag_name: allocated_resource
      source: Cloud Cost Management
      type: Container Allocation
      description: The type of resource used by a container workload during cost allocation
      example: "cpu, mem"
    - tag_name: allocated_spend_type
      source: Cloud Cost Management
      type: Container Allocation
      description: Container costs are split into three spend types - resources used by workload (usage), resources reserved but not used (workload_idle), and resources not reserved or used by any workload (cluster_idle)
      example: "usage, workload_idle, cluster_idle"
    - tag_name: orchestrator
      source: Cloud Cost Management
      type: Container Allocation
      description: The container orchestrator
      example: "kubernetes, ecs"
    
    # Cloud Cost Management - Aliases
    - tag_name: aws_product
      source: Cloud Cost Management
      type: Alias
      description: Alias of AWS lineItem/ProductCode to simplify the cost data model
      example: "AmazonEC2, AmazonS3"
    - tag_name: aws_availability_zone
      source: Cloud Cost Management
      type: Alias
      description: AWS availability zone alias
      example: "us-east-1a"
    
    # AWS Provider-Specific
    - tag_name: aws_member_account_name
      source: AWS
      type: Cost Allocation Tags
      description: AWS member account name from Cost and Usage Report
      example: "production-account"
    - tag_name: lineitem/lineitemtype
      source: AWS
      type: Bill Column
      description: The type of charge covered by this line item
      example: "Usage, Tax, Fee"
    - tag_name: lineitem/productcode
      source: AWS
      type: Bill Column
      description: The AWS product code for the line item
      example: "AmazonEC2, AmazonS3"
    - tag_name: lineitem/usagetype
      source: AWS
      type: Bill Column
      description: The type of usage for the line item
      example: "BoxUsage:t2.micro"
    - tag_name: product/instancetype
      source: AWS
      type: Bill Column
      description: The type of EC2 instance
      example: "t2.micro, m5.large"
    - tag_name: product/region
      source: AWS
      type: Bill Column
      description: AWS region
      example: "us-east-1"
    - tag_name: resourcetags/user:*
      source: AWS
      type: Resource Tags
      description: User-defined tags on cloud resources in AWS, pulled using Groups Tagging API
      example: "user:team:platform"
    - tag_name: aws_reservation_arn
      source: AWS
      type: Commitment
      description: AWS Reserved Instance ARN
      example: "arn:aws:ec2:us-east-1:123456789012:reserved-instances/r-1234567890abcdef0"
    - tag_name: savingsplan/savingsplanarn
      source: AWS
      type: Commitment
      description: AWS Savings Plan ARN
      example: "arn:aws:savingsplans::123456789012:savingsplan/sp-1234567890abcdef0"
    
    # Azure Provider-Specific
    - tag_name: subscriptionname
      source: Azure
      type: Bill Column
      description: The Azure subscription name
      example: "Production Subscription"
    - tag_name: subscriptionid
      source: Azure
      type: Bill Column
      description: The Azure subscription ID associated with the cost
      example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    - tag_name: resourcegroupname
      source: Azure
      type: Bill Column
      description: Azure resource group name
      example: "production-rg"
    - tag_name: metercategory
      source: Azure
      type: Bill Column
      description: Azure meter category
      example: "Virtual Machines, Storage"
    - tag_name: tags/*
      source: Azure
      type: Resource Tags
      description: User-defined tags on cloud resources in Azure from the Tags column in cost export
      example: "Environment:Production"
    - tag_name: reservationname
      source: Azure
      type: Commitment
      description: Azure Reservation name
      example: "prod-vm-reservation"
    
    # Google Cloud Provider-Specific
    - tag_name: project_id
      source: Google Cloud
      type: Bill Column
      description: The GCP project ID associated with the cost
      example: "my-project-12345"
    - tag_name: project_name
      source: Google Cloud
      type: Bill Column
      description: The GCP project name
      example: "Production Project"
    - tag_name: sku_description
      source: Google Cloud
      type: Bill Column
      description: Description of the SKU
      example: "N1 Predefined Instance Core running in Americas"
    - tag_name: labels/*
      source: Google Cloud
      type: Resource Labels
      description: User-defined labels on cloud resources in Google Cloud from the labels column in billing export
      example: "env:prod"
    - tag_name: project_labels/*
      source: Google Cloud
      type: Project Labels
      description: User-defined labels on a project in Google Cloud
      example: "team:platform"
    - tag_name: commitment_id
      source: Google Cloud
      type: Commitment
      description: GCP Committed Use Discount ID
      example: "1234567890123456789"
    
    # Amazon ECS Provider-Specific
    - tag_name: ecs_cluster_name
      source: Amazon ECS
      type: Task
      description: The name of the ECS cluster hosting a workload
      example: "prod-ecs-cluster"
    - tag_name: ecs_task_name
      source: Amazon ECS
      type: Task
      description: User-defined tags on an ECS task definition
      example: "web-task"
    - tag_name: ecs_container_name
      source: Amazon ECS
      type: Container
      description: User-defined tags on a container running in an ECS task
      example: "nginx-container"
    
    # SaaS Providers
    - tag_name: confluent_cluster_id
      source: Confluent Cloud
      type: Resource
      description: Confluent Cloud cluster identifier
      example: "lkc-abc123"
    - tag_name: databricks_workspace_id
      source: Databricks
      type: Resource
      description: Databricks workspace identifier
      example: "1234567890123456"
    - tag_name: snowflake_warehouse_name
      source: Snowflake
      type: Resource
      description: Snowflake warehouse name
      example: "COMPUTE_WH"
    - tag_name: mongodb_cluster_name
      source: MongoDB
      type: Resource
      description: MongoDB cluster name
      example: "Cluster0"
    
    # Custom Costs
    - tag_name: custom/*
      source: Custom Costs
      type: Custom Tags
      description: User-defined tags for every provider, found on cost files uploaded to Cloud Cost Management
      example: "custom:project:migration"
    
    # Tag Pipelines
    - tag_name: pipeline/*
      source: Tag Pipelines
      type: User-Defined Rules
      description: Tags created by applying your Tag Pipelines to cost data
      example: "business_unit:sales"
    
    # Custom Allocation Rules  
    - tag_name: allocated/*
      source: Custom Allocation Rules
      type: User-Defined Rules
      description: Tags created by applying your Custom Allocation Rules to cost data
      example: "allocated_team:platform"

---

## Overview

The Cloud Cost Data Dictionary provides a comprehensive reference for all tags, fields, and attributes available in Datadog Cloud Cost Management. This dictionary shows you where each tag comes from and how you can use it to analyze costs across AWS, Azure, Google Cloud, SaaS providers, and more.

Filter by **Source** to see tags from specific systems (like Datadog Enrichment or Kubernetes), or filter by **Type** to find specific categories of tags. Search for any tag to understand its purpose and see example values.

## Tag sources in Cloud Cost Management

Cloud Cost Management automatically enriches your cost data with tags from multiple sources:

- **Cloud Cost Management**: [FOCUS](https://focus.finops.org/) standard fields that normalize cost data across providers, container allocation tags, and aliases that simplify the cost data model
- **Datadog Enrichment**: Tags from Datadog Agent, APM Service Catalog, integration tiles, and Data Observability
- **Kubernetes Enrichment**: Tags from Kubernetes clusters, pods, deployments, and persistent volumes monitored with Datadog
- **Provider-Specific**: Native tags from AWS, Azure, Google Cloud, Oracle Cloud, Amazon ECS, and SaaS providers like Confluent Cloud, Databricks, Snowflake, and MongoDB
- **Tag Pipelines**: User-defined rules that create or transform tags based on your business logic
- **Custom Allocation Rules**: User-defined rules that split and allocate shared costs to teams, services, or other dimensions
- **Custom Costs**: User-defined tags from CSV files uploaded to Cloud Cost Management

Use these tags to allocate costs, create reports, build dashboards, and track spending by team, service, or environment in [Tag Explorer][1], cost analytics, and other Cloud Cost Management views.

## Field reference

{{< multifilter-search >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/tags

