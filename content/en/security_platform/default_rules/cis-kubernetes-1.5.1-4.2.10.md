---
aliases:
- hj4-2eq-48p
control: 4.2.10
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: --tls-cert-file and --tls-private-key-file arguments are set as appropriate
  (Kubelet)
type: security_rules
---

## Description

Setup TLS connection on the Kubelets.

## Rationale

Kubelet communication contains sensitive parameters that should remain encrypted in transit. Configure the Kubelets to serve only HTTPS traffic.

## Audit

Run the following command on each node: `ps -ef | grep kubelet`. Verify that the `--tls-cert-file` and `--tls-private-key-file` arguments exist and they are set as appropriate. If these arguments are not present, check that there is a Kubelet config specified by `--config` and that it contains appropriate settings for `tlsCertFile` and `tlsPrivateKeyFile`.

## Remediation

If using a Kubelet config file, edit the file to set `tlsCertFile` to the location of the certificate file to use to identify this Kubelet, and `tlsPrivateKeyFile` to the location of the corresponding private key file. If using command line arguments, edit the kubelet service file `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and set the below parameters in K`UBELET_CERTIFICATE_ARGS` variable.

```
--tls-cert-file=<path/to/tls-certificate-file>
--tls-private-key-file=<path/to/tls-key-file>
```

Based on your system, restart the kubelet service. For example: `systemctl daemon-reload systemctl restart kubelet.service`

## Impact

TLS and client certificate authentication must be configured for your Kubernetes cluster deployment.

## Default Value

By default, `--tls-cert-file` and `--tls-private-key-file` arguments are not set. If `--tls-cert-file` and `--tls-private-key-file` are not provided, a self-signed certificate and key are generated for the public address and saved to the directory passed to `--cert-dir`.

## References

1. [https://kubernetes.io/docs/admin/kubelet/ ][1]
2. [http://rootsquash.com/2016/05/10/securing-the-kubernetes-api/ ][2]
3. [https://github.com/kelseyhightower/docker-kubernetes-tls-guide ][3]
4. [https://jvns.ca/blog/2017/08/05/how-kubernetes-certificates-work/][4]

## CIS Controls

Version 6.14.2 Encrypt All Sensitive Information Over Less-trusted Networks - All communication of sensitive information over less-trusted networks should be encrypted. Whenever information flows over a network with a lower trust level, the information should be encrypted.

Version 7.14.4 Encrypt All Sensitive Information in Transit - Encrypt all sensitive information in transit.

[1]: https://kubernetes.io/docs/admin/kubelet/
[2]: http://rootsquash.com/2016/05/10/securing-the-kubernetes-api/
[3]: https://github.com/kelseyhightower/docker-kubernetes-tls-guide
[4]: https://jvns.ca/blog/2017/08/05/how-kubernetes-certificates-work/
