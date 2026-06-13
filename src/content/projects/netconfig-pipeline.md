---
name: netconfig-pipeline
displayName: NetConfig Pipeline
description: >-
  GitOps-driven, idempotent network device configuration. Renders intended
  config from a source of truth and converges devices safely on every run.
repoUrl: https://github.com/danielbeck/netconfig-pipeline
homepageUrl: https://danielbeck.dev/blog/building-idempotent-network-config-pipelines/
tech: [Python, Ansible, Nautobot]
status: active
featured: true
order: 1
stars: 0
relatedPosts: [building-idempotent-network-config-pipelines]
relatedVideos: [nautobot-ansible-idempotent-pipeline]
---

<!-- PLACEHOLDER project. Replace with a real repository before launch. -->

NetConfig Pipeline turns a network source of truth into device configuration
through a deterministic render → diff → push → verify loop, so re-running it is
always safe.
