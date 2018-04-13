---
title: Puis-je limiter le nombre de VM surveillées via l'intégration de VMWare?
kind: faq
---

Oui, vous pouvez configurer ceci avec une regex dans votre fichier `vsphere.yaml`:

Reportez-vous à cet exemple pour plus d'informations:

https://github.com/DataDog/integrations-core/blob/master/vsphere/conf.yaml.example#L31-L35

