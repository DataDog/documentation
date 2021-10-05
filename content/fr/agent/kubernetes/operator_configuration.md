---
title: Configuration de l'Operator
kind: faq
further_reading:
  - link: agent/kubernetes/log
    tag: Documentation
    text: Datadog et Kubernetes
---
## Toutes les options de configuration

Le tableau suivant répertorie les paramètres configurables pour la ressource `DatadogAgent`. Par exemple, si vous souhaitez définir une valeur pour `agent.image.name`, votre ressource `DatadogAgent` ressemblera à ceci :

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
: `AdditionalAnnotations` permet de spécifier des annotations qui seront ajoutées aux pods de l'Agent.

`agent.additionalLabels`
: `AdditionalLabels` permet de spécifier des étiquettes qui seront ajoutées aux pods de l'exécuteur de checks de cluster. 

`agent.apm.enabled`
: Permet d'activer l'APM et le tracing sur le port 8126. Consultez la [documentation de Datadog relative à Docker][1]. 

`agent.apm.env`
: L'Agent Datadog prend en charge de nombreuses [variables d'environnement][2]. 

`agent.apm.hostPort`
: Numéro du port à exposer sur le host. Lorsque spécifié, doit correspondre à un numéro de port valide, 0 < x < 65536. Si `HostNetwork` est spécifié, la valeur doit correspondre à `ContainerPort`. La plupart des conteneurs ne nécessitent pas ce paramètre.             

`agent.apm.resources.limits`
: Spécifie la quantité maximale de ressources de calcul autorisées. Pour en savoir plus, consultez la [documentation Kubernetes][3].  

`agent.apm.resources.requests`
: `Requests` spécifie la quantité minimale de ressources de calcul requises. Si `requests` n'est pas défini pour un conteneur, la valeur `limits` est utilisée si celle-ci est explicitement définie. Sinon, une valeur définie au niveau de l'implémentation est utilisée. Pour en savoir plus, consultez la [documentation Kubernetes][3].   

`agent.config.checksd.configMapName`
: Nom d'une ConfigMap utilisée pour monter un répertoire.                   

`agent.config.collectEvents`
: Permet de démarrer la collecte d'événements via l'API Kubernetes. [Consultez la documentation relative à la collecte d'événements][4].      

`agent.config.confd.configMapName`
: Nom d'une ConfigMap utilisée pour monter un répertoire.                   

`agent.config.criSocket.criSocketPath`
: Chemin du socket d'exécution de conteneur (si différent de Docker). Ce paramètre est pris en charge à partir de l'Agent 6.6.0.                  

`agent.config.criSocket.dockerSocketPath`
: Chemin du socket d'exécution Docker.                

`agent.config.ddUrl`
: Le host du serveur d'admission Datadog vers lequel envoyer les données de l'Agent. Définissez ce paramètre uniquement si vous souhaitez que l'Agent envoie ses données vers une URL personnalisée. Remplace le paramètre de site défini dans `site`.        

`agent.config.dogstatsd.dogstatsdOriginDetection`
: Active la détection de l'origine pour le tagging de conteneur. Consultez la [documentation relative à la détection de l'origine pour les sockets Unix][5].  

`agent.config.dogstatsd.useDogStatsDSocketVolume`
: Active DogStatsD sur un socket de domaine Unix. [Consultez la documentation relative aux sockets Unix][6]. 

`agent.config.env`
: L'Agent Datadog prend en charge de nombreuses [variables d'environnement][2].   

`agent.config.hostPort`
: Numéro du port à exposer sur le host. Lorsque spécifié, doit correspondre à un numéro de port valide, 0 < x < 65536. Si `HostNetwork` est spécifié, la valeur doit correspondre à `ContainerPort`. La plupart des conteneurs ne nécessitent pas ce paramètre.             

`agent.config.leaderElection`
: Active le mécanisme d'élection de leader pour la collecte d'événements.   

`agent.config.logLevel`
: Définit le niveau de détail de la journalisation. Les niveaux de log valides sont les suivants : `trace`, `debug`, `info`, `warn`, `error`, `critical` et `off`.   

`agent.config.podAnnotationsAsTags`
: Permet de spécifier un mappage d'annotations Kubernetes avec des tags Datadog. `<ANNOTATIONS_KUBERNETES>: <CLÉ_TAG_DATADOG>`  

`agent.config.podLabelsAsTags`
: Permet de spécifier un mappage d'étiquettes Kubernetes avec des tags Datadog. `<ÉTIQUETTE_KUBERNETES>: <CLÉ_TAG_DATADOG>`      

`agent.config.resources.limits`
: Spécifie la quantité maximale de ressources de calcul autorisées. [Consultez la documentation Kubernetes][3]. 

`agent.config.resources.requests`
: Spécifie la quantité minimale de ressources de calcul requises. Si `requests` n'est pas défini pour un conteneur, la valeur `limits` est utilisée si celle-ci est explicitement définie. Sinon, une valeur définie au niveau de l'implémentation est utilisée. [Consultez la documentation Kubernetes][3].     

`agent.config.securityContext.allowPrivilegeEscalation`
: Permet de spécifier si un processus peut obtenir ou non plus de privilèges que son processus parent. Ce booléen détermine si le flag `no_new_privs` est défini ou non sur le processus du conteneur. `AllowPrivilegeEscalation` est toujours défini sur true lorsque le conteneur est exécuté en mode `Privileged` et dispose de l'autorisation `CAP_SYS_ADMIN`.               

`agent.config.securityContext.capabilities.add`
: Capacités ajoutées.  

`agent.config.securityContext.capabilities.drop`
: Capacités supprimées.

`agent.config.securityContext.privileged`
: Permet d'exécuter le conteneur en mode Privileged. Les processus dans les conteneurs exécutés en mode Privileged sont essentiellement équivalents à root sur le host. Valeur par défaut : `false`.  

`agent.config.securityContext.procMount`
: `procMount` spécifie le type de montage proc à utiliser pour les conteneurs. La valeur par défaut est `DefaultProcMount`, qui utilise les valeurs par défaut du runtime de conteneur pour les chemins en lecture seule et les chemins masqués. Ce paramètre nécessite que le feature flag `ProcMountType` soit activé.      

`agent.config.securityContext.readOnlyRootFilesystem`
: Spécifie si ce conteneur possède un système de fichiers root en lecture seule. Valeur par défaut : `false`.     

`agent.config.securityContext.runAsGroup`
: Le GID pour exécuter le point d'entrée du processus du conteneur. Utilise la valeur par défaut du runtime s'il n'est pas défini. Peut également être défini dans `PodSecurityContext`. Si ce paramètre est défini à la fois dans `SecurityContext` et `PodSecurityContext`, la valeur indiquée dans `SecurityContext` a la priorité.      

`agent.config.securityContext.runAsNonRoot`
: Indique que le conteneur doit être exécuté en tant qu'utilisateur non-root. Si ce paramètre est défini sur true, le Kubelet valide l'image lors de l'exécution pour s'assurer que le conteneur n'est pas exécuté en tant qu'UID 0 (root) et pour empêcher le démarrage du conteneur dans le cas contraire. Si ce paramètre n'est pas défini ou s'il est défini sur false, aucune validation de ce type n'est effectuée. Peut également être défini dans `PodSecurityContext`. Si ce paramètre est défini dans `SecurityContext` et `PodSecurityContext`, la valeur indiquée dans `SecurityContext` a la priorité.  

`agent.config.securityContext.runAsUser`
: L'UID pour exécuter le point d'entrée du processus du conteneur. Valeur par défaut : utilisateur indiqué dans les métadonnées d'image si le paramètre n'est pas spécifié. Peut également être défini dans `PodSecurityContext`. Si ce paramètre est défini dans `SecurityContext` et `PodSecurityContext`, la valeur indiquée dans `SecurityContext` a la priorité.                  

`agent.config.securityContext.seLinuxOptions.level`
: Étiquette de niveau SELinux qui s'applique au conteneur.                   

`agent.config.securityContext.seLinuxOptions.role`
: Étiquette de rôle SELinux qui s'applique au conteneur.                   

`agent.config.securityContext.seLinuxOptions.type`
: Étiquette de type SELinux qui s'applique au conteneur.                   

`agent.config.securityContext.seLinuxOptions.user`
: Étiquette d'utilisateur SELinux qui s'applique au conteneur.                   

`agent.config.securityContext.windowsOptions.gmsaCredentialSpec`
: `GMSACredentialSpec` est l'emplacement au niveau duquel le [webhook d'admission GMSA][7] intègre le contenu de la spécification d'identifiant GMSA spécifiée via le champ `GMSACredentialSpecName`. Il s'agit d'un champ de niveau alpha qui est traité uniquement par les serveurs qui activent le feature flag WindowsGMSA.

`agent.config.securityContext.windowsOptions.gmsaCredentialSpecName`
: `GMSACredentialSpecName` est le nom de la spécification d'identifiant GMSA à utiliser. Il s'agit d'un champ de niveau alpha qui est traité uniquement par les serveurs qui activent le feature flag WindowsGMSA.         

`agent.config.securityContext.windowsOptions.runAsUserName`
: Le `UserName` dans Windows à utiliser pour exécuter le point d'entrée du processus du conteneur. Valeur par défaut : utilisateur indiqué dans les métadonnées de l'image si aucune valeur n'est indiquée. Peut également être défini dans `PodSecurityContext`. Si ce paramètre est défini dans `SecurityContext` et `PodSecurityContext`, la valeur indiquée dans `SecurityContext` a la priorité. Il s'agit d'un champ de niveau bêta qui peut être désactivé avec le feature flag `WindowsRunAsUserName`.                  

`agent.config.tags`
: Liste de tags à associer à chaque métrique, événement et check de service recueilli par cet Agent. Consultez la [documentation relative au tagging][8].     

`agent.config.tolerations`
: Permet de spécifier les tolérances du pod de l'Agent.       

`agent.config.volumeMounts`
: Permet de spécifier des montages de volume supplémentaires dans le conteneur de l'Agent Datadog.               

`agent.config.volumes`
: Permet de spécifier des volumes supplémentaires dans le conteneur de l'Agent Datadog. 

`agent.customConfig.configData`
: Correspond au contenu du fichier de configuration.  

`agent.customConfig.configMap.fileKey`
: Correspond à la clé utilisée dans ConfigMap.Data pour stocker le contenu du fichier de configuration. 

`agent.customConfig.configMap.name`
: Nom de la ConfigMap.      

`agent.daemonsetName`
: Nom du DaemonSet à créer ou à partir duquel effectuer une migration.  

`agent.deploymentStrategy.canary.duration`
: 

`agent.deploymentStrategy.canary.paused`
: 

`agent.deploymentStrategy.canary.replicas`
: 

`agent.deploymentStrategy.reconcileFrequency`
: Fréquence de rapprochement des valeurs ExtendDaemonSet.   

`agent.deploymentStrategy.rollingUpdate.maxParallelPodCreation`
: Nombre maximum de pods créés en parallèle. Valeur par défaut : 250.          

`agent.deploymentStrategy.rollingUpdate.maxPodSchedulerFailure`
: `maxPodSchedulerFailure` est le nombre maximum de pods planifiés sur son nœud en raison d'une défaillance du planificateur : limitation des ressources. La valeur peut être un nombre absolu (par exemple : 5) ou un pourcentage du nombre total de pods DaemonSet au début de la mise à jour (par exemple : 10 %). Absolu.

`agent.deploymentStrategy.rollingUpdate.maxUnavailable`
: Le nombre maximum de pods DaemonSet qui peuvent être indisponibles pendant la mise à jour. La valeur peut être un nombre absolu (par exemple : 5) ou un pourcentage du nombre total de pods DaemonSet au début de la mise à jour (par exemple : 10 %). Le nombre absolu est calculé à partir du pourcentage en arrondissant le résultat au chiffre supérieur. Cette valeur ne peut pas être égale à 0. Valeur par défaut : 1.        

`agent.deploymentStrategy.rollingUpdate.slowStartAdditiveIncrease`
: La valeur peut être un nombre absolu (par exemple : 5) ou un pourcentage du nombre total de pods DaemonSet au début de la mise à jour (par exemple : 10 %). Valeur par défaut : 5.     

`agent.deploymentStrategy.rollingUpdate.slowStartIntervalDuration`
: Durée de l'intervalle. Valeur par défaut : 1 min.    

`agent.deploymentStrategy.updateStrategyType`
: Stratégie de mise à jour utilisée pour le DaemonSet.       

`agent.dnsConfig.nameservers`
: Liste d'adresses IP de serveurs de noms DNS. Celles-ci viennent s'ajouter aux serveurs de noms de base générés à partir de `dnsPolicy`. Les serveurs de noms en double sont supprimés.      

`agent.dnsConfig.options`
: Liste d'options de résolution de DNS. Celles-ci sont fusionnées avec les options de base générées à partir de `dnsPolicy`. Les entrées en double sont supprimées. Les options de résolution indiquées dans `options` remplacent celles qui figurent dans la stratégie `dnsPolicy` de base.          

`agent.dnsConfig.searches`
: Liste de domaines de recherche DNS pour la recherche de hostname. Ces valeurs viennent s'ajouter aux chemins de recherche de base générés à partir de `dnsPolicy`. Les chemins de recherche en double sont supprimés. 

`agent.dnsPolicy`
: Définit la stratégie DNS pour le pod. Valeur par défaut : `ClusterFirst`. Valeurs autorisées : `ClusterFirstWithHostNet`, `ClusterFirst`, `Default` ou `None`. Les paramètres DNS indiqués dans `dnsConfig` sont fusionnés avec la stratégie sélectionnée via `dnsPolicy`. Pour définir des options DNS avec `hostNetwork`, vous devez définir explicitement `dnsPolicy` sur `ClusterFirstWithHostNet`.                   

`agent.env`
: Variables d'environnement pour tous les Agents Datadog. [Consultez la documentation relative aux variables d'environnement Docker][2].   

`agent.hostNetwork`
: Réseau host requis pour ce pod. Utiliser l'espace de nommage réseau du host. Si cette option est définie, les ports qui seront utilisés doivent être indiqués. Valeur par défaut : `false`.    

`agent.hostPID`
: Utiliser l'espace de nommage PID du host. Facultatif. Valeur par défaut : `false`. 

`agent.image.name`
: Définit l'image à utiliser. Utilisez `gcr.io/datadoghq/agent:latest` pour l'Agent Datadog 6. Utilisez `datadog/dogstatsd:latest` pour la version autonome de DogStatsD. Utilisez `gcr.io/datadoghq/cluster-agent:latest` pour l'Agent de cluster Datadog.  

`agent.image.pullPolicy`
: Stratégie de pull Kubernetes. Utilisez `Always`, `Never` ou `IfNotPresent`.                

`agent.image.pullSecrets`
: Indique les identifiants de registre Docker. [Consultez la documentation Kubernetes][9].     

`agent.log.containerCollectUsingFiles`
: Recueillir les logs à partir des fichiers dans `/var/log/pods` au lieu d'utiliser l'API du runtime de conteneur. Il s'agit généralement de la méthode la plus efficace pour recueillir des logs. Consultez la documentation relative à la [collecte de logs][10]. Valeur par défaut : `true`.    

`agent.log.containerLogsPath`
: Autoriser la collecte de logs à partir du chemin des logs de conteneur. Définissez un autre chemin si vous n'utilisez pas le runtime Docker. Consultez la [documentation Kubernetes][11]. Valeur par défaut : `/var/lib/docker/containers`.    

`agent.log.enabled`
: Permet d'activer la collecte de logs avec l'Agent Datadog. Consultez la documentation relative à la [collecte de logs][10].   

`agent.log.logsConfigContainerCollectAll`
: Permet d'activer la collecte de logs pour tous les conteneurs. Consultez la documentation relative à la [collecte de logs][10].  

`agent.log.openFilesLimit`
: Définit le nombre maximal de fichiers de logs que l'Agent Datadog surveille. L'augmentation de cette limite peut entraîner une augmentation de la consommation de ressources de l'Agent. Consultez la documentation relative à la [collecte de logs][10]. Valeur par défaut : 100.       

`agent.log.podLogsPath`
: Permet d'activer la collecte de logs à partir du chemin de logs de pods. Valeur par défaut : `/var/log/pods`.   

`agent.log.tempStoragePath`
: Ce chemin (toujours monté à partir du host) est utilisé par l'Agent Datadog pour stocker des informations sur les fichiers de logs traités. En cas de redémarrage de l'Agent Datadog, il vous permet de démarrer la surveillance des fichiers de logs avec le bon décalage. Valeur par défaut : `/var/lib/datadog-agent/logs`.     

`agent.priorityClassName`
: Si ce paramètre est spécifié, il indique la priorité du pod. `system-node-critical` et `system-cluster-critical` sont deux mots-clés spéciaux qui indiquent les niveaux de priorité les plus élevés, le premier étant le plus élevé. Tout autre nom doit être défini en créant un objet `PriorityClass` avec ce nom. Si ce paramètre n'est pas spécifié, la priorité du pod est définie sur la valeur par défaut ou sur zéro s'il n'y a pas de valeur par défaut.      

`agent.process.enabled`
: Permet d'activer la surveillance des Live Processes. Remarque : `/etc/passwd` est automatiquement monté pour permettre la résolution des noms d'utilisateur. [Consultez la documentation relative aux processus][12].       

`agent.process.env`
: L'Agent Datadog prend en charge de nombreuses [variables d'environnement][3].   

`agent.process.resources.limits`
: Spécifie la quantité maximale de ressources de calcul autorisées. Consultez la [documentation Kubernetes][3].   

`agent.process.resources.requests`
: Spécifie la quantité minimale de ressources de calcul requises. Si `requests` n'est pas défini pour un conteneur, la valeur `limits` est utilisée si celle-ci est explicitement définie. Sinon, une valeur définie au niveau de l'implémentation est utilisée. Consultez la [documentation Kubernetes][3].         

`agent.rbac.create`
: Utilisé pour configurer la création de ressources RBAC.        

`agent.rbac.serviceAccountName`
: Utilisé pour configurer le nom du compte de service à utiliser. `Ignored` si la valeur du champ `Create` est définie sur true.    

`agent.systemProbe.appArmorProfileName`
: Spécifie un profil AppArmor.   

`agent.systemProbe.bpfDebugEnabled`
: Journalisation de debugging du kernel.         

`agent.systemProbe.conntrackEnabled`
: Permet d'autoriser l'Agent system-probe à se connecter au sous-système netlink/conntrack afin d'ajouter des informations NAT aux données de connexion. [Consultez la documentation relative à Conntrack][13]. 

`agent.systemProbe.debugPort`
: Spécifier le port à utiliser pour exposer pprof et expvar pour l'Agent system-probe.  

`agent.systemProbe.enabled`
: Permet d'activer la surveillance des Live Processes. Remarque : `/etc/passwd` est automatiquement monté pour permettre la résolution des noms d'utilisateur. [Consultez la documentation relative aux processus][12].          

`agent.systemProbe.env`
: Le SystemProbe Datadog prend en charge de nombreuses [variables d'environnement][2].

`agent.systemProbe.resources.limits`
: Spécifie la quantité maximale de ressources de calcul autorisées. [Consultez la documentation Kubernetes][3].   

`agent.systemProbe.resources.requests`
: Spécifie la quantité minimale de ressources de calcul requises. Si `requests` n'est pas défini pour un conteneur, la valeur `limits` est utilisée si celle-ci est explicitement définie. Sinon, une valeur définie au niveau de l'implémentation est utilisée. Consultez la [documentation Kubernetes][3].         

`agent.systemProbe.secCompCustomProfileConfigMap`
: Spécifie une ConfigMap pré-existante qui contient un profil SecComp personnalisé. 

`agent.systemProbe.secCompProfileName`
: Spécifie un profil seccomp.     

`agent.systemProbe.secCompRootPath`
: Spécifie le répertoire root du profil seccomp.

`agent.systemProbe.securityContext.allowPrivilegeEscalation`
: Permet d'indiquer si un processus peut obtenir ou non plus de privilèges que son processus parent. Ce booléen indique si le flag `no_new_privs` est défini ou non sur le processus du conteneur. `AllowPrivilegeEscalation` est toujours défini sur true lorsque le conteneur : 1) est exécuté en tant que conteneur `Privileged` 2) dispose de l'autorisation `CAP_SYS_ADMIN`.                 

`agent.systemProbe.securityContext.capabilities.add`
: Capacités ajoutées.  

`agent.systemProbe.securityContext.capabilities.drop`
: Capacités supprimées.

`agent.systemProbe.securityContext.privileged`
: Permet d'exécuter le conteneur en mode Privileged. Les processus dans les conteneurs exécutés en mode Privileged sont essentiellement équivalents à root sur le host. Valeur par défaut : false.  

`agent.systemProbe.securityContext.procMount`
: Spécifie le type de montage proc à utiliser pour les conteneurs. La valeur par défaut est `DefaultProcMount` et utilise les valeurs par défaut du runtime de conteneur pour les chemins en lecture seule et les chemins masqués. Ce paramètre nécessite que le feature flag `ProcMountType` soit activé.      

`agent.systemProbe.securityContext.readOnlyRootFilesystem`
: Spécifie si ce conteneur possède un système de fichiers root en lecture seule. Valeur par défaut : `false`.     

`agent.systemProbe.securityContext.runAsGroup`
: Le GID pour exécuter le point d'entrée du processus du conteneur. Utilise la valeur par défaut du runtime s'il n'est pas défini. Peut également être défini dans `PodSecurityContext`. Si ce paramètre est défini à la fois dans `SecurityContext` et `PodSecurityContext`, la valeur indiquée dans `SecurityContext` a la priorité.      

`agent.systemProbe.securityContext.runAsNonRoot`
: Indique que le conteneur doit être exécuté en tant qu'utilisateur non-root. Si ce paramètre est défini sur true, le Kubelet valide l'image lors de l'exécution pour s'assurer que le conteneur n'est pas exécuté en tant qu'UID 0 (root) et pour empêcher le démarrage du conteneur dans le cas contraire. Si ce paramètre n'est pas défini ou s'il est défini sur false, aucune validation de ce type n'est effectuée. Peut également être défini dans `PodSecurityContext`. Si ce paramètre est défini dans `SecurityContext` et `PodSecurityContext`, la valeur indiquée dans `SecurityContext` a la priorité.  

`agent.systemProbe.securityContext.runAsUser`
: L'UID pour exécuter le point d'entrée du processus du conteneur. Valeur par défaut : utilisateur indiqué dans les métadonnées d'image si le paramètre n'est pas spécifié. Peut également être défini dans `PodSecurityContext`. Si ce paramètre est défini dans `SecurityContext` et `PodSecurityContext`, la valeur indiquée dans `SecurityContext` a la priorité.                  

`agent.systemProbe.securityContext.seLinuxOptions.level`
: Étiquette de niveau SELinux qui s'applique au conteneur.                   

`agent.systemProbe.securityContext.seLinuxOptions.role`
: Étiquette de rôle SELinux qui s'applique au conteneur.                   

`agent.systemProbe.securityContext.seLinuxOptions.type`
: Étiquette de type SELinux qui s'applique au conteneur.                   

`agent.systemProbe.securityContext.seLinuxOptions.user`
: Étiquette d'utilisateur SELinux qui s'applique au conteneur.                   

`agent.systemProbe.securityContext.windowsOptions.gmsaCredentialSpec`
: `GMSACredentialSpec` est l'emplacement au niveau duquel le [webhook d'admission GMSA][7] intègre le contenu de la spécification d'identifiant GMSA spécifiée via le champ `GMSACredentialSpecName`. Il s'agit d'un champ de niveau alpha qui est traité uniquement par les serveurs qui activent le feature flag WindowsGMSA.

`agent.systemProbe.securityContext.windowsOptions.gmsaCredentialSpecName`
: `GMSACredentialSpecName` est le nom de la spécification d'identifiant GMSA à utiliser. Il s'agit d'un champ de niveau alpha qui est traité uniquement par les serveurs qui activent le feature flag WindowsGMSA.         

`agent.systemProbe.securityContext.windowsOptions.runAsUserName`
: Le `UserName` dans Windows à utiliser pour exécuter le point d'entrée du processus du conteneur. Valeur par défaut : utilisateur indiqué dans les métadonnées de l'image si aucune valeur n'est indiquée. Peut également être défini dans `PodSecurityContext`. Si ce paramètre est défini dans `SecurityContext` et `PodSecurityContext`, la valeur indiquée dans `SecurityContext` a la priorité. Il s'agit d'un champ de niveau bêta qui peut être désactivé avec le feature flag `WindowsRunAsUserName`.                  

`agent.useExtendedDaemonset`
: Permet d'utiliser ExtendedDaemonset pour le déploiement de l'Agent. Valeur par défaut : false.           

`clusterAgent.additionalAnnotations`
: Le paramètre `AdditionalAnnotations` permet d'indiquer des annotations qui sont ajoutées aux pods de l'Agent de cluster.            

`clusterAgent.additionalLabels`
: Le paramètre `AdditionalLabels` permet d'indiquer des étiquettes qui sont ajoutées aux pods de l'exécuteur de checks de cluster. 

`clusterAgent.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: Le planificateur préfère planifier des pods sur les nœuds qui satisfont les expressions d'affinité spécifiées via ce champ, mais peut choisir un nœud qui ne respecte pas une ou plusieurs de ces expressions. Le nœud le plus privilégié est celui présentant la somme de pondérations la plus élevée. En d'autres termes, pour chaque nœud répondant à toutes les exigences de planification (requête de ressource, expressions d'affinité `requiredDuringScheduling`, etc.), calculer une somme en itérant les éléments de ce champ et en ajoutant du « poids » à la somme si le nœud correspond aux valeurs `matchExpressions` correspondantes ; le ou les nœuds présentant la somme la plus élevée sont les plus privilégiés.     

`clusterAgent.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms`
: Obligatoire. Liste de termes de sélecteur de nœud. Les termes sont séparés par `OR`.                  

`clusterAgent.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: Le planificateur préfère planifier des pods sur les nœuds qui satisfont les expressions d'affinité spécifiées via ce champ, mais peut choisir un nœud qui ne respecte pas une ou plusieurs de ces expressions. Le nœud le plus privilégié est celui présentant la somme de pondérations la plus élevée. En d'autres termes, pour chaque nœud répondant à toutes les exigences de planification (requête de ressource, expressions d'affinité `requiredDuringScheduling`, etc.), calculer une somme en itérant les éléments de ce champ et en ajoutant du « poids » à la somme si le nœud comprend des pods correspondant au `podAffinityTerm` correspondant ; le ou les nœuds présentant la somme la plus élevée sont les plus privilégiés.           

`clusterAgent.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: Si les exigences d'affinité spécifiées via ce champ ne sont pas respectées au moment de la planification, le pod ne sera pas planifié sur le nœud. Si les exigences d'affinité spécifiées via ce champ cessent d'être respectées à un certain moment lors de l'exécution du pod (par exemple, en raison d'une mise à jour d'étiquette de pod), le système pourra tenter ou non de retirer le pod de son nœud. Lorsque plusieurs éléments sont présents, les listes des nœuds correspondant à chaque `podAffinityTerm` sont croisées, c'est-à-dire que tous les termes doivent être satisfaits.            

`clusterAgent.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: Le planificateur préfère planifier des pods sur les nœuds qui satisfont les expressions d'anti-affinité spécifiées via ce champ, mais peut choisir un nœud qui ne respecte pas une ou plusieurs de ces expressions. Le nœud le plus privilégié est celui présentant la somme de pondérations la plus élevée. En d'autres termes, pour chaque nœud répondant à toutes les exigences de planification (requête de ressource, expressions d'anti-affinité `requiredDuringScheduling`, etc.), calculer une somme en itérant les éléments de ce champ et en ajoutant du « poids » à la somme si le nœud comprend des pods correspondant au `podAffinityTerm` correspondant ; le ou les nœuds présentant la somme la plus élevée sont les plus privilégiés. 

`clusterAgent.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: Si les exigences d'anti-affinité spécifiées via ce champ ne sont pas respectées au moment de la planification, le pod ne sera pas planifié sur le nœud. Si les exigences d'anti-affinité spécifiées via ce champ cessent d'être respectées à un certain moment lors de l'exécution du pod (par exemple, en raison d'une mise à jour d'étiquette de pod), le système pourra tenter ou non de retirer le pod de son nœud. Lorsque plusieurs éléments sont présents, les listes des nœuds correspondant à chaque podAffinityTerm sont croisées, c'est-à-dire que tous les termes doivent être satisfaits.  

`clusterAgent.config.admissionController.enabled`
: Active le contrôleur d'admission pour pouvoir injecter automatiquement la configuration de l'APM/DogStatsD et les tags standard (env, service, version) dans vos pods.             

`clusterAgent.config.admissionController.mutateUnlabelled`
: Active l'injection de configuration sans que l'étiquette de pod `admission.datadoghq.com/enabled="true"` soit définie.                

`clusterAgent.config.admissionController.serviceName`
: Correspond au nom de service du webhook.       

`clusterAgent.config.clusterChecksEnabled`
: Active la fonctionnalité de checks de cluster et de checks d'endpoint sur l'Agent de cluster et le DaemonSet. Consultez la documentation sur les [checks de cluster][14]. La fonction Autodiscovery via des annotations de service Kube est activée automatiquement.                  

`clusterAgent.config.confd.configMapName`
: Nom d'une ConfigMap utilisée pour monter un répertoire.                   

`clusterAgent.config.env`
: L'Agent Datadog prend en charge de nombreuses [variables d'environnement][2].

`clusterAgent.config.externalMetrics.enabled`
: Active le `metricsProvider` pour pouvoir effectuer une mise à l'échelle en fonction des métriques dans Datadog.    

`clusterAgent.config.externalMetrics.port`
: Permet de configurer le port du service de métriques externes `metricsProvider`.     

`clusterAgent.config.externalMetrics.useDatadogMetrics`
: Active l'utilisation du CRD DatadogMetrics (qui permet la mise à l'échelle en fonction de requêtes arbitraires).      

`clusterAgent.config.logLevel`
: Définit le niveau de détail de la journalisation. Les niveaux de log valides sont les suivants : `trace`, `debug`, `info`, `warn`, `error`, `critical` et `off`.    

`clusterAgent.config.resources.limits`
: Spécifie la quantité maximale de ressources de calcul autorisées. [Consultez la documentation Kubernetes][3]. 

`clusterAgent.config.resources.requests`
: Spécifie la quantité minimale de ressources de calcul requises. Si `requests` n'est pas défini pour un conteneur, la valeur `limits` est utilisée si celle-ci est explicitement définie. Sinon, une valeur définie au niveau de l'implémentation est utilisée. [Consultez la documentation Kubernetes][3].   

`clusterAgent.config.volumeMounts`
: Spécifie des montages de volume supplémentaires dans le conteneur de l'Agent de cluster Datadog.       

`clusterAgent.config.volumes`
: Spécifie des volumes supplémentaires dans le conteneur de l'Agent de cluster Datadog.             

`clusterAgent.customConfig.configData`
: Correspond au contenu du fichier de configuration.  

`clusterAgent.customConfig.configMap.fileKey`
: Correspond à la clé utilisée dans `ConfigMap.Data` pour stocker le contenu du fichier de configuration.  

`clusterAgent.customConfig.configMap.name`
: Nom de la ConfigMap.      

`clusterAgent.deploymentName`
: Nom du déploiement de l'Agent de cluster à créer ou à partir duquel effectuer une migration.                

`clusterAgent.image.name`
: Définit l'image à utiliser. Utilisez `gcr.io/datadoghq/agent:latest` pour l'Agent Datadog 6. Utilisez `datadog/dogstatsd:latest` pour la version autonome de DogStatsD. Utilisez `gcr.io/datadoghq/cluster-agent:latest` pour l'Agent de cluster Datadog.  

`clusterAgent.image.pullPolicy`
: Stratégie de pull Kubernetes. Utilisez `Always`, `Never` ou `IfNotPresent`.                  

`clusterAgent.image.pullSecrets`
: Spécifie les identifiants de registre Docker. Consultez la [documentation Kubernetes][9].       

`clusterAgent.nodeSelector`
: Sélecteur qui doit être défini sur true pour que le pod soit compatible avec le nœud. Sélecteur qui doit correspondre aux étiquettes d'un nœud pour que le pod soit planifié sur ce nœud. Consultez la [documentation Kubernetes][15].     

`clusterAgent.priorityClassName`
: Si ce paramètre est spécifié, il indique la priorité du pod. `system-node-critical` et `system-cluster-critical` sont deux mots-clés spéciaux qui indiquent les niveaux de priorité les plus élevés, le premier étant le plus élevé. Tout autre nom doit être défini en créant un objet `PriorityClass` avec ce nom. Si ce paramètre n'est pas spécifié, la priorité du pod est définie sur la valeur par défaut ou sur zéro s'il n'y a pas de valeur par défaut.      

`clusterAgent.rbac.create`
: Utilisé pour configurer la création de ressources RBAC.        

`clusterAgent.rbac.serviceAccountName`
: Utilisé pour configurer le nom du compte de service à utiliser. `Ignored` si la valeur du champ `Create` est définie sur true.    

`clusterAgent.replicas`
: Nombre de réplicas de l'Agent de cluster.             

`clusterAgent.tolerations`
: Permet de spécifier les tolérances du pod de l'Agent de cluster.        

`clusterChecksRunner.additionalAnnotations`
: Spécifie des annotations qui seront ajoutées aux pods de l'exécuteur de checks de cluster.    

`clusterChecksRunner.additionalLabels`
: Spécifie des étiquettes qui seront ajoutées aux pods de l'exécuteur de checks de cluster. 

`clusterChecksRunner.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: Le planificateur préfère planifier des pods sur les nœuds qui satisfont les expressions d'affinité spécifiées via ce champ, mais peut choisir un nœud qui ne respecte pas une ou plusieurs de ces expressions. Le nœud le plus privilégié est celui présentant la somme de pondérations la plus élevée. En d'autres termes, pour chaque nœud répondant à toutes les exigences de planification (requête de ressource, expressions d'affinité `requiredDuringScheduling`, etc.), calculer une somme en itérant les éléments de ce champ et en ajoutant du « poids » à la somme si le nœud correspond aux valeurs matchExpressions correspondantes ; le ou les nœuds présentant la somme la plus élevée sont les plus privilégiés.     

`clusterChecksRunner.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms`
: Obligatoire. Liste de termes de sélecteur de nœud. Les termes sont séparés par `OR`.                  

`clusterChecksRunner.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: Le planificateur préfère planifier des pods sur les nœuds qui satisfont les expressions d'affinité spécifiées via ce champ, mais peut choisir un nœud qui ne respecte pas une ou plusieurs de ces expressions. Le nœud le plus privilégié est celui présentant la somme de pondérations la plus élevée. En d'autres termes, pour chaque nœud répondant à toutes les exigences de planification (requête de ressource, expressions d'affinité `requiredDuringScheduling`, etc.), calculer une somme en itérant les éléments de ce champ et en ajoutant du « poids » à la somme si le nœud comprend des pods correspondant au `podAffinityTerm` correspondant ; le ou les nœuds présentant la somme la plus élevée sont les plus privilégiés.           

`clusterChecksRunner.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: Si les exigences d'affinité spécifiées via ce champ ne sont pas respectées au moment de la planification, le pod ne sera pas planifié sur le nœud. Si les exigences d'affinité spécifiées via ce champ cessent d'être respectées à un certain moment lors de l'exécution du pod (par exemple, en raison d'une mise à jour d'étiquette de pod), le système pourra tenter ou non de retirer le pod de son nœud. Lorsque plusieurs éléments sont présents, les listes des nœuds correspondant à chaque `podAffinityTerm` sont croisées, c'est-à-dire que tous les termes doivent être satisfaits.            

`clusterChecksRunner.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: Le planificateur préfère planifier des pods sur les nœuds qui satisfont les expressions d'anti-affinité spécifiées via ce champ, mais peut choisir un nœud qui ne respecte pas une ou plusieurs de ces expressions. Le nœud le plus privilégié est celui présentant la somme de pondérations la plus élevée. En d'autres termes, pour chaque nœud répondant à toutes les exigences de planification (requête de ressource, expressions d'anti-affinité `requiredDuringScheduling`, etc.), calculer une somme en itérant les éléments de ce champ et en ajoutant du « poids » à la somme si le nœud comprend des pods correspondant au `podAffinityTerm` correspondant ; le ou les nœuds présentant la somme la plus élevée sont les plus privilégiés. 

`clusterChecksRunner.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: Si les exigences d'anti-affinité spécifiées via ce champ ne sont pas respectées au moment de la planification, le pod ne sera pas planifié sur le nœud. Si les exigences d'anti-affinité spécifiées via ce champ cessent d'être respectées à un certain moment lors de l'exécution du pod (par exemple, en raison d'une mise à jour d'étiquette de pod), le système pourra tenter ou non de retirer le pod de son nœud. Lorsque plusieurs éléments sont présents, les listes des nœuds correspondant à chaque podAffinityTerm sont croisées, c'est-à-dire que tous les termes doivent être satisfaits.  

`clusterChecksRunner.config.env`
: L'Agent Datadog prend en charge de nombreuses [variables d'environnement][2].  

`clusterChecksRunner.config.logLevel`
: Définit le niveau de détail de la journalisation. Les niveaux de log valides sont les suivants : `trace`, `debug`, `info`, `warn`, `error`, `critical` et `off`.    

`clusterChecksRunner.config.resources.limits`
: Spécifie la quantité maximale de ressources de calcul autorisées. Consultez la [documentation Kubernetes][3].

`clusterChecksRunner.config.resources.requests`
: Spécifie la quantité minimale de ressources de calcul requises. Si `requests` n'est pas défini pour un conteneur, la valeur `limits` est utilisée si celle-ci est explicitement définie. Sinon, une valeur définie au niveau de l'implémentation est utilisée. Consultez la [documentation Kubernetes][3].  

`clusterChecksRunner.config.volumeMounts`
: Spécifie des montages de volume supplémentaires dans le conteneur de l'exécuteur de checks de cluster Datadog.

`clusterChecksRunner.config.volumes`
: Spécifie des volumes supplémentaires dans le conteneur de l'exécuteur de checks de cluster Datadog.      

`clusterChecksRunner.customConfig.configData`
: Correspond au contenu du fichier de configuration.  

`clusterChecksRunner.customConfig.configMap.fileKey`
: Correspond à la clé utilisée dans `ConfigMap.Data` pour stocker le contenu du fichier de configuration.  

`clusterChecksRunner.customConfig.configMap.name`
: Nom de la ConfigMap.      

`clusterChecksRunner.deploymentName`
: Nom du déploiement de checks de cluster à créer ou à partir duquel effectuer une migration.               

`clusterChecksRunner.image.name`
: Définit l'image à utiliser. Utilisez `gcr.io/datadoghq/agent:latest` pour l'Agent Datadog 6. Utilisez `datadog/dogstatsd:latest` pour la version autonome de DogStatsD. Utilisez `gcr.io/datadoghq/cluster-agent:latest` pour l'Agent de cluster Datadog.    

`clusterChecksRunner.image.pullPolicy`
: Stratégie de pull Kubernetes. Utilisez `Always`, `Never` ou `IfNotPresent`.                  

`clusterChecksRunner.image.pullSecrets`
: Il est possible de spécifier des identifiants de registre Docker. Consultez la [documentation Kubernetes][9].       

`clusterChecksRunner.nodeSelector`
: Sélecteur qui doit être défini sur true pour que le pod soit compatible avec le nœud. Sélecteur qui doit correspondre aux étiquettes d'un nœud pour que le pod soit planifié sur ce nœud. Consultez la [documentation Kubernetes][15].   

`clusterChecksRunner.priorityClassName`
: Si ce paramètre est spécifié, il indique la priorité du pod. `system-node-critical` et `system-cluster-critical` sont deux mots-clés spéciaux qui indiquent les niveaux de priorité les plus élevés, le premier étant le plus élevé. Tout autre nom doit être défini en créant un objet `PriorityClass` avec ce nom. Si ce paramètre n'est pas spécifié, la priorité du pod est définie sur la valeur par défaut ou sur zéro s'il n'y a pas de valeur par défaut.      

`clusterChecksRunner.rbac.create`
: Utilisé pour configurer la création de ressources RBAC.        

`clusterChecksRunner.rbac.serviceAccountName`
: Utilisé pour configurer le nom du compte de service à utiliser. `Ignored` si la valeur du champ `Create` est définie sur true.    

`clusterChecksRunner.replicas`
: Nombre de réplicas de l'Agent de cluster.             

`clusterChecksRunner.tolerations`
: Permet de spécifier les tolérances du pod des checks de cluster.       

`clusterName`
: Spécifie un nom de cluster unique pour pouvoir facilement filtrer les hosts et checks de cluster.     

`credentials.apiKey`
: Définir ce paramètre sur votre clé d'API Datadog avant l'exécution de l'Agent.

`credentials.apiKeyExistingSecret`
: OBSOLÈTE. Pour passer la clé d'API via un secret existant, utilisez plutôt `apiSecret`. Si ce paramètre est défini, il a la priorité sur `apiKey`.   

`credentials.apiSecret.keyName`
: Clé du secret à utiliser.          

`credentials.apiSecret.secretName`
: Nom du secret.             

`credentials.appKey`
: Si vous utilisez `clusterAgent.metricsProvider.enabled = true`, vous devez définir une clé d'application Datadog pour obtenir un accès en lecture à vos métriques.    

`credentials.appKeyExistingSecret`
: OBSOLÈTE. Pour passer la clé d'application via un secret existant, utilisez plutôt `appSecret`. Si ce paramètre est défini, il a la priorité sur `appKey`.   

`credentials.appSecret.keyName`
: Clé du secret à utiliser.          

`credentials.appSecret.secretName`
: Nom du secret.             

`credentials.token`
: Clé pré-partagée entre les Agents de nœud et l'Agent de cluster. Doit être composée d'au moins 32 caractères a-zA-z.         

`credentials.useSecretBackend`
: Permet d'utiliser la fonctionnalité de backend de gestion des secrets de l'Agent pour récupérer tous les identifiants requis par les différents composants : Agent, cluster, checks de cluster. Si le paramètre `useSecretBackend:true` est défini, les autres paramètres d'identifiant seront ignorés. Valeur par défaut : false.       

`site`
: Permet de définir le site Datadog vers lequel envoyer les données de l'Agent :  {{< region-param key="dd_site" code="true" >}}. Valeur par défaut : `datadoghq.com`.     




[1]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[2]: https://docs.datadoghq.com/fr/agent/docker/?tab=standard#environment-variables
[3]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/event_collection/
[5]: https://docs.datadoghq.com/fr/developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging
[6]: https://docs.datadoghq.com/fr/developers/dogstatsd/unix_socket/
[7]: https://github.com/kubernetes-sigs/windows-gmsa
[8]: https://docs.datadoghq.com/fr/tagging/
[9]: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
[10]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
[11]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#create-manifest
[12]: https://docs.datadoghq.com/fr/graphing/infrastructure/process/#kubernetes-daemonset
[13]: http://conntrack-tools.netfilter.org/
[14]: https://docs.datadoghq.com/fr/agent/cluster_agent/clusterchecks/
[15]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/