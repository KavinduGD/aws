## Amazon ECR (Elastic Container Registry) — Quick Reference Note

Amazon Elastic Container Registry (ECR) is AWS’s fully managed container image registry for storing, managing, and deploying Docker and OCI-compatible images and artifacts. It integrates tightly with IAM, ECS, EKS, Lambda, App Runner, and CI/CD pipelines, and supports features like image scanning, lifecycle policies, replication, and pull-through caching. [innfactory](https://innfactory.de/en/cloud/aws/products/ecr/)

---

## ECR Overview

- **What it is**: A secure, scalable, highly available registry for container images (Docker/OCI) and related artifacts. [innfactory](https://innfactory.de/en/cloud/aws/products/ecr/)
- **Registry types**:
  - **Private registry** (default per AWS account, region-scoped repositories). [docs.aws.amazon](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html)
  - **Public registry** (global, `us-east-1`-anchored, for openly distributable images). [devopsschool](https://www.devopsschool.com/tutorials/aws-amazon-elastic-container-registry-amazon-ecr-tutorial-architecture-pricing-use-cases-and-hands-on-guide-for-containers/)
- **Key capabilities**:
  - Repository management (create, monitor, delete). [docs.aws.amazon](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html)
  - Fine-grained IAM/resource-based policies for access control. [docs.aws.amazon](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html)
  - Image scanning (basic free; enhanced via Inspector). [factualminds](https://www.factualminds.com/blog/amazon-ecr-pricing-storage-replication-pull-through/)
  - Lifecycle policies to auto-expire old images and control storage costs. [techoral](https://techoral.com/aws/aws-ecr-guide.html)
  - Cross-region replication and pull-through cache for upstream registries. [devopsschool](https://www.devopsschool.com/tutorials/aws-amazon-elastic-container-registry-amazon-ecr-tutorial-architecture-pricing-use-cases-and-hands-on-guide-for-containers/)

---

## ECR: Public vs Private Access

| Aspect             | Private Repositories                                                                                                                                                                                                                                 | Public Repositories (ECR Public)                                                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visibility**     | Private to your AWS account (and explicitly shared accounts/roles). [docs.aws.amazon](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html)                                                                                      | Globally visible; anyone can pull without AWS credentials. [cloudzero](https://www.cloudzero.com/blog/amazon-ecr/)                                                         |
| **Authentication** | Requires AWS IAM auth (console/CLI/SDK) to push/pull. [docs.aws.amazon](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html)                                                                                                    | No auth needed to pull; pushing still requires AWS account and permissions. [cloudzero](https://www.cloudzero.com/blog/amazon-ecr/)                                        |
| **Region**         | Created in a specific region; pulls are region-specific. [docs.aws.amazon](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html)                                                                                                 | Public registry is global (anchored in `us-east-1`). [techoral](https://techoral.com/aws/aws-ecr-guide.html)                                                               |
| **Use case**       | Proprietary app images, internal services, CI/CD artifacts. [docs.aws.amazon](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html)                                                                                              | Open-source base images, vendor-distributed images, Kubernetes components, Docker Official Images mirrored by AWS. [cloudzero](https://www.cloudzero.com/blog/amazon-ecr/) |
| **Free tier**      | 500 MB/month free for first 12 months (new AWS customers). [cloudzero](https://www.cloudzero.com/blog/amazon-ecr/)                                                                                                                                   | 50 GB/month storage free, always (for public images). [cloudzero](https://www.cloudzero.com/blog/amazon-ecr/)                                                              |
| **Conversion**     | Cannot convert private ↔ public; they are separate products/APIs. [devopsschool](https://www.devopsschool.com/tutorials/aws-amazon-elastic-container-registry-amazon-ecr-tutorial-architecture-pricing-use-cases-and-hands-on-guide-for-containers/) | —                                                                                                                                                                          |

> By default, new ECR repositories are **private**; public access must be explicitly configured. [support.icompaas](https://support.icompaas.com/support/solutions/articles/62000236267-ensure-there-are-no-ecr-repositories-set-as-public)

---

## ECR Costing (Pricing)

ECR charges primarily for **storage**, **data transfer** (in some cases), **replication**, and optional **enhanced scanning**. [factualminds](https://www.factualminds.com/blog/amazon-ecr-pricing-storage-replication-pull-through/)

- **Private registry storage**: **$0.10/GB-month** (standard pricing as of 2026). [factualminds](https://www.factualminds.com/blog/amazon-ecr-pricing-storage-replication-pull-through/)
  - New AWS customers: **500 MB/month free** for first 12 months. [cloudzero](https://www.cloudzero.com/blog/amazon-ecr/)
- **Public registry storage**: **$0.10/GB-month**, but **50 GB/month free** (always). [cloudzero](https://www.cloudzero.com/blog/amazon-ecr/)
- **Data transfer**:
  - **Push (ingress)**: Free. [factualminds](https://www.factualminds.com/blog/amazon-ecr-pricing-storage-replication-pull-through/)
  - **Pull within same region** to EC2, Lambda, Fargate, App Runner, EKS: **Free**. [factualminds](https://www.factualminds.com/blog/amazon-ecr-pricing-storage-replication-pull-through/)
  - **Cross-region or internet egress**: Charged at standard AWS data transfer rates (e.g., ~$0.02/GB for cross-region replication transfer). [factualminds](https://www.factualminds.com/blog/amazon-ecr-pricing-storage-replication-pull-through/)
- **Cross-region replication**: You pay storage in each destination region ($0.10/GB-month) plus inter-region data transfer. [factualminds](https://www.factualminds.com/blog/amazon-ecr-pricing-storage-replication-pull-through/)
- **Enhanced scanning (Inspector)**: ~**$0.09** per initial scan + **$0.01** per re-scan per image (opt-in per repo). [factualminds](https://www.factualminds.com/blog/amazon-ecr-pricing-storage-replication-pull-through/)
- **Pull-through cache**: Storage billed normally; can reduce upstream egress and latency. [devopsschool](https://www.devopsschool.com/tutorials/aws-amazon-elastic-container-registry-amazon-ecr-tutorial-architecture-pricing-use-cases-and-hands-on-guide-for-containers/)

> Tip: Use **lifecycle policies** to auto-delete old image tags and avoid unbounded storage growth. [techoral](https://techoral.com/aws/aws-ecr-guide.html)

---

## ECR Limitations & Quotas

Common limits (check AWS docs for latest per-region/account quotas):

- **Repositories per registry**: Typically up to **1,000** private repositories per region per account (soft limit; can request increase). [docs.aws.amazon](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html)
- **Images per repository**: Large scale supported, but very large counts may require lifecycle policies for manageability. [techoral](https://techoral.com/aws/aws-ecr-guide.html)
- **Image size**: Practical limits exist (e.g., very large multi-GB images may hit timeouts or require chunked uploads); AWS recommends optimizing image layers. [techoral](https://techoral.com/aws/aws-ecr-guide.html)
- **API rate limits**: ECR APIs are throttled per account/region; CI/CD pipelines pushing many images concurrently may need retries/backoff. [techoral](https://techoral.com/aws/aws-ecr-guide.html)
- **Public registry constraints**:
  - Public repos are global and cannot be region-scoped. [techoral](https://techoral.com/aws/aws-ecr-guide.html)
  - Strict content policies; intended for open distribution, not private artifacts. [devopsschool](https://www.devopsschool.com/tutorials/aws-amazon-elastic-container-registry-amazon-ecr-tutorial-architecture-pricing-use-cases-and-hands-on-guide-for-containers/)
- **Security**: Public repos allow unauthenticated pulls—misconfiguration can expose proprietary code. [support.icompaas](https://support.icompaas.com/support/solutions/articles/62000236267-ensure-there-are-no-ecr-repositories-set-as-public)

---

## ECR vs Docker (Docker Hub)

| Dimension             | Amazon ECR                                                                                                                                                                                                                                    | Docker Hub                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Ownership/Hosting** | AWS-managed, integrated with AWS IAM & services. [innfactory](https://innfactory.de/en/cloud/aws/products/ecr/)                                                                                                                               | Docker Inc.-managed, independent of cloud providers.                                         |
| **Access model**      | Private by default; public option via ECR Public (separate product). [docs.aws.amazon](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html)                                                                              | Public repos default; private repos require paid plans (or free limited private repos).      |
| **Authentication**    | IAM roles/users, temporary credentials, resource policies. [docs.aws.amazon](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html)                                                                                        | Docker ID, tokens, orgs/teams; cloud-specific OIDC integrations vary.                        |
| **Pricing**           | Pay for storage ($0.10/GB-month) + optional features; intra-AWS pulls free. [tech-insider](https://tech-insider.org/ecr-vs-acr-vs-artifact-registry-2026/)                                                                                    | Free tier with limits; paid plans for private repos, advanced security, higher pull rates.   |
| **Pull rate limits**  | No public pull throttling within AWS; public registry allows unlimited global pulls. [cloudzero](https://www.cloudzero.com/blog/amazon-ecr/)                                                                                                  | Anonymous/public pull rate limits apply on free tier; authenticated users get higher limits. |
| **Integrations**      | Deep with ECS, EKS, Lambda, CodePipeline, App Runner, etc. [devopsschool](https://www.devopsschool.com/tutorials/aws-amazon-elastic-container-registry-amazon-ecr-tutorial-architecture-pricing-use-cases-and-hands-on-guide-for-containers/) | Broad CI/CD and cloud integrations, but not natively tied to AWS IAM.                        |
| **Security scanning** | Basic free; enhanced via Amazon Inspector (paid). [factualminds](https://www.factualminds.com/blog/amazon-ecr-pricing-storage-replication-pull-through/)                                                                                      | Free basic scanning on some plans; advanced features on paid tiers.                          |
| **Use case fit**      | Best for AWS-native workloads, private images, and teams wanting IAM-native control. [cert-ready](https://cert-ready.net/learn/amazon-ecr-elastic-container-registry/)                                                                        | Best for open-source distribution, multi-cloud, or Docker-centric workflows.                 |

> Conceptually, **ECR is like a private Docker Hub inside AWS**, but with separate public registry semantics and AWS-native auth/pricing. [cert-ready](https://cert-ready.net/learn/amazon-ecr-elastic-container-registry/)

---

If you want, I can turn this into a one-page markdown/PDF note or add a small cost calculator (e.g., estimate monthly cost for X GB stored, Y GB replicated, Z images scanned).
