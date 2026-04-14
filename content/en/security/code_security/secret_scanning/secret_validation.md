---
title: Secret Validation
is_beta: true
algolia:
  tags: ['static analysis', 'ci pipeline', 'SAST', 'secret scanning']
---

## About validity checks

For certain detections (see the list below), Datadog checks whether a detected secret is valid during scans. For these live validation checks, Datadog makes API requests to provider endpoints to confirm that a credential is active. Datadog only makes requests to endpoints that do not return sensitive data or personally identifiable information (PII), and only to verify if the credential can still access the provider endpoint.

For secret types with validation available, Datadog displays the validation status in the explorer as "Active" or "Inactive". You can also filter or query detections by their Validation Status.

For some secret types, Datadog uses static validation methods, such as computing a checksum, to confirm that a detected secret is not a false positive. Static validation results are not displayed and all references to "validation" in the explorer correspond to live validation results.

## List of supported validators

{{< multifilter-search resource="supported_validators" >}}