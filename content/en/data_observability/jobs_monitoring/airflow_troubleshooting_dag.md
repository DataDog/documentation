---
title: "Troubleshoot Airflow Setup with the OpenLineage Validation DAG"
description: "Use the OpenLineage validation DAG to diagnose configuration issues with Airflow Data Observability: Jobs Monitoring."
further_reading:
  - link: '/data_observability/jobs_monitoring/airflow/'
    tag: 'Documentation'
    text: 'Enable Data Observability: Jobs Monitoring for Apache Airflow'
  - link: '/data_jobs'
    tag: 'Documentation'
    text: 'Data Observability: Jobs Monitoring'
---

## Overview

The OpenLineage validation DAG validates your Airflow OpenLineage configuration and reports any issues that would prevent Data Observability: Jobs Monitoring from receiving events.

Run this DAG when:

- Airflow jobs do not appear in the [Data Observability: Jobs Monitoring][1] page after completing setup.
- You want to verify your configuration before running production workloads.

The DAG checks the following:

| Check | What it validates |
|---|---|
| Package installation | OpenLineage package is installed and importable |
| Package version | Installed version compared to the latest available on PyPI |
| Listener accessibility | OpenLineage plugin listener can be loaded by Airflow |
| Enabled state | OpenLineage is not disabled by environment variable or Airflow config |
| Transport configuration | A valid transport is configured (HTTP or Datadog) |
| Datadog endpoint | Transport URL points to a Datadog intake endpoint |
| Network connectivity | TCP connection to the configured backend URL succeeds |
| Configuration conflicts | No duplicate or conflicting transport or config file settings |

## Run the OpenLineage validation DAG

### Prerequisites

- Access to your Airflow DAGs directory (local path or cloud storage bucket for MWAA)
- Airflow scheduler and worker pods or processes must be running

### Step 1: Add the DAG file

Save the following code as `openlineage_preflight_check_dag.py` in your Airflow DAGs directory. For Amazon MWAA, upload the file to the S3 DAGs folder configured for your environment.

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
    "is_disabled": None,
    "config_path": None,
    "transport": None,
    "transport_type": None,
    "transport_config": None,
    "transport_url": None,
    "conflicts": [],
    "connectivity": None
}


def generate_validation_summary():
    """Generate a summary of all validation checks performed."""
    log.info("===== OpenLineage Validation Summary =====")

    if validation_results["installed_package"]:
        log.info("✓ OpenLineage Package: %s version %s",
                 validation_results["installed_package"],
                 validation_results["package_version"])
    else:
        log.error("✗ OpenLineage not installed properly")

    if validation_results["is_disabled"]:
        log.error("✗ OpenLineage is disabled")
    else:
        log.info("✓ OpenLineage is enabled")

    if validation_results["is_listener_accessible"]:
        log.info("✓ OpenLineage listener is accessible")
    else:
        log.error("✗ OpenLineage listener is not accessible")

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
            has_http_transport = False
            for name, nested_transports in config.get("transports", {}).items():
                if nested_transports.get("type", "") == "http":
                    has_http_transport = True
                    log.info("✓ Composite Transport with HTTP transport: `%s`", name)
            if not has_http_transport:
                log.error("✗ Composite Transport is set up without HTTP transport")
        else:
            log.error("✗ Unknown transport type: %s", transport_type)

        if validation_results.get("is_datadog"):
             log.info("✓ Integration: Datadog")
    else:
        log.error("✗ No transport configured")

    if validation_results["connectivity"]:
        log.info("✓ Network connectivity to backend is successful")
    else:
        log.error("✗ Network connectivity check failed")

    if validation_results["conflicts"]:
        log.warning("! Configuration conflicts detected:")
        for conflict in validation_results["conflicts"]:
            log.warning("  - %s", conflict)
    else:
        log.info("✓ No configuration conflicts detected")

    if validation_results["is_mwaa"]:
        log.info("ℹ Running on Amazon MWAA")

    if validation_results.get("is_astronomer"):
        log.info("ℹ Running on Astronomer")

    log.info("========================================")

    critical_error = (
        validation_results["is_disabled"] or
        not validation_results["is_listener_accessible"] or
        not validation_results["transport"]
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

    # Run platform checks
    check_mwaa_status()
    check_astronomer_status()

    log.info("===================================")


def validate_setup() -> None:
    """Run all validation checks for OpenLineage configuration."""
    log.info("Starting OpenLineage validation...")

    # Print environment info
    print_environment_info()

    # Check package installation
    if _provider_can_be_used():
        validate_installation("apache-airflow-providers-openlineage")
    else:
        validate_installation("openlineage-airflow")

    # Check listener and validation
    is_listener_accessible()
    is_ol_disabled()

    # Check for configuration conflicts
    check_configuration_conflicts()

    # Check connection configuration
    validate_connection()

    # Check for Datadog
    check_is_datadog()

    # Check network connectivity (using transport URL from previous steps)
    check_network_connectivity()

    # Generate validation summary
    generate_validation_summary()


try:
    dag = DAG(
        dag_id="openlineage_preflight_check_dag",
        description="A DAG to check OpenLineage setup and configurations",
        start_date=datetime.datetime(2025, 1, 1),
        schedule_interval="@once",
    )
except Exception as e:
    dag = DAG(
        dag_id="openlineage_preflight_check_dag",
        description="A DAG to check OpenLineage setup and configurations",
        start_date=datetime.datetime(2025, 1, 1),
        schedule="@once",
    )

validate_setup = PythonOperator(
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

        # Store in global results
        validation_results["installed_package"] = package_name
        validation_results["package_version"] = str(package_version)

    except Exception as e:
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
            'AIRFLOW_VERSION': os.getenv('AIRFLOW_VERSION')
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
        except ImportError as e:
            log.error("OpenLineage provider is not accessible: can't import airflow.providers.openlineage.plugins.openlineage.OpenLineageProviderPlugin")
            log.error("Please check if the provider is properly configured.")
            log.error("The installation docs can be found at https://docs.datadoghq.com/data_jobs/airflow/")
            validation_results["is_listener_accessible"] = False
            return False
    else:
        try:
            from openlineage.airflow.plugin import OpenLineagePlugin as plugin
        except ImportError as e:
            log.error("OpenLineage is not accessible: can't import openlineage.airflow.plugin.OpenLineagePlugin")
            log.error("Please check if the provider is properly configured.")
            log.error("The installation docs can be found at https://docs.datadoghq.com/data_jobs/airflow/")
            validation_results["is_listener_accessible"] = False
            return False

    if len(plugin.listeners) == 1:
        validation_results["is_listener_accessible"] = True
        return True

    log.error("OpenLineage is not accessible: multiple listeners found. %s", plugin.listeners)
    validation_results["is_listener_accessible"] = False
    return False


def is_ol_disabled():
    if _provider_can_be_used():
        try:
            # apache-airflow-providers-openlineage >= 1.7.0
            from airflow.providers.openlineage.conf import is_disabled
        except ImportError:
            # apache-airflow-providers-openlineage < 1.7.0
            from airflow.providers.openlineage.plugins.openlineage import _is_disabled as is_disabled
    else:
        from openlineage.airflow.plugin import _is_disabled as is_disabled

    is_disabled_result = is_disabled()
    validation_results["is_disabled"] = is_disabled_result

    if is_disabled_result:
        if _provider_can_be_used() and os.getenv("AIRFLOW__OPENLINEAGE__DISABLED", "false").lower() == "true":
            log.error("OpenLineage is disabled in Airflow Config by environment variable AIRFLOW__OPENLINEAGE__DISABLED")
            return True
        elif conf.getboolean("openlineage", "disabled", fallback=False):
            log.error("OpenLineage is disabled in Airflow Config: openlineage.disabled")
            return True
        elif os.getenv("OPENLINEAGE_DISABLED", "false").lower() == "true":
            log.error(
                "OpenLineage is disabled due to the environment variable OPENLINEAGE_DISABLED"
            )
            return True
        log.error(
            "OpenLineage is disabled because required config/env variables are not set. "
            "Please refer to "
            "https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/guides/user.html"
        )
        return True
    return False


def validate_connection() -> bool:
    """Validate the OpenLineage connection configuration."""
    _validate_config_set()

    config_files = [
        "openlineage.yml",
        "~/.openlineage/openlineage.yml"
    ]

    for file_path in config_files:
        if _check_openlineage_yml(file_path):
            break

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
            validation_results["transport_url"] = config.get("url")
        elif transport.kind == "composite":
            transport_valid = False
            for key, value in config.get("transports", {}).items():
                log.info("Checking nested transport `%s`", key)
                transport_valid = _verify_transport(value)
                if value.get("type") == "http":
                    validation_results["transport_url"] = value.get("url")
                    break
            return transport_valid

        _verify_transport_source()
        return True


    except Exception as e:
        log.error("There was an error when trying to validate connection: %s", e)
        log.exception("Full traceback:")
        return False


def _validate_config_set():
    if config_path := os.getenv("OPENLINEAGE_CONFIG"):
        log.info("Found OpenLineage config path: env variable OPENLINEAGE_CONFIG is set to: %s", config_path)
        validation_results["config_path"] = config_path
    elif config_path := os.getenv("AIRFLOW__OPENLINEAGE__CONFIG", "") and _provider_can_be_used():
        log.info("Found OpenLineage config path: env variable AIRFLOW__OPENLINEAGE__CONFIG is set to: %s", config_path)
        validation_results["config_path"] = config_path
    elif config_path := conf.get("openlineage", "config_path", fallback="") and _provider_can_be_used():
        log.info("Found OpenLineage config path: Airflow config openlineage.config_path is set to: %s", config_path)
        validation_results["config_path"] = config_path


    if config_path:
        if not _check_openlineage_yml(config_path):
            log.error(
                "Config file is empty or does not exist: `%s`",
                config_path,
            )
            return False
        log.info("OpenLineage config file `%s` is valid.", config_path)
        return True

    log.info("OpenLineage config file is not set.")
    return True


def check_is_datadog():
    """Check if the transport is configured for Datadog."""
    # We rely on validate_connection being run first
    transport_type = validation_results.get("transport_type")
    transport_url = validation_results.get("transport_url", "")

    is_datadog = False

    if transport_type == "datadog":
        is_datadog = True
    elif transport_type == "http" and transport_url:
        # Check for known Datadog domains
        datadog_domains = [
            "datadoghq.com",
            "datadoghq.eu",
            "datad0g.com",
            "datad0g.eu",
            "us3.datadoghq.com",
            "us5.datadoghq.com",
            "ap1.datadoghq.com"
        ]
        if any(domain in transport_url for domain in datadog_domains):
            is_datadog = True
            log.info("Transport type is HTTP but URL points to Datadog. Considered as Datadog transport.")

    validation_results["is_datadog"] = is_datadog
    return is_datadog


def _redact_api_keys(obj) -> None:
    """Recursively search and redact API keys in a dictionary.

    This function modifies the dictionary in place, redacting any values where
    the key contains 'api_key' (case insensitive).
    """
    if isinstance(obj, dict):
        for key, value in obj.items():
            if isinstance(key, str) and ("api_key" in key.lower() or "auth" in key.lower()):
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
        log.info("Final URL that is configured by env variables is set to: `%s`", url)

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
            log.info("AIRFLOW__OPENLINEAGE__TRANSPORT variable is not set.")

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
            transport = (
                OpenLineagePlugin.listeners[0].adapter.get_or_create_openlineage_client().transport
            )
    except Exception as e:
        log.error("There was an error when trying to get OpenLineage Transport: %s", e)
        return None
    return transport


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

        log.info("Found composite transport %s with %d nested transports", name, len(transports))
        valid_transports = 0

        for i, transport_config in enumerate(transports):
            log.info("Checking nested transport #%d...", i+1)
            if _verify_transport(transport_config):
                valid_transports += 1

        if valid_transports == 0:
            log.error("No valid transports found in composite transport %s", name)
            return False

        log.info("Found %d valid nested transport(s) in composite transport %s", valid_transports, name)
        return True

    elif transport_type == "http":
        return _verify_http_backend(config, name)

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

    log.info("HTTP transport %s auth: %s", name, config.get("auth"))
    if config.get("auth") is not None:
        log.info("HTTP transport %s has API key authentication configured", name)
    else:
        log.warning("No authentication method found in HTTP transport %s configuration", name)

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
        'AIRFLOW_ENV_NAME'
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

### Step 2: Trigger the DAG

After the Airflow scheduler picks up the new file, trigger the DAG manually:

1. In the Airflow UI, navigate to **DAGs** and find `openlineage_preflight_check_dag`.
2. Toggle the DAG on if it is paused.
3. Click the **Trigger DAG** button (play icon).

### Step 3: View the logs

1. In the Airflow UI, navigate to **DAGs > openlineage_preflight_check_dag**.
2. Click the most recent DAG run.
3. Click the **validate_setup** task.
4. Select the **Logs** tab.

## Read the output

The DAG logs two sections: an environment summary printed at the start, and a validation summary printed at the end.

### Environment information

The first section shows what the DAG detected about your environment:

```
===== Environment Information =====
Airflow Version: 2.9.2
OpenLineage Python Version: 1.24.2
OpenLineage Provider Version: 1.14.0 (apache-airflow-providers-openlineage)
This Airflow installation is running on Amazon MWAA
===================================
```

### Validation summary

The validation summary appears at the end of the task log. Each line starts with `✓`, `✗`, or `!`:

- `✓` — check passed
- `✗` — check failed (events are not sent to Datadog)
- `!` — warning (may indicate a configuration issue)

A healthy setup looks like this:

```
===== OpenLineage Validation Summary =====
✓ OpenLineage Package: apache-airflow-providers-openlineage version 2.7.3
✓ OpenLineage is enabled
✓ OpenLineage listener is accessible
✓ Transport Type: Datadog
✓ Integration: Datadog
✓ Network connectivity to backend is successful
✓ No configuration conflicts detected
========================================
OpenLineage appears to be configured properly, but check the logs for warnings
```

### Interpreting failures

Use this table to resolve common failures:

| Log message | Cause | Resolution |
|---|---|---|
| `✗ OpenLineage not installed properly` | The OpenLineage package is missing or corrupted | Confirm `apache-airflow-providers-openlineage` is included in your Airflow installation. For Amazon MWAA, see [Upgrade OpenLineage provider on Amazon MWAA][3]. |
| `✗ OpenLineage is disabled` | `AIRFLOW__OPENLINEAGE__DISABLED=true` or `OPENLINEAGE_DISABLED=true` is set, or required transport configuration is missing | Remove or set the disable variable to `false`, and verify that the transport is configured properly |
| `✗ OpenLineage listener is not accessible` | The provider plugin cannot be imported | Confirm the package is installed on **both scheduler and worker** pods/processes |
| `✗ No transport configured` | No transport environment variables are set | Follow the [Airflow setup guide][2] to configure a transport |
| `✗ Transport Type: Console (won't send events to Datadog)` | Transport is set to `console` | Change the transport to `datadog` or `http` pointing to the Datadog intake URL |
| `✗ Network connectivity check failed` | Airflow workers cannot reach the Datadog intake endpoint | Check firewall or network policies; confirm the URL and port 443 are accessible |
| `! Configuration conflicts detected` | Multiple transport or config file sources are active | Remove duplicate configurations and keep one authoritative source |

**Note**: If `✗ OpenLineage listener is not accessible` appears together with package installation failures, the package is likely installed only on the scheduler and not on the workers. OpenLineage requires the provider on both.

### Version warnings

If the DAG reports a version warning such as:

```
`apache-airflow-providers-openlineage` is not the newest version.
Installed version: `1.8.0`, Latest version: `2.7.3`
```

Consider upgrading to the latest version to benefit from bug fixes and improved Datadog compatibility. For Amazon MWAA, see [Upgrade OpenLineage provider on Amazon MWAA][3] for version-specific instructions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/data-obs/jobs
[2]: /data_observability/jobs_monitoring/airflow/
[3]: /data_observability/jobs_monitoring/airflow_mwaa_upgrade/
