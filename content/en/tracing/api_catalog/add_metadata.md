---
title: Adding Metadata to APIs
kind: documentation
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

## Overview
You can add metadata to APIs through the Datadog UI, API, or use automated pipelines through the GitHub integration or Terraform.

## Metadata structure and supported versions
The API Catalog supports openAPI 2 and 3 as the format for defining APIs. 

Datadog supports custom openAPI fields to help manage metadata:
API owner - Add the following to the top level of the openAPI file
x-datadog:
 teamHandle: dd-team

Example openAPI file:

openapi: 3.0.2
info:
 title: API Name
 description: API Description
 version: 1.0.0
x-datadog:
 teamHandle: dd-team
paths:
 /api/v2/customers/{id}:
   get:
     summary: get customer information
     operationId: getCustomerInfo
     parameters:
       - in: path
         name: id
     responses:
       '200':
         description: Successful operation
         content:
           application/vnd.api+json:
             schema:
               type: object
               properties:
                 data:
                   type: array
                   description: Contains all customer information
       '400':
         description: Invalid arguments
       '401':
         description: Unauthorized operation
       '500':
         description: An internal server error
