---
aliases:
- /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker
code_lang: docker
code_lang_weight: 10
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentation
  text: Activer les métriques d'exécution
title: 'Instrumentation APM en une seule étape sur Docker :'
type: multi-code-lang
---
## Présentation {#overview}

Dans un conteneur Linux Docker, utilisez l'instrumentation en une seule étape (SSI) pour APM afin d'installer le Datadog Agent et d'[instrumenter][14] vos applications en une seule étape, sans configuration supplémentaire requise. 

{{< skill-callout
    title="Configurer APM avec un agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Activez APM sur vos applications {#enable-apm-on-your-applications}

<div class="alert alert-info">Avant de continuer, confirmez que votre environnement est compatible en consultant le <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">guide de compatibilité SSI.</a></div>

Pour installer le Datadog Agent et activer SSI dans un environnement Docker Linux, exécutez les commandes suivantes sur votre host Docker (et non à l'intérieur d'un conteneur d'application).

1. Installez les composants d'instrumentation Docker sans installer un Agent sur le host :

   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker \
   DD_NO_AGENT_INSTALL=true \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

1. Exécutez ou redéployez le conteneur Agent. Remplacez `<YOUR_DD_API_KEY>` par votre [clé d'API Datadog][1] :

   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_DD_API_KEY> \
     -e DD_SITE="{{< region-param key="dd_site" >}}" \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket \
     -v /var/run/datadog:/var/run/datadog \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     -v /proc/:/host/proc/:ro \
     -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
     -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
     registry.datadoghq.com/agent:7
   ```

   **Note**: Run only one Datadog Agent per node. If a Datadog Agent container already exists, update its definition (or your Docker Compose file) with these settings and recreate it, rather than starting a second Agent. For rootless Docker, set the correct Docker socket in `docker_config.yaml`.

1. Recreate your application containers.

   Instrumentation is applied when a container is created, so restarting an existing container with `docker stop` and `docker start` does not instrument it. Remove your application containers and run them again.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

### Generate the command from Datadog 

To get a command pre-filled with your API key and site, go to the [Install the Datadog Agent on Docker][15] page. In the {{< ui >}}Customize my agent install command{{< /ui >}} section, go to {{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}}, and turn on {{< ui >}}APM Instrumentation{{< /ui >}}. Then copy and run the generated command.

{{< img src="tracing/trace_collection/docker-apm-instrumentation-toggle.png" alt="La section « Personnalisez votre commande d'installation d'agent » des instructions intégrées à l'application pour l'installation du Datadog Agent sur Docker" style="width:100%;" >}}

## Définir les versions du traceur SDK {#set-sdk-tracer-versions}

Par défaut, l'instrumentation en une seule étape installe les dernières versions majeures des SDK Datadog et applique automatiquement les mises à jour mineures dès leur disponibilité.

Pour fixer des versions spécifiques, ajoutez la variable `DD_APM_INSTRUMENTATION_LIBRARIES` avec des paires `language:major` séparées par des virgules à la commande d'installation du composant. Les versions disponibles sont répertoriées dans les dépôts sources pour chaque langage :

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)
- [PHP][13] (`php`)

Vous pouvez également sélectionner des versions dans les menus déroulants de Datadog : sur la page [Install the Datadog Agent on Docker][15], après avoir activé {{< ui >}}APM Instrumentation{{< /ui >}}, cliquez sur {{< ui >}}Customize library versions{{< /ui >}}.

{{< img src="tracing/trace_collection/apm-instrumentation-version-pinning.png" alt="Le menu déroulant « Personnaliser les versions de la bibliothèque » dans les instructions d'installation du Datadog Agent sur Docker" style="width:100%;" >}}

## Vérifiez l'installation {#verify-the-installation}

1. Vérifiez que le démon Docker utilise le runtime Datadog :

   ```shell
   docker system info --format '{{.DefaultRuntime}}'
   ```

   The output must be `dd-shim`. If it is `runc` or anything else, the instrumentation components did not install successfully, and your applications are not instrumented regardless of whether the Agent is healthy. Re-run the installation command, and confirm that the Docker daemon was running when you ran it.

1. Confirm the Agent container is running:

   ```shell
   docker ps --filter name=dd-agent
   ```

1. Vérifiez que l'Agent est sain et que l'Agent APM est en cours d'exécution :

   ```shell
   docker exec dd-agent agent status
   ```

   Vérifiez la section **APM Agent** de la sortie.

1. Vérifiez qu'un conteneur d'application utilise le runtime Datadog. Remplacez `<CONTAINER_NAME>` par le nom de l'un de vos conteneurs d'application :

   ```shell
   docker inspect <CONTAINER_NAME> --format '{{.HostConfig.Runtime}}'
   ```

1. After your applications receive traffic, confirm your services appear on the [APM Services page][18]. If they don't appear within a few minutes, follow the [SSI troubleshooting guide][17].

## Configure Unified Service Tags 

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Docker services][16].

## Enable SDK-dependent products and features 

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

Pour activer des produits, [définissez des variables d'environnement][3] dans la configuration de votre application.

## Supprimez l'instrumentation APM en une étape de votre Datadog Agent {#remove-single-step-apm-instrumentation-from-your-agent}

Si vous ne souhaitez pas collecter de données de trace pour un service, un host, une VM ou un conteneur particulier, effectuez les étapes suivantes :

### Supprimer l'instrumentation pour des services spécifiques {#remove-instrumentation-for-specific-services}

Pour supprimer l'instrumentation APM et arrêter l'envoi de traces depuis un service spécifique :

1. Ajoutez la variable d'environnement `DD_INSTRUMENT_SERVICE_WITH_APM` à la commande de démarrage du service :
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Redémarrez le service.

### Supprimer APM pour tous les services sur l'infrastructure {#remove-apm-for-all-services-on-the-infrastructure}

Pour arrêter la production de traces, désinstallez APM et redémarrez l'infrastructure :

1. Exécutez :
   ```shell
   dd-container-install --uninstall
   ```
2. Redémarrez Docker :
   ```shell
   systemctl restart docker
   ```
   Ou utilisez l'équivalent pour votre environnement.

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes lors de l'activation d'APM avec SSI, consultez le [guide de dépannage SSI][17].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/tracing/trace_collection/library_config/
[3]: /fr/tracing/trace_collection/library_config/
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /fr/tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=docker
[16]: /fr/getting_started/tagging/unified_service_tagging/?tab=docker#containerized-environment
[17]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[18]: https://app.datadoghq.com/apm/services