---
title: Troubleshooting duplicated hosts with vSphere

---

## Duplicated hosts issue context

The [vSphere integration][1] is configured to crawl into the different resources of a vCenter, such as VMs or ESXi. The integration flags the VMs and ESXi as separate hosts, and they appear in your [Infrastructure List][2] as `<vsphere-hostname>`.  
Inside a vCenter, a guest VM can run an Agent. This Agent submits metrics and attaches `<guest-hostname>` metadata to them. A host appears in the Infrastructure List as `<guest-hostname>`.
Depending on the vSphere integration configuration and the guest Agent configuration, `<vsphere-hostname>` and `<guest-hostname>` can be different. For example, `<vsphere-hostname>` can be a Fully Qualified Domain Name (FQDN) and `<guest-hostname>` a Short Name. In this case, a single VM can appear twice in the Infrastructure List.

## Workaround

* In the vSphere integration configuration file, set [`use_guest_hostname: true`][3] for the vSphere integration to use the guest hostname instead of the VM name given by the vCenter.
* If the previous step does not resolve the issue, change the value of [`hostname_fqdn`][4] in the guest VM Agent configuration `datadog.yaml`.
* If the previous steps do not resolve the issue, manually set a host alias between `vsphere-hostname` and `guest-hostname`.

Note: The old host in the Infrastructure List takes time before disappearing.

[1]: https://docs.datadoghq.com/integrations/vsphere/
[2]: https://app.datadoghq.com/infrastructure
[3]: https://github.com/DataDog/integrations-core/blob/21a90b00f603b00250c4baa6534e47ee5529ed3c/vsphere/datadog_checks/vsphere/data/conf.yaml.example#L301-L308
[4]: https://github.com/DataDog/datadog-agent/blob/6ba10dc8cd0c1aa89adcebe6b5941571caf25d50/pkg/config/config_template.yaml#L56-L61
