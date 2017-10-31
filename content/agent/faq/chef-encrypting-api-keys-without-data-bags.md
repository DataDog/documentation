---
title: Chef, encrypting api_keys without data_bags
kind: faq
customnav: agentnav
---

As stated in our [chef-datadog repository](https://github.com/DataDog/chef-datadog), we are not making use of data_bags in this recipe at this time.

It is possible that you would need to use encrypted data bags to store the api keys because of compliance policy not allowing checking keys into git for instance.

You can use the following workaround: run a wrapper recipe to set the api keys as node attribute from an encrypted data bag.