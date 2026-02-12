---
aliases:
- /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/windows
code_lang: windows
code_lang_weight: 30
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentation
  text: Activer les métriques runtime
title: Instrumentation APM par étape unique sur Windows
type: multi-code-lang
---

## Présentation

Avec l'instrumentation par étape unique (SSI), vous pouvez activer l'APM pour vos applications Java et .NET sur des machines virtuelles Windows en utilisant une seule commande d'installation de l'agent Datadog.

## Activer l'APM sur Windows

<div class="alert alert-info">Avant de continuer, confirmez que votre environnement est compatible en consultant le <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">guide de compatibilité SSI.</a></div>

Vous pouvez activer l'APM sur Windows de plusieurs manières :
* Instrumenter uniquement les applications .NET sur IIS
* Instrumenter toutes les applications Java et .NET sur l'ensemble de votre hôte Windows

{{< callout url="https://www.datadoghq.com/product-preview/single-step-instrumentation-on-windows-vms/" btn_hidden="false" header="Rejoignez l'aperçu !">}} L'instrumentation à l'échelle de l'hôte pour Windows est en aperçu. {{< /callout >}}

...

Pour instrumenter uniquement les applications .NET exécutées sur IIS :

1. Dans Datadog, allez à [Installer l'agent Datadog sur Windows][1].
1. Dans la section **Personnalisez votre couverture d'observabilité**, activez **la surveillance des performances des applications (APM)**.
1. (Optionnel) Définissez votre version SDK :
   
   Par défaut, l'instrumentation par étape unique installe la dernière version prise en charge du SDK .NET de Datadog. Si vous devez verrouiller une version spécifique :

   1. Sous **Configuration de l'instrumentation**, sélectionnez **Personnaliser les versions de bibliothèque**.
   1. Sous .NET, choisissez la version que vous souhaitez utiliser.
   
1. Copiez et exécutez la commande d'installation MSI fournie sur votre hôte Windows.
1. Redémarrez les applications IIS que vous souhaitez instrumenter. (Vous n'avez pas besoin de redémarrer l'ensemble du serveur IIS.)

Après l'installation, l'Agent charge automatiquement le SDK .NET de Datadog dans les processus d'application pris en charge pour activer le traçage distribué.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

...

...

<div class="alert alert-info">
L'instrumentation à l'échelle de l'hôte sur Windows est limitée aux participants de la version Preview. Les options d'installation et de configuration décrites dans cet onglet apparaissent dans l'interface utilisateur de Datadog uniquement après votre inscription.
</div>

Pour instrumenter les applications Java et .NET sur l'ensemble de votre hôte Windows :

1. Dans Datadog, allez à [Installer l'agent Datadog sur Windows][1].
1. Dans la section **Personnalisez votre couverture d'observabilité**, activez **la surveillance des performances des applications (APM)**.
1. (Optionnel) Définissez votre version SDK :
   
   Par défaut, l'instrumentation par étape unique installe la dernière version prise en charge du SDK .NET et Java de Datadog. Si vous devez verrouiller une version spécifique :

   1. Sous **Configuration de l'instrumentation**, sélectionnez **Personnaliser les versions de bibliothèque**.
   1. Sous .NET, choisissez la version que vous souhaitez utiliser.
   
1. Copiez et exécutez la commande d'installation MSI fournie sur votre hôte Windows.
1. Redémarrez les services que vous souhaitez instrumenter.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

...

<div class="alert alert-info">L'ISI ajoute un petit temps de démarrage aux applications instrumentées. Si ce surcoût n'est pas acceptable pour votre cas d'utilisation, contactez <a href="/help/">le support Datadog</a>.</div>

## Configurer les balises de service unifiées

Les balises de service unifiées (UST) appliquent des balises cohérentes à travers les traces, les métriques et les journaux, facilitant la navigation et la corrélation de vos données d'observabilité. Apprenez à [définir les UST pour les services Windows][2].

## Activer les produits et fonctionnalités dépendants du SDK

Après que l'ISI charge le SDK Datadog dans vos applications et active le traçage distribué, vous pouvez configurer des produits supplémentaires qui dépendent du SDK. Ceci inclut des capacités telles que [Profiler continu][5], [Surveillance de la sécurité des applications][6], et [contrôles d'ingestion de traces][7].

Pour activer des produits, [définissez des variables d'environnement][3] dans la configuration de votre application.

## Supprimer l'instrumentation APM par étape unique de votre Agent

Pour désactiver l'ISI pour .NET sur votre hôte, exécutez :

```shell
&"C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" remove datadog-apm-library-dotnet
```

## Dépannage

Si vous rencontrez des problèmes pour activer APM avec SSI, consultez le [guide de dépannage SSI][4].

## Pour aller plus loin

...

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /fr/integrations/windows-service/#tags
[3]: /fr/tracing/trace_collection/library_config/
[4]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[5]: /fr/profiler/
[6]: /fr/security/application_security/
[7]: /fr/tracing/trace_pipeline/ingestion_controls/