---
title: "DebugIt: A Fake Debugging Library"
content_filters:
  - label: Language
    trait_id: prog_lang
    option_group_id: debugit_programming_lang_options
  - label: Operating system
    trait_id: os
    option_group_id: debugit_os_options
  - label: Database
    trait_id: database
    option_group_id: debugit_database_options
---

## Overview

DebugIt is a powerful debugging library designed to streamline the debugging process for developers. 
With DebugIt, you can easily log errors, warnings, and debug messages, allowing for efficient 
troubleshooting and debugging of your applications.

## Setup

### Install the DebugIt library

<!-- Python -->
{% if equals($prog_lang, "python") %}
```shell
pip install debugit
```
{% /if %}

<!-- JavaScript -->
{% if equals($prog_lang, "javascript") %}
```shell
npm install debugit
```
{% /if %}

<!-- Java -->
{% if equals($prog_lang, "java") %}
```shell
mvn install debugit
```
{% /if %}

<!-- Ruby -->
{% if equals($prog_lang, "ruby") %}
```shell
gem install debugit
```
{% /if %}

<!-- Go -->
{% if equals($prog_lang, "go") %}
```shell
go get debugit
```
{% /if %}

### Add the DebugIt library to your path

<!-- Windows -->
{% if equals($os, "windows") %}
<!-- Windows > Python -->
{% if equals($prog_lang, "python") %}
```shell
setx PYTHONPATH "%PYTHONPATH%;C:\path\to\your\library\directory"
```
{% /if %}

<!-- Windows > Java -->
{% if equals($prog_lang, "java") %}
```shell
set CLASSPATH=%CLASSPATH%;C:\path\to\your\library\directory
```
{% /if %}

<!-- Windows > Go -->
{% if equals($prog_lang, "go") %}
```shell
setx GOPATH "%GOPATH%;C:\path\to\your\library\directory"
```
{% /if %}

<!-- Windows > Ruby -->
{% if equals($prog_lang, "ruby") %}
```shell
set RUBYLIB=%RUBYLIB%;C:\path\to\your\library\directory
```
{% /if %}

<!-- Windows > JavaScript -->
{% if equals($prog_lang, "javascript") %}
```shell
set NODE_PATH=%NODE_PATH%;C:\path\to\your\library\directory
```
{% /if %}
{% /if %}

<!-- Linux -->
{% if equals($os, "linux") %}
<!-- Linux > Python -->
{% if equals($prog_lang, "python") %}
```shell
sudo export PYTHONPATH="$PYTHONPATH:/path/to/your/library/directory"
```
{% /if %}

<!-- Linux > Java -->
{% if equals($prog_lang, "java") %}
```shell
sudo export CLASSPATH="$CLASSPATH:/path/to/your/library/directory"
```
{% /if %}

<!-- Linux > Go -->
{% if equals($prog_lang, "go") %}
```shell
sudo export GOPATH="$GOPATH:/path/to/your/library/directory"
```
{% /if %}

<!-- Linux > Ruby -->
{% if equals($prog_lang, "ruby") %}
```shell
sudo export RUBYLIB="$RUBYLIB:/path/to/your/library/directory"
```
{% /if %}

<!-- Linux > JavaScript -->
{% if equals($prog_lang, "javascript") %}
```shell
sudo export NODE_PATH="$NODE_PATH:/path/to/your/library/directory"
```
{% /if %}
{% /if %}

<!-- macOS -->
{% if equals($os, "mac_os") %}
<!-- macOS > Python -->
{% if equals($prog_lang, "python") %}
```shell
export PYTHONPATH="$PYTHONPATH:/path/to/your/library/directory"
```
{% /if %}

<!-- macOS > Java -->
{% if equals($prog_lang, "java") %}
```shell
export CLASSPATH="$CLASSPATH:/path/to/your/library/directory"
```
{% /if %}

<!-- macOS > Go -->
{% if equals($prog_lang, "go") %}
```shell
export GOPATH="$GOPATH:/path/to/your/library/directory"
```
{% /if %}

<!-- macOS > Ruby -->
{% if equals($prog_lang, "ruby") %}
```shell
export RUBYLIB="$RUBYLIB:/path/to/your/library/directory"
```
{% /if %}

<!-- macOS > JavaScript -->
{% if equals($prog_lang, "javascript") %}
```shell
export NODE_PATH="$NODE_PATH:/path/to/your/library/directory"
```
{% /if %}
{% /if %}

### Create the database table

<!-- MySQL -->
{% if equals($database, "mysql") %}
```sql
CREATE TABLE debug_it_errors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    error_message TEXT
);
```
{% /if %}

<!-- Postgres -->
{% if equals($database, "postgres") %}
```sql
CREATE TABLE debug_it_errors (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    error_message TEXT
);
```
{% /if %}

<!-- SQL Server -->
{% if equals($database, "sql_server") %}
```sql
CREATE TABLE debug_it_errors (
    id INT IDENTITY(1,1) PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    error_message NVARCHAR(MAX)
);
```
{% /if %}