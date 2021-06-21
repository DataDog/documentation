---
title: Troubleshooting duplicated hosts with vSphere
kind: faq
---

## Duplicated hosts issue context

[vSphere integration][1] is configured to crawl into the different resources of a vCenter, such as VMs or ESXi. It flags the VMs and ESXi as separate hosts, and they appear in the instracture list view of the Datadog web UI under a name `<vsphere-hostname>`.  
Inside a vCenter, a guest VM can be running an agent. This agent submits metrics and is attaching a `<guest-hostname>` metadata to them. A host appear in the infrastructure list under `<guest-hostname>`.
Depending on the vSphere integration configuration, and the guest agent configuration, `<vsphere-hostname>` and `<guest-hostname>` can be different, so a single VM appears twice in the infrastructure list. For example, `<vsphere-hostname>` can be a Fully Qualified Domain Name (FQDN) and `<guest-hostname>` a Short Name.

## Workaround

* In the vSphere integration configuration file, set [`use_guest_hostname: true`][2] for the vSphere integration to use the guest hostname instead of the VM name given by the vCenter.
* If the previous step is not enough: in the guest VM agent configuration `datadog.yaml`, change the value of [`hostname_fqdn`][3].
* If the previous steps are not enough: manually set a host alias between `vsphere-hostname` and `guest-hostname`.

Note: The old host in the infrastrure list takes time before disappearing.

[1]: https://docs.datadoghq.com/integrations/vsphere/
[2]: https://github.com/DataDog/integrations-core/blob/21a90b00f603b00250c4baa6534e47ee5529ed3c/vsphere/datadog_checks/vsphere/data/conf.yaml.example#L301-L308
[3]: https://github.com/DataDog/datadog-agent/blob/6ba10dc8cd0c1aa89adcebe6b5941571caf25d50/pkg/config/config_template.yaml#L56-L61
