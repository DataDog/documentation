---
aliases:
- /es/containers/datadog_operator/config
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/configuration_public.md
description: Configurar opciones de despliegue del Datadog Agent utilizando especificaciones
  de recursos personalizados y manifiestos de ejemplo del Datadog Agent
title: Configurar el Datadog Operator
---
Esta página enumera los parámetros de configuración más utilizados por el Datadog Operator. Para todos los parámetros de configuración, consulta la [especificación de configuración][1] en el repositorio [`DataDog/datadog-operator`][2].

### Ejemplos de manifiestos

* [Manifiesto con recopilación activada de logs, APM, procesos y métricas][3]
* [Manifiesto con recopilación activada de logs, APM y métricas][4]
* [Manifiesto con recopilación activada de APM y métricas][5]
* [Manifiesto con Cluster Agent][6]
* [Manifiesto con tolerancias][7]

## Opciones globales

La tabla de esta sección enumera los parámetros configurables para el recurso `DatadogAgent`. Para sobrescribir parámetros de componentes individuales (Node Agent, Cluster Agent o Cluster Checks Runner) consulta las [opciones de sobrescritura](#override-options).

Por ejemplo: el siguiente manifiesto utiliza el parámetro `global.clusterName` para definir un nombre de clúster personalizado:

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

{{% collapse-content title="Parámetros" level="h4" expanded=true id="global-options-list" %}}
`features.admissionController.agentCommunicationMode`
: AgentCommunicationMode corresponde al modo utilizado por las bibliotecas de aplicaciones de Datadog para comunicarse con el Agent. Puede ser "hostip", "service" o "socket".

`features.admissionController.agentSidecarInjection`
: AgentSidecarInjection contiene configuraciones de inyección de sidecars del Agent. Consulta [enlace](https://docs.datadoghq.com/integrations/eks_fargate/?tab=admissioncontrollerdatadogoperator) para obtener más información.

`features.admissionController.cwsInstrumentation.enabled`
: Activa el endpoint del controlador de admisión de CWS Instrumentation. Por defecto: false.

`features.admissionController.cwsInstrumentation.mode`
: Define el comportamiento del endpoint de CWS Instrumentation, y puede ser "init_container" o "remote_copy". Por defecto: "remote_copy".

`features.admissionController.enabled`
: Activa el controlador de admisión. Por defecto: true.

`features.admissionController.failurePolicy`
: FailurePolicy determina cómo se gestionan los errores no reconocidos y de tiempo de espera.

`features.admissionController.kubernetesAdmissionEvents.enabled`
: Activa la función Kubernetes Admission Events. Por defecto: false.

`features.admissionController.mutateUnlabelled`
: MutateUnlabelled activa la inyección de configuración sin la necesidad de la etiqueta (label) del pod 'admission.datadoghq.com/enabled="true"'. Por defecto: false.

`features.admissionController.mutation.enabled`
: Activa el webhook de mutación del controlador de admisión. Por defecto: true.

`features.admissionController.registry`
: Define un registro de imágenes para el controlador de admisión.

`features.admissionController.serviceName`
: ServiceName corresponde al nombre de servicio del webhook.

`features.admissionController.validation.enabled`
: Activa el webhook de validación del controlador de admisión. Por defecto: true.

`features.admissionController.webhookName`
: WebhookName es un nombre personalizado para la MutatingWebhookConfiguration. Por defecto: "datadog-webhook".

`features.apm.enabled`
: Activa la monitorización del rendimiento de la aplicación. Por defecto: true.

`features.apm.errorTrackingStandalone.enabled`
: Activa Error Tracking para servicios backend. Por defecto: false.

`features.apm.hostPortConfig.enabled`
: Activa la configuración del puerto host.

`features.apm.hostPortConfig.hostPort`
: Port toma un número de puerto (0 < x < 65536) para exponer en el host. (La mayoría de los contenedores no necesitan esto.) Si HostNetwork está activado, este valor debe coincidir con ContainerPort.

`features.apm.instrumentation`
: SingleStepInstrumentation permite al agente inyectar bibliotecas de Datadog APM en todos los pods del clúster. La función está en fase beta. Consulta también: https://docs.datadoghq.com/tracing/trace_collection/single-step-apm Activado. Por defecto: false.

`features.apm.unixDomainSocketConfig.enabled`
: Activa el socket de dominio Unix. Por defecto: true.

`features.apm.unixDomainSocketConfig.path`
: Define la ruta de socket utilizada cuando se activa.

`features.asm.iast.enabled`
: Activa Interactive Application Security Testing (IAST). Por defecto: false.

`features.asm.sca.enabled`
: Activa Software Composition Analysis (SCA). Por defecto: false.

`features.asm.threats.enabled`
: Activa ASM App & API Protection. Por defecto: false.

`features.autoscaling.cluster.enabled`
: Activa el producto de autoescalado de clústeres. (Requiere Cluster Agent v7.74.0 o posterior) Por defecto: false.

`features.autoscaling.workload.enabled`
: Activa el producto de autoescalado de cargas de trabajo. Por defecto: false.

`features.clusterChecks.enabled`
: Activa la programación de checks de clústeres en el Cluster Agent. Por defecto: true.

`features.clusterChecks.useClusterChecksRunners`
: Activado, permite a los ejecutores de checks de clústeres ejecutar todos los checks de clústeres. Por defecto: false.

`features.controlPlaneMonitoring.enabled`
: Activa los checks de monitorización de planos de control en el Cluster Agent. Por defecto: true.

`features.cspm.checkInterval`
: CheckInterval define el intervalo de comprobación.

`features.cspm.customBenchmarks`
: CustomBenchmarks contiene tests de rendimiento de CSPM. El contenido del ConfigMap se fusionará con los tests de rendimiento incluidos en el Agent. Los tests de rendimiento con el mismo nombre que los existentes en el Agent tendrán prioridad.

`features.cspm.enabled`
: Activa Cloud Security Posture Management. Por defecto: false.

`features.cspm.hostBenchmarks.enabled`
: Activa tests de rendimiento del host. Por defecto: true.

`features.cws.customPolicies.configData`
: ConfigData corresponde al contenido del archivo de configuración.

`features.cws.customPolicies.configMap.items`
: Asigna una `key` de datos de ConfigMap al montaje de la `path` de un archivo.

`features.cws.customPolicies.configMap.name`
: Nombre del ConfigMap.

`features.cws.directSendFromSystemProbe`
: DirectSendFromSystemProbe configura CWS para enviar cargas útiles directamente desde el system-probe, sin utilizar el security-agent. Esta es una función experimental. Ponte en contacto con el servicio de asistencia antes de utilizarla. Por defecto: false.

`features.cws.enabled`
: Activa Cloud Workload Security. Por defecto: false.

`features.cws.enforcement.enabled`
: Activa Enforcement for Cloud Workload Security. Por defecto: true.

`features.cws.network.enabled`
: Activa las detecciones de Cloud Workload Security Network. Por defecto: true.

`features.cws.remoteConfiguration.enabled`
: Activa la configuración remota para Cloud Workload Security. Por defecto: true.

`features.cws.securityProfiles.enabled`
: Activa la recopilación de perfiles de seguridad para Cloud Workload Security. Por defecto: true.

`features.cws.syscallMonitorEnabled`
: SyscallMonitorEnabled activa Syscall Monitoring (recomendado solo para la resolución de problemas). Por defecto: false.

`features.dogstatsd.hostPortConfig.enabled`
: Activa la configuración del puerto host.

`features.dogstatsd.hostPortConfig.hostPort`
: Port toma un número de puerto (0 < x < 65536) para exponer en el host. (La mayoría de los contenedores no necesitan esto.) Si HostNetwork está activado, este valor debe coincidir con ContainerPort.

`features.dogstatsd.mapperProfiles.configData`
: ConfigData corresponde al contenido del archivo de configuración.

`features.dogstatsd.mapperProfiles.configMap.items`
: Asigna una `key` de datos de ConfigMap al montaje de la `path` de un archivo.

`features.dogstatsd.mapperProfiles.configMap.name`
: Nombre del ConfigMap.

`features.dogstatsd.nonLocalTraffic`
: NonLocalTraffic activa el tráfico no local para Dogstatsd. Por defecto: true.

`features.dogstatsd.originDetectionEnabled`
: OriginDetectionEnabled activa la detección de origen para el etiquetado de contenedores. Consulta también: https://docs.datadoghq.com/developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging

`features.dogstatsd.tagCardinality`
: TagCardinality configura la cardinalidad de etiquetas (tags) de las métricas recopiladas mediante la detección de origen (`low`, `orchestrator` o `high`). Consulta también: https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables Cardinalidad por defecto: baja.

`features.dogstatsd.unixDomainSocketConfig.enabled`
: Activa el socket de dominio Unix. Por defecto: true.

`features.dogstatsd.unixDomainSocketConfig.path`
: Define la ruta de socket utilizada cuando se activa.

`features.ebpfCheck.enabled`
: Activa el check eBPF. Por defecto: false.

`features.eventCollection.collectKubernetesEvents`
: CollectKubernetesEvents activa la recopilación de eventos de Kubernetes. Por defecto: true.

`features.eventCollection.collectedEventTypes`
: CollectedEventTypes define la lista de eventos a recopilar cuando UnbundleEvents está activado. Por defecto: [ {"kind":"Pod","reasons":["Failed","BackOff","Unhealthy","FailedScheduling","FailedMount","FailedAttachVolume"]}, {"kind":"Node","reasons":["TerminatingEvictedPod","NodeNotReady","Rebooted","HostPortConflict"]}, {"kind":"CronJob","reasons":["SawCompletedJob"]} ].

`features.eventCollection.unbundleEvents`
: UnbundleEvents permite recopilar eventos de Kubernetes como eventos individuales. Por defecto: false.

`features.externalMetricsServer`
: Configuración de ExternalMetricsServer. Consulta [enlace](https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md) para obtener más información.

`features.gpu.enabled`
: Activa el check del núcleo de monitorización de la GPU. Por defecto: false.

`features.gpu.patchCgroupPermissions`
: PatchCgroupPermissions activa el parcheo de permisos cgroup para la monitorización de la GPU, en caso de que el contenedor no esté correctamente configurado y los contenedores del Agent pierdan el acceso a los dispositivos de la GPU. Por defecto: false.

`features.gpu.privilegedMode`
: PrivilegedMode habilita el módulo GPU Probe en System Probe. Por defecto: false.

`features.gpu.requiredRuntimeClassName`
: PodRuntimeClassName especifica el nombre de la clase de tiempo de ejecución necesaria para la función de monitorización de la GPU. Si el valor es una cadena vacía, la clase de tiempo de ejecución no se define. Por defecto: nvidia.

`features.helmCheck.collectEvents`
: CollectEvents configurado como `true` activa la recopilación de eventos en el check de Helm (Requiere Agent v7.36.0 o posterior y Cluster Agent v1.20.0 o posterior) Por defecto: false.

`features.helmCheck.enabled`
: Activa el check de Helm. Por defecto: false.

`features.helmCheck.valuesAsTags`
: ValuesAsTags recopila valores de Helm de una versión y los utiliza como etiquetas (tags) (Requiere Agent y Cluster Agent v7.40.0 o posterior). Por defecto: {}.

`features.kubeStateMetricsCore.collectCrMetrics`
: `CollectCrMetrics` define recursos personalizados para que los recopile el check del núcleo kube-state-metrics. El Datadog Agent utiliza la misma lógica que las `kube-state-metrics` aguas arriba. Así es su configuración. La estructura exacta y los campos existentes de cada elemento de esta lista se pueden encontrar en: https://github.com/kubernetes/kube-state-metrics/blob/main/docs/metrics/extend/customresourcestate-metrics.md

`features.kubeStateMetricsCore.conf.configData`
: ConfigData corresponde al contenido del archivo de configuración.

`features.kubeStateMetricsCore.conf.configMap.items`
: Asigna una `key` de datos de ConfigMap al montaje de la `path` de un archivo.

`features.kubeStateMetricsCore.conf.configMap.name`
: Nombre del ConfigMap.

`features.kubeStateMetricsCore.enabled`
: Activa Kube State Metrics Core. Por defecto: true.

`features.liveContainerCollection.enabled`
: Activa la recopilación de contenedores para Live Container View. Por defecto: true.

`features.liveProcessCollection.enabled`
: Activa la monitorización de procesos. Por defecto: false.

`features.liveProcessCollection.scrubProcessArguments`
: ScrubProcessArguments activa la depuración de datos confidenciales en las líneas de comando de procesos (contraseñas, tokens, etc. ). Por defecto: true.

`features.liveProcessCollection.stripProcessArguments`
: StripProcessArguments activa la eliminación de todos los argumentos de procesos. Por defecto: false.

`features.logCollection.autoMultiLineDetection`
: AutoMultiLineDetection permite al Agent detectar y agregar automáticamente logs multilínea habituales. Consulta también: https://docs.datadoghq.com/agent/logs/auto_multiline_detection/

`features.logCollection.containerCollectAll`
: ContainerCollectAll activa la recopilación de logs de todos los contenedores. Por defecto: false.

`features.logCollection.containerCollectUsingFiles`: ContainerCollectUsingFiles permite la recopilación de log de archivos en `/var/log/pods en lugar` de utilizar la API de tiempo de ejecución del contenedor. La recopilación de logs de archivos suele ser la forma más eficiente de recopilar logs. Consulta también: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup Por defecto: true.

`features.logCollection.containerLogsPath`
: ContainerLogsPath permite la recopilación de logs de la ruta de logs del contenedor. Establezca una ruta diferente si no estás utilizando el tiempo de ejecución Docker. Consulta también: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#create-manifest Por defecto: `/var/lib/docker/containers`

`features.logCollection.containerSymlinksPath`
: ContainerSymlinksPath permite a la recopilación de logs utilizar enlaces simbólicos en este directorio para validar el ID del contenedor -> pod. Por defecto: `/var/log/containers`

`features.logCollection.enabled`
: Activa la recopilación de logs. Por defecto: false.

`features.logCollection.openFilesLimit`
: OpenFilesLimit define el número máximo de archivos de logs que el Datadog Agent rastrea. Aumentar este límite puede incrementar el consumo de recursos del Agent. Consulta también: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup Por defecto: 100.

`features.logCollection.podLogsPath`
: PodLogsPath permite la recopilación de logs de una ruta de logs de pods. Por defecto: `/var/log/pods`

`features.logCollection.tempStoragePath`
: TempStoragePath (siempre montado desde el host) es utilizado por el Agent para almacenar información sobre los archivos de logs procesados. Si el Agent se reinicia, comienza a procesar archivos de logs inmediatamente. Por defecto: `/var/lib/datadog-agent/logs`

`features.npm.collectDNSStats`
: CollectDNSStats habilita la recopilación de estadísticas DNS. Por defecto: false.

`features.npm.enableConntrack`
: EnableConntrack permite al Agent system-probe conectarse al subsistema netlink/conntrack para añadir información NAT a los datos de conexión. Consulta también: http://conntrack-tools.netfilter.org/ Por defecto: false.

`features.npm.enabled`
: Activa Network Performance Monitoring. Por defecto: false.

`features.oomKill.enabled`
: Activa el check OOMKill basado en eBPF. Por defecto: false.

`features.orchestratorExplorer.conf.configData`
: ConfigData corresponde al contenido del archivo de configuración.

`features.orchestratorExplorer.conf.configMap.items`
: Asigna una `key` de datos de ConfigMap al montaje de la `path` de un archivo.

`features.orchestratorExplorer.conf.configMap.name`
: Nombre del ConfigMap.

`features.orchestratorExplorer.customResources`
: `CustomResources` define recursos personalizados para que el Orchestrator Explorer los recopile. Cada elemento debe seguir la convención `group/version/kind`. Por ejemplo, `datadoghq.com/v1alpha1/datadogmetrics`

`features.orchestratorExplorer.ddUrl`
: Sobrescribe el endpoint de la API del Orchestrator Explorer.. URL por defecto: "https://orchestrator.datadoghq.com".

`features.orchestratorExplorer.enabled`
: Activa el Orchestrator Explorer. Por defecto: true.

`features.orchestratorExplorer.extraTags`
: Etiquetas (tags) adicionales para asociar a los datos recopilados en forma de `a b c`. Se trata de una opción de Cluster Agent distinta de DD_TAGS que se utiliza en el Orchestrator Explorer.

`features.orchestratorExplorer.scrubContainers`
: ScrubContainers activa la depuración de datos confidenciales del contenedor (contraseñas, tokens, etc. ). Por defecto: true.

`features.otelAgentGateway.conf.configData`
: ConfigData corresponde al contenido del archivo de configuración.
 

`features.otelAgentGateway.conf.configMap.items`
: Asigna una `key` de datos de ConfigMap al montaje de la `path` de un archivo.

`features.otelAgentGateway.conf.configMap.name`
: Nombre del ConfigMap.

`features.otelAgentGateway.enabled`
: Activa OTel Agent Gateway. Por defecto: false.

`features.otelAgentGateway.ports`
: Contiene los puertos en los que escucha el OTel Collector. Por defecto: otel-grpc:4317 / otel-http:4318.

`features.otelCollector`
: Configuración de Otel Collector. Consulta [enlace](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator#overview) para obtener más información.

`features.otlp`
: Configuración de ingesta de OTLP. Consulta [enlace](https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest_in_the_agent/?tab=kubernetesoperator) para obtener más información.

`features.processDiscovery.enabled`
: Activa el check de Process Discovery en el Agent. Por defecto: true.

`features.prometheusScrape.additionalConfigs`
: AdditionalConfigs permite añadir configuraciones de check avanzadas de Prometheus con reglas de detección personalizadas.

`features.prometheusScrape.enableServiceEndpoints`
: EnableServiceEndpoints activa la generación de checks exclusivos para endpoints de servicio. Por defecto: false.

`features.prometheusScrape.enabled`
: Activa la detección automática de pods y servicios que exponen métricas de Prometheus. Por defecto: false.

`features.prometheusScrape.version`
: Especifica la versión del check de OpenMetrics. Por defecto: 2.

`features.remoteConfiguration.enabled`
: Activa esta opción para habilitar la configuración remota. Por defecto: true.

`features.sbom.containerImage.analyzers`
: Para utilizar en la recopilación de SBOM.

`features.sbom.containerImage.enabled`
: Activa esta opción para habilitar la recopilación de SBOM. Por defecto: false.

`features.sbom.containerImage.overlayFSDirectScan`
: Activa esta opción para habilitar el análisis directo overlayFS experimental. Por defecto: false.

`features.sbom.containerImage.uncompressedLayersSupport`
: Activa esta opción para habilitar el soporte de capas sin comprimir. Por defecto: false.

`features.sbom.enabled`
: Activa esta opción para habilitar la recopilación de SBOM. Por defecto: false.

`features.sbom.host.analyzers`
: Para utilizar en la recopilación de SBOM.

`features.sbom.host.enabled`
: Activa esta opción para habilitar la recopilación de SBOM. Por defecto: false.

`features.serviceDiscovery.enabled`
: Activa el check de detección de servicios. Por defecto: false.

`features.serviceDiscovery.networkStats.enabled`
: Activa la función Service Discovery Network Stats. Por defecto: true.

`features.tcpQueueLength.enabled`
: Activa el check basado en eBPF de la longitud de la cola TCP. Por defecto: false.

`features.usm.enabled`
: Activa Universal Service Monitoring. Por defecto: false.

`global.checksTagCardinality`
: ChecksTagCardinality configura la cardinalidad de las etiquetas (tags) de las métricas recopiladas por las integraciones (`low`, `orchestrator` o `high`). Consulta también: https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality No se define por defecto para evitar sobrescribir configuraciones DD_CHECKS_TAG_CARDINALITY existentes. El valor por defecto en el Agent es bajo. Ref: https://github.com/DataDog/datadog-agent/blob/856cf4a66142ce91fd4f8a278149436eb971184a/pkg/config/setup/config.go#L625.

`global.clusterAgentToken`
: ClusterAgentToken es el token para la comunicación entre el NodeAgent y el ClusterAgent.

`global.clusterAgentTokenSecret.keyName`
: KeyName es la clave del secreto a utilizar.

`global.clusterAgentTokenSecret.secretName`
: SecretName es el nombre del secreto.

`global.clusterName`
: ClusterName establece un nombre de clúster único para el despliegue a fin de delimitar la monitorización en la aplicación Datadog.

`global.containerStrategy`
: ContainerStrategy determina si los Agents se ejecutan en un único contenedor o en varios. Por defecto: 'optimized'.

`global.credentials.apiKey`
: APIKey configura tu clave de API Datadog. Consulta también: https://app.datadoghq.com/account/settings#agent/kubernetes

`global.credentials.apiSecret.keyName`
: KeyName es la clave del secreto a utilizar.

`global.credentials.apiSecret.secretName`
: SecretName es el nombre del secreto.

`global.credentials.appKey`
: AppKey configura tu clave de aplicación Datadog. Si utilizas features.externalMetricsServer.enabled = true, debes configurar una clave de aplicación Datadog para el acceso de lectura a tus métricas.

`global.credentials.appSecret.keyName`
: KeyName es la clave del secreto a utilizar.

`global.credentials.appSecret.secretName`
: SecretName es el nombre del secreto.

`global.criSocketPath`
: Ruta al socket de tiempo de ejecución del contenedor (si es diferente de Docker).

`global.csi.enabled`
: Activa el uso del controlador CSI en el Datadog Agent. Requiere la instalación de Datadog CSI Driver https://github.com/DataDog/helm-charts/tree/main/charts/datadog-csi-driver Por defecto: false.

`global.disableNonResourceRules`
: Configura DisableNonResourceRules para excluir NonResourceURLs de ClusterRoles por defecto. Debe ser 'true' para Google Cloud Marketplace.

`global.dockerSocketPath`
: Ruta al socket de tiempo de ejecución de Docker.

`global.endpoint.credentials.apiKey`
: APIKey configura tu clave de API Datadog. Consulta también: https://app.datadoghq.com/account/settings#agent/kubernetes

`global.endpoint.credentials.apiSecret.keyName`
: KeyName es la clave del secreto a utilizar.

`global.endpoint.credentials.apiSecret.secretName`
: SecretName es el nombre del secreto.

`global.endpoint.credentials.appKey`
: AppKey configura tu clave de aplicación Datadog. Si utilizas features.externalMetricsServer.enabled = true, debes configurar una clave de aplicación Datadog para el acceso de lectura a tus métricas.

`global.endpoint.credentials.appSecret.keyName`
: KeyName es la clave del secreto a utilizar.

`global.endpoint.credentials.appSecret.secretName`
: SecretName es el nombre del secreto.

`global.endpoint.url`
: URL define la URL del endpoint.

`global.env`
: Contiene una lista de variables de entorno que se definen para todos los Agents.

`global.fips`
: FIPS contiene la configuración utilizada para personalizar el proxy sidecar FIPS. Consulta [enlace](https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md) para obtener más información.

`global.kubelet.agentCAPath`
: AgentCAPath es la ruta del contenedor donde se almacena el certificado CA de kubelet. Por defecto: '/var/run/host-kubelet-ca.crt' si hostCAPath está configurado, si no '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'

`global.kubelet.host.configMapKeyRef.key`
: Tecla a seleccionar.

`global.kubelet.host.configMapKeyRef.name`
: Del referente. Este campo es obligatorio, pero debido a la compatibilidad con versiones anteriores se permite que esté vacío. Las instancias de este tipo con un valor vacío aquí son casi con toda seguridad erróneas. Más información: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

`global.kubelet.host.configMapKeyRef.optional`
: Especifica si debe definirse el ConfigMap o su clave.

`global.kubelet.host.fieldRef.apiVersion`
: Versión del esquema para el que está escrito el FieldPath. Por defecto: "v1".

`global.kubelet.host.fieldRef.fieldPath`
: Ruta del campo a seleccionar en la versión de API especificada.

`global.kubelet.host.resourceFieldRef.containerName`
: Nombre del contenedor: obligatorio para volúmenes, opcional para variables de entorno.

`global.kubelet.host.resourceFieldRef.divisor`
: Especifica el formato de salida de los recursos expuestos. Por defecto: "1".

`global.kubelet.host.resourceFieldRef.resource`
: Obligatorio: recurso a seleccionar.

`global.kubelet.host.secretKeyRef.key`
: Clave del secreto a seleccionar.  Debe ser una clave secreta válida.

`global.kubelet.host.secretKeyRef.name`
: Del referente. Este campo es obligatorio, pero debido a la compatibilidad con versiones anteriores se permite que esté vacío. Las instancias de este tipo con un valor vacío aquí son casi con toda seguridad erróneas. Más información: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

`global.kubelet.host.secretKeyRef.optional`
: Especifica si debe definirse el secreto o su clave.

`global.kubelet.hostCAPath`
: HostCAPath es la ruta del host donde se almacena el certificado CA de kubelet.

`global.kubelet.podResourcesSocketPath`
: PodResourcesSocketPath es la ruta del host donde se almacena el socket de recursos del pod. Por defecto: `/var/lib/kubelet/pod-resources/`

`global.kubelet.tlsVerify`
: TLSVerify activa la verificación TLS de kubelet. Por defecto: true.

`global.kubernetesResourcesAnnotationsAsTags`
: Proporciona una correspondencia de grupos de recursos Kubernetes a anotaciones que correspondan a etiquetas (tags) Datadog. <KUBERNETES_RESOURCE_GROUP>: <KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY> KUBERNETES_RESOURCE_GROUP debe tener el formato `{resource}.{group}` o `{resource}` (ejemplo: deployments.apps, pods).

`global.kubernetesResourcesLabelsAsTags`
: Proporcione una correspondencia de los grupos de recursos Kubernetes con las etiquetas (labels) correspondientes a las etiquetas (tags) Datadog. <KUBERNETES_RESOURCE_GROUP>: <KUBERNETES_LABEL>: <DATADOG_TAG_KEY> KUBERNETES_RESOURCE_GROUP debe tener la forma `{resource}.{group}` o `{resource}` (ejemplo: deployments.apps, pods)

`global.localService.forceEnableLocalService`
: ForceEnableLocalService fuerza la creación del servicio de política de tráfico interno para que se dirija al Agent que se ejecuta en el nodo local. Este parámetro solo se aplica a Kubernetes v1.21, donde la función está en fase alfa y está desactivada por defecto. (En Kubernetes v1.22 o posterior, la función ha entrado en fase beta y el servicio de tráfico interno se crea por defecto, por lo que este parámetro se ignora). Por defecto: false.

`global.localService.nameOverride`
: NameOverride define el nombre del servicio de tráfico interno al que debe dirigirse el Agent que se ejecuta en el nodo local.

`global.logLevel`
: LogLevel define la verbosidad durante la generación de logs. Puede ser sobrescrito por el contenedor. Los niveles válidos de logs son: trace, debug, info, warn, error, critical, and off. Por defecto: 'info'.

`global.namespaceAnnotationsAsTags`
: Proporciona una correspondencia entre las anotaciones de espacios de nombres Kubernetes y las etiquetas (tags) Datadog. <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>

`global.namespaceLabelsAsTags`
: Proporciona una correspondencia entre las etiquetas (labels) de espacios de nombres Kubernetes y las etiquetas (tags) Datadog. <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>

`global.networkPolicy.create`
: Define si se debe crear una NetworkPolicy para el despliegue actual.

`global.networkPolicy.dnsSelectorEndpoints`
: DNSSelectorEndpoints define el selector de cilio de la entidad del servidor DNS.

`global.networkPolicy.flavor`
: Define qué política de red utilizar.

`global.nodeLabelsAsTags`
: Proporciona una correspondencia entre las etiquetas (labels) de nodos Kubernetes y las etiquetas (tags) Datadog. <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>

`global.originDetectionUnified.enabled`
: Activa el mecanismo unificado para la detección del origen. Por defecto: false.

`global.podAnnotationsAsTags`
: Proporciona una correspondencia entre anotaciones de Kubernetes y las etiquetas (tags) de Datadog. <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>

`global.podLabelsAsTags`
: Proporciona una correspondencia entre las etiquetas (labels) Kubernetes y las etiquetas (tags) Datadog. <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>

`global.registry`
: Es el registro de imágenes a utilizar para todas las imágenes del Agent. Utiliza 'public.ecr.aws/datadog' para AWS ECR. Utiliza 'datadoghq.azurecr.io' para Azure Container Registry. Utiliza "gcr.io/datadoghq" para Google Container Registry. Utiliza "eu.gcr.io/datadoghq" para Google Container Registry en la región de la UE. Utiliza "asia.gcr.io/datadoghq" para Google Container Registry en la región de Asia. Utiliza "docker.io/datadog" para DockerHub. Por defecto: 'gcr.io/datadoghq'.

`global.secretBackend.args`
: Lista de argumentos a pasar al comando (cadenas separadas por espacios).

`global.secretBackend.command`
: Comando backend secreto a utilizar. Datadog proporciona un binario predefinido `/readsecret_multiple_providers.sh`. Más información sobre `/readsecret_multiple_providers.sh` en https://docs.datadoghq.com/agent/configuration/secrets-management/?tab=linux#script-for-reading-from-multiple-secret-providers

`global.secretBackend.enableGlobalPermissions`
: Si se crea un permiso global que permita a los Datadog Agents leer todos los secretos de Kubernetes. Por defecto: `false`.

`global.secretBackend.refreshInterval`
: Intervalo de actualización de los secretos (0 desactiva la actualización). Por defecto: `0`.

`global.secretBackend.roles`
: Para que Datadog lea los secretos especificados, sustituyendo a `enableGlobalPermissions`. Se definen como una lista de espacios de nombres/secretos. Cada espacio de nombres definido necesita estar presente en el controlador del Datadog Agent utilizando `WATCH_NAMESPACE` o `DD_AGENT_WATCH_NAMESPACE`. Consulta también: https://github.com/DataDog/datadog-operator/blob/main/docs/secret_management.md#how-to-deploy-the-agent-components-using-the-secret-backend-feature-with-datadogagent

`global.secretBackend.timeout`
: Tiempo de espera del comando en segundos. Por defecto: `30`.

`global.site`
: Es el sitio de entrada de Datadog al que se envían los datos del Agent. Configúralo como 'datadoghq.com' para enviar los datos al sitio US1 (por defecto). Selecciona "datadoghq.eu" para enviar los datos al sitio de la UE. Selecciona "us3.datadoghq.com" para enviar los datos al sitio US3. Selecciona "us5.datadoghq.com" para enviar datos al sitio US5. Selecciona "ddog-gov.com" para enviar datos al sitio US1-FED. Selecciona "ap1.datadoghq.com" para enviar los datos al sitio AP1. Por defecto: "datadoghq.com".

`global.tags`
: Contiene una lista de etiquetas (tags) para adjuntar a cada métrica, evento y check de servicio recopilado. Más información sobre el etiquetado: https://docs.datadoghq.com/tagging/

`global.useFIPSAgent`
: UseFIPSAgent activa la versión FIPS del Agent. Si es 'true', el proxy FIPS estará siempre desactivado. Por defecto: 'false'.

`override`
: Configuraciones por defecto de los Agents.

{{% /collapse-content %}}

Para obtener una lista completa de parámetros, consulta las [especificaciones de configuración del Operator][8].

## Opciones de sobrescritura

La siguiente tabla enumera los parámetros que pueden utilizarse para sobrescribir la configuración predeterminada o global de componentes individuales. `override` es un mapa con las siguientes claves posibles: `nodeAgent`, `clusterAgent` o `clusterChecksRunner`. Los mapas y las matrices tienen una anotación de tipo en la tabla. En los nombres de los parámetros, `component` se refiere a una de estas claves de componente, y `container` se refiere a un nombre de contenedor específico dentro de ese componente (como `agent`, `cluster-agent`, `process-agent`, `trace (traza)-agent` o `system-probe`).

Por ejemplo: el siguiente manifiesto sobrescribe la imagen y la etiqueta (tag) del Node Agent, además de los límites de recursos del contenedor de la sonda del sistema:

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
En la tabla, `spec.override.nodeAgent.image.name` y `spec.override.nodeAgent.containers.system-probe.resources.limits` aparecen como `[component].image.name` y `[component].containers.[container].resources.limits`, respectivamente.

{{% collapse-content title="Parámetros" level="h4" expanded=true id="override-options-list" %}}
`[component].affinity`
: Si se especifica, las restricciones de programación del pod. Consulta [enlace](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity) para obtener más información.

`[component].annotations`
: _tipo_: `map[string]string`
<br /> Annotations proporciona anotaciones que se añaden a los diferentes pods de componentes (Datadog Agent, Cluster Agent, Cluster Check Runner).

`[component].celWorkloadExclude`
: _tipo_: `[]object`
<br /> CELWorkloadExclude permite excluir cargas de trabajo de la monitorización mediante Common Expression Language (CEL). Consulta https://docs.datadoghq.com/containers/guide/container-discovery-management (Requiere Agent v7.73 o posterior y Cluster Agent v7.73 o posterior).

`[component].containers`
: _tipo_: `map[string]object`
<br /> Configura los parámetros básicos de cada contenedor del Agent. Los nombres de contenedor del Agent válidos son: `agent`, `cluster-agent`, `init-config`, `init-volume`, `process-agent`, `seccomp-setup`, `security-agent`, `system-probe` y `trace-agent`.

`[component].containers.[container].appArmorProfileName`
: AppArmorProfileName especifica un perfil apparmor.

`[component].containers.[container].args`
: _tipo_: `[]string`
<br /> Args permite especificar argumentos adicionales al parámetro `Command`.

`[component].containers.[container].command`
: _tipo_: `[]string`
<br /> El comando permite especificar un punto de entrada personalizado para el contenedor.

`[component].containers.[container].env`
: _tipo_: `[]object`
<br /> Especifica variables de entorno adicionales en el contenedor. Consulta también: https://docs.datadoghq.com/agent/kubernetes/?tab=helm#environment-variables

`[component].containers.[container].healthPort`
: HealthPort del contenedor para la sonda vital interna. Debe ser el mismo que el de las sondas vital/de preparación.

`[component].containers.[container].livenessProbe`
: Configura la sonda vital del contenedor Consulta [enlace](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) para obtener más información.

`[component].containers.[container].logLevel`
: LogLevel define la verbosidad durante la generación de logs (sobrescribela configuración global). Los niveles válidos de logs son: trace, debug, info, warn, error, critical y off. Por defecto: 'info'.

`[component].containers.[container].name`
: Nombre del contenedor que se sobrescribe.

`[component].containers.[container].ports`
: _tipo_: `[]object`
<br /> Especifica puertos adicionales que el contenedor debe exponer. No especificar un puerto aquí NO impide que ese puerto sea expuesto. Consulta la documentación de https://pkg.go.dev/k8s.io/api/core/v1#Container para obtener más información.

`[component].containers.[container].readinessProbe`
: Configura la sonda de preparación del contenedor. Consulta [enlace](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) para obtener más información.

`[component].containers.[container].resources`
: Especifica las solicitudes y los límites de los pods Para obtener una clase QoS garantizada, especifica solicitudes y límites iguales. Consulta también: http://kubernetes.io/docs/user-guide/compute-resources/ Consulta [enlace](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) para obtener más información.

`[component].containers.[container].seccompConfig`
: Configuraciones Seccomp para sobrescribir las acciones del Operator. Para cualquier otra manipulación del perfil Seccomp, utiliza SecurityContext. Consulta [enlace](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#seccomp) para obtener más información.

`[component].containers.[container].securityContext`
: SecurityContext a nivel de contenedor. Consulta [enlace](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) para obtener más información.

`[component].containers.[container].startupProbe`
: Configura la sonda de arranque del contenedor. Consulta [enlace](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) para obtener más información.

`[component].containers.[container].volumeMounts`
: _tipo_: `[]object`
<br /> Especifica montajes de volumen adicionales en el contenedor.

`[component].createPodDisruptionBudget`
: Configura CreatePodDisruptionBudget como true para crear un PodDisruptionBudget para este componente. No aplicable para el Node Agent. Una PDB de Cluster Agent se configura con 1 pod mínimo disponible y una PDB de Cluster Checks Runner se configura con 1 pod máximo no disponible.

`[component].createRbac`
: Configura CreateRbac como false para evitar la creación automática de Role/ClusterRole para este componente.

`[component].customConfigurations`
: _tipo_: `map[string]object`
<br /> CustomConfiguration permite especificar archivos de configuración personalizados para `datadog.yaml`, `datadog-cluster.yaml`, `security-agent.yaml` y `system-probe.yaml`. El contenido se fusiona con la configuración generada por el Datadog Operator, dando prioridad a la configuración personalizada. ADVERTENCIA: Es posible sobrescribir los valores configurados en el `DatadogAgent`.

`[component].customConfigurations.[container].configData`
: ConfigData corresponde al contenido del archivo de configuración.

`features.cws.customPolicies.configMap.items`
: Elementos asigna una `key` de datos de ConfigMap al montaje de la `path` de un archivo.

`[component].customConfigurations.[container].configMap.name`
: Name es el nombre del ConfigMap.

`[component].disabled`
: Desactivado fuerza la desactivación de un componente.

`[component].dnsConfig`
: Especifica los parámetros DNS de un pod. Los parámetros especificados aquí se fusionarán con la configuración DNS generada basada en DNSPolicy. Consulta [enlace](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-config) para obtener más información.

`[component].dnsPolicy`
: Define la política DNS para el pod. Por defecto es "ClusterFirst". Los valores válidos son 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' o 'None'. Los parámetros DNS dados en DNSConfig se fusionarán con la política seleccionada con DNSPolicy. Para tener las opciones DNS configuradas junto con hostNetwork, tienes que especificar la política DNS explícitamente en 'ClusterFirstWithHostNet'. Consulta [enlace](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-config) para obtener más información.

`[component].env`
: _tipo_: `[]object`
<br /> Especifica variables de entorno adicionales para todos los contenedores de este componente La prioridad es Contenedor > Componente. Consulta también: https://docs.datadoghq.com/agent/kubernetes/?tab=helm#environment-variables

`[component].envFrom`
: _tipo_: `[]object`
<br /> EnvFrom especifica los ConfigMaps y secretos a exponer como variables de entorno. La prioridad es var. ent. > envFrom.

`[component].extraChecksd.configDataMap`
: ConfigDataMap corresponde al contenido de los archivos de configuración. La clave debe ser el nombre de archivo en el que se monta el contenido; por ejemplo check.py o check.yaml.

`[component].extraChecksd.configMap.items`
: Elementos asigna una `key` de datos de ConfigMap al montaje de la `path` de un archivo.

`[component].extraChecksd.configMap.name`
: Name es el nombre del ConfigMap.

`[component].extraConfd.configDataMap`
: ConfigDataMap corresponde al contenido de los archivos de configuración. La clave debe ser el nombre de archivo en el que se monta el contenido; por ejemplo check.py o check.yaml.

`[component].extraConfd.configMap.items`
: Elementos asigna una `key` de datos de ConfigMap al montaje de la `path` de un archivo.

`[component].extraConfd.configMap.name`
: Name es el nombre del ConfigMap.

`[component].hostNetwork`
: Red de host obligatoria para este pod. Utiliza el espacio de nombres de red del host.

`[component].hostPID`
: Utiliza el espacio de nombres PID del host.

`[component].image.jmxEnabled`
: Define si la imagen del Agent debe admitir JMX. Se utilizará si el campo `Name` no corresponde a una cadena de imagen completa.

`[component].image.name`
: Define el nombre de la imagen Agent para el pod. Puedes proporcionarlo como: * `<NAME>` - Utiliza `agent` para el Datadog Agent, `cluster-agent` para el Datadog Cluster Agent o `dogstatsd` para DogStatsD. La cadena de imagen completa se deriva de `global.registry`, `[key].image.tag` y `[key].image.jmxEnabled`. * `<NAME>:<TAG>` - Por ejemplo, `agent:latest`. El registro se deriva de `global.registry`. Se ignoran `[key].image.tag` y `[key].image.jmxEnabled`. * `<REGISTRY>/<NAME>:<TAG>` - Por ejemplo, `gcr.io/datadoghq/agent:latest`. Si la cadena de imagen completa se especifica así, se ignoran `global.registry`, `[key].image.tag` y `[key].image.jmxEnabled`.

`[component].image.pullPolicy`
: Política de extracción Kubernetes: Utiliza `Always`, `Never` o `IfNotPresent`.

`[component].image.pullSecrets`
: Es posible especificar credenciales de registro Docker. Consultar https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod

`[component].image.tag`
: Define la etiqueta (tag) de imagen a utilizar. Se utilizará si el campo `Name` no corresponde a una cadena de imagen completa.

`[component].labels`
: _tipo_: `map[string]string`
<br /> AdditionalLabels proporciona etiquetas (labels) que se añaden a los diferentes pods de componentes (Datadog Agent, Cluster Agent, Cluster Check Runner).

`[component].name`
: El nombre sobrescribe el nombre por defecto del recurso.

`[component].nodeSelector`
: tipo_: `map[string]string`
<br /> Mapa de pares clave-valor. Para que este pod se ejecute en un nodo específico, el nodo debe tener estos pares clave-valor como etiquetas (labels). Consultar https://kubernetes.io/docs/concepts/configuration/assign-pod-node/

`[component].priorityClassName`
: Si se especifica, indica la prioridad del pod. "system-node-critical" y "system-cluster-critical" son dos palabras clave especiales que indican las prioridades más altas, siendo la primera la de mayor prioridad. Cualquier otro nombre debe definirse creando un objeto PriorityClass con ese nombre. Si no se especifica, la prioridad del pod es la predeterminada, o cero si no hay una predeterminada.

`[component].replicas`
: Número de réplicas. No aplicable para un despliegue DaemonSet/ExtendedDaemonSet.

`[component].runtimeClassName`
: Si se especifica, indica la RuntimeClass del pod que kubelet debe utilizar para ejecutar el pod. Si la RuntimeClass nombrada no existe, o la IRC no puede ejecutar el manejador correspondiente, el pod entra en la fase terminal fallida. Si no se especifica runtimeClassName, se utiliza el RuntimeHandler por defecto, que es equivalente al comportamiento cuando la función RuntimeClass está desactivada.

`[component].securityContext`
: SecurityContext a nivel del pod. Consulta [enlace](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) para obtener más información.

`[component].serviceAccountAnnotations`
: tipo_: `map[string]string`
<br /> Define las ServiceAccountAnnotations utilizadas por este componente.

`[component].serviceAccountName`
: Define el ServiceAccount utilizado por este componente. Se ignora si el campo CreateRbac es true.

`[component].tolerations`
: _tipo_: `[]object`
<br /> Configura las tolerancias de los componentes. Consulta [enlace](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) para obtener más información.

`[component].topologySpreadConstraints`
: tipo_: `[]object`
<br /> TopologySpreadConstraints describe cómo debe distribuirse un grupo de pods en los dominios de topología. El programador organiza los pods de forma que se respeten las restricciones. Todas las topologySpreadConstraints son ANDed. Consulta [enlace](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#topologyspreadconstraint) para obtener más información.

`[component].updateStrategy`
: Estrategia de despliegue que se utilizará para sustituir los pods existentes por otros nuevos. Consulta [enlace](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/#updating-a-daemonset) para obtener más información.

`[component].volumes`
: _tipo_: `[]object`
<br /> Especifica volúmenes adicionales en los diferentes componentes (Datadog Agent, Cluster Agent, Cluster Check Runner).

{{% /collapse-content %}}


Para obtener una lista completa de parámetros, consulta las [especificaciones de configuración del Operator][9].

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[2]: https://github.com/DataDog/datadog-operator/
[3]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-all.yaml
[4]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
[5]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-apm-hostport.yaml
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-clusteragent.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-tolerations.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#all-configuration-options
[9]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override