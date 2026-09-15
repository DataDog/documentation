---
description: 'Utilisez le DAG de validation OpenLineage pour diagnostiquer les problèmes
  de configuration avec Data Observability Airflow : Jobs Monitoring.'
further_reading:
- link: /data_observability/jobs_monitoring/airflow/
  tag: Documentation
  text: 'Activez Data Observability: Jobs Monitoring pour Apache Airflow'
- link: /data_jobs
  tag: Documentation
  text: 'Data Observability : Jobs Monitoring'
title: Dépannez la configuration Airflow avec le DAG de validation OpenLineage
---
## Présentation {#overview}

Le DAG de validation OpenLineage valide votre configuration OpenLineage Airflow et signale tout problème qui empêcherait Data Observability: Jobs Monitoring de recevoir des événements.

Exécutez ce DAG lorsque :

- Les jobs Airflow n’apparaissent pas sur la page [Data Observability: Jobs Monitoring][1] après avoir terminé la configuration.
- Vous souhaitez vérifier votre configuration avant d'exécuter des charges de travail de production.

Le DAG vérifie les points suivants :

| Vérification | Ce qu'il valide |
|---|---|
| Installation du package | Le package OpenLineage est installé et importable |
| Version du package | Version installée comparée à la dernière version disponible sur PyPI |
| Accessibilité de l'écouteur | L'écouteur du plugin OpenLineage peut être chargé par Airflow |
| Fournisseur actif | Le fournisseur OpenLineage est actif et n'est pas explicitement désactivé |
| Configuration du transport | Un transport valide est configuré (HTTP ou Datadog) |
| Endpoint Datadog | L'URL de transport pointe vers un endpoint d'ingestion Datadog |
| Connectivité réseau | La connexion TCP à l'URL du backend configuré réussit |
| Conflits de configuration | Aucun paramètre de transport ou de fichier de configuration en double ou en conflit |

## Exécutez le DAG de validation OpenLineage {#run-the-openlineage-validation-dag}

### Prérequis {#prerequisites}

- Accès à votre répertoire de DAG Airflow (un chemin local ou un bucket de stockage cloud pour Amazon MWAA)
- Un ordonnanceur et des workers Airflow en cours d'exécution (pods ou processus)

### Ajoutez le fichier DAG {#add-the-dag-file}

Enregistrez le code suivant sous `openlineage_preflight_check_dag.py` dans votre répertoire de DAG Airflow. Pour Amazon MWAA, téléchargez le fichier dans le dossier S3 DAGs configuré pour votre environnement.

```python
from __future__ import annotations

import datetime
import logging
import os
import attr
import json
import socket
import urllib.parse
from urllib.parse import urljoin

from packaging.version import Version

from airflow import DAG
from airflow.configuration import conf
from airflow import __version__ as airflow_version

try:
    from airflow.providers.standard.operators.python import PythonOperator
except ImportError:
    from airflow.operators.python import PythonOperator


log = logging.getLogger(__name__)

validation_results = {
    "installed_package": None,
    "package_version": None,
    "is_mwaa": None,
    "is_astronomer": None,
    "is_datadog": None,
    "is_listener_accessible": None,
    "provider_active": None,
    "inactive_reason": None,  # "explicit" | "no_config" | None
    "config_path": None,
    "transport": None,
    "transport_type": None,
    "transport_config": None,
    "transport_url": None,
    "conflicts": [],
    "connectivity": None,
}


def generate_validation_summary():
    """Generate a summary of all validation checks performed."""
    log.info("===== OpenLineage Validation Summary =====")

    # --- Installation ---
    if validation_results["installed_package"]:
        log.info("✓ OpenLineage Package: %s version %s",
                 validation_results["installed_package"],
                 validation_results["package_version"])
    else:
        log.error("✗ OpenLineage not installed properly")
        log.error("  All subsequent checks were skipped.")
        log.info("========================================")
        log.error("Critical issues found. OpenLineage events will not be sent properly.")
        return False

    # --- Provider Status ---
    if validation_results["provider_active"] is True:
        log.info("✓ OpenLineage provider is active")
    elif validation_results["provider_active"] is False:
        if validation_results["inactive_reason"] == "explicit":
            log.error("✗ OpenLineage provider is turned off")
            log.error("  Check and remove whichever of these is set: "
                      "AIRFLOW__OPENLINEAGE__DISABLED, OPENLINEAGE_DISABLED, "
                      "or openlineage.disabled in airflow.cfg")
        else:
            log.error("✗ OpenLineage provider is not active (no transport configuration found)")

    # --- Configuration (always runs) ---
    if validation_results["conflicts"]:
        log.warning("! Configuration conflicts detected:")
        for conflict in validation_results["conflicts"]:
            log.warning("  - %s", conflict)
    else:
        log.info("✓ No configuration conflicts detected")

    # --- Live Transport, Connectivity, Listener ---
    # These only ran when the provider was active — group them and propagate N/A together.
    if validation_results["provider_active"] is False:
        log.warning("- Live transport:   N/A (provider not active — fix provider status first)")
        log.warning("- Network:          N/A (provider not active — fix provider status first)")
        log.warning("- Listener:         N/A (provider not active — fix provider status first)")
    else:
        if validation_results["transport"] and validation_results["transport_config"]:
            config = validation_results["transport_config"]
            transport_type = validation_results["transport_type"]

            if transport_type == "http":
                log.info("✓ Transport Type: HTTP")
            elif transport_type == "datadog":
                log.info("✓ Transport Type: Datadog")
            elif transport_type == "console":
                log.error("✗ Transport Type: Console (won't send events to Datadog)")
            elif transport_type == "composite":
                has_valid_transport = False
                nested = config.get("transports", {})
                if isinstance(nested, list):
                    nested = {str(i): t for i, t in enumerate(nested)}
                for name, nested_config in nested.items():
                    nested_type = nested_config.get("type", "")
                    if nested_type == "http":
                        has_valid_transport = True
                        log.info("✓ Composite Transport with HTTP transport: `%s`", name)
                    elif nested_type == "datadog":
                        has_valid_transport = True
                        log.info("✓ Composite Transport with Datadog transport: `%s`", name)
                if not has_valid_transport:
                    log.error("✗ Composite Transport has no HTTP or Datadog transport configured")
            else:
                log.error("✗ Unknown transport type: %s", transport_type)

            if validation_results.get("is_datadog"):
                log.info("✓ Integration: Datadog")
            else:
                log.warning("! Transport does not appear to point to a Datadog endpoint")
        else:
            log.error("✗ Failed to resolve active transport")

        if validation_results["connectivity"] is True:
            log.info("✓ Network connectivity to backend is successful")
        elif validation_results["connectivity"] is False:
            log.error("✗ Network connectivity check failed")

        if validation_results["is_listener_accessible"] is True:
            log.info("✓ OpenLineage listener is accessible")
        elif validation_results["is_listener_accessible"] is False:
            log.error("✗ OpenLineage listener is not accessible")

    # --- Platform Info ---
    if validation_results["is_mwaa"]:
        log.info("ℹ Running on Amazon MWAA")
    if validation_results.get("is_astronomer"):
        log.info("ℹ Running on Astronomer")

    log.info("========================================")

    critical_error = (
        validation_results["provider_active"] is False
        or validation_results["is_listener_accessible"] is False
        or (validation_results["provider_active"] and not validation_results["transport"])
        or validation_results["connectivity"] is False
        or validation_results["transport_type"] == "console"
    )

    if critical_error:
        log.error("Critical issues found. OpenLineage events will not be sent properly.")
    else:
        log.info("OpenLineage appears to be configured properly, but check the logs for warnings")

    return not critical_error


def print_environment_info():
    """Print initial environment information."""
    log.info("===== Environment Information =====")
    log.info(f"Airflow Version: {airflow_version}")

    ol_python_ver = _get_installed_package_version("openlineage-python")
    if ol_python_ver:
        log.info(f"OpenLineage Python Version: {ol_python_ver}")
    else:
        log.info("OpenLineage Python Version: Not Found")

    if _provider_can_be_used():
        provider = "apache-airflow-providers-openlineage"
    else:
        provider = "openlineage-airflow"

    provider_ver = _get_installed_package_version(provider)
    if provider_ver:
        log.info(f"OpenLineage Provider Version: {provider_ver} ({provider})")
    else:
        log.info(f"OpenLineage Provider Version: Not Found ({provider})")

    check_mwaa_status()
    check_astronomer_status()

    log.info("===================================")


def validate_setup() -> None:
    """Run all validation checks for OpenLineage configuration."""
    log.info("Starting OpenLineage validation...")

    # 1. Environment info
    print_environment_info()

    # 2. Installation check — prerequisite for everything else
    package_name = "apache-airflow-providers-openlineage" if _provider_can_be_used() else "openlineage-airflow"
    if not validate_installation(package_name):
        generate_validation_summary()
        return

    # 3. Disabled check
    check_provider_enabled()

    # 4. Static transport checks — env vars, config files, transport source logging.
    # No OL dependency, always run regardless of disabled state.
    check_configuration_conflicts()
    validate_transport_config()

    # 5+6. Live transport resolution, network connectivity, and listener check all require
    # the provider to be active. When inactive, the plugin registers no listeners, so all
    # three would fail for the same upstream reason — skip them as a group.
    if validation_results["provider_active"]:
        resolve_transport()
        check_network_connectivity()
        is_listener_accessible()
    else:
        log.warning("Skipping live transport resolution, network connectivity, and listener check: "
                    "provider is not active. Address the transport configuration first.")

    # 7. Summary
    generate_validation_summary()


try:
    dag = DAG(
        dag_id="openlineage_preflight_check_dag",
        description="A DAG to check OpenLineage setup and configurations",
        start_date=datetime.datetime(2025, 1, 1),
        schedule_interval="@once",
    )
except Exception:
    dag = DAG(
        dag_id="openlineage_preflight_check_dag",
        description="A DAG to check OpenLineage setup and configurations",
        start_date=datetime.datetime(2025, 1, 1),
        schedule="@once",
    )

# Named differently from validate_setup() to avoid overwriting the function reference
validate_setup_task = PythonOperator(
    task_id="validate_setup",
    python_callable=validate_setup,
    dag=dag,
)


def validate_installation(package_name: str) -> bool:
    try:
        package_version = _get_installed_package_version(package_name)
        if package_version is None:
            log.error(f"Failed to get installed version for `{package_name}`. Skipping version check.")
            return False

        validation_results["installed_package"] = package_name
        validation_results["package_version"] = str(package_version)

    except Exception:
        log.exception(f"Failed to get installed version for `{package_name}`.")
        return False

    log.info("Detected OpenLineage package: `%s` version `%s`", package_name, package_version)

    latest_version = _get_latest_package_version(package_name)
    if latest_version is None:
        log.warning(f"Failed to fetch the latest version for `{package_name}`. Skipping version check.")
        return True  # Not a critical failure

    if package_version < latest_version:
        log.warning(
            f"`{package_name}` is not the newest version. "
            f"Installed version: `{package_version}`, "
            f"Latest version: `{latest_version}`"
        )
        if _is_mwaa_environment():
            log.warning("In MWAA environment, this might be okay, as MWAA strongly enforces constraints on the versions of packages.")
            return True

    return True


def check_mwaa_status():
    """Check and report if running on MWAA."""
    is_mwaa = _is_mwaa_environment()
    validation_results["is_mwaa"] = is_mwaa

    if is_mwaa:
        log.info("This Airflow installation is running on Amazon MWAA")
        mwaa_env = {
            'MWAA_COMMAND': os.getenv('MWAA_COMMAND'),
            'AIRFLOW_ENV_NAME': os.getenv('AIRFLOW_ENV_NAME'),
            'AWS_REGION': os.getenv('AWS_REGION'),
            'AIRFLOW_VERSION': os.getenv('AIRFLOW_VERSION'),
        }
        log.info(f"MWAA Environment Details: {mwaa_env}")
    else:
        log.info("This Airflow installation is not running on Amazon MWAA")
    return is_mwaa


def check_astronomer_status():
    """Check and report if running on Astronomer."""
    is_astro = _is_astronomer_environment()
    validation_results["is_astronomer"] = is_astro

    if is_astro:
        log.info("This Airflow installation is running on Astronomer")
        astro_env = {
            'ASTRONOMER_RUNTIME_VERSION': os.getenv('ASTRONOMER_RUNTIME_VERSION'),
            'ASTRONOMER_DEPLOYMENT_ID': os.getenv('ASTRONOMER_DEPLOYMENT_ID'),
            'ASTRONOMER_WORKSPACE_ID': os.getenv('ASTRONOMER_WORKSPACE_ID'),
        }
        log.info(f"Astronomer Environment Details: {astro_env}")
    else:
        log.info("This Airflow installation is not running on Astronomer")
    return is_astro


def is_listener_accessible():
    plugin = None
    if _provider_can_be_used():
        try:
            from airflow.providers.openlineage.plugins.openlineage import OpenLineageProviderPlugin as plugin
        except ImportError:
            log.error("OpenLineage provider is not accessible: can't import airflow.providers.openlineage.plugins.openlineage.OpenLineageProviderPlugin")
            log.error("Please check if the provider is properly configured.")
            log.error("The installation docs can be found at https://docs.datadoghq.com/data_jobs/airflow/")
            validation_results["is_listener_accessible"] = False
            return False
    else:
        try:
            from openlineage.airflow.plugin import OpenLineagePlugin as plugin
        except ImportError:
            log.error("OpenLineage is not accessible: can't import openlineage.airflow.plugin.OpenLineagePlugin")
            log.error("Please check if the provider is properly configured.")
            log.error("The installation docs can be found at https://docs.datadoghq.com/data_jobs/airflow/")
            validation_results["is_listener_accessible"] = False
            return False

    num_listeners = len(plugin.listeners)
    if num_listeners == 0:
        log.error("OpenLineage listener is not registered. The plugin loaded but no listeners are active.")
        validation_results["is_listener_accessible"] = False
        return False
    elif num_listeners > 1:
        log.error("OpenLineage has unexpected multiple listeners registered: %s", plugin.listeners)
        validation_results["is_listener_accessible"] = False
        return False

    validation_results["is_listener_accessible"] = True
    return True


def check_provider_enabled():
    if _provider_can_be_used():
        try:
            from airflow.providers.openlineage.conf import is_disabled
        except ImportError:
            from airflow.providers.openlineage.plugins.openlineage import _is_disabled as is_disabled
    else:
        from openlineage.airflow.plugin import _is_disabled as is_disabled

    is_inactive = is_disabled()
    validation_results["provider_active"] = not is_inactive

    if not is_inactive:
        return

    # Determine whether it was explicitly turned off or just has no transport config
    if _provider_can_be_used() and os.getenv("AIRFLOW__OPENLINEAGE__DISABLED", "false").lower() == "true":
        log.error("OpenLineage provider is turned off via AIRFLOW__OPENLINEAGE__DISABLED")
        validation_results["inactive_reason"] = "explicit"
        return
    if conf.getboolean("openlineage", "disabled", fallback=False):
        log.error("OpenLineage provider is turned off via openlineage.disabled in airflow.cfg")
        validation_results["inactive_reason"] = "explicit"
        return
    if os.getenv("OPENLINEAGE_DISABLED", "false").lower() == "true":
        log.error("OpenLineage provider is turned off via OPENLINEAGE_DISABLED")
        validation_results["inactive_reason"] = "explicit"
        return

    # No explicit flag — provider is inactive because no transport config was found
    log.error(
        "OpenLineage provider is not active: no transport configuration was found. "
        "See https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html"
    )
    validation_results["inactive_reason"] = "no_config"


def validate_transport_config() -> None:
    """Check static transport configuration — env vars, config files, transport source logging.

    No OL package dependency; safe to run regardless of disabled state.
    """
    _validate_config_set()

    for file_path in ["openlineage.yml", "~/.openlineage/openlineage.yml"]:
        if _check_openlineage_yml(file_path):
            break

    _verify_transport_source()


def resolve_transport() -> bool:
    """Instantiate the OL plugin to get the active transport object and validate it.

    Requires OL to be enabled — listeners list is empty when disabled, so this will
    always fail if called in that state. Gate this call in validate_setup().
    """
    try:
        transport = _get_configured_transport()
        if transport is None:
            log.error("Failed to get configured transport")
            return False

        config = attr.asdict(transport.config)
        _redact_api_keys(config)

        validation_results["transport"] = transport
        validation_results["transport_type"] = transport.kind
        validation_results["transport_config"] = config

        if transport.kind == "http":
            url = config.get("url")
            validation_results["transport_url"] = url
            validation_results["is_datadog"] = _is_datadog_url(url) if url else False
            if url and not validation_results["is_datadog"]:
                log.warning("HTTP transport URL does not point to a known Datadog endpoint: %s", url)
        elif transport.kind == "datadog":
            validation_results["is_datadog"] = True
            # DatadogTransport wraps an HttpTransport whose config.url is the
            # resolved intake endpoint (from SITE_MAPPING or a custom site URL).
            # Extract it so the connectivity check has a real host to test.
            intake_url = _get_datadog_intake_url(transport)
            if intake_url:
                validation_results["transport_url"] = intake_url
            else:
                log.warning("Could not resolve Datadog intake URL from transport; "
                            "connectivity check will be skipped.")
            return _verify_datadog_backend(transport)
        elif transport.kind == "composite":
            transport_valid = False
            nested = config.get("transports", {})
            if isinstance(nested, list):
                nested = {str(i): t for i, t in enumerate(nested)}
            live_transports = transport.transports
            for i, (key, value) in enumerate(nested.items()):
                log.info("Checking nested transport `%s`", key)
                if value.get("type") == "http":
                    transport_valid = _verify_transport(value)
                    url = value.get("url")
                    validation_results["transport_url"] = url
                    validation_results["is_datadog"] = _is_datadog_url(url) if url else False
                elif value.get("type") == "datadog":
                    validation_results["is_datadog"] = True
                    # Validate against the live transport object, not the
                    # serialized/redacted config dict — the API key may have
                    # been resolved from DD_API_KEY and won't appear in the
                    # dict, or it will be redacted.
                    live = live_transports[i] if i < len(live_transports) else None
                    if live and live.kind == "datadog":
                        transport_valid = _verify_datadog_backend(live)
                    else:
                        transport_valid = _verify_transport(value)
            # Extract the intake URL from the first live datadog sub-transport
            # so the connectivity check has a real host to test. The serialized
            # config has no URL (DatadogTransport resolves it internally), so we
            # must read it from the live Transport object.
            if validation_results.get("is_datadog") and not validation_results.get("transport_url"):
                for nested_transport in transport.transports:
                    if nested_transport.kind == "datadog":
                        intake_url = _get_datadog_intake_url(nested_transport)
                        if intake_url:
                            validation_results["transport_url"] = intake_url
                            break
            return transport_valid

        return True

    except Exception as e:
        log.error("There was an error when trying to resolve transport: %s", e)
        log.exception("Full traceback:")
        return False


def _validate_config_set():
    config_path = None

    if env_path := os.getenv("OPENLINEAGE_CONFIG"):
        log.info("Found OpenLineage config path: env variable OPENLINEAGE_CONFIG is set to: %s", env_path)
        config_path = env_path
    elif _provider_can_be_used() and (env_path := os.getenv("AIRFLOW__OPENLINEAGE__CONFIG")):
        log.info("Found OpenLineage config path: env variable AIRFLOW__OPENLINEAGE__CONFIG is set to: %s", env_path)
        config_path = env_path
    elif _provider_can_be_used() and (cfg_path := conf.get("openlineage", "config_path", fallback="")):
        log.info("Found OpenLineage config path: Airflow config openlineage.config_path is set to: %s", cfg_path)
        config_path = cfg_path

    if config_path:
        validation_results["config_path"] = config_path
        if not _check_openlineage_yml(config_path):
            log.error("Config file is empty or does not exist: `%s`", config_path)
            return False
        log.info("OpenLineage config file `%s` is valid.", config_path)
        return True

    log.info("OpenLineage config file is not set.")
    return True


def _is_datadog_url(url: str) -> bool:
    """Check if a URL points to a known Datadog domain."""
    datadog_domains = [
        "datadoghq.com",
        "datadoghq.eu",
        "us3.datadoghq.com",
        "us5.datadoghq.com",
        "ap1.datadoghq.com",
        "ap2.datadoghq.com",
        "uk1.datadoghq.com",
    ]
    return any(domain in url for domain in datadog_domains)


def _redact_api_keys(obj) -> None:
    """Recursively redact API keys and auth values in a dictionary (in-place)."""
    if isinstance(obj, dict):
        for key, value in obj.items():
            if isinstance(key, str) and ("api_key" in key.lower() or "apikey" in key.lower() or "auth" in key.lower()):
                obj[key] = "[value redacted]"
            else:
                _redact_api_keys(value)
    elif isinstance(obj, list):
        for item in obj:
            _redact_api_keys(item)


def _verify_transport_source() -> None:
    if url := os.getenv("OPENLINEAGE_URL"):
        log.info("OPENLINEAGE_URL is set to: `%s`", url)
        if endpoint := os.getenv("OPENLINEAGE_ENDPOINT"):
            url = urljoin(url, endpoint)
            log.info("OPENLINEAGE_ENDPOINT is set to: `%s`", url)
        log.info("Final URL configured by env variables: `%s`", url)

        if os.getenv("OPENLINEAGE_API_KEY"):
            log.info("OPENLINEAGE_API_KEY is set [value redacted]")
        else:
            log.info("OPENLINEAGE_API_KEY is not set.")

    if config := os.getenv("OPENLINEAGE__TRANSPORT"):
        try:
            transport_config = json.loads(config)
            _redact_api_keys(transport_config)
            log.info("OPENLINEAGE__TRANSPORT is set to: `%s`", json.dumps(transport_config))
        except json.JSONDecodeError:
            log.error("OPENLINEAGE__TRANSPORT is set but contains invalid JSON: `%s`", config)
    else:
        log.info("OPENLINEAGE__TRANSPORT is not set.")

    for key, value in os.environ.items():
        if key.startswith("OPENLINEAGE__TRANSPORT_"):
            if "API_KEY" in key or key.endswith("AUTH"):
                log.info("`%s` is set [value redacted]", key)
            else:
                log.info("`%s` is set to: `%s`", key, value)

    if _provider_can_be_used():
        transport_var = os.getenv("AIRFLOW__OPENLINEAGE__TRANSPORT", "")
        if transport_var:
            try:
                transport_config = json.loads(transport_var)
                _redact_api_keys(transport_config)
                log.info("AIRFLOW__OPENLINEAGE__TRANSPORT is set to: `%s`", json.dumps(transport_config))
            except json.JSONDecodeError:
                log.error("AIRFLOW__OPENLINEAGE__TRANSPORT is set but contains invalid JSON: `%s`", transport_var)
        else:
            log.info("AIRFLOW__OPENLINEAGE__TRANSPORT is not set.")

        for key, value in os.environ.items():
            if key.startswith("AIRFLOW__OPENLINEAGE__TRANSPORT_"):
                if "API_KEY" in key or key.endswith("AUTH"):
                    log.info("`%s` is set [value redacted]", key)
                else:
                    log.info("`%s` is set to: `%s`", key, value)

        transport = conf.get("openlineage", "transport", fallback="")
        if transport:
            transport_config = json.loads(transport)
            _redact_api_keys(transport_config)
            log.info("Airflow config openlineage.transport is set to: `%s`", json.dumps(transport_config))
        else:
            log.info("Airflow config openlineage.transport is not set.")

        conn_id = os.getenv("AIRFLOW__OPENLINEAGE__CONN_ID") or conf.get("openlineage", "conn_id", fallback="")
        if conn_id:
            log.info("OpenLineage Airflow connection configured: conn_id=`%s`", conn_id)
            _check_connection_transport(conn_id)
        else:
            log.info("No OpenLineage Airflow connection configured (AIRFLOW__OPENLINEAGE__CONN_ID / openlineage.conn_id).")

def _get_datadog_intake_url(transport) -> str | None:
    """Extract the resolved intake URL from a DatadogTransport.

    DatadogTransport wraps an HttpTransport (``transport.http``) whose
    ``config.url`` is the resolved Datadog intake endpoint — either from
    SITE_MAPPING based on ``config.site`` or a custom URL provided directly.
    """
    try:
        return transport.http.config.url
    except Exception:
        return None


def _check_openlineage_yml(file_path) -> bool:
    log.info("Checking OpenLineage config file: `%s`", file_path)
    file_path = os.path.expanduser(file_path)
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            content = file.read()
        if not content:
            log.error(f"Empty openlineage.yml file: `{file_path}`")
            return False
        log.info(
            f"File found at `{file_path}` with the following content: `{content}`. "
            "Make sure the configuration is correct."
        )
        return True
    return False


def _get_configured_transport():
    try:
        if _provider_can_be_used():
            from airflow.providers.openlineage.plugins.openlineage import OpenLineageProviderPlugin
            transport = OpenLineageProviderPlugin().listeners[0].adapter.get_or_create_openlineage_client().transport
        else:
            from openlineage.airflow.plugin import OpenLineagePlugin
            transport = OpenLineagePlugin.listeners[0].adapter.get_or_create_openlineage_client().transport
    except Exception as e:
        log.error("There was an error when trying to get OpenLineage Transport: %s", e)
        return None
    return transport


def _check_connection_transport(conn_id: str) -> str | None:
    """Validate an OpenLineage Airflow connection and return its URL if resolvable."""
    try:
        from airflow.hooks.base import BaseHook
        conn = BaseHook.get_connection(conn_id)

        schema = conn.schema or "https"
        host = conn.host
        if not host:
            log.error("Connection `%s` has no host configured", conn_id)
            return None

        url = f"{schema}://{host}"
        if conn.port:
            url += f":{conn.port}"

        log.info("Connection `%s` URL: %s", conn_id, url)

        if conn.password:
            log.info("Connection `%s` has a password configured [value redacted]", conn_id)
        else:
            log.warning("Connection `%s` has no password configured", conn_id)

        if _is_datadog_url(url):
            log.info("Connection `%s` points to a Datadog endpoint", conn_id)
        else:
            log.warning("Connection `%s` does not appear to point to a Datadog endpoint", conn_id)

        return url
    except Exception as e:
        log.error("Failed to retrieve Airflow connection `%s`: %s", conn_id, e)
        return None


def _verify_transport(config: dict, name: str = ""):
    if not config:
        log.error("Empty transport configuration")
        return False

    transport_type = config.get("type")
    if not transport_type:
        log.error("Missing transport type in configuration `%s", config)
        return False

    if not name and hasattr(config, "name"):
        name = config.get("name")

    log.info("Checking transport %s type: %s", name, transport_type)

    if transport_type == "composite":
        transports = config.get("transports", [])
        if not transports:
            log.error("Composite transport %s configured but no nested transports defined", name)
            return False

        if isinstance(transports, dict):
            transports = list(transports.values())

        log.info("Found composite transport %s with %d nested transports", name, len(transports))
        valid_transports = 0

        for i, transport_config in enumerate(transports):
            log.info("Checking nested transport #%d...", i + 1)
            if _verify_transport(transport_config):
                valid_transports += 1

        if valid_transports == 0:
            log.error("No valid transports found in composite transport %s", name)
            return False

        log.info("Found %d valid nested transport(s) in composite transport %s", valid_transports, name)
        return True

    elif transport_type == "http":
        return _verify_http_backend(config, name)

    elif transport_type == "datadog":
        return _verify_datadog_backend(config, name)

    elif transport_type == "console":
        log.error("ConsoleTransport is configured. That won't send events to Datadog.")
        return False

    else:
        log.error("Unknown transport type: '%s'", transport_type)
        return False


def _verify_http_backend(config: dict, name: str = ""):
    """Verify HTTP transport configuration."""
    if "url" not in config:
        log.error("HTTP transport is missing URL configuration")
        return False
    log.info("HTTP transport URL is configured: %s", config.get("url"))

    if config.get("auth") is not None:
        log.info("HTTP transport %s has API key authentication configured", name)
    else:
        log.warning("No authentication method found in HTTP transport %s configuration", name)

    return True

def _verify_datadog_backend(transport, name: str = ""):
    """Log the resolved Datadog transport configuration for human verification.

    DatadogConfig.from_dict raises if apiKey is missing or site is invalid, so
    transport existence already validates those. The remaining risk is a
    silently-defaulted site — if DD_SITE is unset and no site is in the config,
    it defaults to datadoghq.com without warning. Surface the resolved site so
    the user can confirm it matches their intent.

    Accepts a live DatadogTransport (reads transport.config) or a serialized
    config dict (fallback for recursive _verify_transport on nested composites).
    """
    if hasattr(transport, "config") and hasattr(transport.config, "site"):
        site = getattr(transport.config, "site", None)
    elif isinstance(transport, dict):
        site = transport.get("site")
    else:
        site = None

    label = name or "(unnamed)"
    if site:
        log.info("Datadog transport %s resolved site: %s", label, site)
    else:
        log.info("Datadog transport %s using default site (datadoghq.com)", label)

    return True


def _get_latest_package_version(package_name: str) -> Version | None:
    try:
        import requests
        response = requests.get(f"https://pypi.org/pypi/{package_name}/json")
        response.raise_for_status()
        version_string = response.json()["info"]["version"]
        return Version(version_string)
    except Exception as e:
        log.error(f"Failed to fetch latest version for `{package_name}` from PyPI: {e}")
        return None


def _get_installed_package_version(package_name) -> Version | None:
    try:
        from importlib.metadata import version
        return Version(version(package_name))
    except Exception as e:
        log.error(f"Failed to get installed version for `{package_name}`: {e}")
        log.error(f"Looks like OpenLineage is not properly installed. Please refer to the OL setup docs.")
        return None


def _provider_can_be_used() -> bool:
    parsed_version = Version(airflow_version)
    if parsed_version < Version("2.3"):
        log.error("OpenLineage is not supported in Airflow versions <2.3")
        return False
    elif parsed_version >= Version("2.8"):
        return True
    return False


def _is_mwaa_environment() -> bool:
    """Check if the current Airflow installation is running on MWAA."""
    mwaa_indicators = [
        'MWAA_COMMAND',
        'AIRFLOW_ENV_ID',
        'AWS_EXECUTION_ENV',
        'MWAA_AIRFLOW_COMPONENT',
        'AIRFLOW_ENV_NAME',
    ]
    return any(var in os.environ for var in mwaa_indicators)


def _is_astronomer_environment() -> bool:
    """Check if the current Airflow installation is running on Astronomer."""
    astro_indicators = [
        'ASTRONOMER_RUNTIME_VERSION',
        'ASTRONOMER_DEPLOYMENT_ID',
        'ASTRONOMER_WORKSPACE_ID',
    ]
    return any(var in os.environ for var in astro_indicators)


def check_network_connectivity():
    """Verify network connectivity to the OpenLineage backend."""
    url = validation_results["transport_url"]

    if not url:
        log.error("No OpenLineage backend URL found to test connectivity")
        validation_results["connectivity"] = False
        return False

    log.info("Testing connectivity to URL: %s", url)

    try:
        parsed_url = urllib.parse.urlparse(url)
        host = parsed_url.hostname
        if not host:
            log.error("Invalid URL format: %s", url)
            validation_results["connectivity"] = False
            return False

        port = parsed_url.port
        if not port:
            port = 443 if parsed_url.scheme == 'https' else 80

        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)

        log.info("Attempting to connect to %s:%s", host, port)
        result = sock.connect_ex((host, port))
        sock.close()

        if result == 0:
            log.info("Successfully connected to %s:%s", host, port)
            validation_results["connectivity"] = True
            return True
        else:
            log.error("Failed to connect to %s:%s (error code: %s)", host, port, result)
            validation_results["connectivity"] = False
            return False

    except Exception as e:
        log.error("Error while checking connectivity to %s: %s", url, str(e))
        validation_results["connectivity"] = False
        return False


def check_configuration_conflicts():
    """Check for conflicting OpenLineage configurations."""
    conflicts = []

    transport_sources = []

    if os.getenv("OPENLINEAGE__TRANSPORT"):
        transport_sources.append("OPENLINEAGE__TRANSPORT environment variable")

    if any(key.startswith("OPENLINEAGE__TRANSPORT_") for key in os.environ):
        transport_sources.append("OPENLINEAGE__TRANSPORT_ prefixed environment variables")

    if os.getenv("AIRFLOW__OPENLINEAGE__TRANSPORT"):
        transport_sources.append("AIRFLOW__OPENLINEAGE__TRANSPORT environment variable")
    elif conf.get("openlineage", "transport", fallback=""):
        transport_sources.append("openlineage.transport in airflow.cfg")

    if any(key.startswith("AIRFLOW__OPENLINEAGE__TRANSPORT_") for key in os.environ):
        transport_sources.append("AIRFLOW__OPENLINEAGE__TRANSPORT_ prefixed environment variables")

    if os.getenv("OPENLINEAGE_URL"):
        transport_sources.append("OPENLINEAGE_URL environment variable")

    if _provider_can_be_used():
        conn_id = os.getenv("AIRFLOW__OPENLINEAGE__CONN_ID") or conf.get("openlineage", "conn_id", fallback="")
        if conn_id:
            transport_sources.append(f"Airflow connection (conn_id={conn_id})")

    if len(transport_sources) > 1:
        conflict_msg = "Multiple transport configurations found: " + ", ".join(transport_sources)
        log.warning(conflict_msg)
        conflicts.append(conflict_msg)

    config_files = []

    config_path_env = os.getenv("OPENLINEAGE_CONFIG")
    if config_path_env and os.path.exists(os.path.expanduser(config_path_env)):
        config_files.append(f"OPENLINEAGE_CONFIG={config_path_env}")

    airflow_config_path = os.getenv("AIRFLOW__OPENLINEAGE__CONFIG")
    if airflow_config_path and os.path.exists(os.path.expanduser(airflow_config_path)):
        config_files.append(f"AIRFLOW__OPENLINEAGE__CONFIG={airflow_config_path}")

    if os.path.exists("openlineage.yml"):
        config_files.append("openlineage.yml in current directory")

    if os.path.exists(os.path.expanduser("~/.openlineage/openlineage.yml")):
        config_files.append("~/.openlineage/openlineage.yml")

    if len(config_files) > 1:
        conflict_msg = "Multiple config files found: " + ", ".join(config_files)
        log.warning(conflict_msg)
        conflicts.append(conflict_msg)

    if not os.getenv("OPENLINEAGE_NAMESPACE"):
        log.info("OPENLINEAGE_NAMESPACE is not set. Default namespace will be used.")

    validation_results["conflicts"] = conflicts
    return conflicts
```

### Déclenchez le DAG {#trigger-the-dag}

Une fois que le planificateur Airflow a récupéré le nouveau fichier, déclenchez le DAG manuellement :

1. Dans l'interface utilisateur d'Airflow, accédez à **DAGs** et recherchez `openlineage_preflight_check_dag`.
2. Activez le DAG s'il est en pause.
3. Cliquez sur **Trigger DAG** (icône de lecture).

### Consultez les journaux {#view-the-logs}

1. Dans l'interface utilisateur d'Airflow, accédez à **DAGs > openlineage_preflight_check_dag**.
2. Cliquez sur l'exécution de DAG la plus récente.
3. Cliquez sur la tâche **validate_setup**.
4. Sélectionnez l'onglet **Logs**.

## Comprendre la sortie {#understand-the-output}

Les logs du DAG comportent deux sections : un résumé de l'environnement imprimé au début, et un résumé de validation imprimé à la fin.

### Informations sur l'environnement {#environment-information}

La première section montre ce que le DAG a détecté concernant votre environnement :

```
===== Environment Information =====
Airflow Version: 2.9.2
OpenLineage Python Version: 1.24.2
OpenLineage Provider Version: 1.14.0 (apache-airflow-providers-openlineage)
This Airflow installation is running on Amazon MWAA
===================================
```

### Résumé de la validation {#validation-summary}

Le résumé de la validation apparaît à la fin du log de la tâche. Chaque ligne commence par l'un des symboles suivants :

- `✓` : Vérification réussie.
- `✗` : Vérification échouée (les événements ne sont pas envoyés à Datadog).
- `!` : Avertissement (peut indiquer un problème de configuration).
- `-` : Vérification ignorée (une vérification préalable a échoué).

La sortie suivante indique une configuration saine :

```
===== OpenLineage Validation Summary =====
✓ OpenLineage Package: apache-airflow-providers-openlineage version 2.7.3
✓ OpenLineage provider is active
✓ No configuration conflicts detected
✓ Transport Type: Datadog
✓ Integration: Datadog
✓ Network connectivity to backend is successful
✓ OpenLineage listener is accessible
========================================
OpenLineage appears to be configured properly, but check the logs for warnings
```

###  Interprétation des échecs {#interpreting-failures}

Utilisez ce tableau pour résoudre les échecs courants :

|  Message de log |  Cause |  Résolution |
|---|---|---|
| `✗ OpenLineage not installed properly` | Le package OpenLineage est manquant ou corrompu. Toutes les vérifications restantes sont ignorées. |  Confirmez que `apache-airflow-providers-openlineage` est inclus dans votre installation Airflow. Pour Amazon MWAA, consultez [Upgrade OpenLineage provider on Amazon MWAA][3]. |
| `✗ OpenLineage provider is turned off` | Le provider est explicitement désactivé par `AIRFLOW__OPENLINEAGE__DISABLED`, `OPENLINEAGE_DISABLED` ou `openlineage.disabled` dans `airflow.cfg`. |  Supprimez le paramètre ou réglez-le sur `false`. |
| `✗ OpenLineage provider is not active (no transport configuration found)` | Le provider se désactive lui-même lorsqu'aucune configuration de transport n'est présente, même si rien ne l'a explicitement désactivé. |  Suivez le [guide de configuration d'Airflow][2] pour configurer un transport. |
| `✗ Failed to resolve active transport` |  Le transport n'a pas pu être instancié à partir de la configuration résolue. |  Vérifiez que la configuration du transport est valide et bien formée. Consultez le log des tâches pour connaître l'erreur sous-jacente. |
| `✗ Transport Type: Console (won't send events to Datadog)` |  Le transport est défini sur `console`. | Modifiez le transport vers `datadog` ou `http` en pointant vers l'URL d'ingestion Datadog. |
| `! Transport does not appear to point to a Datadog endpoint` | L'URL de transport ne correspond pas à un domaine Datadog connu. | Vérifiez que l'URL pointe vers un endpoint d'ingestion Datadog. |
| `✗ Network connectivity check failed` | Les workers Airflow ne peuvent pas atteindre le endpoint d'ingestion Datadog. | Vérifiez les politiques de pare-feu ou de réseau ; confirmez que l'URL et le port 443 sont accessibles. |
| `✗ OpenLineage listener is not accessible` | Le plugin du provider ne peut pas être importé, aucun écouteur n'est enregistré ou plusieurs écouteurs sont trouvés. La cause spécifique est consignée plus tôt dans le log des tâches. | Confirmez que le package est installé sur **les pods ou processus du scheduler et du worker**. Si le plugin s'est chargé mais qu'aucun écouteur n'est actif, vérifiez la compatibilité de la version du provider. |
| `! Configuration conflicts detected` | Plusieurs sources de transport ou de fichiers de configuration sont actives. | Supprimez les configurations en double et conservez une seule source faisant autorité. |

**Remarque** : Si `✗ OpenLineage listener is not accessible` apparaît avec des échecs d'installation de package, le package est probablement installé uniquement sur le scheduler et non sur les workers. OpenLineage nécessite le provider sur les deux.

### Avertissements de version {#version-warnings}

Si le DAG signale un avertissement de version tel que :

```
`apache-airflow-providers-openlineage` is not the newest version.
Installed version: `1.8.0`, Latest version: `2.7.3`
```

Envisagez une mise à niveau vers la dernière version pour bénéficier des corrections de bugs et d'une meilleure compatibilité avec Datadog. Pour Amazon MWAA, consultez [Upgrade OpenLineage provider on Amazon MWAA][3] pour obtenir des instructions spécifiques à la version.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/data-obs/jobs
[2]: /fr/data_observability/jobs_monitoring/airflow/
[3]: /fr/data_observability/jobs_monitoring/airflow_mwaa_upgrade/