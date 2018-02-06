---
title: Resource
kind: Documentation
---

{{< img src="tracing/services/ressource.png" alt="Ressource" responsive="true" popup="true">}}

## Definition

A particular query to a service.  

* For a web application: some examples might be a canonical URL like `/user/home` or a handler function like `web.user.home` (often referred to as "routes" in MVC frameworks).  
* For a SQL database: a resource would be the SQL of the query itself like `select * from users where id = ?`.

Resources should be grouped together under a canonical name, like `/user/home` rather than have `/user/home?id=100` and `/user/home?id=200` as separate resources.

These resources can be found after clicking on a particular [service](/tracing/services/#resource).

Resource names: 
* **must be lowercase, alphanumeric characters**
* **cannot exceed 5000 bytes**
* **contain spaces** (spaces are replaced with underscores)
* Must adhere to [metric naming rules](/developers/metrics/).