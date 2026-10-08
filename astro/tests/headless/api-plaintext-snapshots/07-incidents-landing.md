---
title: Incidents
description: Manage incident response, as well as associated attachments, metadata, and todos. See the Incident Management page for more information.
breadcrumbs: Docs > API > Incidents
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Incidents

Manage incident response, as well as associated attachments, metadata, and todos. See the [Incident Management page](https://docs.datadoghq.com/service_management/incident_management/) for more information.

## [Create an incident](/api/latest/incidents/create-an-incident/) (preview)

| Datadog site      | API endpoint                                            |
| ----------------- | ------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents      |

## [Get the details of an incident](/api/latest/incidents/get-the-details-of-an-incident/) (preview)

| Datadog site      | API endpoint                                                         |
| ----------------- | -------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}      |

## [Update an existing incident](/api/latest/incidents/update-an-existing-incident/) (preview)

| Datadog site      | API endpoint                                                           |
| ----------------- | ---------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/{incident_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/{incident_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/{incident_id}      |

## [Delete an existing incident](/api/latest/incidents/delete-an-existing-incident/) (preview)

| Datadog site      | API endpoint                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/{incident_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/{incident_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/{incident_id}      |

## [Create postmortem attachment](/api/latest/incidents/create-postmortem-attachment/) (preview)

| Datadog site      | API endpoint                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/{incident_id}/attachments/postmortems     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/attachments/postmortems |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/attachments/postmortems |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/attachments/postmortems      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/attachments/postmortems |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/attachments/postmortems |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/attachments/postmortems      |

## [Search for incidents](/api/latest/incidents/search-for-incidents/) (preview)

| Datadog site      | API endpoint                                                  |
| ----------------- | ------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/search     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/search |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/search |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/search      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/search |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/search |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/search      |

## [List an incident's impacts](/api/latest/incidents/list-an-incident-s-impacts/)

| Datadog site      | API endpoint                                                                 |
| ----------------- | ---------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/impacts     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/impacts      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/impacts      |

## [Create an incident impact](/api/latest/incidents/create-an-incident-impact/)

| Datadog site      | API endpoint                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/{incident_id}/impacts     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/impacts      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/impacts |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/impacts      |

## [Delete an incident impact](/api/latest/incidents/delete-an-incident-impact/)

| Datadog site      | API endpoint                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/{incident_id}/impacts/{impact_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/impacts/{impact_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/impacts/{impact_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/impacts/{impact_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/impacts/{impact_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/impacts/{impact_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/impacts/{impact_id}      |

## [Create an incident integration metadata](/api/latest/incidents/create-an-incident-integration-metadata/) (preview)

| Datadog site      | API endpoint                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/integrations      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/integrations      |

## [Get incident integration metadata details](/api/latest/incidents/get-incident-integration-metadata-details/) (preview)

| Datadog site      | API endpoint                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |

## [Update an existing incident integration metadata](/api/latest/incidents/update-an-existing-incident-integration-metadata/) (preview)

| Datadog site      | API endpoint                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |

## [Delete an incident integration metadata](/api/latest/incidents/delete-an-incident-integration-metadata/) (preview)

| Datadog site      | API endpoint                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}      |

## [Get a list of an incident's todos](/api/latest/incidents/get-a-list-of-an-incident-s-todos/) (preview)

| Datadog site      | API endpoint                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/todos      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/todos      |

## [Create an incident todo](/api/latest/incidents/create-an-incident-todo/) (preview)

| Datadog site      | API endpoint                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/todos      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/todos      |

## [Get incident todo details](/api/latest/incidents/get-incident-todo-details/) (preview)

| Datadog site      | API endpoint                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |

## [Update an incident todo](/api/latest/incidents/update-an-incident-todo/) (preview)

| Datadog site      | API endpoint                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |

## [Delete an incident todo](/api/latest/incidents/delete-an-incident-todo/) (preview)

| Datadog site      | API endpoint                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}      |

## [Create an incident type](/api/latest/incidents/create-an-incident-type/) (preview)

| Datadog site      | API endpoint                                                         |
| ----------------- | -------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/types     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/types |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/types |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/types      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/types |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/types |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/types      |

## [Get a list of incident types](/api/latest/incidents/get-a-list-of-incident-types/) (preview)

| Datadog site      | API endpoint                                                        |
| ----------------- | ------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/types     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/types |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/types |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/types      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/types |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/types |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/types      |

## [Get incident type details](/api/latest/incidents/get-incident-type-details/) (preview)

| Datadog site      | API endpoint                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/types/{incident_type_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/types/{incident_type_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/types/{incident_type_id}      |

## [Update an incident type](/api/latest/incidents/update-an-incident-type/) (preview)

| Datadog site      | API endpoint                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/config/types/{incident_type_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/config/types/{incident_type_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/config/types/{incident_type_id}      |

## [Delete an incident type](/api/latest/incidents/delete-an-incident-type/) (preview)

| Datadog site      | API endpoint                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/types/{incident_type_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/types/{incident_type_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/types/{incident_type_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/types/{incident_type_id}      |

## [List incident notification templates](/api/latest/incidents/list-incident-notification-templates/) (preview)

| Datadog site      | API endpoint                                                                         |
| ----------------- | ------------------------------------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/notification-templates     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-templates |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-templates |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/notification-templates      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-templates |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-templates |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/notification-templates      |

## [Create incident notification template](/api/latest/incidents/create-incident-notification-template/) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/notification-templates     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-templates |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-templates |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/notification-templates      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-templates |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-templates |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/notification-templates      |

## [Get incident notification template](/api/latest/incidents/get-incident-notification-template/) (preview)

| Datadog site      | API endpoint                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/notification-templates/{id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/notification-templates/{id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/notification-templates/{id}      |

## [Update incident notification template](/api/latest/incidents/update-incident-notification-template/) (preview)

| Datadog site      | API endpoint                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/config/notification-templates/{id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/config/notification-templates/{id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/config/notification-templates/{id}      |

## [Delete a notification template](/api/latest/incidents/delete-a-notification-template/) (preview)

| Datadog site      | API endpoint                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/notification-templates/{id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/notification-templates/{id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-templates/{id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/notification-templates/{id}      |

## [List incident notification rules](/api/latest/incidents/list-incident-notification-rules/) (preview)

| Datadog site      | API endpoint                                                                     |
| ----------------- | -------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/notification-rules     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-rules |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-rules |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/notification-rules      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-rules |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-rules |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/notification-rules      |

## [Create an incident notification rule](/api/latest/incidents/create-an-incident-notification-rule/) (preview)

| Datadog site      | API endpoint                                                                      |
| ----------------- | --------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/notification-rules     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-rules |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-rules |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/notification-rules      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-rules |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-rules |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/notification-rules      |

## [Get an incident notification rule](/api/latest/incidents/get-an-incident-notification-rule/) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/notification-rules/{id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/notification-rules/{id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/notification-rules/{id}      |

## [Update an incident notification rule](/api/latest/incidents/update-an-incident-notification-rule/) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PUT** https://api.datadoghq.com/api/v2/incidents/config/notification-rules/{id}     |
| us3.datadoghq.com | **PUT** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| us5.datadoghq.com | **PUT** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.datadoghq.eu  | **PUT** https://api.datadoghq.eu/api/v2/incidents/config/notification-rules/{id}      |
| ap1.datadoghq.com | **PUT** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| ap2.datadoghq.com | **PUT** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.ddog-gov.com  | **PUT** https://api.ddog-gov.com/api/v2/incidents/config/notification-rules/{id}      |

## [Delete an incident notification rule](/api/latest/incidents/delete-an-incident-notification-rule/) (preview)

| Datadog site      | API endpoint                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/notification-rules/{id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/notification-rules/{id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/notification-rules/{id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/notification-rules/{id}      |

## [List incident attachments](/api/latest/incidents/list-incident-attachments/) (preview)

| Datadog site      | API endpoint                                                                     |
| ----------------- | -------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/attachments     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/attachments      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/attachments      |

## [Create incident attachment](/api/latest/incidents/create-incident-attachment/) (preview)

| Datadog site      | API endpoint                                                                      |
| ----------------- | --------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/{incident_id}/attachments     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/attachments      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/attachments |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/attachments      |

## [Delete incident attachment](/api/latest/incidents/delete-incident-attachment/) (preview)

| Datadog site      | API endpoint                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/attachments/{attachment_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/attachments/{attachment_id}      |

## [Update incident attachment](/api/latest/incidents/update-incident-attachment/) (preview)

| Datadog site      | API endpoint                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/attachments/{attachment_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/attachments/{attachment_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/attachments/{attachment_id}      |

## [Get global incident settings](/api/latest/incidents/get-global-incident-settings/) (preview)

| Datadog site      | API endpoint                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/global/settings     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/global/settings |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/global/settings |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/global/settings      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/settings |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/settings |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/global/settings      |

## [Update global incident settings](/api/latest/incidents/update-global-incident-settings/) (preview)

| Datadog site      | API endpoint                                                                    |
| ----------------- | ------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/config/global/settings     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/config/global/settings |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/config/global/settings |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/config/global/settings      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/settings |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/settings |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/config/global/settings      |

## [List global incident handles](/api/latest/incidents/list-global-incident-handles/) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/global/incident-handles     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/global/incident-handles      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/global/incident-handles      |

## [Create global incident handle](/api/latest/incidents/create-global-incident-handle/) (preview)

| Datadog site      | API endpoint                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/global/incident-handles     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/global/incident-handles      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/global/incident-handles      |

## [Update global incident handle](/api/latest/incidents/update-global-incident-handle/) (preview)

| Datadog site      | API endpoint                                                                          |
| ----------------- | ------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PUT** https://api.datadoghq.com/api/v2/incidents/config/global/incident-handles     |
| us3.datadoghq.com | **PUT** https://api.us3.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| us5.datadoghq.com | **PUT** https://api.us5.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.datadoghq.eu  | **PUT** https://api.datadoghq.eu/api/v2/incidents/config/global/incident-handles      |
| ap1.datadoghq.com | **PUT** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| ap2.datadoghq.com | **PUT** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.ddog-gov.com  | **PUT** https://api.ddog-gov.com/api/v2/incidents/config/global/incident-handles      |

## [Delete global incident handle](/api/latest/incidents/delete-global-incident-handle/) (preview)

| Datadog site      | API endpoint                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/global/incident-handles     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/global/incident-handles      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/global/incident-handles |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/global/incident-handles      |

## [List postmortem templates](/api/latest/incidents/list-postmortem-templates/) (preview)

| Datadog site      | API endpoint                                                                       |
| ----------------- | ---------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/postmortem-templates     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/postmortem-templates      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/postmortem-templates      |

## [Create postmortem template](/api/latest/incidents/create-postmortem-template/) (preview)

| Datadog site      | API endpoint                                                                        |
| ----------------- | ----------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/postmortem-templates     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/postmortem-templates      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/postmortem-templates |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/postmortem-templates      |

## [Get postmortem template](/api/latest/incidents/get-postmortem-template/) (preview)

| Datadog site      | API endpoint                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/postmortem-templates/{template_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/postmortem-templates/{template_id}      |

## [Update postmortem template](/api/latest/incidents/update-postmortem-template/) (preview)

| Datadog site      | API endpoint                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/config/postmortem-templates/{template_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/config/postmortem-templates/{template_id}      |

## [Delete postmortem template](/api/latest/incidents/delete-postmortem-template/) (preview)

| Datadog site      | API endpoint                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/postmortem-templates/{template_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/postmortem-templates/{template_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/postmortem-templates/{template_id}      |

## [Import an incident](/api/latest/incidents/import-an-incident/) (preview)

| Datadog site      | API endpoint                                                   |
| ----------------- | -------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/import     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/import |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/import |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/import      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/import |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/import |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/import      |

## [Get a list of incidents](/api/latest/incidents/get-a-list-of-incidents/) (preview)

| Datadog site      | API endpoint                                           |
| ----------------- | ------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents      |

## [Get a list of an incident's integration metadata](/api/latest/incidents/get-a-list-of-an-incident-s-integration-metadata/) (preview)

| Datadog site      | API endpoint                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/{incident_id}/relationships/integrations      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/{incident_id}/relationships/integrations |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/{incident_id}/relationships/integrations      |

## [Get a list of incident user-defined fields](/api/latest/incidents/get-a-list-of-incident-user-defined-fields/) (preview)

| Datadog site      | API endpoint                                                                      |
| ----------------- | --------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/user-defined-fields     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/user-defined-fields      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/user-defined-fields      |

## [Create an incident user-defined field](/api/latest/incidents/create-an-incident-user-defined-field/) (preview)

| Datadog site      | API endpoint                                                                       |
| ----------------- | ---------------------------------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents/config/user-defined-fields     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents/config/user-defined-fields      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents/config/user-defined-fields |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents/config/user-defined-fields      |

## [Get an incident user-defined field](/api/latest/incidents/get-an-incident-user-defined-field/) (preview)

| Datadog site      | API endpoint                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v2/incidents/config/user-defined-fields/{field_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v2/incidents/config/user-defined-fields/{field_id}      |

## [Update an incident user-defined field](/api/latest/incidents/update-an-incident-user-defined-field/) (preview)

| Datadog site      | API endpoint                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **PATCH** https://api.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id}     |
| us3.datadoghq.com | **PATCH** https://api.us3.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| us5.datadoghq.com | **PATCH** https://api.us5.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.datadoghq.eu  | **PATCH** https://api.datadoghq.eu/api/v2/incidents/config/user-defined-fields/{field_id}      |
| ap1.datadoghq.com | **PATCH** https://api.ap1.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| ap2.datadoghq.com | **PATCH** https://api.ap2.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.ddog-gov.com  | **PATCH** https://api.ddog-gov.com/api/v2/incidents/config/user-defined-fields/{field_id}      |

## [Delete an incident user-defined field](/api/latest/incidents/delete-an-incident-user-defined-field/) (preview)

| Datadog site      | API endpoint                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| app.datadoghq.com | **DELETE** https://api.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id}     |
| us3.datadoghq.com | **DELETE** https://api.us3.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| us5.datadoghq.com | **DELETE** https://api.us5.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.datadoghq.eu  | **DELETE** https://api.datadoghq.eu/api/v2/incidents/config/user-defined-fields/{field_id}      |
| ap1.datadoghq.com | **DELETE** https://api.ap1.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| ap2.datadoghq.com | **DELETE** https://api.ap2.datadoghq.com/api/v2/incidents/config/user-defined-fields/{field_id} |
| app.ddog-gov.com  | **DELETE** https://api.ddog-gov.com/api/v2/incidents/config/user-defined-fields/{field_id}      |
