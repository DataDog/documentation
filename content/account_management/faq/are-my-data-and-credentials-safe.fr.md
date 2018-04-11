---
title: Mes données et informations d'identification sont-elles sécurisées?
kind: faq
---

* Le trafic est toujours initié par l'Agent vers Datadog. Aucune session n'est jamais initiée depuis Datadog vers l'Agent.
* Tout le traffic est envoyé en SSL
* Toutes les communications vers Datadog s'effectuent via HTTPS.
* [Full license agreement][1].
* [Le code source de l'Agent Datadog][2] sous une licence de logiciel open source.
* Le processus d'installation de l'agent Datadog et d'autres composants peut vous demander vos informations d'identification administratives ou root. Le mot de passe est uniquement utilisé pour terminer le processus d'installation, Datadog ne conserve pas ces informations d'identification. Si vous préférez voir le processus d'installation, les instructions étape par étape peuvent être trouvées sur la [page d'installation de l'agent][3].

[1]: https://github.com/DataDog/datadog-agent/blob/master/LICENSE
[2]: https://github.com/DataDog/datadog-agent
[3]: https://app.datadoghq.com/account/settings#agent