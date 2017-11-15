---
title: Can I limit the number of VMs that are pulled in via the VMWare integration?
kind: faq
customnav: integrationsnav
---

Yes you can configure this with a regex in your vsphere.yaml file: 

Please refer to this example for more info:

https://github.com/DataDog/integrations-core/blob/master/vsphere/conf.yaml.example#L31-L35