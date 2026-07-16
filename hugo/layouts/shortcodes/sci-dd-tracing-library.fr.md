Depuis la [version 1.18](https://tip.golang.org/doc/go1.18), Go intègre les informations sur le contrôle des versions dans des binaires. La bibliothèque de tracing Datadog se sert de ces informations pour taguer vos données de télémétrie avec le SHA du commit et l'URL du référentiel les plus récents.

Pour adopter cette approche, vérifiez que votre service respecte les exigences suivantes :

* Version 1.18 ou ultérieure de Go
* Service conçu en tant que module Go, dont le chemin correspond à l'URL du référentiel de votre code
