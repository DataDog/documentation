---
aliases:
- /fr/tracing/trace_ingestion/mechanisms
description: Présentation des mécanismes du traceur et de l'agent qui régissent l'ingestion
  des traces.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Mesures de contrôle des ingestion
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Rétention des traces
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Indicateurs d'utilisation
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#improving-tracing-efficiency-through-targeted-changes
  tag: Blog
  text: 'Optimisation de Datadog à grande échelle : une observabilité rentable chez
    Zendesk'
title: Mécanismes d'ingestion
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Règles relatives à l'échantillonnage par ingestion" >}}


Plusieurs mécanismes déterminent si les spans générés par vos applications sont envoyés à Datadog (_ingérés_). Ces mécanismes s'appuient sur les [bibliothèques de traçage][1] et sur l'agent Datadog. Selon la configuration, tout ou partie du trafic généré par les services instrumentés est capturé.

À chaque intervalle ingéré est associée une **raison d'ingestion** unique, correspondant à l'un des mécanismes décrits sur cette page. [Indicateurs d'utilisation][2] `datadog.estimated_usage.apm.ingested_bytes` et `datadog.estimated_usage.apm.ingested_spans` sont associés au tag `ingestion_reason`.

Utilisez le [tableau de bord des motifs d'ingestion][3] pour analyser chacun de ces motifs dans son contexte. Obtenez une vue d'ensemble du volume attribué à chaque mécanisme afin de savoir rapidement sur quelles options de configuration vous concentrer.

## Échantillonnage basé sur la tête

Le mécanisme d'échantillonnage par défaut est appelé « échantillonnage basé sur la tête ». La décision de conserver ou d'abandonner une trace est prise dès le tout début de la trace, au début du [segment racine][4]. Cette décision est ensuite transmise aux autres services dans le cadre du contexte de leur requête, par exemple sous la forme d'un en-tête de requête HTTP.

Comme la décision est prise au début de la séquence et transmise ensuite à toutes les parties de celle-ci, la séquence est assurée d'être conservée ou supprimée dans son intégralité.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Échantillonnage basé sur la tête" style="width:100%;" >}}

Vous pouvez définir les fréquences d'échantillonnage pour l'échantillonnage basé sur la tête à deux endroits :
 Au niveau **[Agent](#intheagent)** (par défaut)
 Au niveau de la **[bibliothèque de traçage](#intracinglibrariesuserdefinedrules)** : tout mécanisme de la bibliothèque de traçage prévaut sur la configuration de l'agent.

### Dans l'Agent
`ingestion_reason: auto`

L'agent Datadog transmet en continu des taux d'échantillonnage aux bibliothèques de traçage afin qu'elles les appliquent à la racine des traces. L'Agent ajuste les débits afin d'atteindre un objectif global de dix traces par seconde, réparties entre les services en fonction du trafic.

Par exemple, si le service « A » génère plus de trafic que le service « B », l'agent peut modifier le taux d'échantillonnage de « A » de manière à ce que « A » ne conserve pas plus de sept traces par seconde, et ajuster de la même manière le taux d'échantillonnage de « B » pour que « B » ne conserve pas plus de trois traces par seconde, soit un total de 10 traces par seconde.

#### Configuration à distance

La configuration de la fréquence d'échantillonnage dans l'Agent peut être effectuée à distance si vous utilisez la version [7.42.0][20] de l'Agent ou une version ultérieure. Pour commencer, activez la [Configuration à distance][21], puis configurez le paramètre `ingestion_reason` depuis la [page Contrôle de l'ingestion][5]. La configuration à distance vous permet de modifier les paramètres sans avoir à redémarrer l'agent. Les paramètres définis à distance ont priorité sur les paramètres locaux, y compris les variables d'environnement et les paramètres du fichier `datadog.yaml`.

#### Configuration locale

Définissez la valeur cible de tracespersecond de l'agent dans son fichier de configuration principal (`datadog.yaml`) ou en tant que variable d'environnement :
```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**Remarques** :
 Le taux d'échantillonnage en traces par seconde défini dans l'Agent s'applique uniquement aux bibliothèques de traçage Datadog. Cela n'a aucune incidence sur les autres bibliothèques de traçage, telles que les SDK OpenTelemetry.
 La valeur cible n'est pas fixe. En réalité, cela varie en fonction des pics de trafic et d'autres facteurs.

Toutes les tranches d'une trace échantillonnée à l'aide de l'agent Datadog [taux d'échantillonnage calculés automatiquement](#intheagent) sont associées au motif d'ingestion « auto ». La balise « ingestion_reason » est également définie dans les [indicateurs d'utilisation][2]. Les services utilisant le mécanisme par défaut de l'agent Datadog sont identifiés comme « Automatique » dans la colonne « Configuration » de la [page de contrôle de l'ingestion][5].

### Dans les bibliothèques de traçage : règles définies par l'utilisateur
`motif_d'ingestion : règle`

Pour un contrôle plus précis, utilisez les options de configuration de l'échantillonnage de la bibliothèque de traçage :
 Définissez une **fréquence d'échantillonnage** spécifique à appliquer à la racine de la trace, par service et/ou par nom de ressource, en remplaçant le [mécanisme par défaut](#intheagent) de l'Agent.
 Définissez une **limite de débit** pour le nombre de traces ingérées par seconde. La limite de débit par défaut est de 100 traces par seconde et par instance de service (lorsque l'Agent [mécanisme par défaut](#intheagent) est utilisé, le limiteur de débit est ignoré).

**Remarque** : Les règles d'échantillonnage constituent également des contrôles d'échantillonnage basés sur les en-têtes. Si le trafic d'un service dépasse le nombre maximal de traces par seconde défini, les traces sont alors rejetées au niveau de la racine. Cela ne génère pas de traces incomplètes.

La configuration peut être définie à l'aide de variables d'environnement ou directement dans le code :

{{< tabs >}}
{{% tab "Java" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>, pour les applications Java, configurez les fréquences d'échantillonnage « byservice » et « byresource » via l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page de contrôle de l'ingestion</a>.

Pour en savoir plus sur la configuration à distance des fréquences d'échantillonnage par service et par ressource, consultez le [Guide de l'échantillonnage basé sur les ressources][1].

**Remarque** : la configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**

Pour les applications Java, définissez les taux d'échantillonnage byservice et byresource (à partir de la version [v1.26.0][3] pour l'échantillonnage basé sur les ressources) à l'aide de la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour enregistrer 100 % des traces de la ressource `GET /checkout` du service `myservice`, et 20 % des traces des autres points de terminaison, configurez :

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

La valeur du nom du service est sensible à la casse et doit respecter la casse du nom réel du service.

Pour configurer une limite de fréquence, définissez la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez plutôt `DD_TRACE_SAMPLING_RULES`. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` sur `0.1`, définissez plutôt `DD_TRACE_SAMPLING_RULES` sur `[{"sample_rate":0.1}]`.

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage Java][2].

[1] : /guide-de-traçage/échantillonnage-basé-sur-les-ressources
[2] : /tracing/trace_collection/dd_libraries/java
[3] : https://github.com/DataDog/ddtracejava/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a>, pour les applications Python, configurez les taux d'échantillonnage « byservice » et « byresource » via l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page de contrôle de l'ingestion</a>.

Pour en savoir plus sur la configuration à distance des fréquences d'échantillonnage par service et par ressource, consultez le [Guide de l'échantillonnage basé sur les ressources][3].

**Remarque** : la configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**
Pour les applications Python, définissez les taux d'échantillonnage byservice et byresource (à partir de la version [v2.8.0][1] pour l'échantillonnage basé sur les ressources) à l'aide de la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour enregistrer 100 % des traces de la ressource `GET /checkout` du service `myservice`, et 20 % des traces des autres points de terminaison, configurez :

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Pour configurer une limite de fréquence, définissez la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez plutôt `DD_TRACE_SAMPLING_RULES`. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` sur `0.1`, définissez plutôt `DD_TRACE_SAMPLING_RULES` sur `[{"sample_rate":0.1}]`.

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage Python][2].

[1] : https://github.com/DataDog/ddtracepy/releases/tag/v2.8.0
[2] : /tracing/trace_collection/dd_libraries/python
[3] : /guide-de-traçage/échantillonnage-basé-sur-les-ressources/
{{% /tab %}}
{{% tab "Ruby" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a>, pour les applications Ruby, configurez les taux d'échantillonnage « byservice » et « byresource » depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page de contrôle de l'ingestion</a>.

Pour en savoir plus sur la configuration à distance des fréquences d'échantillonnage par service et par ressource, consultez le [Guide de l'échantillonnage basé sur les ressources][1].

**Remarque** : la configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**
Pour les applications Ruby, définissez une fréquence d'échantillonnage globale pour la bibliothèque à l'aide de la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez les fréquences d'échantillonnage des services à l'aide de la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces du service nommé « myservice » et 10 % des traces restantes :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Pour configurer une limite de fréquence, définissez la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage Ruby][1].

[1] : /tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a>, pour les applications Go, configurez les taux d'échantillonnage « byservice » et « byresource » via l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page de contrôle de l'ingestion</a>. 

Pour en savoir plus sur la configuration à distance des fréquences d'échantillonnage par service et par ressource, consultez cet [article][3].

**Remarque** : La configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**

Pour les applications Go, définissez les taux d'échantillonnage byservice et byresource (à partir de la version [v1.60.0][2] pour l'échantillonnage basé sur les ressources) à l'aide de la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour enregistrer 100 % des traces de la ressource `GET /checkout` du service `myservice`, et 20 % des traces des autres points de terminaison, configurez :

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Pour configurer une limite de fréquence, définissez la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez plutôt `DD_TRACE_SAMPLING_RULES`. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` sur `0.1`, définissez plutôt `DD_TRACE_SAMPLING_RULES` sur `[{"sample_rate":0.1}]`.

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque Go Tracing][1].

[1] : /tracing/trace_collection/dd_libraries/go
[2] : https://github.com/DataDog/ddtracego/releases/tag/v1.60.0
[3] : /guide-de-traçage/échantillonnage-basé-sur-les-ressources
{{% /tab %}}
{{% tab "Node.js" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a>, pour les applications Node.js, configurez les taux d'échantillonnage « byservice » et « byresource » via l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page de contrôle de l'ingestion</a>.

Pour en savoir plus sur la configuration à distance des fréquences d'échantillonnage par service et par ressource, consultez le [Guide de l'échantillonnage basé sur les ressources][1].

**Remarque** : la configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**

Pour les applications Node.js, définissez une fréquence d'échantillonnage globale dans la bibliothèque à l'aide de la variable d'environnement `DD_TRACE_SAMPLE_RATE`.

Vous pouvez également définir des fréquences d'échantillonnage par service. Par exemple, pour envoyer 50 % des traces du service nommé « myservice » et 10 % des autres traces :

```javascript
tracer.init({
    ingestion: {
        sampler: {
            sampleRate: 0.1,
            rules: [
                { sampleRate: 0.5, service: 'my-service' }
            ]
        }
    }
});
```

Pour configurer une limite de fréquence, définissez la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage Node.js][1].

[1] : /tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a>, pour les applications PHP, configurez les fréquences d'échantillonnage « byservice » et « byresource » depuis la <a href="https://app.datadoghq.com/apm/traces/ingestion-control">page de contrôle de l'ingestion</a>.

Pour en savoir plus sur la configuration à distance des fréquences d'échantillonnage par service et par ressource, consultez le [Guide de l'échantillonnage basé sur les ressources][1].

**Remarque** : la configuration à distance a priorité sur la configuration locale.

**Configuration locale**

Pour les applications PHP, définissez une fréquence d'échantillonnage globale pour la bibliothèque à l'aide de la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez les fréquences d'échantillonnage des services à l'aide de la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces du service nommé « myservice », 20 % des traces des autres points de terminaison et 10 % des traces restantes, configurez :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage PHP][1].

[1] : /tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a>, pour les applications C++, configurez les taux d'échantillonnage « byservice » et « byresource » via l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page de contrôle de l'ingestion</a>.

Pour en savoir plus sur la configuration à distance des fréquences d'échantillonnage par service et par ressource, consultez le [Guide de l'échantillonnage basé sur les ressources][1].

**Remarque** : la configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**
À partir de la version [v0.1.0][1], la bibliothèque C++ de Datadog prend en charge les configurations suivantes :
 Fréquence d'échantillonnage globale : variable d'environnement `DD_TRACE_SAMPLE_RATE`
 Fréquences d'échantillonnage par service : variable d'environnement `DD_TRACE_SAMPLING_RULES`.
 Définition de la limite de débit : variable d'environnement `DD_TRACE_RATE_LIMIT`.

Par exemple, pour envoyer 50 % des traces du service nommé « myservice » et 10 % des autres traces :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Le C++ ne propose pas d'intégrations pour l'instrumentation automatique, mais il est utilisé par des systèmes de traçage par proxy tels qu'Envoy, Nginx ou Istio. Pour en savoir plus sur la configuration de l'échantillonnage pour les proxys, consultez la section [Suivi des proxys][2].

[1] : https://github.com/DataDog/ddtracecpp/releases/tag/v0.1.0
[2] : /tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
Pour les applications .NET, définissez une fréquence d'échantillonnage globale pour la bibliothèque à l'aide de la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez les fréquences d'échantillonnage des services à l'aide de la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces du service nommé « myservice » et 10 % des autres traces :

```
#using powershell
$env:DD_TRACE_SAMPLE_RATE=0.1
$env:DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'

#using JSON file   
{
    "DD_TRACE_SAMPLE_RATE": "0.1",
    "DD_TRACE_SAMPLING_RULES": "[{\"service\": \"my-service\", \"resource\": \"GET /checkout\", \"sample_rate\": 0.5}]"
}
```

<div class="alert alert-info">Starting in version 2.35.0, if <a href="/remote_configuration">Agent Remote Configuration</a> is enabled where the service runs, you can set a per-service <code>DD_TRACE_SAMPLE_RATE</code> in the <a href="/tracing/software_catalog">Software Catalog</a> UI.</div>

Pour configurer une limite de fréquence, définissez la variable d'environnement `DD_TRACE_RATE_LIMIT` sur un nombre de traces par seconde et par instance de service. Si aucune valeur n'est définie pour `DD_TRACE_RATE_LIMIT`, une limite de 100 traces par seconde est appliquée.

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage .NET][1].
Pour en savoir plus sur la [configuration des variables d'environnement pour .NET][2].

[1] : /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnetcore
[2] : /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnetcore?tab=registryeditor#configuration-des-variables-d'environnement-du-processus
{{% /tab %}}
{{< /tabs >}}

**Remarque** : toutes les sections d'une trace échantillonnée à l'aide d'une configuration de bibliothèque de traçage sont associées au motif d'ingestion « rule ». Les services configurés avec des règles d'échantillonnage définies par l'utilisateur sont indiqués comme « Configuré » dans la colonne « Configuration » de la [page de contrôle de l'ingestion][5].

## Erreurs et traces rares

Pour les traces qui ne sont pas capturées par l'échantillonnage basé sur les têtes, deux mécanismes d'échantillonnage supplémentaires de l'agent Datadog garantissent la conservation et l'ingestion des traces critiques et variées. Ces deux échantillonneurs conservent un ensemble varié de traces locales (ensemble de segments provenant du même hôte) en capturant toutes les combinaisons d'un ensemble prédéfini de balises :

 **Suivi des erreurs** : Le suivi des erreurs est essentiel pour mettre en évidence les défaillances potentielles du système.
 **Traces rares** : l'échantillonnage des traces rares vous permet de garder une vue d'ensemble de votre système, en vous assurant que les services et les ressources à faible trafic continuent d'être surveillés.

**Remarque** : les échantillons d'erreur et les échantillons rares sont ignorés pour les services pour lesquels vous avez défini des [règles d'échantillonnage de bibliothèque](#intracinglibrariesuserdefinedrules).

### Traces d'erreurs
`ingestion_reason: erreur`

L'échantillonneur d'erreurs détecte les segments de traces contenant des intervalles d'erreur qui ne sont pas détectés par l'échantillonnage basé sur la tête. Il capture les traces d'erreur à un rythme pouvant atteindre 10 traces par seconde (par agent). Cela garantit une visibilité complète sur les erreurs lorsque le taux d'échantillonnage par tête est faible.

À partir de la version 7.33 de l'Agent, vous pouvez configurer l'échantillonneur d'erreurs dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou à l'aide de variables d'environnement :
```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Échantillonnage d'erreur" style="width:100%;" >}}

**Remarques** :
1. Définissez le paramètre sur `0` pour désactiver l'échantillonneur d'erreurs.
2. L'échantillonneur d'erreurs capture les traces locales comportant des segments d'erreur au niveau de l'agent. Si la trace est distribuée, rien ne garantit que la trace complète soit envoyée à Datadog.
3. Par défaut, les segments supprimés par les règles de la bibliothèque de traçage ou par une logique personnalisée telle que `manual.drop` sont **exclus** de l'échantillonneur d'erreurs.

#### Agent Datadog 7.42.0 et versions ultérieures

L'échantillonnage des erreurs est configurable à distance si vous utilisez la version [7.42.0][20] de l'Agent ou une version ultérieure. Suivez la [documentation][21] pour activer la configuration à distance dans vos agents. Grâce à la configuration à distance, vous pouvez activer la collecte de spans rares sans avoir à redémarrer l'agent Datadog.

#### Agent Datadog 6/7.41.0 et versions ultérieures

Pour remplacer le comportement par défaut afin que les segments écartés par les règles de la bibliothèque de traçage ou par une logique personnalisée telle que `manual.drop` soient **inclus** par l'échantillonneur d'erreurs, activez la fonctionnalité à l'aide de : `DD_APM_FEATURES=error_rare_sample_tracer_drop` dans l'agent Datadog (ou dans le conteneur dédié à l'agent de traçage au sein du pod de l'agent Datadog dans Kubernetes).


#### Agent Datadog 6/7.33 à 6/7.40.x

Le comportement par défaut de l'échantillonnage des erreurs ne peut pas être modifié pour ces versions de l'Agent. Mettez à jour l'agent Datadog vers la version 6/7.41.0 ou une version ultérieure.


### Traces rares
`motif_d'ingestion : rare`

L'échantillonneur de données rares envoie un ensemble de plages de données rares à Datadog. Il capture les combinaisons de `env`, `service`, `name`, `resource`, `error.type` et `http.status`, à raison de 5 traces par seconde (par agent). Cela garantit la visibilité sur les ressources peu sollicitées lorsque le taux d'échantillonnage par tête est faible.

**Remarque** : L'échantillonneur rare capture les traces locales au niveau de l'agent. Si la trace est fragmentée, il n'y a aucun moyen de garantir que la trace complète sera envoyée à Datadog.

#### Agent Datadog 7.42.0 et versions ultérieures

La fréquence d'échantillonnage rare peut être configurée à distance si vous utilisez la version [7.42.0][20] de l'Agent ou une version ultérieure. Suivez la [documentation][21] pour activer la configuration à distance dans vos agents. Grâce à la configuration à distance, vous pouvez modifier la valeur d'un paramètre sans avoir à redémarrer l'agent Datadog.

#### Agent Datadog 6/7.41.0 et versions ultérieures

Par défaut, l'échantillonneur aléatoire n'est **pas activé**.

**Remarque** : lorsqu'il est **activé**, les segments écartés par les règles de la bibliothèque de traçage ou par une logique personnalisée telle que `manual.drop` sont **exclus** de cet échantillonneur.

Pour configurer l'échantillonneur rare, modifiez le paramètre `apm_config.enable_rare_sampler` dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou via la variable d'environnement `DD_APM_ENABLE_RARE_SAMPLER` :

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

Pour évaluer les intervalles supprimés par le suivi des règles de la bibliothèque ou par une logique personnalisée telle que `manual.drop`,
 activez cette fonctionnalité en ajoutant : `DD_APM_FEATURES=error_rare_sample_tracer_drop` dans l'agent de traçage.


#### Agent Datadog 6/7.33 à 6/7.40.x

Par défaut, l'échantillonneur aléatoire est activé.

**Remarque** : Lorsqu'il est **activé**, les segments écartés par les règles de la bibliothèque de traçage ou par une logique personnalisée telle que `manual.drop` **sont exclus** de cet échantillonneur. Pour intégrer ces plages dans cette logique, effectuez une mise à niveau vers Datadog Agent 6.41.0/7.41.0 ou une version ultérieure.

Pour modifier les paramètres par défaut de l'échantillonneur rare, modifiez le paramètre `apm_config.disable_rare_sampler` dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou via la variable d'environnement `DD_APM_DISABLE_RARE_SAMPLER` :

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## Forcer la conservation et la suppression
`motif_d'ingestion : manuel`

Le mécanisme d'échantillonnage basé sur les têtes peut être remplacé au niveau de la bibliothèque de traçage. Par exemple, si vous devez surveiller une transaction critique, vous pouvez forcer la conservation de la trace associée. En revanche, pour les informations superflues ou redondantes, comme les contrôles de santé, vous pouvez forcer la suppression de la trace.

 Définissez l'attribut « Manual Keep » sur une balise « span » pour indiquer que celle-ci et toutes ses balises « span » enfants doivent être intégrées. La trace obtenue peut apparaître incomplète dans l'interface utilisateur si la section concernée n'est pas la section racine de la trace.

 Définissez « Manual Drop » sur une balise span afin de vous assurer qu'**aucune** balise span enfant ne soit intégrée. Les [erreurs et les traces rares](#errorandraretraces) seront ignorées dans l'Agent.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Enregistrer manuellement :

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        Span span = GlobalTracer.get().activeSpan();
        // Always keep the trace
        span.setTag(DDTags.MANUAL_KEEP, true);
        // method impl follows
    }
}
```

Supprimer manuellement une trace :

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        Span span = GlobalTracer.get().activeSpan();
        // Always Drop the trace
        span.setTag(DDTags.MANUAL_DROP, true);
        // method impl follows
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Enregistrer manuellement :

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # Always Keep the Trace
    span.set_tag(MANUAL_KEEP_KEY)
    # method impl follows
```

Supprimer manuellement une trace :

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # Always Drop the Trace
    span.set_tag(MANUAL_DROP_KEY)
    # method impl follows
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Enregistrer manuellement :

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

Supprimer manuellement une trace :

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

Enregistrer manuellement :

```Go
package main

import (
    "log"
    "net/http"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/ext" 
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always keep this trace:
    span.SetTag(ext.ManualKeep, true)
    //method impl follows

}
```

Supprimer manuellement une trace :

```Go
package main

import (
    "log"
    "net/http"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/ext"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always drop this trace:
    span.SetTag(ext.ManualDrop, true)
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Enregistrer manuellement :

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

Supprimer manuellement une trace :

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always drop the trace
span.setTag(tags.MANUAL_DROP)
//method impl follows

```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Enregistrer manuellement :

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // Always keep this trace
    span.SetTag(Datadog.Trace.Tags.ManualKeep, "true");
    //method impl follows
}
```

Supprimer manuellement une trace :

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // Always drop this trace
    span.SetTag(Datadog.Trace.Tags.ManualDrop, "true");
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


Enregistrer manuellement :

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // Always keep this trace
    $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
  }
?>
```

Supprimer manuellement une trace :

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // Always drop this trace
    $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
  }
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

Enregistrer manuellement :

```cpp
...
#include <datadog/tags.h>
#include <datadog/trace_segment.h>
#include <datadog/sampling_priority.h>
...

dd::SpanConfig span_cfg;
span_cfg.resource = "operation_name";

auto span = tracer.create_span(span_cfg);
// Always keep this trace
span.trace_segment().override_sampling_priority(int(dd::SamplingPriority::USER_KEEP));
//method impl follows
```

Supprimer manuellement une trace :

```cpp
...
#include <datadog/tags.h>
#include <datadog/trace_segment.h>
#include <datadog/sampling_priority.h>
...

using namespace dd = datadog::tracing;

dd::SpanConfig span_cfg;
span_cfg.resource = "operation_name";

auto another_span = tracer.create_span(span_cfg);
// Always drop this trace
span.trace_segment().override_sampling_priority(int(dd::SamplingPriority::USER_DROP));
//method impl follows
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

La conservation manuelle des traces doit avoir lieu avant la propagation du contexte. Si elle est conservée après la propagation du contexte, le système ne peut pas garantir que la trace complète soit conservée d'un service à l'autre. La conservation manuelle des traces est définie au niveau du client de traçage ; la trace peut donc toujours être supprimée par l'agent ou le serveur en fonction des règles d'échantillonnage.


## Portées simples
`ingestion_reason: single_span`

Si vous devez échantillonner un segment spécifique sans pour autant avoir besoin de disposer de la trace complète, les bibliothèques de traçage vous permettent de définir un taux d'échantillonnage pour un seul segment.

Par exemple, si vous créez des [métriques à partir de spans][6] pour surveiller des services spécifiques, vous pouvez configurer des règles d'échantillonnage des spans afin de vous assurer que ces métriques reposent sur 100 % du trafic de l'application, sans avoir à ingérer 100 % des traces pour toutes les requêtes transitant par le service.

Cette fonctionnalité est disponible pour Datadog Agent v[7.40.0][19] et versions ultérieures.

**Remarque** : les règles d'échantillonnage par segment unique **ne peuvent pas** être utilisées pour supprimer des segments conservés par l'[échantillonnage basé sur la tête](#headbasedsampling), mais uniquement pour conserver des segments supplémentaires qui sont supprimés par l'échantillonnage basé sur la tête.

{{< tabs >}}
{{% tab "Java" %}}
À partir de la bibliothèque de traçage [version 1.7.0][1], pour les applications Java, définissez les règles d'échantillonnage **span** par nom de service et par nom d'opération à l'aide de la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter 100 % des segments du service nommé « myservice », pour l'opération « http.request », à raison de 50 segments par seconde au maximum :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage Java][2].

[1] : https://github.com/DataDog/ddtracejava/releases/tag/v1.7.0
[2] : /tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
À partir de la version [v1.4.0][1], pour les applications Python, définissez les règles d'échantillonnage **span** par service et par opération à l'aide de la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100 %` des segments du service nommé `myservice`, pour l'opération `http.request`, à raison de `50` segments par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```


Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage Python][2].

[1] : https://github.com/DataDog/ddtracepy/releases/tag/v1.4.0
[2] : /tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
À partir de la version [v1.5.0][1], pour les applications Ruby, définissez les règles d'échantillonnage **span** par service et par opération à l'aide de la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100 %` des segments du service nommé `myservice`, pour l'opération `http.request`, à raison de `50` segments par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage Ruby][2].

[1] : https://github.com/DataDog/ddtracerb/releases/tag/v1.5.0
[2] : /tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
À partir de la version [v1.41.0][1], pour les applications Go, définissez les règles d'échantillonnage **span** par service et par opération à l'aide de la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100 %` des segments du service nommé `myservice`, pour l'opération `http.request`, à raison de `50` segments par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
À partir de la version [v1.60.0][3], pour les applications Go, définissez les règles d'échantillonnage **span** par ressource et par balise à l'aide de la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour récupérer `100 %` des intervalles de temps fournis par le service pour la ressource `POST /api/create_issue`, pour le tag `priority` dont la valeur est `high` :

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque Go Tracing][2].

[1] : https://github.com/DataDog/ddtracego/releases/tag/v1.41.0
[2] : /tracing/trace_collection/dd_libraries/go
[3] : https://github.com/DataDog/ddtracego/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Pour les applications Node.js, définissez les règles d'échantillonnage **span** par service et par opération à l'aide de la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100 %` des segments du service nommé `myservice`, pour l'opération `http.request`, à raison de `50` segments par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage Node.js][1].

[1] : /tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
À partir de la version [v0.77.0][1], pour les applications PHP, définissez les règles d'échantillonnage **span** par service et par opération à l'aide de la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100 %` des segments du service nommé `myservice`, pour l'opération `http.request`, à raison de `50` segments par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage PHP][2].

[1] : https://github.com/DataDog/ddtracephp/releases/tag/0.77.0
[2] : /tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
À partir de la version [v0.1.0][1], pour les applications C++, définissez les règles d'échantillonnage **span** par service et par opération à l'aide de la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100 %` des segments du service nommé `myservice`, pour l'opération `http.request`, à raison de `50` segments par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1] : https://github.com/DataDog/ddtracecpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab ".NET" %}}
À partir de la version [v2.18.0][1], pour les applications .NET, définissez les règles d'échantillonnage **span** par service et par opération à l'aide de la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100 %` des segments du service nommé `myservice`, pour l'opération `http.request`, à raison de `50` segments par seconde :

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage .NET][2].

[1] : https://github.com/DataDog/ddtracedotnet/releases/tag/v2.18.0
[2] : /tracing/trace_collection/dd_libraries/dotnetcore
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"> The <a href="/tracing/legacy_app_analytics/">App Analytics</a> mechanism is fully deprecated. To ingest single spans without the complete trace, use the <a href="/tracing/trace_pipeline/ingestion_mechanisms#single-spans">Single Span sampling</a> configuration. To ingest complete traces, use <a href="/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling">Head-Based sampling</a> configurations.</div>

## Intervalles de temps couverts par le produit

### Traces RUM
`motif_d'ingestion:rhum`

Une requête provenant d'une application web ou mobile génère une trace lorsque les services backend sont instrumentés. [L'intégration de l'APM avec le Real User Monitoring][7] relie les requêtes des applications Web et mobiles aux traces backend correspondantes, ce qui vous permet d'avoir une vue d'ensemble complète des données frontend et backend.

À partir de la version `4.30.0` du SDK RUM pour navigateur, vous pouvez gérer les volumes de données ingérées et conserver un échantillon des traces du backend en configurant le paramètre d'initialisation `traceSampleRate`. Définissez `traceSampleRate` sur une valeur comprise entre `0` et `100`.
Si aucune valeur n'est définie pour `traceSampleRate`, 100 % des traces provenant des requêtes du navigateur sont envoyées à Datadog par défaut.

De même, vous pouvez régler la fréquence d'échantillonnage des traces dans d'autres SDK à l'aide de paramètres similaires :

| SDK         | Paramètre             | Version minimale    |
||||
| Navigateur     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _Le taux d'échantillonnage est indiqué sur la page de contrôle de l'ingestion depuis la version [1.13.0][16]_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _Le taux d'échantillonnage est indiqué dans la page de contrôle de l'ingestion depuis la version [1.15.0][17]_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _Le taux d'échantillonnage est indiqué sur la page de contrôle de l'ingestion depuis la version [1.2.0][18]_  |

### Traces synthétiques
`ingestion_reason:synthetics` et `ingestion_reason:syntheticsbrowser`

Les tests HTTP et les tests de navigateur génèrent des traces lorsque les services backend sont instrumentés. [L'intégration d'APM aux tests synthétiques][13] relie vos tests synthétiques aux traces backend correspondantes. À partir d'un test ayant échoué, identifiez la cause première du problème en examinant la trace générée par ce test.

Par défaut, 100 % des tests HTTP et des tests de navigateur synthétiques génèrent des traces backend.

### Autres produits

D'autres raisons d'ingestion sont attribuées aux spans générés par certains produits Datadog :

| Produit    | Motif de l'ingestion                    | Description du mécanisme d'ingestion |
||||
| Sans serveur | `lambda` et `xray`                   | Vos traces provenant des [applications sans serveur][14] suivies à l'aide des bibliothèques de traçage Datadog ou de l'intégration AWS XRay. |
| Protection des applications et des API     | `appsec`                            | Traces collectées à partir des bibliothèques de traçage Datadog et signalées comme menaces par [AAP][15]. |
| Observabilité des données : surveillance des tâches    | `data_jobs`                            | Traces importées depuis l'intégration Datadog Java Tracer pour Spark ou l'intégration Databricks. |

## Mécanismes d'ingestion dans OpenTelemetry
`motif_d'ingestion:otel`

Selon la configuration que vous avez choisie avec les SDK OpenTelemetry (que vous utilisiez le collecteur OpenTelemetry ou l'agent Datadog), plusieurs méthodes s'offrent à vous pour contrôler l'échantillonnage des données. Pour plus de détails sur les options d'échantillonnage disponibles au niveau du SDK OpenTelemetry, d'OpenTelemetry Collector et de l'agent Datadog dans différentes configurations OpenTelemetry, consultez [Échantillonnage de l'ingestion avec OpenTelemetry][22].

## Pour en savoir plus

{{< partial name="whats-next/whats-next.html" >}}

[1] : /tracing/trace_collection/dd_libraries/
[2] : /tracing/trace_pipeline/metrics/
[3] : https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[4] : /tracing/glossaire/#tracerootspan
[5] : /tracing/trace_pipeline/ingestion_controls/
[6] : /tracing/trace_pipeline/generate_metrics/
[7] : /surveillance_des_utilisateurs_réels/corrélation_avec_d'autres_données_de_télémétrie/apm/
[8] : https://github.com/DataDog/browsersdk/releases/tag/v4.30.0
[9] : https://github.com/DataDog/ddsdkios/releases/tag/1.11.0
[10] : https://github.com/DataDog/ddsdkandroid/releases/tag/1.13.0
[11] : https://github.com/DataDog/ddsdkflutter/releases/tag/datadog_flutter_plugin%2Fv1.0.0
[12] : https://github.com/DataDog/ddsdkreactnative/releases/tag/1.0.0
[13] : /synthetics/apm/
[14] : /serverless/distributed_tracing/
[15] : /sécurité/sécurité_des_applications/
[16] : https://github.com/DataDog/ddsdkios/releases/tag/1.13.0
[17] : https://github.com/DataDog/ddsdkandroid/releases/tag/1.15.0
[18] : https://github.com/DataDog/ddsdkreactnative/releases/tag/1.2.0
[19] : https://github.com/DataDog/datadogagent/releases/tag/7.40.0
[20] : https://github.com/DataDog/datadogagent/releases/tag/7.42.0
[21] : /guide-de-dépannage/remote_config/
[22] : /opentelemetry/guide/ingestion_sampling_with_opentelemetry