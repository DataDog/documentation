---
aliases:
- /fr/security_platform/application_security/getting_started/go
- /fr/security/application_security/getting_started/go
- /fr/security/application_security/threats/setup/threat_detection/go
- /fr/security/application_security/threats_detection/go
further_reading:
- link: /security/application_security/setup/go/sdk
  tag: Documentation
  text: SDK de protection des applications et des API pour Go
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: Ajouter des informations utilisateur à des traces
- link: https://github.com/DataDog/dd-trace-go
  tag: Code source
  text: Code source du traceur
- link: https://github.com/DataDog/orchestrion
  tag: Code source
  text: Code source d'Orchestrion
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
title: Mise en route de la protection des applications et des API pour Go
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

## Prérequis {#prerequisite}

- Le [Datadog Agent][16] est installé et configuré pour le système d'exploitation, le conteneur, le cloud ou l'environnement virtuel de votre application. 
- Votre framework de service et vos outils sont [compatibles][2] avec [App and API Protection][1] de Datadog.
- Votre environnement de déploiement est [pris en charge][5].
- Vous avez installé l'une des deux dernières versions de [Go][4] (conformément à la [politique de publication officielle][5]).

## Démarrez {#get-started}

1. Installez [Orchestrion][10] :
   ```console
   $ go install github.com/DataDog/orchestrion@latest
   ```

2. Enregistrez Orchestrion en tant que module Go dans le répertoire de votre projet :
   ```console
   $ orchestrion pin
   ```

3. Datadog fournit une série de packages enfichables qui offrent une prise en charge native pour l'instrumentation d'une série de bibliothèques et de frameworks Go. Une liste de ces packages est disponible dans [Exigences de compatibilité][1]. Importez ces packages dans votre application et suivez les instructions de configuration indiquées pour chaque intégration.

4. Recompilez votre programme avec Orchestrion en utilisant la build `appsec` :
   ```console
   $ orchestrion go build -tags=appsec my-program
   ```
   Pour plus d'options sur l'utilisation d'Orchestrion, consultez [Orchestrion usage][7].

Remarque : si vous compilez sans [CGO][9] sur Linux, consultez [Compiler des applications Go avec CGO désactivé][6].

5. Redéployez votre service Go et activez [App and API Protection] en définissant la variable d'environnement `DD_APPSEC_ENABLED` sur `true` :

{{< tabs >}}
{{% tab "Variable d'environnement" %}}

```console
$ env DD_APPSEC_ENABLED=true ./my-program
```

{{% /tab %}}
{{% tab "Docker CLI" %}}

Ajoutez la valeur de variable d'environnement suivante à votre ligne de commande Docker :

```console
$ docker run -e DD_APPSEC_ENABLED=true [...]
```

Pour plus d'informations sur la façon de créer une image Docker adaptée, voir <a href="/security/application_security/setup/go/dockerfile">Creating a Dockerfile for App and API Protection for Go</a>.

{{% /tab %}}
{{% tab "Dockerfile" %}}

Ajoutez la valeur de variable d'environnement suivante au Dockerfile de votre conteneur d'application :

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

Pour plus d'informations sur la façon de créer une image Docker adaptée, voir <a href="/security/application_security/setup/go/dockerfile">Creating a Dockerfile for App and API Protection for Go</a>.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Mettez à jour le fichier de configuration de déploiement de votre application pour l'APM et ajoutez la variable d'environnement suivante :

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

Pour plus d'informations sur la façon de créer une image Docker adaptée, voir <a href="/security/application_security/setup/go/dockerfile">Creating a Dockerfile for App and API Protection for Go</a>.

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Mettez à jour le fichier JSON de définition de tâche ECS de votre application en utilisant cette section d'environnement :

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

Pour plus d'informations sur la façon de créer une image Docker adaptée, voir <a href="/security/application_security/setup/go/dockerfile">Creating a Dockerfile for App and API Protection for Go</a>.

{{% /tab %}}

{{< /tabs >}}

### Vérifiez votre configuration {#verify-your-setup}

Pour vérifier qu'App and API Protection fonctionne correctement :
   
Pour voir la détection des menaces d'App and API Protection en action, envoyez des modèles d'attaque connus à votre application. Par exemple, déclenchez la règle [Security Scanner Detected][15] en exécutant un fichier contenant le script curl suivant :

```bash
for ((i=1;i<=250;i++));
do
  # Target existing service’s routes
  curl https://your-application-url/existing-route -A Arachni/v1.0;
  # Target non existing service’s routes
  curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

Quelques minutes après avoir activé votre application et l'avoir utilisée, **des informations sur les menaces apparaissent dans l'[Application Trace and Signals Explorer][14] de Datadog**.

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vidéo montrant l'explorateur de signaux et ses détails, ainsi que l'explorateur de vulnérabilités et ses détails." video="true" >}}

### Construction sans CGO {#building-without-cgo}

Si vous compilez votre application Go sans [CGO][9], vous pouvez toujours activer App and API Protection en suivant ces étapes :

1. Ajoutez le tag de compilation `appsec` lors de la compilation de votre application :
   ```console
   $ CGO_ENABLED=0 orchestrion go build -tags appsec my-program
   ```

  <div class="alert alert-danger">La désactivation de CGO garantit généralement un binaire lié statiquement. Ce ne sera pas le cas ici.</div>

2. Installez `libc.so.6`, `libpthread.so.0` et `libdl.so.2` sur votre système, car ces bibliothèques sont requises par le WAF Datadog :
   Cette installation peut être effectuée en installant le paquet `glibc` sur votre système avec votre gestionnaire de paquets. Voir [Creating a Dockerfile for App and API Protection for Go][3].

3. Redéployez votre service Go avec la variable d'environnement `DD_APPSEC_ENABLED=true` définie, comme décrit ci-dessus.

### Construction avec Bazel {#building-with-bazel}

Si vous utilisez Bazel et [rules_go][12] pour construire votre application Go, [Orchestrion][7] n'est pas compatible avec Bazel.
Au lieu de cela, vous pouvez utiliser le [Datadog Go SDK][11] pour instrumenter votre application manuellement.

App and API Protection s'appuie sur [purego][13] pour prendre en charge ses liaisons C++ vers le WAF de Datadog, ce qui nécessite une attention particulière au sein du `repositories.bzl` généré par Gazelle. Sous la règle `go_repository` pour `com_github_ebitengine_purego`,
vous devez ajouter l'attribut `build_directives` avec la directive `gazelle:build_tags cgo`. Exemple :

```starlark
    go_repository(
        name = "com_github_ebitengine_purego",
        build_directives = [
            "gazelle:build_tags cgo",
        ]
        build_file_proto_mode = "disable",
        importpath = "github.com/ebitengine/purego",
        sum = "<your-checksum>",
        version = "v0.8.3",
    )
```

## Utilisation de [App and API Protection] sans traçage APM {#using-app-and-api-protection-without-apm-tracing}

Si vous souhaitez utiliser [App and API Protection] sans la fonctionnalité de traçage APM, vous pouvez déployer avec le traçage désactivé :

1. Configurez votre SDK avec la variable d'environnement `DD_APM_TRACING_ENABLED=false` en plus de la variable d'environnement `DD_APPSEC_ENABLED=true`. Cette configuration réduit la quantité de données APM envoyées à Datadog au minimum requis par les produits App and API Protection.

Pour plus de détails, consultez [Standalone App and API Protection][8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/setup/compatibility/go/?tab=v2#web-framework-compatibility
[2]: /fr/security/application_security/setup/compatibility/go/
[3]: /fr/security/application_security/setup/go/dockerfile
[4]: https://go.dev/
[5]: https://go.dev/doc/devel/release#policy
[6]: /fr/security/application_security/setup/go#building-without-cgo
[7]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=compiletimeinstrumentation#usage
[8]: /fr/security/application_security/guide/standalone_application_security/
[9]: https://go.dev/wiki/cgo
[10]: https://datadoghq.dev/orchestrion
[11]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=manualinstrumentation#add-the-tracer-library-to-your-application
[12]: https://github.com/bazel-contrib/rules_go
[13]: https://github.com/ebitengine/purego
[14]: https://app.datadoghq.com/security/appsec
[15]: /fr/security/default_rules/security-scan-detected/
[16]: https://app.datadoghq.com/account/settings#agent