# Code Pipeline

## Overview

### Pipeline

- Workflow for building, testing, and deploying code.

### Source revision

- The source revision is basically the specific version of your code that triggers the pipeline.

### Stage

- A logical unit of work in the pipeline, such as source, build, test, or deploy.

### Action

- A specific task within a stage, such as compiling code, running tests, or deploying to a server.

### Transition

- Connection between stages that allows the pipeline to move from one stage to the next.

### Artifact

- A file or set of files that are produced or consumed by actions in the pipeline, such as source code, build outputs, or deployment packages.

---

## Git integration

### supported Git repositories

- AWS GitHub
- Bitbucket
- Gitlab

### Connecting to a Git repository

- Create a connection in AWS Codepipeline to link your Git repository to the pipeline.
- This connection allows CodePipeline to access your code and trigger the pipeline based on changes in the repository.
