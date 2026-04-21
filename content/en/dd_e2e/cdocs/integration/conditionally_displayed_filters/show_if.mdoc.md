---
title: "Conditionally displayed filters: show_if"
draft: true
content_filters:
  - trait_id: prog_lang
    option_group_id: dd_e2e_backend_prog_lang_options
  - trait_id: database
    option_group_id: dd_e2e_database_options
    show_if:
      - prog_lang: ["java"]
---

## Overview

This page only shows a Database filter if `java` is selected for `prog_lang`.