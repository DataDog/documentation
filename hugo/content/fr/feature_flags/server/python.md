---
description: Configurez Datadog Feature Flags pour les applications Python.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /tracing/trace_collection/dd_libraries/python/
  tag: Documentation
  text: Traçage Python
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guide
  text: Configurer les métriques d'évaluation des Feature Flags côté serveur
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guide
  text: Configurer l'enrichissement des traces APM pour les Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concept
  text: Graphiques des Feature Flags
- link: /feature_flags/concepts/configuration_sources/
  tag: Concept
  text: Sources de configuration du SDK serveur
title: Feature Flags Python
---
## Vue d'ensemble {#overview}

Cette page décrit comment instrumenter votre application Python avec le SDK Datadog Feature Flags. Le SDK Python s'intègre à [OpenFeature][1], un standard ouvert pour la gestion des Feature Flags. À partir de la version `ddtrace` 4.14.0, il charge la configuration des Feature Flags directement depuis le CDN géré par Datadog par défaut.

Ce guide explique comment installer et activer le SDK, créer un client OpenFeature et évaluer les Feature Flags dans votre application.

<div class="alert alert-warning">La livraison agentless Python modifie uniquement la source de configuration. Sans Datadog Agent pris en charge ou chemin de télémétrie serverless, le SDK n'exporte pas de métriques d'évaluation ni d'événements d'exposition.</div>

## Prérequis {#prerequisites}

Avant de configurer le SDK Python Feature Flags, assurez-vous de disposer des éléments suivants :

- **Datadog Python SDK** `ddtrace` version 4.14.0 ou ultérieure
- **OpenFeature Python SDK** `openfeature-sdk` : version 0.5.0 ou ultérieure (version 0.7.0 ou ultérieure requise si vous utilisez des gestionnaires d'événements de fournisseur pour attendre l'initialisation)
- Une [clé d'API][3] Datadog
- Votre site Datadog

Définissez les variables d'environnement suivantes :

{{< code-block lang="bash" >}}
# Required: Agentless configuration delivery
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" code="true" >}}
export DD_ENV=<YOUR_ENVIRONMENT>

# Optional: Enable flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true

# Recommended: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
{{< /code-block >}}

Aucune activation de Feature Flags ni aucun paramètre de source n'est requis. Enregistrez le provider comme indiqué dans [Initialiser le SDK](#initialize-the-sdk) pour commencer l'interrogation. L'installation ou l'initialisation de `ddtrace` seule ne crée pas de trafic CDN pour les Feature Flags.

Pour configurer `feature_flag.evaluations`, y compris la version requise du traceur et la configuration OTLP de l'Agent, consultez [Configurer les métriques d'évaluation des Feature Flags côté serveur][4]. Pour plus d'informations sur les graphiques disponibles, consultez [Graphiques des Feature Flags][5].

## Installation {#installation}

Installez le SDK Datadog Python et le SDK OpenFeature :

{{< code-block lang="bash" >}}
pip install ddtrace openfeature-sdk
{{< /code-block >}}

Ou ajoutez-les à votre `requirements.txt` :

{{< code-block lang="text" filename="requirements.txt" >}}
ddtrace>=4.14.0
openfeature-sdk>=0.5.0
{{< /code-block >}}

Si vous activez les métriques d'évaluation des Feature Flags, vous devez également installer le SDK OpenTelemetry et l'exportateur OTLP :

{{< code-block lang="bash" >}}
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-grpc
{{< /code-block >}}

Ou ajoutez-les à votre `requirements.txt` :

{{< code-block lang="text" filename="requirements.txt" >}}
opentelemetry-sdk>=1.41.0
opentelemetry-exporter-otlp-proto-grpc>=1.41.0
{{< /code-block >}}

## Initialiser le SDK {#initialize-the-sdk}

Enregistrez le provider Datadog OpenFeature auprès de l'API OpenFeature. Le provider démarre la source de configuration sélectionnée et attend jusqu'à 10 secondes pour sa première configuration.

{{< code-block lang="python" >}}
from openfeature import api
from ddtrace.openfeature import DataDogProvider

# Create and register the Datadog provider
provider = DataDogProvider()
api.set_provider(provider)

# Create an OpenFeature client
client = api.get_client()

# Your application code here
{{< /code-block >}}

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez un contexte d'évaluation qui identifie l'utilisateur ou l'entité pour le ciblage des Feature Flags. Le contexte d'évaluation inclut des attributs utilisés pour déterminer quelles variations de Feature Flags doivent être renvoyées :

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",  # Targeting key (typically user ID)
    attributes={
        "email": "user@example.com",
        "country": "US",
        "tier": "premium",
        "age": 25
    }
)
{{< /code-block >}}

La clé de ciblage est utilisée pour une distribution cohérente du trafic (déploiements progressifs). Des attributs supplémentaires permettent de définir des règles de ciblage, telles que « activer pour les utilisateurs aux États-Unis » ou « activer pour les utilisateurs de niveau premium » dans l'exemple ci-dessus.

## Évaluer les Feature Flags {#evaluate-flags}

Après avoir configuré le fournisseur et créé un client, vous pouvez évaluer les Feature Flags dans toute votre application. L'évaluation des Feature Flags est locale et rapide : le SDK utilise des données de configuration mises en cache localement, de sorte qu'aucune requête réseau n'est effectuée pendant l'évaluation.

Chaque Feature Flag est identifié par une clé (une chaîne unique) et peut être évalué avec une méthode typée qui renvoie une valeur du type attendu. Si le Feature Flag n'existe pas ou ne peut pas être évalué, le SDK renvoie la valeur par défaut fournie.

### Feature Flags booléens {#boolean-flags}

Utilisez `get_boolean_value` pour les Feature Flags qui représentent des conditions activé/désactivé ou vrai/faux :

{{< code-block lang="python" >}}
enabled = client.get_boolean_value("new-checkout-flow", False, eval_ctx)

if enabled:
    show_new_checkout()
else:
    show_legacy_checkout()
{{< /code-block >}}

### Feature Flags de chaîne {#string-flags}

Utilisez `get_string_value` pour les Feature Flags qui permettent de choisir entre plusieurs variantes ou chaînes de configuration :

{{< code-block lang="python" >}}
theme = client.get_string_value("ui-theme", "light", eval_ctx)

if theme == "dark":
    set_dark_theme()
elif theme == "light":
    set_light_theme()
else:
    set_light_theme()
{{< /code-block >}}

### Feature Flags numériques {#numeric-flags}

Pour les Feature Flags numériques, utilisez `get_integer_value` ou `get_float_value`. Ils sont appropriés lorsqu'une fonctionnalité dépend d'un paramètre numérique tel qu'une limite, un pourcentage ou un multiplicateur :

{{< code-block lang="python" >}}
max_items = client.get_integer_value("cart-max-items", 20, eval_ctx)

discount_rate = client.get_float_value("discount-rate", 0.0, eval_ctx)
{{< /code-block >}}

### Indicateurs d'objet {#object-flags}

Pour les données structurées, utilisez `get_object_value`. Cela renvoie un dictionnaire avec une configuration complexe :

{{< code-block lang="python" >}}
config = client.get_object_value("feature-config", {
    "maxRetries": 3,
    "timeout": 30
}, eval_ctx)

max_retries = config.get("maxRetries", 3)
timeout = config.get("timeout", 30)
{{< /code-block >}}

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la simple valeur de l'indicateur, utilisez les méthodes `*_details`. Celles-ci renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

{{< code-block lang="python" >}}
details = client.get_boolean_details("new-feature", False, eval_ctx)

print(f"Value: {details.value}")
print(f"Variant: {details.variant}")
print(f"Reason: {details.reason}")
print(f"Error Code: {details.error_code}")
print(f"Error Message: {details.error_message}")
{{< /code-block >}}

Les détails des indicateurs vous aident à déboguer le comportement d'évaluation et à comprendre pourquoi un utilisateur a reçu une valeur donnée.

### Évaluation sans contexte {#evaluation-without-context}

Vous pouvez évaluer des Feature Flags sans fournir de contexte d'évaluation. Ceci est utile pour les Feature Flags globaux qui ne nécessitent pas de ciblage spécifique à l'utilisateur :

{{< code-block lang="python" >}}
# Global feature flag - no context needed
maintenance_mode = client.get_boolean_value("maintenance-mode", False)

if maintenance_mode:
    return "Service temporarily unavailable"
{{< /code-block >}}

## En attente de l'initialisation du fournisseur {#waiting-for-provider-initialization}

L'enregistrement du fournisseur attend jusqu'à 10 secondes que la source sélectionnée fournisse sa première configuration. Si la configuration arrive, le fournisseur émet `PROVIDER_READY`. Si le délai d'attente est dépassé, l'enregistrement se termine avec le fournisseur dans un état d'erreur, et les évaluations renvoient les valeurs par défaut fournies par l'appelant jusqu'à ce que la configuration arrive. Utilisez un gestionnaire d'événements pour attendre un événement prêt ultérieur :

{{< code-block lang="python" >}}
import threading
from openfeature import api
from openfeature.event import ProviderEvent
from ddtrace.openfeature import DataDogProvider

# Create an event to wait for readiness
ready_event = threading.Event()

def on_ready(event_details):
    ready_event.set()

# Register event handler
api.add_handler(ProviderEvent.PROVIDER_READY, on_ready)

# Set provider
provider = DataDogProvider()
api.set_provider(provider)

# Wait for the provider to be ready if registration timed out
if ready_event.wait(timeout=30):
    print("Provider is ready")
else:
    print("Provider initialization timed out")

# Create client and evaluate flags
client = api.get_client()
{{< /code-block >}}

<div class="alert alert-info">Les gestionnaires d'événements du fournisseur nécessitent le SDK OpenFeature 0.7.0 ou une version ultérieure. La plupart des applications peuvent utiliser le délai d'attente d'initialisation par défaut de 10 secondes et gérer les valeurs par défaut fournies par l'appelant si la configuration n'est pas disponible.</div>

Définissez `DD_EXPERIMENTAL_FLAGGING_PROVIDER_INITIALIZATION_TIMEOUT_MS` sur un nombre positif de millisecondes pour modifier le délai d'attente d'initialisation.

## Configuration avancée {#advanced-configuration}

Utilisez [Server SDK Configuration Sources][6] comme référence canonique pour la sélection de la source et les paramètres opérationnels :

- [Configurer la livraison agentless][10], y compris l'interrogation, le délai d'attente de la requête et les paramètres de endpoint
- [Utiliser un endpoint agentless personnalisé][7] pour les tests avancés, le développement local ou un proxy géré par l'opérateur
- [Utiliser Agent Remote Configuration][9] pour conserver la livraison gérée par l'agent
- [Migrer une Remote Configuration existante][8] et supprimer le paramètre obsolète `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`

Le mode Agentless modifie uniquement la configuration des Feature Flags. Il ne configure ni n'active `feature_flag.evaluations`, la logisation de l'exposition ou les cas d'utilisation d'expérimentation. Ces fonctionnalités nécessitent un Datadog Agent pris en charge ou un chemin de télémétrie serverless.

## Nettoyage {#cleanup}

Lorsque votre application se ferme, arrêtez l'API OpenFeature pour libérer les ressources :

{{< code-block lang="python" >}}
api.shutdown()
{{< /code-block >}}

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le fournisseur Datadog réel, ou le remplacer par `InMemoryProvider` d'OpenFeature pour contrôler directement les valeurs des Feature Flags dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. `InMemoryProvider` est fourni avec `openfeature-sdk`, donc aucune dépendance supplémentaire n'est requise.

L'API OpenFeature est un singleton global (`openfeature.api.set_provider` modifie l'état au niveau du module). Utilisez une fixture pytest à portée `function` et appelez `api.shutdown()` lors du démontage afin que les tests ne fassent pas fuir l'état des Feature Flags les uns vers les autres.

{{< code-block lang="python" filename="test_flags.py" >}}
import pytest
from openfeature import api
from openfeature.evaluation_context import EvaluationContext
from openfeature.provider.in_memory_provider import InMemoryProvider, InMemoryFlag


@pytest.fixture
def client():
    flags = {
        "new-checkout-flow": InMemoryFlag(
            default_variant="off",
            variants={"on": True, "off": False},
        ),
        "ui-theme": InMemoryFlag(
            default_variant="light",
            variants={"light": "light", "dark": "dark"},
        ),
    }
    api.set_provider(InMemoryProvider(flags))
    yield api.get_client()
    api.shutdown()


def test_boolean_flag_returns_default_variant(client):
    assert client.get_boolean_value("new-checkout-flow", True) is False


def test_string_flag_with_context(client):
    ctx = EvaluationContext(targeting_key="user-123")
    assert client.get_string_value("ui-theme", "dark", ctx) == "light"


def test_missing_flag_returns_default(client):
    assert client.get_boolean_value("does-not-exist", True) is True
{{< /code-block >}}

`InMemoryFlag` prend `default_variant` (un nom de variante sous forme de chaîne) et `variants` (un dictionnaire associant des noms de variantes à des valeurs typées). Passer une valeur en tant que `default_variant` au lieu d'un nom de variante est une erreur courante. Pour la logique de ciblage, passez un rappel `context_evaluator` qui reçoit le Feature Flag et un `EvaluationContext` et renvoie un objet `FlagResolutionDetails` contenant la variante choisie.

## Dépannage {#troubleshooting}

### La configuration Agentless ne fonctionne pas {#agentless-configuration-not-working}

Vérifiez les éléments suivants :

- `ddtrace` est en version 4.14.0 ou ultérieure.
- `DD_FEATURE_FLAGS_ENABLED` est non défini ou défini sur `true`.
- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` est non défini ou défini sur `agentless`.
- `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` est non défini. Le définir sur `true` sélectionne Agent Remote Configuration pendant la fenêtre de migration lorsqu'aucune source explicite n'est définie.
- Le code de l'application enregistre `DataDogProvider` auprès de l'API OpenFeature.
- `DD_API_KEY`, `DD_SITE` et `DD_ENV` sont configurés dans le processus de l'application.
- L'application peut effectuer des requêtes HTTPS sortantes vers Datadog.

Définissez `DD_TRACE_DEBUG=true` et vérifiez la présence de messages d'authentification, de délai d'attente ou de charge utile mal formée provenant de l'endpoint agentless des Feature Flags.

### L'Agent Remote Configuration ne fonctionne pas {#agent-remote-configuration-not-working}

Vérifiez les éléments suivants :

- `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` est défini. Pendant la fenêtre de migration, `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` sélectionne également la Remote Configuration lorsqu'aucune source explicite n'est définie.
- Datadog Agent est en version 7.55 ou ultérieure.
- [Remote Configuration][2] est activé sur l'Agent.
- L'Agent dispose d'une clé d'API valide pour l'organisation cible.
- `DD_SERVICE` et `DD_ENV` sont configurés dans le processus d'application.
- Le SDK peut communiquer avec l'Agent.

[1]: https://openfeature.dev/
[2]: /fr/agent/remote_config/
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /fr/feature_flags/concepts/flag_graphs/
[6]: /fr/feature_flags/concepts/configuration_sources/
[7]: /fr/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[8]: /fr/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[9]: /fr/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[10]: /fr/feature_flags/concepts/configuration_sources/#configure-agentless-delivery

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}