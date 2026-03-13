#!/usr/bin/env python3
"""
Single-pass script that fetches configuration keys from the Datadog registry
API, classifies them into categories, fuses categories into human-readable
groups, and writes the final config_category_descriptions_registry.json.

Combines the logic of extract_patterns_from_registry.py and
generate_category_descriptions.py — no intermediate JSON file needed.
"""

import json
import os
import urllib.request
from collections import defaultdict

API_URL = "https://dd-feature-parity.azurewebsites.net/configurations/"
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "data", "registry")
OUTPUT_FILE = os.path.join(DATA_DIR, "config_category_descriptions_registry.json")
CATEGORIES_FILE = os.path.join(DATA_DIR, "categories.json")

# ──────────────────────────────────────────────────────────────────────
# Category definitions: fuse fine-grained categories into 20 groups.
#
# Each entry:
#   "id"          – stable machine identifier
#   "title"       – short human-readable title
#   "description" – 1-2 sentence explanation of what these keys control
#   "pattern"     – glob/regex hint to match configuration keys
#   "sources"     – list of category IDs from config_patterns.json that
#                   are merged into this group
# ──────────────────────────────────────────────────────────────────────

CATEGORY_DEFS = [
    # ── 1. General Settings ──────────────────────────────────────────
    {
        "id": "general",
        "title": "General Settings",
        "description": "Top-level Datadog configuration: API and application keys, service identity (name, environment, version), Agent connection (host, port, socket), intake site, hostname, global tags, proxy settings, tracing toggle, Data Jobs, Lambda handler, and APM receiver tuning.",
        "pattern": "DD_(SERVICE|ENV|VERSION|TAGS|API_KEY|SITE|AGENT_HOST|AGENT_PORT|HOSTNAME|LOG_LEVEL|TRACING_ENABLED|APM_|APP_|APPLICATION_).*",
        "sources": ["general", "apm_settings", "app_config"],
    },
    # ── 2. Tracing Core ──────────────────────────────────────────────
    {
        "id": "trace_core",
        "title": "Tracing Core",
        "description": "Core distributed tracing engine: Agent connection (URL, port, timeout, socket), trace and span ID generation (128-bit), span lifecycle (limits, buffer sizes, flush intervals, partial flush, abandoned span timeout), scope management, peer service and service mapping, resource URI normalization, query string obfuscation, DB client configuration (split-by-host/instance, metadata fetching, DBM propagation), cloud payload tagging, span attribute schema, global tags, class/classloader exclusions, executor control, and tracer internal metrics.",
        "pattern": "DD_TRACE_.*",
        "sources": [
            "trace_core_behavior",
            "trace_partial_flush",
            "trace_misc",
            "trace_agent_connection",
            "trace_obfuscation",
            "trace_resource_naming",
            "trace_client_ip",
            "trace_tracer_metrics",
            "trace_span_tags",
            "span_config",
            "trace_db_config",
            "dbm",
            "trace_cloud_payload_tagging",
        ],
    },
    # ── 3. Trace Sampling ────────────────────────────────────────────
    {
        "id": "trace_sampling",
        "title": "Trace Sampling",
        "description": "Sampling rules and rates that determine which traces and spans are kept or dropped: global sample rate, per-service and per-operation sampling rules, rate limiting, span-level sampling rules, priority sampling, and sampling mechanism validation.",
        "pattern": "DD_TRACE_(SAMPLE_RATE|SAMPLING_|RATE_LIMIT).*|DD_SPAN_SAMPLING_.*",
        "sources": ["trace_sampling", "general_sampling"],
    },
    # ── 4. Trace Propagation & HTTP ──────────────────────────────────
    {
        "id": "trace_propagation",
        "title": "Trace Propagation",
        "description": "Distributed trace context propagation (Datadog, B3, W3C TraceContext styles), extraction and injection behavior, baggage handling, request and response header tagging, HTTP client and server configuration (error status codes, query string tagging, URL resource name mapping, split-by-domain), and SQL comment context injection for Database Monitoring.",
        "pattern": "DD_TRACE_(PROPAGATION_|BAGGAGE_|HTTP_|HEADER_|RESPONSE_HEADER_|REQUEST_HEADER_).*|DD_PROPAGATION_.*|DD_HTTP_.*",
        "sources": [
            "trace_propagation",
            "trace_baggage",
            "propagation_config",
            "trace_http_tagging",
            "trace_header_tags",
            "http_config",
        ],
    },
    # ── 5. Trace Integrations ────────────────────────────────────────
    {
        "id": "trace_integrations",
        "title": "Trace Integrations",
        "description": "Per-integration tracing configuration following the DD_TRACE_<INTEGRATION>_* pattern: enable/disable, analytics, service name, and peer service overrides for 800+ library integrations. Also includes JMXFetch settings, integration-specific options (JMS, Kafka, RabbitMQ, Redis, gRPC, Spark, Spring, etc.), and controls for disabling specific integrations or instrumentations.",
        "pattern": "DD_TRACE_<INTEGRATION>_(ENABLED|ANALYTICS_ENABLED|ANALYTICS_SAMPLE_RATE|SERVICE_NAME|PEER_SERVICE|PROPAGATION_ENABLED)|DD_JMXFETCH_.*|DD_TRACE_JMXFETCH_.*",
        "sources": [
            "__integrations__",
            "trace_jmxfetch_integrations",
            "jmxfetch",
            "trace_integration_misc",
            "general_integration_misc",
        ],
    },
    # ── 6. Trace Logging & Experimental ──────────────────────────────
    {
        "id": "trace_logging",
        "title": "Trace Logging & Experimental",
        "description": "Tracer log output settings (log file path, log level, startup logs, debug mode, log rotation) and experimental/preview features that may change across versions, including experimental exporter, JEE split-by-deployment, long-running span flush intervals, state tracking, and preview toggles for security, profiling, and test optimization.",
        "pattern": "DD_TRACE_(LOG_|STARTUP_LOG|DEBUG|BEAUTIFUL_LOGS|ENCODING_DEBUG|TRIAGE|EXPERIMENTAL_).*|DD_EXPERIMENTAL_.*",
        "sources": [
            "trace_logging",
            "trace_debug",
            "trace_experimental",
            "experimental",
            "general_logging",
        ],
    },
    # ── 7. Profiling ─────────────────────────────────────────────────
    {
        "id": "profiling",
        "title": "Continuous Profiling",
        "description": "Datadog Continuous Profiler: enable/disable, API key and upload configuration, profiling types (CPU, wall-clock, allocation, heap, GC, timeline, execution trace, wait), async-profiler and native ddprof engine options, code hotspots, endpoint profiling, context attributes, JFR settings, stack depth limits, backpressure sampling, and experimental profiling features.",
        "pattern": "DD_PROFILING_.*",
        "sources": [
            "profiling_general",
            "profiling_features",
            "profiling_async",
            "profiling_native",
            "profiling_upload",
            "profiling_experimental",
        ],
    },
    # ── 8. Application Security ──────────────────────────────────────
    {
        "id": "appsec",
        "title": "Application Security",
        "description": "Datadog Application Security: ASM (WAF rules, RASP, threat blocking, blocked response templates, request body parsing, IP header resolution, SCA), user event tracking, IAST code vulnerability detection (taint tracking, detection mode, redaction, security controls, weak cipher/hash detection), API Security (endpoint schema discovery, request/response sampling), CWS, and error tracking for handled exceptions.",
        "pattern": "DD_APPSEC_.*|DD_IAST_.*|DD_API_SECURITY_.*",
        "sources": [
            "appsec_general",
            "appsec_response_config",
            "appsec_user_tracking",
            "iast_general",
            "iast_redaction",
            "api_security",
        ],
    },
    # ── 9. Dynamic Instrumentation & Debugging ───────────────────────
    {
        "id": "debugging",
        "title": "Dynamic Instrumentation & Debugging",
        "description": "Remote debugging capabilities: Dynamic Instrumentation (live probes, capture timeouts, serialization depth, redaction rules, bytecode verification, source file tracking), Exception Replay (automatic variable capture on exceptions, callstack and intermediate span capture), and Symbol Database (class/method symbol uploads for source-level debugging).",
        "pattern": "DD_DYNAMIC_INSTRUMENTATION_.*|DD_EXCEPTION_(REPLAY_|DEBUGGING_).*|DD_SYMBOL_DATABASE_.*",
        "sources": [
            "dynamic_instrumentation",
            "exception_replay",
            "symbol_database",
        ],
    },
    # ── 10. CI Visibility ────────────────────────────────────────────
    {
        "id": "civisibility",
        "title": "CI Visibility",
        "description": "CI Visibility and Test Optimization: agentless test reporting, test session configuration, code coverage collection (line-level, report upload), git metadata (commit SHA, branch, author, repository URL), flaky test retry, early flake detection, known/impacted test analysis, test skipping, build instrumentation, CI provider integration, and test framework support (JUnit, TestNG, Playwright, Vitest, Scalatest).",
        "pattern": "DD_CIVISIBILITY_.*|DD_TEST_.*|DD_GIT_.*",
        "sources": [
            "civisibility_general",
            "civisibility_code_coverage",
            "civisibility_git",
            "civisibility_flaky_test",
            "test_optimization",
            "git_metadata",
        ],
    },
    # ── 11. Crash Tracking & Diagnostics ─────────────────────────────
    {
        "id": "crashtracking",
        "title": "Crash Tracking & Diagnostics",
        "description": "Crash Tracking for capturing and reporting JVM and native crashes: enable/disable, agentless mode, error intake, proxy settings, upload timeout, debug autoconfig, and heap snapshot configuration (count, destination, interval).",
        "pattern": "DD_CRASHTRACKING_.*|DD_HEAP_.*",
        "sources": ["crashtracking", "heap_config"],
    },
    # ── 12. Logs ─────────────────────────────────────────────────────
    {
        "id": "logs",
        "title": "Log Submission & Correlation",
        "description": "Direct log submission to Datadog (batch size, period, host, integrations, minimum level), agentless log forwarding, log injection for trace-log correlation, and OpenTelemetry log export settings.",
        "pattern": "DD_LOGS_.*|DD_AGENTLESS_LOG_.*",
        "sources": ["logs_submission", "agentless_logging"],
    },
    # ── 13. Runtime Metrics ──────────────────────────────────────────
    {
        "id": "runtime_metrics",
        "title": "Runtime Metrics",
        "description": "Runtime metrics collection (JVM, GC, event loop, thread metrics) and the DogStatsD connection used for metric submission: host, port, socket path, flush interval, and StatsD client tuning.",
        "pattern": "DD_RUNTIME_METRICS_.*|DD_DOGSTATSD_.*",
        "sources": ["runtime_metrics", "dogstatsd"],
    },
    # ── 14. Data Streams Monitoring ──────────────────────────────────
    {
        "id": "data_streams",
        "title": "Data Streams Monitoring",
        "description": "Data Streams Monitoring (DSM) for tracking end-to-end latency across message queues and streaming pipelines: enable/disable, bucket duration, legacy header support, and transaction extractors.",
        "pattern": "DD_DATA_STREAMS_.*",
        "sources": ["data_streams"],
    },
    # ── 15. Telemetry ────────────────────────────────────────────────
    {
        "id": "telemetry",
        "title": "Instrumentation Telemetry",
        "description": "Tracer self-reporting telemetry: enable/disable, agentless and agent-proxy modes, heartbeat and metrics intervals, dependency collection, log collection, debug options, and telemetry forwarder configuration.",
        "pattern": "DD_TELEMETRY_.*|DD_INSTRUMENTATION_TELEMETRY_.*",
        "sources": ["telemetry", "instrumentation_telemetry"],
    },
    # ── 16. Remote Configuration ─────────────────────────────────────
    {
        "id": "remote_config",
        "title": "Remote Configuration",
        "description": "Remote Configuration for receiving live configuration updates from Datadog: enable/disable, poll interval, integrity checks, payload size limits, TUF root verification, and boot timeout.",
        "pattern": "DD_REMOTE_.*|DD_RC_.*",
        "sources": ["remote_config", "remote_config_advanced"],
    },
    # ── 17. OpenTelemetry Compatibility ──────────────────────────────
    {
        "id": "otel",
        "title": "OpenTelemetry Compatibility",
        "description": "Standard OpenTelemetry environment variables supported by Datadog SDKs: SDK toggle, service name, resource attributes, propagators, trace sampler, OTLP exporter configuration (endpoint, headers, protocol for traces, logs, and metrics), batch span processor settings, HTTP instrumentation header capture, and Datadog-specific OTel metrics bridge.",
        "pattern": "OTEL_.*|DD_OTLP_.*|DD_METRICS_OTEL_.*",
        "sources": [
            "otel_general",
            "otel_otlp_general",
            "otel_otlp_logs",
            "otel_otlp_metrics",
            "otel_traces",
            "otel_batch_span_processor",
            "otel_instrumentation",
            "otlp_config",
            "metrics_config",
        ],
    },
    # ── 18. RUM ──────────────────────────────────────────────────────
    {
        "id": "rum",
        "title": "Real User Monitoring (RUM)",
        "description": "Backend RUM injection settings: application ID, client token, session and session replay sample rates, privacy level, resource and user interaction tracking, long task monitoring, and RUM service/environment/version identification.",
        "pattern": "DD_RUM_.*",
        "sources": ["rum"],
    },
    # ── 19. AI & LLM Observability ───────────────────────────────────
    {
        "id": "ai_observability",
        "title": "AI & LLM Observability",
        "description": "AI observability features: AI Guard content scanning (enable, endpoint, size limits), LLM Observability (LLMObs enable, ML app name), and per-provider integration settings for OpenAI, LangChain, and Vertex AI (span capture, prompt/completion sampling, content size limits).",
        "pattern": "DD_AI_GUARD_.*|DD_LLMOBS_.*|DD_OPENAI_.*",
        "sources": ["ai_guard", "llm_observability", "openai_integration"],
    },
    # ── 20. Instrumentation & Platform ───────────────────────────────
    {
        "id": "instrumentation",
        "title": "Instrumentation & Platform",
        "description": "Instrumentation setup and platform-specific configuration: auto-injection (enable, install metadata), .NET tracer home, third-party library detection, code origin for spans, module resolver settings, and platform adapters for Azure App Services, Datadog Service Extension sidecar, and HAProxy SPOA.",
        "pattern": "DD_INSTRUMENTATION_.*|DD_THIRD_PARTY_.*|DD_CODE_ORIGIN_.*|DD_INTEGRATION_.*|DD_RESOLVER_.*|DD_AAS_.*|DD_AZURE_.*|DD_SERVICE_EXTENSION_.*",
        "sources": [
            "instrumentation_general",
            "third_party",
            "code_origin",
            "integration_config",
            "resolver",
            "azure_app_services",
            "service_extension",
        ],
    },
]


# ══════════════════════════════════════════════════════════════════════
# Step 1 — Fetch entries from registry API
# ══════════════════════════════════════════════════════════════════════

def fetch_entries(url):
    """Fetch configuration entries from the registry API and normalise them
    into a flat dict: { key: { "key", "languages", "description", ... } }
    """
    print(f"Fetching {url} ...")
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())

    entries = {}
    for item in data:
        key = item["name"]
        if not key:
            continue

        languages = set()
        description = ""
        short_description = ""
        is_internal = item.get("internal", False)
        deprecated = False
        config_type = None

        for cfg in item.get("configurations", []):
            if not description and cfg.get("description"):
                description = cfg["description"]
            if not short_description and cfg.get("shortDescription"):
                short_description = cfg["shortDescription"]
            if cfg.get("deprecated"):
                deprecated = True
            if not config_type and cfg.get("type"):
                config_type = cfg["type"]
            for impl in cfg.get("implementations", []):
                lang = impl.get("language")
                if lang:
                    languages.add(lang)

        entries[key] = {
            "key": key,
            "languages": sorted(languages),
            "description": description,
            "shortDescription": short_description,
            "internal": is_internal,
            "deprecated": deprecated,
            "type": config_type,
        }

    print(f"  Fetched {len(entries)} unique keys")
    return entries


# ══════════════════════════════════════════════════════════════════════
# Step 2 — Classify integration keys
# ══════════════════════════════════════════════════════════════════════

def classify_integration_keys(entries):
    """
    Identify DD_TRACE_<integration>_* keys that follow the standard integration
    config pattern.  Returns (integration_keys set, integration_map dict,
    integration_names set).
    """
    integration_suffixes = [
        "_ENABLED",
        "_ANALYTICS_ENABLED",
        "_ANALYTICS_SAMPLE_RATE",
        "_SERVICE_NAME",
        "_SERVICE",
        "_PEER_SERVICE",
        "_PROPAGATION_ENABLED",
        "_CLIENT_ENABLED",
        "_CLIENT_ANALYTICS_ENABLED",
        "_CLIENT_ANALYTICS_SAMPLE_RATE",
        "_SERVER_ENABLED",
        "_SERVER_ANALYTICS_ENABLED",
        "_SERVER_ANALYTICS_SAMPLE_RATE",
    ]
    non_integration_names = {
        "128_BIT_TRACEID_GENERATION",
        "128_BIT_TRACEID_LOGGING",
        "PARTIAL_FLUSH",
        "PROPAGATION_EXTRACT_FIRST",
        "REPORT_HOSTNAME",
        "HEALTH_METRICS",
        "STARTUP_LOGS",
        "RUNTIME_CONTEXT_FIELD_INJECTION",
        "RESPONSE_HEADER_TAGS",
        "HEADER_TAGS",
        "RATE_LIMIT",
        "SAMPLE_RATE",
        "SAMPLING_MECHANISM_VALIDATION_DISABLED",
        "OTEL_ENABLED",
        "HTTP_CLIENT_TAG_QUERY_STRING",
        "HTTP_SERVER_TAG_QUERY_STRING",
        "METHODS",
        "FEATURES",
        "STATS_COMPUTATION",
        "LONG_RUNNING",
        "RESOLVER_SIMPLE",
    }

    # First pass: find integration names
    integration_names = set()
    extra_integration_keys = set()
    for k in entries:
        if k.startswith("DD_TRACE_"):
            for suffix in ("_ANALYTICS_SAMPLE_RATE", "_ANALYTICS_ENABLED", "_ENABLED"):
                if k.endswith(suffix):
                    mid = k[len("DD_TRACE_"):-len(suffix)]
                    if mid and mid not in non_integration_names:
                        integration_names.add(mid)
                    break
        elif k.startswith("DD_") and not k.startswith("DD_TRACE_"):
            for suffix in ("_ANALYTICS_SAMPLE_RATE", "_ANALYTICS_ENABLED"):
                if k.endswith(suffix):
                    extra_integration_keys.add(k)
                    break

    suffix_only_prefixes = {
        "HTTP", "AGENT", "PROPAGATION", "SAMPLING", "SAMPLE", "RATE",
        "EXPERIMENTAL", "DEBUG", "LOG", "STARTUP", "RESOURCE",
        "OBFUSCATION", "CLIENT", "CLOUD", "SPAN", "DB", "TRACER",
        "HEADER", "RESPONSE", "REQUEST", "BAGGAGE", "JMXFETCH",
        "PARTIAL", "GLOBAL", "TAGS",
    }

    # Second pass: collect keys per integration
    integration_keys = set()
    integration_map = defaultdict(list)
    for name in integration_names:
        prefix = f"DD_TRACE_{name}"
        first_seg = name.split("_")[0]
        match_by_prefix = first_seg not in suffix_only_prefixes

        for k in entries:
            matched = False
            if match_by_prefix and k.startswith(f"{prefix}_"):
                matched = True
            elif k == f"{prefix}_ENABLED" or k == prefix:
                matched = True
            else:
                for suffix in integration_suffixes:
                    if k == f"{prefix}{suffix}":
                        matched = True
                        break
            if matched:
                integration_keys.add(k)
                if k not in integration_map[name]:
                    integration_map[name].append(k)

    for k in extra_integration_keys:
        integration_keys.add(k)
        for suffix in ("_ANALYTICS_SAMPLE_RATE", "_ANALYTICS_ENABLED"):
            if k.endswith(suffix):
                name = k[len("DD_"):-len(suffix)]
                integration_map[name].append(k)
                break

    # De-duplicate: keep each key in the most specific (longest name) integration
    key_to_best_name = {}
    for name, keys in integration_map.items():
        for k in keys:
            if k not in key_to_best_name or len(name) > len(key_to_best_name[k]):
                key_to_best_name[k] = name
    clean_map = defaultdict(list)
    for k, name in key_to_best_name.items():
        clean_map[name].append(k)
    integration_map = clean_map

    return integration_keys, integration_map, integration_names


# ══════════════════════════════════════════════════════════════════════
# Step 3 — Build fine-grained categories
# ══════════════════════════════════════════════════════════════════════

def build_categories(entries, integration_keys, integration_names):
    """Group non-integration keys into semantic categories by prefix analysis."""
    categories = defaultdict(list)

    key_overrides = {
        # general → trace_sampling
        "DD_MAX_TRACES_PER_SECOND": "general_sampling",
        "DD_PRIORITY_SAMPLING": "general_sampling",
        "DD_PRIORITY_SAMPLING_FORCE": "general_sampling",
        "DD_PRIORITIZATION_TYPE": "general_sampling",
        # general → trace_propagation
        "DD_WRITER_BAGGAGE_INJECT": "propagation_config",
        "DD_DISTRIBUTED_TRACING": "propagation_config",
        # general → debugging
        "DD_DISTRIBUTED_DEBUGGER_ENABLED": "dynamic_instrumentation",
        # general → instrumentation
        "DD_INJECTION_ENABLED": "instrumentation_general",
        "DD_INJECT_FORCE": "instrumentation_general",
        "DD_UNSAFE_CLASS_INJECTION": "instrumentation_general",
        "DD_DOTNET_TRACER_HOME": "instrumentation_general",
        "DD_DETECT_AOT_TRAINING_MODE": "instrumentation_general",
        "DD_VISITOR_CLASS_PARSING": "instrumentation_general",
        # general → trace_integrations
        "DD_DISABLED_INTEGRATIONS": "general_integration_misc",
        "DD_INTEGRATIONS_ENABLED": "general_integration_misc",
        "DD_DISABLE_DATADOG_RAILS": "general_integration_misc",
        "DD_JDK_SOCKET_ENABLED": "general_integration_misc",
        # general → trace_core
        "DD_MESSAGE_BROKER_SPLIT_BY_DESTINATION": "trace_core_behavior",
        "DD_OBFUSCATION_QUERY_STRING_REGEXP": "trace_obfuscation",
        "DD_ID_GENERATION_STRATEGY": "trace_core_behavior",
        "DD_AUTOFINISH_SPANS": "trace_core_behavior",
        "DD_CUSTOM_TRACE_ID": "trace_core_behavior",
        "DD_STACK_TRACE_LENGTH_LIMIT": "trace_core_behavior",
        "DD_WRITER_TYPE": "trace_core_behavior",
        "DD_OPTIMIZED_MAP_ENABLED": "trace_core_behavior",
        # general → runtime_metrics
        "DD_METRIC_AGENT_PORT": "dogstatsd",
        "DD_HEALTH_METRICS_ENABLED": "runtime_metrics",
        "DD_RUNTIME_ID_ENABLED": "runtime_metrics",
        # general → logs
        "DD_APP_LOGS_COLLECTION_ENABLED": "logs_submission",
        # general → civisibility
        "DD_TESTSESSION_COMMAND": "test_optimization",
        "DD_TESTSESSION_WORKINGDIRECTORY": "test_optimization",
        "DD_PLAYWRIGHT_WORKER": "test_optimization",
        "DD_VITEST_WORKER": "test_optimization",
        "DD_PIPELINE_EXECUTION_ID": "test_optimization",
        "DD_ACTION_EXECUTION_ID": "test_optimization",
        # trace_core → trace_logging
        "DD_TRACE_BEAUTIFUL_LOGS": "trace_logging",
        "DD_TRACE_ENCODING_DEBUG": "trace_debug",
        "DD_TRACE_LOGFILE_RETENTION_DAYS": "trace_logging",
        "DD_TRACE_LOGGING_RATE": "trace_logging",
        "DD_TRACE_TRIAGE": "trace_debug",
        # trace_core → trace_propagation / http
        "DD_TRACE_REQUEST_HEADER_TAGS": "trace_header_tags",
        "DD_TRACE_REQUEST_HEADER_TAGS_COMMA_ALLOWED": "trace_header_tags",
        "DD_TRACE_SQL_COMMENT_INJECTION_MODE": "trace_propagation",
        # trace_core → trace_sampling
        "DD_TRACE_WEBSOCKET_MESSAGES_INHERIT_SAMPLING": "trace_sampling",
        # trace_core → integration misc
        "DD_TRACE_DISABLED_INSTRUMENTATIONS": "trace_integration_misc",
        "DD_TRACE_DISABLED_PLUGINS": "trace_integration_misc",
        "DD_TRACE_DISABLED_ACTIVITY_SOURCES": "trace_integration_misc",
        "DD_TRACE_DISABLED_ADONET_COMMAND_TYPES": "trace_integration_misc",
        "DD_TRACE_INTERNAL_EXIT_ON_FAILURE": "dd_internal_settings",
        # Integration-specific keys whose prefix doesn't match a detected
        # integration name (typos, multi-word names, framework-specific)
        "DD_TRACE_AKKA_FORK_JOIN_EXECUTOR_TASK_NAME": "trace_integration_misc",
        "DD_TRACE_AKKA_FORK_JOIN_POOL_NAME": "trace_integration_misc",
        "DD_TRACE_AKKA_FORK_JOIN_TASK_NAME": "trace_integration_misc",
        "DD_TRACE_AWSADD_SPAN_POINTERS": "trace_integration_misc",
        "DD_TRACE_AXIS_PROMOTE_RESOURCE_NAME": "trace_integration_misc",
        "DD_TRACE_AXIS_TRANSPORT_CLASS_NAME": "trace_integration_misc",
        "DD_TRACE_LARAVEL_QUEUE_DISTRIBUTED_TRACING": "trace_integration_misc",
        "DD_TRACE_SYMFONY_MESSENGER_DISTRIBUTED_TRACING": "trace_integration_misc",
        "DD_TRACE_SYMFONY_MESSENGER_MIDDLEWARES": "trace_integration_misc",
        # DBM SQL comment is propagation-related
        "DD_DBM_ALWAYS_APPEND_SQL_COMMENT": "trace_propagation",
    }

    for k in sorted(entries.keys()):
        if k in integration_keys:
            continue

        if k in key_overrides:
            categories[key_overrides[k]].append(k)
            continue

        if k.startswith("OTEL_"):
            if k.startswith("OTEL_EXPORTER_OTLP_LOGS_"):
                categories["otel_otlp_logs"].append(k)
            elif k.startswith("OTEL_EXPORTER_OTLP_METRICS_"):
                categories["otel_otlp_metrics"].append(k)
            elif k.startswith("OTEL_EXPORTER_OTLP_"):
                categories["otel_otlp_general"].append(k)
            elif k.startswith("OTEL_TRACES_"):
                categories["otel_traces"].append(k)
            elif k.startswith("OTEL_INSTRUMENTATION_"):
                categories["otel_instrumentation"].append(k)
            elif k.startswith("OTEL_BSP_"):
                categories["otel_batch_span_processor"].append(k)
            else:
                categories["otel_general"].append(k)
        elif k.startswith("_DD_"):
            categories["dd_internal"].append(k)
        elif k.startswith("DD_TRACE_"):
            rest = k[len("DD_TRACE_"):]
            if rest.startswith("AGENT_"):
                categories["trace_agent_connection"].append(k)
            elif rest.startswith("PROPAGATION_"):
                categories["trace_propagation"].append(k)
            elif rest.startswith("SAMPLING_") or rest.startswith("SAMPLE_") or rest.startswith("RATE_"):
                categories["trace_sampling"].append(k)
            elif rest.startswith("HTTP_"):
                categories["trace_http_tagging"].append(k)
            elif (rest.startswith("HEADER_") or rest.startswith("RESPONSE_HEADER_")
                  or rest.startswith("REQUEST_HEADER_")):
                categories["trace_header_tags"].append(k)
            elif rest.startswith("OBFUSCATION_"):
                categories["trace_obfuscation"].append(k)
            elif (rest.startswith("LOG_") or rest.startswith("STARTUP_LOG")
                  or rest.startswith("LOGFILE_") or rest.startswith("LOGGING_")):
                categories["trace_logging"].append(k)
            elif rest.startswith("DEBUG"):
                categories["trace_debug"].append(k)
            elif rest.startswith("PARTIAL_FLUSH"):
                categories["trace_partial_flush"].append(k)
            elif rest.startswith("EXPERIMENTAL_"):
                categories["trace_experimental"].append(k)
            elif rest.startswith("JMXFETCH_"):
                categories["trace_jmxfetch_integrations"].append(k)
            elif rest.startswith("RESOURCE_"):
                categories["trace_resource_naming"].append(k)
            elif rest.startswith("CLOUD_"):
                categories["trace_cloud_payload_tagging"].append(k)
            elif rest.startswith("CLIENT_"):
                categories["trace_client_ip"].append(k)
            elif rest.startswith("DB_"):
                categories["trace_db_config"].append(k)
            elif rest.startswith("SPAN_") or rest.startswith("TAGS") or rest.startswith("GLOBAL_TAGS"):
                categories["trace_span_tags"].append(k)
            elif rest.startswith("BAGGAGE_"):
                categories["trace_baggage"].append(k)
            elif rest.startswith("TRACER_"):
                categories["trace_tracer_metrics"].append(k)
            elif any(rest.startswith(p) for p in [
                "128_BIT", "BATCH_INTERVAL", "BUFFER_SIZE", "CLASSES_EXCLUDE",
                "CLASSLOADERS", "CODESOURCES", "CONFIG", "ENABLED", "FLUSH_",
                "GENERATE_ROOT_SPAN", "HEALTH_METRICS", "LONG_RUNNING",
                "MAX_", "MEASURE_", "METHODS", "NATIVE_SPAN", "OTEL_ENABLED",
                "PEER_SERVICE", "PIPE_", "POST_PROCESSING", "REMOVE_AUTO",
                "REPORT_HOSTNAME", "RESOLVER_", "RETAIN_", "RETRY_",
                "RUNTIME_CONTEXT", "SCOPE", "SECURE_RANDOM", "SERIAL",
                "SERVICE_MAPPING", "SOURCE_HOSTNAME", "SPANS_LIMIT",
                "SPLIT_BY_TAGS", "STATS_COMPUTATION", "THREAD_POOL",
                "TRACE_COUNT", "X_DATADOG",
                "ANALYTICS_ENABLED",
                "_ANALYTICS_ENABLED",
                "ANNOTATIONS", "ANNOTATION_",
                "CLOCK_SYNC", "EXTENSIONS_PATH", "FORKED_PROCESS",
                "EXECUTORS",
            ]):
                categories["trace_core_behavior"].append(k)
            else:
                matched_integration = False
                for name in integration_names:
                    if rest.startswith(f"{name}_") or rest == name:
                        categories["trace_integration_misc"].append(k)
                        matched_integration = True
                        break
                if not matched_integration:
                    categories["trace_misc"].append(k)
        elif k.startswith("DD_PROFILING_"):
            rest = k[len("DD_PROFILING_"):]
            if rest.startswith("DDPROF_"):
                categories["profiling_native"].append(k)
            elif rest.startswith("ASYNC_"):
                categories["profiling_async"].append(k)
            elif rest.startswith("EXPERIMENTAL_"):
                categories["profiling_experimental"].append(k)
            elif rest.startswith("UPLOAD_"):
                categories["profiling_upload"].append(k)
            elif any(rest.startswith(p) for p in [
                "ENABLED", "START_", "API", "URL", "AGENTLESS",
                "TAGS", "PROXY_", "EXCEPTION_",
            ]):
                categories["profiling_general"].append(k)
            else:
                categories["profiling_features"].append(k)
        elif k.startswith("DD_CIVISIBILITY_"):
            rest = k[len("DD_CIVISIBILITY_"):]
            if rest.startswith("CODE_COVERAGE_"):
                categories["civisibility_code_coverage"].append(k)
            elif rest.startswith("GIT_"):
                categories["civisibility_git"].append(k)
            elif rest.startswith("FLAKY_"):
                categories["civisibility_flaky_test"].append(k)
            else:
                categories["civisibility_general"].append(k)
        elif k.startswith("DD_APPSEC_"):
            rest = k[len("DD_APPSEC_"):]
            if rest.startswith("OBFUSCATION_") or rest.startswith("HTTP_BLOCKED_"):
                categories["appsec_response_config"].append(k)
            elif rest.startswith("AUTO_USER_") or rest.startswith("AUTOMATED_USER_"):
                categories["appsec_user_tracking"].append(k)
            else:
                categories["appsec_general"].append(k)
        elif k.startswith("DD_IAST_"):
            rest = k[len("DD_IAST_"):]
            if rest.startswith("REDACTION_"):
                categories["iast_redaction"].append(k)
            else:
                categories["iast_general"].append(k)
        elif k.startswith("DD_DYNAMIC_INSTRUMENTATION_"):
            categories["dynamic_instrumentation"].append(k)
        elif k.startswith("DD_EXCEPTION_"):
            categories["exception_replay"].append(k)
        elif k.startswith("DD_SYMBOL_"):
            categories["symbol_database"].append(k)
        elif k.startswith("DD_CRASHTRACKING_"):
            categories["crashtracking"].append(k)
        elif k.startswith("DD_GIT_"):
            categories["git_metadata"].append(k)
        elif k.startswith("DD_TELEMETRY_"):
            categories["telemetry"].append(k)
        elif k.startswith("DD_REMOTE_"):
            categories["remote_config"].append(k)
        elif k.startswith("DD_RUNTIME_METRICS_"):
            categories["runtime_metrics"].append(k)
        elif k.startswith("DD_LOGS_"):
            categories["logs_submission"].append(k)
        elif k.startswith("DD_DOGSTATSD_"):
            categories["dogstatsd"].append(k)
        elif k.startswith("DD_STATSD_"):
            categories["dogstatsd"].append(k)
        elif k.startswith("DD_API_SECURITY_"):
            categories["api_security"].append(k)
        elif k.startswith("DD_DATA_STREAMS_"):
            categories["data_streams"].append(k)
        elif k.startswith("DD_DATA_JOBS_"):
            categories["general"].append(k)
        elif k.startswith("DD_RUM_"):
            categories["rum"].append(k)
        elif k.startswith("DD_SERVICE_EXTENSION_"):
            categories["service_extension"].append(k)
        elif k.startswith("DD_INSTRUMENTATION_"):
            rest = k[len("DD_INSTRUMENTATION_"):]
            if rest.startswith("TELEMETRY_"):
                categories["instrumentation_telemetry"].append(k)
            else:
                categories["instrumentation_general"].append(k)
        elif k.startswith("DD_HTTP_"):
            categories["http_config"].append(k)
        elif k.startswith("DD_JMXFETCH_"):
            categories["jmxfetch"].append(k)
        elif k.startswith("DD_TEST_"):
            categories["test_optimization"].append(k)
        elif k.startswith("DD_EXPERIMENTAL_"):
            categories["experimental"].append(k)
        elif k.startswith("DD_THIRD_PARTY_"):
            categories["third_party"].append(k)
        elif k.startswith("DD_AGENTLESS_"):
            categories["agentless_logging"].append(k)
        elif k.startswith("DD_AI_"):
            categories["ai_guard"].append(k)
        elif k.startswith("DD_OTLP_"):
            categories["otlp_config"].append(k)
        elif k.startswith("DD_LLMOBS_"):
            categories["llm_observability"].append(k)
        elif k.startswith("DD_OPENAI_"):
            categories["openai_integration"].append(k)
        elif k.startswith("DD_DBM_"):
            categories["dbm"].append(k)
        elif k.startswith("DD_INTERNAL_"):
            categories["dd_internal_settings"].append(k)
        elif k.startswith("DD_AAS_"):
            categories["azure_app_services"].append(k)
        elif k.startswith("DD_AZURE_"):
            categories["azure_app_services"].append(k)
        elif k.startswith("DD_APM_"):
            categories["apm_settings"].append(k)
        elif k.startswith("DD_RESOLVER_"):
            categories["resolver"].append(k)
        elif k.startswith("DD_CODE_"):
            categories["code_origin"].append(k)
        elif k.startswith("DD_HEAP_"):
            categories["heap_config"].append(k)
        elif k.startswith("DD_APP_"):
            categories["app_config"].append(k)
        elif k.startswith("DD_METRICS_"):
            categories["metrics_config"].append(k)
        elif k.startswith("DD_SPAN_"):
            if "SAMPLING" in k:
                categories["trace_sampling"].append(k)
            else:
                categories["span_config"].append(k)
        elif k.startswith("DD_PROPAGATION_"):
            categories["propagation_config"].append(k)
        elif k.startswith("DD_RC_"):
            categories["remote_config_advanced"].append(k)
        elif k.startswith("DD_INTEGRATION_"):
            categories["integration_config"].append(k)
        elif k.startswith("DD_LANGCHAIN_") or k.startswith("DD_VERTEXAI_"):
            categories["openai_integration"].append(k)
        elif k.startswith("DD_CWS_"):
            categories["appsec_general"].append(k)
        elif k.startswith("DD_ERROR_TRACKING_"):
            categories["appsec_general"].append(k)
        elif k.startswith("DD_HAPROXY_"):
            categories["service_extension"].append(k)
        elif k.startswith("DD_REQUEST_MIRROR_"):
            categories["service_extension"].append(k)
        elif k.startswith("DD_LOG_") or k.startswith("DD_LOGGING_") or k == "DD_MAX_LOGFILE_SIZE":
            categories["general_logging"].append(k)
        elif any(k.startswith(f"DD_{p}_") for p in [
            "REDIS", "RABBIT", "KAFKA", "JMS", "HYSTRIX",
            "RESILIENCE4J", "IGNITE", "SPARK", "SPRING",
            "GRPC", "USM",
        ]):
            categories["general_integration_misc"].append(k)
        else:
            categories["general"].append(k)

    return categories


# ══════════════════════════════════════════════════════════════════════
# Step 4 — Helpers
# ══════════════════════════════════════════════════════════════════════

def detect_suffix_patterns(entries, integration_map):
    """Detect common suffix patterns across integration keys."""
    suffix_counts = defaultdict(int)
    for name, keys in integration_map.items():
        for k in keys:
            prefix = f"DD_TRACE_{name}"
            if k.startswith(prefix):
                suffix = k[len(prefix):]
                if suffix:
                    suffix_counts[suffix] += 1
    return {s: c for s, c in sorted(suffix_counts.items(), key=lambda x: -x[1]) if c >= 3}


def _build_integration_detail(name, keys):
    """Map each integration key to its generic template pattern."""
    dd_trace_prefix = f"DD_TRACE_{name}"
    dd_prefix = f"DD_{name}"
    key_to_pattern = {}
    for k in sorted(keys):
        if k.startswith(dd_trace_prefix):
            suffix = k[len(dd_trace_prefix):]
            key_to_pattern[k] = f"DD_TRACE_<INTEGRATION>{suffix}"
        elif k.startswith(dd_prefix):
            suffix = k[len(dd_prefix):]
            key_to_pattern[k] = f"DD_<INTEGRATION>{suffix}"
        else:
            key_to_pattern[k] = k
    return key_to_pattern


# ══════════════════════════════════════════════════════════════════════
# Step 5 — Build final fused output (replaces generate_category_descriptions)
# ══════════════════════════════════════════════════════════════════════

def build_fused_output(entries, categories, integration_map, suffix_patterns):
    """Build the final JSON output with fused categories, descriptions,
    integration details, and kindCounts — all in one pass."""

    result = {
        "metadata": {
            "description": "Categorized configuration key patterns with titles and descriptions",
            "source": API_URL,
            "totalCategories": len(CATEGORY_DEFS),
            "totalIntegrations": len(integration_map),
            "totalUniqueKeys": len(entries),
        },
        "categories": [],
    }

    covered_category_ids = set()

    for defn in CATEGORY_DEFS:
        cat_entry = {
            "id": defn["id"],
            "title": defn["title"],
            "description": defn["description"],
        }

        keys = []
        languages = set()
        for src in defn["sources"]:
            if src == "__integrations__":
                # Build integration details inline
                details = {
                    name: _build_integration_detail(name, ikeys)
                    for name, ikeys in sorted(integration_map.items())
                }
                cat_entry["integrationCount"] = len(integration_map)
                cat_entry["commonSuffixes"] = list(suffix_patterns.keys())
                # kindCounts
                kind_counts = {}
                for detail in details.values():
                    for pattern in detail.values():
                        kind_counts[pattern] = kind_counts.get(pattern, 0) + 1
                cat_entry["kindCounts"] = dict(
                    sorted(kind_counts.items(), key=lambda x: -x[1])
                )
                cat_entry["integrations"] = details
                continue

            if src in categories:
                cat_keys = categories[src]
                keys.extend(cat_keys)
                for k in cat_keys:
                    if k in entries:
                        languages.update(entries[k].get("languages", []))
                covered_category_ids.add(src)

        cat_entry["keyCount"] = len(keys)
        cat_entry["languages"] = sorted(languages)
        cat_entry["keys"] = sorted(set(keys))

        result["categories"].append(cat_entry)

    # Quick overview: category title → key count
    result["categories_list"] = {
        cat["title"]: cat["keyCount"]
        for cat in result["categories"]
    }

    # Warn about uncovered categories
    all_cats = set(categories.keys())
    uncovered = all_cats - covered_category_ids
    if uncovered:
        print(f"Warning: {len(uncovered)} source categories not assigned to any group:")
        for c in sorted(uncovered):
            print(f"  {c} ({len(categories[c])} keys)")

    return result


# ══════════════════════════════════════════════════════════════════════
# Main
# ══════════════════════════════════════════════════════════════════════

KIND_DESCRIPTIONS = {
    "DD_TRACE_<INTEGRATION>_ENABLED": "Enable or disable tracing for a specific integration.",
    "DD_TRACE_<INTEGRATION>_ANALYTICS_ENABLED": "Enable App Analytics (trace search) for spans produced by this integration.",
    "DD_TRACE_<INTEGRATION>_ANALYTICS_SAMPLE_RATE": "Set the App Analytics sample rate for this integration (0.0 to 1.0).",
    "DD_TRACE_<INTEGRATION>_PEER_SERVICE": "Override the peer.service tag for outbound requests from this integration.",
    "DD_TRACE_<INTEGRATION>_SERVICE_NAME": "Override the service name for spans produced by this integration.",
    "DD_TRACE_<INTEGRATION>_DISTRIBUTED_TRACING": "Enable or disable distributed trace propagation for this integration.",
    "DD_TRACE_<INTEGRATION>_ERROR_STATUS_CODES": "Define which HTTP status codes are treated as errors for this integration.",
}
MIN_KIND_COUNT = 5


def write_categories_json(output):
    """Write a slim categories.json for Hugo: ordered array of category metadata."""
    categories = []
    for cat in output["categories"]:
        entry = {
            "id": cat["id"],
            "title": cat["title"],
            "description": cat["description"],
        }
        if "commonSuffixes" in cat:
            entry["commonSuffixes"] = cat["commonSuffixes"]
        if "integrationCount" in cat:
            entry["integrationPattern"] = "DD_TRACE_<INTEGRATION>_*"
            # Build kinds list: only patterns with >= MIN_KIND_COUNT integrations
            kinds = []
            for pattern, count in cat.get("kindCounts", {}).items():
                if count >= MIN_KIND_COUNT:
                    kinds.append({
                        "pattern": pattern,
                        "description": KIND_DESCRIPTIONS.get(pattern, ""),
                        "count": count,
                    })
            # Sort by count descending
            kinds.sort(key=lambda k: -k["count"])
            entry["kinds"] = kinds
        categories.append(entry)

    os.makedirs(os.path.dirname(CATEGORIES_FILE), exist_ok=True)
    with open(CATEGORIES_FILE, "w") as f:
        json.dump(categories, f, indent=2)
    print(f"Wrote {CATEGORIES_FILE} ({len(categories)} categories)")


def main():
    # 1. Fetch from registry API
    entries = fetch_entries(API_URL)

    # 2. Classify integrations
    integration_keys, integration_map, integration_names = classify_integration_keys(entries)

    # 3. Classify remaining keys into fine-grained categories
    categories = build_categories(entries, integration_keys, integration_names)

    # 4. Detect suffix patterns
    suffix_patterns = detect_suffix_patterns(entries, integration_map)

    # 5. Fuse into final output
    output = build_fused_output(entries, categories, integration_map, suffix_patterns)

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w") as f:
        json.dump(output, f, indent=2)

    # 6. Write slim categories.json for Hugo
    write_categories_json(output)

    print(f"\nWrote {OUTPUT_FILE}")
    print(f"  {output['metadata']['totalCategories']} categories")
    print(f"  {output['metadata']['totalIntegrations']} integrations")
    total_keys = sum(c["keyCount"] for c in output["categories"])
    print(f"  {total_keys} keys covered (of {output['metadata']['totalUniqueKeys']} unique)")

    print()
    for cat in output["categories"]:
        extra = ""
        if "integrationCount" in cat:
            extra = f" + {cat['integrationCount']} integrations"
        print(f"  [{cat['id']}] {cat['title']}: {cat['keyCount']} keys{extra}")


if __name__ == "__main__":
    main()
