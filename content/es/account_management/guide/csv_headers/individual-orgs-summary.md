---
kind: guía
title: Nuevos encabezados CSV para el resumen de organizaciones individuales
---

Los cambios en los encabezados CSV entraron en vigor el 12 de diciembre de 2022. Utiliza esta tabla para actualizar los encabezados CSV de los que depende tu automatización:

| Anteriores | Nuevos (desde el 12 de diciembre de 2022) |
|----| ----------------------|
|Ingested Logs (Sum) | Ingested Logs (live & rehydrated) (Sum)|
|Indexed Logs (Sum) | Indexed Logs (live & rehydrated) (Sum)|
|Analyzed Logs (Number of analyzed ingested bytes) | Analyzed Logs (Security) (Sum)|
|CWS Hosts (Top 99p) | Cloud Workload Security Hosts (Top 99p)|
|CWS Host Hours (Sum) | Cloud Workload Security Host Hours (Sum)|
|CWS Containers (Average) | Cloud Workload Security Containers (Average)|
|CWS Container Hours (Sum) | Cloud Workload Security Container Hours (Sum)|
|CSPM Host Hours (Sum) | Cloud Security Posture Management Host Hours (Sum)|
|CSPM Host Hours (Sum) | Azure CSPM Host Hours (Sum)|
|CSPM Host Hours (Sum) | Azure App Services CSPM Host Hours (Sum)|
|CSPM Host Hours (Sum) | AWS CSPM Host Hours (Sum)|
|CSPM Host Hours (Sum) | GCP CSPM Host Hours (Sum)|
|CSPM Hosts (Top 99p) | Cloud Security Posture Management Hosts (Top 99p)|
|CSPM Containers (Average) | Cloud Security Posture Management Containers (Average)|
|CSPM Container Hours (Sum) | Cloud Security Posture Management Container Hours (Sum)|
|Application Security Management Fargate Tasks (Avg) | Application Security Management Fargate Tasks (Average)|
|Serverless Functions (Number of functions) | Serverless Functions (Average)|
|Serverless Functions (Workload Monitoring) (Average) | Serverless Workload Functions (Average)|
|Serverless Invocations (Number of invocations) | Serverless Invocations (Sum)|
|Serverless Traced Invocations (Number of invocations) | Serverless Traced Invocations (Sum)|
|Fargate Tasks (Average number of tasks) | Fargate Tasks (Average)|
|Network Flows (Sum of network flows indexed) | Network Flows (Sum)|
|SNMP Devices (Top 99p) | Network Devices (Top 99p)|
|Synthetic API Test Runs (Number of test runs) | Synthetics API Test Runs (Sum)|
|Synthetic Browser Test Runs (Number of test runs) | Synthetics Browser Test Runs (Sum)|
|RUM Total Sessions (Number of sessions) | RUM Total Sessions (Sum)|
|RUM Browser Sessions (Number of sessions) | RUM Browser Sessions (Sum)|
|RUM iOS Sessions (Number of sessions) | RUM iOS Sessions (Sum)|
|RUM Android Sessions (Number of sessions) | RUM Android Sessions (Sum)|
|RUM React Native Sessions (Number of sessions) | RUM React Native Sessions (Sum)|
|Incident Mgmt (Monthly Unique Active Users to Date) | Incident Management Unique Active Users (Max)|
|DBM Normalized Queries (Avg) | DBM Normalized Queries (Average)|
|SDS Total (Sum) | Sensitive Data Scanner (Total) (Sum)|
|SDS Scanned Logs (Sum) | Sensitive Data Scanner (Scanned Logs) (Sum)|
|Observability Pipelines Bytes Processed (Sum) | Observability Pipelines (Sum)|
|CI Visibility Pipeline Committers (Monthly Unique Active Committers to Date) | CI Pipeline Committers (Max)|
|CI Visibility Test Committers (Monthly Unique Active Committers to Date) | CI Test Committers (Max)|
|CI Pipeline Indexed Spans (Sum) | CI Pipeline Spans (Sum)|
|CI Test Indexed Spans (Sum) | CI Test Spans (Sum)|