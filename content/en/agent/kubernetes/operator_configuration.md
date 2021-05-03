---
title: Operator configuration
kind: faq
further_reading:
  - link: 'agent/kubernetes/log'
    tag: 'Documentation'
    text: 'Datadog and Kubernetes'
---

## All configuration options

The following table lists the configurable parameters for the `DatadogAgent`
resource. For example, if you wanted to set a value for `agent.image.name`,
your `DatadogAgent` resource would look like the following:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
```

`agent.additionalAnnotations`
: `AdditionalAnnotations` provide annotations that will be added to the Agent Pods.

`agent.additionalLabels`
: `AdditionalLabels` provide labels that will be added to the cluster checks runner pods. 

`agent.apm.enabled`
: Enable this to enable APM and tracing on port 8126. See the [Datadog Docker documentation][1]. 

`agent.apm.env`
: The Datadog Agent supports many [environment variables][2]. 

`agent.apm.hostPort`
: Number of the port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If `HostNetwork` is specified, this must match `ContainerPort`. Most containers do not need this.             

`agent.apm.resources.limits`
: Limits describes the maximum amount of compute resources allowed. For more info, [see the Kubernetes documentation][3].  

`agent.apm.resources.requests`
: `Requests` describes the minimum amount of compute resources required. If `requests` is omitted for a container, it defaults to `limits` if that is explicitly specified. Otherwise, it defaults to an implementation-defined value. For more info, [see the Kubernetes documentation][3].   

`agent.config.checksd.configMapName`
: Name of a ConfigMap used to mount a directory.                   

`agent.config.collectEvents`
: Enables starting event collection from the Kubernetes API. [See the Event Collection documentation][4].      

`agent.config.confd.configMapName`
: Name of a ConfigMap used to mount a directory.                   

`agent.config.criSocket.criSocketPath`
: Path to the container runtime socket (if different from Docker). This is supported starting from Agent 6.6.0.                  

`agent.config.criSocket.dockerSocketPath`
: Path to the Docker runtime socket.                

`agent.config.ddUrl`
: The host of the Datadog intake server to send Agent data to. Only set this option if you need the Agent to send data to a custom URL. Overrides the site setting defined in `site`.        

`agent.config.dogstatsd.dogstatsdOriginDetection`
: Enable origin detection for container tagging. See the [Unix Socket origin detection documentation][5].  

`agent.config.dogstatsd.useDogStatsDSocketVolume`
: Enable DogStatsD over a Unix Domain Socket. [See the Unix Socket documentation][6]. 

`agent.config.env`
: The Datadog Agent supports many [environment variables][2].   

`agent.config.hostPort`
: Number of the port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If `HostNetwork` is specified, this must match `ContainerPort`. Most containers do not need this.             

`agent.config.leaderElection`
: Enables leader election mechanism for event collection.   

`agent.config.logLevel`
: Set logging verbosity. Valid log levels are:  `trace`, `debug`, `info`, `warn`, `error`, `critical`, and `off`.   

`agent.config.podAnnotationsAsTags`
: Provide a mapping of Kubernetes Annotations to Datadog Tags. `<KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>`  

`agent.config.podLabelsAsTags`
: Provide a mapping of Kubernetes labels to Datadog tags. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>`      

`agent.config.resources.limits`
: Describes the maximum amount of compute resources allowed. [See the Kubernetes documentation][3]. 

`agent.config.resources.requests`
: Describes the minimum amount of compute resources required. If `requests` is omitted for a container, it defaults to `limits` if that is explicitly specified. Otherwise, it defaults to an implementation-defined value. [See the Kubernetes documentation][3].     

`agent.config.securityContext.allowPrivilegeEscalation`
: Controls whether a process can gain more privileges than its parent process. This Boolean directly controls if the `no_new_privs` flag will be set on the container process. `AllowPrivilegeEscalation` is true always when the container is both run as `Privileged`, and has `CAP_SYS_ADMIN`.               

`agent.config.securityContext.capabilities.add`
: Added capabilities.  

`agent.config.securityContext.capabilities.drop`
: Removed capabilities.

`agent.config.securityContext.privileged`
: Run the container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to `false`.  

`agent.config.securityContext.procMount`
: `procMount` denotes the type of proc mount to use for the containers. The default is `DefaultProcMount` which uses the container runtime defaults for read-only paths and masked paths. This requires the `ProcMountType` feature flag to be enabled.      

`agent.config.securityContext.readOnlyRootFilesystem`
: Whether this container has a read-only root file system. Default is `false`.     

`agent.config.securityContext.runAsGroup`
: The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in `PodSecurityContext`. If set in both `SecurityContext` and `PodSecurityContext`, the value specified in `SecurityContext` takes precedence.      

`agent.config.securityContext.runAsNonRoot`
: Indicates that the container must run as a non-root user. If true, the Kubelet validates the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in `PodSecurityContext`. If set in both `SecurityContext` and `PodSecurityContext`, the value specified in `SecurityContext` takes precedence.  

`agent.config.securityContext.runAsUser`
: The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in `PodSecurityContext`. If set in both `SecurityContext` and `PodSecurityContext`, the value specified in `SecurityContext` takes precedence.                  

`agent.config.securityContext.seLinuxOptions.level`
: SELinux level label that applies to the container.                   

`agent.config.securityContext.seLinuxOptions.role`
: SELinux role label that applies to the container.                   

`agent.config.securityContext.seLinuxOptions.type`
: SELinux type label that applies to the container.                   

`agent.config.securityContext.seLinuxOptions.user`
: SELinux user label that applies to the container.                   

`agent.config.securityContext.windowsOptions.gmsaCredentialSpec`
: `GMSACredentialSpec` is where the [GMSA admission webhook][7] inlines the contents of the GMSA credential spec named by the `GMSACredentialSpecName` field. This field is alpha-level and is only honored by servers that enable the WindowsGMSA feature flag.

`agent.config.securityContext.windowsOptions.gmsaCredentialSpecName`
: `GMSACredentialSpecName` is the name of the GMSA credential spec to use. This field is alpha-level and is only honored by servers that enable the WindowsGMSA feature flag.         

`agent.config.securityContext.windowsOptions.runAsUserName`
: The `UserName` in Windows to run the entrypoint of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in `PodSecurityContext`. If set in both `SecurityContext` and `PodSecurityContext`, the value specified in `SecurityContext` takes precedence. This field is beta-level and may be disabled with the `WindowsRunAsUserName` feature flag.                  

`agent.config.tags`
: List of tags to attach to every metric, event, and service check collected by this Agent. See the [Tagging documentation][8].     

`agent.config.tolerations`
: If specified, the Agent pod's tolerations.       

`agent.config.volumeMounts`
: Specify additional volume mounts in the Datadog Agent container.               

`agent.config.volumes`
: Specify additional volumes in the Datadog Agent container. 

`agent.customConfig.configData`
: Corresponds to the configuration file content.  

`agent.customConfig.configMap.fileKey`
: Corresponds to the key used in the ConfigMap.Data to store the configuration file content. 

`agent.customConfig.configMap.name`
: Name the ConfigMap.      

`agent.daemonsetName`
: Name of the DaemonSet to create or migrate from.  

`agent.deploymentStrategy.canary.duration`
: 

`agent.deploymentStrategy.canary.paused`
: 

`agent.deploymentStrategy.canary.replicas`
: 

`agent.deploymentStrategy.reconcileFrequency`
: The reconcile frequency of the ExtendDaemonSet.   

`agent.deploymentStrategy.rollingUpdate.maxParallelPodCreation`
: The maximum number of pods created in parallel. Default value is 250.          

`agent.deploymentStrategy.rollingUpdate.maxPodSchedulerFailure`
: `maxPodSchedulerFailure` is the maximum number of pods scheduled on its Node due to a scheduler failure: resource constraints. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute.

`agent.deploymentStrategy.rollingUpdate.maxUnavailable`
: The maximum number of DaemonSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0. Default value is 1.        

`agent.deploymentStrategy.rollingUpdate.slowStartAdditiveIncrease`
: Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Default value is 5.     

`agent.deploymentStrategy.rollingUpdate.slowStartIntervalDuration`
: The duration interval. Default value is 1min.    

`agent.deploymentStrategy.updateStrategyType`
: The update strategy used for the DaemonSet.       

`agent.dnsConfig.nameservers`
: A list of DNS name server IP addresses. This are appended to the base nameservers generated from `dnsPolicy`. Duplicated nameservers are removed.      

`agent.dnsConfig.options`
: A list of DNS resolver options. These are merged with the base options generated from `dnsPolicy`. Duplicated entries will be removed. Resolution options given in `options` override those that appear in the base `dnsPolicy`.          

`agent.dnsConfig.searches`
: A list of DNS search domains for host-name lookup. This are appended to the base search paths generated from `dnsPolicy`. Duplicated search paths are removed. 

`agent.dnsPolicy`
: Set DNS policy for the pod. Defaults to `ClusterFirst`. Valid values are `ClusterFirstWithHostNet`, `ClusterFirst`, `Default`, or `None`. DNS parameters given in `dnsConfig` are merged with the policy selected with `dnsPolicy`. To have DNS options set along with `hostNetwork`, you have to specify `dnsPolicy` explicitly to `ClusterFirstWithHostNet`.                   

`agent.env`
: Environment variables for all Datadog Agents. [See the Docker environment variables documentation][2].   

`agent.hostNetwork`
: Host networking requested for this pod. Use the host's network namespace. If this option is set, the ports that will be used must be specified. Defaults to `false`.    

`agent.hostPID`
: Use the host's PID namespace. Optional: Defaults to `false`. 

`agent.image.name`
: Define the image to use `gcr.io/datadoghq/agent:latest` for Datadog Agent 6. Use `datadog/dogstatsd:latest` for stand-alone Datadog Agent DogStatsD. Use `gcr.io/datadoghq/cluster-agent:latest` for Datadog Cluster Agent.  

`agent.image.pullPolicy`
: The Kubernetes pull policy. Use `Always`, `Never`, or `IfNotPresent`.                

`agent.image.pullSecrets`
: Specifies the Docker registry credentials. [See the Kubernetes documentation][9].     

`agent.log.containerCollectUsingFiles`
: Collect logs from files in `/var/log/pods` instead of using container runtime API. This is usually the most efficient way of collecting logs. See the [Log Collection][10] documentation. Default: `true`.    

`agent.log.containerLogsPath`
: Allow log collection from the container log path. Set to a different path if not using docker runtime. See the [Kubernetes documentation][11]. Defaults to `/var/lib/docker/containers`.    

`agent.log.enabled`
: Enable this to activate Datadog Agent log collection. See the [Log Collection][10] documentation.   

`agent.log.logsConfigContainerCollectAll`
: Enable this to allow log collection for all containers. See the [Log Collection][10] documentation.  

`agent.log.openFilesLimit`
: Set the maximum number of logs files that the Datadog Agent tails up to. Increasing this limit can increase resource consumption of the Agent. See the [Log Collection][10] documentation. Defaults to 100.       

`agent.log.podLogsPath`
: Set this to allow log collection from pod log path. Defaults to `/var/log/pods`.   

`agent.log.tempStoragePath`
: This path (always mounted from the host) is used by the Datadog Agent to store information about processed log files. If the Datadog Agent is restarted, it allows you to start tailing the log files from the right offset. Defaults to `/var/lib/datadog-agent/logs`.     

`agent.priorityClassName`
: If specified, indicates the pod's priority. `system-node-critical` and `system-cluster-critical` are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a `PriorityClass` object with that name. If not specified, the pod priority will be default or zero if there is no default.      

`agent.process.enabled`
: Enable this to activate live process monitoring. Note: `/etc/passwd` is automatically mounted to allow username resolution. [See the Process documentation][12].       

`agent.process.env`
: The Datadog Agent supports many [environment variables][3].   

`agent.process.resources.limits`
: Describes the maximum amount of compute resources allowed. See the [Kubernetes documentation][3].   

`agent.process.resources.requests`
: Describes the minimum amount of compute resources required. If `requests` is omitted for a container, it defaults to `limits` if that is explicitly specified, otherwise to an implementation-defined value. See the [Kubernetes documentation][3].         

`agent.rbac.create`
: Used to configure RBAC resources creation.        

`agent.rbac.serviceAccountName`
: Used to set up the service account name to use `Ignored` if the field `Create` is true.    

`agent.systemProbe.appArmorProfileName`
: Specify an AppArmor profile.   

`agent.systemProbe.bpfDebugEnabled`
: Logging for kernel debug.         

`agent.systemProbe.conntrackEnabled`
: Enable the system-probe agent to connect to the netlink/conntrack subsystem to add NAT information to connection data. [See the Conntrack documentation][13]. 

`agent.systemProbe.debugPort`
: Specify the port to expose pprof and expvar for system-probe agent.  

`agent.systemProbe.enabled`
: Enable this to activate live process monitoring. Note: `/etc/passwd` is automatically mounted to allow username resolution. [See the Process documentation][12].          

`agent.systemProbe.env`
: The Datadog SystemProbe supports many [environment variables][2].

`agent.systemProbe.resources.limits`
: Describes the maximum amount of compute resources allowed. See the [Kubernetes documentation][3].   

`agent.systemProbe.resources.requests`
: Describes the minimum amount of compute resources required. If `requests` is omitted for a container, it defaults to `limits` if that is explicitly specified, otherwise to an implementation-defined value. See the [Kubernetes documentation][3].          

`agent.systemProbe.secCompCustomProfileConfigMap`
: Specify a pre-existing ConfigMap containing a custom SecComp profile. 

`agent.systemProbe.secCompProfileName`
: Specify a seccomp profile.     

`agent.systemProbe.secCompRootPath`
: Specify the seccomp profile root directory.

`agent.systemProbe.securityContext.allowPrivilegeEscalation`
: Controls whether a process can gain more privileges than its parent process. This Boolean directly controls if the `no_new_privs` flag will be set on the container process. `AllowPrivilegeEscalation` is true always when the container is: 1) run as `Privileged` 2) has `CAP_SYS_ADMIN`.                 

`agent.systemProbe.securityContext.capabilities.add`
: Added capabilities.  

`agent.systemProbe.securityContext.capabilities.drop`
: Removed capabilities.

`agent.systemProbe.securityContext.privileged`
: Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false.  

`agent.systemProbe.securityContext.procMount`
: Denotes the type of proc mount to use for the containers. The default is `DefaultProcMount` which uses the container runtime defaults for read-only paths and masked paths. This requires the `ProcMountType` feature flag to be enabled.      

`agent.systemProbe.securityContext.readOnlyRootFilesystem`
: Whether this container has a read-only root filesystem. Default is `false`.     

`agent.systemProbe.securityContext.runAsGroup`
: The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in `PodSecurityContext`. If set in both `SecurityContext` and `PodSecurityContext`, the value specified in `SecurityContext` takes precedence.      

`agent.systemProbe.securityContext.runAsNonRoot`
: Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in `PodSecurityContext`. If set in both `SecurityContext` and `PodSecurityContext`, the value specified in `SecurityContext` takes precedence.  

`agent.systemProbe.securityContext.runAsUser`
: The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in `PodSecurityContext`. If set in both `SecurityContext` and `PodSecurityContext`, the value specified in `SecurityContext` takes precedence.                  

`agent.systemProbe.securityContext.seLinuxOptions.level`
: SELinux level label that applies to the container.                   

`agent.systemProbe.securityContext.seLinuxOptions.role`
: SELinux role label that applies to the container.                   

`agent.systemProbe.securityContext.seLinuxOptions.type`
: SELinux type label that applies to the container.                   

`agent.systemProbe.securityContext.seLinuxOptions.user`
: SELinux user label that applies to the container.                   

`agent.systemProbe.securityContext.windowsOptions.gmsaCredentialSpec`
: `GMSACredentialSpec` is where the [GMSA admission webhook][7] inlines the contents of the GMSA credential spec named by the `GMSACredentialSpecName` field. This field is alpha-level and is only honored by servers that enable the WindowsGMSA feature flag.

`agent.systemProbe.securityContext.windowsOptions.gmsaCredentialSpecName`
: `GMSACredentialSpecName` is the name of the GMSA credential spec to use. This field is alpha-level and is only honored by servers that enable the WindowsGMSA feature flag.         

`agent.systemProbe.securityContext.windowsOptions.runAsUserName`
: Use the `UserName` in Windows to run the entry point of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in `PodSecurityContext`. If set in both `SecurityContext` and `PodSecurityContext`, the value specified in `SecurityContext` takes precedence. This field is beta-level and may be disabled with the `WindowsRunAsUserName` feature flag.                  

`agent.useExtendedDaemonset`
: Use ExtendedDaemonset for Agent deployment. Default value is false.           

`clusterAgent.additionalAnnotations`
: `AdditionalAnnotations` provide annotations that are added to the Cluster Agent Pods.            

`clusterAgent.additionalLabels`
: `AdditionalLabels` provide labels that are added to the cluster checks runner Pods. 

`clusterAgent.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights. That is, for each node that meets all of the scheduling requirements (resource request, `requiredDuringScheduling` affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding `matchExpressions`; the node(s) with the highest sum are the most preferred.     

`clusterAgent.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms`
: Required. A list of node selector terms. The terms are `OR`ed.                  

`clusterAgent.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, `requiredDuringScheduling` affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding `podAffinityTerm`; the node(s) with the highest sum are the most preferred.           

`clusterAgent.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each `podAffinityTerm` are intersected, i.e. all terms must be satisfied.            

`clusterAgent.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, `requiredDuringScheduling` anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding `podAffinityTerm`; the node(s) with the highest sum are the most preferred. 

`clusterAgent.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.  

`clusterAgent.config.admissionController.enabled`
: Enable the admission controller to be able to inject APM/DogStatsD config and standard tags (env, service, version) automatically into your pods.             

`clusterAgent.config.admissionController.mutateUnlabelled`
: Enables injecting config without having the pod label `admission.datadoghq.com/enabled="true"`                

`clusterAgent.config.admissionController.serviceName`
: Corresponds to the webhook service name.       

`clusterAgent.config.clusterChecksEnabled`
: Enable the Cluster Checks and Endpoint Checks feature on both the Cluster Agent and the DaemonSet. See the [Cluster Checks][14] documentation. Autodiscovery through Kube Service annotations is automatically enabled.                  

`clusterAgent.config.confd.configMapName`
: Name of a ConfigMap used to mount a directory.                   

`clusterAgent.config.env`
: The Datadog Agent supports many [environment variables][2].

`clusterAgent.config.externalMetrics.enabled`
: Enable the `metricsProvider` to be able to scale based on metrics in Datadog.    

`clusterAgent.config.externalMetrics.port`
: If specified, configures the `metricsProvider` external metrics service port.     

`clusterAgent.config.externalMetrics.useDatadogMetrics`
: Enable usage of DatadogMetrics CRD (allow to scale on arbitrary queries).      

`clusterAgent.config.logLevel`
: Set logging verbosity. Valid log levels are: `trace`, `debug`, `info`, `warn`, `error`, `critical`, and `off`.    

`clusterAgent.config.resources.limits`
: Describes the maximum amount of compute resources allowed. See the [Kubernetes documentation][3]. 

`clusterAgent.config.resources.requests`
: Describes the minimum amount of compute resources required. If `requests` is omitted for a container, it defaults to `limits` if that is explicitly specified, otherwise to an implementation-defined value. See the [Kubernetes documentation][3].   

`clusterAgent.config.volumeMounts`
: Specify additional volume mounts in the Datadog Cluster Agent container.       

`clusterAgent.config.volumes`
: Specify additional volumes in the Datadog Cluster Agent container.             

`clusterAgent.customConfig.configData`
: Corresponds to the configuration file content.  

`clusterAgent.customConfig.configMap.fileKey`
: Corresponds to the key used in the `ConfigMap.Data` to store the configuration file content.  

`clusterAgent.customConfig.configMap.name`
: Name the ConfigMap.      

`clusterAgent.deploymentName`
: Name of the Cluster Agent Deployment to create or migrate from.                

`clusterAgent.image.name`
: Define the image to use. Use `gcr.io/datadoghq/agent:latest` for Datadog Agent 6. Use `datadog/dogstatsd:latest` for stand-alone Datadog Agent DogStatsD. Use `gcr.io/datadoghq/cluster-agent:latest` for Datadog Cluster Agent.     

`clusterAgent.image.pullPolicy`
: The Kubernetes pull policy. Use `Always`, `Never`, or `IfNotPresent`.                  

`clusterAgent.image.pullSecrets`
: Specifies Docker registry credentials. See the [Kubernetes documentation][9].       

`clusterAgent.nodeSelector`
: Selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. See the [Kubernetes documentation][15].     

`clusterAgent.priorityClassName`
: If specified, indicates the pod's priority. `system-node-critical` and `system-cluster-critical` are two special keywords that indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a `PriorityClass` object with that name. If not specified, the pod priority will be default or zero if there is no default.      

`clusterAgent.rbac.create`
: Used to configure RBAC resources creation.        

`clusterAgent.rbac.serviceAccountName`
: Used to set up the service account name to use. Ignored if the field `Create` is true.    

`clusterAgent.replicas`
: Number of the Cluster Agent replicas.             

`clusterAgent.tolerations`
: If specified, the Cluster Agent pod's tolerations.        

`clusterChecksRunner.additionalAnnotations`
: Provide annotations that will be added to the cluster checks runner Pods.    

`clusterChecksRunner.additionalLabels`
: Provide labels that will be added to the cluster checks runner Pods. 

`clusterChecksRunner.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, `requiredDuringScheduling` affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.     

`clusterChecksRunner.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms`
: Required. A list of node selector terms. The terms are `OR`ed.                  

`clusterChecksRunner.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, `requiredDuringScheduling` affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding `podAffinityTerm`; the node(s) with the highest sum are the most preferred.           

`clusterChecksRunner.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each `podAffinityTerm` are intersected, i.e. all terms must be satisfied.            

`clusterChecksRunner.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, `requiredDuringScheduling` anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding `podAffinityTerm`; the node(s) with the highest sum are the most preferred. 

`clusterChecksRunner.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.  

`clusterChecksRunner.config.env`
: The Datadog Agent supports many [environment variables][2].  

`clusterChecksRunner.config.logLevel`
: Set logging verbosity. Valid log levels are: `trace`, `debug`, `info`, `warn`, `error`, `critical`, and `off`.    

`clusterChecksRunner.config.resources.limits`
: Limits describes the maximum amount of compute resources allowed. See the [Kubernetes documentation][3].

`clusterChecksRunner.config.resources.requests`
: Describes the minimum amount of compute resources required. If `requests` is omitted for a container, it defaults to `limits` if that is explicitly specified, otherwise to an implementation-defined value. See the [Kubernetes documentation][3].  

`clusterChecksRunner.config.volumeMounts`
: Specify additional volume mounts in the Datadog Cluster Check Runner container.

`clusterChecksRunner.config.volumes`
: Specify additional volumes in the Datadog Cluster Check Runner container.      

`clusterChecksRunner.customConfig.configData`
: Corresponds to the configuration file content.  

`clusterChecksRunner.customConfig.configMap.fileKey`
: Corresponds to the key used in the `ConfigMap.Data` to store the configuration file content.  

`clusterChecksRunner.customConfig.configMap.name`
: Name the ConfigMap.      

`clusterChecksRunner.deploymentName`
: Name of the cluster checks deployment to create or migrate from.               

`clusterChecksRunner.image.name`
: Define the image to use Use `gcr.io/datadoghq/agent:latest` for Datadog Agent 6. Use `datadog/dogstatsd:latest` for standalone Datadog Agent DogStatsD. Use `gcr.io/datadoghq/cluster-agent:latest` for Datadog Cluster Agent.    

`clusterChecksRunner.image.pullPolicy`
: The Kubernetes pull policy. Use `Always`, `Never`, or `IfNotPresent`.                  

`clusterChecksRunner.image.pullSecrets`
: It is possible to specify docker registry credentials. See the [Kubernetes documentation][9].       

`clusterChecksRunner.nodeSelector`
: Selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. See the [Kubernetes documentation][15].   

`clusterChecksRunner.priorityClassName`
: If specified, indicates the pod's priority. `system-node-critical` and `system-cluster-critical` are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a `PriorityClass` object with that name. If not specified, the pod priority will be default or zero if there is no default.      

`clusterChecksRunner.rbac.create`
: Used to configure RBAC resources creation.        

`clusterChecksRunner.rbac.serviceAccountName`
: Used to set up the service account name to use. Ignored if the field `Create` is true.    

`clusterChecksRunner.replicas`
: Number of the Cluster Agent replicas.             

`clusterChecksRunner.tolerations`
: If specified, the Cluster Check pod's tolerations.       

`clusterName`
: Set a unique cluster name to allow scoping hosts and Cluster Checks Runner easily.     

`credentials.apiKey`
: Set this to your Datadog API key before the Agent runs.

`credentials.apiKeyExistingSecret`
: DEPRECATED. To pass the API key through an existing secret, consider `apiSecret` instead. If set, this parameter takes precedence over `apiKey`.   

`credentials.apiSecret.keyName`
: Key of the secret to use.          

`credentials.apiSecret.secretName`
: Name of the secret.             

`credentials.appKey`
: If you are using `clusterAgent.metricsProvider.enabled = true`, you must set a Datadog application key for read access to your metrics.    

`credentials.appKeyExistingSecret`
: DEPRECATED. To pass the app key through an existing secret, consider `appSecret` instead. If set, this parameter takes precedence over `appKey`.   

`credentials.appSecret.keyName`
: Key of the secret to use.          

`credentials.appSecret.secretName`
: Name of the secret.             

`credentials.token`
: A preshared key between the Node Agents and the Cluster Agent. This needs to be at least 32 characters a-zA-z.         

`credentials.useSecretBackend`
: Use the Agent secret backend feature for retreiving all credentials needed by the different components: Agent, Cluster, Cluster Checks. If `useSecretBackend:true`, other credential parameters will be ignored. Default value is false.       

`site`
: Set the site of the Datadog intake for Agent data:  {{< region-param key="dd_site" code="true" >}}. Defaults to `datadoghq.com`.     




[1]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[2]: https://docs.datadoghq.com/agent/docker/?tab=standard#environment-variables
[3]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
[4]: https://docs.datadoghq.com/agent/kubernetes/event_collection/
[5]: https://docs.datadoghq.com/developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging
[6]: https://docs.datadoghq.com/developers/dogstatsd/unix_socket/
[7]: https://github.com/kubernetes-sigs/windows-gmsa
[8]: https://docs.datadoghq.com/tagging/
[9]: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
[10]: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup
[11]: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#create-manifest
[12]: https://docs.datadoghq.com/graphing/infrastructure/process/#kubernetes-daemonset
[13]: http://conntrack-tools.netfilter.org/
[14]: https://docs.datadoghq.com/agent/cluster_agent/clusterchecks/
[15]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
