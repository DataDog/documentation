---
aliases:
- cyx-7ju-5rj
control: 1.2.30
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --tls-cert-file and --tls-private-key-file arguments are set as appropriate
  (API server)
type: security_rules
---

## Description

Setup TLS connection on the API server.

## Rationale

API server communication contains sensitive parameters that should remain encrypted in transit. Configure the API server to serve only HTTPS traffic.

## Audit

Run the following command on the master node:
```
ps -ef | grep kube-apiserver
```
Verify that the `--tls-cert-file` and `--tls-private-key-file` arguments exist and they are set as appropriate.

## Remediation

Follow the Kubernetes documentation and set up the TLS connection on the apiserver. Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the TLS certificate and private key file parameters. 
```
--tls-cert-file=<path/to/tls-certificate-file> 
--tls-private-key-file=<path/to/tls-key-file>
```

## Impact

TLS and client certificate authentication must be configured for your Kubernetes cluster deployment.

## Default Value

By default, `--tls-cert-file` and `--tls-private-key-file` arguments are not set.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/ 
2. http://rootsquash.com/2016/05/10/securing-the-kubernetes-api/ 
3. https://github.com/kelseyhightower/docker-kubernetes-tls-guide

## CIS Controls

Version 6 14.2 Encrypt All Sensitive Information Over Less-trusted Networks - All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted. 
Version 7 14.4 Encrypt All Sensitive Information in Transit Encrypt all sensitive information in transit.
