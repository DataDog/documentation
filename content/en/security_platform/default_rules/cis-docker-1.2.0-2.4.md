---
aliases:
- znn-2vq-c2x
control: '2.4'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Insecure registries are not used
type: security_rules
---

## Description

Docker considers a private registry either secure or insecure. By default, registries are considered secure.

## Rationale

A secure registry uses TLS. A copy of the registry's CA certificate is placed on the Docker host in the `/etc/docker/certs.d/<registry-name>/` directory. An insecure registry is one which does not have a valid registry certificate, or one not not using TLS. You should not use insecure registries because they present a risk of traffic interception and modification. Additionally, once a registry has been marked as insecure, commands such as `docker pull`, `docker push`, and `docker search` will not result in an error message, and users may indefinitely be working with this type of insecure registry without ever being notified of the risk of potential compromise.

## Audit

Find out if any insecure registries are in use by running: 
```
docker info --format 'Insecure Registries: {{.RegistryConfig.InsecureRegistryCIDRs}}'
```

## Remediation

You should ensure that no insecure registries are in use.

## Impact

None.

## Default Value

By default, Docker assumes all registries except local ones are secure.

## References

1. [https://docs.docker.com/registry/insecure/][1]

## CIS Controls

Version 6.14.2 Encrypt All Sensitive Information Over Less-trusted Networks - All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted. 

Version 7.14.4 Encrypt All Sensitive Information in Transit - Encrypt all sensitive information in transit.                

[1]: https://docs.docker.com/registry/insecure/
