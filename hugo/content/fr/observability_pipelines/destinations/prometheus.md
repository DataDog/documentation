---
description: Apprenez à envoyer des métriques à Prometheus en utilisant l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Destination Prometheus
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Prometheus d'Observability Pipelines pour envoyer des métriques à Prometheus.

## Configurer la destination {#set-up-destination}

<div class="alert alert-danger">Pour Secrets Management : saisissez uniquement les identifiants de l'URL de l'endpoint et, le cas échéant, du nom d'utilisateur et du mot de passe pour l'autorisation de base, du bearer token et de la phrase secrète de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination Prometheus lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans l'[UI][2], en utilisant l'[API][3], ou avec [Terraform][4]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination Prometheus dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant pour votre {{< ui >}}Remote Write Endpoint URL{{< /ui >}}. Un exemple d'URL d'endpoint auquel l'identifiant fait référence : `http://localhost:9090/api/v1/write`. Si vous laissez le champ de l'identifiant vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. Sélectionnez votre stratégie d'autorisation ({{< ui >}}None{{< /ui >}}, {{< ui >}}Basic{{< /ui >}} ou {{< ui >}}Bearer{{< /ui >}}). Si vous avez sélectionné :
    - {{< ui >}}Basic{{< /ui >}} : saisissez l'identifiant de votre nom d'utilisateur et de votre mot de passe. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
    - {{< ui >}}Bearer{{< /ui >}} : Saisissez l'identifiant de votre bearer token. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres facultatifs {#optional-settings}

#### Espace de noms par défaut {#default-namespace}

Saisissez l'espace de noms par défaut pour toutes les métriques envoyées. Cet espace de noms n'est utilisé que si une métrique ne possède pas d'espace de noms existant. Il est ajouté en tant que préfixe au nom de la métrique, séparé par un trait de soulignement (`_`). L'espace de noms doit respecter la [convention de nommage Prometheus][5].

#### Tenant ID {#tenant-id}

Saisissez l'ID de locataire à ajouter aux requêtes sortantes. Ce champ prend en charge la [syntaxe de modèle][6], mais le modèle doit avoir un préfixe littéral, tel que `prefix-{{ tenant_id }}` or `prefix/{{ tenant_id }}`. Templates without a literal prefix, such as `{{ tenant_id }}`, sont rejetés ; le Worker enregistre une erreur et le pipeline n'est pas démarré.

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}
- (Facultatif) Saisissez le nom du serveur à utiliser pour la validation du certificat. S'il est laissé vide, le nom de host de l'URL d'endpoint est utilisé.

#### Mise en mémoire tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Autoriser les échantillons hors séquence {#allow-out-of-order-samples}

Le Worker n'envoie pas toujours les métriques dans le bon ordre pour une série donnée car il ne réordonne pas les métriques. Par exemple, si le premier lot de métriques contient des métriques avec les horodatages : `10:03`, `10:04`, `10:05` et que le second lot contient des métriques avec les horodatages : `10:01`, `10:02`, `10:06`, le Worker ne réordonne pas ces métriques avant de les envoyer.

Comme le remote write receiver de Prometheus rejette les échantillons hors séquence, le Worker consigne une erreur Bad Request (`400`) et l'intégralité du deuxième lot de métriques est abandonnée, même si le remote write receiver a accepté certaines métriques valides de ce lot.

Datadog recommande de configurer votre remote write receiver pour autoriser les échantillons hors séquence afin d'éviter que ces derniers ne soient abandonnés.

## Dépannage {#troubleshooting}

### Logs d'erreurs de débogage {#debug-error-logs}

Si vous voyez des logs d'erreurs `400` ou `500` provenant de cette destination, vous pouvez activer les logs de débogage pour voir la réponse renvoyée par le serveur. Pour activer les logs uniquement pour cette destination basée sur HTTP, et non pour chaque module du Worker, définissez `VECTOR_LOG` sur `info,vector::sinks::util::http=debug` :

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=info,vector::sinks::util::http=debug \
   datadog/observability-pipelines-worker run
```

Consultez [Activer les logs de débogage][7] pour obtenir des instructions sur l'activation complète des logs de débogage.

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'URL de l'endpoint Remote Write :
	- Fait référence à l'URL de l'endpoint Remote Write. Un exemple d'URL d'endpoint auquel l'identifiant fait référence : `http://localhost:9090/api/v1/write`.
	- L'identifiant par défaut est `DESTINATION_PROMETHEUS_REMOTE_WRITE_ENDPOINT`.
- Identifiant de la phrase secrète TLS Prometheus (lorsque TLS est activé) :
	- L'identifiant par défaut est `DESTINATION_PROMETHEUS_REMOTE_WRITE_KEY_PASS`.
- Si vous utilisez l'authentification de base :
	- Identifiant du nom d'utilisateur Prometheus :
		- L'identifiant par défaut est `DESTINATION_PROMETHEUS_REMOTE_WRITE_USERNAME`.
	- Identifiant du mot de passe Prometheus :
		- L'identifiant par défaut est `DESTINATION_PROMETHEUS_REMOTE_WRITE_PASSWORD`.
- Si vous utilisez l'authentification par bearer token :
	- Identifiant du bearer token Prometheus :
		- L'identifiant par défaut est `DESTINATION_PROMETHEUS_REMOTE_WRITE_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/prometheus %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /fr/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: https://prometheus.io/docs/practices/naming/
[6]: /fr/observability_pipelines/destinations/#template-syntax
[7]: /fr/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#enable-debug-logs