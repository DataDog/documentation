---
title: Malicious packages detection
kind: documentation
aliases: 
further_reading:
- link: "/getting_started/application_security/software_composition_analysis"
  tag: "Guide"
  text: "Getting started with Software Composition Analysis"
- link: "https://securitylabs.datadoghq.com/articles/guarddog-identify-malicious-pypi-packages/"
  tag: "Blog"
  text: "Finding malicious PyPI packages through static code analysis: Meet GuardDog"
---

## Overview

The datadog security research team continuously scan newly released PyPI and NPM packages for malwares. All the findings are added automatically to the [Datadog SCA](./_index.md) database and also published publicly to the community via our [opensource samples dataset](https://github.com/datadog/malicious-software-packages-dataset)


## About Guarddog CLI
In late 2022, we released GuardDog, an Open source CLI-based tool that uses Semgrep and package metadata heuristics to identify malicious malicious PyPI and npm packages based on common patterns. 

{{< img src="/security/application_security/software_composition_analysis/guarddog/guarddog-logo.png" alt="Guarddog CLI." style="width:100%;" >}}


GuardDog can be used to scan local or remote PyPI and npm packages using any of the available [heuristics](https://github.com/datadog/guarddog?tab=readme-ov-file#heuristics).

## Software packages continous scanning 
Datadog security research developed an infrastructure to monitor newely published packages in PyPI & NPM and scan them using the guarddog CLI.

This result then pushed to the security research team to manually review and produce a highly acurate feed which is added to the [Datadog SCA](./_index.md) database also we publish the malware samples in the [open source repo](https://github.com/datadog/malicious-software-packages-dataset)

{{< img src="/security/application_security/software_composition_analysis/guarddog/scanning-pipeline.png" alt="Malicious packages continous scanning." style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

