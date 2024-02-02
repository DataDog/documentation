---
title: Using the Application Field in Schema 2.1 and Beyond 
kind: guide
---

For microservices, a service typically coincides with a Kubernetes deployment because its a self-contained unit of functionality with well-defined ownership and other metadata. Therefore, other components in a microservice might be named automatically during the instrumentation process. Add an **application** field to all the automatically discovered components to group them with the core service.

For monolithic services, defining multiple services might be helpful. At the minimum, you should choose a service to represent the monolith as a whole. Then, associate relevant metadata, like documentation or source code, and relevant telemetry, like pod metrics. It's sometimes useful to define additional services that represent other functional units within the monolith if they  have separate ownership properties like operation runbooks and documentation. In cases where there's a clearly defined hierarchy between the monolith and other units within it, its recommended to use the **application** field in schema 2.1+. Set the **application** value as the service name for the monolith itself, and add this application field to all sub-services that belong to the monolith. 
