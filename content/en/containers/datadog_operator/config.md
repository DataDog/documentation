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

`features.admissionController.agentSidecarInjection.clusterAgentCommunicationEnabled`
: ClusterAgentCommunicationEnabled enables communication between Agent sidecars and the Cluster Agent. Default : true

`features.admissionController.agentSidecarInjection.enabled`
: Enables Sidecar injections. Default: false

`features.admissionController.agentSidecarInjection.image.jmxEnabled`
: Define whether the Agent image should support JMX. To be used if the `Name` field does not correspond to a full image string.

`features.admissionController.agentSidecarInjection.image.name`
: Defines the Agent image name for the pod. You can provide this as: * `<NAME>` - Use `agent` for the Datadog Agent, `cluster-agent` for the Datadog Cluster Agent, or `dogstatsd` for DogStatsD. The full image string is derived from `global.registry`, `[key].image.tag`, and `[key].image.jmxEnabled`. * `<NAME>:<TAG>` - For example, `agent:latest`. The registry is derived from `global.registry`. `[key].image.tag` and `[key].image.jmxEnabled` are ignored. * `<REGISTRY>/<NAME>:<TAG>` - For example, `gcr.io/datadoghq/agent:latest`. If the full image string is specified   like this, then `global.registry`, `[key].image.tag`, and `[key].image.jmxEnabled` are ignored.

`features.admissionController.agentSidecarInjection.image.pullPolicy`
: The Kubernetes pull policy: Use `Always`, `Never`, or `IfNotPresent`.

`features.admissionController.agentSidecarInjection.image.pullSecrets`
: It is possible to specify Docker registry credentials. See https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod

`features.admissionController.agentSidecarInjection.image.tag`
: Define the image tag to use. To be used if the `Name` field does not correspond to a full image string.

`features.admissionController.agentSidecarInjection.profiles`
: Define the sidecar configuration override. Only one profile is supported.

`features.admissionController.agentSidecarInjection.provider`
: Is used to add infrastructure provider-specific configurations to the Agent sidecar. Currently only "fargate" is supported. To use the feature in other environments (including local testing) omit the config. See also: https://docs.datadoghq.com/integrations/eks_fargate

`features.admissionController.agentSidecarInjection.registry`
: Overrides the default registry for the sidecar Agent.

`features.admissionController.agentSidecarInjection.selectors`
: Define the pod selector for sidecar injection. Only one rule is supported.

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

`features.apm.instrumentation.disabledNamespaces`
: DisabledNamespaces disables injecting the Datadog APM libraries into pods in specific namespaces.

`features.apm.instrumentation.enabled`
: Enables injecting the Datadog APM libraries into all pods in the cluster. Default: false

`features.apm.instrumentation.enabledNamespaces`
: EnabledNamespaces enables injecting the Datadog APM libraries into pods in specific namespaces.

`features.apm.instrumentation.injector.imageTag`
: Set the image tag to use for the APM Injector. (Requires Cluster Agent 7.57.0+)

`features.apm.instrumentation.languageDetection.enabled`
: Enables Language Detection to automatically detect languages of user workloads (beta). Requires SingleStepInstrumentation.Enabled to be true. Default: true

`features.apm.instrumentation.libVersions`
: LibVersions configures injection of specific tracing library versions with Single Step Instrumentation. <Library>: <Version> ex: "java": "v1.18.0"

`features.apm.instrumentation.targets`
: Is a list of targets to apply the auto instrumentation to. The first target that matches the pod will be used. If no target matches, the auto instrumentation will not be applied. (Requires Cluster Agent 7.64.0+)

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

`features.externalMetricsServer.enabled`
: Enables the External Metrics Server. Default: false

`features.externalMetricsServer.endpoint.credentials.apiKey`
: APIKey configures your Datadog API key. See also: https://app.datadoghq.com/account/settings#agent/kubernetes

`features.externalMetricsServer.endpoint.credentials.apiSecret.keyName`
: KeyName is the key of the secret to use.

`features.externalMetricsServer.endpoint.credentials.apiSecret.secretName`
: SecretName is the name of the secret.

`features.externalMetricsServer.endpoint.credentials.appKey`
: AppKey configures your Datadog application key. If you are using features.externalMetricsServer.enabled = true, you must set a Datadog application key for read access to your metrics.

`features.externalMetricsServer.endpoint.credentials.appSecret.keyName`
: KeyName is the key of the secret to use.

`features.externalMetricsServer.endpoint.credentials.appSecret.secretName`
: SecretName is the name of the secret.

`features.externalMetricsServer.endpoint.url`
: URL defines the endpoint URL.

`features.externalMetricsServer.port`
: Specifies the metricsProvider External Metrics Server service port. Default: 8443

`features.externalMetricsServer.registerAPIService`
: RegisterAPIService registers the External Metrics endpoint as an APIService Default: true

`features.externalMetricsServer.useDatadogMetrics`
: UseDatadogMetrics enables usage of the DatadogMetrics CRD (allowing one to scale on arbitrary Datadog metric queries). Default: true

`features.externalMetricsServer.wpaController`
: WPAController enables the informer and controller of the Watermark Pod Autoscaler. NOTE: The Watermark Pod Autoscaler controller needs to be installed. See also: https://github.com/DataDog/watermarkpodautoscaler. Default: false

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

`features.otelCollector.conf.configData`
: ConfigData corresponds to the configuration file content.

`features.otelCollector.conf.configMap.items`
: Maps a ConfigMap data `key` to a file `path` mount.

`features.otelCollector.conf.configMap.name`
: Is the name of the ConfigMap.

`features.otelCollector.coreConfig.enabled`
: Marks otelcollector as enabled in core agent.

`features.otelCollector.coreConfig.extensionTimeout`
: Extension URL provides the timout of the ddflareextension to the core agent.

`features.otelCollector.coreConfig.extensionURL`
: Extension URL provides the URL of the ddflareextension to the core agent.

`features.otelCollector.enabled`
: Enables the OTel Agent. Default: false

`features.otelCollector.ports`
: Contains the ports for the otel-agent. Defaults: otel-grpc:4317 / otel-http:4318. Note: setting 4317 or 4318 manually is *only* supported if name match default names (otel-grpc, otel-http). If not, this will lead to a port conflict. This limitation will be lifted once annotations support is removed.

`features.otlp.receiver.protocols.grpc.enabled`
: Enable the OTLP/gRPC endpoint. Host port is enabled by default and can be disabled.

`features.otlp.receiver.protocols.grpc.endpoint`
: For OTLP/gRPC. gRPC supports several naming schemes: https://github.com/grpc/grpc/blob/master/doc/naming.md The Datadog Operator supports only 'host:port' (usually `0.0.0.0:port`). Default: `0.0.0.0:4317`.

`features.otlp.receiver.protocols.grpc.hostPortConfig.enabled`
: Enables host port configuration

`features.otlp.receiver.protocols.grpc.hostPortConfig.hostPort`
: Port takes a port number (0 < x < 65536) to expose on the host. (Most containers do not need this.) If HostNetwork is enabled, this value must match the ContainerPort.

`features.otlp.receiver.protocols.http.enabled`
: Enable the OTLP/HTTP endpoint. Host port is enabled by default and can be disabled.

`features.otlp.receiver.protocols.http.endpoint`
: For OTLP/HTTP. Default: '0.0.0.0:4318'.

`features.otlp.receiver.protocols.http.hostPortConfig.enabled`
: Enables host port configuration

`features.otlp.receiver.protocols.http.hostPortConfig.hostPort`
: Port takes a port number (0 < x < 65536) to expose on the host. (Most containers do not need this.) If HostNetwork is enabled, this value must match the ContainerPort.

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

`global.fips.customFIPSConfig.configData`
: ConfigData corresponds to the configuration file content.

`global.fips.customFIPSConfig.configMap.items`
: Maps a ConfigMap data `key` to a file `path` mount.

`global.fips.customFIPSConfig.configMap.name`
: Is the name of the ConfigMap.

`global.fips.enabled`
: Enable FIPS sidecar.

`global.fips.image.jmxEnabled`
: Define whether the Agent image should support JMX. To be used if the `Name` field does not correspond to a full image string.

`global.fips.image.name`
: Defines the Agent image name for the pod. You can provide this as: * `<NAME>` - Use `agent` for the Datadog Agent, `cluster-agent` for the Datadog Cluster Agent, or `dogstatsd` for DogStatsD. The full image string is derived from `global.registry`, `[key].image.tag`, and `[key].image.jmxEnabled`. * `<NAME>:<TAG>` - For example, `agent:latest`. The registry is derived from `global.registry`. `[key].image.tag` and `[key].image.jmxEnabled` are ignored. * `<REGISTRY>/<NAME>:<TAG>` - For example, `gcr.io/datadoghq/agent:latest`. If the full image string is specified   like this, then `global.registry`, `[key].image.tag`, and `[key].image.jmxEnabled` are ignored.

`global.fips.image.pullPolicy`
: The Kubernetes pull policy for the FIPS sidecar image. Values: Always, Never, IfNotPresent.

`global.fips.image.pullSecrets`
: Specifies Docker registry credentials (https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod) for the FIPS sidecar.

`global.fips.image.tag`
: Defines the tag of the FIPS sidecar image. This parameter is used if global.fips.image.name does not correspond to a full image string.

`global.fips.localAddress`
: The local IP address of the FIPS sidecar. Default: 127.0.0.1.

`global.fips.port`
: Specifies which port is used by the containers to communicate to the FIPS sidecar. Default: 9803

`global.fips.portRange`
: The number of ports used by the containers to communicate to the FIPS sidecar. Default: 15

`global.fips.resources.claims`
: Lists the names of resources, defined in spec.resourceClaims, that are used by this container.  This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.  This field is immutable. It can only be set for containers.

`global.fips.resources.limits`
: Resource limits for the FIPS sidecar. See https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-requests-and-limits-of-pod-and-container .

`global.fips.resources.requests`
: Resource requests for the FIPS sidecar. If undefined, defaults to global.fips.resources.limits (if set), then to an implementation-defined value. See https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-requests-and-limits-of-pod-and-container .

`global.fips.useHTTPS`
: If true, enables HTTPS on the FIPS sidecar. Default: false

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

The following table lists parameters that can be used to override default or global settings. Maps and arrays have a type annotation in the table; properties that are configured as map values contain a `[key]` element, to be replaced with an actual map key. `override` itself is a map with the following possible keys: `nodeAgent`, `clusterAgent`, or `clusterChecksRunner`. 

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
In the table, `spec.override.nodeAgent.image.name` and `spec.override.nodeAgent.containers.system-probe.resources.limits` appear as `[key].image.name` and `[key].containers.[key].resources.limits`, respectively.

{{% collapse-content title="Parameters" level="h4" expanded=true id="override-options-list" %}}
`[key].affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.

`[key].affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms`
: Required. A list of node selector terms. The terms are ORed.

`[key].affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.

`[key].affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.

`[key].affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.

`[key].affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.

`[key].annotations`
: _type_: `map[string]string`
<br /> Annotations provide annotations that are added to the different component (Datadog Agent, Cluster Agent, Cluster Check Runner) pods.

`[key].containers`
: _type_: `map[string]object`
<br /> Configure the basic configurations for each Agent container. Valid Agent container names are: `agent`, `cluster-agent`, `init-config`, `init-volume`, `process-agent`, `seccomp-setup`, `security-agent`, `system-probe`, and `trace-agent`.

`[key].containers.[key].appArmorProfileName`
: AppArmorProfileName specifies an apparmor profile.

`[key].containers.[key].args`
: _type_: `[]string`
<br /> Args allows the specification of extra args to the `Command` parameter

`[key].containers.[key].command`
: _type_: `[]string`
<br /> Command allows the specification of a custom entrypoint for container

`[key].containers.[key].env`
: _type_: `[]object`
<br /> Specify additional environment variables in the container. See also: https://docs.datadoghq.com/agent/kubernetes/?tab=helm#environment-variables

`[key].containers.[key].healthPort`
: HealthPort of the container for the internal liveness probe. Must be the same as the Liveness/Readiness probes.

`[key].containers.[key].livenessProbe`
: Configure the Liveness Probe of the container See [link](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) for more information.

`[key].containers.[key].logLevel`
: LogLevel sets logging verbosity (overrides global setting). Valid log levels are: trace, debug, info, warn, error, critical, and off. Default: 'info'

`[key].containers.[key].name`
: Name of the container that is overridden

`[key].containers.[key].ports`
: _type_: `[]object`
<br /> Specify additional ports to be exposed by the container. Not specifying a port here DOES NOT prevent that port from being exposed. See https://pkg.go.dev/k8s.io/api/core/v1#Container documentation for more details.

`[key].containers.[key].readinessProbe`
: Configure the Readiness Probe of the container See [link](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) for more information.

`[key].containers.[key].resources.claims`
: Claims lists the names of resources, defined in spec.resourceClaims, that are used by this container.  This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.  This field is immutable. It can only be set for containers.

`[key].containers.[key].resources.limits`
: Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

`[key].containers.[key].resources.requests`
: Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. Requests cannot exceed Limits. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

`[key].containers.[key].seccompConfig.customProfile.configData`
: ConfigData corresponds to the configuration file content.

`[key].containers.[key].seccompConfig.customProfile.configMap.items`
: Items maps a ConfigMap data `key` to a file `path` mount.

`[key].containers.[key].seccompConfig.customProfile.configMap.name`
: Name is the name of the ConfigMap.

`[key].containers.[key].seccompConfig.customRootPath`
: CustomRootPath specifies a custom Seccomp Profile root location.

`[key].containers.[key].securityContext`
: Container-level SecurityContext. See [link](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for more information.

`[key].containers.[key].startupProbe.exec.command`
: Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.

`[key].containers.[key].startupProbe.failureThreshold`
: Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.

`[key].containers.[key].startupProbe.grpc.port`
: Port number of the gRPC service. Number must be in the range 1 to 65535.

`[key].containers.[key].startupProbe.grpc.service`
: Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).  If this is not specified, the default behavior is defined by gRPC.

`[key].containers.[key].startupProbe.httpGet.host`
: Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.

`[key].containers.[key].startupProbe.httpGet.httpHeaders`
: Custom headers to set in the request. HTTP allows repeated headers.

`[key].containers.[key].startupProbe.httpGet.path`
: Path to access on the HTTP server.

`[key].containers.[key].startupProbe.httpGet.port`
: Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.

`[key].containers.[key].startupProbe.httpGet.scheme`
: Scheme to use for connecting to the host. Defaults to HTTP.

`[key].containers.[key].startupProbe.initialDelaySeconds`
: Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

`[key].containers.[key].startupProbe.periodSeconds`
: How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.

`[key].containers.[key].startupProbe.successThreshold`
: Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.

`[key].containers.[key].startupProbe.tcpSocket.host`
: Optional: Host name to connect to, defaults to the pod IP.

`[key].containers.[key].startupProbe.tcpSocket.port`
: Number or name of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.

`[key].containers.[key].startupProbe.terminationGracePeriodSeconds`
: Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.

`[key].containers.[key].startupProbe.timeoutSeconds`
: Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes

`[key].containers.[key].volumeMounts`
: _type_: `[]object`
<br /> Specify additional volume mounts in the container.

`[key].createPodDisruptionBudget`
: Set CreatePodDisruptionBudget to true to create a PodDisruptionBudget for this component. Not applicable for the Node Agent. A Cluster Agent PDB is set with 1 minimum available pod, and a Cluster Checks Runner PDB is set with 1 maximum unavailable pod.

`[key].createRbac`
: Set CreateRbac to false to prevent automatic creation of Role/ClusterRole for this component

`[key].customConfigurations`
: _type_: `map[string]object`
<br /> CustomConfiguration allows to specify custom configuration files for `datadog.yaml`, `datadog-cluster.yaml`, `security-agent.yaml`, and `system-probe.yaml`. The content is merged with configuration generated by the Datadog Operator, with priority given to custom configuration. WARNING: It is possible to override values set in the `DatadogAgent`.

`[key].customConfigurations.[key].configData`
: ConfigData corresponds to the configuration file content.

`[key].customConfigurations.[key].configMap.items`
: Items maps a ConfigMap data `key` to a file `path` mount.

`[key].customConfigurations.[key].configMap.name`
: Name is the name of the ConfigMap.

`[key].disabled`
: Disabled force disables a component.

`[key].dnsConfig.nameservers`
: A list of DNS name server IP addresses. This will be appended to the base nameservers generated from DNSPolicy. Duplicated nameservers will be removed.

`[key].dnsConfig.options`
: A list of DNS resolver options. This will be merged with the base options generated from DNSPolicy. Duplicated entries will be removed. Resolution options given in Options will override those that appear in the base DNSPolicy.

`[key].dnsConfig.searches`
: A list of DNS search domains for host-name lookup. This will be appended to the base search paths generated from DNSPolicy. Duplicated search paths will be removed.

`[key].dnsPolicy`
: Set DNS policy for the pod. Defaults to "ClusterFirst". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.

`[key].env`
: _type_: `[]object`
<br /> Specify additional environment variables for all containers in this component Priority is Container > Component. See also: https://docs.datadoghq.com/agent/kubernetes/?tab=helm#environment-variables

`[key].envFrom`
: _type_: `[]object`
<br /> EnvFrom specifies the ConfigMaps and Secrets to expose as environment variables. Priority is env > envFrom.

`[key].extraChecksd.configDataMap`
: ConfigDataMap corresponds to the content of the configuration files. The key should be the filename the contents get mounted to; for instance check.py or check.yaml.

`[key].extraChecksd.configMap.items`
: Items maps a ConfigMap data `key` to a file `path` mount.

`[key].extraChecksd.configMap.name`
: Name is the name of the ConfigMap.

`[key].extraConfd.configDataMap`
: ConfigDataMap corresponds to the content of the configuration files. The key should be the filename the contents get mounted to; for instance check.py or check.yaml.

`[key].extraConfd.configMap.items`
: Items maps a ConfigMap data `key` to a file `path` mount.

`[key].extraConfd.configMap.name`
: Name is the name of the ConfigMap.

`[key].hostNetwork`
: Host networking requested for this pod. Use the host's network namespace.

`[key].hostPID`
: Use the host's PID namespace.

`[key].image.jmxEnabled`
: Define whether the Agent image should support JMX. To be used if the `Name` field does not correspond to a full image string.

`[key].image.name`
: Defines the Agent image name for the pod. You can provide this as: * `<NAME>` - Use `agent` for the Datadog Agent, `cluster-agent` for the Datadog Cluster Agent, or `dogstatsd` for DogStatsD. The full image string is derived from `global.registry`, `[key].image.tag`, and `[key].image.jmxEnabled`. * `<NAME>:<TAG>` - For example, `agent:latest`. The registry is derived from `global.registry`. `[key].image.tag` and `[key].image.jmxEnabled` are ignored. * `<REGISTRY>/<NAME>:<TAG>` - For example, `gcr.io/datadoghq/agent:latest`. If the full image string is specified   like this, then `global.registry`, `[key].image.tag`, and `[key].image.jmxEnabled` are ignored.

`[key].image.pullPolicy`
: The Kubernetes pull policy: Use `Always`, `Never`, or `IfNotPresent`.

`[key].image.pullSecrets`
: It is possible to specify Docker registry credentials. See https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod

`[key].image.tag`
: Define the image tag to use. To be used if the `Name` field does not correspond to a full image string.

`[key].labels`
: _type_: `map[string]string`
<br /> AdditionalLabels provide labels that are added to the different component (Datadog Agent, Cluster Agent, Cluster Check Runner) pods.

`[key].name`
: Name overrides the default name for the resource

`[key].nodeSelector`
: _type_: `map[string]string`
<br /> A map of key-value pairs. For this pod to run on a specific node, the node must have these key-value pairs as labels. See https://kubernetes.io/docs/concepts/configuration/assign-pod-node/

`[key].priorityClassName`
: If specified, indicates the pod's priority. "system-node-critical" and "system-cluster-critical" are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority is default, or zero if there is no default.

`[key].replicas`
: Number of the replicas. Not applicable for a DaemonSet/ExtendedDaemonSet deployment

`[key].runtimeClassName`
: If specified, indicates the pod's RuntimeClass kubelet should use to run the pod. If the named RuntimeClass does not exist, or the CRI cannot run the corresponding handler, the pod enters the Failed terminal phase. If no runtimeClassName is specified, the default RuntimeHandler is used, which is equivalent to the behavior when the RuntimeClass feature is disabled.

`[key].securityContext.appArmorProfile.localhostProfile`
: localhostProfile indicates a profile loaded on the node that should be used. The profile must be preconfigured on the node to work. Must match the loaded name of the profile. Must be set if and only if type is "Localhost".

`[key].securityContext.appArmorProfile.type`
: type indicates which kind of AppArmor profile will be applied. Valid options are:   Localhost - a profile pre-loaded on the node.   RuntimeDefault - the container runtime's default profile.   Unconfined - no AppArmor enforcement.

`[key].securityContext.fsGroup`
: A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod:  1. The owning GID will be the FSGroup 2. The setgid bit is set (new files created in the volume will be owned by FSGroup) 3. The permission bits are OR'd with rw-rw----  If unset, the Kubelet will not modify the ownership and permissions of any volume. Note that this field cannot be set when spec.os.name is windows.

`[key].securityContext.fsGroupChangePolicy`
: fsGroupChangePolicy defines behavior of changing ownership and permission of the volume before being exposed inside Pod. This field will only apply to volume types which support fsGroup based ownership(and permissions). It will have no effect on ephemeral volume types such as: secret, configmaps and emptydir. Valid values are "OnRootMismatch" and "Always". If not specified, "Always" is used. Note that this field cannot be set when spec.os.name is windows.

`[key].securityContext.runAsGroup`
: The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.

`[key].securityContext.runAsNonRoot`
: Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.

`[key].securityContext.runAsUser`
: The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.

`[key].securityContext.seLinuxChangePolicy`
: seLinuxChangePolicy defines how the container's SELinux label is applied to all volumes used by the Pod. It has no effect on nodes that do not support SELinux or to volumes does not support SELinux. Valid values are "MountOption" and "Recursive".  "Recursive" means relabeling of all files on all Pod volumes by the container runtime. This may be slow for large volumes, but allows mixing privileged and unprivileged Pods sharing the same volume on the same node.  "MountOption" mounts all eligible Pod volumes with `-o context` mount option. This requires all Pods that share the same volume to use the same SELinux label. It is not possible to share the same volume among privileged and unprivileged Pods. Eligible volumes are in-tree FibreChannel and iSCSI volumes, and all CSI volumes whose CSI driver announces SELinux support by setting spec.seLinuxMount: true in their CSIDriver instance. Other volumes are always re-labelled recursively. "MountOption" value is allowed only when SELinuxMount feature gate is enabled.  If not specified and SELinuxMount feature gate is enabled, "MountOption" is used. If not specified and SELinuxMount feature gate is disabled, "MountOption" is used for ReadWriteOncePod volumes and "Recursive" for all other volumes.  This field affects only Pods that have SELinux label set, either in PodSecurityContext or in SecurityContext of all containers.  All Pods that use the same volume should use the same seLinuxChangePolicy, otherwise some pods can get stuck in ContainerCreating state. Note that this field cannot be set when spec.os.name is windows.

`[key].securityContext.seLinuxOptions.level`
: Level is SELinux level label that applies to the container.

`[key].securityContext.seLinuxOptions.role`
: Role is a SELinux role label that applies to the container.

`[key].securityContext.seLinuxOptions.type`
: Type is a SELinux type label that applies to the container.

`[key].securityContext.seLinuxOptions.user`
: User is a SELinux user label that applies to the container.

`[key].securityContext.seccompProfile.localhostProfile`
: localhostProfile indicates a profile defined in a file on the node should be used. The profile must be preconfigured on the node to work. Must be a descending path, relative to the kubelet's configured seccomp profile location. Must be set if type is "Localhost". Must NOT be set for any other type.

`[key].securityContext.seccompProfile.type`
: type indicates which kind of seccomp profile will be applied. Valid options are:  Localhost - a profile defined in a file on the node should be used. RuntimeDefault - the container runtime default profile should be used. Unconfined - no profile should be applied.

`[key].securityContext.supplementalGroups`
: A list of groups applied to the first process run in each container, in addition to the container's primary GID and fsGroup (if specified).  If the SupplementalGroupsPolicy feature is enabled, the supplementalGroupsPolicy field determines whether these are in addition to or instead of any group memberships defined in the container image. If unspecified, no additional groups are added, though group memberships defined in the container image may still be used, depending on the supplementalGroupsPolicy field. Note that this field cannot be set when spec.os.name is windows.

`[key].securityContext.supplementalGroupsPolicy`
: Defines how supplemental groups of the first container processes are calculated. Valid values are "Merge" and "Strict". If not specified, "Merge" is used. (Alpha) Using the field requires the SupplementalGroupsPolicy feature gate to be enabled and the container runtime must implement support for this feature. Note that this field cannot be set when spec.os.name is windows.

`[key].securityContext.sysctls`
: Sysctls hold a list of namespaced sysctls used for the pod. Pods with unsupported sysctls (by the container runtime) might fail to launch. Note that this field cannot be set when spec.os.name is windows.

`[key].securityContext.windowsOptions.gmsaCredentialSpec`
: GMSACredentialSpec is where the GMSA admission webhook (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the GMSA credential spec named by the GMSACredentialSpecName field.

`[key].securityContext.windowsOptions.gmsaCredentialSpecName`
: GMSACredentialSpecName is the name of the GMSA credential spec to use.

`[key].securityContext.windowsOptions.hostProcess`
: HostProcess determines if a container should be run as a 'Host Process' container. All of a Pod's containers must have the same effective HostProcess value (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers). In addition, if HostProcess is true then HostNetwork must also be set to true.

`[key].securityContext.windowsOptions.runAsUserName`
: The UserName in Windows to run the entrypoint of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.

`[key].serviceAccountAnnotations`
: _type_: `map[string]string`
<br /> Sets the ServiceAccountAnnotations used by this component.

`[key].serviceAccountName`
: Sets the ServiceAccount used by this component. Ignored if the field CreateRbac is true.

`[key].tolerations`
: _type_: `[]object`
<br /> Configure the component tolerations.

`[key].topologySpreadConstraints`
: _type_: `[]object`
<br /> TopologySpreadConstraints describes how a group of pods ought to spread across topology domains. Scheduler will schedule pods in a way which abides by the constraints. All topologySpreadConstraints are ANDed.

`[key].updateStrategy.rollingUpdate.maxSurge`
: MaxSurge behaves differently based on the Kubernetes resource. Refer to the Kubernetes API documentation for additional details.

`[key].updateStrategy.rollingUpdate.maxUnavailable`
: The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Refer to the Kubernetes API documentation for additional details..

`[key].updateStrategy.type`
: Type can be "RollingUpdate" or "OnDelete" for DaemonSets and "RollingUpdate" or "Recreate" for Deployments

`[key].volumes`
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