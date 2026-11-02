---
aliases:
- /fr/change_tracking/feature_flags/
description: Apprenez à suivre, corréler et corriger les modifications de Feature
  Flags dans Datadog pour identifier et résoudre les problèmes causés par les mises
  à jour de flags.
further_reading:
- link: /change_tracking/
  tag: Documentation
  text: Suivi des modifications
- link: /feature_flags/
  tag: Documentation
  text: Datadog Feature Flags
- link: /integrations/launchdarkly/#feature-flag-tracking-integration/
  tag: Documentation
  text: LaunchDarkly
title: Suivre les modifications de Feature Flags
---
## Présentation {#overview}

Le suivi des Feature Flags dans Datadog vous aide à corréler les modifications de flags avec les problèmes de performance du système, accélérant ainsi la résolution des incidents. En suivant le moment où les flags sont activés, mis à jour ou déployés, vous pouvez identifier si une modification de Feature Flag a causé une dégradation des performances ou une panne.

Grâce au suivi des Feature Flags, vous pouvez :
- Voir les modifications de flags directement dans vos dashboards, monitors et pages de service
- Identifier automatiquement quels services sont affectés par une modification de flag
- Revenir à l'état précédent des Feature Flags problématiques directement depuis Datadog

{{< img src="/change_tracking/monitor.png" alt="Le graphique du monitor montre le pic d'erreurs corrélé à la modification du flag." style="width:100%;" >}}

## Suivre les Feature Flags {#track-feature-flags}

Datadog prend en charge le suivi automatique des [Datadog Feature Flags][8], des flags [LaunchDarkly][1] via l'intégration LaunchDarkly, ou des flags d'autres fournisseurs via l'[Events API][3].

### Datadog Feature Flags {#datadog-feature-flags}

Le suivi des modifications pour les [Datadog Feature Flags][8] est activé automatiquement. Aucune configuration supplémentaire n'est requise. Lorsque vous mettez à jour le ciblage, le déploiement ou le statut d'un flag dans un environnement, Datadog émet un événement Change Tracking qui apparaît dans les timelines Change Tracking de vos services.

Chaque événement inclut :

- La clé et le nom du flag
- L'environnement où la modification a eu lieu (et s'il s'agit d'un environnement de production)
- L'utilisateur qui a effectué la modification
- Les anciennes et nouvelles valeurs, y compris les règles de ciblage et les variantes
- Un lien vers le Feature Flag dans Datadog

Pour associer une modification de Datadog Feature Flag à un service, [instrumentez votre code d'évaluation des Feature Flags][4] à l'aide de la bibliothèque de traçage Datadog. Datadog utilise les traces APM obtenues pour détecter automatiquement quels services évaluent le flag. Consultez [Détecter automatiquement les services affectés](#automatically-detect-affected-services) pour plus de détails.

### Flags LaunchDarkly {#launchdarkly-flags}

Pour suivre les Feature Flags LaunchDarkly dans la timeline Change Tracking de vos services :

1. Activez l'[intégration Datadog][1] dans LaunchDarkly.
1. Allez dans {{< ui >}}Flags{{< /ui >}} > `<your-feature-flag-name>` dans LaunchDarkly.
1. Dans {{< ui >}}Datadog tags{{< /ui >}}, ajoutez un tag avec la clé `service` et la valeur `<your-service-name>`, correspondant exactement au nom de votre service Datadog.
1. Cliquez sur {{< ui >}}Save changes{{< /ui >}}.

Par exemple, pour associer un Feature Flag au service `payments_api` utilisé dans les exemples ci-dessous, définissez la valeur du tag sur `payments_api`. Après avoir soumis l'événement, vous pouvez accéder au [Catalog][7], sélectionner le service `payments_api` et voir l'événement du Feature Flag `fallback_payments_test` dans la timeline Change Tracking.

### Feature Flags personnalisés {#custom-feature-flags}

Envoyez des événements de Feature Flags depuis n'importe quel fournisseur à l'aide de l'[Events API][3]. Créez un événement de catégorie `change` et incluez un tag de service pour associer l'événement à votre service.

#### Tags recommandés {#recommended-tags}

Lorsque vous envoyez des événements personnalisés de modification de Feature Flags, incluez les champs suivants pour permettre un filtrage précis et une corrélation entre les produits Datadog :

- `impacted_resources` (avec le type `service`) : Ajoutez le nom du service concerné au tableau `impacted_resources` pour associer la modification du Feature Flag au service affecté.
- `env` tag : Spécifiez l'environnement dans lequel la modification a eu lieu (par exemple, production, staging ou development).

Si ces tags ne peuvent pas être ajoutés lors de la création de l'événement, consultez la section suivante pour obtenir des conseils sur l'enrichissement automatique.

Exemple de requête :

```json
{
  "data": {
    "attributes": {
      "aggregation_key": "string",
      "attributes": {
        "author": {
          "name": "datadog@datadog.com",
          "type": "user"
        },
        "change_metadata": {
          "dd": {
            "team": "datadog_team",
            "user_email": "datadog@datadog.com",
            "user_id": "datadog_user_id",
            "user_name": "datadog_username"
          },
          "resource_link": "datadog.com/feature/fallback_payments_test"
        },
        "changed_resource": {
          "name": "fallback_payments_test",
          "type": "feature_flag"
        },
        "impacted_resources": [
          {
            "name": "payments_api",
            "type": "service"
          }
        ],
        "new_value": {
          "enabled": true,
          "percentage": "50%",
          "rule": {
            "datacenter": "devcycle.us1.prod"
          }
        },
        "prev_value": {
          "enabled": true,
          "percentage": "10%",
          "rule": {
            "datacenter": "devcycle.us1.prod"
          }
        }
      },
      "category": "change",
      "message": "payment_processed feature flag has been enabled",
      "tags": [
        "env:test"
      ],
      "timestamp": "string",
      "title": "payment_processed feature flag updated"
    },
    "type": "event"
  }
}
```

## Détecter automatiquement les services affectés {#automatically-detect-affected-services}

Outre le suivi des modifications de configuration des Feature Flags via l'intégration LaunchDarkly ou l'Events API, Datadog peut détecter automatiquement les services qui évaluent un flag à l'aide des traces APM ou des métriques. Cela offre une visibilité en temps réel sur l'utilisation des flags dans votre système, en particulier lorsqu'un même flag est évalué par plusieurs services.

### Enrichissement basé sur les traces {#trace-based-enrichment}
L'enrichissement basé sur les traces utilise les traces APM pour associer automatiquement les modifications de Feature Flags aux services Datadog concernés. La section suivante détaille comment l'implémenter dans votre base de code.

#### Configuration {#setup}

Pour détecter automatiquement les services qui utilisent un Feature Flag, instrumentez votre code d'évaluation des Feature Flags avec le SDK Datadog. Cela permet à Datadog de détecter automatiquement tous les services qui évaluent un flag donné, même s'ils n'avaient pas été associés à un tag à l'origine.

1. [Instrumentez votre code d'évaluation des Feature Flags][4] à l'aide du SDK Datadog.
1. Créez un span personnalisé avec le nom d'opération `experiments.IsEnabled` pour suivre les évaluations des Feature Flags.
3. Ajoutez le tag `experiment_id:<flag-id>` au span, où `<flag-id>` correspond à l'ID du Feature Flag.

Par exemple :

```python
# Trace feature flag evaluation to enable auto-detection
with tracer.trace("experiments.IsEnabled") as span:
    span.set_tag("experiment_id", "fallback_payments_test") # adds the flag name as a span tag
    # Your existing feature flag evaluation code
    flag_value = evaluate_flag("fallback_payments_test")
    span.set_tag("experiment_value", flag_value) # adds the evaluated flag value as a span tag
```

### Enrichissement basé sur les métriques {#metrics-based-enrichment}

L'enrichissement basé sur les métriques utilise les métriques Datadog pour ajouter le contexte du service aux modifications de vos Feature Flags. La section suivante explique comment l'implémenter dans votre base de code.

#### Configuration {#setup-1}

Envoyez la métrique `dd.dynamic_config.is_experiment_enabled` avec le statut de votre expérience.

```python
from datadog import initialize, statsd

initialize(statsd_host='localhost', statsd_port=8125)

# Any metric type is supported
statsd.gauge(
    'dd.dynamic_config.is_experiment_enabled',
    1,  # 1 if enabled, 0 if disabled
    tags=[
        'experiment.id:fallback_payments_test',
        'service:payments_api'
    ]
)
```

## Corrigez les modifications de Feature Flags avec Workflow Automation {#remediate-feature-flag-changes-with-workflow-automation}

Lorsque vous constatez qu'une modification de Feature Flag a causé un problème, vous pouvez immédiatement changer son état sans quitter Datadog. Cette fonctionnalité utilise [Workflow Automation][2] pour activer ou désactiver les flags LaunchDarkly directement depuis les timelines Change Tracking.

<div class="alert alert-info">Cette fonctionnalité nécessite Workflow Automation. Consultez <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">la tarification de Workflow Automation</a>.</div>

### Configuration {#setup-2}

Pour configurer l'activation et la désactivation des Feature Flags à l'aide de Workflow Automation :

1. Accédez à [**Actions > Action Catalog > Connections**][6].
1. Cliquez sur **New Connection**.
1. Choisissez {{< ui >}}LaunchDarkly{{< /ui >}}.
1. Remplissez les informations requises, puis cliquez sur {{< ui >}}Next, Confirm Access{{< /ui >}}.
1. Définissez les autorisations d'accès pour la connexion.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

### Activez ou désactivez les Feature Flags {#use-feature-flag-toggles}

Pour activer ou désactiver des Feature Flags depuis Datadog :

1. Cliquez sur une modification de Feature Flag LaunchDarkly dans la timeline Change Tracking.
1. Cliquez sur le bouton {{< ui >}}Toggle Feature Flag{{< /ui >}}.
1. Cliquez sur {{< ui >}}Run Action{{< /ui >}} pour exécuter le workflow et activer ou désactiver le Feature Flag.

{{< img src="/change_tracking/toggle.png" alt="Le panneau de détails d'un événement de Feature Flag LaunchDarkly, affichant le bouton « Toggle Feature Flag »." style="width:90%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/launchdarkly/#setup
[2]: https://app.datadoghq.com/actions/connections
[3]: /fr/api/latest/events/
[4]: /fr/tracing/trace_collection/
[5]: https://app.datadoghq.com/apm/settings
[6]: https://app.datadoghq.com/actions/connections
[7]: https://app.datadoghq.com/software
[8]: /fr/feature_flags/