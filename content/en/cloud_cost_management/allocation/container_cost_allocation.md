---
title: Container Cost Allocation
description: >-
  Learn how to allocate Cloud Cost Management spending across your organization
  with Container Cost Allocation.
aliases:
  - /cloud_cost_management/container_cost_allocation
further_reading:
  - link: /cloud_cost_management/
    tag: Documentation
    text: Learn about Cloud Cost Management
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-platform-pills-label" 
    class="cdoc-filter-label"
  >Cloud Provider</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="platform" 
      data-option-id="aws"
      aria-selected="true"
      tabIndex="0"
    >AWS</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="azure"
      aria-selected="false"
      tabIndex="0"
    >Azure</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="google"
      aria-selected="false"
      tabIndex="0"
    >Google</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-platform-dropdown-label" 
    class="cdoc-filter-label"
  >Cloud Provider</p><div 
    id="cdoc-dropdown-platform" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-platform-dropdown-label">
      <span 
        id="cdoc-dropdown-platform-label" 
        class="cdoc-btn-label"
      >AWS</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-platform-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="platform" 
      data-option-id="aws"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >AWS</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="azure"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Azure</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="google"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Google</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <h2 id="overview">Overview</h2>
  <p>
    Datadog Cloud Cost Management (CCM) automatically allocates the costs of
    your cloud clusters to individual services and workloads running in those
    clusters. Use cost metrics enriched with tags from pods, nodes, containers,
    and tasks to visualize container workload cost in the context of your entire
    cloud bill.
  </p>
  <dl>
    <dt>Clouds</dt>
    <dd>
      CCM allocates costs of your AWS, Azure, or Google host instances. A host
      is a computer (such as an EC2 instance in AWS, a virtual machine in Azure,
      or a Compute Engine instance in Google Cloud) that is listed in your cloud
      provider's cost and usage report and may be running Kubernetes pods.
    </dd>
    <dt>Resources</dt>
    <dd>
      CCM allocates costs for Kubernetes clusters and includes cost analysis for
      many associated resources such as Kubernetes persistent volumes used by
      your pods.
    </dd>
  </dl>
  <p>
    CCM displays costs for resources including CPU, memory, and more depending
    on the cloud and orchestrator you are using on the
    <a href="https://app.datadoghq.com/cost/containers"
      ><strong>Containers</strong> page</a
    >.
  </p>
  <a
    href="http://localhost:1313/images/cloud_cost/container_cost_allocation/container_allocation.34f7029a792cb8e5f4d6ca3038455172.png?fit=max&amp;auto=format"
    class="pop"
    data-bs-toggle="modal"
    data-bs-target="#popupImageModal"
    ><div class="shortcode-wrapper shortcode-img expand">
      <figure class="text-center">
        <picture style="width: 100%"
          ><img
            srcset="
              http://localhost:1313/images/cloud_cost/container_cost_allocation/container_allocation.34f7029a792cb8e5f4d6ca3038455172.png?auto=format
            "
            class="img-fluid"
            style="width: 100%"
            alt="Cloud cost allocation table showing requests and idle costs over the past month on the Containers page"
        /></picture>
      </figure></div
  ></a>
  <h2 id="prerequisites">Prerequisites</h2>
  <div
    class="cdoc__toggleable"
    data-description="Cloud Provider is AWS"
    data-if="0"
  >
    <p>
      CCM allocates costs of Amazon ECS clusters as well as all Kubernetes
      clusters, including those managed through Elastic Kubernetes Service
      (EKS).
    </p>
    <p>
      The following table presents the list of collected features and the
      minimal Agent and Cluster Agent versions for each.
    </p>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Minimal Agent version</th>
          <th>Minimal Cluster Agent version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Container Cost Allocation</td>
          <td>7.27.0</td>
          <td>1.11.0</td>
        </tr>
        <tr>
          <td>GPU Container Cost Allocation</td>
          <td>7.54.0</td>
          <td>7.54.0</td>
        </tr>
        <tr>
          <td>AWS Persistent Volume Allocation</td>
          <td>7.46.0</td>
          <td>1.11.0</td>
        </tr>
        <tr>
          <td>Data Transfer Cost Allocation</td>
          <td>7.58.0</td>
          <td>7.58.0</td>
        </tr>
      </tbody>
    </table>
    <ol>
      <li>
        Configure the AWS Cloud Cost Management integration on the
        <a href="https://app.datadoghq.com/cost/setup">Cloud Cost Setup page</a
        >.
      </li>
      <li>
        For Kubernetes support, install the
        <a href="/containers/kubernetes/installation/?tab=operator"
          ><strong>Datadog Agent</strong></a
        >
        in a Kubernetes environment and ensure that you enable the
        <a
          href="/infrastructure/containers/orchestrator_explorer?tab=datadogoperator"
          ><strong>Orchestrator Explorer</strong></a
        >
        in your Agent configuration.
      </li>
      <li>
        For Amazon ECS support, set up
        <a href="/containers/amazon_ecs/"
          ><strong>Datadog Container Monitoring</strong></a
        >
        in ECS tasks.
      </li>
      <li>
        Optionally, enable
        <a
          href="https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html"
          >AWS Split Cost Allocation</a
        >
        for usage-based ECS allocation.
      </li>
      <li>
        To enable storage cost allocation, set up
        <a href="/integrations/amazon_ebs/#metric-collection"
          >EBS metric collection</a
        >.
      </li>
      <li>
        To enable GPU container cost allocation, install the
        <a href="/integrations/dcgm/?tab=kubernetes#installation"
          >Datadog DCGM integration</a
        >.
      </li>
      <li>
        To enable Data transfer cost allocation, set up
        <a href="/network_monitoring/cloud_network_monitoring/setup"
          >Cloud Network Monitoring</a
        >. <strong>Note</strong>: additional charges apply
      </li>
    </ol>
    <p>
      <strong>Note</strong>: GPU Container Cost Allocation only supports pod
      requests in the format <code>nvidia.com/gpu</code>.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Cloud Provider is Azure"
    data-if="1"
  >
    <p>
      CCM allocates costs of all Kubernetes clusters, including those managed
      through Azure Kubernetes Service (AKS).
    </p>
    <p>
      The following table presents the list of collected features and the
      minimal Agent and Cluster Agent versions for each.
    </p>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Minimal Agent version</th>
          <th>Minimal Cluster Agent version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Container Cost Allocation</td>
          <td>7.27.0</td>
          <td>1.11.0</td>
        </tr>
        <tr>
          <td>GPU Container Cost Allocation</td>
          <td>7.54.0</td>
          <td>7.54.0</td>
        </tr>
      </tbody>
    </table>
    <ol>
      <li>
        Configure the Azure Cost Management integration on the
        <a href="https://app.datadoghq.com/cost/setup">Cloud Cost Setup page</a
        >.
      </li>
      <li>
        Install the
        <a href="/containers/kubernetes/installation/?tab=operator"
          ><strong>Datadog Agent</strong></a
        >
        in a Kubernetes environment and ensure that you enable the
        <a
          href="/infrastructure/containers/orchestrator_explorer?tab=datadogoperator"
          ><strong>Orchestrator Explorer</strong></a
        >
        in your Agent configuration.
      </li>
      <li>
        To enable GPU container cost allocation, install the
        <a
          href="https://docs.datadoghq.com/integrations/dcgm/?tab=kubernetes#installation"
          >Datadog DCGM integration</a
        >.
      </li>
    </ol>
    <p>
      <strong>Note</strong>: GPU Container Cost Allocation only supports pod
      requests in the format <code>nvidia.com/gpu</code>.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Cloud Provider is Google"
    data-if="2"
  >
    <p>
      CCM allocates costs of all Kubernetes clusters, including those managed
      through Google Kubernetes Engine (GKE).
    </p>
    <p>
      The following table presents the list of collected features and the
      minimal Agent and Cluster Agent versions for each.
    </p>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Minimal Agent version</th>
          <th>Minimal Cluster Agent version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Container Cost Allocation</td>
          <td>7.27.0</td>
          <td>1.11.0</td>
        </tr>
        <tr>
          <td>GPU Container Cost Allocation</td>
          <td>7.54.0</td>
          <td>7.54.0</td>
        </tr>
      </tbody>
    </table>
    <ol>
      <li>
        Configure the Google Cloud Cost Management integration on the
        <a href="https://app.datadoghq.com/cost/setup">Cloud Cost Setup page</a
        >.
      </li>
      <li>
        Install the
        <a href="/containers/kubernetes/installation/?tab=operator"
          ><strong>Datadog Agent</strong></a
        >
        in a Kubernetes environment and ensure that you enable the
        <a
          href="/infrastructure/containers/orchestrator_explorer?tab=datadogoperator"
          ><strong>Orchestrator Explorer</strong></a
        >
        in your Agent configuration.
      </li>
      <li>
        To enable GPU container cost allocation, install the
        <a
          href="https://docs.datadoghq.com/integrations/dcgm/?tab=kubernetes#installation"
          >Datadog DCGM integration</a
        >.
      </li>
    </ol>
    <p>
      <strong>Note</strong>: GPU Container Cost Allocation only supports pod
      requests in the format <code>nvidia.com/gpu</code>.
    </p>
    <p>
      <strong>Note</strong>:
      <a
        href="https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview"
        >GKE Autopilot</a
      >
      is only supported as an Agentless Kubernetes setup that is subject to
      <a href="#agentless-kubernetes-costs">limitations</a>.
    </p>
  </div>
  <h2 id="allocate-costs">Allocate costs</h2>
  <p>
    Cost allocation divides host compute and other resource costs from your
    cloud provider into individual tasks or pods associated with them. These
    divided costs are then enriched with tags from related resources so you can
    break down costs by any associated dimensions.
  </p>
  <p>
    Use the <code>allocated_resource</code> tag to visualize the spend resource
    associated with your costs at various levels, including the Kubernetes node,
    container orchestration host, storage volume, or entire cluster level.
  </p>
  <div
    class="cdoc__toggleable"
    data-description="Cloud Provider is AWS"
    data-if="3"
  >
    <p>
      These divided costs are enriched with tags from nodes, pods, tasks, and
      volumes. You can use these tags to break down costs by any associated
      dimensions.
    </p>
    <h3 id="kubernetes-tag-extraction">Kubernetes tag extraction</h3>
    <p>
      Only <em>tags</em> from the direct resource, such as a pod, as well as the
      underlying nodes, are added to cost metrics by default. To include labels
      as tags, annotations as tags, or tags from related resources such as
      namespaces, see
      <a href="/containers/kubernetes/tag/">Kubernetes Tag Extraction</a>.
    </p>
    <h3 id="compute">Compute</h3>
    <p>
      For Kubernetes compute allocation, a Kubernetes node is joined with its
      associated host instance costs. The node's cluster name and all node tags
      are added to the entire compute cost for the node. This allows you to
      associate cluster-level dimensions with the cost of the instance, without
      considering the pods scheduled to the node.
    </p>
    <p>
      Next, Datadog looks at all of the pods running on that node for the day.
      The cost of the node is allocated to the pod based on the resources it has
      used and the length of time it ran. This calculated cost is enriched with
      all of the pod's tags.
    </p>
    <p>
      <strong>Note</strong>: Only <em>tags</em> from pods and nodes are added to
      cost metrics. To include labels, enable labels as tags for
      <a
        href="/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags"
        >nodes</a
      >
      and
      <a
        href="/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags"
        >pods</a
      >.
    </p>
    <p>
      All other costs are given the same value and tags as the source metric
      <code>aws.cost.amortized</code>.
    </p>
    <h3 id="persistent-volume-storage">Persistent volume storage</h3>
    <p>
      For Kubernetes Persistent Volume storage allocation, Persistent Volumes
      (PV), Persistent Volume Claims (PVC), nodes, and pods are joined with
      their associated EBS volume costs. All associated PV, PVC, node, and pod
      tags are added to the EBS volume cost line items.
    </p>
    <p>
      Next, Datadog looks at all of the pods that claimed the volume on that
      day. The cost of the volume is allocated to a pod based on the resources
      it used and the length of time it ran. These resources include the
      provisioned capacity for storage, IOPS, and throughput. This allocated
      cost is enriched with all of the pod's tags.
    </p>
    <h3 id="amazon-ecs-on-ec2">Amazon ECS on EC2</h3>
    <p>
      For ECS allocation, Datadog determines which tasks ran on each EC2
      instance used for ECS. If you enable AWS Split Cost Allocation, the
      metrics allocate ECS costs by usage instead of reservation, providing more
      granular detail.
    </p>
    <p>
      Based on resources the task has used, Datadog assigns the appropriate
      portion of the instance's compute cost to that task. The calculated cost
      is enriched with all of the task's tags and all of the container tags
      (except container names) running in the task.
    </p>
    <h3 id="amazon-ecs-on-fargate">Amazon ECS on Fargate</h3>
    <p>
      ECS tasks that run on Fargate are already fully allocated
      <a
        href="https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html"
        >in the CUR</a
      >. CCM enriches that data by adding out-of-the-box tags and container tags
      to the AWS Fargate cost.
    </p>
    <h3 id="data-transfer">Data transfer</h3>
    <p>
      For Kubernetes data transfer allocation, a Kubernetes node is joined with
      its associated data transfer costs from the
      <a
        href="https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html"
        >CUR</a
      >. The node's cluster name and all node tags are added to the entire data
      transfer cost for the node. This allows you to associate cluster-level
      dimensions with the cost of the data transfer, without considering the
      pods scheduled to the node.
    </p>
    <p>
      Next, Datadog examines the daily
      <a href="https://kubernetes.io/docs/concepts/workloads/"
        >workload resources</a
      >
      running on that node. The node cost is allocated to the workload level
      according to network traffic volume usage. This calculated cost is
      enriched with all of the workload resource's tags.
    </p>
    <p>
      <strong>Note</strong>: Only <em>tags</em> from pods and nodes are added to
      cost metrics. To include labels, enable labels as tags for
      <a
        href="/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags"
        >nodes</a
      >
      and
      <a
        href="/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags"
        >pods</a
      >.
    </p>
    <p>
      <a href="/network_monitoring/cloud_network_monitoring/setup"
        >Cloud Network Monitoring</a
      >
      must be enabled on all AWS hosts to allow accurate data transfer cost
      allocation. If some hosts do not have Cloud Network Monitoring enabled,
      the data transfer costs for these hosts is not allocated and may appear as
      an <code>n/a</code> bucket depending on filter and group-by conditions.
    </p>
    <p>
      Datadog supports data transfer cost allocation using
      <a href="https://kubernetes.io/docs/concepts/workloads/"
        >standard 6 workload resources</a
      >
      only. For
      <a
        href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/"
        >custom workload resources</a
      >, data transfer costs can be allocated down to the cluster level only,
      and not the node/namespace level.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Cloud Provider is Azure"
    data-if="4"
  >
    <h3 id="kubernetes-tag-extraction-2">Kubernetes tag extraction</h3>
    <p>
      Only <em>tags</em> from the direct resource, such as a pod, as well as the
      underlying nodes, are added to cost metrics by default. To include labels
      as tags, annotations as tags, or tags from related resources such as
      namespaces, see
      <a href="/containers/kubernetes/tag/">Kubernetes Tag Extraction</a>.
    </p>
    <h3 id="compute-2">Compute</h3>
    <p>
      For Kubernetes compute allocation, a Kubernetes node is joined with its
      associated host instance costs. The node's cluster name and all node tags
      are added to the entire compute cost for the node. This allows you to
      associate cluster-level dimensions with the cost of the instance, without
      considering the pods scheduled to the node.
    </p>
    <p>
      Next, Datadog looks at all of the pods running on that node for the day.
      The cost of the node is allocated to the pod based on the resources it has
      used and the length of time it ran. This calculated cost is enriched with
      all of the pod's tags.
    </p>
    <p>
      <strong>Note</strong>: Only <em>tags</em> from pods and nodes are added to
      cost metrics. To include labels, enable labels as tags for
      <a
        href="/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags"
        >nodes</a
      >
      and
      <a
        href="/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags"
        >pods</a
      >.
    </p>
    <p>
      All other costs are given the same value and tags as the source metric
      <code>azure.cost.amortized</code>.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Cloud Provider is Google"
    data-if="5"
  >
    <h3 id="kubernetes-tag-extraction-3">Kubernetes tag extraction</h3>
    <p>
      Only <em>tags</em> from the direct resource, such as a pod, as well as the
      underlying nodes, are added to cost metrics by default. To include labels
      as tags, annotations as tags, or tags from related resources such as
      namespaces, see
      <a href="/containers/kubernetes/tag/">Kubernetes Tag Extraction</a>.
    </p>
    <h3 id="compute-3">Compute</h3>
    <p>
      For Kubernetes compute allocation, a Kubernetes node is joined with its
      associated host instance costs. The node's cluster name and all node tags
      are added to the entire compute cost for the node. This allows you to
      associate cluster-level dimensions with the cost of the instance, without
      considering the pods scheduled to the node.
    </p>
    <p>
      Next, Datadog looks at all of the pods running on that node for the day.
      The cost of the node is allocated to the pod based on the resources it has
      used and the length of time it ran. This calculated cost is enriched with
      all of the pod's tags.
    </p>
    <p>
      <strong>Note</strong>: Only <em>tags</em> from pods and nodes are added to
      cost metrics. To include labels, enable labels as tags for
      <a
        href="/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags"
        >nodes</a
      >
      and
      <a
        href="/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags"
        >pods</a
      >.
    </p>
    <p>
      All other costs are given the same value and tags as the source metric
      <code>gcp.cost.amortized</code>.
    </p>
    <h3 id="agentless-kubernetes-costs">Agentless Kubernetes costs</h3>
    <p>
      To view the costs of GKE clusters without enabling Datadog Infrastructure
      Monitoring, use
      <a
        href="https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations"
        >GKE cost allocation</a
      >. Enable GKE cost allocation on unmonitored GKE clusters to access this
      feature set. This approach comes with the following limitations.
    </p>
    <h4 id="limitations-and-differences-from-the-datadog-agent">
      Limitations and differences from the Datadog Agent
    </h4>
    <ul>
      <li>There is no support for tracking workload idle costs.</li>
      <li>
        The cost of individual pods are not tracked, only the aggregated cost of
        a workload and the namespace. There is no <code>pod_name</code> tag.
      </li>
      <li>
        GKE enriches data using pod labels only and ignores any Datadog tags you
        add.
      </li>
      <li>
        The full list of limitations can be found in the
        <a
          href="https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#limitations"
          >official GKE documentation</a
        >.
      </li>
    </ul>
    <p>
      To enable GKE cost allocation, see the
      <a
        href="https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#enable_breakdown"
        >official GKE documentation</a
      >.
    </p>
  </div>
  <h2 id="understanding-spend">Understanding spend</h2>
  <p>
    Use the <code>allocated_spend_type</code> tag to visualize the spend
    category associated with your costs at various levels, including the
    Kubernetes node, container orchestration host, storage volume, or entire
    cluster level.
  </p>
  <div
    class="cdoc__toggleable"
    data-description="Cloud Provider is AWS"
    data-if="6"
  >
    <h3 id="compute-4">Compute</h3>
    <p>
      The cost of a host instance is split into two components: 60% for the CPU
      and 40% for the memory. If the host instance has GPUs, the cost is split
      into three components: 95% for the GPU, 3% for the CPU, and 2% for the
      memory. Each component is allocated to individual workloads based on their
      resource reservations and usage.
    </p>
    <p>Costs are allocated into the following spend types:</p>
    <table>
      <thead>
        <tr>
          <th>Spend type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Usage</td>
          <td>
            Cost of resources (such as memory, CPU, and GPU) used by workloads,
            based on the average usage on that day.
          </td>
        </tr>
        <tr>
          <td>Workload idle</td>
          <td>
            Cost of resources (such as memory, CPU, and GPU) that are reserved
            and allocated but not used by workloads. This is the difference
            between the total resources requested and the average usage.
          </td>
        </tr>
        <tr>
          <td>Cluster idle</td>
          <td>
            Cost of resources (such as memory, CPU, and GPU) that are not
            reserved by workloads in a cluster. This is the difference between
            the total cost of the resources and what is allocated to workloads.
          </td>
        </tr>
      </tbody>
    </table>
    <h3 id="persistent-volume">Persistent volume</h3>
    <p>
      The cost of an EBS volume has three components: IOPS, throughput, and
      storage. Each is allocated according to a pod's usage when the volume is
      mounted.
    </p>
    <table>
      <thead>
        <tr>
          <th>Spend type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Usage</td>
          <td>
            Cost of provisioned IOPS, throughput, or storage used by workloads.
            Storage cost is based on the maximum amount of volume storage used
            that day, while IOPS and throughput costs are based on the average
            amount of volume storage used that day.
          </td>
        </tr>
        <tr>
          <td>Workload idle</td>
          <td>
            Cost of provisioned IOPS, throughput, or storage that are reserved
            and allocated but not used by workloads. Storage cost is based on
            the maximum amount of volume storage used that day, while IOPS and
            throughput costs are based on the average amount of volume storage
            used that day. This is the difference between the total resources
            requested and the average usage. <strong>Note:</strong> This tag is
            only available if you have enabled
            <code>Resource Collection</code> in your
            <a href="https://app.datadoghq.com/integrations/amazon-web-services"
              ><strong>AWS Integration</strong></a
            >. To prevent being charged for
            <code>Cloud Security Posture Management</code>, ensure that during
            the <code>Resource Collection</code> setup, the
            <code>Cloud Security Posture Management</code> box is unchecked.
          </td>
        </tr>
        <tr>
          <td>Cluster idle</td>
          <td>
            Cost of provisioned IOPS, throughput, or storage that are not
            reserved by any pods that day. This is the difference between the
            total cost of the resources and what is allocated to workloads.
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Note</strong>: Persistent volume allocation is only supported in
      Kubernetes clusters, and is only available for pods that are part of a
      Kubernetes StatefulSet.
    </p>
    <h3 id="data-transfer-2">Data transfer</h3>
    <p>Costs are allocated into the following spend types:</p>
    <table>
      <thead>
        <tr>
          <th>Spend type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Usage</td>
          <td>
            Cost of data transfer that is monitored by Cloud Network Monitoring
            and allocated.
          </td>
        </tr>
        <tr>
          <td>Not monitored</td>
          <td>
            Cost of data transfer not monitored by Cloud Network Monitoring.
            This cost is not allocated.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Cloud Provider is Azure"
    data-if="7"
  >
    <h3 id="compute-5">Compute</h3>
    <p>
      The cost of a host instance is split into two components: 60% for the CPU
      and 40% for the memory. If the host instance has GPUs, the cost is split
      into three components: 95% for the GPU, 3% for the CPU, and 2% for the
      memory. Each component is allocated to individual workloads based on their
      resource reservations and usage.
    </p>
    <p>Costs are allocated into the following spend types:</p>
    <table>
      <thead>
        <tr>
          <th>Spend type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Usage</td>
          <td>
            Cost of resources (such as memory, CPU, and GPU) used by workloads,
            based on the average usage on that day.
          </td>
        </tr>
        <tr>
          <td>Workload idle</td>
          <td>
            Cost of resources (such as memory, CPU, and GPU) that are reserved
            and allocated but not used by workloads. This is the difference
            between the total resources requested and the average usage.
          </td>
        </tr>
        <tr>
          <td>Cluster idle</td>
          <td>
            Cost of resources (such as memory, CPU, and GPU) that are not
            reserved by workloads in a cluster. This is the difference between
            the total cost of the resources and what is allocated to workloads.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Cloud Provider is Google"
    data-if="8"
  >
    <h3 id="compute-6">Compute</h3>
    <p>
      The cost of a host instance is split into two components: 60% for the CPU
      and 40% for the memory. If the host instance has GPUs, the cost is split
      into three components: 95% for the GPU, 3% for the CPU, and 2% for the
      memory. Each component is allocated to individual workloads based on their
      resource reservations and usage.
    </p>
    <p>Costs are allocated into the following spend types:</p>
    <table>
      <thead>
        <tr>
          <th>Spend type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Usage</td>
          <td>
            Cost of resources (such as memory, CPU, and GPU) used by workloads,
            based on the average usage on that day.
          </td>
        </tr>
        <tr>
          <td>Workload idle</td>
          <td>
            Cost of resources (such as memory, CPU, and GPU) that are reserved
            and allocated but not used by workloads. This is the difference
            between the total resources requested and the average usage.
          </td>
        </tr>
        <tr>
          <td>Cluster idle</td>
          <td>
            Cost of resources (such as memory, CPU, and GPU) that are not
            reserved by workloads in a cluster. This is the difference between
            the total cost of the resources and what is allocated to workloads.
          </td>
        </tr>
        <tr>
          <td>Not monitored</td>
          <td>
            Cost of resources where the spend type is unknown. To resolve this,
            install the Datadog Agent on these clusters or nodes.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h2 id="understanding-resources">Understanding resources</h2>
  <p>
    Depending on the cloud provider, certain resources may or may not be
    available for cost allocation.
  </p>
  <h2 id="plain-tooltip">Plain tooltip</h2>
  <p>
    This sentence
    <!-- prettier-ignore -->
    <span class="tooltip-container"><button class="tooltip-trigger" aria-describedby="tooltip-uses-a-tooltip">uses a tooltip</button><span id="tooltip-uses-a-tooltip" class="tooltip-content" role="tooltip">I'm the tooltip text</span></span
    >.
  </p>
  <h2 id="tooltip-with-html-link">Tooltip with HTML link</h2>
  <p>
    This sentence
    <!-- prettier-ignore -->
    <span class="tooltip-container"><button class="tooltip-trigger" aria-describedby="tooltip-uses-a-tooltip">uses a tooltip</button><span id="tooltip-uses-a-tooltip" class="tooltip-content" role="tooltip">I'm the tooltip text, and I link to <a href='https://www.google.com'>Google</a>!</span></span
    >.
  </p>
  <table>
    <thead>
      <tr>
        <th align="right">Resource</th>
        <th align="right">AWS</th>
        <th>Azure</th>
        <th>Google Cloud</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="right">CPU</td>
        <td align="right"><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
      </tr>
      <tr>
        <td align="right">Memory</td>
        <td align="right"><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
      </tr>
      <tr>
        <td align="right">
          <!-- prettier-ignore -->
          <span class="tooltip-container"><button class="tooltip-trigger" aria-describedby="tooltip--persistent-volumes-"> Persistent volumes </button><span id="tooltip--persistent-volumes-" class="tooltip-content" role="tooltip">Storage resources within a cluster, provisioned by administrators or dynamically, that persist data independently of pod lifecycles.</span></span>
        </td>
        <td align="right"><i class="icon-check-bold"></i></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td align="right">
          <!-- prettier-ignore -->
          <span class="tooltip-container"><button class="tooltip-trigger" aria-describedby="tooltip--managed-service-fees-"> Managed service fees </button><span id="tooltip--managed-service-fees-" class="tooltip-content" role="tooltip">Cost of associated fees charged by the cloud provider for managing the cluster, such as fees for managed Kubernetes services or other container orchestration options.</span></span>
        </td>
        <td align="right"><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
      </tr>
      <tr>
        <td align="right">ECS costs</td>
        <td align="right"><i class="icon-check-bold"></i></td>
        <td>N/A</td>
        <td>N/A</td>
      </tr>
      <tr>
        <td align="right">Data transfer costs</td>
        <td align="right"><i class="icon-check-bold"></i></td>
        <td>Limited*</td>
        <td>Limited*</td>
      </tr>
      <tr>
        <td align="right">GPU</td>
        <td align="right"><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
        <td><i class="icon-check-bold"></i></td>
      </tr>
      <tr>
        <td align="right">
          <!-- prettier-ignore -->
          <span class="tooltip-container"><button class="tooltip-trigger" aria-describedby="tooltip--local-storage-"> Local storage </button><span id="tooltip--local-storage-" class="tooltip-content" role="tooltip">Directly-attached storage resources for a node.</span></span>
        </td>
        <td align="right"></td>
        <td>Limited*</td>
        <td>Limited*</td>
      </tr>
    </tbody>
  </table>
  <p>
    <code>Limited*</code> resources have been identified as part of your
    Kubernetes spend, but are not fully allocated to specific workloads or pods.
    These resources are host-level costs, not pod or namespace-level costs, and
    are identified with
    <code>allocated_spend_type:&lt;resource&gt;_not_supported</code>.
  </p>
  <h2 id="cost-metrics">Cost metrics</h2>
  <p>
    When the prerequisites are met, the following cost metrics automatically
    appear.
  </p>
  <div
    class="cdoc__toggleable"
    data-description="Cloud Provider is AWS"
    data-if="9"
  >
    <table>
      <thead>
        <tr>
          <th>Cost Metric</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>aws.cost.amortized.shared.resources.allocated</code></td>
          <td>
            EC2 costs allocated by the CPU &amp; memory used by a pod or ECS
            task, using a 60:40 split for CPU &amp; memory respectively and a
            95:3:2 split for GPU, CPU, &amp; memory respectively if a GPU is
            used by a pod. Also includes allocated EBS costs. &lt;br&gt;
            <em>Based on <code>aws.cost.amortized</code></em>
          </td>
        </tr>
        <tr>
          <td>
            <code>aws.cost.net.amortized.shared.resources.allocated</code>
          </td>
          <td>
            Net EC2 costs allocated by CPU &amp; memory used by a pod or ECS
            task, using a 60:40 split for CPU &amp; memory respectively and a
            95:3:2 split for GPU, CPU, &amp; memory respectively if a GPU is
            used by a pod. Also includes allocated EBS costs. &lt;br&gt;
            <em>Based on <code>aws.cost.net.amortized</code>, if available</em>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Cloud Provider is Azure"
    data-if="10"
  >
    <table>
      <thead>
        <tr>
          <th>Cost Metric</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>azure.cost.amortized.shared.resources.allocated</code></td>
          <td>
            Azure VM costs allocated by the CPU &amp; memory used by a pod or
            container task, using a 60:40 split for CPU &amp; memory
            respectively and a 95:3:2 split for GPU, CPU, &amp; memory
            respectively if a GPU is used by a pod. Also includes allocated
            Azure costs. &lt;br&gt;
            <em>Based on <code>azure.cost.amortized</code></em>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Cloud Provider is Google"
    data-if="11"
  >
    <table>
      <thead>
        <tr>
          <th>Cost Metric</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>gcp.cost.amortized.shared.resources.allocated</code></td>
          <td>
            Google Compute Engine costs allocated by the CPU &amp; memory used
            by a pod, using 60:40 split for CPU &amp; memory respectively and a
            95:3:2 split for GPU, CPU, &amp; memory respectively if a GPU is
            used by a pod. This allocation method is used when the bill does not
            already provide a specific split between CPU and memory usage.
            &lt;br&gt; <em>Based on <code>gcp.cost.amortized</code></em>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>
    These cost metrics include all of your cloud costs. This allows you to
    continue visualizing all of your cloud costs at one time.
  </p>
  <p>
    For example, say you have the tag <code>team</code> on a storage bucket, a
    cloud provider managed database, and Kubernetes pods. You can use these
    metrics to group costs by <code>team</code>, which includes the costs for
    all three.
  </p>
  <h2 id="applying-tags">Applying tags</h2>
  <p>
    Datadog consolidates and applies the following tags from various sources to
    cost metrics.
  </p>
  <div
    class="cdoc__toggleable"
    data-description="Cloud Provider is AWS"
    data-if="12"
  >
    <h3 id="kubernetes">Kubernetes</h3>
    <p>
      In addition to Kubernetes pod and Kubernetes node tags, the following
      non-exhaustive list of out-of-the-box tags are applied to cost metrics:
    </p>
    <table>
      <thead>
        <tr>
          <th>Out-of-the-box tag</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>orchestrator:kubernetes</code></td>
          <td>
            The orchestration platform associated with the item is Kubernetes.
          </td>
        </tr>
        <tr>
          <td><code>kube_cluster_name</code></td>
          <td>The name of the Kubernetes cluster.</td>
        </tr>
        <tr>
          <td><code>kube_namespace</code></td>
          <td>The namespace where workloads are running.</td>
        </tr>
        <tr>
          <td><code>kube_deployment</code></td>
          <td>The name of the Kubernetes Deployment.</td>
        </tr>
        <tr>
          <td><code>kube_stateful_set</code></td>
          <td>The name of the Kubernetes StatefulSet.</td>
        </tr>
        <tr>
          <td><code>pod_name</code></td>
          <td>The name of any individual pod.</td>
        </tr>
      </tbody>
    </table>
    <p>
      Conflicts are resolved by favoring higher-specificity tags such as pod
      tags over lower-specificity tags such as host tags. For example, a
      Kubernetes pod tagged <code>service:datadog-agent</code> running on a node
      tagged <code>service:aws-node</code> results in a final tag
      <code>service:datadog-agent</code>.
    </p>
    <h4 id="persistent-volume-2">Persistent volume</h4>
    <p>
      In addition to Kubernetes pod and Kubernetes node tags, the following
      out-of-the-box tags are applied to cost metrics.
    </p>
    <table>
      <thead>
        <tr>
          <th>Out-of-the-box tag</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>persistent_volume_reclaim_policy</code></td>
          <td>The Kubernetes Reclaim Policy on the Persistent Volume.</td>
        </tr>
        <tr>
          <td><code>storage_class_name</code></td>
          <td>
            The Kubernetes Storage Class used to instantiate the Persistent
            Volume.
          </td>
        </tr>
        <tr>
          <td><code>volume_mode</code></td>
          <td>The Volume Mode of the Persistent Volume.</td>
        </tr>
        <tr>
          <td><code>ebs_volume_type</code></td>
          <td>
            The type of the EBS volume. Can be <code>gp3</code>,
            <code>gp2</code>, or others.
          </td>
        </tr>
      </tbody>
    </table>
    <h3 id="amazon-ecs">Amazon ECS</h3>
    <p>
      In addition to ECS task tags, the following out-of-the-box tags are
      applied to cost metrics.
    </p>
    <p>
      <strong>Note</strong>: Most tags from ECS containers are applied
      (excluding <code>container_name</code>).
    </p>
    <table>
      <thead>
        <tr>
          <th>Out-of-the-box tag</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>orchestrator:ecs</code></td>
          <td>
            The orchestration platform associated with the item is Amazon ECS.
          </td>
        </tr>
        <tr>
          <td><code>ecs_cluster_name</code></td>
          <td>The name of the ECS cluster.</td>
        </tr>
        <tr>
          <td><code>is_aws_ecs</code></td>
          <td>All costs associated with running ECS.</td>
        </tr>
        <tr>
          <td><code>is_aws_ecs_on_ec2</code></td>
          <td>All EC2 compute costs associated with running ECS on EC2.</td>
        </tr>
        <tr>
          <td><code>is_aws_ecs_on_fargate</code></td>
          <td>All costs associated with running ECS on Fargate.</td>
        </tr>
      </tbody>
    </table>
    <h3 id="data-transfer-3">Data transfer</h3>
    <p>
      The following list of out-of-the-box tags are applied to cost metrics
      associated with Kubernetes workloads:
    </p>
    <table>
      <thead>
        <tr>
          <th>Out-of-the-box tag</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>source_availability_zone</code></td>
          <td>The availability zone name where data transfer originated.</td>
        </tr>
        <tr>
          <td><code>source_availability_zone_id</code></td>
          <td>The availability zone ID where data transfer originated.</td>
        </tr>
        <tr>
          <td><code>source_region</code></td>
          <td>The region where data transfer originated.</td>
        </tr>
        <tr>
          <td><code>destination_availability_zone</code></td>
          <td>The availability zone name where data transfer was sent to.</td>
        </tr>
        <tr>
          <td><code>destination_availability_zone_id</code></td>
          <td>The availability zone ID where data transfer was sent to.</td>
        </tr>
        <tr>
          <td><code>destination_region</code></td>
          <td>The region where data transfer was sent to.</td>
        </tr>
        <tr>
          <td><code>allocated_resource:data_transfer</code></td>
          <td>
            The tracking and allocation of costs associated with data transfer
            activities.
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      In addition, some Kubernetes pod tags that are common between all pods on
      the same node are also applied.
    </p>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Cloud Provider is Azure"
    data-if="13"
  >
    <h3 id="kubernetes-2">Kubernetes</h3>
    <p>
      In addition to Kubernetes pod and Kubernetes node tags, the following
      non-exhaustive list of out-of-the-box tags are applied to cost metrics:
    </p>
    <table>
      <thead>
        <tr>
          <th>Out-of-the-box tag</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>orchestrator:kubernetes</code></td>
          <td>
            The orchestration platform associated with the item is Kubernetes.
          </td>
        </tr>
        <tr>
          <td><code>kube_cluster_name</code></td>
          <td>The name of the Kubernetes cluster.</td>
        </tr>
        <tr>
          <td><code>kube_namespace</code></td>
          <td>The namespace where workloads are running.</td>
        </tr>
        <tr>
          <td><code>kube_deployment</code></td>
          <td>The name of the Kubernetes Deployment.</td>
        </tr>
        <tr>
          <td><code>kube_stateful_set</code></td>
          <td>The name of the Kubernetes StatefulSet.</td>
        </tr>
        <tr>
          <td><code>pod_name</code></td>
          <td>The name of any individual pod.</td>
        </tr>
        <tr>
          <td><code>allocated_resource:data_transfer</code></td>
          <td>
            The tracking and allocation of costs associated with data transfer
            activities used by Azure services or workloads.
          </td>
        </tr>
        <tr>
          <td><code>allocated_resource:local_storage</code></td>
          <td>
            The tracking and allocation of costs at a host level associated with
            local storage resources used by Azure services or workloads.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Cloud Provider is Google"
    data-if="14"
  >
    <h3 id="kubernetes-3">Kubernetes</h3>
    <p>
      In addition to Kubernetes pod and Kubernetes node tags, the following
      non-exhaustive list of out-of-the-box tags are applied to cost metrics:
    </p>
    <table>
      <thead>
        <tr>
          <th>Out-of-the-box tag</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>orchestrator:kubernetes</code></td>
          <td>
            The orchestration platform associated with the item is Kubernetes.
          </td>
        </tr>
        <tr>
          <td><code>kube_cluster_name</code></td>
          <td>The name of the Kubernetes cluster.</td>
        </tr>
        <tr>
          <td><code>kube_namespace</code></td>
          <td>The namespace where workloads are running.</td>
        </tr>
        <tr>
          <td><code>kube_deployment</code></td>
          <td>The name of the Kubernetes Deployment.</td>
        </tr>
        <tr>
          <td><code>kube_stateful_set</code></td>
          <td>The name of the Kubernetes StatefulSet.</td>
        </tr>
        <tr>
          <td><code>pod_name</code></td>
          <td>The name of any individual pod.</td>
        </tr>
        <tr>
          <td><code>allocated_spend_type:not_monitored</code></td>
          <td>
            The tracking and allocation of
            <a href="#agentless-kubernetes-costs">Agentless Kubernetes costs</a>
            associated with resources used by Google Cloud services or
            workloads, and the Datadog Agent is not monitoring those resources.
          </td>
        </tr>
        <tr>
          <td><code>allocated_resource:data_transfer</code></td>
          <td>
            The tracking and allocation of costs associated with data transfer
            activities used by Google Cloud services or workloads.
          </td>
        </tr>
        <tr>
          <td><code>allocated_resource:gpu</code></td>
          <td>
            The tracking and allocation of costs at a host level associated with
            GPU resources used by Google Cloud services or workloads.
          </td>
        </tr>
        <tr>
          <td><code>allocated_resource:local_storage</code></td>
          <td>
            The tracking and allocation of costs at a host level associated with
            local storage resources used by Google Cloud services or workloads.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/cloud_cost_management/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn about Cloud Cost Management</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"aws"},"v":true,"r":"0"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"azure"},"v":false,"r":"1"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"google"},"v":false,"r":"2"},"3":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"aws"},"v":true,"r":"3"},"4":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"azure"},"v":false,"r":"4"},"5":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"google"},"v":false,"r":"5"},"6":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"aws"},"v":true,"r":"6"},"7":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"azure"},"v":false,"r":"7"},"8":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"google"},"v":false,"r":"8"},"9":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"aws"},"v":true,"r":"9"},"10":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"azure"},"v":false,"r":"10"},"11":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"google"},"v":false,"r":"11"},"12":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"aws"},"v":true,"r":"12"},"13":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"azure"},"v":false,"r":"13"},"14":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"aws"},"1":"google"},"v":false,"r":"14"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"cloud_cost_provider_options","label":"Cloud Provider"},"defaultValsByOptionGroupId":{"cloud_cost_provider_options":"aws"}}},"defaultValsByTraitId":{"platform":"aws"},"optionGroupsById":{"cloud_cost_provider_options":[{"default":true,"id":"aws","label":"AWS"},{"id":"azure","label":"Azure"},{"id":"google","label":"Google"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>

{{< img src="cloud_cost/container_cost_allocation/container_allocation.png" style="display:none;" alt="" >}}

