---
title: Datadog-Elasticsearch Integration
integration_title: ElasticSearch
kind: integration
---

### Overview

Connect ElasticSearch to Datadog in order to:

* Visualize ElasticSearch performance.
* Correlate ElasticSearch performance with the rest of your applications.


From the open-source Agent:

* [ ElasticSearch YAML example][1]
* [ ElasticSearch checks.d][2]


The following metrics are collected by default with the ElasticSearch integration:

    elasticsearch.active_primary_shards
    elasticsearch.active_shards
    elasticsearch.cache.field.evictions
    elasticsearch.cache.field.size
    elasticsearch.cache.filter.count
    elasticsearch.cache.filter.evictions
    elasticsearch.cache.filter.size
    elasticsearch.docs.count
    elasticsearch.docs.deleted
    elasticsearch.flush.total
    elasticsearch.flush.total.time
    elasticsearch.get.current
    elasticsearch.get.exists.time
    elasticsearch.get.exists.total
    elasticsearch.get.missing.time
    elasticsearch.get.missing.total
    elasticsearch.get.time
    elasticsearch.get.total
    elasticsearch.http.current_open
    elasticsearch.http.total_opened
    elasticsearch.indexing.delete.current
    elasticsearch.indexing.delete.time
    elasticsearch.indexing.delete.total
    elasticsearch.indexing.index.current
    elasticsearch.indexing.index.time
    elasticsearch.indexing.index.total
    elasticsearch.initializing_shards
    elasticsearch.merges.current
    elasticsearch.merges.current.docs
    elasticsearch.merges.current.size
    elasticsearch.merges.total
    elasticsearch.merges.total.docs
    elasticsearch.merges.total.size
    elasticsearch.merges.total.time
    elasticsearch.number_of_data_nodes
    elasticsearch.number_of_nodes
    elasticsearch.process.open_fd
    elasticsearch.refresh.total
    elasticsearch.refresh.total.time
    elasticsearch.relocating_shards
    elasticsearch.search.fetch.current
    elasticsearch.search.fetch.time
    elasticsearch.search.fetch.total
    elasticsearch.search.query.current
    elasticsearch.search.query.time
    elasticsearch.search.query.total
    elasticsearch.store.size
    elasticsearch.thread_pool.bulk.active
    elasticsearch.thread_pool.bulk.queue
    elasticsearch.thread_pool.bulk.threads
    elasticsearch.thread_pool.cache.active
    elasticsearch.thread_pool.cache.queue
    elasticsearch.thread_pool.cache.threads
    elasticsearch.thread_pool.flush.active
    elasticsearch.thread_pool.flush.queue
    elasticsearch.thread_pool.flush.threads
    elasticsearch.thread_pool.generic.active
    elasticsearch.thread_pool.generic.queue
    elasticsearch.thread_pool.generic.threads
    elasticsearch.thread_pool.get.active
    elasticsearch.thread_pool.get.queue
    elasticsearch.thread_pool.get.threads
    elasticsearch.thread_pool.index.active
    elasticsearch.thread_pool.index.queue
    elasticsearch.thread_pool.index.threads
    elasticsearch.thread_pool.management.active
    elasticsearch.thread_pool.management.queue
    elasticsearch.thread_pool.management.threads
    elasticsearch.thread_pool.merge.active
    elasticsearch.thread_pool.merge.queue
    elasticsearch.thread_pool.merge.threads
    elasticsearch.thread_pool.percolate.active
    elasticsearch.thread_pool.percolate.queue
    elasticsearch.thread_pool.percolate.threads
    elasticsearch.thread_pool.refresh.active
    elasticsearch.thread_pool.refresh.queue
    elasticsearch.thread_pool.refresh.threads
    elasticsearch.thread_pool.search.active
    elasticsearch.thread_pool.search.queue
    elasticsearch.thread_pool.search.threads
    elasticsearch.thread_pool.snapshot.active
    elasticsearch.thread_pool.snapshot.queue
    elasticsearch.thread_pool.snapshot.threads
    elasticsearch.transport.rx_count
    elasticsearch.transport.rx_size
    elasticsearch.transport.server_open
    elasticsearch.transport.tx_count
    elasticsearch.transport.tx_size
    elasticsearch.unassigned_shards

[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/elastic.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/elastic.py
