---
kind: guía
title: Nuevos encabezados CSV para tendencias de uso
---

Los cambios en los encabezados CSV entraron en vigor el 12 de diciembre de 2022. Utiliza esta tabla para actualizar los encabezados CSV de los que depende tu automatización:

| Anteriores | Nuevos (desde el 12 de diciembre de 2022) |
|-----|------------------------|
| Infrastructure Hosts (Max./Hr) | Infra Hosts (Max/hr) |
| Agent Hosts (Max./Hr) | Agent Hosts (Max/hr) |
| AWS Hosts (Max./Hr) | AWS Hosts (Max/hr) |
| Azure Hosts (Max./Hr) | Azure Hosts (Max/hr) |
| GCP Hosts (Max./Hr) | GCP Hosts (Max/hr) |
| Alibaba Hosts (Max./Hr) | Alibaba Hosts (Max/hr) |
| vSphere Hosts (Max./Hr) | vSphere Hosts (Max/hr) |
| Azure App Service (Max./Hr) | Azure App Service Hosts (Max/hr) |
| Heroku Hosts (Max./Hr) | Heroku Hosts (Max/hr) |
| OpenTelemetry Hosts (Max./Hr) | OpenTelemetry Hosts (Max/hr) |
| Containers (Max./Hr) | Containers (Max/hr) |
| Total APM Hosts (Max./Hr) | APM Hosts (Max/hr) |
| APM Azure App Service Hosts (Max./Hr) | APM Azure App Service Hosts (Max/hr) |
| APM Hosts (Max./Hr) | Standard APM Hosts (Max/hr) |
| Ingested Spans (Number of bytes ingested) | Ingested Spans (Sum of bytes) |
| Indexed Spans (Number of spans indexed) | Indexed Spans (Sum) |
| APM Fargate Tasks (Number of tasks) | APM Fargate Tasks (Avg/hr) |
| Profiled Hosts (Max./Hr) | Profiled Hosts (Max/hr) |
| Profiled Containers (Max./Hr) | Profiled Containers (Max/hr) |
| Custom Metrics (Max./Hr) | Custom Metrics (Avg/hr) |
| Ingested Custom Metrics (Max./Hr) | Ingested Custom Metrics (Avg/hr) |
| Ingested Logs (Number of bytes ingested) | Ingested Logs (Sum of bytes) |
| Ingested Live Logs (Number of bytes ingested) | Ingested Live Logs (Sum of bytes) |
| Ingested Rehydrated Logs (Number of bytes ingested) | Ingested Rehydrated Logs (Sum of bytes) |
| Indexed Logs (Number of log events indexed) | Indexed Logs (Sum) |
| Indexed Live Logs (Number of log events indexed) | Indexed Live Logs (Sum) |
| Indexed Rehydrated Logs (Number of log events indexed) | Indexed Rehydrated Logs (Sum) |
| Indexed Logs (3 Day Retention) (Number of log events indexed) | Indexed Logs (3 Day Retention) (Sum) |
| Indexed Logs (7 Day Retention) (Number of log events indexed) | Indexed Logs (7 Day Retention) (Sum) |
| Indexed Logs (15 Day Retention) (Number of log events indexed) | Indexed Logs (15 Day Retention) (Sum) |
| Indexed Logs (30 Day Retention) (Number of log events indexed) | Indexed Logs (30 Day Retention) (Sum) |
| Indexed Logs (45 Day Retention) (Number of log events indexed) | Indexed Logs (45 Day Retention) (Sum) |
| Indexed Logs (60 Day Retention) (Number of log events indexed) | Indexed Logs (60 Day Retention) (Sum) |
| Indexed Logs (90 Day Retention) (Number of log events indexed) | Indexed Logs (90 Day Retention) (Sum) |
| Indexed Logs (180 Day Retention) (Number of log events indexed) | Indexed Logs (180 Day Retention) (Sum) |
| Indexed Logs (360 Day Retention) (Number of log events indexed) | Indexed Logs (360 Day Retention) (Sum) |
| Indexed Logs (Custom Retention) (Number of log events indexed) | Indexed Logs (Custom Retention) (Sum) |
| Audit Logs (Number of log events indexed) | Audit Logs (Sum) |
| Online Archived Logs (15 months) | Online Archived Logs (15 months) (Sum) |
| Analyzed Logs (Number of analyzed ingested bytes) | Analyzed Logs (Security) (Sum of bytes) |
| CWS Hosts (Max./Hr) | Cloud Workload Security Hosts (Max/hr) |
| CWS Containers (Max./Hr) | Cloud Workload Security Containers (Max/hr) |
| CSPM Hosts (Max./Hr) | Cloud Security Posture Management Hosts (Max/hr) |
| Azure CSPM Hosts (Max./Hr) | Azure CSPM Hosts (Max/hr) |
| Azure App Services CSPM Hosts (Max./Hr) | Azure App Services CSPM Hosts (Max/hr) |
| Standard CSPM Hosts (Max./Hr) | Standard CSPM Hosts (Max/hr) |
| AWS CSPM Hosts (Max./Hr) | AWS CSPM Hosts (Max/hr) |
| GCP CSPM Hosts (Max./Hr) | GCP CSPM Hosts (Max/hr) |
| CSPM Containers (Max./Hr) | Cloud Security Posture Management Containers (Max/hr) |
| Application Security Management Hosts (Max./Hr) | Application Security Management Hosts (Max/hr) |
| Application Security Management Fargate Tasks (Number of tasks) | Application Security Management Fargate Tasks (Avg/hr) |
| Serverless Functions (Number of functions) | Serverless Functions (Avg/hr) |
| Serverless Invocations (Number of invocations) | Serverless Invocations (Sum) |
| Fargate Tasks (Number of tasks) | Fargate Tasks (Avg/hr) |
| Serverless Traced Invocations (Number of invocations) | Serverless Traced Invocations (Sum) |
| Profiled Fargate Tasks (Avg/Hr) | Profiled Fargate Tasks (Avg/hr) |
| Network Hosts (Max./Hr) | Network Hosts (Max/hr) |
| Network Flows (Sum of network flows indexed) | Network Flows (Sum) |
| SNMP Devices (Max./Hr) | Network Devices (Max/hr) |
| Synthetic API Test Runs (Number of test runs) | Synthetics API Test Runs (Sum) |
| Synthetic Browser Test Runs (Number of test runs) | Synthetics Browser Test Runs (Sum) |
| RUM Total Sessions (Number of sessions) | RUM Total Sessions (Sum) |
| RUM Browser Sessions (Number of sessions) | RUM Browser Sessions (Sum) |
| RUM iOS Sessions (Number of sessions) | RUM iOS Sessions (Sum) |
| RUM Android Sessions (Number of sessions) | RUM Android Sessions (Sum) |
| RUM React Native Sessions (Number of sessions) | RUM React Native Sessions (Sum) |
| RUM Premium (+ Long Tasks & Resources) | Browser RUM & Session Replay Sessions (Sum) |
| RUM Premium (+ Long Tasks & Resources) | Browser RUM & Session Replay Sessions (Sum) |
| RUM Browser and Mobile Sessions (Number of Sessions) | RUM Browser and Mobile Sessions (Sum) |
| Incident Mgmt (Monthly Unique Active Users to Date) | Incident Management Unique Active Users (Accum. max/hr) |
| IoT Devices (Max./Hr) | IoT Devices (Max/hr) |
| DBM Hosts (Max./Hr) | DBM Hosts (Max/hr) |
| DBM Normalized Queries (Number of queries) | DBM Normalized Queries (Avg/hr) |
| SDS Total (Number of bytes scanned) | Sensitive Data Scanner (Total) (Sum of bytes) |
| SDS Scanned Logs (Number of bytes scanned) | Sensitive Data Scanner (Scanned Logs) (Sum of bytes) |
| CI Visibility Pipeline Committers (Number of Unique Committers) | CI Pipeline Committers (Accum. max/hr) |
| CI Visibility Test Committers (Number of Unique Committers) | CI Test Committers (Accum. max/hr) |
| CI Pipeline Indexed Spans | CI Pipeline Spans (Sum) |
| CI Test Indexed Spans | CI Test Spans (Sum) |
| Observability Pipelines Bytes Processed | Observability Pipelines (Sum of bytes) |