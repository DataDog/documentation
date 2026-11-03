---
description: Apprenez à collecter les logs envoyés via une connexion socket TCP ou
  UDP à l'aide de l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Socket Source
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez le Socket Source d'Observability Pipelines pour envoyer des logs au Worker via une connexion socket (TCP ou UDP).

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/socket %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants de l'adresse du socket et, le cas échéant, la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans le [UI][3], en utilisant l'[API][4] ou avec [Terraform][5]. Les instructions de cette section concernent la configuration de la source dans l'UI.

**Remarque** : Le Worker ne peut recevoir des logs que via TCP ou UDP. Si votre application écrit sur un socket de domaine UNIX, consultez [sockets de domaine UNIX](#unix-domain-sockets) pour plus d'informations.

Après avoir sélectionné le Socket Source dans le pipeline UI :

1.  Saisissez l'identifiant de votre adresse de socket. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Dans le menu déroulant {{< ui >}}Mode{{< /ui >}}, sélectionnez le type de socket à utiliser.
1. Dans le menu déroulant {{< ui >}}Framing{{< /ui >}}, sélectionnez la manière de délimiter le flux d'événements.
    <table>
        <colgroup>
            <col style="width:40%">
            <col style="width:60%">
        </colgroup>
        <thead>
            <tr>
                <th>MÉTHODE DE DÉLIMITATION</th>
                <th>DESCRIPTION</th>
            </tr>
        </thead>
        <tr>
            <td><code>newline_delimited</code></td>
            <td>Les trames d'octets sont délimitées par un caractère de saut de ligne.</td>
        </tr>
        <tr>
            <td><code>bytes</code></td>
            <td>Les trames d'octets sont transmises telles quelles selon les limites d'E/S sous-jacentes (par exemple, divisées entre les messages ou les segments de flux).</td>
        </tr>
        <tr>
            <td><code>character_delimited</code></td>
            <td>Les trames d'octets sont délimitées par un caractère choisi.</td>
        </tr>
        <tr>
            <td><code>chunked_gelf</code></td>
            <td>Les trames d'octets sont des messages GELF segmentés.</td>
        </tr>
        <tr>
            <td><code>octet_counting</code></td>
            <td>Les trames d'octets sont délimitées selon le format de comptage d'octets.</td>
        </tr>
    </table>

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres TLS optionnels {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## UNIX domain sockets {#unix-domain-sockets}

Le Socket Source prend uniquement en charge la réception de logs via TCP ou UDP. Si votre application écrit sur un UNIX domain socket, utilisez `socat` pour le relier à un socket TCP ou UDP afin d'envoyer les logs au Worker.

### Standalone bridge {#standalone-bridge}

Exécutez `socat` aux côtés de votre application pour transférer depuis le UNIX domain socket vers le Worker :

```
socat UNIX-RECV:/var/run/app.sock TCP:<OPW_HOST>
```

Remplacez <OPW_HOST> par l'adresse IP de l'hôte ou l'URL de l'équilibreur de charge associé à l'Observability Pipelines Worker.

### Kubernetes sidecar {#kubernetes-sidecar}

Dans Kubernetes, le Worker s'exécute généralement en tant que StatefulSet derrière un Service, il n'est donc pas accessible via `localhost`. Exécutez `socat` en tant que conteneur sidecar dans le même pod que votre application, et partagez un volume pour le fichier socket. Exemple :

```yaml
volumes:
  - name: app-socket
    emptyDir: {}

initContainers:
  # Remove any stale socket file before the sidecar starts
  - name: socket-cleanup
    image: busybox:1.36
    command: ["sh", "-c", "rm -f /var/run/app/app.sock"]
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

containers:
  # Your application container
  - name: app
    # ...
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

  # socat sidecar: bridges the UNIX socket to the Worker's Service
  - name: socat-opw-bridge
    image: alpine/socat:1.8.0.0
    args:
      - UNIX-RECV:/var/run/app/app.sock,fork
      - TCP:<RELEASE_NAME>-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:5000
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

# Monitor and adjust resources as necessary
    resources:
      requests:
        cpu: 10m
        memory: 16Mi
    securityContext:
      runAsNonRoot: true
      runAsUser: 1000
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
```

Pointez l'argument `TCP` vers l'endpoint du Service Kubernetes du Worker au lieu de `localhost`. Il n'est pas garanti que les pods StatefulSet du Worker s'exécutent sur chaque nœud, le pod du Worker pourrait donc ne pas être accessible à `localhost`. Ceci est particulièrement vrai si vous disposez de groupes de nœuds dédiés pour le Worker et vos charges de travail.

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse du socket:
	- Indique l'adresse et le port sur lesquels l'Observability Pipelines Worker écoute les logs entrants.
	- L'identifiant par défaut est `SOURCE_SOCKET_ADDRESS`.
- Identifiant de passphrase TLS du socket (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_SOCKET_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /fr/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline