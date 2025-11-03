---
title: Configure the Datadog Operator
---

This page lists commonly-used configuration parameters for the Datadog Operator. For all configuration parameters, see the [configuration spec][1] in the [`DataDog/datadog-operator`][2] repo.

### Example manifests

* [Manifest with logs, APM, process, and metrics collection enabled][3]
* [Manifest with logs, APM, and metrics collection enabled][4]
* [Manifest with APM and metrics collection enabled][5]
* [Manifest with Cluster Agent][6]
* [Manifest with tolerations][7]

## Global options

The table in this section lists configurable parameters for the `DatadogAgent` resource. To override parameters for individual components (Node Agent, Cluster Agent, or Cluster Checks Runner) see [override options](#override-options).

For example: the following manifest uses the `global.clusterName` parameter to set a custom cluster name:

{{< highlight yaml "hl_lines=7" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: my-test-cluster
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
{{< /highlight >}}

{{% collapse-content title="Parameters" level="h4" expanded=true id="global-options-list" %}}
`features.admissionController.agentCommunicationMode`
: AgentCommunicationMode corresponds to the mode used by the Datadog application libraries to communicate with the Agent. It can be "hostip", "service", or "socket".

`features.admissionController.agentSidecarInjection`
: AgentSidecarInjection contains Agent sidecar injection configurations. See [link](https://docs.datadoghq.com/integrations/eks_fargate/?tab=admissioncontrollerdatadogoperator) for more information.

`features.admissionController.cwsInstrumentation.enabled`
: Enable the CWS Instrumentation admission controller endpoint. Default: false

`features.admissionController.cwsInstrumentation.mode`
: Defines the behavior of the CWS Instrumentation endpoint, and can be either "init_container" or "remote_copy". Default: "remote_copy"

`features.admissionController.enabled`
: Enables the Admission Controller. Default: true

`features.admissionController.failurePolicy`
: FailurePolicy determines how unrecognized and timeout errors are handled.

`features.admissionController.kubernetesAdmissionEvents.enabled`
: Enable the Kubernetes Admission Events feature. Default: false

`features.admissionController.mutateUnlabelled`
: MutateUnlabelled enables config injection without the need of pod label 'admission.datadoghq.com/enabled="true"'. Default: false

`features.admissionController.mutation.enabled`
: Enables the Admission Controller mutation webhook. Default: true

`features.admissionController.registry`
: Defines an image registry for the admission controller.

`features.admissionController.serviceName`
: ServiceName corresponds to the webhook service name.

`features.admissionController.validation.enabled`
: Enables the Admission Controller validation webhook. Default: true

`features.admissionController.webhookName`
: WebhookName is a custom name for the MutatingWebhookConfiguration. Default: "datadog-webhook"

`features.apm.enabled`
: Enables Application Performance Monitoring. Default: true

`features.apm.errorTrackingStandalone.enabled`
: Enables Error Tracking for backend services. Default: false

`features.apm.hostPortConfig.enabled`
: Enables host port configuration

`features.apm.hostPortConfig.hostPort`
: Port takes a port number (0 < x < 65536) to expose on the host. (Most containers do not need this.) If HostNetwork is enabled, this value must match the ContainerPort.

`features.apm.instrumentation`
: SingleStepInstrumentation allows the agent to inject the Datadog APM libraries into all pods in the cluster. Feature is in beta. See also: https://docs.datadoghq.com/tracing/trace_collection/single-step-apm Enabled Default: false

`features.apm.unixDomainSocketConfig.enabled`
: Enables Unix Domain Socket. Default: true

`features.apm.unixDomainSocketConfig.path`
: Defines the socket path used when enabled.

`features.asm.iast.enabled`
: Enables Interactive Application Security Testing (IAST). Default: false

`features.asm.sca.enabled`
: Enables Software Composition Analysis (SCA). Default: false

`features.asm.threats.enabled`
: Enables ASM App & API Protection. Default: false

`features.autoscaling.workload.enabled`
: Enables the workload autoscaling product. Default: false

`features.clusterChecks.enabled`
: Enables Cluster Checks scheduling in the Cluster Agent. Default: true

`features.clusterChecks.useClusterChecksRunners`
: Enabled enables Cluster Checks Runners to run all Cluster Checks. Default: false

`features.controlPlaneMonitoring.enabled`
: Enables control plane monitoring checks in the cluster agent. Default: true

`features.cspm.checkInterval`
: CheckInterval defines the check interval.

`features.cspm.customBenchmarks`
: CustomBenchmarks contains CSPM benchmarks. The content of the ConfigMap will be merged with the benchmarks bundled with the agent. Any benchmarks with the same name as those existing in the agent will take precedence.

`features.cspm.enabled`
: Enables Cloud Security Posture Management. Default: false

`features.cspm.hostBenchmarks.enabled`
: Enables host benchmarks. Default: true

`features.cws.customPolicies.configData`
: ConfigData corresponds to the configuration file content.

`features.cws.customPolicies.configMap.items`
: Maps a ConfigMap data `key` to a file `path` mount.

`features.cws.customPolicies.configMap.name`
: Is the name of the ConfigMap.

`features.cws.directSendFromSystemProbe`
: DirectSendFromSystemProbe configures CWS to send payloads directly from the system-probe, without using the security-agent. This is an experimental feature. Contact support before using. Default: false

`features.cws.enabled`
: Enables Cloud Workload Security. Default: false

`features.cws.network.enabled`
: Enables Cloud Workload Security Network detections. Default: true

`features.cws.remoteConfiguration.enabled`
: Enables Remote Configuration for Cloud Workload Security. Default: true

`features.cws.securityProfiles.enabled`
: Enables Security Profiles collection for Cloud Workload Security. Default: true

`features.cws.syscallMonitorEnabled`
: SyscallMonitorEnabled enables Syscall Monitoring (recommended for troubleshooting only). Default: false

`features.dogstatsd.hostPortConfig.enabled`
: Enables host port configuration

`features.dogstatsd.hostPortConfig.hostPort`
: Port takes a port number (0 < x < 65536) to expose on the host. (Most containers do not need this.) If HostNetwork is enabled, this value must match the ContainerPort.

`features.dogstatsd.mapperProfiles.configData`
: ConfigData corresponds to the configuration file content.

`features.dogstatsd.mapperProfiles.configMap.items`
: Maps a ConfigMap data `key` to a file `path` mount.

`features.dogstatsd.mapperProfiles.configMap.name`
: Is the name of the ConfigMap.

`features.dogstatsd.nonLocalTraffic`
: NonLocalTraffic enables non-local traffic for Dogstatsd. Default: true

`features.dogstatsd.originDetectionEnabled`
: OriginDetectionEnabled enables origin detection for container tagging. See also: https://docs.datadoghq.com/developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging

`features.dogstatsd.tagCardinality`
: TagCardinality configures tag cardinality for the metrics collected using origin detection (`low`, `orchestrator` or `high`). See also: https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables Cardinality default: low

`features.dogstatsd.unixDomainSocketConfig.enabled`
: Enables Unix Domain Socket. Default: true

`features.dogstatsd.unixDomainSocketConfig.path`
: Defines the socket path used when enabled.

`features.ebpfCheck.enabled`
: Enables the eBPF check. Default: false

`features.eventCollection.collectKubernetesEvents`
: CollectKubernetesEvents enables Kubernetes event collection. Default: true

`features.eventCollection.collectedEventTypes`
: CollectedEventTypes defines the list of events to collect when UnbundleEvents is enabled. Default: [ {"kind":"Pod","reasons":["Failed","BackOff","Unhealthy","FailedScheduling","FailedMount","FailedAttachVolume"]}, {"kind":"Node","reasons":["TerminatingEvictedPod","NodeNotReady","Rebooted","HostPortConflict"]}, {"kind":"CronJob","reasons":["SawCompletedJob"]} ]

`features.eventCollection.unbundleEvents`
: UnbundleEvents enables collection of Kubernetes events as individual events. Default: false

`features.externalMetricsServer`
: ExternalMetricsServer configuration. See [link](https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md) for more information.

`features.gpu.enabled`
: Enables GPU monitoring core check. Default: false

`features.gpu.patchCgroupPermissions`
: PatchCgroupPermissions enables the patch of cgroup permissions for GPU monitoring, in case the container runtime is not properly configured and the Agent containers lose access to GPU devices. Default: false

`features.gpu.privilegedMode`
: PrivilegedMode enables GPU Probe module in System Probe. Default: false

`features.gpu.requiredRuntimeClassName`
: PodRuntimeClassName specifies the runtime class name required for the GPU monitoring feature. If the value is an empty string, the runtime class is not set. Default: nvidia

`features.helmCheck.collectEvents`
: CollectEvents set to `true` enables event collection in the Helm check (Requires Agent 7.36.0+ and Cluster Agent 1.20.0+) Default: false

`features.helmCheck.enabled`
: Enables the Helm check. Default: false

`features.helmCheck.valuesAsTags`
: ValuesAsTags collects Helm values from a release and uses them as tags (Requires Agent and Cluster Agent 7.40.0+). Default: {}

`features.kubeStateMetricsCore.collectCrMetrics`
: `CollectCrMetrics` defines custom resources for the kube-state-metrics core check to collect.  The datadog agent uses the same logic as upstream `kube-state-metrics`. So is its configuration. The exact structure and existing fields of each item in this list can be found in: https://github.com/kubernetes/kube-state-metrics/blob/main/docs/metrics/extend/customresourcestate-metrics.md

`features.kubeStateMetricsCore.conf.configData`
: ConfigData corresponds to the configuration file content.

`features.kubeStateMetricsCore.conf.configMap.items`
: Maps a ConfigMap data `key` to a file `path` mount.

`features.kubeStateMetricsCore.conf.configMap.name`
: Is the name of the ConfigMap.

`features.kubeStateMetricsCore.enabled`
: Enables Kube State Metrics Core. Default: true

`features.liveContainerCollection.enabled`
: Enables container collection for the Live Container View. Default: true

`features.liveProcessCollection.enabled`
: Enables Process monitoring. Default: false

`features.liveProcessCollection.scrubProcessArguments`
: ScrubProcessArguments enables scrubbing of sensitive data in process command-lines (passwords, tokens, etc. ). Default: true

`features.liveProcessCollection.stripProcessArguments`
: StripProcessArguments enables stripping of all process arguments. Default: false

`features.logCollection.autoMultiLineDetection`
: AutoMultiLineDetection allows the Agent to detect and aggregate common multi-line logs automatically. See also: https://docs.datadoghq.com/agent/logs/auto_multiline_detection/

`features.logCollection.containerCollectAll`
: ContainerCollectAll enables Log collection from all containers. Default: false

`features.logCollection.containerCollectUsingFiles`
: ContainerCollectUsingFiles enables log collection from files in `/var/log/pods instead` of using the container runtime API. Collecting logs from files is usually the most efficient way of collecting logs. See also: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup Default: true

`features.logCollection.containerLogsPath`
: ContainerLogsPath allows log collection from the container log path. Set to a different path if you are not using the Docker runtime. See also: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#create-manifest Default: `/var/lib/docker/containers`

`features.logCollection.containerSymlinksPath`
: ContainerSymlinksPath allows log collection to use symbolic links in this directory to validate container ID -> pod. Default: `/var/log/containers`

`features.logCollection.enabled`
: Enables Log collection. Default: false

`features.logCollection.openFilesLimit`
: OpenFilesLimit sets the maximum number of log files that the Datadog Agent tails. Increasing this limit can increase resource consumption of the Agent. See also: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup Default: 100

`features.logCollection.podLogsPath`
: PodLogsPath allows log collection from a pod log path. Default: `/var/log/pods`

`features.logCollection.tempStoragePath`
: TempStoragePath (always mounted from the host) is used by the Agent to store information about processed log files. If the Agent is restarted, it starts tailing the log files immediately. Default: `/var/lib/datadog-agent/logs`

`features.npm.collectDNSStats`
: CollectDNSStats enables DNS stat collection. Default: false

`features.npm.enableConntrack`
: EnableConntrack enables the system-probe agent to connect to the netlink/conntrack subsystem to add NAT information to connection data. See also: http://conntrack-tools.netfilter.org/ Default: false

`features.npm.enabled`
: Enables Network Performance Monitoring. Default: false

`features.oomKill.enabled`
: Enables the OOMKill eBPF-based check. Default: false

`features.orchestratorExplorer.conf.configData`
: ConfigData corresponds to the configuration file content.

`features.orchestratorExplorer.conf.configMap.items`
: Maps a ConfigMap data `key` to a file `path` mount.

`features.orchestratorExplorer.conf.configMap.name`
: Is the name of the ConfigMap.

`features.orchestratorExplorer.customResources`
: `CustomResources` defines custom resources for the orchestrator explorer to collect. Each item should follow the convention `group/version/kind`. For example, `datadoghq.com/v1alpha1/datadogmetrics`.

`features.orchestratorExplorer.ddUrl`
: Override the API endpoint for the Orchestrator Explorer. URL Default: "https://orchestrator.datadoghq.com".

`features.orchestratorExplorer.enabled`
: Enables the Orchestrator Explorer. Default: true

`features.orchestratorExplorer.extraTags`
: Additional tags to associate with the collected data in the form of `a b c`. This is a Cluster Agent option distinct from DD_TAGS that is used in the Orchestrator Explorer.

`features.orchestratorExplorer.scrubContainers`
: ScrubContainers enables scrubbing of sensitive container data (passwords, tokens, etc. ). Default: true

`features.otelCollector`
: OtelCollector configuration. See [link](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator#overview) for more information.

`features.otlp`
: OTLP ingest configuration See [link](https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest_in_the_agent/?tab=kubernetesoperator) for more information.

`features.processDiscovery.enabled`
: Enables the Process Discovery check in the Agent. Default: true

`features.prometheusScrape.additionalConfigs`
: AdditionalConfigs allows adding advanced Prometheus check configurations with custom discovery rules.

`features.prometheusScrape.enableServiceEndpoints`
: EnableServiceEndpoints enables generating dedicated checks for service endpoints. Default: false

`features.prometheusScrape.enabled`
: Enable autodiscovery of pods and services exposing Prometheus metrics. Default: false

`features.prometheusScrape.version`
: Specifies the version of the OpenMetrics check. Default: 2

`features.remoteConfiguration.enabled`
: Enable this option to activate Remote Configuration. Default: true

`features.sbom.containerImage.analyzers`
: To use for SBOM collection.

`features.sbom.containerImage.enabled`
: Enable this option to activate SBOM collection. Default: false

`features.sbom.containerImage.overlayFSDirectScan`
: Enable this option to enable experimental overlayFS direct scan. Default: false

`features.sbom.containerImage.uncompressedLayersSupport`
: Enable this option to enable support for uncompressed layers. Default: false

`features.sbom.enabled`
: Enable this option to activate SBOM collection. Default: false

`features.sbom.host.analyzers`
: To use for SBOM collection.

`features.sbom.host.enabled`
: Enable this option to activate SBOM collection. Default: false

`features.serviceDiscovery.enabled`
: Enables the service discovery check. Default: false

`features.serviceDiscovery.networkStats.enabled`
: Enables the Service Discovery Network Stats feature. Default: true

`features.tcpQueueLength.enabled`
: Enables the TCP queue length eBPF-based check. Default: false

`features.usm.enabled`
: Enables Universal Service Monitoring. Default: false

`global.checksTagCardinality`
: ChecksTagCardinality configures tag cardinality for the metrics collected by integrations (`low`, `orchestrator` or `high`). See also: https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality. Not set by default to avoid overriding existing DD_CHECKS_TAG_CARDINALITY configurations, the default value in the Agent is low. Ref: https://github.com/DataDog/datadog-agent/blob/856cf4a66142ce91fd4f8a278149436eb971184a/pkg/config/setup/config.go#L625.

`global.clusterAgentToken`
: ClusterAgentToken is the token for communication between the NodeAgent and ClusterAgent.

`global.clusterAgentTokenSecret.keyName`
: KeyName is the key of the secret to use.

`global.clusterAgentTokenSecret.secretName`
: SecretName is the name of the secret.

`global.clusterName`
: ClusterName sets a unique cluster name for the deployment to easily scope monitoring data in the Datadog app.

`global.containerStrategy`
: ContainerStrategy determines whether agents run in a single or multiple containers. Default: 'optimized'

`global.credentials.apiKey`
: APIKey configures your Datadog API key. See also: https://app.datadoghq.com/account/settings#agent/kubernetes

`global.credentials.apiSecret.keyName`
: KeyName is the key of the secret to use.

`global.credentials.apiSecret.secretName`
: SecretName is the name of the secret.

`global.credentials.appKey`
: AppKey configures your Datadog application key. If you are using features.externalMetricsServer.enabled = true, you must set a Datadog application key for read access to your metrics.

`global.credentials.appSecret.keyName`
: KeyName is the key of the secret to use.

`global.credentials.appSecret.secretName`
: SecretName is the name of the secret.

`global.criSocketPath`
: Path to the container runtime socket (if different from Docker).

`global.csi.enabled`
: Enables the usage of CSI driver in Datadog Agent. Requires installation of Datadog CSI Driver https://github.com/DataDog/helm-charts/tree/main/charts/datadog-csi-driver Default: false

`global.disableNonResourceRules`
: Set DisableNonResourceRules to exclude NonResourceURLs from default ClusterRoles. Required 'true' for Google Cloud Marketplace.

`global.dockerSocketPath`
: Path to the docker runtime socket.

`global.endpoint.credentials.apiKey`
: APIKey configures your Datadog API key. See also: https://app.datadoghq.com/account/settings#agent/kubernetes

`global.endpoint.credentials.apiSecret.keyName`
: KeyName is the key of the secret to use.

`global.endpoint.credentials.apiSecret.secretName`
: SecretName is the name of the secret.

`global.endpoint.credentials.appKey`
: AppKey configures your Datadog application key. If you are using features.externalMetricsServer.enabled = true, you must set a Datadog application key for read access to your metrics.

`global.endpoint.credentials.appSecret.keyName`
: KeyName is the key of the secret to use.

`global.endpoint.credentials.appSecret.secretName`
: SecretName is the name of the secret.

`global.endpoint.url`
: URL defines the endpoint URL.

`global.env`
: Contains a list of environment variables that are set for all Agents.

`global.fips`
: FIPS contains configuration used to customize the FIPS proxy sidecar. See [link](https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md) for more information.

`global.kubelet.agentCAPath`
: AgentCAPath is the container path where the kubelet CA certificate is stored. Default: '/var/run/host-kubelet-ca.crt' if hostCAPath is set, else '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'

`global.kubelet.host.configMapKeyRef.key`
: The key to select.

`global.kubelet.host.configMapKeyRef.name`
: Of the referent. This field is effectively required, but due to backwards compatibility is allowed to be empty. Instances of this type with an empty value here are almost certainly wrong. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

`global.kubelet.host.configMapKeyRef.optional`
: Specify whether the ConfigMap or its key must be defined

`global.kubelet.host.fieldRef.apiVersion`
: Version of the schema the FieldPath is written in terms of, defaults to "v1".

`global.kubelet.host.fieldRef.fieldPath`
: Path of the field to select in the specified API version.

`global.kubelet.host.resourceFieldRef.containerName`
: Container name: required for volumes, optional for env vars

`global.kubelet.host.resourceFieldRef.divisor`
: Specifies the output format of the exposed resources, defaults to "1"

`global.kubelet.host.resourceFieldRef.resource`
: Required: resource to select

`global.kubelet.host.secretKeyRef.key`
: The key of the secret to select from.  Must be a valid secret key.

`global.kubelet.host.secretKeyRef.name`
: Of the referent. This field is effectively required, but due to backwards compatibility is allowed to be empty. Instances of this type with an empty value here are almost certainly wrong. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

`global.kubelet.host.secretKeyRef.optional`
: Specify whether the Secret or its key must be defined

`global.kubelet.hostCAPath`
: HostCAPath is the host path where the kubelet CA certificate is stored.

`global.kubelet.podResourcesSocketPath`
: PodResourcesSocketPath is the host path where the pod resources socket is stored. Default: `/var/lib/kubelet/pod-resources/`

`global.kubelet.tlsVerify`
: TLSVerify toggles kubelet TLS verification. Default: true

`global.kubernetesResourcesAnnotationsAsTags`
: Provide a mapping of Kubernetes Resource Groups to annotations mapping to Datadog Tags. <KUBERNETES_RESOURCE_GROUP>: 		<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY> KUBERNETES_RESOURCE_GROUP should be in the form `{resource}.{group}` or `{resource}` (example: deployments.apps, pods)

`global.kubernetesResourcesLabelsAsTags`
: Provide a mapping of Kubernetes Resource Groups to labels mapping to Datadog Tags. <KUBERNETES_RESOURCE_GROUP>: 		<KUBERNETES_LABEL>: <DATADOG_TAG_KEY> KUBERNETES_RESOURCE_GROUP should be in the form `{resource}.{group}` or `{resource}` (example: deployments.apps, pods)

`global.localService.forceEnableLocalService`
: ForceEnableLocalService forces the creation of the internal traffic policy service to target the agent running on the local node. This parameter only applies to Kubernetes 1.21, where the feature is in alpha and is disabled by default. (On Kubernetes 1.22+, the feature entered beta and the internal traffic service is created by default, so this parameter is ignored.) Default: false

`global.localService.nameOverride`
: NameOverride defines the name of the internal traffic service to target the agent running on the local node.

`global.logLevel`
: LogLevel sets logging verbosity. This can be overridden by container. Valid log levels are: trace, debug, info, warn, error, critical, and off. Default: 'info'

`global.namespaceAnnotationsAsTags`
: Provide a mapping of Kubernetes Namespace Annotations to Datadog Tags. <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>

`global.namespaceLabelsAsTags`
: Provide a mapping of Kubernetes Namespace Labels to Datadog Tags. <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>

`global.networkPolicy.create`
: Defines whether to create a NetworkPolicy for the current deployment.

`global.networkPolicy.dnsSelectorEndpoints`
: DNSSelectorEndpoints defines the cilium selector of the DNS server entity.

`global.networkPolicy.flavor`
: Defines Which network policy to use.

`global.nodeLabelsAsTags`
: Provide a mapping of Kubernetes Node Labels to Datadog Tags. <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>

`global.originDetectionUnified.enabled`
: Enables unified mechanism for origin detection. Default: false

`global.podAnnotationsAsTags`
: Provide a mapping of Kubernetes Annotations to Datadog Tags. <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>

`global.podLabelsAsTags`
: Provide a mapping of Kubernetes Labels to Datadog Tags. <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>

`global.registry`
: Is the image registry to use for all Agent images. Use 'public.ecr.aws/datadog' for AWS ECR. Use 'datadoghq.azurecr.io' for Azure Container Registry. Use 'gcr.io/datadoghq' for Google Container Registry. Use 'eu.gcr.io/datadoghq' for Google Container Registry in the EU region. Use 'asia.gcr.io/datadoghq' for Google Container Registry in the Asia region. Use 'docker.io/datadog' for DockerHub. Default: 'gcr.io/datadoghq'

`global.runProcessChecksInCoreAgent`
: Configure whether the Process Agent or core Agent collects process and/or container information (Linux only). If no other checks are running, the Process Agent container will not initialize. (Requires Agent 7.60.0+) Default: 'true' Deprecated: Functionality now handled automatically. Use env var `DD_PROCESS_CONFIG_RUN_IN_CORE_AGENT_ENABLED` to override.

`global.secretBackend.args`
: List of arguments to pass to the command (space-separated strings).

`global.secretBackend.command`
: The secret backend command to use. Datadog provides a pre-defined binary `/readsecret_multiple_providers.sh`. Read more about `/readsecret_multiple_providers.sh` at https://docs.datadoghq.com/agent/configuration/secrets-management/?tab=linux#script-for-reading-from-multiple-secret-providers.

`global.secretBackend.enableGlobalPermissions`
: Whether to create a global permission allowing Datadog agents to read all Kubernetes secrets. Default: `false`.

`global.secretBackend.refreshInterval`
: The refresh interval for secrets (0 disables refreshing). Default: `0`.

`global.secretBackend.roles`
: For Datadog to read the specified secrets, replacing `enableGlobalPermissions`. They are defined as a list of namespace/secrets. Each defined namespace needs to be present in the DatadogAgent controller using `WATCH_NAMESPACE` or `DD_AGENT_WATCH_NAMESPACE`. See also: https://github.com/DataDog/datadog-operator/blob/main/docs/secret_management.md#how-to-deploy-the-agent-components-using-the-secret-backend-feature-with-datadogagent.

`global.secretBackend.timeout`
: The command timeout in seconds. Default: `30`.

`global.site`
: Is the Datadog intake site Agent data are sent to. Set to 'datadoghq.com' to send data to the US1 site (default). Set to 'datadoghq.eu' to send data to the EU site. Set to 'us3.datadoghq.com' to send data to the US3 site. Set to 'us5.datadoghq.com' to send data to the US5 site. Set to 'ddog-gov.com' to send data to the US1-FED site. Set to 'ap1.datadoghq.com' to send data to the AP1 site. Default: 'datadoghq.com'

`global.tags`
: Contains a list of tags to attach to every metric, event and service check collected. Learn more about tagging: https://docs.datadoghq.com/tagging/

`global.useFIPSAgent`
: UseFIPSAgent enables the FIPS flavor of the Agent. If 'true', the FIPS proxy will always be disabled. Default: 'false'

`override`
: The default configurations of the agents

{{% /collapse-content %}}

For a complete list of parameters, see the [Operator configuration spec][8].

## Override options

The following table lists parameters that can be used to override default or global settings for individual components. `override` is a map with the following possible keys: `nodeAgent`, `clusterAgent`, or `clusterChecksRunner`. Maps and arrays have a type annotation in the table. In the parameter names, `component` refers to one of these component keys, and `container` refers to a specific container name within that component (such as `agent`, `cluster-agent`, `process-agent`, `trace-agent`, or `system-probe`).

For example: the following manifest overrides the Node Agent's image and tag, in addition to the resource limits of the system probe container:

{{< highlight yaml "hl_lines=6-16" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      image:
        name: agent
        tag: 7.41.0-rc.5
      containers:
        system-probe:
          resources:
            limits:
              cpu: "2"
              memory: 1Gi
{{< /highlight >}}
In the table, `spec.override.nodeAgent.image.name` and `spec.override.nodeAgent.containers.system-probe.resources.limits` appear as `[component].image.name` and `[component].containers.[container].resources.limits`, respectively.

{{% collapse-content title="Parameters" level="h4" expanded=true id="override-options-list" %}}
`[component].affinity`
: If specified, the pod's scheduling constraints. See [link](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity) for more information.

`[component].annotations`
: _type_: `map[string]string`
<br /> Annotations provide annotations that are added to the different component (Datadog Agent, Cluster Agent, Cluster Check Runner) pods.

`[component].containers`
: _type_: `map[string]object`
<br /> Configure the basic configurations for each Agent container. Valid Agent container names are: `agent`, `cluster-agent`, `init-config`, `init-volume`, `process-agent`, `seccomp-setup`, `security-agent`, `system-probe`, and `trace-agent`.

`[component].containers.[container].appArmorProfileName`
: AppArmorProfileName specifies an apparmor profile.

`[component].containers.[container].args`
: _type_: `[]string`
<br /> Args allows the specification of extra args to the `Command` parameter

`[component].containers.[container].command`
: _type_: `[]string`
<br /> Command allows the specification of a custom entrypoint for container

`[component].containers.[container].env`
: _type_: `[]object`
<br /> Specify additional environment variables in the container. See also: https://docs.datadoghq.com/agent/kubernetes/?tab=helm#environment-variables

`[component].containers.[container].healthPort`
: HealthPort of the container for the internal liveness probe. Must be the same as the Liveness/Readiness probes.

`[component].containers.[container].livenessProbe`
: Configure the Liveness Probe of the container See [link](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) for more information.

`[component].containers.[container].logLevel`
: LogLevel sets logging verbosity (overrides global setting). Valid log levels are: trace, debug, info, warn, error, critical, and off. Default: 'info'

`[component].containers.[container].name`
: Name of the container that is overridden

`[component].containers.[container].ports`
: _type_: `[]object`
<br /> Specify additional ports to be exposed by the container. Not specifying a port here DOES NOT prevent that port from being exposed. See https://pkg.go.dev/k8s.io/api/core/v1#Container documentation for more details.

`[component].containers.[container].readinessProbe`
: Configure the Readiness Probe of the container See [link](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) for more information.

`[component].containers.[container].resources`
: Specify the Request and Limits of the pods To get guaranteed QoS class, specify requests and limits equal. See also: http://kubernetes.io/docs/user-guide/compute-resources/ See [link](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for more information.

`[component].containers.[container].seccompConfig`
: Seccomp configurations to override Operator actions. For all other Seccomp Profile manipulation, use SecurityContext. See [link](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#seccomp) for more information.

`[component].containers.[container].securityContext`
: Container-level SecurityContext. See [link](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for more information.

`[component].containers.[container].startupProbe`
: Configure the Startup Probe of the container See [link](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) for more information.

`[component].containers.[container].volumeMounts`
: _type_: `[]object`
<br /> Specify additional volume mounts in the container.

`[component].createPodDisruptionBudget`
: Set CreatePodDisruptionBudget to true to create a PodDisruptionBudget for this component. Not applicable for the Node Agent. A Cluster Agent PDB is set with 1 minimum available pod, and a Cluster Checks Runner PDB is set with 1 maximum unavailable pod.

`[component].createRbac`
: Set CreateRbac to false to prevent automatic creation of Role/ClusterRole for this component

`[component].customConfigurations`
: _type_: `map[string]object`
<br /> CustomConfiguration allows to specify custom configuration files for `datadog.yaml`, `datadog-cluster.yaml`, `security-agent.yaml`, and `system-probe.yaml`. The content is merged with configuration generated by the Datadog Operator, with priority given to custom configuration. WARNING: It is possible to override values set in the `DatadogAgent`.

`[component].customConfigurations.[container].configData`
: ConfigData corresponds to the configuration file content.

`[component].customConfigurations.[container].configMap.items`
: Items maps a ConfigMap data `key` to a file `path` mount.

`[component].customConfigurations.[container].configMap.name`
: Name is the name of the ConfigMap.

`[component].disabled`
: Disabled force disables a component.

`[component].dnsConfig`
: Specifies the DNS parameters of a pod. Parameters specified here will be merged to the generated DNS configuration based on DNSPolicy. See [link](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-config) for more information.

`[component].dnsPolicy`
: Set DNS policy for the pod. Defaults to "ClusterFirst". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'. See [link](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-config) for more information.

`[component].env`
: _type_: `[]object`
<br /> Specify additional environment variables for all containers in this component Priority is Container > Component. See also: https://docs.datadoghq.com/agent/kubernetes/?tab=helm#environment-variables

`[component].envFrom`
: _type_: `[]object`
<br /> EnvFrom specifies the ConfigMaps and Secrets to expose as environment variables. Priority is env > envFrom.

`[component].extraChecksd.configDataMap`
: ConfigDataMap corresponds to the content of the configuration files. The key should be the filename the contents get mounted to; for instance check.py or check.yaml.

`[component].extraChecksd.configMap.items`
: Items maps a ConfigMap data `key` to a file `path` mount.

`[component].extraChecksd.configMap.name`
: Name is the name of the ConfigMap.

`[component].extraConfd.configDataMap`
: ConfigDataMap corresponds to the content of the configuration files. The key should be the filename the contents get mounted to; for instance check.py or check.yaml.

`[component].extraConfd.configMap.items`
: Items maps a ConfigMap data `key` to a file `path` mount.

`[component].extraConfd.configMap.name`
: Name is the name of the ConfigMap.

`[component].hostNetwork`
: Host networking requested for this pod. Use the host's network namespace.

`[component].hostPID`
: Use the host's PID namespace.

`[component].image.jmxEnabled`
: Define whether the Agent image should support JMX. To be used if the `Name` field does not correspond to a full image string.

`[component].image.name`
: Defines the Agent image name for the pod. You can provide this as: * `<NAME>` - Use `agent` for the Datadog Agent, `cluster-agent` for the Datadog Cluster Agent, or `dogstatsd` for DogStatsD. The full image string is derived from `global.registry`, `[key].image.tag`, and `[key].image.jmxEnabled`. * `<NAME>:<TAG>` - For example, `agent:latest`. The registry is derived from `global.registry`. `[key].image.tag` and `[key].image.jmxEnabled` are ignored. * `<REGISTRY>/<NAME>:<TAG>` - For example, `gcr.io/datadoghq/agent:latest`. If the full image string is specified   like this, then `global.registry`, `[key].image.tag`, and `[key].image.jmxEnabled` are ignored.

`[component].image.pullPolicy`
: The Kubernetes pull policy: Use `Always`, `Never`, or `IfNotPresent`.

`[component].image.pullSecrets`
: It is possible to specify Docker registry credentials. See https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod

`[component].image.tag`
: Define the image tag to use. To be used if the `Name` field does not correspond to a full image string.

`[component].labels`
: _type_: `map[string]string`
<br /> AdditionalLabels provide labels that are added to the different component (Datadog Agent, Cluster Agent, Cluster Check Runner) pods.

`[component].name`
: Name overrides the default name for the resource

`[component].nodeSelector`
: _type_: `map[string]string`
<br /> A map of key-value pairs. For this pod to run on a specific node, the node must have these key-value pairs as labels. See https://kubernetes.io/docs/concepts/configuration/assign-pod-node/

`[component].priorityClassName`
: If specified, indicates the pod's priority. "system-node-critical" and "system-cluster-critical" are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority is default, or zero if there is no default.

`[component].replicas`
: Number of the replicas. Not applicable for a DaemonSet/ExtendedDaemonSet deployment

`[component].runtimeClassName`
: If specified, indicates the pod's RuntimeClass kubelet should use to run the pod. If the named RuntimeClass does not exist, or the CRI cannot run the corresponding handler, the pod enters the Failed terminal phase. If no runtimeClassName is specified, the default RuntimeHandler is used, which is equivalent to the behavior when the RuntimeClass feature is disabled.

`[component].securityContext`
: Pod-level SecurityContext. See [link](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for more information.

`[component].serviceAccountAnnotations`
: _type_: `map[string]string`
<br /> Sets the ServiceAccountAnnotations used by this component.

`[component].serviceAccountName`
: Sets the ServiceAccount used by this component. Ignored if the field CreateRbac is true.

`[component].tolerations`
: _type_: `[]object`
<br /> Configure the component tolerations. See [link](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) for more information.

`[component].topologySpreadConstraints`
: _type_: `[]object`
<br /> TopologySpreadConstraints describes how a group of pods ought to spread across topology domains. Scheduler will schedule pods in a way which abides by the constraints. All topologySpreadConstraints are ANDed. See [link](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#topologyspreadconstraint) for more information.

`[component].updateStrategy`
: The deployment strategy to use to replace existing pods with new ones. See [link](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/#updating-a-daemonset) for more information.

`[component].volumes`
: _type_: `[]object`
<br /> Specify additional volumes in the different components (Datadog Agent, Cluster Agent, Cluster Check Runner).

{{% /collapse-content %}}


For a complete list of parameters, see the [Operator configuration spec][9].

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[2]: https://github.com/DataDog/datadog-operator/
[3]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-all.yaml
[4]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
[5]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-apm-hostport.yaml
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-clusteragent.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-tolerations.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#all-configuration-options
[9]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
